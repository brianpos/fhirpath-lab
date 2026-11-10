import type {
    AnalyzedFml,
    FhirVersion,
    FmlDiagnostic,
    FmlSource,
    FmlSourceSpan,
    GroupDeclaration,
} from "@fhirpath-lab/validator";
import type {Model, Options} from "fhirpath";

export type {AnalyzedFml, FhirVersion, FmlDiagnostic, FmlSource};

export interface PreparedFmlProgram {
    readonly source: FmlSource;
    readonly analysis: AnalyzedFml;
    readonly groups: ReadonlyMap<string, GroupDeclaration>;
}

export interface FmlBinding {
    readonly name: string;
    readonly value: unknown;
    readonly typeName?: string;
    readonly fhirVersion?: FhirVersion;
    readonly primitiveMetadata?: unknown;
    readonly mode?: "source" | "target";
}

export interface FmlExecutionRequest {
    readonly program: PreparedFmlProgram;
    readonly entryGroup?: string;
    readonly sources: readonly FmlBinding[];
    readonly targets: readonly FmlBinding[];
}

export interface FmlExecutionLimits {
    /** Group/rule nesting; defaults to 128. All limits must be non-negative safe integers. */
    readonly maxDepth?: number;
    /** Checked execution operations, including input/target graph inspection; defaults to 1,000,000. */
    readonly maxWork?: number;
    /** Copied value/container nodes and primitive metadata; defaults to 1,000,000. */
    readonly maxOutputNodes?: number;
}

export interface FmlExecutionOptions {
    readonly signal?: AbortSignal;
    readonly limits?: FmlExecutionLimits;
    readonly trace?: FmlExecutionTraceObserver;
    /** Rules capture retains group/rule events and messages, omitting source/target instrumentation. */
    readonly traceDetail?: "full" | "rules" | "coverage";
    readonly fhirPath?: Pick<Options, "terminologyUrl" | "httpHeaders">;
    readonly translate?: (
        /** Detached from input/target graphs; host mutation cannot modify the invocation's input. */
        source: FmlBinding,
        canonical: string,
        outputType: string,
        signal?: AbortSignal,
    ) => Promise<readonly FmlBinding[]>;
    readonly uuid?: () => string;
    readonly log?: (name: string, values: readonly unknown[]) => void;
    readonly reference?: (resource: FmlBinding) => string;
    /** `origin` says where in the map the resolve() call was made, and whether it reads source or target data. */
    readonly resolve?: (reference: string, signal?: AbortSignal, origin?: FmlResolveOrigin) => Promise<unknown | undefined>;
}

export interface FmlExecutorConfiguration {
    readonly fhirPathModels?: Partial<Record<FhirVersion, Model>>;
    readonly maps?: readonly FmlSource[];
    readonly loadMaps?: (canonicalPattern: string, definingSource: FmlSource, signal?: AbortSignal) => Promise<readonly FmlSource[]>;
}

export interface FmlTraceSite {
    readonly sourceName?: string;
    readonly span?: FmlSourceSpan;
    readonly name?: string;
    readonly kind?: "group" | "rule" | "source" | "target";
    /** Structured source identity, not an event sequence or runtime object ID. */
    readonly expressionPosition?: string;
}

export interface FmlResolveOrigin {
    /** "source" when the focus came from a source variable, "target" for a target variable, else "unknown". */
    readonly mode: "source" | "target" | "unknown";
    /** The mapping variable holding the focus of the expression, when identifiable. */
    readonly variable?: string;
    readonly expression: string;
    /** Mapping variables referenced by the expression, with whether each is a source or target. */
    readonly variables: readonly {name: string; mode: "source" | "target"}[];
    /** Map location (source name and span) of the rule element being executed. */
    readonly site: FmlTraceSite;
    /** Name of the rule being executed, if any. */
    readonly rule?: string;
}

export interface FmlExecutionFrameView {
    readonly depth: number;
    readonly bindings: ReadonlyMap<string, readonly FmlBinding[]>;
}

export interface FmlTraceMessage {
    readonly name: string;
    readonly text: readonly string[];
}

export interface FmlExecutionTraceObserver {
    readonly recording: boolean;
    onEvent(
        phase: "enter" | "step" | "exit",
        site: FmlTraceSite,
        frame: FmlExecutionFrameView,
        messages?: readonly FmlTraceMessage[],
    ): void;
    onMessage?(name: string, values: readonly unknown[], site: FmlTraceSite, frame: FmlExecutionFrameView): void;
    /** Called once per invocation, including failures; instrumentation errors remain explicit. */
    onEnd?(error?: string): void;
}

export type FmlExecutorResult<T> = {
    status: "success";
    value: T;
    diagnostics: FmlDiagnostic[];
} | {
    status: "failure";
    diagnostics: FmlDiagnostic[];
} | {
    status: "not-implemented";
    operation: "prepare" | "execute";
    message: string;
    diagnostics: FmlDiagnostic[];
};

export interface FmlExecutionOutput {
    targets: readonly FmlBinding[];
}
