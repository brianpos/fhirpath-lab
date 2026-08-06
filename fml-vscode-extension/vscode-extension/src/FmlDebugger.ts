import {DEFAULT_FML_DEBUG_SERVER_URL, JsonValue} from "@fhirpath-lab/debug-service";
import {existsSync} from "node:fs";
import path from "node:path";
import * as vscode from "vscode";
import {FmlDebugSession} from "./FmlDebugSession";
import type {SushiWorkspaceConfiguration} from "./SushiConfigWatcher";

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
                filters: {JSON: ["json"]},
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
        configuration.serverUrl = configuration.serverUrl
            ?? vscode.workspace.getConfiguration("fmlTools").get<string>(
                "debug.serverUrl",
                DEFAULT_FML_DEBUG_SERVER_URL,
            );
        return configuration;
    }

    private defaultInputUri(program: string): vscode.Uri | undefined {
        return program
            ? vscode.Uri.file(path.dirname(program))
            : vscode.workspace.workspaceFolders?.[0]?.uri;
    }
}

export class FmlDebugAdapterDescriptorFactory implements vscode.DebugAdapterDescriptorFactory {
    public constructor(
        private readonly modelConfigurationProvider: (
            program: string,
        ) => SushiWorkspaceConfiguration | undefined = () => undefined,
    ) {
    }

    public createDebugAdapterDescriptor(
        _session: vscode.DebugSession,
    ): vscode.ProviderResult<vscode.DebugAdapterDescriptor> {
        return new vscode.DebugAdapterInlineImplementation(
            new FmlDebugSession(
                undefined,
                this.modelConfigurationProvider,
                result => void openFinalResult(result),
            ),
        );
    }
}

async function openFinalResult(result: JsonValue): Promise<void> {
    const document = await vscode.workspace.openTextDocument({
        content: JSON.stringify(result, null, 2),
        language: "json",
    });
    await vscode.window.showTextDocument(document, {
        preview: false,
        preserveFocus: true,
        viewColumn: vscode.ViewColumn.Beside,
    });
}

export function registerFmlDebugger(
    context: vscode.ExtensionContext,
    modelConfigurationProvider?: (program: string) => SushiWorkspaceConfiguration | undefined,
): void {
    context.subscriptions.push(
        vscode.debug.registerDebugConfigurationProvider(
            "fml",
            new FmlDebugConfigurationProvider(),
        ),
        vscode.debug.registerDebugAdapterDescriptorFactory(
            "fml",
            new FmlDebugAdapterDescriptorFactory(modelConfigurationProvider),
        ),
    );
}
