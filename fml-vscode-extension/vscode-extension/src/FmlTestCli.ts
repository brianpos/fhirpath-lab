import {promises as fs} from "node:fs";
import path from "node:path";
import {FML_TEST_CONFIG_FILE, FmlTestRunner, discoverTestSets, loadTestConfig} from "./FmlTestRunner";
import {buildJUnit, buildLcov, buildPropertyReport, type ReportedCase} from "./FmlTestReport";
import {createCliContextProvider} from "./FmlTestCliContext";

interface CliArgs {
    config: string;
    junit?: string;
    report?: string;
    lcov?: string;
    filter: string[];
    serverUrl?: string;
}

function parseArgs(argv: string[]): CliArgs {
    const args: CliArgs = {config: FML_TEST_CONFIG_FILE, filter: []};
    for (let index = 0; index < argv.length; index++) {
        const name = argv[index];
        const value = argv[index + 1];
        if (name === "--help" || name === "-h") {
            console.log("Usage: fml-test-cli [--config <.fml-tests.json>] [--junit <file>] [--report <file.md>] [--lcov <file>]\n  [--filter <pattern>]... map/input path filter (* wildcard, else substring)\n  [--server-url <url>] remote FML engine (overrides config; empty = local)");
            process.exit(0);
        }
        if (!["--config", "--junit", "--report", "--lcov", "--filter", "--server-url"].includes(name) || value === undefined) {
            throw new Error(`Unknown or incomplete argument '${name}'.`);
        }
        if (name === "--filter") {
            args.filter.push(value);
        } else if (name === "--server-url") {
            args.serverUrl = value;
        } else {
            (args as unknown as Record<string, string>)[name.slice(2)] = value;
        }
        index++;
    }
    return args;
}

async function main(): Promise<number> {
    const args = parseArgs(process.argv.slice(2));
    const config = await loadTestConfig(path.resolve(args.config));
    if (args.serverUrl !== undefined) {
        config.serverUrl = args.serverUrl;
        config.forceLocal = false;
    }
    const context = createCliContextProvider();
    const runner = new FmlTestRunner(config, {context, coverage: Boolean(args.report || args.lcov)});
    console.log(`Engine: ${runner.engine.kind === "local" ? "local" : runner.engine.serverUrl}`);
    const reported: ReportedCase[] = [];
    for (const set of await discoverTestSets(config, args.filter, context)) {
        for (const input of set.inputs) {
            const result = await runner.runCase(set.map, input);
            const mapFile = path.relative(config.maps, set.map.filePath);
            reported.push({mapFile, inputFile: input.relativePath, result});
            const label = result.status === "passed" ? "PASS" : result.status === "failed" ? "FAIL" : "ERROR";
            console.log(`${label} ${mapFile} :: ${input.relativePath} (${result.durationMs}ms)`);
            for (const message of result.messages) {
                console.log(`    ${message.text}`);
            }
            if (result.error) {
                console.log(`    ${result.error}`);
            }
        }
    }
    const failed = reported.filter(item => item.result.status !== "passed").length;
    console.log(`\n${reported.length - failed}/${reported.length} passed`);
    const coverage = runner.coverage.results();
    if (args.junit) {
        await fs.writeFile(args.junit, buildJUnit(reported));
    }
    if (args.report) {
        await fs.writeFile(args.report, buildPropertyReport(runner.usage.values(), coverage));
    }
    if (args.lcov) {
        await fs.writeFile(args.lcov, buildLcov(coverage));
    }
    return failed ? 1 : 0;
}

main().then(code => process.exit(code), error => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(2);
});
