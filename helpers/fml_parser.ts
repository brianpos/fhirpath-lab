import antlr4, { ErrorListener, RecognitionException, Recognizer, Token } from "antlr4";
import { ParseTreeWalker } from "antlr4";
import Lexer from "../fml-parser/FmlMappingLexer";
import Parser, { StructureMapContext } from "../fml-parser/FmlMappingParser";
import Listener from "../fml-parser/FmlMappingListener";

import { choiceTypePaths, path2Type } from "fhirpath/fhir-context/r4";
import { pathsDefinedElsewhere } from "fhirpath/fhir-context/r4";
import { type2Parent } from "fhirpath/fhir-context/r4";
import FmlMappingParser from "../fml-parser/FmlMappingParser";
import { OperationOutcome } from "fhir/r4b";


export function parseFML(path: string) {
  let chars = new antlr4.CharStream(path);
  let lexer = new Lexer(chars);
  let tokens = new antlr4.CommonTokenStream(lexer);
  let parser = new Parser(tokens);
  // parser.buildParseTrees = true;

  // Remove any error listeners as we assume that the format of the json
  // is valid and don't want to report any issues from parsing
  // Typically used on JSON that was validated elsewhere, so should be valid
  // lexer.removeErrorListeners();
  // parser.removeErrorListeners();

  let errListener = new FmlParserErrorListener();
  parser.addErrorListener(errListener);
  let tree = parser.structureMap();

  const errOutcome = errListener.result();
  if (errOutcome.issue.length > 0) {
    return errOutcome;
  }
  return tree;
};

class FmlParserErrorListener extends ErrorListener<Token> {
  constructor() {
    super();
  }

  private outcome: OperationOutcome = {
    resourceType: "OperationOutcome",
    issue: []
  };

  public result() : OperationOutcome {
    return this.outcome;
  }

  syntaxError = (recognizer: Recognizer<Token>, offendingSymbol: Token, line: number, column: number, msg: string, e: RecognitionException | undefined): void => {
    console.log("Err: @" + line + ":" + column + " " + msg);
    this.outcome.issue.push({
      severity: "error",
      code: "syntax",
      details: {
        text: msg
      },
      location: [ "@" + line + ":" + column ],
    });
  };
}
