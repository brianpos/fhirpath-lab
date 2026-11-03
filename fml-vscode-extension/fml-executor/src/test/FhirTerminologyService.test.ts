import assert from "node:assert/strict";
import test from "node:test";
import {FhirTerminologyService} from "../FhirTerminologyService";

const mapped = {system: "http://example.test/target", version: "2", code: "M", display: "Mapped"};
function response(relationship = "equivalent", valueCoding: object = mapped) {
    return {resourceType: "Parameters", parameter: [
        {name: "result", valueBoolean: true},
        {name: "match", part: [{name: "equivalence", valueCode: relationship}, {name: "concept", valueCoding}]},
    ]};
}

test("posts the R4 translate operation using the map canonical/version and the complete Coding", async () => {
    let capturedUrl = "";
    let captured: RequestInit | undefined;
    const controller = new AbortController();
    const service = new FhirTerminologyService("https://tx.test/fhir/?tenant=test", "R4", async (url, init) => {
        capturedUrl = String(url);
        captured = init;
        return new Response(JSON.stringify(response()));
    });
    const source = {system: "http://example.test/source", version: "1", code: "male", display: "Male", userSelected: true};
    const result = await service.translate({name: "source", value: source}, "http://example.test/map|2026", "Coding", controller.signal);
    assert.equal(capturedUrl, "https://tx.test/fhir/ConceptMap/$translate?tenant=test");
    assert.equal(captured?.method, "POST");
    assert.equal(captured?.signal, controller.signal);
    assert.deepEqual(captured?.headers, {Accept: "application/fhir+json", "Content-Type": "application/fhir+json"});
    assert.deepEqual(JSON.parse(String(captured?.body)), {resourceType: "Parameters", parameter: [
        {name: "url", valueUri: "http://example.test/map"},
        {name: "coding", valueCoding: source},
        {name: "conceptMapVersion", valueString: "2026"},
    ]});
    assert.deepEqual(result, [{name: "translated", value: mapped, typeName: "Coding"}]);
});

test("uses R5 sourceCodeableConcept and filters negative relationships", async () => {
    let body = "";
    const service = new FhirTerminologyService("https://tx.test", "R5", async (_url, init) => {
        body = String(init?.body);
        return new Response(JSON.stringify({resourceType: "Parameters", parameter: [
            {name: "result", valueBoolean: true},
            {name: "match", part: [{name: "relationship", valueCode: "not-related-to"}]},
            {name: "match", part: [{name: "relationship", valueCode: "equivalent"}, {name: "concept", valueCoding: mapped}]},
        ]}));
    });
    const input = {coding: [{system: "http://example.test/source", code: "male"}], text: "not needed for translation"};
    const result = await service.translate({name: "source", value: input}, "http://example.test/map", "CodeableConcept");
    assert.deepEqual(JSON.parse(body).parameter[1], {name: "sourceCodeableConcept", valueCodeableConcept: {coding: input.coding}});
    assert.deepEqual(result[0].value, {coding: [mapped]});
});

for (const [output, value, typeName] of [
    ["code", "M", "code"], ["system", "http://example.test/target", "uri"], ["display", "Mapped", "string"],
]) {
    test(`maps a primitive code to the requested ${output} output`, async () => {
        const service = new FhirTerminologyService("https://tx.test", "R4", async (_url, init) => {
            assert.deepEqual(JSON.parse(String(init?.body)).parameter[1], {name: "coding", valueCoding: {code: "male"}});
            return new Response(JSON.stringify(response()));
        });
        assert.deepEqual(await service.translate({name: "source", value: "male"}, "http://example.test/map", output), [
            {name: "translated", value, typeName},
        ]);
    });
}

test("returns an empty result for a standard negative translation", async () => {
    const service = new FhirTerminologyService("https://tx.test", "R4", async () =>
        new Response(JSON.stringify({resourceType: "Parameters", parameter: [{name: "result", valueBoolean: false}]})));
    assert.deepEqual(await service.translate({name: "source", value: "missing"}, "http://example.test/map", "Coding"), []);
});

for (const [label, payload, status, expected] of [
    ["OperationOutcome", {resourceType: "OperationOutcome", issue: [{severity: "error", diagnostics: "Unknown map"}]}, 400, /HTTP 400.*Unknown map/],
    ["HTTP-success OperationOutcome", {resourceType: "OperationOutcome", issue: []}, 200, /OperationOutcome/],
    ["invalid resource", {resourceType: "Patient"}, 200, /FHIR Parameters/],
    ["missing result", {resourceType: "Parameters", parameter: []}, 200, /Boolean result/],
    ["missing match", {resourceType: "Parameters", parameter: [{name: "result", valueBoolean: true}]}, 200, /without an acceptable translation/],
    ["missing concept", {resourceType: "Parameters", parameter: [{name: "result", valueBoolean: true}, {name: "match", part: []}]}, 200, /without a concept/],
    ["negative match", response("disjoint"), 200, /without an acceptable translation/],
    ["unrecognized relationship", response("unknown"), 200, /unrecognized match relationship/],
] as const) {
    test(`reports ${label} responses explicitly`, async () => {
        const service = new FhirTerminologyService("https://tx.test", "R4", async () =>
            new Response(JSON.stringify(payload), {status}));
        await assert.rejects(service.translate({name: "source", value: "male"}, "http://example.test/map", "Coding"), expected);
    });
}

test("preserves HTTP status for a non-JSON server error", async () => {
    const service = new FhirTerminologyService("https://tx.test", "R4", async () => new Response("<html>Unavailable</html>", {status: 503}));
    await assert.rejects(service.translate({name: "source", value: "male"}, "http://example.test/map", "Coding"), /HTTP 503.*invalid JSON/);
});

test("does not issue a request after cancellation", async () => {
    let called = false;
    const service = new FhirTerminologyService("https://tx.test", "R4", async () => {
        called = true;
        return new Response();
    });
    const controller = new AbortController();
    controller.abort();
    await assert.rejects(service.translate({name: "source", value: "male"}, "http://example.test/map", "Coding", controller.signal), /abort/i);
    assert.equal(called, false);
});

test("propagates cancellation while a terminology request is pending", async () => {
    const controller = new AbortController();
    const failure = new Error("cancelled terminology request");
    const service = new FhirTerminologyService("https://tx.test", "R4", async (_url, init) =>
        new Promise<Response>((_resolve, reject) => {
            init?.signal?.addEventListener("abort", () => reject(init.signal?.reason), {once: true});
            controller.abort(failure);
        }));
    await assert.rejects(service.translate({name: "source", value: "male"}, "http://example.test/map", "Coding", controller.signal),
        error => error === failure);
});

test("reports invalid terminology base URLs explicitly", () => {
    for (const url of ["not-a-url", "ftp://tx.test/fhir", "https://tx.test/fhir#fragment"]) {
        assert.throws(() => new FhirTerminologyService(url), /URL/);
    }
});
