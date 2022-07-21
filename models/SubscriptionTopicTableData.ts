import { CancelTokenSource } from 'axios';
import { ConformanceResourceTableDefinition, ConformanceResourceTableData, ConformanceResourceData } from './ConformanceResourceTableData'

export interface SubscriptionTopicTableDefinition extends ConformanceResourceTableDefinition<SubscriptionTopicTableData> {
}

export interface SubscriptionTopicTableData extends ConformanceResourceTableData {
}

export interface SubscriptionTopicData extends ConformanceResourceData<fhir4.SubscriptionTopic> {
    testFilterValue?: string;
    cancelSource?: CancelTokenSource;
}
