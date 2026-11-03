import {
    applyFmlModelConfiguration, parseFmlModel, resolveDefaultGroups, resolveGroupSignatures,
    FmlPropertyUsageCollector, type FmlSource, type FmlStructureMap, type FmlPropertyAnalysis,
} from "@fhirpath-lab/validator";
import type {FmlExecutorConfiguration} from "./contracts";
import {analyzeLabFml} from "./LabFmlPreparation";
import type {FmlDiagnostic} from "./contracts";

export class FmlPreparationError extends Error {
    public constructor(public readonly diagnostics: FmlDiagnostic[]) {
        super(diagnostics.map(diagnostic => diagnostic.message).join("; "));
    }
}

export function waitForService<T>(pending: Promise<T>, signal?: AbortSignal): Promise<T> {
    if (!signal) return pending;
    return new Promise<T>((resolve, reject) => {
        const onAbort = (): void => {
            signal.removeEventListener("abort", onAbort);
            reject(signal.reason);
        };
        pending.then(
            value => { signal.removeEventListener("abort", onAbort); resolve(value); },
            error => { signal.removeEventListener("abort", onAbort); reject(error); },
        );
        if (signal.aborted) onAbort();
        else signal.addEventListener("abort", onAbort, {once: true});
    });
}

export interface FmlDocument {
    source: FmlSource;
    model: FmlStructureMap;
    imports: FmlDocument[];
}

export function matchesCanonical(pattern: string, canonical: string): boolean {
    return new RegExp("^" + pattern.split("*").map(part => part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join(".*") + "$")
        .test(canonical);
}

export async function linkDocuments(source: FmlSource, configuration: FmlExecutorConfiguration, signal?: AbortSignal): Promise<FmlDocument[]> {
    signal?.throwIfAborted();
    const documents: FmlDocument[] = [];
    const defaultVersion = source.defaultFhirVersion ?? "R4";
    const defaultModels = source.customTypeModels;
    const defaultProfiles = source.profileBaseTypes;
    const bySource = new Map<string, FmlDocument>();
    const byContent = new Map<string, FmlDocument>();
    const identities = new WeakMap<object, number>();
    let nextIdentity = 1;
    const identity = (value: object | undefined): number => {
        if (!value) return 0;
        let id = identities.get(value);
        if (!id) { id = nextIdentity++; identities.set(value, id); }
        return id;
    };
    const add = (source: FmlSource): FmlDocument => {
        const context = `${source.defaultFhirVersion ?? defaultVersion}|${identity(source.customTypeModels ?? defaultModels)}|${identity(source.profileBaseTypes ?? defaultProfiles)}`;
        const key = context + "|" + (source.sourceName ?? source.sourceText);
        const prior = bySource.get(key);
        if (prior) {
            if (prior.source.sourceText !== source.sourceText) throw new Error(`Conflicting source document '${key}'.`);
            return prior;
        }
        const identical = byContent.get(context + "|" + source.sourceText);
        if (identical) return identical;
        const model = parseFmlModel(source.sourceText);
        if (!model) throw new FmlPreparationError(analyzeLabFml(source).diagnostics);
        const document = {source: {...source, defaultFhirVersion: source.defaultFhirVersion ?? defaultVersion,
            customTypeModels: source.customTypeModels ?? defaultModels, profileBaseTypes: source.profileBaseTypes ?? defaultProfiles},
            model, imports: []};
        applyFmlModelConfiguration(model, document.source);
        bySource.set(key, document);
        byContent.set(context + "|" + source.sourceText, document);
        documents.push(document);
        return document;
    };
    const main = add(source);
    for (const candidate of configuration.maps ?? []) add(candidate);
    const visited = new Set<FmlDocument>();
    const urls = (document: FmlDocument): string[] => [
        document.model.mapDeclaration?.url,
        document.model.metadata.find(metadata => metadata.path === "url")?.value,
    ].filter((url): url is string => typeof url === "string");
    const aliases = (document: FmlDocument): string[] => {
        const version = document.model.metadata.find(metadata => metadata.path === "version")?.value;
        return urls(document).flatMap(url => version && !url.includes("|") ? [url, `${url}|${version}`] : [url]);
    };
    const visit = async (document: FmlDocument): Promise<void> => {
        signal?.throwIfAborted();
        if (visited.has(document)) return;
        visited.add(document);
        for (const declaration of document.model.imports) {
            let matches = documents.filter(candidate => aliases(candidate).some(url => matchesCanonical(declaration.url, url)));
            if (matches.length === 0 && configuration.loadMaps) {
                for (const loaded of await waitForService(configuration.loadMaps(declaration.url, document.source, signal), signal)) add(loaded);
                matches = documents.filter(candidate => aliases(candidate).some(url => matchesCanonical(declaration.url, url)));
            }
            if (matches.length === 0) throw new Error(`Unresolved map import '${declaration.url}' in '${document.source.sourceName ?? "(main map)"}'.`);
            const found = new Map<string, FmlDocument>();
            for (const candidate of matches) for (const url of urls(candidate)) {
                const previous = found.get(url);
                if (previous && previous !== candidate) throw new Error(`Ambiguous map import '${declaration.url}' for '${url}'; specify a version and provide one model configuration.`);
                found.set(url, candidate);
            }
            for (const match of matches) {
                if (match !== document && !document.imports.includes(match)) document.imports.push(match);
                await visit(match);
            }
        }
    };
    await visit(main);
    return documents.filter(document => visited.has(document));
}

export function visibleDocuments(document: FmlDocument): FmlDocument[] {
    const visible = new Set<FmlDocument>();
    const visit = (candidate: FmlDocument): void => {
        if (visible.has(candidate)) return;
        visible.add(candidate);
        candidate.imports.forEach(visit);
    };
    visit(document);
    return [...visible];
}

export function importedSignatures(document: FmlDocument,
    cache = new Map<FmlDocument, FmlPropertyAnalysis>()): Pick<FmlSource, "importedDefaultGroups" | "importedGroupSignatures"> {
    const analyses = visibleDocuments(document).filter(candidate => candidate !== document).map(candidate => {
        let analysis = cache.get(candidate);
        if (!analysis) {
            analysis = new FmlPropertyUsageCollector().analyzeModel(
                candidate.model, candidate.source.sourceText, candidate.source.customTypeModels);
            cache.set(candidate, analysis);
        }
        return {candidate, analysis};
    });
    return {
        importedDefaultGroups: analyses.flatMap(({candidate, analysis}) => resolveDefaultGroups(candidate.model.groups, analysis)),
        importedGroupSignatures: analyses.flatMap(({candidate, analysis}) => resolveGroupSignatures(candidate.model.groups, analysis)),
    };
}
