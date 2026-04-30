// Tests for the runtime user-model lookup helper used by the FML diagram views.
import { describe, expect, test } from "@jest/globals";
import { buildUserModelLookup, composeLookups } from "../helpers/user_models";

const logicalSd = {
    resourceType: "StructureDefinition",
    url: "http://example.org/StructureDefinition/MyLogical",
    name: "MyLogical",
    type: "MyLogical",
    kind: "logical",
    baseDefinition: "http://hl7.org/fhir/StructureDefinition/Element",
    derivation: "specialization",
    differential: {
        element: [
            { id: "MyLogical", path: "MyLogical" },
            { id: "MyLogical.title", path: "MyLogical.title", min: 1, max: "1", type: [{ code: "string" }] },
            { id: "MyLogical.tags", path: "MyLogical.tags", min: 0, max: "*", type: [{ code: "string" }] },
            { id: "MyLogical.section", path: "MyLogical.section", min: 0, max: "*", type: [{ code: "BackboneElement" }] },
            { id: "MyLogical.section.label", path: "MyLogical.section.label", min: 0, max: "1", type: [{ code: "string" }] },
        ],
    },
};

const otherLogicalSd = {
    resourceType: "StructureDefinition",
    url: "http://example.org/StructureDefinition/Another",
    name: "Another",
    type: "Another",
    kind: "logical",
    baseDefinition: "http://hl7.org/fhir/StructureDefinition/Element",
    derivation: "specialization",
    differential: {
        element: [
            { id: "Another", path: "Another" },
            { id: "Another.code", path: "Another.code", min: 1, max: "1", type: [{ code: "code" }] },
        ],
    },
};

describe("buildUserModelLookup", () => {
    test("returns undefined for empty / blank / undefined input", () => {
        expect(buildUserModelLookup(undefined)).toBeUndefined();
        expect(buildUserModelLookup("")).toBeUndefined();
        expect(buildUserModelLookup("   \n  ")).toBeUndefined();
    });

    test("returns undefined for invalid JSON", () => {
        expect(buildUserModelLookup("not { json")).toBeUndefined();
    });

    test("returns undefined when the JSON is neither a Bundle nor a StructureDefinition", () => {
        expect(buildUserModelLookup(JSON.stringify({ resourceType: "Patient" }))).toBeUndefined();
        expect(buildUserModelLookup(JSON.stringify({ foo: "bar" }))).toBeUndefined();
    });

    test("processes a single StructureDefinition (logical model)", () => {
        const r = buildUserModelLookup(JSON.stringify(logicalSd));
        expect(r).toBeDefined();
        expect(r!.typeNames).toContain("MyLogical");
        // BackboneElement is promoted to a synthetic type, same as the static generator.
        expect(r!.typeNames).toContain("mylogical_section");
        const root = r!.lookup("MyLogical");
        expect(root).toBeDefined();
        expect(root!.Elements.map((e) => e.ElementName)).toEqual(["title", "tags", "section"]);
        expect(root!.Elements.find((e) => e.ElementName === "tags")!.IsArray).toBe(true);
        expect(root!.Elements.find((e) => e.ElementName === "section")!.Type[0].TypeName).toBe(
            "mylogical_section"
        );
        const synth = r!.lookup("mylogical_section");
        expect(synth).toBeDefined();
        expect(synth!.Elements.map((e) => e.ElementName)).toEqual(["label"]);
    });

    test("processes a Bundle of StructureDefinitions", () => {
        const bundle = {
            resourceType: "Bundle",
            entry: [{ resource: logicalSd }, { resource: otherLogicalSd }],
        };
        const r = buildUserModelLookup(JSON.stringify(bundle));
        expect(r).toBeDefined();
        expect(r!.typeNames).toEqual(expect.arrayContaining(["MyLogical", "Another", "mylogical_section"]));
        expect(r!.lookup("Another")).toBeDefined();
        expect(r!.lookup("MyLogical")).toBeDefined();
        expect(r!.lookup("does_not_exist")).toBeUndefined();
    });

    test("ignores non-SD entries inside a Bundle", () => {
        const bundle = {
            resourceType: "Bundle",
            entry: [
                { resource: { resourceType: "Patient", id: "p1" } },
                { resource: logicalSd },
            ],
        };
        const r = buildUserModelLookup(JSON.stringify(bundle));
        expect(r).toBeDefined();
        expect(r!.lookup("MyLogical")).toBeDefined();
        expect(r!.lookup("Patient")).toBeUndefined();
    });
});

describe("composeLookups", () => {
    test("falls back when primary returns undefined; never mutates either side", () => {
        const fallbackMap = new Map([["Foo", { TypeName: "Foo", Elements: [] }]]);
        const fallback = (n: string) => fallbackMap.get(n);
        const primary = buildUserModelLookup(JSON.stringify(logicalSd))!.lookup;

        const composed = composeLookups(primary, fallback);
        // user-supplied wins for its own types
        expect(composed("MyLogical")?.TypeName).toBe("MyLogical");
        // falls back when primary doesn't know the type
        expect(composed("Foo")?.TypeName).toBe("Foo");
        // composition is read-only — the underlying maps are unchanged
        expect(fallbackMap.has("MyLogical")).toBe(false);
    });

    test("returns the fallback unchanged when primary is undefined", () => {
        const fallback = (n: string) => (n === "X" ? { TypeName: "X", Elements: [] } : undefined);
        const composed = composeLookups(undefined, fallback);
        expect(composed("X")?.TypeName).toBe("X");
        expect(composed("Y")).toBeUndefined();
    });
});
