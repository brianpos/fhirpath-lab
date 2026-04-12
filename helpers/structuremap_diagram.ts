import { StructureMap, StructureMapGroupRule } from "fhir/r4b";

// ===== Exported Data Types =====

export interface StructureMapDiagram {
  groups: DiagramGroup[];
}

export interface DiagramGroup {
  name: string;
  sourceTypes: DiagramType[];
  targetTypes: DiagramType[];
  /** Source position in the FML text for click-to-select on the group header */
  fmlPosition?: { startIndex: number; endIndex: number };
}

export interface DiagramType {
  typeName: string;
  paramName: string;
  /** Property entries — may contain duplicates (e.g. same path with different filters) */
  properties: PropertyEntry[];
  /** Source position in the FML text for click-to-select on the type header */
  fmlPosition?: { startIndex: number; endIndex: number };
}

export interface PropertyEntry {
  /** Dotted property path relative to the type root */
  path: string;
  /** Filter/where condition if present (source properties) */
  filter?: string;
  /** Type filter if present (source properties, e.g. `: Address`) */
  typeFilter?: string;
  /** Fixed/literal value if present (target properties) */
  fixedValue?: string;
  /** When set, this entry represents a dependent group call (not a property) */
  dependentCall?: string;
  /** Identifier linking source and target entries from the same rule */
  ruleId?: number;
  /** The name of the top-level rule that produced this entry */
  ruleName?: string;
  /** When true, this target property creates a new node (create/cc/c or variable used as context) */
  isCreated?: boolean;
  /** The type name being created (from create transform parameter) */
  createdType?: string;
  /** Function call description for target properties populated by a transform function */
  transformFunction?: string;
  /** Additional ruleIds merged from deduplicated entries */
  additionalRuleIds?: number[];
  /** Source position in the FML text for click-to-select */
  fmlPosition?: { startIndex: number; endIndex: number };
  /** Rule-level FML position for click-to-select on rule dividers */
  ruleFmlPosition?: { startIndex: number; endIndex: number };
}

// ===== Data Extraction =====

interface VarInfo {
  rootInput: string;
  path: string;
}

/**
 * Extract the diagram data model from a FHIR StructureMap resource.
 * For each group, identifies source/target types and the properties
 * accessed within each type by walking rule sources and targets.
 */
export function extractStructureMapDiagram(map: StructureMap): StructureMapDiagram {
  const groups: DiagramGroup[] = [];
  nextRuleId = 0;

  for (const group of map.group || []) {
    const varMap = new Map<string, VarInfo>();
    const propsMap = new Map<string, PropertyEntry[]>();

    for (const input of group.input || []) {
      varMap.set(input.name, { rootInput: input.name, path: "" });
      propsMap.set(input.name, []);
    }

    collectProperties(group.rule, varMap, propsMap);

    const sourceTypes: DiagramType[] = [];
    const targetTypes: DiagramType[] = [];

    for (const input of group.input || []) {
      const rawEntries = propsMap.get(input.name) || [];
      // Source entries are deduplicated by path + filter + typeFilter;
      // target entries are kept as-is (they carry per-rule semantics).
      const entries = input.mode === "source"
        ? deduplicateSourceProperties(rawEntries)
        : rawEntries;
      const dt: DiagramType = {
        typeName: input.type || "",
        paramName: input.name,
        properties: entries,
      };
      if ((input as any)._fmlPosition) dt.fmlPosition = (input as any)._fmlPosition;
      if (input.mode === "source") sourceTypes.push(dt);
      else targetTypes.push(dt);
    }

    const dg: DiagramGroup = { name: group.name, sourceTypes, targetTypes };
    if ((group as any)._fmlPosition) dg.fmlPosition = (group as any)._fmlPosition;
    groups.push(dg);
  }

  return { groups };
}

/**
 * Deduplicate source property entries by path + filter + typeFilter.
 * Keeps the first occurrence and merges ruleIds from duplicates into
 * additionalRuleIds so that connector lines still draw correctly.
 */
function deduplicateSourceProperties(entries: PropertyEntry[]): PropertyEntry[] {
  const seen = new Map<string, PropertyEntry>();
  const result: PropertyEntry[] = [];
  for (const e of entries) {
    const key = `${e.path}|${e.filter || ""}|${e.typeFilter || ""}`;
    const existing = seen.get(key);
    if (existing) {
      if (e.ruleId !== undefined) {
        if (!existing.additionalRuleIds) existing.additionalRuleIds = [];
        existing.additionalRuleIds.push(e.ruleId);
      }
    } else {
      seen.set(key, e);
      result.push(e);
    }
  }
  return result;
}

/** Global counter for assigning unique rule IDs */
let nextRuleId = 0;

function collectProperties(
  rules: StructureMapGroupRule[] | undefined,
  varMap: Map<string, VarInfo>,
  propsMap: Map<string, PropertyEntry[]>,
  parentRuleId?: number
): void {
  if (!rules) return;

  for (const rule of rules) {
    const ruleId = parentRuleId ?? nextRuleId++;
    const ruleName = parentRuleId !== undefined ? undefined : rule.name;
    const rulePos = (rule as any)._fmlPosition as { startIndex: number; endIndex: number } | undefined;

    // Determine dependent group descriptions for this rule (name + params)
    const dependentDescs = (rule.dependent || [])
      .filter((d) => d.name)
      .map((d) => {
        const vars = (d.variable || []).join(", ");
        return vars ? `${d.name}(${vars})` : d.name;
      });
    const dependentGroup = dependentDescs.length > 0
      ? dependentDescs.join(", ")
      : undefined;

    for (const src of rule.source || []) {
      if (src.context) {
        const info = varMap.get(src.context);
        if (info && src.element) {
          const fullPath = info.path
            ? `${info.path}.${src.element}`
            : src.element;
          const entry: PropertyEntry = { path: fullPath, ruleId, ruleName };
          if (src.condition) entry.filter = src.condition;
          if (src.type) entry.typeFilter = src.type;
          if ((src as any)._fmlPosition) entry.fmlPosition = (src as any)._fmlPosition;
          if (rulePos) entry.ruleFmlPosition = rulePos;
          propsMap.get(info.rootInput)?.push(entry);
          if (src.variable) {
            varMap.set(src.variable, {
              rootInput: info.rootInput,
              path: fullPath,
            });
          }
        } else if (info && !src.element) {
          // Source references the type directly — show as $this
          const dotEntry: PropertyEntry = { path: ".", ruleId, ruleName };
          if ((src as any)._fmlPosition) dotEntry.fmlPosition = (src as any)._fmlPosition;
          if (rulePos) dotEntry.ruleFmlPosition = rulePos;
          propsMap.get(info.rootInput)?.push(dotEntry);
          if (src.variable) {
            varMap.set(src.variable, {
              rootInput: info.rootInput,
              path: info.path,
            });
          }
        }
      }
    }

    let lastTargetRootInput: string | undefined;

    for (const tgt of rule.target || []) {
      if (tgt.context) {
        const info = varMap.get(tgt.context);
        if (info && tgt.element) {
          const fullPath = info.path
            ? `${info.path}.${tgt.element}`
            : tgt.element;
          const entry: PropertyEntry = { path: fullPath, ruleId, ruleName };
          const fixedDesc = describeFixedValue(tgt);
          if (fixedDesc) entry.fixedValue = fixedDesc;
          if (!fixedDesc) {
            const fnDesc = describeTransformFunction(tgt);
            if (fnDesc) entry.transformFunction = fnDesc;
          }
          // Detect node creation: explicit create/cc/c transform, or variable assigned with sub-rules
          if (isCreateTransform(tgt.transform) ||
              (tgt.variable && rule.rule && rule.rule.length > 0)) {
            entry.isCreated = true;
            entry.createdType = getCreatedType(tgt);
          }
          // A target with a variable allocated but not receiving data from
          // the source (no copy-from-source transform) is effectively a
          // "create" — show with asterisk.  Exception: a simple copy (valueId ref).
          const hasVariableRef = (tgt.parameter || []).some((p: any) => p.valueId !== undefined);
          if (tgt.variable && !entry.isCreated && !hasVariableRef) {
            entry.isCreated = true;
          }
          if ((tgt as any)._fmlPosition) entry.fmlPosition = (tgt as any)._fmlPosition;
          if (rulePos) entry.ruleFmlPosition = rulePos;
          propsMap.get(info.rootInput)?.push(entry);
          lastTargetRootInput = info.rootInput;
          if (tgt.variable) {
            varMap.set(tgt.variable, {
              rootInput: info.rootInput,
              path: fullPath,
            });
          }
        }
      }
    }

    // Add dependent group calls as separate rows in the target block
    if (lastTargetRootInput) {
      for (const dep of rule.dependent || []) {
        if (!dep.name) continue;
        const vars = (dep.variable || []).join(", ");
        const desc = vars ? `${dep.name}(${vars})` : dep.name;

        propsMap.get(lastTargetRootInput)?.push({
          path: "",
          dependentCall: desc,
          ruleId,
          ruleName,
        });
      }
    }

    collectProperties(rule.rule, varMap, propsMap, ruleId);
  }
}

/**
 * Determine if a target has a fixed/literal value rather than a mapped value.
 * Returns a description string for the tooltip, or undefined if not fixed.
 */
function describeFixedValue(tgt: { transform?: string; parameter?: any[] }): string | undefined {
  if (!tgt.transform || !tgt.parameter || tgt.parameter.length === 0) return undefined;

  if (tgt.transform === "copy" && tgt.parameter.length === 1) {
    const p = tgt.parameter[0];
    if (p.valueString !== undefined) return `"${p.valueString}"`;
    if (p.valueBoolean !== undefined) return `${p.valueBoolean}`;
    if (p.valueInteger !== undefined) return `${p.valueInteger}`;
    if (p.valueDecimal !== undefined) return `${p.valueDecimal}`;
    // valueId is typically a variable reference, not a literal
  }

  if (tgt.transform === "cc" || tgt.transform === "c" || tgt.transform === "qty" || tgt.transform === "id" || tgt.transform === "cp") {
    const params = tgt.parameter.map((p: any) => {
      if (p.valueString !== undefined) return `"${p.valueString}"`;
      if (p.valueId !== undefined) return p.valueId;
      if (p.valueBoolean !== undefined) return `${p.valueBoolean}`;
      if (p.valueInteger !== undefined) return `${p.valueInteger}`;
      if (p.valueDecimal !== undefined) return `${p.valueDecimal}`;
      return "?";
    }).join(", ");
    return `${tgt.transform}(${params})`;
  }

  return undefined;
}

/**
 * Describe a transform function call on a target property.
 * Returns a description like "uuid()" or "append('Patient/', id)", or undefined
 * if the transform is a copy/cc/c/qty/id/cp/create (handled elsewhere).
 */
function describeTransformFunction(tgt: { transform?: string; parameter?: any[] }): string | undefined {
  if (!tgt.transform) return undefined;
  // These transforms are handled by fixedValue or isCreated
  if (tgt.transform === "copy" || tgt.transform === "create" ||
      tgt.transform === "cc" || tgt.transform === "c" ||
      tgt.transform === "qty" || tgt.transform === "id" ||
      tgt.transform === "cp") return undefined;

  const params = (tgt.parameter || []).map((p: any) => {
    if (p.valueString !== undefined) return `'${p.valueString}'`;
    if (p.valueId !== undefined) return p.valueId;
    if (p.valueBoolean !== undefined) return `${p.valueBoolean}`;
    if (p.valueInteger !== undefined) return `${p.valueInteger}`;
    if (p.valueDecimal !== undefined) return `${p.valueDecimal}`;
    return "?";
  });
  return `${tgt.transform}(${params.join(", ")})`;
}

/** Check if a transform indicates node creation */
function isCreateTransform(transform?: string): boolean {
  return transform === "create" || transform === "cc" || transform === "c";
}

/** Extract the type name from a create transform's first parameter */
function getCreatedType(tgt: { transform?: string; parameter?: any[] }): string | undefined {
  if (tgt.transform === "create" && tgt.parameter && tgt.parameter.length > 0) {
    const p = tgt.parameter[0];
    if (p.valueString) return p.valueString;
  }
  return undefined;
}

// ===== SVG Layout Constants =====

const PADDING = 20;
const GROUP_PADDING = 16;
const GROUP_HEADER_HEIGHT = 36;
const GROUP_CORNER_RADIUS = 8;
const TYPE_BOX_PADDING_X = 12;
const TYPE_BOX_PADDING_Y = 8;
const TYPE_HEADER_HEIGHT = 28;
const TYPE_CORNER_RADIUS = 4;
const PROP_LINE_HEIGHT = 20;
const PROP_INDENT = 12;
const CHAR_WIDTH = 7.5;
const MIN_TYPE_WIDTH = 140;
const ARROW_GAP = 80;
const GROUP_GAP = 24;
const TYPE_GAP = 10;

const COLORS = {
  groupBg: "#f8f9fa",
  groupHeaderBg: "#495057",
  groupHeaderText: "#ffffff",
  groupBorder: "#dee2e6",
  typeBg: "#ffffff",
  sourceHeaderBg: "#e3f2fd",
  sourceBorder: "#90caf9",
  sourceHeaderText: "#1565c0",
  targetHeaderBg: "#e8f5e9",
  targetBorder: "#a5d6a7",
  targetHeaderText: "#2e7d32",
  propText: "#212529",
  arrowColor: "#6c757d",
};

// ===== Property Display Helpers =====

interface PropertyDisplay {
  displayName: string;
  depth: number;
  /** The full property path */
  fullPath: string;
  /** Filter/where condition if present */
  filter?: string;
  /** Type filter if present */
  typeFilter?: string;
  /** Fixed/literal value if present */
  fixedValue?: string;
  /** When set, this row represents a dependent group call */
  dependentCall?: string;
  /** Rule identifier for grouping and connector lines */
  ruleId?: number;
  /** The name of the top-level rule */
  ruleName?: string;
  /** When true, this target property creates a new node */
  isCreated?: boolean;
  /** The type name being created */
  createdType?: string;
  /** Function call description */
  transformFunction?: string;
  /** Additional ruleIds merged from deduplicated entries */
  additionalRuleIds?: number[];
  /** Source position in FML text */
  fmlPosition?: { startIndex: number; endIndex: number };
  /** Rule-level FML position */
  ruleFmlPosition?: { startIndex: number; endIndex: number };
}

/**
 * Transform property entries into display items with tree indentation.
 * Child properties are indented under their parent when the parent is present.
 */
function buildPropertyDisplay(properties: PropertyEntry[]): PropertyDisplay[] {
  const pathSet = new Set(properties.filter((p) => p.path).map((p) => p.path));
  return properties.map((entry) => {
    // Dependent call entries are rendered as their own row, always left-aligned
    if (entry.dependentCall) {
      return {
        displayName: entry.dependentCall,
        depth: 0,
        fullPath: "",
        dependentCall: entry.dependentCall,
        ruleId: entry.ruleId,
        ruleName: entry.ruleName,
      };
    }
    const parts = entry.path.split(".");
    let deepestAncestorDepth = 0;
    for (let i = 1; i < parts.length; i++) {
      const parentPath = parts.slice(0, i).join(".");
      if (pathSet.has(parentPath)) {
        deepestAncestorDepth = i;
      }
    }
    const displayName = parts.slice(deepestAncestorDepth).join(".");
    return {
      displayName,
      depth: deepestAncestorDepth,
      fullPath: entry.path,
      filter: entry.filter,
      typeFilter: entry.typeFilter,
      fixedValue: entry.fixedValue,
      ruleId: entry.ruleId,
      ruleName: entry.ruleName,
      isCreated: entry.isCreated,
      createdType: entry.createdType,
      transformFunction: entry.transformFunction,
      additionalRuleIds: entry.additionalRuleIds,
      fmlPosition: entry.fmlPosition,
      ruleFmlPosition: entry.ruleFmlPosition,
    };
  });
}

// ===== SVG Helpers =====

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// ===== Layout Types =====

interface TypeBoxLayout {
  x: number;
  y: number;
  width: number;
  height: number;
  type: DiagramType;
  mode: "source" | "target";
  propDisplay: PropertyDisplay[];
}

interface GroupLayout {
  x: number;
  y: number;
  width: number;
  height: number;
  group: DiagramGroup;
  typeBoxes: TypeBoxLayout[];
}

const FILTER_ICON_SPACE = 18;
const RULE_DIVIDER_HEIGHT = 8;

function typeBoxLabel(type: DiagramType): string {
  return type.typeName ? `${type.paramName} (${type.typeName})` : type.paramName;
}

function calcTypeBoxSize(type: DiagramType, mode?: "source" | "target"): {
  width: number;
  height: number;
  propDisplay: PropertyDisplay[];
} {
  const propDisplay = buildPropertyDisplay(type.properties);
  const headerLabel = typeBoxLabel(type);
  const headerWidth = headerLabel.length * CHAR_WIDTH + 2 * TYPE_BOX_PADDING_X;

  let maxPropWidth = 0;
  const hasAnyIcon = propDisplay.some((pd) => pd.filter || pd.typeFilter || pd.fixedValue || pd.isCreated || pd.transformFunction);
  const hasDoubleIcon = propDisplay.some((pd) => (pd.isCreated || pd.transformFunction) && (pd.filter || pd.typeFilter || pd.fixedValue));
  const iconExtra = hasDoubleIcon ? FILTER_ICON_SPACE * 2 : hasAnyIcon ? FILTER_ICON_SPACE : 0;
  for (const pd of propDisplay) {
    // Dependent call rows include inline chevron + text
    const depExtra = pd.dependentCall ? 16 : 0;
    const w = pd.depth * PROP_INDENT + pd.displayName.length * CHAR_WIDTH + iconExtra + depExtra;
    if (w > maxPropWidth) maxPropWidth = w;
  }
  const propsWidth = maxPropWidth + 2 * TYPE_BOX_PADDING_X;

  const width = Math.max(MIN_TYPE_WIDTH, headerWidth, propsWidth);
  const propCount = Math.max(propDisplay.length, 1);
  // Source boxes get a simple divider between every property;
  // target boxes get dividers only at rule boundaries.
  const dividerCount = mode === "source"
    ? Math.max(0, propDisplay.length - 1)
    : countRuleDividers(propDisplay);
  const height =
    TYPE_HEADER_HEIGHT + propCount * PROP_LINE_HEIGHT + dividerCount * RULE_DIVIDER_HEIGHT + TYPE_BOX_PADDING_Y;

  return { width, height, propDisplay };
}

/** Count the number of rule boundary transitions in a property display list */
function countRuleDividers(propDisplay: PropertyDisplay[]): number {
  let count = 0;
  for (let i = 1; i < propDisplay.length; i++) {
    if (propDisplay[i].ruleId !== propDisplay[i - 1].ruleId) {
      count++;
    }
  }
  return count;
}

// ===== Main SVG Generator =====

/**
 * Generate an SVG diagram from a FHIR StructureMap resource.
 * Each group is rendered as a box containing source and target type boxes
 * with the properties read/written listed inside each type box.
 */
export function generateStructureMapDiagramSvg(map: StructureMap): string {
  const data = extractStructureMapDiagram(map);

  if (data.groups.length === 0) {
    return [
      '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="60">',
      '<text x="150" y="30" text-anchor="middle" font-size="14" fill="#666">No groups defined</text>',
      "</svg>",
    ].join("\n");
  }

  // === Layout phase ===
  const groupLayouts: GroupLayout[] = [];
  let currentY = PADDING;
  let maxGroupWidth = 0;

  for (const group of data.groups) {
    const sourceSizes = group.sourceTypes.map((t) => ({
      ...calcTypeBoxSize(t, "source"),
      type: t,
    }));
    const targetSizes = group.targetTypes.map((t) => ({
      ...calcTypeBoxSize(t, "target"),
      type: t,
    }));

    const sourceColWidth = sourceSizes.reduce(
      (max, s) => Math.max(max, s.width),
      0
    );
    const targetColWidth = targetSizes.reduce(
      (max, s) => Math.max(max, s.width),
      0
    );

    const sourceColHeight =
      sourceSizes.reduce((sum, s) => sum + s.height, 0) +
      Math.max(0, sourceSizes.length - 1) * TYPE_GAP;
    const targetColHeight =
      targetSizes.reduce((sum, s) => sum + s.height, 0) +
      Math.max(0, targetSizes.length - 1) * TYPE_GAP;

    const contentHeight = Math.max(sourceColHeight, targetColHeight, 40);
    const hasArrow = sourceSizes.length > 0 && targetSizes.length > 0;
    const arrowSpace = hasArrow ? ARROW_GAP : 0;
    const groupWidth =
      GROUP_PADDING * 2 + sourceColWidth + arrowSpace + targetColWidth;
    const groupHeight =
      GROUP_HEADER_HEIGHT + GROUP_PADDING + contentHeight + GROUP_PADDING;

    const typeBoxes: TypeBoxLayout[] = [];

    // Source column (left)
    let sy = currentY + GROUP_HEADER_HEIGHT + GROUP_PADDING;
    if (sourceColHeight < contentHeight)
      sy += (contentHeight - sourceColHeight) / 2;
    for (const ss of sourceSizes) {
      typeBoxes.push({
        x: PADDING + GROUP_PADDING,
        y: sy,
        width: sourceColWidth,
        height: ss.height,
        type: ss.type,
        mode: "source",
        propDisplay: ss.propDisplay,
      });
      sy += ss.height + TYPE_GAP;
    }

    // Target column (right)
    let ty = currentY + GROUP_HEADER_HEIGHT + GROUP_PADDING;
    if (targetColHeight < contentHeight)
      ty += (contentHeight - targetColHeight) / 2;
    for (const ts of targetSizes) {
      typeBoxes.push({
        x: PADDING + GROUP_PADDING + sourceColWidth + arrowSpace,
        y: ty,
        width: targetColWidth,
        height: ts.height,
        type: ts.type,
        mode: "target",
        propDisplay: ts.propDisplay,
      });
      ty += ts.height + TYPE_GAP;
    }

    groupLayouts.push({
      x: PADDING,
      y: currentY,
      width: groupWidth,
      height: groupHeight,
      group,
      typeBoxes,
    });

    maxGroupWidth = Math.max(maxGroupWidth, groupWidth);
    currentY += groupHeight + GROUP_GAP;
  }

  const totalWidth = maxGroupWidth + 2 * PADDING;
  const totalHeight = currentY - GROUP_GAP + PADDING;

  // === Render phase ===
  const svg: string[] = [];

  svg.push(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="${totalHeight}" viewBox="0 0 ${totalWidth} ${totalHeight}">`
  );

  // Defs: arrowhead marker
  svg.push("<defs>");
  svg.push(
    '<marker id="sm-arrowhead" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">'
  );
  svg.push(
    `<polygon points="0 0, 7 2.5, 0 5" fill="${COLORS.arrowColor}" />`
  );
  svg.push("</marker>");
  svg.push("</defs>");

  // Embedded styles
  svg.push("<style>");
  svg.push(
    'text { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }'
  );
  svg.push(
    `.sm-group-title { font-size: 15px; font-weight: 600; fill: ${COLORS.groupHeaderText}; }`
  );
  svg.push(".sm-type-title { font-size: 13px; font-weight: 600; }");
  svg.push(`.sm-source-title { fill: ${COLORS.sourceHeaderText}; }`);
  svg.push(`.sm-target-title { fill: ${COLORS.targetHeaderText}; }`);
  svg.push(
    `.sm-prop { font-size: 12px; fill: ${COLORS.propText}; font-family: "Cascadia Code", "Fira Code", Consolas, monospace; }`
  );
  svg.push(
    ".sm-prop-empty { font-size: 12px; fill: #999; font-style: italic; }"
  );
  svg.push(
    `.sm-filter-icon { fill: ${COLORS.sourceHeaderText}; cursor: default; }`
  );
  svg.push(
    `.sm-fixed-icon { fill: ${COLORS.targetHeaderText}; cursor: default; }`
  );
  svg.push(
    `.sm-function-icon { cursor: default; }`
  );
  svg.push(
    `.sm-dependent-call path { stroke: ${COLORS.arrowColor}; }`
  );
  svg.push(
    `.sm-prop-dependent { font-size: 11px; fill: ${COLORS.arrowColor}; font-style: italic; font-family: "Cascadia Code", "Fira Code", Consolas, monospace; }`
  );
  svg.push(
    `[data-pos-start] { cursor: pointer; }`
  );
  svg.push("</style>");

  for (let gi = 0; gi < groupLayouts.length; gi++) {
    const gl = groupLayouts[gi];

    // Group background
    svg.push(
      `<rect x="${gl.x}" y="${gl.y}" width="${gl.width}" height="${gl.height}" rx="${GROUP_CORNER_RADIUS}" fill="${COLORS.groupBg}" stroke="${COLORS.groupBorder}" stroke-width="1" />`
    );

    // Group header bar (top rounded, bottom square)
    svg.push(
      `<rect x="${gl.x}" y="${gl.y}" width="${gl.width}" height="${GROUP_HEADER_HEIGHT}" rx="${GROUP_CORNER_RADIUS}" fill="${COLORS.groupHeaderBg}" />`
    );
    svg.push(
      `<rect x="${gl.x}" y="${gl.y + GROUP_HEADER_HEIGHT - GROUP_CORNER_RADIUS}" width="${gl.width}" height="${GROUP_CORNER_RADIUS}" fill="${COLORS.groupHeaderBg}" />`
    );

    // Header divider
    svg.push(
      `<line x1="${gl.x}" y1="${gl.y + GROUP_HEADER_HEIGHT}" x2="${gl.x + gl.width}" y2="${gl.y + GROUP_HEADER_HEIGHT}" stroke="${COLORS.groupBorder}" stroke-width="1" />`
    );

    // Group title
    const groupPos = gl.group.fmlPosition;
    const groupPosAttrs = groupPos ? ` data-pos-start="${groupPos.startIndex}" data-pos-end="${groupPos.endIndex}"` : "";
    svg.push(
      `<text x="${gl.x + gl.width / 2}" y="${gl.y + GROUP_HEADER_HEIGHT / 2 + 5}" text-anchor="middle" class="sm-group-title"${groupPosAttrs}>${escapeXml(gl.group.name)}</text>`
    );
    // Clickable overlay for group header
    if (groupPos) {
      svg.push(
        `<rect x="${gl.x}" y="${gl.y}" width="${gl.width}" height="${GROUP_HEADER_HEIGHT}" fill="transparent" data-pos-start="${groupPos.startIndex}" data-pos-end="${groupPos.endIndex}" />`
      );
    }

    // Track Y positions per rule for connector lines
    const ruleYPositions = new Map<number, {
      sourceYs: number[];
      targetYs: number[];
      sourceRight?: number;
      targetLeft?: number;
      ruleName?: string;
    }>();

    // Render type boxes
    for (const tb of gl.typeBoxes) {
      const isSource = tb.mode === "source";
      const headerBg = isSource
        ? COLORS.sourceHeaderBg
        : COLORS.targetHeaderBg;
      const border = isSource ? COLORS.sourceBorder : COLORS.targetBorder;
      const titleCls = isSource ? "sm-source-title" : "sm-target-title";

      // Box outline
      svg.push(
        `<rect x="${tb.x}" y="${tb.y}" width="${tb.width}" height="${tb.height}" rx="${TYPE_CORNER_RADIUS}" fill="${COLORS.typeBg}" stroke="${border}" stroke-width="1.5" />`
      );

      // Header background (top rounded, bottom square)
      svg.push(
        `<rect x="${tb.x}" y="${tb.y}" width="${tb.width}" height="${TYPE_HEADER_HEIGHT}" rx="${TYPE_CORNER_RADIUS}" fill="${headerBg}" />`
      );
      svg.push(
        `<rect x="${tb.x}" y="${tb.y + TYPE_HEADER_HEIGHT - TYPE_CORNER_RADIUS}" width="${tb.width}" height="${TYPE_CORNER_RADIUS}" fill="${headerBg}" />`
      );

      // Header divider
      svg.push(
        `<line x1="${tb.x}" y1="${tb.y + TYPE_HEADER_HEIGHT}" x2="${tb.x + tb.width}" y2="${tb.y + TYPE_HEADER_HEIGHT}" stroke="${border}" stroke-width="1" />`
      );

      // Type name
      const label = typeBoxLabel(tb.type);
      const typePos = tb.type.fmlPosition;
      const typePosAttrs = typePos ? ` data-pos-start="${typePos.startIndex}" data-pos-end="${typePos.endIndex}"` : "";
      svg.push(
        `<text x="${tb.x + TYPE_BOX_PADDING_X}" y="${tb.y + TYPE_HEADER_HEIGHT / 2 + 5}" class="sm-type-title ${titleCls}"${typePosAttrs}>${escapeXml(label)}</text>`
      );
      // Clickable overlay for type header
      if (typePos) {
        svg.push(
          `<rect x="${tb.x}" y="${tb.y}" width="${tb.width}" height="${TYPE_HEADER_HEIGHT}" fill="transparent" data-pos-start="${typePos.startIndex}" data-pos-end="${typePos.endIndex}" />`
        );
      }

      // Properties
      let propY = tb.y + TYPE_HEADER_HEIGHT + PROP_LINE_HEIGHT - 4;
      if (tb.propDisplay.length === 0) {
        svg.push(
          `<text x="${tb.x + TYPE_BOX_PADDING_X}" y="${propY}" class="sm-prop-empty">(no properties)</text>`
        );
      } else {
        for (let pi = 0; pi < tb.propDisplay.length; pi++) {
          const pd = tb.propDisplay[pi];

          // Source boxes: simple divider between every property row
          // Target boxes: divider only at rule boundaries
          const showDivider = isSource
            ? pi > 0
            : pi > 0 && pd.ruleId !== tb.propDisplay[pi - 1].ruleId;
          if (showDivider) {
            const divY = propY - PROP_LINE_HEIGHT + 4 + RULE_DIVIDER_HEIGHT / 2;
            svg.push(
              `<line x1="${tb.x + 4}" y1="${divY}" x2="${tb.x + tb.width - 4}" y2="${divY}" stroke="${COLORS.groupBorder}" stroke-width="0.5" />`
            );
            propY += RULE_DIVIDER_HEIGHT;
          }

          // Track Y position for per-rule connectors
          if (pd.ruleId !== undefined) {
            const centerY = propY - PROP_LINE_HEIGHT / 2 + 4;
            // Register this Y position for the primary ruleId
            const allRuleIds = [pd.ruleId, ...(pd.additionalRuleIds || [])];
            for (const rid of allRuleIds) {
              if (!ruleYPositions.has(rid)) {
                ruleYPositions.set(rid, { sourceYs: [], targetYs: [], ruleName: pd.ruleName });
              }
              const entry = ruleYPositions.get(rid)!;
              if (tb.mode === "source") {
                entry.sourceYs.push(centerY);
                entry.sourceRight = Math.max(entry.sourceRight ?? 0, tb.x + tb.width);
              } else {
                entry.targetYs.push(centerY);
                entry.targetLeft = Math.min(entry.targetLeft ?? Infinity, tb.x);
              }
            }
          }

          const px = tb.x + TYPE_BOX_PADDING_X + pd.depth * PROP_INDENT;
          const propPosAttrs = pd.fmlPosition ? ` data-pos-start="${pd.fmlPosition.startIndex}" data-pos-end="${pd.fmlPosition.endIndex}"` : 
            (pd.ruleFmlPosition ? ` data-pos-start="${pd.ruleFmlPosition.startIndex}" data-pos-end="${pd.ruleFmlPosition.endIndex}"` : "");

          if (pd.dependentCall) {
            // Dependent call row: inline chevron icon + italic styled text
            const iconX = px;
            const iconY = propY - 10;
            svg.push(
              `<g class="sm-dependent-call" transform="translate(${iconX}, ${iconY})">` +
              `<path d="M2 3h6l3 3-3 3H2l3-3-3-3z" fill="none" stroke="${COLORS.arrowColor}" stroke-width="1.3" stroke-linejoin="round" stroke-linecap="round" />` +
              `</g>`
            );
            svg.push(
              `<text x="${px + 16}" y="${propY}" class="sm-prop-dependent"${propPosAttrs}>${escapeXml(pd.dependentCall)}</text>`
            );
          } else {
            svg.push(
              `<text x="${px}" y="${propY}" class="sm-prop"${propPosAttrs}>${escapeXml(pd.displayName)}</text>`
            );
            // Right-aligned annotation icons; created/function icon before (left of) filter/fixed
            const hasCreated = pd.isCreated;
            const hasFunction = !hasCreated && !!pd.transformFunction;
            const hasAnnot = !!(pd.filter || pd.typeFilter || pd.fixedValue || hasFunction);
            const rightIconX = tb.x + tb.width - TYPE_BOX_PADDING_X - 12;
            const createdIconX = (hasCreated && hasAnnot) ? rightIconX - 16 : rightIconX;
            if (pd.filter || pd.typeFilter) {
              const iconY = propY - 10;
              const filterTitle = pd.filter
                ? `where: ${escapeXml(pd.filter)}`
                : `type: ${escapeXml(pd.typeFilter!)}`;
              svg.push(
                `<g class="sm-filter-icon" transform="translate(${rightIconX}, ${iconY})">` +
                `<title>${filterTitle}</title>` +
                `<rect x="0" y="0" width="14" height="12" fill="transparent" />` +
                `<path d="M1 1h12l-4.5 5.5V11l-3-1.5V6.5L1 1z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round" stroke-linecap="round" />` +
                `</g>`
              );
            } else if (pd.fixedValue) {
              const iconY = propY - 10;
              svg.push(
                `<g class="sm-fixed-icon" transform="translate(${rightIconX}, ${iconY})">` +
                `<title>fixed: ${escapeXml(pd.fixedValue)}</title>` +
                `<rect x="2" y="0" width="10" height="12" fill="transparent" />` +
                `<path d="M7 1v3M4.5 4h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round" stroke-linecap="round" />` +
                `</g>`
              );
            } else if (hasFunction) {
              const iconY = propY - 10;
              svg.push(
                `<g class="sm-function-icon" transform="translate(${rightIconX}, ${iconY})">` +
                `<title>fn: ${escapeXml(pd.transformFunction!)}</title>` +
                `<rect x="0" y="0" width="14" height="12" fill="transparent" />` +
                `<text x="1" y="11" font-size="12" font-weight="700" font-style="italic" fill="#6a1b9a">ƒ</text>` +
                `</g>`
              );
            }
            if (hasCreated) {
              const iconY = propY - 10;
              const createdTitle = pd.createdType ? `creates ${escapeXml(pd.createdType)}` : "creates new";
              svg.push(
                `<g class="sm-created-icon" transform="translate(${createdIconX}, ${iconY})">` +
                `<title>${createdTitle}</title>` +
                `<rect x="0" y="0" width="14" height="12" fill="transparent" />` +
                `<path d="M7 1v10M2 6h10M3.5 2.5l7 7M10.5 2.5l-7 7" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />` +
                `</g>`
              );
            }
          }
          propY += PROP_LINE_HEIGHT;
        }
      }
    }

    // Per-rule connector lines from source to target
    for (const [, positions] of ruleYPositions) {
      if (positions.sourceYs.length > 0 && positions.targetYs.length > 0 &&
          positions.sourceRight !== undefined && positions.targetLeft !== undefined) {
        const srcCenterY = positions.sourceYs.reduce((a, b) => a + b, 0) / positions.sourceYs.length;
        const tgtCenterY = positions.targetYs.reduce((a, b) => a + b, 0) / positions.targetYs.length;
        const tooltip = positions.ruleName ? `<title>rule: ${escapeXml(positions.ruleName)}</title>` : "";
        svg.push(
          `<g class="sm-connector">${tooltip}` +
          `<line x1="${positions.sourceRight + 4}" y1="${srcCenterY}" x2="${positions.targetLeft - 8}" y2="${tgtCenterY}" stroke="${COLORS.arrowColor}" stroke-width="1.5" marker-end="url(#sm-arrowhead)" />` +
          `</g>`
        );
      }
    }
  }

  svg.push("</svg>");
  return svg.join("\n");
}
