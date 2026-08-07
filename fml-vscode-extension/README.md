# FHIR Mapping Language Tools vscode extension

FHIR Mapping Language Tools is a Visual Studio Code extension for working with FHIR Mapping Language (FML) files from the fhirpath-lab.

For the extension features and current validation scope, see the [extension README](vscode-extension/README.md).

This project will support the following high level features:
* Syntax highlighting (via vscode-extension/syntaxes/fml.tmLanguage.json)
* Text format validation via the main lab parser/model and minor semantic validation via `fml-validator`
* Package loading via sushi-config.yaml
    * detection of FHIR version and implementation guide dependencies
    * resolving profiles from the output directory from the implementation guide build
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

The language server validates open FML documents as they change, without requiring a save. The filesystem watcher remains separate for future behavior driven by files and package builds.

Workspace FML files are indexed by canonical URL from metadata and concept map declarations. Cross-file group navigation and unresolved-group checks follow each map's wildcard-capable `imports` declarations.
Standard VS Code **Go to Definition** and **Find All References** commands navigate group declarations, invocations, and `extends` references across imported maps. Hovers distinguish source/target contexts from each individual property segment, showing the type and cardinality resolved at that exact path. Variable declarations, qualified variable contexts, and transform arguments show the type information inherited from their defining source or target element. Property hovers also show the FHIR version, choice alternatives, versioned target-profile links, specification links, and model-resolution issues using the same internal-model analysis as the SVG diagram. Named transform hovers show their result type when it can be inferred. The language server is the single completion provider: typing after a resolved source, target, or alias variable offers properties from the same internal type model, including nested paths, without requiring an IG build for core FHIR types.

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

Stage 1 validates FML text in real time through the language server. It checks that text parses successfully, validates standard transform function parameters, verifies transform identifier parameters against variables in the current rule scope, and checks known transform result types against target property types. Simple batch identity rules validate every listed field against both source and target models. Incompatible direct variable assignments are warnings because additional mapping type rules may make them valid; incompatible explicit transform results remain errors. FHIR primitive types with the same underlying system value type are treated as compatible. The shared typed FHIRPath validator runs over constants, source clauses, and `evaluate` expressions using resolved group inputs and aliases. FML aliases may use the standard `%alias` form or the FML-compatible bare form when the alias starts a path (for example, `x.toString()`); nested members are still interpreted normally. Unknown transforms are warnings, while invalid use of a known transform is an error. FHIRPath expression parameters are only permitted for `evaluate`. Validation and SVG diagram extraction operate directly on the canonical position-aware FML model. Expression-populated targets show dotted connectors from referenced source aliases. FHIR `StructureMap` generation is a separate compiler output derived from that model.

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
* Long source entries in the diagram should be truncated with ellipsis and the full name should be available on hover (specifically for transform sources that are long)
  e.g. `cc('http://example.org/sdh/demo/CodeSystem/cc-screening-codes', 'sigmoidoscopy-complication')`
  For cases like this just show `cc(..., 'sigmoidoscopy-complication')` in the diagram (the full name is already in the hover) - specifically for those namespace parameters
* Add any extends X groups to the diagram also (recursively) and blend them in too.
* tooltip for source rules that have a filter of some kind should have the filter displayed in the tooltip (either a where fhirpath expression filter, or type filter).
* fhirpath transforms don't show dotted links to all source variables used in the transform.
    (check the extract-complex-smap.fml file for an example of this)
    `tgt.derivedFrom as df, df.reference = ('QuestionnaireResponse/' & src.id)` 
    doesn't show dotted link from `tgt.derivedFrom` to `src.id` in the diagram.
* Not all source/target parameters to the group are shown in the diagram (particularly when not used in the mapping rules
* if a fhirpath transform references a source variable (but not a child property of that variable) then it should be shown as `.` in the diagram (with a dotted link to the source variable) - just as we do with other things. parameter variables don't need to be listed in the rule's sources to be used.
* (maybe in the preview pane?) tooltip for an source item that includes a filter should display the filter details.
* (maybe in the preview pane?) tooltip for an target item that includes a fixed value should display the fixed value details.
``` fml
group PopulateObservation(source src : QuestionnaireResponse, source complicationItem, target tgt : Observation, source coding : CodeableConcept, source patientFullUrl) {
  src -> tgt.code = (%coding) "SetObservationCode";
  src -> tgt.status = 'final' "SetStatus";
  // src.subject as s -> tgt.subject = s; // not using the the subject, as this is intended to be created from the data instead (as is outgoing referral)
  src.subject as s -> tgt.subject as p, p.reference = (%patientFullUrl) "SetSubjectRef";
  src.authored as s -> tgt.issued = s "SetAuthored";
  src.authored as s -> tgt.effective = s "SetEffective";
  src.author as s -> tgt.performer = s;
  src.id -> tgt.derivedFrom as df, df.reference = ('QuestionnaireResponse/' & src.id) "SetDerivedFrom";
}
```

### FML Editor

### FML Debugger

### FML Preview Pane
* when a map is re-generated, retain the current zoom level and position in the diagram (if possible) instead of resetting to the default zoom and position once it reloads (gives a smoother user experience).

### FML Autocompletion

### FML validation
* simple property transforms should be validated to ensure that the source and target properties are compatible.
  If they are the same type, then the assignment is valid (this is a direct clone of the source property to the target property - noting that the fhir version also needs to be the same for this to be valid).
  Otherwise if there is a group (<<types>>) that can convert the source type to the target type, then the assignment is valid.
  If not, it should be an error.
  For example, if a source property is of type `string` and the target property is of type `CodeableConcept`, this is only valid if there is a group that permits this transformation. 
