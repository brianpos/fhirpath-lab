// Generated from cql.g4 by ANTLR 4.13.2
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
import cqlListener from "./cqlListener.js";
import cqlVisitor from "./cqlVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;

export default class cqlParser extends Parser {
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
	public static readonly T__88 = 89;
	public static readonly T__89 = 90;
	public static readonly T__90 = 91;
	public static readonly T__91 = 92;
	public static readonly T__92 = 93;
	public static readonly T__93 = 94;
	public static readonly T__94 = 95;
	public static readonly T__95 = 96;
	public static readonly T__96 = 97;
	public static readonly T__97 = 98;
	public static readonly T__98 = 99;
	public static readonly T__99 = 100;
	public static readonly T__100 = 101;
	public static readonly T__101 = 102;
	public static readonly T__102 = 103;
	public static readonly T__103 = 104;
	public static readonly T__104 = 105;
	public static readonly T__105 = 106;
	public static readonly T__106 = 107;
	public static readonly T__107 = 108;
	public static readonly T__108 = 109;
	public static readonly T__109 = 110;
	public static readonly T__110 = 111;
	public static readonly T__111 = 112;
	public static readonly T__112 = 113;
	public static readonly T__113 = 114;
	public static readonly T__114 = 115;
	public static readonly T__115 = 116;
	public static readonly T__116 = 117;
	public static readonly T__117 = 118;
	public static readonly T__118 = 119;
	public static readonly T__119 = 120;
	public static readonly T__120 = 121;
	public static readonly T__121 = 122;
	public static readonly T__122 = 123;
	public static readonly T__123 = 124;
	public static readonly T__124 = 125;
	public static readonly T__125 = 126;
	public static readonly T__126 = 127;
	public static readonly T__127 = 128;
	public static readonly T__128 = 129;
	public static readonly T__129 = 130;
	public static readonly T__130 = 131;
	public static readonly T__131 = 132;
	public static readonly T__132 = 133;
	public static readonly T__133 = 134;
	public static readonly T__134 = 135;
	public static readonly T__135 = 136;
	public static readonly T__136 = 137;
	public static readonly T__137 = 138;
	public static readonly T__138 = 139;
	public static readonly T__139 = 140;
	public static readonly T__140 = 141;
	public static readonly T__141 = 142;
	public static readonly T__142 = 143;
	public static readonly T__143 = 144;
	public static readonly T__144 = 145;
	public static readonly T__145 = 146;
	public static readonly T__146 = 147;
	public static readonly T__147 = 148;
	public static readonly T__148 = 149;
	public static readonly T__149 = 150;
	public static readonly T__150 = 151;
	public static readonly T__151 = 152;
	public static readonly T__152 = 153;
	public static readonly T__153 = 154;
	public static readonly T__154 = 155;
	public static readonly T__155 = 156;
	public static readonly T__156 = 157;
	public static readonly T__157 = 158;
	public static readonly T__158 = 159;
	public static readonly T__159 = 160;
	public static readonly T__160 = 161;
	public static readonly T__161 = 162;
	public static readonly T__162 = 163;
	public static readonly T__163 = 164;
	public static readonly T__164 = 165;
	public static readonly T__165 = 166;
	public static readonly T__166 = 167;
	public static readonly T__167 = 168;
	public static readonly T__168 = 169;
	public static readonly T__169 = 170;
	public static readonly T__170 = 171;
	public static readonly T__171 = 172;
	public static readonly T__172 = 173;
	public static readonly QUOTEDIDENTIFIER = 174;
	public static readonly DATETIME = 175;
	public static readonly LONGNUMBER = 176;
	public static readonly DATE = 177;
	public static readonly TIME = 178;
	public static readonly IDENTIFIER = 179;
	public static readonly DELIMITEDIDENTIFIER = 180;
	public static readonly STRING = 181;
	public static readonly INTEGER = 182;
	public static readonly DECIMAL = 183;
	public static readonly WS = 184;
	public static readonly COMMENT = 185;
	public static readonly LINE_COMMENT = 186;
	public static override readonly EOF = Token.EOF;
	public static readonly RULE_library = 0;
	public static readonly RULE_directive = 1;
	public static readonly RULE_definition = 2;
	public static readonly RULE_libraryDefinition = 3;
	public static readonly RULE_usingDefinition = 4;
	public static readonly RULE_includeDefinition = 5;
	public static readonly RULE_localIdentifier = 6;
	public static readonly RULE_accessModifier = 7;
	public static readonly RULE_parameterDefinition = 8;
	public static readonly RULE_codesystemDefinition = 9;
	public static readonly RULE_valuesetDefinition = 10;
	public static readonly RULE_codesystems = 11;
	public static readonly RULE_codesystemIdentifier = 12;
	public static readonly RULE_libraryIdentifier = 13;
	public static readonly RULE_codeDefinition = 14;
	public static readonly RULE_conceptDefinition = 15;
	public static readonly RULE_codeIdentifier = 16;
	public static readonly RULE_codesystemId = 17;
	public static readonly RULE_valuesetId = 18;
	public static readonly RULE_versionSpecifier = 19;
	public static readonly RULE_codeId = 20;
	public static readonly RULE_typeSpecifier = 21;
	public static readonly RULE_namedTypeSpecifier = 22;
	public static readonly RULE_modelIdentifier = 23;
	public static readonly RULE_listTypeSpecifier = 24;
	public static readonly RULE_intervalTypeSpecifier = 25;
	public static readonly RULE_tupleTypeSpecifier = 26;
	public static readonly RULE_tupleElementDefinition = 27;
	public static readonly RULE_choiceTypeSpecifier = 28;
	public static readonly RULE_statement = 29;
	public static readonly RULE_expressionDefinition = 30;
	public static readonly RULE_contextDefinition = 31;
	public static readonly RULE_functionDefinition = 32;
	public static readonly RULE_operandDefinition = 33;
	public static readonly RULE_functionBody = 34;
	public static readonly RULE_qualifiedIdentifierOrFunctionIdentifier = 35;
	public static readonly RULE_contextInfoDefinition = 36;
	public static readonly RULE_typeInfoDefinition = 37;
	public static readonly RULE_baseTypeSpecifier = 38;
	public static readonly RULE_typeElements = 39;
	public static readonly RULE_typeElementDefinition = 40;
	public static readonly RULE_typeInfo = 41;
	public static readonly RULE_contextRelationship = 42;
	public static readonly RULE_conversionInfoDefinition = 43;
	public static readonly RULE_querySource = 44;
	public static readonly RULE_aliasedQuerySource = 45;
	public static readonly RULE_alias = 46;
	public static readonly RULE_queryInclusionClause = 47;
	public static readonly RULE_withClause = 48;
	public static readonly RULE_withoutClause = 49;
	public static readonly RULE_retrieve = 50;
	public static readonly RULE_contextIdentifier = 51;
	public static readonly RULE_codePath = 52;
	public static readonly RULE_codeComparator = 53;
	public static readonly RULE_terminology = 54;
	public static readonly RULE_qualifier = 55;
	public static readonly RULE_query = 56;
	public static readonly RULE_sourceClause = 57;
	public static readonly RULE_letClause = 58;
	public static readonly RULE_letClauseItem = 59;
	public static readonly RULE_whereClause = 60;
	public static readonly RULE_returnClause = 61;
	public static readonly RULE_aggregateClause = 62;
	public static readonly RULE_startingClause = 63;
	public static readonly RULE_sortClause = 64;
	public static readonly RULE_sortDirection = 65;
	public static readonly RULE_sortByItem = 66;
	public static readonly RULE_qualifiedIdentifier = 67;
	public static readonly RULE_qualifiedIdentifierExpression = 68;
	public static readonly RULE_qualifierExpression = 69;
	public static readonly RULE_simplePath = 70;
	public static readonly RULE_simpleLiteral = 71;
	public static readonly RULE_expression = 72;
	public static readonly RULE_dateTimePrecision = 73;
	public static readonly RULE_dateTimeComponent = 74;
	public static readonly RULE_pluralDateTimePrecision = 75;
	public static readonly RULE_expressionTerm = 76;
	public static readonly RULE_caseExpressionItem = 77;
	public static readonly RULE_dateTimePrecisionSpecifier = 78;
	public static readonly RULE_relativeQualifier = 79;
	public static readonly RULE_offsetRelativeQualifier = 80;
	public static readonly RULE_exclusiveRelativeQualifier = 81;
	public static readonly RULE_quantityOffset = 82;
	public static readonly RULE_temporalRelationship = 83;
	public static readonly RULE_intervalOperatorPhrase = 84;
	public static readonly RULE_term = 85;
	public static readonly RULE_qualifiedInvocation = 86;
	public static readonly RULE_qualifiedFunction = 87;
	public static readonly RULE_invocation = 88;
	public static readonly RULE_function = 89;
	public static readonly RULE_ratio = 90;
	public static readonly RULE_literal = 91;
	public static readonly RULE_externalConstant = 92;
	public static readonly RULE_intervalSelector = 93;
	public static readonly RULE_tupleSelector = 94;
	public static readonly RULE_tupleElementSelector = 95;
	public static readonly RULE_instanceSelector = 96;
	public static readonly RULE_instanceElementSelector = 97;
	public static readonly RULE_listSelector = 98;
	public static readonly RULE_displayClause = 99;
	public static readonly RULE_codeSelector = 100;
	public static readonly RULE_conceptSelector = 101;
	public static readonly RULE_keyword = 102;
	public static readonly RULE_reservedWord = 103;
	public static readonly RULE_keywordIdentifier = 104;
	public static readonly RULE_obsoleteIdentifier = 105;
	public static readonly RULE_functionIdentifier = 106;
	public static readonly RULE_typeNameIdentifier = 107;
	public static readonly RULE_referentialIdentifier = 108;
	public static readonly RULE_referentialOrTypeNameIdentifier = 109;
	public static readonly RULE_identifierOrFunctionIdentifier = 110;
	public static readonly RULE_identifier = 111;
	public static readonly RULE_entireExpression = 112;
	public static readonly RULE_sortArgument = 113;
	public static readonly RULE_paramList = 114;
	public static readonly RULE_quantity = 115;
	public static readonly RULE_unit = 116;
	public static readonly literalNames: (string | null)[] = [ null, "'#'", 
                                                            "':'", "'library'", 
                                                            "'version'", 
                                                            "'using'", "'called'", 
                                                            "'include'", 
                                                            "'bind'", "'public'", 
                                                            "'private'", 
                                                            "'parameter'", 
                                                            "'default'", 
                                                            "'codesystem'", 
                                                            "'valueset'", 
                                                            "'codesystems'", 
                                                            "'{'", "','", 
                                                            "'}'", "'.'", 
                                                            "'code'", "'from'", 
                                                            "'concept'", 
                                                            "'List'", "'<'", 
                                                            "'>'", "'Interval'", 
                                                            "'Tuple'", "'Choice'", 
                                                            "'define'", 
                                                            "'context'", 
                                                            "'fluent'", 
                                                            "'function'", 
                                                            "'('", "')'", 
                                                            "'returns'", 
                                                            "'external'", 
                                                            "'of'", "'type'", 
                                                            "'with'", "'key'", 
                                                            "'extends'", 
                                                            "'label'", "'identifier'", 
                                                            "'retrievable'", 
                                                            "'primary'", 
                                                            "'path'", "'related'", 
                                                            "'to'", "'by'", 
                                                            "'implicit'", 
                                                            "'explicit'", 
                                                            "'conversion'", 
                                                            "'such that'", 
                                                            "'without'", 
                                                            "'['", "'->'", 
                                                            "']'", "'in'", 
                                                            "'='", "'~'", 
                                                            "'let'", "'where'", 
                                                            "'return'", 
                                                            "'all'", "'distinct'", 
                                                            "'aggregate'", 
                                                            "'starting'", 
                                                            "'sort'", "'asc'", 
                                                            "'ascending'", 
                                                            "'desc'", "'descending'", 
                                                            "'is'", "'not'", 
                                                            "'null'", "'true'", 
                                                            "'false'", "'as'", 
                                                            "'cast'", "'exists'", 
                                                            "'properly'", 
                                                            "'between'", 
                                                            "'and'", "'duration'", 
                                                            "'difference'", 
                                                            "'|'", "'union'", 
                                                            "'intersect'", 
                                                            "'except'", 
                                                            "'ordered'", 
                                                            "'<='", "'>='", 
                                                            "'!='", "'!~'", 
                                                            "'~in'", "'contains'", 
                                                            "'~contains'", 
                                                            "'or'", "'xor'", 
                                                            "'implies'", 
                                                            "'year'", "'month'", 
                                                            "'week'", "'day'", 
                                                            "'hour'", "'minute'", 
                                                            "'second'", 
                                                            "'millisecond'", 
                                                            "'date'", "'time'", 
                                                            "'timezoneoffset'", 
                                                            "'years'", "'months'", 
                                                            "'weeks'", "'days'", 
                                                            "'hours'", "'minutes'", 
                                                            "'seconds'", 
                                                            "'milliseconds'", 
                                                            "'convert'", 
                                                            "'+'", "'-'", 
                                                            "'start'", "'end'", 
                                                            "'width'", "'successor'", 
                                                            "'predecessor'", 
                                                            "'singleton'", 
                                                            "'point'", "'minimum'", 
                                                            "'maximum'", 
                                                            "'^'", "'*'", 
                                                            "'/'", "'div'", 
                                                            "'mod'", "'&'", 
                                                            "'if'", "'then'", 
                                                            "'else'", "'case'", 
                                                            "'flatten'", 
                                                            "'expand'", 
                                                            "'collapse'", 
                                                            "'per'", "'when'", 
                                                            "'or before'", 
                                                            "'or after'", 
                                                            "'or more'", 
                                                            "'or less'", 
                                                            "'less than'", 
                                                            "'more than'", 
                                                            "'on or'", "'before'", 
                                                            "'after'", "'or on'", 
                                                            "'starts'", 
                                                            "'ends'", "'occurs'", 
                                                            "'same'", "'includes'", 
                                                            "'during'", 
                                                            "'included in'", 
                                                            "'within'", 
                                                            "'meets'", "'overlaps'", 
                                                            "'$this'", "'$index'", 
                                                            "'$total'", 
                                                            "'%'", "'display'", 
                                                            "'Code'", "'Concept'" ];
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
                                                             "QUOTEDIDENTIFIER", 
                                                             "DATETIME", 
                                                             "LONGNUMBER", 
                                                             "DATE", "TIME", 
                                                             "IDENTIFIER", 
                                                             "DELIMITEDIDENTIFIER", 
                                                             "STRING", "INTEGER", 
                                                             "DECIMAL", 
                                                             "WS", "COMMENT", 
                                                             "LINE_COMMENT" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"library", "directive", "definition", "libraryDefinition", "usingDefinition", 
		"includeDefinition", "localIdentifier", "accessModifier", "parameterDefinition", 
		"codesystemDefinition", "valuesetDefinition", "codesystems", "codesystemIdentifier", 
		"libraryIdentifier", "codeDefinition", "conceptDefinition", "codeIdentifier", 
		"codesystemId", "valuesetId", "versionSpecifier", "codeId", "typeSpecifier", 
		"namedTypeSpecifier", "modelIdentifier", "listTypeSpecifier", "intervalTypeSpecifier", 
		"tupleTypeSpecifier", "tupleElementDefinition", "choiceTypeSpecifier", 
		"statement", "expressionDefinition", "contextDefinition", "functionDefinition", 
		"operandDefinition", "functionBody", "qualifiedIdentifierOrFunctionIdentifier", 
		"contextInfoDefinition", "typeInfoDefinition", "baseTypeSpecifier", "typeElements", 
		"typeElementDefinition", "typeInfo", "contextRelationship", "conversionInfoDefinition", 
		"querySource", "aliasedQuerySource", "alias", "queryInclusionClause", 
		"withClause", "withoutClause", "retrieve", "contextIdentifier", "codePath", 
		"codeComparator", "terminology", "qualifier", "query", "sourceClause", 
		"letClause", "letClauseItem", "whereClause", "returnClause", "aggregateClause", 
		"startingClause", "sortClause", "sortDirection", "sortByItem", "qualifiedIdentifier", 
		"qualifiedIdentifierExpression", "qualifierExpression", "simplePath", 
		"simpleLiteral", "expression", "dateTimePrecision", "dateTimeComponent", 
		"pluralDateTimePrecision", "expressionTerm", "caseExpressionItem", "dateTimePrecisionSpecifier", 
		"relativeQualifier", "offsetRelativeQualifier", "exclusiveRelativeQualifier", 
		"quantityOffset", "temporalRelationship", "intervalOperatorPhrase", "term", 
		"qualifiedInvocation", "qualifiedFunction", "invocation", "function", 
		"ratio", "literal", "externalConstant", "intervalSelector", "tupleSelector", 
		"tupleElementSelector", "instanceSelector", "instanceElementSelector", 
		"listSelector", "displayClause", "codeSelector", "conceptSelector", "keyword", 
		"reservedWord", "keywordIdentifier", "obsoleteIdentifier", "functionIdentifier", 
		"typeNameIdentifier", "referentialIdentifier", "referentialOrTypeNameIdentifier", 
		"identifierOrFunctionIdentifier", "identifier", "entireExpression", "sortArgument", 
		"paramList", "quantity", "unit",
	];
	public get grammarFileName(): string { return "cql.g4"; }
	public get literalNames(): (string | null)[] { return cqlParser.literalNames; }
	public get symbolicNames(): (string | null)[] { return cqlParser.symbolicNames; }
	public get ruleNames(): string[] { return cqlParser.ruleNames; }
	public get serializedATN(): number[] { return cqlParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(this, cqlParser._ATN, cqlParser.DecisionsToDFA, new PredictionContextCache());
	}
	// @RuleVersion(0)
	public library(): LibraryContext {
		let localctx: LibraryContext = new LibraryContext(this, this._ctx, this.state);
		this.enterRule(localctx, 0, cqlParser.RULE_library);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 237;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===1) {
				{
				{
				this.state = 234;
				this.directive();
				}
				}
				this.state = 239;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 241;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===3) {
				{
				this.state = 240;
				this.libraryDefinition();
				}
			}

			this.state = 246;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 5271200) !== 0)) {
				{
				{
				this.state = 243;
				this.definition();
				}
				}
				this.state = 248;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 252;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===29 || _la===30) {
				{
				{
				this.state = 249;
				this.statement();
				}
				}
				this.state = 254;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 255;
			this.match(cqlParser.EOF);
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
	public directive(): DirectiveContext {
		let localctx: DirectiveContext = new DirectiveContext(this, this._ctx, this.state);
		this.enterRule(localctx, 2, cqlParser.RULE_directive);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 257;
			this.match(cqlParser.T__0);
			this.state = 258;
			this.identifier();
			this.state = 261;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===2) {
				{
				this.state = 259;
				this.match(cqlParser.T__1);
				this.state = 260;
				this.match(cqlParser.STRING);
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
	public definition(): DefinitionContext {
		let localctx: DefinitionContext = new DefinitionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 4, cqlParser.RULE_definition);
		try {
			this.state = 270;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 5, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 263;
				this.usingDefinition();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 264;
				this.includeDefinition();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 265;
				this.codesystemDefinition();
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 266;
				this.valuesetDefinition();
				}
				break;
			case 5:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 267;
				this.codeDefinition();
				}
				break;
			case 6:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 268;
				this.conceptDefinition();
				}
				break;
			case 7:
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 269;
				this.parameterDefinition();
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
	public libraryDefinition(): LibraryDefinitionContext {
		let localctx: LibraryDefinitionContext = new LibraryDefinitionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 6, cqlParser.RULE_libraryDefinition);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 272;
			this.match(cqlParser.T__2);
			this.state = 273;
			this.qualifiedIdentifier();
			this.state = 276;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===4) {
				{
				this.state = 274;
				this.match(cqlParser.T__3);
				this.state = 275;
				this.versionSpecifier();
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
	public usingDefinition(): UsingDefinitionContext {
		let localctx: UsingDefinitionContext = new UsingDefinitionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 8, cqlParser.RULE_usingDefinition);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 278;
			this.match(cqlParser.T__4);
			this.state = 279;
			this.qualifiedIdentifier();
			this.state = 282;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===4) {
				{
				this.state = 280;
				this.match(cqlParser.T__3);
				this.state = 281;
				this.versionSpecifier();
				}
			}

			this.state = 286;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===6) {
				{
				this.state = 284;
				this.match(cqlParser.T__5);
				this.state = 285;
				this.localIdentifier();
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
	public includeDefinition(): IncludeDefinitionContext {
		let localctx: IncludeDefinitionContext = new IncludeDefinitionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 10, cqlParser.RULE_includeDefinition);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 288;
			this.match(cqlParser.T__6);
			this.state = 289;
			this.qualifiedIdentifier();
			this.state = 292;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===4) {
				{
				this.state = 290;
				this.match(cqlParser.T__3);
				this.state = 291;
				this.versionSpecifier();
				}
			}

			this.state = 296;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===6) {
				{
				this.state = 294;
				this.match(cqlParser.T__5);
				this.state = 295;
				this.localIdentifier();
				}
			}

			this.state = 300;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===8) {
				{
				this.state = 298;
				this.match(cqlParser.T__7);
				this.state = 299;
				this.tupleSelector();
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
	public localIdentifier(): LocalIdentifierContext {
		let localctx: LocalIdentifierContext = new LocalIdentifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 12, cqlParser.RULE_localIdentifier);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 302;
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
	public accessModifier(): AccessModifierContext {
		let localctx: AccessModifierContext = new AccessModifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 14, cqlParser.RULE_accessModifier);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 304;
			_la = this._input.LA(1);
			if(!(_la===9 || _la===10)) {
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
	public parameterDefinition(): ParameterDefinitionContext {
		let localctx: ParameterDefinitionContext = new ParameterDefinitionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 16, cqlParser.RULE_parameterDefinition);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 307;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===9 || _la===10) {
				{
				this.state = 306;
				this.accessModifier();
				}
			}

			this.state = 309;
			this.match(cqlParser.T__10);
			this.state = 310;
			this.identifier();
			this.state = 312;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 13, this._ctx) ) {
			case 1:
				{
				this.state = 311;
				this.typeSpecifier();
				}
				break;
			}
			this.state = 316;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===12) {
				{
				this.state = 314;
				this.match(cqlParser.T__11);
				this.state = 315;
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
	public codesystemDefinition(): CodesystemDefinitionContext {
		let localctx: CodesystemDefinitionContext = new CodesystemDefinitionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 18, cqlParser.RULE_codesystemDefinition);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 319;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===9 || _la===10) {
				{
				this.state = 318;
				this.accessModifier();
				}
			}

			this.state = 321;
			this.match(cqlParser.T__12);
			this.state = 322;
			this.identifier();
			this.state = 323;
			this.match(cqlParser.T__1);
			this.state = 324;
			this.codesystemId();
			this.state = 327;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===4) {
				{
				this.state = 325;
				this.match(cqlParser.T__3);
				this.state = 326;
				this.versionSpecifier();
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
	public valuesetDefinition(): ValuesetDefinitionContext {
		let localctx: ValuesetDefinitionContext = new ValuesetDefinitionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 20, cqlParser.RULE_valuesetDefinition);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 330;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===9 || _la===10) {
				{
				this.state = 329;
				this.accessModifier();
				}
			}

			this.state = 332;
			this.match(cqlParser.T__13);
			this.state = 333;
			this.identifier();
			this.state = 334;
			this.match(cqlParser.T__1);
			this.state = 335;
			this.valuesetId();
			this.state = 338;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===4) {
				{
				this.state = 336;
				this.match(cqlParser.T__3);
				this.state = 337;
				this.versionSpecifier();
				}
			}

			this.state = 341;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===15) {
				{
				this.state = 340;
				this.codesystems();
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
	public codesystems(): CodesystemsContext {
		let localctx: CodesystemsContext = new CodesystemsContext(this, this._ctx, this.state);
		this.enterRule(localctx, 22, cqlParser.RULE_codesystems);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 343;
			this.match(cqlParser.T__14);
			this.state = 344;
			this.match(cqlParser.T__15);
			this.state = 345;
			this.codesystemIdentifier();
			this.state = 350;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===17) {
				{
				{
				this.state = 346;
				this.match(cqlParser.T__16);
				this.state = 347;
				this.codesystemIdentifier();
				}
				}
				this.state = 352;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 353;
			this.match(cqlParser.T__17);
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
	public codesystemIdentifier(): CodesystemIdentifierContext {
		let localctx: CodesystemIdentifierContext = new CodesystemIdentifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 24, cqlParser.RULE_codesystemIdentifier);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 358;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 21, this._ctx) ) {
			case 1:
				{
				this.state = 355;
				this.libraryIdentifier();
				this.state = 356;
				this.match(cqlParser.T__18);
				}
				break;
			}
			this.state = 360;
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
	public libraryIdentifier(): LibraryIdentifierContext {
		let localctx: LibraryIdentifierContext = new LibraryIdentifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 26, cqlParser.RULE_libraryIdentifier);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 362;
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
	public codeDefinition(): CodeDefinitionContext {
		let localctx: CodeDefinitionContext = new CodeDefinitionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 28, cqlParser.RULE_codeDefinition);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 365;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===9 || _la===10) {
				{
				this.state = 364;
				this.accessModifier();
				}
			}

			this.state = 367;
			this.match(cqlParser.T__19);
			this.state = 368;
			this.identifier();
			this.state = 369;
			this.match(cqlParser.T__1);
			this.state = 370;
			this.codeId();
			this.state = 371;
			this.match(cqlParser.T__20);
			this.state = 372;
			this.codesystemIdentifier();
			this.state = 374;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===171) {
				{
				this.state = 373;
				this.displayClause();
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
	public conceptDefinition(): ConceptDefinitionContext {
		let localctx: ConceptDefinitionContext = new ConceptDefinitionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 30, cqlParser.RULE_conceptDefinition);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 377;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===9 || _la===10) {
				{
				this.state = 376;
				this.accessModifier();
				}
			}

			this.state = 379;
			this.match(cqlParser.T__21);
			this.state = 380;
			this.identifier();
			this.state = 381;
			this.match(cqlParser.T__1);
			this.state = 382;
			this.match(cqlParser.T__15);
			this.state = 391;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 174)) & ~0x1F) === 0 && ((1 << (_la - 174)) & 97) !== 0)) {
				{
				this.state = 383;
				this.codeIdentifier();
				this.state = 388;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===17) {
					{
					{
					this.state = 384;
					this.match(cqlParser.T__16);
					this.state = 385;
					this.codeIdentifier();
					}
					}
					this.state = 390;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
			}

			this.state = 393;
			this.match(cqlParser.T__17);
			this.state = 395;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===171) {
				{
				this.state = 394;
				this.displayClause();
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
	public codeIdentifier(): CodeIdentifierContext {
		let localctx: CodeIdentifierContext = new CodeIdentifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 32, cqlParser.RULE_codeIdentifier);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 400;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 28, this._ctx) ) {
			case 1:
				{
				this.state = 397;
				this.libraryIdentifier();
				this.state = 398;
				this.match(cqlParser.T__18);
				}
				break;
			}
			this.state = 402;
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
	public codesystemId(): CodesystemIdContext {
		let localctx: CodesystemIdContext = new CodesystemIdContext(this, this._ctx, this.state);
		this.enterRule(localctx, 34, cqlParser.RULE_codesystemId);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 404;
			this.match(cqlParser.STRING);
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
	public valuesetId(): ValuesetIdContext {
		let localctx: ValuesetIdContext = new ValuesetIdContext(this, this._ctx, this.state);
		this.enterRule(localctx, 36, cqlParser.RULE_valuesetId);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 406;
			this.match(cqlParser.STRING);
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
	public versionSpecifier(): VersionSpecifierContext {
		let localctx: VersionSpecifierContext = new VersionSpecifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 38, cqlParser.RULE_versionSpecifier);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 408;
			this.match(cqlParser.STRING);
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
	public codeId(): CodeIdContext {
		let localctx: CodeIdContext = new CodeIdContext(this, this._ctx, this.state);
		this.enterRule(localctx, 40, cqlParser.RULE_codeId);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 410;
			this.match(cqlParser.STRING);
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
		this.enterRule(localctx, 42, cqlParser.RULE_typeSpecifier);
		try {
			this.state = 417;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 3:
			case 4:
			case 5:
			case 6:
			case 7:
			case 8:
			case 9:
			case 10:
			case 11:
			case 12:
			case 13:
			case 14:
			case 15:
			case 20:
			case 22:
			case 29:
			case 30:
			case 31:
			case 32:
			case 38:
			case 40:
			case 41:
			case 42:
			case 43:
			case 44:
			case 45:
			case 46:
			case 47:
			case 49:
			case 50:
			case 51:
			case 52:
			case 62:
			case 67:
			case 69:
			case 70:
			case 71:
			case 72:
			case 87:
			case 88:
			case 89:
			case 96:
			case 99:
			case 100:
			case 109:
			case 110:
			case 111:
			case 123:
			case 124:
			case 125:
			case 126:
			case 127:
			case 135:
			case 136:
			case 147:
			case 148:
			case 149:
			case 150:
			case 157:
			case 158:
			case 161:
			case 165:
			case 166:
			case 171:
			case 172:
			case 173:
			case 174:
			case 179:
			case 180:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 412;
				this.namedTypeSpecifier();
				}
				break;
			case 23:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 413;
				this.listTypeSpecifier();
				}
				break;
			case 26:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 414;
				this.intervalTypeSpecifier();
				}
				break;
			case 27:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 415;
				this.tupleTypeSpecifier();
				}
				break;
			case 28:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 416;
				this.choiceTypeSpecifier();
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
	public namedTypeSpecifier(): NamedTypeSpecifierContext {
		let localctx: NamedTypeSpecifierContext = new NamedTypeSpecifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 44, cqlParser.RULE_namedTypeSpecifier);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 424;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 30, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 419;
					this.qualifier();
					this.state = 420;
					this.match(cqlParser.T__18);
					}
					}
				}
				this.state = 426;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 30, this._ctx);
			}
			this.state = 427;
			this.referentialOrTypeNameIdentifier();
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
	public modelIdentifier(): ModelIdentifierContext {
		let localctx: ModelIdentifierContext = new ModelIdentifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 46, cqlParser.RULE_modelIdentifier);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 429;
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
	public listTypeSpecifier(): ListTypeSpecifierContext {
		let localctx: ListTypeSpecifierContext = new ListTypeSpecifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 48, cqlParser.RULE_listTypeSpecifier);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 431;
			this.match(cqlParser.T__22);
			this.state = 432;
			this.match(cqlParser.T__23);
			this.state = 433;
			this.typeSpecifier();
			this.state = 434;
			this.match(cqlParser.T__24);
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
	public intervalTypeSpecifier(): IntervalTypeSpecifierContext {
		let localctx: IntervalTypeSpecifierContext = new IntervalTypeSpecifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 50, cqlParser.RULE_intervalTypeSpecifier);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 436;
			this.match(cqlParser.T__25);
			this.state = 437;
			this.match(cqlParser.T__23);
			this.state = 438;
			this.typeSpecifier();
			this.state = 439;
			this.match(cqlParser.T__24);
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
	public tupleTypeSpecifier(): TupleTypeSpecifierContext {
		let localctx: TupleTypeSpecifierContext = new TupleTypeSpecifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 52, cqlParser.RULE_tupleTypeSpecifier);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 441;
			this.match(cqlParser.T__26);
			this.state = 442;
			this.match(cqlParser.T__15);
			this.state = 451;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3763404792) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 1075773249) !== 0) || ((((_la - 67)) & ~0x1F) === 0 && ((1 << (_la - 67)) & 544211005) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 520100867) !== 0) || ((((_la - 135)) & ~0x1F) === 0 && ((1 << (_la - 135)) & 3300978691) !== 0) || ((((_la - 171)) & ~0x1F) === 0 && ((1 << (_la - 171)) & 777) !== 0)) {
				{
				this.state = 443;
				this.tupleElementDefinition();
				this.state = 448;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===17) {
					{
					{
					this.state = 444;
					this.match(cqlParser.T__16);
					this.state = 445;
					this.tupleElementDefinition();
					}
					}
					this.state = 450;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
			}

			this.state = 453;
			this.match(cqlParser.T__17);
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
	public tupleElementDefinition(): TupleElementDefinitionContext {
		let localctx: TupleElementDefinitionContext = new TupleElementDefinitionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 54, cqlParser.RULE_tupleElementDefinition);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 455;
			this.referentialIdentifier();
			this.state = 456;
			this.typeSpecifier();
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
	public choiceTypeSpecifier(): ChoiceTypeSpecifierContext {
		let localctx: ChoiceTypeSpecifierContext = new ChoiceTypeSpecifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 56, cqlParser.RULE_choiceTypeSpecifier);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 458;
			this.match(cqlParser.T__27);
			this.state = 459;
			this.match(cqlParser.T__23);
			this.state = 460;
			this.typeSpecifier();
			this.state = 465;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===17) {
				{
				{
				this.state = 461;
				this.match(cqlParser.T__16);
				this.state = 462;
				this.typeSpecifier();
				}
				}
				this.state = 467;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 468;
			this.match(cqlParser.T__24);
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
	public statement(): StatementContext {
		let localctx: StatementContext = new StatementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 58, cqlParser.RULE_statement);
		try {
			this.state = 476;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 34, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 470;
				this.expressionDefinition();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 471;
				this.contextDefinition();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 472;
				this.functionDefinition();
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 473;
				this.contextInfoDefinition();
				}
				break;
			case 5:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 474;
				this.typeInfoDefinition();
				}
				break;
			case 6:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 475;
				this.conversionInfoDefinition();
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
	public expressionDefinition(): ExpressionDefinitionContext {
		let localctx: ExpressionDefinitionContext = new ExpressionDefinitionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 60, cqlParser.RULE_expressionDefinition);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 478;
			this.match(cqlParser.T__28);
			this.state = 480;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===9 || _la===10) {
				{
				this.state = 479;
				this.accessModifier();
				}
			}

			this.state = 482;
			this.identifier();
			this.state = 483;
			this.match(cqlParser.T__1);
			this.state = 484;
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
	public contextDefinition(): ContextDefinitionContext {
		let localctx: ContextDefinitionContext = new ContextDefinitionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 62, cqlParser.RULE_contextDefinition);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 486;
			this.match(cqlParser.T__29);
			this.state = 490;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 36, this._ctx) ) {
			case 1:
				{
				this.state = 487;
				this.modelIdentifier();
				this.state = 488;
				this.match(cqlParser.T__18);
				}
				break;
			}
			this.state = 492;
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
	public functionDefinition(): FunctionDefinitionContext {
		let localctx: FunctionDefinitionContext = new FunctionDefinitionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 64, cqlParser.RULE_functionDefinition);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 494;
			this.match(cqlParser.T__28);
			this.state = 496;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===9 || _la===10) {
				{
				this.state = 495;
				this.accessModifier();
				}
			}

			this.state = 499;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===31) {
				{
				this.state = 498;
				this.match(cqlParser.T__30);
				}
			}

			this.state = 501;
			this.match(cqlParser.T__31);
			this.state = 502;
			this.identifierOrFunctionIdentifier();
			this.state = 503;
			this.match(cqlParser.T__32);
			this.state = 512;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3763404792) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 1075773249) !== 0) || ((((_la - 67)) & ~0x1F) === 0 && ((1 << (_la - 67)) & 544211005) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 520100867) !== 0) || ((((_la - 135)) & ~0x1F) === 0 && ((1 << (_la - 135)) & 3300978691) !== 0) || ((((_la - 171)) & ~0x1F) === 0 && ((1 << (_la - 171)) & 777) !== 0)) {
				{
				this.state = 504;
				this.operandDefinition();
				this.state = 509;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===17) {
					{
					{
					this.state = 505;
					this.match(cqlParser.T__16);
					this.state = 506;
					this.operandDefinition();
					}
					}
					this.state = 511;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
			}

			this.state = 514;
			this.match(cqlParser.T__33);
			this.state = 517;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===35) {
				{
				this.state = 515;
				this.match(cqlParser.T__34);
				this.state = 516;
				this.typeSpecifier();
				}
			}

			this.state = 519;
			this.match(cqlParser.T__1);
			this.state = 522;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 3:
			case 4:
			case 5:
			case 6:
			case 7:
			case 8:
			case 9:
			case 10:
			case 11:
			case 12:
			case 13:
			case 14:
			case 15:
			case 16:
			case 20:
			case 21:
			case 22:
			case 23:
			case 26:
			case 27:
			case 29:
			case 30:
			case 31:
			case 32:
			case 33:
			case 38:
			case 40:
			case 41:
			case 42:
			case 43:
			case 44:
			case 45:
			case 46:
			case 47:
			case 49:
			case 50:
			case 51:
			case 52:
			case 55:
			case 62:
			case 65:
			case 67:
			case 69:
			case 70:
			case 71:
			case 72:
			case 74:
			case 75:
			case 76:
			case 77:
			case 79:
			case 80:
			case 84:
			case 85:
			case 87:
			case 88:
			case 89:
			case 96:
			case 99:
			case 100:
			case 101:
			case 102:
			case 103:
			case 104:
			case 105:
			case 106:
			case 107:
			case 108:
			case 109:
			case 110:
			case 111:
			case 112:
			case 113:
			case 114:
			case 115:
			case 116:
			case 117:
			case 118:
			case 119:
			case 120:
			case 121:
			case 122:
			case 123:
			case 124:
			case 125:
			case 126:
			case 127:
			case 128:
			case 129:
			case 130:
			case 131:
			case 135:
			case 136:
			case 138:
			case 141:
			case 142:
			case 143:
			case 144:
			case 147:
			case 148:
			case 149:
			case 150:
			case 157:
			case 158:
			case 161:
			case 165:
			case 166:
			case 167:
			case 168:
			case 169:
			case 170:
			case 171:
			case 172:
			case 173:
			case 174:
			case 175:
			case 176:
			case 177:
			case 178:
			case 179:
			case 180:
			case 181:
			case 182:
			case 183:
				{
				this.state = 520;
				this.functionBody();
				}
				break;
			case 36:
				{
				this.state = 521;
				this.match(cqlParser.T__35);
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
	public operandDefinition(): OperandDefinitionContext {
		let localctx: OperandDefinitionContext = new OperandDefinitionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 66, cqlParser.RULE_operandDefinition);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 524;
			this.referentialIdentifier();
			this.state = 525;
			this.typeSpecifier();
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
	public functionBody(): FunctionBodyContext {
		let localctx: FunctionBodyContext = new FunctionBodyContext(this, this._ctx, this.state);
		this.enterRule(localctx, 68, cqlParser.RULE_functionBody);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 527;
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
	public qualifiedIdentifierOrFunctionIdentifier(): QualifiedIdentifierOrFunctionIdentifierContext {
		let localctx: QualifiedIdentifierOrFunctionIdentifierContext = new QualifiedIdentifierOrFunctionIdentifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 70, cqlParser.RULE_qualifiedIdentifierOrFunctionIdentifier);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 534;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 43, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 529;
					this.qualifierExpression();
					this.state = 530;
					this.match(cqlParser.T__18);
					}
					}
				}
				this.state = 536;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 43, this._ctx);
			}
			this.state = 537;
			this.identifierOrFunctionIdentifier();
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
	public contextInfoDefinition(): ContextInfoDefinitionContext {
		let localctx: ContextInfoDefinitionContext = new ContextInfoDefinitionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 72, cqlParser.RULE_contextInfoDefinition);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 539;
			this.match(cqlParser.T__28);
			this.state = 540;
			this.match(cqlParser.T__29);
			this.state = 541;
			this.identifier();
			this.state = 542;
			this.match(cqlParser.T__36);
			this.state = 543;
			this.match(cqlParser.T__37);
			this.state = 544;
			this.namedTypeSpecifier();
			this.state = 545;
			this.match(cqlParser.T__38);
			this.state = 546;
			this.match(cqlParser.T__39);
			this.state = 547;
			this.match(cqlParser.T__15);
			this.state = 548;
			this.qualifiedIdentifierOrFunctionIdentifier();
			this.state = 553;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===17) {
				{
				{
				this.state = 549;
				this.match(cqlParser.T__16);
				this.state = 550;
				this.qualifiedIdentifierOrFunctionIdentifier();
				}
				}
				this.state = 555;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 556;
			this.match(cqlParser.T__17);
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
	public typeInfoDefinition(): TypeInfoDefinitionContext {
		let localctx: TypeInfoDefinitionContext = new TypeInfoDefinitionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 74, cqlParser.RULE_typeInfoDefinition);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 558;
			this.match(cqlParser.T__28);
			this.state = 560;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===9 || _la===10) {
				{
				this.state = 559;
				this.accessModifier();
				}
			}

			this.state = 562;
			this.match(cqlParser.T__37);
			this.state = 563;
			this.qualifiedIdentifier();
			this.state = 565;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===41) {
				{
				this.state = 564;
				this.baseTypeSpecifier();
				}
			}

			this.state = 568;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===16) {
				{
				this.state = 567;
				this.typeElements();
				}
			}

			this.state = 570;
			this.typeInfo();
			this.state = 574;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===47) {
				{
				{
				this.state = 571;
				this.contextRelationship();
				}
				}
				this.state = 576;
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
	public baseTypeSpecifier(): BaseTypeSpecifierContext {
		let localctx: BaseTypeSpecifierContext = new BaseTypeSpecifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 76, cqlParser.RULE_baseTypeSpecifier);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 577;
			this.match(cqlParser.T__40);
			this.state = 578;
			this.namedTypeSpecifier();
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
	public typeElements(): TypeElementsContext {
		let localctx: TypeElementsContext = new TypeElementsContext(this, this._ctx, this.state);
		this.enterRule(localctx, 78, cqlParser.RULE_typeElements);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 580;
			this.match(cqlParser.T__15);
			this.state = 581;
			this.typeElementDefinition();
			this.state = 586;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===17) {
				{
				{
				this.state = 582;
				this.match(cqlParser.T__16);
				this.state = 583;
				this.typeElementDefinition();
				}
				}
				this.state = 588;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 589;
			this.match(cqlParser.T__17);
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
	public typeElementDefinition(): TypeElementDefinitionContext {
		let localctx: TypeElementDefinitionContext = new TypeElementDefinitionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 80, cqlParser.RULE_typeElementDefinition);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 591;
			this.referentialIdentifier();
			this.state = 592;
			this.typeSpecifier();
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
	public typeInfo(): TypeInfoContext {
		let localctx: TypeInfoContext = new TypeInfoContext(this, this._ctx, this.state);
		this.enterRule(localctx, 82, cqlParser.RULE_typeInfo);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 596;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===42) {
				{
				this.state = 594;
				this.match(cqlParser.T__41);
				this.state = 595;
				this.identifier();
				}
			}

			this.state = 600;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===43) {
				{
				this.state = 598;
				this.match(cqlParser.T__42);
				this.state = 599;
				this.match(cqlParser.STRING);
				}
			}

			this.state = 603;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===44) {
				{
				this.state = 602;
				this.match(cqlParser.T__43);
				}
			}

			this.state = 609;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===45) {
				{
				this.state = 605;
				this.match(cqlParser.T__44);
				this.state = 606;
				this.match(cqlParser.T__19);
				this.state = 607;
				this.match(cqlParser.T__45);
				this.state = 608;
				this.simplePath(0);
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
	public contextRelationship(): ContextRelationshipContext {
		let localctx: ContextRelationshipContext = new ContextRelationshipContext(this, this._ctx, this.state);
		this.enterRule(localctx, 84, cqlParser.RULE_contextRelationship);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 611;
			this.match(cqlParser.T__46);
			this.state = 612;
			this.match(cqlParser.T__47);
			this.state = 613;
			this.qualifiedIdentifier();
			this.state = 614;
			this.match(cqlParser.T__48);
			this.state = 615;
			this.match(cqlParser.T__15);
			this.state = 616;
			this.qualifiedIdentifierOrFunctionIdentifier();
			this.state = 621;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===17) {
				{
				{
				this.state = 617;
				this.match(cqlParser.T__16);
				this.state = 618;
				this.qualifiedIdentifierOrFunctionIdentifier();
				}
				}
				this.state = 623;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 624;
			this.match(cqlParser.T__17);
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
	public conversionInfoDefinition(): ConversionInfoDefinitionContext {
		let localctx: ConversionInfoDefinitionContext = new ConversionInfoDefinitionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 86, cqlParser.RULE_conversionInfoDefinition);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 626;
			this.match(cqlParser.T__28);
			this.state = 628;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===9 || _la===10) {
				{
				this.state = 627;
				this.accessModifier();
				}
			}

			this.state = 630;
			_la = this._input.LA(1);
			if(!(_la===50 || _la===51)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 631;
			this.match(cqlParser.T__51);
			this.state = 632;
			this.match(cqlParser.T__20);
			this.state = 633;
			this.typeSpecifier();
			this.state = 634;
			this.match(cqlParser.T__47);
			this.state = 635;
			this.typeSpecifier();
			this.state = 636;
			this.match(cqlParser.T__4);
			this.state = 637;
			this.qualifiedIdentifierOrFunctionIdentifier();
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
	public querySource(): QuerySourceContext {
		let localctx: QuerySourceContext = new QuerySourceContext(this, this._ctx, this.state);
		this.enterRule(localctx, 88, cqlParser.RULE_querySource);
		try {
			this.state = 645;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 55:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 639;
				this.retrieve();
				}
				break;
			case 3:
			case 4:
			case 5:
			case 6:
			case 7:
			case 8:
			case 9:
			case 10:
			case 11:
			case 12:
			case 13:
			case 14:
			case 15:
			case 20:
			case 22:
			case 29:
			case 30:
			case 31:
			case 32:
			case 38:
			case 40:
			case 41:
			case 42:
			case 43:
			case 44:
			case 45:
			case 46:
			case 47:
			case 49:
			case 50:
			case 51:
			case 52:
			case 62:
			case 67:
			case 69:
			case 70:
			case 71:
			case 72:
			case 87:
			case 88:
			case 89:
			case 96:
			case 99:
			case 100:
			case 109:
			case 110:
			case 111:
			case 123:
			case 124:
			case 125:
			case 126:
			case 127:
			case 135:
			case 136:
			case 147:
			case 148:
			case 149:
			case 150:
			case 157:
			case 158:
			case 161:
			case 165:
			case 166:
			case 171:
			case 174:
			case 179:
			case 180:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 640;
				this.qualifiedIdentifierExpression();
				}
				break;
			case 33:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 641;
				this.match(cqlParser.T__32);
				this.state = 642;
				this.expression(0);
				this.state = 643;
				this.match(cqlParser.T__33);
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
	public aliasedQuerySource(): AliasedQuerySourceContext {
		let localctx: AliasedQuerySourceContext = new AliasedQuerySourceContext(this, this._ctx, this.state);
		this.enterRule(localctx, 90, cqlParser.RULE_aliasedQuerySource);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 647;
			this.querySource();
			this.state = 648;
			this.alias();
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
		this.enterRule(localctx, 92, cqlParser.RULE_alias);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 650;
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
	public queryInclusionClause(): QueryInclusionClauseContext {
		let localctx: QueryInclusionClauseContext = new QueryInclusionClauseContext(this, this._ctx, this.state);
		this.enterRule(localctx, 94, cqlParser.RULE_queryInclusionClause);
		try {
			this.state = 654;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 39:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 652;
				this.withClause();
				}
				break;
			case 54:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 653;
				this.withoutClause();
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
	public withClause(): WithClauseContext {
		let localctx: WithClauseContext = new WithClauseContext(this, this._ctx, this.state);
		this.enterRule(localctx, 96, cqlParser.RULE_withClause);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 656;
			this.match(cqlParser.T__38);
			this.state = 657;
			this.aliasedQuerySource();
			this.state = 658;
			this.match(cqlParser.T__52);
			this.state = 659;
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
	public withoutClause(): WithoutClauseContext {
		let localctx: WithoutClauseContext = new WithoutClauseContext(this, this._ctx, this.state);
		this.enterRule(localctx, 98, cqlParser.RULE_withoutClause);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 661;
			this.match(cqlParser.T__53);
			this.state = 662;
			this.aliasedQuerySource();
			this.state = 663;
			this.match(cqlParser.T__52);
			this.state = 664;
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
	public retrieve(): RetrieveContext {
		let localctx: RetrieveContext = new RetrieveContext(this, this._ctx, this.state);
		this.enterRule(localctx, 100, cqlParser.RULE_retrieve);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 666;
			this.match(cqlParser.T__54);
			this.state = 670;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 58, this._ctx) ) {
			case 1:
				{
				this.state = 667;
				this.contextIdentifier();
				this.state = 668;
				this.match(cqlParser.T__55);
				}
				break;
			}
			this.state = 672;
			this.namedTypeSpecifier();
			this.state = 680;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===2) {
				{
				this.state = 673;
				this.match(cqlParser.T__1);
				this.state = 677;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 59, this._ctx) ) {
				case 1:
					{
					this.state = 674;
					this.codePath();
					this.state = 675;
					this.codeComparator();
					}
					break;
				}
				this.state = 679;
				this.terminology();
				}
			}

			this.state = 682;
			this.match(cqlParser.T__56);
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
	public contextIdentifier(): ContextIdentifierContext {
		let localctx: ContextIdentifierContext = new ContextIdentifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 102, cqlParser.RULE_contextIdentifier);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 684;
			this.qualifiedIdentifierExpression();
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
	public codePath(): CodePathContext {
		let localctx: CodePathContext = new CodePathContext(this, this._ctx, this.state);
		this.enterRule(localctx, 104, cqlParser.RULE_codePath);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 686;
			this.simplePath(0);
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
	public codeComparator(): CodeComparatorContext {
		let localctx: CodeComparatorContext = new CodeComparatorContext(this, this._ctx, this.state);
		this.enterRule(localctx, 106, cqlParser.RULE_codeComparator);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 688;
			_la = this._input.LA(1);
			if(!(((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 7) !== 0))) {
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
	public terminology(): TerminologyContext {
		let localctx: TerminologyContext = new TerminologyContext(this, this._ctx, this.state);
		this.enterRule(localctx, 108, cqlParser.RULE_terminology);
		try {
			this.state = 692;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 61, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 690;
				this.qualifiedIdentifierExpression();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 691;
				this.expression(0);
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
	public qualifier(): QualifierContext {
		let localctx: QualifierContext = new QualifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 110, cqlParser.RULE_qualifier);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 694;
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
	public query(): QueryContext {
		let localctx: QueryContext = new QueryContext(this, this._ctx, this.state);
		this.enterRule(localctx, 112, cqlParser.RULE_query);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 696;
			this.sourceClause();
			this.state = 698;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 62, this._ctx) ) {
			case 1:
				{
				this.state = 697;
				this.letClause();
				}
				break;
			}
			this.state = 703;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 63, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 700;
					this.queryInclusionClause();
					}
					}
				}
				this.state = 705;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 63, this._ctx);
			}
			this.state = 707;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 64, this._ctx) ) {
			case 1:
				{
				this.state = 706;
				this.whereClause();
				}
				break;
			}
			this.state = 711;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 65, this._ctx) ) {
			case 1:
				{
				this.state = 709;
				this.aggregateClause();
				}
				break;
			case 2:
				{
				this.state = 710;
				this.returnClause();
				}
				break;
			}
			this.state = 714;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 66, this._ctx) ) {
			case 1:
				{
				this.state = 713;
				this.sortClause();
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
	public sourceClause(): SourceClauseContext {
		let localctx: SourceClauseContext = new SourceClauseContext(this, this._ctx, this.state);
		this.enterRule(localctx, 114, cqlParser.RULE_sourceClause);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 717;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===21) {
				{
				this.state = 716;
				this.match(cqlParser.T__20);
				}
			}

			this.state = 719;
			this.aliasedQuerySource();
			this.state = 724;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 68, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 720;
					this.match(cqlParser.T__16);
					this.state = 721;
					this.aliasedQuerySource();
					}
					}
				}
				this.state = 726;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 68, this._ctx);
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
	public letClause(): LetClauseContext {
		let localctx: LetClauseContext = new LetClauseContext(this, this._ctx, this.state);
		this.enterRule(localctx, 116, cqlParser.RULE_letClause);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 727;
			this.match(cqlParser.T__60);
			this.state = 728;
			this.letClauseItem();
			this.state = 733;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 69, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 729;
					this.match(cqlParser.T__16);
					this.state = 730;
					this.letClauseItem();
					}
					}
				}
				this.state = 735;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 69, this._ctx);
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
	public letClauseItem(): LetClauseItemContext {
		let localctx: LetClauseItemContext = new LetClauseItemContext(this, this._ctx, this.state);
		this.enterRule(localctx, 118, cqlParser.RULE_letClauseItem);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 736;
			this.identifier();
			this.state = 737;
			this.match(cqlParser.T__1);
			this.state = 738;
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
	public whereClause(): WhereClauseContext {
		let localctx: WhereClauseContext = new WhereClauseContext(this, this._ctx, this.state);
		this.enterRule(localctx, 120, cqlParser.RULE_whereClause);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 740;
			this.match(cqlParser.T__61);
			this.state = 741;
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
	public returnClause(): ReturnClauseContext {
		let localctx: ReturnClauseContext = new ReturnClauseContext(this, this._ctx, this.state);
		this.enterRule(localctx, 122, cqlParser.RULE_returnClause);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 743;
			this.match(cqlParser.T__62);
			this.state = 745;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 70, this._ctx) ) {
			case 1:
				{
				this.state = 744;
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
			}
			this.state = 747;
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
	public aggregateClause(): AggregateClauseContext {
		let localctx: AggregateClauseContext = new AggregateClauseContext(this, this._ctx, this.state);
		this.enterRule(localctx, 124, cqlParser.RULE_aggregateClause);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 749;
			this.match(cqlParser.T__65);
			this.state = 751;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===64 || _la===65) {
				{
				this.state = 750;
				_la = this._input.LA(1);
				if(!(_la===64 || _la===65)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				}
			}

			this.state = 753;
			this.identifier();
			this.state = 755;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===67) {
				{
				this.state = 754;
				this.startingClause();
				}
			}

			this.state = 757;
			this.match(cqlParser.T__1);
			this.state = 758;
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
	public startingClause(): StartingClauseContext {
		let localctx: StartingClauseContext = new StartingClauseContext(this, this._ctx, this.state);
		this.enterRule(localctx, 126, cqlParser.RULE_startingClause);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 760;
			this.match(cqlParser.T__66);
			this.state = 767;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 73, this._ctx) ) {
			case 1:
				{
				this.state = 761;
				this.simpleLiteral();
				}
				break;
			case 2:
				{
				this.state = 762;
				this.quantity();
				}
				break;
			case 3:
				{
				{
				this.state = 763;
				this.match(cqlParser.T__32);
				this.state = 764;
				this.expression(0);
				this.state = 765;
				this.match(cqlParser.T__33);
				}
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
	public sortClause(): SortClauseContext {
		let localctx: SortClauseContext = new SortClauseContext(this, this._ctx, this.state);
		this.enterRule(localctx, 128, cqlParser.RULE_sortClause);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 769;
			this.match(cqlParser.T__67);
			this.state = 780;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 69:
			case 70:
			case 71:
			case 72:
				{
				this.state = 770;
				this.sortDirection();
				}
				break;
			case 49:
				{
				{
				this.state = 771;
				this.match(cqlParser.T__48);
				this.state = 772;
				this.sortByItem();
				this.state = 777;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 74, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 773;
						this.match(cqlParser.T__16);
						this.state = 774;
						this.sortByItem();
						}
						}
					}
					this.state = 779;
					this._errHandler.sync(this);
					_alt = this._interp.adaptivePredict(this._input, 74, this._ctx);
				}
				}
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
	public sortDirection(): SortDirectionContext {
		let localctx: SortDirectionContext = new SortDirectionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 130, cqlParser.RULE_sortDirection);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 782;
			_la = this._input.LA(1);
			if(!(((((_la - 69)) & ~0x1F) === 0 && ((1 << (_la - 69)) & 15) !== 0))) {
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
	public sortByItem(): SortByItemContext {
		let localctx: SortByItemContext = new SortByItemContext(this, this._ctx, this.state);
		this.enterRule(localctx, 132, cqlParser.RULE_sortByItem);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 784;
			this.expressionTerm(0);
			this.state = 786;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 76, this._ctx) ) {
			case 1:
				{
				this.state = 785;
				this.sortDirection();
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
	public qualifiedIdentifier(): QualifiedIdentifierContext {
		let localctx: QualifiedIdentifierContext = new QualifiedIdentifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 134, cqlParser.RULE_qualifiedIdentifier);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 793;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 77, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 788;
					this.qualifier();
					this.state = 789;
					this.match(cqlParser.T__18);
					}
					}
				}
				this.state = 795;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 77, this._ctx);
			}
			this.state = 796;
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
	public qualifiedIdentifierExpression(): QualifiedIdentifierExpressionContext {
		let localctx: QualifiedIdentifierExpressionContext = new QualifiedIdentifierExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 136, cqlParser.RULE_qualifiedIdentifierExpression);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 803;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 78, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 798;
					this.qualifierExpression();
					this.state = 799;
					this.match(cqlParser.T__18);
					}
					}
				}
				this.state = 805;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 78, this._ctx);
			}
			this.state = 806;
			this.referentialIdentifier();
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
	public qualifierExpression(): QualifierExpressionContext {
		let localctx: QualifierExpressionContext = new QualifierExpressionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 138, cqlParser.RULE_qualifierExpression);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 808;
			this.referentialIdentifier();
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

	public simplePath(): SimplePathContext;
	public simplePath(_p: number): SimplePathContext;
	// @RuleVersion(0)
	public simplePath(_p?: number): SimplePathContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let localctx: SimplePathContext = new SimplePathContext(this, this._ctx, _parentState);
		let _prevctx: SimplePathContext = localctx;
		let _startState: number = 140;
		this.enterRecursionRule(localctx, 140, cqlParser.RULE_simplePath, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			{
			localctx = new SimplePathReferentialIdentifierContext(this, localctx);
			this._ctx = localctx;
			_prevctx = localctx;

			this.state = 811;
			this.referentialIdentifier();
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 823;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 80, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 821;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 79, this._ctx) ) {
					case 1:
						{
						localctx = new SimplePathQualifiedIdentifierContext(this, new SimplePathContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, cqlParser.RULE_simplePath);
						this.state = 813;
						if (!(this.precpred(this._ctx, 2))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 2)");
						}
						this.state = 814;
						this.match(cqlParser.T__18);
						this.state = 815;
						this.referentialIdentifier();
						}
						break;
					case 2:
						{
						localctx = new SimplePathIndexerContext(this, new SimplePathContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, cqlParser.RULE_simplePath);
						this.state = 816;
						if (!(this.precpred(this._ctx, 1))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
						}
						this.state = 817;
						this.match(cqlParser.T__54);
						this.state = 818;
						this.simpleLiteral();
						this.state = 819;
						this.match(cqlParser.T__56);
						}
						break;
					}
					}
				}
				this.state = 825;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 80, this._ctx);
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
	public simpleLiteral(): SimpleLiteralContext {
		let localctx: SimpleLiteralContext = new SimpleLiteralContext(this, this._ctx, this.state);
		this.enterRule(localctx, 142, cqlParser.RULE_simpleLiteral);
		let _la: number;
		try {
			this.state = 828;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 181:
				localctx = new SimpleStringLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 826;
				this.match(cqlParser.STRING);
				}
				break;
			case 182:
			case 183:
				localctx = new SimpleNumberLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 827;
				_la = this._input.LA(1);
				if(!(_la===182 || _la===183)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
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
		let _startState: number = 144;
		this.enterRecursionRule(localctx, 144, cqlParser.RULE_expression, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 861;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 83, this._ctx) ) {
			case 1:
				{
				localctx = new TermExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;

				this.state = 831;
				this.expressionTerm(0);
				}
				break;
			case 2:
				{
				localctx = new RetrieveExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 832;
				this.retrieve();
				}
				break;
			case 3:
				{
				localctx = new QueryExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 833;
				this.query();
				}
				break;
			case 4:
				{
				localctx = new CastExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 834;
				this.match(cqlParser.T__78);
				this.state = 835;
				this.expression(0);
				this.state = 836;
				this.match(cqlParser.T__77);
				this.state = 837;
				this.typeSpecifier();
				}
				break;
			case 5:
				{
				localctx = new NotExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 839;
				this.match(cqlParser.T__73);
				this.state = 840;
				this.expression(13);
				}
				break;
			case 6:
				{
				localctx = new ExistenceExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 841;
				this.match(cqlParser.T__79);
				this.state = 842;
				this.expression(12);
				}
				break;
			case 7:
				{
				localctx = new DurationBetweenExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 845;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===84) {
					{
					this.state = 843;
					this.match(cqlParser.T__83);
					this.state = 844;
					this.match(cqlParser.T__57);
					}
				}

				this.state = 847;
				this.pluralDateTimePrecision();
				this.state = 848;
				this.match(cqlParser.T__81);
				this.state = 849;
				this.expressionTerm(0);
				this.state = 850;
				this.match(cqlParser.T__82);
				this.state = 851;
				this.expressionTerm(0);
				}
				break;
			case 8:
				{
				localctx = new DifferenceBetweenExpressionContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 853;
				this.match(cqlParser.T__84);
				this.state = 854;
				this.match(cqlParser.T__57);
				this.state = 855;
				this.pluralDateTimePrecision();
				this.state = 856;
				this.match(cqlParser.T__81);
				this.state = 857;
				this.expressionTerm(0);
				this.state = 858;
				this.match(cqlParser.T__82);
				this.state = 859;
				this.expressionTerm(0);
				}
				break;
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 917;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 90, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 915;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 89, this._ctx) ) {
					case 1:
						{
						localctx = new InFixSetExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, cqlParser.RULE_expression);
						this.state = 863;
						if (!(this.precpred(this._ctx, 8))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 8)");
						}
						this.state = 864;
						_la = this._input.LA(1);
						if(!(((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & 15) !== 0))) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 869;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (_la===64) {
							{
							this.state = 865;
							this.match(cqlParser.T__63);
							this.state = 867;
							this._errHandler.sync(this);
							_la = this._input.LA(1);
							if (_la===90) {
								{
								this.state = 866;
								this.match(cqlParser.T__89);
								}
							}

							}
						}

						this.state = 871;
						this.expression(9);
						}
						break;
					case 2:
						{
						localctx = new InequalityExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, cqlParser.RULE_expression);
						this.state = 872;
						if (!(this.precpred(this._ctx, 7))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 7)");
						}
						this.state = 873;
						_la = this._input.LA(1);
						if(!(_la===24 || _la===25 || _la===91 || _la===92)) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 874;
						this.expression(8);
						}
						break;
					case 3:
						{
						localctx = new TimingExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, cqlParser.RULE_expression);
						this.state = 875;
						if (!(this.precpred(this._ctx, 6))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 6)");
						}
						this.state = 876;
						this.intervalOperatorPhrase();
						this.state = 877;
						this.expression(7);
						}
						break;
					case 4:
						{
						localctx = new EqualityExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, cqlParser.RULE_expression);
						this.state = 879;
						if (!(this.precpred(this._ctx, 5))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 5)");
						}
						this.state = 880;
						_la = this._input.LA(1);
						if(!(_la===59 || _la===60 || _la===93 || _la===94)) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 881;
						this.expression(6);
						}
						break;
					case 5:
						{
						localctx = new MembershipExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, cqlParser.RULE_expression);
						this.state = 882;
						if (!(this.precpred(this._ctx, 4))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
						}
						this.state = 883;
						_la = this._input.LA(1);
						if(!(_la===58 || ((((_la - 95)) & ~0x1F) === 0 && ((1 << (_la - 95)) & 7) !== 0))) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 885;
						this._errHandler.sync(this);
						switch ( this._interp.adaptivePredict(this._input, 86, this._ctx) ) {
						case 1:
							{
							this.state = 884;
							this.dateTimePrecisionSpecifier();
							}
							break;
						}
						this.state = 887;
						this.expression(5);
						}
						break;
					case 6:
						{
						localctx = new AndExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, cqlParser.RULE_expression);
						this.state = 888;
						if (!(this.precpred(this._ctx, 3))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 3)");
						}
						this.state = 889;
						this.match(cqlParser.T__82);
						this.state = 890;
						this.expression(4);
						}
						break;
					case 7:
						{
						localctx = new OrExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, cqlParser.RULE_expression);
						this.state = 891;
						if (!(this.precpred(this._ctx, 2))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 2)");
						}
						this.state = 892;
						_la = this._input.LA(1);
						if(!(_la===98 || _la===99)) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 893;
						this.expression(3);
						}
						break;
					case 8:
						{
						localctx = new ImpliesExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, cqlParser.RULE_expression);
						this.state = 894;
						if (!(this.precpred(this._ctx, 1))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
						}
						this.state = 895;
						this.match(cqlParser.T__99);
						this.state = 896;
						this.expression(2);
						}
						break;
					case 9:
						{
						localctx = new BooleanExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, cqlParser.RULE_expression);
						this.state = 897;
						if (!(this.precpred(this._ctx, 16))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 16)");
						}
						this.state = 898;
						this.match(cqlParser.T__72);
						this.state = 900;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (_la===74) {
							{
							this.state = 899;
							this.match(cqlParser.T__73);
							}
						}

						this.state = 902;
						_la = this._input.LA(1);
						if(!(((((_la - 75)) & ~0x1F) === 0 && ((1 << (_la - 75)) & 7) !== 0))) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						}
						break;
					case 10:
						{
						localctx = new TypeExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, cqlParser.RULE_expression);
						this.state = 903;
						if (!(this.precpred(this._ctx, 15))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 15)");
						}
						this.state = 904;
						_la = this._input.LA(1);
						if(!(_la===73 || _la===78)) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 905;
						this.typeSpecifier();
						}
						break;
					case 11:
						{
						localctx = new BetweenExpressionContext(this, new ExpressionContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, cqlParser.RULE_expression);
						this.state = 906;
						if (!(this.precpred(this._ctx, 11))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 11)");
						}
						this.state = 908;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (_la===81) {
							{
							this.state = 907;
							this.match(cqlParser.T__80);
							}
						}

						this.state = 910;
						this.match(cqlParser.T__81);
						this.state = 911;
						this.expressionTerm(0);
						this.state = 912;
						this.match(cqlParser.T__82);
						this.state = 913;
						this.expressionTerm(0);
						}
						break;
					}
					}
				}
				this.state = 919;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 90, this._ctx);
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
	public dateTimePrecision(): DateTimePrecisionContext {
		let localctx: DateTimePrecisionContext = new DateTimePrecisionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 146, cqlParser.RULE_dateTimePrecision);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 920;
			_la = this._input.LA(1);
			if(!(((((_la - 101)) & ~0x1F) === 0 && ((1 << (_la - 101)) & 255) !== 0))) {
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
	public dateTimeComponent(): DateTimeComponentContext {
		let localctx: DateTimeComponentContext = new DateTimeComponentContext(this, this._ctx, this.state);
		this.enterRule(localctx, 148, cqlParser.RULE_dateTimeComponent);
		try {
			this.state = 926;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 101:
			case 102:
			case 103:
			case 104:
			case 105:
			case 106:
			case 107:
			case 108:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 922;
				this.dateTimePrecision();
				}
				break;
			case 109:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 923;
				this.match(cqlParser.T__108);
				}
				break;
			case 110:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 924;
				this.match(cqlParser.T__109);
				}
				break;
			case 111:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 925;
				this.match(cqlParser.T__110);
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
	public pluralDateTimePrecision(): PluralDateTimePrecisionContext {
		let localctx: PluralDateTimePrecisionContext = new PluralDateTimePrecisionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 150, cqlParser.RULE_pluralDateTimePrecision);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 928;
			_la = this._input.LA(1);
			if(!(((((_la - 112)) & ~0x1F) === 0 && ((1 << (_la - 112)) & 255) !== 0))) {
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

	public expressionTerm(): ExpressionTermContext;
	public expressionTerm(_p: number): ExpressionTermContext;
	// @RuleVersion(0)
	public expressionTerm(_p?: number): ExpressionTermContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let localctx: ExpressionTermContext = new ExpressionTermContext(this, this._ctx, _parentState);
		let _prevctx: ExpressionTermContext = localctx;
		let _startState: number = 152;
		this.enterRecursionRule(localctx, 152, cqlParser.RULE_expressionTerm, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 1008;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 97, this._ctx) ) {
			case 1:
				{
				localctx = new TermExpressionTermContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;

				this.state = 931;
				this.term();
				}
				break;
			case 2:
				{
				localctx = new ConversionExpressionTermContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 932;
				this.match(cqlParser.T__119);
				this.state = 933;
				this.expression(0);
				this.state = 934;
				this.match(cqlParser.T__47);
				this.state = 937;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 3:
				case 4:
				case 5:
				case 6:
				case 7:
				case 8:
				case 9:
				case 10:
				case 11:
				case 12:
				case 13:
				case 14:
				case 15:
				case 20:
				case 22:
				case 23:
				case 26:
				case 27:
				case 28:
				case 29:
				case 30:
				case 31:
				case 32:
				case 38:
				case 40:
				case 41:
				case 42:
				case 43:
				case 44:
				case 45:
				case 46:
				case 47:
				case 49:
				case 50:
				case 51:
				case 52:
				case 62:
				case 67:
				case 69:
				case 70:
				case 71:
				case 72:
				case 87:
				case 88:
				case 89:
				case 96:
				case 99:
				case 100:
				case 109:
				case 110:
				case 111:
				case 123:
				case 124:
				case 125:
				case 126:
				case 127:
				case 135:
				case 136:
				case 147:
				case 148:
				case 149:
				case 150:
				case 157:
				case 158:
				case 161:
				case 165:
				case 166:
				case 171:
				case 172:
				case 173:
				case 174:
				case 179:
				case 180:
					{
					this.state = 935;
					this.typeSpecifier();
					}
					break;
				case 101:
				case 102:
				case 103:
				case 104:
				case 105:
				case 106:
				case 107:
				case 108:
				case 112:
				case 113:
				case 114:
				case 115:
				case 116:
				case 117:
				case 118:
				case 119:
				case 181:
					{
					this.state = 936;
					this.unit();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				break;
			case 3:
				{
				localctx = new PolarityExpressionTermContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 939;
				_la = this._input.LA(1);
				if(!(_la===121 || _la===122)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 940;
				this.expressionTerm(18);
				}
				break;
			case 4:
				{
				localctx = new TimeBoundaryExpressionTermContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 941;
				_la = this._input.LA(1);
				if(!(_la===123 || _la===124)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 942;
				this.match(cqlParser.T__36);
				this.state = 943;
				this.expressionTerm(17);
				}
				break;
			case 5:
				{
				localctx = new TimeUnitExpressionTermContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 944;
				this.dateTimeComponent();
				this.state = 945;
				this.match(cqlParser.T__20);
				this.state = 946;
				this.expressionTerm(16);
				}
				break;
			case 6:
				{
				localctx = new DurationExpressionTermContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 948;
				this.match(cqlParser.T__83);
				this.state = 949;
				this.match(cqlParser.T__57);
				this.state = 950;
				this.pluralDateTimePrecision();
				this.state = 951;
				this.match(cqlParser.T__36);
				this.state = 952;
				this.expressionTerm(15);
				}
				break;
			case 7:
				{
				localctx = new DifferenceExpressionTermContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 954;
				this.match(cqlParser.T__84);
				this.state = 955;
				this.match(cqlParser.T__57);
				this.state = 956;
				this.pluralDateTimePrecision();
				this.state = 957;
				this.match(cqlParser.T__36);
				this.state = 958;
				this.expressionTerm(14);
				}
				break;
			case 8:
				{
				localctx = new WidthExpressionTermContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 960;
				this.match(cqlParser.T__124);
				this.state = 961;
				this.match(cqlParser.T__36);
				this.state = 962;
				this.expressionTerm(13);
				}
				break;
			case 9:
				{
				localctx = new SuccessorExpressionTermContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 963;
				this.match(cqlParser.T__125);
				this.state = 964;
				this.match(cqlParser.T__36);
				this.state = 965;
				this.expressionTerm(12);
				}
				break;
			case 10:
				{
				localctx = new PredecessorExpressionTermContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 966;
				this.match(cqlParser.T__126);
				this.state = 967;
				this.match(cqlParser.T__36);
				this.state = 968;
				this.expressionTerm(11);
				}
				break;
			case 11:
				{
				localctx = new ElementExtractorExpressionTermContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 969;
				this.match(cqlParser.T__127);
				this.state = 970;
				this.match(cqlParser.T__20);
				this.state = 971;
				this.expressionTerm(10);
				}
				break;
			case 12:
				{
				localctx = new PointExtractorExpressionTermContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 972;
				this.match(cqlParser.T__128);
				this.state = 973;
				this.match(cqlParser.T__20);
				this.state = 974;
				this.expressionTerm(9);
				}
				break;
			case 13:
				{
				localctx = new TypeExtentExpressionTermContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 975;
				_la = this._input.LA(1);
				if(!(_la===130 || _la===131)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 976;
				this.namedTypeSpecifier();
				}
				break;
			case 14:
				{
				localctx = new IfThenElseExpressionTermContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 977;
				this.match(cqlParser.T__137);
				this.state = 978;
				this.expression(0);
				this.state = 979;
				this.match(cqlParser.T__138);
				this.state = 980;
				this.expression(0);
				this.state = 981;
				this.match(cqlParser.T__139);
				this.state = 982;
				this.expression(0);
				}
				break;
			case 15:
				{
				localctx = new CaseExpressionTermContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 984;
				this.match(cqlParser.T__140);
				this.state = 986;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3975282680) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 1084161859) !== 0) || ((((_la - 65)) & ~0x1F) === 0 && ((1 << (_la - 65)) & 2178473717) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 4294967295) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & 1276066993) !== 0) || ((((_la - 165)) & ~0x1F) === 0 && ((1 << (_la - 165)) & 524287) !== 0)) {
					{
					this.state = 985;
					this.expression(0);
					}
				}

				this.state = 989;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 988;
					this.caseExpressionItem();
					}
					}
					this.state = 991;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while (_la===146);
				this.state = 993;
				this.match(cqlParser.T__139);
				this.state = 994;
				this.expression(0);
				this.state = 995;
				this.match(cqlParser.T__123);
				}
				break;
			case 16:
				{
				localctx = new AggregateExpressionTermContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 997;
				_la = this._input.LA(1);
				if(!(_la===65 || _la===142)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 998;
				this.expression(0);
				}
				break;
			case 17:
				{
				localctx = new SetAggregateExpressionTermContext(this, localctx);
				this._ctx = localctx;
				_prevctx = localctx;
				this.state = 999;
				_la = this._input.LA(1);
				if(!(_la===143 || _la===144)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 1000;
				this.expression(0);
				this.state = 1006;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 96, this._ctx) ) {
				case 1:
					{
					this.state = 1001;
					this.match(cqlParser.T__144);
					this.state = 1004;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 95, this._ctx) ) {
					case 1:
						{
						this.state = 1002;
						this.dateTimePrecision();
						}
						break;
					case 2:
						{
						this.state = 1003;
						this.expression(0);
						}
						break;
					}
					}
					break;
				}
				}
				break;
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 1029;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 99, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 1027;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 98, this._ctx) ) {
					case 1:
						{
						localctx = new PowerExpressionTermContext(this, new ExpressionTermContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, cqlParser.RULE_expressionTerm);
						this.state = 1010;
						if (!(this.precpred(this._ctx, 7))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 7)");
						}
						this.state = 1011;
						this.match(cqlParser.T__131);
						this.state = 1012;
						this.expressionTerm(8);
						}
						break;
					case 2:
						{
						localctx = new MultiplicationExpressionTermContext(this, new ExpressionTermContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, cqlParser.RULE_expressionTerm);
						this.state = 1013;
						if (!(this.precpred(this._ctx, 6))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 6)");
						}
						this.state = 1014;
						_la = this._input.LA(1);
						if(!(((((_la - 133)) & ~0x1F) === 0 && ((1 << (_la - 133)) & 15) !== 0))) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 1015;
						this.expressionTerm(7);
						}
						break;
					case 3:
						{
						localctx = new AdditionExpressionTermContext(this, new ExpressionTermContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, cqlParser.RULE_expressionTerm);
						this.state = 1016;
						if (!(this.precpred(this._ctx, 5))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 5)");
						}
						this.state = 1017;
						_la = this._input.LA(1);
						if(!(((((_la - 121)) & ~0x1F) === 0 && ((1 << (_la - 121)) & 65539) !== 0))) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 1018;
						this.expressionTerm(6);
						}
						break;
					case 4:
						{
						localctx = new InvocationExpressionTermContext(this, new ExpressionTermContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, cqlParser.RULE_expressionTerm);
						this.state = 1019;
						if (!(this.precpred(this._ctx, 21))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 21)");
						}
						this.state = 1020;
						this.match(cqlParser.T__18);
						this.state = 1021;
						this.qualifiedInvocation();
						}
						break;
					case 5:
						{
						localctx = new IndexedExpressionTermContext(this, new ExpressionTermContext(this, _parentctx, _parentState));
						this.pushNewRecursionContext(localctx, _startState, cqlParser.RULE_expressionTerm);
						this.state = 1022;
						if (!(this.precpred(this._ctx, 20))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 20)");
						}
						this.state = 1023;
						this.match(cqlParser.T__54);
						this.state = 1024;
						this.expression(0);
						this.state = 1025;
						this.match(cqlParser.T__56);
						}
						break;
					}
					}
				}
				this.state = 1031;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 99, this._ctx);
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
	public caseExpressionItem(): CaseExpressionItemContext {
		let localctx: CaseExpressionItemContext = new CaseExpressionItemContext(this, this._ctx, this.state);
		this.enterRule(localctx, 154, cqlParser.RULE_caseExpressionItem);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 1032;
			this.match(cqlParser.T__145);
			this.state = 1033;
			this.expression(0);
			this.state = 1034;
			this.match(cqlParser.T__138);
			this.state = 1035;
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
	public dateTimePrecisionSpecifier(): DateTimePrecisionSpecifierContext {
		let localctx: DateTimePrecisionSpecifierContext = new DateTimePrecisionSpecifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 156, cqlParser.RULE_dateTimePrecisionSpecifier);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 1037;
			this.dateTimePrecision();
			this.state = 1038;
			this.match(cqlParser.T__36);
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
	public relativeQualifier(): RelativeQualifierContext {
		let localctx: RelativeQualifierContext = new RelativeQualifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 158, cqlParser.RULE_relativeQualifier);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 1040;
			_la = this._input.LA(1);
			if(!(_la===147 || _la===148)) {
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
	public offsetRelativeQualifier(): OffsetRelativeQualifierContext {
		let localctx: OffsetRelativeQualifierContext = new OffsetRelativeQualifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 160, cqlParser.RULE_offsetRelativeQualifier);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 1042;
			_la = this._input.LA(1);
			if(!(_la===149 || _la===150)) {
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
	public exclusiveRelativeQualifier(): ExclusiveRelativeQualifierContext {
		let localctx: ExclusiveRelativeQualifierContext = new ExclusiveRelativeQualifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 162, cqlParser.RULE_exclusiveRelativeQualifier);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 1044;
			_la = this._input.LA(1);
			if(!(_la===151 || _la===152)) {
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
	public quantityOffset(): QuantityOffsetContext {
		let localctx: QuantityOffsetContext = new QuantityOffsetContext(this, this._ctx, this.state);
		this.enterRule(localctx, 164, cqlParser.RULE_quantityOffset);
		let _la: number;
		try {
			this.state = 1053;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 182:
			case 183:
				this.enterOuterAlt(localctx, 1);
				{
				{
				this.state = 1046;
				this.quantity();
				this.state = 1048;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===149 || _la===150) {
					{
					this.state = 1047;
					this.offsetRelativeQualifier();
					}
				}

				}
				}
				break;
			case 151:
			case 152:
				this.enterOuterAlt(localctx, 2);
				{
				{
				this.state = 1050;
				this.exclusiveRelativeQualifier();
				this.state = 1051;
				this.quantity();
				}
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
	public temporalRelationship(): TemporalRelationshipContext {
		let localctx: TemporalRelationshipContext = new TemporalRelationshipContext(this, this._ctx, this.state);
		this.enterRule(localctx, 166, cqlParser.RULE_temporalRelationship);
		let _la: number;
		try {
			this.state = 1063;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 104, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				{
				this.state = 1056;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===153) {
					{
					this.state = 1055;
					this.match(cqlParser.T__152);
					}
				}

				this.state = 1058;
				_la = this._input.LA(1);
				if(!(_la===154 || _la===155)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				}
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				{
				this.state = 1059;
				_la = this._input.LA(1);
				if(!(_la===154 || _la===155)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 1061;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===156) {
					{
					this.state = 1060;
					this.match(cqlParser.T__155);
					}
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
	public intervalOperatorPhrase(): IntervalOperatorPhraseContext {
		let localctx: IntervalOperatorPhraseContext = new IntervalOperatorPhraseContext(this, this._ctx, this.state);
		this.enterRule(localctx, 168, cqlParser.RULE_intervalOperatorPhrase);
		let _la: number;
		try {
			this.state = 1146;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 128, this._ctx) ) {
			case 1:
				localctx = new ConcurrentWithIntervalOperatorPhraseContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 1066;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 157)) & ~0x1F) === 0 && ((1 << (_la - 157)) & 7) !== 0)) {
					{
					this.state = 1065;
					_la = this._input.LA(1);
					if(!(((((_la - 157)) & ~0x1F) === 0 && ((1 << (_la - 157)) & 7) !== 0))) {
					this._errHandler.recoverInline(this);
					}
					else {
						this._errHandler.reportMatch(this);
					    this.consume();
					}
					}
				}

				this.state = 1068;
				this.match(cqlParser.T__159);
				this.state = 1070;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 101)) & ~0x1F) === 0 && ((1 << (_la - 101)) & 255) !== 0)) {
					{
					this.state = 1069;
					this.dateTimePrecision();
					}
				}

				this.state = 1074;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 147:
				case 148:
					{
					this.state = 1072;
					this.relativeQualifier();
					}
					break;
				case 78:
					{
					this.state = 1073;
					this.match(cqlParser.T__77);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 1077;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 108, this._ctx) ) {
				case 1:
					{
					this.state = 1076;
					_la = this._input.LA(1);
					if(!(_la===123 || _la===124)) {
					this._errHandler.recoverInline(this);
					}
					else {
						this._errHandler.reportMatch(this);
					    this.consume();
					}
					}
					break;
				}
				}
				break;
			case 2:
				localctx = new IncludesIntervalOperatorPhraseContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 1080;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===81) {
					{
					this.state = 1079;
					this.match(cqlParser.T__80);
					}
				}

				this.state = 1082;
				this.match(cqlParser.T__160);
				this.state = 1084;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 110, this._ctx) ) {
				case 1:
					{
					this.state = 1083;
					this.dateTimePrecisionSpecifier();
					}
					break;
				}
				this.state = 1087;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 111, this._ctx) ) {
				case 1:
					{
					this.state = 1086;
					_la = this._input.LA(1);
					if(!(_la===123 || _la===124)) {
					this._errHandler.recoverInline(this);
					}
					else {
						this._errHandler.reportMatch(this);
					    this.consume();
					}
					}
					break;
				}
				}
				break;
			case 3:
				localctx = new IncludedInIntervalOperatorPhraseContext(this, localctx);
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 1090;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 157)) & ~0x1F) === 0 && ((1 << (_la - 157)) & 7) !== 0)) {
					{
					this.state = 1089;
					_la = this._input.LA(1);
					if(!(((((_la - 157)) & ~0x1F) === 0 && ((1 << (_la - 157)) & 7) !== 0))) {
					this._errHandler.recoverInline(this);
					}
					else {
						this._errHandler.reportMatch(this);
					    this.consume();
					}
					}
				}

				this.state = 1093;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===81) {
					{
					this.state = 1092;
					this.match(cqlParser.T__80);
					}
				}

				this.state = 1095;
				_la = this._input.LA(1);
				if(!(_la===162 || _la===163)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 1097;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 114, this._ctx) ) {
				case 1:
					{
					this.state = 1096;
					this.dateTimePrecisionSpecifier();
					}
					break;
				}
				}
				break;
			case 4:
				localctx = new BeforeOrAfterIntervalOperatorPhraseContext(this, localctx);
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 1100;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 157)) & ~0x1F) === 0 && ((1 << (_la - 157)) & 7) !== 0)) {
					{
					this.state = 1099;
					_la = this._input.LA(1);
					if(!(((((_la - 157)) & ~0x1F) === 0 && ((1 << (_la - 157)) & 7) !== 0))) {
					this._errHandler.recoverInline(this);
					}
					else {
						this._errHandler.reportMatch(this);
					    this.consume();
					}
					}
				}

				this.state = 1103;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 151)) & ~0x1F) === 0 && ((1 << (_la - 151)) & 2147483651) !== 0) || _la===183) {
					{
					this.state = 1102;
					this.quantityOffset();
					}
				}

				this.state = 1105;
				this.temporalRelationship();
				this.state = 1107;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 117, this._ctx) ) {
				case 1:
					{
					this.state = 1106;
					this.dateTimePrecisionSpecifier();
					}
					break;
				}
				this.state = 1110;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 118, this._ctx) ) {
				case 1:
					{
					this.state = 1109;
					_la = this._input.LA(1);
					if(!(_la===123 || _la===124)) {
					this._errHandler.recoverInline(this);
					}
					else {
						this._errHandler.reportMatch(this);
					    this.consume();
					}
					}
					break;
				}
				}
				break;
			case 5:
				localctx = new WithinIntervalOperatorPhraseContext(this, localctx);
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 1113;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 157)) & ~0x1F) === 0 && ((1 << (_la - 157)) & 7) !== 0)) {
					{
					this.state = 1112;
					_la = this._input.LA(1);
					if(!(((((_la - 157)) & ~0x1F) === 0 && ((1 << (_la - 157)) & 7) !== 0))) {
					this._errHandler.recoverInline(this);
					}
					else {
						this._errHandler.reportMatch(this);
					    this.consume();
					}
					}
				}

				this.state = 1116;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===81) {
					{
					this.state = 1115;
					this.match(cqlParser.T__80);
					}
				}

				this.state = 1118;
				this.match(cqlParser.T__163);
				this.state = 1119;
				this.quantity();
				this.state = 1120;
				this.match(cqlParser.T__36);
				this.state = 1122;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 121, this._ctx) ) {
				case 1:
					{
					this.state = 1121;
					_la = this._input.LA(1);
					if(!(_la===123 || _la===124)) {
					this._errHandler.recoverInline(this);
					}
					else {
						this._errHandler.reportMatch(this);
					    this.consume();
					}
					}
					break;
				}
				}
				break;
			case 6:
				localctx = new MeetsIntervalOperatorPhraseContext(this, localctx);
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 1124;
				this.match(cqlParser.T__164);
				this.state = 1126;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===154 || _la===155) {
					{
					this.state = 1125;
					_la = this._input.LA(1);
					if(!(_la===154 || _la===155)) {
					this._errHandler.recoverInline(this);
					}
					else {
						this._errHandler.reportMatch(this);
					    this.consume();
					}
					}
				}

				this.state = 1129;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 123, this._ctx) ) {
				case 1:
					{
					this.state = 1128;
					this.dateTimePrecisionSpecifier();
					}
					break;
				}
				}
				break;
			case 7:
				localctx = new OverlapsIntervalOperatorPhraseContext(this, localctx);
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 1131;
				this.match(cqlParser.T__165);
				this.state = 1133;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===154 || _la===155) {
					{
					this.state = 1132;
					_la = this._input.LA(1);
					if(!(_la===154 || _la===155)) {
					this._errHandler.recoverInline(this);
					}
					else {
						this._errHandler.reportMatch(this);
					    this.consume();
					}
					}
				}

				this.state = 1136;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 125, this._ctx) ) {
				case 1:
					{
					this.state = 1135;
					this.dateTimePrecisionSpecifier();
					}
					break;
				}
				}
				break;
			case 8:
				localctx = new StartsIntervalOperatorPhraseContext(this, localctx);
				this.enterOuterAlt(localctx, 8);
				{
				this.state = 1138;
				this.match(cqlParser.T__156);
				this.state = 1140;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 126, this._ctx) ) {
				case 1:
					{
					this.state = 1139;
					this.dateTimePrecisionSpecifier();
					}
					break;
				}
				}
				break;
			case 9:
				localctx = new EndsIntervalOperatorPhraseContext(this, localctx);
				this.enterOuterAlt(localctx, 9);
				{
				this.state = 1142;
				this.match(cqlParser.T__157);
				this.state = 1144;
				this._errHandler.sync(this);
				switch ( this._interp.adaptivePredict(this._input, 127, this._ctx) ) {
				case 1:
					{
					this.state = 1143;
					this.dateTimePrecisionSpecifier();
					}
					break;
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
	public term(): TermContext {
		let localctx: TermContext = new TermContext(this, this._ctx, this.state);
		this.enterRule(localctx, 170, cqlParser.RULE_term);
		try {
			this.state = 1161;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 129, this._ctx) ) {
			case 1:
				localctx = new InvocationTermContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 1148;
				this.invocation();
				}
				break;
			case 2:
				localctx = new LiteralTermContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 1149;
				this.literal();
				}
				break;
			case 3:
				localctx = new ExternalConstantTermContext(this, localctx);
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 1150;
				this.externalConstant();
				}
				break;
			case 4:
				localctx = new IntervalSelectorTermContext(this, localctx);
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 1151;
				this.intervalSelector();
				}
				break;
			case 5:
				localctx = new TupleSelectorTermContext(this, localctx);
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 1152;
				this.tupleSelector();
				}
				break;
			case 6:
				localctx = new InstanceSelectorTermContext(this, localctx);
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 1153;
				this.instanceSelector();
				}
				break;
			case 7:
				localctx = new ListSelectorTermContext(this, localctx);
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 1154;
				this.listSelector();
				}
				break;
			case 8:
				localctx = new CodeSelectorTermContext(this, localctx);
				this.enterOuterAlt(localctx, 8);
				{
				this.state = 1155;
				this.codeSelector();
				}
				break;
			case 9:
				localctx = new ConceptSelectorTermContext(this, localctx);
				this.enterOuterAlt(localctx, 9);
				{
				this.state = 1156;
				this.conceptSelector();
				}
				break;
			case 10:
				localctx = new ParenthesizedTermContext(this, localctx);
				this.enterOuterAlt(localctx, 10);
				{
				this.state = 1157;
				this.match(cqlParser.T__32);
				this.state = 1158;
				this.expression(0);
				this.state = 1159;
				this.match(cqlParser.T__33);
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
	public qualifiedInvocation(): QualifiedInvocationContext {
		let localctx: QualifiedInvocationContext = new QualifiedInvocationContext(this, this._ctx, this.state);
		this.enterRule(localctx, 172, cqlParser.RULE_qualifiedInvocation);
		try {
			this.state = 1165;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 130, this._ctx) ) {
			case 1:
				localctx = new QualifiedMemberInvocationContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 1163;
				this.referentialIdentifier();
				}
				break;
			case 2:
				localctx = new QualifiedFunctionInvocationContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 1164;
				this.qualifiedFunction();
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
	public qualifiedFunction(): QualifiedFunctionContext {
		let localctx: QualifiedFunctionContext = new QualifiedFunctionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 174, cqlParser.RULE_qualifiedFunction);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 1167;
			this.identifierOrFunctionIdentifier();
			this.state = 1168;
			this.match(cqlParser.T__32);
			this.state = 1170;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3975282680) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 1084161859) !== 0) || ((((_la - 65)) & ~0x1F) === 0 && ((1 << (_la - 65)) & 2178473717) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 4294967295) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & 1276066993) !== 0) || ((((_la - 165)) & ~0x1F) === 0 && ((1 << (_la - 165)) & 524287) !== 0)) {
				{
				this.state = 1169;
				this.paramList();
				}
			}

			this.state = 1172;
			this.match(cqlParser.T__33);
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
		this.enterRule(localctx, 176, cqlParser.RULE_invocation);
		try {
			this.state = 1179;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 132, this._ctx) ) {
			case 1:
				localctx = new MemberInvocationContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 1174;
				this.referentialIdentifier();
				}
				break;
			case 2:
				localctx = new FunctionInvocationContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 1175;
				this.function_();
				}
				break;
			case 3:
				localctx = new ThisInvocationContext(this, localctx);
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 1176;
				this.match(cqlParser.T__166);
				}
				break;
			case 4:
				localctx = new IndexInvocationContext(this, localctx);
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 1177;
				this.match(cqlParser.T__167);
				}
				break;
			case 5:
				localctx = new TotalInvocationContext(this, localctx);
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 1178;
				this.match(cqlParser.T__168);
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
		this.enterRule(localctx, 178, cqlParser.RULE_function);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 1181;
			this.referentialIdentifier();
			this.state = 1182;
			this.match(cqlParser.T__32);
			this.state = 1184;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3975282680) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 1084161859) !== 0) || ((((_la - 65)) & ~0x1F) === 0 && ((1 << (_la - 65)) & 2178473717) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 4294967295) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & 1276066993) !== 0) || ((((_la - 165)) & ~0x1F) === 0 && ((1 << (_la - 165)) & 524287) !== 0)) {
				{
				this.state = 1183;
				this.paramList();
				}
			}

			this.state = 1186;
			this.match(cqlParser.T__33);
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
	public ratio(): RatioContext {
		let localctx: RatioContext = new RatioContext(this, this._ctx, this.state);
		this.enterRule(localctx, 180, cqlParser.RULE_ratio);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 1188;
			this.quantity();
			this.state = 1189;
			this.match(cqlParser.T__1);
			this.state = 1190;
			this.quantity();
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
		this.enterRule(localctx, 182, cqlParser.RULE_literal);
		let _la: number;
		try {
			this.state = 1202;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 134, this._ctx) ) {
			case 1:
				localctx = new BooleanLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 1192;
				_la = this._input.LA(1);
				if(!(_la===76 || _la===77)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				}
				break;
			case 2:
				localctx = new NullLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 1193;
				this.match(cqlParser.T__74);
				}
				break;
			case 3:
				localctx = new StringLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 1194;
				this.match(cqlParser.STRING);
				}
				break;
			case 4:
				localctx = new NumberLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 1195;
				_la = this._input.LA(1);
				if(!(_la===182 || _la===183)) {
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
				this.state = 1196;
				this.match(cqlParser.LONGNUMBER);
				}
				break;
			case 6:
				localctx = new DateTimeLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 1197;
				this.match(cqlParser.DATETIME);
				}
				break;
			case 7:
				localctx = new DateLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 1198;
				this.match(cqlParser.DATE);
				}
				break;
			case 8:
				localctx = new TimeLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 8);
				{
				this.state = 1199;
				this.match(cqlParser.TIME);
				}
				break;
			case 9:
				localctx = new QuantityLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 9);
				{
				this.state = 1200;
				this.quantity();
				}
				break;
			case 10:
				localctx = new RatioLiteralContext(this, localctx);
				this.enterOuterAlt(localctx, 10);
				{
				this.state = 1201;
				this.ratio();
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
		this.enterRule(localctx, 184, cqlParser.RULE_externalConstant);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 1204;
			this.match(cqlParser.T__169);
			this.state = 1208;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 3:
			case 4:
			case 5:
			case 6:
			case 7:
			case 8:
			case 9:
			case 10:
			case 11:
			case 12:
			case 13:
			case 14:
			case 15:
			case 20:
			case 22:
			case 29:
			case 30:
			case 31:
			case 32:
			case 38:
			case 40:
			case 41:
			case 42:
			case 43:
			case 44:
			case 45:
			case 46:
			case 47:
			case 49:
			case 50:
			case 51:
			case 52:
			case 62:
			case 67:
			case 69:
			case 70:
			case 71:
			case 72:
			case 87:
			case 88:
			case 89:
			case 96:
			case 99:
			case 100:
			case 109:
			case 110:
			case 111:
			case 123:
			case 124:
			case 125:
			case 126:
			case 127:
			case 135:
			case 136:
			case 147:
			case 148:
			case 149:
			case 150:
			case 157:
			case 158:
			case 161:
			case 165:
			case 166:
			case 171:
				{
				this.state = 1205;
				this.keywordIdentifier();
				}
				break;
			case 174:
			case 179:
			case 180:
				{
				this.state = 1206;
				this.identifier();
				}
				break;
			case 181:
				{
				this.state = 1207;
				this.match(cqlParser.STRING);
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
	public intervalSelector(): IntervalSelectorContext {
		let localctx: IntervalSelectorContext = new IntervalSelectorContext(this, this._ctx, this.state);
		this.enterRule(localctx, 186, cqlParser.RULE_intervalSelector);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 1210;
			this.match(cqlParser.T__25);
			this.state = 1211;
			_la = this._input.LA(1);
			if(!(_la===33 || _la===55)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 1212;
			this.expression(0);
			this.state = 1213;
			this.match(cqlParser.T__16);
			this.state = 1214;
			this.expression(0);
			this.state = 1215;
			_la = this._input.LA(1);
			if(!(_la===34 || _la===57)) {
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
	public tupleSelector(): TupleSelectorContext {
		let localctx: TupleSelectorContext = new TupleSelectorContext(this, this._ctx, this.state);
		this.enterRule(localctx, 188, cqlParser.RULE_tupleSelector);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 1218;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===27) {
				{
				this.state = 1217;
				this.match(cqlParser.T__26);
				}
			}

			this.state = 1220;
			this.match(cqlParser.T__15);
			this.state = 1230;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 2:
				{
				this.state = 1221;
				this.match(cqlParser.T__1);
				}
				break;
			case 3:
			case 4:
			case 5:
			case 6:
			case 7:
			case 8:
			case 9:
			case 10:
			case 11:
			case 12:
			case 13:
			case 14:
			case 15:
			case 20:
			case 22:
			case 29:
			case 30:
			case 31:
			case 32:
			case 38:
			case 40:
			case 41:
			case 42:
			case 43:
			case 44:
			case 45:
			case 46:
			case 47:
			case 49:
			case 50:
			case 51:
			case 52:
			case 62:
			case 67:
			case 69:
			case 70:
			case 71:
			case 72:
			case 87:
			case 88:
			case 89:
			case 96:
			case 99:
			case 100:
			case 109:
			case 110:
			case 111:
			case 123:
			case 124:
			case 125:
			case 126:
			case 127:
			case 135:
			case 136:
			case 147:
			case 148:
			case 149:
			case 150:
			case 157:
			case 158:
			case 161:
			case 165:
			case 166:
			case 171:
			case 174:
			case 179:
			case 180:
				{
				{
				this.state = 1222;
				this.tupleElementSelector();
				this.state = 1227;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===17) {
					{
					{
					this.state = 1223;
					this.match(cqlParser.T__16);
					this.state = 1224;
					this.tupleElementSelector();
					}
					}
					this.state = 1229;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 1232;
			this.match(cqlParser.T__17);
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
	public tupleElementSelector(): TupleElementSelectorContext {
		let localctx: TupleElementSelectorContext = new TupleElementSelectorContext(this, this._ctx, this.state);
		this.enterRule(localctx, 190, cqlParser.RULE_tupleElementSelector);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 1234;
			this.referentialIdentifier();
			this.state = 1235;
			this.match(cqlParser.T__1);
			this.state = 1236;
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
	public instanceSelector(): InstanceSelectorContext {
		let localctx: InstanceSelectorContext = new InstanceSelectorContext(this, this._ctx, this.state);
		this.enterRule(localctx, 192, cqlParser.RULE_instanceSelector);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 1238;
			this.namedTypeSpecifier();
			this.state = 1239;
			this.match(cqlParser.T__15);
			this.state = 1249;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 2:
				{
				this.state = 1240;
				this.match(cqlParser.T__1);
				}
				break;
			case 3:
			case 4:
			case 5:
			case 6:
			case 7:
			case 8:
			case 9:
			case 10:
			case 11:
			case 12:
			case 13:
			case 14:
			case 15:
			case 20:
			case 22:
			case 29:
			case 30:
			case 31:
			case 32:
			case 38:
			case 40:
			case 41:
			case 42:
			case 43:
			case 44:
			case 45:
			case 46:
			case 47:
			case 49:
			case 50:
			case 51:
			case 52:
			case 62:
			case 67:
			case 69:
			case 70:
			case 71:
			case 72:
			case 87:
			case 88:
			case 89:
			case 96:
			case 99:
			case 100:
			case 109:
			case 110:
			case 111:
			case 123:
			case 124:
			case 125:
			case 126:
			case 127:
			case 135:
			case 136:
			case 147:
			case 148:
			case 149:
			case 150:
			case 157:
			case 158:
			case 161:
			case 165:
			case 166:
			case 171:
			case 174:
			case 179:
			case 180:
				{
				{
				this.state = 1241;
				this.instanceElementSelector();
				this.state = 1246;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===17) {
					{
					{
					this.state = 1242;
					this.match(cqlParser.T__16);
					this.state = 1243;
					this.instanceElementSelector();
					}
					}
					this.state = 1248;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 1251;
			this.match(cqlParser.T__17);
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
		this.enterRule(localctx, 194, cqlParser.RULE_instanceElementSelector);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 1253;
			this.referentialIdentifier();
			this.state = 1254;
			this.match(cqlParser.T__1);
			this.state = 1255;
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
	public listSelector(): ListSelectorContext {
		let localctx: ListSelectorContext = new ListSelectorContext(this, this._ctx, this.state);
		this.enterRule(localctx, 196, cqlParser.RULE_listSelector);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 1264;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===23) {
				{
				this.state = 1257;
				this.match(cqlParser.T__22);
				this.state = 1262;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===24) {
					{
					this.state = 1258;
					this.match(cqlParser.T__23);
					this.state = 1259;
					this.typeSpecifier();
					this.state = 1260;
					this.match(cqlParser.T__24);
					}
				}

				}
			}

			this.state = 1266;
			this.match(cqlParser.T__15);
			this.state = 1275;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3975282680) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 1084161859) !== 0) || ((((_la - 65)) & ~0x1F) === 0 && ((1 << (_la - 65)) & 2178473717) !== 0) || ((((_la - 99)) & ~0x1F) === 0 && ((1 << (_la - 99)) & 4294967295) !== 0) || ((((_la - 131)) & ~0x1F) === 0 && ((1 << (_la - 131)) & 1276066993) !== 0) || ((((_la - 165)) & ~0x1F) === 0 && ((1 << (_la - 165)) & 524287) !== 0)) {
				{
				this.state = 1267;
				this.expression(0);
				this.state = 1272;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===17) {
					{
					{
					this.state = 1268;
					this.match(cqlParser.T__16);
					this.state = 1269;
					this.expression(0);
					}
					}
					this.state = 1274;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
			}

			this.state = 1277;
			this.match(cqlParser.T__17);
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
	public displayClause(): DisplayClauseContext {
		let localctx: DisplayClauseContext = new DisplayClauseContext(this, this._ctx, this.state);
		this.enterRule(localctx, 198, cqlParser.RULE_displayClause);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 1279;
			this.match(cqlParser.T__170);
			this.state = 1280;
			this.match(cqlParser.STRING);
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
	public codeSelector(): CodeSelectorContext {
		let localctx: CodeSelectorContext = new CodeSelectorContext(this, this._ctx, this.state);
		this.enterRule(localctx, 200, cqlParser.RULE_codeSelector);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 1282;
			this.match(cqlParser.T__171);
			this.state = 1283;
			this.match(cqlParser.STRING);
			this.state = 1284;
			this.match(cqlParser.T__20);
			this.state = 1285;
			this.codesystemIdentifier();
			this.state = 1287;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 145, this._ctx) ) {
			case 1:
				{
				this.state = 1286;
				this.displayClause();
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
	public conceptSelector(): ConceptSelectorContext {
		let localctx: ConceptSelectorContext = new ConceptSelectorContext(this, this._ctx, this.state);
		this.enterRule(localctx, 202, cqlParser.RULE_conceptSelector);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 1289;
			this.match(cqlParser.T__172);
			this.state = 1290;
			this.match(cqlParser.T__15);
			this.state = 1299;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===172) {
				{
				this.state = 1291;
				this.codeSelector();
				this.state = 1296;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===17) {
					{
					{
					this.state = 1292;
					this.match(cqlParser.T__16);
					this.state = 1293;
					this.codeSelector();
					}
					}
					this.state = 1298;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
			}

			this.state = 1301;
			this.match(cqlParser.T__17);
			this.state = 1303;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 148, this._ctx) ) {
			case 1:
				{
				this.state = 1302;
				this.displayClause();
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
	public keyword(): KeywordContext {
		let localctx: KeywordContext = new KeywordContext(this, this._ctx, this.state);
		this.enterRule(localctx, 204, cqlParser.RULE_keyword);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 1305;
			_la = this._input.LA(1);
			if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 3975217144) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 3833593825) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 2277507071) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & 4194303999) !== 0) || ((((_la - 128)) & ~0x1F) === 0 && ((1 << (_la - 128)) & 4269800847) !== 0) || ((((_la - 160)) & ~0x1F) === 0 && ((1 << (_la - 160)) & 14463) !== 0))) {
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
	public reservedWord(): ReservedWordContext {
		let localctx: ReservedWordContext = new ReservedWordContext(this, this._ctx, this.state);
		this.enterRule(localctx, 206, cqlParser.RULE_reservedWord);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 1307;
			_la = this._input.LA(1);
			if(!(((((_la - 21)) & ~0x1F) === 0 && ((1 << (_la - 21)) & 134545509) !== 0) || ((((_la - 53)) & ~0x1F) === 0 && ((1 << (_la - 53)) & 4293967139) !== 0) || ((((_la - 85)) & ~0x1F) === 0 && ((1 << (_la - 85)) & 4177469441) !== 0) || ((((_la - 117)) & ~0x1F) === 0 && ((1 << (_la - 117)) & 1071675407) !== 0) || ((((_la - 153)) & ~0x1F) === 0 && ((1 << (_la - 153)) & 1576655) !== 0))) {
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
	public keywordIdentifier(): KeywordIdentifierContext {
		let localctx: KeywordIdentifierContext = new KeywordIdentifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 208, cqlParser.RULE_keywordIdentifier);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 1309;
			_la = this._input.LA(1);
			if(!(((((_la - 3)) & ~0x1F) === 0 && ((1 << (_la - 3)) & 1007296511) !== 0) || ((((_la - 38)) & ~0x1F) === 0 && ((1 << (_la - 38)) & 2701163517) !== 0) || ((((_la - 70)) & ~0x1F) === 0 && ((1 << (_la - 70)) & 1678639111) !== 0) || ((((_la - 109)) & ~0x1F) === 0 && ((1 << (_la - 109)) & 201834503) !== 0) || ((((_la - 147)) & ~0x1F) === 0 && ((1 << (_la - 147)) & 17583119) !== 0))) {
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
	public obsoleteIdentifier(): ObsoleteIdentifierContext {
		let localctx: ObsoleteIdentifierContext = new ObsoleteIdentifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 210, cqlParser.RULE_obsoleteIdentifier);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 1311;
			_la = this._input.LA(1);
			if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 5242896) !== 0) || ((((_la - 62)) & ~0x1F) === 0 && ((1 << (_la - 62)) & 266253) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & 402710529) !== 0) || ((((_la - 171)) & ~0x1F) === 0 && ((1 << (_la - 171)) & 7) !== 0))) {
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
	public functionIdentifier(): FunctionIdentifierContext {
		let localctx: FunctionIdentifierContext = new FunctionIdentifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 212, cqlParser.RULE_functionIdentifier);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 1313;
			_la = this._input.LA(1);
			if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 3975217144) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 3833593825) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 130023423) !== 0) || ((((_la - 96)) & ~0x1F) === 0 && ((1 << (_la - 96)) & 4194303997) !== 0) || ((((_la - 128)) & ~0x1F) === 0 && ((1 << (_la - 128)) & 3967810959) !== 0) || ((((_la - 160)) & ~0x1F) === 0 && ((1 << (_la - 160)) & 14463) !== 0))) {
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
	public typeNameIdentifier(): TypeNameIdentifierContext {
		let localctx: TypeNameIdentifierContext = new TypeNameIdentifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 214, cqlParser.RULE_typeNameIdentifier);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 1315;
			_la = this._input.LA(1);
			if(!(_la===109 || _la===110 || _la===172 || _la===173)) {
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
	public referentialIdentifier(): ReferentialIdentifierContext {
		let localctx: ReferentialIdentifierContext = new ReferentialIdentifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 216, cqlParser.RULE_referentialIdentifier);
		try {
			this.state = 1319;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 174:
			case 179:
			case 180:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 1317;
				this.identifier();
				}
				break;
			case 3:
			case 4:
			case 5:
			case 6:
			case 7:
			case 8:
			case 9:
			case 10:
			case 11:
			case 12:
			case 13:
			case 14:
			case 15:
			case 20:
			case 22:
			case 29:
			case 30:
			case 31:
			case 32:
			case 38:
			case 40:
			case 41:
			case 42:
			case 43:
			case 44:
			case 45:
			case 46:
			case 47:
			case 49:
			case 50:
			case 51:
			case 52:
			case 62:
			case 67:
			case 69:
			case 70:
			case 71:
			case 72:
			case 87:
			case 88:
			case 89:
			case 96:
			case 99:
			case 100:
			case 109:
			case 110:
			case 111:
			case 123:
			case 124:
			case 125:
			case 126:
			case 127:
			case 135:
			case 136:
			case 147:
			case 148:
			case 149:
			case 150:
			case 157:
			case 158:
			case 161:
			case 165:
			case 166:
			case 171:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 1318;
				this.keywordIdentifier();
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
	public referentialOrTypeNameIdentifier(): ReferentialOrTypeNameIdentifierContext {
		let localctx: ReferentialOrTypeNameIdentifierContext = new ReferentialOrTypeNameIdentifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 218, cqlParser.RULE_referentialOrTypeNameIdentifier);
		try {
			this.state = 1323;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 150, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 1321;
				this.referentialIdentifier();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 1322;
				this.typeNameIdentifier();
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
	public identifierOrFunctionIdentifier(): IdentifierOrFunctionIdentifierContext {
		let localctx: IdentifierOrFunctionIdentifierContext = new IdentifierOrFunctionIdentifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 220, cqlParser.RULE_identifierOrFunctionIdentifier);
		try {
			this.state = 1327;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 174:
			case 179:
			case 180:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 1325;
				this.identifier();
				}
				break;
			case 3:
			case 4:
			case 5:
			case 6:
			case 7:
			case 8:
			case 9:
			case 10:
			case 11:
			case 12:
			case 13:
			case 14:
			case 15:
			case 20:
			case 21:
			case 22:
			case 23:
			case 26:
			case 27:
			case 29:
			case 30:
			case 31:
			case 32:
			case 37:
			case 38:
			case 39:
			case 40:
			case 41:
			case 42:
			case 43:
			case 44:
			case 45:
			case 46:
			case 47:
			case 48:
			case 49:
			case 50:
			case 51:
			case 52:
			case 53:
			case 54:
			case 58:
			case 61:
			case 62:
			case 63:
			case 64:
			case 65:
			case 66:
			case 67:
			case 68:
			case 69:
			case 70:
			case 71:
			case 72:
			case 73:
			case 74:
			case 75:
			case 76:
			case 77:
			case 78:
			case 79:
			case 80:
			case 81:
			case 82:
			case 83:
			case 84:
			case 85:
			case 87:
			case 88:
			case 89:
			case 90:
			case 96:
			case 98:
			case 99:
			case 100:
			case 101:
			case 102:
			case 103:
			case 104:
			case 105:
			case 106:
			case 107:
			case 108:
			case 109:
			case 110:
			case 111:
			case 112:
			case 113:
			case 114:
			case 115:
			case 116:
			case 117:
			case 118:
			case 119:
			case 120:
			case 123:
			case 124:
			case 125:
			case 126:
			case 127:
			case 128:
			case 129:
			case 130:
			case 131:
			case 135:
			case 136:
			case 138:
			case 139:
			case 140:
			case 141:
			case 142:
			case 143:
			case 144:
			case 145:
			case 146:
			case 147:
			case 148:
			case 149:
			case 150:
			case 154:
			case 155:
			case 157:
			case 158:
			case 159:
			case 160:
			case 161:
			case 162:
			case 163:
			case 164:
			case 165:
			case 166:
			case 171:
			case 172:
			case 173:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 1326;
				this.functionIdentifier();
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
	public identifier(): IdentifierContext {
		let localctx: IdentifierContext = new IdentifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 222, cqlParser.RULE_identifier);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 1329;
			_la = this._input.LA(1);
			if(!(((((_la - 174)) & ~0x1F) === 0 && ((1 << (_la - 174)) & 97) !== 0))) {
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
		this.enterRule(localctx, 224, cqlParser.RULE_entireExpression);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 1331;
			this.expression(0);
			this.state = 1332;
			this.match(cqlParser.EOF);
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
		this.enterRule(localctx, 226, cqlParser.RULE_sortArgument);
		let _la: number;
		try {
			localctx = new SortDirectionArgumentContext(this, localctx);
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 1334;
			this.expression(0);
			this.state = 1336;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===69 || _la===71) {
				{
				this.state = 1335;
				_la = this._input.LA(1);
				if(!(_la===69 || _la===71)) {
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
		this.enterRule(localctx, 228, cqlParser.RULE_paramList);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 1338;
			this.expression(0);
			this.state = 1343;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===17) {
				{
				{
				this.state = 1339;
				this.match(cqlParser.T__16);
				this.state = 1340;
				this.expression(0);
				}
				}
				this.state = 1345;
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
		this.enterRule(localctx, 230, cqlParser.RULE_quantity);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 1346;
			_la = this._input.LA(1);
			if(!(_la===182 || _la===183)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 1348;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 154, this._ctx) ) {
			case 1:
				{
				this.state = 1347;
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
		this.enterRule(localctx, 232, cqlParser.RULE_unit);
		try {
			this.state = 1353;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 101:
			case 102:
			case 103:
			case 104:
			case 105:
			case 106:
			case 107:
			case 108:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 1350;
				this.dateTimePrecision();
				}
				break;
			case 112:
			case 113:
			case 114:
			case 115:
			case 116:
			case 117:
			case 118:
			case 119:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 1351;
				this.pluralDateTimePrecision();
				}
				break;
			case 181:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 1352;
				this.match(cqlParser.STRING);
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

	public sempred(localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 70:
			return this.simplePath_sempred(localctx as SimplePathContext, predIndex);
		case 72:
			return this.expression_sempred(localctx as ExpressionContext, predIndex);
		case 76:
			return this.expressionTerm_sempred(localctx as ExpressionTermContext, predIndex);
		}
		return true;
	}
	private simplePath_sempred(localctx: SimplePathContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 2);
		case 1:
			return this.precpred(this._ctx, 1);
		}
		return true;
	}
	private expression_sempred(localctx: ExpressionContext, predIndex: number): boolean {
		switch (predIndex) {
		case 2:
			return this.precpred(this._ctx, 8);
		case 3:
			return this.precpred(this._ctx, 7);
		case 4:
			return this.precpred(this._ctx, 6);
		case 5:
			return this.precpred(this._ctx, 5);
		case 6:
			return this.precpred(this._ctx, 4);
		case 7:
			return this.precpred(this._ctx, 3);
		case 8:
			return this.precpred(this._ctx, 2);
		case 9:
			return this.precpred(this._ctx, 1);
		case 10:
			return this.precpred(this._ctx, 16);
		case 11:
			return this.precpred(this._ctx, 15);
		case 12:
			return this.precpred(this._ctx, 11);
		}
		return true;
	}
	private expressionTerm_sempred(localctx: ExpressionTermContext, predIndex: number): boolean {
		switch (predIndex) {
		case 13:
			return this.precpred(this._ctx, 7);
		case 14:
			return this.precpred(this._ctx, 6);
		case 15:
			return this.precpred(this._ctx, 5);
		case 16:
			return this.precpred(this._ctx, 21);
		case 17:
			return this.precpred(this._ctx, 20);
		}
		return true;
	}

	public static readonly _serializedATN: number[] = [4,1,186,1356,2,0,7,0,
	2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,
	2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,
	17,7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,
	7,24,2,25,7,25,2,26,7,26,2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,
	31,2,32,7,32,2,33,7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,
	2,39,7,39,2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,45,2,
	46,7,46,2,47,7,47,2,48,7,48,2,49,7,49,2,50,7,50,2,51,7,51,2,52,7,52,2,53,
	7,53,2,54,7,54,2,55,7,55,2,56,7,56,2,57,7,57,2,58,7,58,2,59,7,59,2,60,7,
	60,2,61,7,61,2,62,7,62,2,63,7,63,2,64,7,64,2,65,7,65,2,66,7,66,2,67,7,67,
	2,68,7,68,2,69,7,69,2,70,7,70,2,71,7,71,2,72,7,72,2,73,7,73,2,74,7,74,2,
	75,7,75,2,76,7,76,2,77,7,77,2,78,7,78,2,79,7,79,2,80,7,80,2,81,7,81,2,82,
	7,82,2,83,7,83,2,84,7,84,2,85,7,85,2,86,7,86,2,87,7,87,2,88,7,88,2,89,7,
	89,2,90,7,90,2,91,7,91,2,92,7,92,2,93,7,93,2,94,7,94,2,95,7,95,2,96,7,96,
	2,97,7,97,2,98,7,98,2,99,7,99,2,100,7,100,2,101,7,101,2,102,7,102,2,103,
	7,103,2,104,7,104,2,105,7,105,2,106,7,106,2,107,7,107,2,108,7,108,2,109,
	7,109,2,110,7,110,2,111,7,111,2,112,7,112,2,113,7,113,2,114,7,114,2,115,
	7,115,2,116,7,116,1,0,5,0,236,8,0,10,0,12,0,239,9,0,1,0,3,0,242,8,0,1,0,
	5,0,245,8,0,10,0,12,0,248,9,0,1,0,5,0,251,8,0,10,0,12,0,254,9,0,1,0,1,0,
	1,1,1,1,1,1,1,1,3,1,262,8,1,1,2,1,2,1,2,1,2,1,2,1,2,1,2,3,2,271,8,2,1,3,
	1,3,1,3,1,3,3,3,277,8,3,1,4,1,4,1,4,1,4,3,4,283,8,4,1,4,1,4,3,4,287,8,4,
	1,5,1,5,1,5,1,5,3,5,293,8,5,1,5,1,5,3,5,297,8,5,1,5,1,5,3,5,301,8,5,1,6,
	1,6,1,7,1,7,1,8,3,8,308,8,8,1,8,1,8,1,8,3,8,313,8,8,1,8,1,8,3,8,317,8,8,
	1,9,3,9,320,8,9,1,9,1,9,1,9,1,9,1,9,1,9,3,9,328,8,9,1,10,3,10,331,8,10,
	1,10,1,10,1,10,1,10,1,10,1,10,3,10,339,8,10,1,10,3,10,342,8,10,1,11,1,11,
	1,11,1,11,1,11,5,11,349,8,11,10,11,12,11,352,9,11,1,11,1,11,1,12,1,12,1,
	12,3,12,359,8,12,1,12,1,12,1,13,1,13,1,14,3,14,366,8,14,1,14,1,14,1,14,
	1,14,1,14,1,14,1,14,3,14,375,8,14,1,15,3,15,378,8,15,1,15,1,15,1,15,1,15,
	1,15,1,15,1,15,5,15,387,8,15,10,15,12,15,390,9,15,3,15,392,8,15,1,15,1,
	15,3,15,396,8,15,1,16,1,16,1,16,3,16,401,8,16,1,16,1,16,1,17,1,17,1,18,
	1,18,1,19,1,19,1,20,1,20,1,21,1,21,1,21,1,21,1,21,3,21,418,8,21,1,22,1,
	22,1,22,5,22,423,8,22,10,22,12,22,426,9,22,1,22,1,22,1,23,1,23,1,24,1,24,
	1,24,1,24,1,24,1,25,1,25,1,25,1,25,1,25,1,26,1,26,1,26,1,26,1,26,5,26,447,
	8,26,10,26,12,26,450,9,26,3,26,452,8,26,1,26,1,26,1,27,1,27,1,27,1,28,1,
	28,1,28,1,28,1,28,5,28,464,8,28,10,28,12,28,467,9,28,1,28,1,28,1,29,1,29,
	1,29,1,29,1,29,1,29,3,29,477,8,29,1,30,1,30,3,30,481,8,30,1,30,1,30,1,30,
	1,30,1,31,1,31,1,31,1,31,3,31,491,8,31,1,31,1,31,1,32,1,32,3,32,497,8,32,
	1,32,3,32,500,8,32,1,32,1,32,1,32,1,32,1,32,1,32,5,32,508,8,32,10,32,12,
	32,511,9,32,3,32,513,8,32,1,32,1,32,1,32,3,32,518,8,32,1,32,1,32,1,32,3,
	32,523,8,32,1,33,1,33,1,33,1,34,1,34,1,35,1,35,1,35,5,35,533,8,35,10,35,
	12,35,536,9,35,1,35,1,35,1,36,1,36,1,36,1,36,1,36,1,36,1,36,1,36,1,36,1,
	36,1,36,1,36,5,36,552,8,36,10,36,12,36,555,9,36,1,36,1,36,1,37,1,37,3,37,
	561,8,37,1,37,1,37,1,37,3,37,566,8,37,1,37,3,37,569,8,37,1,37,1,37,5,37,
	573,8,37,10,37,12,37,576,9,37,1,38,1,38,1,38,1,39,1,39,1,39,1,39,5,39,585,
	8,39,10,39,12,39,588,9,39,1,39,1,39,1,40,1,40,1,40,1,41,1,41,3,41,597,8,
	41,1,41,1,41,3,41,601,8,41,1,41,3,41,604,8,41,1,41,1,41,1,41,1,41,3,41,
	610,8,41,1,42,1,42,1,42,1,42,1,42,1,42,1,42,1,42,5,42,620,8,42,10,42,12,
	42,623,9,42,1,42,1,42,1,43,1,43,3,43,629,8,43,1,43,1,43,1,43,1,43,1,43,
	1,43,1,43,1,43,1,43,1,44,1,44,1,44,1,44,1,44,1,44,3,44,646,8,44,1,45,1,
	45,1,45,1,46,1,46,1,47,1,47,3,47,655,8,47,1,48,1,48,1,48,1,48,1,48,1,49,
	1,49,1,49,1,49,1,49,1,50,1,50,1,50,1,50,3,50,671,8,50,1,50,1,50,1,50,1,
	50,1,50,3,50,678,8,50,1,50,3,50,681,8,50,1,50,1,50,1,51,1,51,1,52,1,52,
	1,53,1,53,1,54,1,54,3,54,693,8,54,1,55,1,55,1,56,1,56,3,56,699,8,56,1,56,
	5,56,702,8,56,10,56,12,56,705,9,56,1,56,3,56,708,8,56,1,56,1,56,3,56,712,
	8,56,1,56,3,56,715,8,56,1,57,3,57,718,8,57,1,57,1,57,1,57,5,57,723,8,57,
	10,57,12,57,726,9,57,1,58,1,58,1,58,1,58,5,58,732,8,58,10,58,12,58,735,
	9,58,1,59,1,59,1,59,1,59,1,60,1,60,1,60,1,61,1,61,3,61,746,8,61,1,61,1,
	61,1,62,1,62,3,62,752,8,62,1,62,1,62,3,62,756,8,62,1,62,1,62,1,62,1,63,
	1,63,1,63,1,63,1,63,1,63,1,63,3,63,768,8,63,1,64,1,64,1,64,1,64,1,64,1,
	64,5,64,776,8,64,10,64,12,64,779,9,64,3,64,781,8,64,1,65,1,65,1,66,1,66,
	3,66,787,8,66,1,67,1,67,1,67,5,67,792,8,67,10,67,12,67,795,9,67,1,67,1,
	67,1,68,1,68,1,68,5,68,802,8,68,10,68,12,68,805,9,68,1,68,1,68,1,69,1,69,
	1,70,1,70,1,70,1,70,1,70,1,70,1,70,1,70,1,70,1,70,1,70,5,70,822,8,70,10,
	70,12,70,825,9,70,1,71,1,71,3,71,829,8,71,1,72,1,72,1,72,1,72,1,72,1,72,
	1,72,1,72,1,72,1,72,1,72,1,72,1,72,1,72,1,72,3,72,846,8,72,1,72,1,72,1,
	72,1,72,1,72,1,72,1,72,1,72,1,72,1,72,1,72,1,72,1,72,1,72,3,72,862,8,72,
	1,72,1,72,1,72,1,72,3,72,868,8,72,3,72,870,8,72,1,72,1,72,1,72,1,72,1,72,
	1,72,1,72,1,72,1,72,1,72,1,72,1,72,1,72,1,72,3,72,886,8,72,1,72,1,72,1,
	72,1,72,1,72,1,72,1,72,1,72,1,72,1,72,1,72,1,72,1,72,3,72,901,8,72,1,72,
	1,72,1,72,1,72,1,72,1,72,3,72,909,8,72,1,72,1,72,1,72,1,72,1,72,5,72,916,
	8,72,10,72,12,72,919,9,72,1,73,1,73,1,74,1,74,1,74,1,74,3,74,927,8,74,1,
	75,1,75,1,76,1,76,1,76,1,76,1,76,1,76,1,76,3,76,938,8,76,1,76,1,76,1,76,
	1,76,1,76,1,76,1,76,1,76,1,76,1,76,1,76,1,76,1,76,1,76,1,76,1,76,1,76,1,
	76,1,76,1,76,1,76,1,76,1,76,1,76,1,76,1,76,1,76,1,76,1,76,1,76,1,76,1,76,
	1,76,1,76,1,76,1,76,1,76,1,76,1,76,1,76,1,76,1,76,1,76,1,76,1,76,1,76,1,
	76,3,76,987,8,76,1,76,4,76,990,8,76,11,76,12,76,991,1,76,1,76,1,76,1,76,
	1,76,1,76,1,76,1,76,1,76,1,76,1,76,3,76,1005,8,76,3,76,1007,8,76,3,76,1009,
	8,76,1,76,1,76,1,76,1,76,1,76,1,76,1,76,1,76,1,76,1,76,1,76,1,76,1,76,1,
	76,1,76,1,76,1,76,5,76,1028,8,76,10,76,12,76,1031,9,76,1,77,1,77,1,77,1,
	77,1,77,1,78,1,78,1,78,1,79,1,79,1,80,1,80,1,81,1,81,1,82,1,82,3,82,1049,
	8,82,1,82,1,82,1,82,3,82,1054,8,82,1,83,3,83,1057,8,83,1,83,1,83,1,83,3,
	83,1062,8,83,3,83,1064,8,83,1,84,3,84,1067,8,84,1,84,1,84,3,84,1071,8,84,
	1,84,1,84,3,84,1075,8,84,1,84,3,84,1078,8,84,1,84,3,84,1081,8,84,1,84,1,
	84,3,84,1085,8,84,1,84,3,84,1088,8,84,1,84,3,84,1091,8,84,1,84,3,84,1094,
	8,84,1,84,1,84,3,84,1098,8,84,1,84,3,84,1101,8,84,1,84,3,84,1104,8,84,1,
	84,1,84,3,84,1108,8,84,1,84,3,84,1111,8,84,1,84,3,84,1114,8,84,1,84,3,84,
	1117,8,84,1,84,1,84,1,84,1,84,3,84,1123,8,84,1,84,1,84,3,84,1127,8,84,1,
	84,3,84,1130,8,84,1,84,1,84,3,84,1134,8,84,1,84,3,84,1137,8,84,1,84,1,84,
	3,84,1141,8,84,1,84,1,84,3,84,1145,8,84,3,84,1147,8,84,1,85,1,85,1,85,1,
	85,1,85,1,85,1,85,1,85,1,85,1,85,1,85,1,85,1,85,3,85,1162,8,85,1,86,1,86,
	3,86,1166,8,86,1,87,1,87,1,87,3,87,1171,8,87,1,87,1,87,1,88,1,88,1,88,1,
	88,1,88,3,88,1180,8,88,1,89,1,89,1,89,3,89,1185,8,89,1,89,1,89,1,90,1,90,
	1,90,1,90,1,91,1,91,1,91,1,91,1,91,1,91,1,91,1,91,1,91,1,91,3,91,1203,8,
	91,1,92,1,92,1,92,1,92,3,92,1209,8,92,1,93,1,93,1,93,1,93,1,93,1,93,1,93,
	1,94,3,94,1219,8,94,1,94,1,94,1,94,1,94,1,94,5,94,1226,8,94,10,94,12,94,
	1229,9,94,3,94,1231,8,94,1,94,1,94,1,95,1,95,1,95,1,95,1,96,1,96,1,96,1,
	96,1,96,1,96,5,96,1245,8,96,10,96,12,96,1248,9,96,3,96,1250,8,96,1,96,1,
	96,1,97,1,97,1,97,1,97,1,98,1,98,1,98,1,98,1,98,3,98,1263,8,98,3,98,1265,
	8,98,1,98,1,98,1,98,1,98,5,98,1271,8,98,10,98,12,98,1274,9,98,3,98,1276,
	8,98,1,98,1,98,1,99,1,99,1,99,1,100,1,100,1,100,1,100,1,100,3,100,1288,
	8,100,1,101,1,101,1,101,1,101,1,101,5,101,1295,8,101,10,101,12,101,1298,
	9,101,3,101,1300,8,101,1,101,1,101,3,101,1304,8,101,1,102,1,102,1,103,1,
	103,1,104,1,104,1,105,1,105,1,106,1,106,1,107,1,107,1,108,1,108,3,108,1320,
	8,108,1,109,1,109,3,109,1324,8,109,1,110,1,110,3,110,1328,8,110,1,111,1,
	111,1,112,1,112,1,112,1,113,1,113,3,113,1337,8,113,1,114,1,114,1,114,5,
	114,1342,8,114,10,114,12,114,1345,9,114,1,115,1,115,3,115,1349,8,115,1,
	116,1,116,1,116,3,116,1354,8,116,1,116,0,3,140,144,152,117,0,2,4,6,8,10,
	12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,
	60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,98,100,102,104,
	106,108,110,112,114,116,118,120,122,124,126,128,130,132,134,136,138,140,
	142,144,146,148,150,152,154,156,158,160,162,164,166,168,170,172,174,176,
	178,180,182,184,186,188,190,192,194,196,198,200,202,204,206,208,210,212,
	214,216,218,220,222,224,226,228,230,232,0,39,1,0,9,10,1,0,50,51,1,0,58,
	60,1,0,64,65,1,0,69,72,1,0,182,183,1,0,86,89,2,0,24,25,91,92,2,0,59,60,
	93,94,2,0,58,58,95,97,1,0,98,99,1,0,75,77,2,0,73,73,78,78,1,0,101,108,1,
	0,112,119,1,0,121,122,1,0,123,124,1,0,130,131,2,0,65,65,142,142,1,0,143,
	144,1,0,133,136,2,0,121,122,137,137,1,0,147,148,1,0,149,150,1,0,151,152,
	1,0,154,155,1,0,157,159,1,0,162,163,1,0,76,77,2,0,33,33,55,55,2,0,34,34,
	57,57,14,0,3,15,20,23,26,27,29,32,37,54,58,58,61,85,87,90,95,120,123,131,
	135,136,138,150,153,166,171,173,21,0,21,21,23,23,26,27,37,37,39,39,48,48,
	53,54,58,58,61,61,63,66,68,68,73,85,98,98,101,108,112,120,128,131,138,146,
	153,156,159,160,162,164,172,173,21,0,3,15,20,20,22,22,29,32,38,38,40,47,
	49,52,62,62,67,67,69,72,87,89,96,96,99,100,109,111,123,127,135,136,147,
	150,157,158,161,161,165,166,171,171,11,0,4,4,20,20,22,22,62,62,64,65,74,
	74,80,80,96,96,109,111,123,124,171,173,16,0,3,15,20,23,26,27,29,32,37,54,
	58,58,61,85,87,90,96,96,98,120,123,131,135,136,138,150,154,155,157,166,
	171,173,2,0,109,110,172,173,2,0,174,174,179,180,2,0,69,69,71,71,1472,0,
	237,1,0,0,0,2,257,1,0,0,0,4,270,1,0,0,0,6,272,1,0,0,0,8,278,1,0,0,0,10,
	288,1,0,0,0,12,302,1,0,0,0,14,304,1,0,0,0,16,307,1,0,0,0,18,319,1,0,0,0,
	20,330,1,0,0,0,22,343,1,0,0,0,24,358,1,0,0,0,26,362,1,0,0,0,28,365,1,0,
	0,0,30,377,1,0,0,0,32,400,1,0,0,0,34,404,1,0,0,0,36,406,1,0,0,0,38,408,
	1,0,0,0,40,410,1,0,0,0,42,417,1,0,0,0,44,424,1,0,0,0,46,429,1,0,0,0,48,
	431,1,0,0,0,50,436,1,0,0,0,52,441,1,0,0,0,54,455,1,0,0,0,56,458,1,0,0,0,
	58,476,1,0,0,0,60,478,1,0,0,0,62,486,1,0,0,0,64,494,1,0,0,0,66,524,1,0,
	0,0,68,527,1,0,0,0,70,534,1,0,0,0,72,539,1,0,0,0,74,558,1,0,0,0,76,577,
	1,0,0,0,78,580,1,0,0,0,80,591,1,0,0,0,82,596,1,0,0,0,84,611,1,0,0,0,86,
	626,1,0,0,0,88,645,1,0,0,0,90,647,1,0,0,0,92,650,1,0,0,0,94,654,1,0,0,0,
	96,656,1,0,0,0,98,661,1,0,0,0,100,666,1,0,0,0,102,684,1,0,0,0,104,686,1,
	0,0,0,106,688,1,0,0,0,108,692,1,0,0,0,110,694,1,0,0,0,112,696,1,0,0,0,114,
	717,1,0,0,0,116,727,1,0,0,0,118,736,1,0,0,0,120,740,1,0,0,0,122,743,1,0,
	0,0,124,749,1,0,0,0,126,760,1,0,0,0,128,769,1,0,0,0,130,782,1,0,0,0,132,
	784,1,0,0,0,134,793,1,0,0,0,136,803,1,0,0,0,138,808,1,0,0,0,140,810,1,0,
	0,0,142,828,1,0,0,0,144,861,1,0,0,0,146,920,1,0,0,0,148,926,1,0,0,0,150,
	928,1,0,0,0,152,1008,1,0,0,0,154,1032,1,0,0,0,156,1037,1,0,0,0,158,1040,
	1,0,0,0,160,1042,1,0,0,0,162,1044,1,0,0,0,164,1053,1,0,0,0,166,1063,1,0,
	0,0,168,1146,1,0,0,0,170,1161,1,0,0,0,172,1165,1,0,0,0,174,1167,1,0,0,0,
	176,1179,1,0,0,0,178,1181,1,0,0,0,180,1188,1,0,0,0,182,1202,1,0,0,0,184,
	1204,1,0,0,0,186,1210,1,0,0,0,188,1218,1,0,0,0,190,1234,1,0,0,0,192,1238,
	1,0,0,0,194,1253,1,0,0,0,196,1264,1,0,0,0,198,1279,1,0,0,0,200,1282,1,0,
	0,0,202,1289,1,0,0,0,204,1305,1,0,0,0,206,1307,1,0,0,0,208,1309,1,0,0,0,
	210,1311,1,0,0,0,212,1313,1,0,0,0,214,1315,1,0,0,0,216,1319,1,0,0,0,218,
	1323,1,0,0,0,220,1327,1,0,0,0,222,1329,1,0,0,0,224,1331,1,0,0,0,226,1334,
	1,0,0,0,228,1338,1,0,0,0,230,1346,1,0,0,0,232,1353,1,0,0,0,234,236,3,2,
	1,0,235,234,1,0,0,0,236,239,1,0,0,0,237,235,1,0,0,0,237,238,1,0,0,0,238,
	241,1,0,0,0,239,237,1,0,0,0,240,242,3,6,3,0,241,240,1,0,0,0,241,242,1,0,
	0,0,242,246,1,0,0,0,243,245,3,4,2,0,244,243,1,0,0,0,245,248,1,0,0,0,246,
	244,1,0,0,0,246,247,1,0,0,0,247,252,1,0,0,0,248,246,1,0,0,0,249,251,3,58,
	29,0,250,249,1,0,0,0,251,254,1,0,0,0,252,250,1,0,0,0,252,253,1,0,0,0,253,
	255,1,0,0,0,254,252,1,0,0,0,255,256,5,0,0,1,256,1,1,0,0,0,257,258,5,1,0,
	0,258,261,3,222,111,0,259,260,5,2,0,0,260,262,5,181,0,0,261,259,1,0,0,0,
	261,262,1,0,0,0,262,3,1,0,0,0,263,271,3,8,4,0,264,271,3,10,5,0,265,271,
	3,18,9,0,266,271,3,20,10,0,267,271,3,28,14,0,268,271,3,30,15,0,269,271,
	3,16,8,0,270,263,1,0,0,0,270,264,1,0,0,0,270,265,1,0,0,0,270,266,1,0,0,
	0,270,267,1,0,0,0,270,268,1,0,0,0,270,269,1,0,0,0,271,5,1,0,0,0,272,273,
	5,3,0,0,273,276,3,134,67,0,274,275,5,4,0,0,275,277,3,38,19,0,276,274,1,
	0,0,0,276,277,1,0,0,0,277,7,1,0,0,0,278,279,5,5,0,0,279,282,3,134,67,0,
	280,281,5,4,0,0,281,283,3,38,19,0,282,280,1,0,0,0,282,283,1,0,0,0,283,286,
	1,0,0,0,284,285,5,6,0,0,285,287,3,12,6,0,286,284,1,0,0,0,286,287,1,0,0,
	0,287,9,1,0,0,0,288,289,5,7,0,0,289,292,3,134,67,0,290,291,5,4,0,0,291,
	293,3,38,19,0,292,290,1,0,0,0,292,293,1,0,0,0,293,296,1,0,0,0,294,295,5,
	6,0,0,295,297,3,12,6,0,296,294,1,0,0,0,296,297,1,0,0,0,297,300,1,0,0,0,
	298,299,5,8,0,0,299,301,3,188,94,0,300,298,1,0,0,0,300,301,1,0,0,0,301,
	11,1,0,0,0,302,303,3,222,111,0,303,13,1,0,0,0,304,305,7,0,0,0,305,15,1,
	0,0,0,306,308,3,14,7,0,307,306,1,0,0,0,307,308,1,0,0,0,308,309,1,0,0,0,
	309,310,5,11,0,0,310,312,3,222,111,0,311,313,3,42,21,0,312,311,1,0,0,0,
	312,313,1,0,0,0,313,316,1,0,0,0,314,315,5,12,0,0,315,317,3,144,72,0,316,
	314,1,0,0,0,316,317,1,0,0,0,317,17,1,0,0,0,318,320,3,14,7,0,319,318,1,0,
	0,0,319,320,1,0,0,0,320,321,1,0,0,0,321,322,5,13,0,0,322,323,3,222,111,
	0,323,324,5,2,0,0,324,327,3,34,17,0,325,326,5,4,0,0,326,328,3,38,19,0,327,
	325,1,0,0,0,327,328,1,0,0,0,328,19,1,0,0,0,329,331,3,14,7,0,330,329,1,0,
	0,0,330,331,1,0,0,0,331,332,1,0,0,0,332,333,5,14,0,0,333,334,3,222,111,
	0,334,335,5,2,0,0,335,338,3,36,18,0,336,337,5,4,0,0,337,339,3,38,19,0,338,
	336,1,0,0,0,338,339,1,0,0,0,339,341,1,0,0,0,340,342,3,22,11,0,341,340,1,
	0,0,0,341,342,1,0,0,0,342,21,1,0,0,0,343,344,5,15,0,0,344,345,5,16,0,0,
	345,350,3,24,12,0,346,347,5,17,0,0,347,349,3,24,12,0,348,346,1,0,0,0,349,
	352,1,0,0,0,350,348,1,0,0,0,350,351,1,0,0,0,351,353,1,0,0,0,352,350,1,0,
	0,0,353,354,5,18,0,0,354,23,1,0,0,0,355,356,3,26,13,0,356,357,5,19,0,0,
	357,359,1,0,0,0,358,355,1,0,0,0,358,359,1,0,0,0,359,360,1,0,0,0,360,361,
	3,222,111,0,361,25,1,0,0,0,362,363,3,222,111,0,363,27,1,0,0,0,364,366,3,
	14,7,0,365,364,1,0,0,0,365,366,1,0,0,0,366,367,1,0,0,0,367,368,5,20,0,0,
	368,369,3,222,111,0,369,370,5,2,0,0,370,371,3,40,20,0,371,372,5,21,0,0,
	372,374,3,24,12,0,373,375,3,198,99,0,374,373,1,0,0,0,374,375,1,0,0,0,375,
	29,1,0,0,0,376,378,3,14,7,0,377,376,1,0,0,0,377,378,1,0,0,0,378,379,1,0,
	0,0,379,380,5,22,0,0,380,381,3,222,111,0,381,382,5,2,0,0,382,391,5,16,0,
	0,383,388,3,32,16,0,384,385,5,17,0,0,385,387,3,32,16,0,386,384,1,0,0,0,
	387,390,1,0,0,0,388,386,1,0,0,0,388,389,1,0,0,0,389,392,1,0,0,0,390,388,
	1,0,0,0,391,383,1,0,0,0,391,392,1,0,0,0,392,393,1,0,0,0,393,395,5,18,0,
	0,394,396,3,198,99,0,395,394,1,0,0,0,395,396,1,0,0,0,396,31,1,0,0,0,397,
	398,3,26,13,0,398,399,5,19,0,0,399,401,1,0,0,0,400,397,1,0,0,0,400,401,
	1,0,0,0,401,402,1,0,0,0,402,403,3,222,111,0,403,33,1,0,0,0,404,405,5,181,
	0,0,405,35,1,0,0,0,406,407,5,181,0,0,407,37,1,0,0,0,408,409,5,181,0,0,409,
	39,1,0,0,0,410,411,5,181,0,0,411,41,1,0,0,0,412,418,3,44,22,0,413,418,3,
	48,24,0,414,418,3,50,25,0,415,418,3,52,26,0,416,418,3,56,28,0,417,412,1,
	0,0,0,417,413,1,0,0,0,417,414,1,0,0,0,417,415,1,0,0,0,417,416,1,0,0,0,418,
	43,1,0,0,0,419,420,3,110,55,0,420,421,5,19,0,0,421,423,1,0,0,0,422,419,
	1,0,0,0,423,426,1,0,0,0,424,422,1,0,0,0,424,425,1,0,0,0,425,427,1,0,0,0,
	426,424,1,0,0,0,427,428,3,218,109,0,428,45,1,0,0,0,429,430,3,222,111,0,
	430,47,1,0,0,0,431,432,5,23,0,0,432,433,5,24,0,0,433,434,3,42,21,0,434,
	435,5,25,0,0,435,49,1,0,0,0,436,437,5,26,0,0,437,438,5,24,0,0,438,439,3,
	42,21,0,439,440,5,25,0,0,440,51,1,0,0,0,441,442,5,27,0,0,442,451,5,16,0,
	0,443,448,3,54,27,0,444,445,5,17,0,0,445,447,3,54,27,0,446,444,1,0,0,0,
	447,450,1,0,0,0,448,446,1,0,0,0,448,449,1,0,0,0,449,452,1,0,0,0,450,448,
	1,0,0,0,451,443,1,0,0,0,451,452,1,0,0,0,452,453,1,0,0,0,453,454,5,18,0,
	0,454,53,1,0,0,0,455,456,3,216,108,0,456,457,3,42,21,0,457,55,1,0,0,0,458,
	459,5,28,0,0,459,460,5,24,0,0,460,465,3,42,21,0,461,462,5,17,0,0,462,464,
	3,42,21,0,463,461,1,0,0,0,464,467,1,0,0,0,465,463,1,0,0,0,465,466,1,0,0,
	0,466,468,1,0,0,0,467,465,1,0,0,0,468,469,5,25,0,0,469,57,1,0,0,0,470,477,
	3,60,30,0,471,477,3,62,31,0,472,477,3,64,32,0,473,477,3,72,36,0,474,477,
	3,74,37,0,475,477,3,86,43,0,476,470,1,0,0,0,476,471,1,0,0,0,476,472,1,0,
	0,0,476,473,1,0,0,0,476,474,1,0,0,0,476,475,1,0,0,0,477,59,1,0,0,0,478,
	480,5,29,0,0,479,481,3,14,7,0,480,479,1,0,0,0,480,481,1,0,0,0,481,482,1,
	0,0,0,482,483,3,222,111,0,483,484,5,2,0,0,484,485,3,144,72,0,485,61,1,0,
	0,0,486,490,5,30,0,0,487,488,3,46,23,0,488,489,5,19,0,0,489,491,1,0,0,0,
	490,487,1,0,0,0,490,491,1,0,0,0,491,492,1,0,0,0,492,493,3,222,111,0,493,
	63,1,0,0,0,494,496,5,29,0,0,495,497,3,14,7,0,496,495,1,0,0,0,496,497,1,
	0,0,0,497,499,1,0,0,0,498,500,5,31,0,0,499,498,1,0,0,0,499,500,1,0,0,0,
	500,501,1,0,0,0,501,502,5,32,0,0,502,503,3,220,110,0,503,512,5,33,0,0,504,
	509,3,66,33,0,505,506,5,17,0,0,506,508,3,66,33,0,507,505,1,0,0,0,508,511,
	1,0,0,0,509,507,1,0,0,0,509,510,1,0,0,0,510,513,1,0,0,0,511,509,1,0,0,0,
	512,504,1,0,0,0,512,513,1,0,0,0,513,514,1,0,0,0,514,517,5,34,0,0,515,516,
	5,35,0,0,516,518,3,42,21,0,517,515,1,0,0,0,517,518,1,0,0,0,518,519,1,0,
	0,0,519,522,5,2,0,0,520,523,3,68,34,0,521,523,5,36,0,0,522,520,1,0,0,0,
	522,521,1,0,0,0,523,65,1,0,0,0,524,525,3,216,108,0,525,526,3,42,21,0,526,
	67,1,0,0,0,527,528,3,144,72,0,528,69,1,0,0,0,529,530,3,138,69,0,530,531,
	5,19,0,0,531,533,1,0,0,0,532,529,1,0,0,0,533,536,1,0,0,0,534,532,1,0,0,
	0,534,535,1,0,0,0,535,537,1,0,0,0,536,534,1,0,0,0,537,538,3,220,110,0,538,
	71,1,0,0,0,539,540,5,29,0,0,540,541,5,30,0,0,541,542,3,222,111,0,542,543,
	5,37,0,0,543,544,5,38,0,0,544,545,3,44,22,0,545,546,5,39,0,0,546,547,5,
	40,0,0,547,548,5,16,0,0,548,553,3,70,35,0,549,550,5,17,0,0,550,552,3,70,
	35,0,551,549,1,0,0,0,552,555,1,0,0,0,553,551,1,0,0,0,553,554,1,0,0,0,554,
	556,1,0,0,0,555,553,1,0,0,0,556,557,5,18,0,0,557,73,1,0,0,0,558,560,5,29,
	0,0,559,561,3,14,7,0,560,559,1,0,0,0,560,561,1,0,0,0,561,562,1,0,0,0,562,
	563,5,38,0,0,563,565,3,134,67,0,564,566,3,76,38,0,565,564,1,0,0,0,565,566,
	1,0,0,0,566,568,1,0,0,0,567,569,3,78,39,0,568,567,1,0,0,0,568,569,1,0,0,
	0,569,570,1,0,0,0,570,574,3,82,41,0,571,573,3,84,42,0,572,571,1,0,0,0,573,
	576,1,0,0,0,574,572,1,0,0,0,574,575,1,0,0,0,575,75,1,0,0,0,576,574,1,0,
	0,0,577,578,5,41,0,0,578,579,3,44,22,0,579,77,1,0,0,0,580,581,5,16,0,0,
	581,586,3,80,40,0,582,583,5,17,0,0,583,585,3,80,40,0,584,582,1,0,0,0,585,
	588,1,0,0,0,586,584,1,0,0,0,586,587,1,0,0,0,587,589,1,0,0,0,588,586,1,0,
	0,0,589,590,5,18,0,0,590,79,1,0,0,0,591,592,3,216,108,0,592,593,3,42,21,
	0,593,81,1,0,0,0,594,595,5,42,0,0,595,597,3,222,111,0,596,594,1,0,0,0,596,
	597,1,0,0,0,597,600,1,0,0,0,598,599,5,43,0,0,599,601,5,181,0,0,600,598,
	1,0,0,0,600,601,1,0,0,0,601,603,1,0,0,0,602,604,5,44,0,0,603,602,1,0,0,
	0,603,604,1,0,0,0,604,609,1,0,0,0,605,606,5,45,0,0,606,607,5,20,0,0,607,
	608,5,46,0,0,608,610,3,140,70,0,609,605,1,0,0,0,609,610,1,0,0,0,610,83,
	1,0,0,0,611,612,5,47,0,0,612,613,5,48,0,0,613,614,3,134,67,0,614,615,5,
	49,0,0,615,616,5,16,0,0,616,621,3,70,35,0,617,618,5,17,0,0,618,620,3,70,
	35,0,619,617,1,0,0,0,620,623,1,0,0,0,621,619,1,0,0,0,621,622,1,0,0,0,622,
	624,1,0,0,0,623,621,1,0,0,0,624,625,5,18,0,0,625,85,1,0,0,0,626,628,5,29,
	0,0,627,629,3,14,7,0,628,627,1,0,0,0,628,629,1,0,0,0,629,630,1,0,0,0,630,
	631,7,1,0,0,631,632,5,52,0,0,632,633,5,21,0,0,633,634,3,42,21,0,634,635,
	5,48,0,0,635,636,3,42,21,0,636,637,5,5,0,0,637,638,3,70,35,0,638,87,1,0,
	0,0,639,646,3,100,50,0,640,646,3,136,68,0,641,642,5,33,0,0,642,643,3,144,
	72,0,643,644,5,34,0,0,644,646,1,0,0,0,645,639,1,0,0,0,645,640,1,0,0,0,645,
	641,1,0,0,0,646,89,1,0,0,0,647,648,3,88,44,0,648,649,3,92,46,0,649,91,1,
	0,0,0,650,651,3,222,111,0,651,93,1,0,0,0,652,655,3,96,48,0,653,655,3,98,
	49,0,654,652,1,0,0,0,654,653,1,0,0,0,655,95,1,0,0,0,656,657,5,39,0,0,657,
	658,3,90,45,0,658,659,5,53,0,0,659,660,3,144,72,0,660,97,1,0,0,0,661,662,
	5,54,0,0,662,663,3,90,45,0,663,664,5,53,0,0,664,665,3,144,72,0,665,99,1,
	0,0,0,666,670,5,55,0,0,667,668,3,102,51,0,668,669,5,56,0,0,669,671,1,0,
	0,0,670,667,1,0,0,0,670,671,1,0,0,0,671,672,1,0,0,0,672,680,3,44,22,0,673,
	677,5,2,0,0,674,675,3,104,52,0,675,676,3,106,53,0,676,678,1,0,0,0,677,674,
	1,0,0,0,677,678,1,0,0,0,678,679,1,0,0,0,679,681,3,108,54,0,680,673,1,0,
	0,0,680,681,1,0,0,0,681,682,1,0,0,0,682,683,5,57,0,0,683,101,1,0,0,0,684,
	685,3,136,68,0,685,103,1,0,0,0,686,687,3,140,70,0,687,105,1,0,0,0,688,689,
	7,2,0,0,689,107,1,0,0,0,690,693,3,136,68,0,691,693,3,144,72,0,692,690,1,
	0,0,0,692,691,1,0,0,0,693,109,1,0,0,0,694,695,3,222,111,0,695,111,1,0,0,
	0,696,698,3,114,57,0,697,699,3,116,58,0,698,697,1,0,0,0,698,699,1,0,0,0,
	699,703,1,0,0,0,700,702,3,94,47,0,701,700,1,0,0,0,702,705,1,0,0,0,703,701,
	1,0,0,0,703,704,1,0,0,0,704,707,1,0,0,0,705,703,1,0,0,0,706,708,3,120,60,
	0,707,706,1,0,0,0,707,708,1,0,0,0,708,711,1,0,0,0,709,712,3,124,62,0,710,
	712,3,122,61,0,711,709,1,0,0,0,711,710,1,0,0,0,711,712,1,0,0,0,712,714,
	1,0,0,0,713,715,3,128,64,0,714,713,1,0,0,0,714,715,1,0,0,0,715,113,1,0,
	0,0,716,718,5,21,0,0,717,716,1,0,0,0,717,718,1,0,0,0,718,719,1,0,0,0,719,
	724,3,90,45,0,720,721,5,17,0,0,721,723,3,90,45,0,722,720,1,0,0,0,723,726,
	1,0,0,0,724,722,1,0,0,0,724,725,1,0,0,0,725,115,1,0,0,0,726,724,1,0,0,0,
	727,728,5,61,0,0,728,733,3,118,59,0,729,730,5,17,0,0,730,732,3,118,59,0,
	731,729,1,0,0,0,732,735,1,0,0,0,733,731,1,0,0,0,733,734,1,0,0,0,734,117,
	1,0,0,0,735,733,1,0,0,0,736,737,3,222,111,0,737,738,5,2,0,0,738,739,3,144,
	72,0,739,119,1,0,0,0,740,741,5,62,0,0,741,742,3,144,72,0,742,121,1,0,0,
	0,743,745,5,63,0,0,744,746,7,3,0,0,745,744,1,0,0,0,745,746,1,0,0,0,746,
	747,1,0,0,0,747,748,3,144,72,0,748,123,1,0,0,0,749,751,5,66,0,0,750,752,
	7,3,0,0,751,750,1,0,0,0,751,752,1,0,0,0,752,753,1,0,0,0,753,755,3,222,111,
	0,754,756,3,126,63,0,755,754,1,0,0,0,755,756,1,0,0,0,756,757,1,0,0,0,757,
	758,5,2,0,0,758,759,3,144,72,0,759,125,1,0,0,0,760,767,5,67,0,0,761,768,
	3,142,71,0,762,768,3,230,115,0,763,764,5,33,0,0,764,765,3,144,72,0,765,
	766,5,34,0,0,766,768,1,0,0,0,767,761,1,0,0,0,767,762,1,0,0,0,767,763,1,
	0,0,0,768,127,1,0,0,0,769,780,5,68,0,0,770,781,3,130,65,0,771,772,5,49,
	0,0,772,777,3,132,66,0,773,774,5,17,0,0,774,776,3,132,66,0,775,773,1,0,
	0,0,776,779,1,0,0,0,777,775,1,0,0,0,777,778,1,0,0,0,778,781,1,0,0,0,779,
	777,1,0,0,0,780,770,1,0,0,0,780,771,1,0,0,0,781,129,1,0,0,0,782,783,7,4,
	0,0,783,131,1,0,0,0,784,786,3,152,76,0,785,787,3,130,65,0,786,785,1,0,0,
	0,786,787,1,0,0,0,787,133,1,0,0,0,788,789,3,110,55,0,789,790,5,19,0,0,790,
	792,1,0,0,0,791,788,1,0,0,0,792,795,1,0,0,0,793,791,1,0,0,0,793,794,1,0,
	0,0,794,796,1,0,0,0,795,793,1,0,0,0,796,797,3,222,111,0,797,135,1,0,0,0,
	798,799,3,138,69,0,799,800,5,19,0,0,800,802,1,0,0,0,801,798,1,0,0,0,802,
	805,1,0,0,0,803,801,1,0,0,0,803,804,1,0,0,0,804,806,1,0,0,0,805,803,1,0,
	0,0,806,807,3,216,108,0,807,137,1,0,0,0,808,809,3,216,108,0,809,139,1,0,
	0,0,810,811,6,70,-1,0,811,812,3,216,108,0,812,823,1,0,0,0,813,814,10,2,
	0,0,814,815,5,19,0,0,815,822,3,216,108,0,816,817,10,1,0,0,817,818,5,55,
	0,0,818,819,3,142,71,0,819,820,5,57,0,0,820,822,1,0,0,0,821,813,1,0,0,0,
	821,816,1,0,0,0,822,825,1,0,0,0,823,821,1,0,0,0,823,824,1,0,0,0,824,141,
	1,0,0,0,825,823,1,0,0,0,826,829,5,181,0,0,827,829,7,5,0,0,828,826,1,0,0,
	0,828,827,1,0,0,0,829,143,1,0,0,0,830,831,6,72,-1,0,831,862,3,152,76,0,
	832,862,3,100,50,0,833,862,3,112,56,0,834,835,5,79,0,0,835,836,3,144,72,
	0,836,837,5,78,0,0,837,838,3,42,21,0,838,862,1,0,0,0,839,840,5,74,0,0,840,
	862,3,144,72,13,841,842,5,80,0,0,842,862,3,144,72,12,843,844,5,84,0,0,844,
	846,5,58,0,0,845,843,1,0,0,0,845,846,1,0,0,0,846,847,1,0,0,0,847,848,3,
	150,75,0,848,849,5,82,0,0,849,850,3,152,76,0,850,851,5,83,0,0,851,852,3,
	152,76,0,852,862,1,0,0,0,853,854,5,85,0,0,854,855,5,58,0,0,855,856,3,150,
	75,0,856,857,5,82,0,0,857,858,3,152,76,0,858,859,5,83,0,0,859,860,3,152,
	76,0,860,862,1,0,0,0,861,830,1,0,0,0,861,832,1,0,0,0,861,833,1,0,0,0,861,
	834,1,0,0,0,861,839,1,0,0,0,861,841,1,0,0,0,861,845,1,0,0,0,861,853,1,0,
	0,0,862,917,1,0,0,0,863,864,10,8,0,0,864,869,7,6,0,0,865,867,5,64,0,0,866,
	868,5,90,0,0,867,866,1,0,0,0,867,868,1,0,0,0,868,870,1,0,0,0,869,865,1,
	0,0,0,869,870,1,0,0,0,870,871,1,0,0,0,871,916,3,144,72,9,872,873,10,7,0,
	0,873,874,7,7,0,0,874,916,3,144,72,8,875,876,10,6,0,0,876,877,3,168,84,
	0,877,878,3,144,72,7,878,916,1,0,0,0,879,880,10,5,0,0,880,881,7,8,0,0,881,
	916,3,144,72,6,882,883,10,4,0,0,883,885,7,9,0,0,884,886,3,156,78,0,885,
	884,1,0,0,0,885,886,1,0,0,0,886,887,1,0,0,0,887,916,3,144,72,5,888,889,
	10,3,0,0,889,890,5,83,0,0,890,916,3,144,72,4,891,892,10,2,0,0,892,893,7,
	10,0,0,893,916,3,144,72,3,894,895,10,1,0,0,895,896,5,100,0,0,896,916,3,
	144,72,2,897,898,10,16,0,0,898,900,5,73,0,0,899,901,5,74,0,0,900,899,1,
	0,0,0,900,901,1,0,0,0,901,902,1,0,0,0,902,916,7,11,0,0,903,904,10,15,0,
	0,904,905,7,12,0,0,905,916,3,42,21,0,906,908,10,11,0,0,907,909,5,81,0,0,
	908,907,1,0,0,0,908,909,1,0,0,0,909,910,1,0,0,0,910,911,5,82,0,0,911,912,
	3,152,76,0,912,913,5,83,0,0,913,914,3,152,76,0,914,916,1,0,0,0,915,863,
	1,0,0,0,915,872,1,0,0,0,915,875,1,0,0,0,915,879,1,0,0,0,915,882,1,0,0,0,
	915,888,1,0,0,0,915,891,1,0,0,0,915,894,1,0,0,0,915,897,1,0,0,0,915,903,
	1,0,0,0,915,906,1,0,0,0,916,919,1,0,0,0,917,915,1,0,0,0,917,918,1,0,0,0,
	918,145,1,0,0,0,919,917,1,0,0,0,920,921,7,13,0,0,921,147,1,0,0,0,922,927,
	3,146,73,0,923,927,5,109,0,0,924,927,5,110,0,0,925,927,5,111,0,0,926,922,
	1,0,0,0,926,923,1,0,0,0,926,924,1,0,0,0,926,925,1,0,0,0,927,149,1,0,0,0,
	928,929,7,14,0,0,929,151,1,0,0,0,930,931,6,76,-1,0,931,1009,3,170,85,0,
	932,933,5,120,0,0,933,934,3,144,72,0,934,937,5,48,0,0,935,938,3,42,21,0,
	936,938,3,232,116,0,937,935,1,0,0,0,937,936,1,0,0,0,938,1009,1,0,0,0,939,
	940,7,15,0,0,940,1009,3,152,76,18,941,942,7,16,0,0,942,943,5,37,0,0,943,
	1009,3,152,76,17,944,945,3,148,74,0,945,946,5,21,0,0,946,947,3,152,76,16,
	947,1009,1,0,0,0,948,949,5,84,0,0,949,950,5,58,0,0,950,951,3,150,75,0,951,
	952,5,37,0,0,952,953,3,152,76,15,953,1009,1,0,0,0,954,955,5,85,0,0,955,
	956,5,58,0,0,956,957,3,150,75,0,957,958,5,37,0,0,958,959,3,152,76,14,959,
	1009,1,0,0,0,960,961,5,125,0,0,961,962,5,37,0,0,962,1009,3,152,76,13,963,
	964,5,126,0,0,964,965,5,37,0,0,965,1009,3,152,76,12,966,967,5,127,0,0,967,
	968,5,37,0,0,968,1009,3,152,76,11,969,970,5,128,0,0,970,971,5,21,0,0,971,
	1009,3,152,76,10,972,973,5,129,0,0,973,974,5,21,0,0,974,1009,3,152,76,9,
	975,976,7,17,0,0,976,1009,3,44,22,0,977,978,5,138,0,0,978,979,3,144,72,
	0,979,980,5,139,0,0,980,981,3,144,72,0,981,982,5,140,0,0,982,983,3,144,
	72,0,983,1009,1,0,0,0,984,986,5,141,0,0,985,987,3,144,72,0,986,985,1,0,
	0,0,986,987,1,0,0,0,987,989,1,0,0,0,988,990,3,154,77,0,989,988,1,0,0,0,
	990,991,1,0,0,0,991,989,1,0,0,0,991,992,1,0,0,0,992,993,1,0,0,0,993,994,
	5,140,0,0,994,995,3,144,72,0,995,996,5,124,0,0,996,1009,1,0,0,0,997,998,
	7,18,0,0,998,1009,3,144,72,0,999,1000,7,19,0,0,1000,1006,3,144,72,0,1001,
	1004,5,145,0,0,1002,1005,3,146,73,0,1003,1005,3,144,72,0,1004,1002,1,0,
	0,0,1004,1003,1,0,0,0,1005,1007,1,0,0,0,1006,1001,1,0,0,0,1006,1007,1,0,
	0,0,1007,1009,1,0,0,0,1008,930,1,0,0,0,1008,932,1,0,0,0,1008,939,1,0,0,
	0,1008,941,1,0,0,0,1008,944,1,0,0,0,1008,948,1,0,0,0,1008,954,1,0,0,0,1008,
	960,1,0,0,0,1008,963,1,0,0,0,1008,966,1,0,0,0,1008,969,1,0,0,0,1008,972,
	1,0,0,0,1008,975,1,0,0,0,1008,977,1,0,0,0,1008,984,1,0,0,0,1008,997,1,0,
	0,0,1008,999,1,0,0,0,1009,1029,1,0,0,0,1010,1011,10,7,0,0,1011,1012,5,132,
	0,0,1012,1028,3,152,76,8,1013,1014,10,6,0,0,1014,1015,7,20,0,0,1015,1028,
	3,152,76,7,1016,1017,10,5,0,0,1017,1018,7,21,0,0,1018,1028,3,152,76,6,1019,
	1020,10,21,0,0,1020,1021,5,19,0,0,1021,1028,3,172,86,0,1022,1023,10,20,
	0,0,1023,1024,5,55,0,0,1024,1025,3,144,72,0,1025,1026,5,57,0,0,1026,1028,
	1,0,0,0,1027,1010,1,0,0,0,1027,1013,1,0,0,0,1027,1016,1,0,0,0,1027,1019,
	1,0,0,0,1027,1022,1,0,0,0,1028,1031,1,0,0,0,1029,1027,1,0,0,0,1029,1030,
	1,0,0,0,1030,153,1,0,0,0,1031,1029,1,0,0,0,1032,1033,5,146,0,0,1033,1034,
	3,144,72,0,1034,1035,5,139,0,0,1035,1036,3,144,72,0,1036,155,1,0,0,0,1037,
	1038,3,146,73,0,1038,1039,5,37,0,0,1039,157,1,0,0,0,1040,1041,7,22,0,0,
	1041,159,1,0,0,0,1042,1043,7,23,0,0,1043,161,1,0,0,0,1044,1045,7,24,0,0,
	1045,163,1,0,0,0,1046,1048,3,230,115,0,1047,1049,3,160,80,0,1048,1047,1,
	0,0,0,1048,1049,1,0,0,0,1049,1054,1,0,0,0,1050,1051,3,162,81,0,1051,1052,
	3,230,115,0,1052,1054,1,0,0,0,1053,1046,1,0,0,0,1053,1050,1,0,0,0,1054,
	165,1,0,0,0,1055,1057,5,153,0,0,1056,1055,1,0,0,0,1056,1057,1,0,0,0,1057,
	1058,1,0,0,0,1058,1064,7,25,0,0,1059,1061,7,25,0,0,1060,1062,5,156,0,0,
	1061,1060,1,0,0,0,1061,1062,1,0,0,0,1062,1064,1,0,0,0,1063,1056,1,0,0,0,
	1063,1059,1,0,0,0,1064,167,1,0,0,0,1065,1067,7,26,0,0,1066,1065,1,0,0,0,
	1066,1067,1,0,0,0,1067,1068,1,0,0,0,1068,1070,5,160,0,0,1069,1071,3,146,
	73,0,1070,1069,1,0,0,0,1070,1071,1,0,0,0,1071,1074,1,0,0,0,1072,1075,3,
	158,79,0,1073,1075,5,78,0,0,1074,1072,1,0,0,0,1074,1073,1,0,0,0,1075,1077,
	1,0,0,0,1076,1078,7,16,0,0,1077,1076,1,0,0,0,1077,1078,1,0,0,0,1078,1147,
	1,0,0,0,1079,1081,5,81,0,0,1080,1079,1,0,0,0,1080,1081,1,0,0,0,1081,1082,
	1,0,0,0,1082,1084,5,161,0,0,1083,1085,3,156,78,0,1084,1083,1,0,0,0,1084,
	1085,1,0,0,0,1085,1087,1,0,0,0,1086,1088,7,16,0,0,1087,1086,1,0,0,0,1087,
	1088,1,0,0,0,1088,1147,1,0,0,0,1089,1091,7,26,0,0,1090,1089,1,0,0,0,1090,
	1091,1,0,0,0,1091,1093,1,0,0,0,1092,1094,5,81,0,0,1093,1092,1,0,0,0,1093,
	1094,1,0,0,0,1094,1095,1,0,0,0,1095,1097,7,27,0,0,1096,1098,3,156,78,0,
	1097,1096,1,0,0,0,1097,1098,1,0,0,0,1098,1147,1,0,0,0,1099,1101,7,26,0,
	0,1100,1099,1,0,0,0,1100,1101,1,0,0,0,1101,1103,1,0,0,0,1102,1104,3,164,
	82,0,1103,1102,1,0,0,0,1103,1104,1,0,0,0,1104,1105,1,0,0,0,1105,1107,3,
	166,83,0,1106,1108,3,156,78,0,1107,1106,1,0,0,0,1107,1108,1,0,0,0,1108,
	1110,1,0,0,0,1109,1111,7,16,0,0,1110,1109,1,0,0,0,1110,1111,1,0,0,0,1111,
	1147,1,0,0,0,1112,1114,7,26,0,0,1113,1112,1,0,0,0,1113,1114,1,0,0,0,1114,
	1116,1,0,0,0,1115,1117,5,81,0,0,1116,1115,1,0,0,0,1116,1117,1,0,0,0,1117,
	1118,1,0,0,0,1118,1119,5,164,0,0,1119,1120,3,230,115,0,1120,1122,5,37,0,
	0,1121,1123,7,16,0,0,1122,1121,1,0,0,0,1122,1123,1,0,0,0,1123,1147,1,0,
	0,0,1124,1126,5,165,0,0,1125,1127,7,25,0,0,1126,1125,1,0,0,0,1126,1127,
	1,0,0,0,1127,1129,1,0,0,0,1128,1130,3,156,78,0,1129,1128,1,0,0,0,1129,1130,
	1,0,0,0,1130,1147,1,0,0,0,1131,1133,5,166,0,0,1132,1134,7,25,0,0,1133,1132,
	1,0,0,0,1133,1134,1,0,0,0,1134,1136,1,0,0,0,1135,1137,3,156,78,0,1136,1135,
	1,0,0,0,1136,1137,1,0,0,0,1137,1147,1,0,0,0,1138,1140,5,157,0,0,1139,1141,
	3,156,78,0,1140,1139,1,0,0,0,1140,1141,1,0,0,0,1141,1147,1,0,0,0,1142,1144,
	5,158,0,0,1143,1145,3,156,78,0,1144,1143,1,0,0,0,1144,1145,1,0,0,0,1145,
	1147,1,0,0,0,1146,1066,1,0,0,0,1146,1080,1,0,0,0,1146,1090,1,0,0,0,1146,
	1100,1,0,0,0,1146,1113,1,0,0,0,1146,1124,1,0,0,0,1146,1131,1,0,0,0,1146,
	1138,1,0,0,0,1146,1142,1,0,0,0,1147,169,1,0,0,0,1148,1162,3,176,88,0,1149,
	1162,3,182,91,0,1150,1162,3,184,92,0,1151,1162,3,186,93,0,1152,1162,3,188,
	94,0,1153,1162,3,192,96,0,1154,1162,3,196,98,0,1155,1162,3,200,100,0,1156,
	1162,3,202,101,0,1157,1158,5,33,0,0,1158,1159,3,144,72,0,1159,1160,5,34,
	0,0,1160,1162,1,0,0,0,1161,1148,1,0,0,0,1161,1149,1,0,0,0,1161,1150,1,0,
	0,0,1161,1151,1,0,0,0,1161,1152,1,0,0,0,1161,1153,1,0,0,0,1161,1154,1,0,
	0,0,1161,1155,1,0,0,0,1161,1156,1,0,0,0,1161,1157,1,0,0,0,1162,171,1,0,
	0,0,1163,1166,3,216,108,0,1164,1166,3,174,87,0,1165,1163,1,0,0,0,1165,1164,
	1,0,0,0,1166,173,1,0,0,0,1167,1168,3,220,110,0,1168,1170,5,33,0,0,1169,
	1171,3,228,114,0,1170,1169,1,0,0,0,1170,1171,1,0,0,0,1171,1172,1,0,0,0,
	1172,1173,5,34,0,0,1173,175,1,0,0,0,1174,1180,3,216,108,0,1175,1180,3,178,
	89,0,1176,1180,5,167,0,0,1177,1180,5,168,0,0,1178,1180,5,169,0,0,1179,1174,
	1,0,0,0,1179,1175,1,0,0,0,1179,1176,1,0,0,0,1179,1177,1,0,0,0,1179,1178,
	1,0,0,0,1180,177,1,0,0,0,1181,1182,3,216,108,0,1182,1184,5,33,0,0,1183,
	1185,3,228,114,0,1184,1183,1,0,0,0,1184,1185,1,0,0,0,1185,1186,1,0,0,0,
	1186,1187,5,34,0,0,1187,179,1,0,0,0,1188,1189,3,230,115,0,1189,1190,5,2,
	0,0,1190,1191,3,230,115,0,1191,181,1,0,0,0,1192,1203,7,28,0,0,1193,1203,
	5,75,0,0,1194,1203,5,181,0,0,1195,1203,7,5,0,0,1196,1203,5,176,0,0,1197,
	1203,5,175,0,0,1198,1203,5,177,0,0,1199,1203,5,178,0,0,1200,1203,3,230,
	115,0,1201,1203,3,180,90,0,1202,1192,1,0,0,0,1202,1193,1,0,0,0,1202,1194,
	1,0,0,0,1202,1195,1,0,0,0,1202,1196,1,0,0,0,1202,1197,1,0,0,0,1202,1198,
	1,0,0,0,1202,1199,1,0,0,0,1202,1200,1,0,0,0,1202,1201,1,0,0,0,1203,183,
	1,0,0,0,1204,1208,5,170,0,0,1205,1209,3,208,104,0,1206,1209,3,222,111,0,
	1207,1209,5,181,0,0,1208,1205,1,0,0,0,1208,1206,1,0,0,0,1208,1207,1,0,0,
	0,1209,185,1,0,0,0,1210,1211,5,26,0,0,1211,1212,7,29,0,0,1212,1213,3,144,
	72,0,1213,1214,5,17,0,0,1214,1215,3,144,72,0,1215,1216,7,30,0,0,1216,187,
	1,0,0,0,1217,1219,5,27,0,0,1218,1217,1,0,0,0,1218,1219,1,0,0,0,1219,1220,
	1,0,0,0,1220,1230,5,16,0,0,1221,1231,5,2,0,0,1222,1227,3,190,95,0,1223,
	1224,5,17,0,0,1224,1226,3,190,95,0,1225,1223,1,0,0,0,1226,1229,1,0,0,0,
	1227,1225,1,0,0,0,1227,1228,1,0,0,0,1228,1231,1,0,0,0,1229,1227,1,0,0,0,
	1230,1221,1,0,0,0,1230,1222,1,0,0,0,1231,1232,1,0,0,0,1232,1233,5,18,0,
	0,1233,189,1,0,0,0,1234,1235,3,216,108,0,1235,1236,5,2,0,0,1236,1237,3,
	144,72,0,1237,191,1,0,0,0,1238,1239,3,44,22,0,1239,1249,5,16,0,0,1240,1250,
	5,2,0,0,1241,1246,3,194,97,0,1242,1243,5,17,0,0,1243,1245,3,194,97,0,1244,
	1242,1,0,0,0,1245,1248,1,0,0,0,1246,1244,1,0,0,0,1246,1247,1,0,0,0,1247,
	1250,1,0,0,0,1248,1246,1,0,0,0,1249,1240,1,0,0,0,1249,1241,1,0,0,0,1250,
	1251,1,0,0,0,1251,1252,5,18,0,0,1252,193,1,0,0,0,1253,1254,3,216,108,0,
	1254,1255,5,2,0,0,1255,1256,3,144,72,0,1256,195,1,0,0,0,1257,1262,5,23,
	0,0,1258,1259,5,24,0,0,1259,1260,3,42,21,0,1260,1261,5,25,0,0,1261,1263,
	1,0,0,0,1262,1258,1,0,0,0,1262,1263,1,0,0,0,1263,1265,1,0,0,0,1264,1257,
	1,0,0,0,1264,1265,1,0,0,0,1265,1266,1,0,0,0,1266,1275,5,16,0,0,1267,1272,
	3,144,72,0,1268,1269,5,17,0,0,1269,1271,3,144,72,0,1270,1268,1,0,0,0,1271,
	1274,1,0,0,0,1272,1270,1,0,0,0,1272,1273,1,0,0,0,1273,1276,1,0,0,0,1274,
	1272,1,0,0,0,1275,1267,1,0,0,0,1275,1276,1,0,0,0,1276,1277,1,0,0,0,1277,
	1278,5,18,0,0,1278,197,1,0,0,0,1279,1280,5,171,0,0,1280,1281,5,181,0,0,
	1281,199,1,0,0,0,1282,1283,5,172,0,0,1283,1284,5,181,0,0,1284,1285,5,21,
	0,0,1285,1287,3,24,12,0,1286,1288,3,198,99,0,1287,1286,1,0,0,0,1287,1288,
	1,0,0,0,1288,201,1,0,0,0,1289,1290,5,173,0,0,1290,1299,5,16,0,0,1291,1296,
	3,200,100,0,1292,1293,5,17,0,0,1293,1295,3,200,100,0,1294,1292,1,0,0,0,
	1295,1298,1,0,0,0,1296,1294,1,0,0,0,1296,1297,1,0,0,0,1297,1300,1,0,0,0,
	1298,1296,1,0,0,0,1299,1291,1,0,0,0,1299,1300,1,0,0,0,1300,1301,1,0,0,0,
	1301,1303,5,18,0,0,1302,1304,3,198,99,0,1303,1302,1,0,0,0,1303,1304,1,0,
	0,0,1304,203,1,0,0,0,1305,1306,7,31,0,0,1306,205,1,0,0,0,1307,1308,7,32,
	0,0,1308,207,1,0,0,0,1309,1310,7,33,0,0,1310,209,1,0,0,0,1311,1312,7,34,
	0,0,1312,211,1,0,0,0,1313,1314,7,35,0,0,1314,213,1,0,0,0,1315,1316,7,36,
	0,0,1316,215,1,0,0,0,1317,1320,3,222,111,0,1318,1320,3,208,104,0,1319,1317,
	1,0,0,0,1319,1318,1,0,0,0,1320,217,1,0,0,0,1321,1324,3,216,108,0,1322,1324,
	3,214,107,0,1323,1321,1,0,0,0,1323,1322,1,0,0,0,1324,219,1,0,0,0,1325,1328,
	3,222,111,0,1326,1328,3,212,106,0,1327,1325,1,0,0,0,1327,1326,1,0,0,0,1328,
	221,1,0,0,0,1329,1330,7,37,0,0,1330,223,1,0,0,0,1331,1332,3,144,72,0,1332,
	1333,5,0,0,1,1333,225,1,0,0,0,1334,1336,3,144,72,0,1335,1337,7,38,0,0,1336,
	1335,1,0,0,0,1336,1337,1,0,0,0,1337,227,1,0,0,0,1338,1343,3,144,72,0,1339,
	1340,5,17,0,0,1340,1342,3,144,72,0,1341,1339,1,0,0,0,1342,1345,1,0,0,0,
	1343,1341,1,0,0,0,1343,1344,1,0,0,0,1344,229,1,0,0,0,1345,1343,1,0,0,0,
	1346,1348,7,5,0,0,1347,1349,3,232,116,0,1348,1347,1,0,0,0,1348,1349,1,0,
	0,0,1349,231,1,0,0,0,1350,1354,3,146,73,0,1351,1354,3,150,75,0,1352,1354,
	5,181,0,0,1353,1350,1,0,0,0,1353,1351,1,0,0,0,1353,1352,1,0,0,0,1354,233,
	1,0,0,0,156,237,241,246,252,261,270,276,282,286,292,296,300,307,312,316,
	319,327,330,338,341,350,358,365,374,377,388,391,395,400,417,424,448,451,
	465,476,480,490,496,499,509,512,517,522,534,553,560,565,568,574,586,596,
	600,603,609,621,628,645,654,670,677,680,692,698,703,707,711,714,717,724,
	733,745,751,755,767,777,780,786,793,803,821,823,828,845,861,867,869,885,
	900,908,915,917,926,937,986,991,1004,1006,1008,1027,1029,1048,1053,1056,
	1061,1063,1066,1070,1074,1077,1080,1084,1087,1090,1093,1097,1100,1103,1107,
	1110,1113,1116,1122,1126,1129,1133,1136,1140,1144,1146,1161,1165,1170,1179,
	1184,1202,1208,1218,1227,1230,1246,1249,1262,1264,1272,1275,1287,1296,1299,
	1303,1319,1323,1327,1336,1343,1348,1353];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!cqlParser.__ATN) {
			cqlParser.__ATN = new ATNDeserializer().deserialize(cqlParser._serializedATN);
		}

		return cqlParser.__ATN;
	}


	static DecisionsToDFA = cqlParser._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );

}

export class LibraryContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public EOF(): TerminalNode {
		return this.getToken(cqlParser.EOF, 0);
	}
	public directive_list(): DirectiveContext[] {
		return this.getTypedRuleContexts(DirectiveContext) as DirectiveContext[];
	}
	public directive(i: number): DirectiveContext {
		return this.getTypedRuleContext(DirectiveContext, i) as DirectiveContext;
	}
	public libraryDefinition(): LibraryDefinitionContext {
		return this.getTypedRuleContext(LibraryDefinitionContext, 0) as LibraryDefinitionContext;
	}
	public definition_list(): DefinitionContext[] {
		return this.getTypedRuleContexts(DefinitionContext) as DefinitionContext[];
	}
	public definition(i: number): DefinitionContext {
		return this.getTypedRuleContext(DefinitionContext, i) as DefinitionContext;
	}
	public statement_list(): StatementContext[] {
		return this.getTypedRuleContexts(StatementContext) as StatementContext[];
	}
	public statement(i: number): StatementContext {
		return this.getTypedRuleContext(StatementContext, i) as StatementContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_library;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterLibrary) {
	 		listener.enterLibrary(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitLibrary) {
	 		listener.exitLibrary(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitLibrary) {
			return visitor.visitLibrary(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DirectiveContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
	public STRING(): TerminalNode {
		return this.getToken(cqlParser.STRING, 0);
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_directive;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterDirective) {
	 		listener.enterDirective(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitDirective) {
	 		listener.exitDirective(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitDirective) {
			return visitor.visitDirective(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DefinitionContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public usingDefinition(): UsingDefinitionContext {
		return this.getTypedRuleContext(UsingDefinitionContext, 0) as UsingDefinitionContext;
	}
	public includeDefinition(): IncludeDefinitionContext {
		return this.getTypedRuleContext(IncludeDefinitionContext, 0) as IncludeDefinitionContext;
	}
	public codesystemDefinition(): CodesystemDefinitionContext {
		return this.getTypedRuleContext(CodesystemDefinitionContext, 0) as CodesystemDefinitionContext;
	}
	public valuesetDefinition(): ValuesetDefinitionContext {
		return this.getTypedRuleContext(ValuesetDefinitionContext, 0) as ValuesetDefinitionContext;
	}
	public codeDefinition(): CodeDefinitionContext {
		return this.getTypedRuleContext(CodeDefinitionContext, 0) as CodeDefinitionContext;
	}
	public conceptDefinition(): ConceptDefinitionContext {
		return this.getTypedRuleContext(ConceptDefinitionContext, 0) as ConceptDefinitionContext;
	}
	public parameterDefinition(): ParameterDefinitionContext {
		return this.getTypedRuleContext(ParameterDefinitionContext, 0) as ParameterDefinitionContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_definition;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterDefinition) {
	 		listener.enterDefinition(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitDefinition) {
	 		listener.exitDefinition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitDefinition) {
			return visitor.visitDefinition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LibraryDefinitionContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public qualifiedIdentifier(): QualifiedIdentifierContext {
		return this.getTypedRuleContext(QualifiedIdentifierContext, 0) as QualifiedIdentifierContext;
	}
	public versionSpecifier(): VersionSpecifierContext {
		return this.getTypedRuleContext(VersionSpecifierContext, 0) as VersionSpecifierContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_libraryDefinition;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterLibraryDefinition) {
	 		listener.enterLibraryDefinition(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitLibraryDefinition) {
	 		listener.exitLibraryDefinition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitLibraryDefinition) {
			return visitor.visitLibraryDefinition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class UsingDefinitionContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public qualifiedIdentifier(): QualifiedIdentifierContext {
		return this.getTypedRuleContext(QualifiedIdentifierContext, 0) as QualifiedIdentifierContext;
	}
	public versionSpecifier(): VersionSpecifierContext {
		return this.getTypedRuleContext(VersionSpecifierContext, 0) as VersionSpecifierContext;
	}
	public localIdentifier(): LocalIdentifierContext {
		return this.getTypedRuleContext(LocalIdentifierContext, 0) as LocalIdentifierContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_usingDefinition;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterUsingDefinition) {
	 		listener.enterUsingDefinition(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitUsingDefinition) {
	 		listener.exitUsingDefinition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitUsingDefinition) {
			return visitor.visitUsingDefinition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IncludeDefinitionContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public qualifiedIdentifier(): QualifiedIdentifierContext {
		return this.getTypedRuleContext(QualifiedIdentifierContext, 0) as QualifiedIdentifierContext;
	}
	public versionSpecifier(): VersionSpecifierContext {
		return this.getTypedRuleContext(VersionSpecifierContext, 0) as VersionSpecifierContext;
	}
	public localIdentifier(): LocalIdentifierContext {
		return this.getTypedRuleContext(LocalIdentifierContext, 0) as LocalIdentifierContext;
	}
	public tupleSelector(): TupleSelectorContext {
		return this.getTypedRuleContext(TupleSelectorContext, 0) as TupleSelectorContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_includeDefinition;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterIncludeDefinition) {
	 		listener.enterIncludeDefinition(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitIncludeDefinition) {
	 		listener.exitIncludeDefinition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitIncludeDefinition) {
			return visitor.visitIncludeDefinition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LocalIdentifierContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_localIdentifier;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterLocalIdentifier) {
	 		listener.enterLocalIdentifier(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitLocalIdentifier) {
	 		listener.exitLocalIdentifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitLocalIdentifier) {
			return visitor.visitLocalIdentifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AccessModifierContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_accessModifier;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterAccessModifier) {
	 		listener.enterAccessModifier(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitAccessModifier) {
	 		listener.exitAccessModifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitAccessModifier) {
			return visitor.visitAccessModifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParameterDefinitionContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
	public accessModifier(): AccessModifierContext {
		return this.getTypedRuleContext(AccessModifierContext, 0) as AccessModifierContext;
	}
	public typeSpecifier(): TypeSpecifierContext {
		return this.getTypedRuleContext(TypeSpecifierContext, 0) as TypeSpecifierContext;
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_parameterDefinition;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterParameterDefinition) {
	 		listener.enterParameterDefinition(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitParameterDefinition) {
	 		listener.exitParameterDefinition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitParameterDefinition) {
			return visitor.visitParameterDefinition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CodesystemDefinitionContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
	public codesystemId(): CodesystemIdContext {
		return this.getTypedRuleContext(CodesystemIdContext, 0) as CodesystemIdContext;
	}
	public accessModifier(): AccessModifierContext {
		return this.getTypedRuleContext(AccessModifierContext, 0) as AccessModifierContext;
	}
	public versionSpecifier(): VersionSpecifierContext {
		return this.getTypedRuleContext(VersionSpecifierContext, 0) as VersionSpecifierContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_codesystemDefinition;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterCodesystemDefinition) {
	 		listener.enterCodesystemDefinition(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitCodesystemDefinition) {
	 		listener.exitCodesystemDefinition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitCodesystemDefinition) {
			return visitor.visitCodesystemDefinition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ValuesetDefinitionContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
	public valuesetId(): ValuesetIdContext {
		return this.getTypedRuleContext(ValuesetIdContext, 0) as ValuesetIdContext;
	}
	public accessModifier(): AccessModifierContext {
		return this.getTypedRuleContext(AccessModifierContext, 0) as AccessModifierContext;
	}
	public versionSpecifier(): VersionSpecifierContext {
		return this.getTypedRuleContext(VersionSpecifierContext, 0) as VersionSpecifierContext;
	}
	public codesystems(): CodesystemsContext {
		return this.getTypedRuleContext(CodesystemsContext, 0) as CodesystemsContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_valuesetDefinition;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterValuesetDefinition) {
	 		listener.enterValuesetDefinition(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitValuesetDefinition) {
	 		listener.exitValuesetDefinition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitValuesetDefinition) {
			return visitor.visitValuesetDefinition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CodesystemsContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public codesystemIdentifier_list(): CodesystemIdentifierContext[] {
		return this.getTypedRuleContexts(CodesystemIdentifierContext) as CodesystemIdentifierContext[];
	}
	public codesystemIdentifier(i: number): CodesystemIdentifierContext {
		return this.getTypedRuleContext(CodesystemIdentifierContext, i) as CodesystemIdentifierContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_codesystems;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterCodesystems) {
	 		listener.enterCodesystems(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitCodesystems) {
	 		listener.exitCodesystems(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitCodesystems) {
			return visitor.visitCodesystems(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CodesystemIdentifierContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
	public libraryIdentifier(): LibraryIdentifierContext {
		return this.getTypedRuleContext(LibraryIdentifierContext, 0) as LibraryIdentifierContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_codesystemIdentifier;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterCodesystemIdentifier) {
	 		listener.enterCodesystemIdentifier(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitCodesystemIdentifier) {
	 		listener.exitCodesystemIdentifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitCodesystemIdentifier) {
			return visitor.visitCodesystemIdentifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LibraryIdentifierContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_libraryIdentifier;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterLibraryIdentifier) {
	 		listener.enterLibraryIdentifier(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitLibraryIdentifier) {
	 		listener.exitLibraryIdentifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitLibraryIdentifier) {
			return visitor.visitLibraryIdentifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CodeDefinitionContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
	public codeId(): CodeIdContext {
		return this.getTypedRuleContext(CodeIdContext, 0) as CodeIdContext;
	}
	public codesystemIdentifier(): CodesystemIdentifierContext {
		return this.getTypedRuleContext(CodesystemIdentifierContext, 0) as CodesystemIdentifierContext;
	}
	public accessModifier(): AccessModifierContext {
		return this.getTypedRuleContext(AccessModifierContext, 0) as AccessModifierContext;
	}
	public displayClause(): DisplayClauseContext {
		return this.getTypedRuleContext(DisplayClauseContext, 0) as DisplayClauseContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_codeDefinition;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterCodeDefinition) {
	 		listener.enterCodeDefinition(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitCodeDefinition) {
	 		listener.exitCodeDefinition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitCodeDefinition) {
			return visitor.visitCodeDefinition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ConceptDefinitionContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
	public accessModifier(): AccessModifierContext {
		return this.getTypedRuleContext(AccessModifierContext, 0) as AccessModifierContext;
	}
	public codeIdentifier_list(): CodeIdentifierContext[] {
		return this.getTypedRuleContexts(CodeIdentifierContext) as CodeIdentifierContext[];
	}
	public codeIdentifier(i: number): CodeIdentifierContext {
		return this.getTypedRuleContext(CodeIdentifierContext, i) as CodeIdentifierContext;
	}
	public displayClause(): DisplayClauseContext {
		return this.getTypedRuleContext(DisplayClauseContext, 0) as DisplayClauseContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_conceptDefinition;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterConceptDefinition) {
	 		listener.enterConceptDefinition(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitConceptDefinition) {
	 		listener.exitConceptDefinition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitConceptDefinition) {
			return visitor.visitConceptDefinition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CodeIdentifierContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
	public libraryIdentifier(): LibraryIdentifierContext {
		return this.getTypedRuleContext(LibraryIdentifierContext, 0) as LibraryIdentifierContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_codeIdentifier;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterCodeIdentifier) {
	 		listener.enterCodeIdentifier(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitCodeIdentifier) {
	 		listener.exitCodeIdentifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitCodeIdentifier) {
			return visitor.visitCodeIdentifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CodesystemIdContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public STRING(): TerminalNode {
		return this.getToken(cqlParser.STRING, 0);
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_codesystemId;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterCodesystemId) {
	 		listener.enterCodesystemId(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitCodesystemId) {
	 		listener.exitCodesystemId(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitCodesystemId) {
			return visitor.visitCodesystemId(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ValuesetIdContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public STRING(): TerminalNode {
		return this.getToken(cqlParser.STRING, 0);
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_valuesetId;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterValuesetId) {
	 		listener.enterValuesetId(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitValuesetId) {
	 		listener.exitValuesetId(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitValuesetId) {
			return visitor.visitValuesetId(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class VersionSpecifierContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public STRING(): TerminalNode {
		return this.getToken(cqlParser.STRING, 0);
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_versionSpecifier;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterVersionSpecifier) {
	 		listener.enterVersionSpecifier(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitVersionSpecifier) {
	 		listener.exitVersionSpecifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitVersionSpecifier) {
			return visitor.visitVersionSpecifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CodeIdContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public STRING(): TerminalNode {
		return this.getToken(cqlParser.STRING, 0);
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_codeId;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterCodeId) {
	 		listener.enterCodeId(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitCodeId) {
	 		listener.exitCodeId(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitCodeId) {
			return visitor.visitCodeId(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeSpecifierContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public namedTypeSpecifier(): NamedTypeSpecifierContext {
		return this.getTypedRuleContext(NamedTypeSpecifierContext, 0) as NamedTypeSpecifierContext;
	}
	public listTypeSpecifier(): ListTypeSpecifierContext {
		return this.getTypedRuleContext(ListTypeSpecifierContext, 0) as ListTypeSpecifierContext;
	}
	public intervalTypeSpecifier(): IntervalTypeSpecifierContext {
		return this.getTypedRuleContext(IntervalTypeSpecifierContext, 0) as IntervalTypeSpecifierContext;
	}
	public tupleTypeSpecifier(): TupleTypeSpecifierContext {
		return this.getTypedRuleContext(TupleTypeSpecifierContext, 0) as TupleTypeSpecifierContext;
	}
	public choiceTypeSpecifier(): ChoiceTypeSpecifierContext {
		return this.getTypedRuleContext(ChoiceTypeSpecifierContext, 0) as ChoiceTypeSpecifierContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_typeSpecifier;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterTypeSpecifier) {
	 		listener.enterTypeSpecifier(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitTypeSpecifier) {
	 		listener.exitTypeSpecifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitTypeSpecifier) {
			return visitor.visitTypeSpecifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NamedTypeSpecifierContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public referentialOrTypeNameIdentifier(): ReferentialOrTypeNameIdentifierContext {
		return this.getTypedRuleContext(ReferentialOrTypeNameIdentifierContext, 0) as ReferentialOrTypeNameIdentifierContext;
	}
	public qualifier_list(): QualifierContext[] {
		return this.getTypedRuleContexts(QualifierContext) as QualifierContext[];
	}
	public qualifier(i: number): QualifierContext {
		return this.getTypedRuleContext(QualifierContext, i) as QualifierContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_namedTypeSpecifier;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterNamedTypeSpecifier) {
	 		listener.enterNamedTypeSpecifier(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitNamedTypeSpecifier) {
	 		listener.exitNamedTypeSpecifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitNamedTypeSpecifier) {
			return visitor.visitNamedTypeSpecifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ModelIdentifierContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_modelIdentifier;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterModelIdentifier) {
	 		listener.enterModelIdentifier(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitModelIdentifier) {
	 		listener.exitModelIdentifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitModelIdentifier) {
			return visitor.visitModelIdentifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ListTypeSpecifierContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public typeSpecifier(): TypeSpecifierContext {
		return this.getTypedRuleContext(TypeSpecifierContext, 0) as TypeSpecifierContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_listTypeSpecifier;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterListTypeSpecifier) {
	 		listener.enterListTypeSpecifier(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitListTypeSpecifier) {
	 		listener.exitListTypeSpecifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitListTypeSpecifier) {
			return visitor.visitListTypeSpecifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IntervalTypeSpecifierContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public typeSpecifier(): TypeSpecifierContext {
		return this.getTypedRuleContext(TypeSpecifierContext, 0) as TypeSpecifierContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_intervalTypeSpecifier;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterIntervalTypeSpecifier) {
	 		listener.enterIntervalTypeSpecifier(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitIntervalTypeSpecifier) {
	 		listener.exitIntervalTypeSpecifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitIntervalTypeSpecifier) {
			return visitor.visitIntervalTypeSpecifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TupleTypeSpecifierContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public tupleElementDefinition_list(): TupleElementDefinitionContext[] {
		return this.getTypedRuleContexts(TupleElementDefinitionContext) as TupleElementDefinitionContext[];
	}
	public tupleElementDefinition(i: number): TupleElementDefinitionContext {
		return this.getTypedRuleContext(TupleElementDefinitionContext, i) as TupleElementDefinitionContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_tupleTypeSpecifier;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterTupleTypeSpecifier) {
	 		listener.enterTupleTypeSpecifier(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitTupleTypeSpecifier) {
	 		listener.exitTupleTypeSpecifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitTupleTypeSpecifier) {
			return visitor.visitTupleTypeSpecifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TupleElementDefinitionContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public referentialIdentifier(): ReferentialIdentifierContext {
		return this.getTypedRuleContext(ReferentialIdentifierContext, 0) as ReferentialIdentifierContext;
	}
	public typeSpecifier(): TypeSpecifierContext {
		return this.getTypedRuleContext(TypeSpecifierContext, 0) as TypeSpecifierContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_tupleElementDefinition;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterTupleElementDefinition) {
	 		listener.enterTupleElementDefinition(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitTupleElementDefinition) {
	 		listener.exitTupleElementDefinition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitTupleElementDefinition) {
			return visitor.visitTupleElementDefinition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ChoiceTypeSpecifierContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public typeSpecifier_list(): TypeSpecifierContext[] {
		return this.getTypedRuleContexts(TypeSpecifierContext) as TypeSpecifierContext[];
	}
	public typeSpecifier(i: number): TypeSpecifierContext {
		return this.getTypedRuleContext(TypeSpecifierContext, i) as TypeSpecifierContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_choiceTypeSpecifier;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterChoiceTypeSpecifier) {
	 		listener.enterChoiceTypeSpecifier(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitChoiceTypeSpecifier) {
	 		listener.exitChoiceTypeSpecifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitChoiceTypeSpecifier) {
			return visitor.visitChoiceTypeSpecifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StatementContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public expressionDefinition(): ExpressionDefinitionContext {
		return this.getTypedRuleContext(ExpressionDefinitionContext, 0) as ExpressionDefinitionContext;
	}
	public contextDefinition(): ContextDefinitionContext {
		return this.getTypedRuleContext(ContextDefinitionContext, 0) as ContextDefinitionContext;
	}
	public functionDefinition(): FunctionDefinitionContext {
		return this.getTypedRuleContext(FunctionDefinitionContext, 0) as FunctionDefinitionContext;
	}
	public contextInfoDefinition(): ContextInfoDefinitionContext {
		return this.getTypedRuleContext(ContextInfoDefinitionContext, 0) as ContextInfoDefinitionContext;
	}
	public typeInfoDefinition(): TypeInfoDefinitionContext {
		return this.getTypedRuleContext(TypeInfoDefinitionContext, 0) as TypeInfoDefinitionContext;
	}
	public conversionInfoDefinition(): ConversionInfoDefinitionContext {
		return this.getTypedRuleContext(ConversionInfoDefinitionContext, 0) as ConversionInfoDefinitionContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_statement;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterStatement) {
	 		listener.enterStatement(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitStatement) {
	 		listener.exitStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitStatement) {
			return visitor.visitStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionDefinitionContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public accessModifier(): AccessModifierContext {
		return this.getTypedRuleContext(AccessModifierContext, 0) as AccessModifierContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_expressionDefinition;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterExpressionDefinition) {
	 		listener.enterExpressionDefinition(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitExpressionDefinition) {
	 		listener.exitExpressionDefinition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitExpressionDefinition) {
			return visitor.visitExpressionDefinition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ContextDefinitionContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
	public modelIdentifier(): ModelIdentifierContext {
		return this.getTypedRuleContext(ModelIdentifierContext, 0) as ModelIdentifierContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_contextDefinition;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterContextDefinition) {
	 		listener.enterContextDefinition(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitContextDefinition) {
	 		listener.exitContextDefinition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitContextDefinition) {
			return visitor.visitContextDefinition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FunctionDefinitionContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifierOrFunctionIdentifier(): IdentifierOrFunctionIdentifierContext {
		return this.getTypedRuleContext(IdentifierOrFunctionIdentifierContext, 0) as IdentifierOrFunctionIdentifierContext;
	}
	public functionBody(): FunctionBodyContext {
		return this.getTypedRuleContext(FunctionBodyContext, 0) as FunctionBodyContext;
	}
	public accessModifier(): AccessModifierContext {
		return this.getTypedRuleContext(AccessModifierContext, 0) as AccessModifierContext;
	}
	public operandDefinition_list(): OperandDefinitionContext[] {
		return this.getTypedRuleContexts(OperandDefinitionContext) as OperandDefinitionContext[];
	}
	public operandDefinition(i: number): OperandDefinitionContext {
		return this.getTypedRuleContext(OperandDefinitionContext, i) as OperandDefinitionContext;
	}
	public typeSpecifier(): TypeSpecifierContext {
		return this.getTypedRuleContext(TypeSpecifierContext, 0) as TypeSpecifierContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_functionDefinition;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterFunctionDefinition) {
	 		listener.enterFunctionDefinition(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitFunctionDefinition) {
	 		listener.exitFunctionDefinition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitFunctionDefinition) {
			return visitor.visitFunctionDefinition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class OperandDefinitionContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public referentialIdentifier(): ReferentialIdentifierContext {
		return this.getTypedRuleContext(ReferentialIdentifierContext, 0) as ReferentialIdentifierContext;
	}
	public typeSpecifier(): TypeSpecifierContext {
		return this.getTypedRuleContext(TypeSpecifierContext, 0) as TypeSpecifierContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_operandDefinition;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterOperandDefinition) {
	 		listener.enterOperandDefinition(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitOperandDefinition) {
	 		listener.exitOperandDefinition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitOperandDefinition) {
			return visitor.visitOperandDefinition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FunctionBodyContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_functionBody;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterFunctionBody) {
	 		listener.enterFunctionBody(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitFunctionBody) {
	 		listener.exitFunctionBody(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitFunctionBody) {
			return visitor.visitFunctionBody(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class QualifiedIdentifierOrFunctionIdentifierContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifierOrFunctionIdentifier(): IdentifierOrFunctionIdentifierContext {
		return this.getTypedRuleContext(IdentifierOrFunctionIdentifierContext, 0) as IdentifierOrFunctionIdentifierContext;
	}
	public qualifierExpression_list(): QualifierExpressionContext[] {
		return this.getTypedRuleContexts(QualifierExpressionContext) as QualifierExpressionContext[];
	}
	public qualifierExpression(i: number): QualifierExpressionContext {
		return this.getTypedRuleContext(QualifierExpressionContext, i) as QualifierExpressionContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_qualifiedIdentifierOrFunctionIdentifier;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterQualifiedIdentifierOrFunctionIdentifier) {
	 		listener.enterQualifiedIdentifierOrFunctionIdentifier(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitQualifiedIdentifierOrFunctionIdentifier) {
	 		listener.exitQualifiedIdentifierOrFunctionIdentifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitQualifiedIdentifierOrFunctionIdentifier) {
			return visitor.visitQualifiedIdentifierOrFunctionIdentifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ContextInfoDefinitionContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
	public namedTypeSpecifier(): NamedTypeSpecifierContext {
		return this.getTypedRuleContext(NamedTypeSpecifierContext, 0) as NamedTypeSpecifierContext;
	}
	public qualifiedIdentifierOrFunctionIdentifier_list(): QualifiedIdentifierOrFunctionIdentifierContext[] {
		return this.getTypedRuleContexts(QualifiedIdentifierOrFunctionIdentifierContext) as QualifiedIdentifierOrFunctionIdentifierContext[];
	}
	public qualifiedIdentifierOrFunctionIdentifier(i: number): QualifiedIdentifierOrFunctionIdentifierContext {
		return this.getTypedRuleContext(QualifiedIdentifierOrFunctionIdentifierContext, i) as QualifiedIdentifierOrFunctionIdentifierContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_contextInfoDefinition;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterContextInfoDefinition) {
	 		listener.enterContextInfoDefinition(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitContextInfoDefinition) {
	 		listener.exitContextInfoDefinition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitContextInfoDefinition) {
			return visitor.visitContextInfoDefinition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeInfoDefinitionContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public qualifiedIdentifier(): QualifiedIdentifierContext {
		return this.getTypedRuleContext(QualifiedIdentifierContext, 0) as QualifiedIdentifierContext;
	}
	public typeInfo(): TypeInfoContext {
		return this.getTypedRuleContext(TypeInfoContext, 0) as TypeInfoContext;
	}
	public accessModifier(): AccessModifierContext {
		return this.getTypedRuleContext(AccessModifierContext, 0) as AccessModifierContext;
	}
	public baseTypeSpecifier(): BaseTypeSpecifierContext {
		return this.getTypedRuleContext(BaseTypeSpecifierContext, 0) as BaseTypeSpecifierContext;
	}
	public typeElements(): TypeElementsContext {
		return this.getTypedRuleContext(TypeElementsContext, 0) as TypeElementsContext;
	}
	public contextRelationship_list(): ContextRelationshipContext[] {
		return this.getTypedRuleContexts(ContextRelationshipContext) as ContextRelationshipContext[];
	}
	public contextRelationship(i: number): ContextRelationshipContext {
		return this.getTypedRuleContext(ContextRelationshipContext, i) as ContextRelationshipContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_typeInfoDefinition;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterTypeInfoDefinition) {
	 		listener.enterTypeInfoDefinition(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitTypeInfoDefinition) {
	 		listener.exitTypeInfoDefinition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitTypeInfoDefinition) {
			return visitor.visitTypeInfoDefinition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BaseTypeSpecifierContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public namedTypeSpecifier(): NamedTypeSpecifierContext {
		return this.getTypedRuleContext(NamedTypeSpecifierContext, 0) as NamedTypeSpecifierContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_baseTypeSpecifier;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterBaseTypeSpecifier) {
	 		listener.enterBaseTypeSpecifier(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitBaseTypeSpecifier) {
	 		listener.exitBaseTypeSpecifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitBaseTypeSpecifier) {
			return visitor.visitBaseTypeSpecifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeElementsContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public typeElementDefinition_list(): TypeElementDefinitionContext[] {
		return this.getTypedRuleContexts(TypeElementDefinitionContext) as TypeElementDefinitionContext[];
	}
	public typeElementDefinition(i: number): TypeElementDefinitionContext {
		return this.getTypedRuleContext(TypeElementDefinitionContext, i) as TypeElementDefinitionContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_typeElements;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterTypeElements) {
	 		listener.enterTypeElements(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitTypeElements) {
	 		listener.exitTypeElements(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitTypeElements) {
			return visitor.visitTypeElements(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeElementDefinitionContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public referentialIdentifier(): ReferentialIdentifierContext {
		return this.getTypedRuleContext(ReferentialIdentifierContext, 0) as ReferentialIdentifierContext;
	}
	public typeSpecifier(): TypeSpecifierContext {
		return this.getTypedRuleContext(TypeSpecifierContext, 0) as TypeSpecifierContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_typeElementDefinition;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterTypeElementDefinition) {
	 		listener.enterTypeElementDefinition(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitTypeElementDefinition) {
	 		listener.exitTypeElementDefinition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitTypeElementDefinition) {
			return visitor.visitTypeElementDefinition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeInfoContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
	public STRING(): TerminalNode {
		return this.getToken(cqlParser.STRING, 0);
	}
	public simplePath(): SimplePathContext {
		return this.getTypedRuleContext(SimplePathContext, 0) as SimplePathContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_typeInfo;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterTypeInfo) {
	 		listener.enterTypeInfo(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitTypeInfo) {
	 		listener.exitTypeInfo(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitTypeInfo) {
			return visitor.visitTypeInfo(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ContextRelationshipContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public qualifiedIdentifier(): QualifiedIdentifierContext {
		return this.getTypedRuleContext(QualifiedIdentifierContext, 0) as QualifiedIdentifierContext;
	}
	public qualifiedIdentifierOrFunctionIdentifier_list(): QualifiedIdentifierOrFunctionIdentifierContext[] {
		return this.getTypedRuleContexts(QualifiedIdentifierOrFunctionIdentifierContext) as QualifiedIdentifierOrFunctionIdentifierContext[];
	}
	public qualifiedIdentifierOrFunctionIdentifier(i: number): QualifiedIdentifierOrFunctionIdentifierContext {
		return this.getTypedRuleContext(QualifiedIdentifierOrFunctionIdentifierContext, i) as QualifiedIdentifierOrFunctionIdentifierContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_contextRelationship;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterContextRelationship) {
	 		listener.enterContextRelationship(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitContextRelationship) {
	 		listener.exitContextRelationship(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitContextRelationship) {
			return visitor.visitContextRelationship(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ConversionInfoDefinitionContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public typeSpecifier_list(): TypeSpecifierContext[] {
		return this.getTypedRuleContexts(TypeSpecifierContext) as TypeSpecifierContext[];
	}
	public typeSpecifier(i: number): TypeSpecifierContext {
		return this.getTypedRuleContext(TypeSpecifierContext, i) as TypeSpecifierContext;
	}
	public qualifiedIdentifierOrFunctionIdentifier(): QualifiedIdentifierOrFunctionIdentifierContext {
		return this.getTypedRuleContext(QualifiedIdentifierOrFunctionIdentifierContext, 0) as QualifiedIdentifierOrFunctionIdentifierContext;
	}
	public accessModifier(): AccessModifierContext {
		return this.getTypedRuleContext(AccessModifierContext, 0) as AccessModifierContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_conversionInfoDefinition;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterConversionInfoDefinition) {
	 		listener.enterConversionInfoDefinition(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitConversionInfoDefinition) {
	 		listener.exitConversionInfoDefinition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitConversionInfoDefinition) {
			return visitor.visitConversionInfoDefinition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class QuerySourceContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public retrieve(): RetrieveContext {
		return this.getTypedRuleContext(RetrieveContext, 0) as RetrieveContext;
	}
	public qualifiedIdentifierExpression(): QualifiedIdentifierExpressionContext {
		return this.getTypedRuleContext(QualifiedIdentifierExpressionContext, 0) as QualifiedIdentifierExpressionContext;
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_querySource;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterQuerySource) {
	 		listener.enterQuerySource(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitQuerySource) {
	 		listener.exitQuerySource(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitQuerySource) {
			return visitor.visitQuerySource(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AliasedQuerySourceContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public querySource(): QuerySourceContext {
		return this.getTypedRuleContext(QuerySourceContext, 0) as QuerySourceContext;
	}
	public alias(): AliasContext {
		return this.getTypedRuleContext(AliasContext, 0) as AliasContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_aliasedQuerySource;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterAliasedQuerySource) {
	 		listener.enterAliasedQuerySource(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitAliasedQuerySource) {
	 		listener.exitAliasedQuerySource(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitAliasedQuerySource) {
			return visitor.visitAliasedQuerySource(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AliasContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_alias;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterAlias) {
	 		listener.enterAlias(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitAlias) {
	 		listener.exitAlias(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitAlias) {
			return visitor.visitAlias(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class QueryInclusionClauseContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public withClause(): WithClauseContext {
		return this.getTypedRuleContext(WithClauseContext, 0) as WithClauseContext;
	}
	public withoutClause(): WithoutClauseContext {
		return this.getTypedRuleContext(WithoutClauseContext, 0) as WithoutClauseContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_queryInclusionClause;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterQueryInclusionClause) {
	 		listener.enterQueryInclusionClause(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitQueryInclusionClause) {
	 		listener.exitQueryInclusionClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitQueryInclusionClause) {
			return visitor.visitQueryInclusionClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class WithClauseContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public aliasedQuerySource(): AliasedQuerySourceContext {
		return this.getTypedRuleContext(AliasedQuerySourceContext, 0) as AliasedQuerySourceContext;
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_withClause;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterWithClause) {
	 		listener.enterWithClause(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitWithClause) {
	 		listener.exitWithClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitWithClause) {
			return visitor.visitWithClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class WithoutClauseContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public aliasedQuerySource(): AliasedQuerySourceContext {
		return this.getTypedRuleContext(AliasedQuerySourceContext, 0) as AliasedQuerySourceContext;
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_withoutClause;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterWithoutClause) {
	 		listener.enterWithoutClause(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitWithoutClause) {
	 		listener.exitWithoutClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitWithoutClause) {
			return visitor.visitWithoutClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RetrieveContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public namedTypeSpecifier(): NamedTypeSpecifierContext {
		return this.getTypedRuleContext(NamedTypeSpecifierContext, 0) as NamedTypeSpecifierContext;
	}
	public contextIdentifier(): ContextIdentifierContext {
		return this.getTypedRuleContext(ContextIdentifierContext, 0) as ContextIdentifierContext;
	}
	public terminology(): TerminologyContext {
		return this.getTypedRuleContext(TerminologyContext, 0) as TerminologyContext;
	}
	public codePath(): CodePathContext {
		return this.getTypedRuleContext(CodePathContext, 0) as CodePathContext;
	}
	public codeComparator(): CodeComparatorContext {
		return this.getTypedRuleContext(CodeComparatorContext, 0) as CodeComparatorContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_retrieve;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterRetrieve) {
	 		listener.enterRetrieve(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitRetrieve) {
	 		listener.exitRetrieve(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitRetrieve) {
			return visitor.visitRetrieve(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ContextIdentifierContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public qualifiedIdentifierExpression(): QualifiedIdentifierExpressionContext {
		return this.getTypedRuleContext(QualifiedIdentifierExpressionContext, 0) as QualifiedIdentifierExpressionContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_contextIdentifier;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterContextIdentifier) {
	 		listener.enterContextIdentifier(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitContextIdentifier) {
	 		listener.exitContextIdentifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitContextIdentifier) {
			return visitor.visitContextIdentifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CodePathContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public simplePath(): SimplePathContext {
		return this.getTypedRuleContext(SimplePathContext, 0) as SimplePathContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_codePath;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterCodePath) {
	 		listener.enterCodePath(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitCodePath) {
	 		listener.exitCodePath(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitCodePath) {
			return visitor.visitCodePath(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CodeComparatorContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_codeComparator;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterCodeComparator) {
	 		listener.enterCodeComparator(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitCodeComparator) {
	 		listener.exitCodeComparator(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitCodeComparator) {
			return visitor.visitCodeComparator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TerminologyContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public qualifiedIdentifierExpression(): QualifiedIdentifierExpressionContext {
		return this.getTypedRuleContext(QualifiedIdentifierExpressionContext, 0) as QualifiedIdentifierExpressionContext;
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_terminology;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterTerminology) {
	 		listener.enterTerminology(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitTerminology) {
	 		listener.exitTerminology(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitTerminology) {
			return visitor.visitTerminology(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class QualifierContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_qualifier;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterQualifier) {
	 		listener.enterQualifier(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitQualifier) {
	 		listener.exitQualifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitQualifier) {
			return visitor.visitQualifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class QueryContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public sourceClause(): SourceClauseContext {
		return this.getTypedRuleContext(SourceClauseContext, 0) as SourceClauseContext;
	}
	public letClause(): LetClauseContext {
		return this.getTypedRuleContext(LetClauseContext, 0) as LetClauseContext;
	}
	public queryInclusionClause_list(): QueryInclusionClauseContext[] {
		return this.getTypedRuleContexts(QueryInclusionClauseContext) as QueryInclusionClauseContext[];
	}
	public queryInclusionClause(i: number): QueryInclusionClauseContext {
		return this.getTypedRuleContext(QueryInclusionClauseContext, i) as QueryInclusionClauseContext;
	}
	public whereClause(): WhereClauseContext {
		return this.getTypedRuleContext(WhereClauseContext, 0) as WhereClauseContext;
	}
	public aggregateClause(): AggregateClauseContext {
		return this.getTypedRuleContext(AggregateClauseContext, 0) as AggregateClauseContext;
	}
	public returnClause(): ReturnClauseContext {
		return this.getTypedRuleContext(ReturnClauseContext, 0) as ReturnClauseContext;
	}
	public sortClause(): SortClauseContext {
		return this.getTypedRuleContext(SortClauseContext, 0) as SortClauseContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_query;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterQuery) {
	 		listener.enterQuery(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitQuery) {
	 		listener.exitQuery(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitQuery) {
			return visitor.visitQuery(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SourceClauseContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public aliasedQuerySource_list(): AliasedQuerySourceContext[] {
		return this.getTypedRuleContexts(AliasedQuerySourceContext) as AliasedQuerySourceContext[];
	}
	public aliasedQuerySource(i: number): AliasedQuerySourceContext {
		return this.getTypedRuleContext(AliasedQuerySourceContext, i) as AliasedQuerySourceContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_sourceClause;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterSourceClause) {
	 		listener.enterSourceClause(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitSourceClause) {
	 		listener.exitSourceClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitSourceClause) {
			return visitor.visitSourceClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LetClauseContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public letClauseItem_list(): LetClauseItemContext[] {
		return this.getTypedRuleContexts(LetClauseItemContext) as LetClauseItemContext[];
	}
	public letClauseItem(i: number): LetClauseItemContext {
		return this.getTypedRuleContext(LetClauseItemContext, i) as LetClauseItemContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_letClause;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterLetClause) {
	 		listener.enterLetClause(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitLetClause) {
	 		listener.exitLetClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitLetClause) {
			return visitor.visitLetClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LetClauseItemContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_letClauseItem;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterLetClauseItem) {
	 		listener.enterLetClauseItem(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitLetClauseItem) {
	 		listener.exitLetClauseItem(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitLetClauseItem) {
			return visitor.visitLetClauseItem(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class WhereClauseContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_whereClause;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterWhereClause) {
	 		listener.enterWhereClause(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitWhereClause) {
	 		listener.exitWhereClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitWhereClause) {
			return visitor.visitWhereClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ReturnClauseContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_returnClause;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterReturnClause) {
	 		listener.enterReturnClause(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitReturnClause) {
	 		listener.exitReturnClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitReturnClause) {
			return visitor.visitReturnClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AggregateClauseContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public startingClause(): StartingClauseContext {
		return this.getTypedRuleContext(StartingClauseContext, 0) as StartingClauseContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_aggregateClause;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterAggregateClause) {
	 		listener.enterAggregateClause(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitAggregateClause) {
	 		listener.exitAggregateClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitAggregateClause) {
			return visitor.visitAggregateClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StartingClauseContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public simpleLiteral(): SimpleLiteralContext {
		return this.getTypedRuleContext(SimpleLiteralContext, 0) as SimpleLiteralContext;
	}
	public quantity(): QuantityContext {
		return this.getTypedRuleContext(QuantityContext, 0) as QuantityContext;
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_startingClause;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterStartingClause) {
	 		listener.enterStartingClause(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitStartingClause) {
	 		listener.exitStartingClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitStartingClause) {
			return visitor.visitStartingClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SortClauseContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public sortDirection(): SortDirectionContext {
		return this.getTypedRuleContext(SortDirectionContext, 0) as SortDirectionContext;
	}
	public sortByItem_list(): SortByItemContext[] {
		return this.getTypedRuleContexts(SortByItemContext) as SortByItemContext[];
	}
	public sortByItem(i: number): SortByItemContext {
		return this.getTypedRuleContext(SortByItemContext, i) as SortByItemContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_sortClause;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterSortClause) {
	 		listener.enterSortClause(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitSortClause) {
	 		listener.exitSortClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitSortClause) {
			return visitor.visitSortClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SortDirectionContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_sortDirection;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterSortDirection) {
	 		listener.enterSortDirection(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitSortDirection) {
	 		listener.exitSortDirection(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitSortDirection) {
			return visitor.visitSortDirection(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SortByItemContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public expressionTerm(): ExpressionTermContext {
		return this.getTypedRuleContext(ExpressionTermContext, 0) as ExpressionTermContext;
	}
	public sortDirection(): SortDirectionContext {
		return this.getTypedRuleContext(SortDirectionContext, 0) as SortDirectionContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_sortByItem;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterSortByItem) {
	 		listener.enterSortByItem(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitSortByItem) {
	 		listener.exitSortByItem(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitSortByItem) {
			return visitor.visitSortByItem(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class QualifiedIdentifierContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
	public qualifier_list(): QualifierContext[] {
		return this.getTypedRuleContexts(QualifierContext) as QualifierContext[];
	}
	public qualifier(i: number): QualifierContext {
		return this.getTypedRuleContext(QualifierContext, i) as QualifierContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_qualifiedIdentifier;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterQualifiedIdentifier) {
	 		listener.enterQualifiedIdentifier(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitQualifiedIdentifier) {
	 		listener.exitQualifiedIdentifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitQualifiedIdentifier) {
			return visitor.visitQualifiedIdentifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class QualifiedIdentifierExpressionContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public referentialIdentifier(): ReferentialIdentifierContext {
		return this.getTypedRuleContext(ReferentialIdentifierContext, 0) as ReferentialIdentifierContext;
	}
	public qualifierExpression_list(): QualifierExpressionContext[] {
		return this.getTypedRuleContexts(QualifierExpressionContext) as QualifierExpressionContext[];
	}
	public qualifierExpression(i: number): QualifierExpressionContext {
		return this.getTypedRuleContext(QualifierExpressionContext, i) as QualifierExpressionContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_qualifiedIdentifierExpression;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterQualifiedIdentifierExpression) {
	 		listener.enterQualifiedIdentifierExpression(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitQualifiedIdentifierExpression) {
	 		listener.exitQualifiedIdentifierExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitQualifiedIdentifierExpression) {
			return visitor.visitQualifiedIdentifierExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class QualifierExpressionContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public referentialIdentifier(): ReferentialIdentifierContext {
		return this.getTypedRuleContext(ReferentialIdentifierContext, 0) as ReferentialIdentifierContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_qualifierExpression;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterQualifierExpression) {
	 		listener.enterQualifierExpression(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitQualifierExpression) {
	 		listener.exitQualifierExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitQualifierExpression) {
			return visitor.visitQualifierExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SimplePathContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_simplePath;
	}
	public override copyFrom(ctx: SimplePathContext): void {
		super.copyFrom(ctx);
	}
}
export class SimplePathIndexerContext extends SimplePathContext {
	constructor(parser: cqlParser, ctx: SimplePathContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public simplePath(): SimplePathContext {
		return this.getTypedRuleContext(SimplePathContext, 0) as SimplePathContext;
	}
	public simpleLiteral(): SimpleLiteralContext {
		return this.getTypedRuleContext(SimpleLiteralContext, 0) as SimpleLiteralContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterSimplePathIndexer) {
	 		listener.enterSimplePathIndexer(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitSimplePathIndexer) {
	 		listener.exitSimplePathIndexer(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitSimplePathIndexer) {
			return visitor.visitSimplePathIndexer(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class SimplePathQualifiedIdentifierContext extends SimplePathContext {
	constructor(parser: cqlParser, ctx: SimplePathContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public simplePath(): SimplePathContext {
		return this.getTypedRuleContext(SimplePathContext, 0) as SimplePathContext;
	}
	public referentialIdentifier(): ReferentialIdentifierContext {
		return this.getTypedRuleContext(ReferentialIdentifierContext, 0) as ReferentialIdentifierContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterSimplePathQualifiedIdentifier) {
	 		listener.enterSimplePathQualifiedIdentifier(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitSimplePathQualifiedIdentifier) {
	 		listener.exitSimplePathQualifiedIdentifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitSimplePathQualifiedIdentifier) {
			return visitor.visitSimplePathQualifiedIdentifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class SimplePathReferentialIdentifierContext extends SimplePathContext {
	constructor(parser: cqlParser, ctx: SimplePathContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public referentialIdentifier(): ReferentialIdentifierContext {
		return this.getTypedRuleContext(ReferentialIdentifierContext, 0) as ReferentialIdentifierContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterSimplePathReferentialIdentifier) {
	 		listener.enterSimplePathReferentialIdentifier(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitSimplePathReferentialIdentifier) {
	 		listener.exitSimplePathReferentialIdentifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitSimplePathReferentialIdentifier) {
			return visitor.visitSimplePathReferentialIdentifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SimpleLiteralContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_simpleLiteral;
	}
	public override copyFrom(ctx: SimpleLiteralContext): void {
		super.copyFrom(ctx);
	}
}
export class SimpleNumberLiteralContext extends SimpleLiteralContext {
	constructor(parser: cqlParser, ctx: SimpleLiteralContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public INTEGER(): TerminalNode {
		return this.getToken(cqlParser.INTEGER, 0);
	}
	public DECIMAL(): TerminalNode {
		return this.getToken(cqlParser.DECIMAL, 0);
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterSimpleNumberLiteral) {
	 		listener.enterSimpleNumberLiteral(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitSimpleNumberLiteral) {
	 		listener.exitSimpleNumberLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitSimpleNumberLiteral) {
			return visitor.visitSimpleNumberLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class SimpleStringLiteralContext extends SimpleLiteralContext {
	constructor(parser: cqlParser, ctx: SimpleLiteralContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public STRING(): TerminalNode {
		return this.getToken(cqlParser.STRING, 0);
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterSimpleStringLiteral) {
	 		listener.enterSimpleStringLiteral(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitSimpleStringLiteral) {
	 		listener.exitSimpleStringLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitSimpleStringLiteral) {
			return visitor.visitSimpleStringLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_expression;
	}
	public override copyFrom(ctx: ExpressionContext): void {
		super.copyFrom(ctx);
	}
}
export class DurationBetweenExpressionContext extends ExpressionContext {
	constructor(parser: cqlParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public pluralDateTimePrecision(): PluralDateTimePrecisionContext {
		return this.getTypedRuleContext(PluralDateTimePrecisionContext, 0) as PluralDateTimePrecisionContext;
	}
	public expressionTerm_list(): ExpressionTermContext[] {
		return this.getTypedRuleContexts(ExpressionTermContext) as ExpressionTermContext[];
	}
	public expressionTerm(i: number): ExpressionTermContext {
		return this.getTypedRuleContext(ExpressionTermContext, i) as ExpressionTermContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterDurationBetweenExpression) {
	 		listener.enterDurationBetweenExpression(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitDurationBetweenExpression) {
	 		listener.exitDurationBetweenExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitDurationBetweenExpression) {
			return visitor.visitDurationBetweenExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class InFixSetExpressionContext extends ExpressionContext {
	constructor(parser: cqlParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterInFixSetExpression) {
	 		listener.enterInFixSetExpression(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitInFixSetExpression) {
	 		listener.exitInFixSetExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitInFixSetExpression) {
			return visitor.visitInFixSetExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class RetrieveExpressionContext extends ExpressionContext {
	constructor(parser: cqlParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public retrieve(): RetrieveContext {
		return this.getTypedRuleContext(RetrieveContext, 0) as RetrieveContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterRetrieveExpression) {
	 		listener.enterRetrieveExpression(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitRetrieveExpression) {
	 		listener.exitRetrieveExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitRetrieveExpression) {
			return visitor.visitRetrieveExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TimingExpressionContext extends ExpressionContext {
	constructor(parser: cqlParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public intervalOperatorPhrase(): IntervalOperatorPhraseContext {
		return this.getTypedRuleContext(IntervalOperatorPhraseContext, 0) as IntervalOperatorPhraseContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterTimingExpression) {
	 		listener.enterTimingExpression(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitTimingExpression) {
	 		listener.exitTimingExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitTimingExpression) {
			return visitor.visitTimingExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class QueryExpressionContext extends ExpressionContext {
	constructor(parser: cqlParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public query(): QueryContext {
		return this.getTypedRuleContext(QueryContext, 0) as QueryContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterQueryExpression) {
	 		listener.enterQueryExpression(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitQueryExpression) {
	 		listener.exitQueryExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitQueryExpression) {
			return visitor.visitQueryExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NotExpressionContext extends ExpressionContext {
	constructor(parser: cqlParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterNotExpression) {
	 		listener.enterNotExpression(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitNotExpression) {
	 		listener.exitNotExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitNotExpression) {
			return visitor.visitNotExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class BooleanExpressionContext extends ExpressionContext {
	constructor(parser: cqlParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterBooleanExpression) {
	 		listener.enterBooleanExpression(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitBooleanExpression) {
	 		listener.exitBooleanExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitBooleanExpression) {
			return visitor.visitBooleanExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class OrExpressionContext extends ExpressionContext {
	constructor(parser: cqlParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterOrExpression) {
	 		listener.enterOrExpression(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitOrExpression) {
	 		listener.exitOrExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitOrExpression) {
			return visitor.visitOrExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class CastExpressionContext extends ExpressionContext {
	constructor(parser: cqlParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public typeSpecifier(): TypeSpecifierContext {
		return this.getTypedRuleContext(TypeSpecifierContext, 0) as TypeSpecifierContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterCastExpression) {
	 		listener.enterCastExpression(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitCastExpression) {
	 		listener.exitCastExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitCastExpression) {
			return visitor.visitCastExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AndExpressionContext extends ExpressionContext {
	constructor(parser: cqlParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterAndExpression) {
	 		listener.enterAndExpression(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitAndExpression) {
	 		listener.exitAndExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitAndExpression) {
			return visitor.visitAndExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class BetweenExpressionContext extends ExpressionContext {
	constructor(parser: cqlParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public expressionTerm_list(): ExpressionTermContext[] {
		return this.getTypedRuleContexts(ExpressionTermContext) as ExpressionTermContext[];
	}
	public expressionTerm(i: number): ExpressionTermContext {
		return this.getTypedRuleContext(ExpressionTermContext, i) as ExpressionTermContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterBetweenExpression) {
	 		listener.enterBetweenExpression(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitBetweenExpression) {
	 		listener.exitBetweenExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitBetweenExpression) {
			return visitor.visitBetweenExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class MembershipExpressionContext extends ExpressionContext {
	constructor(parser: cqlParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public dateTimePrecisionSpecifier(): DateTimePrecisionSpecifierContext {
		return this.getTypedRuleContext(DateTimePrecisionSpecifierContext, 0) as DateTimePrecisionSpecifierContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterMembershipExpression) {
	 		listener.enterMembershipExpression(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitMembershipExpression) {
	 		listener.exitMembershipExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitMembershipExpression) {
			return visitor.visitMembershipExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DifferenceBetweenExpressionContext extends ExpressionContext {
	constructor(parser: cqlParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public pluralDateTimePrecision(): PluralDateTimePrecisionContext {
		return this.getTypedRuleContext(PluralDateTimePrecisionContext, 0) as PluralDateTimePrecisionContext;
	}
	public expressionTerm_list(): ExpressionTermContext[] {
		return this.getTypedRuleContexts(ExpressionTermContext) as ExpressionTermContext[];
	}
	public expressionTerm(i: number): ExpressionTermContext {
		return this.getTypedRuleContext(ExpressionTermContext, i) as ExpressionTermContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterDifferenceBetweenExpression) {
	 		listener.enterDifferenceBetweenExpression(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitDifferenceBetweenExpression) {
	 		listener.exitDifferenceBetweenExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitDifferenceBetweenExpression) {
			return visitor.visitDifferenceBetweenExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class InequalityExpressionContext extends ExpressionContext {
	constructor(parser: cqlParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterInequalityExpression) {
	 		listener.enterInequalityExpression(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitInequalityExpression) {
	 		listener.exitInequalityExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitInequalityExpression) {
			return visitor.visitInequalityExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class EqualityExpressionContext extends ExpressionContext {
	constructor(parser: cqlParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterEqualityExpression) {
	 		listener.enterEqualityExpression(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitEqualityExpression) {
	 		listener.exitEqualityExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitEqualityExpression) {
			return visitor.visitEqualityExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ExistenceExpressionContext extends ExpressionContext {
	constructor(parser: cqlParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterExistenceExpression) {
	 		listener.enterExistenceExpression(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitExistenceExpression) {
	 		listener.exitExistenceExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitExistenceExpression) {
			return visitor.visitExistenceExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ImpliesExpressionContext extends ExpressionContext {
	constructor(parser: cqlParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterImpliesExpression) {
	 		listener.enterImpliesExpression(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitImpliesExpression) {
	 		listener.exitImpliesExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitImpliesExpression) {
			return visitor.visitImpliesExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TermExpressionContext extends ExpressionContext {
	constructor(parser: cqlParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expressionTerm(): ExpressionTermContext {
		return this.getTypedRuleContext(ExpressionTermContext, 0) as ExpressionTermContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterTermExpression) {
	 		listener.enterTermExpression(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitTermExpression) {
	 		listener.exitTermExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitTermExpression) {
			return visitor.visitTermExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TypeExpressionContext extends ExpressionContext {
	constructor(parser: cqlParser, ctx: ExpressionContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public typeSpecifier(): TypeSpecifierContext {
		return this.getTypedRuleContext(TypeSpecifierContext, 0) as TypeSpecifierContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterTypeExpression) {
	 		listener.enterTypeExpression(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitTypeExpression) {
	 		listener.exitTypeExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitTypeExpression) {
			return visitor.visitTypeExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DateTimePrecisionContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_dateTimePrecision;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterDateTimePrecision) {
	 		listener.enterDateTimePrecision(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitDateTimePrecision) {
	 		listener.exitDateTimePrecision(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitDateTimePrecision) {
			return visitor.visitDateTimePrecision(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DateTimeComponentContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public dateTimePrecision(): DateTimePrecisionContext {
		return this.getTypedRuleContext(DateTimePrecisionContext, 0) as DateTimePrecisionContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_dateTimeComponent;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterDateTimeComponent) {
	 		listener.enterDateTimeComponent(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitDateTimeComponent) {
	 		listener.exitDateTimeComponent(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitDateTimeComponent) {
			return visitor.visitDateTimeComponent(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PluralDateTimePrecisionContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_pluralDateTimePrecision;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterPluralDateTimePrecision) {
	 		listener.enterPluralDateTimePrecision(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitPluralDateTimePrecision) {
	 		listener.exitPluralDateTimePrecision(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitPluralDateTimePrecision) {
			return visitor.visitPluralDateTimePrecision(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionTermContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_expressionTerm;
	}
	public override copyFrom(ctx: ExpressionTermContext): void {
		super.copyFrom(ctx);
	}
}
export class AdditionExpressionTermContext extends ExpressionTermContext {
	constructor(parser: cqlParser, ctx: ExpressionTermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expressionTerm_list(): ExpressionTermContext[] {
		return this.getTypedRuleContexts(ExpressionTermContext) as ExpressionTermContext[];
	}
	public expressionTerm(i: number): ExpressionTermContext {
		return this.getTypedRuleContext(ExpressionTermContext, i) as ExpressionTermContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterAdditionExpressionTerm) {
	 		listener.enterAdditionExpressionTerm(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitAdditionExpressionTerm) {
	 		listener.exitAdditionExpressionTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitAdditionExpressionTerm) {
			return visitor.visitAdditionExpressionTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class IndexedExpressionTermContext extends ExpressionTermContext {
	constructor(parser: cqlParser, ctx: ExpressionTermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expressionTerm(): ExpressionTermContext {
		return this.getTypedRuleContext(ExpressionTermContext, 0) as ExpressionTermContext;
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterIndexedExpressionTerm) {
	 		listener.enterIndexedExpressionTerm(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitIndexedExpressionTerm) {
	 		listener.exitIndexedExpressionTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitIndexedExpressionTerm) {
			return visitor.visitIndexedExpressionTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class WidthExpressionTermContext extends ExpressionTermContext {
	constructor(parser: cqlParser, ctx: ExpressionTermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expressionTerm(): ExpressionTermContext {
		return this.getTypedRuleContext(ExpressionTermContext, 0) as ExpressionTermContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterWidthExpressionTerm) {
	 		listener.enterWidthExpressionTerm(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitWidthExpressionTerm) {
	 		listener.exitWidthExpressionTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitWidthExpressionTerm) {
			return visitor.visitWidthExpressionTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class SetAggregateExpressionTermContext extends ExpressionTermContext {
	constructor(parser: cqlParser, ctx: ExpressionTermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public dateTimePrecision(): DateTimePrecisionContext {
		return this.getTypedRuleContext(DateTimePrecisionContext, 0) as DateTimePrecisionContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterSetAggregateExpressionTerm) {
	 		listener.enterSetAggregateExpressionTerm(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitSetAggregateExpressionTerm) {
	 		listener.exitSetAggregateExpressionTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitSetAggregateExpressionTerm) {
			return visitor.visitSetAggregateExpressionTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TimeUnitExpressionTermContext extends ExpressionTermContext {
	constructor(parser: cqlParser, ctx: ExpressionTermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public dateTimeComponent(): DateTimeComponentContext {
		return this.getTypedRuleContext(DateTimeComponentContext, 0) as DateTimeComponentContext;
	}
	public expressionTerm(): ExpressionTermContext {
		return this.getTypedRuleContext(ExpressionTermContext, 0) as ExpressionTermContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterTimeUnitExpressionTerm) {
	 		listener.enterTimeUnitExpressionTerm(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitTimeUnitExpressionTerm) {
	 		listener.exitTimeUnitExpressionTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitTimeUnitExpressionTerm) {
			return visitor.visitTimeUnitExpressionTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class IfThenElseExpressionTermContext extends ExpressionTermContext {
	constructor(parser: cqlParser, ctx: ExpressionTermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterIfThenElseExpressionTerm) {
	 		listener.enterIfThenElseExpressionTerm(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitIfThenElseExpressionTerm) {
	 		listener.exitIfThenElseExpressionTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitIfThenElseExpressionTerm) {
			return visitor.visitIfThenElseExpressionTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TimeBoundaryExpressionTermContext extends ExpressionTermContext {
	constructor(parser: cqlParser, ctx: ExpressionTermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expressionTerm(): ExpressionTermContext {
		return this.getTypedRuleContext(ExpressionTermContext, 0) as ExpressionTermContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterTimeBoundaryExpressionTerm) {
	 		listener.enterTimeBoundaryExpressionTerm(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitTimeBoundaryExpressionTerm) {
	 		listener.exitTimeBoundaryExpressionTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitTimeBoundaryExpressionTerm) {
			return visitor.visitTimeBoundaryExpressionTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ElementExtractorExpressionTermContext extends ExpressionTermContext {
	constructor(parser: cqlParser, ctx: ExpressionTermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expressionTerm(): ExpressionTermContext {
		return this.getTypedRuleContext(ExpressionTermContext, 0) as ExpressionTermContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterElementExtractorExpressionTerm) {
	 		listener.enterElementExtractorExpressionTerm(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitElementExtractorExpressionTerm) {
	 		listener.exitElementExtractorExpressionTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitElementExtractorExpressionTerm) {
			return visitor.visitElementExtractorExpressionTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ConversionExpressionTermContext extends ExpressionTermContext {
	constructor(parser: cqlParser, ctx: ExpressionTermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public typeSpecifier(): TypeSpecifierContext {
		return this.getTypedRuleContext(TypeSpecifierContext, 0) as TypeSpecifierContext;
	}
	public unit(): UnitContext {
		return this.getTypedRuleContext(UnitContext, 0) as UnitContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterConversionExpressionTerm) {
	 		listener.enterConversionExpressionTerm(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitConversionExpressionTerm) {
	 		listener.exitConversionExpressionTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitConversionExpressionTerm) {
			return visitor.visitConversionExpressionTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TypeExtentExpressionTermContext extends ExpressionTermContext {
	constructor(parser: cqlParser, ctx: ExpressionTermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public namedTypeSpecifier(): NamedTypeSpecifierContext {
		return this.getTypedRuleContext(NamedTypeSpecifierContext, 0) as NamedTypeSpecifierContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterTypeExtentExpressionTerm) {
	 		listener.enterTypeExtentExpressionTerm(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitTypeExtentExpressionTerm) {
	 		listener.exitTypeExtentExpressionTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitTypeExtentExpressionTerm) {
			return visitor.visitTypeExtentExpressionTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class PredecessorExpressionTermContext extends ExpressionTermContext {
	constructor(parser: cqlParser, ctx: ExpressionTermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expressionTerm(): ExpressionTermContext {
		return this.getTypedRuleContext(ExpressionTermContext, 0) as ExpressionTermContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterPredecessorExpressionTerm) {
	 		listener.enterPredecessorExpressionTerm(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitPredecessorExpressionTerm) {
	 		listener.exitPredecessorExpressionTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitPredecessorExpressionTerm) {
			return visitor.visitPredecessorExpressionTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class PointExtractorExpressionTermContext extends ExpressionTermContext {
	constructor(parser: cqlParser, ctx: ExpressionTermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expressionTerm(): ExpressionTermContext {
		return this.getTypedRuleContext(ExpressionTermContext, 0) as ExpressionTermContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterPointExtractorExpressionTerm) {
	 		listener.enterPointExtractorExpressionTerm(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitPointExtractorExpressionTerm) {
	 		listener.exitPointExtractorExpressionTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitPointExtractorExpressionTerm) {
			return visitor.visitPointExtractorExpressionTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class MultiplicationExpressionTermContext extends ExpressionTermContext {
	constructor(parser: cqlParser, ctx: ExpressionTermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expressionTerm_list(): ExpressionTermContext[] {
		return this.getTypedRuleContexts(ExpressionTermContext) as ExpressionTermContext[];
	}
	public expressionTerm(i: number): ExpressionTermContext {
		return this.getTypedRuleContext(ExpressionTermContext, i) as ExpressionTermContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterMultiplicationExpressionTerm) {
	 		listener.enterMultiplicationExpressionTerm(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitMultiplicationExpressionTerm) {
	 		listener.exitMultiplicationExpressionTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitMultiplicationExpressionTerm) {
			return visitor.visitMultiplicationExpressionTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AggregateExpressionTermContext extends ExpressionTermContext {
	constructor(parser: cqlParser, ctx: ExpressionTermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterAggregateExpressionTerm) {
	 		listener.enterAggregateExpressionTerm(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitAggregateExpressionTerm) {
	 		listener.exitAggregateExpressionTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitAggregateExpressionTerm) {
			return visitor.visitAggregateExpressionTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DurationExpressionTermContext extends ExpressionTermContext {
	constructor(parser: cqlParser, ctx: ExpressionTermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public pluralDateTimePrecision(): PluralDateTimePrecisionContext {
		return this.getTypedRuleContext(PluralDateTimePrecisionContext, 0) as PluralDateTimePrecisionContext;
	}
	public expressionTerm(): ExpressionTermContext {
		return this.getTypedRuleContext(ExpressionTermContext, 0) as ExpressionTermContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterDurationExpressionTerm) {
	 		listener.enterDurationExpressionTerm(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitDurationExpressionTerm) {
	 		listener.exitDurationExpressionTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitDurationExpressionTerm) {
			return visitor.visitDurationExpressionTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DifferenceExpressionTermContext extends ExpressionTermContext {
	constructor(parser: cqlParser, ctx: ExpressionTermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public pluralDateTimePrecision(): PluralDateTimePrecisionContext {
		return this.getTypedRuleContext(PluralDateTimePrecisionContext, 0) as PluralDateTimePrecisionContext;
	}
	public expressionTerm(): ExpressionTermContext {
		return this.getTypedRuleContext(ExpressionTermContext, 0) as ExpressionTermContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterDifferenceExpressionTerm) {
	 		listener.enterDifferenceExpressionTerm(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitDifferenceExpressionTerm) {
	 		listener.exitDifferenceExpressionTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitDifferenceExpressionTerm) {
			return visitor.visitDifferenceExpressionTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class CaseExpressionTermContext extends ExpressionTermContext {
	constructor(parser: cqlParser, ctx: ExpressionTermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public caseExpressionItem_list(): CaseExpressionItemContext[] {
		return this.getTypedRuleContexts(CaseExpressionItemContext) as CaseExpressionItemContext[];
	}
	public caseExpressionItem(i: number): CaseExpressionItemContext {
		return this.getTypedRuleContext(CaseExpressionItemContext, i) as CaseExpressionItemContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterCaseExpressionTerm) {
	 		listener.enterCaseExpressionTerm(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitCaseExpressionTerm) {
	 		listener.exitCaseExpressionTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitCaseExpressionTerm) {
			return visitor.visitCaseExpressionTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class PowerExpressionTermContext extends ExpressionTermContext {
	constructor(parser: cqlParser, ctx: ExpressionTermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expressionTerm_list(): ExpressionTermContext[] {
		return this.getTypedRuleContexts(ExpressionTermContext) as ExpressionTermContext[];
	}
	public expressionTerm(i: number): ExpressionTermContext {
		return this.getTypedRuleContext(ExpressionTermContext, i) as ExpressionTermContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterPowerExpressionTerm) {
	 		listener.enterPowerExpressionTerm(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitPowerExpressionTerm) {
	 		listener.exitPowerExpressionTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitPowerExpressionTerm) {
			return visitor.visitPowerExpressionTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class SuccessorExpressionTermContext extends ExpressionTermContext {
	constructor(parser: cqlParser, ctx: ExpressionTermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expressionTerm(): ExpressionTermContext {
		return this.getTypedRuleContext(ExpressionTermContext, 0) as ExpressionTermContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterSuccessorExpressionTerm) {
	 		listener.enterSuccessorExpressionTerm(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitSuccessorExpressionTerm) {
	 		listener.exitSuccessorExpressionTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitSuccessorExpressionTerm) {
			return visitor.visitSuccessorExpressionTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class PolarityExpressionTermContext extends ExpressionTermContext {
	constructor(parser: cqlParser, ctx: ExpressionTermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expressionTerm(): ExpressionTermContext {
		return this.getTypedRuleContext(ExpressionTermContext, 0) as ExpressionTermContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterPolarityExpressionTerm) {
	 		listener.enterPolarityExpressionTerm(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitPolarityExpressionTerm) {
	 		listener.exitPolarityExpressionTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitPolarityExpressionTerm) {
			return visitor.visitPolarityExpressionTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TermExpressionTermContext extends ExpressionTermContext {
	constructor(parser: cqlParser, ctx: ExpressionTermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public term(): TermContext {
		return this.getTypedRuleContext(TermContext, 0) as TermContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterTermExpressionTerm) {
	 		listener.enterTermExpressionTerm(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitTermExpressionTerm) {
	 		listener.exitTermExpressionTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitTermExpressionTerm) {
			return visitor.visitTermExpressionTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class InvocationExpressionTermContext extends ExpressionTermContext {
	constructor(parser: cqlParser, ctx: ExpressionTermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expressionTerm(): ExpressionTermContext {
		return this.getTypedRuleContext(ExpressionTermContext, 0) as ExpressionTermContext;
	}
	public qualifiedInvocation(): QualifiedInvocationContext {
		return this.getTypedRuleContext(QualifiedInvocationContext, 0) as QualifiedInvocationContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterInvocationExpressionTerm) {
	 		listener.enterInvocationExpressionTerm(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitInvocationExpressionTerm) {
	 		listener.exitInvocationExpressionTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitInvocationExpressionTerm) {
			return visitor.visitInvocationExpressionTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CaseExpressionItemContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
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
    	return cqlParser.RULE_caseExpressionItem;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterCaseExpressionItem) {
	 		listener.enterCaseExpressionItem(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitCaseExpressionItem) {
	 		listener.exitCaseExpressionItem(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitCaseExpressionItem) {
			return visitor.visitCaseExpressionItem(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DateTimePrecisionSpecifierContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public dateTimePrecision(): DateTimePrecisionContext {
		return this.getTypedRuleContext(DateTimePrecisionContext, 0) as DateTimePrecisionContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_dateTimePrecisionSpecifier;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterDateTimePrecisionSpecifier) {
	 		listener.enterDateTimePrecisionSpecifier(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitDateTimePrecisionSpecifier) {
	 		listener.exitDateTimePrecisionSpecifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitDateTimePrecisionSpecifier) {
			return visitor.visitDateTimePrecisionSpecifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RelativeQualifierContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_relativeQualifier;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterRelativeQualifier) {
	 		listener.enterRelativeQualifier(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitRelativeQualifier) {
	 		listener.exitRelativeQualifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitRelativeQualifier) {
			return visitor.visitRelativeQualifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class OffsetRelativeQualifierContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_offsetRelativeQualifier;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterOffsetRelativeQualifier) {
	 		listener.enterOffsetRelativeQualifier(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitOffsetRelativeQualifier) {
	 		listener.exitOffsetRelativeQualifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitOffsetRelativeQualifier) {
			return visitor.visitOffsetRelativeQualifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExclusiveRelativeQualifierContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_exclusiveRelativeQualifier;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterExclusiveRelativeQualifier) {
	 		listener.enterExclusiveRelativeQualifier(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitExclusiveRelativeQualifier) {
	 		listener.exitExclusiveRelativeQualifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitExclusiveRelativeQualifier) {
			return visitor.visitExclusiveRelativeQualifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class QuantityOffsetContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public quantity(): QuantityContext {
		return this.getTypedRuleContext(QuantityContext, 0) as QuantityContext;
	}
	public offsetRelativeQualifier(): OffsetRelativeQualifierContext {
		return this.getTypedRuleContext(OffsetRelativeQualifierContext, 0) as OffsetRelativeQualifierContext;
	}
	public exclusiveRelativeQualifier(): ExclusiveRelativeQualifierContext {
		return this.getTypedRuleContext(ExclusiveRelativeQualifierContext, 0) as ExclusiveRelativeQualifierContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_quantityOffset;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterQuantityOffset) {
	 		listener.enterQuantityOffset(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitQuantityOffset) {
	 		listener.exitQuantityOffset(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitQuantityOffset) {
			return visitor.visitQuantityOffset(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TemporalRelationshipContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_temporalRelationship;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterTemporalRelationship) {
	 		listener.enterTemporalRelationship(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitTemporalRelationship) {
	 		listener.exitTemporalRelationship(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitTemporalRelationship) {
			return visitor.visitTemporalRelationship(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IntervalOperatorPhraseContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_intervalOperatorPhrase;
	}
	public override copyFrom(ctx: IntervalOperatorPhraseContext): void {
		super.copyFrom(ctx);
	}
}
export class WithinIntervalOperatorPhraseContext extends IntervalOperatorPhraseContext {
	constructor(parser: cqlParser, ctx: IntervalOperatorPhraseContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public quantity(): QuantityContext {
		return this.getTypedRuleContext(QuantityContext, 0) as QuantityContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterWithinIntervalOperatorPhrase) {
	 		listener.enterWithinIntervalOperatorPhrase(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitWithinIntervalOperatorPhrase) {
	 		listener.exitWithinIntervalOperatorPhrase(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitWithinIntervalOperatorPhrase) {
			return visitor.visitWithinIntervalOperatorPhrase(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class IncludedInIntervalOperatorPhraseContext extends IntervalOperatorPhraseContext {
	constructor(parser: cqlParser, ctx: IntervalOperatorPhraseContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public dateTimePrecisionSpecifier(): DateTimePrecisionSpecifierContext {
		return this.getTypedRuleContext(DateTimePrecisionSpecifierContext, 0) as DateTimePrecisionSpecifierContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterIncludedInIntervalOperatorPhrase) {
	 		listener.enterIncludedInIntervalOperatorPhrase(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitIncludedInIntervalOperatorPhrase) {
	 		listener.exitIncludedInIntervalOperatorPhrase(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitIncludedInIntervalOperatorPhrase) {
			return visitor.visitIncludedInIntervalOperatorPhrase(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class EndsIntervalOperatorPhraseContext extends IntervalOperatorPhraseContext {
	constructor(parser: cqlParser, ctx: IntervalOperatorPhraseContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public dateTimePrecisionSpecifier(): DateTimePrecisionSpecifierContext {
		return this.getTypedRuleContext(DateTimePrecisionSpecifierContext, 0) as DateTimePrecisionSpecifierContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterEndsIntervalOperatorPhrase) {
	 		listener.enterEndsIntervalOperatorPhrase(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitEndsIntervalOperatorPhrase) {
	 		listener.exitEndsIntervalOperatorPhrase(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitEndsIntervalOperatorPhrase) {
			return visitor.visitEndsIntervalOperatorPhrase(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ConcurrentWithIntervalOperatorPhraseContext extends IntervalOperatorPhraseContext {
	constructor(parser: cqlParser, ctx: IntervalOperatorPhraseContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public relativeQualifier(): RelativeQualifierContext {
		return this.getTypedRuleContext(RelativeQualifierContext, 0) as RelativeQualifierContext;
	}
	public dateTimePrecision(): DateTimePrecisionContext {
		return this.getTypedRuleContext(DateTimePrecisionContext, 0) as DateTimePrecisionContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterConcurrentWithIntervalOperatorPhrase) {
	 		listener.enterConcurrentWithIntervalOperatorPhrase(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitConcurrentWithIntervalOperatorPhrase) {
	 		listener.exitConcurrentWithIntervalOperatorPhrase(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitConcurrentWithIntervalOperatorPhrase) {
			return visitor.visitConcurrentWithIntervalOperatorPhrase(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class OverlapsIntervalOperatorPhraseContext extends IntervalOperatorPhraseContext {
	constructor(parser: cqlParser, ctx: IntervalOperatorPhraseContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public dateTimePrecisionSpecifier(): DateTimePrecisionSpecifierContext {
		return this.getTypedRuleContext(DateTimePrecisionSpecifierContext, 0) as DateTimePrecisionSpecifierContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterOverlapsIntervalOperatorPhrase) {
	 		listener.enterOverlapsIntervalOperatorPhrase(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitOverlapsIntervalOperatorPhrase) {
	 		listener.exitOverlapsIntervalOperatorPhrase(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitOverlapsIntervalOperatorPhrase) {
			return visitor.visitOverlapsIntervalOperatorPhrase(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class IncludesIntervalOperatorPhraseContext extends IntervalOperatorPhraseContext {
	constructor(parser: cqlParser, ctx: IntervalOperatorPhraseContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public dateTimePrecisionSpecifier(): DateTimePrecisionSpecifierContext {
		return this.getTypedRuleContext(DateTimePrecisionSpecifierContext, 0) as DateTimePrecisionSpecifierContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterIncludesIntervalOperatorPhrase) {
	 		listener.enterIncludesIntervalOperatorPhrase(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitIncludesIntervalOperatorPhrase) {
	 		listener.exitIncludesIntervalOperatorPhrase(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitIncludesIntervalOperatorPhrase) {
			return visitor.visitIncludesIntervalOperatorPhrase(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class BeforeOrAfterIntervalOperatorPhraseContext extends IntervalOperatorPhraseContext {
	constructor(parser: cqlParser, ctx: IntervalOperatorPhraseContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public temporalRelationship(): TemporalRelationshipContext {
		return this.getTypedRuleContext(TemporalRelationshipContext, 0) as TemporalRelationshipContext;
	}
	public quantityOffset(): QuantityOffsetContext {
		return this.getTypedRuleContext(QuantityOffsetContext, 0) as QuantityOffsetContext;
	}
	public dateTimePrecisionSpecifier(): DateTimePrecisionSpecifierContext {
		return this.getTypedRuleContext(DateTimePrecisionSpecifierContext, 0) as DateTimePrecisionSpecifierContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterBeforeOrAfterIntervalOperatorPhrase) {
	 		listener.enterBeforeOrAfterIntervalOperatorPhrase(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitBeforeOrAfterIntervalOperatorPhrase) {
	 		listener.exitBeforeOrAfterIntervalOperatorPhrase(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitBeforeOrAfterIntervalOperatorPhrase) {
			return visitor.visitBeforeOrAfterIntervalOperatorPhrase(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class MeetsIntervalOperatorPhraseContext extends IntervalOperatorPhraseContext {
	constructor(parser: cqlParser, ctx: IntervalOperatorPhraseContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public dateTimePrecisionSpecifier(): DateTimePrecisionSpecifierContext {
		return this.getTypedRuleContext(DateTimePrecisionSpecifierContext, 0) as DateTimePrecisionSpecifierContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterMeetsIntervalOperatorPhrase) {
	 		listener.enterMeetsIntervalOperatorPhrase(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitMeetsIntervalOperatorPhrase) {
	 		listener.exitMeetsIntervalOperatorPhrase(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitMeetsIntervalOperatorPhrase) {
			return visitor.visitMeetsIntervalOperatorPhrase(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class StartsIntervalOperatorPhraseContext extends IntervalOperatorPhraseContext {
	constructor(parser: cqlParser, ctx: IntervalOperatorPhraseContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public dateTimePrecisionSpecifier(): DateTimePrecisionSpecifierContext {
		return this.getTypedRuleContext(DateTimePrecisionSpecifierContext, 0) as DateTimePrecisionSpecifierContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterStartsIntervalOperatorPhrase) {
	 		listener.enterStartsIntervalOperatorPhrase(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitStartsIntervalOperatorPhrase) {
	 		listener.exitStartsIntervalOperatorPhrase(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitStartsIntervalOperatorPhrase) {
			return visitor.visitStartsIntervalOperatorPhrase(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TermContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_term;
	}
	public override copyFrom(ctx: TermContext): void {
		super.copyFrom(ctx);
	}
}
export class ExternalConstantTermContext extends TermContext {
	constructor(parser: cqlParser, ctx: TermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public externalConstant(): ExternalConstantContext {
		return this.getTypedRuleContext(ExternalConstantContext, 0) as ExternalConstantContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterExternalConstantTerm) {
	 		listener.enterExternalConstantTerm(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitExternalConstantTerm) {
	 		listener.exitExternalConstantTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitExternalConstantTerm) {
			return visitor.visitExternalConstantTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class TupleSelectorTermContext extends TermContext {
	constructor(parser: cqlParser, ctx: TermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public tupleSelector(): TupleSelectorContext {
		return this.getTypedRuleContext(TupleSelectorContext, 0) as TupleSelectorContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterTupleSelectorTerm) {
	 		listener.enterTupleSelectorTerm(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitTupleSelectorTerm) {
	 		listener.exitTupleSelectorTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitTupleSelectorTerm) {
			return visitor.visitTupleSelectorTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LiteralTermContext extends TermContext {
	constructor(parser: cqlParser, ctx: TermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public literal(): LiteralContext {
		return this.getTypedRuleContext(LiteralContext, 0) as LiteralContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterLiteralTerm) {
	 		listener.enterLiteralTerm(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitLiteralTerm) {
	 		listener.exitLiteralTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitLiteralTerm) {
			return visitor.visitLiteralTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ConceptSelectorTermContext extends TermContext {
	constructor(parser: cqlParser, ctx: TermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public conceptSelector(): ConceptSelectorContext {
		return this.getTypedRuleContext(ConceptSelectorContext, 0) as ConceptSelectorContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterConceptSelectorTerm) {
	 		listener.enterConceptSelectorTerm(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitConceptSelectorTerm) {
	 		listener.exitConceptSelectorTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitConceptSelectorTerm) {
			return visitor.visitConceptSelectorTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ParenthesizedTermContext extends TermContext {
	constructor(parser: cqlParser, ctx: TermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterParenthesizedTerm) {
	 		listener.enterParenthesizedTerm(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitParenthesizedTerm) {
	 		listener.exitParenthesizedTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitParenthesizedTerm) {
			return visitor.visitParenthesizedTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class CodeSelectorTermContext extends TermContext {
	constructor(parser: cqlParser, ctx: TermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public codeSelector(): CodeSelectorContext {
		return this.getTypedRuleContext(CodeSelectorContext, 0) as CodeSelectorContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterCodeSelectorTerm) {
	 		listener.enterCodeSelectorTerm(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitCodeSelectorTerm) {
	 		listener.exitCodeSelectorTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitCodeSelectorTerm) {
			return visitor.visitCodeSelectorTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class InvocationTermContext extends TermContext {
	constructor(parser: cqlParser, ctx: TermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public invocation(): InvocationContext {
		return this.getTypedRuleContext(InvocationContext, 0) as InvocationContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterInvocationTerm) {
	 		listener.enterInvocationTerm(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitInvocationTerm) {
	 		listener.exitInvocationTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitInvocationTerm) {
			return visitor.visitInvocationTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class InstanceSelectorTermContext extends TermContext {
	constructor(parser: cqlParser, ctx: TermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public instanceSelector(): InstanceSelectorContext {
		return this.getTypedRuleContext(InstanceSelectorContext, 0) as InstanceSelectorContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterInstanceSelectorTerm) {
	 		listener.enterInstanceSelectorTerm(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitInstanceSelectorTerm) {
	 		listener.exitInstanceSelectorTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitInstanceSelectorTerm) {
			return visitor.visitInstanceSelectorTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class IntervalSelectorTermContext extends TermContext {
	constructor(parser: cqlParser, ctx: TermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public intervalSelector(): IntervalSelectorContext {
		return this.getTypedRuleContext(IntervalSelectorContext, 0) as IntervalSelectorContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterIntervalSelectorTerm) {
	 		listener.enterIntervalSelectorTerm(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitIntervalSelectorTerm) {
	 		listener.exitIntervalSelectorTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitIntervalSelectorTerm) {
			return visitor.visitIntervalSelectorTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ListSelectorTermContext extends TermContext {
	constructor(parser: cqlParser, ctx: TermContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public listSelector(): ListSelectorContext {
		return this.getTypedRuleContext(ListSelectorContext, 0) as ListSelectorContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterListSelectorTerm) {
	 		listener.enterListSelectorTerm(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitListSelectorTerm) {
	 		listener.exitListSelectorTerm(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitListSelectorTerm) {
			return visitor.visitListSelectorTerm(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class QualifiedInvocationContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_qualifiedInvocation;
	}
	public override copyFrom(ctx: QualifiedInvocationContext): void {
		super.copyFrom(ctx);
	}
}
export class QualifiedFunctionInvocationContext extends QualifiedInvocationContext {
	constructor(parser: cqlParser, ctx: QualifiedInvocationContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public qualifiedFunction(): QualifiedFunctionContext {
		return this.getTypedRuleContext(QualifiedFunctionContext, 0) as QualifiedFunctionContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterQualifiedFunctionInvocation) {
	 		listener.enterQualifiedFunctionInvocation(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitQualifiedFunctionInvocation) {
	 		listener.exitQualifiedFunctionInvocation(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitQualifiedFunctionInvocation) {
			return visitor.visitQualifiedFunctionInvocation(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class QualifiedMemberInvocationContext extends QualifiedInvocationContext {
	constructor(parser: cqlParser, ctx: QualifiedInvocationContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public referentialIdentifier(): ReferentialIdentifierContext {
		return this.getTypedRuleContext(ReferentialIdentifierContext, 0) as ReferentialIdentifierContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterQualifiedMemberInvocation) {
	 		listener.enterQualifiedMemberInvocation(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitQualifiedMemberInvocation) {
	 		listener.exitQualifiedMemberInvocation(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitQualifiedMemberInvocation) {
			return visitor.visitQualifiedMemberInvocation(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class QualifiedFunctionContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifierOrFunctionIdentifier(): IdentifierOrFunctionIdentifierContext {
		return this.getTypedRuleContext(IdentifierOrFunctionIdentifierContext, 0) as IdentifierOrFunctionIdentifierContext;
	}
	public paramList(): ParamListContext {
		return this.getTypedRuleContext(ParamListContext, 0) as ParamListContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_qualifiedFunction;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterQualifiedFunction) {
	 		listener.enterQualifiedFunction(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitQualifiedFunction) {
	 		listener.exitQualifiedFunction(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitQualifiedFunction) {
			return visitor.visitQualifiedFunction(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InvocationContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_invocation;
	}
	public override copyFrom(ctx: InvocationContext): void {
		super.copyFrom(ctx);
	}
}
export class TotalInvocationContext extends InvocationContext {
	constructor(parser: cqlParser, ctx: InvocationContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterTotalInvocation) {
	 		listener.enterTotalInvocation(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitTotalInvocation) {
	 		listener.exitTotalInvocation(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitTotalInvocation) {
			return visitor.visitTotalInvocation(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ThisInvocationContext extends InvocationContext {
	constructor(parser: cqlParser, ctx: InvocationContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterThisInvocation) {
	 		listener.enterThisInvocation(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitThisInvocation) {
	 		listener.exitThisInvocation(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitThisInvocation) {
			return visitor.visitThisInvocation(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class IndexInvocationContext extends InvocationContext {
	constructor(parser: cqlParser, ctx: InvocationContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterIndexInvocation) {
	 		listener.enterIndexInvocation(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitIndexInvocation) {
	 		listener.exitIndexInvocation(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitIndexInvocation) {
			return visitor.visitIndexInvocation(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class FunctionInvocationContext extends InvocationContext {
	constructor(parser: cqlParser, ctx: InvocationContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public function_(): FunctionContext {
		return this.getTypedRuleContext(FunctionContext, 0) as FunctionContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterFunctionInvocation) {
	 		listener.enterFunctionInvocation(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitFunctionInvocation) {
	 		listener.exitFunctionInvocation(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitFunctionInvocation) {
			return visitor.visitFunctionInvocation(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class MemberInvocationContext extends InvocationContext {
	constructor(parser: cqlParser, ctx: InvocationContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public referentialIdentifier(): ReferentialIdentifierContext {
		return this.getTypedRuleContext(ReferentialIdentifierContext, 0) as ReferentialIdentifierContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterMemberInvocation) {
	 		listener.enterMemberInvocation(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitMemberInvocation) {
	 		listener.exitMemberInvocation(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitMemberInvocation) {
			return visitor.visitMemberInvocation(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FunctionContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public referentialIdentifier(): ReferentialIdentifierContext {
		return this.getTypedRuleContext(ReferentialIdentifierContext, 0) as ReferentialIdentifierContext;
	}
	public paramList(): ParamListContext {
		return this.getTypedRuleContext(ParamListContext, 0) as ParamListContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_function;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterFunction) {
	 		listener.enterFunction(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitFunction) {
	 		listener.exitFunction(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitFunction) {
			return visitor.visitFunction(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RatioContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public quantity_list(): QuantityContext[] {
		return this.getTypedRuleContexts(QuantityContext) as QuantityContext[];
	}
	public quantity(i: number): QuantityContext {
		return this.getTypedRuleContext(QuantityContext, i) as QuantityContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_ratio;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterRatio) {
	 		listener.enterRatio(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitRatio) {
	 		listener.exitRatio(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitRatio) {
			return visitor.visitRatio(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LiteralContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_literal;
	}
	public override copyFrom(ctx: LiteralContext): void {
		super.copyFrom(ctx);
	}
}
export class TimeLiteralContext extends LiteralContext {
	constructor(parser: cqlParser, ctx: LiteralContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public TIME(): TerminalNode {
		return this.getToken(cqlParser.TIME, 0);
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterTimeLiteral) {
	 		listener.enterTimeLiteral(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitTimeLiteral) {
	 		listener.exitTimeLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitTimeLiteral) {
			return visitor.visitTimeLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NullLiteralContext extends LiteralContext {
	constructor(parser: cqlParser, ctx: LiteralContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterNullLiteral) {
	 		listener.enterNullLiteral(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitNullLiteral) {
	 		listener.exitNullLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitNullLiteral) {
			return visitor.visitNullLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class RatioLiteralContext extends LiteralContext {
	constructor(parser: cqlParser, ctx: LiteralContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public ratio(): RatioContext {
		return this.getTypedRuleContext(RatioContext, 0) as RatioContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterRatioLiteral) {
	 		listener.enterRatioLiteral(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitRatioLiteral) {
	 		listener.exitRatioLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitRatioLiteral) {
			return visitor.visitRatioLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DateTimeLiteralContext extends LiteralContext {
	constructor(parser: cqlParser, ctx: LiteralContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public DATETIME(): TerminalNode {
		return this.getToken(cqlParser.DATETIME, 0);
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterDateTimeLiteral) {
	 		listener.enterDateTimeLiteral(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitDateTimeLiteral) {
	 		listener.exitDateTimeLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitDateTimeLiteral) {
			return visitor.visitDateTimeLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class StringLiteralContext extends LiteralContext {
	constructor(parser: cqlParser, ctx: LiteralContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public STRING(): TerminalNode {
		return this.getToken(cqlParser.STRING, 0);
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterStringLiteral) {
	 		listener.enterStringLiteral(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitStringLiteral) {
	 		listener.exitStringLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitStringLiteral) {
			return visitor.visitStringLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DateLiteralContext extends LiteralContext {
	constructor(parser: cqlParser, ctx: LiteralContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public DATE(): TerminalNode {
		return this.getToken(cqlParser.DATE, 0);
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterDateLiteral) {
	 		listener.enterDateLiteral(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitDateLiteral) {
	 		listener.exitDateLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitDateLiteral) {
			return visitor.visitDateLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class BooleanLiteralContext extends LiteralContext {
	constructor(parser: cqlParser, ctx: LiteralContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterBooleanLiteral) {
	 		listener.enterBooleanLiteral(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitBooleanLiteral) {
	 		listener.exitBooleanLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitBooleanLiteral) {
			return visitor.visitBooleanLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NumberLiteralContext extends LiteralContext {
	constructor(parser: cqlParser, ctx: LiteralContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public INTEGER(): TerminalNode {
		return this.getToken(cqlParser.INTEGER, 0);
	}
	public DECIMAL(): TerminalNode {
		return this.getToken(cqlParser.DECIMAL, 0);
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterNumberLiteral) {
	 		listener.enterNumberLiteral(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitNumberLiteral) {
	 		listener.exitNumberLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitNumberLiteral) {
			return visitor.visitNumberLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LongNumberLiteralContext extends LiteralContext {
	constructor(parser: cqlParser, ctx: LiteralContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public LONGNUMBER(): TerminalNode {
		return this.getToken(cqlParser.LONGNUMBER, 0);
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterLongNumberLiteral) {
	 		listener.enterLongNumberLiteral(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitLongNumberLiteral) {
	 		listener.exitLongNumberLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitLongNumberLiteral) {
			return visitor.visitLongNumberLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class QuantityLiteralContext extends LiteralContext {
	constructor(parser: cqlParser, ctx: LiteralContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public quantity(): QuantityContext {
		return this.getTypedRuleContext(QuantityContext, 0) as QuantityContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterQuantityLiteral) {
	 		listener.enterQuantityLiteral(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitQuantityLiteral) {
	 		listener.exitQuantityLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitQuantityLiteral) {
			return visitor.visitQuantityLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExternalConstantContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public keywordIdentifier(): KeywordIdentifierContext {
		return this.getTypedRuleContext(KeywordIdentifierContext, 0) as KeywordIdentifierContext;
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
	public STRING(): TerminalNode {
		return this.getToken(cqlParser.STRING, 0);
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_externalConstant;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterExternalConstant) {
	 		listener.enterExternalConstant(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitExternalConstant) {
	 		listener.exitExternalConstant(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitExternalConstant) {
			return visitor.visitExternalConstant(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IntervalSelectorContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
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
    	return cqlParser.RULE_intervalSelector;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterIntervalSelector) {
	 		listener.enterIntervalSelector(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitIntervalSelector) {
	 		listener.exitIntervalSelector(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitIntervalSelector) {
			return visitor.visitIntervalSelector(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TupleSelectorContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public tupleElementSelector_list(): TupleElementSelectorContext[] {
		return this.getTypedRuleContexts(TupleElementSelectorContext) as TupleElementSelectorContext[];
	}
	public tupleElementSelector(i: number): TupleElementSelectorContext {
		return this.getTypedRuleContext(TupleElementSelectorContext, i) as TupleElementSelectorContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_tupleSelector;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterTupleSelector) {
	 		listener.enterTupleSelector(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitTupleSelector) {
	 		listener.exitTupleSelector(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitTupleSelector) {
			return visitor.visitTupleSelector(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TupleElementSelectorContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public referentialIdentifier(): ReferentialIdentifierContext {
		return this.getTypedRuleContext(ReferentialIdentifierContext, 0) as ReferentialIdentifierContext;
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_tupleElementSelector;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterTupleElementSelector) {
	 		listener.enterTupleElementSelector(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitTupleElementSelector) {
	 		listener.exitTupleElementSelector(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitTupleElementSelector) {
			return visitor.visitTupleElementSelector(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InstanceSelectorContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public namedTypeSpecifier(): NamedTypeSpecifierContext {
		return this.getTypedRuleContext(NamedTypeSpecifierContext, 0) as NamedTypeSpecifierContext;
	}
	public instanceElementSelector_list(): InstanceElementSelectorContext[] {
		return this.getTypedRuleContexts(InstanceElementSelectorContext) as InstanceElementSelectorContext[];
	}
	public instanceElementSelector(i: number): InstanceElementSelectorContext {
		return this.getTypedRuleContext(InstanceElementSelectorContext, i) as InstanceElementSelectorContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_instanceSelector;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterInstanceSelector) {
	 		listener.enterInstanceSelector(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitInstanceSelector) {
	 		listener.exitInstanceSelector(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitInstanceSelector) {
			return visitor.visitInstanceSelector(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InstanceElementSelectorContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public referentialIdentifier(): ReferentialIdentifierContext {
		return this.getTypedRuleContext(ReferentialIdentifierContext, 0) as ReferentialIdentifierContext;
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_instanceElementSelector;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterInstanceElementSelector) {
	 		listener.enterInstanceElementSelector(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitInstanceElementSelector) {
	 		listener.exitInstanceElementSelector(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitInstanceElementSelector) {
			return visitor.visitInstanceElementSelector(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ListSelectorContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public expression_list(): ExpressionContext[] {
		return this.getTypedRuleContexts(ExpressionContext) as ExpressionContext[];
	}
	public expression(i: number): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, i) as ExpressionContext;
	}
	public typeSpecifier(): TypeSpecifierContext {
		return this.getTypedRuleContext(TypeSpecifierContext, 0) as TypeSpecifierContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_listSelector;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterListSelector) {
	 		listener.enterListSelector(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitListSelector) {
	 		listener.exitListSelector(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitListSelector) {
			return visitor.visitListSelector(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DisplayClauseContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public STRING(): TerminalNode {
		return this.getToken(cqlParser.STRING, 0);
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_displayClause;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterDisplayClause) {
	 		listener.enterDisplayClause(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitDisplayClause) {
	 		listener.exitDisplayClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitDisplayClause) {
			return visitor.visitDisplayClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CodeSelectorContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public STRING(): TerminalNode {
		return this.getToken(cqlParser.STRING, 0);
	}
	public codesystemIdentifier(): CodesystemIdentifierContext {
		return this.getTypedRuleContext(CodesystemIdentifierContext, 0) as CodesystemIdentifierContext;
	}
	public displayClause(): DisplayClauseContext {
		return this.getTypedRuleContext(DisplayClauseContext, 0) as DisplayClauseContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_codeSelector;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterCodeSelector) {
	 		listener.enterCodeSelector(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitCodeSelector) {
	 		listener.exitCodeSelector(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitCodeSelector) {
			return visitor.visitCodeSelector(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ConceptSelectorContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public codeSelector_list(): CodeSelectorContext[] {
		return this.getTypedRuleContexts(CodeSelectorContext) as CodeSelectorContext[];
	}
	public codeSelector(i: number): CodeSelectorContext {
		return this.getTypedRuleContext(CodeSelectorContext, i) as CodeSelectorContext;
	}
	public displayClause(): DisplayClauseContext {
		return this.getTypedRuleContext(DisplayClauseContext, 0) as DisplayClauseContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_conceptSelector;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterConceptSelector) {
	 		listener.enterConceptSelector(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitConceptSelector) {
	 		listener.exitConceptSelector(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitConceptSelector) {
			return visitor.visitConceptSelector(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class KeywordContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_keyword;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterKeyword) {
	 		listener.enterKeyword(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitKeyword) {
	 		listener.exitKeyword(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitKeyword) {
			return visitor.visitKeyword(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ReservedWordContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_reservedWord;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterReservedWord) {
	 		listener.enterReservedWord(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitReservedWord) {
	 		listener.exitReservedWord(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitReservedWord) {
			return visitor.visitReservedWord(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class KeywordIdentifierContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_keywordIdentifier;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterKeywordIdentifier) {
	 		listener.enterKeywordIdentifier(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitKeywordIdentifier) {
	 		listener.exitKeywordIdentifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitKeywordIdentifier) {
			return visitor.visitKeywordIdentifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ObsoleteIdentifierContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_obsoleteIdentifier;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterObsoleteIdentifier) {
	 		listener.enterObsoleteIdentifier(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitObsoleteIdentifier) {
	 		listener.exitObsoleteIdentifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitObsoleteIdentifier) {
			return visitor.visitObsoleteIdentifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FunctionIdentifierContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_functionIdentifier;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterFunctionIdentifier) {
	 		listener.enterFunctionIdentifier(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitFunctionIdentifier) {
	 		listener.exitFunctionIdentifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitFunctionIdentifier) {
			return visitor.visitFunctionIdentifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeNameIdentifierContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_typeNameIdentifier;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterTypeNameIdentifier) {
	 		listener.enterTypeNameIdentifier(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitTypeNameIdentifier) {
	 		listener.exitTypeNameIdentifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitTypeNameIdentifier) {
			return visitor.visitTypeNameIdentifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ReferentialIdentifierContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
	public keywordIdentifier(): KeywordIdentifierContext {
		return this.getTypedRuleContext(KeywordIdentifierContext, 0) as KeywordIdentifierContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_referentialIdentifier;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterReferentialIdentifier) {
	 		listener.enterReferentialIdentifier(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitReferentialIdentifier) {
	 		listener.exitReferentialIdentifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitReferentialIdentifier) {
			return visitor.visitReferentialIdentifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ReferentialOrTypeNameIdentifierContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public referentialIdentifier(): ReferentialIdentifierContext {
		return this.getTypedRuleContext(ReferentialIdentifierContext, 0) as ReferentialIdentifierContext;
	}
	public typeNameIdentifier(): TypeNameIdentifierContext {
		return this.getTypedRuleContext(TypeNameIdentifierContext, 0) as TypeNameIdentifierContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_referentialOrTypeNameIdentifier;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterReferentialOrTypeNameIdentifier) {
	 		listener.enterReferentialOrTypeNameIdentifier(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitReferentialOrTypeNameIdentifier) {
	 		listener.exitReferentialOrTypeNameIdentifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitReferentialOrTypeNameIdentifier) {
			return visitor.visitReferentialOrTypeNameIdentifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IdentifierOrFunctionIdentifierContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
	public functionIdentifier(): FunctionIdentifierContext {
		return this.getTypedRuleContext(FunctionIdentifierContext, 0) as FunctionIdentifierContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_identifierOrFunctionIdentifier;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterIdentifierOrFunctionIdentifier) {
	 		listener.enterIdentifierOrFunctionIdentifier(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitIdentifierOrFunctionIdentifier) {
	 		listener.exitIdentifierOrFunctionIdentifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitIdentifierOrFunctionIdentifier) {
			return visitor.visitIdentifierOrFunctionIdentifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IdentifierContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(cqlParser.IDENTIFIER, 0);
	}
	public DELIMITEDIDENTIFIER(): TerminalNode {
		return this.getToken(cqlParser.DELIMITEDIDENTIFIER, 0);
	}
	public QUOTEDIDENTIFIER(): TerminalNode {
		return this.getToken(cqlParser.QUOTEDIDENTIFIER, 0);
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_identifier;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterIdentifier) {
	 		listener.enterIdentifier(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitIdentifier) {
	 		listener.exitIdentifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitIdentifier) {
			return visitor.visitIdentifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EntireExpressionContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public EOF(): TerminalNode {
		return this.getToken(cqlParser.EOF, 0);
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_entireExpression;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterEntireExpression) {
	 		listener.enterEntireExpression(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitEntireExpression) {
	 		listener.exitEntireExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitEntireExpression) {
			return visitor.visitEntireExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SortArgumentContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_sortArgument;
	}
	public override copyFrom(ctx: SortArgumentContext): void {
		super.copyFrom(ctx);
	}
}
export class SortDirectionArgumentContext extends SortArgumentContext {
	constructor(parser: cqlParser, ctx: SortArgumentContext) {
		super(parser, ctx.parentCtx, ctx.invokingState);
		super.copyFrom(ctx);
	}
	public expression(): ExpressionContext {
		return this.getTypedRuleContext(ExpressionContext, 0) as ExpressionContext;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterSortDirectionArgument) {
	 		listener.enterSortDirectionArgument(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitSortDirectionArgument) {
	 		listener.exitSortDirectionArgument(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitSortDirectionArgument) {
			return visitor.visitSortDirectionArgument(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParamListContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
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
    	return cqlParser.RULE_paramList;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterParamList) {
	 		listener.enterParamList(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitParamList) {
	 		listener.exitParamList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitParamList) {
			return visitor.visitParamList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class QuantityContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public INTEGER(): TerminalNode {
		return this.getToken(cqlParser.INTEGER, 0);
	}
	public DECIMAL(): TerminalNode {
		return this.getToken(cqlParser.DECIMAL, 0);
	}
	public unit(): UnitContext {
		return this.getTypedRuleContext(UnitContext, 0) as UnitContext;
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_quantity;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterQuantity) {
	 		listener.enterQuantity(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitQuantity) {
	 		listener.exitQuantity(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitQuantity) {
			return visitor.visitQuantity(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class UnitContext extends ParserRuleContext {
	constructor(parser?: cqlParser, parent?: ParserRuleContext, invokingState?: number) {
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
		return this.getToken(cqlParser.STRING, 0);
	}
    public get ruleIndex(): number {
    	return cqlParser.RULE_unit;
	}
	public enterRule(listener: cqlListener): void {
	    if(listener.enterUnit) {
	 		listener.enterUnit(this);
		}
	}
	public exitRule(listener: cqlListener): void {
	    if(listener.exitUnit) {
	 		listener.exitUnit(this);
		}
	}
	// @Override
	public accept<Result>(visitor: cqlVisitor<Result>): Result {
		if (visitor.visitUnit) {
			return visitor.visitUnit(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
