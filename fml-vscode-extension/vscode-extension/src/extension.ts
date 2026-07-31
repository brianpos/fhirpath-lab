import {
    DocumentValidationResult,
    INDEX_WORKSPACE_REQUEST,
    VALIDATE_DOCUMENT_REQUEST,
    ValidateDocumentRequest,
    WORKSPACE_FILE_EVENT_NOTIFICATION,
    WorkspaceFileEvent,
    WorkspaceIndexRequest,
    WorkspaceIndexResult,
} from "@fhirpath-lab/language-service";
import path from "node:path";
import * as vscode from "vscode";
import {
    LanguageClient,
    LanguageClientOptions,
    ServerOptions,
    TransportKind,
} from "vscode-languageclient/node";
import {FhirDefinition} from "./FhirDefinition";
import {registerFmlDebugger} from "./FmlDebugger";
import {FmlCompletionProvider} from "./FmlCompletionProvider";
import {FmlLanguageServerStatus} from "./FmlLanguageServerStatus";
import {FmlPreviewManager} from "./FmlPreviewManager";
import {MapBuilderWatcher} from "./MapBuilderWatcher";
import {UiConstants} from "./constants/UiConstants";
import {executeWithProgress, logData} from "./utils";

const FML_MODE = {language: "fml"};
let languageClient: LanguageClient | undefined;

export async function activate(context: vscode.ExtensionContext): Promise<{
    completionProviderInstance: FmlCompletionProvider | null;
}> {
    const [, completionProviderInstance] = addAutoComplete(UiConstants.principalChannel, context);
    const previewManager = new FmlPreviewManager();
    context.subscriptions.push(previewManager);
    registerFmlDebugger(context);

    addFmlTemplate(context);
    addPreviewCommand(previewManager, context);
    languageClient = createLanguageClient(context);
    await languageClient.start();
    const queuedWorkspaceEvents: WorkspaceFileEvent[] = [];
    let workspaceIndexInitialized = false;
    let indexOperation: Promise<WorkspaceIndexResult | undefined> | undefined;
    const watcher = new MapBuilderWatcher(UiConstants.detailsChannel, {
        onFmlFile: event => {
            const workspaceEvent: WorkspaceFileEvent = {
                type: event.type,
                uri: event.uri.toString(),
            };
            if (!workspaceIndexInitialized) {
                queuedWorkspaceEvents.push(workspaceEvent);
                return;
            }

            return languageClient?.sendNotification(WORKSPACE_FILE_EVENT_NOTIFICATION, workspaceEvent);
        },
    });
    context.subscriptions.push(watcher);
    const reindexWorkspace = (): Promise<WorkspaceIndexResult | undefined> => {
        if (indexOperation) {
            return indexOperation;
        }
        workspaceIndexInitialized = false;
        indexOperation = initializeWorkspaceIndex(
            watcher,
            languageClient!,
            UiConstants.detailsChannel,
        ).finally(() => {
            workspaceIndexInitialized = true;
            logData(
                `Replaying ${queuedWorkspaceEvents.length} filesystem event(s) after indexing.`,
                UiConstants.detailsChannel,
            );
            for (const event of queuedWorkspaceEvents.splice(0)) {
                void languageClient?.sendNotification(
                    WORKSPACE_FILE_EVENT_NOTIFICATION,
                    event,
                );
            }
            indexOperation = undefined;
        });
        return indexOperation;
    };
    const serverStatus = new FmlLanguageServerStatus(
        languageClient,
        reindexWorkspace,
        async () => {
            workspaceIndexInitialized = false;
            const previousIndexOperation = indexOperation;
            await languageClient?.restart();
            if (previousIndexOperation) {
                await previousIndexOperation;
            }
            await reindexWorkspace();
        },
    );
    context.subscriptions.push(serverStatus);
    void reindexWorkspace().then(() => serverStatus.refresh());
    addValidationCommand(languageClient, context);

    return {completionProviderInstance};
}

function addPreviewCommand(previewManager: FmlPreviewManager, context: vscode.ExtensionContext): void {
    context.subscriptions.push(vscode.commands.registerCommand("fmlTools.OpenPreviewToSide", () => {
        const document = vscode.window.activeTextEditor?.document;
        if (!document || document.languageId !== FML_MODE.language) {
            void vscode.window.showErrorMessage("Open an FML document before opening the preview.");
            return undefined;
        }
        return previewManager.open(document);
    }));
}

async function initializeWorkspaceIndex(
    watcher: MapBuilderWatcher,
    client: LanguageClient,
    logger: vscode.OutputChannel,
): Promise<WorkspaceIndexResult | undefined> {
    try {
        const files = await watcher.scanFmlFiles();
        logData(`Sending ${files.length} FML file(s) to the language-server index.`, logger);
        const result = await client.sendRequest<WorkspaceIndexResult>(
            INDEX_WORKSPACE_REQUEST,
            {
                uris: files.map(uri => uri.toString()),
            } satisfies WorkspaceIndexRequest,
        );
        logData(
            `Language-server index completed in ${result.durationMs}ms: ${result.fileCount} file(s), `
            + `${result.canonicalUrlCount} canonical URL(s), ${result.groupCount} group(s), `
            + `${result.importCount} import(s), ${result.failedFileCount} failure(s).`,
            logger,
        );
        return result;
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        logData(`Language-server workspace indexing failed: ${message}`, logger);
        return undefined;
    }
}

export async function deactivate(): Promise<void> {
    if (languageClient) {
        await languageClient.stop();
        languageClient = undefined;
    }
}

function createLanguageClient(context: vscode.ExtensionContext): LanguageClient {
    const serverModule = context.asAbsolutePath(path.join("dist", "language-server.js"));
    const serverOptions: ServerOptions = {
        run: {
            module: serverModule,
            transport: TransportKind.ipc,
        },
        debug: {
            module: serverModule,
            transport: TransportKind.ipc,
            options: {
                execArgv: ["--nolazy", "--inspect=6009"],
            },
        },
    };
    const clientOptions: LanguageClientOptions = {
        documentSelector: [
            {language: "fml", scheme: "file"},
            {language: "fml", scheme: "untitled"},
        ],
        outputChannelName: "FHIR Mapping Language Tools Language Server",
    };

    return new LanguageClient(
        "fmlLabLanguageServer",
        "FHIR Mapping Language Tools Language Server",
        serverOptions,
        clientOptions,
    );
}

function addAutoComplete(
    outputChannel: vscode.OutputChannel,
    context: vscode.ExtensionContext,
): [FhirDefinition, FmlCompletionProvider] {
    const fhirDefinitionInstance = new FhirDefinition(outputChannel);
    const completionProviderInstance = new FmlCompletionProvider(fhirDefinitionInstance, outputChannel);

    context.subscriptions.push(
        vscode.languages.registerCompletionItemProvider(FML_MODE, completionProviderInstance, "."),
    );

    return [fhirDefinitionInstance, completionProviderInstance];
}

function addFmlTemplate(context: vscode.ExtensionContext): void {
    context.subscriptions.push(vscode.commands.registerCommand("fmlTools.InsertTemplate", () => {
        if (vscode.window.activeTextEditor) {
            void vscode.languages.setTextDocumentLanguage(
                vscode.window.activeTextEditor.document,
                FML_MODE.language,
            );
            void vscode.commands.executeCommand("editor.action.insertSnippet", {"name": "Template"});
        }
    }));
}

function addValidationCommand(client: LanguageClient, context: vscode.ExtensionContext): void {
    context.subscriptions.push(vscode.commands.registerCommand("fmlTools.Validation", async () => {
        const document = vscode.window.activeTextEditor?.document;
        if (!document || document.languageId !== FML_MODE.language) {
            void vscode.window.showErrorMessage("Open an FML document before running validation.");
            return;
        }

        try {
            const result = await executeWithProgress("Validating FML...", () => {
                return client.sendRequest<DocumentValidationResult>(
                    VALIDATE_DOCUMENT_REQUEST,
                    {uri: document.uri.toString()} satisfies ValidateDocumentRequest,
                );
            });
            showValidationSummary(result);
            return result;
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            void vscode.window.showErrorMessage(`Unable to validate FML: ${message}`);
            return undefined;
        }
    }));
}

function showValidationSummary(result: DocumentValidationResult): void {
    if (result.errorCount > 0) {
        void vscode.window.showErrorMessage(
            `FML validation found ${result.errorCount} error(s). See the Problems panel for details.`,
        );
        return;
    }
    if (result.warningCount > 0) {
        void vscode.window.showWarningMessage(
            `FML validation completed with ${result.warningCount} warning(s). See the Problems panel for details.`,
        );
        return;
    }
    void vscode.window.showInformationMessage("FML is valid.");
}
