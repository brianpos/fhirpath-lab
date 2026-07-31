import {FmlDebugTrace, FmlTraceEvent, FmlTypedValue} from "./contracts";

export class FmlTraceReplay {
    private cursor = 0;
    private readonly breakpointLines = new Set<number>();

    public constructor(
        public readonly trace: FmlDebugTrace,
        private readonly sourceText: string,
    ) {
        this.cursor = trace.trace.length > 0 ? 0 : -1;
    }

    public get currentIndex(): number {
        return this.cursor;
    }

    public get currentEvent(): FmlTraceEvent | undefined {
        return this.trace.trace[this.cursor];
    }

    public get currentState(): FmlTypedValue {
        if (this.cursor <= 0) {
            return this.trace.initialState;
        }
        for (let index = this.cursor - 1; index >= 0; index--) {
            const state = this.trace.trace[index].state;
            if (state !== undefined) {
                return state;
            }
        }
        return this.trace.initialState;
    }

    public setBreakpoints(lines: number[]): {line: number; verified: boolean}[] {
        this.breakpointLines.clear();
        const executableLines = new Set(this.trace.trace.map(event => this.getEventLine(event)));
        const result = lines.map(line => ({
            line,
            verified: executableLines.has(line),
        }));
        for (const breakpoint of result) {
            if (breakpoint.verified) {
                this.breakpointLines.add(breakpoint.line);
            }
        }
        return result;
    }

    public stepIn(): FmlTraceEvent | undefined {
        return this.moveTo(Math.min(this.cursor + 1, this.trace.trace.length));
    }

    public next(): FmlTraceEvent | undefined {
        const depth = this.currentEvent?.depth ?? 0;
        return this.moveForward(event => event.depth <= depth, true);
    }

    public stepOut(): FmlTraceEvent | undefined {
        const depth = this.currentEvent?.depth ?? 0;
        return this.moveForward(event => event.depth < depth, true);
    }

    public continue(): FmlTraceEvent | undefined {
        return this.moveForward(event => {
            const line = this.getEventLine(event);
            return this.breakpointLines.has(line) || Boolean(event.exception);
        }, true);
    }

    public stepBack(): FmlTraceEvent | undefined {
        return this.moveTo(Math.max(this.cursor - 1, 0));
    }

    public reverseContinue(): FmlTraceEvent | undefined {
        for (let index = this.cursor - 1; index >= 0; index--) {
            const event = this.trace.trace[index];
            const line = this.getEventLine(event);
            if (this.breakpointLines.has(line) || event.exception || index === 0) {
                return this.moveTo(index);
            }
        }
        return this.moveTo(0);
    }

    public getEventLine(event: FmlTraceEvent): number {
        const offset = Math.max(event.range?.startOffset ?? 0, 0);
        return this.sourceText.slice(0, offset).split(/\r?\n/).length;
    }

    public getEventColumn(event: FmlTraceEvent): number {
        const offset = Math.max(event.range?.startOffset ?? 0, 0);
        const prefix = this.sourceText.slice(0, offset);
        const lineStart = Math.max(prefix.lastIndexOf("\n"), prefix.lastIndexOf("\r")) + 1;
        return offset - lineStart + 1;
    }

    public hasBreakpointAtCurrentEvent(): boolean {
        const event = this.currentEvent;
        return event ? this.breakpointLines.has(this.getEventLine(event)) : false;
    }

    public getStateBeforeEvent(eventIndex: number): FmlTypedValue {
        if (eventIndex <= 0) {
            return this.trace.initialState;
        }
        for (let index = Math.min(eventIndex - 1, this.trace.trace.length - 1); index >= 0; index--) {
            const state = this.trace.trace[index].state;
            if (state !== undefined) {
                return state;
            }
        }
        return this.trace.initialState;
    }

    private moveForward(
        predicate: (event: FmlTraceEvent) => boolean,
        terminateWhenNotFound = false,
    ): FmlTraceEvent | undefined {
        for (let index = this.cursor + 1; index < this.trace.trace.length; index++) {
            const event = this.trace.trace[index];
            if (predicate(event)) {
                return this.moveTo(index);
            }
        }
        return terminateWhenNotFound
            ? this.moveTo(this.trace.trace.length)
            : this.moveTo(Math.min(this.cursor + 1, this.trace.trace.length));
    }

    private moveTo(index: number): FmlTraceEvent | undefined {
        this.cursor = index;
        return this.currentEvent;
    }
}
