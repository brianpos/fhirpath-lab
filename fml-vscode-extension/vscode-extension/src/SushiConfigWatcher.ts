import os from "node:os";
import path from "node:path";
import * as vscode from "vscode";
import {
    buildLogicalTypeModels,
    toFhirVersion,
} from "@fhirpath-lab/validator";
import {logData} from "./utils";
import type {EvaluationModelContext} from "@fhirpath-lab/language-service";
import {collectFmlModelResources, filePathIdentity, FmlModelFileSnapshot} from "./FmlDebugDependencies";

import {
    parseSushiConfiguration, resolveWorkspaceModelResourcePaths as resolveModelPaths,
    resolveWorkspaceProfileTypes as resolveProfileTypes, type ProfileTypeResolution,
    type SushiPackageDependency, type SushiWorkspaceConfiguration, type WorkspaceModelAccess,
} from "./FmlWorkspaceModels";

export {
    parseSushiConfiguration, resolveProfileBaseTypes,
    type SushiPackageDependency, type SushiWorkspaceConfiguration, type ProfileTypeResolution,
} from "./FmlWorkspaceModels";

const SUSHI_CONFIG_GLOB = "**/sushi-config.{yaml,yml}";
const OUTPUT_JSON_GLOB = "**/output/**/*.json";
const IG_OUTPUT_MARKER_GLOB = "**/output/**/ImplementationGuide*.json";
const WORKSPACE_EXCLUDE_GLOB = "**/{.git,node_modules,dist,out,target,.vscode-test}/**";

export class SushiConfigWatcher implements vscode.Disposable {
    private readonly watcher = vscode.workspace.createFileSystemWatcher(SUSHI_CONFIG_GLOB);
    private readonly outputWatcher = vscode.workspace.createFileSystemWatcher(OUTPUT_JSON_GLOB);
    private readonly configurations = new Map<string, SushiWorkspaceConfiguration>();
    private readonly configurationUris = new Map<string, vscode.Uri>();
    private readonly revisions = new Map<string, number>();
    private disposed = false;

    public constructor(
        private readonly logger: vscode.OutputChannel,
        private readonly cachePath = path.join(os.homedir(), ".fhir", "packages"),
        private readonly onConfigurationChanged: () => Promise<void> | void = () => undefined,
        private readonly loadModels = populateWorkspaceModels,
    ) {
        this.watcher.onDidCreate(uri => void this.readAndReport(uri));
        this.watcher.onDidChange(uri => void this.readAndReport(uri));
        this.watcher.onDidDelete(uri => {
            void this.removeConfiguration(uri).catch(error => {
                logData(`Unable to remove SUSHI configuration ${uri.fsPath}: ${String(error)}`, this.logger);
            });
        });
        const refreshOutput = (uri: vscode.Uri): void => {
            void this.refreshForOutput(uri).catch(error => {
                logData(`Unable to refresh IG output ${uri.fsPath}: ${String(error)}`, this.logger);
            });
        };
        this.outputWatcher.onDidCreate(refreshOutput);
        this.outputWatcher.onDidChange(refreshOutput);
        this.outputWatcher.onDidDelete(refreshOutput);
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
        this.disposed = true;
        this.watcher.dispose();
        this.outputWatcher.dispose();
        this.revisions.clear();
    }

    public getConfigurationForPath(filePath: string): SushiWorkspaceConfiguration | undefined {
        return [...this.configurations.entries()]
            .filter(([directory]) => isPathInside(filePath, directory))
            .sort(([left], [right]) => right.length - left.length)[0]?.[1];
    }

    public getEvaluationConfigurationForPath(filePath: string): SushiWorkspaceConfiguration {
        return this.getConfigurationForPath(filePath) ?? this.getWorkspaceConfiguration();
    }

    public getEvaluationContexts(): EvaluationModelContext[] {
        return [...this.configurations.entries()].map(([directory, configuration]) => ({
            rootUri: vscode.Uri.file(directory).toString(),
            defaultFhirVersion: toFhirVersion(configuration.fhirVersion),
            profileBaseTypes: configuration.profileBaseTypes,
            customTypeModels: configuration.customTypeModels,
            modelResourcePaths: configuration.modelResourcePaths,
        }));
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
            modelFileCache: configurations.some(configuration => configuration.modelFileCache === undefined)
                ? undefined : [...new Map(configurations.flatMap(configuration => configuration.modelFileCache ?? [])
                    .map(file => [filePathIdentity(file.filePath), file])).values()],
            profileBaseTypes: Object.assign({}, ...configurations.map(configuration => configuration.profileBaseTypes)),
            profileResolutionSources: Object.assign(
                {},
                ...configurations.map(configuration => configuration.profileResolutionSources),
            ),
        };
    }

    private beginUpdate(directory: string): number {
        const key = filePathIdentity(directory);
        const revision = (this.revisions.get(key) ?? 0) + 1;
        this.revisions.set(key, revision);
        return revision;
    }

    private isCurrentUpdate(directory: string, revision: number): boolean {
        return !this.disposed && this.revisions.get(filePathIdentity(directory)) === revision;
    }

    private async readAndReport(
        uri: vscode.Uri,
        revision = this.beginUpdate(path.dirname(uri.fsPath)),
    ): Promise<void> {
        const directory = path.dirname(uri.fsPath);
        if (!this.isCurrentUpdate(directory, revision)) {
            return;
        }
        // Output events must see the pending SUSHI owner before its models finish loading.
        this.configurationUris.set(directory, uri);
        try {
            const source = new TextDecoder().decode(await vscode.workspace.fs.readFile(uri));
            const configuration = parseSushiConfiguration(source, this.cachePath);
            await this.loadModels(directory, configuration);
            if (!this.isCurrentUpdate(directory, revision)) {
                return;
            }
            this.configurations.set(directory, configuration);
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

    private async readOutputAndReport(
        directory: string,
        revision = this.beginUpdate(directory),
    ): Promise<void> {
        try {
            const configuration = createEmptyWorkspaceConfiguration();
            await this.loadModels(directory, configuration);
            if (!this.isCurrentUpdate(directory, revision) || this.configurationUris.has(directory)) {
                return;
            }
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
        const revision = this.beginUpdate(directory);
        this.configurations.delete(directory);
        this.configurationUris.delete(directory);
        logData(`SUSHI configuration removed: ${uri.fsPath}`, this.logger);
        const hasOutput = await hasImplementationGuideOutput(directory);
        if (!this.isCurrentUpdate(directory, revision)) {
            return;
        }
        if (hasOutput) {
            await this.readOutputAndReport(directory, revision);
        } else {
            await this.onConfigurationChanged();
        }
    }

    private async refreshForOutput(uri: vscode.Uri): Promise<void> {
        const directory = outputProjectDirectory(uri.fsPath);
        if (!directory) {
            return;
        }
        const revision = this.beginUpdate(directory);
        const hasOutput = this.configurationUris.has(directory)
            ? false : await hasImplementationGuideOutput(directory);
        if (!this.isCurrentUpdate(directory, revision)) {
            return;
        }
        const configurationUri = this.configurationUris.get(directory);
        if (configurationUri) {
            logData(`SUSHI output profile changed: ${uri.fsPath}`, this.logger);
            await this.readAndReport(configurationUri, revision);
        } else if (hasOutput) {
            logData(`IG output profile changed: ${uri.fsPath}`, this.logger);
            await this.readOutputAndReport(directory, revision);
        } else if (this.configurations.delete(directory)) {
            logData(`IG output models removed: ${path.join(directory, "output")}`, this.logger);
            await this.onConfigurationChanged();
        }
    }
}

async function hasImplementationGuideOutput(directory: string): Promise<boolean> {
    const markers = await vscode.workspace.findFiles(
        new vscode.RelativePattern(directory, "output/**/ImplementationGuide*.json"),
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
    configuration.modelFileCache = await readModelFiles(configuration.modelResourcePaths);
    configuration.customTypeModels = buildLogicalTypeModels(
        configuration.modelFileCache.flatMap(file => file.resources),
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
    return /^ImplementationGuide.*\.json$/.test(path.basename(filePath))
        ? outputProjectDirectory(filePath) : undefined;
}

const workspaceModelAccess: WorkspaceModelAccess = {
    readText: fsReadText,
    outputFiles: async workspaceRoot => (await vscode.workspace.findFiles(
        new vscode.RelativePattern(workspaceRoot, "output/**/*.json"),
        WORKSPACE_EXCLUDE_GLOB,
    )).map(uri => uri.fsPath),
};

export async function resolveWorkspaceProfileTypes(
    workspaceRoot: string,
    dependencies: SushiPackageDependency[],
): Promise<Record<string, ProfileTypeResolution>> {
    return resolveProfileTypes(workspaceRoot, dependencies, workspaceModelAccess);
}

export async function resolveWorkspaceModelResourcePaths(
    workspaceRoot: string,
    dependencies: SushiPackageDependency[],
    profileResolutions: Record<string, ProfileTypeResolution>,
): Promise<string[]> {
    return resolveModelPaths(workspaceRoot, dependencies, profileResolutions, workspaceModelAccess);
}

async function fsReadText(filePath: string): Promise<string> {
    return new TextDecoder().decode(await vscode.workspace.fs.readFile(vscode.Uri.file(filePath)));
}

function isPathInside(filePath: string, directory: string): boolean {
    const relativePath = path.relative(directory, filePath);
    return relativePath === "" || (!relativePath.startsWith("..") && !path.isAbsolute(relativePath));
}

async function readModelFiles(filePaths: string[]): Promise<FmlModelFileSnapshot[]> {
    const files: FmlModelFileSnapshot[] = [];
    for (const filePath of filePaths) {
        try {
            files.push({filePath, resources: collectFmlModelResources(JSON.parse(await fsReadText(filePath)))});
        } catch {
            // Ignore stale or malformed model files while retaining other models.
            files.push({filePath, resources: []});
        }
    }
    return files;
}