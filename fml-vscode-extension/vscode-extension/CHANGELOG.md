# Change Log

## 0.20.0 (2026-10-28)
* Resolve local model identities by canonical keys and FHIR release so logical models such as OMOP Observation do not shadow core FHIR Observation or its child types. Preserve the same identities in FHIRPath and group calls.
* Compact empty non-group local trace scopes into final-state steps, retaining source filtering/predicate steps, target logs/nested calls, group boundaries, and incomplete failure stacks.
* Discard superseded per-root model refreshes, including loads completing after deletion or disposal. Keep workspace-index failures visible to waiting tools until a successful re-index or restart, without releasing them on stale operation completion.
* Forward discovered model catalogs and per-project contexts to Copilot evaluation during indexing and after restart, including unsaved known-model overrides for maps using the workspace-wide fallback. Re-index again when model changes arrive during an existing index operation.
* Preserve newly discovered SUSHI configurations when concurrent output-file discovery finishes later.
* Restore activation-time registration of the Copilot validation and evaluation tools, sharing the running language client, workspace-index readiness, and model configuration.
* Add an opt-in `legacyPost` launch flag for remote engines expecting `map.valueString` and `resource.valueString`; keep the current request format as the default and local execution unchanged.
* Suppress user notifications for unavailable debugger hover expressions while retaining errors for explicit Watch and Debug Console evaluation.
* Run both Copilot tools in the language server using indexed source snapshots and cached model catalogs; avoid repeatedly opening wildcard imports and reloading model dependencies during evaluation.
* Reuse existing package/IG-output catalogs and explicit model/dependency files for ConceptMaps (including Bundles and unsaved edits), recognize nested output-package IG markers, and add an optional R4/R5 terminology `$translate` fallback when no local map is available. No extra workspace JSON-content scan is introduced.
* Make the bundled local TypeScript engine the debugger default. Engine selection uses only `serverUrl`: an explicit launch/settings URL selects a remote engine, with no implicit hosted lab endpoint.
* Add native Copilot `#validateFml` and local-only `#evaluateFml` tools, using unsaved editor contents and workspace imports/models; requires VS Code 1.95 or later.
* Add opt-in server traffic logging via the application-level `fmlTools.debug.logServerTraffic` user setting (off by default). When enabled, log full request Parameters, response bodies, HTTP status, and transport failures to the FHIR Mapping Language Tools output channel; payloads are unredacted and may contain sensitive data.
* Remove the debugger's Trace event scope while retaining the existing input/output context scopes and final result.
* Pretty-print local FML results in the extension using the JSON output editor's indentation settings, preserving numeric precision and leaving engine output and remote evaluation unchanged.
* Avoid false duplicate group diagnostics during folder validation when authored and rendered copies share an imported map canonical; consistently resolve the nearest copy for imports and navigation.
* Reuse the generated result tab across evaluations of the same FML source file and engine, keeping local and distinct remote endpoints separate.

# 0.19.0 (2026-10-27)
* Add support for local FML execution and debug (using new local typescript engine)
* FML validation improvements

# 0.18.0 (2026-08-18)
* evaluate transform now accepts a FHIRPath-compatible literal as the expression argument, validated exactly as authored without decoding a string literal's contents into an expression.

# 0.17.0 (2026-08-18)
* Add support for fhirpath expression in FML tooltips

# 0.16.0 (2026-08-18)
* Fix issue in vscode extension where target variables are not available in dependent rules or following targets in the same rule. These variables are now recognized and passed through as other contexts for fhirpath validation.

# 0.15.0 (2026-08-13)
* Add support for resolving profiles and logical models from IG build output, including a sibling sushi-config.yaml or output/ImplementationGuide*.json to identify an IG output directory
* Update the FML SVG rendering in the fhirpath-lab FML test page (using the same code as the vscode extension)
* register `fhirVersion` in the launch.json configuration

## 0.14.0 (2026-08-12)
* Highlight the nearest FML token for located `OperationOutcome` issues, including imported maps, and list all issues in the Debug Console

## 0.13.0 (2026-08-11)
* FHIRPath static checking supporting backtick delimited identifiers (found while trying to reference a narrative `div` property - as that's the division function)
* deduplicate maps correctly which was impacting shared maps when trying to use the replay debugger.

## 0.12.0 (2026-08-10)
* Fix regression in property copy validation: batch, plain, and variable-based assignments now share the same type, default-group, and `Reference` target-profile rules, and an unsupported variable assignment is an error instead of a warning
* Validate copies that only narrow the source with a type filter, such as `src.performed : dateTime -> tgt.category`, using the filtered type
* Link default mapping group names in simple-copy arrow and batch property hovers to their group declaration, including declarations in imported maps
* List default mapping groups in hovers even when the source and target types already match, because the group takes precedence over the direct copy
* Report an error when more than one default mapping group matches the same source and target type pair
* Report an error when a group name is repeated with the same parameter signature in the same map or an imported map, while still allowing overloads with different parameters

## 0.11.0 (2026-08-09)
* Validate exact plain and batch identity mappings against source and target types, FHIR versions, and local or imported `<<types>>`/`<<type+>>` default groups
* Resolve same-named cross-version default-group inputs by source/target role and permit version-independent `System.*` value copies inside primitive converters
* Validate `Reference` target-profile compatibility on plain and batch identities and report unsupported source profiles
* Validate dependent-group arguments against local or imported signatures and show imported parameter types in group-call hovers
* Shorten core FHIR target profiles in diagnostics and deduplicate compatible property types in hovers
* Resolve local or imported `<<types>>`/`<<type+>>` defaults for identifier-based copy transforms
* Collapse unnamed SVG rule headers to divider lines while retaining rule bodies
* Show required default mapping groups on simple-copy arrows and batch property hovers
* Add recursive Explorer file and folder validation through **Validate FML**, with a live per-file progress counter
* Pause manual and batch validation until workspace indexing completes, with an explicit paused batch status
* Retain batch-validation diagnostics in the Problems panel without keeping files open in editor tabs
* Preserve retained Problems when unchanged imported maps close after background batch validation
* Reject undeclared source and target context variables while honoring group inputs and parent-rule aliases
* Apply simple identity compatibility and default-group validation inside dependent rules

## 0.10.0 (2026-08-08)
* Fix issue with FML validation of properties with base type definitions like `Resource` to permit `Observation` and `Patientm such as found in Bundle.entry.resource
* Tooltip enhancements for groups/group invocations
* FML preview pane enhancements to support more complex FML and better error handling (pausing rendering on errors)

## 0.9.0 (2026-08-07)
* element autocomplete bug fixes
* Enhance debugger capabilities

## 0.8.0 (2026-08-06)
* Add support for STU3
* Update R6 models from ballot3 to ballot5

## 0.7.0 (2026-08-05)
* Support logical model resolution and validation against logical model profiles
* validate the variable parameter of the `cast` and `translate` transform functions
* lots more enhancements and fixes to many discovered issues

## 0.6.0 (2026-08-05)
* Significantly improved validation and supporting profiles too

## 0.5.0 (2026-08-03)
* Baseline functionality using core FHIR types

## 0.0.1 (2026-08-01)
* Initial version of the FHIR Mapping Language Tools extension for Visual Studio Code.
