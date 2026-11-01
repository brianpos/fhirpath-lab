import {CoreFmlParser} from "@fhirpath-lab/validator";
import type {AnalyzedFml, FmlSource, FmlValidatorResult} from "@fhirpath-lab/validator";
import type {CoreFmlAnalysisOptions, FmlStructureMap} from "@fhirpath-lab/validator";

export function analyzeLabFml(source: FmlSource, model?: FmlStructureMap,
    options?: CoreFmlAnalysisOptions): FmlValidatorResult<AnalyzedFml> {
    return new CoreFmlParser().analyze({
        ...source,
        defaultFhirVersion: source.defaultFhirVersion ?? "R4",
    }, model, options);
}
