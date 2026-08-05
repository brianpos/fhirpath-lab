# FHIR Mapping Language Tools Validator

This package defines the validation boundary used by the FHIR Mapping Language Tools extension.

Stage 1 uses the canonical parser and position-aware intermediate model from the main FHIRPath Lab project (`helpers/fml_parser.ts` and `helpers/fml_models.ts`). The validator package compiles those shared sources into its distribution and uses the standard `antlr4` runtime; it does not maintain or generate a second parser.

After parsing, shared model validation checks standard transform invocations for valid parameter counts, names, statically-known types, and constrained values. The SVG diagram renderer consumes that same position-aware FML model directly. Unknown transforms produce warnings so custom or newer transforms remain usable. FHIRPath expression parameters are only valid for `evaluate`.

`compile()` parses and validates FML, then converts the intermediate model into a FHIR `StructureMap` resource.

The API also defines the future integration points for:

- semantic validation against FHIR definitions;
- transforming source data;
- loading implementation guide packages; and
- resetting validator state.

The remaining engine capabilities currently return `not-implemented`. `FmlValidatorApi` accepts a `FmlValidatorEngine` in its constructor so a later implementation can replace the stage-1 engine without changing extension consumers.

## Commands

```sh
npm install
npm test
npm run validate-examples -- <directory-containing-fml-files>
```
