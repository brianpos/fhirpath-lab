# FML Debugger API

## Status and scope

FHIRPath Lab extends the FHIR `StructureMap/$transform` operation so a client can submit raw FHIR Mapping Language (FML), execute it remotely, and receive a trace for display or debugger replay.

This document describes the protocol currently used by the FHIRPath Lab web client and VS Code extension, the behavior expected from server implementations, and proposed enhancements for richer replay debugging. The API is an experimental FHIRPath Lab convention, not a standard part of FHIR `$transform`. Parameter names and extension URLs are case-sensitive.

In this document, **MUST**, **SHOULD**, and **MAY** describe the current interoperable contract. Items under [Future API enhancements](#future-api-enhancements) are proposals, not current requirements.

## Interaction overview

1. The client resolves the primary map, imported maps, input resource, and model dependencies.
2. It posts a FHIR `Parameters` resource to `$transform`, normally with `debug=true` in the URL.
3. The server links the maps and models, executes the transformation, and records trace events in execution order.
4. The server returns `Parameters` containing the result, evaluator identity, trace, and optional `OperationOutcome`.
5. A simple client displays the trace. A replay debugger stores it and implements stepping, breakpoints, stack frames, variables, and watches locally.

The `debug=true` is used to inform the server that the client is expecting a trace and should return as much information as possible. A server MAY ignore this parameter and return a normal `$transform` result without a trace. A client MUST be prepared to handle a response without trace events. This way in production services the additional overhead of trace generation can be avoided.

Reverse stepping does not call the server again or require reverse execution. It depends on an ordered trace containing enough source, state, variable, and type information to reconstruct each stop.

## Request

```http
POST /StructureMap/$transform?debug=true
Accept: application/fhir+json
Content-Type: application/fhir+json
```

The body is a FHIR `Parameters` resource.

### Parameters

| Name | Cardinality | Representation | Description |
| --- | ---: | --- | --- |
| `map` | `0..*` | `valueString` or `resource` | Raw FML or a StructureMap resource. The first occurrence is the primary map; later occurrences are available for imports. Required for a type-level operation unless `source` is supplied. |
| `source` | `0..1` | `valueCanonical` | Canonical URL, optionally versioned, of a StructureMap already available to the server. Used only when no `map` is supplied. |
| `model` | `0..*` | `valueString` or `resource` | Model resources required to parse or execute the maps. The name is singular even when the value is a Bundle. |
| `resource` | `1..1` | `valueString` | Input resource encoded as JSON text. A string avoids coupling the outer Parameters version to the input FHIR version, and also custom resources (tied to a logical model) |

FHIR permits repeated parameters. A client may therefore send both an explicit `model.valueString` and another `model.resource` containing a collection Bundle.

### Maps and filenames

Each `map` contains either one complete FML document in `valueString` or one parsed StructureMap in `resource`. Forms may be mixed in the same request. With multiple maps, the server SHOULD resolve `imports` by canonical URL rather than parameter order.

The .NET server currently supports three ways to select the primary map:

1. `POST [base]/StructureMap/$transform` with one or more `map` parameters. The first is primary.
2. `POST [base]/StructureMap/$transform` with no `map` and a `source` canonical resolved from the server repository.
3. `POST [base]/StructureMap/{id}/$transform`, where the addressed StructureMap resource is inserted as the primary map and request `map` parameters remain available as supporting imports.

For `map.valueString`, the server parses FML into a StructureMap before linking. For `map.resource`, the resource MUST be a StructureMap. An unsupported first-map representation produces an error. All successfully parsed or supplied StructureMaps are registered together for canonical import resolution.

Each request-supplied map SHOULD carry its diagnostic filename using:

```text
http://hl7.org/fhir/StructureDefinition/operationoutcome-file
```

```json
{
  "name": "map",
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
  "name": "map",
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
      "name": "map",
      "valueString": "/// url = 'http://example.org/StructureMap/Main'\nimports 'http://example.org/StructureMap/Shared'\ngroup Main(source src, target tgt) { src -> tgt then Shared(src, tgt); }",
      "extension": [{
        "url": "http://hl7.org/fhir/StructureDefinition/operationoutcome-file",
        "valueString": "main.fml"
      }]
    },
    {
      "name": "map",
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
      "name": "resource",
      "valueString": "{\"resourceType\":\"Patient\",\"id\":\"example\"}"
    }
  ]
}
```

## Response

A successful execution returns HTTP `2xx` with a FHIR `Parameters` resource.

| Name | Cardinality | Representation | Description |
| --- | ---: | --- | --- |
| `parameters` | `0..1` | `part` | Metadata. The recognized `evaluator` part identifies the engine and version. |
| `result` | `0..1` | `value[x]`, `resource`, or JSON-value extension | Transformation result. JSON in `valueString` is supported for cross-version compatibility. |
| `trace` | `0..*` | `part` | Ordered execution events. Parts are processed in response order. |
| `outcome` | `0..1` | `resource` | OperationOutcome containing nonfatal or execution diagnostics. |

Unknown response parameters are ignored by the current replay client. A server MAY return translated StructureMaps or engine diagnostics, but their shape is not standardized and clients must not depend on them for replay.

Evaluator metadata is represented as:

```json
{
  "name": "parameters",
  "part": [{"name": "evaluator", "valueString": ".NET FML engine 1.2.3"}]
}
```

### Trace events

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
| `trace.part.extension` | Source cursor, variables, and optional state. |

Parts MUST be in execution order. `error` and `exception` categories are debugger exceptions in the VS Code client.

The current replay client infers call depth from `Group`/`rule` message text and indentation. Servers should preserve that format until explicit event kind and depth fields are introduced.

## Trace extensions

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

The current cursor does not identify its owning map. VS Code can therefore map primary-source cursors reliably, but imported-map frames and breakpoints remain ambiguous. This is a priority protocol enhancement.

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
- include a source range when available;
- use normal `issue.expression` for the relevant StructureMap/FHIRPath path;
- include StructureMap canonical, group, and rule names where available; and
- distinguish parse, link, model-resolution, and execution errors.

Servers should return all useful issues and must not expose sensitive server paths, credentials, headers, or deployment stack traces.

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