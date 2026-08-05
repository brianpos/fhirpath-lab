import {isFmlParseError, parseFML} from "../../../helpers/fml_parser";
import {validateFmlModel} from "../../../helpers/fml_validation";
import type {FhirVersion} from "../../../helpers/fml_models";
import {
    generateFmlInstanceDiagramSvg,
    type TypeLookup,
} from "../../../helpers/structuremap_diagram_instance";
import {lookupByTypeName as lookupByTypeNameR4} from "../../../helpers/models/generated/r4";
import {lookupByTypeName as lookupByTypeNameR4B} from "../../../helpers/models/generated/r4b";
import {lookupByTypeName as lookupByTypeNameR5} from "../../../helpers/models/generated/r5";
import {lookupByTypeName as lookupByTypeNameR6} from "../../../helpers/models/generated/r6";

const lookups: Partial<Record<FhirVersion, TypeLookup>> = {
    R4: lookupByTypeNameR4,
    R4B: lookupByTypeNameR4B,
    R5: lookupByTypeNameR5,
    R6: lookupByTypeNameR6,
};

export function renderFmlInstanceDiagram(fmlText: string): string {
    const parsed = parseFML(fmlText);
    if (isFmlParseError(parsed)) {
        const issue = parsed.issue?.[0];
        const detail = issue?.details?.text ?? issue?.diagnostics ?? "Unable to parse the FML document.";
        const location = issue?.location?.[0];
        throw new Error(location ? `${detail} (${location})` : detail);
    }

    const validationError = validateFmlModel(parsed).find(diagnostic => diagnostic.severity === "error");
    if (validationError) {
        throw new Error(`${validationError.message} (@${validationError.line}:${validationError.column})`);
    }

    return generateFmlInstanceDiagramSvg(
        parsed,
        lookupByTypeNameR4B,
        true,
        version => version ? lookups[version] : undefined,
    );
}