# Handover: an internal FML execution package for FHIRPath Lab

Date: 26 October 2026

## 1. Assignment and confirmed direction

Implement a TypeScript/JavaScript FHIR Mapping Language execution engine inside
`brianpos/fhirpath-lab`, initially as a new **private internal npm package**.
Connect it to the Lab's existing capabilities. Do not make extracting those
capabilities into independent packages a prerequisite; that refactoring can
happen later.

This document originated as a research handover. All six phases are now complete
for the documented scope, including trace-invariant coverage and a measured
performance review. The user authorized finishing phases 5 and 6 together while
leaving skipped/deferred issues for later review. Earlier phase-status sections
below are historical; preserve the existing working tree.

Confirmed requirements:

- **Performance and FML compliance are the main priorities.** An implementation
  that is fast because it skips required semantic work is not acceptable.
- The Lab already has substantial parsing, validation, model resolution,
  language tooling, and **working cross-version validation**. Reuse these;
  do not treat cross-version support as a missing foundation.
- Keep the existing FML-shaped internal model as the starting point. The goal
  is FML/StructureMap input to an internal model and execution, not an execution
  representation constrained by StructureMap serialization compatibility.
- Do not require a StructureMap round-trip for FML execution. StructureMap
  ingestion, where required, should be an adapter into the same internal model.
- The user has a detailed corpus of maps, inputs and known outputs, used to
  validate/extend Ignixa, the .NET engine and HAPI. This corpus is a principal
  acceptance resource, not an optional final check.
- The corpus was not executed during the original research. The user has now
  supplied its local location and filename/folder pairing conventions below.
  Distribution permissions remain unconfirmed; keep fixtures external.
- Local .NET, HL7 Java core and Ignixa reference paths are available below.
  Their working trees contain unpublished changes; commit IDs alone are not
  sufficient reference snapshots. There are no definitive trace examples.
- Implement a minimal trace recorder early so it can help develop and test
  the engine, not just power a debugger at the end. Minimize its disabled-path
  overhead: do not construct trace messages, enumerate/copy variables, clone
  data or create snapshots when no active consumer needs them.
- Build on existing Lab services now, with seams that make later extraction
  practical. Do not start with a broad repository reorganization.

Package names, paths and API names below are recommendations, not previously
agreed public contracts.

### Decisions confirmed after review

- Use the Lab's CI-build FML and FHIRPath specification baselines, recording
  revisions for reproducibility rather than substituting published R5 rules.
- Reuse the same supplied models/model configuration as the rest of the Lab;
  retain canonical-derived context and the supplied default, falling back to R4.
- Start with FML input; StructureMap ingestion is later adapter work.
- Support asynchronous runtime services from the start.
- Support caller-owned mutable targets. A failed invocation may leave partial
  writes; report failure explicitly and do not imply rollback.
- Deliver browser Lab and VS Code integrations, preserving remote execution.
- Corpus root: `C:\git\hl7-incubators\fml-incubator`. Pair files/folders between
  `input\examples` / `othermaps`, `test-input-resources` and
  `test-output-resources`. Ignore numbered output directories and backups.
  Missing expectations are incomplete fixtures, not implicit expected failures.
- For a failing case, inspect map/input/expected output. If the expectation is
  believed incorrect, skip that specific case with a recorded reason for review.
  Do not relabel engine implementation gaps as invalid-fixture skips.
- Trace format is documented, but steps, granularity, permitted evaluation
  order and internal variable names are not standardized. Compare observable
  resource results and format invariants, not reference-engine event equality.

Local reference sources inspected (all with local changes):

| Reference | Local path | HEAD at inspection |
| --- | --- | --- |
| .NET | `C:\git\dotnet\fhir-net-mappinglanguage` | `8ca85c9` |
| Ignixa | `C:\git\brianpo\opensource\ignixa-fhir\src\Core\Ignixa.FhirMappingLanguage` | `681bb809` |
| HL7 Java core | `C:\git\hl7\org.hl7.fhir.core\org.hl7.fhir.services\src\main\java\org\hl7\fhir\services\fml\StructureMapTools.java` | `4bf92bc5a3` |

### Phase 2 implementation status

The private package now prepares and executes a basic subset using existing
Lab analysis/model lookup. It supports lexical Cartesian matching, ordered
target writes, local dependent groups, initial transforms/async services and
an opt-in bounded snapshot recorder. The browser's **JavaScript (local)** engine
and VS Code's `"backend": "local"` use the same local debug adapter and replay
contracts; remote remains the default.

Seventeen supplied map/input/output cases execute and compare full lossless JSON.
Other complete cases are pending phase 4; seven inputs have no primary expected
output. No suspected-invalid fixture has been skipped. In particular, inspected
bare-alias FHIRPath maps remain explicit adapter gaps, not invalid expectations.
The valid `target-multiple` case exposed direct Boolean literals being built
as strings; the shared visitor now preserves their value kind and source span.

See the [executor README](../fml-vscode-extension/fml-executor/README.md) for the
exact current subset, numeric boundaries and runtime model injection.
All-example coverage, further tracing and performance review remain separate
paused phases.

#### Browser HL7 v2 example

The Vue 3 FML tester can project generic HL7 v2 input into the local TypeScript
executor. The complete model design and assumptions are documented in
[HL7 v2 support in the FML tester](./hl7v2-fml-design.md).

Test input:

```hl7v2
MSH|^~\&|SendingApp|SendingFac|ReceivingApp|ReceivingFac|20240115093000||ADT^A01^ADT_A01|MSG00001|P|2.7
PID|1||12345678^^^MR^MR||Chalmers^Peter^James^^Mr.||19741225|M|||534 Erewhon St^^PleasantVille^Vic^3999
```

FML:

```fml
/// url = 'http://fhirpath-lab.com/StructureMap/hl7v2-pid-to-patient'
/// name = 'Hl7v2PidToPatient'
/// status = 'draft'

uses "http://hl7.org/fhirpath/v2/StructureDefinition/Message" alias V2Message as source
uses "http://hl7.org/fhir/StructureDefinition/Patient" as target

group Hl7v2ToPatient(source src : V2Message, target tgt : Patient) {
  src.segment as pid where (code = 'PID') -> tgt then PidToPatient(pid, tgt) "pid";
}

group PidToPatient(source pid, target tgt : Patient) {
  pid -> tgt.identifier as id then {
    pid -> id.system = 'http://hospital.example.org/mrn' "identifier-system";
    pid -> id.value = (%pid.field.skip(2).first().element.first().component.first().text) "identifier-value";
  } "identifier";
  pid -> tgt.name as name then {
    pid -> name.family = (%pid.field.skip(4).first().element.first().component.first().text) "family";
    pid -> name.given = (%pid.field.skip(4).first().element.first().component.skip(1).first().text) "given";
  } "name";
  pid -> tgt.birthDate = ((%pid.field.skip(6).first().element.first().text.substring(0, 4) + '-' + %pid.field.skip(6).first().element.first().text.substring(4, 2) + '-' + %pid.field.skip(6).first().element.first().text.substring(6, 2)).toDate()) "birthDate";
}
```

The expected Patient contains identifier `12345678`, name `Peter Chalmers`, and
birth date `1974-12-25`.

Validation exceptions in the pre-existing working tree are not corpus skips:
the remote debug request test expects a `debug` body parameter which is currently
commented out in `FmlDebugService.ts`; three diagram expression-connector
assertions also fail. A representative missing connector was reproduced with
the pre-change visitor as well as the updated visitor. These unrelated changes
were left untouched. The selected local execution/replay integration, browser
backend tests and the 17-case resource-output slice pass.

### Phase 3 error verification

The basic subset now has a dedicated executable error suite for failed checks,
`only_one`/cardinality/scalar overflow, unresolved dependencies, missing/duplicate/
incompatible bindings, cyclic or shared data, async host rejection, invalid
limits, cancellation, trace-hook errors, and repeated-run independence.

Fixes include validating finite non-negative integer budgets, abandoning pending
host waits when cancelled, checking runtime transform argument cardinality/kinds
and primitive outputs, shielding input values from host mutation, preserving
source argument read-only ownership, and running trace completion once.
Earlier mutable target writes are retained on failure, but never reported as
successful output. Stopped/truncated trace prefixes retain evaluation errors
and recording-limit reasons independently. Local debugger failures carry
source-located OperationOutcome diagnostics.

No broader language coverage is claimed: imports, inheritance and constants
(including cycles) still fail explicitly as unsupported. The current validator
rejects FHIRPath `resolve()` as undefined, so runtime reference-resolution error
coverage is recorded as a phase 4 capability prerequisite, not a pass or fixture
skip. The 17-case resource-output slice is unchanged; no fixture skips were added.

Phase 3 checks pass: 47 executable error tests (78 total executor/harness tests),
13 local-debug adapter tests, existing replay/value/path tests, four targeted
remote failure-response tests, 28 browser/cross-version tests and two local
success/failure VS Code integration tests. Executor/consumer type checks, browser
bundling and extension build/lint also pass. Remaining language expectations are
TODOs, not conformance passes; pause before phase 4.

### Phase 4 implementation and fixture review

All complete corpus cases have now been exercised: **54 transformations pass,
3 cases are skipped with specific review reasons, and 7 remain incomplete
because primary expected outputs are missing**. Skips are not conformance passes:

| Case | Reviewed inconsistency | Follow-up |
| --- | --- | --- |
| `imports` | Patient arguments are passed to imported `SimpleIdentity`, whose signature requires Basic. | Correct the imported signature/map or caller types. |
| `syntax-backticks` | A Basic-typed map accesses fields not defined on Basic; its Basic-only output masks that invalid typed map. | Use a logical model/input with those names, or classify it as syntax-only. |
| `transform-cc` | The map requires Encounter source input but receives Basic. | Correct the input or source declaration. |

Do not edit the external corpus automatically to make these cases pass.
The reasons are executable skip annotations in the external-corpus test.
Valid synthetic tests cover those language/transform features independently.
UUID and the historical ConceptMap/101 dependency use explicit deterministic
test services rather than relaxed output comparisons.

The runtime now includes import ownership/versioned linking, inheritance and
default dispatch, lazy map-local constants, embedded ConceptMaps, source/list
qualifiers, batch identity, target sharing/list modes, named arguments and the
shared transform signatures. It preserves primitive metadata across evaluator
boundaries, supports primitive target aliases, and retains exact decimal/long/
integer64 values. R4B/R6 evaluator contexts can use the Lab's generated models;
explicitly supplied contexts remain authoritative. The existing serializer
preserves share labels and signature-ordered named arguments without becoming
the executor's required intermediate representation.

Confirmed decisions for ambiguous draft wording:

- Share bindings survive source iterations and siblings in their enclosing
  group/dependent-block scope; called groups have independent sharing scopes.
- Sequential scalar writes replace previous values; multi-item scalar
  assignments still fail. Source `only_one` permits zero or one item.
- Unix transforms use milliseconds since the Unix epoch.
- Nontrivial cast conversions remain explicitly unsupported pending
  specification clarification; compatible casts are covered.

The FML authoring snapshot reviewed locally is `fml-incubator` HEAD `8bb04b4`
with working-tree edits to the language and transform documentation. The CI
core page now points to the Mapping Language IG. No immutable trace-step
contract or reference recordings have been inferred from those moving sources.

At the phase 4 checkpoint, further tracing and performance were not yet started. See the
[executor README](../fml-vscode-extension/fml-executor/README.md) for service
requirements, exact boundaries, corpus configuration and the remaining TODOs.

Phase 4 verification includes 172 executor/coverage tests, 88 validator tests,
15 local-debug adapter tests, language/replay regressions and focused VS Code
success/failure replay. The actual Nuxt client bundle also builds in an isolated
temporary directory (global application type-checking and minification disabled
for that bundling check; package/extension type checks run separately).
The three pre-existing diagram expression-connector assertions remain unchanged.
Temporary generator/build artifacts are removed after validation.

### Phases 5 and 6: tracing and performance completion

The local recorder now publishes immutable event-time snapshots/prefixes,
including source spans, messages, ordered/empty collections, shadowed lexical
bindings and already evaluated map-local constants. Recording never forces lazy
constants: unevaluated constants are omitted until a runtime binding exists.
Prepared sites retain structured source positions across imports and Unicode/
multiline UTF-16 ranges. No engine-specific step sequence is an oracle.

Full capture retains group/rule scopes plus source/target steps and messages.
Rules-only capture omits source/target steps while retaining valid scopes and
messages. Normal completion under either policy is complete; a recording budget
retains a whole-event prefix. Failure after truncation keeps both outcome and
recording diagnostics, and replay retains active scopes without synthetic exits.
Inactive/exhausted capture does not enumerate/clone/format trace-only data;
independently configured language logging still runs.

The direct local facade accepts `localTrace: false` or `{maxEvents, maxBytes,
detail}`; VS Code launch configuration exposes the budget/detail object. Remote
execution remains unchanged. All 54 accepted corpus outputs are checked with
and without capture. The three reviewed skips and seven incomplete fixtures
remain unchanged.

A reproducible npm benchmark now separates preparation, warm execution,
parse/execute/serialize, repeated/concurrent invocations, process memory/GC and
instrumentation costs. Workloads include growing copies, repeated expressions,
nested groups, Cartesian sources, large complex copies, cross-version execution
and five authorized local corpus cases. Every timed execution is checked
against its expected output outside the timing interval.

The 26 October 2026 Windows/Node 22.15.0/i7-11370H review used seven samples
and three execution warm-ups. Measured redundant-work fixes avoid scanning all
prior target slots on ordinary append and avoid converting unused roots into
every expression environment. In the final confirmation, the 1,000-name
expression median fell from 1340.628 to 87.184 ms; copy-5,000 fell from 164.258
to 36.205 ms. Small cases are noisy and some regress; no universal speedup or
latency budget is claimed.

Snapshot capture remains expensive: for a 100-name nested-group map, absent
capture measured 9.179 ms, full snapshots 188.365 ms / 1,802 events / 3,228,499
bytes, and rules-only 102.741 ms / 1,002 events / 1,661,528 bytes. Whole-process
peak RSS reached about 201 MiB in untraced/corpus workloads and about 404 MiB
after recording workloads; these are not isolated per-case allocation metrics
or leak proofs. Recorder byte budgets bound serialized internal events, not
heap usage or the final Parameters envelope.

See the [executor README](../fml-vscode-extension/fml-executor/README.md) for
full tables, reproduction commands, measurement limitations and capture-policy
details. Raw timing/memory JSON is saved in the session's files, without corpus
resource contents. Structural tests enforce cached warm paths and invocation
isolation rather than brittle timing thresholds.

#### Left for later review, not silently fixed

Final scoped validation: 188 executor tests, 38 local/replay/value tests, four
remote error-response tests, 28 browser/cross-version tests and two VS Code
local success/failure integration tests pass, along with package/extension
type checks, builds and lint. All 54 accepted corpus transformations match
expectations with recording both enabled and absent. This does not claim the
known unrelated failing assertions below pass.

- The existing `imports`, `syntax-backticks`, and `transform-cc` fixture skips
  retain their specific reasons; seven cases still need primary expectations.
- The pre-existing remote request debug-body assertion and three diagram
  expression-connector assertions remain untouched.
- Snapshot volume/heap pressure for large mutable targets, deeper FHIRPath
  events and synthesized batch-field capture granularity need future policy
  review. No definitive reference recordings exist yet.
- Generic replay display still uses native JSON numbers and may round large
  values; raw output and `jsonValue` text remain preserved. A precision-aware
  replay presentation change needs separate review.
- DSTU2 runtime lookup, local XML, advanced terminology policies, nontrivial
  casts and StructureMap ingestion remain the documented exclusions/boundaries.
  No reference-engine performance or broader CI-language conformance is claimed.

## 2. Existing Lab foundations: start here

The source baseline inspected was the Lab's `develop` branch at
[`8b7309d`](https://github.com/brianpos/fhirpath-lab/tree/8b7309d30b258092316c2d2f89729930641a26c7).
Re-check the active checkout: newer work takes precedence over this snapshot.

| Existing surface | Role in the implementation |
| --- | --- |
| `helpers\fml_parser.ts` | ANTLR-based parsing, strict parse diagnostics and partial parsing for editing. Use strict parsing for execution. |
| `helpers\fml_visitor.ts` | Builds the position-aware internal model and preserves embedded expression text. |
| `helpers\fml_models.ts` | Existing FML-shaped model: groups, rules, constants, inline ConceptMaps, declarations and source positions. Extend only for demonstrated semantic needs. |
| `helpers\fml_validation.ts` | Existing model/transform validation. Reuse signatures and diagnostics rather than creating a competing catalog. |
| `helpers\fml_transform_signatures.ts` | Transform signatures and result-type knowledge. Runtime overloads must agree with validation. |
| `helpers\fml_cross_version.ts` | Version-qualified canonical handling and source/target version selection. Preserve the extracted version identity when using normalized canonicals. |
| `helpers\custom_model.ts`, `helpers\models\generated` | Logical-model and generated per-version model infrastructure. Reuse through adapters. |
| `helpers\fhirpath_validator.ts`, `helpers\fhirpath_visitor.ts` | Existing FHIRPath validation and model-provider infrastructure. Distinguish static validation from runtime evaluation. |
| `fml-vscode-extension\fml-validator\src\CoreFmlParser.ts` | Composes parsing, model configuration, property analysis, FHIRPath validation and transform/group validation. It is not merely a syntax checker. |
| `fml-vscode-extension\fml-validator\src\FmlPropertyUsageCollector.ts` | Model analysis with per-use types, versions, cardinality, path steps and contextual group-input resolution. |
| `fml-vscode-extension\fml-validator\src\FmlModelConfiguration.ts` | Applies default versions and profile-to-base-type configuration. |
| `fml-vscode-extension\fml-validator\src\FmlTransformValidator.ts` | Existing transform validation and default-group/group-signature resolution. |
| `fml-vscode-extension\fml-validator\src\FmlValidatorApi.ts` | Existing API facade and engine injection point. |
| `fml-vscode-extension\fml-debug-service` | Editor-independent remote trace/replay, typed values and variable-path handling. Integrate through an adapter rather than embedding debugger presentation in the executor. |
| `fml-vscode-extension\fml-language-service` | Existing editor-independent language intelligence; keep it working without making execution a prerequisite for editing. |
| `helpers\fml_to_structuremap.ts` | Existing StructureMap serialization. Do not put it on the mandatory FML execution path. |

Important details from the inspected implementation:

- `CoreFmlParser.parse()` already performs significant semantic analysis.
  Some comments on the surrounding API still describe an earlier syntax-only
  stage; do not mistake those comments for the actual implementation.
- `FmlValidatorApi` exposes `getPropertyAnalysis()`, `getPropertyUsages()`,
  `getDefaultGroups()`, `getDefaultGroupUsages()` and `getGroupSignatures()`.
- `FmlPropertyUsageCollector.analyzeModel()` can analyze an already parsed model.
  Prefer sharing one preparation result over calling text-based APIs that
  independently reparse and reanalyze the same document.
- `FmlPropertyAnalysis` carries `usages`, `groupInputs`, `groupInvocations`
  and `variableReferences`. Usages include model versions, cardinalities,
  path steps and possible types. These are useful binding inputs, not
  necessarily a complete executable plan.
- Phase 1 adds `CoreFmlParser.analyze()` to expose the model and property
  analysis from the same pipeline. `parse()` preserves its previous result
  shape. Executable linking/binding remains subsequent work.
- `Stage1FmlValidatorEngine.compile()` currently means **serialize to a
  StructureMap**, not prepare an executable program. Its `transform()` hook
  is not implemented.
- The inspected StructureMap serializer does not preserve every feature of
  the richer model, including constants and embedded ConceptMaps. Routing
  FML execution through it would unnecessarily lose information.
- Version identifiers existing in a type union do not prove that every
  runtime model/evaluation path supports every release. Reuse the working
  cross-version services, and explicitly verify the releases used by the corpus.

## 3. Internal npm package and dependency direction

Suggested initial package:

```text
fml-vscode-extension
  fml-executor
    package.json                 # @fhirpath-lab/fml-executor, private: true
    tsconfig.json
    src
      index.ts
      contracts.ts
      ...preparation, execution and Lab adapters as needed...
      test
```

Use the existing sibling-package conventions rather than introducing a new
workspace manager or monorepo layout:

- Existing package names include `@fhirpath-lab/validator`,
  `@fhirpath-lab/language-service` and `@fhirpath-lab/debug-service`.
- Packages use npm, TypeScript, `build`, `check-types` and `test` scripts.
  The existing language service demonstrates a local `file:` dependency on
  the validator.
- The validator uses TypeScript declaration generation and an esbuild bundle,
  including shared files outside its own directory. Follow the applicable
  convention where helpful; do not require moving all helpers first.
- Existing packages target Node 20 or newer. The executor core must also
  remain browser-safe for the Lab: do not copy Node-specific imports or
  bundling assumptions into the runtime.
- Keep the package private. Public publishing, package splitting and moving
  shared helpers are later work.

Recommended dependency shape:

```text
Lab / VS Code composition
  -> existing validator and language/debug services
  -> new executor facade / Lab adapter
       -> existing Lab analysis, models and FHIRPath services
       -> executor preparation and runtime
```

Avoid a dependency cycle. If the executor's Lab adapter depends on the
validator, the validator must not also import the executor. Wire execution
through application composition or an injected engine implementation outside
the validator package. Existing engine interfaces are already exported.

Pragmatic relative imports of existing helpers are acceptable initially.
Keep them concentrated in a small Lab adapter, record the coupling, and do
not duplicate the helpers to simulate independence.

Do not silently change the meaning or return type of the existing
`compile(): CompiledStructureMap` API. Add a distinctly named executable
preparation operation or facade. Preserve existing consumers.

## 4. Execution architecture

```text
FML parser ----------------------+
                                 |
StructureMap adapter, if needed --+--> existing FML-shaped internal model
                                            |
                              validate / resolve / link / bind
                                            |
                                 reusable executable program
                                            +
                              fresh invocation state and inputs
                                            |
                                  model-aware output writing
```

### Prepare once

Preparation should reuse the Lab's analysis and then bind what execution needs:

- Validate the strict parse and retain original source locations and text.
- Resolve imports and their ownership, group calls, inheritance and signatures.
- Detect missing/ambiguous definitions and invalid inheritance cycles.
- Bind default dispatch using source **and** target type/model identities,
  including the distinct semantics of `types` and `type+`.
- Assign lexical variable slots and frame layouts.
- Prepare embedded FHIRPath using the existing evaluator's supported compile
  facilities, correct model and explicit variable environment.
- Bind transform implementations and overloads using the shared signatures.
- Resolve property/type/cardinality descriptors wherever statically known.
- Preserve checked dynamic lookup for genuinely dynamic cases.

The executable program can retain the existing model shape with bindings or
side tables. A second elaborate AST, bytecode VM or JavaScript code generator
is not required initially.

### Execute with fresh state

The reusable program must not own the last invocation's input, targets,
variables, errors, current position or counters. Those belong to per-run state.

Use lexical frames for groups, rules and source combinations. Make the
lifetime of lazy constants explicit according to the selected specification;
detect constant cycles and do not accidentally memoize invocation-dependent
values in shared execution bindings.

Cache keys must include relevant model/version identity, imported program
identity and evaluator/transform configuration. Expression text or unqualified
type names alone are not sufficient.

### Explicit value and node contracts

Reuse existing model identity and validation resolution. The runtime still
needs to distinguish:

- Empty collections, singletons and multiple values.
- Primitive values and their `id`/`extension` metadata.
- Source nodes, writable target nodes and detached transform results.
- Resource types, datatypes, logical models and choice-element alternatives.
- Same-named types from different releases/profiles.
- Copying content versus referring to an existing target instance.

Use lightweight node handles/shared descriptors where practical. Do not
construct a heavyweight wrapper tree solely for abstraction.

Target aliases must identify the actual created/selected target node. They
must not accidentally refer to the source object or an unregistered root name.
Preserve input immutability and define ownership when attaching copied values.

### Host services and asynchronous work

Reuse/adapt Lab model lookup, FHIRPath evaluation, map loading, terminology,
resource creation and package/custom-model resolution.

Move import/model loading and other preparation-time I/O out of the hot loop
where possible. Decide explicitly how asynchronous runtime services such as
FHIRPath resolution or terminology are supported; do not turn every element
operation into an awaited call without need, or omit required semantics to
maintain a synchronous API.

## 5. Semantic requirements that must shape the runtime

Implement these as executable behavior, not just parser acceptance:

| Area | Required behavior |
| --- | --- |
| Entry and calls | Execute the explicitly selected group, or the specification's default entry group, not every group. Support declared parameter modes and multiple inputs/targets. |
| Source matching | Expand successive sources as Cartesian combinations, with each bound alias representing one value per match. A later source must see earlier bindings. |
| Source qualifiers | Implement type filters, cardinality, defaults, list options, `where`, `check` and `log` in the correct contexts and specification-defined order. |
| Conditions | A failed `where` excludes a match. A failed `check` is an execution error, not a warning followed by successful output. |
| Lexical scope | Parent bindings are available to dependent rules; sibling rules and completed calls must not retain each other's aliases. |
| Target sequencing | Process targets in order for each complete match, exposing newly bound target aliases to subsequent work and dependent rules. |
| Target lists | Preserve source-list versus target-list semantics, shared-instance identity and any sharing identifier. Do not reduce everything to append/replace. |
| Cardinality | Do not silently truncate multi-valued results into scalar targets or use the first item to hide an invalid `only_one`. |
| Groups and linking | Execute inheritance and dependent rules correctly. Retain an imported group's defining map for its own imports/constants/ConceptMaps. Diagnose ambiguity rather than selecting the first arbitrary match. |
| Expressions | Supply the current element, mapping variables and roots explicitly to FHIRPath. Do not infer context from parentheses, leading aliases or string rewriting. |
| Transforms | Implement specified overloads, argument counts, empty/multiple results and result types. Supporting a transform name is not complete support. |
| Constants and terminology | Preserve constants and inline ConceptMaps through preparation and execute their semantics. External ConceptMap support alone is insufficient. |
| FHIR JSON | Correctly write choice names, repeating fields, recursive structures, primitive companions, extension-only values and aligned primitive arrays/null placeholders. |
| Numeric values | Cover release-specific integer64 representation and decimal/integer precision. Do not silently lose information through JavaScript number/string coercion. |
| Diagnostics | Unsupported features and unresolved required services must produce explicit failures, not empty success-shaped output. |

Core matching strategy: depth-first expansion of one source at a time,
binding one candidate in its lexical frame and continuing to the next source.
Only after a complete valid combination exists should its targets and
dependent rules execute. Do not materialize the entire Cartesian product.

Pin the supported FML specification baseline separately from the FHIR release
of each data model. Where wording is ambiguous or reference engines disagree,
record the intended interpretation and a focused case rather than silently
following one implementation.

## 6. Performance requirements and measurement

Prioritize removing repeated work before introducing code generation:

- Carry resolved cross-version path/type information from validation into
  bindings rather than resolving it again for every value.
- Bind static group calls and transform functions once.
- Use compact lexical frames rather than copying whole dictionaries per match.
- Prepare/cache expressions with correct model and configuration keys.
- Write through target-node handles and bound property descriptors; do not
  convert every ordinary assignment into a newly parsed FHIRPath query.
- Avoid rescanning a growing target array for every append.
- Avoid JSON stringify/parse as the routine clone operation.
- Keep tracing, diagnostic formatting and variable snapshots out of the
  tracing-disabled hot path.
- Preserve all required checks and observable behavior in optimized paths.

Measure separately:

| Measurement | Scope |
| --- | --- |
| Cold preparation | Parse, analyze, resolve/link, bind and prepare expressions; report external I/O separately. |
| Warm execution | Reuse a prepared program with fresh input/target state and preloaded services. State whether input is already parsed. |
| End-to-end | Parse the input, execute and serialize the output. |
| Resource behavior | Allocation/GC pressure, peak memory, repeated runs and concurrent independent invocations. |
| Scaling | Repeated elements, nested groups, multiple repeating sources, large complex copies and growing target arrays. |
| Optional instrumentation | Report tracing-enabled overhead separately from the normal execution baseline. |

Check output correctness outside the timed region. Keep input sizes,
services, tracing settings and serialization policy comparable. Cross-language
comparisons must not conflate HTTP/process startup with execution cost.

Useful structural checks for prepared static paths include zero FML reparses
during warm execution, no repeated static group-name lookup, and no FHIRPath
parsing for ordinary target assignments. These supplement, not replace,
actual time/memory measurements.

No throughput or latency target has been agreed. Establish a reproducible
baseline from representative corpus cases, then agree budgets rather than
inventing performance claims.

## 7. Corpus and conformance harness

Start with a manifest adapter for the user's existing corpus rather than
requiring the corpus to be reorganized to match a new harness.

Each case should identify the map and imports, input(s), expected output(s)
or expected error, entry group, source/target model versions, required
profiles/logical models, terminology/host dependencies, and any deterministic
clock/identifier settings.

Keep private fixture locations configurable. Do not copy private data into npm
assets, downloads or public fixtures without permission. Missing configured
corpus data must be visible; it must not quietly turn a corpus run into zero
passing cases. A small distributable synthetic regression set can coexist
with the separately supplied corpus.

Comparison rules:

- Compare actual expected JSON structure, not merely successful execution.
- Normalize irrelevant formatting/object property order, but preserve array
  order, null placeholders, primitive companions and meaningful numeric content.
- Do not normalize away defects to make engines agree.
- Control nondeterministic services where required by a case.
- Assert required failure behavior, not only positive outputs.
- Add invariants for input immutability, lexical scope and independent
  repeated execution of one prepared program.
- Add targeted multi-source, cross-version and primitive-metadata cases
  wherever the supplied corpus does not already cover them.

Report separately: passing executions, executed-but-failing cases,
explicitly unsupported cases and out-of-scope exclusions with reasons.
Known failures may be ratcheted, but must not be counted as conformance passes
just because an expected-failure test is green.

Ignixa, HAPI and the .NET engine are useful differential references, not
unconditional authorities. A disagreement requires investigation against the
chosen specification and intended case semantics, not majority voting.

## 8. Integration with existing Lab features

### Parsing, validation and model services

Provide a small Lab-facing preparation adapter that obtains/reuses the model
and analysis, imports and model configuration. Preserve diagnostics and source
positions. Do not build a second cross-version validator.

Where the current public analysis APIs would duplicate work, prefer a small
additive result/API exposing preparation information. Do not move the entire
validator or generated-model catalog as an initial task.

### FHIRPath and terminology

Use the Lab's selected evaluator and model context through a runtime adapter.
Static FHIRPath validation is not itself execution. Preserve node identity,
variables and primitive metadata when crossing the evaluation boundary.

Keep transform result handling consistent across primitives, complex values,
collections and empty results. Avoid mixing raw JSON, scalar values and node
objects without an explicit conversion contract.

### Execution API and compatibility

The initial API should support preparing a model once and executing it many
times, with explicit input/target bindings and selected entry group. Include
diagnostics and output contracts that do not assume one resource in and one
resource out.

Preserve existing parse/validate/StructureMap-compile operations. The current
`TransformRequest` accepts a `CompiledStructureMap`; do not force the new
FML-model execution API through that contract. Bridge it only when a
StructureMap-to-model adapter is available, or add an additive local-execution
facade with a clearly different request type.

### Debugging and editor integration

Inject an optional per-invocation trace observer at semantic execution
boundaries. Align recording with the mapping-language IG's proposed
`enter`/`step`/`exit` contract, while keeping its FHIR Parameters serialization
and the Lab's replay/DAP adapters outside the execution core. See
[Section 13](#13-debug-trace-injection-implementation-notes) for implementation
notes, snapshot rules, completion statuses and interoperability cases.

Retain source document identity/ranges, lexical bindings and target identities.
When capture is enabled, snapshot values at the event boundary; do not retain
live mutable references and serialize their later state. When disabled, avoid
snapshot construction and serialization entirely. Bounded recording must keep
a complete-event prefix, not discard events from its middle.

The first delivery need not implement an entire interactive debugger. Expose
the trace seam and a minimal recorder early enough to support execution tests,
preserve the remote backend, and make local execution an explicit selectable
integration rather than silently replacing existing behavior. Do not defer
all recording implementation until editor integration.

### Limits and failures

Define per-invocation recursion/work/output limits and cancellation behavior.
Make enforcement real, observable and tested. A synchronous evaluator cannot
be forcibly interrupted merely by accepting an `AbortSignal`; do not claim
hard timeouts without a mechanism that enforces them.

Keep strict execution semantics as the default. Optional conversion-repair
policies, if added, must be explicit and reported, not hidden inside generic
language semantics.

## 9. Delivery sequence

The original delivery paused after each phase. After phase 4 the user authorized
finishing the remaining phases together; the phase descriptions below retain
that original sequence rather than reopening skipped material.

1. **Scaffold everything and expected tests.** Create the private package,
   additive shared-analysis API, browser-safe facade, invocation/trace seams,
   external-corpus adapter and pending acceptance inventory. Execution must
   report `not-implemented`, not empty successful output. Do not expose an
   unusable local backend in either consumer. Validate builds and existing
   consumers, then pause.
2. **Implement basic functionality.** Deliver simple and cross-version corpus
   slices, model-aware writes, fresh invocation state and input immutability.
   Establish Cartesian source matching and lexical/target alias semantics,
   async services, browser/VS Code integration and a minimal trace recorder
   without waiting for later tracing exploration. Then pause.
3. **Verify error handling.** Cover failed checks, cardinality, unresolved
   services/groups/variables, cancellation, limits and partial mutable targets.
   Preserve failure prefixes and explicit errors. Then pause.
4. **Complete example coverage with all functionality.** Expand imports,
   inheritance, default dispatch, constants, ConceptMaps, list modes, JSON
   metadata/precision and every required transform overload. Review failing
   expectations before recording any specific reasoned fixture skip. Then pause.
5. **Explore further tracing.** Validate the documented format, recording
   invariants and replay integration. There are no definitive trace examples;
   engine event sequences and internal names are not acceptance oracles.
   Keep capture policy adjustable. Then pause.
6. **Review performance.** Measure cold/warm/end-to-end time, scaling, memory
   and instrumentation costs on correct cases. Optimize measured hotspots
   without changing required semantics. Then pause.

For the suggested package location, use the repository's npm conventions:

```powershell
npm --prefix .\fml-vscode-extension\fml-executor run check-types
npm --prefix .\fml-vscode-extension\fml-executor test
$env:FML_CORPUS_ROOT = 'C:\git\hl7-incubators\fml-incubator'
npm --prefix .\fml-vscode-extension\fml-executor run test:corpus
npm --prefix .\fml-vscode-extension\fml-validator test
npm --prefix .\fml-vscode-extension\fml-language-service test
npm --prefix .\fml-vscode-extension\fml-debug-service test
```

The executor scripts now exist. Corpus checks distinguish fixture inventory/
syntax checks from the 17 executed resource-output cases. Remaining execution
expectations are separately reported TODOs, not conformance passes. Run affected
consumer checks as integration changes require. Use targeted suites first.

## 10. Lessons from the reviewed engines

| Reference | Borrow | Do not inherit unchanged |
| --- | --- | --- |
| Medplum | Recursive expansion of successive source clauses; typed evaluation integration. | StructureMap as a compulsory runtime representation; rule-alias leakage; shallow source/target ownership; incomplete qualifiers/inheritance; narrow transform adapters and incomplete JSON writing. |
| LHNCBC | Source/target schema lookup ideas; primitive-companion and choice handling; centralized writes; real conversion edge cases. | Primary-source-only iteration; secondary-source guard omissions; warning-and-continue semantics; literal fallback for missing variables; conversion-specific profile rewriting; its large combined interpreter/serializer/policy module. |
| Ignixa | FML-shaped positioned AST; model-aware elements; transform/service interfaces; explicit mutation boundary; expression caching; oracle-gap accounting. | Mutable context inside the reusable compiled wrapper; flattened rather than Cartesian source processing; last-value alias binding; syntax-based FHIRPath context heuristics; mismatched transform result representations; repeated FHIRPath target lookup and JSON serialization cloning. |

The Lab already has cross-version capabilities. LHNCBC's value here is as a
reference for runtime JSON and conversion edge cases, not as a replacement
cross-version foundation.

Source observations and focused JavaScript reproductions are not a complete
conformance audit or performance benchmark. Ignixa's runtime was inspected,
not executed in this research. Its public snapshot also records known oracle
gaps; newer user work may have changed them.

Useful regression scenarios from the research:

- Two independent two-item sources must yield four combinations, not two
  concatenations containing an entire secondary array.
- A repeated-source predicate must not be evaluated only against its first
  element or promoted to a whole-map predicate because it contains a function.
- A failed `check` and invalid `only_one` must not return successful output.
- `extends` must execute base rules; entry execution must not execute all groups.
- A rule alias must not leak to its sibling or become a literal string when missing.
- Copying/mutating output must not mutate input.
- Primitive copy must preserve its companion extension, including extension-only
  and repeating cases.
- `append` must honor its supported variadic signature; `evaluate` must honor
  explicit context and expression; `create` must distinguish resources/datatypes.
- Transitive imports must retain the defining map's resolution context.
- A prepared program must not retain invocation state when reused.

## 11. Acceptance and non-goals

The execution-engine work is complete only when:

- The private npm package builds, has typed exports and is consumed through
  a working Lab integration, not just standalone interpreter tests.
- Existing parser, validator, cross-version and language-service behavior is
  preserved; no duplicate type/model foundation was introduced.
- FML executes from the existing internal model without a lossy StructureMap
  serialization round-trip.
- Every agreed in-scope corpus case produces the expected output or required
  failure; remaining exclusions/gaps are explicit and not reported as passes.
- The source-matching, lexical-scope, target-identity and input-ownership
  invariants are covered.
- Model versions, profiles, logical models, choice/cardinality and primitive
  JSON behavior are preserved through execution, not just static validation.
- Repeated execution uses independent state and model-aware cache keys.
- Unsupported semantics and required host-service failures are explicit.
- Cold, warm and end-to-end measurements plus scaling/memory observations
  exist for representative correct executions.
- Debug hooks preserve source identity while the normal path avoids eager
  trace snapshots. Tracing does not change transformation outputs or required
  failure behavior.
- Recordings preserve evaluation order, event-time variable snapshots and
  valid phase/depth nesting. Failures and recording limits retain a prefix,
  with explicit status/outcome rather than fabricated closing events.
- The IG serialization adapter and Lab replay adapter have format/invariant
  coverage. Compare local reference recordings if/when available, without
  treating their step choices/order or internal names as normative.
- The affected Lab/extension consumers remain usable, with remote execution
  preserved unless an intentional user-approved replacement is made.

Not initial prerequisites: public npm publication, a new repository, moving
all shared helpers into new packages, a new parser, a replacement cross-version
validator, StructureMap round-trip fidelity, bytecode/JIT compilation, or a
complete interactive local debugger.

Before implementation choices become binding, establish the active checkout,
corpus access/configuration, language baseline and initial supported case set.
Confirm any actual ambiguity with the user rather than reducing scope silently.

## 12. Reference snapshots and provenance

- [FHIRPath Lab develop baseline](https://github.com/brianpos/fhirpath-lab/tree/8b7309d30b258092316c2d2f89729930641a26c7)
- [Medplum mapper source](https://github.com/medplum/medplum/tree/8c4504810192e3e952ae58d6e375288abba60813/packages/core/src/fhirmapper)
- [LHNCBC engine source](https://github.com/LHNCBC/fml-resource-version-converter/tree/8ebe5a672168c483b39cce5f2a959ae963774d0b/src/fml_base_conv)
- [Ignixa FML source](https://github.com/brianpos/ignixa-fhir/tree/a9a8833143ab62b4eb5216e9d9f2d3cc97b03404/src/Core/Ignixa.FhirMappingLanguage)
- [Ignixa known evaluator gaps](https://github.com/brianpos/ignixa-fhir/blob/a9a8833143ab62b4eb5216e9d9f2d3cc97b03404/test/Ignixa.FhirMappingLanguage.Tests/Conformance/FmlKnownEvaluatorGaps.cs)
- [Ignixa oracle harness](https://github.com/brianpos/ignixa-fhir/blob/a9a8833143ab62b4eb5216e9d9f2d3cc97b03404/test/Ignixa.FhirMappingLanguage.Tests/Conformance/FmlTransformOracleTests.cs)
- [FHIR R5 mapping-language reference used in the review](https://hl7.org/fhir/mapping-language.html)
- [Mapping-language IG: Debug Trace](https://build.fhir.org/ig/HL7/mapping-language-ig/en/debug.html)

The debug page was read on 26 October 2026. It is an **informative proposal in
a changing continuous build**, not a finalized interactive-debugging standard.
Record the IG revision and local engine revisions selected for implementation.
The user's unpublished local trace implementations were not inspected here.

Focused execution examples used published `@medplum/core@5.2.8` and the pinned
LHNCBC source with FHIRPath.js 4.11.0. The proposed Lab package should use the
Lab's actual dependency configuration, not those research versions.

Use external engines as informative references, not normative specifications.
If code is copied, materially adapted or ported, check and preserve the
applicable license notices and attribution. Calling it reference/hint material
does not remove provenance obligations.

## 13. Debug trace injection implementation notes

### Scope: recording and replay, not pausing the evaluator

The IG describes a post-mortem recording returned alongside a transformation
result. It is not an interactive debugger protocol. A local replay adapter can
present stepping, reverse stepping, frames and variables through DAP without
pausing a server-side transformation.

For an HTTP `$transform` adapter, `debug=true` requests capture, whether supplied
as an operation parameter in the URL or body. Keep HTTP handling outside the
executor. Direct npm consumers should enable capture through execution options,
without constructing a Parameters resource or serializing a StructureMap.

The intended separation is:

```text
prepared executable program + invocation options
                   |
          optional trace observer
                   |
    bounded, immutable event-time recording
             /                 \
   IG Parameters adapter    Lab replay adapter
                                   |
                              editor / DAP
```

Neither a trace recorder nor an editor dependency should be required to
prepare or run a map.

### Injection point and lifetime

Supply the observer through per-invocation options, not a global singleton or
mutable field on the shared program. The following is a contract sketch,
not an implemented API; reuse existing location/value types where appropriate:

```typescript
interface ExecutionOptions {
    trace?: ExecutionTraceObserver;
}

interface ExecutionTraceObserver {
    readonly recording: boolean;
    onEvent(
        phase: "enter" | "step" | "exit",
        site: BoundTraceSite,
        frame: ReadonlyExecutionFrameView,
    ): void;
}
```

`BoundTraceSite` should refer to preparation-time source metadata and an
evaluation-unit identity. The frame view provides read-only access to visible
bindings at the boundary. It is an ephemeral view, not a historical snapshot.
The observer must capture immutable data synchronously before it returns, or
retain genuinely immutable/versioned state. It must not save a mutable frame
or target reference and read it after further execution.

### Implement early, but pay for capture only when needed

Deliver a minimal in-memory recorder with the first execution slice, before a
full replay UI or complete wire-format adapter. Use it to assert intermediate
bindings, Cartesian matches, alias ownership, mutation timing and stopped
execution state. These observations can localize a failed known-output case
much better than comparing only its final JSON. Keep its event semantics aligned
with the IG from the beginning so tests do not establish a competing protocol.

Guard emission with the observer's recording flag **before** creating any
trace-only payload, message, closure, frame-view wrapper or snapshot:

```typescript
const trace = state.trace;
if (trace?.recording) {
    trace.onEvent("step", site, state.frame);
}
```

Here `site` is reusable preparation-time metadata and `state.frame` is the
existing execution frame, exposed read-only to the observer. The recorder
performs capture only after the guard. Do not eagerly build an event and then
use optional chaining only for its delivery. An unconditional no-op observer
also does not prevent expensive argument construction.

With tracing absent or inactive, do not format complex messages, enumerate
visible variables, clone trace data, serialize values or allocate recording
events. Lazy callbacks are not free if a new closure is allocated at every
untraced step; prefer a guard over creating a factory that nobody will call.
Prepare immutable site metadata once and avoid trace-only bookkeeping in the
ordinary per-element path.

A recorder can stop capture at its limit while the transformation continues
without further snapshot work; check its recording flag at subsequent sites.
Only skip instrumentation work, not required checks, actual target-copy
operations, error reporting or independently configured language logging.
Keep capture synchronous at the semantic boundary; asynchronous persistence
must consume already captured immutable data with bounded buffering.

The runtime emits semantic boundaries; the recorder derives the stack,
snapshots bindings and owns event/byte limits. A separate adapter serializes
the IG wire format. This keeps recording policy out of source matching and
avoids turning wire-format DTOs into execution frames.

Define observer/serialization failure behavior explicitly. Never swallow it
and claim a complete recording, or misreport it as an FML `check` failure.
Prefer a failure-contained recorder with explicit recording diagnostics where
evaluation can safely continue; an unrecoverable instrumentation failure must
remain distinguishable from a language failure.

### Emit at meaningful execution boundaries

- Emit `enter` immediately after establishing a scope and its initial visible
  bindings, before executing units in that scope.
- Emit `step` after an evaluation unit completes, carrying the state after it.
  Do not evaluate an expression again to discover its trace value.
- Emit `exit` only after normal completion, while final scope bindings are
  still available. Do not emit it from generic exception-unwinding cleanup.
- Instrument source matching at each actual candidate/combination boundary
  where the chosen capture policy needs it; tracing once per textual rule
  cannot describe all Cartesian executions.
- Include group invocation and dependent-rule execution in evaluation order.
  Define rule-match scopes so their local aliases and repeated executions are
  distinguishable.
- Connect FML `log` and FHIRPath `trace()` through the actual evaluation logging
  hooks, preserving message names/text. Do not re-run the expression to log it.

Use a documented capture policy for group, rule-match, source and target units;
optional deeper FHIRPath events can be added when the evaluator exposes them.
Different engines may choose different valid unit granularities. Do not
require identical event counts or invent evaluation units solely to copy
another engine's implementation details.

For the IG stack rules, an outermost scope's `enter` and `exit` are depth `0`.
A nested scope's boundaries are one deeper than its parent's boundaries.
A scope's own `step` events are one deeper than that scope's `enter`.
Close normal scopes last-in/first-out. Provide depth explicitly where practical,
and verify it agrees with the phase-derived stack.

### Snapshot and variable semantics

Each event contains the **complete visible variable set**, not just changes.
Absence of a name means it is not in the recorded scope.

- Resolve shadowing first: only the single visible binding of a name is
  included. Repeated entries with that name represent its ordered collection
  items, not outer and inner bindings.
- Represent an empty collection with one entry having neither an inline value
  nor a retrieval path. Do not combine that entry with other items of the name.
  A path-only entry represents a retrievable item, not an empty collection.
- `contextType` is an extensible engine-provided classification, not a closed
  INPUT/OUTPUT-only enum.
- Each item uses at most one of `value` (`value[x]`), `resource`, or `jsonValue`.
  Use valid JSON text in `jsonValue` for logical/backbone/custom values that
  cannot be carried by the other forms.
- `dataType` is a display label, not a discriminator for deserialization.
- A retrieval `path` is a simple property/indexer FHIRPath into an explicitly
  identified **immutable input**. The HTTP proposal identifies the single
  input `content`; a multi-input npm API needs its own unambiguous root mapping.
  Do not use a live target path as a historical snapshot.

For mutable targets, capture at emission time. Structural sharing or
copy-on-write snapshots are suitable only if earlier versions cannot change.
Delayed JSON serialization is safe for frozen snapshots, not live objects.
Preserve relevant primitive metadata and collection ordering in visualization.
Do not force lazy constants or re-evaluate expressions merely for display;
agree how unevaluated bindings are represented without falsely labeling them
as empty collections or changing execution behavior.

The IG's `instanceId` is currently an open question, not a required identity
contract. Internal target-node identities can support correct aliases and
debugging, but need not become wire identifiers. Never use snapshot-clone
identity, a FHIR resource `id`, or a DAP expansion handle as an interchangeable
substitute for underlying runtime identity.

### Source mapping and the existing Lab contracts

Preserve the source artifact identity across imports. The IG supports a
`source` identifier and/or `expressionPosition` such as
`StructureMap.group[0].rule[2].source[0]`. Textual ranges use:

- Zero-based `startRow` and `startColumn`, supplied together.
- Zero-based `endRow` and exclusive `endColumn`, supplied together with a start.
- UTF-16 code-unit columns.

Convert deliberately from each Lab location representation; do not assume
that all parser spans, offsets, trace ranges and DAP coordinates use the same
base or units. DAP uses one-based line/column coordinates. Retain the original
source text/revision for replay rather than resolving ranges against a document
that has since been edited.

The current Lab trace contracts already include phases, recording status,
structured coordinates/messages, typed variables and source identity alongside
legacy offset/length ranges. Reuse those additions and evolve adapters
additively; do not implement a competing contract.
An internal array index is useful for replay; it is not a required IG wire
sequence number.

### Completion, failures and recording budgets

The recorder must distinguish:

| `traceStatus` | Meaning and handling |
| --- | --- |
| `complete` | Evaluation reached normal completion and recording contains the requested capture without limit-caused omissions. Every recorded `enter` has a matching normal `exit`. |
| `truncated` | Evaluation continued beyond a retained prefix because recording reached a limit. Retained events still contain complete snapshots. |
| `stopped` | Evaluation ended abnormally. Keep the last recorded point and active scopes; do not fabricate exits during unwinding. |

Return a prefix in evaluation order. Do not implement truncation as a ring
buffer, sampling, dropping large variables from otherwise retained events, or
filtering events from the middle. If an event would exceed the budget, stop
before retaining that event rather than publishing a partial snapshot.

Report limit/termination reasons through `outcome` (`OperationOutcome`), not an
invented error phase. Report `traceStatus` explicitly; an incomplete recording
must not rely on the absent-status default of `complete`.

Keep evaluation outcome separate from recording completeness. Warning/info
issues can accompany success; error/fatal issues indicate evaluation failure
even if a result or a `complete` trace is present. If evaluation fails after
recording starts, the HTTP adapter should preserve the Parameters trace
envelope with outcome/status rather than replace it with only an
OperationOutcome. Include `return` only when a valid result was produced.
Failures before recording can follow the operation's normal error response.

Cover the combined case of truncation followed by evaluation failure: preserve
both diagnostics and agree status precedence with the selected IG revision
and local references. Never lose the evaluation failure because capture has
already stopped.

### Replay and local reference implementations

Adapt the same recording into the existing local replay service. Reconstruct
frames from active enclosing `enter` events; preserve open frames at the end
of `stopped`/`truncated` traces. Stepping over advances to depth less than or
equal to the current event; stepping out advances to a strictly smaller depth.
Reverse stepping navigates the captured recording, not re-execution.
Create DAP variable-expansion handles in the replay adapter, not the executor.

The local .NET, HL7 Java core and Ignixa paths are recorded in Section 1.
Inspect their actual working trees before drawing conclusions about support;
the earlier GitHub reviews predate these additions. Run commands may still
need establishing. There are no definitive trace recordings at this stage.

Use representative recordings as interoperability fixtures if/when available
and permitted.
Compare phase/stack invariants, source locations, milestone variable states,
messages, outcomes and replay behavior. Compare exact event sequences only
when capture granularity is intentionally shared, not as a conformance
requirement. Preserve differences that
are valid under the contract rather than forcing superficial byte equality.
Record deviations where the changing IG and local implementations disagree.

### Trace-specific acceptance cases

Cover normal nested calls and Cartesian matches; shadowing and collection/
empty variables; source/target mutation after earlier events; Unicode and
multiline ranges across imported files; structured-source expression positions;
FHIRPath trace and FML log messages; failed checks/terminology/cancellation;
event/byte limits; failure after truncation; and incomplete-stack replay.

Assert that debug on/off yields the same transformation result or required
error and does not mutate inputs. Assert that previous event snapshots do not
change after later writes, complete traces balance correctly, stopped traces
have no synthetic unwinding exits, and all retained events have full variable
snapshots.

Add focused assertions that trace-only message formatting, variable enumeration,
cloning and serialization are not called when the observer is absent, when its
recording flag is false, or after capture reaches its limit. Distinguish these
helpers from copying/serialization required for the transformation itself.
Measure absent/inactive tracing overhead and enabled time/memory separately;
aim for a cheap guarded branch when inactive, not an unsupported claim of
literally zero overhead. Include repeated-source workloads where small
per-element costs accumulate.

Trace variables can contain clinical data. Keep capture opt-in, avoid routine
application/telemetry logging of recordings, and apply the input/output access,
retention and export protections to saved traces as well.

## 14. R4 -> STU3 resource comparison follow-up

The user initially requested an Ignixa-style comparison run, with **no engine fixes**.
The new `test:xver` suite and its comparison/path-safety helpers live in the
executor's test/testing directories. Production executor, validator and model
behavior were not changed for this investigation.

### Configuration and reference contract

- The supplied `C:\git\hl7\fhir-cross-version` path was not accessible.
  The checkout found and used explicitly was
  `C:\git\hl7-specs\fhir-cross-version`, HEAD
  `67cd00341d1b8ee34e42cdde2efc44d7fa0fe028`, with existing local map edits.
- R4 inputs: `C:\temp\r4-converted`.
- Expected STU3 outputs: `C:\temp\r3-converted`.
- Reference design: Ignixa's `FmlXverComparisonTests.cs` and fixture at HEAD
  `681bb8093ef4c612f661cadeb5d1468f72a16967`, with local changes.
- Maps are selected by input `resourceType` / map filename and invoke their
  first group. Canonical and predecessor ConceptMap URLs are registered locally.
  No network terminology or alternate-engine execution fallback is used.
- Input immutability, id preservation, known STU3 target type and JSON output
  are required before a comparison pass. Comparison ignores object order and
  equivalent decimal/exponent spelling, but preserves exact numeric value,
  string/number kinds, arrays/order/nulls and primitive companions.
- Outputs/reports must be separate from all input/reference/map directories.
  Existing files are never silently overwritten; UTF-8 BOMs are accepted.

Reproduction commands and environment variables are documented in the
[executor README](../fml-vscode-extension/fml-executor/README.md).

### Initial run result

| Measurement | Result |
| --- | ---: |
| R4 JSON input files | 2,912 |
| Reference JSON files | 2,849 |
| FML map files parsed | 148 / 148 |
| ConceptMap files / registered URLs | 2,210 / 5,480 |
| Inputs with corresponding maps | 2,851 across 108 resource types |
| Unmapped inputs (scope exclusions) | 61 across 33 resource types |
| Mapped inputs also lacking references | 2 |
| Preparation failures | 2,851 |
| Executions producing outputs | 0 |
| Actual output comparisons / passes | 0 / 0 |

Every mapped case failed during preparation, before conversion. These are
**not** 2,851 JSON output disagreements, and no successful conversions are
claimed. Preparation is cached once per type; full diagnostics are retained
once for each of the 108 failed preparations. The suite exits nonzero rather
than skipping these engine blockers. Its parent test contributes one extra
failure in TAP totals.

An independent inventory confirmed that all 2,849 paired reference resources
have known STU3 resource types matching their selected maps. The two missing
references are `observation-decimal.json` and `v2-whitespace.json`.
No expectation files were edited or reclassified as invalid.

### Issues marked for review in the initial run

Categories overlap; affected-input counts must not be added together.

| ID | Issue / evidence | Impact observed |
| --- | --- | --- |
| XVER-001 | Broad wildcard import preparation propagates an unrelated map's validation failure. `Account.fml:16` rejects possible R4 `PractitionerRole` references in `Account.subject`, and that error appears while preparing many other entry maps. | 40 preparations / 2,384 inputs report the Account diagnostic. |
| XVER-002 | Reference target-profile compatibility gates compare whole model possibilities, not just the supplied references. A concrete `account-example.json` references `Patient/example`, which both models support; its STU3 expectation preserves that reference, but preparation is blocked by another possible source target type. This needs conversion-policy/model-validation review, not an automatic weakening of checks. | Reference-profile diagnostics appear in 103 preparations / 2,816 inputs. |
| XVER-003 | Imported canonical/URI-to-Reference defaults are not accepted for some assignments. `CarePlan.fml:13` / `:46` reject `canonical -> Reference`, while the Lab validator's own default-group discovery confirms `Reference.fml` declares `canonical2Reference` and `uri2Reference` for R4 -> STU3. | Other assignment/type incompatibilities appear in 13 preparations / 133 inputs; CarePlan has 11 inputs. |
| XVER-004 | Contextual typing merges distinct backbone types into conflicts for reusable untyped groups. `CapabilityStatement.fml:88` uses `interaction` for both resource-level and system-level interaction backbones, sharing `code` and `documentation`. | Contextual conflicts appear in 2 preparations / 20 inputs; CapabilityStatement has 8 inputs. |
| XVER-005 | `extension()` is rejected as undefined by static FHIRPath validation in ImplementationGuide/Provenance maps. A synthetic call to the selected FHIRPath.js runtime successfully evaluates `extension(url).value`; the visitor also has an extension result-type branch, but function catalog lookup rejects it first. | 2 preparations / 6 inputs. |
| XVER-006 | `MedicationAdministration.fml:26` / `:27` compare CodeableConcept `$this` with string `'not-done'`. Actual inputs contain CodeableConcept arrays. Review whether the map intended a status/code check versus whether cross-type comparison should be rejected; do not assume the expectation is wrong. | MedicationAdministration: 14 inputs, with additional type/profile blockers. |
| XVER-007 | Missing expected outputs for the two filenames above. | 2 mapped inputs, independently blocked by preparation as well. |
| XVER-008 | No corresponding R4toR3 map for 61 inputs, including 20 ServiceRequest examples. | Explicit scope exclusions, not passes or engine fixes. |

Existing `C:\temp\r3-converted-ignixa` artifacts were available. Eight
representative cached outputs (Account, ActivityDefinition, Patient, Observation,
Organization, MedicationRequest, Bundle and ConceptMap) were spot-compared with
the expectations and matched. Ignixa was **not re-executed** by this investigation;
artifact revision/freshness is not asserted, and these spot checks are not a
full independent conformance result or proof that every expectation is correct.

The complete machine-readable resource/preparation report and cached-output
spot-check report are saved outside the repository in the session files under
`xver-r4-r3-comparison`. No Lab actual resource files were written because no
preparation succeeded. The new synthetic harness tests pass alongside existing
executor tests (202 total); the external conversion suite intentionally remains
failing until the marked issues are reviewed. No engine code was fixed in
that initial investigation.

### Authorized warning policy and extension shortcut fixes

The user subsequently authorized XVER-005 and treating XVER-001/XVER-002 as
warnings, while leaving other issues for review.

- **XVER-005 implemented:** FML `extension(X)` is
  `extension.where(url = X).value`, not the Extension container. Runtime
  projection preserves ordering, complex/primitive choice types and primitive
  metadata; containers without values contribute no result. Static validation
  recognizes its one-String-argument signature and projected value types.
  Generic non-FML FHIRPath callers retain the existing container behavior.
- **XVER-001 implemented:** imported semantic diagnostics are retained with
  source locations as warnings. Imported group bodies bind when invoked, so
  unused invalid bodies do not prevent an unrelated entry group from running.
  Primary-map semantic validation remains strict except for the advisory
  Reference-profile check below. Imported syntax errors, missing imports,
  ambiguous links and actual runtime errors remain fatal.
- **XVER-002 implemented:** potential Reference target-profile narrowing is a
  warning in FML validation, including editor diagnostics. A concrete supported
  `Patient/example` reference now executes despite the broader source model's
  additional possible target types. This does not disable runtime type checks.
- Imported property analyses are cached within each preparation to avoid
  repeatedly analyzing the same wildcard import graph.
- The local debug facade already preserves preparation warnings in the
  OperationOutcome alongside a successful return/complete trace; an integration
  regression now covers that behavior with the extension shortcut.

Validation: 88 validator tests, 211 executor tests, 50 language-service tests,
30 focused local-debug/replay tests and 100 focused root Jest tests pass.
The external FML corpus still has 54 accepted transformations passing with
recording on/off, the same three reviewed skips and seven incomplete cases.
The VS Code consumer type-checks. An additional function-reference documentation
suite has ten unrelated existing failures concerning N1/build URLs and missing
reference anchors; its static reference helper was not changed here.

### Newly exposed issues and comparison-run lifecycle

- **XVER-009, initially deferred:** execution now reaches inherited mappings but rejects
  cross-version complex-element assignments, including `Resource.fml:14`
  (`meta`) and `DomainResource.fml:12/14` (`text` / `extension`). The error is
  "Cross-version element assignment requires a mapping or a version-independent
  transform result." Review default-group dispatch rather than weakening the
  writer or copying cross-version objects unchanged. No engine fix for this
  newly reached blocker was made.
- **XVER-010, harness mitigation:** the first post-fix attempt exhausted Node's
  approximately 4-GiB heap after 1,916 resource cases (15 passes, 1,872 failures,
  29 unmapped). It did not finish or write its aggregate report; these are
  partial results, not a replacement baseline. Unlike the original all-failed
  preparations, successful preparations retain complete imported program
  graphs. The harness now indexes/groups inputs by resource type and retains
  only the current preparation, while still preparing once per type. This
  changes test execution ordering, not conversion/comparison semantics.
  The footprint of individual large import graphs remains a performance-review
  item; no general engine leak/constant-memory claim is made.
- **XVER-011, deferred:** primary `DocumentReference.fml` preparation now reaches
  an untyped `agent` group at line 33 whose `src.who` access has no inferred model
  type. There is no invocation of that group in the map itself, but primary
  groups are still eagerly bound. Review the unused group/map and the primary
  binding policy; the one DocumentReference input remains a preparation failure.
  The current diagnostic is reported at line 1 rather than the actual access,
  which also needs review. No map, expectation or engine fix was made for it.

Original expectation files and the three reviewed corpus skips are unchanged.
XVER-003, XVER-004, XVER-006, XVER-007 and XVER-008 remain open for review.

### Completed post-fix baseline

The bounded-preparation rerun completed in approximately 608 seconds with the
same map/input/reference directories and no increased Node heap limit.
All 148 maps still parse, and all 2,210 ConceptMaps / 5,480 URLs load.

| Measurement | Result |
| --- | ---: |
| Total inputs / mapped / unmapped | 2,912 / 2,851 / 61 |
| Successful / failed per-type preparations | 98 / 10 |
| Inputs blocked during preparation | 112 |
| Inputs reaching execution | 2,739 |
| Execution failures | 2,718 |
| Outputs written / actual comparisons / exact matches | 21 / 21 / 21 |
| Output mismatches | 0 |
| Mapped inputs lacking references, already execution-blocked | 2 |

All 21 matches are **SearchParameter** resources; this is a narrow baseline,
not broad cross-version conformance. The 2,718 runtime failures comprise
2,040 at `Resource.fml:14`, 285 at `DomainResource.fml:12` and 393 at
`DomainResource.fml:14` (XVER-009). These failures are not output disagreements.

The ten remaining failed primary preparations are CapabilityStatement (8
inputs), Consent (12), CarePlan (11), Communication (3), FamilyMemberHistory (2),
MedicationAdministration (14), MedicationRequest (40), MessageDefinition (3),
PlanDefinition (18) and DocumentReference (1). Categories overlap:
canonical/URI-to-Reference dispatch (XVER-003), contextual typing (XVER-004),
the MedicationAdministration predicate (XVER-006) and XVER-011.
ImplementationGuide and Provenance now prepare successfully with warnings;
Account likewise prepares with 179 warnings, two information diagnostics and
no errors.

The complete report and 21 actual outputs are persisted outside the repository
under session files `xver-r4-r3-after-warnings-bounded`. The earlier aborted
attempt is retained separately under `xver-r4-r3-after-warnings`; it must not be
combined with the completed run. The external suite still exits nonzero:
2,830 resource failures plus its parent test, 21 passes and 61 explicit unmapped
scope exclusions. No new fixture skips were introduced.

### XVER-009 authorized target-allocation fix

The user subsequently authorized fixing XVER-009. The actual cause was not
failure to select the imported default group: selection was correct, but
internal allocation subsequently reinterpreted the resolved target type as a
map-local alias. For example, allocating concrete `Meta` in STU3 found the
source declaration `alias Meta` for R4, changed the allocated node back to R4,
and correctly triggered the writer's cross-version safety check.

Internal creation now accepts the already resolved type/release without alias
lookup. Alias resolution is performed only at the explicit `create(...)`
transform boundary, preserving that transform's existing semantics. The same
fix covers imported default targets, explicit target aliases and automatic
dotted-path parent creation. Default-group selection, input data, map files,
expectations and the writer's version guard were not changed.

Six regressions cover imported `types` / `type+` mapping through an inherited
Resource group (including mapped output, target release, input immutability and
warm recording-off execution), implicit target aliases, dotted targets, explicit
creation aliases and rejection of an explicitly created source-release object
assigned to the target release.

All 217 executor tests and 30 focused local-debug/replay tests pass; the VS Code
consumer type-checks. The corpus retains 54 accepted transformations passing
with recording on/off, three reviewed skips and seven incomplete cases.
Smoke execution of the real imported `Resource`/`Meta` maps now succeeds, and
the real `account-example.json` conversion reaches successful completion.

The complete rerun finished in approximately 563 seconds:

| Measurement | Before allocation fix | After allocation fix |
| --- | ---: | ---: |
| Successful / failed per-type preparations | 98 / 10 | 98 / 10 |
| Inputs blocked during preparation | 112 | 112 |
| Execution failures | 2,718 | 1,051 |
| Outputs written | 21 | 1,688 |
| Actual output comparisons | 21 | 1,686 |
| Exact matches | 21 | 518 |
| Output mismatches | 0 | 1,168 |
| Successful outputs missing references | 0 | 2 |
| Unmapped inputs | 61 | 61 |

Matches now span 80 resource types, including `account-example.json`; all 21
previous passes remain passes. There are zero remaining cross-version writer
errors at the original `Resource`/`DomainResource` sites. The same guard still
reports 29 failures at other mapping sites, recorded separately below rather
than bypassed.

All 1,168 output mismatches were independently compared with existing cached
Ignixa outputs: every cached output matches its reference. Ignixa was not
re-executed, and cache revision/freshness is not asserted. A representative
CodeSystem input and reference both contain `valueCode: "pa"` while the new Lab
output contains `valueString: "pa"`. Thus the expectations were not rewritten or
skipped to accommodate the engine.

Newly reached review items (counts can overlap for output differences):

| ID | Evidence / follow-up | Observed cases |
| --- | --- | ---: |
| XVER-012 | `BackboneElement.fml:11` rejects the target type/model binding during inherited group execution. Review target backbone model inheritance and group compatibility. | 710 execution failures |
| XVER-013 | Primitive target aliases without explicit creation are rejected, e.g. `Reference.fml:28` uses `tgt.reference as r, r.value = v`. Similar sites occur in Money, OperationDefinition and other maps. Review primitive target allocation/alias support. | 307 execution failures |
| XVER-014 | Reported missing `valueCode` plus unexpected `valueString`, primarily extension values. Fixed by exact source type filtering below; the specification-warning follow-up remains open. | 1,147 cases in this historical run |
| XVER-015 | Other cross-version assignments remain blocked in ClaimResponse, CoverageEligibilityResponse, DeviceRequest, EnrollmentResponse, ExplanationOfBenefit, Patient, PaymentReconciliation and Task. Review each conversion rather than loosening the writer globally. | 29 execution failures |
| XVER-016 | Other output differences include AuditEvent source identifiers, concept definitions and Observation coding display text. Twenty-one mismatching cases have no recorded code-to-string signature; other differences can also accompany XVER-014. Cached Ignixa outputs match the expectations. | 21 cases without that signature |
| XVER-017 | `ActivityDefinition.fml:38` supplies multiple values to scalar `kind`. Review rule/evaluator cardinality against the supplied map and input. | 2 execution failures |
| XVER-018 | `primitives.fml:115` rejects the source binding to group `url`. Review URL/URI primitive compatibility and dispatch. | 2 execution failures |
| XVER-019 | `v2-tables.json` exceeds the existing work limit at `Extension.fml:17`. Review workload cost/budget; the limit was not raised to manufacture a pass. | 1 execution failure |

The previous preparation issues and two missing reference files remain open.
Both missing-reference cases now produce outputs. No additional engine fixes,
map/expectation edits or fixture skips were made for these newly reached issues.

The completed report, 1,688 actual outputs and cached-output cross-check are
persisted under session files `xver-r4-r3-after-target-allocation`, separate from
all prior runs. The external suite remains correctly failing: 518 resource
passes, 2,333 resource failures and 61 unmapped scope exclusions (plus one
failed parent test in TAP totals).

### XVER-014 exact source filtering and specification warning

Investigation confirmed an engine error, not invalid reference data. With the
actual Extension map and input `valueCode: "pa"`, tracing showed that the
`valueCode` rule first wrote the correct output. The later `valueString` rule
also selected that same code-typed source and replaced the choice with
`valueString: "pa"`. The shared compatibility helper followed the generated
model's `code -> string` base-type chain.

The same probe converted `valueId` to `valueString`. A `valuePositiveInt` probe
ran both integer and positiveInt rules but happened to finish correctly because
the more specific rule ran later. Thus an output-only comparison can conceal
the incorrect extra rule execution.

**Specification follow-up, still open:** add the following warning near source
type constraints in the [CI FML specification](https://build.fhir.org/ig/HL7/mapping-language-ig/en/fml.html).
The specification itself has not been edited or a change request filed here.

> **Warning: source type selection is not inheritance-based compatibility.**
> A source `:type` constraint selects the exact FHIR instance type, after alias
> resolution; it does not select all derived types or coerce primitive values.
> A `valueCode` must match `:code`, not also `:string`, even though `code` derives
> from `string` and both serialize as JSON strings. Likewise, `positiveInt`
> must not also select an `:integer` rule. Otherwise multiple rules can run for
> one choice value and a later assignment can overwrite the correct choice
> type. Changing rule order may hide or expose the error; it is not the fix.
> This source-selection behavior is distinct from inheritance-aware group
> input compatibility and from FHIRPath type-test semantics.

Read-only inspection of the supplied Ignixa, HL7 Java and .NET implementations
confirmed exact FHIR instance-type comparisons for source filtering. The .NET
implementation additionally normalizes System primitive names. The verified
code/id/positiveInt problem concerns concrete FHIR types, not System aliases.

The executor now separates exact, alias/release-aware source filtering from
inheritance-aware group compatibility. The writer, rule ordering, explicit
creation semantics, FHIRPath type tests, maps and expectations are unchanged.
No new runtime warning is emitted for ordinary nonmatching source types; the
warning above is a proposed specification clarification.

Twelve new regressions cover code/id/positiveInt/unsignedInt with general and
specific rules in both orders, direct string/integer selection, declared aliases,
release mismatches, and inheritance-compatible group inputs alongside exact
source constraints. Trace assertions require only the exact rule to run, even
when the final value would otherwise look correct; recording-off warm execution
and input immutability are also checked.

All 229 executor tests and 30 local-debug/replay tests pass, and the VS Code
consumer type-checks. The corpus retains 54 accepted transformations passing
with recording on/off, three reviewed skips and seven incomplete cases.
The actual imported Extension map now preserves `valueCode`, `valueString`,
`valueId` and `valuePositiveInt`, with exactly one matching value rule per probe.

The complete 2,912-input comparison rerun finished in approximately 726 seconds:

| Measurement | Before exact filtering | After exact filtering |
| --- | ---: | ---: |
| Exact matches | 518 | 1,642 |
| Output mismatches | 1,168 | 44 |
| Reported XVER-014 code-to-string mismatches | 1,147 | 0 |
| Outputs written / actual comparisons | 1,688 / 1,686 | 1,688 / 1,686 |
| Execution failures | 1,051 | 1,051 |
| Preparation failures | 112 | 112 |
| Missing references / unmapped inputs | 2 / 61 | 2 / 61 |

All 518 previous passes remain passes; no new output-mismatch cases were
introduced. Of the 1,147 former XVER-014 cases, 1,124 now pass completely and
23 retain other, already recorded output differences. Matches span 81 resource
types, and `codesystem-account-status.json` now matches its reference.
The remaining 44 mismatch cases were all present in the previous run and were
included in its cached-Ignixa/reference cross-check. They remain open for
review, alongside the unchanged runtime/preparation blockers and missing files.
No new fixture skips or map/expectation edits were made.
The existing `v2-tables.json` work-budget failure now reports `Element.fml:13`
instead of `Extension.fml:17`; exact filtering changes which operation exhausts
the same unchanged budget. All other execution diagnostics and all pre-existing
non-comparison case statuses are unchanged.

The report and 1,688 actual outputs are persisted under session files
`xver-r4-r3-after-exact-source-types`, separate from prior runs. The external
suite remains correctly failing for the unrelated open issues: 1,642 resource
passes, 1,209 resource failures and 61 unmapped scope exclusions, plus its failed
parent test in TAP totals. This run's wall time is not a controlled performance
comparison.

### User-edited BackboneElement inheritance maps: verification

The user updated the external R4-to-STU3 maps, without executor changes:

- `BackboneElement` no longer advertises a default type mapping.
- A separately named, unannotated `BackboneElementToElement` group accepts
  R4 BackboneElement and STU3 Element and extends the ordinary Element group.
- Dosage, Timing and ElementDefinition now extend that helper.

Focused conversions of `medicationstatementexample6.json`,
`devicemetric-example.json` and `structuredefinition-example-composition.json`
all execute successfully and match their expected STU3 resources exactly,
without mutating the inputs.

The complete 2,912-input comparison finished in approximately 818 seconds:

| Measurement | Before map updates | After map updates |
| --- | ---: | ---: |
| Exact matches | 1,642 | 2,038 |
| Outputs written | 1,688 | 2,094 |
| Actual output comparisons | 1,686 | 2,092 |
| Execution failures | 1,051 | 645 |
| Output mismatches | 44 | 54 |
| Preparation failures | 112 | 112 |
| Missing references / unmapped inputs | 2 / 61 | 2 / 61 |

All 1,642 prior passes remain passes; matches now span 84 resource types.
Of the original 710 XVER-012 failures, 396 now match the expected output,
301 reach the independent XVER-013 primitive-alias blocker, ten produce outputs
with other differences, and three still fail inherited target compatibility.
There were no regressions in formerly successful cases, and all previously
failing cases outside that 710-case cohort retain their prior status.

The three remaining XVER-012 failures all reach `CoverageClassSequenceGroup`
at `Coverage.fml:107`: it extends BackboneElement but receives an R4
`coverage_class` source and the whole STU3 Coverage resource as target.
Coverage derives from DomainResource/Resource, not BackboneElement or Element,
so changing this caller to the new Element-target helper would not be a valid
fix either. Review the Coverage class helper inheritance and its intended
copying/flattening semantics. Affected inputs:

- `coverage-example.json`
- `claim-example-oral-contained.json` (contained Coverage)
- `coverageeligibilityresponse-example-benefits-2.json` (contained Coverage)

The ten newly observable output mismatches are eight MedicationDispense and
two NutritionOrder examples, all involving leading/trailing whitespace that
the Lab preserves from the input but the reference output trims. Representative
values are `"Donald Duck "` versus `"Donald Duck"` and
`" Acme Diabetes Formula"` versus `"Acme Diabetes Formula"`.
Existing cached Ignixa outputs match all ten references; Ignixa was not
re-executed and cache freshness/revision is not asserted. These are additional
XVER-016 review cases, not changes to expectations or manufactured passes.
No automatic string trimming was introduced.

The independent XVER-013 count rises from 307 to 608 because those 301 newly
reachable executions now stop at `Reference.fml:28`. Its specification versus
engine-interoperability question remains open. The unrelated 29 cross-version
assignment failures, two scalar-cardinality failures, two URL binding failures,
one work-budget failure and 112 preparation failures remain.

The helper still maps `modifierExtension` into ordinary `extension`. Passing
the supplied resource expectations does not establish that this is semantically
safe. A schema-guided scan of the 710 formerly blocked inputs visited 35,620
ElementDefinition, 45 Dosage and 60 Timing instances and found no populated
`modifierExtension` on those datatypes. Thus this corpus does not exercise that
policy; the previously identified modifier-status concern remains for review.

The report, 2,094 actual outputs and before/after case classification are saved
under session files `xver-r4-r3-after-backbone-map-updates`. All 148 maps still
parse and 2,210 ConceptMaps / 5,480 URLs load. The external suite remains correctly
failing for open issues: 2,038 resource passes, 813 resource failures and 61
unmapped scope exclusions, plus its failed parent test. No engine, external
map or expectation files were edited by this verification, and no new skips
were introduced. The executor package builds successfully.

### Validator follow-up: inherited group signatures

The user requested closing the validation gap behind XVER-012. `extends` now
checks the resolved local/imported base signature before execution:

- Every inherited parameter must exist by name and retain its source/target
  mode. Reordering and additional child parameters remain supported.
- Child parameter types must be assignable to the corresponding base types
  through the selected release's model inheritance. Aliases and supplied
  logical models are resolved, and different FHIR releases are incompatible.
- Primitive values having the same wire representation are not interchangeable
  inheritance types; neither transforms nor default mapping groups coerce an
  inherited parameter. Compatible subtypes are still accepted.
- Known contextual types are checked too, including untyped helpers receiving
  resource roots. Unknown/conflicting types are not guessed; existing type
  resolution diagnostics remain available.
- Multiple candidate base signatures report an ambiguous reference instead
  of choosing one arbitrarily.
- Diagnostics identify the derived group, parameter, actual/required type and
  release, with the base group name in the `extends` clause underlined.

The shared parser/API, language service and indexed workspace validation all
use this check. Existing dependent-document revalidation picks up edits to
imported signatures. Executor preparation retains the agreed policy: primary
semantic errors are fatal; imported errors remain located warnings, and an
actually invoked incompatible inherited binding still fails at runtime.
No cross-version maps, expectations or modifier-extension policies were changed.

Validation passes: 102 validator tests (14 new), 51 language-service tests,
20 language-server tests, 230 executor tests and 30 focused local-debug/replay
tests. The 54 accepted corpus transformations still pass with recording on/off,
with the same three reviewed skips and seven incomplete fixtures. VS Code
consumer type checking passes.

A validator-only scan of all 148 current R4-to-STU3 maps with their visible
imported signatures now flags three incompatible inheritance clauses:

| Map / group | Clause line | Incompatible target |
| --- | ---: | --- |
| Coverage / CoverageClassSequenceGroup | 107 | STU3 Coverage is not a BackboneElement. |
| ImplementationGuide / definition | 41 | STU3 ImplementationGuide is not a BackboneElement. |
| ImplementationGuide / manifest | 84 | STU3 ImplementationGuide is not a BackboneElement. |

The corrected Dosage, Timing and ElementDefinition maps have no inheritance
diagnostics. The two ImplementationGuide findings are additionally exposed by
checking all known declarations, even where individual resource inputs might
not invoke those groups. All findings remain map-review items; no automatic
inheritance removal or relaxed engine checks were introduced.

The scan is saved as session file `xver-extends-validation.json`. It is not a
new resource-output baseline: the full conversion report above predates this
stricter preparation validation.

The VS Code extension and all its package dependencies also rebuild
successfully, including type checking and lint. Reload/restart the running
extension or language server to pick up the rebuilt validation bundle; no VSIX
installation was performed.

### XVER-013 unambiguous implicit primitive creation

The user confirmed that `tgt.reference` has exactly one model-defined type and
therefore does not require an explicit `create`. Here `tgt` is the STU3 Reference
datatype, but its `reference` child is a FHIR string primitive. The target alias
denotes that writable primitive element, whose value may be supplied later.

The engine now removes only the blanket prohibition on implicitly creating
primitive targets. Existing property resolution must still identify a unique
type; the allocator creates an empty node using the target property's release.
Its ordinary writer attaches the node and binds the alias so `.value`, `id` and
extension metadata updates reach the actual target field or primitive array
slot. No source value/metadata is copied in advance of a dependent conversion.
Ambiguous choice targets, incompatible assignments, invalid primitive value
kinds, cardinality and cross-version safety guards are unchanged.

The source spelling now works without explicit creation:

```fml
src.value as v -> tgt.reference as r, r.value = v;
```

**Specification follow-up, still open:** revise the CI Target Transform text
that prohibits all auto-created primitive elements. Proposed clarification:
an unambiguously typed primitive target can be allocated empty and bound to an
alias, then populated through its value/metadata children. Creation does not
itself imply copying or coercion, and unresolved choice types still require
disambiguation. Exact FHIRPath primitive identities remain version-independent;
copying whole FHIR primitive elements retains their model/release and metadata
requirements. The specification itself was not edited here.

This matches the primitive-placeholder behavior inspected in Ignixa, HL7 Java
and .NET. Read-only inspection additionally found default-group-first,
same-runtime-type-name copy fallbacks in Java/.NET; those name checks alone
should not be mistaken for proof of FHIR release equality. Our copy/type-version
policies were not relaxed as part of this allocation change.

Validation passes: 237 executor tests (seven additional cases), 31 focused
local-debug/replay tests, and the same 54 accepted corpus transformations with
recording on/off. Existing three reviewed skips and seven incomplete fixtures
are unchanged. Regressions cover empty versus populated aliases, cross-version
System.String leaf copying, no eager source-metadata copy, primitive array
slots/companions, omission of empty placeholders, metadata-only primitives,
concrete choice names and rejection of ambiguous choices. The local debugger
preserves its existing empty-collection snapshot representation before a
primitive alias is populated.

Focused real-map conversions for ActivityDefinition supply request, Measure
composite and Immunization refused now execute and match the expected STU3
outputs exactly. ChargeItem instead reaches the separate version-safety guard
at `Money.fml:14`, where an R4 code wrapper is assigned into a target primitive's
value; this newly reachable assignment is not repaired by weakening the guard.
No cross-version map or expectation files were edited.

The full comparison (also including the newly added `extends` validation)
completed in approximately 1,524 seconds:

| Measurement | Previous resource run | Current run |
| --- | ---: | ---: |
| Exact matches | 2,038 | 2,584 |
| Outputs written / actual comparisons | 2,094 / 2,092 | 2,669 / 2,667 |
| Execution failures | 645 | 65 |
| Output mismatches | 54 | 83 |
| Preparation failures | 112 | 117 |
| Missing references / unmapped inputs | 2 / 61 | 2 / 61 |
| Primitive-target explicit-transform errors | 608 | 0 |

Of the 608 former XVER-013 cases, 549 now match, 29 reach other runtime
blockers, 29 produce outputs with other differences, and one is rejected by
the new primary-map inheritance validation. The latter is the
ImplementationGuide example, not a primitive-creation failure.

Of the 2,038 prior passes, 2,035 remain passes. The three changed cases are
`coverage-example-2.json`, `coverage-example-ehic.json` and
`coverage-example-selfpay.json`: the previously added `extends` validator now
rejects their map's incompatible CoverageClassSequenceGroup declaration.
Coverage's fourth example was already an execution failure; all four now fail
preparation. These five newly detected preparation failures (four Coverage,
one ImplementationGuide) arise from the independent validation change, not a
relaxation or regression in primitive value copying.

The 29 newly observable mismatches include text/whitespace differences,
StructureDefinition mapping/XPath strings, unexpected Timing event content and
Measure/MeasureReport stratifier content. Existing cached Ignixa outputs match
all 29 references; Ignixa was not re-executed and freshness is not asserted.
The previous 54 mismatches remain mismatches. Expectations were not edited,
trimmed or skipped to manufacture matches.

Remaining runtime failures are now:

| Issue | Observed cases |
| --- | ---: |
| Other cross-version assignments (XVER-015), including 17 Money, two ImmunizationRecommendation, one Immunization and one DataRequirement newly reached cases | 50 |
| ActivityDefinition scalar `kind` cardinality (XVER-017) | 6 |
| URL source binding (XVER-018) | 2 |
| Coverage helper inheritance reached through contained resources (XVER-012) | 2 |
| Work budget (XVER-019): dataelements, extension-definitions, profiles-others and v2-tables | 4 |
| Unresolved contextual type in imported CapabilityStatement interaction (XVER-004), reached from profiles-resources | 1 |

Matches span 86 resource types. All 148 maps still parse and the same 2,210
ConceptMaps / 5,480 URLs load. The longer wall time includes substantially more
completed conversions and large newly reachable bundles; it is not a controlled
performance comparison, and no work limit was raised.

The complete report, 2,669 actual outputs, case-transition summary and new
cached-output cross-check are persisted under session files
`xver-r4-r3-after-implicit-primitives`. The external suite remains correctly
failing for open issues: 2,584 resource passes, 267 resource failures and 61
unmapped scope exclusions, plus its failed parent test. No new skips were added.

### Xver-driven performance review

The user requested profiling the conversion-time outliers rather than relying
only on synthetic workloads. The starting report has 2,734 timed executions:
2,145 below 100 ms, 384 at 100-500 ms, 110 at 500-1,000 ms and 95 at or above
one second. The longest passing resource is `contract.profile.json` at
8,682.5 ms. Four large bundles instead exhaust the existing work budget, taking
approximately 12.8-15.9 seconds; those are not successful-conversion latencies.
Preparation is already recorded separately from `conversionMs`.

The new `benchmark:xver` command loads selected cases from a saved comparison
report, prepares a fresh program per case, reports first execution separately,
then collects seven samples after three additional warm-ups with tracing off.
Only `execute` is timed. Parsing, request construction, output serialization,
input immutability checks and comparisons are outside the timed/profiled
execution. Saved actual outputs, not adjusted expectations, are the output
oracle; failure workloads must retain their exact diagnostics. Environment,
map/input hashes and output hashes are recorded. The selected before/after
runs used the same map/input hashes and produced identical output hashes.

The execution-only CPU profile identified repeated choice reads as the largest
avoidable cost: typed rules repeatedly enumerated every possible `value[x]`
wire name, including when those fields were absent. This is especially costly
in the many ElementDefinition choice rules. Repeated path parsing was another
cost. A first iteration merely cached the choice-name arrays and had little
effect on Contract latency; indexing the fields actually present was needed.

The implementation now:

- Caches immutable parsed paths and static model read selections per program.
- Selects actual own fields using an index instead of scanning all possible
  choice types for each read.
- Preserves model-defined choice order, primitive value/metadata pairing,
  metadata-only fields and non-enumerable own fields.
- Reads current values on every access; it does not cache mutable inputs,
  targets, source matches or execution results.
- Avoids redundant empty-path reader calls for direct variable contexts.

Controlled warm execution medians on Windows / Node 22.15.0 /
Intel i7-11370H (seven samples each):

| Workload | Before ms | After ms | Reduction |
| --- | ---: | ---: | ---: |
| contract.profile.json | 1,527.5 | 1,046.6 | 31.5% |
| explanationofbenefit.profile.json | 2,351.6 | 1,236.6 | 47.4% |
| cqllibrary.profile.json | 262.6 | 130.9 | 50.2% |
| profiles-types.json | 5,542.7 | 2,199.8 | 60.3% |
| patient-example.json, small control | 16.5 | 10.4 | 36.9%, noisy/overlapping ranges |

The table uses the final-code confirmation run. In the first optimized series,
Contract's seven samples were all below one second (795.5-976.3 ms), versus
1,475.4-1,862.7 ms before. Its final confirmation varied more (586.1-1,487.1 ms),
so sub-second execution is not a guarantee. The other three larger workloads
had non-overlapping before/final sample ranges. Patient's ranges overlap, so
do not interpret its percentage as a reliable small-workload speedup. Both
optimized series and the original samples are retained rather than selecting
only the most favorable observations.

The original 8.6-second Contract and 6.1-second CQL Library observations were
not reproduced in isolated runs. The controlled pre-change first executions
were 1,864.8 ms and 384.2 ms respectively. Do not claim that this optimization
alone explains the entire original outlier: whole-process state, first-use
work, JIT/GC and shared-machine scheduling can affect those observations, but
the original incident was not profiled. The valid comparison is the controlled
before/after pair, not original whole-suite times versus warmed isolated times.

Preparation still costs approximately 3-5 seconds per selected map in these
runs and was not optimized here. Large successful bundles can still require
multiple seconds. `extension-definitions.json` retains its exact work-limit
failure with unchanged limits in a separate repeated failure workload (three
samples, one warm-up; 7,592.0 ms median). No limit was raised to manufacture
completion, and no universal sub-100-ms budget is claimed.

Memory snapshots are recorded, but no memory reduction/leak claim is made:
the processes have cumulative JIT/model/allocator state and added static
caches. CPU profiles contain instrumentation overhead; the timing table uses
the unprofiled sample series.

Artifacts in session files: `fml-xver-performance-before.json`,
`fml-xver-performance-after-confirmation.json`,
`fml-xver-performance-final-comparison.json` and
`fml-xver-performance-limits.json`. Intermediate name-cache/probe reports
and CPU profiles are retained as investigation evidence, not conformance
recordings. The benchmark command and reproduction options are documented in
the executor README.

The full xver rerun completed in approximately 1,283 seconds versus 1,524 in the
previous resource run. Descriptively, executions at or above one second dropped
from 95 to 15 and those below 100 ms increased from 2,145 to 2,373. Summed
conversion timings changed from 469.8 to 186.7 seconds; summed preparations
were 467.3 versus 448.9 seconds. These whole-suite observations are not a
controlled attribution of every timing difference to the optimization.
Preparation/import analysis and parsing/comparison/reporting remain substantial
costs outside the optimized execution path.

Conformance outcomes are 2,586 exact matches, 81 output mismatches, 65 execution
failures, 117 preparation failures, two missing references and 61 unmapped
inputs. All 65 execution diagnostics are unchanged. Of 2,669 paired actual
outputs, 2,666 are byte-for-byte identical to the earlier run. The three changed
files are `search-parameters.json`, `v3-codesystems.json` and
`codesystem-program.json`: their R4 input files were independently updated after
the prior outputs were generated. All differences are trimmed source strings
that the new outputs copy exactly (40, two and one changed strings respectively).
No trimming was added to the engine. Thus two additional matches are attributable
to input cleanup, not a functional performance fix; v3-codesystems retains other
reference differences.

Final compatibility review also identified repeated wire alternatives in some
STU3 model choice lists (for example multiple Reference profiles). The index
retains those entries rather than silently deduplicating the prior reader's
behavior. A structural equivalence test covers every generated R4/STU3 choice,
including metadata-only and non-enumerable fields, alongside live-value,
duplicate-alternative and ordering regressions. The final-code confirmation
benchmarks retain the exact map/input/output hashes.

Validation: 241 executor tests, 31 local-debug/replay tests and the same 54
accepted corpus transformations with recording on/off pass. The three reviewed
skips and seven incomplete fixtures remain unchanged. No maps, references,
source examples, evaluation limits or known issue semantics were edited as part
of this performance pass.

The full comparison report and actual outputs are saved separately under
`xver-r4-r3-after-performance`. The external suite remains correctly failing for
the pre-existing open issues: 2,586 resource passes, 265 resource failures and
61 unmapped scope exclusions, plus its failed parent test.

The final VS Code extension/dependency build, type check and lint also pass.
The benchmark entry remains Node-only and the executor's browser bundle remains
covered by its package tests.
