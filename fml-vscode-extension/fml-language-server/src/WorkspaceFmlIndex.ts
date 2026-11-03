import {DocumentFmlSymbols, FmlEvaluationMapSnapshot} from "@fhirpath-lab/language-service";

export interface WorkspaceIndexStats {
    canonicalUrlCount: number;
    fileCount: number;
    groupCount: number;
    importCount: number;
}

export class WorkspaceFmlIndex {
    private readonly documents = new Map<string, DocumentFmlSymbols>();
    private readonly documentsByCanonicalUrl = new Map<string, Set<string>>();
    private readonly sources = new Map<string, Omit<FmlEvaluationMapSnapshot, "uri">>();

    public set(uri: string, symbols: DocumentFmlSymbols, source?: Omit<FmlEvaluationMapSnapshot, "uri">): void {
        this.delete(uri);
        this.documents.set(uri, symbols);
        if (source) {
            this.sources.set(uri, source);
        }
        for (const canonicalUrl of symbols.canonicalUrls) {
            const uris = this.documentsByCanonicalUrl.get(canonicalUrl) ?? new Set<string>();
            uris.add(uri);
            this.documentsByCanonicalUrl.set(canonicalUrl, uris);
        }
    }

    public delete(uri: string): void {
        this.sources.delete(uri);
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
        this.sources.clear();
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
                const uri = uris.has(sourceUri)
                    ? sourceUri
                    : [...uris].sort((left, right) =>
                        documentDirectoryDistance(sourceUri, left) - documentDirectoryDistance(sourceUri, right)
                        || left.localeCompare(right))[0];
                const symbols = this.documents.get(uri);
                if (symbols) {
                    result.set(uri, symbols);
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

    public getImportedDocumentUris(sourceUri: string): string[] {
        return [...this.getNavigationDocuments(sourceUri).keys()]
            .filter(uri => uri !== sourceUri);
    }

    public getEvaluationMaps(sourceUri: string): FmlEvaluationMapSnapshot[] {
        const pending = [sourceUri];
        const queued = new Set(pending);
        const result: FmlEvaluationMapSnapshot[] = [];
        for (let cursor = 0; cursor < pending.length; cursor++) {
            const uri = pending[cursor];
            const source = this.sources.get(uri);
            if (!source) {
                throw new Error(`FML source content is not cached for ${uri}. Re-index the workspace before evaluation.`);
            }
            result.push({uri, ...source});
            for (const imported of this.getImportedDocumentUris(uri)) {
                if (!queued.has(imported)) {
                    queued.add(imported);
                    pending.push(imported);
                }
            }
        }
        return result;
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

function documentDirectoryDistance(sourceUri: string, targetUri: string): number {
    const source = new URL(sourceUri);
    const target = new URL(targetUri);
    if (source.protocol !== target.protocol || source.host !== target.host) {
        return Number.MAX_SAFE_INTEGER;
    }
    const directorySegments = (uri: URL): string[] => {
        const path = decodeURIComponent(uri.pathname);
        const normalized = process.platform === "win32" && uri.protocol === "file:"
            ? path.toLowerCase() : path;
        return normalized.split("/").slice(0, -1);
    };
    const sourceSegments = directorySegments(source);
    const targetSegments = directorySegments(target);
    let shared = 0;
    while (shared < sourceSegments.length && shared < targetSegments.length
        && sourceSegments[shared] === targetSegments[shared]) {
        shared++;
    }
    return sourceSegments.length + targetSegments.length - 2 * shared;
}

export function matchesCanonicalImport(pattern: string, canonicalUrl: string): boolean {
    const regularExpression = pattern
        .replace(/[.+^${}()|[\]\\]/g, "\\$&")
        .replace(/\*/g, ".*")
        .replace(/\?/g, ".");
    return new RegExp(`^${regularExpression}$`).test(canonicalUrl);
}
