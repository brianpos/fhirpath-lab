import assert from "node:assert/strict";
import {writeFileSync} from "node:fs";
import {cpus, platform, release} from "node:os";
import {performance} from "node:perf_hooks";
import {createSingleInputRequest, FmlExecutor, FmlTraceRecorder, parseFmlJson, stringifyFmlJson} from "../index";
import type {FmlExecutionOptions, PreparedFmlProgram} from "../contracts";
import {discoverFmlCorpus, loadFmlCorpusFixture} from "./corpus";

const declarations = `
uses 'http://hl7.org/fhir/StructureDefinition/Patient' alias P as source
uses 'http://hl7.org/fhir/StructureDefinition/Patient' alias T as target
`;
interface Workload {
    name: string;
    sourceText: string;
    inputText: string;
    expected: unknown;
    size: number;
    sizeUnit?: "elements" | "input-bytes";
}

function repeated(size: number, kind: "copy" | "expression" | "nested"): Workload {
    const names = Array.from({length: size}, (_item, index) => ({family: `Family${index}`, given: ["A", "B"]}));
    const rule = kind === "copy" ? "src.name -> tgt.name;" : kind === "expression"
        ? "src.name as n -> tgt.name as t then { n -> t.text = evaluate(n, family & ' ' & given.join(' ')); };"
        : "src.name as n -> tgt.name as t then Name(n,t);";
    const group = kind === "nested" ? "group Name(source src : HumanName, target tgt : HumanName) { src.family -> tgt.family; src.given -> tgt.given; }" : "";
    return {
        name: `${kind}-${size}`, size,
        sourceText: `${declarations}group Main(source src : P, target tgt : T) { ${rule} } ${group}`,
        inputText: JSON.stringify({resourceType: "Patient", name: names}),
        expected: {resourceType: "Patient", name: kind === "expression" ? names.map(name => ({text: `${name.family} A B`})) : names},
    };
}

function cartesian(size: number): Workload {
    const names = Array.from({length: size}, (_item, index) => ({family: `N${index}`}));
    const identifiers = Array.from({length: size}, (_item, index) => ({value: `I${index}`}));
    return {
        name: `cartesian-${size}x${size}`, size: size * size,
        sourceText: `${declarations}group Main(source src : P, target tgt : T) {
 src.name as n, src.identifier as i -> tgt.name as t then { n.family -> t.family; i.value -> t.given; };
}`,
        inputText: JSON.stringify({resourceType: "Patient", name: names, identifier: identifiers}),
        expected: {resourceType: "Patient", name: names.flatMap(name => identifiers.map(id => ({family: name.family, given: [id.value]})))},
    };
}

function summary(values: number[]) {
    const sorted = [...values].sort((a, b) => a - b);
    return {medianMs: sorted[Math.floor(sorted.length / 2)], minMs: sorted[0], maxMs: sorted.at(-1), samplesMs: values};
}

async function main(): Promise<void> {
    const samples = process.env.FML_BENCHMARK_SAMPLES === undefined ? 7 : Number(process.env.FML_BENCHMARK_SAMPLES);
    if (!Number.isSafeInteger(samples) || samples < 3 || samples > 50) throw new Error("FML_BENCHMARK_SAMPLES must be an integer from 3 to 50.");
    const workloads: Workload[] = [
        repeated(100, "copy"), repeated(1000, "copy"), repeated(5000, "copy"),
        repeated(100, "expression"), repeated(1000, "expression"),
        repeated(100, "nested"), repeated(1000, "nested"),
        cartesian(10), cartesian(30),
        {...repeated(1000, "copy"), name: "complex-root-copy-1000",
            sourceText: `${declarations}group Main(source src : P, target tgt : T) { src -> tgt; }`},
        {name: "cross-version-R4B-R5", size: 1, inputText: '{"resourceType":"Patient","id":"versioned"}',
            expected: {resourceType: "Patient", id: "versioned"},
            sourceText: `${declarations.replace("fhir/StructureDefinition/Patient", "fhir/4.3/StructureDefinition/Patient")
                .replace("fhir/StructureDefinition/Patient", "fhir/5.0/StructureDefinition/Patient")}
group Main(source src : P, target tgt : T) { src.id as v -> tgt.id = append(v); }`},
    ];
    if (process.env.FML_CORPUS_ROOT) {
        const cases = await discoverFmlCorpus({root: process.env.FML_CORPUS_ROOT});
        for (const id of ["simple-identity", "source-multiple", "transform-evaluateConcise", "group-types", "constants"]) {
            const fixture = cases.find(fixture => fixture.id === id);
            assert.ok(fixture, `Missing benchmark corpus case '${id}'.`);
            const loaded = await loadFmlCorpusFixture(fixture);
            workloads.push({name: `corpus:${id}`, size: Buffer.byteLength(loaded.inputText), sizeUnit: "input-bytes",
                sourceText: loaded.source.sourceText, inputText: loaded.inputText, expected: parseFmlJson(loaded.expectedOutputText)});
        }
    }
    const rows = [];
    for (const workload of workloads) {
        const cold: number[] = [];
        const prepare = async (): Promise<{engine: FmlExecutor; program: PreparedFmlProgram}> => {
            const engine = new FmlExecutor();
            const started = performance.now();
            const result = await engine.prepare({sourceText: workload.sourceText, sourceName: `${workload.name}.fml`});
            const elapsed = performance.now() - started;
            assert.equal(result.status, "success", JSON.stringify(result.diagnostics));
            if (result.status !== "success") throw new Error("Benchmark preparation failed.");
            cold.push(elapsed);
            return {engine, program: result.value};
        };
        let prepared = await prepare();
        for (let index = 1; index < samples; index++) prepared = await prepare();
        const input = parseFmlJson(workload.inputText);
        const expected = parseFmlJson(stringifyFmlJson(workload.expected));
        const run = async (options: FmlExecutionOptions = {}, endToEnd = false): Promise<number> => {
            let request = endToEnd ? undefined : createSingleInputRequest(prepared.program, input);
            const started = performance.now();
            request ??= createSingleInputRequest(prepared.program, parseFmlJson(workload.inputText));
            const result = await prepared.engine.execute(request, options);
            const text = endToEnd && result.status === "success" ? stringifyFmlJson(result.value.targets[0].value) : undefined;
            const elapsed = performance.now() - started;
            assert.equal(result.status, "success", JSON.stringify(result.diagnostics));
            if (result.status === "success") {
                assert.deepEqual(text ? parseFmlJson(text) : parseFmlJson(stringifyFmlJson(result.value.targets[0].value)), expected);
            }
            return elapsed;
        };
        for (let index = 0; index < 3; index++) await run();
        global.gc?.();
        const before = process.memoryUsage();
        const warm: number[] = [];
        const endToEnd: number[] = [];
        for (let index = 0; index < samples; index++) warm.push(await run());
        for (let index = 0; index < samples; index++) endToEnd.push(await run({}, true));
        const concurrent = await Promise.all(Array.from({length: 3}, () => run()));
        const afterWork = process.memoryUsage();
        global.gc?.();
        const afterGc = process.memoryUsage();
        rows.push({
            name: workload.name, size: workload.size, sizeUnit: workload.sizeUnit ?? "elements", coldPreparation: summary(cold), warmExecution: summary(warm),
            endToEnd: summary(endToEnd), concurrentIndependentRuns: summary(concurrent),
            memory: {beforeBytes: before, afterWorkBytes: afterWork, afterGcBytes: afterGc,
                retainedHeapDeltaBytes: afterGc.heapUsed - before.heapUsed,
                processPeakRssKiB: process.resourceUsage().maxRSS},
        });
    }
    const workload = repeated(100, "nested");
    const engine = new FmlExecutor();
    const prepared = await engine.prepare({sourceText: workload.sourceText});
    if (prepared.status !== "success") throw new Error(JSON.stringify(prepared.diagnostics));
    const input = parseFmlJson(workload.inputText);
    const expected = parseFmlJson(JSON.stringify(workload.expected));
    const instrumentation = [];
    for (const mode of ["absent", "inactive", "enabled", "rules", "exhausted"] as const) {
        const values: number[] = [];
        let events = 0;
        let bytes = 0;
        global.gc?.();
        const memoryBefore = process.memoryUsage();
        for (let index = -3; index < samples; index++) {
            const recorder = mode === "enabled" || mode === "rules" ? new FmlTraceRecorder(50_000, 64 * 1024 * 1024)
                : mode === "exhausted" ? new FmlTraceRecorder(0) : undefined;
            const trace = recorder ?? (mode === "inactive" ? {recording: false, onEvent() { assert.fail("Inactive trace called."); }} : undefined);
            const request = createSingleInputRequest(prepared.value, input);
            const started = performance.now();
            const result = await engine.execute(request, {trace, traceDetail: mode === "rules" ? "rules" : "full"});
            const elapsed = performance.now() - started;
            assert.equal(result.status, "success", JSON.stringify(result.diagnostics));
            assert.deepEqual(parseFmlJson(stringifyFmlJson(request.targets[0].value)), expected);
            if (index >= 0) values.push(elapsed);
            events = recorder?.events.length ?? 0;
            bytes = recorder ? Buffer.byteLength(stringifyFmlJson(recorder.events)) : 0;
        }
        const memoryAfter = process.memoryUsage();
        global.gc?.();
        instrumentation.push({mode, ...summary(values), events, serializedEventsBytes: bytes,
            memoryBeforeBytes: memoryBefore, memoryAfterBytes: memoryAfter, memoryAfterGcBytes: process.memoryUsage(),
            processPeakRssKiB: process.resourceUsage().maxRSS});
    }
    const report = {
        schemaVersion: 1, generatedAt: new Date().toISOString(),
        environment: {node: process.version, platform: platform(), release: release(), cpu: cpus()[0]?.model,
            samples, warmups: 3, explicitGc: !!global.gc},
        methodology: {
            externalIO: "No runtime I/O. Optional local corpus files are loaded before timing. Process startup/imports are not timed.",
            cold: "New executor and full parse/analyze/link/bind; shared module/model caches may already be warm.",
            warm: "Prepared program, pre-parsed input; fresh targets outside timed region. Execution includes required input-ownership checks.",
            endToEnd: "Parse input, create target bindings, execute, serialize output; preparation excluded.",
            correctness: "Full lossless-JSON expected-output comparison outside every timed region.",
            memory: "Process memory snapshots, post-GC retained delta, cumulative process peak RSS; not allocation totals or per-case isolated peaks.",
            concurrency: "Three independent Promise.all invocations in one JS thread, not parallel throughput.",
        },
        workloads: rows, instrumentation,
    };
    const text = JSON.stringify(report, null, 2);
    if (process.env.FML_BENCHMARK_OUTPUT) writeFileSync(process.env.FML_BENCHMARK_OUTPUT, text + "\n", {flag: "wx"});
    console.log(text);
}

main().catch(error => { console.error(error); process.exitCode = 1; });
