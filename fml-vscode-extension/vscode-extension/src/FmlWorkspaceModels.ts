import {existsSync, promises as fs} from "node:fs";
import path from "node:path";
import fg from "fast-glob";
import YAML from "yaml";
import {resolveStructureDefinitionTypeName, type TypeModel} from "@fhirpath-lab/validator";
import type {JsonValue} from "@fhirpath-lab/debug-service";
import type {FmlModelFileSnapshot} from "./FmlDebugDependencies";

export interface SushiPackageDependency {
    indexExists: boolean;
    indexPath: string;
    packageId: string;
    version: string;
}

export interface SushiWorkspaceConfiguration {
    dependencies: SushiPackageDependency[];
    fhirVersion?: string;
    customTypeModels: Record<string, TypeModel>;
    modelResourcePaths: string[];
    modelFileCache?: readonly FmlModelFileSnapshot[];
    profileBaseTypes: Record<string, string>;
    profileResolutionSources: Record<string, string>;
}

interface SushiConfigDocument {
    dependencies?: Record<string, string | number | {version?: string | number}>;
    fhirVersion?: string | string[];
}

export function parseSushiConfiguration(
    source: string,
    cachePath: string,
    fileExists: (filePath: string) => boolean = existsSync,
): SushiWorkspaceConfiguration {
    const parsed = YAML.parse(source) as SushiConfigDocument | null;
    const fhirVersions = Array.isArray(parsed?.fhirVersion) ? parsed.fhirVersion : [parsed?.fhirVersion];
    const fhirVersion = fhirVersions.find(version => typeof version === "string" && version.trim())?.trim();
    const dependencies = Object.entries(parsed?.dependencies ?? {}).flatMap(([packageId, value]) => {
        const version = typeof value === "object" && value !== null ? value.version : value;
        if (version === undefined || version === null || String(version).trim() === "") {
            return [];
        }
        const normalizedVersion = String(version);
        const indexPath = path.join(cachePath, `${packageId}#${normalizedVersion}`, "package", ".index.json");
        return [{indexExists: fileExists(indexPath), indexPath, packageId, version: normalizedVersion}];
    });
    return {
        dependencies, fhirVersion, customTypeModels: {}, modelResourcePaths: [],
        profileBaseTypes: {}, profileResolutionSources: {},
    };
}

interface PackageIndex {
    files?: Array<{filename?: string; resourceType?: string; url?: string}>;
}

interface ProfileStructureDefinition {
    baseDefinition?: string;
    differential?: {element?: Array<{path: string}>};
    kind?: string;
    name?: string;
    resourceType?: string;
    snapshot?: {element?: Array<{path: string}>};
    type?: string;
    url?: string;
}

export interface ProfileTypeResolution {
    kind?: string;
    resourcePath: string;
    source: string;
    typeName: string;
}

export interface WorkspaceModelAccess {
    readText(filePath: string): Promise<string>;
    outputFiles(workspaceRoot: string): Promise<string[]>;
}

const diskAccess: WorkspaceModelAccess = {
    readText: filePath => fs.readFile(filePath, "utf8"),
    outputFiles: workspaceRoot => fg("output/**/*.json", {
        cwd: workspaceRoot, absolute: true, onlyFiles: true,
        ignore: ["**/{.git,node_modules,dist,out,target,.vscode-test}/**"],
    }),
};

export async function resolveProfileBaseTypes(
    dependencies: SushiPackageDependency[],
): Promise<Record<string, string>> {
    const resolutions = await resolvePackageProfileTypes(dependencies, diskAccess);
    return Object.fromEntries(Object.entries(resolutions).map(([canonical, resolution]) => [canonical, resolution.typeName]));
}

export async function resolveWorkspaceProfileTypes(
    workspaceRoot: string,
    dependencies: SushiPackageDependency[],
    access: WorkspaceModelAccess = diskAccess,
): Promise<Record<string, ProfileTypeResolution>> {
    const packageResolutions = await resolvePackageProfileTypes(dependencies, access);
    const outputResolutions: Record<string, ProfileTypeResolution> = {};
    for (const file of await access.outputFiles(workspaceRoot)) {
        await addProfileResolution(outputResolutions, file, file, access);
    }
    return {...packageResolutions, ...outputResolutions};
}

export async function resolveWorkspaceModelResourcePaths(
    workspaceRoot: string,
    dependencies: SushiPackageDependency[],
    profileResolutions: Record<string, ProfileTypeResolution>,
    access: WorkspaceModelAccess = diskAccess,
): Promise<string[]> {
    const resourcePaths = new Set(Object.values(profileResolutions).map(resolution => resolution.resourcePath));
    (await access.outputFiles(workspaceRoot)).forEach(file => resourcePaths.add(file));
    for (const dependency of dependencies.filter(candidate => candidate.indexExists)) {
        try {
            const index = JSON.parse(await access.readText(dependency.indexPath)) as PackageIndex;
            const packageDirectory = path.dirname(dependency.indexPath);
            for (const entry of index.files ?? []) {
                if (entry.resourceType === "ConceptMap" && entry.filename) {
                    resourcePaths.add(path.join(packageDirectory, entry.filename));
                }
            }
        } catch {
            // The index may disappear or be invalid between discovery and loading.
        }
    }
    return [...resourcePaths];
}

async function resolvePackageProfileTypes(
    dependencies: SushiPackageDependency[],
    access: WorkspaceModelAccess,
): Promise<Record<string, ProfileTypeResolution>> {
    const result: Record<string, ProfileTypeResolution> = {};
    for (const dependency of dependencies.filter(candidate => candidate.indexExists)) {
        try {
            const index = JSON.parse(await access.readText(dependency.indexPath)) as PackageIndex;
            const packageDirectory = path.dirname(dependency.indexPath);
            for (const entry of index.files ?? []) {
                if (entry.resourceType !== "StructureDefinition" || !entry.filename || !entry.url) {
                    continue;
                }
                try {
                    const resourcePath = path.join(packageDirectory, entry.filename);
                    await addProfileResolution(result, resourcePath,
                        `${dependency.packageId}#${dependency.version}: ${resourcePath}`, access, entry.url);
                } catch {
                    // Ignore stale or malformed package entries and continue resolving the package.
                }
            }
        } catch {
            // The index may disappear or be invalid between discovery and loading.
        }
    }
    return result;
}

async function addProfileResolution(
    result: Record<string, ProfileTypeResolution>,
    resourcePath: string,
    source: string,
    access: WorkspaceModelAccess,
    indexedCanonical?: string,
): Promise<void> {
    const definition = JSON.parse(await access.readText(resourcePath)) as ProfileStructureDefinition;
    const baseType = definition.kind === "logical"
        ? resolveStructureDefinitionTypeName(definition)
        : definition.type ?? definition.baseDefinition?.split("|")[0].split("/").at(-1);
    if (definition.resourceType !== "StructureDefinition" || !baseType) {
        return;
    }
    for (const canonical of [indexedCanonical, definition.url]) {
        if (canonical) {
            const normalizedCanonical = canonical.split("|")[0];
            result[normalizedCanonical] = {
                resourcePath, source, typeName: definition.kind === "logical" ? normalizedCanonical : baseType,
                ...(definition.kind ? {kind: definition.kind} : {}),
            };
        }
    }
}

export function collectFmlModelResources(value: unknown): JsonValue[] {
    if (typeof value !== "object" || value === null || Array.isArray(value) || !("resourceType" in value)) {
        return [];
    }
    if (value.resourceType === "StructureDefinition" || value.resourceType === "ConceptMap") {
        return [value as JsonValue];
    }
    if (value.resourceType === "Bundle" && "entry" in value && Array.isArray(value.entry)) {
        return value.entry.flatMap(entry =>
            entry && typeof entry === "object" && "resource" in entry ? collectFmlModelResources(entry.resource) : []);
    }
    return [];
}
