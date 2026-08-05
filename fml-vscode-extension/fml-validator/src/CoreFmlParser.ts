import {isFmlParseError, parseFML} from "../../../helpers/fml_parser";
import {validateFmlModel} from "../../../helpers/fml_validation";
import {FmlDiagnostic, FmlSource, FmlValidatorResult, ParsedFml} from "./contracts";
import {FmlPropertyUsageCollector} from "./FmlPropertyUsageCollector";
import {FmlFhirPathValidator} from "./FmlFhirPathValidator";

export class CoreFmlParser {
    public constructor(
        private readonly propertyUsageCollector = new FmlPropertyUsageCollector(),
        private readonly fhirPathValidator = new FmlFhirPathValidator(),
    ) {
    }

    public parse(source: FmlSource): FmlValidatorResult<ParsedFml> {
        const parsed = parseFML(source.sourceText);
        if (isFmlParseError(parsed)) {
            return {
                status: "failure",
                diagnostics: (parsed.issue ?? []).map(issue => this.toDiagnostic(issue, source.sourceName)),
            };
        }

        const diagnostics: FmlDiagnostic[] = validateFmlModel(parsed).map(diagnostic => ({
            ...diagnostic,
            sourceName: source.sourceName,
        }));
        const propertyAnalysis = this.propertyUsageCollector.analyzeModel(parsed, source.sourceText);
        diagnostics.push(...this.fhirPathValidator.validate(
            parsed,
            source.sourceText,
            propertyAnalysis,
            source.sourceName,
        ));
        for (const usage of propertyAnalysis.usages) {
            if (!usage.unknownElement || !usage.rootTypeName) continue;
            diagnostics.push({
                severity: "warning",
                message: usage.validationError
                    ?? `Property '${usage.rootTypeName}.${usage.path}' was not found in the ${usage.fhirVersion ?? "selected"} FHIR model.`,
                line: usage.span.start.line,
                column: usage.span.start.column,
                sourceName: source.sourceName,
                offendingText: usage.path,
            });
        }
        for (const usage of propertyAnalysis.usages) {
            if (usage.role !== "target" || usage.transformName !== "translate") continue;
            const resultTypes = usage.transformResultTypeNames ?? [];
            const allowedTypes = usage.compatibleTypeNames?.length
                ? usage.compatibleTypeNames
                : usage.possibleTypeNames?.length
                    ? usage.possibleTypeNames
                    : usage.elementTypeName
                        ? [usage.elementTypeName]
                        : [];
            if (resultTypes.length === 0 || allowedTypes.length === 0) continue;
            const compatible = resultTypes.some(resultType => {
                return allowedTypes.some(allowedType => allowedType.toLowerCase() === resultType.toLowerCase());
            });
            if (compatible) continue;

            const diagnosticSpan = usage.transformResultSpan ?? usage.transformSpan ?? usage.span;
            diagnostics.push({
                severity: "error",
                message: `Transform 'translate' output type '${resultTypes.join(" | ")}' is not compatible with `
                    + `target property '${usage.rootTypeName}.${usage.path}' (allowed: ${allowedTypes.join(" | ")}). `
                    + "The third parameter must select a compatible output type.",
                line: diagnosticSpan.start.line,
                column: diagnosticSpan.start.column,
                sourceName: source.sourceName,
                offendingText: usage.transformResultText ?? resultTypes[0],
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
        if (diagnostics.some(diagnostic => diagnostic.severity === "error")) {
            return {status: "failure", diagnostics};
        }

        return {
            status: "success",
            value: {
                sourceName: source.sourceName,
                entryRule: "structureMap",
                model: parsed,
            },
            diagnostics,
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