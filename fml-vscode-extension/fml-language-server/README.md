# FHIR Mapping Language Tools Language Server

This package exposes `@fhirpath-lab/language-service` through the Language Server Protocol.

It synchronizes FML documents incrementally, validates open documents after a short debounce, publishes diagnostics, provides standard transform completions, and resolves group invocations and `extends` references to group declarations.

Workspace FML files are indexed by canonical URL from metadata and concept map declarations. Cross-file groups are visible only through matching `imports` patterns, including `*` and `?` wildcards. Index progress, file updates, failures, and summary counts are written to the language-server output channel.

The VS Code extension bundles this server and communicates with it over IPC.
