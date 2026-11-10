import {FmlTraceLocationIndex as TraceLocationIndex} from "@fhirpath-lab/debug-service";
import {parseFmlModel} from "@fhirpath-lab/validator";

export class FmlTraceLocationIndex extends TraceLocationIndex {
    public static fromSourceText(sourceText: string): FmlTraceLocationIndex | undefined {
        const model = parseFmlModel(sourceText);
        return model ? new FmlTraceLocationIndex(model) : undefined;
    }
}
