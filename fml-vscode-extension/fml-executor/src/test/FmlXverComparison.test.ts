import assert from "node:assert/strict";
import {mkdir, mkdtemp, readFile, rm, writeFile} from "node:fs/promises";
import {tmpdir} from "node:os";
import {join} from "node:path";
import test from "node:test";
import {parseFmlJson} from "../index";
import {
    compareXverJson, loadXverTerminology, normalizeJsonNumber, runXverComparison, validateXverPaths,
    type XverComparisonOptions,
} from "../testing/xver-comparison";

const patientMap = `
map 'http://example.org/Patient4to3' = Patient4to3
uses 'http://hl7.org/fhir/4.0/StructureDefinition/Patient' alias P as source
uses 'http://hl7.org/fhir/3.0/StructureDefinition/Patient' alias T as target
group Patient(source src : P, target tgt : T) { src.id as v -> tgt.id = append(v); }
`;

async function fixture(t: test.TestContext): Promise<XverComparisonOptions> {
    const root = await mkdtemp(join(tmpdir(), "fml-xver-comparison-"));
    t.after(() => rm(root, {recursive: true, force: true}));
    const options = {corpusPath: join(root, "corpus"), examplesPath: join(root, "inputs"),
        referencePath: join(root, "references"), outputPath: join(root, "outputs")};
    await Promise.all([
        mkdir(join(options.corpusPath, "input", "R4toR3"), {recursive: true}),
        mkdir(join(options.corpusPath, "input", "codes"), {recursive: true}),
        mkdir(join(options.corpusPath, "input", "resources"), {recursive: true}),
        mkdir(options.examplesPath), mkdir(options.referencePath),
    ]);
    await Promise.all([
        writeFile(join(options.corpusPath, "input", "R4toR3", "Patient.fml"), patientMap),
        writeFile(join(options.corpusPath, "input", "codes", "ConceptMap-example.json"), JSON.stringify({
            resourceType: "ConceptMap", url: "http://example.org/new-map",
            relatedArtifact: [{type: "predecessor", resource: "http://example.org/old-map"}],
            group: [{source: "http://example.org/source", target: "http://example.org/target",
                element: [{code: "a", target: [{code: "A"}]}]}],
        })),
    ]);
    return options;
}

async function addResource(options: XverComparisonOptions, fileName: string, expectedId: string | null = "example") {
    await writeFile(join(options.examplesPath, fileName), '{"resourceType":"Patient","id":"example"}');
    if (expectedId !== null) await writeFile(join(options.referencePath, fileName), JSON.stringify({id: expectedId, resourceType: "Patient"}));
}

for (const [left, right] of [["1", "1.000"], ["-0", "0e999"], ["12.34", "1234e-2"],
    ["9007199254740993.0001", "90071992547409930001e-4"], ["1e123456789", "10e123456788"]]) {
    test(`numeric comparison preserves exact mathematical equality: ${left} vs ${right}`, () => {
        assert.equal(normalizeJsonNumber(left), normalizeJsonNumber(right));
        assert.deepEqual(compareXverJson(parseFmlJson(left), parseFmlJson(right)), []);
    });
}

test("comparison ignores object ordering but not numeric differences, strings, array order or primitive companions", () => {
    assert.deepEqual(compareXverJson(parseFmlJson('{"a":1,"b":2}'), parseFmlJson('{"b":2.0,"a":1e0}')), []);
    assert.equal(compareXverJson(parseFmlJson("9007199254740993"), parseFmlJson("9007199254740992")).length, 1);
    assert.equal(compareXverJson(parseFmlJson("1"), "1").length, 1);
    assert.equal(compareXverJson(["a", "b"], ["b", "a"])[0].path, "$[0]");
    assert.equal(compareXverJson({_birthDate: {id: "metadata"}}, {})[0].reason, "Missing property.");
    assert.equal(compareXverJson({given: [null, "A"]}, {given: ["A"]})[0].reason, "Different array length.");
    assert.equal(compareXverJson({a: 1, b: 2, c: 3}, {}, 2).length, 2);
});

test("configured corpus paths are absolute and cannot be overwritten by outputs or reports", async t => {
    const options = await fixture(t);
    await assert.rejects(validateXverPaths({...options, corpusPath: "relative"}), /absolute/);
    await assert.rejects(validateXverPaths({...options, outputPath: options.examplesPath}), /separate/);
    await assert.rejects(validateXverPaths({...options, outputPath: join(options.referencePath, "nested")}), /separate/);
    await assert.rejects(validateXverPaths({...options, reportPath: join(options.corpusPath, "report.json")}), /separate/);
    assert.equal((await validateXverPaths(options)).outputPath, options.outputPath);
});

test("local terminology registers canonical and predecessor aliases and preserves explicit service failures", async t => {
    const options = await fixture(t);
    const terminology = await loadXverTerminology(join(options.corpusPath, "input"));
    assert.equal(terminology.mapCount, 1);
    assert.equal(terminology.urlCount, 2);
    const values = await terminology.translate({name: "source", value: "a"}, "http://example.org/old-map", "Coding");
    assert.deepEqual(values[0].value, {system: "http://example.org/target", code: "A"});
    await assert.rejects(terminology.translate({name: "source", value: "missing"}, "http://example.org/new-map", "code"), /no translation/);
    await assert.rejects(terminology.translate({name: "source", value: "a"}, "http://example.org/absent", "code"), /No local ConceptMap/);
});

test("prepares once per type, preserves inputs, writes separate outputs and compares reference JSON", async t => {
    const options = await fixture(t);
    await addResource(options, "patient-a.json");
    await addResource(options, "patient-b.json");
    await writeFile(join(options.referencePath, "patient-b.json"), '\uFEFF{"id":"example","resourceType":"Patient"}');
    const before = await readFile(join(options.examplesPath, "patient-a.json"), "utf8");
    const report = await runXverComparison(options);
    assert.equal(report.summary.pass, 2);
    assert.equal(report.summary.outputsWritten, 2);
    assert.equal(report.preparations.length, 1);
    assert.equal(report.cases[0].targetType, "Patient");
    assert.equal(await readFile(join(options.examplesPath, "patient-a.json"), "utf8"), before);
    assert.equal(JSON.parse(await readFile(join(options.outputPath, "comparison-report.json"), "utf8")).summary.pass, 2);
});

test("groups interleaved input types so only the current prepared import graph is retained", async t => {
    const options = await fixture(t);
    await writeFile(join(options.corpusPath, "input", "R4toR3", "Observation.fml"),
        patientMap.replaceAll("Patient", "Observation"));
    for (const [fileName, resourceType] of [["a.json", "Patient"], ["b.json", "Observation"],
        ["c.json", "Patient"], ["d.json", "Observation"]]) {
        const text = JSON.stringify({resourceType, id: "example"});
        await writeFile(join(options.examplesPath, fileName), text);
        await writeFile(join(options.referencePath, fileName), text);
    }
    const report = await runXverComparison(options);
    assert.equal(report.summary.pass, 4);
    assert.equal(report.preparations.length, 2);
    assert.deepEqual(report.cases.map(result => result.sourceType), ["Observation", "Observation", "Patient", "Patient"]);
});

test("classifies output disagreements, absent references, invalid inputs and unmapped types separately", async t => {
    const options = await fixture(t);
    await addResource(options, "mismatch.json", "different");
    await addResource(options, "missing.json", null);
    await writeFile(join(options.examplesPath, "invalid.json"), "{}");
    await writeFile(join(options.examplesPath, "observation.json"), '{"resourceType":"Observation"}');
    const report = await runXverComparison(options);
    assert.equal(report.summary.statuses["output-mismatch"], 1);
    assert.equal(report.summary.statuses["missing-reference"], 1);
    assert.equal(report.summary.statuses["input-invalid"], 1);
    assert.equal(report.summary.statuses.unmapped, 1);
    assert.equal(report.summary.pass, 0);
    assert.equal(report.cases.find(result => result.fileName === "mismatch.json")?.mismatches?.[0].path, '$["id"]');
});

test("preparation blockers are cached and not reported as output comparison passes", async t => {
    const options = await fixture(t);
    await addResource(options, "patient-a.json");
    await addResource(options, "patient-b.json");
    await writeFile(join(options.corpusPath, "input", "R4toR3", "Patient.fml"),
        patientMap.replace("group Patient", "imports 'http://example.org/missing'\ngroup Patient"));
    const report = await runXverComparison(options);
    assert.equal(report.summary.statuses["preparation-failure"], 2);
    assert.equal(report.preparations.length, 1);
    assert.equal(report.summary.outputsWritten, 0);
    assert.ok(report.preparations[0].diagnostics.some(diagnostic => /Unresolved map import/.test(diagnostic.message)));
});

test("existing converted output files and report files are never silently overwritten", async t => {
    const options = await fixture(t);
    await addResource(options, "patient.json");
    await mkdir(options.outputPath);
    await writeFile(join(options.outputPath, "patient.json"), "do not overwrite");
    const report = await runXverComparison(options);
    assert.equal(report.summary.statuses["output-error"], 1);
    assert.equal(await readFile(join(options.outputPath, "patient.json"), "utf8"), "do not overwrite");
    await assert.rejects(runXverComparison(options), /EEXIST/);
});

test("runtime service blockers are execution failures and cannot trigger network fallback", async t => {
    const options = await fixture(t);
    await writeFile(join(options.corpusPath, "input", "R4toR3", "Patient.fml"),
        patientMap.replace("src.id as v -> tgt.id = append(v);",
            "src -> tgt.id = append((%src.generalPractitioner.resolve().id));"));
    await writeFile(join(options.examplesPath, "patient.json"),
        '{"resourceType":"Patient","generalPractitioner":[{"reference":"http://127.0.0.1:1/not-used"}]}');
    const report = await runXverComparison(options);
    assert.equal(report.preparations[0].status, "success", JSON.stringify(report.preparations[0].diagnostics));
    assert.equal(report.summary.statuses["execution-failure"], 1);
    assert.ok(report.cases[0].diagnostics?.some(diagnostic => /network resolution is disabled/.test(diagnostic.message)));
    assert.equal(report.summary.outputsWritten, 0);
});

test("missing corpus directories and empty/non-JSON input folders fail explicitly", async t => {
    const options = await fixture(t);
    await assert.rejects(runXverComparison({...options, corpusPath: join(options.corpusPath, "missing")}), /ENOENT/);
    await assert.rejects(runXverComparison(options), /No R4 example files/);
    await writeFile(join(options.examplesPath, "not-json.txt"), "invalid");
    await assert.rejects(runXverComparison(options), /JSON input files only/);
});
