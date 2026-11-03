# HL7 v2 support in the FML tester – design and assumptions

The FML page (`/fml`, Vue 3) can use an HL7 v2 message as the **source** of a
StructureMap, so v2 content can be mapped to FHIR (or any other logical model).
This mirrors what the FHIRPath page already does for v2.

## Scope

* v2 is supported as a **source only**. v2 as a mapping target (serialising to pipe-delimited text) is out of scope.
* The v2 text is converted to JSON in the browser before it is given to **any** engine
  (local JavaScript, .NET, HAPI, matchbox, MaLaC-HD), so all engines see ordinary
  logical-model JSON and need no v2 awareness.
* Detection is automatic (`isHl7v2Content`): if the Input tab holds v2, it is converted on Run.
* The v2 helper buttons (sample message + map, "add generic v2 models") are shown when
  *Advanced settings* are enabled, same as the v2 option on the FHIRPath page.

### FHIR XML input

The local JavaScript engine accepts FHIR XML through the same browser-side
`parseXmlAndObject` conversion used by the FHIRPath page. The converted FHIR JSON
is passed to the TypeScript FML executor, while remote engines continue to receive
the original XML. XML without a FHIR `resourceType` is rejected; arbitrary XML
requires a logical-model conversion and remains out of scope.

## Two model styles

| Style | Shape | Where it comes from |
|-------|-------|---------------------|
| **Generic** (base) | `Message` → `segment[]` → `field[]` → `element[]` → `component[]` → `subcomponent[]` | The FHIRPath HL7 v2 annex model, the same one used on the FHIRPath page (`models/hl7v2.ts`) |
| **Specific** | Named properties, e.g. `pid.patientName.family` | User supplied logical models, usually local to a site/system |

### Generic model (always applies)

`helpers/hl7v2_logical_model.ts` builds logical `StructureDefinition`s for
`Message`, `Group`, `Segment`, `Field`, `Cell`, `Element`, `Component` and
`SubComponent` with canonical URLs `http://hl7.org/fhirpath/v2/StructureDefinition/<Type>`
(identical to the URLs the FHIRPath v2 model uses).

Assumptions:

* The generic models are **always** merged into the `model` parameter sent to the engine for v2 input, so a map can
  `uses "http://hl7.org/fhirpath/v2/StructureDefinition/Message" alias V2Message as source` without the user pasting anything.
* If the user supplies a StructureDefinition with the same URL it **replaces** the built-in one (user wins).
  The base version is still used for every URL the user did not override.
* `text` and `value` are re-declared on each cell type (`Element`, `Component`, `SubComponent`) because the engines
  do not share inherited elements between logical types.
* Projection (`toGenericHl7v2Json`) is the parser output minus the hidden `resourceType`/group-error markers.
  Empty cells are kept as `{}` so that positions stay stable: `field[4]` is always field 5 (0-based JSON arrays;
  the same positional tree the FHIRPath page uses, MSH-1 is `field[0]`).
* Segment code is available as `code`; the abstract-syntax groups (e.g. `PATIENT_RESULT`) are exposed under `group[]` as the parser derives them.

### Specific models

A specific model is an ordinary logical model. Each element declares where its data
comes from with the extension `http://fhirpath-lab.com/StructureDefinition/hl7v2-source`
(`valueString`) on its ElementDefinition:

| Address | Meaning |
|---------|---------|
| `PID` | The segment with that code (first/all depending on `max`) |
| `group:NAME` | A message group |
| `PID-5`, `PID-5.1`, `PID-5.1.2` | Absolute field / component / sub-component |
| `1`, `1.2` | Relative to the parent cell (field→component→sub-component), so a data-type model such as `XPN` can be reused by every field of that type |

Projection rules (`projectHl7v2ToSpecificModel`):

* Which projection is used is decided by the map: the URL of the first `uses ... as source` structure.
  If it resolves to a user StructureDefinition carrying `hl7v2-source` extensions → specific projection, otherwise generic.
* `max = *` → array, otherwise a single value. Repeating fields (`~`) map to the repeats of the cell.
* Empty cells are omitted.
* Primitive coercion by the element type: `integer`, `decimal`, `boolean`; `date`/`dateTime`/`instant`
  accept v2 `YYYY[MM[DD[HH[MM[SS]]]]]` forms and become FHIR dates; anything else stays a string.
* Unknown addresses produce warnings (shown in the Errors tab), not failures.

`sampleHl7v2SpecificModel` in `helpers/hl7v2_fml_input.ts` is a small worked example (`ADT` with `pid.patientName` using an `XPN` data-type model).

## Pipeline

1. `prepareHl7v2FmlInput(v2Text, mapText, userModelText)`
   * parse v2 (`parseHl7v2Message`),
   * merge generic + user models (`mergeHl7v2Models`),
   * read the map’s source URL (`findMapSourceUrl`, uses the FML parser),
   * project to JSON (generic or specific).
2. The page sends the resulting JSON as the `content` (or `resource` for matchbox/MaLaC-HD) and the merged bundle as `model`.
3. Trace and variables are handled as for any FML run.

## Worked PID-to-Patient example

This example uses the generic model to extract PID-3 (identifier), PID-5
(patient name), and PID-7 (date of birth).

### Test input

```hl7v2
MSH|^~\&|SendingApp|SendingFac|ReceivingApp|ReceivingFac|20240115093000||ADT^A01^ADT_A01|MSG00001|P|2.7
PID|1||12345678^^^MR^MR||Chalmers^Peter^James^^Mr.||19741225|M|||534 Erewhon St^^PleasantVille^Vic^3999
```

### FML map

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

### Expected output

```json
{
  "resourceType": "Patient",
  "identifier": [
    {
      "system": "http://hospital.example.org/mrn",
      "value": "12345678"
    }
  ],
  "name": [
    {
      "family": "Chalmers",
      "given": ["Peter"]
    }
  ],
  "birthDate": "1974-12-25"
}
```

## Debugger highlighting

* Map highlighting is unchanged.
* For the **generic** projection, variable paths from the trace are 0-based JSON paths; the v2 positional AST is 1-based,
  so indices are shifted by +1 before the input editor highlights the cell.
* For **specific** projections the JSON no longer mirrors the message layout, so the input editor does not highlight cells (documented limitation).

## Models tab / logical model generation

* The Models-tab button adds the generic v2 bundle (merged with whatever is already there).
* "Generate logical model from input" with v2 input produces the same generic bundle rather than inferring from a single message.

## Vue 3 port notes

* The page lives in `vue3-src/app/pages/fml.vue`; the shared runtime is consumed **from source** through Vite aliases
  (`@fhirpath-lab/validator`, `@fhirpath-lab/fml-executor`, `@legacy/fml-debug-service`) so no extra build step is needed.
  `fhirpath` is deduplicated to a single copy and must be ≥ 5.2.1 for the executor.
* The map editor is the shared `ResourceEditor` with the new `fml` language (`helpers/fml_highlighter.ts`: FML keywords, `///` metadata and FHIRPath for the expression fragments), live validation annotations and `setAnnotations`/`getEditor` exposed for the debugger.
* The AI chat tab from the Vue 2 page is not ported (there is no chat component in the Vue 3 app yet).

## Future work

* v2 as a target, and round-trip of specific models.
* Highlighting input cells for specific projections (needs a source map from projected JSON back to message positions).
* Shipping curated specific models (e.g. per-version ADT/ORU) alongside the generic one.
