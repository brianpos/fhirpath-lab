// Hand-authored data that augments the spec JSON so the validator can reason about
// things the spec doesn't formally enumerate (and a few special-case functions
// whose return-type semantics aren't expressible in `typeMapping` strings alone).

import { SYSTEM_TYPE_NAMES } from "./index";

/** Implicit conversion graph. Source → set of destination System type names that
 *  the source can be implicitly converted to (per FHIRPath §3.3 "Conversion"). */
export const IMPLICIT_CONVERSIONS: Readonly<Record<string, ReadonlySet<string>>> = Object.freeze({
    Integer: new Set(["Long", "Decimal", "Quantity"]),
    Long: new Set(["Decimal", "Quantity"]),
    Decimal: new Set(["Quantity"]),
    Date: new Set(["DateTime"]),
});

/** True if a value of `from` can be used where `to` is expected (same type or
 *  implicit conversion). Both names must be System type names. */
export function isAssignable(from: string, to: string): boolean {
    if (from === to) return true;
    if (to === "Any") return true;
    const set = IMPLICIT_CONVERSIONS[from];
    return set ? set.has(to) : false;
}

/** True if any of the `from` types is assignable to `to`. */
export function anyAssignable(from: ReadonlyArray<string>, to: string): boolean {
    return from.some((f) => isAssignable(f, to));
}

/** Built-in environment variables provided by the FHIRPath specification and
 *  the FHIR fhirpath.html bindings (which the lab ships pre-populated). */
export interface EnvVarDef {
    name: string;
    /** If non-empty, the variable is *always* of this concrete type regardless
     *  of context (e.g. `%ucum` is always a String constant). */
    fixedType?: string;
    /** Free-form description for tooling tooltips. */
    description?: string;
    /** True if the variable's value depends on the evaluation context (resource,
     *  rootResource, context, %vars defined in defineVariable() ...). */
    contextDependent?: boolean;
}

export const BUILTIN_ENV_VARS: ReadonlyArray<EnvVarDef> = Object.freeze([
    { name: "ucum", fixedType: "String", description: "UCUM code system URL constant." },
    { name: "loinc", fixedType: "String", description: "LOINC code system URL constant." },
    { name: "sct", fixedType: "String", description: "SNOMED CT code system URL constant." },
    { name: "context", contextDependent: true, description: "The evaluation context resource/element." },
    { name: "resource", contextDependent: true, description: "The current resource." },
    { name: "rootResource", contextDependent: true, description: "The container resource." },
    { name: "terminologies", contextDependent: true, description: "Terminologies service handle (FHIR)." },
]);

export const BUILTIN_ENV_VARS_BY_NAME: Readonly<Record<string, EnvVarDef>> = Object.freeze(
    BUILTIN_ENV_VARS.reduce((acc, v) => {
        acc[v.name] = v;
        return acc;
    }, {} as Record<string, EnvVarDef>),
);

/** Names of functions whose effective return type is "same as input collection
 *  (filtered)". The visitor short-circuits these and propagates the input type. */
export const FILTERING_FUNCTIONS: ReadonlySet<string> = new Set([
    "where",
    "first",
    "last",
    "tail",
    "skip",
    "take",
    "single",
    "distinct",
    "intersect",
    "exclude",
    "union",
    "combine",
    "sort",
]);

/** Functions whose result type is the same as the input type (passthrough),
 *  but cardinality stays a collection. */
export const SAME_TYPE_COLLECTION_FUNCTIONS: ReadonlySet<string> = new Set([
    "where",
    "tail",
    "skip",
    "take",
    "distinct",
    "intersect",
    "exclude",
    "union",
    "combine",
    "sort",
    "repeat",
    "repeatAll",
]);

/** Functions whose result is the same as the input type but a single value. */
export const SAME_TYPE_SINGLE_FUNCTIONS: ReadonlySet<string> = new Set([
    "first",
    "last",
    "single",
]);

/** Functions where the second-and-subsequent arguments are evaluated lazily in
 *  the scope of *each* element of the input collection (i.e. the argument's
 *  `$this` is each input item, not the whole collection). */
export const LAMBDA_ARG_FUNCTIONS: ReadonlySet<string> = new Set([
    "where",
    "select",
    "all",
    "exists",
    "repeat",
    "repeatAll",
    "aggregate",
    "iif",
    "trace",
    "sort",
    "defineVariable",
]);

/** True if `name` is the name of a System.* primitive type (per the spec). */
export function isSystemType(name: string): boolean {
    return SYSTEM_TYPE_NAMES.has(name);
}
