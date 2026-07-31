import assert from "node:assert/strict";
import test from "node:test";
import {FmlLanguageService} from "../FmlLanguageService";

const service = new FmlLanguageService();

test("maps validator errors to bounded editor-neutral diagnostics", async () => {
    const result = await service.validateDocument({
        uri: "file:///invalid.fml",
        text: "group example(source src, target tgt) { src -> tgt.id = uuid('bad'); }",
    });

    assert.equal(result.errorCount, 1);
    assert.equal(result.warningCount, 0);
    assert.equal(result.diagnostics[0].severity, "error");
    assert.equal(result.diagnostics[0].source, "FHIR Mapping Language Tools");
    assert.ok(result.diagnostics[0].range.start.line >= 0);
    assert.ok(result.diagnostics[0].range.end.character <= 72);
});

test("keeps unknown transforms as successful warning diagnostics", async () => {
    const result = await service.validateDocument({
        uri: "file:///custom.fml",
        text: "group example(source src, target tgt) { src -> tgt.id = customTransform(src); }",
    });

    assert.equal(result.errorCount, 0);
    assert.equal(result.warningCount, 1);
    assert.match(result.diagnostics[0].message, /Unknown transform/);
});

test("offers standard transforms in assignment position", () => {
    const text = "src -> tgt.value = tr";
    const completions = service.getCompletions({
        uri: "file:///completion.fml",
        text,
        position: {line: 0, character: text.length},
    });

    assert.ok(completions.some(completion => completion.label === "truncate"));
    assert.ok(completions.some(completion => completion.label === "translate"));
    assert.equal(completions[0].snippet, true);
});

test("does not offer transform completions outside assignments", () => {
    const text = "group example";
    assert.deepEqual(service.getCompletions({
        uri: "file:///completion.fml",
        text,
        position: {line: 0, character: text.length},
    }), []);
});

test("maps group definitions and references to editor-neutral ranges", () => {
    const text = `
group Parent(source src, target tgt) {
}
group Child(source src, target tgt) extends Parent {
    src -> tgt then Parent(src, tgt);
}
`;
    const symbols = service.getGroupSymbols({
        uri: "file:///groups.fml",
        text,
    });

    assert.deepEqual(symbols.definitions.map(symbol => symbol.name), ["Parent", "Child"]);
    assert.deepEqual(symbols.references.map(symbol => symbol.kind), ["extends", "invocation"]);
    assert.deepEqual(symbols.definitions[0].range.start, {line: 1, character: 6});
    assert.deepEqual(symbols.references[0].range.start, {line: 3, character: 44});
    assert.deepEqual(symbols.references[1].range.start, {line: 4, character: 20});
});

test("provides canonical URLs and import patterns for workspace indexing", () => {
    const symbols = service.getDocumentSymbols({
        uri: "file:///indexed.fml",
        text: `
/// url = 'http://example.org/StructureMap/Indexed'
imports 'http://example.org/StructureMap/Common*'
group Indexed(source src, target tgt) {
}
`,
    });

    assert.deepEqual(symbols.canonicalUrls, ["http://example.org/StructureMap/Indexed"]);
    assert.deepEqual(symbols.imports, ["http://example.org/StructureMap/Common*"]);
});
