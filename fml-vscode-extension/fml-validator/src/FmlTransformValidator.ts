import type {TypeModel} from "../../../helpers/custom_model";
import type {
    FhirVersion,
    FmlStructureMap,
    GroupDeclaration,
    Rule,
    SourcePosition,
    Transform,
    TransformParameter,
} from "../../../helpers/fml_models";
import {resolveTransformResultTypes} from "../../../helpers/fml_transform_signatures";
import {lookupByTypeName as lookupByTypeNameSTU3} from "../../../helpers/models/generated/stu3";
import {lookupByTypeName as lookupByTypeNameR4} from "../../../helpers/models/generated/r4";
import {lookupByTypeName as lookupByTypeNameR4B} from "../../../helpers/models/generated/r4b";
import {lookupByTypeName as lookupByTypeNameR5} from "../../../helpers/models/generated/r5";
import {lookupByTypeName as lookupByTypeNameR6} from "../../../helpers/models/generated/r6";
import type {FmlDiagnostic, FmlPropertyAnalysis, FmlPropertyUsage} from "./contracts";

interface VariableDescriptor {
    typeNames: string[];
    isCollection: boolean;
    fhirVersion?: FhirVersion;
}

type TypeLookup = (typeName: string) => TypeModel | undefined;

const lookups: Partial<Record<FhirVersion, TypeLookup>> = {
    STU3: lookupByTypeNameSTU3,
    R4: lookupByTypeNameR4,
    R4B: lookupByTypeNameR4B,
    R5: lookupByTypeNameR5,
    R6: lookupByTypeNameR6,
};

export class FmlTransformValidator {
    public validate(
        model: FmlStructureMap,
        propertyAnalysis: FmlPropertyAnalysis,
        sourceName?: string,
        customTypeModels: Record<string, TypeModel> = {},
    ): FmlDiagnostic[] {
        const diagnostics: FmlDiagnostic[] = [];
        for (const group of model.groups) {
            const variables = this.createVariables(group, propertyAnalysis);
            for (const constant of model.constants) {
                variables.set(this.normalizeVariableName(constant.name), {typeNames: [], isCollection: false});
            }
            this.validateRules(
                group.rules,
                group.name,
                variables,
                propertyAnalysis,
                sourceName,
                customTypeModels,
                diagnostics,
            );
        }
        return diagnostics;
    }

    private validateRules(
        rules: Rule[],
        groupName: string,
        inheritedVariables: Map<string, VariableDescriptor>,
        propertyAnalysis: FmlPropertyAnalysis,
        sourceName: string | undefined,
        customTypeModels: Record<string, TypeModel>,
        diagnostics: FmlDiagnostic[],
    ): void {
        for (const rule of rules) {
            const variables = new Map(inheritedVariables);
            for (const source of rule.sources) {
                if (!source.variable) continue;
                const usage = this.findUsage(groupName, "source", source.position, propertyAnalysis.usages);
                variables.set(
                    this.normalizeVariableName(source.variable),
                    this.descriptorFromUsage(usage)
                        ?? variables.get(this.normalizeVariableName(source.context))
                        ?? {typeNames: [], isCollection: false},
                );
            }

            for (const target of rule.targets) {
                const usage = this.findUsage(groupName, "target", target.position, propertyAnalysis.usages);
                const resultTypes = target.transform
                    ? this.validateTransform(
                        target.transform,
                        usage,
                        variables,
                        sourceName,
                        customTypeModels,
                        diagnostics,
                    )
                    : [];
                if (target.variable) {
                    variables.set(
                        this.normalizeVariableName(target.variable),
                        resultTypes.length > 0
                            ? {
                                typeNames: resultTypes,
                                isCollection: false,
                                fhirVersion: usage?.fhirVersion,
                            }
                            : this.descriptorFromUsage(usage)
                                ?? {typeNames: [], isCollection: false},
                    );
                }
            }

            this.validateRules(
                rule.dependent?.rules ?? [],
                groupName,
                variables,
                propertyAnalysis,
                sourceName,
                customTypeModels,
                diagnostics,
            );
        }
    }

    private validateTransform(
        transform: Transform,
        targetUsage: FmlPropertyUsage | undefined,
        variables: Map<string, VariableDescriptor>,
        sourceName: string | undefined,
        customTypeModels: Record<string, TypeModel>,
        diagnostics: FmlDiagnostic[],
    ): string[] {
        const missingVariables = new Set<string>();
        for (const parameter of transform.parameters.filter(candidate => candidate.type === "identifier")) {
            const variableName = this.normalizeVariableName(parameter.value);
            if (variables.has(variableName)) continue;
            missingVariables.add(variableName);
            diagnostics.push(this.diagnostic(
                `Variable '${variableName}' referenced by transform '${transform.type}' is not defined in the current rule context.`,
                parameter.position ?? transform.position,
                variableName,
                sourceName,
            ));
        }

        const resultTypes = this.resolveResultTypes(transform, variables, missingVariables);
        const allowedTypes = this.usageTypeNames(targetUsage);
        if (!targetUsage || targetUsage.unknownElement || resultTypes.length === 0 || allowedTypes.length === 0) {
            return resultTypes;
        }

        const lookup = this.composeLookup(customTypeModels, lookups[targetUsage.fhirVersion ?? "R4B"] ?? lookupByTypeNameR4B);
        const incompatible = resultTypes.filter(resultType => {
            return !allowedTypes.some(allowedType => this.isAssignableTo(resultType, allowedType, lookup));
        });
        if (incompatible.length === 0) return resultTypes;

        const position = this.resultPosition(transform);
        const targetTypeName = lookup(targetUsage.rootTypeName)?.TypeName ?? targetUsage.rootTypeName;
        const targetPath = `${targetTypeName}.${targetUsage.path}`;
        const resultText = incompatible.join(" | ");
        const isVariableAssignment = transform.type === "copy" && transform.parameters[0]?.type === "identifier";
        const message = isVariableAssignment
            ? `Assignment from variable '${this.normalizeVariableName(transform.parameters[0].value)}' with type '${resultText}' is not compatible with target property '${targetPath}' (allowed: ${allowedTypes.join(" | ")}).`
            : `Transform '${transform.type}' ${transform.type === "translate" ? "output" : "result"} type '${resultText}' is not compatible with target property '${targetPath}' (allowed: ${allowedTypes.join(" | ")}).`
                + (transform.type === "translate" ? " The third parameter must select a compatible output type." : "");
        diagnostics.push(this.diagnostic(
            message,
            position ?? transform.position,
            resultText,
            sourceName,
            isVariableAssignment ? "warning" : "error",
        ));
        return resultTypes;
    }

    private resolveResultTypes(
        transform: Transform,
        variables: Map<string, VariableDescriptor>,
        missingVariables: Set<string>,
    ): string[] {
        const sourceParameter = transform.parameters.find(parameter => parameter.name === "source")
            ?? transform.parameters[0];
        if (transform.type === "copy" || (transform.type === "cast" && transform.parameters.length === 1)) {
            return this.parameterTypes(sourceParameter, variables, missingVariables);
        }
        return resolveTransformResultTypes(transform);
    }

    private parameterTypes(
        parameter: TransformParameter | undefined,
        variables: Map<string, VariableDescriptor>,
        missingVariables: Set<string>,
    ): string[] {
        if (!parameter) return [];
        if (parameter.type === "identifier") {
            const variableName = this.normalizeVariableName(parameter.value);
            return missingVariables.has(variableName) ? [] : variables.get(variableName)?.typeNames ?? [];
        }
        if (parameter.type !== "literal") return [];
        switch (parameter.literalType) {
            case "boolean": return ["boolean"];
            case "date": return ["date"];
            case "datetime": return ["dateTime"];
            case "decimal": return ["decimal"];
            case "integer": return ["integer"];
            case "quantity": return ["Quantity"];
            case "string": return ["string"];
            case "time": return ["time"];
            default: return [];
        }
    }

    private resultPosition(transform: Transform): SourcePosition | undefined {
        if (transform.type === "translate") {
            return transform.parameters.find(parameter => parameter.name === "output")?.position
                ?? transform.parameters[2]?.position;
        }
        if (transform.type === "cast") {
            return transform.parameters.find(parameter => parameter.name === "type")?.position
                ?? transform.parameters[1]?.position;
        }
        return transform.parameters[0]?.position;
    }

    private createVariables(
        group: GroupDeclaration,
        propertyAnalysis: FmlPropertyAnalysis,
    ): Map<string, VariableDescriptor> {
        const variables = new Map<string, VariableDescriptor>();
        for (const parameter of group.parameters) {
            const input = propertyAnalysis.groupInputs.find(candidate => {
                return candidate.groupName === group.name && candidate.inputName === parameter.name;
            });
            variables.set(this.normalizeVariableName(parameter.name), {
                typeNames: input?.typeName ? [input.typeName] : [],
                isCollection: false,
                fhirVersion: input?.fhirVersion,
            });
        }
        return variables;
    }

    private descriptorFromUsage(usage: FmlPropertyUsage | undefined): VariableDescriptor | undefined {
        if (!usage) return undefined;
        const typeNames = this.usageTypeNames(usage);
        return {
            typeNames,
            isCollection: !!usage.isCollection,
            fhirVersion: usage.fhirVersion,
        };
    }

    private usageTypeNames(usage: FmlPropertyUsage | undefined): string[] {
        if (!usage) return [];
        if (usage.compatibleTypeNames?.length) return usage.compatibleTypeNames;
        if (usage.possibleTypeNames?.length) return usage.possibleTypeNames;
        return usage.elementTypeName ? usage.elementTypeName.split(" | ") : [];
    }

    private findUsage(
        groupName: string,
        role: "source" | "target",
        position: SourcePosition | undefined,
        usages: FmlPropertyUsage[],
    ): FmlPropertyUsage | undefined {
        return usages.find(usage => {
            return usage.groupName === groupName
                && usage.role === role
                && !!position
                && usage.span.start.line === position.startLine
                && usage.span.start.column === position.startColumn;
        });
    }

    private isAssignableTo(sourceType: string, targetType: string, lookup: TypeLookup): boolean {
        const normalizedTarget = targetType.toLowerCase();
        let current: string | undefined = sourceType;
        const visited = new Set<string>();
        while (current && !visited.has(current.toLowerCase())) {
            if (current.toLowerCase() === normalizedTarget) return true;
            visited.add(current.toLowerCase());
            current = lookup(current)?.BaseTypeName;
        }
        const sourceValueType = this.primitiveValueType(sourceType, lookup);
        return !!sourceValueType && sourceValueType === this.primitiveValueType(targetType, lookup);
    }

    private primitiveValueType(typeName: string, lookup: TypeLookup): string | undefined {
        return lookup(typeName)?.Elements.find(element => element.ElementName === "value")
            ?.Type[0]?.TypeName.toLowerCase();
    }

    private composeLookup(customTypeModels: Record<string, TypeModel>, fallback: TypeLookup): TypeLookup {
        return typeName => customTypeModels[typeName] ?? fallback(typeName);
    }

    private normalizeVariableName(value: string | number | boolean): string {
        return String(value).replace(/^%/, "").replace(/^`(.*)`$/, "$1");
    }

    private diagnostic(
        message: string,
        position: SourcePosition | undefined,
        offendingText: string,
        sourceName?: string,
        severity: FmlDiagnostic["severity"] = "error",
    ): FmlDiagnostic {
        return {
            severity,
            message,
            line: position?.startLine ?? 1,
            column: position?.startColumn ?? 0,
            sourceName,
            offendingText,
        };
    }
}