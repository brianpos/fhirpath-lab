// Tests that the FML diagram pipeline is cross-version aware: aliases on
// version-qualified `uses` declarations are resolved back to their underlying
// FHIR type and resolved against the model for the right FHIR release.
import { describe, expect, test } from "@jest/globals";
import { parseFML } from "../helpers/fml_parser";
import {
  fmlToStructureMapForDiagram,
  extractStructureMapDiagram,
} from "../helpers/structuremap_diagram_instance";
import { lookupByTypeName as lookupR4B } from "../helpers/models/generated/r4b";
import { lookupByTypeName as lookupR5 } from "../helpers/models/generated/r5";
import type { FmlStructureMap, FhirVersion } from "../helpers/fml_models";

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

describe("fmlToStructureMapForDiagram cross-version alias resolution", () => {
  test("resolves aliases to the underlying FHIR type and tags the version", () => {
    const fml = parseFML(APPOINTMENT_FML) as FmlStructureMap;
    expect((fml as any).resourceType).toBeUndefined();

    const map = fmlToStructureMapForDiagram(fml);
    const inputs = map.group[0].input!;

    const src = inputs.find((i) => i.name === "src") as any;
    const tgt = inputs.find((i) => i.name === "tgt") as any;

    // The alias (AppointmentR4B / AppointmentR5) must be resolved to the real
    // type name so the diagram can look it up in the model dictionary.
    expect(src.type).toBe("Appointment");
    expect(tgt.type).toBe("Appointment");
    // ...and tagged with the detected FHIR version for per-version lookup.
    expect(src._fmlVersion).toBe("R4B");
    expect(tgt._fmlVersion).toBe("R5");
  });
});

describe("extractStructureMapDiagram cross-version resolution", () => {
  test("source resolves against R4B and target against R5", () => {
    const fml = parseFML(APPOINTMENT_FML) as FmlStructureMap;
    const map = fmlToStructureMapForDiagram(fml);

    const diagram = extractStructureMapDiagram(map, lookupR4B, true, lookupForVersion);
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
  });

  test("R5-only target element is flagged when the version resolver is absent", () => {
    // Without the version-aware resolver, both boxes fall back to R4B; the
    // R5-only `tgt.reason` element should then be reported as unknown. This
    // guards against a regression where version awareness is silently lost.
    const fml = parseFML(APPOINTMENT_FML) as FmlStructureMap;
    const map = fmlToStructureMapForDiagram(fml);

    const diagram = extractStructureMapDiagram(map, lookupR4B, true);
    const tgtBox = diagram.groups[0].targetTypes[0];
    const reason = tgtBox.properties.find((p) => p.path === "reason");
    expect(reason?.unknownElement).toBe(true);
  });
});
