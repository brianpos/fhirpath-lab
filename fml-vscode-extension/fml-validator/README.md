# FHIR Mapping Language Tools Validator

This package defines the validation boundary used by the FHIR Mapping Language Tools extension.

Stage 1 uses the canonical parser and position-aware intermediate model from the main FHIRPath Lab project (`helpers/fml_parser.ts` and `helpers/fml_models.ts`). The validator package compiles those shared sources into its distribution and uses the standard `antlr4` runtime; it does not maintain or generate a second parser.

After parsing, shared model validation checks standard transform invocations for valid parameter counts, names, statically-known types, and constrained values. Every source and target context must resolve to a group input or an alias in lexical rule scope; parent aliases flow into dependent rules but not sibling rules. Dependent group calls validate parameter count, resolved argument types, and FHIR versions against local or caller-supplied imported signatures. Exact plain identities (`src.x -> tgt.y`), including identities inside dependent rules that use inherited aliases, and batch identity fields must use compatible types from the same FHIR version or have a matching `<<types>>` default group. `Reference` identities additionally require every source target profile to be accepted by the target; diagnostics list unsupported profiles, abbreviating core FHIR canonicals to type names while retaining non-core profile URLs, and broader base profiles such as `Resource` are accepted. The plain check excludes rules with variables, transforms, multiple sources or targets, source modifiers, or their own dependencies. A `<<type+>>` group can additionally select its declared target type for an unfixed choice target. Cross-version group parameters resolve same-named declarations by source or target role, and identical `System.*` leaf values are version-independent inside primitive conversion groups. Callers can supply default groups and group signatures resolved from imported maps; the language server limits these to the active map's canonical imports. The SVG diagram renderer consumes that same position-aware FML model directly. Unknown transforms produce warnings so custom or newer transforms remain usable. FHIRPath expression parameters are only valid for `evaluate`. Its expression argument also accepts every FML literal shared with the FHIRPath grammar and validates the exact source text, so a quoted string remains a string literal rather than being decoded as executable FHIRPath.

`extends` validates inherited parameters against local or caller-supplied imported
group signatures. Each base parameter must exist by name with the same
source/target mode; parameter order may differ and the child may add inputs.
Resolved child types must be the same as or derive from their corresponding
base types in the same FHIR release. Aliases and logical-model inheritance are
resolved before comparison; assignment transforms/default mappings and
primitive wire-value equivalence cannot repair incompatible inheritance.
Unresolved types remain open rather than being guessed, and overloaded base
references are reported as ambiguous. Errors underline the base group name in
the `extends` clause. The language server supplies indexed imported signatures
and revalidates dependent documents when they change.

For example, R4 Dosage derives from BackboneElement, but STU3 Dosage derives
from Element. Its R4-to-STU3 group cannot extend a group requiring
BackboneElement on both sides; a separately named BackboneElement-to-Element
helper can provide compatible inheritance.

Identifier-based copy transforms (`src.x as a -> tgt.y = a`) run the same assignment rules as batch and plain identities: matching types, otherwise a matching default group, otherwise an error. A fixed target accepts `<<types>>` or `<<type+>>`, while an unfixed choice target requires `<<type+>>`. `Reference` target profiles are checked for all three forms. A source type filter such as `src.performed : dateTime -> tgt.category` does not exempt a rule from these checks; the filtered type is the type that must be assignable to the target. When more than one local or imported default group matches the same source and target type pair the conversion is ambiguous and reported as an error. A group name repeated with the same parameter signature, in the same map or in an imported map, is reported as an error; overloads that differ by parameter mode or declared type are allowed.

`compile()` parses and validates FML, then converts the intermediate model into a FHIR `StructureMap` resource.

Logical models are keyed by canonical URL, not by their display `TypeName`.
`uses` declarations resolve directly to those canonical keys when supplied;
core type lookups remain scoped to their FHIR release. The logical-model
converter also preserves canonical references for inline child models and
logical base definitions. It retains a synthetic short-name alias only when
that alias is unique and does not collide with a core type. This lets logical
models such as OMOP `Observation` coexist with core FHIR `Observation`, including
their child types, without changing lookup priority globally.

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
