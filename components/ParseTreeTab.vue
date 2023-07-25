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
          .{{ item.Name }}(<template
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
    
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import fhirpath from "fhirpath";
import fhirpath_r4_model from "fhirpath/fhir-context/r4";
import fhirpath_r5_model from "fhirpath/fhir-context/r5";
import { UndesirableEffectFrequencyCodeType } from "@fhir-typescript/r4b-core/dist/valueSetCodes";

export interface JsonNode {
  id?: string;
  ExpressionType: string;
  Name: string;
  Arguments?: JsonNode[];
  ReturnType?: string;
}

interface fpjsNode {
  children?: fpjsNode[];
  terminalNodeText?: string[];
  text: string;
  type: string;
}

export function AllocateNodeIds(ast: JsonNode, startAt: number = 0): number {
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
      var ast: fpjsNode = fhirpath.parse(
        expression,
        context,
        fhirpath_r4_model
      );
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
    } catch (err) {
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
  