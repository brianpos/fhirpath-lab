import { ConformanceResourceTableDefinition, ConformanceResourceTableData, ConformanceResourceData } from './ConformanceResourceTableData'

export interface StructureMapTableDefinition extends ConformanceResourceTableDefinition<StructureMapTableData> {
}

export interface StructureMapTableData extends ConformanceResourceTableData {
}

export interface StructureMapData extends ConformanceResourceData<fhir4b.StructureMap> {
    rawMap: string | null;
}