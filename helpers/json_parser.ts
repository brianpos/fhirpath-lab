import antlr4 from "antlr4";
import { ParseTreeWalker } from "antlr4";
import Lexer from "~/json-parser/JSON5Lexer";
import Parser, { ArrContext, Json5Context, KeyContext, NumberContext, ObjContext, PairContext, ValueContext } from "~/json-parser/JSON5Parser";
import Listener from "~/json-parser/JSON5Listener";

import { choiceTypePaths, path2Type } from "fhirpath/fhir-context/r4";
import { pathsDefinedElsewhere } from "fhirpath/fhir-context/r4";
import { type2Parent } from "fhirpath/fhir-context/r4";

export interface IWithPosition {
  /** Positional information attached to the interface */
  __position?: IJsonNodePosition;
}

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

  /** FHIR Datatype of the node */
  DataType?: string;

  /** properties of the object, or items in an array */
  children?: IJsonNode[];

  /** Positional information about the node. */
  position?: IJsonNodePosition;

  // Internal processing properties used during processing
  isArray?: boolean;
}

interface IJsonNodeInternal extends IJsonNode {
  hasPrimitiveExtensions?: boolean;
  deleteMe?: boolean;
}


export function findNodeByPath(node: IJsonNode, path: string): IJsonNode | undefined {
  if (node.DataType && !path.startsWith(node.DataType))
    return findChildNodeByPath(node, node.DataType + '.' + path);
  return findChildNodeByPath(node, path);
}

function findChildNodeByPath(node: IJsonNode, path: string): IJsonNode | undefined {
  if (node.Path == path)
    return node;

  // Scan any children for the path
  if (node.children) {
    for (let child of node.children) {
      let found = findChildNodeByPath(child, path);
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
  let chars = new antlr4.CharStream(path);
  let lexer = new Lexer(chars);
  let tokens = new antlr4.CommonTokenStream(lexer);
  let parser = new Parser(tokens);
  parser.buildParseTrees = true;

  // Remove any error listeners as we assume that the format of the json
  // is valid and don't want to report any issues from parsing
  // Typically used on JSON that was validated elsewhere, so should be valid
  lexer.removeErrorListeners();
  parser.removeErrorListeners();

  let tree = parser.json5();

  // Now walk the tree to populate fhir object's path tree
  let printer = new PathListener();
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

  public ast2?: IJsonNodeInternal;
  private parentStack2: IJsonNodeInternal[] = [];

  enterObj = (ctx: ObjContext) => {
    let parentNode = this.parentStack2[this.parentStack2.length - 1];
    if (parentNode.isArray) {
      let node: IJsonNodeInternal = {
        Path: parentNode.Path + '[' + parentNode.children?.length + ']',
        DataType: parentNode.DataType,
        position: { line: ctx.start.line, column: ctx.start.column, prop_start_pos: ctx.start.start, prop_stop_pos: ctx.start.stop },
        children: []
      };
      parentNode.children?.push(node);
      this.parentStack2.push(node);
    }
  }
  exitObj = (ctx: ObjContext) => {
    let currentNode = this.parentStack2[this.parentStack2.length - 1];
    if (currentNode.hasPrimitiveExtensions) {

      // Scan all the primitive extensions
      let currentChildren: IJsonNodeInternal[] = currentNode.children || [];
      let primitiveExtensions = currentChildren?.filter((child) => {
        return child.text?.startsWith('_');
      });
      for (let extChild of primitiveExtensions || []) {
        let primitiveProperties = currentChildren?.filter((child) => {
          return child.Path === extChild.Path && !child.text?.startsWith('_');
        });
        if (primitiveProperties && primitiveProperties.length > 0){
          // this is a primitive extension with a value, so we just need to move the 
          // children over to it.
          let primitiveProperty = primitiveProperties[0];
          if (primitiveProperty.children === undefined)
            primitiveProperty.children = [];
          primitiveProperty.children = extChild.children?.concat(primitiveProperty.children);
          extChild.deleteMe = true;
        }
        else {
          // this is a primitive extension without a value, so we just need to change the name
          extChild.text = extChild.text?.substring(1);
        }
      }

      // remove any remaining primitive extensions
      currentNode.children = currentChildren?.filter((child) => {
        return !child.deleteMe;
      });

      // remove the hasPrimitiveExtensions flag
      delete currentNode.hasPrimitiveExtensions;
    }

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

    let node: IJsonNodeInternal = {
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
    let propName = ctx.getText().replace(/^"/, '').replace(/"$/, '');
    node.text = propName;

    if (this.parentStack2.length > 1) {
      let nodeParent = this.parentStack2[this.parentStack2.length - 2];
      if (propName.startsWith('_')) {
        // This is a primitive property extension!
        propName = propName.substring(1);
        nodeParent.hasPrimitiveExtensions = true;
      }
      if (nodeParent.Path)
        node.Path = nodeParent.Path + "." + propName;
      else
        node.Path = propName;

      if (nodeParent.DataType) {
        // Check if the type is a known choice type
        // choiceTypePaths[]
        let typePath = nodeParent.DataType + '.' + propName;

        // Then check if the definition is actually somewhere else...
        if (pathsDefinedElsewhere[typePath] !== undefined)
          typePath = pathsDefinedElsewhere[typePath];

        if (path2Type[typePath] !== undefined)
          node.DataType = path2Type[typePath];
        else {
          // if the path isn't known, then this is likely to be
          // a backbone element, in which case the type in fhirpath.js
          // is the dotted path to the element, so we can use that
          node.DataType = typePath;

          // Double check if there is a base type defined for the parent, and the type is on that.
          let parentType = type2Parent[nodeParent.DataType];
          if (parentType === "Element" || parentType == "uri" || parentType == "string"){
            if (path2Type["Element."+propName] !== undefined)
              node.DataType = path2Type["Element."+propName];
          }
        }

        // check if this type is a choice type
        // which will then change the name to remove the choice type
        const lp = node.Path.toLowerCase();
        const ldt = node.DataType?.toLowerCase();
        if (ldt && lp.endsWith(ldt) && !lp.endsWith('.' + ldt)) {
          const choiceType = propName.substring(0, propName.length - ldt.length);
          if (choiceTypePaths[nodeParent.DataType + "." + choiceType] !== undefined) {
            node.text = node.text.substring(0, node.text.length - ldt.length);
            node.Path = nodeParent.Path + "." + choiceType;
          }
        }
      }
    }
    else {
      node.Path = node.text;
    }
  }
  // exitKey = (ctx: KeyContext) => {}

  enterValue = (ctx: ValueContext) => {
    let node = this.parentStack2[this.parentStack2.length - 1];
    if (node.text == 'resourceType') {
      // This is the root node which defines the actual resource type.
      if (this.parentStack2.length > 1) {
        let nodeParent = this.parentStack2[this.parentStack2.length - 2];
        if (!nodeParent.Path || nodeParent.Path.length == 0)
          nodeParent.Path = ctx.getText().replace(/^"/, '').replace(/"$/, '');
        nodeParent.DataType = ctx.getText().replace(/^"/, '').replace(/"$/, '');
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
