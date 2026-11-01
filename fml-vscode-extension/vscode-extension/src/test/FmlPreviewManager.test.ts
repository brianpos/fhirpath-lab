import * as assert from "node:assert";
import * as vscode from "vscode";
import {
    FmlPreviewManager,
    parseFmlPreviewNavigationMessage,
    parseFmlPreviewOptionsMessage,
} from "../FmlPreviewManager";
import {FmlPreviewSource, FmlSvgRenderer} from "../FmlPreviewRenderer";

interface PendingRender {
    reject(error: Error): void;
    resolve(svg: string): void;
    source: FmlPreviewSource;
}

class ControlledRenderer implements FmlSvgRenderer {
    public readonly pending: PendingRender[] = [];

    public render(source: FmlPreviewSource): Promise<string> {
        return new Promise((resolve, reject) => {
            this.pending.push({resolve, reject, source});
        });
    }
}

suite("FML Preview Manager", () => {
    test("a superseded async render cannot overwrite newer content", async () => {
        const renderer = new ControlledRenderer();
        const manager = new FmlPreviewManager(renderer);
        const document = await vscode.workspace.openTextDocument({language: "fml", content: "group First"});
        const panel = manager.open(document);
        await waitFor(() => renderer.pending.length === 1);

        const edit = new vscode.WorkspaceEdit();
        edit.insert(document.uri, document.positionAt(document.getText().length), "\ngroup Second");
        assert.ok(await vscode.workspace.applyEdit(edit));
        await waitFor(() => renderer.pending.length === 2);

        renderer.pending[0].resolve("<svg id=\"stale\"></svg>");
        await new Promise(resolve => setTimeout(resolve, 20));
        assert.doesNotMatch(panel.webview.html, /id="stale"/);

        renderer.pending[1].resolve("<svg id=\"current\"></svg>");
        await waitFor(() => panel.webview.html.includes("id=\"current\""));

        assert.match(panel.webview.html, /body \{[\s\S]*height: 100vh;[\s\S]*overflow: hidden;/);
        assert.match(panel.webview.html, /\.preview-shell \{[\s\S]*height: calc\(100vh - 48px\);[\s\S]*overflow: auto;/);
        assert.match(panel.webview.html, /message\.type !== "fmlPreview\.update"/);
        assert.match(panel.webview.html, /const scrollLeft = previewShell\.scrollLeft;/);
        assert.match(panel.webview.html, /const scrollTop = previewShell\.scrollTop;/);
        assert.match(panel.webview.html, /previewShell\.scrollLeft = scrollLeft;/);
        assert.match(panel.webview.html, /previewShell\.scrollTop = scrollTop;/);

        const initialHtml = panel.webview.html;
        const updateMessages: unknown[] = [];
        const originalPostMessage = panel.webview.postMessage.bind(panel.webview);
        panel.webview.postMessage = async message => {
            updateMessages.push(message);
            return true;
        };
        const nextEdit = new vscode.WorkspaceEdit();
        nextEdit.insert(document.uri, document.positionAt(document.getText().length), "\ngroup Third");
        assert.ok(await vscode.workspace.applyEdit(nextEdit));
        await waitFor(() => renderer.pending.length === 3);
        renderer.pending[2].resolve("<svg id=\"updated-in-place\"></svg>");
        await waitFor(() => updateMessages.length === 1);

        assert.equal(panel.webview.html, initialHtml);
        assert.doesNotMatch(panel.webview.html, /id="updated-in-place"/);
        assert.deepEqual(updateMessages[0], {
            type: "fmlPreview.update",
            svg: "<svg id=\"updated-in-place\"></svg>",
            version: document.version,
        });
        panel.webview.postMessage = originalPostMessage;
        manager.dispose();
    });

    test("closing a panel while an async render is pending is safe", async () => {
        const renderer = new ControlledRenderer();
        const manager = new FmlPreviewManager(renderer);
        const document = await vscode.workspace.openTextDocument({language: "fml", content: "group Pending"});
        const panel = manager.open(document);
        await waitFor(() => renderer.pending.length === 1);

        panel.dispose();
        renderer.pending[0].resolve("<svg></svg>");
        await new Promise(resolve => setTimeout(resolve, 20));

        manager.dispose();
    });

    test("an initial renderer failure shows a concise preview error", async () => {
        const renderer = new ControlledRenderer();
        const manager = new FmlPreviewManager(renderer);
        const document = await vscode.workspace.openTextDocument({language: "fml", content: "group Error"});
        const panel = manager.open(document);
        await waitFor(() => renderer.pending.length === 1);

        renderer.pending[0].reject(new Error("<render failed>"));
        await waitFor(() => panel.webview.html.includes("Preview unavailable"));

        assert.match(panel.webview.html, /Fix the FML errors in the editor/);
        assert.doesNotMatch(panel.webview.html, /render failed/);
        assert.doesNotMatch(panel.webview.html, /<render failed>/);
        manager.dispose();
    });

    test("a renderer failure keeps and dims the last valid diagram", async () => {
        const renderer = new ControlledRenderer();
        const manager = new FmlPreviewManager(renderer);
        const document = await vscode.workspace.openTextDocument({language: "fml", content: "group Valid"});
        const panel = manager.open(document);
        await waitFor(() => renderer.pending.length === 1);
        renderer.pending[0].resolve("<svg id=\"last-valid\"></svg>");
        await waitFor(() => panel.webview.html.includes("last-valid"));

        const messages: unknown[] = [];
        panel.webview.postMessage = async message => {
            messages.push(message);
            return true;
        };
        const edit = new vscode.WorkspaceEdit();
        edit.insert(document.uri, document.positionAt(document.getText().length), " invalid");
        assert.ok(await vscode.workspace.applyEdit(edit));
        await waitFor(() => renderer.pending.length === 2);
        renderer.pending[1].reject(new Error("parse details that stay in the editor"));
        await waitFor(() => messages.length === 1);

        assert.match(panel.webview.html, /id="last-valid"/);
        assert.match(panel.webview.html, /preview-shell\.is-stale/);
        assert.match(panel.webview.html, /Preview paused/);
        assert.deepEqual(messages[0], {type: "fmlPreview.invalid"});

        const recoveryEdit = new vscode.WorkspaceEdit();
        recoveryEdit.insert(document.uri, document.positionAt(document.getText().length), " recovered");
        assert.ok(await vscode.workspace.applyEdit(recoveryEdit));
        await waitFor(() => renderer.pending.length === 3);
        renderer.pending[2].resolve("<svg id=\"recovered\"></svg>");
        await waitFor(() => messages.length === 2);
        assert.deepEqual(messages[1], {
            type: "fmlPreview.update",
            svg: "<svg id=\"recovered\"></svg>",
            version: document.version,
        });
        assert.match(panel.webview.html, /previewShell\.classList\.remove\("is-stale"\)/);
        assert.match(panel.webview.html, /previewStatus\.hidden = true/);
        manager.dispose();
    });

    test("navigation messages require valid bounded coordinate inputs", () => {
        const externalUri = vscode.Uri.file("C:\\maps\\Element4to5.fml").toString();
        assert.deepEqual(parseFmlPreviewNavigationMessage({
            type: "fmlPreview.navigate",
            line: 2,
            column: 4,
            length: 7,
            uri: externalUri,
            version: 3,
        }), {
            type: "fmlPreview.navigate",
            line: 2,
            column: 4,
            length: 7,
            uri: externalUri,
            version: 3,
        });
        assert.equal(parseFmlPreviewNavigationMessage({
            type: "fmlPreview.navigate",
            line: 0,
            column: 4,
            length: 7,
            version: 3,
        }), undefined);
        assert.equal(parseFmlPreviewNavigationMessage({
            type: "fmlPreview.navigate",
            line: 2,
            column: "4",
            length: 7,
            version: 3,
        }), undefined);
        assert.equal(parseFmlPreviewNavigationMessage({
            type: "fmlPreview.navigate",
            line: 2,
            column: 4,
            length: 7,
            uri: 42,
            version: 3,
        }), undefined);
    });

    test("navigation messages open the owning external FML document", async () => {
        const renderer = new ControlledRenderer();
        const manager = new FmlPreviewManager(renderer);
        const primary = await vscode.workspace.openTextDocument({
            language: "fml",
            content: "group Appointment {}",
        });
        const external = await vscode.workspace.openTextDocument({
            language: "fml",
            content: "group Element {\n  src.id -> tgt.id;\n}",
        });
        manager.open(primary);
        await waitFor(() => renderer.pending.length === 1);

        const testAccess = manager as unknown as {
            previews: Map<string, unknown>;
            handleWebviewMessage(entry: unknown, message: unknown): Promise<void>;
        };
        const entry = testAccess.previews.get(primary.uri.toString());
        assert.ok(entry);
        await testAccess.handleWebviewMessage(entry, {
            type: "fmlPreview.navigate",
            line: 2,
            column: 6,
            length: 2,
            uri: external.uri.toString(),
            version: external.version,
        });

        const editor = vscode.window.activeTextEditor;
        assert.equal(editor?.document.uri.toString(), external.uri.toString());
        assert.equal(external.getText(editor?.selection), "id");
        manager.dispose();
    });

    test("complete previews expose an initially disabled all-properties toggle", async () => {
        const renderer = new ControlledRenderer();
        const manager = new FmlPreviewManager(renderer, () => undefined, {
            viewType: "fmlCompleteMapPreview",
            titlePrefix: "Complete Preview",
            showAllPropertiesToggle: true,
        });
        const document = await vscode.workspace.openTextDocument({language: "fml", content: "group Complete"});
        const panel = manager.open(document);
        await waitFor(() => renderer.pending.length === 1);

        assert.equal(renderer.pending[0].source.showAllProperties, false);
        renderer.pending[0].resolve("<svg></svg>");
        await waitFor(() => panel.webview.html.includes("Show all properties"));

        assert.equal(panel.viewType, "fmlCompleteMapPreview");
        assert.match(panel.title, /^Complete Preview /);
        assert.match(panel.webview.html, /type="checkbox"/);
        assert.match(panel.webview.html, /fmlPreview\.setShowAllProperties/);
        manager.dispose();
    });

    test("all-properties render activity spans asynchronous preview processing", async () => {
        const renderer = new ControlledRenderer();
        const activitySources: FmlPreviewSource[] = [];
        let activeActivities = 0;
        let disposedActivities = 0;
        const manager = new FmlPreviewManager(renderer, () => undefined, {
            viewType: "fmlCompleteMapPreview",
            titlePrefix: "Complete Preview",
            showAllPropertiesToggle: true,
            beginRenderActivity: source => {
                if (!source.showAllProperties) {
                    return undefined;
                }
                activitySources.push(source);
                activeActivities++;
                return {
                    dispose: () => {
                        activeActivities--;
                        disposedActivities++;
                    },
                };
            },
        });
        const document = await vscode.workspace.openTextDocument({language: "fml", content: "group Complete"});
        const panel = manager.open(document);
        await waitFor(() => renderer.pending.length === 1);
        renderer.pending[0].resolve("<svg></svg>");
        await waitFor(() => panel.webview.html.includes("Show all properties"));
        assert.equal(activitySources.length, 0);
        assert.equal(activeActivities, 0);

        const testAccess = manager as unknown as {
            previews: Map<string, unknown>;
            handleWebviewMessage(entry: unknown, message: unknown): Promise<void>;
        };
        const entry = testAccess.previews.get(document.uri.toString());
        assert.ok(entry);
        await testAccess.handleWebviewMessage(entry, {
            type: "fmlPreview.setShowAllProperties",
            showAllProperties: true,
        });
        await waitFor(() => renderer.pending.length === 2);

        assert.equal(activitySources.length, 1);
        assert.equal(activitySources[0].fileName, "Untitled FML");
        assert.equal(activeActivities, 1);
        assert.equal(disposedActivities, 0);

        renderer.pending[1].resolve("<svg id=\"expanded\"></svg>");
        await waitFor(() => disposedActivities === 1);
        assert.equal(activeActivities, 0);
        manager.dispose();
    });

    test("all-properties messages require a boolean option", () => {
        assert.deepEqual(parseFmlPreviewOptionsMessage({
            type: "fmlPreview.setShowAllProperties",
            showAllProperties: true,
        }), {
            type: "fmlPreview.setShowAllProperties",
            showAllProperties: true,
        });
        assert.equal(parseFmlPreviewOptionsMessage({
            type: "fmlPreview.setShowAllProperties",
            showAllProperties: "true",
        }), undefined);
    });

    test("source navigation focuses, selects, and bounds the requested range", async () => {
        const manager = new FmlPreviewManager();
        const document = await vscode.workspace.openTextDocument({
            language: "fml",
            content: "first\nabcdef\nlast",
        });

        await manager.navigateToSource(document.uri, {
            line: 2,
            column: 2,
            length: 3,
        });

        const editor = vscode.window.activeTextEditor;
        assert.equal(editor?.document.uri.toString(), document.uri.toString());
        assert.deepEqual(editor?.selection.start, new vscode.Position(1, 2));
        assert.deepEqual(editor?.selection.end, new vscode.Position(1, 5));
        assert.equal(document.getText(editor?.selection), "cde");

        await manager.navigateToSource(document.uri, {
            line: 99,
            column: 99,
            length: 99,
        });
        assert.deepEqual(vscode.window.activeTextEditor?.selection.start, new vscode.Position(2, 4));
        assert.deepEqual(vscode.window.activeTextEditor?.selection.end, new vscode.Position(2, 4));
        manager.dispose();
    });
});

async function waitFor(predicate: () => boolean, timeoutMs = 3000): Promise<void> {
    const startedAt = Date.now();
    while (Date.now() - startedAt < timeoutMs) {
        if (predicate()) {
            return;
        }
        await new Promise(resolve => setTimeout(resolve, 20));
    }
    assert.fail("Timed out waiting for preview manager state.");
}
