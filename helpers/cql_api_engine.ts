import axios, { AxiosError } from "axios";
import type {
    Bundle,
    DataRequirement,
    Endpoint,
    FhirResource,
    OperationOutcome,
    Parameters,
    ParametersParameter,
} from "fhir/r4b";
import type { ICqlEngineDetails } from "../types/cql_test_engine";
import { settings } from "./user_settings";

export interface CqlNamedParameter {
    name: string;
    type: string;
    value: unknown;
}

export interface CqlPrefetchData {
    key?: string;
    descriptor?: DataRequirement;
    data?: Bundle;
}

export interface CqlLibraryReference {
    url: string;
    name?: string;
}

export interface CqlEvaluationOptions {
    cql: string;
    subject?: string;
    parameters?: CqlNamedParameter[];
    libraries?: CqlLibraryReference[];
    useServerData?: boolean;
    data?: Bundle;
    prefetchData?: CqlPrefetchData[];
    dataEndpoint?: string;
    contentEndpoint?: string;
    terminologyEndpoint?: string;
}

export interface CqlResultItem {
    index: number;
    name: string;
    type: string;
    display: string;
    value?: unknown;
    resource?: FhirResource;
    children: CqlResultItem[];
    raw: ParametersParameter;
}

export interface CqlEvaluationResult {
    results: CqlResultItem[];
    outcomes: OperationOutcome[];
    raw: Parameters | OperationOutcome;
    processedByEngine: string;
    endpointUrl: string;
}

interface R5Endpoint {
    resourceType: "Endpoint";
    status: "active";
    connectionType: Array<{
        coding: Array<{
            system: string;
            code: string;
        }>;
    }>;
    address: string;
}

const primitiveValueTypes = new Map<string, string>([
    ["base64binary", "Base64Binary"],
    ["boolean", "Boolean"],
    ["canonical", "Canonical"],
    ["code", "Code"],
    ["date", "Date"],
    ["datetime", "DateTime"],
    ["decimal", "Decimal"],
    ["id", "Id"],
    ["instant", "Instant"],
    ["integer", "Integer"],
    ["markdown", "Markdown"],
    ["oid", "Oid"],
    ["positiveint", "PositiveInt"],
    ["string", "String"],
    ["time", "Time"],
    ["unsignedint", "UnsignedInt"],
    ["uri", "Uri"],
    ["url", "Url"],
    ["uuid", "Uuid"],
]);

export function normalizeCqlEndpointUrl(input: string): string {
    const value = input.trim();
    if (!value) throw new Error("A CQL server URL is required.");

    let url: URL;
    try {
        url = new URL(value);
    } catch {
        throw new Error("The CQL server URL is not valid.");
    }
    if (url.protocol !== "http:" && url.protocol !== "https:") {
        throw new Error("The CQL server URL must use HTTP or HTTPS.");
    }

    url.pathname = url.pathname.replace(/\/+$/, "");
    if (!url.pathname.toLowerCase().endsWith("/$cql")) {
        url.pathname += "/$cql";
    }
    return url.toString();
}

export function createFhirEndpoint(address: string, fhirVersion = "R4"): Endpoint | R5Endpoint {
    const normalizedAddress = address.trim().replace(/\/+$/, "");
    if (!normalizedAddress) throw new Error("Endpoint addresses cannot be empty.");
    let endpointUrl: URL;
    try {
        endpointUrl = new URL(normalizedAddress);
    } catch {
        throw new Error(`Endpoint address "${normalizedAddress}" is not a valid URL.`);
    }
    if (endpointUrl.protocol !== "http:" && endpointUrl.protocol !== "https:") {
        throw new Error("Endpoint addresses must use HTTP or HTTPS.");
    }
    const connectionType = {
        system: "http://terminology.hl7.org/CodeSystem/endpoint-connection-type",
        code: "hl7-fhir-rest",
    };
    if (/^R[56]/i.test(fhirVersion)) {
        return {
            resourceType: "Endpoint",
            status: "active",
            connectionType: [{ coding: [connectionType] }],
            address: normalizedAddress,
        };
    }
    return {
        resourceType: "Endpoint",
        status: "active",
        connectionType,
        payloadType: [{
            coding: [{
                system: "http://terminology.hl7.org/CodeSystem/endpoint-payload-type",
                code: "any",
            }],
        }],
        address: normalizedAddress,
    };
}

function valueProperty(type: string): string {
    const normalized = type.trim();
    if (!normalized) throw new Error("Named CQL parameters require a FHIR type.");
    const primitive = primitiveValueTypes.get(normalized.toLowerCase());
    return `value${primitive ?? normalized.charAt(0).toUpperCase() + normalized.slice(1)}`;
}

function parseParameterValue(parameter: CqlNamedParameter): unknown {
    if (typeof parameter.value !== "string") return parameter.value;
    const value = parameter.value.trim();
    if (!value) return "";

    switch (parameter.type.toLowerCase()) {
        case "boolean":
            if (value !== "true" && value !== "false") {
                throw new Error(`Parameter "${parameter.name}" must be true or false.`);
            }
            return value === "true";
        case "integer":
        case "positiveint":
        case "unsignedint": {
            const parsed = Number(value);
            if (!Number.isInteger(parsed)) {
                throw new Error(`Parameter "${parameter.name}" must be an integer.`);
            }
            return parsed;
        }
        case "decimal": {
            const parsed = Number(value);
            if (!Number.isFinite(parsed)) {
                throw new Error(`Parameter "${parameter.name}" must be a number.`);
            }
            return parsed;
        }
        default:
            if (/^[{[]/.test(value)) {
                try {
                    return JSON.parse(value);
                } catch {
                    throw new Error(`Parameter "${parameter.name}" contains invalid JSON.`);
                }
            }
            return parameter.value;
    }
}

function createNamedParametersResource(parameters: CqlNamedParameter[]): Parameters {
    const nested: Parameters = {
        resourceType: "Parameters",
        parameter: [],
    };
    for (const parameter of parameters) {
        if (!parameter.name.trim()) throw new Error("Named CQL parameters require a name.");
        const parsedValue = parseParameterValue(parameter);
        if (
            typeof parsedValue === "object"
            && parsedValue !== null
            && "resourceType" in parsedValue
            && typeof parsedValue.resourceType === "string"
        ) {
            nested.parameter!.push({
                name: parameter.name.trim(),
                resource: parsedValue as FhirResource,
            });
        } else {
            nested.parameter!.push({
                name: parameter.name.trim(),
                [valueProperty(parameter.type)]: parsedValue,
            } as ParametersParameter);
        }
    }
    return nested;
}

function addEndpointParameter(
    request: Parameters,
    name: string,
    address: string | undefined,
    fhirVersion: string,
): void {
    if (!address?.trim()) return;
    // The operation model is R4-typed, but configured engines can require an R5/R6 Endpoint.
    request.parameter!.push({
        name,
        resource: createFhirEndpoint(address, fhirVersion) as FhirResource,
    });
}

export function buildCqlParameters(
    options: CqlEvaluationOptions,
    fhirVersion = "R4",
): Parameters {
    if (!options.cql.trim()) throw new Error("Please enter CQL text.");
    if (options.data && options.prefetchData?.length) {
        throw new Error("Inline data and prefetch data are mutually exclusive.");
    }

    const request: Parameters = {
        resourceType: "Parameters",
        parameter: [{
            name: "expression",
            valueString: options.cql,
        }],
    };

    if (options.subject?.trim()) {
        request.parameter!.push({ name: "subject", valueString: options.subject.trim() });
    }
    if (options.parameters?.length) {
        request.parameter!.push({
            name: "parameters",
            resource: createNamedParametersResource(options.parameters),
        });
    }
    for (const library of options.libraries ?? []) {
        if (!library.url.trim()) continue;
        const part: ParametersParameter[] = [{
            name: "url",
            valueCanonical: library.url.trim(),
        }];
        if (library.name?.trim()) {
            part.push({ name: "name", valueString: library.name.trim() });
        }
        request.parameter!.push({ name: "library", part });
    }
    if (options.useServerData) {
        request.parameter!.push({ name: "useServerData", valueBoolean: true });
    }
    if (options.data) {
        request.parameter!.push({ name: "data", resource: options.data });
    }
    for (const prefetch of options.prefetchData ?? []) {
        const part: ParametersParameter[] = [];
        if (prefetch.key?.trim()) part.push({ name: "key", valueString: prefetch.key.trim() });
        if (prefetch.descriptor) part.push({ name: "descriptor", valueDataRequirement: prefetch.descriptor });
        if (prefetch.data) part.push({ name: "data", resource: prefetch.data });
        if (part.length) request.parameter!.push({ name: "prefetchData", part });
    }

    addEndpointParameter(request, "dataEndpoint", options.dataEndpoint, fhirVersion);
    addEndpointParameter(request, "contentEndpoint", options.contentEndpoint, fhirVersion);
    addEndpointParameter(request, "terminologyEndpoint", options.terminologyEndpoint, fhirVersion);
    return request;
}

function displayValue(value: unknown): string {
    if (value === null) return "null";
    if (value === undefined) return "";
    if (typeof value === "string") return value;
    if (typeof value === "number" || typeof value === "boolean") return String(value);
    return JSON.stringify(value, null, 2);
}

function parameterValue(parameter: ParametersParameter): { type: string; value?: unknown } {
    const entry = Object.entries(parameter).find(([key]) => key.startsWith("value"));
    if (entry) return { type: entry[0].slice(5), value: entry[1] };
    if (parameter.resource) {
        return { type: parameter.resource.resourceType, value: parameter.resource };
    }
    if (parameter.part?.length) return { type: "Tuple" };
    return { type: "Empty" };
}

function normalizeParameter(parameter: ParametersParameter, index: number): CqlResultItem {
    const extracted = parameterValue(parameter);
    return {
        index,
        name: parameter.name,
        type: extracted.type,
        value: extracted.value,
        resource: parameter.resource,
        display: displayValue(extracted.value),
        children: (parameter.part ?? []).map(normalizeParameter),
        raw: parameter,
    };
}

function collectOutcomes(resource: Parameters | OperationOutcome): OperationOutcome[] {
    if (resource.resourceType === "OperationOutcome") return [resource];
    const outcomes: OperationOutcome[] = [];
    const visit = (parameter: ParametersParameter): void => {
        if (parameter.resource?.resourceType === "OperationOutcome") {
            outcomes.push(parameter.resource);
        }
        parameter.part?.forEach(visit);
    };
    resource.parameter?.forEach(visit);
    return outcomes;
}

export function normalizeCqlResponse(
    resource: Parameters | OperationOutcome,
    engineName: string,
    endpointUrl: string,
): CqlEvaluationResult {
    return {
        results: resource.resourceType === "Parameters"
            ? (resource.parameter ?? []).map(normalizeParameter)
            : [],
        outcomes: collectOutcomes(resource),
        raw: resource,
        processedByEngine: engineName,
        endpointUrl,
    };
}

function networkOutcome(message: string): OperationOutcome {
    return {
        resourceType: "OperationOutcome",
        issue: [{
            severity: "error",
            code: "exception",
            diagnostics: message,
        }],
    };
}

export async function resolveCqlEngineUrl(
    engine: ICqlEngineDetails,
    config?: Record<string, unknown>,
): Promise<string> {
    if (engine.endpointUrl) return normalizeCqlEndpointUrl(engine.endpointUrl);

    const configuredUrl = engine.configSetting
        ? config
            ? config[engine.configSetting]
            : await settings.getConfiguredServerUrl(engine.configSetting)
        : undefined;
    if (typeof configuredUrl !== "string" || !configuredUrl.trim()) {
        throw new Error(`No URL is configured for CQL engine: ${engine.name}.`);
    }
    return normalizeCqlEndpointUrl(configuredUrl);
}

export async function evaluateCql(
    options: CqlEvaluationOptions,
    engine: ICqlEngineDetails,
    config?: Record<string, unknown>,
): Promise<CqlEvaluationResult> {
    const endpointUrl = await resolveCqlEngineUrl(engine, config);
    const request = buildCqlParameters(options, engine.fhirVersion);
    try {
        const response = await axios.post<Parameters | OperationOutcome>(endpointUrl, request, {
            headers: {
                Accept: "application/fhir+json, application/json",
                "Content-Type": "application/fhir+json",
            },
        });
        if (
            response.data.resourceType !== "Parameters"
            && response.data.resourceType !== "OperationOutcome"
        ) {
            throw new Error("The CQL server did not return a FHIR Parameters or OperationOutcome resource.");
        }
        return normalizeCqlResponse(response.data, engine.name, endpointUrl);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<OperationOutcome>;
            const outcome = axiosError.response?.data?.resourceType === "OperationOutcome"
                ? axiosError.response.data
                : networkOutcome(
                    axiosError.response
                        ? `CQL server returned HTTP ${axiosError.response.status}: ${axiosError.message}`
                        : `CORS or network error: ${axiosError.message}. The server may not allow requests from this origin.`,
                );
            return normalizeCqlResponse(outcome, engine.name, endpointUrl);
        }
        throw error;
    }
}
