// Workaround to include the definition of the parse function
// (which is actually there, just not in the definition)
declare module 'fhirpath/fhir-context/general-additions.js' {
  const updateWithGeneratedData: (modelInfo: any) => void;
  export default updateWithGeneratedData;
}
