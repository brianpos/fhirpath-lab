import { BaseResourceData } from "./BaseResourceTableData";
import EasyTableDefinition from './EasyTableDefinition'

export interface ListTableDefinition extends EasyTableDefinition<ListTableData> {
}

export interface ListTableData {
  id: string;
  title: string;
  url: string;
  version: string;
  date: string;
  status: string;
  publisher: string;
}

export interface ListData extends BaseResourceData<fhir4.List> {
}