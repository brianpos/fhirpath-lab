import type {FhirVersion, FmlStructureMap, Rule, SourcePosition, Transform} from "../../../helpers/fml_models";
import type {TypeModel} from "../../../helpers/custom_model";
import {
    getModelProvider,
    validateFhirpathExpression,
    type FhirVersionKey,
} from "../../../helpers/fhirpath_validator";
import {resolveTransformResultTypes} from "../../../helpers/fml_transform_signatures";
import type {FhirPathValue} from "../../../helpers/fhirpath_visitor";
import type {FmlDiagnostic, FmlPropertyAnalysis, FmlPropertyUsage} from "./contracts";
import type {ModelProvider} from "../../../helpers/fhirpath_visitor";

export interface FmlFhirPathResultType {
    typeNames: string[];
    isCollection: boolean;
    fhirVersion?: FhirVersion;
}

export interface FmlFhirPathAnalysis {
    diagnostics: FmlDiagnostic[];
    transformResultTypes: ReadonlyMap<Transform, FmlFhirPathResultType>;
}

type VariableDescriptor = FmlFhirPathResultType;

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
        return this.analyze(model, sourceText, propertyAnalysis, sourceName, customTypeModels).diagnostics;
    }

    public analyze(
        model: FmlStructureMap,
        sourceText: string,
        propertyAnalysis: FmlPropertyAnalysis,
        sourceName?: string,
        customTypeModels: Record<string, TypeModel> = {},
    ): FmlFhirPathAnalysis {
        const diagnostics: FmlDiagnostic[] = [];
        const transformResultTypes = new Map<Transform, FmlFhirPathResultType>();
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
                transformResultTypes,
            );
        }
        return {diagnostics, transformResultTypes};
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
        transformResultTypes: Map<Transform, FmlFhirPathResultType>,
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
                const usage = this.findTargetUsage(groupName, target.position, propertyAnalysis.usages);
                const transformUsage = transform
                    ? this.findTransformUsage(groupName, transform.position, propertyAnalysis.usages)
                    : undefined;
                let expressionDescriptor: VariableDescriptor | undefined;
                if (transform?.type === "evaluate") {
                    const contextParameter = transform.isInvocation
                        ? transform.parameters.find(parameter => parameter.name === "context")
                            ?? transform.parameters[0]
                        : undefined;
                    const contextVariable = contextParameter?.type === "identifier"
                        ? contextParameter
                        : undefined;
                    const contextDescriptor = contextVariable
                        ? ruleVariables.get(String(contextVariable.value).replace(/^%/, ""))
                        : undefined;
                    const expressionParameters = transform.isInvocation
                        ? [transform.parameters.find(parameter => parameter.name === "expression")
                            ?? transform.parameters[1]].filter(parameter => {
                                return parameter?.type === "expression"
                                    || parameter?.type === "literal";
                            })
                        : transform.parameters.filter(parameter => parameter.type === "expression");
                    for (const parameter of expressionParameters) {
                        const validation = this.analyzeExpression({
                            text: parameter.type === "literal" && parameter.position
                                ? sourceText.slice(parameter.position.startIndex, parameter.position.endIndex)
                                : String(parameter.value),
                            position: parameter.position,
                            contextType: contextDescriptor?.typeNames[0],
                            fhirVersion: contextDescriptor?.fhirVersion ?? groupVersion,
                        }, ruleVariables, sourceText, sourceName, customTypeModels);
                        diagnostics.push(...validation.diagnostics);
                        expressionDescriptor ??= validation.descriptor;
                    }
                    if (expressionDescriptor) {
                        transformResultTypes.set(transform, expressionDescriptor);
                        if (transformUsage) {
                            transformUsage.transformResultTypeNames = expressionDescriptor.typeNames;
                            if (target.variable) {
                                transformUsage.variableName = target.variable;
                                transformUsage.variableSpan = this.findVariableSpan(
                                    sourceText,
                                    target.position,
                                    target.variable,
                                );
                            }
                        }
                    }
                }

                if (!target.variable) continue;
                const transformTypeNames = transform && transform.type !== "evaluate"
                    ? resolveTransformResultTypes(transform)
                    : [];
                const descriptor = this.descriptorFromUsage(usage)
                    ?? expressionDescriptor
                    ?? {
                        typeNames: transformTypeNames,
                        isCollection: false,
                        fhirVersion: groupVersion,
                    };
                ruleVariables.set(target.variable, descriptor);
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
                transformResultTypes,
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
        return this.analyzeExpression(
            occurrence,
            variables,
            sourceText,
            sourceName,
            customTypeModels,
        ).diagnostics;
    }

    private analyzeExpression(
        occurrence: ExpressionOccurrence,
        variables: Map<string, VariableDescriptor>,
        sourceText: string,
        sourceName?: string,
        customTypeModels: Record<string, TypeModel> = {},
    ): {diagnostics: FmlDiagnostic[]; descriptor?: VariableDescriptor} {
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
        const diagnostics = expressionDiagnostics.map(diagnostic => {
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
        const typeNames = result.expectedReturnType
            .replace(/^\((.*)\)$/, "$1")
            .split("|")
            .map(typeName => typeName.trim())
            .filter(Boolean);
        return {
            diagnostics,
            descriptor: typeNames.length > 0 ? {
                typeNames,
                isCollection: result.expectedReturnIsCollection,
                fhirVersion: occurrence.fhirVersion,
            } : undefined,
        };
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
                && ((usage.span.start.line === position.startLine
                    && usage.span.start.column === position.startColumn)
                    || (usage.transformSpan?.start.line === position.startLine
                        && usage.transformSpan.start.column === position.startColumn));
        });
    }

    private findTransformUsage(
        groupName: string,
        position: SourcePosition | undefined,
        usages: FmlPropertyUsage[],
    ): FmlPropertyUsage | undefined {
        return usages.find(usage => {
            return usage.groupName === groupName
                && !!position
                && usage.transformSpan?.start.line === position.startLine
                && usage.transformSpan.start.column === position.startColumn;
        });
    }

    private findVariableSpan(
        sourceText: string,
        position: SourcePosition | undefined,
        variableName: string,
    ): FmlPropertyUsage["variableSpan"] {
        if (!position) return undefined;
        const clause = sourceText.slice(position.startIndex, position.endIndex);
        const aliases = clause.matchAll(/\bas\s+(`[^`]+`|[A-Za-z_][A-Za-z0-9_]*)/g);
        for (const alias of aliases) {
            const token = alias[1];
            if (token.replace(/^`(.*)`$/, "$1") !== variableName.replace(/^`(.*)`$/, "$1")) continue;
            const startIndex = position.startIndex + alias.index + alias[0].lastIndexOf(token);
            return {
                start: this.positionAt(sourceText, startIndex),
                end: this.positionAt(sourceText, startIndex + token.length),
            };
        }
        return undefined;
    }

    private toVersionKey(version?: FhirVersion): FhirVersionKey {
        switch (version) {
            case "STU3": return "stu3";
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