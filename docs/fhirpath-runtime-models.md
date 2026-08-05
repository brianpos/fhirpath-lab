# FHIRPath runtime models

FHIRPath Lab uses two generated model formats for different purposes:

- `helpers/models/generated/<version>/` contains `TypeModel` dictionaries used by the FML validator and extension. Generate these with `npm run generate:models`.
- `models/r6/` contains the model shape consumed directly by fhirpath.js when the website evaluates R6 FHIRPath expressions.

## Refresh the R6 runtime model

Run:

```powershell
npm run generate:fhirpath-r6
```

The command downloads these files from the configured R6 publication:

- `profiles-resources.json`
- `profiles-types.json`
- `profiles-others.json`
- `search-parameters.json`

It then runs the model extractor shipped by the installed `fhirpath` package and converts its JSON output into the TypeScript modules under `models/r6/`.

The default source is the R6 `6.0.0-ballot5` publication. To test another publication without changing the script:

```powershell
npm run generate:fhirpath-r6 -- --base-url https://hl7.org/fhir/6.0.0-ballot6/
```

Generated data files must not be edited manually. `models/r6/index.ts` is maintained separately and assembles the generated tables into the fhirpath.js `Model`, including `path2Repeating`.

After refreshing, run:

```powershell
npm test -- --runInBand test/fhirpath-r6-model.test.ts
```
