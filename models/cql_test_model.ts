import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from "lz-string";

export interface CqlShareParameter {
    name: string;
    type: string;
    value: string;
}

export interface CqlSharePrefetch {
    key?: string;
    descriptorJson?: string;
    dataJson?: string;
}

export interface TestCqlData {
    cql: string;
    engine?: string;
    fhirVersion?: string;
    customUrl?: string;
    subject?: string;
    useServerData?: boolean;
    dataJson?: string;
    parameters?: CqlShareParameter[];
    prefetchData?: CqlSharePrefetch[];
    dataEndpoint?: string;
    contentEndpoint?: string;
    terminologyEndpoint?: string;
    libraryId?: string;
    libraryUrl?: string;
    libraryName?: string;
}

export function encodeTestCqlData(data: TestCqlData): string {
    return compressToEncodedURIComponent(JSON.stringify(data));
}

export function decodeTestCqlData(data: string): TestCqlData {
    const json = decompressFromEncodedURIComponent(data);
    if (!json) throw new Error("The CQL share data is empty or invalid.");
    return JSON.parse(json) as TestCqlData;
}

export function createCqlZulipShareText(cql: string, shareUrl: string): string {
    return `\`\`\`cql\n${cql}\n\`\`\`\n:test_tube: [Test with FHIRPath-Lab](${shareUrl})`;
}
