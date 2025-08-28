// Workaround to include the definition of the parse function
// (which is actually there, just not in the definition)
declare module 'fhirpath/fhir-context/general-additions.js' {
  export function updateWithGeneratedData(modelInfo: any): void;
  export function arrToHash(arr: any[]): Record<string, any>;
}
