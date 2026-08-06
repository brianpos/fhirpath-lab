import {
    DEFAULT_FML_DEBUG_SERVER_URL,
    FmlDebugLaunchRequest,
    FmlDebugTrace,
    FmlTraceEvent,
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
const VARIABLE_EXTENSION = "http://fhirpath-lab.com/StructureDefinition/Variable";
const JSON_VALUE_EXTENSION = "http://fhir.forms-lab.com/StructureDefinition/json-value";
const OPERATION_OUTCOME_FILE_EXTENSION =
    "http://hl7.org/fhir/StructureDefinition/operationoutcome-file";

interface FhirExtension {
    extension?: FhirExtension[];
    url?: string;
    valueString?: string;
}

interface FhirParametersPart {
    extension?: FhirExtension[];
    name?: string;
    part?: FhirParametersPart[];
    resource?: JsonValue;
    valueString?: string;
    [key: string]: unknown;
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
    ) {
    }

    public async execute(request: FmlDebugLaunchRequest): Promise<FmlDebugTrace> {
        const input = parseJsonValue(request.inputText, "input resource");
        const body = buildParametersRequest(request);
        const response = await this.fetchImplementation(
            request.serverUrl ?? DEFAULT_FML_DEBUG_SERVER_URL,
            {
                method: "POST",
                headers: {
                    Accept: "application/fhir+json",
                    "Content-Type": "application/fhir+json",
                },
                body: JSON.stringify(body),
                signal: request.signal,
            },
        );
        const responseText = await response.text();

        if (!response.ok) {
            const errorPayload = tryParseJsonValue(responseText);
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

        return parseDebugTrace(payload, input, this.variablePathEvaluator);
    }
}

export function parseDebugTrace(
    payload: FhirParameters,
    initialState: JsonValue,
    variablePathEvaluator: FmlVariablePathEvaluator =
        new FhirPathVariablePathEvaluator(),
): FmlDebugTrace {
    let evaluator: string | undefined;
    let result: FmlTypedValue | undefined;
    let rawResult: string | undefined;
    let outcome: JsonValue | undefined;
    const trace: FmlTraceEvent[] = [];

    for (const parameter of payload.parameter ?? []) {
        if (parameter.name === "parameters") {
            evaluator = parameter.part?.find(part => part.name === "evaluator")?.valueString;
            continue;
        }
        if (parameter.name === "outcome" && parameter.resource) {
            outcome = parameter.resource;
            continue;
        }
        if (parameter.name === "result") {
            const value = readParameterValue(parameter);
            if (typeof value === "string") {
                rawResult = value;
                result = parseFmlTypedValue(tryParseJsonValue(value) ?? value);
            } else if (value !== undefined) {
                result = parseFmlTypedValue(value);
            }
            continue;
        }
        if (parameter.name === "trace") {
            for (const part of parameter.part ?? []) {
                trace.push(parseTraceEvent(trace.length, parameter.valueString ?? "", part));
            }
        }
    }

    const errorMessage = readOutcomeError(outcome);
    if (errorMessage && trace.length === 0) {
        trace.push({
            index: 0,
            name: "exception",
            category: "exception",
            message: errorMessage,
            depth: 0,
            variables: [],
            exception: errorMessage,
        });
    }

    for (const event of trace) {
        hydratePathOnlyVariables(event.variables, initialState, variablePathEvaluator);
    }

    return {
        evaluator,
        initialState: createFmlTypedValue(initialState),
        result,
        rawResult,
        trace,
        outcome,
    };
}

function buildParametersRequest(request: FmlDebugLaunchRequest): FhirParameters {
    const maps = request.maps?.length
        ? request.maps
        : [{text: request.mapText}];
    const parameter: FhirParametersPart[] = maps.map(map => ({
        name: "map",
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
    parameter.push({name: "resource", valueString: request.inputText});
    return {resourceType: "Parameters", parameter};
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

    return {
        index,
        name,
        category,
        message,
        depth: inferTraceDepth(message, category),
        range: parseCursor(findExtensionValue(part.extension, CURSOR_EXTENSION)),
        variables: parseVariables(part.extension),
        state,
        exception,
    };
}

function parseVariables(extensions: FhirExtension[] | undefined): FmlTraceVariable[] {
    return (extensions ?? [])
        .filter(extension => extension.url === VARIABLE_EXTENSION)
        .map(extension => {
            const nameExtension = extension.extension?.find(child => child.url?.startsWith("name-"));
            const dataText = findExtensionValue(extension.extension, JSON_VALUE_EXTENSION)
                ?? findExtensionValue(extension.extension, "value");
            const dataValue = dataText !== undefined ? tryParseJsonValue(dataText) : undefined;
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
    if (part.resource !== undefined) {
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
    if (!outcome || typeof outcome !== "object" || Array.isArray(outcome)) {
        return undefined;
    }
    const issues = outcome.issue;
    if (!Array.isArray(issues)) {
        return undefined;
    }
    for (const issue of issues) {
        if (!issue || typeof issue !== "object" || Array.isArray(issue)) {
            continue;
        }
        if (issue.severity === "fatal" || issue.severity === "error") {
            return readIssueMessage(issue);
        }
    }
    return undefined;
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
    return typeof value === "object"
        && Object.values(value as Record<string, unknown>).every(isJsonValue);
}
