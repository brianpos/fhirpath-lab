import { describe, expect, test } from "@jest/globals";
import type { OperationOutcome, Parameters } from "fhir/r4b";
import {
    buildCqlParameters,
    createFhirEndpoint,
    normalizeCqlEndpointUrl,
    normalizeCqlResponse,
} from "../helpers/cql_api_engine";

describe("CQL endpoint handling", () => {
    test("appends the operation to a base URL", () => {
        expect(normalizeCqlEndpointUrl("https://example.test/fhir/"))
            .toBe("https://example.test/fhir/$cql");
    });

    test("preserves a full operation URL", () => {
        expect(normalizeCqlEndpointUrl("https://example.test/fhir/$cql"))
            .toBe("https://example.test/fhir/$cql");
    });

    test("creates a FHIR REST Endpoint resource", () => {
        expect(createFhirEndpoint("https://example.test/fhir").address)
            .toBe("https://example.test/fhir");
    });

    test("uses the R5 Endpoint connectionType shape for R5 and R6 engines", () => {
        expect(createFhirEndpoint("https://example.test/fhir", "R5")).toMatchObject({
            resourceType: "Endpoint",
            connectionType: [{
                coding: [{
                    code: "hl7-fhir-rest",
                }],
            }],
        });
        expect(createFhirEndpoint("https://example.test/fhir", "R5"))
            .not.toHaveProperty("payloadType");
    });
});

describe("CQL request construction", () => {
    test("builds all supported operation inputs", () => {
        const request = buildCqlParameters({
            cql: "define One: 1\ndefine Two: 2",
            subject: "Patient/123",
            parameters: [
                { name: "Enabled", type: "boolean", value: "true" },
                { name: "Count", type: "integer", value: "2" },
                {
                    name: "Patient",
                    type: "Patient",
                    value: "{\"resourceType\":\"Patient\",\"id\":\"example\"}",
                },
            ],
            libraries: [{ url: "http://example.org/Library/Test|1.0", name: "Test" }],
            useServerData: false,
            data: {
                resourceType: "Bundle",
                type: "collection",
            },
            dataEndpoint: "https://data.example/fhir",
            contentEndpoint: "https://content.example/fhir",
            terminologyEndpoint: "https://tx.example/fhir",
        });

        expect(request.parameter?.map((parameter) => parameter.name)).toEqual([
            "expression",
            "subject",
            "parameters",
            "library",
            "data",
            "dataEndpoint",
            "contentEndpoint",
            "terminologyEndpoint",
        ]);
        const nested = request.parameter?.find((parameter) => parameter.name === "parameters")
            ?.resource as Parameters;
        expect(nested.parameter?.[0].valueBoolean).toBe(true);
        expect(nested.parameter?.[1].valueInteger).toBe(2);
        expect(nested.parameter?.[2].resource).toMatchObject({
            resourceType: "Patient",
            id: "example",
        });
        expect(request.parameter).not.toContainEqual({
            name: "useServerData",
            valueBoolean: false,
        });
    });

    test("rejects inline and prefetch data together", () => {
        expect(() => buildCqlParameters({
            cql: "1",
            data: { resourceType: "Bundle", type: "collection" },
            prefetchData: [{ key: "patient" }],
        })).toThrow("mutually exclusive");
    });

    test("includes useServerData only when enabled", () => {
        expect(buildCqlParameters({
            cql: "define One: 1",
            useServerData: true,
        }).parameter).toContainEqual({
            name: "useServerData",
            valueBoolean: true,
        });
        expect(buildCqlParameters({
            cql: "define One: 1",
            useServerData: false,
        }).parameter?.some(parameter => parameter.name === "useServerData")).toBe(false);
    });

    test("builds endpoint parameters for the target FHIR version", () => {
        const request = buildCqlParameters({
            cql: "define One: 1",
            dataEndpoint: "https://data.example/fhir",
        }, "R6");
        const endpoint = request.parameter?.find(parameter => parameter.name === "dataEndpoint")
            ?.resource as unknown as { connectionType: unknown[] };
        expect(endpoint.connectionType).toHaveLength(1);
    });
});

describe("CQL response normalization", () => {
    test("preserves ordered repeated and nested results", () => {
        const response: Parameters = {
            resourceType: "Parameters",
            parameter: [
                { name: "return", valueInteger: 1 },
                {
                    name: "return",
                    part: [
                        { name: "name", valueString: "second" },
                        { name: "value", valueBoolean: true },
                    ],
                },
            ],
        };
        const result = normalizeCqlResponse(response, "Test", "https://example/$cql");
        expect(result.results).toHaveLength(2);
        expect(result.results[0]).toMatchObject({ index: 0, type: "Integer", display: "1" });
        expect(result.results[1].children).toHaveLength(2);
        expect(result.raw).toBe(response);
    });

    test("finds embedded OperationOutcome resources", () => {
        const outcome: OperationOutcome = {
            resourceType: "OperationOutcome",
            issue: [{ severity: "error", code: "exception", diagnostics: "Invalid CQL" }],
        };
        const response: Parameters = {
            resourceType: "Parameters",
            parameter: [{ name: "evaluation error", resource: outcome }],
        };
        const result = normalizeCqlResponse(response, "Test", "https://example/$cql");
        expect(result.outcomes).toEqual([outcome]);
        expect(result.results[0].type).toBe("OperationOutcome");
    });
});
