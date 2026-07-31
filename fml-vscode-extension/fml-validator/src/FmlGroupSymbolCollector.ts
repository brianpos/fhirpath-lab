import {CharStream, CommonTokenStream, ParseTreeWalker, Token} from "antlr4ng";
import {FmlDocumentSymbols, FmlGroupSymbols, FmlSourceSpan} from "./contracts";
import {mappingLexer} from "./generated/mappingLexer";
import {mappingListener} from "./generated/mappingListener";
import {
    ExtendsContext,
    ConceptMapDeclarationContext,
    GroupDeclarationContext,
    GroupInvocationContext,
    ImportDeclarationContext,
    MetadataDeclarationContext,
    mappingParser,
} from "./generated/mappingParser";

class GroupSymbolListener extends mappingListener {
    public readonly symbols: FmlDocumentSymbols = {
        canonicalUrls: [],
        definitions: [],
        imports: [],
        references: [],
    };

    public override enterConceptMapDeclaration = (context: ConceptMapDeclarationContext): void => {
        const canonicalUrl = this.readQuotedValue(context.url()?.getText());
        if (canonicalUrl) {
            this.symbols.canonicalUrls.push(canonicalUrl);
        }
    };

    public override enterMetadataDeclaration = (context: MetadataDeclarationContext): void => {
        if (context.qualifiedIdentifier()?.getText() !== "url") {
            return;
        }
        const canonicalUrl = this.readQuotedValue(context.literal()?.getText());
        if (canonicalUrl) {
            this.symbols.canonicalUrls.push(canonicalUrl);
        }
    };

    public override enterImportDeclaration = (context: ImportDeclarationContext): void => {
        const importPattern = this.readQuotedValue(context.url()?.getText());
        if (importPattern) {
            this.symbols.imports.push(importPattern);
        }
    };

    public override enterGroupDeclaration = (context: GroupDeclarationContext): void => {
        const node = context.ID();
        if (!node) {
            return;
        }
        this.symbols.definitions.push({
            name: node.getText(),
            span: this.toSpan(node.symbol),
        });
    };

    public override enterExtends = (context: ExtendsContext): void => {
        const node = context.ID();
        if (!node) {
            return;
        }
        this.symbols.references.push({
            name: node.getText(),
            kind: "extends",
            span: this.toSpan(node.symbol),
        });
    };

    public override enterGroupInvocation = (context: GroupInvocationContext): void => {
        const identifier = context.identifier();
        if (!identifier?.start) {
            return;
        }
        this.symbols.references.push({
            name: identifier.getText(),
            kind: "invocation",
            span: this.toSpan(identifier.start),
        });
    };

    private toSpan(token: Token | null): FmlSourceSpan {
        const line = token?.line ?? 1;
        const column = token?.column ?? 0;
        const length = Math.max(token?.text?.length ?? 0, 1);
        return {
            start: {line, column},
            end: {line, column: column + length},
        };
    }

    private readQuotedValue(text: string | undefined): string | undefined {
        if (!text || text.length < 2) {
            return undefined;
        }
        const quote = text[0];
        if ((quote !== "'" && quote !== "\"") || text[text.length - 1] !== quote) {
            return undefined;
        }
        return text.slice(1, -1).replace(/\\(['"\\])/g, "$1");
    }
}

export class FmlGroupSymbolCollector {
    public collect(sourceText: string): FmlGroupSymbols {
        const symbols = this.collectDocument(sourceText);
        return {
            definitions: symbols.definitions,
            references: symbols.references,
        };
    }

    public collectDocument(sourceText: string): FmlDocumentSymbols {
        const lexer = new mappingLexer(CharStream.fromString(sourceText));
        lexer.removeErrorListeners();
        const parser = new mappingParser(new CommonTokenStream(lexer));
        parser.removeErrorListeners();
        const tree = parser.structureMap();
        const listener = new GroupSymbolListener();
        ParseTreeWalker.DEFAULT.walk(listener, tree);
        return {
            ...listener.symbols,
            canonicalUrls: [...new Set(listener.symbols.canonicalUrls)],
            imports: [...new Set(listener.symbols.imports)],
        };
    }
}
