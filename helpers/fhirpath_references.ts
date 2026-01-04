/**
 * FHIRPath function and operator reference documentation
 * Extracted from ParseTreeTab.vue to be importable by non-Vue files
 */

export interface ISpecFunctionDetails {
  outlineNo?: string;
  title: string;
  specUrl: string;
  description?: string;
}

export const mapFunctionReferences = new Map<string, ISpecFunctionDetails>([
  // Section 5 Functions
  // Section 5.1: Existence
  ['empty', { outlineNo: '5.1.1', title: 'empty() : Boolean', specUrl: 'http://hl7.org/fhirpath/N1/#empty-boolean', description: 'Returns true if the input collection is empty ({ }) and false otherwise.' }],
  ["exists", { outlineNo: '5.1.2', title: ' exists([criteria : expression]) : Boolean', specUrl: "http://hl7.org/fhirpath/N1/#existscriteria-expression-boolean" }],
  ["all", { outlineNo: '5.1.3', title: 'all(criteria : expression) : Boolean', specUrl: "http://hl7.org/fhirpath/N1/#allcriteria-expression-boolean" }],
  ["allTrue", { outlineNo: '5.1.4', title: 'allTrue() : Boolean', specUrl: "http://hl7.org/fhirpath/N1/#alltrue-boolean" }],
  ["anyTrue", { outlineNo: '5.1.5', title: 'anyTrue() : Boolean', specUrl: "http://hl7.org/fhirpath/N1/#anytrue-boolean" }],
  ["allFalse", { outlineNo: '5.1.6', title: 'allFalse() : Boolean', specUrl: "http://hl7.org/fhirpath/N1/#allfalse-boolean" }],
  ["anyFalse", { outlineNo: '5.1.7', title: 'anyFalse() : Boolean', specUrl: "http://hl7.org/fhirpath/N1/#anyfalse-boolean" }],
  ["subsetOf", { outlineNo: '5.1.8', title: 'subsetOf(other : collection) : Boolean', specUrl: "http://hl7.org/fhirpath/N1/#subsetofother-collection-boolean" }],
  ["supersetOf", { outlineNo: '5.1.9', title: 'supersetOf(other : collection) : Boolean', specUrl: "http://hl7.org/fhirpath/N1/#supersetofother-collection-boolean" }],
  ["count", { outlineNo: '5.1.10', title: 'count() : Integer', specUrl: "http://hl7.org/fhirpath/N1/#count-integer" }],
  ["distinct", { outlineNo: '5.1.11', title: 'distinct() : collection', specUrl: "http://hl7.org/fhirpath/N1/#distinct-collection" }],
  ["isDistinct", { outlineNo: '5.1.12', title: 'isDistinct() : Boolean', specUrl: "http://hl7.org/fhirpath/N1/#isdistinct-boolean" }],

  // Section 5.2: Filtering and projection
  ["where", { outlineNo: '5.2.1', title: 'where(criteria : expression) : collection', specUrl: "http://hl7.org/fhirpath/N1/#wherecriteria-expression-collection" }],
  ["select", { outlineNo: '5.2.2', title: 'select(projection: expression) : collection', specUrl: "http://hl7.org/fhirpath/N1/#selectprojection-expression-collection" }],
  ["repeat", { outlineNo: '5.2.3', title: 'repeat(projection: expression) : collection', specUrl: "http://hl7.org/fhirpath/N1/#repeatprojection-expression-collection" }],
  ["ofType", { outlineNo: '5.2.4', title: 'ofType(type : type specifier) : collection', specUrl: "http://hl7.org/fhirpath/N1/#oftypetype-type-specifier-collection" }],

  // Section 5.3: Subsetting
  // 5.3.1 The `[]` indexer isn't being hyperlinked in the fhirpath lab
  ["single", { outlineNo: '5.3.2', title: 'single() : collection', specUrl: "http://hl7.org/fhirpath/N1/#single-collection"}],
  ["first", { outlineNo: '5.3.3', title: 'first() : collection', specUrl: "http://hl7.org/fhirpath/N1/#first-collection"}],
  ["last", { outlineNo: '5.3.4', title: 'last() : collection', specUrl: "http://hl7.org/fhirpath/N1/#last-collection"}],
  ["tail", { outlineNo: '5.3.5', title: 'tail() : collection', specUrl: "http://hl7.org/fhirpath/N1/#tail-collection"}],
  ["skip", { outlineNo: '5.3.6', title: 'skip(num : Integer) : collection', specUrl: "http://hl7.org/fhirpath/N1/#skipnum-integer-collection"}],
  ["take", { outlineNo: '5.3.7', title: 'take(num : Integer) : collection', specUrl: "http://hl7.org/fhirpath/N1/#takenum-integer-collection"}],
  ["intersect", { outlineNo: '5.3.8', title: 'intersect(other: collection) : collection', specUrl: "http://hl7.org/fhirpath/N1/#intersectother-collection-collection"}],
  ["exclude", { outlineNo: '5.3.9', title: 'exclude(other: collection) : collection', specUrl: "http://hl7.org/fhirpath/N1/#excludeother-collection-collection"}],

  // Section 5.4: Combining
  ["union", { outlineNo: '5.4.1', title: 'union(other : collection)', specUrl: "http://hl7.org/fhirpath/N1/#unionother-collection" }],
  ["combine", { outlineNo: '5.4.2', title: 'combine(other : collection) : collection', specUrl: "http://hl7.org/fhirpath/N1/#combineother-collection-collection"}],

  // Section 5.5: Conversion
  ["iif", { outlineNo: '5.5.1', title: 'iif(criterion: expression, true-result: collection [, otherwise-result: collection]) : collection', specUrl: "http://hl7.org/fhirpath/N1/#iifcriterion-expression-true-result-collection-otherwise-result-collection-collection"}],
  ["toBoolean", { outlineNo: '5.5.2a', title: 'toBoolean() : Boolean', specUrl: "http://hl7.org/fhirpath/N1/#toboolean-boolean"}],
  ["convertsToBoolean", { outlineNo: '5.5.2b', title: 'convertsToBoolean() : Boolean', specUrl: "http://hl7.org/fhirpath/N1/#convertstoboolean-boolean"}],
  ["toInteger", { outlineNo: '5.5.3a', title: 'toInteger() : Integer', specUrl: "http://hl7.org/fhirpath/N1/#tointeger-integer"}],
  ["convertsToInteger", { outlineNo: '5.5.3b', title: 'convertsToInteger() : Boolean', specUrl: "http://hl7.org/fhirpath/N1/#convertstointeger-boolean"}],
  ["toDate", { outlineNo: '5.5.4a', title: 'toDate() : Date', specUrl: "http://hl7.org/fhirpath/N1/#todate-date"}],
  ["convertsToDate", { outlineNo: '5.5.4b', title: 'convertsToDate() : Boolean', specUrl: "http://hl7.org/fhirpath/N1/#convertstodate-boolean"}],
  ["toDateTime", { outlineNo: '5.5.5a', title: 'toDateTime() : DateTime', specUrl: "http://hl7.org/fhirpath/N1/#todatetime-datetime"}],
  ["convertsToDateTime", { outlineNo: '5.5.5b', title: 'convertsToDateTime() : Boolean', specUrl: "http://hl7.org/fhirpath/N1/#convertstodatetime-boolean"}],
  ["toDecimal", { outlineNo: '5.5.6a', title: 'toDecimal() : Decimal', specUrl: "http://hl7.org/fhirpath/N1/#todecimal-decimal"}],
  ["convertsToDecimal", { outlineNo: '5.5.6b', title: 'convertsToDecimal() : Boolean', specUrl: "http://hl7.org/fhirpath/N1/#convertstodecimal-boolean"}],
  ["toQuantity", { outlineNo: '5.5.7a', title: 'toQuantity([unit : String]) : Quantity', specUrl: "http://hl7.org/fhirpath/N1/#toquantityunit-string-quantity"}],
  ["convertsToQuantity", { outlineNo: '5.5.7b', title: 'convertsToQuantity([unit : String]) : Boolean', specUrl: "http://hl7.org/fhirpath/N1/#convertstoquantityunit-string-boolean"}],
  ["toString", { outlineNo: '5.5.8a', title: 'toString() : String', specUrl: "http://hl7.org/fhirpath/N1/#tostring-string"}],
  ["convertsToString", { outlineNo: '5.5.8b', title: 'convertsToString() : String', specUrl: "http://hl7.org/fhirpath/N1/#convertstostring-string"}],
  ["toTime", { outlineNo: '5.5.9a', title: 'toTime() : Time', specUrl: "http://hl7.org/fhirpath/N1/#totime-time"}],
  ["convertsToTime", { outlineNo: '5.5.9b', title: 'convertsToTime() : Boolean', specUrl: "http://hl7.org/fhirpath/N1/#convertstotime-boolean"}],

  // Section 5.6: String Manipulation
  ["indexOf", { outlineNo: '5.6.1', title: 'indexOf(substring : String) : Integer', specUrl: "http://hl7.org/fhirpath/N1/#indexofsubstring-string-integer" }],
  ["substring", { outlineNo: '5.6.2', title: 'substring(start : Integer [, length : Integer]) : String', specUrl: "http://hl7.org/fhirpath/N1/#substringstart-integer-length-integer-string" }],
  ["startsWith", { outlineNo: '5.6.3', title: 'startsWith(prefix : String) : Boolean', specUrl: "http://hl7.org/fhirpath/N1/#startswithprefix-string-boolean" }],
  ["endsWith", { outlineNo: '5.6.4', title: 'endsWith(suffix : String) : Boolean', specUrl: "http://hl7.org/fhirpath/N1/#endswithsuffix-string-boolean" }],
  ["contains", { outlineNo: '5.6.5', title: 'contains(substring : String) : Boolean', specUrl: "http://hl7.org/fhirpath/N1/#containssubstring-string-boolean" }],
  ["upper", { outlineNo: '5.6.6', title: 'upper() : String', specUrl: "http://hl7.org/fhirpath/N1/#upper-string" }],
  ["lower", { outlineNo: '5.6.7', title: 'lower() : String', specUrl: "http://hl7.org/fhirpath/N1/#lower-string" }],
  ["replace", {outlineNo: '5.6.8', title: 'replace(pattern : String, substitution : String) : String', specUrl: "http://hl7.org/fhirpath/N1/#replacepattern-string-substitution-string-string"}],
  ["matches", { outlineNo: '5.6.9', title: 'matches(regex : String) : Boolean', specUrl: "http://hl7.org/fhirpath/N1/#matchesregex-string-boolean" }],
  ["replaceMatches", { outlineNo: '5.6.10', title: 'replaceMatches(regex : String, substitution: String) : String', specUrl: "http://hl7.org/fhirpath/N1/#replacematchesregex-string-substitution-string-string" }],
  ["length", { outlineNo: '5.6.11', title: 'length() : Integer', specUrl: "http://hl7.org/fhirpath/N1/#length-integer" }],
  ["toChars", { outlineNo: '5.6.12', title: 'toChars() : collection', specUrl: "http://hl7.org/fhirpath/N1/#tochars-collection" }],

  // Additional String Functions (approved an in the CI build)
  ["encode", { outlineNo: '5.7.1', title: 'encode(format : String) : String', specUrl: "https://build.fhir.org/ig/HL7/FHIRPath/#encodeformat-string-string"}],
  ["decode", { outlineNo: '5.7.2', title: 'decode(format : String) : String', specUrl: "https://build.fhir.org/ig/HL7/FHIRPath/#decodeformat-string-string"}],
  ["escape", { outlineNo: '5.7.3', title: 'escape(target : String) : String', specUrl: "https://build.fhir.org/ig/HL7/FHIRPath/#escapetarget-string-string"}],
  ["unescape", { outlineNo: '5.7.4', title: 'unescape(target : String) : String', specUrl: "https://build.fhir.org/ig/HL7/FHIRPath/#unescapetarget-string-string"}],
  ["trim", { outlineNo: '5.7.5', title: 'trim() : String', specUrl: "https://build.fhir.org/ig/HL7/FHIRPath/#trim-string"}],
  ["split", { outlineNo: '5.7.6', title: 'split(separator: String) : collection', specUrl: "https://build.fhir.org/ig/HL7/FHIRPath/#splitseparator-string-collection"}],
  ["join", { outlineNo: '5.7.7', title: 'join([separator: String]) : String', specUrl: "https://build.fhir.org/ig/HL7/FHIRPath/#joinseparator-string-string"}],

  // Section 5.7: Math
  ["abs", { outlineNo: '5.7.1', title: 'abs() : Integer | Decimal | Quantity', specUrl: "http://hl7.org/fhirpath/N1/#abs-integer-decimal-quantity"}],
  ["ceiling", { outlineNo: '5.7.2', title: 'ceiling() : Integer', specUrl: "http://hl7.org/fhirpath/N1/#ceiling-integer"}],
  ["exp", { outlineNo: '5.7.3', title: 'exp() : Decimal', specUrl: "http://hl7.org/fhirpath/N1/#exp-decimal"}],
  ["floor", { outlineNo: '5.7.4', title: 'floor() : Integer', specUrl: "http://hl7.org/fhirpath/N1/#floor-integer"}],
  ["ln", { outlineNo: '5.7.5', title: 'ln() : Decimal', specUrl: "http://hl7.org/fhirpath/N1/#ln-decimal"}],
  ["log", { outlineNo: '5.7.6', title: 'log(base : Decimal) : Decimal', specUrl: "http://hl7.org/fhirpath/N1/#logbase-decimal-decimal"}],
  ["power", { outlineNo: '5.7.7', title: 'power(exponent : Integer | Decimal) : Integer | Decimal', specUrl: "http://hl7.org/fhirpath/N1/#powerexponent-integer-decimal-integer-decimal"}],
  ["round", { outlineNo: '5.7.8', title: 'round([precision : Integer]) : Decimal', specUrl: "http://hl7.org/fhirpath/N1/#roundprecision-integer-decimal"}],
  ["sqrt", { outlineNo: '5.7.9', title: 'sqrt() : Decimal', specUrl: "http://hl7.org/fhirpath/N1/#sqrt-decimal"}],
  ["truncate", { outlineNo: '5.7.10', title: 'truncate() : Integer', specUrl: "http://hl7.org/fhirpath/N1/#truncate-integer"}],

  // Section 5.8: Tree Navigation
  ["children", { outlineNo: '5.8.1', title: 'children() : collection', specUrl: "http://hl7.org/fhirpath/N1/#children-collection"}],
  ["descendants", { outlineNo: '5.8.2', title: 'descendants() : collection', specUrl: "http://hl7.org/fhirpath/N1/#descendants-collection"}],

  // Section 5.9: Utility Functions
  ["trace", { outlineNo: '5.9.1', title: 'trace(name : String [, projection: Expression]) : collection', specUrl: "http://hl7.org/fhirpath/N1/#tracename-string-projection-expression-collection"}],
  ["now", { outlineNo: '5.9.2a', title: 'now() : DateTime', specUrl: "http://hl7.org/fhirpath/N1/#now-datetime"}],
  ["timeOfDay", { outlineNo: '5.9.2b', title: 'timeOfDay() : Time', specUrl: "http://hl7.org/fhirpath/N1/#timeofday-time"}],
  ["today", { outlineNo: '5.9.2c', title: 'today() : Date', specUrl: "http://hl7.org/fhirpath/N1/#today-date"}],

  // Section 5.10 (utility functions in the CI build)
  ["defineVariable", { outlineNo: '5.10.3', title: 'defineVariable(name : string [, expr: expression]]) : collection', specUrl: "https://build.fhir.org/ig/HL7/FHIRPath/index.html#definevariablename-string--expr-expression"}],

  // Section 6.3: Types
  ["is", { outlineNo: '6.3.2', title: 'is(type : type specifier)', specUrl: "http://hl7.org/fhirpath/N1/#istype-type-specifier"}],
  ["as", { outlineNo: '6.3.4', title: 'as(type : type specifier)', specUrl: "http://hl7.org/fhirpath/N1/#as-type-specifier"}],

  // Section 6.6: Math operators are not hyperlinked in the fhirpath lab

  // Section 7: Aggregates
  ["aggregate", { outlineNo: '7.1', title: 'aggregate(aggregator : expression [, init : value]) : value', specUrl: "http://hl7.org/fhirpath/N1/#aggregateaggregator-expression-init-value-value"}],

  // Section 10.2: Reflection
  ["type", { title: 'type() : SimpleTypeInfo | ClassInfo | ListTypeInfo', specUrl: "http://hl7.org/fhirpath/N1/#reflection"}],

  // FHIR Extensions to fhirpath (linked from the R4 specification)
  ["extension", { title: 'extension(url : string) : collection', specUrl: "https://hl7.org/fhir/fhirpath.html#functions" }],
  ["hasValue", { title: 'hasValue() : Boolean', specUrl: "https://hl7.org/fhir/fhirpath.html#functions"}],
  ["getValue", { title: 'getValue() : System.[type]', specUrl: "https://hl7.org/fhir/fhirpath.html#functions"}],
  ["resolve", { title: 'resolve() : collection', specUrl: "https://hl7.org/fhir/fhirpath.html#functions"}],
  ["elementDefinition", { title: 'elementDefinition() : collection', specUrl: "https://hl7.org/fhir/fhirpath.html#functions"}],
  ["slice", { title: 'slice(structure : string, name : string) : collection', specUrl: "https://hl7.org/fhir/fhirpath.html#functions"}],
  ["checkModifiers", { title: 'checkModifiers(modifier : string) : collection', specUrl: "https://hl7.org/fhir/fhirpath.html#functions"}],
  ["conformsTo", { title: 'conformsTo(structure : string) : Boolean', specUrl: "https://hl7.org/fhir/fhirpath.html#functions"}],
  ["memberOf", { title: 'memberOf(valueset : string) : Boolean', specUrl: "https://hl7.org/fhir/fhirpath.html#functions"}],
  ["subsumes", { title: 'subsumes(code : Coding | CodeableConcept) : Boolean', specUrl: "https://hl7.org/fhir/fhirpath.html#functions"}],
  ["subsumedBy", { title: 'subsumedBy(code: Coding | CodeableConcept) : Boolean', specUrl: "https://hl7.org/fhir/fhirpath.html#functions"}],
  ["htmlChecks", { title: 'htmlChecks : Boolean', specUrl: "https://hl7.org/fhir/fhirpath.html#functions"}],
  ["lowBoundary", { title: 'lowBoundary : T', specUrl: "https://hl7.org/fhir/fhirpath.html#functions"}],
  ["highBoundary", { title: 'highBoundary : T', specUrl: "https://hl7.org/fhir/fhirpath.html#functions"}],
  ["comparable", { title: 'comparable(quantity) : boolean', specUrl: "https://hl7.org/fhir/fhirpath.html#functions"}],

  // SDC Extensions to fhirpath (linked from the SDC specification)
  ["ordinal", { title: 'ordinal() : decimal', specUrl: "https://build.fhir.org/ig/HL7/sdc/expressions.html#fhirpath-supplements"}],
  ["answers", { title: 'answers() : QuestionnaireItem#Answer', specUrl: "https://build.fhir.org/ig/HL7/sdc/expressions.html#fhirpath-supplements"}],
  ["sum", { title: 'sum() : decimal | integer | quantity', specUrl: "https://build.fhir.org/ig/HL7/sdc/expressions.html#fhirpath-supplements"}],
  ["min", { title: 'min() : decimal | integer | quantity', specUrl: "https://build.fhir.org/ig/HL7/sdc/expressions.html#fhirpath-supplements"}],
  ["max", { title: 'max() : decimal | integer | quantity', specUrl: "https://build.fhir.org/ig/HL7/sdc/expressions.html#fhirpath-supplements"}],
  ["avg", { title: 'avg() : decimal | integer | quantity', specUrl: "https://build.fhir.org/ig/HL7/sdc/expressions.html#fhirpath-supplements"}],
]);

export const mapOperatorReferences = new Map<string, ISpecFunctionDetails>([
  // Section 6.3: Types
  ["is", { outlineNo: '6.3.1', title: 'is type-specifier', specUrl: "http://hl7.org/fhirpath/N1/#is-type-specifier"}],
  ["as", { outlineNo: '6.3.3', title: 'as type-specifier', specUrl: "http://hl7.org/fhirpath/N1/#as-type-specifier"}],

  // Section 6.4: Collections
  // 6.4.1 The `|` operator isn't hyperlinked in the fhirpath lab
  ["in", { outlineNo: '6.4.2', title: 'in', specUrl: "http://hl7.org/fhirpath/N1/#in-membership"}],
  ["contains", { outlineNo: '6.4.3', title: 'contains', specUrl: "http://hl7.org/fhirpath/N1/#contains-containership"}],

  // Section 6.5: Boolean Logic
  ["and", { outlineNo: '6.5.1', title: 'and', specUrl: "http://hl7.org/fhirpath/N1/#and"}],
  ["or", { outlineNo: '6.5.2', title: 'or', specUrl: "http://hl7.org/fhirpath/N1/#or"}],
  ["not", { outlineNo: '6.5.3', title: 'not', specUrl: "http://hl7.org/fhirpath/N1/#not-boolean"}],
  ["xor", { outlineNo: '6.5.4', title: 'xor', specUrl: "http://hl7.org/fhirpath/N1/#xor"}],
  ["implies", { outlineNo: '6.5.5', title: 'implies', specUrl: "http://hl7.org/fhirpath/N1/#implies"}],
]);
