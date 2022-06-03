import { ConformanceResourceTableDefinition, ConformanceResourceTableData, ConformanceResourceData } from './ConformanceResourceTableData'

export interface LibraryTableDefinition extends ConformanceResourceTableDefinition<LibraryTableData> {}

export interface LibraryTableData extends ConformanceResourceTableData {
}

export interface LibraryData extends ConformanceResourceData<fhir4.Library> {
}
