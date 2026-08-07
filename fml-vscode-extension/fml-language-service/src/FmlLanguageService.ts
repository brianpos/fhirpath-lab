import {
    FmlDiagnostic,
    FmlPropertyPathStep,
    FmlPropertyUsage,
    FmlVariableReference,
    FmlSourceSpan,
    FmlValidatorApi,
    TransformParameterDefinition,
    TransformSignature,
    transformDefinitions,
    FhirVersion,
    TypeModel,
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
    private defaultFhirVersion?: FhirVersion;
    private profileBaseTypes: Record<string, string> = {};
    private customTypeModels: Record<string, TypeModel> = {};

    public constructor(private readonly validator = new FmlValidatorApi()) {
    }

    public configureModels(
        defaultFhirVersion: FhirVersion | undefined,
        profileBaseTypes: Record<string, string>,
        customTypeModels: Record<string, TypeModel> = {},
    ): void {
        this.defaultFhirVersion = defaultFhirVersion;
        this.profileBaseTypes = profileBaseTypes;
        this.customTypeModels = customTypeModels;
    }

    public async validateDocument(document: TextDocumentSnapshot): Promise<DocumentValidationResult> {
        const result = await this.validator.validate({
            sourceName: document.uri,
            sourceText: document.text,
            defaultFhirVersion: this.defaultFhirVersion,
            profileBaseTypes: this.profileBaseTypes,
            customTypeModels: this.customTypeModels,
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
        const cursorOffset = this.toOffset(request.text, request.position);
        const context = this.validator.getCompletionContext({
            sourceName: request.uri,
            sourceText: request.text,
            defaultFhirVersion: this.defaultFhirVersion,
            profileBaseTypes: this.profileBaseTypes,
            customTypeModels: this.customTypeModels,
        }, cursorOffset);
        if (!context) {
            return [];
        }
        if (context.kind === "source-property" || context.kind === "target-property") {
            return context.properties.map(completion => ({
                label: completion.name,
                detail: `${completion.typeNames.join(" | ") || "unknown"} `
                    + `[${completion.cardinalityMin}..${completion.cardinalityMax}]`
                    + (completion.fhirVersion ? ` (${completion.fhirVersion})` : ""),
                insertText: completion.name,
                snippet: false,
                kind: "property",
            }));
        }

        return [...transformDefinitions.values()]
            .filter(definition => definition.name.startsWith(context.partial))
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
        const analysis = this.validator.getPropertyAnalysis({
            sourceName: request.uri,
            sourceText: request.text,
            defaultFhirVersion: this.defaultFhirVersion,
            profileBaseTypes: this.profileBaseTypes,
            customTypeModels: this.customTypeModels,
        });
        const usages = analysis.usages;
        const variableMatch = this.getVariableHoverMatch(usages, analysis.variableReferences, request);
        if (variableMatch) return variableMatch;

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
        const segmentMatch = this.getPropertySegmentHoverMatch(usages, request);
        if (segmentMatch) return segmentMatch;
        return undefined;
    }

    private getVariableHoverMatch(
        usages: FmlPropertyUsage[],
        references: FmlVariableReference[],
        request: HoverRequest,
    ): HoverInformation | undefined {
        const definitions = usages.filter(usage => usage.variableName && usage.variableSpan);
        const candidates: Array<{range: LanguageRange; markdown: string}> = [];
        for (const usage of definitions) {
            const range = this.toSourceRange(usage.variableSpan!, request.text);
            if (this.containsPosition(range, request.position)) {
                candidates.push({range, markdown: this.formatVariableHover(usage.variableName!, usage)});
            }
        }
        for (const reference of references) {
            const range = this.toSourceRange(reference.span, request.text);
            if (!this.containsPosition(range, request.position)) continue;
            const definition = definitions
                .filter(candidate => candidate.groupName === reference.groupName
                    && this.normalizeIdentifier(candidate.variableName!) === this.normalizeIdentifier(reference.name)
                    && !!candidate.ruleSpan
                    && this.spanContains(candidate.ruleSpan, reference.span)
                    && this.compareSpans(candidate.variableSpan!, reference.span) <= 0)
                .sort((left, right) => this.compareSpans(right.variableSpan!, left.variableSpan!))[0];
            const rootUsage = usages.find(candidate => candidate.groupName === reference.groupName
                && this.normalizeIdentifier(candidate.rootVariableName) === this.normalizeIdentifier(reference.name));
            if (definition) {
                candidates.push({range, markdown: this.formatVariableHover(reference.name, definition)});
            } else if (rootUsage) {
                candidates.push({range, markdown: this.formatVariableHover(reference.name, rootUsage, true)});
            } else {
                candidates.push({range, markdown: this.formatUndefinedVariableHover(reference.name)});
            }
        }
        candidates.sort((left, right) => this.rangeSize(left.range) - this.rangeSize(right.range));
        return candidates[0];
    }

    private getPropertySegmentHoverMatch(usages: FmlPropertyUsage[], request: HoverRequest): HoverInformation | undefined {
        const candidates: Array<{range: LanguageRange; markdown: string}> = [];
        for (const usage of usages) {
            const usageRange = this.toSourceRange(usage.span, request.text);
            if (!this.containsPosition(usageRange, request.position)) continue;
            const line = request.text.split(/\r?\n/)[usageRange.start.line] ?? "";
            const token = line.slice(usageRange.start.character, usageRange.end.character);
            const parts = [...token.matchAll(/`[^`]+`|[A-Za-z_][A-Za-z0-9_]*/g)];
            const steps = usage.pathSteps ?? [];
            if (parts.length === 0) continue;
            const hasContext = usage.path === "." || parts.length > 1;
            const propertyCount = hasContext ? parts.length - 1 : parts.length;
            const stepOffset = Math.max(0, steps.length - propertyCount);

            for (let index = 0; index < parts.length; index++) {
                const part = parts[index];
                const range: LanguageRange = {
                    start: {line: usageRange.start.line, character: usageRange.start.character + part.index!},
                    end: {line: usageRange.start.line, character: usageRange.start.character + part.index! + part[0].length},
                };
                if (!this.containsPosition(range, request.position)) continue;
                const name = this.normalizeIdentifier(part[0]);
                if (hasContext && index === 0) {
                    const isRootContext = this.normalizeIdentifier(usage.rootVariableName) === name;
                    const step = isRootContext || stepOffset === 0 ? undefined : steps[stepOffset - 1];
                    candidates.push({
                        range,
                        markdown: isRootContext
                            ? this.formatContextHover(name, usage)
                            : this.formatVariableHover(name, usage, false, step),
                    });
                } else {
                    const propertyIndex = index - (hasContext ? 1 : 0);
                    const step = steps[stepOffset + propertyIndex];
                    candidates.push({range, markdown: this.formatPropertyHover(usage, step)});
                }
            }
        }
        candidates.sort((left, right) => this.rangeSize(left.range) - this.rangeSize(right.range));
        return candidates[0];
    }

    private formatContextHover(name: string, usage: FmlPropertyUsage): string {
        const typeName = this.customTypeModels[usage.rootTypeName]?.TypeName ?? usage.rootTypeName;
        return [
            `**${usage.role === "source" ? "Source" : "Target"} context** \`${name}\``,
            "",
            `- Type: \`${typeName}\`${usage.fhirVersion ? ` (${usage.fhirVersion})` : ""}`,
        ].join("\n");
    }

    private formatVariableHover(
        name: string,
        usage: FmlPropertyUsage,
        root = false,
        step?: FmlPropertyPathStep,
    ): string {
        const typeNames = root
            ? [this.customTypeModels[usage.rootTypeName]?.TypeName ?? usage.rootTypeName]
            : step?.typeNames?.length
                ? step.typeNames
                : usage.compatibleTypeNames?.length
                    ? usage.compatibleTypeNames
                    : usage.elementTypeName ? usage.elementTypeName.split(" | ") : [];
        const cardinalityMin = root ? undefined : step?.cardinalityMin ?? usage.cardinalityMin;
        const cardinalityMax = root ? undefined : step?.cardinalityMax ?? usage.cardinalityMax;
        const cardinality = cardinalityMin !== undefined && cardinalityMax
            ? ` [${cardinalityMin}..${cardinalityMax}]`
            : "";
        const lines = [
            `**Variable** \`${name}\`${cardinality}${usage.fhirVersion ? ` (${usage.fhirVersion})` : ""}`,
            "",
        ];
        if (!root) {
            const rootTypeName = this.customTypeModels[usage.rootTypeName]?.TypeName ?? usage.rootTypeName;
            const propertyPath = step?.path ?? usage.path;
            const propertyCardinality = cardinalityMin !== undefined && cardinalityMax
                ? ` [${cardinalityMin}..${cardinalityMax}]`
                : "";
            lines.push(`- ${usage.role === "source" ? "Source" : "Target"} property: \`${rootTypeName}.${propertyPath}\`${propertyCardinality}${usage.fhirVersion ? ` (${usage.fhirVersion})` : ""}`);
        }
        lines.push(typeNames.length > 1
            ? `- Types: ${typeNames.map(type => `\`${type}\``).join(" | ")}`
            : `- Type: ${typeNames[0] ? `\`${typeNames[0]}\`` : "unknown"}`);
        return lines.join("\n");
    }

    private formatUndefinedVariableHover(name: string): string {
        return [
            `**Variable** \`${name}\``,
            "",
            "- Issue: not defined in the current rule context",
        ].join("\n");
    }

    private formatPropertyHover(usage: FmlPropertyUsage, step?: FmlPropertyPathStep): string {
        const rootTypeName = this.customTypeModels[usage.rootTypeName]?.TypeName ?? usage.rootTypeName;
        const path = step?.path ?? usage.path;
        const cardinalityMin = step?.cardinalityMin ?? usage.cardinalityMin;
        const cardinalityMax = step?.cardinalityMax ?? usage.cardinalityMax;
        const cardinality = cardinalityMin !== undefined && cardinalityMax
            ? ` [${cardinalityMin}..${cardinalityMax}]`
            : "";
        const propertyName = `${rootTypeName}.${path}`;
        const specificationPath = step?.specificationPath ?? usage.specificationPath;
        const specificationUrl = this.customTypeModels[usage.rootTypeName]
            ? undefined
            : this.getSpecificationUrl(usage.fhirVersion, rootTypeName, specificationPath);
        const propertyLabel = specificationUrl
            ? `[\`${propertyName}\`](${specificationUrl})`
            : `\`${propertyName}\``;
        const lines = [
            `**${usage.role === "source" ? "Source" : "Target"} property** ${propertyLabel}${cardinality}${usage.fhirVersion ? ` (${usage.fhirVersion})` : ""}`,
            "",
        ];
        const isFinalStep = !step || step.path === usage.path;
        const possibleTypes = isFinalStep
            ? usage.possibleTypeNames ?? step?.possibleTypeNames ?? []
            : step.possibleTypeNames;
        const compatibleTypes = isFinalStep
            ? usage.compatibleTypeNames ?? step?.typeNames ?? possibleTypes
            : step.typeNames;
        const excludedTypes = isFinalStep ? usage.excludedTypeNames ?? [] : [];
        if (possibleTypes.length > 1) {
            lines.push(`- Compatible types: ${compatibleTypes.map(type => `\`${type}\``).join(" | ") || "none"}`);
            if (excludedTypes.length > 0) {
                lines.push(`- *Other possible types: ${excludedTypes.map(type => `\`${type}\``).join(" | ")}*`);
            }
        } else if (possibleTypes.length > 0) {
            lines.push(`- Type: \`${possibleTypes.join(" | ")}\``);
        }
        const targetProfiles = step?.targetProfiles ?? usage.targetProfiles;
        if (targetProfiles?.length) {
            lines.push(`- Target profiles: ${targetProfiles.map(profile => {
                const label = `\`${this.formatTargetProfile(profile)}\``;
                return this.isLogicalCanonical(profile)
                    ? label
                    : `[${label}](${this.getTargetProfileUrl(profile, usage.fhirVersion)})`;
            }).join(" | ")}`);
        }
        if (usage.validationError) lines.push(`- Issue: ${usage.validationError}`);
        else if (usage.unknownElement) {
            lines.push(this.customTypeModels[usage.rootTypeName]
                ? "- Issue: property not found in the logical model"
                : "- Issue: property not found in the selected FHIR model");
        }
        return lines.join("\n");
    }

    private normalizeIdentifier(value: string): string {
        return value.replace(/^%/, "").replace(/^`(.*)`$/, "$1");
    }

    private compareSpans(left: FmlSourceSpan, right: FmlSourceSpan): number {
        return left.start.line - right.start.line || left.start.column - right.start.column;
    }

    private spanContains(container: FmlSourceSpan, candidate: FmlSourceSpan): boolean {
        return this.compareSpans(container, candidate) <= 0
            && (container.end.line > candidate.end.line
                || (container.end.line === candidate.end.line && container.end.column >= candidate.end.column));
    }

    private isLogicalCanonical(canonical: string): boolean {
        const typeName = this.profileBaseTypes[canonical.split("|")[0]];
        return Boolean(typeName && this.customTypeModels[typeName]);
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
        const targetLine = Math.max(this.toInteger(position.line, 0), 0);
        const targetCharacter = Math.max(this.toInteger(position.character, 0), 0);
        let offset = 0;
        let line = 0;
        while (line < targetLine && offset < text.length) {
            const character = text.charCodeAt(offset++);
            if (character === 13) {
                if (text.charCodeAt(offset) === 10) offset++;
                line++;
            } else if (character === 10) {
                line++;
            }
        }
        if (line < targetLine) {
            return text.length;
        }

        let lineEnd = offset;
        while (lineEnd < text.length) {
            const character = text.charCodeAt(lineEnd);
            if (character === 10 || character === 13) break;
            lineEnd++;
        }
        return offset + Math.min(targetCharacter, lineEnd - offset);
    }
}
