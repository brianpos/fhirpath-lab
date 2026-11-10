import assert from "node:assert/strict";
import {createHash} from "node:crypto";
import {mkdir, readFile, readdir, writeFile} from "node:fs/promises";
import {Session} from "node:inspector/promises";
import {cpus, platform, release} from "node:os";
import {dirname, isAbsolute, join} from "node:path";
import {performance} from "node:perf_hooks";
import {createSingleInputRequest, FmlExecutor, parseFmlJson, stringifyFmlJson} from "../index";
import {compareXverJson, loadXverTerminology, validateXverPaths, type XverComparisonReport} from "./xver-comparison";

function count(name: string, fallback: number, minimum: number): number {
    const value = Number(process.env[name] ?? fallback);
    if (!Number.isSafeInteger(value) || value < minimum || value > 20) {
        throw new Error(`${name} must be an integer from ${minimum} to 20.`);
    }
    return value;
}

function summary(values: number[]) {
    const sorted = [...values].sort((a, b) => a - b);
    return {medianMs: sorted[Math.floor(sorted.length / 2)], minMs: sorted[0],
        maxMs: sorted.at(-1), samplesMs: values};
}

async function main(): Promise<void> {
    const baselinePath = process.env.FML_XVER_BENCHMARK_BASELINE;
    const reportPath = process.env.FML_XVER_BENCHMARK_REPORT;
    if (!baselinePath || !reportPath || !isAbsolute(baselinePath) || !isAbsolute(reportPath)) {
        throw new Error("FML_XVER_BENCHMARK_BASELINE and FML_XVER_BENCHMARK_REPORT must be absolute file paths.");
    }
    const baselineText = await readFile(baselinePath, "utf8");
    const baseline: XverComparisonReport = JSON.parse(baselineText);
    const paths = await validateXverPaths({...baseline.paths, outputPath: dirname(reportPath), reportPath});
    await mkdir(dirname(reportPath), {recursive: true});
    const samples = count("FML_XVER_BENCHMARK_SAMPLES", 7, 3);
    const warmups = count("FML_XVER_BENCHMARK_WARMUPS", 3, 1);
    const fileNames = (process.env.FML_XVER_BENCHMARK_FILES
        ?? "contract.profile.json,explanationofbenefit.profile.json,cqllibrary.profile.json,profiles-types.json,patient-example.json")
        .split(",").map(name => name.trim());
    if (fileNames.some(name => !name) || new Set(fileNames).size !== fileNames.length) {
        throw new Error("FML_XVER_BENCHMARK_FILES must contain distinct case filenames.");
    }
    const profileCase = process.env.FML_XVER_BENCHMARK_PROFILE_CASE;
    if (profileCase && !fileNames.includes(profileCase)) throw new Error("The CPU profile case must be selected for benchmarking.");
    const selected = fileNames.map(fileName => {
        const result = baseline.cases.find(result => result.fileName === fileName);
        if (!result || !result.sourceType || !result.mapPath || result.status === "preparation-failure") {
            throw new Error(`Benchmark case '${fileName}' must have reached execution in the baseline.`);
        }
        if (!result.outputPath && !result.diagnostics?.length) throw new Error(`Case '${fileName}' has no output or execution diagnostic oracle.`);
        return result;
    });
    const sources = [];
    const mapsHash = createHash("sha256");
    const mapDirectory = join(paths.corpusPath, "input", "R4toR3");
    for (const name of (await readdir(mapDirectory)).filter(name => name.endsWith(".fml")).sort()) {
        const sourceText = (await readFile(join(mapDirectory, name), "utf8")).replace(/^\uFEFF/, "");
        mapsHash.update(name + "\0" + sourceText + "\0");
        sources.push({sourceName: join(mapDirectory, name), sourceText, defaultFhirVersion: "R4" as const});
    }
    const terminology = await loadXverTerminology(join(paths.corpusPath, "input"));
    const engine = new FmlExecutor({maps: sources});
    const rows = [];
    for (const result of selected) {
        const source = sources.find(source => source.sourceName === result.mapPath);
        if (!source) throw new Error(`Map '${result.mapPath}' is not in the selected checkout.`);
        const prepareStart = performance.now();
        const prepared = await engine.prepare(source);
        const prepareMs = performance.now() - prepareStart;
        assert.equal(prepared.status, "success", JSON.stringify(prepared.diagnostics));
        if (prepared.status !== "success") throw new Error("Benchmark preparation failed.");
        const inputText = (await readFile(join(paths.examplesPath, result.fileName), "utf8")).replace(/^\uFEFF/, "");
        const input = parseFmlJson(inputText);
        const original = stringifyFmlJson(input);
        const expected = result.outputPath ? parseFmlJson(await readFile(result.outputPath, "utf8")) : undefined;
        const profilePath = result.fileName === profileCase ? reportPath.replace(/\.json$/i, "") + ".cpuprofile" : undefined;
        let outputHash: string | undefined;
        const run = async (session?: Session): Promise<number> => {
            const request = createSingleInputRequest(prepared.value, input);
            if (session) await session.post("Profiler.start");
            const started = performance.now();
            const execution = await engine.execute(request, {
                translate: terminology.translate, limits: {maxOutputNodes: 5_000_000},
                resolve: async () => {
                    throw new Error("Cross-version comparison has no resource-resolution host service; network resolution is disabled.");
                },
            });
            const milliseconds = performance.now() - started;
            if (session) {
                const {profile} = await session.post("Profiler.stop");
                if (!profilePath) throw new Error("Missing CPU profile output path.");
                await writeFile(profilePath, JSON.stringify(profile), {flag: "wx"});
            }
            assert.equal(stringifyFmlJson(input), original, "Benchmark execution mutated its input.");
            if (result.outputPath) {
                assert.equal(execution.status, "success", JSON.stringify(execution.diagnostics));
                if (execution.status !== "success") throw new Error("Benchmark execution failed.");
                assert.deepEqual(compareXverJson(expected, execution.value.targets[0].value), [], result.fileName);
                outputHash = createHash("sha256").update(stringifyFmlJson(execution.value.targets[0].value)).digest("hex");
            } else {
                assert.equal(execution.status, "failure", result.fileName);
                assert.deepEqual(execution.diagnostics, result.diagnostics, result.fileName);
            }
            return milliseconds;
        };
        const firstExecutionMs = await run();
        for (let index = 0; index < warmups; index++) await run();
        global.gc?.();
        const before = process.memoryUsage();
        const timings: number[] = [];
        for (let index = 0; index < samples; index++) timings.push(await run());
        const afterWork = process.memoryUsage();
        global.gc?.();
        const afterGc = process.memoryUsage();
        if (profilePath) {
            const session = new Session();
            session.connect();
            try {
                await session.post("Profiler.enable");
                await run(session);
            } finally {
                session.disconnect();
            }
        }
        rows.push({fileName: result.fileName, sourceType: result.sourceType, status: result.status,
            inputBytes: Buffer.byteLength(inputText), prepareMs, firstExecutionMs, warmExecution: summary(timings),
            inputHash: createHash("sha256").update(inputText).digest("hex"), outputHash, profilePath,
            memory: {before, afterWork, afterGc}});
        console.log(JSON.stringify(rows.at(-1)));
    }
    const report = {generatedAt: new Date().toISOString(), baselinePath,
        baselineHash: createHash("sha256").update(baselineText).digest("hex"), mapsHash: mapsHash.digest("hex"),
        environment: {node: process.version, platform: platform(), release: release(), cpu: cpus()[0]?.model},
        policy: {samples, warmups, tracing: false, timing: "execute only; preparation, parsing, request creation and output checks excluded",
            preparation: "fresh program per case; first execution reported separately", gc: !!global.gc}, rows};
    await writeFile(reportPath, JSON.stringify(report, null, 2) + "\n", {flag: "wx"});
}

void main().catch(error => {
    console.error(error);
    process.exitCode = 1;
});
