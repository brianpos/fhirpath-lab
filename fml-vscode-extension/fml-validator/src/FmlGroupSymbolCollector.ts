import type {GroupDeclaration, Rule, SourcePosition} from "../../../helpers/fml_models";
import {isFmlParseError, parseFML} from "../../../helpers/fml_parser";
import {FmlDocumentSymbols, FmlGroupSymbols, FmlSourceSpan} from "./contracts";

export class FmlGroupSymbolCollector {
    public collect(sourceText: string): FmlGroupSymbols {
        const symbols = this.collectDocument(sourceText);
        return {
            definitions: symbols.definitions,
            references: symbols.references,
        };
    }

    public collectDocument(sourceText: string): FmlDocumentSymbols {
        const parsed = parseFML(sourceText);
        if (isFmlParseError(parsed)) {
            return {canonicalUrls: [], definitions: [], imports: [], references: []};
        }

        const symbols: FmlDocumentSymbols = {
            canonicalUrls: [
                ...parsed.metadata
                    .filter(metadata => metadata.path === "url" && metadata.value)
                    .map(metadata => metadata.value as string),
                ...parsed.conceptMaps.map(conceptMap => conceptMap.url),
            ],
            definitions: [],
            imports: parsed.imports.map(importDeclaration => importDeclaration.url),
            references: [],
        };

        for (const group of parsed.groups) {
            symbols.definitions.push({
                name: group.name,
                span: this.nameSpan(group.position, group.name, sourceText),
            });
            if (group.extends) {
                symbols.references.push({
                    name: group.extends,
                    kind: "extends",
                    span: this.extendsSpan(group, sourceText),
                });
            }
            this.collectRuleReferences(group.rules, sourceText, symbols);
        }

        return {
            ...symbols,
            canonicalUrls: [...new Set(symbols.canonicalUrls)],
            imports: [...new Set(symbols.imports)],
        };
    }

    private collectRuleReferences(rules: Rule[], sourceText: string, symbols: FmlDocumentSymbols): void {
        for (const rule of rules) {
            for (const invocation of rule.dependent?.invocations ?? []) {
                symbols.references.push({
                    name: invocation.name,
                    kind: "invocation",
                    span: this.nameSpan(invocation.position, invocation.name, sourceText),
                });
            }
            this.collectRuleReferences(rule.dependent?.rules ?? [], sourceText, symbols);
        }
    }

    private extendsSpan(group: GroupDeclaration, sourceText: string): FmlSourceSpan {
        if (!group.position || !group.extends) return this.defaultSpan();
        const headerEnd = sourceText.indexOf("{", group.position.startIndex);
        const header = sourceText.slice(group.position.startIndex, headerEnd);
        const relativeIndex = header.lastIndexOf(group.extends);
        const offset = relativeIndex >= 0 ? group.position.startIndex + relativeIndex : group.position.startIndex;
        return this.spanAt(offset, group.extends, sourceText);
    }

    private nameSpan(position: SourcePosition | undefined, name: string, sourceText: string): FmlSourceSpan {
        if (!position) return this.defaultSpan();
        const relativeIndex = sourceText.slice(position.startIndex, position.endIndex).indexOf(name);
        const offset = relativeIndex >= 0 ? position.startIndex + relativeIndex : position.startIndex;
        return this.spanAt(offset, name, sourceText);
    }

    private spanAt(offset: number, name: string, sourceText: string): FmlSourceSpan {
        const prefix = sourceText.slice(0, offset);
        const line = prefix.split(/\r?\n/).length;
        const column = offset - (prefix.lastIndexOf("\n") + 1);
        return {
            start: {line, column},
            end: {line, column: column + Math.max(name.length, 1)},
        };
    }

    private defaultSpan(): FmlSourceSpan {
        return {start: {line: 1, column: 0}, end: {line: 1, column: 1}};
    }
}