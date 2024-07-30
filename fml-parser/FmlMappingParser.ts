// Generated from FmlMapping.g4 by ANTLR 4.13.1
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
import FmlMappingListener from "./FmlMappingListener.js";
import FmlMappingVisitor from "./FmlMappingVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;

export default class FmlMappingParser extends Parser {
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
	public static readonly T__57 = 58;
	public static readonly T__58 = 59;
	public static readonly T__59 = 60;
	public static readonly T__60 = 61;
	public static readonly T__61 = 62;
	public static readonly T__62 = 63;
	public static readonly T__63 = 64;
	public static readonly T__64 = 65;
	public static readonly T__65 = 66;
	public static readonly T__66 = 67;
	public static readonly T__67 = 68;
	public static readonly T__68 = 69;
	public static readonly T__69 = 70;
	public static readonly T__70 = 71;
	public static readonly T__71 = 72;
	public static readonly T__72 = 73;
	public static readonly T__73 = 74;
	public static readonly T__74 = 75;
	public static readonly T__75 = 76;
	public static readonly T__76 = 77;
	public static readonly T__77 = 78;
	public static readonly T__78 = 79;
	public static readonly T__79 = 80;
	public static readonly T__80 = 81;
	public static readonly T__81 = 82;
	public static readonly T__82 = 83;
	public static readonly T__83 = 84;
	public static readonly T__84 = 85;
	public static readonly NULL_LITERAL = 86;
	public static readonly BOOL = 87;
	public static readonly DATE = 88;
	public static readonly DATE_TIME = 89;
	public static readonly TIME = 90;
	public static readonly LONG_INTEGER = 91;
	public static readonly DECIMAL = 92;
	public static readonly INTEGER = 93;
	public static readonly ID = 94;
	public static readonly IDENTIFIER = 95;
	public static readonly DELIMITED_IDENTIFIER = 96;
	public static readonly SINGLE_QUOTED_STRING = 97;
	public static readonly DOUBLE_QUOTED_STRING = 98;
	public static readonly TRIPLE_QUOTED_STRING_LITERAL = 99;
	public static readonly WS = 100;
	public static readonly BLOCK_COMMENT = 101;
	public static readonly METADATA_PREFIX = 102;
	public static readonly LINE_COMMENT = 103;
	public static readonly EOF = Token.EOF;
	public static readonly RULE_structureMap = 0;
	public static readonly RULE_conceptMapDeclaration = 1;
	public static readonly RULE_conceptMapPrefix = 2;
	public static readonly RULE_conceptMapCodeMap = 3;
	public static readonly RULE_conceptMapSource = 4;
	public static readonly RULE_conceptMapTarget = 5;
	public static readonly RULE_code = 6;
	public static readonly RULE_mapDeclaration = 7;
	public static readonly RULE_metadataDeclaration = 8;
	public static readonly RULE_markdownLiteral = 9;
	public static readonly RULE_url = 10;
	public static readonly RULE_identifier = 11;
	public static readonly RULE_structureDeclaration = 12;
	public static readonly RULE_constantDeclaration = 13;
	public static readonly RULE_groupDeclaration = 14;
	public static readonly RULE_parameters = 15;
	public static readonly RULE_parameter = 16;
	public static readonly RULE_groupExpressions = 17;
	public static readonly RULE_typeMode = 18;
	public static readonly RULE_extends = 19;
	public static readonly RULE_typeIdentifier = 20;
	public static readonly RULE_expression = 21;
	public static readonly RULE_mapExpression = 22;
	public static readonly RULE_mapExpressionName = 23;
	public static readonly RULE_mapExpressionSource = 24;
	public static readonly RULE_mapExpressionTarget = 25;
	public static readonly RULE_sourceCardinality = 26;
	public static readonly RULE_upperBound = 27;
	public static readonly RULE_qualifiedIdentifier = 28;
	public static readonly RULE_sourceDefault = 29;
	public static readonly RULE_alias = 30;
	public static readonly RULE_whereClause = 31;
	public static readonly RULE_checkClause = 32;
	public static readonly RULE_log = 33;
	public static readonly RULE_dependentExpression = 34;
	public static readonly RULE_importDeclaration = 35;
	public static readonly RULE_mapLineTarget = 36;
	public static readonly RULE_transform = 37;
	public static readonly RULE_invocation = 38;
	public static readonly RULE_paramList = 39;
	public static readonly RULE_param = 40;
	public static readonly RULE_fpExpression = 41;
	public static readonly RULE_fpTerm = 42;
	public static readonly RULE_fpInvocation = 43;
	public static readonly RULE_fpExternalConstant = 44;
	public static readonly RULE_fpFunction = 45;
	public static readonly RULE_fpParamList = 46;
	public static readonly RULE_fpTypeSpecifier = 47;
	public static readonly RULE_constant = 48;
	public static readonly RULE_literal = 49;
	public static readonly RULE_fpQuantity = 50;
	public static readonly literalNames: (string | null)[] = [ null, "'conceptmap'", 
                                                            "'{'", "'}'", 
                                                            "'prefix'", 
                                                            "'='", "'-'", 
                                                            "':'", "'map'", 
                                                            "'uses'", "'alias'", 
                                                            "'as'", "'source'", 
                                                            "'queried'", 
                                                            "'target'", 
                                                            "'produced'", 
                                                            "'let'", "';'", 
                                                            "'group'", "'('", 
                                                            "','", "')'", 
                                                            "'<<'", "'types'", 
                                                            "'type+'", "'>>'", 
                                                            "'extends'", 
                                                            "'->'", "'first'", 
                                                            "'not_first'", 
                                                            "'last'", "'not_last'", 
                                                            "'only_one'", 
                                                            "'..'", "'*'", 
                                                            "'imports'", 
                                                            "'where'", "'check'", 
                                                            "'div'", "'contains'", 
                                                            "'is'", "'.'", 
                                                            "'default'", 
                                                            "'log'", "'then'", 
                                                            "'share'", "'single'", 
                                                            "'['", "']'", 
                                                            "'+'", "'/'", 
                                                            "'mod'", "'&'", 
                                                            "'|'", "'<='", 
                                                            "'<'", "'>'", 
                                                            "'>='", "'~'", 
                                                            "'!='", "'!~'", 
                                                            "'in'", "'and'", 
                                                            "'or'", "'xor'", 
                                                            "'implies'", 
                                                            "'$this'", "'$index'", 
                                                            "'$total'", 
                                                            "'%'", "'year'", 
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
                                                            null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            "'/// '" ];
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
                                                             "NULL_LITERAL", 
                                                             "BOOL", "DATE", 
                                                             "DATE_TIME", 
                                                             "TIME", "LONG_INTEGER", 
                                                             "DECIMAL", 
                                                             "INTEGER", 
                                                             "ID", "IDENTIFIER", 
                                                             "DELIMITED_IDENTIFIER", 
                                                             "SINGLE_QUOTED_STRING", 
                                                             "DOUBLE_QUOTED_STRING", 
                                                             "TRIPLE_QUOTED_STRING_LITERAL", 
                                                             "WS", "BLOCK_COMMENT", 
                                                             "METADATA_PREFIX", 
                                                             "LINE_COMMENT" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"structureMap", "conceptMapDeclaration", "conceptMapPrefix", "conceptMapCodeMap", 
		"conceptMapSource", "conceptMapTarget", "code", "mapDeclaration", "metadataDeclaration", 
		"markdownLiteral", "url", "identifier", "structureDeclaration", "constantDeclaration", 
		"groupDeclaration", "parameters", "parameter", "groupExpressions", "typeMode", 
		"extends", "typeIdentifier", "expression", "mapExpression", "mapExpressionName", 
		"mapExpressionSource", "mapExpressionTarget", "sourceCardinality", "upperBound", 
		"qualifiedIdentifier", "sourceDefault", "alias", "whereClause", "checkClause", 
		"log", "dependentExpression", "importDeclaration", "mapLineTarget", "transform", 
		"invocation", "paramList", "param", "fpExpression", "fpTerm", "fpInvocation", 
		"fpExternalConstant", "fpFunction", "fpParamList", "fpTypeSpecifier", 
		"constant", "literal", "fpQuantity",
	];
	public get grammarFileName(): string { return "FmlMapping.g4"; }
	public get literalNames(): (string | null)[] { return FmlMappingParser.literalNames; }
	public get symbolicNames(): (string | null)[] { return FmlMappingParser.symbolicNames; }
	public get ruleNames(): string[] { return FmlMappingParser.ruleNames; }
	public get serializedATN(): number[] { return FmlMappingParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(this, FmlMappingParser._ATN, FmlMappingParser.DecisionsToDFA, new PredictionContextCache());
	}
	// @RuleVersion(0)
	public structureMap(): StructureMapContext {
		let localctx: StructureMapContext = new StructureMapContext(this, this._ctx, this.state);
		this.enterRule(localctx, 0, FmlMappingParser.RULE_structureMap);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 105;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 0, this._ctx);
			while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1 + 1) {
					{
					{
					this.state = 102;
					this.metadataDeclaration();
					}
					}
				}
				this.state = 107;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 0, this._ctx);
			}
			this.state = 111;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 1, this._ctx);
			while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1 + 1) {
					{
					{
					this.state = 108;
					this.conceptMapDeclaration();
					}
					}
				}
				this.state = 113;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 1, this._ctx);
			}
			this.state = 115;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===8) {
				{
				this.state = 114;
				this.mapDeclaration();
				}
			}

			this.state = 120;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 3, this._ctx);
			while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1 + 1) {
					{
					{
					this.state = 117;
					this.structureDeclaration();
					}
					}
				}
				this.state = 122;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 3, this._ctx);
			}
			this.state = 126;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 4, this._ctx);
			while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1 + 1) {
					{
					{
					this.state = 123;
					this.importDeclaration();
					}
					}
				}
				this.state = 128;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 4, this._ctx);
			}
			this.state = 132;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 5, this._ctx);
			while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1 + 1) {
					{
					{
					this.state = 129;
					this.constantDeclaration();
					}
					}
				}
				this.state = 134;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 5, this._ctx);
			}
			this.state = 136;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 135;
				this.groupDeclaration();
				}
				}
				this.state = 138;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la===18);
			this.state = 140;
			this.match(FmlMappingParser.EOF);
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
	public conceptMapDeclaration(): ConceptMapDeclarationContext {
		let localctx: ConceptMapDeclarationContext = new ConceptMapDeclarationContext(this, this._ctx, this.state);
		this.enterRule(localctx, 2, FmlMappingParser.RULE_conceptMapDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 142;
			this.match(FmlMappingParser.T__0);
			this.state = 143;
			this.url();
			this.state = 144;
			this.match(FmlMappingParser.T__1);
			this.state = 146;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 145;
				this.conceptMapPrefix();
				}
				}
				this.state = 148;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la===4);
			this.state = 151;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 150;
				this.conceptMapCodeMap();
				}
				}
				this.state = 153;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la===94);
			this.state = 155;
			this.match(FmlMappingParser.T__2);
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
	public conceptMapPrefix(): ConceptMapPrefixContext {
		let localctx: ConceptMapPrefixContext = new ConceptMapPrefixContext(this, this._ctx, this.state);
		this.enterRule(localctx, 4, FmlMappingParser.RULE_conceptMapPrefix);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 157;
			this.match(FmlMappingParser.T__3);
			this.state = 158;
			this.match(FmlMappingParser.ID);
			this.state = 159;
			this.match(FmlMappingParser.T__4);
			this.state = 160;
			this.url();
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
	public conceptMapCodeMap(): ConceptMapCodeMapContext {
		let localctx: ConceptMapCodeMapContext = new ConceptMapCodeMapContext(this, this._ctx, this.state);
		this.enterRule(localctx, 6, FmlMappingParser.RULE_conceptMapCodeMap);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 162;
			this.conceptMapSource();
			this.state = 163;
			this.match(FmlMappingParser.T__5);
			this.state = 164;
			this.conceptMapTarget();
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
	public conceptMapSource(): ConceptMapSourceContext {
		let localctx: ConceptMapSourceContext = new ConceptMapSourceContext(this, this._ctx, this.state);
		this.enterRule(localctx, 8, FmlMappingParser.RULE_conceptMapSource);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 166;
			this.match(FmlMappingParser.ID);
			this.state = 167;
			this.match(FmlMappingParser.T__6);
			this.state = 168;
			this.code();
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
	public conceptMapTarget(): ConceptMapTargetContext {
		let localctx: ConceptMapTargetContext = new ConceptMapTargetContext(this, this._ctx, this.state);
		this.enterRule(localctx, 10, FmlMappingParser.RULE_conceptMapTarget);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 170;
			this.match(FmlMappingParser.ID);
			this.state = 171;
			this.match(FmlMappingParser.T__6);
			this.state = 172;
			this.code();
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
	public code(): CodeContext {
		let localctx: CodeContext = new CodeContext(this, this._ctx, this.state);
		this.enterRule(localctx, 12, FmlMappingParser.RULE_code);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 174;
			_la = this._input.LA(1);
			if(!(((((_la - 94)) & ~0x1F) === 0 && ((1 << (_la - 94)) & 25) !== 0))) {
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
	public mapDeclaration(): MapDeclarationContext {
		let localctx: MapDeclarationContext = new MapDeclarationContext(this, this._ctx, this.state);
		this.enterRule(localctx, 14, FmlMappingParser.RULE_mapDeclaration);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 176;
			this.match(FmlMappingParser.T__7);
			this.state = 177;
			this.url();
			this.state = 178;
			this.match(FmlMappingParser.T__4);
			this.state = 179;
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
	public metadataDeclaration(): MetadataDeclarationContext {
		let localctx: MetadataDeclarationContext = new MetadataDeclarationContext(this, this._ctx, this.state);
		this.enterRule(localctx, 16, FmlMappingParser.RULE_metadataDeclaration);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 181;
			this.match(FmlMappingParser.METADATA_PREFIX);
			this.state = 182;
			this.qualifiedIdentifier();
			this.state = 183;
			this.match(FmlMappingParser.T__4);
			this.state = 186;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 86:
			case 87:
			case 88:
			case 89:
			case 90:
			case 91:
			case 92:
			case 93:
			case 97:
			case 98:
				{
				this.state = 184;
				this.literal();
				}
				break;
			case 99:
				{
				this.state = 185;
				this.markdownLiteral();
				}
				break;
			case 1:
			case 8:
			case 9:
			case 16:
			case 18:
			case 35:
			case 102:
				break;
			default:
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
	public markdownLiteral(): MarkdownLiteralContext {
		let localctx: MarkdownLiteralContext = new MarkdownLiteralContext(this, this._ctx, this.state);
		this.enterRule(localctx, 18, FmlMappingParser.RULE_markdownLiteral);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 188;
			this.match(FmlMappingParser.TRIPLE_QUOTED_STRING_LITERAL);
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
	public url(): UrlContext {
		let localctx: UrlContext = new UrlContext(this, this._ctx, this.state);
		this.enterRule(localctx, 20, FmlMappingParser.RULE_url);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 190;
			_la = this._input.LA(1);
			if(!(_la===97 || _la===98)) {
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
	public identifier(): IdentifierContext {
		let localctx: IdentifierContext = new IdentifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 22, FmlMappingParser.RULE_identifier);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 192;
			_la = this._input.LA(1);
			if(!(((((_la - 94)) & ~0x1F) === 0 && ((1 << (_la - 94)) & 7) !== 0))) {
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
	public structureDeclaration(): StructureDeclarationContext {
		let localctx: StructureDeclarationContext = new StructureDeclarationContext(this, this._ctx, this.state);
		this.enterRule(localctx, 24, FmlMappingParser.RULE_structureDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 194;
			this.match(FmlMappingParser.T__8);
			this.state = 195;
			this.url();
			this.state = 198;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===10) {
				{
				this.state = 196;
				this.match(FmlMappingParser.T__9);
				this.state = 197;
				this.identifier();
				}
			}

			this.state = 200;
			this.match(FmlMappingParser.T__10);
			this.state = 201;
			_la = this._input.LA(1);
			if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 61440) !== 0))) {
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
	public constantDeclaration(): ConstantDeclarationContext {
		let localctx: ConstantDeclarationContext = new ConstantDeclarationContext(this, this._ctx, this.state);
		this.enterRule(localctx, 26, FmlMappingParser.RULE_constantDeclaration);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 203;
			this.match(FmlMappingParser.T__15);
			this.state = 204;
			this.match(FmlMappingParser.ID);
			this.state = 205;
			this.match(FmlMappingParser.T__4);
			this.state = 206;
			this.fpExpression(0);
			this.state = 207;
			this.match(FmlMappingParser.T__16);
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
	public groupDeclaration(): GroupDeclarationContext {
		let localctx: GroupDeclarationContext = new GroupDeclarationContext(this, this._ctx, this.state);
		this.enterRule(localctx, 28, FmlMappingParser.RULE_groupDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 209;
			this.match(FmlMappingParser.T__17);
			this.state = 210;
			this.match(FmlMappingParser.ID);
			this.state = 211;
			this.parameters();
			this.state = 213;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===26) {
				{
				this.state = 212;
				this.extends_();
				}
			}

			this.state = 216;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===22) {
				{
				this.state = 215;
				this.typeMode();
				}
			}

			this.state = 218;
			this.groupExpressions();
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
	public parameters(): ParametersContext {
		let localctx: ParametersContext = new ParametersContext(this, this._ctx, this.state);
		this.enterRule(localctx, 30, FmlMappingParser.RULE_parameters);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 220;
			this.match(FmlMappingParser.T__18);
			this.state = 221;
			this.parameter();
			this.state = 224;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 222;
				this.match(FmlMappingParser.T__19);
				this.state = 223;
				this.parameter();
				}
				}
				this.state = 226;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la===20);
			this.state = 228;
			this.match(FmlMappingParser.T__20);
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
	public parameter(): ParameterContext {
		let localctx: ParameterContext = new ParameterContext(this, this._ctx, this.state);
		this.enterRule(localctx, 32, FmlMappingParser.RULE_parameter);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 230;
			_la = this._input.LA(1);
			if(!(_la===12 || _la===14)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 231;
			this.match(FmlMappingParser.ID);
			this.state = 233;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===7) {
				{
				this.state = 232;
				this.typeIdentifier();
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
	public groupExpressions(): GroupExpressionsContext {
		let localctx: GroupExpressionsContext = new GroupExpressionsContext(this, this._ctx, this.state);
		this.enterRule(localctx, 34, FmlMappingParser.RULE_groupExpressions);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 235;
			this.match(FmlMappingParser.T__1);
			this.state = 239;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 1418026768) !== 0) || ((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & 63) !== 0) || _la===94 || _la===95) {
				{
				{
				this.state = 236;
				this.expression();
				}
				}
				this.state = 241;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 242;
			this.match(FmlMappingParser.T__2);
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
	public typeMode(): TypeModeContext {
		let localctx: TypeModeContext = new TypeModeContext(this, this._ctx, this.state);
		this.enterRule(localctx, 36, FmlMappingParser.RULE_typeMode);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 244;
			this.match(FmlMappingParser.T__21);
			this.state = 245;
			_la = this._input.LA(1);
			if(!(_la===23 || _la===24)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 246;
			this.match(FmlMappingParser.T__24);
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
	public extends_(): ExtendsContext {
		let localctx: ExtendsContext = new ExtendsContext(this, this._ctx, this.state);
		this.enterRule(localctx, 38, FmlMappingParser.RULE_extends);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 248;
			this.match(FmlMappingParser.T__25);
			this.state = 249;
			this.match(FmlMappingParser.ID);
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
	public typeIdentifier(): TypeIdentifierContext {
		let localctx: TypeIdentifierContext = new TypeIdentifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 40, FmlMappingParser.RULE_typeIdentifier);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 251;
			this.match(FmlMappingParser.T__6);
			this.state = 252;
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
	public expression(): ExpressionContext {
		let localctx: ExpressionContext = new ExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 42, FmlMappingParser.RULE_expression);
		let _la: number;
		try {
			this.state = 265;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 17, this._ctx) ) {
			case 1:
				localctx = new MapSimpleCopyContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 254;
				this.qualifiedIdentifier();
				this.state = 255;
				this.match(FmlMappingParser.T__26);
				this.state = 256;
				this.qualifiedIdentifier();
				this.state = 258;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===98) {
					{
					this.state = 257;
					this.mapExpressionName();
					}
				}

				this.state = 260;
				this.match(FmlMappingParser.T__16);
				}
				break;
			case 2:
				localctx = new MapFhirMarkupContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 262;
				this.mapExpression();
				this.state = 263;
				this.match(FmlMappingParser.T__16);
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
	public mapExpression(): MapExpressionContext {
		let localctx: MapExpressionContext = new MapExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 44, FmlMappingParser.RULE_mapExpression);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 267;
			this.mapExpressionSource();
			this.state = 272;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===20) {
				{
				{
				this.state = 268;
				this.match(FmlMappingParser.T__19);
				this.state = 269;
				this.mapExpressionSource();
				}
				}
				this.state = 274;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 277;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===27) {
				{
				this.state = 275;
				this.match(FmlMappingParser.T__26);
				this.state = 276;
				this.mapExpressionTarget();
				}
			}

			this.state = 280;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===44) {
				{
				this.state = 279;
				this.dependentExpression();
				}
			}

			this.state = 283;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===98) {
				{
				this.state = 282;
				this.mapExpressionName();
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
	public mapExpressionName(): MapExpressionNameContext {
		let localctx: MapExpressionNameContext = new MapExpressionNameContext(this, this._ctx, this.state);
		this.enterRule(localctx, 46, FmlMappingParser.RULE_mapExpressionName);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 285;
			this.match(FmlMappingParser.DOUBLE_QUOTED_STRING);
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
	public mapExpressionSource(): MapExpressionSourceContext {
		let localctx: MapExpressionSourceContext = new MapExpressionSourceContext(this, this._ctx, this.state);
		this.enterRule(localctx, 48, FmlMappingParser.RULE_mapExpressionSource);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 287;
			this.qualifiedIdentifier();
			this.state = 289;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===7) {
				{
				this.state = 288;
				this.typeIdentifier();
				}
			}

			this.state = 292;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===93) {
				{
				this.state = 291;
				this.sourceCardinality();
				}
			}

			this.state = 295;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===42) {
				{
				this.state = 294;
				this.sourceDefault();
				}
			}

			this.state = 298;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 28)) & ~0x1F) === 0 && ((1 << (_la - 28)) & 31) !== 0)) {
				{
				this.state = 297;
				_la = this._input.LA(1);
				if(!(((((_la - 28)) & ~0x1F) === 0 && ((1 << (_la - 28)) & 31) !== 0))) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				}
			}

			this.state = 301;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===11) {
				{
				this.state = 300;
				this.alias();
				}
			}

			this.state = 304;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===36) {
				{
				this.state = 303;
				this.whereClause();
				}
			}

			this.state = 307;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===37) {
				{
				this.state = 306;
				this.checkClause();
				}
			}

			this.state = 310;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===43) {
				{
				this.state = 309;
				this.log();
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
	public mapExpressionTarget(): MapExpressionTargetContext {
		let localctx: MapExpressionTargetContext = new MapExpressionTargetContext(this, this._ctx, this.state);
		this.enterRule(localctx, 50, FmlMappingParser.RULE_mapExpressionTarget);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 312;
			this.mapLineTarget();
			this.state = 317;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===20) {
				{
				{
				this.state = 313;
				this.match(FmlMappingParser.T__19);
				this.state = 314;
				this.mapLineTarget();
				}
				}
				this.state = 319;
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
	public sourceCardinality(): SourceCardinalityContext {
		let localctx: SourceCardinalityContext = new SourceCardinalityContext(this, this._ctx, this.state);
		this.enterRule(localctx, 52, FmlMappingParser.RULE_sourceCardinality);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 320;
			this.match(FmlMappingParser.INTEGER);
			this.state = 321;
			this.match(FmlMappingParser.T__32);
			this.state = 322;
			this.upperBound();
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
	public upperBound(): UpperBoundContext {
		let localctx: UpperBoundContext = new UpperBoundContext(this, this._ctx, this.state);
		this.enterRule(localctx, 54, FmlMappingParser.RULE_upperBound);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 324;
			_la = this._input.LA(1);
			if(!(_la===34 || _la===93)) {
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
	public qualifiedIdentifier(): QualifiedIdentifierContext {
		let localctx: QualifiedIdentifierContext = new QualifiedIdentifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 56, FmlMappingParser.RULE_qualifiedIdentifier);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 326;
			_la = this._input.LA(1);
			if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 1418026768) !== 0) || ((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & 63) !== 0) || _la===94 || _la===95)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 331;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 31, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 327;
					this.match(FmlMappingParser.T__40);
					this.state = 328;
					_la = this._input.LA(1);
					if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 1418026768) !== 0) || ((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & 63) !== 0) || _la===94 || _la===95)) {
					this._errHandler.recoverInline(this);
					}
					else {
						this._errHandler.reportMatch(this);
					    this.consume();
					}
					}
					}
				}
				this.state = 333;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 31, this._ctx);
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
	public sourceDefault(): SourceDefaultContext {
		let localctx: SourceDefaultContext = new SourceDefaultContext(this, this._ctx, this.state);
		this.enterRule(localctx, 58, FmlMappingParser.RULE_sourceDefault);
		try {
			this.state = 341;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 32, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 334;
				this.match(FmlMappingParser.T__41);
				this.state = 335;
				this.match(FmlMappingParser.T__18);
				this.state = 336;
				this.fpExpression(0);
				this.state = 337;
				this.match(FmlMappingParser.T__20);
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 339;
				this.match(FmlMappingParser.T__41);
				this.state = 340;
				this.match(FmlMappingParser.DOUBLE_QUOTED_STRING);
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
	public alias(): AliasContext {
		let localctx: AliasContext = new AliasContext(this, this._ctx, this.state);
		this.enterRule(localctx, 60, FmlMappingParser.RULE_alias);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 343;
			this.match(FmlMappingParser.T__10);
			this.state = 344;
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
	public whereClause(): WhereClauseContext {
		let localctx: WhereClauseContext = new WhereClauseContext(this, this._ctx, this.state);
		this.enterRule(localctx, 62, FmlMappingParser.RULE_whereClause);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 346;
			this.match(FmlMappingParser.T__35);
			this.state = 347;
			this.match(FmlMappingParser.T__18);
			this.state = 348;
			this.fpExpression(0);
			this.state = 349;
			this.match(FmlMappingParser.T__20);
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
	public checkClause(): CheckClauseContext {
		let localctx: CheckClauseContext = new CheckClauseContext(this, this._ctx, this.state);
		this.enterRule(localctx, 64, FmlMappingParser.RULE_checkClause);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 351;
			this.match(FmlMappingParser.T__36);
			this.state = 352;
			this.match(FmlMappingParser.T__18);
			this.state = 353;
			this.fpExpression(0);
			this.state = 354;
			this.match(FmlMappingParser.T__20);
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
	public log(): LogContext {
		let localctx: LogContext = new LogContext(this, this._ctx, this.state);
		this.enterRule(localctx, 66, FmlMappingParser.RULE_log);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 356;
			this.match(FmlMappingParser.T__42);
			this.state = 357;
			this.match(FmlMappingParser.T__18);
			this.state = 358;
			this.fpExpression(0);
			this.state = 359;
			this.match(FmlMappingParser.T__20);
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
	public dependentExpression(): DependentExpressionContext {
		let localctx: DependentExpressionContext = new DependentExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 68, FmlMappingParser.RULE_dependentExpression);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 361;
			this.match(FmlMappingParser.T__43);
			this.state = 374;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 94:
			case 95:
			case 96:
				{
				this.state = 362;
				this.invocation();
				this.state = 367;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===20) {
					{
					{
					this.state = 363;
					this.match(FmlMappingParser.T__19);
					this.state = 364;
					this.invocation();
					}
					}
					this.state = 369;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 371;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===2) {
					{
					this.state = 370;
					this.groupExpressions();
					}
				}

				}
				break;
			case 2:
				{
				this.state = 373;
				this.groupExpressions();
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
	public importDeclaration(): ImportDeclarationContext {
		let localctx: ImportDeclarationContext = new ImportDeclarationContext(this, this._ctx, this.state);
		this.enterRule(localctx, 70, FmlMappingParser.RULE_importDeclaration);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 376;
			this.match(FmlMappingParser.T__34);
			this.state = 377;
			this.url();
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
	public mapLineTarget(): MapLineTargetContext {
		let localctx: MapLineTargetContext = new MapLineTargetContext(this, this._ctx, this.state);
		this.enterRule(localctx, 72, FmlMappingParser.RULE_mapLineTarget);
		let _la: number;
		try {
			this.state = 403;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 42, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 379;
				this.qualifiedIdentifier();
				this.state = 382;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===5) {
					{
					this.state = 380;
					this.match(FmlMappingParser.T__4);
					this.state = 381;
					this.transform();
					}
				}

				this.state = 385;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===11) {
					{
					this.state = 384;
					this.alias();
					}
				}

				this.state = 388;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 28)) & ~0x1F) === 0 && ((1 << (_la - 28)) & 393221) !== 0)) {
					{
					this.state = 387;
					_la = this._input.LA(1);
					if(!(((((_la - 28)) & ~0x1F) === 0 && ((1 << (_la - 28)) & 393221) !== 0))) {
					this._errHandler.recoverInline(this);
					}
					else {
						this._errHandler.reportMatch(this);
					    this.consume();
					}
					}
				}

				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 390;
				this.match(FmlMappingParser.T__18);
				this.state = 391;
				this.fpExpression(0);
				this.state = 392;
				this.match(FmlMappingParser.T__20);
				this.state = 394;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===11) {
					{
					this.state = 393;
					this.alias();
					}
				}

				this.state = 397;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 28)) & ~0x1F) === 0 && ((1 << (_la - 28)) & 393221) !== 0)) {
					{
					this.state = 396;
					_la = this._input.LA(1);
					if(!(((((_la - 28)) & ~0x1F) === 0 && ((1 << (_la - 28)) & 393221) !== 0))) {
					this._errHandler.recoverInline(this);
					}
					else {
						this._errHandler.reportMatch(this);
					    this.consume();
					}
					}
				}

				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 399;
				this.invocation();
				this.state = 401;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===11) {
					{
					this.state = 400;
					this.alias();
					}
				}

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
	public transform(): TransformContext {
		let localctx: TransformContext = new TransformContext(this, this._ctx, this.state);
		this.enterRule(localctx, 74, FmlMappingParser.RULE_transform);
		try {
			this.state = 412;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 43, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 405;
				this.literal();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 406;
				this.qualifiedIdentifier();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 407;
				this.invocation();
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 408;
				this.match(FmlMappingParser.T__18);
				this.state = 409;
				this.fpExpression(0);
				this.state = 410;
				this.match(FmlMappingParser.T__20);
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
		this.enterRule(localctx, 76, FmlMappingParser.RULE_invocation);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 414;
			this.identifier();
			this.state = 415;
			this.match(FmlMappingParser.T__18);
			this.state = 417;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & 6655) !== 0)) {
				{
				this.state = 416;
				this.paramList();
				}
			}

			this.state = 419;
			this.match(FmlMappingParser.T__20);
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
		this.enterRule(localctx, 78, FmlMappingParser.RULE_paramList);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 421;
			this.param();
			this.state = 426;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===20) {
				{
				{
				this.state = 422;
				this.match(FmlMappingParser.T__19);
				this.state = 423;
				this.param();
				}
				}
				this.state = 428;
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
	public param(): ParamContext {
		let localctx: ParamContext = new ParamContext(this, this._ctx, this.state);
		this.enterRule(localctx, 80, FmlMappingParser.RULE_param);
		try {
			this.state = 431;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 86:
			case 87:
			case 88:
			case 89:
			case 90:
			case 91:
			case 92:
			case 93:
			case 97:
			case 98:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 429;
				this.literal();
				}
				break;
			case 94:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 430;
				this.match(FmlMappingParser.ID);
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

	public fpExpression(): FpExpressionContext;
	public fpExpression(_p: number): FpExpressionContext;
	// @RuleVersion(0)
	public fpExpression(_p?: number): FpExpressionContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let localctx: FpExpressionContext = new FpExpressionContext(this, this._ctx, _parentState);
		let _prevctx: FpExpressionContext = localctx;
		let _startState: number = 82;
		this.enterRecursionRule(localctx, 82, FmlMappingParser.RULE_fpExpression, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 437;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 4:
			case 8:
			case 9:
			case 10:
			case 11:
			case 12:
			case 14:
			case 16:
			case 18:
			case 19:
			case 23:
			case 26:
			case 28:
			case 30:
			case 35:
			case 36:
			case 37:
			case 38:
			case 39:
			case 40:
			case 66:
			case 67:
			case 68:
			case 69:
			case 86:
			case 87:
			case 88:
			case 89:
			case 90:
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

				this.state = 434;
				this.fpTerm();
				}
				break;
			case 6:
			case 49:
				{
				localctx = new PolarityExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 435;
				_la = this._input.LA(1);
				if(!(_la===6 || _la===49)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 436;
				this.fpExpression(11);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 479;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 49, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 477;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 48, this._ctx) ) {
					case 1:
						{
						localctx = new MultiplicativeExpressionContext(this, new FpExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, FmlMappingParser.RULE_fpExpression);
						this.state = 439;
						if (!(this.precpred(this._ctx, 10))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 10)");
						}
						this.state = 440;
						_la = this._input.LA(1);
						if(!(((((_la - 34)) & ~0x1F) === 0 && ((1 << (_la - 34)) & 196625) !== 0))) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 441;
						this.fpExpression(11);
						}
						break;
					case 2:
						{
						localctx = new AdditiveExpressionContext(this, new FpExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, FmlMappingParser.RULE_fpExpression);
						this.state = 442;
						if (!(this.precpred(this._ctx, 9))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 9)");
						}
						this.state = 443;
						_la = this._input.LA(1);
						if(!(_la===6 || _la===49 || _la===52)) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 444;
						this.fpExpression(10);
						}
						break;
					case 3:
						{
						localctx = new UnionExpressionContext(this, new FpExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, FmlMappingParser.RULE_fpExpression);
						this.state = 445;
						if (!(this.precpred(this._ctx, 7))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 7)");
						}
						{
						this.state = 446;
						this.match(FmlMappingParser.T__52);
						}
						this.state = 447;
						this.fpExpression(8);
						}
						break;
					case 4:
						{
						localctx = new InequalityExpressionContext(this, new FpExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, FmlMappingParser.RULE_fpExpression);
						this.state = 448;
						if (!(this.precpred(this._ctx, 6))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 6)");
						}
						this.state = 449;
						_la = this._input.LA(1);
						if(!(((((_la - 54)) & ~0x1F) === 0 && ((1 << (_la - 54)) & 15) !== 0))) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 450;
						this.fpExpression(7);
						}
						break;
					case 5:
						{
						localctx = new EqualityExpressionContext(this, new FpExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, FmlMappingParser.RULE_fpExpression);
						this.state = 451;
						if (!(this.precpred(this._ctx, 5))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 5)");
						}
						this.state = 452;
						_la = this._input.LA(1);
						if(!(_la===5 || ((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 7) !== 0))) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 453;
						this.fpExpression(6);
						}
						break;
					case 6:
						{
						localctx = new MembershipExpressionContext(this, new FpExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, FmlMappingParser.RULE_fpExpression);
						this.state = 454;
						if (!(this.precpred(this._ctx, 4))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
						}
						this.state = 455;
						_la = this._input.LA(1);
						if(!(_la===39 || _la===61)) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 456;
						this.fpExpression(5);
						}
						break;
					case 7:
						{
						localctx = new AndExpressionContext(this, new FpExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, FmlMappingParser.RULE_fpExpression);
						this.state = 457;
						if (!(this.precpred(this._ctx, 3))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 3)");
						}
						{
						this.state = 458;
						this.match(FmlMappingParser.T__61);
						}
						this.state = 459;
						this.fpExpression(4);
						}
						break;
					case 8:
						{
						localctx = new OrExpressionContext(this, new FpExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, FmlMappingParser.RULE_fpExpression);
						this.state = 460;
						if (!(this.precpred(this._ctx, 2))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 2)");
						}
						this.state = 461;
						_la = this._input.LA(1);
						if(!(_la===63 || _la===64)) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 462;
						this.fpExpression(3);
						}
						break;
					case 9:
						{
						localctx = new ImpliesExpressionContext(this, new FpExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, FmlMappingParser.RULE_fpExpression);
						this.state = 463;
						if (!(this.precpred(this._ctx, 1))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
						}
						{
						this.state = 464;
						this.match(FmlMappingParser.T__64);
						}
						this.state = 465;
						this.fpExpression(2);
						}
						break;
					case 10:
						{
						localctx = new InvocationExpressionContext(this, new FpExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, FmlMappingParser.RULE_fpExpression);
						this.state = 466;
						if (!(this.precpred(this._ctx, 13))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 13)");
						}
						this.state = 467;
						this.match(FmlMappingParser.T__40);
						this.state = 468;
						this.fpInvocation();
						}
						break;
					case 11:
						{
						localctx = new IndexerExpressionContext(this, new FpExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, FmlMappingParser.RULE_fpExpression);
						this.state = 469;
						if (!(this.precpred(this._ctx, 12))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 12)");
						}
						this.state = 470;
						this.match(FmlMappingParser.T__46);
						this.state = 471;
						this.fpExpression(0);
						this.state = 472;
						this.match(FmlMappingParser.T__47);
						}
						break;
					case 12:
						{
						localctx = new TypeExpressionContext(this, new FpExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, FmlMappingParser.RULE_fpExpression);
						this.state = 474;
						if (!(this.precpred(this._ctx, 8))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 8)");
						}
						this.state = 475;
						_la = this._input.LA(1);
						if(!(_la===11 || _la===40)) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 476;
						this.fpTypeSpecifier();
						}
						break;
					}
					}
				}
				this.state = 481;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 49, this._ctx);
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
	public fpTerm(): FpTermContext {
		let localctx: FpTermContext = new FpTermContext(this, this._ctx, this.state);
		this.enterRule(localctx, 84, FmlMappingParser.RULE_fpTerm);
		try {
			this.state = 489;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 4:
			case 8:
			case 9:
			case 10:
			case 11:
			case 12:
			case 14:
			case 16:
			case 18:
			case 23:
			case 26:
			case 28:
			case 30:
			case 35:
			case 36:
			case 37:
			case 38:
			case 39:
			case 40:
			case 66:
			case 67:
			case 68:
			case 94:
			case 95:
			case 96:
				localctx = new InvocationTermContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 482;
				this.fpInvocation();
				}
				break;
			case 86:
			case 87:
			case 88:
			case 89:
			case 90:
			case 91:
			case 92:
			case 93:
			case 97:
			case 98:
				localctx = new LiteralTermContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 483;
				this.literal();
				}
				break;
			case 69:
				localctx = new ExternalConstantTermContext(this, localctx);
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 484;
				this.fpExternalConstant();
				}
				break;
			case 19:
				localctx = new ParenthesizedTermContext(this, localctx);
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 485;
				this.match(FmlMappingParser.T__18);
				this.state = 486;
				this.fpExpression(0);
				this.state = 487;
				this.match(FmlMappingParser.T__20);
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
	public fpInvocation(): FpInvocationContext {
		let localctx: FpInvocationContext = new FpInvocationContext(this, this._ctx, this.state);
		this.enterRule(localctx, 86, FmlMappingParser.RULE_fpInvocation);
		try {
			this.state = 496;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 51, this._ctx) ) {
			case 1:
				localctx = new FunctionInvocationContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 491;
				this.fpFunction();
				}
				break;
			case 2:
				localctx = new MemberInvocationContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 492;
				this.identifier();
				}
				break;
			case 3:
				localctx = new ThisInvocationContext(this, localctx);
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 493;
				this.match(FmlMappingParser.T__65);
				}
				break;
			case 4:
				localctx = new IndexInvocationContext(this, localctx);
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 494;
				this.match(FmlMappingParser.T__66);
				}
				break;
			case 5:
				localctx = new TotalInvocationContext(this, localctx);
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 495;
				this.match(FmlMappingParser.T__67);
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
	public fpExternalConstant(): FpExternalConstantContext {
		let localctx: FpExternalConstantContext = new FpExternalConstantContext(this, this._ctx, this.state);
		this.enterRule(localctx, 88, FmlMappingParser.RULE_fpExternalConstant);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 498;
			this.match(FmlMappingParser.T__68);
			this.state = 501;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 94:
			case 95:
			case 96:
				{
				this.state = 499;
				this.identifier();
				}
				break;
			case 97:
				{
				this.state = 500;
				this.match(FmlMappingParser.SINGLE_QUOTED_STRING);
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
	public fpFunction(): FpFunctionContext {
		let localctx: FpFunctionContext = new FpFunctionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 90, FmlMappingParser.RULE_fpFunction);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 503;
			this.qualifiedIdentifier();
			this.state = 504;
			this.match(FmlMappingParser.T__18);
			this.state = 506;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 1418551120) !== 0) || ((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & 2147500095) !== 0) || ((((_la - 67)) & ~0x1F) === 0 && ((1 << (_la - 67)) & 4294443015) !== 0)) {
				{
				this.state = 505;
				this.fpParamList();
				}
			}

			this.state = 508;
			this.match(FmlMappingParser.T__20);
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
	public fpParamList(): FpParamListContext {
		let localctx: FpParamListContext = new FpParamListContext(this, this._ctx, this.state);
		this.enterRule(localctx, 92, FmlMappingParser.RULE_fpParamList);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 510;
			this.fpExpression(0);
			this.state = 515;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===20) {
				{
				{
				this.state = 511;
				this.match(FmlMappingParser.T__19);
				this.state = 512;
				this.fpExpression(0);
				}
				}
				this.state = 517;
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
	public fpTypeSpecifier(): FpTypeSpecifierContext {
		let localctx: FpTypeSpecifierContext = new FpTypeSpecifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 94, FmlMappingParser.RULE_fpTypeSpecifier);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 518;
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
	public constant(): ConstantContext {
		let localctx: ConstantContext = new ConstantContext(this, this._ctx, this.state);
		this.enterRule(localctx, 96, FmlMappingParser.RULE_constant);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 520;
			this.match(FmlMappingParser.ID);
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
		this.enterRule(localctx, 98, FmlMappingParser.RULE_literal);
		let _la: number;
		try {
			this.state = 532;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 55, this._ctx) ) {
			case 1:
				localctx = new NullLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 522;
				this.match(FmlMappingParser.NULL_LITERAL);
				}
				break;
			case 2:
				localctx = new BooleanLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 523;
				this.match(FmlMappingParser.BOOL);
				}
				break;
			case 3:
				localctx = new QuantityLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 524;
				this.fpQuantity();
				}
				break;
			case 4:
				localctx = new LongNumberLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 525;
				this.match(FmlMappingParser.LONG_INTEGER);
				}
				break;
			case 5:
				localctx = new NumberLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 526;
				_la = this._input.LA(1);
				if(!(_la===92 || _la===93)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				}
				break;
			case 6:
				localctx = new DateLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 527;
				this.match(FmlMappingParser.DATE);
				}
				break;
			case 7:
				localctx = new DateTimeLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 528;
				this.match(FmlMappingParser.DATE_TIME);
				}
				break;
			case 8:
				localctx = new TimeLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 8);
				{
				this.state = 529;
				this.match(FmlMappingParser.TIME);
				}
				break;
			case 9:
				localctx = new StringLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 9);
				{
				this.state = 530;
				this.match(FmlMappingParser.SINGLE_QUOTED_STRING);
				}
				break;
			case 10:
				localctx = new QuotedStringLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 10);
				{
				this.state = 531;
				this.match(FmlMappingParser.DOUBLE_QUOTED_STRING);
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
	public fpQuantity(): FpQuantityContext {
		let localctx: FpQuantityContext = new FpQuantityContext(this, this._ctx, this.state);
		this.enterRule(localctx, 100, FmlMappingParser.RULE_fpQuantity);
		let _la: number;
		try {
			this.state = 540;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 56, this._ctx) ) {
			case 1:
				localctx = new QuantityWithDateContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 534;
				_la = this._input.LA(1);
				if(!(_la===92 || _la===93)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 535;
				_la = this._input.LA(1);
				if(!(((((_la - 70)) & ~0x1F) === 0 && ((1 << (_la - 70)) & 255) !== 0))) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				}
				break;
			case 2:
				localctx = new QuantityWithDatePluralContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 536;
				_la = this._input.LA(1);
				if(!(_la===92 || _la===93)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 537;
				_la = this._input.LA(1);
				if(!(((((_la - 78)) & ~0x1F) === 0 && ((1 << (_la - 78)) & 255) !== 0))) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				}
				break;
			case 3:
				localctx = new QuantityWithUcumContext(this, localctx);
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 538;
				_la = this._input.LA(1);
				if(!(_la===92 || _la===93)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 539;
				this.match(FmlMappingParser.SINGLE_QUOTED_STRING);
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

	public sempred(localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 41:
			return this.fpExpression_sempred(localctx as FpExpressionContext, predIndex);
		}
		return true;
	}
	private fpExpression_sempred(localctx: FpExpressionContext, predIndex: number): boolean {
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

	public static readonly _serializedATN: number[] = [4,1,103,543,2,0,7,0,
	2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,
	2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,
	17,7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,
	7,24,2,25,7,25,2,26,7,26,2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,
	31,2,32,7,32,2,33,7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,
	2,39,7,39,2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,45,2,
	46,7,46,2,47,7,47,2,48,7,48,2,49,7,49,2,50,7,50,1,0,5,0,104,8,0,10,0,12,
	0,107,9,0,1,0,5,0,110,8,0,10,0,12,0,113,9,0,1,0,3,0,116,8,0,1,0,5,0,119,
	8,0,10,0,12,0,122,9,0,1,0,5,0,125,8,0,10,0,12,0,128,9,0,1,0,5,0,131,8,0,
	10,0,12,0,134,9,0,1,0,4,0,137,8,0,11,0,12,0,138,1,0,1,0,1,1,1,1,1,1,1,1,
	4,1,147,8,1,11,1,12,1,148,1,1,4,1,152,8,1,11,1,12,1,153,1,1,1,1,1,2,1,2,
	1,2,1,2,1,2,1,3,1,3,1,3,1,3,1,4,1,4,1,4,1,4,1,5,1,5,1,5,1,5,1,6,1,6,1,7,
	1,7,1,7,1,7,1,7,1,8,1,8,1,8,1,8,1,8,3,8,187,8,8,1,9,1,9,1,10,1,10,1,11,
	1,11,1,12,1,12,1,12,1,12,3,12,199,8,12,1,12,1,12,1,12,1,13,1,13,1,13,1,
	13,1,13,1,13,1,14,1,14,1,14,1,14,3,14,214,8,14,1,14,3,14,217,8,14,1,14,
	1,14,1,15,1,15,1,15,1,15,4,15,225,8,15,11,15,12,15,226,1,15,1,15,1,16,1,
	16,1,16,3,16,234,8,16,1,17,1,17,5,17,238,8,17,10,17,12,17,241,9,17,1,17,
	1,17,1,18,1,18,1,18,1,18,1,19,1,19,1,19,1,20,1,20,1,20,1,21,1,21,1,21,1,
	21,3,21,259,8,21,1,21,1,21,1,21,1,21,1,21,3,21,266,8,21,1,22,1,22,1,22,
	5,22,271,8,22,10,22,12,22,274,9,22,1,22,1,22,3,22,278,8,22,1,22,3,22,281,
	8,22,1,22,3,22,284,8,22,1,23,1,23,1,24,1,24,3,24,290,8,24,1,24,3,24,293,
	8,24,1,24,3,24,296,8,24,1,24,3,24,299,8,24,1,24,3,24,302,8,24,1,24,3,24,
	305,8,24,1,24,3,24,308,8,24,1,24,3,24,311,8,24,1,25,1,25,1,25,5,25,316,
	8,25,10,25,12,25,319,9,25,1,26,1,26,1,26,1,26,1,27,1,27,1,28,1,28,1,28,
	5,28,330,8,28,10,28,12,28,333,9,28,1,29,1,29,1,29,1,29,1,29,1,29,1,29,3,
	29,342,8,29,1,30,1,30,1,30,1,31,1,31,1,31,1,31,1,31,1,32,1,32,1,32,1,32,
	1,32,1,33,1,33,1,33,1,33,1,33,1,34,1,34,1,34,1,34,5,34,366,8,34,10,34,12,
	34,369,9,34,1,34,3,34,372,8,34,1,34,3,34,375,8,34,1,35,1,35,1,35,1,36,1,
	36,1,36,3,36,383,8,36,1,36,3,36,386,8,36,1,36,3,36,389,8,36,1,36,1,36,1,
	36,1,36,3,36,395,8,36,1,36,3,36,398,8,36,1,36,1,36,3,36,402,8,36,3,36,404,
	8,36,1,37,1,37,1,37,1,37,1,37,1,37,1,37,3,37,413,8,37,1,38,1,38,1,38,3,
	38,418,8,38,1,38,1,38,1,39,1,39,1,39,5,39,425,8,39,10,39,12,39,428,9,39,
	1,40,1,40,3,40,432,8,40,1,41,1,41,1,41,1,41,3,41,438,8,41,1,41,1,41,1,41,
	1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,
	41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,1,41,
	1,41,1,41,1,41,1,41,1,41,1,41,5,41,478,8,41,10,41,12,41,481,9,41,1,42,1,
	42,1,42,1,42,1,42,1,42,1,42,3,42,490,8,42,1,43,1,43,1,43,1,43,1,43,3,43,
	497,8,43,1,44,1,44,1,44,3,44,502,8,44,1,45,1,45,1,45,3,45,507,8,45,1,45,
	1,45,1,46,1,46,1,46,5,46,514,8,46,10,46,12,46,517,9,46,1,47,1,47,1,48,1,
	48,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,1,49,3,49,533,8,49,1,50,
	1,50,1,50,1,50,1,50,1,50,3,50,541,8,50,1,50,5,105,111,120,126,132,1,82,
	51,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,
	50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,
	98,100,0,21,2,0,94,94,97,98,1,0,97,98,1,0,94,96,1,0,12,15,2,0,12,12,14,
	14,1,0,23,24,1,0,28,32,2,0,34,34,93,93,11,0,4,4,8,12,14,14,16,16,18,18,
	23,23,26,26,28,28,30,30,35,40,94,95,3,0,28,28,30,30,45,46,2,0,6,6,49,49,
	3,0,34,34,38,38,50,51,3,0,6,6,49,49,52,52,1,0,54,57,2,0,5,5,58,60,2,0,39,
	39,61,61,1,0,63,64,2,0,11,11,40,40,1,0,92,93,1,0,70,77,1,0,78,85,576,0,
	105,1,0,0,0,2,142,1,0,0,0,4,157,1,0,0,0,6,162,1,0,0,0,8,166,1,0,0,0,10,
	170,1,0,0,0,12,174,1,0,0,0,14,176,1,0,0,0,16,181,1,0,0,0,18,188,1,0,0,0,
	20,190,1,0,0,0,22,192,1,0,0,0,24,194,1,0,0,0,26,203,1,0,0,0,28,209,1,0,
	0,0,30,220,1,0,0,0,32,230,1,0,0,0,34,235,1,0,0,0,36,244,1,0,0,0,38,248,
	1,0,0,0,40,251,1,0,0,0,42,265,1,0,0,0,44,267,1,0,0,0,46,285,1,0,0,0,48,
	287,1,0,0,0,50,312,1,0,0,0,52,320,1,0,0,0,54,324,1,0,0,0,56,326,1,0,0,0,
	58,341,1,0,0,0,60,343,1,0,0,0,62,346,1,0,0,0,64,351,1,0,0,0,66,356,1,0,
	0,0,68,361,1,0,0,0,70,376,1,0,0,0,72,403,1,0,0,0,74,412,1,0,0,0,76,414,
	1,0,0,0,78,421,1,0,0,0,80,431,1,0,0,0,82,437,1,0,0,0,84,489,1,0,0,0,86,
	496,1,0,0,0,88,498,1,0,0,0,90,503,1,0,0,0,92,510,1,0,0,0,94,518,1,0,0,0,
	96,520,1,0,0,0,98,532,1,0,0,0,100,540,1,0,0,0,102,104,3,16,8,0,103,102,
	1,0,0,0,104,107,1,0,0,0,105,106,1,0,0,0,105,103,1,0,0,0,106,111,1,0,0,0,
	107,105,1,0,0,0,108,110,3,2,1,0,109,108,1,0,0,0,110,113,1,0,0,0,111,112,
	1,0,0,0,111,109,1,0,0,0,112,115,1,0,0,0,113,111,1,0,0,0,114,116,3,14,7,
	0,115,114,1,0,0,0,115,116,1,0,0,0,116,120,1,0,0,0,117,119,3,24,12,0,118,
	117,1,0,0,0,119,122,1,0,0,0,120,121,1,0,0,0,120,118,1,0,0,0,121,126,1,0,
	0,0,122,120,1,0,0,0,123,125,3,70,35,0,124,123,1,0,0,0,125,128,1,0,0,0,126,
	127,1,0,0,0,126,124,1,0,0,0,127,132,1,0,0,0,128,126,1,0,0,0,129,131,3,26,
	13,0,130,129,1,0,0,0,131,134,1,0,0,0,132,133,1,0,0,0,132,130,1,0,0,0,133,
	136,1,0,0,0,134,132,1,0,0,0,135,137,3,28,14,0,136,135,1,0,0,0,137,138,1,
	0,0,0,138,136,1,0,0,0,138,139,1,0,0,0,139,140,1,0,0,0,140,141,5,0,0,1,141,
	1,1,0,0,0,142,143,5,1,0,0,143,144,3,20,10,0,144,146,5,2,0,0,145,147,3,4,
	2,0,146,145,1,0,0,0,147,148,1,0,0,0,148,146,1,0,0,0,148,149,1,0,0,0,149,
	151,1,0,0,0,150,152,3,6,3,0,151,150,1,0,0,0,152,153,1,0,0,0,153,151,1,0,
	0,0,153,154,1,0,0,0,154,155,1,0,0,0,155,156,5,3,0,0,156,3,1,0,0,0,157,158,
	5,4,0,0,158,159,5,94,0,0,159,160,5,5,0,0,160,161,3,20,10,0,161,5,1,0,0,
	0,162,163,3,8,4,0,163,164,5,6,0,0,164,165,3,10,5,0,165,7,1,0,0,0,166,167,
	5,94,0,0,167,168,5,7,0,0,168,169,3,12,6,0,169,9,1,0,0,0,170,171,5,94,0,
	0,171,172,5,7,0,0,172,173,3,12,6,0,173,11,1,0,0,0,174,175,7,0,0,0,175,13,
	1,0,0,0,176,177,5,8,0,0,177,178,3,20,10,0,178,179,5,5,0,0,179,180,3,22,
	11,0,180,15,1,0,0,0,181,182,5,102,0,0,182,183,3,56,28,0,183,186,5,5,0,0,
	184,187,3,98,49,0,185,187,3,18,9,0,186,184,1,0,0,0,186,185,1,0,0,0,186,
	187,1,0,0,0,187,17,1,0,0,0,188,189,5,99,0,0,189,19,1,0,0,0,190,191,7,1,
	0,0,191,21,1,0,0,0,192,193,7,2,0,0,193,23,1,0,0,0,194,195,5,9,0,0,195,198,
	3,20,10,0,196,197,5,10,0,0,197,199,3,22,11,0,198,196,1,0,0,0,198,199,1,
	0,0,0,199,200,1,0,0,0,200,201,5,11,0,0,201,202,7,3,0,0,202,25,1,0,0,0,203,
	204,5,16,0,0,204,205,5,94,0,0,205,206,5,5,0,0,206,207,3,82,41,0,207,208,
	5,17,0,0,208,27,1,0,0,0,209,210,5,18,0,0,210,211,5,94,0,0,211,213,3,30,
	15,0,212,214,3,38,19,0,213,212,1,0,0,0,213,214,1,0,0,0,214,216,1,0,0,0,
	215,217,3,36,18,0,216,215,1,0,0,0,216,217,1,0,0,0,217,218,1,0,0,0,218,219,
	3,34,17,0,219,29,1,0,0,0,220,221,5,19,0,0,221,224,3,32,16,0,222,223,5,20,
	0,0,223,225,3,32,16,0,224,222,1,0,0,0,225,226,1,0,0,0,226,224,1,0,0,0,226,
	227,1,0,0,0,227,228,1,0,0,0,228,229,5,21,0,0,229,31,1,0,0,0,230,231,7,4,
	0,0,231,233,5,94,0,0,232,234,3,40,20,0,233,232,1,0,0,0,233,234,1,0,0,0,
	234,33,1,0,0,0,235,239,5,2,0,0,236,238,3,42,21,0,237,236,1,0,0,0,238,241,
	1,0,0,0,239,237,1,0,0,0,239,240,1,0,0,0,240,242,1,0,0,0,241,239,1,0,0,0,
	242,243,5,3,0,0,243,35,1,0,0,0,244,245,5,22,0,0,245,246,7,5,0,0,246,247,
	5,25,0,0,247,37,1,0,0,0,248,249,5,26,0,0,249,250,5,94,0,0,250,39,1,0,0,
	0,251,252,5,7,0,0,252,253,3,22,11,0,253,41,1,0,0,0,254,255,3,56,28,0,255,
	256,5,27,0,0,256,258,3,56,28,0,257,259,3,46,23,0,258,257,1,0,0,0,258,259,
	1,0,0,0,259,260,1,0,0,0,260,261,5,17,0,0,261,266,1,0,0,0,262,263,3,44,22,
	0,263,264,5,17,0,0,264,266,1,0,0,0,265,254,1,0,0,0,265,262,1,0,0,0,266,
	43,1,0,0,0,267,272,3,48,24,0,268,269,5,20,0,0,269,271,3,48,24,0,270,268,
	1,0,0,0,271,274,1,0,0,0,272,270,1,0,0,0,272,273,1,0,0,0,273,277,1,0,0,0,
	274,272,1,0,0,0,275,276,5,27,0,0,276,278,3,50,25,0,277,275,1,0,0,0,277,
	278,1,0,0,0,278,280,1,0,0,0,279,281,3,68,34,0,280,279,1,0,0,0,280,281,1,
	0,0,0,281,283,1,0,0,0,282,284,3,46,23,0,283,282,1,0,0,0,283,284,1,0,0,0,
	284,45,1,0,0,0,285,286,5,98,0,0,286,47,1,0,0,0,287,289,3,56,28,0,288,290,
	3,40,20,0,289,288,1,0,0,0,289,290,1,0,0,0,290,292,1,0,0,0,291,293,3,52,
	26,0,292,291,1,0,0,0,292,293,1,0,0,0,293,295,1,0,0,0,294,296,3,58,29,0,
	295,294,1,0,0,0,295,296,1,0,0,0,296,298,1,0,0,0,297,299,7,6,0,0,298,297,
	1,0,0,0,298,299,1,0,0,0,299,301,1,0,0,0,300,302,3,60,30,0,301,300,1,0,0,
	0,301,302,1,0,0,0,302,304,1,0,0,0,303,305,3,62,31,0,304,303,1,0,0,0,304,
	305,1,0,0,0,305,307,1,0,0,0,306,308,3,64,32,0,307,306,1,0,0,0,307,308,1,
	0,0,0,308,310,1,0,0,0,309,311,3,66,33,0,310,309,1,0,0,0,310,311,1,0,0,0,
	311,49,1,0,0,0,312,317,3,72,36,0,313,314,5,20,0,0,314,316,3,72,36,0,315,
	313,1,0,0,0,316,319,1,0,0,0,317,315,1,0,0,0,317,318,1,0,0,0,318,51,1,0,
	0,0,319,317,1,0,0,0,320,321,5,93,0,0,321,322,5,33,0,0,322,323,3,54,27,0,
	323,53,1,0,0,0,324,325,7,7,0,0,325,55,1,0,0,0,326,331,7,8,0,0,327,328,5,
	41,0,0,328,330,7,8,0,0,329,327,1,0,0,0,330,333,1,0,0,0,331,329,1,0,0,0,
	331,332,1,0,0,0,332,57,1,0,0,0,333,331,1,0,0,0,334,335,5,42,0,0,335,336,
	5,19,0,0,336,337,3,82,41,0,337,338,5,21,0,0,338,342,1,0,0,0,339,340,5,42,
	0,0,340,342,5,98,0,0,341,334,1,0,0,0,341,339,1,0,0,0,342,59,1,0,0,0,343,
	344,5,11,0,0,344,345,3,22,11,0,345,61,1,0,0,0,346,347,5,36,0,0,347,348,
	5,19,0,0,348,349,3,82,41,0,349,350,5,21,0,0,350,63,1,0,0,0,351,352,5,37,
	0,0,352,353,5,19,0,0,353,354,3,82,41,0,354,355,5,21,0,0,355,65,1,0,0,0,
	356,357,5,43,0,0,357,358,5,19,0,0,358,359,3,82,41,0,359,360,5,21,0,0,360,
	67,1,0,0,0,361,374,5,44,0,0,362,367,3,76,38,0,363,364,5,20,0,0,364,366,
	3,76,38,0,365,363,1,0,0,0,366,369,1,0,0,0,367,365,1,0,0,0,367,368,1,0,0,
	0,368,371,1,0,0,0,369,367,1,0,0,0,370,372,3,34,17,0,371,370,1,0,0,0,371,
	372,1,0,0,0,372,375,1,0,0,0,373,375,3,34,17,0,374,362,1,0,0,0,374,373,1,
	0,0,0,375,69,1,0,0,0,376,377,5,35,0,0,377,378,3,20,10,0,378,71,1,0,0,0,
	379,382,3,56,28,0,380,381,5,5,0,0,381,383,3,74,37,0,382,380,1,0,0,0,382,
	383,1,0,0,0,383,385,1,0,0,0,384,386,3,60,30,0,385,384,1,0,0,0,385,386,1,
	0,0,0,386,388,1,0,0,0,387,389,7,9,0,0,388,387,1,0,0,0,388,389,1,0,0,0,389,
	404,1,0,0,0,390,391,5,19,0,0,391,392,3,82,41,0,392,394,5,21,0,0,393,395,
	3,60,30,0,394,393,1,0,0,0,394,395,1,0,0,0,395,397,1,0,0,0,396,398,7,9,0,
	0,397,396,1,0,0,0,397,398,1,0,0,0,398,404,1,0,0,0,399,401,3,76,38,0,400,
	402,3,60,30,0,401,400,1,0,0,0,401,402,1,0,0,0,402,404,1,0,0,0,403,379,1,
	0,0,0,403,390,1,0,0,0,403,399,1,0,0,0,404,73,1,0,0,0,405,413,3,98,49,0,
	406,413,3,56,28,0,407,413,3,76,38,0,408,409,5,19,0,0,409,410,3,82,41,0,
	410,411,5,21,0,0,411,413,1,0,0,0,412,405,1,0,0,0,412,406,1,0,0,0,412,407,
	1,0,0,0,412,408,1,0,0,0,413,75,1,0,0,0,414,415,3,22,11,0,415,417,5,19,0,
	0,416,418,3,78,39,0,417,416,1,0,0,0,417,418,1,0,0,0,418,419,1,0,0,0,419,
	420,5,21,0,0,420,77,1,0,0,0,421,426,3,80,40,0,422,423,5,20,0,0,423,425,
	3,80,40,0,424,422,1,0,0,0,425,428,1,0,0,0,426,424,1,0,0,0,426,427,1,0,0,
	0,427,79,1,0,0,0,428,426,1,0,0,0,429,432,3,98,49,0,430,432,5,94,0,0,431,
	429,1,0,0,0,431,430,1,0,0,0,432,81,1,0,0,0,433,434,6,41,-1,0,434,438,3,
	84,42,0,435,436,7,10,0,0,436,438,3,82,41,11,437,433,1,0,0,0,437,435,1,0,
	0,0,438,479,1,0,0,0,439,440,10,10,0,0,440,441,7,11,0,0,441,478,3,82,41,
	11,442,443,10,9,0,0,443,444,7,12,0,0,444,478,3,82,41,10,445,446,10,7,0,
	0,446,447,5,53,0,0,447,478,3,82,41,8,448,449,10,6,0,0,449,450,7,13,0,0,
	450,478,3,82,41,7,451,452,10,5,0,0,452,453,7,14,0,0,453,478,3,82,41,6,454,
	455,10,4,0,0,455,456,7,15,0,0,456,478,3,82,41,5,457,458,10,3,0,0,458,459,
	5,62,0,0,459,478,3,82,41,4,460,461,10,2,0,0,461,462,7,16,0,0,462,478,3,
	82,41,3,463,464,10,1,0,0,464,465,5,65,0,0,465,478,3,82,41,2,466,467,10,
	13,0,0,467,468,5,41,0,0,468,478,3,86,43,0,469,470,10,12,0,0,470,471,5,47,
	0,0,471,472,3,82,41,0,472,473,5,48,0,0,473,478,1,0,0,0,474,475,10,8,0,0,
	475,476,7,17,0,0,476,478,3,94,47,0,477,439,1,0,0,0,477,442,1,0,0,0,477,
	445,1,0,0,0,477,448,1,0,0,0,477,451,1,0,0,0,477,454,1,0,0,0,477,457,1,0,
	0,0,477,460,1,0,0,0,477,463,1,0,0,0,477,466,1,0,0,0,477,469,1,0,0,0,477,
	474,1,0,0,0,478,481,1,0,0,0,479,477,1,0,0,0,479,480,1,0,0,0,480,83,1,0,
	0,0,481,479,1,0,0,0,482,490,3,86,43,0,483,490,3,98,49,0,484,490,3,88,44,
	0,485,486,5,19,0,0,486,487,3,82,41,0,487,488,5,21,0,0,488,490,1,0,0,0,489,
	482,1,0,0,0,489,483,1,0,0,0,489,484,1,0,0,0,489,485,1,0,0,0,490,85,1,0,
	0,0,491,497,3,90,45,0,492,497,3,22,11,0,493,497,5,66,0,0,494,497,5,67,0,
	0,495,497,5,68,0,0,496,491,1,0,0,0,496,492,1,0,0,0,496,493,1,0,0,0,496,
	494,1,0,0,0,496,495,1,0,0,0,497,87,1,0,0,0,498,501,5,69,0,0,499,502,3,22,
	11,0,500,502,5,97,0,0,501,499,1,0,0,0,501,500,1,0,0,0,502,89,1,0,0,0,503,
	504,3,56,28,0,504,506,5,19,0,0,505,507,3,92,46,0,506,505,1,0,0,0,506,507,
	1,0,0,0,507,508,1,0,0,0,508,509,5,21,0,0,509,91,1,0,0,0,510,515,3,82,41,
	0,511,512,5,20,0,0,512,514,3,82,41,0,513,511,1,0,0,0,514,517,1,0,0,0,515,
	513,1,0,0,0,515,516,1,0,0,0,516,93,1,0,0,0,517,515,1,0,0,0,518,519,3,56,
	28,0,519,95,1,0,0,0,520,521,5,94,0,0,521,97,1,0,0,0,522,533,5,86,0,0,523,
	533,5,87,0,0,524,533,3,100,50,0,525,533,5,91,0,0,526,533,7,18,0,0,527,533,
	5,88,0,0,528,533,5,89,0,0,529,533,5,90,0,0,530,533,5,97,0,0,531,533,5,98,
	0,0,532,522,1,0,0,0,532,523,1,0,0,0,532,524,1,0,0,0,532,525,1,0,0,0,532,
	526,1,0,0,0,532,527,1,0,0,0,532,528,1,0,0,0,532,529,1,0,0,0,532,530,1,0,
	0,0,532,531,1,0,0,0,533,99,1,0,0,0,534,535,7,18,0,0,535,541,7,19,0,0,536,
	537,7,18,0,0,537,541,7,20,0,0,538,539,7,18,0,0,539,541,5,97,0,0,540,534,
	1,0,0,0,540,536,1,0,0,0,540,538,1,0,0,0,541,101,1,0,0,0,57,105,111,115,
	120,126,132,138,148,153,186,198,213,216,226,233,239,258,265,272,277,280,
	283,289,292,295,298,301,304,307,310,317,331,341,367,371,374,382,385,388,
	394,397,401,403,412,417,426,431,437,477,479,489,496,501,506,515,532,540];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!FmlMappingParser.__ATN) {
			FmlMappingParser.__ATN = new ATNDeserializer().deserialize(FmlMappingParser._serializedATN);
		}

		return FmlMappingParser.__ATN;
	}


	static DecisionsToDFA = FmlMappingParser._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );

}

export class StructureMapContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public EOF(): TerminalNode {
		return this.getToken(FmlMappingParser.EOF, 0);
	}
	public metadataDeclaration_list(): MetadataDeclarationContext[] {
		return this.getTypedRuleContexts(MetadataDeclarationContext) as MetadataDeclarationContext[];
	}
	public metadataDeclaration(i: number): MetadataDeclarationContext {
		return this.getTypedRuleContext(MetadataDeclarationContext, i) as MetadataDeclarationContext;
	}
	public conceptMapDeclaration_list(): ConceptMapDeclarationContext[] {
		return this.getTypedRuleContexts(ConceptMapDeclarationContext) as ConceptMapDeclarationContext[];
	}
	public conceptMapDeclaration(i: number): ConceptMapDeclarationContext {
		return this.getTypedRuleContext(ConceptMapDeclarationContext, i) as ConceptMapDeclarationContext;
	}
	public mapDeclaration(): MapDeclarationContext {
		return this.getTypedRuleContext(MapDeclarationContext, 0) as MapDeclarationContext;
	}
	public structureDeclaration_list(): StructureDeclarationContext[] {
		return this.getTypedRuleContexts(StructureDeclarationContext) as StructureDeclarationContext[];
	}
	public structureDeclaration(i: number): StructureDeclarationContext {
		return this.getTypedRuleContext(StructureDeclarationContext, i) as StructureDeclarationContext;
	}
	public importDeclaration_list(): ImportDeclarationContext[] {
		return this.getTypedRuleContexts(ImportDeclarationContext) as ImportDeclarationContext[];
	}
	public importDeclaration(i: number): ImportDeclarationContext {
		return this.getTypedRuleContext(ImportDeclarationContext, i) as ImportDeclarationContext;
	}
	public constantDeclaration_list(): ConstantDeclarationContext[] {
		return this.getTypedRuleContexts(ConstantDeclarationContext) as ConstantDeclarationContext[];
	}
	public constantDeclaration(i: number): ConstantDeclarationContext {
		return this.getTypedRuleContext(ConstantDeclarationContext, i) as ConstantDeclarationContext;
	}
	public groupDeclaration_list(): GroupDeclarationContext[] {
		return this.getTypedRuleContexts(GroupDeclarationContext) as GroupDeclarationContext[];
	}
	public groupDeclaration(i: number): GroupDeclarationContext {
		return this.getTypedRuleContext(GroupDeclarationContext, i) as GroupDeclarationContext;
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_structureMap;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterStructureMap) {
	 		listener.enterStructureMap(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitStructureMap) {
	 		listener.exitStructureMap(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitStructureMap) {
			return visitor.visitStructureMap(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ConceptMapDeclarationContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public url(): UrlContext {
		return this.getTypedRuleContext(UrlContext, 0) as UrlContext;
	}
	public conceptMapPrefix_list(): ConceptMapPrefixContext[] {
		return this.getTypedRuleContexts(ConceptMapPrefixContext) as ConceptMapPrefixContext[];
	}
	public conceptMapPrefix(i: number): ConceptMapPrefixContext {
		return this.getTypedRuleContext(ConceptMapPrefixContext, i) as ConceptMapPrefixContext;
	}
	public conceptMapCodeMap_list(): ConceptMapCodeMapContext[] {
		return this.getTypedRuleContexts(ConceptMapCodeMapContext) as ConceptMapCodeMapContext[];
	}
	public conceptMapCodeMap(i: number): ConceptMapCodeMapContext {
		return this.getTypedRuleContext(ConceptMapCodeMapContext, i) as ConceptMapCodeMapContext;
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_conceptMapDeclaration;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterConceptMapDeclaration) {
	 		listener.enterConceptMapDeclaration(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitConceptMapDeclaration) {
	 		listener.exitConceptMapDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitConceptMapDeclaration) {
			return visitor.visitConceptMapDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ConceptMapPrefixContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ID(): TerminalNode {
		return this.getToken(FmlMappingParser.ID, 0);
	}
	public url(): UrlContext {
		return this.getTypedRuleContext(UrlContext, 0) as UrlContext;
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_conceptMapPrefix;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterConceptMapPrefix) {
	 		listener.enterConceptMapPrefix(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitConceptMapPrefix) {
	 		listener.exitConceptMapPrefix(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitConceptMapPrefix) {
			return visitor.visitConceptMapPrefix(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ConceptMapCodeMapContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public conceptMapSource(): ConceptMapSourceContext {
		return this.getTypedRuleContext(ConceptMapSourceContext, 0) as ConceptMapSourceContext;
	}
	public conceptMapTarget(): ConceptMapTargetContext {
		return this.getTypedRuleContext(ConceptMapTargetContext, 0) as ConceptMapTargetContext;
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_conceptMapCodeMap;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterConceptMapCodeMap) {
	 		listener.enterConceptMapCodeMap(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitConceptMapCodeMap) {
	 		listener.exitConceptMapCodeMap(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitConceptMapCodeMap) {
			return visitor.visitConceptMapCodeMap(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ConceptMapSourceContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ID(): TerminalNode {
		return this.getToken(FmlMappingParser.ID, 0);
	}
	public code(): CodeContext {
		return this.getTypedRuleContext(CodeContext, 0) as CodeContext;
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_conceptMapSource;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterConceptMapSource) {
	 		listener.enterConceptMapSource(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitConceptMapSource) {
	 		listener.exitConceptMapSource(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitConceptMapSource) {
			return visitor.visitConceptMapSource(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ConceptMapTargetContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ID(): TerminalNode {
		return this.getToken(FmlMappingParser.ID, 0);
	}
	public code(): CodeContext {
		return this.getTypedRuleContext(CodeContext, 0) as CodeContext;
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_conceptMapTarget;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterConceptMapTarget) {
	 		listener.enterConceptMapTarget(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitConceptMapTarget) {
	 		listener.exitConceptMapTarget(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitConceptMapTarget) {
			return visitor.visitConceptMapTarget(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CodeContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ID(): TerminalNode {
		return this.getToken(FmlMappingParser.ID, 0);
	}
	public SINGLE_QUOTED_STRING(): TerminalNode {
		return this.getToken(FmlMappingParser.SINGLE_QUOTED_STRING, 0);
	}
	public DOUBLE_QUOTED_STRING(): TerminalNode {
		return this.getToken(FmlMappingParser.DOUBLE_QUOTED_STRING, 0);
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_code;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterCode) {
	 		listener.enterCode(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitCode) {
	 		listener.exitCode(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitCode) {
			return visitor.visitCode(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MapDeclarationContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public url(): UrlContext {
		return this.getTypedRuleContext(UrlContext, 0) as UrlContext;
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_mapDeclaration;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterMapDeclaration) {
	 		listener.enterMapDeclaration(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitMapDeclaration) {
	 		listener.exitMapDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitMapDeclaration) {
			return visitor.visitMapDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MetadataDeclarationContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public METADATA_PREFIX(): TerminalNode {
		return this.getToken(FmlMappingParser.METADATA_PREFIX, 0);
	}
	public qualifiedIdentifier(): QualifiedIdentifierContext {
		return this.getTypedRuleContext(QualifiedIdentifierContext, 0) as QualifiedIdentifierContext;
	}
	public literal(): LiteralContext {
		return this.getTypedRuleContext(LiteralContext, 0) as LiteralContext;
	}
	public markdownLiteral(): MarkdownLiteralContext {
		return this.getTypedRuleContext(MarkdownLiteralContext, 0) as MarkdownLiteralContext;
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_metadataDeclaration;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterMetadataDeclaration) {
	 		listener.enterMetadataDeclaration(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitMetadataDeclaration) {
	 		listener.exitMetadataDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitMetadataDeclaration) {
			return visitor.visitMetadataDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MarkdownLiteralContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public TRIPLE_QUOTED_STRING_LITERAL(): TerminalNode {
		return this.getToken(FmlMappingParser.TRIPLE_QUOTED_STRING_LITERAL, 0);
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_markdownLiteral;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterMarkdownLiteral) {
	 		listener.enterMarkdownLiteral(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitMarkdownLiteral) {
	 		listener.exitMarkdownLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitMarkdownLiteral) {
			return visitor.visitMarkdownLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class UrlContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public SINGLE_QUOTED_STRING(): TerminalNode {
		return this.getToken(FmlMappingParser.SINGLE_QUOTED_STRING, 0);
	}
	public DOUBLE_QUOTED_STRING(): TerminalNode {
		return this.getToken(FmlMappingParser.DOUBLE_QUOTED_STRING, 0);
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_url;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterUrl) {
	 		listener.enterUrl(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitUrl) {
	 		listener.exitUrl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitUrl) {
			return visitor.visitUrl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IdentifierContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ID(): TerminalNode {
		return this.getToken(FmlMappingParser.ID, 0);
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(FmlMappingParser.IDENTIFIER, 0);
	}
	public DELIMITED_IDENTIFIER(): TerminalNode {
		return this.getToken(FmlMappingParser.DELIMITED_IDENTIFIER, 0);
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_identifier;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterIdentifier) {
	 		listener.enterIdentifier(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitIdentifier) {
	 		listener.exitIdentifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitIdentifier) {
			return visitor.visitIdentifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StructureDeclarationContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public url(): UrlContext {
		return this.getTypedRuleContext(UrlContext, 0) as UrlContext;
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_structureDeclaration;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterStructureDeclaration) {
	 		listener.enterStructureDeclaration(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitStructureDeclaration) {
	 		listener.exitStructureDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitStructureDeclaration) {
			return visitor.visitStructureDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ConstantDeclarationContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ID(): TerminalNode {
		return this.getToken(FmlMappingParser.ID, 0);
	}
	public fpExpression(): FpExpressionContext {
		return this.getTypedRuleContext(FpExpressionContext, 0) as FpExpressionContext;
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_constantDeclaration;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterConstantDeclaration) {
	 		listener.enterConstantDeclaration(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitConstantDeclaration) {
	 		listener.exitConstantDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitConstantDeclaration) {
			return visitor.visitConstantDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class GroupDeclarationContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ID(): TerminalNode {
		return this.getToken(FmlMappingParser.ID, 0);
	}
	public parameters(): ParametersContext {
		return this.getTypedRuleContext(ParametersContext, 0) as ParametersContext;
	}
	public groupExpressions(): GroupExpressionsContext {
		return this.getTypedRuleContext(GroupExpressionsContext, 0) as GroupExpressionsContext;
	}
	public extends_(): ExtendsContext {
		return this.getTypedRuleContext(ExtendsContext, 0) as ExtendsContext;
	}
	public typeMode(): TypeModeContext {
		return this.getTypedRuleContext(TypeModeContext, 0) as TypeModeContext;
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_groupDeclaration;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterGroupDeclaration) {
	 		listener.enterGroupDeclaration(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitGroupDeclaration) {
	 		listener.exitGroupDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitGroupDeclaration) {
			return visitor.visitGroupDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParametersContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public parameter_list(): ParameterContext[] {
		return this.getTypedRuleContexts(ParameterContext) as ParameterContext[];
	}
	public parameter(i: number): ParameterContext {
		return this.getTypedRuleContext(ParameterContext, i) as ParameterContext;
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_parameters;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterParameters) {
	 		listener.enterParameters(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitParameters) {
	 		listener.exitParameters(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitParameters) {
			return visitor.visitParameters(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParameterContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ID(): TerminalNode {
		return this.getToken(FmlMappingParser.ID, 0);
	}
	public typeIdentifier(): TypeIdentifierContext {
		return this.getTypedRuleContext(TypeIdentifierContext, 0) as TypeIdentifierContext;
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_parameter;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterParameter) {
	 		listener.enterParameter(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitParameter) {
	 		listener.exitParameter(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitParameter) {
			return visitor.visitParameter(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class GroupExpressionsContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
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
    	return FmlMappingParser.RULE_groupExpressions;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterGroupExpressions) {
	 		listener.enterGroupExpressions(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitGroupExpressions) {
	 		listener.exitGroupExpressions(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitGroupExpressions) {
			return visitor.visitGroupExpressions(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeModeContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_typeMode;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterTypeMode) {
	 		listener.enterTypeMode(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitTypeMode) {
	 		listener.exitTypeMode(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitTypeMode) {
			return visitor.visitTypeMode(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExtendsContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ID(): TerminalNode {
		return this.getToken(FmlMappingParser.ID, 0);
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_extends;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterExtends) {
	 		listener.enterExtends(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitExtends) {
	 		listener.exitExtends(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitExtends) {
			return visitor.visitExtends(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeIdentifierContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_typeIdentifier;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterTypeIdentifier) {
	 		listener.enterTypeIdentifier(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitTypeIdentifier) {
	 		listener.exitTypeIdentifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitTypeIdentifier) {
			return visitor.visitTypeIdentifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_expression;
	}
	public copyFrom(ctx: ExpressionContext): void {
		super.copyFrom(ctx);
	}
}
export class MapFhirMarkupContext extends ExpressionContext {
	constructor(parser: FmlMappingParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public mapExpression(): MapExpressionContext {
		return this.getTypedRuleContext(MapExpressionContext, 0) as MapExpressionContext;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterMapFhirMarkup) {
	 		listener.enterMapFhirMarkup(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitMapFhirMarkup) {
	 		listener.exitMapFhirMarkup(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitMapFhirMarkup) {
			return visitor.visitMapFhirMarkup(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class MapSimpleCopyContext extends ExpressionContext {
	constructor(parser: FmlMappingParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public qualifiedIdentifier_list(): QualifiedIdentifierContext[] {
		return this.getTypedRuleContexts(QualifiedIdentifierContext) as QualifiedIdentifierContext[];
	}
	public qualifiedIdentifier(i: number): QualifiedIdentifierContext {
		return this.getTypedRuleContext(QualifiedIdentifierContext, i) as QualifiedIdentifierContext;
	}
	public mapExpressionName(): MapExpressionNameContext {
		return this.getTypedRuleContext(MapExpressionNameContext, 0) as MapExpressionNameContext;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterMapSimpleCopy) {
	 		listener.enterMapSimpleCopy(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitMapSimpleCopy) {
	 		listener.exitMapSimpleCopy(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitMapSimpleCopy) {
			return visitor.visitMapSimpleCopy(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MapExpressionContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public mapExpressionSource_list(): MapExpressionSourceContext[] {
		return this.getTypedRuleContexts(MapExpressionSourceContext) as MapExpressionSourceContext[];
	}
	public mapExpressionSource(i: number): MapExpressionSourceContext {
		return this.getTypedRuleContext(MapExpressionSourceContext, i) as MapExpressionSourceContext;
	}
	public mapExpressionTarget(): MapExpressionTargetContext {
		return this.getTypedRuleContext(MapExpressionTargetContext, 0) as MapExpressionTargetContext;
	}
	public dependentExpression(): DependentExpressionContext {
		return this.getTypedRuleContext(DependentExpressionContext, 0) as DependentExpressionContext;
	}
	public mapExpressionName(): MapExpressionNameContext {
		return this.getTypedRuleContext(MapExpressionNameContext, 0) as MapExpressionNameContext;
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_mapExpression;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterMapExpression) {
	 		listener.enterMapExpression(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitMapExpression) {
	 		listener.exitMapExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitMapExpression) {
			return visitor.visitMapExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MapExpressionNameContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public DOUBLE_QUOTED_STRING(): TerminalNode {
		return this.getToken(FmlMappingParser.DOUBLE_QUOTED_STRING, 0);
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_mapExpressionName;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterMapExpressionName) {
	 		listener.enterMapExpressionName(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitMapExpressionName) {
	 		listener.exitMapExpressionName(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitMapExpressionName) {
			return visitor.visitMapExpressionName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MapExpressionSourceContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public qualifiedIdentifier(): QualifiedIdentifierContext {
		return this.getTypedRuleContext(QualifiedIdentifierContext, 0) as QualifiedIdentifierContext;
	}
	public typeIdentifier(): TypeIdentifierContext {
		return this.getTypedRuleContext(TypeIdentifierContext, 0) as TypeIdentifierContext;
	}
	public sourceCardinality(): SourceCardinalityContext {
		return this.getTypedRuleContext(SourceCardinalityContext, 0) as SourceCardinalityContext;
	}
	public sourceDefault(): SourceDefaultContext {
		return this.getTypedRuleContext(SourceDefaultContext, 0) as SourceDefaultContext;
	}
	public alias(): AliasContext {
		return this.getTypedRuleContext(AliasContext, 0) as AliasContext;
	}
	public whereClause(): WhereClauseContext {
		return this.getTypedRuleContext(WhereClauseContext, 0) as WhereClauseContext;
	}
	public checkClause(): CheckClauseContext {
		return this.getTypedRuleContext(CheckClauseContext, 0) as CheckClauseContext;
	}
	public log(): LogContext {
		return this.getTypedRuleContext(LogContext, 0) as LogContext;
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_mapExpressionSource;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterMapExpressionSource) {
	 		listener.enterMapExpressionSource(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitMapExpressionSource) {
	 		listener.exitMapExpressionSource(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitMapExpressionSource) {
			return visitor.visitMapExpressionSource(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MapExpressionTargetContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public mapLineTarget_list(): MapLineTargetContext[] {
		return this.getTypedRuleContexts(MapLineTargetContext) as MapLineTargetContext[];
	}
	public mapLineTarget(i: number): MapLineTargetContext {
		return this.getTypedRuleContext(MapLineTargetContext, i) as MapLineTargetContext;
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_mapExpressionTarget;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterMapExpressionTarget) {
	 		listener.enterMapExpressionTarget(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitMapExpressionTarget) {
	 		listener.exitMapExpressionTarget(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitMapExpressionTarget) {
			return visitor.visitMapExpressionTarget(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SourceCardinalityContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public INTEGER(): TerminalNode {
		return this.getToken(FmlMappingParser.INTEGER, 0);
	}
	public upperBound(): UpperBoundContext {
		return this.getTypedRuleContext(UpperBoundContext, 0) as UpperBoundContext;
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_sourceCardinality;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterSourceCardinality) {
	 		listener.enterSourceCardinality(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitSourceCardinality) {
	 		listener.exitSourceCardinality(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitSourceCardinality) {
			return visitor.visitSourceCardinality(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class UpperBoundContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public INTEGER(): TerminalNode {
		return this.getToken(FmlMappingParser.INTEGER, 0);
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_upperBound;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterUpperBound) {
	 		listener.enterUpperBound(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitUpperBound) {
	 		listener.exitUpperBound(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitUpperBound) {
			return visitor.visitUpperBound(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class QualifiedIdentifierContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ID_list(): TerminalNode[] {
	    	return this.getTokens(FmlMappingParser.ID);
	}
	public ID(i: number): TerminalNode {
		return this.getToken(FmlMappingParser.ID, i);
	}
	public IDENTIFIER_list(): TerminalNode[] {
	    	return this.getTokens(FmlMappingParser.IDENTIFIER);
	}
	public IDENTIFIER(i: number): TerminalNode {
		return this.getToken(FmlMappingParser.IDENTIFIER, i);
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_qualifiedIdentifier;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterQualifiedIdentifier) {
	 		listener.enterQualifiedIdentifier(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitQualifiedIdentifier) {
	 		listener.exitQualifiedIdentifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitQualifiedIdentifier) {
			return visitor.visitQualifiedIdentifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SourceDefaultContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public fpExpression(): FpExpressionContext {
		return this.getTypedRuleContext(FpExpressionContext, 0) as FpExpressionContext;
	}
	public DOUBLE_QUOTED_STRING(): TerminalNode {
		return this.getToken(FmlMappingParser.DOUBLE_QUOTED_STRING, 0);
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_sourceDefault;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterSourceDefault) {
	 		listener.enterSourceDefault(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitSourceDefault) {
	 		listener.exitSourceDefault(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitSourceDefault) {
			return visitor.visitSourceDefault(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AliasContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_alias;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterAlias) {
	 		listener.enterAlias(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitAlias) {
	 		listener.exitAlias(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitAlias) {
			return visitor.visitAlias(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class WhereClauseContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public fpExpression(): FpExpressionContext {
		return this.getTypedRuleContext(FpExpressionContext, 0) as FpExpressionContext;
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_whereClause;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterWhereClause) {
	 		listener.enterWhereClause(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitWhereClause) {
	 		listener.exitWhereClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitWhereClause) {
			return visitor.visitWhereClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CheckClauseContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public fpExpression(): FpExpressionContext {
		return this.getTypedRuleContext(FpExpressionContext, 0) as FpExpressionContext;
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_checkClause;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterCheckClause) {
	 		listener.enterCheckClause(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitCheckClause) {
	 		listener.exitCheckClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitCheckClause) {
			return visitor.visitCheckClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LogContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public fpExpression(): FpExpressionContext {
		return this.getTypedRuleContext(FpExpressionContext, 0) as FpExpressionContext;
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_log;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterLog) {
	 		listener.enterLog(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitLog) {
	 		listener.exitLog(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitLog) {
			return visitor.visitLog(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DependentExpressionContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public invocation_list(): InvocationContext[] {
		return this.getTypedRuleContexts(InvocationContext) as InvocationContext[];
	}
	public invocation(i: number): InvocationContext {
		return this.getTypedRuleContext(InvocationContext, i) as InvocationContext;
	}
	public groupExpressions(): GroupExpressionsContext {
		return this.getTypedRuleContext(GroupExpressionsContext, 0) as GroupExpressionsContext;
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_dependentExpression;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterDependentExpression) {
	 		listener.enterDependentExpression(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitDependentExpression) {
	 		listener.exitDependentExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitDependentExpression) {
			return visitor.visitDependentExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ImportDeclarationContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public url(): UrlContext {
		return this.getTypedRuleContext(UrlContext, 0) as UrlContext;
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_importDeclaration;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterImportDeclaration) {
	 		listener.enterImportDeclaration(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitImportDeclaration) {
	 		listener.exitImportDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitImportDeclaration) {
			return visitor.visitImportDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MapLineTargetContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public qualifiedIdentifier(): QualifiedIdentifierContext {
		return this.getTypedRuleContext(QualifiedIdentifierContext, 0) as QualifiedIdentifierContext;
	}
	public transform(): TransformContext {
		return this.getTypedRuleContext(TransformContext, 0) as TransformContext;
	}
	public alias(): AliasContext {
		return this.getTypedRuleContext(AliasContext, 0) as AliasContext;
	}
	public fpExpression(): FpExpressionContext {
		return this.getTypedRuleContext(FpExpressionContext, 0) as FpExpressionContext;
	}
	public invocation(): InvocationContext {
		return this.getTypedRuleContext(InvocationContext, 0) as InvocationContext;
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_mapLineTarget;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterMapLineTarget) {
	 		listener.enterMapLineTarget(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitMapLineTarget) {
	 		listener.exitMapLineTarget(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitMapLineTarget) {
			return visitor.visitMapLineTarget(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TransformContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public literal(): LiteralContext {
		return this.getTypedRuleContext(LiteralContext, 0) as LiteralContext;
	}
	public qualifiedIdentifier(): QualifiedIdentifierContext {
		return this.getTypedRuleContext(QualifiedIdentifierContext, 0) as QualifiedIdentifierContext;
	}
	public invocation(): InvocationContext {
		return this.getTypedRuleContext(InvocationContext, 0) as InvocationContext;
	}
	public fpExpression(): FpExpressionContext {
		return this.getTypedRuleContext(FpExpressionContext, 0) as FpExpressionContext;
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_transform;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterTransform) {
	 		listener.enterTransform(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitTransform) {
	 		listener.exitTransform(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitTransform) {
			return visitor.visitTransform(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InvocationContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
	public paramList(): ParamListContext {
		return this.getTypedRuleContext(ParamListContext, 0) as ParamListContext;
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_invocation;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterInvocation) {
	 		listener.enterInvocation(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitInvocation) {
	 		listener.exitInvocation(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitInvocation) {
			return visitor.visitInvocation(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParamListContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public param_list(): ParamContext[] {
		return this.getTypedRuleContexts(ParamContext) as ParamContext[];
	}
	public param(i: number): ParamContext {
		return this.getTypedRuleContext(ParamContext, i) as ParamContext;
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_paramList;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterParamList) {
	 		listener.enterParamList(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitParamList) {
	 		listener.exitParamList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitParamList) {
			return visitor.visitParamList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParamContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public literal(): LiteralContext {
		return this.getTypedRuleContext(LiteralContext, 0) as LiteralContext;
	}
	public ID(): TerminalNode {
		return this.getToken(FmlMappingParser.ID, 0);
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_param;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterParam) {
	 		listener.enterParam(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitParam) {
	 		listener.exitParam(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitParam) {
			return visitor.visitParam(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FpExpressionContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_fpExpression;
	}
	public copyFrom(ctx: FpExpressionContext): void {
		super.copyFrom(ctx);
	}
}
export class IndexerExpressionContext extends FpExpressionContext {
	constructor(parser: FmlMappingParser, ctx: FpExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public fpExpression_list(): FpExpressionContext[] {
		return this.getTypedRuleContexts(FpExpressionContext) as FpExpressionContext[];
	}
	public fpExpression(i: number): FpExpressionContext {
		return this.getTypedRuleContext(FpExpressionContext, i) as FpExpressionContext;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterIndexerExpression) {
	 		listener.enterIndexerExpression(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitIndexerExpression) {
	 		listener.exitIndexerExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitIndexerExpression) {
			return visitor.visitIndexerExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class PolarityExpressionContext extends FpExpressionContext {
	constructor(parser: FmlMappingParser, ctx: FpExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public fpExpression(): FpExpressionContext {
		return this.getTypedRuleContext(FpExpressionContext, 0) as FpExpressionContext;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterPolarityExpression) {
	 		listener.enterPolarityExpression(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitPolarityExpression) {
	 		listener.exitPolarityExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitPolarityExpression) {
			return visitor.visitPolarityExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AdditiveExpressionContext extends FpExpressionContext {
	constructor(parser: FmlMappingParser, ctx: FpExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public fpExpression_list(): FpExpressionContext[] {
		return this.getTypedRuleContexts(FpExpressionContext) as FpExpressionContext[];
	}
	public fpExpression(i: number): FpExpressionContext {
		return this.getTypedRuleContext(FpExpressionContext, i) as FpExpressionContext;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterAdditiveExpression) {
	 		listener.enterAdditiveExpression(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitAdditiveExpression) {
	 		listener.exitAdditiveExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitAdditiveExpression) {
			return visitor.visitAdditiveExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class MultiplicativeExpressionContext extends FpExpressionContext {
	constructor(parser: FmlMappingParser, ctx: FpExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public fpExpression_list(): FpExpressionContext[] {
		return this.getTypedRuleContexts(FpExpressionContext) as FpExpressionContext[];
	}
	public fpExpression(i: number): FpExpressionContext {
		return this.getTypedRuleContext(FpExpressionContext, i) as FpExpressionContext;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterMultiplicativeExpression) {
	 		listener.enterMultiplicativeExpression(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitMultiplicativeExpression) {
	 		listener.exitMultiplicativeExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitMultiplicativeExpression) {
			return visitor.visitMultiplicativeExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class UnionExpressionContext extends FpExpressionContext {
	constructor(parser: FmlMappingParser, ctx: FpExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public fpExpression_list(): FpExpressionContext[] {
		return this.getTypedRuleContexts(FpExpressionContext) as FpExpressionContext[];
	}
	public fpExpression(i: number): FpExpressionContext {
		return this.getTypedRuleContext(FpExpressionContext, i) as FpExpressionContext;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterUnionExpression) {
	 		listener.enterUnionExpression(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitUnionExpression) {
	 		listener.exitUnionExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitUnionExpression) {
			return visitor.visitUnionExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class OrExpressionContext extends FpExpressionContext {
	constructor(parser: FmlMappingParser, ctx: FpExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public fpExpression_list(): FpExpressionContext[] {
		return this.getTypedRuleContexts(FpExpressionContext) as FpExpressionContext[];
	}
	public fpExpression(i: number): FpExpressionContext {
		return this.getTypedRuleContext(FpExpressionContext, i) as FpExpressionContext;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterOrExpression) {
	 		listener.enterOrExpression(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitOrExpression) {
	 		listener.exitOrExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitOrExpression) {
			return visitor.visitOrExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AndExpressionContext extends FpExpressionContext {
	constructor(parser: FmlMappingParser, ctx: FpExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public fpExpression_list(): FpExpressionContext[] {
		return this.getTypedRuleContexts(FpExpressionContext) as FpExpressionContext[];
	}
	public fpExpression(i: number): FpExpressionContext {
		return this.getTypedRuleContext(FpExpressionContext, i) as FpExpressionContext;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterAndExpression) {
	 		listener.enterAndExpression(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitAndExpression) {
	 		listener.exitAndExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitAndExpression) {
			return visitor.visitAndExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class MembershipExpressionContext extends FpExpressionContext {
	constructor(parser: FmlMappingParser, ctx: FpExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public fpExpression_list(): FpExpressionContext[] {
		return this.getTypedRuleContexts(FpExpressionContext) as FpExpressionContext[];
	}
	public fpExpression(i: number): FpExpressionContext {
		return this.getTypedRuleContext(FpExpressionContext, i) as FpExpressionContext;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterMembershipExpression) {
	 		listener.enterMembershipExpression(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitMembershipExpression) {
	 		listener.exitMembershipExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitMembershipExpression) {
			return visitor.visitMembershipExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class InequalityExpressionContext extends FpExpressionContext {
	constructor(parser: FmlMappingParser, ctx: FpExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public fpExpression_list(): FpExpressionContext[] {
		return this.getTypedRuleContexts(FpExpressionContext) as FpExpressionContext[];
	}
	public fpExpression(i: number): FpExpressionContext {
		return this.getTypedRuleContext(FpExpressionContext, i) as FpExpressionContext;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterInequalityExpression) {
	 		listener.enterInequalityExpression(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitInequalityExpression) {
	 		listener.exitInequalityExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitInequalityExpression) {
			return visitor.visitInequalityExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class InvocationExpressionContext extends FpExpressionContext {
	constructor(parser: FmlMappingParser, ctx: FpExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public fpExpression(): FpExpressionContext {
		return this.getTypedRuleContext(FpExpressionContext, 0) as FpExpressionContext;
	}
	public fpInvocation(): FpInvocationContext {
		return this.getTypedRuleContext(FpInvocationContext, 0) as FpInvocationContext;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterInvocationExpression) {
	 		listener.enterInvocationExpression(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitInvocationExpression) {
	 		listener.exitInvocationExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitInvocationExpression) {
			return visitor.visitInvocationExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class EqualityExpressionContext extends FpExpressionContext {
	constructor(parser: FmlMappingParser, ctx: FpExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public fpExpression_list(): FpExpressionContext[] {
		return this.getTypedRuleContexts(FpExpressionContext) as FpExpressionContext[];
	}
	public fpExpression(i: number): FpExpressionContext {
		return this.getTypedRuleContext(FpExpressionContext, i) as FpExpressionContext;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterEqualityExpression) {
	 		listener.enterEqualityExpression(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitEqualityExpression) {
	 		listener.exitEqualityExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitEqualityExpression) {
			return visitor.visitEqualityExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ImpliesExpressionContext extends FpExpressionContext {
	constructor(parser: FmlMappingParser, ctx: FpExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public fpExpression_list(): FpExpressionContext[] {
		return this.getTypedRuleContexts(FpExpressionContext) as FpExpressionContext[];
	}
	public fpExpression(i: number): FpExpressionContext {
		return this.getTypedRuleContext(FpExpressionContext, i) as FpExpressionContext;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterImpliesExpression) {
	 		listener.enterImpliesExpression(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitImpliesExpression) {
	 		listener.exitImpliesExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitImpliesExpression) {
			return visitor.visitImpliesExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TermExpressionContext extends FpExpressionContext {
	constructor(parser: FmlMappingParser, ctx: FpExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public fpTerm(): FpTermContext {
		return this.getTypedRuleContext(FpTermContext, 0) as FpTermContext;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterTermExpression) {
	 		listener.enterTermExpression(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitTermExpression) {
	 		listener.exitTermExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitTermExpression) {
			return visitor.visitTermExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TypeExpressionContext extends FpExpressionContext {
	constructor(parser: FmlMappingParser, ctx: FpExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public fpExpression(): FpExpressionContext {
		return this.getTypedRuleContext(FpExpressionContext, 0) as FpExpressionContext;
	}
	public fpTypeSpecifier(): FpTypeSpecifierContext {
		return this.getTypedRuleContext(FpTypeSpecifierContext, 0) as FpTypeSpecifierContext;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterTypeExpression) {
	 		listener.enterTypeExpression(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitTypeExpression) {
	 		listener.exitTypeExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitTypeExpression) {
			return visitor.visitTypeExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FpTermContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_fpTerm;
	}
	public copyFrom(ctx: FpTermContext): void {
		super.copyFrom(ctx);
	}
}
export class ExternalConstantTermContext extends FpTermContext {
	constructor(parser: FmlMappingParser, ctx: FpTermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public fpExternalConstant(): FpExternalConstantContext {
		return this.getTypedRuleContext(FpExternalConstantContext, 0) as FpExternalConstantContext;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterExternalConstantTerm) {
	 		listener.enterExternalConstantTerm(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitExternalConstantTerm) {
	 		listener.exitExternalConstantTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitExternalConstantTerm) {
			return visitor.visitExternalConstantTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LiteralTermContext extends FpTermContext {
	constructor(parser: FmlMappingParser, ctx: FpTermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public literal(): LiteralContext {
		return this.getTypedRuleContext(LiteralContext, 0) as LiteralContext;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterLiteralTerm) {
	 		listener.enterLiteralTerm(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitLiteralTerm) {
	 		listener.exitLiteralTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitLiteralTerm) {
			return visitor.visitLiteralTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ParenthesizedTermContext extends FpTermContext {
	constructor(parser: FmlMappingParser, ctx: FpTermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public fpExpression(): FpExpressionContext {
		return this.getTypedRuleContext(FpExpressionContext, 0) as FpExpressionContext;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterParenthesizedTerm) {
	 		listener.enterParenthesizedTerm(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitParenthesizedTerm) {
	 		listener.exitParenthesizedTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitParenthesizedTerm) {
			return visitor.visitParenthesizedTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class InvocationTermContext extends FpTermContext {
	constructor(parser: FmlMappingParser, ctx: FpTermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public fpInvocation(): FpInvocationContext {
		return this.getTypedRuleContext(FpInvocationContext, 0) as FpInvocationContext;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterInvocationTerm) {
	 		listener.enterInvocationTerm(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitInvocationTerm) {
	 		listener.exitInvocationTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitInvocationTerm) {
			return visitor.visitInvocationTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FpInvocationContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_fpInvocation;
	}
	public copyFrom(ctx: FpInvocationContext): void {
		super.copyFrom(ctx);
	}
}
export class TotalInvocationContext extends FpInvocationContext {
	constructor(parser: FmlMappingParser, ctx: FpInvocationContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterTotalInvocation) {
	 		listener.enterTotalInvocation(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitTotalInvocation) {
	 		listener.exitTotalInvocation(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitTotalInvocation) {
			return visitor.visitTotalInvocation(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ThisInvocationContext extends FpInvocationContext {
	constructor(parser: FmlMappingParser, ctx: FpInvocationContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterThisInvocation) {
	 		listener.enterThisInvocation(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitThisInvocation) {
	 		listener.exitThisInvocation(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitThisInvocation) {
			return visitor.visitThisInvocation(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class IndexInvocationContext extends FpInvocationContext {
	constructor(parser: FmlMappingParser, ctx: FpInvocationContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterIndexInvocation) {
	 		listener.enterIndexInvocation(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitIndexInvocation) {
	 		listener.exitIndexInvocation(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitIndexInvocation) {
			return visitor.visitIndexInvocation(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class FunctionInvocationContext extends FpInvocationContext {
	constructor(parser: FmlMappingParser, ctx: FpInvocationContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public fpFunction(): FpFunctionContext {
		return this.getTypedRuleContext(FpFunctionContext, 0) as FpFunctionContext;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterFunctionInvocation) {
	 		listener.enterFunctionInvocation(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitFunctionInvocation) {
	 		listener.exitFunctionInvocation(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitFunctionInvocation) {
			return visitor.visitFunctionInvocation(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class MemberInvocationContext extends FpInvocationContext {
	constructor(parser: FmlMappingParser, ctx: FpInvocationContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterMemberInvocation) {
	 		listener.enterMemberInvocation(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitMemberInvocation) {
	 		listener.exitMemberInvocation(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitMemberInvocation) {
			return visitor.visitMemberInvocation(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FpExternalConstantContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
	public SINGLE_QUOTED_STRING(): TerminalNode {
		return this.getToken(FmlMappingParser.SINGLE_QUOTED_STRING, 0);
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_fpExternalConstant;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterFpExternalConstant) {
	 		listener.enterFpExternalConstant(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitFpExternalConstant) {
	 		listener.exitFpExternalConstant(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitFpExternalConstant) {
			return visitor.visitFpExternalConstant(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FpFunctionContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public qualifiedIdentifier(): QualifiedIdentifierContext {
		return this.getTypedRuleContext(QualifiedIdentifierContext, 0) as QualifiedIdentifierContext;
	}
	public fpParamList(): FpParamListContext {
		return this.getTypedRuleContext(FpParamListContext, 0) as FpParamListContext;
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_fpFunction;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterFpFunction) {
	 		listener.enterFpFunction(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitFpFunction) {
	 		listener.exitFpFunction(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitFpFunction) {
			return visitor.visitFpFunction(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FpParamListContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public fpExpression_list(): FpExpressionContext[] {
		return this.getTypedRuleContexts(FpExpressionContext) as FpExpressionContext[];
	}
	public fpExpression(i: number): FpExpressionContext {
		return this.getTypedRuleContext(FpExpressionContext, i) as FpExpressionContext;
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_fpParamList;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterFpParamList) {
	 		listener.enterFpParamList(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitFpParamList) {
	 		listener.exitFpParamList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitFpParamList) {
			return visitor.visitFpParamList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FpTypeSpecifierContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public qualifiedIdentifier(): QualifiedIdentifierContext {
		return this.getTypedRuleContext(QualifiedIdentifierContext, 0) as QualifiedIdentifierContext;
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_fpTypeSpecifier;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterFpTypeSpecifier) {
	 		listener.enterFpTypeSpecifier(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitFpTypeSpecifier) {
	 		listener.exitFpTypeSpecifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitFpTypeSpecifier) {
			return visitor.visitFpTypeSpecifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ConstantContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ID(): TerminalNode {
		return this.getToken(FmlMappingParser.ID, 0);
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_constant;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterConstant) {
	 		listener.enterConstant(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitConstant) {
	 		listener.exitConstant(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitConstant) {
			return visitor.visitConstant(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LiteralContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_literal;
	}
	public copyFrom(ctx: LiteralContext): void {
		super.copyFrom(ctx);
	}
}
export class TimeLiteralContext extends LiteralContext {
	constructor(parser: FmlMappingParser, ctx: LiteralContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public TIME(): TerminalNode {
		return this.getToken(FmlMappingParser.TIME, 0);
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterTimeLiteral) {
	 		listener.enterTimeLiteral(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitTimeLiteral) {
	 		listener.exitTimeLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitTimeLiteral) {
			return visitor.visitTimeLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NullLiteralContext extends LiteralContext {
	constructor(parser: FmlMappingParser, ctx: LiteralContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public NULL_LITERAL(): TerminalNode {
		return this.getToken(FmlMappingParser.NULL_LITERAL, 0);
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterNullLiteral) {
	 		listener.enterNullLiteral(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitNullLiteral) {
	 		listener.exitNullLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitNullLiteral) {
			return visitor.visitNullLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DateTimeLiteralContext extends LiteralContext {
	constructor(parser: FmlMappingParser, ctx: LiteralContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public DATE_TIME(): TerminalNode {
		return this.getToken(FmlMappingParser.DATE_TIME, 0);
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterDateTimeLiteral) {
	 		listener.enterDateTimeLiteral(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitDateTimeLiteral) {
	 		listener.exitDateTimeLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitDateTimeLiteral) {
			return visitor.visitDateTimeLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class StringLiteralContext extends LiteralContext {
	constructor(parser: FmlMappingParser, ctx: LiteralContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public SINGLE_QUOTED_STRING(): TerminalNode {
		return this.getToken(FmlMappingParser.SINGLE_QUOTED_STRING, 0);
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterStringLiteral) {
	 		listener.enterStringLiteral(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitStringLiteral) {
	 		listener.exitStringLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitStringLiteral) {
			return visitor.visitStringLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class QuotedStringLiteralContext extends LiteralContext {
	constructor(parser: FmlMappingParser, ctx: LiteralContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public DOUBLE_QUOTED_STRING(): TerminalNode {
		return this.getToken(FmlMappingParser.DOUBLE_QUOTED_STRING, 0);
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterQuotedStringLiteral) {
	 		listener.enterQuotedStringLiteral(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitQuotedStringLiteral) {
	 		listener.exitQuotedStringLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitQuotedStringLiteral) {
			return visitor.visitQuotedStringLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DateLiteralContext extends LiteralContext {
	constructor(parser: FmlMappingParser, ctx: LiteralContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public DATE(): TerminalNode {
		return this.getToken(FmlMappingParser.DATE, 0);
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterDateLiteral) {
	 		listener.enterDateLiteral(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitDateLiteral) {
	 		listener.exitDateLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitDateLiteral) {
			return visitor.visitDateLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class BooleanLiteralContext extends LiteralContext {
	constructor(parser: FmlMappingParser, ctx: LiteralContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public BOOL(): TerminalNode {
		return this.getToken(FmlMappingParser.BOOL, 0);
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterBooleanLiteral) {
	 		listener.enterBooleanLiteral(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitBooleanLiteral) {
	 		listener.exitBooleanLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitBooleanLiteral) {
			return visitor.visitBooleanLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class QuantityLiteralContext extends LiteralContext {
	constructor(parser: FmlMappingParser, ctx: LiteralContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public fpQuantity(): FpQuantityContext {
		return this.getTypedRuleContext(FpQuantityContext, 0) as FpQuantityContext;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterQuantityLiteral) {
	 		listener.enterQuantityLiteral(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitQuantityLiteral) {
	 		listener.exitQuantityLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitQuantityLiteral) {
			return visitor.visitQuantityLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LongNumberLiteralContext extends LiteralContext {
	constructor(parser: FmlMappingParser, ctx: LiteralContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public LONG_INTEGER(): TerminalNode {
		return this.getToken(FmlMappingParser.LONG_INTEGER, 0);
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterLongNumberLiteral) {
	 		listener.enterLongNumberLiteral(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitLongNumberLiteral) {
	 		listener.exitLongNumberLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitLongNumberLiteral) {
			return visitor.visitLongNumberLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NumberLiteralContext extends LiteralContext {
	constructor(parser: FmlMappingParser, ctx: LiteralContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public INTEGER(): TerminalNode {
		return this.getToken(FmlMappingParser.INTEGER, 0);
	}
	public DECIMAL(): TerminalNode {
		return this.getToken(FmlMappingParser.DECIMAL, 0);
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterNumberLiteral) {
	 		listener.enterNumberLiteral(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitNumberLiteral) {
	 		listener.exitNumberLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitNumberLiteral) {
			return visitor.visitNumberLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FpQuantityContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_fpQuantity;
	}
	public copyFrom(ctx: FpQuantityContext): void {
		super.copyFrom(ctx);
	}
}
export class QuantityWithDateContext extends FpQuantityContext {
	constructor(parser: FmlMappingParser, ctx: FpQuantityContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public INTEGER(): TerminalNode {
		return this.getToken(FmlMappingParser.INTEGER, 0);
	}
	public DECIMAL(): TerminalNode {
		return this.getToken(FmlMappingParser.DECIMAL, 0);
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterQuantityWithDate) {
	 		listener.enterQuantityWithDate(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitQuantityWithDate) {
	 		listener.exitQuantityWithDate(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitQuantityWithDate) {
			return visitor.visitQuantityWithDate(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class QuantityWithUcumContext extends FpQuantityContext {
	constructor(parser: FmlMappingParser, ctx: FpQuantityContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public SINGLE_QUOTED_STRING(): TerminalNode {
		return this.getToken(FmlMappingParser.SINGLE_QUOTED_STRING, 0);
	}
	public INTEGER(): TerminalNode {
		return this.getToken(FmlMappingParser.INTEGER, 0);
	}
	public DECIMAL(): TerminalNode {
		return this.getToken(FmlMappingParser.DECIMAL, 0);
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterQuantityWithUcum) {
	 		listener.enterQuantityWithUcum(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitQuantityWithUcum) {
	 		listener.exitQuantityWithUcum(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitQuantityWithUcum) {
			return visitor.visitQuantityWithUcum(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class QuantityWithDatePluralContext extends FpQuantityContext {
	constructor(parser: FmlMappingParser, ctx: FpQuantityContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public INTEGER(): TerminalNode {
		return this.getToken(FmlMappingParser.INTEGER, 0);
	}
	public DECIMAL(): TerminalNode {
		return this.getToken(FmlMappingParser.DECIMAL, 0);
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterQuantityWithDatePlural) {
	 		listener.enterQuantityWithDatePlural(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitQuantityWithDatePlural) {
	 		listener.exitQuantityWithDatePlural(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitQuantityWithDatePlural) {
			return visitor.visitQuantityWithDatePlural(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
