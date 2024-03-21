import {
  EvaluateChatPrompt,
  GetSystemPrompt,
  IOpenAISettings,
} from "~/helpers/openai_utils";
import Chat from "~/components/Chat.vue";
import {
  ChatMessage,
  OpenAIClient,
  AzureKeyCredential,
  OpenAIKeyCredential,
  OpenAIClientOptions,
} from "@azure/openai";
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
  let prompt: Array<ChatMessage> = [];

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
        const parsedResponse : IDataRequired = JSON.parse(result);
      console.log(parsedResponse);
      return parsedResponse;
    }
  } catch (err) {
    console.log(err);
  }

  return {
    QuestionnaireDefinition: 1,
    QuestionnaireResponse: 1,
    FocusedQuestionnaireItem: 1,
    SampleSourceData: 1,
    SampleSourceResourceType: "Patient",
  };
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