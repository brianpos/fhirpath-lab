// Generated from FmlMapping.g4 by ANTLR 4.13.1

import {ParseTreeVisitor} from 'antlr4';


import { StructureMapContext } from "./FmlMappingParser";
import { ConceptMapDeclarationContext } from "./FmlMappingParser";
import { ConceptMapPrefixContext } from "./FmlMappingParser";
import { ConceptMapCodeMapContext } from "./FmlMappingParser";
import { ConceptMapSourceContext } from "./FmlMappingParser";
import { ConceptMapTargetContext } from "./FmlMappingParser";
import { CodeContext } from "./FmlMappingParser";
import { MapDeclarationContext } from "./FmlMappingParser";
import { MetadataDeclarationContext } from "./FmlMappingParser";
import { MarkdownLiteralContext } from "./FmlMappingParser";
import { UrlContext } from "./FmlMappingParser";
import { IdentifierContext } from "./FmlMappingParser";
import { StructureDeclarationContext } from "./FmlMappingParser";
import { ConstantDeclarationContext } from "./FmlMappingParser";
import { GroupDeclarationContext } from "./FmlMappingParser";
import { ParametersContext } from "./FmlMappingParser";
import { ParameterContext } from "./FmlMappingParser";
import { GroupExpressionsContext } from "./FmlMappingParser";
import { TypeModeContext } from "./FmlMappingParser";
import { ExtendsContext } from "./FmlMappingParser";
import { TypeIdentifierContext } from "./FmlMappingParser";
import { MapSimpleCopyContext } from "./FmlMappingParser";
import { MapFhirMarkupContext } from "./FmlMappingParser";
import { MapExpressionContext } from "./FmlMappingParser";
import { MapExpressionNameContext } from "./FmlMappingParser";
import { MapExpressionSourceContext } from "./FmlMappingParser";
import { MapExpressionTargetContext } from "./FmlMappingParser";
import { SourceCardinalityContext } from "./FmlMappingParser";
import { UpperBoundContext } from "./FmlMappingParser";
import { QualifiedIdentifierContext } from "./FmlMappingParser";
import { SourceDefaultContext } from "./FmlMappingParser";
import { AliasContext } from "./FmlMappingParser";
import { WhereClauseContext } from "./FmlMappingParser";
import { CheckClauseContext } from "./FmlMappingParser";
import { LogContext } from "./FmlMappingParser";
import { DependentExpressionContext } from "./FmlMappingParser";
import { ImportDeclarationContext } from "./FmlMappingParser";
import { MapLineTargetContext } from "./FmlMappingParser";
import { TransformContext } from "./FmlMappingParser";
import { InvocationContext } from "./FmlMappingParser";
import { ParamListContext } from "./FmlMappingParser";
import { ParamContext } from "./FmlMappingParser";
import { IndexerExpressionContext } from "./FmlMappingParser";
import { PolarityExpressionContext } from "./FmlMappingParser";
import { AdditiveExpressionContext } from "./FmlMappingParser";
import { MultiplicativeExpressionContext } from "./FmlMappingParser";
import { UnionExpressionContext } from "./FmlMappingParser";
import { OrExpressionContext } from "./FmlMappingParser";
import { AndExpressionContext } from "./FmlMappingParser";
import { MembershipExpressionContext } from "./FmlMappingParser";
import { InequalityExpressionContext } from "./FmlMappingParser";
import { InvocationExpressionContext } from "./FmlMappingParser";
import { EqualityExpressionContext } from "./FmlMappingParser";
import { ImpliesExpressionContext } from "./FmlMappingParser";
import { TermExpressionContext } from "./FmlMappingParser";
import { TypeExpressionContext } from "./FmlMappingParser";
import { InvocationTermContext } from "./FmlMappingParser";
import { LiteralTermContext } from "./FmlMappingParser";
import { ExternalConstantTermContext } from "./FmlMappingParser";
import { ParenthesizedTermContext } from "./FmlMappingParser";
import { FunctionInvocationContext } from "./FmlMappingParser";
import { MemberInvocationContext } from "./FmlMappingParser";
import { ThisInvocationContext } from "./FmlMappingParser";
import { IndexInvocationContext } from "./FmlMappingParser";
import { TotalInvocationContext } from "./FmlMappingParser";
import { FpExternalConstantContext } from "./FmlMappingParser";
import { FpFunctionContext } from "./FmlMappingParser";
import { FpParamListContext } from "./FmlMappingParser";
import { FpTypeSpecifierContext } from "./FmlMappingParser";
import { ConstantContext } from "./FmlMappingParser";
import { NullLiteralContext } from "./FmlMappingParser";
import { BooleanLiteralContext } from "./FmlMappingParser";
import { QuantityLiteralContext } from "./FmlMappingParser";
import { LongNumberLiteralContext } from "./FmlMappingParser";
import { NumberLiteralContext } from "./FmlMappingParser";
import { DateLiteralContext } from "./FmlMappingParser";
import { DateTimeLiteralContext } from "./FmlMappingParser";
import { TimeLiteralContext } from "./FmlMappingParser";
import { StringLiteralContext } from "./FmlMappingParser";
import { QuotedStringLiteralContext } from "./FmlMappingParser";
import { QuantityWithDateContext } from "./FmlMappingParser";
import { QuantityWithDatePluralContext } from "./FmlMappingParser";
import { QuantityWithUcumContext } from "./FmlMappingParser";


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
	 * Visit a parse tree produced by `FmlMappingParser.groupExpressions`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGroupExpressions?: (ctx: GroupExpressionsContext) => Result;
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
	 * labeled alternative in `FmlMappingParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMapSimpleCopy?: (ctx: MapSimpleCopyContext) => Result;
	/**
	 * Visit a parse tree produced by the `mapFhirMarkup`
	 * labeled alternative in `FmlMappingParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMapFhirMarkup?: (ctx: MapFhirMarkupContext) => Result;
	/**
	 * Visit a parse tree produced by `FmlMappingParser.mapExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMapExpression?: (ctx: MapExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by `FmlMappingParser.mapExpressionName`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMapExpressionName?: (ctx: MapExpressionNameContext) => Result;
	/**
	 * Visit a parse tree produced by `FmlMappingParser.mapExpressionSource`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMapExpressionSource?: (ctx: MapExpressionSourceContext) => Result;
	/**
	 * Visit a parse tree produced by `FmlMappingParser.mapExpressionTarget`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMapExpressionTarget?: (ctx: MapExpressionTargetContext) => Result;
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
	 * Visit a parse tree produced by `FmlMappingParser.invocation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInvocation?: (ctx: InvocationContext) => Result;
	/**
	 * Visit a parse tree produced by `FmlMappingParser.paramList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParamList?: (ctx: ParamListContext) => Result;
	/**
	 * Visit a parse tree produced by `FmlMappingParser.param`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParam?: (ctx: ParamContext) => Result;
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

