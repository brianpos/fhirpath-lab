import {FmlDebugMapSource, JsonValue} from "@fhirpath-lab/debug-service";
import {FhirVersion, FmlStructureMap, Rule, Transform, parseFmlModel} from "@fhirpath-lab/validator";
import fg from "fast-glob";
import {promises as fs} from "node:fs";
import path from "node:path";
import * as vscode from "vscode";

export type FmlRequiredResourceType = "ConceptMap" | "StructureDefinition";

export interface FmlRequiredResource {
    canonical: string;
    fhirVersion?: FhirVersion;
    resourceType: FmlRequiredResourceType;
}

export interface FmlResolvedDebugDependencies {
    maps: FmlDebugMapSource[];
    modelResources: JsonValue[];
    unresolvedResources: FmlRequiredResource[];
}

interface ParsedMapSource {
    canonicalUrls: string[];
    filePath: string;
    model: FmlStructureMap;
    text: string;
}

interface SupportedResource {
    [key: string]: JsonValue;
    resourceType: FmlRequiredResourceType;
}

interface SupportedResourceCandidate {
    filePath: string;
    resource: SupportedResource;
}

export async function resolveFmlDebugDependencies(
    program: string,
    mapText: string,
    dependencyPatterns: string[],
    onResourceRequired: (resource: FmlRequiredResource) => void,
    defaultFhirVersion?: string,
    modelResourcePaths: string[] = [],
    onResourceResolved: (resource: FmlRequiredResource, filePath: string) => void = () => undefined,
): Promise<FmlResolvedDebugDependencies> {
    const defaultRelease = toFhirRelease(defaultFhirVersion);
    const mainMap = parseMap(program, mapText, defaultRelease);
    if (!mainMap) {
        return {
            maps: [{fileName: displayPath(program), text: mapText}],
            modelResources: [],
            unresolvedResources: [],
        };
    }

    const workspaceMaps = await loadWorkspaceMaps(program, defaultRelease);
    const maps = walkImportedMaps(mainMap, workspaceMaps);
    const requirements = collectRequiredResources(maps);
    requirements.forEach(onResourceRequired);

    const availableResources = await loadDependencyResources(dependencyPatterns, modelResourcePaths);
    const modelResources: JsonValue[] = [];
    const unresolvedResources: FmlRequiredResource[] = [];
    for (const requirement of requirements) {
        const matchingResources = availableResources.filter(candidate => {
            return candidate.resource.resourceType === requirement.resourceType
                && resourceCanonicals(candidate.resource).some(canonical => {
                    return canonicalMatches(requirement.canonical, canonical);
                });
        });
        const candidate = matchingResources.find(candidate => {
            return requirement.fhirVersion !== undefined
                && typeof candidate.resource.fhirVersion === "string"
                && toFhirRelease(candidate.resource.fhirVersion) === requirement.fhirVersion;
        }) ?? matchingResources.find(candidate => candidate.resource.fhirVersion === undefined)
            ?? (requirement.fhirVersion === undefined ? matchingResources[0] : undefined);
        if (candidate) {
            if (!modelResources.includes(candidate.resource)) {
                modelResources.push(candidate.resource);
            }
            onResourceResolved(requirement, candidate.filePath);
        } else {
            unresolvedResources.push(requirement);
        }
    }

    return {
        maps: maps.map(map => ({fileName: displayPath(map.filePath, program), text: map.text})),
        modelResources,
        unresolvedResources,
    };
}

async function loadWorkspaceMaps(
    program: string,
    defaultFhirVersion?: FhirVersion,
): Promise<ParsedMapSource[]> {
    const workspaceUris = await vscode.workspace.findFiles("**/*.fml", "**/node_modules/**");
    const nearbyFiles = await fg("**/*.fml", {
        absolute: true,
        cwd: path.dirname(program),
        ignore: ["**/node_modules/**"],
        onlyFiles: true,
    });
    const files = deduplicateFmlFilePaths(
        [...workspaceUris.map(uri => uri.fsPath), ...nearbyFiles],
        program,
    );
    const maps = await Promise.all(files
        .map(async file => parseMap(file, await fs.readFile(file, "utf8"), defaultFhirVersion)));
    return maps.filter((map): map is ParsedMapSource => map !== undefined);
}

export function deduplicateFmlFilePaths(filePaths: string[], excludedFilePath?: string): string[] {
    const excludedIdentity = excludedFilePath ? filePathIdentity(excludedFilePath) : undefined;
    const files = new Map<string, string>();
    for (const filePath of filePaths) {
        const identity = filePathIdentity(filePath);
        if (identity !== excludedIdentity && !files.has(identity)) {
            files.set(identity, filePath);
        }
    }
    return [...files.values()];
}

function filePathIdentity(filePath: string): string {
    const resolvedPath = path.resolve(filePath);
    return process.platform === "win32" ? resolvedPath.toLowerCase() : resolvedPath;
}

function parseMap(
    filePath: string,
    text: string,
    defaultFhirVersion?: FhirVersion,
): ParsedMapSource | undefined {
    const model = parseFmlModel(text);
    if (!model) {
        return undefined;
    }
    model.sourceModelVersion ??= defaultFhirVersion;
    model.targetModelVersion ??= defaultFhirVersion;
    const canonicalUrls = [
        model.mapDeclaration?.url,
        ...model.metadata.filter(metadata => metadata.path === "url").map(metadata => metadata.value),
    ].filter((value): value is string => Boolean(value));
    return {canonicalUrls, filePath, model, text};
}

function walkImportedMaps(mainMap: ParsedMapSource, candidates: ParsedMapSource[]): ParsedMapSource[] {
    const result: ParsedMapSource[] = [];
    const pending = [mainMap];
    const visited = new Set<string>();
    while (pending.length) {
        const current = pending.shift();
        if (!current) {
            continue;
        }
        const identity = filePathIdentity(current.filePath);
        if (visited.has(identity)) {
            continue;
        }
        visited.add(identity);
        result.push(current);
        for (const imported of current.model.imports) {
            for (const candidate of candidates) {
                if (candidate.canonicalUrls.some(canonical => matchesCanonicalImport(imported.url, canonical))) {
                    pending.push(candidate);
                }
            }
        }
    }
    return result;
}

function collectRequiredResources(maps: ParsedMapSource[]): FmlRequiredResource[] {
    const requirements = new Map<string, FmlRequiredResource>();
    const embeddedConceptMaps = new Set(maps.flatMap(map => map.model.conceptMaps.map(conceptMap => conceptMap.url)));
    for (const map of maps) {
        for (const structure of map.model.structures) {
            const canonical = structure.canonical ?? structure.url;
            if (!isCoreStructureDefinition(canonical)) {
                const fhirVersion = structure.fhirVersion
                    ?? (structure.mode === "source" || structure.mode === "queried"
                        ? map.model.sourceModelVersion
                        : map.model.targetModelVersion);
                addRequirement(requirements, "StructureDefinition", canonical, fhirVersion);
            }
        }
        walkRules(map.model.groups.flatMap(group => group.rules), transform => {
            if (transform.type !== "translate") {
                return;
            }
            const mapParameter = transform.parameters.find(parameter => parameter.name === "map_uri")
                ?? transform.parameters[1];
            if (typeof mapParameter?.value === "string" && !embeddedConceptMaps.has(mapParameter.value)) {
                addRequirement(
                    requirements,
                    "ConceptMap",
                    mapParameter.value,
                    map.model.sourceModelVersion ?? map.model.targetModelVersion,
                );
            }
        });
    }
    return [...requirements.values()];
}

function isCoreStructureDefinition(canonical: string): boolean {
    const url = canonical.split("|")[0];
    return /^https?:\/\/hl7\.org\/fhir\/(?:\d+\.\d+\/)?StructureDefinition\//i.test(url);
}

function walkRules(
    rules: Rule[],
    visit: (transform: Transform) => void,
): void {
    for (const rule of rules) {
        for (const target of rule.targets) {
            if (target.transform) {
                visit(target.transform);
            }
        }
        if (rule.dependent?.rules.length) {
            walkRules(rule.dependent.rules, visit);
        }
    }
}

function addRequirement(
    requirements: Map<string, FmlRequiredResource>,
    resourceType: FmlRequiredResourceType,
    canonical: string,
    fhirVersion?: FhirVersion,
): void {
    requirements.set(`${resourceType}|${canonical}|${fhirVersion ?? "default"}`, {
        canonical,
        fhirVersion,
        resourceType,
    });
}

export function toFhirRelease(version: string | undefined): FhirVersion | undefined {
    const match = version?.match(/^#?(\d+)\.(\d+)/);
    if (!match) {
        return undefined;
    }
    switch (`${match[1]}.${match[2]}`) {
        case "1.0": return "DSTU2";
        case "3.0": return "STU3";
        case "4.0": return "R4";
        case "4.3": return "R4B";
        case "5.0": return "R5";
        case "6.0": return "R6";
        default: return undefined;
    }
}

async function loadDependencyResources(
    patterns: string[],
    modelResourcePaths: string[],
): Promise<SupportedResourceCandidate[]> {
    const matchedFiles = patterns.length
        ? await fg(patterns.map(pattern => pattern.replaceAll("\\", "/")), {
            absolute: true,
            onlyFiles: true,
            unique: true,
        })
        : [];
    const files = [...new Set([...matchedFiles, ...modelResourcePaths])];
    const resources: SupportedResourceCandidate[] = [];
    for (const file of files.filter(file => path.extname(file).toLowerCase() === ".json")) {
        try {
            const resource = JSON.parse(await fs.readFile(file, "utf8")) as JsonValue;
            if (isSupportedResource(resource)) {
                resources.push({filePath: file, resource});
            }
        } catch {
            // Invalid JSON dependency files are not eligible FHIR resources.
        }
    }
    return resources;
}

function isSupportedResource(value: JsonValue): value is SupportedResource {
    return typeof value === "object"
        && value !== null
        && !Array.isArray(value)
        && (value.resourceType === "StructureDefinition" || value.resourceType === "ConceptMap");
}

function resourceCanonicals(resource: SupportedResource): string[] {
    return [resource.url, resource.version !== undefined && typeof resource.url === "string"
        ? `${resource.url}|${resource.version}`
        : undefined]
        .filter((value): value is string => typeof value === "string");
}

function canonicalMatches(required: string, available: string): boolean {
    return required === available || required.split("|")[0] === available.split("|")[0];
}

function matchesCanonicalImport(pattern: string, canonicalUrl: string): boolean {
    const regularExpression = pattern
        .replace(/[.+^${}()|[\]\\]/g, "\\$&")
        .replace(/\*/g, ".*")
        .replace(/\?/g, ".");
    return new RegExp(`^${regularExpression}$`).test(canonicalUrl);
}

function displayPath(filePath: string, program = filePath): string {
    const relativePath = path.relative(path.dirname(program), filePath);
    if (!relativePath) {
        return path.basename(filePath);
    }
    return relativePath && !relativePath.startsWith("..") && !path.isAbsolute(relativePath)
        ? relativePath
        : vscode.workspace.asRelativePath(filePath, false);
}