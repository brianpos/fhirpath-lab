import {isFmlParseError, parseFML} from "../../../helpers/fml_parser";
import type {FmlStructureMap} from "../../../helpers/fml_models";

export type {FhirVersion, FmlStructureMap, Rule, Transform} from "../../../helpers/fml_models";

export function parseFmlModel(sourceText: string): FmlStructureMap | undefined {
    const result = parseFML(sourceText);
    return isFmlParseError(result) ? undefined : result;
}