# Internationalisation of the FHIRPath Lab

> Status: **exploration / discussion only — no code changes proposed yet.**
>
> Goal: understand what it would take to offer the FHIRPath Lab UI (and
> supporting content) in additional languages so it can be used comfortably in
> Germany (de-DE), Switzerland (de-CH / fr-CH / it-CH), Austria (de-AT) and
> Sweden (sv-SE). Also identify low-cost things we can do *now* to make a
> future translation effort straightforward.

---

## 1. What "internationalisation" actually means here

For a tool like the FHIRPath Lab there are several quite different layers that
are often lumped together under "translation". They have very different cost,
risk and maintenance profiles, and we should be explicit about which ones we
actually want to support.

| Layer | Examples in this app | Who owns the strings |
|---|---|---|
| **A. Chrome / shell UI** | Page titles, menu items ("Expression Sources", "Settings"), button labels ("Save", "Cancel"), tab names, error toasts, table headers | FHIRPath Lab |
| **B. Lab-specific domain text** | Walkthrough text, tooltips on FhirPath operators, the "what is this engine" descriptions, AI prompt scaffolding in `helpers/openai_*` | FHIRPath Lab |
| **C. FHIR specification text** | Structure definition descriptions, element short / definition / comments, search parameter descriptions, value-set display strings | HL7 / national IGs |
| **D. User content** | Library expressions, Questionnaire `text`/`prefix`, StructureMap names, custom example resources | The user / their FHIR server |
| **E. Locale-sensitive *behaviour*** | Date / time / number formatting, decimal separators (`,` vs `.`), units (UCUM), collation / sort, FHIRPath itself (`@2024-12-31`, decimal literals) | FHIRPath spec + UI code |
| **F. Regulatory / privacy copy** | Privacy statement, terms, "do not enter real patient data" warnings | FHIRPath Lab + legal |

The cheapest and most impactful starting point is **A + B + F** (the chrome and
the lab's own copy). **C** is essentially free if we point at the right FHIR
servers/IGs. **D** is the user's responsibility. **E** is the one that has the
most subtle traps — see §5.

---

## 2. Current state of the codebase (as of 2026-05)

### 2.1 Two app code-bases live side by side

* `pages/`, `components/`, `layouts/`, `helpers/` — the **production** app, built on **Nuxt 2 / Vue 2 / Vuetify 2 / bootstrap-vue** (see `package.json`, `nuxt.config.js`).
* `vue3-src/` — a **migration in progress** to **Nuxt 4 / Vue 3 / Vuetify 3** (`vue3-src/package.json`).

Both code bases are entirely English. A search for `i18n`, `vue-i18n`, `@nuxtjs/i18n`, `@intlify/*` returns no hits, and `nuxt.config.js` does not register any localisation module. The HTML root is hard-coded to English:

```js
// nuxt.config.js
head: { htmlAttrs: { lang: 'en' } }
```

This means **today there is no translation infrastructure at all** — every
visible string is a literal in a `.vue` template, a `title="…"` attribute, an
`<v-card-title>`, an `<v-btn>` body, a tooltip, a `console.log`, etc.

### 2.2 Where the user-visible strings live

Rough survey (non-exhaustive):

* `components/HeaderNavbar.vue` — top navigation, menu group names ("Expression Sources", "Structure Definitions", "Test Structure Map", …).
* `components/UserSettings.vue` — every settings field label and every `title="…"` tooltip.
* `components/Questionnaire/*.vue` — the largest cluster of strings (renderer section labels, message logs, pre-population / extract panels).
* `components/DebuggableFhirPathExpression.vue`, `ParseTreeTab.vue`, `TwinPaneTab.vue`, `OperationOutcome*.vue` — diagnostics text.
* `pages/**/*.vue` — page titles, intro text, column headers for `List` / `Library` / `StructureDefinition` / `SearchParameter` / `Questionnaire` / `StructureMap` / `SubscriptionTopic`.
* `pages/privacy/` — privacy copy (regulated content).
* `helpers/openai_*.ts` — system prompts and instruction text fed to the LLM. These are *English by design today* and steer the model's output language.
* `docs/*.md` — walkthroughs and reference material (separate concern from runtime UI).

### 2.3 Configuration that is already locale-friendly

A few things are already pleasantly factored and would survive an i18n effort
unchanged:

* **Endpoints** are externalised in `static/config.json` (the various `*_server_r4b/r5/r6` URLs). It is already trivial to point a deployment at a different set of engines.
* **User-settable servers** in `helpers/user_settings.ts` (`fhirServerUrl`, `fhirServerExamplesUrl`, `fhirTerminologyServerUrl`, `defaultNewCanonicalBase`) are persisted in `localStorage`. A user in Sweden can already set the example server to a Swedish national one and the terminology server to e.g. the Swedish national terminology server.
* The favourites / library mechanism uses canonical URLs, so national IGs slot in naturally.

### 2.4 Things that are *implicitly* English / en-US today

* All `<title>` attributes (rich tooltips Vuetify renders natively) are English.
* All Vuetify components inherit the **default Vuetify English locale** (pagination "Next", date pickers, "No data available", etc.) because no `vuetify.lang` block is configured.
* Date and number formatting in `helpers/datetime.ts` and ad-hoc `toString()` / template interpolation calls do not pass an explicit locale to `Intl.*`.
* AI prompts (in `helpers/openai_utils.ts`, `openai_form_tester.ts`, `openai_tools.ts`) are written in English and ask for English replies; users in DE / CH / AT / SE will get English explanations even when they ask in German or Swedish, unless we change the prompt scaffolding.

---

## 3. What it would take to add German / Swedish (etc.) UI

This is the part of the work that produces the most user-visible value. The
two app code bases have very different best-practice answers, so the choice of
**when** to do this matters as much as **how**.

### 3.1 Recommended approach for the Vue 3 / Nuxt 4 rewrite (`vue3-src/`)

If the Nuxt 4 rewrite is going to land in any reasonable timeframe, this is
the natural place to introduce i18n; doing it twice (Nuxt 2 *and* Nuxt 4) is
expensive.

* Add **`@nuxtjs/i18n` v9+** (which wraps **vue-i18n v10**). It is the de-facto Nuxt module: lazy-loaded JSON/YAML message files per locale, automatic `<html lang>`, route-level locale strategy, SEO `<link rel="alternate">` tags, locale switcher composable.
* Use the `prefix_except_default` strategy (URLs like `/de/FhirPath`, `/sv/FhirPath`) so deep links are language-stable and shareable.
* Add **Vuetify 3 locale messages** (`vuetify.locale = { locale, fallback: 'en', messages: { en, de, sv } }`) and bridge them to the same locale source so Vuetify's own strings (date pickers, data tables, pagination) follow the user's choice.
* Locales to seed: `en` (source), `de` (covers DE + AT + de-CH baseline), `sv`. Add `fr` and `it` if Swiss French / Italian users matter — they share the same `de` data model so the marginal cost is just translation.
* Treat **de-AT** and **de-CH** as *regional overrides* on top of `de`, not full locales. vue-i18n natively supports fallback chains (`de-AT → de → en`). This avoids 3× the translation work for things that are identical in all German-speaking countries.

### 3.2 Recommended approach if we must also do it on the Nuxt 2 app

The Nuxt 2 app would use the matching legacy stack:

* `@nuxtjs/i18n` v7 + `vue-i18n` v8 (Vue 2 compatible).
* Vuetify 2 has built-in `$vuetify.lang` (`vuetify/lib/locale/de`, `…/sv`). Wire it to the same locale switcher.
* `bootstrap-vue` is also used; its few user-facing strings (`b-pagination`, `b-table` empty-text) need to be passed in via props from the i18n catalogue — there is no global locale registry.

If the rewrite is close to shipping, doing this on Nuxt 2 is largely throw-away
work. A reasonable middle ground is:

1. Get the **string-extraction discipline** (§4) into the Nuxt 2 code now, *without* yet adding the i18n module. Replace literal strings with `$t('settings.fhirServer.label')` calls that today resolve via a tiny stub that just returns the English default. This keeps PRs small and reviewable, and means the rewrite inherits a ready-to-translate catalogue.
2. Plug in the real `vue-i18n` only on the rewrite.

### 3.3 Translation production workflow

* **Keys**, not English text, in the source ( `t('library.actions.runExpression')` rather than `t('Run expression')` ). This avoids breaking every translation when an English wording is tweaked.
* **One JSON / YAML file per locale** under `locales/{en,de,sv}.json` (Nuxt 4) or `lang/` (Nuxt 2). Keep it flat-ish (max 2–3 levels of nesting) — easier to diff, easier for translators.
* **English is the source of truth.** A small CI check can fail the build if a key exists in `en.json` but is missing in another locale (or vice versa).
* For initial seeding, an LLM pass is acceptable, but **plan for native-speaker review** of the FHIR-specific terms. Translating "expression", "bundle", "narrative", "value set", "concept map", etc. in a way that matches what local clinicians and implementers actually say is the hardest part of this project, and is exactly where machine translation is weakest. The German FHIR community (HL7 Deutschland) and Swedish (Inera / HL7 Sweden) have published glossaries that should be consulted.
* Provide a `?lang=` query-string override and a small picker in the header so a user can preview a locale without changing their browser settings — useful for QA and for screenshots.

---

## 4. Things to do *now* that make future translation cheap

These are ordered from "almost zero risk" to "small refactor".

1. **Stop adding new hard-coded English text in the Vue 3 rewrite.** Even before
   `@nuxtjs/i18n` is wired up, route everything through a `t()` helper (it can
   be a 6-line shim that returns its key for now). This is the single most
   leveraged habit change available.
2. **Co-locate strings in `<i18n>` blocks or per-component message objects** in
   new components, rather than scattering them across `title=`, `placeholder=`,
   `<span>` text and `console.error`. This is `vue-i18n`'s "single file
   component messages" feature and makes review trivial.
3. **Avoid string concatenation for sentences.** `'Loaded ' + n + ' libraries'`
   cannot be translated correctly into German (verb position) or Swedish
   (definite-article suffix). Use parameterised messages: `t('library.loadedCount', { n })`.
4. **Pass an explicit locale to every `Intl.DateTimeFormat`, `Intl.NumberFormat`
   and `Date.prototype.toLocaleString` call.** Today these pick up the
   browser locale silently, which means a German user sees `31.12.2024` while
   a US user sees `12/31/2024` for the *same* underlying FHIR `date` — and
   we have no control over that. Centralise this in `helpers/datetime.ts`
   and have it read the active app locale.
5. **Be explicit about FHIRPath's own locale-independence.** FHIRPath literals
   (`@2024-12-31`, `1.5`) and the expressions a user types are *not* localised
   and must not be reformatted by display logic. The tester input/output
   panels should always render decimals with `.` and dates in `YYYY-MM-DD`,
   regardless of UI locale. Add a comment to that effect on
   `components/DebuggableFhirPathExpression.vue` so a future translator does
   not "helpfully" run results through `toLocaleString`.
6. **Add a `lang` attribute that follows the active locale.** Today
   `nuxt.config.js` hard-codes `htmlAttrs: { lang: 'en' }`. Even before any
   translations exist, expose this through a single source of truth so it can
   later be `lang: locale.value`.
7. **Externalise the AI system prompts** in `helpers/openai_*.ts` so they can
   be swapped per-locale. A short addition to the system prompt of the form
   "Reply in {{userLocale}} unless the user writes in another language" goes
   a long way and is essentially free.
8. **Make the configurable URL defaults in `helpers/user_settings.ts` overridable
   per deployment** (today the German defaults `https://fhir.forms-lab.com`,
   `https://hapi.fhir.org/baseR4`, `https://sqlonfhir-r4.azurewebsites.net/fhir`
   are baked in). A simple read from `static/config.json` (which is already
   loaded for engine URLs) for `defaultFhirServer`, `defaultExamplesServer`,
   `defaultTerminologyServer` would let a `de-DE` deployment ship sensible
   defaults — see §5.
9. **Use canonical URLs, not display labels, as identifiers.** This is mostly
   already the case (`url`, `canonical`, `system`) and should stay that way —
   it's what allows national IGs to slot in cleanly later.
10. **Document this policy** in `CONTRIBUTING` / PR template once introduced,
    so reviewers know to flag new hard-coded strings.

None of the above requires committing to an i18n library or a delivery date.

---

## 5. Country-specific considerations

The FHIRPath Lab is a developer / implementer tool, not an EHR. It does not
process patient data itself, which removes most regulatory worries (GDPR,
nFADP, GDPR-AT, GDPR-SE / Patientdatalagen). The privacy page already states
"Don't enter real patient data" and that wording should be **prominent in the
target language** in any localised build — that is more important than getting
the button labels right.

### 5.1 🇩🇪 Germany (`de-DE`)

* **Reference IG:** [Basisprofile DE](https://simplifier.net/basisprofil-de-r4) (HL7 Deutschland), [MII core data set](https://www.medizininformatik-initiative.de/), [KBV / gematik profiles](https://simplifier.net/organization/kassenrztlichebundesvereinigungkbv).
* **Suggested example FHIR server defaults:** the **gematik** FHIR reference servers (`https://fhir-directory-test.vzd.ti-dienste.de/`), and HAPI test servers loaded with Basisprofile DE. The current default `hapi.fhir.org/baseR4` returns US examples that are confusing in a DE context.
* **Terminology server:** the **TermServer** operated by BfArM / [Ontoserver instances](https://ontoserver.csiro.au/) loaded with ICD-10-GM, OPS, ATC and the SNOMED CT German edition. SNOMED CT is now licensed in DE (since 2021), so display strings can be returned in German.
* **Date / number conventions:** `dd.MM.yyyy`, `1.234,56`. Note this **must not** affect FHIR's wire format or FHIRPath display — only chrome.
* **Language fallback:** `de-DE → de → en`.
* **Legal:** standard GDPR cookie / analytics banner if the production deployment ships analytics (`@nuxtjs/applicationinsights` is registered in `nuxt.config.js`); needs an opt-in for EU users.

### 5.2 🇨🇭 Switzerland (`de-CH`, `fr-CH`, `it-CH`)

* **Reference IG:** [CH Core](http://fhir.ch/ig/ch-core/index.html), [eCH-FHIR profiles](https://www.ech.ch/), eHealth Suisse exchange formats, and the **EPR (Elektronisches Patientendossier)** profiles.
* **Suggested example FHIR server defaults:** [test.ahdis.ch/matchbox](https://test.ahdis.ch/matchbox/fhir) — already referenced in `static/config.json` as `mapper_server_matchbox`. Re-use it as the `fhirServerExamplesUrl` for a CH deployment.
* **Terminology server:** the **CH TermPub / Term-Browser** infrastructure operated by eHealth Suisse, plus SNOMED CT international edition (Switzerland is an SNOMED member).
* **Date / number conventions:** `dd.MM.yyyy` / `dd.MM.yyyy`; thousands separator `'` (`1'234.56`) — somewhat unusual, vue-i18n's CLDR data handles it.
* **Multilingual reality:** Switzerland will need at least `de-CH` + `fr-CH`, ideally `it-CH`. Fall-back chains: `de-CH → de → en`, `fr-CH → fr → en`, `it-CH → it → en`. Most strings will live at the language root, with `-CH` overriding only the date/number format and a handful of region-specific terms.
* The terminology server URL is the *single most important* per-locale default for Switzerland because CH Core valuesets are heavily expansion-driven.

### 5.3 🇦🇹 Austria (`de-AT`)

* **Reference IG:** [ELGA CDA / FHIR mappings](https://www.elga.gv.at/), [Austrian Patient Summary](https://art-decor.org/art-decor/decor-project--at-ips-).
* **Suggested example FHIR server:** there is no widely-used public AT FHIR server today; in practice DE-flavoured servers + the AT IG is the pragmatic default.
* **Terminology:** ELGA value sets, plus ICD-10-BMG (Austrian variant), shared SNOMED CT international.
* **Date / number conventions:** as DE.
* **Language fallback:** `de-AT → de → en`. The translation effort beyond `de` is limited to a few terms ("Sozialversicherungsnummer" vs "Krankenversichertennummer", units of healthcare organisations like "Krankenanstalt", etc.).

### 5.4 🇸🇪 Sweden (`sv-SE`)

* **Reference IG:** [HL7 Sweden FHIR profiles](https://hl7.se/), [Inera National Services](https://www.inera.se/) (1177, NPÖ), and the emerging **Nationella Läkemedelslistan / Patient Summary** profiles.
* **Suggested example FHIR server defaults:** Inera's sandbox (where available) or a HAPI server pre-loaded with the SLL profiles.
* **Terminology server:** Sweden runs a national terminology service; SNOMED CT Swedish edition is available, plus Snomed CT-SE, KVÅ, ATC.
* **Date / number conventions:** `yyyy-MM-dd` (matches FHIR — convenient!), decimal `,`, thousands ` ` (NBSP).
* **Sorting:** Swedish collation treats `å`, `ä`, `ö` as letters that come *after* `z`. If the Library / StructureDefinition list views ever do client-side sorting on display names, they need to use `Intl.Collator('sv')`.
* **Language fallback:** `sv-SE → sv → en`. Many Swedish FHIR developers are perfectly comfortable working in English; the value of `sv-SE` is mainly chrome polish, the privacy/warning copy, and being able to demo to non-developer stakeholders.

### 5.5 Cross-cutting

* All four countries are **SNOMED CT member nations**, so `display` values from a properly-configured terminology server come back in the local language for free — *if* the lab passes `Accept-Language` (or the FHIR equivalent, the `displayLanguage` parameter on `$expand` / `$lookup`). Today the lab does not. Adding this as a per-locale default is one of the highest-leverage small changes available.
* All four use **UCUM**, which is locale-independent — no work needed.
* Date pickers and number inputs in **Vuetify 3** support locale natively once the Vuetify locale is wired (§3.1).
* The `fhirpath` engine itself is locale-independent (FHIRPath spec is). Nothing to do.

---

## 6. What is explicitly *out of scope* for this exploration

* Translating the **walkthrough markdown** in `docs/`. These are reference material for implementers; they can stay English in v1. If demand appears, the same `@nuxtjs/i18n` route strategy can serve `/de/docs/...`.
* Translating **AI-generated explanations**. The right answer is to instruct the LLM to reply in the user's locale, not to translate a static catalogue.
* Translating **user-supplied content** (Library names, Questionnaire item text, StructureMap descriptions). That is the responsibility of whoever published the resource.
* Right-to-left support. None of the target locales need it.
* Server-side rendering of localised content for SEO. The app is already `ssr: false`, and that is fine for a developer tool.

---

## 7. Suggested staged plan (for when implementation does start)

Just for orientation — *not* a commitment.

1. **Foundations (no user-visible change).** Land §4.1–§4.6 in the Nuxt 4 rewrite: `t()` shim, locale-aware date/number helpers, `<html lang>` driven by a single source.
2. **Wire `@nuxtjs/i18n` + Vuetify 3 locale.** English only. Add the route prefix strategy. Verify nothing changes for existing users.
3. **Extract strings, ship `de`.** This is the bulk of the effort. Start with the highest-traffic surfaces: header/nav, settings, FhirPath tester, Questionnaire renderer.
4. **Per-locale defaults config.** Extend `static/config.json` with `defaults: { 'de-DE': { fhirServerExamplesUrl: …, fhirTerminologyServerUrl: …, displayLanguage: 'de' }, 'de-CH': { … }, 'sv-SE': { … } }`.
5. **Add `Accept-Language` / `displayLanguage` plumbing** to terminology lookups in `helpers/searchFhir.ts` / wherever `$expand` / `$lookup` is called.
6. **Ship `sv`.**
7. **Add regional overlays** `de-AT`, `de-CH`, `fr-CH`, `it-CH` as needed.
8. **Translate the privacy / warning copy** — ideally with legal review for each jurisdiction.

---

## 8. Open questions to confirm with the project owner

* Is the Nuxt 4 / Vuetify 3 rewrite in `vue3-src/` the intended long-term home? If so, that drives the entire i18n approach (§3.1 vs §3.2).
* Is there appetite to bundle **per-deployment defaults** (`fhirpath-lab.de`, `fhirpath-lab.ch`, `fhirpath-lab.se` style sub-sites), or is a single multilingual deployment with a locale switcher preferred? Both are achievable; the answer affects how `static/config.json` is structured.
* Are there partner organisations (HL7 Deutschland, eHealth Suisse, Inera) who would supply / review translations, or is this a self-serve effort?
* Does Application Insights need replacing/disabling for EU deployments under GDPR?

---

*Document author: exploration only — please treat the recommendations in §3
and §7 as starting points for discussion, not as a design specification.*
