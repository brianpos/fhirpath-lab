import {getModelTypes, type FhirVersion, type FmlSource, type TypeModel} from "@fhirpath-lab/validator";
import type {Model} from "fhirpath";
import {updateWithGeneratedData} from "fhirpath/fhir-context/general-additions.js";

const cache = new Map<FhirVersion, Model>();

export function labFhirPathModel(version: Exclude<FhirVersion, "DSTU2">, source: FmlSource): Model {
    const custom = Object.entries(source.customTypeModels ?? {});
    if (custom.length === 0) {
        const existing = cache.get(version);
        if (existing) return existing;
    }
    const types = new Map(getModelTypes(version.toLowerCase() as Lowercase<Exclude<FhirVersion, "DSTU2">>)
        .map(model => [model.TypeName, model]));
    custom.forEach(([key, model]) => types.set(key, model));
    const model: Model & {availableTypes?: Set<string>} = {
        version: version.toLowerCase() === "r4b" ? "r4" : version.toLowerCase() as Model["version"],
        type2Parent: {}, path2Type: {}, path2Repeating: {}, pathsDefinedElsewhere: {},
        choiceTypePaths: {}, resourcesWithUrlParam: {}, path2TypeWithoutElements: {}, path2RefType: {},
    };
    const elements = (type: TypeModel, seen = new Set<TypeModel>()): TypeModel["Elements"] => {
        if (seen.has(type)) throw new Error(`Model inheritance cycle at '${type.CanonicalUrl ?? type.TypeName}'.`);
        seen.add(type);
        const base = type.BaseTypeName && types.get(type.BaseTypeName);
        const inherited = base ? elements(base, seen) : [];
        return [...new Map([...inherited, ...type.Elements].map(element => [element.ElementName, element])).values()];
    };
    for (const [typeName, type] of types) {
        if (type.IsPrimitive) continue;
        if (type.BaseTypeName) model.type2Parent[typeName] = type.BaseTypeName;
        else if (typeName !== "Base") model.type2Parent[typeName] = "Base";
        for (const element of elements(type)) {
            const base = element.ElementName.replace(/\[x\]$/, "");
            const path = `${typeName}.${base}`;
            if (base !== element.ElementName) {
                model.choiceTypePaths[path] = element.Type.map(type => type.TypeName[0].toUpperCase() + type.TypeName.slice(1));
                for (const alternative of element.Type) {
                    model.path2Type[path + alternative.TypeName[0].toUpperCase() + alternative.TypeName.slice(1)] = alternative.TypeName;
                }
            } else if (element.Type[0]) {
                model.path2Type[path] = element.Type[0].TypeName;
            }
            if (element.IsArray) model.path2Repeating[path] = true;
            const profiles = element.Type.flatMap(type => type.TargetProfile ?? []);
            if (profiles.length) model.path2RefType[path] = profiles.map(profile => profile.split("/").at(-1) ?? profile);
        }
    }
    const referenceTypes = model.path2RefType;
    updateWithGeneratedData(model);
    model.path2RefType = referenceTypes;
    if (custom.length === 0) cache.set(version, model);
    return model;
}
