// Generated from XMLParser.g4 by ANTLR 4.13.2
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
import XMLParserListener from "./XMLParserListener.js";
import XMLParserVisitor from "./XMLParserVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;

export default class XMLParser extends Parser {
	public static readonly COMMENT = 1;
	public static readonly CDATA = 2;
	public static readonly DTD = 3;
	public static readonly EntityRef = 4;
	public static readonly CharRef = 5;
	public static readonly SEA_WS = 6;
	public static readonly OPEN = 7;
	public static readonly XMLDeclOpen = 8;
	public static readonly TEXT = 9;
	public static readonly CLOSE = 10;
	public static readonly SPECIAL_CLOSE = 11;
	public static readonly SLASH_CLOSE = 12;
	public static readonly SLASH = 13;
	public static readonly EQUALS = 14;
	public static readonly STRING = 15;
	public static readonly Name = 16;
	public static readonly S = 17;
	public static readonly PI = 18;
	public static override readonly EOF = Token.EOF;
	public static readonly RULE_document = 0;
	public static readonly RULE_prolog = 1;
	public static readonly RULE_content = 2;
	public static readonly RULE_element = 3;
	public static readonly RULE_reference = 4;
	public static readonly RULE_attribute = 5;
	public static readonly RULE_chardata = 6;
	public static readonly RULE_misc = 7;
	public static readonly literalNames: (string | null)[] = [ null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            null, "'<'", 
                                                            null, null, 
                                                            "'>'", null, 
                                                            "'/>'", "'/'", 
                                                            "'='" ];
	public static readonly symbolicNames: (string | null)[] = [ null, "COMMENT", 
                                                             "CDATA", "DTD", 
                                                             "EntityRef", 
                                                             "CharRef", 
                                                             "SEA_WS", "OPEN", 
                                                             "XMLDeclOpen", 
                                                             "TEXT", "CLOSE", 
                                                             "SPECIAL_CLOSE", 
                                                             "SLASH_CLOSE", 
                                                             "SLASH", "EQUALS", 
                                                             "STRING", "Name", 
                                                             "S", "PI" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"document", "prolog", "content", "element", "reference", "attribute", 
		"chardata", "misc",
	];
	public get grammarFileName(): string { return "XMLParser.g4"; }
	public get literalNames(): (string | null)[] { return XMLParser.literalNames; }
	public get symbolicNames(): (string | null)[] { return XMLParser.symbolicNames; }
	public get ruleNames(): string[] { return XMLParser.ruleNames; }
	public get serializedATN(): number[] { return XMLParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(this, XMLParser._ATN, XMLParser.DecisionsToDFA, new PredictionContextCache());
	}
	// @RuleVersion(0)
	public document(): DocumentContext {
		let localctx: DocumentContext = new DocumentContext(this, this._ctx, this.state);
		this.enterRule(localctx, 0, XMLParser.RULE_document);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 17;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===8) {
				{
				this.state = 16;
				this.prolog();
				}
			}

			this.state = 22;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 262210) !== 0)) {
				{
				{
				this.state = 19;
				this.misc();
				}
				}
				this.state = 24;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 25;
			this.element();
			this.state = 29;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 262210) !== 0)) {
				{
				{
				this.state = 26;
				this.misc();
				}
				}
				this.state = 31;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 32;
			this.match(XMLParser.EOF);
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
	public prolog(): PrologContext {
		let localctx: PrologContext = new PrologContext(this, this._ctx, this.state);
		this.enterRule(localctx, 2, XMLParser.RULE_prolog);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 34;
			this.match(XMLParser.XMLDeclOpen);
			this.state = 38;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===16) {
				{
				{
				this.state = 35;
				this.attribute();
				}
				}
				this.state = 40;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 41;
			this.match(XMLParser.SPECIAL_CLOSE);
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
	public content(): ContentContext {
		let localctx: ContentContext = new ContentContext(this, this._ctx, this.state);
		this.enterRule(localctx, 4, XMLParser.RULE_content);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 44;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===6 || _la===9) {
				{
				this.state = 43;
				this.chardata();
				}
			}

			this.state = 58;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 7, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 51;
					this._errHandler.sync(this);
					switch (this._input.LA(1)) {
					case 7:
						{
						this.state = 46;
						this.element();
						}
						break;
					case 4:
					case 5:
						{
						this.state = 47;
						this.reference();
						}
						break;
					case 2:
						{
						this.state = 48;
						this.match(XMLParser.CDATA);
						}
						break;
					case 18:
						{
						this.state = 49;
						this.match(XMLParser.PI);
						}
						break;
					case 1:
						{
						this.state = 50;
						this.match(XMLParser.COMMENT);
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					this.state = 54;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la===6 || _la===9) {
						{
						this.state = 53;
						this.chardata();
						}
					}

					}
					}
				}
				this.state = 60;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 7, this._ctx);
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
	public element(): ElementContext {
		let localctx: ElementContext = new ElementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 6, XMLParser.RULE_element);
		let _la: number;
		try {
			this.state = 85;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 10, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 61;
				this.match(XMLParser.OPEN);
				this.state = 62;
				this.match(XMLParser.Name);
				this.state = 66;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===16) {
					{
					{
					this.state = 63;
					this.attribute();
					}
					}
					this.state = 68;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 69;
				this.match(XMLParser.CLOSE);
				this.state = 70;
				this.content();
				this.state = 71;
				this.match(XMLParser.OPEN);
				this.state = 72;
				this.match(XMLParser.SLASH);
				this.state = 73;
				this.match(XMLParser.Name);
				this.state = 74;
				this.match(XMLParser.CLOSE);
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 76;
				this.match(XMLParser.OPEN);
				this.state = 77;
				this.match(XMLParser.Name);
				this.state = 81;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===16) {
					{
					{
					this.state = 78;
					this.attribute();
					}
					}
					this.state = 83;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 84;
				this.match(XMLParser.SLASH_CLOSE);
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
	public reference(): ReferenceContext {
		let localctx: ReferenceContext = new ReferenceContext(this, this._ctx, this.state);
		this.enterRule(localctx, 8, XMLParser.RULE_reference);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 87;
			_la = this._input.LA(1);
			if(!(_la===4 || _la===5)) {
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
	public attribute(): AttributeContext {
		let localctx: AttributeContext = new AttributeContext(this, this._ctx, this.state);
		this.enterRule(localctx, 10, XMLParser.RULE_attribute);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 89;
			this.match(XMLParser.Name);
			this.state = 90;
			this.match(XMLParser.EQUALS);
			this.state = 91;
			this.match(XMLParser.STRING);
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
	public chardata(): ChardataContext {
		let localctx: ChardataContext = new ChardataContext(this, this._ctx, this.state);
		this.enterRule(localctx, 12, XMLParser.RULE_chardata);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 93;
			_la = this._input.LA(1);
			if(!(_la===6 || _la===9)) {
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
	public misc(): MiscContext {
		let localctx: MiscContext = new MiscContext(this, this._ctx, this.state);
		this.enterRule(localctx, 14, XMLParser.RULE_misc);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 95;
			_la = this._input.LA(1);
			if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 262210) !== 0))) {
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

	public static readonly _serializedATN: number[] = [4,1,18,98,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,1,0,3,0,18,8,0,1,
	0,5,0,21,8,0,10,0,12,0,24,9,0,1,0,1,0,5,0,28,8,0,10,0,12,0,31,9,0,1,0,1,
	0,1,1,1,1,5,1,37,8,1,10,1,12,1,40,9,1,1,1,1,1,1,2,3,2,45,8,2,1,2,1,2,1,
	2,1,2,1,2,3,2,52,8,2,1,2,3,2,55,8,2,5,2,57,8,2,10,2,12,2,60,9,2,1,3,1,3,
	1,3,5,3,65,8,3,10,3,12,3,68,9,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,
	5,3,80,8,3,10,3,12,3,83,9,3,1,3,3,3,86,8,3,1,4,1,4,1,5,1,5,1,5,1,5,1,6,
	1,6,1,7,1,7,1,7,0,0,8,0,2,4,6,8,10,12,14,0,3,1,0,4,5,2,0,6,6,9,9,3,0,1,
	1,6,6,18,18,103,0,17,1,0,0,0,2,34,1,0,0,0,4,44,1,0,0,0,6,85,1,0,0,0,8,87,
	1,0,0,0,10,89,1,0,0,0,12,93,1,0,0,0,14,95,1,0,0,0,16,18,3,2,1,0,17,16,1,
	0,0,0,17,18,1,0,0,0,18,22,1,0,0,0,19,21,3,14,7,0,20,19,1,0,0,0,21,24,1,
	0,0,0,22,20,1,0,0,0,22,23,1,0,0,0,23,25,1,0,0,0,24,22,1,0,0,0,25,29,3,6,
	3,0,26,28,3,14,7,0,27,26,1,0,0,0,28,31,1,0,0,0,29,27,1,0,0,0,29,30,1,0,
	0,0,30,32,1,0,0,0,31,29,1,0,0,0,32,33,5,0,0,1,33,1,1,0,0,0,34,38,5,8,0,
	0,35,37,3,10,5,0,36,35,1,0,0,0,37,40,1,0,0,0,38,36,1,0,0,0,38,39,1,0,0,
	0,39,41,1,0,0,0,40,38,1,0,0,0,41,42,5,11,0,0,42,3,1,0,0,0,43,45,3,12,6,
	0,44,43,1,0,0,0,44,45,1,0,0,0,45,58,1,0,0,0,46,52,3,6,3,0,47,52,3,8,4,0,
	48,52,5,2,0,0,49,52,5,18,0,0,50,52,5,1,0,0,51,46,1,0,0,0,51,47,1,0,0,0,
	51,48,1,0,0,0,51,49,1,0,0,0,51,50,1,0,0,0,52,54,1,0,0,0,53,55,3,12,6,0,
	54,53,1,0,0,0,54,55,1,0,0,0,55,57,1,0,0,0,56,51,1,0,0,0,57,60,1,0,0,0,58,
	56,1,0,0,0,58,59,1,0,0,0,59,5,1,0,0,0,60,58,1,0,0,0,61,62,5,7,0,0,62,66,
	5,16,0,0,63,65,3,10,5,0,64,63,1,0,0,0,65,68,1,0,0,0,66,64,1,0,0,0,66,67,
	1,0,0,0,67,69,1,0,0,0,68,66,1,0,0,0,69,70,5,10,0,0,70,71,3,4,2,0,71,72,
	5,7,0,0,72,73,5,13,0,0,73,74,5,16,0,0,74,75,5,10,0,0,75,86,1,0,0,0,76,77,
	5,7,0,0,77,81,5,16,0,0,78,80,3,10,5,0,79,78,1,0,0,0,80,83,1,0,0,0,81,79,
	1,0,0,0,81,82,1,0,0,0,82,84,1,0,0,0,83,81,1,0,0,0,84,86,5,12,0,0,85,61,
	1,0,0,0,85,76,1,0,0,0,86,7,1,0,0,0,87,88,7,0,0,0,88,9,1,0,0,0,89,90,5,16,
	0,0,90,91,5,14,0,0,91,92,5,15,0,0,92,11,1,0,0,0,93,94,7,1,0,0,94,13,1,0,
	0,0,95,96,7,2,0,0,96,15,1,0,0,0,11,17,22,29,38,44,51,54,58,66,81,85];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!XMLParser.__ATN) {
			XMLParser.__ATN = new ATNDeserializer().deserialize(XMLParser._serializedATN);
		}

		return XMLParser.__ATN;
	}


	static DecisionsToDFA = XMLParser._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );

}

export class DocumentContext extends ParserRuleContext {
	constructor(parser?: XMLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public element(): ElementContext {
		return this.getTypedRuleContext(ElementContext, 0) as ElementContext;
	}
	public EOF(): TerminalNode {
		return this.getToken(XMLParser.EOF, 0);
	}
	public prolog(): PrologContext {
		return this.getTypedRuleContext(PrologContext, 0) as PrologContext;
	}
	public misc_list(): MiscContext[] {
		return this.getTypedRuleContexts(MiscContext) as MiscContext[];
	}
	public misc(i: number): MiscContext {
		return this.getTypedRuleContext(MiscContext, i) as MiscContext;
	}
    public get ruleIndex(): number {
    	return XMLParser.RULE_document;
	}
	public enterRule(listener: XMLParserListener): void {
	    if(listener.enterDocument) {
	 		listener.enterDocument(this);
		}
	}
	public exitRule(listener: XMLParserListener): void {
	    if(listener.exitDocument) {
	 		listener.exitDocument(this);
		}
	}
	// @Override
	public accept<Result>(visitor: XMLParserVisitor<Result>): Result {
		if (visitor.visitDocument) {
			return visitor.visitDocument(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PrologContext extends ParserRuleContext {
	constructor(parser?: XMLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public XMLDeclOpen(): TerminalNode {
		return this.getToken(XMLParser.XMLDeclOpen, 0);
	}
	public SPECIAL_CLOSE(): TerminalNode {
		return this.getToken(XMLParser.SPECIAL_CLOSE, 0);
	}
	public attribute_list(): AttributeContext[] {
		return this.getTypedRuleContexts(AttributeContext) as AttributeContext[];
	}
	public attribute(i: number): AttributeContext {
		return this.getTypedRuleContext(AttributeContext, i) as AttributeContext;
	}
    public get ruleIndex(): number {
    	return XMLParser.RULE_prolog;
	}
	public enterRule(listener: XMLParserListener): void {
	    if(listener.enterProlog) {
	 		listener.enterProlog(this);
		}
	}
	public exitRule(listener: XMLParserListener): void {
	    if(listener.exitProlog) {
	 		listener.exitProlog(this);
		}
	}
	// @Override
	public accept<Result>(visitor: XMLParserVisitor<Result>): Result {
		if (visitor.visitProlog) {
			return visitor.visitProlog(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ContentContext extends ParserRuleContext {
	constructor(parser?: XMLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public chardata_list(): ChardataContext[] {
		return this.getTypedRuleContexts(ChardataContext) as ChardataContext[];
	}
	public chardata(i: number): ChardataContext {
		return this.getTypedRuleContext(ChardataContext, i) as ChardataContext;
	}
	public element_list(): ElementContext[] {
		return this.getTypedRuleContexts(ElementContext) as ElementContext[];
	}
	public element(i: number): ElementContext {
		return this.getTypedRuleContext(ElementContext, i) as ElementContext;
	}
	public reference_list(): ReferenceContext[] {
		return this.getTypedRuleContexts(ReferenceContext) as ReferenceContext[];
	}
	public reference(i: number): ReferenceContext {
		return this.getTypedRuleContext(ReferenceContext, i) as ReferenceContext;
	}
	public CDATA_list(): TerminalNode[] {
	    	return this.getTokens(XMLParser.CDATA);
	}
	public CDATA(i: number): TerminalNode {
		return this.getToken(XMLParser.CDATA, i);
	}
	public PI_list(): TerminalNode[] {
	    	return this.getTokens(XMLParser.PI);
	}
	public PI(i: number): TerminalNode {
		return this.getToken(XMLParser.PI, i);
	}
	public COMMENT_list(): TerminalNode[] {
	    	return this.getTokens(XMLParser.COMMENT);
	}
	public COMMENT(i: number): TerminalNode {
		return this.getToken(XMLParser.COMMENT, i);
	}
    public get ruleIndex(): number {
    	return XMLParser.RULE_content;
	}
	public enterRule(listener: XMLParserListener): void {
	    if(listener.enterContent) {
	 		listener.enterContent(this);
		}
	}
	public exitRule(listener: XMLParserListener): void {
	    if(listener.exitContent) {
	 		listener.exitContent(this);
		}
	}
	// @Override
	public accept<Result>(visitor: XMLParserVisitor<Result>): Result {
		if (visitor.visitContent) {
			return visitor.visitContent(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ElementContext extends ParserRuleContext {
	constructor(parser?: XMLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public OPEN_list(): TerminalNode[] {
	    	return this.getTokens(XMLParser.OPEN);
	}
	public OPEN(i: number): TerminalNode {
		return this.getToken(XMLParser.OPEN, i);
	}
	public Name_list(): TerminalNode[] {
	    	return this.getTokens(XMLParser.Name);
	}
	public Name(i: number): TerminalNode {
		return this.getToken(XMLParser.Name, i);
	}
	public CLOSE_list(): TerminalNode[] {
	    	return this.getTokens(XMLParser.CLOSE);
	}
	public CLOSE(i: number): TerminalNode {
		return this.getToken(XMLParser.CLOSE, i);
	}
	public content(): ContentContext {
		return this.getTypedRuleContext(ContentContext, 0) as ContentContext;
	}
	public SLASH(): TerminalNode {
		return this.getToken(XMLParser.SLASH, 0);
	}
	public attribute_list(): AttributeContext[] {
		return this.getTypedRuleContexts(AttributeContext) as AttributeContext[];
	}
	public attribute(i: number): AttributeContext {
		return this.getTypedRuleContext(AttributeContext, i) as AttributeContext;
	}
	public SLASH_CLOSE(): TerminalNode {
		return this.getToken(XMLParser.SLASH_CLOSE, 0);
	}
    public get ruleIndex(): number {
    	return XMLParser.RULE_element;
	}
	public enterRule(listener: XMLParserListener): void {
	    if(listener.enterElement) {
	 		listener.enterElement(this);
		}
	}
	public exitRule(listener: XMLParserListener): void {
	    if(listener.exitElement) {
	 		listener.exitElement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: XMLParserVisitor<Result>): Result {
		if (visitor.visitElement) {
			return visitor.visitElement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ReferenceContext extends ParserRuleContext {
	constructor(parser?: XMLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public EntityRef(): TerminalNode {
		return this.getToken(XMLParser.EntityRef, 0);
	}
	public CharRef(): TerminalNode {
		return this.getToken(XMLParser.CharRef, 0);
	}
    public get ruleIndex(): number {
    	return XMLParser.RULE_reference;
	}
	public enterRule(listener: XMLParserListener): void {
	    if(listener.enterReference) {
	 		listener.enterReference(this);
		}
	}
	public exitRule(listener: XMLParserListener): void {
	    if(listener.exitReference) {
	 		listener.exitReference(this);
		}
	}
	// @Override
	public accept<Result>(visitor: XMLParserVisitor<Result>): Result {
		if (visitor.visitReference) {
			return visitor.visitReference(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AttributeContext extends ParserRuleContext {
	constructor(parser?: XMLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public Name(): TerminalNode {
		return this.getToken(XMLParser.Name, 0);
	}
	public EQUALS(): TerminalNode {
		return this.getToken(XMLParser.EQUALS, 0);
	}
	public STRING(): TerminalNode {
		return this.getToken(XMLParser.STRING, 0);
	}
    public get ruleIndex(): number {
    	return XMLParser.RULE_attribute;
	}
	public enterRule(listener: XMLParserListener): void {
	    if(listener.enterAttribute) {
	 		listener.enterAttribute(this);
		}
	}
	public exitRule(listener: XMLParserListener): void {
	    if(listener.exitAttribute) {
	 		listener.exitAttribute(this);
		}
	}
	// @Override
	public accept<Result>(visitor: XMLParserVisitor<Result>): Result {
		if (visitor.visitAttribute) {
			return visitor.visitAttribute(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ChardataContext extends ParserRuleContext {
	constructor(parser?: XMLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public TEXT(): TerminalNode {
		return this.getToken(XMLParser.TEXT, 0);
	}
	public SEA_WS(): TerminalNode {
		return this.getToken(XMLParser.SEA_WS, 0);
	}
    public get ruleIndex(): number {
    	return XMLParser.RULE_chardata;
	}
	public enterRule(listener: XMLParserListener): void {
	    if(listener.enterChardata) {
	 		listener.enterChardata(this);
		}
	}
	public exitRule(listener: XMLParserListener): void {
	    if(listener.exitChardata) {
	 		listener.exitChardata(this);
		}
	}
	// @Override
	public accept<Result>(visitor: XMLParserVisitor<Result>): Result {
		if (visitor.visitChardata) {
			return visitor.visitChardata(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MiscContext extends ParserRuleContext {
	constructor(parser?: XMLParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public COMMENT(): TerminalNode {
		return this.getToken(XMLParser.COMMENT, 0);
	}
	public PI(): TerminalNode {
		return this.getToken(XMLParser.PI, 0);
	}
	public SEA_WS(): TerminalNode {
		return this.getToken(XMLParser.SEA_WS, 0);
	}
    public get ruleIndex(): number {
    	return XMLParser.RULE_misc;
	}
	public enterRule(listener: XMLParserListener): void {
	    if(listener.enterMisc) {
	 		listener.enterMisc(this);
		}
	}
	public exitRule(listener: XMLParserListener): void {
	    if(listener.exitMisc) {
	 		listener.exitMisc(this);
		}
	}
	// @Override
	public accept<Result>(visitor: XMLParserVisitor<Result>): Result {
		if (visitor.visitMisc) {
			return visitor.visitMisc(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
