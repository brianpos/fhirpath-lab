import assert from "node:assert/strict";
import test from "node:test";
import {createServer} from "node:http";
import {readFileSync} from "node:fs";
import path from "node:path";
import {FmlLocalDebugService} from "../FmlLocalDebugService";
import {FmlTraceReplay} from "../FmlTraceReplay";
import {FmlDebugEngineError, parseOperationOutcomeIssues} from "../FmlDebugService";
import type {JsonValue} from "../contracts";

const mapText = `
uses 'http://hl7.org/fhir/StructureDefinition/Patient' alias P as source
uses 'http://hl7.org/fhir/StructureDefinition/Patient' alias T as target
group Main(source src : P, target tgt : T) { src.id -> tgt.id; }
`;

test("maps HL7 v2 PID identifier, name and DOB locally with generic models and replay", async () => {
    const result = await new FmlLocalDebugService().execute({
        mapText: `
uses "http://hl7.org/fhirpath/v2/StructureDefinition/Message" alias V2 as source
uses "http://hl7.org/fhir/StructureDefinition/Patient" as target
group Main(source src : V2, target tgt : Patient) {
  src.segment as pid where (code = 'PID') -> tgt then {
    pid -> tgt.identifier as id then {
      pid -> id.value = (%pid.field.skip(2).first().element.first().component.first().text) "id";
    } "identifier";
    pid -> tgt.name as n then {
      pid -> n.family = (%pid.field.skip(4).first().element.first().component.first().text) "family";
      pid -> n.given = (%pid.field.skip(4).first().element.first().component.skip(1).first().text) "given";
    } "name";
    pid -> tgt.birthDate = ((%pid.field.skip(6).first().element.first().text.substring(0, 4) + '-' + %pid.field.skip(6).first().element.first().text.substring(4, 2) + '-' + %pid.field.skip(6).first().element.first().text.substring(6, 2)).toDate()) "dob";
  } "pid";
}`,
        inputText: "MSH|^~\\&|Lab|Hospital|||||ADT^A01|1|P|2.7\rPID|1||12345678^^^MR^MR||Chalmers^Peter||19741225|M\r",
    });
    assert.deepEqual(result.result?.value, {
        resourceType: "Patient", identifier: [{value: "12345678"}],
        name: [{family: "Chalmers", given: ["Peter"]}], birthDate: "1974-12-25",
    });
    assert.equal(typeof result.initialState.value, "object");
    assert.ok(result.trace.length);
    assert.equal(result.traceStatus, "complete", JSON.stringify(result.outcome));
});

for (const modelLocation of ["modelText", "modelResources"] as const) {
    test(`maps HL7 v2 with a user-supplied specific model from ${modelLocation}`, async () => {
        const url = "http://example.org/StructureDefinition/LocalMessage";
        const model: JsonValue = {
            resourceType: "StructureDefinition", url, name: "LocalMessage", type: url,
            status: "draft", kind: "logical", abstract: false,
            baseDefinition: "http://hl7.org/fhir/StructureDefinition/Base", derivation: "specialization",
            differential: {element: [
                {id: "LocalMessage", path: "LocalMessage"},
                {id: "LocalMessage.pid", path: "LocalMessage.pid", min: 0, max: "1",
                    type: [{code: "BackboneElement"}],
                    extension: [{url: "http://fhirpath-lab.com/StructureDefinition/hl7v2-source", valueString: "PID"}]},
                {id: "LocalMessage.pid.identifier", path: "LocalMessage.pid.identifier", min: 0, max: "1",
                    type: [{code: "string"}],
                    extension: [{url: "http://fhirpath-lab.com/StructureDefinition/hl7v2-source", valueString: "PID-3.1"}]},
            ]},
        };
        const result = await new FmlLocalDebugService().execute({
            mapText: `
uses "${url}" alias Local as source
uses "http://hl7.org/fhir/StructureDefinition/Patient" as target
group Main(source src : Local, target tgt : Patient) {
  src.pid as pid -> tgt then {
    pid.identifier as value -> tgt.identifier as id, id.value = value "identifier";
  } "pid";
}`,
            inputText: "MSH|^~\\&|Lab|Hospital|||||ADT^A01|1|P|2.7\rPID|1||12345678^^^MR^MR||Chalmers^Peter\r",
            ...(modelLocation === "modelText" ? {modelText: JSON.stringify(model)} : {modelResources: [model]}),
        });
        assert.deepEqual(result.result?.value, {resourceType: "Patient", identifier: [{value: "12345678"}]},
            JSON.stringify(result.outcome));
    });
}

for (const effectiveDateTime of ["2026-11-02T00:30:00+11:00", "2026-11-02T23:30:00-11:00"]) {
    test(`evaluates the blood-pressure fixture with both Observation models and preserves the local date for ${effectiveDateTime}`, async () => {
        const directory = path.join(__dirname, "..", "..", "..", "fml-executor", "src", "test", "fixtures");
        const mapText = readFileSync(path.join(directory, "BloodPressureVitalSignsMap.fml"), "utf8");
        const input = JSON.parse(readFileSync(path.join(directory, "BloodPressureVitalSignsMap.json"), "utf8"));
        input.effectiveDateTime = effectiveDateTime;
        const result = await new FmlLocalDebugService().execute({
            mapText,
            maps: [{fileName: "BloodPressureVitalSignsMap.fml", text: mapText}],
            inputText: JSON.stringify(input),
            modelText: readFileSync(path.join(directory, "omop-models.json"), "utf8"),
            defaultFhirVersion: "R5",
            localTrace: false,
        });
        assert.equal(result.traceStatus, "complete", JSON.stringify(result.outcome));
        assert.ok(result.rawResult);
        const output = JSON.parse(result.rawResult);
        assert.deepEqual(output, {measurement: [
            {
                measurement_id: "3",
                measurement_type_concept_id: "36203185",
                measurement_concept_id: "Blood pressure panel with all children optional",
                measurement_datetime: effectiveDateTime,
                measurement_date: "2026-11-02",
            },
            {
                measurement_datetime: effectiveDateTime,
                measurement_date: "2026-11-02",
                value_as_number: 120,
                unit_concept_id: "mmHg",
            },
            {
                measurement_datetime: effectiveDateTime,
                measurement_date: "2026-11-02",
                value_as_number: 80,
                value_source_value: "80",
                unit_concept_id: "mmHg",
                unit_source_value: "mmHg",
            },
        ]});
    });
}

const translateMap = `
uses 'http://hl7.org/fhir/StructureDefinition/Patient' alias P as source
uses 'http://hl7.org/fhir/StructureDefinition/Observation' alias T as target
group Main(source src : P, target tgt : T) {
 src.gender as v -> tgt.value = translate(v, 'http://example.test/GenderMap|2', 'CodeableConcept');
}`;

function genderMap(version: string, code: string) {
    return {resourceType: "ConceptMap", url: "http://example.test/GenderMap", version, group: [{
        source: "http://example.test/source", target: "http://example.test/target",
        element: [{code: "male", target: [{code, relationship: "equivalent"}]}],
    }]};
}

test("uses a configured terminology service by canonical only when no local ConceptMap exists", async () => {
    let requestBody = "";
    let requestPath = "";
    const server = createServer((request, response) => {
        requestPath = request.url ?? "";
        request.setEncoding("utf8");
        request.on("data", chunk => { requestBody += chunk; });
        request.on("end", () => {
            response.writeHead(200, {"Content-Type": "application/fhir+json"});
            response.end(JSON.stringify({resourceType: "Parameters", parameter: [
                {name: "result", valueBoolean: true},
                {name: "match", part: [
                    {name: "equivalence", valueCode: "equivalent"},
                    {name: "concept", valueCoding: {system: "http://example.test/target", code: "M"}},
                ]},
            ]}));
        });
    });
    await new Promise<void>(resolve => server.listen(0, "127.0.0.1", resolve));
    const address = server.address();
    assert.ok(address && typeof address === "object");
    try {
        const result = await new FmlLocalDebugService().execute({
            mapText: translateMap, inputText: '{"resourceType":"Patient","gender":"male"}',
            terminologyServerUrl: `http://127.0.0.1:${address.port}/fhir`, localTrace: false,
        });
        assert.deepEqual(result.result?.value, {resourceType: "Observation",
            valueCodeableConcept: {coding: [{code: "M", system: "http://example.test/target"}]}});
        assert.equal(requestPath, "/fhir/ConceptMap/$translate");
        assert.deepEqual(JSON.parse(requestBody).parameter, [
            {name: "url", valueUri: "http://example.test/GenderMap"},
            {name: "coding", valueCoding: {code: "male"}},
            {name: "conceptMapVersion", valueString: "2"},
        ]);
    } finally {
        await new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
    }
});

test("local ConceptMaps win over host/HTTP services, select exact versions and deduplicate explicit model copies", async () => {
    let hostCalls = 0;
    const selected = genderMap("2", "local");
    const result = await new FmlLocalDebugService({}, {translate: async () => { hostCalls++; return []; }}).execute({
        mapText: translateMap, inputText: '{"resourceType":"Patient","gender":"male"}',
        modelResources: [genderMap("1", "wrong"), selected],
        modelText: JSON.stringify({resourceType: "Bundle", type: "collection", entry: [{resource: selected}]}),
        terminologyServerUrl: "http://127.0.0.1:1/not-used", localTrace: false,
    });
    assert.equal(hostCalls, 0);
    assert.deepEqual(result.result?.value, {resourceType: "Observation",
        valueCodeableConcept: {coding: [{system: "http://example.test/target", code: "local"}]}});
});

test("keeps the existing missing-ConceptMap error when no terminology service is provided", async () => {
    const parameters = await new FmlLocalDebugService().executeParameters({
        mapText: translateMap, inputText: '{"resourceType":"Patient","gender":"male"}', localTrace: false,
    });
    assert.equal(parameters.parameter?.some(part => part.name === "return"), false);
    assert.match(JSON.stringify(parameters), /translate host service or ConceptMap.*required/);
});

test("does not use HTTP fallback to hide an ambiguous local ConceptMap", async () => {
    const parameters = await new FmlLocalDebugService().executeParameters({
        mapText: translateMap.replace("GenderMap|2", "GenderMap"), inputText: '{"resourceType":"Patient","gender":"male"}',
        modelResources: [genderMap("1", "A"), genderMap("2", "B")],
        terminologyServerUrl: "http://127.0.0.1:1/not-used", localTrace: false,
    });
    assert.equal(parameters.parameter?.some(part => part.name === "return"), false);
    assert.match(JSON.stringify(parameters), /Ambiguous ConceptMap/);
});

test("does not replace unsupported local mapping policies with a remote result", async () => {
    const resource = genderMap("2", "conditional");
    const conditional = { ...resource, group: [{...resource.group[0], element: [{
        code: "male", target: [{code: "conditional", relationship: "equivalent",
            dependsOn: [{attribute: "http://example.test/condition", valueCode: "required"}]}],
    }]}]};
    const parameters = await new FmlLocalDebugService().executeParameters({
        mapText: translateMap, inputText: '{"resourceType":"Patient","gender":"male"}',
        modelResources: [conditional], terminologyServerUrl: "http://127.0.0.1:1/not-used", localTrace: false,
    });
    assert.equal(parameters.parameter?.some(part => part.name === "return"), false);
    assert.match(JSON.stringify(parameters), /Conditional ConceptMap mappings require a terminology service/);
});

test("a custom injected translate host remains usable when no ConceptMap is supplied", async () => {
    let calls = 0;
    const result = await new FmlLocalDebugService({}, {translate: async (_source, canonical) => {
        calls++;
        assert.equal(canonical, "http://example.test/GenderMap|2");
        return [{name: "translated", typeName: "CodeableConcept", value: {coding: [{code: "host"}]}}];
    }}).execute({
        mapText: translateMap, inputText: '{"resourceType":"Patient","gender":"male"}',
        terminologyServerUrl: "http://127.0.0.1:1/not-used", localTrace: false,
    });
    assert.equal(calls, 1);
    assert.deepEqual(result.result?.value, {resourceType: "Observation", valueCodeableConcept: {coding: [{code: "host"}]}});
});

test("executes locally and adapts snapshots to the existing structured replay format", async () => {
    const result = await new FmlLocalDebugService().execute({
        mapText, inputText: '{"resourceType":"Patient","id":"local"}',
        maps: [{fileName: "main.fml", text: mapText}],
        serverUrl: "http://127.0.0.1:1/not-used",
    });
    assert.deepEqual(result.result?.value, {resourceType: "Patient", id: "local"});
    assert.match(result.evaluator ?? "", /JavaScript/);
    assert.equal(result.traceStatus, "complete");
    assert.ok(result.trace.length > 0);
    assert.ok(result.trace.some(event => event.phase === "step"));
    assert.equal(result.trace[0].source?.fileName, "main.fml");
    assert.deepEqual(result.trace[0].variables.find(variable => variable.name === "tgt")?.data?.value,
        {resourceType: "Patient"});
    const replay = new FmlTraceReplay(result, mapText);
    assert.ok(replay.stepIn());
    assert.equal(replay.stepBack(), result.trace[0]);
});

test("records implicitly created primitive aliases and their later populated values", async () => {
    const text = mapText.replace("src.id -> tgt.id;", "src.id.value as v -> tgt.id as p, p.value = v;");
    const result = await new FmlLocalDebugService().execute({
        mapText: text, inputText: '{"resourceType":"Patient","id":"local"}',
    });
    assert.deepEqual(result.result?.value, {resourceType: "Patient", id: "local"});
    assert.equal(result.traceStatus, "complete");
    assert.ok(result.trace.some(event => event.variables.some(variable => {
        const value = variable.data?.value;
        return variable.name === "p" && Array.isArray(value) && value.length === 0;
    })));
    assert.ok(result.trace.some(event => event.variables.some(variable => variable.name === "p" && variable.data?.value === "local")));
});

test("retains a failed invocation's prefix, diagnostics and no successful return", async () => {
    const failedMap = mapText.replace("src.id -> tgt.id;", "src.id check (false) -> tgt.id;");
    const result = await new FmlLocalDebugService().execute({
        mapText: failedMap, inputText: '{"resourceType":"Patient","id":"local"}',
    });
    assert.equal(result.result, undefined);
    assert.equal(result.traceStatus, "stopped");
    assert.ok(result.trace.length > 0);
    assert.match(result.trace.at(-1)?.exception ?? "", /check failed/);
    assert.equal(result.trace.filter(event => event.phase === "exit").length, 0);
});

test("keeps precision-sensitive output available as raw JSON", async () => {
    const result = await new FmlLocalDebugService().execute({
        mapText: `
uses 'http://hl7.org/fhir/StructureDefinition/Observation' alias O as source
uses 'http://hl7.org/fhir/StructureDefinition/Observation' alias T as target
group Main(source src : O, target tgt : T) { src.valueQuantity -> tgt.valueQuantity; }`,
        inputText: '{"resourceType":"Observation","valueQuantity":{"value":9007199254740993.0001}}',
    });
    assert.match(result.rawResult ?? "", /9007199254740993\.0001/);
});

test("executes imported maps and preserves their original source identity and log messages", async () => {
    const main = mapText.replace("group Main", "imports 'http://example.org/Shared'\ngroup Main")
        .replace("src.id -> tgt.id;", "src -> tgt then Shared(src,tgt);");
    const shared = `
map 'http://example.org/Shared' = Shared
uses 'http://hl7.org/fhir/StructureDefinition/Patient' alias P as source
uses 'http://hl7.org/fhir/StructureDefinition/Patient' alias T as target
group Shared(source src : P, target tgt : T) { src.id as v log (v) -> tgt.id = v "sharedRule"; }`;
    const result = await new FmlLocalDebugService().execute({
        mapText: main, inputText: '{"resourceType":"Patient","id":"imported"}',
        maps: [{fileName: "main.fml", text: main}, {fileName: "shared.fml", text: shared}],
    });
    assert.deepEqual(result.result?.value, {resourceType: "Patient", id: "imported"});
    assert.ok(result.trace.some(event => event.source?.fileName === "shared.fml"));
    assert.ok(result.trace.some(event => event.messages?.some(message => message.text.includes("imported"))));
});

test("retains advisory imported diagnostics while executing the FML extension value shortcut", async () => {
    const main = mapText.replace("group Main", "imports 'http://example.org/Shared'\ngroup Main")
        .replace("src.id -> tgt.id;", "src -> tgt.id = evaluate(src, extension('http://example.org/id').toString());");
    const shared = "map 'http://example.org/Shared' = Shared\n" + mapText
        .replace("group Main", "group Unused").replace("src.id -> tgt.id;", "src.active -> tgt.gender;");
    const result = await new FmlLocalDebugService().execute({
        mapText: main, inputText: JSON.stringify({resourceType: "Patient",
            extension: [{url: "http://example.org/id", valueString: "warned"}]}),
        maps: [{fileName: "main.fml", text: main}, {fileName: "shared.fml", text: shared}],
    });
    assert.deepEqual(result.result?.value, {resourceType: "Patient", id: "warned"}, JSON.stringify(result.outcome));
    assert.equal(result.traceStatus, "complete");
    const issues = parseOperationOutcomeIssues(result.outcome);
    assert.ok(issues.some(issue => issue.severity === "warning" && issue.fileName === "shared.fml"
        && /not compatible/.test(issue.message)));
    assert.ok(!issues.some(issue => issue.severity === "error" || issue.severity === "fatal"));
});

test("uses supplied external ConceptMap resources without requiring a remote terminology call", async () => {
    const mapText = `
uses 'http://hl7.org/fhir/StructureDefinition/Patient' alias P as source
uses 'http://hl7.org/fhir/StructureDefinition/Observation' alias T as target
group Main(source src : P, target tgt : T) {
 src.gender as v -> tgt.value = translate(v, 'http://example.org/Map', 'CodeableConcept');
}`;
    const resource = {resourceType: "ConceptMap", url: "http://example.org/Map", group: [{
        source: "http://example.org/source", target: "http://example.org/target",
        element: [{code: "male", target: [{code: "M", relationship: "equivalent"}]}],
    }]};
    const result = await new FmlLocalDebugService().execute({
        mapText, inputText: '{"resourceType":"Patient","gender":"male"}', modelResources: [resource],
    });
    assert.deepEqual(result.result?.value, {resourceType: "Observation", valueCodeableConcept: {coding: [{
        system: "http://example.org/target", code: "M",
    }]}});
});

test("reports unavailable semantics in OperationOutcome instead of empty success", async () => {
    const parameters = await new FmlLocalDebugService().executeParameters({
        mapText: mapText.replace("group Main", "imports 'http://example.org/other'\ngroup Main"),
        inputText: '{"resourceType":"Patient"}',
    });
    assert.ok(!parameters.parameter?.some(parameter => parameter.name === "return"));
    assert.ok(parameters.parameter?.some(parameter => parameter.name === "outcome"));
    assert.equal(parameters.parameter?.find(parameter => parameter.name === "traceStatus")?.valueCode, "stopped");
});

for (const [field, text, message] of [
    ["inputText", "{", /input JSON/],
    ["modelText", "{", /model JSON/],
    ["entryGroup", "Missing", /Entry group/],
    ["inputText", "<Patient/>", /requires JSON/],
    ["modelText", "3", /model content/],
    ["modelText", '{"resourceType":"Bundle","entry":{}}', /Bundle.entry/],
    ["modelText", '{"resourceType":"StructureDefinition"}', /require url and type/],
] as const) {
    test(`reports ${field} setup errors with an explicit OperationOutcome`, async () => {
        await assert.rejects(new FmlLocalDebugService().executeParameters({
            mapText, inputText: '{"resourceType":"Patient","id":"local"}', [field]: text,
        }), error => {
            assert.ok(error instanceof FmlDebugEngineError);
            assert.match(error.message, message);
            assert.equal(parseOperationOutcomeIssues(error.outcome)[0].severity, "error");
            return true;
        });
    });
}

test("returns located errors and a stopped envelope when bindings fail before the first trace", async () => {
    const result = await new FmlLocalDebugService().execute({
        mapText, inputText: '{"resourceType":"Observation","id":"wrong"}',
        maps: [{fileName: "typed.fml", text: mapText}],
    });
    assert.equal(result.result, undefined);
    assert.equal(result.traceStatus, "stopped");
    assert.equal(result.trace.length, 0);
    const issue = parseOperationOutcomeIssues(result.outcome)[0];
    assert.equal(issue.severity, "error");
    assert.equal(issue.fileName, "typed.fml");
    assert.ok(issue.line && issue.column);
});

test("does not turn pre-cancelled local requests into successful empty recordings", async () => {
    const controller = new AbortController();
    controller.abort(new Error("cancel setup"));
    await assert.rejects(new FmlLocalDebugService().executeParameters({
        mapText, inputText: '{"resourceType":"Patient"}', signal: controller.signal,
    }), /cancel setup/);
});

test("local wire recording supports disabled capture and rules-only capture without changing output", async () => {
    const service = new FmlLocalDebugService();
    const request = {mapText, inputText: '{"resourceType":"Patient","id":"capture"}'};
    const full = await service.execute(request);
    const rules = await service.execute({...request, localTrace: {detail: "rules"}});
    const off = await service.execute({...request, localTrace: false});
    assert.deepEqual(full.result, rules.result);
    assert.deepEqual(full.result, off.result);
    assert.ok(full.trace.length > rules.trace.length);
    assert.equal(rules.traceStatus, "complete");
    assert.equal(off.trace.length, 0);
    assert.ok(full.trace.some(event => event.traceLocation === "StructureMap.group[0].rule[0].target[0]"));
});

test("compacted local wire events replay final snapshots without empty rule frames", async () => {
    const service = new FmlLocalDebugService();
    const request = {mapText, inputText: '{"resourceType":"Patient","id":"compacted"}'};
    const full = await service.execute(request);
    const rules = await service.execute({...request, localTrace: {detail: "rules"}});
    assert.deepEqual(rules.trace.map(event => [event.phase, event.depth]), [["enter", 0], ["step", 1], ["exit", 0]]);
    assert.equal(rules.trace[1].traceLocation, "StructureMap.group[0].rule[0]");
    assert.deepEqual(rules.trace[1].variables.find(variable => variable.name === "tgt")?.data?.value,
        {resourceType: "Patient", id: "compacted"});
    assert.deepEqual(full.trace.filter(event => /(?:source|target)\[/.test(event.traceLocation ?? ""))
        .map(event => event.phase), ["step", "step"]);
    const replay = new FmlTraceReplay(rules, mapText);
    assert.equal(replay.stepIn(), rules.trace[1]);
    assert.deepEqual(replay.getStackEvents(), [rules.trace[1], rules.trace[0]]);
    assert.equal(replay.next(), rules.trace[2]);
    assert.equal(replay.stepBack(), rules.trace[1]);
});

test("local wire output preserves source filtering stages and open scopes on a failed check", async () => {
    const text = mapText.replace("src.id -> tgt.id;",
        "src.name : HumanName as n where (family = 'keep') check (false) -> tgt.name = n;");
    const result = await new FmlLocalDebugService().execute({
        mapText: text, inputText: '{"resourceType":"Patient","name":[{"family":"skip"},{"family":"keep"}]}',
    });
    assert.equal(result.traceStatus, "stopped");
    assert.equal(result.result, undefined);
    const sourceEvents = result.trace.filter(event => event.traceLocation === "StructureMap.group[0].rule[0].source[0]");
    assert.deepEqual(sourceEvents.map(event => event.phase), ["enter", "step", "step", "step", "step"]);
    assert.deepEqual(sourceEvents.flatMap(event => event.messages?.map(message => message.name) ?? []),
        ["type", "where", "where", "check"]);
    assert.match(sourceEvents.at(-1)?.exception ?? "", /check failed/);
    assert.deepEqual(sourceEvents.at(-1)?.variables.find(variable => variable.name === "n")?.data?.value, {family: "keep"});
    const replay = new FmlTraceReplay(result, text);
    replay.continue();
    assert.equal(replay.currentEvent, sourceEvents.at(-1));
    assert.equal(replay.getStackEvents().filter(event => event.phase === "enter").length, 2);
});

test("an empty called group retains both wire boundaries after compaction", async () => {
    const text = mapText.replace("src.id -> tgt.id;", "src -> tgt then Empty(src, tgt);")
        + "\ngroup Empty(source src : P, target tgt : T) { }";
    const result = await new FmlLocalDebugService().execute({
        mapText: text, inputText: '{"resourceType":"Patient","id":"empty-group"}',
    });
    assert.equal(result.traceStatus, "complete");
    assert.deepEqual(result.trace.filter(event => event.traceLocation === "StructureMap.group[1]")
        .map(event => event.phase), ["enter", "exit"]);
});

test("truncated local recordings preserve evaluation errors, outcome diagnostics and open replay stacks", async () => {
    const failing = mapText.replace("src.id -> tgt.id;", "src.id -> tgt.id; src.gender check (false) -> tgt.gender;");
    const service = new FmlLocalDebugService();
    const request = {mapText: failing, inputText: '{"resourceType":"Patient","id":"kept","gender":"male"}',
        localTrace: {maxEvents: 2}};
    const result = await service.execute(request);
    assert.equal(result.result, undefined);
    assert.equal(result.traceStatus, "truncated");
    assert.ok(parseOperationOutcomeIssues(result.outcome).some(issue => /check failed/.test(issue.message)));
    assert.ok(parseOperationOutcomeIssues(result.outcome).some(issue => issue.severity === "warning" && /event limit/.test(issue.message)));
    const replay = new FmlTraceReplay(result, failing);
    replay.continue();
    assert.equal(replay.currentIndex, result.trace.length - 1);
    assert.ok(replay.getStackEvents().length > 0);
    assert.match(replay.currentEvent?.exception ?? "", /check failed/);
    assert.ok(replay.stepBack());
});

test("wire empty/ordered collections and primitive companions retain their snapshot representation", async () => {
    const service = new FmlLocalDebugService();
    const text = mapText.replace("src.id -> tgt.id;",
        "src -> (%src.name.given) as ordered, (%src.identifier.value) as empty; src.birthDate as date -> tgt.birthDate = (date);");
    const result = await service.executeParameters({mapText: text,
        inputText: '{"resourceType":"Patient","name":[{"given":["A","B"]}],"_birthDate":{"id":"metadata"}}'});
    const events = result.parameter?.filter(parameter => parameter.name === "trace") ?? [];
    const variables = events.flatMap(event => event.part?.filter(part => part.name === "variable") ?? []);
    const named = (name: string) => variables.filter(variable =>
        variable.part?.some(part => part.name === "name" && part.valueString === name));
    const ordered = named("ordered").map(variable => variable.part?.find(part => part.name === "jsonValue")?.valueString);
    assert.ok(ordered.includes('"A"') && ordered.includes('"B"'));
    assert.ok(named("empty").every(variable => !variable.part?.some(part => ["jsonValue", "value", "resource", "path"].includes(part.name ?? ""))));
    assert.ok(named("date").some(variable => variable.part?.find(part => part.name === "jsonValue")?.valueString === '{"_value":{"id":"metadata"}}'));
});
