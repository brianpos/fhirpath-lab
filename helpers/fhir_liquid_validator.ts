import antlr4, {
  ErrorListener,
  type RecognitionException,
  type Recognizer,
  type Token,
} from "antlr4";
import type { OperationOutcome, OperationOutcomeIssue } from "fhir/r4b";
import Lexer from "../fhir-liquid-parser/fhirliquidLexer";
import Parser from "../fhir-liquid-parser/fhirliquidParser";

const VALIDATOR_CODE_SYSTEM = "http://fhirpath-lab.com/CodeSystem/validator-codes";

export interface FhirLiquidIssuePosition {
  line: number;
  column: number;
  length: number;
}

export interface FhirLiquidOperationOutcomeIssue extends OperationOutcomeIssue {
  __position: FhirLiquidIssuePosition;
}

export interface FhirLiquidValidationOutcome extends OperationOutcome {
  issue: FhirLiquidOperationOutcomeIssue[];
}

class LiquidErrorListener<TSymbol> extends ErrorListener<TSymbol> {
  public readonly issues: FhirLiquidOperationOutcomeIssue[] = [];

  public constructor(
    private readonly getLength: (symbol: TSymbol) => number,
  ) {
    super();
  }

  public syntaxError = (
    _recognizer: Recognizer<TSymbol>,
    offendingSymbol: TSymbol,
    line: number,
    column: number,
    message: string,
    _error: RecognitionException | undefined,
  ): void => {
    const displayColumn = column + 1;
    const location = `@${line}:${displayColumn}`;
    this.issues.push({
      severity: "error",
      code: "invalid",
      details: {
        coding: [{
          system: VALIDATOR_CODE_SYSTEM,
          code: "syntax",
        }],
        text: message,
      },
      expression: [location],
      location: [location],
      __position: {
        line,
        column: displayColumn,
        length: this.getLength(offendingSymbol),
      },
    });
  };
}

/**
 * Parse a FHIR Liquid template and return syntax diagnostics in the same shape
 * used by server-side FHIR validation operations.
 */
export function validateFhirLiquidTemplate(template: string): FhirLiquidValidationOutcome | undefined {
  const chars = new antlr4.CharStream(template);
  const lexer = new Lexer(chars);
  const lexerErrors = new LiquidErrorListener<number>(() => 1);
  lexer.removeErrorListeners();
  lexer.addErrorListener(lexerErrors);

  const tokens = new antlr4.CommonTokenStream(lexer);
  const parser = new Parser(tokens);
  const parserErrors = new LiquidErrorListener<Token>((token) => {
    if (token.start >= template.length) return 0;
    return Math.max(1, token.stop - token.start + 1);
  });
  parser.removeErrorListeners();
  parser.addErrorListener(parserErrors);
  parser.liquidDocument();

  const issues = [...lexerErrors.issues, ...parserErrors.issues];
  if (issues.length === 0) return undefined;

  return {
    resourceType: "OperationOutcome",
    issue: issues,
  };
}
