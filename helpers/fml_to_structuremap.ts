import type {StructureMap, StructureMapGroupRule} from "fhir/r4b";
import type {FmlStructureMap, Rule as FmlRule} from "./fml_models";
import {parseCanonicalVersion} from "./fml_cross_version";

function convertTransformParameters(
  parameters: FmlRule["targets"][number]["transform"] extends infer T
    ? T extends {parameters: infer P} ? P : never
    : never,
): any[] {
  return parameters.map(parameter => {
    if (parameter.type === "identifier") return {valueId: String(parameter.value)};
    if (typeof parameter.value === "boolean") return {valueBoolean: parameter.value};
    if (typeof parameter.value === "number") {
      return parameter.literalType === "decimal"
        ? {valueDecimal: parameter.value}
        : {valueInteger: parameter.value};
    }
    return {valueString: String(parameter.value)};
  });
}

function convertRules(rules: FmlRule[]): StructureMapGroupRule[] {
  return rules.map(rule => {
    const converted: StructureMapGroupRule = {
      name: rule.name ?? "",
      source: rule.sources.map(source => {
        return {
          context: source.context,
          element: source.element,
          variable: source.variable,
          condition: source.condition,
          check: source.check,
          logMessage: source.log,
          type: source.type,
          min: source.min,
          max: source.max === undefined ? undefined : String(source.max),
          listMode: source.listMode,
        };
      }),
      target: rule.targets.map(target => {
        const convertedTarget: any = {
          context: target.context,
          element: target.element,
          variable: target.variable,
          transform: target.transform?.type,
          parameter: target.transform?.parameters
            ? convertTransformParameters(target.transform.parameters)
            : undefined,
          listMode: target.listMode ? [target.listMode] : undefined,
        };
        return convertedTarget;
      }),
    };
    const dependencies = rule.dependent?.invocations.map(invocation => ({
      name: invocation.name,
      variable: invocation.parameters.map(parameter => String(parameter.value)),
    })) ?? [];
    if (dependencies.length > 0) converted.dependent = dependencies;
    const batchRules: FmlRule[] = (rule.identityFields ?? []).map(field => ({
      position: field.position,
      name: field.name,
      sources: [{
        position: field.position,
        context: rule.sources[0]?.context ?? "",
        element: field.name,
      }],
      targets: [{
        position: field.position,
        context: rule.targets[0]?.context,
        element: field.name,
      }],
    }));
    const nestedRules = [...batchRules, ...(rule.dependent?.rules ?? [])];
    if (nestedRules.length) converted.rule = convertRules(nestedRules);
    return converted;
  });
}

export function fmlToStructureMap(fml: FmlStructureMap): StructureMap {
  interface ResolvedStructure {
    typeName: string;
  }

  const byAlias = new Map<string, ResolvedStructure>();
  const byTypeName = new Map<string, ResolvedStructure>();
  for (const structure of fml.structures) {
    const parsed = parseCanonicalVersion(structure.url);
    const canonical = structure.canonical ?? parsed.canonical;
    const resolved = {
      typeName: canonical.split("/").pop() || canonical,
    };
    if (structure.alias) byAlias.set(structure.alias, resolved);
    if (!byTypeName.has(resolved.typeName)) byTypeName.set(resolved.typeName, resolved);
  }

  const resolveInput = (declaredType: string | undefined, mode: "source" | "target") => {
    if (!declaredType) return declaredType;
    const match = byAlias.get(declaredType) ?? byTypeName.get(declaredType);
    return match?.typeName ?? declaredType;
  };

  return {
    resourceType: "StructureMap",
    status: "draft",
    name: fml.mapDeclaration?.identifier ?? "Untitled",
    url: fml.mapDeclaration?.url ?? "",
    structure: fml.structures.map(structure => ({
      url: structure.url,
      mode: structure.mode,
      alias: structure.alias,
    })),
    import: fml.imports.map(importDeclaration => importDeclaration.url),
    group: fml.groups.map(group => {
      const converted: any = {
        name: group.name,
        extends: group.extends,
        typeMode: group.typeMode === "type+" ? "type-and-types" : group.typeMode ?? "none",
        input: group.parameters.map(parameter => {
          return {
            name: parameter.name,
            type: resolveInput(parameter.type, parameter.mode),
            mode: parameter.mode,
          };
        }),
        rule: convertRules(group.rules),
      };
      return converted;
    }),
  };
}