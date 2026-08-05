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

  test("SVG lists compatible types only and retains alternatives in the tooltip", () => {
    const svg = generateFmlInstanceDiagramSvg(fml, lookup);

    expect(svg).toContain('class="sm-choice-type"> : Alpha | Beta</tspan>');
    expect(svg).not.toContain("sm-choice-type-excluded");
    expect(svg).not.toContain('> | Gamma</tspan>');
    expect(svg).toContain("Compatible types: Alpha | Beta");
    expect(svg).toContain("Other possible types: Gamma");
  });
});

describe("FML type restrictions and dependent target inference", () => {
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
    expect(svg).toContain('class="sm-choice-type"> : Age</tspan>');
    expect(svg).not.toContain('> | Period | Range | dateTime | string</tspan>');
    expect(svg).toContain("Source property Condition.onset [0..1] (R5)");
    expect(svg).toContain("Compatible types: Age");
    expect(svg).toContain("Other possible types: Period | Range | dateTime | string");
    expect(svg).toContain("https://hl7.org/fhir/R5/condition-definitions.html#Condition.onset_x_");
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
    expect(svg).toContain("https://hl7.org/fhir/R5/patient-definitions.html#Patient.generalPractitioner");
  });

  test("target choice rows omit type suffixes while retaining tooltip types", () => {
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
    expect(svg.match(/class="sm-choice-type"> : Age \| Period \| Range \| dateTime \| string<\/tspan>/g)).toHaveLength(1);
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
});
