import EasyTableDefinition from './EasyTableDefinition'

export interface BaseResourceTableDefinition<TData> extends EasyTableDefinition<TData> {
  searchFor?: string;
  searchForPublisher?: string;
}

export interface BaseResourceData<TData extends fhir4b.DomainResource> extends BaseResourceNoData {
  raw: TData | null;
  loadedUrl?: string;
}

export const BaseResource_defaultValues: BaseResourceNoData = {
  isFavourite: undefined,
  saving: false,
  readonly: false,
  tab: null,
  enableSave: false,
  showOutcome: undefined,
  saveOutcome: undefined,
  showAdvancedSettings: undefined,
  fhirServerUrl: undefined,
}

/** This interface holds the View Model based data supporting most of the base edit capability */
export interface BaseResourceNoData {
  isFavourite?: boolean;
  saving: boolean;
  readonly: boolean;
  tab: any;
  enableSave: boolean;
  saveOutcome?: fhir4b.OperationOutcome;
  showOutcome?: boolean;
  showAdvancedSettings?: boolean;
  fhirServerUrl: string | undefined;
}
