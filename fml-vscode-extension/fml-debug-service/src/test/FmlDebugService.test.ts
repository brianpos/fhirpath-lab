import assert from "node:assert/strict";
import test from "node:test";
import {FmlDebugService, parseDebugTrace} from "../FmlDebugService";
import {JsonValue} from "../contracts";

const cursorUrl = "http://fhirpath-lab.com/StructureDefinition/Cursor";
const variableUrl = "http://fhirpath-lab.com/StructureDefinition/Variable";

const responseFixture = {
    resourceType: "Parameters",
    parameter: [
        {
            name: "outcome",
            resource: {
                resourceType: "OperationOutcome",
                issue: [{severity: "information", code: "informational"}],
            },
        },
        {
            name: "result",
            valueString: "{\"resourceType\":\"Patient\",\"id\":\"example\"}",
        },
        {
            name: "parameters",
            part: [{name: "evaluator", valueString: ".NET test engine"}],
        },
        {
            name: "trace",
            part: [
                {
                    extension: [
                        {url: cursorUrl, valueString: "10 - 24"},
                        {
                            url: variableUrl,
                            extension: [
                                {url: "name-INPUT", valueString: "src"},
                                {url: "path", valueString: "Patient"},
                            ],
                        },
                    ],
                    name: "debug",
                    valueString: "Group : Main",
                },
                {
                    extension: [{url: cursorUrl, valueString: "30 - 44"}],
                    name: "debug",
                    valueString: "  rule : copy-id",
                },
            ],
        },
    ],
};

test("posts the same FHIR Parameters request shape as the web implementation", async () => {
    let capturedUrl = "";
    let capturedInit: RequestInit | undefined;
    const service = new FmlDebugService(async (input, init) => {
        capturedUrl = input.toString();
        capturedInit = init;
        return new Response(JSON.stringify(responseFixture), {
            status: 200,
            headers: {"Content-Type": "application/fhir+json"},
        });
    });

    const result = await service.execute({
        mapText: "group Main(source src, target tgt) {}",
        maps: [
            {fileName: "main.fml", text: "group Main(source src, target tgt) {}"},
            {fileName: "shared.fml", text: "group Shared(source src, target tgt) {}"},
        ],
        inputText: "{\"resourceType\":\"Patient\",\"id\":\"example\"}",
        modelText: "{\"resourceType\":\"StructureDefinition\"}",
        modelResources: [{
            resourceType: "ConceptMap",
            url: "http://example.org/ConceptMap/example",
        }],
        serverUrl: "https://example.test/StructureMap/$transform?debug=true",
    });

    assert.equal(capturedUrl, "https://example.test/StructureMap/$transform?debug=true");
    assert.equal(capturedInit?.method, "POST");
    assert.deepEqual(capturedInit?.headers, {
        Accept: "application/fhir+json",
        "Content-Type": "application/fhir+json",
    });
    const requestBody = JSON.parse(String(capturedInit?.body));
    assert.deepEqual(requestBody.parameter.map((parameter: {name: string}) => parameter.name), [
        "map",
        "map",
        "model",
        "resource",
    ]);
    assert.deepEqual(requestBody.parameter[0].extension, [{
        url: "http://hl7.org/fhir/StructureDefinition/operationoutcome-file",
        valueString: "main.fml",
    }]);
    assert.equal(requestBody.parameter[1].valueString, "group Shared(source src, target tgt) {}");
    assert.equal(requestBody.parameter[3].resource.resourceType, "Bundle");
    assert.equal(requestBody.parameter[3].resource.entry[0].resource.resourceType, "ConceptMap");
    assert.equal(result.evaluator, ".NET test engine");
    assert.equal(result.trace.length, 2);
    assert.deepEqual(result.trace[0].range, {startOffset: 10, length: 14});
    assert.equal(result.trace[0].variables[0].name, "src");
    assert.equal(result.trace[0].variables[0].mode, "INPUT");
    assert.equal(result.trace[0].variables[0].path, "Patient");
    assert.deepEqual(result.trace[0].variables[0].data?.value, {
        resourceType: "Patient",
        id: "example",
    });
    assert.deepEqual(result.result?.value, {resourceType: "Patient", id: "example"});
    assert.deepEqual(result.initialState.types["$"], {
        name: "Patient",
        namespace: "FHIR",
    });
    assert.deepEqual(result.initialState.types["$.id"], {name: "string"});
});

test("parses trace states from JSON-value extensions when provided", () => {
    const payload = structuredClone(responseFixture);
    const traceParameter = payload.parameter.find(parameter => parameter.name === "trace");
    if (!traceParameter || !("part" in traceParameter) || !traceParameter.part?.[1]) {
        assert.fail("Trace fixture is missing its second trace event.");
    }
    const tracePart = traceParameter.part[1];
    if (!("extension" in tracePart) || !tracePart.extension) {
        assert.fail("Trace fixture event is missing extensions.");
    }
    tracePart.extension.push({
        url: "http://fhir.forms-lab.com/StructureDefinition/json-value",
        valueString: "{\"target\":{\"id\":\"after-step\"}}",
    });

    const trace = parseDebugTrace(payload, {resourceType: "Patient"} as JsonValue);

    assert.deepEqual(trace.trace[1].state?.value, {target: {id: "after-step"}});
});

test("uses engine-supplied type metadata when a typed envelope is returned", () => {
    const payload = structuredClone(responseFixture);
    const resultParameter = payload.parameter.find(parameter => parameter.name === "result");
    if (!resultParameter || !("valueString" in resultParameter)) {
        assert.fail("Result fixture is missing.");
    }
    resultParameter.valueString = JSON.stringify({
        value: {
            customField: "ABC",
        },
        types: {
            "$": {
                name: "MyLogicalPatient",
                namespace: "http://example.org/StructureDefinition",
            },
            "$.customField": {
                name: "MyCustomCode",
            },
        },
    });

    const trace = parseDebugTrace(payload, {resourceType: "Patient"});

    assert.deepEqual(trace.result?.types["$"], {
        name: "MyLogicalPatient",
        namespace: "http://example.org/StructureDefinition",
    });
    assert.deepEqual(trace.result?.types["$.customField"], {
        name: "MyCustomCode",
    });
});

test("rejects an invalid input resource before calling the engine", async () => {
    let called = false;
    const service = new FmlDebugService(async () => {
        called = true;
        return new Response();
    });

    await assert.rejects(
        service.execute({mapText: "group Main", inputText: "{invalid"}),
        /Unable to parse input resource/,
    );
    assert.equal(called, false);
});

test("preserves HTTP status when an error response is not JSON", async () => {
    const service = new FmlDebugService(async () => {
        return new Response("<html>gateway unavailable</html>", {
            status: 503,
            statusText: "Service Unavailable",
        });
    });

    await assert.rejects(
        service.execute({
            mapText: "group Main",
            inputText: "{\"resourceType\":\"Patient\"}",
        }),
        /HTTP 503 Service Unavailable/,
    );
});
