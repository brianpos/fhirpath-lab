import assert from "node:assert/strict";
import test from "node:test";
import {
    createSingleInputRequest, FmlExecutor, FmlTraceRecorder,
    type FmlExecutionRequest, type FmlExecutorResult, type PreparedFmlProgram,
} from "../index";

const declarations = `
uses 'http://hl7.org/fhir/StructureDefinition/Patient' alias P as source
uses 'http://hl7.org/fhir/StructureDefinition/Patient' alias T as target
`;
const identity = "src.id -> tgt.id;";
const translation = "src.gender as v -> tgt.gender = translate(v, 'http://example.org/map', 'code');";

async function prepare(rules: string, groups = "") {
    const engine = new FmlExecutor();
    const result = await engine.prepare({
        sourceName: "errors.fml",
        sourceText: `${declarations}\ngroup Main(source src : P, target tgt : T) {\n${rules}\n}\n${groups}`,
    });
    assert.equal(result.status, "success", JSON.stringify(result.diagnostics));
    if (result.status !== "success") throw new Error("Error fixture must prepare successfully.");
    return {engine, program: result.value};
}

function request(program: PreparedFmlProgram, input: unknown = {resourceType: "Patient", id: "example", gender: "male"}): FmlExecutionRequest {
    return createSingleInputRequest(program, input);
}

function failure(result: FmlExecutorResult<unknown>, message: RegExp): void {
    assert.equal(result.status, "failure", JSON.stringify(result.diagnostics));
    assert.ok(!("value" in result), "Failure must never carry a successful output.");
    assert.ok(result.diagnostics.some(diagnostic => diagnostic.severity === "error" && message.test(diagnostic.message)),
        JSON.stringify(result.diagnostics));
}

test("failed check retains earlier target writes and a stopped trace prefix at the failing source", async () => {
    const {engine, program} = await prepare(`${identity}\nsrc.gender check (false) -> tgt.gender;`);
    const invocation = request(program);
    const recorder = new FmlTraceRecorder();
    const result = await engine.execute(invocation, {trace: recorder});
    failure(result, /check failed/);
    assert.deepEqual(invocation.targets[0].value, {resourceType: "Patient", id: "example"});
    assert.deepEqual(invocation.sources[0].value, {resourceType: "Patient", id: "example", gender: "male"});
    assert.equal(result.diagnostics[0].sourceName, "errors.fml");
    assert.equal(result.diagnostics[0].line, 7);
    assert.equal(recorder.status, "stopped");
    assert.ok(recorder.events.filter(event => event.phase === "enter").length >
        recorder.events.filter(event => event.phase === "exit").length);
});

test("where false excludes a candidate without turning a failed check into success", async () => {
    const {engine, program} = await prepare("src.id where (false) check (false) -> tgt.id;");
    const invocation = request(program);
    assert.equal((await engine.execute(invocation)).status, "success");
    assert.deepEqual(invocation.targets[0].value, {resourceType: "Patient"});
});

for (const names of [[{family: "one"}, {family: "two"}]]) {
    test(`only_one rejects ${names.length} candidates`, async () => {
        const {engine, program} = await prepare("src.name only_one -> tgt.name;");
        const invocation = request(program, {resourceType: "Patient", name: names});
        failure(await engine.execute(invocation), /only_one/);
        assert.deepEqual(invocation.targets[0].value, {resourceType: "Patient"});
    });
}

for (const cardinality of ["2..*", "0..1"]) {
    test(`enforces explicit source cardinality ${cardinality}`, async () => {
        const {engine, program} = await prepare(`src.name ${cardinality} -> tgt.name;`);
        const names = cardinality === "2..*" ? [{family: "one"}] : [{family: "one"}, {family: "two"}];
        failure(await engine.execute(request(program, {resourceType: "Patient", name: names})), /cardinality/);
    });
}

test("does not truncate a multi-item expression assigned to a scalar target", async () => {
    const {engine, program} = await prepare("src -> tgt.id = evaluate(src, name.given);");
    const invocation = request(program, {resourceType: "Patient", name: [{given: ["one", "two"]}]});
    failure(await engine.execute(invocation), /multiple|more than once/);
});

test("rejects an invalid runtime truncate length instead of coercing a Boolean to 1", async () => {
    const {engine, program} = await prepare("src.id as v -> (%src.active) as length, tgt.id = truncate(v, length);");
    failure(await engine.execute(request(program, {resourceType: "Patient", id: "abc", active: true})), /truncate|integer/);
});

test("does not turn a collection-valued truncate argument into its first item", async () => {
    const {engine, program} = await prepare("src -> (%src.name.given) as names, tgt.id = truncate(names, 1);");
    failure(await engine.execute(request(program, {resourceType: "Patient", name: [{given: ["one", "two"]}]})), /singleton/);
});

test("a referenced alias never leaks from one sibling rule to the next", async () => {
    const result = await new FmlExecutor().prepare({sourceText: `${declarations}
group Main(source src : P, target tgt : T) {
 src.id as v -> tgt.id = v;
 src -> tgt.gender = append(v);
}`});
    failure(result, /Variable 'v'.*not defined/);
});

test("a child group cannot write through a source-mode argument", async () => {
    const {engine, program} = await prepare("src -> tgt then Child(src, tgt);", `
group Child(source input : P, target output : T) { input.id as v -> input.id = v; }`);
    failure(await engine.execute(request(program)), /writable|target|source/);
});

test("missing runtime terminology service is an explicit language execution failure", async () => {
    const {engine, program} = await prepare(translation);
    failure(await engine.execute(request(program)), /translate host service is required/);
});

test("async terminology rejection retains diagnostics, partial targets and open scopes", async () => {
    const {engine, program} = await prepare(`${identity}\n${translation}`);
    const invocation = request(program);
    const recorder = new FmlTraceRecorder();
    failure(await engine.execute(invocation, {
        trace: recorder, translate: async () => { throw new Error("terminology unavailable"); },
    }), /terminology unavailable/);
    assert.deepEqual(invocation.targets[0].value, {resourceType: "Patient", id: "example"});
    assert.match(recorder.error ?? "", /terminology unavailable/);
    assert.equal(recorder.status, "stopped");
});

test("rejects invalid runtime terminology arguments before calling the host", async () => {
    const {engine, program} = await prepare("src.gender as v -> (%src.name.given) as maps, tgt.gender = translate(v, maps, 'code');");
    let called = false;
    failure(await engine.execute(request(program, {resourceType: "Patient", gender: "male", name: [{given: ["a", "b"]}]}), {
        translate: async () => { called = true; return []; },
    }), /singleton/);
    assert.equal(called, false);
});

test("rejects complex terminology results for primitive target fields", async () => {
    const {engine, program} = await prepare(translation);
    failure(await engine.execute(request(program), {
        translate: async () => [{name: "result", value: {code: "male"}, typeName: "Coding"}],
    }), /Primitive target/);
});

test("rejects a wrong primitive value kind returned by the terminology host", async () => {
    const {engine, program} = await prepare(translation);
    failure(await engine.execute(request(program), {
        translate: async () => [{name: "result", value: true, typeName: "code"}],
    }), /string|primitive|Primitive/);
});

test("rejects value-less host bindings instead of returning success-shaped empty output", async () => {
    const {engine, program} = await prepare(translation);
    failure(await engine.execute(request(program), {
        translate: async () => [{name: "invalid", value: undefined}],
    }), /translate host service returned a binding with no value/);
});

test("rejects explicitly missing or ambiguous group definitions at preparation", async () => {
    for (const text of [
        "group Main(source src, target tgt) { src -> tgt then Missing(src, tgt); }",
        "group Main(source src, target tgt) {} group Main(source src, target tgt) {}",
    ]) {
        const result = await new FmlExecutor().prepare({sourceName: "link.fml", sourceText: text});
        assert.notEqual(result.status, "success");
        assert.ok(result.diagnostics.some(diagnostic => diagnostic.severity === "error"));
    }
});

test("imports, inheritance and constants cannot silently execute without their phase 4 semantics", async () => {
    for (const text of [
        "imports 'http://example.org/unavailable'\ngroup Main(source src, target tgt) {}",
        "group Main(source src, target tgt) extends Main {}",
        "let A = %B; let B = %A; group Main(source src, target tgt) {}",
    ]) {
        const result = await new FmlExecutor().prepare({sourceText: text});
        assert.notEqual(result.status, "success");
        assert.ok(result.diagnostics.some(diagnostic => diagnostic.severity === "error"));
    }
});

test("bounds recursive local group calls rather than overflowing the JavaScript stack", async () => {
    const {engine, program} = await prepare("src -> tgt then Main(src, tgt);");
    failure(await engine.execute(request(program), {limits: {maxDepth: 8}}), /recursion limit/);
});

for (const [limit, value] of [
    ["maxDepth", -1], ["maxWork", NaN], ["maxOutputNodes", Infinity], ["maxWork", 1.5],
] as const) {
    test(`rejects invalid execution limit ${limit}=${String(value)} before any writes`, async () => {
        const {engine, program} = await prepare(identity);
        const invocation = request(program);
        failure(await engine.execute(invocation, {limits: {[limit]: value}}), /limit.*non-negative safe integer/);
        assert.deepEqual(invocation.targets[0].value, {resourceType: "Patient"});
    });
}

for (const limits of [{maxWork: 0}, {maxOutputNodes: 0}]) {
    test(`enforces a zero ${Object.keys(limits)[0]} budget`, async () => {
        const {engine, program} = await prepare(identity);
        failure(await engine.execute(request(program), {limits}), /limit exceeded/);
    });
}

test("pre-aborted execution cannot write, even with a custom abort reason", async () => {
    const {engine, program} = await prepare(identity);
    const invocation = request(program);
    const controller = new AbortController();
    controller.abort("user stopped");
    failure(await engine.execute(invocation, {signal: controller.signal}), /user stopped/);
    assert.deepEqual(invocation.targets[0].value, {resourceType: "Patient"});
});

test("cancellation at an actual trace boundary preserves prior writes", async () => {
    const {engine, program} = await prepare(`${identity}\nsrc.gender -> tgt.gender;`);
    const invocation = request(program);
    const controller = new AbortController();
    const recorder = new FmlTraceRecorder();
    const result = await engine.execute(invocation, {
        signal: controller.signal,
        trace: {
            get recording() { return recorder.recording; },
            onEvent(phase, site, frame, messages) {
                recorder.onEvent(phase, site, frame, messages);
                if (phase === "exit" && site.kind === "target" && [...frame.bindings.values()].some(bindings =>
                    bindings.some(binding => binding.mode === "target" && (binding.value as {id?: string})?.id === "example"))) {
                    controller.abort(new Error("boundary cancellation"));
                }
            },
            onEnd: error => recorder.onEnd(error),
        },
    });
    failure(result, /boundary cancellation/);
    assert.deepEqual(invocation.targets[0].value, {resourceType: "Patient", id: "example"});
    assert.equal(recorder.status, "stopped");
    assert.ok(recorder.events.filter(event => event.phase === "enter").length >
        recorder.events.filter(event => event.phase === "exit").length);
});

test("cancellation releases an async wait even when the host ignores the signal", {timeout: 3000}, async () => {
    const {engine, program} = await prepare(translation);
    const controller = new AbortController();
    let entered!: () => void;
    const started = new Promise<void>(resolve => { entered = resolve; });
    const invocation = request(program);
    const execution = engine.execute(invocation, {
        signal: controller.signal,
        translate: () => { entered(); return new Promise(() => {}); },
    });
    await started;
    controller.abort(new Error("cancel pending service"));
    failure(await execution, /cancel pending service/);
    assert.deepEqual(invocation.targets[0].value, {resourceType: "Patient"});
});

test("abort after async completion prevents subsequent target writes", async () => {
    const {engine, program} = await prepare(translation);
    const controller = new AbortController();
    const invocation = request(program);
    failure(await engine.execute(invocation, {
        signal: controller.signal,
        translate: async () => {
            controller.abort(new Error("cancel before attach"));
            return [{name: "result", value: "female", typeName: "code"}];
        },
    }), /cancel before attach/);
    assert.deepEqual(invocation.targets[0].value, {resourceType: "Patient"});
});

test("rejects duplicate runtime bindings instead of selecting the first", async () => {
    const {engine, program} = await prepare(identity);
    const invocation = request(program);
    failure(await engine.execute({...invocation, sources: [...invocation.sources, ...invocation.sources]}), /Duplicate.*binding/);
});

test("reports a missing or invalid mutable target even if the source has no candidates", async () => {
    const {engine, program} = await prepare(identity);
    for (const value of [null, false, []]) {
        failure(await engine.execute({...request(program, {resourceType: "Patient"}),
            targets: [{name: "tgt", value}]}), /target.*object/i);
    }
});

test("a supplied incompatible resource cannot silently become the declared input type", async () => {
    const {engine, program} = await prepare(identity);
    failure(await engine.execute(request(program, {resourceType: "Observation", id: "wrong"})), /type|Patient/);
});

test("rejects input/target object sharing and cyclic data before mutation", async () => {
    const {engine, program} = await prepare(identity);
    const shared = {resourceType: "Patient", id: "shared"};
    const invocation = request(program, shared);
    failure(await engine.execute({...invocation, targets: [{name: "tgt", value: shared}]}), /share objects/);
    const cyclic: Record<string, unknown> = {resourceType: "Patient", id: "cycle"};
    cyclic.loop = cyclic;
    failure(await engine.execute(request(program, cyclic)), /[Cc]yclic/);
});

test("a tracing failure is reported as instrumentation failure, not an FML check", async () => {
    const {engine, program} = await prepare(identity);
    const recorder = new FmlTraceRecorder();
    const result = await engine.execute(request(program), {
        trace: {recording: true, onEvent: () => { throw new Error("snapshot broken"); },
            onEnd: error => recorder.onEnd(error)},
    });
    failure(result, /Trace observer failed.*snapshot broken/);
    assert.equal(recorder.status, "stopped");
});

test("invokes a failing trace-completion hook only once", async () => {
    const {engine, program} = await prepare(identity);
    let ended = 0;
    const result = await engine.execute(request(program), {
        trace: {recording: false, onEvent() {}, onEnd() { ended++; throw new Error("persist trace failed"); }},
    });
    failure(result, /Trace completion failed.*persist trace failed/);
    assert.equal(ended, 1);
});

test("a language failure remains primary when trace completion also fails", async () => {
    const {engine, program} = await prepare("src.id check (false) -> tgt.id;");
    const result = await engine.execute(request(program), {
        trace: {recording: false, onEvent() {}, onEnd() { throw new Error("persist failure"); }},
    });
    failure(result, /check failed/);
    assert.match(result.diagnostics[0].message, /check failed/);
    assert.ok(result.diagnostics.some(diagnostic => /Trace completion failed/.test(diagnostic.message)));
});

test("failure after truncation retains both completeness and evaluation error", async () => {
    const {engine, program} = await prepare(`${identity}\nsrc.gender check (false) -> tgt.gender;`);
    const recorder = new FmlTraceRecorder(1);
    failure(await engine.execute(request(program), {trace: recorder}), /check failed/);
    assert.equal(recorder.status, "truncated");
    assert.match(recorder.error ?? "", /check failed/);
    assert.equal(recorder.events.length, 1);
});

test("a failed run cannot contaminate the next invocation of the prepared program", async () => {
    const {engine, program} = await prepare(translation);
    failure(await engine.execute(request(program)), /host service/);
    const invocation = request(program);
    const result = await engine.execute(invocation, {
        translate: async () => [{name: "result", value: "female", typeName: "code", primitiveMetadata: {id: "translated"}}],
    });
    assert.equal(result.status, "success", JSON.stringify(result.diagnostics));
    assert.deepEqual(invocation.targets[0].value, {resourceType: "Patient", gender: "female", _gender: {id: "translated"}});
});

test("reports a missing resolution service/base instead of returning empty successful output", async () => {
    const {engine, program} = await prepare("src -> tgt.id = evaluate(src, generalPractitioner.resolve().id);");
    failure(await engine.execute(request(program, {resourceType: "Patient", generalPractitioner: [{reference: "Practitioner/missing"}]})),
        /fhirServerUrl|resolve|server/i);
});

test("a late rejecting host cannot produce writes or unhandled errors after cancellation", async () => {
    const {engine, program} = await prepare(translation);
    const controller = new AbortController();
    let rejectHost!: (error: Error) => void;
    const invocation = request(program);
    const running = engine.execute(invocation, {
        signal: controller.signal,
        translate: () => new Promise((_resolve, reject) => { rejectHost = reject; }),
    });
    controller.abort(new Error("cancel first"));
    failure(await running, /cancel first/);
    rejectHost(new Error("late rejection"));
    await new Promise<void>(resolve => setImmediate(resolve));
    assert.deepEqual(invocation.targets[0].value, {resourceType: "Patient"});
});

test("a host is not handed mutable input references", async () => {
    const {engine, program} = await prepare(
        "src.name as n -> tgt.gender = translate(n, 'http://example.org/map', 'code');");
    const input = {resourceType: "Patient", name: [{family: "original"}]};
    const result = await engine.execute(request(program, input), {
        translate: async binding => {
            assert.ok(binding.value && typeof binding.value === "object");
            Object.assign(binding.value, {family: "changed"});
            return [{name: "result", value: "unknown", typeName: "code"}];
        },
    });
    assert.equal(result.status, "success", JSON.stringify(result.diagnostics));
    assert.equal(input.name[0].family, "original");
});

test("empty error messages still mark trace recording as stopped", () => {
    const recorder = new FmlTraceRecorder();
    recorder.onEnd("");
    assert.equal(recorder.status, "stopped");
});

test("byte-limited recording preserves a complete prefix without masking subsequent failure", async () => {
    const {engine, program} = await prepare("src.id check (false) -> tgt.id;");
    const recorder = new FmlTraceRecorder(100, 0);
    failure(await engine.execute(request(program), {trace: recorder}), /check failed/);
    assert.equal(recorder.status, "truncated");
    assert.match(recorder.truncationReason ?? "", /byte limit/);
    assert.match(recorder.error ?? "", /check failed/);
    assert.deepEqual(recorder.events, []);
});

test("diagnoses unknown entry groups, missing bindings and unprepared programs", async () => {
    const {engine, program} = await prepare(identity);
    failure(await engine.execute({...request(program), entryGroup: "Missing"}), /Entry group/);
    failure(await engine.execute({...request(program), sources: []}), /Missing source binding/);
    failure(await engine.execute({...request(program), program: {...program}}), /not prepared/);
});

test("rejects source arrays in scalar fields and immutable target objects", async () => {
    const {engine, program} = await prepare(identity);
    failure(await engine.execute(request(program, {resourceType: "Patient", id: ["one", "two"]})), /Scalar source/);
    const invocation = request(program);
    const target = Object.freeze({resourceType: "Patient"});
    failure(await engine.execute({...invocation, targets: [{name: "tgt", value: target}]}), /extensible|read only|Cannot add/i);
});

test("checks the exact copied-output budget, including nested complex content", async () => {
    const {engine, program} = await prepare("src.name -> tgt.name;");
    const input = {resourceType: "Patient", name: [{family: "A", given: ["B"]}]};
    const atLimit = await engine.execute(request(program, input), {limits: {maxOutputNodes: 4}});
    assert.equal(atLimit.status, "success", JSON.stringify(atLimit.diagnostics));
    const belowLimit = request(program, input);
    failure(await engine.execute(belowLimit, {limits: {maxOutputNodes: 3}}), /output node limit/);
    assert.deepEqual(belowLimit.targets[0].value, {resourceType: "Patient"});
});
