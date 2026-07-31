# FHIR Mapping Language Tools vscode extension

FHIR Mapping Language Tools is a Visual Studio Code extension for working with FHIR Mapping Language (FML) files from the fhirpath-lab.

For the extension features and current validation scope, see the [extension README](vscode-extension/README.md).

This project will support the following high level features:
* Syntax highlighting (via vscode-extension/syntaxes/fml.tmLanguage.json)
* Text format validation (via antlr4 parser in fml-validator) and some minor semantic validation (via fml-validator)
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

- `fml-validator` defines the validator API and the ANTLR-based FML parser.
- `fml-language-service` provides editor-independent diagnostics and completion logic.
- `fml-language-server` exposes the language service through the Language Server Protocol.
- `fml-debug-service` implements the remote FHIR debug-engine protocol and trace replay model.
- `vscode-extension` provides syntax highlighting, FHIR-aware completion, templates, filesystem hooks, and the LSP client.

The language server validates open FML documents as they change, without requiring a save. The filesystem watcher remains separate for future behavior driven by files and package builds.

Workspace FML files are indexed by canonical URL from metadata and concept map declarations. Cross-file group navigation and unresolved-group checks follow each map's wildcard-capable `imports` declarations.

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

The validator parser is generated from `fml-validator/grammar/mapping.g4` during each build.

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

Stage 1 validates FML text in real time through the language server. It checks that text parses successfully and validates standard transform function parameters. Unknown transforms are warnings, while invalid use of a known transform is an error. FHIRPath expression parameters are only permitted for `evaluate`.

The API contracts for the following capabilities are present but return `not-implemented`:

- compiling FML into a FHIR `StructureMap`;
- semantic validation against FHIR definitions;
- transforming source data;
- loading implementation guide packages; and
- resetting validator state.

## GitHub workflows

- `test.yml` tests the validator package and VS Code extension.
- `release.yml` packages tagged releases and attaches the VSIX to a GitHub release.
- `publish.yml` publishes the extension to the Visual Studio Marketplace.

## License

This project is licensed under the [MIT License](LICENSE.md).
