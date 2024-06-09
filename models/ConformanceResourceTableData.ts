import { FhirpathLabUseContexts } from "~/helpers/useContext_helpers";
import { BaseResourceData, BaseResourceTableDefinition } from "./BaseResourceTableData";

export interface ConformanceResourceTableDefinition<TData> extends BaseResourceTableDefinition<TData> {
  searchForStatus?: string;
  searchForUseContext?: { system?: string, code: string; display: string; }[];

  searchUseContexts: FhirpathLabUseContexts[];
  defaultUseContexts?: FhirpathLabUseContexts[];
  searchPublishingStatuses: string[];
}

export interface ConformanceResourceTableData {
  id: string;
  title: string;
  url: string;
  useContext: string;
  version: string;
  date: string;
  status: string;
  publisher: string;
  /** Description (markdown format) */
  description?: string;
  favourite?: boolean;
}

export interface WithPublishingHistory<TData extends fhir4b.DomainResource> {
  publishedVersions: TData[] | null;
}


export interface ConformanceResourceData<TData extends fhir4b.DomainResource> extends BaseResourceData<TData> {
  publishedVersions: TData[] | null;
  usageCategories?: fhir4b.Coding[];
}
