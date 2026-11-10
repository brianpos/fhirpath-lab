import * as assert from "node:assert/strict";
import {promises as fs} from "node:fs";
import os from "node:os";
import path from "node:path";
import {FmlLocalDebugService} from "@fhirpath-lab/debug-service";
import {RuleCoverageCollector} from "../FmlTestCoverage";
import {buildLcov, buildPropertyReport} from "../FmlTestReport";
import {
    defaultContextProvider, describeMap, discoverTestSets, FmlTestRunner, resolveTestConfig,
    type ContextProvider, type ResolvedTestConfig,
} from "../FmlTestRunner";

const sourceProfile = "http://example.test/StructureDefinition/SourcePractitioner";
const targetProfile = "http://example.test/StructureDefinition/TargetPractitioner";
const profileBaseTypes = {[sourceProfile]: "Practitioner", [targetProfile]: "Practitioner"};
const input = {
    resourceType: "Practitioner", id: "example", gender: "female",
    meta: {profile: [sourceProfile]}, name: [{given: ["Example"]}],
};

function mapText(source: string, target: string): string {
    return `uses '${source}' alias S as source
uses '${target}' alias T as target
group Main(source src : S, target tgt : T) {
 src.id as value -> tgt.id = value "copyId";
 src.name as name -> tgt.name as targetName then {
  name.given as value -> targetName.given = value "copyGiven";
 } "copyName";
 src.gender as value where ($this = 'male') -> tgt.gender = value "copyGender";
 src.birthDate as value -> tgt.birthDate = value "copyBirthDate";
}`;
}

const context: ContextProvider = async (map, maps) => ({
    ...await defaultContextProvider(map, maps), profileBaseTypes, defaultFhirVersion: "R4",
});

suite("FML test coverage", function() {
    this.timeout(20_000);
    let directory: string;
    let config: ResolvedTestConfig;

    setup(async () => {
        directory = await fs.mkdtemp(path.join(os.tmpdir(), "fml-coverage-tests-"));
        config = resolveTestConfig(path.join(directory, ".fml-tests.json"), {maps: "maps", inputs: "inputs"});
        await fs.mkdir(config.maps);
        await fs.mkdir(config.inputs);
        await fs.writeFile(path.join(config.inputs, "input.json"), JSON.stringify(input));
    });

    teardown(async () => {
        await fs.rm(directory, {recursive: true, force: true, maxRetries: 5, retryDelay: 100});
    });

    test("counts compacted hits separately from skips and attributes them to the correct file", () => {
        const text = mapText(sourceProfile, targetProfile);
        const collector = new RuleCoverageCollector();
        collector.registerFile("main.fml", path.join(config.maps, "main.fml"), text);
        collector.registerFile("imported.fml", path.join(config.maps, "imported.fml"), text);
        const location = "StructureMap.group[0].rule[0]";
        collector.record([
            {phase: "step", traceLocation: location},
            {phase: "step", traceLocation: location},
            {phase: "enter", traceLocation: location, mapFileName: "imported.fml"},
            {phase: "exit", traceLocation: location, mapFileName: "imported.fml"},
            {phase: "step", traceLocation: "StructureMap.group[0].rule[2]",
                messages: [{name: "coverage", text: ["filtered"]}]},
            {phase: "step", traceLocation: "StructureMap.group[0].rule[3]",
                messages: [{name: "coverage", text: ["no-source-values"]}]},
            {phase: "step", traceLocation: `${location}.source[0]`},
            {phase: "step", traceLocation: `${location}.target[0]`},
            {phase: "step", traceLocation: location, mapFileName: "unknown.fml"},
        ], "main.fml");
        const files = collector.results();
        assert.equal(files.length, 2);
        const main = files.find(file => file.fileName === "main.fml");
        const imported = files.find(file => file.fileName === "imported.fml");
        assert.ok(main);
        assert.ok(imported);
        assert.deepEqual([...main.hits], [[location, 2]]);
        assert.deepEqual([...imported.hits], [[location, 1]]);
        assert.deepEqual(main.skips.get("StructureMap.group[0].rule[2]"), {filtered: 1, noSourceValues: 0});
        assert.deepEqual(main.skips.get("StructureMap.group[0].rule[3]"), {filtered: 0, noSourceValues: 1});
        assert.match(buildLcov([main]), /DA:4,2\n/);
    });

    for (const profiled of [false, true]) {
        test(`${profiled ? "profile" : "core"} maps have the same hit counts in compacted and full traces`, async () => {
            const text = mapText(
                profiled ? sourceProfile : "http://hl7.org/fhir/StructureDefinition/Practitioner",
                profiled ? targetProfile : "http://hl7.org/fhir/StructureDefinition/Practitioner");
            const coverage = new RuleCoverageCollector();
            const full = new RuleCoverageCollector();
            const filePath = path.join(config.maps, "main.fml");
            for (const detail of ["coverage", "full"] as const) {
                const response = await new FmlLocalDebugService().execute({
                    mapText: text, maps: [{fileName: "main.fml", filePath, text}],
                    inputText: JSON.stringify(input), defaultFhirVersion: "R4", profileBaseTypes,
                    localTrace: {detail},
                });
                assert.ok(response.result, JSON.stringify(response.outcome));
                const collector = detail === "coverage" ? coverage : full;
                collector.registerFile("main.fml", filePath, text);
                collector.record(response.trace, "main.fml");
            }
            const compactedFile = coverage.results()[0];
            const fullFile = full.results()[0];
            assert.ok(compactedFile);
            assert.ok(fullFile);
            assert.deepEqual([...compactedFile.hits].sort(), [...fullFile.hits].sort());
            assert.equal(compactedFile.hits.size, 3);
            assert.equal(compactedFile.sites.length, 5);
            assert.deepEqual([...compactedFile.hits.values()], [1, 1, 1]);
            assert.deepEqual(compactedFile.skips.get("StructureMap.group[0].rule[2]"), {filtered: 1, noSourceValues: 0});
            assert.deepEqual(compactedFile.skips.get("StructureMap.group[0].rule[3]"), {filtered: 0, noSourceValues: 1});
            assert.match(buildLcov([compactedFile]), /LH:3\n/);
        });
    }

    for (const coverage of [false, true]) {
        test(`uses the project FHIR version for profile property analysis with coverage ${coverage ? "on" : "off"}`, async () => {
            const filePath = path.join(config.maps, "main.fml");
            const text = mapText(sourceProfile, targetProfile);
            await fs.writeFile(filePath, text);
            const sets = await discoverTestSets(config, [], context);
            assert.equal(sets.length, 1);
            assert.equal(sets[0].map.sourceVersion, "R4");
            assert.equal(sets[0].map.targetVersion, "R4");
            const map = describeMap(filePath, text, profileBaseTypes);
            const runner = new FmlTestRunner(config, {context, coverage});
            const result = await runner.runCase(map, sets[0].inputs[0]);
            assert.equal(result.status, "passed", result.error ?? JSON.stringify(result.messages));
            const usage = runner.usage.get(filePath);
            assert.ok(usage);
            assert.equal(usage.map.sourceVersion, "R4");
            assert.equal(usage.map.targetVersion, "R4");
            assert.ok(usage.sourcePresent.has("Practitioner.name.given"));
            assert.ok(usage.sourcePresent.has("Practitioner.gender"));
            assert.ok(usage.targetPresent.has("Practitioner.name.given"));
            assert.ok(!usage.targetPresent.has("Practitioner.gender"));
            const report = buildPropertyReport(runner.usage.values(), runner.coverage.results());
            const [sourceSection, targetSection] = report.split("**Target properties never produced");
            assert.match(sourceSection, /`Practitioner.birthDate`/);
            assert.doesNotMatch(sourceSection, /`Practitioner.gender`/);
            assert.match(targetSection, /`Practitioner.gender`/);
            if (coverage) {
                assert.match(report, /\*\*Rules executed:\*\* 3\/5/);
            }
        });

        test(`uses the project FHIR version for output structure checks with coverage ${coverage ? "on" : "off"}`, async () => {
            const text = `uses '${sourceProfile}' alias S as source
uses 'http://hl7.org/fhir/StructureDefinition/Observation' alias T as target
group Main(source src : S, target tgt : T) { src.id as value -> tgt.id = value; }`;
            const filePath = path.join(config.maps, "main.fml");
            await fs.writeFile(filePath, text);
            const runner = new FmlTestRunner(config, {context, coverage});
            const result = await runner.runCase(describeMap(filePath, text, profileBaseTypes), {
                filePath: path.join(config.inputs, "input.json"), relativePath: "input.json",
            });
            assert.equal(result.status, "failed", result.error);
            assert.ok(result.messages.some(message => message.kind === "structure"
                && message.text.includes("Missing required property 'status' on Observation.")));
        });
    }

    test("preserves explicit cross-version source and target releases over the project default", async () => {
        const text = `uses 'http://hl7.org/fhir/4.0/StructureDefinition/Patient' alias S as source
uses 'http://hl7.org/fhir/5.0/StructureDefinition/Patient' alias T as target
group Main(source src : S, target tgt : T) { src.active -> tgt.active = true; }`;
        const filePath = path.join(config.maps, "main.fml");
        await fs.writeFile(filePath, text);
        await fs.writeFile(path.join(config.inputs, "input.json"), '{"resourceType":"Patient","active":true}');
        const differentDefault: ContextProvider = async (map, maps) => ({
            ...await defaultContextProvider(map, maps), defaultFhirVersion: "STU3",
        });
        const sets = await discoverTestSets(config, [], differentDefault);
        assert.equal(sets.length, 1);
        assert.equal(sets[0].map.sourceVersion, "R4");
        assert.equal(sets[0].map.targetVersion, "R5");
        const runner = new FmlTestRunner(config, {context: differentDefault, coverage: true});
        const result = await runner.runCase(sets[0].map, sets[0].inputs[0]);
        assert.equal(result.status, "passed", result.error ?? JSON.stringify(result.messages));
        const usage = runner.usage.get(filePath);
        assert.ok(usage);
        assert.ok(usage.sourcePresent.has("Patient.active"));
        assert.ok(usage.targetPresent.has("Patient.active"));
        assert.equal(usage.map.sourceVersion, "R4");
        assert.equal(usage.map.targetVersion, "R5");
    });

    test("applies the project FHIR version to reverse maps loaded outside discovery", async () => {
        config.reverseMaps = path.join(directory, "reverse");
        await fs.mkdir(config.reverseMaps);
        const copy = (source: string, target: string): string => `uses '${source}' alias S as source
uses '${target}' alias T as target
group Main(source src : S, target tgt : T) { src.id as value -> tgt.id = value; }`;
        const forwardPath = path.join(config.maps, "forward.fml");
        const reversePath = path.join(config.reverseMaps, "reverse.fml");
        await fs.writeFile(forwardPath, copy(sourceProfile, targetProfile));
        await fs.writeFile(reversePath, copy(targetProfile, sourceProfile));
        await fs.writeFile(path.join(config.inputs, "input.json"),
            JSON.stringify({resourceType: "Practitioner", id: "example"}));
        const runner = new FmlTestRunner(config, {context, coverage: true});
        const result = await runner.runCase(
            describeMap(forwardPath, await fs.readFile(forwardPath, "utf8"), profileBaseTypes),
            {filePath: path.join(config.inputs, "input.json"), relativePath: "input.json"});
        assert.equal(result.status, "passed", result.error ?? JSON.stringify(result.messages));
        for (const filePath of [forwardPath, reversePath]) {
            const usage = runner.usage.get(filePath);
            assert.ok(usage);
            assert.equal(usage.map.sourceVersion, "R4");
            assert.equal(usage.map.targetVersion, "R4");
            assert.equal(usage.map.sourceType, "Practitioner");
            assert.equal(usage.map.targetType, "Practitioner");
            assert.ok(usage.sourcePresent.has("Practitioner.id"));
            assert.ok(usage.targetPresent.has("Practitioner.id"));
        }
    });
});
