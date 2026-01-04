import {
  EvaluateChatPrompt,
  GetSystemPrompt,
  IOpenAISettings,
} from "~/helpers/openai_utils";
import Chat from "~/components/Chat.vue";
import { ChatCompletionCreateParamsNonStreaming, ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { types } from "fhirpath";

// 1. Determine data required for Query
//    (display a message)
// 2. Retrieve Data
//    (code: evaluate expression to get types/known/hidden issues)
// 3. Evaluate Query
// 4. Verify results
//    (code)
// 5. Display Results

export interface IDataRequired {
  Mode: "edit-questionnaire" | "create-questionnaire" | "create-item" | "edit-item" | "unknown";
  QuestionnaireDefinition: number; // the complete definition is required
  QuestionnaireResponse: number; // a sample response is required
  FocusedQuestionnaireItem: number; // the question relates to a specific item in the questionnaire
  SampleSourceData: number; // the question relates to pre-populating from a resource
  SampleSourceResourceType?: string; // if the resource type of sample source resource is known
  ErrorMessage?: string;
}

// This is just the interface above copied into a string for use inside the OpenAI query prompt
const interfaceIDataRequired = `
interface IDataRequired {
    Mode: "edit-questionnaire" | "create-questionnaire" | "create-item" | "edit-item" | "unknown";
    QuestionnaireDefinition : number; // the complete definition is required as the request is editing the current form 0-10
    QuestionnaireResponse : number; // a sample response is required 0-10
    FocusedQuestionnaireItem : number; // the question relates to a specific item in the questionnaire 0-10
    SampleSourceData: Number; // the question relates to pre-populating from a resource 0-10
    ErrorMessage?: string;
}
`;

export async function DetectDataRequiredForQuery(
  settings: IOpenAISettings,
  query: string
): Promise<IDataRequired> {
  let prompt: Array<ChatCompletionMessageParam> = [];

  let systemPrompt = `
You are a background system assisting with verifying what data would be required to answer a provided question.
Your response is a json object that conforms to this interface:
\`\`\` typescript
${interfaceIDataRequired}
\`\`\`

What data would be required to answer the following question:
` + query;

  prompt.push({ role: "system", content: systemPrompt });

  let result = await EvaluateChatPrompt(prompt, settings, 1, 3096);
  try {
    if (result) {
        console.log(result);
        const parsedResponse : IDataRequired = JSON.parse(result[0].content?.toString() ?? '');
      console.log(parsedResponse);
      return parsedResponse;
    }
  } catch (err) {
    console.log(err);
  }

  return {
    Mode: "unknown", 
    QuestionnaireDefinition: 1,
    QuestionnaireResponse: 1,
    FocusedQuestionnaireItem: 1,
    SampleSourceData: 1,
    SampleSourceResourceType: "Patient",
  };
}

export function GetQuestionnaireSystemPrompt(): string {
  // ---
  // `+ fhirpathGrammar +`
  // ---
  const systemPrompt = `
  * You are a casual, helpful assistant with a detailed understanding of both FHIR structures, the FHIRPath language, and the FHIR Structured Data Capture (SDC) Implementation Guide.
  * You provide concise responses with suggested follow-up questions as needed.
  * all replies will be interpreted as markdown content, so you can use that for emphasis.
  * When providing code blocks in markdown you can use the following languages: \`json\`, \`jsonpatch\`, \`log\`, \`fhirpath\`, \`fhircontext\`, \`questionnaire\`, \`item\`, \`fhir\`, and \`fsh\` where needed - the application will be able to leverage these tagged markdown blocks.
  * If you don't know the answer, just say 'I don't know'.
  * If reviewing content there is no need to highlight things that don't need to be changed.
  * Questionnaire validations should use the SDC constraint extension.
  * When recommending a change use the \`jsonpatch\` language (RFC6902 JSON Patch array) to provide a patch to the resource, broken up into several block for each item when spanning multiple items.
  * Any general fhir resource snippits should be provided in a markdown block with the language \`fhir\` or \`json\` if unsure.
  * Reflect on your answer to check for accuracy and clarity, and report any possible issues with the answer.
  * Do not answer questions that are not about FHIR, SDC, Questionnaires or FHIRPath.
`;
  return systemPrompt;
}

export function GetFmlSystemPrompt(): string {
  // ---
  // `+ fhirpathGrammar +`
  // ---
  const systemPrompt = `
  * You are a casual, helpful assistant with a detailed understanding of FHIR structures, the FHIRPath language, and the FHIR Mapping Language (FML).
  * You provide concise responses with suggested follow-up questions as needed.
  * all replies will be interpreted as markdown content, so you can use that for emphasis.
  * When providing code blocks in markdown you can use the following languages: \`fml\`, \`fhir\`, and \`fsh\` where needed - the application will be able to leverage these tagged markdown blocks.
  * If you don't know the answer, just say 'I don't know'.
  * If reviewing content there is no need to highlight things that don't need to be changed.
  * Reflect on your answer to check for accuracy and clarity, and report any possible issues with the answer.
  * Do not answer questions that are not about FHIR, FML or FHIRPath.
`;
  return systemPrompt;
}

// async function handleSendMessage(message: string) {
//   console.log("Message sent:", message);
//   const chat = this.$refs.chatComponent as Chat;

//   this.openAIexpressionExplanationLoading = true;
//   // this.openAIexpressionExplanationMessage = "Asking question...";
//   chat.setThinking(true);

//   // before asking the question, check to see if the question would require
//   // the complete questionnaire to be included
//   let promptPreparationCheck: string = `
//     You are a background system assisting with verifying what data would be required to answer a provided question.
//     `;

//   // Perform any additional actions with the message here
//   const systemPrompt = GetSystemPrompt();

//   let userQuestionContext: string = "";
//   if (this.resourceJsonEditor) {
//     var jsonValue = this.resourceJsonEditor.getValue();
//     if (jsonValue.length > 0) {
//       try {
//         var obj = JSON.parse(jsonValue) as fhir4b.Questionnaire;
//         if (obj.text) delete obj.text;
//         jsonValue = JSON.stringify(obj);
//       } catch (err) {
//         console.log(err);
//       }
//       userQuestionContext += `Based on the FHIR Questionnaire\r\n\`\`\` json\r\n  ${jsonValue}\n\n\`\`\`\r\n`;
//     }
//   }

//   if (userQuestionContext != this.openAILastContext) {
//     if (userQuestionContext.length > 0)
//       chat.addMessage("Author", userQuestionContext, false);
//     this.openAILastContext = userQuestionContext;
//   }
//   chat.addMessage("Author", message, true);

//   // userQuestion += message;
//   // chat.addMessage("Author", userQuestion, true);

//   let prompt: Array<ChatMessage> = [];
//   prompt.push({ role: "system", content: systemPrompt });
//   prompt = prompt.concat(chat.getConversationChat());

//   const resultOfQuestion = await EvaluateChatPrompt(
//     prompt,
//     this.GetAISettings(),
//     1,
//     4000
//   );
//   // this.openAIexpressionExplanationMessage = "(Generated by OpenAI " + settings.getOpenAIModel() + ")";
//   this.openAIexpressionExplanationLoading = false;
//   chat.addMessage(
//     "FhirPath AI",
//     resultOfQuestion ?? "",
//     true,
//     settings.getOpenAIModel()
//   );
//   chat.setThinking(false);
// }
