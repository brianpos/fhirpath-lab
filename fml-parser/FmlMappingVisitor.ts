// Generated from FmlMapping.g4 by ANTLR 4.13.2

import {ParseTreeVisitor} from 'antlr4';


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
 * This interface defines a complete generic visitor for a parse tree produced
 * by `FmlMappingParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export default class FmlMappingVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `FmlMappingParser.structureMap`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStructureMap?: (ctx: StructureMapContext) => Result;
	/**
	 * Visit a parse tree produced by `FmlMappingParser.conceptMapDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConceptMapDeclaration?: (ctx: ConceptMapDeclarationContext) => Result;
	/**
	 * Visit a parse tree produced by `FmlMappingParser.conceptMapPrefix`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConceptMapPrefix?: (ctx: ConceptMapPrefixContext) => Result;
	/**
	 * Visit a parse tree produced by `FmlMappingParser.conceptMapCodeMap`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConceptMapCodeMap?: (ctx: ConceptMapCodeMapContext) => Result;
	/**
	 * Visit a parse tree produced by `FmlMappingParser.conceptMapSource`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConceptMapSource?: (ctx: ConceptMapSourceContext) => Result;
	/**
	 * Visit a parse tree produced by `FmlMappingParser.conceptMapTarget`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConceptMapTarget?: (ctx: ConceptMapTargetContext) => Result;
	/**
	 * Visit a parse tree produced by `FmlMappingParser.code`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCode?: (ctx: CodeContext) => Result;
	/**
	 * Visit a parse tree produced by `FmlMappingParser.mapDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMapDeclaration?: (ctx: MapDeclarationContext) => Result;
	/**
	 * Visit a parse tree produced by `FmlMappingParser.metadataDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMetadataDeclaration?: (ctx: MetadataDeclarationContext) => Result;
	/**
	 * Visit a parse tree produced by `FmlMappingParser.markdownLiteral`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMarkdownLiteral?: (ctx: MarkdownLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by `FmlMappingParser.url`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUrl?: (ctx: UrlContext) => Result;
	/**
	 * Visit a parse tree produced by `FmlMappingParser.identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIdentifier?: (ctx: IdentifierContext) => Result;
	/**
	 * Visit a parse tree produced by `FmlMappingParser.structureDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStructureDeclaration?: (ctx: StructureDeclarationContext) => Result;
	/**
	 * Visit a parse tree produced by `FmlMappingParser.constantDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConstantDeclaration?: (ctx: ConstantDeclarationContext) => Result;
	/**
	 * Visit a parse tree produced by `FmlMappingParser.groupDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGroupDeclaration?: (ctx: GroupDeclarationContext) => Result;
	/**
	 * Visit a parse tree produced by `FmlMappingParser.parameters`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParameters?: (ctx: ParametersContext) => Result;
	/**
	 * Visit a parse tree produced by `FmlMappingParser.parameter`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParameter?: (ctx: ParameterContext) => Result;
	/**
	 * Visit a parse tree produced by `FmlMappingParser.mapRules`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMapRules?: (ctx: MapRulesContext) => Result;
	/**
	 * Visit a parse tree produced by `FmlMappingParser.typeMode`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTypeMode?: (ctx: TypeModeContext) => Result;
	/**
	 * Visit a parse tree produced by `FmlMappingParser.extends`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExtends?: (ctx: ExtendsContext) => Result;
	/**
	 * Visit a parse tree produced by `FmlMappingParser.typeIdentifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTypeIdentifier?: (ctx: TypeIdentifierContext) => Result;
	/**
	 * Visit a parse tree produced by the `mapSimpleCopy`
	 * labeled alternative in `FmlMappingParser.mapRule`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMapSimpleCopy?: (ctx: MapSimpleCopyContext) => Result;
	/**
	 * Visit a parse tree produced by the `mapFhirMarkup`
	 * labeled alternative in `FmlMappingParser.mapRule`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMapFhirMarkup?: (ctx: MapFhirMarkupContext) => Result;
	/**
	 * Visit a parse tree produced by `FmlMappingParser.mapTransformationRule`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMapTransformationRule?: (ctx: MapTransformationRuleContext) => Result;
	/**
	 * Visit a parse tree produced by `FmlMappingParser.ruleName`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRuleName?: (ctx: RuleNameContext) => Result;
	/**
	 * Visit a parse tree produced by `FmlMappingParser.ruleSource`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRuleSource?: (ctx: RuleSourceContext) => Result;
	/**
	 * Visit a parse tree produced by `FmlMappingParser.ruleTarget`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRuleTarget?: (ctx: RuleTargetContext) => Result;
	/**
	 * Visit a parse tree produced by `FmlMappingParser.sourceCardinality`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSourceCardinality?: (ctx: SourceCardinalityContext) => Result;
	/**
	 * Visit a parse tree produced by `FmlMappingParser.upperBound`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUpperBound?: (ctx: UpperBoundContext) => Result;
	/**
	 * Visit a parse tree produced by `FmlMappingParser.qualifiedIdentifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQualifiedIdentifier?: (ctx: QualifiedIdentifierContext) => Result;
	/**
	 * Visit a parse tree produced by `FmlMappingParser.sourceDefault`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSourceDefault?: (ctx: SourceDefaultContext) => Result;
	/**
	 * Visit a parse tree produced by `FmlMappingParser.alias`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlias?: (ctx: AliasContext) => Result;
	/**
	 * Visit a parse tree produced by `FmlMappingParser.whereClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWhereClause?: (ctx: WhereClauseContext) => Result;
	/**
	 * Visit a parse tree produced by `FmlMappingParser.checkClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCheckClause?: (ctx: CheckClauseContext) => Result;
	/**
	 * Visit a parse tree produced by `FmlMappingParser.log`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLog?: (ctx: LogContext) => Result;
	/**
	 * Visit a parse tree produced by `FmlMappingParser.dependentExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDependentExpression?: (ctx: DependentExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by `FmlMappingParser.importDeclaration`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitImportDeclaration?: (ctx: ImportDeclarationContext) => Result;
	/**
	 * Visit a parse tree produced by `FmlMappingParser.mapLineTarget`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMapLineTarget?: (ctx: MapLineTargetContext) => Result;
	/**
	 * Visit a parse tree produced by `FmlMappingParser.transform`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTransform?: (ctx: TransformContext) => Result;
	/**
	 * Visit a parse tree produced by `FmlMappingParser.groupInvocation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGroupInvocation?: (ctx: GroupInvocationContext) => Result;
	/**
	 * Visit a parse tree produced by `FmlMappingParser.groupParamList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGroupParamList?: (ctx: GroupParamListContext) => Result;
	/**
	 * Visit a parse tree produced by `FmlMappingParser.groupParam`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGroupParam?: (ctx: GroupParamContext) => Result;
	/**
	 * Visit a parse tree produced by the `indexerExpression`
	 * labeled alternative in `FmlMappingParser.fpExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIndexerExpression?: (ctx: IndexerExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `polarityExpression`
	 * labeled alternative in `FmlMappingParser.fpExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPolarityExpression?: (ctx: PolarityExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `additiveExpression`
	 * labeled alternative in `FmlMappingParser.fpExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAdditiveExpression?: (ctx: AdditiveExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `multiplicativeExpression`
	 * labeled alternative in `FmlMappingParser.fpExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMultiplicativeExpression?: (ctx: MultiplicativeExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `unionExpression`
	 * labeled alternative in `FmlMappingParser.fpExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnionExpression?: (ctx: UnionExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `orExpression`
	 * labeled alternative in `FmlMappingParser.fpExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOrExpression?: (ctx: OrExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `andExpression`
	 * labeled alternative in `FmlMappingParser.fpExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAndExpression?: (ctx: AndExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `membershipExpression`
	 * labeled alternative in `FmlMappingParser.fpExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMembershipExpression?: (ctx: MembershipExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `inequalityExpression`
	 * labeled alternative in `FmlMappingParser.fpExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInequalityExpression?: (ctx: InequalityExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `invocationExpression`
	 * labeled alternative in `FmlMappingParser.fpExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInvocationExpression?: (ctx: InvocationExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `equalityExpression`
	 * labeled alternative in `FmlMappingParser.fpExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEqualityExpression?: (ctx: EqualityExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `impliesExpression`
	 * labeled alternative in `FmlMappingParser.fpExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitImpliesExpression?: (ctx: ImpliesExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `termExpression`
	 * labeled alternative in `FmlMappingParser.fpExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTermExpression?: (ctx: TermExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `typeExpression`
	 * labeled alternative in `FmlMappingParser.fpExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTypeExpression?: (ctx: TypeExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `invocationTerm`
	 * labeled alternative in `FmlMappingParser.fpTerm`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInvocationTerm?: (ctx: InvocationTermContext) => Result;
	/**
	 * Visit a parse tree produced by the `literalTerm`
	 * labeled alternative in `FmlMappingParser.fpTerm`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLiteralTerm?: (ctx: LiteralTermContext) => Result;
	/**
	 * Visit a parse tree produced by the `externalConstantTerm`
	 * labeled alternative in `FmlMappingParser.fpTerm`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExternalConstantTerm?: (ctx: ExternalConstantTermContext) => Result;
	/**
	 * Visit a parse tree produced by the `parenthesizedTerm`
	 * labeled alternative in `FmlMappingParser.fpTerm`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParenthesizedTerm?: (ctx: ParenthesizedTermContext) => Result;
	/**
	 * Visit a parse tree produced by the `functionInvocation`
	 * labeled alternative in `FmlMappingParser.fpInvocation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunctionInvocation?: (ctx: FunctionInvocationContext) => Result;
	/**
	 * Visit a parse tree produced by the `memberInvocation`
	 * labeled alternative in `FmlMappingParser.fpInvocation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMemberInvocation?: (ctx: MemberInvocationContext) => Result;
	/**
	 * Visit a parse tree produced by the `thisInvocation`
	 * labeled alternative in `FmlMappingParser.fpInvocation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitThisInvocation?: (ctx: ThisInvocationContext) => Result;
	/**
	 * Visit a parse tree produced by the `indexInvocation`
	 * labeled alternative in `FmlMappingParser.fpInvocation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIndexInvocation?: (ctx: IndexInvocationContext) => Result;
	/**
	 * Visit a parse tree produced by the `totalInvocation`
	 * labeled alternative in `FmlMappingParser.fpInvocation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTotalInvocation?: (ctx: TotalInvocationContext) => Result;
	/**
	 * Visit a parse tree produced by `FmlMappingParser.fpExternalConstant`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFpExternalConstant?: (ctx: FpExternalConstantContext) => Result;
	/**
	 * Visit a parse tree produced by `FmlMappingParser.fpFunction`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFpFunction?: (ctx: FpFunctionContext) => Result;
	/**
	 * Visit a parse tree produced by the `sortDirectionArgument`
	 * labeled alternative in `FmlMappingParser.fpSortArgument`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSortDirectionArgument?: (ctx: SortDirectionArgumentContext) => Result;
	/**
	 * Visit a parse tree produced by `FmlMappingParser.fpParamList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFpParamList?: (ctx: FpParamListContext) => Result;
	/**
	 * Visit a parse tree produced by `FmlMappingParser.fpTypeSpecifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFpTypeSpecifier?: (ctx: FpTypeSpecifierContext) => Result;
	/**
	 * Visit a parse tree produced by `FmlMappingParser.constant`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConstant?: (ctx: ConstantContext) => Result;
	/**
	 * Visit a parse tree produced by the `nullLiteral`
	 * labeled alternative in `FmlMappingParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNullLiteral?: (ctx: NullLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `booleanLiteral`
	 * labeled alternative in `FmlMappingParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBooleanLiteral?: (ctx: BooleanLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `quantityLiteral`
	 * labeled alternative in `FmlMappingParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQuantityLiteral?: (ctx: QuantityLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `longNumberLiteral`
	 * labeled alternative in `FmlMappingParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLongNumberLiteral?: (ctx: LongNumberLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `numberLiteral`
	 * labeled alternative in `FmlMappingParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumberLiteral?: (ctx: NumberLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `dateLiteral`
	 * labeled alternative in `FmlMappingParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDateLiteral?: (ctx: DateLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `dateTimeLiteral`
	 * labeled alternative in `FmlMappingParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDateTimeLiteral?: (ctx: DateTimeLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `timeLiteral`
	 * labeled alternative in `FmlMappingParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTimeLiteral?: (ctx: TimeLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `stringLiteral`
	 * labeled alternative in `FmlMappingParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStringLiteral?: (ctx: StringLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `quotedStringLiteral`
	 * labeled alternative in `FmlMappingParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQuotedStringLiteral?: (ctx: QuotedStringLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `quantityWithDate`
	 * labeled alternative in `FmlMappingParser.fpQuantity`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQuantityWithDate?: (ctx: QuantityWithDateContext) => Result;
	/**
	 * Visit a parse tree produced by the `quantityWithDatePlural`
	 * labeled alternative in `FmlMappingParser.fpQuantity`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQuantityWithDatePlural?: (ctx: QuantityWithDatePluralContext) => Result;
	/**
	 * Visit a parse tree produced by the `quantityWithUcum`
	 * labeled alternative in `FmlMappingParser.fpQuantity`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQuantityWithUcum?: (ctx: QuantityWithUcumContext) => Result;
}

