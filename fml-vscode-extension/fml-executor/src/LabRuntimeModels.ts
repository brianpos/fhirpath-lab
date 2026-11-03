import {getModelProvider, resolveFmlStructureType, type FhirVersion, type FmlSource, type TypeModel} from "@fhirpath-lab/validator";

export function createTypeLookup(source: FmlSource): (name: string, version: FhirVersion) => TypeModel | undefined {
    const custom = new Map<string, TypeModel>();
    for (const [key, model] of Object.entries(source.customTypeModels ?? {})) {
        // The validator's dictionary keys carry identity; TypeName is not a globally unique alias.
        custom.set(key, model);
        if (model.CanonicalUrl) custom.set(model.CanonicalUrl, model);
    }
    return (name, version) => {
        if (version === "DSTU2") throw new Error("DSTU2 runtime model lookup is not implemented.");
        const core = getModelProvider(version.toLowerCase() as Lowercase<Exclude<FhirVersion, "DSTU2">>);
        return custom.get(name) ?? core.lookupByUrl?.(name) ?? core.lookupByTypeName(resolveFmlStructureType(name) ?? name);
    };
}
