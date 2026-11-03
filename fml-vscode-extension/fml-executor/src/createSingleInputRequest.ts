import {resolveFmlStructureType} from "@fhirpath-lab/validator";
import type {FmlExecutionRequest, PreparedFmlProgram} from "./contracts";
import {createTypeLookup} from "./LabRuntimeModels";

export function createSingleInputRequest(
    program: PreparedFmlProgram,
    input: unknown,
    entryGroup?: string,
): FmlExecutionRequest {
    const group = entryGroup ? program.groups.get(entryGroup) : program.analysis.model.groups[0];
    if (!group) throw new Error(`Entry group '${entryGroup ?? "(default)"}' was not found.`);
    const sources = group.parameters.filter(parameter => parameter.mode === "source");
    const targets = group.parameters.filter(parameter => parameter.mode === "target");
    if (sources.length !== 1 || targets.length !== 1) {
        throw new Error("This consumer requires one source and one target; use explicit executor bindings for multiple roots.");
    }
    const resolved = program.analysis.propertyAnalysis.groupInputs.find(parameter =>
        parameter.groupName === group.name && parameter.inputName === targets[0].name);
    const structure = program.analysis.model.structures.find(structure => structure.mode === "target");
    const typeName = resolved?.typeName ?? (structure && (structure.resolvedTypeName
        ?? resolveFmlStructureType(structure.canonical ?? structure.url, program.source.profileBaseTypes)));
    if (!typeName) throw new Error("The target root type is unresolved; supply an explicit target binding.");
    const version = resolved?.fhirVersion ?? program.analysis.model.targetModelVersion ?? "R4";
    const lookup = createTypeLookup(program.source);
    let model = lookup(typeName, version);
    if (!model) throw new Error(`Target model '${typeName}' was not found in ${version}.`);
    while (model?.BaseTypeName && model.TypeName !== "Resource") model = lookup(model.BaseTypeName, version);
    const target = model?.TypeName === "Resource" ? {resourceType: typeName} : {};
    return {
        program, entryGroup: group.name,
        sources: [{name: sources[0].name, value: input}],
        targets: [{name: targets[0].name, value: target, typeName, fhirVersion: version}],
    };
}
