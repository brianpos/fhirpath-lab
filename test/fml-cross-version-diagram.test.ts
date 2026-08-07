// Tests that the FML diagram pipeline is cross-version aware: aliases on
// version-qualified `uses` declarations are resolved back to their underlying
// FHIR type and resolved against the model for the right FHIR release.
import { describe, expect, test } from "@jest/globals";
import { parseFML } from "../helpers/fml_parser";
import {
  extractFmlStructureMapDiagram,
  generateFmlInstanceDiagramSvg,
} from "../helpers/structuremap_diagram_instance";
import { fmlToStructureMap } from "../helpers/fml_to_structuremap";
import { lookupByTypeName as lookupR4B } from "../helpers/models/generated/r4b";
import { lookupByTypeName as lookupR5 } from "../helpers/models/generated/r5";
import type { FmlStructureMap, FhirVersion } from "../helpers/fml_models";
import type { TypeModel } from "../helpers/custom_model";
import { getFhirPathVariableReferences } from "../helpers/fhirpath_validator";

// Cross-version Appointment map (R4B -> R5) using version-qualified canonicals
// with aliases, mirroring the HL7 fhir-cross-version maps.
const APPOINTMENT_FML = `/// url = "http://hl7.org/fhir/uv/xver/StructureMap/Appointment4Bto5"
/// name = "Appointment4Bto5"

uses "http://hl7.org/fhir/4.3/StructureDefinition/Appointment" alias AppointmentR4B as source
uses "http://hl7.org/fhir/5.0/StructureDefinition/Appointment" alias AppointmentR5 as target

group Appointment(source src : AppointmentR4B, target tgt : AppointmentR5)  {
  src.identifier -> tgt.identifier;
  src.specialty -> tgt.specialty;
  src.appointmentType -> tgt.appointmentType;
  src.reasonCode -> tgt.reason;
}
`;

/** Version-aware resolver matching what pages/fml.vue wires up. */
const lookupForVersion = (v?: FhirVersion) =>
  v === "R5" ? lookupR5 : v === "R4B" ? lookupR4B : undefined;

describe("fmlToStructureMap compilation", () => {
  test("resolves aliases while emitting a clean FHIR resource", () => {
    const fml = parseFML(APPOINTMENT_FML) as FmlStructureMap;
    expect((fml as any).resourceType).toBeUndefined();

    const map = fmlToStructureMap(fml);
    const inputs = map.group[0].input!;

    const src = inputs.find((i) => i.name === "src") as any;
    const tgt = inputs.find((i) => i.name === "tgt") as any;

    // The alias (AppointmentR4B / AppointmentR5) must be resolved to the real
    // type name so the diagram can look it up in the model dictionary.
    expect(src.type).toBe("Appointment");
    expect(tgt.type).toBe("Appointment");
    expect(map.structure?.map((structure) => structure.url)).toEqual([
      "http://hl7.org/fhir/4.3/StructureDefinition/Appointment",
      "http://hl7.org/fhir/5.0/StructureDefinition/Appointment",
    ]);
    expect(JSON.stringify(map)).not.toContain("_fmlPosition");
    expect(JSON.stringify(map)).not.toContain("_fmlVersion");
  });
});

describe("direct FML diagram extraction", () => {
  test("simple batch identity fields appear on both source and target boxes", () => {
    const fml = parseFML([
      "uses 'http://hl7.org/fhir/5.0/StructureDefinition/Patient' alias Patient as source",
      "uses 'http://hl7.org/fhir/5.0/StructureDefinition/Patient' alias PatientTarget as target",
      "group Main(source src : Patient, target tgt : PatientTarget) {",
      "  src -> tgt: id, active, gender;",
      "}",
    ].join("\n")) as FmlStructureMap;
    const diagram = extractFmlStructureMapDiagram(fml, lookupR5, true, lookupForVersion);
    const group = diagram.groups[0];

    expect(group.sourceTypes[0].properties.map(property => property.path)).toEqual(
      expect.arrayContaining(["id", "active", "gender"]),
    );
    expect(group.targetTypes[0].properties.map(property => property.path)).toEqual(
      expect.arrayContaining(["id", "active", "gender"]),
    );
    expect(group.sourceTypes[0].properties.every(property => !property.unknownElement)).toBe(true);
    expect(group.targetTypes[0].properties.every(property => !property.unknownElement)).toBe(true);
  });

  test("logical model properties resolve through a custom TypeModel lookup", () => {
    const fml = parseFML([
      "uses 'http://example.org/StructureDefinition/ClaimRow' alias ClaimRow as source",
      "group Main(source src : ClaimRow, target tgt) {",
      "  src.claimNumber -> tgt.id;",
      "}",
    ].join("\n")) as FmlStructureMap;
    const claimRow: TypeModel = {
      TypeName: "ClaimRow",
      CanonicalUrl: "http://example.org/StructureDefinition/ClaimRow",
      Version: "1.2.3",
      Elements: [{ElementName: "claimNumber", Type: [{TypeName: "string"}]}],
    };
    const customLookup = (typeName: string) => typeName === "ClaimRow"
      ? claimRow
      : lookupR4B(typeName);

    const diagram = extractFmlStructureMapDiagram(fml, customLookup, true, () => customLookup);
    const source = diagram.groups[0].sourceTypes[0];
    const property = source.properties.find(candidate => candidate.path === "claimNumber");

    expect(source.typeName).toBe("ClaimRow");
    expect(property?.unknownElement).not.toBe(true);
    expect(property?.elementTypeName).toBe("string");
  });

  test("logical model type headers include an icon and tooltip", () => {
    const fml = parseFML([
      "uses 'http://example.org/StructureDefinition/ClaimRow' alias ClaimRow as source",
      "uses 'http://hl7.org/fhir/4.3/StructureDefinition/Patient' alias Patient as target",
      "group Main(source src : ClaimRow, target tgt : Patient) {",
      "  src.claimNumber -> tgt.id;",
      "}",
    ].join("\n")) as FmlStructureMap;
    const claimRow: TypeModel = {
      TypeName: "ClaimRow",
      CanonicalUrl: "http://example.org/StructureDefinition/ClaimRow",
      Version: "1.2.3",
      Elements: [{ElementName: "claimNumber", Type: [{TypeName: "string"}]}],
    };
    const customLookup = (typeName: string) => typeName === "ClaimRow"
      ? claimRow
      : lookupR4B(typeName);
    const svg = generateFmlInstanceDiagramSvg(
      fml,
      customLookup,
      true,
      () => customLookup,
      typeName => typeName === "ClaimRow",
    );

    expect(svg.match(/class="sm-logical-model-icon\b/g)).toHaveLength(1);
    expect(svg).toContain("<title>Logical model type: http://example.org/StructureDefinition/ClaimRow|1.2.3</title>");
    expect(svg).toContain(">ClaimRow (src)</text>");
    expect(svg).not.toContain("<title>Logical model type: Patient</title>");
  });

  test("source resolves against R4B and target against R5", () => {
    const fml = parseFML(APPOINTMENT_FML) as FmlStructureMap;

    const diagram = extractFmlStructureMapDiagram(fml, lookupR4B, true, lookupForVersion);
    const group = diagram.groups[0];

    const srcBox = group.sourceTypes[0];
    const tgtBox = group.targetTypes[0];

    expect(srcBox.typeName).toBe("Appointment");
    expect(srcBox.fhirVersion).toBe("R4B");
    expect(tgtBox.typeName).toBe("Appointment");
    expect(tgtBox.fhirVersion).toBe("R5");

    const unknownPaths = (box: typeof srcBox) =>
      box.properties.filter((p) => p.unknownElement).map((p) => p.path);

    // Every property must resolve against its version's model. Notably
    // `reasonCode` exists only in R4B and `reason` only in R5 — they would be
    // flagged as unknown if both boxes used the same (wrong) model.
    expect(unknownPaths(srcBox)).toEqual([]);
    expect(unknownPaths(tgtBox)).toEqual([]);

    expect(group.fmlPosition).toEqual(fml.groups[0].position);
    expect(srcBox.fmlPosition).toEqual(fml.groups[0].parameters[0].position);
    expect(tgtBox.fmlPosition).toEqual(fml.groups[0].parameters[1].position);
    expect(srcBox.properties[0].fmlPosition).toEqual(fml.groups[0].rules[0].sources[0].position);
    expect(tgtBox.properties[0].fmlPosition).toEqual(fml.groups[0].rules[0].targets[0].position);
    expect(srcBox.properties[0].ruleFmlPosition).toEqual(fml.groups[0].rules[0].position);
  });

  test("R5-only target element is flagged when the version resolver is absent", () => {
    // Without the version-aware resolver, both boxes fall back to R4B; the
    // R5-only `tgt.reason` element should then be reported as unknown. This
    // guards against a regression where version awareness is silently lost.
    const fml = parseFML(APPOINTMENT_FML) as FmlStructureMap;

    const diagram = extractFmlStructureMapDiagram(fml, lookupR4B, true);
    const tgtBox = diagram.groups[0].targetTypes[0];
    const reason = tgtBox.properties.find((p) => p.path === "reason");
    expect(reason?.unknownElement).toBe(true);
  });
});

describe("choice property type narrowing", () => {
  const models: TypeModel[] = [
    {
      TypeName: "Root",
      Elements: [{
        ElementName: "choice[x]",
        Type: [{TypeName: "Alpha"}, {TypeName: "Beta"}, {TypeName: "Gamma"}],
      }],
    },
    {TypeName: "Alpha", Elements: [{ElementName: "shared", Type: [{TypeName: "string"}]}]},
    {TypeName: "Beta", Elements: [{ElementName: "shared", Type: [{TypeName: "string"}]}]},
    {TypeName: "Gamma", Elements: [{ElementName: "other", Type: [{TypeName: "string"}]}]},
    {TypeName: "string", Elements: []},
  ];
  const lookup = (typeName: string) => models.find(model => model.TypeName === typeName);
  const fml: FmlStructureMap = {
    metadata: [],
    conceptMaps: [],
    structures: [],
    imports: [],
    constants: [],
    groups: [{
      name: "ChoiceMap",
      parameters: [{mode: "source", name: "src", type: "Root"}],
      rules: [{
        sources: [{context: "src", element: "choice", variable: "selected"}],
        targets: [],
        dependent: {
          invocations: [],
          rules: [{
            sources: [{context: "selected", element: "shared"}],
            targets: [],
          }],
        },
      }],
    }],
  };

  test("child paths filter compatible types while retaining all alternatives", () => {
    const diagram = extractFmlStructureMapDiagram(fml, lookup);
    const choice = diagram.groups[0].sourceTypes[0].properties.find(property => property.path === "choice");

    expect(choice?.possibleTypeNames).toEqual(["Alpha", "Beta", "Gamma"]);
    expect(choice?.compatibleTypeNames).toEqual(["Alpha", "Beta"]);
    expect(choice?.excludedTypeNames).toEqual(["Gamma"]);
    expect(choice?.unknownElement).not.toBe(true);
  });

  test("SVG keeps choice types in the tooltip only", () => {
    const svg = generateFmlInstanceDiagramSvg(fml, lookup);

    expect(svg).not.toContain('class="sm-choice-type"');
    expect(svg).not.toContain("sm-choice-type-excluded");
    expect(svg).toContain("Compatible types: Alpha | Beta");
    expect(svg).toContain("Other possible types: Gamma");
  });
});

describe("FML type restrictions and dependent target inference", () => {
  test("sibling filtered choice bindings retain independent types", () => {
    const text = [
      "uses 'http://hl7.org/fhir/5.0/StructureDefinition/Observation' alias Observation as source",
      "group Main(source src : Observation, target tgt : Observation) {",
      "  src.value : Quantity as quantity -> tgt then { quantity.value -> tgt.value; };",
      "  src.value : CodeableConcept as concept -> tgt then { concept.coding -> tgt.value; };",
      "  src.value : string as text -> tgt.value = text;",
      "}",
    ].join("\n");
    const fml = parseFML(text) as FmlStructureMap;
    const diagram = extractFmlStructureMapDiagram(fml, lookupR5, true, lookupForVersion);
    const values = diagram.groups[0].sourceTypes[0].properties
      .filter(property => property.path === "value" && property.variableName);

    expect(values.map(property => property.compatibleTypeNames)).toEqual([
      ["Quantity"],
      ["CodeableConcept"],
      ["string"],
    ]);
    expect(values.every(property => !property.validationError)).toBe(true);
  });

  test("invalid choice type filters report the allowed types", () => {
    const text = [
      "uses 'http://hl7.org/fhir/5.0/StructureDefinition/Observation' alias Observation as source",
      "group Main(source src : Observation, target tgt : Observation) {",
      "  src.value : Patient as invalid -> tgt.value;",
      "}",
    ].join("\n");
    const fml = parseFML(text) as FmlStructureMap;
    const diagram = extractFmlStructureMapDiagram(fml, lookupR5, true, lookupForVersion);
    const value = diagram.groups[0].sourceTypes[0].properties.find(property => property.variableName === "invalid");

    expect(value?.validationError).toContain('Type filter "Patient" is not allowed');
    expect(value?.validationError).toContain("CodeableConcept");
    expect(value?.validationError).toContain("Quantity");
  });

  test("an explicit source type restriction narrows a choice to one type", () => {
    const text = [
      "uses 'http://hl7.org/fhir/5.0/StructureDefinition/Condition' alias Condition as source",
      "group Main(source src : Condition, target tgt : Condition) {",
      "    src.onset : Age -> tgt.onset;",
      "}",
    ].join("\n");
    const fml = parseFML(text) as FmlStructureMap;
    const diagram = extractFmlStructureMapDiagram(fml, lookupR5, true, lookupForVersion);
    const onset = diagram.groups[0].sourceTypes[0].properties.find(property => property.path === "onset");

    expect(onset?.possibleTypeNames).toEqual(["Age", "Period", "Range", "dateTime", "string"]);
    expect(onset?.compatibleTypeNames).toEqual(["Age"]);
    expect(onset?.excludedTypeNames).toEqual(["Period", "Range", "dateTime", "string"]);

    const svg = generateFmlInstanceDiagramSvg(fml, lookupR5, true, lookupForVersion);
    expect(svg).not.toContain('class="sm-choice-type"');
    expect(svg).toContain("Source property Condition.onset [0..1] (R5)");
    expect(svg).toContain("Compatible types: Age");
    expect(svg).toContain("Other possible types: Period | Range | dateTime | string");
    expect(svg).toContain("Type filter: Age");
    expect(svg).not.toContain("condition-definitions.html#Condition.onset_x_");
  });

  test("target property SVG tooltips match editor metadata", () => {
    const text = [
      "uses 'http://hl7.org/fhir/5.0/StructureDefinition/Patient' alias Patient as source",
      "group Main(source src : Patient, target tgt : Patient) {",
      "    src.generalPractitioner -> tgt.generalPractitioner;",
      "}",
    ].join("\n");
    const fml = parseFML(text) as FmlStructureMap;
    const svg = generateFmlInstanceDiagramSvg(fml, lookupR5, true, lookupForVersion);

    expect(svg).toContain("Target property Patient.generalPractitioner [0..*] (R5)");
    expect(svg).toContain("Type: Reference");
    expect(svg).toContain("Practitioner (https://hl7.org/fhir/R5/practitioner.html)");
    expect(svg).not.toContain("patient-definitions.html#Patient.generalPractitioner");
  });

  test("choice rows omit type suffixes while retaining tooltip types", () => {
    const text = [
      "uses 'http://hl7.org/fhir/5.0/StructureDefinition/Condition' alias Condition as target",
      "group Main(source src : Condition, target tgt : Condition) {",
      "    src.onset -> tgt.onset;",
      "}",
    ].join("\n");
    const fml = parseFML(text) as FmlStructureMap;
    const svg = generateFmlInstanceDiagramSvg(fml, lookupR5, true, lookupForVersion);

    expect(svg).toContain('<text x="');
    expect(svg).not.toContain('tgt.onset : Age');
    expect(svg).not.toContain('class="sm-choice-type"');
    expect(svg).toContain("Target property Condition.onset [0..1] (R5)");
    expect(svg).toContain("Compatible types: Age | Period | Range | dateTime | string");
  });

  test("untyped dependent target inputs inherit the target property type", () => {
    const text = [
      "uses 'http://hl7.org/fhir/4.3/StructureDefinition/Condition' alias ConditionR4B as source",
      "uses 'http://hl7.org/fhir/5.0/StructureDefinition/Condition' alias ConditionR5 as target",
      "group Main(source src : ConditionR4B, target tgt : ConditionR5) {",
      "    src.recorder as recorder -> tgt.participant as targetRecorder then ConditionRecorder(recorder, targetRecorder);",
      "    src.asserter as asserter -> tgt.participant as targetAsserter then ConditionAsserter(asserter, targetAsserter);",
      "}",
      "group ConditionRecorder(source src, target tgt) {",
      "    src -> tgt.actor;",
      "}",
      "group ConditionAsserter(source src, target tgt) {",
      "    src -> tgt.actor;",
      "}",
    ].join("\n");
    const fml = parseFML(text) as FmlStructureMap;
    const diagram = extractFmlStructureMapDiagram(fml, lookupR5, true, lookupForVersion);

    for (const groupName of ["ConditionRecorder", "ConditionAsserter"]) {
      const group = diagram.groups.find(candidate => candidate.name === groupName);
      expect(group?.sourceTypes[0].typeName).toBe("Reference");
      expect(group?.targetTypes[0].typeName).toBe("condition_participant");
      expect(group?.sourceTypes[0].typeResolution).toBe("context");
      expect(group?.targetTypes[0].typeResolution).toBe("context");
    }
  });
});

describe("FHIRPath expression connections", () => {
  test("draws a dotted connector from a referenced source alias to the target", () => {
    const text = [
      "uses 'http://hl7.org/fhir/5.0/StructureDefinition/Condition' alias Condition as source",
      "group Main(source src : Condition, target tgt : Condition) {",
      "    src.onset : Period as a -> tgt.recordedDate = (a.start.value);",
      "}",
    ].join("\n");
    const fml = parseFML(text) as FmlStructureMap;
    expect(getFhirPathVariableReferences("a.start.value", ["a"])).toEqual(["a"]);
    expect(getFhirPathVariableReferences("%a.start.value", ["a"])).toEqual(["a"]);
    const svg = generateFmlInstanceDiagramSvg(fml, lookupR5, true, lookupForVersion);

    expect(svg).toContain('class="sm-expression-connector"');
    expect(svg).toContain('class="sm-connector-line sm-expression-connector-line"');
    expect(svg).toContain('stroke-dasharray="2 4"');
    expect(svg).toContain("FHIRPath variable reference");
  });

  test("draws a dotted connector from a referenced root parameter to the target", () => {
    const text = [
      "uses 'http://hl7.org/fhir/5.0/StructureDefinition/QuestionnaireResponse' alias QuestionnaireResponse as source",
      "uses 'http://hl7.org/fhir/5.0/StructureDefinition/Observation' alias Observation as target",
      "group Main(source src : QuestionnaireResponse, target tgt : Observation) {",
      "    src.id -> tgt.derivedFrom as df, df.reference = ('QuestionnaireResponse/' & src.id);",
      "}",
    ].join("\n");
    const fml = parseFML(text) as FmlStructureMap;
    const diagram = extractFmlStructureMapDiagram(fml, lookupR5, true, lookupForVersion);
    const rootReference = diagram.groups[0].sourceTypes[0].properties.find(property => property.path === ".");
    const svg = generateFmlInstanceDiagramSvg(fml, lookupR5, true, lookupForVersion);

    expect(rootReference?.expressionConnectionIds).toHaveLength(1);
    expect(svg).toContain('class="sm-expression-connector"');
    expect(svg).toContain("FHIRPath variable reference");
  });

  test("draws dotted connectors from every root parameter referenced by an expression", () => {
    const text = [
      "group Main(source left, source right, target tgt) {",
      "    left -> tgt.id = (left.id & right.id);",
      "}",
    ].join("\n");
    const fml = parseFML(text) as FmlStructureMap;
    const diagram = extractFmlStructureMapDiagram(fml, lookupR5, true, lookupForVersion);

    for (const source of diagram.groups[0].sourceTypes) {
      expect(source.properties.find(property => property.path === ".")?.expressionConnectionIds).toHaveLength(1);
    }
  });

  test("connects a computed source consumed through a dependent group expression", () => {
    const text = [
      "uses 'http://hl7.org/fhir/5.0/StructureDefinition/QuestionnaireResponse' alias QuestionnaireResponse as source",
      "uses 'http://hl7.org/fhir/5.0/StructureDefinition/Observation' alias Observation as target",
      "group Main(source src : QuestionnaireResponse, target tgt : Observation) {",
      "    src -> cc('http://example.org/sdh/demo/CodeSystem/cc-screening-codes', 'sigmoidoscopy-complication') as coding",
      "        then PopulateObservation(src, tgt, coding);",
      "}",
      "group PopulateObservation(source src : QuestionnaireResponse, target tgt : Observation, source coding : CodeableConcept) {",
      "    src -> tgt.code = (%coding);",
      "}",
    ].join("\n");
    const fml = parseFML(text) as FmlStructureMap;
    const diagram = extractFmlStructureMapDiagram(fml, lookupR5, true, lookupForVersion);
    const main = diagram.groups.find(group => group.name === "Main")!;
    const computed = main.sourceTypes.find(type => type.paramName === "coding")!;
    const code = main.targetTypes[0].properties.find(property => property.path === "code")!;
    const svg = generateFmlInstanceDiagramSvg(fml, lookupR5, true, lookupForVersion);

    expect(code.additionalConnectionIds).toContain(computed.properties[0].connectionId);
    expect(code.expressionConnectionIds).toContain(computed.properties[0].connectionId);
    expect(svg).toContain('class="sm-expression-connector"');
    expect(svg).toContain("FHIRPath variable reference");
  });
});

describe("diagram presentation details", () => {
  test("abbreviates long computed-source namespaces and keeps the full expression in the tooltip", () => {
    const text = [
      "uses 'http://hl7.org/fhir/5.0/StructureDefinition/QuestionnaireResponse' alias QuestionnaireResponse as source",
      "uses 'http://hl7.org/fhir/5.0/StructureDefinition/Observation' alias Observation as target",
      "group Main(source src : QuestionnaireResponse, target tgt : Observation) {",
      "    src -> cc('http://example.org/sdh/demo/CodeSystem/cc-screening-codes', 'sigmoidoscopy-complication') as coding, tgt.code = coding;",
      "}",
    ].join("\n");
    const fml = parseFML(text) as FmlStructureMap;
    const svg = generateFmlInstanceDiagramSvg(fml, lookupR5, true, lookupForVersion);

    expect(svg).toContain("cc(..., &apos;sigmoidoscopy-complication&apos;)");
    expect(svg).toContain("cc(&apos;http://example.org/sdh/demo/CodeSystem/cc-screening-codes&apos;, &apos;sigmoidoscopy-complication&apos;)");
  });

  test("shows source filters and target fixed values in full-row tooltips", () => {
    const text = [
      "uses 'http://hl7.org/fhir/5.0/StructureDefinition/Observation' alias Observation as source",
      "group Main(source src : Observation, target tgt : Observation) {",
      "    src.status as status where (status = 'final') -> tgt.status = 'fixed';",
      "}",
    ].join("\n");
    const fml = parseFML(text) as FmlStructureMap;
    const svg = generateFmlInstanceDiagramSvg(fml, lookupR5, true, lookupForVersion);

    expect(svg).toContain("Where: status = &apos;final&apos;");
    expect(svg).toContain("Fixed value: &quot;fixed&quot;");
  });

  test("keeps unused source and target parameters visible", () => {
    const text = [
      "group Main(source src, source unusedSource, target tgt, target unusedTarget) {",
      "    src -> tgt;",
      "}",
    ].join("\n");
    const fml = parseFML(text) as FmlStructureMap;
    const diagram = extractFmlStructureMapDiagram(fml, lookupR5, true, lookupForVersion);
    const svg = generateFmlInstanceDiagramSvg(fml, lookupR5, true, lookupForVersion);

    expect(diagram.groups[0].sourceTypes.map(type => type.paramName)).toEqual(["src", "unusedSource"]);
    expect(diagram.groups[0].targetTypes.map(type => type.paramName)).toEqual(["tgt", "unusedTarget"]);
    expect(svg).toContain("unusedSource");
    expect(svg).toContain("unusedTarget");
  });

  test("recursively blends extended group rules into the derived group", () => {
    const text = [
      "uses 'http://hl7.org/fhir/5.0/StructureDefinition/Patient' alias Patient as source",
      "group Base(source baseSrc : Patient, target baseTgt : Patient) { baseSrc.id -> baseTgt.id; }",
      "group Middle(source middleSrc : Patient, target middleTgt : Patient) extends Base { middleSrc.active -> middleTgt.active; }",
      "group Derived(source src : Patient, target tgt : Patient) extends Middle { src.gender -> tgt.gender; }",
    ].join("\n");
    const fml = parseFML(text) as FmlStructureMap;
    const diagram = extractFmlStructureMapDiagram(fml, lookupR5, true, lookupForVersion);
    const derived = diagram.groups.find(group => group.name === "Derived");

    expect(derived?.sourceTypes[0].properties.map(property => property.path)).toEqual(
      expect.arrayContaining(["id", "active", "gender"]),
    );
    expect(derived?.targetTypes[0].properties.map(property => property.path)).toEqual(
      expect.arrayContaining(["id", "active", "gender"]),
    );
  });
});

describe("fixed-point dependent group type resolution", () => {
  const administrableProductChain = [
    "uses 'http://hl7.org/fhir/4.3/StructureDefinition/AdministrableProductDefinition' alias APDR4B as source",
    "uses 'http://hl7.org/fhir/5.0/StructureDefinition/AdministrableProductDefinition' alias APDR5 as target",
    "group Root(source src : APDR4B, target tgt : APDR5) {",
    "  src.routeOfAdministration as s -> tgt.routeOfAdministration as t then Route(s, t);",
    "}",
    "group Route(source src, target tgt) {",
    "  src.targetSpecies as s -> tgt.targetSpecies as t then Species(s, t);",
    "}",
    "group Species(source src, target tgt) {",
    "  src.withdrawalPeriod as s -> tgt.withdrawalPeriod as t then Withdrawal(s, t);",
    "}",
    "group Withdrawal(source src, target tgt) {",
    "  src.tissue -> tgt.tissue;",
    "}",
  ].join("\n");

  test("propagates source and target types through every dependency level", () => {
    const fml = parseFML(administrableProductChain) as FmlStructureMap;
    const diagram = extractFmlStructureMapDiagram(fml, lookupR4B, true, lookupForVersion);
    const expected = [
      ["Route", "administrableproductdefinition_routeOfAdministration"],
      ["Species", "administrableproductdefinition_routeOfAdministration_targetSpecies"],
      ["Withdrawal", "administrableproductdefinition_routeOfAdministration_targetSpecies_withdrawalPeriod"],
    ];

    for (const [groupName, typeName] of expected) {
      const group = diagram.groups.find(candidate => candidate.name === groupName);
      expect(group?.sourceTypes[0]).toMatchObject({typeName, fhirVersion: "R4B", typeResolution: "context"});
      expect(group?.targetTypes[0]).toMatchObject({typeName, fhirVersion: "R5", typeResolution: "context"});
    }
  });

  test("scans dependencies in groups that are not reachable from the first group", () => {
    const text = [
      "uses 'http://hl7.org/fhir/5.0/StructureDefinition/Patient' alias Patient as source",
      "group First(source src : Patient, target tgt : Patient) {",
      "}",
      "group Detached(source src : Patient, target tgt : Patient) {",
      "  src.name as s -> tgt.name as t then Name(s, t);",
      "}",
      "group Name(source src, target tgt) {",
      "  src.family -> tgt.family;",
      "}",
    ].join("\n");
    const fml = parseFML(text) as FmlStructureMap;
    const diagram = extractFmlStructureMapDiagram(fml, lookupR5, true, lookupForVersion);
    const group = diagram.groups.find(candidate => candidate.name === "Name");

    expect(group?.sourceTypes[0]).toMatchObject({typeName: "HumanName", fhirVersion: "R5", typeResolution: "context"});
    expect(group?.targetTypes[0]).toMatchObject({typeName: "HumanName", fhirVersion: "R5", typeResolution: "context"});
  });

  test("propagates uuid string results into dependent group parameters", () => {
    const text = [
      "uses 'http://hl7.org/fhir/StructureDefinition/QuestionnaireResponse' as source",
      "uses 'http://hl7.org/fhir/StructureDefinition/Bundle' as target",
      "group Root(source src : QuestionnaireResponse, target tgt : Bundle) {",
      "  src -> tgt.entry as entry, uuid() as fullUrl then PopulateBundleEntry(src, entry, fullUrl);",
      "}",
      "group PopulateBundleEntry(source src : QuestionnaireResponse, target entry, source fullUrl) {",
      "  fullUrl -> entry.fullUrl = fullUrl;",
      "}",
    ].join("\n");
    const fml = parseFML(text) as FmlStructureMap;
    const diagram = extractFmlStructureMapDiagram(fml, lookupR4B, true, lookupForVersion);
    const root = diagram.groups.find(group => group.name === "Root");
    const populate = diagram.groups.find(group => group.name === "PopulateBundleEntry");
    const fullUrl = populate?.sourceTypes.find(input => input.paramName === "fullUrl");

    expect(root?.sourceTypes.find(input => input.paramName === "fullUrl")?.typeName).toBe("string");
    expect(fullUrl).toMatchObject({typeName: "string", typeResolution: "context"});
  });
});
