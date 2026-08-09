# Change Log

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
