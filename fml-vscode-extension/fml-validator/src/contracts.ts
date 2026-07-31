export type JsonPrimitive = boolean | number | string | null;

export type JsonValue = JsonPrimitive | JsonValue[] | {
    [key: string]: JsonValue;
};

export type FmlValidatorOperation =
    | "compile"
    | "load-package"
    | "reset"
    | "transform"
    | "validate-semantics";

export interface FmlSource {
    sourceText: string;
    sourceName?: string;
}

export interface FmlDiagnostic {
    severity: "error" | "warning";
    message: string;
    line: number;
    column: number;
    sourceName?: string;
    offendingText?: string;
}

export interface SuccessfulResult<T> {
    status: "success";
    value: T;
    diagnostics: FmlDiagnostic[];
}

export interface FailedResult {
    status: "failure";
    diagnostics: FmlDiagnostic[];
}

export interface NotImplementedResult {
    status: "not-implemented";
    operation: FmlValidatorOperation;
    message: string;
    diagnostics: FmlDiagnostic[];
}

export type FmlValidatorResult<T> =
    | SuccessfulResult<T>
    | FailedResult
    | NotImplementedResult;

export interface ParsedFml {
    sourceName?: string;
    entryRule: "structureMap";
}

export interface FmlSourcePosition {
    line: number;
    column: number;
}

export interface FmlSourceSpan {
    start: FmlSourcePosition;
    end: FmlSourcePosition;
}

export interface FmlGroupDefinition {
    name: string;
    span: FmlSourceSpan;
}

export interface FmlGroupReference {
    name: string;
    kind: "extends" | "invocation";
    span: FmlSourceSpan;
}

export interface FmlGroupSymbols {
    definitions: FmlGroupDefinition[];
    references: FmlGroupReference[];
}

export interface FmlDocumentSymbols extends FmlGroupSymbols {
    canonicalUrls: string[];
    imports: string[];
}

export interface CompiledStructureMap {
    resource: {
        resourceType: "StructureMap";
        [key: string]: JsonValue;
    };
}

export interface SemanticValidationRequest {
    structureMap: CompiledStructureMap;
}

export interface SemanticValidationReport {
    diagnostics: FmlDiagnostic[];
}

export interface TransformRequest {
    structureMap: CompiledStructureMap;
    input: JsonValue;
}

export interface TransformOutput {
    output: JsonValue;
}

export interface PackageLoadRequest {
    name: string;
    content: Uint8Array;
}

export interface LoadedPackage {
    name: string;
}
