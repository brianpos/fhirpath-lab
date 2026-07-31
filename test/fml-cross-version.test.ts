import { describe, expect, test } from "@jest/globals";
import {
  parseCanonicalVersion,
  selectModelVersions,
} from "../helpers/fml_cross_version";
import { parseFML } from "../helpers/fml_parser";
import type { FmlStructureMap } from "../helpers/fml_models";

describe("parseCanonicalVersion", () => {
  test("strips R4B version segment from a cross-version canonical", () => {
    const r = parseCanonicalVersion(
      "http://hl7.org/fhir/4.3/StructureDefinition/Citation"
    );
    expect(r.version).toBe("R4B");
    expect(r.canonical).toBe(
      "http://hl7.org/fhir/StructureDefinition/Citation"
    );
  });

  test("strips R5 version segment from a cross-version canonical", () => {
    const r = parseCanonicalVersion(
      "http://hl7.org/fhir/5.0/StructureDefinition/Citation"
    );
    expect(r.version).toBe("R5");
    expect(r.canonical).toBe(
      "http://hl7.org/fhir/StructureDefinition/Citation"
    );
  });

  test.each([
    ["1.0", "DSTU2"],
    ["3.0", "STU3"],
    ["4.0", "R4"],
    ["4.3", "R4B"],
    ["5.0", "R5"],
    ["6.0", "R6"],
  ])("recognises %s as %s", (segment, version) => {
    const r = parseCanonicalVersion(
      `http://hl7.org/fhir/${segment}/StructureDefinition/Patient`
    );
    expect(r.version).toBe(version);
    expect(r.canonical).toBe(
      "http://hl7.org/fhir/StructureDefinition/Patient"
    );
  });

  test("leaves a plain version-neutral canonical untouched", () => {
    const url = "http://hl7.org/fhir/StructureDefinition/Patient";
    const r = parseCanonicalVersion(url);
    expect(r.version).toBeUndefined();
    expect(r.canonical).toBe(url);
  });

  test("leaves an unrelated logical model URL untouched", () => {
    const url = "http://example.org/fhir/StructureDefinition/MyLogical";
    const r = parseCanonicalVersion(url);
    expect(r.version).toBeUndefined();
    expect(r.canonical).toBe(url);
  });

  test("leaves an hl7.org URL with an unrecognised version segment untouched", () => {
    const url = "http://hl7.org/fhir/9.9/StructureDefinition/Foo";
    const r = parseCanonicalVersion(url);
    expect(r.version).toBeUndefined();
    expect(r.canonical).toBe(url);
  });

  test("handles empty input", () => {
    const r = parseCanonicalVersion("");
    expect(r.version).toBeUndefined();
    expect(r.canonical).toBe("");
  });
});

describe("selectModelVersions", () => {
  test("picks first source/target with version segments", () => {
    const detected = selectModelVersions([
      {
        url: "http://hl7.org/fhir/4.3/StructureDefinition/Citation",
        mode: "source",
        canonical: "http://hl7.org/fhir/StructureDefinition/Citation",
        fhirVersion: "R4B",
      },
      {
        url: "http://hl7.org/fhir/5.0/StructureDefinition/Citation",
        mode: "target",
        canonical: "http://hl7.org/fhir/StructureDefinition/Citation",
        fhirVersion: "R5",
      },
    ]);
    expect(detected.sourceModelVersion).toBe("R4B");
    expect(detected.targetModelVersion).toBe("R5");
  });

  test("falls back to queried/produced if no source/target carry versions", () => {
    const detected = selectModelVersions([
      {
        url: "http://hl7.org/fhir/4.3/StructureDefinition/Citation",
        mode: "queried",
        canonical: "http://hl7.org/fhir/StructureDefinition/Citation",
        fhirVersion: "R4B",
      },
      {
        url: "http://hl7.org/fhir/5.0/StructureDefinition/Citation",
        mode: "produced",
        canonical: "http://hl7.org/fhir/StructureDefinition/Citation",
        fhirVersion: "R5",
      },
    ]);
    expect(detected.sourceModelVersion).toBe("R4B");
    expect(detected.targetModelVersion).toBe("R5");
  });

  test("explicit source wins over queried even if listed later", () => {
    const detected = selectModelVersions([
      {
        url: "http://hl7.org/fhir/5.0/StructureDefinition/Foo",
        mode: "queried",
        fhirVersion: "R5",
      },
      {
        url: "http://hl7.org/fhir/4.3/StructureDefinition/Bar",
        mode: "source",
        fhirVersion: "R4B",
      },
    ]);
    expect(detected.sourceModelVersion).toBe("R4B");
  });

  test("returns undefined when no canonical carries a version segment", () => {
    const detected = selectModelVersions([
      {
        url: "http://hl7.org/fhir/StructureDefinition/Patient",
        mode: "source",
      },
      {
        url: "http://hl7.org/fhir/StructureDefinition/Bundle",
        mode: "target",
      },
    ]);
    expect(detected.sourceModelVersion).toBeUndefined();
    expect(detected.targetModelVersion).toBeUndefined();
  });
});

describe("parseFML cross-version detection", () => {
  test("Citation R4B -> R5 map detects source=R4B target=R5 and normalises canonicals", () => {
    const fml = `map "http://hl7.org/fhir/uv/xver/StructureMap/Citation4Bto5" = Citation4Bto5

uses "http://hl7.org/fhir/4.3/StructureDefinition/Citation" alias CitationR4B as source
uses "http://hl7.org/fhir/5.0/StructureDefinition/Citation" alias CitationR5 as target

group Citation(source src : CitationR4B, target tgt : CitationR5) {
  src.id -> tgt.id;
}
`;
    const result = parseFML(fml);
    // Should be a successful parse, not an OperationOutcome
    expect((result as any).resourceType).toBeUndefined();
    const map = result as FmlStructureMap;

    expect(map.sourceModelVersion).toBe("R4B");
    expect(map.targetModelVersion).toBe("R5");

    const src = map.structures.find((s) => s.mode === "source");
    const tgt = map.structures.find((s) => s.mode === "target");
    expect(src).toBeDefined();
    expect(tgt).toBeDefined();
    expect(src!.fhirVersion).toBe("R4B");
    expect(tgt!.fhirVersion).toBe("R5");
    expect(src!.canonical).toBe(
      "http://hl7.org/fhir/StructureDefinition/Citation"
    );
    expect(tgt!.canonical).toBe(
      "http://hl7.org/fhir/StructureDefinition/Citation"
    );
  });

  test("plain canonicals leave model versions undefined and canonical unchanged", () => {
    const fml = `map "http://example.org/StructureMap/x" = X

uses "http://hl7.org/fhir/StructureDefinition/Patient" as source
uses "http://hl7.org/fhir/StructureDefinition/Bundle" as target

group g(source src : Patient, target tgt : Bundle) {
  src.id -> tgt.id;
}
`;
    const result = parseFML(fml);
    expect((result as any).resourceType).toBeUndefined();
    const map = result as FmlStructureMap;

    expect(map.sourceModelVersion).toBeUndefined();
    expect(map.targetModelVersion).toBeUndefined();

    const src = map.structures.find((s) => s.mode === "source");
    expect(src!.fhirVersion).toBeUndefined();
    expect(src!.canonical).toBe(
      "http://hl7.org/fhir/StructureDefinition/Patient"
    );
  });

  test("accepts a legacy double quoted map name (tolerated by the HAPI engine)", () => {
    const fml = `map "http://github.com/FHIR/fhir-test-cases/r5/fml/syntax" = "Syntax"

uses "http://hl7.org/fhir/StructureDefinition/Patient" alias Patient as source
uses "http://hl7.org/fhir/StructureDefinition/Basic" alias Basic as target

group Patient(source src : Patient, target tgt : Basic) {
  src.identifier -> tgt.identifier;
}
`;
    const result = parseFML(fml);
    // Should be a successful parse, not an OperationOutcome
    expect((result as any).resourceType).toBeUndefined();
    const map = result as FmlStructureMap;

    // The surrounding double quotes should be stripped from the name
    expect(map.mapDeclaration?.identifier).toBe("Syntax");
    expect(map.groups.map((g) => g.name)).toEqual(["Patient"]);
  });
});
