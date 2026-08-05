import type {FmlStructureMap} from "../../../helpers/fml_models";
import type {StructureMap} from "fhir/r4b";

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
    defaultFhirVersion?: import("../../../helpers/fml_models").FhirVersion;
    profileBaseTypes?: Record<string, string>;
}

export interface FmlDiagnostic {
    severity: "error" | "warning" | "information";
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
    model: FmlStructureMap;
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

export interface FmlPropertyUsage {
    groupName: string;
    path: string;
    role: "source" | "target";
    rootTypeName: string;
    rootVariableName: string;
    variableName?: string;
    fhirVersion?: import("../../../helpers/fml_models").FhirVersion;
    span: FmlSourceSpan;
    isCollection?: boolean;
    cardinalityMin?: 0 | 1;
    cardinalityMax?: "1" | "*";
    targetProfiles?: string[];
    specificationPath?: string;
    elementTypeName?: string;
    possibleTypeNames?: string[];
    compatibleTypeNames?: string[];
    excludedTypeNames?: string[];
    unknownElement?: boolean;
    validationError?: string;
    transformName?: string;
    transformSpan?: FmlSourceSpan;
    transformResultTypeNames?: string[];
    transformResultSpan?: FmlSourceSpan;
    transformResultText?: string;
}

export interface FmlGroupInputResolution {
    groupName: string;
    inputName: string;
    span: FmlSourceSpan;
    typeName?: string;
    fhirVersion?: import("../../../helpers/fml_models").FhirVersion;
    resolution: "declared" | "context" | "unresolved" | "conflict";
    conflictingTypeNames?: string[];
}

export interface FmlPropertyAnalysis {
    usages: FmlPropertyUsage[];
    groupInputs: FmlGroupInputResolution[];
}

export interface FmlPropertyCompletion {
    name: string;
    typeNames: string[];
    cardinalityMin: 0 | 1;
    cardinalityMax: "1" | "*";
    targetProfiles?: string[];
    fhirVersion?: import("../../../helpers/fml_models").FhirVersion;
}

export interface CompiledStructureMap {
    resource: StructureMap;
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
