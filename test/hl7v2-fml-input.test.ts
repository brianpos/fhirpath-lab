import { describe, expect, test } from "@jest/globals";
import { defaultHl7v2Message } from "../helpers/hl7v2_parser";
import {
  findMapSourceUrl,
  mergeHl7v2Models,
  prepareHl7v2FmlInput,
  sampleHl7v2GenericMap,
  sampleHl7v2SpecificModel,
} from "../helpers/hl7v2_fml_input";
import { buildHl7v2GenericModelBundle } from "../helpers/hl7v2_logical_model";

describe("HL7 v2 FML input", () => {
  test("generic bundle contains logical models", () => {
    const bundle = buildHl7v2GenericModelBundle();
    expect(bundle.entry!.length).toBeGreaterThanOrEqual(8);
    expect(bundle.entry!.every((e: any) => e.resource.kind === "logical")).toBe(true);
  });

  test("finds map source url", () => {
    expect(findMapSourceUrl(sampleHl7v2GenericMap)).toBe(
      "http://hl7.org/fhirpath/v2/StructureDefinition/Message",
    );
  });

  test("generic projection has segments without resourceType", () => {
    const r = prepareHl7v2FmlInput(defaultHl7v2Message, sampleHl7v2GenericMap);
    expect(r.style).toBe("generic");
    const json = JSON.parse(r.inputText);
    expect(json.resourceType).toBeUndefined();
    expect(json.segment.length).toBeGreaterThan(1);
  });

  test("specific projection uses named fields", () => {
    const map = `uses "http://example.org/StructureDefinition/v2/ADT" alias ADT as source
uses "http://hl7.org/fhir/StructureDefinition/Patient" as target
group G(source s : ADT, target t : Patient) { s.pid as p -> t.gender = 'unknown'; }`;
    const model = JSON.stringify(sampleHl7v2SpecificModel);
    const r = prepareHl7v2FmlInput(defaultHl7v2Message, map, model);
    expect(r.style).toBe("specific");
    const json = JSON.parse(r.inputText);
    expect(json.pid).toBeDefined();
    expect(mergeHl7v2Models(model).userDefinitions.length).toBe(2);
  });
});
