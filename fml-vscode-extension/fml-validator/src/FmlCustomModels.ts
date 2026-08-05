import type {TypeModel} from "../../../helpers/custom_model";
import type {FhirVersion} from "../../../helpers/fml_models";
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
    const models: Record<string, TypeModel> = {};
    for (const entry of result.entries) {
        const definition = definitionsByUrl.get(entry.url.split("#")[0]);
        const model: TypeModel = {
            ...entry.model,
            CanonicalUrl: entry.url,
            ...(definition?.version ? {Version: definition.version} : {}),
        };
        models[entry.synthetic ? model.TypeName : entry.url] = model;
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