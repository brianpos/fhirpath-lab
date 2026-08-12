import antlr4, {
    ErrorListener,
    type ParserRuleContext,
    type RecognitionException,
    type Recognizer,
    type Token,
} from "antlr4";
import type { OperationOutcome, OperationOutcomeIssue } from "fhir/r4b";
import Lexer from "../cql-parser/cqlLexer";
import Parser, {
    type ExpressionDefinitionContext,
    type LibraryContext,
    type ParameterDefinitionContext,
} from "../cql-parser/cqlParser";

const VALIDATOR_CODE_SYSTEM = "http://fhirpath-lab.com/CodeSystem/validator-codes";

export type CqlContentKind = "expression" | "library";

export interface CqlIssuePosition {
    line: number;
    column: number;
    length: number;
}

export interface CqlOperationOutcomeIssue extends OperationOutcomeIssue {
    __position: CqlIssuePosition;
}

export interface CqlValidationOutcome extends OperationOutcome {
    issue: CqlOperationOutcomeIssue[];
}

export interface CqlExpressionDeclaration {
    name: string;
    access: "public" | "private";
    position: CqlIssuePosition;
}

export interface CqlParameterDeclaration {
    name: string;
    type?: string;
    position: CqlIssuePosition;
}

export interface CqlAnalysis {
    kind: CqlContentKind;
    libraryName?: string;
    libraryVersion?: string;
    expressions: CqlExpressionDeclaration[];
    parameters: CqlParameterDeclaration[];
    outcome?: CqlValidationOutcome;
}

interface ParseResult<TTree extends ParserRuleContext> {
    tree: TTree;
    issues: CqlOperationOutcomeIssue[];
}

class CqlErrorListener<TSymbol> extends ErrorListener<TSymbol> {
    public readonly issues: CqlOperationOutcomeIssue[] = [];

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

function parse<TTree extends ParserRuleContext>(
    source: string,
    parseRule: (parser: Parser) => TTree,
): ParseResult<TTree> {
    const chars = new antlr4.CharStream(source);
    const lexer = new Lexer(chars);
    const lexerErrors = new CqlErrorListener<number>(() => 1);
    lexer.removeErrorListeners();
    lexer.addErrorListener(lexerErrors);

    const tokens = new antlr4.CommonTokenStream(lexer);
    const parser = new Parser(tokens);
    const parserErrors = new CqlErrorListener<Token>((token) => {
        if (token.start >= source.length) return 0;
        return Math.max(1, token.stop - token.start + 1);
    });
    parser.removeErrorListeners();
    parser.addErrorListener(parserErrors);
    const tree = parseRule(parser);

    return {
        tree,
        issues: [...lexerErrors.issues, ...parserErrors.issues],
    };
}

function positionOf(context: ParserRuleContext): CqlIssuePosition {
    const start = context.start;
    const stop = context.stop;
    return {
        line: start.line,
        column: start.column + 1,
        length: Math.max(1, (stop?.stop ?? start.stop) - start.start + 1),
    };
}

function identifierValue(raw: string): string {
    if (
        raw.length >= 2
        && ((raw.startsWith("\"") && raw.endsWith("\""))
            || (raw.startsWith("`") && raw.endsWith("`")))
    ) {
        return raw.slice(1, -1).replace(/\\(["`\\])/g, "$1");
    }
    return raw;
}

function stringValue(raw: string): string {
    if (raw.length >= 2 && raw.startsWith("'") && raw.endsWith("'")) {
        return raw.slice(1, -1).replace(/\\(['\\])/g, "$1");
    }
    return raw;
}

function expressionDeclaration(
    context: ExpressionDefinitionContext,
): CqlExpressionDeclaration {
    const identifier = context.identifier();
    return {
        name: identifierValue(identifier.getText()),
        access: context.accessModifier()?.getText() === "private" ? "private" : "public",
        position: positionOf(identifier),
    };
}

function parameterDeclaration(
    context: ParameterDefinitionContext,
): CqlParameterDeclaration {
    const identifier = context.identifier();
    const typeSpecifier = context.typeSpecifier();
    return {
        name: identifierValue(identifier.getText()),
        type: typeSpecifier ? typeSpecifier.getText() : undefined,
        position: positionOf(identifier),
    };
}

function analyzeLibrary(
    tree: LibraryContext,
): Pick<CqlAnalysis, "libraryName" | "libraryVersion" | "expressions" | "parameters"> {
    const libraryDefinition = tree.libraryDefinition();
    const libraryName = libraryDefinition
        ? identifierValue(libraryDefinition.qualifiedIdentifier().getText())
        : undefined;
    const versionSpecifier = libraryDefinition?.versionSpecifier();
    const libraryVersion = versionSpecifier
        ? stringValue(versionSpecifier.getText())
        : undefined;
    const expressions = tree.statement_list()
        .map(statement => statement.expressionDefinition())
        .filter((definition): definition is ExpressionDefinitionContext => !!definition)
        .map(expressionDeclaration);
    const parameters = tree.definition_list()
        .map(definition => definition.parameterDefinition())
        .filter((definition): definition is ParameterDefinitionContext => !!definition)
        .map(parameterDeclaration);
    return { libraryName, libraryVersion, expressions, parameters };
}

function hasLibraryStructure(tree: LibraryContext): boolean {
    return !!tree.libraryDefinition()
        || tree.definition_list().length > 0
        || tree.statement_list().length > 0
        || tree.directive_list().length > 0;
}

/**
 * Parse CQL as either a standalone expression or a complete library. A library
 * is identified from parser-recognized declarations rather than text matching.
 */
export function analyzeCql(source: string): CqlAnalysis {
    const libraryResult = parse(source, parser => parser.library());
    const expressionResult = parse(source, parser => parser.entireExpression());
    const isLibrary = hasLibraryStructure(libraryResult.tree)
        && (libraryResult.issues.length === 0 || expressionResult.issues.length > 0);
    const selectedResult = isLibrary ? libraryResult : expressionResult;
    const libraryDetails = isLibrary
        ? analyzeLibrary(libraryResult.tree)
        : {
            libraryName: undefined,
            libraryVersion: undefined,
            expressions: [],
            parameters: [],
        };

    return {
        kind: isLibrary ? "library" : "expression",
        ...libraryDetails,
        outcome: selectedResult.issues.length
            ? {
                resourceType: "OperationOutcome",
                issue: selectedResult.issues,
            }
            : undefined,
    };
}

export function validateCql(source: string): CqlValidationOutcome | undefined {
    return analyzeCql(source).outcome;
}
