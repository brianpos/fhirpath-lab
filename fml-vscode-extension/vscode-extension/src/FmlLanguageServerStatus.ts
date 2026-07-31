import {
    FmlServerStatus,
    GET_INDEX_FAILURES_REQUEST,
    GET_SERVER_STATUS_REQUEST,
    SERVER_STATUS_CHANGED_NOTIFICATION,
    WorkspaceIndexFailure,
    WorkspaceIndexResult,
} from "@fhirpath-lab/language-service";
import path from "node:path";
import * as vscode from "vscode";
import {LanguageClient} from "vscode-languageclient/node";

type StatusAction =
    | "copy"
    | "failures"
    | "logs"
    | "reindex"
    | "restart";

interface StatusQuickPickItem extends vscode.QuickPickItem {
    action?: StatusAction;
}

export class FmlLanguageServerStatus implements vscode.Disposable {
    private readonly statusBarItem: vscode.StatusBarItem;
    private readonly disposables: vscode.Disposable[] = [];
    private currentStatus?: FmlServerStatus;

    public constructor(
        private readonly client: LanguageClient,
        private readonly reindex: () => Promise<WorkspaceIndexResult | undefined>,
        private readonly restart: () => Promise<void>,
    ) {
        this.statusBarItem = vscode.window.createStatusBarItem(
            vscode.StatusBarAlignment.Left,
            80,
        );
        this.statusBarItem.name = "FML Language Server";
        this.statusBarItem.command = "fmlTools.ShowLanguageServerStatus";
        this.setStarting();
        this.statusBarItem.show();

        this.disposables.push(
            this.statusBarItem,
            this.client.onNotification(
                SERVER_STATUS_CHANGED_NOTIFICATION,
                (status: FmlServerStatus) => this.update(status),
            ),
            vscode.commands.registerCommand(
                "fmlTools.ShowLanguageServerStatus",
                () => this.showStatus(),
            ),
            vscode.commands.registerCommand(
                "fmlTools.ReindexLanguageServer",
                () => this.runReindex(),
            ),
            vscode.commands.registerCommand(
                "fmlTools.RestartLanguageServer",
                () => this.runRestart(),
            ),
        );
    }

    public async refresh(): Promise<FmlServerStatus | undefined> {
        try {
            const status = await this.client.sendRequest<FmlServerStatus>(
                GET_SERVER_STATUS_REQUEST,
            );
            this.update(status);
            return status;
        } catch {
            this.setUnavailable();
            return undefined;
        }
    }

    public dispose(): void {
        for (const disposable of this.disposables) {
            disposable.dispose();
        }
    }

    private update(status: FmlServerStatus): void {
        this.currentStatus = status;
        this.statusBarItem.backgroundColor = undefined;
        this.statusBarItem.text = statusBarText(status);
        this.statusBarItem.tooltip = statusTooltip(status);
        if (status.state === "error") {
            this.statusBarItem.backgroundColor = new vscode.ThemeColor(
                "statusBarItem.errorBackground",
            );
        } else if (status.failedFileCount > 0) {
            this.statusBarItem.backgroundColor = new vscode.ThemeColor(
                "statusBarItem.warningBackground",
            );
        }
    }

    private setStarting(): void {
        this.statusBarItem.text = "$(loading~spin) FML: starting";
        this.statusBarItem.tooltip = "FHIR Mapping Language Tools language server is starting.";
        this.statusBarItem.backgroundColor = undefined;
    }

    private setUnavailable(): void {
        this.statusBarItem.text = "$(error) FML: unavailable";
        this.statusBarItem.tooltip = "FHIR Mapping Language Tools language server is unavailable.";
        this.statusBarItem.backgroundColor = new vscode.ThemeColor(
            "statusBarItem.errorBackground",
        );
    }

    private async showStatus(): Promise<void> {
        const status = await this.refresh();
        if (!status) {
            const selection = await vscode.window.showQuickPick<StatusQuickPickItem>([
                {
                    label: "$(debug-restart) Restart language server",
                    action: "restart",
                },
                {
                    label: "$(output) Open language-server logs",
                    action: "logs",
                },
            ], {
                title: "FHIR Mapping Language Tools Language Server",
                placeHolder: "Language server is unavailable",
            });
            await this.runAction(selection?.action);
            return;
        }

        const selection = await vscode.window.showQuickPick<StatusQuickPickItem>(
            statusItems(status),
            {
                title: "FHIR Mapping Language Tools Language Server",
                placeHolder: "Select an action",
                matchOnDescription: true,
                matchOnDetail: true,
            },
        );
        await this.runAction(selection?.action);
    }

    private async runAction(action: StatusAction | undefined): Promise<void> {
        switch (action) {
            case "reindex":
                await this.runReindex();
                break;
            case "restart":
                await this.runRestart();
                break;
            case "logs":
                this.client.outputChannel.show(true);
                break;
            case "failures":
                await this.showFailures();
                break;
            case "copy":
                await this.copySummary();
                break;
        }
    }

    private async runReindex(): Promise<WorkspaceIndexResult | undefined> {
        return vscode.window.withProgress(
            {
                location: vscode.ProgressLocation.Notification,
                title: "Re-indexing FML workspace",
                cancellable: false,
            },
            async () => {
                const result = await this.reindex();
                await this.refresh();
                return result;
            },
        );
    }

    private async runRestart(): Promise<void> {
        await vscode.window.withProgress(
            {
                location: vscode.ProgressLocation.Notification,
                title: "Restarting FML language server",
                cancellable: false,
            },
            async () => {
                this.setStarting();
                await this.restart();
                await this.refresh();
            },
        );
    }

    private async showFailures(): Promise<void> {
        const failures = await this.client.sendRequest<WorkspaceIndexFailure[]>(
            GET_INDEX_FAILURES_REQUEST,
        );
        if (failures.length === 0) {
            void vscode.window.showInformationMessage(
                "The FML workspace index has no failed files.",
            );
            return;
        }

        const selected = await vscode.window.showQuickPick(
            failures.map(failure => ({
                label: `$(error) ${displayName(failure.uri)}`,
                description: failure.message,
                detail: `${failure.uri} • ${formatTimestamp(failure.occurredAt)}`,
                failure,
            })),
            {
                title: `FML Index Failures (${failures.length})`,
                placeHolder: "Select a file to open",
                matchOnDescription: true,
                matchOnDetail: true,
            },
        );
        if (selected) {
            try {
                const document = await vscode.workspace.openTextDocument(
                    vscode.Uri.parse(selected.failure.uri),
                );
                await vscode.window.showTextDocument(document);
            } catch (error) {
                const message = error instanceof Error ? error.message : String(error);
                void vscode.window.showErrorMessage(
                    `Unable to open failed FML file: ${message}`,
                );
            }
        }
    }

    private async copySummary(): Promise<void> {
        const status = this.currentStatus ?? await this.refresh();
        if (!status) {
            return;
        }
        await vscode.env.clipboard.writeText(formatStatusSummary(status));
        void vscode.window.showInformationMessage(
            "FHIR Mapping Language Tools language-server summary copied.",
        );
    }
}

export function formatStatusSummary(status: FmlServerStatus): string {
    return [
        "FHIR Mapping Language Tools Language Server",
        `State: ${status.state}`,
        `Workspace files: ${status.fileCount}`,
        `Canonical URLs: ${status.canonicalUrlCount}`,
        `Groups: ${status.groupCount}`,
        `Imports: ${status.importCount}`,
        `Open documents: ${status.openDocumentCount}`,
        `Index failures: ${status.failedFileCount}`,
        `Last indexed: ${status.lastIndexedAt ?? "Never"}`,
        `Index duration: ${status.durationMs}ms`,
        ...(status.lastError ? [`Last error: ${status.lastError}`] : []),
    ].join("\n");
}

function statusItems(status: FmlServerStatus): StatusQuickPickItem[] {
    return [
        {
            label: `${stateIcon(status.state)} ${capitalize(status.state)}`,
            description: status.lastError,
            detail: "Current language-server state",
        },
        {
            label: "$(files) Workspace files",
            description: String(status.fileCount),
            detail: `${status.canonicalUrlCount} canonical URLs • ${status.groupCount} groups • ${status.importCount} imports`,
        },
        {
            label: "$(book) Open documents",
            description: String(status.openDocumentCount),
        },
        {
            label: status.failedFileCount > 0
                ? "$(warning) Index failures"
                : "$(pass) Index failures",
            description: String(status.failedFileCount),
            detail: status.failedFileCount > 0
                ? "Select “Show failed files” below for details"
                : "No failures",
        },
        {
            label: "$(history) Last indexed",
            description: status.lastIndexedAt
                ? formatTimestamp(status.lastIndexedAt)
                : "Never",
            detail: `${status.durationMs}ms`,
        },
        {label: "$(refresh) Re-index workspace", action: "reindex"},
        {label: "$(debug-restart) Restart language server", action: "restart"},
        {label: "$(output) Open language-server logs", action: "logs"},
        {
            label: "$(list-unordered) Show failed files",
            description: String(status.failedFileCount),
            action: "failures",
        },
        {label: "$(copy) Copy diagnostics summary", action: "copy"},
    ];
}

function statusBarText(status: FmlServerStatus): string {
    if (status.state === "indexing") {
        return "$(sync~spin) FML: indexing";
    }
    if (status.state === "error") {
        return "$(error) FML: error";
    }
    if (status.state === "starting") {
        return "$(loading~spin) FML: starting";
    }
    const failures = status.failedFileCount > 0
        ? ` $(warning) ${status.failedFileCount}`
        : "";
    return `$(database) FML: ${status.fileCount} maps${failures}`;
}

function statusTooltip(status: FmlServerStatus): vscode.MarkdownString {
    const tooltip = new vscode.MarkdownString(undefined, true);
    tooltip.appendMarkdown(`**FHIR Mapping Language Tools Language Server** — ${capitalize(status.state)}\n\n`);
    tooltip.appendMarkdown(
        `${status.fileCount} files · ${status.canonicalUrlCount} canonical URLs · `
        + `${status.groupCount} groups · ${status.importCount} imports\n\n`,
    );
    tooltip.appendMarkdown(
        `${status.openDocumentCount} open documents · ${status.failedFileCount} failures\n\n`,
    );
    tooltip.appendMarkdown("Click for status and recovery actions.");
    return tooltip;
}

function stateIcon(state: FmlServerStatus["state"]): string {
    switch (state) {
        case "ready":
            return "$(pass)";
        case "indexing":
            return "$(sync~spin)";
        case "error":
            return "$(error)";
        case "starting":
            return "$(loading~spin)";
    }
}

function formatTimestamp(value: string): string {
    const timestamp = new Date(value);
    return Number.isNaN(timestamp.getTime())
        ? value
        : timestamp.toLocaleString();
}

function displayName(uri: string): string {
    try {
        return path.basename(vscode.Uri.parse(uri).fsPath) || uri;
    } catch {
        return uri;
    }
}

function capitalize(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
}
