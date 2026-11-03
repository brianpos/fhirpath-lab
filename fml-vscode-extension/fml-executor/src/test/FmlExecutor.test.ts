import assert from "node:assert/strict";
import {execFile} from "node:child_process";
import {promisify} from "node:util";
import {build} from "esbuild";
import test from "node:test";
import {CoreFmlParser, FmlPropertyUsageCollector, FmlValidatorApi} from "@fhirpath-lab/validator";
import {analyzeLabFml, createSingleInputRequest, FmlExecutor, FmlTraceRecorder, parseFmlJson, stringifyFmlJson, type FmlSource} from "../index";

const source: FmlSource = {
    sourceName: "identity.fml",
    sourceText: `
uses 'http://hl7.org/fhir/StructureDefinition/Patient' alias Patient as source
uses 'http://hl7.org/fhir/StructureDefinition/Patient' alias TargetPatient as target
group Main(source src : Patient, target tgt : TargetPatient) {
    src.id -> tgt.id;
}
`,
};

test("exposes existing analysis from one parse/analysis pipeline without changing parse output", () => {
    class CountingCollector extends FmlPropertyUsageCollector {
        public calls = 0;
        public override analyzeModel(...args: Parameters<FmlPropertyUsageCollector["analyzeModel"]>) {
            this.calls++;
            return super.analyzeModel(...args);
        }
    }
    const collector = new CountingCollector();
    const parser = new CoreFmlParser(collector);
    const analysis = parser.analyze(source);
    assert.equal(collector.calls, 1);
    assert.equal(analysis.status, "success");
    if (analysis.status !== "success") return;
    assert.equal(analysis.value.model.groups[0].name, "Main");
    assert.ok(analysis.value.propertyAnalysis.usages.some(usage => usage.path === "id"));
    const parsed = parser.parse(source);
    assert.equal(parsed.status, "success");
    if (parsed.status !== "success") return;
    assert.deepEqual(Object.keys(parsed.value).sort(), ["entryRule", "model", "sourceName"]);
    assert.deepEqual(parsed.value.model, analysis.value.model);
    assert.deepEqual(parsed.diagnostics, analysis.diagnostics);
});

test("defaults to R4 without modifying the caller's model configuration", () => {
    const analysis = analyzeLabFml(source);
    assert.equal(analysis.status, "success");
    if (analysis.status !== "success") return;
    assert.equal(analysis.value.model.sourceModelVersion, "R4");
    assert.equal(analysis.value.model.targetModelVersion, "R4");
    assert.equal(source.defaultFhirVersion, undefined);
});

test("preserves explicit defaults and canonical-derived source/target releases", () => {
    const configured = analyzeLabFml({...source, defaultFhirVersion: "R5"});
    assert.equal(configured.status, "success");
    if (configured.status !== "success") return;
    assert.equal(configured.value.model.sourceModelVersion, "R5");
    const crossVersion = analyzeLabFml({
        ...source,
        defaultFhirVersion: "R4",
        sourceText: source.sourceText
            .replace("fhir/StructureDefinition/Patient", "fhir/4.3/StructureDefinition/Patient")
            .replace("fhir/StructureDefinition/Patient", "fhir/5.0/StructureDefinition/Patient")
            .replace("src.id -> tgt.id;", ""),
    });
    assert.equal(crossVersion.status, "success");
    if (crossVersion.status !== "success") return;
    assert.equal(crossVersion.value.model.sourceModelVersion, "R4B");
    assert.equal(crossVersion.value.model.targetModelVersion, "R5");
});

test("passes supplied logical models through the existing Lab analysis", () => {
    const analysis = analyzeLabFml({
        sourceText: `
uses 'http://example.org/Source' alias Source as source
uses 'http://example.org/Target' alias Target as target
group Main(source src : Source, target tgt : Target) {
    src.value -> tgt.value;
}
`,
        profileBaseTypes: {"http://example.org/Source": "Source", "http://example.org/Target": "Target"},
        customTypeModels: {
            Source: {TypeName: "Source", Elements: [{ElementName: "value", Type: [{TypeName: "string"}]}]},
            Target: {TypeName: "Target", Elements: [{ElementName: "value", Type: [{TypeName: "string"}]}]},
        },
    });
    assert.equal(analysis.status, "success");
    if (analysis.status !== "success") return;
    assert.equal(analysis.value.propertyAnalysis.usages.length, 2);
    assert.ok(analysis.value.propertyAnalysis.usages.every(usage => !usage.unknownElement));
});

test("keeps strict parse errors and original source identity", async () => {
    const result = await new FmlExecutor().prepare({sourceName: "broken.fml", sourceText: "group {"});
    assert.equal(result.status, "failure");
    assert.ok(result.diagnostics.some(diagnostic => diagnostic.severity === "error"));
    assert.ok(result.diagnostics.every(diagnostic => diagnostic.sourceName === "broken.fml"));
});

test("prepares an executable program without serializing a StructureMap", async () => {
    const result = await new FmlExecutor().prepare(source);
    assert.equal(result.status, "success", JSON.stringify(result.diagnostics));
    if (result.status !== "success") return;
    assert.equal(result.value.groups.get("Main")?.name, "Main");
    assert.ok(!("resource" in result.value));
});

test("executes into caller-owned targets, snapshots trace and leaves input unchanged", async () => {
    const engine = new FmlExecutor();
    const prepared = await engine.prepare(source);
    assert.equal(prepared.status, "success");
    if (prepared.status !== "success") return;
    const input = Object.freeze({resourceType: "Patient", id: "input"});
    const target = {resourceType: "Patient"};
    const recorder = new FmlTraceRecorder();
    const result = await engine.execute({
        program: prepared.value,
        sources: [{name: "src", value: input}],
        targets: [{name: "tgt", value: target}],
    }, {trace: recorder});
    assert.equal(result.status, "success", JSON.stringify(result.diagnostics));
    assert.deepEqual(target, {resourceType: "Patient", id: "input"});
    assert.deepEqual(input, {resourceType: "Patient", id: "input"});
    assert.equal(recorder.status, "complete");
    assert.deepEqual(recorder.events[0].variables.find(variable => variable.name === "tgt")?.value, {resourceType: "Patient"});
    assert.equal(recorder.events.filter(event => event.phase === "enter").length,
        recorder.events.filter(event => event.phase === "exit").length);
});

async function executeMap(sourceText: string, input: unknown, options: Parameters<FmlExecutor["execute"]>[1] = {}) {
    const engine = new FmlExecutor();
    const prepared = await engine.prepare({sourceText});
    assert.equal(prepared.status, "success", JSON.stringify(prepared.diagnostics));
    if (prepared.status !== "success") throw new Error("Preparation failed.");
    const target: Record<string, unknown> = {resourceType: "Patient"};
    const result = await engine.execute({
        program: prepared.value, sources: [{name: "src", value: input}], targets: [{name: "tgt", value: target}],
    }, options);
    return {target, result, engine, program: prepared.value};
}

const patientDeclarations = source.sourceText.slice(0, source.sourceText.indexOf("group"));

test("expands repeating sources as Cartesian matches and keeps aliases lexical", async () => {
    const {target, result} = await executeMap(`${patientDeclarations}
group Main(source src : Patient, target tgt : TargetPatient) {
  src.name as n, src.identifier as i -> tgt.name as t then {
    n.family -> t.family;
    i.value -> t.given;
  };
}`, {resourceType: "Patient", name: [{family: "A"}, {family: "B"}], identifier: [{value: "1"}, {value: "2"}]});
    assert.equal(result.status, "success", JSON.stringify(result.diagnostics));
    assert.deepEqual(target.name, [
        {family: "A", given: ["1"]}, {family: "A", given: ["2"]},
        {family: "B", given: ["1"]}, {family: "B", given: ["2"]},
    ]);
});

test("supports per-candidate FHIRPath focus, explicit mapping variables and independent reruns", async () => {
    const executed = await executeMap(`${patientDeclarations}
group Main(source src : Patient, target tgt : TargetPatient) {
  src.name as n where (use = 'official') -> tgt.name as t then {
    n -> t.text = evaluate(n, family & ' ' & given.first());
  };
}`, {resourceType: "Patient", name: [{family: "No", use: "usual"}, {family: "Yes", use: "official", given: ["A"]}]});
    assert.equal(executed.result.status, "success", JSON.stringify(executed.result.diagnostics));
    assert.deepEqual(executed.target.name, [{text: "Yes A"}]);
    const next: Record<string, unknown> = {resourceType: "Patient"};
    const result = await executed.engine.execute({
        program: executed.program,
        sources: [{name: "src", value: {resourceType: "Patient", name: [{family: "Next", use: "official", given: ["B"]}]}}],
        targets: [{name: "tgt", value: next}],
    });
    assert.equal(result.status, "success");
    assert.deepEqual(next.name, [{text: "Next B"}]);
    assert.deepEqual(executed.target.name, [{text: "Yes A"}]);
});

test("copies extension-only primitives and aligns repeating primitive companions", async () => {
    const executed = await executeMap(`${patientDeclarations}
group Main(source src : Patient, target tgt : TargetPatient) {
  src.birthDate -> tgt.birthDate;
  src.name as n -> tgt.name as t then { n.given -> t.given; };
}`, {resourceType: "Patient", _birthDate: {id: "extension-only"}, name: [{
        given: [null, "A"], _given: [{id: "first"}, null],
    }]});
    assert.equal(executed.result.status, "success", JSON.stringify(executed.result.diagnostics));
    assert.deepEqual(executed.target, {resourceType: "Patient", _birthDate: {id: "extension-only"},
        name: [{given: [null, "A"], _given: [{id: "first"}, null]}]});
});

test("uses target model versions for cross-version literal/string writes", async () => {
    const declarations = patientDeclarations.replace("fhir/StructureDefinition/Patient", "fhir/4.3/StructureDefinition/Patient")
        .replace("fhir/StructureDefinition/Patient", "fhir/5.0/StructureDefinition/Patient");
    const executed = await executeMap(`${declarations}
group Main(source src : Patient, target tgt : TargetPatient) { src.id as v -> tgt.id = append(v); }`,
    {resourceType: "Patient", id: "cross-version"});
    assert.equal(executed.result.status, "success", JSON.stringify(executed.result.diagnostics));
    assert.equal(executed.target.id, "cross-version");
});

test("awaits injected terminology and isolates invocation options", async () => {
    const executed = await executeMap(`${patientDeclarations}
group Main(source src : Patient, target tgt : TargetPatient) {
 src.gender as v -> tgt.gender = translate(v, 'http://example.org/map', 'code');
}`, {resourceType: "Patient", gender: "male"}, {
        translate: async binding => [{name: "translated", value: binding.value === "male" ? "female" : "unknown", typeName: "code"}],
    });
    assert.equal(executed.result.status, "success", JSON.stringify(executed.result.diagnostics));
    assert.equal(executed.target.gender, "female");
    const failed = await executed.engine.execute({program: executed.program,
        sources: [{name: "src", value: {resourceType: "Patient", gender: "male"}}],
        targets: [{name: "tgt", value: {resourceType: "Patient"}}]});
    assert.equal(failed.status, "failure");
    assert.match(failed.diagnostics[0].message, /host service is required/);
});

test("preserves precision-sensitive JSON numbers across parse/copy/stringify", async () => {
    const engine = new FmlExecutor();
    const prepared = await engine.prepare({sourceText: `
uses 'http://hl7.org/fhir/StructureDefinition/Observation' alias O as source
uses 'http://hl7.org/fhir/StructureDefinition/Observation' alias T as target
group Main(source src : O, target tgt : T) { src.valueQuantity -> tgt.valueQuantity; }`});
    assert.equal(prepared.status, "success", JSON.stringify(prepared.diagnostics));
    if (prepared.status !== "success") return;
    const input = parseFmlJson('{"resourceType":"Observation","valueQuantity":{"value":9007199254740993.0001}}');
    const target = {resourceType: "Observation"};
    const result = await engine.execute({program: prepared.value,
        sources: [{name: "src", value: input}], targets: [{name: "tgt", value: target}]});
    assert.equal(result.status, "success", JSON.stringify(result.diagnostics));
    assert.equal(stringifyFmlJson(target), '{"resourceType":"Observation","valueQuantity":{"value":9007199254740993.0001}}');
});

test("binds bare mapping aliases without guessing expression focus", async () => {
    const prepared = await new FmlExecutor().prepare({sourceText: `${patientDeclarations}
group Main(source src : Patient, target tgt : TargetPatient) {
 src.name as n where (n.use = 'official') -> tgt.name;
}`});
    assert.equal(prepared.status, "success", JSON.stringify(prepared.diagnostics));
    const primitiveAlias = await new FmlExecutor().prepare({sourceText: `${patientDeclarations}
group Main(source src : Patient, target tgt : TargetPatient) { src.id -> tgt.id as idTarget; }`});
    assert.equal(primitiveAlias.status, "success", JSON.stringify(primitiveAlias.diagnostics));
});

test("selects only the requested group and accepts multiple explicit roots", async () => {
    const engine = new FmlExecutor();
    const prepared = await engine.prepare({sourceText: `${patientDeclarations}
group First(source src : Patient, target tgt : TargetPatient) { src.id -> tgt.id; }
group Second(source left : Patient, source right : Patient, target a : TargetPatient, target b : TargetPatient) {
 left.id -> a.id;
 right.id -> b.id;
}`});
    assert.equal(prepared.status, "success", JSON.stringify(prepared.diagnostics));
    if (prepared.status !== "success") return;
    const first = {resourceType: "Patient"};
    const second = {resourceType: "Patient"};
    const result = await engine.execute({program: prepared.value, entryGroup: "Second",
        sources: [{name: "left", value: {resourceType: "Patient", id: "left"}},
            {name: "right", value: {resourceType: "Patient", id: "right"}}],
        targets: [{name: "a", value: first}, {name: "b", value: second}]});
    assert.equal(result.status, "success", JSON.stringify(result.diagnostics));
    assert.deepEqual(first, {resourceType: "Patient", id: "left"});
    assert.deepEqual(second, {resourceType: "Patient", id: "right"});
});

test("preserves alias identity for later targets in the same rule", async () => {
    const executed = await executeMap(`${patientDeclarations}
group Main(source src : Patient, target tgt : TargetPatient) {
 src.id as v -> tgt.name = create('HumanName') as n, n.family = append(v);
}`, {resourceType: "Patient", id: "name"});
    assert.equal(executed.result.status, "success", JSON.stringify(executed.result.diagnostics));
    assert.deepEqual(executed.target.name, [{family: "name"}]);
});

test("later sources see earlier aliases and predicates run for every candidate", async () => {
    const executed = await executeMap(`${patientDeclarations}
group Main(source src : Patient, target tgt : TargetPatient) {
 src.name as n, n.given as g where ($this != 'skip') -> tgt.name as t then {
   g -> t.given;
 };
}`, {resourceType: "Patient", name: [{given: ["skip", "one"]}, {given: ["two"]}]});
    assert.equal(executed.result.status, "success", JSON.stringify(executed.result.diagnostics));
    assert.deepEqual(executed.target.name, [{given: ["one"]}, {given: ["two"]}]);
});

test("inactive and bounded tracing preserve outputs without delivering extra events", async () => {
    const inactive = await executeMap(source.sourceText, {resourceType: "Patient", id: "trace"}, {
        trace: {recording: false, onEvent: () => assert.fail("Inactive observer called.")},
    });
    assert.equal(inactive.result.status, "success");
    const recorder = new FmlTraceRecorder(1);
    const active = await executeMap(source.sourceText, {resourceType: "Patient", id: "trace"}, {trace: recorder});
    assert.equal(active.result.status, "success");
    assert.deepEqual(active.target, inactive.target);
    assert.equal(recorder.events.length, 1);
    assert.equal(recorder.status, "truncated");
});

test("direct literal assignments retain Boolean and exact numeric value kinds", async () => {
    const executed = await executeMap(`${patientDeclarations}
group Main(source src : Patient, target tgt : TargetPatient) {
 src -> tgt.active = true;
}`, {resourceType: "Patient"});
    assert.equal(executed.result.status, "success", JSON.stringify(executed.result.diagnostics));
    assert.match(stringifyFmlJson(executed.target), /"active":true/);
    const engine = new FmlExecutor();
    const prepared = await engine.prepare({sourceText: `
uses 'http://hl7.org/fhir/StructureDefinition/Observation' alias O as source
uses 'http://hl7.org/fhir/StructureDefinition/Observation' alias T as target
group Main(source src : O, target tgt : T) {
 src -> tgt.valueQuantity = create('Quantity') as q, q.value = 9007199254740993.0001;
}`});
    assert.equal(prepared.status, "success", JSON.stringify(prepared.diagnostics));
    if (prepared.status !== "success") return;
    const request = createSingleInputRequest(prepared.value, {resourceType: "Observation"});
    const result = await engine.execute(request);
    assert.equal(result.status, "success", JSON.stringify(result.diagnostics));
    assert.match(stringifyFmlJson(request.targets[0].value), /"value":9007199254740993\.0001/);
});

test("preserves existing StructureMap compilation independently of executor preparation", async () => {
    const result = await new FmlValidatorApi().compile(source);
    assert.equal(result.status, "success");
    if (result.status !== "success") return;
    assert.equal(result.value.resource.resourceType, "StructureMap");
});

for (const format of ["commonjs", "module"]) {
    test(`loads the built ${format} package exports in a fresh process`, async () => {
        const code = format === "module"
            ? "import {FmlExecutor,analyzeLabFml} from '@fhirpath-lab/fml-executor'; import {discoverFmlCorpus} from '@fhirpath-lab/fml-executor/testing';"
            : "const {FmlExecutor,analyzeLabFml}=require('@fhirpath-lab/fml-executor'); const {discoverFmlCorpus}=require('@fhirpath-lab/fml-executor/testing');";
        await promisify(execFile)(process.execPath, [
            `--input-type=${format}`,
            "--eval",
            `${code} if(typeof FmlExecutor!=='function'||typeof analyzeLabFml!=='function'||typeof discoverFmlCorpus!=='function')process.exit(1);`,
        ]);
    });
}

test("public executor entry bundles for the browser without Node, testing or editor dependencies", async () => {
    const result = await build({
        entryPoints: ["@fhirpath-lab/fml-executor"],
        bundle: true,
        platform: "browser",
        format: "esm",
        write: false,
        metafile: true,
        logLevel: "silent",
    });
    const dependencies = Object.keys(result.metafile.inputs);
    assert.ok(dependencies.every(path => !path.includes("src/testing/")));
    assert.ok(dependencies.every(path => !path.includes("vscode-extension/src")));
    assert.ok(result.outputFiles[0].contents.length > 0);
});
