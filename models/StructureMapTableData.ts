import { TabData } from '~/components/TwinPaneTab.vue';
import { ConformanceResourceTableDefinition, ConformanceResourceTableData, ConformanceResourceData } from './ConformanceResourceTableData'

export interface StructureMapTableDefinition extends ConformanceResourceTableDefinition<StructureMapTableData> {
}

export interface StructureMapTableData extends ConformanceResourceTableData {
}

export interface StructureMapData extends ConformanceResourceData<fhir4b.StructureMap> {
    rawMap: string | null;
    diagramSvg: string | null;
    flowSvg: string | null;
    sankeySvg: string | null;
    instanceSvg: string | null;
    tabDetails: TabData[];
}