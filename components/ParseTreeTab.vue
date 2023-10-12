<template>
  <div>
    <v-alert v-show="parseErrorMessage" outlined border="left" type="error">{{
      parseErrorMessage
    }}</v-alert>
    <v-treeview
      :items="astInverted ? astInvertedTree : astTree"
      :open="astInverted ? astOpenInverted : astOpen"
      activatable
      :dense="true"
      item-key="id"
      item-text="Name"
      item-children="Arguments"
      open-on-click
    >
      <template v-slot:prepend="{ item }">
        <v-icon
          v-if="item.ReturnType && item.ReturnType.length == 0"
          color="red"
        >
          mdi-alert-octagon
        </v-icon>
      </template>
      <template v-slot:label="{ item }">
        <template v-if="item.ExpressionType === 'FunctionCallExpression'">
          .<template v-if="item.SpecUrl"><a @click.stop target="_blank" :href="item.SpecUrl">{{ item.Name }}</a></template><template v-else>{{ item.Name }}</template>(<template
            v-if="item.Arguments && item.Arguments.length > 0"
            >...</template
          >)
          <span
            style="color: grey"
            v-if="item.ReturnType && item.ReturnType.length > 0"
            >: {{ item.ReturnType }}</span
          >
        </template>
        <template v-else-if="item.ExpressionType === 'ConstantExpression'">
          <span style="color: #a31515">'{{ item.Name }}'</span>
          <span
            style="color: grey"
            v-if="item.ReturnType && item.ReturnType.length > 0"
            >: {{ item.ReturnType }}</span
          >
        </template>
        <template v-else-if="item.ExpressionType === 'ChildExpression'">
          .<span style="color: #318495; font-weight: bold">{{
            item.Name
          }}</span>
          <span
            style="color: grey"
            v-if="item.ReturnType && item.ReturnType.length > 0"
            >: {{ item.ReturnType }}</span
          >
        </template>
        <template v-else-if="item.ExpressionType === 'VariableRefExpression'">
          <span style="color: #b255a5; font-weight: bold"
            >%{{ item.Name }}</span
          >
          <span
            style="color: grey"
            v-if="item.ReturnType && item.ReturnType.length > 0"
            >: {{ item.ReturnType }}</span
          >
        </template>
        <template
          v-else-if="
            item.ExpressionType === 'AxisExpression' &&
            item.Name === 'builtin.this'
          "
        >
          <span style="color: #0000ff; font-weight: bold">$this</span>
          <span
            style="color: grey"
            v-if="item.ReturnType && item.ReturnType.length > 0"
            >: {{ item.ReturnType }}</span
          >
        </template>
        <template
          v-else-if="
            item.ExpressionType === 'AxisExpression' &&
            item.Name === 'builtin.that'
          "
        >
          <span style="color: #0000ff">Expression Scope</span>
          <span
            style="color: grey"
            v-if="item.ReturnType && item.ReturnType.length > 0"
            >: {{ item.ReturnType }}</span
          >
        </template>
        <template v-else>
          {{ item.Name }}
          <span
            style="color: grey"
            v-if="item.ReturnType && item.ReturnType.length > 0"
            >: {{ item.ReturnType }}</span
          >
          ({{ item.ExpressionType }})
        </template>
        <template
          v-if="
            (!item.ReturnType || item.ReturnType.length == 0) &&
            warnMissingTypeCalc
          "
        >
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
  color: rgba(0,0,0,.87);
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

const specFunctionReferences = {
  // Section 5 Functions
  // Section 5.1: Existence
  "empty": "http://hl7.org/fhirpath/N1/#empty-boolean", // 5.1.1
  "exists": "http://hl7.org/fhirpath/N1/#existscriteria-expression-boolean", // 5.1.2
  "all": "http://hl7.org/fhirpath/N1/#allcriteria-expression-boolean", // 5.1.3
  "allTrue": "http://hl7.org/fhirpath/N1/#alltrue-boolean", // 5.1.4
  "anyTrue": "http://hl7.org/fhirpath/N1/#anytrue-boolean", // 5.1.5
  "allFalse": "http://hl7.org/fhirpath/N1/#allfalse-boolean", // 5.1.6
  "anyFalse": "http://hl7.org/fhirpath/N1/#anyfalse-boolean", // 5.1.7
  "subsetOf": "http://hl7.org/fhirpath/N1/#subsetofother-collection-boolean", // 5.1.8
  "supersetOf": "http://hl7.org/fhirpath/N1/#supersetofother-collection-boolean", // 5.1.9
  "count": "http://hl7.org/fhirpath/N1/#count-integer", // 5.1.10
  "distinct": "http://hl7.org/fhirpath/N1/#distinct-collection", // 5.1.11
  "isDistinct": "http://hl7.org/fhirpath/N1/#isdistinct-boolean", // 5.1.12

  // Section 5.2: Filtering and projection
  "where": "http://hl7.org/fhirpath/N1/#wherecriteria-expression-collection", // 5.2.1
  "select": "http://hl7.org/fhirpath/N1/#selectprojection-expression-collection", // 5.2.2
  "repeat": "http://hl7.org/fhirpath/N1/#repeatprojection-expression-collection", // 5.2.3
  "ofType": "http://hl7.org/fhirpath/N1/#oftypetype-type-specifier-collection", // 5.2.4

  // Section 5.3: Subsetting
  // "": "", // 5.3.1 The `[]` indexer isn't being hyperlinked in the fhirpath lab
  "single": "http://hl7.org/fhirpath/N1/#single-collection", // 5.3.2
  "first": "http://hl7.org/fhirpath/N1/#first-collection", // 5.3.3
  "last": "http://hl7.org/fhirpath/N1/#last-collection", // 5.3.4
  "tail": "http://hl7.org/fhirpath/N1/#tail-collection", // 5.3.5
  "skip": "http://hl7.org/fhirpath/N1/#skipnum-integer-collection", // 5.3.6
  "take": "http://hl7.org/fhirpath/N1/#takenum-integer-collection", // 5.3.7
  "intersect": "http://hl7.org/fhirpath/N1/#intersectother-collection-collection", // 5.3.8
  "exclude": "http://hl7.org/fhirpath/N1/#excludeother-collection-collection", // 5.3.9

  // Section 5.4: Combining
  "union": "http://hl7.org/fhirpath/N1/#unionother-collection", // 5.4.1
  "combine": "http://hl7.org/fhirpath/N1/#combineother-collection-collection", // 5.4.2

  // Section 5.5: Conversion
  "iif": "http://hl7.org/fhirpath/N1/#iifcriterion-expression-true-result-collection-otherwise-result-collection-collection", // 1
  "toBoolean": "http://hl7.org/fhirpath/N1/#toboolean-boolean", // 2a
  "convertsToBoolean": "http://hl7.org/fhirpath/N1/#convertstoboolean-boolean", // 2b
  "toInteger": "http://hl7.org/fhirpath/N1/#tointeger-integer", // 3a
  "convertsToInteger": "http://hl7.org/fhirpath/N1/#convertstointeger-boolean", // 3b
  "toDate": "http://hl7.org/fhirpath/N1/#todate-date", // 4a
  "convertsToDate": "http://hl7.org/fhirpath/N1/#convertstodate-boolean", // 4b
  "toDateTime": "http://hl7.org/fhirpath/N1/#todatetime-datetime", // 5a
  "convertsToDateTime": "http://hl7.org/fhirpath/N1/#convertstodatetime-boolean", // 5b
  "toDecimal": "http://hl7.org/fhirpath/N1/#todecimal-decimal", // 6a
  "convertsToDecimal": "http://hl7.org/fhirpath/N1/#convertstodecimal-boolean", // 6b
  "toQuantity": "http://hl7.org/fhirpath/N1/#toquantityunit-string-quantity", // 7a
  "convertsToQuantity": "http://hl7.org/fhirpath/N1/#convertstoquantityunit-string-boolean", // 7b
  "toString": "http://hl7.org/fhirpath/N1/#tostring-string", // 8a
  "convertsToString": "http://hl7.org/fhirpath/N1/#convertstostring-string", // 8b
  "toTime": "http://hl7.org/fhirpath/N1/#totime-time", // 9a
  "convertsToTime": "http://hl7.org/fhirpath/N1/#convertstotime-boolean", // 9b

  // Section 5.6: String Manipulation
  "indexOf": "http://hl7.org/fhirpath/N1/#indexofsubstring-string-integer", // 5.6.1
  "substring": "http://hl7.org/fhirpath/N1/#substringstart-integer-length-integer-string", // 5.6.2
  "startsWith": "http://hl7.org/fhirpath/N1/#startswithprefix-string-boolean", // 5.6.3
  "endsWith": "http://hl7.org/fhirpath/N1/#endswithsuffix-string-boolean", // 5.6.4
  "contains": "http://hl7.org/fhirpath/N1/#containssubstring-string-boolean", // 5.6.5
  "upper": "http://hl7.org/fhirpath/N1/#upper-string", // 5.6.6
  "lower": "http://hl7.org/fhirpath/N1/#lower-string", // 5.6.7
  "replace": "http://hl7.org/fhirpath/N1/#replacepattern-string-substitution-string-string", // 5.6.8
  "matches": "http://hl7.org/fhirpath/N1/#matchesregex-string-boolean", // 5.6.9
  "replaceMatches": "http://hl7.org/fhirpath/N1/#replacematchesregex-string-substitution-string-string", // 5.6.10
  "length": "http://hl7.org/fhirpath/N1/#length-integer", // 5.6.11
  "toChars": "http://hl7.org/fhirpath/N1/#tochars-collection", // 5.6.12

  // Additional String Functions (approved an in the CI build)
  "encode": "https://build.fhir.org/ig/HL7/FHIRPath/#encodeformat-string-string", // 5.7.1
  "decode": "https://build.fhir.org/ig/HL7/FHIRPath/#decodeformat-string-string", // 5.7.2
  "escape": "https://build.fhir.org/ig/HL7/FHIRPath/#escapetarget-string-string", // 5.7.3
  "unescape": "https://build.fhir.org/ig/HL7/FHIRPath/#unescapetarget-string-string", // 5.7.4
  "trim": "https://build.fhir.org/ig/HL7/FHIRPath/#trim-string", // 5.7.5
  "split": "https://build.fhir.org/ig/HL7/FHIRPath/#splitseparator-string-collection", // 5.7.6
  "join": "https://build.fhir.org/ig/HL7/FHIRPath/#joinseparator-string-string", // 5.7.7

  // Section 5.7: Math
  "abs": "http://hl7.org/fhirpath/N1/#abs-integer-decimal-quantity", // 5.7.1
  "ceiling": "http://hl7.org/fhirpath/N1/#ceiling-integer", // 5.7.2
  "exp": "http://hl7.org/fhirpath/N1/#exp-decimal", // 5.7.3
  "floor": "http://hl7.org/fhirpath/N1/#floor-integer", // 5.7.4
  "ln": "http://hl7.org/fhirpath/N1/#ln-decimal", // 5.7.5
  "log": "http://hl7.org/fhirpath/N1/#logbase-decimal-decimal", // 5.7.6
  "power": "http://hl7.org/fhirpath/N1/#powerexponent-integer-decimal-integer-decimal", // 5.7.7
  "round": "http://hl7.org/fhirpath/N1/#roundprecision-integer-decimal", // 5.7.8
  "sqrt": "http://hl7.org/fhirpath/N1/#sqrt-decimal", // 5.7.9
  "truncate": "http://hl7.org/fhirpath/N1/#truncate-integer", // 5.7.10

  // Section 5.8: Tree Navigation
  "children": "http://hl7.org/fhirpath/N1/#children-collection", // 5.8.1
  "descendants": "http://hl7.org/fhirpath/N1/#descendants-collection", // 5.8.2

  // Section 5.9: Utility Functions
  "trace": "http://hl7.org/fhirpath/N1/#tracename-string-projection-expression-collection", // 5.9.1
  "now": "http://hl7.org/fhirpath/N1/#now-datetime", // 5.9.2a
  "timeOfDay": "http://hl7.org/fhirpath/N1/#timeofday-time", // 5.9.2b
  "today": "http://hl7.org/fhirpath/N1/#today-date", // 5.9.2c

  // Section 6.3: Types
  // 6.3.1 the `is` type specifier is not hyperlinked in the fhirpath lab
  "is": "http://hl7.org/fhirpath/N1/#istype-type-specifier", // 6.3.2
  // 6.3.3 the `as` type specifier is not hyperlinked in the fhirpath lab
  "as": "http://hl7.org/fhirpath/N1/#as-type-specifier", // 6.3.4

  // Section 6.4: Collections
  // 6.4.1 The `|` operator isn't hyperlinked in the fhirpath lab
  "in": "http://hl7.org/fhirpath/N1/#in-membership", // 6.4.2
  // 6.4.3 The `contains` operator isn't hyperlinked in the fhirpath lab

  // Section 6.5: Boolean Logic
  "and": "http://hl7.org/fhirpath/N1/#and", // 6.5.1
  "or": "http://hl7.org/fhirpath/N1/#or", // 6.5.2
  "not": "http://hl7.org/fhirpath/N1/#not-boolean", // 6.5.3
  "xor": "http://hl7.org/fhirpath/N1/#xor", // 6.5.4
  "implies": "http://hl7.org/fhirpath/N1/#implies", // 6.5.5

  // Section 6.6: Math operators are not hyperlinked in the fhirpath lab

  // Section 7: Aggregates
  "aggregate": "http://hl7.org/fhirpath/N1/#aggregateaggregator-expression-init-value-value", // 7.1

  // Section 10.2: Reflection
  "type": "http://hl7.org/fhirpath/N1/#reflection",

  // FHIR Extensions to fhirpath (linked from the R4 specification)
  "extension": "https://hl7.org/fhir/fhirpath.html#functions",
  "hasValue": "https://hl7.org/fhir/fhirpath.html#functions",
  "getValue": "https://hl7.org/fhir/fhirpath.html#functions",
  "resolve": "https://hl7.org/fhir/fhirpath.html#functions",
  "elementDefinition": "https://hl7.org/fhir/fhirpath.html#functions",
  "slice": "https://hl7.org/fhir/fhirpath.html#functions",
  "checkModifiers": "https://hl7.org/fhir/fhirpath.html#functions",
  "conformsTo": "https://hl7.org/fhir/fhirpath.html#functions",
  "memberOf": "https://hl7.org/fhir/fhirpath.html#functions",
  "subsumes": "https://hl7.org/fhir/fhirpath.html#functions",
  "subsumedBy": "https://hl7.org/fhir/fhirpath.html#functions",
  "htmlChecks ": "https://hl7.org/fhir/fhirpath.html#functions",
  "lowBoundary ": "https://hl7.org/fhir/fhirpath.html#functions",
  "highBoundary ": "https://hl7.org/fhir/fhirpath.html#functions",
  "comparable": "https://hl7.org/fhir/fhirpath.html#functions",
};

// Workaround to include the definition of the parse function
// (which is actually there, just not in the definition)
declare module "fhirpath" {
  export function parse(expression: string): any;
}

export interface JsonNode {
  id?: string;
  ExpressionType: string;
  Name: string;
  Arguments?: JsonNode[];
  ReturnType?: string;
  SpecUrl?: string;
}

interface fpjsNode {
  children?: fpjsNode[];
  terminalNodeText?: string[];
  text: string;
  type: string;
}

export function AllocateNodeIds(ast: JsonNode, startAt: number = 0): number {
  if (ast.ExpressionType === 'FunctionCallExpression'){
    // Check to see if this function has a spec link in our index
    const index = ast.Name as keyof typeof specFunctionReferences;
    if (specFunctionReferences[index]){
      ast.SpecUrl = specFunctionReferences[index];
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

  public displayTreeForExpression(context: string, expression: string) {
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
  