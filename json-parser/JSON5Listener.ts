// Generated from ./JSON5.g4 by ANTLR 4.13.1

import {ParseTreeListener} from "antlr4";


import { Json5Context } from "./JSON5Parser";
import { ObjContext } from "./JSON5Parser";
import { PairContext } from "./JSON5Parser";
import { KeyContext } from "./JSON5Parser";
import { ValueContext } from "./JSON5Parser";
import { ArrContext } from "./JSON5Parser";
import { NumberContext } from "./JSON5Parser";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `JSON5Parser`.
 */
export default class JSON5Listener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `JSON5Parser.json5`.
	 * @param ctx the parse tree
	 */
	enterJson5?: (ctx: Json5Context) => void;
	/**
	 * Exit a parse tree produced by `JSON5Parser.json5`.
	 * @param ctx the parse tree
	 */
	exitJson5?: (ctx: Json5Context) => void;
	/**
	 * Enter a parse tree produced by `JSON5Parser.obj`.
	 * @param ctx the parse tree
	 */
	enterObj?: (ctx: ObjContext) => void;
	/**
	 * Exit a parse tree produced by `JSON5Parser.obj`.
	 * @param ctx the parse tree
	 */
	exitObj?: (ctx: ObjContext) => void;
	/**
	 * Enter a parse tree produced by `JSON5Parser.pair`.
	 * @param ctx the parse tree
	 */
	enterPair?: (ctx: PairContext) => void;
	/**
	 * Exit a parse tree produced by `JSON5Parser.pair`.
	 * @param ctx the parse tree
	 */
	exitPair?: (ctx: PairContext) => void;
	/**
	 * Enter a parse tree produced by `JSON5Parser.key`.
	 * @param ctx the parse tree
	 */
	enterKey?: (ctx: KeyContext) => void;
	/**
	 * Exit a parse tree produced by `JSON5Parser.key`.
	 * @param ctx the parse tree
	 */
	exitKey?: (ctx: KeyContext) => void;
	/**
	 * Enter a parse tree produced by `JSON5Parser.value`.
	 * @param ctx the parse tree
	 */
	enterValue?: (ctx: ValueContext) => void;
	/**
	 * Exit a parse tree produced by `JSON5Parser.value`.
	 * @param ctx the parse tree
	 */
	exitValue?: (ctx: ValueContext) => void;
	/**
	 * Enter a parse tree produced by `JSON5Parser.arr`.
	 * @param ctx the parse tree
	 */
	enterArr?: (ctx: ArrContext) => void;
	/**
	 * Exit a parse tree produced by `JSON5Parser.arr`.
	 * @param ctx the parse tree
	 */
	exitArr?: (ctx: ArrContext) => void;
	/**
	 * Enter a parse tree produced by `JSON5Parser.number`.
	 * @param ctx the parse tree
	 */
	enterNumber?: (ctx: NumberContext) => void;
	/**
	 * Exit a parse tree produced by `JSON5Parser.number`.
	 * @param ctx the parse tree
	 */
	exitNumber?: (ctx: NumberContext) => void;
}

