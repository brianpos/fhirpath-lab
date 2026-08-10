import type {TypeModel} from "../../../helpers/custom_model";
import {parseCanonicalVersion} from "../../../helpers/fml_cross_version";
import type {
    FhirVersion,
    FmlStructureMap,
    GroupDeclaration,
    GroupInvocation,
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
import type {
    FmlDefaultGroup,
    FmlDefaultGroupUsage,
    FmlDiagnostic,
    FmlGroupSignature,
    FmlPropertyAnalysis,
    FmlPropertyUsage,
    FmlSourceSpan,
} from "./contracts";

interface VariableDescriptor {
    typeNames: string[];
    isCollection: boolean;
    fhirVersion?: FhirVersion;
    /** Property occurrence the value was bound from, when the types came directly from that element. */
    usage?: FmlPropertyUsage;
}

interface AssignmentCheck {
    sourceUsage?: FmlPropertyUsage;
    sourceTypes: string[];
    sourceFhirVersion?: FhirVersion;
    targetUsage: FmlPropertyUsage;
    /** Set when the value reaches the target through a rule variable instead of a source property. */
    sourceVariableName?: string;
    line: number;
    column: number;
    offendingText: string;
}

interface GroupSignatureParameter {
    mode: "source" | "target";
    typeName?: string;
}

type TypeLookup = (typeName: string) => TypeModel | undefined;

const lookups: Partial<Record<FhirVersion, TypeLookup>> = {
    STU3: lookupByTypeNameSTU3,
    R4: lookupByTypeNameR4,
    R4B: lookupByTypeNameR4B,
    R5: lookupByTypeNameR5,
    R6: lookupByTypeNameR6,
};

export function resolveDefaultGroups(
    groups: GroupDeclaration[],
    propertyAnalysis: FmlPropertyAnalysis,
): FmlDefaultGroup[] {
    return groups.flatMap(group => {
        if (!group.typeMode) return [];
        const sourceParameter = group.parameters.find(parameter => parameter.mode === "source");
        const targetParameter = group.parameters.find(parameter => parameter.mode === "target");
        if (!sourceParameter || !targetParameter) return [];
        const sourceInput = propertyAnalysis.groupInputs.find(input => {
            return input.groupName === group.name && input.inputName === sourceParameter.name;
        });
        const targetInput = propertyAnalysis.groupInputs.find(input => {
            return input.groupName === group.name && input.inputName === targetParameter.name;
        });
        const sourceTypeName = sourceInput?.typeName ?? sourceParameter.type;
        const targetTypeName = targetInput?.typeName ?? targetParameter.type;
        if (!sourceTypeName || !targetTypeName) return [];
        return [{
            groupName: group.name,
            typeMode: group.typeMode,
            sourceTypeName,
            targetTypeName,
            sourceFhirVersion: sourceInput?.fhirVersion,
            targetFhirVersion: targetInput?.fhirVersion,
        }];
    });
}

export function resolveGroupSignatures(
    groups: GroupDeclaration[],
    propertyAnalysis: FmlPropertyAnalysis,
): FmlGroupSignature[] {
    return groups.map(group => ({
        groupName: group.name,
        parameters: group.parameters.map(parameter => {
            const input = propertyAnalysis.groupInputs.find(candidate => {
                return candidate.groupName === group.name && candidate.inputName === parameter.name;
            });
            return {
                name: parameter.name,
                mode: parameter.mode,
                typeName: input?.typeName ?? parameter.type,
                fhirVersion: input?.fhirVersion,
                resolution: input?.resolution ?? (parameter.type ? "declared" : "unresolved"),
                conflictingTypeNames: input?.conflictingTypeNames,
            };
        }),
    }));
}

export class FmlTransformValidator {
    public getDefaultGroupUsages(
        model: FmlStructureMap,
        propertyAnalysis: FmlPropertyAnalysis,
        sourceText: string,
        customTypeModels: Record<string, TypeModel> = {},
        importedDefaultGroups: FmlDefaultGroup[] = [],
    ): FmlDefaultGroupUsage[] {
        const defaultGroups = [
            ...resolveDefaultGroups(model.groups, propertyAnalysis),
            ...importedDefaultGroups,
        ];
        const usages: FmlDefaultGroupUsage[] = [];
        const collect = (
            groupName: string,
            rules: Rule[],
            inheritedContextVariables: Set<string>,
        ): void => {
            for (const rule of rules) {
                const contextVariables = new Set(inheritedContextVariables);
                for (const source of rule.sources) {
                    if (source.variable) {
                        contextVariables.add(this.normalizeVariableName(source.variable));
                    }
                }
                if (rule.identityFields?.length) {
                    for (const field of rule.identityFields) {
                        const sourceUsage = this.findUsage(groupName, "source", field.position, propertyAnalysis.usages);
                        const targetUsage = this.findUsage(groupName, "target", field.position, propertyAnalysis.usages);
                        if (!sourceUsage || !targetUsage) continue;
                        usages.push(...this.createDefaultGroupUsages(
                            sourceUsage,
                            targetUsage,
                            defaultGroups,
                            customTypeModels,
                            "batch",
                            sourceUsage.span,
                        ));
                    }
                } else if (this.isSimpleIdentityRule(rule, contextVariables)) {
                    const sourceUsage = this.findUsage(
                        groupName,
                        "source",
                        rule.sources[0].position,
                        propertyAnalysis.usages,
                    );
                    const targetUsage = this.findUsage(
                        groupName,
                        "target",
                        rule.targets[0].position,
                        propertyAnalysis.usages,
                    );
                    const arrowSpan = this.findArrowSpan(
                        sourceText,
                        rule.sources[0].position,
                        rule.targets[0].position,
                    );
                    if (sourceUsage && targetUsage && arrowSpan) {
                        usages.push(...this.createDefaultGroupUsages(
                            sourceUsage,
                            targetUsage,
                            defaultGroups,
                            customTypeModels,
                            "simple",
                            arrowSpan,
                        ));
                    }
                }
                for (const target of rule.targets) {
                    if (target.variable) {
                        contextVariables.add(this.normalizeVariableName(target.variable));
                    }
                }
                collect(groupName, rule.dependent?.rules ?? [], contextVariables);
            }
        };
        for (const group of model.groups) {
            collect(
                group.name,
                group.rules,
                new Set(group.parameters.map(parameter => this.normalizeVariableName(parameter.name))),
            );
        }
        return usages;
    }

    public validate(
        model: FmlStructureMap,
        propertyAnalysis: FmlPropertyAnalysis,
        sourceName?: string,
        customTypeModels: Record<string, TypeModel> = {},
        importedDefaultGroups: FmlDefaultGroup[] = [],
        importedGroupSignatures: FmlGroupSignature[] = [],
    ): FmlDiagnostic[] {
        const diagnostics: FmlDiagnostic[] = [];
        const defaultGroups = [
            ...resolveDefaultGroups(model.groups, propertyAnalysis),
            ...importedDefaultGroups,
        ];
        const groupSignatures = [
            ...resolveGroupSignatures(model.groups, propertyAnalysis),
            ...importedGroupSignatures,
        ];
        this.validateGroupDeclarations(
            model,
            importedGroupSignatures,
            sourceName,
            diagnostics,
        );
        for (const group of model.groups) {
            const variables = this.createVariables(group, propertyAnalysis);
            const contextVariables = new Set(
                group.parameters.map(parameter => this.normalizeVariableName(parameter.name)),
            );
            for (const constant of model.constants) {
                variables.set(this.normalizeVariableName(constant.name), {typeNames: [], isCollection: false});
            }
            this.validateRules(
                group.rules,
                group.name,
                variables,
                contextVariables,
                propertyAnalysis,
                groupSignatures,
                defaultGroups,
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
        inheritedContextVariables: Set<string>,
        propertyAnalysis: FmlPropertyAnalysis,
        groupSignatures: FmlGroupSignature[],
        defaultGroups: FmlDefaultGroup[],
        sourceName: string | undefined,
        customTypeModels: Record<string, TypeModel>,
        diagnostics: FmlDiagnostic[],
    ): void {
        for (const rule of rules) {
            const variables = new Map(inheritedVariables);
            const contextVariables = new Set(inheritedContextVariables);
            for (const source of rule.sources) {
                this.validateRuleContext(
                    "Source",
                    source.context,
                    source.position,
                    contextVariables,
                    sourceName,
                    diagnostics,
                );
                if (!source.variable) continue;
                const usage = this.findUsage(groupName, "source", source.position, propertyAnalysis.usages);
                const variableName = this.normalizeVariableName(source.variable);
                variables.set(
                    variableName,
                    this.descriptorFromUsage(usage)
                        ?? variables.get(this.normalizeVariableName(source.context))
                        ?? {typeNames: [], isCollection: false},
                );
                contextVariables.add(variableName);
            }

            this.validateIdentityAssignments(
                rule,
                groupName,
                propertyAnalysis,
                defaultGroups,
                sourceName,
                customTypeModels,
                diagnostics,
                contextVariables,
            );

            for (const target of rule.targets) {
                if (target.context) {
                    this.validateRuleContext(
                        "Target",
                        target.context,
                        target.position,
                        contextVariables,
                        sourceName,
                        diagnostics,
                    );
                }
                const usage = this.findUsage(groupName, "target", target.position, propertyAnalysis.usages);
                const resultTypes = target.transform
                    ? this.validateTransform(
                        target.transform,
                        usage,
                        variables,
                        defaultGroups,
                        sourceName,
                        customTypeModels,
                        diagnostics,
                    )
                    : [];
                if (target.variable) {
                    const variableName = this.normalizeVariableName(target.variable);
                    variables.set(
                        variableName,
                        resultTypes.length > 0
                            ? {
                                typeNames: resultTypes,
                                isCollection: false,
                                fhirVersion: usage?.fhirVersion,
                            }
                            : this.descriptorFromUsage(usage)
                                ?? {typeNames: [], isCollection: false},
                    );
                    contextVariables.add(variableName);
                }
            }

            for (const invocation of rule.dependent?.invocations ?? []) {
                this.validateGroupInvocation(
                    invocation,
                    variables,
                    groupSignatures,
                    sourceName,
                    customTypeModels,
                    diagnostics,
                );
            }

            this.validateRules(
                rule.dependent?.rules ?? [],
                groupName,
                variables,
                contextVariables,
                propertyAnalysis,
                groupSignatures,
                defaultGroups,
                sourceName,
                customTypeModels,
                diagnostics,
            );
        }
    }

    private validateRuleContext(
        role: "Source" | "Target",
        context: string,
        position: SourcePosition | undefined,
        contextVariables: Set<string>,
        sourceName: string | undefined,
        diagnostics: FmlDiagnostic[],
    ): void {
        const contextName = this.normalizeVariableName(context);
        if (contextVariables.has(contextName)) return;
        diagnostics.push(this.diagnostic(
            `${role} context variable '${contextName}' is not defined in the current rule scope.`,
            position,
            contextName,
            sourceName,
        ));
    }

    private validateIdentityAssignments(
        rule: Rule,
        groupName: string,
        propertyAnalysis: FmlPropertyAnalysis,
        defaultGroups: FmlDefaultGroup[],
        sourceName: string | undefined,
        customTypeModels: Record<string, TypeModel>,
        diagnostics: FmlDiagnostic[],
        contextVariables: Set<string>,
    ): void {
        if (rule.identityFields?.length) {
            for (const field of rule.identityFields) {
                this.validateIdentityAssignment(
                    this.findUsage(groupName, "source", field.position, propertyAnalysis.usages),
                    this.findUsage(groupName, "target", field.position, propertyAnalysis.usages),
                    defaultGroups,
                    sourceName,
                    customTypeModels,
                    diagnostics,
                );
            }
            return;
        }
        if (!this.isSimpleIdentityRule(rule, contextVariables)) return;
        const sourceUsage = this.findUsage(
            groupName,
            "source",
            rule.sources[0].position,
            propertyAnalysis.usages,
        );
        this.validateIdentityAssignment(
            sourceUsage,
            this.findUsage(groupName, "target", rule.targets[0].position, propertyAnalysis.usages),
            defaultGroups,
            sourceName,
            customTypeModels,
            diagnostics,
        );
    }

    private isSimpleIdentityRule(
        rule: Rule,
        contextVariables: Set<string>,
    ): boolean {
        if (rule.sources.length !== 1 || rule.targets.length !== 1 || rule.dependent) return false;
        const source = rule.sources[0];
        const target = rule.targets[0];
        const sourceContextExists = contextVariables.has(this.normalizeVariableName(source.context));
        const targetContextExists = !!target.context
            && contextVariables.has(this.normalizeVariableName(target.context));
        return sourceContextExists
            && targetContextExists
            && !!source.element
            && source.min === undefined
            && source.max === undefined
            && source.defaultValue === undefined
            && source.listMode === undefined
            && source.variable === undefined
            && source.condition === undefined
            && source.check === undefined
            && source.log === undefined
            && !!target.context
            && !!target.element
            && target.transform === undefined
            && target.variable === undefined
            && target.listMode === undefined;
    }

    private validateIdentityAssignment(
        sourceUsage: FmlPropertyUsage | undefined,
        targetUsage: FmlPropertyUsage | undefined,
        defaultGroups: FmlDefaultGroup[],
        sourceName: string | undefined,
        customTypeModels: Record<string, TypeModel>,
        diagnostics: FmlDiagnostic[],
    ): void {
        if (!sourceUsage || !targetUsage) return;
        this.validateAssignment(
            {
                sourceUsage,
                sourceTypes: this.usageTypeNames(sourceUsage),
                sourceFhirVersion: sourceUsage.fhirVersion,
                targetUsage,
                line: targetUsage.span.start.line,
                column: targetUsage.span.start.column,
                offendingText: targetUsage.path,
            },
            defaultGroups,
            sourceName,
            customTypeModels,
            diagnostics,
        );
    }

    /** Shared compatibility rules for batch, plain, and variable-based property assignments. */
    private validateAssignment(
        check: AssignmentCheck,
        defaultGroups: FmlDefaultGroup[],
        sourceName: string | undefined,
        customTypeModels: Record<string, TypeModel>,
        diagnostics: FmlDiagnostic[],
    ): void {
        const {sourceUsage, targetUsage} = check;
        if (targetUsage.unknownElement || sourceUsage?.unknownElement) return;
        const targetTypes = this.usageTypeNames(targetUsage);
        if (check.sourceTypes.length === 0 || targetTypes.length === 0) return;
        const lookup = this.composeLookup(
            customTypeModels,
            lookups[targetUsage.fhirVersion ?? "R4B"] ?? lookupByTypeNameR4B,
        );
        const ambiguous: Array<{sourceType: string; targetType: string; groups: FmlDefaultGroup[]}> = [];
        const incompatible = check.sourceTypes.filter(sourceType => {
            return !targetTypes.some(targetType => {
                const versionMismatch = !!check.sourceFhirVersion
                    && !!targetUsage.fhirVersion
                    && check.sourceFhirVersion !== targetUsage.fhirVersion;
                const versionIndependent = this.isSystemType(sourceType) && this.isSystemType(targetType);
                const assignable = (!versionMismatch || versionIndependent)
                    && this.isAssignableTo(sourceType, targetType, lookup);
                const groups = this.findDefaultGroups(
                    defaultGroups,
                    sourceType,
                    targetType,
                    check.sourceFhirVersion,
                    targetUsage.fhirVersion,
                    this.isUnfixedChoice(targetUsage),
                );
                if (groups.length > 1) ambiguous.push({sourceType, targetType, groups});
                return assignable || groups.length > 0;
            });
        });

        const prefix = check.sourceVariableName ? "Assignment" : "Identity assignment";
        const sourceLabel = check.sourceVariableName
            ? `variable '${check.sourceVariableName}'`
            : `source property '${this.describeProperty(sourceUsage, lookup)}'`;
        const targetPath = this.describeProperty(targetUsage, lookup);
        const report = (message: string): void => {
            diagnostics.push({
                severity: "error",
                message,
                line: check.line,
                column: check.column,
                sourceName,
                offendingText: check.offendingText,
            });
        };
        if (incompatible.length > 0) {
            report(`${prefix} from ${sourceLabel} with type '${incompatible.join(" | ")}' `
                + `is not compatible with target property '${targetPath}' (allowed: ${targetTypes.join(" | ")}).`);
            return;
        }

        if (ambiguous.length > 0) {
            const {sourceType, targetType, groups} = ambiguous[0];
            report(`${prefix} from ${sourceLabel} to target property '${targetPath}' matches multiple default `
                + `mapping groups for '${sourceType}' -> '${targetType}': `
                + `${groups.map(group => `'${group.groupName}'`).join(", ")}. `
                + `Only one default group may apply to a type conversion.`);
            return;
        }

        if (!sourceUsage) return;
        const profileMismatch = this.referenceProfileMismatch(
            sourceUsage,
            targetUsage,
            check.sourceTypes,
            targetTypes,
            lookup,
            customTypeModels,
        );
        if (!profileMismatch) return;
        const profileIssue = profileMismatch.unrestrictedSource
            ? `the source Reference is unrestricted, but the target supports only: `
                + `${this.formatTargetProfiles(profileMismatch.supportedProfiles)}.`
            : `the target does not support source Reference target profile(s): `
                + `${this.formatTargetProfiles(profileMismatch.missingProfiles)}. `
                + `Supported target profiles: ${this.formatTargetProfiles(profileMismatch.supportedProfiles)}.`;
        report(`${prefix} from ${sourceLabel} is not compatible with target property `
            + `'${targetPath}': ${profileIssue}`);
    }

    private describeProperty(usage: FmlPropertyUsage | undefined, lookup: TypeLookup): string {
        if (!usage) return "unknown";
        return `${lookup(usage.rootTypeName)?.TypeName ?? usage.rootTypeName}.${usage.path}`;
    }

    private referenceProfileMismatch(
        sourceUsage: FmlPropertyUsage,
        targetUsage: FmlPropertyUsage,
        sourceTypes: string[],
        targetTypes: string[],
        lookup: TypeLookup,
        customTypeModels: Record<string, TypeModel>,
    ): {missingProfiles: string[]; supportedProfiles: string[]; unrestrictedSource: boolean} | undefined {
        if (!sourceTypes.some(type => this.typesMatch(type, "Reference"))
            || !targetTypes.some(type => this.typesMatch(type, "Reference"))) return undefined;

        const sourceProfiles = this.normalizeTargetProfiles(sourceUsage.targetProfiles ?? []);
        const targetProfiles = this.normalizeTargetProfiles(targetUsage.targetProfiles ?? []);
        if (targetProfiles.length === 0) return undefined;
        if (sourceProfiles.length === 0) {
            return {missingProfiles: [], supportedProfiles: targetProfiles, unrestrictedSource: true};
        }
        const missingProfiles = sourceProfiles.filter(sourceProfile => {
            return !targetProfiles.some(targetProfile => {
                return this.targetProfileSupports(sourceProfile, targetProfile, lookup, customTypeModels);
            });
        });
        return missingProfiles.length > 0
            ? {missingProfiles, supportedProfiles: targetProfiles, unrestrictedSource: false}
            : undefined;
    }

    private targetProfileSupports(
        sourceProfile: string,
        targetProfile: string,
        lookup: TypeLookup,
        customTypeModels: Record<string, TypeModel>,
    ): boolean {
        if (sourceProfile.toLowerCase() === targetProfile.toLowerCase()) return true;
        const sourceTypeName = this.targetProfileTypeName(sourceProfile, customTypeModels);
        const targetTypeName = this.targetProfileTypeName(targetProfile, customTypeModels);
        if (!sourceTypeName || !targetTypeName) return false;
        const customModelsByTypeName = new Map(
            Object.values(customTypeModels).map(model => [model.TypeName.toLowerCase(), model]),
        );
        return this.isAssignableTo(sourceTypeName, targetTypeName, typeName => {
            return customModelsByTypeName.get(typeName.toLowerCase()) ?? lookup(typeName);
        });
    }

    private targetProfileTypeName(
        profile: string,
        customTypeModels: Record<string, TypeModel>,
    ): string | undefined {
        const customModel = Object.values(customTypeModels).find(model => {
            return !!model.CanonicalUrl
                && this.normalizeTargetProfile(model.CanonicalUrl).toLowerCase() === profile.toLowerCase();
        });
        return customModel?.TypeName ?? profile.split("/").pop();
    }

    private normalizeTargetProfiles(profiles: string[]): string[] {
        return [...new Map(profiles.map(profile => {
            const normalized = this.normalizeTargetProfile(profile);
            return [normalized.toLowerCase(), normalized];
        })).values()];
    }

    private normalizeTargetProfile(profile: string): string {
        return parseCanonicalVersion(profile.split("|")[0]).canonical;
    }

    private formatTargetProfiles(profiles: string[]): string {
        return profiles.map(profile => {
            const coreMatch = /^https?:\/\/hl7\.org\/fhir\/StructureDefinition\/([^/]+)$/i.exec(profile);
            if (coreMatch) return `'${coreMatch[1]}'`;
            const name = profile.split("/").pop();
            return name && name !== profile ? `'${name}' (${profile})` : `'${profile}'`;
        }).join(", ");
    }

    private validateGroupInvocation(
        invocation: GroupInvocation,
        variables: Map<string, VariableDescriptor>,
        groupSignatures: FmlGroupSignature[],
        sourceName: string | undefined,
        customTypeModels: Record<string, TypeModel>,
        diagnostics: FmlDiagnostic[],
    ): void {
        const callee = groupSignatures.find(group => group.groupName === invocation.name);
        if (!callee) return;
        if (callee.parameters.length !== invocation.parameters.length) {
            diagnostics.push(this.diagnostic(
                `Group '${callee.groupName}' expects ${callee.parameters.length} parameter(s), but received ${invocation.parameters.length}.`,
                invocation.position,
                invocation.name,
                sourceName,
            ));
        }
        for (let index = 0; index < callee.parameters.length && index < invocation.parameters.length; index++) {
            const declaredParameter = callee.parameters[index];
            if (!declaredParameter.typeName || declaredParameter.resolution === "conflict") continue;
            const argument = invocation.parameters[index];
            if (argument.type !== "identifier") continue;
            const variableName = this.normalizeVariableName(argument.value);
            const descriptor = variables.get(variableName);
            if (!descriptor?.typeNames.length) continue;
            const declaredType = declaredParameter.typeName;
            const declaredVersion = declaredParameter.fhirVersion;
            const lookup = this.composeLookup(
                customTypeModels,
                lookups[declaredVersion ?? descriptor.fhirVersion ?? "R4B"] ?? lookupByTypeNameR4B,
            );
            const versionMismatch = !!declaredVersion && !!descriptor.fhirVersion
                && declaredVersion !== descriptor.fhirVersion;
            const incompatibleTypes = descriptor.typeNames.filter(typeName => {
                return versionMismatch || !this.isAssignableTo(typeName, declaredType, lookup);
            });
            if (incompatibleTypes.length === 0) continue;
            diagnostics.push(this.diagnostic(
                `Group '${callee.groupName}' parameter '${declaredParameter.name}' expects '${declaredType}', but argument '${variableName}' has type '${incompatibleTypes.join(" | ")}'.`,
                argument.position ?? invocation.position,
                variableName,
                sourceName,
            ));
        }
    }

    private validateTransform(
        transform: Transform,
        targetUsage: FmlPropertyUsage | undefined,
        variables: Map<string, VariableDescriptor>,
        defaultGroups: FmlDefaultGroup[],
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

        if (transform.type === "copy" && transform.parameters[0]?.type === "identifier") {
            const variableName = this.normalizeVariableName(transform.parameters[0].value);
            if (missingVariables.has(variableName)) return resultTypes;
            const descriptor = variables.get(variableName);
            const variablePosition = this.resultPosition(transform) ?? transform.position;
            this.validateAssignment(
                {
                    sourceUsage: descriptor?.usage,
                    sourceTypes: resultTypes,
                    sourceFhirVersion: descriptor?.fhirVersion,
                    targetUsage,
                    sourceVariableName: variableName,
                    line: variablePosition?.startLine ?? 1,
                    column: variablePosition?.startColumn ?? 0,
                    offendingText: variableName,
                },
                defaultGroups,
                sourceName,
                customTypeModels,
                diagnostics,
            );
            return resultTypes;
        }

        const lookup = this.composeLookup(customTypeModels, lookups[targetUsage.fhirVersion ?? "R4B"] ?? lookupByTypeNameR4B);
        const incompatible = resultTypes.filter(resultType => {
            return !allowedTypes.some(allowedType => this.isAssignableTo(resultType, allowedType, lookup));
        });
        if (incompatible.length === 0) return resultTypes;

        const position = this.resultPosition(transform);
        const targetPath = this.describeProperty(targetUsage, lookup);
        const resultText = incompatible.join(" | ");
        diagnostics.push(this.diagnostic(
            `Transform '${transform.type}' ${transform.type === "translate" ? "output" : "result"} type '${resultText}' is not compatible with target property '${targetPath}' (allowed: ${allowedTypes.join(" | ")}).`
                + (transform.type === "translate" ? " The third parameter must select a compatible output type." : ""),
            position ?? transform.position,
            resultText,
            sourceName,
            "error",
        ));
        return resultTypes;
    }

    /** A group name may be overloaded, but not repeated with the same parameter signature. */
    private validateGroupDeclarations(
        model: FmlStructureMap,
        importedGroupSignatures: FmlGroupSignature[],
        sourceName: string | undefined,
        diagnostics: FmlDiagnostic[],
    ): void {
        const declared = new Map<string, string>();
        const visit = (
            groupName: string,
            parameters: GroupSignatureParameter[],
            origin: string,
            position: SourcePosition | undefined,
            offendingText: string,
        ): void => {
            const key = `${groupName}(${parameters.map(parameter => {
                return `${parameter.mode}:${parameter.typeName ?? ""}`;
            }).join(",")})`;
            const existing = declared.get(key);
            if (existing === undefined) {
                declared.set(key, origin);
                return;
            }
            const signature = parameters.map(parameter => {
                return `${parameter.mode} ${parameter.typeName ?? "?"}`;
            }).join(", ");
            diagnostics.push(this.diagnostic(
                `Group '${groupName}(${signature})' is already declared in ${existing}. `
                + `Group names may only be repeated with a different parameter signature.`,
                position,
                offendingText,
                sourceName,
            ));
        };
        for (const signature of importedGroupSignatures) {
            visit(
                signature.groupName,
                signature.parameters,
                this.describeGroupOrigin(signature.definitionUri),
                model.imports[0]?.position,
                model.imports[0]?.url ?? signature.groupName,
            );
        }
        for (const group of model.groups) {
            visit(
                group.name,
                group.parameters.map(parameter => ({mode: parameter.mode, typeName: parameter.type})),
                "this map",
                group.position,
                group.name,
            );
        }
    }

    private describeGroupOrigin(definitionUri: string | undefined): string {
        const fileName = definitionUri?.split(/[\\/]/).pop();
        if (!fileName) return "an imported map";
        return `'${decodeURIComponent(fileName)}'`;
    }

    private findDefaultGroups(
        groups: FmlDefaultGroup[],
        sourceTypeName: string,
        targetTypeName: string,
        sourceFhirVersion: FhirVersion | undefined,
        targetFhirVersion: FhirVersion | undefined,
        isUnfixedChoice: boolean,
    ): FmlDefaultGroup[] {
        const matches = groups.filter(group => {
            if (isUnfixedChoice && group.typeMode !== "type+") return false;
            return this.typesMatch(group.sourceTypeName, sourceTypeName)
                && this.typesMatch(group.targetTypeName, targetTypeName)
                && this.versionsMatch(group.sourceFhirVersion, sourceFhirVersion)
                && this.versionsMatch(group.targetFhirVersion, targetFhirVersion);
        });
        // Only collapse groups that are indistinguishable; repeated declarations are reported separately.
        return [...new Map(matches.map(group => [
            [
                group.groupName,
                group.typeMode,
                group.sourceTypeName,
                group.targetTypeName,
                group.sourceFhirVersion ?? "",
                group.targetFhirVersion ?? "",
            ].join("|"),
            group,
        ])).values()];
    }

    private createDefaultGroupUsages(
        sourceUsage: FmlPropertyUsage,
        targetUsage: FmlPropertyUsage,
        defaultGroups: FmlDefaultGroup[],
        customTypeModels: Record<string, TypeModel>,
        kind: FmlDefaultGroupUsage["kind"],
        span: FmlSourceSpan,
    ): FmlDefaultGroupUsage[] {
        if (sourceUsage.unknownElement || targetUsage.unknownElement) return [];
        const sourceTypes = this.usageTypeNames(sourceUsage);
        const targetTypes = this.usageTypeNames(targetUsage);
        if (sourceTypes.length === 0 || targetTypes.length === 0) return [];
        const lookup = this.composeLookup(
            customTypeModels,
            lookups[targetUsage.fhirVersion ?? "R4B"] ?? lookupByTypeNameR4B,
        );
        const matches: FmlDefaultGroup[] = [];
        for (const sourceType of sourceTypes) {
            let accepted = false;
            for (const targetType of targetTypes) {
                const versionMismatch = !!sourceUsage.fhirVersion
                    && !!targetUsage.fhirVersion
                    && sourceUsage.fhirVersion !== targetUsage.fhirVersion;
                const versionIndependent = this.isSystemType(sourceType) && this.isSystemType(targetType);
                const assignable = (!versionMismatch || versionIndependent)
                    && this.isAssignableTo(sourceType, targetType, lookup);
                // Matching groups are listed even when the copy is already valid, because they take precedence.
                const found = this.findDefaultGroups(
                    defaultGroups,
                    sourceType,
                    targetType,
                    sourceUsage.fhirVersion,
                    targetUsage.fhirVersion,
                    this.isUnfixedChoice(targetUsage),
                );
                matches.push(...found);
                if (assignable || found.length > 0) {
                    accepted = true;
                    break;
                }
            }
            if (!accepted) return [];
        }
        return [...new Map(matches.map(group => [group.groupName, group])).values()].map(group => ({
            defaultGroupName: group.groupName,
            typeMode: group.typeMode,
            kind,
            sourceTypeName: group.sourceTypeName,
            targetTypeName: group.targetTypeName,
            span,
        }));
    }

    private findArrowSpan(
        sourceText: string,
        sourcePosition: SourcePosition | undefined,
        targetPosition: SourcePosition | undefined,
    ): FmlSourceSpan | undefined {
        if (!sourcePosition || !targetPosition) return undefined;
        const arrowIndex = sourceText.indexOf("->", sourcePosition.endIndex);
        if (arrowIndex < 0 || arrowIndex >= targetPosition.startIndex) return undefined;
        return {
            start: this.positionAt(sourceText, arrowIndex),
            end: this.positionAt(sourceText, arrowIndex + 2),
        };
    }

    private positionAt(sourceText: string, offset: number): FmlSourceSpan["start"] {
        const prefix = sourceText.slice(0, offset);
        return {
            line: prefix.split(/\r?\n/).length,
            column: offset - (prefix.lastIndexOf("\n") + 1),
        };
    }

    private typesMatch(left: string, right: string): boolean {
        return left.toLowerCase() === right.toLowerCase();
    }

    private isSystemType(typeName: string): boolean {
        return typeName.toLowerCase().startsWith("system.");
    }

    private versionsMatch(groupVersion: FhirVersion | undefined, propertyVersion: FhirVersion | undefined): boolean {
        return !groupVersion || !propertyVersion || groupVersion === propertyVersion;
    }

    private isUnfixedChoice(usage: FmlPropertyUsage): boolean {
        return (usage.possibleTypeNames?.length ?? 0) > 1
            && (usage.compatibleTypeNames?.length ?? usage.possibleTypeNames?.length ?? 0) > 1;
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
            usage,
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