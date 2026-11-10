import assert from "node:assert/strict";
import test from "node:test";
import {FmlLanguageService} from "@fhirpath-lab/language-service";
import {WorkspaceFmlIndex, matchesCanonicalImport} from "../WorkspaceFmlIndex";

test("cached evaluation expands a dense cyclic 170-map graph once per unique source, including canonical aliases", () => {
    const index = new WorkspaceFmlIndex();
    for (let i = 0; i < 170; i++) {
        index.set(`file:///dense/${i}.fml`, {
            canonicalUrls: [`http://example.test/dense/${i}`, `http://example.test/dense/${i}/alias`],
            defaultGroups: [], groupSignatures: [], definitions: [], references: [], imports: ["http://example.test/dense/*"],
        }, {text: `cached map ${i}`});
    }
    const imported = index.getImportedDocumentUris.bind(index);
    let expansions = 0;
    index.getImportedDocumentUris = uri => { expansions++; return imported(uri); };
    const snapshots = index.getEvaluationMaps("file:///dense/0.fml");
    assert.equal(snapshots.length, 170);
    assert.equal(new Set(snapshots.map(snapshot => snapshot.uri)).size, 170);
    assert.equal(expansions, 170);
    assert.equal(snapshots[0].text, "cached map 0");
    assert.ok(snapshots.every(snapshot => snapshot.version === undefined));
});

test("source snapshots follow updates, deletion and clear without retaining stale versions or text", () => {
    const index = new WorkspaceFmlIndex();
    const service = new FmlLanguageService();
    const document = {uri: "file:///source.fml", text: "group Main(source src, target tgt) { }"};
    const symbols = service.getDocumentSymbols(document);
    index.set(document.uri, symbols, {text: document.text, version: 2});
    assert.deepEqual(index.getEvaluationMaps(document.uri), [{...document, version: 2}]);
    index.set(document.uri, symbols, {text: "new closed text"});
    assert.deepEqual(index.getEvaluationMaps(document.uri), [{uri: document.uri, text: "new closed text"}]);
    index.delete(document.uri);
    assert.throws(() => index.getEvaluationMaps(document.uri), /Re-index/);
    index.set(document.uri, symbols, {text: document.text, version: 3});
    index.clear();
    assert.throws(() => index.getEvaluationMaps(document.uri), /Re-index/);
    index.set(document.uri, symbols);
    assert.throws(() => index.getEvaluationMaps(document.uri), /source content is not cached/);
});

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

test("validates extends against indexed imports and updates diagnostics when the base signature changes", async () => {
    const index = new WorkspaceFmlIndex();
    const service = new FmlLanguageService();
    const baseUri = "file:///base.fml";
    const caller = {uri: "file:///dosage.fml", text: `
uses 'http://hl7.org/fhir/4.0/StructureDefinition/Dosage' alias S as source
uses 'http://hl7.org/fhir/3.0/StructureDefinition/Dosage' alias T as target
imports 'http://example.org/Base'
group Main(source src : S, target tgt : T) extends Base { }
`};
    const baseText = `
/// url = "http://example.org/Base"
uses 'http://hl7.org/fhir/4.0/StructureDefinition/BackboneElement' alias S as source
uses 'http://hl7.org/fhir/3.0/StructureDefinition/BackboneElement' alias T as target
group Base(source src : S, target tgt : T) { }
`;
    index.set(baseUri, service.getDocumentSymbols({uri: baseUri, text: baseText}));
    index.set(caller.uri, service.getDocumentSymbols(caller));
    const before = await service.validateDocument(caller, [], index.getImportedGroupSignatures(caller.uri));
    assert.equal(before.errorCount, 1, JSON.stringify(before.diagnostics));
    assert.match(before.diagnostics[0].message, /cannot extend 'Base'.*Dosage.*BackboneElement/);
    index.set(baseUri, service.getDocumentSymbols({
        uri: baseUri, text: baseText.replace("3.0/StructureDefinition/BackboneElement", "3.0/StructureDefinition/Element"),
    }));
    assert.ok(index.getDependentDocumentUris(baseUri).has(caller.uri));
    const after = await service.validateDocument(caller, [], index.getImportedGroupSignatures(caller.uri));
    assert.equal(after.errorCount, 0, JSON.stringify(after.diagnostics));
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
    assert.deepEqual(index.getImportedDocumentUris("file:///source.fml"), ["file:///imported.fml"]);
});

test("resolves authored and rendered copies of an imported canonical only once during folder validation", async () => {
    const index = new WorkspaceFmlIndex();
    const service = new FmlLanguageService();
    const caller = {
        uri: "file:///workspace/input/examples/imports.fml",
        text: `
/// url = 'http://example.org/StructureMap/Imports'
imports 'http://example.org/StructureMap/Simple*'
imports 'http://example.org/StructureMap/SimpleIdentity'
group Main(source src, target tgt) { src -> tgt then SimpleIdentity(src, tgt); }
`,
    };
    const mapText = `
/// url = 'http://example.org/StructureMap/SimpleIdentity'
uses 'http://hl7.org/fhir/StructureDefinition/Patient' as source
uses 'http://hl7.org/fhir/StructureDefinition/Patient' as target
group SimpleIdentity(source src : Patient, target tgt : Patient) <<types>> {
  src.id -> tgt.id;
}
`;
    const authoredUri = "file:///workspace/input/examples/simple-identity.fml";
    const renderedUri = "file:///workspace/examples-rendered/simple-identity.fml";
    for (const uri of [renderedUri, authoredUri]) {
        index.set(uri, service.getDocumentSymbols({uri, text: mapText}));
    }
    index.set(caller.uri, service.getDocumentSymbols(caller));

    assert.deepEqual(index.getImportedDocumentUris(caller.uri), [authoredUri]);
    assert.equal(index.getImportedGroupSignatures(caller.uri).length, 1);
    assert.equal(index.getImportedDefaultGroups(caller.uri).length, 1);
    const result = await service.validateDocument(
        caller,
        index.getImportedDefaultGroups(caller.uri),
        index.getImportedGroupSignatures(caller.uri),
    );
    assert.equal(result.errorCount, 0, JSON.stringify(result.diagnostics));

    const renderedCaller = {...caller, uri: "file:///workspace/examples-rendered/imports.fml"};
    index.set(renderedCaller.uri, service.getDocumentSymbols(renderedCaller));
    assert.deepEqual(index.getImportedDocumentUris(renderedCaller.uri), [renderedUri]);
    assert.equal(index.getStats().fileCount, 4);

    index.delete(authoredUri);
    assert.deepEqual(index.getImportedDocumentUris(caller.uri), [renderedUri]);
    index.set(authoredUri, service.getDocumentSymbols({uri: authoredUri, text: mapText}));
    assert.deepEqual(index.getImportedDocumentUris(caller.uri), [authoredUri]);
});

test("does not import another copy of the current map through a matching wildcard", async () => {
    const index = new WorkspaceFmlIndex();
    const service = new FmlLanguageService();
    const text = `
/// url = 'http://example.org/StructureMap/Shared'
imports 'http://example.org/StructureMap/*'
group Shared(source src, target tgt) { }
`;
    const caller = {uri: "file:///workspace/input/shared.fml", text};
    const copyUri = "file:///workspace/rendered/shared.fml";
    index.set(copyUri, service.getDocumentSymbols({uri: copyUri, text}));
    index.set(caller.uri, service.getDocumentSymbols(caller));
    assert.deepEqual(index.getImportedDocumentUris(caller.uri), []);
    const result = await service.validateDocument(caller, [], index.getImportedGroupSignatures(caller.uri));
    assert.equal(result.errorCount, 0, JSON.stringify(result.diagnostics));
});

test("keeps duplicate declaration errors for different imported canonicals", async () => {
    const index = new WorkspaceFmlIndex();
    const service = new FmlLanguageService();
    const caller = {
        uri: "file:///workspace/main.fml",
        text: "imports 'http://example.org/StructureMap/Shared*'\ngroup Main(source src, target tgt) { }",
    };
    for (const name of ["SharedA", "SharedB"]) {
        const document = {
            uri: `file:///workspace/${name}.fml`,
            text: `/// url = 'http://example.org/StructureMap/${name}'\ngroup Copy(source src, target tgt) { }`,
        };
        index.set(document.uri, service.getDocumentSymbols(document));
    }
    index.set(caller.uri, service.getDocumentSymbols(caller));
    const result = await service.validateDocument(caller, [], index.getImportedGroupSignatures(caller.uri));
    assert.equal(result.diagnostics.filter(diagnostic => diagnostic.message.includes("already declared")).length, 1);
    assert.equal(index.getImportedDocumentUris(caller.uri).length, 2);
});

test("selects equally close canonical copies deterministically, independently of indexing order", () => {
    const service = new FmlLanguageService();
    const caller = {
        uri: "file:///workspace/source/main.fml",
        text: "imports 'http://example.org/StructureMap/Shared'\ngroup Main(source src, target tgt) { }",
    };
    const copies = ["file:///workspace/a/shared.fml", "file:///workspace/b/shared.fml"];
    for (const uris of [copies, [...copies].reverse()]) {
        const index = new WorkspaceFmlIndex();
        for (const uri of uris) {
            index.set(uri, service.getDocumentSymbols({
                uri,
                text: "/// url = 'http://example.org/StructureMap/Shared'\ngroup Shared(source src, target tgt) { }",
            }));
        }
        index.set(caller.uri, service.getDocumentSymbols(caller));
        assert.deepEqual(index.getImportedDocumentUris(caller.uri), [copies[0]]);
    }
});
