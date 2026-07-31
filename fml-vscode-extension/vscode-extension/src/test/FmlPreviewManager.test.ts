import * as assert from "node:assert";
import * as vscode from "vscode";
import {
    FmlPreviewManager,
    parseFmlPreviewNavigationMessage,
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

    test("renderer failures are shown as escaped preview errors", async () => {
        const renderer = new ControlledRenderer();
        const manager = new FmlPreviewManager(renderer);
        const document = await vscode.workspace.openTextDocument({language: "fml", content: "group Error"});
        const panel = manager.open(document);
        await waitFor(() => renderer.pending.length === 1);

        renderer.pending[0].reject(new Error("<render failed>"));
        await waitFor(() => panel.webview.html.includes("Unable to render FML preview"));

        assert.match(panel.webview.html, /&lt;render failed&gt;/);
        assert.doesNotMatch(panel.webview.html, /<render failed>/);
        manager.dispose();
    });

    test("navigation messages require valid bounded coordinate inputs", () => {
        assert.deepEqual(parseFmlPreviewNavigationMessage({
            type: "fmlPreview.navigate",
            line: 2,
            column: 4,
            length: 7,
            version: 3,
        }), {
            type: "fmlPreview.navigate",
            line: 2,
            column: 4,
            length: 7,
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
