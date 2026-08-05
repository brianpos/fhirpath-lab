import type {FhirVersion, FmlStructureMap} from "../../../helpers/fml_models";
import type {FmlSource} from "./contracts";

export function applyFmlModelConfiguration(model: FmlStructureMap, source: FmlSource): void {
    model.sourceModelVersion ??= source.defaultFhirVersion;
    model.targetModelVersion ??= source.defaultFhirVersion;
    for (const structure of model.structures) {
        const canonical = (structure.canonical ?? structure.url).split("|")[0];
        structure.resolvedTypeName = resolveFmlStructureType(
            canonical,
            source.profileBaseTypes,
        ) ?? resolveFmlStructureType(structure.url, source.profileBaseTypes);
    }
}

export function resolveFmlStructureType(
    canonical: string,
    profileBaseTypes: Record<string, string> = {},
): string | undefined {
    const normalizedCanonical = canonical.split("|")[0];
    const configuredType = profileBaseTypes[normalizedCanonical];
    if (configuredType) {
        return configuredType;
    }
    return normalizedCanonical.match(
        /^https?:\/\/hl7\.org\/fhir\/(?:\d+\.\d+\/)?StructureDefinition\/([^/]+)$/,
    )?.[1];
}

export function toFhirVersion(version: string | undefined): FhirVersion | undefined {
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