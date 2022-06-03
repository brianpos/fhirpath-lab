import Vue, { VNode } from "vue";
import { CancelTokenSource } from "axios";

export default interface EasyTableDefinition<TData> extends EasyTableDefinitionRaw {
  columns: EasyTableColumn<TData>[];
  /** Generically typed row data */
  tableData: TData[];

  /** Custom Header render method 
   * https://happy-coding-clans.github.io/vue-easytable/#/en/doc/table/cell-custom
   */
  renderHeaderCell?: (headerData: { column: EasyTableColumn<TData> }, h: any) => VNode;

  /** Custom Cell render method
   * https://happy-coding-clans.github.io/vue-easytable/#/en/doc/table/cell-custom
   */
  renderBodyCell?: (cellData: { row: TData, column: EasyTableColumn<TData>, rowIndex: number }, h: any) => VNode;

  expandOption?: { trigger?: 'row' | 'cell' | 'icon'; render: (cellData: { row: TData, column: EasyTableColumn<TData>, rowIndex: number }, h: any) => VNode; };
}

export interface EasyTableDefinitionRaw {

  wordBreak?: 'normal' | 'keep-all' | 'break-all' | 'break-word',

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
}


export interface EasyTableColumn<TData> {
  field: string;
  key: string;
  title: string;
  type?: 'expand' | 'checkbox' | 'radio';
  align?: 'left' | 'right' | 'center';
  width?: string | number;
  ellipsis?: EasyTableColumnElipsis;
  sortBy?: 'asc' | 'desc';

  /** Custom Cell render method
   * https://happy-coding-clans.github.io/vue-easytable/#/en/doc/table/cell-custom
   */
  renderBodyCell?: (cellData: { row: TData, column: EasyTableColumn<TData>, rowIndex: number }, h: any) => VNode;
}

export interface EasyTableColumnElipsis {
  showTitle: boolean;
  lineClamp: number;
}
