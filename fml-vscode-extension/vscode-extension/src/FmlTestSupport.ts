import {promises as fs} from "node:fs";
import path from "node:path";

export interface FmlTestCaseFile {
    /** Absolute input path. */
    filePath: string;
    /** Path relative to the input folder, using forward slashes. */
    relativePath: string;
    /** First path segment when the file is in a sub folder (the resource type in cross-version layouts). */
    group?: string;
}

export function globToRegExp(pattern: string): RegExp {
    let source = "";
    for (let index = 0; index < pattern.length; index++) {
        const char = pattern[index];
        if (char === "*") {
            if (pattern[index + 1] === "*") {
                index++;
                if (pattern[index + 1] === "/") {
                    index++;
                    source += "(?:.*/)?";
                } else {source += ".*";}
            } else {source += "[^/]*";}
        } else if (char === "?") {source += "[^/]";}
        else {source += char.replace(/[.+^${}()|[\]\\]/g, "\\$&");}
    }
    return new RegExp(`^${source}$`, "i");
}

export function matchesAnyGlob(relativePath: string, patterns: readonly string[]): boolean {
    if (!patterns.length) {return true;}
    const name = relativePath.split("/").pop() ?? relativePath;
    return patterns.some(pattern => {
        const regex = globToRegExp(pattern);
        return regex.test(pattern.includes("/") ? relativePath : name);
    });
}

export async function discoverTestInputs(
    inputFolder: string,
    include: readonly string[] = [],
    extensions: readonly string[] = [".json"],
): Promise<FmlTestCaseFile[]> {
    const results: FmlTestCaseFile[] = [];
    const walk = async (directory: string): Promise<void> => {
        for (const entry of await fs.readdir(directory, {withFileTypes: true})) {
            const full = path.join(directory, entry.name);
            if (entry.isDirectory()) {await walk(full);}
            else if (extensions.includes(path.extname(entry.name).toLowerCase())) {
                const relativePath = path.relative(inputFolder, full).split(path.sep).join("/");
                if (!matchesAnyGlob(relativePath, include)) {continue;}
                const segments = relativePath.split("/");
                results.push({filePath: full, relativePath, group: segments.length > 1 ? segments[0] : undefined});
            }
        }
    };
    await walk(inputFolder);
    return results.sort((a, b) => a.relativePath.localeCompare(b.relativePath));
}

/** Resolves the expected-output file for an input, mirroring its relative path. */
export function expectedPathFor(expectedFolder: string, relativePath: string): string {
    return path.join(expectedFolder, ...relativePath.split("/"));
}

export interface JsonDifference {
    path: string;
    expected: unknown;
    actual: unknown;
}

function isObject(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Semantic JSON comparison: object key order is irrelevant, array order is significant. */
export function compareJson(
    expected: unknown,
    actual: unknown,
    ignoredProperties: ReadonlySet<string> = new Set(),
    at = "$",
    differences: JsonDifference[] = [],
): JsonDifference[] {
    if (Array.isArray(expected) && Array.isArray(actual)) {
        if (expected.length !== actual.length) {differences.push({path: `${at}.length`, expected: expected.length, actual: actual.length});}
        for (let index = 0; index < Math.min(expected.length, actual.length); index++) {
            compareJson(expected[index], actual[index], ignoredProperties, `${at}[${index}]`, differences);
        }
    } else if (isObject(expected) && isObject(actual)) {
        const keys = new Set([...Object.keys(expected), ...Object.keys(actual)]);
        for (const key of [...keys].sort()) {
            if (ignoredProperties.has(key)) {continue;}
            if (!(key in expected)) {differences.push({path: `${at}.${key}`, expected: undefined, actual: actual[key]});}
            else if (!(key in actual)) {differences.push({path: `${at}.${key}`, expected: expected[key], actual: undefined});}
            else {compareJson(expected[key], actual[key], ignoredProperties, `${at}.${key}`, differences);}
        }
    } else if (expected !== actual) {differences.push({path: at, expected, actual});}
    return differences;
}

/** Stable pretty-print with sorted keys so diffs show only real differences. */
export function canonicalJson(value: unknown, ignoredProperties: ReadonlySet<string> = new Set()): string {
    const normalize = (item: unknown): unknown => {
        if (Array.isArray(item)) {return item.map(normalize);}
        if (isObject(item)) {
            return Object.fromEntries(Object.keys(item).sort()
                .filter(key => !ignoredProperties.has(key)).map(key => [key, normalize(item[key])]));
        }
        return item;
    };
    return JSON.stringify(normalize(value), undefined, 2);
}

/** `$.contact[0].name` -> `Patient.contact.name` using the root resource's type. */
export function normalizeDifferencePath(root: unknown, differencePath: string): string {
    const type = isObject(root) && typeof root.resourceType === "string" ? root.resourceType : "";
    const trimmed = differencePath.replace(/^\$/, "").replace(/\[\d+\]/g, "");
    return `${type}${trimmed}`;
}

/**
 * Drops differences where the property (or one of its ancestors) is listed in
 * `propertyNotConverted` and is missing from the actual (converted) value.
 */
export function filterNotConverted(
    differences: JsonDifference[],
    root: unknown,
    propertyNotConverted: readonly string[] | undefined,
): JsonDifference[] {
    if (!propertyNotConverted?.length) {
        return differences;
    }
    const ignored = new Set(propertyNotConverted);
    return differences.filter(difference => {
        if (difference.actual !== undefined) {
            return true;
        }
        const segments = normalizeDifferencePath(root, difference.path).split(".");
        for (let length = segments.length; length > 0; length--) {
            if (ignored.has(segments.slice(0, length).join("."))) {
                return false;
            }
        }
        return true;
    });
}

/**
 * Case filter: a pattern matches the map path, the input path or `map :: input`.
 * `*` matches any characters; patterns without `*` match as a substring. Empty filter matches everything.
 */
export function matchesFilter(filter: readonly string[], mapPath: string, inputPath: string): boolean {
    if (!filter.length) {return true;}
    const candidates = [mapPath, inputPath, `${mapPath} :: ${inputPath}`].map(item => item.replace(/\\/g, "/"));
    return filter.some(pattern => {
        const escaped = pattern.split("*").map(part => part.replace(/[.+?^${}()|[\]\\]/g, "\\$&")).join(".*");
        const regex = new RegExp(pattern.includes("*") ? `^${escaped}$` : escaped, "i");
        return candidates.some(candidate => regex.test(candidate));
    });
}
