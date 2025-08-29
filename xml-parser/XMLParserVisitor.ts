// Generated from XMLParser.g4 by ANTLR 4.13.2

import {ParseTreeVisitor} from 'antlr4';


import { DocumentContext } from "./XMLParser.js";
import { PrologContext } from "./XMLParser.js";
import { ContentContext } from "./XMLParser.js";
import { ElementContext } from "./XMLParser.js";
import { ReferenceContext } from "./XMLParser.js";
import { AttributeContext } from "./XMLParser.js";
import { ChardataContext } from "./XMLParser.js";
import { MiscContext } from "./XMLParser.js";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `XMLParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export default class XMLParserVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `XMLParser.document`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDocument?: (ctx: DocumentContext) => Result;
	/**
	 * Visit a parse tree produced by `XMLParser.prolog`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitProlog?: (ctx: PrologContext) => Result;
	/**
	 * Visit a parse tree produced by `XMLParser.content`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitContent?: (ctx: ContentContext) => Result;
	/**
	 * Visit a parse tree produced by `XMLParser.element`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitElement?: (ctx: ElementContext) => Result;
	/**
	 * Visit a parse tree produced by `XMLParser.reference`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReference?: (ctx: ReferenceContext) => Result;
	/**
	 * Visit a parse tree produced by `XMLParser.attribute`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAttribute?: (ctx: AttributeContext) => Result;
	/**
	 * Visit a parse tree produced by `XMLParser.chardata`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitChardata?: (ctx: ChardataContext) => Result;
	/**
	 * Visit a parse tree produced by `XMLParser.misc`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMisc?: (ctx: MiscContext) => Result;
}

