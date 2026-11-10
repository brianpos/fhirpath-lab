# FML Debugger API

## Status and scope

FHIRPath Lab extends the FHIR `StructureMap/$transform` operation so a client can submit raw FHIR Mapping Language (FML), execute it remotely, and receive a trace for display or debugger replay.

The VS Code debugger uses the bundled local TypeScript engine unless a non-empty
`serverUrl` launch option or `fmlTools.debug.serverUrl` setting selects a remote
endpoint. No lab endpoint is configured implicitly. The HTTP contract below
applies when remote execution is selected; local execution makes no HTTP request.

The FHIRPath Lab web client and VS Code extension use the [Mapping Language IG transform parameters](https://build.fhir.org/ig/HL7/mapping-language-ig/en/OperationDefinition-StructureMap-transform.html) and the [structured debug trace](https://build.fhir.org/ig/HL7/mapping-language-ig/en/debug.html). The debugger trace remains experimental. Parameter names and extension URLs are case-sensitive. Legacy extension-based trace responses remain supported, as described below.

In this document, **MUST**, **SHOULD**, and **MAY** describe the current interoperable contract. Items under [Future API enhancements](#future-api-enhancements) are proposals, not current requirements.

## Interaction overview

1. The client resolves the primary map, imported maps, input resource, and model dependencies.
2. It posts a FHIR `Parameters` resource to `$transform`, normally with `debug=true` in the URL.
3. The server links the maps and models, executes the transformation, and records trace events in execution order.
4. The server returns `Parameters` containing the result, evaluator identity, trace, and optional `OperationOutcome`.
5. A simple client displays the trace. A replay debugger stores it and implements stepping, breakpoints, stack frames, variables, and watches locally.

The `debug=true` URL query parameter or a `debug` body parameter with `valueBoolean: true` informs the server that the client is expecting a trace and should return as much information as possible. Either representation is valid; both are not required. A server MAY ignore this parameter and return a normal `$transform` result without a trace. A client MUST be prepared to handle a response without trace events. This way in production services the additional overhead of trace generation can be avoided.

Reverse stepping does not call the server again or require reverse execution. It depends on an ordered trace containing enough source, state, variable, and type information to reconstruct each stop.

### Local recorder (internal API)

The local JavaScript backend adapts its recording to the same Parameters/replay
format without making an HTTP mapping request. Its direct debug request accepts
`localTrace: false` to disable capture, or an object with `maxEvents`, `maxBytes`
and `detail` (`full` or `rules`). VS Code launch configuration exposes the object.
These are internal local options, not additional standardized HTTP parameters.

`rules` captures group/rule events and messages but omits source/target instrumentation.
This selected capture policy is not an incomplete recording: normal completion
can be `complete`. Budget exhaustion instead retains a whole-event prefix and
reports `truncated` with an outcome warning. A later execution error remains in
the outcome even after capture stops. Values and source spans are snapshotted at
the event boundary; the recorder never forces lazy constants for display.
The event-byte limit counts serialized internal events, not total HTTP envelope
size or heap consumption. After capture ends, the TypeScript recorder applies
the empty-scope compaction described below. Limits apply before compaction;
compaction neither restores omitted events nor changes completeness.

The format is documented; event granularity, valid engine-specific evaluation
orders and internal variable names are not standardized. There are no definitive
reference recordings at this stage. Compare outcomes and format/stack/snapshot
invariants, not exact event lists. See the
[local executor documentation](fml-vscode-extension/fml-executor/README.md)
for current behavior, costs and deferred issues.

## Request

```http
POST /StructureMap/$transform?debug=true
Accept: application/fhir+json, application/json
Content-Type: application/fhir+json
```

The body is a FHIR `Parameters` resource.

### Parameters

| Name | Cardinality | Representation | Description |
| --- | ---: | --- | --- |
| `srcMap` | `0..*` | `valueString` | Raw FML. The first occurrence is the primary map; later occurrences are available for imports. |
| `sourceMap` | `0..1` | `resource` | A parsed StructureMap, as an alternative to raw FML. |
| `supportingMap` | `0..*` | `resource` | Supporting StructureMap resources. |
| `source` | `0..1` | `valueUri` | Canonical URL of a StructureMap already available to the server. |
| `model` | `0..*` | `valueString` or `resource` | Model resources required to parse or execute the maps. The name is singular even when the value is a Bundle. |
| `content` | `1..1` | `resource` | Clients send a Binary whose `data` is base64-encoded UTF-8 JSON, XML, or HL7 v2 ER7, with `contentType` of `application/fhir+json`, `application/fhir+xml`, or `x-application/hl7-v2+er7`, respectively. Remote VS Code execution preserves raw v2; the server must support that input format and source model. This also supports logical models and cross-version inputs. |
| `debug` | `0..1` | `valueBoolean` | Set to `true` to request a trace. May be omitted when `debug=true` is supplied in the URL query instead. |

FHIR permits repeated parameters. A client may therefore send both an explicit `model.valueString` and another `model.resource` containing a collection Bundle.

### Legacy request compatibility

The VS Code extension supports `"legacyPost": true` in a debug launch configuration
for remote engines that have not migrated to this request format. It replaces
each `srcMap.valueString` with `map.valueString` and replaces Binary
`content.resource` with the original JSON, XML, or v2 text in `resource.valueString`.
This legacy string parameter cannot carry a Binary content type; the enclosing
request remains FHIR Parameters JSON in either mode.
Map filenames, model parameters, and HTTP headers are unchanged. The option
defaults to `false` and does not affect local execution.

### Maps and filenames

Each `srcMap` contains one complete FML document in `valueString`. Parsed StructureMaps use `sourceMap` or `supportingMap`, not `srcMap.resource`. With multiple maps, the server SHOULD resolve `imports` by canonical URL rather than parameter order.

The standard operation supports three ways to select the primary map:

1. `POST [base]/StructureMap/$transform` with `srcMap` or `sourceMap`.
2. `POST [base]/StructureMap/$transform` with a `source` URI resolved from the server repository.
3. `POST [base]/StructureMap/{id}/$transform`, addressing the primary StructureMap resource directly.

For `srcMap.valueString`, the server parses FML into a StructureMap before linking. All successfully parsed or supplied StructureMaps are registered together for canonical import resolution.

Each request-supplied map SHOULD carry its diagnostic filename using:

```text
http://hl7.org/fhir/StructureDefinition/operationoutcome-file
```

```json
{
  "name": "srcMap",
  "valueString": "/// url = 'http://example.org/StructureMap/Main'\ngroup Main(source src, target tgt) { src -> tgt; }",
  "extension": [{
    "url": "http://hl7.org/fhir/StructureDefinition/operationoutcome-file",
    "valueString": "maps/main.fml"
  }]
}
```

The filename is a diagnostic identity, not a server path. Clients SHOULD use a stable workspace-relative or program-relative name. Servers MUST NOT try to read it from their filesystem (it is purely used for the clients tracing/tracking/matching).

A StructureMap resource can therefore be supplied directly:

```json
{
  "name": "sourceMap",
  "resource": {
    "resourceType": "StructureMap",
    "url": "http://example.org/StructureMap/Main",
    "status": "draft",
    "group": []
  },
  "extension": [{
    "url": "http://hl7.org/fhir/StructureDefinition/operationoutcome-file",
    "valueString": "StructureMap-Main.json"
  }]
}
```

### Models

A `model` can contain:

- JSON text for one conformance resource or Bundle in `valueString`;
- one FHIR resource in `resource`; or
- a collection Bundle in `resource`, with dependencies in `entry.resource`.

The VS Code client currently resolves StructureDefinitions and ConceptMaps. Servers SHOULD also accept ValueSets, CodeSystems, and other resources required by their implementation.

Core FHIR StructureDefinitions are normally omitted because the engine provides its core model. Profiles and logical models must be supplied when not installed on the server. For duplicate canonicals, a server SHOULD prefer an exact canonical version match.

### Complete request example

```json
{
  "resourceType": "Parameters",
  "parameter": [
    {
      "name": "srcMap",
      "valueString": "/// url = 'http://example.org/StructureMap/Main'\nimports 'http://example.org/StructureMap/Shared'\ngroup Main(source src, target tgt) { src -> tgt then Shared(src, tgt); }",
      "extension": [{
        "url": "http://hl7.org/fhir/StructureDefinition/operationoutcome-file",
        "valueString": "main.fml"
      }]
    },
    {
      "name": "srcMap",
      "valueString": "/// url = 'http://example.org/StructureMap/Shared'\ngroup Shared(source src, target tgt) { src.id -> tgt.id; }",
      "extension": [{
        "url": "http://hl7.org/fhir/StructureDefinition/operationoutcome-file",
        "valueString": "shared.fml"
      }]
    },
    {
      "name": "model",
      "resource": {
        "resourceType": "Bundle",
        "type": "collection",
        "entry": [{
          "resource": {
            "resourceType": "StructureDefinition",
            "url": "http://example.org/StructureDefinition/ExamplePatient",
            "type": "Patient",
            "kind": "resource",
            "derivation": "constraint"
          }
        }]
      }
    },
    {
      "name": "content",
      "resource": {
        "resourceType": "Binary",
        "contentType": "application/fhir+json",
        "data": "eyJyZXNvdXJjZVR5cGUiOiJQYXRpZW50IiwiaWQiOiJleGFtcGxlIn0="
      }
    },
    {
      "name": "debug",
      "valueBoolean": true
    }
  ]
}
```

## Response

A successful execution returns HTTP `2xx` with a FHIR `Parameters` resource.

| Name | Cardinality | Representation | Description |
| --- | ---: | --- | --- |
| `parameters` | `0..1` | `part` | Metadata. The recognized `evaluator` part identifies the engine and version. |
| `return` | `0..1` | `resource` | Transformation result, including Binary JSON/XML. The clients also accept the legacy `result` parameter and legacy value representations; `return` takes precedence when both appear. |
| `output` | `0..*` | engine-defined | Additional engine output, retained alongside metadata and the raw response. |
| `trace` | `0..*` | `part` | Ordered execution events. Parts are processed in response order. |
| `outcome` | `0..1` | `resource` | OperationOutcome containing nonfatal or execution diagnostics. |
| `traceStatus` | `0..1` | `valueCode` | `complete` (default), `truncated`, or `stopped`. Open scopes and recorded variables are retained for incomplete recordings. |

The raw response, including unknown parameters, is retained. A server MAY return translated StructureMaps or engine diagnostics, but their shape is not standardized and clients must not depend on them for replay.

Evaluator metadata is represented as:

```json
{
  "name": "parameters",
  "part": [{"name": "evaluator", "valueString": ".NET FML engine 1.2.3"}]
}
```

### Structured trace events

Each repeated `trace` parameter represents one event, in evaluation order:

```json
{
  "name": "trace",
  "part": [
    {"name": "phase", "valueCode": "step"},
    {"name": "depth", "valueInteger": 1},
    {"name": "source", "valueString": "main.fml"},
    {"name": "startRow", "valueInteger": 4},
    {"name": "startColumn", "valueInteger": 2},
    {"name": "endRow", "valueInteger": 4},
    {"name": "endColumn", "valueInteger": 8},
    {"name": "expressionPosition", "valueString": "StructureMap.group[0].rule[0].source[0]"},
    {"name": "variable", "part": [
      {"name": "name", "valueString": "src"},
      {"name": "contextType", "valueString": "input"},
      {"name": "dataType", "valueString": "Patient"},
      {"name": "path", "valueString": "Patient"}
    ]},
    {"name": "message", "part": [
      {"name": "name", "valueString": "copy-id"},
      {"name": "text", "valueString": "Copied identifier"}
    ]}
  ]
}
```

- Phases are `enter`, `step`, and `exit`. Omitted depth is derived from the scope stack: an outer `enter`/`exit` has depth zero; its steps and immediate nested scopes have depth one.
- Text coordinates are zero-based UTF-16 positions, with an exclusive end. A missing end selects the start position. `expressionPosition` is also supported for mapping structured locations to FML.
- Each event contains the complete variable snapshot, not a delta. Repeated names form ordered collections. A variable without a value or retrieval path is an empty collection.
- Variable items use a `value` part with native `value[x]`, a `resource` part with `resource`, or a `jsonValue.valueString` containing JSON. `dataType` is a display label, not a deserialization instruction.
- A path-only item is retrieved from the immutable input, regardless of `contextType`. JSON inputs can be resolved locally; XML and raw remote v2 inputs require inline snapshots for local variable inspection.
- Repeated `message` parts preserve their optional names and all `text` parts.
- `outcome` issues with severity `error` or `fatal` mark the final recorded event as an exception without unwinding open scopes. Warnings and information do not indicate failure. Parameters failure responses retain their recorded trace, including on non-2xx HTTP responses.
- Both clients retain `parameters`, `output`, and `trace`. The web page also displays trace completeness and captured variable values; the extension groups variables by engine-provided context and omits the Trace event scope from the Variables view.
- At the end of a stopped or truncated recording, the extension remains paused on the last snapshot so reverse stepping and the active stack remain available. Disconnect explicitly to end that replay session.

### Empty-scope compaction (producer guidance)

Engines SHOULD post-process a completed recording before returning it, using the
following rule. The protocol calls the begin/end phases `enter` and `exit`.

An **adjacent matching non-group `enter` / `exit` pair**, with no event between
them, MAY be replaced by one `step`:

```text
Before                         After
enter(source S, depth d)        step(source S, depth d, final snapshot)
exit (source S, depth d)
```

The step uses the **exit event's complete variable snapshot**, source identity,
coordinates, expression position and depth. Keep messages from both boundaries
in their original order. The entry snapshot is intentionally omitted; equal
before/after values are not a prerequisite for compaction.

Apply these safeguards consistently across engines:

- **Groups are never compacted**, including empty groups. Preserve their
  `enter` / `exit` boundaries for calls, stepping and stack inspection. Failed
  or truncated groups remain open rather than receiving synthetic exits.
- Match the same semantic site and depth within the same source document.
  Producers can use their internal scope kind and structured expression
  identity, or an unambiguous matching source span. The internal `kind` used by
  the TypeScript recorder is not an additional wire parameter. Never infer group
  identity or match scopes from human-readable message text alone.
- **Any intermediate event prevents collapse**, even one step at the same site.
  Keep type-filtering, `where`, `check`, default/list selection, language logs,
  multiple source/target evaluations, and nested group activity visible.
  A compacted child is still an intermediate step: do not then remove its
  parent's boundaries.
- Do not merge different source clauses, target clauses, or repeated evaluations
  just because their snapshots are equal. Unknown or mismatched scope identities
  must not be compacted.
- Preserve unmatched entries in stopped/truncated recordings. Complete empty
  pairs earlier in those recordings can still be compacted. Do not synthesize
  exits, discard failures, or change `traceStatus`.
- Preserve event order and source locations. No depth rebasing is needed because
  the removed scope has no children. Clients assign replay indices from the
  final emitted sequence.

For example, a source with filtering remains:

```text
enter(source S, depth d)
step (source S, depth d+1, type-filter result)
step (source S, depth d+1, where result for candidate 1)
step (source S, depth d+1, where result for candidate 2)
exit (source S, depth d, selected-source snapshot)
```

The TypeScript engine emits these source stages as named messages (`type`,
`where`, `check`, `default`, or the list-selection mode) on intermediate step
events. Rejected candidates remain inspectable; the source exit contains the
selected bindings. Target logs and nested calls likewise keep the target scope
open around their intermediate events. Simple source/target evaluations become
one final-state step. This describes a common compaction policy, not a requirement
that engines have identical internal evaluation order or event counts.

### Web test page

The FML test page feeds local TypeScript and remote engine responses through the
same shared trace parser used by the extension. It retains structured events,
messages, variable snapshots, exceptions, and completeness without engine-specific
response conversion. JSON results use the tab-stop setting; JSON returned as text
or Binary preserves numeric precision, and XML/text results remain unchanged.

The page identifies its submitted map as `map.fml` (including the filename
extension on the outgoing map parameter). Source navigation uses supplied
coordinates or `expressionPosition` against that submitted source, not guesses
from message text. Canonical source identifiers and legacy cursor extensions are
also supported. Events from unavailable imported maps remain inspectable but
cannot navigate to the active map, and editing the map disables navigation for
the old recording until it is rerun. Non-2xx Parameters responses retain their
trace and report the HTTP failure; standalone OperationOutcomes use the same
response path.

### Legacy trace events

The following older representation and extensions remain supported for engines that have not migrated.

```json
{
  "name": "trace",
  "valueString": "execution",
  "part": [
    {"name": "debug", "valueString": "Group : Main", "extension": []},
    {"name": "debug", "valueString": "  rule : copy-id", "extension": []}
  ]
}
```

| Field | Meaning |
| --- | --- |
| `trace.valueString` | Optional trace stream or group name. |
| `trace.part.name` | Category, commonly `debug`, `info`, `warning`, `error`, or `exception`. |
| `trace.part.value[x]` | Human-readable message. `valueString` is preferred. |
| `trace.part.extension` | Source cursor or semantic location, variables, and optional state. |

Parts MUST be in execution order. `error` and `exception` categories are debugger exceptions in the VS Code client.

For legacy recordings only, the replay client infers call depth from `Group`/`rule` message text and indentation when explicit extensions are absent.

## Legacy trace extensions

The remaining implementation descriptions and design proposals below are historical context for legacy engines. Where they differ from the structured request and response contract above, the structured contract takes precedence. Both clients now share trace parsing and source-location indexing.

### Source cursor

```text
http://fhirpath-lab.com/StructureDefinition/Cursor
```

```json
{
  "url": "http://fhirpath-lab.com/StructureDefinition/Cursor",
  "valueString": "30 - 44"
}
```

Offsets are zero-based UTF-16 offsets into the raw FML. Start is inclusive and end is exclusive, so length is `end - start`. Clients use this range for highlighting, stack frames, and breakpoint verification.

The cursor value does not identify its owning map. An imported-map trace part SHOULD also carry `http://hl7.org/fhir/StructureDefinition/operationoutcome-file`; without that filename, clients must treat the cursor as belonging to the primary map.

### Trace location

```text
http://fhirpath-lab.com/StructureDefinition/TraceLocation
```

```json
{
  "url": "http://fhirpath-lab.com/StructureDefinition/TraceLocation",
  "valueString": "StructureMap.group[1].rule[2].target[0]"
}
```

The value is a simplified, absolute FHIRPath rooted at `StructureMap`. Array indexes refer to the corresponding elements in the parsed StructureMap resource. The VS Code client resolves indexed `group`, `input`, `rule`, `source`, `target`, target `parameter`, `dependent`, and nested `rule` paths to their original FML source ranges.

Servers SHOULD return both `Cursor` and `TraceLocation` when available. `Cursor` remains authoritative for exact editor highlighting, while `TraceLocation` provides a stable semantic identity independent of whitespace. When only `TraceLocation` is present, clients can parse the original FML and derive a cursor. When only `Cursor` is present, clients can attach a location when the source span maps unambiguously to one StructureMap element.

For an event from an imported map, the trace part SHOULD also carry the map filename using `http://hl7.org/fhir/StructureDefinition/operationoutcome-file`. A trace location is relative to that StructureMap and does not identify the owning map by itself.

### Variables

```text
http://fhirpath-lab.com/StructureDefinition/Variable
```

```json
{
  "url": "http://fhirpath-lab.com/StructureDefinition/Variable",
  "extension": [
    {"url": "name-INPUT", "valueString": "src"},
    {"url": "path", "valueString": "Patient.name[0]"},
    {"url": "datatype", "valueString": "FHIR.HumanName"},
    {
      "url": "http://fhir.forms-lab.com/StructureDefinition/json-value",
      "valueString": "{\"family\":\"Smith\"}"
    }
  ]
}
```

Recognized nested extensions are:

| URL | Description |
| --- | --- |
| `name-INPUT` | Variable name and input mode. |
| `name-OUTPUT` | Variable name and output mode. |
| `name-SHARED` | Variable name and shared mode. |
| `path` | FHIRPath expression or simple path locating the value. |
| `datatype` | Type such as `FHIR.Patient`, `FHIR.HumanName[]`, or `canonical|LogicalType`. |
| `error` | Nonfatal error encountered while obtaining the variable. |
| `http://fhir.forms-lab.com/StructureDefinition/json-value` | Explicit JSON value or typed envelope. |

A variable SHOULD include explicit JSON data. For compatibility, VS Code evaluates a path-only `INPUT` or `SHARED` variable against the initial input. It cannot reconstruct path-only output variables from the input. Explicit data takes precedence, and invalid paths become nonfatal variable errors.

### Event state

The JSON-value extension may appear directly on a trace event. Its `valueString` contains the complete debugger state after that event. VS Code uses the most recent prior event state as state before the current event; before the first snapshot it uses the input resource.

Servers SHOULD return snapshots frequently enough for deterministic forward and reverse stepping. Complete snapshots are currently preferred because no delta format is defined.

## Typed values

Results, event states, and variable data may be plain JSON or this typed envelope:

```json
{
  "value": {"customField": "ABC"},
  "types": {
    "$": {
      "name": "MyLogicalPatient",
      "namespace": "http://example.org/StructureDefinition"
    },
    "$.customField": {"name": "MyCustomCode"}
  }
}
```

Type paths are rooted at `$`. Object properties use dot notation, array items use `[index]`, and unusual property names use JSON bracket notation.

| Property | Description |
| --- | --- |
| `name` | Required FHIR, logical, custom, or primitive type name. |
| `namespace` | Optional `FHIR` or custom canonical namespace. |
| `collection` | Optional `true` when the value is a collection. |

VS Code generates fallback types from `resourceType`, JSON kinds, objects, and arrays. Engine metadata overrides those fallbacks and is required for accurate logical-model and custom-datatype display.

## Compact response example

```json
{
  "resourceType": "Parameters",
  "parameter": [
    {
      "name": "parameters",
      "part": [{"name": "evaluator", "valueString": ".NET FML engine 1.2.3"}]
    },
    {
      "name": "result",
      "valueString": "{\"resourceType\":\"Patient\",\"id\":\"example\"}"
    },
    {
      "name": "trace",
      "part": [
        {
          "name": "debug",
          "valueString": "Group : Main",
          "extension": [
            {
              "url": "http://fhirpath-lab.com/StructureDefinition/Cursor",
              "valueString": "0 - 120"
            },
            {
              "url": "http://fhirpath-lab.com/StructureDefinition/Variable",
              "extension": [
                {"url": "name-INPUT", "valueString": "src"},
                {"url": "path", "valueString": "Patient"},
                {"url": "datatype", "valueString": "FHIR.Patient"}
              ]
            }
          ]
        },
        {
          "name": "debug",
          "valueString": "  rule : copy-id",
          "extension": [
            {
              "url": "http://fhirpath-lab.com/StructureDefinition/Cursor",
              "valueString": "78 - 95"
            },
            {
              "url": "http://fhirpath-lab.com/StructureDefinition/TraceLocation",
              "valueString": "StructureMap.group[0].rule[0].source[0]"
            },
            {
              "url": "http://fhir.forms-lab.com/StructureDefinition/json-value",
              "valueString": "{\"resourceType\":\"Patient\",\"id\":\"example\"}"
            }
          ]
        }
      ]
    }
  ]
}
```

## Errors and diagnostics

A server can report failure as:

1. non-`2xx` HTTP, preferably with an OperationOutcome body;
2. a top-level OperationOutcome when no normal response can be produced;
3. an `outcome.resource` within Parameters for diagnostics or partial execution; or
4. an `error` or `exception` trace event during traced execution.

For fatal/error issues, clients use `issue.details.text` first and `issue.diagnostics` second as the exception message. VS Code synthesizes an exception event from an error outcome when no trace was returned.

Issues SHOULD:

- identify the map with the same `operationoutcome-file` value supplied in the request;
- include 1-based source positions when available using
  `http://hl7.org/fhir/StructureDefinition/operationoutcome-issue-line` and
  `http://hl7.org/fhir/StructureDefinition/operationoutcome-issue-col` integer extensions;
- use normal `issue.expression` for the relevant StructureMap/FHIRPath path;
- include StructureMap canonical, group, and rule names where available; and
- distinguish parse, link, model-resolution, and execution errors.

Servers should return all useful issues and must not expose sensitive server paths, credentials, headers, or deployment stack traces. The VS Code client lists every issue in the Debug Console and, when no trace is returned, exposes each fatal/error issue as a debugger stop at the nearest FML token.

## Client implementation notes

### FHIRPath Lab `FML.vue`

The original web client is intended for educational and interactive testing.

It currently:

- sends one `map.valueString` without a filename;
- optionally sends one `model.valueString` from the Models tab;
- sends the input as `resource.valueString`;
- selects the .NET, HAPI, Matchbox, or MaLaC-HD endpoint;
- displays evaluator, result, trace, outcome, and variables;
- uses cursor offsets when present and message-based group/rule lookup as fallback; and
- provides basic forward/back navigation over the returned trace.

It does not assemble imported maps or workspace/package dependencies. It is the compatibility baseline for simple calls, not the complete replay contract.

### VS Code replay debugger

The VS Code extension is the most complete client implementation. Before execution it:

- walks imports recursively and sends each map as FML `map.valueString` with a stable filename;
- discovers StructureDefinitions from `uses` and ConceptMaps from `translate`;
- resolves resources from launch globs, SUSHI `output`, and package cache indexes;
- omits core HL7 StructureDefinitions supplied by the engine;
- selects version-compatible resources from launch, FML, or SUSHI versions; and
- sends resolved resources in a collection Bundle under singular `model`.

After execution it:

- parses the full trace before opening the debug session;
- implements step in/over/out, continue, step back, and reverse continue locally;
- verifies breakpoints from cursor-derived lines;
- exposes event variables, state-before-event, result, and trace metadata; and
- evaluates watches against replayed typed JSON state.

Plain JSON remains compatible, but explicit snapshots and typed envelopes produce much better replay behavior.

## Internal trace model design

The wire format and the executor's internal trace model are separate concerns. The executor should first capture a stable, engine-independent trace model. A boundary serializer can then emit the current FHIR `Parameters.part` representation. A future JSON serializer can use the same internal model without changing execution instrumentation.

```text
.NET/Java/Python executor
  -> internal DebugTrace model
    -> Parameters trace serializer (current protocol)
    -> JSON trace serializer (possible future protocol)
```

The internal model should not depend on FHIR `Parameters`, extensions, or a specific FHIR SDK.

### Current .NET internal model

The current .NET executor is a port of the Java StructureMap executor. Its trace model is effectively:

```csharp
List<KeyValuePair<string, LogMessage>> LogMessages;

public record LogMessage
{
  public string message;
  public Variables vars;
  public DebugAnnotation debugAnnotation;
}

public class DebugAnnotation
{
  public int StartCursor { get; }
  public int EndCursor { get; }
  public SourceLocation StartLoc { get; }
  public SourceLocation EndLoc { get; }
}

public class Variable
{
  public VariableMode Mode { get; }
  public string Name { get; }
  public IEnumerable<ITypedElement> getObject();
}

public class Variables
{
  private Variables parent;
  private List<Variable> list;
  public IEnumerable<Variable> All();
}
```

This is assembled as follows:

1. `StructureMapUtilitiesExecute` calls `services.log(category, Func<LogMessage>)` at transform, group, rule, condition, user-log, and selected target-transform boundaries.
2. `LogMessage` stores message text, the supplied `Variables` object, and a `DebugAnnotation` copied from the annotated StructureMap element.
3. `InlineServices` appends the category and LogMessage to `LogMessages` when debug mode is enabled, or for errors.
4. After execution, `StructureMapService` walks `LogMessages` and translates each entry into a `trace.part`, cursor extension, and variable extensions.

The current model has several important characteristics:

- category and message text carry most event semantics;
- call depth is represented by indentation rather than a field;
- group/rule/transform identity is only indirectly available through the annotated FHIR element;
- the annotation contains offsets but not the owning map identity;
- `Variables` can refer to a parent scope;
- `LogMessage.vars` is a live object reference, not an immutable event snapshot;
- variable values are converted to wire data only after execution; and
- target `ElementNode` values can continue to mutate after a LogMessage is created.

Consequently, delayed serialization can observe a later value than the value that existed when the event occurred. A shallow copy of `Variables` is not sufficient because its Variable objects still reference mutable typed elements.

### Value capture policy

The proposed model should distinguish immutable source references from mutable execution values.

| Value origin | Capture policy | Reason |
| --- | --- | --- |
| Input/source value from the original request resource | Path reference is sufficient; an optional preview may be included | The request input is immutable for the duration of execution and can be resolved again during replay. |
| Literal or primitive value | Capture inline | It is small and immutable. |
| Target/output value | Snapshot at event creation | The target tree is mutated throughout execution, so a path resolved later may produce a different value. |
| Shared variable backed by target state | Snapshot at event creation | It may be reused and mutated by later rules. |
| Created/intermediate value | Snapshot at event creation | It may not have a stable root path and may later be attached, changed, or discarded. |
| Search/reference result external to the immutable request input | Snapshot by default | Its lifetime and mutability are not controlled by the replay client. |

A source path should identify both the immutable source root and its FHIRPath/simple path. Path-only source values are therefore not a degraded form. For target and intermediate values, a path may still be recorded for navigation, but it MUST NOT replace the event-time snapshot.

This policy also avoids unnecessarily duplicating large source subtrees in every trace event while preserving historical target state accurately.

### Proposed replay-grade model

The following C# records illustrate the proposed logical model. Names and exact CLR types may change during implementation, but the semantics should remain stable.

```csharp
public sealed record DebugTrace(
  string SchemaVersion,
  DebugTraceEngine Engine,
  IReadOnlyList<DebugTraceMap> Maps,
  DebugValue InitialInput,
  IReadOnlyList<DebugTraceEvent> Events,
  DebugValue? Result,
  IReadOnlyList<DebugDiagnostic> Diagnostics,
  DebugTraceCompletion Completion);

public sealed record DebugTraceEngine(
  string Name,
  string? Version,
  IReadOnlySet<string> Capabilities);

public sealed record DebugTraceMap(
  string Id,
  string? Canonical,
  string? Version,
  string? FileName,
  DebugMapRepresentation Representation);

public sealed record DebugTraceEvent(
  long Sequence,
  string Id,
  DebugEventKind Kind,
  DebugEventPhase Phase,
  string Category,
  string Message,
  string? ParentEventId,
  int Depth,
  DebugSourceLocation? Source,
  DebugExecutionIdentity? Execution,
  IReadOnlyList<DebugVariableSnapshot> Variables,
  DebugValue? StateAfter,
  DebugDiagnostic? Exception,
  bool IsDebuggerStop);

public sealed record DebugSourceLocation(
  string MapId,
  int StartOffset,
  int EndOffset,
  int? StartLine,
  int? StartColumn,
  int? EndLine,
  int? EndColumn,
  string? StructureMapPath);

public sealed record DebugExecutionIdentity(
  string? GroupName,
  string? RuleName,
  int? RuleIteration,
  string? Transform,
  string? Expression);

public sealed record DebugVariableSnapshot(
  string Name,
  DebugVariableMode Mode,
  DebugValueOrigin Origin,
  DebugValueReference Value,
  string? DeclaredType,
  string? Error);

public abstract record DebugValueReference;

public sealed record DebugSourcePathReference(
  string RootId,
  string Path,
  DebugType? Type,
  DebugValue? Preview = null) : DebugValueReference;

public sealed record DebugCapturedValue(
  DebugValue Snapshot,
  string? NavigationPath = null) : DebugValueReference;

public sealed record DebugValue(
  object? Value,
  IReadOnlyDictionary<string, DebugType> Types);

public sealed record DebugType(
  string Name,
  string? Namespace,
  bool Collection = false);

public sealed record DebugDiagnostic(
  string Severity,
  string Code,
  string Message,
  DebugSourceLocation? Source,
  string? Details);

public sealed record DebugTraceCompletion(
  bool Completed,
  bool Truncated,
  string? Reason,
  long? TotalEvents);
```

Suggested event kinds include:

```text
transform, group, rule, source, condition, check, log,
target, transform-operation, dependent-call, warning, exception
```

`Phase` should distinguish at least `enter`, `evaluation`, `exit`, and `instant`. Explicit phases remove ambiguity about whether variables and `StateAfter` belong before or after an operation.

### Model invariants

The internal model should enforce these rules:

1. `Sequence` is monotonically increasing and defines replay order.
2. Event IDs are unique within one trace.
3. `ParentEventId` and `Depth` describe the execution stack without parsing message text.
4. Every source-bound event includes `MapId`; offsets are interpreted only against that map's submitted source.
5. `StartOffset` is inclusive and `EndOffset` is exclusive.
6. Variables are immutable event-time records.
7. Source values may use `DebugSourcePathReference` only when rooted in an immutable input captured by the trace.
8. Output, shared-target, and intermediate values use `DebugCapturedValue`; a navigation path is supplemental.
9. `StateAfter`, when present, is the complete state after the event. State deltas require a later schema version or explicit capability.
10. Exceptions are structured diagnostics in addition to human-readable messages.
11. Truncation and incomplete execution are explicit in `Completion`.

### Changes needed in the .NET executor

Most instrumentation belongs in `StructureMapUtilitiesExecute`, not in `StructureMapService`, because the executor knows the current map, group, rule, operation, stack, and timing.

The likely implementation steps are:

1. Replace or supplement the two `log` overloads with a structured trace sink, for example `ITraceSink.Record(DebugTraceEventBuilder event)`.
2. Carry an execution frame through `transform`, `executeGroup`, `executeRule`, `processSource`, `processTarget`, and `runTransform` containing map ID, parent event, depth, group, rule, and iteration.
3. Assign each submitted or repository-resolved StructureMap a stable `DebugTraceMap.Id` before execution.
4. Convert `DebugAnnotation` to `DebugSourceLocation` at event creation while the owning map is known.
5. Materialize variable records at event creation. Keep immutable input variables as root/path references; serialize mutable target, shared, and intermediate values immediately.
6. Capture explicit enter/exit or operation events rather than inferring them from indentation.
7. Record exceptions at the executor boundary where map/group/rule/source context is still available, then rethrow or return according to existing engine behavior.
8. Keep human-readable messages so existing logs remain useful.

The trace sink can expose a disabled implementation so non-debug execution avoids message formatting and value serialization costs, preserving the current lazy logging behavior.

### Parameters serialization

The first implementation can continue emitting the current wire format:

```text
DebugTraceEvent.Category          -> trace.part.name
DebugTraceEvent.Message           -> trace.part.valueString
DebugSourceLocation offsets       -> Cursor extension
DebugVariableSnapshot             -> Variable extensions
DebugValue                        -> JSON-value extension or supported value[x]
DebugTrace.Engine                 -> parameters/evaluator
DebugTrace.Result                 -> result
DebugTrace.Diagnostics            -> outcome
```

Fields not representable by the current parts format, such as map ID, event ID, kind, phase, parent, and explicit depth, should receive dedicated extensions before clients rely on them. They should not be encoded into message text.

The Parameters serializer and parser should have round-trip fixture tests:

```text
DebugTrace -> Parameters -> DebugTrace
```

Losses caused by legacy responses should be explicit defaults in the parser. A future JSON serializer can then emit the same DebugTrace model directly rather than defining another execution model.

## Server implementation notes

### .NET

Key Operation source code:
https://github.com/brianpos/fhir-net-mappinglanguage/blob/main/demo-map-server/Services/StructureMapService.cs#L77

The .NET engine is currently the reference server for the richer VS Code trace. It is a port of the Java mapping engine with additional trace logging. It accepts FML strings and StructureMap resources in repeated `map` parameters, a repository `source` canonical when no map is supplied, and instance-level `StructureMap/{id}/$transform` invocation.

It should preserve repeated maps/models, associate errors with map filenames, return offsets against the exact submitted text, emit deterministic state and variables, identify its evaluator/version, and preserve logical/profile type metadata.

Enhancements should be documented before clients depend on them, then ported or explicitly marked unsupported by Java and Python engines.

### HAPI Java

Key Operation source code:
https://github.com/brianpos/fhirpath-lab-java2/blob/main/src/main/java/com/fhirpathlab/FmlTransformController.java#L76

HAPI is the original server-side FML implementation. It should accept the common request shape even when some replay fields are unavailable.

Priorities are repeated maps in FML-string or StructureMap-resource form with canonical import linking, singular repeated `model` in string/resource forms, filename-attributed outcomes, and trace ordering/cursors/variables/exceptions aligned with .NET. Missing optional fields should be omitted rather than represented by incompatible extensions.

### Matchbox Java

Repository: https://github.com/ahdis/matchbox

Matchbox is a production-oriented fork of the Java engine. Its debugger API should remain wire-compatible with HAPI and .NET even where internal representations differ. Deployment/package diagnostics may use OperationOutcome, while common trace data should use this contract.

### MaLaC-HD Python

Repository: https://gitlab.com/cdehealth/malac-hd

MaLaC-HD is a greenfield Python implementation. Mapping requests are supported, but replay-grade tracing is not currently assumed.

An incremental implementation can add:

1. common request parsing and evaluator metadata;
2. ordered group/rule messages;
3. cursor ranges and exception events;
4. variables with explicit values; and
5. snapshots and typed envelopes.

A result without trace remains useful to the web client, but VS Code replay terminates immediately when no trace events are returned.

## Compatibility levels

| Level | Required behavior |
| --- | --- |
| Execute | One FML or StructureMap primary map, optional model, input, and result or outcome. |
| Trace | Ordered group/rule messages and evaluator metadata. |
| Source debug | Accurate cursor ranges and source-attributed errors. |
| Variable debug | Variable modes, paths, values, datatypes, and errors. |
| Replay debug | Deterministic snapshots, typed values, exceptions, and enough event structure for forward/reverse replay. |
| Multi-map replay | Owning map on every source-bound event, with imported-map breakpoints and frames. Requires a future enhancement. |

Engines SHOULD publish their supported level and omitted optional fields.

## Future API enhancements

These are proposals and require agreement across clients and servers.

### Protocol version and capabilities

Add version/capability metadata so clients can detect multi-map cursors, explicit event structure, snapshots/deltas, typed values, translated maps, and variable values.

### Map identity on trace events

Add the request filename and optionally StructureMap canonical to every source-bound event and relevant outcome. This is required for imported-map stack frames, breakpoints, and unambiguous cursors.

### Explicit event structure

Replace message inference with machine-readable sequence, event kind, parent/depth, group/rule identity, and whether an event is a debugger stop. Keep human messages for logs and old clients.

### Defined state semantics

Standardize before/after ownership and snapshot versus delta. Current VS Code treats event state as after-event state and the prior snapshot as state before the next event. Any delta format must define ordering, deletion, arrays, types, and deterministic reversal.

### Standardized typed values

Define a schema for the current typed envelope, path grammar, profile representation, primitives, collections, and relationship to FHIR `value[x]`.

### Translated maps

Define the response parameter name, cardinality, FHIR version, source map identity, and purpose for translated StructureMaps or engine AST output. Current clients ignore unrecognized translated-map parameters.

### Partial traces and limits

Define truncation, maximum payload, timeout, cancellation, and partial-result behavior. A truncated trace must state why it ended and whether result/final state are complete.

### Shared conformance fixtures

Maintain fixtures for imports, parse/link/model/execution errors, profiles and logical models, nested groups/rules, all variable modes, custom types, partial traces, and cross-version maps. Run applicable fixtures against .NET, HAPI, Matchbox, MaLaC-HD, the web parser, and the VS Code debug service.