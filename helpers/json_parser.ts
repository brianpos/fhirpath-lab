import antlr4 from "antlr4";
import { ParseTreeWalker } from "antlr4";
import Lexer from "~/json-parser/JSON5Lexer";
import Parser, { ArrContext, Json5Context, KeyContext, NumberContext, ObjContext, PairContext, ValueContext } from "~/json-parser/JSON5Parser";
import Listener from "~/json-parser/JSON5Listener";

/**
 * Positional information about a JSON node.
 * (Broken into property declaration and value declaration)
 */
export interface IJsonNodePosition {
  /** The line number on which the property declaration starts. */
  line: number;
  /** The column number on which the property declaration starts. */
  column: number;

  /** The absolute character index at which the property declaration starts. */
  prop_start_pos: number;
  /** The absolute character index at which the property declaration ends. */
  prop_stop_pos: number;

  /** The absolute character index at which the property value starts. */
  value_start_pos?: number;
  /** The absolute character index at which the property value ends. */
  value_stop_pos?: number;
}

/** Details of a JSON object as used in FHIRPath expressions
 * (including path information and positional information)
 */
export interface IJsonNode {
  /** The raw name of the property/object */
  text?: string;

  /** The full path to the node */
  Path?: string;

  /** properties of the object, or items in an array */
  children?: IJsonNode[];

  /** Positional information about the node. */
  position?: IJsonNodePosition;

  // Internal processing properties used during processing
  isArray?: boolean;
}

export function findNodeByPath(node: IJsonNode, path: string): IJsonNode | undefined {
  if (node.Path == path)
    return node;

  // Scan any children for the path
  if (node.children) {
    for (let child of node.children) {
      let found = findNodeByPath(child, path);
      if (found)
        return found;
    }
  }

  // wasn't found in children, so check if had the array indexer appended
  // (and we weren't actually an array - which is valid fhirpath syntax)
  if (node.Path + '[0]' == path)
    return node;

  return undefined;
}

export function parseJson(path: string) {
  var chars = new antlr4.CharStream(path);
  var lexer = new Lexer(chars);
  var tokens = new antlr4.CommonTokenStream(lexer);
  var parser = new Parser(tokens);
  parser.buildParseTrees = true;

  // Remove any error listeners as we assume that the format of the json
  // is valid and don't want to report any issues from parsing
  // Typically used on JSON that was validated elsewhere, so should be valid
  lexer.removeErrorListeners();
  parser.removeErrorListeners();

  var tree = parser.json5();

  // Now walk the tree to populate fhir object's path tree
  var printer = new PathListener();
  ParseTreeWalker.DEFAULT.walk(printer, tree);

  return printer.result();
};

class PathListener extends Listener {
  constructor() {
    super();
    this.ast2 = { children: [] };
    this.parentStack2.push(this.ast2);
  }

  public result() {
    return this.ast2;
  }

  public ast2?: IJsonNode;
  private parentStack2: IJsonNode[] = [];

  enterObj = (ctx: ObjContext) => {
    let parentNode = this.parentStack2[this.parentStack2.length - 1];
    if (parentNode.isArray) {
      var node: IJsonNode = {
        Path: parentNode.Path + '[' + parentNode.children?.length + ']',
        position: { line: ctx.start.line, column: ctx.start.column, prop_start_pos: ctx.start.start, prop_stop_pos: ctx.start.stop },
        children: []
      };
      parentNode.children?.push(node);
      this.parentStack2.push(node);
    }
  }
  exitObj = (ctx: ObjContext) => {
    let currentNode = this.parentStack2[this.parentStack2.length - 1];
    if (this.parentStack2.length > 1) {
      let parentNode = this.parentStack2[this.parentStack2.length - 2];
      if (parentNode.isArray) {
        if (currentNode.position) {
          currentNode.position.value_start_pos = ctx.stop?.start;
          currentNode.position.value_stop_pos = ctx.stop?.stop;
        }
        this.parentStack2.pop();
      }
    }
  }

  enterPair = (ctx: PairContext) => {
    let parentNode = this.parentStack2[this.parentStack2.length - 1];

    var node: IJsonNode = {
      Path: '',
      position: { line: ctx.start.line, column: ctx.start.column, prop_start_pos: ctx.start.start, prop_stop_pos: ctx.start.stop },
    };
    if (parentNode.children === undefined)
      parentNode.children = [];
    parentNode.children.push(node);
    this.parentStack2.push(node);
  }

  exitPair = (ctx: PairContext) => {
    let currentNode = this.parentStack2[this.parentStack2.length - 1];
    if (currentNode.position) {
      currentNode.position.value_start_pos = ctx.stop?.start;
      currentNode.position.value_stop_pos = ctx.stop?.stop;
    }
    this.parentStack2.pop();
  }

  enterKey = (ctx: KeyContext) => {
    let node = this.parentStack2[this.parentStack2.length - 1];
    node.text = ctx.getText().replace(/^"/, '').replace(/"$/, '');
    if (this.parentStack2.length > 1) {
      let nodeParent = this.parentStack2[this.parentStack2.length - 2];
      if (nodeParent.Path)
        node.Path = nodeParent.Path + "." + node.text;
      else
        node.Path = node.text;
    }
    else {
      node.Path = node.text;
    }

  }
  // exitKey = (ctx: KeyContext) => {}

  enterValue = (ctx: ValueContext) => {
    let node = this.parentStack2[this.parentStack2.length - 1];
    if (node.Path == 'resourceType') {
      // This is the root node which defines the actual resource type.
      if (this.parentStack2.length > 1) {
        let nodeParent = this.parentStack2[this.parentStack2.length - 2];
        nodeParent.Path = ctx.getText().replace(/^"/, '').replace(/"$/, '');
      }
    }
  }
  // exitValue = (ctx: ValueContext) => {};

  enterArr = (ctx: ArrContext) => {
    let parentNode = this.parentStack2[this.parentStack2.length - 1];
    if (parentNode.children === undefined)
      parentNode.children = [];
    parentNode.isArray = true;
  }
  exitArr = (ctx: ArrContext) => {
  }

  // enterNumber = (ctx: NumberContext) => {};
  // exitNumber = (ctx: NumberContext) => {};
}
