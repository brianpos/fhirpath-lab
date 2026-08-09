import assert from "node:assert/strict";
import test from "node:test";
import {DocumentFmlSymbols} from "@fhirpath-lab/language-service";
import {findGroupDefinitions, findGroupReferences, getUnresolvedGroupDiagnostics} from "../groupDefinitionProvider";
import {WorkspaceFmlIndex} from "../WorkspaceFmlIndex";

const sourceUri = "file:///source.fml";
const targetUri = "file:///target.fml";
const index = new WorkspaceFmlIndex();
index.set(sourceUri, {
        canonicalUrls: ["http://example.org/StructureMap/Source"],
    defaultGroups: [],
    groupSignatures: [],
        definitions: [],
        imports: ["http://example.org/StructureMap/Target*"],
        references: [{
            name: "CopyName",
            kind: "invocation",
            range: {
                start: {line: 2, character: 20},
                end: {line: 2, character: 28},
            },
        }],
    });
index.set(targetUri, {
        canonicalUrls: ["http://example.org/StructureMap/TargetMap"],
    defaultGroups: [],
    groupSignatures: [],
        definitions: [{
            name: "CopyName",
            range: {
                start: {line: 5, character: 6},
                end: {line: 5, character: 14},
            },
        }],
        imports: [],
        references: [],
    });

test("finds matching group definitions across documents", () => {
    const locations = findGroupDefinitions(index, sourceUri, {line: 2, character: 24});

    assert.equal(locations?.length, 1);
    assert.equal(locations?.[0].uri, targetUri);
    assert.deepEqual(locations?.[0].range.start, {line: 5, character: 6});
});

test("returns no definition outside group references", () => {
    assert.equal(findGroupDefinitions(index, sourceUri, {line: 1, character: 0}), null);
});

test("treats reference ranges as end-exclusive", () => {
    assert.equal(findGroupDefinitions(index, sourceUri, {line: 2, character: 28}), null);
});

test("does not navigate to groups outside imported canonical URLs", () => {
    const unimportedIndex = new WorkspaceFmlIndex();
    const source = index.get(sourceUri) as DocumentFmlSymbols;
    const target = index.get(targetUri) as DocumentFmlSymbols;
    unimportedIndex.set(sourceUri, {...source, imports: []});
    unimportedIndex.set(targetUri, target);

    assert.equal(findGroupDefinitions(unimportedIndex, sourceUri, {line: 2, character: 24}), null);
});

test("finds reverse references from a group definition", () => {
    const locations = findGroupReferences(index, targetUri, {line: 5, character: 8}, false);

    assert.equal(locations?.length, 1);
    assert.equal(locations?.[0].uri, sourceUri);
    assert.deepEqual(locations?.[0].range.start, {line: 2, character: 20});
});

test("finds references from an invocation and optionally includes the declaration", () => {
    const locations = findGroupReferences(index, sourceUri, {line: 2, character: 24}, true);

    assert.equal(locations?.length, 2);
    assert.ok(locations?.some(location => location.uri === sourceUri));
    assert.ok(locations?.some(location => location.uri === targetUri));
});

test("reports unresolved group references as warnings", () => {
    index.delete(targetUri);
    const diagnostics = getUnresolvedGroupDiagnostics(index, sourceUri);

    assert.equal(diagnostics.length, 1);
    assert.equal(diagnostics[0].severity, "warning");
    assert.match(diagnostics[0].message, /CopyName/);
    index.set(targetUri, {
        canonicalUrls: ["http://example.org/StructureMap/TargetMap"],
        defaultGroups: [],
        groupSignatures: [],
        definitions: [{
            name: "CopyName",
            range: {
                start: {line: 5, character: 6},
                end: {line: 5, character: 14},
            },
        }],
        imports: [],
        references: [],
    });
});
