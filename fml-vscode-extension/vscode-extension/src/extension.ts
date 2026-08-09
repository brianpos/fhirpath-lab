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
import {registerFmlDebugger} from "./FmlDebugger";
import {FmlLanguageServerStatus} from "./FmlLanguageServerStatus";
import {FmlPreviewManager} from "./FmlPreviewManager";
import {MapBuilderWatcher} from "./MapBuilderWatcher";
import {SushiConfigWatcher} from "./SushiConfigWatcher";
import {UiConstants} from "./constants/UiConstants";
import {executeWithProgress, logData} from "./utils";
import {parseFmlModel, resolveFmlStructureType, toFhirVersion} from "@fhirpath-lab/validator";

const FML_MODE = {language: "fml"};
let languageClient: LanguageClient | undefined;

export interface FmlValidationBatchResult {
    fileCount: number;
    validatedFileCount: number;
    failedFileCount: number;
    errorCount: number;
    warningCount: number;
    informationCount: number;
}

export async function waitForWorkspaceIndexBeforeValidation(
    isWorkspaceIndexReady: () => boolean,
    waitForWorkspaceIndex: () => Promise<void>,
    reportWaiting: () => void,
): Promise<void> {
    if (!isWorkspaceIndexReady()) {
        reportWaiting();
    }
    await waitForWorkspaceIndex();
}

export async function activate(context: vscode.ExtensionContext): Promise<void> {
    const reindexWorkspaceRef: {
        current?: () => Promise<WorkspaceIndexResult | undefined>;
    } = {};
    const sushiConfigWatcher = new SushiConfigWatcher(
        UiConstants.detailsChannel,
        undefined,
        async () => {
            await reindexWorkspaceRef.current?.();
        },
    );
    context.subscriptions.push(sushiConfigWatcher);
    await sushiConfigWatcher.initialize();
    const previewManager = new FmlPreviewManager(
        undefined,
        filePath => sushiConfigWatcher.getConfigurationForPath(filePath),
    );
    context.subscriptions.push(previewManager);
    registerFmlDebugger(
        context,
        program => sushiConfigWatcher.getConfigurationForPath(program),
    );

    addFmlTemplate(context);
    addPreviewCommand(previewManager, context);
    languageClient = createLanguageClient(context);
    await languageClient.start();
    const queuedWorkspaceEvents: WorkspaceFileEvent[] = [];
    let workspaceIndexInitialized = false;
    let indexOperation: Promise<WorkspaceIndexResult | undefined> | undefined;
    let workspaceReadyOperation: Promise<unknown> = Promise.resolve();
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
            sushiConfigWatcher.getWorkspaceConfiguration(),
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
        workspaceReadyOperation = indexOperation;
        return indexOperation;
    };
    reindexWorkspaceRef.current = reindexWorkspace;
    const serverStatus = new FmlLanguageServerStatus(
        languageClient,
        reindexWorkspace,
        async () => {
            workspaceIndexInitialized = false;
            const restartOperation = (async () => {
                const previousIndexOperation = indexOperation;
                await languageClient?.restart();
                if (previousIndexOperation) {
                    await previousIndexOperation;
                }
                await reindexWorkspace();
            })();
            workspaceReadyOperation = restartOperation;
            await restartOperation;
        },
    );
    context.subscriptions.push(serverStatus);
    void reindexWorkspace().then(() => serverStatus.refresh());
    const waitForWorkspaceIndex = async (): Promise<void> => {
        while (!workspaceIndexInitialized) {
            await workspaceReadyOperation;
        }
    };
    addValidationCommand(
        languageClient,
        context,
        waitForWorkspaceIndex,
        () => workspaceIndexInitialized,
    );

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
    sushiConfiguration: import("./SushiConfigWatcher").SushiWorkspaceConfiguration,
): Promise<WorkspaceIndexResult | undefined> {
    try {
        const files = await watcher.scanFmlFiles();
        await logProfileResolutions(files, sushiConfiguration, logger);
        logData(`Sending ${files.length} FML file(s) to the language-server index.`, logger);
        const result = await client.sendRequest<WorkspaceIndexResult>(
            INDEX_WORKSPACE_REQUEST,
            {
                uris: files.map(uri => uri.toString()),
                defaultFhirVersion: toFhirVersion(sushiConfiguration.fhirVersion),
                profileBaseTypes: sushiConfiguration.profileBaseTypes,
                customTypeModels: sushiConfiguration.customTypeModels,
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

async function logProfileResolutions(
    files: vscode.Uri[],
    configuration: import("./SushiConfigWatcher").SushiWorkspaceConfiguration,
    logger: vscode.OutputChannel,
): Promise<void> {
    const searched = new Set<string>();
    for (const file of files) {
        try {
            const sourceText = new TextDecoder().decode(await vscode.workspace.fs.readFile(file));
            const model = parseFmlModel(sourceText);
            if (!model) {
                logData(`Profile resolution: unable to parse ${file.fsPath}`, logger);
                continue;
            }
            for (const structure of model.structures) {
                const canonical = (structure.canonical ?? structure.url).split("|")[0];
                if (searched.has(canonical)) {
                    continue;
                }
                searched.add(canonical);
                logData(`Profile resolution: searching ${canonical}`, logger);
                const typeName = resolveFmlStructureType(canonical, configuration.profileBaseTypes);
                const source = configuration.profileResolutionSources[canonical];
                if (typeName && source) {
                    logData(
                        `Profile resolution: found ${typeName}`
                        + `${configuration.customTypeModels[typeName] ? " logical model" : " profile"}`
                        + ` in ${source}`,
                        logger,
                    );
                } else if (typeName) {
                    logData(
                        `Profile resolution: found ${typeName} in built-in core model `
                        + `(${toFhirVersion(configuration.fhirVersion) ?? "FML-declared release"})`,
                        logger,
                    );
                } else {
                    logData(`Profile resolution: unresolved ${canonical}`, logger);
                }
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            logData(`Profile resolution: unable to inspect ${file.fsPath}: ${message}`, logger);
        }
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

function addValidationCommand(
    client: LanguageClient,
    context: vscode.ExtensionContext,
    waitForWorkspaceIndex: () => Promise<void>,
    isWorkspaceIndexReady: () => boolean,
): void {
    context.subscriptions.push(vscode.commands.registerCommand("fmlTools.Validation", async (
        resource?: vscode.Uri,
        selectedResources?: vscode.Uri[],
    ) => {
        const explorerResources = selectedResources?.length
            ? selectedResources
            : resource ? [resource] : [];
        if (explorerResources.length > 0) {
            try {
                const files = await collectFmlFiles(explorerResources);
                if (files.length === 0) {
                    const emptyResult: FmlValidationBatchResult = {
                        fileCount: 0,
                        validatedFileCount: 0,
                        failedFileCount: 0,
                        errorCount: 0,
                        warningCount: 0,
                        informationCount: 0,
                    };
                    void vscode.window.showInformationMessage("No FML files were found.");
                    return emptyResult;
                }
                const result = await executeWithProgress(
                    isWorkspaceIndexReady()
                        ? `Validating 0/${files.length} FML file(s)...`
                        : "Paused: waiting for FML workspace indexing to complete...",
                    async progress => {
                        await waitForWorkspaceIndexBeforeValidation(
                            isWorkspaceIndexReady,
                            waitForWorkspaceIndex,
                            () => {
                            progress.report({
                                message: "Validation Paused: waiting for FML workspace indexing to complete...",
                            });
                            },
                        );
                        progress.report({message: `Validating 0/${files.length} FML file(s)...`});
                        return validateFmlFiles(client, files, (completed, uri) => {
                        progress.report({
                            increment: 100 / files.length,
                            message: `Processed ${completed}/${files.length}: ${path.posix.basename(uri.path)}`,
                        });
                        });
                    },
                );
                showBatchValidationSummary(result);
                return result;
            } catch (error) {
                const message = error instanceof Error ? error.message : String(error);
                void vscode.window.showErrorMessage(`Unable to validate FML files: ${message}`);
                return undefined;
            }
        }

        const document = vscode.window.activeTextEditor?.document;
        if (!document || document.languageId !== FML_MODE.language) {
            void vscode.window.showErrorMessage("Open an FML document before running validation.");
            return;
        }

        try {
            const result = await executeWithProgress(
                isWorkspaceIndexReady()
                    ? "Validating FML..."
                    : "Waiting for FML workspace indexing to complete...",
                async progress => {
                    await waitForWorkspaceIndexBeforeValidation(
                        isWorkspaceIndexReady,
                        waitForWorkspaceIndex,
                        () => progress.report({
                            message: "Waiting for FML workspace indexing to complete...",
                        }),
                    );
                    progress.report({message: "Validating FML..."});
                    return client.sendRequest<DocumentValidationResult>(
                        VALIDATE_DOCUMENT_REQUEST,
                        {uri: document.uri.toString()} satisfies ValidateDocumentRequest,
                    );
                },
            );
            showValidationSummary(result);
            return result;
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            void vscode.window.showErrorMessage(`Unable to validate FML: ${message}`);
            return undefined;
        }
    }));
}

async function collectFmlFiles(resources: vscode.Uri[]): Promise<vscode.Uri[]> {
    const files = new Map<string, vscode.Uri>();
    const visit = async (resource: vscode.Uri): Promise<void> => {
        const stat = await vscode.workspace.fs.stat(resource);
        if ((stat.type & vscode.FileType.Directory) !== 0) {
            const entries = await vscode.workspace.fs.readDirectory(resource);
            entries.sort(([left], [right]) => left.localeCompare(right));
            for (const [name, type] of entries) {
                if ((type & vscode.FileType.SymbolicLink) !== 0) {
                    continue;
                }
                const child = vscode.Uri.joinPath(resource, name);
                if ((type & vscode.FileType.Directory) !== 0) {
                    await visit(child);
                } else if ((type & vscode.FileType.File) !== 0 && isFmlUri(child)) {
                    files.set(child.toString(), child);
                }
            }
        } else if ((stat.type & vscode.FileType.File) !== 0 && isFmlUri(resource)) {
            files.set(resource.toString(), resource);
        }
    };
    for (const resource of resources) {
        await visit(resource);
    }
    return [...files.values()];
}

function isFmlUri(uri: vscode.Uri): boolean {
    return path.posix.extname(uri.path).toLowerCase() === ".fml";
}

async function validateFmlFiles(
    client: LanguageClient,
    files: vscode.Uri[],
    reportProgress?: (completed: number, uri: vscode.Uri) => void,
): Promise<FmlValidationBatchResult> {
    const summary: FmlValidationBatchResult = {
        fileCount: files.length,
        validatedFileCount: 0,
        failedFileCount: 0,
        errorCount: 0,
        warningCount: 0,
        informationCount: 0,
    };
    for (let index = 0; index < files.length; index++) {
        const uri = files[index];
        try {
            let document = await vscode.workspace.openTextDocument(uri);
            if (document.languageId !== FML_MODE.language) {
                document = await vscode.languages.setTextDocumentLanguage(document, FML_MODE.language);
            }
            const result = await client.sendRequest<DocumentValidationResult>(
                VALIDATE_DOCUMENT_REQUEST,
                {
                    uri: document.uri.toString(),
                    retainDiagnostics: true,
                } satisfies ValidateDocumentRequest,
            );
            summary.validatedFileCount++;
            summary.errorCount += result.errorCount;
            summary.warningCount += result.warningCount;
            summary.informationCount += result.informationCount;
        } catch (error) {
            summary.failedFileCount++;
            const message = error instanceof Error ? error.message : String(error);
            logData(`Unable to validate ${uri.toString()}: ${message}`, UiConstants.detailsChannel);
        } finally {
            reportProgress?.(index + 1, uri);
        }
    }
    return summary;
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

function showBatchValidationSummary(result: FmlValidationBatchResult): void {
    const scope = `${result.validatedFileCount}/${result.fileCount} FML file(s)`;
    if (result.failedFileCount > 0) {
        void vscode.window.showErrorMessage(
            `Validated ${scope}; ${result.failedFileCount} file(s) could not be validated. `
            + `${result.errorCount} error(s) and ${result.warningCount} warning(s) were reported.`,
        );
        return;
    }
    if (result.errorCount > 0) {
        void vscode.window.showErrorMessage(
            `FML validation found ${result.errorCount} error(s) and ${result.warningCount} warning(s) `
            + `in ${scope}. See the Problems panel for details.`,
        );
        return;
    }
    if (result.warningCount > 0) {
        void vscode.window.showWarningMessage(
            `FML validation completed with ${result.warningCount} warning(s) in ${scope}. `
            + "See the Problems panel for details.",
        );
        return;
    }
    void vscode.window.showInformationMessage(`Validated ${scope}; all files are valid.`);
}
