# FHIR Mapping Language Tools Debug Service

This package mirrors the FHIR Mapping Lab request to a remote
`StructureMap/$transform?debug=true` endpoint and converts the returned FHIR
`Parameters` resource into an editor-independent trace replay model.

It contains no VS Code APIs. The extension's debug adapter consumes this package
to provide breakpoints, variables, watches, forward stepping, step back, and
reverse continue.

All debugger values use a typed envelope:

```ts
{
  value: JsonValue,
  types: {
    "$": { name: "Patient", namespace: "FHIR" },
    "$.name": { name: "HumanName", collection: true },
    "$.name[0]": { name: "HumanName" }
  }
}
```

Until the remote engine returns these maps, the service creates complete
fallback metadata from explicit `resourceType`, arrays, objects, and primitive
values. An API-provided `types` map overrides those fallbacks, including logical
model and custom datatype names. The VS Code adapter only consumes this metadata
and does not infer types.

Trace variables may contain either an explicit JSON value or only a FHIRPath
`path`. For path-only input/shared variables, the service evaluates that
expression against the initial input resource and attaches the resulting typed
value before the trace reaches the adapter. A single FHIRPath result is shown as
that value; multiple or empty results remain collections. Explicit API values
always take precedence. Invalid expressions are retained as nonfatal variable
errors so the rest of the trace remains debuggable.
