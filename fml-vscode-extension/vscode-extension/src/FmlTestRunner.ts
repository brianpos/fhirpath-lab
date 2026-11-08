import {promises as fs} from "node:fs";
import path from "node:path";
import {
    FmlDebugEngineError, FmlDebugService, FmlLocalDebugService, type FmlDebugMapSource, type JsonValue,
} from "@fhirpath-lab/debug-service";
import {resolveFmlExecutionEngine, type FmlExecutionEngine} from "./FmlExecutionEngine";
import {parseFmlModel, type FhirVersion} from "@fhirpath-lab/validator";
import {analyzeInstance} from "./FmlStructureCheck";
import {RuleCoverageCollector} from "./FmlTestCoverage";
import {
    canonicalJson, compareJson, discoverTestInputs, expectedPathFor, filterNotConverted, matchesFilter, type FmlTestCaseFile,
} from "./FmlTestSupport";

export const FML_TEST_CONFIG_FILE = ".fml-tests.json";

export interface FmlTestConfig {
    /** Folder containing the (forward) maps to test. */
    maps: string;
    /** Optional folder with reverse maps, paired to forward maps by swapped source/target structure URLs. */
    reverseMaps?: string;
    /** Optional folder (recursed) of ConceptMap JSON files (or Bundles) used to resolve translate() calls. */
    conceptMaps?: string;
    /** Folder (recursed) containing JSON input files. */
    inputs: string;
    /** Optional glob filter(s) for input files; default is all .json files. */
    include?: string | string[];
    /** Optional folder with expected outputs, mirroring the inputs' relative paths. */
    expected?: string;
    /** Dotted paths (e.g. `Patient.contact.name`) that are allowed to be missing from converted output. */
    propertyNotConverted?: string[];
    /** When true, outputs with no expected file yet are written to `expected` (existing files are only compared). */
    writeOutputFiles?: boolean;
    /** Remote FML HTTP(S) endpoint, as in the debugger's `serverUrl`; empty or absent means the local engine. */
    serverUrl?: string;
    /** Use the legacy map/resource parameters for remote engines. */
    legacyPost?: boolean;
    /** "local" forces the bundled engine even when a serverUrl (or the fmlTools.debug.serverUrl setting) is set. */
    engine?: "local";
}

export interface ResolvedTestConfig {
    file: string;
    maps: string;
    reverseMaps?: string;
    conceptMaps?: string;
    inputs: string;
    include: string[];
    expected?: string;
    propertyNotConverted: string[];
    writeOutputFiles: boolean;
    serverUrl?: string;
    legacyPost: boolean;
    forceLocal: boolean;
}

export function parseFmlTestConfig(text: string): FmlTestConfig {
    const value = JSON.parse(text) as Partial<FmlTestConfig>;
    if (typeof value.maps !== "string" || typeof value.inputs !== "string") {
        throw new Error(`${FML_TEST_CONFIG_FILE} requires string 'maps' and 'inputs' properties.`);
    }
    if (value.engine !== undefined && value.engine !== "local") {
        throw new Error(`Unsupported test engine '${String(value.engine)}'; only "local" is supported.`);
    }
    if (value.serverUrl !== undefined && typeof value.serverUrl !== "string") {
        throw new Error("'serverUrl' must be a string.");
    }
    if (value.propertyNotConverted !== undefined
        && (!Array.isArray(value.propertyNotConverted) || value.propertyNotConverted.some(item => typeof item !== "string"))) {
        throw new Error("'propertyNotConverted' must be an array of dotted property paths.");
    }
    if (value.writeOutputFiles && typeof value.expected !== "string") {
        throw new Error("'writeOutputFiles' requires the 'expected' folder to be set.");
    }
    return value as FmlTestConfig;
}

export function resolveTestConfig(file: string, raw: FmlTestConfig): ResolvedTestConfig {
    const base = path.dirname(file);
    const resolve = (folder: string | undefined): string | undefined => folder ? path.resolve(base, folder) : undefined;
    return {
        file,
        maps: path.resolve(base, raw.maps),
        reverseMaps: resolve(raw.reverseMaps),
        conceptMaps: resolve(raw.conceptMaps),
        inputs: path.resolve(base, raw.inputs),
        include: raw.include === undefined ? [] : Array.isArray(raw.include) ? raw.include : [raw.include],
        expected: resolve(raw.expected),
        propertyNotConverted: raw.propertyNotConverted ?? [],
        writeOutputFiles: raw.writeOutputFiles === true,
        serverUrl: raw.serverUrl,
        legacyPost: raw.legacyPost === true,
        forceLocal: raw.engine === "local",
    };
}

export async function loadTestConfig(file: string): Promise<ResolvedTestConfig> {
    return resolveTestConfig(file, parseFmlTestConfig(await fs.readFile(file, "utf8")));
}

export interface MapInfo {
    filePath: string;
    text: string;
    sourceUrl?: string;
    targetUrl?: string;
    sourceType?: string;
    targetType?: string;
    sourceVersion?: FhirVersion;
    targetVersion?: FhirVersion;
    /** Canonical URLs this map can be imported by. */
    urls: string[];
    imports: string[];
}

function structureUrl(map: ReturnType<typeof parseFmlModel>, mode: "source" | "target"): string | undefined {
    const parameter = map?.groups[0]?.parameters.find(item => item.mode === mode);
    if (!parameter?.type) {
        return undefined;
    }
    return map?.structures.find(item => item.alias === parameter.type)?.url ?? parameter.type;
}

export function describeMap(filePath: string, text: string): MapInfo {
    const model = parseFmlModel(text);
    const sourceUrl = structureUrl(model, "source");
    const targetUrl = structureUrl(model, "target");
    const urls = [model?.mapDeclaration?.url, model?.metadata.find(item => item.path === "url")?.value]
        .filter((url): url is string => typeof url === "string");
    return {
        filePath, text, sourceUrl, targetUrl, urls,
        sourceType: sourceUrl?.split("/").pop(), targetType: targetUrl?.split("/").pop(),
        sourceVersion: model?.sourceModelVersion, targetVersion: model?.targetModelVersion,
        imports: model?.imports.map(item => item.url) ?? [],
    };
}

export async function loadMaps(folder: string): Promise<MapInfo[]> {
    let entries: string[];
    try {
        entries = (await fs.readdir(folder, {recursive: true})).map(String);
    } catch {
        return [];
    }
    const maps: MapInfo[] = [];
    for (const entry of entries.filter(name => name.toLowerCase().endsWith(".fml")).sort()) {
        const filePath = path.join(folder, entry);
        maps.push(describeMap(filePath, await fs.readFile(filePath, "utf8")));
    }
    return maps;
}

function importMatches(pattern: string, url: string): boolean {
    const regex = new RegExp(`^${pattern.split("*").map(part => part.replace(/[.+^${}()|[\]\\?]/g, "\\$&")).join(".*")}$`);
    return regex.test(url);
}

/** The map plus every map it (transitively) imports, main map first. */
export function selectImportedMaps(main: MapInfo, candidates: readonly MapInfo[]): MapInfo[] {
    const result = [main];
    const visited = new Set([main.filePath]);
    for (let index = 0; index < result.length; index++) {
        for (const pattern of result[index].imports) {
            for (const candidate of candidates) {
                if (!visited.has(candidate.filePath) && candidate.urls.some(url => importMatches(pattern, url))) {
                    visited.add(candidate.filePath);
                    result.push(candidate);
                }
            }
        }
    }
    return result;
}

export async function loadConceptMapResources(
    folder: string,
    collect: (value: unknown) => JsonValue[] = collectConceptMaps,
): Promise<JsonValue[]> {
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
        resources.push(...collect(value).filter(resource => (resource as {resourceType?: string}).resourceType === "ConceptMap"));
    }
    return resources;
}

/** Minimal ConceptMap/Bundle extraction, used when the caller does not supply the workspace-aware collector. */
export function collectConceptMaps(value: unknown): JsonValue[] {
    const resource = value as {resourceType?: string; entry?: {resource?: unknown}[]} | null;
    if (resource?.resourceType === "ConceptMap") {
        return [resource as unknown as JsonValue];
    }
    if (resource?.resourceType === "Bundle" && Array.isArray(resource.entry)) {
        return resource.entry.flatMap(entry => collectConceptMaps(entry?.resource));
    }
    return [];
}

export interface MapTestSet {
    map: MapInfo;
    inputs: FmlTestCaseFile[];
}

/** Pairs each map with the inputs whose resourceType matches the map's source type. */
export async function discoverTestSets(config: ResolvedTestConfig, filter: readonly string[] = []): Promise<MapTestSet[]> {
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
    return maps.map(map => ({
        map,
        inputs: inputs.filter(input => {
            const resourceType = resourceTypes.get(input.filePath);
            return (!map.sourceType || !resourceType || map.sourceType === resourceType)
                && matchesFilter(filter, path.relative(config.maps, map.filePath), input.relativePath);
        }),
    })).filter(set => set.inputs.length > 0);
}

export interface ExecutionContext {
    maps: FmlDebugMapSource[];
    modelResources: JsonValue[];
    defaultFhirVersion?: FhirVersion;
}

export type ContextProvider = (map: MapInfo, folderMaps: readonly MapInfo[]) => Promise<ExecutionContext>;

export const defaultContextProvider: ContextProvider = async (map, folderMaps) => ({
    maps: selectImportedMaps(map, folderMaps).map(item => ({
        fileName: path.basename(item.filePath), filePath: item.filePath, text: item.text,
    })),
    modelResources: [],
    defaultFhirVersion: map.sourceVersion,
});

export interface CaseMessage {
    kind: "forward" | "reverse" | "structure" | "info";
    text: string;
    expected?: string;
    actual?: string;
}

export interface CaseResult {
    status: "passed" | "failed" | "errored";
    durationMs: number;
    messages: CaseMessage[];
    error?: string;
    /** Time spent resolving maps/models (index, imports) vs. preparing and running the engine. */
    timing?: {contextMs: number; engineMs: number};
}

export interface PropertyUsage {
    map: MapInfo;
    caseCount: number;
    sourcePresent: Set<string>;
    targetPresent: Set<string>;
}

export interface RunnerOptions {
    context?: ContextProvider;
    /** Collects per-rule coverage by running with trace recording. */
    coverage?: boolean;
    conceptMapCollector?: (value: unknown) => JsonValue[];
    terminology?: {serverUrl?: string; fhirVersion?: "R4" | "R5"};
    /** Server URL used when the config does not set one (e.g. the fmlTools.debug.serverUrl setting). */
    defaultServerUrl?: string;
    signal?: AbortSignal;
}

function describeError(error: unknown): string {
    if (error instanceof FmlDebugEngineError) {
        const issues = (error.outcome as {issue?: {severity?: string; diagnostics?: string}[]} | undefined)?.issue
            ?.filter(issue => issue.severity === "error" || issue.severity === "fatal")
            .map(issue => issue.diagnostics).filter(Boolean).join("; ");
        return issues || error.message;
    }
    return error instanceof Error ? error.message : String(error);
}

export class FmlTestRunner {
    public readonly coverage = new RuleCoverageCollector();
    public readonly usage = new Map<string, PropertyUsage>();
    private forwardMaps?: Promise<MapInfo[]>;
    private reverseMaps?: Promise<MapInfo[]>;
    private conceptMaps?: Promise<JsonValue[]>;
    private contextMs = 0;
    private readonly localService = new FmlLocalDebugService({}, {}, {cachePrepared: true});
    private readonly remoteService = new FmlDebugService();
    public readonly engine: FmlExecutionEngine;

    public constructor(public readonly config: ResolvedTestConfig, private readonly options: RunnerOptions = {}) {
        this.engine = config.forceLocal ? {kind: "local"}
            : resolveFmlExecutionEngine({serverUrl: config.serverUrl}, options.defaultServerUrl);
    }

    private folderMaps(reverse: boolean): Promise<MapInfo[]> {
        if (reverse) {
            return this.reverseMaps ??= this.config.reverseMaps ? loadMaps(this.config.reverseMaps) : Promise.resolve([]);
        }
        return this.forwardMaps ??= loadMaps(this.config.maps);
    }

    private loadConceptMaps(): Promise<JsonValue[]> {
        return this.conceptMaps ??= this.config.conceptMaps
            ? loadConceptMapResources(this.config.conceptMaps, this.options.conceptMapCollector ?? collectConceptMaps)
            : Promise.resolve([]);
    }

    private async execute(map: MapInfo, reverse: boolean, inputText: string): Promise<unknown> {
        const folderMaps = await this.folderMaps(reverse);
        const contextStarted = Date.now();
        const context = await (this.options.context ?? defaultContextProvider)(map, folderMaps);
        this.contextMs += Date.now() - contextStarted;
        for (const source of context.maps) {
            this.coverage.registerFile(source.fileName ?? path.basename(source.filePath ?? ""), source.filePath, source.text);
        }
        const remote = this.engine.kind === "remote";
        const request = {
            mapText: map.text,
            maps: context.maps,
            inputText,
            modelResources: [...context.modelResources, ...await this.loadConceptMaps()],
            serverUrl: this.engine.serverUrl,
            legacyPost: this.config.legacyPost,
            terminologyServerUrl: this.options.terminology?.serverUrl,
            terminologyFhirVersion: this.options.terminology?.fhirVersion,
            signal: this.options.signal,
            defaultFhirVersion: context.defaultFhirVersion,
            localTrace: this.options.coverage ? {detail: "coverage" as const, maxEvents: 200_000} : false as const,
        };
        if (remote || this.options.coverage) {
            const trace = await (remote ? this.remoteService : this.localService).execute(request);
            const primary = context.maps[0]?.fileName ?? path.basename(map.filePath);
            this.coverage.record(trace.trace, primary);
            const raw = trace.rawResult ?? (trace.result ? JSON.stringify(trace.result.value) : undefined);
            if (raw === undefined) {
                const issues = (trace.outcome as {issue?: {severity?: string; diagnostics?: string}[]} | undefined)?.issue
                    ?.filter(issue => issue.severity === "error" || issue.severity === "fatal")
                    .map(issue => issue.diagnostics).filter(Boolean).join("; ");
                const exception = trace.trace.find(event => event.exception)?.exception;
                throw new Error(issues || exception || "The map produced no result.");
            }
            return JSON.parse(raw);
        }
        const parameters = await this.localService.executeParameters(request);
        const returned = parameters.parameter?.find(parameter => parameter.name === "return")?.valueString;
        if (returned === undefined) {
            const outcome = parameters.parameter?.find(parameter => parameter.name === "outcome")?.resource;
            const issues = outcome?.resourceType === "OperationOutcome"
                ? outcome.issue.filter(issue => issue.severity === "error" || issue.severity === "fatal")
                    .map(issue => issue.diagnostics).filter(Boolean).join("; ") : "";
            throw new Error(issues || "The map produced no result.");
        }
        return JSON.parse(returned);
    }

    private recordUsage(map: MapInfo, input: unknown, output: unknown): void {
        let usage = this.usage.get(map.filePath);
        if (!usage) {
            usage = {map, caseCount: 0, sourcePresent: new Set(), targetPresent: new Set()};
            this.usage.set(map.filePath, usage);
        }
        usage.caseCount++;
        analyzeInstance(input, map.sourceVersion).present.forEach(item => usage.sourcePresent.add(item));
        analyzeInstance(output, map.targetVersion).present.forEach(item => usage.targetPresent.add(item));
    }

    public async runCase(map: MapInfo, input: FmlTestCaseFile): Promise<CaseResult> {
        const started = Date.now();
        this.contextMs = 0;
        const messages: CaseMessage[] = [];
        const timing = (): CaseResult["timing"] => {
            const total = Date.now() - started;
            return {contextMs: this.contextMs, engineMs: total - this.contextMs};
        };
        try {
            const inputText = await fs.readFile(input.filePath, "utf8");
            const original = JSON.parse(inputText) as unknown;
            const actual = await this.execute(map, false, inputText);
            this.recordUsage(map, original, actual);

            for (const issue of analyzeInstance(actual, map.targetVersion).issues) {
                messages.push({kind: "structure", text: `${issue.path}: ${issue.message}`});
            }

            if (this.config.expected) {
                await this.compareExpected(input, actual, messages);
            }

            if (this.config.reverseMaps) {
                const reverse = (await this.folderMaps(true)).find(candidate =>
                    candidate.sourceUrl !== undefined && candidate.sourceUrl === map.targetUrl
                    && candidate.targetUrl === map.sourceUrl);
                if (reverse) {
                    const back = await this.execute(reverse, true, JSON.stringify(actual));
                    this.recordUsage(reverse, actual, back);
                    for (const issue of analyzeInstance(back, reverse.targetVersion).issues) {
                        messages.push({kind: "structure", text: `${path.basename(reverse.filePath)}: ${issue.path}: ${issue.message}`});
                    }
                    const differences = filterNotConverted(
                        compareJson(original, back), original, this.config.propertyNotConverted);
                    if (differences.length) {
                        messages.push({
                            kind: "reverse",
                            text: `Reverse map (${path.basename(reverse.filePath)}) did not round-trip (${differences.length} difference(s), first at ${differences[0].path})`,
                            expected: canonicalJson(original), actual: canonicalJson(back),
                        });
                    }
                }
            }
        } catch (error) {
            return {status: "errored", durationMs: Date.now() - started, messages, error: describeError(error), timing: timing()};
        }
        const failed = messages.some(message => message.kind !== "info");
        return {status: failed ? "failed" : "passed", durationMs: Date.now() - started, messages, timing: timing()};
    }

    private async compareExpected(input: FmlTestCaseFile, actual: unknown, messages: CaseMessage[]): Promise<void> {
        const expectedPath = expectedPathFor(this.config.expected as string, input.relativePath);
        let expectedText: string | undefined;
        try {
            expectedText = await fs.readFile(expectedPath, "utf8");
        } catch {
            expectedText = undefined;
        }
        if (expectedText === undefined) {
            if (this.config.writeOutputFiles) {
                await fs.mkdir(path.dirname(expectedPath), {recursive: true});
                await fs.writeFile(expectedPath, `${JSON.stringify(actual, undefined, 2)}\n`);
                messages.push({kind: "info", text: `Wrote new expected output ${expectedPath}`});
            } else {
                messages.push({kind: "forward", text: `Expected output not found: ${expectedPath}`});
            }
            return;
        }
        let expected: unknown;
        try {
            expected = JSON.parse(expectedText);
        } catch {
            messages.push({kind: "forward", text: `Expected output is not valid JSON: ${expectedPath}`});
            return;
        }
        const differences = filterNotConverted(compareJson(expected, actual), expected, this.config.propertyNotConverted);
        if (differences.length) {
            messages.push({
                kind: "forward",
                text: `Forward result differs from expected (${differences.length} difference(s), first at ${differences[0].path})`,
                expected: canonicalJson(expected), actual: canonicalJson(actual),
            });
        }
    }
}
