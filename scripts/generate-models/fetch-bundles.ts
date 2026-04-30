// Download FHIR definition Bundles (profiles-resources.json + profiles-types.json)
// from https://hl7.org/fhir/<version>/ with on-disk caching to make re-runs offline-capable.
//
// See docs/custom-model-generator-plan.md "Bundle fetching".

import * as fs from "fs";
import * as https from "https";
import * as path from "path";
import type { SDBundle } from "./sd-types";

export type FhirVersion = "r4" | "r4b" | "r5" | "r6";

const VERSION_PATHS: Record<FhirVersion, string> = {
    r4: "R4",
    r4b: "R4B",
    r5: "R5",
    // R6 is still in ballot — `https://hl7.org/fhir/R6/` 404s. Point at the latest
    // published ballot instead. Override with `--base-url` if a newer ballot ships.
    r6: "6.0.0-ballot4",
};

export const BUNDLE_NAMES = ["profiles-resources.json", "profiles-types.json"] as const;
export type BundleName = (typeof BUNDLE_NAMES)[number];

export interface FetchOptions {
    /** Override base URL (mainly for tests). Defaults to https://hl7.org/fhir/ */
    baseUrl?: string;
    /** Cache directory. Defaults to scripts/generate-models/.cache/<version>/ */
    cacheDir?: string;
    /** When true, ignore cached files and re-download. */
    force?: boolean;
}

function defaultCacheDir(version: FhirVersion): string {
    return path.resolve(__dirname, ".cache", version);
}

function httpsGet(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const req = https.get(url, (res) => {
            // Follow simple redirects.
            if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                res.resume();
                resolve(httpsGet(res.headers.location));
                return;
            }
            if (!res.statusCode || res.statusCode >= 400) {
                res.resume();
                reject(new Error(`GET ${url} -> HTTP ${res.statusCode}`));
                return;
            }
            const chunks: Buffer[] = [];
            res.on("data", (c: Buffer) => chunks.push(c));
            res.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
            res.on("error", reject);
        });
        req.on("error", reject);
        req.setTimeout(60_000, () => {
            req.destroy(new Error(`GET ${url} timed out`));
        });
    });
}

async function fetchBundle(
    version: FhirVersion,
    bundle: BundleName,
    opts: FetchOptions
): Promise<SDBundle> {
    const cacheDir = opts.cacheDir ?? defaultCacheDir(version);
    const cacheFile = path.join(cacheDir, bundle);
    if (!opts.force && fs.existsSync(cacheFile)) {
        return JSON.parse(fs.readFileSync(cacheFile, "utf8")) as SDBundle;
    }
    const base = (opts.baseUrl ?? "https://hl7.org/fhir/").replace(/\/?$/, "/");
    const url = `${base}${VERSION_PATHS[version]}/${bundle}`;
    // eslint-disable-next-line no-console
    console.error(`[fetch-bundles] downloading ${url}`);
    const body = await httpsGet(url);
    const parsed = JSON.parse(body) as SDBundle;
    fs.mkdirSync(cacheDir, { recursive: true });
    fs.writeFileSync(cacheFile, body, "utf8");
    return parsed;
}

export async function fetchAllBundles(
    version: FhirVersion,
    opts: FetchOptions = {}
): Promise<SDBundle[]> {
    const bundles: SDBundle[] = [];
    for (const name of BUNDLE_NAMES) {
        bundles.push(await fetchBundle(version, name, opts));
    }
    return bundles;
}

/** Load bundles from a directory of pre-downloaded JSON files (for offline / test use). */
export function loadBundlesFromDir(dir: string): SDBundle[] {
    const bundles: SDBundle[] = [];
    for (const name of BUNDLE_NAMES) {
        const file = path.join(dir, name);
        if (!fs.existsSync(file)) {
            throw new Error(`bundle file not found: ${file}`);
        }
        bundles.push(JSON.parse(fs.readFileSync(file, "utf8")) as SDBundle);
    }
    return bundles;
}
