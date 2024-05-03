// Workaround to include the definition of the parse function
// (which is actually there, just not in the definition)
declare module "fhirpath" {
    export function parse(expression: string): any;
    export const version :string;
  }

  declare module 'fhirpath/fhir-context/r4';
  