import {
    FmlDebugEngineError,
    FmlDebugIssue,
    FmlDebugMapSource,
    FmlDebugService,
    FmlDebugTrace,
    FmlDebugType,
    FmlTraceEvent,
    FmlTraceReplay,
    FmlTraceVariable,
    FmlTypedValue,
    JsonValue,
    childPath,
    createFmlTypedValue,
    formatDebugType,
    parseOperationOutcomeIssues,
} from "@fhirpath-lab/debug-service";
import {
    Breakpoint,
    DebugSession,
    Handles,
    InitializedEvent,
    OutputEvent,
    Scope,
    Source,
    StackFrame,
    StoppedEvent,
    TerminatedEvent,
    Thread,
} from "@vscode/debugadapter";
import {DebugProtocol} from "@vscode/debugprotocol";
import {promises as fs} from "node:fs";
import path from "node:path";
import {resolveFmlDebugDependencies} from "./FmlDebugDependencies";
import type {SushiWorkspaceConfiguration} from "./SushiConfigWatcher";

export interface FmlLaunchRequestArguments extends DebugProtocol.LaunchRequestArguments {
    program: string;
    input: string;
    model?: string;
    dependencies?: string[];
    fhirVersion?: string;
    serverUrl?: string;
    stopOnEntry?: boolean;
    mapText?: string;
}

type VariableContainer =
    | {
        kind: "typed";
        path: string;
        state: FmlTypedValue;
        typeOverride?: string;
        value: JsonValue;
    }
    | {kind: "trace"; event: FmlTraceEvent}
    | {kind: "variables"; variables: FmlTraceVariable[]};

interface LocatedOutcomeIssue {
    issue: FmlDebugIssue;
    event: FmlTraceEvent;
}

const THREAD_ID = 1;

export class FmlDebugSession extends DebugSession {
    private readonly variableHandles = new Handles<VariableContainer>();
    private readonly pendingBreakpointLines = new Set<number>();
    private replay?: FmlTraceReplay;
    private mapSources: FmlDebugMapSource[] = [];
    private sourceText = "";
    private sourcePath = "";
    private lastException?: string;
    private launchAbortController?: AbortController;
    private terminated = false;

    public constructor(
        private readonly debugService = new FmlDebugService(),
        private readonly modelConfigurationProvider: (
            program: string,
        ) => SushiWorkspaceConfiguration | undefined = () => undefined,
        private readonly presentFinalResult: (result: JsonValue) => void = () => undefined,
    ) {
        super();
        this.setDebuggerLinesStartAt1(true);
        this.setDebuggerColumnsStartAt1(true);
    }

    protected override initializeRequest(
        response: DebugProtocol.InitializeResponse,
        _args: DebugProtocol.InitializeRequestArguments,
    ): void {
        response.body = response.body ?? {};
        response.body.supportsConfigurationDoneRequest = true;
        response.body.supportsStepBack = true;
        response.body.supportsTerminateRequest = true;
        response.body.supportsEvaluateForHovers = true;
        response.body.supportsExceptionInfoRequest = true;
        response.body.exceptionBreakpointFilters = [{
            filter: "all",
            label: "All FML execution errors",
            default: true,
        }];
        this.sendResponse(response);
        this.sendEvent(new InitializedEvent());
    }

    protected override async launchRequest(
        response: DebugProtocol.LaunchResponse,
        args: FmlLaunchRequestArguments,
    ): Promise<void> {
        try {
            this.terminated = false;
            this.launchAbortController = new AbortController();
            this.sourcePath = args.program;
            this.sourceText = args.mapText ?? await fs.readFile(args.program, "utf8");
            this.mapSources = [{
                fileName: path.basename(args.program),
                filePath: args.program,
                text: this.sourceText,
            }];
            const inputText = await fs.readFile(args.input, "utf8");
            const modelText = args.model ? await fs.readFile(args.model, "utf8") : undefined;
            const modelConfiguration = this.modelConfigurationProvider(args.program);
            const dependencies = await resolveFmlDebugDependencies(
                args.program,
                this.sourceText,
                args.dependencies ?? [],
                resource => this.sendEvent(new OutputEvent(
                    `Required ${resource.resourceType}: ${resource.canonical}\n`,
                    "console",
                )),
                args.fhirVersion ?? modelConfiguration?.fhirVersion,
                modelConfiguration?.modelResourcePaths,
                (resource, filePath) => this.sendEvent(new OutputEvent(
                    `Resolved ${resource.resourceType}: ${resource.canonical} from ${filePath}\n`,
                    "console",
                )),
            );
            this.mapSources = dependencies.maps;
            for (const resource of dependencies.unresolvedResources) {
                this.sendEvent(new OutputEvent(
                    `Unresolved ${resource.resourceType}: ${resource.canonical}\n`,
                    "stderr",
                ));
            }

            this.sendEvent(new OutputEvent(
                `Starting FML trace using ${args.serverUrl ?? "the configured remote engine"}\n`,
                "console",
            ));
            const trace = await this.debugService.execute({
                mapText: this.sourceText,
                maps: dependencies.maps,
                inputText,
                modelText,
                modelResources: dependencies.modelResources,
                serverUrl: args.serverUrl,
                signal: this.launchAbortController.signal,
            });
            if (this.terminated) {
                return;
            }
            this.startReplay(trace);
            if (trace.result !== undefined) {
                this.presentFinalResult(trace.result.value);
            }
            this.sendResponse(response);

            if (trace.evaluator) {
                this.sendEvent(new OutputEvent(`Evaluator: ${trace.evaluator}\n`, "console"));
            }
            if (this.replay?.currentEvent) {
                if (this.replay.currentEvent.exception) {
                    this.stopAtCurrent("exception");
                } else if (args.stopOnEntry === false) {
                    this.replay.continue();
                    this.stopOrTerminate("breakpoint");
                } else {
                    this.stopAtCurrent("entry");
                }
            } else {
                this.sendEvent(new OutputEvent("FML execution produced no trace events.\n", "console"));
                this.sendEvent(new TerminatedEvent());
            }
        } catch (error) {
            if (this.terminated || isAbortError(error)) {
                return;
            }
            this.startExceptionReplay(error);
            this.sendResponse(response);
            this.stopAtCurrent("exception");
        } finally {
            this.launchAbortController = undefined;
        }
    }

    protected override setBreakPointsRequest(
        response: DebugProtocol.SetBreakpointsResponse,
        args: DebugProtocol.SetBreakpointsArguments,
    ): void {
        const lines = (args.breakpoints ?? []).map(breakpoint => breakpoint.line);
        this.pendingBreakpointLines.clear();
        lines.forEach(line => this.pendingBreakpointLines.add(line));

        const results = this.replay
            ? this.replay.setBreakpoints(lines)
            : lines.map(line => ({line, verified: false}));
        response.body = {
            breakpoints: results.map((result, index) => {
                const breakpoint = new Breakpoint(result.verified, result.line);
                breakpoint.setId(index + 1);
                return breakpoint;
            }),
        };
        this.sendResponse(response);
    }

    protected override setExceptionBreakPointsRequest(
        response: DebugProtocol.SetExceptionBreakpointsResponse,
        _args: DebugProtocol.SetExceptionBreakpointsArguments,
    ): void {
        this.sendResponse(response);
    }

    protected override configurationDoneRequest(
        response: DebugProtocol.ConfigurationDoneResponse,
        _args: DebugProtocol.ConfigurationDoneArguments,
    ): void {
        this.sendResponse(response);
    }

    protected override threadsRequest(response: DebugProtocol.ThreadsResponse): void {
        response.body = {threads: [new Thread(THREAD_ID, "FML trace replay")]};
        this.sendResponse(response);
    }

    protected override stackTraceRequest(
        response: DebugProtocol.StackTraceResponse,
        _args: DebugProtocol.StackTraceArguments,
    ): void {
        const frames = this.getStackEvents().map(event => {
            const source = event.source ?? this.mapSources[0] ?? {
                filePath: this.sourcePath,
                text: this.sourceText,
            };
            const sourcePath = source.filePath ?? source.fileName ?? this.sourcePath;
            const frame = new StackFrame(
                event.index + 1,
                event.message || event.category,
                new Source(path.basename(sourcePath), sourcePath),
                this.replay?.getEventLine(event) ?? 1,
                this.replay?.getEventColumn(event) ?? 1,
            );
            const end = this.positionAt(
                (event.range?.startOffset ?? 0) + Math.max(event.range?.length ?? 1, 1),
                source.text,
            );
            frame.endLine = end.line;
            frame.endColumn = end.column;
            return frame;
        });
        response.body = {
            stackFrames: frames,
            totalFrames: frames.length,
        };
        this.sendResponse(response);
    }

    protected override scopesRequest(
        response: DebugProtocol.ScopesResponse,
        args: DebugProtocol.ScopesArguments,
    ): void {
        this.variableHandles.reset();
        const scopes: Scope[] = [];
        const frameEvent = this.eventForFrame(args.frameId);
        if (frameEvent) {
            scopes.push(new Scope(
                "FML variables",
                this.variableHandles.create({kind: "variables", variables: frameEvent.variables}),
                false,
            ));
            scopes.push(new Scope(
                "Trace event",
                this.variableHandles.create({kind: "trace", event: frameEvent}),
                false,
            ));
        }
        if (this.replay) {
            if (this.replay.trace.result !== undefined) {
                scopes.push(new Scope(
                    scopeName("Final result", this.replay.trace.result),
                    this.createTypedHandle(this.replay.trace.result),
                    true,
                ));
            }
        }
        response.body = {scopes};
        this.sendResponse(response);
    }

    protected override variablesRequest(
        response: DebugProtocol.VariablesResponse,
        args: DebugProtocol.VariablesArguments,
    ): void {
        const container = this.variableHandles.get(args.variablesReference);
        response.body = {
            variables: container ? this.variablesForContainer(container) : [],
        };
        this.sendResponse(response);
    }

    protected override evaluateRequest(
        response: DebugProtocol.EvaluateResponse,
        args: DebugProtocol.EvaluateArguments,
    ): void {
        const frameEvent = args.frameId !== undefined
            ? this.eventForFrame(args.frameId)
            : this.replay?.currentEvent;
        const evaluated = this.evaluateExpression(args.expression, frameEvent);
        if (!evaluated) {
            this.sendErrorResponse(response, 2001, `Unable to resolve watch expression '${args.expression}'.`);
            return;
        }
        response.body = {
            result: displayValue(evaluated.value, evaluated.type, evaluated.typeOverride),
            type: evaluated.typeOverride ?? formatDebugType(evaluated.type),
            variablesReference: isExpandable(evaluated.value) && evaluated.state
                ? this.variableHandles.create({
                    kind: "typed",
                    state: evaluated.state,
                    value: evaluated.value,
                    path: evaluated.path,
                    typeOverride: evaluated.typeOverride,
                })
                : 0,
        };
        this.sendResponse(response);
    }

    protected override continueRequest(
        response: DebugProtocol.ContinueResponse,
        _args: DebugProtocol.ContinueArguments,
    ): void {
        this.sendResponse(response);
        this.replay?.continue();
        this.stopOrTerminate("breakpoint");
    }

    protected override nextRequest(
        response: DebugProtocol.NextResponse,
        _args: DebugProtocol.NextArguments,
    ): void {
        this.sendResponse(response);
        this.replay?.next();
        this.stopOrTerminate("step");
    }

    protected override stepInRequest(
        response: DebugProtocol.StepInResponse,
        _args: DebugProtocol.StepInArguments,
    ): void {
        this.sendResponse(response);
        this.replay?.stepIn();
        this.stopOrTerminate("step");
    }

    protected override stepOutRequest(
        response: DebugProtocol.StepOutResponse,
        _args: DebugProtocol.StepOutArguments,
    ): void {
        this.sendResponse(response);
        this.replay?.stepOut();
        this.stopOrTerminate("step");
    }

    protected override stepBackRequest(
        response: DebugProtocol.StepBackResponse,
        _args: DebugProtocol.StepBackArguments,
    ): void {
        this.sendResponse(response);
        this.replay?.stepBack();
        this.stopOrTerminate("step");
    }

    protected override reverseContinueRequest(
        response: DebugProtocol.ReverseContinueResponse,
        _args: DebugProtocol.ReverseContinueArguments,
    ): void {
        this.sendResponse(response);
        this.replay?.reverseContinue();
        const reason = this.replay?.hasBreakpointAtCurrentEvent()
            ? "breakpoint"
            : this.replay?.currentIndex === 0
                ? "entry"
                : "step";
        this.stopOrTerminate(reason);
    }

    protected override exceptionInfoRequest(
        response: DebugProtocol.ExceptionInfoResponse,
        _args: DebugProtocol.ExceptionInfoArguments,
    ): void {
        response.body = {
            exceptionId: "FML execution error",
            description: this.replay?.currentEvent?.exception ?? this.lastException,
            breakMode: "always",
        };
        this.sendResponse(response);
    }

    protected override terminateRequest(
        response: DebugProtocol.TerminateResponse,
        _args: DebugProtocol.TerminateArguments,
    ): void {
        this.terminated = true;
        this.launchAbortController?.abort();
        this.sendResponse(response);
        this.sendEvent(new TerminatedEvent());
    }

    protected override disconnectRequest(
        response: DebugProtocol.DisconnectResponse,
        _args: DebugProtocol.DisconnectArguments,
    ): void {
        this.terminated = true;
        this.launchAbortController?.abort();
        this.sendResponse(response);
    }

    private startReplay(trace: FmlDebugTrace, fallbackException?: string): void {
        const issues = parseOperationOutcomeIssues(trace.outcome);
        const locatedIssues: LocatedOutcomeIssue[] = issues.map((issue, index) => ({
            issue,
            event: this.createOutcomeIssueEvent(issue, index),
        }));
        if (locatedIssues.length > 0) {
            this.reportOutcomeIssues(locatedIssues);
        }
        const errorEvents = locatedIssues
            .filter(({issue}) => issue.severity === "fatal" || issue.severity === "error")
            .map(({event}, index) => ({...event, index}));
        const replayTrace = trace.trace.length > 0
            ? trace
            : errorEvents.length > 0
                ? {...trace, trace: errorEvents}
                : fallbackException
                    ? {...trace, trace: [this.createFallbackExceptionEvent(fallbackException)]}
                    : trace;
        this.lastException = replayTrace.trace.find(event => event.exception)?.exception
            ?? fallbackException;
        this.replay = new FmlTraceReplay(replayTrace, this.sourceText);
        if (this.pendingBreakpointLines.size > 0) {
            this.replay.setBreakpoints([...this.pendingBreakpointLines]);
        }
    }

    private startExceptionReplay(error: unknown): void {
        const message = error instanceof Error ? error.message : String(error);
        const outcome = error instanceof FmlDebugEngineError ? error.outcome : undefined;
        this.startReplay({
            initialState: createFmlTypedValue({}),
            outcome,
            trace: [],
        }, message);
    }

    private createFallbackExceptionEvent(message: string): FmlTraceEvent {
        return {
            index: 0,
            name: "exception",
            category: "exception",
            message,
            depth: 0,
            variables: [],
            exception: message,
        };
    }

    private createOutcomeIssueEvent(issue: FmlDebugIssue, index: number): FmlTraceEvent {
        const source = this.resolveIssueSource(issue.fileName);
        const range = source && issue.line !== undefined && issue.column !== undefined
            ? nearestTokenRange(source.text, issue.line, issue.column)
            : undefined;
        return {
            index,
            name: "exception",
            category: "outcome",
            message: issue.message,
            depth: 0,
            variables: [],
            exception: issue.message,
            ...(range ? {range} : {}),
            ...(source ? {source} : {}),
        };
    }

    private resolveIssueSource(fileName: string | undefined): FmlDebugMapSource | undefined {
        if (!fileName) {
            return this.mapSources[0];
        }
        const identity = diagnosticFileIdentity(fileName);
        const exact = this.mapSources.find(source => {
            return source.fileName !== undefined && diagnosticFileIdentity(source.fileName) === identity;
        });
        if (exact) {
            return exact;
        }
        const baseName = diagnosticFileBaseName(identity);
        const matchingBaseNames = this.mapSources.filter(source => {
            return source.fileName !== undefined
                && diagnosticFileBaseName(diagnosticFileIdentity(source.fileName)) === baseName;
        });
        return matchingBaseNames.length === 1 ? matchingBaseNames[0] : undefined;
    }

    private reportOutcomeIssues(
        locatedIssues: LocatedOutcomeIssue[],
    ): void {
        this.sendEvent(new OutputEvent(
            `FML execution returned ${locatedIssues.length} OperationOutcome issue${locatedIssues.length === 1 ? "" : "s"}:\n`,
            "stderr",
        ));
        locatedIssues.forEach(({issue, event}, index) => {
            const source = event.source;
            const position = source && event.range
                ? this.positionAt(event.range.startOffset, source.text)
                : undefined;
            const sourceName = source?.fileName ?? issue.fileName;
            const location = sourceName && position
                ? `${sourceName}:${position.line}:${position.column}: `
                : sourceName
                    ? `${sourceName}: `
                    : "";
            const output = new OutputEvent(
                `[${index + 1}/${locatedIssues.length}] ${location}${issue.severity ?? "issue"}: ${issue.message}\n`,
                issue.severity === "fatal" || issue.severity === "error" ? "stderr" : "console",
            );
            if (source && position) {
                const sourcePath = source.filePath ?? source.fileName;
                if (sourcePath) {
                    const outputBody = output.body as DebugProtocol.OutputEvent["body"];
                    outputBody.source = new Source(path.basename(sourcePath), sourcePath);
                    outputBody.line = position.line;
                    outputBody.column = position.column;
                }
            }
            this.sendEvent(output);
        });
    }

    private stopOrTerminate(reason: string): void {
        if (this.replay?.currentEvent) {
            this.stopAtCurrent(this.replay.currentEvent.exception ? "exception" : reason);
        } else {
            this.sendEvent(new OutputEvent("End of FML trace.\n", "console"));
            this.sendEvent(new TerminatedEvent());
        }
    }

    private stopAtCurrent(reason: string): void {
        const event = this.replay?.currentEvent;
        if (!event) {
            this.sendEvent(new TerminatedEvent());
            return;
        }
        this.variableHandles.reset();
        const category = event.exception ? "stderr" : event.category === "debug" ? "console" : "stdout";
        if (event.category !== "outcome") {
            this.sendEvent(new OutputEvent(`[${event.index}] ${event.message}\n`, category));
        }
        this.sendEvent(new StoppedEvent(reason, THREAD_ID, event.exception));
    }

    private getStackEvents(): FmlTraceEvent[] {
        const current = this.replay?.currentEvent;
        if (!current || !this.replay) {
            return [];
        }
        const frames: FmlTraceEvent[] = [current];
        let nextDepth = current.depth - 1;
        for (let index = current.index - 1; index >= 0 && nextDepth >= 0; index--) {
            const event = this.replay.trace.trace[index];
            if (event.depth <= nextDepth) {
                frames.push(event);
                nextDepth = event.depth - 1;
            }
        }
        return frames;
    }

    private eventForFrame(frameId: number): FmlTraceEvent | undefined {
        return this.replay?.trace.trace.find(event => event.index + 1 === frameId);
    }

    private variablesForContainer(container: VariableContainer): DebugProtocol.Variable[] {
        if (container.kind === "variables") {
            return container.variables.map(variable => {
                const typedValue = variable.data;
                const type = typedValue?.types["$"];
                return {
                    name: variable.name,
                    value: typedValue
                        ? displayValue(typedValue.value, type, variable.datatype)
                        : variable.errorMessage
                            ? `<unavailable: ${variable.errorMessage}>`
                            : variable.path,
                    type: variable.datatype
                        ?? formatDebugType(type)
                        ?? variable.mode,
                    variablesReference: typedValue && isExpandable(typedValue.value)
                        ? this.createTypedHandle(
                            typedValue,
                            variable.datatype,
                        )
                        : 0,
                    evaluateName: variable.name,
                };
            });
        }
        if (container.kind === "trace") {
            return [
                simpleVariable("category", container.event.category),
                simpleVariable("message", container.event.message),
                simpleVariable("depth", container.event.depth),
                simpleVariable("traceIndex", container.event.index),
            ];
        }
        return variablesForTypedValue(container, this.variableHandles);
    }

    private evaluateExpression(
        expression: string,
        event: FmlTraceEvent | undefined,
    ): EvaluatedValue | undefined {
        const trimmed = expression.trim();
        const eventVariable = event?.variables.find(variable => {
            return trimmed === variable.name
                || trimmed.startsWith(`${variable.name}.`)
                || trimmed.startsWith(`${variable.name}[`);
        });
        if (eventVariable) {
            if (eventVariable.data) {
                const parsedPath = parseDebugPath(trimmed.slice(eventVariable.name.length));
                const resolved = parsedPath
                    ? resolveTypedPath(eventVariable.data, parsedPath)
                    : undefined;
                if (!resolved) {
                    return undefined;
                }
                return {
                    state: eventVariable.data,
                    value: resolved.value,
                    path: resolved.path,
                    type: eventVariable.data.types[resolved.path],
                    typeOverride: resolved.path === "$" ? eventVariable.datatype : undefined,
                };
            }
            if (trimmed !== eventVariable.name) {
                return undefined;
            }
            return {
                value: eventVariable.path,
                path: "$",
                typeOverride: eventVariable.datatype ?? eventVariable.mode,
            };
        }
        const useResult = trimmed === "$result" || trimmed.startsWith("$result.");
        const state = useResult
            ? this.replay?.trace.result
            : this.replay?.currentState;
        if (!state) {
            return undefined;
        }
        const pathSegments = trimmed
            .replace(useResult ? /^\$result\.?/ : /^\$(?:state)?\.?/, "");
        const parsedPath = parseDebugPath(pathSegments);
        if (!parsedPath) {
            return undefined;
        }
        const resolved = resolveTypedPath(state, parsedPath);
        return resolved
            ? {
                state,
                value: resolved.value,
                path: resolved.path,
                type: state.types[resolved.path],
            }
            : undefined;
    }

    private positionAt(offset: number, sourceText = this.sourceText): {line: number; column: number} {
        const boundedOffset = Math.min(Math.max(offset, 0), sourceText.length);
        const prefix = sourceText.slice(0, boundedOffset);
        const lines = prefix.split(/\r?\n/);
        return {
            line: lines.length,
            column: (lines.at(-1)?.length ?? 0) + 1,
        };
    }

    private createTypedHandle(state: FmlTypedValue, typeOverride?: string): number {
        return this.variableHandles.create({
            kind: "typed",
            state,
            value: state.value,
            path: "$",
            typeOverride,
        });
    }
}

export function nearestTokenRange(
    sourceText: string,
    oneBasedLine: number,
    oneBasedColumn: number,
): {startOffset: number; length: number} | undefined {
    if (!Number.isInteger(oneBasedLine) || !Number.isInteger(oneBasedColumn)
        || oneBasedLine < 1 || oneBasedColumn < 1) {
        return undefined;
    }
    const lines = [...sourceText.matchAll(/.*(?:\r\n|\r|\n|$)/g)]
        .filter(match => match[0].length > 0 || match.index === 0);
    const lineMatch = lines[oneBasedLine - 1];
    if (!lineMatch || lineMatch.index === undefined) {
        return undefined;
    }
    const lineText = lineMatch[0].replace(/(?:\r\n|\r|\n)$/, "");
    const requestedColumn = Math.min(oneBasedColumn - 1, lineText.length);
    const tokens = [...lineText.matchAll(
        /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:``|[^`])*`|[A-Za-z_][A-Za-z0-9_-]*|\d+(?:\.\d+)*|->|<<|>>|!=|<=|>=|:=|[^\s]/g,
    )];
    if (tokens.length === 0) {
        return {startOffset: lineMatch.index + requestedColumn, length: 1};
    }
    const nearest = tokens.reduce((selected, candidate) => {
        return tokenDistance(candidate, requestedColumn) < tokenDistance(selected, requestedColumn)
            ? candidate
            : selected;
    });
    return {
        startOffset: lineMatch.index + (nearest.index ?? requestedColumn),
        length: nearest[0].length,
    };
}

function tokenDistance(token: RegExpMatchArray, column: number): number {
    const start = token.index ?? 0;
    const end = start + token[0].length;
    if (column >= start && column < end) {
        return 0;
    }
    return Math.min(Math.abs(column - start), Math.abs(column - Math.max(end - 1, start)));
}

function diagnosticFileIdentity(fileName: string): string {
    const normalized = fileName.replaceAll("\\", "/");
    return process.platform === "win32" ? normalized.toLowerCase() : normalized;
}

function diagnosticFileBaseName(fileName: string): string {
    return fileName.split("/").at(-1) ?? fileName;
}

interface EvaluatedValue {
    value: JsonValue;
    path: string;
    state?: FmlTypedValue;
    type?: FmlDebugType;
    typeOverride?: string;
}

function variablesForTypedValue(
    container: Extract<VariableContainer, {kind: "typed"}>,
    handles: Handles<VariableContainer>,
): DebugProtocol.Variable[] {
    const {value} = container;
    if (Array.isArray(value)) {
        return value.map((child, index) => typedVariable(
            String(index),
            child,
            childPath(container.path, index),
            container.state,
            handles,
        ));
    }
    if (value && typeof value === "object") {
        return Object.entries(value).map(([name, child]) => typedVariable(
            name,
            child,
            childPath(container.path, name),
            container.state,
            handles,
        ));
    }
    return [];
}

function typedVariable(
    name: string,
    value: JsonValue,
    valuePath: string,
    state: FmlTypedValue,
    handles: Handles<VariableContainer>,
): DebugProtocol.Variable {
    const type = state.types[valuePath];
    return {
        name,
        value: displayValue(value, type),
        type: formatDebugType(type),
        variablesReference: isExpandable(value)
            ? handles.create({
                kind: "typed",
                state,
                value,
                path: valuePath,
            })
            : 0,
    };
}

function simpleVariable(name: string, value: string | number): DebugProtocol.Variable {
    return {
        name,
        value: String(value),
        type: typeof value === "number" ? "integer" : "string",
        variablesReference: 0,
    };
}

function displayValue(
    value: JsonValue,
    type?: FmlDebugType,
    typeOverride?: string,
): string {
    if (typeof value === "string") {
        return value;
    }
    if (value === null || typeof value !== "object") {
        return String(value);
    }
    const typeName = typeOverride ?? type?.name ?? "value";
    return Array.isArray(value)
        ? `${typeName}[${value.length}]`
        : typeName;
}

function isExpandable(value: JsonValue): boolean {
    return typeof value === "object" && value !== null;
}

function scopeName(label: string, state: FmlTypedValue): string {
    const type = formatDebugType(state.types["$"]);
    return type ? `${label} (${type})` : label;
}

function resolveTypedPath(
    state: FmlTypedValue,
    segments: Array<string | number>,
): {path: string; value: JsonValue} | undefined {
    let current: JsonValue | undefined = state.value;
    let currentPath = "$";
    for (const segment of segments) {
        if (Array.isArray(current)) {
            if (typeof segment !== "number") {
                return undefined;
            }
            current = current[segment];
            currentPath = childPath(currentPath, segment);
        } else if (current && typeof current === "object") {
            if (typeof segment !== "string") {
                return undefined;
            }
            current = current[segment];
            currentPath = childPath(currentPath, segment);
        } else {
            return undefined;
        }
    }
    return current === undefined
        ? undefined
        : {path: currentPath, value: current};
}

function parseDebugPath(value: string): Array<string | number> | undefined {
    if (!value) {
        return [];
    }
    const segments: Array<string | number> = [];
    let index = 0;
    while (index < value.length) {
        if (value[index] === ".") {
            index++;
            continue;
        }
        if (value[index] === "[") {
            const close = value.indexOf("]", index + 1);
            if (close < 0) {
                return undefined;
            }
            const content = value.slice(index + 1, close);
            if (/^\d+$/.test(content)) {
                segments.push(Number.parseInt(content, 10));
            } else if (
                (content.startsWith("\"") && content.endsWith("\""))
                || (content.startsWith("'") && content.endsWith("'"))
            ) {
                const quote = content[0];
                const property = content.slice(1, -1)
                    .replace(new RegExp(`\\\\${quote}`, "g"), quote)
                    .replace(/\\\\/g, "\\");
                segments.push(property);
            } else {
                return undefined;
            }
            index = close + 1;
            continue;
        }
        const match = value.slice(index).match(/^[A-Za-z_][A-Za-z0-9_]*/);
        if (!match) {
            return undefined;
        }
        segments.push(match[0]);
        index += match[0].length;
    }
    return segments;
}

function isAbortError(error: unknown): boolean {
    return error instanceof Error && error.name === "AbortError";
}
