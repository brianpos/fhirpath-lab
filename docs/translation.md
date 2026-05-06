# Internationalisation of the FHIRPath Lab — exploration

> **Status:** discussion paper, no code changes.
>
> **Purpose:** to take to European HL7 affiliates (HL7 Deutschland, HL7
> Switzerland / eHealth Suisse, HL7 Austria, HL7 Sweden / Inera) and ask
> a single primary question:
>
> > *Would a localised FHIRPath Lab UI in your jurisdiction's language
> > materially help user training, or is the English version adequate
> > for your audience?*
>
> Everything below is framing for that conversation: what the affiliates
> would be opting into, what it would (and would not) cost, and what they
> would need to commit if the answer is "yes please".
>
> **Scope:** the in-progress **Vue 3 / Nuxt 4 migration** in
> [`vue3-src/`](../vue3-src/) only. The current Nuxt 2 production app is
> explicitly **out of scope** — any localisation effort would land in the
> rewrite, not be back-ported.

---

## 1. The question we are actually asking

The FHIRPath Lab is a developer / implementer tool. Its users are typically
people who already read FHIR specifications, FHIRPath grammar, JSON, XML,
HTTP traces, and OperationOutcomes — *all of which are English by definition*.
A localised chrome around an English domain is not automatically useful, and
in some communities can actively get in the way (people search for English
error messages, paste English snippets into Stack Overflow, etc.).

So before any translation work is committed to, we want each affiliate to
tell us:

1. **Who is the audience for FHIRPath Lab in your jurisdiction?**
   * Implementers writing production code? Then English is probably fine.
   * Clinicians, terminologists, analysts, students learning FHIR for the
     first time? Then a localised UI may genuinely lower the barrier.
   * Mixed audience used in classroom-style training (HL7 Affiliate
     courses, university modules, vendor onboarding)? Worth localising
     the chrome and the privacy / safety copy at minimum.

2. **What is the language reality on the ground?**
   * Germany / Austria — German is overwhelmingly the working language for
     non-developer roles; developers are typically bilingual.
   * Switzerland — multilingual (de-CH, fr-CH, it-CH); choosing one
     language can disadvantage two of the three regions.
   * Sweden — Swedish FHIR developers are typically very comfortable in
     English; Swedish localisation is mainly a polish / training-aid
     question, not a comprehension question.

3. **Would the affiliate help maintain the translations?**
   Translation of FHIR-specific terminology ("expression", "bundle",
   "narrative", "value set", "concept map", "invariant", "slicing") is the
   hard part, and is exactly where machine translation is weakest. If an
   affiliate cannot offer at least native-speaker review, a localised
   build risks being worse than no localisation at all.

4. **Is there a *training scenario* where English is a blocker today?**
   Concrete examples are more useful than abstract preference. e.g.
   "we run a 2-day Questionnaire authoring workshop for hospital IT
   staff and the UI labels are the bottleneck" is a much stronger
   signal than "translation would be nice".

If the answers across all four affiliates are "English is adequate for
our audience", we should not localise. The cheap-prep work in §4 still
makes sense regardless.

---

## 2. What an affiliate would be opting into

If an affiliate says yes, here is the realistic shape of the commitment.

### 2.1 What the FHIRPath Lab project would deliver

* The Vue 3 rewrite (`vue3-src/`) wired for `vue-i18n` + Vuetify 3 locale,
  with English as the source of truth and a locale switcher in the
  header.
* A locale fall-back chain so that regional variants don't multiply
  effort: `de-AT → de → en`, `de-CH → de → en`, `fr-CH → fr → en`,
  `it-CH → it → en`, `sv-SE → sv → en`. The vast majority of strings
  live at the language root; the regional file overrides only what
  genuinely differs (date format, a handful of region-specific terms).
* A small per-locale "deployment defaults" mechanism so a German
  affiliate's preferred example FHIR server, terminology server and
  `displayLanguage` can be pre-populated.
* English as the permanent fallback so a missing key never produces a
  blank UI.

### 2.2 What the affiliate would commit to

* Initial translation pass (or review of a machine-translated seed) for
  the chrome strings — order of magnitude **a few hundred short
  strings**, not thousands. The lab is a small surface compared with
  e.g. an EHR.
* **Native-speaker review of FHIR terminology choices.** This is the
  single most important contribution. Aligning with the affiliate's
  published glossaries (e.g. HL7 Deutschland's German FHIR glossary)
  matters more than any code we write.
* Ongoing review when new strings are added — typically a handful per
  release, surfaced via a CI check that flags missing keys.
* Pointing us at the right defaults: example FHIR server, terminology
  server, `displayLanguage` value, canonical base URL for examples.

### 2.3 What is explicitly *not* being offered

* No translation of FHIR specification text, value-set displays,
  StructureDefinition descriptions, or other content that comes from
  the wire. That is the responsibility of the FHIR server / terminology
  server the lab is pointed at. (We can pass `displayLanguage` on
  terminology calls so the *server* returns localised displays — but
  that is not "the lab being translated".)
* No translation of the `docs/` walkthroughs in the first round.
* No translation of user-supplied content (Library names, Questionnaire
  item text, StructureMap descriptions). That is the publisher's job.
* No translation of AI-generated explanations as a static catalogue. The
  right answer there is a one-line addition to the system prompt asking
  the model to reply in the user's locale.
* No right-to-left support (none of the candidate locales need it).

---

## 3. Current state of the Vue 3 rewrite (`vue3-src/`)

A quick survey so the affiliate conversation is grounded in what
actually exists today.

* Stack: **Nuxt 4 + Vue 3 + Vuetify 3** via `vuetify-nuxt-module`
  (`vue3-src/nuxt.config.ts`, `vue3-src/package.json`).
* **No i18n module is registered.** A search for `vue-i18n`,
  `@nuxtjs/i18n`, `@intlify/*` returns nothing.
* The page title in `nuxt.config.ts` is hard-coded English
  (`'FHIRPath Lab - FHIR Expression Testing Tool'`) and `<html lang>`
  is implicit-default.
* Vuetify 3 is configured without a `locale` block, so it falls back
  to its built-in English messages for date pickers, pagination,
  `v-data-table` empty states, etc.
* `vue3-src/app/pages/` currently contains `index`, `fhirpath`, `fml`,
  `sqlonfhir`, `Questionnaire/*`, `resource-editor-test`. All
  user-visible strings are inline English literals in `.vue`
  templates / `title=` attributes.

Crucially, **the rewrite is small and not yet feature-complete**. That
is the *good news* for this exploration: the cost of doing i18n right
in the rewrite is dramatically lower than it would have been to
retrofit the Nuxt 2 app, because most of the eventual screens have not
been written yet. Getting the ground rules in place now (§4) is the
highest-leverage move available.

---

## 4. What we can do *now* (independent of the affiliate decision)

These items are useful even if every affiliate ultimately says "English
is fine". They cost very little and they keep the door open. None of
them require committing to a translation library or a delivery date.

1. **Treat new strings in `vue3-src/` as translatable from day one.**
   Route them through a `t('some.key')` helper — initially a 6-line
   shim that returns its argument, later swapped for real `vue-i18n`.
   This is the single highest-leverage habit change.

2. **Co-locate strings per component**, e.g. a `<i18n>` block or a
   constant message object at the top of each `.vue` file, rather
   than scattering literals across `title=`, `placeholder=`, button
   text, error toasts and `console.error`. Easier to review, easier
   to extract.

3. **No string concatenation for sentences.** `'Loaded ' + n + ' libraries'`
   does not survive translation into German (verb position) or
   Swedish (definite article suffix). Use parameterised messages.

4. **Centralise locale-sensitive formatting.** Provide one
   `formatDate(d)` / `formatNumber(n)` helper in `vue3-src/app/utils/`
   that takes an explicit locale. Prevents silent en-US leakage from
   `Intl.DateTimeFormat` / `toLocaleString` calls picking up the
   browser locale at random.

5. **Treat FHIRPath payloads as locale-independent.** FHIRPath
   literals (`@2024-12-31`, decimal `1.5`) and the user's typed
   expression must always render with `.` decimals and ISO dates in
   the tester input/output panels regardless of UI locale. A code
   comment to that effect on the FhirPath tester component prevents
   a future contributor "helpfully" running results through
   `toLocaleString`.

6. **Drive `<html lang>` from a single source** instead of relying on
   the Nuxt default, so flipping it later is one line.

7. **Externalise the OpenAI system prompts** (currently hard-coded
   English in the legacy `helpers/openai_*.ts` referenced via
   `@legacy/helpers` from `vue3-src/nuxt.config.ts`). Even before any
   chrome is translated, appending *"Reply in {{userLocale}} unless
   the user writes in another language"* to the system prompt is
   essentially free and immediately useful.

8. **Per-deployment defaults config.** The Nuxt 2 app loads
   `static/config.json` for engine URLs. The Vue 3 rewrite already
   prerenders `/config.json` (see `nuxt.config.ts` `prerender.routes`).
   Extending it with a `defaults` block keyed by locale —
   `fhirServerExamplesUrl`, `fhirTerminologyServerUrl`,
   `displayLanguage`, `defaultNewCanonicalBase` — would let an
   affiliate-branded deployment ship sensible defaults without any
   chrome translation at all. Several affiliates may find that this
   alone is enough.

9. **Pass `displayLanguage` on terminology lookups** (`$expand`,
   `$lookup`). All four candidate jurisdictions are SNOMED CT member
   nations with localised editions; this single change makes
   value-set displays appear in the local language *with no
   translation work*. This is arguably the most valuable single change
   for European users regardless of whether the chrome is ever
   localised.

10. **Document the convention.** Once any of the above lands, a
    one-paragraph note in the Vue 3 rewrite's contributing guide
    ("new strings go through `t()`, no concatenated sentences,
    explicit locales on `Intl.*`") keeps it cheap to maintain.

If the affiliate conversation comes back as "English is adequate", we
still benefit from items 4, 5, 7, 8 and 9 — they are good engineering
hygiene independent of translation.

---

## 5. Per-jurisdiction notes (input for the affiliate conversations)

These are starting points, not commitments. Each affiliate is the
authority on their own answer.

### 5.1 🇩🇪 Germany — HL7 Deutschland

* **Audience hypothesis:** mixed; FHIR adoption in DE has accelerated
  with the gematik / MII / KBV programs, pulling in non-developer
  roles (clinical informaticists, MII data integration centres,
  KBV implementers). A localised UI is plausibly useful for training
  in this audience.
* **Reference IGs:** Basisprofile DE, MII core data set, KBV /
  gematik profiles.
* **Suggested deployment defaults:** an HAPI server loaded with
  Basisprofile DE; an Ontoserver instance with ICD-10-GM / OPS / ATC
  / SNOMED CT German edition.
* **Locale chain:** `de-DE → de → en`.
* **Question to ask:** is HL7 Deutschland already running training
  events where the English UI is friction, or is it a non-issue?

### 5.2 🇨🇭 Switzerland — HL7 Switzerland / eHealth Suisse

* **Audience hypothesis:** narrower and more developer-skewed than DE;
  CH Core / EPR work is concentrated in a smaller community. English
  may be adequate.
* **Reference IGs:** CH Core, eCH-FHIR, EPR profiles.
* **Suggested deployment defaults:** `test.ahdis.ch/matchbox` (already
  referenced in the Nuxt 2 app's `static/config.json` as
  `mapper_server_matchbox`) for examples; CH TermPub for terminology.
* **Locale chain:** at minimum `de-CH → de → en` and `fr-CH → fr → en`,
  optionally `it-CH → it → en`. **Choosing only one language is
  politically awkward in CH** — this is worth raising explicitly with
  the affiliate before committing.
* **Question to ask:** is a single-language localisation acceptable, or
  does CH require all three at once?

### 5.3 🇦🇹 Austria — HL7 Austria

* **Audience hypothesis:** small community, heavy ELGA focus, mostly
  developer / consultant. English likely adequate.
* **Reference IGs:** ELGA CDA / FHIR mappings, AT Patient Summary.
* **Suggested deployment defaults:** in practice DE-flavoured servers
  with the AT IG layered on top — there is no widely-used public AT
  FHIR server today.
* **Locale chain:** `de-AT → de → en`. The AT-specific delta over `de`
  is small (a handful of terms — Sozialversicherungsnummer,
  Krankenanstalt, etc.).
* **Question to ask:** does HL7 Austria see enough non-developer
  audience to justify a regional overlay, or is sharing the `de`
  catalogue with HL7 Deutschland sufficient?

### 5.4 🇸🇪 Sweden — HL7 Sweden / Inera

* **Audience hypothesis:** Swedish FHIR developers are typically very
  comfortable in English. The case for localisation is mostly the
  training / classroom scenario and the privacy / safety copy.
* **Reference IGs:** HL7 Sweden profiles, Inera national services
  (1177, NPÖ), Nationella Läkemedelslistan.
* **Suggested deployment defaults:** Inera sandbox (where available),
  a HAPI server loaded with SLL profiles, the Swedish national
  terminology service.
* **Locale chain:** `sv-SE → sv → en`.
* **Sorting note:** Swedish collation sorts `å`, `ä`, `ö` after `z`.
  Any client-side sort of display names would need
  `Intl.Collator('sv')`.
* **Question to ask:** is there a concrete training / onboarding
  scenario where the English UI is a blocker, or is the request more
  aspirational?

### 5.5 Cross-cutting (applies to all four)

* All four are **SNOMED CT member nations**. Passing `displayLanguage`
  on terminology calls is the single highest-leverage change for the
  European user experience and is independent of any chrome
  translation. **Do this regardless of the affiliate decision.**
* All four use **UCUM** — locale-independent, no work.
* The `fhirpath` engine itself is locale-independent (per the FHIRPath
  spec). Nothing to do.
* If a deployment ships analytics (the Nuxt 2 app uses Application
  Insights), an EU deployment will need the usual GDPR opt-in. This
  is a deployment-ops question, not an i18n question, but worth
  flagging in the affiliate conversation because they may have views
  on national hosting / data residency.

---

## 6. Decision points to take into the affiliate conversation

Concrete questions, in priority order:

1. **Is English adequate for your audience today, yes or no?**
   If yes from all four, we stop here and only do §4 items 4, 5, 7, 8, 9.
2. **If no, is your affiliate willing to provide / review translations
   on an ongoing basis?** If no, we should not localise into that
   language — a stale or wrong translation is worse than no
   translation.
3. **Is a per-locale "deployment defaults" config (server URLs +
   `displayLanguage`) sufficient for your training needs without
   chrome translation?** This is the cheapest possible win and may be
   all that is actually required.
4. **For Switzerland specifically:** is single-language localisation
   acceptable, or is multi-language a hard requirement?
5. **Is there a partner deployment** (`fhirpath-lab.de`,
   `fhirpath-lab.ch`, `fhirpath-lab.se`-style sub-sites) that the
   affiliate would want to host or co-brand, or do they prefer a
   single multilingual deployment with a locale switcher? Both are
   technically achievable; the answer affects the shape of the
   per-locale defaults config in §4 item 8.

The outcome of these conversations, not this document, should drive
whether and how implementation proceeds.

---

*Document author: exploration only. Recommendations are starting
points for discussion with European HL7 affiliates, not a design
specification.*
