import {existsSync, promises as fs} from "node:fs";
import os from "node:os";
import path from "node:path";
import fg from "fast-glob";
import {toFhirVersion} from "@fhirpath-lab/validator";
import {
    collectFmlModelResources, parseSushiConfiguration,
    resolveWorkspaceModelResourcePaths, resolveWorkspaceProfileTypes,
} from "./FmlWorkspaceModels";
import {defaultContextProvider, type ContextProvider, type ExecutionContext} from "./FmlTestRunner";

/** Uses the same package indexes and IG output as the editor, without importing VS Code. */
export function createCliContextProvider(cachePath = path.join(os.homedir(), ".fhir", "packages")): ContextProvider {
    const contexts = new Map<string, Promise<Omit<ExecutionContext, "maps">>>();
    async function loadContext(directory: string): Promise<Omit<ExecutionContext, "maps">> {
        const configFile = ["sushi-config.yaml", "sushi-config.yml"]
            .map(name => path.join(directory, name)).find(file => existsSync(file));
        const hasOutput = !configFile && (await fg("output/**/ImplementationGuide*.json", {
            cwd: directory, onlyFiles: true,
        })).length > 0;
        if (!configFile && !hasOutput) {
            const parent = path.dirname(directory);
            return parent === directory ? {modelResources: []} : contextFor(parent);
        }
        const configuration = parseSushiConfiguration(configFile ? await fs.readFile(configFile, "utf8") : "", cachePath);
        const resolutions = await resolveWorkspaceProfileTypes(directory, configuration.dependencies);
        const files = await resolveWorkspaceModelResourcePaths(directory, configuration.dependencies, resolutions);
        const resources = await Promise.all(files.map(async file =>
            collectFmlModelResources(JSON.parse(await fs.readFile(file, "utf8")))));
        return {
            profileBaseTypes: Object.fromEntries(Object.entries(resolutions)
                .map(([canonical, resolution]) => [canonical, resolution.typeName])),
            modelResources: resources.flat(),
            defaultFhirVersion: toFhirVersion(configuration.fhirVersion),
        };
    }
    function contextFor(directory: string): Promise<Omit<ExecutionContext, "maps">> {
        let context = contexts.get(directory);
        if (!context) {
            context = loadContext(directory);
            contexts.set(directory, context);
        }
        return context;
    }
    return async (map, folderMaps) => ({
        ...await defaultContextProvider(map, folderMaps),
        ...await contextFor(path.dirname(map.filePath)),
    });
}
