import {
    CompiledStructureMap,
    FmlSource,
    FmlGroupSymbols,
    FmlDocumentSymbols,
    FmlValidatorResult,
    LoadedPackage,
    PackageLoadRequest,
    ParsedFml,
    SemanticValidationReport,
    SemanticValidationRequest,
    TransformOutput,
    TransformRequest,
} from "./contracts";
import {FmlValidatorEngine} from "./FmlValidatorEngine";
import {FmlGroupSymbolCollector} from "./FmlGroupSymbolCollector";
import {Stage1FmlValidatorEngine} from "./Stage1FmlValidatorEngine";

export class FmlValidatorApi {
    public constructor(
        private readonly engine: FmlValidatorEngine = new Stage1FmlValidatorEngine(),
        private readonly groupSymbolCollector = new FmlGroupSymbolCollector(),
    ) {
    }

    /**
     * Stage-1 validation is intentionally syntax-only. Later stages can compose
     * compile(), validateSemantics(), and transform() after their engine hooks
     * are implemented.
     */
    public validate(source: FmlSource): Promise<FmlValidatorResult<ParsedFml>> {
        return this.engine.parse(source);
    }

    public parse(source: FmlSource): Promise<FmlValidatorResult<ParsedFml>> {
        return this.engine.parse(source);
    }

    public getGroupSymbols(source: FmlSource): FmlGroupSymbols {
        return this.groupSymbolCollector.collect(source.sourceText);
    }

    public getDocumentSymbols(source: FmlSource): FmlDocumentSymbols {
        return this.groupSymbolCollector.collectDocument(source.sourceText);
    }

    public compile(source: FmlSource): Promise<FmlValidatorResult<CompiledStructureMap>> {
        return this.engine.compile(source);
    }

    public validateSemantics(
        request: SemanticValidationRequest,
    ): Promise<FmlValidatorResult<SemanticValidationReport>> {
        return this.engine.validateSemantics(request);
    }

    public transform(request: TransformRequest): Promise<FmlValidatorResult<TransformOutput>> {
        return this.engine.transform(request);
    }

    public loadPackage(request: PackageLoadRequest): Promise<FmlValidatorResult<LoadedPackage>> {
        return this.engine.loadPackage(request);
    }

    public reset(): Promise<FmlValidatorResult<void>> {
        return this.engine.reset();
    }
}
