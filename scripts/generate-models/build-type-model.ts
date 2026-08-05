// SD -> TypeModel transformation. Implements passes 1..4 of the plan.
// See docs/custom-model-generator-plan.md "Transformation pipeline".

import type { ElementModel, ElementTypeModel, TypeModel } from "../../helpers/custom_model";
import { fhirPrimitiveToSystemTypeName, systemTypesByTypeName, systemTypesByUrl } from "../../helpers/models/generated/system-types";
import type { SDBundle, SDElement, StructureDefinition } from "./sd-types";

export type FhirVersionKey = "r4" | "r4b" | "r5" | "r6";

/** A TypeModel together with its canonical URL — kept side-by-side rather than on the model itself. */
export interface TypeModelEntry {
    url: string;
    model: TypeModel;
    /** True for synthetic backbone/element types minted by the generator. */
    synthetic?: boolean;
    /** Original SD kind, used by the emitter to route into the right per-category file. */
    kind: "primitive-type" | "complex-type" | "resource" | "backbone" | "logical";
    /** For synthetic backbones: TypeName of the top-level (resource/complex-type) ancestor.
     *  Used by the emitter to co-locate backbones with their parent. */
    rootTypeName?: string;
    /** For synthetic backbones: zero-based encounter order within the parent SD's
     *  differential walk, used to keep backbones in their original document order. */
    rootOrder?: number;
    /** Name of the bundle file this entry was loaded from (e.g. `profiles-types.json`).
     *  Backbones inherit their root parent's value. Used by the JSON emitter to
     *  decide which entries belong in `foundation.json` vs a per-resource file. */
    sourceBundle?: string;
}

export interface BuildResult {
    version: FhirVersionKey;
    entries: TypeModelEntry[];
}

/** Produce the synthetic TypeName for an element id like "Questionnaire.item.enableWhen". */
function syntheticTypeName(elementId: string): string {
    const parts = elementId.split(".");
    if (parts.length < 2) {
        throw new Error(`cannot derive synthetic name from element id without children: ${elementId}`);
    }
    return parts[0].toLowerCase() + parts.slice(1).map((p) => "_" + p).join("");
}

/** Synthetic backbone canonical URL: `<parentSdUrl>#<elementId>`,
 *  e.g. `http://hl7.org/fhir/StructureDefinition/AdverseEvent#AdverseEvent.suspectEntity`. */
function syntheticUrl(parentSdUrl: string, elementId: string): string {
    return `${parentSdUrl}#${elementId}`;
}

function lastSegment(url: string | undefined): string | undefined {
    if (!url) return undefined;
    const slash = url.lastIndexOf("/");
    return slash >= 0 ? url.substring(slash + 1) : url;
}

export function resolveStructureDefinitionTypeName(sd: {
    url?: string;
    name?: string;
    type?: string;
    differential?: {element?: Array<{path: string}>};
    snapshot?: {element?: Array<{path: string}>};
}): string | undefined {
    if (sd.type && !/^[a-z][a-z0-9+.-]*:/i.test(sd.type)) {
        return sd.type;
    }
    const elements = sd.differential?.element ?? sd.snapshot?.element ?? [];
    const rootPath = elements[0]?.path?.split(".")[0];
    return rootPath || sd.name || lastSegment(sd.url);
}

/** Strip slice-suffix elements (`Foo.bar:slice`) and the slice rows of choice elements
 *  (`Foo.value[x]:valueQuantity`). The base unsliced row is retained. */
function isSliceElement(el: SDElement): boolean {
    return !!el.id && el.id.includes(":");
}

function isArrayElement(el: SDElement): boolean {
    if (!el.max) return false;
    return el.max !== "1" && el.max !== "0";
}

function isRequired(el: SDElement): boolean {
    return typeof el.min === "number" && el.min >= 1;
}

function elementNameFromPath(path: string): string {
    const dot = path.lastIndexOf(".");
    return dot >= 0 ? path.substring(dot + 1) : path;
}

function parentIdOf(id: string): string | undefined {
    const dot = id.lastIndexOf(".");
    return dot >= 0 ? id.substring(0, dot) : undefined;
}

/** Resolve a contentReference (e.g. "#Questionnaire.item" or just "#item" relative form, or a full URL) to a synthetic TypeName. */
function resolveContentReference(ref: string, sdRootType: string): string {
    // Strip URL part before '#', if any: "http://hl7.org/fhir/StructureDefinition/Questionnaire#Questionnaire.item"
    const hash = ref.lastIndexOf("#");
    const local = hash >= 0 ? ref.substring(hash + 1) : ref;
    if (!local) {
        throw new Error(`empty contentReference: ${ref}`);
    }
    // local can be "Questionnaire.item" or just "item" (rare/older forms).
    const parts = local.split(".");
    if (parts[0] !== sdRootType) {
        // assume relative
        return syntheticTypeName([sdRootType, ...parts].join("."));
    }
    return syntheticTypeName(local);
}

/** Resolve a SD type[].code into the canonical FHIR type name we want to record.
 *  HL7 publishes elements like `Resource.id` and `string.value` with code
 *  `http://hl7.org/fhirpath/System.String` plus a `structuredefinition-fhir-type`
 *  extension giving the real FHIR primitive code (e.g. `id`, `string`). Prefer
 *  the extension when present; otherwise fall back to mapping the System URL
 *  to a System.* TypeName. */
function resolveTypeCode(t: { code: string; extension?: Array<{ url: string; valueUrl?: string }> }): string {
    if (!t.code.startsWith("http://hl7.org/fhirpath/System.")) return t.code;
    const ext = (t.extension ?? []).find(
        (e) => e.url === "http://hl7.org/fhir/StructureDefinition/structuredefinition-fhir-type"
    );
    if (ext && ext.valueUrl) return ext.valueUrl;
    // No extension — treat as a direct System.* reference.
    const tail = t.code.substring("http://hl7.org/fhirpath/".length);
    return tail; // e.g. "System.String"
}

interface SDProcessingContext {
    sd: StructureDefinition;
    rootTypeName: string;
    /** path string -> owning TypeModel (real or synthetic) */
    pathOwners: Map<string, TypeModel>;
    /** synthetic backbone TypeModels minted while processing this SD, keyed by their TypeName */
    synthetics: Map<string, TypeModel>;
    /** snapshot elements with descendants? per-path "has children" lookup */
    hasChildren: Set<string>;
}

function buildHasChildren(elements: SDElement[]): Set<string> {
    const set = new Set<string>();
    for (const el of elements) {
        if (!el.id) continue;
        const parent = parentIdOf(el.id);
        if (parent) set.add(parent);
    }
    return set;
}

/** Build a single TypeModel (and any synthetic backbone TypeModels) from one StructureDefinition. */
function processStructureDefinition(
    sd: StructureDefinition,
    version: FhirVersionKey,
    out: TypeModelEntry[],
    sourceBundle?: string,
    includeLogical?: boolean
): void {
    if (sd.kind === "logical" && !includeLogical) return; // stage 1: skip logicals unless explicitly opted-in
    if (sd.derivation === "constraint") return; // stage 1: skip profiles
    if (sd.abstract === true && sd.kind === "resource" && sd.type === "Resource") {
        // We still want abstract types like Resource, DomainResource, Element, BackboneElement, etc.
        // so don't blanket-skip abstracts. Fall through.
    }

    // Walk the SD's *differential* element list, not its snapshot. This means the
    // emitted TypeModel only contains elements introduced by *this* SD; inherited
    // elements live on the BaseTypeName chain. Fall back to snapshot when no
    // differential is provided (e.g. some hand-built test fixtures).
    const elements = sd.differential?.element ?? sd.snapshot?.element ?? [];
    if (elements.length === 0) return;

    // The differential's first element is normally the SD's root row (id === sd.type),
    // but defensively handle both presence and absence.
    const rootTypeName = resolveStructureDefinitionTypeName(sd);
    if (!rootTypeName) return;

    const baseTypeName = lastSegment(sd.baseDefinition);

    const rootModel: TypeModel = {
        TypeName: rootTypeName,
        ...(baseTypeName ? { BaseTypeName: baseTypeName } : {}),
        Elements: [],
    };

    out.push({
        url: sd.url,
        model: rootModel,
        kind: sd.kind === "primitive-type" ? "primitive-type"
            : sd.kind === "complex-type" ? "complex-type"
            : sd.kind === "logical" ? "logical"
            : "resource",
        ...(sourceBundle ? { sourceBundle } : {}),
    });

    const ctx: SDProcessingContext = {
        sd,
        rootTypeName,
        pathOwners: new Map([[rootTypeName, rootModel]]),
        synthetics: new Map(),
        hasChildren: buildHasChildren(elements),
    };

    // Iterate every element except the SD's own root row (id === rootTypeName).
    let backboneOrder = 0;
    for (const el of elements) {
        if (!el.id) continue;
        if (el.id === rootTypeName) continue; // skip the SD-root row
        if (isSliceElement(el)) continue;
        backboneOrder = processElement(el, ctx, version, out, rootTypeName, backboneOrder, sourceBundle);
    }
}

function isSystemPrimitiveBacked(sd: StructureDefinition): boolean {
    return sd.kind === "primitive-type" && !!sd.type && sd.type in fhirPrimitiveToSystemTypeName;
}

function processElement(
    el: SDElement,
    ctx: SDProcessingContext,
    version: FhirVersionKey,
    out: TypeModelEntry[],
    rootTypeName: string,
    backboneOrder: number,
    sourceBundle?: string
): number {
    const id = el.id!;
    const parentId = parentIdOf(id);
    if (!parentId) return backboneOrder; // shouldn't happen; root handled in caller

    const owner = ctx.pathOwners.get(parentId);
    if (!owner) {
        // Parent wasn't processed (maybe a slice or unsupported branch). Skip silently.
        return backboneOrder;
    }

    const elementName = elementNameFromPath(el.path);

    // Special handling: FHIR primitive container's `value` element. SDs encode this with
    // a magic type code like "http://hl7.org/fhirpath/System.String"; we override it to
    // point at the System.* TypeModel directly.
    if (
        ctx.sd.kind === "primitive-type" &&
        elementName === "value" &&
        parentId === ctx.rootTypeName &&
        isSystemPrimitiveBacked(ctx.sd)
    ) {
        const sysName = fhirPrimitiveToSystemTypeName[ctx.sd.type!];
        const m: ElementModel = {
            ElementName: "value",
            Type: [{ TypeName: sysName }],
            ...(isArrayElement(el) ? { IsArray: true } : {}),
            ...(isRequired(el) ? { Required: true } : {}),
        };
        owner.Elements.push(m);
        return backboneOrder;
    }

    // contentReference: synthesize Type pointing at the resolved synthetic name.
    if (el.contentReference) {
        const refName = resolveContentReference(el.contentReference, ctx.rootTypeName);
        const m: ElementModel = {
            ElementName: elementName,
            Type: [{ TypeName: refName }],
            ...(isArrayElement(el) ? { IsArray: true } : {}),
            ...(isRequired(el) ? { Required: true } : {}),
        };
        owner.Elements.push(m);
        return backboneOrder;
    }

    const types = el.type ?? [];
    if (types.length === 0) {
        // No type info; nothing useful to emit.
        return backboneOrder;
    }

    const firstCode = resolveTypeCode(types[0]);
    const hasKids = ctx.hasChildren.has(id);
    const isBackbone = (firstCode === "BackboneElement" || firstCode === "Element") && hasKids;

    if (isBackbone) {
        const syntheticName = syntheticTypeName(id);
        const synthetic: TypeModel = {
            TypeName: syntheticName,
            BaseTypeName: firstCode,
            Elements: [],
        };
        ctx.synthetics.set(syntheticName, synthetic);
        ctx.pathOwners.set(id, synthetic);
        out.push({
            url: syntheticUrl(ctx.sd.url, id),
            model: synthetic,
            synthetic: true,
            kind: "backbone",
            rootTypeName,
            rootOrder: backboneOrder++,
            ...(sourceBundle ? { sourceBundle } : {}),
        });
        const m: ElementModel = {
            ElementName: elementName,
            Type: [{ TypeName: syntheticName }],
            ...(isArrayElement(el) ? { IsArray: true } : {}),
            ...(isRequired(el) ? { Required: true } : {}),
        };
        owner.Elements.push(m);
        return backboneOrder;
    }

    // Regular element. Map type[] entries.
    const mapped: ElementTypeModel[] = types.map((t) => {
        const code = resolveTypeCode(t);
        const etm: ElementTypeModel = { TypeName: code };
        if (code === "Reference" && t.targetProfile && t.targetProfile.length > 0) {
            etm.TargetProfile = [...t.targetProfile].sort();
        }
        return etm;
    });
    // Sort Type[] alphabetically by TypeName for deterministic output.
    mapped.sort((a, b) => (a.TypeName < b.TypeName ? -1 : a.TypeName > b.TypeName ? 1 : 0));

    const m: ElementModel = {
        ElementName: elementName,
        Type: mapped,
        ...(isArrayElement(el) ? { IsArray: true } : {}),
        ...(isRequired(el) ? { Required: true } : {}),
    };
    owner.Elements.push(m);
    return backboneOrder;
}

/** Pass 4: Self-consistency assertions. Throws on failure. */
export function selfConsistencyCheck(entries: TypeModelEntry[]): void {
    const byTypeName = new Map<string, TypeModel>();
    const seenUrls = new Set<string>();
    for (const e of entries) {
        if (seenUrls.has(e.url)) {
            throw new Error(`duplicate canonical URL in dictionary: ${e.url}`);
        }
        seenUrls.add(e.url);
        if (byTypeName.has(e.model.TypeName)) {
            const other = byTypeName.get(e.model.TypeName)!;
            if (other !== e.model) {
                throw new Error(`duplicate TypeName in dictionary: ${e.model.TypeName}`);
            }
        }
        byTypeName.set(e.model.TypeName, e.model);
    }
    for (const e of entries) {
        const isPrim = !!e.model.IsPrimitive;
        for (const el of e.model.Elements) {
            if (isPrim) {
                throw new Error(`primitive type ${e.model.TypeName} should not have Elements`);
            }
            for (const t of el.Type) {
                if (byTypeName.has(t.TypeName)) continue;
                if (t.TypeName in systemTypesByTypeName) continue;
                throw new Error(
                    `dangling ElementTypeModel.TypeName "${t.TypeName}" referenced by ${e.model.TypeName}.${el.ElementName}`
                );
            }
        }
    }
}

/** A bundle paired with the name of the source file it came from. */
export interface TaggedBundle {
    /** Source filename (e.g. `profiles-types.json`) — propagated onto every
     *  TypeModelEntry produced from this bundle. */
    name?: string;
    bundle: SDBundle;
}

/** Drive the full transformation pipeline for one FHIR version.
 *  Accepts either bare `SDBundle[]` (legacy, used in tests) or `TaggedBundle[]`
 *  carrying source-file names that propagate onto every produced entry.
 *  Set `skipSelfConsistency` when running on a partial fixture in tests.
 *  Set `includeLogical` to also emit entries for `kind: "logical"` SDs (used by
 *  the runtime when the user supplies their own logical models — the static code
 *  generator leaves this flag off and continues to skip logicals). */
export function buildVersion(
    version: FhirVersionKey,
    bundles: SDBundle[] | TaggedBundle[],
    opts: { skipSelfConsistency?: boolean; includeLogical?: boolean } = {}
): BuildResult {
    const tagged: TaggedBundle[] = bundles.map((b) =>
        isTaggedBundle(b) ? b : { bundle: b }
    );
    const entries: TypeModelEntry[] = [];
    for (const t of tagged) {
        for (const entry of t.bundle.entry ?? []) {
            const sd = entry.resource;
            if (!sd || sd.resourceType !== "StructureDefinition") continue;
            processStructureDefinition(sd, version, entries, t.name, opts.includeLogical);
        }
    }
    if (!opts.skipSelfConsistency) selfConsistencyCheck(entries);
    return { version, entries };
}

function isTaggedBundle(b: SDBundle | TaggedBundle): b is TaggedBundle {
    return (b as TaggedBundle).bundle !== undefined;
}

/** Helpers exported for tests. */
export const __test = {
    syntheticTypeName,
    syntheticUrl,
    resolveContentReference,
    systemTypesByUrl,
};
