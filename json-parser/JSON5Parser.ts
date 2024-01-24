// Generated from ./JSON5.g4 by ANTLR 4.13.1
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
import JSON5Listener from "./JSON5Listener.js";
import JSON5Visitor from "./JSON5Visitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;

export default class JSON5Parser extends Parser {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly T__2 = 3;
	public static readonly T__3 = 4;
	public static readonly T__4 = 5;
	public static readonly T__5 = 6;
	public static readonly SINGLE_LINE_COMMENT = 7;
	public static readonly MULTI_LINE_COMMENT = 8;
	public static readonly LITERAL = 9;
	public static readonly STRING = 10;
	public static readonly NUMBER = 11;
	public static readonly NUMERIC_LITERAL = 12;
	public static readonly SYMBOL = 13;
	public static readonly IDENTIFIER = 14;
	public static readonly WS = 15;
	public static readonly EOF = Token.EOF;
	public static readonly RULE_json5 = 0;
	public static readonly RULE_obj = 1;
	public static readonly RULE_pair = 2;
	public static readonly RULE_key = 3;
	public static readonly RULE_value = 4;
	public static readonly RULE_arr = 5;
	public static readonly RULE_number = 6;
	public static readonly literalNames: (string | null)[] = [ null, "'{'", 
                                                            "','", "'}'", 
                                                            "':'", "'['", 
                                                            "']'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, null, 
                                                             null, null, 
                                                             null, null, 
                                                             null, "SINGLE_LINE_COMMENT", 
                                                             "MULTI_LINE_COMMENT", 
                                                             "LITERAL", 
                                                             "STRING", "NUMBER", 
                                                             "NUMERIC_LITERAL", 
                                                             "SYMBOL", "IDENTIFIER", 
                                                             "WS" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"json5", "obj", "pair", "key", "value", "arr", "number",
	];
	public get grammarFileName(): string { return "JSON5.g4"; }
	public get literalNames(): (string | null)[] { return JSON5Parser.literalNames; }
	public get symbolicNames(): (string | null)[] { return JSON5Parser.symbolicNames; }
	public get ruleNames(): string[] { return JSON5Parser.ruleNames; }
	public get serializedATN(): number[] { return JSON5Parser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(this, JSON5Parser._ATN, JSON5Parser.DecisionsToDFA, new PredictionContextCache());
	}
	// @RuleVersion(0)
	public json5(): Json5Context {
		let localctx: Json5Context = new Json5Context(this, this._ctx, this.state);
		this.enterRule(localctx, 0, JSON5Parser.RULE_json5);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 15;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 15906) !== 0)) {
				{
				this.state = 14;
				this.value();
				}
			}

			this.state = 17;
			this.match(JSON5Parser.EOF);
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
	public obj(): ObjContext {
		let localctx: ObjContext = new ObjContext(this, this._ctx, this.state);
		this.enterRule(localctx, 2, JSON5Parser.RULE_obj);
		let _la: number;
		try {
			let _alt: number;
			this.state = 35;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 3, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 19;
				this.match(JSON5Parser.T__0);
				this.state = 20;
				this.pair();
				this.state = 25;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 1, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 21;
						this.match(JSON5Parser.T__1);
						this.state = 22;
						this.pair();
						}
						}
					}
					this.state = 27;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 1, this._ctx);
				}
				this.state = 29;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===2) {
					{
					this.state = 28;
					this.match(JSON5Parser.T__1);
					}
				}

				this.state = 31;
				this.match(JSON5Parser.T__2);
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 33;
				this.match(JSON5Parser.T__0);
				this.state = 34;
				this.match(JSON5Parser.T__2);
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
	public pair(): PairContext {
		let localctx: PairContext = new PairContext(this, this._ctx, this.state);
		this.enterRule(localctx, 4, JSON5Parser.RULE_pair);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 37;
			this.key();
			this.state = 38;
			this.match(JSON5Parser.T__3);
			this.state = 39;
			this.value();
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
	public key(): KeyContext {
		let localctx: KeyContext = new KeyContext(this, this._ctx, this.state);
		this.enterRule(localctx, 6, JSON5Parser.RULE_key);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 41;
			_la = this._input.LA(1);
			if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 22016) !== 0))) {
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
	public value(): ValueContext {
		let localctx: ValueContext = new ValueContext(this, this._ctx, this.state);
		this.enterRule(localctx, 8, JSON5Parser.RULE_value);
		try {
			this.state = 48;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 10:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 43;
				this.match(JSON5Parser.STRING);
				}
				break;
			case 11:
			case 12:
			case 13:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 44;
				this.number_();
				}
				break;
			case 1:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 45;
				this.obj();
				}
				break;
			case 5:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 46;
				this.arr();
				}
				break;
			case 9:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 47;
				this.match(JSON5Parser.LITERAL);
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
	public arr(): ArrContext {
		let localctx: ArrContext = new ArrContext(this, this._ctx, this.state);
		this.enterRule(localctx, 10, JSON5Parser.RULE_arr);
		let _la: number;
		try {
			let _alt: number;
			this.state = 66;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 7, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 50;
				this.match(JSON5Parser.T__4);
				this.state = 51;
				this.value();
				this.state = 56;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 5, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 52;
						this.match(JSON5Parser.T__1);
						this.state = 53;
						this.value();
						}
						}
					}
					this.state = 58;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 5, this._ctx);
				}
				this.state = 60;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===2) {
					{
					this.state = 59;
					this.match(JSON5Parser.T__1);
					}
				}

				this.state = 62;
				this.match(JSON5Parser.T__5);
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 64;
				this.match(JSON5Parser.T__4);
				this.state = 65;
				this.match(JSON5Parser.T__5);
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
	public number_(): NumberContext {
		let localctx: NumberContext = new NumberContext(this, this._ctx, this.state);
		this.enterRule(localctx, 12, JSON5Parser.RULE_number);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 69;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===13) {
				{
				this.state = 68;
				this.match(JSON5Parser.SYMBOL);
				}
			}

			this.state = 71;
			_la = this._input.LA(1);
			if(!(_la===11 || _la===12)) {
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

	public static readonly _serializedATN: number[] = [4,1,15,74,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,1,0,3,0,16,8,0,1,0,1,0,1,
	1,1,1,1,1,1,1,5,1,24,8,1,10,1,12,1,27,9,1,1,1,3,1,30,8,1,1,1,1,1,1,1,1,
	1,3,1,36,8,1,1,2,1,2,1,2,1,2,1,3,1,3,1,4,1,4,1,4,1,4,1,4,3,4,49,8,4,1,5,
	1,5,1,5,1,5,5,5,55,8,5,10,5,12,5,58,9,5,1,5,3,5,61,8,5,1,5,1,5,1,5,1,5,
	3,5,67,8,5,1,6,3,6,70,8,6,1,6,1,6,1,6,0,0,7,0,2,4,6,8,10,12,0,2,3,0,9,10,
	12,12,14,14,1,0,11,12,78,0,15,1,0,0,0,2,35,1,0,0,0,4,37,1,0,0,0,6,41,1,
	0,0,0,8,48,1,0,0,0,10,66,1,0,0,0,12,69,1,0,0,0,14,16,3,8,4,0,15,14,1,0,
	0,0,15,16,1,0,0,0,16,17,1,0,0,0,17,18,5,0,0,1,18,1,1,0,0,0,19,20,5,1,0,
	0,20,25,3,4,2,0,21,22,5,2,0,0,22,24,3,4,2,0,23,21,1,0,0,0,24,27,1,0,0,0,
	25,23,1,0,0,0,25,26,1,0,0,0,26,29,1,0,0,0,27,25,1,0,0,0,28,30,5,2,0,0,29,
	28,1,0,0,0,29,30,1,0,0,0,30,31,1,0,0,0,31,32,5,3,0,0,32,36,1,0,0,0,33,34,
	5,1,0,0,34,36,5,3,0,0,35,19,1,0,0,0,35,33,1,0,0,0,36,3,1,0,0,0,37,38,3,
	6,3,0,38,39,5,4,0,0,39,40,3,8,4,0,40,5,1,0,0,0,41,42,7,0,0,0,42,7,1,0,0,
	0,43,49,5,10,0,0,44,49,3,12,6,0,45,49,3,2,1,0,46,49,3,10,5,0,47,49,5,9,
	0,0,48,43,1,0,0,0,48,44,1,0,0,0,48,45,1,0,0,0,48,46,1,0,0,0,48,47,1,0,0,
	0,49,9,1,0,0,0,50,51,5,5,0,0,51,56,3,8,4,0,52,53,5,2,0,0,53,55,3,8,4,0,
	54,52,1,0,0,0,55,58,1,0,0,0,56,54,1,0,0,0,56,57,1,0,0,0,57,60,1,0,0,0,58,
	56,1,0,0,0,59,61,5,2,0,0,60,59,1,0,0,0,60,61,1,0,0,0,61,62,1,0,0,0,62,63,
	5,6,0,0,63,67,1,0,0,0,64,65,5,5,0,0,65,67,5,6,0,0,66,50,1,0,0,0,66,64,1,
	0,0,0,67,11,1,0,0,0,68,70,5,13,0,0,69,68,1,0,0,0,69,70,1,0,0,0,70,71,1,
	0,0,0,71,72,7,1,0,0,72,13,1,0,0,0,9,15,25,29,35,48,56,60,66,69];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!JSON5Parser.__ATN) {
			JSON5Parser.__ATN = new ATNDeserializer().deserialize(JSON5Parser._serializedATN);
		}

		return JSON5Parser.__ATN;
	}


	static DecisionsToDFA = JSON5Parser._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );

}

export class Json5Context extends ParserRuleContext {
	constructor(parser?: JSON5Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public EOF(): TerminalNode {
		return this.getToken(JSON5Parser.EOF, 0);
	}
	public value(): ValueContext {
		return this.getTypedRuleContext(ValueContext, 0) as ValueContext;
	}
    public get ruleIndex(): number {
    	return JSON5Parser.RULE_json5;
	}
	public enterRule(listener: JSON5Listener): void {
	    if(listener.enterJson5) {
	 		listener.enterJson5(this);
		}
	}
	public exitRule(listener: JSON5Listener): void {
	    if(listener.exitJson5) {
	 		listener.exitJson5(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JSON5Visitor<Result>): Result {
		if (visitor.visitJson5) {
			return visitor.visitJson5(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ObjContext extends ParserRuleContext {
	constructor(parser?: JSON5Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public pair_list(): PairContext[] {
		return this.getTypedRuleContexts(PairContext) as PairContext[];
	}
	public pair(i: number): PairContext {
		return this.getTypedRuleContext(PairContext, i) as PairContext;
	}
    public get ruleIndex(): number {
    	return JSON5Parser.RULE_obj;
	}
	public enterRule(listener: JSON5Listener): void {
	    if(listener.enterObj) {
	 		listener.enterObj(this);
		}
	}
	public exitRule(listener: JSON5Listener): void {
	    if(listener.exitObj) {
	 		listener.exitObj(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JSON5Visitor<Result>): Result {
		if (visitor.visitObj) {
			return visitor.visitObj(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PairContext extends ParserRuleContext {
	constructor(parser?: JSON5Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public key(): KeyContext {
		return this.getTypedRuleContext(KeyContext, 0) as KeyContext;
	}
	public value(): ValueContext {
		return this.getTypedRuleContext(ValueContext, 0) as ValueContext;
	}
    public get ruleIndex(): number {
    	return JSON5Parser.RULE_pair;
	}
	public enterRule(listener: JSON5Listener): void {
	    if(listener.enterPair) {
	 		listener.enterPair(this);
		}
	}
	public exitRule(listener: JSON5Listener): void {
	    if(listener.exitPair) {
	 		listener.exitPair(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JSON5Visitor<Result>): Result {
		if (visitor.visitPair) {
			return visitor.visitPair(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class KeyContext extends ParserRuleContext {
	constructor(parser?: JSON5Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public STRING(): TerminalNode {
		return this.getToken(JSON5Parser.STRING, 0);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(JSON5Parser.IDENTIFIER, 0);
	}
	public LITERAL(): TerminalNode {
		return this.getToken(JSON5Parser.LITERAL, 0);
	}
	public NUMERIC_LITERAL(): TerminalNode {
		return this.getToken(JSON5Parser.NUMERIC_LITERAL, 0);
	}
    public get ruleIndex(): number {
    	return JSON5Parser.RULE_key;
	}
	public enterRule(listener: JSON5Listener): void {
	    if(listener.enterKey) {
	 		listener.enterKey(this);
		}
	}
	public exitRule(listener: JSON5Listener): void {
	    if(listener.exitKey) {
	 		listener.exitKey(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JSON5Visitor<Result>): Result {
		if (visitor.visitKey) {
			return visitor.visitKey(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ValueContext extends ParserRuleContext {
	constructor(parser?: JSON5Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public STRING(): TerminalNode {
		return this.getToken(JSON5Parser.STRING, 0);
	}
	public number_(): NumberContext {
		return this.getTypedRuleContext(NumberContext, 0) as NumberContext;
	}
	public obj(): ObjContext {
		return this.getTypedRuleContext(ObjContext, 0) as ObjContext;
	}
	public arr(): ArrContext {
		return this.getTypedRuleContext(ArrContext, 0) as ArrContext;
	}
	public LITERAL(): TerminalNode {
		return this.getToken(JSON5Parser.LITERAL, 0);
	}
    public get ruleIndex(): number {
    	return JSON5Parser.RULE_value;
	}
	public enterRule(listener: JSON5Listener): void {
	    if(listener.enterValue) {
	 		listener.enterValue(this);
		}
	}
	public exitRule(listener: JSON5Listener): void {
	    if(listener.exitValue) {
	 		listener.exitValue(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JSON5Visitor<Result>): Result {
		if (visitor.visitValue) {
			return visitor.visitValue(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ArrContext extends ParserRuleContext {
	constructor(parser?: JSON5Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public value_list(): ValueContext[] {
		return this.getTypedRuleContexts(ValueContext) as ValueContext[];
	}
	public value(i: number): ValueContext {
		return this.getTypedRuleContext(ValueContext, i) as ValueContext;
	}
    public get ruleIndex(): number {
    	return JSON5Parser.RULE_arr;
	}
	public enterRule(listener: JSON5Listener): void {
	    if(listener.enterArr) {
	 		listener.enterArr(this);
		}
	}
	public exitRule(listener: JSON5Listener): void {
	    if(listener.exitArr) {
	 		listener.exitArr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JSON5Visitor<Result>): Result {
		if (visitor.visitArr) {
			return visitor.visitArr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NumberContext extends ParserRuleContext {
	constructor(parser?: JSON5Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public NUMERIC_LITERAL(): TerminalNode {
		return this.getToken(JSON5Parser.NUMERIC_LITERAL, 0);
	}
	public NUMBER(): TerminalNode {
		return this.getToken(JSON5Parser.NUMBER, 0);
	}
	public SYMBOL(): TerminalNode {
		return this.getToken(JSON5Parser.SYMBOL, 0);
	}
    public get ruleIndex(): number {
    	return JSON5Parser.RULE_number;
	}
	public enterRule(listener: JSON5Listener): void {
	    if(listener.enterNumber) {
	 		listener.enterNumber(this);
		}
	}
	public exitRule(listener: JSON5Listener): void {
	    if(listener.exitNumber) {
	 		listener.exitNumber(this);
		}
	}
	// @Override
	public accept<Result>(visitor: JSON5Visitor<Result>): Result {
		if (visitor.visitNumber) {
			return visitor.visitNumber(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
