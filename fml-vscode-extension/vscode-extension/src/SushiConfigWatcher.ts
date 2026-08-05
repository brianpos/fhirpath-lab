import {existsSync} from "node:fs";
import os from "node:os";
import path from "node:path";
import * as vscode from "vscode";
import YAML from "yaml";
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
    modelResourcePaths: string[];
    profileBaseTypes: Record<string, string>;
    profileResolutionSources: Record<string, string>;
}

interface SushiConfigDocument {
    dependencies?: Record<string, string | number | {version?: string | number}>;
    fhirVersion?: string | string[];
}

export class SushiConfigWatcher implements vscode.Disposable {
    private readonly watcher = vscode.workspace.createFileSystemWatcher("sushi-config.{yaml,yml}");
    private readonly outputWatcher = vscode.workspace.createFileSystemWatcher("**/output/**/*.json");
    private readonly configurations = new Map<string, SushiWorkspaceConfiguration>();
    private readonly configurationUris = new Map<string, vscode.Uri>();

    public constructor(
        private readonly logger: vscode.OutputChannel,
        private readonly cachePath = path.join(os.homedir(), ".fhir", "packages"),
        private readonly onConfigurationChanged: () => Promise<void> | void = () => undefined,
    ) {
        this.watcher.onDidCreate(uri => void this.readAndReport(uri));
        this.watcher.onDidChange(uri => void this.readAndReport(uri));
        this.watcher.onDidDelete(uri => {
            this.configurations.delete(path.dirname(uri.fsPath));
            this.configurationUris.delete(path.dirname(uri.fsPath));
            logData(`SUSHI configuration removed: ${uri.fsPath}`, this.logger);
        });
        this.outputWatcher.onDidCreate(uri => void this.refreshForOutput(uri));
        this.outputWatcher.onDidChange(uri => void this.refreshForOutput(uri));
        this.outputWatcher.onDidDelete(uri => void this.refreshForOutput(uri));
    }

    public async initialize(): Promise<void> {
        const configFiles = await vscode.workspace.findFiles(
            "sushi-config.{yaml,yml}",
            "**/{.git,node_modules,dist,out,target,.vscode-test}/**",
        );
        if (configFiles.length === 0) {
            logData("No workspace sushi-config.yaml or sushi-config.yml found.", this.logger);
            return;
        }
        for (const uri of configFiles) {
            await this.readAndReport(uri);
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
            const resolutions = await resolveWorkspaceProfileTypes(
                path.dirname(uri.fsPath),
                configuration.dependencies,
            );
            configuration.profileBaseTypes = Object.fromEntries(
                Object.entries(resolutions).map(([canonical, resolution]) => [canonical, resolution.typeName]),
            );
            configuration.profileResolutionSources = Object.fromEntries(
                Object.entries(resolutions).map(([canonical, resolution]) => [canonical, resolution.source]),
            );
            configuration.modelResourcePaths = await resolveWorkspaceModelResourcePaths(
                path.dirname(uri.fsPath),
                configuration.dependencies,
                resolutions,
            );
            this.configurations.set(path.dirname(uri.fsPath), configuration);
            this.configurationUris.set(path.dirname(uri.fsPath), uri);
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
            await this.onConfigurationChanged();
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            logData(`Unable to read SUSHI configuration ${uri.fsPath}: ${message}`, this.logger);
        }
    }

    private async refreshForOutput(uri: vscode.Uri): Promise<void> {
        const configurationUri = [...this.configurationUris.entries()]
            .filter(([directory]) => isPathInside(uri.fsPath, path.join(directory, "output")))
            .sort(([left], [right]) => right.length - left.length)[0]?.[1];
        if (configurationUri) {
            logData(`SUSHI output profile changed: ${uri.fsPath}`, this.logger);
            await this.readAndReport(configurationUri);
        }
    }
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
    resourceType?: string;
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
    const baseType = definition.type ?? definition.baseDefinition?.split("|")[0].split("/").at(-1);
    if (definition.resourceType !== "StructureDefinition" || !baseType) {
        return;
    }
    for (const canonical of [indexedCanonical, definition.url]) {
        if (canonical) {
            result[canonical.split("|")[0]] = {resourcePath, source, typeName: baseType};
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