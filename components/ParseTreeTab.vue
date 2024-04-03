<template>
  <div>
    <v-alert v-show="parseErrorMessage" outlined border="left" type="error">{{
      parseErrorMessage
    }}</v-alert>
    <v-treeview :items="astInverted ? astInvertedTree : astTree" :open="astInverted ? astOpenInverted : astOpen"
      activatable :dense="true" item-key="id" item-text="Name" item-children="Arguments" open-on-click>
      <template v-slot:prepend="{ item }">
        <v-icon v-if="item.ReturnType && item.ReturnType.length == 0" color="red">
          mdi-alert-octagon
        </v-icon>
      </template>
      <template v-slot:label="{ item }">
        <template v-if="item.ExpressionType === 'FunctionCallExpression'">
          .<template v-if="item.SpecUrl"><a @click.stop target="_blank" :title="nodeTooltip(item)" :href="item.SpecUrl">{{
            item.Name }}</a></template><template v-else>{{ item.Name }}</template>(<template
            v-if="item.Arguments && item.Arguments.length > 0">...</template>)
          <span style="color: grey" v-if="item.ReturnType && item.ReturnType.length > 0">: {{ item.ReturnType }}</span>
        </template>
        <template v-else-if="item.ExpressionType === 'ConstantExpression'">
          <span style="color: #a31515">'{{ item.Name }}'</span>
          <span style="color: grey" v-if="item.ReturnType && item.ReturnType.length > 0">: {{ item.ReturnType }}</span>
        </template>
        <template v-else-if="item.ExpressionType === 'ChildExpression'">
          .<span style="color: #318495; font-weight: bold">{{
            item.Name
          }}</span>
          <span style="color: grey" v-if="item.ReturnType && item.ReturnType.length > 0">: {{ item.ReturnType }}</span>
        </template>
        <template v-else-if="item.ExpressionType === 'VariableRefExpression'">
          <span style="color: #b255a5; font-weight: bold">%{{ item.Name }}</span>
          <span style="color: grey" v-if="item.ReturnType && item.ReturnType.length > 0">: {{ item.ReturnType }}</span>
        </template>
        <template v-else-if="item.ExpressionType === 'AxisExpression' &&
          item.Name === 'builtin.this'
          ">
          <span style="color: #0000ff; font-weight: bold">$this</span>
          <span style="color: grey" v-if="item.ReturnType && item.ReturnType.length > 0">: {{ item.ReturnType }}</span>
        </template>
        <template v-else-if="item.ExpressionType === 'AxisExpression' &&
          item.Name === 'builtin.that'
          ">
          <span style="color: #0000ff">Expression Scope</span>
          <span style="color: grey" v-if="item.ReturnType && item.ReturnType.length > 0">: {{ item.ReturnType }}</span>
        </template>
        <template v-else>
          {{ item.Name }}
          <span style="color: grey" v-if="item.ReturnType && item.ReturnType.length > 0">: {{ item.ReturnType }}</span>
          ({{ item.ExpressionType }})
        </template>
        <template v-if="(!item.ReturnType || item.ReturnType.length == 0) &&
          warnMissingTypeCalc
          ">
          <i><b>(no return type calculated)</b></i>
        </template>
        <!-- <template>
        {{ item.id }}
      </template> -->
      </template>
    </v-treeview>
    <v-checkbox v-model="astInverted" label="Inverted Tree"></v-checkbox>
  </div>
</template>  

<style scoped>
.v-application a {
  color: rgba(0, 0, 0, .87);
}

a:hover {
  color: #1976d2;
}
</style>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import fhirpath from "fhirpath";
import fhirpath_r4_model from "fhirpath/fhir-context/r4";
import fhirpath_r5_model from "fhirpath/fhir-context/r5";

interface ISpecFunctionDetails {
  outlineNo?: string;
  title: string;
  specUrl: string;
  description?: string;
}

const mapFunctionReferences = new Map<string, ISpecFunctionDetails>([
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
  ["htmlChecks ", { title: 'htmlChecks : Boolean', specUrl: "https://hl7.org/fhir/fhirpath.html#functions"}],
  ["lowBoundary ", { title: 'lowBoundary : T', specUrl: "https://hl7.org/fhir/fhirpath.html#functions"}],
  ["highBoundary ", { title: 'highBoundary : T', specUrl: "https://hl7.org/fhir/fhirpath.html#functions"}],
  ["comparable", { title: 'comparable(quantity) : boolean', specUrl: "https://hl7.org/fhir/fhirpath.html#functions"}],

  // SDC Extensions to fhirpath (linked from the SDC specification)
  ["ordinal", { title: 'ordinal() : decimal', specUrl: "https://build.fhir.org/ig/HL7/sdc/expressions.html#fhirpath-supplements"}],
  ["answers", { title: 'answers() : QuestionnaireItem#Answer', specUrl: "https://build.fhir.org/ig/HL7/sdc/expressions.html#fhirpath-supplements"}],
  ["sum", { title: 'sum() : decimal | integer | quantity', specUrl: "https://build.fhir.org/ig/HL7/sdc/expressions.html#fhirpath-supplements"}],
  ["min", { title: 'min() : decimal | integer | quantity', specUrl: "https://build.fhir.org/ig/HL7/sdc/expressions.html#fhirpath-supplements"}],
  ["max", { title: 'max() : decimal | integer | quantity', specUrl: "https://build.fhir.org/ig/HL7/sdc/expressions.html#fhirpath-supplements"}],
  ["avg", { title: 'avg() : decimal | integer | quantity', specUrl: "https://build.fhir.org/ig/HL7/sdc/expressions.html#fhirpath-supplements"}],
]);

const mapOperatorReferences = new Map<string, ISpecFunctionDetails>([
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

export interface JsonNode {
  id?: string;
  ExpressionType: string;
  Name: string;
  Arguments?: JsonNode[];
  ReturnType?: string;
  SpecUrl?: string;
}

/** Fhirpath.js AST Node interface */
export interface fpjsNode {
  children?: fpjsNode[];
  terminalNodeText?: string[];
  text: string;
  type: string;
}

export function GetExternalVariablesUsed(node: fpjsNode, ignoreVar: string[] = []) : string[] {
  let result: string[] = [];
  if (node.type === 'Functn') {
    if (node.text.startsWith('defineVariable') && node.children?.length === 2){
      var varName = node.children[1].text.substring(1, node.children[1].text.length - 1);
      ignoreVar.push(varName);
    }
  }
  if (node.type === 'TermExpression' && node.text?.startsWith('%')){
    let varName = node.text.substring(1);
    if (!ignoreVar.includes(varName) && !result.includes(varName)){
      result.push(varName);
    }
  }
  if (node.children) {
    node.children.forEach((element) => {
      let childResult = GetExternalVariablesUsed(element, ignoreVar);
      // merge the childResult into the overall result removing duplicates
      result = result.concat(childResult.filter((item) => !result.includes(item)));
    });
  }
  return result;
}

export function AllocateNodeIds(ast: JsonNode, startAt: number = 0): number {
  if (ast.ExpressionType === 'FunctionCallExpression') {
    // Check to see if this function has a spec link in our index
    if (mapFunctionReferences.has(ast.Name)) {
      const ref = mapFunctionReferences.get(ast.Name);
      if (ref) {
        ast.SpecUrl = ref.specUrl;
      }
    }
  }
  ast.id = startAt.toString();
  startAt++;
  if (ast.Arguments && ast.Arguments.length > 0) {
    return AllocateNodeCollectionIds(ast.Arguments, startAt);
  }
  return startAt;
}

export function AllocateNodeCollectionIds(
  ast: JsonNode[],
  startAt: number = 0
): number {
  ast.forEach((element) => {
    startAt = AllocateNodeIds(element, startAt);
  });
  return startAt;
}

export function InvertTree(ast: JsonNode): JsonNode[] {
  let rootItem: JsonNode = {
    ExpressionType: ast.ExpressionType,
    Name: ast.Name,
    Arguments: [],
    ReturnType: ast.ReturnType,
  };

  let result: JsonNode[] = [];
  if (ast.Arguments && ast.Arguments.length > 0) {
    const focus = InvertTree(ast.Arguments[0]);
    result.push(...focus);
    if (ast.Arguments?.length > 1) {
      ast.Arguments.forEach((element, index) => {
        if (index > 0) {
          const elementArgs = InvertTree(element);
          rootItem.Arguments?.push(...elementArgs);
        }
      });
    } else {
      delete rootItem.Arguments;
    }
  }
  result.push(rootItem);
  return result;
}

function ConvertFhirPathJsToAst(ast: fpjsNode): JsonNode {
  let result: JsonNode = {
    ExpressionType: ast.type,
    Name: ast.terminalNodeText ? ast.terminalNodeText[0] : "", //text,
    Arguments: [],
    ReturnType: "",
  };

  // convert all the child nodes
  if (ast.children) {
    ast.children.forEach((element: fpjsNode) => {
      result.Arguments?.push(ConvertFhirPathJsToAst(element));
    });
  } else {
    delete result.Arguments;
  }

  // Populate the Type for known types
  switch (result.ExpressionType) {
    case "StringLiteral":
      result.ReturnType = "string";
      result.ExpressionType = "ConstantExpression";
      result.Name = result.Name.substring(1, result.Name.length - 1);
      break;
    case "BooleanLiteral":
      result.ReturnType = "boolean";
      result.ExpressionType = "ConstantExpression";
      break;
    case "QuantityLiteral":
      result.ReturnType = "Quantity";
      result.ExpressionType = "ConstantExpression";
      if (result.Arguments && result.Arguments.length > 0) {
        result.Name = result.Arguments[0].Name;
      }
      delete result.Arguments;
      return result;
      break;
    case "DateTimeLiteral":
      result.ReturnType = "dateTime";
      result.ExpressionType = "ConstantExpression";
      result.Name = result.Name.substring(1);
      break;
    case "TimeLiteral":
      result.ReturnType = "time";
      result.ExpressionType = "ConstantExpression";
      result.Name = result.Name.substring(2);
      break;
    case "NumberLiteral":
      result.ReturnType = "Number (decimal or integer)";
      result.ExpressionType = "ConstantExpression";
      break;
  }

  // Short circuit some of the AST that is not useful to display
  if (
    result.Arguments?.length == 1 &&
    result.ExpressionType == "FunctionInvocation"
  ) {
    return result.Arguments[0];
  }
  if (result.Arguments?.length == 1 && result.ExpressionType == "Quantity") {
    result.Name = result.Name + " " + result.Arguments[0].Name;
    delete result.Arguments;
    return result;
  }
  if (result.Arguments?.length == 1 && result.ExpressionType == "Unit") {
    return result.Arguments[0];
  }
  if (result.Arguments?.length == 1 && result.ExpressionType == "LiteralTerm") {
    return result.Arguments[0];
  }
  if (
    result.Arguments?.length == 1 &&
    result.ExpressionType == "TermExpression"
  ) {
    return result.Arguments[0];
  }
  if (
    result.Arguments?.length == 1 &&
    result.ExpressionType == "ExternalConstantTerm"
  ) {
    return result.Arguments[0];
  }

  if (
    result.ExpressionType == "MemberInvocation" &&
    result.Arguments &&
    result.Arguments.length === 1 &&
    result.Arguments[0].ExpressionType == "Identifier"
  ) {
    result.ExpressionType = "ChildExpression";
    result.Name = result.Arguments[0].Name ?? "";
    delete result.Arguments;
  }

  if (
    result.ExpressionType == "ExternalConstant" &&
    result.Arguments &&
    result.Arguments.length === 1 &&
    result.Arguments[0].ExpressionType == "Identifier"
  ) {
    result.ExpressionType = "VariableRefExpression";
    result.Name = result.Arguments[0].Name ?? "";
    delete result.Arguments;
  }

  // restructure the function call part of the tree
  if (
    result.ExpressionType == "Functn" &&
    result.Arguments &&
    result.Arguments.length === 2 &&
    result.Arguments[0].ExpressionType == "Identifier" &&
    result.Arguments[1].ExpressionType == "ParamList"
  ) {
    result.ExpressionType = "FunctionCallExpression";
    result.Name = result.Arguments[0].Name ?? "";
    result.Arguments = result.Arguments[1].Arguments;
  }
  if (
    result.ExpressionType == "Functn" &&
    result.Arguments &&
    result.Arguments.length === 1 &&
    result.Arguments[0].ExpressionType == "Identifier"
  ) {
    result.ExpressionType = "FunctionCallExpression";
    result.Name = result.Arguments[0].Name ?? "";
    delete result.Arguments;
  }

  if (
    result.Arguments?.length == 1 &&
    result.ExpressionType == "InvocationTerm" // this is the "scoping node"
  ) {
    // inject the scoping node into the tree
    let scopeNode: JsonNode = {
      ExpressionType: "AxisExpression",
      Name: "builtin.that",
      Arguments: [],
      ReturnType: "",
    };
    if (result.Arguments[0].Arguments)
      result.Arguments[0].Arguments?.unshift(scopeNode);
    else result.Arguments[0].Arguments = [scopeNode];
    return result.Arguments[0];
  }

  // -----------
  if (
    result.ExpressionType == "InvocationExpression" &&
    result.Arguments &&
    result.Arguments?.length > 1
  ) {
    if (result.Arguments[1].Arguments)
      result.Arguments[1].Arguments?.unshift(result.Arguments[0]);
    else result.Arguments[1].Arguments = [result.Arguments[0]];
    return result.Arguments[1];
  }
  return result;
}

@Component
export default class ParseTreeTab extends Vue {
  astTree: JsonNode[] = [];
  astInvertedTree: JsonNode[] = [];
  astOpen: string[] = [];
  astOpenInverted: string[] = [];
  public astInverted: boolean = false;
  public warnMissingTypeCalc: boolean = false;
  public parseErrorMessage: string | undefined = "";

  nodeTooltip(node: JsonNode): string | undefined {
    if (mapFunctionReferences.has(node.Name)) {
      const ref = mapFunctionReferences.get(node.Name);
      if (ref) {
        var title = ref.title;
        if (ref.description) {
          title += "\n" + ref.description;
        }
        if (ref.specUrl) {
          title += "\n" + ref.specUrl;
        }
        return title;
      }
    }
    if (node.SpecUrl) {
      return node.SpecUrl;
    }
    return undefined;
  }
  public clearDisplay(message: string | undefined = undefined) {
    this.astTree = [];
    this.astInvertedTree = [];
    this.astOpen = [];
    this.astOpenInverted = [];
    this.parseErrorMessage = message;
  }
  public displayTree(node: JsonNode) {
    this.warnMissingTypeCalc = true;
    this.parseErrorMessage = undefined;

    this.astTree = [node];
    var lastId = AllocateNodeCollectionIds(this.astTree);
    for (let i = 0; i < lastId; i++) {
      this.astOpen.push(i.toString());
    }

    this.astInvertedTree = InvertTree(this.astTree[0]);
    lastId = AllocateNodeCollectionIds(this.astInvertedTree);
    for (let i = 0; i < lastId; i++) {
      this.astOpenInverted.push(i.toString());
    }
  }

  public displayTreeForExpression(context: string, expression: string): fpjsNode | undefined {
    this.warnMissingTypeCalc = false;
    this.parseErrorMessage = undefined;

    try {
      var ast: fpjsNode = fhirpath.parse(expression);
      if (ast.children && ast.children.length > 0) {
        const node = ConvertFhirPathJsToAst(ast);
        this.astTree =
          (node.Arguments ? node.Arguments[0].Arguments : []) ?? [];
        var lastId = AllocateNodeCollectionIds(this.astTree);
        for (let i = 0; i < lastId; i++) {
          this.astOpen.push(i.toString());
        }

        this.astInvertedTree = InvertTree(this.astTree[0]);
        lastId = AllocateNodeCollectionIds(this.astInvertedTree);
        for (let i = 0; i < lastId; i++) {
          this.astOpenInverted.push(i.toString());
        }
        // console.log("raw:", JSON.stringify(ast, null, 2));
        console.log("AST:", JSON.stringify(this.astTree, null, 2));
        // console.log("Inv AST:", JSON.stringify(this.astInvertedTree, null, 2));

        for (let i = 0; i < lastId; i++) {
          this.astOpen.push(i.toString());
          this.astOpenInverted.push(i.toString());
        }
      }
      return ast;
    } catch (err: any) {
      console.log(err);
      this.parseErrorMessage = err?.message;
    }
  }

  scrollToBottom() {
    this.$nextTick(() => {
      const container = this.$refs.messagesContainer as HTMLElement;
      container.scrollTop = container.scrollHeight;
    });
  }
}
</script>  
