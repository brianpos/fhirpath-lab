import * as assert from "node:assert";
import {promises as fs} from "node:fs";
import os from "node:os";
import path from "node:path";
import {loadConceptMapResources, parseFmlTestConfig} from "../FmlTestController";
import {compareJson, discoverTestInputs, filterNotConverted, globToRegExp, matchesFilter} from "../FmlTestSupport";

suite("FML test support", () => {
    test("filter matches map or input paths", () => {
        assert.ok(matchesFilter([], "A.fml", "x/y.json"));
        assert.ok(matchesFilter(["org"], "Organization4to5.fml", "Organization/a.json"));
        assert.ok(matchesFilter(["*/hs-*.json"], "m.fml", "HealthcareService/hs-1.json"));
        assert.ok(!matchesFilter(["Location"], "Organization4to5.fml", "Organization/a.json"));
    });

    test("propertyNotConverted ignores missing properties only", () => {
        const expected = {resourceType: "Patient", contact: [{name: {text: "x"}, gender: "male"}]};
        const actual = {resourceType: "Patient", contact: [{gender: "female"}]};
        const filtered = filterNotConverted(compareJson(expected, actual), expected, ["Patient.contact.name"]);
        assert.strictEqual(filtered.length, 1);
        assert.ok(filtered[0].path.includes("gender"));
    });

    test("globs match file names", () => {
        assert.ok(globToRegExp("Patient*.json").test("Patient-1.json"));
        assert.ok(!globToRegExp("Patient*.json").test("Observation-1.json"));
    });

    test("discovers json inputs recursively with groups and filter", async () => {
        const dir = await fs.mkdtemp(path.join(os.tmpdir(), "fml-tests-"));
        try {
            await fs.mkdir(path.join(dir, "Patient"));
            await fs.writeFile(path.join(dir, "Patient", "a.json"), "{}");
            await fs.writeFile(path.join(dir, "Patient", "b.txt"), "x");
            await fs.writeFile(path.join(dir, "o.json"), "{}");
            const all = await discoverTestInputs(dir);
            assert.deepStrictEqual(all.map(file => file.relativePath), ["Patient/a.json", "o.json"]);
            assert.strictEqual(all[0].group, "Patient");
            assert.deepStrictEqual((await discoverTestInputs(dir, ["o*.json"])).map(file => file.relativePath), ["o.json"]);
        } finally {
            await fs.rm(dir, {recursive: true, force: true});
        }
    });

    test("compares json ignoring key order", () => {
        assert.deepStrictEqual(compareJson({a: 1, b: [1, 2]}, {b: [1, 2], a: 1}), []);
        assert.strictEqual(compareJson({a: 1}, {a: 2})[0].path, "$.a");
    });

    test("validates config", () => {
        assert.throws(() => parseFmlTestConfig("{}"));
        assert.throws(() => parseFmlTestConfig('{"maps":"m","inputs":"i","engine":"x"}'));
        assert.strictEqual(parseFmlTestConfig('{"maps":"m","inputs":"i"}').maps, "m");
    });

    test("loads ConceptMaps from files and bundles only", async () => {
        const dir = await fs.mkdtemp(path.join(os.tmpdir(), "fml-cm-"));
        try {
            const cm = {resourceType: "ConceptMap", url: "http://x/cm1"};
            await fs.writeFile(path.join(dir, "a.json"), JSON.stringify(cm));
            await fs.writeFile(path.join(dir, "b.json"), JSON.stringify({resourceType: "Bundle", entry: [{resource: {...cm, url: "http://x/cm2"}}, {resource: {resourceType: "Patient"}}]}));
            await fs.writeFile(path.join(dir, "c.json"), JSON.stringify({resourceType: "Patient"}));
            const loaded = await loadConceptMapResources(dir);
            assert.deepStrictEqual(loaded.map(item => (item as {url: string}).url), ["http://x/cm1", "http://x/cm2"]);
        } finally {
            await fs.rm(dir, {recursive: true, force: true});
        }
    });
});
