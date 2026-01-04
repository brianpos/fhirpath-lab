import antlr4 from "antlr4";
import { ParseTreeWalker } from "antlr4";
import Lexer from "../xml-parser/XMLLexer";
import Parser, { ElementContext, AttributeContext } from "../xml-parser/XMLParser";
import Listener from "../xml-parser/XMLParserListener";

import r4Model from "fhirpath/fhir-context/r4";

import { Model, IWithPosition, IJsonNodePosition, IJsonNode, findNodeByPath, getPropertyDataType } from "./json_parser";

interface IJsonNodeInternal extends IJsonNode {
}

export function parseXml(path: string, modelInfo?: Model) : IJsonNode | undefined {

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

export function parseXmlAndObject(path: string, modelInfo?: Model): { node: IJsonNode | undefined, object: any } {

  modelInfo ??= r4Model;
 
  let chars = new antlr4.CharStream(path);
  let lexer = new Lexer(chars);
  let tokens = new antlr4.CommonTokenStream(lexer);
  let parser = new Parser(tokens);
  parser.buildParseTrees = true;

  // Remove any error listeners as we assume that the format of the xml
  // is valid and don't want to report any issues from parsing
  // Typically used on XML that was validated elsewhere, so should be valid
  lexer.removeErrorListeners();
  parser.removeErrorListeners();

  let tree = parser.document();

  // Now walk the tree to populate both the fhir object's path tree and the actual object
  let printer = new PathAndObjectListener(modelInfo);
  ParseTreeWalker.DEFAULT.walk(printer, tree);

  return {
    node: printer.result(),
    object: printer.getObject()
  };
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

  private shouldAlwaysBeArray(elementName: string): boolean {
    // FHIR elements that should always be arrays even with single items
    const alwaysArrayElements = ['extension', 'modifierExtension'];
    return alwaysArrayElements.includes(elementName);
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
      DataType: undefined,
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
    const shouldForceArray = this.shouldAlwaysBeArray(elementName);
    
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
    } else if (shouldForceArray) {
      // Force array creation for FHIR elements that should always be arrays
      const arrayNode: IJsonNodeInternal = { 
        ...node,
        isArray: true,
        children: []
      };
      node.Index = 0;
      node.Path += "[0]";
      arrayNode.children!.push(node);
      parentNode.children?.push(arrayNode);
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

class PathAndObjectListener extends Listener {
  
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
    this.rootObject = null; // Initialize as null, will be set when we encounter the root element
    this.objectStack = [];
  }

  private isFhirPrimitiveType(dataType: string | undefined): boolean {
    if (!dataType) return false;
    
    // FHIR primitive types based on the type2Parent mapping
    const fhirPrimitiveTypes = [
      'boolean', 'integer', 'string', 'decimal', 'uri', 'url', 'canonical',
      'base64Binary', 'instant', 'date', 'dateTime', 'time', 'code', 
      'oid', 'id', 'markdown', 'unsignedInt', 'positiveInt', 'uuid', 'xhtml'
    ];
    
    return fhirPrimitiveTypes.includes(dataType);
  }

  private shouldAlwaysBeArray(elementName: string): boolean {
    // FHIR elements that should always be arrays even with single items
    const alwaysArrayElements = ['extension', 'modifierExtension'];
    return alwaysArrayElements.includes(elementName);
  }

  public result() {
    return this.ast2?.children![0];
  }

  public getObject() {
    return this.rootObject;
  }

  public ast2?: IJsonNodeInternal;
  private parentStack2: IJsonNodeInternal[] = [];
  private modelInfo: Model;
  private rootObject: any;
  private objectStack: any[] = [];
  private isRootElement: boolean = true;

  enterElement = (ctx: ElementContext) => {
    let parentNode = this.parentStack2[this.parentStack2.length - 1];
    let currentObject = this.objectStack[this.objectStack.length - 1];

    let elementName = ctx.children![1].getText();
    let node: IJsonNodeInternal = {
      Path: parentNode.Path ? parentNode.Path + "." + elementName : elementName,
      DefinitionPath: parentNode.DefinitionPath ? parentNode.DefinitionPath + "." + elementName : elementName,
      // DataType: parentNode.DataType,
      text: elementName,
      DataType: undefined,
      position: {
        line: ctx.start.line,
        column: ctx.start.column,
        prop_start_pos: ctx.start.start,
        prop_stop_pos: ctx.start.stop,
      },
      children: [],
    };

    // Handle root element specially
    if (this.isRootElement) {
      this.isRootElement = false;
      this.rootObject = {};
      this.objectStack = [this.rootObject];
      currentObject = this.rootObject;
      
      // Set resourceType for root FHIR resource AND set node DataType
      if (this.modelInfo.type2Parent[elementName]) {
        this.rootObject.resourceType = elementName;
        node.DataType = elementName; // Set DataType for the node tree
      }
      
      // Add the root node to the AST
      parentNode.children?.push(node);
      this.parentStack2.push(node);
      this.objectStack.push(this.rootObject);
      return;
    }

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
      
      // For polymorphic resource properties, replace the current object entirely
      // instead of adding a property with the resource name
      const parentObject = this.objectStack[this.objectStack.length - 1];
      parentObject.resourceType = elementName;
      
      parentNode.children?.push(node);
      this.parentStack2.push(node);
      this.objectStack.push(parentObject); // Keep using the same object
      return;
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
    // and remove the suffix from it if it is (for paths, but keep suffix for object property)
    let pathElementName = elementName; // For paths - may be modified for choice types
    let objectPropertyName = elementName; // For object - always keeps the original name
    
    if (node.DataType 
      && (node.DataType?.length < elementName.length) 
      && elementName.toLowerCase().endsWith(node.DataType.toLowerCase())){
        const baseName = elementName.substring(0, elementName.length - node.DataType.length);
        if (this.modelInfo.choiceTypePaths[parentNode.DataType + "." + baseName]) {
          pathElementName = baseName; // Use base name for paths
          // objectPropertyName stays as elementName (keeps suffix for object)
          node.text = pathElementName;
          node.Path = parentNode.Path ? parentNode.Path + "." + pathElementName : pathElementName;
          node.DefinitionPath = parentNode.DefinitionPath ? parentNode.DefinitionPath + "." + pathElementName : pathElementName;
        }
    }

    // Object construction logic
    let newObject: any = {};
    let propertyName = objectPropertyName; // Use the original element name for object properties

    // before just adding it to the parent, check to see if there are already other's with this value in the parent
    // and thus this is an array we need to create.
    const arrayNode = parentNode.children?.find(c => c.Path === node.Path);
    const shouldForceArray = this.shouldAlwaysBeArray(objectPropertyName);
    
    if (arrayNode) {
      if (!arrayNode.isArray) {
        // need to promote a new array node
        arrayNode.isArray = true;
        let existingNode: IJsonNodeInternal = { ...arrayNode };
        existingNode.children = arrayNode.children; // preserve the children
        const oldPath = arrayNode.Path!;
        arrayNode.children = []; // reset the children to add in the array items
        existingNode.Index = arrayNode.children!.length;
        existingNode.Path = parentNode.Path + "." + pathElementName + "["+existingNode.Index+"]";
        arrayNode.children?.push(existingNode);
        // also need to recursively update all the other definitions in it's children (so they have the array indexer inserted too)
        this.updateArrayPaths(oldPath, existingNode.Path!, existingNode);

        // Convert object property to array
        const existingValue = currentObject[propertyName];
        currentObject[propertyName] = [existingValue];
      }
      // update the path for the node, and set the index
      node.Index = arrayNode.children!.length;
      node.Path += "["+node.Index+"]";
      arrayNode.children?.push(node);
      
      // Add to array in object
      currentObject[propertyName].push(newObject);
    } else if (shouldForceArray) {
      // Force array creation for FHIR elements that should always be arrays
      const arrayNode: IJsonNodeInternal = { 
        ...node,
        isArray: true,
        children: []
      };
      node.Index = 0;
      node.Path += "[0]";
      arrayNode.children!.push(node);
      parentNode.children?.push(arrayNode);
      
      // Create array in object with single item
      currentObject[propertyName] = [newObject];
    } else {
      parentNode.children?.push(node);
      
      // Add property to object
      currentObject[propertyName] = newObject;
    }

    this.parentStack2.push(node);
    this.objectStack.push(newObject);
  }

  exitElement = (ctx: ElementContext) => {
    let currentNode = this.parentStack2.pop();
    let currentObject = this.objectStack.pop();
    if (!currentNode) {
      // nothing to do
      return;
    }
    
    // update the end position information
    if (currentNode && ctx.stop?.stop) {
      currentNode.position!.prop_stop_pos = ctx.stop?.stop;
    }

    // Get the text content if this is a primitive element
    const textContent = this.getElementTextContent(ctx);
    const parent = this.objectStack[this.objectStack.length - 1];
    const parentNode = this.parentStack2[this.parentStack2.length - 1];
    
    // For object properties, reconstruct original element name for choice types
    let propertyName = currentNode?.text;
    if (currentNode?.DataType && parentNode?.DataType && propertyName) {
      // Check if this is a choice type by looking up the base path in choiceTypePaths
      const baseName = propertyName;
      if (this.modelInfo.choiceTypePaths[parentNode.DataType + "." + baseName]) {
        // This is a choice type - reconstruct the original element name
        propertyName = baseName + currentNode.DataType.charAt(0).toUpperCase() + currentNode.DataType.slice(1);
      }
    }
    
    if (currentObject && parent && propertyName) {
      // Check if this is a choice type by looking up the base path in choiceTypePaths
      let isChoiceType = false;
      let baseName = '';
      if (currentNode?.DataType && parentNode?.DataType) {
        // Extract potential base name by removing the DataType suffix
        if (propertyName.length > currentNode.DataType.length && 
            propertyName.toLowerCase().endsWith(currentNode.DataType.toLowerCase())) {
          baseName = propertyName.substring(0, propertyName.length - currentNode.DataType.length);
          // Check if this base path exists in choiceTypePaths
          isChoiceType = !!this.modelInfo.choiceTypePaths[parentNode.DataType + "." + baseName];
        }
      }
      
      // Check if this element has only a 'value' attribute and no other content
      const hasOnlyValueAttribute = Object.keys(currentObject).length === 1 && 
                                   currentObject.hasOwnProperty('value') && 
                                   !textContent;
      
      // Check if this element has attributes/extensions (indicating FHIR primitive extension pattern)
      const hasAttributesOrExtensions = Object.keys(currentObject).length > 1 || 
                                       (Object.keys(currentObject).length === 1 && !currentObject.hasOwnProperty('value'));
      
      // Check if this is actually a FHIR primitive type before applying primitive extension pattern
      const isPrimitiveType = this.isFhirPrimitiveType(currentNode.DataType);
      
      if (isChoiceType && hasOnlyValueAttribute) {
        // For choice types with only value attribute, assign directly to the choice property name
        const primitiveValue = currentObject.value;
        if (Array.isArray(parent[propertyName])) {
          parent[propertyName][parent[propertyName].length - 1] = primitiveValue;
        } else {
          parent[propertyName] = primitiveValue;
        }
      } else if (isChoiceType && textContent !== null && Object.keys(currentObject).length === 0) {
        // For choice types with text content only, parse and assign directly
        const primitiveValue = this.parseValueUsingDataType(textContent, currentNode.DataType, propertyName);
        if (Array.isArray(parent[propertyName])) {
          parent[propertyName][parent[propertyName].length - 1] = primitiveValue;
        } else {
          parent[propertyName] = primitiveValue;
        }
      } else if (hasOnlyValueAttribute) {
        // Convert to primitive value for FHIR XML -> JSON conversion
        const primitiveValue = currentObject.value; // Already parsed in enterAttribute
        if (Array.isArray(parent[propertyName])) {
          parent[propertyName][parent[propertyName].length - 1] = primitiveValue;
        } else {
          parent[propertyName] = primitiveValue;
        }
      } else if (isPrimitiveType && hasAttributesOrExtensions && (textContent !== null || currentObject.hasOwnProperty('value'))) {
        // FHIR primitive extension pattern: element has value + attributes/extensions
        const primitiveValue = currentObject.value || this.parseValueUsingDataType(textContent || '', currentNode.DataType, propertyName);
        
        // Set the primitive value
        if (Array.isArray(parent[propertyName])) {
          parent[propertyName][parent[propertyName].length - 1] = primitiveValue;
        } else {
          parent[propertyName] = primitiveValue;
        }
        
        // Create the extension object with attributes/extensions (excluding 'value')
        const extensionObject: any = {};
        for (const [key, value] of Object.entries(currentObject)) {
          if (key !== 'value') {
            extensionObject[key] = value;
          }
        }
        
        // Only create _propertyName if there are actually extensions/attributes
        if (Object.keys(extensionObject).length > 0) {
          const extensionPropertyName = '_' + propertyName;
          if (Array.isArray(parent[propertyName])) {
            // Handle array case - need to create array for extensions too
            if (!parent[extensionPropertyName]) {
              parent[extensionPropertyName] = [];
            }
            parent[extensionPropertyName].push(extensionObject);
          } else {
            parent[extensionPropertyName] = extensionObject;
          }
        }
      } else if (textContent !== null) {
        // Handle text content for elements that may have attributes
        if (Object.keys(currentObject).length === 0) {
          // Simple text-only element - use DataType for parsing
          const primitiveValue = this.parseValueUsingDataType(textContent, currentNode.DataType, propertyName);
          if (Array.isArray(parent[propertyName])) {
            parent[propertyName][parent[propertyName].length - 1] = primitiveValue;
          } else {
            parent[propertyName] = primitiveValue;
          }
        } else {
          // Element with both attributes and text content - store text as 'value'
          currentObject.value = this.parseValueUsingDataType(textContent, currentNode.DataType, propertyName);
        }
      }
    }

    // remove the children collection if it has no children
    if (currentNode?.children!.length === 0) {
      delete currentNode.children;
    }
  }

  enterAttribute = (ctx: AttributeContext) => {
    let parentNode = this.parentStack2[this.parentStack2.length - 1];
    let currentObject = this.objectStack[this.objectStack.length - 1];

    const attrName = ctx.children![0].getText();
    const attrValue = ctx.children![2].getText(); // Remove quotes from attribute value
    const cleanValue = attrValue.substring(1, attrValue.length - 1);

    // Skip xmlns attributes - we don't want them in the JSON output
    if (attrName === 'xmlns') {
      return;
    }

    // Add attribute to current object with context-aware parsing
    if (attrName === 'value') {
      // Special handling for 'value' attribute - parse based on context
      currentObject[attrName] = this.parseValueInContext(cleanValue, parentNode?.text || '', parentNode?.DataType);
    } else {
      currentObject[attrName] = cleanValue;
    }

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

  private parseValueUsingDataType(value: string, dataType: string | undefined, elementName?: string): any {
    // Parse based on FHIR DataType
    if (!dataType) {
      // No DataType info, return as string to be safe
      return value;
    }
    
    switch (dataType) {
      case 'boolean':
        return value === 'true';
      
      case 'integer':
      case 'unsignedInt':
      case 'positiveInt':
        if (/^-?\d+$/.test(value)) {
          return parseInt(value, 10);
        }
        return value; // If not a valid integer, keep as string
      
      case 'decimal':
        if (/^-?\d+(\.\d+)?$/.test(value)) {
          return parseFloat(value);
        }
        return value; // If not a valid decimal, keep as string
        
      case 'string':
      case 'code':
      case 'id':
      case 'uri':
      case 'url':
      case 'canonical':
      case 'markdown':
      case 'base64Binary':
      case 'instant':
      case 'date':
      case 'dateTime':
      case 'time':
      case 'oid':
      case 'uuid':
        // All string-based types should remain as strings
        return value;
        
      default:
        // For complex types or unknown types, return as string
        return value;
    }
  }

  private parseValueInContext(value: string, elementName: string, dataType?: string): any {
    // Try to parse as appropriate JSON value
    if (value === 'true') return true;
    if (value === 'false') return false;
    if (value === 'null') return null;
    
    // Context-specific parsing
    if (elementName === 'id' || elementName.includes('Id')) {
      return value; // IDs are always strings
    }
    
    // String types should remain strings
    if (elementName.toLowerCase().includes('string') || dataType === 'string') {
      return value;
    }
    
    if (dataType === 'boolean' || elementName.toLowerCase().includes('boolean')) {
      return value === 'true';
    }
    
    if (dataType === 'integer' || elementName.toLowerCase().includes('integer') || 
        elementName === 'total' || elementName === 'count' || elementName === 'multipleBirth') {
      if (/^-?\d+$/.test(value)) {
        return parseInt(value, 10);
      }
    }
    
    if (dataType === 'decimal' || /^-?\d+\.\d+$/.test(value)) {
      return parseFloat(value);
    }
    
    // Only parse as number for specific known numeric contexts, otherwise keep as string
    // This prevents "1234" in valueString from becoming number 1234
    
    return value; // Return as string by default by default
  }

  private getElementTextContent(ctx: ElementContext): string | null {
    // Extract text content from XML element - only actual text, not whitespace between tags
    if (ctx.children && ctx.children.length > 2) {
      // Special handling for FHIR div elements - preserve HTML structure
      const elementName = ctx.children![1].getText();
      if (elementName === 'div') {
        // For div elements, return the entire XML content including the tags
        return ctx.getText();
      }
      
      for (let i = 1; i < ctx.children.length - 1; i++) {
        const child = ctx.children[i];
        if (child.constructor.name === 'ContentContext') {
          const text = child.getText();
          if (text && text.trim() !== '' && !text.includes('<')) {
            return text.trim();
          }
        }
      }
    }
    return null;
  }

  private parseValue(value: string): any {
    // Try to parse as appropriate JSON value
    if (value === 'true') return true;
    if (value === 'false') return false;
    if (value === 'null') return null;
    
    // For FHIR, parse integers for specific numeric types
    if (/^-?\d+$/.test(value)) {
      return parseInt(value, 10);
    }
    if (/^-?\d+\.\d+$/.test(value)) {
      return parseFloat(value);
    }
    
    return value; // Return as string
  }
}
