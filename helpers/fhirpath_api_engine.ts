// Logic to extract the functionality of the fhirpath evaluations across the various engines
// There are 2 types of engines: RESTful and non-RESTful(local)
// All engines should produce the same output format that can then be processed by a common function 
// (the parameters object - that is partially documented in the server-api.md file)

import axios, { AxiosRequestHeaders, AxiosResponse, AxiosError, CancelTokenSource } from "axios";
import { settings } from "./user_settings";
import { requestFhirAcceptHeaders, requestFhirContentTypeHeaders, CreateOperationOutcome } from "./searchFhir";
import { VariableData, TestFhirpathData } from "../models/testenginemodel";
import { ResultData, TraceData, JsonNode, fpjsNode } from "../models/FhirpathTesterData";
import { getValue, getTraceValue } from "../models/FhirpathTesterData";
import { IJsonNode, parseJson, findNodeByPath } from "./json_parser";
import { parseXmlAndObject } from "./xml_parser";
import fhirpath, { AsyncOptions, Model } from "fhirpath";
import fhirpath_r4_model from "fhirpath/fhir-context/r4";
import fhirpath_r5_model from "fhirpath/fhir-context/r5";
// Note: R6 is not yet available in fhirpath.js package
// import fhirpath_r6_model from "fhirpath/fhir-context/r6";
import { IFhirPathEngineDetails } from "../types/fhirpath_test_engine";


export interface DebugTraceData {
  context: string;
  exprPosition?: number;
  exprLength?: number;
  exprName?: string;
  values?: DebugTraceValue[];
  index?: number;
  focusVar?: DebugTraceValue[];
  thisVar?: DebugTraceValue[];
}

export interface DebugTraceValue {
  resourcePath?: string;
  value?: any;
  valueType?: string;
}

export interface ResourceNode {
  /**
   * The parent resource node
   */
  parentResNode: ResourceNode | null;
  
  /**
   * The path of the node in the resource (e.g. Patient.name)
   */
  path: string | null;

  /** 
   * The index of the node in the array (e.g. The `0` in Patient.name[0])
   */
  index: number | undefined;
  
  propName: string | undefined;

  /**
   * The node's data or value (might be an object with sub-nodes, an array, or FHIR data type)
   */
  data: any;
  
  /**
   * Additional data stored in a property named with "_" prepended
   * See https://www.hl7.org/fhir/element.html#json for details
   */
  _data: Record<string, any>;
  
  /**
   * FHIR node data type, if the resource node is described in the FHIR model
   */
  fhirNodeDataType: string | null;
  
  /**
   * Cached converted data
   */
  convertData(): any;
 
  /**
   * The FHIR model used for this node
   */
  model : fhirpath.Model;

  /**
   * Retrieve any type information if available
   */
  getTypeInfo(): any;

  /**
   * Converts the node to its JSON representation
   */
  toJSON(): string;
}

export interface FhirPathEvaluationResult {
  results: ResultData[];
  debugTraceData: DebugTraceData[];
  processedByEngine?: string;
  raw?: fhir4b.Parameters;
  expressionParseOutcome?: fhir4b.OperationOutcome;
  saveOutcome?: fhir4b.OperationOutcome;
  showOutcome?: boolean;
  parseDebugTree?: string;  // AST from general/default engine
  parseDebugTreeJava?: string;  // AST from Java engine
  parseDebugTreeJs?: string;  // AST from fhirpath.js engine
}

export interface FhirPathEvaluationOptions {
  expression: string;
  contextExpression?: string;
  resourceJson?: string;
  variables: Map<string, VariableData>;
  terminologyServer: string;
  enableDebugTrace?: boolean;
  encodeResourceJsonAsExtension?: boolean;
  isXmlResource?: boolean;
}

function fullPropertyName(node: ResourceNode): string | undefined {
  if (node.propName === undefined) {
    return undefined;
  }
  // check if the property name is for a primitive extension in FHIR
  let propName = (node.propName?.startsWith('_') && node.model) ? node.propName.substring(1) : node.propName;

  // Now Check if this is a choice type
  if (node.parentResNode && node.model && node.fhirNodeDataType && propName.endsWith(node.fhirNodeDataType.charAt(0).toUpperCase() + node.fhirNodeDataType.substring(1))) {
    if (node.model && node.model.choiceTypePaths[node.parentResNode?.path + '.' + propName.substring(0, propName.length - node.fhirNodeDataType.length)]) {
      propName = propName.substring(0, propName.length - node.fhirNodeDataType.length);
    }
  }

  let result = node.parentResNode ? fullPropertyName(node.parentResNode) + '.' + propName : node.path ?? undefined;
  if (node.index !== undefined && node.index !== null) {
    result += '[' + node.index + ']';
  }
  return result;
}

/**
 * Execute a RESTful FHIRPath engine request
 */
export async function executeRestfulEngine(
  url: string, 
  parameters: fhir4b.Parameters, 
  cancelSource?: CancelTokenSource
): Promise<FhirPathEvaluationResult> {
  try {
    let token = cancelSource?.token;
    let response: AxiosResponse<fhir4b.Parameters | fhir4b.OperationOutcome, any>;
    
    response = await axios.post<fhir4b.Parameters>(url, parameters, {
      cancelToken: token,
      headers: {
        "Accept": requestFhirAcceptHeaders,
        "Content-Type": requestFhirContentTypeHeaders
      }
    });

    if (token?.reason) {
      console.log(token.reason);
      return { results: [], debugTraceData: [] };
    }

    const jsonValue = parameters.parameter?.find(p => p.name === 'resource')?.valueString || '{}';
    const astJson: IJsonNode | undefined = parseJson(jsonValue);

    const results = response.data;
    if (results) {
      if (results.resourceType === 'OperationOutcome') {
        return {
          results: [],
          debugTraceData: [],
          saveOutcome: results,
          showOutcome: true
        };
      }

      const evaluationResult: FhirPathEvaluationResult = {
        results: [],
        debugTraceData: [],
        raw: results
      };

      if (results.parameter) {
        for (let entry of results.parameter) {
          if (entry.name === 'parameters') {
            if (entry.part) {
              for (let part of entry.part) {
                // read the processing engine version
                if (part.name === 'evaluator') {
                  evaluationResult.processedByEngine = part.valueString;
                }
                if (part.name === 'parseDebugTree' && part.valueString) {
                  evaluationResult.parseDebugTree = part.valueString;
                }
                if (part.name === 'parseDebugTreeJava' && part.valueString) {
                  evaluationResult.parseDebugTreeJava = part.valueString;
                }
                if (part.name === 'parseDebugTreeJs' && part.valueString) {
                  evaluationResult.parseDebugTreeJs = part.valueString;
                }
                if (part.name === 'debugOutcome' && part.resource) {
                  evaluationResult.expressionParseOutcome = part.resource as fhir4b.OperationOutcome;
                }
              }
            }
            continue; // skip over the configuration settings
          }

          if (entry.name == 'debug-trace') {
            // Put the trace data into the array
            evaluationResult.debugTraceData.push({ 
              context: entry.valueString ?? ''
            });

            // values for this context
            for (let part of entry.part ?? []) {
              let posParts = part.name?.split(',');
              let exprPosition = posParts && posParts.length > 0 ? parseInt(posParts[0]) : undefined;
              let exprLength = posParts && posParts.length > 1 ? parseInt(posParts[1]) : undefined;
              let exprName = posParts && posParts.length > 2 ? posParts[2] : undefined;

              let debugTraceVal: DebugTraceData = {
                context: entry.valueString ?? '',
                exprName: exprName,
                exprPosition: exprPosition,
                exprLength: exprLength,
                values: [],
                thisVar: [],
                focusVar: [],
              };
              evaluationResult.debugTraceData.push(debugTraceVal);

              // grab all the values from this expression node evaluation ($this, $index and result)
              for (let partValue of part.part ?? []) {
                if (partValue.name == 'index') {
                  debugTraceVal.index = partValue.valueInteger;
                  continue;
                }

                if (partValue.name == 'this-resource-path') {
                  debugTraceVal.thisVar?.push({ resourcePath: partValue.valueString });
                  continue;
                }

                if (partValue.name.startsWith('this-')) {
                  const traceValue = getValue(partValue);
                  if (traceValue.length > 0)
                    debugTraceVal.thisVar?.push({ value: JSON.stringify(traceValue[0].value, null, 4) });
                  continue;
                }

                if (partValue.name == 'focus-resource-path') {
                  debugTraceVal.focusVar?.push({ resourcePath: partValue.valueString });
                  continue;
                }

                if (partValue.name.startsWith('focus-')) {
                  const traceValue = getValue(partValue);
                  if (traceValue.length > 0)
                    debugTraceVal.focusVar?.push({ value: JSON.stringify(traceValue[0].value, null, 4) });
                  continue;
                }

                if (partValue.name == 'resource-path') {
                  debugTraceVal.values?.push({ resourcePath: partValue.valueString });
                  continue;
                }
                
                // get the trace value
                const traceValue = getValue(partValue);
                if (traceValue) {
                  if (traceValue.length > 0)
                    debugTraceVal.values?.push({ value: JSON.stringify(traceValue[0].value, null, 4) });
                }
              }
            }
            continue; // skip over the debug trace
          }

          // Anything else is a result
          if (entry.name == 'result') {
            let resultItem: ResultData = { context: entry.valueString, result: [], trace: [] };
            if (astJson && entry.valueString) {
              const node = findNodeByPath(astJson, entry.valueString);
              if (node) resultItem.position = node.position;
            }
            if (entry.part) {
              for (let part of entry.part) {
                if (part.name === 'trace') {
                  resultItem.trace.push(...getTraceValue(part));
                } else {
                  resultItem.result.push(...getValue(part));
                }
              }
            }
            evaluationResult.results.push(resultItem);
          }
        }
      }

      return evaluationResult;
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const serverError = err as AxiosError<fhir4b.OperationOutcome>;
      if (serverError && serverError.response) {
        // Server returned an error response (4xx, 5xx)
        return {
          results: [],
          debugTraceData: [],
          saveOutcome: serverError.response.data,
          showOutcome: true
        };
      } else {
        // Network error, CORS error, or request setup error (no response received)
        const errorMessage = serverError.message || 'Network error occurred';
        const isCorsError = errorMessage.includes('CORS') || errorMessage.includes('Network Error');
        
        return {
          results: [],
          debugTraceData: [],
          saveOutcome: CreateOperationOutcome(
            'error',
            'exception',
            isCorsError 
              ? `CORS or network error: ${errorMessage}. The external engine may not allow requests from this origin.`
              : `Network request failed: ${errorMessage}`
          ),
          showOutcome: true
        };
      }
    } else {
      // Non-axios error
      console.log("Client Error:", err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      return {
        results: [],
        debugTraceData: [],
        saveOutcome: CreateOperationOutcome('error', 'exception', `Client error: ${errorMessage}`),
        showOutcome: true
      };
    }
  }

  return { results: [], debugTraceData: [] };
}

/**
 * Convert fhirpath.js AST to our JsonNode format
 */
export function convertFhirPathJsToAst(ast: fpjsNode): JsonNode {
  let result: JsonNode = {
    ExpressionType: ast.type,
    Name: ast.terminalNodeText ? ast.terminalNodeText[0] : ast.text ?? "",
    Arguments: [],
    ReturnType: "",
  };

  if (ast.length) {
    result.Length = ast.length;
  }

  if (ast.start) {
    result.Line = ast.start.line;
    result.Column = ast.start.column;
  }

  // convert all the child nodes
  if (ast.children) {
    ast.children.forEach((element: fpjsNode) => {
      result.Arguments?.push(convertFhirPathJsToAst(element));
    });
  } else {
    delete result.Arguments;
  }

  // Populate the Type for known types
  switch (result.ExpressionType) {
    case "StringLiteral":
      result.ReturnType = "string";
      result.ExpressionType = "ConstantExpression";
      result.Name = result.Name.substring(1, result.Name.length - 1);
      break;
    case "BooleanLiteral":
      result.ReturnType = "boolean";
      result.ExpressionType = "ConstantExpression";
      break;
    case "QuantityLiteral":
      result.ReturnType = "Quantity";
      result.ExpressionType = "ConstantExpression";
      if (result.Arguments && result.Arguments.length > 0) {
        result.Name = result.Arguments[0].Name;
      }
      delete result.Arguments;
      return result;
    case "DateTimeLiteral":
      result.ReturnType = "dateTime";
      result.ExpressionType = "ConstantExpression";
      result.Name = result.Name.substring(1);
      break;
    case "TimeLiteral":
      result.ReturnType = "time";
      result.ExpressionType = "ConstantExpression";
      result.Name = result.Name.substring(2);
      break;
    case "NumberLiteral":
      result.ReturnType = "Number (decimal or integer)";
      result.ExpressionType = "ConstantExpression";
      break;
  }

  // Short circuit some of the AST that is not useful to display
  if (
    result.Arguments?.length == 1 &&
    result.ExpressionType == "FunctionInvocation"
  ) {
    return result.Arguments[0];
  }
  if (result.Arguments?.length == 1 && result.ExpressionType == "Quantity") {
    result.Name = result.Name + " " + result.Arguments[0].Name;
    delete result.Arguments;
    return result;
  }
  if (result.Arguments?.length == 1 && result.ExpressionType == "Unit") {
    return result.Arguments[0];
  }
  if (result.Arguments?.length == 1 && result.ExpressionType == "LiteralTerm") {
    return result.Arguments[0];
  }
  if (
    result.Arguments?.length == 1 &&
    result.ExpressionType == "TermExpression"
  ) {
    return result.Arguments[0];
  }
  if (
    result.Arguments?.length == 1 &&
    result.ExpressionType == "ExternalConstantTerm"
  ) {
    return result.Arguments[0];
  }

  if (
    result.ExpressionType == "MemberInvocation" &&
    result.Arguments &&
    result.Arguments.length === 1 &&
    result.Arguments[0].ExpressionType == "Identifier"
  ) {
    result.ExpressionType = "ChildExpression";
    result.Name = result.Arguments[0].Name ?? "";
    delete result.Arguments;
  }

  if (
    result.ExpressionType == "ExternalConstant" &&
    result.Arguments &&
    result.Arguments.length === 1 &&
    result.Arguments[0].ExpressionType == "Identifier"
  ) {
    result.ExpressionType = "VariableRefExpression";
    result.Name = result.Arguments[0].Name ?? "";
    delete result.Arguments;
  }

  // restructure the function call part of the tree
  if (
    result.ExpressionType == "Functn" &&
    result.Arguments &&
    result.Arguments.length === 2 &&
    result.Arguments[0].ExpressionType == "Identifier" &&
    result.Arguments[1].ExpressionType == "ParamList"
  ) {
    result.ExpressionType = "FunctionCallExpression";
    result.Name = result.Arguments[0].Name ?? "";
    result.Arguments = result.Arguments[1].Arguments;
  }
  if (
    result.ExpressionType == "Functn" &&
    result.Arguments &&
    result.Arguments.length === 1 &&
    result.Arguments[0].ExpressionType == "Identifier"
  ) {
    result.ExpressionType = "FunctionCallExpression";
    result.Name = result.Arguments[0].Name ?? "";
    delete result.Arguments;
  }

  if (
    result.Arguments?.length == 1 &&
    result.ExpressionType == "InvocationTerm" // this is the "scoping node"
  ) {
    // inject the scoping node into the tree
    let scopeNode: JsonNode = {
      ExpressionType: "AxisExpression",
      Name: "builtin.that",
      Arguments: [],
      ReturnType: "",
    };
    if (result.Arguments[0].Arguments)
      result.Arguments[0].Arguments?.unshift(scopeNode);
    else result.Arguments[0].Arguments = [scopeNode];
    return result.Arguments[0];
  }

  // -----------
  if (
    result.ExpressionType == "InvocationExpression" &&
    result.Arguments &&
    result.Arguments?.length > 1
  ) {
    if (result.Arguments[1].Arguments)
      result.Arguments[1].Arguments?.unshift(result.Arguments[0]);
    else result.Arguments[1].Arguments = [result.Arguments[0]];
    return result.Arguments[1];
  }
  return result;
}

/**
 * Evaluate FHIRPath expression using fhirpath.js engine (unified for R4 and R5)
 */
export async function evaluateExpressionUsingFhirpathJs(
  options: FhirPathEvaluationOptions,
  fhirVersion: 'R4' | 'R5' | 'R6' = 'R4'
): Promise<FhirPathEvaluationResult> {
  const model: Model = fhirVersion === 'R5' ? fhirpath_r5_model
    : fhirVersion === 'R6' ? fhirpath_r5_model // Use R5 as fallback for R6 until available
    : fhirpath_r4_model;
  const versionLabel = fhirVersion === 'R5' ? '(r5)'
    : fhirVersion === 'R6' ? '(r6 - using r5 model)'
    : '(r4b)';
  
  const result: FhirPathEvaluationResult = {
    results: [],
    debugTraceData: [],
    processedByEngine: `fhirpath.js-${fhirpath.version} ${versionLabel}`
  };

  // Parse the FHIRPath expression to generate AST
  if (options.expression) {
    try {
      const parsedAst = fhirpath.parse(options.expression);
      if (parsedAst.children && parsedAst.children.length > 0) {
        const node = convertFhirPathJsToAst(parsedAst);
        const astTree = (node.Arguments ? node.Arguments[0].Arguments : []) ?? [];
        if (astTree.length > 0) {
          result.parseDebugTree = JSON.stringify(astTree[0]);
        }
      }
    } catch (err: any) {
      console.log('Failed to parse expression for AST:', err);
      // Continue execution even if AST generation fails
    }
  }

  // Parse the resource JSON
  let fhirData = { resourceType: 'Patient' }; // some dummy data
  let astJson: IJsonNode | undefined = undefined;
  if (options.resourceJson) {
    try {
      // if this is XML content, we first need to convert it into json from the XML content
      if (options.resourceJson.trim().startsWith('<')) {
        const data = parseXmlAndObject(options.resourceJson, model);
        if (data?.object?.resourceType) {
          fhirData = data.object;
          astJson = data.node;
        } else {
          result.saveOutcome = CreateOperationOutcome('fatal', 'exception', 'The provided XML content does not appear to be a valid FHIR resource (missing resourceType)');
          result.showOutcome = true;
          return result;
        }
      } else {
        fhirData = JSON.parse(options.resourceJson);
        astJson = parseJson(options.resourceJson + '', model);
      }
    } catch (err: any) {
      console.log(err);
      if (err.message) {
        result.saveOutcome = CreateOperationOutcome('fatal', 'exception', err.message);
        result.showOutcome = true;
      } else {
        result.saveOutcome = CreateOperationOutcome('fatal', 'exception', err);
        result.showOutcome = true;
      }
      return result;
    }
  } else {
    astJson = parseJson(options.resourceJson + '', model);
  }

  // Setup environment with variables
  var environment: Record<string, any> = { resource: fhirData, rootResource: fhirData };
  for (let v of options.variables) {
    let value = v[1].data;
    if (value && (value.startsWith("[") || value.startsWith("{"))) {
      // convert to an object
      try {
        value = JSON.parse(value);
      } catch(e) {
        console.log(e);
      }
    }
    environment[v[0]] = value;
  }

  let contextNodes: ResourceNode[] = [];
  let contextTraceOutputFunction = function (x: ResourceNode | ResourceNode[], label: string): ResourceNode | ResourceNode[] {
    if (label === 'fhirpath-lab-context') {
      if (Array.isArray(x)) {
        for (let item of x) {
          contextNodes.push(item);
        }
      } else {
        contextNodes.push(x);
      }
    }
    return x;
  };

  // Evaluate context expression or use default
  if (options.contextExpression) {
    try {
      let optionsContext: AsyncOptions = {
        traceFn: contextTraceOutputFunction,
        async: true,
        terminologyUrl: options.terminologyServer
      };
      let data = fhirpath.evaluate(fhirData, "select(" + options.contextExpression + ").trace('fhirpath-lab-context')", environment, model, optionsContext);
      if (data instanceof Promise) {
        await data;
      }
    } catch (err: any) {
      console.log(err);
      if (err.message) {
        result.saveOutcome = CreateOperationOutcome('fatal', 'exception', err.message);
        result.showOutcome = true;
        return result;
      }
    }
  } else {
    try {
      let data = fhirpath.evaluate(fhirData, "%resource", environment, model);
      if (data instanceof Promise)
        contextNodes = await data;
      else 
        contextNodes = data as any[];
    } catch (err: any) {
      console.log(err);
      if (err.message) {
        result.saveOutcome = CreateOperationOutcome('fatal', 'exception', err.message);
        result.showOutcome = true;
        return result;
      }
    }
  }

  // Process each context node
  for (let contextNode of contextNodes) {
    let resData: ResultData;
    if (options.contextExpression) {
      resData = { context: `${fullPropertyName(contextNode)}`, result: [], trace: [] };
      if (astJson) {
        const node = findNodeByPath(astJson, resData.context + '');
        if (node?.position) resData.position = node.position;
      }
    } else {
      resData = { result: [], trace: [] };
    }

    // add context to the trace data
    result.debugTraceData.push({ 
      context: resData.context ?? ''
    });

    let outputNodes: ResourceNode[] = [];
    let tracefunction = function (x: ResourceNode | ResourceNode[], label: string): ResourceNode | ResourceNode[] {
      if (label === 'fhirpath-lab-result') {
        if (Array.isArray(x)) {
          for (let item of x) {
            outputNodes.push(item);
          }
        } else {
          outputNodes.push(x);
        }
        return x;
      }
      if (Array.isArray(x)) {
        for (let item of x) {
          let itemPath: string | undefined = fullPropertyName(item);
          if (typeof item.getTypeInfo === "function") {
            let ti = item.getTypeInfo();
            resData.trace.push({ name: label ?? "", path: itemPath, type: ti.name, value: JSON.stringify(item.data, null, settings.getTabSpaces()) });
          } else {
            resData.trace.push({ name: label ?? "", path: itemPath, value: JSON.stringify(item, null, settings.getTabSpaces()) });
          }
        }
      } else {
        let itemPath: string | undefined = fullPropertyName(x);
        resData.trace.push({ name: label ?? "", path: itemPath, value: JSON.stringify(x, null, settings.getTabSpaces()) });
      }
      console.log("TRACE3:[" + (label || "") + "]", x);
      return x;
    };

    try {
      let useExpression = options.expression ?? '';
      let exprLineOffsets: number[] = [];
      exprLineOffsets.push(0);
      for (const line of useExpression.split('\n')) {
        exprLineOffsets.push(line.length + 1 + exprLineOffsets[exprLineOffsets.length - 1]); // +1 for the \n
      }

      let path = {
        base: resData.context ?? '', 
        expression: "select(\n" + useExpression + "\n).trace('fhirpath-lab-result')"
      };

      let completedTracing = false;
      let evaluationOptions: any = {
        traceFn: tracefunction,
        async: true,
        terminologyUrl: options.terminologyServer,
        debugger: (ctx: any, focus: any, expressionResult: any, node: any) => {
          if (completedTracing) 
            return;
          if (node.type === 'Functn') {
            // is this the hack surrounding select that does the result capture via custom trace?
            if (node.text == "trace('fhirpath-lab-result')") {
              completedTracing = true;
              result.debugTraceData.pop();
              return;
            }
          }
          if (node.type !== 'LiteralTerm'
            && node.type !== 'ExternalConstantTerm'
            && node.type !== 'MemberInvocation'
            && node.type !== 'FunctionInvocation'
            && node.type !== 'ThisInvocation'
            && node.type !== 'IndexInvocation'
            && node.type !== 'TotalInvocation'
            && node.type !== 'IndexerExpression'
            && node.type !== 'PolarityExpression'
            && node.type !== 'MultiplicativeExpression'
            && node.type !== 'AdditiveExpression'
            && node.type !== 'TypeExpression'
            && node.type !== 'UnionExpression'
            && node.type !== 'InequalityExpression'
            && node.type !== 'EqualityExpression'
            && node.type !== 'MembershipExpression'
            && node.type !== 'AndExpression'
            && node.type !== 'OrExpression'
            && node.type !== 'ImpliesExpression'
          ) {
            // console.log("skipping " + node.type);
            return;
          }
          // console.log(ctx, node, focus, expressionResult);
          let debugTraceVal: DebugTraceData = {
            context: fullPropertyName(contextNode) ?? '',
            exprName: node.text,
            exprPosition: exprLineOffsets[node.start.line - 2] + node.start.column - 1,
            exprLength: node.length,
            values: [],
            thisVar: [],
            focusVar: [],
          };

          if (node.type === 'LiteralTerm')
            debugTraceVal.exprName = 'constant';

          for (let item of focus) {
            let typeName = Object.prototype.toString.call(item ?? '').substring(8).replace(']', '')
            if (typeof item.getTypeInfo === "function")
              typeName = item.getTypeInfo().name;
            let val: DebugTraceValue = { 
              valueType: typeName, resourcePath: fullPropertyName(item) 
            };
            if (!val.resourcePath)
              val.value = item.data ? JSON.stringify(item.data, null, settings.getTabSpaces()) : JSON.stringify(item, null, settings.getTabSpaces());
            debugTraceVal.focusVar?.push(val);
          }

          if (ctx.$index != undefined) {
            debugTraceVal.index = ctx.$index;
          }
          if (ctx.$this) {
            for (let item of ctx.$this) {
              let typeName = Object.prototype.toString.call(item ?? '').substring(8).replace(']', '')
              if (typeof item.getTypeInfo === "function")
                typeName = item.getTypeInfo().name;
              let val: DebugTraceValue = { 
                valueType: typeName, resourcePath: fullPropertyName(item) 
              };
              if (!val.resourcePath)
                val.value = item.data ? JSON.stringify(item.data, null, settings.getTabSpaces()) : JSON.stringify(item, null, settings.getTabSpaces());
              debugTraceVal.thisVar?.push(val);
            }
          }
          for (let item of expressionResult) {
            let typeName = Object.prototype.toString.call(item ?? '').substring(8).replace(']', '')
            if (typeof item.getTypeInfo === "function")
              typeName = item.getTypeInfo().name;
            let val: DebugTraceValue = { 
              valueType: typeName, resourcePath: fullPropertyName(item) 
            };
            if (!val.resourcePath)
              val.value = item.data ? JSON.stringify(item.data, null, settings.getTabSpaces()) : JSON.stringify(item, null, settings.getTabSpaces());
            debugTraceVal.values?.push(val);
          }

          result.debugTraceData.push(debugTraceVal);
        }
      };

      let data = fhirpath.evaluate(contextNode, path, environment, model, evaluationOptions);
      let res: any[];
      if (data instanceof Promise)
        res = await data;
      else
        res = data as any[];
      
      result.results.push(resData);

      for (let item of outputNodes) {
        let typeName = Object.prototype.toString.call(item ?? '').substring(8).replace(']', '')
        if (typeof item.getTypeInfo === "function")
          typeName = item.getTypeInfo().name;
        resData.result.push({ type: typeName, path: fullPropertyName(item), value: item.data ? JSON.stringify(item.data, null, settings.getTabSpaces()) : item });
      }
    } catch (err: any) {
      console.log(err);
      if (err.message) {
        result.saveOutcome = CreateOperationOutcome('fatal', 'exception', err.message);
        result.showOutcome = true;
        return result;
      }
    }
  }

  return result;
}

/**
 * Convert FhirPathEvaluationOptions to Parameters object for RESTful engines
 */
export function convertOptionsToParameters(
  options: FhirPathEvaluationOptions,
  resourceId?: string,
  enableDebugTrace?: boolean
): fhir4b.Parameters {
  let parameters: fhir4b.Parameters = { 
    resourceType: "Parameters", 
    parameter: [{ name: "expression", valueString: options.expression }] 
  };

  // Add context expression if provided
  if (options.contextExpression) {
    parameters.parameter?.push({ name: "context", valueString: options.contextExpression });
  }

  // Add validation parameter
  parameters.parameter?.push({ name: "validate", valueBoolean: true });

  // Add variables if provided
  if (options.variables && options.variables.size > 0) {
    let pVars: fhir4b.ParametersParameter = { name: "variables", part: [] };
    parameters.parameter?.push(pVars);
    
    for (const varName of options.variables.keys()) {
      let value = options.variables.get(varName)?.data;
      if (value && (value.startsWith("[") || value.startsWith("{"))) {
        // JSON data - try to parse it
        try {
          const po = JSON.parse(value);
          if (po.resourceType) {
            // It's a FHIR resource
            pVars.part?.push({ name: varName, resource: po });
            continue;
          }
        } catch (e) {
          console.log(e);
        }
        // Complex JSON but not a resource - use extension format
        pVars.part?.push({ name: varName, extension: [{ url: 'http://fhir.forms-lab.com/StructureDefinition/json-value', valueString: value }] });
      } else {
        // Primitive value - auto-detect type
        if (value === 'true') pVars.part?.push({ name: varName, valueBoolean: true });
        else if (value === 'false') pVars.part?.push({ name: varName, valueBoolean: false });
        else if (value && value.match(/^[-+]?[0-9]+$/)) pVars.part?.push({ name: varName, valueInteger: parseInt(value) });
        else if (value && value.match(/^[-+]?[0-9]+.[0-9]+$/)) pVars.part?.push({ name: varName, valueDecimal: parseFloat(value) });
        else pVars.part?.push({ name: varName, valueString: value });
      }
    }
    
    if (pVars.part?.length === 0) {
      delete pVars.part;
    }
  }

  // Add resource (either JSON content or reference)
  if (options.resourceJson) {
    if (options.isXmlResource) {
      // XML content - use XML extension
      parameters.parameter?.push({ name: "resource", extension: [{ url: "http://fhir.forms-lab.com/StructureDefinition/xml-value", valueString: options.resourceJson }] });
    } else if (options.encodeResourceJsonAsExtension) {
      // Engine requires JSON as extension
      parameters.parameter?.push({ name: "resource", extension: [{ url: "http://fhir.forms-lab.com/StructureDefinition/json-value", valueString: options.resourceJson }] });
    } else {
      // Standard JSON resource
      try {
        parameters.parameter?.push({ name: "resource", resource: JSON.parse(options.resourceJson) });
      } catch (e) {
        // If parsing fails, add as string reference
        parameters.parameter?.push({ name: "resource", valueString: options.resourceJson });
      }
    }
  } else if (resourceId) {
    if (!resourceId.startsWith('http')) {
      parameters.parameter?.push({ name: "resource", valueString: settings.getFhirServerExamplesUrl() + '/' + resourceId });
    } else {
      parameters.parameter?.push({ name: "resource", valueString: resourceId });
    }
  }

  // Add terminology server if provided
  if (options.terminologyServer) {
    parameters.parameter?.push({ name: "terminologyserver", valueString: options.terminologyServer });
  }

  // Add debug trace if enabled
  if (enableDebugTrace) {
    parameters.parameter?.push({ name: "debug_trace", valueBoolean: true });
  }

  return parameters;
}

/**
 * Convert FhirPathEvaluationOptions to Parameters object for Java R5/R6 engines (special handling)
 */
export function convertOptionsToParametersJavaR5R6(
  options: FhirPathEvaluationOptions,
  resourceId?: string,
  enableDebugTrace?: boolean
): fhir4b.Parameters {
  let parameters = convertOptionsToParameters(options, resourceId, enableDebugTrace);
  
  // Special handling for Java R5/R6 engines - use extension for resource JSON
  if (options.resourceJson && parameters.parameter) {
    // Remove the regular resource parameter
    parameters.parameter = parameters.parameter.filter(p => p.name !== 'resource');
    
    // Add with extension format
    parameters.parameter.push({ 
      name: "resource", 
      extension: [{ 
        url: "http://fhir.forms-lab.com/StructureDefinition/json-value", 
        valueString: options.resourceJson 
      }] 
    });
  }
  
  return parameters;
}

/**
 * Get engine URL and determine if it's a local (non-RESTful) engine
 */
export async function getEngineInfo(selectedEngine: IFhirPathEngineDetails): Promise<{
  url?: string;
  isLocal: boolean;
  requiresSpecialParameterHandling: boolean;
  astSupported: boolean;
}> {
  const engineName = selectedEngine.name.toLowerCase();
  const fhirVersion = selectedEngine.fhirVersion.toLowerCase();
  
  // Local engines (non-RESTful) - check if external flag is false or undefined
  if (!selectedEngine.external) {
    if (engineName === "fhirpath.js") {
      return { isLocal: true, requiresSpecialParameterHandling: false, astSupported: true };
    }
  }
  
  // RESTful engines - use the URL from the engine details if available
  let url: string | undefined = await settings.getServerEngineUrl(selectedEngine.configSetting);
  let requiresSpecialParameterHandling = false;
  let astSupported = true;
  
  // Determine special parameter handling for Java R5/R6 engines
  if ((engineName.includes("hapi") || engineName.includes("java")) && 
      (fhirVersion === "r5" || fhirVersion === "r6")) {
    requiresSpecialParameterHandling = true;
  }
  
  return { 
    url, 
    isLocal: false, 
    requiresSpecialParameterHandling, 
    astSupported 
  };
}

/**
 * Evaluate FHIRPath expression using the appropriate engine
 */
export async function evaluateFhirPathExpression(
  options: FhirPathEvaluationOptions,
  selectedEngine: IFhirPathEngineDetails,
  resourceId?: string,
  cancelSource?: CancelTokenSource
): Promise<FhirPathEvaluationResult> {
  const engineInfo = await getEngineInfo(selectedEngine);
  
  if (engineInfo.isLocal) {
    // Use local fhirpath.js engine
    const fhirVersion = selectedEngine.fhirVersion.toLowerCase() === 'r5' ? 'R5' : 'R4';
    return await evaluateExpressionUsingFhirpathJs(options, fhirVersion as 'R4' | 'R5' | 'R6');
  } else {
    // Use RESTful engine
    if (!engineInfo.url) {
      throw new Error(`No URL configured for engine: ${selectedEngine.name}`);
    }
    
    let parameters: fhir4b.Parameters;
    if (engineInfo.requiresSpecialParameterHandling) {
      parameters = convertOptionsToParametersJavaR5R6(options, resourceId, options.enableDebugTrace);
    } else {
      parameters = convertOptionsToParameters(options, resourceId, options.enableDebugTrace);
    }
    
    return await executeRestfulEngine(engineInfo.url, parameters, cancelSource);
  }
}

