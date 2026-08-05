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
	public static readonly RULE_identityFieldList = 23;
	public static readonly RULE_ruleName = 24;
	public static readonly RULE_ruleSources = 25;
	public static readonly RULE_ruleSource = 26;
	public static readonly RULE_ruleTargets = 27;
	public static readonly RULE_ruleTarget = 28;
	public static readonly RULE_sourceCardinality = 29;
	public static readonly RULE_upperBound = 30;
	public static readonly RULE_qualifiedIdentifier = 31;
	public static readonly RULE_sourceDefault = 32;
	public static readonly RULE_alias = 33;
	public static readonly RULE_whereClause = 34;
	public static readonly RULE_checkClause = 35;
	public static readonly RULE_log = 36;
	public static readonly RULE_dependentExpression = 37;
	public static readonly RULE_importDeclaration = 38;
	public static readonly RULE_transform = 39;
	public static readonly RULE_transformInvocation = 40;
	public static readonly RULE_transformParamList = 41;
	public static readonly RULE_transformParam = 42;
	public static readonly RULE_transformParamName = 43;
	public static readonly RULE_transformParamValue = 44;
	public static readonly RULE_groupInvocation = 45;
	public static readonly RULE_groupParamList = 46;
	public static readonly RULE_groupParam = 47;
	public static readonly RULE_fpExpression = 48;
	public static readonly RULE_fpTerm = 49;
	public static readonly RULE_fpInvocation = 50;
	public static readonly RULE_fpExternalConstant = 51;
	public static readonly RULE_fpFunction = 52;
	public static readonly RULE_fpSortArgument = 53;
	public static readonly RULE_fpParamList = 54;
	public static readonly RULE_fpTypeSpecifier = 55;
	public static readonly RULE_constant = 56;
	public static readonly RULE_sourceListMode = 57;
	public static readonly RULE_targetListMode = 58;
	public static readonly RULE_groupTypeMode = 59;
	public static readonly RULE_modelMode = 60;
	public static readonly RULE_parameterMode = 61;
	public static readonly RULE_literal = 62;
	public static readonly RULE_fpQuantity = 63;
	public static readonly literalNames: (string | null)[] = [ null, "'conceptmap'", 
                                                            "'{'", "'}'", 
                                                            "'prefix'", 
                                                            "'='", "'-'", 
                                                            "':'", "'map'", 
                                                            "'as'", "'contains'", 
                                                            "'in'", "'is'", 
                                                            "'asc'", "'desc'", 
                                                            "'sort'", "'uses'", 
                                                            "'alias'", "'let'", 
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
                                                            "'first'", "'last'", 
                                                            "'.'", "'default'", 
                                                            "'log'", "'then'", 
                                                            "'['", "']'", 
                                                            "'+'", "'/'", 
                                                            "'mod'", "'&'", 
                                                            "'|'", "'<='", 
                                                            "'<'", "'>'", 
                                                            "'>='", "'~'", 
                                                            "'!='", "'!~'", 
                                                            "'and'", "'or'", 
                                                            "'xor'", "'implies'", 
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
		"extends", "typeIdentifier", "mapRule", "mapTransformationRule", "identityFieldList", 
		"ruleName", "ruleSources", "ruleSource", "ruleTargets", "ruleTarget", 
		"sourceCardinality", "upperBound", "qualifiedIdentifier", "sourceDefault", 
		"alias", "whereClause", "checkClause", "log", "dependentExpression", "importDeclaration", 
		"transform", "transformInvocation", "transformParamList", "transformParam", 
		"transformParamName", "transformParamValue", "groupInvocation", "groupParamList", 
		"groupParam", "fpExpression", "fpTerm", "fpInvocation", "fpExternalConstant", 
		"fpFunction", "fpSortArgument", "fpParamList", "fpTypeSpecifier", "constant", 
		"sourceListMode", "targetListMode", "groupTypeMode", "modelMode", "parameterMode", 
		"literal", "fpQuantity",
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
			this.state = 131;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 0, this._ctx);
			while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1 + 1) {
					{
					{
					this.state = 128;
					this.metadataDeclaration();
					}
					}
				}
				this.state = 133;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 0, this._ctx);
			}
			this.state = 137;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 1, this._ctx);
			while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1 + 1) {
					{
					{
					this.state = 134;
					this.conceptMapDeclaration();
					}
					}
				}
				this.state = 139;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 1, this._ctx);
			}
			this.state = 141;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===8) {
				{
				this.state = 140;
				this.mapDeclaration();
				}
			}

			this.state = 146;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 3, this._ctx);
			while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1 + 1) {
					{
					{
					this.state = 143;
					this.structureDeclaration();
					}
					}
				}
				this.state = 148;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 3, this._ctx);
			}
			this.state = 152;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 4, this._ctx);
			while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1 + 1) {
					{
					{
					this.state = 149;
					this.importDeclaration();
					}
					}
				}
				this.state = 154;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 4, this._ctx);
			}
			this.state = 158;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 5, this._ctx);
			while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1 + 1) {
					{
					{
					this.state = 155;
					this.constantDeclaration();
					}
					}
				}
				this.state = 160;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 5, this._ctx);
			}
			this.state = 162;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 161;
				this.groupDeclaration();
				}
				}
				this.state = 164;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la===20);
			this.state = 166;
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
			this.state = 168;
			this.match(FmlMappingParser.T__0);
			this.state = 169;
			this.url();
			this.state = 170;
			this.match(FmlMappingParser.T__1);
			this.state = 172;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 171;
				this.conceptMapPrefix();
				}
				}
				this.state = 174;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la===4);
			this.state = 177;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 176;
				this.conceptMapCodeMap();
				}
				}
				this.state = 179;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la===97);
			this.state = 181;
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
			this.state = 183;
			this.match(FmlMappingParser.T__3);
			this.state = 184;
			this.match(FmlMappingParser.ID);
			this.state = 185;
			this.match(FmlMappingParser.T__4);
			this.state = 186;
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
			this.state = 188;
			this.conceptMapSource();
			this.state = 189;
			this.match(FmlMappingParser.T__5);
			this.state = 190;
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
			this.state = 192;
			this.match(FmlMappingParser.ID);
			this.state = 193;
			this.match(FmlMappingParser.T__6);
			this.state = 194;
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
			this.state = 196;
			this.match(FmlMappingParser.ID);
			this.state = 197;
			this.match(FmlMappingParser.T__6);
			this.state = 198;
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
			this.state = 200;
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
			this.state = 202;
			this.match(FmlMappingParser.T__7);
			this.state = 203;
			this.url();
			this.state = 204;
			this.match(FmlMappingParser.T__4);
			this.state = 207;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 9:
			case 10:
			case 11:
			case 12:
			case 13:
			case 14:
			case 15:
			case 97:
			case 98:
			case 99:
				{
				this.state = 205;
				this.identifier();
				}
				break;
			case 101:
				{
				this.state = 206;
				this.match(FmlMappingParser.DOUBLE_QUOTED_STRING);
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
	public metadataDeclaration(): MetadataDeclarationContext {
		let localctx: MetadataDeclarationContext = new MetadataDeclarationContext(this, this._ctx, this.state);
		this.enterRule(localctx, 16, FmlMappingParser.RULE_metadataDeclaration);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 209;
			this.match(FmlMappingParser.METADATA_PREFIX);
			this.state = 210;
			this.qualifiedIdentifier();
			this.state = 211;
			this.match(FmlMappingParser.T__4);
			this.state = 214;
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
				this.state = 212;
				this.literal();
				}
				break;
			case 102:
				{
				this.state = 213;
				this.markdownLiteral();
				}
				break;
			case 1:
			case 8:
			case 16:
			case 18:
			case 20:
			case 30:
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
			this.state = 216;
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
			this.state = 218;
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
			this.state = 220;
			_la = this._input.LA(1);
			if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 65024) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & 7) !== 0))) {
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
			this.state = 222;
			this.match(FmlMappingParser.T__15);
			this.state = 223;
			this.url();
			this.state = 226;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===17) {
				{
				this.state = 224;
				this.match(FmlMappingParser.T__16);
				this.state = 225;
				this.identifier();
				}
			}

			this.state = 228;
			this.match(FmlMappingParser.T__8);
			this.state = 229;
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
			this.state = 231;
			this.match(FmlMappingParser.T__17);
			this.state = 232;
			this.match(FmlMappingParser.ID);
			this.state = 233;
			this.match(FmlMappingParser.T__4);
			this.state = 234;
			this.fpExpression(0);
			this.state = 235;
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
	public groupDeclaration(): GroupDeclarationContext {
		let localctx: GroupDeclarationContext = new GroupDeclarationContext(this, this._ctx, this.state);
		this.enterRule(localctx, 28, FmlMappingParser.RULE_groupDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 237;
			this.match(FmlMappingParser.T__19);
			this.state = 238;
			this.match(FmlMappingParser.ID);
			this.state = 239;
			this.parameters();
			this.state = 241;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===26) {
				{
				this.state = 240;
				this.extends_();
				}
			}

			this.state = 244;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===24) {
				{
				this.state = 243;
				this.typeMode();
				}
			}

			this.state = 246;
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
			this.state = 248;
			this.match(FmlMappingParser.T__20);
			this.state = 249;
			this.parameter();
			this.state = 252;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 250;
				this.match(FmlMappingParser.T__21);
				this.state = 251;
				this.parameter();
				}
				}
				this.state = 254;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la===22);
			this.state = 256;
			this.match(FmlMappingParser.T__22);
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
			this.state = 258;
			this.parameterMode();
			this.state = 259;
			this.match(FmlMappingParser.ID);
			this.state = 261;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===7) {
				{
				this.state = 260;
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
			this.state = 263;
			this.match(FmlMappingParser.T__1);
			this.state = 267;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3289904912) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 127) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & 7) !== 0)) {
				{
				{
				this.state = 264;
				this.mapRule();
				}
				}
				this.state = 269;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 270;
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
			this.state = 272;
			this.match(FmlMappingParser.T__23);
			this.state = 273;
			this.groupTypeMode();
			this.state = 274;
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
			this.state = 276;
			this.match(FmlMappingParser.T__25);
			this.state = 277;
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
			this.state = 279;
			this.match(FmlMappingParser.T__6);
			this.state = 280;
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
			this.state = 303;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 19, this._ctx) ) {
			case 1:
				localctx = new MapSimpleBatchIdentityContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 282;
				this.qualifiedIdentifier();
				this.state = 283;
				this.match(FmlMappingParser.T__26);
				this.state = 284;
				this.qualifiedIdentifier();
				this.state = 285;
				this.match(FmlMappingParser.T__6);
				this.state = 286;
				this.identityFieldList();
				this.state = 288;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===101) {
					{
					this.state = 287;
					this.ruleName();
					}
				}

				this.state = 290;
				this.match(FmlMappingParser.T__18);
				}
				break;
			case 2:
				localctx = new MapSimpleCopyContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 292;
				this.qualifiedIdentifier();
				this.state = 293;
				this.match(FmlMappingParser.T__26);
				this.state = 294;
				this.qualifiedIdentifier();
				this.state = 296;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===101) {
					{
					this.state = 295;
					this.ruleName();
					}
				}

				this.state = 298;
				this.match(FmlMappingParser.T__18);
				}
				break;
			case 3:
				localctx = new MapFhirMarkupContext(this, localctx);
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 300;
				this.mapTransformationRule();
				this.state = 301;
				this.match(FmlMappingParser.T__18);
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
			this.state = 305;
			this.ruleSources();
			this.state = 308;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===27) {
				{
				this.state = 306;
				this.match(FmlMappingParser.T__26);
				this.state = 307;
				this.ruleTargets();
				}
			}

			this.state = 311;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===42) {
				{
				this.state = 310;
				this.dependentExpression();
				}
			}

			this.state = 314;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===101) {
				{
				this.state = 313;
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
	public identityFieldList(): IdentityFieldListContext {
		let localctx: IdentityFieldListContext = new IdentityFieldListContext(this, this._ctx, this.state);
		this.enterRule(localctx, 46, FmlMappingParser.RULE_identityFieldList);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 316;
			this.identifier();
			this.state = 321;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===22) {
				{
				{
				this.state = 317;
				this.match(FmlMappingParser.T__21);
				this.state = 318;
				this.identifier();
				}
				}
				this.state = 323;
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
	public ruleName(): RuleNameContext {
		let localctx: RuleNameContext = new RuleNameContext(this, this._ctx, this.state);
		this.enterRule(localctx, 48, FmlMappingParser.RULE_ruleName);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 324;
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
		this.enterRule(localctx, 50, FmlMappingParser.RULE_ruleSources);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 326;
			this.ruleSource();
			this.state = 331;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===22) {
				{
				{
				this.state = 327;
				this.match(FmlMappingParser.T__21);
				this.state = 328;
				this.ruleSource();
				}
				}
				this.state = 333;
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
		this.enterRule(localctx, 52, FmlMappingParser.RULE_ruleSource);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 334;
			this.qualifiedIdentifier();
			this.state = 336;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===7) {
				{
				this.state = 335;
				this.typeIdentifier();
				}
			}

			this.state = 339;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===96) {
				{
				this.state = 338;
				this.sourceCardinality();
				}
			}

			this.state = 342;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===40) {
				{
				this.state = 341;
				this.sourceDefault();
				}
			}

			this.state = 345;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & 1879048195) !== 0)) {
				{
				this.state = 344;
				this.sourceListMode();
				}
			}

			this.state = 348;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===9) {
				{
				this.state = 347;
				this.alias();
				}
			}

			this.state = 351;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===34) {
				{
				this.state = 350;
				this.whereClause();
				}
			}

			this.state = 354;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===35) {
				{
				this.state = 353;
				this.checkClause();
				}
			}

			this.state = 357;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===41) {
				{
				this.state = 356;
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
		this.enterRule(localctx, 54, FmlMappingParser.RULE_ruleTargets);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 359;
			this.ruleTarget();
			this.state = 364;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===22) {
				{
				{
				this.state = 360;
				this.match(FmlMappingParser.T__21);
				this.state = 361;
				this.ruleTarget();
				}
				}
				this.state = 366;
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
		this.enterRule(localctx, 56, FmlMappingParser.RULE_ruleTarget);
		let _la: number;
		try {
			this.state = 391;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 40, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 367;
				this.qualifiedIdentifier();
				this.state = 370;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===5) {
					{
					this.state = 368;
					this.match(FmlMappingParser.T__4);
					this.state = 369;
					this.transform();
					}
				}

				this.state = 373;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===9) {
					{
					this.state = 372;
					this.alias();
					}
				}

				this.state = 376;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & 2147483651) !== 0) || _la===69) {
					{
					this.state = 375;
					this.targetListMode();
					}
				}

				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 378;
				this.match(FmlMappingParser.T__20);
				this.state = 379;
				this.fpExpression(0);
				this.state = 380;
				this.match(FmlMappingParser.T__22);
				this.state = 382;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===9) {
					{
					this.state = 381;
					this.alias();
					}
				}

				this.state = 385;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & 2147483651) !== 0) || _la===69) {
					{
					this.state = 384;
					this.targetListMode();
					}
				}

				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 387;
				this.groupInvocation();
				this.state = 389;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===9) {
					{
					this.state = 388;
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
		this.enterRule(localctx, 58, FmlMappingParser.RULE_sourceCardinality);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 393;
			this.match(FmlMappingParser.INTEGER);
			this.state = 394;
			this.match(FmlMappingParser.T__27);
			this.state = 395;
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
		this.enterRule(localctx, 60, FmlMappingParser.RULE_upperBound);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 397;
			_la = this._input.LA(1);
			if(!(_la===29 || _la===96)) {
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
		this.enterRule(localctx, 62, FmlMappingParser.RULE_qualifiedIdentifier);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 399;
			_la = this._input.LA(1);
			if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 3289904912) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 127) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & 7) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 404;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 41, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 400;
					this.match(FmlMappingParser.T__38);
					this.state = 401;
					_la = this._input.LA(1);
					if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 3289904912) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 127) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & 7) !== 0))) {
					this._errHandler.recoverInline(this);
					}
					else {
						this._errHandler.reportMatch(this);
					    this.consume();
					}
					}
					}
				}
				this.state = 406;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 41, this._ctx);
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
		this.enterRule(localctx, 64, FmlMappingParser.RULE_sourceDefault);
		try {
			this.state = 414;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 42, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 407;
				this.match(FmlMappingParser.T__39);
				this.state = 408;
				this.match(FmlMappingParser.T__20);
				this.state = 409;
				this.fpExpression(0);
				this.state = 410;
				this.match(FmlMappingParser.T__22);
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 412;
				this.match(FmlMappingParser.T__39);
				this.state = 413;
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
		this.enterRule(localctx, 66, FmlMappingParser.RULE_alias);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 416;
			this.match(FmlMappingParser.T__8);
			this.state = 417;
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
		this.enterRule(localctx, 68, FmlMappingParser.RULE_whereClause);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 419;
			this.match(FmlMappingParser.T__33);
			this.state = 420;
			this.match(FmlMappingParser.T__20);
			this.state = 421;
			this.fpExpression(0);
			this.state = 422;
			this.match(FmlMappingParser.T__22);
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
		this.enterRule(localctx, 70, FmlMappingParser.RULE_checkClause);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 424;
			this.match(FmlMappingParser.T__34);
			this.state = 425;
			this.match(FmlMappingParser.T__20);
			this.state = 426;
			this.fpExpression(0);
			this.state = 427;
			this.match(FmlMappingParser.T__22);
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
		this.enterRule(localctx, 72, FmlMappingParser.RULE_log);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 429;
			this.match(FmlMappingParser.T__40);
			this.state = 430;
			this.match(FmlMappingParser.T__20);
			this.state = 431;
			this.fpExpression(0);
			this.state = 432;
			this.match(FmlMappingParser.T__22);
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
		this.enterRule(localctx, 74, FmlMappingParser.RULE_dependentExpression);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 434;
			this.match(FmlMappingParser.T__41);
			this.state = 447;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 9:
			case 10:
			case 11:
			case 12:
			case 13:
			case 14:
			case 15:
			case 97:
			case 98:
			case 99:
				{
				this.state = 435;
				this.groupInvocation();
				this.state = 440;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===22) {
					{
					{
					this.state = 436;
					this.match(FmlMappingParser.T__21);
					this.state = 437;
					this.groupInvocation();
					}
					}
					this.state = 442;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 444;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===2) {
					{
					this.state = 443;
					this.mapRules();
					}
				}

				}
				break;
			case 2:
				{
				this.state = 446;
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
		this.enterRule(localctx, 76, FmlMappingParser.RULE_importDeclaration);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 449;
			this.match(FmlMappingParser.T__29);
			this.state = 450;
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
		this.enterRule(localctx, 78, FmlMappingParser.RULE_transform);
		try {
			this.state = 459;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 46, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 452;
				this.literal();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 453;
				this.qualifiedIdentifier();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 454;
				this.transformInvocation();
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 455;
				this.match(FmlMappingParser.T__20);
				this.state = 456;
				this.fpExpression(0);
				this.state = 457;
				this.match(FmlMappingParser.T__22);
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
	public transformInvocation(): TransformInvocationContext {
		let localctx: TransformInvocationContext = new TransformInvocationContext(this, this._ctx, this.state);
		this.enterRule(localctx, 80, FmlMappingParser.RULE_transformInvocation);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 461;
			this.identifier();
			this.state = 462;
			this.match(FmlMappingParser.T__20);
			this.state = 464;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 4)) & ~0x1F) === 0 && ((1 << (_la - 4)) & 4232282101) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & 503316999) !== 0) || ((((_la - 89)) & ~0x1F) === 0 && ((1 << (_la - 89)) & 8191) !== 0)) {
				{
				this.state = 463;
				this.transformParamList();
				}
			}

			this.state = 466;
			this.match(FmlMappingParser.T__22);
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
	public transformParamList(): TransformParamListContext {
		let localctx: TransformParamListContext = new TransformParamListContext(this, this._ctx, this.state);
		this.enterRule(localctx, 82, FmlMappingParser.RULE_transformParamList);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 468;
			this.transformParam();
			this.state = 473;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===22) {
				{
				{
				this.state = 469;
				this.match(FmlMappingParser.T__21);
				this.state = 470;
				this.transformParam();
				}
				}
				this.state = 475;
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
	public transformParam(): TransformParamContext {
		let localctx: TransformParamContext = new TransformParamContext(this, this._ctx, this.state);
		this.enterRule(localctx, 84, FmlMappingParser.RULE_transformParam);
		try {
			this.state = 481;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 49, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 476;
				this.transformParamName();
				this.state = 477;
				this.match(FmlMappingParser.T__6);
				this.state = 478;
				this.transformParamValue();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 480;
				this.transformParamValue();
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
	public transformParamName(): TransformParamNameContext {
		let localctx: TransformParamNameContext = new TransformParamNameContext(this, this._ctx, this.state);
		this.enterRule(localctx, 86, FmlMappingParser.RULE_transformParamName);
		try {
			this.state = 500;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 9:
			case 10:
			case 11:
			case 12:
			case 13:
			case 14:
			case 15:
			case 97:
			case 98:
			case 99:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 483;
				this.identifier();
				}
				break;
			case 30:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 484;
				this.match(FmlMappingParser.T__29);
				}
				break;
			case 31:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 485;
				this.match(FmlMappingParser.T__30);
				}
				break;
			case 32:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 486;
				this.match(FmlMappingParser.T__31);
				}
				break;
			case 20:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 487;
				this.match(FmlMappingParser.T__19);
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 488;
				this.match(FmlMappingParser.T__3);
				}
				break;
			case 8:
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 489;
				this.match(FmlMappingParser.T__7);
				}
				break;
			case 16:
				this.enterOuterAlt(localctx, 8);
				{
				this.state = 490;
				this.match(FmlMappingParser.T__15);
				}
				break;
			case 18:
				this.enterOuterAlt(localctx, 9);
				{
				this.state = 491;
				this.match(FmlMappingParser.T__17);
				}
				break;
			case 33:
				this.enterOuterAlt(localctx, 10);
				{
				this.state = 492;
				this.match(FmlMappingParser.T__32);
				}
				break;
			case 26:
				this.enterOuterAlt(localctx, 11);
				{
				this.state = 493;
				this.match(FmlMappingParser.T__25);
				}
				break;
			case 34:
				this.enterOuterAlt(localctx, 12);
				{
				this.state = 494;
				this.match(FmlMappingParser.T__33);
				}
				break;
			case 35:
				this.enterOuterAlt(localctx, 13);
				{
				this.state = 495;
				this.match(FmlMappingParser.T__34);
				}
				break;
			case 17:
				this.enterOuterAlt(localctx, 14);
				{
				this.state = 496;
				this.match(FmlMappingParser.T__16);
				}
				break;
			case 36:
				this.enterOuterAlt(localctx, 15);
				{
				this.state = 497;
				this.match(FmlMappingParser.T__35);
				}
				break;
			case 37:
				this.enterOuterAlt(localctx, 16);
				{
				this.state = 498;
				this.match(FmlMappingParser.T__36);
				}
				break;
			case 38:
				this.enterOuterAlt(localctx, 17);
				{
				this.state = 499;
				this.match(FmlMappingParser.T__37);
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
	public transformParamValue(): TransformParamValueContext {
		let localctx: TransformParamValueContext = new TransformParamValueContext(this, this._ctx, this.state);
		this.enterRule(localctx, 88, FmlMappingParser.RULE_transformParamValue);
		try {
			this.state = 505;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 51, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 502;
				this.literal();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 503;
				this.match(FmlMappingParser.ID);
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 504;
				this.fpExpression(0);
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
		this.enterRule(localctx, 90, FmlMappingParser.RULE_groupInvocation);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 507;
			this.identifier();
			this.state = 508;
			this.match(FmlMappingParser.T__20);
			this.state = 510;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 4)) & ~0x1F) === 0 && ((1 << (_la - 4)) & 4232282101) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & 503316999) !== 0) || ((((_la - 89)) & ~0x1F) === 0 && ((1 << (_la - 89)) & 8191) !== 0)) {
				{
				this.state = 509;
				this.groupParamList();
				}
			}

			this.state = 512;
			this.match(FmlMappingParser.T__22);
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
		this.enterRule(localctx, 92, FmlMappingParser.RULE_groupParamList);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 514;
			this.groupParam();
			this.state = 519;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===22) {
				{
				{
				this.state = 515;
				this.match(FmlMappingParser.T__21);
				this.state = 516;
				this.groupParam();
				}
				}
				this.state = 521;
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
		this.enterRule(localctx, 94, FmlMappingParser.RULE_groupParam);
		try {
			this.state = 525;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 54, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 522;
				this.literal();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 523;
				this.match(FmlMappingParser.ID);
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 524;
				this.fpExpression(0);
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
		let _startState: number = 96;
		this.enterRecursionRule(localctx, 96, FmlMappingParser.RULE_fpExpression, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 531;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 4:
			case 8:
			case 9:
			case 10:
			case 11:
			case 12:
			case 13:
			case 14:
			case 15:
			case 16:
			case 17:
			case 18:
			case 20:
			case 21:
			case 26:
			case 30:
			case 31:
			case 32:
			case 33:
			case 34:
			case 35:
			case 36:
			case 37:
			case 38:
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

				this.state = 528;
				this.fpTerm();
				}
				break;
			case 6:
			case 45:
				{
				localctx = new PolarityExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 529;
				_la = this._input.LA(1);
				if(!(_la===6 || _la===45)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 530;
				this.fpExpression(11);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 573;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 57, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 571;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 56, this._ctx) ) {
					case 1:
						{
						localctx = new MultiplicativeExpressionContext(this, new FpExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, FmlMappingParser.RULE_fpExpression);
						this.state = 533;
						if (!(this.precpred(this._ctx, 10))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 10)");
						}
						this.state = 534;
						_la = this._input.LA(1);
						if(!(((((_la - 29)) & ~0x1F) === 0 && ((1 << (_la - 29)) & 393345) !== 0))) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 535;
						this.fpExpression(11);
						}
						break;
					case 2:
						{
						localctx = new AdditiveExpressionContext(this, new FpExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, FmlMappingParser.RULE_fpExpression);
						this.state = 536;
						if (!(this.precpred(this._ctx, 9))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 9)");
						}
						this.state = 537;
						_la = this._input.LA(1);
						if(!(_la===6 || _la===45 || _la===48)) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 538;
						this.fpExpression(10);
						}
						break;
					case 3:
						{
						localctx = new UnionExpressionContext(this, new FpExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, FmlMappingParser.RULE_fpExpression);
						this.state = 539;
						if (!(this.precpred(this._ctx, 7))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 7)");
						}
						{
						this.state = 540;
						this.match(FmlMappingParser.T__48);
						}
						this.state = 541;
						this.fpExpression(8);
						}
						break;
					case 4:
						{
						localctx = new InequalityExpressionContext(this, new FpExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, FmlMappingParser.RULE_fpExpression);
						this.state = 542;
						if (!(this.precpred(this._ctx, 6))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 6)");
						}
						this.state = 543;
						_la = this._input.LA(1);
						if(!(((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 15) !== 0))) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 544;
						this.fpExpression(7);
						}
						break;
					case 5:
						{
						localctx = new EqualityExpressionContext(this, new FpExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, FmlMappingParser.RULE_fpExpression);
						this.state = 545;
						if (!(this.precpred(this._ctx, 5))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 5)");
						}
						this.state = 546;
						_la = this._input.LA(1);
						if(!(_la===5 || ((((_la - 54)) & ~0x1F) === 0 && ((1 << (_la - 54)) & 7) !== 0))) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 547;
						this.fpExpression(6);
						}
						break;
					case 6:
						{
						localctx = new MembershipExpressionContext(this, new FpExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, FmlMappingParser.RULE_fpExpression);
						this.state = 548;
						if (!(this.precpred(this._ctx, 4))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
						}
						this.state = 549;
						_la = this._input.LA(1);
						if(!(_la===10 || _la===11)) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 550;
						this.fpExpression(5);
						}
						break;
					case 7:
						{
						localctx = new AndExpressionContext(this, new FpExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, FmlMappingParser.RULE_fpExpression);
						this.state = 551;
						if (!(this.precpred(this._ctx, 3))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 3)");
						}
						{
						this.state = 552;
						this.match(FmlMappingParser.T__56);
						}
						this.state = 553;
						this.fpExpression(4);
						}
						break;
					case 8:
						{
						localctx = new OrExpressionContext(this, new FpExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, FmlMappingParser.RULE_fpExpression);
						this.state = 554;
						if (!(this.precpred(this._ctx, 2))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 2)");
						}
						this.state = 555;
						_la = this._input.LA(1);
						if(!(_la===58 || _la===59)) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 556;
						this.fpExpression(3);
						}
						break;
					case 9:
						{
						localctx = new ImpliesExpressionContext(this, new FpExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, FmlMappingParser.RULE_fpExpression);
						this.state = 557;
						if (!(this.precpred(this._ctx, 1))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
						}
						{
						this.state = 558;
						this.match(FmlMappingParser.T__59);
						}
						this.state = 559;
						this.fpExpression(2);
						}
						break;
					case 10:
						{
						localctx = new InvocationExpressionContext(this, new FpExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, FmlMappingParser.RULE_fpExpression);
						this.state = 560;
						if (!(this.precpred(this._ctx, 13))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 13)");
						}
						this.state = 561;
						this.match(FmlMappingParser.T__38);
						this.state = 562;
						this.fpInvocation();
						}
						break;
					case 11:
						{
						localctx = new IndexerExpressionContext(this, new FpExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, FmlMappingParser.RULE_fpExpression);
						this.state = 563;
						if (!(this.precpred(this._ctx, 12))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 12)");
						}
						this.state = 564;
						this.match(FmlMappingParser.T__42);
						this.state = 565;
						this.fpExpression(0);
						this.state = 566;
						this.match(FmlMappingParser.T__43);
						}
						break;
					case 12:
						{
						localctx = new TypeExpressionContext(this, new FpExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, FmlMappingParser.RULE_fpExpression);
						this.state = 568;
						if (!(this.precpred(this._ctx, 8))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 8)");
						}
						this.state = 569;
						_la = this._input.LA(1);
						if(!(_la===9 || _la===12)) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 570;
						this.fpTypeSpecifier();
						}
						break;
					}
					}
				}
				this.state = 575;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 57, this._ctx);
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
		this.enterRule(localctx, 98, FmlMappingParser.RULE_fpTerm);
		try {
			this.state = 583;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 4:
			case 8:
			case 9:
			case 10:
			case 11:
			case 12:
			case 13:
			case 14:
			case 15:
			case 16:
			case 17:
			case 18:
			case 20:
			case 26:
			case 30:
			case 31:
			case 32:
			case 33:
			case 34:
			case 35:
			case 36:
			case 37:
			case 38:
			case 61:
			case 62:
			case 63:
			case 97:
			case 98:
			case 99:
				localctx = new InvocationTermContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 576;
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
				this.state = 577;
				this.literal();
				}
				break;
			case 64:
				localctx = new ExternalConstantTermContext(this, localctx);
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 578;
				this.fpExternalConstant();
				}
				break;
			case 21:
				localctx = new ParenthesizedTermContext(this, localctx);
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 579;
				this.match(FmlMappingParser.T__20);
				this.state = 580;
				this.fpExpression(0);
				this.state = 581;
				this.match(FmlMappingParser.T__22);
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
		this.enterRule(localctx, 100, FmlMappingParser.RULE_fpInvocation);
		try {
			this.state = 590;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 59, this._ctx) ) {
			case 1:
				localctx = new FunctionInvocationContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 585;
				this.fpFunction();
				}
				break;
			case 2:
				localctx = new MemberInvocationContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 586;
				this.identifier();
				}
				break;
			case 3:
				localctx = new ThisInvocationContext(this, localctx);
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 587;
				this.match(FmlMappingParser.T__60);
				}
				break;
			case 4:
				localctx = new IndexInvocationContext(this, localctx);
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 588;
				this.match(FmlMappingParser.T__61);
				}
				break;
			case 5:
				localctx = new TotalInvocationContext(this, localctx);
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 589;
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
		this.enterRule(localctx, 102, FmlMappingParser.RULE_fpExternalConstant);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 592;
			this.match(FmlMappingParser.T__63);
			this.state = 595;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 9:
			case 10:
			case 11:
			case 12:
			case 13:
			case 14:
			case 15:
			case 97:
			case 98:
			case 99:
				{
				this.state = 593;
				this.identifier();
				}
				break;
			case 100:
				{
				this.state = 594;
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
		this.enterRule(localctx, 104, FmlMappingParser.RULE_fpFunction);
		let _la: number;
		try {
			this.state = 617;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 64, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 597;
				this.match(FmlMappingParser.T__14);
				this.state = 598;
				this.match(FmlMappingParser.T__20);
				this.state = 607;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 4)) & ~0x1F) === 0 && ((1 << (_la - 4)) & 4232282101) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & 503316999) !== 0) || ((((_la - 89)) & ~0x1F) === 0 && ((1 << (_la - 89)) & 8191) !== 0)) {
					{
					this.state = 599;
					this.fpSortArgument();
					this.state = 604;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la===22) {
						{
						{
						this.state = 600;
						this.match(FmlMappingParser.T__21);
						this.state = 601;
						this.fpSortArgument();
						}
						}
						this.state = 606;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					}
				}

				this.state = 609;
				this.match(FmlMappingParser.T__22);
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 610;
				this.qualifiedIdentifier();
				this.state = 611;
				this.match(FmlMappingParser.T__20);
				this.state = 613;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 4)) & ~0x1F) === 0 && ((1 << (_la - 4)) & 4232282101) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & 503316999) !== 0) || ((((_la - 89)) & ~0x1F) === 0 && ((1 << (_la - 89)) & 8191) !== 0)) {
					{
					this.state = 612;
					this.fpParamList();
					}
				}

				this.state = 615;
				this.match(FmlMappingParser.T__22);
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
		this.enterRule(localctx, 106, FmlMappingParser.RULE_fpSortArgument);
		let _la: number;
		try {
			localctx = new SortDirectionArgumentContext(this, localctx);
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 619;
			this.fpExpression(0);
			this.state = 621;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===13 || _la===14) {
				{
				this.state = 620;
				_la = this._input.LA(1);
				if(!(_la===13 || _la===14)) {
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
		this.enterRule(localctx, 108, FmlMappingParser.RULE_fpParamList);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 623;
			this.fpExpression(0);
			this.state = 628;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===22) {
				{
				{
				this.state = 624;
				this.match(FmlMappingParser.T__21);
				this.state = 625;
				this.fpExpression(0);
				}
				}
				this.state = 630;
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
		this.enterRule(localctx, 110, FmlMappingParser.RULE_fpTypeSpecifier);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 631;
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
		this.enterRule(localctx, 112, FmlMappingParser.RULE_constant);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 633;
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
		this.enterRule(localctx, 114, FmlMappingParser.RULE_sourceListMode);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 635;
			_la = this._input.LA(1);
			if(!(((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & 1879048195) !== 0))) {
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
		this.enterRule(localctx, 116, FmlMappingParser.RULE_targetListMode);
		try {
			this.state = 642;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 37:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 637;
				this.match(FmlMappingParser.T__36);
				}
				break;
			case 68:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 638;
				this.match(FmlMappingParser.T__67);
				this.state = 639;
				this.match(FmlMappingParser.ID);
				}
				break;
			case 38:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 640;
				this.match(FmlMappingParser.T__37);
				}
				break;
			case 69:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 641;
				this.match(FmlMappingParser.T__68);
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
	public groupTypeMode(): GroupTypeModeContext {
		let localctx: GroupTypeModeContext = new GroupTypeModeContext(this, this._ctx, this.state);
		this.enterRule(localctx, 118, FmlMappingParser.RULE_groupTypeMode);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 644;
			_la = this._input.LA(1);
			if(!(_la===33 || _la===70)) {
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
		this.enterRule(localctx, 120, FmlMappingParser.RULE_modelMode);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 646;
			_la = this._input.LA(1);
			if(!(_la===31 || _la===32 || _la===71 || _la===72)) {
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
		this.enterRule(localctx, 122, FmlMappingParser.RULE_parameterMode);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 648;
			_la = this._input.LA(1);
			if(!(_la===31 || _la===32)) {
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
		this.enterRule(localctx, 124, FmlMappingParser.RULE_literal);
		let _la: number;
		try {
			this.state = 660;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 68, this._ctx) ) {
			case 1:
				localctx = new NullLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 650;
				this.match(FmlMappingParser.NULL_LITERAL);
				}
				break;
			case 2:
				localctx = new BooleanLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 651;
				this.match(FmlMappingParser.BOOL);
				}
				break;
			case 3:
				localctx = new QuantityLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 652;
				this.fpQuantity();
				}
				break;
			case 4:
				localctx = new LongNumberLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 653;
				this.match(FmlMappingParser.LONGNUMBER);
				}
				break;
			case 5:
				localctx = new NumberLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 654;
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
				this.state = 655;
				this.match(FmlMappingParser.DATE);
				}
				break;
			case 7:
				localctx = new DateTimeLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 656;
				this.match(FmlMappingParser.DATETIME);
				}
				break;
			case 8:
				localctx = new TimeLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 8);
				{
				this.state = 657;
				this.match(FmlMappingParser.TIME);
				}
				break;
			case 9:
				localctx = new StringLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 9);
				{
				this.state = 658;
				this.match(FmlMappingParser.STRING);
				}
				break;
			case 10:
				localctx = new QuotedStringLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 10);
				{
				this.state = 659;
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
		this.enterRule(localctx, 126, FmlMappingParser.RULE_fpQuantity);
		let _la: number;
		try {
			this.state = 668;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 69, this._ctx) ) {
			case 1:
				localctx = new QuantityWithDateContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 662;
				_la = this._input.LA(1);
				if(!(_la===95 || _la===96)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 663;
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
				this.state = 664;
				_la = this._input.LA(1);
				if(!(_la===95 || _la===96)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 665;
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
				this.state = 666;
				_la = this._input.LA(1);
				if(!(_la===95 || _la===96)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 667;
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
		case 48:
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

	public static readonly _serializedATN: number[] = [4,1,106,671,2,0,7,0,
	2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,
	2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,
	17,7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,
	7,24,2,25,7,25,2,26,7,26,2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,
	31,2,32,7,32,2,33,7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,
	2,39,7,39,2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,45,2,
	46,7,46,2,47,7,47,2,48,7,48,2,49,7,49,2,50,7,50,2,51,7,51,2,52,7,52,2,53,
	7,53,2,54,7,54,2,55,7,55,2,56,7,56,2,57,7,57,2,58,7,58,2,59,7,59,2,60,7,
	60,2,61,7,61,2,62,7,62,2,63,7,63,1,0,5,0,130,8,0,10,0,12,0,133,9,0,1,0,
	5,0,136,8,0,10,0,12,0,139,9,0,1,0,3,0,142,8,0,1,0,5,0,145,8,0,10,0,12,0,
	148,9,0,1,0,5,0,151,8,0,10,0,12,0,154,9,0,1,0,5,0,157,8,0,10,0,12,0,160,
	9,0,1,0,4,0,163,8,0,11,0,12,0,164,1,0,1,0,1,1,1,1,1,1,1,1,4,1,173,8,1,11,
	1,12,1,174,1,1,4,1,178,8,1,11,1,12,1,179,1,1,1,1,1,2,1,2,1,2,1,2,1,2,1,
	3,1,3,1,3,1,3,1,4,1,4,1,4,1,4,1,5,1,5,1,5,1,5,1,6,1,6,1,7,1,7,1,7,1,7,1,
	7,3,7,208,8,7,1,8,1,8,1,8,1,8,1,8,3,8,215,8,8,1,9,1,9,1,10,1,10,1,11,1,
	11,1,12,1,12,1,12,1,12,3,12,227,8,12,1,12,1,12,1,12,1,13,1,13,1,13,1,13,
	1,13,1,13,1,14,1,14,1,14,1,14,3,14,242,8,14,1,14,3,14,245,8,14,1,14,1,14,
	1,15,1,15,1,15,1,15,4,15,253,8,15,11,15,12,15,254,1,15,1,15,1,16,1,16,1,
	16,3,16,262,8,16,1,17,1,17,5,17,266,8,17,10,17,12,17,269,9,17,1,17,1,17,
	1,18,1,18,1,18,1,18,1,19,1,19,1,19,1,20,1,20,1,20,1,21,1,21,1,21,1,21,1,
	21,1,21,3,21,289,8,21,1,21,1,21,1,21,1,21,1,21,1,21,3,21,297,8,21,1,21,
	1,21,1,21,1,21,1,21,3,21,304,8,21,1,22,1,22,1,22,3,22,309,8,22,1,22,3,22,
	312,8,22,1,22,3,22,315,8,22,1,23,1,23,1,23,5,23,320,8,23,10,23,12,23,323,
	9,23,1,24,1,24,1,25,1,25,1,25,5,25,330,8,25,10,25,12,25,333,9,25,1,26,1,
	26,3,26,337,8,26,1,26,3,26,340,8,26,1,26,3,26,343,8,26,1,26,3,26,346,8,
	26,1,26,3,26,349,8,26,1,26,3,26,352,8,26,1,26,3,26,355,8,26,1,26,3,26,358,
	8,26,1,27,1,27,1,27,5,27,363,8,27,10,27,12,27,366,9,27,1,28,1,28,1,28,3,
	28,371,8,28,1,28,3,28,374,8,28,1,28,3,28,377,8,28,1,28,1,28,1,28,1,28,3,
	28,383,8,28,1,28,3,28,386,8,28,1,28,1,28,3,28,390,8,28,3,28,392,8,28,1,
	29,1,29,1,29,1,29,1,30,1,30,1,31,1,31,1,31,5,31,403,8,31,10,31,12,31,406,
	9,31,1,32,1,32,1,32,1,32,1,32,1,32,1,32,3,32,415,8,32,1,33,1,33,1,33,1,
	34,1,34,1,34,1,34,1,34,1,35,1,35,1,35,1,35,1,35,1,36,1,36,1,36,1,36,1,36,
	1,37,1,37,1,37,1,37,5,37,439,8,37,10,37,12,37,442,9,37,1,37,3,37,445,8,
	37,1,37,3,37,448,8,37,1,38,1,38,1,38,1,39,1,39,1,39,1,39,1,39,1,39,1,39,
	3,39,460,8,39,1,40,1,40,1,40,3,40,465,8,40,1,40,1,40,1,41,1,41,1,41,5,41,
	472,8,41,10,41,12,41,475,9,41,1,42,1,42,1,42,1,42,1,42,3,42,482,8,42,1,
	43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,
	1,43,1,43,3,43,501,8,43,1,44,1,44,1,44,3,44,506,8,44,1,45,1,45,1,45,3,45,
	511,8,45,1,45,1,45,1,46,1,46,1,46,5,46,518,8,46,10,46,12,46,521,9,46,1,
	47,1,47,1,47,3,47,526,8,47,1,48,1,48,1,48,1,48,3,48,532,8,48,1,48,1,48,
	1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,
	48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,
	1,48,1,48,1,48,1,48,1,48,1,48,1,48,5,48,572,8,48,10,48,12,48,575,9,48,1,
	49,1,49,1,49,1,49,1,49,1,49,1,49,3,49,584,8,49,1,50,1,50,1,50,1,50,1,50,
	3,50,591,8,50,1,51,1,51,1,51,3,51,596,8,51,1,52,1,52,1,52,1,52,1,52,5,52,
	603,8,52,10,52,12,52,606,9,52,3,52,608,8,52,1,52,1,52,1,52,1,52,3,52,614,
	8,52,1,52,1,52,3,52,618,8,52,1,53,1,53,3,53,622,8,53,1,54,1,54,1,54,5,54,
	627,8,54,10,54,12,54,630,9,54,1,55,1,55,1,56,1,56,1,57,1,57,1,58,1,58,1,
	58,1,58,1,58,3,58,643,8,58,1,59,1,59,1,60,1,60,1,61,1,61,1,62,1,62,1,62,
	1,62,1,62,1,62,1,62,1,62,1,62,1,62,3,62,661,8,62,1,63,1,63,1,63,1,63,1,
	63,1,63,3,63,669,8,63,1,63,5,131,137,146,152,158,1,96,64,0,2,4,6,8,10,12,
	14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,
	62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,98,100,102,104,106,
	108,110,112,114,116,118,120,122,124,126,0,21,2,0,97,97,100,101,1,0,100,
	101,2,0,9,15,97,99,2,0,29,29,96,96,7,0,4,4,8,10,12,18,20,20,26,26,30,38,
	97,99,2,0,6,6,45,45,3,0,29,29,36,36,46,47,3,0,6,6,45,45,48,48,1,0,50,53,
	2,0,5,5,54,56,1,0,10,11,1,0,58,59,2,0,9,9,12,12,1,0,13,14,2,0,37,38,65,
	67,2,0,33,33,70,70,2,0,31,32,71,72,1,0,31,32,1,0,95,96,1,0,73,80,1,0,81,
	88,724,0,131,1,0,0,0,2,168,1,0,0,0,4,183,1,0,0,0,6,188,1,0,0,0,8,192,1,
	0,0,0,10,196,1,0,0,0,12,200,1,0,0,0,14,202,1,0,0,0,16,209,1,0,0,0,18,216,
	1,0,0,0,20,218,1,0,0,0,22,220,1,0,0,0,24,222,1,0,0,0,26,231,1,0,0,0,28,
	237,1,0,0,0,30,248,1,0,0,0,32,258,1,0,0,0,34,263,1,0,0,0,36,272,1,0,0,0,
	38,276,1,0,0,0,40,279,1,0,0,0,42,303,1,0,0,0,44,305,1,0,0,0,46,316,1,0,
	0,0,48,324,1,0,0,0,50,326,1,0,0,0,52,334,1,0,0,0,54,359,1,0,0,0,56,391,
	1,0,0,0,58,393,1,0,0,0,60,397,1,0,0,0,62,399,1,0,0,0,64,414,1,0,0,0,66,
	416,1,0,0,0,68,419,1,0,0,0,70,424,1,0,0,0,72,429,1,0,0,0,74,434,1,0,0,0,
	76,449,1,0,0,0,78,459,1,0,0,0,80,461,1,0,0,0,82,468,1,0,0,0,84,481,1,0,
	0,0,86,500,1,0,0,0,88,505,1,0,0,0,90,507,1,0,0,0,92,514,1,0,0,0,94,525,
	1,0,0,0,96,531,1,0,0,0,98,583,1,0,0,0,100,590,1,0,0,0,102,592,1,0,0,0,104,
	617,1,0,0,0,106,619,1,0,0,0,108,623,1,0,0,0,110,631,1,0,0,0,112,633,1,0,
	0,0,114,635,1,0,0,0,116,642,1,0,0,0,118,644,1,0,0,0,120,646,1,0,0,0,122,
	648,1,0,0,0,124,660,1,0,0,0,126,668,1,0,0,0,128,130,3,16,8,0,129,128,1,
	0,0,0,130,133,1,0,0,0,131,132,1,0,0,0,131,129,1,0,0,0,132,137,1,0,0,0,133,
	131,1,0,0,0,134,136,3,2,1,0,135,134,1,0,0,0,136,139,1,0,0,0,137,138,1,0,
	0,0,137,135,1,0,0,0,138,141,1,0,0,0,139,137,1,0,0,0,140,142,3,14,7,0,141,
	140,1,0,0,0,141,142,1,0,0,0,142,146,1,0,0,0,143,145,3,24,12,0,144,143,1,
	0,0,0,145,148,1,0,0,0,146,147,1,0,0,0,146,144,1,0,0,0,147,152,1,0,0,0,148,
	146,1,0,0,0,149,151,3,76,38,0,150,149,1,0,0,0,151,154,1,0,0,0,152,153,1,
	0,0,0,152,150,1,0,0,0,153,158,1,0,0,0,154,152,1,0,0,0,155,157,3,26,13,0,
	156,155,1,0,0,0,157,160,1,0,0,0,158,159,1,0,0,0,158,156,1,0,0,0,159,162,
	1,0,0,0,160,158,1,0,0,0,161,163,3,28,14,0,162,161,1,0,0,0,163,164,1,0,0,
	0,164,162,1,0,0,0,164,165,1,0,0,0,165,166,1,0,0,0,166,167,5,0,0,1,167,1,
	1,0,0,0,168,169,5,1,0,0,169,170,3,20,10,0,170,172,5,2,0,0,171,173,3,4,2,
	0,172,171,1,0,0,0,173,174,1,0,0,0,174,172,1,0,0,0,174,175,1,0,0,0,175,177,
	1,0,0,0,176,178,3,6,3,0,177,176,1,0,0,0,178,179,1,0,0,0,179,177,1,0,0,0,
	179,180,1,0,0,0,180,181,1,0,0,0,181,182,5,3,0,0,182,3,1,0,0,0,183,184,5,
	4,0,0,184,185,5,97,0,0,185,186,5,5,0,0,186,187,3,20,10,0,187,5,1,0,0,0,
	188,189,3,8,4,0,189,190,5,6,0,0,190,191,3,10,5,0,191,7,1,0,0,0,192,193,
	5,97,0,0,193,194,5,7,0,0,194,195,3,12,6,0,195,9,1,0,0,0,196,197,5,97,0,
	0,197,198,5,7,0,0,198,199,3,12,6,0,199,11,1,0,0,0,200,201,7,0,0,0,201,13,
	1,0,0,0,202,203,5,8,0,0,203,204,3,20,10,0,204,207,5,5,0,0,205,208,3,22,
	11,0,206,208,5,101,0,0,207,205,1,0,0,0,207,206,1,0,0,0,208,15,1,0,0,0,209,
	210,5,105,0,0,210,211,3,62,31,0,211,214,5,5,0,0,212,215,3,124,62,0,213,
	215,3,18,9,0,214,212,1,0,0,0,214,213,1,0,0,0,214,215,1,0,0,0,215,17,1,0,
	0,0,216,217,5,102,0,0,217,19,1,0,0,0,218,219,7,1,0,0,219,21,1,0,0,0,220,
	221,7,2,0,0,221,23,1,0,0,0,222,223,5,16,0,0,223,226,3,20,10,0,224,225,5,
	17,0,0,225,227,3,22,11,0,226,224,1,0,0,0,226,227,1,0,0,0,227,228,1,0,0,
	0,228,229,5,9,0,0,229,230,3,120,60,0,230,25,1,0,0,0,231,232,5,18,0,0,232,
	233,5,97,0,0,233,234,5,5,0,0,234,235,3,96,48,0,235,236,5,19,0,0,236,27,
	1,0,0,0,237,238,5,20,0,0,238,239,5,97,0,0,239,241,3,30,15,0,240,242,3,38,
	19,0,241,240,1,0,0,0,241,242,1,0,0,0,242,244,1,0,0,0,243,245,3,36,18,0,
	244,243,1,0,0,0,244,245,1,0,0,0,245,246,1,0,0,0,246,247,3,34,17,0,247,29,
	1,0,0,0,248,249,5,21,0,0,249,252,3,32,16,0,250,251,5,22,0,0,251,253,3,32,
	16,0,252,250,1,0,0,0,253,254,1,0,0,0,254,252,1,0,0,0,254,255,1,0,0,0,255,
	256,1,0,0,0,256,257,5,23,0,0,257,31,1,0,0,0,258,259,3,122,61,0,259,261,
	5,97,0,0,260,262,3,40,20,0,261,260,1,0,0,0,261,262,1,0,0,0,262,33,1,0,0,
	0,263,267,5,2,0,0,264,266,3,42,21,0,265,264,1,0,0,0,266,269,1,0,0,0,267,
	265,1,0,0,0,267,268,1,0,0,0,268,270,1,0,0,0,269,267,1,0,0,0,270,271,5,3,
	0,0,271,35,1,0,0,0,272,273,5,24,0,0,273,274,3,118,59,0,274,275,5,25,0,0,
	275,37,1,0,0,0,276,277,5,26,0,0,277,278,5,97,0,0,278,39,1,0,0,0,279,280,
	5,7,0,0,280,281,3,22,11,0,281,41,1,0,0,0,282,283,3,62,31,0,283,284,5,27,
	0,0,284,285,3,62,31,0,285,286,5,7,0,0,286,288,3,46,23,0,287,289,3,48,24,
	0,288,287,1,0,0,0,288,289,1,0,0,0,289,290,1,0,0,0,290,291,5,19,0,0,291,
	304,1,0,0,0,292,293,3,62,31,0,293,294,5,27,0,0,294,296,3,62,31,0,295,297,
	3,48,24,0,296,295,1,0,0,0,296,297,1,0,0,0,297,298,1,0,0,0,298,299,5,19,
	0,0,299,304,1,0,0,0,300,301,3,44,22,0,301,302,5,19,0,0,302,304,1,0,0,0,
	303,282,1,0,0,0,303,292,1,0,0,0,303,300,1,0,0,0,304,43,1,0,0,0,305,308,
	3,50,25,0,306,307,5,27,0,0,307,309,3,54,27,0,308,306,1,0,0,0,308,309,1,
	0,0,0,309,311,1,0,0,0,310,312,3,74,37,0,311,310,1,0,0,0,311,312,1,0,0,0,
	312,314,1,0,0,0,313,315,3,48,24,0,314,313,1,0,0,0,314,315,1,0,0,0,315,45,
	1,0,0,0,316,321,3,22,11,0,317,318,5,22,0,0,318,320,3,22,11,0,319,317,1,
	0,0,0,320,323,1,0,0,0,321,319,1,0,0,0,321,322,1,0,0,0,322,47,1,0,0,0,323,
	321,1,0,0,0,324,325,5,101,0,0,325,49,1,0,0,0,326,331,3,52,26,0,327,328,
	5,22,0,0,328,330,3,52,26,0,329,327,1,0,0,0,330,333,1,0,0,0,331,329,1,0,
	0,0,331,332,1,0,0,0,332,51,1,0,0,0,333,331,1,0,0,0,334,336,3,62,31,0,335,
	337,3,40,20,0,336,335,1,0,0,0,336,337,1,0,0,0,337,339,1,0,0,0,338,340,3,
	58,29,0,339,338,1,0,0,0,339,340,1,0,0,0,340,342,1,0,0,0,341,343,3,64,32,
	0,342,341,1,0,0,0,342,343,1,0,0,0,343,345,1,0,0,0,344,346,3,114,57,0,345,
	344,1,0,0,0,345,346,1,0,0,0,346,348,1,0,0,0,347,349,3,66,33,0,348,347,1,
	0,0,0,348,349,1,0,0,0,349,351,1,0,0,0,350,352,3,68,34,0,351,350,1,0,0,0,
	351,352,1,0,0,0,352,354,1,0,0,0,353,355,3,70,35,0,354,353,1,0,0,0,354,355,
	1,0,0,0,355,357,1,0,0,0,356,358,3,72,36,0,357,356,1,0,0,0,357,358,1,0,0,
	0,358,53,1,0,0,0,359,364,3,56,28,0,360,361,5,22,0,0,361,363,3,56,28,0,362,
	360,1,0,0,0,363,366,1,0,0,0,364,362,1,0,0,0,364,365,1,0,0,0,365,55,1,0,
	0,0,366,364,1,0,0,0,367,370,3,62,31,0,368,369,5,5,0,0,369,371,3,78,39,0,
	370,368,1,0,0,0,370,371,1,0,0,0,371,373,1,0,0,0,372,374,3,66,33,0,373,372,
	1,0,0,0,373,374,1,0,0,0,374,376,1,0,0,0,375,377,3,116,58,0,376,375,1,0,
	0,0,376,377,1,0,0,0,377,392,1,0,0,0,378,379,5,21,0,0,379,380,3,96,48,0,
	380,382,5,23,0,0,381,383,3,66,33,0,382,381,1,0,0,0,382,383,1,0,0,0,383,
	385,1,0,0,0,384,386,3,116,58,0,385,384,1,0,0,0,385,386,1,0,0,0,386,392,
	1,0,0,0,387,389,3,90,45,0,388,390,3,66,33,0,389,388,1,0,0,0,389,390,1,0,
	0,0,390,392,1,0,0,0,391,367,1,0,0,0,391,378,1,0,0,0,391,387,1,0,0,0,392,
	57,1,0,0,0,393,394,5,96,0,0,394,395,5,28,0,0,395,396,3,60,30,0,396,59,1,
	0,0,0,397,398,7,3,0,0,398,61,1,0,0,0,399,404,7,4,0,0,400,401,5,39,0,0,401,
	403,7,4,0,0,402,400,1,0,0,0,403,406,1,0,0,0,404,402,1,0,0,0,404,405,1,0,
	0,0,405,63,1,0,0,0,406,404,1,0,0,0,407,408,5,40,0,0,408,409,5,21,0,0,409,
	410,3,96,48,0,410,411,5,23,0,0,411,415,1,0,0,0,412,413,5,40,0,0,413,415,
	5,101,0,0,414,407,1,0,0,0,414,412,1,0,0,0,415,65,1,0,0,0,416,417,5,9,0,
	0,417,418,3,22,11,0,418,67,1,0,0,0,419,420,5,34,0,0,420,421,5,21,0,0,421,
	422,3,96,48,0,422,423,5,23,0,0,423,69,1,0,0,0,424,425,5,35,0,0,425,426,
	5,21,0,0,426,427,3,96,48,0,427,428,5,23,0,0,428,71,1,0,0,0,429,430,5,41,
	0,0,430,431,5,21,0,0,431,432,3,96,48,0,432,433,5,23,0,0,433,73,1,0,0,0,
	434,447,5,42,0,0,435,440,3,90,45,0,436,437,5,22,0,0,437,439,3,90,45,0,438,
	436,1,0,0,0,439,442,1,0,0,0,440,438,1,0,0,0,440,441,1,0,0,0,441,444,1,0,
	0,0,442,440,1,0,0,0,443,445,3,34,17,0,444,443,1,0,0,0,444,445,1,0,0,0,445,
	448,1,0,0,0,446,448,3,34,17,0,447,435,1,0,0,0,447,446,1,0,0,0,448,75,1,
	0,0,0,449,450,5,30,0,0,450,451,3,20,10,0,451,77,1,0,0,0,452,460,3,124,62,
	0,453,460,3,62,31,0,454,460,3,80,40,0,455,456,5,21,0,0,456,457,3,96,48,
	0,457,458,5,23,0,0,458,460,1,0,0,0,459,452,1,0,0,0,459,453,1,0,0,0,459,
	454,1,0,0,0,459,455,1,0,0,0,460,79,1,0,0,0,461,462,3,22,11,0,462,464,5,
	21,0,0,463,465,3,82,41,0,464,463,1,0,0,0,464,465,1,0,0,0,465,466,1,0,0,
	0,466,467,5,23,0,0,467,81,1,0,0,0,468,473,3,84,42,0,469,470,5,22,0,0,470,
	472,3,84,42,0,471,469,1,0,0,0,472,475,1,0,0,0,473,471,1,0,0,0,473,474,1,
	0,0,0,474,83,1,0,0,0,475,473,1,0,0,0,476,477,3,86,43,0,477,478,5,7,0,0,
	478,479,3,88,44,0,479,482,1,0,0,0,480,482,3,88,44,0,481,476,1,0,0,0,481,
	480,1,0,0,0,482,85,1,0,0,0,483,501,3,22,11,0,484,501,5,30,0,0,485,501,5,
	31,0,0,486,501,5,32,0,0,487,501,5,20,0,0,488,501,5,4,0,0,489,501,5,8,0,
	0,490,501,5,16,0,0,491,501,5,18,0,0,492,501,5,33,0,0,493,501,5,26,0,0,494,
	501,5,34,0,0,495,501,5,35,0,0,496,501,5,17,0,0,497,501,5,36,0,0,498,501,
	5,37,0,0,499,501,5,38,0,0,500,483,1,0,0,0,500,484,1,0,0,0,500,485,1,0,0,
	0,500,486,1,0,0,0,500,487,1,0,0,0,500,488,1,0,0,0,500,489,1,0,0,0,500,490,
	1,0,0,0,500,491,1,0,0,0,500,492,1,0,0,0,500,493,1,0,0,0,500,494,1,0,0,0,
	500,495,1,0,0,0,500,496,1,0,0,0,500,497,1,0,0,0,500,498,1,0,0,0,500,499,
	1,0,0,0,501,87,1,0,0,0,502,506,3,124,62,0,503,506,5,97,0,0,504,506,3,96,
	48,0,505,502,1,0,0,0,505,503,1,0,0,0,505,504,1,0,0,0,506,89,1,0,0,0,507,
	508,3,22,11,0,508,510,5,21,0,0,509,511,3,92,46,0,510,509,1,0,0,0,510,511,
	1,0,0,0,511,512,1,0,0,0,512,513,5,23,0,0,513,91,1,0,0,0,514,519,3,94,47,
	0,515,516,5,22,0,0,516,518,3,94,47,0,517,515,1,0,0,0,518,521,1,0,0,0,519,
	517,1,0,0,0,519,520,1,0,0,0,520,93,1,0,0,0,521,519,1,0,0,0,522,526,3,124,
	62,0,523,526,5,97,0,0,524,526,3,96,48,0,525,522,1,0,0,0,525,523,1,0,0,0,
	525,524,1,0,0,0,526,95,1,0,0,0,527,528,6,48,-1,0,528,532,3,98,49,0,529,
	530,7,5,0,0,530,532,3,96,48,11,531,527,1,0,0,0,531,529,1,0,0,0,532,573,
	1,0,0,0,533,534,10,10,0,0,534,535,7,6,0,0,535,572,3,96,48,11,536,537,10,
	9,0,0,537,538,7,7,0,0,538,572,3,96,48,10,539,540,10,7,0,0,540,541,5,49,
	0,0,541,572,3,96,48,8,542,543,10,6,0,0,543,544,7,8,0,0,544,572,3,96,48,
	7,545,546,10,5,0,0,546,547,7,9,0,0,547,572,3,96,48,6,548,549,10,4,0,0,549,
	550,7,10,0,0,550,572,3,96,48,5,551,552,10,3,0,0,552,553,5,57,0,0,553,572,
	3,96,48,4,554,555,10,2,0,0,555,556,7,11,0,0,556,572,3,96,48,3,557,558,10,
	1,0,0,558,559,5,60,0,0,559,572,3,96,48,2,560,561,10,13,0,0,561,562,5,39,
	0,0,562,572,3,100,50,0,563,564,10,12,0,0,564,565,5,43,0,0,565,566,3,96,
	48,0,566,567,5,44,0,0,567,572,1,0,0,0,568,569,10,8,0,0,569,570,7,12,0,0,
	570,572,3,110,55,0,571,533,1,0,0,0,571,536,1,0,0,0,571,539,1,0,0,0,571,
	542,1,0,0,0,571,545,1,0,0,0,571,548,1,0,0,0,571,551,1,0,0,0,571,554,1,0,
	0,0,571,557,1,0,0,0,571,560,1,0,0,0,571,563,1,0,0,0,571,568,1,0,0,0,572,
	575,1,0,0,0,573,571,1,0,0,0,573,574,1,0,0,0,574,97,1,0,0,0,575,573,1,0,
	0,0,576,584,3,100,50,0,577,584,3,124,62,0,578,584,3,102,51,0,579,580,5,
	21,0,0,580,581,3,96,48,0,581,582,5,23,0,0,582,584,1,0,0,0,583,576,1,0,0,
	0,583,577,1,0,0,0,583,578,1,0,0,0,583,579,1,0,0,0,584,99,1,0,0,0,585,591,
	3,104,52,0,586,591,3,22,11,0,587,591,5,61,0,0,588,591,5,62,0,0,589,591,
	5,63,0,0,590,585,1,0,0,0,590,586,1,0,0,0,590,587,1,0,0,0,590,588,1,0,0,
	0,590,589,1,0,0,0,591,101,1,0,0,0,592,595,5,64,0,0,593,596,3,22,11,0,594,
	596,5,100,0,0,595,593,1,0,0,0,595,594,1,0,0,0,596,103,1,0,0,0,597,598,5,
	15,0,0,598,607,5,21,0,0,599,604,3,106,53,0,600,601,5,22,0,0,601,603,3,106,
	53,0,602,600,1,0,0,0,603,606,1,0,0,0,604,602,1,0,0,0,604,605,1,0,0,0,605,
	608,1,0,0,0,606,604,1,0,0,0,607,599,1,0,0,0,607,608,1,0,0,0,608,609,1,0,
	0,0,609,618,5,23,0,0,610,611,3,62,31,0,611,613,5,21,0,0,612,614,3,108,54,
	0,613,612,1,0,0,0,613,614,1,0,0,0,614,615,1,0,0,0,615,616,5,23,0,0,616,
	618,1,0,0,0,617,597,1,0,0,0,617,610,1,0,0,0,618,105,1,0,0,0,619,621,3,96,
	48,0,620,622,7,13,0,0,621,620,1,0,0,0,621,622,1,0,0,0,622,107,1,0,0,0,623,
	628,3,96,48,0,624,625,5,22,0,0,625,627,3,96,48,0,626,624,1,0,0,0,627,630,
	1,0,0,0,628,626,1,0,0,0,628,629,1,0,0,0,629,109,1,0,0,0,630,628,1,0,0,0,
	631,632,3,62,31,0,632,111,1,0,0,0,633,634,5,97,0,0,634,113,1,0,0,0,635,
	636,7,14,0,0,636,115,1,0,0,0,637,643,5,37,0,0,638,639,5,68,0,0,639,643,
	5,97,0,0,640,643,5,38,0,0,641,643,5,69,0,0,642,637,1,0,0,0,642,638,1,0,
	0,0,642,640,1,0,0,0,642,641,1,0,0,0,643,117,1,0,0,0,644,645,7,15,0,0,645,
	119,1,0,0,0,646,647,7,16,0,0,647,121,1,0,0,0,648,649,7,17,0,0,649,123,1,
	0,0,0,650,661,5,89,0,0,651,661,5,90,0,0,652,661,3,126,63,0,653,661,5,94,
	0,0,654,661,7,18,0,0,655,661,5,91,0,0,656,661,5,92,0,0,657,661,5,93,0,0,
	658,661,5,100,0,0,659,661,5,101,0,0,660,650,1,0,0,0,660,651,1,0,0,0,660,
	652,1,0,0,0,660,653,1,0,0,0,660,654,1,0,0,0,660,655,1,0,0,0,660,656,1,0,
	0,0,660,657,1,0,0,0,660,658,1,0,0,0,660,659,1,0,0,0,661,125,1,0,0,0,662,
	663,7,18,0,0,663,669,7,19,0,0,664,665,7,18,0,0,665,669,7,20,0,0,666,667,
	7,18,0,0,667,669,5,100,0,0,668,662,1,0,0,0,668,664,1,0,0,0,668,666,1,0,
	0,0,669,127,1,0,0,0,70,131,137,141,146,152,158,164,174,179,207,214,226,
	241,244,254,261,267,288,296,303,308,311,314,321,331,336,339,342,345,348,
	351,354,357,364,370,373,376,382,385,389,391,404,414,440,444,447,459,464,
	473,481,500,505,510,519,525,531,571,573,583,590,595,604,607,613,617,621,
	628,642,660,668];

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
	public DOUBLE_QUOTED_STRING(): TerminalNode {
		return this.getToken(FmlMappingParser.DOUBLE_QUOTED_STRING, 0);
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
export class MapSimpleBatchIdentityContext extends MapRuleContext {
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
	public identityFieldList(): IdentityFieldListContext {
		return this.getTypedRuleContext(IdentityFieldListContext, 0) as IdentityFieldListContext;
	}
	public ruleName(): RuleNameContext {
		return this.getTypedRuleContext(RuleNameContext, 0) as RuleNameContext;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterMapSimpleBatchIdentity) {
	 		listener.enterMapSimpleBatchIdentity(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitMapSimpleBatchIdentity) {
	 		listener.exitMapSimpleBatchIdentity(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitMapSimpleBatchIdentity) {
			return visitor.visitMapSimpleBatchIdentity(this);
		} else {
			return visitor.visitChildren(this);
		}
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


export class IdentityFieldListContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
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
    	return FmlMappingParser.RULE_identityFieldList;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterIdentityFieldList) {
	 		listener.enterIdentityFieldList(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitIdentityFieldList) {
	 		listener.exitIdentityFieldList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitIdentityFieldList) {
			return visitor.visitIdentityFieldList(this);
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
	public DELIMITEDIDENTIFIER_list(): TerminalNode[] {
	    	return this.getTokens(FmlMappingParser.DELIMITEDIDENTIFIER);
	}
	public DELIMITEDIDENTIFIER(i: number): TerminalNode {
		return this.getToken(FmlMappingParser.DELIMITEDIDENTIFIER, i);
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
	public transformInvocation(): TransformInvocationContext {
		return this.getTypedRuleContext(TransformInvocationContext, 0) as TransformInvocationContext;
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


export class TransformInvocationContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
	public transformParamList(): TransformParamListContext {
		return this.getTypedRuleContext(TransformParamListContext, 0) as TransformParamListContext;
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_transformInvocation;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterTransformInvocation) {
	 		listener.enterTransformInvocation(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitTransformInvocation) {
	 		listener.exitTransformInvocation(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitTransformInvocation) {
			return visitor.visitTransformInvocation(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TransformParamListContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public transformParam_list(): TransformParamContext[] {
		return this.getTypedRuleContexts(TransformParamContext) as TransformParamContext[];
	}
	public transformParam(i: number): TransformParamContext {
		return this.getTypedRuleContext(TransformParamContext, i) as TransformParamContext;
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_transformParamList;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterTransformParamList) {
	 		listener.enterTransformParamList(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitTransformParamList) {
	 		listener.exitTransformParamList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitTransformParamList) {
			return visitor.visitTransformParamList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TransformParamContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public transformParamName(): TransformParamNameContext {
		return this.getTypedRuleContext(TransformParamNameContext, 0) as TransformParamNameContext;
	}
	public transformParamValue(): TransformParamValueContext {
		return this.getTypedRuleContext(TransformParamValueContext, 0) as TransformParamValueContext;
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_transformParam;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterTransformParam) {
	 		listener.enterTransformParam(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitTransformParam) {
	 		listener.exitTransformParam(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitTransformParam) {
			return visitor.visitTransformParam(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TransformParamNameContext extends ParserRuleContext {
	constructor(parser?: FmlMappingParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_transformParamName;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterTransformParamName) {
	 		listener.enterTransformParamName(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitTransformParamName) {
	 		listener.exitTransformParamName(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitTransformParamName) {
			return visitor.visitTransformParamName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TransformParamValueContext extends ParserRuleContext {
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
	public fpExpression(): FpExpressionContext {
		return this.getTypedRuleContext(FpExpressionContext, 0) as FpExpressionContext;
	}
    public get ruleIndex(): number {
    	return FmlMappingParser.RULE_transformParamValue;
	}
	public enterRule(listener: FmlMappingListener): void {
	    if(listener.enterTransformParamValue) {
	 		listener.enterTransformParamValue(this);
		}
	}
	public exitRule(listener: FmlMappingListener): void {
	    if(listener.exitTransformParamValue) {
	 		listener.exitTransformParamValue(this);
		}
	}
	// @Override
	public accept<Result>(visitor: FmlMappingVisitor<Result>): Result {
		if (visitor.visitTransformParamValue) {
			return visitor.visitTransformParamValue(this);
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
	public fpExpression(): FpExpressionContext {
		return this.getTypedRuleContext(FpExpressionContext, 0) as FpExpressionContext;
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
	public ID(): TerminalNode {
		return this.getToken(FmlMappingParser.ID, 0);
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
