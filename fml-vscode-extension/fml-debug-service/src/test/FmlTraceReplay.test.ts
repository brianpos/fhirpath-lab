import assert from "node:assert/strict";
import test from "node:test";
import {FmlDebugTrace} from "../contracts";
import {FmlTraceReplay} from "../FmlTraceReplay";
import {createFmlTypedValue} from "../FmlTypedValue";

const sourceText = [
    "group Main(source src, target tgt) {",
    "  src -> tgt then Child(src, tgt);",
    "}",
    "group Child(source src, target tgt) {",
    "  src.id -> tgt.id;",
    "}",
].join("\n");

const offsets = [
    sourceText.indexOf("group Main"),
    sourceText.indexOf("src ->"),
    sourceText.indexOf("Child(src"),
    sourceText.indexOf("group Child"),
    sourceText.lastIndexOf("src.id"),
];

const trace: FmlDebugTrace = {
    initialState: createFmlTypedValue({source: {id: "a"}, target: {}}),
    result: createFmlTypedValue({target: {id: "a"}}),
    trace: offsets.map((startOffset, index) => ({
        index,
        name: `event-${index}`,
        category: "debug",
        message: `event ${index}`,
        depth: [0, 1, 2, 0, 1][index],
        range: {startOffset, length: 5},
        variables: [],
        state: index === 1 ? createFmlTypedValue({target: {created: true}}) : undefined,
    })),
};

test("steps forward, over, out, and backward through a completed trace", () => {
    const replay = new FmlTraceReplay(trace, sourceText);

    assert.equal(replay.currentIndex, 0);
    assert.equal(replay.stepIn()?.index, 1);
    assert.equal(replay.stepIn()?.index, 2);
    assert.equal(replay.stepBack()?.index, 1);
    assert.equal(replay.next()?.index, 3);
    assert.equal(replay.stepIn()?.index, 4);
    assert.equal(replay.stepOut(), undefined);
    assert.equal(replay.currentIndex, trace.trace.length);
});

test("reconstructs current state from the most recent event state", () => {
    const replay = new FmlTraceReplay(trace, sourceText);

    assert.deepEqual(replay.currentState, trace.initialState);
    replay.stepIn();
    replay.stepIn();
    assert.deepEqual(replay.currentState.value, {target: {created: true}});
});

test("continues and reverse-continues between verified breakpoint lines", () => {
    const replay = new FmlTraceReplay(trace, sourceText);
    const childLine = replay.getEventLine(trace.trace[3]);
    const breakpoints = replay.setBreakpoints([childLine, 99]);

    assert.deepEqual(breakpoints, [
        {line: childLine, verified: true},
        {line: 99, verified: false},
    ]);
    assert.equal(replay.continue()?.index, 3);
    assert.equal(replay.stepIn()?.index, 4);
    assert.equal(replay.reverseContinue()?.index, 3);
    assert.equal(replay.reverseContinue()?.index, 0);
});

test("step over and step out terminate rather than entering deeper events", () => {
    const nestedTrace: FmlDebugTrace = {
        initialState: createFmlTypedValue({}),
        trace: [0, 1, 2].map((depth, index) => ({
            index,
            name: `nested-${index}`,
            category: "debug",
            message: `nested ${index}`,
            depth,
            range: {startOffset: offsets[index], length: 1},
            variables: [],
        })),
    };
    const stepOverReplay = new FmlTraceReplay(nestedTrace, sourceText);
    assert.equal(stepOverReplay.next(), undefined);
    assert.equal(stepOverReplay.currentIndex, nestedTrace.trace.length);

    const stepOutReplay = new FmlTraceReplay(nestedTrace, sourceText);
    stepOutReplay.stepIn();
    assert.equal(stepOutReplay.stepOut(), undefined);
    assert.equal(stepOutReplay.currentIndex, nestedTrace.trace.length);
});
