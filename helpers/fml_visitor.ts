/**
 * Builder implementation to convert ANTLR parse tree to FML object model
 */

import type {
  StructureMapContext,
  MetadataDeclarationContext,
  ConceptMapDeclarationContext,
  MapDeclarationContext,
  StructureDeclarationContext,
  ImportDeclarationContext,
  ConstantDeclarationContext,
  GroupDeclarationContext,
  ParameterContext,
  MapRuleContext,
  MapTransformationRuleContext,
  RuleSourceContext,
  RuleTargetContext,
  TransformContext,
  GroupInvocationContext,
  DependentExpressionContext,
  QualifiedIdentifierContext,
  IdentifierContext,
  UrlContext,
  LiteralContext,
  ConceptMapPrefixContext,
  ConceptMapCodeMapContext
} from "../fml-parser/FmlMappingParser";
import type {
  FmlStructureMap,
  SourcePosition,
  MetadataDeclaration,
  ConceptMapDeclaration,
  ConceptMapPrefix,
  ConceptMapCodeMap,
  MapDeclaration,
  StructureDeclaration,
  ImportDeclaration,
  ConstantDeclaration,
  GroupDeclaration,
  GroupParameter,
  Rule,
  RuleSource,
  RuleTarget,
  Transform,
  TransformParameter,
  RuleDependent,
  GroupInvocation,
  InvocationParameter
} from "./fml_models";
import type { ParserRuleContext } from "antlr4";

/**
 * Builder class to construct StructureMap model from parse tree
 */
export class FmlModelBuilder {
  
  /**
   * Extract source position from ANTLR context
   */
  private getPosition(ctx: ParserRuleContext): SourcePosition | undefined {
    if (!ctx || !ctx.start || !ctx.stop) return undefined;
    
    return {
      startLine: ctx.start.line,
      startColumn: ctx.start.column,
      endLine: ctx.stop.line,
      endColumn: ctx.stop.column + (ctx.stop.text?.length || 0),
      startIndex: ctx.start.start,
      endIndex: ctx.stop.stop + 1
    };
  }
  
  /**
   * Build the root structure map model from parse tree
   */
  buildStructureMap(ctx: StructureMapContext): FmlStructureMap {
    const metadata: MetadataDeclaration[] = [];
    const conceptMaps: ConceptMapDeclaration[] = [];
    const structures: StructureDeclaration[] = [];
    const imports: ImportDeclaration[] = [];
    const constants: ConstantDeclaration[] = [];
    const groups: GroupDeclaration[] = [];
    
    // Process metadata declarations
    const metadataNodes = ctx.metadataDeclaration_list();
    for (const metaNode of metadataNodes) {
      const meta = this.visitMetadataDeclaration(metaNode);
      if (meta) metadata.push(meta);
    }
    
    // Process concept map declarations
    const conceptMapNodes = ctx.conceptMapDeclaration_list();
    for (const cmNode of conceptMapNodes) {
      const cm = this.visitConceptMapDeclaration(cmNode);
      if (cm) conceptMaps.push(cm);
    }
    
    // Process map declaration
    const mapDeclNode = ctx.mapDeclaration();
    const mapDeclaration = mapDeclNode ? this.visitMapDeclaration(mapDeclNode) : undefined;
    
    // Process structure declarations
    const structureNodes = ctx.structureDeclaration_list();
    for (const structNode of structureNodes) {
      const struct = this.visitStructureDeclaration(structNode);
      if (struct) structures.push(struct);
    }
    
    // Process import declarations
    const importNodes = ctx.importDeclaration_list();
    for (const impNode of importNodes) {
      const imp = this.visitImportDeclaration(impNode);
      if (imp) imports.push(imp);
    }
    
    // Process constant declarations
    const constantNodes = ctx.constantDeclaration_list();
    for (const constNode of constantNodes) {
      const constant = this.visitConstantDeclaration(constNode);
      if (constant) constants.push(constant);
    }
    
    // Process group declarations
    const groupNodes = ctx.groupDeclaration_list();
    for (const groupNode of groupNodes) {
      const group = this.visitGroupDeclaration(groupNode);
      if (group) groups.push(group);
    }
    
    return {
      position: this.getPosition(ctx),
      metadata,
      conceptMaps,
      mapDeclaration: mapDeclaration || undefined,
      structures,
      imports,
      constants,
      groups
    };
  }
  
  /**
   * Visit metadata declaration node
   */
  visitMetadataDeclaration(ctx: MetadataDeclarationContext): MetadataDeclaration | null {
    const qualIdNode = ctx.qualifiedIdentifier();
    if (!qualIdNode) return null;
    
    const path = this.visitQualifiedIdentifier(qualIdNode);
    const literalNode = ctx.literal();
    const markdownNode = ctx.markdownLiteral();
    
    let value: string | undefined;
    let isMarkdown = false;
    
    if (literalNode) {
      value = literalNode.getText();
      // Remove quotes if present
      if (value.startsWith("'") || value.startsWith('"')) {
        value = value.substring(1, value.length - 1);
      }
    } else if (markdownNode) {
      value = markdownNode.getText();
      // Remove triple quotes
      if (value.startsWith('"""')) {
        value = value.substring(3, value.length - 3).trim();
      }
      isMarkdown = true;
    }
    
    return { 
      position: this.getPosition(ctx),
      path, 
      value, 
      isMarkdown 
    };
  }
  
  /**
   * Visit concept map declaration node
   */
  visitConceptMapDeclaration(ctx: ConceptMapDeclarationContext): ConceptMapDeclaration | null {
    const urlNode = ctx.url();
    if (!urlNode) return null;
    
    const url = this.visitUrl(urlNode);
    const prefixes: ConceptMapPrefix[] = [];
    const codeMaps: ConceptMapCodeMap[] = [];
    
    // Process prefixes
    const prefixNodes = ctx.conceptMapPrefix_list();
    for (const prefixNode of prefixNodes) {
      const prefix = this.visitConceptMapPrefix(prefixNode);
      if (prefix) prefixes.push(prefix);
    }
    
    // Process code maps
    const codeMapNodes = ctx.conceptMapCodeMap_list();
    for (const codeMapNode of codeMapNodes) {
      const codeMap = this.visitConceptMapCodeMap(codeMapNode);
      if (codeMap) codeMaps.push(codeMap);
    }
    
    return { 
      position: this.getPosition(ctx),
      url, 
      prefixes, 
      codeMaps 
    };
  }
  
  /**
   * Visit concept map prefix node
   */
  visitConceptMapPrefix(ctx: ConceptMapPrefixContext): ConceptMapPrefix | null {
    const idNode = ctx.ID();
    const urlNode = ctx.url();
    
    if (!idNode || !urlNode) return null;
    
    return {
      position: this.getPosition(ctx),
      id: idNode.getText(),
      url: this.visitUrl(urlNode)
    };
  }
  
  /**
   * Visit concept map code map node
   */
  visitConceptMapCodeMap(ctx: ConceptMapCodeMapContext): ConceptMapCodeMap | null {
    const sourceNode = ctx.conceptMapSource();
    const targetNode = ctx.conceptMapTarget();
    
    if (!sourceNode || !targetNode) return null;
    
    const sourceId = sourceNode.ID()?.getText() || '';
    const sourceCode = sourceNode.code()?.getText() || '';
    const targetId = targetNode.ID()?.getText() || '';
    const targetCode = targetNode.code()?.getText() || '';
    
    return {
      position: this.getPosition(ctx),
      source: { prefix: sourceId, code: this.removeQuotes(sourceCode) },
      target: { prefix: targetId, code: this.removeQuotes(targetCode) }
    };
  }
  
  /**
   * Visit map declaration node
   */
  visitMapDeclaration(ctx: MapDeclarationContext): MapDeclaration | null {
    const urlNode = ctx.url();
    const idNode = ctx.identifier();
    
    if (!urlNode || !idNode) return null;
    
    return {
      position: this.getPosition(ctx),
      url: this.visitUrl(urlNode),
      identifier: this.visitIdentifier(idNode)
    };
  }
  
  /**
   * Visit structure declaration node
   */
  visitStructureDeclaration(ctx: StructureDeclarationContext): StructureDeclaration | null {
    const urlNode = ctx.url();
    if (!urlNode) return null;
    
    const url = this.visitUrl(urlNode);
    const aliasNode = ctx.identifier();
    const alias = aliasNode ? this.visitIdentifier(aliasNode) : undefined;
    
    // Determine mode
    let mode: 'source' | 'queried' | 'target' | 'produced' = 'source';
    const text = ctx.getText();
    if (text.includes('queried')) mode = 'queried';
    else if (text.includes('target')) mode = 'target';
    else if (text.includes('produced')) mode = 'produced';
    
    return { 
      position: this.getPosition(ctx),
      url, 
      alias, 
      mode 
    };
  }
  
  /**
   * Visit import declaration node
   */
  visitImportDeclaration(ctx: ImportDeclarationContext): ImportDeclaration | null {
    const urlNode = ctx.url();
    if (!urlNode) return null;
    
    return {
      position: this.getPosition(ctx),
      url: this.visitUrl(urlNode)
    };
  }
  
  /**
   * Visit constant declaration node
   */
  visitConstantDeclaration(ctx: ConstantDeclarationContext): ConstantDeclaration | null {
    const idNode = ctx.ID();
    const exprNode = ctx.fpExpression();
    
    if (!idNode || !exprNode) return null;
    
    return {
      position: this.getPosition(ctx),
      name: idNode.getText(),
      expression: exprNode.getText()
    };
  }
  
  /**
   * Visit group declaration node
   */
  visitGroupDeclaration(ctx: GroupDeclarationContext): GroupDeclaration | null {
    const idNode = ctx.ID();
    if (!idNode) return null;
    
    const name = idNode.getText();
    const parameters: GroupParameter[] = [];
    
    // Process parameters
    const paramsNode = ctx.parameters();
    if (paramsNode) {
      const paramNodes = paramsNode.parameter_list();
      for (const paramNode of paramNodes) {
        const param = this.visitParameter(paramNode);
        if (param) parameters.push(param);
      }
    }
    
    // Check for extends
    const extendsNode = ctx.extends_();
    const extendsName = extendsNode?.ID()?.getText();
    
    // Check for type mode
    const typeModeNode = ctx.typeMode();
    let typeMode: 'types' | 'type+' | undefined;
    if (typeModeNode) {
      const text = typeModeNode.getText();
      if (text.includes('type+')) typeMode = 'type+';
      else if (text.includes('types')) typeMode = 'types';
    }
    
    // Process rules
    const rules: Rule[] = [];
    const mapRulesNode = ctx.mapRules();
    if (mapRulesNode) {
      const ruleNodes = mapRulesNode.mapRule_list();
      for (const ruleNode of ruleNodes) {
        const rule = this.visitMapRule(ruleNode);
        if (rule) rules.push(rule);
      }
    }
    
    return {
      position: this.getPosition(ctx),
      name,
      parameters,
      extends: extendsName,
      typeMode,
      rules
    };
  }
  
  /**
   * Visit parameter node
   */
  visitParameter(ctx: ParameterContext): GroupParameter | null {
    const idNode = ctx.ID();
    if (!idNode) return null;
    
    const name = idNode.getText();
    const text = ctx.getText();
    const mode: 'source' | 'target' = text.startsWith('source') ? 'source' : 'target';
    
    const typeIdNode = ctx.typeIdentifier();
    const type = typeIdNode?.identifier()?.getText();
    
    return { 
      position: this.getPosition(ctx),
      mode, 
      name, 
      type 
    };
  }
  
  /**
   * Visit expression node (rule)
   */
  visitMapRule(ctx: MapRuleContext): Rule | null {
    // MapRuleContext can be MapFhirMarkupContext or MapSimpleCopyContext
    // Check if it has a mapTransformationRule (MapFhirMarkupContext)
    const mapTransformCtx = (ctx as any).mapTransformationRule?.();
    if (mapTransformCtx) {
      // This is a MapFhirMarkupContext - process the full map transformation rule
      return this.visitMapTransformationRule(mapTransformCtx);
    }
    
    // Check if it's a MapSimpleCopyContext
    const qualIdNodes = (ctx as any).qualifiedIdentifier_list?.();
    const nameNode = (ctx as any).ruleName?.();
    
    if (qualIdNodes) {
      // This is a MapSimpleCopyContext - simple copy rule
      const name = nameNode ? this.removeQuotes(nameNode.getText()) : undefined;
      
      // For simple copy, create a basic rule
      // The qualifiedIdentifiers represent source -> target mappings
      return {
        position: this.getPosition(ctx),
        name,
        sources: [],
        targets: [],
        dependent: undefined
      };
    }
    
    // Fallback for unknown expression types
    return {
      position: this.getPosition(ctx),
      name: undefined,
      sources: [],
      targets: [],
      dependent: undefined
    };
  }
  
  /**
   * Visit map expression node
   */
  visitMapTransformationRule(ctx: MapTransformationRuleContext): Rule | null {
    const sources: RuleSource[] = [];
    const targets: RuleTarget[] = [];
    
    // Process sources
    const sourcesNode = ctx.ruleSources();
    const sourceNodes = sourcesNode?.ruleSource_list() || [];
    for (const sourceNode of sourceNodes) {
      const source = this.visitRuleSource(sourceNode);
      if (source) sources.push(source);
    }
    
    // Process targets
    const targetsNode = ctx.ruleTargets();
    if (targetsNode) {
      const targetResults = this.visitRuleTargets(targetsNode);
      targets.push(...targetResults);
    }
    
    // Process dependent expressions
    const depNode = ctx.dependentExpression();
    const dependent = depNode ? this.visitDependentExpression(depNode) : undefined;
    
    // Get rule name if present
    const nameNode = ctx.ruleName();
    const name = nameNode ? this.removeQuotes(nameNode.getText()) : undefined;
    
    return {
      position: this.getPosition(ctx),
      name,
      sources,
      targets,
      dependent: dependent || undefined
    };
  }
  
  /**
   * Visit map expression source node
   */
  visitRuleSource(ctx: RuleSourceContext): RuleSource | null {
    const qualIdNode = ctx.qualifiedIdentifier();
    if (!qualIdNode) return null;
    
    const fullPath = this.visitQualifiedIdentifier(qualIdNode);
    const parts = fullPath.split('.');
    const context = parts[0];
    const element = parts.length > 1 ? parts.slice(1).join('.') : undefined;
    
    // Get type if present
    const typeIdNode = ctx.typeIdentifier();
    const type = typeIdNode?.identifier()?.getText();
    
    // Get cardinality if present
    const cardNode = ctx.sourceCardinality();
    let min: number | undefined;
    let max: number | '*' | undefined;
    if (cardNode) {
      const cardText = cardNode.getText();
      const parts = cardText.split('..');
      if (parts.length === 2) {
        min = parseInt(parts[0]);
        max = parts[1] === '*' ? '*' : parseInt(parts[1]);
      }
    }
    
    // Get default value if present
    const defaultNode = ctx.sourceDefault();
    const defaultValue = defaultNode?.fpExpression()?.getText();
    
    // Get list mode if present
    const listModeNode = ctx.sourceListMode();
    const listMode = listModeNode?.getText() as 'first' | 'last' | 'not_first' | 'not_last' | 'only_one' | undefined;
    
    // Get variable name if present
    const aliasNode = ctx.alias();
    const variable = aliasNode?.identifier()?.getText();
    
    // Get where clause if present
    const whereNode = ctx.whereClause();
    const condition = whereNode?.fpExpression()?.getText();
    
    // Get check clause if present
    const checkNode = ctx.checkClause();
    const check = checkNode?.fpExpression()?.getText();
    
    // Get log statement if present
    const logNode = ctx.log();
    const log = logNode?.fpExpression()?.getText();
    
    return {
      position: this.getPosition(ctx),
      context,
      element,
      type,
      min,
      max,
      defaultValue,
      listMode,
      variable,
      condition,
      check,
      log
    };
  }
  
  /**
   * Visit rule targets wrapper (contains multiple ruleTarget elements)
   */
  visitRuleTargets(ctx: any): RuleTarget[] {
    const targets: RuleTarget[] = [];
    
    // The new structure: RuleTargetsContext has ruleTarget_list() method
    const targetNodes = ctx.ruleTarget_list();
    for (const targetNode of targetNodes) {
      const target = this.visitSingleRuleTarget(targetNode);
      if (target) targets.push(target);
    }
    
    return targets;
  }
  
  /**
   * Visit individual rule target element
   */
  visitSingleRuleTarget(ctx: any): RuleTarget | null {
    const qualIdNode = ctx.qualifiedIdentifier();
    if (!qualIdNode) return null;
    
    const fullPath = this.visitQualifiedIdentifier(qualIdNode);
    const parts = fullPath.split('.');
    const context = parts[0];
    const element = parts.length > 1 ? parts.slice(1).join('.') : undefined;
    
    // Get transform if present
    const transformNode = ctx.transform();
    const transform = transformNode ? this.visitTransform(transformNode) : undefined;
    
    // Get variable name if present
    const aliasNode = ctx.alias();
    const variable = aliasNode?.identifier()?.getText();
    
    // Get list mode if present
    const listModeNode = ctx.targetListMode();
    const listMode = listModeNode?.getText() as 'first' | 'share' | 'last' | 'single' | undefined;
    
    return {
      position: this.getPosition(ctx),
      context,
      element,
      transform: transform || undefined,
      variable,
      listMode
    };
  }
  
  /**
   * Visit transform node
   */
  visitTransform(ctx: TransformContext): Transform | null {
    // Check if it's a literal
    const literalNode = ctx.literal();
    if (literalNode) {
      return {
        position: this.getPosition(ctx),
        type: 'copy',
        parameters: [{
          type: 'literal',
          value: this.removeQuotes(literalNode.getText())
        }]
      };
    }
    
    // Check if it's a qualified identifier (copy transform)
    const qualIdNode = ctx.qualifiedIdentifier();
    if (qualIdNode) {
      return {
        position: this.getPosition(ctx),
        type: 'copy',
        parameters: [{
          type: 'identifier',
          value: this.visitQualifiedIdentifier(qualIdNode)
        }]
      };
    }
    
    // Check if it's an invocation (named transform)
    const invocationNode = ctx.groupInvocation();
    if (invocationNode) {
      return this.visitInvocationAsTransform(invocationNode);
    }
    
    // Check if it's a FHIRPath expression
    const fpExprNode = ctx.fpExpression();
    if (fpExprNode) {
      return {
        position: this.getPosition(ctx),
        type: 'evaluate',
        parameters: [{
          type: 'expression',
          value: fpExprNode.getText()
        }]
      };
    }
    
    return null;
  }
  
  /**
   * Visit invocation node as transform
   */
  visitInvocationAsTransform(ctx: GroupInvocationContext): Transform | null {
    const idNode = ctx.identifier();
    if (!idNode) return null;
    
    const type = this.visitIdentifier(idNode);
    const parameters: TransformParameter[] = [];
    
    const paramListNode = ctx.groupParamList();
    if (paramListNode) {
      const paramNodes = paramListNode.groupParam_list();
      for (const paramNode of paramNodes) {
        const literalNode = paramNode.literal();
        const idNode = paramNode.ID();
        
        if (literalNode) {
          const text = literalNode.getText();
          let value: string | number | boolean = this.removeQuotes(text);
          
          // Try to parse as number or boolean
          if (text === 'true') value = true;
          else if (text === 'false') value = false;
          else if (!isNaN(Number(text))) value = Number(text);
          
          parameters.push({
            type: 'literal',
            value
          });
        } else if (idNode) {
          parameters.push({
            type: 'identifier',
            value: idNode.getText()
          });
        }
      }
    }
    
    return { 
      position: this.getPosition(ctx),
      type, 
      parameters 
    };
  }
  
  /**
   * Visit dependent expression node
   */
  visitDependentExpression(ctx: DependentExpressionContext): RuleDependent | null {
    const invocations: GroupInvocation[] = [];
    const rules: Rule[] = [];
    
    // Process invocations
    const invocationNodes = ctx.groupInvocation_list();
    for (const invNode of invocationNodes) {
      const invocation = this.visitInvocationAsGroupInvocation(invNode);
      if (invocation) invocations.push(invocation);
    }
    
    // Process nested rules
    const mapRulesNode = ctx.mapRules();
    if (mapRulesNode) {
      const ruleNodes = mapRulesNode.mapRule_list();
      for (const ruleNode of ruleNodes) {
        const rule = this.visitMapRule(ruleNode);
        if (rule) rules.push(rule);
      }
    }
    
    return { 
      position: this.getPosition(ctx),
      invocations, 
      rules 
    };
  }
  
  /**
   * Visit invocation node as group invocation
   */
  visitInvocationAsGroupInvocation(ctx: GroupInvocationContext): GroupInvocation | null {
    const idNode = ctx.identifier();
    if (!idNode) return null;
    
    const name = this.visitIdentifier(idNode);
    const parameters: InvocationParameter[] = [];
    
    const paramListNode = ctx.groupParamList();
    if (paramListNode) {
      const paramNodes = paramListNode.groupParam_list();
      for (const paramNode of paramNodes) {
        const literalNode = paramNode.literal();
        const idNode = paramNode.ID();
        
        if (literalNode) {
          const text = literalNode.getText();
          let value: string | number | boolean = this.removeQuotes(text);
          
          // Try to parse as number or boolean
          if (text === 'true') value = true;
          else if (text === 'false') value = false;
          else if (!isNaN(Number(text))) value = Number(text);
          
          parameters.push({
            type: 'literal',
            value
          });
        } else if (idNode) {
          parameters.push({
            type: 'identifier',
            value: idNode.getText()
          });
        }
      }
    }
    
    return { 
      position: this.getPosition(ctx),
      name, 
      parameters 
    };
  }
  
  /**
   * Visit qualified identifier node
   */
  visitQualifiedIdentifier(ctx: QualifiedIdentifierContext): string {
    return ctx.getText();
  }
  
  /**
   * Visit identifier node
   */
  visitIdentifier(ctx: IdentifierContext): string {
    const text = ctx.getText();
    // Remove backticks if present
    if (text.startsWith('`') && text.endsWith('`')) {
      return text.substring(1, text.length - 1);
    }
    return text;
  }
  
  /**
   * Visit URL node
   */
  visitUrl(ctx: UrlContext): string {
    return this.removeQuotes(ctx.getText());
  }
  
  /**
   * Helper to remove quotes from strings
   */
  private removeQuotes(text: string): string {
    if ((text.startsWith("'") && text.endsWith("'")) ||
        (text.startsWith('"') && text.endsWith('"'))) {
      return text.substring(1, text.length - 1);
    }
    return text;
  }
}
