export const VALIDATE_DOCUMENT_REQUEST = "fml/validateDocument";
export const INDEX_WORKSPACE_REQUEST = "fml/indexWorkspace";
export const GET_IMPORT_VISIBLE_DOCUMENTS_REQUEST = "fml/getImportVisibleDocuments";
export const EVALUATE_DOCUMENT_REQUEST = "fml/evaluateDocument";
export const WORKSPACE_FILE_EVENT_NOTIFICATION = "fml/workspaceFileEvent";
export const GET_SERVER_STATUS_REQUEST = "fml/getServerStatus";
export const GET_INDEX_FAILURES_REQUEST = "fml/getIndexFailures";
export const SERVER_STATUS_CHANGED_NOTIFICATION = "fml/serverStatusChanged";

export interface LanguagePosition {
    line: number;
    character: number;
}

export interface LanguageRange {
    start: LanguagePosition;
    end: LanguagePosition;
}

export interface LanguageDiagnostic {
    range: LanguageRange;
    severity: "error" | "warning" | "information";
    message: string;
    source: "FHIR Mapping Language Tools";
    offendingText?: string;
}

export interface TextDocumentSnapshot {
    uri: string;
    text: string;
}

export interface DocumentValidationResult {
    diagnostics: LanguageDiagnostic[];
    errorCount: number;
    warningCount: number;
    informationCount: number;
}

export interface CompletionRequest extends TextDocumentSnapshot {
    position: LanguagePosition;
}

export interface CompletionSuggestion {
    label: string;
    detail: string;
    insertText: string;
    snippet: boolean;
    kind?: "function" | "property";
}

export interface HoverRequest extends TextDocumentSnapshot {
    position: LanguagePosition;
}

export interface HoverInformation {
    range: LanguageRange;
    markdown: string;
}

export interface ValidateDocumentRequest {
    uri: string;
    retainDiagnostics?: boolean;
}

export interface ImportVisibleDocumentsRequest {
    uri: string;
}

export interface ImportVisibleDocumentsResult {
    uris: string[];
}

export interface FmlEvaluationMapSnapshot extends TextDocumentSnapshot {
    version?: number;
}

export type EvaluationJsonValue = string | number | boolean | null
    | EvaluationJsonValue[] | {[key: string]: EvaluationJsonValue};

export interface EvaluationModelFile {
    filePath: string;
    resources: readonly EvaluationJsonValue[];
}

export interface EvaluationModelContext {
    rootUri: string;
    defaultFhirVersion?: import("@fhirpath-lab/validator").FhirVersion;
    profileBaseTypes: Record<string, string>;
    customTypeModels: Record<string, import("@fhirpath-lab/validator").TypeModel>;
    modelResourcePaths: readonly string[];
}

export interface EvaluateDocumentRequest {
    uri: string;
    inputText: string;
    input: {uri: string; version: number};
    modelText?: string;
    model?: {uri: string; version: number};
    modelOverrides?: {filePath: string; text: string}[];
    entryGroup?: string;
    terminologyServerUrl?: string;
    terminologyFhirVersion?: "R4" | "R5";
}

export interface DocumentEvaluationResult {
    status: "success" | "failed";
    engine: "local";
    maps?: {uri: string; version?: number}[];
    input?: {uri: string; version: number};
    model?: {uri: string; version: number};
    resultJson?: string;
    outcome?: unknown;
}

export interface LanguageGroupDefinition {
    name: string;
    range: LanguageRange;
}

export interface LanguageGroupReference {
    name: string;
    kind: "extends" | "invocation";
    range: LanguageRange;
}

export interface DocumentGroupSymbols {
    definitions: LanguageGroupDefinition[];
    references: LanguageGroupReference[];
}

export interface DocumentFmlSymbols extends DocumentGroupSymbols {
    canonicalUrls: string[];
    defaultGroups: import("@fhirpath-lab/validator").FmlDefaultGroup[];
    groupSignatures: import("@fhirpath-lab/validator").FmlGroupSignature[];
    imports: string[];
}

export type WorkspaceFileEventType = "create" | "change" | "delete";

export interface WorkspaceFileEvent {
    type: WorkspaceFileEventType;
    uri: string;
}

export interface WorkspaceIndexRequest {
    uris: string[];
    defaultFhirVersion?: import("@fhirpath-lab/validator").FhirVersion;
    profileBaseTypes?: Record<string, string>;
    customTypeModels?: Record<string, import("@fhirpath-lab/validator").TypeModel>;
    modelFiles?: readonly EvaluationModelFile[];
    evaluationContexts?: readonly EvaluationModelContext[];
}

export interface WorkspaceIndexResult {
    canonicalUrlCount: number;
    failedFileCount: number;
    fileCount: number;
    groupCount: number;
    importCount: number;
    durationMs: number;
}

export type FmlServerState = "starting" | "indexing" | "ready" | "error";

export interface WorkspaceIndexFailure {
    uri: string;
    message: string;
    occurredAt: string;
}

export interface FmlServerStatus extends WorkspaceIndexResult {
    state: FmlServerState;
    openDocumentCount: number;
    lastIndexedAt?: string;
    startedAt: string;
    lastError?: string;
}
