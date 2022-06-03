import { Questionnaire, QuestionnaireItem } from "fhir/r4";
import { ConformanceResourceTableDefinition, ConformanceResourceTableData, ConformanceResourceData } from './ConformanceResourceTableData'

export interface QuestionnaireTableDefinition extends ConformanceResourceTableDefinition<QuestionnaireTableData> {
}

export interface QuestionnaireTableData extends ConformanceResourceTableData {
}

export interface QuestionnaireData extends ConformanceResourceData<fhir4.Questionnaire> {
  flatModel?: FlattenedQuestionnaireItem[];
  formContainerElement: any;
  selectedItem?: FlattenedQuestionnaireItem;
}

type RecommendationType = 'missing URL'
  | 'consolidate terminology' | string;

export interface FlattenedQuestionnaireItem {
  item: QuestionnaireItem;
  parent?: FlattenedQuestionnaireItem;
  path?: string;
  indexInParent?: number;

  isReadOnly?: boolean;
  isHidden?: boolean;
  hasValidations?: boolean;
  hasDynamicBehaviours?: boolean;
  hasPrePopulation?: boolean;
  hasDataExtraction?: boolean;
  hasVariables?: boolean;
}

export function FlattenedQuestionnaireItems(q: Questionnaire): FlattenedQuestionnaireItem[] {
  var result: FlattenedQuestionnaireItem[] = [];
  if (q.item) result.push(... FlattenedChildItems(q.item));
  return result;
}

function FlattenedChildItems(items: QuestionnaireItem[], parent?:FlattenedQuestionnaireItem): FlattenedQuestionnaireItem[] {
  var result: FlattenedQuestionnaireItem[] = [];
  for (var item of items){
    var node = {item: item, parent: parent};
    result.push(node);
    if (item.item) result.push(... FlattenedChildItems(item.item, node));
  }
  return result;
}
