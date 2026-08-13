# FHIR Mapping Language Tools vscode extension

FHIR Mapping Language Tools is a Visual Studio Code extension for working with FHIR Mapping Language (FML) files from the fhirpath-lab.

For the extension features and current validation scope, see the [extension README](vscode-extension/README.md).

This project will support the following high level features:
* Syntax highlighting (via vscode-extension/syntaxes/fml.tmLanguage.json)
* Text format validation via the main lab parser/model and minor semantic validation via `fml-validator`
* Package loading via sushi-config.yaml
    * detection of FHIR version and implementation guide dependencies
* Resolving profiles and logical models from IG build output
  * a sibling sushi-config.yaml enables output scanning
  * without SUSHI, output/ImplementationGuide*.json identifies an IG output directory
* indexing of maps in the workspace (to be resolvable by FML imports)
* resolving core resource types from the FHIR specification (to be used for semantic validation)
* resolving profiles from packages to determine the correct resource structure
    * only structure used in in profiles is cardinality and type constraints (not slicing)
* code completion and hover information for FML keywords, transforms, and FHIRPath functions
* detect and resolve cross version canonicals (to get to the appropriate core fhir version)


## Project structure

This repository contains five TypeScript projects:

- `fml-validator` defines the validator API and consumes the canonical parser/model from the main lab project.
- `fml-language-service` provides editor-independent diagnostics and completion logic.
- `fml-language-server` exposes the language service through the Language Server Protocol.
- `fml-debug-service` implements the remote FHIR debug-engine protocol and trace replay model.
- `vscode-extension` provides syntax highlighting, FHIR-aware completion, templates, filesystem hooks, and the LSP client.

The language server validates open FML documents as they change, without requiring a save. Manual validation waits for workspace indexing to complete so imported maps are available. **Validate FML** is also available from the Explorer context menu for an `.fml` file or folder; folder validation recursively loads and validates every FML file below it without opening editor tabs, retains their diagnostics in the Problems panel after documents close, shows that it is paused while indexing is in progress, updates the notification with a per-file `N/total` counter after indexing, and reports aggregate results. The filesystem watcher remains separate for future behavior driven by files and package builds.

Workspace FML files are indexed by canonical URL from metadata and concept map declarations. Cross-file group navigation and unresolved-group checks follow each map's wildcard-capable `imports` declarations.
Standard VS Code **Go to Definition** and **Find All References** commands navigate group declarations, invocations, and `extends` references across imported maps. Hovers distinguish source/target contexts from each individual property segment, showing the type and cardinality resolved at that exact path. Variable declarations, qualified variable contexts, transform arguments, and dependent-group arguments show the type information inherited from their defining source or target element. Group-call hovers list the callee's source and target parameters with their resolved types for local and imported groups, while group-definition parameter hovers identify declared, inferred, unresolved, or conflicting types. Simple-copy arrow hovers identify the local or imported default mapping group that authorizes the conversion; batch property hovers show the required group beneath the property type. Groups are also listed when the source and target types already match, because a default group takes precedence over the direct copy. In both cases each group name is a link that navigates to its declaration, including declarations in imported maps. Property hovers deduplicate compatible types independently from their target profiles, and also show the FHIR version, choice alternatives, versioned target-profile links, specification links, and model-resolution issues using the same internal-model analysis as the SVG diagram. Named transform hovers show their result type when it can be inferred. The language server is the single completion provider: typing after a resolved source, target, or alias variable offers properties from the same internal type model, including nested paths, without requiring an IG build for core FHIR types.
The FML preview updates regenerated SVG diagrams in place, retaining the current webview zoom and diagram scroll position across unsaved edits. If an edit temporarily makes the FML invalid, the preview keeps the last valid diagram dimmed behind a concise status overlay until a valid diagram can be generated again; detailed errors remain in the editor diagnostics. Diagrams blend recursively extended groups into derived groups, retain every declared source and target parameter, collapse unnamed rule headers to compact divider lines without hiding their property rows, and draw dotted links from every source variable referenced by a FHIRPath transform. Long computed-source namespace arguments are abbreviated in row labels while remaining complete in hover text. Source filters, type filters, and target fixed values are included in both annotation-icon and full-row tooltips.

## Development setup

Node.js 20 or later is required.

```sh
git clone https://github.com/brianpos/fhirpath-lab.git
cd fhirpath-lab/fml-vscode-extension

cd fml-validator
npm install
npm test

cd ../fml-language-service
npm install
npm test

cd ../fml-language-server
npm install
npm test

cd ../fml-debug-service
npm install
npm test

cd ../vscode-extension
npm install
npm test
```

The canonical parser is generated from `fml-parser/FmlMapping.g4`; validator builds compile and bundle that parser and the shared intermediate model.

## Run in an Extension Development Host

1. Open `vscode-extension` in Visual Studio Code.
2. Press `F5` to start an Extension Development Host.
3. Open an `.fml` file and run **Validate FML**.

## Build and install the VSIX locally

Use this flow when you want to run the packaged extension directly in your normal VS Code instance.

```sh
cd fml-validator
npm install
npm run build

cd ../fml-language-service
npm install
npm run build

cd ../fml-language-server
npm install
npm run build

cd ../fml-debug-service
npm install
npm run build

cd ../vscode-extension
npm install
npm run package
npx @vscode/vsce package --no-dependencies
```

This produces a `.vsix` file in `vscode-extension` (for example: `fml-tools-0.1.0.vsix`).

Install it locally:

```sh
code --install-extension fml-tools-0.1.0.vsix --force
```

Then reload VS Code and open an `.fml` file. The packaged extension runs without pressing `F5`.

### Convenience commands

From `vscode-extension`, you can use one-command deploy scripts:

```sh
npm run vsix:deploy
```

Deploy to VS Code Insiders:

```sh
npm run vsix:deploy:insiders
```

Deploy to both stable and insiders:

```sh
npm run vsix:deploy:all
```

If you already built the VSIX and only want install/update:

```sh
npm run vsix:install
npm run vsix:install:insiders
```

The package scripts derive the VSIX filename from the extension name and version in `vscode-extension/package.json`.

Optional cleanup commands:

```sh
code --uninstall-extension fhirpath-lab.fml-tools
```

## Validation scope

Stage 1 validates FML text in real time through the language server. It checks that text parses successfully, validates standard transform function parameters, verifies transform identifier parameters against variables in the current rule scope, and checks known transform result types against target property types. Dependent group calls validate their parameter count, resolved argument types, and FHIR versions against local or imported group signatures. Plain identity rules of the exact form `src.x -> tgt.y` and every field in a batch identity rule must have compatible source and target types. The plain form is checked only when there is one unmodified source, one unmodified target, no variables or transforms, and no dependencies. For `Reference` identities, every source target profile must be supported by the target; broader targets such as `Reference(Resource)` are accepted, and diagnostics name each unsupported source profile. A direct clone also requires matching FHIR versions. Otherwise a matching `<<types>>` default group is required; an unfixed choice target requires a matching `<<type+>>` group. Cross-version group parameters resolve aliases and unaliased type declarations within their source or target role, so declarations for the same bare type in different releases remain distinct. Default groups are resolved from the active map and maps matched by its canonical import declarations only. Unsupported plain or batch identities are errors. Incompatible direct variable assignments are also errors, as are incompatible explicit transform results. FHIR primitive types with the same underlying system value type are treated as compatible within the same FHIR version; identical `System.*` values are version-independent and can be copied inside cross-version primitive converters. The shared typed FHIRPath validator runs over constants, source clauses, and `evaluate` expressions using resolved group inputs and aliases. FML aliases may use the standard `%alias` form or the FML-compatible bare form when the alias starts a path (for example, `x.toString()`); nested members are still interpreted normally. Unknown transforms are warnings, while invalid use of a known transform is an error. FHIRPath expression parameters are only permitted for `evaluate`. Validation and SVG diagram extraction operate directly on the canonical position-aware FML model. Expression-populated targets show dotted connectors from referenced source aliases. FHIR `StructureMap` generation is a separate compiler output derived from that model.

Every source and target context must resolve to a group input or an alias in lexical rule scope. Aliases declared by a parent rule are available to its dependent rules, while aliases do not leak into sibling rules. Simple identity compatibility validation also applies inside dependent rules using those inherited aliases. Identifier-based copy transforms such as `src.element as x -> tgt.target = x` are validated with the same rules as batch (`src -> tgt: x, y`) and plain (`src.x -> tgt.y`) assignments: identical source and target types are valid, otherwise a matching local or imported `<<types>>` group is required, otherwise the assignment is an error. An unfixed choice target requires a matching `<<type+>>` group, and `Reference` target profiles are checked for all three forms. Assignments made from a FHIRPath expression such as `tgt.y = (%a)` are not covered yet.

The API contracts for the following capabilities are present but return `not-implemented`:

- semantic validation against FHIR definitions;
- transforming source data;

## GitHub workflows

- `test.yml` tests the validator package and VS Code extension.
- `release.yml` packages tagged releases and attaches the VSIX to a GitHub release.
- `publish.yml` publishes the extension to the Visual Studio Marketplace.

## License

This project is licensed under the [MIT License](LICENSE.md).

## Issues in vscode extension to resolve

### SVG Preview Instance Diagram Generation issues

### FML Editor
* If a simple rule (or batch) is for the same type, if a default rule exists (or multiple) then they should be shown in the tooltip and permit navigation.
  (from a validation perspectibe, both are valid, but the default rule will take precedence, so the tooltip should show both and allow navigation to either)
* find all references to also cover default group usage (not just declarations - this is not going to be simple as it's implied via context and parameter types  it is however handled via the tooltip hovers, so the same logic can be used to find all references to a default group)

### FML Debugger

### FML Preview Pane

### FML Autocompletion
* Support refactoring a rule with the source element that has multiple types to clone itself and apply the filter for each of the types. For example, if the source element is `Observation.value[x]` then the rule should be cloned for each of the types that are valid for that element (Quantity, CodeableConcept, string, boolean, integer, Range, Ratio, SampledData, time, dateTime, Period) and apply a filter for each of those types in the source path.

### FML validation
* output type of fhirpath expressions (evaluate transform) should be validated to ensure that the output type is compatible with the target property type.
  For example, if a source property is of type `string` and the target property is of type `CodeableConcept`, this is only valid if there is a group that permits this transformation.
* If there is a sushi-config.yaml and it's been able to be loaded and dependencies available, the the validator should be able to test for the existence of ConceptMaps referenced in translate transforms. If it is not detected in the list, this is only a warning.
* if there are multiple default groups detected which are compatible with the source and target types, then the validator should report an error that there are multiple default groups that could be used for this transformation.

### FHIRPath validation
* Not all processing is perfect, specifically around $this processing inscoped functions
* Require the ability to retrieve the output type of a FHIRPath expression, so that we can validate that the output type is compatible with the target property type - particularly for FML validation usage
