# FHIR Mapping Language Tools Language Service

This package provides editor-independent FML language intelligence over `@fhirpath-lab/validator`.

It currently provides:

- bounded validation diagnostics with editor-neutral ranges;
- validation summaries;
- standard transform completion suggestions;
- group declaration and reference symbols for go-to-definition;
- canonical URL and import metadata for workspace indexing.

The LSP server and VS Code extension adapt these results to their respective protocol and editor APIs.
