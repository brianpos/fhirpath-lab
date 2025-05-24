// Workaround to include the definition of the parse function
// (which is actually there, just not in the definition)
declare module 'sof' {
    export function evaluate(def: any, node: any, for_test?: boolean): any;
  }
declare module 'sql-on-fhir-v2/sof-js';