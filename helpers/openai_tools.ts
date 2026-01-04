import { OpenAI } from "openai";
import {
  ChatCompletionMessageParam,
  ChatCompletionTool,
  ChatCompletionMessageToolCall,
} from "openai/resources/chat/completions";
import { mapFunctionReferences } from "./fhirpath_references";
import fhirpath from "fhirpath";
import fhirpath_r4_model from "fhirpath/fhir-context/r4";
import fhirpath_r5_model from "fhirpath/fhir-context/r5";
import { fpjsNode, JsonNode } from "../models/FhirpathTesterData";

// Common tools available across all contexts
const CommonTools: ChatCompletionTool[] = [
  {
    type: "function",
    function: {
      name: "validate-fhirpath",
      description:
        "Validate a fhirpath expression against the provided context. If the function returns true, then the expression, and all used functions in is are valid, and defined in the FHIRPath standard (which may have been updated since training). Also returns a list of functions used in the expression, and url to specification for each.",
      parameters: {
        type: "object",
        properties: {
          context: {
            type: "string",
            description: "The fhirpath context to validate against. (usually starts with the ResourceType of the Example resource) e.g. `Patient`, `Patient.name`, `Patient.name.first()`)",
          },
          expression: {
            type: "string",
            description: "The fhirpath expression to validate",
          },
        },
        required: ["context", "expression"],
        additionalProperties: false,
      },
      strict: true,
    },
  },
  {
    type: "function",
    function: {
      name: "fhirpath-function-details",
      description:
        "Provides the complete details of a fhirpath function from the fhirpath specification, along with a link to the latest version of the specification. If a function is not found, it will return an error message.",
      parameters: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description:
              "The name of the fhirpath function to lookup in the specification.",
          },
        },
        required: ["name"],
        additionalProperties: false,
      },
      strict: true,
    },
  },
];
const CommonExampleTools: ChatCompletionTool[] = [
  {
    type: "function",
    function: {
      name: "currentExampleResourceType",
      description:
        "Returns the resource type of the current example FHIR resource being used. This is useful for understanding the context of the current test.",
      parameters: {
        type: "object",
        properties: {},
        additionalProperties: false,
      },
      strict: true,
    },
  },
  {
    type: "function",
    function: {
      name: "currentExampleResourceJson",
      description:
        "Returns the complete JSON content of the current example FHIR resource being used. This allows the AI to analyze the actual resource structure and data.",
      parameters: {
        type: "object",
        properties: {},
        additionalProperties: false,
      },
      strict: true,
    },
  },
];

// FhirPath-specific tools
const FhirPathSpecificTools: ChatCompletionTool[] = [
  {
    type: "function",
    function: {
      name: "currentContext",
      description:
        "Returns the current FHIRPath context expression being used in the tester. This is the path expression that defines the starting point for evaluation.",
      parameters: {
        type: "object",
        properties: {},
        additionalProperties: false,
      },
      strict: true,
    },
  },
  {
    type: "function",
    function: {
      name: "currentExpression",
      description:
        "Returns the current FHIRPath expression being evaluated in the tester. This is the main expression the user is working with.",
      parameters: {
        type: "object",
        properties: {},
        additionalProperties: false,
      },
      strict: true,
    },
  },
];

// Questionnaire-specific tools
const QuestionnaireSpecificTools: ChatCompletionTool[] = [
  // Add questionnaire-specific tools here as needed
  // Example:
  // {
  //   type: "function",
  //   function: {
  //     name: "getCurrentQuestionnaireResponse",
  //     description: "Returns the current QuestionnaireResponse being worked with.",
  //     parameters: { type: "object", properties: {}, additionalProperties: false },
  //     strict: true,
  //   },
  // },
];

// FML-specific tools
const FmlSpecificTools: ChatCompletionTool[] = [
  // Add FML-specific tools here as needed
  // Example:
  // {
  //   type: "function",
  //   function: {
  //     name: "getCurrentMapping",
  //     description: "Returns the current FML mapping being authored.",
  //     parameters: { type: "object", properties: {}, additionalProperties: false },
  //     strict: true,
  //   },
  // },
];

// Exported tool arrays for each use case
export const FhirPathTools: ChatCompletionTool[] = [...FhirPathSpecificTools, ...CommonExampleTools, ...CommonTools];
export const QuestionnaireTools: ChatCompletionTool[] = [...QuestionnaireSpecificTools, ...CommonTools];
export const FmlTools: ChatCompletionTool[] = [...FmlSpecificTools, ...CommonExampleTools, ...CommonTools];

// specifically for unit testing
export const LlmTools: ChatCompletionTool[] = FhirPathTools;

// Base context interface for tool evaluation
export interface IToolEvaluationContext {
  resourceType?: string;
  resourceJson?: string;
}

// FhirPath-specific context extending the base
export interface IFhirPathEvaluationContext extends IToolEvaluationContext {
  currentContext?: string;      // The FHIRPath context expression
  currentExpression?: string;    // The FHIRPath expression being evaluated
}

// Questionnaire-specific context extending the base
export interface IQuestionnaireEvaluationContext extends IToolEvaluationContext {
  questionnaireResponse?: string;
  sdcContext?: any;
  // Add more questionnaire-specific fields as needed
}

// FML-specific context extending the base
export interface IFmlEvaluationContext extends IToolEvaluationContext {
  fmlMapping?: string;           // The FML mapping being worked on
  sourceStructure?: string;      // Source structure definition
  targetStructure?: string;      // Target structure definition
  // Add more FML-specific fields as needed
}

// Common tool handler - handles tools that are shared across all contexts (including examples too, though not present in all cases)
function handleCommonTools(
  toolCall: ChatCompletionMessageToolCall,
  context?: IToolEvaluationContext
): ChatCompletionMessageParam | null {
  if (toolCall.type !== "function") return null;

  if (toolCall.function.name === "validate-fhirpath") {
    const args = JSON.parse(toolCall.function.arguments);
    const expression = args.expression;
    const content = validateExpression(expression);
    console.log(content);
    return {
      role: "tool",
      tool_call_id: toolCall.id,
      content: content,
    };
  }

  if (toolCall.function.name === "fhirpath-function-details") {
    const args = JSON.parse(toolCall.function.arguments);
    const functionName = args.name;
    let content: string;
    if (mapFunctionReferences.has(functionName)) {
      const functionDetails = mapFunctionReferences.get(functionName);
      content = `\`${functionDetails?.title}\` comes from section \`${functionDetails?.outlineNo}\`. URL: \`${functionDetails?.specUrl}\`\n\`${functionDetails?.description}\``;
    } else {
      content = `The function \`${functionName}\` is not a valid fhirpath function.`;
    }
    console.log(content);
    return {
      role: "tool",
      tool_call_id: toolCall.id,
      content: content,
    };
  }

  if (toolCall.function.name === "currentExampleResourceType") {
    const content = context?.resourceType || "No resource type available";
    console.log("Current example resource type is", content);
    return {
      role: "tool",
      tool_call_id: toolCall.id,
      content: content,
    };
  }

  if (toolCall.function.name === "currentExampleResourceJson") {
    const content = context?.resourceJson || "No resource JSON available";
    console.log("Current example resource JSON is", content);
    return {
      role: "tool",
      tool_call_id: toolCall.id,
      content: content,
    };
  }

  return null; // Tool not handled by common handlers
}

// FhirPath-specific tool handler
function handleFhirPathTools(
  toolCall: ChatCompletionMessageToolCall,
  context?: IFhirPathEvaluationContext
): ChatCompletionMessageParam | null {
  if (toolCall.type !== "function") return null;

  if (toolCall.function.name === "currentContext") {
    const content = context?.currentContext || "No context expression available";
    console.log("Current context expression is", content);
    return {
      role: "tool",
      tool_call_id: toolCall.id,
      content: content,
    };
  }

  if (toolCall.function.name === "currentExpression") {
    const content = context?.currentExpression || "No FHIRPath expression available";
    console.log("Current FHIRPath expression is", content);
    return {
      role: "tool",
      tool_call_id: toolCall.id,
      content: content,
    };
  }

  return null; // Tool not handled by FhirPath handlers
}

// Questionnaire-specific tool handler
function handleQuestionnaireTools(
  toolCall: ChatCompletionMessageToolCall,
  context?: IQuestionnaireEvaluationContext
): ChatCompletionMessageParam | null {
  if (toolCall.type !== "function") return null;

  // Add questionnaire-specific tool handlers here
  // Example:
  // if (toolCall.function.name === "getCurrentQuestionnaireResponse") {
  //   const content = context?.questionnaireResponse || "No QuestionnaireResponse available";
  //   console.log("Current QuestionnaireResponse is", content);
  //   return {
  //     role: "tool",
  //     tool_call_id: toolCall.id,
  //     content: content,
  //   };
  // }

  return null; // Tool not handled by Questionnaire handlers
}

// FML-specific tool handler
function handleFmlTools(
  toolCall: ChatCompletionMessageToolCall,
  context?: IFmlEvaluationContext
): ChatCompletionMessageParam | null {
  if (toolCall.type !== "function") return null;

  // Add FML-specific tool handlers here
  // Example:
  // if (toolCall.function.name === "getCurrentMapping") {
  //   const content = context?.fmlMapping || "No FML mapping available";
  //   console.log("Current FML mapping is", content);
  //   return {
  //     role: "tool",
  //     tool_call_id: toolCall.id,
  //     content: content,
  //   };
  // }

  return null; // Tool not handled by FML handlers
}

// Generic factory function that creates a context-aware EvaluateTools function
// with support for custom tool handlers
function createEvaluateToolsWithHandlers<T extends IToolEvaluationContext>(
  context?: T,
  additionalHandlers?: Array<(toolCall: ChatCompletionMessageToolCall, context?: T) => ChatCompletionMessageParam | null>
) {
  return function(tool_calls: ChatCompletionMessageToolCall[]): Array<ChatCompletionMessageParam> {
    let result: Array<ChatCompletionMessageParam> = [];
    
    for (const toolCall of tool_calls) {
      // Try common tools first
      let response = handleCommonTools(toolCall, context);
      
      // If not handled, try additional handlers
      if (!response && additionalHandlers) {
        for (const handler of additionalHandlers) {
          response = handler(toolCall, context);
          if (response) break;
        }
      }
      
      // If still not handled, log a warning
      if (!response) {
        const functionName = toolCall.type === "function" ? toolCall.function.name : "unknown";
        console.warn(`Unhandled tool call: ${functionName}`);
        response = {
          role: "tool",
          tool_call_id: toolCall.id,
          content: `Tool ${functionName} is not implemented`,
        };
      }
      
      result.push(response);
    }
    
    return result;
  };
}

// Base factory (for backward compatibility and general use)
export function createEvaluateTools(context?: IToolEvaluationContext) {
  return createEvaluateToolsWithHandlers(context);
}

// Specialized factory functions for each use case
// These create context-aware tool evaluation functions that can access
// domain-specific data without changing the EvaluateChatPrompt signature.
//
// Usage example for FhirPath:
//   const evaluateTools = createFhirPathEvaluateTools({
//     resourceType: 'Patient',
//     resourceJson: JSON.stringify(patientResource),
//     currentContext: 'name[0]',
//     currentExpression: 'given.first()'
//   });
//   await EvaluateChatPrompt(messages, settings, 0, 4000, FhirPathTools, evaluateTools);
//
// Usage example for Questionnaire:
//   const evaluateTools = createQuestionnaireEvaluateTools({
//     resourceType: 'Questionnaire',
//     resourceJson: JSON.stringify(questionnaire),
//     questionnaireResponse: JSON.stringify(response),
//     sdcContext: sdcData
//   });
//   await EvaluateChatPrompt(messages, settings, 0, 4000, QuestionnaireTools, evaluateTools);
//
// Usage example for FML:
//   const evaluateTools = createFmlEvaluateTools({
//     fmlMapping: 'map "..." = "..."',
//     sourceStructure: JSON.stringify(sourceSD),
//     targetStructure: JSON.stringify(targetSD)
//   });
//   await EvaluateChatPrompt(messages, settings, 0, 4000, FmlTools, evaluateTools);

// FhirPath tester - includes expression and context tools
export function createFhirPathEvaluateTools(context?: IFhirPathEvaluationContext) {
  return createEvaluateToolsWithHandlers(context, [handleFhirPathTools]);
}

// Questionnaire tester - includes questionnaire-specific tools
export function createQuestionnaireEvaluateTools(context?: IQuestionnaireEvaluationContext) {
  return createEvaluateToolsWithHandlers(context, [handleQuestionnaireTools]);
}

// FML mapper - includes FML-specific tools
export function createFmlEvaluateTools(context?: IFmlEvaluationContext) {
  return createEvaluateToolsWithHandlers(context, [handleFmlTools]);
}

// Backward compatibility: original EvaluateTools function without context
export function EvaluateTools(
  tool_calls: ChatCompletionMessageToolCall[]
): Array<ChatCompletionMessageParam> {
  return createEvaluateTools()(tool_calls);
}

function validateExpression(expression: string): string {
  try {
    console.log(
      "Validating fhirpath expression: " + expression.replace(/\n/g, " ")
    );
    var ast: fpjsNode = fhirpath.parse(expression);

    // walk the ast to find all function references
    let functionNames: string[] = [];
    function walk(node: fpjsNode) {
      if (node.type === "FunctionInvocation") {
        const functionName = node.text.substring(0, node.text.indexOf("("));
        if (functionName && functionNames.indexOf(functionName) < 0) {
          functionNames.push(functionName);
        }
      }
      for (const child of node.children || []) {
        walk(child);
      }
    }
    walk(ast);

    let result = "This is a valid fhirpath expression.";
    if (functionNames.length > 0) {
      result += "\n\nThe expression uses the following functions:\n";
      // now validate that all functions are known
      for (const functionName of functionNames) {
        if (mapFunctionReferences.has(functionName)) {
          const functionDetails = mapFunctionReferences.get(functionName);
          result += `- \`${functionName}\`: \`${functionDetails?.title}\` (from section \`${functionDetails?.outlineNo}\`, URL: \`${functionDetails?.specUrl}\`)\n`;
        } else {
          result += `- \`${functionName}\`: This function is not defined in the FHIRPath specification.\n`;
        }
      }
    }
    return result;
  } catch (err: any) {
    console.log(err);
    return err?.message ?? "Error parsing expression";
  }
}
