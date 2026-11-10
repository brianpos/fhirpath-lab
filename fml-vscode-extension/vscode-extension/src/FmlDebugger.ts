import {FmlDebugService, JsonValue} from "@fhirpath-lab/debug-service";
import {existsSync} from "node:fs";
import path from "node:path";
import * as vscode from "vscode";
import {FmlDebugSession} from "./FmlDebugSession";
import type {SushiWorkspaceConfiguration} from "./SushiConfigWatcher";
import {UiConstants} from "./constants/UiConstants";
import {logData} from "./utils";
import {resolveFmlExecutionEngine} from "./FmlExecutionEngine";

export class FmlDebugConfigurationProvider implements vscode.DebugConfigurationProvider {
    public resolveDebugConfiguration(
        _folder: vscode.WorkspaceFolder | undefined,
        configuration: vscode.DebugConfiguration,
    ): vscode.ProviderResult<vscode.DebugConfiguration> {
        const editor = vscode.window.activeTextEditor;
        if (!configuration.type && !configuration.request && !configuration.name) {
            if (editor?.document.languageId !== "fml") {
                void vscode.window.showInformationMessage("Open an FML document before starting the debugger.");
                return undefined;
            }
            configuration.type = "fml";
            configuration.request = "launch";
            configuration.name = "Debug FML Map";
            configuration.stopOnEntry = true;
        }
        if (!configuration.program && editor?.document.languageId === "fml") {
            configuration.program = editor.document.uri.fsPath;
        }
        if (editor?.document.languageId === "fml" && editor.document.uri.fsPath === configuration.program) {
            configuration.mapText = editor.document.getText();
        }
        return configuration;
    }

    public async resolveDebugConfigurationWithSubstitutedVariables(
        _folder: vscode.WorkspaceFolder | undefined,
        configuration: vscode.DebugConfiguration,
    ): Promise<vscode.DebugConfiguration | undefined> {
        if (!configuration.program) {
            void vscode.window.showErrorMessage("The FML debug configuration requires a program.");
            return undefined;
        }
        if (!configuration.mapText && !existsSync(configuration.program)) {
            void vscode.window.showErrorMessage(`FML source file not found: ${configuration.program}`);
            return undefined;
        }
        if (!configuration.input || !existsSync(configuration.input)) {
            const selected = await vscode.window.showOpenDialog({
                canSelectMany: false,
                openLabel: "Use as FML debug input",
                filters: {"FML input (JSON, XML, HL7 v2)": ["json", "xml", "hl7", "v2", "er7", "txt"]},
                defaultUri: this.defaultInputUri(configuration.program),
            });
            if (!selected?.[0]) {
                return undefined;
            }
            configuration.input = selected[0].fsPath;
        }
        if (configuration.model && !existsSync(configuration.model)) {
            void vscode.window.showErrorMessage(`FML model file not found: ${configuration.model}`);
            return undefined;
        }
        const settings = vscode.workspace.getConfiguration("fmlTools", vscode.Uri.file(configuration.program));
        try {
            const engine = resolveFmlExecutionEngine(
                {serverUrl: configuration.serverUrl},
                settings.get<string>("debug.serverUrl", ""),
            );
            configuration.serverUrl = engine.serverUrl;
            configuration.terminologyServerUrl = configuration.terminologyServerUrl
                ?? settings.get<string>("terminology.serverUrl", "");
            configuration.terminologyFhirVersion = configuration.terminologyFhirVersion
                ?? settings.get<"R4" | "R5">("terminology.fhirVersion", "R4");
        } catch (error) {
            void vscode.window.showErrorMessage(error instanceof Error ? error.message : String(error));
            return undefined;
        }
        return configuration;
    }

    private defaultInputUri(program: string): vscode.Uri | undefined {
        return program
            ? vscode.Uri.file(path.dirname(program))
            : vscode.workspace.workspaceFolders?.[0]?.uri;
    }
}

export class FmlDebugAdapterDescriptorFactory implements vscode.DebugAdapterDescriptorFactory {
    private readonly outputDocuments = new FmlDebugOutputDocuments();

    public constructor(
        private readonly modelConfigurationProvider: (
            program: string,
        ) => SushiWorkspaceConfiguration | undefined = () => undefined,
        private readonly outputChannel: vscode.OutputChannel = UiConstants.principalChannel,
    ) {
    }

    public createDebugAdapterDescriptor(
        session: vscode.DebugSession,
    ): vscode.ProviderResult<vscode.DebugAdapterDescriptor> {
        const selection = resolveFmlExecutionEngine({serverUrl: session.configuration.serverUrl});
        const engine = selection.kind === "local"
            ? "local"
            : `remote:${selection.serverUrl}`;
        return new vscode.DebugAdapterInlineImplementation(
            new FmlDebugSession(
                new FmlDebugService(undefined, undefined, message => {
                    if (vscode.workspace.getConfiguration("fmlTools").get<boolean>("debug.logServerTraffic", false) === true) {
                        logData(
                            `[FML debug ${path.basename(session.configuration.program)}; session ${session.id}]\n${message}`,
                            this.outputChannel,
                        );
                    }
                }),
                this.modelConfigurationProvider,
                (result, rawJson) => this.outputDocuments.show(
                    session.configuration.program,
                    engine,
                    result,
                    rawJson,
                ),
            ),
        );
    }

    public dispose(): void {
        this.outputDocuments.dispose();
    }
}

interface ResultDocument {
    document?: vscode.TextDocument;
    pending: Promise<void>;
}

export class FmlDebugOutputDocuments implements vscode.Disposable {
    private readonly results = new Map<string, ResultDocument>();
    private readonly closeListener = vscode.workspace.onDidCloseTextDocument(document => {
        for (const [key, result] of this.results) {
            if (result.document === document) {
                this.results.delete(key);
            }
        }
    });

    public async show(program: string, engine: string, result: JsonValue, rawJson?: string): Promise<void> {
        const source = vscode.Uri.file(path.resolve(program)).toString();
        const key = JSON.stringify([process.platform === "win32" ? source.toLowerCase() : source, engine]);
        let output = this.results.get(key);
        if (!output) {
            output = {pending: Promise.resolve()};
            this.results.set(key, output);
        }
        const entry = output;
        const update = async (): Promise<void> => {
            const content = rawJson ?? (engine === "local" ? JSON.stringify(result) : JSON.stringify(result, null, 2));
            let document = entry.document;
            if (!document || document.isClosed || !document.isUntitled) {
                document = await vscode.workspace.openTextDocument({content, language: "json"});
                entry.document = document;
            } else if (document.getText() !== content) {
                const edit = new vscode.WorkspaceEdit();
                edit.replace(document.uri, new vscode.Range(
                    document.positionAt(0),
                    document.positionAt(document.getText().length),
                ), content);
                if (!await vscode.workspace.applyEdit(edit)) {
                    throw new Error(`Unable to update the FML result document for ${program}.`);
                }
            }
            const uri = document.uri.toString();
            const group = vscode.window.tabGroups.all.find(group => group.tabs.some(tab =>
                tab.input instanceof vscode.TabInputText && tab.input.uri.toString() === uri));
            const editor = await vscode.window.showTextDocument(document, {
                preview: false,
                preserveFocus: true,
                viewColumn: group?.viewColumn ?? vscode.ViewColumn.Beside,
            });
            if (engine === "local") {
                const {tabSize, insertSpaces} = editor.options;
                if (typeof tabSize !== "number" || typeof insertSpaces !== "boolean") {
                    throw new Error("Unable to determine the FML result editor's JSON indentation settings.");
                }
                await vscode.extensions.getExtension("vscode.json-language-features")?.activate();
                const edits = await vscode.commands.executeCommand<vscode.TextEdit[] | undefined>(
                    "vscode.executeFormatDocumentProvider",
                    document.uri,
                    {tabSize, insertSpaces} satisfies vscode.FormattingOptions,
                );
                if (!edits) {
                    throw new Error("No JSON formatter is available to format the local FML result.");
                }
                if (edits.length > 0) {
                    const edit = new vscode.WorkspaceEdit();
                    edit.set(document.uri, edits);
                    if (!await vscode.workspace.applyEdit(edit)) {
                        throw new Error(`Unable to format the local FML result document for ${program}.`);
                    }
                }
            }
        };
        // A failed update is reported to its caller; a later evaluation may retry the same tab.
        entry.pending = entry.pending.then(update, update);
        await entry.pending;
    }

    public dispose(): void {
        this.closeListener.dispose();
        this.results.clear();
    }
}

export function registerFmlDebugger(
    context: vscode.ExtensionContext,
    modelConfigurationProvider?: (program: string) => SushiWorkspaceConfiguration | undefined,
): void {
    const adapterFactory = new FmlDebugAdapterDescriptorFactory(modelConfigurationProvider);
    context.subscriptions.push(
        adapterFactory,
        vscode.debug.registerDebugConfigurationProvider(
            "fml",
            new FmlDebugConfigurationProvider(),
        ),
        vscode.debug.registerDebugAdapterDescriptorFactory(
            "fml",
            adapterFactory,
        ),
    );
}
