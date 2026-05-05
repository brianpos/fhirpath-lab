// CLI entry: `npm run generate:fhirpath-spec [-- --ref <branchOrCommit>]`
//
// Fetches `functions.json` and `operations.json` from the HL7/FHIRPath repository
// at the requested ref and writes them verbatim into
// `helpers/fhirpath-spec/generated/`. The TypeScript loader in
// `helpers/fhirpath-spec/index.ts` reads these JSON files at module load.
//
// The fetched files are validated against the structural shape used by the
// loader so a malformed upstream change fails loudly here rather than at
// runtime in the lab.

import * as fs from "fs";
import * as path from "path";
import * as https from "https";

const DEFAULT_REF = "BP-2026-03-quantity-preview";
const REPO = "HL7/FHIRPath";
const FILES = ["functions.json", "operations.json"];

interface CliArgs {
    ref: string;
    write: boolean;
    fromDir?: string;
}

function parseArgs(argv: string[]): CliArgs {
    const args: CliArgs = { ref: DEFAULT_REF, write: true };
    for (let i = 0; i < argv.length; i++) {
        const a = argv[i];
        if (a === "--ref") {
            const v = argv[++i];
            if (!v) throw new Error("--ref requires a value");
            args.ref = v;
        } else if (a === "--from-dir") {
            const v = argv[++i];
            if (!v) throw new Error("--from-dir requires a value");
            args.fromDir = v;
        } else if (a === "--no-write") {
            args.write = false;
        } else if (a === "--help" || a === "-h") {
            console.log(
                "Usage: npm run generate:fhirpath-spec -- [--ref <ref>] [--from-dir <dir>] [--no-write]",
            );
            process.exit(0);
        } else {
            throw new Error(`Unknown argument: ${a}`);
        }
    }
    return args;
}

function fetchUrl(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
        https
            .get(url, (res) => {
                if (res.statusCode !== 200) {
                    res.resume();
                    reject(new Error(`GET ${url} -> ${res.statusCode}`));
                    return;
                }
                let body = "";
                res.setEncoding("utf8");
                res.on("data", (chunk) => (body += chunk));
                res.on("end", () => resolve(body));
            })
            .on("error", reject);
    });
}

function validateFunctions(doc: any): void {
    if (!doc || !Array.isArray(doc.categories)) {
        throw new Error("functions.json: missing top-level `categories` array");
    }
    for (const cat of doc.categories) {
        if (typeof cat?.name !== "string") {
            throw new Error("functions.json: category missing `name`");
        }
        if (!Array.isArray(cat.functions)) {
            throw new Error(`functions.json: category ${cat.name} missing functions[]`);
        }
        for (const f of cat.functions) {
            if (typeof f.functionName !== "string") {
                throw new Error(`functions.json: function in ${cat.name} missing functionName`);
            }
            if (typeof f.returnType !== "string") {
                throw new Error(`functions.json: ${f.functionName} missing returnType`);
            }
            if (f.arguments != null && !Array.isArray(f.arguments)) {
                throw new Error(`functions.json: ${f.functionName} arguments must be an array`);
            }
            if (f.typeMapping != null && !Array.isArray(f.typeMapping)) {
                throw new Error(`functions.json: ${f.functionName} typeMapping must be an array`);
            }
        }
    }
}

function validateOperations(doc: any): void {
    if (!doc || !Array.isArray(doc.categories)) {
        throw new Error("operations.json: missing top-level `categories` array");
    }
    for (const cat of doc.categories) {
        if (typeof cat?.name !== "string") {
            throw new Error("operations.json: category missing `name`");
        }
        if (!Array.isArray(cat.operations)) {
            throw new Error(`operations.json: category ${cat.name} missing operations[]`);
        }
        for (const o of cat.operations) {
            if (typeof o.operationName !== "string") {
                throw new Error(`operations.json: operation in ${cat.name} missing operationName`);
            }
            if (typeof o.returnType !== "string") {
                throw new Error(`operations.json: ${o.operationName} missing returnType`);
            }
        }
    }
}

async function main(): Promise<void> {
    const args = parseArgs(process.argv.slice(2));
    const outDir = path.resolve(__dirname, "..", "..", "helpers", "fhirpath-spec", "generated");
    fs.mkdirSync(outDir, { recursive: true });

    for (const file of FILES) {
        let body: string;
        if (args.fromDir) {
            const src = path.resolve(args.fromDir, file);
            console.log(`Reading ${src}`);
            body = fs.readFileSync(src, "utf8");
        } else {
            const url = `https://raw.githubusercontent.com/${REPO}/${args.ref}/${file}`;
            console.log(`Fetching ${url}`);
            body = await fetchUrl(url);
        }

        let parsed: any;
        try {
            parsed = JSON.parse(body);
        } catch (e) {
            throw new Error(`${file} is not valid JSON: ${(e as Error).message}`);
        }
        if (file === "functions.json") validateFunctions(parsed);
        else if (file === "operations.json") validateOperations(parsed);

        if (args.write) {
            const dest = path.resolve(outDir, file);
            // Re-serialise to canonical 2-space indent so diffs stay clean.
            fs.writeFileSync(dest, JSON.stringify(parsed, null, 2) + "\n", "utf8");
            console.log(`Wrote ${dest}`);
        }
    }
}

main().catch((err) => {
    console.error(err.stack ?? err.message ?? err);
    process.exit(1);
});
