import { StructureMap, StructureMapGroupRule } from "fhir/r4b";
import type {
  FhirVersion,
  FmlStructureMap,
  Rule as FmlRule,
  SourcePosition,
  TransformParameter,
} from "./fml_models";
import type { TypeModel, ElementModel } from "./custom_model";
import { lookupByTypeName as lookupByTypeNameR4B } from "./models/generated/r4b";
import { getFhirPathVariableReferences } from "./fhirpath_validator";
import { resolveTransformResultTypes } from "./fml_transform_signatures";

/**
 * Function used to resolve a TypeModel by its TypeName. Pass any per-version
 * dictionary's `lookupByTypeName` function (e.g. from `helpers/models/generated/r4b`).
 */
export type TypeLookup = (typeName: string) => TypeModel | undefined;
export type LogicalTypeClassifier = (typeName: string) => boolean;

/**
 * Resolver that returns the {@link TypeLookup} for a given FHIR version. Used
 * for cross-version maps where source and target structures belong to
 * different FHIR releases (e.g. an R4B → R5 transform). Return `undefined` to
 * fall back to the default lookup.
 */
export type LookupForVersion = (version: FhirVersion | undefined) => TypeLookup | undefined;

export type DiagramSourcePosition = Pick<SourcePosition, "startIndex" | "endIndex">
  & Partial<Pick<SourcePosition, "startLine" | "startColumn" | "endLine" | "endColumn">>;

interface DiagramMapInput {
  group: DiagramGroupInput[];
}

interface DiagramGroupInput {
  name: string;
  input: Array<{
    name: string;
    type?: string;
    mode: string;
    fhirVersion?: FhirVersion;
    fmlPosition?: DiagramSourcePosition;
    typeDeclared?: boolean;
  }>;
  rule: DiagramRuleInput[];
  fmlPosition?: DiagramSourcePosition;
}

interface DiagramRuleInput {
  name?: string;
  source: any[];
  target: any[];
  dependent: Array<{name: string; variable: string[]}>;
  rule: DiagramRuleInput[];
  fmlPosition?: DiagramSourcePosition;
}

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
  fmlPosition?: DiagramSourcePosition;
}

export interface DiagramType {
  typeName: string;
  paramName: string;
  /** True when the resolved type is supplied by a logical StructureDefinition. */
  isLogicalModel?: boolean;
  /** Local type name declared inside the logical StructureDefinition. */
  logicalModelTypeName?: string;
  /** Canonical URL identifying the logical StructureDefinition. */
  logicalModelCanonical?: string;
  /** Business version declared by StructureDefinition.version. */
  logicalModelVersion?: string;
  /** Property entries — may contain duplicates (e.g. same path with different filters) */
  properties: PropertyEntry[];
  /** Source position in the FML text for click-to-select on the type header */
  fmlPosition?: DiagramSourcePosition;
  /** Detected FHIR version of the structure backing this box (cross-version
   *  maps). When set, the type model for this box is resolved against the
   *  matching per-version dictionary rather than the default. */
  fhirVersion?: FhirVersion;
  /** How this group input's type was established. */
  typeResolution?: "declared" | "context" | "unresolved" | "conflict";
  /** Distinct types inferred from incompatible calling contexts. */
  conflictingTypeNames?: string[];
  /** When true, this DiagramType represents a "computed value" source
   *  produced by a variable-only target rule (e.g. `uuid() as fullUrl`,
   *  `cc('http://loinc.org', '8302-2', 'Body height') as coding`). It
   *  is rendered with a purple style, stacked beneath the regular
   *  source boxes, and acts as the originating node for any rule that
   *  references its variable via `(%var)`. */
  isComputed?: boolean;
}

export interface PropertyEntry {
  /** Dotted property path relative to the type root */
  path: string;
  /** Internal path retaining alias-binding discriminators for constraint scoping. */
  constraintPath?: string;
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
  /** Connections originating from variables referenced by FHIRPath expressions. */
  expressionConnectionIds?: number[];
  /** The name of the top-level rule that produced this entry */
  ruleName?: string;
  /** When true, this target property creates a new node (create/cc/c or variable used as context) */
  isCreated?: boolean;
  /** The type name being created (from create transform parameter) */
  createdType?: string;
  /** Function call description for target properties populated by a transform function */
  transformFunction?: string;
  /** Transform name for editor metadata. */
  transformName?: string;
  /** Position of the transform invocation in FML source. */
  transformPosition?: DiagramSourcePosition;
  /** Transform metadata aligned to each merged property occurrence. */
  transformOccurrences?: Array<{
    propertyPosition: DiagramSourcePosition;
    transformName?: string;
    transformPosition?: DiagramSourcePosition;
  }>;
  /** Source position in the FML text for click-to-select */
  fmlPosition?: DiagramSourcePosition;
  /** Every source occurrence merged into this visual property row. */
  fmlPositions?: DiagramSourcePosition[];
  /** Rule-level FML position for click-to-select on rule headers */
  ruleFmlPosition?: DiagramSourcePosition;
  /** Variable name assigned to this property (e.g., "as hn" → "hn") */
  variableName?: string;
  /** When true, this target property does not consume data from its rule's source */
  noSourceData?: boolean;
  /** True when this element is declared as a collection (IsArray) in the type model */
  isCollection?: boolean;
  /** Minimum cardinality from the resolved FHIR element model. */
  cardinalityMin?: 0 | 1;
  /** Maximum cardinality from the resolved FHIR element model. */
  cardinalityMax?: "1" | "*";
  /** Canonical target profiles allowed by Reference element types. */
  targetProfiles?: string[];
  /** Definition anchor path using model element names, including choice `[x]`. */
  specificationPath?: string;
  /** Resolved metadata for each cumulative path segment. */
  pathSteps?: PropertyPathStep[];
  /** The element's resolved type name from the type model (used for tooltip) */
  elementTypeName?: string;
  /** Every type permitted by a choice element before child-path constraints. */
  possibleTypeNames?: string[];
  /** Types that remain compatible with all referenced child paths. */
  compatibleTypeNames?: string[];
  /** Initially available types excluded by referenced child paths. */
  excludedTypeNames?: string[];
  /** True when the property path could not be resolved against the type model
   *  (the type box has a known typeName but the path doesn't match any element). */
  unknownElement?: boolean;
  /** Human-readable validation error (e.g. created-type/element-type mismatch).
   *  When set, this overrides the default tooltip text. */
  validationError?: string;
  /** True when this entry's top-level rule has no nested sub-rules and no
   *  dependent group calls. Such "leaf" rules represent direct value flow
   *  (e.g. `coding as c -> tgt.code = c`) and are rendered as thin lines
   *  rather than sankey bands. */
  isLeafRule?: boolean;
}

export interface PropertyPathStep {
  /** Cumulative path from the type root through this segment. */
  path: string;
  /** Types compatible with this segment and referenced descendants. */
  typeNames: string[];
  /** All types permitted directly by the element declaration. */
  possibleTypeNames: string[];
  cardinalityMin: 0 | 1;
  cardinalityMax: "1" | "*";
  targetProfiles?: string[];
  specificationPath?: string;
}

// ===== Data Extraction =====

interface VarInfo {
  rootInput: string;
  path: string;
  /** Resolved type of the rootInput parameter, used to infer types when
   *  the variable is passed into a dependent group whose input is untyped. */
  rootInputType?: string;
  /** FHIR model version associated with rootInputType. */
  rootInputVersion?: FhirVersion;
  /** When this variable was bound by `create('Type') as v`, the created
   *  type — used directly during dependent-call inference so the type
   *  flows through without needing the model to walk the path. */
  createdType?: string;
  /** The PropertyEntry that originally bound this variable. When a
   *  later sub-rule references the variable with no `.element`, the
   *  new connectionId is folded into this entry's
   *  `additionalConnectionIds` instead of producing a duplicate row. */
  bindingEntry?: PropertyEntry;
  /** When this variable was bound by a variable-only target create
   *  (e.g. `uuid() as fullUrl`, `cc(…) as coding`), the connectionId
   *  of the synthetic computed-source row that emits its value. Any
   *  rule that references this variable via `(%var)` gets that
   *  connectionId added to its target row's `additionalConnectionIds`
   *  so the consumer connects back to the computed-source box. */
  computedSourceConnId?: number;
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
export function extractStructureMapDiagram(map: StructureMap, typeLookup?: TypeLookup, showMissingProperties?: boolean, lookupForVersion?: LookupForVersion, isLogicalType?: LogicalTypeClassifier): StructureMapDiagram {
  return extractDiagramInput(map as unknown as DiagramMapInput, typeLookup, showMissingProperties, lookupForVersion, isLogicalType);
}

/** Extract diagram data directly from the position-aware FML model. */
export function extractFmlStructureMapDiagram(fml: FmlStructureMap, typeLookup?: TypeLookup, showMissingProperties?: boolean, lookupForVersion?: LookupForVersion, isLogicalType?: LogicalTypeClassifier): StructureMapDiagram {
  return extractDiagramInput(toFmlDiagramInput(fml), typeLookup, showMissingProperties, lookupForVersion, isLogicalType);
}

function extractDiagramInput(map: DiagramMapInput, typeLookup?: TypeLookup, showMissingProperties?: boolean, lookupForVersion?: LookupForVersion, isLogicalType?: LogicalTypeClassifier): StructureMapDiagram {
  const groups: DiagramGroup[] = [];
  nextRuleId = 0;
  nextConnectionId = 0;

  // Resolve the type-model lookup up front so it's available both during
  // collection (for inferring untyped dependent group inputs) and during
  // the post-pass that annotates property entries.
  const lookup = typeLookup ?? lookupByTypeNameR4B;

  // Resolve parameter types independently of diagram traversal order. This
  // scans every dependency repeatedly so multi-level and otherwise-unreached
  // groups receive the types passed by all of their callers.
  const typeRefinements = resolveDependencyInputTypes(map, lookup, lookupForVersion);

  for (const group of map.group || []) {
    const varMap = new Map<string, VarInfo>();
    const propsMap = new Map<string, PropertyEntry[]>();
    const computedSources: DiagramType[] = [];

    for (const input of group.input || []) {
      varMap.set(input.name, {
        rootInput: input.name,
        path: "",
        rootInputType: input.type || undefined,
        rootInputVersion: input.fhirVersion,
      });
      propsMap.set(input.name, []);
    }

    collectProperties(
      group.rule, varMap, propsMap, computedSources,
      map.group || [], new Set([group.name]),
      lookup, lookupForVersion,
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
      const inputPosition = getDiagramPosition(input);
      if (inputPosition) dt.fmlPosition = inputPosition;
      const inputVersion = (input as any).fhirVersion ?? (input as any)._fmlVersion;
      if (inputVersion) dt.fhirVersion = inputVersion;
      dt.typeResolution = input.typeDeclared === false
        ? "unresolved"
        : input.type ? "declared" : "unresolved";
      if (input.mode === "source") sourceTypes.push(dt);
      else targetTypes.push(dt);
    }

    // Append computed-value source boxes (one per `transform() as var`
    // target with no context) to the source column. They render with a
    // purple style and act as origins for any rule that consumes their
    // variable via `(%var)`.
    for (const cs of computedSources) {
      sourceTypes.push(cs);
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
    // Collect connectionIds that still have at least one surviving target.
    // We must include both the target row's main connectionId AND its
    // additionalConnectionIds (used by consumers to reference computed-
    // value source boxes) — otherwise the source-side pruning below
    // would drop the very anchor that lets the connector draw.
    const survivingTargetConnIds = new Set<number>();
    for (const dt of targetTypes) {
      for (const p of dt.properties) {
        if (p.role === "target" && p.connectionId !== undefined) {
          survivingTargetConnIds.add(p.connectionId);
        }
        for (const addl of p.additionalConnectionIds || []) {
          if (p.role === "target") survivingTargetConnIds.add(addl);
        }
      }
    }
    // Remove source connectionIds only when no target references them any more.
    // Computed-value source boxes are exempt: their connectionId is the
    // origin of the data flow, and stripping it would orphan the box.
    for (const dt of sourceTypes) {
      if (dt.isComputed) continue;
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
    const groupPosition = getDiagramPosition(group);
    if (groupPosition) dg.fmlPosition = groupPosition;
    groups.push(dg);
  }

  // Apply type refinements — replace empty or generic type names with
  // more precise types discovered during the dependent group walk.
  for (const group of groups) {
    const refinements = typeRefinements.get(group.name);
    for (const dt of [...group.sourceTypes, ...group.targetTypes]) {
      const inferred = refinements?.get(dt.paramName) ?? [];
      const distinct = uniqueRefinements(inferred);
      if (dt.typeResolution === "declared") {
        const conflicts = distinct.filter(refinement => {
          return refinement.typeName !== dt.typeName
            || (refinement.fhirVersion && dt.fhirVersion && refinement.fhirVersion !== dt.fhirVersion);
        });
        if (conflicts.length > 0) {
          dt.typeResolution = "conflict";
          dt.conflictingTypeNames = [
            formatRefinement({typeName: dt.typeName, fhirVersion: dt.fhirVersion}),
            ...conflicts.map(formatRefinement),
          ];
        }
      } else if (distinct.length === 1) {
        dt.typeName = distinct[0].typeName;
        dt.fhirVersion = distinct[0].fhirVersion;
        dt.typeResolution = "context";
      } else if (distinct.length > 1) {
        dt.typeName = "";
        dt.typeResolution = "conflict";
        dt.conflictingTypeNames = distinct.map(refinement => formatRefinement(refinement));
      } else {
        dt.typeResolution = "unresolved";
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
      // Computed-value source boxes contain a single synthetic row whose
      // path is the literal rule text — there's no element to resolve
      // against the type model, so skip the annotation pass entirely.
      if (dt.isComputed) continue;
      // For cross-version maps, resolve this box against the type model for
      // its detected FHIR version; otherwise fall back to the default lookup.
      const boxLookup = (lookupForVersion && lookupForVersion(dt.fhirVersion)) || lookup;
      const rootModel = dt.typeName ? boxLookup(dt.typeName) : undefined;
      dt.isLogicalModel = !dt.isComputed && (!!rootModel?.CanonicalUrl || isLogicalType?.(dt.typeName) === true);
      if (dt.isLogicalModel) {
        dt.logicalModelTypeName = rootModel?.TypeName ?? dt.typeName;
        dt.logicalModelCanonical = rootModel?.CanonicalUrl ?? dt.typeName;
        dt.logicalModelVersion = rootModel?.Version;
      }
      // Either no declared type, or the declared type isn't in the model:
      // every property on this box is therefore unverifiable — flag them all.
      const rootKnown = !!rootModel;
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
      const resolutions = new Map<PropertyEntry, PathResolution>();
      const entriesByPath = new Map<string, PropertyEntry[]>();
      for (const p of dt.properties) {
        const resolutionPath = p.constraintPath ?? p.path;
        const existing = entriesByPath.get(resolutionPath) ?? [];
        existing.push(p);
        entriesByPath.set(resolutionPath, existing);
        if (!rootKnown) {
          if (p.path && p.path !== ".") p.unknownElement = true;
          continue;
        }
        // Skip the root-context placeholder ("." path) which has no element.
        if (!p.path || p.path === ".") continue;
        const resolved = resolvePathInModel(dt.typeName, resolutionPath, boxLookup, createBoundaries);
        if (resolved) {
          resolutions.set(p, resolved);
          p.pathSteps = resolved.steps.map((step, index) => ({
            path: step.path,
            typeNames: step.compatibleTypeNames,
            possibleTypeNames: step.possibleTypeNames,
            cardinalityMin: step.element?.Required ? 1 : 0,
            cardinalityMax: step.element?.IsArray ? "*" : "1",
            targetProfiles: uniqueTypeNames(step.element?.Type.flatMap(type => type.TargetProfile ?? []) ?? []),
            specificationPath: [dt.typeName, ...resolved.steps.slice(0, index + 1)
              .map(candidate => candidate.element?.ElementName)
              .filter((elementName): elementName is string => !!elementName)]
              .join("."),
          }));
          if (resolved.isCollection) p.isCollection = true;
          if (resolved.element) {
            p.cardinalityMin = resolved.element.Required ? 1 : 0;
            p.cardinalityMax = resolved.element.IsArray ? "*" : "1";
            p.targetProfiles = uniqueTypeNames(resolved.element.Type.flatMap(type => type.TargetProfile ?? []));
            p.specificationPath = [dt.typeName, ...resolved.steps
              .map(step => step.element?.ElementName)
              .filter((elementName): elementName is string => !!elementName)]
              .join(".");
          }
          if (resolved.elementTypeName) p.elementTypeName = resolved.elementTypeName;
          p.possibleTypeNames = resolved.finalStep.possibleTypeNames;
          p.compatibleTypeNames = resolved.finalStep.compatibleTypeNames;
          if (p.typeFilter) {
            const restrictedTypes = p.possibleTypeNames.filter(typeName => {
              return isTypeAssignableTo(typeName, p.typeFilter!, boxLookup);
            });
            p.compatibleTypeNames = intersectTypeNames(p.compatibleTypeNames, restrictedTypes);
            if (restrictedTypes.length === 0) {
              const displayPath = stripPathDiscriminators(p.path);
              p.unknownElement = true;
              p.validationError = `Type filter "${p.typeFilter}" is not allowed at ${dt.typeName}.${displayPath} (allowed: ${p.possibleTypeNames.join(" | ")}).`;
            }
          }
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
            if (!isCreatedTypeAllowed(resolved.element, p.createdType, boxLookup)) {
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

      // A child path constrains every choice-valued ancestor. Intersect
      // constraints from sibling child paths because one runtime type must
      // support all children referenced beneath the same bound node.
      for (const resolved of resolutions.values()) {
        for (const step of resolved.steps.slice(0, -1)) {
          for (const ancestor of entriesByPath.get(step.internalPath) ?? []) {
            ancestor.possibleTypeNames ??= step.possibleTypeNames;
            ancestor.compatibleTypeNames = intersectTypeNames(
              ancestor.compatibleTypeNames ?? ancestor.possibleTypeNames,
              step.compatibleTypeNames,
            );
          }
        }
      }
      for (const p of dt.properties) {
        const possible = p.possibleTypeNames ?? [];
        const compatible = p.compatibleTypeNames ?? possible;
        if (possible.length > 1) {
          p.compatibleTypeNames = compatible;
          p.excludedTypeNames = possible.filter(typeName => !compatible.includes(typeName));
          p.elementTypeName = compatible.join(" | ") || undefined;
          if (compatible.length === 0 && !p.validationError) {
            p.unknownElement = true;
            p.validationError = `No choice type supports all referenced child paths. Possible types: ${possible.join(" | ")}.`;
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
): PathResolution | undefined {
  if (!rootTypeName) return undefined;
  if (!path || path === ".") {
    const step: ResolvedPathStep = {
      internalPath: ".",
      path: ".",
      possibleTypeNames: [rootTypeName],
      compatibleTypeNames: [rootTypeName],
      isCollection: false,
    };
    return {steps: [step], finalStep: step, isCollection: false, elementTypeName: rootTypeName};
  }
  const parts = path.split(".");
  const resolved = resolvePathFromType(rootTypeName, parts, 0, "", lookup, createBoundaries);
  if (!resolved) return undefined;
  const finalStep = resolved.steps[resolved.steps.length - 1];
  return {
    ...resolved,
    finalStep,
    isCollection: finalStep.isCollection,
    elementTypeName: finalStep.compatibleTypeNames[0],
    element: finalStep.element,
  };
}

interface ResolvedPathStep {
  /** Internal path retaining binding discriminators for occurrence-scoped constraints. */
  internalPath: string;
  path: string;
  possibleTypeNames: string[];
  compatibleTypeNames: string[];
  isCollection: boolean;
  element?: ElementModel;
}

interface PathResolution {
  steps: ResolvedPathStep[];
  finalStep: ResolvedPathStep;
  isCollection: boolean;
  elementTypeName?: string;
  element?: ElementModel;
}

function resolvePathFromType(
  typeName: string,
  parts: string[],
  index: number,
  parentPath: string,
  lookup: TypeLookup,
  createBoundaries?: Map<string, string>,
): {steps: ResolvedPathStep[]} | undefined {
  const typeModel = lookup(typeName);
  if (!typeModel) return undefined;
  const part = parts[index];
  const cleanPart = part.includes("#") ? part.slice(0, part.indexOf("#")) : part;
  const found = findElementInType(typeModel, cleanPart, lookup);
  if (!found) return undefined;

  const path = parentPath ? `${parentPath}.${part}` : part;
  const createdType = createBoundaries?.get(path);
  const possibleTypeNames = createdType ? [createdType] : found.typeNames;
  if (index === parts.length - 1) {
    return {steps: [{
      internalPath: path,
      path: stripPathDiscriminators(path),
      possibleTypeNames,
      compatibleTypeNames: possibleTypeNames,
      isCollection: !!found.element.IsArray,
      element: found.element,
    }]};
  }

  const childResults = possibleTypeNames.flatMap(candidate => {
    const child = resolvePathFromType(candidate, parts, index + 1, path, lookup, createBoundaries);
    return child ? [{candidate, child}] : [];
  });
  if (childResults.length === 0) return undefined;

  const steps: ResolvedPathStep[] = [{
    internalPath: path,
    path: stripPathDiscriminators(path),
    possibleTypeNames,
    compatibleTypeNames: uniqueTypeNames(childResults.map(result => result.candidate)),
    isCollection: !!found.element.IsArray,
    element: found.element,
  }];
  const childDepth = Math.max(...childResults.map(result => result.child.steps.length));
  for (let depth = 0; depth < childDepth; depth++) {
    const childSteps = childResults.map(result => result.child.steps[depth]).filter(Boolean);
    if (childSteps.length === 0) continue;
    steps.push({
      internalPath: childSteps[0].internalPath,
      path: childSteps[0].path,
      possibleTypeNames: uniqueTypeNames(childSteps.flatMap(step => step.possibleTypeNames)),
      compatibleTypeNames: uniqueTypeNames(childSteps.flatMap(step => step.compatibleTypeNames)),
      isCollection: childSteps.some(step => step.isCollection),
      element: childSteps[0].element,
    });
  }
  return {steps};
}

function uniqueTypeNames(typeNames: string[]): string[] {
  return [...new Set(typeNames)];
}

function intersectTypeNames(left: string[], right: string[]): string[] {
  const rightSet = new Set(right);
  return left.filter(typeName => rightSet.has(typeName));
}

function isTypeAssignableTo(typeName: string, restriction: string, lookup: TypeLookup): boolean {
  let current: string | undefined = typeName;
  const visited = new Set<string>();
  while (current && !visited.has(current)) {
    if (current.toLowerCase() === restriction.toLowerCase()) return true;
    visited.add(current);
    current = lookup(current)?.BaseTypeName;
  }
  return false;
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
): { element: ElementModel; typeNames: string[] } | undefined {
  if (!typeModel) return undefined;
  // Direct name match
  const direct = typeModel.Elements.find((e) => e.ElementName === segment);
  if (direct) {
    return { element: direct, typeNames: direct.Type.map(type => type.TypeName) };
  }
  // Bare choice-element name match: segment "value" → ElementName "value[x]"
  // (the type is ambiguous, so chosenTypeName is left undefined and any
  // deeper navigation will halt unless the next segment narrows the type).
  const bareChoice = typeModel.Elements.find((e) => e.ElementName === `${segment}[x]`);
  if (bareChoice) {
    return { element: bareChoice, typeNames: bareChoice.Type.map(type => type.TypeName) };
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
        if (match) return { element: e, typeNames: [match.TypeName] };
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
interface TypeRefinement {
  typeName: string;
  fhirVersion?: FhirVersion;
}

function resolveDependencyInputTypes(
  map: DiagramMapInput,
  defaultLookup: TypeLookup,
  lookupForVersion?: LookupForVersion,
): Map<string, Map<string, TypeRefinement[]>> {
  const refinements = new Map<string, Map<string, TypeRefinement[]>>();
  const maxIterations = Math.max(map.group.length * 3, 1);

  for (let iteration = 0; iteration < maxIterations; iteration++) {
    let changed = false;
    for (const group of map.group) {
      const variables = new Map<string, TypeRefinement[]>();
      for (const input of group.input) {
        if (input.type) {
          variables.set(input.name, [{typeName: input.type, fhirVersion: input.fhirVersion}]);
        }
      }
      scanDependencyRules(group.rule, variables, map.group, refinements, defaultLookup, lookupForVersion);
    }

    for (const group of map.group) {
      for (const input of group.input) {
        if (input.typeDeclared) continue;
        const inferred = uniqueRefinements(refinements.get(group.name)?.get(input.name) ?? []);
        const next = inferred.length === 1 ? inferred[0] : undefined;
        if (input.type !== next?.typeName || input.fhirVersion !== next?.fhirVersion) {
          input.type = next?.typeName;
          input.fhirVersion = next?.fhirVersion;
          changed = true;
        }
      }
    }
    if (!changed) break;
  }
  return refinements;
}

function scanDependencyRules(
  rules: DiagramRuleInput[],
  variables: Map<string, TypeRefinement[]>,
  allGroups: DiagramGroupInput[],
  refinements: Map<string, Map<string, TypeRefinement[]>>,
  defaultLookup: TypeLookup,
  lookupForVersion?: LookupForVersion,
): void {
  for (const rule of rules) {
    for (const source of rule.source) {
      if (source.variable) {
        variables.set(source.variable, resolveVariableTypes(
          variables.get(source.context) ?? [], source.element, source.type,
          defaultLookup, lookupForVersion,
        ));
      }
    }
    for (const target of rule.target) {
      if (target.variable) {
        const createdType = getCreatedType(target);
        const transformResultTypes = (target as any).transformResultTypes as string[] | undefined;
        const version = firstVersion(variables.get(target.context));
        variables.set(target.variable, createdType
          ? [{typeName: createdType, fhirVersion: version}]
          : transformResultTypes?.length
            ? transformResultTypes.map(typeName => ({typeName, fhirVersion: version}))
            : resolveVariableTypes(
              variables.get(target.context) ?? [], target.element, undefined,
              defaultLookup, lookupForVersion,
            ));
      }
    }
    for (const dependency of rule.dependent) {
      const referencedGroup = allGroups.find(candidate => candidate.name === dependency.name);
      if (!referencedGroup) continue;
      for (let index = 0; index < referencedGroup.input.length && index < dependency.variable.length; index++) {
        const passedTypes = variables.get(dependency.variable[index]) ?? [];
        for (const passedType of passedTypes) {
          setTypeRefinement(refinements, referencedGroup.name, referencedGroup.input[index].name, passedType.typeName, passedType.fhirVersion);
        }
      }
    }
    scanDependencyRules(rule.rule, new Map(variables), allGroups, refinements, defaultLookup, lookupForVersion);
  }
}

function resolveVariableTypes(
  contexts: TypeRefinement[],
  element: string | undefined,
  restriction: string | undefined,
  defaultLookup: TypeLookup,
  lookupForVersion?: LookupForVersion,
): TypeRefinement[] {
  if (!element) {
    return restriction
      ? contexts.map(context => ({typeName: restriction, fhirVersion: context.fhirVersion}))
      : contexts;
  }
  const result: TypeRefinement[] = [];
  for (const context of contexts) {
    const lookup = lookupForVersion?.(context.fhirVersion) ?? defaultLookup;
    const resolved = resolvePathInModel(context.typeName, element, lookup);
    const typeNames = restriction
      ? (resolved?.finalStep.possibleTypeNames ?? []).filter(typeName => isTypeAssignableTo(typeName, restriction, lookup))
      : resolved?.finalStep.compatibleTypeNames ?? [];
    result.push(...typeNames.map(typeName => ({typeName, fhirVersion: context.fhirVersion})));
  }
  return uniqueRefinements(result);
}

function firstVersion(types: TypeRefinement[] | undefined): FhirVersion | undefined {
  return types?.find(type => type.fhirVersion)?.fhirVersion;
}

function setTypeRefinement(
  typeRefinements: Map<string, Map<string, TypeRefinement[]>>,
  groupName: string,
  inputName: string,
  newType: string,
  fhirVersion?: FhirVersion,
): void {
  if (!typeRefinements.has(groupName)) {
    typeRefinements.set(groupName, new Map());
  }
  const refs = typeRefinements.get(groupName)!;
  refs.set(inputName, [...(refs.get(inputName) ?? []), {typeName: newType, fhirVersion}]);
}

function uniqueRefinements(refinements: TypeRefinement[]): TypeRefinement[] {
  const seen = new Set<string>();
  return refinements.filter(refinement => {
    const key = `${refinement.typeName}:${refinement.fhirVersion ?? ""}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function formatRefinement(refinement: TypeRefinement): string {
  return refinement.fhirVersion
    ? `${refinement.typeName} (${refinement.fhirVersion})`
    : refinement.typeName;
}

function collectProperties(
  rules: Array<StructureMapGroupRule | DiagramRuleInput> | undefined,
  varMap: Map<string, VarInfo>,
  propsMap: Map<string, PropertyEntry[]>,
  /** Per-group accumulator for synthetic computed-value source
   *  DiagramTypes (one box per `transform() as var` target with no
   *  context). Filled during the target loop and consumed by the
   *  caller after `collectProperties` returns. */
  computedSources: DiagramType[],
  allGroups: any[],
  visitedGroups: Set<string>,
  typeLookup: TypeLookup,
  lookupForVersion?: LookupForVersion,
  parentRuleId?: number,
  parentRuleName?: string,
  /** Inherited from the top-level rule: true when that rule has no
   *  sub-rules and no dependent group calls. All entries produced by
   *  recursive walks (sub-rules, dependents) inherit this flag so the
   *  whole rule tree renders consistently. */
  parentIsLeafRule?: boolean
): void {
  if (!rules) return;

  for (const rule of rules) {
    const ruleId = parentRuleId ?? nextRuleId++;
    const ruleName = parentRuleName ?? rule.name;
    const connectionId = nextConnectionId++;
    const rulePos = getDiagramPosition(rule);
    // For a top-level rule (parentRuleId undefined), "leaf" means no
    // sub-rules and no dependent group calls. Propagate the inherited
    // flag for nested calls so all entries from the same rule tree share
    // the same connector style.
    const isLeafRule = parentRuleId === undefined
      ? ((rule.rule?.length || 0) === 0 && (rule.dependent?.length || 0) === 0)
      : !!parentIsLeafRule;

    for (const src of rule.source || []) {
      if (src.context) {
        const info = varMap.get(src.context);
        if (info && src.element) {
          const fullPath = info.path
            ? `${info.path}.${src.element}`
            : src.element;
          let constraintPath = fullPath;
          if (src.variable) {
            constraintPath = `${constraintPath}#${src.variable}_${connectionId}`;
          }
          const entry: PropertyEntry = {
            path: stripPathDiscriminators(fullPath),
            ...(constraintPath !== stripPathDiscriminators(fullPath) ? {constraintPath} : {}),
            role: "source",
            ruleId,
            connectionId,
            ruleName,
            isLeafRule,
          };
          if (src.condition) entry.filter = src.condition;
          if (src.type) entry.typeFilter = src.type;
          if (src.variable) entry.variableName = src.variable;
          const sourcePosition = getDiagramPosition(src);
          if (sourcePosition) entry.fmlPosition = sourcePosition;
          if (rulePos) entry.ruleFmlPosition = rulePos;
          propsMap.get(info.rootInput)?.push(entry);
          if (src.variable) {
            varMap.set(src.variable, {
              rootInput: info.rootInput,
              path: constraintPath,
              rootInputType: info.rootInputType,
              rootInputVersion: info.rootInputVersion,
              createdType: src.type,
              bindingEntry: entry,
            });
          }
        } else if (info && !src.element) {
          // Source references the variable directly (no `.element`).
          // When the variable was previously bound to a non-root path
          // (e.g. `patientItem.item as name` then a sub-rule does
          // `name -> tgtName.text = …`), reuse the original binding
          // entry by folding this connectionId into its
          // `additionalConnectionIds` so we don't produce a duplicate
          // row. For root-input variables (path is empty) we still
          // emit a `.` placeholder row.
          if (info.bindingEntry) {
            const be = info.bindingEntry;
            if (!be.additionalConnectionIds) be.additionalConnectionIds = [];
            be.additionalConnectionIds.push(connectionId);
            // Variable rebinding (rare — usually the same variable name):
            if (src.variable && src.variable !== info.rootInput) {
              varMap.set(src.variable, {
                rootInput: info.rootInput,
                path: info.path,
                rootInputType: info.rootInputType,
                rootInputVersion: info.rootInputVersion,
                bindingEntry: be,
              });
            }
          } else {
            // Root-input variable with no prior binding entry —
            // emit a `.` row so the connection has an anchor.
            const dotEntry: PropertyEntry = {
              path: ".",
              role: "source",
              ruleId,
              connectionId,
              ruleName,
              isLeafRule,
            };
            const sourcePosition = getDiagramPosition(src);
            if (sourcePosition) dotEntry.fmlPosition = sourcePosition;
            if (src.variable) dotEntry.variableName = src.variable;
            if (rulePos) dotEntry.ruleFmlPosition = rulePos;
            propsMap.get(info.rootInput)?.push(dotEntry);
            if (src.variable) {
              varMap.set(src.variable, {
                rootInput: info.rootInput,
                path: info.path,
                rootInputType: info.rootInputType,
                rootInputVersion: info.rootInputVersion,
                bindingEntry: dotEntry,
              });
            }
          }
        }
      }
    }

    let lastTargetRootInput: string | undefined;

    for (const tgt of rule.target || []) {
      if (!tgt.context && tgt.variable) {
        // Variable-only target create: e.g. `uuid() as fullUrl`,
        // `cc('http://loinc.org', '8302-2', 'Body height') as coding`.
        // Emit a synthetic computed-value source DiagramType so the
        // value's origin is visible and any consumer that references
        // `(%fullUrl)` / `(%coding)` can wire back to this box.
        const computedConnId = nextConnectionId++;
        const ruleText = describeComputedSource(tgt) || tgt.variable;
        const computedTypeName = getComputedSourceType(tgt) || "";
        const computedEntry: PropertyEntry = {
          path: ruleText,
          role: "source",
          ruleId,
          connectionId: computedConnId,
          // Suppress the rule-name divider on these single-row boxes.
          isLeafRule: true,
          transformName: tgt.transform,
          transformPosition: (tgt as any).transformPosition,
        };
        const targetPosition = getDiagramPosition(tgt);
        if (targetPosition) computedEntry.fmlPosition = targetPosition;
        if (rulePos) computedEntry.ruleFmlPosition = rulePos;
        computedSources.push({
          typeName: computedTypeName,
          paramName: tgt.variable,
          properties: [computedEntry],
          isComputed: true,
          fmlPosition: targetPosition,
        });
        varMap.set(tgt.variable, {
          rootInput: tgt.variable,
          path: "",
          rootInputType: computedTypeName || undefined,
          createdType: computedTypeName || undefined,
          computedSourceConnId: computedConnId,
        });
        continue;
      }
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
            const variableLookup = lookupForVersion?.(info.rootInputVersion) ?? typeLookup;
            const resolved = resolvePathInModel(info.rootInputType, cleanPath, variableLookup);
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
            isLeafRule,
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
            if (fnDesc) {
              entry.transformFunction = fnDesc;
            }
          }
          if ((tgt as any).transformPosition && tgt.transform && tgt.transform !== "copy") {
            entry.transformName = tgt.transform;
            entry.transformPosition = (tgt as any).transformPosition;
          }
          for (const variableName of (tgt as any).expressionVariables ?? []) {
            const bindingEntry = varMap.get(variableName)?.bindingEntry;
            if (!bindingEntry) continue;
            const expressionConnectionId = nextConnectionId++;
            bindingEntry.additionalConnectionIds ??= [];
            bindingEntry.expressionConnectionIds ??= [];
            bindingEntry.additionalConnectionIds.push(expressionConnectionId);
            bindingEntry.expressionConnectionIds.push(expressionConnectionId);
            entry.additionalConnectionIds ??= [];
            entry.expressionConnectionIds ??= [];
            entry.additionalConnectionIds.push(expressionConnectionId);
            entry.expressionConnectionIds.push(expressionConnectionId);
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
          const targetPosition = getDiagramPosition(tgt);
          if (targetPosition) entry.fmlPosition = targetPosition;
          if (tgt.variable) entry.variableName = tgt.variable;
          if (rulePos) entry.ruleFmlPosition = rulePos;
          // Wire references to computed-value sources: for each
          // `valueId` parameter that names a variable bound to a
          // computed source, fold that source's connectionId into
          // this consumer's additionalConnectionIds so the renderer
          // draws a connector from the computed-source box to here.
          for (const param of tgt.parameter || []) {
            const refName = (param as any).valueId as string | undefined;
            if (!refName) continue;
            const refInfo = varMap.get(refName);
            const cid = refInfo?.computedSourceConnId;
            if (cid === undefined) continue;
            if (!entry.additionalConnectionIds) entry.additionalConnectionIds = [];
            if (!entry.additionalConnectionIds.includes(cid)) {
              entry.additionalConnectionIds.push(cid);
            }
          }
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
              rootInputVersion: info.rootInputVersion,
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

      const nestedVisited = new Set(visitedGroups);
      nestedVisited.add(dep.name);

      // Recurse into dependent group's rules with the SAME propsMap,
      // so its properties flow into the parent's type boxes.
      collectProperties(
        refGroup.rule, depVarMap, propsMap, computedSources,
        allGroups, nestedVisited, typeLookup, lookupForVersion, ruleId, ruleName, isLeafRule
      );
    }

    collectProperties(rule.rule, varMap, propsMap, computedSources, allGroups, visitedGroups, typeLookup, lookupForVersion, ruleId, ruleName, isLeafRule);
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

/**
 * Best-effort type name produced by an arbitrary transform when emitted
 * as a computed-value source box header. Falls back to undefined when
 * the type can't be inferred from the transform alone.
 */
function getComputedSourceType(tgt: { transform?: string; parameter?: any[] }): string | undefined {
  const inferred = (tgt as any).transformResultTypes as string[] | undefined;
  if (inferred?.length) return inferred[0];
  const direct = getCreatedType(tgt);
  if (direct) return direct;
  switch (tgt.transform) {
    case "uuid": return "string";
    case "reference": return "Reference";
    case "pointer": return "Reference";
    case "append":
    case "truncate":
    case "escape": return "string";
    case "translate": return "Coding";
    default: return undefined;
  }
}

/**
 * Produce the FML-like text used as the body row for a computed-value
 * source box (e.g. `cc('http://loinc.org', '8302-2', 'Body height')`,
 * `uuid()`, `create('Quantity')`). Falls back to undefined for plain
 * `as var` aliases that don't have a transform call.
 */
function describeComputedSource(tgt: { transform?: string; parameter?: any[] }): string | undefined {
  if (!tgt.transform) return undefined;
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

function getDiagramPosition(value: unknown): DiagramSourcePosition | undefined {
  const candidate = value as {fmlPosition?: DiagramSourcePosition; _fmlPosition?: DiagramSourcePosition};
  return candidate.fmlPosition ?? candidate._fmlPosition;
}

function toFmlDiagramInput(fml: FmlStructureMap): DiagramMapInput {
  const structures = new Map<string, {typeName: string; version?: FhirVersion}>();
  for (const structure of fml.structures) {
    const canonical = structure.canonical ?? structure.url;
    const resolved = {
      typeName: structure.resolvedTypeName ?? (canonical.split("/").pop() || canonical),
      version: structure.fhirVersion,
    };
    if (structure.alias) structures.set(structure.alias, resolved);
    if (!structures.has(resolved.typeName)) structures.set(resolved.typeName, resolved);
  }

  return {
    group: fml.groups.map(group => ({
      name: group.name,
      input: group.parameters.map(parameter => {
        const structure = parameter.type ? structures.get(parameter.type) : undefined;
        return {
          name: parameter.name,
          type: structure?.typeName ?? parameter.type,
          mode: parameter.mode,
          fhirVersion: structure?.version
            ?? (parameter.mode === "source" ? fml.sourceModelVersion : fml.targetModelVersion),
          fmlPosition: parameter.position,
          typeDeclared: !!parameter.type,
        };
      }),
      rule: group.rules.map(rule => toFmlDiagramRule(rule, collectFmlVariableNames(group))),
      fmlPosition: group.position,
    })),
  };
}

function toFmlDiagramRule(rule: FmlRule, variableNames: string[]): DiagramRuleInput {
  const batchRules: DiagramRuleInput[] = (rule.identityFields ?? []).map(field => ({
    name: field.name,
    source: [{
      context: rule.sources[0]?.context,
      element: field.name,
      fmlPosition: field.position,
    }],
    target: [{
      context: rule.targets[0]?.context,
      element: field.name,
      fmlPosition: field.position,
    }],
    dependent: [],
    rule: [],
    fmlPosition: field.position,
  }));
  return {
    name: rule.name,
    source: rule.sources.map(source => ({
      context: source.context,
      element: source.element,
      variable: source.variable,
      condition: source.condition,
      type: source.type,
      fmlPosition: source.position,
    })),
    target: rule.targets.map(target => ({
      context: target.context,
      element: target.element,
      variable: target.variable,
      transform: target.transform?.type,
      transformResultTypes: target.transform ? resolveTransformResultTypes(target.transform) : [],
      transformPosition: target.transform?.position,
      expressionVariables: target.transform?.parameters
        .filter(parameter => parameter.type === "expression")
        .flatMap(parameter => getFhirPathVariableReferences(String(parameter.value), variableNames)),
      parameter: target.transform?.parameters.map(toDiagramTransformParameter),
      fmlPosition: target.position,
    })),
    dependent: rule.dependent?.invocations.map(invocation => ({
      name: invocation.name,
      variable: invocation.parameters.map(parameter => String(parameter.value)),
    })) ?? [],
    rule: [
      ...batchRules,
      ...(rule.dependent?.rules.map(nestedRule => toFmlDiagramRule(nestedRule, variableNames)) ?? []),
    ],
    fmlPosition: rule.position,
  };
}

function collectFmlVariableNames(group: FmlStructureMap["groups"][number]): string[] {
  const names = new Set(group.parameters.map(parameter => parameter.name));
  const collect = (rules: FmlRule[]): void => {
    for (const rule of rules) {
      for (const source of rule.sources) if (source.variable) names.add(source.variable);
      for (const target of rule.targets) if (target.variable) names.add(target.variable);
      collect(rule.dependent?.rules ?? []);
    }
  };
  collect(group.rules);
  return [...names];
}

function toDiagramTransformParameter(parameter: TransformParameter): Record<string, string | number | boolean> {
  if (parameter.type === "identifier") return {valueId: String(parameter.value)};
  if (typeof parameter.value === "boolean") return {valueBoolean: parameter.value};
  if (typeof parameter.value === "number") {
    return parameter.literalType === "decimal"
      ? {valueDecimal: parameter.value}
      : {valueInteger: parameter.value};
  }
  return {valueString: String(parameter.value)};
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
  // Purple palette for computed-value source boxes (uuid(), cc(), etc.)
  computedHeaderBg: "#f3e5f5",
  computedBorder: "#ce93d8",
  computedHeaderText: "#6a1b9a",
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
  expressionConnectionIds?: number[];
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
  /** Containing FHIR type and release for property tooltip links. */
  rootTypeName: string;
  fhirVersion?: FhirVersion;
  cardinalityMin?: 0 | 1;
  cardinalityMax?: "1" | "*";
  targetProfiles?: string[];
  specificationPath?: string;
  /** Every type initially available at a choice property. */
  possibleTypeNames?: string[];
  /** Choice types compatible with referenced descendant properties. */
  compatibleTypeNames?: string[];
  /** Choice types excluded by referenced descendant properties. */
  excludedTypeNames?: string[];
  /** True when the property path could not be resolved against the type model */
  unknownElement?: boolean;
  /** Human-readable validation error (overrides default tooltip) */
  validationError?: string;
  /** True when this entry's top-level rule has no nested sub-rules and
   *  no dependent group calls (rendered with thin connectors). */
  isLeafRule?: boolean;
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
    const key = `${e.path}|${e.constraintPath || ""}|${e.role || ""}|${e.filter || ""}|${e.typeFilter || ""}|${e.fixedValue || ""}|${e.isCreated ? "c" : ""}|${e.createdType || ""}`;
    const existing = seen.get(key);
    if (existing) {
      if (e.fmlPosition) {
        existing.fmlPositions ??= existing.fmlPosition ? [existing.fmlPosition] : [];
        if (!existing.fmlPositions.some(position => {
          return position.startIndex === e.fmlPosition!.startIndex
            && position.endIndex === e.fmlPosition!.endIndex;
        })) {
          existing.fmlPositions.push(e.fmlPosition);
        }
        existing.transformOccurrences ??= [];
        existing.transformOccurrences.push({
          propertyPosition: e.fmlPosition,
          transformName: e.transformName,
          transformPosition: e.transformPosition,
        });
      }
      if (e.connectionId !== undefined) {
        if (!existing.additionalConnectionIds) existing.additionalConnectionIds = [];
        existing.additionalConnectionIds.push(e.connectionId);
      }
      for (const connectionId of e.additionalConnectionIds ?? []) {
        existing.additionalConnectionIds ??= [];
        if (!existing.additionalConnectionIds.includes(connectionId)) {
          existing.additionalConnectionIds.push(connectionId);
        }
      }
      for (const connectionId of e.expressionConnectionIds ?? []) {
        existing.expressionConnectionIds ??= [];
        if (!existing.expressionConnectionIds.includes(connectionId)) {
          existing.expressionConnectionIds.push(connectionId);
        }
      }
    } else {
      if (e.fmlPosition) {
        e.fmlPositions = [e.fmlPosition];
        e.transformOccurrences = [{
          propertyPosition: e.fmlPosition,
          transformName: e.transformName,
          transformPosition: e.transformPosition,
        }];
      }
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
function buildPropertyDisplay(type: DiagramType): PropertyDisplay[] {
  const properties = type.properties;
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
      expressionConnectionIds: entry.expressionConnectionIds,
      ruleName: entry.ruleName,
      isCreated: entry.isCreated,
      createdType: entry.createdType,
      transformFunction: entry.transformFunction,
      fmlPosition: entry.fmlPosition,
      ruleFmlPosition: entry.ruleFmlPosition,
      variableName: entry.variableName,
      isCollection: entry.isCollection,
      elementTypeName: entry.elementTypeName,
      rootTypeName: type.logicalModelTypeName ?? type.typeName,
      fhirVersion: type.fhirVersion,
      cardinalityMin: entry.cardinalityMin,
      cardinalityMax: entry.cardinalityMax,
      targetProfiles: entry.targetProfiles,
      specificationPath: entry.specificationPath,
      possibleTypeNames: entry.possibleTypeNames,
      compatibleTypeNames: entry.compatibleTypeNames,
      excludedTypeNames: entry.excludedTypeNames,
      unknownElement: entry.unknownElement,
      validationError: entry.validationError,
      isLeafRule: entry.isLeafRule,
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
const LOGICAL_MODEL_ICON_SPACE = 18;
const RULE_DIVIDER_HEIGHT = 16;

function typeBoxLabel(type: DiagramType): string {
  const displayTypeName = type.logicalModelTypeName ?? type.typeName;
  return displayTypeName ? `${displayTypeName} (${type.paramName})` : type.paramName;
}

function propertyTooltip(property: PropertyDisplay): string {
  const cardinality = property.cardinalityMin !== undefined && property.cardinalityMax
    ? ` [${property.cardinalityMin}..${property.cardinalityMax}]`
    : "";
  const heading = `${property.role === "source" ? "Source" : "Target"} property `
    + `${property.rootTypeName}.${property.fullPath}${cardinality}`
    + (property.fhirVersion ? ` (${property.fhirVersion})` : "");
  const lines = [heading];
  const possible = property.possibleTypeNames ?? [];
  const compatible = property.compatibleTypeNames ?? possible;
  const excluded = property.excludedTypeNames ?? [];
  if (possible.length > 1) {
    lines.push(`Compatible types: ${compatible.join(" | ") || "none"}`);
    if (excluded.length > 0) lines.push(`Other possible types: ${excluded.join(" | ")}`);
  } else if (property.elementTypeName) {
    lines.push(`Type: ${property.elementTypeName}`);
  }
  if (property.targetProfiles?.length) {
    lines.push(`Target profiles: ${property.targetProfiles.map(profile => {
      return `${formatTargetProfile(profile)} (${getTargetProfileUrl(profile, property.fhirVersion)})`;
    }).join(" | ")}`);
  }
  if (property.validationError) lines.push(`Issue: ${property.validationError}`);
  else if (property.unknownElement) lines.push("Issue: property not found in the selected FHIR model");
  return lines.join("\n");
}

function formatTargetProfile(profile: string): string {
  const prefix = "http://hl7.org/fhir/StructureDefinition/";
  return profile.startsWith(prefix) ? profile.slice(prefix.length) : profile;
}

function getTargetProfileUrl(profile: string, version?: FhirVersion): string {
  const prefix = "http://hl7.org/fhir/StructureDefinition/";
  if (!version || !profile.startsWith(prefix)) return profile;
  return `https://hl7.org/fhir/${version}/${profile.slice(prefix.length).toLowerCase()}.html`;
}

function calcTypeBoxSize(type: DiagramType): {
  width: number;
  height: number;
  propDisplay: PropertyDisplay[];
} {
  const propDisplay = buildPropertyDisplay(type);
  const headerLabel = typeBoxLabel(type);
  const headerWidth = headerLabel.length * CHAR_WIDTH + 2 * TYPE_BOX_PADDING_X
    + (type.isLogicalModel ? LOGICAL_MODEL_ICON_SPACE : 0);

  let maxPropWidth = 0;
  const hasAnyIcon = propDisplay.some((pd) => pd.filter || pd.typeFilter || pd.fixedValue || pd.isCreated || pd.transformFunction);
  const hasDoubleIcon = propDisplay.some((pd) => (pd.isCreated || pd.transformFunction) && (pd.filter || pd.typeFilter || pd.fixedValue));
  const iconExtra = hasDoubleIcon ? FILTER_ICON_SPACE * 2 : hasAnyIcon ? FILTER_ICON_SPACE : 0;
  for (const pd of propDisplay) {
    const collectionSuffixLen = pd.isCollection ? 2 : 0;
    const propertyLabelLen = pd.variableName
      ? pd.displayName.length + collectionSuffixLen + ` (${pd.variableName})`.length
      : pd.displayName.length + collectionSuffixLen;
    const w = pd.depth * PROP_INDENT + propertyLabelLen * CHAR_WIDTH + iconExtra;
    if (w > maxPropWidth) maxPropWidth = w;
  }
  const propsWidth = maxPropWidth + 2 * TYPE_BOX_PADDING_X;

  const width = Math.max(MIN_TYPE_WIDTH, headerWidth, propsWidth);
  const propCount = Math.max(propDisplay.length, 1);
  // Computed-source boxes suppress rule dividers in the renderer, so
  // their height calculation must skip them too.
  const dividerCount = type.isComputed ? 0 : countRuleDividers(propDisplay);
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

/** Render a sankey-style curved band between two vertical extents. */
function renderSankeyBand(
  svg: string[],
  x0: number, y0Top: number, y0Bottom: number,
  x1: number, y1Top: number, y1Bottom: number,
  tooltip: string,
  cls: string = "sm-sankey-ribbon",
  connIds?: number[],
): void {
  const cp = (x1 - x0) * 0.5;
  const idAttr = connIds && connIds.length > 0
    ? ` data-conn-id-list="${connIds.join(",")}"`
    : "";
  svg.push(
    `<path class="${cls}" d="M${x0} ${y0Top} C${x0 + cp} ${y0Top} ${x1 - cp} ${y1Top} ${x1} ${y1Top} L${x1} ${y1Bottom} C${x1 - cp} ${y1Bottom} ${x0 + cp} ${y0Bottom} ${x0} ${y0Bottom} Z" fill="${SANKEY_RIBBON_COLOR}"${idAttr}>${tooltip}</path>`
  );
}

/** Render a sankey-style curved ribbon between two points (fixed thickness). */
function renderSankeyRibbon(
  svg: string[],
  x0: number, y0: number,
  x1: number, y1: number,
  tooltip: string,
  connIds?: number[],
): void {
  const half = SANKEY_RIBBON_THICKNESS / 2;
  renderSankeyBand(svg, x0, y0 - half, y0 + half, x1, y1 - half, y1 + half, tooltip, "sm-sankey-ribbon", connIds);
}

// ===== Main SVG Generator =====

/**
 * Generate an SVG diagram from a FHIR StructureMap resource.
 * Each group is rendered as a box containing source and target type boxes
 * with the properties read/written listed inside each type box.
 */
export function generateInstanceDiagramSvg(map: StructureMap, typeLookup?: TypeLookup, showMissingProperties?: boolean, lookupForVersion?: LookupForVersion, isLogicalType?: LogicalTypeClassifier): string {
  const data = extractStructureMapDiagram(map, typeLookup, showMissingProperties, lookupForVersion, isLogicalType);

  return renderInstanceDiagramSvg(data);
}

/** Generate an SVG directly from the position-aware FML model. */
export function generateFmlInstanceDiagramSvg(fml: FmlStructureMap, typeLookup?: TypeLookup, showMissingProperties?: boolean, lookupForVersion?: LookupForVersion, isLogicalType?: LogicalTypeClassifier): string {
  const data = extractFmlStructureMapDiagram(fml, typeLookup, showMissingProperties, lookupForVersion, isLogicalType);
  return renderInstanceDiagramSvg(data);
}

function renderInstanceDiagramSvg(data: StructureMapDiagram): string {

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
  svg.push(`.sm-computed-title { fill: ${COLORS.computedHeaderText}; }`);
  svg.push(
    `.sm-prop { font-size: 12px; fill: ${COLORS.propText}; font-family: "Cascadia Code", "Fira Code", Consolas, monospace; }`
  );
  svg.push(".sm-choice-type { fill: #495057; }");
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
  svg.push(
    `[data-conn-id-list] { cursor: pointer; }`
  );
  // Highlight styles applied by the host page when a row or connector is
  // clicked (see handleDiagramClick).
  svg.push(
    `.sm-row-highlight { fill: rgba(255, 235, 59, 0.45) !important; }`
  );
  svg.push(
    `.sm-connector-line.sm-conn-highlight { stroke: #f57f17; stroke-width: 2.4; opacity: 1; }`
  );
  svg.push(
    `.sm-sankey-ribbon.sm-conn-highlight { fill: rgba(245, 127, 23, 0.55); }`
  );
  svg.push(
    `.sm-connector-port-source.sm-port-highlight, .sm-connector-port-source-connected.sm-port-highlight { stroke: #f57f17; stroke-width: 2.4; }`
  );
  svg.push(
    `.sm-connector-port-target.sm-port-highlight, .sm-connector-port-target-connected.sm-port-highlight { stroke: #f57f17; stroke-width: 2.4; }`
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
      /** Top-level rule id (shared across nested sub-rules). Used to
       *  aggregate per-rule sankey bands so nested rules contribute to
       *  the parent rule's vertical span. */
      ruleId?: number;
    }>();
    const expressionConnectionIds = new Set<number>();
    const propertyMarkers: PropertyMarker[] = [];
    /** Top-level rule ids whose source side uses a property accessor
     *  (e.g. `src.authored as s`). Such rules get per-connectionId thin
     *  lines instead of a sankey band, since the accessor row already
     *  visually pins the data flow to a specific property. */
    const rulesWithPropertyAccessorSource = new Set<number>();
    /** Top-level rule ids whose rule has no nested sub-rules and no
     *  dependent group calls ("leaf" rules). These represent direct
     *  value flow and are also rendered as thin lines. */
    const leafRuleIds = new Set<number>();

    // Render type boxes
    for (const tb of gl.typeBoxes) {
      const isSource = tb.mode === "source";
      const isComputed = !!tb.type.isComputed;
      const headerBg = isComputed
        ? COLORS.computedHeaderBg
        : isSource
          ? COLORS.sourceHeaderBg
          : COLORS.targetHeaderBg;
      const border = isComputed
        ? COLORS.computedBorder
        : isSource ? COLORS.sourceBorder : COLORS.targetBorder;
      const titleCls = isComputed
        ? "sm-computed-title"
        : isSource ? "sm-source-title" : "sm-target-title";

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
      const logicalIconOffset = tb.type.isLogicalModel ? LOGICAL_MODEL_ICON_SPACE : 0;
      if (tb.type.isLogicalModel) {
        svg.push(`<g class="sm-logical-model-header">`);
        const logicalCanonical = tb.type.logicalModelCanonical ?? tb.type.typeName;
        const logicalIdentity = tb.type.logicalModelVersion
          ? `${logicalCanonical}|${tb.type.logicalModelVersion}`
          : logicalCanonical;
        svg.push(`<title>Logical model type: ${escapeXml(logicalIdentity)}</title>`);
        svg.push(
          `<text x="${tb.x + TYPE_BOX_PADDING_X}" y="${tb.y + TYPE_HEADER_HEIGHT / 2 + 5}" class="sm-logical-model-icon ${titleCls}" aria-hidden="true">&#x25A6;</text>`
        );
      }
      svg.push(
        `<text x="${tb.x + TYPE_BOX_PADDING_X + logicalIconOffset}" y="${tb.y + TYPE_HEADER_HEIGHT / 2 + 5}" class="sm-type-title ${titleCls}">${escapeXml(label)}</text>`
      );
      // Clickable overlay for type box header
      if (typePos) {
        svg.push(
          `<rect x="${tb.x}" y="${tb.y}" width="${tb.width}" height="${TYPE_HEADER_HEIGHT}" fill="transparent"${typePosAttrs} />`
        );
      }
      if (tb.type.isLogicalModel) {
        svg.push("</g>");
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

          // Rule header bar: first rule and between different rules.
          // Skip on computed-value source boxes (single-row, the header
          // already names the variable so the divider would just be noise).
          if (!isComputed && (pi === 0 || pd.ruleId !== tb.propDisplay[pi - 1].ruleId)) {
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

          const rowConnectionIds = [
            ...(pd.connectionId !== undefined ? [pd.connectionId] : []),
            ...(pd.additionalConnectionIds ?? []),
          ];
          if (rowConnectionIds.length > 0) {
            const centerY = propY - PROP_LINE_HEIGHT / 2 + 4;
            // Use the property's role to determine anchor side:
            // source-role properties anchor on the right (source port), even in a target box
            // target-role properties anchor on the left (target port), even in a source box
            // Fallback to tb.mode when role is not set
            const effectiveRole = pd.role || tb.mode;
            const anchorX = effectiveRole === "source" ? tb.x + tb.width : tb.x;
            // A source row whose path is a real property accessor (not the
            // root-context placeholder ".") flags its top-level rule for
            // thin-line rendering instead of a sankey band.
            if (effectiveRole === "source" && pd.ruleId !== undefined &&
                pd.fullPath && pd.fullPath !== ".") {
              rulesWithPropertyAccessorSource.add(pd.ruleId);
            }
            // Leaf rules (no sub-rules and no dependents) also render as
            // thin lines — the rule represents a direct value flow.
            if (pd.ruleId !== undefined && pd.isLeafRule) {
              leafRuleIds.add(pd.ruleId);
            }
            const anchor: ConnectionAnchor = { x: anchorX, y: centerY, boxMode: tb.mode };
            for (const rowConnectionId of rowConnectionIds) {
              if (pd.expressionConnectionIds?.includes(rowConnectionId)) {
                expressionConnectionIds.add(rowConnectionId);
              }
              if (!connectionAnchors.has(rowConnectionId)) {
                connectionAnchors.set(rowConnectionId, {
                  sourceAnchors: [],
                  targetAnchors: [],
                  ruleName: pd.ruleName,
                  ruleId: pd.ruleId,
                });
              }
              const connection = connectionAnchors.get(rowConnectionId)!;
              if (!connection.ruleName && pd.ruleName) {
                connection.ruleName = pd.ruleName;
              }
              if (connection.ruleId === undefined && pd.ruleId !== undefined) {
                connection.ruleId = pd.ruleId;
              }
              if (effectiveRole === "source") {
                connection.sourceAnchors.push(anchor);
              } else {
                connection.targetAnchors.push(anchor);
              }
              propertyMarkers.push({ x: anchorX, y: centerY, mode: effectiveRole, connectionId: rowConnectionId });
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
            // Collect every connection id this row anchors so the host
            // page can highlight matching rows/connectors when clicked.
            const rowConnIds: number[] = [];
            if (pd.connectionId !== undefined) rowConnIds.push(pd.connectionId);
            for (const addl of pd.additionalConnectionIds || []) rowConnIds.push(addl);
            const connAttr = rowConnIds.length > 0
              ? ` data-conn-id-list="${rowConnIds.join(",")}"`
              : "";
            const tooltipText = propertyTooltip(pd);
            const tooltipChild = tooltipText ? `<title>${escapeXml(tooltipText)}</title>` : "";
            if (posAttrs || tooltipChild || connAttr) {
              svg.push(
                `<rect x="${tb.x + 1}" y="${rowTop}" width="${tb.width - 2}" height="${PROP_LINE_HEIGHT}" fill="transparent"${posAttrs}${connAttr}>${tooltipChild}</rect>`
              );
            }
          }
          propY += PROP_LINE_HEIGHT;
        }
      }
    }

    // Draw connectors.
    //
    // Strategy: aggregate anchors per top-level rule (ruleId) so a single
    // sankey band represents the rule's data flow. The band's vertical
    // extent on each side spans the union of all touched rows (from the
    // top of the highest row to the bottom of the lowest), so a rule whose
    // sub-rules touch multiple target rows produces a tall band that
    // visibly covers them.
    //
    // Target-to-target connections (from secondary target boxes) are kept
    // as per-connectionId dashed straight lines because they represent a
    // different concept (variable plumbing inside the target column).

    const halfRow = PROP_LINE_HEIGHT / 2;

    // Classify connectionIds: target-to-target vs source-to-target
    const t2tConnIds = new Set<number>();
    for (const [connId, positions] of connectionAnchors) {
      if (positions.sourceAnchors.length === 0 || positions.targetAnchors.length === 0) continue;
      const allInTarget =
        positions.sourceAnchors.every(a => a.boxMode === "target") &&
        positions.targetAnchors.every(a => a.boxMode === "target");
      if (allInTarget) t2tConnIds.add(connId);
    }

    // Aggregate source-to-target anchors per top-level ruleId
    interface RuleBand {
      sources: ConnectionAnchor[];
      targets: ConnectionAnchor[];
      ruleName?: string;
      connIds: Set<number>;
    }
    const ruleBands = new Map<number, RuleBand>();
    // Anchors that aren't tagged with a ruleId fall back to per-connectionId rendering
    const untaggedConnIds: number[] = [];
    for (const [connId, positions] of connectionAnchors) {
      if (t2tConnIds.has(connId)) continue;
      if (expressionConnectionIds.has(connId)) continue;
      if (positions.ruleId === undefined) {
        untaggedConnIds.push(connId);
        continue;
      }
      let band = ruleBands.get(positions.ruleId);
      if (!band) {
        band = { sources: [], targets: [], ruleName: positions.ruleName, connIds: new Set() };
        ruleBands.set(positions.ruleId, band);
      }
      band.sources.push(...positions.sourceAnchors);
      band.targets.push(...positions.targetAnchors);
      band.connIds.add(connId);
      if (!band.ruleName && positions.ruleName) band.ruleName = positions.ruleName;
    }

    // FHIRPath expression references always render as dotted source-to-target
    // lines, independently of the containing rule's normal data-flow band.
    for (const connId of expressionConnectionIds) {
      const positions = connectionAnchors.get(connId);
      if (!positions) continue;
      for (const sourceAnchor of positions.sourceAnchors) {
        for (const targetAnchor of positions.targetAnchors) {
          svg.push(
            `<g class="sm-expression-connector"><title>FHIRPath variable reference</title>`
            + `<line class="sm-connector-line sm-expression-connector-line" x1="${sourceAnchor.x}" y1="${sourceAnchor.y}" x2="${targetAnchor.x}" y2="${targetAnchor.y}" stroke-dasharray="2 4" data-conn-id-list="${connId}" />`
            + `</g>`
          );
        }
      }
    }

    // Draw a sankey band per ruleId (only when both sides contributed anchors).
    // Rules whose source side has a property accessor are rendered as
    // per-connectionId thin lines instead, so the band doesn't visually
    // "swallow" a specifically-named source field.
    const completeRuleIds = new Set<number>();
    for (const [rid, band] of ruleBands) {
      if (band.sources.length === 0 || band.targets.length === 0) continue;
      completeRuleIds.add(rid);

      const tooltip = band.ruleName ? `<title>rule: ${escapeXml(band.ruleName)}</title>` : "";

      if (rulesWithPropertyAccessorSource.has(rid) || leafRuleIds.has(rid)) {
        // Property-accessor source: draw a thin line per connectionId
        for (const cid of band.connIds) {
          const positions = connectionAnchors.get(cid);
          if (!positions) continue;
          for (const sourceAnchor of positions.sourceAnchors) {
            for (const targetAnchor of positions.targetAnchors) {
              svg.push(
                `<g class="sm-connector">${tooltip}` +
                `<line class="sm-connector-line" x1="${sourceAnchor.x}" y1="${sourceAnchor.y}" x2="${targetAnchor.x}" y2="${targetAnchor.y}" data-conn-id-list="${cid}" />` +
                `</g>`
              );
            }
          }
        }
        continue;
      }

      const sourceX = Math.max(...band.sources.map(a => a.x));
      const targetX = Math.min(...band.targets.map(a => a.x));
      if (sourceX >= targetX) continue;
      const sourceTop = Math.min(...band.sources.map(a => a.y - halfRow));
      const sourceBottom = Math.max(...band.sources.map(a => a.y + halfRow));
      const targetTop = Math.min(...band.targets.map(a => a.y - halfRow));
      const targetBottom = Math.max(...band.targets.map(a => a.y + halfRow));
      renderSankeyBand(svg, sourceX, sourceTop, sourceBottom, targetX, targetTop, targetBottom, tooltip, "sm-sankey-ribbon", [...band.connIds]);
    }

    // Untagged connectionIds (no ruleId): fall back to a thin straight line
    for (const connId of untaggedConnIds) {
      const positions = connectionAnchors.get(connId)!;
      if (positions.sourceAnchors.length === 0 || positions.targetAnchors.length === 0) continue;
      const tooltip = positions.ruleName ? `<title>rule: ${escapeXml(positions.ruleName)}</title>` : "";
      for (const sourceAnchor of positions.sourceAnchors) {
        for (const targetAnchor of positions.targetAnchors) {
          svg.push(
            `<g class="sm-connector">${tooltip}` +
            `<line class="sm-connector-line" x1="${sourceAnchor.x}" y1="${sourceAnchor.y}" x2="${targetAnchor.x}" y2="${targetAnchor.y}" data-conn-id-list="${connId}" />` +
            `</g>`
          );
        }
      }
    }

    // Target-to-target connectors (dashed)
    for (const connId of t2tConnIds) {
      const positions = connectionAnchors.get(connId)!;
      const tooltip = positions.ruleName ? `<title>rule: ${escapeXml(positions.ruleName)}</title>` : "";
      for (const sourceAnchor of positions.sourceAnchors) {
        for (const targetAnchor of positions.targetAnchors) {
          svg.push(
            `<g class="sm-connector">${tooltip}` +
            `<line class="sm-connector-line sm-connector-line-dashed" x1="${sourceAnchor.x}" y1="${sourceAnchor.y}" x2="${targetAnchor.x}" y2="${targetAnchor.y}" stroke-dasharray="6 3" data-conn-id-list="${connId}" />` +
            `</g>`
          );
        }
      }
    }

    // Collect connectionIds that participate in a drawn connector
    // (filled-port indicator).
    const connectedIds = new Set<number>();
    for (const [connId, positions] of connectionAnchors) {
      if (t2tConnIds.has(connId)) {
        connectedIds.add(connId);
        continue;
      }
      if (positions.ruleId !== undefined && completeRuleIds.has(positions.ruleId)) {
        connectedIds.add(connId);
        continue;
      }
      if (positions.sourceAnchors.length > 0 && positions.targetAnchors.length > 0) {
        connectedIds.add(connId);
      }
    }

    // Draw connector ports on type box properties
    for (const marker of propertyMarkers) {
      const isFilled = marker.connectionId !== undefined && connectedIds.has(marker.connectionId);
      const idAttr = marker.connectionId !== undefined
        ? ` data-conn-id-list="${marker.connectionId}"`
        : "";
      if (marker.mode === "source") {
        const cls = isFilled ? "sm-connector-port-source-connected" : "sm-connector-port-source";
        svg.push(
          `<circle class="${cls}" cx="${marker.x}" cy="${marker.y}" r="${CONNECTOR_PORT_RADIUS}"${idAttr} />`
        );
      } else {
        const cls = isFilled ? "sm-connector-port-target-connected" : "sm-connector-port-target";
        svg.push(
          `<rect class="${cls}" x="${marker.x - CONNECTOR_PORT_SIZE / 2}" y="${marker.y - CONNECTOR_PORT_SIZE / 2}" width="${CONNECTOR_PORT_SIZE}" height="${CONNECTOR_PORT_SIZE}" rx="1.5"${idAttr} />`
        );
      }
    }
  }

  svg.push("</svg>");
  return svg.join("\n");
}

