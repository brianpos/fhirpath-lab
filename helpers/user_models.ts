/**
 * Build an isolated TypeLookup from user-supplied StructureDefinition content.
 *
 * Used by the FML diagram views to resolve types referenced in a map against
 * logical (or other) StructureDefinitions the user has pasted into the Models
 * tab, without merging those definitions into the built-in per-version
 * dictionary (`helpers/models/generated/<version>`).
 *
 * The same SD -> TypeModel transformation logic that drives the static code
 * generator (`scripts/generate-models/build-type-model.ts`) is reused so the
 * runtime view of the model matches the compiled view byte-for-byte. The only
 * difference is that we opt in to processing `kind: "logical"` definitions
 * (the static generator skips them).
 */
import type { TypeModel } from "./custom_model";
import { buildVersion, type FhirVersionKey } from "../scripts/generate-models/build-type-model";
import type { SDBundle, StructureDefinition } from "../scripts/generate-models/sd-types";

/** Function signature accepted by the diagram generators. */
export type TypeLookup = (typeName: string) => TypeModel | undefined;

export interface UserModelLookup {
    /** Lookup function that only sees the user's models — never blends with the
     *  built-in dictionaries. */
    lookup: TypeLookup;
    /** TypeNames the user supplied (sorted, deterministic). Useful for debugging
     *  and for surfacing to the UI. */
    typeNames: string[];
}

/** Coerce arbitrary parsed JSON into a Bundle whose `entry[].resource` are
 *  StructureDefinitions. Returns undefined if the input doesn't look like a
 *  Bundle of SDs or a single SD. */
function toBundle(parsed: unknown): SDBundle | undefined {
    if (!parsed || typeof parsed !== "object") return undefined;
    const obj = parsed as { resourceType?: string };
    if (obj.resourceType === "Bundle") {
        // Trust the SDBundle shape; non-SD entries are filtered by buildVersion.
        return parsed as SDBundle;
    }
    if (obj.resourceType === "StructureDefinition") {
        return {
            resourceType: "Bundle",
            entry: [{ resource: parsed as StructureDefinition }],
        };
    }
    return undefined;
}

/**
 * Parse the Models-tab text and build an isolated lookup. Returns undefined
 * when the input is empty/blank, not valid JSON, or not a Bundle/SD shape.
 *
 * @param modelsText  Raw JSON string from the Models tab.
 * @param version     FHIR version key. Affects nothing except the version tag
 *                    on entries — the lookup itself is just keyed by TypeName.
 *                    Defaults to "r4b" to match the page's other diagram calls.
 */
export function buildUserModelLookup(
    modelsText: string | undefined,
    version: FhirVersionKey = "r4b"
): UserModelLookup | undefined {
    if (!modelsText) return undefined;
    const trimmed = modelsText.trim();
    if (trimmed.length === 0) return undefined;

    let parsed: unknown;
    try {
        parsed = JSON.parse(trimmed);
    } catch {
        return undefined;
    }

    const bundle = toBundle(parsed);
    if (!bundle) return undefined;

    let result;
    try {
        // skipSelfConsistency: user-supplied content commonly references types
        // (e.g. core FHIR primitives) that are NOT in the user-only dictionary;
        // self-consistency would throw on those dangling refs even though they
        // resolve fine when the lookup is layered over the built-in dictionary.
        // includeLogical: the whole point of this helper is to also accept
        // `kind: "logical"` StructureDefinitions, which the static generator skips.
        result = buildVersion(version, [bundle], {
            skipSelfConsistency: true,
            includeLogical: true,
        });
    } catch {
        return undefined;
    }

    const byTypeName = new Map<string, TypeModel>();
    for (const e of result.entries) {
        // First-write-wins, mirroring the static dictionary's collision behaviour.
        if (!byTypeName.has(e.model.TypeName)) {
            byTypeName.set(e.model.TypeName, e.model);
        }
    }

    if (byTypeName.size === 0) return undefined;

    const typeNames = Array.from(byTypeName.keys()).sort();
    return {
        lookup: (typeName: string) => byTypeName.get(typeName),
        typeNames,
    };
}

/**
 * Compose a primary lookup (e.g. from `buildUserModelLookup`) with a fallback
 * lookup (e.g. the built-in `lookupByTypeName` for r4b) so the user's models
 * take precedence but the static dictionary is never mutated.
 */
export function composeLookups(
    primary: TypeLookup | undefined,
    fallback: TypeLookup
): TypeLookup {
    if (!primary) return fallback;
    return (typeName: string) => primary(typeName) ?? fallback(typeName);
}
