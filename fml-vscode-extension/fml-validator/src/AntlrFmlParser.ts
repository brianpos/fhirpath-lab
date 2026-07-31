import {
    ATNSimulator,
    BaseErrorListener,
    CharStream,
    CommonTokenStream,
    RecognitionException,
    Recognizer,
    Token,
} from "antlr4ng";
import {FmlDiagnostic, FmlSource, FmlValidatorResult, ParsedFml} from "./contracts";
import {mappingLexer} from "./generated/mappingLexer";
import {mappingParser} from "./generated/mappingParser";
import {TransformInvocationValidator} from "./TransformInvocationValidator";

class DiagnosticErrorListener extends BaseErrorListener {
    public constructor(
        private readonly diagnostics: FmlDiagnostic[],
        private readonly sourceName?: string,
    ) {
        super();
    }

    public override syntaxError<S extends Token, T extends ATNSimulator>(
        _recognizer: Recognizer<T>,
        offendingSymbol: S | null,
        line: number,
        column: number,
        message: string,
        _error: RecognitionException | null,
    ): void {
        this.diagnostics.push({
            severity: "error",
            message,
            line,
            column,
            sourceName: this.sourceName,
            offendingText: offendingSymbol?.text,
        });
    }
}

export class AntlrFmlParser {
    public constructor(private readonly transformValidator = new TransformInvocationValidator()) {
    }

    public parse(source: FmlSource): FmlValidatorResult<ParsedFml> {
        const diagnostics: FmlDiagnostic[] = [];
        const errorListener = new DiagnosticErrorListener(diagnostics, source.sourceName);
        const input = CharStream.fromString(source.sourceText);
        const lexer = new mappingLexer(input);

        lexer.removeErrorListeners();
        lexer.addErrorListener(errorListener);

        const parser = new mappingParser(new CommonTokenStream(lexer));
        parser.removeErrorListeners();
        parser.addErrorListener(errorListener);
        const tree = parser.structureMap();

        if (diagnostics.some(diagnostic => diagnostic.severity === "error")) {
            return {
                status: "failure",
                diagnostics,
            };
        }

        diagnostics.push(...this.transformValidator.validate(tree, source.sourceName));

        if (diagnostics.some(diagnostic => diagnostic.severity === "error")) {
            return {
                status: "failure",
                diagnostics,
            };
        }

        return {
            status: "success",
            value: {
                sourceName: source.sourceName,
                entryRule: "structureMap",
            },
            diagnostics,
        };
    }
}
