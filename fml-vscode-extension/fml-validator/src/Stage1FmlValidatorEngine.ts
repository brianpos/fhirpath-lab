import {CoreFmlParser} from "./CoreFmlParser";
import {fmlToStructureMap} from "../../../helpers/fml_to_structuremap";
import {
    CompiledStructureMap,
    FmlSource,
    FmlValidatorOperation,
    FmlValidatorResult,
    LoadedPackage,
    NotImplementedResult,
    PackageLoadRequest,
    ParsedFml,
    SemanticValidationReport,
    SemanticValidationRequest,
    TransformOutput,
    TransformRequest,
} from "./contracts";
import {FmlValidatorEngine} from "./FmlValidatorEngine";

export class Stage1FmlValidatorEngine implements FmlValidatorEngine {
    public constructor(private readonly parser = new CoreFmlParser()) {
    }

    public async parse(source: FmlSource): Promise<FmlValidatorResult<ParsedFml>> {
        return this.parser.parse(source);
    }

    public async compile(source: FmlSource): Promise<FmlValidatorResult<CompiledStructureMap>> {
        const parsed = this.parser.parse(source);
        if (parsed.status !== "success") {
            return parsed;
        }
        return {
            status: "success",
            value: {resource: fmlToStructureMap(parsed.value.model)},
            diagnostics: parsed.diagnostics,
        };
    }

    public async validateSemantics(
        _request: SemanticValidationRequest,
    ): Promise<FmlValidatorResult<SemanticValidationReport>> {
        return this.notImplemented(
            "validate-semantics",
            "Semantic validation against FHIR definitions is a future validator-engine hook.",
        );
    }

    public async transform(_request: TransformRequest): Promise<FmlValidatorResult<TransformOutput>> {
        return this.notImplemented(
            "transform",
            "Executing a StructureMap transformation is a future validator-engine hook.",
        );
    }

    public async loadPackage(_request: PackageLoadRequest): Promise<FmlValidatorResult<LoadedPackage>> {
        return this.notImplemented(
            "load-package",
            "Loading implementation guide packages is a future validator-engine hook.",
        );
    }

    public async reset(): Promise<FmlValidatorResult<void>> {
        return this.notImplemented(
            "reset",
            "Resetting package and definition state is a future validator-engine hook.",
        );
    }

    private notImplemented(operation: FmlValidatorOperation, message: string): NotImplementedResult {
        return {
            status: "not-implemented",
            operation,
            message,
            diagnostics: [],
        };
    }
}
