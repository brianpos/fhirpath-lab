/*
 * Comparison contract and exact-number normalization adapted from Ignixa's
 * FmlXverComparisonTests / FmlXverComparisonFixture (MIT).
 * Copyright (c) 2026 Ignixa Contributors. All rights reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import {readdir, readFile, realpath, mkdir, writeFile} from "node:fs/promises";
import {basename, extname, isAbsolute, join, relative, resolve, sep} from "node:path";
import {performance} from "node:perf_hooks";
import {isLosslessNumber} from "lossless-json";
import {getModelProvider, parseFmlModel, type FmlDiagnostic, type FmlSource} from "@fhirpath-lab/validator";
import {
    compileConceptMap, createSingleInputRequest, FmlExecutor, parseFmlJson, stringifyFmlJson, translateConceptMap,
    type FmlExecutionOptions, type FmlExecutorResult, type PreparedFmlProgram,
} from "../index";

export interface XverComparisonOptions {
    corpusPath: string;
    examplesPath: string;
    referencePath: string;
    outputPath: string;
    reportPath?: string;
}

export interface JsonMismatch {
    path: string;
    reason: string;
    expected?: string;
    actual?: string;
}

function record(value: unknown): value is Record<string, unknown> {
    return value !== null && typeof value === "object" && !Array.isArray(value) && !isLosslessNumber(value);
}

function numberText(value: unknown): string | undefined {
    return isLosslessNumber(value) ? value.value : typeof value === "number" && Number.isFinite(value) ? String(value) : undefined;
}

export function normalizeJsonNumber(text: string): string {
    const match = /^(-?)(\d+)(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/.exec(text);
    if (!match) throw new Error(`Invalid JSON number '${text}'.`);
    let digits = (match[2] + (match[3] ?? "")).replace(/^0+/, "");
    if (!digits) return "0";
    const significant = digits.replace(/0+$/, "");
    const exponent = BigInt(match[4] ?? "0") - BigInt(match[3]?.length ?? 0) + BigInt(digits.length - significant.length);
    digits = significant;
    return `${match[1]}${digits}e${exponent}`;
}

function describe(value: unknown): string {
    if (Array.isArray(value)) return `array(${value.length})`;
    if (record(value)) return "object";
    const text = stringifyFmlJson(value);
    return text.length > 200 ? text.slice(0, 197) + "..." : text;
}

export function compareXverJson(expected: unknown, actual: unknown, maxMismatches = 10): JsonMismatch[] {
    if (!Number.isSafeInteger(maxMismatches) || maxMismatches < 1) throw new Error("maxMismatches must be a positive safe integer.");
    const mismatches: JsonMismatch[] = [];
    const visit = (expected: unknown, actual: unknown, path: string): void => {
        if (mismatches.length >= maxMismatches) return;
        const expectedNumber = numberText(expected);
        const actualNumber = numberText(actual);
        if (expectedNumber !== undefined && actualNumber !== undefined) {
            if (normalizeJsonNumber(expectedNumber) !== normalizeJsonNumber(actualNumber)) {
                mismatches.push({path, reason: "Different numeric value.", expected: expectedNumber, actual: actualNumber});
            }
        } else if (Array.isArray(expected) && Array.isArray(actual)) {
            if (expected.length !== actual.length) {
                mismatches.push({path, reason: "Different array length.", expected: String(expected.length), actual: String(actual.length)});
            }
            for (let index = 0; index < Math.min(expected.length, actual.length); index++) visit(expected[index], actual[index], `${path}[${index}]`);
        } else if (record(expected) && record(actual)) {
            for (const name of Object.keys(expected).sort()) {
                const child = `${path}[${JSON.stringify(name)}]`;
                if (!Object.hasOwn(actual, name)) {
                    if (mismatches.length < maxMismatches) mismatches.push({path: child, reason: "Missing property.", expected: describe(expected[name])});
                } else visit(expected[name], actual[name], child);
            }
            for (const name of Object.keys(actual).sort()) {
                if (!Object.hasOwn(expected, name) && mismatches.length < maxMismatches) {
                    mismatches.push({path: `${path}[${JSON.stringify(name)}]`, reason: "Unexpected property.", actual: describe(actual[name])});
                }
            }
        } else if (expected !== actual && mismatches.length < maxMismatches) {
            mismatches.push({path, reason: "Different value or JSON kind.", expected: describe(expected), actual: describe(actual)});
        }
    };
    visit(expected, actual, "$");
    return mismatches;
}

export interface XverCaseResult {
    fileName: string;
    sourceType?: string;
    targetType?: string;
    mapPath?: string;
    referenceExists: boolean;
    status: "pass" | "unmapped" | "input-invalid" | "preparation-failure" | "execution-failure"
        | "invariant-failure" | "missing-reference" | "reference-invalid" | "output-mismatch" | "output-error";
    preparationId?: string;
    diagnostics?: FmlDiagnostic[];
    issues?: string[];
    mismatches?: JsonMismatch[];
    conversionMs?: number;
    outputPath?: string;
    inputBytes?: number;
}

export interface XverPreparationResult {
    id: string;
    mapPath: string;
    targetType?: string;
    status: "success" | "failure" | "not-implemented";
    milliseconds: number;
    diagnostics: FmlDiagnostic[];
    message?: string;
}

export interface XverComparisonReport {
    schemaVersion: number;
    generatedAt: string;
    paths: Required<XverComparisonOptions>;
    setup: {mapFiles: number; parsedMaps: number; mapErrors: {fileName: string; diagnostics: FmlDiagnostic[]}[];
        conceptMapFiles: number; conceptMapUrls: number; totalInputs: number; referenceFiles: number; milliseconds: number};
    summary: {mapped: number; unmapped: number; missingReferences: number; pass: number; outputsWritten: number;
        statuses: Partial<Record<XverCaseResult["status"], number>>};
    preparations: XverPreparationResult[];
    cases: XverCaseResult[];
}

async function utf8(path: string): Promise<string> {
    return (await readFile(path, "utf8")).replace(/^\uFEFF/, "");
}

async function files(directory: string, recursive = false): Promise<string[]> {
    const result: string[] = [];
    for (const entry of (await readdir(directory, {withFileTypes: true})).sort((a, b) => a.name.localeCompare(b.name))) {
        const path = join(directory, entry.name);
        if (entry.isFile()) result.push(path);
        else if (recursive && entry.isDirectory()) result.push(...await files(path, true));
    }
    return result;
}

export async function validateXverPaths(options: XverComparisonOptions): Promise<Required<XverComparisonOptions>> {
    for (const [name, path] of Object.entries(options)) {
        if (path !== undefined && (!path.trim() || !isAbsolute(path))) throw new Error(`${name} must be an absolute path.`);
    }
    const roots = await Promise.all([options.corpusPath, options.examplesPath, options.referencePath].map(path => realpath(path)));
    const outputPath = resolve(options.outputPath);
    const reportPath = resolve(options.reportPath ?? join(outputPath, "comparison-report.json"));
    const physical = async (path: string): Promise<string> => {
        try { return await realpath(path); }
        catch (error) {
            if (!(error instanceof Error) || !("code" in error) || error.code !== "ENOENT") throw error;
            const parent = resolve(path, "..");
            if (parent === path) throw error;
            return join(await physical(parent), basename(path));
        }
    };
    const protectedPaths = [...roots, resolve(options.corpusPath), resolve(options.examplesPath), resolve(options.referencePath)];
    for (const path of [outputPath, reportPath, await physical(outputPath), await physical(reportPath)]) {
        for (const protectedPath of protectedPaths) {
            const child = relative(protectedPath.toLowerCase(), path.toLowerCase());
            const ancestor = relative(path.toLowerCase(), protectedPath.toLowerCase());
            if (!child || !child.startsWith(".." + sep) && child !== ".." && !isAbsolute(child)
                || !ancestor || !ancestor.startsWith(".." + sep) && ancestor !== ".." && !isAbsolute(ancestor)) {
                throw new Error("Comparison outputs/reports must be separate from input, reference and map directories.");
            }
        }
    }
    return {...options, corpusPath: roots[0], examplesPath: roots[1], referencePath: roots[2], outputPath, reportPath};
}

export async function loadXverTerminology(inputDirectory: string): Promise<{
    mapCount: number; urlCount: number; translate: NonNullable<FmlExecutionOptions["translate"]>;
}> {
    const resources = new Map<string, unknown>();
    const compiled = new Map<unknown, ReturnType<typeof compileConceptMap>>();
    let mapCount = 0;
    for (const directory of ["codes", "resources"]) {
        for (const file of await files(join(inputDirectory, directory), true)) {
            if (!/^ConceptMap.*\.json$/i.test(basename(file))) continue;
            const resource = parseFmlJson(await utf8(file));
            if (!record(resource) || resource.resourceType !== "ConceptMap" || typeof resource.url !== "string") {
                throw new Error(`Invalid ConceptMap resource '${file}'.`);
            }
            const urls = [resource.url, ...(Array.isArray(resource.relatedArtifact) ? resource.relatedArtifact.flatMap(artifact =>
                record(artifact) && artifact.type === "predecessor" && typeof artifact.resource === "string" ? [artifact.resource] : []) : [])];
            for (const url of urls) {
                if (!url.trim() || resources.has(url)) throw new Error(`Missing or duplicate ConceptMap URL '${url}' in '${file}'.`);
                resources.set(url, resource);
            }
            mapCount++;
        }
    }
    if (!mapCount) throw new Error("No cross-version ConceptMaps found.");
    return {
        mapCount, urlCount: resources.size,
        translate: async (source, canonical, output) => {
            const resource = resources.get(canonical);
            if (!resource) throw new Error(`No local ConceptMap is registered for '${canonical}'.`);
            let map = compiled.get(resource);
            if (!map) { map = compileConceptMap(resource); compiled.set(resource, map); }
            const values = translateConceptMap(map, source, output);
            if (!values.length) throw new Error(`ConceptMap '${canonical}' has no translation for the supplied coded value.`);
            return values;
        },
    };
}

export async function runXverComparison(
    options: XverComparisonOptions,
    onCase?: (result: XverCaseResult) => Promise<void>,
): Promise<XverComparisonReport> {
    const started = performance.now();
    const paths = await validateXverPaths(options);
    const mapDirectory = join(paths.corpusPath, "input", "R4toR3");
    const mapFiles = (await files(mapDirectory)).filter(file => extname(file).toLowerCase() === ".fml");
    if (!mapFiles.length) throw new Error(`No R4-to-STU3 FML maps found in '${mapDirectory}'.`);
    const sources: FmlSource[] = [];
    const maps = new Map<string, {source: FmlSource; entry: string; targetType?: string}>();
    const mapErrors: XverComparisonReport["setup"]["mapErrors"] = [];
    for (const file of mapFiles) {
        const source: FmlSource = {sourceName: file, sourceText: await utf8(file), defaultFhirVersion: "R4"};
        const model = parseFmlModel(source.sourceText);
        if (!model) {
            mapErrors.push({fileName: basename(file), diagnostics: [{severity: "error", message: "Strict FML parsing failed.", line: 1, column: 0, sourceName: file}]});
            continue;
        }
        const group = model.groups[0];
        const target = group?.parameters.filter(parameter => parameter.mode === "target");
        const structure = target?.length === 1 ? model.structures.find(structure => structure.mode === "target"
            && (structure.alias === target[0].type || structure.url.split("/").at(-1) === target[0].type)) : undefined;
        sources.push(source);
        maps.set(basename(file, extname(file)), {source, entry: group.name, targetType: structure?.url.split("/").at(-1)});
    }
    const terminology = await loadXverTerminology(join(paths.corpusPath, "input"));
    const inputFiles = await files(paths.examplesPath);
    if (!inputFiles.length) throw new Error("No R4 example files found.");
    if (inputFiles.some(file => extname(file).toLowerCase() !== ".json")) throw new Error("Cross-version comparison accepts JSON input files only.");
    const referenceFiles = (await files(paths.referencePath)).filter(file => extname(file).toLowerCase() === ".json");
    const references = new Set(referenceFiles.map(file => basename(file)));
    await mkdir(paths.outputPath, {recursive: true});
    await mkdir(resolve(paths.reportPath, ".."), {recursive: true});
    const report: XverComparisonReport = {
        schemaVersion: 1, generatedAt: new Date().toISOString(), paths,
        setup: {mapFiles: mapFiles.length, parsedMaps: sources.length, mapErrors, conceptMapFiles: terminology.mapCount,
            conceptMapUrls: terminology.urlCount, totalInputs: inputFiles.length, referenceFiles: referenceFiles.length,
            milliseconds: performance.now() - started},
        summary: {mapped: 0, unmapped: 0, missingReferences: 0, pass: 0, outputsWritten: 0, statuses: {}},
        preparations: [], cases: [],
    };
    const engine = new FmlExecutor({maps: sources});
    let preparation: {sourceType: string; result: FmlExecutorResult<PreparedFmlProgram>} | undefined;
    const schema = getModelProvider("stu3");
    const complete = async (result: XverCaseResult) => {
        report.cases.push(result);
        report.summary.statuses[result.status] = (report.summary.statuses[result.status] ?? 0) + 1;
        if (result.status === "pass") report.summary.pass++;
        if (result.outputPath) report.summary.outputsWritten++;
        await onCase?.(result);
    };
    const indexedInputs: {inputPath: string; sourceType: string}[] = [];
    for (const inputPath of inputFiles) {
        const result: XverCaseResult = {fileName: basename(inputPath), referenceExists: references.has(basename(inputPath)), status: "input-invalid"};
        try {
            const text = await utf8(inputPath);
            result.inputBytes = Buffer.byteLength(text);
            const input = parseFmlJson(text);
            if (!record(input) || typeof input.resourceType !== "string" || !input.resourceType.trim()) throw new Error("Input has no string resourceType.");
            indexedInputs.push({inputPath, sourceType: input.resourceType});
        } catch (error) {
            result.issues = [error instanceof Error ? error.message : String(error)];
            await complete(result);
        }
    }
    // Successful preparations retain the whole import graph; process each type together and release it.
    indexedInputs.sort((left, right) => left.sourceType.localeCompare(right.sourceType));
    for (const {inputPath, sourceType} of indexedInputs) {
        const fileName = basename(inputPath);
        const result: XverCaseResult = {fileName, referenceExists: references.has(fileName), status: "input-invalid"};
        let input: unknown;
        let original: string;
        try {
            const text = await utf8(inputPath);
            result.inputBytes = Buffer.byteLength(text);
            input = parseFmlJson(text);
            if (!record(input) || typeof input.resourceType !== "string" || !input.resourceType.trim()) throw new Error("Input has no string resourceType.");
            if (input.resourceType !== sourceType) throw new Error("Input resourceType changed after indexing.");
            result.sourceType = input.resourceType;
            original = stringifyFmlJson(input);
        } catch (error) {
            result.issues = [error instanceof Error ? error.message : String(error)];
            await complete(result);
            continue;
        }
        const map = maps.get(result.sourceType);
        if (!map) { result.status = "unmapped"; report.summary.unmapped++; await complete(result); continue; }
        report.summary.mapped++;
        if (!result.referenceExists) report.summary.missingReferences++;
        result.mapPath = map.source.sourceName;
        result.targetType = map.targetType;
        result.preparationId = result.sourceType;
        let prepared = preparation?.sourceType === result.sourceType ? preparation.result : undefined;
        if (!prepared) {
            preparation = undefined;
            const start = performance.now();
            prepared = await engine.prepare(map.source);
            preparation = {sourceType: result.sourceType, result: prepared};
            report.preparations.push({id: result.sourceType, mapPath: result.mapPath!, targetType: map.targetType,
                status: prepared.status, milliseconds: performance.now() - start, diagnostics: prepared.diagnostics,
                ...(prepared.status === "not-implemented" ? {message: prepared.message} : {})});
        }
        if (prepared.status !== "success") { result.status = "preparation-failure"; await complete(result); continue; }
        let actual: unknown;
        let converting = true;
        try {
            const request = createSingleInputRequest(prepared.value, input, map.entry);
            const start = performance.now();
            const execution = await engine.execute(request, {
                translate: terminology.translate, limits: {maxOutputNodes: 5_000_000},
                resolve: async () => { throw new Error("Cross-version comparison has no resource-resolution host service; network resolution is disabled."); },
            });
            result.conversionMs = performance.now() - start;
            if (execution.status !== "success") {
                result.status = "execution-failure"; result.diagnostics = execution.diagnostics;
                if (stringifyFmlJson(input) !== original) result.issues = ["Conversion mutated the R4 input."];
                await complete(result); continue;
            }
            actual = execution.value.targets[0].value;
            converting = false;
            const issues: string[] = [];
            if (stringifyFmlJson(input) !== original) issues.push("Conversion mutated the R4 input.");
            if (!record(actual) || actual.resourceType !== map.targetType) issues.push("Output resourceType does not match the selected map target.");
            if (!record(actual) || typeof actual.resourceType !== "string" || !schema.lookupByTypeName(actual.resourceType)) issues.push("Output type is not known to the STU3 model.");
            if (record(input) && input.id !== undefined && (!record(actual) || actual.id !== input.id)) issues.push("Inherited Resource mapping did not preserve id.");
            const outputText = stringifyFmlJson(actual, 2);
            actual = parseFmlJson(outputText);
            const outputPath = join(paths.outputPath, fileName);
            if (resolve(outputPath).toLowerCase() === paths.reportPath.toLowerCase()) throw new Error("Report filename conflicts with a converted resource.");
            await writeFile(outputPath, outputText + "\n", {encoding: "utf8", flag: "wx"});
            result.outputPath = outputPath;
            if (issues.length) { result.status = "invariant-failure"; result.issues = issues; await complete(result); continue; }
        } catch (error) {
            result.status = converting ? "execution-failure" : "output-error";
            result.issues = [error instanceof Error ? error.message : String(error)];
            await complete(result); continue;
        }
        if (!result.referenceExists) { result.status = "missing-reference"; await complete(result); continue; }
        let expected: unknown;
        try { expected = parseFmlJson(await utf8(join(paths.referencePath, fileName))); }
        catch (error) {
            result.status = "reference-invalid"; result.issues = [String(error)]; await complete(result); continue;
        }
        const mismatches = compareXverJson(expected, actual);
        result.status = mismatches.length ? "output-mismatch" : "pass";
        if (mismatches.length) result.mismatches = mismatches;
        await complete(result);
    }
    await writeFile(paths.reportPath, JSON.stringify(report, null, 2) + "\n", {encoding: "utf8", flag: "wx"});
    if (!report.summary.mapped) throw new Error("No input resources have a corresponding R4-to-STU3 map; see comparison report.");
    return report;
}
