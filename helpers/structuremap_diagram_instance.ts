import { StructureMap, StructureMapGroupRule } from "fhir/r4b";
import type { FmlStructureMap, Rule as FmlRule, RuleDependent } from "./fml_models";
import type { TypeModel, ElementModel } from "./custom_model";
import { lookupByTypeName as lookupByTypeNameR4B } from "./models/generated/r4b";

/**
 * Function used to resolve a TypeModel by its TypeName. Pass any per-version
 * dictionary's `lookupByTypeName` function (e.g. from `helpers/models/generated/r4b`).
 */
export type TypeLookup = (typeName: string) => TypeModel | undefined;

// ===== Exported Data Types =====

export interface StructureMapDiagram {
  groups: DiagramGroup[];
}

export interface DiagramGroup {
  name: string;
  sourceTypes: DiagramType[];
  targetTypes: DiagramType[];
  /** Target types whose inbound connections come exclusively from other target types */
  secondaryTargetTypes: DiagramType[];
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
  /** Whether this entry was produced by a source or target context */
  role?: "source" | "target";
  /** Filter/where condition if present (source properties) */
  filter?: string;
  /** Type filter if present (source properties, e.g. `: Address`) */
  typeFilter?: string;
  /** Fixed/literal value if present (target properties) */
  fixedValue?: string;
  /** Identifier grouping entries under the same top-level rule block */
  ruleId?: number;
  /** Identifier linking entries from the same concrete rule node */
  connectionId?: number;
  /** Additional connectionIds merged from deduplicated entries */
  additionalConnectionIds?: number[];
  /** The name of the top-level rule that produced this entry */
  ruleName?: string;
  /** When true, this target property creates a new node (create/cc/c or variable used as context) */
  isCreated?: boolean;
  /** The type name being created (from create transform parameter) */
  createdType?: string;
  /** Function call description for target properties populated by a transform function */
  transformFunction?: string;
  /** Source position in the FML text for click-to-select */
  fmlPosition?: { startIndex: number; endIndex: number };
  /** Rule-level FML position for click-to-select on rule headers */
  ruleFmlPosition?: { startIndex: number; endIndex: number };
  /** Variable name assigned to this property (e.g., "as hn" → "hn") */
  variableName?: string;
  /** When true, this target property does not consume data from its rule's source */
  noSourceData?: boolean;
  /** True when this element is declared as a collection (IsArray) in the type model */
  isCollection?: boolean;
  /** The element's resolved type name from the type model (used for tooltip) */
  elementTypeName?: string;
  /** True when the property path could not be resolved against the type model
   *  (the type box has a known typeName but the path doesn't match any element). */
  unknownElement?: boolean;
  /** Human-readable validation error (e.g. created-type/element-type mismatch).
   *  When set, this overrides the default tooltip text. */
  validationError?: string;
}

// ===== Data Extraction =====

interface VarInfo {
  rootInput: string;
  path: string;
  /** Resolved type of the rootInput parameter, used to infer types when
   *  the variable is passed into a dependent group whose input is untyped. */
  rootInputType?: string;
  /** When this variable was bound by `create('Type') as v`, the created
   *  type — used directly during dependent-call inference so the type
   *  flows through without needing the model to walk the path. */
  createdType?: string;
}

/**
 * Extract the diagram data model from a FHIR StructureMap resource.
 * For each group, identifies source/target types and the properties
 * accessed within each type by walking rule sources and targets.
 *
 * When a `typeLookup` is provided, each property entry is enriched with
 * `isCollection` (from ElementModel.IsArray) and `elementTypeName` so the
 * renderer can append `[]` for arrays and show the type in a tooltip. If
 * omitted, the bundled R4B dictionary is used as a sensible default.
 */
export function extractStructureMapDiagram(map: StructureMap, typeLookup?: TypeLookup, showMissingProperties?: boolean): StructureMapDiagram {
  const groups: DiagramGroup[] = [];
  nextRuleId = 0;
  nextConnectionId = 0;

  // Resolve the type-model lookup up front so it's available both during
  // collection (for inferring untyped dependent group inputs) and during
  // the post-pass that annotates property entries.
  const lookup = typeLookup ?? lookupByTypeNameR4B;

  // Track type refinements discovered during dependent group walks.
  // Maps groupName → inputName → refined typeName.
  const typeRefinements = new Map<string, Map<string, string>>();
  const resolvedDependentNames = new Set<string>();

  for (const group of map.group || []) {
    const varMap = new Map<string, VarInfo>();
    const propsMap = new Map<string, PropertyEntry[]>();

    for (const input of group.input || []) {
      varMap.set(input.name, {
        rootInput: input.name,
        path: "",
        rootInputType: input.type || undefined,
      });
      propsMap.set(input.name, []);
    }

    collectProperties(
      group.rule, varMap, propsMap,
      map.group || [], new Set([group.name]), resolvedDependentNames, typeRefinements,
      lookup
    );

    const sourceTypes: DiagramType[] = [];
    const targetTypes: DiagramType[] = [];

    for (const input of group.input || []) {
      const rawEntries = propsMap.get(input.name) || [];
      const entries = treeSortProperties(deduplicateProperties(rawEntries));
      const dt: DiagramType = {
        typeName: input.type || "",
        paramName: input.name,
        properties: entries,
      };
      if ((input as any)._fmlPosition) dt.fmlPosition = (input as any)._fmlPosition;
      if (input.mode === "source") sourceTypes.push(dt);
      else targetTypes.push(dt);
    }

    // Prune "no data flow" connections from source→target.
    // When a target has fixedValue or a self-contained transformFunction
    // (no valueId params), no data actually flows from the source — the
    // connector is misleading.  Remove the connectionId from those
    // individual targets so they don't show ports/ribbons.
    // Only prune connections rooted in sourceTypes — target-to-target
    // connections (used by splitSecondaryTargets) must be preserved.
    //
    // Important: in multi-target rules (e.g. `src.x as s -> tgt.a = create(..) as t,
    // t.b = 'fixed', t.c = s`) all targets share the same connectionId.
    // We must NOT remove the connectionId from targets that DO consume
    // source data (like `t.c = s`) just because a sibling target has
    // noSourceData.  So we remove per-target, then clean up source entries
    // only when NO surviving targets reference their connectionId.
    const srcBoxConnIds = new Set<number>();
    for (const dt of sourceTypes) {
      for (const p of dt.properties) {
        if (p.connectionId !== undefined) srcBoxConnIds.add(p.connectionId);
        for (const addl of p.additionalConnectionIds || []) srcBoxConnIds.add(addl);
      }
    }
    // Remove connectionId from individual targets that don't consume source data
    for (const dt of targetTypes) {
      for (const p of dt.properties) {
        if (p.role === "target" && p.connectionId !== undefined &&
            srcBoxConnIds.has(p.connectionId) && p.noSourceData) {
          p.connectionId = undefined;
        }
      }
    }
    // Collect connectionIds that still have at least one surviving target
    const survivingTargetConnIds = new Set<number>();
    for (const dt of targetTypes) {
      for (const p of dt.properties) {
        if (p.role === "target" && p.connectionId !== undefined) {
          survivingTargetConnIds.add(p.connectionId);
        }
      }
    }
    // Remove source connectionIds only when no target references them any more
    for (const dt of sourceTypes) {
      for (const p of dt.properties) {
        if (p.connectionId !== undefined && srcBoxConnIds.has(p.connectionId) &&
            !survivingTargetConnIds.has(p.connectionId)) {
          p.connectionId = undefined;
        }
        if (p.additionalConnectionIds) {
          p.additionalConnectionIds = p.additionalConnectionIds.filter(
            id => survivingTargetConnIds.has(id)
          );
          if (p.additionalConnectionIds.length === 0) p.additionalConnectionIds = undefined;
        }
      }
    }

    // Split target types: properties that only receive from other target
    // properties get moved to secondary target boxes (rendered further right).
    const { primary, secondary } = splitSecondaryTargets(targetTypes);

    const dg: DiagramGroup = { name: group.name, sourceTypes, targetTypes: primary, secondaryTargetTypes: secondary };
    if ((group as any)._fmlPosition) dg.fmlPosition = (group as any)._fmlPosition;
    groups.push(dg);
  }

  // Apply type refinements — replace empty or generic type names with
  // more precise types discovered during the dependent group walk.
  for (const group of groups) {
    const refinements = typeRefinements.get(group.name);
    if (!refinements) continue;
    for (const dt of [...group.sourceTypes, ...group.targetTypes]) {
      const refined = refinements.get(dt.paramName);
      if (refined && (!dt.typeName || dt.typeName === "Any")) {
        dt.typeName = refined;
      }
    }
  }

  // Walk the FHIR type model for each type box and annotate property entries
  // with isCollection (IsArray) and elementTypeName for tooltip display.
  for (const group of groups) {
    const allTypes = [
      ...group.sourceTypes,
      ...group.targetTypes,
      ...group.secondaryTargetTypes,
    ];
    for (const dt of allTypes) {
      // Either no declared type, or the declared type isn't in the model:
      // every property on this box is therefore unverifiable — flag them all.
      const rootKnown = !!dt.typeName && !!lookup(dt.typeName);
      // Build a map of paths within this box that re-root to a created
      // type — so deeper properties like `entry.resource.status` resolve
      // against the created type (e.g. Observation) rather than the
      // static element type at `entry.resource` (Resource).
      const createBoundaries = new Map<string, string>();
      for (const p of dt.properties) {
        if (p.createdType && p.path && p.path !== ".") {
          createBoundaries.set(p.path, p.createdType);
        }
      }
      for (const p of dt.properties) {
        if (!rootKnown) {
          if (p.path && p.path !== ".") p.unknownElement = true;
          continue;
        }
        // Skip the root-context placeholder ("." path) which has no element.
        if (!p.path || p.path === ".") continue;
        const resolved = resolvePathInModel(dt.typeName, p.path, lookup, createBoundaries);
        if (resolved) {
          if (resolved.isCollection) p.isCollection = true;
          if (resolved.elementTypeName) p.elementTypeName = resolved.elementTypeName;
        } else {
          p.unknownElement = true;
        }
        // When a target was populated by `create('Type')`, the actual
        // runtime type at this position is the created type — prefer it
        // over the static element type from the model. Also validate that
        // the created type is allowed by the element's declared Type[].
        if (p.createdType) {
          p.elementTypeName = p.createdType;
          if (resolved && resolved.element) {
            if (!isCreatedTypeAllowed(resolved.element, p.createdType, lookup)) {
              const allowed = describeAllowedTypes(resolved.element);
              const displayPath = stripPathDiscriminators(p.path);
              const msg = `created type "${p.createdType}" is not allowed at ${dt.typeName}.${displayPath} (allowed: ${allowed})`;
              console.warn(`[structuremap_diagram_instance] ${msg}`);
              p.unknownElement = true;
              p.validationError = msg;
            }
          } else if (rootKnown && !resolved) {
            // Path didn't resolve at all — already flagged unknownElement above.
          }
        }
      }
    }
  }

  return { groups };
}

/**
 * Strip variable-binding discriminators (`#var_id` suffixes) from each segment
 * of a path. Discriminators are appended to target paths when a variable is
 * bound at a collection element so that distinct bundle entries (etc.) get
 * their own rows; this helper recovers the user-facing FHIR path.
 */
function stripPathDiscriminators(path: string): string {
  if (!path || path === ".") return path;
  return path
    .split(".")
    .map((seg) => {
      const idx = seg.indexOf("#");
      return idx >= 0 ? seg.slice(0, idx) : seg;
    })
    .join(".");
}

/**
 * Walk a TypeModel/ElementModel chain to resolve a dotted property path.
 * Returns the resolved element's IsArray flag and concrete type name.
 *
 * Choice elements (e.g. `value[x]`) are matched by stripping the `[x]` suffix
 * and locating a Type[] entry whose TypeName (case-insensitively) matches the
 * remainder of the segment (e.g. `valueQuantity` → `Quantity`).
 *
 * Inherited elements are resolved by walking the BaseTypeName chain.
 *
 * Path segments may contain variable-binding discriminators (`name#var_id`).
 * These are stripped when matching against the type model, but preserved in
 * the `prefix` accumulator so `createBoundaries` (also keyed on discriminated
 * paths) can be looked up correctly.
 */
function resolvePathInModel(
  rootTypeName: string,
  path: string,
  lookup: TypeLookup,
  createBoundaries?: Map<string, string>
): { isCollection: boolean; elementTypeName?: string; element?: ElementModel } | undefined {
  if (!rootTypeName) return undefined;
  if (!path || path === ".") {
    return { isCollection: false, elementTypeName: rootTypeName };
  }
  let currentType = lookup(rootTypeName);
  if (!currentType) return undefined;
  let isCollection = false;
  let elementTypeName: string | undefined;
  let element: ElementModel | undefined;
  let prefix = "";
  for (const part of path.split(".")) {
    const hashIdx = part.indexOf("#");
    const cleanPart = hashIdx >= 0 ? part.slice(0, hashIdx) : part;
    const found = findElementInType(currentType, cleanPart, lookup);
    if (!found) return undefined;
    isCollection = !!found.element.IsArray;
    elementTypeName = found.chosenTypeName;
    element = found.element;
    prefix = prefix ? `${prefix}.${part}` : part;
    // If this prefix was re-rooted by a create('Type'), switch the
    // walker to the created type for any deeper segments.
    const createdAtPrefix = createBoundaries?.get(prefix);
    if (createdAtPrefix) {
      elementTypeName = createdAtPrefix;
    }
    currentType = elementTypeName ? lookup(elementTypeName) : undefined;
  }
  return { isCollection, elementTypeName, element };
}

/**
 * Validate that `createdType` is allowed at the position described by
 * `element`. Walks the createdType's BaseTypeName chain so subtypes are
 * accepted, and resolves Reference TargetProfile URLs to short type names
 * (treating `Resource` as a wildcard).
 */
function isCreatedTypeAllowed(
  element: ElementModel,
  createdType: string,
  lookup: TypeLookup
): boolean {
  const ancestors = new Set<string>();
  let cur = lookup(createdType);
  while (cur) {
    ancestors.add(cur.TypeName);
    cur = cur.BaseTypeName ? lookup(cur.BaseTypeName) : undefined;
  }
  if (ancestors.size === 0) ancestors.add(createdType);

  for (const t of element.Type) {
    if (ancestors.has(t.TypeName)) return true;
    if (t.TypeName === "Reference" && t.TargetProfile) {
      for (const profile of t.TargetProfile) {
        const tn = profile.split("/").pop();
        if (!tn) continue;
        if (tn === "Resource") return true; // wildcard
        if (ancestors.has(tn)) return true;
      }
    }
  }
  return false;
}

/** Describe the types allowed at an element for use in error messages. */
function describeAllowedTypes(element: ElementModel): string {
  const parts: string[] = [];
  for (const t of element.Type) {
    if (t.TypeName === "Reference" && t.TargetProfile && t.TargetProfile.length > 0) {
      const targets = t.TargetProfile.map((p) => p.split("/").pop() || p);
      parts.push(`Reference(${targets.join("|")})`);
    } else {
      parts.push(t.TypeName);
    }
  }
  return parts.join(" | ") || "<none>";
}

/**
 * Find an element on a TypeModel by name, walking up BaseTypeName for
 * inherited elements and matching choice element segments such as
 * `valueQuantity` against an `ElementName` of `value[x]`.
 */
function findElementInType(
  typeModel: TypeModel | undefined,
  segment: string,
  lookup: TypeLookup
): { element: ElementModel; chosenTypeName?: string } | undefined {
  if (!typeModel) return undefined;
  // Direct name match
  const direct = typeModel.Elements.find((e) => e.ElementName === segment);
  if (direct) {
    return { element: direct, chosenTypeName: direct.Type[0]?.TypeName };
  }
  // Bare choice-element name match: segment "value" → ElementName "value[x]"
  // (the type is ambiguous, so chosenTypeName is left undefined and any
  // deeper navigation will halt unless the next segment narrows the type).
  const bareChoice = typeModel.Elements.find((e) => e.ElementName === `${segment}[x]`);
  if (bareChoice) {
    return { element: bareChoice, chosenTypeName: undefined };
  }
  // Choice element match: e.g. segment "valueQuantity" → ElementName "value[x]"
  for (const e of typeModel.Elements) {
    if (e.ElementName.endsWith("[x]")) {
      const prefix = e.ElementName.slice(0, -3);
      if (segment.length > prefix.length && segment.startsWith(prefix)) {
        const suffix = segment.slice(prefix.length);
        const match = e.Type.find(
          (t) => t.TypeName.toLowerCase() === suffix.toLowerCase()
        );
        if (match) return { element: e, chosenTypeName: match.TypeName };
      }
    }
  }
  // Walk base type chain for inherited elements
  if (typeModel.BaseTypeName) {
    return findElementInType(lookup(typeModel.BaseTypeName), segment, lookup);
  }
  return undefined;
}

/**
 * Split target type properties into primary and secondary groups.
 * A target property is "secondary" when its connectionId's source-side
 * entry (role=source) lives in ANY target type box — meaning it only
 * receives data from another target property, not from the source column.
 *
 * Ancestor properties (e.g. `entry.fullUrl` for `entry.fullUrl.value`) are
 * also moved to secondary when they only serve as parents of secondary
 * properties and have no primary connections themselves.
 */
function splitSecondaryTargets(targetTypes: DiagramType[]): {
  primary: DiagramType[];
  secondary: DiagramType[];
} {
  // Collect all connectionIds that have a source-role entry in ANY target type
  const sourceConnIds = new Set<number>();
  for (const dt of targetTypes) {
    for (const p of dt.properties) {
      if (p.role === "source" && p.connectionId !== undefined) {
        sourceConnIds.add(p.connectionId);
      }
    }
  }

  // If no source-role entries exist in any target type, nothing to split
  if (sourceConnIds.size === 0) {
    return { primary: [...targetTypes], secondary: [] };
  }

  const primary: DiagramType[] = [];
  const secondary: DiagramType[] = [];

  for (const dt of targetTypes) {
    // Identify secondary target properties: role=target whose connectionId
    // has a source-role sibling in any target type box
    const secondaryPaths = new Set<string>();
    for (const p of dt.properties) {
      if (p.role === "target" && p.connectionId !== undefined && sourceConnIds.has(p.connectionId)) {
        secondaryPaths.add(p.path);
      }
    }

    if (secondaryPaths.size === 0) {
      primary.push(dt);
      continue;
    }

    // Also mark ancestor paths that ONLY serve secondary properties.
    // An ancestor with role=target that has no independent primary connection
    // and all its descendants are secondary should move to secondary too.
    const allPaths = dt.properties.map(p => p.path);
    for (const p of dt.properties) {
      if (p.role === "target" && !secondaryPaths.has(p.path)) {
        // Check if this path is an ancestor of any secondary path
        const isAncestor = [...secondaryPaths].some(sp => sp.startsWith(p.path + "."));
        if (isAncestor) {
          // Check if it's also an ancestor of any primary (non-secondary) target
          const hasPrimaryDescendant = allPaths.some(ap => {
            if (ap === p.path) return false;
            if (!ap.startsWith(p.path + ".")) return false;
            // It's a descendant — is it primary?
            return !secondaryPaths.has(ap);
          });
          // Check if this entry itself has a primary connection (connId NOT in sourceConnIds)
          const selfPrimary = p.connectionId !== undefined && !sourceConnIds.has(p.connectionId);
          if (!hasPrimaryDescendant && !selfPrimary) {
            secondaryPaths.add(p.path);
          }
        }
      }
    }

    const primaryProps: PropertyEntry[] = [];
    const secondaryProps: PropertyEntry[] = [];
    for (const p of dt.properties) {
      if (secondaryPaths.has(p.path) && p.role === "target") {
        secondaryProps.push(p);
      } else {
        primaryProps.push(p);
      }
    }

    // Only add primary if it has properties remaining
    if (primaryProps.length > 0) {
      primary.push({
        typeName: dt.typeName,
        paramName: dt.paramName,
        properties: primaryProps,
      });
    }

    if (secondaryProps.length > 0) {
      secondary.push({
        typeName: dt.typeName,
        paramName: dt.paramName,
        properties: secondaryProps,
      });
    }
  }

  return { primary, secondary };
}

/** Global counter for assigning unique rule IDs */
let nextRuleId = 0;
let nextConnectionId = 0;

/**
 * Record a type refinement for a group's input parameter.
 *
 * If a refinement with a different value already exists, the new value is
 * accepted only when the input was originally undeclared (`originallyDeclared`
 * is false). In that case a `console.warn` is emitted so the user can see
 * that an inferred type changed during a subsequent walk. When the input was
 * originally declared, the existing refinement wins (the declaration is the
 * source of truth) and a `console.warn` is emitted instead.
 */
function setTypeRefinement(
  typeRefinements: Map<string, Map<string, string>>,
  groupName: string,
  inputName: string,
  newType: string,
  originallyDeclared: boolean
): void {
  if (!typeRefinements.has(groupName)) {
    typeRefinements.set(groupName, new Map());
  }
  const refs = typeRefinements.get(groupName)!;
  const existing = refs.get(inputName);
  if (existing === undefined) {
    refs.set(inputName, newType);
    return;
  }
  if (existing === newType) return;
  if (!originallyDeclared) {
    console.warn(
      `[structuremap_diagram_instance] type refinement for ${groupName}.${inputName} changed from "${existing}" to "${newType}" (input was undeclared)`
    );
    refs.set(inputName, newType);
  } else {
    console.warn(
      `[structuremap_diagram_instance] type refinement conflict for ${groupName}.${inputName}: keeping "${existing}", ignoring incoming "${newType}" (input is declared)`
    );
  }
}

function collectProperties(
  rules: StructureMapGroupRule[] | undefined,
  varMap: Map<string, VarInfo>,
  propsMap: Map<string, PropertyEntry[]>,
  allGroups: any[],
  visitedGroups: Set<string>,
  resolvedDependentNames: Set<string>,
  typeRefinements: Map<string, Map<string, string>>,
  typeLookup: TypeLookup,
  parentRuleId?: number,
  parentRuleName?: string
): void {
  if (!rules) return;

  for (const rule of rules) {
    const ruleId = parentRuleId ?? nextRuleId++;
    const ruleName = parentRuleName ?? rule.name;
    const connectionId = nextConnectionId++;
    const rulePos = (rule as any)._fmlPosition as { startIndex: number; endIndex: number } | undefined;

    for (const src of rule.source || []) {
      if (src.context) {
        const info = varMap.get(src.context);
        if (info && src.element) {
          const fullPath = info.path
            ? `${info.path}.${src.element}`
            : src.element;
          const entry: PropertyEntry = {
            path: fullPath,
            role: "source",
            ruleId,
            connectionId,
            ruleName,
          };
          if (src.condition) entry.filter = src.condition;
          if (src.type) entry.typeFilter = src.type;
          if (src.variable) entry.variableName = src.variable;
          if ((src as any)._fmlPosition) entry.fmlPosition = (src as any)._fmlPosition;
          if (rulePos) entry.ruleFmlPosition = rulePos;
          propsMap.get(info.rootInput)?.push(entry);
          if (src.variable) {
            varMap.set(src.variable, {
              rootInput: info.rootInput,
              path: fullPath,
              rootInputType: info.rootInputType,
            });
          }
        } else if (info && !src.element) {
          // Source references the type directly — show as $this
          const dotEntry: PropertyEntry = {
            path: ".",
            role: "source",
            ruleId,
            connectionId,
            ruleName,
          };
          if ((src as any)._fmlPosition) dotEntry.fmlPosition = (src as any)._fmlPosition;
          if (src.variable) dotEntry.variableName = src.variable;
          if (rulePos) dotEntry.ruleFmlPosition = rulePos;
          propsMap.get(info.rootInput)?.push(dotEntry);
          if (src.variable) {
            varMap.set(src.variable, {
              rootInput: info.rootInput,
              path: info.path,
              rootInputType: info.rootInputType,
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
          let fullPath = info.path
            ? `${info.path}.${tgt.element}`
            : tgt.element;
          // When a variable is bound at a target collection element,
          // append a `#var_connectionId` discriminator so each binding
          // occurrence becomes its own row (e.g. multiple Bundle entries
          // created by sibling rules don't collapse into one).
          //
          // The discriminator is keyed on the variable name plus the
          // rule's connectionId so two distinct rules that happen to use
          // the same variable name (e.g. both bind `tgt.entry as entry`)
          // each get their own row, while the variable itself remains
          // usable as a context for any sub-rules in this same rule.
          if (tgt.variable && info.rootInputType) {
            const cleanPath = stripPathDiscriminators(fullPath);
            const resolved = resolvePathInModel(info.rootInputType, cleanPath, typeLookup);
            if (resolved?.isCollection) {
              fullPath = `${fullPath}#${tgt.variable}_${connectionId}`;
            }
          }
          const entry: PropertyEntry = {
            path: fullPath,
            role: "target",
            ruleId,
            connectionId,
            ruleName,
          };
          const fixedDesc = describeFixedValue(tgt);
          if (fixedDesc) entry.fixedValue = fixedDesc;
          // Detect node creation: explicit create/cc/c transform, or variable assigned with sub-rules
          if (isCreateTransform(tgt.transform) ||
              (tgt.variable && rule.rule && rule.rule.length > 0)) {
            entry.isCreated = true;
            entry.createdType = getCreatedType(tgt);
          }
          // Detect function transforms (not fixed values, not creates)
          let fnDesc: string | undefined;
          if (!entry.fixedValue && !entry.isCreated) {
            fnDesc = describeTransformFunction(tgt);
            if (fnDesc) entry.transformFunction = fnDesc;
          }
          // Mark targets that don't consume source data (literal values or
          // self-contained functions with no variable references)
          const hasVariableRef = (tgt.parameter || []).some((p: any) => p.valueId !== undefined);
          if (entry.fixedValue || (fnDesc && !hasVariableRef)) {
            entry.noSourceData = true;
          }
          // Explicit create/cc/c transforms that don't reference source
          // variables don't consume source data — UNLESS the target also
          // serves as context for sub-rules (variable + sub-rules), in which
          // case data flows through the sub-rules.
          const isCreateContext = tgt.variable && rule.rule && rule.rule.length > 0;
          if (isCreateTransform(tgt.transform) && !hasVariableRef && !isCreateContext) {
            entry.noSourceData = true;
          }
          // A target with a variable allocated but not receiving data from
          // the source (no copy-from-source transform) is effectively a
          // "create" — show it with an asterisk and suppress the connector
          // back to the source.  Exception: a simple copy (valueId reference).
          if (tgt.variable && !entry.isCreated && !hasVariableRef) {
            entry.isCreated = true;
            entry.noSourceData = true;
          }
          if ((tgt as any)._fmlPosition) entry.fmlPosition = (tgt as any)._fmlPosition;
          if (tgt.variable) entry.variableName = tgt.variable;
          if (rulePos) entry.ruleFmlPosition = rulePos;
          propsMap.get(info.rootInput)?.push(entry);
          lastTargetRootInput = info.rootInput;
          if (tgt.variable) {
            // Always preserve path stitching so nested rules using this
            // variable as context (e.g. `resource.status` after
            // `entry.resource = create('Observation') as resource`) push
            // their property entries at the correct path within the box.
            // `fullPath` here may include a `#var_connectionId`
            // discriminator (added above when binding to a collection);
            // sub-rules will inherit that discriminator so their entries
            // group under the correct binding row.
            // The createdType is recorded separately on the entry's
            // PropertyEntry already (entry.createdType) and is also used
            // during dependent-call inference below via varMap.createdType.
            const createdType = getCreatedType(tgt);
            varMap.set(tgt.variable, {
              rootInput: info.rootInput,
              path: fullPath,
              rootInputType: info.rootInputType,
              createdType: createdType,
            });
          }
        }
      }
    }

    // Walk through dependent group calls transparently — resolve their
    // property mappings back into the parent group's source/target type boxes.
    for (const dep of rule.dependent || []) {
      if (!dep.name || visitedGroups.has(dep.name)) continue;

      const refGroup = allGroups.find((g: any) => g.name === dep.name);
      if (!refGroup) continue;

      // Build a new varMap that maps the dependent group's input names
      // to the parent's variable contexts using dep.variable[] positional mapping.
      const depVarMap = new Map<string, VarInfo>(varMap);
      const depInputs = refGroup.input || [];
      const passedVars = dep.variable || [];

      // If dep.variable is missing, infer from rule's source/target variables
      if (passedVars.length === 0) {
        for (const src of rule.source || []) {
          if (src.variable) passedVars.push(src.variable);
        }
        for (const tgt of rule.target || []) {
          if (tgt.variable) passedVars.push(tgt.variable);
        }
      }

      for (let i = 0; i < depInputs.length && i < passedVars.length; i++) {
        const inputName = depInputs[i].name;
        const varName = passedVars[i];
        const parentVarInfo = varMap.get(varName);
        if (parentVarInfo) {
          depVarMap.set(inputName, { ...parentVarInfo });
        }
      }

      // Collect type refinements: if the dependent group's input declares a
      // type, propagate it back to the calling group's input for the
      // corresponding rootInput (replacing empty/"Any" types).
      for (let i = 0; i < depInputs.length && i < passedVars.length; i++) {
        const depInput = depInputs[i];
        const varName = passedVars[i];
        const parentVarInfo = varMap.get(varName);
        if (parentVarInfo && depInput.type) {
          // Walk up visitedGroups chain to find all calling groups and
          // record the refinement for the rootInput parameter.
          for (const visitedName of visitedGroups) {
            const visitedGroup = allGroups.find((g: any) => g.name === visitedName);
            if (!visitedGroup) continue;
            const matchingInput = (visitedGroup.input || []).find(
              (inp: any) => inp.name === parentVarInfo.rootInput
            );
            if (matchingInput) {
              setTypeRefinement(
                typeRefinements, visitedName, parentVarInfo.rootInput,
                depInput.type, !!matchingInput.type
              );
            }
          }
        }
      }

      // Inverse direction: when the dependent group's input has NO declared
      // type, infer it from the caller's variable (rootInputType walked
      // through the variable's path) and refine the dependent group's input.
      // This lets dependent groups inherit types from their callers.
      for (let i = 0; i < depInputs.length && i < passedVars.length; i++) {
        const depInput = depInputs[i];
        if (depInput.type) continue; // declared — nothing to infer
        const varName = passedVars[i];
        const parentVarInfo = varMap.get(varName);
        if (!parentVarInfo) continue;
        // Prefer the createdType when this variable was bound by
        // `create('Type') as v` — the model can't necessarily walk to
        // the created subtype from the static element type.
        let inferredType: string | undefined = parentVarInfo.createdType;
        if (!inferredType) {
          if (!parentVarInfo.rootInputType) continue;
          const resolved = resolvePathInModel(
            parentVarInfo.rootInputType, parentVarInfo.path, typeLookup
          );
          inferredType = resolved?.elementTypeName;
        }
        if (!inferredType) continue;
        // Update the depVarMap entry to carry the inferred type forward so
        // any nested dependent calls in this branch can keep inferring.
        const dvi = depVarMap.get(depInput.name);
        if (dvi) {
          depVarMap.set(depInput.name, { ...dvi, rootInputType: inferredType, createdType: undefined });
        }
        // Record refinement against the dependent group; depInput was
        // originally undeclared so conflicts are allowed (with a warning).
        setTypeRefinement(
          typeRefinements, dep.name, depInput.name,
          inferredType, false
        );
      }

      // Track which groups are resolved as dependents
      resolvedDependentNames.add(dep.name);

      const nestedVisited = new Set(visitedGroups);
      nestedVisited.add(dep.name);

      // Recurse into dependent group's rules with the SAME propsMap,
      // so its properties flow into the parent's type boxes.
      collectProperties(
        refGroup.rule, depVarMap, propsMap,
        allGroups, nestedVisited, resolvedDependentNames, typeRefinements, typeLookup, ruleId, ruleName
      );
    }

    collectProperties(rule.rule, varMap, propsMap, allGroups, visitedGroups, resolvedDependentNames, typeRefinements, typeLookup, ruleId, ruleName);
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
  return !!transform && (transform === "create" || transform in SHORTCUT_TRANSFORM_TYPES);
}

/** Mapping from FHIR Mapping Language shortcut transforms to the FHIR
 *  type they construct. `create('Type')` is handled separately because
 *  it takes the type as a parameter. */
const SHORTCUT_TRANSFORM_TYPES: Readonly<Record<string, string>> = Object.freeze({
  cc: "CodeableConcept",
  c: "Coding",
  qty: "Quantity",
  id: "Identifier",
  cp: "ContactPoint",
});

/** Extract the type name produced by a create/cc/c/qty/id/cp transform. */
function getCreatedType(tgt: { transform?: string; parameter?: any[] }): string | undefined {
  if (!tgt.transform) return undefined;
  if (tgt.transform === "create" && tgt.parameter && tgt.parameter.length > 0) {
    const p = tgt.parameter[0];
    if (p.valueString) return p.valueString;
  }
  return SHORTCUT_TRANSFORM_TYPES[tgt.transform];
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
const CONNECTOR_GAP = 140;
const CONNECTOR_PORT_RADIUS = 4;
const CONNECTOR_PORT_SIZE = 8;
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
  /** Whether this entry was produced by a source or target context */
  role?: "source" | "target";
  /** Filter/where condition if present */
  filter?: string;
  /** Type filter if present */
  typeFilter?: string;
  /** Fixed/literal value if present */
  fixedValue?: string;
  /** Rule identifier for grouping and connector lines */
  ruleId?: number;
  /** Concrete rule identifier for direct property-to-property connectors */
  connectionId?: number;
  /** Additional connectionIds merged from deduplicated entries */
  additionalConnectionIds?: number[];
  /** The name of the top-level rule */
  ruleName?: string;
  /** When true, this target property creates a new node */
  isCreated?: boolean;
  /** The type name being created */
  createdType?: string;
  /** Function call description */
  transformFunction?: string;
  /** Source position in FML text */
  fmlPosition?: { startIndex: number; endIndex: number };
  /** Rule-level FML position */
  ruleFmlPosition?: { startIndex: number; endIndex: number };
  /** Variable name assigned to this property */
  variableName?: string;
  /** True when the resolved type model element is a collection (IsArray) */
  isCollection?: boolean;
  /** Resolved element type name from the type model (for tooltip) */
  elementTypeName?: string;
  /** True when the property path could not be resolved against the type model */
  unknownElement?: boolean;
  /** Human-readable validation error (overrides default tooltip) */
  validationError?: string;
}

/**
 * Stable tree-sort: reorder entries so that children immediately follow
 * their deepest present ancestor, preserving original relative order
 * among siblings at each level.
 */
function treeSortProperties(entries: PropertyEntry[]): PropertyEntry[] {
  if (entries.length <= 1) return entries;

  const pathSet = new Set(entries.map(e => e.path));

  function findParent(path: string): string {
    const parts = path.split(".");
    for (let i = parts.length - 1; i >= 1; i--) {
      const candidate = parts.slice(0, i).join(".");
      if (pathSet.has(candidate)) return candidate;
    }
    return "";
  }

  // Group entries by parent path, preserving insertion order
  const childrenOf = new Map<string, number[]>();
  childrenOf.set("", []);
  for (let i = 0; i < entries.length; i++) {
    const parent = findParent(entries[i].path);
    if (!childrenOf.has(parent)) {
      childrenOf.set(parent, []);
    }
    childrenOf.get(parent)!.push(i);
  }

  // DFS walk preserving sibling order
  const result: PropertyEntry[] = [];
  const visited = new Set<number>();
  function walk(parentPath: string) {
    for (const idx of childrenOf.get(parentPath) || []) {
      if (visited.has(idx)) continue;
      visited.add(idx);
      result.push(entries[idx]);
      walk(entries[idx].path);
    }
  }
  walk("");

  // Safety: add any unreached entries
  for (let i = 0; i < entries.length; i++) {
    if (!visited.has(i)) result.push(entries[i]);
  }
  return result;
}

/**
 * Remove duplicate property entries — same path + role + annotations.
 * Keeps the first occurrence. Merges connectionIds from dropped duplicates
 * into the surviving entry's additionalConnectionIds.
 */
function deduplicateProperties(entries: PropertyEntry[]): PropertyEntry[] {
  const seen = new Map<string, PropertyEntry>();
  const result: PropertyEntry[] = [];
  for (const e of entries) {
    const key = `${e.path}|${e.role || ""}|${e.filter || ""}|${e.typeFilter || ""}|${e.fixedValue || ""}|${e.isCreated ? "c" : ""}|${e.createdType || ""}`;
    const existing = seen.get(key);
    if (existing) {
      if (e.connectionId !== undefined) {
        if (!existing.additionalConnectionIds) existing.additionalConnectionIds = [];
        existing.additionalConnectionIds.push(e.connectionId);
      }
    } else {
      seen.set(key, e);
      result.push(e);
    }
  }
  return result;
}

/**
 * Transform property entries into display items with tree indentation.
 * Child properties are indented under their parent when the parent is present.
 */
function buildPropertyDisplay(properties: PropertyEntry[]): PropertyDisplay[] {
  const pathSet = new Set(properties.filter((p) => p.path).map((p) => p.path));
  return properties.map((entry) => {
    const parts = entry.path.split(".");
    let deepestAncestorDepth = 0;
    for (let i = 1; i < parts.length; i++) {
      const parentPath = parts.slice(0, i).join(".");
      if (pathSet.has(parentPath)) {
        deepestAncestorDepth = i;
      }
    }
    // Strip variable-binding discriminators (`#var_id`) from each segment
    // so the user sees the real FHIR path, not internal disambiguators.
    const displayName = stripPathDiscriminators(parts.slice(deepestAncestorDepth).join("."));
    return {
      displayName,
      depth: deepestAncestorDepth,
      fullPath: stripPathDiscriminators(entry.path),
      role: entry.role,
      filter: entry.filter,
      typeFilter: entry.typeFilter,
      fixedValue: entry.fixedValue,
      ruleId: entry.ruleId,
      connectionId: entry.connectionId,
      additionalConnectionIds: entry.additionalConnectionIds,
      ruleName: entry.ruleName,
      isCreated: entry.isCreated,
      createdType: entry.createdType,
      transformFunction: entry.transformFunction,
      fmlPosition: entry.fmlPosition,
      ruleFmlPosition: entry.ruleFmlPosition,
      variableName: entry.variableName,
      isCollection: entry.isCollection,
      elementTypeName: entry.elementTypeName,
      unknownElement: entry.unknownElement,
      validationError: entry.validationError,
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

interface ConnectionAnchor {
  x: number;
  y: number;
  boxMode: "source" | "target";
}

interface PropertyMarker {
  x: number;
  y: number;
  mode: "source" | "target";
  connectionId?: number;
}

const FILTER_ICON_SPACE = 18;
const RULE_DIVIDER_HEIGHT = 16;

function typeBoxLabel(type: DiagramType): string {
  return type.typeName ? `${type.typeName} (${type.paramName})` : type.paramName;
}

function calcTypeBoxSize(type: DiagramType): {
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
    const collectionSuffixLen = pd.isCollection ? 2 : 0;
    const labelLen = pd.variableName
      ? pd.displayName.length + collectionSuffixLen + ` (${pd.variableName})`.length
      : pd.displayName.length + collectionSuffixLen;
    const w = pd.depth * PROP_INDENT + labelLen * CHAR_WIDTH + iconExtra;
    if (w > maxPropWidth) maxPropWidth = w;
  }
  const propsWidth = maxPropWidth + 2 * TYPE_BOX_PADDING_X;

  const width = Math.max(MIN_TYPE_WIDTH, headerWidth, propsWidth);
  const propCount = Math.max(propDisplay.length, 1);
  const dividerCount = countRuleDividers(propDisplay);
  const height =
    TYPE_HEADER_HEIGHT + propCount * PROP_LINE_HEIGHT + dividerCount * RULE_DIVIDER_HEIGHT + TYPE_BOX_PADDING_Y;

  return { width, height, propDisplay };
}

/** Count the number of rule headers in a property display list (first + transitions) */
function countRuleDividers(propDisplay: PropertyDisplay[]): number {
  if (propDisplay.length === 0) return 0;
  let count = 1; // first rule header
  for (let i = 1; i < propDisplay.length; i++) {
    if (propDisplay[i].ruleId !== propDisplay[i - 1].ruleId) {
      count++;
    }
  }
  return count;
}

// ===== Sankey Ribbon Helpers =====

const SANKEY_RIBBON_THICKNESS = 6;
const SANKEY_RIBBON_COLOR = "rgba(108, 117, 125, 0.18)";

/** Find the type box whose vertical center is closest to the given y coordinate. */
function findNearestBox(boxes: TypeBoxLayout[], y: number): TypeBoxLayout | undefined {
  if (boxes.length === 0) return undefined;
  let best = boxes[0];
  let bestDist = Math.abs(y - (best.y + best.height / 2));
  for (let i = 1; i < boxes.length; i++) {
    const d = Math.abs(y - (boxes[i].y + boxes[i].height / 2));
    if (d < bestDist) { best = boxes[i]; bestDist = d; }
  }
  return best;
}

/** Clamp a y coordinate to the vertical extent of a type box (header to bottom). */
function clampY(y: number, box: TypeBoxLayout): number {
  const top = box.y + TYPE_HEADER_HEIGHT + 4;
  const bottom = box.y + box.height - 4;
  return Math.max(top, Math.min(bottom, y));
}

/** Render a sankey-style curved ribbon between two points. */
function renderSankeyRibbon(
  svg: string[],
  x0: number, y0: number,
  x1: number, y1: number,
  tooltip: string,
): void {
  const half = SANKEY_RIBBON_THICKNESS / 2;
  const cp = (x1 - x0) * 0.5;
  const y0t = y0 - half, y0b = y0 + half;
  const y1t = y1 - half, y1b = y1 + half;
  svg.push(
    `<path class="sm-sankey-ribbon" d="M${x0} ${y0t} C${x0 + cp} ${y0t} ${x1 - cp} ${y1t} ${x1} ${y1t} L${x1} ${y1b} C${x1 - cp} ${y1b} ${x0 + cp} ${y0b} ${x0} ${y0b} Z" fill="${SANKEY_RIBBON_COLOR}">${tooltip}</path>`
  );
}

// ===== Main SVG Generator =====

/**
 * Generate an SVG diagram from a FHIR StructureMap resource.
 * Each group is rendered as a box containing source and target type boxes
 * with the properties read/written listed inside each type box.
 */
export function generateInstanceDiagramSvg(map: StructureMap, typeLookup?: TypeLookup, showMissingProperties?: boolean): string {
  const data = extractStructureMapDiagram(map, typeLookup, showMissingProperties);

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
      ...calcTypeBoxSize(t),
      type: t,
    }));
    const targetSizes = group.targetTypes.map((t) => ({
      ...calcTypeBoxSize(t),
      type: t,
    }));
    const secondaryTargetSizes = group.secondaryTargetTypes.map((t) => ({
      ...calcTypeBoxSize(t),
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
    const secondaryColWidth = secondaryTargetSizes.reduce(
      (max, s) => Math.max(max, s.width),
      0
    );

    const sourceColHeight =
      sourceSizes.reduce((sum, s) => sum + s.height, 0) +
      Math.max(0, sourceSizes.length - 1) * TYPE_GAP;
    const targetColHeight =
      targetSizes.reduce((sum, s) => sum + s.height, 0) +
      Math.max(0, targetSizes.length - 1) * TYPE_GAP;
    const secondaryColHeight =
      secondaryTargetSizes.reduce((sum, s) => sum + s.height, 0) +
      Math.max(0, secondaryTargetSizes.length - 1) * TYPE_GAP;

    const hasConnectors = sourceSizes.length > 0 && targetSizes.length > 0;
    const connectorSpace = hasConnectors ? CONNECTOR_GAP : 0;
    const hasSecondaryConnectors = secondaryTargetSizes.length > 0;
    const secondaryConnectorSpace = hasSecondaryConnectors ? CONNECTOR_GAP : 0;
    const contentHeight = Math.max(sourceColHeight, targetColHeight, secondaryColHeight, 40);

    const groupWidth =
      GROUP_PADDING * 2 + sourceColWidth + connectorSpace + targetColWidth +
      secondaryConnectorSpace + secondaryColWidth;
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

    // Target column (middle)
    let ty = currentY + GROUP_HEADER_HEIGHT + GROUP_PADDING;
    if (targetColHeight < contentHeight)
      ty += (contentHeight - targetColHeight) / 2;
    for (const ts of targetSizes) {
      typeBoxes.push({
        x: PADDING + GROUP_PADDING + sourceColWidth + connectorSpace,
        y: ty,
        width: targetColWidth,
        height: ts.height,
        type: ts.type,
        mode: "target",
        propDisplay: ts.propDisplay,
      });
      ty += ts.height + TYPE_GAP;
    }

    // Secondary target column (right-most)
    let sty = currentY + GROUP_HEADER_HEIGHT + GROUP_PADDING;
    if (secondaryColHeight < contentHeight)
      sty += (contentHeight - secondaryColHeight) / 2;
    const secondaryX = PADDING + GROUP_PADDING + sourceColWidth + connectorSpace + targetColWidth + secondaryConnectorSpace;
    for (const sts of secondaryTargetSizes) {
      typeBoxes.push({
        x: secondaryX,
        y: sty,
        width: secondaryColWidth,
        height: sts.height,
        type: sts.type,
        mode: "target",
        propDisplay: sts.propDisplay,
      });
      sty += sts.height + TYPE_GAP;
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
    `.sm-rule-header { font-size: 9px; font-weight: 600; fill: #495057; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }`
  );
  svg.push(
    `.sm-connector-line { stroke: ${COLORS.arrowColor}; stroke-width: 1.35; stroke-linecap: round; opacity: 0.95; }`
  );
  svg.push(
    `.sm-connector-port-source { fill: ${COLORS.typeBg}; stroke: ${COLORS.sourceHeaderText}; stroke-width: 1.6; }`
  );
  svg.push(
    `.sm-connector-port-source-connected { fill: ${COLORS.sourceHeaderText}; stroke: ${COLORS.sourceHeaderText}; stroke-width: 1.6; }`
  );
  svg.push(
    `.sm-connector-port-target { fill: ${COLORS.typeBg}; stroke: ${COLORS.targetHeaderText}; stroke-width: 1.6; }`
  );
  svg.push(
    `.sm-connector-port-target-connected { fill: ${COLORS.targetHeaderText}; stroke: ${COLORS.targetHeaderText}; stroke-width: 1.6; }`
  );
  svg.push(
    `.sm-function-icon { cursor: default; }`
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
      `<text x="${gl.x + gl.width / 2}" y="${gl.y + GROUP_HEADER_HEIGHT / 2 + 5}" text-anchor="middle" class="sm-group-title">${escapeXml(gl.group.name)}</text>`
    );
    // Clickable overlay for group header
    if (groupPos) {
      svg.push(
        `<rect x="${gl.x}" y="${gl.y}" width="${gl.width}" height="${GROUP_HEADER_HEIGHT}" fill="transparent"${groupPosAttrs} />`
      );
    }

    // Track per-property anchors
    const connectionAnchors = new Map<number, {
      sourceAnchors: ConnectionAnchor[];
      targetAnchors: ConnectionAnchor[];
      ruleName?: string;
    }>();
    const propertyMarkers: PropertyMarker[] = [];

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
        `<text x="${tb.x + TYPE_BOX_PADDING_X}" y="${tb.y + TYPE_HEADER_HEIGHT / 2 + 5}" class="sm-type-title ${titleCls}">${escapeXml(label)}</text>`
      );
      // Clickable overlay for type box header
      if (typePos) {
        svg.push(
          `<rect x="${tb.x}" y="${tb.y}" width="${tb.width}" height="${TYPE_HEADER_HEIGHT}" fill="transparent"${typePosAttrs} />`
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

          // Rule header bar: first rule and between different rules
          if (pi === 0 || pd.ruleId !== tb.propDisplay[pi - 1].ruleId) {
            const divY = propY - PROP_LINE_HEIGHT + 4;
            const rulePos = pd.ruleFmlPosition;
            const rulePosAttrs = rulePos ? ` data-pos-start="${rulePos.startIndex}" data-pos-end="${rulePos.endIndex}"` : "";
            svg.push(
              `<rect x="${tb.x + 1}" y="${divY}" width="${tb.width - 2}" height="${RULE_DIVIDER_HEIGHT}" fill="#e9ecef"${rulePosAttrs} />`
            );
            if (pd.ruleName) {
              svg.push(
                `<text x="${tb.x + 6}" y="${divY + RULE_DIVIDER_HEIGHT - 4}" class="sm-rule-header"${rulePosAttrs}>${escapeXml(pd.ruleName)}</text>`
              );
            }
            propY += RULE_DIVIDER_HEIGHT;
          }

          if (pd.connectionId !== undefined) {
            const centerY = propY - PROP_LINE_HEIGHT / 2 + 4;
            // Use the property's role to determine anchor side:
            // source-role properties anchor on the right (source port), even in a target box
            // target-role properties anchor on the left (target port), even in a source box
            // Fallback to tb.mode when role is not set
            const effectiveRole = pd.role || tb.mode;
            const anchorX = effectiveRole === "source" ? tb.x + tb.width : tb.x;
            if (!connectionAnchors.has(pd.connectionId)) {
              connectionAnchors.set(pd.connectionId, {
                sourceAnchors: [],
                targetAnchors: [],
                ruleName: pd.ruleName,
              });
            }
            const entry = connectionAnchors.get(pd.connectionId)!;
            if (!entry.ruleName && pd.ruleName) {
              entry.ruleName = pd.ruleName;
            }
            const anchor: ConnectionAnchor = { x: anchorX, y: centerY, boxMode: tb.mode };
            if (effectiveRole === "source") {
              entry.sourceAnchors.push(anchor);
            } else {
              entry.targetAnchors.push(anchor);
            }
            propertyMarkers.push({ x: anchorX, y: centerY, mode: effectiveRole, connectionId: pd.connectionId });

            // Create anchors for additional connectionIds merged from deduplication
            for (const addlConnId of pd.additionalConnectionIds || []) {
              if (!connectionAnchors.has(addlConnId)) {
                connectionAnchors.set(addlConnId, {
                  sourceAnchors: [],
                  targetAnchors: [],
                  ruleName: pd.ruleName,
                });
              }
              const addlEntry = connectionAnchors.get(addlConnId)!;
              if (!addlEntry.ruleName && pd.ruleName) {
                addlEntry.ruleName = pd.ruleName;
              }
              const addlAnchor: ConnectionAnchor = { x: anchorX, y: centerY, boxMode: tb.mode };
              if (effectiveRole === "source") {
                addlEntry.sourceAnchors.push(addlAnchor);
              } else {
                addlEntry.targetAnchors.push(addlAnchor);
              }
              propertyMarkers.push({ x: anchorX, y: centerY, mode: effectiveRole, connectionId: addlConnId });
            }
          }

          const px = tb.x + TYPE_BOX_PADDING_X + pd.depth * PROP_INDENT;
          const collectionSuffix = pd.isCollection ? "[]" : "";
          const baseName = `${pd.displayName}${collectionSuffix}`;
          const propLabel = pd.variableName ? `${baseName} (${pd.variableName})` : baseName;

          // Pale red background for properties whose path doesn't resolve
          // against the type model.
          if (pd.unknownElement) {
            const rowTop = propY - PROP_LINE_HEIGHT + 4;
            svg.push(
              `<rect x="${tb.x + 1}" y="${rowTop}" width="${tb.width - 2}" height="${PROP_LINE_HEIGHT}" fill="#fdecea" />`
            );
          }

          svg.push(
            `<text x="${px}" y="${propY}" class="sm-prop">${escapeXml(propLabel)}</text>`
          );
          // Right-aligned annotation icons; created icon before (left of) filter/fixed/function
          const hasCreated = pd.isCreated;
          const hasFunction = !hasCreated && !!pd.transformFunction;
          const hasAnnot = !!(pd.filter || pd.typeFilter || pd.fixedValue || hasFunction);
          const rightIconX = tb.x + tb.width - TYPE_BOX_PADDING_X - 12;
          const createdIconX = (hasCreated && hasAnnot) ? rightIconX - 16 : rightIconX;
          if (pd.filter) {
            const iconY = propY - 10;
            svg.push(
              `<g class="sm-filter-icon" transform="translate(${rightIconX}, ${iconY})">` +
              `<title>where: ${escapeXml(pd.filter)}</title>` +
              `<rect x="0" y="0" width="14" height="12" fill="transparent" />` +
              `<path d="M1 1h12l-4.5 5.5V11l-3-1.5V6.5L1 1z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round" stroke-linecap="round" />` +
              `</g>`
            );
          } else if (pd.typeFilter) {
            const iconY = propY - 10;
            svg.push(
              `<g class="sm-filter-icon" transform="translate(${rightIconX}, ${iconY})">` +
              `<title>Type: ${escapeXml(pd.typeFilter)}</title>` +
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
          }
          if (hasFunction) {
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
          // Clickable + hoverable overlay for property row
          {
            const rowTop = propY - PROP_LINE_HEIGHT + 4;
            const posAttrs = pd.fmlPosition
              ? ` data-pos-start="${pd.fmlPosition.startIndex}" data-pos-end="${pd.fmlPosition.endIndex}"`
              : "";
            let tooltipText = pd.elementTypeName
              ? `${pd.elementTypeName}${pd.isCollection ? "[]" : ""}`
              : "";
            if (pd.validationError) {
              tooltipText = pd.validationError;
            } else if (pd.unknownElement) {
              tooltipText = tooltipText
                ? `${tooltipText} (unknown element)`
                : "unknown element";
            }
            const tooltipChild = tooltipText ? `<title>${escapeXml(tooltipText)}</title>` : "";
            if (posAttrs || tooltipChild) {
              svg.push(
                `<rect x="${tb.x + 1}" y="${rowTop}" width="${tb.width - 2}" height="${PROP_LINE_HEIGHT}" fill="transparent"${posAttrs}>${tooltipChild}</rect>`
              );
            }
          }
          propY += PROP_LINE_HEIGHT;
        }
      }
    }

    // Draw connectors
    for (const [connId, positions] of connectionAnchors) {
      if (positions.sourceAnchors.length === 0 || positions.targetAnchors.length === 0) {
        continue;
      }

      const tooltip = positions.ruleName ? `<title>rule: ${escapeXml(positions.ruleName)}</title>` : "";

      // Detect target-to-target connectors (both anchors in target boxes)
      const isTargetToTarget =
        positions.sourceAnchors.every(a => a.boxMode === "target") &&
        positions.targetAnchors.every(a => a.boxMode === "target");
      const dashAttr = isTargetToTarget ? ' stroke-dasharray="6 3"' : "";
      const connectorCls = isTargetToTarget ? "sm-connector-line sm-connector-line-dashed" : "sm-connector-line";

      // Direct source → target
      for (const sourceAnchor of positions.sourceAnchors) {
        for (const targetAnchor of positions.targetAnchors) {
          svg.push(
            `<g class="sm-connector">${tooltip}` +
            `<line class="${connectorCls}" x1="${sourceAnchor.x}" y1="${sourceAnchor.y}" x2="${targetAnchor.x}" y2="${targetAnchor.y}"${dashAttr} />` +
            `</g>`
          );
        }
      }
    }

    // Sankey-style ribbons for orphan connectionIds (one side only).
    // With dedup merging additionalConnectionIds, most orphans are eliminated.
    // For any remaining, connect to a source/target from the same rule (by ruleName)
    // rather than the nearest box edge.
    const connectedByRule = new Map<string, { sourceAnchors: ConnectionAnchor[], targetAnchors: ConnectionAnchor[] }>();
    for (const [, pos] of connectionAnchors) {
      if (pos.sourceAnchors.length > 0 && pos.targetAnchors.length > 0 && pos.ruleName) {
        if (!connectedByRule.has(pos.ruleName)) {
          connectedByRule.set(pos.ruleName, { sourceAnchors: [], targetAnchors: [] });
        }
        const ruleEntry = connectedByRule.get(pos.ruleName)!;
        ruleEntry.sourceAnchors.push(...pos.sourceAnchors);
        ruleEntry.targetAnchors.push(...pos.targetAnchors);
      }
    }
    for (const [connId, positions] of connectionAnchors) {
      if (positions.sourceAnchors.length > 0 && positions.targetAnchors.length > 0) continue;
      // Orphan: only one side has anchors — find matching side from same rule
      const tooltip = positions.ruleName ? `<title>rule: ${escapeXml(positions.ruleName)}</title>` : "";
      const ruleAnchors = positions.ruleName ? connectedByRule.get(positions.ruleName) : undefined;
      if (positions.targetAnchors.length > 0 && positions.sourceAnchors.length === 0) {
        // Target-only orphan: draw ribbon from same-rule source anchor
        if (ruleAnchors && ruleAnchors.sourceAnchors.length > 0) {
          const srcAnchor = ruleAnchors.sourceAnchors[0];
          for (const tgtAnchor of positions.targetAnchors) {
            renderSankeyRibbon(svg, srcAnchor.x, srcAnchor.y, tgtAnchor.x, tgtAnchor.y, tooltip);
          }
        }
      } else if (positions.sourceAnchors.length > 0 && positions.targetAnchors.length === 0) {
        // Source-only orphan: draw ribbon to same-rule target anchor
        if (ruleAnchors && ruleAnchors.targetAnchors.length > 0) {
          const tgtAnchor = ruleAnchors.targetAnchors[0];
          for (const srcAnchor of positions.sourceAnchors) {
            renderSankeyRibbon(svg, srcAnchor.x, srcAnchor.y, tgtAnchor.x, tgtAnchor.y, tooltip);
          }
        }
      }
    }

    // Collect connectionIds that have actual connectors drawn
    // Collect connectionIds that have actual connectors drawn
    // (both source and target present, OR sankey ribbon drawn for orphans)
    const connectedIds = new Set<number>();
    for (const [connId, positions] of connectionAnchors) {
      const hasSource = positions.sourceAnchors.length > 0;
      const hasTarget = positions.targetAnchors.length > 0;
      if (hasSource && hasTarget) {
        connectedIds.add(connId);
      } else {
        // Orphan with sankey ribbon drawn (if same-rule anchors were found)
        const ruleAnchors = positions.ruleName ? connectedByRule.get(positions.ruleName) : undefined;
        if (ruleAnchors) {
          if (hasTarget && ruleAnchors.sourceAnchors.length > 0) connectedIds.add(connId);
          if (hasSource && ruleAnchors.targetAnchors.length > 0) connectedIds.add(connId);
        }
      }
    }

    // Draw connector ports on type box properties
    for (const marker of propertyMarkers) {
      const isFilled = marker.connectionId !== undefined && connectedIds.has(marker.connectionId);
      if (marker.mode === "source") {
        const cls = isFilled ? "sm-connector-port-source-connected" : "sm-connector-port-source";
        svg.push(
          `<circle class="${cls}" cx="${marker.x}" cy="${marker.y}" r="${CONNECTOR_PORT_RADIUS}" />`
        );
      } else {
        const cls = isFilled ? "sm-connector-port-target-connected" : "sm-connector-port-target";
        svg.push(
          `<rect class="${cls}" x="${marker.x - CONNECTOR_PORT_SIZE / 2}" y="${marker.y - CONNECTOR_PORT_SIZE / 2}" width="${CONNECTOR_PORT_SIZE}" height="${CONNECTOR_PORT_SIZE}" rx="1.5" />`
        );
      }
    }
  }

  svg.push("</svg>");
  return svg.join("\n");
}

// ===== FML → FHIR StructureMap converter (diagram subset) =====

function convertFmlTransformParams(
  params: { type: string; value: string | number | boolean }[]
): any[] {
  return params.map((p) => {
    if (p.type === "identifier") return { valueId: String(p.value) };
    if (typeof p.value === "boolean") return { valueBoolean: p.value };
    if (typeof p.value === "number") return { valueInteger: p.value };
    return { valueString: String(p.value) };
  });
}

function convertFmlRules(rules: FmlRule[]): StructureMapGroupRule[] {
  return rules.map((r) => {
    const fhirRule: StructureMapGroupRule = {
      name: r.name ?? "",
      source: r.sources.map((s) => {
        const src: any = {
          context: s.context,
          element: s.element,
          variable: s.variable,
          condition: s.condition,
          type: s.type,
        };
        if (s.position) src._fmlPosition = { startIndex: s.position.startIndex, endIndex: s.position.endIndex };
        return src;
      }),
      target: r.targets.map((t) => {
        const tgt: any = {
          context: t.context,
          element: t.element,
          variable: t.variable,
          transform: t.transform?.type as any,
          parameter: t.transform?.parameters
            ? convertFmlTransformParams(t.transform.parameters)
            : undefined,
        };
        if (t.position) tgt._fmlPosition = { startIndex: t.position.startIndex, endIndex: t.position.endIndex };
        return tgt;
      }),
    };
    // Attach rule-level FML position
    if (r.position) {
      (fhirRule as any)._fmlPosition = { startIndex: r.position.startIndex, endIndex: r.position.endIndex };
    }

    // Dependent invocations → FHIR dependent[]
    const deps: any[] = [];
    if (r.dependent?.invocations) {
      for (const inv of r.dependent.invocations) {
        deps.push({
          name: inv.name,
          variable: inv.parameters.map((p) => String(p.value)),
        });
      }
    }
    if (deps.length > 0) fhirRule.dependent = deps;

    // Nested rules: FML stores them in dependent.rules
    const nested: FmlRule[] = [];
    if (r.dependent?.rules) nested.push(...r.dependent.rules);
    if (nested.length > 0) {
      fhirRule.rule = convertFmlRules(nested);
    }

    return fhirRule;
  });
}

/**
 * Convert an FmlStructureMap (from the local FML parser) into a minimal FHIR
 * StructureMap resource — just enough for `extractStructureMapDiagram` /
 * `generateInstanceDiagramSvg` to work.
 */
export function fmlToStructureMapForDiagram(fml: FmlStructureMap): StructureMap {
  return {
    resourceType: "StructureMap",
    status: "draft",
    name: fml.mapDeclaration?.identifier ?? "Untitled",
    url: fml.mapDeclaration?.url ?? "",
    group: fml.groups.map((g) => {
      const grp: any = {
        name: g.name,
        typeMode: "none" as any,
        input: g.parameters.map((p) => {
          const inp: any = {
            name: p.name,
            type: p.type,
            mode: p.mode as any,
          };
          if (p.position) inp._fmlPosition = { startIndex: p.position.startIndex, endIndex: p.position.endIndex };
          return inp;
        }),
        rule: convertFmlRules(g.rules),
      };
      if (g.position) grp._fmlPosition = { startIndex: g.position.startIndex, endIndex: g.position.endIndex };
      return grp;
    }),
  };
}
