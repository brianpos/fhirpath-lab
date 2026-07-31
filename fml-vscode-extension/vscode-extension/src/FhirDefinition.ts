import {CompletionItem, FileSystemWatcher, FileType, OutputChannel, Uri, window, workspace} from 'vscode';
import {ElementInfo, EnhancedCompletionItem, FhirSettings, SushiConfiguration} from './Models';
import {downloadFHIRPackage, extractTGZ} from './utils';
import YAML from 'yaml';
import path from 'path';
import os from 'os';
import fileSystem from 'fs';
import fs from 'fs';
import {maxSatisfying} from 'semver';

export class FhirDefinition {
    // fsWatcher keeps an eye on the workspace for filesystem events
    fsWatcher: FileSystemWatcher;
    fhirVersion: string = '';
    cachePath: string;
    canonicalURL: string = '';
    igId: string = '';
    parsedDependencies: { packageId: string; version: string }[] = [];
    fhirEntities: Map<string, EnhancedCompletionItem> = new Map();
    packagesRegistry!: string [];
    logger: OutputChannel;

    constructor(outputChannel: OutputChannel) {
        this.logger = outputChannel;
        this.logger.appendLine(`${(new Date()).toLocaleString('fr-FR')} : Start FhirDefinition`);
        this.cachePath = path.join(os.homedir(), '.fhir', 'packages');
        this.logger.appendLine(`${(new Date()).toLocaleString('fr-FR')} : Create file watcher (sushi-config)`);
        this.fsWatcher = workspace.createFileSystemWatcher('**/sushi-config.{yaml,yml}');
        this.fsWatcher.onDidChange(this.updateFhirEntities, this);
        this.fsWatcher.onDidCreate(this.updateFhirEntities, this);
        this.fsWatcher.onDidDelete(this.updateFhirEntities, this);
        this.logger.appendLine(`${(new Date()).toLocaleString('fr-FR')} : End FhirDefinition`);
    }

    public async updateFhirEntities(): Promise<void> {
        this.logger.appendLine(`${(new Date()).toLocaleString('fr-FR')} : Start updateFhirEntities`);
        this.packagesRegistry = await this.getPackagesRegistry();
        if (this.cachePath && path.isAbsolute(this.cachePath)) {
            let fhirPackage = 'hl7.fhir.r4.core';
            let fhirVersion = '4.0.1';
            let parsedConfig: SushiConfiguration;

            // first check if packagePath is valid. if not, give up right away
            try {
                await workspace.fs.stat(Uri.file(this.cachePath));
            } catch (err) {
                this.logger.appendLine(`${(new Date()).toLocaleString('fr-FR')} : Couldn't load FHIR definitions from path: ${this.cachePath}`);
                throw new Error(`Couldn't load FHIR definitions from path: ${this.cachePath}`);
            }

            // then, see if we have a configuration. if so, use it to try to set the dependencies.
            const configFiles = await workspace.findFiles('sushi-config.{yaml,yml}');

            if (configFiles.length > 0) {
                try {
                    const configContents = await workspace.fs.readFile(configFiles[0]);
                    const decoder = new TextDecoder();
                    const decodedConfig = decoder.decode(configContents);
                    parsedConfig = YAML.parse(decodedConfig);

                    // try to get canonical url
                    this.canonicalURL = parsedConfig.canonical ?? '';

                    // try to get id
                    this.igId = parsedConfig.id ?? '';

                    // try to get fhirVersion: if there's more than one, use the first one that is recognized
                    const listedVersions = Array.isArray(parsedConfig.fhirVersion)
                        ? parsedConfig.fhirVersion
                        : [parsedConfig.fhirVersion];

                    fhirVersion = listedVersions
                        .map(version => {
                            const versionMatch = version?.match(/^#?(\S*)/);
                            if (versionMatch) {
                                return versionMatch[1];
                            } else {
                                return null;
                            }
                        })
                        .find(version => /current|4\.0\.1|4\.[1-9]\d*\.\d+|5\.\d+\.\d+/.test(version!))!;
                    this.fhirVersion = fhirVersion;

                    if (!fhirVersion) {
                        fhirVersion = '4.0.1';
                    } else if (/^4\.[13]\./.test(fhirVersion)) {
                        fhirPackage = 'hl7.fhir.r4b.core';
                    } else if (!fhirVersion.startsWith('4.0.')) {
                        fhirPackage = 'hl7.fhir.r5.core';
                    }

                    // try to get dependencies: more or less doing SUSHI's importConfiguration.parseDependencies
                    if (parsedConfig.dependencies) {
                        this.parsedDependencies = Object.entries(parsedConfig.dependencies).map(
                            ([packageId, versionOrDetails]) => {
                                if (typeof versionOrDetails === 'string' || typeof versionOrDetails === 'number') {
                                    return {packageId, version: `${versionOrDetails}`};
                                } else if (versionOrDetails === null) {
                                    return {packageId, version: undefined};
                                } else {
                                    return {
                                        packageId,
                                        version: versionOrDetails.version ? `${versionOrDetails.version}` : undefined
                                    };
                                }
                            }
                        ) as { packageId: string; version: string; }[];
                    }

                    // try to get package build from ig
                    this.parsedDependencies.push({packageId: this.igId, version: 'dev'});

                } catch (err) {
                    // there was a problem parsing the configuration. so, just ignore it, and hope we can find the default FHIR package.
                    this.logger.appendLine(`${(new Date()).toLocaleString('fr-FR')} : there was a problem parsing the configuration`);
                }
            }
            this.parsedDependencies.push({
                packageId: fhirPackage,
                version: fhirVersion
            });

            // then, try to actually process the resource files for all those packages.
            this.fhirEntities = await this.makeItemsFromDependencies(this.parsedDependencies);
        }
        this.logger.appendLine(`${(new Date()).toLocaleString('fr-FR')} : End updateFhirEntities`);
    }

    public async makeItemsFromDependencies(dependencies: {
        packageId: string;
        version: string
    }[]): Promise<FhirDefinition['fhirEntities']> {
        this.logger.appendLine(`${(new Date()).toLocaleString('fr-FR')} : Start makeItemsFromDependencies`);
        const updatedEntities: FhirDefinition['fhirEntities'] = new Map();

        await Promise.all(
            dependencies.map(async dependency => {
                let resolvedVersion: string;
                if (/^\d+\.\d+\.x$/.test(dependency.version)) {
                    resolvedVersion = await this.resolvePatchVersion(
                        dependency.packageId,
                        dependency.version
                    );
                } else {
                    resolvedVersion = dependency.version;
                }

                const packageKey = `${dependency.packageId}#${resolvedVersion}`;
                try {
                    let download;
                    if (!fileSystem.existsSync(path.join(this.cachePath, packageKey))) {
                        download = downloadFHIRPackage(this.logger, this.packagesRegistry, `${dependency.packageId}`, `${resolvedVersion}`);
                        if (download) {
                            const packageInput = path.join(os.homedir(), '.fhir', `${dependency.packageId}-${resolvedVersion}.tgz`);
                            const packageOutput = path.join(os.homedir(), '.fhir', 'packages', packageKey);
                            await extractTGZ(this.logger, packageInput, packageOutput);
                        }
                    }

                    if (download === undefined || download) {
                        const packagePath = path.join(this.cachePath, packageKey, 'package');
                        const packageFiles = await workspace.fs.readDirectory(Uri.file(packagePath));
                        await Promise.all(
                            packageFiles.map(async ([fileName, type]) => {
                                if (type === FileType.File && fileName.startsWith("StructureDefinition") && fileName.endsWith('.json')) {
                                    try {
                                        const rawContents = await workspace.fs.readFile(
                                            Uri.file(path.join(packagePath, fileName))
                                        );
                                        const decoder = new TextDecoder();
                                        const decodedContents = decoder.decode(rawContents);
                                        const parsedContents = JSON.parse(decodedContents);
                                        const items: EnhancedCompletionItem[] = [];
                                        let snapshotElements: ElementInfo[];
                                        if (parsedContents.url) {
                                            items.push(new CompletionItem(parsedContents.url));
                                        }
                                        snapshotElements = this.buildElementsFromSnapshot(parsedContents.snapshot.element);
                                        items.forEach(item => {
                                            item.detail = `${dependency.packageId}`;
                                            item.type = parsedContents.type;
                                            if (snapshotElements !== null) {
                                                item.elements = snapshotElements;
                                            }
                                            updatedEntities.set(item.label as string, item);
                                        });
                                    } catch (err) {
                                        // it might be unparseable JSON, or a file may have been removed between
                                        // readDirectory and readFile. either way, it's okay. just keep going.
                                    }
                                }
                            })
                        );
                    }
                } catch (err) {
                    console.error(
                        `Could not load definition information for package ${packageKey}`
                    );
                    window.showInformationMessage(
                        `Could not load definition information for package ${packageKey}`
                    );
                    this.logger.appendLine(`${(new Date()).toLocaleString('fr-FR')} : Could not load definition information for package ${packageKey}`);
                }
                return;
            })
        );
        this.logger.appendLine(`${(new Date()).toLocaleString('fr-FR')} : End makeItemsFromDependencies`);
        return updatedEntities;
    }

    public async resolvePatchVersion(packageId: string, version: string): Promise<string> {
        this.logger.appendLine(`${(new Date()).toLocaleString('fr-FR')} : Start resolvePatchVersion`);
        const cacheContents = await workspace.fs.readDirectory(Uri.file(this.cachePath));
        const potentialVersions = cacheContents
            .filter(
                ([fileName, type]) => type === FileType.Directory && fileName.startsWith(`${packageId}#`)
            )
            .map(([fileName]) => fileName.slice(fileName.indexOf('#') + 1));
        this.logger.appendLine(`${(new Date()).toLocaleString('fr-FR')} : End resolvePatchVersion`);
        return maxSatisfying(potentialVersions, version) ?? version;
    }

    public buildElementsFromSnapshot(snapshotElements: any[]): ElementInfo[] {
        const result: ElementInfo[] = [];
        snapshotElements.forEach(element => {
            const pathParts: string[] = element.path?.split('.').slice(1) ?? [];
            if (pathParts.length > 0) {
                let parent: ElementInfo[] = result;
                while (pathParts.length > 1 && parent !== null) {
                    const parentPart = pathParts.shift();
                    parent = parent.find(p => p.path === parentPart)!.children;
                }
                if (parent !== null && !parent.some(existing => existing.path === pathParts[0])) {
                    if ((typeof element.max === "string" && element.max !== "0") || (typeof element.max === "number" && element.max > 0)) {
                        parent.push({
                            path: pathParts[0].endsWith('[x]') ? pathParts[0].replace('[x]', '') : pathParts[0],
                            types: element.type?.map((type: any) => type.code) ?? [],
                            children: []
                        });
                    }
                }
            }
        });
        return result;
    }

    private async getPackagesRegistry(): Promise<string[]> {
        const registers: string[] = [];

        //Add the 2 official registers
        registers.push("http://packages.fhir.org/");
        registers.push("http://packages2.fhir.org/");

        //Retrieve fhir-settings
        if (fs.existsSync(path.join(os.homedir(), '.fhir', 'fhir-settings.json'))) {
            const settingsContents = await workspace.fs.readFile(Uri.file(path.join(os.homedir(), '.fhir', 'fhir-settings.json')));
            const decoder = new TextDecoder();
            const decodedSettings = decoder.decode(settingsContents);
            const parsedSettings = YAML.parse(decodedSettings);

            // TODO : correct error
            parsedSettings["servers"].forEach((elem: FhirSettings) => {
                registers.push(elem.url);
            });
        }

        return registers;
    }

}
