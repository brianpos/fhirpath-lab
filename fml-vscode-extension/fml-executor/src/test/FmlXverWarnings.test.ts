import assert from "node:assert/strict";
import test from "node:test";
import {
    analyzeLabFml, createSingleInputRequest, FmlExecutor, FmlTraceRecorder, type FmlBinding, type FmlSource,
} from "../index";

const declarations = `
uses 'http://hl7.org/fhir/StructureDefinition/Patient' alias P as source
uses 'http://hl7.org/fhir/StructureDefinition/Patient' alias T as target
`;

test("FML extension(url) selects value[x], preserves collection order and does not return containers", async () => {
    const engine = new FmlExecutor();
    const prepared = await engine.prepare({sourceText: `${declarations}
group Main(source src : P, target tgt : T) {
 src -> tgt.name as n, n.text = evaluate(src, extension('http://example.org/x').join('|'));
}`});
    assert.equal(prepared.status, "success", JSON.stringify(prepared.diagnostics));
    if (prepared.status !== "success") return;
    const input = {resourceType: "Patient", extension: [
        {url: "http://example.org/x", valueString: "first"},
        {url: "http://example.org/other", valueString: "ignored"},
        {url: "http://example.org/x", valueString: "second"},
    ]};
    const request = createSingleInputRequest(prepared.value, input);
    const result = await engine.execute(request);
    assert.equal(result.status, "success", JSON.stringify(result.diagnostics));
    assert.deepEqual(request.targets[0].value, {resourceType: "Patient", name: [{text: "first|second"}]});
    assert.equal(input.extension[0].valueString, "first");
});

test("FML extension shortcut is equivalent to explicit navigation for complex and primitive values", async () => {
    const engine = new FmlExecutor();
    const prepared = await engine.prepare({sourceText: `${declarations}
group Main(source src : P, target tgt : T) {
 src -> evaluate(src, extension('http://example.org/primitive')) as primitive,
        evaluate(src, extension.where(url = 'http://example.org/primitive').value) as explicitPrimitive,
        evaluate(src, extension('http://example.org/complex')) as complex,
        evaluate(src, extension.where(url = 'http://example.org/complex').value) as explicitComplex;
}`});
    assert.equal(prepared.status, "success", JSON.stringify(prepared.diagnostics));
    if (prepared.status !== "success") return;
    const recorder = new FmlTraceRecorder();
    const request = createSingleInputRequest(prepared.value, {resourceType: "Patient", extension: [
        {url: "http://example.org/primitive", valueString: "value", _valueString: {id: "primitive-metadata"}},
        {url: "http://example.org/complex", valueCoding: {system: "http://example.org/system", code: "code"}},
    ]});
    const result = await engine.execute(request, {trace: recorder});
    assert.equal(result.status, "success", JSON.stringify(result.diagnostics));
    const variables = recorder.events.find(event => event.variables.some(variable => variable.name === "explicitComplex"))?.variables;
    assert.ok(variables);
    for (const [left, right] of [["primitive", "explicitPrimitive"], ["complex", "explicitComplex"]]) {
        const actual: FmlBinding | undefined = variables.find(variable => variable.name === left);
        const explicit: FmlBinding | undefined = variables.find(variable => variable.name === right);
        assert.ok(actual && explicit);
        assert.deepEqual(actual.value, explicit.value);
        assert.deepEqual(actual.primitiveMetadata, explicit.primitiveMetadata);
        assert.equal(actual.typeName, explicit.typeName);
    }
});

test("extension-only containers without values are empty under the FML value projection", async () => {
    const engine = new FmlExecutor();
    const prepared = await engine.prepare({sourceText: `${declarations}
group Main(source src : P, target tgt : T) {
 src where (extension('http://example.org/empty').empty() and extension('http://example.org/missing').empty()) -> tgt.active = true;
}`});
    assert.equal(prepared.status, "success", JSON.stringify(prepared.diagnostics));
    if (prepared.status !== "success") return;
    const request = createSingleInputRequest(prepared.value, {resourceType: "Patient", extension: [{url: "http://example.org/empty"}]});
    const result = await engine.execute(request);
    assert.equal(result.status, "success", JSON.stringify(result.diagnostics));
    assert.deepEqual(request.targets[0].value, {resourceType: "Patient", active: true});
});

test("extension shortcut navigates primitive companions and evaluates its URL argument in the caller scope", async () => {
    const engine = new FmlExecutor();
    const prepared = await engine.prepare({sourceText: `${declarations}
group Main(source src : P, target tgt : T) {
 src.birthDate as b where (extension(%src.gender).exists()) -> tgt.birthDate = b;
}`});
    assert.equal(prepared.status, "success", JSON.stringify(prepared.diagnostics));
    if (prepared.status !== "success") return;
    const input = {resourceType: "Patient", gender: "http://example.org/date", birthDate: "2000-01-01",
        _birthDate: {extension: [{url: "http://example.org/date", valueBoolean: false}]}};
    const request = createSingleInputRequest(prepared.value, input);
    const result = await engine.execute(request);
    assert.equal(result.status, "success", JSON.stringify(result.diagnostics));
    assert.deepEqual(request.targets[0].value, {resourceType: "Patient", birthDate: "2000-01-01", _birthDate: input._birthDate});
});

test("imported semantic diagnostics are warnings and unused incompatible code is not eagerly bound", async () => {
    const imported: FmlSource = {sourceName: "shared.fml", sourceText: `
map 'http://example.org/Shared' = Shared
${declarations}
group Shared(source src : P, target tgt : T) { src.id -> tgt.id; }
group Unused(source src : P, target tgt : T) { src.active -> tgt.gender; }
`};
    const engine = new FmlExecutor({maps: [imported]});
    const prepared = await engine.prepare({sourceName: "main.fml", sourceText: `${declarations}
imports 'http://example.org/Shared'
group Main(source src : P, target tgt : T) { src -> tgt then Shared(src,tgt); }`});
    assert.equal(prepared.status, "success", JSON.stringify(prepared.diagnostics));
    assert.ok(prepared.diagnostics.some(diagnostic => diagnostic.severity === "warning"
        && diagnostic.sourceName === "shared.fml" && /not compatible/.test(diagnostic.message)));
    if (prepared.status !== "success") return;
    const request = createSingleInputRequest(prepared.value, {resourceType: "Patient", id: "runs"});
    const result = await engine.execute(request);
    assert.equal(result.status, "success", JSON.stringify(result.diagnostics));
    assert.deepEqual(request.targets[0].value, {resourceType: "Patient", id: "runs"});
    assert.equal(analyzeLabFml(imported).status, "failure", "Editing/validating this map as primary remains strict.");
});

test("extends diagnostics are fatal in the primary map, advisory in unused imports and enforced at runtime", async () => {
    const imported: FmlSource = {sourceName: "inheritance.fml", sourceText: `
map 'http://example.org/Inheritance' = Inheritance
${declarations}
uses 'http://hl7.org/fhir/StructureDefinition/Observation' alias O as source
group Shared(source src : P, target tgt : T) { src.id -> tgt.id; }
group Bad(source src : P, target tgt : T) extends Base { }
group Base(source src : O, target tgt : T) { }
`};
    const engine = new FmlExecutor({maps: [imported]});
    for (const callee of ["Shared", "Bad"]) {
        const prepared = await engine.prepare({sourceName: "main.fml", sourceText: `${declarations}
imports 'http://example.org/Inheritance'
group Main(source src : P, target tgt : T) { src -> tgt then ${callee}(src,tgt); }`});
        assert.equal(prepared.status, "success", JSON.stringify(prepared.diagnostics));
        assert.ok(prepared.diagnostics.some(diagnostic => diagnostic.severity === "warning"
            && diagnostic.sourceName === "inheritance.fml" && /cannot extend 'Base'/.test(diagnostic.message)));
        if (prepared.status !== "success") return;
        const request = createSingleInputRequest(prepared.value, {resourceType: "Patient", id: "runs"});
        const result = await engine.execute(request);
        assert.equal(result.status, callee === "Shared" ? "success" : "failure", JSON.stringify(result.diagnostics));
        if (callee === "Shared") assert.deepEqual(request.targets[0].value, {resourceType: "Patient", id: "runs"});
        else assert.ok(result.diagnostics.some(diagnostic => /incompatible.*type\/model/.test(diagnostic.message)));
    }
    const primary = await engine.prepare({sourceName: "primary.fml", sourceText: `${declarations}
imports 'http://example.org/Inheritance'
group Main(source src : P, target tgt : T) extends Base { }`});
    assert.equal(primary.status, "failure");
    assert.ok(primary.diagnostics.some(diagnostic => diagnostic.severity === "error"
        && diagnostic.sourceName === "primary.fml" && /cannot extend 'Base'/.test(diagnostic.message)));
});

test("warning-only imports still fail explicitly when incompatible code is actually invoked", async () => {
    const engine = new FmlExecutor({maps: [{sourceName: "bad.fml", sourceText: `
map 'http://example.org/Bad' = Bad
${declarations}
group Bad(source src : P, target tgt : T) { src.active -> tgt.gender; }`}]});
    const prepared = await engine.prepare({sourceName: "main.fml", sourceText: `${declarations}
imports 'http://example.org/Bad'
group Main(source src : P, target tgt : T) { src -> tgt then Bad(src,tgt); }`});
    assert.equal(prepared.status, "success", JSON.stringify(prepared.diagnostics));
    if (prepared.status !== "success") return;
    const result = await engine.execute(createSingleInputRequest(prepared.value, {resourceType: "Patient", active: true}));
    assert.equal(result.status, "failure");
    assert.ok(result.diagnostics.some(diagnostic => /Primitive|primitive/.test(diagnostic.message) && diagnostic.sourceName === "bad.fml"));
});

test("imported parse errors, missing maps and missing invoked groups remain fatal", async () => {
    for (const sourceText of [
        "map 'http://example.org/Bad' = Bad\ngroup {",
        `map 'http://example.org/Bad' = Bad\n${declarations}
imports 'http://example.org/Missing'
group Shared(source src : P, target tgt : T) {}`,
    ]) {
        const engine = new FmlExecutor({maps: [{sourceName: "bad.fml", sourceText}]});
        const result = await engine.prepare({sourceText: `${declarations}
imports 'http://example.org/Bad'
group Main(source src : P, target tgt : T) { src -> tgt then Shared(src,tgt); }`});
        assert.equal(result.status, "failure");
        assert.ok(result.diagnostics.some(diagnostic => diagnostic.severity === "error"));
    }
});

test("Reference target-profile narrowing warns while evaluation checks actual values", async () => {
    const engine = new FmlExecutor();
    const prepared = await engine.prepare({sourceText: `
uses 'http://hl7.org/fhir/StructureDefinition/Appointment' alias S as source
uses 'http://hl7.org/fhir/StructureDefinition/AllergyIntolerance' alias T as target
group Main(source src : S, target tgt : T) { src.participant.actor -> tgt.patient; }`});
    assert.equal(prepared.status, "success", JSON.stringify(prepared.diagnostics));
    assert.ok(prepared.diagnostics.some(diagnostic => diagnostic.severity === "warning" && /Reference target profile/.test(diagnostic.message)));
    if (prepared.status !== "success") return;
    const request = createSingleInputRequest(prepared.value, {resourceType: "Appointment",
        participant: [{actor: {reference: "Patient/example"}}]});
    const result = await engine.execute(request);
    assert.equal(result.status, "success", JSON.stringify(result.diagnostics));
    assert.deepEqual(request.targets[0].value, {resourceType: "AllergyIntolerance", patient: {reference: "Patient/example"}});
});
