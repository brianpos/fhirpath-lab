import {isFmlParseError, parseFML} from "../../../helpers/fml_parser";
import type {FhirVersion, FmlStructureMap} from "../../../helpers/fml_models";
import {
    extractFmlStructureMapDiagram,
    type DiagramSourcePosition,
    type TypeLookup,
} from "../../../helpers/structuremap_diagram_instance";
import type {ElementModel, TypeModel} from "../../../helpers/custom_model";
import {resolveTransformResultTypes} from "../../../helpers/fml_transform_signatures";
import {lookupByTypeName as lookupByTypeNameR4} from "../../../helpers/models/generated/r4";
import {lookupByTypeName as lookupByTypeNameR4B} from "../../../helpers/models/generated/r4b";
import {lookupByTypeName as lookupByTypeNameR5} from "../../../helpers/models/generated/r5";
import {lookupByTypeName as lookupByTypeNameR6} from "../../../helpers/models/generated/r6";
import {FmlPropertyAnalysis, FmlPropertyCompletion, FmlPropertyUsage, FmlSource, FmlSourceSpan} from "./contracts";

const lookups: Partial<Record<FhirVersion, TypeLookup>> = {
    R4: lookupByTypeNameR4,
    R4B: lookupByTypeNameR4B,
    R5: lookupByTypeNameR5,
    R6: lookupByTypeNameR6,
};

export class FmlPropertyUsageCollector {
    private static readonly completionMarker = "fmlCompletionMarker";

    public collect(source: FmlSource): FmlPropertyUsage[] {
        const parsed = parseFML(source.sourceText);
        if (isFmlParseError(parsed)) {
            return [];
        }

        return this.analyzeModel(parsed, source.sourceText).usages;
    }

    public analyzeModel(parsed: FmlStructureMap, sourceText: string): FmlPropertyAnalysis {

        const diagram = extractFmlStructureMapDiagram(
            parsed,
            lookupByTypeNameR4B,
            false,
            version => version ? lookups[version] : undefined,
        );
        const usages: FmlPropertyUsage[] = [];
        const groupInputs: FmlPropertyAnalysis["groupInputs"] = [];
        const seen = new Set<string>();
        for (const group of diagram.groups) {
            for (const type of [...group.sourceTypes, ...group.targetTypes, ...group.secondaryTargetTypes]) {
                if (type.isComputed) {
                    continue;
                }
                if (type.fmlPosition && !groupInputs.some(input => {
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
                        const key = `${property.role}:${span.start.line}:${span.start.column}:${property.path}`;
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
                        });
                    }
                }
            }
        }
        return {usages, groupInputs};
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
        const beforeCursor = source.sourceText.slice(0, cursorOffset);
        const propertyContext = beforeCursor.match(/(?:`[^`]+`|[A-Za-z_][A-Za-z0-9_]*)(?:\.(?:`[^`]+`|[A-Za-z_][A-Za-z0-9_]*))*\.([A-Za-z_][A-Za-z0-9_]*)?$/);
        if (!propertyContext) {
            return [];
        }
        const partial = propertyContext[1] ?? "";
        const partialStart = cursorOffset - partial.length;
        const modifiedText = source.sourceText.slice(0, partialStart)
            + FmlPropertyUsageCollector.completionMarker
            + source.sourceText.slice(cursorOffset);
        const parsed = parseFML(modifiedText);
        if (isFmlParseError(parsed)) {
            return [];
        }
        const analysis = this.analyzeModel(parsed, modifiedText);
        const markerUsage = analysis.usages.find(usage => {
            return usage.path.split(".").at(-1) === FmlPropertyUsageCollector.completionMarker;
        });
        if (!markerUsage?.rootTypeName) {
            return [];
        }

        const lookup = markerUsage.fhirVersion
            ? lookups[markerUsage.fhirVersion] ?? lookupByTypeNameR4B
            : lookupByTypeNameR4B;
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
                return [];
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
        return [...elements].map(([name, element]) => ({
            name,
            typeNames: element.Type.map(type => type.TypeName),
            cardinalityMin: element.Required ? 1 as const : 0 as const,
            cardinalityMax: element.IsArray ? "*" as const : "1" as const,
            targetProfiles: [...new Set(element.Type.flatMap(type => type.TargetProfile ?? []))],
            fhirVersion: markerUsage.fhirVersion,
        })).sort((left, right) => left.name.localeCompare(right.name));
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

    private toPropertySpan(sourceText: string, position: DiagramSourcePosition): FmlSourceSpan {
        const clause = sourceText.slice(position.startIndex, position.endIndex);
        const propertyToken = clause.match(/^(?:`[^`]+`|[A-Za-z_][A-Za-z0-9_]*)(?:\.(?:`[^`]+`|[A-Za-z_][A-Za-z0-9_]*))*/)?.[0] ?? "";
        const start = this.positionAt(sourceText, position.startIndex);
        return {
            start,
            end: {line: start.line, column: start.column + Math.max(propertyToken.length, 1)},
        };
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