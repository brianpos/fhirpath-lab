import * as assert from "node:assert";
import {
    DocumentValidationResult,
    FmlServerStatus,
    WorkspaceIndexResult,
} from "@fhirpath-lab/language-service";
import * as vscode from "vscode";
import {formatStatusSummary} from "../FmlLanguageServerStatus";
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

    test("language server restart restores realtime validation", async () => {
        await vscode.commands.executeCommand("fmlTools.RestartLanguageServer");
        const document = await openFmlDocument(
            "group restartTest(source src, target tgt) { src -> tgt.id = uuid('bad'); }",
        );
        const diagnostics = await waitForDiagnostics(document.uri, current => {
            return current.some(diagnostic => diagnostic.severity === vscode.DiagnosticSeverity.Error);
        });

        assert.ok(diagnostics.some(diagnostic => diagnostic.message.includes("received 1 parameter")));
    });

    test("restart during an index operation starts a fresh index", async () => {
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
            return diagnostics.length === 0;
        });
        assert.deepEqual(validDiagnostics, []);
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

    test("manual validation command should request immediate server validation", async () => {
        await openFmlDocument("group example(source src, target tgt) { src -> tgt.id = uuid(); }");

        const result = await vscode.commands.executeCommand<DocumentValidationResult>(
            "fmlTools.Validation",
        );

        assert.equal(result.errorCount, 0);
        assert.equal(result.warningCount, 0);
    });

    test("preview should open beside the editor and update from unsaved edits", async () => {
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
            html => html.includes("Placeholder SVG") && html.includes(">1 group<"),
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

        await waitForPreviewHtml(panel, html => html.includes("First, Second") && html.includes(">2 groups<"));
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
    assert.fail(`Timed out waiting for FML preview HTML. Current HTML length: ${panel.webview.html.length}`);
}
