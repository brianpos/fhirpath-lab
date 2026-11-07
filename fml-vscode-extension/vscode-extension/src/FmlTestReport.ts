import path from "node:path";
import type {FileRuleCoverage} from "./FmlTestCoverage";
import {modelPropertyPaths} from "./FmlStructureCheck";
import type {CaseResult, PropertyUsage} from "./FmlTestRunner";

export interface ReportedCase {
    mapFile: string;
    inputFile: string;
    result: CaseResult;
}

function list(items: string[]): string[] {
    return items.length ? items.map(item => `  - \`${item}\``) : ["  - _none_"];
}

/** Markdown report: rules that never fired, plus source/target model properties never seen in the data. */
export function buildPropertyReport(
    usages: Iterable<PropertyUsage>,
    coverage: readonly FileRuleCoverage[],
): string {
    const lines = ["# FML map coverage report", ""];
    for (const usage of [...usages].sort((a, b) => a.map.filePath.localeCompare(b.map.filePath))) {
        const {map} = usage;
        lines.push(`## ${path.basename(map.filePath)}`, "", `${usage.caseCount} test case(s) executed.`, "");
        const file = coverage.find(item => item.filePath === map.filePath);
        if (file) {
            const missed = file.sites.filter(site => !file.hits.has(site.location));
            const filtered = missed.filter(site => file.skips.get(site.location)?.filtered);
            const noValues = missed.filter(site => !file.skips.get(site.location)?.filtered && file.skips.get(site.location)?.noSourceValues);
            const unreached = missed.filter(site => !file.skips.has(site.location));
            const describe = (site: (typeof missed)[number]): string => `line ${site.startLine + 1}: ${site.location}`;
            lines.push(`**Rules executed:** ${file.sites.length - missed.length}/${file.sites.length}`, "",
                "Rules reached but never matched because a source `where`/type filter excluded every value:",
                ...list(filtered.map(describe)), "",
                "Rules reached but never matched because the source element had no values in any input:",
                ...list(noValues.map(describe)), "",
                "Rules never reached (parent rule or group never fired):",
                ...list(unreached.map(describe)), "");
        }
        if (map.sourceType) {
            const missing = modelPropertyPaths(map.sourceType, map.sourceVersion)
                .filter(item => !usage.sourcePresent.has(item));
            lines.push(`**Source properties not present in any input (${map.sourceType}):**`, ...list(missing), "");
        }
        if (map.targetType) {
            const missing = modelPropertyPaths(map.targetType, map.targetVersion)
                .filter(item => !usage.targetPresent.has(item));
            lines.push(`**Target properties never produced (${map.targetType}):**`, ...list(missing), "");
        }
    }
    return lines.join("\n");
}

function xml(value: string): string {
    return value.replace(/[<>&"']/g, ch => `&#${ch.charCodeAt(0)};`);
}

export function buildJUnit(cases: readonly ReportedCase[]): string {
    const failures = cases.filter(item => item.result.status === "failed").length;
    const errors = cases.filter(item => item.result.status === "errored").length;
    const body = cases.map(({mapFile, inputFile, result}) => {
        const open = `<testcase classname="${xml(mapFile)}" name="${xml(inputFile)}" time="${(result.durationMs / 1000).toFixed(3)}"`;
        if (result.status === "errored") {
            return `${open}><error message="${xml(result.error ?? "error")}"/></testcase>`;
        }
        if (result.status === "failed") {
            const text = result.messages.filter(m => m.kind !== "info").map(m => m.text).join("\n");
            return `${open}><failure message="${xml(text)}"/></testcase>`;
        }
        return `${open}/>`;
    });
    return `<?xml version="1.0" encoding="UTF-8"?>\n<testsuite name="fml-tests" tests="${cases.length}" failures="${failures}" errors="${errors}">\n${body.join("\n")}\n</testsuite>\n`;
}

/** LCOV with one line record per rule (line-level hit counts). */
export function buildLcov(coverage: readonly FileRuleCoverage[]): string {
    return coverage.filter(file => file.filePath).map(file => {
        const lines = new Map<number, number>();
        for (const site of file.sites) {
            const line = site.startLine + 1;
            lines.set(line, Math.max(lines.get(line) ?? 0, file.hits.get(site.location) ?? 0));
        }
        const rows = [...lines].sort((a, b) => a[0] - b[0]);
        return [`SF:${file.filePath}`, ...rows.map(([line, count]) => `DA:${line},${count}`),
            `LF:${rows.length}`, `LH:${rows.filter(row => row[1] > 0).length}`, "end_of_record"].join("\n");
    }).join("\n") + "\n";
}
