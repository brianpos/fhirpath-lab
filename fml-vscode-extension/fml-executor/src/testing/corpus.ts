import {readdir, readFile} from "node:fs/promises";
import {basename, extname, join, relative, resolve} from "node:path";
import type {FmlSource} from "../contracts";

export interface FmlCorpusOptions {
    root: string;
    mapDirectories?: readonly string[];
}

export interface FmlCorpusCase {
    id: string;
    mapPath?: string;
    inputPath?: string;
    expectedOutputPath?: string;
    issues: string[];
}

export interface FmlCorpusFixture {
    source: FmlSource;
    inputText: string;
    expectedOutputText: string;
}

export async function discoverFmlCorpus(options: FmlCorpusOptions): Promise<FmlCorpusCase[]> {
    if (!options.root.trim()) throw new Error("FML corpus root must not be empty.");
    const root = resolve(options.root);
    const cases = new Map<string, FmlCorpusCase>();
    const add = async (
        directory: string,
        extension: string,
        field: "mapPath" | "inputPath" | "expectedOutputPath",
    ): Promise<void> => {
        for (const path of await collectFiles(directory, extension)) {
            const id = relative(directory, path).slice(0, -extension.length).split("\\").join("/");
            const fixture = cases.get(id) ?? {id, issues: []};
            if (fixture[field]) {
                throw new Error(`Duplicate ${field} for corpus case '${id}': ${fixture[field]} and ${path}`);
            }
            fixture[field] = path;
            cases.set(id, fixture);
        }
    };
    for (const directory of options.mapDirectories ?? [join("input", "examples"), "othermaps"]) {
        await add(join(root, directory), ".fml", "mapPath");
    }
    await add(join(root, "test-input-resources"), ".json", "inputPath");
    await add(join(root, "test-output-resources"), ".json", "expectedOutputPath");
    if (cases.size === 0) throw new Error(`No FML corpus cases found in '${root}'.`);

    for (const fixture of cases.values()) {
        if (!fixture.mapPath) fixture.issues.push("Missing FML map.");
        if (!fixture.inputPath) fixture.issues.push("Missing input resource.");
        if (!fixture.expectedOutputPath) fixture.issues.push("Missing expected output resource.");
    }
    return [...cases.values()].sort((left, right) => left.id.localeCompare(right.id));
}

export async function loadFmlCorpusFixture(fixture: FmlCorpusCase): Promise<FmlCorpusFixture> {
    if (!fixture.mapPath || !fixture.inputPath || !fixture.expectedOutputPath || fixture.issues.length > 0) {
        throw new Error(`Incomplete corpus case '${fixture.id}': ${fixture.issues.join(" ")}`);
    }
    const [sourceText, inputText, expectedOutputText] = await Promise.all([
        readFile(fixture.mapPath, "utf8"),
        readFile(fixture.inputPath, "utf8"),
        readFile(fixture.expectedOutputPath, "utf8"),
    ]);
    validateJson(inputText, fixture.inputPath);
    validateJson(expectedOutputText, fixture.expectedOutputPath);
    return {
        source: {sourceName: fixture.mapPath, sourceText},
        inputText,
        expectedOutputText,
    };
}

async function collectFiles(directory: string, extension: string): Promise<string[]> {
    const entries = await readdir(directory, {withFileTypes: true});
    const files: string[] = [];
    for (const entry of entries.sort((left, right) => left.name.localeCompare(right.name))) {
        const path = join(directory, entry.name);
        if (entry.isDirectory()) files.push(...await collectFiles(path, extension));
        else if (entry.isFile() && extname(basename(path)) === extension) files.push(path);
    }
    return files;
}

function validateJson(text: string, path: string): void {
    try {
        // Validate syntax only; retain the original numeric text for lossless execution comparisons.
        JSON.parse(text);
    } catch (error) {
        throw new Error(`Invalid JSON fixture '${path}'.`, {cause: error});
    }
}
