import { getExtensionStringValue } from "fhir-extension-helpers";
import { IJsonNodePosition } from "~/helpers/json_parser";

export interface ResultItem {
  type: string;
  value: any;
  path?: string;
}

export interface ResultData {
  context?: string;
  position?: IJsonNodePosition;
  result: ResultItem[];
  trace: TraceData[];
}

export interface TraceData {
  name: string;
  type?: string;
  value?: string;
  path?: string;
}

export interface JsonNode {
  id?: string;
  ExpressionType: string;
  Name: string;
  Arguments?: JsonNode[];
  ReturnType?: string;
  Position?: number;
  Length?: number;
  Line?: number;
  Column?: number;

  /** URL to the Specification for this node - Augmented by the Lab */
  SpecUrl?: string;
}

/** Fhirpath.js AST Node interface */
export interface fpjsNode {
  children?: fpjsNode[];
  terminalNodeText?: string[];
  text: string;
  type: string;
  start?: { line: number; column: number };
  length?: number;
}

export function getValue(entry: fhir4b.ParametersParameter): ResultItem[] {
  const extPath = getExtensionStringValue(
    entry,
    "http://fhir.forms-lab.com/StructureDefinition/resource-path"
  );
  let result: ResultItem[] = [];
  let myMap = new Map(Object.entries(entry));
  for (let [k, v] of myMap.entries()) {
    if (k.startsWith("value"))
      result.push({ type: k.replace("value", ""), value: v, path: extPath });
    else if (k == "resource")
      result.push({
        type: (v as fhir4b.Resource).resourceType,
        value: v,
        path: extPath,
      });
  }
  const extVal = getExtensionStringValue(
    entry,
    "http://fhir.forms-lab.com/StructureDefinition/json-value"
  );

  if (extVal)
    result.push({ type: entry.name, value: JSON.parse(extVal), path: extPath });
  if (entry.name == "empty-string")
    result.push({ type: "empty-string", value: "" });

  return result;
}

export function getTraceValue(entry: fhir4b.ParametersParameter): TraceData[] {
  let result: TraceData[] = [];
  if (entry.part) {
    for (let part of entry.part) {
      const extPath = getExtensionStringValue(
        part,
        "http://fhir.forms-lab.com/StructureDefinition/resource-path"
      );
      const val = getValue(part);
      let valueData: TraceData = {
        name: entry.valueString ?? "",
        type: part.name,
        path: extPath,
      };
      if (val.length > 0)
        valueData.value = JSON.stringify(val[0].value, null, 4);
      result.push(valueData);
    }
  }
  return result;
}
