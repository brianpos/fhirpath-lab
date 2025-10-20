// Generated from FHIRPath.g4 by ANTLR 4.13.1

import {ParseTreeListener} from "antlr4";


import { EntireExpressionContext } from "./FHIRPathParser";
import { IndexerExpressionContext } from "./FHIRPathParser";
import { PolarityExpressionContext } from "./FHIRPathParser";
import { AdditiveExpressionContext } from "./FHIRPathParser";
import { MultiplicativeExpressionContext } from "./FHIRPathParser";
import { UnionExpressionContext } from "./FHIRPathParser";
import { OrExpressionContext } from "./FHIRPathParser";
import { AndExpressionContext } from "./FHIRPathParser";
import { MembershipExpressionContext } from "./FHIRPathParser";
import { InequalityExpressionContext } from "./FHIRPathParser";
import { InvocationExpressionContext } from "./FHIRPathParser";
import { EqualityExpressionContext } from "./FHIRPathParser";
import { ImpliesExpressionContext } from "./FHIRPathParser";
import { TermExpressionContext } from "./FHIRPathParser";
import { TypeExpressionContext } from "./FHIRPathParser";
import { InvocationTermContext } from "./FHIRPathParser";
import { LiteralTermContext } from "./FHIRPathParser";
import { ExternalConstantTermContext } from "./FHIRPathParser";
import { ParenthesizedTermContext } from "./FHIRPathParser";
import { NullLiteralContext } from "./FHIRPathParser";
import { BooleanLiteralContext } from "./FHIRPathParser";
import { StringLiteralContext } from "./FHIRPathParser";
import { NumberLiteralContext } from "./FHIRPathParser";
import { DateTimeLiteralContext } from "./FHIRPathParser";
import { TimeLiteralContext } from "./FHIRPathParser";
import { QuantityLiteralContext } from "./FHIRPathParser";
import { ExternalConstantContext } from "./FHIRPathParser";
import { MemberInvocationContext } from "./FHIRPathParser";
import { FunctionInvocationContext } from "./FHIRPathParser";
import { ThisInvocationContext } from "./FHIRPathParser";
import { IndexInvocationContext } from "./FHIRPathParser";
import { TotalInvocationContext } from "./FHIRPathParser";
import { FunctnContext } from "./FHIRPathParser";
import { ParamListContext } from "./FHIRPathParser";
import { QuantityContext } from "./FHIRPathParser";
import { UnitContext } from "./FHIRPathParser";
import { DateTimePrecisionContext } from "./FHIRPathParser";
import { PluralDateTimePrecisionContext } from "./FHIRPathParser";
import { TypeSpecifierContext } from "./FHIRPathParser";
import { QualifiedIdentifierContext } from "./FHIRPathParser";
import { IdentifierContext } from "./FHIRPathParser";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `FHIRPathParser`.
 */
export default class FHIRPathListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `FHIRPathParser.entireExpression`.
	 * @param ctx the parse tree
	 */
	enterEntireExpression?: (ctx: EntireExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `FHIRPathParser.entireExpression`.
	 * @param ctx the parse tree
	 */
	exitEntireExpression?: (ctx: EntireExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `indexerExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 */
	enterIndexerExpression?: (ctx: IndexerExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `indexerExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 */
	exitIndexerExpression?: (ctx: IndexerExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `polarityExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 */
	enterPolarityExpression?: (ctx: PolarityExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `polarityExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 */
	exitPolarityExpression?: (ctx: PolarityExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `additiveExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 */
	enterAdditiveExpression?: (ctx: AdditiveExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `additiveExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 */
	exitAdditiveExpression?: (ctx: AdditiveExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `multiplicativeExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 */
	enterMultiplicativeExpression?: (ctx: MultiplicativeExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `multiplicativeExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 */
	exitMultiplicativeExpression?: (ctx: MultiplicativeExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `unionExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 */
	enterUnionExpression?: (ctx: UnionExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `unionExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 */
	exitUnionExpression?: (ctx: UnionExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `orExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 */
	enterOrExpression?: (ctx: OrExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `orExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 */
	exitOrExpression?: (ctx: OrExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `andExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 */
	enterAndExpression?: (ctx: AndExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `andExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 */
	exitAndExpression?: (ctx: AndExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `membershipExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 */
	enterMembershipExpression?: (ctx: MembershipExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `membershipExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 */
	exitMembershipExpression?: (ctx: MembershipExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `inequalityExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 */
	enterInequalityExpression?: (ctx: InequalityExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `inequalityExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 */
	exitInequalityExpression?: (ctx: InequalityExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `invocationExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 */
	enterInvocationExpression?: (ctx: InvocationExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `invocationExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 */
	exitInvocationExpression?: (ctx: InvocationExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `equalityExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 */
	enterEqualityExpression?: (ctx: EqualityExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `equalityExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 */
	exitEqualityExpression?: (ctx: EqualityExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `impliesExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 */
	enterImpliesExpression?: (ctx: ImpliesExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `impliesExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 */
	exitImpliesExpression?: (ctx: ImpliesExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `termExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 */
	enterTermExpression?: (ctx: TermExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `termExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 */
	exitTermExpression?: (ctx: TermExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `typeExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 */
	enterTypeExpression?: (ctx: TypeExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `typeExpression`
	 * labeled alternative in `FHIRPathParser.expression`.
	 * @param ctx the parse tree
	 */
	exitTypeExpression?: (ctx: TypeExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `invocationTerm`
	 * labeled alternative in `FHIRPathParser.term`.
	 * @param ctx the parse tree
	 */
	enterInvocationTerm?: (ctx: InvocationTermContext) => void;
	/**
	 * Exit a parse tree produced by the `invocationTerm`
	 * labeled alternative in `FHIRPathParser.term`.
	 * @param ctx the parse tree
	 */
	exitInvocationTerm?: (ctx: InvocationTermContext) => void;
	/**
	 * Enter a parse tree produced by the `literalTerm`
	 * labeled alternative in `FHIRPathParser.term`.
	 * @param ctx the parse tree
	 */
	enterLiteralTerm?: (ctx: LiteralTermContext) => void;
	/**
	 * Exit a parse tree produced by the `literalTerm`
	 * labeled alternative in `FHIRPathParser.term`.
	 * @param ctx the parse tree
	 */
	exitLiteralTerm?: (ctx: LiteralTermContext) => void;
	/**
	 * Enter a parse tree produced by the `externalConstantTerm`
	 * labeled alternative in `FHIRPathParser.term`.
	 * @param ctx the parse tree
	 */
	enterExternalConstantTerm?: (ctx: ExternalConstantTermContext) => void;
	/**
	 * Exit a parse tree produced by the `externalConstantTerm`
	 * labeled alternative in `FHIRPathParser.term`.
	 * @param ctx the parse tree
	 */
	exitExternalConstantTerm?: (ctx: ExternalConstantTermContext) => void;
	/**
	 * Enter a parse tree produced by the `parenthesizedTerm`
	 * labeled alternative in `FHIRPathParser.term`.
	 * @param ctx the parse tree
	 */
	enterParenthesizedTerm?: (ctx: ParenthesizedTermContext) => void;
	/**
	 * Exit a parse tree produced by the `parenthesizedTerm`
	 * labeled alternative in `FHIRPathParser.term`.
	 * @param ctx the parse tree
	 */
	exitParenthesizedTerm?: (ctx: ParenthesizedTermContext) => void;
	/**
	 * Enter a parse tree produced by the `nullLiteral`
	 * labeled alternative in `FHIRPathParser.literal`.
	 * @param ctx the parse tree
	 */
	enterNullLiteral?: (ctx: NullLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `nullLiteral`
	 * labeled alternative in `FHIRPathParser.literal`.
	 * @param ctx the parse tree
	 */
	exitNullLiteral?: (ctx: NullLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `booleanLiteral`
	 * labeled alternative in `FHIRPathParser.literal`.
	 * @param ctx the parse tree
	 */
	enterBooleanLiteral?: (ctx: BooleanLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `booleanLiteral`
	 * labeled alternative in `FHIRPathParser.literal`.
	 * @param ctx the parse tree
	 */
	exitBooleanLiteral?: (ctx: BooleanLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `stringLiteral`
	 * labeled alternative in `FHIRPathParser.literal`.
	 * @param ctx the parse tree
	 */
	enterStringLiteral?: (ctx: StringLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `stringLiteral`
	 * labeled alternative in `FHIRPathParser.literal`.
	 * @param ctx the parse tree
	 */
	exitStringLiteral?: (ctx: StringLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `numberLiteral`
	 * labeled alternative in `FHIRPathParser.literal`.
	 * @param ctx the parse tree
	 */
	enterNumberLiteral?: (ctx: NumberLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `numberLiteral`
	 * labeled alternative in `FHIRPathParser.literal`.
	 * @param ctx the parse tree
	 */
	exitNumberLiteral?: (ctx: NumberLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `dateTimeLiteral`
	 * labeled alternative in `FHIRPathParser.literal`.
	 * @param ctx the parse tree
	 */
	enterDateTimeLiteral?: (ctx: DateTimeLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `dateTimeLiteral`
	 * labeled alternative in `FHIRPathParser.literal`.
	 * @param ctx the parse tree
	 */
	exitDateTimeLiteral?: (ctx: DateTimeLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `timeLiteral`
	 * labeled alternative in `FHIRPathParser.literal`.
	 * @param ctx the parse tree
	 */
	enterTimeLiteral?: (ctx: TimeLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `timeLiteral`
	 * labeled alternative in `FHIRPathParser.literal`.
	 * @param ctx the parse tree
	 */
	exitTimeLiteral?: (ctx: TimeLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `quantityLiteral`
	 * labeled alternative in `FHIRPathParser.literal`.
	 * @param ctx the parse tree
	 */
	enterQuantityLiteral?: (ctx: QuantityLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `quantityLiteral`
	 * labeled alternative in `FHIRPathParser.literal`.
	 * @param ctx the parse tree
	 */
	exitQuantityLiteral?: (ctx: QuantityLiteralContext) => void;
	/**
	 * Enter a parse tree produced by `FHIRPathParser.externalConstant`.
	 * @param ctx the parse tree
	 */
	enterExternalConstant?: (ctx: ExternalConstantContext) => void;
	/**
	 * Exit a parse tree produced by `FHIRPathParser.externalConstant`.
	 * @param ctx the parse tree
	 */
	exitExternalConstant?: (ctx: ExternalConstantContext) => void;
	/**
	 * Enter a parse tree produced by the `memberInvocation`
	 * labeled alternative in `FHIRPathParser.invocation`.
	 * @param ctx the parse tree
	 */
	enterMemberInvocation?: (ctx: MemberInvocationContext) => void;
	/**
	 * Exit a parse tree produced by the `memberInvocation`
	 * labeled alternative in `FHIRPathParser.invocation`.
	 * @param ctx the parse tree
	 */
	exitMemberInvocation?: (ctx: MemberInvocationContext) => void;
	/**
	 * Enter a parse tree produced by the `functionInvocation`
	 * labeled alternative in `FHIRPathParser.invocation`.
	 * @param ctx the parse tree
	 */
	enterFunctionInvocation?: (ctx: FunctionInvocationContext) => void;
	/**
	 * Exit a parse tree produced by the `functionInvocation`
	 * labeled alternative in `FHIRPathParser.invocation`.
	 * @param ctx the parse tree
	 */
	exitFunctionInvocation?: (ctx: FunctionInvocationContext) => void;
	/**
	 * Enter a parse tree produced by the `thisInvocation`
	 * labeled alternative in `FHIRPathParser.invocation`.
	 * @param ctx the parse tree
	 */
	enterThisInvocation?: (ctx: ThisInvocationContext) => void;
	/**
	 * Exit a parse tree produced by the `thisInvocation`
	 * labeled alternative in `FHIRPathParser.invocation`.
	 * @param ctx the parse tree
	 */
	exitThisInvocation?: (ctx: ThisInvocationContext) => void;
	/**
	 * Enter a parse tree produced by the `indexInvocation`
	 * labeled alternative in `FHIRPathParser.invocation`.
	 * @param ctx the parse tree
	 */
	enterIndexInvocation?: (ctx: IndexInvocationContext) => void;
	/**
	 * Exit a parse tree produced by the `indexInvocation`
	 * labeled alternative in `FHIRPathParser.invocation`.
	 * @param ctx the parse tree
	 */
	exitIndexInvocation?: (ctx: IndexInvocationContext) => void;
	/**
	 * Enter a parse tree produced by the `totalInvocation`
	 * labeled alternative in `FHIRPathParser.invocation`.
	 * @param ctx the parse tree
	 */
	enterTotalInvocation?: (ctx: TotalInvocationContext) => void;
	/**
	 * Exit a parse tree produced by the `totalInvocation`
	 * labeled alternative in `FHIRPathParser.invocation`.
	 * @param ctx the parse tree
	 */
	exitTotalInvocation?: (ctx: TotalInvocationContext) => void;
	/**
	 * Enter a parse tree produced by `FHIRPathParser.functn`.
	 * @param ctx the parse tree
	 */
	enterFunctn?: (ctx: FunctnContext) => void;
	/**
	 * Exit a parse tree produced by `FHIRPathParser.functn`.
	 * @param ctx the parse tree
	 */
	exitFunctn?: (ctx: FunctnContext) => void;
	/**
	 * Enter a parse tree produced by `FHIRPathParser.paramList`.
	 * @param ctx the parse tree
	 */
	enterParamList?: (ctx: ParamListContext) => void;
	/**
	 * Exit a parse tree produced by `FHIRPathParser.paramList`.
	 * @param ctx the parse tree
	 */
	exitParamList?: (ctx: ParamListContext) => void;
	/**
	 * Enter a parse tree produced by `FHIRPathParser.quantity`.
	 * @param ctx the parse tree
	 */
	enterQuantity?: (ctx: QuantityContext) => void;
	/**
	 * Exit a parse tree produced by `FHIRPathParser.quantity`.
	 * @param ctx the parse tree
	 */
	exitQuantity?: (ctx: QuantityContext) => void;
	/**
	 * Enter a parse tree produced by `FHIRPathParser.unit`.
	 * @param ctx the parse tree
	 */
	enterUnit?: (ctx: UnitContext) => void;
	/**
	 * Exit a parse tree produced by `FHIRPathParser.unit`.
	 * @param ctx the parse tree
	 */
	exitUnit?: (ctx: UnitContext) => void;
	/**
	 * Enter a parse tree produced by `FHIRPathParser.dateTimePrecision`.
	 * @param ctx the parse tree
	 */
	enterDateTimePrecision?: (ctx: DateTimePrecisionContext) => void;
	/**
	 * Exit a parse tree produced by `FHIRPathParser.dateTimePrecision`.
	 * @param ctx the parse tree
	 */
	exitDateTimePrecision?: (ctx: DateTimePrecisionContext) => void;
	/**
	 * Enter a parse tree produced by `FHIRPathParser.pluralDateTimePrecision`.
	 * @param ctx the parse tree
	 */
	enterPluralDateTimePrecision?: (ctx: PluralDateTimePrecisionContext) => void;
	/**
	 * Exit a parse tree produced by `FHIRPathParser.pluralDateTimePrecision`.
	 * @param ctx the parse tree
	 */
	exitPluralDateTimePrecision?: (ctx: PluralDateTimePrecisionContext) => void;
	/**
	 * Enter a parse tree produced by `FHIRPathParser.typeSpecifier`.
	 * @param ctx the parse tree
	 */
	enterTypeSpecifier?: (ctx: TypeSpecifierContext) => void;
	/**
	 * Exit a parse tree produced by `FHIRPathParser.typeSpecifier`.
	 * @param ctx the parse tree
	 */
	exitTypeSpecifier?: (ctx: TypeSpecifierContext) => void;
	/**
	 * Enter a parse tree produced by `FHIRPathParser.qualifiedIdentifier`.
	 * @param ctx the parse tree
	 */
	enterQualifiedIdentifier?: (ctx: QualifiedIdentifierContext) => void;
	/**
	 * Exit a parse tree produced by `FHIRPathParser.qualifiedIdentifier`.
	 * @param ctx the parse tree
	 */
	exitQualifiedIdentifier?: (ctx: QualifiedIdentifierContext) => void;
	/**
	 * Enter a parse tree produced by `FHIRPathParser.identifier`.
	 * @param ctx the parse tree
	 */
	enterIdentifier?: (ctx: IdentifierContext) => void;
	/**
	 * Exit a parse tree produced by `FHIRPathParser.identifier`.
	 * @param ctx the parse tree
	 */
	exitIdentifier?: (ctx: IdentifierContext) => void;
}

