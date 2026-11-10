import path from "node:path";
import * as vscode from "vscode";
import {toFhirVersion} from "@fhirpath-lab/validator";
import {collectFmlModelResources, resolveFmlDebugDependencies} from "./FmlDebugDependencies";
import type {SushiWorkspaceConfiguration} from "./SushiConfigWatcher";
import type {FmlTestCaseFile} from "./FmlTestSupport";
import {
    FML_TEST_CONFIG_FILE, FmlTestRunner, discoverTestSets, loadTestConfig, type CaseResult,
    type ContextProvider, type MapInfo, type ResolvedTestConfig,
} from "./FmlTestRunner";
import {buildPropertyReport} from "./FmlTestReport";

export {FML_TEST_CONFIG_FILE, parseFmlTestConfig, loadConceptMapResources} from "./FmlTestRunner";

interface ItemData {
    kind: "config" | "map" | "input";
    config?: ResolvedTestConfig;
    map?: MapInfo;
    input?: FmlTestCaseFile;
}

function toMessages(result: CaseResult, uri: vscode.Uri): vscode.TestMessage[] {
    const location = new vscode.Location(uri, new vscode.Position(0, 0));
    return result.messages.filter(message => message.kind !== "info").map(message => {
        const converted = message.expected !== undefined && message.actual !== undefined
            ? vscode.TestMessage.diff(message.text, message.expected, message.actual)
            : new vscode.TestMessage(message.text);
        converted.location = location;
        return converted;
    });
}

export class FmlTestController implements vscode.Disposable {
    private readonly controller: vscode.TestController;
    private readonly data = new WeakMap<vscode.TestItem, ItemData>();
    private readonly disposables: vscode.Disposable[] = [];
    private readonly details = new WeakMap<vscode.FileCoverage, vscode.FileCoverageDetail[]>();
    private reportDocument?: vscode.TextDocument;
    private lastReport = "";
    private refreshGeneration = 0;

    public constructor(
        private readonly modelConfigurationProvider: (program: string) => SushiWorkspaceConfiguration | undefined,
        controller = vscode.tests.createTestController("fmlTools.tests", "FML Map Tests"),
        watcher = vscode.workspace.createFileSystemWatcher("**/*"),
        registerReportCommand = true,
    ) {
        this.controller = controller;
        this.controller.refreshHandler = () => this.refresh();
        this.controller.resolveHandler = async item => {
            if (!item) {await this.refresh();}
        };
        this.controller.createRunProfile("Run", vscode.TestRunProfileKind.Run,
            (request, token) => this.run(request, token, false), true);
        const coverage = this.controller.createRunProfile("Run with Coverage", vscode.TestRunProfileKind.Coverage,
            (request, token) => this.run(request, token, true), false);
        coverage.loadDetailedCoverage = async (_run, fileCoverage) => this.details.get(fileCoverage) ?? [];
        this.controller.createRunProfile("Debug", vscode.TestRunProfileKind.Debug,
            (request, token) => this.debug(request, token), false);
        const onChange = (uri: vscode.Uri): void => {
            if (/\.(json|fml)$/i.test(uri.fsPath)) {void this.refresh();}
        };
        this.disposables.push(this.controller, watcher,
            watcher.onDidCreate(onChange), watcher.onDidDelete(onChange),
            watcher.onDidChange(onChange));
        if (registerReportCommand) {
            this.disposables.push(vscode.commands.registerCommand(
                "fmlTools.showTestReport", () => this.showReport()));
        }
    }

    public dispose(): void {
        this.disposables.forEach(item => item.dispose());
    }

    public async refresh(): Promise<void> {
        const generation = ++this.refreshGeneration;
        const files = await vscode.workspace.findFiles(`**/${FML_TEST_CONFIG_FILE}`, "**/node_modules/**");
        const roots: vscode.TestItem[] = [];
        for (const file of files) {
            const root = this.controller.createTestItem(file.toString(), path.relative(
                vscode.workspace.getWorkspaceFolder(file)?.uri.fsPath ?? path.dirname(file.fsPath), file.fsPath), file);
            try {
                const config = await loadTestConfig(file.fsPath);
                this.data.set(root, {kind: "config", config});
                for (const set of await discoverTestSets(config, [], this.contextProvider())) {
                    const mapItem = this.controller.createTestItem(`${root.id}|${set.map.filePath}`,
                        path.relative(config.maps, set.map.filePath), vscode.Uri.file(set.map.filePath));
                    this.data.set(mapItem, {kind: "map", config, map: set.map});
                    for (const input of set.inputs) {
                        const item = this.controller.createTestItem(`${mapItem.id}|${input.relativePath}`,
                            input.relativePath, vscode.Uri.file(input.filePath));
                        this.data.set(item, {kind: "input", config, map: set.map, input});
                        mapItem.children.add(item);
                    }
                    root.children.add(mapItem);
                }
            } catch (error) {
                root.error = error instanceof Error ? error.message : String(error);
            }
            roots.push(root);
        }
        if (generation === this.refreshGeneration) {
            this.controller.items.replace(roots);
        }
    }

    private collect(request: vscode.TestRunRequest): vscode.TestItem[] {
        const result: vscode.TestItem[] = [];
        const visit = (item: vscode.TestItem): void => {
            if (request.exclude?.includes(item)) {return;}
            if (this.data.get(item)?.kind === "input") {result.push(item);}
            else {item.children.forEach(visit);}
        };
        if (request.include) {request.include.forEach(visit);}
        else {this.controller.items.forEach(visit);}
        return result;
    }

    private contextProvider(): ContextProvider {
        const cache = new Map<string, ReturnType<typeof resolveFmlDebugDependencies>>();
        return async (map, folderMaps) => {
            let dependencies = cache.get(map.filePath);
            if (!dependencies) {
                const configuration = this.modelConfigurationProvider(map.filePath);
                dependencies = resolveFmlDebugDependencies(map.filePath, map.text, [], () => undefined,
                    configuration?.fhirVersion, configuration?.modelResourcePaths, undefined,
                    folderMaps.map(item => ({fileName: path.basename(item.filePath), filePath: item.filePath, text: item.text})),
                    configuration?.modelFileCache);
                cache.set(map.filePath, dependencies);
            }
            const resolved = await dependencies;
            return {
                maps: resolved.maps, modelResources: resolved.modelResources,
                defaultFhirVersion: toFhirVersion(this.modelConfigurationProvider(map.filePath)?.fhirVersion),
                profileBaseTypes: this.modelConfigurationProvider(map.filePath)?.profileBaseTypes,
            };
        };
    }

    private async run(request: vscode.TestRunRequest, token: vscode.CancellationToken, withCoverage: boolean): Promise<void> {
        const run = this.controller.createTestRun(request);
        const items = this.collect(request);
        items.forEach(item => run.enqueued(item));
        const abort = new AbortController();
        token.onCancellationRequested(() => abort.abort());
        const runners = new Map<string, FmlTestRunner>();
        for (const item of items) {
            if (token.isCancellationRequested) {break;}
            const data = this.data.get(item);
            if (!data?.map || !data.input || !data.config) {continue;}
            let runner = runners.get(data.config.file);
            if (!runner) {
                const settings = vscode.workspace.getConfiguration("fmlTools", vscode.Uri.file(data.config.file));
                runner = new FmlTestRunner(data.config, {
                    context: this.contextProvider(), coverage: withCoverage,
                    conceptMapCollector: collectFmlModelResources, signal: abort.signal,
                    defaultServerUrl: settings.get<string>("debug.serverUrl"),
                    terminology: {
                        serverUrl: settings.get<string>("terminology.serverUrl"),
                        fhirVersion: settings.get<"R4" | "R5">("terminology.fhirVersion"),
                    },
                });
                runners.set(data.config.file, runner);
            }
            run.started(item);
            const result = await runner.runCase(data.map, data.input);
            if (result.timing) {
                run.appendOutput(`${item.label}: ${result.timing.contextMs}ms resolving maps/models, ${result.timing.engineMs}ms prepare+execute\r\n`);
            }
            result.messages.filter(message => message.kind === "info").forEach(message => run.appendOutput(`${message.text}\r\n`));
            if (result.status === "errored") {
                run.errored(item, new vscode.TestMessage(result.error ?? "error"), result.durationMs);
            } else if (result.status === "failed") {
                run.failed(item, toMessages(result, item.uri!), result.durationMs);
            } else {
                run.passed(item, result.durationMs);
            }
        }
        const reports: string[] = [];
        for (const runner of runners.values()) {
            const coverage = runner.coverage.results();
            reports.push(buildPropertyReport(runner.usage.values(), coverage));
            if (withCoverage) {
                for (const file of coverage.filter(entry => entry.filePath)) {
                    const details = file.sites.map(site => new vscode.StatementCoverage(
                        file.hits.get(site.location) ?? 0,
                        new vscode.Range(site.startLine, site.startColumn, site.endLine, site.endColumn)));
                    const fileCoverage = vscode.FileCoverage.fromDetails(vscode.Uri.file(file.filePath as string), details);
                    this.details.set(fileCoverage, details);
                    run.addCoverage(fileCoverage);
                }
            }
        }
        this.lastReport = reports.join("\n");
        run.end();
    }

    private async showReport(): Promise<void> {
        if (!this.lastReport) {
            void vscode.window.showInformationMessage("Run the FML map tests first to generate a coverage report.");
            return;
        }
        this.reportDocument = await vscode.workspace.openTextDocument({content: this.lastReport, language: "markdown"});
        await vscode.window.showTextDocument(this.reportDocument, {preview: true});
    }

    private async debug(request: vscode.TestRunRequest, token: vscode.CancellationToken): Promise<void> {
        const item = this.collect(request)[0];
        const data = item && this.data.get(item);
        if (!data?.map || !data.input || token.isCancellationRequested) {return;}
        await vscode.debug.startDebugging(undefined, {
            type: "fml", request: "launch", name: `Debug ${item.label}`,
            program: data.map.filePath, input: data.input.filePath, stopOnEntry: true,
        });
    }
}
