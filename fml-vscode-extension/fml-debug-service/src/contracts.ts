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
    signal?: AbortSignal;
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
}

export interface FmlTraceVariable {
    name: string;
    mode: "INPUT" | "OUTPUT" | "SHARED" | string;
    path: string;
    data?: FmlTypedValue;
    datatype?: string;
    errorMessage?: string;
}

export interface FmlTraceSourceRange {
    startOffset: number;
    length: number;
}

export interface FmlTraceEvent {
    index: number;
    name: string;
    category: string;
    message: string;
    depth: number;
    range?: FmlTraceSourceRange;
    variables: FmlTraceVariable[];
    state?: FmlTypedValue;
    exception?: string;
    source?: FmlDebugMapSource;
}

export interface FmlDebugTrace {
    evaluator?: string;
    initialState: FmlTypedValue;
    result?: FmlTypedValue;
    rawResult?: string;
    trace: FmlTraceEvent[];
    outcome?: JsonValue;
}
