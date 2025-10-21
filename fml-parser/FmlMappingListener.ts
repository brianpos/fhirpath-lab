// Generated from FmlMapping.g4 by ANTLR 4.13.2

import {ParseTreeListener} from "antlr4";


import { StructureMapContext } from "./FmlMappingParser.js";
import { ConceptMapDeclarationContext } from "./FmlMappingParser.js";
import { ConceptMapPrefixContext } from "./FmlMappingParser.js";
import { ConceptMapCodeMapContext } from "./FmlMappingParser.js";
import { ConceptMapSourceContext } from "./FmlMappingParser.js";
import { ConceptMapTargetContext } from "./FmlMappingParser.js";
import { CodeContext } from "./FmlMappingParser.js";
import { MapDeclarationContext } from "./FmlMappingParser.js";
import { MetadataDeclarationContext } from "./FmlMappingParser.js";
import { MarkdownLiteralContext } from "./FmlMappingParser.js";
import { UrlContext } from "./FmlMappingParser.js";
import { IdentifierContext } from "./FmlMappingParser.js";
import { StructureDeclarationContext } from "./FmlMappingParser.js";
import { ConstantDeclarationContext } from "./FmlMappingParser.js";
import { GroupDeclarationContext } from "./FmlMappingParser.js";
import { ParametersContext } from "./FmlMappingParser.js";
import { ParameterContext } from "./FmlMappingParser.js";
import { MapRulesContext } from "./FmlMappingParser.js";
import { TypeModeContext } from "./FmlMappingParser.js";
import { ExtendsContext } from "./FmlMappingParser.js";
import { TypeIdentifierContext } from "./FmlMappingParser.js";
import { MapSimpleCopyContext } from "./FmlMappingParser.js";
import { MapFhirMarkupContext } from "./FmlMappingParser.js";
import { MapTransformationRuleContext } from "./FmlMappingParser.js";
import { RuleNameContext } from "./FmlMappingParser.js";
import { RuleSourceContext } from "./FmlMappingParser.js";
import { RuleTargetContext } from "./FmlMappingParser.js";
import { SourceCardinalityContext } from "./FmlMappingParser.js";
import { UpperBoundContext } from "./FmlMappingParser.js";
import { QualifiedIdentifierContext } from "./FmlMappingParser.js";
import { SourceDefaultContext } from "./FmlMappingParser.js";
import { AliasContext } from "./FmlMappingParser.js";
import { WhereClauseContext } from "./FmlMappingParser.js";
import { CheckClauseContext } from "./FmlMappingParser.js";
import { LogContext } from "./FmlMappingParser.js";
import { DependentExpressionContext } from "./FmlMappingParser.js";
import { ImportDeclarationContext } from "./FmlMappingParser.js";
import { MapLineTargetContext } from "./FmlMappingParser.js";
import { TransformContext } from "./FmlMappingParser.js";
import { GroupInvocationContext } from "./FmlMappingParser.js";
import { GroupParamListContext } from "./FmlMappingParser.js";
import { GroupParamContext } from "./FmlMappingParser.js";
import { IndexerExpressionContext } from "./FmlMappingParser.js";
import { PolarityExpressionContext } from "./FmlMappingParser.js";
import { AdditiveExpressionContext } from "./FmlMappingParser.js";
import { MultiplicativeExpressionContext } from "./FmlMappingParser.js";
import { UnionExpressionContext } from "./FmlMappingParser.js";
import { OrExpressionContext } from "./FmlMappingParser.js";
import { AndExpressionContext } from "./FmlMappingParser.js";
import { MembershipExpressionContext } from "./FmlMappingParser.js";
import { InequalityExpressionContext } from "./FmlMappingParser.js";
import { InvocationExpressionContext } from "./FmlMappingParser.js";
import { EqualityExpressionContext } from "./FmlMappingParser.js";
import { ImpliesExpressionContext } from "./FmlMappingParser.js";
import { TermExpressionContext } from "./FmlMappingParser.js";
import { TypeExpressionContext } from "./FmlMappingParser.js";
import { InvocationTermContext } from "./FmlMappingParser.js";
import { LiteralTermContext } from "./FmlMappingParser.js";
import { ExternalConstantTermContext } from "./FmlMappingParser.js";
import { ParenthesizedTermContext } from "./FmlMappingParser.js";
import { FunctionInvocationContext } from "./FmlMappingParser.js";
import { MemberInvocationContext } from "./FmlMappingParser.js";
import { ThisInvocationContext } from "./FmlMappingParser.js";
import { IndexInvocationContext } from "./FmlMappingParser.js";
import { TotalInvocationContext } from "./FmlMappingParser.js";
import { FpExternalConstantContext } from "./FmlMappingParser.js";
import { FpFunctionContext } from "./FmlMappingParser.js";
import { SortDirectionArgumentContext } from "./FmlMappingParser.js";
import { FpParamListContext } from "./FmlMappingParser.js";
import { FpTypeSpecifierContext } from "./FmlMappingParser.js";
import { ConstantContext } from "./FmlMappingParser.js";
import { NullLiteralContext } from "./FmlMappingParser.js";
import { BooleanLiteralContext } from "./FmlMappingParser.js";
import { QuantityLiteralContext } from "./FmlMappingParser.js";
import { LongNumberLiteralContext } from "./FmlMappingParser.js";
import { NumberLiteralContext } from "./FmlMappingParser.js";
import { DateLiteralContext } from "./FmlMappingParser.js";
import { DateTimeLiteralContext } from "./FmlMappingParser.js";
import { TimeLiteralContext } from "./FmlMappingParser.js";
import { StringLiteralContext } from "./FmlMappingParser.js";
import { QuotedStringLiteralContext } from "./FmlMappingParser.js";
import { QuantityWithDateContext } from "./FmlMappingParser.js";
import { QuantityWithDatePluralContext } from "./FmlMappingParser.js";
import { QuantityWithUcumContext } from "./FmlMappingParser.js";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `FmlMappingParser`.
 */
export default class FmlMappingListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `FmlMappingParser.structureMap`.
	 * @param ctx the parse tree
	 */
	enterStructureMap?: (ctx: StructureMapContext) => void;
	/**
	 * Exit a parse tree produced by `FmlMappingParser.structureMap`.
	 * @param ctx the parse tree
	 */
	exitStructureMap?: (ctx: StructureMapContext) => void;
	/**
	 * Enter a parse tree produced by `FmlMappingParser.conceptMapDeclaration`.
	 * @param ctx the parse tree
	 */
	enterConceptMapDeclaration?: (ctx: ConceptMapDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `FmlMappingParser.conceptMapDeclaration`.
	 * @param ctx the parse tree
	 */
	exitConceptMapDeclaration?: (ctx: ConceptMapDeclarationContext) => void;
	/**
	 * Enter a parse tree produced by `FmlMappingParser.conceptMapPrefix`.
	 * @param ctx the parse tree
	 */
	enterConceptMapPrefix?: (ctx: ConceptMapPrefixContext) => void;
	/**
	 * Exit a parse tree produced by `FmlMappingParser.conceptMapPrefix`.
	 * @param ctx the parse tree
	 */
	exitConceptMapPrefix?: (ctx: ConceptMapPrefixContext) => void;
	/**
	 * Enter a parse tree produced by `FmlMappingParser.conceptMapCodeMap`.
	 * @param ctx the parse tree
	 */
	enterConceptMapCodeMap?: (ctx: ConceptMapCodeMapContext) => void;
	/**
	 * Exit a parse tree produced by `FmlMappingParser.conceptMapCodeMap`.
	 * @param ctx the parse tree
	 */
	exitConceptMapCodeMap?: (ctx: ConceptMapCodeMapContext) => void;
	/**
	 * Enter a parse tree produced by `FmlMappingParser.conceptMapSource`.
	 * @param ctx the parse tree
	 */
	enterConceptMapSource?: (ctx: ConceptMapSourceContext) => void;
	/**
	 * Exit a parse tree produced by `FmlMappingParser.conceptMapSource`.
	 * @param ctx the parse tree
	 */
	exitConceptMapSource?: (ctx: ConceptMapSourceContext) => void;
	/**
	 * Enter a parse tree produced by `FmlMappingParser.conceptMapTarget`.
	 * @param ctx the parse tree
	 */
	enterConceptMapTarget?: (ctx: ConceptMapTargetContext) => void;
	/**
	 * Exit a parse tree produced by `FmlMappingParser.conceptMapTarget`.
	 * @param ctx the parse tree
	 */
	exitConceptMapTarget?: (ctx: ConceptMapTargetContext) => void;
	/**
	 * Enter a parse tree produced by `FmlMappingParser.code`.
	 * @param ctx the parse tree
	 */
	enterCode?: (ctx: CodeContext) => void;
	/**
	 * Exit a parse tree produced by `FmlMappingParser.code`.
	 * @param ctx the parse tree
	 */
	exitCode?: (ctx: CodeContext) => void;
	/**
	 * Enter a parse tree produced by `FmlMappingParser.mapDeclaration`.
	 * @param ctx the parse tree
	 */
	enterMapDeclaration?: (ctx: MapDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `FmlMappingParser.mapDeclaration`.
	 * @param ctx the parse tree
	 */
	exitMapDeclaration?: (ctx: MapDeclarationContext) => void;
	/**
	 * Enter a parse tree produced by `FmlMappingParser.metadataDeclaration`.
	 * @param ctx the parse tree
	 */
	enterMetadataDeclaration?: (ctx: MetadataDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `FmlMappingParser.metadataDeclaration`.
	 * @param ctx the parse tree
	 */
	exitMetadataDeclaration?: (ctx: MetadataDeclarationContext) => void;
	/**
	 * Enter a parse tree produced by `FmlMappingParser.markdownLiteral`.
	 * @param ctx the parse tree
	 */
	enterMarkdownLiteral?: (ctx: MarkdownLiteralContext) => void;
	/**
	 * Exit a parse tree produced by `FmlMappingParser.markdownLiteral`.
	 * @param ctx the parse tree
	 */
	exitMarkdownLiteral?: (ctx: MarkdownLiteralContext) => void;
	/**
	 * Enter a parse tree produced by `FmlMappingParser.url`.
	 * @param ctx the parse tree
	 */
	enterUrl?: (ctx: UrlContext) => void;
	/**
	 * Exit a parse tree produced by `FmlMappingParser.url`.
	 * @param ctx the parse tree
	 */
	exitUrl?: (ctx: UrlContext) => void;
	/**
	 * Enter a parse tree produced by `FmlMappingParser.identifier`.
	 * @param ctx the parse tree
	 */
	enterIdentifier?: (ctx: IdentifierContext) => void;
	/**
	 * Exit a parse tree produced by `FmlMappingParser.identifier`.
	 * @param ctx the parse tree
	 */
	exitIdentifier?: (ctx: IdentifierContext) => void;
	/**
	 * Enter a parse tree produced by `FmlMappingParser.structureDeclaration`.
	 * @param ctx the parse tree
	 */
	enterStructureDeclaration?: (ctx: StructureDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `FmlMappingParser.structureDeclaration`.
	 * @param ctx the parse tree
	 */
	exitStructureDeclaration?: (ctx: StructureDeclarationContext) => void;
	/**
	 * Enter a parse tree produced by `FmlMappingParser.constantDeclaration`.
	 * @param ctx the parse tree
	 */
	enterConstantDeclaration?: (ctx: ConstantDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `FmlMappingParser.constantDeclaration`.
	 * @param ctx the parse tree
	 */
	exitConstantDeclaration?: (ctx: ConstantDeclarationContext) => void;
	/**
	 * Enter a parse tree produced by `FmlMappingParser.groupDeclaration`.
	 * @param ctx the parse tree
	 */
	enterGroupDeclaration?: (ctx: GroupDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `FmlMappingParser.groupDeclaration`.
	 * @param ctx the parse tree
	 */
	exitGroupDeclaration?: (ctx: GroupDeclarationContext) => void;
	/**
	 * Enter a parse tree produced by `FmlMappingParser.parameters`.
	 * @param ctx the parse tree
	 */
	enterParameters?: (ctx: ParametersContext) => void;
	/**
	 * Exit a parse tree produced by `FmlMappingParser.parameters`.
	 * @param ctx the parse tree
	 */
	exitParameters?: (ctx: ParametersContext) => void;
	/**
	 * Enter a parse tree produced by `FmlMappingParser.parameter`.
	 * @param ctx the parse tree
	 */
	enterParameter?: (ctx: ParameterContext) => void;
	/**
	 * Exit a parse tree produced by `FmlMappingParser.parameter`.
	 * @param ctx the parse tree
	 */
	exitParameter?: (ctx: ParameterContext) => void;
	/**
	 * Enter a parse tree produced by `FmlMappingParser.mapRules`.
	 * @param ctx the parse tree
	 */
	enterMapRules?: (ctx: MapRulesContext) => void;
	/**
	 * Exit a parse tree produced by `FmlMappingParser.mapRules`.
	 * @param ctx the parse tree
	 */
	exitMapRules?: (ctx: MapRulesContext) => void;
	/**
	 * Enter a parse tree produced by `FmlMappingParser.typeMode`.
	 * @param ctx the parse tree
	 */
	enterTypeMode?: (ctx: TypeModeContext) => void;
	/**
	 * Exit a parse tree produced by `FmlMappingParser.typeMode`.
	 * @param ctx the parse tree
	 */
	exitTypeMode?: (ctx: TypeModeContext) => void;
	/**
	 * Enter a parse tree produced by `FmlMappingParser.extends`.
	 * @param ctx the parse tree
	 */
	enterExtends?: (ctx: ExtendsContext) => void;
	/**
	 * Exit a parse tree produced by `FmlMappingParser.extends`.
	 * @param ctx the parse tree
	 */
	exitExtends?: (ctx: ExtendsContext) => void;
	/**
	 * Enter a parse tree produced by `FmlMappingParser.typeIdentifier`.
	 * @param ctx the parse tree
	 */
	enterTypeIdentifier?: (ctx: TypeIdentifierContext) => void;
	/**
	 * Exit a parse tree produced by `FmlMappingParser.typeIdentifier`.
	 * @param ctx the parse tree
	 */
	exitTypeIdentifier?: (ctx: TypeIdentifierContext) => void;
	/**
	 * Enter a parse tree produced by the `mapSimpleCopy`
	 * labeled alternative in `FmlMappingParser.mapRule`.
	 * @param ctx the parse tree
	 */
	enterMapSimpleCopy?: (ctx: MapSimpleCopyContext) => void;
	/**
	 * Exit a parse tree produced by the `mapSimpleCopy`
	 * labeled alternative in `FmlMappingParser.mapRule`.
	 * @param ctx the parse tree
	 */
	exitMapSimpleCopy?: (ctx: MapSimpleCopyContext) => void;
	/**
	 * Enter a parse tree produced by the `mapFhirMarkup`
	 * labeled alternative in `FmlMappingParser.mapRule`.
	 * @param ctx the parse tree
	 */
	enterMapFhirMarkup?: (ctx: MapFhirMarkupContext) => void;
	/**
	 * Exit a parse tree produced by the `mapFhirMarkup`
	 * labeled alternative in `FmlMappingParser.mapRule`.
	 * @param ctx the parse tree
	 */
	exitMapFhirMarkup?: (ctx: MapFhirMarkupContext) => void;
	/**
	 * Enter a parse tree produced by `FmlMappingParser.mapTransformationRule`.
	 * @param ctx the parse tree
	 */
	enterMapTransformationRule?: (ctx: MapTransformationRuleContext) => void;
	/**
	 * Exit a parse tree produced by `FmlMappingParser.mapTransformationRule`.
	 * @param ctx the parse tree
	 */
	exitMapTransformationRule?: (ctx: MapTransformationRuleContext) => void;
	/**
	 * Enter a parse tree produced by `FmlMappingParser.ruleName`.
	 * @param ctx the parse tree
	 */
	enterRuleName?: (ctx: RuleNameContext) => void;
	/**
	 * Exit a parse tree produced by `FmlMappingParser.ruleName`.
	 * @param ctx the parse tree
	 */
	exitRuleName?: (ctx: RuleNameContext) => void;
	/**
	 * Enter a parse tree produced by `FmlMappingParser.ruleSource`.
	 * @param ctx the parse tree
	 */
	enterRuleSource?: (ctx: RuleSourceContext) => void;
	/**
	 * Exit a parse tree produced by `FmlMappingParser.ruleSource`.
	 * @param ctx the parse tree
	 */
	exitRuleSource?: (ctx: RuleSourceContext) => void;
	/**
	 * Enter a parse tree produced by `FmlMappingParser.ruleTarget`.
	 * @param ctx the parse tree
	 */
	enterRuleTarget?: (ctx: RuleTargetContext) => void;
	/**
	 * Exit a parse tree produced by `FmlMappingParser.ruleTarget`.
	 * @param ctx the parse tree
	 */
	exitRuleTarget?: (ctx: RuleTargetContext) => void;
	/**
	 * Enter a parse tree produced by `FmlMappingParser.sourceCardinality`.
	 * @param ctx the parse tree
	 */
	enterSourceCardinality?: (ctx: SourceCardinalityContext) => void;
	/**
	 * Exit a parse tree produced by `FmlMappingParser.sourceCardinality`.
	 * @param ctx the parse tree
	 */
	exitSourceCardinality?: (ctx: SourceCardinalityContext) => void;
	/**
	 * Enter a parse tree produced by `FmlMappingParser.upperBound`.
	 * @param ctx the parse tree
	 */
	enterUpperBound?: (ctx: UpperBoundContext) => void;
	/**
	 * Exit a parse tree produced by `FmlMappingParser.upperBound`.
	 * @param ctx the parse tree
	 */
	exitUpperBound?: (ctx: UpperBoundContext) => void;
	/**
	 * Enter a parse tree produced by `FmlMappingParser.qualifiedIdentifier`.
	 * @param ctx the parse tree
	 */
	enterQualifiedIdentifier?: (ctx: QualifiedIdentifierContext) => void;
	/**
	 * Exit a parse tree produced by `FmlMappingParser.qualifiedIdentifier`.
	 * @param ctx the parse tree
	 */
	exitQualifiedIdentifier?: (ctx: QualifiedIdentifierContext) => void;
	/**
	 * Enter a parse tree produced by `FmlMappingParser.sourceDefault`.
	 * @param ctx the parse tree
	 */
	enterSourceDefault?: (ctx: SourceDefaultContext) => void;
	/**
	 * Exit a parse tree produced by `FmlMappingParser.sourceDefault`.
	 * @param ctx the parse tree
	 */
	exitSourceDefault?: (ctx: SourceDefaultContext) => void;
	/**
	 * Enter a parse tree produced by `FmlMappingParser.alias`.
	 * @param ctx the parse tree
	 */
	enterAlias?: (ctx: AliasContext) => void;
	/**
	 * Exit a parse tree produced by `FmlMappingParser.alias`.
	 * @param ctx the parse tree
	 */
	exitAlias?: (ctx: AliasContext) => void;
	/**
	 * Enter a parse tree produced by `FmlMappingParser.whereClause`.
	 * @param ctx the parse tree
	 */
	enterWhereClause?: (ctx: WhereClauseContext) => void;
	/**
	 * Exit a parse tree produced by `FmlMappingParser.whereClause`.
	 * @param ctx the parse tree
	 */
	exitWhereClause?: (ctx: WhereClauseContext) => void;
	/**
	 * Enter a parse tree produced by `FmlMappingParser.checkClause`.
	 * @param ctx the parse tree
	 */
	enterCheckClause?: (ctx: CheckClauseContext) => void;
	/**
	 * Exit a parse tree produced by `FmlMappingParser.checkClause`.
	 * @param ctx the parse tree
	 */
	exitCheckClause?: (ctx: CheckClauseContext) => void;
	/**
	 * Enter a parse tree produced by `FmlMappingParser.log`.
	 * @param ctx the parse tree
	 */
	enterLog?: (ctx: LogContext) => void;
	/**
	 * Exit a parse tree produced by `FmlMappingParser.log`.
	 * @param ctx the parse tree
	 */
	exitLog?: (ctx: LogContext) => void;
	/**
	 * Enter a parse tree produced by `FmlMappingParser.dependentExpression`.
	 * @param ctx the parse tree
	 */
	enterDependentExpression?: (ctx: DependentExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `FmlMappingParser.dependentExpression`.
	 * @param ctx the parse tree
	 */
	exitDependentExpression?: (ctx: DependentExpressionContext) => void;
	/**
	 * Enter a parse tree produced by `FmlMappingParser.importDeclaration`.
	 * @param ctx the parse tree
	 */
	enterImportDeclaration?: (ctx: ImportDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `FmlMappingParser.importDeclaration`.
	 * @param ctx the parse tree
	 */
	exitImportDeclaration?: (ctx: ImportDeclarationContext) => void;
	/**
	 * Enter a parse tree produced by `FmlMappingParser.mapLineTarget`.
	 * @param ctx the parse tree
	 */
	enterMapLineTarget?: (ctx: MapLineTargetContext) => void;
	/**
	 * Exit a parse tree produced by `FmlMappingParser.mapLineTarget`.
	 * @param ctx the parse tree
	 */
	exitMapLineTarget?: (ctx: MapLineTargetContext) => void;
	/**
	 * Enter a parse tree produced by `FmlMappingParser.transform`.
	 * @param ctx the parse tree
	 */
	enterTransform?: (ctx: TransformContext) => void;
	/**
	 * Exit a parse tree produced by `FmlMappingParser.transform`.
	 * @param ctx the parse tree
	 */
	exitTransform?: (ctx: TransformContext) => void;
	/**
	 * Enter a parse tree produced by `FmlMappingParser.groupInvocation`.
	 * @param ctx the parse tree
	 */
	enterGroupInvocation?: (ctx: GroupInvocationContext) => void;
	/**
	 * Exit a parse tree produced by `FmlMappingParser.groupInvocation`.
	 * @param ctx the parse tree
	 */
	exitGroupInvocation?: (ctx: GroupInvocationContext) => void;
	/**
	 * Enter a parse tree produced by `FmlMappingParser.groupParamList`.
	 * @param ctx the parse tree
	 */
	enterGroupParamList?: (ctx: GroupParamListContext) => void;
	/**
	 * Exit a parse tree produced by `FmlMappingParser.groupParamList`.
	 * @param ctx the parse tree
	 */
	exitGroupParamList?: (ctx: GroupParamListContext) => void;
	/**
	 * Enter a parse tree produced by `FmlMappingParser.groupParam`.
	 * @param ctx the parse tree
	 */
	enterGroupParam?: (ctx: GroupParamContext) => void;
	/**
	 * Exit a parse tree produced by `FmlMappingParser.groupParam`.
	 * @param ctx the parse tree
	 */
	exitGroupParam?: (ctx: GroupParamContext) => void;
	/**
	 * Enter a parse tree produced by the `indexerExpression`
	 * labeled alternative in `FmlMappingParser.fpExpression`.
	 * @param ctx the parse tree
	 */
	enterIndexerExpression?: (ctx: IndexerExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `indexerExpression`
	 * labeled alternative in `FmlMappingParser.fpExpression`.
	 * @param ctx the parse tree
	 */
	exitIndexerExpression?: (ctx: IndexerExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `polarityExpression`
	 * labeled alternative in `FmlMappingParser.fpExpression`.
	 * @param ctx the parse tree
	 */
	enterPolarityExpression?: (ctx: PolarityExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `polarityExpression`
	 * labeled alternative in `FmlMappingParser.fpExpression`.
	 * @param ctx the parse tree
	 */
	exitPolarityExpression?: (ctx: PolarityExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `additiveExpression`
	 * labeled alternative in `FmlMappingParser.fpExpression`.
	 * @param ctx the parse tree
	 */
	enterAdditiveExpression?: (ctx: AdditiveExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `additiveExpression`
	 * labeled alternative in `FmlMappingParser.fpExpression`.
	 * @param ctx the parse tree
	 */
	exitAdditiveExpression?: (ctx: AdditiveExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `multiplicativeExpression`
	 * labeled alternative in `FmlMappingParser.fpExpression`.
	 * @param ctx the parse tree
	 */
	enterMultiplicativeExpression?: (ctx: MultiplicativeExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `multiplicativeExpression`
	 * labeled alternative in `FmlMappingParser.fpExpression`.
	 * @param ctx the parse tree
	 */
	exitMultiplicativeExpression?: (ctx: MultiplicativeExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `unionExpression`
	 * labeled alternative in `FmlMappingParser.fpExpression`.
	 * @param ctx the parse tree
	 */
	enterUnionExpression?: (ctx: UnionExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `unionExpression`
	 * labeled alternative in `FmlMappingParser.fpExpression`.
	 * @param ctx the parse tree
	 */
	exitUnionExpression?: (ctx: UnionExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `orExpression`
	 * labeled alternative in `FmlMappingParser.fpExpression`.
	 * @param ctx the parse tree
	 */
	enterOrExpression?: (ctx: OrExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `orExpression`
	 * labeled alternative in `FmlMappingParser.fpExpression`.
	 * @param ctx the parse tree
	 */
	exitOrExpression?: (ctx: OrExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `andExpression`
	 * labeled alternative in `FmlMappingParser.fpExpression`.
	 * @param ctx the parse tree
	 */
	enterAndExpression?: (ctx: AndExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `andExpression`
	 * labeled alternative in `FmlMappingParser.fpExpression`.
	 * @param ctx the parse tree
	 */
	exitAndExpression?: (ctx: AndExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `membershipExpression`
	 * labeled alternative in `FmlMappingParser.fpExpression`.
	 * @param ctx the parse tree
	 */
	enterMembershipExpression?: (ctx: MembershipExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `membershipExpression`
	 * labeled alternative in `FmlMappingParser.fpExpression`.
	 * @param ctx the parse tree
	 */
	exitMembershipExpression?: (ctx: MembershipExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `inequalityExpression`
	 * labeled alternative in `FmlMappingParser.fpExpression`.
	 * @param ctx the parse tree
	 */
	enterInequalityExpression?: (ctx: InequalityExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `inequalityExpression`
	 * labeled alternative in `FmlMappingParser.fpExpression`.
	 * @param ctx the parse tree
	 */
	exitInequalityExpression?: (ctx: InequalityExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `invocationExpression`
	 * labeled alternative in `FmlMappingParser.fpExpression`.
	 * @param ctx the parse tree
	 */
	enterInvocationExpression?: (ctx: InvocationExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `invocationExpression`
	 * labeled alternative in `FmlMappingParser.fpExpression`.
	 * @param ctx the parse tree
	 */
	exitInvocationExpression?: (ctx: InvocationExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `equalityExpression`
	 * labeled alternative in `FmlMappingParser.fpExpression`.
	 * @param ctx the parse tree
	 */
	enterEqualityExpression?: (ctx: EqualityExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `equalityExpression`
	 * labeled alternative in `FmlMappingParser.fpExpression`.
	 * @param ctx the parse tree
	 */
	exitEqualityExpression?: (ctx: EqualityExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `impliesExpression`
	 * labeled alternative in `FmlMappingParser.fpExpression`.
	 * @param ctx the parse tree
	 */
	enterImpliesExpression?: (ctx: ImpliesExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `impliesExpression`
	 * labeled alternative in `FmlMappingParser.fpExpression`.
	 * @param ctx the parse tree
	 */
	exitImpliesExpression?: (ctx: ImpliesExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `termExpression`
	 * labeled alternative in `FmlMappingParser.fpExpression`.
	 * @param ctx the parse tree
	 */
	enterTermExpression?: (ctx: TermExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `termExpression`
	 * labeled alternative in `FmlMappingParser.fpExpression`.
	 * @param ctx the parse tree
	 */
	exitTermExpression?: (ctx: TermExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `typeExpression`
	 * labeled alternative in `FmlMappingParser.fpExpression`.
	 * @param ctx the parse tree
	 */
	enterTypeExpression?: (ctx: TypeExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `typeExpression`
	 * labeled alternative in `FmlMappingParser.fpExpression`.
	 * @param ctx the parse tree
	 */
	exitTypeExpression?: (ctx: TypeExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `invocationTerm`
	 * labeled alternative in `FmlMappingParser.fpTerm`.
	 * @param ctx the parse tree
	 */
	enterInvocationTerm?: (ctx: InvocationTermContext) => void;
	/**
	 * Exit a parse tree produced by the `invocationTerm`
	 * labeled alternative in `FmlMappingParser.fpTerm`.
	 * @param ctx the parse tree
	 */
	exitInvocationTerm?: (ctx: InvocationTermContext) => void;
	/**
	 * Enter a parse tree produced by the `literalTerm`
	 * labeled alternative in `FmlMappingParser.fpTerm`.
	 * @param ctx the parse tree
	 */
	enterLiteralTerm?: (ctx: LiteralTermContext) => void;
	/**
	 * Exit a parse tree produced by the `literalTerm`
	 * labeled alternative in `FmlMappingParser.fpTerm`.
	 * @param ctx the parse tree
	 */
	exitLiteralTerm?: (ctx: LiteralTermContext) => void;
	/**
	 * Enter a parse tree produced by the `externalConstantTerm`
	 * labeled alternative in `FmlMappingParser.fpTerm`.
	 * @param ctx the parse tree
	 */
	enterExternalConstantTerm?: (ctx: ExternalConstantTermContext) => void;
	/**
	 * Exit a parse tree produced by the `externalConstantTerm`
	 * labeled alternative in `FmlMappingParser.fpTerm`.
	 * @param ctx the parse tree
	 */
	exitExternalConstantTerm?: (ctx: ExternalConstantTermContext) => void;
	/**
	 * Enter a parse tree produced by the `parenthesizedTerm`
	 * labeled alternative in `FmlMappingParser.fpTerm`.
	 * @param ctx the parse tree
	 */
	enterParenthesizedTerm?: (ctx: ParenthesizedTermContext) => void;
	/**
	 * Exit a parse tree produced by the `parenthesizedTerm`
	 * labeled alternative in `FmlMappingParser.fpTerm`.
	 * @param ctx the parse tree
	 */
	exitParenthesizedTerm?: (ctx: ParenthesizedTermContext) => void;
	/**
	 * Enter a parse tree produced by the `functionInvocation`
	 * labeled alternative in `FmlMappingParser.fpInvocation`.
	 * @param ctx the parse tree
	 */
	enterFunctionInvocation?: (ctx: FunctionInvocationContext) => void;
	/**
	 * Exit a parse tree produced by the `functionInvocation`
	 * labeled alternative in `FmlMappingParser.fpInvocation`.
	 * @param ctx the parse tree
	 */
	exitFunctionInvocation?: (ctx: FunctionInvocationContext) => void;
	/**
	 * Enter a parse tree produced by the `memberInvocation`
	 * labeled alternative in `FmlMappingParser.fpInvocation`.
	 * @param ctx the parse tree
	 */
	enterMemberInvocation?: (ctx: MemberInvocationContext) => void;
	/**
	 * Exit a parse tree produced by the `memberInvocation`
	 * labeled alternative in `FmlMappingParser.fpInvocation`.
	 * @param ctx the parse tree
	 */
	exitMemberInvocation?: (ctx: MemberInvocationContext) => void;
	/**
	 * Enter a parse tree produced by the `thisInvocation`
	 * labeled alternative in `FmlMappingParser.fpInvocation`.
	 * @param ctx the parse tree
	 */
	enterThisInvocation?: (ctx: ThisInvocationContext) => void;
	/**
	 * Exit a parse tree produced by the `thisInvocation`
	 * labeled alternative in `FmlMappingParser.fpInvocation`.
	 * @param ctx the parse tree
	 */
	exitThisInvocation?: (ctx: ThisInvocationContext) => void;
	/**
	 * Enter a parse tree produced by the `indexInvocation`
	 * labeled alternative in `FmlMappingParser.fpInvocation`.
	 * @param ctx the parse tree
	 */
	enterIndexInvocation?: (ctx: IndexInvocationContext) => void;
	/**
	 * Exit a parse tree produced by the `indexInvocation`
	 * labeled alternative in `FmlMappingParser.fpInvocation`.
	 * @param ctx the parse tree
	 */
	exitIndexInvocation?: (ctx: IndexInvocationContext) => void;
	/**
	 * Enter a parse tree produced by the `totalInvocation`
	 * labeled alternative in `FmlMappingParser.fpInvocation`.
	 * @param ctx the parse tree
	 */
	enterTotalInvocation?: (ctx: TotalInvocationContext) => void;
	/**
	 * Exit a parse tree produced by the `totalInvocation`
	 * labeled alternative in `FmlMappingParser.fpInvocation`.
	 * @param ctx the parse tree
	 */
	exitTotalInvocation?: (ctx: TotalInvocationContext) => void;
	/**
	 * Enter a parse tree produced by `FmlMappingParser.fpExternalConstant`.
	 * @param ctx the parse tree
	 */
	enterFpExternalConstant?: (ctx: FpExternalConstantContext) => void;
	/**
	 * Exit a parse tree produced by `FmlMappingParser.fpExternalConstant`.
	 * @param ctx the parse tree
	 */
	exitFpExternalConstant?: (ctx: FpExternalConstantContext) => void;
	/**
	 * Enter a parse tree produced by `FmlMappingParser.fpFunction`.
	 * @param ctx the parse tree
	 */
	enterFpFunction?: (ctx: FpFunctionContext) => void;
	/**
	 * Exit a parse tree produced by `FmlMappingParser.fpFunction`.
	 * @param ctx the parse tree
	 */
	exitFpFunction?: (ctx: FpFunctionContext) => void;
	/**
	 * Enter a parse tree produced by the `sortDirectionArgument`
	 * labeled alternative in `FmlMappingParser.fpSortArgument`.
	 * @param ctx the parse tree
	 */
	enterSortDirectionArgument?: (ctx: SortDirectionArgumentContext) => void;
	/**
	 * Exit a parse tree produced by the `sortDirectionArgument`
	 * labeled alternative in `FmlMappingParser.fpSortArgument`.
	 * @param ctx the parse tree
	 */
	exitSortDirectionArgument?: (ctx: SortDirectionArgumentContext) => void;
	/**
	 * Enter a parse tree produced by `FmlMappingParser.fpParamList`.
	 * @param ctx the parse tree
	 */
	enterFpParamList?: (ctx: FpParamListContext) => void;
	/**
	 * Exit a parse tree produced by `FmlMappingParser.fpParamList`.
	 * @param ctx the parse tree
	 */
	exitFpParamList?: (ctx: FpParamListContext) => void;
	/**
	 * Enter a parse tree produced by `FmlMappingParser.fpTypeSpecifier`.
	 * @param ctx the parse tree
	 */
	enterFpTypeSpecifier?: (ctx: FpTypeSpecifierContext) => void;
	/**
	 * Exit a parse tree produced by `FmlMappingParser.fpTypeSpecifier`.
	 * @param ctx the parse tree
	 */
	exitFpTypeSpecifier?: (ctx: FpTypeSpecifierContext) => void;
	/**
	 * Enter a parse tree produced by `FmlMappingParser.constant`.
	 * @param ctx the parse tree
	 */
	enterConstant?: (ctx: ConstantContext) => void;
	/**
	 * Exit a parse tree produced by `FmlMappingParser.constant`.
	 * @param ctx the parse tree
	 */
	exitConstant?: (ctx: ConstantContext) => void;
	/**
	 * Enter a parse tree produced by the `nullLiteral`
	 * labeled alternative in `FmlMappingParser.literal`.
	 * @param ctx the parse tree
	 */
	enterNullLiteral?: (ctx: NullLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `nullLiteral`
	 * labeled alternative in `FmlMappingParser.literal`.
	 * @param ctx the parse tree
	 */
	exitNullLiteral?: (ctx: NullLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `booleanLiteral`
	 * labeled alternative in `FmlMappingParser.literal`.
	 * @param ctx the parse tree
	 */
	enterBooleanLiteral?: (ctx: BooleanLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `booleanLiteral`
	 * labeled alternative in `FmlMappingParser.literal`.
	 * @param ctx the parse tree
	 */
	exitBooleanLiteral?: (ctx: BooleanLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `quantityLiteral`
	 * labeled alternative in `FmlMappingParser.literal`.
	 * @param ctx the parse tree
	 */
	enterQuantityLiteral?: (ctx: QuantityLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `quantityLiteral`
	 * labeled alternative in `FmlMappingParser.literal`.
	 * @param ctx the parse tree
	 */
	exitQuantityLiteral?: (ctx: QuantityLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `longNumberLiteral`
	 * labeled alternative in `FmlMappingParser.literal`.
	 * @param ctx the parse tree
	 */
	enterLongNumberLiteral?: (ctx: LongNumberLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `longNumberLiteral`
	 * labeled alternative in `FmlMappingParser.literal`.
	 * @param ctx the parse tree
	 */
	exitLongNumberLiteral?: (ctx: LongNumberLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `numberLiteral`
	 * labeled alternative in `FmlMappingParser.literal`.
	 * @param ctx the parse tree
	 */
	enterNumberLiteral?: (ctx: NumberLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `numberLiteral`
	 * labeled alternative in `FmlMappingParser.literal`.
	 * @param ctx the parse tree
	 */
	exitNumberLiteral?: (ctx: NumberLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `dateLiteral`
	 * labeled alternative in `FmlMappingParser.literal`.
	 * @param ctx the parse tree
	 */
	enterDateLiteral?: (ctx: DateLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `dateLiteral`
	 * labeled alternative in `FmlMappingParser.literal`.
	 * @param ctx the parse tree
	 */
	exitDateLiteral?: (ctx: DateLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `dateTimeLiteral`
	 * labeled alternative in `FmlMappingParser.literal`.
	 * @param ctx the parse tree
	 */
	enterDateTimeLiteral?: (ctx: DateTimeLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `dateTimeLiteral`
	 * labeled alternative in `FmlMappingParser.literal`.
	 * @param ctx the parse tree
	 */
	exitDateTimeLiteral?: (ctx: DateTimeLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `timeLiteral`
	 * labeled alternative in `FmlMappingParser.literal`.
	 * @param ctx the parse tree
	 */
	enterTimeLiteral?: (ctx: TimeLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `timeLiteral`
	 * labeled alternative in `FmlMappingParser.literal`.
	 * @param ctx the parse tree
	 */
	exitTimeLiteral?: (ctx: TimeLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `stringLiteral`
	 * labeled alternative in `FmlMappingParser.literal`.
	 * @param ctx the parse tree
	 */
	enterStringLiteral?: (ctx: StringLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `stringLiteral`
	 * labeled alternative in `FmlMappingParser.literal`.
	 * @param ctx the parse tree
	 */
	exitStringLiteral?: (ctx: StringLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `quotedStringLiteral`
	 * labeled alternative in `FmlMappingParser.literal`.
	 * @param ctx the parse tree
	 */
	enterQuotedStringLiteral?: (ctx: QuotedStringLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `quotedStringLiteral`
	 * labeled alternative in `FmlMappingParser.literal`.
	 * @param ctx the parse tree
	 */
	exitQuotedStringLiteral?: (ctx: QuotedStringLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `quantityWithDate`
	 * labeled alternative in `FmlMappingParser.fpQuantity`.
	 * @param ctx the parse tree
	 */
	enterQuantityWithDate?: (ctx: QuantityWithDateContext) => void;
	/**
	 * Exit a parse tree produced by the `quantityWithDate`
	 * labeled alternative in `FmlMappingParser.fpQuantity`.
	 * @param ctx the parse tree
	 */
	exitQuantityWithDate?: (ctx: QuantityWithDateContext) => void;
	/**
	 * Enter a parse tree produced by the `quantityWithDatePlural`
	 * labeled alternative in `FmlMappingParser.fpQuantity`.
	 * @param ctx the parse tree
	 */
	enterQuantityWithDatePlural?: (ctx: QuantityWithDatePluralContext) => void;
	/**
	 * Exit a parse tree produced by the `quantityWithDatePlural`
	 * labeled alternative in `FmlMappingParser.fpQuantity`.
	 * @param ctx the parse tree
	 */
	exitQuantityWithDatePlural?: (ctx: QuantityWithDatePluralContext) => void;
	/**
	 * Enter a parse tree produced by the `quantityWithUcum`
	 * labeled alternative in `FmlMappingParser.fpQuantity`.
	 * @param ctx the parse tree
	 */
	enterQuantityWithUcum?: (ctx: QuantityWithUcumContext) => void;
	/**
	 * Exit a parse tree produced by the `quantityWithUcum`
	 * labeled alternative in `FmlMappingParser.fpQuantity`.
	 * @param ctx the parse tree
	 */
	exitQuantityWithUcum?: (ctx: QuantityWithUcumContext) => void;
}

