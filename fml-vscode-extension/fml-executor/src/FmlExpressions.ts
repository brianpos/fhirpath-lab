import fhirpath from "fhirpath";
import {isObject} from "./values";

export function expressionBindings(text: string, names: ReadonlySet<string>): {text: string; references: string[]; variables: ReadonlyMap<string, string>} {
    const edits: {start: number; end: number; text: string}[] = [];
    const references = new Set<string>();
    const reserved = new Set(["context", "resource", "rootResource", "ucum", "factory", "terminologies"]);
    let prefix = "fmlReserved";
    while (text.includes(prefix) || [...names].some(name => name.startsWith(prefix))) prefix = "x" + prefix;
    let next = 0;
    const variables = new Map([...names].map(name => [name, reserved.has(name) ? prefix + next++ : name]));
    const offsets = [0];
    for (let index = 0; index < text.length; index++) if (text[index] === "\n") offsets.push(index + 1);
    const visit = (node: unknown): void => {
        if (!isObject(node)) return;
        const rawName = typeof node.delimitedText === "string" ? node.delimitedText : typeof node.text === "string" ? node.text : undefined;
        const name = rawName?.replace(/^([`'])(.*)\1$/, "$2");
        const member = node.type === "MemberInvocation" && node.atRoot;
        const external = node.type === "ExternalConstantTerm";
        if ((member || external) && name && variables.has(name)) {
            if (!isObject(node.start) || typeof node.start.line !== "number" || typeof node.start.column !== "number") {
                throw new Error("FHIRPath parser did not supply a position for a mapping-variable reference.");
            }
            const start = offsets[node.start.line - 1] + node.start.column - 1;
            let token = start;
            if (external) {
                token++;
                while (/\s/.test(text[token] ?? "") && token < text.length) token++;
            }
            let end = token;
            if (text[token] === "`" || text[token] === "'") {
                const quote = text[token];
                end++;
                while (end < text.length && text[end] !== quote) { if (text[end] === "\\") end++; end++; }
                end++;
            } else {
                end += typeof node.length === "number" ? node.length : name.length;
            }
            const variable = variables.get(name)!;
            if (variable !== name) edits.push({start, end, text: `%${variable}`});
            else if (member) edits.push({start, end: start, text: "%"});
            references.add(name);
        }
        if (external && name) references.add(name);
        if (Array.isArray(node.children)) node.children.forEach(visit);
    };
    visit(fhirpath.parse(text));
    // Lower only lexically bound root identifiers; do not infer or rewrite the evaluation context.
    for (const edit of edits.sort((a, b) => b.start - a.start)) {
        text = text.slice(0, edit.start) + edit.text + text.slice(edit.end);
    }
    return {text, references: [...references], variables};
}

export function splitFmlPath(path: string): string[] {
    return [...path.matchAll(/`(?:\\.|[^`])*`|[^.]+/g)].map(match => {
        const part = match[0];
        return part.startsWith("`") ? part.slice(1, -1).replace(/\\`/g, "`") : part;
    });
}
