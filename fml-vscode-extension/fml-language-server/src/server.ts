import {
    DocumentValidationResult,
    FmlLanguageService,
    FmlServerStatus,
    GET_INDEX_FAILURES_REQUEST,
    GET_SERVER_STATUS_REQUEST,
    INDEX_WORKSPACE_REQUEST,
    SERVER_STATUS_CHANGED_NOTIFICATION,
    VALIDATE_DOCUMENT_REQUEST,
    ValidateDocumentRequest,
    WORKSPACE_FILE_EVENT_NOTIFICATION,
    WorkspaceFileEvent,
    WorkspaceIndexFailure,
    WorkspaceIndexRequest,
    WorkspaceIndexResult,
} from "@fhirpath-lab/language-service";
import {promises as fs} from "node:fs";
import {fileURLToPath} from "node:url";
import {
    CompletionItem,
    createConnection,
    ErrorCodes,
    InitializeResult,
    LSPErrorCodes,
    MarkupKind,
    ProposedFeatures,
    ResponseError,
    TextDocumentSyncKind,
    TextDocuments,
} from "vscode-languageserver/node";
import {TextDocument} from "vscode-languageserver-textdocument";
import {toLspCompletion, toLspDiagnostic} from "./lspMapper";
import {findGroupDefinitions, findGroupReferences, getUnresolvedGroupDiagnostics} from "./groupDefinitionProvider";
import {WorkspaceFmlIndex} from "./WorkspaceFmlIndex";
import {FmlServerStatusStore} from "./FmlServerStatusStore";

const VALIDATION_DELAY_MS = 150;
const connection = createConnection(ProposedFeatures.all);
const documents = new TextDocuments(TextDocument);
const languageService = new FmlLanguageService();
const pendingValidations = new Map<string, NodeJS.Timeout>();
const workspaceIndex = new WorkspaceFmlIndex();
const statusStore = new FmlServerStatusStore();
let workspaceIndexReady = false;

connection.onInitialize((): InitializeResult => ({
    capabilities: {
        textDocumentSync: TextDocumentSyncKind.Incremental,
        completionProvider: {
            triggerCharacters: ["=", "."],
        },
        definitionProvider: true,
        hoverProvider: true,
        referencesProvider: true,
    },
}));

documents.onDidOpen(event => {
    updateGroupSymbols(event.document);
    scheduleValidation(event.document, 0);
    publishServerStatus();
});

documents.onDidChangeContent(event => {
    updateGroupSymbols(event.document);
    scheduleValidation(event.document, VALIDATION_DELAY_MS);
});

documents.onDidClose(event => {
    cancelPendingValidation(event.document.uri);
    void restoreWorkspaceFile(event.document.uri);
    connection.sendDiagnostics({
        uri: event.document.uri,
        diagnostics: [],
    });
    publishServerStatus();
});

connection.onCompletion((parameters): CompletionItem[] => {
    const document = documents.get(parameters.textDocument.uri);
    if (!document) {
        return [];
    }

    return languageService.getCompletions({
        uri: document.uri,
        text: document.getText(),
        position: parameters.position,
    }).map(toLspCompletion);
});

connection.onDefinition(parameters => {
    return findGroupDefinitions(
        workspaceIndex,
        parameters.textDocument.uri,
        parameters.position,
    );
});

connection.onHover(parameters => {
    const document = documents.get(parameters.textDocument.uri);
    if (!document) {
        return null;
    }
    const hover = languageService.getHover({
        uri: document.uri,
        text: document.getText(),
        position: parameters.position,
    });
    return hover ? {
        contents: {kind: MarkupKind.Markdown, value: hover.markdown},
        range: hover.range,
    } : null;
});

connection.onReferences(parameters => {
    return findGroupReferences(
        workspaceIndex,
        parameters.textDocument.uri,
        parameters.position,
        parameters.context.includeDeclaration,
    );
});

connection.onRequest(
    INDEX_WORKSPACE_REQUEST,
    async (request: WorkspaceIndexRequest): Promise<WorkspaceIndexResult> => {
        try {
            return await indexWorkspace(request.uris);
        } catch (error) {
            statusStore.fail(formatError(error));
            publishServerStatus();
            throw error;
        }
    },
);

connection.onRequest(GET_SERVER_STATUS_REQUEST, (): FmlServerStatus => {
    return getServerStatus();
});

connection.onRequest(GET_INDEX_FAILURES_REQUEST, (): WorkspaceIndexFailure[] => {
    return statusStore.getFailures();
});

connection.onNotification(WORKSPACE_FILE_EVENT_NOTIFICATION, (event: WorkspaceFileEvent) => {
    void handleWorkspaceFileEvent(event).catch(error => {
        statusStore.recordFailure(event.uri, formatError(error));
        publishServerStatus();
        connection.console.error(
            `[workspace-index] Failed to process ${event.type} event for ${event.uri}: ${formatError(error)}`,
        );
    });
});

connection.onRequest(
    VALIDATE_DOCUMENT_REQUEST,
    async (request: ValidateDocumentRequest): Promise<DocumentValidationResult> => {
        const document = documents.get(request.uri);
        if (!document) {
            throw new ResponseError(
                ErrorCodes.InvalidParams,
                `Document is not synchronized with the FML language server: ${request.uri}`,
            );
        }

        cancelPendingValidation(document.uri);
        return validateLatestDocument(document.uri);
    },
);

function scheduleValidation(document: TextDocument, delay: number): void {
    cancelPendingValidation(document.uri);
    pendingValidations.set(document.uri, setTimeout(() => {
        pendingValidations.delete(document.uri);
        void validateDocument(document).catch(error => {
            connection.console.error(`FML validation failed: ${error instanceof Error ? error.message : String(error)}`);
        });
    }, delay));
}

function cancelPendingValidation(uri: string): void {
    const timeout = pendingValidations.get(uri);
    if (timeout) {
        clearTimeout(timeout);
        pendingValidations.delete(uri);
    }

}

function updateGroupSymbols(document: TextDocument): void {
    const dependentUris = workspaceIndex.getDependentDocumentUris(document.uri);
    workspaceIndex.set(document.uri, languageService.getDocumentSymbols({
        uri: document.uri,
        text: document.getText(),
    }));
    for (const uri of workspaceIndex.getDependentDocumentUris(document.uri)) {
        dependentUris.add(uri);
    }
    if (workspaceIndexReady) {
        revalidateDocuments(dependentUris, VALIDATION_DELAY_MS);
    }
}

async function validateDocument(document: TextDocument): Promise<DocumentValidationResult> {
    const version = document.version;
    const baseResult = await languageService.validateDocument({
        uri: document.uri,
        text: document.getText(),
    });
    const unresolvedGroups = workspaceIndexReady
        ? getUnresolvedGroupDiagnostics(workspaceIndex, document.uri)
        : [];
    const result: DocumentValidationResult = {
        diagnostics: [...baseResult.diagnostics, ...unresolvedGroups],
        errorCount: baseResult.errorCount,
        warningCount: baseResult.warningCount + unresolvedGroups.length,
        informationCount: baseResult.informationCount,
    };
    const currentDocument = documents.get(document.uri);

    if (currentDocument?.version === version) {
        connection.sendDiagnostics({
            uri: document.uri,
            version,
            diagnostics: result.diagnostics.map(toLspDiagnostic),
        });
    }

    return result;
}

async function indexWorkspace(uris: string[]): Promise<WorkspaceIndexResult> {
    const startedAt = Date.now();
    workspaceIndexReady = false;
    workspaceIndex.clear();
    statusStore.clearFailures();
    statusStore.startIndexing();
    publishServerStatus();
    connection.console.info(`[workspace-index] Starting scan of ${uris.length} FML file(s).`);

    let failedFileCount = 0;
    const batchSize = 25;
    for (let offset = 0; offset < uris.length; offset += batchSize) {
        const batch = uris.slice(offset, offset + batchSize);
        const results = await Promise.all(batch.map(uri => indexWorkspaceFile(uri)));
        failedFileCount += results.filter(success => !success).length;
        const processed = Math.min(offset + batch.length, uris.length);
        if (processed === uris.length || processed % 100 === 0) {
            connection.console.info(`[workspace-index] Processed ${processed}/${uris.length} FML file(s).`);
        }
    }

    for (const document of documents.all()) {
        workspaceIndex.set(document.uri, languageService.getDocumentSymbols({
            uri: document.uri,
            text: document.getText(),
        }));
    }
    workspaceIndexReady = true;
    revalidateOpenDocuments();
    const stats = workspaceIndex.getStats();
    const result: WorkspaceIndexResult = {
        ...stats,
        failedFileCount,
        durationMs: Date.now() - startedAt,
    };
    statusStore.completeIndex(result);
    publishServerStatus();
    connection.console.info(
        `[workspace-index] Completed in ${result.durationMs}ms: ${result.fileCount} file(s), `
        + `${result.canonicalUrlCount} canonical URL(s), ${result.groupCount} group(s), `
        + `${result.importCount} import(s), ${result.failedFileCount} failure(s).`,
    );
    return result;
}

async function handleWorkspaceFileEvent(event: WorkspaceFileEvent): Promise<void> {
    if (event.type === "delete") {
        workspaceIndex.delete(event.uri);
        statusStore.clearFailure(event.uri);
        connection.console.info(`[workspace-index] Removed deleted file ${event.uri}.`);
    } else {
        const success = await indexWorkspaceFile(event.uri);
        if (success) {
            const symbols = workspaceIndex.get(event.uri);
            connection.console.info(
                `[workspace-index] ${event.type === "create" ? "Added" : "Updated"} ${event.uri}: `
                + `${symbols?.canonicalUrls.length ?? 0} canonical URL(s), `
                + `${symbols?.definitions.length ?? 0} group(s), ${symbols?.imports.length ?? 0} import(s).`,
            );
        }
    }
    if (workspaceIndexReady) {
        revalidateOpenDocuments();
    }
    publishServerStatus();
}

async function indexWorkspaceFile(uri: string): Promise<boolean> {
    try {
        const openDocument = documents.get(uri);
        const text = openDocument?.getText() ?? await fs.readFile(fileURLToPath(uri), "utf8");
        workspaceIndex.set(uri, languageService.getDocumentSymbols({uri, text}));
        statusStore.clearFailure(uri);
        return true;
    } catch (error) {
        workspaceIndex.delete(uri);
        const message = formatError(error);
        statusStore.recordFailure(uri, message);
        connection.console.warn(`[workspace-index] Could not index ${uri}: ${message}`);
        return false;
    }
}

async function restoreWorkspaceFile(uri: string): Promise<void> {
    const dependentUris = workspaceIndex.getDependentDocumentUris(uri);
    if (!uri.startsWith("file:")) {
        workspaceIndex.delete(uri);
    } else {
        await indexWorkspaceFile(uri);
    }
    for (const dependentUri of workspaceIndex.getDependentDocumentUris(uri)) {
        dependentUris.add(dependentUri);
    }
    if (workspaceIndexReady) {
        revalidateDocuments(dependentUris, 0);
    }
    publishServerStatus();
}

function revalidateOpenDocuments(): void {
    for (const document of documents.all()) {
        scheduleValidation(document, 0);
    }
}

function revalidateDocuments(uris: Iterable<string>, delay: number): void {
    for (const uri of uris) {
        const document = documents.get(uri);
        if (document) {
            scheduleValidation(document, delay);
        }
    }
}

function formatError(error: unknown): string {
    return error instanceof Error ? error.message : String(error);
}

function getServerStatus(): FmlServerStatus {
    return statusStore.getStatus(workspaceIndex.getStats(), documents.all().length);
}

function publishServerStatus(): void {
    connection.sendNotification(SERVER_STATUS_CHANGED_NOTIFICATION, getServerStatus());
}

async function validateLatestDocument(uri: string): Promise<DocumentValidationResult> {
    for (let attempt = 0; attempt < 3; attempt++) {
        const document = documents.get(uri);
        if (!document) {
            throw new ResponseError(
                ErrorCodes.InvalidParams,
                `Document is no longer synchronized with the FML language server: ${uri}`,
            );
        }

        const versionBeforeValidation = document.version;
        const result = await validateDocument(document);
        if (documents.get(uri)?.version === versionBeforeValidation) {
            cancelPendingValidation(uri);
            return result;
        }
    }

    throw new ResponseError(
        LSPErrorCodes.ContentModified,
        "The FML document kept changing during validation. Run validation again.",
    );
}

documents.listen(connection);
connection.listen();
