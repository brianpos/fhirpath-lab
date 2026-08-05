import type {FhirVersion, FmlStructureMap, Rule, SourcePosition} from "../../../helpers/fml_models";
import type {TypeModel} from "../../../helpers/custom_model";
import {
    getModelProvider,
    validateFhirpathExpression,
    type FhirVersionKey,
} from "../../../helpers/fhirpath_validator";
import type {FhirPathValue} from "../../../helpers/fhirpath_visitor";
import type {FmlDiagnostic, FmlPropertyAnalysis, FmlPropertyUsage} from "./contracts";
import type {ModelProvider} from "../../../helpers/fhirpath_visitor";

interface VariableDescriptor {
    typeNames: string[];
    isCollection: boolean;
    fhirVersion?: FhirVersion;
}

interface ExpressionOccurrence {
    text: string;
    position?: SourcePosition;
    contextType?: string;
    fhirVersion?: FhirVersion;
}

export class FmlFhirPathValidator {
    public validate(
        model: FmlStructureMap,
        sourceText: string,
        propertyAnalysis: FmlPropertyAnalysis,
        sourceName?: string,
        customTypeModels: Record<string, TypeModel> = {},
    ): FmlDiagnostic[] {
        const diagnostics: FmlDiagnostic[] = [];
        const defaultVersion = model.sourceModelVersion ?? model.targetModelVersion;

        for (const constant of model.constants) {
            diagnostics.push(...this.validateExpression({
                text: constant.expression,
                position: constant.expressionPosition,
                fhirVersion: defaultVersion,
            }, new Map(), sourceText, sourceName, customTypeModels));
        }

        for (const group of model.groups) {
            const variables = this.createVariables(group.name, propertyAnalysis);
            const sourceInput = propertyAnalysis.groupInputs.find(input => {
                return input.groupName === group.name && group.parameters.some(parameter => {
                    return parameter.mode === "source" && parameter.name === input.inputName;
                });
            });
            const groupVersion = sourceInput?.fhirVersion ?? defaultVersion;
            this.validateRules(
                group.rules,
                group.name,
                variables,
                groupVersion,
                propertyAnalysis,
                sourceText,
                sourceName,
                diagnostics,
                customTypeModels,
            );
        }
        return diagnostics;
    }

    private validateRules(
        rules: Rule[],
        groupName: string,
        variables: Map<string, VariableDescriptor>,
        groupVersion: FhirVersion | undefined,
        propertyAnalysis: FmlPropertyAnalysis,
        sourceText: string,
        sourceName: string | undefined,
        diagnostics: FmlDiagnostic[],
        customTypeModels: Record<string, TypeModel>,
    ): void {
        for (const rule of rules) {
            const ruleVariables = new Map(variables);
            for (const source of rule.sources) {
                if (!source.variable) continue;
                const usage = this.findSourceUsage(groupName, source.position, propertyAnalysis.usages);
                const descriptor = this.descriptorFromUsage(usage)
                    ?? ruleVariables.get(source.context);
                if (descriptor) ruleVariables.set(source.variable, descriptor);
            }

            for (const source of rule.sources) {
                const usage = this.findSourceUsage(groupName, source.position, propertyAnalysis.usages);
                const contextDescriptor = this.descriptorFromUsage(usage)
                    ?? ruleVariables.get(source.context);
                const contextType = contextDescriptor?.typeNames[0];
                const version = usage?.fhirVersion ?? contextDescriptor?.fhirVersion ?? groupVersion;
                const occurrences: ExpressionOccurrence[] = [
                    {text: source.defaultValue ?? "", position: source.defaultValuePosition, contextType, fhirVersion: version},
                    {text: source.condition ?? "", position: source.conditionPosition, contextType, fhirVersion: version},
                    {text: source.check ?? "", position: source.checkPosition, contextType, fhirVersion: version},
                    {text: source.log ?? "", position: source.logPosition, contextType, fhirVersion: version},
                ];
                for (const occurrence of occurrences.filter(candidate => candidate.text)) {
                    diagnostics.push(...this.validateExpression(
                        occurrence,
                        ruleVariables,
                        sourceText,
                        sourceName,
                        customTypeModels,
                    ));
                }
            }

            for (const target of rule.targets) {
                const transform = target.transform;
                if (!transform || transform.type !== "evaluate") continue;
                const contextVariable = transform.parameters.find(parameter => parameter.type === "identifier");
                const contextDescriptor = contextVariable
                    ? ruleVariables.get(String(contextVariable.value).replace(/^%/, ""))
                    : undefined;
                for (const parameter of transform.parameters.filter(candidate => candidate.type === "expression")) {
                    diagnostics.push(...this.validateExpression({
                        text: String(parameter.value),
                        position: parameter.position,
                        contextType: contextDescriptor?.typeNames[0],
                        fhirVersion: contextDescriptor?.fhirVersion ?? groupVersion,
                    }, ruleVariables, sourceText, sourceName, customTypeModels));
                }
            }

            for (const target of rule.targets) {
                if (!target.variable) continue;
                const usage = this.findTargetUsage(groupName, target.position, propertyAnalysis.usages);
                const descriptor = this.descriptorFromUsage(usage);
                if (descriptor) ruleVariables.set(target.variable, descriptor);
            }

            this.validateRules(
                rule.dependent?.rules ?? [],
                groupName,
                ruleVariables,
                groupVersion,
                propertyAnalysis,
                sourceText,
                sourceName,
                diagnostics,
                customTypeModels,
            );
        }
    }

    private validateExpression(
        occurrence: ExpressionOccurrence,
        variables: Map<string, VariableDescriptor>,
        sourceText: string,
        sourceName?: string,
        customTypeModels: Record<string, TypeModel> = {},
    ): FmlDiagnostic[] {
        const version = this.toVersionKey(occurrence.fhirVersion);
        const provider = this.composeProvider(getModelProvider(version), customTypeModels);
        const environmentVariables: Record<string, FhirPathValue> = {};
        for (const [name, descriptor] of variables) {
            const types = descriptor.typeNames
                .map(typeName => provider.lookupByTypeName(typeName))
                .filter((type): type is TypeModel => !!type);
            environmentVariables[name] = {types, isCollection: descriptor.isCollection};
        }
        const result = validateFhirpathExpression(occurrence.text, {
            fhirVersion: version,
            modelProvider: provider,
            contextType: occurrence.contextType,
            environmentVariables,
            allowEnvironmentVariablesAtRoot: true,
        });
        const hasTypedContext = !!occurrence.contextType || Object.values(environmentVariables).some(value => {
            return value.types.length > 0;
        });
        const expressionDiagnostics = hasTypedContext
            ? result.diagnostics
            : result.diagnostics.filter(diagnostic => diagnostic.code === "syntax");
        return expressionDiagnostics.map(diagnostic => {
            const absoluteOffset = (occurrence.position?.startIndex ?? 0) + diagnostic.position;
            const position = this.positionAt(sourceText, absoluteOffset);
            return {
                severity: diagnostic.severity,
                message: `FHIRPath: ${diagnostic.message}`,
                line: position.line,
                column: position.column,
                sourceName,
                offendingText: diagnostic.expression || occurrence.text,
            };
        });
    }

    private composeProvider(
        fallback: ModelProvider,
        customTypeModels: Record<string, TypeModel>,
    ): ModelProvider {
        return {
            ...fallback,
            lookupByTypeName: typeName => customTypeModels[typeName] ?? fallback.lookupByTypeName(typeName),
        };
    }

    private createVariables(groupName: string, analysis: FmlPropertyAnalysis): Map<string, VariableDescriptor> {
        const variables = new Map<string, VariableDescriptor>();
        for (const input of analysis.groupInputs.filter(candidate => candidate.groupName === groupName)) {
            if (input.typeName) {
                variables.set(input.inputName, {
                    typeNames: [input.typeName],
                    isCollection: false,
                    fhirVersion: input.fhirVersion,
                });
            }
        }
        return variables;
    }

    private descriptorFromUsage(usage: FmlPropertyUsage | undefined): VariableDescriptor | undefined {
        const typeNames = this.usageTypeNames(usage);
        return usage && typeNames.length > 0 ? {
            typeNames,
            isCollection: !!usage.isCollection,
            fhirVersion: usage.fhirVersion,
        } : undefined;
    }

    private usageTypeNames(usage: FmlPropertyUsage | undefined): string[] {
        if (!usage) return [];
        if (usage.compatibleTypeNames?.length) return usage.compatibleTypeNames;
        if (usage.possibleTypeNames?.length) return usage.possibleTypeNames;
        return usage.elementTypeName ? usage.elementTypeName.split(" | ") : [];
    }

    private findSourceUsage(
        groupName: string,
        position: SourcePosition | undefined,
        usages: FmlPropertyUsage[],
    ): FmlPropertyUsage | undefined {
        return usages.find(usage => {
            if (usage.groupName !== groupName || usage.role !== "source") return false;
            return !!position
                && usage.span.start.line === position.startLine
                && usage.span.start.column === position.startColumn;
        });
    }

    private findTargetUsage(
        groupName: string,
        position: SourcePosition | undefined,
        usages: FmlPropertyUsage[],
    ): FmlPropertyUsage | undefined {
        return usages.find(usage => {
            return usage.groupName === groupName
                && usage.role === "target"
                && !!position
                && usage.span.start.line === position.startLine
                && usage.span.start.column === position.startColumn;
        });
    }

    private toVersionKey(version?: FhirVersion): FhirVersionKey {
        switch (version) {
            case "R4": return "r4";
            case "R5": return "r5";
            case "R6": return "r6";
            case "R4B":
            default: return "r4b";
        }
    }

    private positionAt(sourceText: string, offset: number): {line: number; column: number} {
        const prefix = sourceText.slice(0, Math.max(offset, 0));
        return {
            line: prefix.split(/\r?\n/).length,
            column: offset - (prefix.lastIndexOf("\n") + 1),
        };
    }
}