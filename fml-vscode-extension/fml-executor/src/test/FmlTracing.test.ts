import assert from "node:assert/strict";
import test from "node:test";
import {
    compactFmlTrace, createSingleInputRequest, FmlExecutor, FmlTraceRecorder, stringifyFmlJson,
    type FmlExecutionOptions, type FmlExecutionFrameView, type FmlRecordedEvent, type FmlTraceSite,
} from "../index";
import {Frame} from "../runtime";

const declarations = `
uses 'http://hl7.org/fhir/StructureDefinition/Patient' alias P as source
uses 'http://hl7.org/fhir/StructureDefinition/Patient' alias T as target
`;

async function prepared(rules: string, extras = "") {
    const engine = new FmlExecutor();
    const result = await engine.prepare({sourceName: "trace.fml",
        sourceText: `${declarations}${extras}\ngroup Main(source src : P, target tgt : T) {\n${rules}\n}`});
    assert.equal(result.status, "success", JSON.stringify(result.diagnostics));
    if (result.status !== "success") throw new Error("Invalid trace fixture.");
    return {engine, program: result.value};
}

function checkStack(recorder: FmlTraceRecorder, complete: boolean): void {
    const stack: string[] = [];
    for (const event of recorder.events) {
        const id = `${event.site.sourceName}|${event.site.expressionPosition}`;
        if (event.phase === "exit") assert.equal(stack.pop(), id, "Scopes must close LIFO.");
        assert.equal(event.depth, stack.length, "Phase-derived stack must agree with explicit depth.");
        if (event.phase === "enter") stack.push(id);
    }
    if (complete) assert.deepEqual(stack, []);
    else assert.ok(stack.length > 0, "Incomplete traces keep active scopes.");
}

function event(phase: FmlRecordedEvent["phase"], kind: FmlTraceSite["kind"], depth = 1,
    expressionPosition = "StructureMap.group[0].rule[0].source[0]", value = "before"): FmlRecordedEvent {
    return {
        phase, depth, site: {kind, sourceName: "trace.fml", expressionPosition},
        variables: [{name: "value", value}],
    };
}

for (const kind of ["source", "target", "rule"] as const) {
    test(`compacts an empty ${kind} scope to its final snapshot without mutating the captured events`, () => {
        const begin = event("enter", kind);
        const end = {...event("exit", kind, 1, begin.site.expressionPosition, "after"),
            site: {...begin.site, span: {start: {line: 2, column: 1}, end: {line: 2, column: 5}}}};
        const original = [begin, end];
        const compacted = compactFmlTrace(original);
        assert.deepEqual(compacted, [{...end, phase: "step"}]);
        assert.equal(compacted[0].variables, end.variables);
        assert.equal(compacted[0].site, end.site);
        assert.equal(original[0].phase, "enter");
        assert.equal(original[1].phase, "exit");
        assert.ok(Object.isFrozen(compacted));
        assert.ok(Object.isFrozen(compacted[0]));
        assert.deepEqual(compactFmlTrace(compacted), compacted);
    });
}

test("groups, intermediate steps, unknown scopes and mismatched boundaries are not collapsed", () => {
    const begin = event("enter", "source");
    for (const events of [
        [event("enter", "group"), event("exit", "group")],
        [begin, event("step", "source", 2), event("exit", "source")],
        [event("enter", undefined), event("exit", undefined)],
        [begin, event("exit", "target")],
        [begin, event("exit", "source", 2)],
        [begin, event("exit", "source", 1, "StructureMap.group[1].rule[0].source[0]")],
        [begin, {...event("exit", "source"), site: {...begin.site, sourceName: "imported.fml"}}],
        [event("exit", "source"), begin],
        [begin],
    ]) {
        assert.deepEqual(compactFmlTrace(events), events);
    }
});

test("a compacted child remains a step inside its parent rather than flattening the parent", () => {
    const events = [
        event("enter", "rule", 1, "StructureMap.group[0].rule[0]"),
        event("enter", "target", 2),
        event("exit", "target", 2, undefined, "after"),
        event("exit", "rule", 1, "StructureMap.group[0].rule[0]"),
    ];
    const compacted = compactFmlTrace(events);
    assert.deepEqual(compacted.map(item => [item.phase, item.depth]), [["enter", 1], ["step", 2], ["exit", 1]]);
    assert.deepEqual(compactFmlTrace(compacted), compacted);
});

test("compaction retains boundary messages in order and supports matching source spans", () => {
    const site: FmlTraceSite = {kind: "target", sourceName: "trace.fml",
        span: {start: {line: 1, column: 0}, end: {line: 1, column: 5}}};
    const begin = {...event("enter", "target"), site, messages: [{name: "before", text: ["one"]}]};
    const end = {...event("exit", "target"), site, messages: [{name: "after", text: ["two", "three"]}]};
    assert.deepEqual(compactFmlTrace([begin, end])[0].messages, [...begin.messages, ...end.messages]);
    assert.equal(compactFmlTrace([begin, {...end, site: {...site, span: undefined}}]).length, 2);
});

test("post-processing preserves published prefixes, raw capture budgets and open failure scopes", () => {
    const recorder = new FmlTraceRecorder(3);
    const frame = (depth: number): FmlExecutionFrameView => ({depth, bindings: new Map()});
    const group = event("enter", "group", 0).site;
    const source = event("enter", "source").site;
    recorder.onEvent("enter", group, frame(0));
    recorder.onEvent("enter", source, frame(1));
    recorder.onEvent("exit", source, frame(1));
    const raw = recorder.events;
    recorder.onEvent("exit", group, frame(0));
    recorder.onEnd("failed after the recording limit");
    assert.equal(raw.length, 3);
    assert.deepEqual(raw.map(item => item.phase), ["enter", "enter", "exit"]);
    assert.deepEqual(recorder.events.map(item => item.phase), ["enter", "step"]);
    assert.equal(recorder.status, "truncated");
    assert.match(recorder.error ?? "", /failed/);
    assert.match(recorder.truncationReason ?? "", /event limit/);
    checkStack(recorder, false);
});

test("simple source and target scopes become final-state steps, while groups remain visible", async () => {
    const {engine, program} = await prepared("src.id as v -> tgt.id = v;");
    const recorder = new FmlTraceRecorder();
    let raw: readonly FmlRecordedEvent[] = [];
    const onEnd = recorder.onEnd.bind(recorder);
    recorder.onEnd = error => { raw = recorder.events; onEnd(error); };
    const request = createSingleInputRequest(program, {resourceType: "Patient", id: "copied"});
    assert.equal((await engine.execute(request, {trace: recorder, limits: {maxDepth: 2}})).status, "success");
    assert.deepEqual(raw.map(item => item.phase), ["enter", "enter", "exit", "enter", "enter", "exit", "exit", "exit"]);
    assert.deepEqual(recorder.events.map(item => item.phase), ["enter", "step", "enter", "step", "exit", "exit"]);
    assert.equal(recorder.events.length, raw.length - 2);
    const target = recorder.events.find(item => item.site.kind === "target");
    assert.deepEqual(target?.variables.find(variable => variable.name === "tgt")?.value, {resourceType: "Patient", id: "copied"});
    assert.equal(recorder.events.find(item => item.site.kind === "source")?.variables.find(variable => variable.name === "v")?.value, "copied");
    checkStack(recorder, true);
});

test("type filters and where/check evaluation remain intermediate source steps, including rejected candidates", async () => {
    const {engine, program} = await prepared("src.name : HumanName as n where (family = 'keep') check (family.exists()) -> tgt.name = n;");
    const recorder = new FmlTraceRecorder();
    const request = createSingleInputRequest(program, {resourceType: "Patient", name: [{family: "reject"}, {family: "keep"}]});
    assert.equal((await engine.execute(request, {trace: recorder})).status, "success");
    const source = recorder.events.filter(item => item.site.kind === "source");
    assert.deepEqual(source.map(item => item.phase), ["enter", "step", "step", "step", "step", "exit"]);
    assert.deepEqual(source.flatMap(item => item.messages?.map(message => [message.name, ...message.text]) ?? []),
        [["type", "HumanName: 2 match(es)"], ["where", "false"], ["where", "true"], ["check", "true"]]);
    assert.deepEqual(source.at(-1)?.variables.find(variable => variable.name === "n")?.value, {family: "keep"});
    assert.deepEqual(request.targets[0].value, {resourceType: "Patient", name: [{family: "keep"}]});
    checkStack(recorder, true);
});

test("multiple sources and targets remain distinct steps rather than coalescing separate evaluations", async () => {
    const {engine, program} = await prepared("src.id as id, src.gender as gender -> tgt.id = id, tgt.gender = gender;");
    const recorder = new FmlTraceRecorder();
    assert.equal((await engine.execute(createSingleInputRequest(program, {resourceType: "Patient", id: "p", gender: "male"}),
        {trace: recorder})).status, "success");
    for (const kind of ["source", "target"]) {
        const events = recorder.events.filter(item => item.site.kind === kind);
        assert.equal(events.length, 2);
        assert.ok(events.every(item => item.phase === "step"));
        assert.notEqual(events[0].site.expressionPosition, events[1].site.expressionPosition);
    }
    checkStack(recorder, true);
});

test("target logs retain intermediate steps and rules-only capture compacts only empty rules", async () => {
    const plain = await prepared("src.id -> tgt.id;");
    const trimmed = new FmlTraceRecorder();
    assert.equal((await plain.engine.execute(createSingleInputRequest(plain.program, {resourceType: "Patient", id: "plain"}),
        {trace: trimmed, traceDetail: "rules"})).status, "success");
    assert.deepEqual(trimmed.events.map(item => [item.phase, item.site.kind]), [["enter", "group"], ["step", "rule"], ["exit", "group"]]);
    checkStack(trimmed, true);

    const logged = await prepared("src.id as v -> tgt.id = (v.trace('target-log'));");
    const recorder = new FmlTraceRecorder();
    assert.equal((await logged.engine.execute(createSingleInputRequest(logged.program, {resourceType: "Patient", id: "logged"}),
        {trace: recorder})).status, "success");
    assert.deepEqual(recorder.events.filter(item => item.site.kind === "target").map(item => item.phase), ["enter", "step", "exit"]);
    assert.ok(recorder.events.some(item => item.messages?.some(message => message.name === "target-log")));
    checkStack(recorder, true);
});

test("an empty group always retains its enter/exit pair", async () => {
    const {engine, program} = await prepared("");
    const recorder = new FmlTraceRecorder();
    assert.equal((await engine.execute(createSingleInputRequest(program, {resourceType: "Patient"}), {trace: recorder})).status, "success");
    assert.deepEqual(recorder.events.map(item => [item.phase, item.site.kind]), [["enter", "group"], ["exit", "group"]]);
});

test("nested Cartesian execution records complete visible snapshots with balanced semantic scopes", async () => {
    const {engine, program} = await prepared(`
src.name as n, src.identifier as i -> tgt.name as t then {
 n.family -> t.family;
 i.value -> t.given;
};`);
    const recorder = new FmlTraceRecorder();
    const request = createSingleInputRequest(program, {resourceType: "Patient",
        name: [{family: "A"}, {family: "B"}], identifier: [{value: "1"}, {value: "2"}]});
    assert.equal((await engine.execute(request, {trace: recorder})).status, "success");
    checkStack(recorder, true);
    const matches = recorder.events.filter(event => event.phase === "enter" && event.site.expressionPosition === "StructureMap.group[0].rule[0]");
    assert.equal(matches.length, 4);
    assert.ok(matches.every(event => ["src", "tgt", "n", "i"].every(name => event.variables.some(variable => variable.name === name))));
    assert.deepEqual(matches.map(event => event.variables.find(variable => variable.name === "i")?.value),
        [{value: "1"}, {value: "2"}, {value: "1"}, {value: "2"}]);
    assert.deepEqual(recorder.events[0].variables.find(variable => variable.name === "tgt")?.value, {resourceType: "Patient"});
});

test("event-time values, sites and message arrays are detached and immutable", () => {
    const value = {given: ["before"]};
    const site: FmlTraceSite = {sourceName: "original.fml", span: {start: {line: 1, column: 0}, end: {line: 1, column: 2}}};
    const messages = [{name: "name", text: ["before"]}];
    const recorder = new FmlTraceRecorder();
    recorder.onEvent("step", site, {depth: 0, bindings: new Map([["v", [{name: "v", value}]]])}, messages);
    const prefix = recorder.events;
    recorder.onEvent("exit", site, {depth: 0, bindings: new Map()});
    assert.equal(prefix.length, 1, "Published prefixes must not grow after more events are captured.");
    assert.ok(Object.isFrozen(prefix));
    value.given[0] = "after";
    messages[0].text[0] = "after";
    site.span!.start.column = 9;
    const event = recorder.events[0];
    assert.deepEqual(event.variables[0].value, {given: ["before"]});
    assert.equal(event.messages?.[0].text[0], "before");
    assert.equal(event.site.span?.start.column, 0);
    assert.ok(Object.isFrozen(event.variables[0].value));
    assert.throws(() => Object.assign(event.variables[0].value as object, {extra: true}), TypeError);
});

test("shadowed bindings appear once, ordered collections remain ordered, empty aliases are explicit", async () => {
    const {engine, program} = await prepared(`
src.id as x -> tgt.name as t then {
 src -> (%src.name.given) as x, tgt.gender = 'unknown';
};
src -> tgt.active = true;`);
    const recorder = new FmlTraceRecorder();
    assert.equal((await engine.execute(createSingleInputRequest(program, {resourceType: "Patient", id: "outer"}),
        {trace: recorder})).status, "success");
    const empty = recorder.events.find(event => event.variables.some(variable => variable.name === "x" && variable.value === undefined));
    assert.ok(empty);
    assert.equal(empty.variables.filter(variable => variable.name === "x").length, 1);
    const sibling = recorder.events.find(event => event.site.expressionPosition === "StructureMap.group[0].rule[1].target[0]");
    assert.ok(sibling);
    assert.ok(!sibling.variables.some(variable => variable.name === "x"));
});

test("recording observes evaluated constants but never forces lazy constants or changes transformation behavior", async () => {
    const {engine, program} = await prepared("src -> tgt.id = append(used);", `
let used = 'value';
let unused = 'unused'.trace('must-not-evaluate');
`);
    const recorder = new FmlTraceRecorder();
    const first = createSingleInputRequest(program, {resourceType: "Patient"});
    assert.equal((await engine.execute(first, {trace: recorder, log: () => assert.fail("Unused constant was forced.")})).status, "success");
    assert.ok(!recorder.events[0].variables.some(variable => variable.name === "used"));
    assert.ok(recorder.events.some(event => event.variables.some(variable => variable.name === "used" && variable.value === "value")));
    assert.ok(recorder.events.every(event => !event.variables.some(variable => variable.name === "unused")));
    const second = createSingleInputRequest(program, {resourceType: "Patient"});
    assert.equal((await engine.execute(second)).status, "success");
    assert.deepEqual(first.targets[0].value, second.targets[0].value);
});

test("absent, inactive and exhausted capture do not enumerate trace bindings on the hot path", async t => {
    const {engine, program} = await prepared("src.name -> tgt.name;");
    const original = Frame.prototype.visible;
    const visible = t.mock.method(Frame.prototype, "visible", original);
    const input = {resourceType: "Patient", name: Array.from({length: 20}, () => ({family: "name"}))};
    for (const trace of [undefined, {recording: false, onEvent() { assert.fail("Inactive trace emitted."); }}, new FmlTraceRecorder(0)]) {
        visible.mock.resetCalls();
        assert.equal((await engine.execute(createSingleInputRequest(program, input), {trace})).status, "success");
        assert.equal(visible.mock.callCount(), 0, "Trace-only frame enumeration must not occur.");
    }
});

test("recorder guards precede value enumeration and message formatting once event capture is exhausted", () => {
    let enumerations = 0;
    const frame: FmlExecutionFrameView = {depth: 0, get bindings() {
        enumerations++;
        return new Map([["v", [{name: "v", value: {data: "snapshot"}}]]]);
    }};
    const recorder = new FmlTraceRecorder(1);
    recorder.onEvent("enter", {}, frame);
    recorder.onEvent("step", {}, frame);
    const neverRead = {get bad(): never { throw new Error("A stopped recorder must not format values."); }};
    recorder.onMessage("ignored", [neverRead], {}, frame);
    recorder.onEvent("exit", {}, frame);
    assert.equal(enumerations, 1);
    assert.equal(recorder.events.length, 1);
    assert.equal(recorder.status, "truncated");
});

test("byte budgets retain an exact complete-event prefix and reject the next whole event", () => {
    const frame: FmlExecutionFrameView = {depth: 0, bindings: new Map([["v", [{name: "v", value: "value"}]]])};
    const baseline = new FmlTraceRecorder();
    baseline.onEvent("enter", {name: "scope"}, frame);
    const bytes = new TextEncoder().encode(stringifyFmlJson(baseline.events[0])).length;
    const exact = new FmlTraceRecorder(100, bytes);
    exact.onEvent("enter", {name: "scope"}, frame);
    exact.onEvent("step", {name: "scope"}, frame);
    assert.deepEqual(exact.events, baseline.events);
    assert.equal(exact.status, "truncated");
    const tooSmall = new FmlTraceRecorder(100, bytes - 1);
    tooSmall.onEvent("enter", {name: "scope"}, frame);
    assert.deepEqual(tooSmall.events, []);
    assert.match(tooSmall.truncationReason ?? "", /byte/);
});

test("capture policy trims only selected steps while preserving scopes and messages", async () => {
    const {engine, program} = await prepared("src.id as v log (v) -> tgt.id = (v.trace('message'));");
    const input = {resourceType: "Patient", id: "value"};
    const run = async (options: FmlExecutionOptions) => {
        const recorder = new FmlTraceRecorder();
        const request = createSingleInputRequest(program, input);
        assert.equal((await engine.execute(request, {...options, trace: recorder})).status, "success");
        checkStack(recorder, true);
        return {recorder, output: request.targets[0].value};
    };
    const full = await run({});
    const trimmed = await run({traceDetail: "rules"});
    assert.ok(full.recorder.events.length > trimmed.recorder.events.length);
    assert.equal(trimmed.recorder.status, "complete");
    assert.ok(trimmed.recorder.events.some(event => event.messages?.some(message => message.name === "message")));
    assert.deepEqual(full.output, trimmed.output);
});

test("exhausted recording still delivers independently configured language logs", async () => {
    const {engine, program} = await prepared("src.id as v log (v) -> tgt.id = (v.trace('path'));");
    const recorder = new FmlTraceRecorder(0);
    const messages: string[] = [];
    const result = await engine.execute(createSingleInputRequest(program, {resourceType: "Patient", id: "logged"}), {
        trace: recorder, log: (name, values) => { messages.push(name); assert.deepEqual(values, ["logged"]); },
    });
    assert.equal(result.status, "success");
    assert.equal(messages.length, 2);
    assert.ok(messages.includes("path"));
    assert.deepEqual(recorder.events, []);
});

test("failed checks, service rejection and cancellation retain prefixes without synthetic exits", async () => {
    for (const kind of ["check", "service", "cancel"] as const) {
        const {engine, program} = await prepared(kind === "service"
            ? "src.gender as v -> tgt.gender = translate(v, 'http://example.org/map', 'code');"
            : "src.id check (false) -> tgt.id;");
        const recorder = new FmlTraceRecorder();
        let options: FmlExecutionOptions = {trace: recorder, translate: async () => { throw new Error("host rejection"); }};
        if (kind === "cancel") {
            const controller = new AbortController();
            const onEvent = recorder.onEvent.bind(recorder);
            recorder.onEvent = (phase, site, frame) => { onEvent(phase, site, frame); controller.abort(new Error("cancel")); };
            options = {...options, signal: controller.signal};
        }
        const result = await engine.execute(createSingleInputRequest(program, {resourceType: "Patient", id: "a", gender: "male"}), options);
        assert.equal(result.status, "failure");
        assert.equal(recorder.status, "stopped");
        checkStack(recorder, false);
    }
});

test("failure after truncation keeps recording completeness separate from evaluation failure", async () => {
    const {engine, program} = await prepared("src.id -> tgt.id; src.gender check (false) -> tgt.gender;");
    const recorder = new FmlTraceRecorder(2);
    const result = await engine.execute(createSingleInputRequest(program, {resourceType: "Patient", id: "a", gender: "male"}), {trace: recorder});
    assert.equal(result.status, "failure");
    assert.equal(recorder.status, "truncated");
    assert.match(recorder.error ?? "", /check failed/);
    checkStack(recorder, false);
});

test("multiline imported sources preserve Unicode UTF-16 text ranges and immutable document identity", async () => {
    const text = `map 'http://example.org/Shared' = Shared\r\n${declarations.trim().replace(/\n/g, "\r\n")}\r\n`
        + `group Shared(source src : P, target tgt : T) {\r\n src -> tgt.name as n, n.text = '\u{1f600}', n.family = 'after';\r\n}`;
    const engine = new FmlExecutor({maps: [{sourceName: "unicode/shared.fml", sourceText: text}]});
    const prepared = await engine.prepare({sourceName: "main.fml", sourceText: `${declarations}
imports 'http://example.org/Shared'
group Main(source src : P, target tgt : T) { src -> tgt then Shared(src,tgt); }`});
    assert.equal(prepared.status, "success", JSON.stringify(prepared.diagnostics));
    if (prepared.status !== "success") return;
    const recorder = new FmlTraceRecorder();
    assert.equal((await engine.execute(createSingleInputRequest(prepared.value, {resourceType: "Patient"}), {trace: recorder})).status, "success");
    const event = recorder.events.find(event => event.site.sourceName === "unicode/shared.fml"
        && event.site.expressionPosition === "StructureMap.group[0].rule[0].target[2]");
    assert.ok(event?.site.span);
    const lines = text.split("\r\n");
    const line = lines[event.site.span.start.line - 1];
    assert.equal(line.slice(event.site.span.start.column, event.site.span.end.column), "n.family = 'after'");
    checkStack(recorder, true);
});
