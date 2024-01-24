// Generated from ./JSON5.g4 by ANTLR 4.13.1

import {ParseTreeVisitor} from 'antlr4';


import { Json5Context } from "./JSON5Parser";
import { ObjContext } from "./JSON5Parser";
import { PairContext } from "./JSON5Parser";
import { KeyContext } from "./JSON5Parser";
import { ValueContext } from "./JSON5Parser";
import { ArrContext } from "./JSON5Parser";
import { NumberContext } from "./JSON5Parser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `JSON5Parser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export default class JSON5Visitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `JSON5Parser.json5`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitJson5?: (ctx: Json5Context) => Result;
	/**
	 * Visit a parse tree produced by `JSON5Parser.obj`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitObj?: (ctx: ObjContext) => Result;
	/**
	 * Visit a parse tree produced by `JSON5Parser.pair`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPair?: (ctx: PairContext) => Result;
	/**
	 * Visit a parse tree produced by `JSON5Parser.key`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitKey?: (ctx: KeyContext) => Result;
	/**
	 * Visit a parse tree produced by `JSON5Parser.value`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitValue?: (ctx: ValueContext) => Result;
	/**
	 * Visit a parse tree produced by `JSON5Parser.arr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArr?: (ctx: ArrContext) => Result;
	/**
	 * Visit a parse tree produced by `JSON5Parser.number`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumber?: (ctx: NumberContext) => Result;
}

