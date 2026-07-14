// Generated from fhirliquid.g4 by ANTLR 4.13.2

import {ParseTreeVisitor} from 'antlr4';


import { LiquidDocumentContext } from "./fhirliquidParser.js";
import { TextItemContext } from "./fhirliquidParser.js";
import { OutputItemContext } from "./fhirliquidParser.js";
import { IfItemContext } from "./fhirliquidParser.js";
import { ForItemContext } from "./fhirliquidParser.js";
import { LegacyLoopItemContext } from "./fhirliquidParser.js";
import { CaptureItemContext } from "./fhirliquidParser.js";
import { IncludeItemContext } from "./fhirliquidParser.js";
import { AssignItemContext } from "./fhirliquidParser.js";
import { LoopTextItemContext } from "./fhirliquidParser.js";
import { LoopOutputItemContext } from "./fhirliquidParser.js";
import { LoopIfItemContext } from "./fhirliquidParser.js";
import { NestedForItemContext } from "./fhirliquidParser.js";
import { NestedLegacyLoopItemContext } from "./fhirliquidParser.js";
import { LoopCaptureItemContext } from "./fhirliquidParser.js";
import { LoopIncludeItemContext } from "./fhirliquidParser.js";
import { LoopAssignItemContext } from "./fhirliquidParser.js";
import { BreakItemContext } from "./fhirliquidParser.js";
import { ContinueItemContext } from "./fhirliquidParser.js";
import { CycleItemContext } from "./fhirliquidParser.js";
import { OutputStatementContext } from "./fhirliquidParser.js";
import { FilterContext } from "./fhirliquidParser.js";
import { FilterNameContext } from "./fhirliquidParser.js";
import { IfStatementContext } from "./fhirliquidParser.js";
import { LoopIfStatementContext } from "./fhirliquidParser.js";
import { ForStatementContext } from "./fhirliquidParser.js";
import { LegacyLoopStatementContext } from "./fhirliquidParser.js";
import { ForModifierContext } from "./fhirliquidParser.js";
import { CaptureStatementContext } from "./fhirliquidParser.js";
import { IncludeStatementContext } from "./fhirliquidParser.js";
import { IncludeNameContext } from "./fhirliquidParser.js";
import { IncludeParameterContext } from "./fhirliquidParser.js";
import { AssignStatementContext } from "./fhirliquidParser.js";
import { BreakStatementContext } from "./fhirliquidParser.js";
import { ContinueStatementContext } from "./fhirliquidParser.js";
import { CycleStatementContext } from "./fhirliquidParser.js";
import { VariableNameContext } from "./fhirliquidParser.js";
import { NullLiteralContext } from "./fhirliquidParser.js";
import { BooleanLiteralContext } from "./fhirliquidParser.js";
import { StringLiteralContext } from "./fhirliquidParser.js";
import { NumberLiteralContext } from "./fhirliquidParser.js";
import { LongNumberLiteralContext } from "./fhirliquidParser.js";
import { DateLiteralContext } from "./fhirliquidParser.js";
import { DateTimeLiteralContext } from "./fhirliquidParser.js";
import { TimeLiteralContext } from "./fhirliquidParser.js";
import { QuantityLiteralContext } from "./fhirliquidParser.js";
import { ExternalConstantContext } from "./fhirliquidParser.js";
import { IdentifierContext } from "./fhirliquidParser.js";
import { EntireExpressionContext } from "./fhirliquidParser.js";
import { IndexerExpressionContext } from "./fhirliquidParser.js";
import { PolarityExpressionContext } from "./fhirliquidParser.js";
import { AdditiveExpressionContext } from "./fhirliquidParser.js";
import { MultiplicativeExpressionContext } from "./fhirliquidParser.js";
import { UnionExpressionContext } from "./fhirliquidParser.js";
import { OrExpressionContext } from "./fhirliquidParser.js";
import { AndExpressionContext } from "./fhirliquidParser.js";
import { MembershipExpressionContext } from "./fhirliquidParser.js";
import { InequalityExpressionContext } from "./fhirliquidParser.js";
import { InvocationExpressionContext } from "./fhirliquidParser.js";
import { EqualityExpressionContext } from "./fhirliquidParser.js";
import { ImpliesExpressionContext } from "./fhirliquidParser.js";
import { TermExpressionContext } from "./fhirliquidParser.js";
import { TypeExpressionContext } from "./fhirliquidParser.js";
import { InvocationTermContext } from "./fhirliquidParser.js";
import { LiteralTermContext } from "./fhirliquidParser.js";
import { ExternalConstantTermContext } from "./fhirliquidParser.js";
import { ParenthesizedTermContext } from "./fhirliquidParser.js";
import { InstanceSelectorTermContext } from "./fhirliquidParser.js";
import { MemberInvocationContext } from "./fhirliquidParser.js";
import { FunctionInvocationContext } from "./fhirliquidParser.js";
import { ThisInvocationContext } from "./fhirliquidParser.js";
import { IndexInvocationContext } from "./fhirliquidParser.js";
import { TotalInvocationContext } from "./fhirliquidParser.js";
import { FunctionContext } from "./fhirliquidParser.js";
import { SortDirectionArgumentContext } from "./fhirliquidParser.js";
import { ParamListContext } from "./fhirliquidParser.js";
import { InstanceSelectorContext } from "./fhirliquidParser.js";
import { InstanceElementSelectorContext } from "./fhirliquidParser.js";
import { QuantityContext } from "./fhirliquidParser.js";
import { UnitContext } from "./fhirliquidParser.js";
import { DateTimePrecisionContext } from "./fhirliquidParser.js";
import { PluralDateTimePrecisionContext } from "./fhirliquidParser.js";
import { TypeSpecifierContext } from "./fhirliquidParser.js";
import { QualifiedIdentifierContext } from "./fhirliquidParser.js";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `fhirliquidParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export default class fhirliquidVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `fhirliquidParser.liquidDocument`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLiquidDocument?: (ctx: LiquidDocumentContext) => Result;
	/**
	 * Visit a parse tree produced by the `textItem`
	 * labeled alternative in `fhirliquidParser.templateItem`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTextItem?: (ctx: TextItemContext) => Result;
	/**
	 * Visit a parse tree produced by the `outputItem`
	 * labeled alternative in `fhirliquidParser.templateItem`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOutputItem?: (ctx: OutputItemContext) => Result;
	/**
	 * Visit a parse tree produced by the `ifItem`
	 * labeled alternative in `fhirliquidParser.templateItem`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIfItem?: (ctx: IfItemContext) => Result;
	/**
	 * Visit a parse tree produced by the `forItem`
	 * labeled alternative in `fhirliquidParser.templateItem`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitForItem?: (ctx: ForItemContext) => Result;
	/**
	 * Visit a parse tree produced by the `legacyLoopItem`
	 * labeled alternative in `fhirliquidParser.templateItem`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLegacyLoopItem?: (ctx: LegacyLoopItemContext) => Result;
	/**
	 * Visit a parse tree produced by the `captureItem`
	 * labeled alternative in `fhirliquidParser.templateItem`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCaptureItem?: (ctx: CaptureItemContext) => Result;
	/**
	 * Visit a parse tree produced by the `includeItem`
	 * labeled alternative in `fhirliquidParser.templateItem`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIncludeItem?: (ctx: IncludeItemContext) => Result;
	/**
	 * Visit a parse tree produced by the `assignItem`
	 * labeled alternative in `fhirliquidParser.templateItem`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssignItem?: (ctx: AssignItemContext) => Result;
	/**
	 * Visit a parse tree produced by the `loopTextItem`
	 * labeled alternative in `fhirliquidParser.loopItem`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLoopTextItem?: (ctx: LoopTextItemContext) => Result;
	/**
	 * Visit a parse tree produced by the `loopOutputItem`
	 * labeled alternative in `fhirliquidParser.loopItem`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLoopOutputItem?: (ctx: LoopOutputItemContext) => Result;
	/**
	 * Visit a parse tree produced by the `loopIfItem`
	 * labeled alternative in `fhirliquidParser.loopItem`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLoopIfItem?: (ctx: LoopIfItemContext) => Result;
	/**
	 * Visit a parse tree produced by the `nestedForItem`
	 * labeled alternative in `fhirliquidParser.loopItem`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNestedForItem?: (ctx: NestedForItemContext) => Result;
	/**
	 * Visit a parse tree produced by the `nestedLegacyLoopItem`
	 * labeled alternative in `fhirliquidParser.loopItem`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNestedLegacyLoopItem?: (ctx: NestedLegacyLoopItemContext) => Result;
	/**
	 * Visit a parse tree produced by the `loopCaptureItem`
	 * labeled alternative in `fhirliquidParser.loopItem`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLoopCaptureItem?: (ctx: LoopCaptureItemContext) => Result;
	/**
	 * Visit a parse tree produced by the `loopIncludeItem`
	 * labeled alternative in `fhirliquidParser.loopItem`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLoopIncludeItem?: (ctx: LoopIncludeItemContext) => Result;
	/**
	 * Visit a parse tree produced by the `loopAssignItem`
	 * labeled alternative in `fhirliquidParser.loopItem`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLoopAssignItem?: (ctx: LoopAssignItemContext) => Result;
	/**
	 * Visit a parse tree produced by the `breakItem`
	 * labeled alternative in `fhirliquidParser.loopItem`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBreakItem?: (ctx: BreakItemContext) => Result;
	/**
	 * Visit a parse tree produced by the `continueItem`
	 * labeled alternative in `fhirliquidParser.loopItem`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitContinueItem?: (ctx: ContinueItemContext) => Result;
	/**
	 * Visit a parse tree produced by the `cycleItem`
	 * labeled alternative in `fhirliquidParser.loopItem`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCycleItem?: (ctx: CycleItemContext) => Result;
	/**
	 * Visit a parse tree produced by `fhirliquidParser.outputStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOutputStatement?: (ctx: OutputStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `fhirliquidParser.filter`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFilter?: (ctx: FilterContext) => Result;
	/**
	 * Visit a parse tree produced by `fhirliquidParser.filterName`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFilterName?: (ctx: FilterNameContext) => Result;
	/**
	 * Visit a parse tree produced by `fhirliquidParser.ifStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIfStatement?: (ctx: IfStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `fhirliquidParser.loopIfStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLoopIfStatement?: (ctx: LoopIfStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `fhirliquidParser.forStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitForStatement?: (ctx: ForStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `fhirliquidParser.legacyLoopStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLegacyLoopStatement?: (ctx: LegacyLoopStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `fhirliquidParser.forModifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitForModifier?: (ctx: ForModifierContext) => Result;
	/**
	 * Visit a parse tree produced by `fhirliquidParser.captureStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCaptureStatement?: (ctx: CaptureStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `fhirliquidParser.includeStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIncludeStatement?: (ctx: IncludeStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `fhirliquidParser.includeName`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIncludeName?: (ctx: IncludeNameContext) => Result;
	/**
	 * Visit a parse tree produced by `fhirliquidParser.includeParameter`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIncludeParameter?: (ctx: IncludeParameterContext) => Result;
	/**
	 * Visit a parse tree produced by `fhirliquidParser.assignStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssignStatement?: (ctx: AssignStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `fhirliquidParser.breakStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBreakStatement?: (ctx: BreakStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `fhirliquidParser.continueStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitContinueStatement?: (ctx: ContinueStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `fhirliquidParser.cycleStatement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCycleStatement?: (ctx: CycleStatementContext) => Result;
	/**
	 * Visit a parse tree produced by `fhirliquidParser.variableName`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVariableName?: (ctx: VariableNameContext) => Result;
	/**
	 * Visit a parse tree produced by the `nullLiteral`
	 * labeled alternative in `fhirliquidParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNullLiteral?: (ctx: NullLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `booleanLiteral`
	 * labeled alternative in `fhirliquidParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBooleanLiteral?: (ctx: BooleanLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `stringLiteral`
	 * labeled alternative in `fhirliquidParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStringLiteral?: (ctx: StringLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `numberLiteral`
	 * labeled alternative in `fhirliquidParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumberLiteral?: (ctx: NumberLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `longNumberLiteral`
	 * labeled alternative in `fhirliquidParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLongNumberLiteral?: (ctx: LongNumberLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `dateLiteral`
	 * labeled alternative in `fhirliquidParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDateLiteral?: (ctx: DateLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `dateTimeLiteral`
	 * labeled alternative in `fhirliquidParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDateTimeLiteral?: (ctx: DateTimeLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `timeLiteral`
	 * labeled alternative in `fhirliquidParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTimeLiteral?: (ctx: TimeLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `quantityLiteral`
	 * labeled alternative in `fhirliquidParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQuantityLiteral?: (ctx: QuantityLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by `fhirliquidParser.externalConstant`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExternalConstant?: (ctx: ExternalConstantContext) => Result;
	/**
	 * Visit a parse tree produced by `fhirliquidParser.identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIdentifier?: (ctx: IdentifierContext) => Result;
	/**
	 * Visit a parse tree produced by `fhirliquidParser.entireExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEntireExpression?: (ctx: EntireExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `indexerExpression`
	 * labeled alternative in `fhirliquidParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIndexerExpression?: (ctx: IndexerExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `polarityExpression`
	 * labeled alternative in `fhirliquidParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPolarityExpression?: (ctx: PolarityExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `additiveExpression`
	 * labeled alternative in `fhirliquidParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAdditiveExpression?: (ctx: AdditiveExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `multiplicativeExpression`
	 * labeled alternative in `fhirliquidParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMultiplicativeExpression?: (ctx: MultiplicativeExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `unionExpression`
	 * labeled alternative in `fhirliquidParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnionExpression?: (ctx: UnionExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `orExpression`
	 * labeled alternative in `fhirliquidParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOrExpression?: (ctx: OrExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `andExpression`
	 * labeled alternative in `fhirliquidParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAndExpression?: (ctx: AndExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `membershipExpression`
	 * labeled alternative in `fhirliquidParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMembershipExpression?: (ctx: MembershipExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `inequalityExpression`
	 * labeled alternative in `fhirliquidParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInequalityExpression?: (ctx: InequalityExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `invocationExpression`
	 * labeled alternative in `fhirliquidParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInvocationExpression?: (ctx: InvocationExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `equalityExpression`
	 * labeled alternative in `fhirliquidParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEqualityExpression?: (ctx: EqualityExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `impliesExpression`
	 * labeled alternative in `fhirliquidParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitImpliesExpression?: (ctx: ImpliesExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `termExpression`
	 * labeled alternative in `fhirliquidParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTermExpression?: (ctx: TermExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `typeExpression`
	 * labeled alternative in `fhirliquidParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTypeExpression?: (ctx: TypeExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `invocationTerm`
	 * labeled alternative in `fhirliquidParser.term`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInvocationTerm?: (ctx: InvocationTermContext) => Result;
	/**
	 * Visit a parse tree produced by the `literalTerm`
	 * labeled alternative in `fhirliquidParser.term`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLiteralTerm?: (ctx: LiteralTermContext) => Result;
	/**
	 * Visit a parse tree produced by the `externalConstantTerm`
	 * labeled alternative in `fhirliquidParser.term`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExternalConstantTerm?: (ctx: ExternalConstantTermContext) => Result;
	/**
	 * Visit a parse tree produced by the `parenthesizedTerm`
	 * labeled alternative in `fhirliquidParser.term`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParenthesizedTerm?: (ctx: ParenthesizedTermContext) => Result;
	/**
	 * Visit a parse tree produced by the `instanceSelectorTerm`
	 * labeled alternative in `fhirliquidParser.term`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInstanceSelectorTerm?: (ctx: InstanceSelectorTermContext) => Result;
	/**
	 * Visit a parse tree produced by the `memberInvocation`
	 * labeled alternative in `fhirliquidParser.invocation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMemberInvocation?: (ctx: MemberInvocationContext) => Result;
	/**
	 * Visit a parse tree produced by the `functionInvocation`
	 * labeled alternative in `fhirliquidParser.invocation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunctionInvocation?: (ctx: FunctionInvocationContext) => Result;
	/**
	 * Visit a parse tree produced by the `thisInvocation`
	 * labeled alternative in `fhirliquidParser.invocation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitThisInvocation?: (ctx: ThisInvocationContext) => Result;
	/**
	 * Visit a parse tree produced by the `indexInvocation`
	 * labeled alternative in `fhirliquidParser.invocation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIndexInvocation?: (ctx: IndexInvocationContext) => Result;
	/**
	 * Visit a parse tree produced by the `totalInvocation`
	 * labeled alternative in `fhirliquidParser.invocation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTotalInvocation?: (ctx: TotalInvocationContext) => Result;
	/**
	 * Visit a parse tree produced by `fhirliquidParser.function`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunction?: (ctx: FunctionContext) => Result;
	/**
	 * Visit a parse tree produced by the `sortDirectionArgument`
	 * labeled alternative in `fhirliquidParser.sortArgument`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSortDirectionArgument?: (ctx: SortDirectionArgumentContext) => Result;
	/**
	 * Visit a parse tree produced by `fhirliquidParser.paramList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParamList?: (ctx: ParamListContext) => Result;
	/**
	 * Visit a parse tree produced by `fhirliquidParser.instanceSelector`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInstanceSelector?: (ctx: InstanceSelectorContext) => Result;
	/**
	 * Visit a parse tree produced by `fhirliquidParser.instanceElementSelector`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInstanceElementSelector?: (ctx: InstanceElementSelectorContext) => Result;
	/**
	 * Visit a parse tree produced by `fhirliquidParser.quantity`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQuantity?: (ctx: QuantityContext) => Result;
	/**
	 * Visit a parse tree produced by `fhirliquidParser.unit`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnit?: (ctx: UnitContext) => Result;
	/**
	 * Visit a parse tree produced by `fhirliquidParser.dateTimePrecision`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDateTimePrecision?: (ctx: DateTimePrecisionContext) => Result;
	/**
	 * Visit a parse tree produced by `fhirliquidParser.pluralDateTimePrecision`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPluralDateTimePrecision?: (ctx: PluralDateTimePrecisionContext) => Result;
	/**
	 * Visit a parse tree produced by `fhirliquidParser.typeSpecifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTypeSpecifier?: (ctx: TypeSpecifierContext) => Result;
	/**
	 * Visit a parse tree produced by `fhirliquidParser.qualifiedIdentifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQualifiedIdentifier?: (ctx: QualifiedIdentifierContext) => Result;
}

