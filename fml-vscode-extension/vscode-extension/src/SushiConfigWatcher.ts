import {existsSync} from "node:fs";
import os from "node:os";
import path from "node:path";
import * as vscode from "vscode";
import YAML from "yaml";
import {
    buildLogicalTypeModels,
    resolveStructureDefinitionTypeName,
    toFhirVersion,
    type TypeModel,
} from "@fhirpath-lab/validator";
import {logData} from "./utils";

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
    profileBaseTypes: Record<string, string>;
    profileResolutionSources: Record<string, string>;
}

interface SushiConfigDocument {
    dependencies?: Record<string, string | number | {version?: string | number}>;
    fhirVersion?: string | string[];
}

const SUSHI_CONFIG_GLOB = "**/sushi-config.{yaml,yml}";
const OUTPUT_JSON_GLOB = "**/output/**/*.json";
const IG_OUTPUT_MARKER_GLOB = "**/output/ImplementationGuide*.json";
const WORKSPACE_EXCLUDE_GLOB = "**/{.git,node_modules,dist,out,target,.vscode-test}/**";

export class SushiConfigWatcher implements vscode.Disposable {
    private readonly watcher = vscode.workspace.createFileSystemWatcher(SUSHI_CONFIG_GLOB);
    private readonly outputWatcher = vscode.workspace.createFileSystemWatcher(OUTPUT_JSON_GLOB);
    private readonly configurations = new Map<string, SushiWorkspaceConfiguration>();
    private readonly configurationUris = new Map<string, vscode.Uri>();

    public constructor(
        private readonly logger: vscode.OutputChannel,
        private readonly cachePath = path.join(os.homedir(), ".fhir", "packages"),
        private readonly onConfigurationChanged: () => Promise<void> | void = () => undefined,
    ) {
        this.watcher.onDidCreate(uri => void this.readAndReport(uri));
        this.watcher.onDidChange(uri => void this.readAndReport(uri));
        this.watcher.onDidDelete(uri => void this.removeConfiguration(uri));
        this.outputWatcher.onDidCreate(uri => void this.refreshForOutput(uri));
        this.outputWatcher.onDidChange(uri => void this.refreshForOutput(uri));
        this.outputWatcher.onDidDelete(uri => void this.refreshForOutput(uri));
    }

    public async initialize(): Promise<void> {
        const configFiles = await vscode.workspace.findFiles(
            SUSHI_CONFIG_GLOB,
            WORKSPACE_EXCLUDE_GLOB,
        );
        if (configFiles.length === 0) {
            logData("No workspace sushi-config.yaml or sushi-config.yml found.", this.logger);
        }
        for (const uri of configFiles) {
            await this.readAndReport(uri);
        }
        const outputMarkers = await vscode.workspace.findFiles(
            IG_OUTPUT_MARKER_GLOB,
            WORKSPACE_EXCLUDE_GLOB,
        );
        const outputProjectDirectories = new Set(
            outputMarkers.flatMap(uri => implementationGuideOutputProjectDirectory(uri.fsPath) ?? []),
        );
        for (const directory of outputProjectDirectories) {
            if (!this.configurationUris.has(directory)) {
                await this.readOutputAndReport(directory);
            }
        }
    }

    public dispose(): void {
        this.watcher.dispose();
        this.outputWatcher.dispose();
    }

    public getConfigurationForPath(filePath: string): SushiWorkspaceConfiguration | undefined {
        return [...this.configurations.entries()]
            .filter(([directory]) => isPathInside(filePath, directory))
            .sort(([left], [right]) => right.length - left.length)[0]?.[1];
    }

    public getWorkspaceConfiguration(): SushiWorkspaceConfiguration {
        const configurations = [...this.configurations.values()];
        return {
            dependencies: configurations.flatMap(configuration => configuration.dependencies),
            fhirVersion: configurations.find(configuration => configuration.fhirVersion)?.fhirVersion,
            customTypeModels: Object.assign(
                {},
                ...configurations.map(configuration => configuration.customTypeModels),
            ),
            modelResourcePaths: [...new Set(configurations.flatMap(configuration => configuration.modelResourcePaths))],
            profileBaseTypes: Object.assign({}, ...configurations.map(configuration => configuration.profileBaseTypes)),
            profileResolutionSources: Object.assign(
                {},
                ...configurations.map(configuration => configuration.profileResolutionSources),
            ),
        };
    }

    private async readAndReport(uri: vscode.Uri): Promise<void> {
        try {
            const source = new TextDecoder().decode(await vscode.workspace.fs.readFile(uri));
            const configuration = parseSushiConfiguration(source, this.cachePath);
            const directory = path.dirname(uri.fsPath);
            await populateWorkspaceModels(directory, configuration);
            this.configurations.set(directory, configuration);
            this.configurationUris.set(directory, uri);
            logData(`SUSHI configuration: ${uri.fsPath}`, this.logger);
            logData(
                `SUSHI default FHIR version: ${configuration.fhirVersion ?? "not specified"}`,
                this.logger,
            );
            if (configuration.dependencies.length === 0) {
                logData("SUSHI package dependencies: none.", this.logger);
            }
            for (const dependency of configuration.dependencies) {
                logData(
                    `SUSHI package dependency: ${dependency.packageId}#${dependency.version}; `
                    + `index ${dependency.indexExists ? "found" : "not found"}: ${dependency.indexPath}`,
                    this.logger,
                );
            }
            logData(
                `SUSHI logical model types: ${Object.keys(configuration.customTypeModels).join(", ") || "none"}`,
                this.logger,
            );
            await this.onConfigurationChanged();
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            logData(`Unable to read SUSHI configuration ${uri.fsPath}: ${message}`, this.logger);
        }
    }

    private async readOutputAndReport(directory: string): Promise<void> {
        try {
            const configuration = await resolveOutputWorkspaceConfiguration(directory);
            this.configurations.set(directory, configuration);
            logData(`IG output models: ${path.join(directory, "output")}`, this.logger);
            logData(
                `IG output logical model types: ${Object.keys(configuration.customTypeModels).join(", ") || "none"}`,
                this.logger,
            );
            await this.onConfigurationChanged();
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            logData(`Unable to read IG output models from ${directory}: ${message}`, this.logger);
        }
    }

    private async removeConfiguration(uri: vscode.Uri): Promise<void> {
        const directory = path.dirname(uri.fsPath);
        this.configurations.delete(directory);
        this.configurationUris.delete(directory);
        logData(`SUSHI configuration removed: ${uri.fsPath}`, this.logger);
        if (await hasImplementationGuideOutput(directory)) {
            await this.readOutputAndReport(directory);
        } else {
            await this.onConfigurationChanged();
        }
    }

    private async refreshForOutput(uri: vscode.Uri): Promise<void> {
        const directory = outputProjectDirectory(uri.fsPath);
        if (!directory) {
            return;
        }
        const configurationUri = this.configurationUris.get(directory);
        if (configurationUri) {
            logData(`SUSHI output profile changed: ${uri.fsPath}`, this.logger);
            await this.readAndReport(configurationUri);
        } else if (await hasImplementationGuideOutput(directory)) {
            logData(`IG output profile changed: ${uri.fsPath}`, this.logger);
            await this.readOutputAndReport(directory);
        } else if (this.configurations.delete(directory)) {
            logData(`IG output models removed: ${path.join(directory, "output")}`, this.logger);
            await this.onConfigurationChanged();
        }
    }
}

async function hasImplementationGuideOutput(directory: string): Promise<boolean> {
    const markers = await vscode.workspace.findFiles(
        new vscode.RelativePattern(directory, "output/ImplementationGuide*.json"),
        WORKSPACE_EXCLUDE_GLOB,
        1,
    );
    return markers.length > 0;
}

function createEmptyWorkspaceConfiguration(): SushiWorkspaceConfiguration {
    return {
        dependencies: [],
        customTypeModels: {},
        modelResourcePaths: [],
        profileBaseTypes: {},
        profileResolutionSources: {},
    };
}

export async function resolveOutputWorkspaceConfiguration(
    directory: string,
): Promise<SushiWorkspaceConfiguration> {
    const configuration = createEmptyWorkspaceConfiguration();
    await populateWorkspaceModels(directory, configuration);
    return configuration;
}

async function populateWorkspaceModels(
    directory: string,
    configuration: SushiWorkspaceConfiguration,
): Promise<void> {
    const resolutions = await resolveWorkspaceProfileTypes(directory, configuration.dependencies);
    configuration.profileBaseTypes = Object.fromEntries(
        Object.entries(resolutions).map(([canonical, resolution]) => [canonical, resolution.typeName]),
    );
    configuration.profileResolutionSources = Object.fromEntries(
        Object.entries(resolutions).map(([canonical, resolution]) => [canonical, resolution.source]),
    );
    configuration.modelResourcePaths = await resolveWorkspaceModelResourcePaths(
        directory,
        configuration.dependencies,
        resolutions,
    );
    configuration.customTypeModels = buildLogicalTypeModels(
        await readJsonResources(configuration.modelResourcePaths),
        toFhirVersion(configuration.fhirVersion),
    );
}

export function outputProjectDirectory(filePath: string): string | undefined {
    let directory = path.dirname(filePath);
    while (path.dirname(directory) !== directory) {
        if (path.basename(directory) === "output") {
            return path.dirname(directory);
        }
        directory = path.dirname(directory);
    }
    return undefined;
}

export function implementationGuideOutputProjectDirectory(filePath: string): string | undefined {
    const outputDirectory = path.dirname(filePath);
    return path.basename(outputDirectory) === "output"
        && /^ImplementationGuide.*\.json$/.test(path.basename(filePath))
        ? path.dirname(outputDirectory)
        : undefined;
}

export function parseSushiConfiguration(
    source: string,
    cachePath: string,
    fileExists: (filePath: string) => boolean = existsSync,
): SushiWorkspaceConfiguration {
    const parsed = YAML.parse(source) as SushiConfigDocument | null;
    const fhirVersions = Array.isArray(parsed?.fhirVersion)
        ? parsed.fhirVersion
        : [parsed?.fhirVersion];
    const fhirVersion = fhirVersions.find(version => typeof version === "string" && version.trim())?.trim();
    const dependencies = Object.entries(parsed?.dependencies ?? {}).flatMap(([packageId, value]) => {
        const version = typeof value === "object" && value !== null
            ? value.version
            : value;
        if (version === undefined || version === null || String(version).trim() === "") {
            return [];
        }
        const normalizedVersion = String(version);
        const indexPath = path.join(cachePath, `${packageId}#${normalizedVersion}`, "package", ".index.json");
        return [{
            indexExists: fileExists(indexPath),
            indexPath,
            packageId,
            version: normalizedVersion,
        }];
    });
    return {
        dependencies,
        fhirVersion,
        customTypeModels: {},
        modelResourcePaths: [],
        profileBaseTypes: {},
        profileResolutionSources: {},
    };
}

interface PackageIndex {
    files?: Array<{
        filename?: string;
        resourceType?: string;
        url?: string;
    }>;
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

export async function resolveProfileBaseTypes(
    dependencies: SushiPackageDependency[],
): Promise<Record<string, string>> {
    const resolutions = await resolvePackageProfileTypes(dependencies);
    return Object.fromEntries(
        Object.entries(resolutions).map(([canonical, resolution]) => [canonical, resolution.typeName]),
    );
}

export interface ProfileTypeResolution {
    kind?: string;
    resourcePath: string;
    source: string;
    typeName: string;
}

export async function resolveWorkspaceProfileTypes(
    workspaceRoot: string,
    dependencies: SushiPackageDependency[],
): Promise<Record<string, ProfileTypeResolution>> {
    const packageResolutions = await resolvePackageProfileTypes(dependencies);
    const outputResolutions: Record<string, ProfileTypeResolution> = {};
    const outputFiles = await vscode.workspace.findFiles(
        new vscode.RelativePattern(workspaceRoot, "output/**/*.json"),
        "**/{.git,node_modules,dist,out,target,.vscode-test}/**",
    );
    for (const uri of outputFiles) {
        await addProfileResolution(outputResolutions, uri.fsPath, uri.fsPath);
    }
    return {...packageResolutions, ...outputResolutions};
}

export async function resolveWorkspaceModelResourcePaths(
    workspaceRoot: string,
    dependencies: SushiPackageDependency[],
    profileResolutions: Record<string, ProfileTypeResolution>,
): Promise<string[]> {
    const resourcePaths = new Set(
        Object.values(profileResolutions).map(resolution => resolution.resourcePath),
    );
    const outputFiles = await vscode.workspace.findFiles(
        new vscode.RelativePattern(workspaceRoot, "output/**/*.json"),
        "**/{.git,node_modules,dist,out,target,.vscode-test}/**",
    );
    outputFiles.forEach(uri => resourcePaths.add(uri.fsPath));
    for (const dependency of dependencies.filter(candidate => candidate.indexExists)) {
        try {
            const index = JSON.parse(await fsReadText(dependency.indexPath)) as PackageIndex;
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
): Promise<Record<string, ProfileTypeResolution>> {
    const result: Record<string, ProfileTypeResolution> = {};
    for (const dependency of dependencies.filter(candidate => candidate.indexExists)) {
        try {
            const index = JSON.parse(await fsReadText(dependency.indexPath)) as PackageIndex;
            const packageDirectory = path.dirname(dependency.indexPath);
            for (const entry of index.files ?? []) {
                if (entry.resourceType !== "StructureDefinition" || !entry.filename || !entry.url) {
                    continue;
                }
                try {
                    const resourcePath = path.join(packageDirectory, entry.filename);
                    await addProfileResolution(
                        result,
                        resourcePath,
                        `${dependency.packageId}#${dependency.version}: ${resourcePath}`,
                        entry.url,
                    );
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
    indexedCanonical?: string,
): Promise<void> {
    const definition = JSON.parse(await fsReadText(resourcePath)) as ProfileStructureDefinition;
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
                resourcePath,
                source,
                typeName: definition.kind === "logical" ? normalizedCanonical : baseType,
                ...(definition.kind ? {kind: definition.kind} : {}),
            };
        }
    }
}

async function fsReadText(filePath: string): Promise<string> {
    return new TextDecoder().decode(await vscode.workspace.fs.readFile(vscode.Uri.file(filePath)));
}

function isPathInside(filePath: string, directory: string): boolean {
    const relativePath = path.relative(directory, filePath);
    return relativePath === "" || (!relativePath.startsWith("..") && !path.isAbsolute(relativePath));
}

async function readJsonResources(filePaths: string[]): Promise<unknown[]> {
    const resources: unknown[] = [];
    for (const filePath of filePaths) {
        try {
            resources.push(JSON.parse(await fsReadText(filePath)) as unknown);
        } catch {
            // Ignore stale or malformed model files while retaining other models.
        }
    }
    return resources;
}