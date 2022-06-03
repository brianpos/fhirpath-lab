import { CancelTokenSource } from 'axios';
import { ConformanceResourceTableDefinition, ConformanceResourceTableData, ConformanceResourceData } from './ConformanceResourceTableData'

export interface SearchParameterTableDefinition extends ConformanceResourceTableDefinition<SearchParameterTableData> {
}

export interface SearchParameterTableData extends ConformanceResourceTableData {
}

export interface SearchParameterData extends ConformanceResourceData<fhir4.SearchParameter> {
    testFilterValue?: string;
    cancelSource?: CancelTokenSource;
}
