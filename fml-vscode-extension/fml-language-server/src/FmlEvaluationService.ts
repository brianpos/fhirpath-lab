import {FmlDebugEngineError, FmlLocalDebugService, JsonValue} from "@fhirpath-lab/debug-service";
import {
    DocumentEvaluationResult, EvaluateDocumentRequest, EvaluationModelContext,
    EvaluationModelFile, WorkspaceIndexRequest,
} from "@fhirpath-lab/language-service";
import {buildLogicalTypeModels} from "@fhirpath-lab/validator";
import path from "node:path";
import {fileURLToPath} from "node:url";
import {WorkspaceFmlIndex} from "./WorkspaceFmlIndex";

interface ModelContext extends Omit<EvaluationModelContext, "rootUri"> {
    rootUri?: string;
    files: readonly EvaluationModelFile[];
    resources: JsonValue[];
    conceptMaps: ReadonlyMap<string, JsonValue>;
}

export class FmlEvaluationService {
    private global: ModelContext = {
        profileBaseTypes: {}, customTypeModels: {}, modelResourcePaths: [], files: [], resources: [], conceptMaps: new Map(),
    };
    private contexts: ModelContext[] = [];

    public constructor(private readonly index: WorkspaceFmlIndex) {}

    public configure(request: WorkspaceIndexRequest): void {
        const files = request.modelFiles ?? [];
        const byFile = new Map(files.map(file => [fileIdentity(file.filePath), file]));
        const configure = (context: Omit<EvaluationModelContext, "rootUri"> & {rootUri?: string}): ModelContext => {
            const selected = context.modelResourcePaths.map(filePath => {
                const file = byFile.get(fileIdentity(filePath));
                if (!file) throw new Error(`Model content is not cached for ${filePath}. Re-index the workspace.`);
                return file;
            });
            const resources = selected.flatMap(file => file.resources);
            return {
                ...context, files: selected, resources, conceptMaps: indexConceptMaps(resources),
                customTypeModels: !context.defaultFhirVersion && resources.some(isStructureDefinition)
                    ? buildLogicalTypeModels(resources, "R4") : context.customTypeModels,
            };
        };
        const global = configure({
            defaultFhirVersion: request.defaultFhirVersion,
            profileBaseTypes: request.profileBaseTypes ?? {},
            customTypeModels: request.customTypeModels ?? {},
            modelResourcePaths: files.map(file => file.filePath),
        });
        const contexts = (request.evaluationContexts ?? []).map(configure);
        this.global = global;
        this.contexts = contexts;
    }

    public async evaluate(request: EvaluateDocumentRequest, signal?: AbortSignal): Promise<DocumentEvaluationResult> {
        signal?.throwIfAborted();
        const program = fileURLToPath(request.uri);
        const context = this.contexts.filter(candidate => {
            if (!candidate.rootUri) return false;
            const relative = path.relative(fileURLToPath(candidate.rootUri), program);
            return relative === "" || (!relative.startsWith("..") && !path.isAbsolute(relative));
        }).sort((left, right) => (right.rootUri?.length ?? 0) - (left.rootUri?.length ?? 0))[0] ?? this.global;
        const snapshots = this.index.getEvaluationMaps(request.uri);
        const maps = snapshots.map(snapshot => {
            const filePath = fileURLToPath(snapshot.uri);
            return {filePath, fileName: path.relative(path.dirname(program), filePath), text: snapshot.text};
        });
        try {
            let resources = context.resources;
            let customTypeModels = context.customTypeModels;
            let profileBaseTypes: Record<string, string> | undefined = context.profileBaseTypes;
            if (request.modelOverrides?.length) {
                const overrides = new Map(request.modelOverrides.map(override => [fileIdentity(override.filePath), override]));
                const paths = new Set(context.files.map(file => fileIdentity(file.filePath)));
                if ([...overrides.keys()].some(key => !paths.has(key))) {
                    throw new Error("A model override is not part of the indexed model catalog. Re-index before evaluation.");
                }
                let definitionsChanged = false;
                resources = context.files.flatMap(file => {
                    const override = overrides.get(fileIdentity(file.filePath));
                    if (!override) return [...file.resources];
                    const updated = modelResources(JSON.parse(override.text));
                    definitionsChanged ||= updated.some(isStructureDefinition) || file.resources.some(isStructureDefinition);
                    return updated;
                });
                if (definitionsChanged) {
                    customTypeModels = buildLogicalTypeModels(resources, context.defaultFhirVersion ?? "R4");
                    profileBaseTypes = undefined;
                }
            }
            const conceptMaps = resources === context.resources ? context.conceptMaps : indexConceptMaps(resources);
            const parameters = await new FmlLocalDebugService({}, {
                loadConceptMap: async canonical => conceptMaps.get(canonical),
            }).executeParameters({
                mapText: maps[0].text, maps,
                inputText: request.inputText,
                modelText: request.modelText,
                modelResources: resources.filter(isStructureDefinition),
                profileBaseTypes,
                customTypeModels,
                defaultFhirVersion: context.defaultFhirVersion,
                entryGroup: request.entryGroup,
                terminologyServerUrl: request.terminologyServerUrl,
                terminologyFhirVersion: request.terminologyFhirVersion,
                localTrace: false, signal,
            });
            signal?.throwIfAborted();
            const outcome = parameters.parameter?.find(parameter => parameter.name === "outcome")?.resource;
            const resultJson = parameters.parameter?.find(parameter => parameter.name === "return")?.valueString;
            const failed = resultJson === undefined || (outcome?.resourceType === "OperationOutcome"
                && outcome.issue.some(issue => issue.severity === "error" || issue.severity === "fatal"));
            return {
                status: failed ? "failed" : "success", engine: "local",
                maps: snapshots.map(({uri, version}) => ({uri, version})),
                input: request.input, model: request.model,
                ...(failed ? {} : {resultJson}),
                ...(outcome ? {outcome} : {}),
            };
        } catch (error) {
            signal?.throwIfAborted();
            if (error instanceof FmlDebugEngineError && error.outcome) {
                return {status: "failed", engine: "local", outcome: error.outcome};
            }
            throw error;
        }
    }
}

function fileIdentity(file: string): string {
    const resolved = path.resolve(file);
    return process.platform === "win32" ? resolved.toLowerCase() : resolved;
}

function isStructureDefinition(value: JsonValue): boolean {
    return value !== null && typeof value === "object" && !Array.isArray(value)
        && value.resourceType === "StructureDefinition";
}

function modelResources(value: JsonValue): JsonValue[] {
    if (!value || typeof value !== "object" || Array.isArray(value)) return [];
    if ("resourceType" in value && (value.resourceType === "StructureDefinition" || value.resourceType === "ConceptMap")) {
        return [value];
    }

    return "resourceType" in value && value.resourceType === "Bundle" && "entry" in value && Array.isArray(value.entry)
        ? value.entry.flatMap(entry => entry && typeof entry === "object" && !Array.isArray(entry)
            && entry.resource !== undefined ? modelResources(entry.resource) : []) : [];
}

function indexConceptMaps(resources: readonly JsonValue[]): ReadonlyMap<string, JsonValue> {
    const result = new Map<string, JsonValue>();
    for (const resource of resources) {
        if (!resource || typeof resource !== "object" || Array.isArray(resource)
            || resource.resourceType !== "ConceptMap" || typeof resource.url !== "string") continue;
        if (!result.has(resource.url)) result.set(resource.url, resource);
        if (typeof resource.version === "string" && !result.has(`${resource.url}|${resource.version}`)) {
            result.set(`${resource.url}|${resource.version}`, resource);
        }
    }
    return result;
}
