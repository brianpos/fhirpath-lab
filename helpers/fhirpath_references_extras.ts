/**
 * Lab-specific reference data that is not derivable from the FHIRPath
 * specification JSON files (`static/functions.json`, `static/operations.json`).
 *
 * Three things live here:
 *
 *   1. `extraFunctionReferences` - Function entries for FHIR core and SDC
 *      extensions to FHIRPath that are not in the spec JSON. Merged into
 *      `mapFunctionReferences` after the spec entries.
 *
 *   2. `functionAnchors` - The actual rendered HTML anchor for each spec
 *      function in the FHIRPath continuous build IG. These are *not*
 *      mechanically derivable from the JSON because the spec headings include
 *      lambda-style parameter signatures (e.g. `($this, $index) => Boolean`
 *      for the `criteria` parameter of `where`/`exists`/`all`) that aren't
 *      represented in the structured arguments list. The anchors below were
 *      extracted directly from https://build.fhir.org/ig/HL7/FHIRPath/.
 *
 *   3. `operatorAnchors` - The same, for operators. Keyed primarily by
 *      `operationName@sectionNumber` because some operator symbols (notably
 *      `+` and `-`) appear under both Math (6.6) and Unary Operators (6.8).
 *      A bare-name fallback is also accepted.
 */
import type { ISpecFunctionDetails } from "./fhirpath_references";

const FHIR_FNS_URL = "https://hl7.org/fhir/fhirpath.html#functions";
const SDC_FNS_URL =
  "https://build.fhir.org/ig/HL7/sdc/expressions.html#fhirpath-supplements";

export const extraFunctionReferences: ReadonlyArray<
  [string, ISpecFunctionDetails]
> = [
  // FHIR Extensions to FHIRPath (linked from the FHIR specification)
  ["extension", { title: "extension(url : string) : collection", specUrl: FHIR_FNS_URL }],
  ["hasValue", { title: "hasValue() : Boolean", specUrl: FHIR_FNS_URL }],
  ["getValue", { title: "getValue() : System.[type]", specUrl: FHIR_FNS_URL }],
  ["resolve", { title: "resolve() : collection", specUrl: FHIR_FNS_URL }],
  ["elementDefinition", { title: "elementDefinition() : collection", specUrl: FHIR_FNS_URL }],
  ["slice", { title: "slice(structure : string, name : string) : collection", specUrl: FHIR_FNS_URL }],
  ["checkModifiers", { title: "checkModifiers(modifier : string) : collection", specUrl: FHIR_FNS_URL }],
  ["conformsTo", { title: "conformsTo(structure : string) : Boolean", specUrl: FHIR_FNS_URL }],
  ["memberOf", { title: "memberOf(valueset : string) : Boolean", specUrl: FHIR_FNS_URL }],
  ["subsumes", { title: "subsumes(code : Coding | CodeableConcept) : Boolean", specUrl: FHIR_FNS_URL }],
  ["subsumedBy", { title: "subsumedBy(code: Coding | CodeableConcept) : Boolean", specUrl: FHIR_FNS_URL }],
  ["htmlChecks", { title: "htmlChecks : Boolean", specUrl: FHIR_FNS_URL }],

  // SDC Extensions to FHIRPath
  ["ordinal", { title: "ordinal() : decimal", specUrl: SDC_FNS_URL }],
  ["answers", { title: "answers() : QuestionnaireItem#Answer", specUrl: SDC_FNS_URL }],
];

/**
 * Function name -> spec anchor fragment in the FHIRPath continuous build IG.
 *
 * Source: https://build.fhir.org/ig/HL7/FHIRPath/ (anchors extracted from
 * the rendered HTML; see the kramdown header-id generation rules).
 */
export const functionAnchors: ReadonlyMap<string, string> = new Map<string, string>([
  // 5.1 Existence
  ["empty", "empty--boolean"],
  ["exists", "existscriteria--this-index--boolean--boolean"],
  ["all", "allcriteria--this-index--boolean--boolean"],
  ["allTrue", "alltrue--boolean"],
  ["anyTrue", "anytrue--boolean"],
  ["allFalse", "allfalse--boolean"],
  ["anyFalse", "anyfalse--boolean"],
  ["subsetOf", "subsetofother--collection--boolean"],
  ["supersetOf", "supersetofother--collection--boolean"],
  ["count", "count--integer"],
  ["distinct", "distinct--collection"],
  ["isDistinct", "isdistinct--boolean"],

  // 5.2 Filtering and projection
  ["where", "wherecriteria--this-index--boolean--collection"],
  ["select", "selectprojection-this-index--any--collection"],
  ["sort", "sortkeyselector-this--any-asc--desc--keyselector-this--any-asc--desc---collection"],
  ["repeat", "repeatprojection-this--collection--collection"],
  ["repeatAll", "repeatallprojection-this--collection--collection"],
  ["ofType", "oftypetype--type-specifier--collection"],
  ["coalesce", "coalescevalue--collection-value--collection---collection"],

  // 5.3 Subsetting
  ["single", "single--any"],
  ["first", "first--any"],
  ["last", "last--any"],
  ["tail", "tail--collection"],
  ["skip", "skipnum--integer--collection"],
  ["take", "takenum--integer--collection"],
  ["intersect", "intersectother-collection--collection"],
  ["exclude", "excludeother-collection--collection"],

  // 5.4 Combining
  ["union", "unionother--collection--collection"],
  ["combine", "combineother--collection-preserveorder--boolean--collection"],

  // 5.5 Conversion
  ["iif", "iifcriterion-this-index--boolean-true-result-this-index--collection--otherwise-result-this-index--collection--collection"],
  ["toBoolean", "toboolean--boolean"],
  ["convertsToBoolean", "convertstoboolean--boolean"],
  ["toInteger", "tointeger--integer"],
  ["convertsToInteger", "convertstointeger--boolean"],
  ["toLong", "tolong--long"],
  ["convertsToLong", "convertstolong--boolean"],
  ["toDate", "todateformat--string--date"],
  ["convertsToDate", "convertstodateformat--string--boolean"],
  ["toDateTime", "todatetimeformat--string--datetime"],
  ["convertsToDateTime", "convertstodatetimeformat--string--boolean"],
  ["toDecimal", "todecimal--decimal"],
  ["convertsToDecimal", "convertstodecimal--boolean"],
  ["toQuantity", "toquantityunit--string--quantity"],
  ["convertsToQuantity", "convertstoquantityunit--string--boolean"],
  ["toString", "tostring--string"],
  ["convertsToString", "convertstostring--boolean"],
  ["toTime", "totime--time"],
  ["convertsToTime", "convertstotime--boolean"],

  // 5.6 String Manipulation
  ["indexOf", "indexofsubstring--string--integer"],
  ["lastIndexOf", "lastindexofsubstring--string--integer"],
  ["substring", "substringstart--integer--length--integer--string"],
  ["startsWith", "startswithprefix--string--boolean"],
  ["endsWith", "endswithsuffix--string--boolean"],
  // Note: `contains` is also an operator (6.4.3); the function form (5.6.6)
  // is the one we link from the function map.
  ["contains", "containssubstring--string--boolean"],
  ["upper", "upper--string"],
  ["lower", "lower--string"],
  ["replace", "replacepattern--string-substitution--string--string"],
  ["matches", "matchesregex--string-flags--string--boolean"],
  ["matchesFull", "matchesfullregex--string-flags--string--boolean"],
  ["replaceMatches", "replacematchesregex--string-substitution-string-flags--string--string"],
  ["length", "length--integer"],
  ["toChars", "tochars--collection"],

  // 5.7 Additional String Functions
  ["encode", "encodeformat--string--string"],
  ["decode", "decodeformat--string--string"],
  ["escape", "escapetarget--string--string"],
  ["unescape", "unescapetarget--string--string"],
  ["trim", "trim--string"],
  ["split", "splitseparator-string--collection"],
  ["join", "joinseparator-string--string"],

  // 5.8 Math
  ["abs", "abs--integer--long--decimal--quantity"],
  ["ceiling", "ceiling--integer--quantity"],
  ["exp", "exp--decimal"],
  ["floor", "floor--integer--quantity"],
  ["ln", "ln--decimal"],
  ["log", "logbase--decimal--decimal"],
  ["power", "powerexponent--integer--decimal--decimal"],
  ["round", "roundprecision--integer--decimal--quantity"],
  ["sqrt", "sqrt--decimal"],
  ["truncate", "truncate--integer--quantity"],

  // 5.9 Tree navigation
  ["children", "children--collection"],
  ["descendants", "descendants--collection"],

  // 5.10 Utility functions
  ["trace", "tracename--string--projection-this-index--any--collection"],
  ["pathname", "pathnameshort--boolean--collection"],
  ["now", "now--datetime"],
  ["timeOfDay", "timeofday--time"],
  ["today", "today--date"],
  ["defineVariable", "definevariablename-string--projection-collection"],
  ["lowBoundary", "lowboundaryprecision-integer-decimal--date--datetime--time"],
  ["highBoundary", "highboundaryprecision-integer-decimal--date--datetime--time"],
  ["precision", "precision--integer"],
  ["yearOf", "yearof-integer"],
  ["monthOf", "monthof-integer"],
  ["dayOf", "dayof-integer"],
  ["hourOf", "hourof-integer"],
  ["minuteOf", "minuteof-integer"],
  ["secondOf", "secondof-integer"],
  ["millisecondOf", "millisecondof-integer"],
  ["timezoneOffsetOf", "timezoneoffsetof-decimal"],
  ["dateOf", "dateof-date"],
  ["timeOf", "timeof-time"],

  // 5.11 Date and Time Interval
  ["duration", "durationvalue-date--datetime--time-precision-string-integer"],
  ["difference", "differencevalue-date--datetime--time-precision-string-integer"],

  // 6.2.5 Comparison
  ["comparable", "comparableother--quantity--boolean"],

  // 6.3 Types (function forms)
  ["is", "istype--type-specifier"],
  ["as", "astype--type-specifier"],

  // 6.5 Boolean Logic
  ["not", "not--boolean"],

  // 7 Aggregates
  ["aggregate", "aggregateaggregator--total-this-index--collection--init--collection--collection"],
  ["sum", "sum--integer--long--decimal--quantity"],
  ["min", "min--integer--long--decimal--quantity--date--datetime--time--string"],
  ["max", "max--integer--long--decimal--quantity--date--datetime--time--string"],
  ["avg", "avg--decimal--quantity"],

  // 10.2 Reflection
  ["type", "type--collection"],
]);

/**
 * Operator anchors. Keyed by either `operationName@sectionNumber` (preferred,
 * because `+`/`-` appear under both Math 6.6 and Unary Operators 6.8) or by
 * the bare operator name as a fallback.
 */
export const operatorAnchors: ReadonlyMap<string, string> = new Map<string, string>([
  // 6.1 Equality
  ["=@6.1.1", "-equals"],
  ["~@6.1.2", "-equivalent"],
  ["!=@6.1.3", "-not-equals"],
  ["!~@6.1.4", "-not-equivalent"],

  // 6.2 Comparison
  [">@6.2.1", "-greater-than"],
  ["<@6.2.2", "-less-than"],
  ["<=@6.2.3", "-less-or-equal"],
  [">=@6.2.4", "-greater-or-equal"],

  // 6.3 Types (operator / keyword forms)
  ["is@6.3.1", "is-type-specifier"],
  ["as@6.3.3", "as-type-specifier"],

  // 6.4 Collections
  ["|@6.4.1", "-union-collections"],
  ["in@6.4.2", "in-membership--boolean"],
  ["contains@6.4.3", "contains-containership--boolean"],

  // 6.5 Boolean Logic
  ["and@6.5.1", "and"],
  ["or@6.5.2", "or"],
  // 6.5.3 `not` is published as a function (not--boolean); operations.json
  // doesn't include it but if it ever does, point it at the function anchor.
  ["not@6.5.3", "not--boolean"],
  ["xor@6.5.4", "xor"],
  ["implies@6.5.5", "implies"],

  // 6.6 Math
  ["*@6.6.1", "-multiplication"],
  ["/@6.6.2", "-division"],
  ["+@6.6.3", "-addition"],
  ["-@6.6.4", "--subtraction"],
  ["div@6.6.5", "div"],
  ["mod@6.6.6", "mod"],
  ["&@6.6.7", "-string-concatenation"],

  // 6.7 Date/Time Arithmetic (second occurrence of `+`/`-` in the spec).
  // operations.json does not currently include this category, but the
  // anchors are recorded here for completeness should it ever be added.
  ["+@6.7.1", "-addition-1"],
  ["-@6.7.2", "--subtraction-1"],

  // 6.8 Unary operators (single combined section in the spec, no per-operator
  // anchors - both `+` and `-` link to the section heading).
  ["+@6.8.1", "unary-operators--and--"],
  ["-@6.8.2", "unary-operators--and--"],

  // Bare-name fallbacks for symbols/keywords that are unambiguous in the spec.
  ["=", "-equals"],
  ["~", "-equivalent"],
  ["!=", "-not-equals"],
  ["!~", "-not-equivalent"],
  [">", "-greater-than"],
  ["<", "-less-than"],
  ["<=", "-less-or-equal"],
  [">=", "-greater-or-equal"],
  ["|", "-union-collections"],
  ["in", "in-membership--boolean"],
  ["and", "and"],
  ["or", "or"],
  ["xor", "xor"],
  ["implies", "implies"],
  ["div", "div"],
  ["mod", "mod"],
  ["&", "-string-concatenation"],
  ["*", "-multiplication"],
  ["/", "-division"],
  // For `+` and `-` the bare-name fallback prefers the math form (the more
  // common usage in expressions). Date/Time arithmetic and unary forms can
  // still be reached via the section-qualified keys above.
  ["+", "-addition"],
  ["-", "--subtraction"],
]);
