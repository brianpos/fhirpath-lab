// THIS FILE IS GENERATED — DO NOT EDIT BY HAND.
// Run `npm run generate:models -- --version <r4|r4b|r5|r6>` to regenerate.

import type { TypeModel } from "../../../custom_model";
import { systemTypesByTypeName, systemTypesByUrl } from "../system-types";
import * as primitives from "./primitives";
import * as complexTypes from "./complex-types";
import * as resources from "./resources";

export const byUrl: Readonly<Record<string, TypeModel>> = Object.freeze({
    ...systemTypesByUrl,
    ...primitives.byUrl,
    ...complexTypes.byUrl,
    ...resources.byUrl,
});

export const byTypeName: Readonly<Record<string, TypeModel>> = Object.freeze({
    ...systemTypesByTypeName,
    ...primitives.byTypeName,
    ...complexTypes.byTypeName,
    ...resources.byTypeName,
});

/** Lookup a TypeModel by canonical URL. Returns undefined if absent. */
export function lookupByUrl(url: string): TypeModel | undefined {
    return byUrl[url];
}

/** Lookup a TypeModel by TypeName. Returns undefined if absent. */
export function lookupByTypeName(typeName: string): TypeModel | undefined {
    return byTypeName[typeName];
}
