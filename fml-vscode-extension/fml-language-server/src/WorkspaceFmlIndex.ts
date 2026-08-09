import {DocumentFmlSymbols} from "@fhirpath-lab/language-service";

export interface WorkspaceIndexStats {
    canonicalUrlCount: number;
    fileCount: number;
    groupCount: number;
    importCount: number;
}

export class WorkspaceFmlIndex {
    private readonly documents = new Map<string, DocumentFmlSymbols>();
    private readonly documentsByCanonicalUrl = new Map<string, Set<string>>();

    public set(uri: string, symbols: DocumentFmlSymbols): void {
        this.delete(uri);
        this.documents.set(uri, symbols);
        for (const canonicalUrl of symbols.canonicalUrls) {
            const uris = this.documentsByCanonicalUrl.get(canonicalUrl) ?? new Set<string>();
            uris.add(uri);
            this.documentsByCanonicalUrl.set(canonicalUrl, uris);
        }
    }

    public delete(uri: string): void {
        const previous = this.documents.get(uri);
        if (!previous) {
            return;
        }

        this.documents.delete(uri);
        for (const canonicalUrl of previous.canonicalUrls) {
            const uris = this.documentsByCanonicalUrl.get(canonicalUrl);
            uris?.delete(uri);
            if (uris?.size === 0) {
                this.documentsByCanonicalUrl.delete(canonicalUrl);
            }
        }
    }

    public clear(): void {
        this.documents.clear();
        this.documentsByCanonicalUrl.clear();
    }

    public get(uri: string): DocumentFmlSymbols | undefined {
        return this.documents.get(uri);
    }

    public getNavigationDocuments(sourceUri: string): Map<string, DocumentFmlSymbols> {
        const result = new Map<string, DocumentFmlSymbols>();
        const source = this.documents.get(sourceUri);
        if (!source) {
            return result;
        }

        result.set(sourceUri, source);
        for (const importPattern of source.imports) {
            for (const [canonicalUrl, uris] of this.documentsByCanonicalUrl) {
                if (!matchesCanonicalImport(importPattern, canonicalUrl)) {
                    continue;
                }
                for (const uri of uris) {
                    const symbols = this.documents.get(uri);
                    if (symbols) {
                        result.set(uri, symbols);
                    }
                }
            }
        }
        return result;
    }

    public getImportedDefaultGroups(sourceUri: string): NonNullable<DocumentFmlSymbols["defaultGroups"]> {
        const groups: NonNullable<DocumentFmlSymbols["defaultGroups"]> = [];
        for (const [uri, symbols] of this.getNavigationDocuments(sourceUri)) {
            if (uri !== sourceUri) groups.push(...symbols.defaultGroups);
        }
        return groups;
    }

    public getImportedGroupSignatures(sourceUri: string): DocumentFmlSymbols["groupSignatures"] {
        const signatures: DocumentFmlSymbols["groupSignatures"] = [];
        for (const [uri, symbols] of this.getNavigationDocuments(sourceUri)) {
            if (uri !== sourceUri) signatures.push(...symbols.groupSignatures);
        }
        return signatures;
    }

    public getDependentDocumentUris(targetUri: string): Set<string> {
        const target = this.documents.get(targetUri);
        const result = new Set<string>();
        if (!target) {
            return result;
        }

        for (const [sourceUri, source] of this.documents) {
            if (sourceUri === targetUri) {
                continue;
            }
            if (source.imports.some(importPattern => {
                return target.canonicalUrls.some(canonicalUrl => {
                    return matchesCanonicalImport(importPattern, canonicalUrl);
                });
            })) {
                result.add(sourceUri);
            }
        }
        return result;
    }

    public getStats(): WorkspaceIndexStats {
        let groupCount = 0;
        let importCount = 0;
        for (const symbols of this.documents.values()) {
            groupCount += symbols.definitions.length;
            importCount += symbols.imports.length;
        }
        return {
            canonicalUrlCount: this.documentsByCanonicalUrl.size,
            fileCount: this.documents.size,
            groupCount,
            importCount,
        };
    }
}

export function matchesCanonicalImport(pattern: string, canonicalUrl: string): boolean {
    const regularExpression = pattern
        .replace(/[.+^${}()|[\]\\]/g, "\\$&")
        .replace(/\*/g, ".*")
        .replace(/\?/g, ".");
    return new RegExp(`^${regularExpression}$`).test(canonicalUrl);
}
