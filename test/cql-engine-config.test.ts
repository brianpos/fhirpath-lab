import { describe, expect, test } from "@jest/globals";
import {
    applyConfigCqlEngines,
    createCustomCqlEngine,
    registeredCqlEngines,
} from "../types/cql_test_engine";
import {
    createCqlZulipShareText,
    decodeTestCqlData,
    encodeTestCqlData,
} from "../models/cql_test_model";

describe("CQL engine configuration", () => {
    test("returns a copy of the built-in engines", () => {
        const result = applyConfigCqlEngines(registeredCqlEngines, {});
        expect(result).not.toBe(registeredCqlEngines);
        expect(Object.keys(result)).toEqual(Object.keys(registeredCqlEngines));
        expect(Object.keys(result)[0]).toBe("Alphora (R4)");
        expect(result["Firely Server (R4)"]).toMatchObject({
            fhirVersion: "R4",
            configSetting: "cql_firely_r4",
        });
    });

    test("adds and orders config-defined engines", () => {
        const result = applyConfigCqlEngines(registeredCqlEngines, {
            cqlEngines: {
                "Test engine": {
                    legacyName: "Test engine",
                    name: "Test",
                    fhirVersion: "R4",
                    appInsightsEngineName: "Test",
                    publisher: "Test publisher",
                    description: "Test CQL engine",
                    endpointUrl: "https://example.test/fhir",
                },
            },
            enabledCqlEngines: ["Test engine", "HL7 Quality (R4)"],
        });
        expect(Object.keys(result)).toEqual(["Test engine", "HL7 Quality (R4)"]);
    });

    test("does not allow a built-in engine override", () => {
        const warn = jest.spyOn(console, "warn").mockImplementation(() => {});
        const result = applyConfigCqlEngines(registeredCqlEngines, {
            cqlEngines: {
                "HL7 Quality (R4)": {
                    endpointUrl: "https://malicious.example/fhir",
                },
            },
        });
        expect(result["HL7 Quality (R4)"].endpointUrl).toBeUndefined();
        warn.mockRestore();
    });

    test("creates an ephemeral custom engine", () => {
        const engine = createCustomCqlEngine("https://example.test/fhir");
        expect(engine.custom).toBe(true);
        expect(engine.endpointUrl).toBe("https://example.test/fhir");
    });

    test("preserves the FHIR version in shared test state", () => {
        const state = decodeTestCqlData(encodeTestCqlData({
            cql: "define Answer: 42",
            engine: "Configured R5 engine",
            fhirVersion: "R5",
        }));
        expect(state.fhirVersion).toBe("R5");
        expect(state.engine).toBe("Configured R5 engine");
    });

    test("formats a Zulip-friendly CQL share link", () => {
        expect(createCqlZulipShareText(
            "'Hello World'",
            "https://fhirpath-lab.com/cql#compressed",
        )).toBe(
            "```cql\n'Hello World'\n```\n"
            + ":test_tube: [Test with FHIRPath-Lab](https://fhirpath-lab.com/cql#compressed)",
        );
    });
});
