import { OpenAI, ClientOptions } from "openai";
import { FinalRequestOptions, RequestOptions } from "openai/internal/request-options.js";
import { ChatCompletionCreateParamsNonStreaming, ChatCompletionMessageParam, ChatCompletionTool } from "openai/resources/chat/completions";

export interface IOpenAISettings {
  openAIKey: string;
  openAIBasePath: string | undefined;
  openAIApiVersion: string | undefined;
  openAIModel: string | undefined;
}

export interface OpenAiError {
  error: OpenAiErrorDetail;
}

interface OpenAiErrorDetail {
  code: number;
  message: string;
}

class MyOpenAIClient extends OpenAI {
    constructor(options: ClientOptions) {
        super(options);
    }
    // https://github.com/openai/openai-node/blob/4c041e03013dbd7de5bfeb02db42c5e657217167/src/core.ts#L206
    protected async authHeaders(opts: FinalRequestOptions): Promise<any> {
        let headers = await super.authHeaders(opts);
        // If there is no authorization header then don't need the other settings too,
        // as this is not the actual OpenAI endpoints.
        if (headers && headers.values && headers.values.get('Authorization') === 'Bearer ') {
            headers.values.delete('X-Stainless-Arch');
            headers.values.delete('X-Stainless-OS');
            headers.values.delete('X-Stainless-Lang');
            headers.values.delete('X-Stainless-Package-Version');
            headers.values.delete('X-Stainless-Runtime');
            headers.values.delete('X-Stainless-Runtime-Version');
            headers.values.delete('Authorization');
        }
        return headers;
    }
}

export async function EvaluateChatPrompt(
    messages: Array<ChatCompletionMessageParam>,
    settings: IOpenAISettings,
    temperature: number,
    max_tokens?: number,
    tools?: Array<ChatCompletionTool>,
    EvaluateTools? :(tool_calls: OpenAI.Chat.Completions.ChatCompletionMessageToolCall[]) => Array<ChatCompletionMessageParam>): Promise<Array<ChatCompletionMessageParam> | undefined> {

    try {
        let client = null;
        // this is all in browser with client side use of client's own keys, so we can allow browser
        let clientOptions: ClientOptions = { dangerouslyAllowBrowser: true };
        if (settings.openAIKey)
            clientOptions.apiKey = settings.openAIKey;
        else
            clientOptions.apiKey = '';
        if (settings.openAIBasePath) {
            clientOptions.baseURL = settings.openAIBasePath;
            if (settings.openAIApiVersion) {
                clientOptions.defaultQuery = { 'api-version': settings.openAIApiVersion };
                clientOptions.defaultHeaders = { 'api-key': settings.openAIKey };
                clientOptions.baseURL = settings.openAIBasePath + settings.openAIModel;
            }
        }

        client = new MyOpenAIClient(clientOptions);

        let reqBody: ChatCompletionCreateParamsNonStreaming = {
            model: settings.openAIModel ?? "",
            messages: messages,
            temperature: temperature,
            store: false,
            tools: tools,
        };
        if (settings.openAIModel === "gpt-5") {
            reqBody.temperature = 1;
        }
        if (settings.openAIModel === "gpt-5" || settings.openAIModel?.endsWith("o")) {
            reqBody.max_completion_tokens = max_tokens;
        } else {
            reqBody.max_tokens = max_tokens;
        }
        const result = await client.chat.completions.create(reqBody);
        let replyMessage = result.choices[0].message;

        // Check if the result was a completion, or timed out/token limit reached
        if (result.choices[0].finish_reason === "length") {
            console.log("Warning: The response was cut off due to length. Consider increasing max_tokens.");
            replyMessage = {
                role: "assistant",
                refusal: null,
                content: (replyMessage?.content ?? '') + "\n\n*The response was cut off due to length.*"
            };
        }

        if (replyMessage?.tool_calls && EvaluateTools){
                let toolCallMessagesContinue: Array<ChatCompletionMessageParam> = [];
                toolCallMessagesContinue.push(... messages)
                const toolCalls = replyMessage?.tool_calls;
                toolCallMessagesContinue.push(result.choices[0].message);
                const toolCallResults = EvaluateTools(toolCalls);
                toolCallMessagesContinue.push(...toolCallResults);
                if (toolCallMessagesContinue.length > messages.length) {
                        const resultOfToolCall = await EvaluateChatPrompt(toolCallMessagesContinue, settings, temperature, max_tokens);
                        let returnValue: Array<ChatCompletionMessageParam> = [replyMessage];
                        if (resultOfToolCall)
                                returnValue.push(... resultOfToolCall);
                        return returnValue;
                }
        }

        return replyMessage ? [replyMessage] : [];
    } catch (err: any) {
        console.log(err);
        return [{
                role: "assistant",
                content: err.message ?? err.error?.message
        }];
    }
};

export function CreatePrompt(): Array<ChatCompletionMessageParam> {
    let prompt: Array<ChatCompletionMessageParam> = [];

  prompt.push({ role: "system", content: GetSystemPrompt() });

  return prompt;
}

const fhirpathFunctions = `empty
exists
all
allTrue
anyTrue
allFalse
anyFalse
subsetOf
supersetOf
count
distinct
isDistinct
where
select
repeat
ofType
single
first
last
tail
skip
take
intersect
exclude
union
combine
iif
toBoolean
convertsToBoolean
toInteger
convertsToInteger
toDate
convertsToDate
toDateTime
convertsToDateTime
toDecimal
convertsToDecimal
toQuantity
convertsToQuantity
toString
convertsToString
toTime
convertsToTime
indexOf
substring
startsWith
endsWith
contains
upper
lower
replace
matches
replaceMatches
length
toChars
encode
decode
escape
unescape
trim
split
join
abs
ceiling
exp
floor
ln
log
power
round
sqrt
truncate
children
descendants
trace
`;

const fhirpathGrammar = `
grammar fhirpath;

// Grammar rules
// [FHIRPath](http://hl7.org/fhirpath/N1) Normative Release

//prog: line (line)*;
//line: ID ( '(' expr ')') ':' expr '\\r'? '\\n';

expression
        : term                                                      #termExpression
        | expression '.' invocation                                 #invocationExpression
        | expression '[' expression ']'                             #indexerExpression
        | ('+' | '-') expression                                    #polarityExpression
        | expression ('*' | '/' | 'div' | 'mod') expression         #multiplicativeExpression
        | expression ('+' | '-' | '&') expression                   #additiveExpression
        | expression ('is' | 'as') typeSpecifier                    #typeExpression
        | expression '|' expression                                 #unionExpression
        | expression ('<=' | '<' | '>' | '>=') expression           #inequalityExpression
        | expression ('=' | '~' | '!=' | '!~') expression           #equalityExpression
        | expression ('in' | 'contains') expression                 #membershipExpression
        | expression 'and' expression                               #andExpression
        | expression ('or' | 'xor') expression                      #orExpression
        | expression 'implies' expression                           #impliesExpression
        //| (IDENTIFIER)? '=>' expression                             #lambdaExpression
        ;

term
        : invocation                                            #invocationTerm
        | literal                                               #literalTerm
        | externalConstant                                      #externalConstantTerm
        | '(' expression ')'                                    #parenthesizedTerm
        ;

literal
        : '{' '}'                                               #nullLiteral
        | ('true' | 'false')                                    #booleanLiteral
        | STRING                                                #stringLiteral
        | NUMBER                                                #numberLiteral
        | DATE                                                  #dateLiteral
        | DATETIME                                              #dateTimeLiteral
        | TIME                                                  #timeLiteral
        | quantity                                              #quantityLiteral
        ;

externalConstant
        : '%' ( identifier | STRING )
        ;

invocation                          // Terms that can be used after the function/member invocation '.'
        : identifier                                            #memberInvocation
        | function                                              #functionInvocation
        | '$this'                                               #thisInvocation
        | '$index'                                              #indexInvocation
        | '$total'                                              #totalInvocation
        ;

function
        : identifier '(' paramList? ')'
        ;

paramList
        : expression (',' expression)*
        ;

quantity
        : NUMBER unit?
        ;

unit
        : dateTimePrecision
        | pluralDateTimePrecision
        | STRING // UCUM syntax for units of measure
        ;

dateTimePrecision
        : 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond'
        ;

pluralDateTimePrecision
        : 'years' | 'months' | 'weeks' | 'days' | 'hours' | 'minutes' | 'seconds' | 'milliseconds'
        ;

typeSpecifier
        : qualifiedIdentifier
        ;

qualifiedIdentifier
        : identifier ('.' identifier)*
        ;

identifier
        : IDENTIFIER
        | DELIMITEDIDENTIFIER
        | 'as'
        | 'contains'
        | 'in'
        | 'is'
        ;


/****************************************************************
    Lexical rules
*****************************************************************/

/*
NOTE: The goal of these rules in the grammar is to provide a date
token to the parser. As such it is not attempting to validate that
the date is a correct date, that task is for the parser or interpreter.
*/

DATE
        : '@' DATEFORMAT
        ;

DATETIME
        : '@' DATEFORMAT 'T' (TIMEFORMAT TIMEZONEOFFSETFORMAT?)?
        ;

TIME
        : '@' 'T' TIMEFORMAT
        ;

fragment DATEFORMAT
        : [0-9][0-9][0-9][0-9] ('-'[0-9][0-9] ('-'[0-9][0-9])?)?
        ;

fragment TIMEFORMAT
        : [0-9][0-9] (':'[0-9][0-9] (':'[0-9][0-9] ('.'[0-9]+)?)?)?
        ;

fragment TIMEZONEOFFSETFORMAT
        : ('Z' | ('+' | '-') [0-9][0-9]':'[0-9][0-9])
        ;

IDENTIFIER
        : ([A-Za-z] | '_')([A-Za-z0-9] | '_')*            // Added _ to support CQL (FHIR could constrain it out)
        ;

DELIMITEDIDENTIFIER
        : '\`' (ESC | .)*? '\`'
        ;

STRING
        : '\\'' (ESC | .)*? '\\''
        ;

// Also allows leading zeroes now (just like CQL and XSD)
NUMBER
        : [0-9]+('.' [0-9]+)?
        ;

// Pipe whitespace to the HIDDEN channel to support retrieving source text through the parser.
WS
        : [ \\r\\n\\t]+ -> channel(HIDDEN)
        ;

COMMENT
        : '/*' .*? '*/' -> channel(HIDDEN)
        ;

LINE_COMMENT
        : '//' ~[\\r\\n]* -> channel(HIDDEN)
        ;

fragment ESC
        : '\\\\' ([\`'\\\\/fnrt] | UNICODE)    // allow \\\`, \\', \\\\, \\/, \\f, etc. and \\uXXX
        ;

fragment UNICODE
        : 'u' HEX HEX HEX HEX
        ;

fragment HEX
        : [0-9a-fA-F]
        ;
`;

export function GetSystemPrompt(): string {
  // ---
  // `+ fhirpathGrammar +`
  // ---
  const systemPrompt = `
    * You are a casual, helpful assistant with a detailed understanding of both FHIR structures and the FHIRPath language that provides concise responses with suggested follow-up questions.
    * only use this subset of FHIRPath functions: ${fhirpathFunctions.split('\n').join(', ')}.
    * 'concat' and '$join' are not valid fhirpath functions.
    * provide FHIRPath expressions using a markdown block with the language \`fhirpath\`.
    * all replies will be interpreted as markdown content, so you can use that for emphasis.
    * If you don't know the answer, just say 'I don't know'.
    * Do not answer questions that are not about FHIR or FHIRPath.
    * If a FHIRPath context is provided, do not include that at the start of the expression.
    * If no FHIRPath expression is provided, then assume the expression provided is the context.
    * Any fhir context for a fhirpath expression should be provided in a markdown block with the language \`fhircontext\`.
    * You may also provide guidance on working with FHIR Questionnaires and HL7 Structured Data Capture (SDC).
    * Questionnaire validations should use the SDC constraint extension.
    * When providing code blocks in markdown you can use the following languages: \`json\`, \`jsonpatch\`, \`log\`, \`fhirpath\`, \`fhircontext\`, \`questionnaire\`, \`item\`, \`fhir\`, and \`fsh\` where needed - the application will be able to leverage these tagged markdown blocks.
    * Reflect on your answer to check for accuracy and clarity, and report any possible issues with the answer.
    
    Question:
    create an expression to return the patient's name which would be applied to the \`Patient.name\` context.

    Answer:
    \`\`\` fhirpath
     family & ', ' + given.first()
     \`\`\`

     Question:
     create an expression to return the patient's MRN
 
     Answer:
     \`\`\` fhircontext
     Patient.identifier
     \`\`\`
     \`\`\` fhirpath
      where(
         type.coding.where(system='http://terminology.hl7.org/CodeSystem/v2-0203' and code = 'MR').exists()
         ).value
      \`\`\`
      `;
  return systemPrompt;
}
