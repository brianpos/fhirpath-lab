import antlr4 from "antlr4";
import { ParseTreeWalker } from "antlr4";
import Lexer from "../xml-parser/XMLLexer";
import Parser, { ElementContext, AttributeContext } from "../xml-parser/XMLParser";
import Listener from "../xml-parser/XMLParserListener";

import r4Model from "fhirpath/fhir-context/r4";

import { Model, IWithPosition, IJsonNodePosition, IJsonNode, findNodeByPath, getPropertyDataType } from "./json_parser";

interface IJsonNodeInternal extends IJsonNode {
}

export function parseXml(path: string, modelInfo?: Model) {

  modelInfo ??= r4Model;
 
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

  let tree = parser.document();

  // Now walk the tree to populate fhir object's path tree
  let printer = new PathListener(modelInfo);
  ParseTreeWalker.DEFAULT.walk(printer, tree);

  return printer.result();
};

class PathListener extends Listener {
  
  updateArrayPaths(oldParentPath: string, newParentPath: string, node: IJsonNodeInternal) {
    // Update the children's paths by replacing the old parent path prefix with the new one
    node.children?.forEach(child => {
      if (child.Path && child.Path.startsWith(oldParentPath + ".")) {
        child.Path = newParentPath + child.Path.substring(oldParentPath.length);
        this.updateArrayPaths(oldParentPath, newParentPath, child);
      }
    });
  }

  constructor(modelInfo: Model) {
    super();
    this.ast2 = { children: [] };
    this.parentStack2.push(this.ast2);
    this.modelInfo = modelInfo;
  }

  public result() {
    return this.ast2?.children![0];
  }

  public ast2?: IJsonNodeInternal;
  private parentStack2: IJsonNodeInternal[] = [];
  private modelInfo: Model;

  enterElement = (ctx: ElementContext) => {
    let parentNode = this.parentStack2[this.parentStack2.length - 1];

    let elementName = ctx.children![1].getText();
    let node: IJsonNodeInternal = {
      Path: parentNode.Path ? parentNode.Path + "." + elementName : elementName,
      DefinitionPath: parentNode.DefinitionPath ? parentNode.DefinitionPath + "." + elementName : elementName,
      // DataType: parentNode.DataType,
      text: elementName,
      position: {
        line: ctx.start.line,
        column: ctx.start.column,
        prop_start_pos: ctx.start.start,
        prop_stop_pos: ctx.start.stop,
      },
      children: [],
    };

    // special case, check to see if this is one of the "resource" type properties
    if (parentNode.DataType === 'Resource'
       && (
        parentNode.DefinitionPath?.endsWith('.entry.resource')
        || parentNode.DefinitionPath?.endsWith('.contained')
        || parentNode.DefinitionPath?.endsWith('.parameter.resource')
        || parentNode.DefinitionPath?.endsWith('.part.resource')
      )) {
      node.Path = parentNode.Path;
      node.DefinitionPath = parentNode.DefinitionPath;
      if (this.modelInfo.type2Parent[elementName]){
        node.DataType = elementName;
      }
    }


    // Lookup the datatype in the model
    if (!parentNode.DataType) {
      // Treat this as a type locator node
      if (this.modelInfo.type2Parent[elementName]){
        node.DataType = elementName;
      }
    }
    else {
      const possibleTypes = getPropertyDataType(this.modelInfo, parentNode.DataType, elementName);
      if (possibleTypes && possibleTypes.length === 1) {
        node.DataType = possibleTypes[0];
      }
    }

    // check the element name to see if it is a choice type
    // and remove the suffix from it if it is
    if (node.DataType 
      && (node.DataType?.length < elementName.length) 
      && elementName.toLowerCase().endsWith(node.DataType.toLowerCase())){
        const baseName = elementName.substring(0, elementName.length - node.DataType.length);
        if (this.modelInfo.choiceTypePaths[parentNode.DataType + "." + baseName]) {
          elementName = baseName;
          node.text = elementName;
          node.Path = parentNode.Path ? parentNode.Path + "." + elementName : elementName;
          node.DefinitionPath = parentNode.DefinitionPath ? parentNode.DefinitionPath + "." + elementName : elementName;
        }
    }

    // before just adding it to the parent, check to see if there are already other's with this value in the parent
    // and thus this is an array we need to create.
    const arrayNode = parentNode.children?.find(c => c.Path === node.Path);
    if (arrayNode) {
      if (!arrayNode.isArray) {
        // need to promote a new array node
        arrayNode.isArray = true;
        let existingNode: IJsonNodeInternal = { ...arrayNode };
        existingNode.children = arrayNode.children; // preserve the children
        const oldPath = arrayNode.Path!;
        arrayNode.children = []; // reset the children to add in the array items
        existingNode.Index = arrayNode.children!.length;
        existingNode.Path = parentNode.Path + "." + elementName + "["+existingNode.Index+"]";
        arrayNode.children?.push(existingNode);
        // also need to recursively update all the other definitions in it's children (so they have the array indexer inserted too)
        this.updateArrayPaths(oldPath, existingNode.Path!, existingNode);
      }
      // update the path for the node, and set the index
      node.Index = arrayNode.children!.length;
      node.Path += "["+node.Index+"]";
      arrayNode.children?.push(node);
    } else {
      parentNode.children?.push(node);
    }
    this.parentStack2.push(node);
  }

  exitElement = (ctx: ElementContext) => {
    let currentNode = this.parentStack2.pop();
    // update the end position information
    if (currentNode && ctx.stop?.stop) {
      currentNode.position!.prop_stop_pos = ctx.stop?.stop;
    }

    // remove the children collection if it has no children
    if (currentNode?.children!.length === 0) {
      delete currentNode.children;
    }
  }

  enterAttribute = (ctx: AttributeContext) => {
    let parentNode = this.parentStack2[this.parentStack2.length - 1];

    const attrName = ctx.children![0].getText();
    // the only thing we need to actually tag in here is if this was an "id" or "url" attribute
    if (attrName === "id" || attrName === "url") {
      let node: IJsonNodeInternal = {
        Path: parentNode.Path + '.' + attrName,
        DefinitionPath: parentNode.DefinitionPath + '.' + attrName,
        text: attrName,
        position: { line: ctx.start.line, column: ctx.start.column, prop_start_pos: ctx.start.start, prop_stop_pos: ctx.start.stop },
      };
      parentNode.children ??= [];
      parentNode.children.push(node);
    }
  }
}
