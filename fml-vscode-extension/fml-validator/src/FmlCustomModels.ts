import type {TypeModel} from "../../../helpers/custom_model";
import type {FhirVersion} from "../../../helpers/fml_models";
import {getModelProvider} from "../../../helpers/fhirpath_validator";
import {
    buildVersion,
    resolveStructureDefinitionTypeName,
    type FhirVersionKey,
} from "../../../scripts/generate-models/build-type-model";
import type {
    SDBundle,
    StructureDefinition,
} from "../../../scripts/generate-models/sd-types";

export type {TypeModel} from "../../../helpers/custom_model";
export {resolveStructureDefinitionTypeName};

export function buildLogicalTypeModels(
    resources: unknown[],
    fhirVersion?: FhirVersion,
): Record<string, TypeModel> {
    const definitions = [...new Map(
        resources.flatMap(logicalStructureDefinitions).map(definition => [definition.url.split("|")[0], definition]),
    ).values()];
    if (definitions.length === 0) {
        return {};
    }
    const bundle: SDBundle = {
        resourceType: "Bundle",
        entry: definitions.map(resource => ({resource})),
    };
    const result = buildVersion(toVersionKey(fhirVersion), [bundle], {
        includeLogical: true,
        skipSelfConsistency: true,
    });
    const definitionsByUrl = new Map(definitions.map(definition => [definition.url.split("|")[0], definition]));
    const cores = (["stu3", "r4", "r4b", "r5", "r6"] as const).map(getModelProvider);
    const syntheticCounts = new Map<string, number>();
    const syntheticIdentities = new Map<string, string>();
    for (const entry of result.entries.filter(entry => entry.synthetic)) {
        syntheticCounts.set(entry.model.TypeName, (syntheticCounts.get(entry.model.TypeName) ?? 0) + 1);
        syntheticIdentities.set(`${entry.url.split("#")[0]}|${entry.model.TypeName}`, entry.url);
    }
    const models: Record<string, TypeModel> = {};
    for (const entry of result.entries) {
        const canonical = entry.url.split("#")[0];
        const definition = definitionsByUrl.get(canonical);
        const baseCanonical = definition?.baseDefinition?.split("|")[0];
        const model: TypeModel = {
            ...entry.model,
            CanonicalUrl: entry.url,
            ...(!entry.synthetic && baseCanonical && definitionsByUrl.has(baseCanonical)
                ? {BaseTypeName: baseCanonical} : {}),
            Elements: entry.model.Elements.map(element => ({
                ...element,
                Type: element.Type.map(type => ({
                    ...type,
                    TypeName: syntheticIdentities.get(`${canonical}|${type.TypeName}`) ?? type.TypeName,
                })),
            })),
            ...(definition?.version ? {Version: definition.version} : {}),
        };
        models[entry.url] = model;
        if (entry.synthetic && syntheticCounts.get(model.TypeName) === 1
            && !cores.some(core => core.lookupByTypeName(model.TypeName))) {
            models[model.TypeName] = model;
        }
    }
    return models;
}

function isLogicalStructureDefinition(value: unknown): value is StructureDefinition {
    if (!value || typeof value !== "object" || Array.isArray(value)) {
        return false;
    }
    const candidate = value as Partial<StructureDefinition>;
    return candidate.resourceType === "StructureDefinition"
        && candidate.kind === "logical"
        && typeof candidate.url === "string"
        && typeof candidate.name === "string";
}

function toVersionKey(version: FhirVersion | undefined): FhirVersionKey {
    switch (version) {
        case "STU3": return "stu3";
        case "R4": return "r4";
        case "R5": return "r5";
        case "R6": return "r6";
        case "R4B":
        default: return "r4b";
    }
}

function logicalStructureDefinitions(value: unknown): StructureDefinition[] {
    if (isLogicalStructureDefinition(value)) {
        return [value];
    }
    if (!value || typeof value !== "object" || Array.isArray(value)) {
        return [];
    }
    const candidate = value as {resourceType?: unknown; entry?: Array<{resource?: unknown}>};
    return candidate.resourceType === "Bundle"
        ? (candidate.entry ?? []).flatMap(entry => logicalStructureDefinitions(entry.resource))
        : [];
}