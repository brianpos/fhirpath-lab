import { StructureDefinitionArgs } from "@fhir-typescript/r4b-core/dist/fhir";
import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from "lz-string";

export interface VariableData {
    name: string;
    data: any;
    resourceId?: string;
    datatype?: string;
    errorMessage?: string;
}


export interface TestFhirpathData {
    expression: string;
    context?: string;
    resource?: string;
    resourceJson?: string;
    libraryId?: string;
    exampletype?: string;
    engine?: string;
    terminologyServer?: string;
    variables?: VariableData[];
}

export function EncodeTestFhirpathData(data: TestFhirpathData): string {
    const json = JSON.stringify(data);
    return compressToEncodedURIComponent(json);
}

export function DecodeTestFhirpathData(data: string): TestFhirpathData {
    return JSON.parse(decompressFromEncodedURIComponent(data) ?? '');
}