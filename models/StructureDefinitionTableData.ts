import { TabData } from '~/components/TwinPaneTab.vue';
import { ConformanceResourceTableDefinition, ConformanceResourceTableData, ConformanceResourceData } from './ConformanceResourceTableData'

export interface StructureDefinitionTableDefinition extends ConformanceResourceTableDefinition<StructureDefinitionTableData> {
}

export interface StructureDefinitionTableData extends ConformanceResourceTableData {
}

export interface StructureDefinitionData extends ConformanceResourceData<fhir4b.StructureDefinition> {
    tabDetails: TabData[];
}