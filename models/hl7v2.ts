/**
 * HL7 v2 Model & Functions for FHIRPath (https://hl7.org/fhirpath/en/appendices.html)
 *
 * Provides:
 * 1. `fhirpath_hl7v2_model`: Model definition for `fhirpath.js` evaluation
 * 2. `hl7v2UserInvocationTable`: Custom HL7 v2 functions (`elements`, `components`, `subcomponents`, `simple`, `group`, `groups`)
 * 3. `hl7v2TypeModels`: Type dictionary (`byTypeName`, `byUrl`) for `fhirpath_validator.ts`
 */

import fhirpath from "fhirpath";
import type { Model } from "fhirpath";
import { updateWithGeneratedData } from "fhirpath/fhir-context/general-additions.js";
import type { TypeModel } from "../helpers/custom_model";
import {
  systemTypesByTypeName,
  systemTypesByUrl,
} from "../helpers/models/generated/system-types";

const rawHl7v2Model: any = {
  version: "hl7v2",
  score: {
    propertyURI: "http://hl7.org/fhirpath/v2",
    type2Resources: {},
  },
  path2Type: {
    "Message.segment": "Segment",
    "Message.group": "Group",
    "Group.name": "string",
    "Group.item": "Base",
    "Group.group": "Group",
    "Segment.code": "string",
    "Segment.field": "Field",
    "Field.element": "Element",
    "Cell.text": "string",
    "Cell.value": "string",
    "Element.component": "Component",
    "Element.text": "string",
    "Element.value": "string",
    "Component.subcomponent": "SubComponent",
    "Component.text": "string",
    "Component.value": "string",
    "SubComponent.text": "string",
    "SubComponent.value": "string",
  },
  choiceTypePaths: {},
  pathsDefinedElsewhere: {
    "Element.text": "Cell.text",
    "Element.value": "Cell.value",
    "Component.text": "Cell.text",
    "Component.value": "Cell.value",
    "SubComponent.text": "Cell.text",
    "SubComponent.value": "Cell.value",
  },
  type2Parent: {
    Base: "Any",
    Message: "Base",
    Group: "Base",
    Segment: "Base",
    Field: "Base",
    Cell: "Base",
    Element: "Cell",
    Component: "Cell",
    SubComponent: "Cell",
    boolean: "Any",
    string: "Any",
    integer: "Any",
    decimal: "Any",
    date: "Any",
    dateTime: "Any",
    time: "Any",
  },
};

updateWithGeneratedData(rawHl7v2Model);
// Note: updateWithGeneratedData filters out 'Element' in path2TypeWithoutElements
// because in FHIR 'Element' is an abstract base class. In the HL7 v2 FHIRPath model,
// 'Element' is the concrete type of Field.element, so we restore it explicitly.
rawHl7v2Model.path2TypeWithoutElements["Field.element"] = "Element";

export const fhirpath_hl7v2_model: Model = rawHl7v2Model as Model;

const makeChildResNodes: (
  ctx: any,
  node: any,
  propName: string,
  model?: any
) => any[] = (fhirpath as any).util.makeChildResNodes;

const CELL_TYPE_NAMES = new Set(["Cell", "Element", "Component", "SubComponent"]);

/**
 * Attach string `convertedData` to simple HL7 v2 Cell ResourceNodes (`Element`, `Component`,
 * `SubComponent`) so equality comparisons like `components(2) = 'LN'` work in fhirpath.js
 * while preserving `node.data.text` and `node.data.value` for property navigation.
 */
export function attachHl7v2CellConvertedData(item: any): any {
  if (
    item &&
    typeof item === "object" &&
    item.data &&
    typeof item.data === "object" &&
    (CELL_TYPE_NAMES.has(item.fhirNodeDataType) ||
      CELL_TYPE_NAMES.has(item.data.resourceType))
  ) {
    if (typeof item.data.text === "string") {
      item.convertedData = item.data.text;
      item._convertedDataReady = true;
    }
  }
  return item;
}

function unwrapData(nodeOrData: any): any {
  return nodeOrData && typeof nodeOrData === "object" && "data" in nodeOrData
    ? nodeOrData.data
    : nodeOrData;
}

function getNodeTypeName(nodeOrData: any): string | undefined {
  if (!nodeOrData || typeof nodeOrData !== "object") return undefined;
  if (typeof nodeOrData.fhirNodeDataType === "string") {
    return nodeOrData.fhirNodeDataType;
  }
  const data = unwrapData(nodeOrData);
  if (data && typeof data === "object") {
    if (typeof data.resourceType === "string") return data.resourceType;
    if ("segment" in data) return "Message";
    if ("name" in data && "item" in data) return "Group";
    if ("code" in data && "field" in data) return "Segment";
    if ("element" in data) return "Field";
    if ("component" in data) return "Element";
    if ("subcomponent" in data) return "Component";
    if ("text" in data || "value" in data) return "Cell";
  }
  return undefined;
}

function extractSimpleText(cellData: any): string | undefined {
  if (!cellData || typeof cellData !== "object") return undefined;
  if (typeof cellData.text === "string") {
    return cellData.text;
  }
  if (Array.isArray(cellData.component) && cellData.component.length > 0) {
    return extractSimpleText(cellData.component[0]);
  }
  if (Array.isArray(cellData.subcomponent) && cellData.subcomponent.length > 0) {
    return extractSimpleText(cellData.subcomponent[0]);
  }
  return undefined;
}

function parseIndexArg(index: any): number | undefined {
  if (index === undefined || index === null || Array.isArray(index)) {
    return undefined;
  }
  const n = typeof index === "number" ? index : parseInt(String(index), 10);
  return Number.isNaN(n) ? undefined : n;
}

function isCellEmpty(nodeOrData: any): boolean {
  const data = unwrapData(nodeOrData);
  if (!data || typeof data !== "object") return true;
  if (typeof data.text === "string" && data.text.length > 0) return false;
  if (Array.isArray(data.component) && data.component.some((c: any) => !isCellEmpty(c))) {
    return false;
  }
  if (
    Array.isArray(data.subcomponent) &&
    data.subcomponent.some((s: any) => !isCellEmpty(s))
  ) {
    return false;
  }
  return true;
}

function assertGroupDefinedInStructure(data: any, targetName: string): void {
  const definedGroups: Set<string> | undefined = data?.__definedGroups;
  if (!definedGroups) return;
  const normalizedTarget = targetName.trim().replace(/ /g, "_");
  if (definedGroups.has(normalizedTarget)) return;
  for (const g of Array.from(definedGroups)) {
    if (normalizedTarget.endsWith(`.${g}`)) return;
  }
  throw new Error(
    `Group '${targetName}' is not defined in message structure '${data.__structureId ?? "unknown"}'.`
  );
}

function matchesGroupName(groupNodeOrData: any, targetName: string): boolean {
  const data = unwrapData(groupNodeOrData);
  const actualName: string | undefined = data?.name;
  if (!actualName) return false;
  const normalizedTarget = targetName.trim().replace(/ /g, "_");
  if (actualName === normalizedTarget) return true;
  // Also allow matching `<STRUCT>.<GROUP>` (e.g. 'ORU_R01.PATIENT_OBSERVATION')
  if (normalizedTarget.endsWith(`.${actualName}`)) return true;
  return false;
}

function collectMatchingDirectOrWrapperGroups(
  ctx: any,
  parentNode: any,
  name?: string
): any[] {
  const directGroups = makeChildResNodes(ctx, parentNode, "group", ctx.model);
  if (name === undefined) {
    return directGroups;
  }
  const directMatches = directGroups.filter((g) => matchesGroupName(g, name));
  if (directMatches.length > 0) {
    return directMatches;
  }
  // If called on Message and the structure has an outer wrapper group (such as PATIENT_RESULT
  // in ORU_R01), allow `Message.group('PATIENT')` to match immediate child groups of the wrapper
  // as shown in Example 5 of the FHIRPath HL7 v2 Appendix.
  if (getNodeTypeName(parentNode) === "Message") {
    const wrapperMatches: any[] = [];
    for (const topGrp of directGroups) {
      const secondLevel = makeChildResNodes(ctx, topGrp, "group", ctx.model);
      for (const childGrp of secondLevel) {
        if (matchesGroupName(childGrp, name)) {
          wrapperMatches.push(childGrp);
        }
      }
    }
    return wrapperMatches;
  }
  return [];
}

function collectDescendantGroups(ctx: any, parentNode: any, name?: string): any[] {
  const result: any[] = [];
  const directGroups = makeChildResNodes(ctx, parentNode, "group", ctx.model);
  for (const grp of directGroups) {
    if (name === undefined || matchesGroupName(grp, name)) {
      result.push(grp);
    }
    result.push(...collectDescendantGroups(ctx, grp, name));
  }
  return result;
}

/**
 * Custom userInvocationTable implementing the functions defined in:
 * https://hl7.org/fhirpath/en/appendices.html ("Functions" section)
 */
export const hl7v2UserInvocationTable: Record<string, any> = {
  /**
   * segment.elements([index : integer]) : collection / field.elements() : collection
   * Returns all non-empty elements (for all fields) or for the nominated 1-based field index.
   */
  elements: {
    fn: function (this: any, inputs: any[], index?: any) {
      const ctx = this;
      const out: any[] = [];
      const idx = parseIndexArg(index);
      for (const node of inputs) {
        if (getNodeTypeName(node) === "Field") {
          const elems = makeChildResNodes(ctx, node, "element", ctx.model);
          for (const el of elems) {
            if (!isCellEmpty(el)) {
              out.push(attachHl7v2CellConvertedData(el));
            }
          }
          continue;
        }
        const fields = makeChildResNodes(ctx, node, "field", ctx.model);
        const selectedFields =
          idx !== undefined
            ? idx >= 1 && idx <= fields.length
              ? [fields[idx - 1]]
              : []
            : fields;
        for (const fNode of selectedFields) {
          const elems = makeChildResNodes(ctx, fNode, "element", ctx.model);
          for (const el of elems) {
            if (!isCellEmpty(el)) {
              out.push(attachHl7v2CellConvertedData(el));
            }
          }
        }
      }
      return out;
    },
    arity: { 0: [], 1: ["Integer"] },
    internalStructures: true,
  },

  /**
   * element.components([index : integer]) : collection
   * Returns all non-empty components, or the component at the nominated 1-based index (if non-empty).
   */
  components: {
    fn: function (this: any, inputs: any[], index?: any) {
      const ctx = this;
      const out: any[] = [];
      const idx = parseIndexArg(index);
      for (const elemNode of inputs) {
        const comps = makeChildResNodes(ctx, elemNode, "component", ctx.model);
        const selectedComps =
          idx !== undefined
            ? idx >= 1 && idx <= comps.length
              ? [comps[idx - 1]]
              : []
            : comps;
        for (const comp of selectedComps) {
          if (!isCellEmpty(comp)) {
            out.push(attachHl7v2CellConvertedData(comp));
          }
        }
      }
      return out;
    },
    arity: { 0: [], 1: ["Integer"] },
    internalStructures: true,
  },

  /**
   * component.subcomponents([index : integer]) : collection
   * Returns all non-empty subcomponents, or the subcomponent at the nominated 1-based index (if non-empty).
   */
  subcomponents: {
    fn: function (this: any, inputs: any[], index?: any) {
      const ctx = this;
      const out: any[] = [];
      const idx = parseIndexArg(index);
      for (const compNode of inputs) {
        const subs = makeChildResNodes(ctx, compNode, "subcomponent", ctx.model);
        const selectedSubs =
          idx !== undefined
            ? idx >= 1 && idx <= subs.length
              ? [subs[idx - 1]]
              : []
            : subs;
        for (const sub of selectedSubs) {
          if (!isCellEmpty(sub)) {
            out.push(attachHl7v2CellConvertedData(sub));
          }
        }
      }
      return out;
    },
    arity: { 0: [], 1: ["Integer"] },
    internalStructures: true,
  },

  /**
   * cell.simple() : string
   * Returns either the text of the cell, if it exists, or the return value of simple()
   * from the first component/subcomponent.
   */
  simple: {
    fn: function (this: any, inputs: any[]) {
      const out: string[] = [];
      for (const item of inputs) {
        const data = unwrapData(item);
        const text = extractSimpleText(data);
        if (typeof text === "string") {
          out.push(text);
        }
      }
      return out;
    },
    arity: { 0: [] },
    internalStructures: true,
  },

  /**
   * message.group([name : string]) : collection / group.group([name : string]) : collection
   * Returns direct child groups (or those matching `name`).
   * Note: If the parser cannot properly parse the Abstract Message Syntax, group() fails with an error.
   */
  group: {
    fn: function (this: any, inputs: any[], name?: string) {
      const ctx = this;
      const out: any[] = [];
      for (const node of inputs) {
        const data = unwrapData(node);
        if (data?.__groupError) {
          throw new Error(data.__groupError);
        }
        if (name !== undefined) {
          assertGroupDefinedInStructure(data, String(name));
        }
        out.push(...collectMatchingDirectOrWrapperGroups(ctx, node, name !== undefined ? String(name) : undefined));
      }
      return out;
    },
    arity: { 0: [], 1: ["String"] },
    internalStructures: true,
  },

  /**
   * message.groups([name : string]) : collection / group.groups([name : string]) : collection
   * Returns all groups that are children or descendants of the Message or Group.
   */
  groups: {
    fn: function (this: any, inputs: any[], name?: string) {
      const ctx = this;
      const out: any[] = [];
      for (const node of inputs) {
        const data = unwrapData(node);
        if (data?.__groupError) {
          throw new Error(data.__groupError);
        }
        if (name !== undefined) {
          assertGroupDefinedInStructure(data, String(name));
        }
        out.push(...collectDescendantGroups(ctx, node, name !== undefined ? String(name) : undefined));
      }
      return out;
    },
    arity: { 0: [], 1: ["String"] },
    internalStructures: true,
  },
};

// ============================================================================
// Validator Type Models (for helpers/fhirpath_validator.ts)
// ============================================================================

const hl7v2StringType: TypeModel = {
  TypeName: "string",
  BaseTypeName: "Base",
  Elements: [{ ElementName: "value", Type: [{ TypeName: "System.String" }] }],
};

const hl7v2BooleanType: TypeModel = {
  TypeName: "boolean",
  BaseTypeName: "Base",
  Elements: [{ ElementName: "value", Type: [{ TypeName: "System.Boolean" }] }],
};

const hl7v2IntegerType: TypeModel = {
  TypeName: "integer",
  BaseTypeName: "Base",
  Elements: [{ ElementName: "value", Type: [{ TypeName: "System.Integer" }] }],
};

const hl7v2DecimalType: TypeModel = {
  TypeName: "decimal",
  BaseTypeName: "Base",
  Elements: [{ ElementName: "value", Type: [{ TypeName: "System.Decimal" }] }],
};

const hl7v2BaseType: TypeModel = {
  TypeName: "Base",
  Elements: [],
};

const hl7v2MessageType: TypeModel = {
  TypeName: "Message",
  BaseTypeName: "Base",
  Elements: [
    {
      ElementName: "segment",
      Type: [{ TypeName: "Segment" }],
      IsArray: true,
      Required: true,
    },
    {
      ElementName: "group",
      Type: [{ TypeName: "Group" }],
      IsArray: true,
    },
  ],
};

const hl7v2GroupType: TypeModel = {
  TypeName: "Group",
  BaseTypeName: "Base",
  Elements: [
    {
      ElementName: "name",
      Type: [{ TypeName: "string" }],
      Required: true,
    },
    {
      ElementName: "item",
      Type: [{ TypeName: "Base" }, { TypeName: "Segment" }, { TypeName: "Group" }],
      IsArray: true,
      Required: true,
    },
    {
      ElementName: "segment",
      Type: [{ TypeName: "Segment" }],
      IsArray: true,
    },
    {
      ElementName: "group",
      Type: [{ TypeName: "Group" }],
      IsArray: true,
    },
  ],
};

const hl7v2SegmentType: TypeModel = {
  TypeName: "Segment",
  BaseTypeName: "Base",
  Elements: [
    {
      ElementName: "code",
      Type: [{ TypeName: "string" }],
      Required: true,
    },
    {
      ElementName: "field",
      Type: [{ TypeName: "Field" }],
      IsArray: true,
    },
  ],
};

const hl7v2FieldType: TypeModel = {
  TypeName: "Field",
  BaseTypeName: "Base",
  Elements: [
    {
      ElementName: "element",
      Type: [{ TypeName: "Element" }],
      IsArray: true,
    },
  ],
};

const hl7v2CellType: TypeModel = {
  TypeName: "Cell",
  BaseTypeName: "Base",
  Elements: [
    {
      ElementName: "text",
      Type: [{ TypeName: "string" }],
    },
    {
      ElementName: "value",
      Type: [{ TypeName: "string" }],
    },
  ],
};

const hl7v2ElementType: TypeModel = {
  TypeName: "Element",
  BaseTypeName: "Cell",
  Elements: [
    {
      ElementName: "component",
      Type: [{ TypeName: "Component" }],
      IsArray: true,
    },
    {
      ElementName: "text",
      Type: [{ TypeName: "string" }],
    },
    {
      ElementName: "value",
      Type: [{ TypeName: "string" }],
    },
  ],
};

const hl7v2ComponentType: TypeModel = {
  TypeName: "Component",
  BaseTypeName: "Cell",
  Elements: [
    {
      ElementName: "subcomponent",
      Type: [{ TypeName: "SubComponent" }],
      IsArray: true,
    },
    {
      ElementName: "text",
      Type: [{ TypeName: "string" }],
    },
    {
      ElementName: "value",
      Type: [{ TypeName: "string" }],
    },
  ],
};

const hl7v2SubComponentType: TypeModel = {
  TypeName: "SubComponent",
  BaseTypeName: "Cell",
  Elements: [
    {
      ElementName: "text",
      Type: [{ TypeName: "string" }],
    },
    {
      ElementName: "value",
      Type: [{ TypeName: "string" }],
    },
  ],
};

export const hl7v2ByTypeName: Readonly<Record<string, TypeModel>> = Object.freeze({
  ...systemTypesByTypeName,
  string: hl7v2StringType,
  boolean: hl7v2BooleanType,
  integer: hl7v2IntegerType,
  decimal: hl7v2DecimalType,
  Base: hl7v2BaseType,
  Message: hl7v2MessageType,
  Group: hl7v2GroupType,
  Segment: hl7v2SegmentType,
  Field: hl7v2FieldType,
  Cell: hl7v2CellType,
  Element: hl7v2ElementType,
  Component: hl7v2ComponentType,
  SubComponent: hl7v2SubComponentType,
});

export const hl7v2ByUrl: Readonly<Record<string, TypeModel>> = Object.freeze({
  ...systemTypesByUrl,
  "http://hl7.org/fhirpath/v2/StructureDefinition/string": hl7v2StringType,
  "http://hl7.org/fhirpath/v2/StructureDefinition/boolean": hl7v2BooleanType,
  "http://hl7.org/fhirpath/v2/StructureDefinition/integer": hl7v2IntegerType,
  "http://hl7.org/fhirpath/v2/StructureDefinition/decimal": hl7v2DecimalType,
  "http://hl7.org/fhirpath/v2/StructureDefinition/Base": hl7v2BaseType,
  "http://hl7.org/fhirpath/v2/StructureDefinition/Message": hl7v2MessageType,
  "http://hl7.org/fhirpath/v2/StructureDefinition/Group": hl7v2GroupType,
  "http://hl7.org/fhirpath/v2/StructureDefinition/Segment": hl7v2SegmentType,
  "http://hl7.org/fhirpath/v2/StructureDefinition/Field": hl7v2FieldType,
  "http://hl7.org/fhirpath/v2/StructureDefinition/Cell": hl7v2CellType,
  "http://hl7.org/fhirpath/v2/StructureDefinition/Element": hl7v2ElementType,
  "http://hl7.org/fhirpath/v2/StructureDefinition/Component": hl7v2ComponentType,
  "http://hl7.org/fhirpath/v2/StructureDefinition/SubComponent": hl7v2SubComponentType,
});
