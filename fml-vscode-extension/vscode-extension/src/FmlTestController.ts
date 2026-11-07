import {promises as fs} from "node:fs";
import path from "node:path";
import * as vscode from "vscode";
import {FmlLocalDebugService, type JsonValue} from "@fhirpath-lab/debug-service";
import {parseFmlModel, toFhirVersion} from "@fhirpath-lab/validator";
import {collectFmlModelResources, resolveFmlDebugDependencies} from "./FmlDebugDependencies";
import type {SushiWorkspaceConfiguration} from "./SushiConfigWatcher";
import {
    canonicalJson, compareJson, discoverTestInputs, expectedPathFor, type FmlTestCaseFile,
} from "./FmlTestSupport";

export const FML_TEST_CONFIG_FILE = ".fml-tests.json";

export interface FmlTestConfig {
    /** Folder containing the (forward) maps to test. */
    maps: string;
    /** Optional folder with reverse maps, paired to forward maps by swapped source/target types. */
    reverseMaps?: string;
    /** Optional folder (recursed) of ConceptMap JSON files (or Bundles) used to resolve translate() calls. */
    conceptMaps?: string;
    /** Folder (recursed) containing JSON input files. */
    inputs: string;
    /** Optional glob filter(s) for input files; default is all .json files. */
    include?: string | string[];
    /** Optional folder with expected outputs, mirroring the inputs' relative paths. */
    expected?: string;
    /** Test engine; only "local" is currently supported. */
    engine?: "local";
}

interface MapInfo {
    filePath: string;
    text: string;
    sourceType?: string;
    targetType?: string;
    sourceUrl?: string;
    targetUrl?: string;
}

interface ItemData {
    kind: "config" | "map" | "input";
    config?: ResolvedConfig;
    map?: MapInfo;
    input?: FmlTestCaseFile;
}

interface ResolvedConfig {
    file: string;
    maps: string;
    reverseMaps?: string;
    conceptMaps?: string;
    inputs: string;
    include: string[];
    expected?: string;
}

const IGNORED_PROPERTIES: ReadonlySet<string> = new Set();

export function parseFmlTestConfig(text: string): FmlTestConfig {
    const value = JSON.parse(text) as Partial<FmlTestConfig>;
    if (typeof value.maps !== "string" || typeof value.inputs !== "string") {
        throw new Error(`${FML_TEST_CONFIG_FILE} requires string 'maps' and 'inputs' properties.`);
    }
    if (value.engine !== undefined && value.engine !== "local") {
        throw new Error(`Unsupported test engine '${String(value.engine)}'; only "local" is supported.`);
    }
    return value as FmlTestConfig;
}

function structureUrl(map: ReturnType<typeof parseFmlModel>, mode: "source" | "target"): string | undefined {
    const parameter = map?.groups[0]?.parameters.find(item => item.mode === mode);
    if (!parameter?.type) {return undefined;}
    return map?.structures.find(item => item.alias === parameter.type)?.url ?? parameter.type;
}

async function loadMaps(folder: string): Promise<MapInfo[]> {
    const maps: MapInfo[] = [];
    let entries: string[];
    try {
        entries = (await fs.readdir(folder, {recursive: true})).map(String);
    } catch {
        return maps;
    }
    for (const entry of entries.filter(name => name.toLowerCase().endsWith(".fml")).sort()) {
        const filePath = path.join(folder, entry);
        const text = await fs.readFile(filePath, "utf8");
        const model = parseFmlModel(text);
        const sourceUrl = structureUrl(model, "source");
        const targetUrl = structureUrl(model, "target");
        maps.push({
            filePath, text, sourceUrl, targetUrl,
            sourceType: sourceUrl?.split("/").pop(), targetType: targetUrl?.split("/").pop(),
        });
    }
    return maps;
}

type DependencyCache = Map<string, Promise<Awaited<ReturnType<typeof resolveFmlDebugDependencies>>>>;

/** Loads ConceptMap resources (directly or inside Bundles) from every JSON file under the folder. */
export async function loadConceptMapResources(folder: string): Promise<JsonValue[]> {
    const resources: JsonValue[] = [];
    const entries = (await fs.readdir(folder, {recursive: true})).map(String)
        .filter(name => name.toLowerCase().endsWith(".json")).sort();
    for (const entry of entries) {
        const file = path.join(folder, entry);
        let value: unknown;
        try {
            value = JSON.parse(await fs.readFile(file, "utf8"));
        } catch (error) {
            throw new Error(`Invalid ConceptMap JSON in ${file}: ${error instanceof Error ? error.message : String(error)}`);
        }
        resources.push(...collectFmlModelResources(value).filter(resource =>
            (resource as {resourceType?: string}).resourceType === "ConceptMap"));
    }
    return resources;
}

export class FmlTestController implements vscode.Disposable {
    private readonly controller: vscode.TestController;
    private readonly data = new WeakMap<vscode.TestItem, ItemData>();
    private readonly disposables: vscode.Disposable[] = [];

    public constructor(
        private readonly modelConfigurationProvider: (program: string) => SushiWorkspaceConfiguration | undefined,
    ) {
        this.controller = vscode.tests.createTestController("fmlTools.tests", "FML Map Tests");
        this.controller.refreshHandler = () => this.refresh();
        this.controller.resolveHandler = async item => {
            if (!item) {await this.refresh();}
        };
        this.controller.createRunProfile("Run", vscode.TestRunProfileKind.Run,
            (request, token) => this.run(request, token), true);
        this.controller.createRunProfile("Debug", vscode.TestRunProfileKind.Debug,
            (request, token) => this.debug(request, token), false);
        const watcher = vscode.workspace.createFileSystemWatcher("**/*");
        const onChange = (uri: vscode.Uri): void => {
            if (/\.(json|fml)$/i.test(uri.fsPath)) {void this.refresh();}
        };
        this.disposables.push(this.controller, watcher,
            watcher.onDidCreate(onChange), watcher.onDidDelete(onChange),
            watcher.onDidChange(uri => {
                if (path.basename(uri.fsPath) === FML_TEST_CONFIG_FILE) {void this.refresh();}
            }));
    }

    public dispose(): void {
        this.disposables.forEach(item => item.dispose());
    }

    public async refresh(): Promise<void> {
        const files = await vscode.workspace.findFiles(`**/${FML_TEST_CONFIG_FILE}`, "**/node_modules/**");
        const roots: vscode.TestItem[] = [];
        for (const file of files) {
            const root = this.controller.createTestItem(file.toString(), path.relative(
                vscode.workspace.getWorkspaceFolder(file)?.uri.fsPath ?? path.dirname(file.fsPath), file.fsPath), file);
            try {
                const text = new TextDecoder().decode(await vscode.workspace.fs.readFile(file));
                const raw = parseFmlTestConfig(text);
                const base = path.dirname(file.fsPath);
                const include = raw.include === undefined ? [] : Array.isArray(raw.include) ? raw.include : [raw.include];
                const config: ResolvedConfig = {
                    file: file.fsPath,
                    maps: path.resolve(base, raw.maps),
                    reverseMaps: raw.reverseMaps ? path.resolve(base, raw.reverseMaps) : undefined,
                    conceptMaps: raw.conceptMaps ? path.resolve(base, raw.conceptMaps) : undefined,
                    inputs: path.resolve(base, raw.inputs),
                    include,
                    expected: raw.expected ? path.resolve(base, raw.expected) : undefined,
                };
                this.data.set(root, {kind: "config", config});
                await this.populate(root, config);
            } catch (error) {
                root.error = error instanceof Error ? error.message : String(error);
            }
            roots.push(root);
        }
        this.controller.items.replace(roots);
    }

    private async populate(root: vscode.TestItem, config: ResolvedConfig): Promise<void> {
        const maps = await loadMaps(config.maps);
        const inputs = await discoverTestInputs(config.inputs, config.include);
        const resourceTypes = new Map<string, string | undefined>();
        for (const input of inputs) {
            try {
                const parsed = JSON.parse(await fs.readFile(input.filePath, "utf8")) as {resourceType?: string};
                resourceTypes.set(input.filePath, parsed.resourceType);
            } catch {
                resourceTypes.set(input.filePath, undefined);
            }
        }
        for (const map of maps) {
            const mapItem = this.controller.createTestItem(`${root.id}|${map.filePath}`,
                path.relative(config.maps, map.filePath), vscode.Uri.file(map.filePath));
            this.data.set(mapItem, {kind: "map", config, map});
            for (const input of inputs) {
                const resourceType = resourceTypes.get(input.filePath);
                // Cross-version layouts pair each map with the inputs of its source resource type.
                if (map.sourceType && resourceType && map.sourceType !== resourceType) {continue;}
                const item = this.controller.createTestItem(`${mapItem.id}|${input.relativePath}`,
                    input.relativePath, vscode.Uri.file(input.filePath));
                this.data.set(item, {kind: "input", config, map, input});
                mapItem.children.add(item);
            }
            if (mapItem.children.size) {root.children.add(mapItem);}
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

    private async run(request: vscode.TestRunRequest, token: vscode.CancellationToken): Promise<void> {
        const run = this.controller.createTestRun(request);
        const items = this.collect(request);
        items.forEach(item => run.enqueued(item));
        const forward: DependencyCache = new Map();
        const conceptMapCache = new Map<string, Promise<JsonValue[]>>();
        for (const item of items) {
            if (token.isCancellationRequested) {break;}
            const data = this.data.get(item);
            if (!data?.map || !data.input || !data.config) {continue;}
            run.started(item);
            const started = Date.now();
            try {
                const messages = await this.runCase(data.config, data.map, data.input, token, forward, conceptMapCache);
                if (messages.length) {
                    messages.forEach(message => {
                        message.location = new vscode.Location(item.uri!, new vscode.Position(0, 0));
                    });
                    run.failed(item, messages, Date.now() - started);
                } else {run.passed(item, Date.now() - started);}
            } catch (error) {
                run.errored(item, new vscode.TestMessage(error instanceof Error ? error.message : String(error)),
                    Date.now() - started);
            }
        }
        run.end();
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

    private async execute(
        map: MapInfo,
        inputText: string,
        token: vscode.CancellationToken,
        cache: DependencyCache,
        conceptMaps: JsonValue[],
    ): Promise<unknown> {
        const abort = new AbortController();
        token.onCancellationRequested(() => abort.abort());
        const modelConfiguration = this.modelConfigurationProvider(map.filePath);
        const fhirVersion = modelConfiguration?.fhirVersion;
        let dependencies = cache.get(map.filePath);
        if (!dependencies) {
            dependencies = resolveFmlDebugDependencies(map.filePath, map.text, [], () => undefined, fhirVersion,
                modelConfiguration?.modelResourcePaths, undefined, undefined, modelConfiguration?.modelFileCache);
            cache.set(map.filePath, dependencies);
        }
        const resolved = await dependencies;
        const settings = vscode.workspace.getConfiguration("fmlTools", vscode.Uri.file(map.filePath));
        const parameters = await new FmlLocalDebugService().executeParameters({
            mapText: map.text,
            maps: resolved.maps,
            inputText,
            modelResources: [...resolved.modelResources, ...conceptMaps],
            terminologyServerUrl: settings.get<string>("terminology.serverUrl"),
            terminologyFhirVersion: settings.get<"R4" | "R5">("terminology.fhirVersion"),
            signal: abort.signal,
            defaultFhirVersion: toFhirVersion(fhirVersion),
            localTrace: false,
        });
        const returned = parameters.parameter?.find(parameter => parameter.name === "return")?.valueString;
        if (returned === undefined) {
            const outcome = parameters.parameter?.find(parameter => parameter.name === "outcome")?.resource;
            const issues = outcome?.resourceType === "OperationOutcome"
                ? outcome.issue.map(issue => issue.diagnostics).filter(Boolean).join("; ") : "";
            throw new Error(issues || "The map produced no result.");
        }
        return JSON.parse(returned);
    }

    private async runCase(
        config: ResolvedConfig,
        map: MapInfo,
        input: FmlTestCaseFile,
        token: vscode.CancellationToken,
        cache: DependencyCache,
        conceptMapCache: Map<string, Promise<JsonValue[]>>,
    ): Promise<vscode.TestMessage[]> {
        const messages: vscode.TestMessage[] = [];
        let conceptMaps: JsonValue[] = [];
        if (config.conceptMaps) {
            let loading = conceptMapCache.get(config.conceptMaps);
            if (!loading) {
                loading = loadConceptMapResources(config.conceptMaps);
                conceptMapCache.set(config.conceptMaps, loading);
            }
            conceptMaps = await loading;
        }
        const inputText = await fs.readFile(input.filePath, "utf8");
        const actual = await this.execute(map, inputText, token, cache, conceptMaps);

        if (config.expected) {
            const expectedPath = expectedPathFor(config.expected, input.relativePath);
            let expected: unknown;
            try {
                expected = JSON.parse(await fs.readFile(expectedPath, "utf8"));
            } catch {
                messages.push(new vscode.TestMessage(`Expected output not found or invalid: ${expectedPath}`));
            }
            if (expected !== undefined) {
                const differences = compareJson(expected, actual, IGNORED_PROPERTIES);
                if (differences.length) {
                    const message = vscode.TestMessage.diff(
                        `Forward result differs from expected (${differences.length} difference(s), first at ${differences[0].path})`,
                        canonicalJson(expected, IGNORED_PROPERTIES), canonicalJson(actual, IGNORED_PROPERTIES));
                    messages.push(message);
                }
            }
        }

        if (config.reverseMaps) {
            const reverse = (await loadMaps(config.reverseMaps)).find(candidate =>
                candidate.sourceUrl !== undefined && candidate.sourceUrl === map.targetUrl
                && candidate.targetUrl === map.sourceUrl);
            if (reverse) {
                const back = await this.execute(reverse, JSON.stringify(actual), token, cache, conceptMaps);
                const original = JSON.parse(inputText) as unknown;
                const differences = compareJson(original, back, IGNORED_PROPERTIES);
                if (differences.length) {
                    messages.push(vscode.TestMessage.diff(
                        `Reverse map (${path.basename(reverse.filePath)}) did not round-trip (${differences.length} difference(s), first at ${differences[0].path})`,
                        canonicalJson(original, IGNORED_PROPERTIES), canonicalJson(back, IGNORED_PROPERTIES)));
                }
            }
        }
        return messages;
    }
}
