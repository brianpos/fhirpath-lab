// Pass 5 — emit. Serialise TypeModel entries to per-category TS modules and a per-version index.ts.
//
// Output layout:
//   helpers/models/generated/<version>/
//     resources.ts
//     complex-types.ts
//     primitives.ts
//     backbones.ts
//     index.ts
//
// See docs/custom-model-generator-plan.md "Output layout" and "Pass 5 — emit".

import * as fs from "fs";
import * as path from "path";
import type { ElementModel, ElementTypeModel, TypeModel } from "../../helpers/custom_model";
import type { BuildResult, FhirVersionKey, TypeModelEntry } from "./build-type-model";

const HEADER = `// THIS FILE IS GENERATED — DO NOT EDIT BY HAND.
// Run \`npm run generate:models -- --version <r4|r4b|r5|r6>\` to regenerate.
// See docs/custom-model-generator-plan.md.

import type { TypeModel } from "../../../custom_model";
`;

function isValidIdentifier(s: string): boolean {
    return /^[A-Za-z_][A-Za-z0-9_]*$/.test(s);
}

function jsString(s: string): string {
    return JSON.stringify(s);
}

function emitElementType(t: ElementTypeModel): string {
    const parts: string[] = [`TypeName: ${jsString(t.TypeName)}`];
    if (t.TargetProfile && t.TargetProfile.length > 0) {
        parts.push(`TargetProfile: [${t.TargetProfile.map(jsString).join(", ")}]`);
    }
    return `{ ${parts.join(", ")} }`;
}

function emitElement(e: ElementModel): string {
    const parts: string[] = [`ElementName: ${jsString(e.ElementName)}`];
    parts.push(`Type: [${e.Type.map(emitElementType).join(", ")}]`);
    if (e.IsArray) parts.push(`IsArray: true`);
    if (e.Required) parts.push(`Required: true`);
    return `        { ${parts.join(", ")} }`;
}

function emitTypeModel(varName: string, m: TypeModel): string {
    const lines: string[] = [];
    lines.push(`export const ${varName}: TypeModel = {`);
    lines.push(`    TypeName: ${jsString(m.TypeName)},`);
    if (m.BaseTypeName) lines.push(`    BaseTypeName: ${jsString(m.BaseTypeName)},`);
    if (m.IsPrimitive) lines.push(`    IsPrimitive: true,`);
    if (m.Elements.length === 0) {
        lines.push(`    Elements: [],`);
    } else {
        lines.push(`    Elements: [`);
        for (const el of m.Elements) {
            lines.push(`${emitElement(el)},`);
        }
        lines.push(`    ],`);
    }
    lines.push(`};`);
    return lines.join("\n");
}

/** Map a TypeName to a JS identifier suitable for `export const`. */
function varNameFor(typeName: string): string {
    if (isValidIdentifier(typeName)) return typeName;
    // Replace invalid chars (e.g. dots in System.String, brackets in value[x]) with underscores.
    return typeName.replace(/[^A-Za-z0-9_]/g, "_");
}

interface CategoryGroup {
    file: string;
    title: string;
    entries: TypeModelEntry[];
}

function groupByCategory(entries: TypeModelEntry[]): CategoryGroup[] {
    const groups: Record<string, TypeModelEntry[]> = {
        "primitives.ts": [],
        "complex-types.ts": [],
        "resources.ts": [],
        "backbones.ts": [],
    };
    for (const e of entries) {
        if (e.kind === "primitive-type") groups["primitives.ts"].push(e);
        else if (e.kind === "complex-type") groups["complex-types.ts"].push(e);
        else if (e.kind === "resource") groups["resources.ts"].push(e);
        else if (e.kind === "backbone") groups["backbones.ts"].push(e);
    }
    return [
        { file: "primitives.ts", title: "FHIR primitive type containers", entries: groups["primitives.ts"] },
        { file: "complex-types.ts", title: "FHIR complex types", entries: groups["complex-types.ts"] },
        { file: "resources.ts", title: "FHIR resources", entries: groups["resources.ts"] },
        { file: "backbones.ts", title: "Synthetic backbone / nested-element types", entries: groups["backbones.ts"] },
    ];
}

function sortEntries(entries: TypeModelEntry[]): TypeModelEntry[] {
    // Sort by canonical URL for deterministic, review-friendly output.
    return [...entries].sort((a, b) => (a.url < b.url ? -1 : a.url > b.url ? 1 : 0));
}

function emitCategoryFile(group: CategoryGroup): string {
    const out: string[] = [];
    out.push(HEADER);
    out.push(`// ${group.title}`);
    out.push("");
    const sorted = sortEntries(group.entries);
    const seen = new Set<string>();
    const exportedNames: { name: string; entry: TypeModelEntry }[] = [];
    for (const e of sorted) {
        let v = varNameFor(e.model.TypeName);
        // Disambiguate any collisions deterministically.
        let suffix = 0;
        while (seen.has(v)) {
            suffix++;
            v = `${varNameFor(e.model.TypeName)}_${suffix}`;
        }
        seen.add(v);
        exportedNames.push({ name: v, entry: e });
        out.push(emitTypeModel(v, e.model));
        out.push("");
    }
    // byUrl / byTypeName sub-indexes for this category.
    out.push(`export const byUrl: Readonly<Record<string, TypeModel>> = Object.freeze({`);
    for (const { name, entry } of exportedNames) {
        out.push(`    ${jsString(entry.url)}: ${name},`);
    }
    out.push(`});`);
    out.push("");
    out.push(`export const byTypeName: Readonly<Record<string, TypeModel>> = Object.freeze({`);
    for (const { name, entry } of exportedNames) {
        out.push(`    ${jsString(entry.model.TypeName)}: ${name},`);
    }
    out.push(`});`);
    out.push("");
    return out.join("\n");
}

function emitIndexFile(): string {
    return `// THIS FILE IS GENERATED — DO NOT EDIT BY HAND.
// Run \`npm run generate:models -- --version <r4|r4b|r5|r6>\` to regenerate.

import type { TypeModel } from "../../../custom_model";
import { systemTypesByTypeName, systemTypesByUrl } from "../system-types";
import * as primitives from "./primitives";
import * as complexTypes from "./complex-types";
import * as resources from "./resources";
import * as backbones from "./backbones";

export const byUrl: Readonly<Record<string, TypeModel>> = Object.freeze({
    ...systemTypesByUrl,
    ...primitives.byUrl,
    ...complexTypes.byUrl,
    ...resources.byUrl,
    ...backbones.byUrl,
});

export const byTypeName: Readonly<Record<string, TypeModel>> = Object.freeze({
    ...systemTypesByTypeName,
    ...primitives.byTypeName,
    ...complexTypes.byTypeName,
    ...resources.byTypeName,
    ...backbones.byTypeName,
});

/** Lookup a TypeModel by canonical URL. Returns undefined if absent. */
export function lookupByUrl(url: string): TypeModel | undefined {
    return byUrl[url];
}

/** Lookup a TypeModel by TypeName. Returns undefined if absent. */
export function lookupByTypeName(typeName: string): TypeModel | undefined {
    return byTypeName[typeName];
}
`;
}

export interface EmitOptions {
    /** Root output directory; defaults to <repo>/helpers/models/generated/<version>/ */
    outDir?: string;
}

export function emit(result: BuildResult, opts: EmitOptions = {}): string[] {
    const outDir = opts.outDir ?? path.resolve(__dirname, "..", "..", "helpers", "models", "generated", result.version);
    fs.mkdirSync(outDir, { recursive: true });
    const written: string[] = [];

    const groups = groupByCategory(result.entries);
    for (const g of groups) {
        const content = emitCategoryFile(g);
        const file = path.join(outDir, g.file);
        fs.writeFileSync(file, content, "utf8");
        written.push(file);
    }
    const indexFile = path.join(outDir, "index.ts");
    fs.writeFileSync(indexFile, emitIndexFile(), "utf8");
    written.push(indexFile);
    return written;
}

/** In-memory variant for tests: returns { fileName -> content } without writing to disk. */
export function emitInMemory(result: BuildResult): Record<string, string> {
    const out: Record<string, string> = {};
    for (const g of groupByCategory(result.entries)) {
        out[g.file] = emitCategoryFile(g);
    }
    out["index.ts"] = emitIndexFile();
    return out;
}
