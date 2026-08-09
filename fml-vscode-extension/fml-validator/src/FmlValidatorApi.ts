import {
    CompiledStructureMap,
    FmlDefaultGroup,
    FmlGroupSignature,
    FmlSource,
    FmlGroupSymbols,
    FmlDocumentSymbols,
    FmlPropertyUsage,
    FmlPropertyAnalysis,
    FmlCompletionContext,
    FmlPropertyCompletion,
    FmlValidatorResult,
    LoadedPackage,
    PackageLoadRequest,
    ParsedFml,
    SemanticValidationReport,
    SemanticValidationRequest,
    TransformOutput,
    TransformRequest,
} from "./contracts";
import {isFmlParseError, parseFML} from "../../../helpers/fml_parser";
import {FmlValidatorEngine} from "./FmlValidatorEngine";
import {FmlGroupSymbolCollector} from "./FmlGroupSymbolCollector";
import {FmlPropertyUsageCollector} from "./FmlPropertyUsageCollector";
import {Stage1FmlValidatorEngine} from "./Stage1FmlValidatorEngine";
import {applyFmlModelConfiguration} from "./FmlModelConfiguration";
import {resolveDefaultGroups, resolveGroupSignatures} from "./FmlTransformValidator";

export class FmlValidatorApi {
    public constructor(
        private readonly engine: FmlValidatorEngine = new Stage1FmlValidatorEngine(),
        private readonly groupSymbolCollector = new FmlGroupSymbolCollector(),
        private readonly propertyUsageCollector = new FmlPropertyUsageCollector(),
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

    public getPropertyUsages(source: FmlSource): FmlPropertyUsage[] {
        return this.propertyUsageCollector.collect(source);
    }

    public getPropertyAnalysis(source: FmlSource): FmlPropertyAnalysis {
        return this.propertyUsageCollector.collectAnalysis(source);
    }

    public getDefaultGroups(source: FmlSource): FmlDefaultGroup[] {
        const parsed = parseFML(source.sourceText);
        if (isFmlParseError(parsed)) return [];
        applyFmlModelConfiguration(parsed, source);
        const analysis = this.propertyUsageCollector.analyzeModel(
            parsed,
            source.sourceText,
            source.customTypeModels,
        );
        return resolveDefaultGroups(parsed.groups, analysis);
    }

    public getGroupSignatures(source: FmlSource): FmlGroupSignature[] {
        const parsed = parseFML(source.sourceText);
        if (isFmlParseError(parsed)) return [];
        applyFmlModelConfiguration(parsed, source);
        const analysis = this.propertyUsageCollector.analyzeModel(
            parsed,
            source.sourceText,
            source.customTypeModels,
        );
        return resolveGroupSignatures(parsed.groups, analysis);
    }

    public getPropertyCompletions(source: FmlSource, cursorOffset: number): FmlPropertyCompletion[] {
        return this.propertyUsageCollector.getCompletions(source, cursorOffset);
    }

    public getCompletionContext(source: FmlSource, cursorOffset: number): FmlCompletionContext | undefined {
        return this.propertyUsageCollector.getCompletionContext(source, cursorOffset);
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
