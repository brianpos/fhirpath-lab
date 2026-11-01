import {isFmlParseError, parseFML} from "../../../helpers/fml_parser";
import {validateFmlModel} from "../../../helpers/fml_validation";
import {AnalyzedFml, FmlDiagnostic, FmlSource, FmlValidatorResult, ParsedFml} from "./contracts";
import {FmlPropertyUsageCollector} from "./FmlPropertyUsageCollector";
import {FmlFhirPathValidator} from "./FmlFhirPathValidator";
import {FmlTransformValidator} from "./FmlTransformValidator";
import {applyFmlModelConfiguration} from "./FmlModelConfiguration";
import type {FmlStructureMap} from "../../../helpers/fml_models";

export interface CoreFmlAnalysisOptions {
    semanticErrors?: "error" | "warning";
}

export class CoreFmlParser {
    public constructor(
        private readonly propertyUsageCollector = new FmlPropertyUsageCollector(),
        private readonly fhirPathValidator = new FmlFhirPathValidator(),
        private readonly transformValidator = new FmlTransformValidator(),
    ) {
    }

    public parse(source: FmlSource): FmlValidatorResult<ParsedFml> {
        const result = this.analyze(source);
        if (result.status !== "success") return result;
        return {
            ...result,
            value: {
                sourceName: result.value.sourceName,
                entryRule: result.value.entryRule,
                model: result.value.model,
            },
        };
    }

    public analyze(source: FmlSource, parsedModel?: FmlStructureMap,
        options: CoreFmlAnalysisOptions = {}): FmlValidatorResult<AnalyzedFml> {
        const parsed = parsedModel ?? parseFML(source.sourceText);
        if (isFmlParseError(parsed)) {
            return {
                status: "failure",
                diagnostics: (parsed.issue ?? []).map(issue => this.toDiagnostic(issue, source.sourceName)),
            };
        }
        applyFmlModelConfiguration(parsed, source);

        const diagnostics: FmlDiagnostic[] = validateFmlModel(parsed).map(diagnostic => ({
            ...diagnostic,
            sourceName: source.sourceName,
        }));
        const propertyAnalysis = this.propertyUsageCollector.analyzeModel(
            parsed,
            source.sourceText,
            source.customTypeModels,
        );
        const fhirPathAnalysis = this.fhirPathValidator.analyze(
            parsed,
            source.sourceText,
            propertyAnalysis,
            source.sourceName,
            source.customTypeModels,
        );
        diagnostics.push(...fhirPathAnalysis.diagnostics);
        diagnostics.push(...this.transformValidator.validate(
            parsed,
            propertyAnalysis,
            source.sourceName,
            source.customTypeModels,
            source.importedDefaultGroups,
            source.importedGroupSignatures,
            fhirPathAnalysis.transformResultTypes,
            source.sourceText,
        ));
        for (const usage of propertyAnalysis.usages) {
            if (!usage.unknownElement || !usage.rootTypeName) continue;
            diagnostics.push({
                severity: "warning",
                message: usage.validationError
                    ?? `Property '${usage.rootTypeName}.${usage.path}' was not found in the `
                    + (source.customTypeModels?.[usage.rootTypeName]
                        ? "logical model."
                        : `${usage.fhirVersion ?? "selected"} FHIR model.`),
                line: usage.span.start.line,
                column: usage.span.start.column,
                sourceName: source.sourceName,
                offendingText: usage.path,
            });
        }
        for (const input of propertyAnalysis.groupInputs) {
            if (input.resolution === "unresolved") {
                diagnostics.push({
                    severity: "information",
                    message: `Type for group input '${input.groupName}.${input.inputName}' could not be resolved from its declaration or calling context.`,
                    line: input.span.start.line,
                    column: input.span.start.column,
                    sourceName: source.sourceName,
                    offendingText: input.inputName,
                });
            } else if (input.resolution === "conflict") {
                diagnostics.push({
                    severity: "error",
                    message: `Conflicting contextual types for group input '${input.groupName}.${input.inputName}': ${input.conflictingTypeNames?.join(", ") ?? "unknown"}.`,
                    line: input.span.start.line,
                    column: input.span.start.column,
                    sourceName: source.sourceName,
                    offendingText: input.inputName,
                });
            }
        }
        const reportedDiagnostics = options.semanticErrors === "warning"
            ? diagnostics.map(diagnostic => diagnostic.severity === "error" ? {...diagnostic, severity: "warning" as const} : diagnostic)
            : diagnostics;
        if (reportedDiagnostics.some(diagnostic => diagnostic.severity === "error")) {
            return {status: "failure", diagnostics: reportedDiagnostics};
        }

        return {
            status: "success",
            value: {
                sourceName: source.sourceName,
                entryRule: "structureMap",
                model: parsed,
                propertyAnalysis,
            },
            diagnostics: reportedDiagnostics,
        };
    }

    private toDiagnostic(
        issue: {details?: {text?: string}; diagnostics?: string; location?: string[]},
        sourceName?: string,
    ): FmlDiagnostic {
        const match = /^@(\d+):(\d+)$/.exec(issue.location?.[0] ?? "");
        return {
            severity: "error",
            message: issue.details?.text ?? issue.diagnostics ?? "Unable to parse the FML document.",
            line: match ? Number(match[1]) : 1,
            column: match ? Number(match[2]) : 0,
            sourceName,
        };
    }
}