import {randomBytes} from "node:crypto";
import path from "node:path";
import {
    Disposable,
    Position,
    Range,
    Selection,
    TextDocument,
    TextEditorRevealType,
    Uri,
    ViewColumn,
    Webview,
    WebviewPanel,
    window,
    workspace,
} from "vscode";
import {
    FmlPreviewNavigationTarget,
    FmlPreviewSource,
    FmlSvgRenderer,
    InstanceDiagramFmlSvgRenderer,
} from "./FmlPreviewRenderer";
import {toFhirVersion} from "@fhirpath-lab/validator";
import type {SushiWorkspaceConfiguration} from "./SushiConfigWatcher";

interface PreviewEntry {
    documentUri: Uri;
    panel: WebviewPanel;
    renderSequence: number;
    contentInitialized?: boolean;
    sourceViewColumn?: ViewColumn;
    updateTimer?: NodeJS.Timeout;
    webviewMessageDisposable?: Disposable;
    showAllProperties: boolean;
}

interface FmlPreviewNavigationMessage extends FmlPreviewNavigationTarget {
    type: "fmlPreview.navigate";
    uri?: string;
    version: number;
}

interface FmlPreviewOptionsMessage {
    type: "fmlPreview.setShowAllProperties";
    showAllProperties: boolean;
}

export interface FmlPreviewManagerOptions {
    viewType?: string;
    titlePrefix?: string;
    showAllPropertiesToggle?: boolean;
    beginRenderActivity?: (source: FmlPreviewSource) => Disposable | undefined;
}

const PREVIEW_UPDATE_DELAY_MS = 120;

export class FmlPreviewManager implements Disposable {
    private readonly previews = new Map<string, PreviewEntry>();
    private readonly disposables: Disposable[] = [];
    private readonly options: Required<FmlPreviewManagerOptions>;

    public constructor(
        private readonly renderer: FmlSvgRenderer = new InstanceDiagramFmlSvgRenderer(),
        private readonly getModelConfiguration: (filePath: string) => SushiWorkspaceConfiguration | undefined
            = () => undefined,
        options: FmlPreviewManagerOptions = {},
    ) {
        this.options = {
            viewType: options.viewType ?? "fmlMapPreview",
            titlePrefix: options.titlePrefix ?? "Preview",
            showAllPropertiesToggle: options.showAllPropertiesToggle ?? false,
            beginRenderActivity: options.beginRenderActivity ?? (() => undefined),
        };
        this.disposables.push(workspace.onDidChangeTextDocument(event => {
            const preview = this.previews.get(event.document.uri.toString());
            if (preview) {
                this.scheduleUpdate(preview, event.document, PREVIEW_UPDATE_DELAY_MS);
            }
        }));
    }

    public open(document: TextDocument): WebviewPanel {
        const key = document.uri.toString();
        const existing = this.previews.get(key);
        if (existing) {
            existing.sourceViewColumn = this.getSourceViewColumn(document) ?? existing.sourceViewColumn;
            existing.panel.reveal(ViewColumn.Beside, true);
            this.scheduleUpdate(existing, document, 0);
            return existing.panel;
        }

        const panel = window.createWebviewPanel(
            this.options.viewType,
            this.getTitle(document),
            {
                viewColumn: ViewColumn.Beside,
                preserveFocus: true,
            },
            {
                enableScripts: true,
                localResourceRoots: [],
                retainContextWhenHidden: true,
            },
        );
        const entry: PreviewEntry = {
            documentUri: document.uri,
            panel,
            renderSequence: 0,
            sourceViewColumn: this.getSourceViewColumn(document),
            showAllProperties: false,
        };
        this.previews.set(key, entry);
        entry.webviewMessageDisposable = panel.webview.onDidReceiveMessage(message => {
            void this.handleWebviewMessage(entry, message);
        });
        panel.onDidDispose(() => {
            if (entry.updateTimer) {
                clearTimeout(entry.updateTimer);
            }
            entry.webviewMessageDisposable?.dispose();
            this.previews.delete(key);
        });
        this.scheduleUpdate(entry, document, 0);
        return panel;
    }

    public dispose(): void {
        for (const disposable of this.disposables) {
            disposable.dispose();
        }
        for (const preview of this.previews.values()) {
            if (preview.updateTimer) {
                clearTimeout(preview.updateTimer);
            }
            preview.panel.dispose();
        }
        this.previews.clear();
    }

    public async navigateToSource(
        documentUri: Uri,
        target: FmlPreviewNavigationTarget,
        viewColumn: ViewColumn = ViewColumn.One,
    ): Promise<void> {
        const document = await workspace.openTextDocument(documentUri);
        const lineIndex = clamp(target.line - 1, 0, Math.max(document.lineCount - 1, 0));
        const line = document.lineAt(lineIndex);
        const column = clamp(target.column, 0, line.text.length);
        const start = new Position(lineIndex, column);
        const startOffset = document.offsetAt(start);
        const endOffset = clamp(startOffset + target.length, startOffset, document.getText().length);
        const selection = new Selection(start, document.positionAt(endOffset));
        const editor = await window.showTextDocument(document, {
            viewColumn,
            preserveFocus: false,
            preview: false,
        });
        editor.selection = selection;
        editor.revealRange(new Range(selection.start, selection.end), TextEditorRevealType.InCenterIfOutsideViewport);
    }

    private scheduleUpdate(entry: PreviewEntry, document: TextDocument, delay: number): void {
        if (entry.updateTimer) {
            clearTimeout(entry.updateTimer);
        }
        entry.updateTimer = setTimeout(() => {
            entry.updateTimer = undefined;
            void this.update(entry, document);
        }, delay);
    }

    private async update(entry: PreviewEntry, document: TextDocument): Promise<void> {
        const renderSequence = ++entry.renderSequence;
        const configuration = this.getModelConfiguration(document.fileName);
        const source: FmlPreviewSource = {
            uri: document.uri,
            fileName: document.isUntitled ? "Untitled FML" : path.basename(document.fileName),
            text: document.getText(),
            version: document.version,
            defaultFhirVersion: toFhirVersion(configuration?.fhirVersion),
            profileBaseTypes: configuration?.profileBaseTypes,
            customTypeModels: configuration?.customTypeModels,
            showAllProperties: entry.showAllProperties,
        };
        const renderActivity = this.options.beginRenderActivity(source);

        try {
            const svg = await this.renderer.render(source);
            if (!this.isCurrentRender(entry, renderSequence)) {
                return;
            }
            entry.panel.title = this.getTitle(document);
            if (entry.contentInitialized) {
                await entry.panel.webview.postMessage({
                    type: "fmlPreview.update",
                    svg,
                    version: source.version,
                });
            } else {
                entry.panel.webview.html = createPreviewHtml(
                    entry.panel.webview,
                    svg,
                    source.fileName,
                    source.version,
                    this.options.showAllPropertiesToggle,
                    entry.showAllProperties,
                );
                entry.contentInitialized = true;
            }
        } catch {
            if (!this.isCurrentRender(entry, renderSequence)) {
                return;
            }
            if (entry.contentInitialized) {
                await entry.panel.webview.postMessage({type: "fmlPreview.invalid"});
            } else {
                entry.panel.webview.html = createErrorHtml(entry.panel.webview);
            }
        } finally {
            renderActivity?.dispose();
        }
    }

    private getTitle(document: TextDocument): string {
        const fileName = document.isUntitled ? "Untitled FML" : path.basename(document.fileName);
        return `${this.options.titlePrefix} ${fileName}`;
    }

    private getSourceViewColumn(document: TextDocument): ViewColumn | undefined {
        const editor = window.activeTextEditor;
        return editor?.document.uri.toString() === document.uri.toString()
            ? editor.viewColumn
            : undefined;
    }

    private async handleWebviewMessage(entry: PreviewEntry, message: unknown): Promise<void> {
        if (this.previews.get(entry.documentUri.toString()) !== entry) {
            return;
        }
        const optionsMessage = parseFmlPreviewOptionsMessage(message);
        if (optionsMessage) {
            if (!this.options.showAllPropertiesToggle
                || entry.showAllProperties === optionsMessage.showAllProperties) {
                return;
            }
            entry.showAllProperties = optionsMessage.showAllProperties;
            try {
                const document = await workspace.openTextDocument(entry.documentUri);
                this.scheduleUpdate(entry, document, 0);
            } catch (error) {
                const messageText = error instanceof Error ? error.message : String(error);
                void window.showErrorMessage(`Unable to update the FML preview: ${messageText}`);
            }
            return;
        }
        const navigation = parseFmlPreviewNavigationMessage(message);
        if (!navigation) {
            return;
        }

        try {
            const navigationUri = navigation.uri
                ? Uri.parse(navigation.uri, true)
                : entry.documentUri;
            const document = await workspace.openTextDocument(navigationUri);
            if (document.version !== navigation.version) {
                const sourceDocument = await workspace.openTextDocument(entry.documentUri);
                this.scheduleUpdate(entry, sourceDocument, 0);
                void window.showInformationMessage("The FML preview is updating. Select the diagram item again.");
                return;
            }
            await this.navigateToSource(
                navigationUri,
                navigation,
                entry.sourceViewColumn ?? ViewColumn.One,
            );
        } catch (error) {
            const messageText = error instanceof Error ? error.message : String(error);
            void window.showErrorMessage(`Unable to navigate from the FML preview: ${messageText}`);
        }
    }

    private isCurrentRender(entry: PreviewEntry, renderSequence: number): boolean {
        return renderSequence === entry.renderSequence
            && this.previews.get(entry.documentUri.toString()) === entry;
    }
}

export function parseFmlPreviewNavigationMessage(message: unknown): FmlPreviewNavigationMessage | undefined {
    if (!message || typeof message !== "object" || Array.isArray(message)) {
        return undefined;
    }
    const candidate = message as Record<string, unknown>;
    if (
        candidate.type !== "fmlPreview.navigate"
        || !isNavigationInteger(candidate.line, 1)
        || !isNavigationInteger(candidate.column, 0)
        || !isNavigationInteger(candidate.length, 0)
        || !isNavigationInteger(candidate.version, 0)
        || (candidate.uri !== undefined && (typeof candidate.uri !== "string" || candidate.uri.length === 0))
    ) {
        return undefined;
    }
    return {
        type: "fmlPreview.navigate",
        line: candidate.line,
        column: candidate.column,
        length: candidate.length,
        ...(candidate.uri === undefined ? {} : {uri: candidate.uri}),
        version: candidate.version,
    };
}

export function parseFmlPreviewOptionsMessage(message: unknown): FmlPreviewOptionsMessage | undefined {
    if (!message || typeof message !== "object" || Array.isArray(message)) {
        return undefined;
    }
    const candidate = message as Record<string, unknown>;
    if (candidate.type !== "fmlPreview.setShowAllProperties"
        || typeof candidate.showAllProperties !== "boolean") {
        return undefined;
    }
    return {
        type: "fmlPreview.setShowAllProperties",
        showAllProperties: candidate.showAllProperties,
    };
}

function createPreviewHtml(
    webview: Webview,
    svg: string,
    fileName: string,
    documentVersion: number,
    showAllPropertiesToggle: boolean,
    showAllProperties: boolean,
): string {
    const cspSource = webview.cspSource;
    const nonce = randomBytes(18).toString("base64");
    const toolbar = showAllPropertiesToggle
        ? `<header class="preview-toolbar">
        <label class="preview-toggle">
            <input class="show-all-properties-toggle" type="checkbox"${showAllProperties ? " checked" : ""}>
            <span>Show all properties</span>
        </label>
    </header>`
        : "";
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${cspSource} 'unsafe-inline'; img-src ${cspSource} data:; script-src 'nonce-${nonce}';">
    <title>${escapeHtml(fileName)} preview</title>
    <style>
        :root { color-scheme: light dark; }
        body {
            box-sizing: border-box;
            height: 100vh;
            margin: 0;
            min-width: 320px;
            overflow: hidden;
            padding: 24px;
            color: var(--vscode-editor-foreground);
            background: var(--vscode-editor-background);
            font-family: var(--vscode-font-family);
        }
        .preview-shell {
            box-sizing: border-box;
            width: 100%;
            height: calc(100vh - 48px);
            overflow: auto;
        }
        body.has-preview-toolbar .preview-shell {
            height: calc(100vh - 88px);
        }
        .preview-toolbar {
            box-sizing: border-box;
            display: flex;
            align-items: center;
            height: 32px;
            margin-bottom: 8px;
            border-bottom: 1px solid var(--vscode-panel-border);
        }
        .preview-toggle {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            min-height: 24px;
            user-select: none;
        }
        .show-all-properties-toggle {
            width: 16px;
            height: 16px;
            margin: 0;
            accent-color: var(--vscode-focusBorder);
        }
        .preview-diagram {
            transition: opacity 120ms ease;
        }
        .preview-shell.is-stale .preview-diagram {
            opacity: 0.28;
            filter: grayscale(0.35);
            pointer-events: none;
            user-select: none;
        }
        .preview-status {
            position: fixed;
            inset: 0;
            display: grid;
            place-items: center;
            padding: 24px;
            pointer-events: none;
        }
        .preview-status[hidden] { display: none; }
        .preview-status-message {
            max-width: 360px;
            padding: 14px 18px;
            border: 1px solid var(--vscode-inputValidation-warningBorder);
            border-radius: 6px;
            color: var(--vscode-editor-foreground);
            background: var(--vscode-editorWidget-background);
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.24);
            text-align: center;
        }
        .preview-status-message strong { display: block; margin-bottom: 4px; }
        .fml-preview-svg {
            display: block;
            width: auto;
            max-width: none;
            height: auto;
            margin: 0 auto;
        }
        [data-fml-line][data-fml-column][data-fml-length] { cursor: pointer; }
        [data-fml-line][data-fml-column][data-fml-length]:focus {
            outline: 2px solid var(--vscode-focusBorder);
            outline-offset: 4px;
        }
    </style>
</head>
<body${showAllPropertiesToggle ? ' class="has-preview-toolbar"' : ""}>
    ${toolbar}
    <main class="preview-shell"><div class="preview-diagram">${svg}</div></main>
    <div class="preview-status" role="status" aria-live="polite" hidden>
        <div class="preview-status-message">
            <strong>Preview paused</strong>
            The FML is not currently valid. The last valid diagram is shown.
        </div>
    </div>
    <script nonce="${nonce}">
        const vscode = acquireVsCodeApi();
        const previewShell = document.querySelector(".preview-shell");
        const previewDiagram = document.querySelector(".preview-diagram");
        const previewStatus = document.querySelector(".preview-status");
        const showAllPropertiesToggle = document.querySelector(".show-all-properties-toggle");
        let sourceVersion = ${documentVersion};
        const navigationSelector = "[data-fml-line][data-fml-column][data-fml-length]";

        function navigate(line, column, length, uri, version) {
            const message = {
                type: "fmlPreview.navigate",
                line: Number(line),
                column: Number(column),
                length: Number(length),
                version: version === undefined ? sourceVersion : Number(version)
            };
            if (uri !== undefined) {
                try {
                    message.uri = decodeURIComponent(uri);
                } catch {
                    return;
                }
            }
            vscode.postMessage(message);
        }

        function navigateFromElement(element) {
            navigate(
                element.dataset.fmlLine,
                element.dataset.fmlColumn,
                element.dataset.fmlLength,
                element.dataset.fmlUri,
                element.dataset.fmlVersion
            );
        }

        function prepareNavigationElements() {
            for (const element of document.querySelectorAll(navigationSelector)) {
                if (!element.hasAttribute("tabindex")) {
                    element.setAttribute("tabindex", "0");
                }
                if (!element.hasAttribute("role")) {
                    element.setAttribute("role", "button");
                }
                if (!element.hasAttribute("aria-label")) {
                    element.setAttribute("aria-label", "Go to FML source");
                }
            }
        }

        prepareNavigationElements();

        showAllPropertiesToggle?.addEventListener("change", () => {
            vscode.postMessage({
                type: "fmlPreview.setShowAllProperties",
                showAllProperties: showAllPropertiesToggle.checked
            });
        });

        window.addEventListener("message", event => {
            const message = event.data;
            if (!previewShell || !previewDiagram || !previewStatus || !message) {
                return;
            }
            if (message.type === "fmlPreview.invalid") {
                previewShell.classList.add("is-stale");
                previewStatus.hidden = false;
                return;
            }
            if (message.type !== "fmlPreview.update" || typeof message.svg !== "string"
                || !Number.isSafeInteger(message.version)) return;
            const scrollLeft = previewShell.scrollLeft;
            const scrollTop = previewShell.scrollTop;
            previewDiagram.innerHTML = message.svg;
            sourceVersion = message.version;
            previewShell.classList.remove("is-stale");
            previewStatus.hidden = true;
            prepareNavigationElements();
            requestAnimationFrame(() => {
                previewShell.scrollLeft = scrollLeft;
                previewShell.scrollTop = scrollTop;
            });
        });

        document.addEventListener("click", event => {
            const element = event.target instanceof Element
                ? event.target.closest(navigationSelector)
                : null;
            if (element) {
                navigateFromElement(element);
            }
        });

        document.addEventListener("keydown", event => {
            if (event.key !== "Enter" && event.key !== " ") {
                return;
            }
            const element = event.target instanceof Element
                ? event.target.closest(navigationSelector)
                : null;
            if (element) {
                event.preventDefault();
                navigateFromElement(element);
            }
        });

        window.fmlPreview = Object.freeze({navigate});
    </script>
</body>
</html>`;
}

function createErrorHtml(webview: Webview): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource} 'unsafe-inline';">
    <title>FML preview error</title>
    <style>
        body { padding: 24px; color: var(--vscode-editor-foreground); background: var(--vscode-editor-background); font-family: var(--vscode-font-family); }
        .error { padding: 16px; border-left: 4px solid var(--vscode-errorForeground); background: var(--vscode-inputValidation-errorBackground); }
    </style>
</head>
<body><div class="error"><strong>Preview unavailable</strong><p>Fix the FML errors in the editor to generate the diagram.</p></div></body>
</html>`;
}

function escapeHtml(value: string): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function clamp(value: number, minimum: number, maximum: number): number {
    return Math.min(Math.max(value, minimum), maximum);
}

function isNavigationInteger(value: unknown, minimum: number): value is number {
    return typeof value === "number"
        && Number.isSafeInteger(value)
        && value >= minimum;
}
