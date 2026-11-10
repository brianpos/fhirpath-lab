import type {FmlBinding} from "./contracts";
import {isObject} from "./values";

interface Entry {
    source: string;
    sourceSystem?: string;
    sourceVersion?: string;
    code?: string;
    system?: string;
    display?: string;
    version?: string;
    negative?: boolean;
    conditional?: boolean;
}

export interface CompiledConceptMap {
    readonly entries: readonly Entry[];
    readonly hasUnmappedPolicy?: boolean;
}

export function compileConceptMap(resource: unknown): CompiledConceptMap {
    if (!isObject(resource) || resource.resourceType !== "ConceptMap" || !Array.isArray(resource.group)) {
        throw new Error("A local ConceptMap must have mapping groups.");
    }
    const entries: Entry[] = [];
    let hasUnmappedPolicy = false;
    for (const group of resource.group) {
        if (!isObject(group) || !Array.isArray(group.element)) throw new Error("Invalid ConceptMap group.");
        hasUnmappedPolicy ||= group.unmapped !== undefined;
        for (const element of group.element) {
            if (!isObject(element) || typeof element.code !== "string") throw new Error("ValueSet-based ConceptMaps require a terminology service.");
            if (element.noMap === true) {
                if (Array.isArray(element.target) && element.target.length) throw new Error("A noMap element cannot also define targets.");
                entries.push({source: element.code, sourceSystem: typeof group.source === "string" ? group.source : undefined, negative: true});
            }
            for (const target of Array.isArray(element.target) ? element.target : []) {
                if (!isObject(target)) throw new Error("Invalid ConceptMap target.");
                const negative = ["unmatched", "disjoint"].includes(String(target.equivalence)) || target.relationship === "not-related-to";
                if (!negative && typeof target.code !== "string") throw new Error("ValueSet-based ConceptMaps require a terminology service.");
                if (target.dependsOn !== undefined && !Array.isArray(target.dependsOn)
                    || target.product !== undefined && !Array.isArray(target.product)) throw new Error("Invalid ConceptMap condition/product.");
                entries.push({
                    source: element.code, sourceSystem: typeof group.source === "string" ? group.source : undefined,
                    sourceVersion: typeof group.sourceVersion === "string" ? group.sourceVersion : undefined,
                    code: typeof target.code === "string" ? target.code : undefined,
                    system: typeof group.target === "string" ? group.target : undefined,
                    display: typeof target.display === "string" ? target.display : undefined,
                    version: typeof group.targetVersion === "string" ? group.targetVersion : undefined,
                    negative, conditional: Array.isArray(target.dependsOn) && target.dependsOn.length > 0
                        || Array.isArray(target.product) && target.product.length > 0,
                });
            }
        }
    }
    return {entries, hasUnmappedPolicy};
}

export function translateConceptMap(map: CompiledConceptMap, source: FmlBinding, output: string): FmlBinding[] {
    const input = source.value;
    const codings = isObject(input) ? Array.isArray(input.coding) ? input.coding : [input] : [{code: input}];
    const values: Record<string, unknown>[] = [];
    for (const coding of codings) {
        if (!isObject(coding)) throw new Error("translate requires code or coded values.");
        if (coding.code === undefined) continue;
        if (typeof coding.code !== "string") throw new Error("translate requires a string code.");
        const matches = map.entries.filter(entry => entry.source === coding.code
            && (!coding.system || !entry.sourceSystem || entry.sourceSystem === coding.system)
            && (!coding.version || !entry.sourceVersion || entry.sourceVersion === coding.version));
        if (!matches.length && map.hasUnmappedPolicy) throw new Error("ConceptMap unmapped policies require a terminology service.");
        for (const match of matches) {
            if (match.negative) continue;
            if (match.conditional) throw new Error("Conditional ConceptMap mappings require a terminology service.");
            values.push({...(match.system ? {system: match.system} : {}), code: match.code,
                ...(match.version ? {version: match.version} : {}),
                ...(match.display ? {display: match.display} : {})});
        }
    }
    return conceptMapBindings(values, output);
}

export function conceptMapBindings(codings: readonly Record<string, unknown>[], output: string): FmlBinding[] {
    const results = output === "CodeableConcept" ? codings.length ? [{coding: codings}] : []
        : output === "Coding" ? codings : ["code", "system", "display"].includes(output)
            ? codings.map(coding => coding[output]).filter(value => value !== undefined)
            : (() => { throw new Error(`Invalid translate output type '${output}'.`); })();
    return results.map(value => ({name: "translated", value, typeName: output === "system" ? "uri" : output === "display" ? "string" : output}));
}
