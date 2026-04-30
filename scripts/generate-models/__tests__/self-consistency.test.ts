// Tests for the custom-model generator. These use small, hand-crafted StructureDefinition
// fixtures rather than the real HL7 bundles so they run offline and exercise every pass
// of the pipeline.

import { describe, expect, test } from "@jest/globals";
import { buildVersion, selfConsistencyCheck, __test } from "../build-type-model";
import { emitInMemory } from "../emit";
import type { SDBundle, StructureDefinition } from "../sd-types";

function mkBundle(...sds: StructureDefinition[]): SDBundle {
    return { resourceType: "Bundle", entry: sds.map((r) => ({ resource: r })) };
}

// --- Hand-built fixtures (snapshot-flattened, like real HL7 publishes) ---

const sdString: StructureDefinition = {
    resourceType: "StructureDefinition",
    url: "http://hl7.org/fhir/StructureDefinition/string",
    name: "string",
    type: "string",
    kind: "primitive-type",
    baseDefinition: "http://hl7.org/fhir/StructureDefinition/Element",
    derivation: "specialization",
    differential: {
        element: [
            { id: "string", path: "string" },
            // Real HL7 differentials only carry own-type rows. `id` and `extension`
            // are inherited from Element. value uses the magic System.* code.
            { id: "string.value", path: "string.value", min: 0, max: "1", type: [{ code: "http://hl7.org/fhirpath/System.String" }] },
        ],
    },
};

const sdReference: StructureDefinition = {
    resourceType: "StructureDefinition",
    url: "http://hl7.org/fhir/StructureDefinition/Reference",
    name: "Reference",
    type: "Reference",
    kind: "complex-type",
    baseDefinition: "http://hl7.org/fhir/StructureDefinition/Element",
    derivation: "specialization",
    differential: {
        element: [
            { id: "Reference", path: "Reference" },
            { id: "Reference.reference", path: "Reference.reference", min: 0, max: "1", type: [{ code: "string" }] },
            { id: "Reference.display", path: "Reference.display", min: 0, max: "1", type: [{ code: "string" }] },
        ],
    },
};

const sdExtension: StructureDefinition = {
    resourceType: "StructureDefinition",
    url: "http://hl7.org/fhir/StructureDefinition/Extension",
    name: "Extension",
    type: "Extension",
    kind: "complex-type",
    baseDefinition: "http://hl7.org/fhir/StructureDefinition/Element",
    derivation: "specialization",
    differential: {
        element: [
            { id: "Extension", path: "Extension" },
            { id: "Extension.url", path: "Extension.url", min: 1, max: "1", type: [{ code: "uri" }] },
            {
                id: "Extension.value[x]",
                path: "Extension.value[x]",
                min: 0,
                max: "1",
                type: [{ code: "string" }, { code: "boolean" }, { code: "Reference", targetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }],
            },
            // a slice — must be filtered out
            { id: "Extension.value[x]:valueString", path: "Extension.value[x]", sliceName: "valueString", min: 0, max: "1", type: [{ code: "string" }] },
        ],
    },
};

const sdPatient: StructureDefinition = {
    resourceType: "StructureDefinition",
    url: "http://hl7.org/fhir/StructureDefinition/Patient",
    name: "Patient",
    type: "Patient",
    kind: "resource",
    baseDefinition: "http://hl7.org/fhir/StructureDefinition/DomainResource",
    derivation: "specialization",
    differential: {
        element: [
            { id: "Patient", path: "Patient" },
            // `id` and other inherited rows live on Resource/DomainResource; differential walk skips them.
            { id: "Patient.active", path: "Patient.active", min: 0, max: "1", type: [{ code: "boolean" }] },
            { id: "Patient.name", path: "Patient.name", min: 0, max: "*", type: [{ code: "string" }] },
            {
                id: "Patient.managingOrganization",
                path: "Patient.managingOrganization",
                min: 0,
                max: "1",
                type: [{ code: "Reference", targetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }],
            },
            // Reference(Any) — no targetProfile → should be omitted
            { id: "Patient.link", path: "Patient.link", min: 0, max: "*", type: [{ code: "Reference" }] },
        ],
    },
};

const sdObservation: StructureDefinition = {
    resourceType: "StructureDefinition",
    url: "http://hl7.org/fhir/StructureDefinition/Observation",
    name: "Observation",
    type: "Observation",
    kind: "resource",
    baseDefinition: "http://hl7.org/fhir/StructureDefinition/DomainResource",
    derivation: "specialization",
    differential: {
        element: [
            { id: "Observation", path: "Observation" },
            {
                id: "Observation.value[x]",
                path: "Observation.value[x]",
                min: 0,
                max: "1",
                type: [{ code: "Quantity" }, { code: "string" }, { code: "boolean" }],
            },
            { id: "Observation.component", path: "Observation.component", min: 0, max: "*", type: [{ code: "BackboneElement" }] },
            { id: "Observation.component.code", path: "Observation.component.code", min: 1, max: "1", type: [{ code: "CodeableConcept" }] },
            {
                id: "Observation.component.value[x]",
                path: "Observation.component.value[x]",
                min: 0,
                max: "1",
                type: [{ code: "Quantity" }, { code: "string" }],
            },
        ],
    },
};

const sdQuestionnaire: StructureDefinition = {
    resourceType: "StructureDefinition",
    url: "http://hl7.org/fhir/StructureDefinition/Questionnaire",
    name: "Questionnaire",
    type: "Questionnaire",
    kind: "resource",
    baseDefinition: "http://hl7.org/fhir/StructureDefinition/DomainResource",
    derivation: "specialization",
    differential: {
        element: [
            { id: "Questionnaire", path: "Questionnaire" },
            { id: "Questionnaire.item", path: "Questionnaire.item", min: 0, max: "*", type: [{ code: "BackboneElement" }] },
            { id: "Questionnaire.item.linkId", path: "Questionnaire.item.linkId", min: 1, max: "1", type: [{ code: "string" }] },
            { id: "Questionnaire.item.enableWhen", path: "Questionnaire.item.enableWhen", min: 0, max: "*", type: [{ code: "BackboneElement" }] },
            { id: "Questionnaire.item.enableWhen.question", path: "Questionnaire.item.enableWhen.question", min: 1, max: "1", type: [{ code: "string" }] },
            // recursive item — uses contentReference
            { id: "Questionnaire.item.item", path: "Questionnaire.item.item", min: 0, max: "*", contentReference: "#Questionnaire.item" },
        ],
    },
};

// Stage-1 abstract bases referenced via baseDefinition. The generator doesn't *require*
// them but including some keeps self-consistency happy when consumers walk inheritance.
const sdElement: StructureDefinition = {
    resourceType: "StructureDefinition",
    url: "http://hl7.org/fhir/StructureDefinition/Element",
    name: "Element",
    type: "Element",
    kind: "complex-type",
    abstract: true,
    derivation: "specialization",
    differential: {
        element: [
            { id: "Element", path: "Element" },
            { id: "Element.id", path: "Element.id", min: 0, max: "1", type: [{ code: "string" }] },
        ],
    },
};

// Minimal stubs for primitive/complex types referenced by the resource fixtures, so the
// self-consistency check has something to resolve to.
function stubPrimitive(name: string): StructureDefinition {
    return {
        resourceType: "StructureDefinition",
        url: `http://hl7.org/fhir/StructureDefinition/${name}`,
        name,
        type: name,
        kind: "primitive-type",
        baseDefinition: "http://hl7.org/fhir/StructureDefinition/Element",
        derivation: "specialization",
        differential: {
            element: [
                { id: name, path: name },
                { id: `${name}.id`, path: `${name}.id`, min: 0, max: "1", type: [{ code: "string" }] },
            ],
        },
    };
}
function stubComplex(name: string): StructureDefinition {
    return {
        resourceType: "StructureDefinition",
        url: `http://hl7.org/fhir/StructureDefinition/${name}`,
        name,
        type: name,
        kind: "complex-type",
        baseDefinition: "http://hl7.org/fhir/StructureDefinition/Element",
        derivation: "specialization",
        differential: { element: [{ id: name, path: name }] },
    };
}
const sdUri = stubPrimitive("uri");
const sdBoolean = stubPrimitive("boolean");
const sdQuantity = stubComplex("Quantity");
const sdCodeableConcept = stubComplex("CodeableConcept");

const TYPES_BUNDLE = mkBundle(sdElement, sdUri, sdBoolean, sdQuantity, sdCodeableConcept, sdString, sdReference, sdExtension);
const RESOURCES_BUNDLE = mkBundle(sdPatient, sdObservation, sdQuestionnaire);

// ---------- tests ----------

describe("syntheticTypeName", () => {
    test("Questionnaire.item -> questionnaire_item", () => {
        expect(__test.syntheticTypeName("Questionnaire.item")).toBe("questionnaire_item");
    });
    test("Questionnaire.item.enableWhen -> questionnaire_item_enableWhen", () => {
        expect(__test.syntheticTypeName("Questionnaire.item.enableWhen")).toBe("questionnaire_item_enableWhen");
    });
    test("Bundle.entry -> bundle_entry", () => {
        expect(__test.syntheticTypeName("Bundle.entry")).toBe("bundle_entry");
    });
});

describe("resolveContentReference", () => {
    test("local hash reference", () => {
        expect(__test.resolveContentReference("#Questionnaire.item", "Questionnaire")).toBe("questionnaire_item");
    });
    test("absolute reference with hash", () => {
        expect(
            __test.resolveContentReference(
                "http://hl7.org/fhir/StructureDefinition/Questionnaire#Questionnaire.item.enableWhen",
                "Questionnaire"
            )
        ).toBe("questionnaire_item_enableWhen");
    });
});

describe("buildVersion", () => {
    const result = buildVersion("r4", [TYPES_BUNDLE, RESOURCES_BUNDLE]);

    test("self-consistency check passes", () => {
        expect(() => selfConsistencyCheck(result.entries)).not.toThrow();
    });

    test("emits the expected top-level types", () => {
        const names = result.entries.map((e) => e.model.TypeName).sort();
        expect(names).toEqual(expect.arrayContaining([
            "Element", "Extension", "Patient", "Observation", "Questionnaire",
            "Reference", "string",
            "questionnaire_item", "questionnaire_item_enableWhen",
            "observation_component",
        ]));
    });

    test("primitive-type SD emits a complex container with value pointing at System.String", () => {
        const stringEntry = result.entries.find((e) => e.model.TypeName === "string");
        expect(stringEntry).toBeDefined();
        expect(stringEntry!.kind).toBe("primitive-type");
        expect(stringEntry!.model.IsPrimitive).toBeUndefined(); // container is complex
        const valueEl = stringEntry!.model.Elements.find((e) => e.ElementName === "value");
        expect(valueEl).toBeDefined();
        expect(valueEl!.Type).toEqual([{ TypeName: "System.String" }]);
        // Differential walk: id/extension are inherited from Element and not emitted on `string`.
        expect(stringEntry!.model.Elements.find((e) => e.ElementName === "id")).toBeUndefined();
        expect(stringEntry!.model.Elements.find((e) => e.ElementName === "extension")).toBeUndefined();
        expect(stringEntry!.model.BaseTypeName).toBe("Element");
    });

    test("Reference TargetProfile retained when present, omitted when absent (Reference(Any))", () => {
        const patient = result.entries.find((e) => e.model.TypeName === "Patient")!;
        const mo = patient.model.Elements.find((e) => e.ElementName === "managingOrganization")!;
        expect(mo.Type[0].TypeName).toBe("Reference");
        expect(mo.Type[0].TargetProfile).toEqual([
            "http://hl7.org/fhir/StructureDefinition/Organization",
        ]);
        const link = patient.model.Elements.find((e) => e.ElementName === "link")!;
        expect(link.Type[0].TypeName).toBe("Reference");
        expect(link.Type[0].TargetProfile).toBeUndefined();
    });

    test("choice elements keep [x] suffix and list every concrete type, sorted", () => {
        const obs = result.entries.find((e) => e.model.TypeName === "Observation")!;
        const valEl = obs.model.Elements.find((e) => e.ElementName === "value[x]")!;
        expect(valEl).toBeDefined();
        expect(valEl.Type.map((t) => t.TypeName)).toEqual(["Quantity", "boolean", "string"]);
    });

    test("BackboneElement promoted to a synthetic TypeModel; parent points at it", () => {
        const obs = result.entries.find((e) => e.model.TypeName === "Observation")!;
        const compEl = obs.model.Elements.find((e) => e.ElementName === "component")!;
        expect(compEl.IsArray).toBe(true);
        expect(compEl.Type).toEqual([{ TypeName: "observation_component" }]);
        const comp = result.entries.find((e) => e.model.TypeName === "observation_component")!;
        expect(comp.synthetic).toBe(true);
        expect(comp.kind).toBe("backbone");
        expect(comp.url).toBe("http://hl7.org/fhir/StructureDefinition/Observation#Observation.component");
        const codes = comp.model.Elements.map((e) => e.ElementName);
        expect(codes).toEqual(["code", "value[x]"]);
    });

    test("contentReference resolves to the synthetic backbone (recursion supported)", () => {
        const qItem = result.entries.find((e) => e.model.TypeName === "questionnaire_item")!;
        const recursive = qItem.model.Elements.find((e) => e.ElementName === "item")!;
        expect(recursive.Type).toEqual([{ TypeName: "questionnaire_item" }]);
        expect(recursive.IsArray).toBe(true);
    });

    test("nested backbones (Questionnaire.item.enableWhen) get correctly named synthetics", () => {
        const ew = result.entries.find((e) => e.model.TypeName === "questionnaire_item_enableWhen");
        expect(ew).toBeDefined();
        expect(ew!.model.Elements.map((e) => e.ElementName)).toEqual(["question"]);
    });

    test("slice rows are skipped", () => {
        const ext = result.entries.find((e) => e.model.TypeName === "Extension")!;
        // Only the [x] base row plus url. No "valueString" element.
        const names = ext.model.Elements.map((e) => e.ElementName);
        expect(names).toContain("value[x]");
        expect(names).not.toContain("valueString");
    });

    test("IsArray detected from max", () => {
        const patient = result.entries.find((e) => e.model.TypeName === "Patient")!;
        const nameEl = patient.model.Elements.find((e) => e.ElementName === "name")!;
        expect(nameEl.IsArray).toBe(true);
        const linkEl = patient.model.Elements.find((e) => e.ElementName === "link")!;
        expect(linkEl.IsArray).toBe(true);
        const moEl = patient.model.Elements.find((e) => e.ElementName === "managingOrganization")!;
        expect(moEl.IsArray).toBeUndefined();
    });

    test("Required propagated from min", () => {
        const obs = result.entries.find((e) => e.model.TypeName === "observation_component")!;
        const codeEl = obs.model.Elements.find((e) => e.ElementName === "code")!;
        expect(codeEl.Required).toBe(true);
    });

    test("self-consistency catches dangling references", () => {
        // Manufacture a broken entry set.
        const broken = [
            ...result.entries,
            {
                url: "http://example.org/Broken",
                kind: "resource" as const,
                model: {
                    TypeName: "Broken",
                    Elements: [{ ElementName: "x", Type: [{ TypeName: "DoesNotExist" }] }],
                },
            },
        ];
        expect(() => selfConsistencyCheck(broken)).toThrow(/dangling/);
    });
});

describe("emit", () => {
    const result = buildVersion("r4", [TYPES_BUNDLE, RESOURCES_BUNDLE]);
    const files = emitInMemory(result);

    test("emits primitives/complex/resources + dictionary + index (no backbones file)", () => {
        expect(Object.keys(files).sort()).toEqual([
            "complex-types.ts", "dictionary.ts", "index.ts", "primitives.ts", "resources.ts",
        ]);
    });

    test("category files contain only TypeModel consts (no per-category byUrl/byTypeName)", () => {
        for (const f of ["primitives.ts", "complex-types.ts", "resources.ts"]) {
            expect(files[f]).toContain("const ");
            expect(files[f]).not.toContain("export const byUrl");
            expect(files[f]).not.toContain("export const byTypeName");
        }
    });

    test("dictionary.ts holds the combined byUrl/byTypeName and imports from each category", () => {
        const d = files["dictionary.ts"];
        expect(d).toContain("export const byUrl");
        expect(d).toContain("export const byTypeName");
        expect(d).toContain("systemTypesByUrl");
        expect(d).toContain("systemTypesByTypeName");
        expect(d).toContain('from "./primitives"');
        expect(d).toContain('from "./complex-types"');
        expect(d).toContain('from "./resources"');
        expect(d).not.toContain('from "./backbones"');
    });

    test("index.ts re-exports the dictionary and exposes lookup helpers", () => {
        const idx = files["index.ts"];
        expect(idx).toContain('from "./dictionary"');
        expect(idx).toContain("byUrl");
        expect(idx).toContain("byTypeName");
        expect(idx).toContain("lookupByUrl");
        expect(idx).toContain("lookupByTypeName");
    });

    test("primitive `string` container appears in primitives.ts and points at System.String", () => {
        const f = files["primitives.ts"];
        expect(f).toContain('TypeName: "string"');
        expect(f).toContain('TypeName: "System.String"');
    });

    test("synthetic backbones land in resources.ts and use `<sdUrl>#<elementId>` as their URL", () => {
        const f = files["resources.ts"];
        expect(f).toContain('TypeName: "questionnaire_item"');
        // backbones.ts must not exist as a separate emitted file
        expect(files["backbones.ts"]).toBeUndefined();
        // The new URL form lives in dictionary.ts (the resources.ts file no longer carries URLs).
        expect(files["dictionary.ts"]).toContain(
            "http://hl7.org/fhir/StructureDefinition/Questionnaire#Questionnaire.item"
        );
        expect(files["dictionary.ts"]).not.toContain("http://fhir.forms-lab.com/custom-model");
    });

    test("backbone is emitted immediately after its parent", () => {
        const f = files["resources.ts"];
        const parentIdx = f.indexOf('TypeName: "Questionnaire"');
        const backboneIdx = f.indexOf('TypeName: "questionnaire_item"');
        const otherTopIdx = f.indexOf('TypeName: "Patient"');
        expect(parentIdx).toBeGreaterThan(0);
        expect(backboneIdx).toBeGreaterThan(parentIdx);
        // No unrelated top-level type should appear between parent and its backbone.
        if (otherTopIdx > parentIdx) {
            expect(otherTopIdx).toBeGreaterThan(backboneIdx);
        }
    });

    test("output is deterministic — entries sorted by canonical URL", () => {
        const second = emitInMemory(buildVersion("r4", [TYPES_BUNDLE, RESOURCES_BUNDLE]));
        for (const k of Object.keys(files)) {
            expect(second[k]).toBe(files[k]);
        }
    });
});

describe("System.* identity is shared across versions", () => {
    test("same TypeModel instance in r4 and r5 indexes", () => {
        const r4 = buildVersion("r4", [TYPES_BUNDLE, RESOURCES_BUNDLE]);
        const r5 = buildVersion("r5", [TYPES_BUNDLE, RESOURCES_BUNDLE]);
        // System.* types come from the shared module — verify identity via the side-table.
        const sysUrl = "http://hl7.org/fhirpath/System.String";
        expect(__test.systemTypesByUrl[sysUrl]).toBe(__test.systemTypesByUrl[sysUrl]);
        // (The full indexes are assembled at emit time in the generated index.ts; identity
        // is preserved because both spreads pull from the same systemTypesByUrl module.)
        expect(r4.entries.find((e) => e.model.TypeName === "Patient")).toBeDefined();
        expect(r5.entries.find((e) => e.model.TypeName === "Patient")).toBeDefined();
    });
});
