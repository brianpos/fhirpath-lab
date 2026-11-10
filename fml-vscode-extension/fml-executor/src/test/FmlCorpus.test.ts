import assert from "node:assert/strict";
import {mkdir, mkdtemp, rm, writeFile} from "node:fs/promises";
import {tmpdir} from "node:os";
import {join} from "node:path";
import test from "node:test";
import {discoverFmlCorpus, loadFmlCorpusFixture} from "../testing/corpus";

async function createCorpus(t: test.TestContext): Promise<string> {
    const root = await mkdtemp(join(tmpdir(), "fml-executor-corpus-"));
    t.after(() => rm(root, {recursive: true, force: true}));
    await Promise.all([
        mkdir(join(root, "input", "examples"), {recursive: true}),
        mkdir(join(root, "othermaps")),
        mkdir(join(root, "test-input-resources")),
        mkdir(join(root, "test-output-resources")),
    ]);
    return root;
}

async function addCase(root: string, id = "identity"): Promise<void> {
    await Promise.all([
        writeFile(join(root, "input", "examples", `${id}.fml`), "group Main(source src, target tgt) { src.id -> tgt.id; }"),
        writeFile(join(root, "test-input-resources", `${id}.json`), '{"resourceType":"Patient","id":"example"}'),
        writeFile(join(root, "test-output-resources", `${id}.json`), '{"id":"example","resourceType":"Patient"}'),
    ]);
}

test("discovers filename pairs and preserves exact fixture text without importing it into assets", async t => {
    const root = await createCorpus(t);
    await addCase(root);
    const cases = await discoverFmlCorpus({root});
    assert.equal(cases.length, 1);
    assert.equal(cases[0].id, "identity");
    assert.deepEqual(cases[0].issues, []);
    const fixture = await loadFmlCorpusFixture(cases[0]);
    assert.equal(fixture.source.sourceName, join(root, "input", "examples", "identity.fml"));
    assert.equal(fixture.expectedOutputText, '{"id":"example","resourceType":"Patient"}');
    assert.equal(fixture.inputText, '{"resourceType":"Patient","id":"example"}');
});

test("ignores numbered outputs and backup files, never treating them as an oracle", async t => {
    const root = await createCorpus(t);
    await addCase(root);
    await mkdir(join(root, "test-output-resources2"));
    await Promise.all([
        writeFile(join(root, "test-output-resources2", "extra.json"), "{}"),
        writeFile(join(root, "test-output-resources", "identity.json.bak"), "not JSON"),
        writeFile(join(root, "input", "examples", "extra.fml.bak"), "not FML"),
    ]);
    const cases = await discoverFmlCorpus({root});
    assert.deepEqual(cases.map(fixture => fixture.id), ["identity"]);
});

test("reports missing maps, inputs and expected outputs rather than dropping incomplete cases", async t => {
    const root = await createCorpus(t);
    await Promise.all([
        writeFile(join(root, "othermaps", "no-output.fml"), "group Main(source src, target tgt) {}"),
        writeFile(join(root, "test-input-resources", "no-output.json"), "{}"),
        writeFile(join(root, "test-output-resources", "orphan.json"), "{}"),
    ]);
    const cases = await discoverFmlCorpus({root});
    assert.deepEqual(cases.map(fixture => [fixture.id, fixture.issues]), [
        ["no-output", ["Missing expected output resource."]],
        ["orphan", ["Missing FML map.", "Missing input resource."]],
    ]);
    await assert.rejects(loadFmlCorpusFixture(cases[0]), /Incomplete corpus case 'no-output'/);
});

test("preserves relative subfolders when pairing cases", async t => {
    const root = await createCorpus(t);
    await Promise.all([
        mkdir(join(root, "input", "examples", "nested")),
        mkdir(join(root, "test-input-resources", "nested")),
        mkdir(join(root, "test-output-resources", "nested")),
    ]);
    await addCase(root, join("nested", "identity"));
    const cases = await discoverFmlCorpus({root});
    assert.equal(cases[0].id, "nested/identity");
    assert.deepEqual(cases[0].issues, []);
});

test("rejects ambiguous filename pairs across map folders", async t => {
    const root = await createCorpus(t);
    await addCase(root);
    await writeFile(join(root, "othermaps", "identity.fml"), "different map");
    await assert.rejects(discoverFmlCorpus({root}), /Duplicate mapPath for corpus case 'identity'/);
});

test("fails explicitly for an empty or missing configured corpus", async t => {
    const root = await createCorpus(t);
    await assert.rejects(discoverFmlCorpus({root: ""}), /must not be empty/);
    await assert.rejects(discoverFmlCorpus({root}), /No FML corpus cases/);
    await assert.rejects(discoverFmlCorpus({root: join(root, "missing")}), /ENOENT/);
});

test("reports malformed expected JSON with its filename and original cause", async t => {
    const root = await createCorpus(t);
    await addCase(root);
    await writeFile(join(root, "test-output-resources", "identity.json"), "{");
    const cases = await discoverFmlCorpus({root});
    await assert.rejects(loadFmlCorpusFixture(cases[0]), error => {
        assert.ok(error instanceof Error);
        assert.match(error.message, /Invalid JSON fixture .*identity\.json/);
        assert.ok(error.cause instanceof SyntaxError);
        return true;
    });
});

test("retains precision-sensitive numeric and primitive-companion expectations unchanged", async t => {
    const root = await createCorpus(t);
    await addCase(root);
    const expected = '{"valueDecimal":9007199254740993.0001,"given":[null,"A"],"_given":[{"id":"x"},null]}';
    await writeFile(join(root, "test-output-resources", "identity.json"), expected);
    const cases = await discoverFmlCorpus({root});
    const fixture = await loadFmlCorpusFixture(cases[0]);
    assert.equal(fixture.expectedOutputText, expected);
});
