import { CompletionItem } from 'vscode';

export type ElementInfo = {
  path: string;
  types: string[];
  children: ElementInfo[];
};

export type EnhancedCompletionItem = CompletionItem & {
  elements?: ElementInfo[];
  type?: string;
};

export type DependencyDetails = {
  id: string;
  uri: string;
  version: string | number;
};

export type SushiConfiguration = {
  id: string;
  fhirVersion?: string | string[];
  dependencies?: {
    [key: string]: string | number | DependencyDetails;
  };
  canonical? : string;
};

export type UserDefinition = {
  url : string;
  alias? : string;
  as? : string;
  type? : string;
  name? : string;
};

export type FhirSettings = {
  url : string;
  authenticationType? : string;
  serverType? : string;
};
