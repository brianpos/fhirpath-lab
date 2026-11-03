import assert from "node:assert/strict";
import {randomUUID} from "node:crypto";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import {pathToFileURL} from "node:url";
import {FmlLanguageService, EvaluateDocumentRequest, EvaluationModelContext, EvaluationJsonValue} from "@fhirpath-lab/language-service";
import {buildLogicalTypeModels} from "@fhirpath-lab/validator";
import {FmlEvaluationService} from "../FmlEvaluationService";
import {WorkspaceFmlIndex} from "../WorkspaceFmlIndex";

const directory = path.join(os.tmpdir(), `fml-cache-not-written-${randomUUID()}`);
const uri = (name: string) => pathToFileURL(path.join(directory, name)).href;
const patientMap = `
uses 'http://hl7.org/fhir/StructureDefinition/Patient' alias S as source
uses 'http://hl7.org/fhir/StructureDefinition/Patient' alias T as target
group Main(source src : S, target tgt : T) { src.id -> tgt.id; }
`;
const translateMap = patientMap
    .replace("Patient' alias T", "Observation' alias T")
    .replace("src.id -> tgt.id;", "src.gender as v -> tgt.value = translate(v, 'http://example.test/GenderMap|2', 'CodeableConcept');");

function conceptMap(code: string, version = "2") {
    return {resourceType: "ConceptMap", url: "http://example.test/GenderMap", version,
        group: [{source: "http://example.test/source", target: "http://example.test/target",
            element: [{code: "male", target: [{code, relationship: "equivalent"}]}]}]};
}

function logicalDefinition(type = "string"): EvaluationJsonValue {
    return {resourceType: "StructureDefinition", url: "http://example.test/Row", name: "Row",
        type: "http://example.test/Row", kind: "logical", derivation: "specialization",
        differential: {element: [{id: "Row", path: "Row"},
            {id: "Row.code", path: "Row.code", max: "1", type: [{code: type}]}]}};
}

const logicalMap = translateMap.replace("http://hl7.org/fhir/StructureDefinition/Patient", "http://example.test/Row")
    .replace("src.gender as v -> tgt.value = translate(v, 'http://example.test/GenderMap|2', 'CodeableConcept');",
        "src.code -> tgt.value;");

function fixture(text = patientMap, name = "main.fml") {
    const index = new WorkspaceFmlIndex();
    const language = new FmlLanguageService();
    const request: EvaluateDocumentRequest = {
        uri: uri(name), input: {uri: uri("input.json"), version: 7},
        inputText: '{"resourceType":"Patient","id":"cached","gender":"male"}',
    };
    const set = (sourceUri: string, text: string, version?: number) =>
        index.set(sourceUri, language.getDocumentSymbols({uri: sourceUri, text}), {text, version});
    set(request.uri, text, 3);
    return {index, request, set, service: new FmlEvaluationService(index)};
}

test("evaluates HL7 v2 content through the local language tool without a supplied model", async () => {
    const {service, request} = fixture(`
uses "http://hl7.org/fhirpath/v2/StructureDefinition/Message" alias V2 as source
uses "http://hl7.org/fhir/StructureDefinition/Patient" as target
group Main(source src : V2, target tgt : Patient) {
  src.segment as pid where (code = 'PID') -> tgt then {
    pid -> tgt.id = (%pid.field.skip(2).first().element.first().component.first().text) "id";
  } "pid";
}`);
    const result = await service.evaluate({...request,
        inputText: "MSH|^~\\&|Lab|Hospital|||||ADT^A01|1|P|2.7\rPID|1||12345678^^^MR^MR||Chalmers^Peter\r"});
    assert.equal(result.status, "success", JSON.stringify(result));
    assert.deepEqual(JSON.parse(result.resultJson!), {resourceType: "Patient", id: "12345678"});
});

test("evaluates entirely cached sources at nonexistent paths and observes reindexed unsaved imports", async () => {
    const {service, request, set} = fixture(patientMap
        .replace("group Main", "imports 'http://example.test/Shared'\ngroup Main")
        .replace("src.id -> tgt.id;", "src -> tgt then Shared(src, tgt);"));
    const shared = "/// url = 'http://example.test/Shared'\n" + patientMap.replace("Main(", "Shared(");
    set(uri("shared.fml"), shared);
    const first = await service.evaluate(request);
    assert.equal(first.status, "success", JSON.stringify(first));
    assert.equal(JSON.parse(first.resultJson!).id, "cached");
    assert.deepEqual(first.maps, [{uri: request.uri, version: 3}, {uri: uri("shared.fml"), version: undefined}]);
    assert.deepEqual(first.input, request.input);
    set(uri("shared.fml"), shared.replace("src.id -> tgt.id;", "src.id -> tgt.id = 'unsaved';"), 9);
    const second = await service.evaluate(request);
    assert.equal(second.status, "success", JSON.stringify(second));
    assert.equal(JSON.parse(second.resultJson!).id, "unsaved");
    assert.equal(second.maps?.[1].version, 9);
    assert.equal("trace" in second, false);
    assert.equal("inputText" in second, false);
});

test("uses cached ConceptMaps with exact versions and per-invocation dirty overrides without mutating the cache", async () => {
    const {service, request} = fixture(translateMap);
    const filePath = path.join(directory, "conceptmaps.json");
    service.configure({uris: [], modelFiles: [{filePath, resources: [conceptMap("wrong", "1"), conceptMap("cached")]}]});
    request.terminologyServerUrl = "http://127.0.0.1:1/not-used";
    const first = await service.evaluate(request);
    assert.equal(first.status, "success", JSON.stringify(first));
    assert.equal(JSON.parse(first.resultJson!).valueCodeableConcept.coding[0].code, "cached");
    const second = await service.evaluate({...request, modelOverrides: [{
        filePath, text: JSON.stringify({resourceType: "Bundle", entry: [{resource: conceptMap("dirty")}]}),
    }]});
    assert.equal(second.status, "success", JSON.stringify(second));
    assert.equal(JSON.parse(second.resultJson!).valueCodeableConcept.coding[0].code, "dirty");
    const third = await service.evaluate(request);
    assert.equal(JSON.parse(third.resultJson!).valueCodeableConcept.coding[0].code, "cached");
});

test("selects the nearest model root and falls back to the existing global catalog outside it", async () => {
    const {service, request, set} = fixture(translateMap, path.join("root", "nested", "main.fml"));
    const global = {filePath: path.join(directory, "global.json"), resources: [conceptMap("global")]};
    const outer = {filePath: path.join(directory, "outer.json"), resources: [conceptMap("outer")]};
    const inner = {filePath: path.join(directory, "inner.json"), resources: [conceptMap("inner")]};
    const context = (root: string, filePath: string): EvaluationModelContext => ({
        rootUri: uri(root), modelResourcePaths: [filePath], profileBaseTypes: {}, customTypeModels: {},
    });
    service.configure({uris: [], modelFiles: [global, outer, inner],
        evaluationContexts: [context("root", outer.filePath), context(path.join("root", "nested"), inner.filePath)]});
    for (const [name, code] of [
        [path.join("root", "nested", "main.fml"), "inner"], [path.join("root", "main.fml"), "outer"],
        [path.join("unrelated", "main.fml"), "global"],
    ]) {
        set(uri(name), translateMap);
        const result = await service.evaluate({...request, uri: uri(name)});
        assert.equal(result.status, "success", JSON.stringify(result));
        assert.equal(JSON.parse(result.resultJson!).valueCodeableConcept.coding[0].code, code);
    }
});

test("uses catalog path priority for unversioned canonicals and ignores unused unsupported maps", async () => {
    const {service, request} = fixture(translateMap.replace("GenderMap|2", "GenderMap"));
    const first = {filePath: path.join(directory, "first.json"), resources: [conceptMap("first", "1")]};
    const second = {filePath: path.join(directory, "second.json"), resources: [
        conceptMap("second"), {resourceType: "ConceptMap", url: "http://example.test/unused", group: "invalid"},
    ]};
    service.configure({uris: [], modelFiles: [second, first], evaluationContexts: [{
        rootUri: uri(""), modelResourcePaths: [first.filePath, second.filePath], profileBaseTypes: {}, customTypeModels: {},
    }]});
    const result = await service.evaluate(request);
    assert.equal(result.status, "success", JSON.stringify(result));
    assert.equal(JSON.parse(result.resultJson!).valueCodeableConcept.coding[0].code, "first");
});

test("explicit model content takes precedence over the discovered ConceptMap catalog", async () => {
    const {service, request} = fixture(translateMap);
    service.configure({uris: [], modelFiles: [{filePath: path.join(directory, "cm.json"), resources: [conceptMap("cached")]}]});
    const result = await service.evaluate({...request,
        modelText: JSON.stringify(conceptMap("explicit")), model: {uri: uri("explicit.json"), version: 4}});
    assert.equal(result.status, "success", JSON.stringify(result));
    assert.equal(JSON.parse(result.resultJson!).valueCodeableConcept.coding[0].code, "explicit");
    assert.deepEqual(result.model, {uri: uri("explicit.json"), version: 4});
});

test("reuses preprocessed logical types without needing raw model files", async () => {
    const {service, request} = fixture(logicalMap);
    service.configure({uris: [], defaultFhirVersion: "R4",
        profileBaseTypes: {"http://example.test/Row": "http://example.test/Row"},
        customTypeModels: buildLogicalTypeModels([logicalDefinition()], "R4")});
    const result = await service.evaluate({...request, inputText: '{"code":"preprocessed"}'});
    assert.equal(result.status, "success", JSON.stringify(result));
    assert.equal(JSON.parse(result.resultJson!).valueString, "preprocessed");
});

test("rebuilds changed logical definitions for dirty or explicit models without altering cached types", async () => {
    const {service, request} = fixture(logicalMap);
    const filePath = path.join(directory, "row.json");
    const original = logicalDefinition();
    service.configure({uris: [], defaultFhirVersion: "R4",
        profileBaseTypes: {"http://example.test/Row": "http://example.test/Row"},
        customTypeModels: buildLogicalTypeModels([original], "R4"), modelFiles: [{filePath, resources: [original]}]});
    const boolDefinition = JSON.stringify(logicalDefinition("boolean"));
    for (const change of [{modelOverrides: [{filePath, text: boolDefinition}]}, {modelText: boolDefinition}]) {
        const result = await service.evaluate({...request, inputText: '{"code":true}', ...change});
        assert.equal(result.status, "success", JSON.stringify(result));
        assert.equal(JSON.parse(result.resultJson!).valueBoolean, true);
    }
    const unchanged = await service.evaluate({...request, inputText: '{"code":"cached-string"}'});
    assert.equal(unchanged.status, "success", JSON.stringify(unchanged));
    assert.equal(JSON.parse(unchanged.resultJson!).valueString, "cached-string");
});

test("rejects overrides outside the indexed catalog instead of reading arbitrary files", async () => {
    const {service, request} = fixture();
    await assert.rejects(service.evaluate({...request, modelOverrides: [{
        filePath: path.join(directory, "unknown.json"), text: "{}",
    }]}), /not part of the indexed model catalog/);
});

test("requires cached sources and explicitly reports incomplete model catalogs", async () => {
    const {service, request, index} = fixture();
    index.clear();
    await assert.rejects(service.evaluate(request), /source content is not cached/);
    assert.throws(() => service.configure({uris: [], evaluationContexts: [{
        rootUri: uri(""), modelResourcePaths: [path.join(directory, "missing.json")],
        profileBaseTypes: {}, customTypeModels: {},
    }]}), /Model content is not cached/);
});

test("does not return partial targets when execution fails", async () => {
    const {service, request} = fixture(patientMap.replace("src.id -> tgt.id;",
        "src.id -> tgt.id; src.gender check (false) -> tgt.gender;"));
    const result = await service.evaluate(request);
    assert.equal(result.status, "failed");
    assert.equal("resultJson" in result, false);
    assert.match(JSON.stringify(result.outcome), /check/i);
});

test("propagates cancellation before execution without returning a successful result", async () => {
    const {service, request} = fixture();
    const controller = new AbortController();
    const reason = new Error("cancel cached evaluation");
    controller.abort(reason);
    await assert.rejects(service.evaluate(request, controller.signal), error => error === reason);
});
