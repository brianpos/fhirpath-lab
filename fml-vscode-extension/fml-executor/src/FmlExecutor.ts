import type {
    FmlExecutionOptions,
    FmlExecutionOutput,
    FmlExecutionRequest,
    FmlExecutorResult,
    FmlSource,
    PreparedFmlProgram,
    FmlExecutorConfiguration,
} from "./contracts";
import {analyzeLabFml} from "./LabFmlPreparation";
import {BoundProgram, Invocation, UnsupportedFmlError} from "./runtime";
import {FmlPreparationError, importedSignatures, linkDocuments, waitForService} from "./LinkedPreparation";
import type {FmlPropertyAnalysis} from "@fhirpath-lab/validator";
import type {FmlDocument} from "./LinkedPreparation";

const bindings = new WeakMap<PreparedFmlProgram, BoundProgram>();

export class FmlExecutor {
    public constructor(private readonly configuration: FmlExecutorConfiguration = {}) {}

    public async prepare(source: FmlSource, options: {signal?: AbortSignal} = {}): Promise<FmlExecutorResult<PreparedFmlProgram>> {
        let diagnostics: FmlExecutorResult<PreparedFmlProgram>["diagnostics"] = [];
        try {
            const documents = await linkDocuments(source, this.configuration, options.signal);
            const boundDocuments = new Map<object, BoundProgram>();
            const signatureAnalysis = new Map<FmlDocument, FmlPropertyAnalysis>();
            for (const document of documents) {
                options.signal?.throwIfAborted();
                const configuredSource = {...document.source, ...importedSignatures(document, signatureAnalysis)};
                const analysis = analyzeLabFml(configuredSource, document.model,
                    {semanticErrors: document === documents[0] ? "error" : "warning"});
                diagnostics.push(...analysis.diagnostics);
                if (analysis.status === "failure") return {status: "failure", diagnostics};
                if (analysis.status === "not-implemented") return {...analysis, operation: "prepare", diagnostics};
                const groups = new Map(analysis.value.model.groups.map(group => [group.name, group]));
                if (groups.size !== analysis.value.model.groups.length) throw new Error("Duplicate group definitions.");
                const program: PreparedFmlProgram = {source: configuredSource, analysis: analysis.value, groups};
                boundDocuments.set(document, new BoundProgram(program, this.configuration));
            }
            for (const document of documents) {
                const bound = boundDocuments.get(document)!;
                bound.imports = document.imports.map(imported => boundDocuments.get(imported)!);
            }
            const main = boundDocuments.get(documents[0])!;
            main.bind();
            bindings.set(main.program, main);
            return {status: "success", value: main.program, diagnostics};
        } catch (error) {
            if (error instanceof FmlPreparationError) return {status: "failure", diagnostics: [...diagnostics, ...error.diagnostics]};
            const message = error instanceof Error ? error.message || error.name : String(error) || "FML preparation failed.";
            diagnostics = [...diagnostics, {severity: "error" as const, message, line: 1, column: 0, sourceName: source.sourceName}];
            return error instanceof UnsupportedFmlError
                ? {status: "not-implemented", operation: "prepare", message, diagnostics}
                : {status: "failure", diagnostics};
        }
    }

    public async execute(
        request: FmlExecutionRequest,
        options: FmlExecutionOptions = {},
    ): Promise<FmlExecutorResult<FmlExecutionOutput>> {
        let invocation: Invocation | undefined;
        let traceEnded = false;
        const endTrace = (message?: string): void => {
            traceEnded = true;
            try {
                options.trace?.onEnd?.(message);
            } catch (error) {
                throw new Error(`Trace completion failed: ${error instanceof Error ? error.message : String(error)}`, {cause: error});
            }
        };
        try {
            options.signal?.throwIfAborted();
            for (const [name, limit] of Object.entries(options.limits ?? {})) {
                if (limit !== undefined && (!Number.isSafeInteger(limit) || limit < 0)) {
                    throw new Error(`Execution limit '${name}' must be a non-negative safe integer.`);
                }
            }
            const bound = bindings.get(request.program);
            invocation = bound && new Invocation(bound, request, options);
            if (!invocation) throw new Error("The program was not prepared by an FML executor.");
            const execution = invocation.run();
            let step = execution.next();
            while (!step.done) {
                const value = await waitForService(step.value, options.signal);
                options.signal?.throwIfAborted();
                step = execution.next(value);
            }
            options.signal?.throwIfAborted();
            endTrace();
            return {status: "success", value: {targets: request.targets}, diagnostics: []};
        } catch (error) {
            const message = error instanceof Error ? error.message || error.name : String(error) || "FML execution failed.";
            const site = invocation?.currentSite;
            const diagnostics = [{
                severity: "error" as const, message,
                line: site?.span?.start.line ?? 1, column: site?.span?.start.column ?? 0,
                sourceName: site?.sourceName ?? request.program.source.sourceName,
            }];
            if (!traceEnded) {
                try {
                    endTrace(message);
                } catch (traceError) {
                    diagnostics.push({...diagnostics[0], message: traceError instanceof Error ? traceError.message : String(traceError)});
                }
            }

            return error instanceof UnsupportedFmlError
                ? {status: "not-implemented", operation: "execute", message, diagnostics}
                : {status: "failure", diagnostics};
        }
    }
}
