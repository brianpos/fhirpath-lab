import antlr4 from "antlr4";
import { ParseTreeWalker } from "antlr4";
import Lexer from "../json-parser/JSON5Lexer";
import Parser, { ArrContext, Json5Context, KeyContext, NumberContext, ObjContext, PairContext, ValueContext } from "../json-parser/JSON5Parser";
import Listener from "../json-parser/JSON5Listener";

import r4Model from "fhirpath/fhir-context/r4";

// This model interface is internal to the fhirpath library, so cloning it here too
export interface Model {
  // Model version, e.g. 'r5', 'r4', 'stu3', or 'dstu2'.
  version: 'r5' | 'r4' | 'stu3' | 'dstu2',

  // This section contains setting for the `weight()` function.
  score?: {
    // Formal identifier for the weight property (the item weight property URI).
    // It is used for getting scores from CodeSystem/ValueSet in R5.
    // Use this URI to get property code from "CodeSystem.property.code"
    // or "ValueSet.expansion.property.code" and then use this code to get a
    // concept property by "CodeSystem.concept.property.code" or
    // "ValueSet.expansion.contains.property.code".
    // P.S.:
    // We can use the property for already expanded contained ValueSets.
    // Expanding ValueSet to get the property for the CodeSystem concept is not
    // practical. It is better to look up for the concept in CodeSystem and get
    // the property there.
    propertyURI?: string,

    // The item weight extension URI used in R5/R4
    extensionURI: string[],
  },

  /**
   *  A hash of resource element paths (e.g. Observation.value) that are known
   *  to point to files that are choice types.
   */
  choiceTypePaths: {
    [path: string]: string[];
  };

  /**
   *  A hash from paths to the path for which their content is defined, e.g.
   *  Questionnaire.item.item -> Questionnaire.item.
   */
  pathsDefinedElsewhere: {
    [path: string]: string;
  };

  /**
   * Mapping data types to parent data types.
   */
  type2Parent: {
    [path: string]: string;
  };

  /**
   * Mapping paths to data types.
   */
  path2Type: {
    [path: string]: string;
  };
}

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

  /** Definitional Path */
  DefinitionPath?: string;

  /** FHIR Datatype of the node */
  DataType?: string;

  /** properties of the object, or items in an array */
  children?: IJsonNode[];

  /** Positional information about the node. */
  position?: IJsonNodePosition;

  // Internal processing properties used during processing
  isArray?: boolean;

  /** Zero-based index when the node is part of an array */
  Index?: number;
}

interface IJsonNodeInternal extends IJsonNode {
  hasPrimitiveExtensions?: boolean;
  deleteMe?: boolean;
}

export function findNodeByPath(node: IJsonNode, path: string): IJsonNode | undefined {
  // If node has a DataType and path doesn't start with it, prepend the DataType
  if (node.DataType && !path.startsWith(node.DataType)) {
    return findChildNodeByPathSegments(node, (node.DataType + "." + path).split("."));
  }
  return findChildNodeByPathSegments(node, path.split("."));
}

function findChildNodeByPathSegments(node: IJsonNode, pathSegments: string[]): IJsonNode | undefined {
  if (pathSegments.length === 0) {
    // Not expected to get here as implied not searching for a path
    return undefined;
  }

  const processingSegment = pathSegments[0];
  const processingSegmentWithoutArray = processingSegment.split("[")[0];

  if (node.text !== processingSegmentWithoutArray) {
    // this is not the node we are looking for ...
    return undefined;
  }

  if (pathSegments.length === 1) {
    // this IS the node we are looking for :)
    if (!node.isArray || processingSegment === processingSegmentWithoutArray)
      return node;
  }

  if (node.children) {
    // this is one of our children!
    const remainingSegments = node.isArray ? pathSegments : pathSegments.slice(1);
    for (const child of node.children) {
      let found: IJsonNode | undefined = findChildNodeByPathSegments(
        child,
        remainingSegments
      );
      if (found) {
        if (node.isArray) {
          if (node.children.length == 1 || child.text+'['+child.Index+']' === processingSegment) {
            return found;
          }
        }
        else {
            return found;
        }
      }
    }
  }

  return undefined;
}

export function parseJson(path: string, modelInfo?: Model) {

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

  let tree = parser.json5();

  // Now walk the tree to populate fhir object's path tree
  let printer = new PathListener(modelInfo);
  ParseTreeWalker.DEFAULT.walk(printer, tree);

  return printer.result();
};

function getPropertyDataType(modelInfo: Model, dataType: string, path: string): string[] {
  // lookup the definition path in the path2Type map
  let definitionPath = dataType + "." + path;
  const elsewherePath = modelInfo.pathsDefinedElsewhere[definitionPath];
  if (elsewherePath)
    definitionPath = elsewherePath;

  const definitionPath2Type = modelInfo.path2Type[definitionPath];
  let type: string[] = [];
  if (definitionPath2Type) {
    if (definitionPath2Type === "BackboneElement")
      type.push(definitionPath); // backbone elements are their own type
  else
      type.push(definitionPath2Type);
  }
  if (type.length == 0) {
    // If not found, check if the definition path is a choice type
    let choiceTypes = modelInfo.choiceTypePaths[definitionPath];
    // there is a bug in the choice types where some types are not cased correctly
    // so we need to check for both the original and lower case versions
    // and check that the type is in the typeToParent map
    if (choiceTypes) {
      for (const choiceType of choiceTypes) {
        if (modelInfo.type2Parent[choiceType] !== undefined) {
          type.push(choiceType);
        }
        else {
          const alternateCaseChoiceType = choiceType.substring(0, 1).toLowerCase() + choiceType.substring(1);
          if (modelInfo.type2Parent[alternateCaseChoiceType] !== undefined) {
            type.push(alternateCaseChoiceType);
          }
        }
      }
    }
  }
  if (type.length == 0) {
    // Check in the base type
    const baseType = modelInfo.type2Parent[dataType];
    if (baseType) {
      type = getPropertyDataType(modelInfo, baseType, path);
    }
  }
  return type;
}

class PathListener extends Listener {
  constructor(modelInfo: Model) {
    super();
    this.ast2 = { children: [] };
    this.parentStack2.push(this.ast2);
    this.modelInfo = modelInfo;
  }

  public result() {
    return this.ast2;
  }

  public ast2?: IJsonNodeInternal;
  private parentStack2: IJsonNodeInternal[] = [];
  private modelInfo: Model;

  enterObj = (ctx: ObjContext) => {
    let parentNode = this.parentStack2[this.parentStack2.length - 1];
    if (parentNode.isArray) {
      const index = parentNode.children?.length || 0;
      let node: IJsonNodeInternal = {
        Path: parentNode.Path + "[" + index + "]",
        DefinitionPath: parentNode.DefinitionPath,
        DataType: parentNode.DataType,
        text: parentNode.text,
        position: {
          line: ctx.start.line,
          column: ctx.start.column,
          prop_start_pos: ctx.start.start,
          prop_stop_pos: ctx.start.stop,
        },
        children: [],
        Index: index,
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
      if (nodeParent.Path) {
        node.Path = nodeParent.Path + "." + propName;
        node.DefinitionPath = nodeParent.DefinitionPath + "." + propName;
      } else {
        node.Path = propName;
        node.DefinitionPath = propName;
      }

      if (nodeParent.DataType) {
        const types = getPropertyDataType(this.modelInfo, nodeParent.DataType, propName);

        if (types.length > 1) {
          // TODO: umm, this is a bit of a hack, but we need to pick one of the types
          // Choice types should have the type in the path, so we shouldn't get here anyway
          node.DataType = types[0];
        } else if (types.length > 0) {
          node.DataType = types[0];
        } else {
          // if the path isn't known, then this is likely to be
          // a backbone element, in which case the type in fhirpath.js
          // is the dotted path to the element, so we can use that
          // or a contained resource's resourceType property
          node.DataType = node.Path;
        }

        // check if this type is a choice type
        // which will then change the name to remove the choice type (and filter the type correctly)
        const lp = propName.toLowerCase();
        const ldt = node.DataType?.toLowerCase();
        if (ldt && lp.endsWith(ldt) && lp != ldt) {
          const choiceType = propName.substring(0, propName.length - ldt.length);
          if (this.modelInfo.choiceTypePaths[nodeParent.DataType + "." + choiceType] !== undefined) {
            node.text = node.text.substring(0, node.text.length - ldt.length);
            node.Path = nodeParent.Path + "." + choiceType;
            node.DefinitionPath = nodeParent.DefinitionPath + "." + choiceType;
          }
        }
      }
    }
    else {
      node.Path = node.text;
      node.DefinitionPath = node.text;
    }
  }
  // exitKey = (ctx: KeyContext) => {}

  enterValue = (ctx: ValueContext) => {
    let node = this.parentStack2[this.parentStack2.length - 1];
    if (node.text == 'resourceType') {
      // This is the root node which defines the actual resource type.
      if (this.parentStack2.length > 1) {
        let nodeParent = this.parentStack2[this.parentStack2.length - 2];
        if (!nodeParent.Path || nodeParent.Path.length == 0) {
          nodeParent.Path = ctx.getText().replace(/^"/, '').replace(/"$/, '');
          nodeParent.DefinitionPath = nodeParent.Path;
        }
        nodeParent.DataType = ctx.getText().replace(/^"/, '').replace(/"$/, '');
        nodeParent.text = nodeParent.DataType;
        node.Path = nodeParent.DataType + ".resourceType";
        node.DefinitionPath = nodeParent.DataType + ".resourceType";
      }
    }
  }
  // exitValue = (ctx: ValueContext) => {};

  enterArr = (ctx: ArrContext) => {
    let parentNode = this.parentStack2[this.parentStack2.length - 1];
    if (parentNode.children === undefined)
      parentNode.children = [];
    parentNode.isArray = true;

    // When an array is initialized, set the index of all current children to maintain consistency
    if (parentNode.children && parentNode.children.length > 0) {
      for (let i = 0; i < parentNode.children.length; i++) {
        parentNode.children[i].Index = i;
      }
    }
  }
  exitArr = (ctx: ArrContext) => {
  }

  // enterNumber = (ctx: NumberContext) => {};
  // exitNumber = (ctx: NumberContext) => {};
}
