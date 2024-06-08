import Vue, { VNode } from "vue";
import { CancelTokenSource } from "axios";

// https://stackoverflow.com/questions/75991355/import-datatableheader-typescript-type-of-vuetify3-v-data-table
// type DataTableHeader = {
//   key: string;
//   value?: SelectItemKey;
//   title: string;
//   colspan?: number;
//   rowspan?: number;
//   fixed?: boolean;
//   align?: 'start' | 'end';
//   width?: number;
//   minWidth?: string;
//   maxWidth?: string;
//   sortable?: boolean;
//   sort?: DataTableCompareFunction;
// };


export default interface EasyTableDefinition<TData> extends EasyTableDefinitionRaw {
  columns: EasyTableColumn<TData>[];
  /** Generically typed row data */
  tableData: TData[];

  /** Outcome if included in the search result processing */
  outcome?: fhir4b.OperationOutcome;

  /** Custom Header render method 
   * https://happy-coding-clans.github.io/vue-easytable/#/en/doc/table/cell-custom
   */
  renderHeaderCell?: (headerData: { column: EasyTableColumn<TData> }, h: any) => VNode;

  /** Custom Cell render method
   * https://happy-coding-clans.github.io/vue-easytable/#/en/doc/table/cell-custom
   */
  renderBodyCell?: (cellData: { row: TData, column: EasyTableColumn<TData>, rowIndex: number }, h: any) => VNode;
}

export interface EasyTableDefinitionRaw {

  wordBreak?: 'normal' | 'keep-all' | 'break-all' | 'break-word',
  expanded: [];

  eventCustomOption?: any,
  cellStyleOption?: any;
  showEmpty?: boolean;
  loadingData?: boolean;
  cancelSource?: CancelTokenSource;
  showAdvancedSettings?: boolean;

  totalCount?: number;
  firstPageLink?: string;
  previousPageLink?: string;
  nextPageLink?: string;
  lastPageLink?: string;
}

export const EasyTableDefinition_defaultValues: EasyTableDefinitionRaw = {
  firstPageLink: "",
  previousPageLink: "",
  nextPageLink: "",
  lastPageLink: "",
  totalCount: undefined,
  showEmpty: true,
  loadingData: true,
  showAdvancedSettings: undefined,
  expanded: [],
}


export interface EasyTableColumn<TData> {
  value: string;
  key: string;
  text: string;
  type?: 'expand' | 'checkbox' | 'radio';
  align?: 'start' | 'end' | 'center';
  width?: string | number;
  ellipsis?: EasyTableColumnElipsis;
  sortBy?: 'asc' | 'desc';
  sortable?: boolean;

  /** Custom Cell render method
   * https://happy-coding-clans.github.io/vue-easytable/#/en/doc/table/cell-custom
   */
  renderBodyCell?: (cellData: { row: TData, column: EasyTableColumn<TData>, rowIndex: number }, h: any) => VNode;
}

export interface EasyTableColumnElipsis {
  showTitle: boolean;
  lineClamp: number;
}
