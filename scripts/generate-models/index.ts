// CLI entry: `npm run generate:models -- --version <r4|r4b|r5|r6>` (one or more).
//
// Flags:
//   --version <key>      repeatable; if omitted, runs all four versions.
//   --from-dir <path>    use pre-downloaded bundles in <path>/<version>/profiles-*.json
//                        instead of fetching from hl7.org. Useful for offline / air-gapped runs.
//   --base-url <url>     override fetch base URL (default https://hl7.org/fhir/).
//   --force              ignore cache and re-download.
//   --no-write           run the pipeline but skip writing files (sanity check only).

import * as path from "path";
import { buildVersion, type FhirVersionKey } from "./build-type-model";
import { fetchAllBundles, loadBundlesFromDir } from "./fetch-bundles";
import { emit } from "./emit";

const ALL_VERSIONS: FhirVersionKey[] = ["r4", "r4b", "r5", "r6"];

interface CliArgs {
    versions: FhirVersionKey[];
    fromDir?: string;
    baseUrl?: string;
    force: boolean;
    write: boolean;
}

function parseArgs(argv: string[]): CliArgs {
    const args: CliArgs = { versions: [], force: false, write: true };
    for (let i = 0; i < argv.length; i++) {
        const a = argv[i];
        if (a === "--version") {
            const v = argv[++i];
            if (!v || !ALL_VERSIONS.includes(v as FhirVersionKey)) {
                throw new Error(`--version must be one of ${ALL_VERSIONS.join(", ")} (got ${v})`);
            }
            args.versions.push(v as FhirVersionKey);
        } else if (a === "--from-dir") {
            args.fromDir = argv[++i];
        } else if (a === "--base-url") {
            args.baseUrl = argv[++i];
        } else if (a === "--force") {
            args.force = true;
        } else if (a === "--no-write") {
            args.write = false;
        } else if (a === "--help" || a === "-h") {
            printUsage();
            process.exit(0);
        } else {
            throw new Error(`unknown argument: ${a}`);
        }
    }
    if (args.versions.length === 0) args.versions = [...ALL_VERSIONS];
    return args;
}

function printUsage(): void {
    // eslint-disable-next-line no-console
    console.log(
        [
            "Usage: npm run generate:models -- [options]",
            "",
            "Options:",
            "  --version <r4|r4b|r5|r6>   FHIR version (repeatable; default: all four)",
            "  --from-dir <path>          load pre-downloaded bundles from <path>/<version>/",
            "  --base-url <url>           override HL7 base URL (default https://hl7.org/fhir/)",
            "  --force                    ignore cache and re-download bundles",
            "  --no-write                 don't write output files (dry run)",
        ].join("\n")
    );
}

async function main(): Promise<void> {
    const args = parseArgs(process.argv.slice(2));
    for (const v of args.versions) {
        // eslint-disable-next-line no-console
        console.error(`[generate:models] version=${v}`);
        const bundles = args.fromDir
            ? loadBundlesFromDir(path.join(args.fromDir, v))
            : await fetchAllBundles(v, { baseUrl: args.baseUrl, force: args.force });
        const result = buildVersion(v, bundles);
        // eslint-disable-next-line no-console
        console.error(`[generate:models] ${v}: built ${result.entries.length} TypeModels`);
        if (args.write) {
            const files = emit(result);
            // eslint-disable-next-line no-console
            console.error(`[generate:models] ${v}: wrote ${files.length} files`);
        }
    }
}

if (require.main === module) {
    main().catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err.stack ?? err.message ?? err);
        process.exit(1);
    });
}
