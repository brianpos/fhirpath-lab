// Smoke tests for the JSON-driven fhirpath_references module.
import { describe, expect, test } from "@jest/globals";
import {
  mapFunctionReferences,
  mapOperatorReferences,
  renderExampleHtml,
  renderExamplePlain,
} from "../helpers/fhirpath_references";

describe("mapFunctionReferences", () => {
  test("builds entries for normative functions from functions.json", () => {
    const count = mapFunctionReferences.get("count");
    expect(count).toBeDefined();
    expect(count?.title).toBe("count() : Integer");
    expect(count?.outlineNo).toBe("5.1.10");
    expect(count?.specUrl).toBe("https://build.fhir.org/ig/HL7/FHIRPath/#count--integer");
    expect(count?.status).toBe("normative");
    expect(count?.exampleOfUse).toContain("Patient.name.count()");
  });

  test("builds entries for STU functions also pointing at the build IG", () => {
    const sort = mapFunctionReferences.get("sort");
    expect(sort).toBeDefined();
    expect(sort?.status).toBe("STU");
    expect(sort?.specUrl?.startsWith("https://build.fhir.org/ig/HL7/FHIRPath/")).toBe(true);
  });

  test("formats functions with optional arguments using brackets", () => {
    const substring = mapFunctionReferences.get("substring");
    expect(substring?.title).toBe(
      "substring(start : Integer [, length : Integer]) : String"
    );
    expect(substring?.specUrl).toBe(
      "https://build.fhir.org/ig/HL7/FHIRPath/#substringstart--integer--length--integer--string"
    );

    const toQuantity = mapFunctionReferences.get("toQuantity");
    expect(toQuantity?.title).toBe("toQuantity([unit : String]) : Quantity");
  });

  test("FHIR / SDC extras are merged in and override spec entries on collision", () => {
    expect(mapFunctionReferences.get("extension")?.specUrl).toContain(
      "hl7.org/fhir/fhirpath.html"
    );
    expect(mapFunctionReferences.get("ordinal")?.specUrl).toContain(
      "sdc/expressions.html"
    );
  });
});

describe("mapOperatorReferences", () => {
  test("emits known operator anchors for symbolic operators", () => {
    expect(mapOperatorReferences.get("=")?.specUrl).toBe(
      "https://build.fhir.org/ig/HL7/FHIRPath/#-equals"
    );
    expect(mapOperatorReferences.get("in")?.specUrl).toBe(
      "https://build.fhir.org/ig/HL7/FHIRPath/#in-membership--boolean"
    );
    expect(mapOperatorReferences.get("contains")?.specUrl).toBe(
      "https://build.fhir.org/ig/HL7/FHIRPath/#contains-containership--boolean"
    );
  });

  test("formats is/as as `<op> type-specifier`", () => {
    expect(mapOperatorReferences.get("is")?.title).toBe("is type-specifier");
    expect(mapOperatorReferences.get("as")?.title).toBe("as type-specifier");
    // is operator (6.3.1) maps to its own anchor distinct from the function form (6.3.2)
    expect(mapOperatorReferences.get("is")?.specUrl).toBe(
      "https://build.fhir.org/ig/HL7/FHIRPath/#is-type-specifier"
    );
  });

  test("alphabetic operators link to the build IG", () => {
    expect(mapOperatorReferences.get("and")?.specUrl).toBe(
      "https://build.fhir.org/ig/HL7/FHIRPath/#and"
    );
    expect(mapOperatorReferences.get("xor")?.specUrl).toBe(
      "https://build.fhir.org/ig/HL7/FHIRPath/#xor"
    );
  });

  test("math operators get their kramdown anchors", () => {
    expect(mapOperatorReferences.get("+")?.specUrl).toBe(
      "https://build.fhir.org/ig/HL7/FHIRPath/#-addition"
    );
    expect(mapOperatorReferences.get("&")?.specUrl).toBe(
      "https://build.fhir.org/ig/HL7/FHIRPath/#-string-concatenation"
    );
  });
});

describe("example renderers", () => {
  test("renderExampleHtml escapes html and wraps fhirpath fences in <pre><code>", () => {
    const md = "```fhirpath\nObservation.value > 5 'mg' & 'x'\n```";
    const html = renderExampleHtml(md);
    expect(html).toContain("<pre");
    expect(html).toContain("Observation.value &gt; 5 &#39;mg&#39; &amp; &#39;x&#39;".replace(/&#39;/g, "'"));
    expect(html).toContain("&gt;");
    expect(html).toContain("&amp;");
  });

  test("renderExamplePlain strips fence markers", () => {
    const md = "```fhirpath\n'a'.length() // 1\n```";
    const plain = renderExamplePlain(md);
    expect(plain).toBe("'a'.length() // 1");
  });

  test("renderExampleHtml/Plain handle undefined/empty input gracefully", () => {
    expect(renderExampleHtml(undefined)).toBe("");
    expect(renderExamplePlain(undefined)).toBe("");
    expect(renderExampleHtml("")).toBe("");
  });
});
