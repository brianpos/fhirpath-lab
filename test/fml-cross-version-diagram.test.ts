// Tests that the FML diagram pipeline is cross-version aware: aliases on
// version-qualified `uses` declarations are resolved back to their underlying
// FHIR type and resolved against the model for the right FHIR release.
import { describe, expect, test } from "@jest/globals";
import { parseFML } from "../helpers/fml_parser";
import {
  extractFmlStructureMapDiagram,
  generateFmlInstanceDiagramSvg,
} from "../helpers/structuremap_diagram_instance";
import {
  extractFmlStructureMapDiagram as extractCompleteFmlStructureMapDiagram,
  generateFmlInstanceDiagramSvg as generateCompleteFmlDiagramSvg,
} from "../helpers/structuremap_diagram_complete";
import { fmlToStructureMap } from "../helpers/fml_to_structuremap";
import { lookupByTypeName as lookupR4 } from "../helpers/models/generated/r4";
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
  test("keeps nested source descendants under the matching variable binding", () => {
    const fml = parseFML([
      "uses 'http://example.org/StructureDefinition/LocationPN' alias LocationPN as source",
      "uses 'http://example.org/StructureDefinition/LocationNDH' alias LocationNDH as target",
      "group Main(source src : LocationPN, target tgt : LocationNDH) {",
      "  src.extension as vNewPatientsSrc -> tgt.extension as vNewPatientsTgt then {",
      "    vNewPatientsSrc.extension as vFromNetworkSrc -> vNewPatientsTgt.extension = vFromNetworkSrc;",
      "    vNewPatientsSrc.extension as vAcceptingPatientsSrc -> vNewPatientsTgt.extension as vAcceptingPatientsTgt then {",
      "      vAcceptingPatientsSrc.value as vAcceptingPatientsValueSrc -> vAcceptingPatientsTgt.value as vAcceptingPatientsValueTgt then {",
      "        vAcceptingPatientsValueSrc.coding as vAcceptingPatientsCodingSrc -> vAcceptingPatientsValueTgt.coding = vAcceptingPatientsCodingSrc;",
      "      };",
      "    };",
      "  };",
      "}",
    ].join("\n")) as FmlStructureMap;
    const properties = extractFmlStructureMapDiagram(fml).groups[0].sourceTypes[0].properties;
    const variables = properties.map(property => property.variableName);

    expect(variables).toEqual([
      "vNewPatientsSrc",
      "vFromNetworkSrc",
      "vAcceptingPatientsSrc",
      "vAcceptingPatientsValueSrc",
      "vAcceptingPatientsCodingSrc",
    ]);
  });

  test("unnamed rule headers collapse to divider lines without hiding rule bodies", () => {
    const fml = parseFML([
      "uses 'http://hl7.org/fhir/5.0/StructureDefinition/Patient' alias Patient as source",
      "uses 'http://hl7.org/fhir/5.0/StructureDefinition/Patient' alias PatientTarget as target",
      "group Main(source src : Patient, target tgt : PatientTarget) {",
      "  src.id -> tgt.id;",
      "  src.active -> tgt.active;",
      "}",
    ].join("\n")) as FmlStructureMap;
    const svg = generateFmlInstanceDiagramSvg(fml, lookupR5, true, lookupForVersion);

    expect(svg.match(/class="sm-rule-divider-unnamed"/g)).toHaveLength(4);
    expect(svg.match(/>id<\/text>/g)).toHaveLength(2);
    expect(svg.match(/>active<\/text>/g)).toHaveLength(2);
  });

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
  test("draws source-presence triggers differently from FHIRPath references", () => {
    const fml = parseFML([
      "uses 'http://hl7.org/fhir/4.0/StructureDefinition/ActivityDefinition' alias ActivityDefinitionR4 as source",
      "uses 'http://hl7.org/fhir/5.0/StructureDefinition/ActivityDefinition' alias ActivityDefinitionR5 as target",
      "group Main(source src : ActivityDefinitionR4, target tgt : ActivityDefinitionR5) {",
      "    src.subject as s where (coding.exists(code = 'Patient')) -> tgt.subject = cc('http://hl7.org/fhir/fhir-types', 'Patient', 'Patient');",
      "}",
    ].join("\n")) as FmlStructureMap;
    const lookupForActivityVersion = (version: FhirVersion | undefined) => {
      return version === "R5" ? lookupR5 : lookupR4;
    };

    for (const svg of [
      generateFmlInstanceDiagramSvg(fml, lookupR4, false, lookupForActivityVersion),
      generateCompleteFmlDiagramSvg(fml, lookupR4, false, lookupForActivityVersion),
    ]) {
      expect(svg).toContain('class="sm-trigger-connector"');
      expect(svg).toContain('class="sm-connector-line sm-trigger-connector-line"');
      expect(svg).toContain('stroke-dasharray="5 4"');
      expect(svg).toContain("Source presence triggers target generation");
      expect(svg).not.toContain('class="sm-expression-connector"');
    }

    const mixedFml = parseFML([
      "uses 'http://hl7.org/fhir/5.0/StructureDefinition/ActivityDefinition' alias ActivityDefinition as source",
      "group Main(source src : ActivityDefinition, target tgt : ActivityDefinition) {",
      "    src.title as title -> tgt.subtitle = title, tgt.subject = cc('http://hl7.org/fhir/fhir-types', 'Patient', 'Patient');",
      "}",
    ].join("\n")) as FmlStructureMap;
    for (const svg of [
      generateFmlInstanceDiagramSvg(mixedFml, lookupR5, false, lookupForVersion),
      generateCompleteFmlDiagramSvg(mixedFml, lookupR5, false, lookupForVersion),
    ]) {
      expect(svg).toContain('class="sm-trigger-connector"');
      expect(svg).toContain('class="sm-connector"');
      expect(svg).toMatch(/<line class="sm-connector-line" [^>]+>/);
    }

    const repeatedFml = parseFML([
      "uses 'http://hl7.org/fhir/5.0/StructureDefinition/Observation' alias Observation as source",
      "group Main(source src : Observation, target tgt : Observation) {",
      "    src.status -> tgt.status = 'final';",
      "    src.status -> tgt.status = 'final';",
      "}",
    ].join("\n")) as FmlStructureMap;
    for (const svg of [
      generateFmlInstanceDiagramSvg(repeatedFml, lookupR5, false, lookupForVersion),
      generateCompleteFmlDiagramSvg(repeatedFml, lookupR5, false, lookupForVersion),
    ]) {
      expect(svg.match(/class="sm-trigger-connector"/g)).toHaveLength(2);
      expect(svg).not.toContain('<g class="sm-connector">');
    }
  });

  test("complete diagram keeps repeated target choice constraints rule-scoped", () => {
    const fml = parseFML([
      "uses 'http://hl7.org/fhir/4.0/StructureDefinition/ActivityDefinition' alias ActivityDefinitionR4 as source",
      "uses 'http://hl7.org/fhir/5.0/StructureDefinition/ActivityDefinition' alias ActivityDefinitionR5 as target",
      "group Main(source src : ActivityDefinitionR4, target tgt : ActivityDefinitionR5) {",
      "    src.subject as s -> tgt.subject = create('CodeableConcept') as tc, tc.coding as tcc, tcc.system = 'http://example.org/system';",
      "    src.subject : Reference -> tgt.subject \"subjectReference\";",
      "}",
    ].join("\n")) as FmlStructureMap;
    const lookupForActivityVersion = (version: FhirVersion | undefined) => {
      return version === "R5" ? lookupR5 : lookupR4;
    };
    const diagram = extractCompleteFmlStructureMapDiagram(
      fml, lookupR4, false, lookupForActivityVersion,
    );
    const targetSubjects = diagram.groups[0].targetTypes[0].properties.filter(property => {
      return property.path === "subject";
    });
    const createdSubject = targetSubjects.find(property => property.createdType === "CodeableConcept");
    const identitySubject = targetSubjects.find(property => !property.createdType);

    expect(createdSubject?.compatibleTypeNames).toEqual(["CodeableConcept"]);
    expect(identitySubject?.possibleTypeNames).toEqual(["CodeableConcept", "Reference", "canonical"]);
    expect(identitySubject?.compatibleTypeNames).toEqual(["CodeableConcept", "Reference", "canonical"]);
  });

  test("complete diagram merges unfiltered source properties without rule or variable labels", () => {
    const text = [
      "uses 'http://hl7.org/fhir/5.0/StructureDefinition/Observation' alias Observation as source",
      "group Main(source src : Observation, target tgt : Observation) {",
      "    src.status as sourceStatus -> tgt.status = sourceStatus;",
      "    src.status as sourceStatusAgain -> tgt.id = sourceStatusAgain;",
      "    src.status as filteredStatus where (filteredStatus = 'final') -> tgt.id = filteredStatus;",
      "}",
    ].join("\n");
    const fml = parseFML(text) as FmlStructureMap;
    const diagram = extractCompleteFmlStructureMapDiagram(fml, lookupR5, false, lookupForVersion);
    const svg = generateCompleteFmlDiagramSvg(fml, lookupR5, false, lookupForVersion);

    const statuses = diagram.groups[0].sourceTypes[0].properties.filter(property => property.path === "status");
    expect(statuses).toHaveLength(2);
    expect(statuses.filter(property => !property.filter)).toHaveLength(1);
    expect(svg).not.toContain("sm-rule-header");
    expect(svg).not.toContain("sm-rule-divider-unnamed");
    expect(svg).not.toMatch(/>status \((sourceStatus|sourceStatusAgain)\)<\/text>/);
    expect(svg).not.toContain("Observation (src)");
    expect(svg).not.toContain("Observation (tgt)");
  });

  test("complete diagram optionally adds root properties and children only below traversed datatypes", () => {
    const text = [
      "uses 'http://example.org/StructureDefinition/ClaimRow' alias ClaimRow as source",
      "group Main(source src : ClaimRow, target tgt : ClaimRow) {",
      "    src.detail as sourceDetail -> tgt.detail as targetDetail then { sourceDetail.value -> targetDetail.value; };",
      "}",
    ].join("\n");
    const fml = parseFML(text) as FmlStructureMap;
    const models: TypeModel[] = [
      {
        TypeName: "ClaimRow",
        Elements: [
          {ElementName: "claimNumber", Type: [{TypeName: "string"}]},
          {ElementName: "detail", Type: [{TypeName: "Detail"}]},
          {ElementName: "untouchedDetail", Type: [{TypeName: "Detail"}]},
        ],
      },
      {
        TypeName: "Detail",
        Elements: [
          {ElementName: "value", Type: [{TypeName: "string"}]},
          {ElementName: "note", Type: [{TypeName: "string"}]},
          {ElementName: "deep", Type: [{TypeName: "Deep"}]},
        ],
      },
      {TypeName: "Deep", Elements: [{ElementName: "leaf", Type: [{TypeName: "string"}]}]},
      {TypeName: "string", Elements: []},
    ];
    const lookup = (typeName: string) => models.find(model => model.TypeName === typeName);
    const compact = extractCompleteFmlStructureMapDiagram(fml, lookup, false, () => lookup);
    const complete = extractCompleteFmlStructureMapDiagram(fml, lookup, true, () => lookup);

    for (const type of [complete.groups[0].sourceTypes[0], complete.groups[0].targetTypes[0]]) {
      const paths = type.properties.map(property => property.path);
      expect(paths).toEqual(expect.arrayContaining([
        "claimNumber",
        "detail",
        "detail.value",
        "detail.note",
        "detail.deep",
        "untouchedDetail",
      ]));
      expect(paths).not.toContain("detail.deep.leaf");
      expect(paths).not.toContain("untouchedDetail.value");
    }
    expect(compact.groups[0].sourceTypes[0].properties.map(property => property.path)).not.toContain("claimNumber");
    expect(compact.groups[0].targetTypes[0].properties.map(property => property.path)).not.toContain("detail.note");
  });

  test("complete diagram resolves external extends groups only in all-properties mode", () => {
    const derived = parseFML([
      "uses 'http://example.org/StructureDefinition/ClaimRow' alias ClaimRow as source",
      "group Main(source src : ClaimRow, target tgt : ClaimRow) extends CopyBase {",
      "}",
    ].join("\n")) as FmlStructureMap;
    const base = parseFML([
      "uses 'http://example.org/StructureDefinition/ClaimRow' alias ClaimRow as source",
      "group CopyBase(source src : ClaimRow, target tgt : ClaimRow) extends RootBase {",
      "}",
      "group RootBase(source src : ClaimRow, target tgt : ClaimRow) {",
      "    src.detail as sourceDetail -> tgt.detail as targetDetail then { sourceDetail.value -> targetDetail.value; };",
      "}",
    ].join("\n")) as FmlStructureMap;
    const models: TypeModel[] = [
      {TypeName: "ClaimRow", Elements: [{ElementName: "detail", Type: [{TypeName: "Detail"}]}]},
      {TypeName: "Detail", Elements: [{ElementName: "value", Type: [{TypeName: "string"}]}]},
      {TypeName: "string", Elements: []},
    ];
    const lookup = (typeName: string) => models.find(model => model.TypeName === typeName);
    const requestedGroups: string[] = [];
    const resolveExternalGroup = (groupName: string) => {
      requestedGroups.push(groupName);
      return base.groups.some(group => group.name === groupName) ? base : undefined;
    };

    const compact = extractCompleteFmlStructureMapDiagram(
      derived, lookup, false, () => lookup, undefined, resolveExternalGroup,
    );
    expect(requestedGroups).toEqual([]);
    expect(compact.groups[0].sourceTypes[0].properties).toEqual([]);

    const complete = extractCompleteFmlStructureMapDiagram(
      derived, lookup, true, () => lookup, undefined, resolveExternalGroup,
    );
    const sourceValue = complete.groups[0].sourceTypes[0].properties.find(property => property.path === "detail.value");
    const targetValue = complete.groups[0].targetTypes[0].properties.find(property => property.path === "detail.value");

    expect(requestedGroups).toEqual(["CopyBase"]);
    expect(sourceValue?.isUnused).not.toBe(true);
    expect(targetValue?.isUnused).not.toBe(true);
  });

  test("complete diagram propagates inherited mappings through a called group", () => {
    const appointment = parseFML([
      "uses 'http://example.org/StructureDefinition/Appointment' alias Appointment as source",
      "group Appointment(source src : Appointment, target tgt : Appointment) {",
      "    src.participant as sourceParticipant -> tgt.participant as targetParticipant then AppointmentParticipant(sourceParticipant, targetParticipant);",
      "}",
      "group AppointmentParticipant(source src, target tgt) extends BackboneElement {",
      "    src.status -> tgt.status;",
      "}",
    ].join("\n")) as FmlStructureMap;
    const backboneMap = parseFML([
      "group BackboneElement(source src, target tgt) extends Element {",
      "    src.modifierExtension -> tgt.modifierExtension;",
      "}",
    ].join("\n")) as FmlStructureMap;
    const elementMap = parseFML([
      "group Element(source src, target tgt) {",
      "    src.id -> tgt.id;",
      "    src.extension -> tgt.extension;",
      "}",
    ].join("\n")) as FmlStructureMap;
    const models: TypeModel[] = [
      {
        TypeName: "Appointment",
        Elements: [{ElementName: "participant", Type: [{TypeName: "AppointmentParticipant"}], IsArray: true}],
      },
      {
        TypeName: "AppointmentParticipant",
        Elements: [
          {ElementName: "id", Type: [{TypeName: "string"}]},
          {ElementName: "extension", Type: [{TypeName: "string"}], IsArray: true},
          {ElementName: "modifierExtension", Type: [{TypeName: "string"}], IsArray: true},
          {ElementName: "status", Type: [{TypeName: "string"}]},
        ],
      },
      {TypeName: "string", Elements: []},
    ];
    const lookup = (typeName: string) => models.find(model => model.TypeName === typeName);
    const backboneUri = "file:///maps/BackboneElement4to5.fml";
    const elementUri = "file:///maps/Element4to5.fml";
    const resolveExternalGroup = (groupName: string) => {
      if (groupName === "BackboneElement") {
        return {map: backboneMap, sourceUri: backboneUri, sourceVersion: 3};
      }
      if (groupName === "Element") {
        return {map: elementMap, sourceUri: elementUri, sourceVersion: 4};
      }
      return undefined;
    };
    const diagram = extractCompleteFmlStructureMapDiagram(
      appointment,
      lookup,
      true,
      () => lookup,
      undefined,
      resolveExternalGroup,
    );
    const parent = diagram.groups.find(group => group.name === "Appointment")!;
    const participant = diagram.groups.find(group => group.name === "AppointmentParticipant")!;

    for (const propertyName of ["id", "extension", "modifierExtension"]) {
      const expectedUri = propertyName === "modifierExtension" ? backboneUri : elementUri;
      for (const type of [parent.sourceTypes[0], parent.targetTypes[0]]) {
        const property = type.properties.find(candidate => candidate.path.endsWith(`.${propertyName}`));
        expect(property?.isUnused).not.toBe(true);
        expect(property?.fmlPosition?.sourceUri).toBe(expectedUri);
      }
      for (const type of [participant.sourceTypes[0], participant.targetTypes[0]]) {
        const property = type.properties.find(candidate => candidate.path === propertyName);
        expect(property?.isUnused).not.toBe(true);
        expect(property?.fmlPosition?.sourceUri).toBe(expectedUri);
      }
    }

    const svg = generateCompleteFmlDiagramSvg(
      appointment, lookup, true, () => lookup, undefined, resolveExternalGroup,
    );
    expect(svg).toContain(`data-pos-uri="${encodeURIComponent(backboneUri)}" data-pos-version="3"`);
    expect(svg).toContain(`data-pos-uri="${encodeURIComponent(elementUri)}" data-pos-version="4"`);
  });

  test("complete diagram greys only properties that do not participate directly or indirectly", () => {
    const text = [
      "uses 'http://example.org/StructureDefinition/ClaimRow' alias ClaimRow as source",
      "group Main(source src : ClaimRow, target tgt : ClaimRow) {",
      "    src.detail as sourceDetail -> tgt.detail as targetDetail then CopyDetail(sourceDetail, targetDetail);",
      "    src -> tgt.generated = uuid();",
      "    src -> tgt.fixed = 'constant';",
      "}",
      "group CopyDetail(source src : Detail, target tgt : Detail) {",
      "    src.value -> tgt.value;",
      "}",
    ].join("\n");
    const fml = parseFML(text) as FmlStructureMap;
    const models: TypeModel[] = [
      {
        TypeName: "ClaimRow",
        Elements: [
          {ElementName: "claimNumber", Type: [{TypeName: "string"}]},
          {ElementName: "detail", Type: [{TypeName: "Detail"}]},
          {ElementName: "generated", Type: [{TypeName: "string"}]},
          {ElementName: "fixed", Type: [{TypeName: "string"}]},
        ],
      },
      {
        TypeName: "Detail",
        Elements: [
          {ElementName: "value", Type: [{TypeName: "string"}]},
          {ElementName: "note", Type: [{TypeName: "string"}]},
        ],
      },
      {TypeName: "string", Elements: []},
    ];
    const lookup = (typeName: string) => models.find(model => model.TypeName === typeName);
    const diagram = extractCompleteFmlStructureMapDiagram(fml, lookup, true, () => lookup);
    const svg = generateCompleteFmlDiagramSvg(fml, lookup, true, () => lookup);
    const main = diagram.groups.find(group => group.name === "Main")!;
    const sourceByPath = new Map(main.sourceTypes[0].properties.map(property => [property.path, property]));
    const targetByPath = new Map(main.targetTypes[0].properties.map(property => [property.path, property]));

    expect(sourceByPath.get("claimNumber")?.isUnused).toBe(true);
    expect(sourceByPath.get("detail")?.isUnused).not.toBe(true);
    expect(sourceByPath.get("detail.value")?.isUnused).not.toBe(true);
    expect(sourceByPath.get("detail.note")?.isUnused).toBe(true);
    expect(targetByPath.get("detail.value")?.isUnused).not.toBe(true);
    expect(targetByPath.get("generated")?.isUnused).not.toBe(true);
    expect(targetByPath.get("fixed")?.isUnused).not.toBe(true);
    expect(targetByPath.get("detail.note")?.isUnused).toBe(true);
    expect(svg).toContain('class="sm-prop-unused"');
  });

  test("complete diagram retains target collection instances and expands each traversed instance", () => {
    const text = [
      "uses 'http://example.org/StructureDefinition/ClaimRow' alias ClaimRow as source",
      "group Main(source src : ClaimRow, target tgt : ClaimRow) {",
      "    src.claimNumber as firstValue -> tgt.items as firstItem then { firstValue -> firstItem.value; };",
      "    src.claimNumber as secondValue -> tgt.items as secondItem then { secondValue -> secondItem.value; };",
      "}",
    ].join("\n");
    const fml = parseFML(text) as FmlStructureMap;
    const models: TypeModel[] = [
      {
        TypeName: "ClaimRow",
        Elements: [
          {ElementName: "claimNumber", Type: [{TypeName: "string"}]},
          {ElementName: "items", Type: [{TypeName: "Item"}], IsArray: true},
        ],
      },
      {
        TypeName: "Item",
        Elements: [
          {ElementName: "value", Type: [{TypeName: "string"}]},
          {ElementName: "note", Type: [{TypeName: "string"}]},
        ],
      },
      {TypeName: "string", Elements: []},
    ];
    const lookup = (typeName: string) => models.find(model => model.TypeName === typeName);
    const diagram = extractCompleteFmlStructureMapDiagram(fml, lookup, true, () => lookup);
    const targetPaths = diagram.groups[0].targetTypes[0].properties.map(property => property.path);

    expect(targetPaths.filter(path => /^items#[^.]+$/.test(path))).toHaveLength(2);
    expect(targetPaths.filter(path => /^items#[^.]+\.value$/.test(path))).toHaveLength(2);
    expect(targetPaths.filter(path => /^items#[^.]+\.note$/.test(path))).toHaveLength(2);
    expect(targetPaths).not.toContain("items");
  });

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
