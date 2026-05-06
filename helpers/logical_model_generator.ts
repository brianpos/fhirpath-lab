/**
 * FHIR Logical Model Generator
 * 
 * Generates FHIR StructureDefinition resources with kind="logical" from arbitrary 
 * XML or JSON content. Useful for creating logical models that describe non-FHIR 
 * data structures for use in FHIR Mapping Language (FML) transformations.
 * 
 * ## Overview
 * Parses XML or JSON input into an `IJsonNode` tree with positional metadata, then
 * traverses the tree to build a StructureDefinition with ElementDefinitions that
 * describe the structure, including inferred types and cardinalities.
 * 
 * ## Key Functions
 * - `createFhirLogicalModel(input, options?)`: Auto-detects XML vs JSON and generates
 *   a StructureDefinition (kind="logical") from the input
 * - `createFhirLogicalModelFromXml(xml, options?)`: Generates from XML specifically
 * - `createFhirLogicalModelFromJson(json, options?)`: Generates from JSON specifically
 * 
 * ## Type Inference
 * - `boolean`: true/false values
 * - `integer`/`positiveInt`: whole numbers
 * - `decimal`: floating-point numbers
 * - `date`/`dateTime`: ISO date patterns
 * - `url`/`uuid`/`oid`: URI patterns
 * - `string`: default for text
 * - `BackboneElement`: complex nested structures
 * 
 * ## Cardinality Detection
 * - Single elements: min=0, max="1"
 * - Repeated elements (arrays): min=0, max="*"
 * 
 * ## Usage Example
 * ```typescript
 * import { createFhirLogicalModel } from '~/helpers/logical_model_generator';
 * 
 * // Auto-detects XML
 * const xmlSd = createFhirLogicalModel('<catalog><book>...</book></catalog>');
 * 
 * // Auto-detects JSON
 * const jsonSd = createFhirLogicalModel('{"catalog": {"book": [...]}}');
 * ```
 */

import * as fhir4b from "fhir/r4b";
import { parseXmlAndObject } from "./xml_parser";
import { parseJson, Model, IJsonNode } from "./json_parser";

/**
 * Options for creating a FHIR Logical Model
 */
export interface CreateLogicalModelOptions {
  /** The name for the StructureDefinition (defaults to root element name) */
  name?: string;
  /** The title for the StructureDefinition (defaults to name) */
  title?: string;
  /** The canonical URL for the StructureDefinition */
  url?: string;
  /** Description for the StructureDefinition */
  description?: string;
  /** Publisher name */
  publisher?: string;
  /** Version string */
  version?: string;
  /** Status: draft | active | retired | unknown */
  status?: 'draft' | 'active' | 'retired' | 'unknown';
}

/**
 * Internal structure for collecting element metadata during tree traversal
 */
interface ElementInfo {
  path: string;
  definitionPath: string;
  min: number;
  max: string;
  types: Set<string>;
  isArray: boolean;
  hasAttributes: boolean;
  attributeNames: Set<string>;
  /** True if this element represents an XML attribute */
  isXmlAttribute: boolean;
}

/**
 * Check if JSON object appears to be a FHIR resource (has resourceType property)
 */
function isFhirJson(obj: any): boolean {
  return obj && typeof obj === 'object' && typeof obj.resourceType === 'string' && obj.resourceType.length > 0;
}

/**
 * Check if XML content appears to be a FHIR resource (contains FHIR namespace)
 */
function isFhirXml(xml: string): boolean {
  // Check for FHIR namespace declaration
  return /xmlns\s*=\s*["']http:\/\/hl7\.org\/fhir["']/.test(xml);
}

/**
 * Creates a FHIR Logical Model (StructureDefinition with kind="logical") from input content.
 * Auto-detects whether the input is XML or JSON.
 * 
 * @param input - The XML or JSON string to parse
 * @param options - Optional configuration for the generated StructureDefinition
 * @returns A FHIR StructureDefinition resource with kind="logical"
 * 
 * @example
 * ```typescript
 * // XML input
 * const sd1 = createFhirLogicalModel('<catalog><book><title>Example</title></book></catalog>');
 * 
 * // JSON input (requires rootTypeName since JSON has no inherent root element)
 * const sd2 = createFhirLogicalModel('{"catalog": {"book": [{"title": "Example"}]}}', 'MyModel');
 * ```
 */
export function createFhirLogicalModel(input: string, rootTypeName?: string, options?: CreateLogicalModelOptions): fhir4b.StructureDefinition {
  const trimmed = input.trim();
  
  if (trimmed.startsWith('<')) {
    return createFhirLogicalModelFromXml(input, options);
  } else if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
    return createFhirLogicalModelFromJson(input, rootTypeName || 'LogicalModel', options);
  } else {
    throw new Error('Unable to detect input format. Input must be valid XML (starting with <) or JSON (starting with { or [)');
  }
}

/**
 * Creates a FHIR Logical Model from XML content.
 * 
 * @param xml - The XML string to parse
 * @param options - Optional configuration for the generated StructureDefinition
 * @returns A FHIR StructureDefinition resource with kind="logical"
 */
export function createFhirLogicalModelFromXml(xml: string, options?: CreateLogicalModelOptions): fhir4b.StructureDefinition {
  // Check if this is a FHIR resource (has FHIR namespace)
  if (isFhirXml(xml)) {
    throw new Error('Input appears to be a FHIR resource (contains FHIR namespace). Logical model generation is intended for non-FHIR content.');
  }
  
  // Create an empty model to avoid FHIR-specific handling
  const emptyModel: Model = {
    version: 'r4',
    score: { extensionURI: [] },
    choiceTypePaths: {},
    pathsDefinedElsewhere: {},
    type2Parent: {},
    path2Type: {}
  };
  
  const { node, object } = parseXmlAndObject(xml, emptyModel);
  
  if (!node) {
    throw new Error('Failed to parse XML: no root element found');
  }
  
  return buildLogicalModel(node, object, undefined, options);
}

/**
 * Creates a FHIR Logical Model from JSON content.
 * 
 * @param json - The JSON string to parse
 * @param rootTypeName - The name to use for the root type (JSON has no inherent root element name)
 * @param options - Optional configuration for the generated StructureDefinition
 * @returns A FHIR StructureDefinition resource with kind="logical"
 */
export function createFhirLogicalModelFromJson(json: string, rootTypeName: string, options?: CreateLogicalModelOptions): fhir4b.StructureDefinition {
  // Parse using JSON.parse for the object first to check for FHIR resource
  let object: any;
  try {
    object = JSON.parse(json);
  } catch (e) {
    throw new Error(`Failed to parse JSON: ${e instanceof Error ? e.message : 'unknown error'}`);
  }
  
  // Check if this is a FHIR resource (has resourceType property)
  if (isFhirJson(object)) {
    throw new Error('Input appears to be a FHIR resource (contains resourceType property). Logical model generation is intended for non-FHIR content.');
  }
  
  // Create an empty model to avoid FHIR-specific handling
  const emptyModel: Model = {
    version: 'r4',
    score: { extensionURI: [] },
    choiceTypePaths: {},
    pathsDefinedElsewhere: {},
    type2Parent: {},
    path2Type: {}
  };
  
  // Parse using ANTLR for the node tree (positional info)
  const node = parseJson(json, emptyModel);
  
  if (!node) {
    throw new Error('Failed to parse JSON: no content found');
  }
  
  return buildLogicalModel(node, object, rootTypeName, options);
}

/**
 * Builds a FHIR Logical Model StructureDefinition from a parsed node tree and object.
 * This is the shared core logic used by both XML and JSON parsers.
 * 
 * @param node - The parsed IJsonNode tree
 * @param object - The parsed JavaScript object
 * @param rootTypeName - The name to use for the root type (for JSON, must be provided; for XML, extracted from root element)
 * @param options - Optional configuration for the generated StructureDefinition
 * @returns A FHIR StructureDefinition resource with kind="logical"
 */
function buildLogicalModel(node: IJsonNode, object: any, rootTypeName: string | undefined, options?: CreateLogicalModelOptions): fhir4b.StructureDefinition {
  // For JSON, the root node wraps the actual content (has children but no text/Path)
  // For XML, node directly contains the root element (has text/Path like "root")
  let rootNode = node;
  let rootObject = object;
  let isJsonStructure = false;
  
  // Detect JSON structure: wrapper node with children but no text
  if (node.children && node.children.length > 0 && !node.text) {
    isJsonStructure = true;
    // Keep rootNode as the wrapper - we need to process ALL children, not just the first
  }
  
  // Use provided rootTypeName, or fall back to node's text (XML root element name), or 'LogicalModel'
  const rootName = rootTypeName || rootNode.text || 'LogicalModel';
  // For element paths, use rootName (preserves XML root element name)
  // For StructureDefinition metadata, use options.name if provided
  const typeName = rootName;
  const sdName = options?.name || rootName;
  const modelUrl = options?.url || `http://example.org/StructureDefinition/${sdName}`;
  
  // Collect element information from the node tree
  const elements = new Map<string, ElementInfo>();
  collectElementInfo(rootNode, elements, rootObject);
  
  // Build ElementDefinitions
  const elementDefinitions: fhir4b.ElementDefinition[] = [];
  
  // Add root element (root element should not have type, min, or max per FHIR spec)
  elementDefinitions.push({
    id: typeName,
    path: typeName
  });
  
  // Convert collected info to ElementDefinitions
  for (const [path, info] of elements) {
    // Transform path to use the type name as root
    let elementPath: string;
    if (isJsonStructure) {
      // For JSON: paths like "id", "token" need to become "root.id", "root.token"
      elementPath = `${typeName}.${path}`;
    } else {
      // For XML: paths like "root.id" need to replace "root" with typeName
      elementPath = path.replace(/^[^.]+/, typeName);
    }
    
    // Skip if this is the root element (we already added it above)
    if (elementPath === typeName) {
      continue;
    }
    
    const elementId = elementPath;
    
    const elementDef: fhir4b.ElementDefinition = {
      id: elementId,
      path: elementPath,
      min: info.min,
      max: info.max,
    };
    
    // Add type if we could infer it
    if (info.types.size > 0) {
      elementDef.type = Array.from(info.types).map(t => ({ code: t }));
    }
    
    // Add xmlAttr representation if this is an XML attribute
    if (info.isXmlAttribute) {
      elementDef.representation = ['xmlAttr'];
    }
    
    elementDefinitions.push(elementDef);
  }
  
  // Sort elements by path for proper FHIR ordering
  elementDefinitions.sort((a, b) => {
    const partsA = a.path!.split('.');
    const partsB = b.path!.split('.');
    for (let i = 0; i < Math.max(partsA.length, partsB.length); i++) {
      if (i >= partsA.length) return -1;
      if (i >= partsB.length) return 1;
      const cmp = partsA[i].localeCompare(partsB[i]);
      if (cmp !== 0) return cmp;
    }
    return 0;
  });
  
  // Build the StructureDefinition
  let structureDefinition: fhir4b.StructureDefinition = {
    resourceType: 'StructureDefinition',
    url: modelUrl,
    name: sdName,
    title: options?.title || sdName,
    status: options?.status || 'draft',
    publisher: undefined,
    kind: 'logical',
    abstract: false,
    type: modelUrl,
    baseDefinition: 'http://hl7.org/fhir/StructureDefinition/Base',
    derivation: 'specialization',
  };
  
  if (options?.description) {
    structureDefinition.description = options.description;
  }
  if (options?.publisher) {
    structureDefinition.publisher = options.publisher;
  }
  if (options?.version) {
    structureDefinition.version = options.version;
  }
  
  structureDefinition.differential = {
    element: elementDefinitions
  };

  return structureDefinition;
}

/**
 * Recursively collect element information from the parsed node tree
 */
function collectElementInfo(node: IJsonNode, elements: Map<string, ElementInfo>, objectContext: any, parentPath?: string): void {
  const currentPath = node.Path || parentPath || '';
  
  // Skip nodes without paths (virtual containers)
  if (!currentPath && node.children) {
    for (const child of node.children) {
      collectElementInfo(child, elements, objectContext);
    }
    return;
  }
  
  // Get or create element info - use definition path without array indices
  const definitionPath = getDefinitionPath(currentPath);
  
  if (!elements.has(definitionPath)) {
    elements.set(definitionPath, {
      path: definitionPath,
      definitionPath: definitionPath,
      min: 0, // Default to optional
      max: '1',
      types: new Set<string>(),
      isArray: false,
      hasAttributes: false,
      attributeNames: new Set<string>(),
      isXmlAttribute: false
    });
  }
  
  const info = elements.get(definitionPath)!;
  
  // Check if this is an array element
  if (node.isArray || node.Index !== undefined) {
    info.isArray = true;
    info.max = '*';
  }
  
  // Try to infer type from object value
  const value = getValueAtPath(objectContext, currentPath);
  if (value !== undefined && value !== null) {
    // For arrays, determine if it's an array of primitives or objects
    // If array of primitives, infer type from first element and don't treat as having children
    let hasComplexChildren = false;
    if (Array.isArray(value)) {
      // Check if array elements are primitives or objects
      const firstNonNull = value.find(v => v !== null && v !== undefined);
      if (firstNonNull !== undefined && typeof firstNonNull === 'object') {
        hasComplexChildren = true;
      }
      // For primitive arrays, infer type from first element
    } else {
      hasComplexChildren = (node.children?.length ?? 0) > 0;
    }
    
    const inferredType = inferFhirType(value, hasComplexChildren);
    if (inferredType) {
      info.types.add(inferredType);
    }
  }
  
  // Process children
  if (node.children) {
    for (const child of node.children) {
      collectElementInfo(child, elements, objectContext, currentPath);
    }
  }
  
  // Detect XML attributes: properties in the object that don't have corresponding child nodes
  // This happens when XML uses attributes like <element attr="value"/>
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    const childNames = new Set((node.children || []).map(c => c.text));
    for (const propName of Object.keys(value)) {
      // Skip if this property already exists as a child element node
      if (childNames.has(propName)) continue;
      // Skip special/internal properties
      if (propName.startsWith('_')) continue;
      
      const attrPath = `${definitionPath}.${propName}`;
      if (!elements.has(attrPath)) {
        const propValue = value[propName];
        const inferredType = inferFhirType(propValue, false);
        elements.set(attrPath, {
          path: attrPath,
          definitionPath: attrPath,
          min: 0,
          max: '1',
          types: inferredType ? new Set([inferredType]) : new Set(['string']),
          isArray: false,
          hasAttributes: false,
          attributeNames: new Set<string>(),
          isXmlAttribute: true  // This is an XML attribute
        });
      }
    }
  }
}

/**
 * Remove array indices from path to get definition path
 * e.g., "Patient.name[0].given[1]" -> "Patient.name.given"
 */
function getDefinitionPath(path: string): string {
  return path.replace(/\[\d+\]/g, '');
}

/**
 * Get value from object using a FHIRPath-like path
 * Handles both JSON (where path matches object structure) and 
 * XML (where root element name in path may not exist as object key)
 */
function getValueAtPath(obj: any, path: string): any {
  if (!obj || !path) return undefined;
  
  const parts = path.split(/\.|\[|\]/).filter(p => p !== '');
  if (parts.length === 0) return obj;
  
  let current = obj;
  
  // Determine starting index: for XML, the root element name (first part of path)
  // won't exist in the object, so skip it. For JSON, all path parts exist in object.
  // Check if first path part exists as key in object.
  let startIndex = 0;
  if (parts.length > 0 && obj[parts[0]] === undefined) {
    // First part doesn't exist in object - this is XML structure where root name isn't in object
    startIndex = 1;
  }
  
  for (let i = startIndex; i < parts.length; i++) {
    if (current === undefined || current === null) return undefined;
    
    const part = parts[i];
    if (/^\d+$/.test(part)) {
      // Array index
      current = Array.isArray(current) ? current[parseInt(part, 10)] : undefined;
    } else {
      current = current[part];
    }
  }
  
  return current;
}

/**
 * Infer FHIR primitive type from a JavaScript value
 */
function inferFhirType(value: any, hasChildren: boolean): string | undefined {
  if (hasChildren) {
    return 'BackboneElement';
  }
  
  if (value === null || value === undefined) {
    return undefined;
  }
  
  // For arrays, infer type from first non-null element
  if (Array.isArray(value)) {
    const firstNonNull = value.find(v => v !== null && v !== undefined);
    if (firstNonNull !== undefined) {
      return inferFhirType(firstNonNull, typeof firstNonNull === 'object' && !Array.isArray(firstNonNull));
    }
    return undefined;
  }
  
  const type = typeof value;
  
  switch (type) {
    case 'boolean':
      return 'boolean';
    case 'number':
      if (Number.isInteger(value)) {
        return value >= 0 ? 'positiveInt' : 'integer';
      }
      return 'decimal';
    case 'string':
      // Try to detect specific string types
      if (/^\d{4}(-\d{2}(-\d{2})?)?$/.test(value)) {
        return 'date';
      }
      if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)) {
        return 'dateTime';
      }
      if (/^https?:\/\//.test(value)) {
        return 'url';
      }
      if (/^urn:uuid:/.test(value)) {
        return 'uuid';
      }
      if (/^urn:oid:/.test(value)) {
        return 'oid';
      }
      return 'string';
    case 'object':
      if (Array.isArray(value)) {
        return 'BackboneElement';
      }
      return 'BackboneElement';
    default:
      return 'string';
  }
}
