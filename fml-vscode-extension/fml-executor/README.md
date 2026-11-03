# Internal FML executor

Private, browser-safe execution facade shared by the Lab and VS Code.
**All six implementation phases are complete**, including trace-invariant tests
and a reproducible performance review. Reviewed fixture skips and open issues
remain for later review; this is not a blanket conformance claim for a changing
CI specification.

## Build and checks

Node 20 or newer and npm are required. From the repository root:

```powershell
npm --prefix .\fml-vscode-extension\fml-validator run build
npm --prefix .\fml-vscode-extension\fml-executor install
npm --prefix .\fml-vscode-extension\fml-executor run check-types
npm --prefix .\fml-vscode-extension\fml-executor test
```

The validator must be built before consuming its local package exports. Builds
produce typed CommonJS/ESM executor entries and a separate Node-only `./testing`
entry. The test suite bundles the public entry for a browser with no filesystem
or VS Code dependencies. Import `@fhirpath-lab/fml-executor` from either consumer;
never import `./testing` into the browser or editor execution core.

## Current API and boundaries

- `analyzeLabFml(source)` reuses `CoreFmlParser.analyze()` and its existing strict
  parsing, validation, model configuration and property analysis in one pipeline.
  Explicit model configuration is retained; canonical-derived releases take
  precedence over the supplied default, with R4 as the final fallback.
- `FmlExecutor.prepare(source)` strictly parses and links the selected map and
  imports and reuses the Lab's analysis. Semantic errors in imported maps are
  retained as warnings so unused imported bodies do not block execution; other
  semantic errors in the primary map remain fatal. Reference target-profile
  narrowing is advisory in both cases. Primary groups are bound eagerly;
  imported groups are bound when invoked, retaining runtime validation.
  Binding covers ordered transform arguments, property lookup caches and
  statically typed FHIRPath expressions. Unsupported features return
  `not-implemented` with diagnostics rather than executing a partial interpretation.
- `FmlExecutor.execute(request, options)` executes only the selected/default
  entry group, with fresh lexical frames and mutable caller-owned targets.
  Success returns the target bindings; failure has no successful-output field.
- Preparation/execution contracts are provisional internal APIs, distinct from
  the existing StructureMap `compile()` API. Binding values are opaque to the
  public facade; internal nodes retain model/release and primitive metadata.
- Requests allow multiple named sources/targets and an explicit entry group.
  Failure can leave earlier writes in place; no rollback is
  promised and partial targets must not be reported as successful output.
- Source matches expand depth-first as Cartesian combinations. Later sources
  see earlier aliases; target aliases refer to attached target objects. Dependent
  local group calls and rules use lexical frames rather than shared dictionaries.
- Source type/cardinality/default/where/check/log/list qualifiers, dependent
  groups, inheritance, `types`/`type+`, lazy map-local constants, inline ConceptMaps,
  batch identity and shared/list targets are implemented.
- The shared transform catalog has executable success cases for every
  signature, including optional arguments, named argument ordering, factories,
  temporal parsing, references and compatible casts. See the cast policy below.
- Cancellation is cooperative at execution boundaries and asynchronous evaluator
  calls. Pending host promises can be abandoned on cancellation even if the host
  ignores the signal. This does not forcibly stop a synchronous evaluator or
  undo external host side effects; no hard wall-clock timeout is claimed.
- `FmlTraceRecorder` captures bounded event-time snapshots through an optional
  per-invocation observer. Inactive/exhausted capture skips payload enumeration.
  Frame views are ephemeral; stopped traces do not fabricate unwind exits.
- `parseFmlJson` / `stringifyFmlJson` preserve numeric tokens using `lossless-json`.
  Numeric literals bind from their original source spans, not already-coerced
  parser numbers. Pass objects already parsed with native `JSON.parse` only if
  their earlier numeric precision loss is acceptable to the caller.

The browser offers **JavaScript (local)**. VS Code uses the bundled local engine
by default, so an FML launch configuration needs no engine setting or executable
path. A non-empty launch `serverUrl` or `fmlTools.debug.serverUrl` setting selects
remote execution. The launch value takes precedence; an empty launch URL selects
local execution even when a remote URL is set in settings. No remote URL is
configured by default and remote execution is never used as a silent fallback.
Both consumers currently accept one JSON source/target root; use explicit
executor bindings for multiple roots. XML input remains remote-only.

Preparation accepts `maps` and an optional asynchronous `loadMaps(pattern,
definingSource, signal)` provider. `prepare(source, {signal})` can cancel a pending
loader even when the provider ignores cancellation. Imports support wildcards and version-qualified
canonicals; ambiguous definitions fail instead of selecting an arbitrary match.
Imported groups retain their own imports, constants, ConceptMaps and source identity.
Import syntax errors, missing maps, ambiguous links and actual execution errors
remain fatal; warnings do not repair or silently skip an invoked invalid rule.

FHIRPath expressions use parsed, lexically bound mapping references: bare
`n.family` and `%n.family` bind the declared `n`, while literal text and unrelated
member/function names remain unchanged. The adapter lowers references to evaluator
variables; it does not choose the current element by inspecting expression text.
Mapping names overlapping evaluator globals use private slots so names such as
`context` and `factory` cannot accidentally resolve to a different value.
Transform arguments may be FHIRPath expressions as well as identifiers/literals.
`evaluate(context, expression)` supplies its explicit context; quoted expression
arguments remain FHIRPath string literals rather than being evaluated twice.
Within FML, `extension(url)` is the value shortcut
`extension.where(url = urlArgument).value`, preserving order, choice types and
primitive metadata. Extensions without values contribute no result. The generic
FHIRPath validator/runtime retain their existing Extension-container semantics;
the value projection is enabled only for FML.

FML source `:type` constraints match the exact FHIR instance type after resolving
declared aliases and their releases. A `code` does not also match `:string`,
and a `positiveInt` does not also match `:integer`. Group input compatibility
remains inheritance-aware; FHIRPath type-test semantics are unchanged.

Runtime model identity follows the validator's dictionary keys and the selected
FHIR release. `uses` aliases select canonical logical models directly; display
`TypeName` values are not automatically registered as global aliases. Thus core
FHIR `Observation` and an OMOP logical model also named `Observation` coexist.
FHIRPath model overlays use the same keys, retaining identity through child
properties, expressions and dependent/imported group arguments. Logical inline
children and logical base definitions use canonical references as well; only
unambiguous, non-core-colliding synthetic aliases are retained for compatibility.
This is not a core-first lookup policy: a map explicitly targeting the logical
canonical still creates and populates that logical model.

Runtime property lookup reuses the Lab's generated/custom models, including
cross-version identities. STU3/R4/R5 use the selected evaluator's contexts;
R4B/R6 and logical-model contexts can be built from the same Lab dictionaries,
not a separate model catalog. Explicitly supplied `fhirPathModels` remain
authoritative, including when custom model metadata is present. The R4B adapter
uses the library's R4 dialect tag with R4B property/type data; binding and cache
identities still retain R4B. DSTU2 runtime lookup remains unsupported.

Implicit/default-mapping targets are allocated using their resolved model type
and release. Those concrete types are not reinterpreted as map-local aliases:
an R4 source alias named `Meta` must not change a selected STU3 Meta target back
to R4. Only the explicit `create('alias')` transform resolves declared aliases.
Unconverted cross-version objects are still rejected by the writer.

An untransformed target alias can also allocate an empty primitive when its
property has one unambiguous type. For example, `tgt.reference as r` creates a
target-release FHIR string element whose value can subsequently be set through
`r.value`; explicit `create('string')` is unnecessary. The alias denotes the
writable element, not a copied source scalar. Primitive metadata and repeating
array slots use the same update mechanism as explicit creation. Ambiguous
choices still require a concrete choice name or an explicit creation type.
This intentionally follows the reference engines and the agreed interpretation,
despite the CI FML prose's blanket prohibition on auto-created primitives; that
specification clarification remains open.

The writer preserves choice names, recursive structures, extension-only
primitives, aligned primitive arrays and primitive aliases. Primitive metadata
also survives mapping-variable evaluation. Integer64 outputs use exact strings
and signed 64-bit bounds; decimal/long literals do not pass through a lossy
JavaScript-number conversion. Native evaluator quantities are explicitly
materialized as Quantity JSON at the evaluation boundary.

The browser/VS Code adapters consume supplied ConceptMap resources locally for
unconditional mappings. An advanced asynchronous `translate` provider can handle
conditional/ValueSet/unmapped policies; unsupported local policies fail explicitly.
`FmlLocalDebugService` accepts these execution services in its second constructor
argument. Core execution also accepts `translate`, `resolve`, `reference`, `uuid`
and `log` services per invocation. `resolve()` propagates errors instead of turning
HTTP failures into empty success; contained references and not-found responses
retain empty-result semantics. Absolute HTTP resolution may perform network I/O;
relative/canonical resolution requires a host service.

### Terminology host example

The exported, browser-compatible `FhirTerminologyService` is a concrete
implementation of the engine's asynchronous `translate` hook:

```ts
import {
  FhirTerminologyService, FmlExecutor, createSingleInputRequest, parseFmlJson,
} from "@fhirpath-lab/fml-executor";

const executor = new FmlExecutor();
const prepared = await executor.prepare({sourceText: fmlText});
if (prepared.status !== "success") {
  throw new Error("FML preparation failed; inspect prepared.diagnostics.");
}
const terminology = new FhirTerminologyService(
  "https://terminology.example.org/fhir", "R4",
);
const controller = new AbortController();
const result = await executor.execute(
  createSingleInputRequest(prepared.value, parseFmlJson(inputJson)),
  {translate: terminology.translate, signal: controller.signal},
);
```

The adapter posts FHIR Parameters to `[base]/ConceptMap/$translate`, passing the
map `url` and optional `conceptMapVersion` from `canonical|version`, plus a
Coding or CodeableConcept. `R4` uses `coding`/`codeableConcept`; `R5` uses
`sourceCoding`/`sourceCodeableConcept`. This version describes the terminology
service contract, not the source/target model versions. Primitive code inputs
are sent as Coding values with a code only, so a service requiring a source
system needs a full Coding/CodeableConcept input.

FHIR `result=false` returns an empty binding collection. Negative equivalence/
relationship matches are excluded; positive matches are shaped as the requested
`code`, `system`, `display`, `Coding`, or `CodeableConcept`. HTTP, OperationOutcome,
malformed-response and cancellation errors propagate to the executor's existing
diagnostic/trace handling. No request or response payload is logged by this
adapter. A third constructor argument can supply a custom `fetch` implementation
for authentication, transport policy, or testing; forward its AbortSignal.

`FmlLocalDebugService` exposes the same integration through
`terminologyServerUrl` and `terminologyFhirVersion` request options. Its selection
order is embedded maps, supplied/discovered ConceptMaps, a custom injected
`translate` hook, then the configured terminology HTTP adapter. Without any
matching map or configured host, the existing missing-map error remains.
Identical resources supplied both by discovery and an explicit model are
deduplicated. Ambiguous maps and unsupported local policies are errors, not a
reason to silently send data to a service.

VS Code supplies ConceptMaps through its existing package/IG-output resource
catalog and explicit model/dependency files (including Bundles). It does not add
a workspace-wide JSON-content scan. Configure
`fmlTools.terminology.serverUrl` and optionally `fmlTools.terminology.fhirVersion`;
debugger launches can override them with `terminologyServerUrl` and
`terminologyFhirVersion`. `#evaluateFml` uses the workspace terminology settings.
Only the selected codes/codings and canonical are sent, never the entire source
resource, but these values may still be sensitive.

### Confirmed interpretation and boundaries

- `share id` survives source matches and sibling rules in the enclosing
  group/dependent-block scope. A called group starts a separate share scope.
- Sequential writes to a scalar replace its previous value. A single
  multi-valued assignment to that scalar still fails; it is never truncated.
- Source cardinality is checked before defaulting/filtering; `where`, `check`
  and `log` precede the source list option. `only_one` means **at most one**,
  so an empty collection is valid.
- Constants are lazy, evaluated once per map per invocation, and cannot
  accidentally capture a caller map's constants or source/target bindings.
- Unix transforms use **milliseconds since the Unix epoch**. Date formats
  support the required numeric, fractional-second (one to three digits),
  AM/PM and numeric-zone forms; partial dates retain their precision.
- Compatible casts work. **Nontrivial cast conversions remain explicitly
  unsupported**, by user decision, until the specification clarifies them.
- Caller-supplied named target bindings are the output roots. Detached
  created aliases are intermediates unless attached to an output. Multiple
  named roots are supported by the core API, not the single-input UI facade.
- StructureMap ingestion/round-trip fidelity remains later adapter work.
  The existing serializer now preserves share labels and orders named transform
  parameters, but richer FML (including constants, inline maps and argument
  expressions) must not be assumed to round-trip through StructureMap.

## Error and ownership contract

[FmlErrors.test.ts](src/test/FmlErrors.test.ts) exercises failures separately
from positive corpus expectations. Failed checks, invalid `only_one`, source
cardinality violations, scalar overflow, missing services/variables/bindings,
wrong argument/value kinds, and asynchronous host rejection return explicit
failure diagnostics without a successful `value`. The engine does not turn an
unresolved variable into a literal or choose the first item of an invalid argument.
Preparation errors retain the existing validator diagnostics.

Entry binding names must be unique, match the selected group's parameter modes,
and agree with prepared type/model identities. Mutable target roots must be
objects, resource types must be compatible, and input/target graphs must be
acyclic and disjoint. Host translation receives a detached copy rather than a
mutable reference into an input. Source-mode arguments stay read-only across
group calls. These checks do not replace full resource/profile validation.

Limits accept only non-negative safe integers:

- `maxDepth` defaults to 128 and bounds group/rule execution nesting.
- `maxWork` defaults to 1,000,000 and bounds checked execution operations,
  including input/target graph inspection; it is not an elapsed-time budget.
- `maxOutputNodes` defaults to 1,000,000 and counts copied value/container nodes
  and copied primitive metadata. A complex copy is checked during traversal,
  before that value is attached.

Earlier target writes remain on failure or cancellation; callers wanting a
transaction must supply private targets and publish them only on success.
Repeated execution of the prepared program starts fresh counters, frames,
service options and target-write tracking.

Tracing errors are explicitly labeled instrumentation failures, not FML check
failures. Completion hooks run once; if completion also fails after a language
error, both diagnostics are retained with the language error first. Recording
limits retain complete-event prefixes and a separate truncation reason. A later
execution failure is retained even after capture has stopped. Abnormal execution
does not synthesize scope-closing events.

The local debug adapter preserves failure trace envelopes without a `return`,
emits located `OperationOutcome` issues, and wraps pre-execution input/model/
entry-selection errors in `FmlDebugEngineError` with an explicit outcome.
The browser and VS Code replay paths cover local failed checks as well as success.

Preparation diagnoses import/group ambiguity, constant cycles and inheritance
cycles. Recursive calls remain bounded at execution. Advanced terminology policies
require the host service described above; absence is an error, not a silent
pass-through or empty success-shaped fallback.

## External corpus

Keep the corpus outside this repository. Configure its location explicitly:

```powershell
$env:FML_CORPUS_ROOT = 'C:\path\to\fml-incubator'
npm --prefix .\fml-vscode-extension\fml-executor run test:corpus
```

The adapter pairs relative filenames/folders between:

- `input\examples\*.fml` or `othermaps\*.fml`;
- `test-input-resources\*.json`;
- `test-output-resources\*.json`.

Subfolders are paired recursively. Duplicate map identities fail discovery.
Numbered output directories and backup files are ignored. Missing/empty
configured corpora fail visibly. Incomplete pairs remain listed as TODOs;
missing expectations are not assumed to mean an expected error.

All complete cases are now exercised and compared using lossless JSON parsing
(object order ignored, arrays and numeric tokens retained). The supplied checkout
has **64 cases: 54 passing transformations, 3 reviewed skips, 7 incomplete**.
Fixture presence/syntax checks and expected unsupported/error tests are not
conformance passes.

The harness injects a fixed UUID for `transform-uuid` and an explicit synthetic
terminology-service fixture for the historical ConceptMap/101 dependency
(AddressUse `home` -> v3-AddressUse `H`, consistent with the published
[AddressUse mapping](https://hl7.org/fhir/cm-address-use-v3.json.html)).
It does not contact reference engines or download terminology during tests.

Reviewed fixture skips:

| Case | Reason / follow-up |
| --- | --- |
| `imports` | Patient input/caller arguments are passed to `SimpleIdentity`, which declares Basic source/target types. Correct the imported group or caller types. |
| `syntax-backticks` | The map declares Basic but accesses nonexistent fields (`group!`, `group#`, `section4.5`, `section4.6`). Its Basic-only expectation hides invalid typed paths. Supply a logical model/input or keep it parse-only. |
| `transform-cc` | The map requires Encounter input, but the supplied input is Basic. Correct the input or source declaration. |

Valid synthetic regressions cover imported maps, quoted logical-model fields
and every CodeableConcept factory form instead of weakening validation.

If a case fails during execution, inspect its map/input/expected output before
deciding whether the engine or the expectation is wrong. Only a specifically
reviewed, suspected-invalid expectation may enter `reviewedFixtureSkips` in
[ExternalCorpus.test.ts](src/test/ExternalCorpus.test.ts), with a nonempty reason
describing the disagreement and the expected correction/open question. Stale
skip IDs and missing reasons fail the inventory. Implementation gaps remain
TODOs/explicit unsupported results, not invalid-fixture skips.

Do not copy private fixtures into package assets or public tests without
permission. Fixture contents are not sent to reference services by this harness.

## R4 -> STU3 resource comparison (test-only)

`npm run test:xver` is an opt-in integration suite modeled on Ignixa's
`FmlXverComparisonTests`. It uses the existing executor without changing or
bypassing parser, validator or runtime behavior:

```powershell
$env:FML_XVER_PATH = 'C:\git\hl7-specs\fhir-cross-version'
$env:FML_XVER_R4_EXAMPLES = 'C:\temp\r4-converted'
$env:FML_XVER_R3_REFERENCE = 'C:\temp\r3-converted'
$env:FML_XVER_R3_OUTPUT = 'C:\temp\new-r3-fhirpath-lab-run'
$env:FML_XVER_REPORT = 'C:\temp\new-r3-fhirpath-lab-run\comparison-report.json'
npm --prefix .\fml-vscode-extension\fml-executor run test:xver
```

Use fresh output/report paths: existing files are never silently overwritten.
Outputs/reports must be separate from the map, input and reference directories,
including directory aliases. Defaults follow the original Ignixa locations,
except the output defaults to `C:\temp\r3-converted-fhirpath-lab`. The original
`C:\git\hl7\fhir-cross-version` path was unavailable during this run; the actual
checkout found was `C:\git\hl7-specs\fhir-cross-version`, configured explicitly.

The runner loads `input\R4toR3\*.fml`, selects the map whose filename matches
each input's `resourceType`, invokes its first group with explicit R4/STU3 model
identities, and prepares once per resource type. Inputs are indexed and grouped
by type so only the current prepared program/import graph is retained, rather
than caching every successful graph for the entire run. Case callbacks/report
entries therefore follow resource-type order, not global filename order.
It loads local ConceptMaps
from `input\codes` and `input\resources`, registering canonical and predecessor
URLs like the Ignixa fixture. Unconditional mappings use the existing local
ConceptMap implementation; unsupported terminology policies remain explicit
service failures, not test-harness conversions. No runtime network calls or
alternative engine fallback are configured.

Successful executions must preserve input/id, produce the map-declared target
type known to the STU3 model, serialize back to JSON, and match the same-named
reference file. Comparison ignores object order and irrelevant numeric spelling
(`1`, `1.0`, `10e-1`) without converting decimals to IEEE-754 numbers. Array order,
null placeholders, primitive metadata, properties and string/number kinds remain
significant. UTF-8 BOMs in the supplied reference files are handled.

The JSON report separates preparation failures, execution failures, invariant
failures, missing/invalid references, output mismatches, output-write errors and
unmapped resource types. Unmapped types are scope exclusions, not passes; engine
failures remain failed tests. Full preparation diagnostics are stored once per
type and referenced by each affected case. Up to ten path-specific output
differences are retained per case. Created outputs/reports remain outside the
repository and can contain resource data; treat them as input/output artifacts.

The comparison reports issues for later review; it does not rewrite maps or
expectations, relax validation, repair output, or modify the engine.
The test helper retains attribution and the MIT notice for the adapted Ignixa
comparison contract/number-normalization logic.

## Xver-driven execution benchmarks

`npm run benchmark:xver` measures cases from a saved comparison report, using
its input/map directories and saved actual outputs as a strict behavioral
oracle. It does not repair reference disagreements or contact another engine.

```powershell
$env:FML_XVER_BENCHMARK_BASELINE = 'C:\temp\r3-converted-fhirpath-lab\comparison-report.json'
$env:FML_XVER_BENCHMARK_REPORT = 'C:\temp\fml-xver-performance\before.json'
$env:FML_XVER_BENCHMARK_FILES = 'contract.profile.json,explanationofbenefit.profile.json,cqllibrary.profile.json,profiles-types.json,patient-example.json'
$env:FML_XVER_BENCHMARK_PROFILE_CASE = 'contract.profile.json'
npm.cmd --prefix .\fml-vscode-extension\fml-executor run benchmark:xver
```

Use fresh report/profile paths; existing files are not overwritten. The report
parent is created if needed, outside the protected map/input/reference folders.
The files/profile selectors are optional; the example shows the default cases.
The profile selector captures one additional warmed execution using Node's CPU
profiler, outside the timed sample series.

Defaults are seven timed samples and three warm-ups after a separately reported
first execution. `FML_XVER_BENCHMARK_SAMPLES` (3-20) and
`FML_XVER_BENCHMARK_WARMUPS` (1-20) override these. Each case gets a fresh prepared
program; preparation, JSON parsing, request creation and output checks are
excluded from execution timings. Input immutability and saved-output equality
are checked after every run; failure workloads must retain their exact execution
diagnostics. Map/input/output hashes and environment metadata are recorded.
Keep samples, warm-ups, maps, inputs and machine conditions consistent across
before/after reports.

Regenerate the comparison baseline after intentional map/input or engine
behavior changes. A stale saved-output oracle is an error, not a reason to
silently accept a different transformation result during benchmarking.

The xver performance pass caches parsed paths and model choice-field indexes
per prepared program. Reads examine fields actually present, preserve model
order and primitive companions (including non-enumerable fields), and never
cache live input/target values. Large transformations still do work proportional
to their executed rules and data. A single whole-suite timing is not a stable
latency guarantee, and cumulative RSS snapshots are not evidence of a leak or
a heap budget.

## Recording policy and replay

Execution accepts `traceDetail: "full"` (default) or `"rules"`. Both retain
group/rule events and language log messages; rules-only capture omits
source/target instrumentation. Full capture brackets source selection and target
evaluation with enter/exit events. Source type filters, where/check predicates,
defaults and list selection produce intermediate steps; logs and nested calls
also remain visible. This is a capture policy, not truncation: a normal rules-only
recording is `complete`. Budget truncation retains a complete-event prefix of
whichever policy was selected.

`FmlTraceRecorder` defaults to 10,000 events and 8 MiB of serialized internal
event UTF-8. The byte budget is not a heap cap or a final Parameters-response
limit; one candidate event is captured before its size is known. Events,
values, metadata, source spans and messages are detached and recursively frozen.
Reading `events` during capture publishes a frozen prefix that never changes
after later writes. On completion (`onEnd`, including stopped/truncated capture),
the recorder publishes a compacted sequence using `compactFmlTrace`: adjacent
matching non-group enter/exit pairs become one step with the exit snapshot and
depth. Boundary messages are retained in order. Groups, intermediate steps,
nested scopes and unmatched entries are preserved. Previously obtained prefix
arrays remain unchanged, but the final sequence can be shorter; consume the
final `events` sequence for replay rather than concatenating prefixes.

Compaction is linear-time, does not mutate recorded snapshots, and applies only
after raw capture limits have been enforced. It does not reclaim capture budget,
change truncation/failure status, or fabricate missing exits. In rules-only mode,
an empty rule becomes a single step; group boundaries are always retained.
Execution-depth limits remain separate from the extra trace-scope depth.
See [empty-scope compaction](../../server-api-fml-debugger.md#empty-scope-compaction-producer-guidance)
for the engine-neutral policy and examples. Do not share one recorder across invocations.

Each event records the visible lexical bindings with shadowing resolved.
Ordered collections and empty aliases remain distinct. Already evaluated
constants are visible when not shadowed; unevaluated constants are not runtime
bindings yet and are omitted, not forced or falsely represented as empty.
Structured source positions identify evaluation sites, not a standardized event
sequence or object identity. Imported source text is retained for replay.

Absent, inactive or exhausted recording does not enumerate variables, clone
snapshots or format recording messages. Independently configured FML/FHIRPath
language logs still run after recording stops. Failures retain open scopes without
synthetic unwind exits; failure after truncation retains both the evaluation
error and the recording-limit reason. Instrumentation errors remain explicit.

The local debug facade also accepts `localTrace: false` or
`localTrace: {maxEvents, maxBytes, detail}`. VS Code launch configurations expose
the budget/detail object:

```json
{
  "type": "fml",
  "request": "launch",
  "name": "Local FML replay",
  "program": "${file}",
  "input": "${workspaceFolder}/input.json",
  "localTrace": {"detail": "rules", "maxEvents": 10000, "maxBytes": 8388608}
}
```

Trace-format, stack, snapshot, Unicode/source-range and replay tests do not assume
identical engine steps, event counts, permitted evaluation order or internal names.
There are still no definitive reference recordings. All 54 accepted corpus cases
also compare expected output with tracing enabled, not only with tracing absent.
Recordings may contain clinical data: capture is opt-in in the executor, not
automatically written to logs/telemetry/files, and should follow input/output
access and retention rules.

## Reproducible performance review

From the repository root:

```powershell
$env:FML_CORPUS_ROOT = 'C:\path\to\fml-incubator' # optional representative local cases
$env:FML_BENCHMARK_OUTPUT = 'C:\path\to\new-results.json' # optional; refuses overwrite
npm --prefix .\fml-vscode-extension\fml-executor run benchmark
```

`FML_BENCHMARK_SAMPLES` defaults to 7 (minimum 3, maximum 50); each execution
workload has 3 warm-ups. The runner measures preparation, warm execution with
pre-parsed input/fresh targets, parse/execute/serialize end-to-end, independent
concurrent invocations, process memory/GC snapshots and recording modes.
It verifies full lossless-JSON expected output outside every timed region.
No HTTP/process startup is timed and no reference-engine speed comparison is claimed.

The 26 October 2026 review used Node 22.15.0, Windows 10.0.26300, an i7-11370H,
7 samples and explicit GC. Two redundant-work fixes were applied: ordinary
appends no longer enumerate prior array slots, and expression environments
convert only referenced bindings/roots instead of recopying every visible input.
The same ownership/type/cardinality/limit checks still execute.

Selected medians, milliseconds (initial baseline -> final confirmation):

| Workload | Warm before | Warm after | Preparation after | End-to-end after |
| --- | ---: | ---: | ---: | ---: |
| Copy 100 names | 2.348 | 2.727 | 2.395 | 2.906 |
| Copy 1,000 names | 18.064 | 8.875 | 2.171 | 21.079 |
| Copy 5,000 names | 164.258 | 36.205 | 2.227 | 49.508 |
| Expression over 1,000 names | 1340.628 | 87.184 | 5.382 | 77.103 |
| Dependent group over 1,000 names | 105.930 | 47.947 | 3.660 | 52.781 |
| 30 x 30 source combinations | 51.684 | 44.774 | 2.494 | 33.245 |
| Cross-version R4B -> R5 | n/a | 0.108 | 1.724 | 0.103 |
| Corpus simple identity | n/a | 0.188 | 1.911 | 0.174 |
| Corpus multiple sources | n/a | 1.191 | 4.108 | 0.951 |

These are observations, not latency budgets. Smaller cases sometimes regress or
vary with JIT/GC and the shared machine; for example, optimized copy-1,000 medians
ranged from 8.9 to 18.5 ms across runs, while expression-1,000 remained about
77-89 ms. End-to-end may be lower than the earlier warm batch because batches
run sequentially and continue warming the runtime. No statistically significant
small-case or universal speedup is claimed.

Recording a 100-name nested-group workload in the confirmation run:

| Mode | Median ms | Events | Serialized event bytes |
| --- | ---: | ---: | ---: |
| Absent | 9.179 | 0 | 0 |
| Inactive | 8.395 | 0 | 0 |
| Full snapshots | 188.365 | 1,802 | 3,228,499 |
| Rules-only snapshots | 102.741 | 1,002 | 1,661,528 |
| Exhausted before capture | 6.399 | 0 | 2 (empty array) |

Snapshots are intentionally much more expensive. Repeated large mutable-target
snapshots can grow quadratically before the recording cap. Rules-only capture
halved bytes here but is not a general bound. The benchmark process peaked at
about 201 MiB RSS during untraced/corpus workloads and about 404 MiB after the
recording workloads. Post-GC workload heap deltas were roughly -28 to +286 KiB;
these are process observations, not leak proofs or allocation totals. The raw
report includes before/after/post-GC memory, cumulative peak RSS and each timing
sample. Full recording's measured heap included garbage and retained snapshots;
the byte cap must not be interpreted as equivalent heap usage.

Structural tests verify warm execution does not repeat parsing/analysis,
static group lookup or cached FHIRPath compilation after the initial wrapper
warm-up; normal append does not scan prior slots; source-root conversion is not
repeated per element; and async invocations isolate state. No timing thresholds
are embedded in CI. Agree budgets before using these numbers as acceptance gates.

## Deferred review

The three corpus skips and seven missing expectations remain unchanged.
The pre-existing remote debug-body assertion and three diagram-connector
assertions are not part of this work and have not been repaired.

Additional review items: snapshot volume/heap use for large targets; deeper
FHIRPath instrumentation/capture granularity; synthesized batch-field site
granularity; generic replay's native JSON-number display can round large values
even though raw output/jsonValue text preserves them; and comparison with
reference recordings once examples stabilize. DSTU2, XML local execution,
advanced terminology policies, nontrivial casts and StructureMap ingestion remain
the documented boundaries, not newly passing features.

## Phased delivery

The original phases paused for review. The user subsequently authorized
finishing phases 5 and 6 together while leaving skipped/deferred content alone:

1. Scaffold package, shared analysis adapter, contracts and expected tests.
2. Implement basic execution, initial browser/VS Code integration and a minimal recorder.
3. Verify error handling, including partial mutation and asynchronous failures.
4. Cover all examples and required functionality; retain reasoned fixture skips.
5. Explore further tracing.
6. Review measured performance.

[FmlCoverage.test.ts](src/test/FmlCoverage.test.ts) executes the shared transform
signatures and language regressions; [FmlErrors.test.ts](src/test/FmlErrors.test.ts)
retains failure-path coverage. [FmlTracing.test.ts](src/test/FmlTracing.test.ts)
and [FmlPerformance.test.ts](src/test/FmlPerformance.test.ts) replace the remaining
scaffold TODOs with executable invariants. Deferred issues are not conformance passes.

Use the Lab's FML/FHIRPath CI specification baselines, recording revisions when
runtime interpretations are implemented. There are no definitive reference
trace recordings. Test trace-format and snapshot/stack invariants, not exact
event sequences, evaluation order or engine-internal variable names. Capture
granularity may evolve; budget truncation retains a prefix of the selected stream.
