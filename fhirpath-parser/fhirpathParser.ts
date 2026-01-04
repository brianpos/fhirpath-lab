// Generated from fhirpath.g4 by ANTLR 4.13.2
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
import fhirpathListener from "./fhirpathListener.js";
import fhirpathVisitor from "./fhirpathVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;

export default class fhirpathParser extends Parser {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly T__2 = 3;
	public static readonly T__3 = 4;
	public static readonly T__4 = 5;
	public static readonly T__5 = 6;
	public static readonly T__6 = 7;
	public static readonly T__7 = 8;
	public static readonly T__8 = 9;
	public static readonly T__9 = 10;
	public static readonly T__10 = 11;
	public static readonly T__11 = 12;
	public static readonly T__12 = 13;
	public static readonly T__13 = 14;
	public static readonly T__14 = 15;
	public static readonly T__15 = 16;
	public static readonly T__16 = 17;
	public static readonly T__17 = 18;
	public static readonly T__18 = 19;
	public static readonly T__19 = 20;
	public static readonly T__20 = 21;
	public static readonly T__21 = 22;
	public static readonly T__22 = 23;
	public static readonly T__23 = 24;
	public static readonly T__24 = 25;
	public static readonly T__25 = 26;
	public static readonly T__26 = 27;
	public static readonly T__27 = 28;
	public static readonly T__28 = 29;
	public static readonly T__29 = 30;
	public static readonly T__30 = 31;
	public static readonly T__31 = 32;
	public static readonly T__32 = 33;
	public static readonly T__33 = 34;
	public static readonly T__34 = 35;
	public static readonly T__35 = 36;
	public static readonly T__36 = 37;
	public static readonly T__37 = 38;
	public static readonly T__38 = 39;
	public static readonly T__39 = 40;
	public static readonly T__40 = 41;
	public static readonly T__41 = 42;
	public static readonly T__42 = 43;
	public static readonly T__43 = 44;
	public static readonly T__44 = 45;
	public static readonly T__45 = 46;
	public static readonly T__46 = 47;
	public static readonly T__47 = 48;
	public static readonly T__48 = 49;
	public static readonly T__49 = 50;
	public static readonly T__50 = 51;
	public static readonly T__51 = 52;
	public static readonly T__52 = 53;
	public static readonly T__53 = 54;
	public static readonly T__54 = 55;
	public static readonly T__55 = 56;
	public static readonly T__56 = 57;
	public static readonly DATE = 58;
	public static readonly DATETIME = 59;
	public static readonly TIME = 60;
	public static readonly IDENTIFIER = 61;
	public static readonly DELIMITEDIDENTIFIER = 62;
	public static readonly STRING = 63;
	public static readonly INTEGER = 64;
	public static readonly DECIMAL = 65;
	public static readonly LONGNUMBER = 66;
	public static readonly WS = 67;
	public static readonly COMMENT = 68;
	public static readonly LINE_COMMENT = 69;
	public static override readonly EOF = Token.EOF;
	public static readonly RULE_entireExpression = 0;
	public static readonly RULE_expression = 1;
	public static readonly RULE_term = 2;
	public static readonly RULE_literal = 3;
	public static readonly RULE_externalConstant = 4;
	public static readonly RULE_invocation = 5;
	public static readonly RULE_function = 6;
	public static readonly RULE_sortArgument = 7;
	public static readonly RULE_paramList = 8;
	public static readonly RULE_quantity = 9;
	public static readonly RULE_unit = 10;
	public static readonly RULE_dateTimePrecision = 11;
	public static readonly RULE_pluralDateTimePrecision = 12;
	public static readonly RULE_typeSpecifier = 13;
	public static readonly RULE_qualifiedIdentifier = 14;
	public static readonly RULE_identifier = 15;
	public static readonly literalNames: (string | null)[] = [ null, "'.'", 
                                                            "'['", "']'", 
                                                            "'+'", "'-'", 
                                                            "'*'", "'/'", 
                                                            "'div'", "'mod'", 
                                                            "'&'", "'is'", 
                                                            "'as'", "'|'", 
                                                            "'<='", "'<'", 
                                                            "'>'", "'>='", 
                                                            "'='", "'~'", 
                                                            "'!='", "'!~'", 
                                                            "'in'", "'contains'", 
                                                            "'and'", "'or'", 
                                                            "'xor'", "'implies'", 
                                                            "'('", "')'", 
                                                            "'{'", "'}'", 
                                                            "'true'", "'false'", 
                                                            "'%'", "'$this'", 
                                                            "'$index'", 
                                                            "'$total'", 
                                                            "'sort'", "','", 
                                                            "'asc'", "'desc'", 
                                                            "'year'", "'month'", 
                                                            "'week'", "'day'", 
                                                            "'hour'", "'minute'", 
                                                            "'second'", 
                                                            "'millisecond'", 
                                                            "'years'", "'months'", 
                                                            "'weeks'", "'days'", 
                                                            "'hours'", "'minutes'", 
                                                            "'seconds'", 
                                                            "'milliseconds'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             "DATE", "DATETIME", 
                                                             "TIME", "IDENTIFIER", 
                                                             "DELIMITEDIDENTIFIER", 
                                                             "STRING", "INTEGER", 
                                                             "DECIMAL", 
                                                             "LONGNUMBER", 
                                                             "WS", "COMMENT", 
                                                             "LINE_COMMENT" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"entireExpression", "expression", "term", "literal", "externalConstant", 
		"invocation", "function", "sortArgument", "paramList", "quantity", "unit", 
		"dateTimePrecision", "pluralDateTimePrecision", "typeSpecifier", "qualifiedIdentifier", 
		"identifier",
	];
	public get grammarFileName(): string { return "fhirpath.g4"; }
	public get literalNames(): (string | null)[] { return fhirpathParser.literalNames; }
	public get symbolicNames(): (string | null)[] { return fhirpathParser.symbolicNames; }
	public get ruleNames(): string[] { return fhirpathParser.ruleNames; }
	public get serializedATN(): number[] { return fhirpathParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(this, fhirpathParser._ATN, fhirpathParser.DecisionsToDFA, new PredictionContextCache());
	}
	// @RuleVersion(0)
	public entireExpression(): EntireExpressionContext {
		let localctx: EntireExpressionContext = new EntireExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 0, fhirpathParser.RULE_entireExpression);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 32;
			this.expression(0);
			this.state = 33;
			this.match(fhirpathParser.EOF);
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
		let _startState: number = 2;
		this.enterRecursionRule(localctx, 2, fhirpathParser.RULE_expression, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 39;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 11:
			case 12:
			case 22:
			case 23:
			case 28:
			case 30:
			case 32:
			case 33:
			case 34:
			case 35:
			case 36:
			case 37:
			case 38:
			case 40:
			case 41:
			case 58:
			case 59:
			case 60:
			case 61:
			case 62:
			case 63:
			case 64:
			case 65:
			case 66:
				{
				localctx = new TermExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;

				this.state = 36;
				this.term();
				}
				break;
			case 4:
			case 5:
				{
				localctx = new PolarityExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 37;
				_la = this._input.LA(1);
				if(!(_la===4 || _la===5)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 38;
				this.expression(11);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 81;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 2, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 79;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 1, this._ctx) ) {
					case 1:
						{
						localctx = new MultiplicativeExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, fhirpathParser.RULE_expression);
						this.state = 41;
						if (!(this.precpred(this._ctx, 10))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 10)");
						}
						this.state = 42;
						_la = this._input.LA(1);
						if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 960) !== 0))) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 43;
						this.expression(11);
						}
						break;
					case 2:
						{
						localctx = new AdditiveExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, fhirpathParser.RULE_expression);
						this.state = 44;
						if (!(this.precpred(this._ctx, 9))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 9)");
						}
						this.state = 45;
						_la = this._input.LA(1);
						if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 1072) !== 0))) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 46;
						this.expression(10);
						}
						break;
					case 3:
						{
						localctx = new UnionExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, fhirpathParser.RULE_expression);
						this.state = 47;
						if (!(this.precpred(this._ctx, 7))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 7)");
						}
						this.state = 48;
						this.match(fhirpathParser.T__12);
						this.state = 49;
						this.expression(8);
						}
						break;
					case 4:
						{
						localctx = new InequalityExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, fhirpathParser.RULE_expression);
						this.state = 50;
						if (!(this.precpred(this._ctx, 6))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 6)");
						}
						this.state = 51;
						_la = this._input.LA(1);
						if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 245760) !== 0))) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 52;
						this.expression(7);
						}
						break;
					case 5:
						{
						localctx = new EqualityExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, fhirpathParser.RULE_expression);
						this.state = 53;
						if (!(this.precpred(this._ctx, 5))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 5)");
						}
						this.state = 54;
						_la = this._input.LA(1);
						if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 3932160) !== 0))) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 55;
						this.expression(6);
						}
						break;
					case 6:
						{
						localctx = new MembershipExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, fhirpathParser.RULE_expression);
						this.state = 56;
						if (!(this.precpred(this._ctx, 4))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
						}
						this.state = 57;
						_la = this._input.LA(1);
						if(!(_la===22 || _la===23)) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 58;
						this.expression(5);
						}
						break;
					case 7:
						{
						localctx = new AndExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, fhirpathParser.RULE_expression);
						this.state = 59;
						if (!(this.precpred(this._ctx, 3))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 3)");
						}
						this.state = 60;
						this.match(fhirpathParser.T__23);
						this.state = 61;
						this.expression(4);
						}
						break;
					case 8:
						{
						localctx = new OrExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, fhirpathParser.RULE_expression);
						this.state = 62;
						if (!(this.precpred(this._ctx, 2))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 2)");
						}
						this.state = 63;
						_la = this._input.LA(1);
						if(!(_la===25 || _la===26)) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 64;
						this.expression(3);
						}
						break;
					case 9:
						{
						localctx = new ImpliesExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, fhirpathParser.RULE_expression);
						this.state = 65;
						if (!(this.precpred(this._ctx, 1))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
						}
						this.state = 66;
						this.match(fhirpathParser.T__26);
						this.state = 67;
						this.expression(2);
						}
						break;
					case 10:
						{
						localctx = new InvocationExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, fhirpathParser.RULE_expression);
						this.state = 68;
						if (!(this.precpred(this._ctx, 13))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 13)");
						}
						this.state = 69;
						this.match(fhirpathParser.T__0);
						this.state = 70;
						this.invocation();
						}
						break;
					case 11:
						{
						localctx = new IndexerExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, fhirpathParser.RULE_expression);
						this.state = 71;
						if (!(this.precpred(this._ctx, 12))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 12)");
						}
						this.state = 72;
						this.match(fhirpathParser.T__1);
						this.state = 73;
						this.expression(0);
						this.state = 74;
						this.match(fhirpathParser.T__2);
						}
						break;
					case 12:
						{
						localctx = new TypeExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, fhirpathParser.RULE_expression);
						this.state = 76;
						if (!(this.precpred(this._ctx, 8))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 8)");
						}
						this.state = 77;
						_la = this._input.LA(1);
						if(!(_la===11 || _la===12)) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 78;
						this.typeSpecifier();
						}
						break;
					}
					}
				}
				this.state = 83;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 2, this._ctx);
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
		this.enterRule(localctx, 4, fhirpathParser.RULE_term);
		try {
			this.state = 91;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 11:
			case 12:
			case 22:
			case 23:
			case 35:
			case 36:
			case 37:
			case 38:
			case 40:
			case 41:
			case 61:
			case 62:
				localctx = new InvocationTermContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 84;
				this.invocation();
				}
				break;
			case 30:
			case 32:
			case 33:
			case 58:
			case 59:
			case 60:
			case 63:
			case 64:
			case 65:
			case 66:
				localctx = new LiteralTermContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 85;
				this.literal();
				}
				break;
			case 34:
				localctx = new ExternalConstantTermContext(this, localctx);
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 86;
				this.externalConstant();
				}
				break;
			case 28:
				localctx = new ParenthesizedTermContext(this, localctx);
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 87;
				this.match(fhirpathParser.T__27);
				this.state = 88;
				this.expression(0);
				this.state = 89;
				this.match(fhirpathParser.T__28);
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
	public literal(): LiteralContext {
		let localctx: LiteralContext = new LiteralContext(this, this._ctx, this.state);
		this.enterRule(localctx, 6, fhirpathParser.RULE_literal);
		let _la: number;
		try {
			this.state = 103;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 4, this._ctx) ) {
			case 1:
				localctx = new NullLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 93;
				this.match(fhirpathParser.T__29);
				this.state = 94;
				this.match(fhirpathParser.T__30);
				}
				break;
			case 2:
				localctx = new BooleanLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 95;
				_la = this._input.LA(1);
				if(!(_la===32 || _la===33)) {
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
				this.state = 96;
				this.match(fhirpathParser.STRING);
				}
				break;
			case 4:
				localctx = new NumberLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 97;
				_la = this._input.LA(1);
				if(!(_la===64 || _la===65)) {
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
				this.state = 98;
				this.match(fhirpathParser.LONGNUMBER);
				}
				break;
			case 6:
				localctx = new DateLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 99;
				this.match(fhirpathParser.DATE);
				}
				break;
			case 7:
				localctx = new DateTimeLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 100;
				this.match(fhirpathParser.DATETIME);
				}
				break;
			case 8:
				localctx = new TimeLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 8);
				{
				this.state = 101;
				this.match(fhirpathParser.TIME);
				}
				break;
			case 9:
				localctx = new QuantityLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 9);
				{
				this.state = 102;
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
		this.enterRule(localctx, 8, fhirpathParser.RULE_externalConstant);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 105;
			this.match(fhirpathParser.T__33);
			this.state = 108;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 11:
			case 12:
			case 22:
			case 23:
			case 38:
			case 40:
			case 41:
			case 61:
			case 62:
				{
				this.state = 106;
				this.identifier();
				}
				break;
			case 63:
				{
				this.state = 107;
				this.match(fhirpathParser.STRING);
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
	public invocation(): InvocationContext {
		let localctx: InvocationContext = new InvocationContext(this, this._ctx, this.state);
		this.enterRule(localctx, 10, fhirpathParser.RULE_invocation);
		try {
			this.state = 115;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 6, this._ctx) ) {
			case 1:
				localctx = new MemberInvocationContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 110;
				this.identifier();
				}
				break;
			case 2:
				localctx = new FunctionInvocationContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 111;
				this.function_();
				}
				break;
			case 3:
				localctx = new ThisInvocationContext(this, localctx);
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 112;
				this.match(fhirpathParser.T__34);
				}
				break;
			case 4:
				localctx = new IndexInvocationContext(this, localctx);
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 113;
				this.match(fhirpathParser.T__35);
				}
				break;
			case 5:
				localctx = new TotalInvocationContext(this, localctx);
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 114;
				this.match(fhirpathParser.T__36);
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
		this.enterRule(localctx, 12, fhirpathParser.RULE_function);
		let _la: number;
		try {
			this.state = 137;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 10, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 117;
				this.match(fhirpathParser.T__37);
				this.state = 118;
				this.match(fhirpathParser.T__27);
				this.state = 127;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 4)) & ~0x1F) === 0 && ((1 << (_la - 4)) & 4111204739) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & 2143289399) !== 0)) {
					{
					this.state = 119;
					this.sortArgument();
					this.state = 124;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la===39) {
						{
						{
						this.state = 120;
						this.match(fhirpathParser.T__38);
						this.state = 121;
						this.sortArgument();
						}
						}
						this.state = 126;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					}
				}

				this.state = 129;
				this.match(fhirpathParser.T__28);
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 130;
				this.identifier();
				this.state = 131;
				this.match(fhirpathParser.T__27);
				this.state = 133;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 4)) & ~0x1F) === 0 && ((1 << (_la - 4)) & 4111204739) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & 2143289399) !== 0)) {
					{
					this.state = 132;
					this.paramList();
					}
				}

				this.state = 135;
				this.match(fhirpathParser.T__28);
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
		this.enterRule(localctx, 14, fhirpathParser.RULE_sortArgument);
		let _la: number;
		try {
			localctx = new SortDirectionArgumentContext(this, localctx);
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 139;
			this.expression(0);
			this.state = 141;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===40 || _la===41) {
				{
				this.state = 140;
				_la = this._input.LA(1);
				if(!(_la===40 || _la===41)) {
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
		this.enterRule(localctx, 16, fhirpathParser.RULE_paramList);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 143;
			this.expression(0);
			this.state = 148;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===39) {
				{
				{
				this.state = 144;
				this.match(fhirpathParser.T__38);
				this.state = 145;
				this.expression(0);
				}
				}
				this.state = 150;
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
	public quantity(): QuantityContext {
		let localctx: QuantityContext = new QuantityContext(this, this._ctx, this.state);
		this.enterRule(localctx, 18, fhirpathParser.RULE_quantity);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 151;
			_la = this._input.LA(1);
			if(!(_la===64 || _la===65)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 153;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 13, this._ctx) ) {
			case 1:
				{
				this.state = 152;
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
		this.enterRule(localctx, 20, fhirpathParser.RULE_unit);
		try {
			this.state = 158;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 42:
			case 43:
			case 44:
			case 45:
			case 46:
			case 47:
			case 48:
			case 49:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 155;
				this.dateTimePrecision();
				}
				break;
			case 50:
			case 51:
			case 52:
			case 53:
			case 54:
			case 55:
			case 56:
			case 57:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 156;
				this.pluralDateTimePrecision();
				}
				break;
			case 63:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 157;
				this.match(fhirpathParser.STRING);
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
		this.enterRule(localctx, 22, fhirpathParser.RULE_dateTimePrecision);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 160;
			_la = this._input.LA(1);
			if(!(((((_la - 42)) & ~0x1F) === 0 && ((1 << (_la - 42)) & 255) !== 0))) {
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
		this.enterRule(localctx, 24, fhirpathParser.RULE_pluralDateTimePrecision);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 162;
			_la = this._input.LA(1);
			if(!(((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 255) !== 0))) {
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
		this.enterRule(localctx, 26, fhirpathParser.RULE_typeSpecifier);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 164;
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
		this.enterRule(localctx, 28, fhirpathParser.RULE_qualifiedIdentifier);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 166;
			this.identifier();
			this.state = 171;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 15, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 167;
					this.match(fhirpathParser.T__0);
					this.state = 168;
					this.identifier();
					}
					}
				}
				this.state = 173;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 15, this._ctx);
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
		this.enterRule(localctx, 30, fhirpathParser.RULE_identifier);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 174;
			_la = this._input.LA(1);
			if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 12589056) !== 0) || ((((_la - 38)) & ~0x1F) === 0 && ((1 << (_la - 38)) & 25165837) !== 0))) {
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

	public sempred(localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 1:
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

	public static readonly _serializedATN: number[] = [4,1,69,177,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,
	10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,1,0,1,0,1,0,1,
	1,1,1,1,1,1,1,3,1,40,8,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
	1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
	1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,1,80,8,1,10,1,12,1,83,9,1,1,2,1,2,1,
	2,1,2,1,2,1,2,1,2,3,2,92,8,2,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,3,
	3,104,8,3,1,4,1,4,1,4,3,4,109,8,4,1,5,1,5,1,5,1,5,1,5,3,5,116,8,5,1,6,1,
	6,1,6,1,6,1,6,5,6,123,8,6,10,6,12,6,126,9,6,3,6,128,8,6,1,6,1,6,1,6,1,6,
	3,6,134,8,6,1,6,1,6,3,6,138,8,6,1,7,1,7,3,7,142,8,7,1,8,1,8,1,8,5,8,147,
	8,8,10,8,12,8,150,9,8,1,9,1,9,3,9,154,8,9,1,10,1,10,1,10,3,10,159,8,10,
	1,11,1,11,1,12,1,12,1,13,1,13,1,14,1,14,1,14,5,14,170,8,14,10,14,12,14,
	173,9,14,1,15,1,15,1,15,0,1,2,16,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,
	30,0,14,1,0,4,5,1,0,6,9,2,0,4,5,10,10,1,0,14,17,1,0,18,21,1,0,22,23,1,0,
	25,26,1,0,11,12,1,0,32,33,1,0,64,65,1,0,40,41,1,0,42,49,1,0,50,57,5,0,11,
	12,22,23,38,38,40,41,61,62,199,0,32,1,0,0,0,2,39,1,0,0,0,4,91,1,0,0,0,6,
	103,1,0,0,0,8,105,1,0,0,0,10,115,1,0,0,0,12,137,1,0,0,0,14,139,1,0,0,0,
	16,143,1,0,0,0,18,151,1,0,0,0,20,158,1,0,0,0,22,160,1,0,0,0,24,162,1,0,
	0,0,26,164,1,0,0,0,28,166,1,0,0,0,30,174,1,0,0,0,32,33,3,2,1,0,33,34,5,
	0,0,1,34,1,1,0,0,0,35,36,6,1,-1,0,36,40,3,4,2,0,37,38,7,0,0,0,38,40,3,2,
	1,11,39,35,1,0,0,0,39,37,1,0,0,0,40,81,1,0,0,0,41,42,10,10,0,0,42,43,7,
	1,0,0,43,80,3,2,1,11,44,45,10,9,0,0,45,46,7,2,0,0,46,80,3,2,1,10,47,48,
	10,7,0,0,48,49,5,13,0,0,49,80,3,2,1,8,50,51,10,6,0,0,51,52,7,3,0,0,52,80,
	3,2,1,7,53,54,10,5,0,0,54,55,7,4,0,0,55,80,3,2,1,6,56,57,10,4,0,0,57,58,
	7,5,0,0,58,80,3,2,1,5,59,60,10,3,0,0,60,61,5,24,0,0,61,80,3,2,1,4,62,63,
	10,2,0,0,63,64,7,6,0,0,64,80,3,2,1,3,65,66,10,1,0,0,66,67,5,27,0,0,67,80,
	3,2,1,2,68,69,10,13,0,0,69,70,5,1,0,0,70,80,3,10,5,0,71,72,10,12,0,0,72,
	73,5,2,0,0,73,74,3,2,1,0,74,75,5,3,0,0,75,80,1,0,0,0,76,77,10,8,0,0,77,
	78,7,7,0,0,78,80,3,26,13,0,79,41,1,0,0,0,79,44,1,0,0,0,79,47,1,0,0,0,79,
	50,1,0,0,0,79,53,1,0,0,0,79,56,1,0,0,0,79,59,1,0,0,0,79,62,1,0,0,0,79,65,
	1,0,0,0,79,68,1,0,0,0,79,71,1,0,0,0,79,76,1,0,0,0,80,83,1,0,0,0,81,79,1,
	0,0,0,81,82,1,0,0,0,82,3,1,0,0,0,83,81,1,0,0,0,84,92,3,10,5,0,85,92,3,6,
	3,0,86,92,3,8,4,0,87,88,5,28,0,0,88,89,3,2,1,0,89,90,5,29,0,0,90,92,1,0,
	0,0,91,84,1,0,0,0,91,85,1,0,0,0,91,86,1,0,0,0,91,87,1,0,0,0,92,5,1,0,0,
	0,93,94,5,30,0,0,94,104,5,31,0,0,95,104,7,8,0,0,96,104,5,63,0,0,97,104,
	7,9,0,0,98,104,5,66,0,0,99,104,5,58,0,0,100,104,5,59,0,0,101,104,5,60,0,
	0,102,104,3,18,9,0,103,93,1,0,0,0,103,95,1,0,0,0,103,96,1,0,0,0,103,97,
	1,0,0,0,103,98,1,0,0,0,103,99,1,0,0,0,103,100,1,0,0,0,103,101,1,0,0,0,103,
	102,1,0,0,0,104,7,1,0,0,0,105,108,5,34,0,0,106,109,3,30,15,0,107,109,5,
	63,0,0,108,106,1,0,0,0,108,107,1,0,0,0,109,9,1,0,0,0,110,116,3,30,15,0,
	111,116,3,12,6,0,112,116,5,35,0,0,113,116,5,36,0,0,114,116,5,37,0,0,115,
	110,1,0,0,0,115,111,1,0,0,0,115,112,1,0,0,0,115,113,1,0,0,0,115,114,1,0,
	0,0,116,11,1,0,0,0,117,118,5,38,0,0,118,127,5,28,0,0,119,124,3,14,7,0,120,
	121,5,39,0,0,121,123,3,14,7,0,122,120,1,0,0,0,123,126,1,0,0,0,124,122,1,
	0,0,0,124,125,1,0,0,0,125,128,1,0,0,0,126,124,1,0,0,0,127,119,1,0,0,0,127,
	128,1,0,0,0,128,129,1,0,0,0,129,138,5,29,0,0,130,131,3,30,15,0,131,133,
	5,28,0,0,132,134,3,16,8,0,133,132,1,0,0,0,133,134,1,0,0,0,134,135,1,0,0,
	0,135,136,5,29,0,0,136,138,1,0,0,0,137,117,1,0,0,0,137,130,1,0,0,0,138,
	13,1,0,0,0,139,141,3,2,1,0,140,142,7,10,0,0,141,140,1,0,0,0,141,142,1,0,
	0,0,142,15,1,0,0,0,143,148,3,2,1,0,144,145,5,39,0,0,145,147,3,2,1,0,146,
	144,1,0,0,0,147,150,1,0,0,0,148,146,1,0,0,0,148,149,1,0,0,0,149,17,1,0,
	0,0,150,148,1,0,0,0,151,153,7,9,0,0,152,154,3,20,10,0,153,152,1,0,0,0,153,
	154,1,0,0,0,154,19,1,0,0,0,155,159,3,22,11,0,156,159,3,24,12,0,157,159,
	5,63,0,0,158,155,1,0,0,0,158,156,1,0,0,0,158,157,1,0,0,0,159,21,1,0,0,0,
	160,161,7,11,0,0,161,23,1,0,0,0,162,163,7,12,0,0,163,25,1,0,0,0,164,165,
	3,28,14,0,165,27,1,0,0,0,166,171,3,30,15,0,167,168,5,1,0,0,168,170,3,30,
	15,0,169,167,1,0,0,0,170,173,1,0,0,0,171,169,1,0,0,0,171,172,1,0,0,0,172,
	29,1,0,0,0,173,171,1,0,0,0,174,175,7,13,0,0,175,31,1,0,0,0,16,39,79,81,
	91,103,108,115,124,127,133,137,141,148,153,158,171];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!fhirpathParser.__ATN) {
			fhirpathParser.__ATN = new ATNDeserializer().deserialize(fhirpathParser._serializedATN);
		}

		return fhirpathParser.__ATN;
	}


	static DecisionsToDFA = fhirpathParser._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );

}

export class EntireExpressionContext extends ParserRuleContext {
	constructor(parser?: fhirpathParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public EOF(): TerminalNode {
		return this.getToken(fhirpathParser.EOF, 0);
	}
    public get ruleIndex(): number {
    	return fhirpathParser.RULE_entireExpression;
	}
	public enterRule(listener: fhirpathListener): void {
	    if(listener.enterEntireExpression) {
	 		listener.enterEntireExpression(this);
		}
	}
	public exitRule(listener: fhirpathListener): void {
	    if(listener.exitEntireExpression) {
	 		listener.exitEntireExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitEntireExpression) {
			return visitor.visitEntireExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionContext extends ParserRuleContext {
	constructor(parser?: fhirpathParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return fhirpathParser.RULE_expression;
	}
	public override copyFrom(ctx: ExpressionContext): void {
		super.copyFrom(ctx);
	}
}
export class IndexerExpressionContext extends ExpressionContext {
	constructor(parser: fhirpathParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public enterRule(listener: fhirpathListener): void {
	    if(listener.enterIndexerExpression) {
	 		listener.enterIndexerExpression(this);
		}
	}
	public exitRule(listener: fhirpathListener): void {
	    if(listener.exitIndexerExpression) {
	 		listener.exitIndexerExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitIndexerExpression) {
			return visitor.visitIndexerExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class PolarityExpressionContext extends ExpressionContext {
	constructor(parser: fhirpathParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public enterRule(listener: fhirpathListener): void {
	    if(listener.enterPolarityExpression) {
	 		listener.enterPolarityExpression(this);
		}
	}
	public exitRule(listener: fhirpathListener): void {
	    if(listener.exitPolarityExpression) {
	 		listener.exitPolarityExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitPolarityExpression) {
			return visitor.visitPolarityExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AdditiveExpressionContext extends ExpressionContext {
	constructor(parser: fhirpathParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public enterRule(listener: fhirpathListener): void {
	    if(listener.enterAdditiveExpression) {
	 		listener.enterAdditiveExpression(this);
		}
	}
	public exitRule(listener: fhirpathListener): void {
	    if(listener.exitAdditiveExpression) {
	 		listener.exitAdditiveExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitAdditiveExpression) {
			return visitor.visitAdditiveExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class MultiplicativeExpressionContext extends ExpressionContext {
	constructor(parser: fhirpathParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public enterRule(listener: fhirpathListener): void {
	    if(listener.enterMultiplicativeExpression) {
	 		listener.enterMultiplicativeExpression(this);
		}
	}
	public exitRule(listener: fhirpathListener): void {
	    if(listener.exitMultiplicativeExpression) {
	 		listener.exitMultiplicativeExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitMultiplicativeExpression) {
			return visitor.visitMultiplicativeExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class UnionExpressionContext extends ExpressionContext {
	constructor(parser: fhirpathParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public enterRule(listener: fhirpathListener): void {
	    if(listener.enterUnionExpression) {
	 		listener.enterUnionExpression(this);
		}
	}
	public exitRule(listener: fhirpathListener): void {
	    if(listener.exitUnionExpression) {
	 		listener.exitUnionExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitUnionExpression) {
			return visitor.visitUnionExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class OrExpressionContext extends ExpressionContext {
	constructor(parser: fhirpathParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public enterRule(listener: fhirpathListener): void {
	    if(listener.enterOrExpression) {
	 		listener.enterOrExpression(this);
		}
	}
	public exitRule(listener: fhirpathListener): void {
	    if(listener.exitOrExpression) {
	 		listener.exitOrExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitOrExpression) {
			return visitor.visitOrExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AndExpressionContext extends ExpressionContext {
	constructor(parser: fhirpathParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public enterRule(listener: fhirpathListener): void {
	    if(listener.enterAndExpression) {
	 		listener.enterAndExpression(this);
		}
	}
	public exitRule(listener: fhirpathListener): void {
	    if(listener.exitAndExpression) {
	 		listener.exitAndExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitAndExpression) {
			return visitor.visitAndExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class MembershipExpressionContext extends ExpressionContext {
	constructor(parser: fhirpathParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public enterRule(listener: fhirpathListener): void {
	    if(listener.enterMembershipExpression) {
	 		listener.enterMembershipExpression(this);
		}
	}
	public exitRule(listener: fhirpathListener): void {
	    if(listener.exitMembershipExpression) {
	 		listener.exitMembershipExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitMembershipExpression) {
			return visitor.visitMembershipExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class InequalityExpressionContext extends ExpressionContext {
	constructor(parser: fhirpathParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public enterRule(listener: fhirpathListener): void {
	    if(listener.enterInequalityExpression) {
	 		listener.enterInequalityExpression(this);
		}
	}
	public exitRule(listener: fhirpathListener): void {
	    if(listener.exitInequalityExpression) {
	 		listener.exitInequalityExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitInequalityExpression) {
			return visitor.visitInequalityExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class InvocationExpressionContext extends ExpressionContext {
	constructor(parser: fhirpathParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public invocation(): InvocationContext {
		return this.getTypedRuleContext(InvocationContext, 0) as InvocationContext;
	}
	public enterRule(listener: fhirpathListener): void {
	    if(listener.enterInvocationExpression) {
	 		listener.enterInvocationExpression(this);
		}
	}
	public exitRule(listener: fhirpathListener): void {
	    if(listener.exitInvocationExpression) {
	 		listener.exitInvocationExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitInvocationExpression) {
			return visitor.visitInvocationExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class EqualityExpressionContext extends ExpressionContext {
	constructor(parser: fhirpathParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public enterRule(listener: fhirpathListener): void {
	    if(listener.enterEqualityExpression) {
	 		listener.enterEqualityExpression(this);
		}
	}
	public exitRule(listener: fhirpathListener): void {
	    if(listener.exitEqualityExpression) {
	 		listener.exitEqualityExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitEqualityExpression) {
			return visitor.visitEqualityExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ImpliesExpressionContext extends ExpressionContext {
	constructor(parser: fhirpathParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public enterRule(listener: fhirpathListener): void {
	    if(listener.enterImpliesExpression) {
	 		listener.enterImpliesExpression(this);
		}
	}
	public exitRule(listener: fhirpathListener): void {
	    if(listener.exitImpliesExpression) {
	 		listener.exitImpliesExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitImpliesExpression) {
			return visitor.visitImpliesExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TermExpressionContext extends ExpressionContext {
	constructor(parser: fhirpathParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public term(): TermContext {
		return this.getTypedRuleContext(TermContext, 0) as TermContext;
	}
	public enterRule(listener: fhirpathListener): void {
	    if(listener.enterTermExpression) {
	 		listener.enterTermExpression(this);
		}
	}
	public exitRule(listener: fhirpathListener): void {
	    if(listener.exitTermExpression) {
	 		listener.exitTermExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitTermExpression) {
			return visitor.visitTermExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TypeExpressionContext extends ExpressionContext {
	constructor(parser: fhirpathParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public typeSpecifier(): TypeSpecifierContext {
		return this.getTypedRuleContext(TypeSpecifierContext, 0) as TypeSpecifierContext;
	}
	public enterRule(listener: fhirpathListener): void {
	    if(listener.enterTypeExpression) {
	 		listener.enterTypeExpression(this);
		}
	}
	public exitRule(listener: fhirpathListener): void {
	    if(listener.exitTypeExpression) {
	 		listener.exitTypeExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitTypeExpression) {
			return visitor.visitTypeExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TermContext extends ParserRuleContext {
	constructor(parser?: fhirpathParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return fhirpathParser.RULE_term;
	}
	public override copyFrom(ctx: TermContext): void {
		super.copyFrom(ctx);
	}
}
export class ExternalConstantTermContext extends TermContext {
	constructor(parser: fhirpathParser, ctx: TermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public externalConstant(): ExternalConstantContext {
		return this.getTypedRuleContext(ExternalConstantContext, 0) as ExternalConstantContext;
	}
	public enterRule(listener: fhirpathListener): void {
	    if(listener.enterExternalConstantTerm) {
	 		listener.enterExternalConstantTerm(this);
		}
	}
	public exitRule(listener: fhirpathListener): void {
	    if(listener.exitExternalConstantTerm) {
	 		listener.exitExternalConstantTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitExternalConstantTerm) {
			return visitor.visitExternalConstantTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LiteralTermContext extends TermContext {
	constructor(parser: fhirpathParser, ctx: TermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public literal(): LiteralContext {
		return this.getTypedRuleContext(LiteralContext, 0) as LiteralContext;
	}
	public enterRule(listener: fhirpathListener): void {
	    if(listener.enterLiteralTerm) {
	 		listener.enterLiteralTerm(this);
		}
	}
	public exitRule(listener: fhirpathListener): void {
	    if(listener.exitLiteralTerm) {
	 		listener.exitLiteralTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitLiteralTerm) {
			return visitor.visitLiteralTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ParenthesizedTermContext extends TermContext {
	constructor(parser: fhirpathParser, ctx: TermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public enterRule(listener: fhirpathListener): void {
	    if(listener.enterParenthesizedTerm) {
	 		listener.enterParenthesizedTerm(this);
		}
	}
	public exitRule(listener: fhirpathListener): void {
	    if(listener.exitParenthesizedTerm) {
	 		listener.exitParenthesizedTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitParenthesizedTerm) {
			return visitor.visitParenthesizedTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class InvocationTermContext extends TermContext {
	constructor(parser: fhirpathParser, ctx: TermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public invocation(): InvocationContext {
		return this.getTypedRuleContext(InvocationContext, 0) as InvocationContext;
	}
	public enterRule(listener: fhirpathListener): void {
	    if(listener.enterInvocationTerm) {
	 		listener.enterInvocationTerm(this);
		}
	}
	public exitRule(listener: fhirpathListener): void {
	    if(listener.exitInvocationTerm) {
	 		listener.exitInvocationTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitInvocationTerm) {
			return visitor.visitInvocationTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LiteralContext extends ParserRuleContext {
	constructor(parser?: fhirpathParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return fhirpathParser.RULE_literal;
	}
	public override copyFrom(ctx: LiteralContext): void {
		super.copyFrom(ctx);
	}
}
export class TimeLiteralContext extends LiteralContext {
	constructor(parser: fhirpathParser, ctx: LiteralContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public TIME(): TerminalNode {
		return this.getToken(fhirpathParser.TIME, 0);
	}
	public enterRule(listener: fhirpathListener): void {
	    if(listener.enterTimeLiteral) {
	 		listener.enterTimeLiteral(this);
		}
	}
	public exitRule(listener: fhirpathListener): void {
	    if(listener.exitTimeLiteral) {
	 		listener.exitTimeLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitTimeLiteral) {
			return visitor.visitTimeLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NullLiteralContext extends LiteralContext {
	constructor(parser: fhirpathParser, ctx: LiteralContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public enterRule(listener: fhirpathListener): void {
	    if(listener.enterNullLiteral) {
	 		listener.enterNullLiteral(this);
		}
	}
	public exitRule(listener: fhirpathListener): void {
	    if(listener.exitNullLiteral) {
	 		listener.exitNullLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitNullLiteral) {
			return visitor.visitNullLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DateTimeLiteralContext extends LiteralContext {
	constructor(parser: fhirpathParser, ctx: LiteralContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public DATETIME(): TerminalNode {
		return this.getToken(fhirpathParser.DATETIME, 0);
	}
	public enterRule(listener: fhirpathListener): void {
	    if(listener.enterDateTimeLiteral) {
	 		listener.enterDateTimeLiteral(this);
		}
	}
	public exitRule(listener: fhirpathListener): void {
	    if(listener.exitDateTimeLiteral) {
	 		listener.exitDateTimeLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitDateTimeLiteral) {
			return visitor.visitDateTimeLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class StringLiteralContext extends LiteralContext {
	constructor(parser: fhirpathParser, ctx: LiteralContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public STRING(): TerminalNode {
		return this.getToken(fhirpathParser.STRING, 0);
	}
	public enterRule(listener: fhirpathListener): void {
	    if(listener.enterStringLiteral) {
	 		listener.enterStringLiteral(this);
		}
	}
	public exitRule(listener: fhirpathListener): void {
	    if(listener.exitStringLiteral) {
	 		listener.exitStringLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitStringLiteral) {
			return visitor.visitStringLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DateLiteralContext extends LiteralContext {
	constructor(parser: fhirpathParser, ctx: LiteralContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public DATE(): TerminalNode {
		return this.getToken(fhirpathParser.DATE, 0);
	}
	public enterRule(listener: fhirpathListener): void {
	    if(listener.enterDateLiteral) {
	 		listener.enterDateLiteral(this);
		}
	}
	public exitRule(listener: fhirpathListener): void {
	    if(listener.exitDateLiteral) {
	 		listener.exitDateLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitDateLiteral) {
			return visitor.visitDateLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class BooleanLiteralContext extends LiteralContext {
	constructor(parser: fhirpathParser, ctx: LiteralContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public enterRule(listener: fhirpathListener): void {
	    if(listener.enterBooleanLiteral) {
	 		listener.enterBooleanLiteral(this);
		}
	}
	public exitRule(listener: fhirpathListener): void {
	    if(listener.exitBooleanLiteral) {
	 		listener.exitBooleanLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitBooleanLiteral) {
			return visitor.visitBooleanLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NumberLiteralContext extends LiteralContext {
	constructor(parser: fhirpathParser, ctx: LiteralContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public INTEGER(): TerminalNode {
		return this.getToken(fhirpathParser.INTEGER, 0);
	}
	public DECIMAL(): TerminalNode {
		return this.getToken(fhirpathParser.DECIMAL, 0);
	}
	public enterRule(listener: fhirpathListener): void {
	    if(listener.enterNumberLiteral) {
	 		listener.enterNumberLiteral(this);
		}
	}
	public exitRule(listener: fhirpathListener): void {
	    if(listener.exitNumberLiteral) {
	 		listener.exitNumberLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitNumberLiteral) {
			return visitor.visitNumberLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LongNumberLiteralContext extends LiteralContext {
	constructor(parser: fhirpathParser, ctx: LiteralContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public LONGNUMBER(): TerminalNode {
		return this.getToken(fhirpathParser.LONGNUMBER, 0);
	}
	public enterRule(listener: fhirpathListener): void {
	    if(listener.enterLongNumberLiteral) {
	 		listener.enterLongNumberLiteral(this);
		}
	}
	public exitRule(listener: fhirpathListener): void {
	    if(listener.exitLongNumberLiteral) {
	 		listener.exitLongNumberLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitLongNumberLiteral) {
			return visitor.visitLongNumberLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class QuantityLiteralContext extends LiteralContext {
	constructor(parser: fhirpathParser, ctx: LiteralContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public quantity(): QuantityContext {
		return this.getTypedRuleContext(QuantityContext, 0) as QuantityContext;
	}
	public enterRule(listener: fhirpathListener): void {
	    if(listener.enterQuantityLiteral) {
	 		listener.enterQuantityLiteral(this);
		}
	}
	public exitRule(listener: fhirpathListener): void {
	    if(listener.exitQuantityLiteral) {
	 		listener.exitQuantityLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitQuantityLiteral) {
			return visitor.visitQuantityLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExternalConstantContext extends ParserRuleContext {
	constructor(parser?: fhirpathParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
	public STRING(): TerminalNode {
		return this.getToken(fhirpathParser.STRING, 0);
	}
    public get ruleIndex(): number {
    	return fhirpathParser.RULE_externalConstant;
	}
	public enterRule(listener: fhirpathListener): void {
	    if(listener.enterExternalConstant) {
	 		listener.enterExternalConstant(this);
		}
	}
	public exitRule(listener: fhirpathListener): void {
	    if(listener.exitExternalConstant) {
	 		listener.exitExternalConstant(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitExternalConstant) {
			return visitor.visitExternalConstant(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InvocationContext extends ParserRuleContext {
	constructor(parser?: fhirpathParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return fhirpathParser.RULE_invocation;
	}
	public override copyFrom(ctx: InvocationContext): void {
		super.copyFrom(ctx);
	}
}
export class TotalInvocationContext extends InvocationContext {
	constructor(parser: fhirpathParser, ctx: InvocationContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public enterRule(listener: fhirpathListener): void {
	    if(listener.enterTotalInvocation) {
	 		listener.enterTotalInvocation(this);
		}
	}
	public exitRule(listener: fhirpathListener): void {
	    if(listener.exitTotalInvocation) {
	 		listener.exitTotalInvocation(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitTotalInvocation) {
			return visitor.visitTotalInvocation(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ThisInvocationContext extends InvocationContext {
	constructor(parser: fhirpathParser, ctx: InvocationContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public enterRule(listener: fhirpathListener): void {
	    if(listener.enterThisInvocation) {
	 		listener.enterThisInvocation(this);
		}
	}
	public exitRule(listener: fhirpathListener): void {
	    if(listener.exitThisInvocation) {
	 		listener.exitThisInvocation(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitThisInvocation) {
			return visitor.visitThisInvocation(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class IndexInvocationContext extends InvocationContext {
	constructor(parser: fhirpathParser, ctx: InvocationContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public enterRule(listener: fhirpathListener): void {
	    if(listener.enterIndexInvocation) {
	 		listener.enterIndexInvocation(this);
		}
	}
	public exitRule(listener: fhirpathListener): void {
	    if(listener.exitIndexInvocation) {
	 		listener.exitIndexInvocation(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitIndexInvocation) {
			return visitor.visitIndexInvocation(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class FunctionInvocationContext extends InvocationContext {
	constructor(parser: fhirpathParser, ctx: InvocationContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public function_(): FunctionContext {
		return this.getTypedRuleContext(FunctionContext, 0) as FunctionContext;
	}
	public enterRule(listener: fhirpathListener): void {
	    if(listener.enterFunctionInvocation) {
	 		listener.enterFunctionInvocation(this);
		}
	}
	public exitRule(listener: fhirpathListener): void {
	    if(listener.exitFunctionInvocation) {
	 		listener.exitFunctionInvocation(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitFunctionInvocation) {
			return visitor.visitFunctionInvocation(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class MemberInvocationContext extends InvocationContext {
	constructor(parser: fhirpathParser, ctx: InvocationContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
	public enterRule(listener: fhirpathListener): void {
	    if(listener.enterMemberInvocation) {
	 		listener.enterMemberInvocation(this);
		}
	}
	public exitRule(listener: fhirpathListener): void {
	    if(listener.exitMemberInvocation) {
	 		listener.exitMemberInvocation(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitMemberInvocation) {
			return visitor.visitMemberInvocation(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FunctionContext extends ParserRuleContext {
	constructor(parser?: fhirpathParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public sortArgument_list(): SortArgumentContext[] {
		return this.getTypedRuleContexts(SortArgumentContext) as SortArgumentContext[];
	}
	public sortArgument(i: number): SortArgumentContext {
		return this.getTypedRuleContext(SortArgumentContext, i) as SortArgumentContext;
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
	public paramList(): ParamListContext {
		return this.getTypedRuleContext(ParamListContext, 0) as ParamListContext;
	}
    public get ruleIndex(): number {
    	return fhirpathParser.RULE_function;
	}
	public enterRule(listener: fhirpathListener): void {
	    if(listener.enterFunction) {
	 		listener.enterFunction(this);
		}
	}
	public exitRule(listener: fhirpathListener): void {
	    if(listener.exitFunction) {
	 		listener.exitFunction(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitFunction) {
			return visitor.visitFunction(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SortArgumentContext extends ParserRuleContext {
	constructor(parser?: fhirpathParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return fhirpathParser.RULE_sortArgument;
	}
	public override copyFrom(ctx: SortArgumentContext): void {
		super.copyFrom(ctx);
	}
}
export class SortDirectionArgumentContext extends SortArgumentContext {
	constructor(parser: fhirpathParser, ctx: SortArgumentContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public enterRule(listener: fhirpathListener): void {
	    if(listener.enterSortDirectionArgument) {
	 		listener.enterSortDirectionArgument(this);
		}
	}
	public exitRule(listener: fhirpathListener): void {
	    if(listener.exitSortDirectionArgument) {
	 		listener.exitSortDirectionArgument(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitSortDirectionArgument) {
			return visitor.visitSortDirectionArgument(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParamListContext extends ParserRuleContext {
	constructor(parser?: fhirpathParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
    public get ruleIndex(): number {
    	return fhirpathParser.RULE_paramList;
	}
	public enterRule(listener: fhirpathListener): void {
	    if(listener.enterParamList) {
	 		listener.enterParamList(this);
		}
	}
	public exitRule(listener: fhirpathListener): void {
	    if(listener.exitParamList) {
	 		listener.exitParamList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitParamList) {
			return visitor.visitParamList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class QuantityContext extends ParserRuleContext {
	constructor(parser?: fhirpathParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public INTEGER(): TerminalNode {
		return this.getToken(fhirpathParser.INTEGER, 0);
	}
	public DECIMAL(): TerminalNode {
		return this.getToken(fhirpathParser.DECIMAL, 0);
	}
	public unit(): UnitContext {
		return this.getTypedRuleContext(UnitContext, 0) as UnitContext;
	}
    public get ruleIndex(): number {
    	return fhirpathParser.RULE_quantity;
	}
	public enterRule(listener: fhirpathListener): void {
	    if(listener.enterQuantity) {
	 		listener.enterQuantity(this);
		}
	}
	public exitRule(listener: fhirpathListener): void {
	    if(listener.exitQuantity) {
	 		listener.exitQuantity(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitQuantity) {
			return visitor.visitQuantity(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class UnitContext extends ParserRuleContext {
	constructor(parser?: fhirpathParser, parent?: ParserRuleContext, invokingState?: number) {
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
		return this.getToken(fhirpathParser.STRING, 0);
	}
    public get ruleIndex(): number {
    	return fhirpathParser.RULE_unit;
	}
	public enterRule(listener: fhirpathListener): void {
	    if(listener.enterUnit) {
	 		listener.enterUnit(this);
		}
	}
	public exitRule(listener: fhirpathListener): void {
	    if(listener.exitUnit) {
	 		listener.exitUnit(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitUnit) {
			return visitor.visitUnit(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DateTimePrecisionContext extends ParserRuleContext {
	constructor(parser?: fhirpathParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return fhirpathParser.RULE_dateTimePrecision;
	}
	public enterRule(listener: fhirpathListener): void {
	    if(listener.enterDateTimePrecision) {
	 		listener.enterDateTimePrecision(this);
		}
	}
	public exitRule(listener: fhirpathListener): void {
	    if(listener.exitDateTimePrecision) {
	 		listener.exitDateTimePrecision(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitDateTimePrecision) {
			return visitor.visitDateTimePrecision(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PluralDateTimePrecisionContext extends ParserRuleContext {
	constructor(parser?: fhirpathParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return fhirpathParser.RULE_pluralDateTimePrecision;
	}
	public enterRule(listener: fhirpathListener): void {
	    if(listener.enterPluralDateTimePrecision) {
	 		listener.enterPluralDateTimePrecision(this);
		}
	}
	public exitRule(listener: fhirpathListener): void {
	    if(listener.exitPluralDateTimePrecision) {
	 		listener.exitPluralDateTimePrecision(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitPluralDateTimePrecision) {
			return visitor.visitPluralDateTimePrecision(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeSpecifierContext extends ParserRuleContext {
	constructor(parser?: fhirpathParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public qualifiedIdentifier(): QualifiedIdentifierContext {
		return this.getTypedRuleContext(QualifiedIdentifierContext, 0) as QualifiedIdentifierContext;
	}
    public get ruleIndex(): number {
    	return fhirpathParser.RULE_typeSpecifier;
	}
	public enterRule(listener: fhirpathListener): void {
	    if(listener.enterTypeSpecifier) {
	 		listener.enterTypeSpecifier(this);
		}
	}
	public exitRule(listener: fhirpathListener): void {
	    if(listener.exitTypeSpecifier) {
	 		listener.exitTypeSpecifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitTypeSpecifier) {
			return visitor.visitTypeSpecifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class QualifiedIdentifierContext extends ParserRuleContext {
	constructor(parser?: fhirpathParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifier_list(): IdentifierContext[] {
		return this.getTypedRuleContexts(IdentifierContext) as IdentifierContext[];
	}
	public identifier(i: number): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, i) as IdentifierContext;
	}
    public get ruleIndex(): number {
    	return fhirpathParser.RULE_qualifiedIdentifier;
	}
	public enterRule(listener: fhirpathListener): void {
	    if(listener.enterQualifiedIdentifier) {
	 		listener.enterQualifiedIdentifier(this);
		}
	}
	public exitRule(listener: fhirpathListener): void {
	    if(listener.exitQualifiedIdentifier) {
	 		listener.exitQualifiedIdentifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitQualifiedIdentifier) {
			return visitor.visitQualifiedIdentifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IdentifierContext extends ParserRuleContext {
	constructor(parser?: fhirpathParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(fhirpathParser.IDENTIFIER, 0);
	}
	public DELIMITEDIDENTIFIER(): TerminalNode {
		return this.getToken(fhirpathParser.DELIMITEDIDENTIFIER, 0);
	}
    public get ruleIndex(): number {
    	return fhirpathParser.RULE_identifier;
	}
	public enterRule(listener: fhirpathListener): void {
	    if(listener.enterIdentifier) {
	 		listener.enterIdentifier(this);
		}
	}
	public exitRule(listener: fhirpathListener): void {
	    if(listener.exitIdentifier) {
	 		listener.exitIdentifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: fhirpathVisitor<Result>): Result {
		if (visitor.visitIdentifier) {
			return visitor.visitIdentifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
