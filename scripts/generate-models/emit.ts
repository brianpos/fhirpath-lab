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
import { systemTypesByTypeName, systemTypesByUrl } from "../../helpers/models/generated/system-types";
import type { BuildResult, TypeModelEntry } from "./build-type-model";

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

/** Group entries into category buckets. Synthetic backbones are routed to the same
 *  bucket as their root parent (a resource or complex-type), and emitted *immediately
 *  after* their parent to keep related types co-located in the file. */
function groupByCategory(entries: TypeModelEntry[]): CategoryGroup[] {
    const primitives: TypeModelEntry[] = [];
    const complexTypes: TypeModelEntry[] = [];
    const resources: TypeModelEntry[] = [];

    // First pass: collect non-backbone entries by category, plus an index of
    // backbones grouped by their root TypeName.
    const backbonesByRoot = new Map<string, TypeModelEntry[]>();
    for (const e of entries) {
        if (e.kind === "primitive-type") primitives.push(e);
        else if (e.kind === "complex-type") complexTypes.push(e);
        else if (e.kind === "resource") resources.push(e);
        else if (e.kind === "backbone") {
            const root = e.rootTypeName ?? "";
            const list = backbonesByRoot.get(root) ?? [];
            list.push(e);
            backbonesByRoot.set(root, list);
        }
    }

    // Backbones encountered in their parent's differential preserve original order.
    for (const list of backbonesByRoot.values()) {
        list.sort((a, b) => (a.rootOrder ?? 0) - (b.rootOrder ?? 0));
    }

    // Second pass: for each top-level category list, sort by canonical URL and
    // splice each entry's backbones in directly after the parent.
    function intersperse(list: TypeModelEntry[]): TypeModelEntry[] {
        const sorted = [...list].sort((a, b) => (a.url < b.url ? -1 : a.url > b.url ? 1 : 0));
        const out: TypeModelEntry[] = [];
        for (const e of sorted) {
            out.push(e);
            const bbs = backbonesByRoot.get(e.model.TypeName);
            if (bbs && bbs.length > 0) out.push(...bbs);
        }
        return out;
    }

    return [
        { file: "primitives.ts", title: "FHIR primitive type containers", entries: intersperse(primitives) },
        { file: "complex-types.ts", title: "FHIR complex types (with their backbone elements)", entries: intersperse(complexTypes) },
        { file: "resources.ts", title: "FHIR resources (with their backbone elements)", entries: intersperse(resources) },
    ];
}

/** Pre-sorted by groupByCategory; returned as-is here so the emitter can call this
 *  on already-grouped input without double-sorting. */
function sortEntries(entries: TypeModelEntry[]): TypeModelEntry[] {
    return entries;
}

function emitCategoryFile(group: CategoryGroup, exported: { name: string; entry: TypeModelEntry }[]): string {
    const out: string[] = [];
    out.push(HEADER);
    out.push(`// ${group.title}`);
    out.push("");
    const sorted = sortEntries(group.entries);
    const seen = new Set<string>();
    for (const e of sorted) {
        let v = varNameFor(e.model.TypeName);
        // Disambiguate any collisions deterministically.
        let suffix = 0;
        while (seen.has(v)) {
            suffix++;
            v = `${varNameFor(e.model.TypeName)}_${suffix}`;
        }
        seen.add(v);
        exported.push({ name: v, entry: e });
        out.push(emitTypeModel(v, e.model));
        out.push("");
    }
    return out.join("\n");
}

/** Build the dedicated dictionary file. Imports every TypeModel const from the
 *  per-category files and assembles the combined `byUrl` / `byTypeName` indexes
 *  (with shared `System.*` spread in). */
function emitDictionaryFile(allExports: { categoryFile: string; name: string; entry: TypeModelEntry }[]): string {
    const byCategory = new Map<string, string[]>();
    for (const e of allExports) {
        const list = byCategory.get(e.categoryFile) ?? [];
        list.push(e.name);
        byCategory.set(e.categoryFile, list);
    }
    const out: string[] = [];
    out.push(`// THIS FILE IS GENERATED — DO NOT EDIT BY HAND.`);
    out.push(`// Run \`npm run generate:models -- --version <r4|r4b|r5|r6>\` to regenerate.`);
    out.push(`// See docs/custom-model-generator-plan.md.`);
    out.push("");
    out.push(`import type { TypeModel } from "../../../custom_model";`);
    out.push(`import { systemTypesByTypeName, systemTypesByUrl } from "../system-types";`);
    for (const [file, names] of byCategory) {
        const moduleName = file.replace(/\.ts$/, "");
        out.push(`import { ${names.join(", ")} } from ${jsString("./" + moduleName)};`);
    }
    out.push("");
    out.push(`export const byUrl: Readonly<Record<string, TypeModel>> = Object.freeze({`);
    out.push(`    ...systemTypesByUrl,`);
    for (const e of allExports) {
        out.push(`    ${jsString(e.entry.url)}: ${e.name},`);
    }
    out.push(`});`);
    out.push("");
    out.push(`export const byTypeName: Readonly<Record<string, TypeModel>> = Object.freeze({`);
    out.push(`    ...systemTypesByTypeName,`);
    for (const e of allExports) {
        out.push(`    ${jsString(e.entry.model.TypeName)}: ${e.name},`);
    }
    out.push(`});`);
    out.push("");
    return out.join("\n");
}

/** The per-version `index.ts` is the public surface — it re-exports the dictionary
 *  and the lookup helpers. Keeps the dictionary's churn-prone bulk in its own file. */
function emitIndexFile(): string {
    return `// THIS FILE IS GENERATED — DO NOT EDIT BY HAND.
// Run \`npm run generate:models -- --version <r4|r4b|r5|r6>\` to regenerate.
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
    const allExports: { categoryFile: string; name: string; entry: TypeModelEntry }[] = [];
    for (const g of groups) {
        const exported: { name: string; entry: TypeModelEntry }[] = [];
        const content = emitCategoryFile(g, exported);
        const file = path.join(outDir, g.file);
        fs.writeFileSync(file, content, "utf8");
        written.push(file);
        for (const e of exported) allExports.push({ categoryFile: g.file, ...e });
    }
    const dictFile = path.join(outDir, "dictionary.ts");
    fs.writeFileSync(dictFile, emitDictionaryFile(allExports), "utf8");
    written.push(dictFile);
    const indexFile = path.join(outDir, "index.ts");
    fs.writeFileSync(indexFile, emitIndexFile(), "utf8");
    written.push(indexFile);

    // Stage-2 preview: also emit JSON files. No loading code consumes these yet —
    // they exist purely to gauge file sizes for the future lazy-loaded design.
    written.push(...emitJsonFiles(result, outDir));
    return written;
}

/** Emit JSON files under `<outDir>/models/`:
 *   - `foundation.json` — every primitive + complex-type TypeModel (and their
 *     synthetic backbones), keyed by TypeName. These are small, ubiquitous, and
 *     overwhelmingly co-accessed, so collapsing them into one file is cheaper
 *     than chasing per-type fetches.
 *   - `<ResourceName>.json` — one file per resource, carrying the resource itself
 *     plus its synthetic backbones, keyed by TypeName.
 *   - `index.json` — `byUrl` / `byTypeName` mapping canonical URL → filename
 *     (empty string for inlined `System.*`), plus the inlined `System.*` map. */
function emitJsonFiles(result: BuildResult, outDir: string): string[] {
    const modelsDir = path.join(outDir, "models");
    fs.mkdirSync(modelsDir, { recursive: true });
    const written: string[] = [];

    // Group entries by their root type — top-level types own themselves; backbones
    // attach to their `rootTypeName`.
    const groupsByRoot = new Map<string, TypeModelEntry[]>();
    for (const e of result.entries) {
        const root = e.kind === "backbone" ? (e.rootTypeName ?? e.model.TypeName) : e.model.TypeName;
        const list = groupsByRoot.get(root) ?? [];
        list.push(e);
        groupsByRoot.set(root, list);
    }
    // Within each group, list the parent first then its backbones in encounter order.
    for (const [, list] of groupsByRoot) {
        list.sort((a, b) => {
            const ak = a.kind === "backbone" ? 1 : 0;
            const bk = b.kind === "backbone" ? 1 : 0;
            if (ak !== bk) return ak - bk;
            return (a.rootOrder ?? 0) - (b.rootOrder ?? 0);
        });
    }

    const indexByUrl: Record<string, string> = {};
    const indexByTypeName: Record<string, string> = {};

    // Foundation bucket: all primitives + complex-types (and their backbones).
    const foundationBody: Record<string, TypeModel> = {};
    const FOUNDATION_FILE = "foundation.json";

    const rootNames = [...groupsByRoot.keys()].sort();
    for (const root of rootNames) {
        const entries = groupsByRoot.get(root)!;
        // Find the parent entry (the non-backbone one). If it's missing — orphan
        // backbone — skip; selfConsistencyCheck would already have flagged this.
        const parent = entries.find((e) => e.kind !== "backbone");
        if (!parent) continue;

        // Foundation = anything sourced from `profiles-types.json` (FHIR primitive
        // and complex types, plus their backbones). Resources (loaded from
        // `profiles-resources.json`) keep one file each. Fallback: when no source
        // bundle is recorded (e.g. hand-built test fixtures), bucket primitives
        // and complex-types into foundation by `kind`.
        const goesIntoFoundation = parent.sourceBundle
            ? parent.sourceBundle === "profiles-types.json"
            : (parent.kind === "primitive-type" || parent.kind === "complex-type");
        const fileName = goesIntoFoundation
            ? FOUNDATION_FILE
            : `${jsonSafeFileName(root)}.json`;

        if (goesIntoFoundation) {
            for (const e of entries) foundationBody[e.model.TypeName] = e.model;
        } else {
            const filePath = path.join(modelsDir, fileName);
            const fileBody: Record<string, TypeModel> = {};
            for (const e of entries) fileBody[e.model.TypeName] = e.model;
            fs.writeFileSync(filePath, JSON.stringify(fileBody, null, 2) + "\n", "utf8");
            written.push(filePath);
        }

        for (const e of entries) {
            indexByUrl[e.url] = fileName;
            indexByTypeName[e.model.TypeName] = fileName;
        }
    }

    // Write the merged foundation bundle (sorted by TypeName for deterministic diffs).
    const sortedFoundation: Record<string, TypeModel> = {};
    for (const k of Object.keys(foundationBody).sort()) sortedFoundation[k] = foundationBody[k];
    const foundationPath = path.join(modelsDir, FOUNDATION_FILE);
    fs.writeFileSync(foundationPath, JSON.stringify(sortedFoundation, null, 2) + "\n", "utf8");
    written.push(foundationPath);

    // Eagerly inline System.* types into the index — they're 8 entries, every
    // validation touches them, and they're version-independent.
    const systemTypes: Record<string, TypeModel> = {};
    for (const [name, m] of Object.entries(systemTypesByTypeName)) {
        systemTypes[name] = m;
    }
    const systemUrlMap: Record<string, string> = {};
    for (const url of Object.keys(systemTypesByUrl)) {
        systemUrlMap[url] = systemTypesByUrl[url].TypeName;
    }

    const indexJson = {
        // Map from canonical URL → JSON filename (empty string means "in `system`")
        byUrl: sortedRecord({ ...indexByUrl, ...mapValues(systemUrlMap, () => "") }),
        // Map from TypeName → JSON filename (empty string means "in `system`")
        byTypeName: sortedRecord({
            ...indexByTypeName,
            ...mapValues(systemTypes, () => ""),
        }),
        // Inline System.* models — eagerly loaded with the index.
        system: sortedRecord(systemTypes),
    };
    const indexPath = path.join(outDir, "models", "index.json");
    fs.writeFileSync(indexPath, JSON.stringify(indexJson, null, 2) + "\n", "utf8");
    written.push(indexPath);
    return written;
}

function jsonSafeFileName(typeName: string): string {
    // TypeNames are already legal across our targets (alphanumerics + `_`); guard anyway.
    return typeName.replace(/[^A-Za-z0-9_.-]/g, "_");
}

function sortedRecord<T>(rec: Record<string, T>): Record<string, T> {
    const out: Record<string, T> = {};
    for (const k of Object.keys(rec).sort()) out[k] = rec[k];
    return out;
}

function mapValues<T, U>(rec: Record<string, T>, f: (v: T, k: string) => U): Record<string, U> {
    const out: Record<string, U> = {};
    for (const k of Object.keys(rec)) out[k] = f(rec[k], k);
    return out;
}

/** In-memory variant for tests: returns { fileName -> content } without writing to disk. */
export function emitInMemory(result: BuildResult): Record<string, string> {
    const out: Record<string, string> = {};
    const allExports: { categoryFile: string; name: string; entry: TypeModelEntry }[] = [];
    for (const g of groupByCategory(result.entries)) {
        const exported: { name: string; entry: TypeModelEntry }[] = [];
        out[g.file] = emitCategoryFile(g, exported);
        for (const e of exported) allExports.push({ categoryFile: g.file, ...e });
    }
    out["dictionary.ts"] = emitDictionaryFile(allExports);
    out["index.ts"] = emitIndexFile();
    return out;
}
