# Custom Model Generator — Plan

This document captures the plan for generating the `TypeModel` / `ElementModel` dictionaries
defined in [helpers/custom_model.ts](../helpers/custom_model.ts). These dictionaries are the
schema-side input for FML mapping validation (and any future structural reasoning), distinct
from the runtime evaluation `Model` shape that fhirpath.js consumes.

## Status (current implementation)

Stage 1 is complete; Stage 2 has had its JSON outputs prepared as a size-preview only
(no loader yet).

### Stage 1 — TS dictionaries (DONE)
- [x] Hand-written shared `helpers/models/generated/system-types.ts` with the eight
  `System.*` TypeModels and `fhirPrimitiveToSystemTypeName` map.
- [x] Generator at `scripts/generate-models/` (`fetch-bundles`, `build-type-model`,
  `emit`, `index`, `sd-types`).
- [x] CLI: `npm run generate:models -- --version <r4|r4b|r5|r6>` (repeatable; default
  = all four). Flags `--from-dir`, `--base-url`, `--force`, `--no-write`.
- [x] Bundle fetching with on-disk cache under `scripts/generate-models/.cache/<version>/`
  (gitignored).
- [x] Pass 1 — collect & classify SDs by `kind`; skip `derivation === "constraint"`
  (profiles) and `kind === "logical"`.
- [x] Pass 2 — flatten elements per type; map `type[]` to `ElementTypeModel`s; detect
  `IsArray` (`max !== "1"`/`"0"`), `Required` (`min ≥ 1`), `[x]` choice elements
  (sorted alphabetically by TypeName).
- [x] Pass 3 — promote `BackboneElement` / `Element` (anonymous) into synthetic
  `<parent>_<child>` TypeModels (recursive); resolve `contentReference`s including
  recursive (`Questionnaire.item.item`).
- [x] Pass 4 — `byUrl` and `byTypeName` indexes; synthetic backbones get a minted
  `http://fhir.forms-lab.com/custom-model/<version>/<typename>` URL; `System.*` types
  spread in by reference so identity is preserved across versions.
- [x] Pass 5 — emit per-category TS modules + per-version `index.ts`.
- [x] Self-consistency check (dangling references, duplicate URLs/TypeNames,
  primitives carrying Elements).
- [x] Resolve System.* type-code URLs via `structuredefinition-fhir-type` extension
  (`Resource.id`, `string.value`, etc. — real HL7 SDs use the System URL).
- [x] R4 / R4B / R5 / R6 dictionaries generated and committed (R6 sourced from
  `https://hl7.org/fhir/6.0.0-ballot4/` since `/R6/` 404s).
- [x] **Differential walk** — generator reads `sd.differential.element[]`, not the
  snapshot. Inherited elements live on the BaseTypeName chain only; consumers walk
  inheritance.
- [x] **Backbones co-located with their parent** — backbones are emitted into the
  same per-category TS file as their root parent (resources / complex-types) and
  appear immediately after the parent. The separate `backbones.ts` was removed.
- [x] Fixture-driven unit tests (25, all green); full suite 106/106.

### Stage 2 preview — JSON dictionaries (PARTIAL — emit only)
- [x] JSON emit alongside TS, produced by the same `npm run generate:models` run.
- [x] One JSON file per top-level type at
  `helpers/models/generated/<version>/models/<TypeName>.json`, keyed by `TypeName`,
  carrying the parent and all its synthetic backbone descendants.
- [x] `helpers/models/generated/<version>/models/index.json` with three sections:
  - `byUrl`: canonical URL → JSON filename (empty string ⇒ inline `system`)
  - `byTypeName`: TypeName → JSON filename (empty string ⇒ inline `system`)
  - `system`: the eight `System.*` TypeModels inlined, eagerly available
- [ ] **Loader** — not implemented. JSON exists for size review only.
- [ ] **Validator prefetch pass** — not implemented.
- [ ] Static asset placement under `static/models/<version>/` — not done.
- [ ] Switch build to JSON and remove bundled TS — not done.

### File-size snapshot (R4, current generator output)

| Output                              | Size  |
|--------------------------------------|-------|
| `r4/resources.ts` (incl. backbones) | ~664 KB |
| `r4/complex-types.ts`               | ~44 KB  |
| `r4/primitives.ts`                  | ~8 KB   |
| `r4/index.ts`                       | ~4 KB   |
| `r4/models/` directory total        | ~1.6 MB |
| `r4/models/index.json`              | ~106 KB |
| `r4/models/Patient.json`            | ~5.4 KB |
| `r4/models/Questionnaire.json`      | ~9.2 KB |
| `r4/models/Bundle.json`             | ~4.8 KB |

R5 is the largest dictionary (~2.0 MB JSON, ~852 KB resources.ts). Per-resource JSON
files are in the single-digit-KB range — small enough that lazy-load is cheap.

---

## Goals

- Produce read-only, immutable, per-FHIR-version dictionaries of `TypeModel`s, indexed by
  canonical URL (and a secondary `TypeName` index).
- Cover R4, R4B, R5, R6 core types in stage 1 — no profiles, slices, discriminators,
  fixed/pattern values, or terminology bindings.
- Share `System.*` primitive types across all version dictionaries by reference (single
  source module, multiple indexes).
- Be deterministic so version-bump diffs are reviewable.

## Non-goals (stage 1)

- Profiling and slicing.
- Fixed/pattern values, bindings, invariants.
- Search-parameter metadata (kept out — it's evaluator concern, not validator concern).
- Logical models. The shape supports them; the generator can extend later.

## Source of truth

Use the official FHIR definition Bundles published directly by HL7 — no tarball
extraction required. For each version, three Bundles cover everything stage 1 needs:

| File                          | Contents                                              |
|-------------------------------|--------------------------------------------------------|
| `profiles-resources.json`     | All resource StructureDefinitions.                    |
| `profiles-types.json`         | All complex-type and primitive-type StructureDefinitions. |
| `profiles-others.json`        | Other (e.g. logical types) — optional, stage 2+.      |

URLs follow the form (examples):

- R4:  `https://hl7.org/fhir/R4/profiles-resources.json`, `…/profiles-types.json`
- R4B: `https://hl7.org/fhir/R4B/profiles-resources.json`, `…/profiles-types.json`
- R5:  `https://hl7.org/fhir/R5/profiles-resources.json`, `…/profiles-types.json`
- R6:  `https://hl7.org/fhir/R6/profiles-resources.json`, `…/profiles-types.json`
  (or the current build URL while R6 is in flight)

Each file is a FHIR `Bundle` whose entries are `StructureDefinition` resources.
Generation iterates `Bundle.entry[].resource` and reads
`StructureDefinition.differential.element[]` so each emitted `TypeModel` only
contains the elements introduced by that SD. Inherited elements live on the
`BaseTypeName` chain (`Patient` → `DomainResource` → `Resource` → `Element`),
and consumers walk inheritance at lookup time.

`System.*` primitives (`System.String`, `System.Boolean`, `System.Integer`,
`System.Decimal`, `System.DateTime`, `System.Date`, `System.Time`, `System.Quantity`)
are not in those Bundles. Author them by hand once in a shared module — they're
version-independent and total ~8 entries.

## Output layout

```
helpers/models/generated/
  system-types.ts           // hand-authored, NOT generated — System.* TypeModels
  r4/
    index.ts                // exports byUrl, byTypeName (Readonly)
    resources.ts            // generated — resources + their synthetic backbones
    complex-types.ts        // generated — complex types + their synthetic backbones
    primitives.ts           // generated (FHIR `string`, `boolean`, ... containers)
    models/                 // Stage-2 preview JSON (one file per top-level type)
      <TypeName>.json
      index.json            // byUrl/byTypeName → filename + inlined System.*
  r4b/  (same shape)
  r5/   (same shape)
  r6/   (same shape)
```

Synthetic backbones (`patient_contact`, `questionnaire_item_enableWhen`, …) are
emitted into the same TS file as their root parent and appear immediately after
that parent. There is no separate `backbones.ts` — backbones are meaningless
without their parent and always co-accessed.

Each version's `index.ts` imports `system-types.ts` and spreads it into the dictionaries
so `System.*` instances are shared by reference across versions.

## Generator project layout

Standalone TS, run offline, output committed to source control:

```
scripts/generate-models/
  index.ts                  // CLI entry: pick version(s), download Bundles, emit
  fetch-bundles.ts          // download profiles-resources.json + profiles-types.json
  build-type-model.ts       // SD -> TypeModel transformation
  emit.ts                   // serialise to TS modules
  __tests__/
    golden/                 // checked-in expected outputs for a few key types
    self-consistency.test.ts
```

Run via `npm run generate:models -- --version r6` (script entry to be added in
[package.json](../package.json) later).

## Transformation pipeline

### Pass 1 — collect & classify

Walk every SD in the package and bucket by `kind`:

| SD.kind          | Generator behaviour                                                         |
|------------------|------------------------------------------------------------------------------|
| `primitive-type` | Emit a complex `TypeModel` with `id`, `extension`, `value` elements.        |
|                  | `value` element points at the matching `System.*` type.                     |
| `complex-type`   | Emit a single `TypeModel`.                                                   |
| `resource`       | Emit a single `TypeModel`.                                                   |
| `logical`        | Defer (stage 1 = core only).                                                |

### Pass 2 — flatten elements per type

For each SD, walk `differential.element[]`. The first row is normally the SD's own
root (`id === sd.type`) and is skipped. Remaining rows have `path = TypeName.foo.bar`
and describe elements introduced by *this* SD; inherited rows live on ancestor SDs
and are resolved through `BaseTypeName` at lookup time. For each element:

- Resolve `type[]` into one or more `ElementTypeModel`s.
- Drop `Extension`-typed boilerplate elements where appropriate (no, keep them — FML
  navigates them; they're cheap).
- Keep `targetProfile` only when the element's type is `Reference`. Drop the
  `http://hl7.org/fhir/StructureDefinition/` prefix or keep it? Stage 1: keep full
  canonical URL — simpler, costs ~40 chars × thousands. Revisit if size hurts.
- Detect choice elements: element `id` ends in `[x]`. Keep the `[x]` suffix in
  `ElementName`; list every `type[]` entry in `Type[]`.
- Detect `IsArray`: `max !== '1'` (covers `*` and any integer > 1).

### Pass 3 — promote BackboneElements / contentReferences

This is the only structurally non-trivial pass.

- When an element's `type[0].code` is `BackboneElement` or `Element` (anonymous nested
  structure), generate a synthetic `TypeModel` named `<parenttype>_<childpath>` in
  lower_snake form. Move all descendant elements into the synthetic type's `Elements`
  rather than the parent's.
- Replace the element's `Type` with a single entry pointing at the synthetic type.
- When an element has `contentReference` (e.g. `#Questionnaire.item`), resolve that
  path to whichever synthetic type was generated in the previous step and point at it.
  Recursion (`Questionnaire.item.item`) falls out automatically — the inner element
  ends up pointing at the same synthetic type as its parent.

This pass is recursive: backbones can nest (e.g. `Questionnaire.item.enableWhen`).

### Pass 4 — build dictionaries

Once every `TypeModel` is finalised, assemble the two per-version indexes. The
canonical URL is **not** stored on `TypeModel` itself — it lives only as the key in
`byUrl`. The generator carries `(url, model)` pairs through generation in a side
table and writes them into the index at emit time.

- `byUrl: Record<canonicalUrl, TypeModel>` — keyed by `StructureDefinition.url`. The
  authoritative identifier; used to cross-reference between versions and from FML
  `uses` statements.
- `byTypeName: Record<TypeName, TypeModel>` — keyed by `TypeModel.TypeName`. Used for
  intra-version lookup when an `ElementTypeModel.TypeName` is encountered during a
  walk. Asserted unique per version.

Both indexes hold *references* to the same `TypeModel` instances, so identity is
preserved and `byUrl[url] === byTypeName[name]` for any matched pair.

Synthetic backbone types do not have a real canonical URL from HL7. Mint one of the
form `http://fhir.forms-lab.com/custom-model/<version>/<typename>` (e.g.
`.../r4/questionnaire_item`) so they're addressable in `byUrl` too. This keeps every
`TypeModel` reachable through both indexes without special-casing backbones in
consumers.

Merge `system-types.ts` into both indexes by spreading its exports. The same object
instances appear in every version's index, preserving cross-version identity.

```ts
// generated, conceptually:
const Patient: TypeModel = { TypeName: "Patient", BaseTypeName: "DomainResource", Elements: [ /* ... */ ] };
const Observation: TypeModel = { /* ... */ };
// ...

export const byUrl: Readonly<Record<string, TypeModel>> = Object.freeze({
  "http://hl7.org/fhir/StructureDefinition/Patient":     Patient,
  "http://hl7.org/fhir/StructureDefinition/Observation": Observation,
  ...systemTypesByUrl,
  "http://fhir.forms-lab.com/custom-model/r4/questionnaire_item": questionnaire_item,
  // ...
});

export const byTypeName: Readonly<Record<string, TypeModel>> = Object.freeze({
  Patient,
  Observation,
  ...systemTypesByTypeName,
  questionnaire_item,
  // ...
});
```

#### Reverse lookup (URL from a TypeModel)

Most consumers go URL → TypeModel and never need the reverse. If a use case turns up
(e.g. error messages that want to print the canonical URL of a type), expose it
lazily without baking the URL onto the model itself:

```ts
const urlByModel = new WeakMap<TypeModel, string>();
for (const [url, m] of Object.entries(byUrl)) urlByModel.set(m, url);
export function urlOf(m: TypeModel): string | undefined { return urlByModel.get(m); }
```

Stage 1 plan: don't ship reverse lookup until something needs it.

### Pass 5 — emit

- Sort `TypeModel`s by canonical URL within each category. Synthetic backbones
  are then spliced in right after their parent (preserving their original
  differential-document encounter order), so a parent and its backbones travel
  together inside the file.
- Sort each TypeModel's `Elements` by their original differential order
  (preserve, don't re-sort alphabetically — order matters for some readers).
- Sort `Type[]` and `TargetProfile[]` arrays alphabetically.
- Emit TS object literals with `as const` / explicit `Readonly<...>` typing so the
  compiler enforces immutability.
- Emit the per-version `index.ts` containing the dictionary assembly shown above.

## Edge cases

- **`Resource` element** (`Bundle.entry.resource`, `Parameters.parameter.resource`,
  `DomainResource.contained`): type is the abstract `Resource`. Emit it as-is — the
  validator treats `Resource` as "any resource type" at walk time.
- **`Reference(Any)`**: omit `TargetProfile`. Missing `TargetProfile` = no constraint.
- **Empty / root `type[]`**: the SD's root element has no `type[]` (it *is* the type).
  Skip when iterating elements.
- **Slicing in differential**: ignore for stage 1. Filter out elements whose `id`
  contains `:sliceName`. Keep the unsliced base element only.
- **Choice element slices**: differential may include `Observation.value[x]:valueQuantity`
  rows. Take the `[x]` base row; ignore the slice rows.
- **`Extension`-typed elements**: keep them (FML can navigate `.extension`).
- **Profile constraints on element types**: ignore (`type[].profile`); use the bare
  type code only.

## Self-consistency check

End of generation, before emit:

- For every `ElementTypeModel.TypeName` in every dictionary, assert it resolves either
  in the version's `byTypeName` index or in the shared `System.*` set. Fail the
  generator if any dangling reference remains. Catches missed backbone promotion and
  unresolved `contentReference`s.
- Assert every `byUrl` entry has a unique `TypeName` within the version.
- Assert no element in a non-primitive type has `IsPrimitive` truthy.

## Golden tests

Checked-in expected outputs for a small, representative set:

- `Patient` — basic resource with references and choice-less elements.
- `Observation` — extensive `value[x]` choice and BackboneElement (`component`,
  `referenceRange`).
- `Questionnaire` — recursive `item` via contentReference.
- `Reference` — exercises `TargetProfile` handling.
- `string` — exercises FHIR-primitive container + `System.String` linkage.
- `Extension` — recursive via `value[x]` polymorphism.

If a generator change alters any golden output, the diff must be reviewed and the
golden updated deliberately.

## Suggested order of work

Lowest-risk staged path. Each step is independently testable and yields something
useful before the next begins.

1. Hand-write `helpers/models/generated/system-types.ts` (8 entries).
2. Generator skeleton: load one SD (Patient), emit a single `TypeModel`. Complex
   element handling only — no backbones, no choice.
3. Add backbone promotion + `contentReference` resolution.
4. Add choice (`[x]`) handling.
5. Add FHIR primitive container SDs (`string`, `boolean`, ...).
6. Run across all SDs in a single package (start with R4).
7. Add self-consistency check + golden tests.
8. Run for R4B, R5, R6 and commit outputs.

## Open decisions

- **TS object literals vs JSON imports**: leaning TS (matches existing `models/r6/`
  style; debuggable; tree-shakeable per file).
- **Per-category file split**: leaning yes — `resources.ts`, `complex-types.ts`,
  `primitives.ts`, `backbones.ts` per version. Friendlier diffs.
- **Generator script location**: `scripts/generate-models/`.
- **Bundle fetching**: plain HTTPS GET of `profiles-resources.json` and
  `profiles-types.json` from `https://hl7.org/fhir/<version>/`. No tarballs, no
  package extraction, no `npm pack` shellout. Cache the downloaded Bundles under
  `scripts/generate-models/.cache/<version>/` so re-runs are offline-capable.
- **`TargetProfile` URL prefix stripping**: defer; only revisit if size becomes an
  issue.

## Stage 2 — lazy-loaded JSON dictionaries (future optimisation)

Once stage 1 is in place and working, the bundled-TS dictionary can be replaced with
on-demand-loaded JSON for smaller initial payload and lower memory use, particularly
when only a few resource types are touched in a given session.

### Shape

- **Index file** (small, eagerly loaded): `byUrl: Record<string, string>` mapping
  canonical URL → JSON filename (e.g.
  `"http://hl7.org/fhir/StructureDefinition/Patient": "Patient.json"`).
- **Per-type JSON files** (loaded on demand): one file per top-level `TypeModel`,
  containing the type itself and all of its synthetic backbone descendants
  (`Questionnaire.json` carries `Questionnaire`, `questionnaire_item`,
  `questionnaire_item_enableWhen`, ...). Backbones are meaningless without their
  parent and always co-accessed.
- **`System.*` types**: ship inline in the index file or in a tiny eagerly-loaded
  shared module. Eight entries, touched by every validation, not worth a network
  round-trip.

### Loader

A thin module sits in front of the dictionary:

- Takes a canonical URL.
- Checks an in-memory cache; returns immediately on hit.
- Otherwise dynamically fetches the JSON file named in the index, freezes the
  parsed object (and its descendants), caches it, returns it.
- Cache key includes the FHIR version dictionary identity — `Patient` in R4 ≠
  `Patient` in R5.

### Static asset placement

Files live under `static/models/<version>/` so Nuxt 2 SPA serves them as static
assets, browser-cached, individually small (a few KB each).

### Validator integration

Lazy loading is inherently async. To avoid scattering `await`s through validation
logic, the validator should run a **prefetch pass**:

1. Walk the FML mapping's `uses` clauses + transitive type references to collect all
   URLs that will be needed.
2. `await Promise.all(...)` to warm the cache.
3. Run validation synchronously against the now-warm cache.

This keeps the hot path synchronous and the API ergonomic.

### Migration steps when stage 2 begins

1. Add a JSON-emit mode to the generator (mechanical; same in-memory representation
   as TS emit).
2. Add a loader module in front of the validator (replaces direct dictionary
   access).
3. Add the prefetch pass to the validator.
4. Switch the build to use the JSON output and remove the bundled TS dictionaries.

### Implications for stage 1 design

Nothing in stage 1 needs to change for stage 2 to be possible later, but a few
choices keep the door wide open:

- Validator API uses a **lookup function** (`(url) => TypeModel`), not direct
  dictionary access. Stage 1 implements it as a synchronous map read; stage 2
  swaps in the lazy loader without touching call sites.
- Backbone types are emitted alongside their parent type from the start, so the
  per-file split in stage 2 is just "split by top-level type" — no re-association
  needed.
- The dictionary is treated as immutable from day one, so caching downstream of
  the loader is safe by construction.

## Related files

- [helpers/custom_model.ts](../helpers/custom_model.ts) — interface definitions and
  conventions consumed by this generator.
- [models/r6/index.ts](../models/r6/index.ts) — example of the *fhirpath.js* runtime
  model (different shape, different purpose, kept alongside).
