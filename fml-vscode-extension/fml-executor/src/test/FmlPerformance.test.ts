import assert from "node:assert/strict";
import test from "node:test";
import fhirpath from "fhirpath";
import {CoreFmlParser, getModelTypes} from "@fhirpath-lab/validator";
import {createSingleInputRequest, FmlExecutor, FmlTraceRecorder} from "../index";
import {BoundProgram} from "../runtime";

const declarations = `
uses 'http://hl7.org/fhir/StructureDefinition/Patient' alias P as source
uses 'http://hl7.org/fhir/StructureDefinition/Patient' alias T as target
`;

test("warm execution reuses FML analysis, linked groups and prepared expression/wrapper functions", async t => {
    const engine = new FmlExecutor();
    const prepared = await engine.prepare({sourceText: `${declarations}
group Main(source src : P, target tgt : T) { src.name as n -> tgt.name as t then Name(n,t); }
group Name(source src : HumanName, target tgt : HumanName) {
 src.family as f -> tgt.text = (f & '!');
 src.given -> tgt.given;
}`});
    assert.equal(prepared.status, "success", JSON.stringify(prepared.diagnostics));
    if (prepared.status !== "success") return;
    const input = {resourceType: "Patient", name: [{family: "Family", given: ["A", "B"]}]};
    assert.equal((await engine.execute(createSingleInputRequest(prepared.value, input))).status, "success");
    const parse = t.mock.method(fhirpath, "parse", () => { throw new Error("FHIRPath reparsed during warm execution."); });
    const compile = t.mock.method(fhirpath, "compile", () => { throw new Error("FHIRPath recompiled during warm execution."); });
    const analyze = t.mock.method(CoreFmlParser.prototype, "analyze", () => { throw new Error("FML reanalyzed during warm execution."); });
    const group = t.mock.method(BoundProgram.prototype, "group", () => { throw new Error("Static group resolved during warm execution."); });
    for (let index = 0; index < 10; index++) {
        const request = createSingleInputRequest(prepared.value, input);
        const result = await engine.execute(request, index % 2 ? {trace: new FmlTraceRecorder()} : {});
        assert.equal(result.status, "success", JSON.stringify(result.diagnostics));
        assert.deepEqual(request.targets[0].value, {resourceType: "Patient", name: [{text: "Family!", given: ["A", "B"]}]});
    }
    for (const method of [parse, compile, analyze, group]) assert.equal(method.mock.callCount(), 0);
});

test("ordinary target appends do not scan earlier slot identities", async () => {
    const engine = new FmlExecutor();
    const prepared = await engine.prepare({sourceText: `${declarations}
group Main(source src : P, target tgt : T) { src.name -> tgt.name; }`});
    assert.equal(prepared.status, "success", JSON.stringify(prepared.diagnostics));
    if (prepared.status !== "success") return;
    const input = {resourceType: "Patient", name: Array.from({length: 2000}, (_value, index) => ({family: `N${index}`}))};
    const descriptor = Object.getOwnPropertyDescriptor(Set.prototype, Symbol.iterator);
    assert.ok(descriptor);
    try {
        Object.defineProperty(Set.prototype, Symbol.iterator, {...descriptor, value: function*(this: Set<unknown>) {
            for (const value of this.values()) {
                assert.ok(!value || typeof value !== "object" || !Object.hasOwn(value, "index"),
                    "Normal append must not enumerate the growing array's slot set.");
                yield value;
            }
        }});
        const request = createSingleInputRequest(prepared.value, input);
        const result = await engine.execute(request);
        assert.equal(result.status, "success", JSON.stringify(result.diagnostics));
        assert.deepEqual(request.targets[0].value, input);
    } finally {
        Object.defineProperty(Set.prototype, Symbol.iterator, descriptor);
    }
});

test("an expression converts only referenced variables and its explicit focus, not every visible root", async () => {
    const engine = new FmlExecutor();
    const prepared = await engine.prepare({sourceText: `${declarations}
group Main(source src : P, target tgt : T) {
 src.name as n -> tgt.name as t then { n -> t.text = evaluate(n, family & '!'); };
}`});
    assert.equal(prepared.status, "success", JSON.stringify(prepared.diagnostics));
    if (prepared.status !== "success") return;
    let unrelatedReads = 0;
    const names = Array.from({length: 100}, (_value, index) => ({family: `F${index}`}));
    const input = {resourceType: "Patient", name: names, get active() { unrelatedReads++; return true; }};
    const request = createSingleInputRequest(prepared.value, input);
    const result = await engine.execute(request);
    assert.equal(result.status, "success", JSON.stringify(result.diagnostics));
    assert.equal(unrelatedReads, 1, "The ownership check visits input once; per-name expressions must not recopy the root.");
    assert.deepEqual(request.targets[0].value, {resourceType: "Patient", name: names.map(name => ({text: `${name.family}!`}))});
});

test("warm choice reads reuse model selection and parsed paths without caching live values", async t => {
    const prepared = await new FmlExecutor().prepare({sourceText: `
uses 'http://hl7.org/fhir/StructureDefinition/Extension' alias S as source
uses 'http://hl7.org/fhir/StructureDefinition/Extension' alias T as target
group Main(source src : S, target tgt : T) { }`});
    assert.equal(prepared.status, "success", JSON.stringify(prepared.diagnostics));
    if (prepared.status !== "success") return;
    const bound = new BoundProgram(prepared.value, {});
    const value = {valueString: "first", _valueString: {id: "first-metadata"}};
    const source = {value, typeName: "Extension", version: "R4" as const, writable: false};
    assert.equal(bound.read(source, "value")[0].value, "first");
    const parts = bound.pathParts("src.`a.b`");
    assert.deepEqual(parts, ["src", "a.b"]);
    assert.equal(bound.pathParts("src.`a.b`"), parts);
    assert.ok(Object.isFrozen(parts));
    const lookup = t.mock.method(bound, "lookup", () => { throw new Error("Warm choice selection re-read the model."); });
    for (let index = 0; index < 10; index++) {
        value.valueString = `value-${index}`;
        value._valueString = {id: `metadata-${index}`};
        const nodes = bound.read({...source, writable: index % 2 === 0}, "value");
        assert.equal(nodes.length, 1);
        assert.equal(nodes[0].value, `value-${index}`);
        assert.deepEqual(nodes[0].metadata, {id: `metadata-${index}`});
    }
    assert.equal(lookup.mock.callCount(), 0);
});

test("indexed choice reads preserve model order, non-enumerable fields and metadata-only values", async () => {
    const prepared = await new FmlExecutor().prepare({sourceText: `
uses 'http://hl7.org/fhir/StructureDefinition/Extension' alias S as source
uses 'http://hl7.org/fhir/StructureDefinition/Extension' alias T as target
group Main(source src : S, target tgt : T) { }`});
    assert.equal(prepared.status, "success", JSON.stringify(prepared.diagnostics));
    if (prepared.status !== "success") return;
    const bound = new BoundProgram(prepared.value, {});
    const value = Object.defineProperty({valueString: "text", _valueCode: {id: "metadata-only"}},
        "valueCode", {value: undefined, configurable: true});
    const node = {value, typeName: "Extension", version: "R4" as const, writable: true};
    const first = bound.read(node, "value");
    assert.deepEqual(first.map(child => child.typeName), ["code", "string"]);
    assert.deepEqual(first.map(child => child.value), [undefined, "text"]);
    assert.deepEqual(first[0].metadata, {id: "metadata-only"});
    Object.defineProperty(value, "valueCode", {value: "code", configurable: true});
    const next = bound.read(node, "value");
    assert.deepEqual(next.map(child => child.value), ["code", "text"]);
    assert.equal(next.length, 2, "A value and its companion must select one field, not two.");
});

test("choice indexing retains repeated type alternatives from supplied model definitions", async () => {
    const prepared = await new FmlExecutor().prepare({
        sourceText: "group Main(source src : Row, target tgt : Row) { }",
        customTypeModels: {Row: {TypeName: "Row", Elements: [
            {ElementName: "value[x]", Type: [{TypeName: "string"}, {TypeName: "string"}]},
        ]}},
    });
    assert.equal(prepared.status, "success", JSON.stringify(prepared.diagnostics));
    if (prepared.status !== "success") return;
    const bound = new BoundProgram(prepared.value, {});
    const nodes = bound.read({value: {valueString: "text"}, typeName: "Row", version: "R4", writable: false}, "value");
    assert.deepEqual(nodes.map(node => node.value), ["text", "text"]);
});

test("indexed readers match the original selection across all generated R4 and STU3 choices", async () => {
    const prepared = await new FmlExecutor().prepare({sourceText: `${declarations}
group Main(source src : P, target tgt : T) { }`});
    assert.equal(prepared.status, "success", JSON.stringify(prepared.diagnostics));
    if (prepared.status !== "success") return;
    const bound = new BoundProgram(prepared.value, {});
    for (const [provider, version] of [["r4", "R4"], ["stu3", "STU3"]] as const) {
        for (const model of getModelTypes(provider)) for (const choice of model.Elements) {
            if (!choice.ElementName.endsWith("[x]")) continue;
            const part = choice.ElementName.slice(0, -3);
            const names = choice.Type.map(type => part + type.TypeName[0].toUpperCase() + type.TypeName.slice(1));
            const value: Record<string, unknown> = {};
            for (const [index, name] of [...names].reverse().entries()) {
                if (index % 2) Object.defineProperty(value, name, {
                    value: choice.IsArray ? ["value"] : "value", configurable: true, enumerable: index % 3 === 0,
                });
                value[`_${name}`] = choice.IsArray ? [{id: name}] : {id: name};
            }
            const expected = names.filter(name => Object.hasOwn(value, name) || Object.hasOwn(value, `_${name}`))
                .map(name => ({
                    typeName: bound.property({value, typeName: model.TypeName, version, writable: false}, name).typeName,
                    value: Object.hasOwn(value, name) ? "value" : undefined, metadata: {id: name},
                }));
            const nodes = bound.read({value, typeName: model.TypeName, version, writable: false}, part);
            assert.deepEqual(nodes.map(node => ({typeName: node.typeName, value: node.value, metadata: node.metadata})),
                expected, `${version} ${model.TypeName}.${part}`);
        }
    }
});

test("concurrent async invocations of one program isolate frames, services, traces and outputs", async () => {
    const engine = new FmlExecutor();
    const prepared = await engine.prepare({sourceText: `${declarations}
group Main(source src : P, target tgt : T) {
 src.id -> tgt.id;
 src.gender as v -> tgt.gender = translate(v, 'http://example.org/map', 'code');
}`});
    assert.equal(prepared.status, "success", JSON.stringify(prepared.diagnostics));
    if (prepared.status !== "success") return;
    const outputs = await Promise.all(Array.from({length: 10}, async (_value, index) => {
        const request = createSingleInputRequest(prepared.value, {resourceType: "Patient", id: `id${index}`, gender: "male"});
        const trace = new FmlTraceRecorder();
        const result = await engine.execute(request, {
            trace, translate: async () => {
                await new Promise<void>(resolve => setImmediate(resolve));
                return [{name: "translated", value: index % 2 ? "female" : "male", typeName: "code"}];
            },
        });
        assert.equal(result.status, "success", JSON.stringify(result.diagnostics));
        assert.equal(trace.status, "complete");
        assert.deepEqual(request.targets[0].value, {resourceType: "Patient", id: `id${index}`, gender: index % 2 ? "female" : "male"});
        return request.targets[0].value;
    }));
    assert.equal(new Set(outputs).size, 10);
});
