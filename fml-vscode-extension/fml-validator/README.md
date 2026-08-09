# FHIR Mapping Language Tools Validator

This package defines the validation boundary used by the FHIR Mapping Language Tools extension.

Stage 1 uses the canonical parser and position-aware intermediate model from the main FHIRPath Lab project (`helpers/fml_parser.ts` and `helpers/fml_models.ts`). The validator package compiles those shared sources into its distribution and uses the standard `antlr4` runtime; it does not maintain or generate a second parser.

After parsing, shared model validation checks standard transform invocations for valid parameter counts, names, statically-known types, and constrained values. Every source and target context must resolve to a group input or an alias in lexical rule scope; parent aliases flow into dependent rules but not sibling rules. Dependent group calls validate parameter count, resolved argument types, and FHIR versions against local or caller-supplied imported signatures. Exact plain identities (`src.x -> tgt.y`) and batch identity fields must use compatible types from the same FHIR version or have a matching `<<types>>` default group. `Reference` identities additionally require every source target profile to be accepted by the target; diagnostics list unsupported profiles, abbreviating core FHIR canonicals to type names while retaining non-core profile URLs, and broader base profiles such as `Resource` are accepted. The plain check excludes rules with variables, transforms, multiple sources or targets, source modifiers, or dependencies. A `<<type+>>` group can additionally select its declared target type for an unfixed choice target. Cross-version group parameters resolve same-named declarations by source or target role, and identical `System.*` leaf values are version-independent inside primitive conversion groups. Callers can supply default groups and group signatures resolved from imported maps; the language server limits these to the active map's canonical imports. The SVG diagram renderer consumes that same position-aware FML model directly. Unknown transforms produce warnings so custom or newer transforms remain usable. FHIRPath expression parameters are only valid for `evaluate`.

Identifier-based copy transforms also resolve caller-supplied or local default groups. A fixed target accepts `<<types>>` or `<<type+>>`, while an unfixed choice target requires `<<type+>>`; unsupported copies retain warning severity.

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
