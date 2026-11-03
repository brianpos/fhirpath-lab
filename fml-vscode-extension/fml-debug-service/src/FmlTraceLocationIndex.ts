import type {FmlTraceSourceRange} from "./contracts";

interface SourcePosition {
    startIndex: number;
    endIndex: number;
}

interface Positioned {
    position?: SourcePosition;
}

interface TraceLocationRule extends Positioned {
    sources: Positioned[];
    targets: (Positioned & {transform?: {parameters: Positioned[]}})[];
    identityFields?: Positioned[];
    dependent?: {invocations: Positioned[]; rules: TraceLocationRule[]};
}

export interface FmlTraceLocationModel {
    groups: (Positioned & {parameters: Positioned[]; rules: TraceLocationRule[]})[];
}

interface TraceLocationEntry {
    location: string;
    range: FmlTraceSourceRange;
}

export class FmlTraceLocationIndex {
    private readonly entries: TraceLocationEntry[];
    private readonly rangesByLocation: Map<string, FmlTraceSourceRange>;

    public constructor(model: FmlTraceLocationModel) {
        const entries = indexStructureMap(model);
        this.entries = entries;
        this.rangesByLocation = new Map(entries.map(entry => [entry.location, entry.range]));
    }

    public rangeFor(location: string): FmlTraceSourceRange | undefined {
        const range = this.rangesByLocation.get(location.trim());
        return range ? {...range} : undefined;
    }

    public locationFor(range: FmlTraceSourceRange): string | undefined {
        const exact = this.entries.filter(entry => sameRange(entry.range, range));
        if (exact.length > 0) {
            return uniqueLocation(exact);
        }

        const containing = this.entries.filter(entry => containsRange(entry.range, range));
        if (containing.length === 0) {
            return undefined;
        }
        const shortestLength = Math.min(...containing.map(entry => entry.range.length));
        return uniqueLocation(containing.filter(entry => entry.range.length === shortestLength));
    }
}

function indexStructureMap(model: FmlTraceLocationModel): TraceLocationEntry[] {
    const entries: TraceLocationEntry[] = [];
    model.groups.forEach((group, groupIndex) => {
        const groupLocation = `StructureMap.group[${groupIndex}]`;
        addEntry(entries, groupLocation, group.position);
        group.parameters.forEach((parameter, parameterIndex) => {
            addEntry(entries, `${groupLocation}.input[${parameterIndex}]`, parameter.position);
        });
        indexRules(entries, group.rules, `${groupLocation}.rule`);
    });
    return entries;
}

function indexRules(
    entries: TraceLocationEntry[],
    rules: TraceLocationRule[],
    ruleLocationPrefix: string,
    startIndex = 0,
): void {
    rules.forEach((rule, index) => {
        indexRule(entries, rule, `${ruleLocationPrefix}[${startIndex + index}]`);
    });
}

function indexRule(entries: TraceLocationEntry[], rule: TraceLocationRule, ruleLocation: string): void {
    addEntry(entries, ruleLocation, rule.position);
    rule.sources.forEach((source, sourceIndex) => {
        addEntry(entries, `${ruleLocation}.source[${sourceIndex}]`, source.position);
    });
    rule.targets.forEach((target, targetIndex) => {
        const targetLocation = `${ruleLocation}.target[${targetIndex}]`;
        addEntry(entries, targetLocation, target.position);
        target.transform?.parameters.forEach((parameter, parameterIndex) => {
            addEntry(entries, `${targetLocation}.parameter[${parameterIndex}]`, parameter.position);
        });
    });
    rule.dependent?.invocations.forEach((invocation, invocationIndex) => {
        addEntry(entries, `${ruleLocation}.dependent[${invocationIndex}]`, invocation.position);
    });

    const nestedRulePrefix = `${ruleLocation}.rule`;
    // Batch identity fields become nested rules before explicit dependent rules.
    const identityFields = rule.identityFields ?? [];
    identityFields.forEach((field, fieldIndex) => {
        const fieldRuleLocation = `${nestedRulePrefix}[${fieldIndex}]`;
        addEntry(entries, fieldRuleLocation, field.position);
        addEntry(entries, `${fieldRuleLocation}.source[0]`, field.position);
        addEntry(entries, `${fieldRuleLocation}.target[0]`, field.position);
    });
    indexRules(
        entries,
        rule.dependent?.rules ?? [],
        nestedRulePrefix,
        identityFields.length,
    );
}

function addEntry(
    entries: TraceLocationEntry[],
    location: string,
    position: SourcePosition | undefined,
): void {
    if (!position || position.endIndex < position.startIndex) {
        return;
    }
    entries.push({
        location,
        range: {
            startOffset: position.startIndex,
            length: position.endIndex - position.startIndex,
        },
    });
}

function sameRange(left: FmlTraceSourceRange, right: FmlTraceSourceRange): boolean {
    return left.startOffset === right.startOffset && left.length === right.length;
}

function containsRange(container: FmlTraceSourceRange, range: FmlTraceSourceRange): boolean {
    return container.startOffset <= range.startOffset
        && container.startOffset + container.length >= range.startOffset + range.length;
}

function uniqueLocation(entries: TraceLocationEntry[]): string | undefined {
    return entries.length === 1 ? entries[0].location : undefined;
}