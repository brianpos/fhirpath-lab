import {isFmlParseError, parseFML} from "../../../helpers/fml_parser";
import {validateFmlModel} from "../../../helpers/fml_validation";
import type {FhirVersion, FmlStructureMap} from "../../../helpers/fml_models";
import {
    applyFmlModelConfiguration,
    type TypeModel,
} from "@fhirpath-lab/validator";
import {
    generateFmlInstanceDiagramSvg,
    type TypeLookup,
} from "../../../helpers/structuremap_diagram_instance";
import {
    generateFmlInstanceDiagramSvg as generateFmlCompleteDiagramSvg,
    type FmlGroupResolver,
} from "../../../helpers/structuremap_diagram_complete";
import {lookupByTypeName as lookupByTypeNameSTU3} from "../../../helpers/models/generated/stu3";
import {lookupByTypeName as lookupByTypeNameR4} from "../../../helpers/models/generated/r4";
import {lookupByTypeName as lookupByTypeNameR4B} from "../../../helpers/models/generated/r4b";
import {lookupByTypeName as lookupByTypeNameR5} from "../../../helpers/models/generated/r5";
import {lookupByTypeName as lookupByTypeNameR6} from "../../../helpers/models/generated/r6";

const lookups: Partial<Record<FhirVersion, TypeLookup>> = {
    STU3: lookupByTypeNameSTU3,
    R4: lookupByTypeNameR4,
    R4B: lookupByTypeNameR4B,
    R5: lookupByTypeNameR5,
    R6: lookupByTypeNameR6,
};

interface FmlExternalGroupSource {
    uri: string;
    text: string;
    version: number;
}

type DiagramGenerator = (
    fml: FmlStructureMap,
    typeLookup?: TypeLookup,
    showMissingProperties?: boolean,
    lookupForVersion?: (version: FhirVersion | undefined) => TypeLookup | undefined,
    isLogicalType?: (typeName: string) => boolean,
    resolveExternalGroup?: FmlGroupResolver,
) => string;

export function renderFmlInstanceDiagram(
    fmlText: string,
    defaultFhirVersion?: FhirVersion,
    profileBaseTypes?: Record<string, string>,
    customTypeModels: Record<string, TypeModel> = {},
): string {
    return renderFmlDiagram(
        generateFmlInstanceDiagramSvg,
        fmlText,
        defaultFhirVersion,
        profileBaseTypes,
        customTypeModels,
        true,
    );
}

export function renderFmlCompleteDiagram(
    fmlText: string,
    defaultFhirVersion?: FhirVersion,
    profileBaseTypes?: Record<string, string>,
    customTypeModels: Record<string, TypeModel> = {},
    showAllProperties = false,
    resolveExternalGroupSource?: (groupName: string) => FmlExternalGroupSource | undefined,
): string {
    return renderFmlDiagram(
        generateFmlCompleteDiagramSvg,
        fmlText,
        defaultFhirVersion,
        profileBaseTypes,
        customTypeModels,
        showAllProperties,
        resolveExternalGroupSource,
    );
}

function renderFmlDiagram(
    generateDiagram: DiagramGenerator,
    fmlText: string,
    defaultFhirVersion: FhirVersion | undefined,
    profileBaseTypes: Record<string, string> | undefined,
    customTypeModels: Record<string, TypeModel>,
    showAllProperties: boolean,
    resolveExternalGroupSource?: (groupName: string) => FmlExternalGroupSource | undefined,
): string {
    const parsed = parseFML(fmlText);
    if (isFmlParseError(parsed)) {
        const issue = parsed.issue?.[0];
        const detail = issue?.details?.text ?? issue?.diagnostics ?? "Unable to parse the FML document.";
        const location = issue?.location?.[0];
        throw new Error(location ? `${detail} (${location})` : detail);
    }

    applyFmlModelConfiguration(parsed, {
        sourceText: fmlText,
        defaultFhirVersion,
        profileBaseTypes,
        customTypeModels,
    });

    const composeLookup = (fallback: TypeLookup): TypeLookup => {
        return typeName => customTypeModels[typeName] ?? fallback(typeName);
    };

    const validationError = validateFmlModel(parsed).find(diagnostic => diagnostic.severity === "error");
    if (validationError) {
        throw new Error(`${validationError.message} (@${validationError.line}:${validationError.column})`);
    }

    const externalMaps = new Map<string, ReturnType<typeof parseFML>>();
    const resolveExternalGroup: FmlGroupResolver | undefined = resolveExternalGroupSource
        ? groupName => {
            const source = resolveExternalGroupSource(groupName);
            if (!source) return undefined;
            const cacheKey = `${source.uri}\0${source.version}`;
            let externalMap = externalMaps.get(cacheKey);
            if (externalMap === undefined) {
                externalMap = parseFML(source.text);
                externalMaps.set(cacheKey, externalMap);
                if (!isFmlParseError(externalMap)) {
                    applyFmlModelConfiguration(externalMap, {
                        sourceText: source.text,
                        defaultFhirVersion,
                        profileBaseTypes,
                        customTypeModels,
                    });
                }
            }
            return isFmlParseError(externalMap) ? undefined : {
                map: externalMap,
                sourceUri: source.uri,
                sourceVersion: source.version,
            };
        }
        : undefined;

    return generateDiagram(
        parsed,
        composeLookup(lookupByTypeNameR4B),
        showAllProperties,
        version => version && lookups[version] ? composeLookup(lookups[version]!) : undefined,
        typeName => Object.prototype.hasOwnProperty.call(customTypeModels, typeName),
        resolveExternalGroup,
    );
}