import assert from "node:assert/strict";
import test from "node:test";
import {buildParametersRequest, createFmlContent, findTraceMapSource, FmlDebugService, parseDebugTrace, parseOperationOutcomeIssues} from "../FmlDebugService";
import {JsonValue} from "../contracts";

const cursorUrl = "http://fhirpath-lab.com/StructureDefinition/Cursor";
const traceLocationUrl = "http://fhirpath-lab.com/StructureDefinition/TraceLocation";
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

test("logs outgoing headers, complete Parameters and the unchanged response body", async () => {
    const logs: string[] = [];
    let requestBody = "";
    let requestHeaders: Headers | undefined;
    const responseText = '{\r\n  "resourceType": "Parameters",\r\n  "parameter": [{"name":"return","resource":{"resourceType":"Patient","id":"logged","number":9007199254740993}}]\r\n}';
    const service = new FmlDebugService(async (_url, init) => {
        assert.equal(logs.length, 1);
        requestBody = String(init?.body);
        requestHeaders = new Headers(init?.headers);
        return new Response(responseText, {status: 200, statusText: "OK"});
    }, undefined, message => logs.push(message));
    const mapText = `// ${"full map content ".repeat(5000)}\ngroup Main(source src, target tgt) { }`;
    const inputText = '{"resourceType":"Patient","id":"input","name":[{"family":"\u00e9"}]}';
    const result = await service.execute({
        serverUrl: "https://engine.test/transformDebugger",
        mapText,
        maps: [{fileName: "main.fml", text: mapText}, {fileName: "shared.fml", text: "group Shared { }"}],
        inputText,
        modelText: '{"resourceType":"StructureDefinition","id":"model"}',
        modelResources: [{resourceType: "ConceptMap", id: "dependency"}],
    });
    assert.equal(result.trace.length, 0);
    assert.equal(logs.length, 2);
    assert.equal(requestHeaders?.get("Accept"), "application/fhir+json, application/json");
    assert.equal(requestHeaders?.get("Content-Type"), "application/fhir+json");
    const requestHeading = `FML server request: POST https://engine.test/transformDebugger\nAccept: ${requestHeaders.get("Accept")}\nContent-Type: ${requestHeaders.get("Content-Type")}\n\n`;
    assert.ok(logs[0].startsWith(requestHeading));
    const loggedParameters = JSON.parse(logs[0].slice(requestHeading.length));
    assert.deepEqual(loggedParameters, JSON.parse(requestBody));
    assert.equal(loggedParameters.parameter[0].valueString, mapText);
    assert.equal(loggedParameters.parameter[1].valueString, "group Shared { }");
    assert.equal(loggedParameters.parameter.filter((part: {name: string}) => part.name === "model").length, 2);
    const content = loggedParameters.parameter.find((part: {name: string}) => part.name === "content").resource;
    assert.equal(Buffer.from(content.data, "base64").toString("utf8"), inputText);
    assert.equal(logs[1], `FML server response: HTTP 200 OK from https://engine.test/transformDebugger\n${responseText}`);
});

for (const {status, statusText, responseText, expectedError} of [
    {status: 400, statusText: "Bad Request", responseText: '{"resourceType":"OperationOutcome","issue":[{"severity":"error","diagnostics":"invalid map"}]}', expectedError: /HTTP 400 Bad Request/},
    {status: 503, statusText: "Service Unavailable", responseText: "<html>gateway unavailable</html>", expectedError: /HTTP 503 Service Unavailable/},
    {status: 200, statusText: "OK", responseText: '{"resourceType":"OperationOutcome","issue":[{"severity":"error","diagnostics":"evaluation failed"}]}', expectedError: /evaluation failed/},
    {status: 200, statusText: "OK", responseText: "{invalid JSON", expectedError: /Unable to parse debug engine response/},
]) {
    test(`logs the full HTTP ${status} response before reporting ${responseText.slice(0, 40)}`, async () => {
        const logs: string[] = [];
        const service = new FmlDebugService(async () =>
            new Response(responseText, {status, statusText}), undefined, message => logs.push(message));
        await assert.rejects(service.execute({mapText: "group Main { }", inputText: "{}"}), expectedError);
        assert.equal(logs.length, 2);
        assert.ok(logs[0].startsWith("FML server request: POST "));
        assert.ok(logs[1].startsWith(`FML server response: HTTP ${status} ${statusText} from `));
        assert.equal(logs[1].slice(logs[1].indexOf("\n") + 1), responseText);
    });
}

test("logs stopped Parameters recordings before parsing their failure snapshots", async () => {
    const logs: string[] = [];
    const responseText = JSON.stringify({
        resourceType: "Parameters",
        parameter: [
            {name: "traceStatus", valueCode: "stopped"},
            {name: "trace", part: [{name: "phase", valueCode: "enter"}]},
            {name: "outcome", resource: {resourceType: "OperationOutcome", issue: [
                {severity: "fatal", diagnostics: "synthetic failure"},
            ]}},
        ],
    });
    const service = new FmlDebugService(async () => new Response(responseText, {
        status: 500, statusText: "Internal Server Error",
    }), undefined, message => logs.push(message));
    const trace = await service.execute({mapText: "group Main { }", inputText: "{}"});
    assert.equal(trace.traceStatus, "stopped");
    assert.equal(trace.trace[0].exception, "synthetic failure");
    assert.equal(logs[1].slice(logs[1].indexOf("\n") + 1), responseText);
});

test("logs transport failures without changing the original error", async () => {
    const logs: string[] = [];
    const failure = new Error("connection refused");
    const service = new FmlDebugService(async () => {
        throw failure;
    }, undefined, message => logs.push(message));
    await assert.rejects(service.execute({
        serverUrl: "https://engine.test/transformDebugger", mapText: "group Main { }", inputText: "{}",
    }), error => error === failure);
    assert.equal(logs.length, 2);
    assert.equal(logs[1], "FML server transport error: https://engine.test/transformDebugger\nconnection refused");
});

test("logs response body read failures without claiming that a complete response was received", async () => {
    const logs: string[] = [];
    const failure = new Error("response stream interrupted");
    const service = new FmlDebugService(async () => new Response(new ReadableStream({
        start(controller) { controller.error(failure); },
    })), undefined, message => logs.push(message));
    await assert.rejects(service.execute({
        serverUrl: "https://engine.test/transformDebugger", mapText: "group Main { }", inputText: "{}",
    }), error => error === failure);
    assert.equal(logs.length, 2);
    assert.equal(logs[1], "FML server transport error: https://engine.test/transformDebugger\nresponse stream interrupted");
});

for (const legacyPost of [undefined, false, true]) {
    for (const [format, inputText] of [
        ["JSON", '{\r\n  "resourceType": "Patient", "id": "\u00e9", "number": 9007199254740993\r\n}'],
        ["XML", '<Patient xmlns="http://hl7.org/fhir"><id value="\u00e9"/></Patient>'],
    ]) {
        test(`posts ${format} with legacyPost=${String(legacyPost)}, preserving maps, models and request logging`, async () => {
            const maps = [
                {fileName: "main.fml", text: "group Main(source src, target tgt) {}"},
                {fileName: "shared.fml", text: "group Shared(source src, target tgt) {}"},
            ];
            const modelText = '{"resourceType":"StructureDefinition","id":"model"}';
            const model = {resourceType: "ConceptMap", id: "dependency"};
            const expected = {
                resourceType: "Parameters",
                parameter: [
                    ...maps.map(map => ({
                        name: legacyPost ? "map" : "srcMap",
                        valueString: map.text,
                        extension: [{
                            url: "http://hl7.org/fhir/StructureDefinition/operationoutcome-file",
                            valueString: map.fileName,
                        }],
                    })),
                    {name: "model", valueString: modelText},
                    {name: "model", resource: {
                        resourceType: "Bundle", type: "collection", entry: [{resource: model}],
                    }},
                    legacyPost
                        ? {name: "resource", valueString: inputText}
                        : {name: "content", resource: {
                            resourceType: "Binary",
                            contentType: format === "JSON" ? "application/fhir+json" : "application/fhir+xml",
                            data: Buffer.from(inputText, "utf8").toString("base64"),
                        }},
                ],
            };
            const logs: string[] = [];
            const service = new FmlDebugService(async (_url, init) => {
                assert.equal(init?.method, "POST");
                assert.deepEqual(init?.headers, {
                    Accept: "application/fhir+json, application/json", "Content-Type": "application/fhir+json",
                });
                const requestBody = JSON.parse(String(init?.body));
                assert.deepEqual({
                    ...requestBody,
                    parameter: requestBody.parameter.filter((parameter: {name: string}) => parameter.name !== "debug"),
                }, expected);
                assert.ok(
                    new URL(_url.toString()).searchParams.get("debug") === "true"
                        || requestBody.parameter.some((parameter: {name: string; valueBoolean?: boolean}) =>
                            parameter.name === "debug" && parameter.valueBoolean === true),
                    "The request must enable debug using the URL query or a Boolean body parameter.",
                );
                assert.equal(logs.length, 1);
                assert.deepEqual(JSON.parse(logs[0].slice(logs[0].indexOf("\n\n") + 2)), requestBody);
                return new Response('{"resourceType":"Parameters"}');
            }, undefined, message => logs.push(message));
            await service.execute({
                mapText: maps[0].text, maps, inputText, modelText, modelResources: [model], legacyPost,
                serverUrl: legacyPost
                    ? "https://engine.test/transformDebugger"
                    : "https://engine.test/StructureMap/$transform?debug=true",
            });
            assert.equal(logs.length, 2);
        });
    }
}

test("uses the primary map text for a legacy request without a maps collection", () => {
    assert.deepEqual(buildParametersRequest({
        mapText: "group Main {}", inputText: "{}", legacyPost: true,
    }), {
        resourceType: "Parameters",
        parameter: [
            {name: "map", valueString: "group Main {}"},
            {name: "resource", valueString: "{}"},
            {name: "debug", valueBoolean: true},
        ],
    });
});

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
        Accept: "application/fhir+json, application/json",
        "Content-Type": "application/fhir+json",
    });
    const requestBody = JSON.parse(String(capturedInit?.body));
    assert.deepEqual(requestBody.parameter
        .filter((parameter: {name: string}) => parameter.name !== "debug")
        .map((parameter: {name: string}) => parameter.name), [
        "srcMap",
        "srcMap",
        "model",
        "model",
        "content",
    ]);
    assert.ok(
        new URL(capturedUrl).searchParams.get("debug") === "true"
            || requestBody.parameter.some((parameter: {name: string; valueBoolean?: boolean}) =>
                parameter.name === "debug" && parameter.valueBoolean === true),
        "The request must enable debug using the URL query or a Boolean body parameter.",
    );
    assert.deepEqual(requestBody.parameter[0].extension, [{
        url: "http://hl7.org/fhir/StructureDefinition/operationoutcome-file",
        valueString: "main.fml",
    }]);
    assert.equal(requestBody.parameter[1].valueString, "group Shared(source src, target tgt) {}");
    assert.equal(requestBody.parameter[3].resource.resourceType, "Bundle");
    assert.equal(requestBody.parameter[3].resource.entry[0].resource.resourceType, "ConceptMap");
    assert.deepEqual(requestBody.parameter[4].resource, {
        resourceType: "Binary",
        contentType: "application/fhir+json",
        data: Buffer.from("{\"resourceType\":\"Patient\",\"id\":\"example\"}", "utf8").toString("base64"),
    });
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

test("parses simplified FHIRPath trace locations", () => {
    const traceLocation = "StructureMap.group[1].rule[2].target[0]";
    const trace = parseDebugTrace({
        resourceType: "Parameters",
        parameter: [{
            name: "trace",
            part: [{
                name: "debug",
                valueString: "target",
                extension: [{url: traceLocationUrl, valueString: traceLocation}],
            }],
        }],
    }, {});

    assert.equal(trace.trace[0].traceLocation, traceLocation);
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

test("parses variable type and object value extensions", () => {
    const payload = structuredClone(responseFixture);
    const traceParameter = payload.parameter.find(parameter => parameter.name === "trace");
    if (!traceParameter || !("part" in traceParameter) || !traceParameter.part?.[0]) {
        assert.fail("Trace fixture is missing its first trace event.");
    }
    const tracePart = traceParameter.part[0];
    if (!("extension" in tracePart) || !tracePart.extension?.[1].extension) {
        assert.fail("Trace fixture event is missing its variable extension.");
    }
    tracePart.extension[1].extension.push(
        {url: "type", valueString: "Meta"},
        {url: "value", valueString: "{\"lastUpdated\":\"2020-07-07T13:26:22.0314215+00:00\"}"},
    );

    const trace = parseDebugTrace(payload, {resourceType: "Patient"});
    const variable = trace.trace[0].variables[0];

    assert.equal(variable.datatype, "Meta");
    assert.deepEqual(variable.data?.value, {
        lastUpdated: "2020-07-07T13:26:22.0314215+00:00",
    });
});

function traceWithVariableValue(valueExtension: Record<string, unknown>) {
    return {
        resourceType: "Parameters",
        parameter: [{
            name: "trace",
            part: [{
                name: "debug",
                valueString: "condition",
                extension: [{
                    url: variableUrl,
                    extension: [
                        {url: "name-INPUT", valueString: "condition"},
                        {url: "type", valueString: "System.Boolean"},
                        valueExtension,
                    ],
                }],
            }],
        }],
    };
}

test("reads native FHIR value[x] from variable extensions", () => {
    const trace = parseDebugTrace(traceWithVariableValue({url: "value", valueBoolean: true}), {});
    const variable = trace.trace[0].variables[0];

    assert.equal(variable.datatype, "System.Boolean");
    assert.equal(variable.data?.value, true);
});

test("keeps primitive display text that is not valid JSON", () => {
    const trace = parseDebugTrace(traceWithVariableValue({url: "value", valueString: "True"}), {});

    assert.equal(trace.trace[0].variables[0].data?.value, "True");
});

test("does not coerce primitive text that happens to look like a JSON scalar", () => {
    const trace = parseDebugTrace(traceWithVariableValue({url: "value", valueString: "123"}), {});

    assert.equal(trace.trace[0].variables[0].data?.value, "123");
});

test("reads the json-value fallback extension for values without a native FHIR type", () => {
    const trace = parseDebugTrace(traceWithVariableValue({
        url: "http://fhir.forms-lab.com/StructureDefinition/json-value",
        valueString: "{\"resourceType\":\"Patient\",\"id\":\"example\"}",
    }), {});

    assert.deepEqual(trace.trace[0].variables[0].data?.value, {
        resourceType: "Patient",
        id: "example",
    });
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

test("parses all OperationOutcome issue source extensions as 1-based positions", () => {
    const issues = parseOperationOutcomeIssues({
        resourceType: "OperationOutcome",
        issue: [
            {
                severity: "error",
                details: {text: "Unknown parent group"},
                extension: [
                    {
                        url: "http://hl7.org/fhir/StructureDefinition/operationoutcome-file",
                        valueString: "shared.fml",
                    },
                    {
                        url: "http://hl7.org/fhir/StructureDefinition/operationoutcome-issue-line",
                        valueInteger: 12,
                    },
                    {
                        url: "http://hl7.org/fhir/StructureDefinition/operationoutcome-issue-col",
                        valueInteger: 8,
                    },
                ],
            },
            {
                severity: "warning",
                diagnostics: "Secondary issue",
            },
        ],
    });

    assert.deepEqual(issues, [
        {
            message: "Unknown parent group",
            severity: "error",
            fileName: "shared.fml",
            line: 12,
            column: 8,
        },
        {message: "Secondary issue", severity: "warning"},
    ]);
});

test("sends raw HL7 v2 Binary content with an ER7 MIME type and replays inline snapshots", async () => {
    const inputText = "MSH|^~\\&|Lab|Hospital|||||ADT^A01|1|P|2.7\rPID|1||12345678||Chalmers^Peter\r";
    const service = new FmlDebugService(async (_input, init) => {
        const body = JSON.parse(String(init?.body));
        const content = body.parameter.find((parameter: {name: string}) => parameter.name === "content").resource;
        assert.equal(content.contentType, "x-application/hl7-v2+er7");
        assert.equal(Buffer.from(content.data, "base64").toString("utf8"), inputText);
        assert.equal(init?.headers && new Headers(init.headers).get("Content-Type"), "application/fhir+json");
        return new Response(JSON.stringify({resourceType: "Parameters", parameter: []}));
    });
    const result = await service.execute({mapText: "group Main {}", inputText});
    assert.equal(result.initialState.value, inputText);
    const legacy = buildParametersRequest({mapText: "group Main {}", inputText, legacyPost: true});
    assert.deepEqual(legacy.parameter?.find(parameter => parameter.name === "resource"),
        {name: "resource", valueString: inputText});
});

test("encodes JSON and XML Binary content as UTF-8, including large Unicode inputs", async () => {
    const json = JSON.stringify({resourceType: "Patient", name: [{family: "\u00e9\ud83d\ude00".repeat(10000)}]});
    const xml = '<Patient xmlns="http://hl7.org/fhir"><name><family value="\u00e9"/></name></Patient>';
    for (const inputText of [json, xml]) {
        const content = createFmlContent(inputText);
        assert.equal(content.contentType, inputText === xml ? "application/fhir+xml" : "application/fhir+json");
        assert.equal(Buffer.from(content.data, "base64").toString("utf8"), inputText);
    }
    const service = new FmlDebugService(async (_input, init) => {
        const body = JSON.parse(String(init?.body));
        assert.equal(body.parameter[0].name, "srcMap");
        assert.deepEqual(body.parameter[1], {name: "content", resource: createFmlContent(xml)});
        return new Response(JSON.stringify({resourceType: "Parameters", parameter: []}));
    });
    const result = await service.execute({mapText: "group Main {}", inputText: xml});
    assert.equal(result.initialState.value, xml);
    const request = buildParametersRequest({mapText: "group Main {}", inputText: json});
    assert.equal(request.parameter?.[0].name, "srcMap");
});

test("prefers return over legacy result in either order, decoding Binary JSON and XML", () => {
    for (const inputText of ['{"resourceType":"Patient","id":"\u00e9"}', '<Patient xmlns="http://hl7.org/fhir"/>']) {
        const returned = {name: "return", resource: createFmlContent(inputText)};
        const legacy = {name: "result", valueString: '{"id":"legacy"}'};
        for (const parameter of [[returned, legacy], [legacy, returned]]) {
            const trace = parseDebugTrace({resourceType: "Parameters", parameter}, {});
            assert.equal(trace.rawResult, inputText);
            assert.deepEqual(trace.result?.value, inputText.startsWith("<") ? inputText : JSON.parse(inputText));
        }
    }
    assert.deepEqual(parseDebugTrace({
        parameter: [{name: "return", resource: {resourceType: "Patient", id: "direct"}}],
    }, {}).result?.value, {resourceType: "Patient", id: "direct"});
    assert.equal(parseDebugTrace({parameter: [{name: "return", valueString: "null"}]}, {}).result?.value, null);
});

test("parses ordered structured events, variable snapshots and context-independent retrieval paths", () => {
    const variable = (name: string, part: object[]) => ({
        name: "variable",
        part: [{name: "name", valueString: name}, ...part],
    });
    const payload = {
        resourceType: "Parameters",
        parameter: [
            {name: "parameters", part: [{name: "other", valueString: "metadata"}, {name: "evaluator", valueString: "new engine"}]},
            {name: "output", resource: {resourceType: "StructureMap"}},
            {name: "traceStatus", valueCode: "truncated"},
            {name: "trace", part: [
                {name: "phase", valueCode: "enter"},
                {name: "source", valueString: "main.fml"},
                {name: "startRow", valueInteger: 1},
                {name: "startColumn", valueInteger: 2},
                {name: "endRow", valueInteger: 1},
                {name: "endColumn", valueInteger: 4},
                {name: "expressionPosition", valueString: "StructureMap.group[0]"},
                variable("item", [{name: "value", valueBoolean: false}]),
                variable("item", [{name: "value", valueInteger: 0}]),
                variable("item", [{name: "value", valueString: "123"}]),
                variable("empty", [{name: "contextType", valueString: "query-alias"}, {name: "dataType", valueString: "Custom[]"}]),
                variable("logical", [{name: "jsonValue", valueString: '{"custom":null}'}]),
                variable("res", [{name: "resource", resource: {resourceType: "Patient", id: "snapshot"}}]),
                variable("path", [
                    {name: "contextType", valueString: "parameter"},
                    {name: "dataType", valueString: "Informational label"},
                    {name: "path", valueString: "Patient.id"},
                ]),
                {name: "message", part: [
                    {name: "name", valueString: "log"},
                    {name: "text", valueString: "first"},
                    {name: "text", valueString: "second"},
                ]},
                {name: "message", part: [{name: "text", valueString: "third"}]},
            ]},
            {name: "trace", part: [{name: "phase", valueCode: "step"}, variable("path", [{name: "value", valueString: "changed"}])]},
        ],
    };
    const trace = parseDebugTrace(payload, {resourceType: "Patient", id: "original"}, undefined, [
        {fileName: "main.fml", text: "first\r\n  \ud83d\ude00x"},
    ]);

    assert.equal(trace.evaluator, "new engine");
    assert.equal(trace.traceStatus, "truncated");
    assert.deepEqual(trace.trace.map(event => [event.phase, event.depth]), [["enter", 0], ["step", 1]]);
    assert.deepEqual(trace.trace[0].range, {startOffset: 9, length: 2});
    assert.equal(trace.trace[0].traceLocation, "StructureMap.group[0]");
    assert.equal(trace.trace[0].message, "log: first\nlog: second\nthird");
    assert.deepEqual(trace.trace[0].variables.map(value => [value.name, value.data?.value]), [
        ["item", [false, 0, "123"]], ["empty", []], ["logical", {custom: null}],
        ["res", {resourceType: "Patient", id: "snapshot"}], ["path", "original"],
    ]);
    assert.equal(trace.trace[0].variables[1].mode, "query-alias");
    assert.equal(trace.trace[0].variables[4].datatype, "Informational label");
    assert.equal(trace.trace[1].variables.length, 1);
    assert.equal(trace.trace[1].variables[0].data?.value, "changed");
    assert.deepEqual(trace.parameters, payload.parameter[0]);
    assert.deepEqual(trace.output, [payload.parameter[1]]);
    assert.deepEqual(trace.rawResponse, payload);
});

test("derives omitted depths from the scope stack and retains open scopes on stopped traces", () => {
    const phases = ["enter", "enter", "step", "exit", "step", "exit"];
    const payload = {parameter: phases.map(phase => ({
        name: "trace", part: [{name: "phase", valueCode: phase}],
    }))};
    assert.deepEqual(parseDebugTrace(payload, {}).trace.map(event => event.depth), [0, 1, 2, 1, 1, 0]);
    const stopped = parseDebugTrace({parameter: [
        {name: "traceStatus", valueCode: "stopped"},
        ...payload.parameter.slice(0, 3),
        {name: "outcome", resource: {resourceType: "OperationOutcome", issue: [
            {severity: "error", diagnostics: "check failed"},
        ]}},
        {name: "return", resource: {resourceType: "Patient"}},
    ]}, {});
    assert.equal(stopped.trace.length, 3);
    assert.equal(stopped.trace[2].exception, "check failed");
    assert.equal(stopped.trace[2].phase, "step");
    assert.equal(stopped.result?.value && typeof stopped.result.value, "object");
    const warning = parseDebugTrace({parameter: [
        ...payload.parameter,
        {name: "outcome", resource: {issue: [{severity: "warning", diagnostics: "warning only"}]}},
    ]}, {});
    assert.equal(warning.trace.at(-1)?.exception, undefined);
    assert.equal(warning.traceStatus, "complete");
});

test("keeps structured failure recordings returned with an HTTP error", async () => {
    const service = new FmlDebugService(async () => new Response(JSON.stringify({
        resourceType: "Parameters",
        parameter: [
            {name: "traceStatus", valueCode: "stopped"},
            {name: "trace", part: [{name: "phase", valueCode: "enter"}]},
            {name: "outcome", resource: {resourceType: "OperationOutcome", issue: [
                {severity: "fatal", diagnostics: "evaluation failed"},
            ]}},
        ],
    }), {status: 500}));
    const result = await service.execute({mapText: "group Main {}", inputText: "{}"});
    assert.equal(result.trace[0].exception, "evaluation failed");
    assert.equal(result.traceStatus, "stopped");
});

test("reports malformed structured variable JSON rather than silently dropping its value", () => {
    assert.throws(() => parseDebugTrace({parameter: [{name: "trace", part: [
        {name: "phase", valueCode: "step"},
        {name: "variable", part: [
            {name: "name", valueString: "broken"},
            {name: "jsonValue", valueString: "{invalid"},
        ]},
    ]}]}, {}), /Unable to parse trace variable 'broken' jsonValue/);
});

test("resolves trace source identifiers as filenames, document URIs, or map canonicals", () => {
    const main = {fileName: "main.fml", filePath: "C:\\maps\\main.fml", text: "map 'http://example.test/Main' = 'Main'"};
    const shared = {fileName: "nested/shared.fml", text: "/// url = 'http://example.test/Shared'"};
    const sources = [main, shared];
    assert.equal(findTraceMapSource("file:///C:/maps/main.fml", sources), main);
    assert.equal(findTraceMapSource("MAIN.FML", sources), main);
    assert.equal(findTraceMapSource("http://example.test/Shared", sources), shared);
    assert.equal(findTraceMapSource("shared.fml", sources), shared);
    assert.equal(findTraceMapSource(undefined, sources), main);
    assert.equal(findTraceMapSource("missing.fml", sources), undefined);
    assert.equal(findTraceMapSource("shared.fml", [...sources, {...shared, fileName: "other/shared.fml"}]), undefined);
});

test("reports XML path-only variables as unavailable instead of inventing empty collections", () => {
    const trace = parseDebugTrace({parameter: [{name: "trace", part: [
        {name: "phase", valueCode: "step"},
        {name: "variable", part: [
            {name: "name", valueString: "src"},
            {name: "path", valueString: "Patient"},
        ]},
    ]}]}, '<Patient xmlns="http://hl7.org/fhir"/>');
    assert.equal(trace.trace[0].variables[0].data, undefined);
    assert.match(trace.trace[0].variables[0].errorMessage ?? "", /XML input retrieval paths/);
});

test("reports raw v2 path-only variables as unavailable while preserving inline values", () => {
    const trace = parseDebugTrace({parameter: [{name: "trace", part: [
        {name: "phase", valueCode: "step"},
        {name: "variable", part: [{name: "name", valueString: "src"}, {name: "path", valueString: "Message"}]},
        {name: "variable", part: [{name: "name", valueString: "id"}, {name: "path", valueString: "Message.id"},
            {name: "jsonValue", valueString: '"12345678"'}]},
    ]}]}, "MSH|^~\\&|Lab|Hospital|||||ADT^A01|1|P|2.7\rPID|1||12345678\r");
    assert.match(trace.trace[0].variables[0].errorMessage ?? "", /HL7 v2 input retrieval paths/);
    assert.equal(trace.trace[0].variables[1].data?.value, "12345678");
});

test("reports HTTP failures even if the Parameters recording omits an error outcome", async () => {
    const service = new FmlDebugService(async () => new Response(JSON.stringify({
        resourceType: "Parameters",
        parameter: [{name: "trace", part: [{name: "phase", valueCode: "step"}]}],
    }), {status: 500, statusText: "Internal Server Error"}));
    const trace = await service.execute({mapText: "group Main {}", inputText: "{}"});
    assert.match(trace.trace[0].exception ?? "", /HTTP 500 Internal Server Error/);
});

test("preserves OperationOutcome expression locations for failures before trace recording", () => {
    const issues = parseOperationOutcomeIssues({
        resourceType: "OperationOutcome",
        issue: [{severity: "fatal", diagnostics: "bad source", expression: ["StructureMap.group[0]"]}],
    });
    assert.equal(issues[0].expression, "StructureMap.group[0]");
});
