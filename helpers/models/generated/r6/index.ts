// THIS FILE IS GENERATED — DO NOT EDIT BY HAND.
// Run `npm run generate:models -- --version <r4|r4b|r5|r6>` to regenerate.
// See docs/custom-model-generator-plan.md.

import type { TypeModel } from "../../../custom_model";
import { byUrl, byTypeName } from "./dictionary";

export { byUrl, byTypeName };

/** Lookup a TypeModel by canonical URL. Returns undefined if absent. */
export function lookupByUrl(url: string): TypeModel | undefined {
    return byUrl[url];
}

/** Lookup a TypeModel by TypeName. Returns undefined if absent. */
export function lookupByTypeName(typeName: string): TypeModel | undefined {
    return byTypeName[typeName];
}
