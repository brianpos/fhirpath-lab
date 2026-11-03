import type { StructureMap, StructureMapGroupRule, StructureMapGroupRuleTargetParameter } from "fhir/r4b";
import type {
  FhirVersion,
  FmlStructureMap,
  Rule as FmlRule,
  SourcePosition,
  TransformParameter,
} from "./fml_models";
import { getFhirPathVariableReferences } from "./fhirpath_validator";
import { resolveTransformResultTypes } from "./fml_transform_signatures";

export type DiagramSourcePosition = Pick<SourcePosition, "startIndex" | "endIndex">
  & Partial<Pick<SourcePosition, "startLine" | "startColumn" | "endLine" | "endColumn">>;

export interface DiagramMapInput {
  group: DiagramGroupInput[];
}

export interface DiagramGroupInput {
  name: string;
  extends?: string;
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

export interface DiagramRuleInput {
  name?: string;
  source: Array<{
    context?: string;
    element?: string;
    variable?: string;
    condition?: string;
    type?: string;
    fmlPosition?: DiagramSourcePosition;
  }>;
  target: Array<{
    context?: string;
    element?: string;
    variable?: string;
    transform?: string;
    transformResultTypes?: string[];
    transformPosition?: DiagramSourcePosition;
    expressionVariables?: string[];
    parameter?: StructureMapGroupRuleTargetParameter[];
    fmlPosition?: DiagramSourcePosition;
  }>;
  dependent: Array<{name: string; variable: string[]}>;
  rule: DiagramRuleInput[];
  fmlPosition?: DiagramSourcePosition;
}

export function getDiagramPosition(value: unknown): DiagramSourcePosition | undefined {
  const candidate = value as {fmlPosition?: DiagramSourcePosition; _fmlPosition?: DiagramSourcePosition};
  return candidate.fmlPosition ?? candidate._fmlPosition;
}

/** Normalize optional FHIR rule arrays and keep extraction from mutating the resource. */
export function toStructureMapDiagramInput(map: StructureMap): DiagramMapInput {
  function convertRules(rules: StructureMapGroupRule[] = []): DiagramRuleInput[] {
    return rules.map(rule => ({
      ...rule,
      source: rule.source.map(source => ({ ...source, fmlPosition: getDiagramPosition(source) })),
      target: (rule.target ?? []).map(target => ({ ...target, fmlPosition: getDiagramPosition(target) })),
      dependent: (rule.dependent ?? []).map(dependent => ({
        ...dependent, variable: [...(dependent.variable ?? [])],
      })),
      rule: convertRules(rule.rule),
      fmlPosition: getDiagramPosition(rule),
    }));
  }
  return {
    group: map.group.map(group => ({
      ...group,
      input: group.input.map(input => ({
        ...input,
        fmlPosition: getDiagramPosition(input),
        fhirVersion: (input as typeof input & {_fmlVersion?: FhirVersion})._fmlVersion,
        typeDeclared: !!input.type,
      })),
      rule: convertRules(group.rule),
      fmlPosition: getDiagramPosition(group),
    })),
  };
}

/** Normalize FML for diagram extraction without creating a FHIR resource. */
export function toFmlDiagramInput(fml: FmlStructureMap): DiagramMapInput {
  const structuresByAlias = new Map<string, {typeName: string; version?: FhirVersion}>();
  const structuresByRoleAndType = new Map<string, {typeName: string; version?: FhirVersion}>();
  for (const structure of fml.structures) {
    const canonical = structure.canonical ?? structure.url;
    const resolved = {
      typeName: structure.resolvedTypeName ?? (canonical.split("/").pop() || canonical),
      version: structure.fhirVersion,
    };
    if (structure.alias) structuresByAlias.set(structure.alias, resolved);
    const parameterMode = structure.mode === "source" || structure.mode === "queried" ? "source" : "target";
    structuresByRoleAndType.set(`${parameterMode}:${resolved.typeName}`, resolved);
  }

  return {
    group: fml.groups.map(group => ({
      name: group.name,
      extends: group.extends,
      input: group.parameters.map(parameter => {
        const structure = parameter.type
          ? structuresByAlias.get(parameter.type)
            ?? structuresByRoleAndType.get(`${parameter.mode}:${parameter.type}`)
          : undefined;
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

function toDiagramTransformParameter(parameter: TransformParameter): StructureMapGroupRuleTargetParameter {
  if (parameter.type === "identifier") return {valueId: String(parameter.value)};
  if (typeof parameter.value === "boolean") return {valueBoolean: parameter.value};
  if (typeof parameter.value === "number") {
    return parameter.literalType === "decimal"
      ? {valueDecimal: parameter.value}
      : {valueInteger: parameter.value};
  }
  return {valueString: String(parameter.value)};
}
