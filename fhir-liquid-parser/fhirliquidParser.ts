// Generated from fhirliquid.g4 by ANTLR 4.13.2
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols

import {
	ATN,
	ATNDeserializer, DecisionState, DFA, FailedPredicateException,
	RecognitionException, NoViableAltException, BailErrorStrategy,
	Parser, ParserATNSimulator,
	RuleContext, ParserRuleContext, PredictionMode, PredictionContextCache,
	TerminalNode, RuleNode,
	Token, TokenStream,
	Interval, IntervalSet
} from 'antlr4';
import fhirliquidListener from "./fhirliquidListener.js";
import fhirliquidVisitor from "./fhirliquidVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;

export default class fhirliquidParser extends Parser {
	public static readonly OPEN_OUTPUT = 1;
	public static readonly OPEN_CONTROL = 2;
	public static readonly TEXT = 3;
	public static readonly CLOSE_OUTPUT = 4;
	public static readonly CLOSE_CONTROL = 5;
	public static readonly FILTER_SEPARATOR = 6;
	public static readonly LESS_OR_EQUAL = 7;
	public static readonly GREATER_OR_EQUAL = 8;
	public static readonly NOT_EQUAL = 9;
	public static readonly NOT_EQUIVALENT = 10;
	public static readonly IF = 11;
	public static readonly ELSIF = 12;
	public static readonly ELSE = 13;
	public static readonly ENDIF = 14;
	public static readonly FOR = 15;
	public static readonly ENDFOR = 16;
	public static readonly LOOP = 17;
	public static readonly ENDLOOP = 18;
	public static readonly REVERSED = 19;
	public static readonly LIMIT = 20;
	public static readonly OFFSET = 21;
	public static readonly INCLUDE = 22;
	public static readonly ASSIGN = 23;
	public static readonly CAPTURE = 24;
	public static readonly ENDCAPTURE = 25;
	public static readonly BREAK = 26;
	public static readonly CONTINUE = 27;
	public static readonly CYCLE = 28;
	public static readonly PREPEND = 29;
	public static readonly MARKDOWNIFY = 30;
	public static readonly UPCASE = 31;
	public static readonly DOWNCASE = 32;
	public static readonly TRUE = 33;
	public static readonly FALSE = 34;
	public static readonly DIV = 35;
	public static readonly MOD = 36;
	public static readonly IS = 37;
	public static readonly AS = 38;
	public static readonly IN = 39;
	public static readonly CONTAINS = 40;
	public static readonly AND = 41;
	public static readonly OR = 42;
	public static readonly XOR = 43;
	public static readonly IMPLIES = 44;
	public static readonly SORT = 45;
	public static readonly ASC = 46;
	public static readonly DESC = 47;
	public static readonly YEAR = 48;
	public static readonly MONTH = 49;
	public static readonly WEEK = 50;
	public static readonly DAY = 51;
	public static readonly HOUR = 52;
	public static readonly MINUTE = 53;
	public static readonly SECOND = 54;
	public static readonly MILLISECOND = 55;
	public static readonly YEARS = 56;
	public static readonly MONTHS = 57;
	public static readonly WEEKS = 58;
	public static readonly DAYS = 59;
	public static readonly HOURS = 60;
	public static readonly MINUTES = 61;
	public static readonly SECONDS = 62;
	public static readonly MILLISECONDS = 63;
	public static readonly THIS = 64;
	public static readonly INDEX = 65;
	public static readonly TOTAL = 66;
	public static readonly DELIMITEDIDENTIFIER = 67;
	public static readonly STRING = 68;
	public static readonly DOUBLE_QUOTED_STRING = 69;
	public static readonly COMMENT = 70;
	public static readonly LINE_COMMENT = 71;
	public static readonly DOT = 72;
	public static readonly LBRACKET = 73;
	public static readonly RBRACKET = 74;
	public static readonly LPAREN = 75;
	public static readonly RPAREN = 76;
	public static readonly LBRACE = 77;
	public static readonly RBRACE = 78;
	public static readonly PLUS = 79;
	public static readonly MINUS = 80;
	public static readonly STAR = 81;
	public static readonly SLASH = 82;
	public static readonly AMPERSAND = 83;
	public static readonly PIPE = 84;
	public static readonly LESS = 85;
	public static readonly GREATER = 86;
	public static readonly EQUAL = 87;
	public static readonly EQUIVALENT = 88;
	public static readonly COMMA = 89;
	public static readonly COLON = 90;
	public static readonly PERCENT = 91;
	public static readonly DATE = 92;
	public static readonly DATETIME = 93;
	public static readonly TIME = 94;
	public static readonly IDENTIFIER = 95;
	public static readonly INTEGER = 96;
	public static readonly DECIMAL = 97;
	public static readonly LONGNUMBER = 98;
	public static readonly WS = 99;
	public static override readonly EOF = Token.EOF;
	public static readonly RULE_liquidDocument = 0;
	public static readonly RULE_templateItem = 1;
	public static readonly RULE_loopItem = 2;
	public static readonly RULE_outputStatement = 3;
	public static readonly RULE_filter = 4;
	public static readonly RULE_filterName = 5;
	public static readonly RULE_ifStatement = 6;
	public static readonly RULE_loopIfStatement = 7;
	public static readonly RULE_forStatement = 8;
	public static readonly RULE_legacyLoopStatement = 9;
	public static readonly RULE_forModifier = 10;
	public static readonly RULE_captureStatement = 11;
	public static readonly RULE_includeStatement = 12;
	public static readonly RULE_includeName = 13;
	public static readonly RULE_includeParameter = 14;
	public static readonly RULE_assignStatement = 15;
	public static readonly RULE_breakStatement = 16;
	public static readonly RULE_continueStatement = 17;
	public static readonly RULE_cycleStatement = 18;
	public static readonly RULE_variableName = 19;
	public static readonly RULE_literal = 20;
	public static readonly RULE_externalConstant = 21;
	public static readonly RULE_identifier = 22;
	public static readonly RULE_entireExpression = 23;
	public static readonly RULE_expression = 24;
	public static readonly RULE_term = 25;
	public static readonly RULE_invocation = 26;
	public static readonly RULE_function = 27;
	public static readonly RULE_sortArgument = 28;
	public static readonly RULE_paramList = 29;
	public static readonly RULE_instanceSelector = 30;
	public static readonly RULE_instanceElementSelector = 31;
	public static readonly RULE_quantity = 32;
	public static readonly RULE_unit = 33;
	public static readonly RULE_dateTimePrecision = 34;
	public static readonly RULE_pluralDateTimePrecision = 35;
	public static readonly RULE_typeSpecifier = 36;
	public static readonly RULE_qualifiedIdentifier = 37;
	public static readonly literalNames: (string | null)[] = [ null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            "'||'", "'<='", 
                                                            "'>='", "'!='", 
                                                            "'!~'", "'if'", 
                                                            "'elsif'", "'else'", 
                                                            "'endif'", "'for'", 
                                                            "'endfor'", 
                                                            "'loop'", "'endloop'", 
                                                            "'reversed'", 
                                                            "'limit'", "'offset'", 
                                                            "'include'", 
                                                            "'assign'", 
                                                            "'capture'", 
                                                            "'endcapture'", 
                                                            "'break'", "'continue'", 
                                                            "'cycle'", "'prepend'", 
                                                            "'markdownify'", 
                                                            "'upcase'", 
                                                            "'downcase'", 
                                                            "'true'", "'false'", 
                                                            "'div'", "'mod'", 
                                                            "'is'", "'as'", 
                                                            "'in'", "'contains'", 
                                                            "'and'", "'or'", 
                                                            "'xor'", "'implies'", 
                                                            "'sort'", "'asc'", 
                                                            "'desc'", "'year'", 
                                                            "'month'", "'week'", 
                                                            "'day'", "'hour'", 
                                                            "'minute'", 
                                                            "'second'", 
                                                            "'millisecond'", 
                                                            "'years'", "'months'", 
                                                            "'weeks'", "'days'", 
                                                            "'hours'", "'minutes'", 
                                                            "'seconds'", 
                                                            "'milliseconds'", 
                                                            "'$this'", "'$index'", 
                                                            "'$total'", 
                                                            null, null, 
                                                            null, null, 
                                                            null, "'.'", 
                                                            "'['", "']'", 
                                                            "'('", "')'", 
                                                            "'{'", "'}'", 
                                                            "'+'", "'-'", 
                                                            "'*'", "'/'", 
                                                            "'&'", "'|'", 
                                                            "'<'", "'>'", 
                                                            "'='", "'~'", 
                                                            "','", "':'", 
                                                            "'%'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, "OPEN_OUTPUT", 
                                                             "OPEN_CONTROL", 
                                                             "TEXT", "CLOSE_OUTPUT", 
                                                             "CLOSE_CONTROL", 
                                                             "FILTER_SEPARATOR", 
                                                             "LESS_OR_EQUAL", 
                                                             "GREATER_OR_EQUAL", 
                                                             "NOT_EQUAL", 
                                                             "NOT_EQUIVALENT", 
                                                             "IF", "ELSIF", 
                                                             "ELSE", "ENDIF", 
                                                             "FOR", "ENDFOR", 
                                                             "LOOP", "ENDLOOP", 
                                                             "REVERSED", 
                                                             "LIMIT", "OFFSET", 
                                                             "INCLUDE", 
                                                             "ASSIGN", "CAPTURE", 
                                                             "ENDCAPTURE", 
                                                             "BREAK", "CONTINUE", 
                                                             "CYCLE", "PREPEND", 
                                                             "MARKDOWNIFY", 
                                                             "UPCASE", "DOWNCASE", 
                                                             "TRUE", "FALSE", 
                                                             "DIV", "MOD", 
                                                             "IS", "AS", 
                                                             "IN", "CONTAINS", 
                                                             "AND", "OR", 
                                                             "XOR", "IMPLIES", 
                                                             "SORT", "ASC", 
                                                             "DESC", "YEAR", 
                                                             "MONTH", "WEEK", 
                                                             "DAY", "HOUR", 
                                                             "MINUTE", "SECOND", 
                                                             "MILLISECOND", 
                                                             "YEARS", "MONTHS", 
                                                             "WEEKS", "DAYS", 
                                                             "HOURS", "MINUTES", 
                                                             "SECONDS", 
                                                             "MILLISECONDS", 
                                                             "THIS", "INDEX", 
                                                             "TOTAL", "DELIMITEDIDENTIFIER", 
                                                             "STRING", "DOUBLE_QUOTED_STRING", 
                                                             "COMMENT", 
                                                             "LINE_COMMENT", 
                                                             "DOT", "LBRACKET", 
                                                             "RBRACKET", 
                                                             "LPAREN", "RPAREN", 
                                                             "LBRACE", "RBRACE", 
                                                             "PLUS", "MINUS", 
                                                             "STAR", "SLASH", 
                                                             "AMPERSAND", 
                                                             "PIPE", "LESS", 
                                                             "GREATER", 
                                                             "EQUAL", "EQUIVALENT", 
                                                             "COMMA", "COLON", 
                                                             "PERCENT", 
                                                             "DATE", "DATETIME", 
                                                             "TIME", "IDENTIFIER", 
                                                             "INTEGER", 
                                                             "DECIMAL", 
                                                             "LONGNUMBER", 
                                                             "WS" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"liquidDocument", "templateItem", "loopItem", "outputStatement", "filter", 
		"filterName", "ifStatement", "loopIfStatement", "forStatement", "legacyLoopStatement", 
		"forModifier", "captureStatement", "includeStatement", "includeName", 
		"includeParameter", "assignStatement", "breakStatement", "continueStatement", 
		"cycleStatement", "variableName", "literal", "externalConstant", "identifier", 
		"entireExpression", "expression", "term", "invocation", "function", "sortArgument", 
		"paramList", "instanceSelector", "instanceElementSelector", "quantity", 
		"unit", "dateTimePrecision", "pluralDateTimePrecision", "typeSpecifier", 
		"qualifiedIdentifier",
	];
	public get grammarFileName(): string { return "fhirliquid.g4"; }
	public get literalNames(): (string | null)[] { return fhirliquidParser.literalNames; }
	public get symbolicNames(): (string | null)[] { return fhirliquidParser.symbolicNames; }
	public get ruleNames(): string[] { return fhirliquidParser.ruleNames; }
	public get serializedATN(): number[] { return fhirliquidParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(this, fhirliquidParser._ATN, fhirliquidParser.DecisionsToDFA, new PredictionContextCache());
	}
	// @RuleVersion(0)
	public liquidDocument(): LiquidDocumentContext {
		let localctx: LiquidDocumentContext = new LiquidDocumentContext(this, this._ctx, this.state);
		this.enterRule(localctx, 0, fhirliquidParser.RULE_liquidDocument);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 79;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 14) !== 0)) {
				{
				{
				this.state = 76;
				this.templateItem();
				}
				}
				this.state = 81;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 82;
			this.match(fhirliquidParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public templateItem(): TemplateItemContext {
		let localctx: TemplateItemContext = new TemplateItemContext(this, this._ctx, this.state);
		this.enterRule(localctx, 2, fhirliquidParser.RULE_templateItem);
		try {
			this.state = 92;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 1, this._ctx) ) {
			case 1:
				localctx = new TextItemContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 84;
				this.match(fhirliquidParser.TEXT);
				}
				break;
			case 2:
				localctx = new OutputItemContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 85;
				this.outputStatement();
				}
				break;
			case 3:
				localctx = new IfItemContext(this, localctx);
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 86;
				this.ifStatement();
				}
				break;
			case 4:
				localctx = new ForItemContext(this, localctx);
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 87;
				this.forStatement();
				}
				break;
			case 5:
				localctx = new LegacyLoopItemContext(this, localctx);
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 88;
				this.legacyLoopStatement();
				}
				break;
			case 6:
				localctx = new CaptureItemContext(this, localctx);
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 89;
				this.captureStatement();
				}
				break;
			case 7:
				localctx = new IncludeItemContext(this, localctx);
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 90;
				this.includeStatement();
				}
				break;
			case 8:
				localctx = new AssignItemContext(this, localctx);
				this.enterOuterAlt(localctx, 8);
				{
				this.state = 91;
				this.assignStatement();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public loopItem(): LoopItemContext {
		let localctx: LoopItemContext = new LoopItemContext(this, this._ctx, this.state);
		this.enterRule(localctx, 4, fhirliquidParser.RULE_loopItem);
		try {
			this.state = 105;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 2, this._ctx) ) {
			case 1:
				localctx = new LoopTextItemContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 94;
				this.match(fhirliquidParser.TEXT);
				}
				break;
			case 2:
				localctx = new LoopOutputItemContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 95;
				this.outputStatement();
				}
				break;
			case 3:
				localctx = new LoopIfItemContext(this, localctx);
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 96;
				this.loopIfStatement();
				}
				break;
			case 4:
				localctx = new NestedForItemContext(this, localctx);
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 97;
				this.forStatement();
				}
				break;
			case 5:
				localctx = new NestedLegacyLoopItemContext(this, localctx);
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 98;
				this.legacyLoopStatement();
				}
				break;
			case 6:
				localctx = new LoopCaptureItemContext(this, localctx);
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 99;
				this.captureStatement();
				}
				break;
			case 7:
				localctx = new LoopIncludeItemContext(this, localctx);
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 100;
				this.includeStatement();
				}
				break;
			case 8:
				localctx = new LoopAssignItemContext(this, localctx);
				this.enterOuterAlt(localctx, 8);
				{
				this.state = 101;
				this.assignStatement();
				}
				break;
			case 9:
				localctx = new BreakItemContext(this, localctx);
				this.enterOuterAlt(localctx, 9);
				{
				this.state = 102;
				this.breakStatement();
				}
				break;
			case 10:
				localctx = new ContinueItemContext(this, localctx);
				this.enterOuterAlt(localctx, 10);
				{
				this.state = 103;
				this.continueStatement();
				}
				break;
			case 11:
				localctx = new CycleItemContext(this, localctx);
				this.enterOuterAlt(localctx, 11);
				{
				this.state = 104;
				this.cycleStatement();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public outputStatement(): OutputStatementContext {
		let localctx: OutputStatementContext = new OutputStatementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 6, fhirliquidParser.RULE_outputStatement);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 107;
			this.match(fhirliquidParser.OPEN_OUTPUT);
			this.state = 108;
			this.expression(0);
			this.state = 112;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===6) {
				{
				{
				this.state = 109;
				this.filter();
				}
				}
				this.state = 114;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 115;
			this.match(fhirliquidParser.CLOSE_OUTPUT);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public filter(): FilterContext {
		let localctx: FilterContext = new FilterContext(this, this._ctx, this.state);
		this.enterRule(localctx, 8, fhirliquidParser.RULE_filter);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 117;
			this.match(fhirliquidParser.FILTER_SEPARATOR);
			this.state = 118;
			this.filterName();
			this.state = 121;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===90) {
				{
				this.state = 119;
				this.match(fhirliquidParser.COLON);
				this.state = 120;
				this.expression(0);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public filterName(): FilterNameContext {
		let localctx: FilterNameContext = new FilterNameContext(this, this._ctx, this.state);
		this.enterRule(localctx, 10, fhirliquidParser.RULE_filterName);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 123;
			_la = this._input.LA(1);
			if(!(((((_la - 29)) & ~0x1F) === 0 && ((1 << (_la - 29)) & 15) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public ifStatement(): IfStatementContext {
		let localctx: IfStatementContext = new IfStatementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 12, fhirliquidParser.RULE_ifStatement);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 125;
			this.match(fhirliquidParser.OPEN_CONTROL);
			this.state = 126;
			this.match(fhirliquidParser.IF);
			this.state = 127;
			this.expression(0);
			this.state = 128;
			this.match(fhirliquidParser.CLOSE_CONTROL);
			this.state = 132;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 5, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 129;
					this.templateItem();
					}
					}
				}
				this.state = 134;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 5, this._ctx);
			}
			this.state = 147;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 7, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 135;
					this.match(fhirliquidParser.OPEN_CONTROL);
					this.state = 136;
					this.match(fhirliquidParser.ELSIF);
					this.state = 137;
					this.expression(0);
					this.state = 138;
					this.match(fhirliquidParser.CLOSE_CONTROL);
					this.state = 142;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 6, this._ctx);
					while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
						if (_alt === 1) {
							{
							{
							this.state = 139;
							this.templateItem();
							}
							}
						}
						this.state = 144;
						this._errHandler.sync(this);
						_alt = this._interp.adaptivePredict(this._input, 6, this._ctx);
					}
					}
					}
				}
				this.state = 149;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 7, this._ctx);
			}
			this.state = 159;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 9, this._ctx) ) {
			case 1:
				{
				this.state = 150;
				this.match(fhirliquidParser.OPEN_CONTROL);
				this.state = 151;
				this.match(fhirliquidParser.ELSE);
				this.state = 152;
				this.match(fhirliquidParser.CLOSE_CONTROL);
				this.state = 156;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 8, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 153;
						this.templateItem();
						}
						}
					}
					this.state = 158;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 8, this._ctx);
				}
				}
				break;
			}
			this.state = 161;
			this.match(fhirliquidParser.OPEN_CONTROL);
			this.state = 162;
			this.match(fhirliquidParser.ENDIF);
			this.state = 163;
			this.match(fhirliquidParser.CLOSE_CONTROL);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public loopIfStatement(): LoopIfStatementContext {
		let localctx: LoopIfStatementContext = new LoopIfStatementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 14, fhirliquidParser.RULE_loopIfStatement);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 165;
			this.match(fhirliquidParser.OPEN_CONTROL);
			this.state = 166;
			this.match(fhirliquidParser.IF);
			this.state = 167;
			this.expression(0);
			this.state = 168;
			this.match(fhirliquidParser.CLOSE_CONTROL);
			this.state = 172;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 10, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 169;
					this.loopItem();
					}
					}
				}
				this.state = 174;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 10, this._ctx);
			}
			this.state = 187;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 12, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 175;
					this.match(fhirliquidParser.OPEN_CONTROL);
					this.state = 176;
					this.match(fhirliquidParser.ELSIF);
					this.state = 177;
					this.expression(0);
					this.state = 178;
					this.match(fhirliquidParser.CLOSE_CONTROL);
					this.state = 182;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 11, this._ctx);
					while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
						if (_alt === 1) {
							{
							{
							this.state = 179;
							this.loopItem();
							}
							}
						}
						this.state = 184;
						this._errHandler.sync(this);
						_alt = this._interp.adaptivePredict(this._input, 11, this._ctx);
					}
					}
					}
				}
				this.state = 189;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 12, this._ctx);
			}
			this.state = 199;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 14, this._ctx) ) {
			case 1:
				{
				this.state = 190;
				this.match(fhirliquidParser.OPEN_CONTROL);
				this.state = 191;
				this.match(fhirliquidParser.ELSE);
				this.state = 192;
				this.match(fhirliquidParser.CLOSE_CONTROL);
				this.state = 196;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 13, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 193;
						this.loopItem();
						}
						}
					}
					this.state = 198;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 13, this._ctx);
				}
				}
				break;
			}
			this.state = 201;
			this.match(fhirliquidParser.OPEN_CONTROL);
			this.state = 202;
			this.match(fhirliquidParser.ENDIF);
			this.state = 203;
			this.match(fhirliquidParser.CLOSE_CONTROL);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public forStatement(): ForStatementContext {
		let localctx: ForStatementContext = new ForStatementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 16, fhirliquidParser.RULE_forStatement);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 205;
			this.match(fhirliquidParser.OPEN_CONTROL);
			this.state = 206;
			this.match(fhirliquidParser.FOR);
			this.state = 207;
			this.variableName();
			this.state = 208;
			this.match(fhirliquidParser.IN);
			this.state = 209;
			this.expression(0);
			this.state = 213;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3670016) !== 0)) {
				{
				{
				this.state = 210;
				this.forModifier();
				}
				}
				this.state = 215;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 216;
			this.match(fhirliquidParser.CLOSE_CONTROL);
			this.state = 220;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 16, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 217;
					this.loopItem();
					}
					}
				}
				this.state = 222;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 16, this._ctx);
			}
			this.state = 232;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 18, this._ctx) ) {
			case 1:
				{
				this.state = 223;
				this.match(fhirliquidParser.OPEN_CONTROL);
				this.state = 224;
				this.match(fhirliquidParser.ELSE);
				this.state = 225;
				this.match(fhirliquidParser.CLOSE_CONTROL);
				this.state = 229;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 17, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 226;
						this.templateItem();
						}
						}
					}
					this.state = 231;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 17, this._ctx);
				}
				}
				break;
			}
			this.state = 234;
			this.match(fhirliquidParser.OPEN_CONTROL);
			this.state = 235;
			this.match(fhirliquidParser.ENDFOR);
			this.state = 236;
			this.match(fhirliquidParser.CLOSE_CONTROL);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public legacyLoopStatement(): LegacyLoopStatementContext {
		let localctx: LegacyLoopStatementContext = new LegacyLoopStatementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 18, fhirliquidParser.RULE_legacyLoopStatement);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 238;
			this.match(fhirliquidParser.OPEN_CONTROL);
			this.state = 239;
			this.match(fhirliquidParser.LOOP);
			this.state = 240;
			this.variableName();
			this.state = 241;
			this.match(fhirliquidParser.IN);
			this.state = 242;
			this.expression(0);
			this.state = 246;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3670016) !== 0)) {
				{
				{
				this.state = 243;
				this.forModifier();
				}
				}
				this.state = 248;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 249;
			this.match(fhirliquidParser.CLOSE_CONTROL);
			this.state = 253;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 20, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 250;
					this.templateItem();
					}
					}
				}
				this.state = 255;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 20, this._ctx);
			}
			this.state = 256;
			this.match(fhirliquidParser.OPEN_CONTROL);
			this.state = 257;
			this.match(fhirliquidParser.ENDLOOP);
			this.state = 258;
			this.match(fhirliquidParser.CLOSE_CONTROL);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public forModifier(): ForModifierContext {
		let localctx: ForModifierContext = new ForModifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 20, fhirliquidParser.RULE_forModifier);
		try {
			this.state = 267;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 19:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 260;
				this.match(fhirliquidParser.REVERSED);
				}
				break;
			case 20:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 261;
				this.match(fhirliquidParser.LIMIT);
				this.state = 262;
				this.match(fhirliquidParser.COLON);
				this.state = 263;
				this.match(fhirliquidParser.INTEGER);
				}
				break;
			case 21:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 264;
				this.match(fhirliquidParser.OFFSET);
				this.state = 265;
				this.match(fhirliquidParser.COLON);
				this.state = 266;
				this.match(fhirliquidParser.INTEGER);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public captureStatement(): CaptureStatementContext {
		let localctx: CaptureStatementContext = new CaptureStatementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 22, fhirliquidParser.RULE_captureStatement);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 269;
			this.match(fhirliquidParser.OPEN_CONTROL);
			this.state = 270;
			this.match(fhirliquidParser.CAPTURE);
			this.state = 271;
			this.variableName();
			this.state = 272;
			this.match(fhirliquidParser.CLOSE_CONTROL);
			this.state = 276;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 22, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 273;
					this.loopItem();
					}
					}
				}
				this.state = 278;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 22, this._ctx);
			}
			this.state = 279;
			this.match(fhirliquidParser.OPEN_CONTROL);
			this.state = 280;
			this.match(fhirliquidParser.ENDCAPTURE);
			this.state = 281;
			this.match(fhirliquidParser.CLOSE_CONTROL);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public includeStatement(): IncludeStatementContext {
		let localctx: IncludeStatementContext = new IncludeStatementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 24, fhirliquidParser.RULE_includeStatement);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 283;
			this.match(fhirliquidParser.OPEN_CONTROL);
			this.state = 284;
			this.match(fhirliquidParser.INCLUDE);
			this.state = 285;
			this.includeName();
			this.state = 289;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294965248) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 57825) !== 0) || _la===67 || _la===95) {
				{
				{
				this.state = 286;
				this.includeParameter();
				}
				}
				this.state = 291;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 292;
			this.match(fhirliquidParser.CLOSE_CONTROL);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public includeName(): IncludeNameContext {
		let localctx: IncludeNameContext = new IncludeNameContext(this, this._ctx, this.state);
		this.enterRule(localctx, 26, fhirliquidParser.RULE_includeName);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 294;
			this.identifier();
			this.state = 299;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 72)) & ~0x1F) === 0 && ((1 << (_la - 72)) & 1281) !== 0)) {
				{
				{
				this.state = 295;
				_la = this._input.LA(1);
				if(!(((((_la - 72)) & ~0x1F) === 0 && ((1 << (_la - 72)) & 1281) !== 0))) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 296;
				this.identifier();
				}
				}
				this.state = 301;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public includeParameter(): IncludeParameterContext {
		let localctx: IncludeParameterContext = new IncludeParameterContext(this, this._ctx, this.state);
		this.enterRule(localctx, 28, fhirliquidParser.RULE_includeParameter);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 302;
			this.variableName();
			this.state = 303;
			this.match(fhirliquidParser.EQUAL);
			this.state = 304;
			this.expression(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public assignStatement(): AssignStatementContext {
		let localctx: AssignStatementContext = new AssignStatementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 30, fhirliquidParser.RULE_assignStatement);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 306;
			this.match(fhirliquidParser.OPEN_CONTROL);
			this.state = 307;
			this.match(fhirliquidParser.ASSIGN);
			this.state = 308;
			this.variableName();
			this.state = 309;
			this.match(fhirliquidParser.EQUAL);
			this.state = 310;
			this.expression(0);
			this.state = 311;
			this.match(fhirliquidParser.CLOSE_CONTROL);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public breakStatement(): BreakStatementContext {
		let localctx: BreakStatementContext = new BreakStatementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 32, fhirliquidParser.RULE_breakStatement);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 313;
			this.match(fhirliquidParser.OPEN_CONTROL);
			this.state = 314;
			this.match(fhirliquidParser.BREAK);
			this.state = 315;
			this.match(fhirliquidParser.CLOSE_CONTROL);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public continueStatement(): ContinueStatementContext {
		let localctx: ContinueStatementContext = new ContinueStatementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 34, fhirliquidParser.RULE_continueStatement);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 317;
			this.match(fhirliquidParser.OPEN_CONTROL);
			this.state = 318;
			this.match(fhirliquidParser.CONTINUE);
			this.state = 319;
			this.match(fhirliquidParser.CLOSE_CONTROL);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public cycleStatement(): CycleStatementContext {
		let localctx: CycleStatementContext = new CycleStatementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 36, fhirliquidParser.RULE_cycleStatement);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 321;
			this.match(fhirliquidParser.OPEN_CONTROL);
			this.state = 322;
			this.match(fhirliquidParser.CYCLE);
			this.state = 323;
			this.match(fhirliquidParser.DOUBLE_QUOTED_STRING);
			this.state = 328;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===89) {
				{
				{
				this.state = 324;
				this.match(fhirliquidParser.COMMA);
				this.state = 325;
				this.match(fhirliquidParser.DOUBLE_QUOTED_STRING);
				}
				}
				this.state = 330;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 331;
			this.match(fhirliquidParser.CLOSE_CONTROL);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public variableName(): VariableNameContext {
		let localctx: VariableNameContext = new VariableNameContext(this, this._ctx, this.state);
		this.enterRule(localctx, 38, fhirliquidParser.RULE_variableName);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 333;
			this.identifier();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public literal(): LiteralContext {
		let localctx: LiteralContext = new LiteralContext(this, this._ctx, this.state);
		this.enterRule(localctx, 40, fhirliquidParser.RULE_literal);
		let _la: number;
		try {
			this.state = 345;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 26, this._ctx) ) {
			case 1:
				localctx = new NullLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 335;
				this.match(fhirliquidParser.LBRACE);
				this.state = 336;
				this.match(fhirliquidParser.RBRACE);
				}
				break;
			case 2:
				localctx = new BooleanLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 337;
				_la = this._input.LA(1);
				if(!(_la===33 || _la===34)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				}
				break;
			case 3:
				localctx = new StringLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 338;
				_la = this._input.LA(1);
				if(!(_la===68 || _la===69)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				}
				break;
			case 4:
				localctx = new NumberLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 339;
				_la = this._input.LA(1);
				if(!(_la===96 || _la===97)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				}
				break;
			case 5:
				localctx = new LongNumberLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 340;
				this.match(fhirliquidParser.LONGNUMBER);
				}
				break;
			case 6:
				localctx = new DateLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 341;
				this.match(fhirliquidParser.DATE);
				}
				break;
			case 7:
				localctx = new DateTimeLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 342;
				this.match(fhirliquidParser.DATETIME);
				}
				break;
			case 8:
				localctx = new TimeLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 8);
				{
				this.state = 343;
				this.match(fhirliquidParser.TIME);
				}
				break;
			case 9:
				localctx = new QuantityLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 9);
				{
				this.state = 344;
				this.quantity();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public externalConstant(): ExternalConstantContext {
		let localctx: ExternalConstantContext = new ExternalConstantContext(this, this._ctx, this.state);
		this.enterRule(localctx, 42, fhirliquidParser.RULE_externalConstant);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 347;
			this.match(fhirliquidParser.PERCENT);
			this.state = 351;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 11:
			case 12:
			case 13:
			case 14:
			case 15:
			case 16:
			case 17:
			case 18:
			case 19:
			case 20:
			case 21:
			case 22:
			case 23:
			case 24:
			case 25:
			case 26:
			case 27:
			case 28:
			case 29:
			case 30:
			case 31:
			case 32:
			case 37:
			case 38:
			case 39:
			case 40:
			case 45:
			case 46:
			case 47:
			case 67:
			case 95:
				{
				this.state = 348;
				this.identifier();
				}
				break;
			case 68:
				{
				this.state = 349;
				this.match(fhirliquidParser.STRING);
				}
				break;
			case 69:
				{
				this.state = 350;
				this.match(fhirliquidParser.DOUBLE_QUOTED_STRING);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public identifier(): IdentifierContext {
		let localctx: IdentifierContext = new IdentifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 44, fhirliquidParser.RULE_identifier);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 353;
			_la = this._input.LA(1);
			if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 4294965248) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 57825) !== 0) || _la===67 || _la===95)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public entireExpression(): EntireExpressionContext {
		let localctx: EntireExpressionContext = new EntireExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 46, fhirliquidParser.RULE_entireExpression);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 355;
			this.expression(0);
			this.state = 356;
			this.match(fhirliquidParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public expression(): ExpressionContext;
	public expression(_p: number): ExpressionContext;
	// @RuleVersion(0)
	public expression(_p?: number): ExpressionContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let localctx: ExpressionContext = new ExpressionContext(this, this._ctx, _parentState);
		let _prevctx: ExpressionContext = localctx;
		let _startState: number = 48;
		this.enterRecursionRule(localctx, 48, fhirliquidParser.RULE_expression, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 362;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 11:
			case 12:
			case 13:
			case 14:
			case 15:
			case 16:
			case 17:
			case 18:
			case 19:
			case 20:
			case 21:
			case 22:
			case 23:
			case 24:
			case 25:
			case 26:
			case 27:
			case 28:
			case 29:
			case 30:
			case 31:
			case 32:
			case 33:
			case 34:
			case 37:
			case 38:
			case 39:
			case 40:
			case 45:
			case 46:
			case 47:
			case 64:
			case 65:
			case 66:
			case 67:
			case 68:
			case 69:
			case 75:
			case 77:
			case 91:
			case 92:
			case 93:
			case 94:
			case 95:
			case 96:
			case 97:
			case 98:
				{
				localctx = new TermExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;

				this.state = 359;
				this.term();
				}
				break;
			case 79:
			case 80:
				{
				localctx = new PolarityExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 360;
				_la = this._input.LA(1);
				if(!(_la===79 || _la===80)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 361;
				this.expression(11);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 404;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 30, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 402;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 29, this._ctx) ) {
					case 1:
						{
						localctx = new MultiplicativeExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, fhirliquidParser.RULE_expression);
						this.state = 364;
						if (!(this.precpred(this._ctx, 10))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 10)");
						}
						this.state = 365;
						_la = this._input.LA(1);
						if(!(_la===35 || _la===36 || _la===81 || _la===82)) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 366;
						this.expression(11);
						}
						break;
					case 2:
						{
						localctx = new AdditiveExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, fhirliquidParser.RULE_expression);
						this.state = 367;
						if (!(this.precpred(this._ctx, 9))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 9)");
						}
						this.state = 368;
						_la = this._input.LA(1);
						if(!(((((_la - 79)) & ~0x1F) === 0 && ((1 << (_la - 79)) & 19) !== 0))) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 369;
						this.expression(10);
						}
						break;
					case 3:
						{
						localctx = new UnionExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, fhirliquidParser.RULE_expression);
						this.state = 370;
						if (!(this.precpred(this._ctx, 7))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 7)");
						}
						this.state = 371;
						this.match(fhirliquidParser.PIPE);
						this.state = 372;
						this.expression(8);
						}
						break;
					case 4:
						{
						localctx = new InequalityExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, fhirliquidParser.RULE_expression);
						this.state = 373;
						if (!(this.precpred(this._ctx, 6))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 6)");
						}
						this.state = 374;
						_la = this._input.LA(1);
						if(!(_la===7 || _la===8 || _la===85 || _la===86)) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 375;
						this.expression(7);
						}
						break;
					case 5:
						{
						localctx = new EqualityExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, fhirliquidParser.RULE_expression);
						this.state = 376;
						if (!(this.precpred(this._ctx, 5))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 5)");
						}
						this.state = 377;
						_la = this._input.LA(1);
						if(!(_la===9 || _la===10 || _la===87 || _la===88)) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 378;
						this.expression(6);
						}
						break;
					case 6:
						{
						localctx = new MembershipExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, fhirliquidParser.RULE_expression);
						this.state = 379;
						if (!(this.precpred(this._ctx, 4))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
						}
						this.state = 380;
						_la = this._input.LA(1);
						if(!(_la===39 || _la===40)) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 381;
						this.expression(5);
						}
						break;
					case 7:
						{
						localctx = new AndExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, fhirliquidParser.RULE_expression);
						this.state = 382;
						if (!(this.precpred(this._ctx, 3))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 3)");
						}
						this.state = 383;
						this.match(fhirliquidParser.AND);
						this.state = 384;
						this.expression(4);
						}
						break;
					case 8:
						{
						localctx = new OrExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, fhirliquidParser.RULE_expression);
						this.state = 385;
						if (!(this.precpred(this._ctx, 2))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 2)");
						}
						this.state = 386;
						_la = this._input.LA(1);
						if(!(_la===42 || _la===43)) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 387;
						this.expression(3);
						}
						break;
					case 9:
						{
						localctx = new ImpliesExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, fhirliquidParser.RULE_expression);
						this.state = 388;
						if (!(this.precpred(this._ctx, 1))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
						}
						this.state = 389;
						this.match(fhirliquidParser.IMPLIES);
						this.state = 390;
						this.expression(2);
						}
						break;
					case 10:
						{
						localctx = new InvocationExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, fhirliquidParser.RULE_expression);
						this.state = 391;
						if (!(this.precpred(this._ctx, 13))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 13)");
						}
						this.state = 392;
						this.match(fhirliquidParser.DOT);
						this.state = 393;
						this.invocation();
						}
						break;
					case 11:
						{
						localctx = new IndexerExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, fhirliquidParser.RULE_expression);
						this.state = 394;
						if (!(this.precpred(this._ctx, 12))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 12)");
						}
						this.state = 395;
						this.match(fhirliquidParser.LBRACKET);
						this.state = 396;
						this.expression(0);
						this.state = 397;
						this.match(fhirliquidParser.RBRACKET);
						}
						break;
					case 12:
						{
						localctx = new TypeExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, fhirliquidParser.RULE_expression);
						this.state = 399;
						if (!(this.precpred(this._ctx, 8))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 8)");
						}
						this.state = 400;
						_la = this._input.LA(1);
						if(!(_la===37 || _la===38)) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 401;
						this.typeSpecifier();
						}
						break;
					}
					}
				}
				this.state = 406;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 30, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return localctx;
	}
	// @RuleVersion(0)
	public term(): TermContext {
		let localctx: TermContext = new TermContext(this, this._ctx, this.state);
		this.enterRule(localctx, 50, fhirliquidParser.RULE_term);
		try {
			this.state = 415;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 31, this._ctx) ) {
			case 1:
				localctx = new InvocationTermContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 407;
				this.invocation();
				}
				break;
			case 2:
				localctx = new LiteralTermContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 408;
				this.literal();
				}
				break;
			case 3:
				localctx = new ExternalConstantTermContext(this, localctx);
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 409;
				this.externalConstant();
				}
				break;
			case 4:
				localctx = new ParenthesizedTermContext(this, localctx);
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 410;
				this.match(fhirliquidParser.LPAREN);
				this.state = 411;
				this.expression(0);
				this.state = 412;
				this.match(fhirliquidParser.RPAREN);
				}
				break;
			case 5:
				localctx = new InstanceSelectorTermContext(this, localctx);
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 414;
				this.instanceSelector();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public invocation(): InvocationContext {
		let localctx: InvocationContext = new InvocationContext(this, this._ctx, this.state);
		this.enterRule(localctx, 52, fhirliquidParser.RULE_invocation);
		try {
			this.state = 422;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 32, this._ctx) ) {
			case 1:
				localctx = new MemberInvocationContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 417;
				this.identifier();
				}
				break;
			case 2:
				localctx = new FunctionInvocationContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 418;
				this.function_();
				}
				break;
			case 3:
				localctx = new ThisInvocationContext(this, localctx);
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 419;
				this.match(fhirliquidParser.THIS);
				}
				break;
			case 4:
				localctx = new IndexInvocationContext(this, localctx);
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 420;
				this.match(fhirliquidParser.INDEX);
				}
				break;
			case 5:
				localctx = new TotalInvocationContext(this, localctx);
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 421;
				this.match(fhirliquidParser.TOTAL);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public function_(): FunctionContext {
		let localctx: FunctionContext = new FunctionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 54, fhirliquidParser.RULE_function);
		let _la: number;
		try {
			this.state = 444;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 36, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 424;
				this.match(fhirliquidParser.SORT);
				this.state = 425;
				this.match(fhirliquidParser.LPAREN);
				this.state = 434;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 11)) & ~0x1F) === 0 && ((1 << (_la - 11)) & 1023410175) !== 0) || ((((_la - 45)) & ~0x1F) === 0 && ((1 << (_la - 45)) & 1106771975) !== 0) || ((((_la - 77)) & ~0x1F) === 0 && ((1 << (_la - 77)) & 4177933) !== 0)) {
					{
					this.state = 426;
					this.sortArgument();
					this.state = 431;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la===89) {
						{
						{
						this.state = 427;
						this.match(fhirliquidParser.COMMA);
						this.state = 428;
						this.sortArgument();
						}
						}
						this.state = 433;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					}
				}

				this.state = 436;
				this.match(fhirliquidParser.RPAREN);
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 437;
				this.identifier();
				this.state = 438;
				this.match(fhirliquidParser.LPAREN);
				this.state = 440;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 11)) & ~0x1F) === 0 && ((1 << (_la - 11)) & 1023410175) !== 0) || ((((_la - 45)) & ~0x1F) === 0 && ((1 << (_la - 45)) & 1106771975) !== 0) || ((((_la - 77)) & ~0x1F) === 0 && ((1 << (_la - 77)) & 4177933) !== 0)) {
					{
					this.state = 439;
					this.paramList();
					}
				}

				this.state = 442;
				this.match(fhirliquidParser.RPAREN);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public sortArgument(): SortArgumentContext {
		let localctx: SortArgumentContext = new SortArgumentContext(this, this._ctx, this.state);
		this.enterRule(localctx, 56, fhirliquidParser.RULE_sortArgument);
		let _la: number;
		try {
			localctx = new SortDirectionArgumentContext(this, localctx);
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 446;
			this.expression(0);
			this.state = 448;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===46 || _la===47) {
				{
				this.state = 447;
				_la = this._input.LA(1);
				if(!(_la===46 || _la===47)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public paramList(): ParamListContext {
		let localctx: ParamListContext = new ParamListContext(this, this._ctx, this.state);
		this.enterRule(localctx, 58, fhirliquidParser.RULE_paramList);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 450;
			this.expression(0);
			this.state = 455;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===89) {
				{
				{
				this.state = 451;
				this.match(fhirliquidParser.COMMA);
				this.state = 452;
				this.expression(0);
				}
				}
				this.state = 457;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public instanceSelector(): InstanceSelectorContext {
		let localctx: InstanceSelectorContext = new InstanceSelectorContext(this, this._ctx, this.state);
		this.enterRule(localctx, 60, fhirliquidParser.RULE_instanceSelector);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 458;
			this.qualifiedIdentifier();
			this.state = 459;
			this.match(fhirliquidParser.LBRACE);
			this.state = 469;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 90:
				{
				this.state = 460;
				this.match(fhirliquidParser.COLON);
				}
				break;
			case 11:
			case 12:
			case 13:
			case 14:
			case 15:
			case 16:
			case 17:
			case 18:
			case 19:
			case 20:
			case 21:
			case 22:
			case 23:
			case 24:
			case 25:
			case 26:
			case 27:
			case 28:
			case 29:
			case 30:
			case 31:
			case 32:
			case 37:
			case 38:
			case 39:
			case 40:
			case 45:
			case 46:
			case 47:
			case 67:
			case 95:
				{
				{
				this.state = 461;
				this.instanceElementSelector();
				this.state = 466;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===89) {
					{
					{
					this.state = 462;
					this.match(fhirliquidParser.COMMA);
					this.state = 463;
					this.instanceElementSelector();
					}
					}
					this.state = 468;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 471;
			this.match(fhirliquidParser.RBRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public instanceElementSelector(): InstanceElementSelectorContext {
		let localctx: InstanceElementSelectorContext = new InstanceElementSelectorContext(this, this._ctx, this.state);
		this.enterRule(localctx, 62, fhirliquidParser.RULE_instanceElementSelector);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 473;
			this.identifier();
			this.state = 474;
			this.match(fhirliquidParser.COLON);
			this.state = 475;
			this.expression(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public quantity(): QuantityContext {
		let localctx: QuantityContext = new QuantityContext(this, this._ctx, this.state);
		this.enterRule(localctx, 64, fhirliquidParser.RULE_quantity);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 477;
			_la = this._input.LA(1);
			if(!(_la===96 || _la===97)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 479;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 41, this._ctx) ) {
			case 1:
				{
				this.state = 478;
				this.unit();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public unit(): UnitContext {
		let localctx: UnitContext = new UnitContext(this, this._ctx, this.state);
		this.enterRule(localctx, 66, fhirliquidParser.RULE_unit);
		try {
			this.state = 484;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 48:
			case 49:
			case 50:
			case 51:
			case 52:
			case 53:
			case 54:
			case 55:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 481;
				this.dateTimePrecision();
				}
				break;
			case 56:
			case 57:
			case 58:
			case 59:
			case 60:
			case 61:
			case 62:
			case 63:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 482;
				this.pluralDateTimePrecision();
				}
				break;
			case 68:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 483;
				this.match(fhirliquidParser.STRING);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public dateTimePrecision(): DateTimePrecisionContext {
		let localctx: DateTimePrecisionContext = new DateTimePrecisionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 68, fhirliquidParser.RULE_dateTimePrecision);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 486;
			_la = this._input.LA(1);
			if(!(((((_la - 48)) & ~0x1F) === 0 && ((1 << (_la - 48)) & 255) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public pluralDateTimePrecision(): PluralDateTimePrecisionContext {
		let localctx: PluralDateTimePrecisionContext = new PluralDateTimePrecisionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 70, fhirliquidParser.RULE_pluralDateTimePrecision);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 488;
			_la = this._input.LA(1);
			if(!(((((_la - 56)) & ~0x1F) === 0 && ((1 << (_la - 56)) & 255) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public typeSpecifier(): TypeSpecifierContext {
		let localctx: TypeSpecifierContext = new TypeSpecifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 72, fhirliquidParser.RULE_typeSpecifier);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 490;
			this.qualifiedIdentifier();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public qualifiedIdentifier(): QualifiedIdentifierContext {
		let localctx: QualifiedIdentifierContext = new QualifiedIdentifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 74, fhirliquidParser.RULE_qualifiedIdentifier);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 492;
			this.identifier();
			this.state = 497;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 43, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 493;
					this.match(fhirliquidParser.DOT);
					this.state = 494;
					this.identifier();
					}
					}
				}
				this.state = 499;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 43, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public sempred(localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 24:
			return this.expression_sempred(localctx as ExpressionContext, predIndex);
		}
		return true;
	}
	private expression_sempred(localctx: ExpressionContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 10);
		case 1:
			return this.precpred(this._ctx, 9);
		case 2:
			return this.precpred(this._ctx, 7);
		case 3:
			return this.precpred(this._ctx, 6);
		case 4:
			return this.precpred(this._ctx, 5);
		case 5:
			return this.precpred(this._ctx, 4);
		case 6:
			return this.precpred(this._ctx, 3);
		case 7:
			return this.precpred(this._ctx, 2);
		case 8:
			return this.precpred(this._ctx, 1);
		case 9:
			return this.precpred(this._ctx, 13);
		case 10:
			return this.precpred(this._ctx, 12);
		case 11:
			return this.precpred(this._ctx, 8);
		}
		return true;
	}

	public static readonly _serializedATN: number[] = [4,1,99,501,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,
	10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,
	7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,
	24,2,25,7,25,2,26,7,26,2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,
	2,32,7,32,2,33,7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,1,0,5,0,78,
	8,0,10,0,12,0,81,9,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,93,8,1,
	1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,3,2,106,8,2,1,3,1,3,1,3,5,3,
	111,8,3,10,3,12,3,114,9,3,1,3,1,3,1,4,1,4,1,4,1,4,3,4,122,8,4,1,5,1,5,1,
	6,1,6,1,6,1,6,1,6,5,6,131,8,6,10,6,12,6,134,9,6,1,6,1,6,1,6,1,6,1,6,5,6,
	141,8,6,10,6,12,6,144,9,6,5,6,146,8,6,10,6,12,6,149,9,6,1,6,1,6,1,6,1,6,
	5,6,155,8,6,10,6,12,6,158,9,6,3,6,160,8,6,1,6,1,6,1,6,1,6,1,7,1,7,1,7,1,
	7,1,7,5,7,171,8,7,10,7,12,7,174,9,7,1,7,1,7,1,7,1,7,1,7,5,7,181,8,7,10,
	7,12,7,184,9,7,5,7,186,8,7,10,7,12,7,189,9,7,1,7,1,7,1,7,1,7,5,7,195,8,
	7,10,7,12,7,198,9,7,3,7,200,8,7,1,7,1,7,1,7,1,7,1,8,1,8,1,8,1,8,1,8,1,8,
	5,8,212,8,8,10,8,12,8,215,9,8,1,8,1,8,5,8,219,8,8,10,8,12,8,222,9,8,1,8,
	1,8,1,8,1,8,5,8,228,8,8,10,8,12,8,231,9,8,3,8,233,8,8,1,8,1,8,1,8,1,8,1,
	9,1,9,1,9,1,9,1,9,1,9,5,9,245,8,9,10,9,12,9,248,9,9,1,9,1,9,5,9,252,8,9,
	10,9,12,9,255,9,9,1,9,1,9,1,9,1,9,1,10,1,10,1,10,1,10,1,10,1,10,1,10,3,
	10,268,8,10,1,11,1,11,1,11,1,11,1,11,5,11,275,8,11,10,11,12,11,278,9,11,
	1,11,1,11,1,11,1,11,1,12,1,12,1,12,1,12,5,12,288,8,12,10,12,12,12,291,9,
	12,1,12,1,12,1,13,1,13,1,13,5,13,298,8,13,10,13,12,13,301,9,13,1,14,1,14,
	1,14,1,14,1,15,1,15,1,15,1,15,1,15,1,15,1,15,1,16,1,16,1,16,1,16,1,17,1,
	17,1,17,1,17,1,18,1,18,1,18,1,18,1,18,5,18,327,8,18,10,18,12,18,330,9,18,
	1,18,1,18,1,19,1,19,1,20,1,20,1,20,1,20,1,20,1,20,1,20,1,20,1,20,1,20,3,
	20,346,8,20,1,21,1,21,1,21,1,21,3,21,352,8,21,1,22,1,22,1,23,1,23,1,23,
	1,24,1,24,1,24,1,24,3,24,363,8,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,
	24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,
	1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,24,1,
	24,1,24,5,24,403,8,24,10,24,12,24,406,9,24,1,25,1,25,1,25,1,25,1,25,1,25,
	1,25,1,25,3,25,416,8,25,1,26,1,26,1,26,1,26,1,26,3,26,423,8,26,1,27,1,27,
	1,27,1,27,1,27,5,27,430,8,27,10,27,12,27,433,9,27,3,27,435,8,27,1,27,1,
	27,1,27,1,27,3,27,441,8,27,1,27,1,27,3,27,445,8,27,1,28,1,28,3,28,449,8,
	28,1,29,1,29,1,29,5,29,454,8,29,10,29,12,29,457,9,29,1,30,1,30,1,30,1,30,
	1,30,1,30,5,30,465,8,30,10,30,12,30,468,9,30,3,30,470,8,30,1,30,1,30,1,
	31,1,31,1,31,1,31,1,32,1,32,3,32,480,8,32,1,33,1,33,1,33,3,33,485,8,33,
	1,34,1,34,1,35,1,35,1,36,1,36,1,37,1,37,1,37,5,37,496,8,37,10,37,12,37,
	499,9,37,1,37,0,1,48,38,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,
	36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,0,17,1,0,29,
	32,3,0,72,72,80,80,82,82,1,0,33,34,1,0,68,69,1,0,96,97,5,0,11,32,37,40,
	45,47,67,67,95,95,1,0,79,80,2,0,35,36,81,82,2,0,79,80,83,83,2,0,7,8,85,
	86,2,0,9,10,87,88,1,0,39,40,1,0,42,43,1,0,37,38,1,0,46,47,1,0,48,55,1,0,
	56,63,547,0,79,1,0,0,0,2,92,1,0,0,0,4,105,1,0,0,0,6,107,1,0,0,0,8,117,1,
	0,0,0,10,123,1,0,0,0,12,125,1,0,0,0,14,165,1,0,0,0,16,205,1,0,0,0,18,238,
	1,0,0,0,20,267,1,0,0,0,22,269,1,0,0,0,24,283,1,0,0,0,26,294,1,0,0,0,28,
	302,1,0,0,0,30,306,1,0,0,0,32,313,1,0,0,0,34,317,1,0,0,0,36,321,1,0,0,0,
	38,333,1,0,0,0,40,345,1,0,0,0,42,347,1,0,0,0,44,353,1,0,0,0,46,355,1,0,
	0,0,48,362,1,0,0,0,50,415,1,0,0,0,52,422,1,0,0,0,54,444,1,0,0,0,56,446,
	1,0,0,0,58,450,1,0,0,0,60,458,1,0,0,0,62,473,1,0,0,0,64,477,1,0,0,0,66,
	484,1,0,0,0,68,486,1,0,0,0,70,488,1,0,0,0,72,490,1,0,0,0,74,492,1,0,0,0,
	76,78,3,2,1,0,77,76,1,0,0,0,78,81,1,0,0,0,79,77,1,0,0,0,79,80,1,0,0,0,80,
	82,1,0,0,0,81,79,1,0,0,0,82,83,5,0,0,1,83,1,1,0,0,0,84,93,5,3,0,0,85,93,
	3,6,3,0,86,93,3,12,6,0,87,93,3,16,8,0,88,93,3,18,9,0,89,93,3,22,11,0,90,
	93,3,24,12,0,91,93,3,30,15,0,92,84,1,0,0,0,92,85,1,0,0,0,92,86,1,0,0,0,
	92,87,1,0,0,0,92,88,1,0,0,0,92,89,1,0,0,0,92,90,1,0,0,0,92,91,1,0,0,0,93,
	3,1,0,0,0,94,106,5,3,0,0,95,106,3,6,3,0,96,106,3,14,7,0,97,106,3,16,8,0,
	98,106,3,18,9,0,99,106,3,22,11,0,100,106,3,24,12,0,101,106,3,30,15,0,102,
	106,3,32,16,0,103,106,3,34,17,0,104,106,3,36,18,0,105,94,1,0,0,0,105,95,
	1,0,0,0,105,96,1,0,0,0,105,97,1,0,0,0,105,98,1,0,0,0,105,99,1,0,0,0,105,
	100,1,0,0,0,105,101,1,0,0,0,105,102,1,0,0,0,105,103,1,0,0,0,105,104,1,0,
	0,0,106,5,1,0,0,0,107,108,5,1,0,0,108,112,3,48,24,0,109,111,3,8,4,0,110,
	109,1,0,0,0,111,114,1,0,0,0,112,110,1,0,0,0,112,113,1,0,0,0,113,115,1,0,
	0,0,114,112,1,0,0,0,115,116,5,4,0,0,116,7,1,0,0,0,117,118,5,6,0,0,118,121,
	3,10,5,0,119,120,5,90,0,0,120,122,3,48,24,0,121,119,1,0,0,0,121,122,1,0,
	0,0,122,9,1,0,0,0,123,124,7,0,0,0,124,11,1,0,0,0,125,126,5,2,0,0,126,127,
	5,11,0,0,127,128,3,48,24,0,128,132,5,5,0,0,129,131,3,2,1,0,130,129,1,0,
	0,0,131,134,1,0,0,0,132,130,1,0,0,0,132,133,1,0,0,0,133,147,1,0,0,0,134,
	132,1,0,0,0,135,136,5,2,0,0,136,137,5,12,0,0,137,138,3,48,24,0,138,142,
	5,5,0,0,139,141,3,2,1,0,140,139,1,0,0,0,141,144,1,0,0,0,142,140,1,0,0,0,
	142,143,1,0,0,0,143,146,1,0,0,0,144,142,1,0,0,0,145,135,1,0,0,0,146,149,
	1,0,0,0,147,145,1,0,0,0,147,148,1,0,0,0,148,159,1,0,0,0,149,147,1,0,0,0,
	150,151,5,2,0,0,151,152,5,13,0,0,152,156,5,5,0,0,153,155,3,2,1,0,154,153,
	1,0,0,0,155,158,1,0,0,0,156,154,1,0,0,0,156,157,1,0,0,0,157,160,1,0,0,0,
	158,156,1,0,0,0,159,150,1,0,0,0,159,160,1,0,0,0,160,161,1,0,0,0,161,162,
	5,2,0,0,162,163,5,14,0,0,163,164,5,5,0,0,164,13,1,0,0,0,165,166,5,2,0,0,
	166,167,5,11,0,0,167,168,3,48,24,0,168,172,5,5,0,0,169,171,3,4,2,0,170,
	169,1,0,0,0,171,174,1,0,0,0,172,170,1,0,0,0,172,173,1,0,0,0,173,187,1,0,
	0,0,174,172,1,0,0,0,175,176,5,2,0,0,176,177,5,12,0,0,177,178,3,48,24,0,
	178,182,5,5,0,0,179,181,3,4,2,0,180,179,1,0,0,0,181,184,1,0,0,0,182,180,
	1,0,0,0,182,183,1,0,0,0,183,186,1,0,0,0,184,182,1,0,0,0,185,175,1,0,0,0,
	186,189,1,0,0,0,187,185,1,0,0,0,187,188,1,0,0,0,188,199,1,0,0,0,189,187,
	1,0,0,0,190,191,5,2,0,0,191,192,5,13,0,0,192,196,5,5,0,0,193,195,3,4,2,
	0,194,193,1,0,0,0,195,198,1,0,0,0,196,194,1,0,0,0,196,197,1,0,0,0,197,200,
	1,0,0,0,198,196,1,0,0,0,199,190,1,0,0,0,199,200,1,0,0,0,200,201,1,0,0,0,
	201,202,5,2,0,0,202,203,5,14,0,0,203,204,5,5,0,0,204,15,1,0,0,0,205,206,
	5,2,0,0,206,207,5,15,0,0,207,208,3,38,19,0,208,209,5,39,0,0,209,213,3,48,
	24,0,210,212,3,20,10,0,211,210,1,0,0,0,212,215,1,0,0,0,213,211,1,0,0,0,
	213,214,1,0,0,0,214,216,1,0,0,0,215,213,1,0,0,0,216,220,5,5,0,0,217,219,
	3,4,2,0,218,217,1,0,0,0,219,222,1,0,0,0,220,218,1,0,0,0,220,221,1,0,0,0,
	221,232,1,0,0,0,222,220,1,0,0,0,223,224,5,2,0,0,224,225,5,13,0,0,225,229,
	5,5,0,0,226,228,3,2,1,0,227,226,1,0,0,0,228,231,1,0,0,0,229,227,1,0,0,0,
	229,230,1,0,0,0,230,233,1,0,0,0,231,229,1,0,0,0,232,223,1,0,0,0,232,233,
	1,0,0,0,233,234,1,0,0,0,234,235,5,2,0,0,235,236,5,16,0,0,236,237,5,5,0,
	0,237,17,1,0,0,0,238,239,5,2,0,0,239,240,5,17,0,0,240,241,3,38,19,0,241,
	242,5,39,0,0,242,246,3,48,24,0,243,245,3,20,10,0,244,243,1,0,0,0,245,248,
	1,0,0,0,246,244,1,0,0,0,246,247,1,0,0,0,247,249,1,0,0,0,248,246,1,0,0,0,
	249,253,5,5,0,0,250,252,3,2,1,0,251,250,1,0,0,0,252,255,1,0,0,0,253,251,
	1,0,0,0,253,254,1,0,0,0,254,256,1,0,0,0,255,253,1,0,0,0,256,257,5,2,0,0,
	257,258,5,18,0,0,258,259,5,5,0,0,259,19,1,0,0,0,260,268,5,19,0,0,261,262,
	5,20,0,0,262,263,5,90,0,0,263,268,5,96,0,0,264,265,5,21,0,0,265,266,5,90,
	0,0,266,268,5,96,0,0,267,260,1,0,0,0,267,261,1,0,0,0,267,264,1,0,0,0,268,
	21,1,0,0,0,269,270,5,2,0,0,270,271,5,24,0,0,271,272,3,38,19,0,272,276,5,
	5,0,0,273,275,3,4,2,0,274,273,1,0,0,0,275,278,1,0,0,0,276,274,1,0,0,0,276,
	277,1,0,0,0,277,279,1,0,0,0,278,276,1,0,0,0,279,280,5,2,0,0,280,281,5,25,
	0,0,281,282,5,5,0,0,282,23,1,0,0,0,283,284,5,2,0,0,284,285,5,22,0,0,285,
	289,3,26,13,0,286,288,3,28,14,0,287,286,1,0,0,0,288,291,1,0,0,0,289,287,
	1,0,0,0,289,290,1,0,0,0,290,292,1,0,0,0,291,289,1,0,0,0,292,293,5,5,0,0,
	293,25,1,0,0,0,294,299,3,44,22,0,295,296,7,1,0,0,296,298,3,44,22,0,297,
	295,1,0,0,0,298,301,1,0,0,0,299,297,1,0,0,0,299,300,1,0,0,0,300,27,1,0,
	0,0,301,299,1,0,0,0,302,303,3,38,19,0,303,304,5,87,0,0,304,305,3,48,24,
	0,305,29,1,0,0,0,306,307,5,2,0,0,307,308,5,23,0,0,308,309,3,38,19,0,309,
	310,5,87,0,0,310,311,3,48,24,0,311,312,5,5,0,0,312,31,1,0,0,0,313,314,5,
	2,0,0,314,315,5,26,0,0,315,316,5,5,0,0,316,33,1,0,0,0,317,318,5,2,0,0,318,
	319,5,27,0,0,319,320,5,5,0,0,320,35,1,0,0,0,321,322,5,2,0,0,322,323,5,28,
	0,0,323,328,5,69,0,0,324,325,5,89,0,0,325,327,5,69,0,0,326,324,1,0,0,0,
	327,330,1,0,0,0,328,326,1,0,0,0,328,329,1,0,0,0,329,331,1,0,0,0,330,328,
	1,0,0,0,331,332,5,5,0,0,332,37,1,0,0,0,333,334,3,44,22,0,334,39,1,0,0,0,
	335,336,5,77,0,0,336,346,5,78,0,0,337,346,7,2,0,0,338,346,7,3,0,0,339,346,
	7,4,0,0,340,346,5,98,0,0,341,346,5,92,0,0,342,346,5,93,0,0,343,346,5,94,
	0,0,344,346,3,64,32,0,345,335,1,0,0,0,345,337,1,0,0,0,345,338,1,0,0,0,345,
	339,1,0,0,0,345,340,1,0,0,0,345,341,1,0,0,0,345,342,1,0,0,0,345,343,1,0,
	0,0,345,344,1,0,0,0,346,41,1,0,0,0,347,351,5,91,0,0,348,352,3,44,22,0,349,
	352,5,68,0,0,350,352,5,69,0,0,351,348,1,0,0,0,351,349,1,0,0,0,351,350,1,
	0,0,0,352,43,1,0,0,0,353,354,7,5,0,0,354,45,1,0,0,0,355,356,3,48,24,0,356,
	357,5,0,0,1,357,47,1,0,0,0,358,359,6,24,-1,0,359,363,3,50,25,0,360,361,
	7,6,0,0,361,363,3,48,24,11,362,358,1,0,0,0,362,360,1,0,0,0,363,404,1,0,
	0,0,364,365,10,10,0,0,365,366,7,7,0,0,366,403,3,48,24,11,367,368,10,9,0,
	0,368,369,7,8,0,0,369,403,3,48,24,10,370,371,10,7,0,0,371,372,5,84,0,0,
	372,403,3,48,24,8,373,374,10,6,0,0,374,375,7,9,0,0,375,403,3,48,24,7,376,
	377,10,5,0,0,377,378,7,10,0,0,378,403,3,48,24,6,379,380,10,4,0,0,380,381,
	7,11,0,0,381,403,3,48,24,5,382,383,10,3,0,0,383,384,5,41,0,0,384,403,3,
	48,24,4,385,386,10,2,0,0,386,387,7,12,0,0,387,403,3,48,24,3,388,389,10,
	1,0,0,389,390,5,44,0,0,390,403,3,48,24,2,391,392,10,13,0,0,392,393,5,72,
	0,0,393,403,3,52,26,0,394,395,10,12,0,0,395,396,5,73,0,0,396,397,3,48,24,
	0,397,398,5,74,0,0,398,403,1,0,0,0,399,400,10,8,0,0,400,401,7,13,0,0,401,
	403,3,72,36,0,402,364,1,0,0,0,402,367,1,0,0,0,402,370,1,0,0,0,402,373,1,
	0,0,0,402,376,1,0,0,0,402,379,1,0,0,0,402,382,1,0,0,0,402,385,1,0,0,0,402,
	388,1,0,0,0,402,391,1,0,0,0,402,394,1,0,0,0,402,399,1,0,0,0,403,406,1,0,
	0,0,404,402,1,0,0,0,404,405,1,0,0,0,405,49,1,0,0,0,406,404,1,0,0,0,407,
	416,3,52,26,0,408,416,3,40,20,0,409,416,3,42,21,0,410,411,5,75,0,0,411,
	412,3,48,24,0,412,413,5,76,0,0,413,416,1,0,0,0,414,416,3,60,30,0,415,407,
	1,0,0,0,415,408,1,0,0,0,415,409,1,0,0,0,415,410,1,0,0,0,415,414,1,0,0,0,
	416,51,1,0,0,0,417,423,3,44,22,0,418,423,3,54,27,0,419,423,5,64,0,0,420,
	423,5,65,0,0,421,423,5,66,0,0,422,417,1,0,0,0,422,418,1,0,0,0,422,419,1,
	0,0,0,422,420,1,0,0,0,422,421,1,0,0,0,423,53,1,0,0,0,424,425,5,45,0,0,425,
	434,5,75,0,0,426,431,3,56,28,0,427,428,5,89,0,0,428,430,3,56,28,0,429,427,
	1,0,0,0,430,433,1,0,0,0,431,429,1,0,0,0,431,432,1,0,0,0,432,435,1,0,0,0,
	433,431,1,0,0,0,434,426,1,0,0,0,434,435,1,0,0,0,435,436,1,0,0,0,436,445,
	5,76,0,0,437,438,3,44,22,0,438,440,5,75,0,0,439,441,3,58,29,0,440,439,1,
	0,0,0,440,441,1,0,0,0,441,442,1,0,0,0,442,443,5,76,0,0,443,445,1,0,0,0,
	444,424,1,0,0,0,444,437,1,0,0,0,445,55,1,0,0,0,446,448,3,48,24,0,447,449,
	7,14,0,0,448,447,1,0,0,0,448,449,1,0,0,0,449,57,1,0,0,0,450,455,3,48,24,
	0,451,452,5,89,0,0,452,454,3,48,24,0,453,451,1,0,0,0,454,457,1,0,0,0,455,
	453,1,0,0,0,455,456,1,0,0,0,456,59,1,0,0,0,457,455,1,0,0,0,458,459,3,74,
	37,0,459,469,5,77,0,0,460,470,5,90,0,0,461,466,3,62,31,0,462,463,5,89,0,
	0,463,465,3,62,31,0,464,462,1,0,0,0,465,468,1,0,0,0,466,464,1,0,0,0,466,
	467,1,0,0,0,467,470,1,0,0,0,468,466,1,0,0,0,469,460,1,0,0,0,469,461,1,0,
	0,0,470,471,1,0,0,0,471,472,5,78,0,0,472,61,1,0,0,0,473,474,3,44,22,0,474,
	475,5,90,0,0,475,476,3,48,24,0,476,63,1,0,0,0,477,479,7,4,0,0,478,480,3,
	66,33,0,479,478,1,0,0,0,479,480,1,0,0,0,480,65,1,0,0,0,481,485,3,68,34,
	0,482,485,3,70,35,0,483,485,5,68,0,0,484,481,1,0,0,0,484,482,1,0,0,0,484,
	483,1,0,0,0,485,67,1,0,0,0,486,487,7,15,0,0,487,69,1,0,0,0,488,489,7,16,
	0,0,489,71,1,0,0,0,490,491,3,74,37,0,491,73,1,0,0,0,492,497,3,44,22,0,493,
	494,5,72,0,0,494,496,3,44,22,0,495,493,1,0,0,0,496,499,1,0,0,0,497,495,
	1,0,0,0,497,498,1,0,0,0,498,75,1,0,0,0,499,497,1,0,0,0,44,79,92,105,112,
	121,132,142,147,156,159,172,182,187,196,199,213,220,229,232,246,253,267,
	276,289,299,328,345,351,362,402,404,415,422,431,434,440,444,448,455,466,
	469,479,484,497];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!fhirliquidParser.__ATN) {
			fhirliquidParser.__ATN = new ATNDeserializer().deserialize(fhirliquidParser._serializedATN);
		}

		return fhirliquidParser.__ATN;
	}


	static DecisionsToDFA = fhirliquidParser._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );

}

export class LiquidDocumentContext extends ParserRuleContext {
	constructor(parser?: fhirliquidParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public EOF(): TerminalNode {
		return this.getToken(fhirliquidParser.EOF, 0);
	}
	public templateItem_list(): TemplateItemContext[] {
		return this.getTypedRuleContexts(TemplateItemContext) as TemplateItemContext[];
	}
	public templateItem(i: number): TemplateItemContext {
		return this.getTypedRuleContext(TemplateItemContext, i) as TemplateItemContext;
	}
    public get ruleIndex(): number {
    	return fhirliquidParser.RULE_liquidDocument;
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterLiquidDocument) {
	 		listener.enterLiquidDocument(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitLiquidDocument) {
	 		listener.exitLiquidDocument(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitLiquidDocument) {
			return visitor.visitLiquidDocument(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TemplateItemContext extends ParserRuleContext {
	constructor(parser?: fhirliquidParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return fhirliquidParser.RULE_templateItem;
	}
	public override copyFrom(ctx: TemplateItemContext): void {
		super.copyFrom(ctx);
	}
}
export class ForItemContext extends TemplateItemContext {
	constructor(parser: fhirliquidParser, ctx: TemplateItemContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public forStatement(): ForStatementContext {
		return this.getTypedRuleContext(ForStatementContext, 0) as ForStatementContext;
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterForItem) {
	 		listener.enterForItem(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitForItem) {
	 		listener.exitForItem(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitForItem) {
			return visitor.visitForItem(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LegacyLoopItemContext extends TemplateItemContext {
	constructor(parser: fhirliquidParser, ctx: TemplateItemContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public legacyLoopStatement(): LegacyLoopStatementContext {
		return this.getTypedRuleContext(LegacyLoopStatementContext, 0) as LegacyLoopStatementContext;
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterLegacyLoopItem) {
	 		listener.enterLegacyLoopItem(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitLegacyLoopItem) {
	 		listener.exitLegacyLoopItem(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitLegacyLoopItem) {
			return visitor.visitLegacyLoopItem(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TextItemContext extends TemplateItemContext {
	constructor(parser: fhirliquidParser, ctx: TemplateItemContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public TEXT(): TerminalNode {
		return this.getToken(fhirliquidParser.TEXT, 0);
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterTextItem) {
	 		listener.enterTextItem(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitTextItem) {
	 		listener.exitTextItem(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitTextItem) {
			return visitor.visitTextItem(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class CaptureItemContext extends TemplateItemContext {
	constructor(parser: fhirliquidParser, ctx: TemplateItemContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public captureStatement(): CaptureStatementContext {
		return this.getTypedRuleContext(CaptureStatementContext, 0) as CaptureStatementContext;
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterCaptureItem) {
	 		listener.enterCaptureItem(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitCaptureItem) {
	 		listener.exitCaptureItem(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitCaptureItem) {
			return visitor.visitCaptureItem(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class OutputItemContext extends TemplateItemContext {
	constructor(parser: fhirliquidParser, ctx: TemplateItemContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public outputStatement(): OutputStatementContext {
		return this.getTypedRuleContext(OutputStatementContext, 0) as OutputStatementContext;
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterOutputItem) {
	 		listener.enterOutputItem(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitOutputItem) {
	 		listener.exitOutputItem(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitOutputItem) {
			return visitor.visitOutputItem(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AssignItemContext extends TemplateItemContext {
	constructor(parser: fhirliquidParser, ctx: TemplateItemContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public assignStatement(): AssignStatementContext {
		return this.getTypedRuleContext(AssignStatementContext, 0) as AssignStatementContext;
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterAssignItem) {
	 		listener.enterAssignItem(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitAssignItem) {
	 		listener.exitAssignItem(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitAssignItem) {
			return visitor.visitAssignItem(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class IncludeItemContext extends TemplateItemContext {
	constructor(parser: fhirliquidParser, ctx: TemplateItemContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public includeStatement(): IncludeStatementContext {
		return this.getTypedRuleContext(IncludeStatementContext, 0) as IncludeStatementContext;
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterIncludeItem) {
	 		listener.enterIncludeItem(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitIncludeItem) {
	 		listener.exitIncludeItem(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitIncludeItem) {
			return visitor.visitIncludeItem(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class IfItemContext extends TemplateItemContext {
	constructor(parser: fhirliquidParser, ctx: TemplateItemContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public ifStatement(): IfStatementContext {
		return this.getTypedRuleContext(IfStatementContext, 0) as IfStatementContext;
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterIfItem) {
	 		listener.enterIfItem(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitIfItem) {
	 		listener.exitIfItem(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitIfItem) {
			return visitor.visitIfItem(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LoopItemContext extends ParserRuleContext {
	constructor(parser?: fhirliquidParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return fhirliquidParser.RULE_loopItem;
	}
	public override copyFrom(ctx: LoopItemContext): void {
		super.copyFrom(ctx);
	}
}
export class LoopIfItemContext extends LoopItemContext {
	constructor(parser: fhirliquidParser, ctx: LoopItemContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public loopIfStatement(): LoopIfStatementContext {
		return this.getTypedRuleContext(LoopIfStatementContext, 0) as LoopIfStatementContext;
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterLoopIfItem) {
	 		listener.enterLoopIfItem(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitLoopIfItem) {
	 		listener.exitLoopIfItem(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitLoopIfItem) {
			return visitor.visitLoopIfItem(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class CycleItemContext extends LoopItemContext {
	constructor(parser: fhirliquidParser, ctx: LoopItemContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public cycleStatement(): CycleStatementContext {
		return this.getTypedRuleContext(CycleStatementContext, 0) as CycleStatementContext;
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterCycleItem) {
	 		listener.enterCycleItem(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitCycleItem) {
	 		listener.exitCycleItem(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitCycleItem) {
			return visitor.visitCycleItem(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LoopTextItemContext extends LoopItemContext {
	constructor(parser: fhirliquidParser, ctx: LoopItemContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public TEXT(): TerminalNode {
		return this.getToken(fhirliquidParser.TEXT, 0);
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterLoopTextItem) {
	 		listener.enterLoopTextItem(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitLoopTextItem) {
	 		listener.exitLoopTextItem(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitLoopTextItem) {
			return visitor.visitLoopTextItem(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NestedLegacyLoopItemContext extends LoopItemContext {
	constructor(parser: fhirliquidParser, ctx: LoopItemContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public legacyLoopStatement(): LegacyLoopStatementContext {
		return this.getTypedRuleContext(LegacyLoopStatementContext, 0) as LegacyLoopStatementContext;
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterNestedLegacyLoopItem) {
	 		listener.enterNestedLegacyLoopItem(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitNestedLegacyLoopItem) {
	 		listener.exitNestedLegacyLoopItem(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitNestedLegacyLoopItem) {
			return visitor.visitNestedLegacyLoopItem(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LoopAssignItemContext extends LoopItemContext {
	constructor(parser: fhirliquidParser, ctx: LoopItemContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public assignStatement(): AssignStatementContext {
		return this.getTypedRuleContext(AssignStatementContext, 0) as AssignStatementContext;
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterLoopAssignItem) {
	 		listener.enterLoopAssignItem(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitLoopAssignItem) {
	 		listener.exitLoopAssignItem(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitLoopAssignItem) {
			return visitor.visitLoopAssignItem(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ContinueItemContext extends LoopItemContext {
	constructor(parser: fhirliquidParser, ctx: LoopItemContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public continueStatement(): ContinueStatementContext {
		return this.getTypedRuleContext(ContinueStatementContext, 0) as ContinueStatementContext;
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterContinueItem) {
	 		listener.enterContinueItem(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitContinueItem) {
	 		listener.exitContinueItem(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitContinueItem) {
			return visitor.visitContinueItem(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NestedForItemContext extends LoopItemContext {
	constructor(parser: fhirliquidParser, ctx: LoopItemContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public forStatement(): ForStatementContext {
		return this.getTypedRuleContext(ForStatementContext, 0) as ForStatementContext;
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterNestedForItem) {
	 		listener.enterNestedForItem(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitNestedForItem) {
	 		listener.exitNestedForItem(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitNestedForItem) {
			return visitor.visitNestedForItem(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class BreakItemContext extends LoopItemContext {
	constructor(parser: fhirliquidParser, ctx: LoopItemContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public breakStatement(): BreakStatementContext {
		return this.getTypedRuleContext(BreakStatementContext, 0) as BreakStatementContext;
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterBreakItem) {
	 		listener.enterBreakItem(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitBreakItem) {
	 		listener.exitBreakItem(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitBreakItem) {
			return visitor.visitBreakItem(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LoopIncludeItemContext extends LoopItemContext {
	constructor(parser: fhirliquidParser, ctx: LoopItemContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public includeStatement(): IncludeStatementContext {
		return this.getTypedRuleContext(IncludeStatementContext, 0) as IncludeStatementContext;
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterLoopIncludeItem) {
	 		listener.enterLoopIncludeItem(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitLoopIncludeItem) {
	 		listener.exitLoopIncludeItem(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitLoopIncludeItem) {
			return visitor.visitLoopIncludeItem(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LoopCaptureItemContext extends LoopItemContext {
	constructor(parser: fhirliquidParser, ctx: LoopItemContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public captureStatement(): CaptureStatementContext {
		return this.getTypedRuleContext(CaptureStatementContext, 0) as CaptureStatementContext;
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterLoopCaptureItem) {
	 		listener.enterLoopCaptureItem(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitLoopCaptureItem) {
	 		listener.exitLoopCaptureItem(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitLoopCaptureItem) {
			return visitor.visitLoopCaptureItem(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LoopOutputItemContext extends LoopItemContext {
	constructor(parser: fhirliquidParser, ctx: LoopItemContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public outputStatement(): OutputStatementContext {
		return this.getTypedRuleContext(OutputStatementContext, 0) as OutputStatementContext;
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterLoopOutputItem) {
	 		listener.enterLoopOutputItem(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitLoopOutputItem) {
	 		listener.exitLoopOutputItem(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitLoopOutputItem) {
			return visitor.visitLoopOutputItem(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class OutputStatementContext extends ParserRuleContext {
	constructor(parser?: fhirliquidParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public OPEN_OUTPUT(): TerminalNode {
		return this.getToken(fhirliquidParser.OPEN_OUTPUT, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public CLOSE_OUTPUT(): TerminalNode {
		return this.getToken(fhirliquidParser.CLOSE_OUTPUT, 0);
	}
	public filter_list(): FilterContext[] {
		return this.getTypedRuleContexts(FilterContext) as FilterContext[];
	}
	public filter(i: number): FilterContext {
		return this.getTypedRuleContext(FilterContext, i) as FilterContext;
	}
    public get ruleIndex(): number {
    	return fhirliquidParser.RULE_outputStatement;
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterOutputStatement) {
	 		listener.enterOutputStatement(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitOutputStatement) {
	 		listener.exitOutputStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitOutputStatement) {
			return visitor.visitOutputStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FilterContext extends ParserRuleContext {
	constructor(parser?: fhirliquidParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public FILTER_SEPARATOR(): TerminalNode {
		return this.getToken(fhirliquidParser.FILTER_SEPARATOR, 0);
	}
	public filterName(): FilterNameContext {
		return this.getTypedRuleContext(FilterNameContext, 0) as FilterNameContext;
	}
	public COLON(): TerminalNode {
		return this.getToken(fhirliquidParser.COLON, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
    public get ruleIndex(): number {
    	return fhirliquidParser.RULE_filter;
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterFilter) {
	 		listener.enterFilter(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitFilter) {
	 		listener.exitFilter(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitFilter) {
			return visitor.visitFilter(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FilterNameContext extends ParserRuleContext {
	constructor(parser?: fhirliquidParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public PREPEND(): TerminalNode {
		return this.getToken(fhirliquidParser.PREPEND, 0);
	}
	public MARKDOWNIFY(): TerminalNode {
		return this.getToken(fhirliquidParser.MARKDOWNIFY, 0);
	}
	public UPCASE(): TerminalNode {
		return this.getToken(fhirliquidParser.UPCASE, 0);
	}
	public DOWNCASE(): TerminalNode {
		return this.getToken(fhirliquidParser.DOWNCASE, 0);
	}
    public get ruleIndex(): number {
    	return fhirliquidParser.RULE_filterName;
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterFilterName) {
	 		listener.enterFilterName(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitFilterName) {
	 		listener.exitFilterName(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitFilterName) {
			return visitor.visitFilterName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IfStatementContext extends ParserRuleContext {
	constructor(parser?: fhirliquidParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public OPEN_CONTROL_list(): TerminalNode[] {
	    	return this.getTokens(fhirliquidParser.OPEN_CONTROL);
	}
	public OPEN_CONTROL(i: number): TerminalNode {
		return this.getToken(fhirliquidParser.OPEN_CONTROL, i);
	}
	public IF(): TerminalNode {
		return this.getToken(fhirliquidParser.IF, 0);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public CLOSE_CONTROL_list(): TerminalNode[] {
	    	return this.getTokens(fhirliquidParser.CLOSE_CONTROL);
	}
	public CLOSE_CONTROL(i: number): TerminalNode {
		return this.getToken(fhirliquidParser.CLOSE_CONTROL, i);
	}
	public ENDIF(): TerminalNode {
		return this.getToken(fhirliquidParser.ENDIF, 0);
	}
	public templateItem_list(): TemplateItemContext[] {
		return this.getTypedRuleContexts(TemplateItemContext) as TemplateItemContext[];
	}
	public templateItem(i: number): TemplateItemContext {
		return this.getTypedRuleContext(TemplateItemContext, i) as TemplateItemContext;
	}
	public ELSIF_list(): TerminalNode[] {
	    	return this.getTokens(fhirliquidParser.ELSIF);
	}
	public ELSIF(i: number): TerminalNode {
		return this.getToken(fhirliquidParser.ELSIF, i);
	}
	public ELSE(): TerminalNode {
		return this.getToken(fhirliquidParser.ELSE, 0);
	}
    public get ruleIndex(): number {
    	return fhirliquidParser.RULE_ifStatement;
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterIfStatement) {
	 		listener.enterIfStatement(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitIfStatement) {
	 		listener.exitIfStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitIfStatement) {
			return visitor.visitIfStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LoopIfStatementContext extends ParserRuleContext {
	constructor(parser?: fhirliquidParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public OPEN_CONTROL_list(): TerminalNode[] {
	    	return this.getTokens(fhirliquidParser.OPEN_CONTROL);
	}
	public OPEN_CONTROL(i: number): TerminalNode {
		return this.getToken(fhirliquidParser.OPEN_CONTROL, i);
	}
	public IF(): TerminalNode {
		return this.getToken(fhirliquidParser.IF, 0);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public CLOSE_CONTROL_list(): TerminalNode[] {
	    	return this.getTokens(fhirliquidParser.CLOSE_CONTROL);
	}
	public CLOSE_CONTROL(i: number): TerminalNode {
		return this.getToken(fhirliquidParser.CLOSE_CONTROL, i);
	}
	public ENDIF(): TerminalNode {
		return this.getToken(fhirliquidParser.ENDIF, 0);
	}
	public loopItem_list(): LoopItemContext[] {
		return this.getTypedRuleContexts(LoopItemContext) as LoopItemContext[];
	}
	public loopItem(i: number): LoopItemContext {
		return this.getTypedRuleContext(LoopItemContext, i) as LoopItemContext;
	}
	public ELSIF_list(): TerminalNode[] {
	    	return this.getTokens(fhirliquidParser.ELSIF);
	}
	public ELSIF(i: number): TerminalNode {
		return this.getToken(fhirliquidParser.ELSIF, i);
	}
	public ELSE(): TerminalNode {
		return this.getToken(fhirliquidParser.ELSE, 0);
	}
    public get ruleIndex(): number {
    	return fhirliquidParser.RULE_loopIfStatement;
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterLoopIfStatement) {
	 		listener.enterLoopIfStatement(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitLoopIfStatement) {
	 		listener.exitLoopIfStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitLoopIfStatement) {
			return visitor.visitLoopIfStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ForStatementContext extends ParserRuleContext {
	constructor(parser?: fhirliquidParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public OPEN_CONTROL_list(): TerminalNode[] {
	    	return this.getTokens(fhirliquidParser.OPEN_CONTROL);
	}
	public OPEN_CONTROL(i: number): TerminalNode {
		return this.getToken(fhirliquidParser.OPEN_CONTROL, i);
	}
	public FOR(): TerminalNode {
		return this.getToken(fhirliquidParser.FOR, 0);
	}
	public variableName(): VariableNameContext {
		return this.getTypedRuleContext(VariableNameContext, 0) as VariableNameContext;
	}
	public IN(): TerminalNode {
		return this.getToken(fhirliquidParser.IN, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public CLOSE_CONTROL_list(): TerminalNode[] {
	    	return this.getTokens(fhirliquidParser.CLOSE_CONTROL);
	}
	public CLOSE_CONTROL(i: number): TerminalNode {
		return this.getToken(fhirliquidParser.CLOSE_CONTROL, i);
	}
	public ENDFOR(): TerminalNode {
		return this.getToken(fhirliquidParser.ENDFOR, 0);
	}
	public forModifier_list(): ForModifierContext[] {
		return this.getTypedRuleContexts(ForModifierContext) as ForModifierContext[];
	}
	public forModifier(i: number): ForModifierContext {
		return this.getTypedRuleContext(ForModifierContext, i) as ForModifierContext;
	}
	public loopItem_list(): LoopItemContext[] {
		return this.getTypedRuleContexts(LoopItemContext) as LoopItemContext[];
	}
	public loopItem(i: number): LoopItemContext {
		return this.getTypedRuleContext(LoopItemContext, i) as LoopItemContext;
	}
	public ELSE(): TerminalNode {
		return this.getToken(fhirliquidParser.ELSE, 0);
	}
	public templateItem_list(): TemplateItemContext[] {
		return this.getTypedRuleContexts(TemplateItemContext) as TemplateItemContext[];
	}
	public templateItem(i: number): TemplateItemContext {
		return this.getTypedRuleContext(TemplateItemContext, i) as TemplateItemContext;
	}
    public get ruleIndex(): number {
    	return fhirliquidParser.RULE_forStatement;
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterForStatement) {
	 		listener.enterForStatement(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitForStatement) {
	 		listener.exitForStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitForStatement) {
			return visitor.visitForStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LegacyLoopStatementContext extends ParserRuleContext {
	constructor(parser?: fhirliquidParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public OPEN_CONTROL_list(): TerminalNode[] {
	    	return this.getTokens(fhirliquidParser.OPEN_CONTROL);
	}
	public OPEN_CONTROL(i: number): TerminalNode {
		return this.getToken(fhirliquidParser.OPEN_CONTROL, i);
	}
	public LOOP(): TerminalNode {
		return this.getToken(fhirliquidParser.LOOP, 0);
	}
	public variableName(): VariableNameContext {
		return this.getTypedRuleContext(VariableNameContext, 0) as VariableNameContext;
	}
	public IN(): TerminalNode {
		return this.getToken(fhirliquidParser.IN, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public CLOSE_CONTROL_list(): TerminalNode[] {
	    	return this.getTokens(fhirliquidParser.CLOSE_CONTROL);
	}
	public CLOSE_CONTROL(i: number): TerminalNode {
		return this.getToken(fhirliquidParser.CLOSE_CONTROL, i);
	}
	public ENDLOOP(): TerminalNode {
		return this.getToken(fhirliquidParser.ENDLOOP, 0);
	}
	public forModifier_list(): ForModifierContext[] {
		return this.getTypedRuleContexts(ForModifierContext) as ForModifierContext[];
	}
	public forModifier(i: number): ForModifierContext {
		return this.getTypedRuleContext(ForModifierContext, i) as ForModifierContext;
	}
	public templateItem_list(): TemplateItemContext[] {
		return this.getTypedRuleContexts(TemplateItemContext) as TemplateItemContext[];
	}
	public templateItem(i: number): TemplateItemContext {
		return this.getTypedRuleContext(TemplateItemContext, i) as TemplateItemContext;
	}
    public get ruleIndex(): number {
    	return fhirliquidParser.RULE_legacyLoopStatement;
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterLegacyLoopStatement) {
	 		listener.enterLegacyLoopStatement(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitLegacyLoopStatement) {
	 		listener.exitLegacyLoopStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitLegacyLoopStatement) {
			return visitor.visitLegacyLoopStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ForModifierContext extends ParserRuleContext {
	constructor(parser?: fhirliquidParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public REVERSED(): TerminalNode {
		return this.getToken(fhirliquidParser.REVERSED, 0);
	}
	public LIMIT(): TerminalNode {
		return this.getToken(fhirliquidParser.LIMIT, 0);
	}
	public COLON(): TerminalNode {
		return this.getToken(fhirliquidParser.COLON, 0);
	}
	public INTEGER(): TerminalNode {
		return this.getToken(fhirliquidParser.INTEGER, 0);
	}
	public OFFSET(): TerminalNode {
		return this.getToken(fhirliquidParser.OFFSET, 0);
	}
    public get ruleIndex(): number {
    	return fhirliquidParser.RULE_forModifier;
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterForModifier) {
	 		listener.enterForModifier(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitForModifier) {
	 		listener.exitForModifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitForModifier) {
			return visitor.visitForModifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CaptureStatementContext extends ParserRuleContext {
	constructor(parser?: fhirliquidParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public OPEN_CONTROL_list(): TerminalNode[] {
	    	return this.getTokens(fhirliquidParser.OPEN_CONTROL);
	}
	public OPEN_CONTROL(i: number): TerminalNode {
		return this.getToken(fhirliquidParser.OPEN_CONTROL, i);
	}
	public CAPTURE(): TerminalNode {
		return this.getToken(fhirliquidParser.CAPTURE, 0);
	}
	public variableName(): VariableNameContext {
		return this.getTypedRuleContext(VariableNameContext, 0) as VariableNameContext;
	}
	public CLOSE_CONTROL_list(): TerminalNode[] {
	    	return this.getTokens(fhirliquidParser.CLOSE_CONTROL);
	}
	public CLOSE_CONTROL(i: number): TerminalNode {
		return this.getToken(fhirliquidParser.CLOSE_CONTROL, i);
	}
	public ENDCAPTURE(): TerminalNode {
		return this.getToken(fhirliquidParser.ENDCAPTURE, 0);
	}
	public loopItem_list(): LoopItemContext[] {
		return this.getTypedRuleContexts(LoopItemContext) as LoopItemContext[];
	}
	public loopItem(i: number): LoopItemContext {
		return this.getTypedRuleContext(LoopItemContext, i) as LoopItemContext;
	}
    public get ruleIndex(): number {
    	return fhirliquidParser.RULE_captureStatement;
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterCaptureStatement) {
	 		listener.enterCaptureStatement(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitCaptureStatement) {
	 		listener.exitCaptureStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitCaptureStatement) {
			return visitor.visitCaptureStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IncludeStatementContext extends ParserRuleContext {
	constructor(parser?: fhirliquidParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public OPEN_CONTROL(): TerminalNode {
		return this.getToken(fhirliquidParser.OPEN_CONTROL, 0);
	}
	public INCLUDE(): TerminalNode {
		return this.getToken(fhirliquidParser.INCLUDE, 0);
	}
	public includeName(): IncludeNameContext {
		return this.getTypedRuleContext(IncludeNameContext, 0) as IncludeNameContext;
	}
	public CLOSE_CONTROL(): TerminalNode {
		return this.getToken(fhirliquidParser.CLOSE_CONTROL, 0);
	}
	public includeParameter_list(): IncludeParameterContext[] {
		return this.getTypedRuleContexts(IncludeParameterContext) as IncludeParameterContext[];
	}
	public includeParameter(i: number): IncludeParameterContext {
		return this.getTypedRuleContext(IncludeParameterContext, i) as IncludeParameterContext;
	}
    public get ruleIndex(): number {
    	return fhirliquidParser.RULE_includeStatement;
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterIncludeStatement) {
	 		listener.enterIncludeStatement(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitIncludeStatement) {
	 		listener.exitIncludeStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitIncludeStatement) {
			return visitor.visitIncludeStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IncludeNameContext extends ParserRuleContext {
	constructor(parser?: fhirliquidParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifier_list(): IdentifierContext[] {
		return this.getTypedRuleContexts(IdentifierContext) as IdentifierContext[];
	}
	public identifier(i: number): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, i) as IdentifierContext;
	}
	public DOT_list(): TerminalNode[] {
	    	return this.getTokens(fhirliquidParser.DOT);
	}
	public DOT(i: number): TerminalNode {
		return this.getToken(fhirliquidParser.DOT, i);
	}
	public MINUS_list(): TerminalNode[] {
	    	return this.getTokens(fhirliquidParser.MINUS);
	}
	public MINUS(i: number): TerminalNode {
		return this.getToken(fhirliquidParser.MINUS, i);
	}
	public SLASH_list(): TerminalNode[] {
	    	return this.getTokens(fhirliquidParser.SLASH);
	}
	public SLASH(i: number): TerminalNode {
		return this.getToken(fhirliquidParser.SLASH, i);
	}
    public get ruleIndex(): number {
    	return fhirliquidParser.RULE_includeName;
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterIncludeName) {
	 		listener.enterIncludeName(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitIncludeName) {
	 		listener.exitIncludeName(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitIncludeName) {
			return visitor.visitIncludeName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IncludeParameterContext extends ParserRuleContext {
	constructor(parser?: fhirliquidParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public variableName(): VariableNameContext {
		return this.getTypedRuleContext(VariableNameContext, 0) as VariableNameContext;
	}
	public EQUAL(): TerminalNode {
		return this.getToken(fhirliquidParser.EQUAL, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
    public get ruleIndex(): number {
    	return fhirliquidParser.RULE_includeParameter;
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterIncludeParameter) {
	 		listener.enterIncludeParameter(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitIncludeParameter) {
	 		listener.exitIncludeParameter(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitIncludeParameter) {
			return visitor.visitIncludeParameter(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AssignStatementContext extends ParserRuleContext {
	constructor(parser?: fhirliquidParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public OPEN_CONTROL(): TerminalNode {
		return this.getToken(fhirliquidParser.OPEN_CONTROL, 0);
	}
	public ASSIGN(): TerminalNode {
		return this.getToken(fhirliquidParser.ASSIGN, 0);
	}
	public variableName(): VariableNameContext {
		return this.getTypedRuleContext(VariableNameContext, 0) as VariableNameContext;
	}
	public EQUAL(): TerminalNode {
		return this.getToken(fhirliquidParser.EQUAL, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public CLOSE_CONTROL(): TerminalNode {
		return this.getToken(fhirliquidParser.CLOSE_CONTROL, 0);
	}
    public get ruleIndex(): number {
    	return fhirliquidParser.RULE_assignStatement;
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterAssignStatement) {
	 		listener.enterAssignStatement(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitAssignStatement) {
	 		listener.exitAssignStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitAssignStatement) {
			return visitor.visitAssignStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BreakStatementContext extends ParserRuleContext {
	constructor(parser?: fhirliquidParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public OPEN_CONTROL(): TerminalNode {
		return this.getToken(fhirliquidParser.OPEN_CONTROL, 0);
	}
	public BREAK(): TerminalNode {
		return this.getToken(fhirliquidParser.BREAK, 0);
	}
	public CLOSE_CONTROL(): TerminalNode {
		return this.getToken(fhirliquidParser.CLOSE_CONTROL, 0);
	}
    public get ruleIndex(): number {
    	return fhirliquidParser.RULE_breakStatement;
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterBreakStatement) {
	 		listener.enterBreakStatement(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitBreakStatement) {
	 		listener.exitBreakStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitBreakStatement) {
			return visitor.visitBreakStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ContinueStatementContext extends ParserRuleContext {
	constructor(parser?: fhirliquidParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public OPEN_CONTROL(): TerminalNode {
		return this.getToken(fhirliquidParser.OPEN_CONTROL, 0);
	}
	public CONTINUE(): TerminalNode {
		return this.getToken(fhirliquidParser.CONTINUE, 0);
	}
	public CLOSE_CONTROL(): TerminalNode {
		return this.getToken(fhirliquidParser.CLOSE_CONTROL, 0);
	}
    public get ruleIndex(): number {
    	return fhirliquidParser.RULE_continueStatement;
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterContinueStatement) {
	 		listener.enterContinueStatement(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitContinueStatement) {
	 		listener.exitContinueStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitContinueStatement) {
			return visitor.visitContinueStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CycleStatementContext extends ParserRuleContext {
	constructor(parser?: fhirliquidParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public OPEN_CONTROL(): TerminalNode {
		return this.getToken(fhirliquidParser.OPEN_CONTROL, 0);
	}
	public CYCLE(): TerminalNode {
		return this.getToken(fhirliquidParser.CYCLE, 0);
	}
	public DOUBLE_QUOTED_STRING_list(): TerminalNode[] {
	    	return this.getTokens(fhirliquidParser.DOUBLE_QUOTED_STRING);
	}
	public DOUBLE_QUOTED_STRING(i: number): TerminalNode {
		return this.getToken(fhirliquidParser.DOUBLE_QUOTED_STRING, i);
	}
	public CLOSE_CONTROL(): TerminalNode {
		return this.getToken(fhirliquidParser.CLOSE_CONTROL, 0);
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(fhirliquidParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(fhirliquidParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return fhirliquidParser.RULE_cycleStatement;
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterCycleStatement) {
	 		listener.enterCycleStatement(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitCycleStatement) {
	 		listener.exitCycleStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitCycleStatement) {
			return visitor.visitCycleStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class VariableNameContext extends ParserRuleContext {
	constructor(parser?: fhirliquidParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
    public get ruleIndex(): number {
    	return fhirliquidParser.RULE_variableName;
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterVariableName) {
	 		listener.enterVariableName(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitVariableName) {
	 		listener.exitVariableName(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitVariableName) {
			return visitor.visitVariableName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LiteralContext extends ParserRuleContext {
	constructor(parser?: fhirliquidParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return fhirliquidParser.RULE_literal;
	}
	public override copyFrom(ctx: LiteralContext): void {
		super.copyFrom(ctx);
	}
}
export class TimeLiteralContext extends LiteralContext {
	constructor(parser: fhirliquidParser, ctx: LiteralContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public TIME(): TerminalNode {
		return this.getToken(fhirliquidParser.TIME, 0);
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterTimeLiteral) {
	 		listener.enterTimeLiteral(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitTimeLiteral) {
	 		listener.exitTimeLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitTimeLiteral) {
			return visitor.visitTimeLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NullLiteralContext extends LiteralContext {
	constructor(parser: fhirliquidParser, ctx: LiteralContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public LBRACE(): TerminalNode {
		return this.getToken(fhirliquidParser.LBRACE, 0);
	}
	public RBRACE(): TerminalNode {
		return this.getToken(fhirliquidParser.RBRACE, 0);
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterNullLiteral) {
	 		listener.enterNullLiteral(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitNullLiteral) {
	 		listener.exitNullLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitNullLiteral) {
			return visitor.visitNullLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DateTimeLiteralContext extends LiteralContext {
	constructor(parser: fhirliquidParser, ctx: LiteralContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public DATETIME(): TerminalNode {
		return this.getToken(fhirliquidParser.DATETIME, 0);
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterDateTimeLiteral) {
	 		listener.enterDateTimeLiteral(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitDateTimeLiteral) {
	 		listener.exitDateTimeLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitDateTimeLiteral) {
			return visitor.visitDateTimeLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class StringLiteralContext extends LiteralContext {
	constructor(parser: fhirliquidParser, ctx: LiteralContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public STRING(): TerminalNode {
		return this.getToken(fhirliquidParser.STRING, 0);
	}
	public DOUBLE_QUOTED_STRING(): TerminalNode {
		return this.getToken(fhirliquidParser.DOUBLE_QUOTED_STRING, 0);
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterStringLiteral) {
	 		listener.enterStringLiteral(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitStringLiteral) {
	 		listener.exitStringLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitStringLiteral) {
			return visitor.visitStringLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DateLiteralContext extends LiteralContext {
	constructor(parser: fhirliquidParser, ctx: LiteralContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public DATE(): TerminalNode {
		return this.getToken(fhirliquidParser.DATE, 0);
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterDateLiteral) {
	 		listener.enterDateLiteral(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitDateLiteral) {
	 		listener.exitDateLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitDateLiteral) {
			return visitor.visitDateLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class BooleanLiteralContext extends LiteralContext {
	constructor(parser: fhirliquidParser, ctx: LiteralContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public TRUE(): TerminalNode {
		return this.getToken(fhirliquidParser.TRUE, 0);
	}
	public FALSE(): TerminalNode {
		return this.getToken(fhirliquidParser.FALSE, 0);
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterBooleanLiteral) {
	 		listener.enterBooleanLiteral(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitBooleanLiteral) {
	 		listener.exitBooleanLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitBooleanLiteral) {
			return visitor.visitBooleanLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NumberLiteralContext extends LiteralContext {
	constructor(parser: fhirliquidParser, ctx: LiteralContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public INTEGER(): TerminalNode {
		return this.getToken(fhirliquidParser.INTEGER, 0);
	}
	public DECIMAL(): TerminalNode {
		return this.getToken(fhirliquidParser.DECIMAL, 0);
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterNumberLiteral) {
	 		listener.enterNumberLiteral(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitNumberLiteral) {
	 		listener.exitNumberLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitNumberLiteral) {
			return visitor.visitNumberLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LongNumberLiteralContext extends LiteralContext {
	constructor(parser: fhirliquidParser, ctx: LiteralContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public LONGNUMBER(): TerminalNode {
		return this.getToken(fhirliquidParser.LONGNUMBER, 0);
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterLongNumberLiteral) {
	 		listener.enterLongNumberLiteral(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitLongNumberLiteral) {
	 		listener.exitLongNumberLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitLongNumberLiteral) {
			return visitor.visitLongNumberLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class QuantityLiteralContext extends LiteralContext {
	constructor(parser: fhirliquidParser, ctx: LiteralContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public quantity(): QuantityContext {
		return this.getTypedRuleContext(QuantityContext, 0) as QuantityContext;
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterQuantityLiteral) {
	 		listener.enterQuantityLiteral(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitQuantityLiteral) {
	 		listener.exitQuantityLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitQuantityLiteral) {
			return visitor.visitQuantityLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExternalConstantContext extends ParserRuleContext {
	constructor(parser?: fhirliquidParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public PERCENT(): TerminalNode {
		return this.getToken(fhirliquidParser.PERCENT, 0);
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
	public STRING(): TerminalNode {
		return this.getToken(fhirliquidParser.STRING, 0);
	}
	public DOUBLE_QUOTED_STRING(): TerminalNode {
		return this.getToken(fhirliquidParser.DOUBLE_QUOTED_STRING, 0);
	}
    public get ruleIndex(): number {
    	return fhirliquidParser.RULE_externalConstant;
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterExternalConstant) {
	 		listener.enterExternalConstant(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitExternalConstant) {
	 		listener.exitExternalConstant(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitExternalConstant) {
			return visitor.visitExternalConstant(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IdentifierContext extends ParserRuleContext {
	constructor(parser?: fhirliquidParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(fhirliquidParser.IDENTIFIER, 0);
	}
	public DELIMITEDIDENTIFIER(): TerminalNode {
		return this.getToken(fhirliquidParser.DELIMITEDIDENTIFIER, 0);
	}
	public AS(): TerminalNode {
		return this.getToken(fhirliquidParser.AS, 0);
	}
	public CONTAINS(): TerminalNode {
		return this.getToken(fhirliquidParser.CONTAINS, 0);
	}
	public IN(): TerminalNode {
		return this.getToken(fhirliquidParser.IN, 0);
	}
	public IS(): TerminalNode {
		return this.getToken(fhirliquidParser.IS, 0);
	}
	public ASC(): TerminalNode {
		return this.getToken(fhirliquidParser.ASC, 0);
	}
	public DESC(): TerminalNode {
		return this.getToken(fhirliquidParser.DESC, 0);
	}
	public SORT(): TerminalNode {
		return this.getToken(fhirliquidParser.SORT, 0);
	}
	public IF(): TerminalNode {
		return this.getToken(fhirliquidParser.IF, 0);
	}
	public ELSIF(): TerminalNode {
		return this.getToken(fhirliquidParser.ELSIF, 0);
	}
	public ELSE(): TerminalNode {
		return this.getToken(fhirliquidParser.ELSE, 0);
	}
	public ENDIF(): TerminalNode {
		return this.getToken(fhirliquidParser.ENDIF, 0);
	}
	public FOR(): TerminalNode {
		return this.getToken(fhirliquidParser.FOR, 0);
	}
	public ENDFOR(): TerminalNode {
		return this.getToken(fhirliquidParser.ENDFOR, 0);
	}
	public LOOP(): TerminalNode {
		return this.getToken(fhirliquidParser.LOOP, 0);
	}
	public ENDLOOP(): TerminalNode {
		return this.getToken(fhirliquidParser.ENDLOOP, 0);
	}
	public REVERSED(): TerminalNode {
		return this.getToken(fhirliquidParser.REVERSED, 0);
	}
	public LIMIT(): TerminalNode {
		return this.getToken(fhirliquidParser.LIMIT, 0);
	}
	public OFFSET(): TerminalNode {
		return this.getToken(fhirliquidParser.OFFSET, 0);
	}
	public INCLUDE(): TerminalNode {
		return this.getToken(fhirliquidParser.INCLUDE, 0);
	}
	public ASSIGN(): TerminalNode {
		return this.getToken(fhirliquidParser.ASSIGN, 0);
	}
	public CAPTURE(): TerminalNode {
		return this.getToken(fhirliquidParser.CAPTURE, 0);
	}
	public ENDCAPTURE(): TerminalNode {
		return this.getToken(fhirliquidParser.ENDCAPTURE, 0);
	}
	public BREAK(): TerminalNode {
		return this.getToken(fhirliquidParser.BREAK, 0);
	}
	public CONTINUE(): TerminalNode {
		return this.getToken(fhirliquidParser.CONTINUE, 0);
	}
	public CYCLE(): TerminalNode {
		return this.getToken(fhirliquidParser.CYCLE, 0);
	}
	public PREPEND(): TerminalNode {
		return this.getToken(fhirliquidParser.PREPEND, 0);
	}
	public MARKDOWNIFY(): TerminalNode {
		return this.getToken(fhirliquidParser.MARKDOWNIFY, 0);
	}
	public UPCASE(): TerminalNode {
		return this.getToken(fhirliquidParser.UPCASE, 0);
	}
	public DOWNCASE(): TerminalNode {
		return this.getToken(fhirliquidParser.DOWNCASE, 0);
	}
    public get ruleIndex(): number {
    	return fhirliquidParser.RULE_identifier;
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterIdentifier) {
	 		listener.enterIdentifier(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitIdentifier) {
	 		listener.exitIdentifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitIdentifier) {
			return visitor.visitIdentifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EntireExpressionContext extends ParserRuleContext {
	constructor(parser?: fhirliquidParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public EOF(): TerminalNode {
		return this.getToken(fhirliquidParser.EOF, 0);
	}
    public get ruleIndex(): number {
    	return fhirliquidParser.RULE_entireExpression;
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterEntireExpression) {
	 		listener.enterEntireExpression(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitEntireExpression) {
	 		listener.exitEntireExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitEntireExpression) {
			return visitor.visitEntireExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionContext extends ParserRuleContext {
	constructor(parser?: fhirliquidParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return fhirliquidParser.RULE_expression;
	}
	public override copyFrom(ctx: ExpressionContext): void {
		super.copyFrom(ctx);
	}
}
export class IndexerExpressionContext extends ExpressionContext {
	constructor(parser: fhirliquidParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public LBRACKET(): TerminalNode {
		return this.getToken(fhirliquidParser.LBRACKET, 0);
	}
	public RBRACKET(): TerminalNode {
		return this.getToken(fhirliquidParser.RBRACKET, 0);
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterIndexerExpression) {
	 		listener.enterIndexerExpression(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitIndexerExpression) {
	 		listener.exitIndexerExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitIndexerExpression) {
			return visitor.visitIndexerExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class PolarityExpressionContext extends ExpressionContext {
	constructor(parser: fhirliquidParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public PLUS(): TerminalNode {
		return this.getToken(fhirliquidParser.PLUS, 0);
	}
	public MINUS(): TerminalNode {
		return this.getToken(fhirliquidParser.MINUS, 0);
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterPolarityExpression) {
	 		listener.enterPolarityExpression(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitPolarityExpression) {
	 		listener.exitPolarityExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitPolarityExpression) {
			return visitor.visitPolarityExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AdditiveExpressionContext extends ExpressionContext {
	constructor(parser: fhirliquidParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public PLUS(): TerminalNode {
		return this.getToken(fhirliquidParser.PLUS, 0);
	}
	public MINUS(): TerminalNode {
		return this.getToken(fhirliquidParser.MINUS, 0);
	}
	public AMPERSAND(): TerminalNode {
		return this.getToken(fhirliquidParser.AMPERSAND, 0);
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterAdditiveExpression) {
	 		listener.enterAdditiveExpression(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitAdditiveExpression) {
	 		listener.exitAdditiveExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitAdditiveExpression) {
			return visitor.visitAdditiveExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class MultiplicativeExpressionContext extends ExpressionContext {
	constructor(parser: fhirliquidParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public STAR(): TerminalNode {
		return this.getToken(fhirliquidParser.STAR, 0);
	}
	public SLASH(): TerminalNode {
		return this.getToken(fhirliquidParser.SLASH, 0);
	}
	public DIV(): TerminalNode {
		return this.getToken(fhirliquidParser.DIV, 0);
	}
	public MOD(): TerminalNode {
		return this.getToken(fhirliquidParser.MOD, 0);
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterMultiplicativeExpression) {
	 		listener.enterMultiplicativeExpression(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitMultiplicativeExpression) {
	 		listener.exitMultiplicativeExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitMultiplicativeExpression) {
			return visitor.visitMultiplicativeExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class UnionExpressionContext extends ExpressionContext {
	constructor(parser: fhirliquidParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public PIPE(): TerminalNode {
		return this.getToken(fhirliquidParser.PIPE, 0);
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterUnionExpression) {
	 		listener.enterUnionExpression(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitUnionExpression) {
	 		listener.exitUnionExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitUnionExpression) {
			return visitor.visitUnionExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class OrExpressionContext extends ExpressionContext {
	constructor(parser: fhirliquidParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public OR(): TerminalNode {
		return this.getToken(fhirliquidParser.OR, 0);
	}
	public XOR(): TerminalNode {
		return this.getToken(fhirliquidParser.XOR, 0);
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterOrExpression) {
	 		listener.enterOrExpression(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitOrExpression) {
	 		listener.exitOrExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitOrExpression) {
			return visitor.visitOrExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AndExpressionContext extends ExpressionContext {
	constructor(parser: fhirliquidParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public AND(): TerminalNode {
		return this.getToken(fhirliquidParser.AND, 0);
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterAndExpression) {
	 		listener.enterAndExpression(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitAndExpression) {
	 		listener.exitAndExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitAndExpression) {
			return visitor.visitAndExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class MembershipExpressionContext extends ExpressionContext {
	constructor(parser: fhirliquidParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public IN(): TerminalNode {
		return this.getToken(fhirliquidParser.IN, 0);
	}
	public CONTAINS(): TerminalNode {
		return this.getToken(fhirliquidParser.CONTAINS, 0);
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterMembershipExpression) {
	 		listener.enterMembershipExpression(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitMembershipExpression) {
	 		listener.exitMembershipExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitMembershipExpression) {
			return visitor.visitMembershipExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class InequalityExpressionContext extends ExpressionContext {
	constructor(parser: fhirliquidParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public LESS_OR_EQUAL(): TerminalNode {
		return this.getToken(fhirliquidParser.LESS_OR_EQUAL, 0);
	}
	public LESS(): TerminalNode {
		return this.getToken(fhirliquidParser.LESS, 0);
	}
	public GREATER(): TerminalNode {
		return this.getToken(fhirliquidParser.GREATER, 0);
	}
	public GREATER_OR_EQUAL(): TerminalNode {
		return this.getToken(fhirliquidParser.GREATER_OR_EQUAL, 0);
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterInequalityExpression) {
	 		listener.enterInequalityExpression(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitInequalityExpression) {
	 		listener.exitInequalityExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitInequalityExpression) {
			return visitor.visitInequalityExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class InvocationExpressionContext extends ExpressionContext {
	constructor(parser: fhirliquidParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public DOT(): TerminalNode {
		return this.getToken(fhirliquidParser.DOT, 0);
	}
	public invocation(): InvocationContext {
		return this.getTypedRuleContext(InvocationContext, 0) as InvocationContext;
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterInvocationExpression) {
	 		listener.enterInvocationExpression(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitInvocationExpression) {
	 		listener.exitInvocationExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitInvocationExpression) {
			return visitor.visitInvocationExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class EqualityExpressionContext extends ExpressionContext {
	constructor(parser: fhirliquidParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public EQUAL(): TerminalNode {
		return this.getToken(fhirliquidParser.EQUAL, 0);
	}
	public EQUIVALENT(): TerminalNode {
		return this.getToken(fhirliquidParser.EQUIVALENT, 0);
	}
	public NOT_EQUAL(): TerminalNode {
		return this.getToken(fhirliquidParser.NOT_EQUAL, 0);
	}
	public NOT_EQUIVALENT(): TerminalNode {
		return this.getToken(fhirliquidParser.NOT_EQUIVALENT, 0);
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterEqualityExpression) {
	 		listener.enterEqualityExpression(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitEqualityExpression) {
	 		listener.exitEqualityExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitEqualityExpression) {
			return visitor.visitEqualityExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ImpliesExpressionContext extends ExpressionContext {
	constructor(parser: fhirliquidParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public IMPLIES(): TerminalNode {
		return this.getToken(fhirliquidParser.IMPLIES, 0);
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterImpliesExpression) {
	 		listener.enterImpliesExpression(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitImpliesExpression) {
	 		listener.exitImpliesExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitImpliesExpression) {
			return visitor.visitImpliesExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TermExpressionContext extends ExpressionContext {
	constructor(parser: fhirliquidParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public term(): TermContext {
		return this.getTypedRuleContext(TermContext, 0) as TermContext;
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterTermExpression) {
	 		listener.enterTermExpression(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitTermExpression) {
	 		listener.exitTermExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitTermExpression) {
			return visitor.visitTermExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TypeExpressionContext extends ExpressionContext {
	constructor(parser: fhirliquidParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public typeSpecifier(): TypeSpecifierContext {
		return this.getTypedRuleContext(TypeSpecifierContext, 0) as TypeSpecifierContext;
	}
	public IS(): TerminalNode {
		return this.getToken(fhirliquidParser.IS, 0);
	}
	public AS(): TerminalNode {
		return this.getToken(fhirliquidParser.AS, 0);
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterTypeExpression) {
	 		listener.enterTypeExpression(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitTypeExpression) {
	 		listener.exitTypeExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitTypeExpression) {
			return visitor.visitTypeExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TermContext extends ParserRuleContext {
	constructor(parser?: fhirliquidParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return fhirliquidParser.RULE_term;
	}
	public override copyFrom(ctx: TermContext): void {
		super.copyFrom(ctx);
	}
}
export class ExternalConstantTermContext extends TermContext {
	constructor(parser: fhirliquidParser, ctx: TermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public externalConstant(): ExternalConstantContext {
		return this.getTypedRuleContext(ExternalConstantContext, 0) as ExternalConstantContext;
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterExternalConstantTerm) {
	 		listener.enterExternalConstantTerm(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitExternalConstantTerm) {
	 		listener.exitExternalConstantTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitExternalConstantTerm) {
			return visitor.visitExternalConstantTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LiteralTermContext extends TermContext {
	constructor(parser: fhirliquidParser, ctx: TermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public literal(): LiteralContext {
		return this.getTypedRuleContext(LiteralContext, 0) as LiteralContext;
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterLiteralTerm) {
	 		listener.enterLiteralTerm(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitLiteralTerm) {
	 		listener.exitLiteralTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitLiteralTerm) {
			return visitor.visitLiteralTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ParenthesizedTermContext extends TermContext {
	constructor(parser: fhirliquidParser, ctx: TermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public LPAREN(): TerminalNode {
		return this.getToken(fhirliquidParser.LPAREN, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public RPAREN(): TerminalNode {
		return this.getToken(fhirliquidParser.RPAREN, 0);
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterParenthesizedTerm) {
	 		listener.enterParenthesizedTerm(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitParenthesizedTerm) {
	 		listener.exitParenthesizedTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitParenthesizedTerm) {
			return visitor.visitParenthesizedTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class InvocationTermContext extends TermContext {
	constructor(parser: fhirliquidParser, ctx: TermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public invocation(): InvocationContext {
		return this.getTypedRuleContext(InvocationContext, 0) as InvocationContext;
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterInvocationTerm) {
	 		listener.enterInvocationTerm(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitInvocationTerm) {
	 		listener.exitInvocationTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitInvocationTerm) {
			return visitor.visitInvocationTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class InstanceSelectorTermContext extends TermContext {
	constructor(parser: fhirliquidParser, ctx: TermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public instanceSelector(): InstanceSelectorContext {
		return this.getTypedRuleContext(InstanceSelectorContext, 0) as InstanceSelectorContext;
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterInstanceSelectorTerm) {
	 		listener.enterInstanceSelectorTerm(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitInstanceSelectorTerm) {
	 		listener.exitInstanceSelectorTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitInstanceSelectorTerm) {
			return visitor.visitInstanceSelectorTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InvocationContext extends ParserRuleContext {
	constructor(parser?: fhirliquidParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return fhirliquidParser.RULE_invocation;
	}
	public override copyFrom(ctx: InvocationContext): void {
		super.copyFrom(ctx);
	}
}
export class TotalInvocationContext extends InvocationContext {
	constructor(parser: fhirliquidParser, ctx: InvocationContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public TOTAL(): TerminalNode {
		return this.getToken(fhirliquidParser.TOTAL, 0);
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterTotalInvocation) {
	 		listener.enterTotalInvocation(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitTotalInvocation) {
	 		listener.exitTotalInvocation(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitTotalInvocation) {
			return visitor.visitTotalInvocation(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ThisInvocationContext extends InvocationContext {
	constructor(parser: fhirliquidParser, ctx: InvocationContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public THIS(): TerminalNode {
		return this.getToken(fhirliquidParser.THIS, 0);
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterThisInvocation) {
	 		listener.enterThisInvocation(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitThisInvocation) {
	 		listener.exitThisInvocation(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitThisInvocation) {
			return visitor.visitThisInvocation(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class IndexInvocationContext extends InvocationContext {
	constructor(parser: fhirliquidParser, ctx: InvocationContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public INDEX(): TerminalNode {
		return this.getToken(fhirliquidParser.INDEX, 0);
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterIndexInvocation) {
	 		listener.enterIndexInvocation(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitIndexInvocation) {
	 		listener.exitIndexInvocation(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitIndexInvocation) {
			return visitor.visitIndexInvocation(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class FunctionInvocationContext extends InvocationContext {
	constructor(parser: fhirliquidParser, ctx: InvocationContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public function_(): FunctionContext {
		return this.getTypedRuleContext(FunctionContext, 0) as FunctionContext;
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterFunctionInvocation) {
	 		listener.enterFunctionInvocation(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitFunctionInvocation) {
	 		listener.exitFunctionInvocation(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitFunctionInvocation) {
			return visitor.visitFunctionInvocation(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class MemberInvocationContext extends InvocationContext {
	constructor(parser: fhirliquidParser, ctx: InvocationContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterMemberInvocation) {
	 		listener.enterMemberInvocation(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitMemberInvocation) {
	 		listener.exitMemberInvocation(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitMemberInvocation) {
			return visitor.visitMemberInvocation(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FunctionContext extends ParserRuleContext {
	constructor(parser?: fhirliquidParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public SORT(): TerminalNode {
		return this.getToken(fhirliquidParser.SORT, 0);
	}
	public LPAREN(): TerminalNode {
		return this.getToken(fhirliquidParser.LPAREN, 0);
	}
	public RPAREN(): TerminalNode {
		return this.getToken(fhirliquidParser.RPAREN, 0);
	}
	public sortArgument_list(): SortArgumentContext[] {
		return this.getTypedRuleContexts(SortArgumentContext) as SortArgumentContext[];
	}
	public sortArgument(i: number): SortArgumentContext {
		return this.getTypedRuleContext(SortArgumentContext, i) as SortArgumentContext;
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(fhirliquidParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(fhirliquidParser.COMMA, i);
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
	public paramList(): ParamListContext {
		return this.getTypedRuleContext(ParamListContext, 0) as ParamListContext;
	}
    public get ruleIndex(): number {
    	return fhirliquidParser.RULE_function;
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterFunction) {
	 		listener.enterFunction(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitFunction) {
	 		listener.exitFunction(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitFunction) {
			return visitor.visitFunction(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SortArgumentContext extends ParserRuleContext {
	constructor(parser?: fhirliquidParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return fhirliquidParser.RULE_sortArgument;
	}
	public override copyFrom(ctx: SortArgumentContext): void {
		super.copyFrom(ctx);
	}
}
export class SortDirectionArgumentContext extends SortArgumentContext {
	constructor(parser: fhirliquidParser, ctx: SortArgumentContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public ASC(): TerminalNode {
		return this.getToken(fhirliquidParser.ASC, 0);
	}
	public DESC(): TerminalNode {
		return this.getToken(fhirliquidParser.DESC, 0);
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterSortDirectionArgument) {
	 		listener.enterSortDirectionArgument(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitSortDirectionArgument) {
	 		listener.exitSortDirectionArgument(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitSortDirectionArgument) {
			return visitor.visitSortDirectionArgument(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParamListContext extends ParserRuleContext {
	constructor(parser?: fhirliquidParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(fhirliquidParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(fhirliquidParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return fhirliquidParser.RULE_paramList;
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterParamList) {
	 		listener.enterParamList(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitParamList) {
	 		listener.exitParamList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitParamList) {
			return visitor.visitParamList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InstanceSelectorContext extends ParserRuleContext {
	constructor(parser?: fhirliquidParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public qualifiedIdentifier(): QualifiedIdentifierContext {
		return this.getTypedRuleContext(QualifiedIdentifierContext, 0) as QualifiedIdentifierContext;
	}
	public LBRACE(): TerminalNode {
		return this.getToken(fhirliquidParser.LBRACE, 0);
	}
	public RBRACE(): TerminalNode {
		return this.getToken(fhirliquidParser.RBRACE, 0);
	}
	public COLON(): TerminalNode {
		return this.getToken(fhirliquidParser.COLON, 0);
	}
	public instanceElementSelector_list(): InstanceElementSelectorContext[] {
		return this.getTypedRuleContexts(InstanceElementSelectorContext) as InstanceElementSelectorContext[];
	}
	public instanceElementSelector(i: number): InstanceElementSelectorContext {
		return this.getTypedRuleContext(InstanceElementSelectorContext, i) as InstanceElementSelectorContext;
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(fhirliquidParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(fhirliquidParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return fhirliquidParser.RULE_instanceSelector;
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterInstanceSelector) {
	 		listener.enterInstanceSelector(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitInstanceSelector) {
	 		listener.exitInstanceSelector(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitInstanceSelector) {
			return visitor.visitInstanceSelector(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InstanceElementSelectorContext extends ParserRuleContext {
	constructor(parser?: fhirliquidParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
	public COLON(): TerminalNode {
		return this.getToken(fhirliquidParser.COLON, 0);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
    public get ruleIndex(): number {
    	return fhirliquidParser.RULE_instanceElementSelector;
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterInstanceElementSelector) {
	 		listener.enterInstanceElementSelector(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitInstanceElementSelector) {
	 		listener.exitInstanceElementSelector(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitInstanceElementSelector) {
			return visitor.visitInstanceElementSelector(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class QuantityContext extends ParserRuleContext {
	constructor(parser?: fhirliquidParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public INTEGER(): TerminalNode {
		return this.getToken(fhirliquidParser.INTEGER, 0);
	}
	public DECIMAL(): TerminalNode {
		return this.getToken(fhirliquidParser.DECIMAL, 0);
	}
	public unit(): UnitContext {
		return this.getTypedRuleContext(UnitContext, 0) as UnitContext;
	}
    public get ruleIndex(): number {
    	return fhirliquidParser.RULE_quantity;
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterQuantity) {
	 		listener.enterQuantity(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitQuantity) {
	 		listener.exitQuantity(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitQuantity) {
			return visitor.visitQuantity(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class UnitContext extends ParserRuleContext {
	constructor(parser?: fhirliquidParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public dateTimePrecision(): DateTimePrecisionContext {
		return this.getTypedRuleContext(DateTimePrecisionContext, 0) as DateTimePrecisionContext;
	}
	public pluralDateTimePrecision(): PluralDateTimePrecisionContext {
		return this.getTypedRuleContext(PluralDateTimePrecisionContext, 0) as PluralDateTimePrecisionContext;
	}
	public STRING(): TerminalNode {
		return this.getToken(fhirliquidParser.STRING, 0);
	}
    public get ruleIndex(): number {
    	return fhirliquidParser.RULE_unit;
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterUnit) {
	 		listener.enterUnit(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitUnit) {
	 		listener.exitUnit(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitUnit) {
			return visitor.visitUnit(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DateTimePrecisionContext extends ParserRuleContext {
	constructor(parser?: fhirliquidParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public YEAR(): TerminalNode {
		return this.getToken(fhirliquidParser.YEAR, 0);
	}
	public MONTH(): TerminalNode {
		return this.getToken(fhirliquidParser.MONTH, 0);
	}
	public WEEK(): TerminalNode {
		return this.getToken(fhirliquidParser.WEEK, 0);
	}
	public DAY(): TerminalNode {
		return this.getToken(fhirliquidParser.DAY, 0);
	}
	public HOUR(): TerminalNode {
		return this.getToken(fhirliquidParser.HOUR, 0);
	}
	public MINUTE(): TerminalNode {
		return this.getToken(fhirliquidParser.MINUTE, 0);
	}
	public SECOND(): TerminalNode {
		return this.getToken(fhirliquidParser.SECOND, 0);
	}
	public MILLISECOND(): TerminalNode {
		return this.getToken(fhirliquidParser.MILLISECOND, 0);
	}
    public get ruleIndex(): number {
    	return fhirliquidParser.RULE_dateTimePrecision;
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterDateTimePrecision) {
	 		listener.enterDateTimePrecision(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitDateTimePrecision) {
	 		listener.exitDateTimePrecision(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitDateTimePrecision) {
			return visitor.visitDateTimePrecision(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PluralDateTimePrecisionContext extends ParserRuleContext {
	constructor(parser?: fhirliquidParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public YEARS(): TerminalNode {
		return this.getToken(fhirliquidParser.YEARS, 0);
	}
	public MONTHS(): TerminalNode {
		return this.getToken(fhirliquidParser.MONTHS, 0);
	}
	public WEEKS(): TerminalNode {
		return this.getToken(fhirliquidParser.WEEKS, 0);
	}
	public DAYS(): TerminalNode {
		return this.getToken(fhirliquidParser.DAYS, 0);
	}
	public HOURS(): TerminalNode {
		return this.getToken(fhirliquidParser.HOURS, 0);
	}
	public MINUTES(): TerminalNode {
		return this.getToken(fhirliquidParser.MINUTES, 0);
	}
	public SECONDS(): TerminalNode {
		return this.getToken(fhirliquidParser.SECONDS, 0);
	}
	public MILLISECONDS(): TerminalNode {
		return this.getToken(fhirliquidParser.MILLISECONDS, 0);
	}
    public get ruleIndex(): number {
    	return fhirliquidParser.RULE_pluralDateTimePrecision;
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterPluralDateTimePrecision) {
	 		listener.enterPluralDateTimePrecision(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitPluralDateTimePrecision) {
	 		listener.exitPluralDateTimePrecision(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitPluralDateTimePrecision) {
			return visitor.visitPluralDateTimePrecision(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeSpecifierContext extends ParserRuleContext {
	constructor(parser?: fhirliquidParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public qualifiedIdentifier(): QualifiedIdentifierContext {
		return this.getTypedRuleContext(QualifiedIdentifierContext, 0) as QualifiedIdentifierContext;
	}
    public get ruleIndex(): number {
    	return fhirliquidParser.RULE_typeSpecifier;
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterTypeSpecifier) {
	 		listener.enterTypeSpecifier(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitTypeSpecifier) {
	 		listener.exitTypeSpecifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitTypeSpecifier) {
			return visitor.visitTypeSpecifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class QualifiedIdentifierContext extends ParserRuleContext {
	constructor(parser?: fhirliquidParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifier_list(): IdentifierContext[] {
		return this.getTypedRuleContexts(IdentifierContext) as IdentifierContext[];
	}
	public identifier(i: number): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, i) as IdentifierContext;
	}
	public DOT_list(): TerminalNode[] {
	    	return this.getTokens(fhirliquidParser.DOT);
	}
	public DOT(i: number): TerminalNode {
		return this.getToken(fhirliquidParser.DOT, i);
	}
    public get ruleIndex(): number {
    	return fhirliquidParser.RULE_qualifiedIdentifier;
	}
	public enterRule(listener: fhirliquidListener): void {
	    if(listener.enterQualifiedIdentifier) {
	 		listener.enterQualifiedIdentifier(this);
		}
	}
	public exitRule(listener: fhirliquidListener): void {
	    if(listener.exitQualifiedIdentifier) {
	 		listener.exitQualifiedIdentifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirliquidVisitor<Result>): Result {
		if (visitor.visitQualifiedIdentifier) {
			return visitor.visitQualifiedIdentifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
