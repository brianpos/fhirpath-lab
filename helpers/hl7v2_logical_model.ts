/**
 * HL7 v2 logical models for FHIR Mapping Language (FML).
 *
 * Two styles of v2 object model are supported when mapping from v2 content:
 *
 * 1. **Generic** - the model defined in the FHIRPath specification annex
 *    (https://hl7.org/fhirpath/en/appendices.html): Message / Group / Segment / Field / Element /
 *    Component / SubComponent. `buildHl7v2GenericModelBundle()` publishes it as logical
 *    StructureDefinitions. It always applies, whatever user models are supplied.
 *
 * 2. **Specific** - a user supplied logical model where segments, fields and components are named
 *    properties (e.g. `PID-5` => `name`). The v2 content is projected onto the model using the
 *    `hl7v2-source` extension on each ElementDefinition. See docs/hl7v2-fml-design.md.
 */

import type { Bundle, ElementDefinition, StructureDefinition } from "fhir/r4b";
import type { Hl7v2MessageObject } from "./hl7v2_parser";

export const HL7V2_MODEL_BASE_URL = "http://hl7.org/fhirpath/v2/StructureDefinition";
export const HL7V2_SOURCE_EXTENSION_URL = "http://fhirpath-lab.com/StructureDefinition/hl7v2-source";

export const hl7v2GenericUrl = (typeName: string): string => `${HL7V2_MODEL_BASE_URL}/${typeName}`;
export const HL7V2_GENERIC_MESSAGE_URL = hl7v2GenericUrl("Message");

type ElementSpec = {
  name: string;
  type: string | string[];
  min?: number;
  repeats?: boolean;
  short?: string;
};

function genericType(
  name: string,
  description: string,
  elements: ElementSpec[],
  base = "Base",
): StructureDefinition {
  const url = hl7v2GenericUrl(name);
  const element: ElementDefinition[] = [
    { id: name, path: name, short: description, min: 0, max: "*" },
    ...elements.map((e): ElementDefinition => {
      const codes = Array.isArray(e.type) ? e.type : [e.type];
      return {
        id: `${name}.${e.name}`,
        path: `${name}.${e.name}`,
        ...(e.short ? { short: e.short } : {}),
        min: e.min ?? 0,
        max: e.repeats ? "*" : "1",
        type: codes.map((code) => ({
          code: /^[A-Z]/.test(code) && code !== "BackboneElement" ? hl7v2GenericUrl(code) : code,
        })),
      };
    }),
  ];
  return {
    resourceType: "StructureDefinition",
    url,
    name,
    title: `HL7 v2 ${name} (FHIRPath generic model)`,
    status: "active",
    kind: "logical",
    abstract: false,
    type: url,
    baseDefinition: base === "Base" ? "http://hl7.org/fhir/StructureDefinition/Base" : hl7v2GenericUrl(base),
    derivation: "specialization",
    differential: { element },
  };
}

const cellElements: ElementSpec[] = [
  { name: "text", type: "string", short: "Unescaped text of the cell" },
  { name: "value", type: "string", short: "Value of the cell" },
];

/**
 * The generic HL7 v2 model from the FHIRPath specification annex as logical StructureDefinitions.
 * Type URLs match the type dictionary used by the FHIRPath validator (models/hl7v2.ts).
 */
export function buildHl7v2GenericModels(): StructureDefinition[] {
  return [
    genericType("Message", "An HL7 v2 message", [
      { name: "segment", type: "Segment", repeats: true, min: 1, short: "All segments in message order" },
      { name: "group", type: "Group", repeats: true, short: "Top level groups of the abstract message syntax" },
    ]),
    genericType("Group", "A group of segments/groups from the abstract message syntax", [
      { name: "name", type: "string", min: 1 },
      { name: "item", type: ["Segment", "Group"], repeats: true, min: 1, short: "Segments and groups in order" },
      { name: "segment", type: "Segment", repeats: true },
      { name: "group", type: "Group", repeats: true },
    ]),
    genericType("Segment", "An HL7 v2 segment", [
      { name: "code", type: "string", min: 1, short: "Three letter segment id, e.g. PID" },
      { name: "field", type: "Field", repeats: true, short: "Field N is field[N] (1-based)" },
    ]),
    genericType("Field", "An HL7 v2 field (holds the repetitions)", [
      { name: "element", type: "Element", repeats: true },
    ]),
    genericType("Cell", "Common text/value of an element, component or sub-component", cellElements),
    genericType("Element", "A field repetition", [...cellElements, { name: "component", type: "Component", repeats: true }], "Cell"),
    genericType("Component", "A component of an element", [...cellElements, { name: "subcomponent", type: "SubComponent", repeats: true }], "Cell"),
    genericType("SubComponent", "A sub-component of a component", cellElements, "Cell"),
  ];
}

export function buildHl7v2GenericModelBundle(): Bundle {
  return {
    resourceType: "Bundle",
    type: "collection",
    entry: buildHl7v2GenericModels().map((resource) => ({
      fullUrl: resource.url,
      resource,
    })),
  };
}

// ============================================================================
// Generic projection
// ============================================================================

/**
 * Convert the FHIRPath v2 object model into plain JSON suitable as FML source content
 * for the generic logical model (removes parser bookkeeping properties).
 */
export function toGenericHl7v2Json(message: Hl7v2MessageObject): unknown {
  const strip = (value: unknown): unknown => {
    if (Array.isArray(value)) return value.map(strip);
    if (value && typeof value === "object") {
      const out: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(value)) {
        if (k === "resourceType" || k === "__groupError") continue;
        out[k] = strip(v);
      }
      return out;
    }
    return value;
  };
  return strip(message);
}

// ============================================================================
// Specific projection
// ============================================================================

export interface Hl7v2ProjectionResult {
  value: Record<string, unknown>;
  warnings: string[];
}

interface Cell {
  text?: string;
  value?: string;
  component?: Cell[];
  subcomponent?: Cell[];
}
interface SegmentData { code: string; field?: { element?: Cell[] }[] }
interface GroupData { name: string; segment?: SegmentData[]; group?: GroupData[] }

interface Ctx {
  group?: GroupData;
  segment?: SegmentData;
  /** the field number the current cell belongs to (for absolute addresses) */
  fieldNumber?: number;
  /** the current repetition / component / subcomponent */
  cell?: Cell;
  cellLevel?: "element" | "component" | "subcomponent";
}

type SdIndex = Map<string, StructureDefinition>;

const strip = (url: string): string => url.split("|")[0];

export function structureDefinitionsFrom(resource: unknown): StructureDefinition[] {
  if (!resource || typeof resource !== "object" || Array.isArray(resource)) return [];
  const r = resource as { resourceType?: string; entry?: { resource?: unknown }[] };
  if (r.resourceType === "StructureDefinition") return [r as StructureDefinition];
  if (r.resourceType === "Bundle") return (r.entry ?? []).flatMap((e) => structureDefinitionsFrom(e.resource));
  return [];
}

/** True when the logical model declares any `hl7v2-source` mapping (i.e. it is a "specific" model). */
export function isSpecificHl7v2Model(sd: StructureDefinition): boolean {
  const elements = sd.differential?.element ?? sd.snapshot?.element ?? [];
  return elements.some((e) => sourceOf(e) !== undefined);
}

function sourceOf(el: ElementDefinition): string | undefined {
  return el.extension?.find((x) => x.url === HL7V2_SOURCE_EXTENSION_URL)?.valueString?.trim() || undefined;
}

type Address =
  | { kind: "segment"; code: string }
  | { kind: "group"; name: string }
  | { kind: "cell"; segment?: string; field?: number; component?: number; sub?: number; relative: boolean };

/**
 * Address syntax (the `hl7v2-source` extension value):
 *   `PID`            segment (children of a segment-level element are resolved against it)
 *   `group:NAME`     group of the abstract message syntax
 *   `PID-5`          field (all repetitions); `PID-5.1` component; `PID-5.1.2` sub-component
 *   `1` / `1.2`      component / component.subcomponent relative to the parent cell, so one
 *                    data type model (e.g. XPN) can be reused by many fields
 */
export function parseHl7v2Address(source: string): Address | undefined {
  const s = source.trim();
  let m = /^group:(\w+)$/i.exec(s);
  if (m) return { kind: "group", name: m[1] };
  m = /^([A-Z][A-Z0-9]{2})$/.exec(s);
  if (m) return { kind: "segment", code: m[1] };
  m = /^([A-Z][A-Z0-9]{2})-(\d+)(?:\.(\d+))?(?:\.(\d+))?$/.exec(s);
  if (m) {
    return {
      kind: "cell", relative: false, segment: m[1], field: Number(m[2]),
      component: m[3] ? Number(m[3]) : undefined, sub: m[4] ? Number(m[4]) : undefined,
    };
  }
  m = /^(\d+)(?:\.(\d+))?$/.exec(s);
  if (m) return { kind: "cell", relative: true, component: Number(m[1]), sub: m[2] ? Number(m[2]) : undefined };
  return undefined;
}

/** Convert an HL7 v2 TS/DT/TM value (YYYY[MM[DD[HHMM[SS[.S+]]]]][+/-ZZZZ]) to FHIR date/time syntax. */
export function hl7v2ToFhirDateTime(v2: string, fhirType: string): string {
  const m = /^(\d{4})(\d{2})?(\d{2})?(\d{2})?(\d{2})?(\d{2})?(\.\d+)?([+-]\d{4})?$/.exec(v2);
  if (!m) return v2;
  const [, y, mo, d, h, mi, s, frac, tz] = m;
  if (fhirType === "time") {
    return h ? `${h}:${mi ?? "00"}:${s ?? "00"}${frac ?? ""}` : v2;
  }
  let date = y;
  if (mo) date += `-${mo}`;
  if (mo && d) date += `-${d}`;
  if (fhirType === "date" || !h || !mo || !d) {
    return fhirType === "date" || !h ? date : v2;
  }
  const time = `${h}:${mi ?? "00"}:${s ?? "00"}${frac ?? ""}`;
  const zone = tz ? `${tz.slice(0, 3)}:${tz.slice(3)}` : fhirType === "instant" ? "Z" : "";
  return `${date}T${time}${zone}`;
}

function convertLeaf(text: string, typeCode: string | undefined): unknown {
  switch (typeCode) {
    case "integer": case "positiveInt": case "unsignedInt":
      return /^[+-]?\d+$/.test(text) ? Number(text) : text;
    case "decimal":
      return /^[+-]?\d*\.?\d+$/.test(text) ? Number(text) : text;
    case "boolean":
      return /^(y|yes|true)$/i.test(text) ? true : /^(n|no|false)$/i.test(text) ? false : text;
    case "date": case "dateTime": case "instant": case "time":
      return hl7v2ToFhirDateTime(text, typeCode);
    default:
      return text;
  }
}

function cellText(cell: Cell | undefined): string | undefined {
  if (!cell) return undefined;
  if (cell.text !== undefined && cell.text !== "") return cell.text;
  if (cell.component?.length) return cellText(cell.component[0]);
  if (cell.subcomponent?.length) return cellText(cell.subcomponent[0]);
  return undefined;
}

function isEmptyCell(cell: Cell | undefined): boolean {
  return !cell || (cellText(cell) === undefined && !cell.component?.length && !cell.subcomponent?.length);
}

class Projector {
  readonly warnings: string[] = [];
  private readonly sds: SdIndex;

  constructor(sds: StructureDefinition[]) {
    this.sds = new Map(sds.map((sd) => [strip(sd.url), sd]));
  }

  project(rootUrl: string, message: Hl7v2MessageObject): Record<string, unknown> {
    const sd = this.sds.get(strip(rootUrl));
    if (!sd) throw new Error(`HL7 v2 model '${rootUrl}' was not found.`);
    const rootName = this.rootPath(sd);
    const root: Ctx = { group: { name: "", segment: message.segment as SegmentData[], group: message.group as GroupData[] } };
    return this.object(sd, rootName, root);
  }

  private rootPath(sd: StructureDefinition): string {
    const elements = sd.differential?.element ?? sd.snapshot?.element ?? [];
    return elements.find((e) => !e.path.includes("."))?.path ?? sd.type ?? sd.name;
  }

  private children(sd: StructureDefinition, path: string): ElementDefinition[] {
    const elements = sd.differential?.element ?? sd.snapshot?.element ?? [];
    return elements.filter((e) => e.path.startsWith(`${path}.`) && !e.path.slice(path.length + 1).includes("."));
  }

  private object(sd: StructureDefinition, path: string, ctx: Ctx): Record<string, unknown> {
    const out: Record<string, unknown> = {};
    for (const el of this.children(sd, path)) {
      const name = el.path.slice(path.length + 1);
      const value = this.element(sd, el, ctx);
      if (value !== undefined) out[name] = value;
    }
    return out;
  }

  private element(sd: StructureDefinition, el: ElementDefinition, ctx: Ctx): unknown {
    const many = el.max === "*" || (el.max !== undefined && Number(el.max) > 1);
    const typeCode = el.type?.[0]?.code;
    const target = typeCode ? this.sds.get(strip(typeCode)) : undefined;
    const hasChildren = target !== undefined || this.children(sd, el.path).length > 0;
    const build = (next: Ctx): unknown => {
      if (!hasChildren) {
        const text = cellText(next.cell);
        return text === undefined ? undefined : convertLeaf(text, typeCode);
      }
      const obj = target ? this.object(target, this.rootPath(target), next) : this.object(sd, el.path, next);
      return Object.keys(obj).length ? obj : undefined;
    };

    const source = sourceOf(el);
    if (source === undefined) {
      if (!hasChildren) return undefined;
      const obj = build(ctx);
      return obj === undefined ? undefined : many ? [obj] : obj;
    }
    const address = parseHl7v2Address(source);
    if (!address) {
      this.warnings.push(`${el.path}: unrecognised ${HL7V2_SOURCE_EXTENSION_URL} value '${source}'.`);
      return undefined;
    }

    let contexts: Ctx[] = [];
    if (address.kind === "group") {
      contexts = (ctx.group?.group ?? [])
        .filter((g) => g.name === address.name)
        .map((g) => ({ group: g }));
    } else if (address.kind === "segment") {
      contexts = (ctx.group?.segment ?? [])
        .filter((s) => s.code === address.code)
        .map((s) => ({ group: ctx.group, segment: s }));
    } else {
      contexts = this.cellContexts(address, ctx, el.path);
    }
    const values = contexts.map(build).filter((v) => v !== undefined);
    if (values.length === 0) return undefined;
    return many ? values : values[0];
  }

  private cellContexts(
    a: Extract<Address, { kind: "cell" }>, ctx: Ctx, elementPath: string,
  ): Ctx[] {
    let bases: Ctx[];
    if (a.relative) {
      if (!ctx.cell) {
        this.warnings.push(`${elementPath}: relative address needs a parent field/component.`);
        return [];
      }
      bases = [ctx];
      return this.descend(bases, a.component, a.sub, ctx.cellLevel === "component" ? "subcomponent" : "component");
    }
    const segment = ctx.segment;
    if (!segment || segment.code !== a.segment) {
      this.warnings.push(`${elementPath}: ${a.segment}-${a.field} must be nested under a '${a.segment}' segment element.`);
      return [];
    }
    const field = segment.field?.[(a.field ?? 1) - 1];
    // Inside an already-selected repetition of this field, stay within that repetition.
    const reps: Cell[] = ctx.cell && ctx.fieldNumber === a.field && ctx.segment === segment
      ? [ctx.cell]
      : (field?.element ?? []).filter((c) => !isEmptyCell(c));
    bases = reps.map((cell) => ({ ...ctx, cell, fieldNumber: a.field, cellLevel: "element" as const }));
    if (a.component === undefined) return bases;
    return this.descend(bases, a.component, a.sub, "component");
  }

  private descend(bases: Ctx[], component: number | undefined, sub: number | undefined, level: "component" | "subcomponent"): Ctx[] {
    const result: Ctx[] = [];
    for (const base of bases) {
      let cell: Cell | undefined = base.cell;
      let lvl = base.cellLevel;
      if (component !== undefined) {
        if (level === "subcomponent") {
          cell = base.cell?.subcomponent?.[component - 1];
          lvl = "subcomponent";
        } else {
          // A simple element is also its own first component.
          cell = base.cell?.component ? base.cell.component[component - 1] : (component === 1 ? base.cell : undefined);
          lvl = "component";
        }
      }
      if (cell && sub !== undefined) {
        cell = cell.subcomponent ? cell.subcomponent[sub - 1] : (sub === 1 ? cell : undefined);
        lvl = "subcomponent";
      }
      if (!isEmptyCell(cell)) result.push({ ...base, cell, cellLevel: lvl });
    }
    return result;
  }
}

/** Project a parsed HL7 v2 message onto a "specific" logical model rooted at `rootUrl`. */
export function projectHl7v2ToSpecificModel(
  message: Hl7v2MessageObject,
  rootUrl: string,
  models: StructureDefinition[],
): Hl7v2ProjectionResult {
  const projector = new Projector(models);
  const value = projector.project(rootUrl, message);
  return { value, warnings: projector.warnings };
}
