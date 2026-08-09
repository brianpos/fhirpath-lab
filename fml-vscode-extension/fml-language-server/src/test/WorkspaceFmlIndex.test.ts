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
        defaultGroups: [],
        groupSignatures: [],
        definitions: [],
        imports: [],
        references: [],
    });
    index.set("file:///map.fml", {
        canonicalUrls: ["http://example.org/new"],
        defaultGroups: [],
        groupSignatures: [],
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
        defaultGroups: [],
        groupSignatures: [],
        definitions: [],
        imports: [],
        references: [],
    });
    index.set("file:///source.fml", {
        canonicalUrls: ["http://example.org/StructureMap/Source"],
        defaultGroups: [],
        groupSignatures: [],
        definitions: [],
        imports: ["http://example.org/StructureMap/Common*"],
        references: [],
    });

    assert.deepEqual([...index.getDependentDocumentUris("file:///target.fml")], ["file:///source.fml"]);
});

test("returns default groups only from directly imported maps", () => {
    const index = new WorkspaceFmlIndex();
    const importedGroup = {
        groupName: "BooleanToCode",
        typeMode: "types" as const,
        sourceTypeName: "boolean",
        targetTypeName: "code",
    };
    index.set("file:///source.fml", {
        canonicalUrls: ["http://example.org/StructureMap/Source"],
        defaultGroups: [],
        groupSignatures: [],
        definitions: [],
        imports: ["http://example.org/StructureMap/Common*"],
        references: [],
    });
    index.set("file:///imported.fml", {
        canonicalUrls: ["http://example.org/StructureMap/CommonConversions"],
        defaultGroups: [importedGroup],
        groupSignatures: [],
        definitions: [],
        imports: [],
        references: [],
    });
    index.set("file:///unimported.fml", {
        canonicalUrls: ["http://example.org/StructureMap/Other"],
        defaultGroups: [{...importedGroup, groupName: "Unimported"}],
        groupSignatures: [],
        definitions: [],
        imports: [],
        references: [],
    });

    assert.deepEqual(index.getImportedDefaultGroups("file:///source.fml"), [importedGroup]);
});

test("returns group signatures only from directly imported maps", () => {
    const index = new WorkspaceFmlIndex();
    const importedSignature = {
        groupName: "CopyCoding",
        parameters: [{
            name: "src",
            mode: "source" as const,
            typeName: "Coding",
            fhirVersion: "R5" as const,
            resolution: "declared" as const,
        }],
    };
    index.set("file:///source.fml", {
        canonicalUrls: ["http://example.org/StructureMap/Source"],
        defaultGroups: [],
        groupSignatures: [],
        definitions: [],
        imports: ["http://example.org/StructureMap/Common*"],
        references: [],
    });
    index.set("file:///imported.fml", {
        canonicalUrls: ["http://example.org/StructureMap/CommonGroups"],
        defaultGroups: [],
        groupSignatures: [importedSignature],
        definitions: [],
        imports: [],
        references: [],
    });
    index.set("file:///unimported.fml", {
        canonicalUrls: ["http://example.org/StructureMap/Other"],
        defaultGroups: [],
        groupSignatures: [{...importedSignature, groupName: "Unimported"}],
        definitions: [],
        imports: [],
        references: [],
    });

    assert.deepEqual(index.getImportedGroupSignatures("file:///source.fml"), [importedSignature]);
});
