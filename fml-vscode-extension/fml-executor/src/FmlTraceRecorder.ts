import type {FmlBinding, FmlExecutionFrameView, FmlExecutionTraceObserver, FmlTraceMessage, FmlTraceSite} from "./contracts";
import {cloneFmlValue, stringifyFmlJson} from "./values";

function freezeSnapshot<T>(value: T): T {
    if (value && typeof value === "object" && !Object.isFrozen(value)) {
        Object.freeze(value);
        for (const child of Object.values(value)) freezeSnapshot(child);
    }
    return value;
}

export interface FmlRecordedEvent {
    readonly phase: "enter" | "step" | "exit";
    readonly depth: number;
    readonly site: FmlTraceSite;
    readonly variables: readonly FmlBinding[];
    readonly messages?: readonly FmlTraceMessage[];
}

export function compactFmlTrace(events: readonly FmlRecordedEvent[]): readonly FmlRecordedEvent[] {
    const compacted: FmlRecordedEvent[] = [];
    for (let index = 0; index < events.length; index++) {
        const begin = events[index];
        const end = events[index + 1];
        if (begin.phase === "enter" && end?.phase === "exit" && begin.depth === end.depth
            && sameNonGroupSite(begin.site, end.site)) {
            compacted.push(Object.freeze({
                ...end,
                phase: "step",
                ...(begin.messages?.length
                    ? {messages: Object.freeze([...begin.messages, ...end.messages ?? []])} : {}),
            }));
            index++;
        } else {
            compacted.push(begin);
        }
    }
    return Object.freeze(compacted);
}

function sameNonGroupSite(begin: FmlTraceSite, end: FmlTraceSite): boolean {
    if (!begin.kind || begin.kind === "group" || begin.kind !== end.kind || begin.sourceName !== end.sourceName) return false;
    if (begin.expressionPosition !== undefined || end.expressionPosition !== undefined) {
        return begin.expressionPosition !== undefined && begin.expressionPosition === end.expressionPosition;
    }
    return begin.span !== undefined && end.span !== undefined && begin.name === end.name
        && begin.span.start.line === end.span.start.line && begin.span.start.column === end.span.start.column
        && begin.span.end.line === end.span.end.line && begin.span.end.column === end.span.end.column;
}

export class FmlTraceRecorder implements FmlExecutionTraceObserver {
    private readonly captured: FmlRecordedEvent[] = [];
    private bytes = 0;
    private ended = false;
    private truncated = false;
    private published?: readonly FmlRecordedEvent[];
    public truncationReason?: string;
    public error?: string;

    public constructor(private readonly maxEvents = 10_000, private readonly maxBytes = 8 * 1024 * 1024) {
        if (!Number.isSafeInteger(maxEvents) || maxEvents < 0 || !Number.isSafeInteger(maxBytes) || maxBytes < 0) {
            throw new Error("Trace limits must be non-negative safe integers.");
        }
    }

    public get recording(): boolean { return !this.ended && !this.truncated; }
    public get events(): readonly FmlRecordedEvent[] {
        return this.published ??= Object.freeze([...this.captured]);
    }
    public get status(): "complete" | "truncated" | "stopped" {
        return this.truncated ? "truncated" : this.error !== undefined ? "stopped" : "complete";
    }

    public onEvent(phase: FmlRecordedEvent["phase"], site: FmlTraceSite, frame: FmlExecutionFrameView,
        messages?: FmlRecordedEvent["messages"]): void {
        if (!this.recording) return;
        if (this.captured.length >= this.maxEvents) {
            this.truncated = true;
            this.truncationReason = "Trace event limit reached.";
            return;
        }
        const variables = [...frame.bindings].flatMap<FmlBinding>(([name, bindings]) => bindings.length
            ? bindings.map(binding => ({...binding, name, value: cloneFmlValue(binding.value),
                primitiveMetadata: cloneFmlValue(binding.primitiveMetadata)}))
            : [{name, value: undefined}]);
        const event: FmlRecordedEvent = {phase, site: cloneFmlValue(site) as FmlTraceSite, depth: frame.depth, variables,
            ...(messages ? {messages: messages.map(message => ({name: message.name, text: [...message.text]}))} : {})};
        const bytes = new TextEncoder().encode(stringifyFmlJson(event)).length;
        if (bytes > this.maxBytes - this.bytes) {
            this.truncated = true;
            this.truncationReason = "Trace byte limit reached.";
            return;
        }
        this.bytes += bytes;
        this.captured.push(freezeSnapshot(event));
        this.published = undefined;
    }

    public onEnd(error?: string): void {
        this.error = error;
        this.ended = true;
        this.published = compactFmlTrace(this.captured);
    }

    public onMessage(name: string, values: readonly unknown[], site: FmlTraceSite, frame: FmlExecutionFrameView): void {
        if (!this.recording) return;
        if (this.captured.length >= this.maxEvents) {
            this.truncated = true;
            this.truncationReason = "Trace event limit reached.";
            return;
        }
        this.onEvent("step", site, frame, [{name, text: values.map(value => typeof value === "string" ? value : stringifyFmlJson(value))}]);
    }
}
