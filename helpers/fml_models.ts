/**
 * TypeScript interfaces for FHIR Mapping Language (FML) object model
 * Based on the FHIR Mapping Language specification: https://build.fhir.org/mapping-language.html
 * No external dependencies - pure TypeScript interfaces
 */

/**
 * Source position information for tracking element location in original text
 */
export interface SourcePosition {
  /** Starting line number (1-based) */
  startLine: number;
  
  /** Starting column number (0-based) */
  startColumn: number;
  
  /** Ending line number (1-based) */
  endLine: number;
  
  /** Ending column number (0-based) */
  endColumn: number;
  
  /** Starting character index in the source (0-based) */
  startIndex: number;
  
  /** Ending character index in the source (0-based) */
  endIndex: number;
}

/**
 * Root structure representing a complete FML StructureMap
 */
export interface FmlStructureMap {
  /** Source position information */
  position?: SourcePosition;
  
  /** Metadata declarations (e.g., /// url = '...', /// name = '...') */
  metadata: MetadataDeclaration[];
  
  /** Embedded ConceptMap declarations */
  conceptMaps: ConceptMapDeclaration[];
  
  /** Map declaration (map url = identifier) */
  mapDeclaration?: MapDeclaration;
  
  /** Structure definitions referenced by the map */
  structures: StructureDeclaration[];
  
  /** Imported maps */
  imports: ImportDeclaration[];
  
  /** Constant declarations */
  constants: ConstantDeclaration[];
  
  /** Groups containing transformation rules */
  groups: GroupDeclaration[];
}

/**
 * Metadata declaration (e.g., /// url = 'http://...', /// name = 'MyMap')
 */
export interface MetadataDeclaration {
  /** Source position information */
  position?: SourcePosition;
  
  /** The qualified identifier (e.g., 'url', 'name', 'jurisdiction.coding.system') */
  path: string;
  
  /** The value of the metadata property */
  value?: string;
  
  /** For markdown values enclosed in triple quotes */
  isMarkdown?: boolean;
}

/**
 * Embedded ConceptMap declaration
 */
export interface ConceptMapDeclaration {
  /** Source position information */
  position?: SourcePosition;
  
  /** URL/identifier of the concept map */
  url: string;
  
  /** Prefix declarations for the concept map */
  prefixes: ConceptMapPrefix[];
  
  /** Code mappings */
  codeMaps: ConceptMapCodeMap[];
}

/**
 * Prefix declaration within a ConceptMap
 */
export interface ConceptMapPrefix {
  /** Source position information */
  position?: SourcePosition;
  
  /** Prefix identifier */
  id: string;
  
  /** URL that the prefix maps to */
  url: string;
}

/**
 * Code mapping within a ConceptMap
 */
export interface ConceptMapCodeMap {
  /** Source position information */
  position?: SourcePosition;
  
  /** Source code specification */
  source: ConceptMapCode;
  
  /** Target code specification */
  target: ConceptMapCode;
}

/**
 * Code reference in a ConceptMap
 */
export interface ConceptMapCode {
  /** Prefix identifier */
  prefix: string;
  
  /** Code value */
  code: string;
}

/**
 * Map declaration (map url = identifier)
 */
export interface MapDeclaration {
  /** Source position information */
  position?: SourcePosition;
  
  /** URL of the map */
  url: string;
  
  /** Identifier/name of the map */
  identifier: string;
}

/**
 * Structure definition reference (uses statement)
 */
export interface StructureDeclaration {
  /** Source position information */
  position?: SourcePosition;
  
  /** URL of the structure definition */
  url: string;
  
  /** Optional alias for the structure */
  alias?: string;
  
  /** How the structure is used: 'source', 'queried', 'target', or 'produced' */
  mode: 'source' | 'queried' | 'target' | 'produced';
}

/**
 * Import declaration (imports statement)
 */
export interface ImportDeclaration {
  /** Source position information */
  position?: SourcePosition;
  
  /** URL of the imported map (may contain wildcards) */
  url: string;
}

/**
 * Constant declaration (let statement)
 */
export interface ConstantDeclaration {
  /** Source position information */
  position?: SourcePosition;
  
  /** Name of the constant */
  name: string;
  
  /** FHIRPath expression defining the constant value */
  expression: string;
}

/**
 * Group declaration containing transformation rules
 */
export interface GroupDeclaration {
  /** Source position information */
  position?: SourcePosition;
  
  /** Name of the group */
  name: string;
  
  /** Input/output parameters */
  parameters: GroupParameter[];
  
  /** Name of the group this extends (optional) */
  extends?: string;
  
  /** Type mode: 'types' or 'type+' (optional) */
  typeMode?: 'types' | 'type+';
  
  /** Transformation rules within the group */
  rules: Rule[];
}

/**
 * Parameter for a group
 */
export interface GroupParameter {
  /** Source position information */
  position?: SourcePosition;
  
  /** Parameter mode: 'source' or 'target' */
  mode: 'source' | 'target';
  
  /** Parameter name */
  name: string;
  
  /** Optional type identifier */
  type?: string;
}

/**
 * Transformation rule
 */
export interface Rule {
  /** Source position information */
  position?: SourcePosition;
  
  /** Optional name for the rule */
  name?: string;
  
  /** Source elements/expressions */
  sources: RuleSource[];
  
  /** Target transformations (optional - rules can have no targets) */
  targets: RuleTarget[];
  
  /** Dependent rules/group invocations */
  dependent?: RuleDependent;
}

/**
 * Source element specification in a rule
 */
export interface RuleSource {
  /** Source position information */
  position?: SourcePosition;
  
  /** Context identifier */
  context: string;
  
  /** Element name (optional - if omitted, source is the context itself) */
  element?: string;
  
  /** Type restriction (optional) */
  type?: string;
  
  /** Minimum cardinality (optional) */
  min?: number;
  
  /** Maximum cardinality (optional, '*' for unbounded) */
  max?: number | '*';
  
  /** Default value as FHIRPath expression (optional) */
  defaultValue?: string;
  
  /** List option: 'first', 'last', 'not_first', 'not_last', or 'only_one' (optional) */
  listMode?: 'first' | 'last' | 'not_first' | 'not_last' | 'only_one';
  
  /** Variable name to assign (optional) */
  variable?: string;
  
  /** Where clause as FHIRPath expression (optional) */
  condition?: string;
  
  /** Check clause as FHIRPath expression (optional) */
  check?: string;
  
  /** Log statement as FHIRPath expression (optional) */
  log?: string;
}

/**
 * Target transformation specification in a rule
 */
export interface RuleTarget {
  /** Source position information */
  position?: SourcePosition;
  
  /** Context identifier */
  context: string;
  
  /** Element name (may include sub-elements with dots) */
  element?: string;
  
  /** Transform specification (optional) */
  transform?: Transform;
  
  /** Variable name to assign (optional) */
  variable?: string;
  
  /** List mode: 'first', 'share', 'last', or 'single' (optional) */
  listMode?: 'first' | 'share' | 'last' | 'single';
}

/**
 * Transform specification
 */
export interface Transform {
  /** Source position information */
  position?: SourcePosition;
  
  /** Type of transform */
  type: TransformType;
  
  /** Parameters for the transform */
  parameters: TransformParameter[];
}

/**
 * Types of transforms available in FML
 */
export type TransformType = 
  | 'create'      // Create a new instance
  | 'copy'        // Copy value as-is
  | 'truncate'    // Truncate string
  | 'escape'      // Escape string
  | 'cast'        // Cast to different type
  | 'append'      // Append strings
  | 'translate'   // Translate using concept map
  | 'reference'   // Create reference string
  | 'dateOp'      // Date operation
  | 'uuid'        // Generate UUID
  | 'pointer'     // Create pointer reference
  | 'evaluate'    // Evaluate FHIRPath expression
  | 'cc'          // Create CodeableConcept
  | 'c'           // Create Coding
  | 'qty'         // Create Quantity
  | 'id'          // Create Identifier
  | 'cp'          // Create ContactPoint
  | string;       // Custom/unknown transform names

/**
 * Parameter for a transform
 */
export interface TransformParameter {
  /** Type of parameter */
  type: 'literal' | 'identifier' | 'expression';
  
  /** Value of the parameter */
  value: string | number | boolean;
}

/**
 * Dependent rules specification
 */
export interface RuleDependent {
  /** Source position information */
  position?: SourcePosition;
  
  /** Group invocations */
  invocations: GroupInvocation[];
  
  /** Nested rules (optional) */
  rules: Rule[];
}

/**
 * Group invocation in a dependent rule
 */
export interface GroupInvocation {
  /** Source position information */
  position?: SourcePosition;
  
  /** Name of the group to invoke */
  name: string;
  
  /** Parameters to pass to the group */
  parameters: InvocationParameter[];
}

/**
 * Parameter for a group invocation
 */
export interface InvocationParameter {
  /** Type of parameter */
  type: 'literal' | 'identifier';
  
  /** Value of the parameter */
  value: string | number | boolean;
}

/**
 * Parse result - either a StructureMap or errors
 */
export type ParseResult = 
  | { success: true; structureMap: FmlStructureMap }
  | { success: false; errors: ParseError[] };

/**
 * Parse error information
 */
export interface ParseError {
  /** Severity of the error */
  severity: 'error' | 'warning' | 'information';
  
  /** Error code */
  code: string;
  
  /** Error message */
  message: string;
  
  /** Location in source (e.g., "@5:10") */
  location: string;
  
  /** Line number (1-based) */
  line: number;
  
  /** Column number (0-based) */
  column: number;
}
