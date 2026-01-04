import antlr4, { ErrorListener, RecognitionException, Recognizer, Token } from "antlr4";
import Lexer from "../fml-parser/FmlMappingLexer";
import Parser from "../fml-parser/FmlMappingParser";
import { OperationOutcome } from "fhir/r4b";
import type { FmlStructureMap, ParseError } from "./fml_models";
import { FmlModelBuilder } from "./fml_visitor";


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
  let chars = new antlr4.CharStream(fmlText);
  let lexer = new Lexer(chars);
  let tokens = new antlr4.CommonTokenStream(lexer);
  let parser = new Parser(tokens);

  let errListener = new FmlParserErrorListener();
  parser.addErrorListener(errListener);
  let tree = parser.structureMap();

  const errOutcome = errListener.result();
  if (errOutcome.issue.length > 0) {
    return errOutcome;
  }

  try {
    // Use the model builder to convert parse tree to StructureMap model
    const builder = new FmlModelBuilder();
    const structureMap = builder.buildStructureMap(tree);
    return structureMap;
  } catch (error) {
    // Return errors as OperationOutcome
    return {
      resourceType: "OperationOutcome",
      issue: [{
        severity: "error",
        code: "exception",
        details: {
          text: error instanceof Error ? error.message : String(error)
        }
      }]
    };
  }
}

class FmlParserErrorListener extends ErrorListener<Token> {
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

  syntaxError = (recognizer: Recognizer<Token>, offendingSymbol: Token, line: number, column: number, msg: string, e: RecognitionException | undefined): void => {
    console.log("Err: @" + line + ":" + column + " " + msg);
    
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
