// Generated from fhirliquid.g4 by ANTLR 4.13.2

import {ParseTreeListener} from "antlr4";


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
 * This interface defines a complete listener for a parse tree produced by
 * `fhirliquidParser`.
 */
export default class fhirliquidListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `fhirliquidParser.liquidDocument`.
	 * @param ctx the parse tree
	 */
	enterLiquidDocument?: (ctx: LiquidDocumentContext) => void;
	/**
	 * Exit a parse tree produced by `fhirliquidParser.liquidDocument`.
	 * @param ctx the parse tree
	 */
	exitLiquidDocument?: (ctx: LiquidDocumentContext) => void;
	/**
	 * Enter a parse tree produced by the `textItem`
	 * labeled alternative in `fhirliquidParser.templateItem`.
	 * @param ctx the parse tree
	 */
	enterTextItem?: (ctx: TextItemContext) => void;
	/**
	 * Exit a parse tree produced by the `textItem`
	 * labeled alternative in `fhirliquidParser.templateItem`.
	 * @param ctx the parse tree
	 */
	exitTextItem?: (ctx: TextItemContext) => void;
	/**
	 * Enter a parse tree produced by the `outputItem`
	 * labeled alternative in `fhirliquidParser.templateItem`.
	 * @param ctx the parse tree
	 */
	enterOutputItem?: (ctx: OutputItemContext) => void;
	/**
	 * Exit a parse tree produced by the `outputItem`
	 * labeled alternative in `fhirliquidParser.templateItem`.
	 * @param ctx the parse tree
	 */
	exitOutputItem?: (ctx: OutputItemContext) => void;
	/**
	 * Enter a parse tree produced by the `ifItem`
	 * labeled alternative in `fhirliquidParser.templateItem`.
	 * @param ctx the parse tree
	 */
	enterIfItem?: (ctx: IfItemContext) => void;
	/**
	 * Exit a parse tree produced by the `ifItem`
	 * labeled alternative in `fhirliquidParser.templateItem`.
	 * @param ctx the parse tree
	 */
	exitIfItem?: (ctx: IfItemContext) => void;
	/**
	 * Enter a parse tree produced by the `forItem`
	 * labeled alternative in `fhirliquidParser.templateItem`.
	 * @param ctx the parse tree
	 */
	enterForItem?: (ctx: ForItemContext) => void;
	/**
	 * Exit a parse tree produced by the `forItem`
	 * labeled alternative in `fhirliquidParser.templateItem`.
	 * @param ctx the parse tree
	 */
	exitForItem?: (ctx: ForItemContext) => void;
	/**
	 * Enter a parse tree produced by the `legacyLoopItem`
	 * labeled alternative in `fhirliquidParser.templateItem`.
	 * @param ctx the parse tree
	 */
	enterLegacyLoopItem?: (ctx: LegacyLoopItemContext) => void;
	/**
	 * Exit a parse tree produced by the `legacyLoopItem`
	 * labeled alternative in `fhirliquidParser.templateItem`.
	 * @param ctx the parse tree
	 */
	exitLegacyLoopItem?: (ctx: LegacyLoopItemContext) => void;
	/**
	 * Enter a parse tree produced by the `captureItem`
	 * labeled alternative in `fhirliquidParser.templateItem`.
	 * @param ctx the parse tree
	 */
	enterCaptureItem?: (ctx: CaptureItemContext) => void;
	/**
	 * Exit a parse tree produced by the `captureItem`
	 * labeled alternative in `fhirliquidParser.templateItem`.
	 * @param ctx the parse tree
	 */
	exitCaptureItem?: (ctx: CaptureItemContext) => void;
	/**
	 * Enter a parse tree produced by the `includeItem`
	 * labeled alternative in `fhirliquidParser.templateItem`.
	 * @param ctx the parse tree
	 */
	enterIncludeItem?: (ctx: IncludeItemContext) => void;
	/**
	 * Exit a parse tree produced by the `includeItem`
	 * labeled alternative in `fhirliquidParser.templateItem`.
	 * @param ctx the parse tree
	 */
	exitIncludeItem?: (ctx: IncludeItemContext) => void;
	/**
	 * Enter a parse tree produced by the `assignItem`
	 * labeled alternative in `fhirliquidParser.templateItem`.
	 * @param ctx the parse tree
	 */
	enterAssignItem?: (ctx: AssignItemContext) => void;
	/**
	 * Exit a parse tree produced by the `assignItem`
	 * labeled alternative in `fhirliquidParser.templateItem`.
	 * @param ctx the parse tree
	 */
	exitAssignItem?: (ctx: AssignItemContext) => void;
	/**
	 * Enter a parse tree produced by the `loopTextItem`
	 * labeled alternative in `fhirliquidParser.loopItem`.
	 * @param ctx the parse tree
	 */
	enterLoopTextItem?: (ctx: LoopTextItemContext) => void;
	/**
	 * Exit a parse tree produced by the `loopTextItem`
	 * labeled alternative in `fhirliquidParser.loopItem`.
	 * @param ctx the parse tree
	 */
	exitLoopTextItem?: (ctx: LoopTextItemContext) => void;
	/**
	 * Enter a parse tree produced by the `loopOutputItem`
	 * labeled alternative in `fhirliquidParser.loopItem`.
	 * @param ctx the parse tree
	 */
	enterLoopOutputItem?: (ctx: LoopOutputItemContext) => void;
	/**
	 * Exit a parse tree produced by the `loopOutputItem`
	 * labeled alternative in `fhirliquidParser.loopItem`.
	 * @param ctx the parse tree
	 */
	exitLoopOutputItem?: (ctx: LoopOutputItemContext) => void;
	/**
	 * Enter a parse tree produced by the `loopIfItem`
	 * labeled alternative in `fhirliquidParser.loopItem`.
	 * @param ctx the parse tree
	 */
	enterLoopIfItem?: (ctx: LoopIfItemContext) => void;
	/**
	 * Exit a parse tree produced by the `loopIfItem`
	 * labeled alternative in `fhirliquidParser.loopItem`.
	 * @param ctx the parse tree
	 */
	exitLoopIfItem?: (ctx: LoopIfItemContext) => void;
	/**
	 * Enter a parse tree produced by the `nestedForItem`
	 * labeled alternative in `fhirliquidParser.loopItem`.
	 * @param ctx the parse tree
	 */
	enterNestedForItem?: (ctx: NestedForItemContext) => void;
	/**
	 * Exit a parse tree produced by the `nestedForItem`
	 * labeled alternative in `fhirliquidParser.loopItem`.
	 * @param ctx the parse tree
	 */
	exitNestedForItem?: (ctx: NestedForItemContext) => void;
	/**
	 * Enter a parse tree produced by the `nestedLegacyLoopItem`
	 * labeled alternative in `fhirliquidParser.loopItem`.
	 * @param ctx the parse tree
	 */
	enterNestedLegacyLoopItem?: (ctx: NestedLegacyLoopItemContext) => void;
	/**
	 * Exit a parse tree produced by the `nestedLegacyLoopItem`
	 * labeled alternative in `fhirliquidParser.loopItem`.
	 * @param ctx the parse tree
	 */
	exitNestedLegacyLoopItem?: (ctx: NestedLegacyLoopItemContext) => void;
	/**
	 * Enter a parse tree produced by the `loopCaptureItem`
	 * labeled alternative in `fhirliquidParser.loopItem`.
	 * @param ctx the parse tree
	 */
	enterLoopCaptureItem?: (ctx: LoopCaptureItemContext) => void;
	/**
	 * Exit a parse tree produced by the `loopCaptureItem`
	 * labeled alternative in `fhirliquidParser.loopItem`.
	 * @param ctx the parse tree
	 */
	exitLoopCaptureItem?: (ctx: LoopCaptureItemContext) => void;
	/**
	 * Enter a parse tree produced by the `loopIncludeItem`
	 * labeled alternative in `fhirliquidParser.loopItem`.
	 * @param ctx the parse tree
	 */
	enterLoopIncludeItem?: (ctx: LoopIncludeItemContext) => void;
	/**
	 * Exit a parse tree produced by the `loopIncludeItem`
	 * labeled alternative in `fhirliquidParser.loopItem`.
	 * @param ctx the parse tree
	 */
	exitLoopIncludeItem?: (ctx: LoopIncludeItemContext) => void;
	/**
	 * Enter a parse tree produced by the `loopAssignItem`
	 * labeled alternative in `fhirliquidParser.loopItem`.
	 * @param ctx the parse tree
	 */
	enterLoopAssignItem?: (ctx: LoopAssignItemContext) => void;
	/**
	 * Exit a parse tree produced by the `loopAssignItem`
	 * labeled alternative in `fhirliquidParser.loopItem`.
	 * @param ctx the parse tree
	 */
	exitLoopAssignItem?: (ctx: LoopAssignItemContext) => void;
	/**
	 * Enter a parse tree produced by the `breakItem`
	 * labeled alternative in `fhirliquidParser.loopItem`.
	 * @param ctx the parse tree
	 */
	enterBreakItem?: (ctx: BreakItemContext) => void;
	/**
	 * Exit a parse tree produced by the `breakItem`
	 * labeled alternative in `fhirliquidParser.loopItem`.
	 * @param ctx the parse tree
	 */
	exitBreakItem?: (ctx: BreakItemContext) => void;
	/**
	 * Enter a parse tree produced by the `continueItem`
	 * labeled alternative in `fhirliquidParser.loopItem`.
	 * @param ctx the parse tree
	 */
	enterContinueItem?: (ctx: ContinueItemContext) => void;
	/**
	 * Exit a parse tree produced by the `continueItem`
	 * labeled alternative in `fhirliquidParser.loopItem`.
	 * @param ctx the parse tree
	 */
	exitContinueItem?: (ctx: ContinueItemContext) => void;
	/**
	 * Enter a parse tree produced by the `cycleItem`
	 * labeled alternative in `fhirliquidParser.loopItem`.
	 * @param ctx the parse tree
	 */
	enterCycleItem?: (ctx: CycleItemContext) => void;
	/**
	 * Exit a parse tree produced by the `cycleItem`
	 * labeled alternative in `fhirliquidParser.loopItem`.
	 * @param ctx the parse tree
	 */
	exitCycleItem?: (ctx: CycleItemContext) => void;
	/**
	 * Enter a parse tree produced by `fhirliquidParser.outputStatement`.
	 * @param ctx the parse tree
	 */
	enterOutputStatement?: (ctx: OutputStatementContext) => void;
	/**
	 * Exit a parse tree produced by `fhirliquidParser.outputStatement`.
	 * @param ctx the parse tree
	 */
	exitOutputStatement?: (ctx: OutputStatementContext) => void;
	/**
	 * Enter a parse tree produced by `fhirliquidParser.filter`.
	 * @param ctx the parse tree
	 */
	enterFilter?: (ctx: FilterContext) => void;
	/**
	 * Exit a parse tree produced by `fhirliquidParser.filter`.
	 * @param ctx the parse tree
	 */
	exitFilter?: (ctx: FilterContext) => void;
	/**
	 * Enter a parse tree produced by `fhirliquidParser.filterName`.
	 * @param ctx the parse tree
	 */
	enterFilterName?: (ctx: FilterNameContext) => void;
	/**
	 * Exit a parse tree produced by `fhirliquidParser.filterName`.
	 * @param ctx the parse tree
	 */
	exitFilterName?: (ctx: FilterNameContext) => void;
	/**
	 * Enter a parse tree produced by `fhirliquidParser.ifStatement`.
	 * @param ctx the parse tree
	 */
	enterIfStatement?: (ctx: IfStatementContext) => void;
	/**
	 * Exit a parse tree produced by `fhirliquidParser.ifStatement`.
	 * @param ctx the parse tree
	 */
	exitIfStatement?: (ctx: IfStatementContext) => void;
	/**
	 * Enter a parse tree produced by `fhirliquidParser.loopIfStatement`.
	 * @param ctx the parse tree
	 */
	enterLoopIfStatement?: (ctx: LoopIfStatementContext) => void;
	/**
	 * Exit a parse tree produced by `fhirliquidParser.loopIfStatement`.
	 * @param ctx the parse tree
	 */
	exitLoopIfStatement?: (ctx: LoopIfStatementContext) => void;
	/**
	 * Enter a parse tree produced by `fhirliquidParser.forStatement`.
	 * @param ctx the parse tree
	 */
	enterForStatement?: (ctx: ForStatementContext) => void;
	/**
	 * Exit a parse tree produced by `fhirliquidParser.forStatement`.
	 * @param ctx the parse tree
	 */
	exitForStatement?: (ctx: ForStatementContext) => void;
	/**
	 * Enter a parse tree produced by `fhirliquidParser.legacyLoopStatement`.
	 * @param ctx the parse tree
	 */
	enterLegacyLoopStatement?: (ctx: LegacyLoopStatementContext) => void;
	/**
	 * Exit a parse tree produced by `fhirliquidParser.legacyLoopStatement`.
	 * @param ctx the parse tree
	 */
	exitLegacyLoopStatement?: (ctx: LegacyLoopStatementContext) => void;
	/**
	 * Enter a parse tree produced by `fhirliquidParser.forModifier`.
	 * @param ctx the parse tree
	 */
	enterForModifier?: (ctx: ForModifierContext) => void;
	/**
	 * Exit a parse tree produced by `fhirliquidParser.forModifier`.
	 * @param ctx the parse tree
	 */
	exitForModifier?: (ctx: ForModifierContext) => void;
	/**
	 * Enter a parse tree produced by `fhirliquidParser.captureStatement`.
	 * @param ctx the parse tree
	 */
	enterCaptureStatement?: (ctx: CaptureStatementContext) => void;
	/**
	 * Exit a parse tree produced by `fhirliquidParser.captureStatement`.
	 * @param ctx the parse tree
	 */
	exitCaptureStatement?: (ctx: CaptureStatementContext) => void;
	/**
	 * Enter a parse tree produced by `fhirliquidParser.includeStatement`.
	 * @param ctx the parse tree
	 */
	enterIncludeStatement?: (ctx: IncludeStatementContext) => void;
	/**
	 * Exit a parse tree produced by `fhirliquidParser.includeStatement`.
	 * @param ctx the parse tree
	 */
	exitIncludeStatement?: (ctx: IncludeStatementContext) => void;
	/**
	 * Enter a parse tree produced by `fhirliquidParser.includeName`.
	 * @param ctx the parse tree
	 */
	enterIncludeName?: (ctx: IncludeNameContext) => void;
	/**
	 * Exit a parse tree produced by `fhirliquidParser.includeName`.
	 * @param ctx the parse tree
	 */
	exitIncludeName?: (ctx: IncludeNameContext) => void;
	/**
	 * Enter a parse tree produced by `fhirliquidParser.includeParameter`.
	 * @param ctx the parse tree
	 */
	enterIncludeParameter?: (ctx: IncludeParameterContext) => void;
	/**
	 * Exit a parse tree produced by `fhirliquidParser.includeParameter`.
	 * @param ctx the parse tree
	 */
	exitIncludeParameter?: (ctx: IncludeParameterContext) => void;
	/**
	 * Enter a parse tree produced by `fhirliquidParser.assignStatement`.
	 * @param ctx the parse tree
	 */
	enterAssignStatement?: (ctx: AssignStatementContext) => void;
	/**
	 * Exit a parse tree produced by `fhirliquidParser.assignStatement`.
	 * @param ctx the parse tree
	 */
	exitAssignStatement?: (ctx: AssignStatementContext) => void;
	/**
	 * Enter a parse tree produced by `fhirliquidParser.breakStatement`.
	 * @param ctx the parse tree
	 */
	enterBreakStatement?: (ctx: BreakStatementContext) => void;
	/**
	 * Exit a parse tree produced by `fhirliquidParser.breakStatement`.
	 * @param ctx the parse tree
	 */
	exitBreakStatement?: (ctx: BreakStatementContext) => void;
	/**
	 * Enter a parse tree produced by `fhirliquidParser.continueStatement`.
	 * @param ctx the parse tree
	 */
	enterContinueStatement?: (ctx: ContinueStatementContext) => void;
	/**
	 * Exit a parse tree produced by `fhirliquidParser.continueStatement`.
	 * @param ctx the parse tree
	 */
	exitContinueStatement?: (ctx: ContinueStatementContext) => void;
	/**
	 * Enter a parse tree produced by `fhirliquidParser.cycleStatement`.
	 * @param ctx the parse tree
	 */
	enterCycleStatement?: (ctx: CycleStatementContext) => void;
	/**
	 * Exit a parse tree produced by `fhirliquidParser.cycleStatement`.
	 * @param ctx the parse tree
	 */
	exitCycleStatement?: (ctx: CycleStatementContext) => void;
	/**
	 * Enter a parse tree produced by `fhirliquidParser.variableName`.
	 * @param ctx the parse tree
	 */
	enterVariableName?: (ctx: VariableNameContext) => void;
	/**
	 * Exit a parse tree produced by `fhirliquidParser.variableName`.
	 * @param ctx the parse tree
	 */
	exitVariableName?: (ctx: VariableNameContext) => void;
	/**
	 * Enter a parse tree produced by the `nullLiteral`
	 * labeled alternative in `fhirliquidParser.literal`.
	 * @param ctx the parse tree
	 */
	enterNullLiteral?: (ctx: NullLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `nullLiteral`
	 * labeled alternative in `fhirliquidParser.literal`.
	 * @param ctx the parse tree
	 */
	exitNullLiteral?: (ctx: NullLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `booleanLiteral`
	 * labeled alternative in `fhirliquidParser.literal`.
	 * @param ctx the parse tree
	 */
	enterBooleanLiteral?: (ctx: BooleanLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `booleanLiteral`
	 * labeled alternative in `fhirliquidParser.literal`.
	 * @param ctx the parse tree
	 */
	exitBooleanLiteral?: (ctx: BooleanLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `stringLiteral`
	 * labeled alternative in `fhirliquidParser.literal`.
	 * @param ctx the parse tree
	 */
	enterStringLiteral?: (ctx: StringLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `stringLiteral`
	 * labeled alternative in `fhirliquidParser.literal`.
	 * @param ctx the parse tree
	 */
	exitStringLiteral?: (ctx: StringLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `numberLiteral`
	 * labeled alternative in `fhirliquidParser.literal`.
	 * @param ctx the parse tree
	 */
	enterNumberLiteral?: (ctx: NumberLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `numberLiteral`
	 * labeled alternative in `fhirliquidParser.literal`.
	 * @param ctx the parse tree
	 */
	exitNumberLiteral?: (ctx: NumberLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `longNumberLiteral`
	 * labeled alternative in `fhirliquidParser.literal`.
	 * @param ctx the parse tree
	 */
	enterLongNumberLiteral?: (ctx: LongNumberLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `longNumberLiteral`
	 * labeled alternative in `fhirliquidParser.literal`.
	 * @param ctx the parse tree
	 */
	exitLongNumberLiteral?: (ctx: LongNumberLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `dateLiteral`
	 * labeled alternative in `fhirliquidParser.literal`.
	 * @param ctx the parse tree
	 */
	enterDateLiteral?: (ctx: DateLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `dateLiteral`
	 * labeled alternative in `fhirliquidParser.literal`.
	 * @param ctx the parse tree
	 */
	exitDateLiteral?: (ctx: DateLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `dateTimeLiteral`
	 * labeled alternative in `fhirliquidParser.literal`.
	 * @param ctx the parse tree
	 */
	enterDateTimeLiteral?: (ctx: DateTimeLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `dateTimeLiteral`
	 * labeled alternative in `fhirliquidParser.literal`.
	 * @param ctx the parse tree
	 */
	exitDateTimeLiteral?: (ctx: DateTimeLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `timeLiteral`
	 * labeled alternative in `fhirliquidParser.literal`.
	 * @param ctx the parse tree
	 */
	enterTimeLiteral?: (ctx: TimeLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `timeLiteral`
	 * labeled alternative in `fhirliquidParser.literal`.
	 * @param ctx the parse tree
	 */
	exitTimeLiteral?: (ctx: TimeLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `quantityLiteral`
	 * labeled alternative in `fhirliquidParser.literal`.
	 * @param ctx the parse tree
	 */
	enterQuantityLiteral?: (ctx: QuantityLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `quantityLiteral`
	 * labeled alternative in `fhirliquidParser.literal`.
	 * @param ctx the parse tree
	 */
	exitQuantityLiteral?: (ctx: QuantityLiteralContext) => void;
	/**
	 * Enter a parse tree produced by `fhirliquidParser.externalConstant`.
	 * @param ctx the parse tree
	 */
	enterExternalConstant?: (ctx: ExternalConstantContext) => void;
	/**
	 * Exit a parse tree produced by `fhirliquidParser.externalConstant`.
	 * @param ctx the parse tree
	 */
	exitExternalConstant?: (ctx: ExternalConstantContext) => void;
	/**
	 * Enter a parse tree produced by `fhirliquidParser.identifier`.
	 * @param ctx the parse tree
	 */
	enterIdentifier?: (ctx: IdentifierContext) => void;
	/**
	 * Exit a parse tree produced by `fhirliquidParser.identifier`.
	 * @param ctx the parse tree
	 */
	exitIdentifier?: (ctx: IdentifierContext) => void;
	/**
	 * Enter a parse tree produced by `fhirliquidParser.entireExpression`.
	 * @param ctx the parse tree
	 */
	enterEntireExpression?: (ctx: EntireExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `fhirliquidParser.entireExpression`.
	 * @param ctx the parse tree
	 */
	exitEntireExpression?: (ctx: EntireExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `indexerExpression`
	 * labeled alternative in `fhirliquidParser.expression`.
	 * @param ctx the parse tree
	 */
	enterIndexerExpression?: (ctx: IndexerExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `indexerExpression`
	 * labeled alternative in `fhirliquidParser.expression`.
	 * @param ctx the parse tree
	 */
	exitIndexerExpression?: (ctx: IndexerExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `polarityExpression`
	 * labeled alternative in `fhirliquidParser.expression`.
	 * @param ctx the parse tree
	 */
	enterPolarityExpression?: (ctx: PolarityExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `polarityExpression`
	 * labeled alternative in `fhirliquidParser.expression`.
	 * @param ctx the parse tree
	 */
	exitPolarityExpression?: (ctx: PolarityExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `additiveExpression`
	 * labeled alternative in `fhirliquidParser.expression`.
	 * @param ctx the parse tree
	 */
	enterAdditiveExpression?: (ctx: AdditiveExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `additiveExpression`
	 * labeled alternative in `fhirliquidParser.expression`.
	 * @param ctx the parse tree
	 */
	exitAdditiveExpression?: (ctx: AdditiveExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `multiplicativeExpression`
	 * labeled alternative in `fhirliquidParser.expression`.
	 * @param ctx the parse tree
	 */
	enterMultiplicativeExpression?: (ctx: MultiplicativeExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `multiplicativeExpression`
	 * labeled alternative in `fhirliquidParser.expression`.
	 * @param ctx the parse tree
	 */
	exitMultiplicativeExpression?: (ctx: MultiplicativeExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `unionExpression`
	 * labeled alternative in `fhirliquidParser.expression`.
	 * @param ctx the parse tree
	 */
	enterUnionExpression?: (ctx: UnionExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `unionExpression`
	 * labeled alternative in `fhirliquidParser.expression`.
	 * @param ctx the parse tree
	 */
	exitUnionExpression?: (ctx: UnionExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `orExpression`
	 * labeled alternative in `fhirliquidParser.expression`.
	 * @param ctx the parse tree
	 */
	enterOrExpression?: (ctx: OrExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `orExpression`
	 * labeled alternative in `fhirliquidParser.expression`.
	 * @param ctx the parse tree
	 */
	exitOrExpression?: (ctx: OrExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `andExpression`
	 * labeled alternative in `fhirliquidParser.expression`.
	 * @param ctx the parse tree
	 */
	enterAndExpression?: (ctx: AndExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `andExpression`
	 * labeled alternative in `fhirliquidParser.expression`.
	 * @param ctx the parse tree
	 */
	exitAndExpression?: (ctx: AndExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `membershipExpression`
	 * labeled alternative in `fhirliquidParser.expression`.
	 * @param ctx the parse tree
	 */
	enterMembershipExpression?: (ctx: MembershipExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `membershipExpression`
	 * labeled alternative in `fhirliquidParser.expression`.
	 * @param ctx the parse tree
	 */
	exitMembershipExpression?: (ctx: MembershipExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `inequalityExpression`
	 * labeled alternative in `fhirliquidParser.expression`.
	 * @param ctx the parse tree
	 */
	enterInequalityExpression?: (ctx: InequalityExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `inequalityExpression`
	 * labeled alternative in `fhirliquidParser.expression`.
	 * @param ctx the parse tree
	 */
	exitInequalityExpression?: (ctx: InequalityExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `invocationExpression`
	 * labeled alternative in `fhirliquidParser.expression`.
	 * @param ctx the parse tree
	 */
	enterInvocationExpression?: (ctx: InvocationExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `invocationExpression`
	 * labeled alternative in `fhirliquidParser.expression`.
	 * @param ctx the parse tree
	 */
	exitInvocationExpression?: (ctx: InvocationExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `equalityExpression`
	 * labeled alternative in `fhirliquidParser.expression`.
	 * @param ctx the parse tree
	 */
	enterEqualityExpression?: (ctx: EqualityExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `equalityExpression`
	 * labeled alternative in `fhirliquidParser.expression`.
	 * @param ctx the parse tree
	 */
	exitEqualityExpression?: (ctx: EqualityExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `impliesExpression`
	 * labeled alternative in `fhirliquidParser.expression`.
	 * @param ctx the parse tree
	 */
	enterImpliesExpression?: (ctx: ImpliesExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `impliesExpression`
	 * labeled alternative in `fhirliquidParser.expression`.
	 * @param ctx the parse tree
	 */
	exitImpliesExpression?: (ctx: ImpliesExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `termExpression`
	 * labeled alternative in `fhirliquidParser.expression`.
	 * @param ctx the parse tree
	 */
	enterTermExpression?: (ctx: TermExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `termExpression`
	 * labeled alternative in `fhirliquidParser.expression`.
	 * @param ctx the parse tree
	 */
	exitTermExpression?: (ctx: TermExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `typeExpression`
	 * labeled alternative in `fhirliquidParser.expression`.
	 * @param ctx the parse tree
	 */
	enterTypeExpression?: (ctx: TypeExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `typeExpression`
	 * labeled alternative in `fhirliquidParser.expression`.
	 * @param ctx the parse tree
	 */
	exitTypeExpression?: (ctx: TypeExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `invocationTerm`
	 * labeled alternative in `fhirliquidParser.term`.
	 * @param ctx the parse tree
	 */
	enterInvocationTerm?: (ctx: InvocationTermContext) => void;
	/**
	 * Exit a parse tree produced by the `invocationTerm`
	 * labeled alternative in `fhirliquidParser.term`.
	 * @param ctx the parse tree
	 */
	exitInvocationTerm?: (ctx: InvocationTermContext) => void;
	/**
	 * Enter a parse tree produced by the `literalTerm`
	 * labeled alternative in `fhirliquidParser.term`.
	 * @param ctx the parse tree
	 */
	enterLiteralTerm?: (ctx: LiteralTermContext) => void;
	/**
	 * Exit a parse tree produced by the `literalTerm`
	 * labeled alternative in `fhirliquidParser.term`.
	 * @param ctx the parse tree
	 */
	exitLiteralTerm?: (ctx: LiteralTermContext) => void;
	/**
	 * Enter a parse tree produced by the `externalConstantTerm`
	 * labeled alternative in `fhirliquidParser.term`.
	 * @param ctx the parse tree
	 */
	enterExternalConstantTerm?: (ctx: ExternalConstantTermContext) => void;
	/**
	 * Exit a parse tree produced by the `externalConstantTerm`
	 * labeled alternative in `fhirliquidParser.term`.
	 * @param ctx the parse tree
	 */
	exitExternalConstantTerm?: (ctx: ExternalConstantTermContext) => void;
	/**
	 * Enter a parse tree produced by the `parenthesizedTerm`
	 * labeled alternative in `fhirliquidParser.term`.
	 * @param ctx the parse tree
	 */
	enterParenthesizedTerm?: (ctx: ParenthesizedTermContext) => void;
	/**
	 * Exit a parse tree produced by the `parenthesizedTerm`
	 * labeled alternative in `fhirliquidParser.term`.
	 * @param ctx the parse tree
	 */
	exitParenthesizedTerm?: (ctx: ParenthesizedTermContext) => void;
	/**
	 * Enter a parse tree produced by the `instanceSelectorTerm`
	 * labeled alternative in `fhirliquidParser.term`.
	 * @param ctx the parse tree
	 */
	enterInstanceSelectorTerm?: (ctx: InstanceSelectorTermContext) => void;
	/**
	 * Exit a parse tree produced by the `instanceSelectorTerm`
	 * labeled alternative in `fhirliquidParser.term`.
	 * @param ctx the parse tree
	 */
	exitInstanceSelectorTerm?: (ctx: InstanceSelectorTermContext) => void;
	/**
	 * Enter a parse tree produced by the `memberInvocation`
	 * labeled alternative in `fhirliquidParser.invocation`.
	 * @param ctx the parse tree
	 */
	enterMemberInvocation?: (ctx: MemberInvocationContext) => void;
	/**
	 * Exit a parse tree produced by the `memberInvocation`
	 * labeled alternative in `fhirliquidParser.invocation`.
	 * @param ctx the parse tree
	 */
	exitMemberInvocation?: (ctx: MemberInvocationContext) => void;
	/**
	 * Enter a parse tree produced by the `functionInvocation`
	 * labeled alternative in `fhirliquidParser.invocation`.
	 * @param ctx the parse tree
	 */
	enterFunctionInvocation?: (ctx: FunctionInvocationContext) => void;
	/**
	 * Exit a parse tree produced by the `functionInvocation`
	 * labeled alternative in `fhirliquidParser.invocation`.
	 * @param ctx the parse tree
	 */
	exitFunctionInvocation?: (ctx: FunctionInvocationContext) => void;
	/**
	 * Enter a parse tree produced by the `thisInvocation`
	 * labeled alternative in `fhirliquidParser.invocation`.
	 * @param ctx the parse tree
	 */
	enterThisInvocation?: (ctx: ThisInvocationContext) => void;
	/**
	 * Exit a parse tree produced by the `thisInvocation`
	 * labeled alternative in `fhirliquidParser.invocation`.
	 * @param ctx the parse tree
	 */
	exitThisInvocation?: (ctx: ThisInvocationContext) => void;
	/**
	 * Enter a parse tree produced by the `indexInvocation`
	 * labeled alternative in `fhirliquidParser.invocation`.
	 * @param ctx the parse tree
	 */
	enterIndexInvocation?: (ctx: IndexInvocationContext) => void;
	/**
	 * Exit a parse tree produced by the `indexInvocation`
	 * labeled alternative in `fhirliquidParser.invocation`.
	 * @param ctx the parse tree
	 */
	exitIndexInvocation?: (ctx: IndexInvocationContext) => void;
	/**
	 * Enter a parse tree produced by the `totalInvocation`
	 * labeled alternative in `fhirliquidParser.invocation`.
	 * @param ctx the parse tree
	 */
	enterTotalInvocation?: (ctx: TotalInvocationContext) => void;
	/**
	 * Exit a parse tree produced by the `totalInvocation`
	 * labeled alternative in `fhirliquidParser.invocation`.
	 * @param ctx the parse tree
	 */
	exitTotalInvocation?: (ctx: TotalInvocationContext) => void;
	/**
	 * Enter a parse tree produced by `fhirliquidParser.function`.
	 * @param ctx the parse tree
	 */
	enterFunction?: (ctx: FunctionContext) => void;
	/**
	 * Exit a parse tree produced by `fhirliquidParser.function`.
	 * @param ctx the parse tree
	 */
	exitFunction?: (ctx: FunctionContext) => void;
	/**
	 * Enter a parse tree produced by the `sortDirectionArgument`
	 * labeled alternative in `fhirliquidParser.sortArgument`.
	 * @param ctx the parse tree
	 */
	enterSortDirectionArgument?: (ctx: SortDirectionArgumentContext) => void;
	/**
	 * Exit a parse tree produced by the `sortDirectionArgument`
	 * labeled alternative in `fhirliquidParser.sortArgument`.
	 * @param ctx the parse tree
	 */
	exitSortDirectionArgument?: (ctx: SortDirectionArgumentContext) => void;
	/**
	 * Enter a parse tree produced by `fhirliquidParser.paramList`.
	 * @param ctx the parse tree
	 */
	enterParamList?: (ctx: ParamListContext) => void;
	/**
	 * Exit a parse tree produced by `fhirliquidParser.paramList`.
	 * @param ctx the parse tree
	 */
	exitParamList?: (ctx: ParamListContext) => void;
	/**
	 * Enter a parse tree produced by `fhirliquidParser.instanceSelector`.
	 * @param ctx the parse tree
	 */
	enterInstanceSelector?: (ctx: InstanceSelectorContext) => void;
	/**
	 * Exit a parse tree produced by `fhirliquidParser.instanceSelector`.
	 * @param ctx the parse tree
	 */
	exitInstanceSelector?: (ctx: InstanceSelectorContext) => void;
	/**
	 * Enter a parse tree produced by `fhirliquidParser.instanceElementSelector`.
	 * @param ctx the parse tree
	 */
	enterInstanceElementSelector?: (ctx: InstanceElementSelectorContext) => void;
	/**
	 * Exit a parse tree produced by `fhirliquidParser.instanceElementSelector`.
	 * @param ctx the parse tree
	 */
	exitInstanceElementSelector?: (ctx: InstanceElementSelectorContext) => void;
	/**
	 * Enter a parse tree produced by `fhirliquidParser.quantity`.
	 * @param ctx the parse tree
	 */
	enterQuantity?: (ctx: QuantityContext) => void;
	/**
	 * Exit a parse tree produced by `fhirliquidParser.quantity`.
	 * @param ctx the parse tree
	 */
	exitQuantity?: (ctx: QuantityContext) => void;
	/**
	 * Enter a parse tree produced by `fhirliquidParser.unit`.
	 * @param ctx the parse tree
	 */
	enterUnit?: (ctx: UnitContext) => void;
	/**
	 * Exit a parse tree produced by `fhirliquidParser.unit`.
	 * @param ctx the parse tree
	 */
	exitUnit?: (ctx: UnitContext) => void;
	/**
	 * Enter a parse tree produced by `fhirliquidParser.dateTimePrecision`.
	 * @param ctx the parse tree
	 */
	enterDateTimePrecision?: (ctx: DateTimePrecisionContext) => void;
	/**
	 * Exit a parse tree produced by `fhirliquidParser.dateTimePrecision`.
	 * @param ctx the parse tree
	 */
	exitDateTimePrecision?: (ctx: DateTimePrecisionContext) => void;
	/**
	 * Enter a parse tree produced by `fhirliquidParser.pluralDateTimePrecision`.
	 * @param ctx the parse tree
	 */
	enterPluralDateTimePrecision?: (ctx: PluralDateTimePrecisionContext) => void;
	/**
	 * Exit a parse tree produced by `fhirliquidParser.pluralDateTimePrecision`.
	 * @param ctx the parse tree
	 */
	exitPluralDateTimePrecision?: (ctx: PluralDateTimePrecisionContext) => void;
	/**
	 * Enter a parse tree produced by `fhirliquidParser.typeSpecifier`.
	 * @param ctx the parse tree
	 */
	enterTypeSpecifier?: (ctx: TypeSpecifierContext) => void;
	/**
	 * Exit a parse tree produced by `fhirliquidParser.typeSpecifier`.
	 * @param ctx the parse tree
	 */
	exitTypeSpecifier?: (ctx: TypeSpecifierContext) => void;
	/**
	 * Enter a parse tree produced by `fhirliquidParser.qualifiedIdentifier`.
	 * @param ctx the parse tree
	 */
	enterQualifiedIdentifier?: (ctx: QualifiedIdentifierContext) => void;
	/**
	 * Exit a parse tree produced by `fhirliquidParser.qualifiedIdentifier`.
	 * @param ctx the parse tree
	 */
	exitQualifiedIdentifier?: (ctx: QualifiedIdentifierContext) => void;
}

