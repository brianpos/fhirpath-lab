import { ConformanceResourceTableDefinition, ConformanceResourceTableData, ConformanceResourceData } from './ConformanceResourceTableData'

export interface LibraryTableDefinition extends ConformanceResourceTableDefinition<LibraryTableData> {}

export interface LibraryTableData extends ConformanceResourceTableData {
    contentType?: string;
    testPath?: string;
}

export interface LibraryData extends ConformanceResourceData<fhir4b.Library> {
}
