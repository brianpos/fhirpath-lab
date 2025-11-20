// Generated from fhirpath.g4 by ANTLR 4.13.2

import {ParseTreeVisitor} from 'antlr4';


import { EntireExpressionContext } from "./fhirpathParser.js";
import { IndexerExpressionContext } from "./fhirpathParser.js";
import { PolarityExpressionContext } from "./fhirpathParser.js";
import { AdditiveExpressionContext } from "./fhirpathParser.js";
import { MultiplicativeExpressionContext } from "./fhirpathParser.js";
import { UnionExpressionContext } from "./fhirpathParser.js";
import { OrExpressionContext } from "./fhirpathParser.js";
import { AndExpressionContext } from "./fhirpathParser.js";
import { MembershipExpressionContext } from "./fhirpathParser.js";
import { InequalityExpressionContext } from "./fhirpathParser.js";
import { InvocationExpressionContext } from "./fhirpathParser.js";
import { EqualityExpressionContext } from "./fhirpathParser.js";
import { ImpliesExpressionContext } from "./fhirpathParser.js";
import { TermExpressionContext } from "./fhirpathParser.js";
import { TypeExpressionContext } from "./fhirpathParser.js";
import { InvocationTermContext } from "./fhirpathParser.js";
import { LiteralTermContext } from "./fhirpathParser.js";
import { ExternalConstantTermContext } from "./fhirpathParser.js";
import { ParenthesizedTermContext } from "./fhirpathParser.js";
import { NullLiteralContext } from "./fhirpathParser.js";
import { BooleanLiteralContext } from "./fhirpathParser.js";
import { StringLiteralContext } from "./fhirpathParser.js";
import { NumberLiteralContext } from "./fhirpathParser.js";
import { LongNumberLiteralContext } from "./fhirpathParser.js";
import { DateLiteralContext } from "./fhirpathParser.js";
import { DateTimeLiteralContext } from "./fhirpathParser.js";
import { TimeLiteralContext } from "./fhirpathParser.js";
import { QuantityLiteralContext } from "./fhirpathParser.js";
import { ExternalConstantContext } from "./fhirpathParser.js";
import { MemberInvocationContext } from "./fhirpathParser.js";
import { FunctionInvocationContext } from "./fhirpathParser.js";
import { ThisInvocationContext } from "./fhirpathParser.js";
import { IndexInvocationContext } from "./fhirpathParser.js";
import { TotalInvocationContext } from "./fhirpathParser.js";
import { FunctionContext } from "./fhirpathParser.js";
import { SortDirectionArgumentContext } from "./fhirpathParser.js";
import { ParamListContext } from "./fhirpathParser.js";
import { QuantityContext } from "./fhirpathParser.js";
import { UnitContext } from "./fhirpathParser.js";
import { DateTimePrecisionContext } from "./fhirpathParser.js";
import { PluralDateTimePrecisionContext } from "./fhirpathParser.js";
import { TypeSpecifierContext } from "./fhirpathParser.js";
import { QualifiedIdentifierContext } from "./fhirpathParser.js";
import { IdentifierContext } from "./fhirpathParser.js";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `fhirpathParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export default class fhirpathVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `fhirpathParser.entireExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEntireExpression?: (ctx: EntireExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `indexerExpression`
	 * labeled alternative in `fhirpathParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIndexerExpression?: (ctx: IndexerExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `polarityExpression`
	 * labeled alternative in `fhirpathParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPolarityExpression?: (ctx: PolarityExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `additiveExpression`
	 * labeled alternative in `fhirpathParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAdditiveExpression?: (ctx: AdditiveExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `multiplicativeExpression`
	 * labeled alternative in `fhirpathParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMultiplicativeExpression?: (ctx: MultiplicativeExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `unionExpression`
	 * labeled alternative in `fhirpathParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnionExpression?: (ctx: UnionExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `orExpression`
	 * labeled alternative in `fhirpathParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOrExpression?: (ctx: OrExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `andExpression`
	 * labeled alternative in `fhirpathParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAndExpression?: (ctx: AndExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `membershipExpression`
	 * labeled alternative in `fhirpathParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMembershipExpression?: (ctx: MembershipExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `inequalityExpression`
	 * labeled alternative in `fhirpathParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInequalityExpression?: (ctx: InequalityExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `invocationExpression`
	 * labeled alternative in `fhirpathParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInvocationExpression?: (ctx: InvocationExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `equalityExpression`
	 * labeled alternative in `fhirpathParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEqualityExpression?: (ctx: EqualityExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `impliesExpression`
	 * labeled alternative in `fhirpathParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitImpliesExpression?: (ctx: ImpliesExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `termExpression`
	 * labeled alternative in `fhirpathParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTermExpression?: (ctx: TermExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `typeExpression`
	 * labeled alternative in `fhirpathParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTypeExpression?: (ctx: TypeExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `invocationTerm`
	 * labeled alternative in `fhirpathParser.term`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInvocationTerm?: (ctx: InvocationTermContext) => Result;
	/**
	 * Visit a parse tree produced by the `literalTerm`
	 * labeled alternative in `fhirpathParser.term`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLiteralTerm?: (ctx: LiteralTermContext) => Result;
	/**
	 * Visit a parse tree produced by the `externalConstantTerm`
	 * labeled alternative in `fhirpathParser.term`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExternalConstantTerm?: (ctx: ExternalConstantTermContext) => Result;
	/**
	 * Visit a parse tree produced by the `parenthesizedTerm`
	 * labeled alternative in `fhirpathParser.term`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParenthesizedTerm?: (ctx: ParenthesizedTermContext) => Result;
	/**
	 * Visit a parse tree produced by the `nullLiteral`
	 * labeled alternative in `fhirpathParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNullLiteral?: (ctx: NullLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `booleanLiteral`
	 * labeled alternative in `fhirpathParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBooleanLiteral?: (ctx: BooleanLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `stringLiteral`
	 * labeled alternative in `fhirpathParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStringLiteral?: (ctx: StringLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `numberLiteral`
	 * labeled alternative in `fhirpathParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumberLiteral?: (ctx: NumberLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `longNumberLiteral`
	 * labeled alternative in `fhirpathParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLongNumberLiteral?: (ctx: LongNumberLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `dateLiteral`
	 * labeled alternative in `fhirpathParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDateLiteral?: (ctx: DateLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `dateTimeLiteral`
	 * labeled alternative in `fhirpathParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDateTimeLiteral?: (ctx: DateTimeLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `timeLiteral`
	 * labeled alternative in `fhirpathParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTimeLiteral?: (ctx: TimeLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `quantityLiteral`
	 * labeled alternative in `fhirpathParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQuantityLiteral?: (ctx: QuantityLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by `fhirpathParser.externalConstant`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExternalConstant?: (ctx: ExternalConstantContext) => Result;
	/**
	 * Visit a parse tree produced by the `memberInvocation`
	 * labeled alternative in `fhirpathParser.invocation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMemberInvocation?: (ctx: MemberInvocationContext) => Result;
	/**
	 * Visit a parse tree produced by the `functionInvocation`
	 * labeled alternative in `fhirpathParser.invocation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunctionInvocation?: (ctx: FunctionInvocationContext) => Result;
	/**
	 * Visit a parse tree produced by the `thisInvocation`
	 * labeled alternative in `fhirpathParser.invocation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitThisInvocation?: (ctx: ThisInvocationContext) => Result;
	/**
	 * Visit a parse tree produced by the `indexInvocation`
	 * labeled alternative in `fhirpathParser.invocation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIndexInvocation?: (ctx: IndexInvocationContext) => Result;
	/**
	 * Visit a parse tree produced by the `totalInvocation`
	 * labeled alternative in `fhirpathParser.invocation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTotalInvocation?: (ctx: TotalInvocationContext) => Result;
	/**
	 * Visit a parse tree produced by `fhirpathParser.function`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunction?: (ctx: FunctionContext) => Result;
	/**
	 * Visit a parse tree produced by the `sortDirectionArgument`
	 * labeled alternative in `fhirpathParser.sortArgument`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSortDirectionArgument?: (ctx: SortDirectionArgumentContext) => Result;
	/**
	 * Visit a parse tree produced by `fhirpathParser.paramList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParamList?: (ctx: ParamListContext) => Result;
	/**
	 * Visit a parse tree produced by `fhirpathParser.quantity`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQuantity?: (ctx: QuantityContext) => Result;
	/**
	 * Visit a parse tree produced by `fhirpathParser.unit`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnit?: (ctx: UnitContext) => Result;
	/**
	 * Visit a parse tree produced by `fhirpathParser.dateTimePrecision`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDateTimePrecision?: (ctx: DateTimePrecisionContext) => Result;
	/**
	 * Visit a parse tree produced by `fhirpathParser.pluralDateTimePrecision`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPluralDateTimePrecision?: (ctx: PluralDateTimePrecisionContext) => Result;
	/**
	 * Visit a parse tree produced by `fhirpathParser.typeSpecifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTypeSpecifier?: (ctx: TypeSpecifierContext) => Result;
	/**
	 * Visit a parse tree produced by `fhirpathParser.qualifiedIdentifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQualifiedIdentifier?: (ctx: QualifiedIdentifierContext) => Result;
	/**
	 * Visit a parse tree produced by `fhirpathParser.identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIdentifier?: (ctx: IdentifierContext) => Result;
}

