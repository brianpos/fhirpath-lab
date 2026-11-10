/**
 * Prepares HL7 v2 content as source input for an FML transform.
 *
 * The v2 text is parsed with the same parser the FHIRPath page uses, then converted to the JSON
 * shape of the logical model the map declares as its source:
 *  - the generic FHIRPath-annex model (always available), or
 *  - a user supplied "specific" model (declared in the Models tab with `hl7v2-source` extensions).
 */

import type { Bundle, StructureDefinition } from "fhir/r4b";
import { isHl7v2Content, parseHl7v2Message } from "./hl7v2_parser";
import { isFmlParseError, parseFML } from "./fml_parser";
import {
  HL7V2_GENERIC_MESSAGE_URL,
  buildHl7v2GenericModels,
  isSpecificHl7v2Model,
  projectHl7v2ToSpecificModel,
  structureDefinitionsFrom,
  toGenericHl7v2Json,
} from "./hl7v2_logical_model";

export interface Hl7v2FmlInput {
  /** JSON text to submit to the transform engine as the source content */
  inputText: string;
  /** Models (Bundle JSON) to submit with the request: generic v2 model + any user models */
  modelText: string;
  style: "generic" | "specific";
  sourceUrl: string;
  warnings: string[];
}

export { isHl7v2Content };

/** Canonical URL of the first `source` structure declared by the map, if it can be parsed. */
export function findMapSourceUrl(mapText: string): string | undefined {
  const map = parseFML(mapText);
  if (isFmlParseError(map)) return undefined;
  const source = map.structures.find((s) => s.mode === "source");
  return (source?.canonical ?? source?.url)?.split("|")[0];
}

/** Merge the generic v2 model with user supplied resources; user definitions win on the same url. */
export function mergeHl7v2Models(userModelText?: string): { bundle: Bundle; userDefinitions: StructureDefinition[] } {
  let userResources: unknown[] = [];
  let userDefinitions: StructureDefinition[] = [];
  if (userModelText?.trim()) {
    const parsed = JSON.parse(userModelText);
    userDefinitions = structureDefinitionsFrom(parsed);
    userResources = parsed?.resourceType === "Bundle" ? (parsed.entry ?? []).map((e: any) => e.resource) : [parsed];
  }
  const userUrls = new Set(userDefinitions.map((d) => d.url.split("|")[0]));
  const generic = buildHl7v2GenericModels().filter((d) => !userUrls.has(d.url));
  const bundle: Bundle = {
    resourceType: "Bundle",
    type: "collection",
    entry: [...generic, ...userResources].filter(Boolean).map((resource: any) => ({ resource })),
  };
  return { bundle, userDefinitions };
}

export function prepareHl7v2FmlInput(
  v2Text: string,
  mapText: string,
  userModelText?: string,
): Hl7v2FmlInput {
  const { message } = parseHl7v2Message(v2Text);
  const { bundle, userDefinitions } = mergeHl7v2Models(userModelText);
  const sourceUrl = findMapSourceUrl(mapText) ?? HL7V2_GENERIC_MESSAGE_URL;
  const specific = userDefinitions.find(
    (d) => d.url.split("|")[0] === sourceUrl && isSpecificHl7v2Model(d),
  );
  const modelText = JSON.stringify(bundle, null, 2);

  if (specific) {
    const projected = projectHl7v2ToSpecificModel(message, sourceUrl, userDefinitions);
    return {
      inputText: JSON.stringify(projected.value, null, 2),
      modelText,
      style: "specific",
      sourceUrl,
      warnings: projected.warnings,
    };
  }
  return {
    inputText: JSON.stringify(toGenericHl7v2Json(message), null, 2),
    modelText,
    style: "generic",
    sourceUrl,
    warnings: [],
  };
}

/** Sample map using the generic model (always available). */
export const sampleHl7v2GenericMap = `/// url = 'http://fhirpath-lab.com/StructureMap/hl7v2-generic-to-patient'
/// name = 'Hl7v2GenericToPatient'
/// status = 'draft'

uses "http://hl7.org/fhirpath/v2/StructureDefinition/Message" alias V2Message as source
uses "http://hl7.org/fhir/StructureDefinition/Patient" as target

group Hl7v2ToPatient(source src : V2Message, target tgt : Patient) {
  src.segment as pid where (code = 'PID') -> tgt then PidToPatient(pid, tgt) "pid";
}

group PidToPatient(source pid, target tgt : Patient) {
  pid -> tgt.name as n then {
    pid -> n.family = (%pid.field.skip(4).first().element.first().component.skip(0).first().text) "family";
    pid -> n.given = (%pid.field.skip(4).first().element.first().component.skip(1).first().text) "given";
  } "name";
  pid -> tgt.birthDate = ((%pid.field.skip(6).first().element.first().text.substring(0, 4) + '-' + %pid.field.skip(6).first().element.first().text.substring(4, 2) + '-' + %pid.field.skip(6).first().element.first().text.substring(6, 2)).toDate()) "birthDate";
}
`;

/** Sample specific-style model: PID fields named as properties. */
export const sampleHl7v2SpecificModel: Bundle = {
  resourceType: "Bundle",
  type: "collection",
  entry: [
    {
      resource: {
        resourceType: "StructureDefinition",
        url: "http://example.org/StructureDefinition/v2/XPN",
        name: "XPN",
        status: "draft",
        kind: "logical",
        abstract: false,
        type: "http://example.org/StructureDefinition/v2/XPN",
        baseDefinition: "http://hl7.org/fhir/StructureDefinition/Base",
        derivation: "specialization",
        differential: {
          element: [
            { id: "XPN", path: "XPN" },
            { id: "XPN.family", path: "XPN.family", max: "1", type: [{ code: "string" }], extension: [{ url: "http://fhirpath-lab.com/StructureDefinition/hl7v2-source", valueString: "1" }] },
            { id: "XPN.given", path: "XPN.given", max: "1", type: [{ code: "string" }], extension: [{ url: "http://fhirpath-lab.com/StructureDefinition/hl7v2-source", valueString: "2" }] },
            { id: "XPN.middle", path: "XPN.middle", max: "1", type: [{ code: "string" }], extension: [{ url: "http://fhirpath-lab.com/StructureDefinition/hl7v2-source", valueString: "3" }] },
          ],
        },
      },
    },
    {
      resource: {
        resourceType: "StructureDefinition",
        url: "http://example.org/StructureDefinition/v2/ADT",
        name: "ADT",
        status: "draft",
        kind: "logical",
        abstract: false,
        type: "http://example.org/StructureDefinition/v2/ADT",
        baseDefinition: "http://hl7.org/fhir/StructureDefinition/Base",
        derivation: "specialization",
        differential: {
          element: [
            { id: "ADT", path: "ADT" },
            { id: "ADT.msh", path: "ADT.msh", max: "1", type: [{ code: "BackboneElement" }], extension: [{ url: "http://fhirpath-lab.com/StructureDefinition/hl7v2-source", valueString: "MSH" }] },
            { id: "ADT.msh.messageControlId", path: "ADT.msh.messageControlId", max: "1", type: [{ code: "string" }], extension: [{ url: "http://fhirpath-lab.com/StructureDefinition/hl7v2-source", valueString: "MSH-10" }] },
            { id: "ADT.pid", path: "ADT.pid", max: "1", type: [{ code: "BackboneElement" }], extension: [{ url: "http://fhirpath-lab.com/StructureDefinition/hl7v2-source", valueString: "PID" }] },
            { id: "ADT.pid.patientName", path: "ADT.pid.patientName", max: "*", type: [{ code: "http://example.org/StructureDefinition/v2/XPN" }], extension: [{ url: "http://fhirpath-lab.com/StructureDefinition/hl7v2-source", valueString: "PID-5" }] },
            { id: "ADT.pid.birthDate", path: "ADT.pid.birthDate", max: "1", type: [{ code: "date" }], extension: [{ url: "http://fhirpath-lab.com/StructureDefinition/hl7v2-source", valueString: "PID-7" }] },
            { id: "ADT.pid.sex", path: "ADT.pid.sex", max: "1", type: [{ code: "string" }], extension: [{ url: "http://fhirpath-lab.com/StructureDefinition/hl7v2-source", valueString: "PID-8" }] },
          ],
        },
      },
    },
  ],
};
