import {
    DEFAULT_FML_DEBUG_SERVER_URL,
    FmlDebugIssue,
    FmlDebugLaunchRequest,
    FmlDebugMapSource,
    FmlDebugTrace,
    FmlTraceEvent,
    FmlTracePhase,
    FmlTraceSourceRange,
    FmlTraceVariable,
    FmlTypedValue,
    JsonValue,
} from "./contracts";
import {createFmlTypedValue, parseFmlTypedValue} from "./FmlTypedValue";
import {
    FhirPathVariablePathEvaluator,
    FmlVariablePathEvaluator,
    hydratePathOnlyVariables,
} from "./FmlVariablePathResolver";

const CURSOR_EXTENSION = "http://fhirpath-lab.com/StructureDefinition/Cursor";
const TRACE_DEPTH_EXTENSION = "http://fhirpath-lab.com/StructureDefinition/TraceDepth";
const TRACE_LOCATION_EXTENSION = "http://fhirpath-lab.com/StructureDefinition/TraceLocation";
const TRACE_PHASE_EXTENSION = "http://fhirpath-lab.com/StructureDefinition/TracePhase";
const VARIABLE_EXTENSION = "http://fhirpath-lab.com/StructureDefinition/Variable";
const JSON_VALUE_EXTENSION = "http://fhir.forms-lab.com/StructureDefinition/json-value";
const VARIABLE_VALUE_EXTENSION = "value";
const OPERATION_OUTCOME_FILE_EXTENSION =
    "http://hl7.org/fhir/StructureDefinition/operationoutcome-file";
const OPERATION_OUTCOME_LINE_EXTENSION =
    "http://hl7.org/fhir/StructureDefinition/operationoutcome-issue-line";
const OPERATION_OUTCOME_COLUMN_EXTENSION =
    "http://hl7.org/fhir/StructureDefinition/operationoutcome-issue-col";

interface FhirExtension {
    extension?: FhirExtension[];
    url?: string;
    valueCode?: string;
    valueInteger?: number;
    valueString?: string;
}

interface FhirParametersPart {
    extension?: FhirExtension[];
    name?: string;
    part?: FhirParametersPart[];
    resource?: unknown;
    valueString?: string;
    valueCode?: string;
    valueInteger?: number;
    valueBoolean?: boolean;
    valueDecimal?: number;
}

interface FhirParameters {
    resourceType?: string;
    parameter?: FhirParametersPart[];
}

export class FmlDebugEngineError extends Error {
    public constructor(message: string, public readonly outcome?: JsonValue) {
        super(message);
        this.name = "FmlDebugEngineError";
    }
}

export class FmlDebugService {
    public constructor(
        private readonly fetchImplementation: typeof fetch = fetch,
        private readonly variablePathEvaluator: FmlVariablePathEvaluator =
            new FhirPathVariablePathEvaluator(),
        private readonly log?: (message: string) => void,
    ) {
    }

    public async execute(request: FmlDebugLaunchRequest): Promise<FmlDebugTrace> {
        const input = parseFmlInput(request.inputText);
        const body = buildParametersRequest(request);
        const url = request.serverUrl ?? DEFAULT_FML_DEBUG_SERVER_URL;
        const headers = {
            Accept: "application/fhir+json, application/json",
            "Content-Type": "application/fhir+json",
        };
        this.log?.(`FML server request: POST ${url}\n${Object.entries(headers).map(([name, value]) => `${name}: ${value}`).join("\n")}\n\n${JSON.stringify(body, null, 2)}`);
        let response: Response;
        let responseText: string;
        try {
            response = await this.fetchImplementation(
                url,
                {
                    method: "POST",
                    headers,
                    body: JSON.stringify(body),
                    signal: request.signal,
                },
            );
            responseText = await response.text();
        } catch (error) {
            this.log?.(`FML server transport error: ${url}\n${error instanceof Error ? error.message : String(error)}`);
            throw error;
        }
        this.log?.(`FML server response: HTTP ${response.status} ${response.statusText} from ${url}\n${responseText}`);

        if (!response.ok) {
            const errorPayload = tryParseJsonValue(responseText);
            if (isParametersWithTrace(errorPayload)) {
                const trace = parseDebugTrace(errorPayload, input, this.variablePathEvaluator, request.maps
                    ?? [{text: request.mapText}]);
                const last = trace.trace[trace.trace.length - 1];
                if (!last) {
                    throw new FmlDebugEngineError(
                        `FML debug engine returned HTTP ${response.status} ${response.statusText}.`,
                        trace.outcome ?? errorPayload,
                    );
                }
                if (!last.exception) {
                    last.exception = `FML debug engine returned HTTP ${response.status} ${response.statusText}.`;
                }
                return trace;
            }
            throw new FmlDebugEngineError(
                `FML debug engine returned HTTP ${response.status} ${response.statusText}.`,
                errorPayload,
            );
        }
        const payload = parseJsonValue(responseText, "debug engine response") as FhirParameters;
        if (payload.resourceType === "OperationOutcome") {
            throw new FmlDebugEngineError(readOutcomeMessage(payload), payload as JsonValue);
        }
        if (payload.resourceType !== "Parameters") {
            throw new FmlDebugEngineError("FML debug engine did not return a FHIR Parameters resource.");
        }

        return parseDebugTrace(payload, input, this.variablePathEvaluator, request.maps
            ?? [{text: request.mapText}]);
    }
}

export function parseDebugTrace(
    payload: FhirParameters,
    initialState: JsonValue,
    variablePathEvaluator: FmlVariablePathEvaluator =
        new FhirPathVariablePathEvaluator(),
    sources: FmlDebugMapSource[] = [],
): FmlDebugTrace {
    let evaluator: string | undefined;
    let result: FmlTypedValue | undefined;
    let rawResult: string | undefined;
    let outcome: JsonValue | undefined;
    const trace: FmlTraceEvent[] = [];
    let traceStatus: FmlDebugTrace["traceStatus"] = "complete";
    let parameters: JsonValue | undefined;
    const output: JsonValue[] = [];
    let scopeDepth = 0;
    const preferredResult = payload.parameter?.find(parameter => parameter.name === "return")
        ?? payload.parameter?.find(parameter => parameter.name === "result");

    for (const parameter of payload.parameter ?? []) {
        if (parameter.name === "parameters") {
            evaluator = parameter.part?.find(part => part.name === "evaluator")?.valueString;
            parameters = parameter as JsonValue;
            continue;
        }
        if (parameter.name === "output") {
            output.push(parameter as JsonValue);
            continue;
        }
        if (parameter.name === "traceStatus") {
            const status = parameter.valueCode;
            if (status !== "complete" && status !== "truncated" && status !== "stopped") {
                throw new FmlDebugEngineError(`Unrecognized traceStatus: ${String(status)}.`);
            }
            traceStatus = status;
            continue;
        }
        if (parameter.name === "outcome" && isJsonValue(parameter.resource)) {
            outcome = parameter.resource;
            continue;
        }
        if (parameter === preferredResult) {
            const value = readTransformResult(parameter);
            if (typeof value === "string") {
                rawResult = value;
                const parsed = tryParseJsonValue(value);
                result = parseFmlTypedValue(parsed !== undefined ? parsed : value);
            } else if (value !== undefined) {
                result = parseFmlTypedValue(value);
            }
            continue;
        }
        if (parameter.name === "trace") {
            const structured = parameter.part?.some(part => [
                "phase", "depth", "source", "startRow", "startColumn", "endRow", "endColumn",
                "expressionPosition", "variable", "message",
            ].includes(part.name ?? ""));
            if (structured) {
                const event = parseStructuredTraceEvent(trace.length, parameter, scopeDepth);
                if (event.phase === "enter") {
                    scopeDepth++;
                } else if (event.phase === "exit") {
                    scopeDepth = Math.max(0, scopeDepth - 1);
                }
                trace.push(event);
            } else {
                for (const part of parameter.part ?? []) {
                    trace.push(parseTraceEvent(trace.length, parameter.valueString ?? "", part));
                }
            }
        }
    }

    for (const event of trace) {
        hydratePathOnlyVariables(event.variables, initialState, variablePathEvaluator);
        event.variables = collectVariableBindings(event.variables);
        const source = findTraceMapSource(event.mapFileName, sources);
        if (source) {
            event.source = source;
            event.range = resolveTraceSourceRange(event, source.text);
        }
    }
    const failure = readOutcomeError(outcome);
    if (failure && trace.length > 0) {
        trace[trace.length - 1].exception = failure;
    }

    return {
        evaluator,
        initialState: createFmlTypedValue(initialState),
        result,
        rawResult,
        trace,
        outcome,
        traceStatus,
        parameters,
        output,
        rawResponse: payload as JsonValue,
    };
}

export function parseFmlInput(text: string): JsonValue {
    return text.trimStart().startsWith("<") ? text : parseJsonValue(text, "input resource");
}

export function buildParametersRequest(request: FmlDebugLaunchRequest): FhirParameters {
    const legacyPost = request.legacyPost === true;
    const maps = request.maps?.length
        ? request.maps
        : [{text: request.mapText}];
    const parameter: FhirParametersPart[] = maps.map(map => ({
        name: legacyPost ? "map" : "srcMap",
        valueString: map.text,
        ...(map.fileName
            ? {extension: [{url: OPERATION_OUTCOME_FILE_EXTENSION, valueString: map.fileName}]}
            : {}),
    }));
    if (request.modelText?.trim()) {
        parameter.push({name: "model", valueString: request.modelText});
    }
    if (request.modelResources?.length) {
        parameter.push({
            name: "model",
            resource: {
                resourceType: "Bundle",
                type: "collection",
                entry: request.modelResources.map(resource => ({resource})),
            },
        });
    }
    parameter.push(legacyPost
        ? {name: "resource", valueString: request.inputText}
        : {name: "content", resource: createFmlContent(request.inputText)});

        if (legacyPost) {
        parameter.push({name: "debug", valueBoolean: true});
    }
    return {resourceType: "Parameters", parameter};
}

export function createFmlContent(inputText: string): {resourceType: "Binary"; contentType: string; data: string} {
    const bytes = new TextEncoder().encode(inputText);
    const encoded: string[] = [];
    for (let offset = 0; offset < bytes.length; offset += 8192) {
        encoded.push(String.fromCharCode(...bytes.subarray(offset, offset + 8192)));
    }
    return {
        resourceType: "Binary",
        contentType: inputText.trimStart().startsWith("<")
            ? "application/fhir+xml"
            : "application/fhir+json",
        data: btoa(encoded.join("")),
    };
}

function isParametersWithTrace(value: JsonValue | undefined): value is FhirParameters & {[key: string]: JsonValue} {
    return value !== null && typeof value === "object" && !Array.isArray(value)
        && value.resourceType === "Parameters" && Array.isArray(value.parameter)
        && value.parameter.some(parameter => parameter !== null && typeof parameter === "object"
            && !Array.isArray(parameter) && parameter.name === "trace");
}

function readTransformResult(parameter: FhirParametersPart): JsonValue | undefined {
    const value = readParameterValue(parameter);
    if (value && typeof value === "object" && !Array.isArray(value)
        && value.resourceType === "Binary" && typeof value.data === "string") {
        try {
            return new TextDecoder("utf-8", {fatal: true}).decode(
                Uint8Array.from(atob(value.data), character => character.charCodeAt(0)),
            );
        } catch (error) {
            throw new FmlDebugEngineError(`Unable to decode Binary transform result: ${String(error)}`);
        }
    }
    return value;
}

function parseStructuredTraceEvent(index: number, parameter: FhirParametersPart, scopeDepth: number): FmlTraceEvent {
    const parts = parameter.part ?? [];
    const read = (name: string): JsonValue | undefined => {
        const part = parts.find(candidate => candidate.name === name);
        return part ? readParameterValue(part) : undefined;
    };
    const phase = read("phase");
    if (phase !== "enter" && phase !== "step" && phase !== "exit") {
        throw new FmlDebugEngineError(`Unrecognized trace phase: ${String(phase)}.`);
    }
    const integer = (name: string): number | undefined => {
        const value = read(name);
        if (value === undefined) {
            return undefined;
        }
        if (typeof value !== "number" || !Number.isInteger(value) || value < 0) {
            throw new FmlDebugEngineError(`Trace ${name} must be a non-negative integer.`);
        }
        return value;
    };
    const startRow = integer("startRow");
    const startColumn = integer("startColumn");
    const endRow = integer("endRow");
    const endColumn = integer("endColumn");
    if ((startRow === undefined) !== (startColumn === undefined)
        || (endRow === undefined) !== (endColumn === undefined)
        || (endRow !== undefined && startRow === undefined)) {
        throw new FmlDebugEngineError("Trace positions require paired row and column coordinates.");
    }
    const messages = parts.filter(part => part.name === "message").map(part => ({
        name: part.part?.find(child => child.name === "name")?.valueString,
        text: (part.part ?? []).filter(child => child.name === "text")
            .map(child => child.valueString ?? ""),
    }));
    const expression = read("expressionPosition");
    const source = read("source");
    const text = messages.flatMap(message => message.text.map(line => message.name
        ? `${message.name}: ${line}` : line)).join("\n");
    return {
        index,
        name: typeof expression === "string" ? expression : phase,
        category: "debug",
        phase,
        depth: integer("depth") ?? (phase === "exit" ? Math.max(0, scopeDepth - 1) : scopeDepth),
        message: text || `${phase}${typeof expression === "string" ? ` ${expression}` : ""}`,
        messages,
        ...(typeof expression === "string" ? {traceLocation: expression} : {}),
        ...(typeof source === "string" ? {mapFileName: source} : {}),
        ...(startRow !== undefined && startColumn !== undefined
            ? {textRange: {startRow, startColumn, endRow, endColumn}} : {}),
        variables: parts.filter(part => part.name === "variable").map(parseStructuredVariable),
    };
}

function parseStructuredVariable(part: FhirParametersPart): FmlTraceVariable {
    const parts = part.part ?? [];
    const name = parts.find(child => child.name === "name")?.valueString;
    if (!name) {
        throw new FmlDebugEngineError("Trace variable is missing its name.");
    }
    const jsonText = parts.find(child => child.name === "jsonValue")?.valueString;
    const valuePart = parts.find(child => child.name === "value" || child.name === "resource");
    const value = jsonText !== undefined
        ? parseJsonValue(jsonText, `trace variable '${name}' jsonValue`)
        : valuePart ? readParameterValue(valuePart) : undefined;
    const path = parts.find(child => child.name === "path")?.valueString ?? "";
    return {
        name,
        mode: parts.find(child => child.name === "contextType")?.valueString ?? "local",
        path,
        datatype: parts.find(child => child.name === "dataType")?.valueString,
        retrievalFromInput: true,
        ...(value !== undefined ? {data: createFmlTypedValue(value)}
            : !path ? {data: createFmlTypedValue([])} : {}),
    };
}

function collectVariableBindings(variables: FmlTraceVariable[]): FmlTraceVariable[] {
    const bindings: FmlTraceVariable[] = [];
    for (const variable of variables) {
        const existing = variable.retrievalFromInput
            ? bindings.find(binding => binding.name === variable.name) : undefined;
        if (existing) {
            continue;
        }
        const items = variable.retrievalFromInput
            ? variables.filter(item => item.name === variable.name) : [variable];
        if (items.length > 1) {
            const errors = items.flatMap(item => item.errorMessage ? [item.errorMessage] : []);
            bindings.push({
                ...variable,
                data: errors.length === 0
                    ? createFmlTypedValue(items.map(item => item.data?.value ?? null)) : undefined,
                ...(errors.length ? {errorMessage: errors.join("; ")} : {}),
            });
        } else {
            bindings.push(variable);
        }
    }
    return bindings;
}

export function resolveTraceSourceRange(event: FmlTraceEvent, text: string): FmlTraceSourceRange | undefined {
    if (event.range || !event.textRange) {
        return event.range;
    }
    const offsetAt = (row: number, column: number): number | undefined => {
        const lines = text.split(/\r\n|\r|\n/);
        if (row >= lines.length || column > lines[row].length) {
            return undefined;
        }
        const starts = [...text.matchAll(/\r\n|\r|\n/g)];
        return (row === 0 ? 0 : (starts[row - 1].index ?? 0) + starts[row - 1][0].length) + column;
    };
    const {startRow, startColumn, endRow, endColumn} = event.textRange;
    const startOffset = offsetAt(startRow, startColumn);
    const endOffset = endRow !== undefined && endColumn !== undefined
        ? offsetAt(endRow, endColumn) : startOffset === undefined ? undefined : Math.min(startOffset + 1, text.length);
    if (startOffset === undefined || endOffset === undefined || endOffset < startOffset) {
        throw new FmlDebugEngineError("Trace source range is outside its source document.");
    }
    return {startOffset, length: endOffset - startOffset};
}

export function findTraceMapSource(identifier: string | undefined, sources: FmlDebugMapSource[]): FmlDebugMapSource | undefined {
    if (!identifier) {
        return sources[0];
    }
    const canonical = sources.find(source => source.text
        .match(/^\s*(?:\/\/\/\s*url\s*=\s*|map\s+)["']([^"']+)["']/m)?.[1] === identifier);
    if (canonical) {
        return canonical;
    }
    const windowsPaths = sources.some(source => /^[a-z]:[\\/]/i.test(source.filePath ?? ""));
    const normalize = (value: string): string => {
        const filePath = value.startsWith("file:")
            ? decodeURIComponent(new URL(value).pathname).replace(/^\/([a-z]:)/i, "$1") : value;
        const normalized = filePath.replace(/\\/g, "/");
        return windowsPaths || /^[a-z]:\//i.test(normalized) ? normalized.toLowerCase() : normalized;
    };
    const identity = normalize(identifier);
    const exact = sources.find(source => [source.fileName, source.filePath]
        .some(value => value !== undefined && normalize(value) === identity));
    if (exact) {
        return exact;
    }
    const matches = sources.filter(source => source.fileName
        && normalize(source.fileName).split("/").pop() === identity.split("/").pop());
    return matches.length === 1 ? matches[0] : undefined;
}

function parseTraceEvent(index: number, name: string, part: FhirParametersPart): FmlTraceEvent {
    const messageValue = readParameterValue(part);
    const message = typeof messageValue === "string"
        ? messageValue
        : messageValue === undefined
            ? ""
            : JSON.stringify(messageValue, null, 2);
    const category = part.name ?? "trace";
    const state = readTraceState(part);
    const exception = category === "exception" || category === "error"
        ? message
        : undefined;
    const mapFileName = findExtensionValue(part.extension, OPERATION_OUTCOME_FILE_EXTENSION);

    return {
        index,
        name,
        category,
        message,
        depth: findExtensionInteger(part.extension, TRACE_DEPTH_EXTENSION)
            ?? inferTraceDepth(message, category),
        phase: parseTracePhase(findExtensionCode(part.extension, TRACE_PHASE_EXTENSION)),
        range: parseCursor(findExtensionValue(part.extension, CURSOR_EXTENSION)),
        traceLocation: findExtensionValue(part.extension, TRACE_LOCATION_EXTENSION),
        variables: parseVariables(part.extension),
        state,
        exception,
        ...(mapFileName ? {mapFileName} : {}),
    };
}

function parseVariables(extensions: FhirExtension[] | undefined): FmlTraceVariable[] {
    return (extensions ?? [])
        .filter(extension => extension.url === VARIABLE_EXTENSION)
        .map(extension => {
            const nameExtension = extension.extension?.find(child => child.url?.startsWith("name-"));
            const dataValue = readVariableValue(extension.extension);
            const data = dataValue !== undefined ? parseFmlTypedValue(dataValue) : undefined;
            const datatype = findExtensionValue(extension.extension, "datatype")
                ?? findExtensionValue(extension.extension, "type");
            const errorMessage = findExtensionValue(extension.extension, "error");
            return {
                name: nameExtension?.valueString ?? "variable",
                mode: nameExtension?.url?.replace("name-", "") ?? "SHARED",
                path: findExtensionValue(extension.extension, "path") ?? "",
                ...(data !== undefined ? {data} : {}),
                ...(datatype !== undefined ? {datatype} : {}),
                ...(errorMessage !== undefined ? {errorMessage} : {}),
            };
        });
}

function readTraceState(part: FhirParametersPart): FmlTypedValue | undefined {
    const jsonExtension = findExtensionValue(part.extension, JSON_VALUE_EXTENSION);
    if (jsonExtension) {
        const value = tryParseJsonValue(jsonExtension);
        return value !== undefined ? parseFmlTypedValue(value) : undefined;
    }
    const value = readParameterValue(part);
    return typeof value === "object" && value !== null
        ? parseFmlTypedValue(value)
        : undefined;
}

function readParameterValue(part: FhirParametersPart): JsonValue | undefined {
    if (part.resource !== undefined && isJsonValue(part.resource)) {
        return part.resource;
    }
    for (const [key, value] of Object.entries(part)) {
        if (key.startsWith("value") && isJsonValue(value)) {
            return value;
        }
    }
    const jsonExtension = findExtensionValue(part.extension, JSON_VALUE_EXTENSION);
    return jsonExtension ? tryParseJsonValue(jsonExtension) : undefined;
}

function findExtensionValue(extensions: FhirExtension[] | undefined, url: string): string | undefined {
    return extensions?.find(extension => extension.url === url)?.valueString;
}

function findExtensionInteger(extensions: FhirExtension[] | undefined, url: string): number | undefined {
    const value = extensions?.find(extension => extension.url === url)?.valueInteger;
    return typeof value === "number" && Number.isInteger(value) && value >= 0 ? value : undefined;
}

function findExtensionCode(extensions: FhirExtension[] | undefined, url: string): string | undefined {
    const extension = extensions?.find(candidate => candidate.url === url);
    return extension?.valueCode ?? extension?.valueString;
}

/** Reads an extension carrying JSON text, keeping the raw text when it does not parse. */
function findExtensionJson(
    extensions: FhirExtension[] | undefined,
    url: string,
): JsonValue | undefined {
    const text = findExtensionValue(extensions, url);
    if (text === undefined) {
        return undefined;
    }
    const parsed = tryParseJsonValue(text);
    return parsed === undefined ? text : parsed;
}

/** Engines supply a variable value as JSON text, or as a native value[x] for supported types. */
function readVariableValue(extensions: FhirExtension[] | undefined): JsonValue | undefined {
    const parsed = findExtensionJson(extensions, JSON_VALUE_EXTENSION);
    return parsed !== undefined
        ? parsed
        : findExtensionData(extensions, VARIABLE_VALUE_EXTENSION);
}

/** Reads an extension using its native FHIR value[x], falling back to JSON text in valueString. */
function findExtensionData(
    extensions: FhirExtension[] | undefined,
    url: string,
): JsonValue | undefined {
    const extension = extensions?.find(candidate => candidate.url === url);
    if (!extension) {
        return undefined;
    }
    if (typeof extension.valueString === "string") {
        return parseStructuredText(extension.valueString);
    }
    for (const [key, value] of Object.entries(extension)) {
        if (key !== "url" && key.startsWith("value") && isJsonValue(value)) {
            return value;
        }
    }
    return undefined;
}

/**
 * Only object and array text is decoded, so that engines serialising primitives as display text
 * ("True", "123") keep their literal value instead of being coerced or discarded.
 */
function parseStructuredText(text: string): JsonValue {
    const trimmed = text.trim();
    return trimmed.startsWith("{") || trimmed.startsWith("[")
        ? tryParseJsonValue(trimmed) ?? text
        : text;
}

function parseTracePhase(value: string | undefined): FmlTracePhase {
    switch (value?.trim().toLowerCase()) {
        case "enter":
            return "enter";
        case "exit":
            return "exit";
        case "step":
            return "step";
        default:
            return "instant";
    }
}

function parseCursor(value: string | undefined): FmlTraceSourceRange | undefined {
    const match = value?.match(/^\s*(\d+)\s*-\s*(\d+)\s*$/);
    if (!match) {
        return undefined;
    }
    const startOffset = Number.parseInt(match[1], 10);
    const endOffset = Number.parseInt(match[2], 10);
    return endOffset >= startOffset
        ? {startOffset, length: endOffset - startOffset}
        : undefined;
}

function inferTraceDepth(message: string, category: string): number {
    const indentation = message.length - message.trimStart().length;
    const normalized = message.trimStart().toLowerCase();
    if (normalized.startsWith("group")) {
        return 0;
    }
    if (normalized.startsWith("rule")) {
        return Math.max(1, Math.floor(indentation / 2) + 1);
    }
    return category === "debug"
        ? Math.max(0, Math.floor(indentation / 2) + 1)
        : Math.max(1, Math.floor(indentation / 2) + 2);
}

function readOutcomeError(outcome: JsonValue | undefined): string | undefined {
    return parseOperationOutcomeIssues(outcome).find(issue => {
        return issue.severity === "fatal" || issue.severity === "error";
    })?.message;
}

export function parseOperationOutcomeIssues(outcome: JsonValue | undefined): FmlDebugIssue[] {
    if (!outcome || typeof outcome !== "object" || Array.isArray(outcome) || !Array.isArray(outcome.issue)) {
        return [];
    }
    return outcome.issue.flatMap(issue => {
        if (!issue || typeof issue !== "object" || Array.isArray(issue)) {
            return [];
        }
        const extensions = Array.isArray(issue.extension)
            ? issue.extension.filter(isOutcomeExtension)
            : [];
        return [{
            message: readIssueMessage(issue),
            ...(typeof issue.severity === "string" ? {severity: issue.severity} : {}),
            ...(Array.isArray(issue.expression) && typeof issue.expression[0] === "string"
                ? {expression: issue.expression[0]} : {}),
            ...readStringExtension(extensions, OPERATION_OUTCOME_FILE_EXTENSION, "fileName"),
            ...readPositiveIntegerExtension(extensions, OPERATION_OUTCOME_LINE_EXTENSION, "line"),
            ...readPositiveIntegerExtension(extensions, OPERATION_OUTCOME_COLUMN_EXTENSION, "column"),
        }];
    });
}

function isOutcomeExtension(value: JsonValue): value is {[key: string]: JsonValue} {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readStringExtension(
    extensions: Array<{[key: string]: JsonValue}>,
    url: string,
    property: "fileName",
): Pick<FmlDebugIssue, "fileName"> {
    const value = extensions.find(extension => extension.url === url)?.valueString;
    return typeof value === "string" && value.length > 0 ? {[property]: value} : {};
}

function readPositiveIntegerExtension(
    extensions: Array<{[key: string]: JsonValue}>,
    url: string,
    property: "line" | "column",
): Pick<FmlDebugIssue, "line" | "column"> {
    const value = extensions.find(extension => extension.url === url)?.valueInteger;
    return typeof value === "number" && Number.isInteger(value) && value >= 1 ? {[property]: value} : {};
}

function readOutcomeMessage(outcome: FhirParameters): string {
    return readOutcomeError(outcome as JsonValue) ?? "FML debug engine returned an OperationOutcome.";
}

function readIssueMessage(issue: {[key: string]: JsonValue}): string {
    const details = issue.details;
    if (details && typeof details === "object" && !Array.isArray(details) && typeof details.text === "string") {
        return details.text;
    }
    return typeof issue.diagnostics === "string"
        ? issue.diagnostics
        : "FML execution failed.";
}

function parseJsonValue(text: string, description: string): JsonValue {
    try {
        const value: unknown = JSON.parse(text);
        if (!isJsonValue(value)) {
            throw new Error(`${description} is not JSON-compatible.`);
        }
        return value;
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        throw new FmlDebugEngineError(`Unable to parse ${description}: ${message}`);
    }
}

function tryParseJsonValue(text: string): JsonValue | undefined {
    try {
        const value: unknown = JSON.parse(text);
        return isJsonValue(value) ? value : undefined;
    } catch {
        return undefined;
    }
}

function isJsonValue(value: unknown): value is JsonValue {
    if (value === null || ["boolean", "number", "string"].includes(typeof value)) {
        return true;
    }
    if (Array.isArray(value)) {
        return value.every(isJsonValue);
    }
    return value !== null && typeof value === "object"
        && Object.values(value as Record<string, unknown>).every(isJsonValue);
}
