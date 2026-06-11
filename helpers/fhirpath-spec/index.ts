// Loader / accessor for the FHIRPath spec data emitted under ./generated/.
//
// The generated JSON files are imported and indexed by name. Everything is
// frozen at module load so consumers can rely on the dictionaries being
// immutable (and use them as WeakMap keys for derived caches).

import type {
    FunctionDef,
    FunctionArgumentDef,
    OperationDef,
    TypeSignature,
} from "./types";

import functionsJson from "./generated/functions.json";
import operationsJson from "./generated/operations.json";

// Raw JSON shape (mirrors the spec's authoring format).
interface RawFunction {
    functionName: string;
    sectionNumber?: string;
    description?: string;
    arguments?: Array<{ name: string; type: string; description?: string; optional?: boolean; variableArgs?: boolean }>;
    returnType: string;
    emptyInputResult?: string;
    errorOnMultipleInput?: boolean;
    inputTypes?: string[];
    typeMapping?: string[];
    exampleOfUse?: string;
}
interface RawOperation {
    operationName: string;
    sectionNumber?: string;
    description?: string;
    leftArgument: string;
    rightArgument: string;
    returnType: string;
    emptyInputResult?: string;
    errorOnMultipleInput?: boolean;
    typeMapping?: string[];
}
interface RawCategory<T> {
    name: string;
    sectionNumber?: string;
    functions?: T[];
    operations?: T[];
}
interface RawDoc<T> {
    categories: RawCategory<T>[];
}

function deepFreeze<T>(o: T): T {
    if (o && typeof o === "object" && !Object.isFrozen(o)) {
        Object.freeze(o);
        for (const k of Object.keys(o)) {
            deepFreeze((o as Record<string, unknown>)[k]);
        }
    }
    return o;
}

function loadFunctions(): { all: FunctionDef[]; byName: Record<string, FunctionDef> } {
    const doc = functionsJson as unknown as RawDoc<RawFunction>;
    const all: FunctionDef[] = [];
    const byName: Record<string, FunctionDef> = Object.create(null);
    for (const cat of doc.categories ?? []) {
        for (const f of cat.functions ?? []) {
            const args: FunctionArgumentDef[] = (f.arguments ?? []).map((a) => ({
                name: a.name,
                type: a.type,
                description: a.description,
                optional: a.optional,
                variableArgs: a.variableArgs,
            }));
            const def: FunctionDef = {
                category: cat.name,
                functionName: f.functionName,
                sectionNumber: f.sectionNumber,
                description: f.description,
                arguments: args,
                returnType: f.returnType,
                emptyInputResult: f.emptyInputResult,
                errorOnMultipleInput: f.errorOnMultipleInput ?? false,
                inputTypes: (f.inputTypes ?? []).slice(),
                typeMapping: (f.typeMapping ?? []).slice(),
                exampleOfUse: f.exampleOfUse,
            };
            all.push(def);
            // The spec has a small number of duplicate names across categories
            // (e.g. `is`/`as` appear both as operators and as functions). When
            // duplicates appear in functions.json itself (none today) we keep
            // the first occurrence so behaviour is deterministic.
            if (!(def.functionName in byName)) {
                byName[def.functionName] = def;
            }
        }
    }
    return { all: deepFreeze(all), byName: deepFreeze(byName) };
}

function loadOperations(): { all: OperationDef[]; byName: Record<string, OperationDef[]> } {
    const doc = operationsJson as unknown as RawDoc<RawOperation>;
    const all: OperationDef[] = [];
    const byName: Record<string, OperationDef[]> = Object.create(null);
    for (const cat of doc.categories ?? []) {
        for (const o of cat.operations ?? []) {
            const def: OperationDef = {
                category: cat.name,
                operationName: o.operationName,
                sectionNumber: o.sectionNumber,
                description: o.description,
                leftArgument: o.leftArgument,
                rightArgument: o.rightArgument,
                returnType: o.returnType,
                emptyInputResult: o.emptyInputResult,
                errorOnMultipleInput: o.errorOnMultipleInput ?? false,
                typeMapping: (o.typeMapping ?? []).slice(),
            };
            all.push(def);
            // `+`, `-` etc. appear under both Math and Unary Operators — keep
            // every overload so the visitor can pick the matching one.
            (byName[def.operationName] ||= []).push(def);
        }
    }
    return { all: deepFreeze(all), byName: deepFreeze(byName) };
}

const fns = loadFunctions();
const ops = loadOperations();

/** Every function definition from the spec, in source order. */
export const functions: ReadonlyArray<FunctionDef> = fns.all;
/** Functions indexed by name (first-wins on duplicates). */
export const functionsByName: Readonly<Record<string, FunctionDef>> = fns.byName;

/** Every operation definition from the spec, in source order (overloads kept). */
export const operations: ReadonlyArray<OperationDef> = ops.all;
/** Operations grouped by name. Each list contains every spec overload of that name. */
export const operationsByName: Readonly<Record<string, ReadonlyArray<OperationDef>>> = ops.byName;

/** Decode a "Left-Right" typeMapping entry. */
export function decodeTypeMapping(entry: string): TypeSignature | undefined {
    const dash = entry.indexOf("-");
    if (dash <= 0 || dash === entry.length - 1) return undefined;
    return { left: entry.substring(0, dash), right: entry.substring(dash + 1) };
}

/** Split a pipe-delimited type union ("Integer | Decimal | Quantity") into its parts. */
export function splitTypeUnion(value: string): string[] {
    return value
        .split("|")
        .map((p) => p.trim())
        .filter((p) => p.length > 0);
}

/** Return true if `name` (e.g. "Integer") is one of the System.* primitive type names
 *  the spec uses in functions.json / operations.json. */
export const SYSTEM_TYPE_NAMES: ReadonlySet<string> = new Set([
    "Boolean",
    "Integer",
    "Long",
    "Decimal",
    "String",
    "Date",
    "DateTime",
    "Time",
    "Quantity",
]);

export function isSpecSystemType(name: string): boolean {
    return SYSTEM_TYPE_NAMES.has(name);
}
