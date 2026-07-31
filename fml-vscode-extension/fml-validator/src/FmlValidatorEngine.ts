import {
    CompiledStructureMap,
    FmlSource,
    FmlValidatorResult,
    LoadedPackage,
    PackageLoadRequest,
    ParsedFml,
    SemanticValidationReport,
    SemanticValidationRequest,
    TransformOutput,
    TransformRequest,
} from "./contracts";

/**
 * Injection point for the validator implementation.
 *
 * Stage 1 supplies syntax parsing only. A future engine can implement the
 * remaining hooks without changing callers of FmlValidatorApi.
 */
export interface FmlValidatorEngine {
    parse(source: FmlSource): Promise<FmlValidatorResult<ParsedFml>>;
    compile(source: FmlSource): Promise<FmlValidatorResult<CompiledStructureMap>>;
    validateSemantics(request: SemanticValidationRequest): Promise<FmlValidatorResult<SemanticValidationReport>>;
    transform(request: TransformRequest): Promise<FmlValidatorResult<TransformOutput>>;
    loadPackage(request: PackageLoadRequest): Promise<FmlValidatorResult<LoadedPackage>>;
    reset(): Promise<FmlValidatorResult<void>>;
}
