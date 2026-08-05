import * as assert from "node:assert";
import {promises as fs} from "node:fs";
import os from "node:os";
import path from "node:path";
import {
    DocumentValidationResult,
    FmlServerStatus,
    WorkspaceIndexResult,
} from "@fhirpath-lab/language-service";
import * as vscode from "vscode";
import {formatStatusSummary} from "../FmlLanguageServerStatus";
import {
    parseSushiConfiguration,
    resolveProfileBaseTypes,
    resolveWorkspaceModelResourcePaths,
    resolveWorkspaceProfileTypes,
} from "../SushiConfigWatcher";
import {UiConstants} from "../constants/UiConstants";

suite("FHIR Mapping Language Tools Extension", () => {
    suiteSetup(async () => {
        const extension = vscode.extensions.getExtension(UiConstants.extensionPublisher);
        if (!extension) {
            assert.fail("Extension not found");
        }
        await openFmlDocument("group example(source src, target tgt) { src -> tgt.id = uuid(); }");
        await waitForExtensionActivation(extension);
    });

    test("extension should be active", () => {
        const extension = vscode.extensions.getExtension(UiConstants.extensionPublisher);
        assert.ok(extension?.isActive);
    });

    test("reads FHIR version and package cache indexes from sushi-config", () => {
        const cachePath = path.join("cache", "packages");
        const expectedUsCoreIndex = path.join(
            cachePath,
            "hl7.fhir.us.core#6.2.0",
            "package",
            ".index.json",
        );
        const configuration = parseSushiConfiguration(`
fhirVersion: 4.0.1
dependencies:
  hl7.fhir.us.core:
    id: uscore
    version: 6.2.0
  ch.fhir.ig.ch-core: 2.1.0
`, cachePath, filePath => filePath === expectedUsCoreIndex);

        assert.equal(configuration.fhirVersion, "4.0.1");
        assert.deepEqual(configuration.dependencies, [
            {
                indexExists: true,
                indexPath: expectedUsCoreIndex,
                packageId: "hl7.fhir.us.core",
                version: "6.2.0",
            },
            {
                indexExists: false,
                indexPath: path.join(
                    cachePath,
                    "ch.fhir.ig.ch-core#2.1.0",
                    "package",
                    ".index.json",
                ),
                packageId: "ch.fhir.ig.ch-core",
                version: "2.1.0",
            },
        ]);
    });

    test("resolves profile canonicals to base resource types from package indexes", async () => {
        const packageDirectory = await fs.mkdtemp(path.join(os.tmpdir(), "fml-package-"));
        const indexPath = path.join(packageDirectory, ".index.json");
        const profileUrl = "http://example.org/fhir/StructureDefinition/CustomPractitioner";
        try {
            await fs.writeFile(indexPath, JSON.stringify({
                files: [{
                    filename: "StructureDefinition-CustomPractitioner.json",
                    resourceType: "StructureDefinition",
                    url: profileUrl,
                }],
            }), "utf8");
            await fs.writeFile(
                path.join(packageDirectory, "StructureDefinition-CustomPractitioner.json"),
                JSON.stringify({
                    resourceType: "StructureDefinition",
                    type: "Practitioner",
                    url: profileUrl,
                }),
                "utf8",
            );

            const profileBaseTypes = await resolveProfileBaseTypes([{
                indexExists: true,
                indexPath,
                packageId: "example.fhir.package",
                version: "1.0.0",
            }]);

            assert.equal(profileBaseTypes[profileUrl], "Practitioner");
        } finally {
            await fs.rm(packageDirectory, {recursive: true, force: true});
        }
    });

    test("detects logical models from package StructureDefinition entries", async () => {
        const packageDirectory = await fs.mkdtemp(path.join(os.tmpdir(), "fml-logical-package-"));
        const indexPath = path.join(packageDirectory, ".index.json");
        const canonical = "http://example.org/StructureDefinition/ClaimRow";
        try {
            await fs.writeFile(indexPath, JSON.stringify({files: [{
                filename: "StructureDefinition-ClaimRow.json",
                resourceType: "StructureDefinition",
                url: canonical,
            }]}));
            await fs.writeFile(path.join(packageDirectory, "StructureDefinition-ClaimRow.json"), JSON.stringify({
                resourceType: "StructureDefinition",
                url: canonical,
                name: "ClaimRow",
                type: canonical,
                kind: "logical",
                derivation: "specialization",
                differential: {element: [
                    {id: "ClaimRow", path: "ClaimRow"},
                    {id: "ClaimRow.claimNumber", path: "ClaimRow.claimNumber", type: [{code: "string"}]},
                ]},
            }));

            const resolutions = await resolveWorkspaceProfileTypes(packageDirectory, [{
                indexExists: true,
                indexPath,
                packageId: "example.logical",
                version: "1.0.0",
            }]);

            assert.equal(resolutions[canonical].kind, "logical");
            assert.equal(resolutions[canonical].typeName, canonical);
        } finally {
            await fs.rm(packageDirectory, {recursive: true, force: true});
        }
    });

    test("workspace output profiles override package profiles and retain provenance", async () => {
        const workspaceDirectory = await fs.mkdtemp(path.join(os.tmpdir(), "fml-workspace-"));
        const packageDirectory = path.join(workspaceDirectory, "package");
        const outputDirectory = path.join(workspaceDirectory, "output");
        const canonical = "http://example.org/StructureDefinition/LocalProfile";
        try {
            await fs.mkdir(packageDirectory);
            await fs.mkdir(outputDirectory);
            const indexPath = path.join(packageDirectory, ".index.json");
            await fs.writeFile(indexPath, JSON.stringify({files: [
                {
                    filename: "StructureDefinition-LocalProfile.json",
                    resourceType: "StructureDefinition",
                    url: canonical,
                },
                {
                    filename: "ConceptMap-Local.json",
                    resourceType: "ConceptMap",
                    url: "http://example.org/ConceptMap/Local",
                },
            ]}));
            await fs.writeFile(
                path.join(packageDirectory, "StructureDefinition-LocalProfile.json"),
                JSON.stringify({resourceType: "StructureDefinition", type: "Patient", url: canonical}),
            );
            const conceptMapPath = path.join(packageDirectory, "ConceptMap-Local.json");
            await fs.writeFile(
                conceptMapPath,
                JSON.stringify({resourceType: "ConceptMap", url: "http://example.org/ConceptMap/Local"}),
            );
            const outputPath = path.join(outputDirectory, "StructureDefinition-LocalProfile.json");
            await fs.writeFile(
                outputPath,
                JSON.stringify({resourceType: "StructureDefinition", type: "Practitioner", url: canonical}),
            );

            const resolutions = await resolveWorkspaceProfileTypes(workspaceDirectory, [{
                indexExists: true,
                indexPath,
                packageId: "example.package",
                version: "1.0.0",
            }]);

            assert.equal(resolutions[canonical].typeName, "Practitioner");
            assert.equal(resolutions[canonical].source.toLowerCase(), outputPath.toLowerCase());
            const modelResourcePaths = await resolveWorkspaceModelResourcePaths(
                workspaceDirectory,
                [{
                    indexExists: true,
                    indexPath,
                    packageId: "example.package",
                    version: "1.0.0",
                }],
                resolutions,
            );
            assert.ok(modelResourcePaths.some(candidate => candidate.toLowerCase() === outputPath.toLowerCase()));
            assert.ok(modelResourcePaths.some(candidate => candidate.toLowerCase() === conceptMapPath.toLowerCase()));
        } finally {
            await fs.rm(workspaceDirectory, {recursive: true, force: true});
        }
    });

    test("commands should be registered", async () => {
        const commands = await vscode.commands.getCommands(true);
        assert.ok(commands.includes("fmlTools.InsertTemplate"));
        assert.ok(commands.includes("fmlTools.Validation"));
        assert.ok(commands.includes("fmlTools.OpenPreviewToSide"));
        assert.ok(commands.includes("fmlTools.ShowLanguageServerStatus"));
        assert.ok(commands.includes("fmlTools.ReindexLanguageServer"));
        assert.ok(commands.includes("fmlTools.RestartLanguageServer"));
    });

    test("language server status summary includes diagnostic counts", () => {
        const status: FmlServerStatus = {
            state: "ready",
            fileCount: 12,
            canonicalUrlCount: 10,
            groupCount: 31,
            importCount: 4,
            openDocumentCount: 2,
            failedFileCount: 1,
            durationMs: 88,
            startedAt: "2026-07-31T00:00:00.000Z",
            lastIndexedAt: "2026-07-31T00:01:00.000Z",
        };

        const summary = formatStatusSummary(status);
        assert.match(summary, /Workspace files: 12/);
        assert.match(summary, /Canonical URLs: 10/);
        assert.match(summary, /Groups: 31/);
        assert.match(summary, /Index failures: 1/);
    });

    test("re-index command returns workspace index statistics", async () => {
        const result = await vscode.commands.executeCommand<WorkspaceIndexResult>(
            "fmlTools.ReindexLanguageServer",
        );

        assert.ok(result);
        assert.ok(result.fileCount >= 0);
        assert.ok(result.canonicalUrlCount >= 0);
        assert.ok(result.durationMs >= 0);
    });

    test("language server restart restores realtime validation", async function() {
        this.timeout(10_000);
        await vscode.commands.executeCommand("fmlTools.RestartLanguageServer");
        const document = await openFmlDocument(
            "group restartTest(source src, target tgt) { src -> tgt.id = uuid('bad'); }",
        );
        const diagnostics = await waitForDiagnostics(document.uri, current => {
            return current.some(diagnostic => diagnostic.severity === vscode.DiagnosticSeverity.Error);
        });

        assert.ok(diagnostics.some(diagnostic => diagnostic.message.includes("received 1 parameter")));
    });

    test("restart during an index operation starts a fresh index", async function() {
        this.timeout(10_000);
        const inFlightIndex = vscode.commands.executeCommand<WorkspaceIndexResult>(
            "fmlTools.ReindexLanguageServer",
        );
        const restart = vscode.commands.executeCommand(
            "fmlTools.RestartLanguageServer",
        );
        await Promise.all([inFlightIndex, restart]);

        const freshIndex = await vscode.commands.executeCommand<WorkspaceIndexResult>(
            "fmlTools.ReindexLanguageServer",
        );
        assert.ok(freshIndex);
        assert.ok(freshIndex.fileCount >= 0);
    });

    test("validation diagnostics should update after unsaved edits", async () => {
        const invalidFml = "group example(source src, target tgt) { src -> tgt.id = uuid('bad'); }";
        const validFml = "group example(source src, target tgt) { src -> tgt.id = uuid(); }";
        const document = await openFmlDocument(invalidFml);

        const invalidDiagnostics = await waitForDiagnostics(document.uri, diagnostics => {
            return diagnostics.some(diagnostic => diagnostic.severity === vscode.DiagnosticSeverity.Error);
        });
        assert.ok(invalidDiagnostics.some(diagnostic => diagnostic.message.includes("received 1 parameter")));

        const edit = new vscode.WorkspaceEdit();
        edit.replace(document.uri, fullDocumentRange(document), validFml);
        assert.ok(await vscode.workspace.applyEdit(edit));
        assert.equal(document.isDirty, true);

        const validDiagnostics = await waitForDiagnostics(document.uri, diagnostics => {
            return diagnostics.every(diagnostic => diagnostic.severity === vscode.DiagnosticSeverity.Information);
        });
        assert.ok(validDiagnostics.every(diagnostic => {
            return diagnostic.severity === vscode.DiagnosticSeverity.Information;
        }));
    });

    test("unknown transforms should appear as warnings", async () => {
        const document = await openFmlDocument(
            "group example(source src, target tgt) { src -> tgt.id = customTransform(src); }",
        );

        const diagnostics = await waitForDiagnostics(document.uri, current => {
            return current.some(diagnostic => diagnostic.severity === vscode.DiagnosticSeverity.Warning);
        });

        assert.ok(diagnostics.some(diagnostic => diagnostic.message.includes("Unknown transform")));
        assert.equal(diagnostics[0].source, "FHIR Mapping Language Tools");
    });

    test("language server should provide transform completions", async () => {
        const text = "group example(source src, target tgt) { src -> tgt.value = tr";
        const document = await openFmlDocument(text);
        const completionList = await vscode.commands.executeCommand<vscode.CompletionList>(
            "vscode.executeCompletionItemProvider",
            document.uri,
            document.positionAt(text.length),
        );

        assert.ok(completionList.items.some(item => item.label === "truncate"));
        assert.ok(completionList.items.some(item => item.label === "translate"));
    });

    test("language server should provide typed FHIR property completions", async () => {
        const text = [
            "uses 'http://hl7.org/fhir/5.0/StructureDefinition/Patient' alias Patient as source",
            "group example(source src : Patient, target tgt : Patient) {",
            "    src.na -> tgt.name;",
            "}",
        ].join("\n");
        const document = await openFmlDocument(text);
        const offset = text.indexOf("src.na") + "src.na".length;
        const completionList = await vscode.commands.executeCommand<vscode.CompletionList>(
            "vscode.executeCompletionItemProvider",
            document.uri,
            document.positionAt(offset),
        );
        const name = completionList.items.find(item => item.label === "name");

        assert.ok(name);
        assert.equal(completionList.items.filter(item => item.label === "name").length, 1);
        assert.ok(completionList.items.every(item => !String(item.label).includes("build IG")));
        assert.equal(name.kind, vscode.CompletionItemKind.Property);
        assert.match(name.detail ?? "", /HumanName \[0\.\.\*\] \(R5\)/);
    });

    test("language server should complete children in unfinished source and target rules", async () => {
        for (const [variable, rule] of [
            ["src.", "src."],
            ["tgt.", "src.name -> tgt."],
        ]) {
            const text = [
                "uses 'http://hl7.org/fhir/5.0/StructureDefinition/Patient' alias Patient as source",
                "group example(source src : Patient, target tgt : Patient) {",
                `    ${rule}`,
                "}",
            ].join("\n");
            const document = await openFmlDocument(text);
            const offset = text.indexOf(variable) + variable.length;
            const completionList = await vscode.commands.executeCommand<vscode.CompletionList>(
                "vscode.executeCompletionItemProvider",
                document.uri,
                document.positionAt(offset),
            );

            assert.ok(completionList.items.some(item => item.label === "name"), variable);
        }
    });

    test("language server should provide FHIR property hovers", async () => {
        const text = [
            "uses 'http://hl7.org/fhir/4.3/StructureDefinition/Patient' alias Patient as source",
            "group example(source src : Patient, target tgt : Patient) {",
            "    src.name -> tgt.name;",
            "}",
        ].join("\n");
        const document = await openFmlDocument(text);
        const position = document.positionAt(text.indexOf("src.name") + "src.".length);
        const hovers = await waitForHovers(document.uri, position);
        const markdown = hovers.flatMap(hover => hover.contents).map(content => {
            return typeof content === "string" ? content : content.value;
        }).join("\n");

        assert.match(markdown, /Patient\.name/);
        assert.match(markdown, /patient-definitions\.html#Patient\.name/);
        assert.match(markdown, /\[0\.\.\*\] \(R4B\)/);
        assert.match(markdown, /Type: `HumanName`/);
        assert.doesNotMatch(markdown, /repeating/);
    });

    test("language server should distinguish context, nested property, and variable hovers", async () => {
        const text = [
            "uses 'http://hl7.org/fhir/5.0/StructureDefinition/Observation' alias Observation as source",
            "group example(source src : Observation, target tgt : Observation) {",
            "    src.code.coding as coding -> tgt.code = cast(coding, 'CodeableConcept');",
            "    src.code as sourceCode -> tgt.code as targetCode, targetCode = sourceCode;",
            "}",
        ].join("\n");
        const document = await openFmlDocument(text);
        const hoverText = async (offset: number): Promise<string> => {
            const hovers = await waitForHovers(document.uri, document.positionAt(offset));
            return hovers.flatMap(hover => hover.contents).map(content => {
                return typeof content === "string" ? content : content.value;
            }).join("\n");
        };

        const property = text.indexOf("src.code.coding");
        const contextMarkdown = await hoverText(property + 1);
        const codeMarkdown = await hoverText(property + "src.".length + 1);
        const codingArgument = text.lastIndexOf("coding");
        const variableMarkdown = await hoverText(codingArgument + 1);
        const assignment = text.indexOf("targetCode = sourceCode");
        const targetVariableMarkdown = await hoverText(assignment + 1);
        const sourceVariableMarkdown = await hoverText(assignment + "targetCode = ".length + 1);

        assert.match(contextMarkdown, /Source context.*`src`/);
        assert.match(contextMarkdown, /Type: `Observation`/);
        assert.match(codeMarkdown, /Observation\.code/);
        assert.match(codeMarkdown, /CodeableConcept/);
        assert.match(variableMarkdown, /Variable.*`coding`/);
        assert.match(variableMarkdown, /Type: `Coding`/);
        assert.match(targetVariableMarkdown, /Variable.*`targetCode`/);
        assert.match(targetVariableMarkdown, /Target property: `Observation\.code`/);
        assert.match(targetVariableMarkdown, /Type: `CodeableConcept`/);
        assert.match(sourceVariableMarkdown, /Variable.*`sourceCode`/);
        assert.match(sourceVariableMarkdown, /Source property: `Observation\.code`/);
        assert.match(sourceVariableMarkdown, /Type: `CodeableConcept`/);
    });

    test("language server should provide transform result hovers", async () => {
        const text = [
            "uses 'http://hl7.org/fhir/5.0/StructureDefinition/Observation' alias Observation as target",
            "group example(source src : Observation, target tgt : Observation) {",
            "    src -> tgt.identifier = id('system', 'value');",
            "}",
        ].join("\n");
        const document = await openFmlDocument(text);
        const position = document.positionAt(text.indexOf("id(") + 1);
        const hovers = await waitForHovers(document.uri, position);
        const markdown = hovers.flatMap(hover => hover.contents).map(content => {
            return typeof content === "string" ? content : content.value;
        }).join("\n");

        assert.match(markdown, /Transform.*`id`/);
        assert.match(markdown, /Result type: `Identifier`/);
    });

    test("manual validation command should request immediate server validation", async () => {
        await openFmlDocument("group example(source src, target tgt) { src -> tgt.id = uuid(); }");

        const result = await vscode.commands.executeCommand<DocumentValidationResult>(
            "fmlTools.Validation",
        );

        assert.equal(result.errorCount, 0);
        assert.equal(result.warningCount, 0);
    });

    test("preview should open beside the editor and update from unsaved edits", async function() {
        this.timeout(10_000);
        const initialText = "group First(source src, target tgt) {\n}";
        const document = await openFmlDocument(initialText);
        const panel = await vscode.commands.executeCommand<vscode.WebviewPanel>(
            "fmlTools.OpenPreviewToSide",
        );

        assert.ok(panel);
        assert.equal(panel.viewType, "fmlMapPreview");
        assert.match(panel.title, /^Preview /);
        const previewHtml = await waitForPreviewHtml(
            panel,
            html => html.includes("Instance diagram for") && html.includes(">First</text>"),
        );
        assert.match(previewHtml, /data-fml-line="1"/);
        assert.match(previewHtml, /window\.fmlPreview = Object\.freeze/);
        assert.match(previewHtml, /script-src 'nonce-[^']+'/);
        assert.match(previewHtml, /setAttribute\("role", "button"\)/);

        const edit = new vscode.WorkspaceEdit();
        edit.insert(
            document.uri,
            document.positionAt(initialText.length),
            "\ngroup Second(source src, target tgt) {\n}",
        );
        assert.ok(await vscode.workspace.applyEdit(edit));
        assert.equal(document.isDirty, true);

        await waitForPreviewHtml(panel, html => html.includes(">First</text>") && html.includes(">Second</text>"));
        panel.dispose();
    });

    test("group invocation and extends references should navigate to group declarations", async () => {
        const text = [
            "group Parent(source src, target tgt) {",
            "}",
            "group Child(source src, target tgt) extends Parent {",
            "    src -> tgt then Parent(src, tgt);",
            "}",
        ].join("\n");
        const document = await openFmlDocument(text);
        const declarationPosition = document.positionAt(text.indexOf("Parent"));
        const extendsPosition = document.positionAt(text.indexOf("extends Parent") + "extends ".length + 1);
        const invocationPosition = document.positionAt(text.lastIndexOf("Parent(") + 1);

        for (const position of [extendsPosition, invocationPosition]) {
            const definitions = await waitForDefinitions(document.uri, position);
            const location = definitions.find(definition => {
                return definition instanceof vscode.Location
                    && definition.uri.toString() === document.uri.toString();
            });
            assert.ok(location instanceof vscode.Location);
            assert.deepEqual(location.range.start, declarationPosition);
        }
    });

    test("cross-file group navigation should follow canonical wildcard imports", async () => {
        const targetText = [
            "/// url = 'http://example.org/StructureMap/SharedGroups'",
            "group Shared(source src, target tgt) {",
            "}",
        ].join("\n");
        const targetDocument = await openFmlDocument(targetText);
        const sourceText = [
            "/// url = 'http://example.org/StructureMap/SourceMap'",
            "imports 'http://example.org/StructureMap/Shared*'",
            "group Source(source src, target tgt) {",
            "    src -> tgt then Shared(src, tgt);",
            "}",
        ].join("\n");
        const sourceDocument = await openFmlDocument(sourceText);
        const invocationPosition = sourceDocument.positionAt(sourceText.indexOf("Shared(") + 1);

        const definitions = await waitForDefinitions(sourceDocument.uri, invocationPosition);
        const location = definitions.find(definition => {
            return definition instanceof vscode.Location
                && definition.uri.toString() === targetDocument.uri.toString();
        });
        assert.ok(location instanceof vscode.Location);
        assert.deepEqual(location.range.start, targetDocument.positionAt(targetText.lastIndexOf("Shared")));

        const declarationPosition = targetDocument.positionAt(targetText.lastIndexOf("Shared") + 1);
        const references = await waitForReferences(targetDocument.uri, declarationPosition);
        const invocationReference = references.find(reference => {
            return reference.uri.toString() === sourceDocument.uri.toString();
        });
        assert.ok(invocationReference);
        assert.deepEqual(invocationReference.range.start, sourceDocument.positionAt(sourceText.indexOf("Shared(")));
    });

    test("unresolved imported groups should produce warnings", async () => {
        const text = [
            "/// url = 'http://example.org/StructureMap/MissingSource'",
            "imports 'http://example.org/StructureMap/DoesNotExist*'",
            "group Source(source src, target tgt) {",
            "    src -> tgt then MissingGroup(src, tgt);",
            "}",
        ].join("\n");
        const document = await openFmlDocument(text);

        const diagnostics = await waitForDiagnostics(document.uri, current => {
            return current.some(diagnostic => diagnostic.message.includes("MissingGroup"));
        });
        const warning = diagnostics.find(diagnostic => diagnostic.message.includes("MissingGroup"));
        assert.equal(warning?.severity, vscode.DiagnosticSeverity.Warning);
        assert.match(warning?.message ?? "", /not found in this map or its imports/);
    });
});

async function openFmlDocument(content: string): Promise<vscode.TextDocument> {
    const document = await vscode.workspace.openTextDocument({language: "fml", content});
    await vscode.window.showTextDocument(document);
    return document;
}

function fullDocumentRange(document: vscode.TextDocument): vscode.Range {
    const lastLine = document.lineAt(document.lineCount - 1);
    return new vscode.Range(0, 0, lastLine.lineNumber, lastLine.text.length);
}

async function waitForDiagnostics(
    uri: vscode.Uri,
    predicate: (diagnostics: readonly vscode.Diagnostic[]) => boolean,
    timeoutMs = 5000,
): Promise<readonly vscode.Diagnostic[]> {
    const startedAt = Date.now();
    while (Date.now() - startedAt < timeoutMs) {
        const diagnostics = vscode.languages.getDiagnostics(uri);
        if (predicate(diagnostics)) {
            return diagnostics;
        }
        await new Promise(resolve => setTimeout(resolve, 50));
    }

    const diagnostics = vscode.languages.getDiagnostics(uri);
    assert.fail(`Timed out waiting for diagnostics. Current diagnostics: ${JSON.stringify(diagnostics)}`);
}

async function waitForExtensionActivation(
    extension: vscode.Extension<unknown>,
    timeoutMs = 5000,
): Promise<void> {
    const startedAt = Date.now();
    while (Date.now() - startedAt < timeoutMs) {
        if (extension.isActive) {
            return;
        }
        await new Promise(resolve => setTimeout(resolve, 50));
    }
    assert.fail("Timed out waiting for FML language activation.");
}

async function waitForDefinitions(
    uri: vscode.Uri,
    position: vscode.Position,
    timeoutMs = 5000,
): Promise<(vscode.Location | vscode.LocationLink)[]> {
    const startedAt = Date.now();
    while (Date.now() - startedAt < timeoutMs) {
        const definitions = await vscode.commands.executeCommand<(vscode.Location | vscode.LocationLink)[]>(
            "vscode.executeDefinitionProvider",
            uri,
            position,
        ) ?? [];
        if (definitions.length > 0) {
            return definitions;
        }
        await new Promise(resolve => setTimeout(resolve, 50));
    }
    assert.fail("Timed out waiting for FML group definitions.");
}

async function waitForReferences(
    uri: vscode.Uri,
    position: vscode.Position,
    timeoutMs = 5000,
): Promise<vscode.Location[]> {
    const startedAt = Date.now();
    while (Date.now() - startedAt < timeoutMs) {
        const references = await vscode.commands.executeCommand<vscode.Location[]>(
            "vscode.executeReferenceProvider",
            uri,
            position,
        ) ?? [];
        if (references.length > 0) {
            return references;
        }
        await new Promise(resolve => setTimeout(resolve, 50));
    }
    assert.fail("Timed out waiting for FML group references.");
}

async function waitForHovers(
    uri: vscode.Uri,
    position: vscode.Position,
    timeoutMs = 5000,
): Promise<vscode.Hover[]> {
    const startedAt = Date.now();
    while (Date.now() - startedAt < timeoutMs) {
        const hovers = await vscode.commands.executeCommand<vscode.Hover[]>(
            "vscode.executeHoverProvider",
            uri,
            position,
        ) ?? [];
        if (hovers.length > 0) {
            return hovers;
        }
        await new Promise(resolve => setTimeout(resolve, 50));
    }
    assert.fail("Timed out waiting for FML property hovers.");
}

async function waitForPreviewHtml(
    panel: vscode.WebviewPanel,
    predicate: (html: string) => boolean,
    timeoutMs = 5000,
): Promise<string> {
    const startedAt = Date.now();
    while (Date.now() - startedAt < timeoutMs) {
        const html = panel.webview.html;
        if (predicate(html)) {
            return html;
        }
        await new Promise(resolve => setTimeout(resolve, 50));
    }
    assert.fail(`Timed out waiting for FML preview HTML: ${panel.webview.html}`);
}
