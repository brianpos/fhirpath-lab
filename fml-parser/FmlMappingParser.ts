// Generated from FmlMapping.g4 by ANTLR 4.13.2
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
	public static readonly T__85 = 86;
	public static readonly T__86 = 87;
	public static readonly T__87 = 88;
	public static readonly NULL_LITERAL = 89;
	public static readonly BOOL = 90;
	public static readonly DATE = 91;
	public static readonly DATETIME = 92;
	public static readonly TIME = 93;
	public static readonly LONGNUMBER = 94;
	public static readonly DECIMAL = 95;
	public static readonly INTEGER = 96;
	public static readonly ID = 97;
	public static readonly IDENTIFIER = 98;
	public static readonly DELIMITEDIDENTIFIER = 99;
	public static readonly STRING = 100;
	public static readonly DOUBLE_QUOTED_STRING = 101;
	public static readonly TRIPLE_QUOTED_STRING_LITERAL = 102;
	public static readonly WS = 103;
	public static readonly COMMENT = 104;
	public static readonly METADATA_PREFIX = 105;
	public static readonly LINE_COMMENT = 106;
	public static override readonly EOF = Token.EOF;
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
	public static readonly RULE_mapRules = 17;
	public static readonly RULE_typeMode = 18;
	public static readonly RULE_extends = 19;
	public static readonly RULE_typeIdentifier = 20;
	public static readonly RULE_mapRule = 21;
	public static readonly RULE_mapTransformationRule = 22;
	public static readonly RULE_ruleName = 23;
	public static readonly RULE_ruleSources = 24;
	public static readonly RULE_ruleSource = 25;
	public static readonly RULE_ruleTargets = 26;
	public static readonly RULE_ruleTarget = 27;
	public static readonly RULE_sourceCardinality = 28;
	public static readonly RULE_upperBound = 29;
	public static readonly RULE_qualifiedIdentifier = 30;
	public static readonly RULE_sourceDefault = 31;
	public static readonly RULE_alias = 32;
	public static readonly RULE_whereClause = 33;
	public static readonly RULE_checkClause = 34;
	public static readonly RULE_log = 35;
	public static readonly RULE_dependentExpression = 36;
	public static readonly RULE_importDeclaration = 37;
	public static readonly RULE_transform = 38;
	public static readonly RULE_groupInvocation = 39;
	public static readonly RULE_groupParamList = 40;
	public static readonly RULE_groupParam = 41;
	public static readonly RULE_fpExpression = 42;
	public static readonly RULE_fpTerm = 43;
	public static readonly RULE_fpInvocation = 44;
	public static readonly RULE_fpExternalConstant = 45;
	public static readonly RULE_fpFunction = 46;
	public static readonly RULE_fpSortArgument = 47;
	public static readonly RULE_fpParamList = 48;
	public static readonly RULE_fpTypeSpecifier = 49;
	public static readonly RULE_constant = 50;
	public static readonly RULE_sourceListMode = 51;
	public static readonly RULE_targetListMode = 52;
	public static readonly RULE_groupTypeMode = 53;
	public static readonly RULE_modelMode = 54;
	public static readonly RULE_parameterMode = 55;
	public static readonly RULE_literal = 56;
	public static readonly RULE_fpQuantity = 57;
	public static readonly literalNames: (string | null)[] = [ null, "'conceptmap'", 
                                                            "'{'", "'}'", 
                                                            "'prefix'", 
                                                            "'='", "'-'", 
                                                            "':'", "'map'", 
                                                            "'uses'", "'alias'", 
                                                            "'as'", "'let'", 
                                                            "';'", "'group'", 
                                                            "'('", "','", 
                                                            "')'", "'<<'", 
                                                            "'>>'", "'extends'", 
                                                            "'->'", "'..'", 
                                                            "'*'", "'imports'", 
                                                            "'source'", 
                                                            "'target'", 
                                                            "'types'", "'where'", 
                                                            "'check'", "'div'", 
                                                            "'contains'", 
                                                            "'is'", "'asc'", 
                                                            "'desc'", "'first'", 
                                                            "'last'", "'sort'", 
                                                            "'.'", "'default'", 
                                                            "'log'", "'then'", 
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
                                                            "'%'", "'not_first'", 
                                                            "'not_last'", 
                                                            "'only_one'", 
                                                            "'share'", "'single'", 
                                                            "'type+'", "'queried'", 
                                                            "'produced'", 
                                                            "'year'", "'month'", 
                                                            "'week'", "'day'", 
                                                            "'hour'", "'minute'", 
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
                                                             null, null, 
                                                             null, "NULL_LITERAL", 
                                                             "BOOL", "DATE", 
                                                             "DATETIME", 
                                                             "TIME", "LONGNUMBER", 
                                                             "DECIMAL", 
                                                             "INTEGER", 
                                                             "ID", "IDENTIFIER", 
                                                             "DELIMITEDIDENTIFIER", 
                                                             "STRING", "DOUBLE_QUOTED_STRING", 
                                                             "TRIPLE_QUOTED_STRING_LITERAL", 
                                                             "WS", "COMMENT", 
                                                             "METADATA_PREFIX", 
                                                             "LINE_COMMENT" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"structureMap", "conceptMapDeclaration", "conceptMapPrefix", "conceptMapCodeMap", 
		"conceptMapSource", "conceptMapTarget", "code", "mapDeclaration", "metadataDeclaration", 
		"markdownLiteral", "url", "identifier", "structureDeclaration", "constantDeclaration", 
		"groupDeclaration", "parameters", "parameter", "mapRules", "typeMode", 
		"extends", "typeIdentifier", "mapRule", "mapTransformationRule", "ruleName", 
		"ruleSources", "ruleSource", "ruleTargets", "ruleTarget", "sourceCardinality", 
		"upperBound", "qualifiedIdentifier", "sourceDefault", "alias", "whereClause", 
		"checkClause", "log", "dependentExpression", "importDeclaration", "transform", 
		"groupInvocation", "groupParamList", "groupParam", "fpExpression", "fpTerm", 
		"fpInvocation", "fpExternalConstant", "fpFunction", "fpSortArgument", 
		"fpParamList", "fpTypeSpecifier", "constant", "sourceListMode", "targetListMode", 
		"groupTypeMode", "modelMode", "parameterMode", "literal", "fpQuantity",
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
			this.state = 119;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 0, this._ctx);
			while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1 + 1) {
					{
					{
					this.state = 116;
					this.metadataDeclaration();
					}
					}
				}
				this.state = 121;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 0, this._ctx);
			}
			this.state = 125;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 1, this._ctx);
			while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1 + 1) {
					{
					{
					this.state = 122;
					this.conceptMapDeclaration();
					}
					}
				}
				this.state = 127;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 1, this._ctx);
			}
			this.state = 129;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===8) {
				{
				this.state = 128;
				this.mapDeclaration();
				}
			}

			this.state = 134;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 3, this._ctx);
			while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1 + 1) {
					{
					{
					this.state = 131;
					this.structureDeclaration();
					}
					}
				}
				this.state = 136;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 3, this._ctx);
			}
			this.state = 140;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 4, this._ctx);
			while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1 + 1) {
					{
					{
					this.state = 137;
					this.importDeclaration();
					}
					}
				}
				this.state = 142;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 4, this._ctx);
			}
			this.state = 146;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 5, this._ctx);
			while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1 + 1) {
					{
					{
					this.state = 143;
					this.constantDeclaration();
					}
					}
				}
				this.state = 148;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 5, this._ctx);
			}
			this.state = 150;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 149;
				this.groupDeclaration();
				}
				}
				this.state = 152;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la===14);
			this.state = 154;
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
			this.state = 156;
			this.match(FmlMappingParser.T__0);
			this.state = 157;
			this.url();
			this.state = 158;
			this.match(FmlMappingParser.T__1);
			this.state = 160;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 159;
				this.conceptMapPrefix();
				}
				}
				this.state = 162;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la===4);
			this.state = 165;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 164;
				this.conceptMapCodeMap();
				}
				}
				this.state = 167;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la===97);
			this.state = 169;
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
			this.state = 171;
			this.match(FmlMappingParser.T__3);
			this.state = 172;
			this.match(FmlMappingParser.ID);
			this.state = 173;
			this.match(FmlMappingParser.T__4);
			this.state = 174;
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
			this.state = 176;
			this.conceptMapSource();
			this.state = 177;
			this.match(FmlMappingParser.T__5);
			this.state = 178;
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
			this.state = 180;
			this.match(FmlMappingParser.ID);
			this.state = 181;
			this.match(FmlMappingParser.T__6);
			this.state = 182;
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
			this.state = 184;
			this.match(FmlMappingParser.ID);
			this.state = 185;
			this.match(FmlMappingParser.T__6);
			this.state = 186;
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
			this.state = 188;
			_la = this._input.LA(1);
			if(!(((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & 25) !== 0))) {
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
			this.state = 190;
			this.match(FmlMappingParser.T__7);
			this.state = 191;
			this.url();
			this.state = 192;
			this.match(FmlMappingParser.T__4);
			this.state = 193;
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
			this.state = 195;
			this.match(FmlMappingParser.METADATA_PREFIX);
			this.state = 196;
			this.qualifiedIdentifier();
			this.state = 197;
			this.match(FmlMappingParser.T__4);
			this.state = 200;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 89:
			case 90:
			case 91:
			case 92:
			case 93:
			case 94:
			case 95:
			case 96:
			case 100:
			case 101:
				{
				this.state = 198;
				this.literal();
				}
				break;
			case 102:
				{
				this.state = 199;
				this.markdownLiteral();
				}
				break;
			case 1:
			case 8:
			case 9:
			case 12:
			case 14:
			case 24:
			case 105:
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
			this.state = 202;
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
			this.state = 204;
			_la = this._input.LA(1);
			if(!(_la===100 || _la===101)) {
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
			this.state = 206;
			_la = this._input.LA(1);
			if(!(((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & 7) !== 0))) {
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
			this.state = 208;
			this.match(FmlMappingParser.T__8);
			this.state = 209;
			this.url();
			this.state = 212;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===10) {
				{
				this.state = 210;
				this.match(FmlMappingParser.T__9);
				this.state = 211;
				this.identifier();
				}
			}

			this.state = 214;
			this.match(FmlMappingParser.T__10);
			this.state = 215;
			this.modelMode();
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
			this.state = 217;
			this.match(FmlMappingParser.T__11);
			this.state = 218;
			this.match(FmlMappingParser.ID);
			this.state = 219;
			this.match(FmlMappingParser.T__4);
			this.state = 220;
			this.fpExpression(0);
			this.state = 221;
			this.match(FmlMappingParser.T__12);
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
			this.state = 223;
			this.match(FmlMappingParser.T__13);
			this.state = 224;
			this.match(FmlMappingParser.ID);
			this.state = 225;
			this.parameters();
			this.state = 227;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===20) {
				{
				this.state = 226;
				this.extends_();
				}
			}

			this.state = 230;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===18) {
				{
				this.state = 229;
				this.typeMode();
				}
			}

			this.state = 232;
			this.mapRules();
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
			this.state = 234;
			this.match(FmlMappingParser.T__14);
			this.state = 235;
			this.parameter();
			this.state = 238;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 236;
				this.match(FmlMappingParser.T__15);
				this.state = 237;
				this.parameter();
				}
				}
				this.state = 240;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la===16);
			this.state = 242;
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
	public parameter(): ParameterContext {
		let localctx: ParameterContext = new ParameterContext(this, this._ctx, this.state);
		this.enterRule(localctx, 32, FmlMappingParser.RULE_parameter);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 244;
			this.parameterMode();
			this.state = 245;
			this.match(FmlMappingParser.ID);
			this.state = 247;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===7) {
				{
				this.state = 246;
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
	public mapRules(): MapRulesContext {
		let localctx: MapRulesContext = new MapRulesContext(this, this._ctx, this.state);
		this.enterRule(localctx, 34, FmlMappingParser.RULE_mapRules);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 249;
			this.match(FmlMappingParser.T__1);
			this.state = 253;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 4279262992) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 63) !== 0) || _la===97 || _la===98) {
				{
				{
				this.state = 250;
				this.mapRule();
				}
				}
				this.state = 255;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 256;
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
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 258;
			this.match(FmlMappingParser.T__17);
			this.state = 259;
			this.groupTypeMode();
			this.state = 260;
			this.match(FmlMappingParser.T__18);
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
			this.state = 262;
			this.match(FmlMappingParser.T__19);
			this.state = 263;
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
			this.state = 265;
			this.match(FmlMappingParser.T__6);
			this.state = 266;
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
	public mapRule(): MapRuleContext {
		let localctx: MapRuleContext = new MapRuleContext(this, this._ctx, this.state);
		this.enterRule(localctx, 42, FmlMappingParser.RULE_mapRule);
		let _la: number;
		try {
			this.state = 279;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 17, this._ctx) ) {
			case 1:
				localctx = new MapSimpleCopyContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 268;
				this.qualifiedIdentifier();
				this.state = 269;
				this.match(FmlMappingParser.T__20);
				this.state = 270;
				this.qualifiedIdentifier();
				this.state = 272;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===101) {
					{
					this.state = 271;
					this.ruleName();
					}
				}

				this.state = 274;
				this.match(FmlMappingParser.T__12);
				}
				break;
			case 2:
				localctx = new MapFhirMarkupContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 276;
				this.mapTransformationRule();
				this.state = 277;
				this.match(FmlMappingParser.T__12);
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
	public mapTransformationRule(): MapTransformationRuleContext {
		let localctx: MapTransformationRuleContext = new MapTransformationRuleContext(this, this._ctx, this.state);
		this.enterRule(localctx, 44, FmlMappingParser.RULE_mapTransformationRule);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 281;
			this.ruleSources();
			this.state = 284;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===21) {
				{
				this.state = 282;
				this.match(FmlMappingParser.T__20);
				this.state = 283;
				this.ruleTargets();
				}
			}

			this.state = 287;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===41) {
				{
				this.state = 286;
				this.dependentExpression();
				}
			}

			this.state = 290;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===101) {
				{
				this.state = 289;
				this.ruleName();
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
	public ruleName(): RuleNameContext {
		let localctx: RuleNameContext = new RuleNameContext(this, this._ctx, this.state);
		this.enterRule(localctx, 46, FmlMappingParser.RULE_ruleName);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 292;
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
	public ruleSources(): RuleSourcesContext {
		let localctx: RuleSourcesContext = new RuleSourcesContext(this, this._ctx, this.state);
		this.enterRule(localctx, 48, FmlMappingParser.RULE_ruleSources);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 294;
			this.ruleSource();
			this.state = 299;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===16) {
				{
				{
				this.state = 295;
				this.match(FmlMappingParser.T__15);
				this.state = 296;
				this.ruleSource();
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
	public ruleSource(): RuleSourceContext {
		let localctx: RuleSourceContext = new RuleSourceContext(this, this._ctx, this.state);
		this.enterRule(localctx, 50, FmlMappingParser.RULE_ruleSource);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 302;
			this.qualifiedIdentifier();
			this.state = 304;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===7) {
				{
				this.state = 303;
				this.typeIdentifier();
				}
			}

			this.state = 307;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===96) {
				{
				this.state = 306;
				this.sourceCardinality();
				}
			}

			this.state = 310;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===39) {
				{
				this.state = 309;
				this.sourceDefault();
				}
			}

			this.state = 313;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & 3221225475) !== 0) || _la===67) {
				{
				this.state = 312;
				this.sourceListMode();
				}
			}

			this.state = 316;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===11) {
				{
				this.state = 315;
				this.alias();
				}
			}

			this.state = 319;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===28) {
				{
				this.state = 318;
				this.whereClause();
				}
			}

			this.state = 322;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===29) {
				{
				this.state = 321;
				this.checkClause();
				}
			}

			this.state = 325;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===40) {
				{
				this.state = 324;
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
	public ruleTargets(): RuleTargetsContext {
		let localctx: RuleTargetsContext = new RuleTargetsContext(this, this._ctx, this.state);
		this.enterRule(localctx, 52, FmlMappingParser.RULE_ruleTargets);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 327;
			this.ruleTarget();
			this.state = 332;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===16) {
				{
				{
				this.state = 328;
				this.match(FmlMappingParser.T__15);
				this.state = 329;
				this.ruleTarget();
				}
				}
				this.state = 334;
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
	public ruleTarget(): RuleTargetContext {
		let localctx: RuleTargetContext = new RuleTargetContext(this, this._ctx, this.state);
		this.enterRule(localctx, 54, FmlMappingParser.RULE_ruleTarget);
		let _la: number;
		try {
			this.state = 359;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 37, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 335;
				this.qualifiedIdentifier();
				this.state = 338;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===5) {
					{
					this.state = 336;
					this.match(FmlMappingParser.T__4);
					this.state = 337;
					this.transform();
					}
				}

				this.state = 341;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===11) {
					{
					this.state = 340;
					this.alias();
					}
				}

				this.state = 344;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===35 || _la===36 || _la===68 || _la===69) {
					{
					this.state = 343;
					this.targetListMode();
					}
				}

				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 346;
				this.match(FmlMappingParser.T__14);
				this.state = 347;
				this.fpExpression(0);
				this.state = 348;
				this.match(FmlMappingParser.T__16);
				this.state = 350;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===11) {
					{
					this.state = 349;
					this.alias();
					}
				}

				this.state = 353;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===35 || _la===36 || _la===68 || _la===69) {
					{
					this.state = 352;
					this.targetListMode();
					}
				}

				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 355;
				this.groupInvocation();
				this.state = 357;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===11) {
					{
					this.state = 356;
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
	public sourceCardinality(): SourceCardinalityContext {
		let localctx: SourceCardinalityContext = new SourceCardinalityContext(this, this._ctx, this.state);
		this.enterRule(localctx, 56, FmlMappingParser.RULE_sourceCardinality);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 361;
			this.match(FmlMappingParser.INTEGER);
			this.state = 362;
			this.match(FmlMappingParser.T__21);
			this.state = 363;
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
		this.enterRule(localctx, 58, FmlMappingParser.RULE_upperBound);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 365;
			_la = this._input.LA(1);
			if(!(_la===23 || _la===96)) {
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
		this.enterRule(localctx, 60, FmlMappingParser.RULE_qualifiedIdentifier);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 367;
			_la = this._input.LA(1);
			if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 4279262992) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 63) !== 0) || _la===97 || _la===98)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 372;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 38, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 368;
					this.match(FmlMappingParser.T__37);
					this.state = 369;
					_la = this._input.LA(1);
					if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 4279262992) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 63) !== 0) || _la===97 || _la===98)) {
					this._errHandler.recoverInline(this);
					}
					else {
						this._errHandler.reportMatch(this);
					    this.consume();
					}
					}
					}
				}
				this.state = 374;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 38, this._ctx);
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
		this.enterRule(localctx, 62, FmlMappingParser.RULE_sourceDefault);
		try {
			this.state = 382;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 39, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 375;
				this.match(FmlMappingParser.T__38);
				this.state = 376;
				this.match(FmlMappingParser.T__14);
				this.state = 377;
				this.fpExpression(0);
				this.state = 378;
				this.match(FmlMappingParser.T__16);
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 380;
				this.match(FmlMappingParser.T__38);
				this.state = 381;
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
		this.enterRule(localctx, 64, FmlMappingParser.RULE_alias);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 384;
			this.match(FmlMappingParser.T__10);
			this.state = 385;
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
		this.enterRule(localctx, 66, FmlMappingParser.RULE_whereClause);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 387;
			this.match(FmlMappingParser.T__27);
			this.state = 388;
			this.match(FmlMappingParser.T__14);
			this.state = 389;
			this.fpExpression(0);
			this.state = 390;
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
	public checkClause(): CheckClauseContext {
		let localctx: CheckClauseContext = new CheckClauseContext(this, this._ctx, this.state);
		this.enterRule(localctx, 68, FmlMappingParser.RULE_checkClause);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 392;
			this.match(FmlMappingParser.T__28);
			this.state = 393;
			this.match(FmlMappingParser.T__14);
			this.state = 394;
			this.fpExpression(0);
			this.state = 395;
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
	public log(): LogContext {
		let localctx: LogContext = new LogContext(this, this._ctx, this.state);
		this.enterRule(localctx, 70, FmlMappingParser.RULE_log);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 397;
			this.match(FmlMappingParser.T__39);
			this.state = 398;
			this.match(FmlMappingParser.T__14);
			this.state = 399;
			this.fpExpression(0);
			this.state = 400;
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
	public dependentExpression(): DependentExpressionContext {
		let localctx: DependentExpressionContext = new DependentExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 72, FmlMappingParser.RULE_dependentExpression);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 402;
			this.match(FmlMappingParser.T__40);
			this.state = 415;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 97:
			case 98:
			case 99:
				{
				this.state = 403;
				this.groupInvocation();
				this.state = 408;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===16) {
					{
					{
					this.state = 404;
					this.match(FmlMappingParser.T__15);
					this.state = 405;
					this.groupInvocation();
					}
					}
					this.state = 410;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 412;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===2) {
					{
					this.state = 411;
					this.mapRules();
					}
				}

				}
				break;
			case 2:
				{
				this.state = 414;
				this.mapRules();
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
		this.enterRule(localctx, 74, FmlMappingParser.RULE_importDeclaration);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 417;
			this.match(FmlMappingParser.T__23);
			this.state = 418;
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
	public transform(): TransformContext {
		let localctx: TransformContext = new TransformContext(this, this._ctx, this.state);
		this.enterRule(localctx, 76, FmlMappingParser.RULE_transform);
		try {
			this.state = 427;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 43, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 420;
				this.literal();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 421;
				this.qualifiedIdentifier();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 422;
				this.groupInvocation();
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 423;
				this.match(FmlMappingParser.T__14);
				this.state = 424;
				this.fpExpression(0);
				this.state = 425;
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
	public groupInvocation(): GroupInvocationContext {
		let localctx: GroupInvocationContext = new GroupInvocationContext(this, this._ctx, this.state);
		this.enterRule(localctx, 78, FmlMappingParser.RULE_groupInvocation);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 429;
			this.identifier();
			this.state = 430;
			this.match(FmlMappingParser.T__14);
			this.state = 432;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 89)) & ~0x1F) === 0 && ((1 << (_la - 89)) & 6655) !== 0)) {
				{
				this.state = 431;
				this.groupParamList();
				}
			}

			this.state = 434;
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
	public groupParamList(): GroupParamListContext {
		let localctx: GroupParamListContext = new GroupParamListContext(this, this._ctx, this.state);
		this.enterRule(localctx, 80, FmlMappingParser.RULE_groupParamList);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 436;
			this.groupParam();
			this.state = 441;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===16) {
				{
				{
				this.state = 437;
				this.match(FmlMappingParser.T__15);
				this.state = 438;
				this.groupParam();
				}
				}
				this.state = 443;
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
	public groupParam(): GroupParamContext {
		let localctx: GroupParamContext = new GroupParamContext(this, this._ctx, this.state);
		this.enterRule(localctx, 82, FmlMappingParser.RULE_groupParam);
		try {
			this.state = 446;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 89:
			case 90:
			case 91:
			case 92:
			case 93:
			case 94:
			case 95:
			case 96:
			case 100:
			case 101:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 444;
				this.literal();
				}
				break;
			case 97:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 445;
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
		let _startState: number = 84;
		this.enterRecursionRule(localctx, 84, FmlMappingParser.RULE_fpExpression, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 452;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 4:
			case 8:
			case 9:
			case 10:
			case 11:
			case 12:
			case 14:
			case 15:
			case 20:
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
			case 35:
			case 36:
			case 37:
			case 61:
			case 62:
			case 63:
			case 64:
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
			case 99:
			case 100:
			case 101:
				{
				localctx = new TermExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;

				this.state = 449;
				this.fpTerm();
				}
				break;
			case 6:
			case 44:
				{
				localctx = new PolarityExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 450;
				_la = this._input.LA(1);
				if(!(_la===6 || _la===44)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 451;
				this.fpExpression(11);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 494;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 49, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 492;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 48, this._ctx) ) {
					case 1:
						{
						localctx = new MultiplicativeExpressionContext(this, new FpExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, FmlMappingParser.RULE_fpExpression);
						this.state = 454;
						if (!(this.precpred(this._ctx, 10))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 10)");
						}
						this.state = 455;
						_la = this._input.LA(1);
						if(!(((((_la - 23)) & ~0x1F) === 0 && ((1 << (_la - 23)) & 12583041) !== 0))) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 456;
						this.fpExpression(11);
						}
						break;
					case 2:
						{
						localctx = new AdditiveExpressionContext(this, new FpExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, FmlMappingParser.RULE_fpExpression);
						this.state = 457;
						if (!(this.precpred(this._ctx, 9))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 9)");
						}
						this.state = 458;
						_la = this._input.LA(1);
						if(!(_la===6 || _la===44 || _la===47)) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 459;
						this.fpExpression(10);
						}
						break;
					case 3:
						{
						localctx = new UnionExpressionContext(this, new FpExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, FmlMappingParser.RULE_fpExpression);
						this.state = 460;
						if (!(this.precpred(this._ctx, 7))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 7)");
						}
						{
						this.state = 461;
						this.match(FmlMappingParser.T__47);
						}
						this.state = 462;
						this.fpExpression(8);
						}
						break;
					case 4:
						{
						localctx = new InequalityExpressionContext(this, new FpExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, FmlMappingParser.RULE_fpExpression);
						this.state = 463;
						if (!(this.precpred(this._ctx, 6))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 6)");
						}
						this.state = 464;
						_la = this._input.LA(1);
						if(!(((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 15) !== 0))) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 465;
						this.fpExpression(7);
						}
						break;
					case 5:
						{
						localctx = new EqualityExpressionContext(this, new FpExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, FmlMappingParser.RULE_fpExpression);
						this.state = 466;
						if (!(this.precpred(this._ctx, 5))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 5)");
						}
						this.state = 467;
						_la = this._input.LA(1);
						if(!(_la===5 || ((((_la - 53)) & ~0x1F) === 0 && ((1 << (_la - 53)) & 7) !== 0))) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 468;
						this.fpExpression(6);
						}
						break;
					case 6:
						{
						localctx = new MembershipExpressionContext(this, new FpExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, FmlMappingParser.RULE_fpExpression);
						this.state = 469;
						if (!(this.precpred(this._ctx, 4))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
						}
						this.state = 470;
						_la = this._input.LA(1);
						if(!(_la===31 || _la===56)) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 471;
						this.fpExpression(5);
						}
						break;
					case 7:
						{
						localctx = new AndExpressionContext(this, new FpExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, FmlMappingParser.RULE_fpExpression);
						this.state = 472;
						if (!(this.precpred(this._ctx, 3))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 3)");
						}
						{
						this.state = 473;
						this.match(FmlMappingParser.T__56);
						}
						this.state = 474;
						this.fpExpression(4);
						}
						break;
					case 8:
						{
						localctx = new OrExpressionContext(this, new FpExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, FmlMappingParser.RULE_fpExpression);
						this.state = 475;
						if (!(this.precpred(this._ctx, 2))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 2)");
						}
						this.state = 476;
						_la = this._input.LA(1);
						if(!(_la===58 || _la===59)) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 477;
						this.fpExpression(3);
						}
						break;
					case 9:
						{
						localctx = new ImpliesExpressionContext(this, new FpExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, FmlMappingParser.RULE_fpExpression);
						this.state = 478;
						if (!(this.precpred(this._ctx, 1))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
						}
						{
						this.state = 479;
						this.match(FmlMappingParser.T__59);
						}
						this.state = 480;
						this.fpExpression(2);
						}
						break;
					case 10:
						{
						localctx = new InvocationExpressionContext(this, new FpExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, FmlMappingParser.RULE_fpExpression);
						this.state = 481;
						if (!(this.precpred(this._ctx, 13))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 13)");
						}
						this.state = 482;
						this.match(FmlMappingParser.T__37);
						this.state = 483;
						this.fpInvocation();
						}
						break;
					case 11:
						{
						localctx = new IndexerExpressionContext(this, new FpExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, FmlMappingParser.RULE_fpExpression);
						this.state = 484;
						if (!(this.precpred(this._ctx, 12))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 12)");
						}
						this.state = 485;
						this.match(FmlMappingParser.T__41);
						this.state = 486;
						this.fpExpression(0);
						this.state = 487;
						this.match(FmlMappingParser.T__42);
						}
						break;
					case 12:
						{
						localctx = new TypeExpressionContext(this, new FpExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, FmlMappingParser.RULE_fpExpression);
						this.state = 489;
						if (!(this.precpred(this._ctx, 8))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 8)");
						}
						this.state = 490;
						_la = this._input.LA(1);
						if(!(_la===11 || _la===32)) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 491;
						this.fpTypeSpecifier();
						}
						break;
					}
					}
				}
				this.state = 496;
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
		this.enterRule(localctx, 86, FmlMappingParser.RULE_fpTerm);
		try {
			this.state = 504;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 4:
			case 8:
			case 9:
			case 10:
			case 11:
			case 12:
			case 14:
			case 20:
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
			case 35:
			case 36:
			case 37:
			case 61:
			case 62:
			case 63:
			case 97:
			case 98:
			case 99:
				localctx = new InvocationTermContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 497;
				this.fpInvocation();
				}
				break;
			case 89:
			case 90:
			case 91:
			case 92:
			case 93:
			case 94:
			case 95:
			case 96:
			case 100:
			case 101:
				localctx = new LiteralTermContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 498;
				this.literal();
				}
				break;
			case 64:
				localctx = new ExternalConstantTermContext(this, localctx);
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 499;
				this.fpExternalConstant();
				}
				break;
			case 15:
				localctx = new ParenthesizedTermContext(this, localctx);
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 500;
				this.match(FmlMappingParser.T__14);
				this.state = 501;
				this.fpExpression(0);
				this.state = 502;
				this.match(FmlMappingParser.T__16);
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
		this.enterRule(localctx, 88, FmlMappingParser.RULE_fpInvocation);
		try {
			this.state = 511;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 51, this._ctx) ) {
			case 1:
				localctx = new FunctionInvocationContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 506;
				this.fpFunction();
				}
				break;
			case 2:
				localctx = new MemberInvocationContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 507;
				this.identifier();
				}
				break;
			case 3:
				localctx = new ThisInvocationContext(this, localctx);
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 508;
				this.match(FmlMappingParser.T__60);
				}
				break;
			case 4:
				localctx = new IndexInvocationContext(this, localctx);
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 509;
				this.match(FmlMappingParser.T__61);
				}
				break;
			case 5:
				localctx = new TotalInvocationContext(this, localctx);
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 510;
				this.match(FmlMappingParser.T__62);
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
		this.enterRule(localctx, 90, FmlMappingParser.RULE_fpExternalConstant);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 513;
			this.match(FmlMappingParser.T__63);
			this.state = 516;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 97:
			case 98:
			case 99:
				{
				this.state = 514;
				this.identifier();
				}
				break;
			case 100:
				{
				this.state = 515;
				this.match(FmlMappingParser.STRING);
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
		this.enterRule(localctx, 92, FmlMappingParser.RULE_fpFunction);
		let _la: number;
		try {
			this.state = 538;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 56, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 518;
				this.match(FmlMappingParser.T__36);
				this.state = 519;
				this.match(FmlMappingParser.T__14);
				this.state = 528;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 4)) & ~0x1F) === 0 && ((1 << (_la - 4)) & 4293987829) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & 503316739) !== 0) || ((((_la - 89)) & ~0x1F) === 0 && ((1 << (_la - 89)) & 8191) !== 0)) {
					{
					this.state = 520;
					this.fpSortArgument();
					this.state = 525;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la===16) {
						{
						{
						this.state = 521;
						this.match(FmlMappingParser.T__15);
						this.state = 522;
						this.fpSortArgument();
						}
						}
						this.state = 527;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					}
				}

				this.state = 530;
				this.match(FmlMappingParser.T__16);
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 531;
				this.qualifiedIdentifier();
				this.state = 532;
				this.match(FmlMappingParser.T__14);
				this.state = 534;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 4)) & ~0x1F) === 0 && ((1 << (_la - 4)) & 4293987829) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & 503316739) !== 0) || ((((_la - 89)) & ~0x1F) === 0 && ((1 << (_la - 89)) & 8191) !== 0)) {
					{
					this.state = 533;
					this.fpParamList();
					}
				}

				this.state = 536;
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
	public fpSortArgument(): FpSortArgumentContext {
		let localctx: FpSortArgumentContext = new FpSortArgumentContext(this, this._ctx, this.state);
		this.enterRule(localctx, 94, FmlMappingParser.RULE_fpSortArgument);
		let _la: number;
		try {
			localctx = new SortDirectionArgumentContext(this, localctx);
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 540;
			this.fpExpression(0);
			this.state = 542;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===33 || _la===34) {
				{
				this.state = 541;
				_la = this._input.LA(1);
				if(!(_la===33 || _la===34)) {
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
	public fpParamList(): FpParamListContext {
		let localctx: FpParamListContext = new FpParamListContext(this, this._ctx, this.state);
		this.enterRule(localctx, 96, FmlMappingParser.RULE_fpParamList);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 544;
			this.fpExpression(0);
			this.state = 549;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===16) {
				{
				{
				this.state = 545;
				this.match(FmlMappingParser.T__15);
				this.state = 546;
				this.fpExpression(0);
				}
				}
				this.state = 551;
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
		this.enterRule(localctx, 98, FmlMappingParser.RULE_fpTypeSpecifier);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 552;
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
		this.enterRule(localctx, 100, FmlMappingParser.RULE_constant);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 554;
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
	public sourceListMode(): SourceListModeContext {
		let localctx: SourceListModeContext = new SourceListModeContext(this, this._ctx, this.state);
		this.enterRule(localctx, 102, FmlMappingParser.RULE_sourceListMode);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 556;
			_la = this._input.LA(1);
			if(!(((((_la - 35)) & ~0x1F) === 0 && ((1 << (_la - 35)) & 3221225475) !== 0) || _la===67)) {
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
	public targetListMode(): TargetListModeContext {
		let localctx: TargetListModeContext = new TargetListModeContext(this, this._ctx, this.state);
		this.enterRule(localctx, 104, FmlMappingParser.RULE_targetListMode);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 558;
			_la = this._input.LA(1);
			if(!(_la===35 || _la===36 || _la===68 || _la===69)) {
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
	public groupTypeMode(): GroupTypeModeContext {
		let localctx: GroupTypeModeContext = new GroupTypeModeContext(this, this._ctx, this.state);
		this.enterRule(localctx, 106, FmlMappingParser.RULE_groupTypeMode);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 560;
			_la = this._input.LA(1);
			if(!(_la===27 || _la===70)) {
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
	public modelMode(): ModelModeContext {
		let localctx: ModelModeContext = new ModelModeContext(this, this._ctx, this.state);
		this.enterRule(localctx, 108, FmlMappingParser.RULE_modelMode);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 562;
			_la = this._input.LA(1);
			if(!(_la===25 || _la===26 || _la===71 || _la===72)) {
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
	public parameterMode(): ParameterModeContext {
		let localctx: ParameterModeContext = new ParameterModeContext(this, this._ctx, this.state);
		this.enterRule(localctx, 110, FmlMappingParser.RULE_parameterMode);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 564;
			_la = this._input.LA(1);
			if(!(_la===25 || _la===26)) {
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
	public literal(): LiteralContext {
		let localctx: LiteralContext = new LiteralContext(this, this._ctx, this.state);
		this.enterRule(localctx, 112, FmlMappingParser.RULE_literal);
		let _la: number;
		try {
			this.state = 576;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 59, this._ctx) ) {
			case 1:
				localctx = new NullLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 566;
				this.match(FmlMappingParser.NULL_LITERAL);
				}
				break;
			case 2:
				localctx = new BooleanLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 567;
				this.match(FmlMappingParser.BOOL);
				}
				break;
			case 3:
				localctx = new QuantityLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 568;
				this.fpQuantity();
				}
				break;
			case 4:
				localctx = new LongNumberLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 569;
				this.match(FmlMappingParser.LONGNUMBER);
				}
				break;
			case 5:
				localctx = new NumberLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 570;
				_la = this._input.LA(1);
				if(!(_la===95 || _la===96)) {
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
				this.state = 571;
				this.match(FmlMappingParser.DATE);
				}
				break;
			case 7:
				localctx = new DateTimeLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 572;
				this.match(FmlMappingParser.DATETIME);
				}
				break;
			case 8:
				localctx = new TimeLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 8);
				{
				this.state = 573;
				this.match(FmlMappingParser.TIME);
				}
				break;
			case 9:
				localctx = new StringLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 9);
				{
				this.state = 574;
				this.match(FmlMappingParser.STRING);
				}
				break;
			case 10:
				localctx = new QuotedStringLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 10);
				{
				this.state = 575;
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
		this.enterRule(localctx, 114, FmlMappingParser.RULE_fpQuantity);
		let _la: number;
		try {
			this.state = 584;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 60, this._ctx) ) {
			case 1:
				localctx = new QuantityWithDateContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 578;
				_la = this._input.LA(1);
				if(!(_la===95 || _la===96)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 579;
				_la = this._input.LA(1);
				if(!(((((_la - 73)) & ~0x1F) === 0 && ((1 << (_la - 73)) & 255) !== 0))) {
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
				this.state = 580;
				_la = this._input.LA(1);
				if(!(_la===95 || _la===96)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 581;
				_la = this._input.LA(1);
				if(!(((((_la - 81)) & ~0x1F) === 0 && ((1 << (_la - 81)) & 255) !== 0))) {
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
				this.state = 582;
				_la = this._input.LA(1);
				if(!(_la===95 || _la===96)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 583;
				this.match(FmlMappingParser.STRING);
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
		case 42:
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

	public static readonly _serializedATN: number[] = [4,1,106,587,2,0,7,0,
	2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,
	2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,
	17,7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,
	7,24,2,25,7,25,2,26,7,26,2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,
	31,2,32,7,32,2,33,7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,
	2,39,7,39,2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,45,2,
	46,7,46,2,47,7,47,2,48,7,48,2,49,7,49,2,50,7,50,2,51,7,51,2,52,7,52,2,53,
	7,53,2,54,7,54,2,55,7,55,2,56,7,56,2,57,7,57,1,0,5,0,118,8,0,10,0,12,0,
	121,9,0,1,0,5,0,124,8,0,10,0,12,0,127,9,0,1,0,3,0,130,8,0,1,0,5,0,133,8,
	0,10,0,12,0,136,9,0,1,0,5,0,139,8,0,10,0,12,0,142,9,0,1,0,5,0,145,8,0,10,
	0,12,0,148,9,0,1,0,4,0,151,8,0,11,0,12,0,152,1,0,1,0,1,1,1,1,1,1,1,1,4,
	1,161,8,1,11,1,12,1,162,1,1,4,1,166,8,1,11,1,12,1,167,1,1,1,1,1,2,1,2,1,
	2,1,2,1,2,1,3,1,3,1,3,1,3,1,4,1,4,1,4,1,4,1,5,1,5,1,5,1,5,1,6,1,6,1,7,1,
	7,1,7,1,7,1,7,1,8,1,8,1,8,1,8,1,8,3,8,201,8,8,1,9,1,9,1,10,1,10,1,11,1,
	11,1,12,1,12,1,12,1,12,3,12,213,8,12,1,12,1,12,1,12,1,13,1,13,1,13,1,13,
	1,13,1,13,1,14,1,14,1,14,1,14,3,14,228,8,14,1,14,3,14,231,8,14,1,14,1,14,
	1,15,1,15,1,15,1,15,4,15,239,8,15,11,15,12,15,240,1,15,1,15,1,16,1,16,1,
	16,3,16,248,8,16,1,17,1,17,5,17,252,8,17,10,17,12,17,255,9,17,1,17,1,17,
	1,18,1,18,1,18,1,18,1,19,1,19,1,19,1,20,1,20,1,20,1,21,1,21,1,21,1,21,3,
	21,273,8,21,1,21,1,21,1,21,1,21,1,21,3,21,280,8,21,1,22,1,22,1,22,3,22,
	285,8,22,1,22,3,22,288,8,22,1,22,3,22,291,8,22,1,23,1,23,1,24,1,24,1,24,
	5,24,298,8,24,10,24,12,24,301,9,24,1,25,1,25,3,25,305,8,25,1,25,3,25,308,
	8,25,1,25,3,25,311,8,25,1,25,3,25,314,8,25,1,25,3,25,317,8,25,1,25,3,25,
	320,8,25,1,25,3,25,323,8,25,1,25,3,25,326,8,25,1,26,1,26,1,26,5,26,331,
	8,26,10,26,12,26,334,9,26,1,27,1,27,1,27,3,27,339,8,27,1,27,3,27,342,8,
	27,1,27,3,27,345,8,27,1,27,1,27,1,27,1,27,3,27,351,8,27,1,27,3,27,354,8,
	27,1,27,1,27,3,27,358,8,27,3,27,360,8,27,1,28,1,28,1,28,1,28,1,29,1,29,
	1,30,1,30,1,30,5,30,371,8,30,10,30,12,30,374,9,30,1,31,1,31,1,31,1,31,1,
	31,1,31,1,31,3,31,383,8,31,1,32,1,32,1,32,1,33,1,33,1,33,1,33,1,33,1,34,
	1,34,1,34,1,34,1,34,1,35,1,35,1,35,1,35,1,35,1,36,1,36,1,36,1,36,5,36,407,
	8,36,10,36,12,36,410,9,36,1,36,3,36,413,8,36,1,36,3,36,416,8,36,1,37,1,
	37,1,37,1,38,1,38,1,38,1,38,1,38,1,38,1,38,3,38,428,8,38,1,39,1,39,1,39,
	3,39,433,8,39,1,39,1,39,1,40,1,40,1,40,5,40,440,8,40,10,40,12,40,443,9,
	40,1,41,1,41,3,41,447,8,41,1,42,1,42,1,42,1,42,3,42,453,8,42,1,42,1,42,
	1,42,1,42,1,42,1,42,1,42,1,42,1,42,1,42,1,42,1,42,1,42,1,42,1,42,1,42,1,
	42,1,42,1,42,1,42,1,42,1,42,1,42,1,42,1,42,1,42,1,42,1,42,1,42,1,42,1,42,
	1,42,1,42,1,42,1,42,1,42,1,42,1,42,5,42,493,8,42,10,42,12,42,496,9,42,1,
	43,1,43,1,43,1,43,1,43,1,43,1,43,3,43,505,8,43,1,44,1,44,1,44,1,44,1,44,
	3,44,512,8,44,1,45,1,45,1,45,3,45,517,8,45,1,46,1,46,1,46,1,46,1,46,5,46,
	524,8,46,10,46,12,46,527,9,46,3,46,529,8,46,1,46,1,46,1,46,1,46,3,46,535,
	8,46,1,46,1,46,3,46,539,8,46,1,47,1,47,3,47,543,8,47,1,48,1,48,1,48,5,48,
	548,8,48,10,48,12,48,551,9,48,1,49,1,49,1,50,1,50,1,51,1,51,1,52,1,52,1,
	53,1,53,1,54,1,54,1,55,1,55,1,56,1,56,1,56,1,56,1,56,1,56,1,56,1,56,1,56,
	1,56,3,56,577,8,56,1,57,1,57,1,57,1,57,1,57,1,57,3,57,585,8,57,1,57,5,119,
	125,134,140,146,1,84,58,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,
	36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,
	84,86,88,90,92,94,96,98,100,102,104,106,108,110,112,114,0,22,2,0,97,97,
	100,101,1,0,100,101,1,0,97,99,2,0,23,23,96,96,6,0,4,4,8,12,14,14,20,20,
	24,37,97,98,2,0,6,6,44,44,3,0,23,23,30,30,45,46,3,0,6,6,44,44,47,47,1,0,
	49,52,2,0,5,5,53,55,2,0,31,31,56,56,1,0,58,59,2,0,11,11,32,32,1,0,33,34,
	2,0,35,36,65,67,2,0,35,36,68,69,2,0,27,27,70,70,2,0,25,26,71,72,1,0,25,
	26,1,0,95,96,1,0,73,80,1,0,81,88,617,0,119,1,0,0,0,2,156,1,0,0,0,4,171,
	1,0,0,0,6,176,1,0,0,0,8,180,1,0,0,0,10,184,1,0,0,0,12,188,1,0,0,0,14,190,
	1,0,0,0,16,195,1,0,0,0,18,202,1,0,0,0,20,204,1,0,0,0,22,206,1,0,0,0,24,
	208,1,0,0,0,26,217,1,0,0,0,28,223,1,0,0,0,30,234,1,0,0,0,32,244,1,0,0,0,
	34,249,1,0,0,0,36,258,1,0,0,0,38,262,1,0,0,0,40,265,1,0,0,0,42,279,1,0,
	0,0,44,281,1,0,0,0,46,292,1,0,0,0,48,294,1,0,0,0,50,302,1,0,0,0,52,327,
	1,0,0,0,54,359,1,0,0,0,56,361,1,0,0,0,58,365,1,0,0,0,60,367,1,0,0,0,62,
	382,1,0,0,0,64,384,1,0,0,0,66,387,1,0,0,0,68,392,1,0,0,0,70,397,1,0,0,0,
	72,402,1,0,0,0,74,417,1,0,0,0,76,427,1,0,0,0,78,429,1,0,0,0,80,436,1,0,
	0,0,82,446,1,0,0,0,84,452,1,0,0,0,86,504,1,0,0,0,88,511,1,0,0,0,90,513,
	1,0,0,0,92,538,1,0,0,0,94,540,1,0,0,0,96,544,1,0,0,0,98,552,1,0,0,0,100,
	554,1,0,0,0,102,556,1,0,0,0,104,558,1,0,0,0,106,560,1,0,0,0,108,562,1,0,
	0,0,110,564,1,0,0,0,112,576,1,0,0,0,114,584,1,0,0,0,116,118,3,16,8,0,117,
	116,1,0,0,0,118,121,1,0,0,0,119,120,1,0,0,0,119,117,1,0,0,0,120,125,1,0,
	0,0,121,119,1,0,0,0,122,124,3,2,1,0,123,122,1,0,0,0,124,127,1,0,0,0,125,
	126,1,0,0,0,125,123,1,0,0,0,126,129,1,0,0,0,127,125,1,0,0,0,128,130,3,14,
	7,0,129,128,1,0,0,0,129,130,1,0,0,0,130,134,1,0,0,0,131,133,3,24,12,0,132,
	131,1,0,0,0,133,136,1,0,0,0,134,135,1,0,0,0,134,132,1,0,0,0,135,140,1,0,
	0,0,136,134,1,0,0,0,137,139,3,74,37,0,138,137,1,0,0,0,139,142,1,0,0,0,140,
	141,1,0,0,0,140,138,1,0,0,0,141,146,1,0,0,0,142,140,1,0,0,0,143,145,3,26,
	13,0,144,143,1,0,0,0,145,148,1,0,0,0,146,147,1,0,0,0,146,144,1,0,0,0,147,
	150,1,0,0,0,148,146,1,0,0,0,149,151,3,28,14,0,150,149,1,0,0,0,151,152,1,
	0,0,0,152,150,1,0,0,0,152,153,1,0,0,0,153,154,1,0,0,0,154,155,5,0,0,1,155,
	1,1,0,0,0,156,157,5,1,0,0,157,158,3,20,10,0,158,160,5,2,0,0,159,161,3,4,
	2,0,160,159,1,0,0,0,161,162,1,0,0,0,162,160,1,0,0,0,162,163,1,0,0,0,163,
	165,1,0,0,0,164,166,3,6,3,0,165,164,1,0,0,0,166,167,1,0,0,0,167,165,1,0,
	0,0,167,168,1,0,0,0,168,169,1,0,0,0,169,170,5,3,0,0,170,3,1,0,0,0,171,172,
	5,4,0,0,172,173,5,97,0,0,173,174,5,5,0,0,174,175,3,20,10,0,175,5,1,0,0,
	0,176,177,3,8,4,0,177,178,5,6,0,0,178,179,3,10,5,0,179,7,1,0,0,0,180,181,
	5,97,0,0,181,182,5,7,0,0,182,183,3,12,6,0,183,9,1,0,0,0,184,185,5,97,0,
	0,185,186,5,7,0,0,186,187,3,12,6,0,187,11,1,0,0,0,188,189,7,0,0,0,189,13,
	1,0,0,0,190,191,5,8,0,0,191,192,3,20,10,0,192,193,5,5,0,0,193,194,3,22,
	11,0,194,15,1,0,0,0,195,196,5,105,0,0,196,197,3,60,30,0,197,200,5,5,0,0,
	198,201,3,112,56,0,199,201,3,18,9,0,200,198,1,0,0,0,200,199,1,0,0,0,200,
	201,1,0,0,0,201,17,1,0,0,0,202,203,5,102,0,0,203,19,1,0,0,0,204,205,7,1,
	0,0,205,21,1,0,0,0,206,207,7,2,0,0,207,23,1,0,0,0,208,209,5,9,0,0,209,212,
	3,20,10,0,210,211,5,10,0,0,211,213,3,22,11,0,212,210,1,0,0,0,212,213,1,
	0,0,0,213,214,1,0,0,0,214,215,5,11,0,0,215,216,3,108,54,0,216,25,1,0,0,
	0,217,218,5,12,0,0,218,219,5,97,0,0,219,220,5,5,0,0,220,221,3,84,42,0,221,
	222,5,13,0,0,222,27,1,0,0,0,223,224,5,14,0,0,224,225,5,97,0,0,225,227,3,
	30,15,0,226,228,3,38,19,0,227,226,1,0,0,0,227,228,1,0,0,0,228,230,1,0,0,
	0,229,231,3,36,18,0,230,229,1,0,0,0,230,231,1,0,0,0,231,232,1,0,0,0,232,
	233,3,34,17,0,233,29,1,0,0,0,234,235,5,15,0,0,235,238,3,32,16,0,236,237,
	5,16,0,0,237,239,3,32,16,0,238,236,1,0,0,0,239,240,1,0,0,0,240,238,1,0,
	0,0,240,241,1,0,0,0,241,242,1,0,0,0,242,243,5,17,0,0,243,31,1,0,0,0,244,
	245,3,110,55,0,245,247,5,97,0,0,246,248,3,40,20,0,247,246,1,0,0,0,247,248,
	1,0,0,0,248,33,1,0,0,0,249,253,5,2,0,0,250,252,3,42,21,0,251,250,1,0,0,
	0,252,255,1,0,0,0,253,251,1,0,0,0,253,254,1,0,0,0,254,256,1,0,0,0,255,253,
	1,0,0,0,256,257,5,3,0,0,257,35,1,0,0,0,258,259,5,18,0,0,259,260,3,106,53,
	0,260,261,5,19,0,0,261,37,1,0,0,0,262,263,5,20,0,0,263,264,5,97,0,0,264,
	39,1,0,0,0,265,266,5,7,0,0,266,267,3,22,11,0,267,41,1,0,0,0,268,269,3,60,
	30,0,269,270,5,21,0,0,270,272,3,60,30,0,271,273,3,46,23,0,272,271,1,0,0,
	0,272,273,1,0,0,0,273,274,1,0,0,0,274,275,5,13,0,0,275,280,1,0,0,0,276,
	277,3,44,22,0,277,278,5,13,0,0,278,280,1,0,0,0,279,268,1,0,0,0,279,276,
	1,0,0,0,280,43,1,0,0,0,281,284,3,48,24,0,282,283,5,21,0,0,283,285,3,52,
	26,0,284,282,1,0,0,0,284,285,1,0,0,0,285,287,1,0,0,0,286,288,3,72,36,0,
	287,286,1,0,0,0,287,288,1,0,0,0,288,290,1,0,0,0,289,291,3,46,23,0,290,289,
	1,0,0,0,290,291,1,0,0,0,291,45,1,0,0,0,292,293,5,101,0,0,293,47,1,0,0,0,
	294,299,3,50,25,0,295,296,5,16,0,0,296,298,3,50,25,0,297,295,1,0,0,0,298,
	301,1,0,0,0,299,297,1,0,0,0,299,300,1,0,0,0,300,49,1,0,0,0,301,299,1,0,
	0,0,302,304,3,60,30,0,303,305,3,40,20,0,304,303,1,0,0,0,304,305,1,0,0,0,
	305,307,1,0,0,0,306,308,3,56,28,0,307,306,1,0,0,0,307,308,1,0,0,0,308,310,
	1,0,0,0,309,311,3,62,31,0,310,309,1,0,0,0,310,311,1,0,0,0,311,313,1,0,0,
	0,312,314,3,102,51,0,313,312,1,0,0,0,313,314,1,0,0,0,314,316,1,0,0,0,315,
	317,3,64,32,0,316,315,1,0,0,0,316,317,1,0,0,0,317,319,1,0,0,0,318,320,3,
	66,33,0,319,318,1,0,0,0,319,320,1,0,0,0,320,322,1,0,0,0,321,323,3,68,34,
	0,322,321,1,0,0,0,322,323,1,0,0,0,323,325,1,0,0,0,324,326,3,70,35,0,325,
	324,1,0,0,0,325,326,1,0,0,0,326,51,1,0,0,0,327,332,3,54,27,0,328,329,5,
	16,0,0,329,331,3,54,27,0,330,328,1,0,0,0,331,334,1,0,0,0,332,330,1,0,0,
	0,332,333,1,0,0,0,333,53,1,0,0,0,334,332,1,0,0,0,335,338,3,60,30,0,336,
	337,5,5,0,0,337,339,3,76,38,0,338,336,1,0,0,0,338,339,1,0,0,0,339,341,1,
	0,0,0,340,342,3,64,32,0,341,340,1,0,0,0,341,342,1,0,0,0,342,344,1,0,0,0,
	343,345,3,104,52,0,344,343,1,0,0,0,344,345,1,0,0,0,345,360,1,0,0,0,346,
	347,5,15,0,0,347,348,3,84,42,0,348,350,5,17,0,0,349,351,3,64,32,0,350,349,
	1,0,0,0,350,351,1,0,0,0,351,353,1,0,0,0,352,354,3,104,52,0,353,352,1,0,
	0,0,353,354,1,0,0,0,354,360,1,0,0,0,355,357,3,78,39,0,356,358,3,64,32,0,
	357,356,1,0,0,0,357,358,1,0,0,0,358,360,1,0,0,0,359,335,1,0,0,0,359,346,
	1,0,0,0,359,355,1,0,0,0,360,55,1,0,0,0,361,362,5,96,0,0,362,363,5,22,0,
	0,363,364,3,58,29,0,364,57,1,0,0,0,365,366,7,3,0,0,366,59,1,0,0,0,367,372,
	7,4,0,0,368,369,5,38,0,0,369,371,7,4,0,0,370,368,1,0,0,0,371,374,1,0,0,
	0,372,370,1,0,0,0,372,373,1,0,0,0,373,61,1,0,0,0,374,372,1,0,0,0,375,376,
	5,39,0,0,376,377,5,15,0,0,377,378,3,84,42,0,378,379,5,17,0,0,379,383,1,
	0,0,0,380,381,5,39,0,0,381,383,5,101,0,0,382,375,1,0,0,0,382,380,1,0,0,
	0,383,63,1,0,0,0,384,385,5,11,0,0,385,386,3,22,11,0,386,65,1,0,0,0,387,
	388,5,28,0,0,388,389,5,15,0,0,389,390,3,84,42,0,390,391,5,17,0,0,391,67,
	1,0,0,0,392,393,5,29,0,0,393,394,5,15,0,0,394,395,3,84,42,0,395,396,5,17,
	0,0,396,69,1,0,0,0,397,398,5,40,0,0,398,399,5,15,0,0,399,400,3,84,42,0,
	400,401,5,17,0,0,401,71,1,0,0,0,402,415,5,41,0,0,403,408,3,78,39,0,404,
	405,5,16,0,0,405,407,3,78,39,0,406,404,1,0,0,0,407,410,1,0,0,0,408,406,
	1,0,0,0,408,409,1,0,0,0,409,412,1,0,0,0,410,408,1,0,0,0,411,413,3,34,17,
	0,412,411,1,0,0,0,412,413,1,0,0,0,413,416,1,0,0,0,414,416,3,34,17,0,415,
	403,1,0,0,0,415,414,1,0,0,0,416,73,1,0,0,0,417,418,5,24,0,0,418,419,3,20,
	10,0,419,75,1,0,0,0,420,428,3,112,56,0,421,428,3,60,30,0,422,428,3,78,39,
	0,423,424,5,15,0,0,424,425,3,84,42,0,425,426,5,17,0,0,426,428,1,0,0,0,427,
	420,1,0,0,0,427,421,1,0,0,0,427,422,1,0,0,0,427,423,1,0,0,0,428,77,1,0,
	0,0,429,430,3,22,11,0,430,432,5,15,0,0,431,433,3,80,40,0,432,431,1,0,0,
	0,432,433,1,0,0,0,433,434,1,0,0,0,434,435,5,17,0,0,435,79,1,0,0,0,436,441,
	3,82,41,0,437,438,5,16,0,0,438,440,3,82,41,0,439,437,1,0,0,0,440,443,1,
	0,0,0,441,439,1,0,0,0,441,442,1,0,0,0,442,81,1,0,0,0,443,441,1,0,0,0,444,
	447,3,112,56,0,445,447,5,97,0,0,446,444,1,0,0,0,446,445,1,0,0,0,447,83,
	1,0,0,0,448,449,6,42,-1,0,449,453,3,86,43,0,450,451,7,5,0,0,451,453,3,84,
	42,11,452,448,1,0,0,0,452,450,1,0,0,0,453,494,1,0,0,0,454,455,10,10,0,0,
	455,456,7,6,0,0,456,493,3,84,42,11,457,458,10,9,0,0,458,459,7,7,0,0,459,
	493,3,84,42,10,460,461,10,7,0,0,461,462,5,48,0,0,462,493,3,84,42,8,463,
	464,10,6,0,0,464,465,7,8,0,0,465,493,3,84,42,7,466,467,10,5,0,0,467,468,
	7,9,0,0,468,493,3,84,42,6,469,470,10,4,0,0,470,471,7,10,0,0,471,493,3,84,
	42,5,472,473,10,3,0,0,473,474,5,57,0,0,474,493,3,84,42,4,475,476,10,2,0,
	0,476,477,7,11,0,0,477,493,3,84,42,3,478,479,10,1,0,0,479,480,5,60,0,0,
	480,493,3,84,42,2,481,482,10,13,0,0,482,483,5,38,0,0,483,493,3,88,44,0,
	484,485,10,12,0,0,485,486,5,42,0,0,486,487,3,84,42,0,487,488,5,43,0,0,488,
	493,1,0,0,0,489,490,10,8,0,0,490,491,7,12,0,0,491,493,3,98,49,0,492,454,
	1,0,0,0,492,457,1,0,0,0,492,460,1,0,0,0,492,463,1,0,0,0,492,466,1,0,0,0,
	492,469,1,0,0,0,492,472,1,0,0,0,492,475,1,0,0,0,492,478,1,0,0,0,492,481,
	1,0,0,0,492,484,1,0,0,0,492,489,1,0,0,0,493,496,1,0,0,0,494,492,1,0,0,0,
	494,495,1,0,0,0,495,85,1,0,0,0,496,494,1,0,0,0,497,505,3,88,44,0,498,505,
	3,112,56,0,499,505,3,90,45,0,500,501,5,15,0,0,501,502,3,84,42,0,502,503,
	5,17,0,0,503,505,1,0,0,0,504,497,1,0,0,0,504,498,1,0,0,0,504,499,1,0,0,
	0,504,500,1,0,0,0,505,87,1,0,0,0,506,512,3,92,46,0,507,512,3,22,11,0,508,
	512,5,61,0,0,509,512,5,62,0,0,510,512,5,63,0,0,511,506,1,0,0,0,511,507,
	1,0,0,0,511,508,1,0,0,0,511,509,1,0,0,0,511,510,1,0,0,0,512,89,1,0,0,0,
	513,516,5,64,0,0,514,517,3,22,11,0,515,517,5,100,0,0,516,514,1,0,0,0,516,
	515,1,0,0,0,517,91,1,0,0,0,518,519,5,37,0,0,519,528,5,15,0,0,520,525,3,
	94,47,0,521,522,5,16,0,0,522,524,3,94,47,0,523,521,1,0,0,0,524,527,1,0,
	0,0,525,523,1,0,0,0,525,526,1,0,0,0,526,529,1,0,0,0,527,525,1,0,0,0,528,
	520,1,0,0,0,528,529,1,0,0,0,529,530,1,0,0,0,530,539,5,17,0,0,531,532,3,
	60,30,0,532,534,5,15,0,0,533,535,3,96,48,0,534,533,1,0,0,0,534,535,1,0,
	0,0,535,536,1,0,0,0,536,537,5,17,0,0,537,539,1,0,0,0,538,518,1,0,0,0,538,
	531,1,0,0,0,539,93,1,0,0,0,540,542,3,84,42,0,541,543,7,13,0,0,542,541,1,
	0,0,0,542,543,1,0,0,0,543,95,1,0,0,0,544,549,3,84,42,0,545,546,5,16,0,0,
	546,548,3,84,42,0,547,545,1,0,0,0,548,551,1,0,0,0,549,547,1,0,0,0,549,550,
	1,0,0,0,550,97,1,0,0,0,551,549,1,0,0,0,552,553,3,60,30,0,553,99,1,0,0,0,
	554,555,5,97,0,0,555,101,1,0,0,0,556,557,7,14,0,0,557,103,1,0,0,0,558,559,
	7,15,0,0,559,105,1,0,0,0,560,561,7,16,0,0,561,107,1,0,0,0,562,563,7,17,
	0,0,563,109,1,0,0,0,564,565,7,18,0,0,565,111,1,0,0,0,566,577,5,89,0,0,567,
	577,5,90,0,0,568,577,3,114,57,0,569,577,5,94,0,0,570,577,7,19,0,0,571,577,
	5,91,0,0,572,577,5,92,0,0,573,577,5,93,0,0,574,577,5,100,0,0,575,577,5,
	101,0,0,576,566,1,0,0,0,576,567,1,0,0,0,576,568,1,0,0,0,576,569,1,0,0,0,
	576,570,1,0,0,0,576,571,1,0,0,0,576,572,1,0,0,0,576,573,1,0,0,0,576,574,
	1,0,0,0,576,575,1,0,0,0,577,113,1,0,0,0,578,579,7,19,0,0,579,585,7,20,0,
	0,580,581,7,19,0,0,581,585,7,21,0,0,582,583,7,19,0,0,583,585,5,100,0,0,
	584,578,1,0,0,0,584,580,1,0,0,0,584,582,1,0,0,0,585,115,1,0,0,0,61,119,
	125,129,134,140,146,152,162,167,200,212,227,230,240,247,253,272,279,284,
	287,290,299,304,307,310,313,316,319,322,325,332,338,341,344,350,353,357,
	359,372,382,408,412,415,427,432,441,446,452,492,494,504,511,516,525,528,
	534,538,542,549,576,584];

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
	public STRING(): TerminalNode {
		return this.getToken(FmlMappingParser.STRING, 0);
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
	public STRING(): TerminalNode {
		return this.getToken(FmlMappingParser.STRING, 0);
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
	public DELIMITEDIDENTIFIER(): TerminalNode {
		return this.getToken(FmlMappingParser.DELIMITEDIDENTIFIER, 0);
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
	public modelMode(): ModelModeContext {
		return this.getTypedRuleContext(ModelModeContext, 0) as ModelModeContext;
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
	public mapRules(): MapRulesContext {
		return this.getTypedRuleContext(MapRulesContext, 0) as MapRulesContext;
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
	public parameterMode(): ParameterModeContext {
		return this.getTypedRuleContext(ParameterModeContext, 0) as ParameterModeContext;
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


export class MapRulesContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public mapRule_list(): MapRuleContext[] {
		return this.getTypedRuleContexts(MapRuleContext) as MapRuleContext[];
	}
	public mapRule(i: number): MapRuleContext {
		return this.getTypedRuleContext(MapRuleContext, i) as MapRuleContext;
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_mapRules;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterMapRules) {
	 		listener.enterMapRules(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitMapRules) {
	 		listener.exitMapRules(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitMapRules) {
			return visitor.visitMapRules(this);
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
	public groupTypeMode(): GroupTypeModeContext {
		return this.getTypedRuleContext(GroupTypeModeContext, 0) as GroupTypeModeContext;
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


export class MapRuleContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_mapRule;
	}
	public override copyFrom(ctx: MapRuleContext): void {
		super.copyFrom(ctx);
	}
}
export class MapFhirMarkupContext extends MapRuleContext {
	constructor(parser: FmlMappingParser, ctx: MapRuleContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public mapTransformationRule(): MapTransformationRuleContext {
		return this.getTypedRuleContext(MapTransformationRuleContext, 0) as MapTransformationRuleContext;
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
export class MapSimpleCopyContext extends MapRuleContext {
	constructor(parser: FmlMappingParser, ctx: MapRuleContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public qualifiedIdentifier_list(): QualifiedIdentifierContext[] {
		return this.getTypedRuleContexts(QualifiedIdentifierContext) as QualifiedIdentifierContext[];
	}
	public qualifiedIdentifier(i: number): QualifiedIdentifierContext {
		return this.getTypedRuleContext(QualifiedIdentifierContext, i) as QualifiedIdentifierContext;
	}
	public ruleName(): RuleNameContext {
		return this.getTypedRuleContext(RuleNameContext, 0) as RuleNameContext;
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


export class MapTransformationRuleContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ruleSources(): RuleSourcesContext {
		return this.getTypedRuleContext(RuleSourcesContext, 0) as RuleSourcesContext;
	}
	public ruleTargets(): RuleTargetsContext {
		return this.getTypedRuleContext(RuleTargetsContext, 0) as RuleTargetsContext;
	}
	public dependentExpression(): DependentExpressionContext {
		return this.getTypedRuleContext(DependentExpressionContext, 0) as DependentExpressionContext;
	}
	public ruleName(): RuleNameContext {
		return this.getTypedRuleContext(RuleNameContext, 0) as RuleNameContext;
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_mapTransformationRule;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterMapTransformationRule) {
	 		listener.enterMapTransformationRule(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitMapTransformationRule) {
	 		listener.exitMapTransformationRule(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitMapTransformationRule) {
			return visitor.visitMapTransformationRule(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RuleNameContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public DOUBLE_QUOTED_STRING(): TerminalNode {
		return this.getToken(FmlMappingParser.DOUBLE_QUOTED_STRING, 0);
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_ruleName;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterRuleName) {
	 		listener.enterRuleName(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitRuleName) {
	 		listener.exitRuleName(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitRuleName) {
			return visitor.visitRuleName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RuleSourcesContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ruleSource_list(): RuleSourceContext[] {
		return this.getTypedRuleContexts(RuleSourceContext) as RuleSourceContext[];
	}
	public ruleSource(i: number): RuleSourceContext {
		return this.getTypedRuleContext(RuleSourceContext, i) as RuleSourceContext;
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_ruleSources;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterRuleSources) {
	 		listener.enterRuleSources(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitRuleSources) {
	 		listener.exitRuleSources(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitRuleSources) {
			return visitor.visitRuleSources(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RuleSourceContext extends ParserRuleContext {
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
	public sourceListMode(): SourceListModeContext {
		return this.getTypedRuleContext(SourceListModeContext, 0) as SourceListModeContext;
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
    	return FmlMappingParser.RULE_ruleSource;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterRuleSource) {
	 		listener.enterRuleSource(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitRuleSource) {
	 		listener.exitRuleSource(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitRuleSource) {
			return visitor.visitRuleSource(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RuleTargetsContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ruleTarget_list(): RuleTargetContext[] {
		return this.getTypedRuleContexts(RuleTargetContext) as RuleTargetContext[];
	}
	public ruleTarget(i: number): RuleTargetContext {
		return this.getTypedRuleContext(RuleTargetContext, i) as RuleTargetContext;
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_ruleTargets;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterRuleTargets) {
	 		listener.enterRuleTargets(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitRuleTargets) {
	 		listener.exitRuleTargets(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitRuleTargets) {
			return visitor.visitRuleTargets(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RuleTargetContext extends ParserRuleContext {
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
	public targetListMode(): TargetListModeContext {
		return this.getTypedRuleContext(TargetListModeContext, 0) as TargetListModeContext;
	}
	public fpExpression(): FpExpressionContext {
		return this.getTypedRuleContext(FpExpressionContext, 0) as FpExpressionContext;
	}
	public groupInvocation(): GroupInvocationContext {
		return this.getTypedRuleContext(GroupInvocationContext, 0) as GroupInvocationContext;
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_ruleTarget;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterRuleTarget) {
	 		listener.enterRuleTarget(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitRuleTarget) {
	 		listener.exitRuleTarget(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitRuleTarget) {
			return visitor.visitRuleTarget(this);
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
	public groupInvocation_list(): GroupInvocationContext[] {
		return this.getTypedRuleContexts(GroupInvocationContext) as GroupInvocationContext[];
	}
	public groupInvocation(i: number): GroupInvocationContext {
		return this.getTypedRuleContext(GroupInvocationContext, i) as GroupInvocationContext;
	}
	public mapRules(): MapRulesContext {
		return this.getTypedRuleContext(MapRulesContext, 0) as MapRulesContext;
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
	public groupInvocation(): GroupInvocationContext {
		return this.getTypedRuleContext(GroupInvocationContext, 0) as GroupInvocationContext;
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


export class GroupInvocationContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
	public groupParamList(): GroupParamListContext {
		return this.getTypedRuleContext(GroupParamListContext, 0) as GroupParamListContext;
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_groupInvocation;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterGroupInvocation) {
	 		listener.enterGroupInvocation(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitGroupInvocation) {
	 		listener.exitGroupInvocation(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitGroupInvocation) {
			return visitor.visitGroupInvocation(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class GroupParamListContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public groupParam_list(): GroupParamContext[] {
		return this.getTypedRuleContexts(GroupParamContext) as GroupParamContext[];
	}
	public groupParam(i: number): GroupParamContext {
		return this.getTypedRuleContext(GroupParamContext, i) as GroupParamContext;
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_groupParamList;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterGroupParamList) {
	 		listener.enterGroupParamList(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitGroupParamList) {
	 		listener.exitGroupParamList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitGroupParamList) {
			return visitor.visitGroupParamList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class GroupParamContext extends ParserRuleContext {
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
    	return FmlMappingParser.RULE_groupParam;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterGroupParam) {
	 		listener.enterGroupParam(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitGroupParam) {
	 		listener.exitGroupParam(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitGroupParam) {
			return visitor.visitGroupParam(this);
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
	public override copyFrom(ctx: FpExpressionContext): void {
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
	public override copyFrom(ctx: FpTermContext): void {
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
	public override copyFrom(ctx: FpInvocationContext): void {
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
	public STRING(): TerminalNode {
		return this.getToken(FmlMappingParser.STRING, 0);
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
	public fpSortArgument_list(): FpSortArgumentContext[] {
		return this.getTypedRuleContexts(FpSortArgumentContext) as FpSortArgumentContext[];
	}
	public fpSortArgument(i: number): FpSortArgumentContext {
		return this.getTypedRuleContext(FpSortArgumentContext, i) as FpSortArgumentContext;
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


export class FpSortArgumentContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_fpSortArgument;
	}
	public override copyFrom(ctx: FpSortArgumentContext): void {
		super.copyFrom(ctx);
	}
}
export class SortDirectionArgumentContext extends FpSortArgumentContext {
	constructor(parser: FmlMappingParser, ctx: FpSortArgumentContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public fpExpression(): FpExpressionContext {
		return this.getTypedRuleContext(FpExpressionContext, 0) as FpExpressionContext;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterSortDirectionArgument) {
	 		listener.enterSortDirectionArgument(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitSortDirectionArgument) {
	 		listener.exitSortDirectionArgument(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitSortDirectionArgument) {
			return visitor.visitSortDirectionArgument(this);
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


export class SourceListModeContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_sourceListMode;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterSourceListMode) {
	 		listener.enterSourceListMode(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitSourceListMode) {
	 		listener.exitSourceListMode(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitSourceListMode) {
			return visitor.visitSourceListMode(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TargetListModeContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_targetListMode;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterTargetListMode) {
	 		listener.enterTargetListMode(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitTargetListMode) {
	 		listener.exitTargetListMode(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitTargetListMode) {
			return visitor.visitTargetListMode(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class GroupTypeModeContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_groupTypeMode;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterGroupTypeMode) {
	 		listener.enterGroupTypeMode(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitGroupTypeMode) {
	 		listener.exitGroupTypeMode(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitGroupTypeMode) {
			return visitor.visitGroupTypeMode(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ModelModeContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_modelMode;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterModelMode) {
	 		listener.enterModelMode(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitModelMode) {
	 		listener.exitModelMode(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitModelMode) {
			return visitor.visitModelMode(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParameterModeContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_parameterMode;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterParameterMode) {
	 		listener.enterParameterMode(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitParameterMode) {
	 		listener.exitParameterMode(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitParameterMode) {
			return visitor.visitParameterMode(this);
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
	public override copyFrom(ctx: LiteralContext): void {
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
	public DATETIME(): TerminalNode {
		return this.getToken(FmlMappingParser.DATETIME, 0);
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
	public STRING(): TerminalNode {
		return this.getToken(FmlMappingParser.STRING, 0);
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
	public LONGNUMBER(): TerminalNode {
		return this.getToken(FmlMappingParser.LONGNUMBER, 0);
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
	public override copyFrom(ctx: FpQuantityContext): void {
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
	public STRING(): TerminalNode {
		return this.getToken(FmlMappingParser.STRING, 0);
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
