import { describe, expect, test } from "@jest/globals";
import type { Library } from "fhir/r4b";
import {
    decodeLibraryContent,
    encodeLibraryContent,
    findCqlTextContent,
    findLogicContent,
    inputParameterDefinitions,
    testerPathForLibrary,
} from "../helpers/library_content";

describe("Library logic content", () => {
    test("round-trips UTF-8 attachment content", () => {
        const source = "define Greeting: 'Héllo'";
        expect(decodeLibraryContent(encodeLibraryContent(source))).toBe(source);
    });

    test("routes supported content to its tester", () => {
        expect(testerPathForLibrary("example", "text/cql")).toBe("/cql?libraryId=example");
        expect(testerPathForLibrary("example", "text/fhirpath"))
            .toBe("/FhirPath?libraryId=example");
        expect(testerPathForLibrary(
            "https://example.test/fhir/Library/example",
            "text/cql",
        )).toBe(
            "/cql?libraryId=https%3A%2F%2Fexample.test%2Ffhir%2FLibrary%2Fexample",
        );
    });

    test("finds logic content and input parameters", () => {
        const library: Library = {
            resourceType: "Library",
            status: "active",
            type: {},
            content: [
                { contentType: "application/elm+json", data: "e30=" },
                { contentType: "text/cql", data: "MSArIDE=" },
            ],
            parameter: [
                { name: "Input", use: "in", min: 0, max: "1", type: "String" },
                { name: "Output", use: "out", min: 0, max: "1", type: "String" },
            ],
        };
        expect(findLogicContent(library)?.contentType).toBe("text/cql");
        expect(findCqlTextContent(library)?.data).toBe("MSArIDE=");
        expect(inputParameterDefinitions(library).map((parameter) => parameter.name))
            .toEqual(["Input"]);
    });
});
