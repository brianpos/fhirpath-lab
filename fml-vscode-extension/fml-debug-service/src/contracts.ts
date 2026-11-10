export const DEFAULT_FML_DEBUG_SERVER_URL =
    "https://fhir-mapping-lab2.azurewebsites.net/StructureMap/$transform?debug=true";

export type JsonValue =
    | boolean
    | number
    | string
    | null
    | JsonValue[]
    | {[key: string]: JsonValue};

export interface FmlDebugType {
    name: string;
    namespace?: string;
    collection?: boolean;
}

export type FmlDebugTypeMap = Record<string, FmlDebugType>;

export interface FmlTypedValue {
    value: JsonValue;
    types: FmlDebugTypeMap;
}

export interface FmlDebugLaunchRequest {
    mapText: string;
    maps?: FmlDebugMapSource[];
    inputText: string;
    modelText?: string;
    modelResources?: JsonValue[];
    serverUrl?: string;
    legacyPost?: boolean;
    terminologyServerUrl?: string;
    terminologyFhirVersion?: "R4" | "R5";
    signal?: AbortSignal;
    defaultFhirVersion?: import("@fhirpath-lab/validator").FhirVersion;
    profileBaseTypes?: Record<string, string>;
    customTypeModels?: Record<string, import("@fhirpath-lab/validator").TypeModel>;
    entryGroup?: string;
    localTrace?: false | {
        maxEvents?: number;
        maxBytes?: number;
        detail?: "full" | "rules" | "coverage";
    };
}

export interface FmlDebugMapSource {
    fileName?: string;
    filePath?: string;
    text: string;
}

export interface FmlDebugIssue {
    message: string;
    severity?: string;
    fileName?: string;
    line?: number;
    column?: number;
    expression?: string;
}

export interface FmlTraceVariable {
    name: string;
    mode: "INPUT" | "OUTPUT" | "SHARED" | string;
    path: string;
    data?: FmlTypedValue;
    datatype?: string;
    errorMessage?: string;
    retrievalFromInput?: boolean;
}

export interface FmlTraceSourceRange {
    startOffset: number;
    length: number;
}

/** `instant` is retained for legacy extension-based recordings. */
export type FmlTracePhase = "enter" | "exit" | "step" | "instant";

export interface FmlTraceTextRange {
    startRow: number;
    startColumn: number;
    endRow?: number;
    endColumn?: number;
}

export interface FmlTraceEvent {
    index: number;
    name: string;
    category: string;
    message: string;
    depth: number;
    phase: FmlTracePhase;
    range?: FmlTraceSourceRange;
    textRange?: FmlTraceTextRange;
    messages?: {name?: string; text: string[]}[];
    /** Simplified FHIRPath identifying the StructureMap element that produced the event. */
    traceLocation?: string;
    variables: FmlTraceVariable[];
    state?: FmlTypedValue;
    exception?: string;
    /** Diagnostic filename of the map owning `range`; absent means the primary map. */
    mapFileName?: string;
    source?: FmlDebugMapSource;
}

export interface FmlDebugTrace {
    evaluator?: string;
    initialState: FmlTypedValue;
    result?: FmlTypedValue;
    rawResult?: string;
    trace: FmlTraceEvent[];
    outcome?: JsonValue;
    traceStatus?: "complete" | "truncated" | "stopped";
    parameters?: JsonValue;
    output?: JsonValue[];
    rawResponse?: JsonValue;
}
