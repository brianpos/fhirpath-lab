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
- Live instance and complete map previews beside the editor
- Workspace indexing across imported maps
- FHIR-aware autocompletion
- Trace replay debugging with forward and reverse stepping
- Cross FHIR Version maps (STU3 - R6-ballot5) with logical model support

## Getting started

Open a file with the `.fml` extension. Syntax highlighting, completion, validation, and navigation activate automatically.

Use the Command Palette or editor context menu to access:

- **Validate FML**
- **Open FML Instance Preview to the Side**
- **Open FML Complete Preview to the Side**
- **Show FML Language Server Status**
- **Re-index FML Workspace**
- **Restart FML Language Server**

## FML validation

Run **Validate FML** from the command palette or the editor context menu while an FML document is active. Validation waits for workspace indexing to complete so imported maps and groups are available. From the Explorer context menu, run it on an `.fml` file or folder; folders are scanned recursively, files are loaded without opening editor tabs, their diagnostics remain in the **Problems** panel after documents close, the notification reports that validation is paused while indexing and then shows the current file and `N/total` progress, and validation totals are reported across all discovered FML files.

The extension starts the bundled FML language server and synchronizes open documents incrementally. After a short debounce, the editor-independent language service parses the current text and validates standard transform parameters without requiring the file to be saved.

Errors and warnings appear as editor squiggles and clickable entries in the **Problems** panel.

### Copilot chat tools

VS Code 1.95 or later is required. Enable the extension's tools in Copilot's tool
picker, then reference them explicitly or let the agent choose them:

- **`#validateFml`** validates the active FML document (including untitled files),
  or `filePaths`, an array of absolute FML file paths. It uses unsaved editor
  content, waits for workspace indexing, resolves imports and configured models,
  and updates Problems using the same validation path as **Validate FML**.
  Results include counts, diagnostic messages, zero-based UTF-16 ranges, file
  URIs, and the document versions that were validated.
- **`#evaluateFml`** tests the active file-backed map, or `mapFilePath`, against
  the required absolute `inputFilePath` using **only the local TypeScript
  engine**, regardless of debugger server settings. Optional
  `entryGroup` selects the entry group; `modelFilePath` supplies JSON
  StructureDefinition/ConceptMap/Bundle content in addition to workspace models.
  Unsaved map, imported-map and input content is used. It returns status,
  diagnostics/OperationOutcome and a lossless `resultJson` string; errors do not
  return partially written targets as successful output. No debug trace is
  captured, and unsupported local features never fall back to a remote mapping
  server. If configured, a terminology service can be called for a missing
  ConceptMap; its codes/codings and canonical are then sent to that service.

For example:

> Update this mapping, run #validateFml, and fix any errors.

> Use #evaluateFml to test the current map against my test-input JSON file and
> explain the result.

Both tools execute in the language-server process, reusing indexed FML source
snapshots (including unsaved imports) and the existing preprocessed model/catalog
cache. Evaluation does not reopen imported files or reload the model catalog.
Indexing sends the cached model files and each discovered project's evaluation
context to the language server, including after a restart. Evaluations use the
nearest model root, or the combined workspace catalog when the map is outside
all model roots; unsaved edits to known model files follow that same selection.
Model changes arriving during indexing trigger another pass before waiting tools
continue, so newly discovered catalogs are not dropped.
Overlapping catalog refreshes use per-root revisions: older loads cannot replace
newer models or restore a deleted root. A failed workspace scan or index request
blocks validation/evaluation tools with that error until re-indexing or restarting
the language server succeeds; it is not treated as a ready index.
Only current input, explicit model content and dirty known-model overrides are
sent per test. The local execution plan is prepared from these cached sources.
Window progress shows indexing and evaluation phases; cancellation is forwarded
to the language server. No additional JSON discovery scan is performed.

Tools require a trusted workspace. Explicit file paths must belong to a workspace
or already be open in the editor. They do not save or edit files. Validation
returns diagnostics, not complete source/model content; evaluation returns
transformed data that may be sensitive. The approval messages explain what is
returned to chat. Local execution does not mean chat data stays on the machine:
tool results become model context. No MCP server is installed or required.

The instance preview retains rule-oriented grouping. The complete preview groups rows by source and target property, keeps filtered source uses and target collection instances separate, and provides a **Show all properties** checkbox. When enabled, it adds every root property and one level of children below datatypes that the map actually traverses. It also blends recursively extended groups into derived groups, resolving imported base groups through the same indexed `imports` graph used by validation. Properties that do not participate in the map are shown with a light grey background; indirect use through descendants, called groups, transforms, and fixed values remains unshaded.

Unknown transforms produce warnings so custom or newer functions remain usable. Invalid standard transform parameters are errors, and FHIRPath expression parameters are only permitted for `evaluate`. The `evaluate` expression argument may also be any FHIRPath-compatible literal, validated exactly as authored without decoding a string literal's contents into an expression.

At startup, workspace FML files are indexed by canonical URL. Cross-file group navigation follows each source map's wildcard-capable `imports` declarations. Missing group references are reported as warnings.

If authored and generated files share a canonical URL, imports resolve that
canonical only once, using the file closest to the importing map's directory
(with URI order breaking ties). Folder validation therefore does not count
rendered copies as duplicate group declarations. Validation, navigation, previews,
and debugger imports use the same selected copy. Genuine duplicate group
signatures across different imported canonicals are still reported as errors.

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
- **IG build output** — a SUSHI configuration causes its adjacent `output/**/*.json` resources to be scanned. When there is no SUSHI configuration, an `ImplementationGuide*.json` file below `output` (including `output/package`) identifies the project root and enables the same existing output-resource loading. Creating, changing, or deleting JSON files there refreshes the models and re-indexes the workspace. An output `StructureDefinition` takes precedence over a package definition with the same canonical URL, so the latest local IG build is used. An output-only project has no package dependencies or default FHIR version unless those are declared elsewhere.

Workspace `.fml` files are indexed separately by canonical URL. An FML `imports` declaration, including wildcard imports, resolves matching maps and groups from that index.

For debugging, the extension follows those imported maps and derives required `StructureDefinition` canonicals from `uses` declarations and required `ConceptMap` canonicals from `translate()` calls. It searches the SUSHI package and output resources above, plus any JSON glob patterns supplied by the optional `dependencies` array in the `launch.json` configuration. When several matching resources exist, a resource with the requested FHIR release is preferred.

Debugging and `#evaluateFml` both use discovered ConceptMaps. A versioned canonical
such as `http://example.org/ConceptMap/map|2` requires that exact map version;
another available version is not substituted.

ConceptMaps reuse the existing package indexes and IG-output resource paths;
there is no additional workspace-wide JSON-content scan or JSON watcher.
Maps outside an identified model root reuse the already discovered workspace
model catalog. A map inside a model root continues to use that root's models.
Unsaved edits to known model files are read when evaluating.

If source-only JSON ConceptMaps have not been built into the output/package
catalog, supply them explicitly rather than scanning every JSON file. For
example, a debugger launch can specify:

```json
{
  "dependencies": ["${workspaceFolder}/input/elements/ConceptMap-*.json"]
}
```

The evaluation tool can use `modelFilePath` for an explicit resource or Bundle.
Bundles supplied through the existing output/model/dependency paths are supported.

### Terminology fallback for local evaluation

Embedded FML ConceptMaps and supplied/discovered ConceptMaps are used first.
If no map matches, an optional terminology service can perform
`POST [base]/ConceptMap/$translate` using the canonical (and `conceptMapVersion`
when specified). Configure its **FHIR service base URL**, not the map's canonical:

```json
{
  "fmlTools.terminology.serverUrl": "https://terminology.example.org/fhir",
  "fmlTools.terminology.fhirVersion": "R4"
}
```

The terminology URL is empty by default. Without a local map or a configured
service, the existing missing-ConceptMap/translate-host error remains.
Use `R4` for R4/R4B-compatible operation parameters (`coding` /
`codeableConcept`), or `R5` for `sourceCoding` / `sourceCodeableConcept`.
This is the terminology server's version, independent of the mapping's FHIR
versions. Bare codes are sent as a Coding with a code only; services that require
a source system need a Coding or CodeableConcept input that includes it.

Launch configurations can override these settings with `terminologyServerUrl`
and `terminologyFhirVersion`; an empty `terminologyServerUrl` disables fallback
for that launch. The Copilot evaluation tool uses the workspace settings.
These settings affect the local engine, not a remote mapping server's own
terminology configuration.

The adapter supports the FML `code`, `system`, `display`, `Coding`, and
`CodeableConcept` result forms, ignores negative matches, and reports HTTP,
OperationOutcome and malformed-response errors. A normal `result=false` returns
no translations. Ambiguous or unsupported local ConceptMaps remain explicit
errors rather than being silently replaced by an HTTP result.

Transformation still runs locally, but configured terminology calls disclose
codes/codings and map canonicals to that service. No complete source resource is
sent, and terminology request/response payloads are not automatically logged.
The evaluation tool's approval message describes this possible network access.
For embedding the engine or implementing a custom/authenticated terminology
host, see the [engine integration example](../fml-executor/README.md#terminology-host-example).

## Live map preview

Run **Open FML Instance Preview to the Side** or **Open FML Complete Preview to the Side** from the editor title, context menu, or command palette. The selected preview opens beside the active FML editor and refreshes from unsaved edits.

The instance diagram shows source and target types, the properties read and written by each rule, and the connections between them. Select a diagram row or header to navigate back to the corresponding FML source.

## Trace replay debugger

The **FML Debug** adapter uses the bundled TypeScript engine locally by default
and replays its trace through Visual Studio Code's native debugger. An explicitly
configured remote transform endpoint can be used instead.

No engine setting or executable path is required for local execution. The local engine
supports the [documented execution features](../fml-executor/README.md),
one input/target root, optional `entryGroup`, and the same replay controls.
JSON and HL7 v2 ER7 inputs work locally. For v2, the shared Lab parser projects
the message into the generic FHIRPath-annex logical model automatically, or into
a supplied specific model using `hl7v2-source` extensions. Specific models may
come from the explicit `model` file or resolved workspace model resources.
This also applies to the local `#evaluateFml` tool. See the
[v2 model design and PID-to-Patient example](../../docs/hl7v2-fml-design.md).
Unsupported features report diagnostics; they do not fall back to a remote engine.
Local output documents are pretty-printed for display using the JSON output
editor's tab-size and spaces/tabs settings. Formatting changes whitespace only,
preserving numeric precision without changing the execution engine's output.
Remote results are displayed without this extra formatting step.
Local execution failures preserve the stopped recording and source-located
OperationOutcome diagnostics in the Debug Console; partially written targets
are not opened as successful result documents. Setup errors also carry explicit
OperationOutcome details.
Imported maps resolved by the workspace are passed to the local engine with
their source identity. Supplied unconditional ConceptMaps can execute locally;
missing maps can use the configured terminology fallback. Unsupported local
terminology policies remain explicit errors. Compatible casts
are supported, while nontrivial cast conversion remains explicitly unsupported.
Trace event granularity/order and internal names are engine-specific, not
canonical interoperability expectations.

Optional local recorder controls are set in `launch.json`, for example
`"localTrace": {"detail": "rules", "maxEvents": 10000, "maxBytes": 8388608}`.
`full` (default) includes source/target scopes and intermediate processing steps;
`rules` captures group/rule events and messages with fewer snapshots. Both use
event-time values, not live targets. After capture, adjacent matching non-group
enter/exit pairs become one final-state step. Groups always retain their boundaries,
and any intermediate step or nested call prevents collapse. See the
[engine-neutral compaction policy](../../server-api-fml-debugger.md#empty-scope-compaction-producer-guidance).
Limits apply to raw capture before compaction and preserve a complete-event prefix with an explicit truncation warning;
an execution error remains visible if it occurs after capture has stopped.
Snapshot recording can be expensive for large targets; see the
[recording and benchmark notes](../fml-executor/README.md).

Remote requests use the Mapping Language IG parameters: repeated `srcMap` FML strings, UTF-8/base64 `content` as a Binary (`application/fhir+json`, `application/fhir+xml`, or `x-application/hl7-v2+er7`), and unchanged `model` parameters. Remote v2 input is sent unchanged, not projected to JSON; the server must support ER7 input and the source model. The enclosing HTTP content type remains `application/fhir+json` for the Parameters body. Traces can be requested with `debug=true` in the endpoint URL or a Boolean `debug` body parameter. For modern engine launches, include `debug=true` in `serverUrl`; `legacyPost` sends the body parameter. JSON and v2 inputs work locally or remotely; XML requires remote execution. Results use `return`, with legacy `result` still accepted. The adapter retains evaluator metadata, additional `output`, and the raw response.

The structured trace supports `enter`/`step`/`exit`, explicit or derived depth, zero-based UTF-16 source ranges, `expressionPosition`, complete variable snapshots grouped by `contextType`, repeated collection items, and named log messages. Inline values, resources, JSON values, and immutable-input retrieval paths are supported (XML and raw remote v2 replay require inline variable values). `traceStatus` reports complete, truncated, or stopped recordings; errors in `outcome` stop replay at the last recorded event without discarding its stack. Legacy extension-based recordings remain supported. See the [debugger API](../../server-api-fml-debugger.md) for the wire format.

Create a `.vscode/launch.json` configuration for the default local engine:

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

Start debugging with `F5`. If `input` is missing, the extension prompts for a JSON,
XML, or HL7 v2 file. For example, use `"input": "${workspaceFolder}/input.hl7"`
with the [PID-to-Patient map](../../docs/hl7v2-fml-design.md#worked-pid-to-patient-example).

Successful evaluations reuse the same editable JSON output tab for the same
source file and engine across debug sessions. The local engine has its own output;
remote engines are distinguished by their configured endpoint URL. Each new
result replaces that tab's contents, including any manual edits, without changing
saved files. Different source files or engines keep separate outputs. Closing or
saving an output causes the next evaluation to open a fresh output tab. Failed
evaluations leave the previous successful output unchanged.

- `F11`: step into the next trace event;
- `F10`: step over nested trace events;
- `Shift+F11`: step out;
- **Step Back** and **Reverse Continue**: move backward through the completed trace;
- **Variables** and **Watch** inspect the initial state, trace variables, optional per-step state, and final result;
- **Debug Console** shows evaluator and trace output;
- breakpoints continue to executable trace events mapped to FML source locations.

The debugger keeps its context scopes (input, output, etc.) and final result,
without a Trace event scope. These are top-level scopes inside VS Code's
built-in VARIABLES view; that heading is controlled by VS Code, not an extra
container added by the extension.

Runtime engine failures pause with reason **exception** and are shown in the
Debug Console. Static syntax and semantic issues remain in the Problems panel.

### Selecting a remote engine

Supply the remote engine's HTTP(S) URL explicitly using `serverUrl`, for example:

```json
{
  "type": "fml",
  "request": "launch",
  "name": "FML - hosted lab engine",
  "program": "${file}",
  "input": "${workspaceFolder}/input.json",
  "serverUrl": "https://fhir-mapping-lab2.azurewebsites.net/StructureMap/$transform?debug=true",
  "stopOnEntry": true
}
```

For a locally hosted remote engine, use its URL instead, such as
`http://127.0.0.1:8083/transformDebugger?debug=true`. The bundled local engine
needs neither a URL nor an executable path.

Alternatively, set `"fmlTools.debug.serverUrl": "<HTTP(S) URL>"` to use that
remote engine by default. A launch `serverUrl` overrides this setting. Set
`"serverUrl": ""` in a launch configuration to use the bundled local engine even
when a remote URL is configured in settings.

With no non-empty URL configured, execution is local. There is no implicit lab
endpoint, and an invalid non-empty URL reports an error rather than falling back
to another engine. Engine selection is controlled only by `serverUrl`.

For remote engines that still expect the older request format, add
`"legacyPost": true` to the launch configuration. This sends each FML document as
`map.valueString` instead of `srcMap.valueString`, and the unchanged JSON or XML
input as `resource.valueString` instead of Binary `content.resource`. Model
parameters and map filenames are preserved. The flag defaults to `false`, does
not change HTTP headers, and has no effect on local execution.

Server traffic logging is **off by default**. To troubleshoot server-mode
evaluations, explicitly enable this application-level setting in **User Settings**
(workspace settings cannot enable it):

```json
{
  "fmlTools.debug.logServerTraffic": true
}
```

When enabled, **View > Output > FHIR Mapping Language Tools**
logs the endpoint, outgoing `Accept` and `Content-Type` headers, and complete
outgoing Parameters resource, followed by the HTTP status and full response
body (including error responses). Remote engine requests currently send
`Accept: application/fhir+json, application/json` and `Content-Type: application/fhir+json`,
matching the web page. Transport failures are logged too. Entries identify the source file and debug session.
Local evaluations do not produce these HTTP logs. Requests and responses are
not truncated or redacted and may contain sensitive input resources, model
dependencies, and trace snapshots; treat copied or saved output accordingly.
Turn the setting off after troubleshooting. Disabling it stops new HTTP log
entries, including responses from evaluations already running, but does not erase
previously logged content; clear the output channel separately.

## Bulk map tests

Add a `.fml-tests.json` file to run a folder of JSON inputs against every map in a folder from the Test Explorer (paths are relative to the config file):

```json
{
  "maps": "maps4-5",
  "reverseMaps": "maps5-4",
  "conceptMaps": "conceptmaps",
  "inputs": "tests/input",
  "include": "Patient*.json",
  "expected": "tests/expected",
  "engine": "local"
}
```

- `maps` – folder of maps (recursed); imports are resolved as in the debugger.
- `reverseMaps` – optional; a reverse map is paired when its source/target structure URLs are swapped, and the forward result is mapped back and compared with the original input.
- `conceptMaps` – optional folder (recursed) of ConceptMap JSON files (or Bundles) used by `translate()` in the local engine, in addition to ConceptMaps found through the workspace models.
- `inputs` – folder (recursed) of `.json` files. A map only runs against inputs whose `resourceType` matches its source type, so cross-version layouts can use one sub folder per resource type.
- `include` – optional glob (or array) filter; default is all `.json` files.
- `expected` – optional folder mirroring the input paths, compared semantically (key order ignored).
- `engine` – only `"local"` is supported.

Failures show a diff in the Test Explorer; the Debug profile opens a single case in the FML debugger. See `sample-fml/cross-version` for a cross-version R4→R5 example.

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
