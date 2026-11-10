import assert from "node:assert/strict";
import test from "node:test";
import {createServer} from "node:http";
import {transformDefinitions} from "@fhirpath-lab/validator";
import r4Model from "fhirpath/fhir-context/r4";
import {
    createSingleInputRequest, FmlExecutor, FmlTraceRecorder, parseFmlJson, stringifyFmlJson,
    type FmlExecutionOptions, type FmlExecutorConfiguration, type FmlSource,
} from "../index";

const declarations = `
uses 'http://hl7.org/fhir/StructureDefinition/Patient' alias P as source
uses 'http://hl7.org/fhir/StructureDefinition/Patient' alias T as target
`;
const uuid = "50d1ccab-883e-47f2-b84f-8820348290a6";
const coveredSignatures = new Set<string>();

async function execute(
    sourceText: string, input: unknown = {resourceType: "Patient", id: "source"},
    options: FmlExecutionOptions = {}, configuration: FmlExecutorConfiguration = {}, entryGroup?: string,
) {
    const engine = new FmlExecutor(configuration);
    const prepared = await engine.prepare({sourceText, sourceName: "coverage.fml"});
    assert.equal(prepared.status, "success", JSON.stringify(prepared.diagnostics));
    if (prepared.status !== "success") throw new Error("Coverage map must prepare.");
    const request = createSingleInputRequest(prepared.value, input, entryGroup);
    const recorder = new FmlTraceRecorder();
    const result = await engine.execute(request, {uuid: () => uuid, trace: recorder, ...options});
    assert.equal(result.status, "success", JSON.stringify(result.diagnostics));
    return {target: request.targets[0].value, recorder, program: prepared.value, engine};
}

const transforms: [string, string, unknown][] = [
    ["create", "create('HumanName')", {}],
    ["copy", "copy('copy')", "copy"],
    ["truncate", "truncate('abcdef', 3)", "abc"],
    ["escape", "escape('&lt;x&gt;', 'xml', 'none')", "<x>"],
    ["cast explicit", "cast('text', 'string')", "text"],
    ["append", "append('a', '-', 5)", "a-5"],
    ["translate", "translate('male', 'http://example.org/map', 'code')", "M"],
    ["reference", "reference(src)", "Patient/source"],
    ["pointer", "pointer(src)", "Patient/source"],
    ["toDateTime", "toDateTime('20240102030405', 'yyyyMMddHHmmss')", "2024-01-02T03:04:05Z"],
    ["toDateTime fraction", "toDateTime('20240102030405.1+0200', 'yyyyMMddHHmmss.SZ')", "2024-01-02T03:04:05.1+02:00"],
    ["toDateTime literal UTC", "toDateTime('2024-01-02T03:04:05.123Z', 'yyyy-MM-ddTHH:mm:ss.SSSZ')", "2024-01-02T03:04:05.123Z"],
    ["toDateTime single AM", "toDateTime('20240102120102 A', 'yyyyMMddhhmmss a')", "2024-01-02T00:01:02Z"],
    ["toDateTime single PM", "toDateTime('20240102120102 P', 'yyyyMMddhhmmss a')", "2024-01-02T12:01:02Z"],
    ["unixToDateTime default", "unixToDateTime(0)", "1970-01-01T00:00:00Z"],
    ["unixToDateTime offset", "unixToDateTime(0, '+10:00')", "1970-01-01T10:00:00+10:00"],
    ["toDate", "toDate('20240102', 'yyyyMMdd')", "2024-01-02"],
    ["toDate year", "toDate('2024', 'yyyy')", "2024"],
    ["toDate month", "toDate('202402', 'yyyyMM')", "2024-02"],
    ["unixToDate default", "unixToDate(0)", "1970-01-01"],
    ["unixToDate offset", "unixToDate(0, '-01:00')", "1969-12-31"],
    ["toTime", "toTime('030405', 'HHmmss')", "03:04:05"],
    ["toTime fraction", "toTime('030405.12', 'HHmmss.SS')", "03:04:05.12"],
    ["unixToTime default", "unixToTime(0)", "00:00:00"],
    ["unixToTime offset", "unixToTime(0, '+10:00')", "10:00:00"],
    ["uuid", "uuid()", uuid],
    ["evaluate expression", "evaluate(src, id)", "source"],
    ["evaluate literal", "evaluate(src, 'literal expression text')", "literal expression text"],
    ["cc text", "cc('Text')", {text: "Text"}],
    ["cc coding", "cc('http://example.org/system', 'code')", {coding: [{system: "http://example.org/system", code: "code"}]}],
    ["cc display", "cc('http://example.org/system', 'code', 'Display')", {coding: [{system: "http://example.org/system", code: "code", display: "Display"}]}],
    ["c default", "c('http://example.org/system', 'code')", {system: "http://example.org/system", code: "code"}],
    ["c display", "c('http://example.org/system', 'code', 'Display')", {system: "http://example.org/system", code: "code", display: "Display"}],
    ["qty natural", "qty('12 kg')", {value: 12, unit: "kg"}],
    ["qty unit", "qty(12, 'kg')", {value: 12, unit: "kg"}],
    ["qty coded", "qty(12, 'kg', 'http://unitsofmeasure.org', 'kg')", {value: 12, unit: "kg", system: "http://unitsofmeasure.org", code: "kg"}],
    ["id default", "id('http://example.org/id', '1')", {system: "http://example.org/id", value: "1"}],
    ["id typed", "id('http://example.org/id', '1', 'MR')", {system: "http://example.org/id", value: "1",
        type: {coding: [{system: "http://terminology.hl7.org/CodeSystem/v2-0203", code: "MR"}]}}],
    ["cp inferred", "cp('a@example.org')", {system: "email", value: "a@example.org"}],
    ["cp explicit", "cp('phone', '555-0100')", {system: "phone", value: "555-0100"}],
];

for (const [name, invocation, expected] of transforms) {
    test(`shared transform overload: ${name}`, async () => {
        const execution = await execute(`${declarations}
group Main(source src : P, target tgt : T) { src -> ${invocation} as actual; }`,
        undefined, {translate: async () => [{name: "translated", value: "M", typeName: "code"}]});
        const actual = execution.recorder.events.find(event =>
            event.phase === "step" && event.variables.some(variable => variable.name === "actual"))
            ?.variables.find(variable => variable.name === "actual");
        assert.ok(actual);
        assert.deepEqual(parseFmlJson(stringifyFmlJson(actual.value)), parseFmlJson(JSON.stringify(expected)));
        const transform = execution.program.analysis.model.groups[0].rules[0].targets[0].transform;
        assert.ok(transform);
        transformDefinitions.get(transform.type)?.signatures.forEach((signature, index) => {
            const required = signature.parameters.filter(parameter => !parameter.optional && !parameter.variadic).length;
            if (transform.parameters.length >= required && (signature.parameters.some(parameter => parameter.variadic)
                || transform.parameters.length <= signature.parameters.length)) coveredSignatures.add(`${transform.type}:${index}`);
        });
    });
}

test("implicit cast uses the actual target descriptor and named arguments bind by signature", async () => {
    const execution = await execute(`${declarations}
group Main(source src : P, target tgt : T) {
 src.id as v -> tgt.id = cast(v), tgt.name as n,
 n.text = append(source: 'named'), n.family = truncate(length: 2, source: 'family');
}`);
    assert.deepEqual(execution.target, {resourceType: "Patient", id: "source", name: [{text: "named", family: "fa"}]});
    coveredSignatures.add("cast:0");
});

test("FML root-variable lowering does not touch quoted text, member names or function identifiers", async () => {
    const execution = await execute(`${declarations}
group Main(source src : P, target tgt : T) {
 src.name as n -> tgt.name as t then {
  n -> t.text = ('n.family:' & n.family & ':' & n.given.select($this).join(','));
 };
}`, {resourceType: "Patient", name: [{family: "Family", given: ["A", "B"]}]});
    assert.deepEqual(execution.target, {resourceType: "Patient", name: [{text: "n.family:Family:A,B"}]});
});

test("constants evaluate lazily once per invocation, can reference constants, and remain map-local", async () => {
    const source = `${declarations}
let baseText = 'prefix';
let combined = baseText & '-';
let unused = 'unused'.trace('not-used');
group Main(source src : P, target tgt : T) { src.id as v -> tgt.id = append(combined, v); }`;
    let unusedLogs = 0;
    const execution = await execute(source, undefined, {log: name => { if (name === "not-used") unusedLogs++; }});
    assert.deepEqual(execution.target, {resourceType: "Patient", id: "prefix-source"});
    const request = createSingleInputRequest(execution.program, {resourceType: "Patient", id: "next"});
    assert.equal((await execution.engine.execute(request)).status, "success");
    assert.deepEqual(request.targets[0].value, {resourceType: "Patient", id: "prefix-next"});
    assert.equal(unusedLogs, 0);
});

test("inheritance executes base rules only for an explicitly selected derived entry", async () => {
    const execution = await execute(`${declarations}
group Base(source src : P, target tgt : T) { src.id -> tgt.id; }
group Derived(source src : P, target tgt : T) extends Base { src.active -> tgt.active; }`,
    {resourceType: "Patient", id: "id", active: true}, {}, {}, "Derived");
    assert.deepEqual(execution.target, {resourceType: "Patient", id: "id", active: true});
});

test("transitive imports retain their defining constants and groups rather than the caller's", async () => {
    const leaf: FmlSource = {sourceName: "leaf.fml", sourceText: `
map 'http://example.org/Leaf' = Leaf
${declarations}
let baseText = 'leaf:';
group Leaf(source src : P, target tgt : T) { src.id as v -> tgt.id = append(baseText, v); }`};
    const middle: FmlSource = {sourceName: "middle.fml", sourceText: `
map 'http://example.org/Middle' = Middle
${declarations}
imports 'http://example.org/Leaf'
group Middle(source src : P, target tgt : T) { src -> tgt then Leaf(src,tgt); }`};
    const execution = await execute(`${declarations}
imports 'http://example.org/Middle'
let baseText = 'caller:';
group Main(source src : P, target tgt : T) { src -> tgt then Middle(src,tgt); }`,
    undefined, {}, {maps: [middle, leaf]});
    assert.deepEqual(execution.target, {resourceType: "Patient", id: "leaf:source"});
    assert.ok(execution.recorder.events.some(event => event.site.sourceName === "leaf.fml"));
});

test("wildcard imports can be loaded asynchronously during preparation, never during warm execution", async () => {
    let loads = 0;
    const execution = await execute(`${declarations}
imports 'http://example.org/Shared*'
group Main(source src : P, target tgt : T) { src -> tgt then Shared(src,tgt); }`,
    undefined, {}, {loadMaps: async () => {
        loads++;
        return [{sourceName: "shared.fml", sourceText: `map 'http://example.org/Shared' = Shared
${declarations}
group Shared(source src : P, target tgt : T) { src.id -> tgt.id; }`}];
    }});
    assert.equal(loads, 1);
    assert.equal((await execution.engine.execute(createSingleInputRequest(execution.program, {resourceType: "Patient", id: "again"}))).status, "success");
    assert.equal(loads, 1);
});

test("default types mapping takes precedence over a same-type complex copy", async () => {
    const execution = await execute(`${declarations}
group Main(source src : P, target tgt : T) { src.name -> tgt.name; }
group Name(source src : HumanName, target tgt : HumanName) <<types>> { src.family -> tgt.family; }`,
    {resourceType: "Patient", name: [{family: "Kept", given: ["Dropped"]}]});
    assert.deepEqual(execution.target, {resourceType: "Patient", name: [{family: "Kept"}]});
});

for (const mode of ["types", "type+"]) {
    test(`imported ${mode} mappings preserve the target release when a source alias matches its concrete type`, async () => {
        const resource: FmlSource = {sourceName: "resource.fml", sourceText: `
map 'http://example.org/Resource4to3' = Resource4to3
uses 'http://hl7.org/fhir/4.0/StructureDefinition/Resource' alias Resource as source
uses 'http://hl7.org/fhir/3.0/StructureDefinition/Resource' alias ResourceR3 as target
imports 'http://example.org/Meta4to3'
group Resource(source src : Resource, target tgt : ResourceR3) { src.meta -> tgt.meta; }`};
        const meta: FmlSource = {sourceName: "meta.fml", sourceText: `
map 'http://example.org/Meta4to3' = Meta4to3
uses 'http://hl7.org/fhir/4.0/StructureDefinition/Meta' alias Meta as source
uses 'http://hl7.org/fhir/3.0/StructureDefinition/Meta' alias MetaR3 as target
group Meta(source src : Meta, target tgt : MetaR3) <<${mode}>> {
 src.versionId as v -> tgt.versionId = append('mapped-', v);
}`};
        const input = {resourceType: "Patient", meta: {versionId: "v1", source: "http://example.org/r4-only"}};
        const execution = await execute(`
uses 'http://hl7.org/fhir/4.0/StructureDefinition/Patient' alias P as source
uses 'http://hl7.org/fhir/3.0/StructureDefinition/Patient' alias T as target
imports 'http://example.org/Resource4to3'
group Main(source src : P, target tgt : T) extends Resource { }`,
        input, {}, {maps: [resource, meta]});
        const expected = {resourceType: "Patient", meta: {versionId: "mapped-v1"}};
        assert.deepEqual(execution.target, expected);
        const entry = execution.recorder.events.find(event => event.phase === "enter" && event.site.sourceName === "meta.fml");
        assert.equal(entry?.variables.find(variable => variable.name === "tgt")?.fhirVersion, "STU3");
        assert.deepEqual(input.meta, {versionId: "v1", source: "http://example.org/r4-only"});
        const request = createSingleInputRequest(execution.program, input);
        const result = await execution.engine.execute(request);
        assert.equal(result.status, "success", JSON.stringify(result.diagnostics));
        assert.deepEqual(request.targets[0].value, expected);
    });
}

test("implicit target aliases allocate the property's resolved release rather than a colliding source alias", async () => {
    const execution = await execute(`
uses 'http://hl7.org/fhir/4.0/StructureDefinition/Patient' alias P as source
uses 'http://hl7.org/fhir/3.0/StructureDefinition/Patient' alias T as target
uses 'http://hl7.org/fhir/4.0/StructureDefinition/HumanName' alias HumanName as source
uses 'http://hl7.org/fhir/3.0/StructureDefinition/HumanName' alias HumanNameR3 as target
group Main(source src : P, target tgt : T) {
 src.name as n -> tgt.name as t then { n.family as v -> t.family = append(v); };
}`, {resourceType: "Patient", name: [{family: "mapped", given: ["not-copied"]}]});
    assert.deepEqual(execution.target, {resourceType: "Patient", name: [{family: "mapped"}]});
});

test("dotted target creation retains the target release despite a matching source alias", async () => {
    const execution = await execute(`
uses 'http://hl7.org/fhir/4.0/StructureDefinition/Patient' alias P as source
uses 'http://hl7.org/fhir/3.0/StructureDefinition/Patient' alias T as target
uses 'http://hl7.org/fhir/4.0/StructureDefinition/Meta' alias Meta as source
uses 'http://hl7.org/fhir/3.0/StructureDefinition/Meta' alias MetaR3 as target
group Main(source src : P, target tgt : T) {
 src.meta.versionId as v -> tgt.meta.versionId = append(v);
}`, {resourceType: "Patient", meta: {versionId: "v1"}});
    assert.deepEqual(execution.target, {resourceType: "Patient", meta: {versionId: "v1"}});
});

test("explicit create still resolves declared type aliases", async () => {
    const execution = await execute(`
uses 'http://hl7.org/fhir/4.0/StructureDefinition/Patient' alias P as source
uses 'http://hl7.org/fhir/3.0/StructureDefinition/Patient' alias T as target
uses 'http://hl7.org/fhir/3.0/StructureDefinition/Meta' alias DestinationMeta as target
group Main(source src : P, target tgt : T) {
 src.id as v -> tgt.meta = create('DestinationMeta') as m then { v -> m.versionId = append(v); };
}`, {resourceType: "Patient", id: "created"});
    assert.deepEqual(execution.target, {resourceType: "Patient", meta: {versionId: "created"}});
});

test("cross-version safety still rejects explicitly creating a source-release alias in a target", async () => {
    const engine = new FmlExecutor();
    const prepared = await engine.prepare({sourceText: `
uses 'http://hl7.org/fhir/4.0/StructureDefinition/Patient' alias P as source
uses 'http://hl7.org/fhir/3.0/StructureDefinition/Patient' alias T as target
uses 'http://hl7.org/fhir/4.0/StructureDefinition/Meta' alias Meta as source
group Main(source src : P, target tgt : T) { src.meta -> tgt.meta = create('Meta'); }`});
    assert.equal(prepared.status, "success", JSON.stringify(prepared.diagnostics));
    if (prepared.status !== "success") return;
    const input = {resourceType: "Patient", meta: {versionId: "unconverted"}};
    const request = createSingleInputRequest(prepared.value, input);
    const result = await engine.execute(request);
    assert.equal(result.status, "failure");
    assert.ok(result.diagnostics.some(diagnostic => /Cross-version element assignment/.test(diagnostic.message)));
    assert.deepEqual(request.targets[0].value, {resourceType: "Patient"});
    assert.deepEqual(input.meta, {versionId: "unconverted"});
});

test("inline ConceptMap supports source systems, collections and empty results", async () => {
    const execution = await execute(`
conceptmap "M" {
 prefix s = "http://example.org/source"
 prefix t = "http://example.org/target"
 s:a - t:A
}
${declarations}
group Main(source src : P, target tgt : T) {
 src.gender as v -> tgt.gender = translate(v, '#M', 'code');
}`, {resourceType: "Patient", gender: "a"});
    assert.deepEqual(execution.target, {resourceType: "Patient", gender: "A"});
    const empty = await execution.engine.execute(createSingleInputRequest(execution.program, {resourceType: "Patient", gender: "missing"}));
    assert.equal(empty.status, "success");
    if (empty.status === "success") assert.deepEqual(empty.value.targets[0].value, {resourceType: "Patient"});
});

for (const [type, base, value] of [
    ["code", "string", "pa"], ["id", "string", "identifier"],
    ["positiveInt", "integer", 2], ["unsignedInt", "integer", 0],
] as const) {
    for (const baseFirst of [true, false]) {
        test(`source type filters select only ${type}, not ${base}, with the base rule ${baseFirst ? "first" : "last"}`, async () => {
            const rule = (filter: string, name: string) => `
 src.value : ${filter} as v -> tgt.value = create('${filter}') as t then {
  v.value as raw -> t.value = raw;
 } "${name}";`;
            const specific = rule(type, "specific");
            const general = rule(base, "general");
            const property = `value${type[0].toUpperCase()}${type.slice(1)}`;
            const input = {[property]: value};
            const execution = await execute(`
uses 'http://hl7.org/fhir/StructureDefinition/Extension' alias E as source
uses 'http://hl7.org/fhir/StructureDefinition/Extension' alias T as target
group Main(source src : E, target tgt : T) { ${baseFirst ? general + specific : specific + general} }`, input);
            assert.deepEqual(execution.target, input);
            assert.deepEqual(execution.recorder.events.filter(event => event.phase === "enter" && event.site.kind === "rule"
                && ["specific", "general"].includes(event.site.name ?? "")).map(event => event.site.name), ["specific"]);
            const request = createSingleInputRequest(execution.program, input);
            const result = await execution.engine.execute(request);
            assert.equal(result.status, "success", JSON.stringify(result.diagnostics));
            assert.deepEqual(request.targets[0].value, input);
            assert.deepEqual(input, {[property]: value});
        });
    }
}

for (const [type, subtype, value] of [["string", "code", "text"], ["integer", "positiveInt", 2]] as const) {
    test(`source type filters still select ${type} and exclude its subtype ${subtype}`, async () => {
        const property = `value${type[0].toUpperCase()}${type.slice(1)}`;
        const execution = await execute(`
uses 'http://hl7.org/fhir/StructureDefinition/Extension' alias E as source
uses 'http://hl7.org/fhir/StructureDefinition/Extension' alias T as target
group Main(source src : E, target tgt : T) {
 src.value : ${type} as v -> tgt.value = create('${type}') as t then { v.value as raw -> t.value = raw; } "exact";
 src.value : ${subtype} -> tgt.url = 'wrong' "subtype";
}`, {[property]: value});
        assert.deepEqual(execution.target, {[property]: value});
        assert.ok(!execution.recorder.events.some(event => event.phase === "enter" && event.site.name === "subtype"));
    });
}

test("exact source filters resolve declared aliases and reject a matching type from another release", async () => {
    const execution = await execute(`
uses 'http://hl7.org/fhir/4.0/StructureDefinition/Extension' alias E as source
uses 'http://hl7.org/fhir/3.0/StructureDefinition/Extension' alias T as target
uses 'http://hl7.org/fhir/4.0/StructureDefinition/code' alias CodeR4 as source
uses 'http://hl7.org/fhir/3.0/StructureDefinition/code' alias CodeR3 as source
group Main(source src : E, target tgt : T) {
 src.value : CodeR4 as v -> tgt.value = create('code') as t then { v.value as raw -> t.value = raw; } "matching";
 src.value : CodeR3 -> tgt.url = 'wrong-release' "wrongRelease";
}`, {valueCode: "pa"});
    assert.deepEqual(execution.target, {valueCode: "pa"});
    assert.deepEqual(execution.recorder.events.filter(event => event.phase === "enter" && event.site.kind === "rule"
        && ["matching", "wrongRelease"].includes(event.site.name ?? "")).map(event => event.site.name), ["matching"]);
});

test("group compatibility remains inheritance-aware while source type qualifiers are exact", async () => {
    const execution = await execute(`${declarations}
uses 'http://hl7.org/fhir/StructureDefinition/Resource' alias R as source
uses 'http://hl7.org/fhir/StructureDefinition/Resource' alias RT as target
group Main(source src : P, target tgt : T) extends Base {
 src : P -> tgt.active = true "patient";
 src : R -> tgt.gender = 'unknown' "resource";
}
group Base(source src : R, target tgt : RT) { src.id -> tgt.id; }`,
    {resourceType: "Patient", id: "inherited"});
    assert.deepEqual(execution.target, {resourceType: "Patient", id: "inherited", active: true});
    assert.ok(!execution.recorder.events.some(event => event.phase === "enter" && event.site.name === "resource"));
});

test("where/check/log precede source-list selection and only_one accepts an empty collection", async () => {
    const logs: unknown[][] = [];
    const execution = await execute(`${declarations}
group Main(source src : P, target tgt : T) {
 src.name first as n where (use = 'official') log (family) -> tgt.name = n;
 src.identifier only_one -> tgt.identifier;
}`, {resourceType: "Patient", name: [{family: "Skip", use: "usual"}, {family: "One", use: "official"}, {family: "Two", use: "official"}]},
    {log: (_name, values) => logs.push([...values])});
    assert.deepEqual(execution.target, {resourceType: "Patient", name: [{family: "One", use: "official"}]});
    assert.deepEqual(logs, [["One"], ["Two"]]);
});

test("share labels survive source matches and siblings but remain independent between group calls", async () => {
    const execution = await execute(`${declarations}
group Main(source src : P, target tgt : T) {
 src.name as n -> tgt.name as t share shared then { n.family -> t.family; };
 src.identifier as i -> tgt.name as t share shared then { i.value -> t.text; };
}`, {resourceType: "Patient", name: [{family: "First"}, {family: "Last"}], identifier: [{value: "id"}]});
    assert.deepEqual(execution.target, {resourceType: "Patient", name: [{family: "Last", text: "id"}]});
    const again = createSingleInputRequest(execution.program, {resourceType: "Patient", name: [{family: "Next"}]});
    assert.equal((await execution.engine.execute(again)).status, "success");
    assert.deepEqual(again.targets[0].value, {resourceType: "Patient", name: [{family: "Next"}]});
});

test("first/last target modes preserve internal order and place normal items between them", async () => {
    const execution = await execute(`${declarations}
group Main(source src : P, target tgt : T) {
 src -> tgt.name = create('HumanName') as lastName last then { src -> lastName.text = 'last'; };
 src -> tgt.name = create('HumanName') as normal then { src -> normal.text = 'normal'; };
 src -> tgt.name = create('HumanName') as firstName first then { src -> firstName.text = 'first'; };
}`);
    assert.deepEqual(execution.target, {resourceType: "Patient", name: [{text: "first"}, {text: "normal"}, {text: "last"}]});
});

test("separate target subelement rules create separate repeating intermediates", async () => {
    const execution = await execute(`${declarations}
group Main(source src : P, target tgt : T) {
 src.id as v -> tgt.name.family = v;
 src.id as v -> tgt.name.text = v;
}`);
    assert.deepEqual(execution.target, {resourceType: "Patient", name: [{family: "source"}, {text: "source"}]});
});

for (const creation of ["", " = create('id')"]) {
    test(`${creation ? "explicitly" : "implicitly"} created primitive aliases update their scalar and companion fields`, async () => {
        const execution = await execute(`${declarations}
group Main(source src : P, target tgt : T) {
 src.id as v -> tgt.id${creation} as p then {
  v -> p.value = v;
  v -> p.id = 'metadata';
 };
}`);
        assert.deepEqual(execution.target, {resourceType: "Patient", id: "source", _id: {id: "metadata"}});
    });
}

test("implicit primitive aliases use the target release before copying System.String values", async () => {
    const execution = await execute(`
uses 'http://hl7.org/fhir/4.0/StructureDefinition/canonical' alias U as source
uses 'http://hl7.org/fhir/3.0/StructureDefinition/Reference' alias T as target
group Main(source src : U, target tgt : T) {
 src.value as v -> tgt.reference as r, r.value = v;
}`, "http://example.org/PlanDefinition/test");
    const expected = {reference: "http://example.org/PlanDefinition/test"};
    assert.deepEqual(execution.target, expected);
    const created = execution.recorder.events.find(event => event.phase === "step" && event.site.kind === "target"
        && event.variables.some(variable => variable.name === "r"));
    const alias = created?.variables.find(variable => variable.name === "r");
    assert.equal(alias?.typeName, "string");
    assert.equal(alias?.fhirVersion, "STU3");
    assert.equal(alias?.value, undefined);
    assert.deepEqual(created?.variables.find(variable => variable.name === "tgt")?.value, {});
    const request = createSingleInputRequest(execution.program, "http://example.org/PlanDefinition/test");
    const result = await execution.engine.execute(request);
    assert.equal(result.status, "success", JSON.stringify(result.diagnostics));
    assert.deepEqual(request.targets[0].value, expected);
});

test("dependent primitive groups receive empty targets rather than pre-copied source metadata", async () => {
    const input = {resourceType: "Patient", gender: "male", _gender: {
        id: "source-id", extension: [{url: "http://example.org/meta", valueString: "metadata"}],
    }};
    const execution = await execute(`${declarations}
group Main(source src : P, target tgt : T) {
 src.gender as s -> tgt.gender as t then CopyPrimitive(s, t);
}
group CopyPrimitive(source src : code, target tgt : code) {
 src.value as v -> tgt.value = v;
 src.id -> tgt.id;
 src.extension -> tgt.extension;
}`, input);
    const entered = execution.recorder.events.find(event => event.phase === "enter" && event.site.name === "CopyPrimitive");
    assert.ok(entered);
    const target = entered.variables.find(variable => variable.name === "tgt");
    assert.equal(target?.value, undefined);
    assert.equal(target?.primitiveMetadata, undefined);
    assert.deepEqual(execution.target, input);
    assert.deepEqual(input._gender.extension, [{url: "http://example.org/meta", valueString: "metadata"}]);
});

test("implicit repeating primitive aliases retain their array slots and companion metadata", async () => {
    const execution = await execute(`${declarations}
group Main(source src : P, target tgt : T) {
 src.name as n -> tgt.name as t then {
  n.given as g -> t.given as p then {
   g.value as v -> p.value = v;
   g -> p.id = 'metadata';
  };
 };
}`, {resourceType: "Patient", name: [{given: ["A", "B"]}]});
    assert.deepEqual(execution.target, {resourceType: "Patient", name: [{
        given: ["A", "B"], _given: [{id: "metadata"}, {id: "metadata"}],
    }]});
});

test("empty implicit primitive slots are omitted while metadata-only primitives are retained", async () => {
    const execution = await execute(`${declarations}
group Main(source src : P, target tgt : T) {
 src -> tgt.id as empty;
 src -> tgt.birthDate as date then { src -> date.id = 'metadata-only'; };
 src -> tgt.name as n then {
  src -> n.given as emptyGiven;
  src -> n.given as kept then { src -> kept.value = 'kept'; };
 };
}`);
    assert.deepEqual(execution.target, {resourceType: "Patient",
        _birthDate: {id: "metadata-only"}, name: [{given: ["kept"]}]});
});

test("a concrete choice-property name permits implicit primitive creation", async () => {
    const execution = await execute(`
uses 'http://hl7.org/fhir/StructureDefinition/Observation' alias S as source
uses 'http://hl7.org/fhir/StructureDefinition/Observation' alias T as target
group Main(source src : S, target tgt : T) {
 src -> tgt.valueString as v then { src -> v.value = 'text'; };
}`, {resourceType: "Observation"});
    assert.deepEqual(execution.target, {resourceType: "Observation", valueString: "text"});
});

test("an ambiguous choice still rejects implicit target creation", async () => {
    const engine = new FmlExecutor();
    const prepared = await engine.prepare({sourceText: `
uses 'http://hl7.org/fhir/StructureDefinition/Observation' alias S as source
uses 'http://hl7.org/fhir/StructureDefinition/Observation' alias T as target
group Main(source src : S, target tgt : T) { src -> tgt.value as v; }`});
    assert.equal(prepared.status, "success", JSON.stringify(prepared.diagnostics));
    if (prepared.status !== "success") return;
    const request = createSingleInputRequest(prepared.value, {resourceType: "Observation"});
    const result = await engine.execute(request);
    assert.equal(result.status, "failure");
    assert.ok(result.diagnostics.some(diagnostic => /Choice.*requires a concrete value type/.test(diagnostic.message)));
    assert.deepEqual(request.targets[0].value, {resourceType: "Observation"});
});

test("all original numeric token content survives decimal literals and primitive copying", async () => {
    const execution = await execute(`
uses 'http://hl7.org/fhir/StructureDefinition/Observation' alias O as source
uses 'http://hl7.org/fhir/StructureDefinition/Observation' alias T as target
group Main(source src : O, target tgt : T) { src -> tgt.valueQuantity = qty(9007199254740993.0001, 'kg'); }`,
    {resourceType: "Observation"});
    assert.match(stringifyFmlJson(execution.target), /9007199254740993\.0001/);
});

test("typed logical models support backtick property names without treating embedded dots as paths", async () => {
    const models = {
        Source: {TypeName: "Source", Elements: [{ElementName: "section4.5", Type: [{TypeName: "string"}]}]},
        Target: {TypeName: "Target", Elements: [{ElementName: "section4.5", Type: [{TypeName: "string"}]}]},
    };
    const engine = new FmlExecutor();
    const prepared = await engine.prepare({
        sourceText: `group Main(source src : Source, target tgt : Target) { src.\`section4.5\` -> tgt.\`section4.5\`; }`,
        customTypeModels: models,
    });
    assert.equal(prepared.status, "success", JSON.stringify(prepared.diagnostics));
    if (prepared.status !== "success") return;
    const target = {};
    const result = await engine.execute({program: prepared.value,
        sources: [{name: "src", value: {"section4.5": "literal dot"}}],
        targets: [{name: "tgt", value: target}]});
    assert.equal(result.status, "success", JSON.stringify(result.diagnostics));
    assert.deepEqual(target, {"section4.5": "literal dot"});
});

test("async FHIRPath resolve propagates HTTP failures instead of returning empty success", {timeout: 5000}, async t => {
    const server = createServer((_request, response) => { response.writeHead(503); response.end("unavailable"); });
    await new Promise<void>(resolve => server.listen(0, "127.0.0.1", resolve));
    t.after(() => new Promise<void>((resolve, reject) => {
        server.close(error => error ? reject(error) : resolve()); server.closeAllConnections();
    }));
    const address = server.address();
    assert.ok(address && typeof address !== "string");
    const engine = new FmlExecutor();
    const prepared = await engine.prepare({sourceText: `${declarations}
group Main(source src : P, target tgt : T) { src -> tgt.id = evaluate(src, generalPractitioner.resolve().id); }`});
    assert.equal(prepared.status, "success", JSON.stringify(prepared.diagnostics));
    if (prepared.status !== "success") return;
    const result = await engine.execute(createSingleInputRequest(prepared.value, {resourceType: "Patient",
        generalPractitioner: [{reference: `http://127.0.0.1:${address.port}/Practitioner/example`}]}));
    assert.equal(result.status, "failure", JSON.stringify(result.diagnostics));
    assert.match(result.diagnostics[0].message, /503|HTTP|fetch/);
});

test("every shared transform signature has an executable success case", () => {
    for (const definition of transformDefinitions.values()) {
        definition.signatures.forEach((_signature, index) => {
            assert.ok(coveredSignatures.has(`${definition.name}:${index}`), `Missing ${definition.name} signature ${index + 1}`);
        });
    }
});

test("transform arguments accept typed FHIRPath expressions without string-based context heuristics", async () => {
    const result = await execute(`${declarations}
group Main(source src : P, target tgt : T) {
 src.name as n -> tgt.id = truncate(n.family, 3);
}`, {resourceType: "Patient", name: [{family: "Family"}]});
    assert.deepEqual(result.target, {resourceType: "Patient", id: "Fam"});
});

test("FHIRPath trace and FML log are evaluated once and reach both logging and recording consumers", async () => {
    const messages: [string, readonly unknown[]][] = [];
    const result = await execute(`${declarations}
group Main(source src : P, target tgt : T) {
 src.id as v log (v) -> tgt.id = (v.trace('path-message')) "loggedRule";
}`, undefined, {log: (name, values) => messages.push([name, values])});
    assert.equal(messages.length, 2);
    assert.ok(messages.some(([name, values]) => name === "path-message" && values[0] === "source"));
    assert.ok(result.recorder.events.some(event => event.messages?.some(message => message.name === "path-message")));
});

test("primitive metadata survives the FHIRPath mapping-variable boundary, including extension-only values", async () => {
    const result = await execute(`${declarations}
group Main(source src : P, target tgt : T) {
 src.birthDate as d -> tgt.birthDate = (d);
}`, {resourceType: "Patient", _birthDate: {id: "extension-only"}});
    assert.deepEqual(result.target, {resourceType: "Patient", _birthDate: {id: "extension-only"}});
});

test("quoted literals decode escapes once and preserve literal backslashes", async () => {
    const result = await execute(`${declarations}
group Main(source src : P, target tgt : T) { src -> tgt.name as n, n.text = 'a\\n\\u0042\\\\n'; }`);
    assert.deepEqual(result.target, {resourceType: "Patient", name: [{text: "a\nB\\n"}]});
});

test("type+ dispatch creates the concrete type for abstract Resource targets", async () => {
    const result = await execute(`
uses 'http://hl7.org/fhir/StructureDefinition/Observation' alias O as source
uses 'http://hl7.org/fhir/StructureDefinition/Observation' alias T as target
group Main(source src : O, target tgt : T) { src.contained -> tgt.contained; }
group Patient(source src : Patient, target tgt : Patient) <<type+>> { src.id -> tgt.id; }`,
    {resourceType: "Observation", contained: [{resourceType: "Patient", id: "child", active: true}]});
    assert.deepEqual(result.target, {resourceType: "Observation", contained: [{resourceType: "Patient", id: "child"}]});
});

test("created resources keep target identity when attached before later dependent writes", async () => {
    const result = await execute(`
uses 'http://hl7.org/fhir/StructureDefinition/Patient' alias P as source
uses 'http://hl7.org/fhir/StructureDefinition/Bundle' alias B as target
group Main(source src : P, target tgt : B) {
 src -> create('Encounter') as enc, tgt.entry as entry, entry.resource = enc then {
  src.id as v -> enc.id = v;
 };
}`);
    assert.deepEqual(result.target, {resourceType: "Bundle", entry: [{resource: {resourceType: "Encounter", id: "source"}}]});
});

for (const [version, url] of [["R4B", "4.3"], ["R6", "6.0"]] as const) {
    test(`FHIRPath uses generated ${version} Lab models rather than a substituted release`, async () => {
        const result = await execute(`
uses 'http://hl7.org/fhir/${url}/StructureDefinition/Patient' alias P as source
uses 'http://hl7.org/fhir/${url}/StructureDefinition/Patient' alias T as target
group Main(source src : P, target tgt : T) { src.name as n -> tgt.name as t then { n -> t.text = evaluate(n, family & '!'); }; }`,
        {resourceType: "Patient", name: [{family: version}]});
        assert.deepEqual(result.target, {resourceType: "Patient", name: [{text: `${version}!`}]});
    });
}

test("R5 integer64 copies preserve the exact string representation and signed 64-bit boundary", async () => {
    const text = "9223372036854775807";
    const result = await execute(`
uses 'http://hl7.org/fhir/5.0/StructureDefinition/Parameters' alias P as source
uses 'http://hl7.org/fhir/5.0/StructureDefinition/Parameters' alias T as target
group Main(source src : P, target tgt : T) {
 src.parameter as p -> tgt.parameter as t then { p.valueInteger64 -> t.valueInteger64; };
}`, {resourceType: "Parameters", parameter: [{valueInteger64: text}]});
    assert.deepEqual(result.target, {resourceType: "Parameters", parameter: [{valueInteger64: text}]});
});

test("repeated scalar writes replace values but a multi-valued expression still fails", async () => {
    const result = await execute(`${declarations}
group Main(source src : P, target tgt : T) { src -> tgt.id = 'first'; src -> tgt.id = 'last'; }`);
    assert.deepEqual(result.target, {resourceType: "Patient", id: "last"});
});

test("single() parses as an embedded function and reports cardinality at runtime", async () => {
    const engine = new FmlExecutor();
    const prepared = await engine.prepare({sourceText: `${declarations}
group Main(source src : P, target tgt : T) { src -> tgt.id = evaluate(src, name.given.single()); }`});
    assert.equal(prepared.status, "success", JSON.stringify(prepared.diagnostics));
    if (prepared.status !== "success") return;
    const result = await engine.execute(createSingleInputRequest(prepared.value, {resourceType: "Patient", name: [{given: ["one", "two"]}]}));
    assert.equal(result.status, "failure");
    assert.match(result.diagnostics[0].message, /single|one|multiple/i);
});

test("nontrivial cast conversion remains explicitly unsupported by the agreed policy", async () => {
    const engine = new FmlExecutor();
    const prepared = await engine.prepare({sourceText: `${declarations}
group Main(source src : P, target tgt : T) { src -> cast('123', 'integer') as converted; }`});
    assert.equal(prepared.status, "success", JSON.stringify(prepared.diagnostics));
    if (prepared.status !== "success") return;
    const result = await engine.execute(createSingleInputRequest(prepared.value, {resourceType: "Patient"}));
    assert.equal(result.status, "not-implemented");
    if (result.status === "not-implemented") assert.match(result.message, /Nontrivial cast/);
});

for (const body of [
    "group Main(source src : P, target tgt : T) extends Main {}",
    "let a = %b; let b = %a; group Main(source src : P, target tgt : T) {}",
    "group Main(source src : P, target tgt : T) { src.name -> tgt.name; } group A(source a : HumanName, target b : HumanName) <<types>> {} group B(source a : HumanName, target b : HumanName) <<types>> {}",
]) {
    test(`invalid linking is diagnosed: ${body.slice(0, 50)}`, async () => {
        const prepared = await new FmlExecutor().prepare({sourceText: declarations + body});
        assert.notEqual(prepared.status, "success");
        assert.ok(prepared.diagnostics.some(diagnostic => diagnostic.severity === "error"));
    });
}

test("whole-root identity mapping copies content instead of returning an empty success", async () => {
    const input = {resourceType: "Patient", id: "root", _birthDate: {id: "metadata"}, name: [{family: "Family"}]};
    const result = await execute(`${declarations}
group Main(source src : P, target tgt : T) { src -> tgt; }`, input);
    assert.deepEqual(result.target, input);
    assert.notEqual(result.target, input);
    if (result.target && typeof result.target === "object") {
        assert.notEqual((result.target as {name: unknown}).name, input.name);
    }
});

test("empty transform argument collections propagate without fabricating a first item", async () => {
    const result = await execute(`${declarations}
group Main(source src : P, target tgt : T) {
 src -> (%src.name.given) as missing, tgt.id = truncate(missing, 3), tgt.name = cc(missing);
}`);
    assert.deepEqual(result.target, {resourceType: "Patient"});
});

test("independent group invocations do not inherit share labels from earlier calls", async () => {
    const result = await execute(`${declarations}
group Main(source src : P, target tgt : T) { src.name as n -> tgt then Child(n, tgt); }
group Child(source src : HumanName, target tgt : Patient) {
 src.given as g -> tgt.name as n share shared then { g -> n.text = g; };
}`, {resourceType: "Patient", name: [{given: ["A", "B"]}, {given: ["C", "D"]}]});
    assert.deepEqual(result.target, {resourceType: "Patient", name: [{text: "B"}, {text: "D"}]});
});

for (const mode of ["first", "last", "single"]) {
    test(`invalid ${mode} target multiplicity is explicit`, async () => {
        const engine = new FmlExecutor();
        const rules = mode === "single" ? "src.name as n -> tgt.name = n single;"
            : `src -> tgt.name as a ${mode}; src -> tgt.name as b ${mode};`;
        const prepared = await engine.prepare({sourceText: `${declarations}
group Main(source src : P, target tgt : T) { ${rules} }`});
        assert.equal(prepared.status, "success", JSON.stringify(prepared.diagnostics));
        if (prepared.status !== "success") return;
        const result = await engine.execute(createSingleInputRequest(prepared.value, {resourceType: "Patient", name: [{family: "A"}, {family: "B"}]}));
        assert.equal(result.status, "failure");
        assert.match(result.diagnostics[0].message, new RegExp(mode));
    });
}

test("source log has the current and calling rule identifiers without re-evaluating rules", async () => {
    const collected: unknown[][] = [];
    const result = await execute(`${declarations}
group Main(source src : P, target tgt : T) {
 src -> tgt then { src.id as v log (%callingRuleId & '/' & %ruleId) -> tgt.id = v "inner"; } "outer";
}`, undefined, {log: (_name, values) => collected.push([...values])});
    assert.deepEqual(result.target, {resourceType: "Patient", id: "source"});
    assert.deepEqual(collected, [["outer/inner"]]);
});

test("R6-specific backbone fields are evaluated using the Lab's R6 model data", async () => {
    const result = await execute(`
uses 'http://hl7.org/fhir/6.0/StructureDefinition/Account' alias A as source
uses 'http://hl7.org/fhir/6.0/StructureDefinition/Account' alias T as target
group Main(source src : A, target tgt : T) {
 src.guarantor as g -> tgt.guarantor as t then { g.rank as r -> t.rank = (r + 1); };
}`, {resourceType: "Account", guarantor: [{rank: 1}]});
    assert.deepEqual(parseFmlJson(stringifyFmlJson(result.target)), parseFmlJson('{"resourceType":"Account","guarantor":[{"rank":2}]}'));
});

test("profile-to-base configuration is reused without injecting conversion-repair metadata", async () => {
    const engine = new FmlExecutor();
    const prepared = await engine.prepare({
        sourceText: `
uses 'http://example.org/SourceProfile' alias S as source
uses 'http://example.org/TargetProfile' alias T as target
group Main(source src : S, target tgt : T) { src.id -> tgt.id; }`,
        profileBaseTypes: {"http://example.org/SourceProfile": "Patient", "http://example.org/TargetProfile": "Patient"},
    });
    assert.equal(prepared.status, "success", JSON.stringify(prepared.diagnostics));
    if (prepared.status !== "success") return;
    const request = createSingleInputRequest(prepared.value, {resourceType: "Patient", id: "profiled"});
    assert.equal((await engine.execute(request)).status, "success");
    assert.deepEqual(request.targets[0].value, {resourceType: "Patient", id: "profiled"});
});

test("an explicitly supplied evaluator model remains authoritative alongside custom model metadata", async () => {
    let reads = 0;
    const model = Object.freeze({...r4Model, get path2Type() { reads++; return r4Model.path2Type; }});
    const engine = new FmlExecutor({fhirPathModels: {R4: model}});
    const prepared = await engine.prepare({sourceText: `${declarations}
group Main(source src : P, target tgt : T) { src.name as n -> tgt.name as t then { n -> t.text = evaluate(n, family); }; }`,
        customTypeModels: {Unused: {TypeName: "Unused", Elements: []}}});
    assert.equal(prepared.status, "success", JSON.stringify(prepared.diagnostics));
    if (prepared.status !== "success") return;
    const result = await engine.execute(createSingleInputRequest(prepared.value, {resourceType: "Patient", name: [{family: "supplied"}]}));
    assert.equal(result.status, "success", JSON.stringify(result.diagnostics));
    assert.ok(reads > 0, "The supplied runtime model must not be silently replaced.");
});

test("long and quantity literals cross the evaluator boundary without numeric or type loss", async () => {
    const long = await execute(`
uses 'http://hl7.org/fhir/5.0/StructureDefinition/Patient' alias P as source
uses 'http://hl7.org/fhir/5.0/StructureDefinition/Parameters' alias T as target
group Main(source src : P, target tgt : T) {
 src -> tgt.parameter as t, t.name = 'long', t.valueInteger64 = 9223372036854775807L;
}`);
    assert.deepEqual(long.target, {resourceType: "Parameters", parameter: [{name: "long", valueInteger64: "9223372036854775807"}]});
    const quantity = await execute(`
uses 'http://hl7.org/fhir/StructureDefinition/Observation' alias O as source
uses 'http://hl7.org/fhir/StructureDefinition/Observation' alias T as target
group Main(source src : O, target tgt : T) { src -> tgt.value = (12 'kg'); }`, {resourceType: "Observation"});
    assert.deepEqual(parseFmlJson(stringifyFmlJson(quantity.target)), parseFmlJson(
        '{"resourceType":"Observation","valueQuantity":{"value":12,"unit":"kg","system":"http://unitsofmeasure.org","code":"kg"}}'));
});

test("language literals remain version-independent across imported group calls", async () => {
    const result = await execute(`${declarations}
imports 'http://example.org/R5'
group Main(source src : P, target tgt : T) { src -> tgt then R5('literal', tgt); }`,
    undefined, {}, {maps: [{sourceName: "r5.fml", sourceText: `
map 'http://example.org/R5' = R5
uses 'http://hl7.org/fhir/5.0/StructureDefinition/string' alias S as source
uses 'http://hl7.org/fhir/4.0/StructureDefinition/Patient' alias T as target
group R5(source src : S, target tgt : T) { src -> tgt.id = append(src); }`}]});
    assert.deepEqual(result.target, {resourceType: "Patient", id: "literal"});
});

test("mapping names that overlap evaluator globals keep lexical ownership", async () => {
    const result = await execute(`${declarations}
group Main(source context : P, target tgt : T) {
 context.id as factory -> tgt.id = (%factory & '.' & context.id);
}`);
    assert.deepEqual(result.target, {resourceType: "Patient", id: "source.source"});
});

test("quoted mapping aliases bind correctly after Unicode literals", async () => {
    const result = await execute(`${declarations}
group Main(source src : P, target tgt : T) {
 src.id as \`source_value\` -> tgt.name as n, n.text = ('\u{1F600}' & % 'source_value');
}`);
    assert.deepEqual(result.target, {resourceType: "Patient", name: [{text: "\u{1F600}source"}]});
});

test("map constants may reference standard input-independent evaluator constants", async () => {
    const result = await execute(`${declarations}
let unitBase = %ucum;
group Main(source src : P, target tgt : T) { src -> tgt.name as n, n.text = unitBase; }`);
    assert.deepEqual(result.target, {resourceType: "Patient", name: [{text: "http://unitsofmeasure.org"}]});
});

test("cancelled preparation releases an uncooperative asynchronous map loader", {timeout: 3000}, async () => {
    let started!: () => void;
    const loaded = new Promise<void>(resolve => { started = resolve; });
    const controller = new AbortController();
    const engine = new FmlExecutor({loadMaps: (_pattern, _owner, signal) => {
        assert.equal(signal, controller.signal);
        started();
        return new Promise(() => {});
    }});
    const running = engine.prepare({sourceText: `${declarations}
imports 'http://example.org/pending'
group Main(source src : P, target tgt : T) { src.id -> tgt.id; }`}, {signal: controller.signal});
    await loaded;
    controller.abort(new Error("cancel map loading"));
    const result = await running;
    assert.equal(result.status, "failure");
    assert.match(result.diagnostics[0].message, /cancel map loading/);
});

test("detached resource creation uses the target release before attachment", async () => {
    const result = await execute(`
uses 'http://hl7.org/fhir/4.0/StructureDefinition/Patient' alias P as source
uses 'http://hl7.org/fhir/5.0/StructureDefinition/Bundle' alias T as target
uses 'http://hl7.org/fhir/5.0/StructureDefinition/Encounter' as produced
group Main(source src : P, target tgt : T) {
 src -> tgt.type = 'collection', create('Encounter') as enc, tgt.entry as entry then {
  src.id as v -> enc.id = append(v), enc.status = 'planned';
  src -> entry.resource = enc;
 };
}`);
    assert.deepEqual(result.target, {resourceType: "Bundle", type: "collection", entry: [{resource: {
        resourceType: "Encounter", id: "source", status: "planned",
    }}]});
});

test("replaced scalar aliases remain detached instead of resurrecting an earlier target instance", async () => {
    const result = await execute(`${declarations}
group Main(source src : P, target tgt : T) {
 src -> tgt.id = create('id') as a, tgt.id = create('id') as b then {
  src -> b.value = 'kept';
  src -> a.value = 'detached';
 };
}`);
    assert.deepEqual(result.target, {resourceType: "Patient", id: "kept"});
});

test("default values retain the source primitive type in subsequent predicates", async () => {
    const result = await execute(`${declarations}
group Main(source src : P, target tgt : T) {
 src.gender default ('unknown') as value where (value is code) -> tgt.gender = value;
}`);
    assert.deepEqual(result.target, {resourceType: "Patient", gender: "unknown"});
});

for (const invocation of ["toDate('invalid', 'yyyyMMdd')", "unixToTime(0, '+25:00')", "qty('not a quantity')", "escape('x', 'unknown', 'xml')"]) {
    test(`invalid transform value fails: ${invocation}`, async () => {
        const engine = new FmlExecutor();
        const prepared = await engine.prepare({sourceText: `${declarations}
group Main(source src : P, target tgt : T) { src -> ${invocation} as bad; }`});
        assert.equal(prepared.status, "success", JSON.stringify(prepared.diagnostics));
        if (prepared.status !== "success") return;
        const result = await engine.execute(createSingleInputRequest(prepared.value, {resourceType: "Patient"}));
        assert.equal(result.status, "failure");
        assert.ok(result.diagnostics.some(diagnostic => diagnostic.severity === "error"));
    });
}

test("resolve host callback receives the origin: source vs target variable and rule site", async () => {
    const calls: {reference: string; origin: any}[] = [];
    const resolve: FmlExecutionOptions["resolve"] = async (reference, _signal, origin) => {
        calls.push({reference, origin});
        return {resourceType: "Practitioner", id: reference.split("/").pop()};
    };
    const {target} = await execute(`${declarations}
group Main(source src : P, target tgt : T) {
  src -> tgt.id = evaluate(src, generalPractitioner.reference.resolve().id) "fromSource";
  src -> tgt.name as n then {
    src -> n.family = evaluate(tgt, %tgt.generalPractitioner.reference.resolve().id) "fromTarget";
  } "named";
}`, {resourceType: "Patient", generalPractitioner: [{reference: "Practitioner/a"}]}, {resolve});
    assert.equal((target as any).id, "a");
    const source = calls.find(call => call.origin.expression.startsWith("generalPractitioner"));
    assert.ok(source);
    assert.equal(source.origin.mode, "source");
    assert.equal(source.origin.variable, "src");
    assert.equal(source.origin.rule, "fromSource");
    assert.ok(source.origin.site);
});
