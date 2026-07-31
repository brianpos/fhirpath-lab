import assert from "node:assert/strict";
import test from "node:test";
import {WorkspaceFmlIndex, matchesCanonicalImport} from "../WorkspaceFmlIndex";

test("matches exact and wildcard canonical imports", () => {
    assert.equal(matchesCanonicalImport(
        "http://example.org/StructureMap/Common*",
        "http://example.org/StructureMap/CommonPatient",
    ), true);
    assert.equal(matchesCanonicalImport(
        "http://example.org/StructureMap/Common?",
        "http://example.org/StructureMap/CommonA",
    ), true);
    assert.equal(matchesCanonicalImport(
        "http://example.org/StructureMap/Common",
        "http://example.org/StructureMap/CommonPatient",
    ), false);
});

test("updates canonical URL entries when a file is reindexed", () => {
    const index = new WorkspaceFmlIndex();
    index.set("file:///map.fml", {
        canonicalUrls: ["http://example.org/old"],
        definitions: [],
        imports: [],
        references: [],
    });
    index.set("file:///map.fml", {
        canonicalUrls: ["http://example.org/new"],
        definitions: [],
        imports: [],
        references: [],
    });

    assert.equal(index.getStats().canonicalUrlCount, 1);
    assert.deepEqual(index.get("file:///map.fml")?.canonicalUrls, ["http://example.org/new"]);
});

test("finds documents that depend on an indexed canonical URL", () => {
    const index = new WorkspaceFmlIndex();
    index.set("file:///target.fml", {
        canonicalUrls: ["http://example.org/StructureMap/CommonPatient"],
        definitions: [],
        imports: [],
        references: [],
    });
    index.set("file:///source.fml", {
        canonicalUrls: ["http://example.org/StructureMap/Source"],
        definitions: [],
        imports: ["http://example.org/StructureMap/Common*"],
        references: [],
    });

    assert.deepEqual([...index.getDependentDocumentUris("file:///target.fml")], ["file:///source.fml"]);
});
