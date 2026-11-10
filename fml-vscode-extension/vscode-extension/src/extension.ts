import {
    DocumentValidationResult,
    EvaluationModelContext,
    GET_IMPORT_VISIBLE_DOCUMENTS_REQUEST,
    INDEX_WORKSPACE_REQUEST,
    ImportVisibleDocumentsRequest,
    ImportVisibleDocumentsResult,
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
import {FmlTestController} from "./FmlTestController";
import {FmlLanguageServerStatus} from "./FmlLanguageServerStatus";
import {FmlWorkspaceIndexController} from "./FmlWorkspaceIndexController";
import {
    EVALUATE_FML_TOOL,
    FmlEvaluationTool,
    FmlValidationTool,
    VALIDATE_FML_TOOL,
} from "./FmlLanguageTools";
import {FmlPreviewManager} from "./FmlPreviewManager";
import {
    CompleteDiagramFmlSvgRenderer,
    FmlExternalGroupSource,
    FmlExternalGroupSourceResolver,
} from "./FmlPreviewRenderer";
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
    const serverStatusRef: {current?: FmlLanguageServerStatus} = {};
    let waitForWorkspaceIndexForPreview = async (): Promise<void> => undefined;
    const testControllerRef: {current?: FmlTestController} = {};
    const sushiConfigWatcher = new SushiConfigWatcher(
        UiConstants.detailsChannel,
        undefined,
        async () => {
            await reindexWorkspaceRef.current?.();
            await testControllerRef.current?.refresh();
        },
    );
    context.subscriptions.push(sushiConfigWatcher);
    await sushiConfigWatcher.initialize();
    const previewManager = new FmlPreviewManager(
        undefined,
        filePath => sushiConfigWatcher.getConfigurationForPath(filePath),
    );
    const completePreviewManager = new FmlPreviewManager(
        new CompleteDiagramFmlSvgRenderer(undefined, async source => {
            await waitForWorkspaceIndexForPreview();
            return createExternalGroupSourceResolver(languageClient, source.uri);
        }),
        filePath => sushiConfigWatcher.getConfigurationForPath(filePath),
        {
            viewType: "fmlCompleteMapPreview",
            titlePrefix: "Complete Preview",
            showAllPropertiesToggle: true,
            beginRenderActivity: source => source.showAllProperties
                ? serverStatusRef.current?.beginActivity({
                    statusText: "expanding preview",
                    title: "Building Complete FML preview",
                    detail: `Resolving imported FML maps and expanding all properties for ${source.fileName}.`,
                })
                : undefined,
        },
    );
    context.subscriptions.push(previewManager, completePreviewManager);
    registerFmlDebugger(
        context,
        program => sushiConfigWatcher.getConfigurationForPath(program),
    );

    const testController = new FmlTestController(program => sushiConfigWatcher.getConfigurationForPath(program));
    testControllerRef.current = testController;
    context.subscriptions.push(testController);
    void testController.refresh();

    addFmlTemplate(context);
    addPreviewCommand("fmlTools.OpenPreviewToSide", previewManager, context);
    addPreviewCommand("fmlTools.OpenCompletePreviewToSide", completePreviewManager, context);
    languageClient = createLanguageClient(context);
    await languageClient.start();
    const queuedWorkspaceEvents: WorkspaceFileEvent[] = [];
    const watcher = new MapBuilderWatcher(UiConstants.detailsChannel, {
        onFmlFile: event => {
            const workspaceEvent: WorkspaceFileEvent = {
                type: event.type,
                uri: event.uri.toString(),
            };
            if (!indexController.isReady) {
                queuedWorkspaceEvents.push(workspaceEvent);
                return;
            }

            return languageClient?.sendNotification(WORKSPACE_FILE_EVENT_NOTIFICATION, workspaceEvent);
        },
    });
    context.subscriptions.push(watcher);
    const indexController = new FmlWorkspaceIndexController(
        async () => {
            const result = await initializeWorkspaceIndex(
                watcher,
                languageClient!,
                UiConstants.detailsChannel,
                sushiConfigWatcher.getWorkspaceConfiguration(),
                sushiConfigWatcher.getEvaluationContexts(),
            );
            logData(
                `Replaying ${queuedWorkspaceEvents.length} filesystem event(s) after indexing.`,
                UiConstants.detailsChannel,
            );
            while (queuedWorkspaceEvents.length > 0) {
                await languageClient!.sendNotification(
                    WORKSPACE_FILE_EVENT_NOTIFICATION,
                    queuedWorkspaceEvents[0],
                );
                queuedWorkspaceEvents.shift();
            }
            return result;
        },
        async () => { await languageClient!.restart(); },
    );
    reindexWorkspaceRef.current = () => indexController.reindex(true);
    const activeServerStatus = new FmlLanguageServerStatus(
        languageClient,
        () => indexController.reindex(),
        async () => { await indexController.restart(); },
    );
    serverStatusRef.current = activeServerStatus;
    context.subscriptions.push(activeServerStatus);
    void indexController.reindex().then(
        () => activeServerStatus.refresh(),
        error => {
            const message = error instanceof Error ? error.message : String(error);
            void vscode.window.showErrorMessage(`FML workspace indexing failed: ${message}`);
            return activeServerStatus.refresh();
        },
    );
    const waitForWorkspaceIndex = () => indexController.waitUntilReady();
    waitForWorkspaceIndexForPreview = waitForWorkspaceIndex;
    addValidationCommand(
        languageClient,
        context,
        waitForWorkspaceIndex,
        () => indexController.isReady,
    );
    context.subscriptions.push(
        vscode.lm.registerTool(
            VALIDATE_FML_TOOL,
            new FmlValidationTool(languageClient, waitForWorkspaceIndex),
        ),
        vscode.lm.registerTool(
            EVALUATE_FML_TOOL,
            new FmlEvaluationTool(
                languageClient,
                waitForWorkspaceIndex,
                program => sushiConfigWatcher.getEvaluationConfigurationForPath(program),
            ),
        ),
    );
}

export async function createExternalGroupSourceResolver(
    client: LanguageClient | undefined,
    sourceUri: vscode.Uri,
): Promise<FmlExternalGroupSourceResolver | undefined> {
    if (!client) {
        return undefined;
    }
    try {
        const result = await client.sendRequest<ImportVisibleDocumentsResult>(
            GET_IMPORT_VISIBLE_DOCUMENTS_REQUEST,
            {uri: sourceUri.toString()} satisfies ImportVisibleDocumentsRequest,
        );
        const sourcesByGroupName = new Map<string, FmlExternalGroupSource>();
        for (const uriText of result.uris) {
            const document = await vscode.workspace.openTextDocument(vscode.Uri.parse(uriText));
            const text = document.getText();
            const map = parseFmlModel(text);
            if (!map) {
                continue;
            }
            const source: FmlExternalGroupSource = {
                uri: document.uri.toString(),
                text,
                version: document.version,
            };
            for (const group of map.groups) {
                if (!sourcesByGroupName.has(group.name)) {
                    sourcesByGroupName.set(group.name, source);
                }
            }
        }
        return sourcesByGroupName.size > 0
            ? groupName => sourcesByGroupName.get(groupName)
            : undefined;
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        logData(`Unable to resolve imported FML groups for preview: ${message}`, UiConstants.detailsChannel);
        return undefined;
    }
}

function addPreviewCommand(
    command: string,
    previewManager: FmlPreviewManager,
    context: vscode.ExtensionContext,
): void {
    context.subscriptions.push(vscode.commands.registerCommand(command, () => {
        const document = vscode.window.activeTextEditor?.document;
        if (!document || document.languageId !== FML_MODE.language) {
            void vscode.window.showErrorMessage("Open an FML document before opening the preview.");
            return undefined;
        }
        return previewManager.open(document);
    }));
}

export async function initializeWorkspaceIndex(
    watcher: Pick<MapBuilderWatcher, "scanFmlFiles">,
    client: Pick<LanguageClient, "sendRequest">,
    logger: vscode.OutputChannel,
    sushiConfiguration: import("./SushiConfigWatcher").SushiWorkspaceConfiguration,
    evaluationContexts: readonly EvaluationModelContext[],
): Promise<WorkspaceIndexResult> {
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
                modelFiles: sushiConfiguration.modelFileCache,
                evaluationContexts,
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
        throw error;
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
