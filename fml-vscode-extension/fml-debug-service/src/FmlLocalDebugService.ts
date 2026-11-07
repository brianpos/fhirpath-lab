import type {Parameters, ParametersParameter} from "fhir/r4b";
import {buildLogicalTypeModels, isHl7v2Content, prepareHl7v2FmlInput} from "@fhirpath-lab/validator";
import {
    createSingleInputRequest, FmlExecutor, FmlTraceRecorder, parseFmlJson, stringifyFmlJson,
    type FmlExecutorConfiguration, type FmlDiagnostic,
    compileConceptMap, translateConceptMap, type FmlExecutionOptions,
    FhirTerminologyService,
} from "@fhirpath-lab/fml-executor";
import {FmlDebugEngineError, parseDebugTrace} from "./FmlDebugService";
import type {FmlDebugLaunchRequest, FmlDebugTrace, JsonValue} from "./contracts";

export interface FmlLocalExecutionServices extends Pick<FmlExecutionOptions,
    "translate" | "resolve" | "reference" | "log" | "uuid" | "fhirPath"> {
    loadConceptMap?: (canonical: string, signal?: AbortSignal) => Promise<unknown | undefined>;
}

export class FmlLocalDebugService {
    private readonly preparedCache?: Map<string, Promise<{executor: FmlExecutor; prepared: Awaited<ReturnType<FmlExecutor["prepare"]>>}>>;

    /** With `cachePrepared`, identical map/model inputs are prepared once per service instance (bulk runs). */
    public constructor(private readonly configuration: FmlExecutorConfiguration = {},
        private readonly services: FmlLocalExecutionServices = {}, options: {cachePrepared?: boolean} = {}) {
        if (options.cachePrepared) this.preparedCache = new Map();
    }

    public async execute(request: FmlDebugLaunchRequest): Promise<FmlDebugTrace> {
        const invocation = {...request, maps: request.maps?.map(source => Object.freeze({...source}))};
        const {parameters, inputText} = await this.executeInvocation(invocation);
        return parseDebugTrace(parameters, JSON.parse(inputText) as JsonValue, undefined,
            invocation.maps ?? [Object.freeze({text: invocation.mapText, fileName: "local.fml"})]);
    }

    public async executeParameters(request: FmlDebugLaunchRequest): Promise<Parameters> {
        return (await this.executeInvocation(request)).parameters;
    }

    private async executeInvocation(request: FmlDebugLaunchRequest): Promise<{parameters: Parameters; inputText: string}> {
        try {
            request.signal?.throwIfAborted();
            const prepared = this.prepareInput(request);
            const parameters = await this.runParameters(prepared.request);
            if (prepared.warnings.length) {
                const warnings = prepared.warnings.map(diagnostics =>
                    ({severity: "warning" as const, code: "informational" as const, diagnostics}));
                const outcome = parameters.parameter?.find(parameter => parameter.name === "outcome")?.resource;
                if (outcome?.resourceType === "OperationOutcome") outcome.issue.push(...warnings);
                else parameters.parameter?.push({name: "outcome", resource: {resourceType: "OperationOutcome", issue: warnings}});
            }
            return {parameters, inputText: prepared.request.inputText};
        } catch (error) {
            if (error instanceof FmlDebugEngineError) throw error;
            if (request.signal?.aborted) throw request.signal.reason;
            const message = error instanceof Error ? error.message : String(error);
            throw new FmlDebugEngineError(message, {
                resourceType: "OperationOutcome",
                issue: [{severity: "error", code: "processing", diagnostics: message}],
            });
        }
    }

    private prepareInput(request: FmlDebugLaunchRequest): {request: FmlDebugLaunchRequest; warnings: string[]} {
        if (!isHl7v2Content(request.inputText)) return {request, warnings: []};
        const resources: unknown[] = [...request.modelResources ?? []];
        if (request.modelText?.trim()) resources.push(JSON.parse(request.modelText));
        const entries: unknown[] = [];
        const collect = (resource: unknown): void => {
            if (resource && typeof resource === "object" && "resourceType" in resource
                && resource.resourceType === "Bundle" && "entry" in resource && Array.isArray(resource.entry)) {
                for (const entry of resource.entry) collect(entry?.resource);
            } else {
                entries.push({resource});
            }
        };
        resources.forEach(collect);
        const prepared = prepareHl7v2FmlInput(request.inputText, request.mapText,
            JSON.stringify({resourceType: "Bundle", type: "collection", entry: entries}));
        return {
            request: {...request, inputText: prepared.inputText, modelText: prepared.modelText, modelResources: []},
            warnings: prepared.warnings,
        };
    }

    private async runParameters(request: FmlDebugLaunchRequest): Promise<Parameters> {
        if (request.inputText.trimStart().startsWith("<")) {
            throw new Error("The local FML backend currently requires JSON or HL7 v2 input; select a remote backend for XML.");
        }
        let input: unknown;
        try {
            input = parseFmlJson(request.inputText);
        } catch (error) {
            throw new Error(`Invalid local FML input JSON: ${error instanceof Error ? error.message : String(error)}`, {cause: error});
        }
        const resources: unknown[] = [...request.modelResources ?? []];
        let explicitModelDefinitions = false;
        if (request.modelText?.trim()) {
            try {
                const model: unknown = JSON.parse(request.modelText);
                resources.push(model);
                explicitModelDefinitions = containsStructureDefinition(model);
            } catch (error) {
                throw new Error(`Invalid local FML model JSON: ${error instanceof Error ? error.message : String(error)}`, {cause: error});
            }
        }
        const profileBaseTypes: Record<string, string> = {...request.profileBaseTypes};
        const conceptMaps: {url: string; version?: string; resource: unknown}[] = [];
        const collect = (resource: unknown): void => {
            if (!resource || typeof resource !== "object" || Array.isArray(resource)) {
                throw new Error("Local FML model content must contain FHIR resource objects.");
            }
            const definition = resource as {resourceType?: string; url?: string; type?: string; kind?: string; entry?: {resource?: unknown}[]};
            if (definition.resourceType === "Bundle") {
                if (definition.entry !== undefined && !Array.isArray(definition.entry)) throw new Error("Local FML model Bundle.entry must be an array.");
                definition.entry?.forEach(entry => collect(entry?.resource));
            } else if (definition.resourceType === "StructureDefinition") {
                if (typeof definition.url !== "string" || typeof definition.type !== "string") {
                    throw new Error("Local FML model StructureDefinitions require url and type.");
                }
                profileBaseTypes[definition.url] = definition.kind === "logical" ? definition.url : definition.type;
            } else if (definition.resourceType === "ConceptMap") {
                const map = resource as {url?: unknown; version?: unknown};
                if (typeof map.url !== "string") throw new Error("Local ConceptMap resources require a canonical URL.");
                const version = typeof map.version === "string" ? map.version : undefined;
                // The existing catalog and an explicit model file can supply the same resource.
                if (!conceptMaps.some(existing => existing.url === map.url && existing.version === version
                    && JSON.stringify(existing.resource) === JSON.stringify(resource))) {
                    conceptMaps.push({url: map.url, version, resource});
                }
            } else {
                throw new Error("Local FML models must be StructureDefinition, ConceptMap or Bundle resources.");
            }
        };
        resources.forEach(collect);
        const sourceName = request.maps?.[0]?.fileName ?? request.maps?.[0]?.filePath ?? "local.fml";
        const prepare = async (): Promise<{executor: FmlExecutor; prepared: Awaited<ReturnType<FmlExecutor["prepare"]>>}> => {
            const models = request.customTypeModels && !explicitModelDefinitions
                ? request.customTypeModels : buildLogicalTypeModels(resources, request.defaultFhirVersion ?? "R4");
            const executor = new FmlExecutor({...this.configuration, maps: [
                ...this.configuration.maps ?? [],
                ...(request.maps ?? []).map(map => ({
                    sourceText: map.text, sourceName: map.fileName ?? map.filePath,
                    defaultFhirVersion: request.defaultFhirVersion, profileBaseTypes, customTypeModels: models,
                })),
            ]});
            const prepared = await executor.prepare({
                sourceText: request.mapText, sourceName, defaultFhirVersion: request.defaultFhirVersion,
                profileBaseTypes,
                customTypeModels: models,
            }, {signal: request.signal});
            return {executor, prepared};
        };
        let entry: {executor: FmlExecutor; prepared: Awaited<ReturnType<FmlExecutor["prepare"]>>};
        if (this.preparedCache) {
            const key = JSON.stringify([request.mapText, request.maps, request.defaultFhirVersion, profileBaseTypes,
                request.customTypeModels && !explicitModelDefinitions ? request.customTypeModels : undefined,
                resources.filter(resource => (resource as {resourceType?: string}).resourceType !== "ConceptMap")]);
            let cached = this.preparedCache.get(key);
            if (!cached) {
                cached = prepare();
                this.preparedCache.set(key, cached);
                cached.catch(() => this.preparedCache?.delete(key));
            }
            entry = await cached;
        } else {
            entry = await prepare();
        }
        const {executor, prepared} = entry;
        request.signal?.throwIfAborted();
        const recorder = request.localTrace === false ? undefined
            : new FmlTraceRecorder(request.localTrace?.maxEvents, request.localTrace?.maxBytes);
        const parameters: Parameters = {resourceType: "Parameters", parameter: [{
            name: "parameters", part: [{name: "evaluator", valueString: "FHIRPath Lab JavaScript (local)"}],
        }]};
        let diagnostics: FmlDiagnostic[] = prepared.diagnostics;
        if (prepared.status === "success") {
            const invocation = createSingleInputRequest(prepared.value, input, request.entryGroup);
            const compiled = new Map<unknown, ReturnType<typeof compileConceptMap>>();
            let terminology: FhirTerminologyService | undefined;
            const translate: NonNullable<FmlExecutionOptions["translate"]> = async (source, canonical, output, signal) => {
                const [url, version] = canonical.split("|");
                const matches = conceptMaps.filter(map => map.url === url && (!version || map.version === version));
                if (matches.length > 1) throw new Error(`Ambiguous ConceptMap '${canonical}'.`);
                if (!matches.length) {
                    const resource = await this.services.loadConceptMap?.(canonical, signal);
                    if (resource !== undefined) {
                        let map = compiled.get(resource);
                        if (!map) { map = compileConceptMap(resource); compiled.set(resource, map); }
                        return translateConceptMap(map, source, output);
                    }
                    if (this.services.translate) return this.services.translate(source, canonical, output, signal);
                    if (request.terminologyServerUrl?.trim()) {
                        terminology ??= new FhirTerminologyService(request.terminologyServerUrl, request.terminologyFhirVersion);
                        return terminology.translate(source, canonical, output, signal);
                    }

                    throw new Error(`The translate host service or ConceptMap '${canonical}' is required.`);
                }
                const resource = matches[0].resource;
                let map = compiled.get(resource);
                if (!map) { map = compileConceptMap(resource); compiled.set(resource, map); }
                return translateConceptMap(map, source, output);
            };
            const result = await executor.execute(invocation, {...this.services, translate, signal: request.signal, trace: recorder,
                traceDetail: request.localTrace === false ? undefined : request.localTrace?.detail});
            diagnostics = [...diagnostics, ...result.diagnostics];
            if (result.status === "success") {
                parameters.parameter?.push({name: "return", valueString: stringifyFmlJson(result.value.targets[0].value)});
            }
        } else {
            recorder?.onEnd(prepared.status === "not-implemented" ? prepared.message : "FML preparation failed.");
        }
        for (const event of recorder?.events ?? []) {
            const part: ParametersParameter[] = [
                {name: "phase", valueCode: event.phase},
                {name: "depth", valueInteger: event.depth},
                {name: "source", valueString: event.site.sourceName},
            ];
            if (event.site.expressionPosition) part.push({name: "expressionPosition", valueString: event.site.expressionPosition});
            const span = event.site.span;
            if (span) part.push(
                {name: "startRow", valueInteger: span.start.line - 1},
                {name: "startColumn", valueInteger: span.start.column},
                {name: "endRow", valueInteger: span.end.line - 1},
                {name: "endColumn", valueInteger: span.end.column},
            );
            for (const message of event.messages ?? []) part.push({name: "message", part: [
                ...(message.name ? [{name: "name", valueString: message.name}] : []),
                ...message.text.map(text => ({name: "text", valueString: text})),
            ]});
            for (const variable of event.variables) {
                const binding: ParametersParameter[] = [
                    {name: "name", valueString: variable.name},
                    {name: "contextType", valueString: variable.mode === "target" ? "OUTPUT" : "INPUT"},
                ];
                if (variable.typeName) binding.push({name: "dataType", valueString: variable.typeName});
                if (variable.value !== undefined || variable.primitiveMetadata !== undefined) {
                    const value = variable.primitiveMetadata === undefined ? variable.value
                        : {value: variable.value, _value: variable.primitiveMetadata};
                    binding.push({name: "jsonValue", valueString: stringifyFmlJson(value)});
                }
                if (recorder?.truncationReason) diagnostics = [...diagnostics, {
                    severity: "warning", message: recorder.truncationReason, line: 1, column: 0, sourceName,
                }];
                part.push({name: "variable", part: binding});
            }
            parameters.parameter?.push({name: "trace", part});
        }
        parameters.parameter?.push({name: "traceStatus", valueCode: recorder?.status
            ?? (diagnostics.some(diagnostic => diagnostic.severity === "error") ? "stopped" : "complete")});
        if (diagnostics.length) parameters.parameter?.push({
            name: "outcome", resource: {
                resourceType: "OperationOutcome",
                issue: diagnostics.map(diagnostic => ({
                    severity: diagnostic.severity, code: "processing", diagnostics: diagnostic.message,
                    location: [`@${diagnostic.line}:${diagnostic.column}`],
                    extension: [
                        ...(diagnostic.sourceName ? [{
                            url: "http://hl7.org/fhir/StructureDefinition/operationoutcome-file",
                            valueString: diagnostic.sourceName,
                        }] : []),
                        {url: "http://hl7.org/fhir/StructureDefinition/operationoutcome-issue-line", valueInteger: diagnostic.line},
                        {url: "http://hl7.org/fhir/StructureDefinition/operationoutcome-issue-col", valueInteger: diagnostic.column + 1},
                    ],
                })),
            },
        });
        return parameters;
    }
}

function containsStructureDefinition(value: unknown): boolean {
    if (!value || typeof value !== "object" || Array.isArray(value)) return false;
    if ("resourceType" in value && value.resourceType === "StructureDefinition") return true;
    return "resourceType" in value && value.resourceType === "Bundle" && "entry" in value
        && Array.isArray(value.entry) && value.entry.some(entry =>
            entry && typeof entry === "object" && "resource" in entry && containsStructureDefinition(entry.resource));
}
