import {parseFmlModel} from "@fhirpath-lab/validator";

export interface RuleSite {
    /** Trace location, e.g. `StructureMap.group[0].rule[2].rule[0]`. */
    location: string;
    /** 0-based start/end positions. */
    startLine: number;
    startColumn: number;
    endLine: number;
    endColumn: number;
}

interface Positioned {
    startLine: number;
    startColumn: number;
    endLine: number;
    endColumn: number;
}

interface RuleLike {
    position?: Positioned;
    identityFields?: {position?: Positioned}[];
    dependent?: {rules: RuleLike[]};
}

/** Enumerates every rule in a map using the same location naming as the trace. */
export function enumerateRules(text: string): RuleSite[] {
    const model = parseFmlModel(text);
    const sites: RuleSite[] = [];
    const add = (location: string, position: Positioned | undefined): void => {
        if (position) {
            sites.push({
                location, startLine: position.startLine - 1, startColumn: position.startColumn,
                endLine: position.endLine - 1, endColumn: position.endColumn,
            });
        }
    };
    const walkRules = (rules: RuleLike[], prefix: string, offset: number): void => {
        rules.forEach((rule, index) => {
            const location = `${prefix}[${offset + index}]`;
            add(location, rule.position);
            const identity = rule.identityFields ?? [];
            identity.forEach((field, fieldIndex) => add(`${location}.rule[${fieldIndex}]`, field.position));
            walkRules(rule.dependent?.rules ?? [], `${location}.rule`, identity.length);
        });
    };
    model?.groups.forEach((group, index) => walkRules(group.rules as RuleLike[], `StructureMap.group[${index}].rule`, 0));
    return sites;
}

const RULE_LOCATION = /\.rule\[\d+\]$/;

export interface FileRuleCoverage {
    fileName: string;
    filePath?: string;
    sites: RuleSite[];
    /** Times each rule fired (its sources matched). */
    hits: Map<string, number>;
    /** Times each rule was reached but produced no match, by reason. */
    skips: Map<string, {noSourceValues: number; filtered: number}>;
}

/** Accumulates rule hits across runs; files are keyed by their diagnostic file name. */
export class RuleCoverageCollector {
    private readonly files = new Map<string, FileRuleCoverage>();

    public registerFile(fileName: string, filePath: string | undefined, text: string): void {
        if (!this.files.has(fileName)) {
            this.files.set(fileName, {fileName, filePath, sites: enumerateRules(text), hits: new Map(), skips: new Map()});
        }
    }

    public record(
        events: readonly {phase: string; traceLocation?: string; mapFileName?: string; messages?: {name?: string; text: string[]}[]}[],
        primaryFile: string,
    ): void {
        for (const event of events) {
            if (!event.traceLocation || !RULE_LOCATION.test(event.traceLocation)) {
                continue;
            }
            const file = this.files.get(event.mapFileName ?? primaryFile);
            if (!file) {
                continue;
            }
            const reason = event.messages?.find(message => message.name === "coverage")?.text[0];
            // Successful leaf-rule scopes are compacted to a single step event.
            if (event.phase === "enter" || event.phase === "step" && !reason) {
                file.hits.set(event.traceLocation, (file.hits.get(event.traceLocation) ?? 0) + 1);
            } else if (event.phase === "step" && reason) {
                const skip = file.skips.get(event.traceLocation) ?? {noSourceValues: 0, filtered: 0};
                if (reason === "filtered") {
                    skip.filtered++;
                } else {
                    skip.noSourceValues++;
                }
                file.skips.set(event.traceLocation, skip);
            }
        }
    }

    /** Files with at least one executed rule, or listed in `always`. */
    public results(always: ReadonlySet<string> = new Set()): FileRuleCoverage[] {
        return [...this.files.values()].filter(file => file.hits.size > 0 || file.skips.size > 0 || always.has(file.fileName));
    }
}
