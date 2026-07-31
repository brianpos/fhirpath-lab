import {
    FmlDiagnostic,
    FmlSourceSpan,
    FmlValidatorApi,
    TransformParameterDefinition,
    TransformSignature,
    transformDefinitions,
} from "@fhirpath-lab/validator";
import {
    CompletionRequest,
    CompletionSuggestion,
    DocumentFmlSymbols,
    DocumentGroupSymbols,
    DocumentValidationResult,
    LanguageDiagnostic,
    LanguageRange,
    TextDocumentSnapshot,
} from "./contracts";

const DIAGNOSTIC_SOURCE = "FHIR Mapping Language Tools";

export class FmlLanguageService {
    public constructor(private readonly validator = new FmlValidatorApi()) {
    }

    public async validateDocument(document: TextDocumentSnapshot): Promise<DocumentValidationResult> {
        const result = await this.validator.validate({
            sourceName: document.uri,
            sourceText: document.text,
        });
        const diagnostics = result.diagnostics.map(diagnostic => {
            return this.toLanguageDiagnostic(diagnostic, document.text);
        });

        return {
            diagnostics,
            errorCount: diagnostics.filter(diagnostic => diagnostic.severity === "error").length,
            warningCount: diagnostics.filter(diagnostic => diagnostic.severity === "warning").length,
        };
    }

    public getCompletions(request: CompletionRequest): CompletionSuggestion[] {
        const lines = request.text.split(/\r?\n/);
        const line = lines[this.clamp(this.toInteger(request.position.line, 0), 0, lines.length - 1)] ?? "";
        const character = this.clamp(this.toInteger(request.position.character, 0), 0, line.length);
        const assignment = line.slice(0, character).match(/=\s*([A-Za-z][A-Za-z0-9]*)?$/);
        if (!assignment) {
            return [];
        }

        const prefix = assignment[1] ?? "";
        return [...transformDefinitions.values()]
            .filter(definition => definition.name.startsWith(prefix))
            .map(definition => ({
                label: definition.name,
                detail: definition.signatures.map(signature => {
                    return this.formatSignature(definition.name, signature);
                }).join(" | "),
                insertText: definition.signatures.some(signature => signature.parameters.length > 0)
                    ? `${definition.name}(\${1})`
                    : `${definition.name}()`,
                snippet: definition.signatures.some(signature => signature.parameters.length > 0),
            }));
    }

    public getGroupSymbols(document: TextDocumentSnapshot): DocumentGroupSymbols {
        const symbols = this.getDocumentSymbols(document);
        return {
            definitions: symbols.definitions,
            references: symbols.references,
        };
    }

    public getDocumentSymbols(document: TextDocumentSnapshot): DocumentFmlSymbols {
        const symbols = this.validator.getDocumentSymbols({
            sourceName: document.uri,
            sourceText: document.text,
        });
        return {
            canonicalUrls: symbols.canonicalUrls,
            definitions: symbols.definitions.map(definition => ({
                name: definition.name,
                range: this.toSourceRange(definition.span, document.text),
            })),
            imports: symbols.imports,
            references: symbols.references.map(reference => ({
                name: reference.name,
                kind: reference.kind,
                range: this.toSourceRange(reference.span, document.text),
            })),
        };
    }

    private toLanguageDiagnostic(diagnostic: FmlDiagnostic, sourceText: string): LanguageDiagnostic {
        return {
            range: this.toRange(diagnostic, sourceText),
            severity: diagnostic.severity,
            message: diagnostic.message,
            source: DIAGNOSTIC_SOURCE,
            offendingText: diagnostic.offendingText,
        };
    }

    private toRange(diagnostic: FmlDiagnostic, sourceText: string): LanguageRange {
        const lines = sourceText.split(/\r?\n/);
        const lastLine = Math.max(lines.length - 1, 0);
        const line = this.clamp(this.toInteger(diagnostic.line, 1) - 1, 0, lastLine);
        const lineLength = lines[line]?.length ?? 0;
        let startCharacter = this.clamp(this.toInteger(diagnostic.column, 0), 0, lineLength);
        const tokenLength = Math.max(diagnostic.offendingText?.length ?? 0, 1);
        let endCharacter = this.clamp(startCharacter + tokenLength, startCharacter, lineLength);

        if (startCharacter === endCharacter && lineLength > 0) {
            startCharacter = Math.max(startCharacter - 1, 0);
            endCharacter = Math.min(startCharacter + 1, lineLength);
        }

        return {
            start: {line, character: startCharacter},
            end: {line, character: endCharacter},
        };
    }

    private toSourceRange(span: FmlSourceSpan, sourceText: string): LanguageRange {
        const lines = sourceText.split(/\r?\n/);
        const lastLine = Math.max(lines.length - 1, 0);
        const startLine = this.clamp(this.toInteger(span.start.line, 1) - 1, 0, lastLine);
        const endLine = this.clamp(this.toInteger(span.end.line, span.start.line) - 1, startLine, lastLine);
        const startCharacter = this.clamp(
            this.toInteger(span.start.column, 0),
            0,
            lines[startLine]?.length ?? 0,
        );
        const endCharacter = this.clamp(
            this.toInteger(span.end.column, startCharacter + 1),
            endLine === startLine ? startCharacter : 0,
            lines[endLine]?.length ?? 0,
        );
        return {
            start: {line: startLine, character: startCharacter},
            end: {line: endLine, character: endCharacter},
        };
    }

    private formatSignature(name: string, signature: TransformSignature): string {
        return `${name}(${signature.parameters.map(parameter => {
            return this.formatParameter(parameter);
        }).join(", ")})`;
    }

    private formatParameter(parameter: TransformParameterDefinition): string {
        const value = `${parameter.name}: ${parameter.type}`;
        if (parameter.variadic) {
            return `${value}, ...`;
        }
        return parameter.optional ? `[${value}]` : value;
    }

    private clamp(value: number, minimum: number, maximum: number): number {
        return Math.min(Math.max(value, minimum), maximum);
    }

    private toInteger(value: number, fallback: number): number {
        return Number.isFinite(value) ? Math.trunc(value) : fallback;
    }
}
