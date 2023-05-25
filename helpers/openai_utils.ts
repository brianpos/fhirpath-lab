import { Configuration, CreateChatCompletionRequest, CreateChatCompletionResponse, CreateCompletionRequest, CreateCompletionResponse, ChatCompletionRequestMessage, OpenAIApi } from "openai";

let openai: OpenAIApi | undefined = undefined;
let openaiConfig: Configuration | undefined = undefined;

export async function completion(params: CreateCompletionRequest, apiKey: string): Promise<CreateCompletionResponse> {
    if (!openai || openaiConfig?.apiKey !== apiKey) {
        openaiConfig = new Configuration({ apiKey: apiKey });
        openai = new OpenAIApi(openaiConfig);
    }
    const completion = await openai.createCompletion(params);
    // console.log(JSON.stringify(completion.data, null, 2))
    return completion.data
}

export async function chatCompletion(params: CreateChatCompletionRequest, apiKey: string): Promise<CreateChatCompletionResponse> {
    if (!openai || openaiConfig?.apiKey !== apiKey) {
        openaiConfig = new Configuration({ apiKey: apiKey });
        openai = new OpenAIApi(openaiConfig);
    }
    try {
        const completion = await openai.createChatCompletion(params);
        console.log(JSON.stringify(completion.data, null, 2))
        return completion.data;
    } catch(err) {
        console.log(err);
        let r: CreateChatCompletionResponse = {
            id: "",
            object: "",
            created: 0,
            model: "",
            choices: [{
                message: { content: err.message, role: "system" },
            }],
        };
        return r;
    }
}

export async function EvaluateTextPrompt(prompt: string, apiKey: string, temperature: number, max_tokens?: number) {
    const result = await completion({
        model: "text-davinci-003",
        prompt,
        temperature,
        max_tokens,
    }, apiKey);
    return result.choices[0].text;
};

export async function EvaluateChatPrompt(messages: Array<ChatCompletionRequestMessage>, apiKey: string, temperature: number, max_tokens?: number) {
    const result = await chatCompletion({
        model: "gpt-3.5-turbo",
        // model: "gpt-4",
        messages,
        temperature,
        max_tokens,
    }, apiKey);
    return result.choices[0].message?.content;
};

export async function EvaluateCodePrompt(prompt: string, apiKey: string, temperature: number, max_tokens?: number) {
    const result = await completion({
        model: "code-davinci-002",
        prompt,
        temperature,
        max_tokens,
    }, apiKey);
    return result.choices[0].text;
};

export function CreatePrompt(): Array<ChatCompletionRequestMessage> {
    let prompt: Array<ChatCompletionRequestMessage> = [];

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
iff
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
    * You are a casual, helpful assistant with a detailed understanding of both FHIR structures and the FHIRPath language that provides concise responses.
    * only use this subset of FHIRPath functions: ${fhirpathFunctions.split('\n').join(', ')}.
    * 'concat' and '$join' are not valid fhirpath functions.
    * provide FHIRPath expressions using a markdown block with the language \`fhirpath\`.
    * all replies will be interpreted as markdown content, so you can use that for emphasis.
    * If you don't know the answer, just say 'I don't know'.
    * Do not answer questions that are not about FHIR or FHIRPath.
    * If a FHIRPath context is provided, do not include that at the start of the expression.
    * If no FHIRPath expression is provided, then assume the expression provided is the context.
    * Any fhir context for a fhirpath expression should be provided in a markdown block with the language \`fhircontext\`.
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
