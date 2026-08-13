# FHIR Mapping Language Tools

Developer tools by Brian Postlethwaite for working with the FHIR Mapping Language (FML) in Visual Studio Code.

FHIR® is the registered trademark of HL7 and is used with permission. Use of the FHIR trademark does not constitute endorsement of this repository by HL7.

> **NOTE:** This is an early preview release and is known to have issues.
> Any issues reported in the `problems` panel or debug console may be inaccurate, so manually check that they are right, and report if not.
> Please report any problems in the [GitHub issues](https://github.com/brianpos/fhirpath-lab/issues) for this repository.
> The debugger functionality is very early and has many issues

## Features

- FML syntax highlighting
- Real-time syntax and transform validation, including type checking against FHIR core and project definitions
- Go to Definition navigation and find all references for group invocations and `extends` references
- Live map preview beside the editor
- Workspace indexing across imported maps
- FHIR-aware autocompletion
- Trace replay debugging with forward and reverse stepping
- Cross FHIR Version maps (STU3 - R6-ballot5) with logical model support

## Getting started

Open a file with the `.fml` extension. Syntax highlighting, completion, validation, and navigation activate automatically.

Use the Command Palette or editor context menu to access:

- **Validate FML**
- **Open FML Preview to the Side**
- **Show FML Language Server Status**
- **Re-index FML Workspace**
- **Restart FML Language Server**

## FML validation

Run **Validate FML** from the command palette or the editor context menu while an FML document is active. Validation waits for workspace indexing to complete so imported maps and groups are available. From the Explorer context menu, run it on an `.fml` file or folder; folders are scanned recursively, files are loaded without opening editor tabs, their diagnostics remain in the **Problems** panel after documents close, the notification reports that validation is paused while indexing and then shows the current file and `N/total` progress, and validation totals are reported across all discovered FML files.

The extension starts the bundled FML language server and synchronizes open documents incrementally. After a short debounce, the editor-independent language service parses the current text and validates standard transform parameters without requiring the file to be saved.

Errors and warnings appear as editor squiggles and clickable entries in the **Problems** panel.

Unknown transforms produce warnings so custom or newer functions remain usable. Invalid standard transform parameters are errors, and FHIRPath expression parameters are only permitted for `evaluate`.

At startup, workspace FML files are indexed by canonical URL. Cross-file group navigation follows each source map's wildcard-capable `imports` declarations. Missing group references are reported as warnings.

## Language server status and recovery

The status bar displays `FML: <map count>` after the workspace index is ready.
Click it, or run **Show FML Language Server Status**, to view:

- server state;
- workspace file, canonical URL, group, and import counts;
- open-document and failed-file counts;
- last index time and duration.

The status menu provides:

- **Re-index workspace** — clear and rebuild the canonical/group index;
- **Restart language server** — restart the LSP process and rebuild its index;
- **Open language-server logs**;
- **Show failed files** — inspect and open files that could not be indexed;
- **Copy diagnostics summary**.

**Re-index FML Workspace** and **Restart FML Language Server** are also
available directly from the command palette.

### FHIR model and dependency resolution

The extension includes core FHIR type models for STU3, R4, R4B, R5, and the bundled R6 ballot release. Versioned core canonicals and source or target versions declared in FML select the corresponding model. Otherwise, the extension uses `fhirVersion` from the project's `sushi-config.yaml` or `sushi-config.yml`; editor type analysis falls back to the bundled R4B model when no release is specified.

The extension discovers model roots from SUSHI configurations and published IG output. For an active map, the nearest enclosing model root supplies its preview and debugger models; resources from all discovered roots are made available to workspace validation and completion. Models are resolved from:

- **Installed package dependencies** — entries under `dependencies` may use either a version value or an object with a `version` property. The extension looks for each package at `~/.fhir/packages/<package-id>#<version>/package/.index.json`. It reads indexed `StructureDefinition` resources, including logical models, and `ConceptMap` resources. Packages must already be installed; the extension does not download them.
- **IG build output** — a SUSHI configuration causes its adjacent `output/**/*.json` resources to be scanned. When there is no SUSHI configuration, an `output/ImplementationGuide*.json` file identifies the project root and enables the same recursive scan. Creating, changing, or deleting JSON files there refreshes the models and re-indexes the workspace. An output `StructureDefinition` takes precedence over a package definition with the same canonical URL, so the latest local IG build is used. An output-only project has no package dependencies or default FHIR version unless those are declared elsewhere.

Workspace `.fml` files are indexed separately by canonical URL. An FML `imports` declaration, including wildcard imports, resolves matching maps and groups from that index.

For debugging, the extension follows those imported maps and derives required `StructureDefinition` canonicals from `uses` declarations and required `ConceptMap` canonicals from `translate()` calls. It searches the SUSHI package and output resources above, plus any JSON glob patterns supplied by the optional `dependencies` array in the `launch.json` configuration. When several matching resources exist, a resource with the requested FHIR release is preferred.

## Live map preview

Run **Open FML Preview to the Side** from the editor title, context menu, or command palette. A preview panel opens beside the active FML editor and refreshes from unsaved edits.

The instance diagram shows source and target types, the properties read and written by each rule, and the connections between them. Select a diagram row or header to navigate back to the corresponding FML source.

## Trace replay debugger

The **FML Debug** adapter calls a remote `StructureMap/$transform?debug=true` endpoint and replays the returned trace through Visual Studio Code's native debugger.

Create a `.vscode/launch.json` configuration:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "fml",
      "request": "launch",
      "name": "Debug FML Map",
      "program": "${file}",
      "input": "${workspaceFolder}/input.json",
      "stopOnEntry": true
    }
  ]
}
```

Start debugging with `F5`. If `input` is missing, the extension prompts for a JSON file.

- `F11`: step into the next trace event;
- `F10`: step over nested trace events;
- `Shift+F11`: step out;
- **Step Back** and **Reverse Continue**: move backward through the completed trace;
- **Variables** and **Watch** inspect the initial state, trace variables, optional per-step state, and final result;
- **Debug Console** shows evaluator and trace output;
- breakpoints continue to executable trace events mapped to FML source locations.

Runtime engine failures pause with reason **exception** and are shown in the
Debug Console. Static syntax and semantic issues remain in the Problems panel.
The endpoint can be changed with `fmlTools.debug.serverUrl` or a
`serverUrl` launch override.

## Templates

Use **Insert template FML** from the editor context menu, or choose the FML snippet from Visual Studio Code's snippet picker.

## Autocompletion

Autocompletion uses FHIR core and project definitions. Suggestions for FHIR attributes appear after a mapped object followed by a dot, such as `Patient.`.

## Current validation scope

The current validator checks FML syntax and standard transform parameters. It does not yet:

- compile FML into a FHIR `StructureMap`;
- validate references or types against FHIR definitions;
- execute transformations locally; or
- load implementation guide packages.

## Feedback and source

Source code and issue tracking are available in the [FHIRPath Lab repository](https://github.com/brianpos/fhirpath-lab).

## License

This project is licensed under the [MIT License](LICENSE.md).
