import antlr4, { ErrorListener, RecognitionException, Recognizer, Token } from "antlr4";
import Lexer from "../fml-parser/FmlMappingLexer";
import Parser from "../fml-parser/FmlMappingParser";
import type { OperationOutcome } from "fhir/r4b";
import type { FmlStructureMap, ParseError } from "./fml_models";
import { FmlModelBuilder } from "./fml_visitor";

export interface PartialFmlParseResult {
  model?: FmlStructureMap;
  outcome: OperationOutcome;
}


/**
 * Parse FML text and build a structured object model with position tracking.
 * 
 * Returns either:
 * - A StructureMap object model (with position information for each element) on success
 * - An OperationOutcome with validation errors if parsing fails
 * 
 * @param fmlText The FML text to parse
 * @returns StructureMap on success, or OperationOutcome with errors on failure
 * 
 * @example
 * const result = parseFML(fmlText);
 * if ('resourceType' in result && result.resourceType === 'OperationOutcome') {
 *   // Handle validation errors
 *   console.error('Validation errors:', result.issue);
 * } else {
 *   // Process the structured model
 *   const map = result;
 *   console.log('Groups:', map.groups.length);
 * }
 */
export function parseFML(fmlText: string): FmlStructureMap | OperationOutcome {
  const result = parseFMLPartial(fmlText);
  return result.outcome.issue.length > 0 || !result.model
    ? result.outcome
    : result.model;
}

/**
 * Parse FML and retain the model recovered by ANTLR even when syntax errors
 * are present. Consumers must inspect outcome before treating the model as a
 * valid document.
 */
export function parseFMLPartial(fmlText: string): PartialFmlParseResult {
  let chars = new antlr4.CharStream(fmlText);
  let lexer = new Lexer(chars);
  let tokens = new antlr4.CommonTokenStream(lexer);
  let parser = new Parser(tokens);

  const lexerErrorListener = new FmlParserErrorListener<number>();
  const parserErrorListener = new FmlParserErrorListener<Token>();
  lexer.removeErrorListeners();
  lexer.addErrorListener(lexerErrorListener);
  parser.removeErrorListeners();
  parser.addErrorListener(parserErrorListener);
  let tree = parser.structureMap();

  const errOutcome: OperationOutcome = {
    resourceType: "OperationOutcome",
    issue: [
      ...lexerErrorListener.result().issue,
      ...parserErrorListener.result().issue,
    ],
  };
  try {
    const builder = new FmlModelBuilder(fmlText);
    const structureMap = builder.buildStructureMap(tree);
    return {model: structureMap, outcome: errOutcome};
  } catch (error) {
    errOutcome.issue.push({
        severity: "error",
        code: "exception",
        details: {
          text: error instanceof Error ? error.message : String(error)
        }
    });
    return {outcome: errOutcome};
  }
}

export function isFmlParseError(result: FmlStructureMap | OperationOutcome): result is OperationOutcome {
  return "resourceType" in result && result.resourceType === "OperationOutcome";
}

class FmlParserErrorListener<TSymbol> extends ErrorListener<TSymbol> {
  constructor() {
    super();
  }

  private outcome: OperationOutcome = {
    resourceType: "OperationOutcome",
    issue: []
  };

  private errors: ParseError[] = [];

  public result(): OperationOutcome {
    return this.outcome;
  }

  public getErrors(): ParseError[] {
    return this.errors;
  }

  syntaxError = (recognizer: Recognizer<TSymbol>, offendingSymbol: TSymbol, line: number, column: number, msg: string, e: RecognitionException | undefined): void => {
    this.outcome.issue.push({
      severity: "error",
      code: "syntax",
      details: {
        text: msg
      },
      location: ["@" + line + ":" + column],
    });

    this.errors.push({
      severity: "error",
      code: "syntax",
      message: msg,
      location: "@" + line + ":" + column,
      line: line,
      column: column
    });
  };
}
