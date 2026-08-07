import {isFmlParseError, parseFML, parseFMLPartial} from "../../../helpers/fml_parser";
import type {FhirVersion, FmlStructureMap} from "../../../helpers/fml_models";
import {
    extractFmlStructureMapDiagram,
    type DiagramSourcePosition,
    type TypeLookup,
} from "../../../helpers/structuremap_diagram_instance";
import type {ElementModel, TypeModel} from "../../../helpers/custom_model";
import {resolveTransformResultTypes} from "../../../helpers/fml_transform_signatures";
import {getFhirPathVariableReferences} from "../../../helpers/fhirpath_validator";
import {lookupByTypeName as lookupByTypeNameSTU3} from "../../../helpers/models/generated/stu3";
import {lookupByTypeName as lookupByTypeNameR4} from "../../../helpers/models/generated/r4";
import {lookupByTypeName as lookupByTypeNameR4B} from "../../../helpers/models/generated/r4b";
import {lookupByTypeName as lookupByTypeNameR5} from "../../../helpers/models/generated/r5";
import {lookupByTypeName as lookupByTypeNameR6} from "../../../helpers/models/generated/r6";
import {
    FmlCompletionContext,
    FmlPropertyAnalysis,
    FmlPropertyCompletion,
    FmlPropertyUsage,
    FmlSource,
    FmlSourceSpan,
} from "./contracts";
import {applyFmlModelConfiguration} from "./FmlModelConfiguration";

const lookups: Partial<Record<FhirVersion, TypeLookup>> = {
    STU3: lookupByTypeNameSTU3,
    R4: lookupByTypeNameR4,
    R4B: lookupByTypeNameR4B,
    R5: lookupByTypeNameR5,
    R6: lookupByTypeNameR6,
};

export class FmlPropertyUsageCollector {
    private static readonly completionMarker = "fmlCompletionMarker";

    public collect(source: FmlSource): FmlPropertyUsage[] {
        return this.collectAnalysis(source).usages;
    }

    public collectAnalysis(source: FmlSource): FmlPropertyAnalysis {
        const parsed = parseFML(source.sourceText);
        if (isFmlParseError(parsed)) {
            return {usages: [], groupInputs: [], variableReferences: []};
        }
        applyFmlModelConfiguration(parsed, source);

        return this.analyzeModel(parsed, source.sourceText, source.customTypeModels);
    }

    public analyzeModel(
        parsed: FmlStructureMap,
        sourceText: string,
        customTypeModels: Record<string, TypeModel> = {},
    ): FmlPropertyAnalysis {

        const defaultLookup = this.composeLookup(customTypeModels, lookupByTypeNameR4B);

        const diagram = extractFmlStructureMapDiagram(
            parsed,
            defaultLookup,
            false,
            version => version && lookups[version]
                ? this.composeLookup(customTypeModels, lookups[version]!)
                : undefined,
        );
        const usages: FmlPropertyUsage[] = [];
        const groupInputs: FmlPropertyAnalysis["groupInputs"] = [];
        const seen = new Set<string>();
        for (const group of diagram.groups) {
            for (const type of [...group.sourceTypes, ...group.targetTypes, ...group.secondaryTargetTypes]) {
                if (!type.isComputed && type.fmlPosition && !groupInputs.some(input => {
                    return input.groupName === group.name && input.inputName === type.paramName;
                })) {
                    groupInputs.push({
                        groupName: group.name,
                        inputName: type.paramName,
                        span: this.toSpan(sourceText, type.fmlPosition),
                        typeName: type.typeName || undefined,
                        fhirVersion: type.fhirVersion,
                        resolution: type.typeResolution ?? "unresolved",
                        conflictingTypeNames: type.conflictingTypeNames,
                    });
                }
                for (const property of type.properties) {
                    if (!property.role || property.path === ".") {
                        continue;
                    }
                    for (const position of property.fmlPositions ?? (property.fmlPosition ? [property.fmlPosition] : [])) {
                        const transformOccurrence = property.transformOccurrences?.find(occurrence => {
                            return occurrence.propertyPosition.startIndex === position.startIndex
                                && occurrence.propertyPosition.endIndex === position.endIndex;
                        });
                        const transformPosition = transformOccurrence?.transformPosition ?? property.transformPosition;
                        const transform = transformPosition
                            ? this.findModelTransform(parsed, transformPosition)
                            : undefined;
                        const resultParameter = transform?.type === "translate"
                            ? transform.parameters.find(parameter => parameter.name === "output") ?? transform.parameters[2]
                            : undefined;
                        const span = this.toPropertySpan(sourceText, position);
                        const key = `${group.name}:${property.role}:${span.start.line}:${span.start.column}:${property.path}`;
                        if (seen.has(key)) {
                            continue;
                        }
                        seen.add(key);
                        usages.push({
                            groupName: group.name,
                            path: property.path.replace(/#[^.]+/g, ""),
                            role: property.role,
                            rootTypeName: type.typeName,
                            rootVariableName: type.paramName,
                            variableName: property.variableName,
                            fhirVersion: type.fhirVersion,
                            span,
                            isCollection: property.isCollection,
                            cardinalityMin: property.cardinalityMin,
                            cardinalityMax: property.cardinalityMax,
                            targetProfiles: property.targetProfiles,
                            specificationPath: property.specificationPath,
                            pathSteps: property.pathSteps,
                            elementTypeName: property.elementTypeName,
                            possibleTypeNames: property.possibleTypeNames,
                            compatibleTypeNames: property.compatibleTypeNames,
                            excludedTypeNames: property.excludedTypeNames,
                            unknownElement: property.unknownElement,
                            validationError: property.validationError,
                            transformName: transformOccurrence?.transformName ?? property.transformName,
                            transformSpan: transformPosition
                                ? this.toSpan(sourceText, transformPosition)
                                : undefined,
                            transformResultTypeNames: transform ? resolveTransformResultTypes(transform) : undefined,
                            transformResultSpan: resultParameter?.position
                                ? this.toSpan(sourceText, resultParameter.position)
                                : undefined,
                            transformResultText: resultParameter ? String(resultParameter.value) : undefined,
                            variableSpan: property.variableName
                                ? this.findVariableSpan(sourceText, position, property.variableName)
                                : undefined,
                            ruleSpan: property.ruleFmlPosition
                                ? this.toSpan(sourceText, property.ruleFmlPosition)
                                : undefined,
                            transformVariableReferences: transform?.parameters.flatMap(parameter => {
                                return parameter.type === "identifier" && parameter.position
                                    ? [{
                                        name: String(parameter.value).replace(/^%/, "").replace(/^`(.*)`$/, "$1"),
                                        span: this.toSpan(sourceText, parameter.position),
                                    }]
                                    : [];
                            }),
                        });
                    }
                }
            }
        }
        return {
            usages,
            groupInputs,
            variableReferences: this.collectVariableReferences(parsed, sourceText),
        };
    }

    private collectVariableReferences(parsed: FmlStructureMap, sourceText: string): FmlPropertyAnalysis["variableReferences"] {
        const references: FmlPropertyAnalysis["variableReferences"] = [];
        const collect = (groupName: string, rules: FmlStructureMap["groups"][number]["rules"]): void => {
            for (const rule of rules) {
                const ruleSpan = rule.position ? this.toSpan(sourceText, rule.position) : undefined;
                for (const target of rule.targets) {
                    const contextSpan = target.context && !target.element && target.position
                        ? this.findLeadingIdentifierSpan(sourceText, target.position)
                        : undefined;
                    if (target.context && !target.element && contextSpan) {
                        references.push({name: target.context, span: contextSpan, groupName, ruleSpan});
                    }
                    for (const parameter of target.transform?.parameters ?? []) {
                        if (!parameter.position) continue;
                        if (parameter.type === "identifier") {
                            references.push({
                                name: String(parameter.value).replace(/^%/, "").replace(/^`(.*)`$/, "$1"),
                                span: this.toSpan(sourceText, parameter.position),
                                groupName,
                                ruleSpan,
                            });
                        } else if (parameter.type === "expression") {
                            const expression = String(parameter.value);
                            const variableNames = this.collectRuleVariableNames(parsed, groupName);
                            for (const name of getFhirPathVariableReferences(expression, variableNames)) {
                                const span = this.findExpressionVariableSpan(sourceText, parameter.position, name);
                                if (span) references.push({name, span, groupName, ruleSpan});
                            }
                        }
                    }
                }
                collect(groupName, rule.dependent?.rules ?? []);
            }
        };
        for (const group of parsed.groups) collect(group.name, group.rules);
        return references;
    }

    private collectRuleVariableNames(parsed: FmlStructureMap, groupName: string): string[] {
        const group = parsed.groups.find(candidate => candidate.name === groupName);
        if (!group) return [];
        const names = new Set(group.parameters.map(parameter => parameter.name));
        const collect = (rules: FmlStructureMap["groups"][number]["rules"]): void => {
            for (const rule of rules) {
                for (const source of rule.sources) if (source.variable) names.add(source.variable);
                for (const target of rule.targets) if (target.variable) names.add(target.variable);
                collect(rule.dependent?.rules ?? []);
            }
        };
        collect(group.rules);
        return [...names];
    }

    private findExpressionVariableSpan(
        sourceText: string,
        position: DiagramSourcePosition,
        variableName: string,
    ): FmlSourceSpan | undefined {
        const expression = sourceText.slice(position.startIndex, position.endIndex);
        const pattern = new RegExp(`(?:%|\\b)${this.escapeRegExp(variableName)}\\b`);
        const match = pattern.exec(expression);
        if (!match) return undefined;
        const prefixLength = match[0].startsWith("%") ? 1 : 0;
        const startIndex = position.startIndex + match.index + prefixLength;
        return this.toSpan(sourceText, {
            ...position,
            startIndex,
            endIndex: startIndex + variableName.length,
        });
    }

    private escapeRegExp(value: string): string {
        return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    private findModelTransform(
        parsed: FmlStructureMap,
        position: DiagramSourcePosition,
    ): import("../../../helpers/fml_models").Transform | undefined {
        for (const group of parsed.groups) {
            const transform = this.findTransform(group.rules, position.startIndex, position.endIndex);
            if (transform) return transform;
        }
        return undefined;
    }

    private findTransform(
        rules: FmlStructureMap["groups"][number]["rules"],
        startIndex: number,
        endIndex: number,
    ): import("../../../helpers/fml_models").Transform | undefined {
        for (const rule of rules) {
            for (const target of rule.targets) {
                const position = target.transform?.position;
                if (position?.startIndex === startIndex && position.endIndex === endIndex) {
                    return target.transform;
                }
            }
            const nested = this.findTransform(rule.dependent?.rules ?? [], startIndex, endIndex);
            if (nested) return nested;
        }
        return undefined;
    }

    public getCompletions(source: FmlSource, cursorOffset: number): FmlPropertyCompletion[] {
        const context = this.getCompletionContext(source, cursorOffset);
        return context?.kind === "source-property" || context?.kind === "target-property"
            ? context.properties
            : [];
    }

    public getCompletionContext(source: FmlSource, cursorOffset: number): FmlCompletionContext | undefined {
        const beforeCursor = source.sourceText.slice(0, cursorOffset);
        const partial = beforeCursor.match(/[A-Za-z_][A-Za-z0-9_]*$/)?.[0] ?? "";
        const partialStart = cursorOffset - partial.length;
        const prefixModel = parseFMLPartial(beforeCursor).model;
        if (prefixModel) {
            applyFmlModelConfiguration(prefixModel, source);
            const prefixAnalysis = this.analyzeModel(prefixModel, beforeCursor, source.customTypeModels);
            const positionedUsage = this.getPositionedPropertyUsage(
                prefixModel,
                source,
                prefixAnalysis,
                cursorOffset,
                partialStart,
                partial,
            );
            if (positionedUsage) {
                return this.createPropertyCompletionContext(source, positionedUsage, partial);
            }
        }

        const completionText = beforeCursor.slice(0, partialStart)
            + FmlPropertyUsageCollector.completionMarker;
        const parsed = parseFMLPartial(completionText).model;
        if (!parsed) {
            const fullModel = parseFML(source.sourceText);
            return isFmlParseError(fullModel)
                ? undefined
                : this.getAliasCompletionContext(
                    source,
                    fullModel,
                    beforeCursor,
                    partialStart,
                    partial,
                );
        }
        applyFmlModelConfiguration(parsed, source);

        const propertyContext = this.getPropertyCompletionContext(
            source,
            parsed,
            completionText,
            partialStart,
            partial,
        );
        if (propertyContext) {
            return propertyContext;
        }

        const aliasContext = this.getAliasCompletionContext(
            source,
            parsed,
            beforeCursor,
            partialStart,
            partial,
        );
        if (aliasContext) {
            return aliasContext;
        }

        return this.hasMarkerTransform(parsed.groups.flatMap(group => group.rules))
            ? {kind: "transform", partial}
            : undefined;
    }

    private getAliasCompletionContext(
        source: FmlSource,
        parsed: FmlStructureMap,
        beforeCursor: string,
        partialStart: number,
        partial: string,
    ): Extract<FmlCompletionContext, {kind: "source-property" | "target-property"}> | undefined {
        const aliasName = beforeCursor.slice(0, partialStart).match(/([A-Za-z_][A-Za-z0-9_]*)\.$/)?.[1];
        if (!aliasName) return undefined;
        const activeGroup = parsed.groups.filter(group => {
            return group.position
                && group.position.startIndex <= partialStart
                && partialStart <= group.position.endIndex;
        }).sort((left, right) => {
            const leftSize = (left.position?.endIndex ?? 0) - (left.position?.startIndex ?? 0);
            const rightSize = (right.position?.endIndex ?? 0) - (right.position?.startIndex ?? 0);
            return leftSize - rightSize;
        })[0];
        if (!activeGroup) return undefined;
        const aliasUsage = this.collectAnalysis(source).usages.find(usage => {
            return usage.groupName === activeGroup.name && usage.variableName === aliasName;
        });
        const rootTypeName = aliasUsage?.compatibleTypeNames?.[0] ?? aliasUsage?.elementTypeName;
        if (!aliasUsage || !rootTypeName) return undefined;
        return this.createPropertyCompletionContext(source, {
            path: FmlPropertyUsageCollector.completionMarker,
            role: aliasUsage.role,
            rootTypeName,
            fhirVersion: aliasUsage.fhirVersion,
        }, partial);
    }

    private getPropertyCompletionContext(
        source: FmlSource,
        parsed: FmlStructureMap,
        completionText: string,
        markerStart: number,
        partial: string,
    ): Extract<FmlCompletionContext, {kind: "source-property" | "target-property"}> | undefined {
        const analysis = this.analyzeModel(parsed, completionText, source.customTypeModels);
        const analyzedMarkerUsage = analysis.usages.find(usage => {
            return usage.path.split(".").at(-1) === FmlPropertyUsageCollector.completionMarker;
        });
        const markerPath = completionText.match(
            /(?:`[^`]+`|[A-Za-z_][A-Za-z0-9_]*)(?:\.(?:`[^`]+`|[A-Za-z_][A-Za-z0-9_]*))*\.fmlCompletionMarker$/,
        )?.[0];
        const markerUsage = analyzedMarkerUsage ?? this.getRecoveredPropertyUsage(
            parsed,
            source,
            analysis,
            markerStart,
            markerPath,
        );
        if (!markerUsage?.rootTypeName) {
            return undefined;
        }

        return this.createPropertyCompletionContext(source, markerUsage, partial);
    }

    private createPropertyCompletionContext(
        source: FmlSource,
        markerUsage: Pick<FmlPropertyUsage, "path" | "role" | "rootTypeName" | "fhirVersion">,
        partial: string,
    ): Extract<FmlCompletionContext, {kind: "source-property" | "target-property"}> | undefined {

        const coreLookup = markerUsage.fhirVersion
            ? lookups[markerUsage.fhirVersion] ?? lookupByTypeNameR4B
            : lookupByTypeNameR4B;
        const lookup = this.composeLookup(source.customTypeModels ?? {}, coreLookup);
        const parentParts = markerUsage.path.split(".").slice(0, -1);
        let candidateTypes = [markerUsage.rootTypeName];
        for (const part of parentParts) {
            const nextTypes: string[] = [];
            for (const candidateType of candidateTypes) {
                const element = this.findElement(lookup(candidateType), part, lookup);
                if (element) {
                    nextTypes.push(...element.Type.map(type => type.TypeName));
                }
            }
            candidateTypes = [...new Set(nextTypes)];
            if (candidateTypes.length === 0) {
                return undefined;
            }
        }

        const elements = new Map<string, ElementModel>();
        for (const candidateType of candidateTypes) {
            for (const element of this.getElements(lookup(candidateType), lookup)) {
                const name = element.ElementName.replace(/\[x\]$/, "");
                if (name.startsWith(partial) && !elements.has(name)) {
                    elements.set(name, element);
                }
            }
        }
        return {
            kind: markerUsage.role === "source" ? "source-property" : "target-property",
            partial,
            properties: [...elements].map(([name, element]) => ({
                name,
                typeNames: element.Type.map(type => type.TypeName),
                cardinalityMin: element.Required ? 1 as const : 0 as const,
                cardinalityMax: element.IsArray ? "*" as const : "1" as const,
                targetProfiles: [...new Set(element.Type.flatMap(type => type.TargetProfile ?? []))],
                fhirVersion: markerUsage.fhirVersion,
            })).sort((left, right) => left.name.localeCompare(right.name)),
        };
    }

    private getPositionedPropertyUsage(
        parsed: FmlStructureMap,
        source: FmlSource,
        analysis: FmlPropertyAnalysis,
        cursorOffset: number,
        partialStart: number,
        partial: string,
    ): Pick<FmlPropertyUsage, "path" | "role" | "rootTypeName" | "fhirVersion"> | undefined {
        const candidates: Array<{
            context: string;
            element?: string;
            role: "source" | "target";
            startIndex: number;
        }> = [];
        const collect = (rules: FmlStructureMap["groups"][number]["rules"]): void => {
            for (const rule of rules) {
                for (const ruleSource of rule.sources) {
                    if (this.positionTouchesCursor(ruleSource.position, cursorOffset, partialStart)) {
                        candidates.push({...ruleSource, role: "source", startIndex: ruleSource.position!.startIndex});
                    }
                }
                for (const target of rule.targets) {
                    if (target.context && this.positionTouchesCursor(target.position, cursorOffset, partialStart)) {
                        candidates.push({...target, context: target.context, role: "target", startIndex: target.position!.startIndex});
                    }
                }
                collect(rule.dependent?.rules ?? []);
            }
        };
        for (const group of parsed.groups) collect(group.rules);
        candidates.sort((left, right) => right.startIndex - left.startIndex);
        const candidate = candidates[0];
        if (!candidate?.element || !candidate.element.split(".").at(-1)?.startsWith(partial)) {
            return undefined;
        }

        const parts = [candidate.context, ...candidate.element.split(".")];
        parts[parts.length - 1] = FmlPropertyUsageCollector.completionMarker;
        const recovered = this.getRecoveredPropertyUsage(
            parsed,
            source,
            analysis,
            partialStart,
            parts.join("."),
        );
        return recovered?.role === candidate.role ? recovered : undefined;
    }

    private positionTouchesCursor(
        position: import("../../../helpers/fml_models").SourcePosition | undefined,
        cursorOffset: number,
        partialStart: number,
    ): boolean {
        return Boolean(position
            && position.startIndex <= partialStart
            && position.endIndex >= partialStart
            && position.endIndex <= cursorOffset);
    }

    private getRecoveredPropertyUsage(
        parsed: FmlStructureMap,
        source: FmlSource,
        analysis: FmlPropertyAnalysis,
        markerStart: number,
        propertyPath: string | undefined,
    ): Pick<FmlPropertyUsage, "path" | "role" | "rootTypeName" | "fhirVersion"> | undefined {
        if (!propertyPath) {
            return undefined;
        }
        const groups = parsed.groups.filter(group => {
            return group.position
                && group.position.startIndex <= markerStart
                && markerStart <= group.position.endIndex;
        }).sort((left, right) => {
            const leftSize = (left.position?.endIndex ?? 0) - (left.position?.startIndex ?? 0);
            const rightSize = (right.position?.endIndex ?? 0) - (right.position?.startIndex ?? 0);
            return leftSize - rightSize;
        });
        const parts = propertyPath.split(".");
        const parameter = groups[0]?.parameters.find(candidate => candidate.name === parts[0]);
        const aliasUsage = analysis.usages.find(usage => {
            return usage.groupName === groups[0]?.name && usage.variableName === parts[0];
        });
        const rootTypeName = parameter?.type
            ?? aliasUsage?.compatibleTypeNames?.[0]
            ?? aliasUsage?.elementTypeName
            ?? aliasUsage?.possibleTypeNames?.[0];
        if (!rootTypeName) {
            return undefined;
        }

        const structure = parsed.structures.find(candidate => {
            const sameRole = parameter?.mode === "source"
                ? candidate.mode === "source" || candidate.mode === "queried"
                : candidate.mode === "target" || candidate.mode === "produced";
            return sameRole && (candidate.alias === rootTypeName || candidate.resolvedTypeName === rootTypeName);
        });
        const parentParts = parts.slice(1, -1);
        const role = parameter?.mode ?? aliasUsage?.role;
        if (!role) {
            return undefined;
        }
        return {
            path: [...parentParts, FmlPropertyUsageCollector.completionMarker].join("."),
            role,
            rootTypeName: structure?.resolvedTypeName ?? rootTypeName,
            fhirVersion: structure?.fhirVersion
                ?? aliasUsage?.fhirVersion
                ?? (role === "source" ? parsed.sourceModelVersion : parsed.targetModelVersion)
                ?? source.defaultFhirVersion,
        };
    }

    private hasMarkerTransform(rules: FmlStructureMap["groups"][number]["rules"]): boolean {
        return rules.some(rule => {
            return rule.targets.some(target => {
                return target.transform?.type === FmlPropertyUsageCollector.completionMarker
                    || target.transform?.parameters.some(parameter => {
                        return parameter.value === FmlPropertyUsageCollector.completionMarker;
                    });
            })
                || this.hasMarkerTransform(rule.dependent?.rules ?? []);
        });
    }

    private findElement(type: TypeModel | undefined, name: string, lookup: TypeLookup): ElementModel | undefined {
        if (!type) return undefined;
        const direct = type.Elements.find(element => {
            return element.ElementName === name || element.ElementName === `${name}[x]`;
        });
        return direct ?? (type.BaseTypeName ? this.findElement(lookup(type.BaseTypeName), name, lookup) : undefined);
    }

    private getElements(type: TypeModel | undefined, lookup: TypeLookup): ElementModel[] {
        if (!type) return [];
        const inherited = type.BaseTypeName ? this.getElements(lookup(type.BaseTypeName), lookup) : [];
        const ownNames = new Set(type.Elements.map(element => element.ElementName));
        return [...inherited.filter(element => !ownNames.has(element.ElementName)), ...type.Elements];
    }

    private composeLookup(customTypeModels: Record<string, TypeModel>, fallback: TypeLookup): TypeLookup {
        return typeName => customTypeModels[typeName] ?? fallback(typeName);
    }

    private toPropertySpan(sourceText: string, position: DiagramSourcePosition): FmlSourceSpan {
        const clause = sourceText.slice(position.startIndex, position.endIndex);
        const propertyToken = clause.match(/^(?:`[^`]+`|[A-Za-z_][A-Za-z0-9_]*)(?:\.(?:`[^`]+`|[A-Za-z_][A-Za-z0-9_]*))*/)?.[0] ?? "";
        const start = this.positionAt(sourceText, position.startIndex);
        return {
            start,
            end: {line: start.line, column: start.column + Math.max(propertyToken.length, 1)},
        };
    }

    private findVariableSpan(
        sourceText: string,
        position: DiagramSourcePosition,
        variableName: string,
    ): FmlSourceSpan | undefined {
        const clause = sourceText.slice(position.startIndex, position.endIndex);
        const aliases = clause.matchAll(/\bas\s+(`[^`]+`|[A-Za-z_][A-Za-z0-9_]*)/g);
        for (const alias of aliases) {
            const token = alias[1];
            if (token.replace(/^`(.*)`$/, "$1") !== variableName.replace(/^`(.*)`$/, "$1")) continue;
            const tokenOffset = position.startIndex + alias.index + alias[0].lastIndexOf(token);
            return this.toSpan(sourceText, {
                startIndex: tokenOffset,
                endIndex: tokenOffset + token.length,
                startLine: position.startLine,
                startColumn: position.startColumn,
                endLine: position.endLine,
                endColumn: position.endColumn,
            });
        }
        return undefined;
    }

    private findLeadingIdentifierSpan(
        sourceText: string,
        position: DiagramSourcePosition,
    ): FmlSourceSpan | undefined {
        const clause = sourceText.slice(position.startIndex, position.endIndex);
        const token = clause.match(/^\s*(`[^`]+`|[A-Za-z_][A-Za-z0-9_]*)/)?.[1];
        if (!token) return undefined;
        const tokenOffset = position.startIndex + clause.indexOf(token);
        return this.toSpan(sourceText, {
            ...position,
            startIndex: tokenOffset,
            endIndex: tokenOffset + token.length,
        });
    }

    private toSpan(sourceText: string, position: DiagramSourcePosition): FmlSourceSpan {
        return {
            start: this.positionAt(sourceText, position.startIndex),
            end: this.positionAt(sourceText, position.endIndex),
        };
    }

    private positionAt(sourceText: string, offset: number): {line: number; column: number} {
        const prefix = sourceText.slice(0, offset);
        return {
            line: prefix.split(/\r?\n/).length,
            column: offset - (prefix.lastIndexOf("\n") + 1),
        };
    }
}