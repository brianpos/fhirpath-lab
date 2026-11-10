import {
    EVALUATE_DOCUMENT_REQUEST, DocumentEvaluationResult, EvaluateDocumentRequest,
} from "@fhirpath-lab/language-service";
import path from "node:path";
import * as vscode from "vscode";
import type {LanguageClient} from "vscode-languageclient/node";
import {filePathIdentity} from "./FmlDebugDependencies";
import {awaitFmlOperation, checkFmlCancellation, validateFmlDocument} from "./FmlValidation";
import type {SushiWorkspaceConfiguration} from "./SushiConfigWatcher";

export const VALIDATE_FML_TOOL = "fml-tools_validate";
export const EVALUATE_FML_TOOL = "fml-tools_evaluate";

export interface ValidateFmlInput {
    filePaths?: string[];
}

export interface EvaluateFmlInput {
    mapFilePath?: string;
    inputFilePath: string;
    modelFilePath?: string;
    entryGroup?: string;
}

function requireTrustedWorkspace(token: vscode.CancellationToken): void {
    checkFmlCancellation(token);
    if (!vscode.workspace.isTrusted) {
        throw new Error("Trust this workspace before using FML chat tools.");
    }
}

function toolFileUri(filePath: string, fml: boolean): vscode.Uri {
    if (!path.isAbsolute(filePath)) {
        throw new Error(`Provide an absolute file path: ${filePath}`);
    }
    const uri = vscode.Uri.file(filePath);
    if (!vscode.workspace.getWorkspaceFolder(uri)
        && !vscode.workspace.textDocuments.some(document => !document.isClosed && document.uri.scheme === "file"
            && filePathIdentity(document.uri.fsPath) === filePathIdentity(filePath))) {
        throw new Error(`The file must be in the workspace or already open in the editor: ${filePath}`);
    }
    if (fml && path.extname(filePath).toLowerCase() !== ".fml") {
        throw new Error(`Expected an FML file: ${filePath}`);
    }
    return uri;
}

async function openToolDocument(filePath: string, fml: boolean): Promise<vscode.TextDocument> {
    const uri = toolFileUri(filePath, fml);
    let document = vscode.workspace.textDocuments.find(candidate => !candidate.isClosed && candidate.uri.scheme === "file"
        && filePathIdentity(candidate.uri.fsPath) === filePathIdentity(uri.fsPath))
        ?? await vscode.workspace.openTextDocument(uri);
    if (fml && document.languageId !== "fml") {
        document = await vscode.languages.setTextDocumentLanguage(document, "fml");
    }
    return document;
}

function activeFmlDocument(): vscode.TextDocument {
    const document = vscode.window.activeTextEditor?.document;
    if (!document || document.languageId !== "fml") {
        throw new Error("Open an FML document or provide an absolute FML file path.");
    }
    return document;
}

function textResult(value: object): vscode.LanguageModelToolResult {
    return new vscode.LanguageModelToolResult([new vscode.LanguageModelTextPart(JSON.stringify(value, null, 2))]);
}

export class FmlValidationTool implements vscode.LanguageModelTool<ValidateFmlInput> {
    public constructor(
        private readonly client: Pick<LanguageClient, "sendRequest">,
        private readonly waitForWorkspaceIndex: () => Promise<void>,
    ) {}

    public prepareInvocation(options: vscode.LanguageModelToolInvocationPrepareOptions<ValidateFmlInput>): vscode.PreparedToolInvocation {
        return {
            invocationMessage: "Validating FML",
            confirmationMessages: {
                title: "Validate FML",
                message: new vscode.MarkdownString().appendText(
                    `Validate ${options.input.filePaths?.join(", ") ?? "the active FML document"} locally? `
                    + "Diagnostics and file locations will be returned to chat. No files are edited.",
                ),
            },
        };
    }

    public async invoke(
        options: vscode.LanguageModelToolInvocationOptions<ValidateFmlInput>,
        token: vscode.CancellationToken,
    ): Promise<vscode.LanguageModelToolResult> {
        requireTrustedWorkspace(token);
        const paths = options.input.filePaths;
        if (paths && paths.length === 0) {
            throw new Error("Provide at least one FML file path, or omit filePaths to use the active document.");
        }
        const documents = paths
            ? await Promise.all(paths.map(filePath => openToolDocument(filePath, true)))
            : [activeFmlDocument()];
        await awaitFmlOperation(this.waitForWorkspaceIndex(), token);
        const files = [];
        for (const document of new Set(documents)) {
            const result = await validateFmlDocument(this.client, document, true, token);
            files.push({
                ...result,
                diagnostics: result.diagnostics.map(({range, severity, message}) => ({range, severity, message})),
            });
        }
        const totals = files.reduce((total, file) => ({
            errorCount: total.errorCount + file.errorCount,
            warningCount: total.warningCount + file.warningCount,
            informationCount: total.informationCount + file.informationCount,
        }), {errorCount: 0, warningCount: 0, informationCount: 0});
        return textResult({status: totals.errorCount ? "invalid" : "valid", fileCount: files.length, ...totals, files});
    }
}

export class FmlEvaluationTool implements vscode.LanguageModelTool<EvaluateFmlInput> {
    public constructor(
        private readonly client: Pick<LanguageClient, "sendRequest">,
        private readonly waitForWorkspaceIndex: () => Promise<void>,
        private readonly modelConfigurationProvider: (program: string) => SushiWorkspaceConfiguration | undefined,
    ) {}

    public prepareInvocation(options: vscode.LanguageModelToolInvocationPrepareOptions<EvaluateFmlInput>): vscode.PreparedToolInvocation {
        return {
            invocationMessage: "Testing FML with the local TypeScript engine",
            confirmationMessages: {
                title: "Test FML locally",
                message: new vscode.MarkdownString().appendText(
                    `Evaluate ${options.input.mapFilePath ?? "the active FML file"} against ${options.input.inputFilePath}? `
                    + "Execution uses the local engine and does not edit files or contact a mapping server. "
                    + "A configured terminology service may receive codes/codings and ConceptMap canonicals when no local map is available. "
                    + "The transformed result and diagnostics will be returned to chat and may contain sensitive clinical data.",
                ),
            },
        };
    }

    public async invoke(
        options: vscode.LanguageModelToolInvocationOptions<EvaluateFmlInput>,
        token: vscode.CancellationToken,
    ): Promise<vscode.LanguageModelToolResult> {
        requireTrustedWorkspace(token);
        const map = options.input.mapFilePath
            ? await openToolDocument(options.input.mapFilePath, true) : activeFmlDocument();
        if (map.uri.scheme !== "file") {
            throw new Error("Save the FML map to a file before evaluating it. Unsaved edits to that file are supported.");
        }
        const input = await openToolDocument(options.input.inputFilePath, false);
        const model = options.input.modelFilePath ? await openToolDocument(options.input.modelFilePath, false) : undefined;
        return vscode.window.withProgress({
            location: vscode.ProgressLocation.Window,
            title: "Testing FML",
        }, async progress => {
            progress.report({message: "Waiting for workspace indexing"});
            await awaitFmlOperation(this.waitForWorkspaceIndex(), token);
            try {
                checkFmlCancellation(token);
                const configuration = this.modelConfigurationProvider(map.uri.fsPath);
                const modelPaths = new Set(configuration?.modelResourcePaths.map(filePathIdentity));
                const modelOverrides = vscode.workspace.textDocuments.filter(document =>
                    !document.isClosed && document.isDirty && document.uri.scheme === "file"
                    && modelPaths.has(filePathIdentity(document.uri.fsPath)))
                    .map(document => ({filePath: document.uri.fsPath, text: document.getText()}));
                const settings = vscode.workspace.getConfiguration("fmlTools", map.uri);
                const request: EvaluateDocumentRequest = {
                    uri: map.uri.toString(),
                    inputText: input.getText(),
                    input: {uri: input.uri.toString(), version: input.version},
                    modelText: model?.getText(),
                    model: model ? {uri: model.uri.toString(), version: model.version} : undefined,
                    modelOverrides,
                    entryGroup: options.input.entryGroup,
                    terminologyServerUrl: settings.get<string>("terminology.serverUrl", ""),
                    terminologyFhirVersion: settings.get<"R4" | "R5">("terminology.fhirVersion", "R4"),
                };
                progress.report({message: "Evaluating with cached maps and models in the language server"});
                const result = await awaitFmlOperation(this.client.sendRequest<DocumentEvaluationResult>(
                    EVALUATE_DOCUMENT_REQUEST, request, token,
                ), token);
                checkFmlCancellation(token);
                return textResult(result);
            } catch (error) {
                checkFmlCancellation(token);
                throw error;
            }
        });
    }
}
