import {
    FmlDiagnostic,
    FmlPropertyUsage,
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
    HoverInformation,
    HoverRequest,
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
            informationCount: diagnostics.filter(diagnostic => diagnostic.severity === "information").length,
        };
    }

    public getCompletions(request: CompletionRequest): CompletionSuggestion[] {
        const lines = request.text.split(/\r?\n/);
        const line = lines[this.clamp(this.toInteger(request.position.line, 0), 0, lines.length - 1)] ?? "";
        const character = this.clamp(this.toInteger(request.position.character, 0), 0, line.length);
        const cursorOffset = this.toOffset(request.text, request.position);
        const propertyCompletions = this.validator.getPropertyCompletions({
            sourceName: request.uri,
            sourceText: request.text,
        }, cursorOffset);
        if (propertyCompletions.length > 0) {
            return propertyCompletions.map(completion => ({
                label: completion.name,
                detail: `${completion.typeNames.join(" | ") || "unknown"} `
                    + `[${completion.cardinalityMin}..${completion.cardinalityMax}]`
                    + (completion.fhirVersion ? ` (${completion.fhirVersion})` : ""),
                insertText: completion.name,
                snippet: false,
                kind: "property",
            }));
        }
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
                kind: "function",
            }));
    }

    public getHover(request: HoverRequest): HoverInformation | undefined {
        const usages = this.validator.getPropertyUsages({
            sourceName: request.uri,
            sourceText: request.text,
        });
        const transformMatches = usages.filter(usage => usage.transformName && usage.transformSpan).map(usage => ({
            usage,
            range: this.toSourceRange(usage.transformSpan!, request.text),
        })).filter(candidate => this.containsPosition(candidate.range, request.position));
        transformMatches.sort((left, right) => this.rangeSize(left.range) - this.rangeSize(right.range));
        const transformMatch = transformMatches[0];
        if (transformMatch) {
            const resultTypes = transformMatch.usage.transformResultTypeNames ?? [];
            const lines = [
                `**Transform** \`${transformMatch.usage.transformName}\``,
                "",
                resultTypes.length > 0
                    ? `- Result type: ${resultTypes.map(type => `\`${type}\``).join(" | ")}`
                    : "- Result type: unknown",
            ];
            return {range: transformMatch.range, markdown: lines.join("\n")};
        }
        const matches = usages.map(usage => ({
            usage,
            range: this.toSourceRange(usage.span, request.text),
        })).filter(candidate => this.containsPosition(candidate.range, request.position));
        matches.sort((left, right) => this.rangeSize(left.range) - this.rangeSize(right.range));
        const match = matches[0];
        if (!match) {
            return undefined;
        }

        const usage = match.usage;
        const cardinality = usage.cardinalityMin !== undefined && usage.cardinalityMax
            ? ` [${usage.cardinalityMin}..${usage.cardinalityMax}]`
            : "";
        const propertyName = `${usage.rootTypeName}.${usage.path}`;
        const specificationUrl = this.getSpecificationUrl(
            usage.fhirVersion,
            usage.rootTypeName,
            usage.specificationPath,
        );
        const propertyLabel = specificationUrl
            ? `[\`${propertyName}\`](${specificationUrl})`
            : `\`${propertyName}\``;
        const lines = [
            `**${usage.role === "source" ? "Source" : "Target"} property** ${propertyLabel}${cardinality}${usage.fhirVersion ? ` (${usage.fhirVersion})` : ""}`,
            "",
        ];
        const possibleTypes = usage.possibleTypeNames ?? [];
        const compatibleTypes = usage.compatibleTypeNames ?? possibleTypes;
        const excludedTypes = usage.excludedTypeNames ?? [];
        if (possibleTypes.length > 1) {
            lines.push(`- Compatible types: ${compatibleTypes.map(type => `\`${type}\``).join(" | ") || "none"}`);
            if (excludedTypes.length > 0) {
                lines.push(`- *Other possible types: ${excludedTypes.map(type => `\`${type}\``).join(" | ")}*`);
            }
        } else if (usage.elementTypeName) {
            lines.push(`- Type: \`${usage.elementTypeName}\``);
        }
        if (usage.targetProfiles?.length) {
            lines.push(`- Target profiles: ${usage.targetProfiles.map(profile => {
                return `[\`${this.formatTargetProfile(profile)}\`](${this.getTargetProfileUrl(profile, usage.fhirVersion)})`;
            }).join(" | ")}`);
        }
        if (usage.validationError) {
            lines.push(`- Issue: ${usage.validationError}`);
        } else if (usage.unknownElement) {
            lines.push("- Issue: property not found in the selected FHIR model");
        }
        return {range: match.range, markdown: lines.join("\n")};
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

    private containsPosition(range: LanguageRange, position: {line: number; character: number}): boolean {
        return this.comparePositions(position, range.start) >= 0
            && this.comparePositions(position, range.end) < 0;
    }

    private comparePositions(
        left: {line: number; character: number},
        right: {line: number; character: number},
    ): number {
        return left.line === right.line
            ? left.character - right.character
            : left.line - right.line;
    }

    private rangeSize(range: LanguageRange): number {
        return (range.end.line - range.start.line) * 1_000_000
            + range.end.character - range.start.character;
    }

    private getSpecificationUrl(
        version: FmlPropertyUsage["fhirVersion"],
        rootTypeName: string,
        specificationPath: string | undefined,
    ): string | undefined {
        if (!version || !rootTypeName || !specificationPath) {
            return undefined;
        }
        const anchor = specificationPath.replace(/\[x\]/g, "_x_");
        return `https://hl7.org/fhir/${version}/${rootTypeName.toLowerCase()}-definitions.html#${anchor}`;
    }

    private formatTargetProfile(profile: string): string {
        const corePrefix = "http://hl7.org/fhir/StructureDefinition/";
        return profile.startsWith(corePrefix)
            ? profile.slice(corePrefix.length)
            : profile;
    }

    private getTargetProfileUrl(profile: string, version: FmlPropertyUsage["fhirVersion"]): string {
        const corePrefix = "http://hl7.org/fhir/StructureDefinition/";
        if (!profile.startsWith(corePrefix) || !version) {
            return profile;
        }
        const resourceType = profile.slice(corePrefix.length);
        return `https://hl7.org/fhir/${version}/${resourceType.toLowerCase()}.html`;
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

    private toOffset(text: string, position: {line: number; character: number}): number {
        const lines = text.split(/\r?\n/);
        let offset = 0;
        for (let line = 0; line < Math.min(position.line, lines.length); line++) {
            offset += lines[line].length + 1;
        }
        return offset + Math.min(position.character, lines[position.line]?.length ?? 0);
    }
}
