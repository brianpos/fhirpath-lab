
import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { mappingListener } from "./mappingListener.js";
// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;


export class mappingParser extends antlr.Parser {
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

    public static readonly literalNames = [
        null, "'conceptmap'", "'{'", "'}'", "'prefix'", "'='", "'-'", "':'", 
        "'map'", "'as'", "'contains'", "'in'", "'is'", "'asc'", "'desc'", 
        "'sort'", "'uses'", "'alias'", "'let'", "';'", "'group'", "'('", 
        "','", "')'", "'<<'", "'>>'", "'extends'", "'->'", "'..'", "'*'", 
        "'imports'", "'source'", "'target'", "'types'", "'where'", "'check'", 
        "'div'", "'first'", "'last'", "'.'", "'default'", "'log'", "'then'", 
        "'['", "']'", "'+'", "'/'", "'mod'", "'&'", "'|'", "'<='", "'<'", 
        "'>'", "'>='", "'~'", "'!='", "'!~'", "'and'", "'or'", "'xor'", 
        "'implies'", "'$this'", "'$index'", "'$total'", "'%'", "'not_first'", 
        "'not_last'", "'only_one'", "'share'", "'single'", "'type+'", "'queried'", 
        "'produced'", "'year'", "'month'", "'week'", "'day'", "'hour'", 
        "'minute'", "'second'", "'millisecond'", "'years'", "'months'", 
        "'weeks'", "'days'", "'hours'", "'minutes'", "'seconds'", "'milliseconds'", 
        null, null, null, null, null, null, null, null, null, null, null, 
        null, null, null, null, null, "'/// '"
    ];

    public static readonly symbolicNames = [
        null, null, null, null, null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, null, null, null, null, 
        null, "NULL_LITERAL", "BOOL", "DATE", "DATETIME", "TIME", "LONGNUMBER", 
        "DECIMAL", "INTEGER", "ID", "IDENTIFIER", "DELIMITEDIDENTIFIER", 
        "STRING", "DOUBLE_QUOTED_STRING", "TRIPLE_QUOTED_STRING_LITERAL", 
        "WS", "COMMENT", "METADATA_PREFIX", "LINE_COMMENT"
    ];
    public static readonly ruleNames = [
        "structureMap", "conceptMapDeclaration", "conceptMapPrefix", "conceptMapCodeMap", 
        "conceptMapSource", "conceptMapTarget", "code", "mapDeclaration", 
        "metadataDeclaration", "markdownLiteral", "url", "identifier", "structureDeclaration", 
        "constantDeclaration", "groupDeclaration", "parameters", "parameter", 
        "mapRules", "typeMode", "extends", "typeIdentifier", "mapRule", 
        "mapTransformationRule", "identityFieldList", "ruleName", "ruleSources", 
        "ruleSource", "ruleTargets", "ruleTarget", "sourceCardinality", 
        "upperBound", "qualifiedIdentifier", "sourceDefault", "alias", "whereClause", 
        "checkClause", "log", "dependentExpression", "importDeclaration", 
        "transform", "transformInvocation", "transformParamList", "transformParam", 
        "transformParamName", "transformParamValue", "groupInvocation", 
        "groupParamList", "groupParam", "fpExpression", "fpTerm", "fpInvocation", 
        "fpExternalConstant", "fpFunction", "fpSortArgument", "fpParamList", 
        "fpTypeSpecifier", "constant", "sourceListMode", "targetListMode", 
        "groupTypeMode", "modelMode", "parameterMode", "literal", "fpQuantity",
    ];

    public get grammarFileName(): string { return "mapping.g4"; }
    public get literalNames(): (string | null)[] { return mappingParser.literalNames; }
    public get symbolicNames(): (string | null)[] { return mappingParser.symbolicNames; }
    public get ruleNames(): string[] { return mappingParser.ruleNames; }
    public get serializedATN(): number[] { return mappingParser._serializedATN; }

    protected createFailedPredicateException(predicate?: string, message?: string): antlr.FailedPredicateException {
        return new antlr.FailedPredicateException(this, predicate, message);
    }

    public constructor(input: antlr.TokenStream) {
        super(input);
        this.interpreter = new antlr.ParserATNSimulator(this, mappingParser._ATN, mappingParser.decisionsToDFA, new antlr.PredictionContextCache());
    }
    public structureMap(): StructureMapContext {
        let localContext = new StructureMapContext(this.context, this.state);
        this.enterRule(localContext, 0, mappingParser.RULE_structureMap);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 131;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 0, this.context);
            while (alternative !== 1 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1 + 1) {
                    {
                    {
                    this.state = 128;
                    this.metadataDeclaration();
                    }
                    }
                }
                this.state = 133;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 0, this.context);
            }
            this.state = 137;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 1, this.context);
            while (alternative !== 1 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1 + 1) {
                    {
                    {
                    this.state = 134;
                    this.conceptMapDeclaration();
                    }
                    }
                }
                this.state = 139;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 1, this.context);
            }
            this.state = 141;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 8) {
                {
                this.state = 140;
                this.mapDeclaration();
                }
            }

            this.state = 146;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 3, this.context);
            while (alternative !== 1 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1 + 1) {
                    {
                    {
                    this.state = 143;
                    this.structureDeclaration();
                    }
                    }
                }
                this.state = 148;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 3, this.context);
            }
            this.state = 152;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 4, this.context);
            while (alternative !== 1 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1 + 1) {
                    {
                    {
                    this.state = 149;
                    this.importDeclaration();
                    }
                    }
                }
                this.state = 154;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 4, this.context);
            }
            this.state = 158;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 5, this.context);
            while (alternative !== 1 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1 + 1) {
                    {
                    {
                    this.state = 155;
                    this.constantDeclaration();
                    }
                    }
                }
                this.state = 160;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 5, this.context);
            }
            this.state = 162;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 161;
                this.groupDeclaration();
                }
                }
                this.state = 164;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 20);
            this.state = 166;
            this.match(mappingParser.EOF);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public conceptMapDeclaration(): ConceptMapDeclarationContext {
        let localContext = new ConceptMapDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 2, mappingParser.RULE_conceptMapDeclaration);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 168;
            this.match(mappingParser.T__0);
            this.state = 169;
            this.url();
            this.state = 170;
            this.match(mappingParser.T__1);
            this.state = 172;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 171;
                this.conceptMapPrefix();
                }
                }
                this.state = 174;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 4);
            this.state = 177;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 176;
                this.conceptMapCodeMap();
                }
                }
                this.state = 179;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 97);
            this.state = 181;
            this.match(mappingParser.T__2);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public conceptMapPrefix(): ConceptMapPrefixContext {
        let localContext = new ConceptMapPrefixContext(this.context, this.state);
        this.enterRule(localContext, 4, mappingParser.RULE_conceptMapPrefix);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 183;
            this.match(mappingParser.T__3);
            this.state = 184;
            this.match(mappingParser.ID);
            this.state = 185;
            this.match(mappingParser.T__4);
            this.state = 186;
            this.url();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public conceptMapCodeMap(): ConceptMapCodeMapContext {
        let localContext = new ConceptMapCodeMapContext(this.context, this.state);
        this.enterRule(localContext, 6, mappingParser.RULE_conceptMapCodeMap);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 188;
            this.conceptMapSource();
            this.state = 189;
            this.match(mappingParser.T__5);
            this.state = 190;
            this.conceptMapTarget();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public conceptMapSource(): ConceptMapSourceContext {
        let localContext = new ConceptMapSourceContext(this.context, this.state);
        this.enterRule(localContext, 8, mappingParser.RULE_conceptMapSource);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 192;
            this.match(mappingParser.ID);
            this.state = 193;
            this.match(mappingParser.T__6);
            this.state = 194;
            this.code();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public conceptMapTarget(): ConceptMapTargetContext {
        let localContext = new ConceptMapTargetContext(this.context, this.state);
        this.enterRule(localContext, 10, mappingParser.RULE_conceptMapTarget);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 196;
            this.match(mappingParser.ID);
            this.state = 197;
            this.match(mappingParser.T__6);
            this.state = 198;
            this.code();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public code(): CodeContext {
        let localContext = new CodeContext(this.context, this.state);
        this.enterRule(localContext, 12, mappingParser.RULE_code);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 200;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & 25) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public mapDeclaration(): MapDeclarationContext {
        let localContext = new MapDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 14, mappingParser.RULE_mapDeclaration);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 202;
            this.match(mappingParser.T__7);
            this.state = 203;
            this.url();
            this.state = 204;
            this.match(mappingParser.T__4);
            this.state = 207;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case mappingParser.T__8:
            case mappingParser.T__9:
            case mappingParser.T__10:
            case mappingParser.T__11:
            case mappingParser.T__12:
            case mappingParser.T__13:
            case mappingParser.T__14:
            case mappingParser.ID:
            case mappingParser.IDENTIFIER:
            case mappingParser.DELIMITEDIDENTIFIER:
                {
                this.state = 205;
                this.identifier();
                }
                break;
            case mappingParser.DOUBLE_QUOTED_STRING:
                {
                this.state = 206;
                this.match(mappingParser.DOUBLE_QUOTED_STRING);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public metadataDeclaration(): MetadataDeclarationContext {
        let localContext = new MetadataDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 16, mappingParser.RULE_metadataDeclaration);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 209;
            this.match(mappingParser.METADATA_PREFIX);
            this.state = 210;
            this.qualifiedIdentifier();
            this.state = 211;
            this.match(mappingParser.T__4);
            this.state = 214;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case mappingParser.NULL_LITERAL:
            case mappingParser.BOOL:
            case mappingParser.DATE:
            case mappingParser.DATETIME:
            case mappingParser.TIME:
            case mappingParser.LONGNUMBER:
            case mappingParser.DECIMAL:
            case mappingParser.INTEGER:
            case mappingParser.STRING:
            case mappingParser.DOUBLE_QUOTED_STRING:
                {
                this.state = 212;
                this.literal();
                }
                break;
            case mappingParser.TRIPLE_QUOTED_STRING_LITERAL:
                {
                this.state = 213;
                this.markdownLiteral();
                }
                break;
            case mappingParser.T__0:
            case mappingParser.T__7:
            case mappingParser.T__15:
            case mappingParser.T__17:
            case mappingParser.T__19:
            case mappingParser.T__29:
            case mappingParser.METADATA_PREFIX:
                break;
            default:
                break;
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public markdownLiteral(): MarkdownLiteralContext {
        let localContext = new MarkdownLiteralContext(this.context, this.state);
        this.enterRule(localContext, 18, mappingParser.RULE_markdownLiteral);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 216;
            this.match(mappingParser.TRIPLE_QUOTED_STRING_LITERAL);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public url(): UrlContext {
        let localContext = new UrlContext(this.context, this.state);
        this.enterRule(localContext, 20, mappingParser.RULE_url);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 218;
            _la = this.tokenStream.LA(1);
            if(!(_la === 100 || _la === 101)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public identifier(): IdentifierContext {
        let localContext = new IdentifierContext(this.context, this.state);
        this.enterRule(localContext, 22, mappingParser.RULE_identifier);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 220;
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 65024) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & 7) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public structureDeclaration(): StructureDeclarationContext {
        let localContext = new StructureDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 24, mappingParser.RULE_structureDeclaration);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 222;
            this.match(mappingParser.T__15);
            this.state = 223;
            this.url();
            this.state = 226;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 17) {
                {
                this.state = 224;
                this.match(mappingParser.T__16);
                this.state = 225;
                this.identifier();
                }
            }

            this.state = 228;
            this.match(mappingParser.T__8);
            this.state = 229;
            this.modelMode();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public constantDeclaration(): ConstantDeclarationContext {
        let localContext = new ConstantDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 26, mappingParser.RULE_constantDeclaration);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 231;
            this.match(mappingParser.T__17);
            this.state = 232;
            this.match(mappingParser.ID);
            this.state = 233;
            this.match(mappingParser.T__4);
            this.state = 234;
            this.fpExpression(0);
            this.state = 235;
            this.match(mappingParser.T__18);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public groupDeclaration(): GroupDeclarationContext {
        let localContext = new GroupDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 28, mappingParser.RULE_groupDeclaration);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 237;
            this.match(mappingParser.T__19);
            this.state = 238;
            this.match(mappingParser.ID);
            this.state = 239;
            this.parameters();
            this.state = 241;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 26) {
                {
                this.state = 240;
                this.extends_();
                }
            }

            this.state = 244;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 24) {
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
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public parameters(): ParametersContext {
        let localContext = new ParametersContext(this.context, this.state);
        this.enterRule(localContext, 30, mappingParser.RULE_parameters);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 248;
            this.match(mappingParser.T__20);
            this.state = 249;
            this.parameter();
            this.state = 252;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 250;
                this.match(mappingParser.T__21);
                this.state = 251;
                this.parameter();
                }
                }
                this.state = 254;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 22);
            this.state = 256;
            this.match(mappingParser.T__22);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public parameter(): ParameterContext {
        let localContext = new ParameterContext(this.context, this.state);
        this.enterRule(localContext, 32, mappingParser.RULE_parameter);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 258;
            this.parameterMode();
            this.state = 259;
            this.match(mappingParser.ID);
            this.state = 261;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 7) {
                {
                this.state = 260;
                this.typeIdentifier();
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public mapRules(): MapRulesContext {
        let localContext = new MapRulesContext(this.context, this.state);
        this.enterRule(localContext, 34, mappingParser.RULE_mapRules);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 263;
            this.match(mappingParser.T__1);
            this.state = 267;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 3289904912) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 127) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & 7) !== 0)) {
                {
                {
                this.state = 264;
                this.mapRule();
                }
                }
                this.state = 269;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 270;
            this.match(mappingParser.T__2);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public typeMode(): TypeModeContext {
        let localContext = new TypeModeContext(this.context, this.state);
        this.enterRule(localContext, 36, mappingParser.RULE_typeMode);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 272;
            this.match(mappingParser.T__23);
            this.state = 273;
            this.groupTypeMode();
            this.state = 274;
            this.match(mappingParser.T__24);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public extends_(): ExtendsContext {
        let localContext = new ExtendsContext(this.context, this.state);
        this.enterRule(localContext, 38, mappingParser.RULE_extends);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 276;
            this.match(mappingParser.T__25);
            this.state = 277;
            this.match(mappingParser.ID);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public typeIdentifier(): TypeIdentifierContext {
        let localContext = new TypeIdentifierContext(this.context, this.state);
        this.enterRule(localContext, 40, mappingParser.RULE_typeIdentifier);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 279;
            this.match(mappingParser.T__6);
            this.state = 280;
            this.identifier();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public mapRule(): MapRuleContext {
        let localContext = new MapRuleContext(this.context, this.state);
        this.enterRule(localContext, 42, mappingParser.RULE_mapRule);
        let _la: number;
        try {
            this.state = 303;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 19, this.context) ) {
            case 1:
                localContext = new MapSimpleBatchIdentityContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 282;
                this.qualifiedIdentifier();
                this.state = 283;
                this.match(mappingParser.T__26);
                this.state = 284;
                this.qualifiedIdentifier();
                this.state = 285;
                this.match(mappingParser.T__6);
                this.state = 286;
                this.identityFieldList();
                this.state = 288;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 101) {
                    {
                    this.state = 287;
                    this.ruleName();
                    }
                }

                this.state = 290;
                this.match(mappingParser.T__18);
                }
                break;
            case 2:
                localContext = new MapSimpleCopyContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 292;
                this.qualifiedIdentifier();
                this.state = 293;
                this.match(mappingParser.T__26);
                this.state = 294;
                this.qualifiedIdentifier();
                this.state = 296;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 101) {
                    {
                    this.state = 295;
                    this.ruleName();
                    }
                }

                this.state = 298;
                this.match(mappingParser.T__18);
                }
                break;
            case 3:
                localContext = new MapFhirMarkupContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 300;
                this.mapTransformationRule();
                this.state = 301;
                this.match(mappingParser.T__18);
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public mapTransformationRule(): MapTransformationRuleContext {
        let localContext = new MapTransformationRuleContext(this.context, this.state);
        this.enterRule(localContext, 44, mappingParser.RULE_mapTransformationRule);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 305;
            this.ruleSources();
            this.state = 308;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 27) {
                {
                this.state = 306;
                this.match(mappingParser.T__26);
                this.state = 307;
                this.ruleTargets();
                }
            }

            this.state = 311;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 42) {
                {
                this.state = 310;
                this.dependentExpression();
                }
            }

            this.state = 314;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 101) {
                {
                this.state = 313;
                this.ruleName();
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public identityFieldList(): IdentityFieldListContext {
        let localContext = new IdentityFieldListContext(this.context, this.state);
        this.enterRule(localContext, 46, mappingParser.RULE_identityFieldList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 316;
            this.identifier();
            this.state = 321;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 22) {
                {
                {
                this.state = 317;
                this.match(mappingParser.T__21);
                this.state = 318;
                this.identifier();
                }
                }
                this.state = 323;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public ruleName(): RuleNameContext {
        let localContext = new RuleNameContext(this.context, this.state);
        this.enterRule(localContext, 48, mappingParser.RULE_ruleName);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 324;
            this.match(mappingParser.DOUBLE_QUOTED_STRING);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public ruleSources(): RuleSourcesContext {
        let localContext = new RuleSourcesContext(this.context, this.state);
        this.enterRule(localContext, 50, mappingParser.RULE_ruleSources);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 326;
            this.ruleSource();
            this.state = 331;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 22) {
                {
                {
                this.state = 327;
                this.match(mappingParser.T__21);
                this.state = 328;
                this.ruleSource();
                }
                }
                this.state = 333;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public ruleSource(): RuleSourceContext {
        let localContext = new RuleSourceContext(this.context, this.state);
        this.enterRule(localContext, 52, mappingParser.RULE_ruleSource);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 334;
            this.qualifiedIdentifier();
            this.state = 336;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 7) {
                {
                this.state = 335;
                this.typeIdentifier();
                }
            }

            this.state = 339;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 96) {
                {
                this.state = 338;
                this.sourceCardinality();
                }
            }

            this.state = 342;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 40) {
                {
                this.state = 341;
                this.sourceDefault();
                }
            }

            this.state = 345;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & 1879048195) !== 0)) {
                {
                this.state = 344;
                this.sourceListMode();
                }
            }

            this.state = 348;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 9) {
                {
                this.state = 347;
                this.alias();
                }
            }

            this.state = 351;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 34) {
                {
                this.state = 350;
                this.whereClause();
                }
            }

            this.state = 354;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 35) {
                {
                this.state = 353;
                this.checkClause();
                }
            }

            this.state = 357;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 41) {
                {
                this.state = 356;
                this.log();
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public ruleTargets(): RuleTargetsContext {
        let localContext = new RuleTargetsContext(this.context, this.state);
        this.enterRule(localContext, 54, mappingParser.RULE_ruleTargets);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 359;
            this.ruleTarget();
            this.state = 364;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 22) {
                {
                {
                this.state = 360;
                this.match(mappingParser.T__21);
                this.state = 361;
                this.ruleTarget();
                }
                }
                this.state = 366;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public ruleTarget(): RuleTargetContext {
        let localContext = new RuleTargetContext(this.context, this.state);
        this.enterRule(localContext, 56, mappingParser.RULE_ruleTarget);
        let _la: number;
        try {
            this.state = 391;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 40, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 367;
                this.qualifiedIdentifier();
                this.state = 370;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 5) {
                    {
                    this.state = 368;
                    this.match(mappingParser.T__4);
                    this.state = 369;
                    this.transform();
                    }
                }

                this.state = 373;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 9) {
                    {
                    this.state = 372;
                    this.alias();
                    }
                }

                this.state = 376;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & 2147483651) !== 0) || _la === 69) {
                    {
                    this.state = 375;
                    this.targetListMode();
                    }
                }

                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 378;
                this.match(mappingParser.T__20);
                this.state = 379;
                this.fpExpression(0);
                this.state = 380;
                this.match(mappingParser.T__22);
                this.state = 382;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 9) {
                    {
                    this.state = 381;
                    this.alias();
                    }
                }

                this.state = 385;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & 2147483651) !== 0) || _la === 69) {
                    {
                    this.state = 384;
                    this.targetListMode();
                    }
                }

                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 387;
                this.groupInvocation();
                this.state = 389;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 9) {
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
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public sourceCardinality(): SourceCardinalityContext {
        let localContext = new SourceCardinalityContext(this.context, this.state);
        this.enterRule(localContext, 58, mappingParser.RULE_sourceCardinality);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 393;
            this.match(mappingParser.INTEGER);
            this.state = 394;
            this.match(mappingParser.T__27);
            this.state = 395;
            this.upperBound();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public upperBound(): UpperBoundContext {
        let localContext = new UpperBoundContext(this.context, this.state);
        this.enterRule(localContext, 60, mappingParser.RULE_upperBound);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 397;
            _la = this.tokenStream.LA(1);
            if(!(_la === 29 || _la === 96)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public qualifiedIdentifier(): QualifiedIdentifierContext {
        let localContext = new QualifiedIdentifierContext(this.context, this.state);
        this.enterRule(localContext, 62, mappingParser.RULE_qualifiedIdentifier);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 399;
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 3289904912) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 127) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & 7) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 404;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 41, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    {
                    {
                    this.state = 400;
                    this.match(mappingParser.T__38);
                    this.state = 401;
                    _la = this.tokenStream.LA(1);
                    if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 3289904912) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 127) !== 0) || ((((_la - 97)) & ~0x1F) === 0 && ((1 << (_la - 97)) & 7) !== 0))) {
                    this.errorHandler.recoverInline(this);
                    }
                    else {
                        this.errorHandler.reportMatch(this);
                        this.consume();
                    }
                    }
                    }
                }
                this.state = 406;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 41, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public sourceDefault(): SourceDefaultContext {
        let localContext = new SourceDefaultContext(this.context, this.state);
        this.enterRule(localContext, 64, mappingParser.RULE_sourceDefault);
        try {
            this.state = 414;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 42, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 407;
                this.match(mappingParser.T__39);
                this.state = 408;
                this.match(mappingParser.T__20);
                this.state = 409;
                this.fpExpression(0);
                this.state = 410;
                this.match(mappingParser.T__22);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 412;
                this.match(mappingParser.T__39);
                this.state = 413;
                this.match(mappingParser.DOUBLE_QUOTED_STRING);
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public alias(): AliasContext {
        let localContext = new AliasContext(this.context, this.state);
        this.enterRule(localContext, 66, mappingParser.RULE_alias);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 416;
            this.match(mappingParser.T__8);
            this.state = 417;
            this.identifier();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public whereClause(): WhereClauseContext {
        let localContext = new WhereClauseContext(this.context, this.state);
        this.enterRule(localContext, 68, mappingParser.RULE_whereClause);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 419;
            this.match(mappingParser.T__33);
            this.state = 420;
            this.match(mappingParser.T__20);
            this.state = 421;
            this.fpExpression(0);
            this.state = 422;
            this.match(mappingParser.T__22);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public checkClause(): CheckClauseContext {
        let localContext = new CheckClauseContext(this.context, this.state);
        this.enterRule(localContext, 70, mappingParser.RULE_checkClause);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 424;
            this.match(mappingParser.T__34);
            this.state = 425;
            this.match(mappingParser.T__20);
            this.state = 426;
            this.fpExpression(0);
            this.state = 427;
            this.match(mappingParser.T__22);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public log(): LogContext {
        let localContext = new LogContext(this.context, this.state);
        this.enterRule(localContext, 72, mappingParser.RULE_log);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 429;
            this.match(mappingParser.T__40);
            this.state = 430;
            this.match(mappingParser.T__20);
            this.state = 431;
            this.fpExpression(0);
            this.state = 432;
            this.match(mappingParser.T__22);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public dependentExpression(): DependentExpressionContext {
        let localContext = new DependentExpressionContext(this.context, this.state);
        this.enterRule(localContext, 74, mappingParser.RULE_dependentExpression);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 434;
            this.match(mappingParser.T__41);
            this.state = 447;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case mappingParser.T__8:
            case mappingParser.T__9:
            case mappingParser.T__10:
            case mappingParser.T__11:
            case mappingParser.T__12:
            case mappingParser.T__13:
            case mappingParser.T__14:
            case mappingParser.ID:
            case mappingParser.IDENTIFIER:
            case mappingParser.DELIMITEDIDENTIFIER:
                {
                this.state = 435;
                this.groupInvocation();
                this.state = 440;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 22) {
                    {
                    {
                    this.state = 436;
                    this.match(mappingParser.T__21);
                    this.state = 437;
                    this.groupInvocation();
                    }
                    }
                    this.state = 442;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 444;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 2) {
                    {
                    this.state = 443;
                    this.mapRules();
                    }
                }

                }
                break;
            case mappingParser.T__1:
                {
                this.state = 446;
                this.mapRules();
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public importDeclaration(): ImportDeclarationContext {
        let localContext = new ImportDeclarationContext(this.context, this.state);
        this.enterRule(localContext, 76, mappingParser.RULE_importDeclaration);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 449;
            this.match(mappingParser.T__29);
            this.state = 450;
            this.url();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public transform(): TransformContext {
        let localContext = new TransformContext(this.context, this.state);
        this.enterRule(localContext, 78, mappingParser.RULE_transform);
        try {
            this.state = 459;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 46, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 452;
                this.literal();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 453;
                this.qualifiedIdentifier();
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 454;
                this.transformInvocation();
                }
                break;
            case 4:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 455;
                this.match(mappingParser.T__20);
                this.state = 456;
                this.fpExpression(0);
                this.state = 457;
                this.match(mappingParser.T__22);
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public transformInvocation(): TransformInvocationContext {
        let localContext = new TransformInvocationContext(this.context, this.state);
        this.enterRule(localContext, 80, mappingParser.RULE_transformInvocation);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 461;
            this.identifier();
            this.state = 462;
            this.match(mappingParser.T__20);
            this.state = 464;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 4)) & ~0x1F) === 0 && ((1 << (_la - 4)) & 4232282101) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & 503316999) !== 0) || ((((_la - 89)) & ~0x1F) === 0 && ((1 << (_la - 89)) & 8191) !== 0)) {
                {
                this.state = 463;
                this.transformParamList();
                }
            }

            this.state = 466;
            this.match(mappingParser.T__22);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public transformParamList(): TransformParamListContext {
        let localContext = new TransformParamListContext(this.context, this.state);
        this.enterRule(localContext, 82, mappingParser.RULE_transformParamList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 468;
            this.transformParam();
            this.state = 473;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 22) {
                {
                {
                this.state = 469;
                this.match(mappingParser.T__21);
                this.state = 470;
                this.transformParam();
                }
                }
                this.state = 475;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public transformParam(): TransformParamContext {
        let localContext = new TransformParamContext(this.context, this.state);
        this.enterRule(localContext, 84, mappingParser.RULE_transformParam);
        try {
            this.state = 481;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 49, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 476;
                this.transformParamName();
                this.state = 477;
                this.match(mappingParser.T__6);
                this.state = 478;
                this.transformParamValue();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 480;
                this.transformParamValue();
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public transformParamName(): TransformParamNameContext {
        let localContext = new TransformParamNameContext(this.context, this.state);
        this.enterRule(localContext, 86, mappingParser.RULE_transformParamName);
        try {
            this.state = 500;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case mappingParser.T__8:
            case mappingParser.T__9:
            case mappingParser.T__10:
            case mappingParser.T__11:
            case mappingParser.T__12:
            case mappingParser.T__13:
            case mappingParser.T__14:
            case mappingParser.ID:
            case mappingParser.IDENTIFIER:
            case mappingParser.DELIMITEDIDENTIFIER:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 483;
                this.identifier();
                }
                break;
            case mappingParser.T__29:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 484;
                this.match(mappingParser.T__29);
                }
                break;
            case mappingParser.T__30:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 485;
                this.match(mappingParser.T__30);
                }
                break;
            case mappingParser.T__31:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 486;
                this.match(mappingParser.T__31);
                }
                break;
            case mappingParser.T__19:
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 487;
                this.match(mappingParser.T__19);
                }
                break;
            case mappingParser.T__3:
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 488;
                this.match(mappingParser.T__3);
                }
                break;
            case mappingParser.T__7:
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 489;
                this.match(mappingParser.T__7);
                }
                break;
            case mappingParser.T__15:
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 490;
                this.match(mappingParser.T__15);
                }
                break;
            case mappingParser.T__17:
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 491;
                this.match(mappingParser.T__17);
                }
                break;
            case mappingParser.T__32:
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 492;
                this.match(mappingParser.T__32);
                }
                break;
            case mappingParser.T__25:
                this.enterOuterAlt(localContext, 11);
                {
                this.state = 493;
                this.match(mappingParser.T__25);
                }
                break;
            case mappingParser.T__33:
                this.enterOuterAlt(localContext, 12);
                {
                this.state = 494;
                this.match(mappingParser.T__33);
                }
                break;
            case mappingParser.T__34:
                this.enterOuterAlt(localContext, 13);
                {
                this.state = 495;
                this.match(mappingParser.T__34);
                }
                break;
            case mappingParser.T__16:
                this.enterOuterAlt(localContext, 14);
                {
                this.state = 496;
                this.match(mappingParser.T__16);
                }
                break;
            case mappingParser.T__35:
                this.enterOuterAlt(localContext, 15);
                {
                this.state = 497;
                this.match(mappingParser.T__35);
                }
                break;
            case mappingParser.T__36:
                this.enterOuterAlt(localContext, 16);
                {
                this.state = 498;
                this.match(mappingParser.T__36);
                }
                break;
            case mappingParser.T__37:
                this.enterOuterAlt(localContext, 17);
                {
                this.state = 499;
                this.match(mappingParser.T__37);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public transformParamValue(): TransformParamValueContext {
        let localContext = new TransformParamValueContext(this.context, this.state);
        this.enterRule(localContext, 88, mappingParser.RULE_transformParamValue);
        try {
            this.state = 505;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 51, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 502;
                this.literal();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 503;
                this.match(mappingParser.ID);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 504;
                this.fpExpression(0);
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public groupInvocation(): GroupInvocationContext {
        let localContext = new GroupInvocationContext(this.context, this.state);
        this.enterRule(localContext, 90, mappingParser.RULE_groupInvocation);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 507;
            this.identifier();
            this.state = 508;
            this.match(mappingParser.T__20);
            this.state = 510;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (((((_la - 4)) & ~0x1F) === 0 && ((1 << (_la - 4)) & 4232282101) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & 503316999) !== 0) || ((((_la - 89)) & ~0x1F) === 0 && ((1 << (_la - 89)) & 8191) !== 0)) {
                {
                this.state = 509;
                this.groupParamList();
                }
            }

            this.state = 512;
            this.match(mappingParser.T__22);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public groupParamList(): GroupParamListContext {
        let localContext = new GroupParamListContext(this.context, this.state);
        this.enterRule(localContext, 92, mappingParser.RULE_groupParamList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 514;
            this.groupParam();
            this.state = 519;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 22) {
                {
                {
                this.state = 515;
                this.match(mappingParser.T__21);
                this.state = 516;
                this.groupParam();
                }
                }
                this.state = 521;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public groupParam(): GroupParamContext {
        let localContext = new GroupParamContext(this.context, this.state);
        this.enterRule(localContext, 94, mappingParser.RULE_groupParam);
        try {
            this.state = 525;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 54, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 522;
                this.literal();
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 523;
                this.match(mappingParser.ID);
                }
                break;
            case 3:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 524;
                this.fpExpression(0);
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }

    public fpExpression(): FpExpressionContext;
    public fpExpression(_p: number): FpExpressionContext;
    public fpExpression(_p?: number): FpExpressionContext {
        if (_p === undefined) {
            _p = 0;
        }

        let parentContext = this.context;
        let parentState = this.state;
        let localContext = new FpExpressionContext(this.context, parentState);
        let previousContext = localContext;
        let _startState = 96;
        this.enterRecursionRule(localContext, 96, mappingParser.RULE_fpExpression, _p);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 531;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case mappingParser.T__3:
            case mappingParser.T__7:
            case mappingParser.T__8:
            case mappingParser.T__9:
            case mappingParser.T__10:
            case mappingParser.T__11:
            case mappingParser.T__12:
            case mappingParser.T__13:
            case mappingParser.T__14:
            case mappingParser.T__15:
            case mappingParser.T__16:
            case mappingParser.T__17:
            case mappingParser.T__19:
            case mappingParser.T__20:
            case mappingParser.T__25:
            case mappingParser.T__29:
            case mappingParser.T__30:
            case mappingParser.T__31:
            case mappingParser.T__32:
            case mappingParser.T__33:
            case mappingParser.T__34:
            case mappingParser.T__35:
            case mappingParser.T__36:
            case mappingParser.T__37:
            case mappingParser.T__60:
            case mappingParser.T__61:
            case mappingParser.T__62:
            case mappingParser.T__63:
            case mappingParser.NULL_LITERAL:
            case mappingParser.BOOL:
            case mappingParser.DATE:
            case mappingParser.DATETIME:
            case mappingParser.TIME:
            case mappingParser.LONGNUMBER:
            case mappingParser.DECIMAL:
            case mappingParser.INTEGER:
            case mappingParser.ID:
            case mappingParser.IDENTIFIER:
            case mappingParser.DELIMITEDIDENTIFIER:
            case mappingParser.STRING:
            case mappingParser.DOUBLE_QUOTED_STRING:
                {
                localContext = new TermExpressionContext(localContext);
                this.context = localContext;
                previousContext = localContext;

                this.state = 528;
                this.fpTerm();
                }
                break;
            case mappingParser.T__5:
            case mappingParser.T__44:
                {
                localContext = new PolarityExpressionContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 529;
                _la = this.tokenStream.LA(1);
                if(!(_la === 6 || _la === 45)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 530;
                this.fpExpression(11);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 573;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 57, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this.parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    this.state = 571;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 56, this.context) ) {
                    case 1:
                        {
                        localContext = new MultiplicativeExpressionContext(new FpExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, mappingParser.RULE_fpExpression);
                        this.state = 533;
                        if (!(this.precpred(this.context, 10))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 10)");
                        }
                        this.state = 534;
                        _la = this.tokenStream.LA(1);
                        if(!(((((_la - 29)) & ~0x1F) === 0 && ((1 << (_la - 29)) & 393345) !== 0))) {
                        this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 535;
                        this.fpExpression(11);
                        }
                        break;
                    case 2:
                        {
                        localContext = new AdditiveExpressionContext(new FpExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, mappingParser.RULE_fpExpression);
                        this.state = 536;
                        if (!(this.precpred(this.context, 9))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 9)");
                        }
                        this.state = 537;
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 6 || _la === 45 || _la === 48)) {
                        this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 538;
                        this.fpExpression(10);
                        }
                        break;
                    case 3:
                        {
                        localContext = new UnionExpressionContext(new FpExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, mappingParser.RULE_fpExpression);
                        this.state = 539;
                        if (!(this.precpred(this.context, 7))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 7)");
                        }
                        {
                        this.state = 540;
                        this.match(mappingParser.T__48);
                        }
                        this.state = 541;
                        this.fpExpression(8);
                        }
                        break;
                    case 4:
                        {
                        localContext = new InequalityExpressionContext(new FpExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, mappingParser.RULE_fpExpression);
                        this.state = 542;
                        if (!(this.precpred(this.context, 6))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 6)");
                        }
                        this.state = 543;
                        _la = this.tokenStream.LA(1);
                        if(!(((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & 15) !== 0))) {
                        this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 544;
                        this.fpExpression(7);
                        }
                        break;
                    case 5:
                        {
                        localContext = new EqualityExpressionContext(new FpExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, mappingParser.RULE_fpExpression);
                        this.state = 545;
                        if (!(this.precpred(this.context, 5))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 5)");
                        }
                        this.state = 546;
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 5 || ((((_la - 54)) & ~0x1F) === 0 && ((1 << (_la - 54)) & 7) !== 0))) {
                        this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 547;
                        this.fpExpression(6);
                        }
                        break;
                    case 6:
                        {
                        localContext = new MembershipExpressionContext(new FpExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, mappingParser.RULE_fpExpression);
                        this.state = 548;
                        if (!(this.precpred(this.context, 4))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 4)");
                        }
                        this.state = 549;
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 10 || _la === 11)) {
                        this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 550;
                        this.fpExpression(5);
                        }
                        break;
                    case 7:
                        {
                        localContext = new AndExpressionContext(new FpExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, mappingParser.RULE_fpExpression);
                        this.state = 551;
                        if (!(this.precpred(this.context, 3))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 3)");
                        }
                        {
                        this.state = 552;
                        this.match(mappingParser.T__56);
                        }
                        this.state = 553;
                        this.fpExpression(4);
                        }
                        break;
                    case 8:
                        {
                        localContext = new OrExpressionContext(new FpExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, mappingParser.RULE_fpExpression);
                        this.state = 554;
                        if (!(this.precpred(this.context, 2))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 2)");
                        }
                        this.state = 555;
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 58 || _la === 59)) {
                        this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 556;
                        this.fpExpression(3);
                        }
                        break;
                    case 9:
                        {
                        localContext = new ImpliesExpressionContext(new FpExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, mappingParser.RULE_fpExpression);
                        this.state = 557;
                        if (!(this.precpred(this.context, 1))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 1)");
                        }
                        {
                        this.state = 558;
                        this.match(mappingParser.T__59);
                        }
                        this.state = 559;
                        this.fpExpression(2);
                        }
                        break;
                    case 10:
                        {
                        localContext = new InvocationExpressionContext(new FpExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, mappingParser.RULE_fpExpression);
                        this.state = 560;
                        if (!(this.precpred(this.context, 13))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 13)");
                        }
                        this.state = 561;
                        this.match(mappingParser.T__38);
                        this.state = 562;
                        this.fpInvocation();
                        }
                        break;
                    case 11:
                        {
                        localContext = new IndexerExpressionContext(new FpExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, mappingParser.RULE_fpExpression);
                        this.state = 563;
                        if (!(this.precpred(this.context, 12))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 12)");
                        }
                        this.state = 564;
                        this.match(mappingParser.T__42);
                        this.state = 565;
                        this.fpExpression(0);
                        this.state = 566;
                        this.match(mappingParser.T__43);
                        }
                        break;
                    case 12:
                        {
                        localContext = new TypeExpressionContext(new FpExpressionContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, mappingParser.RULE_fpExpression);
                        this.state = 568;
                        if (!(this.precpred(this.context, 8))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 8)");
                        }
                        this.state = 569;
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 9 || _la === 12)) {
                        this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
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
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 57, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.unrollRecursionContexts(parentContext);
        }
        return localContext;
    }
    public fpTerm(): FpTermContext {
        let localContext = new FpTermContext(this.context, this.state);
        this.enterRule(localContext, 98, mappingParser.RULE_fpTerm);
        try {
            this.state = 583;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case mappingParser.T__3:
            case mappingParser.T__7:
            case mappingParser.T__8:
            case mappingParser.T__9:
            case mappingParser.T__10:
            case mappingParser.T__11:
            case mappingParser.T__12:
            case mappingParser.T__13:
            case mappingParser.T__14:
            case mappingParser.T__15:
            case mappingParser.T__16:
            case mappingParser.T__17:
            case mappingParser.T__19:
            case mappingParser.T__25:
            case mappingParser.T__29:
            case mappingParser.T__30:
            case mappingParser.T__31:
            case mappingParser.T__32:
            case mappingParser.T__33:
            case mappingParser.T__34:
            case mappingParser.T__35:
            case mappingParser.T__36:
            case mappingParser.T__37:
            case mappingParser.T__60:
            case mappingParser.T__61:
            case mappingParser.T__62:
            case mappingParser.ID:
            case mappingParser.IDENTIFIER:
            case mappingParser.DELIMITEDIDENTIFIER:
                localContext = new InvocationTermContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 576;
                this.fpInvocation();
                }
                break;
            case mappingParser.NULL_LITERAL:
            case mappingParser.BOOL:
            case mappingParser.DATE:
            case mappingParser.DATETIME:
            case mappingParser.TIME:
            case mappingParser.LONGNUMBER:
            case mappingParser.DECIMAL:
            case mappingParser.INTEGER:
            case mappingParser.STRING:
            case mappingParser.DOUBLE_QUOTED_STRING:
                localContext = new LiteralTermContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 577;
                this.literal();
                }
                break;
            case mappingParser.T__63:
                localContext = new ExternalConstantTermContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 578;
                this.fpExternalConstant();
                }
                break;
            case mappingParser.T__20:
                localContext = new ParenthesizedTermContext(localContext);
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 579;
                this.match(mappingParser.T__20);
                this.state = 580;
                this.fpExpression(0);
                this.state = 581;
                this.match(mappingParser.T__22);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public fpInvocation(): FpInvocationContext {
        let localContext = new FpInvocationContext(this.context, this.state);
        this.enterRule(localContext, 100, mappingParser.RULE_fpInvocation);
        try {
            this.state = 590;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 59, this.context) ) {
            case 1:
                localContext = new FunctionInvocationContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 585;
                this.fpFunction();
                }
                break;
            case 2:
                localContext = new MemberInvocationContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 586;
                this.identifier();
                }
                break;
            case 3:
                localContext = new ThisInvocationContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 587;
                this.match(mappingParser.T__60);
                }
                break;
            case 4:
                localContext = new IndexInvocationContext(localContext);
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 588;
                this.match(mappingParser.T__61);
                }
                break;
            case 5:
                localContext = new TotalInvocationContext(localContext);
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 589;
                this.match(mappingParser.T__62);
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public fpExternalConstant(): FpExternalConstantContext {
        let localContext = new FpExternalConstantContext(this.context, this.state);
        this.enterRule(localContext, 102, mappingParser.RULE_fpExternalConstant);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 592;
            this.match(mappingParser.T__63);
            this.state = 595;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case mappingParser.T__8:
            case mappingParser.T__9:
            case mappingParser.T__10:
            case mappingParser.T__11:
            case mappingParser.T__12:
            case mappingParser.T__13:
            case mappingParser.T__14:
            case mappingParser.ID:
            case mappingParser.IDENTIFIER:
            case mappingParser.DELIMITEDIDENTIFIER:
                {
                this.state = 593;
                this.identifier();
                }
                break;
            case mappingParser.STRING:
                {
                this.state = 594;
                this.match(mappingParser.STRING);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public fpFunction(): FpFunctionContext {
        let localContext = new FpFunctionContext(this.context, this.state);
        this.enterRule(localContext, 104, mappingParser.RULE_fpFunction);
        let _la: number;
        try {
            this.state = 617;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 64, this.context) ) {
            case 1:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 597;
                this.match(mappingParser.T__14);
                this.state = 598;
                this.match(mappingParser.T__20);
                this.state = 607;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (((((_la - 4)) & ~0x1F) === 0 && ((1 << (_la - 4)) & 4232282101) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & 503316999) !== 0) || ((((_la - 89)) & ~0x1F) === 0 && ((1 << (_la - 89)) & 8191) !== 0)) {
                    {
                    this.state = 599;
                    this.fpSortArgument();
                    this.state = 604;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                    while (_la === 22) {
                        {
                        {
                        this.state = 600;
                        this.match(mappingParser.T__21);
                        this.state = 601;
                        this.fpSortArgument();
                        }
                        }
                        this.state = 606;
                        this.errorHandler.sync(this);
                        _la = this.tokenStream.LA(1);
                    }
                    }
                }

                this.state = 609;
                this.match(mappingParser.T__22);
                }
                break;
            case 2:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 610;
                this.qualifiedIdentifier();
                this.state = 611;
                this.match(mappingParser.T__20);
                this.state = 613;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (((((_la - 4)) & ~0x1F) === 0 && ((1 << (_la - 4)) & 4232282101) !== 0) || ((((_la - 36)) & ~0x1F) === 0 && ((1 << (_la - 36)) & 503316999) !== 0) || ((((_la - 89)) & ~0x1F) === 0 && ((1 << (_la - 89)) & 8191) !== 0)) {
                    {
                    this.state = 612;
                    this.fpParamList();
                    }
                }

                this.state = 615;
                this.match(mappingParser.T__22);
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public fpSortArgument(): FpSortArgumentContext {
        let localContext = new FpSortArgumentContext(this.context, this.state);
        this.enterRule(localContext, 106, mappingParser.RULE_fpSortArgument);
        let _la: number;
        try {
            localContext = new SortDirectionArgumentContext(localContext);
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 619;
            this.fpExpression(0);
            this.state = 621;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 13 || _la === 14) {
                {
                this.state = 620;
                _la = this.tokenStream.LA(1);
                if(!(_la === 13 || _la === 14)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                }
            }

            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public fpParamList(): FpParamListContext {
        let localContext = new FpParamListContext(this.context, this.state);
        this.enterRule(localContext, 108, mappingParser.RULE_fpParamList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 623;
            this.fpExpression(0);
            this.state = 628;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 22) {
                {
                {
                this.state = 624;
                this.match(mappingParser.T__21);
                this.state = 625;
                this.fpExpression(0);
                }
                }
                this.state = 630;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public fpTypeSpecifier(): FpTypeSpecifierContext {
        let localContext = new FpTypeSpecifierContext(this.context, this.state);
        this.enterRule(localContext, 110, mappingParser.RULE_fpTypeSpecifier);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 631;
            this.qualifiedIdentifier();
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public constant(): ConstantContext {
        let localContext = new ConstantContext(this.context, this.state);
        this.enterRule(localContext, 112, mappingParser.RULE_constant);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 633;
            this.match(mappingParser.ID);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public sourceListMode(): SourceListModeContext {
        let localContext = new SourceListModeContext(this.context, this.state);
        this.enterRule(localContext, 114, mappingParser.RULE_sourceListMode);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 635;
            _la = this.tokenStream.LA(1);
            if(!(((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & 1879048195) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public targetListMode(): TargetListModeContext {
        let localContext = new TargetListModeContext(this.context, this.state);
        this.enterRule(localContext, 116, mappingParser.RULE_targetListMode);
        try {
            this.state = 642;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case mappingParser.T__36:
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 637;
                this.match(mappingParser.T__36);
                }
                break;
            case mappingParser.T__67:
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 638;
                this.match(mappingParser.T__67);
                this.state = 639;
                this.match(mappingParser.ID);
                }
                break;
            case mappingParser.T__37:
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 640;
                this.match(mappingParser.T__37);
                }
                break;
            case mappingParser.T__68:
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 641;
                this.match(mappingParser.T__68);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public groupTypeMode(): GroupTypeModeContext {
        let localContext = new GroupTypeModeContext(this.context, this.state);
        this.enterRule(localContext, 118, mappingParser.RULE_groupTypeMode);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 644;
            _la = this.tokenStream.LA(1);
            if(!(_la === 33 || _la === 70)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public modelMode(): ModelModeContext {
        let localContext = new ModelModeContext(this.context, this.state);
        this.enterRule(localContext, 120, mappingParser.RULE_modelMode);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 646;
            _la = this.tokenStream.LA(1);
            if(!(_la === 31 || _la === 32 || _la === 71 || _la === 72)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public parameterMode(): ParameterModeContext {
        let localContext = new ParameterModeContext(this.context, this.state);
        this.enterRule(localContext, 122, mappingParser.RULE_parameterMode);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 648;
            _la = this.tokenStream.LA(1);
            if(!(_la === 31 || _la === 32)) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public literal(): LiteralContext {
        let localContext = new LiteralContext(this.context, this.state);
        this.enterRule(localContext, 124, mappingParser.RULE_literal);
        let _la: number;
        try {
            this.state = 660;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 68, this.context) ) {
            case 1:
                localContext = new NullLiteralContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 650;
                this.match(mappingParser.NULL_LITERAL);
                }
                break;
            case 2:
                localContext = new BooleanLiteralContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 651;
                this.match(mappingParser.BOOL);
                }
                break;
            case 3:
                localContext = new QuantityLiteralContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 652;
                this.fpQuantity();
                }
                break;
            case 4:
                localContext = new LongNumberLiteralContext(localContext);
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 653;
                this.match(mappingParser.LONGNUMBER);
                }
                break;
            case 5:
                localContext = new NumberLiteralContext(localContext);
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 654;
                _la = this.tokenStream.LA(1);
                if(!(_la === 95 || _la === 96)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                }
                break;
            case 6:
                localContext = new DateLiteralContext(localContext);
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 655;
                this.match(mappingParser.DATE);
                }
                break;
            case 7:
                localContext = new DateTimeLiteralContext(localContext);
                this.enterOuterAlt(localContext, 7);
                {
                this.state = 656;
                this.match(mappingParser.DATETIME);
                }
                break;
            case 8:
                localContext = new TimeLiteralContext(localContext);
                this.enterOuterAlt(localContext, 8);
                {
                this.state = 657;
                this.match(mappingParser.TIME);
                }
                break;
            case 9:
                localContext = new StringLiteralContext(localContext);
                this.enterOuterAlt(localContext, 9);
                {
                this.state = 658;
                this.match(mappingParser.STRING);
                }
                break;
            case 10:
                localContext = new QuotedStringLiteralContext(localContext);
                this.enterOuterAlt(localContext, 10);
                {
                this.state = 659;
                this.match(mappingParser.DOUBLE_QUOTED_STRING);
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public fpQuantity(): FpQuantityContext {
        let localContext = new FpQuantityContext(this.context, this.state);
        this.enterRule(localContext, 126, mappingParser.RULE_fpQuantity);
        let _la: number;
        try {
            this.state = 668;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 69, this.context) ) {
            case 1:
                localContext = new QuantityWithDateContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 662;
                _la = this.tokenStream.LA(1);
                if(!(_la === 95 || _la === 96)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 663;
                _la = this.tokenStream.LA(1);
                if(!(((((_la - 73)) & ~0x1F) === 0 && ((1 << (_la - 73)) & 255) !== 0))) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                }
                break;
            case 2:
                localContext = new QuantityWithDatePluralContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 664;
                _la = this.tokenStream.LA(1);
                if(!(_la === 95 || _la === 96)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 665;
                _la = this.tokenStream.LA(1);
                if(!(((((_la - 81)) & ~0x1F) === 0 && ((1 << (_la - 81)) & 255) !== 0))) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                }
                break;
            case 3:
                localContext = new QuantityWithUcumContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 666;
                _la = this.tokenStream.LA(1);
                if(!(_la === 95 || _la === 96)) {
                this.errorHandler.recoverInline(this);
                }
                else {
                    this.errorHandler.reportMatch(this);
                    this.consume();
                }
                this.state = 667;
                this.match(mappingParser.STRING);
                }
                break;
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }

    public override sempred(localContext: antlr.ParserRuleContext | null, ruleIndex: number, predIndex: number): boolean {
        switch (ruleIndex) {
        case 48:
            return this.fpExpression_sempred(localContext as FpExpressionContext, predIndex);
        }
        return true;
    }
    private fpExpression_sempred(localContext: FpExpressionContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 0:
            return this.precpred(this.context, 10);
        case 1:
            return this.precpred(this.context, 9);
        case 2:
            return this.precpred(this.context, 7);
        case 3:
            return this.precpred(this.context, 6);
        case 4:
            return this.precpred(this.context, 5);
        case 5:
            return this.precpred(this.context, 4);
        case 6:
            return this.precpred(this.context, 3);
        case 7:
            return this.precpred(this.context, 2);
        case 8:
            return this.precpred(this.context, 1);
        case 9:
            return this.precpred(this.context, 13);
        case 10:
            return this.precpred(this.context, 12);
        case 11:
            return this.precpred(this.context, 8);
        }
        return true;
    }

    public static readonly _serializedATN: number[] = [
        4,1,106,671,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,
        7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,
        13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,
        20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,2,26,7,
        26,2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,2,32,7,32,2,
        33,7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,2,39,7,
        39,2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,45,2,
        46,7,46,2,47,7,47,2,48,7,48,2,49,7,49,2,50,7,50,2,51,7,51,2,52,7,
        52,2,53,7,53,2,54,7,54,2,55,7,55,2,56,7,56,2,57,7,57,2,58,7,58,2,
        59,7,59,2,60,7,60,2,61,7,61,2,62,7,62,2,63,7,63,1,0,5,0,130,8,0,
        10,0,12,0,133,9,0,1,0,5,0,136,8,0,10,0,12,0,139,9,0,1,0,3,0,142,
        8,0,1,0,5,0,145,8,0,10,0,12,0,148,9,0,1,0,5,0,151,8,0,10,0,12,0,
        154,9,0,1,0,5,0,157,8,0,10,0,12,0,160,9,0,1,0,4,0,163,8,0,11,0,12,
        0,164,1,0,1,0,1,1,1,1,1,1,1,1,4,1,173,8,1,11,1,12,1,174,1,1,4,1,
        178,8,1,11,1,12,1,179,1,1,1,1,1,2,1,2,1,2,1,2,1,2,1,3,1,3,1,3,1,
        3,1,4,1,4,1,4,1,4,1,5,1,5,1,5,1,5,1,6,1,6,1,7,1,7,1,7,1,7,1,7,3,
        7,208,8,7,1,8,1,8,1,8,1,8,1,8,3,8,215,8,8,1,9,1,9,1,10,1,10,1,11,
        1,11,1,12,1,12,1,12,1,12,3,12,227,8,12,1,12,1,12,1,12,1,13,1,13,
        1,13,1,13,1,13,1,13,1,14,1,14,1,14,1,14,3,14,242,8,14,1,14,3,14,
        245,8,14,1,14,1,14,1,15,1,15,1,15,1,15,4,15,253,8,15,11,15,12,15,
        254,1,15,1,15,1,16,1,16,1,16,3,16,262,8,16,1,17,1,17,5,17,266,8,
        17,10,17,12,17,269,9,17,1,17,1,17,1,18,1,18,1,18,1,18,1,19,1,19,
        1,19,1,20,1,20,1,20,1,21,1,21,1,21,1,21,1,21,1,21,3,21,289,8,21,
        1,21,1,21,1,21,1,21,1,21,1,21,3,21,297,8,21,1,21,1,21,1,21,1,21,
        1,21,3,21,304,8,21,1,22,1,22,1,22,3,22,309,8,22,1,22,3,22,312,8,
        22,1,22,3,22,315,8,22,1,23,1,23,1,23,5,23,320,8,23,10,23,12,23,323,
        9,23,1,24,1,24,1,25,1,25,1,25,5,25,330,8,25,10,25,12,25,333,9,25,
        1,26,1,26,3,26,337,8,26,1,26,3,26,340,8,26,1,26,3,26,343,8,26,1,
        26,3,26,346,8,26,1,26,3,26,349,8,26,1,26,3,26,352,8,26,1,26,3,26,
        355,8,26,1,26,3,26,358,8,26,1,27,1,27,1,27,5,27,363,8,27,10,27,12,
        27,366,9,27,1,28,1,28,1,28,3,28,371,8,28,1,28,3,28,374,8,28,1,28,
        3,28,377,8,28,1,28,1,28,1,28,1,28,3,28,383,8,28,1,28,3,28,386,8,
        28,1,28,1,28,3,28,390,8,28,3,28,392,8,28,1,29,1,29,1,29,1,29,1,30,
        1,30,1,31,1,31,1,31,5,31,403,8,31,10,31,12,31,406,9,31,1,32,1,32,
        1,32,1,32,1,32,1,32,1,32,3,32,415,8,32,1,33,1,33,1,33,1,34,1,34,
        1,34,1,34,1,34,1,35,1,35,1,35,1,35,1,35,1,36,1,36,1,36,1,36,1,36,
        1,37,1,37,1,37,1,37,5,37,439,8,37,10,37,12,37,442,9,37,1,37,3,37,
        445,8,37,1,37,3,37,448,8,37,1,38,1,38,1,38,1,39,1,39,1,39,1,39,1,
        39,1,39,1,39,3,39,460,8,39,1,40,1,40,1,40,3,40,465,8,40,1,40,1,40,
        1,41,1,41,1,41,5,41,472,8,41,10,41,12,41,475,9,41,1,42,1,42,1,42,
        1,42,1,42,3,42,482,8,42,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,
        1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,1,43,3,43,501,8,43,1,44,
        1,44,1,44,3,44,506,8,44,1,45,1,45,1,45,3,45,511,8,45,1,45,1,45,1,
        46,1,46,1,46,5,46,518,8,46,10,46,12,46,521,9,46,1,47,1,47,1,47,3,
        47,526,8,47,1,48,1,48,1,48,1,48,3,48,532,8,48,1,48,1,48,1,48,1,48,
        1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,
        1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,
        1,48,1,48,1,48,1,48,1,48,1,48,1,48,1,48,5,48,572,8,48,10,48,12,48,
        575,9,48,1,49,1,49,1,49,1,49,1,49,1,49,1,49,3,49,584,8,49,1,50,1,
        50,1,50,1,50,1,50,3,50,591,8,50,1,51,1,51,1,51,3,51,596,8,51,1,52,
        1,52,1,52,1,52,1,52,5,52,603,8,52,10,52,12,52,606,9,52,3,52,608,
        8,52,1,52,1,52,1,52,1,52,3,52,614,8,52,1,52,1,52,3,52,618,8,52,1,
        53,1,53,3,53,622,8,53,1,54,1,54,1,54,5,54,627,8,54,10,54,12,54,630,
        9,54,1,55,1,55,1,56,1,56,1,57,1,57,1,58,1,58,1,58,1,58,1,58,3,58,
        643,8,58,1,59,1,59,1,60,1,60,1,61,1,61,1,62,1,62,1,62,1,62,1,62,
        1,62,1,62,1,62,1,62,1,62,3,62,661,8,62,1,63,1,63,1,63,1,63,1,63,
        1,63,3,63,669,8,63,1,63,5,131,137,146,152,158,1,96,64,0,2,4,6,8,
        10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,
        54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,
        98,100,102,104,106,108,110,112,114,116,118,120,122,124,126,0,21,
        2,0,97,97,100,101,1,0,100,101,2,0,9,15,97,99,2,0,29,29,96,96,7,0,
        4,4,8,10,12,18,20,20,26,26,30,38,97,99,2,0,6,6,45,45,3,0,29,29,36,
        36,46,47,3,0,6,6,45,45,48,48,1,0,50,53,2,0,5,5,54,56,1,0,10,11,1,
        0,58,59,2,0,9,9,12,12,1,0,13,14,2,0,37,38,65,67,2,0,33,33,70,70,
        2,0,31,32,71,72,1,0,31,32,1,0,95,96,1,0,73,80,1,0,81,88,724,0,131,
        1,0,0,0,2,168,1,0,0,0,4,183,1,0,0,0,6,188,1,0,0,0,8,192,1,0,0,0,
        10,196,1,0,0,0,12,200,1,0,0,0,14,202,1,0,0,0,16,209,1,0,0,0,18,216,
        1,0,0,0,20,218,1,0,0,0,22,220,1,0,0,0,24,222,1,0,0,0,26,231,1,0,
        0,0,28,237,1,0,0,0,30,248,1,0,0,0,32,258,1,0,0,0,34,263,1,0,0,0,
        36,272,1,0,0,0,38,276,1,0,0,0,40,279,1,0,0,0,42,303,1,0,0,0,44,305,
        1,0,0,0,46,316,1,0,0,0,48,324,1,0,0,0,50,326,1,0,0,0,52,334,1,0,
        0,0,54,359,1,0,0,0,56,391,1,0,0,0,58,393,1,0,0,0,60,397,1,0,0,0,
        62,399,1,0,0,0,64,414,1,0,0,0,66,416,1,0,0,0,68,419,1,0,0,0,70,424,
        1,0,0,0,72,429,1,0,0,0,74,434,1,0,0,0,76,449,1,0,0,0,78,459,1,0,
        0,0,80,461,1,0,0,0,82,468,1,0,0,0,84,481,1,0,0,0,86,500,1,0,0,0,
        88,505,1,0,0,0,90,507,1,0,0,0,92,514,1,0,0,0,94,525,1,0,0,0,96,531,
        1,0,0,0,98,583,1,0,0,0,100,590,1,0,0,0,102,592,1,0,0,0,104,617,1,
        0,0,0,106,619,1,0,0,0,108,623,1,0,0,0,110,631,1,0,0,0,112,633,1,
        0,0,0,114,635,1,0,0,0,116,642,1,0,0,0,118,644,1,0,0,0,120,646,1,
        0,0,0,122,648,1,0,0,0,124,660,1,0,0,0,126,668,1,0,0,0,128,130,3,
        16,8,0,129,128,1,0,0,0,130,133,1,0,0,0,131,132,1,0,0,0,131,129,1,
        0,0,0,132,137,1,0,0,0,133,131,1,0,0,0,134,136,3,2,1,0,135,134,1,
        0,0,0,136,139,1,0,0,0,137,138,1,0,0,0,137,135,1,0,0,0,138,141,1,
        0,0,0,139,137,1,0,0,0,140,142,3,14,7,0,141,140,1,0,0,0,141,142,1,
        0,0,0,142,146,1,0,0,0,143,145,3,24,12,0,144,143,1,0,0,0,145,148,
        1,0,0,0,146,147,1,0,0,0,146,144,1,0,0,0,147,152,1,0,0,0,148,146,
        1,0,0,0,149,151,3,76,38,0,150,149,1,0,0,0,151,154,1,0,0,0,152,153,
        1,0,0,0,152,150,1,0,0,0,153,158,1,0,0,0,154,152,1,0,0,0,155,157,
        3,26,13,0,156,155,1,0,0,0,157,160,1,0,0,0,158,159,1,0,0,0,158,156,
        1,0,0,0,159,162,1,0,0,0,160,158,1,0,0,0,161,163,3,28,14,0,162,161,
        1,0,0,0,163,164,1,0,0,0,164,162,1,0,0,0,164,165,1,0,0,0,165,166,
        1,0,0,0,166,167,5,0,0,1,167,1,1,0,0,0,168,169,5,1,0,0,169,170,3,
        20,10,0,170,172,5,2,0,0,171,173,3,4,2,0,172,171,1,0,0,0,173,174,
        1,0,0,0,174,172,1,0,0,0,174,175,1,0,0,0,175,177,1,0,0,0,176,178,
        3,6,3,0,177,176,1,0,0,0,178,179,1,0,0,0,179,177,1,0,0,0,179,180,
        1,0,0,0,180,181,1,0,0,0,181,182,5,3,0,0,182,3,1,0,0,0,183,184,5,
        4,0,0,184,185,5,97,0,0,185,186,5,5,0,0,186,187,3,20,10,0,187,5,1,
        0,0,0,188,189,3,8,4,0,189,190,5,6,0,0,190,191,3,10,5,0,191,7,1,0,
        0,0,192,193,5,97,0,0,193,194,5,7,0,0,194,195,3,12,6,0,195,9,1,0,
        0,0,196,197,5,97,0,0,197,198,5,7,0,0,198,199,3,12,6,0,199,11,1,0,
        0,0,200,201,7,0,0,0,201,13,1,0,0,0,202,203,5,8,0,0,203,204,3,20,
        10,0,204,207,5,5,0,0,205,208,3,22,11,0,206,208,5,101,0,0,207,205,
        1,0,0,0,207,206,1,0,0,0,208,15,1,0,0,0,209,210,5,105,0,0,210,211,
        3,62,31,0,211,214,5,5,0,0,212,215,3,124,62,0,213,215,3,18,9,0,214,
        212,1,0,0,0,214,213,1,0,0,0,214,215,1,0,0,0,215,17,1,0,0,0,216,217,
        5,102,0,0,217,19,1,0,0,0,218,219,7,1,0,0,219,21,1,0,0,0,220,221,
        7,2,0,0,221,23,1,0,0,0,222,223,5,16,0,0,223,226,3,20,10,0,224,225,
        5,17,0,0,225,227,3,22,11,0,226,224,1,0,0,0,226,227,1,0,0,0,227,228,
        1,0,0,0,228,229,5,9,0,0,229,230,3,120,60,0,230,25,1,0,0,0,231,232,
        5,18,0,0,232,233,5,97,0,0,233,234,5,5,0,0,234,235,3,96,48,0,235,
        236,5,19,0,0,236,27,1,0,0,0,237,238,5,20,0,0,238,239,5,97,0,0,239,
        241,3,30,15,0,240,242,3,38,19,0,241,240,1,0,0,0,241,242,1,0,0,0,
        242,244,1,0,0,0,243,245,3,36,18,0,244,243,1,0,0,0,244,245,1,0,0,
        0,245,246,1,0,0,0,246,247,3,34,17,0,247,29,1,0,0,0,248,249,5,21,
        0,0,249,252,3,32,16,0,250,251,5,22,0,0,251,253,3,32,16,0,252,250,
        1,0,0,0,253,254,1,0,0,0,254,252,1,0,0,0,254,255,1,0,0,0,255,256,
        1,0,0,0,256,257,5,23,0,0,257,31,1,0,0,0,258,259,3,122,61,0,259,261,
        5,97,0,0,260,262,3,40,20,0,261,260,1,0,0,0,261,262,1,0,0,0,262,33,
        1,0,0,0,263,267,5,2,0,0,264,266,3,42,21,0,265,264,1,0,0,0,266,269,
        1,0,0,0,267,265,1,0,0,0,267,268,1,0,0,0,268,270,1,0,0,0,269,267,
        1,0,0,0,270,271,5,3,0,0,271,35,1,0,0,0,272,273,5,24,0,0,273,274,
        3,118,59,0,274,275,5,25,0,0,275,37,1,0,0,0,276,277,5,26,0,0,277,
        278,5,97,0,0,278,39,1,0,0,0,279,280,5,7,0,0,280,281,3,22,11,0,281,
        41,1,0,0,0,282,283,3,62,31,0,283,284,5,27,0,0,284,285,3,62,31,0,
        285,286,5,7,0,0,286,288,3,46,23,0,287,289,3,48,24,0,288,287,1,0,
        0,0,288,289,1,0,0,0,289,290,1,0,0,0,290,291,5,19,0,0,291,304,1,0,
        0,0,292,293,3,62,31,0,293,294,5,27,0,0,294,296,3,62,31,0,295,297,
        3,48,24,0,296,295,1,0,0,0,296,297,1,0,0,0,297,298,1,0,0,0,298,299,
        5,19,0,0,299,304,1,0,0,0,300,301,3,44,22,0,301,302,5,19,0,0,302,
        304,1,0,0,0,303,282,1,0,0,0,303,292,1,0,0,0,303,300,1,0,0,0,304,
        43,1,0,0,0,305,308,3,50,25,0,306,307,5,27,0,0,307,309,3,54,27,0,
        308,306,1,0,0,0,308,309,1,0,0,0,309,311,1,0,0,0,310,312,3,74,37,
        0,311,310,1,0,0,0,311,312,1,0,0,0,312,314,1,0,0,0,313,315,3,48,24,
        0,314,313,1,0,0,0,314,315,1,0,0,0,315,45,1,0,0,0,316,321,3,22,11,
        0,317,318,5,22,0,0,318,320,3,22,11,0,319,317,1,0,0,0,320,323,1,0,
        0,0,321,319,1,0,0,0,321,322,1,0,0,0,322,47,1,0,0,0,323,321,1,0,0,
        0,324,325,5,101,0,0,325,49,1,0,0,0,326,331,3,52,26,0,327,328,5,22,
        0,0,328,330,3,52,26,0,329,327,1,0,0,0,330,333,1,0,0,0,331,329,1,
        0,0,0,331,332,1,0,0,0,332,51,1,0,0,0,333,331,1,0,0,0,334,336,3,62,
        31,0,335,337,3,40,20,0,336,335,1,0,0,0,336,337,1,0,0,0,337,339,1,
        0,0,0,338,340,3,58,29,0,339,338,1,0,0,0,339,340,1,0,0,0,340,342,
        1,0,0,0,341,343,3,64,32,0,342,341,1,0,0,0,342,343,1,0,0,0,343,345,
        1,0,0,0,344,346,3,114,57,0,345,344,1,0,0,0,345,346,1,0,0,0,346,348,
        1,0,0,0,347,349,3,66,33,0,348,347,1,0,0,0,348,349,1,0,0,0,349,351,
        1,0,0,0,350,352,3,68,34,0,351,350,1,0,0,0,351,352,1,0,0,0,352,354,
        1,0,0,0,353,355,3,70,35,0,354,353,1,0,0,0,354,355,1,0,0,0,355,357,
        1,0,0,0,356,358,3,72,36,0,357,356,1,0,0,0,357,358,1,0,0,0,358,53,
        1,0,0,0,359,364,3,56,28,0,360,361,5,22,0,0,361,363,3,56,28,0,362,
        360,1,0,0,0,363,366,1,0,0,0,364,362,1,0,0,0,364,365,1,0,0,0,365,
        55,1,0,0,0,366,364,1,0,0,0,367,370,3,62,31,0,368,369,5,5,0,0,369,
        371,3,78,39,0,370,368,1,0,0,0,370,371,1,0,0,0,371,373,1,0,0,0,372,
        374,3,66,33,0,373,372,1,0,0,0,373,374,1,0,0,0,374,376,1,0,0,0,375,
        377,3,116,58,0,376,375,1,0,0,0,376,377,1,0,0,0,377,392,1,0,0,0,378,
        379,5,21,0,0,379,380,3,96,48,0,380,382,5,23,0,0,381,383,3,66,33,
        0,382,381,1,0,0,0,382,383,1,0,0,0,383,385,1,0,0,0,384,386,3,116,
        58,0,385,384,1,0,0,0,385,386,1,0,0,0,386,392,1,0,0,0,387,389,3,90,
        45,0,388,390,3,66,33,0,389,388,1,0,0,0,389,390,1,0,0,0,390,392,1,
        0,0,0,391,367,1,0,0,0,391,378,1,0,0,0,391,387,1,0,0,0,392,57,1,0,
        0,0,393,394,5,96,0,0,394,395,5,28,0,0,395,396,3,60,30,0,396,59,1,
        0,0,0,397,398,7,3,0,0,398,61,1,0,0,0,399,404,7,4,0,0,400,401,5,39,
        0,0,401,403,7,4,0,0,402,400,1,0,0,0,403,406,1,0,0,0,404,402,1,0,
        0,0,404,405,1,0,0,0,405,63,1,0,0,0,406,404,1,0,0,0,407,408,5,40,
        0,0,408,409,5,21,0,0,409,410,3,96,48,0,410,411,5,23,0,0,411,415,
        1,0,0,0,412,413,5,40,0,0,413,415,5,101,0,0,414,407,1,0,0,0,414,412,
        1,0,0,0,415,65,1,0,0,0,416,417,5,9,0,0,417,418,3,22,11,0,418,67,
        1,0,0,0,419,420,5,34,0,0,420,421,5,21,0,0,421,422,3,96,48,0,422,
        423,5,23,0,0,423,69,1,0,0,0,424,425,5,35,0,0,425,426,5,21,0,0,426,
        427,3,96,48,0,427,428,5,23,0,0,428,71,1,0,0,0,429,430,5,41,0,0,430,
        431,5,21,0,0,431,432,3,96,48,0,432,433,5,23,0,0,433,73,1,0,0,0,434,
        447,5,42,0,0,435,440,3,90,45,0,436,437,5,22,0,0,437,439,3,90,45,
        0,438,436,1,0,0,0,439,442,1,0,0,0,440,438,1,0,0,0,440,441,1,0,0,
        0,441,444,1,0,0,0,442,440,1,0,0,0,443,445,3,34,17,0,444,443,1,0,
        0,0,444,445,1,0,0,0,445,448,1,0,0,0,446,448,3,34,17,0,447,435,1,
        0,0,0,447,446,1,0,0,0,448,75,1,0,0,0,449,450,5,30,0,0,450,451,3,
        20,10,0,451,77,1,0,0,0,452,460,3,124,62,0,453,460,3,62,31,0,454,
        460,3,80,40,0,455,456,5,21,0,0,456,457,3,96,48,0,457,458,5,23,0,
        0,458,460,1,0,0,0,459,452,1,0,0,0,459,453,1,0,0,0,459,454,1,0,0,
        0,459,455,1,0,0,0,460,79,1,0,0,0,461,462,3,22,11,0,462,464,5,21,
        0,0,463,465,3,82,41,0,464,463,1,0,0,0,464,465,1,0,0,0,465,466,1,
        0,0,0,466,467,5,23,0,0,467,81,1,0,0,0,468,473,3,84,42,0,469,470,
        5,22,0,0,470,472,3,84,42,0,471,469,1,0,0,0,472,475,1,0,0,0,473,471,
        1,0,0,0,473,474,1,0,0,0,474,83,1,0,0,0,475,473,1,0,0,0,476,477,3,
        86,43,0,477,478,5,7,0,0,478,479,3,88,44,0,479,482,1,0,0,0,480,482,
        3,88,44,0,481,476,1,0,0,0,481,480,1,0,0,0,482,85,1,0,0,0,483,501,
        3,22,11,0,484,501,5,30,0,0,485,501,5,31,0,0,486,501,5,32,0,0,487,
        501,5,20,0,0,488,501,5,4,0,0,489,501,5,8,0,0,490,501,5,16,0,0,491,
        501,5,18,0,0,492,501,5,33,0,0,493,501,5,26,0,0,494,501,5,34,0,0,
        495,501,5,35,0,0,496,501,5,17,0,0,497,501,5,36,0,0,498,501,5,37,
        0,0,499,501,5,38,0,0,500,483,1,0,0,0,500,484,1,0,0,0,500,485,1,0,
        0,0,500,486,1,0,0,0,500,487,1,0,0,0,500,488,1,0,0,0,500,489,1,0,
        0,0,500,490,1,0,0,0,500,491,1,0,0,0,500,492,1,0,0,0,500,493,1,0,
        0,0,500,494,1,0,0,0,500,495,1,0,0,0,500,496,1,0,0,0,500,497,1,0,
        0,0,500,498,1,0,0,0,500,499,1,0,0,0,501,87,1,0,0,0,502,506,3,124,
        62,0,503,506,5,97,0,0,504,506,3,96,48,0,505,502,1,0,0,0,505,503,
        1,0,0,0,505,504,1,0,0,0,506,89,1,0,0,0,507,508,3,22,11,0,508,510,
        5,21,0,0,509,511,3,92,46,0,510,509,1,0,0,0,510,511,1,0,0,0,511,512,
        1,0,0,0,512,513,5,23,0,0,513,91,1,0,0,0,514,519,3,94,47,0,515,516,
        5,22,0,0,516,518,3,94,47,0,517,515,1,0,0,0,518,521,1,0,0,0,519,517,
        1,0,0,0,519,520,1,0,0,0,520,93,1,0,0,0,521,519,1,0,0,0,522,526,3,
        124,62,0,523,526,5,97,0,0,524,526,3,96,48,0,525,522,1,0,0,0,525,
        523,1,0,0,0,525,524,1,0,0,0,526,95,1,0,0,0,527,528,6,48,-1,0,528,
        532,3,98,49,0,529,530,7,5,0,0,530,532,3,96,48,11,531,527,1,0,0,0,
        531,529,1,0,0,0,532,573,1,0,0,0,533,534,10,10,0,0,534,535,7,6,0,
        0,535,572,3,96,48,11,536,537,10,9,0,0,537,538,7,7,0,0,538,572,3,
        96,48,10,539,540,10,7,0,0,540,541,5,49,0,0,541,572,3,96,48,8,542,
        543,10,6,0,0,543,544,7,8,0,0,544,572,3,96,48,7,545,546,10,5,0,0,
        546,547,7,9,0,0,547,572,3,96,48,6,548,549,10,4,0,0,549,550,7,10,
        0,0,550,572,3,96,48,5,551,552,10,3,0,0,552,553,5,57,0,0,553,572,
        3,96,48,4,554,555,10,2,0,0,555,556,7,11,0,0,556,572,3,96,48,3,557,
        558,10,1,0,0,558,559,5,60,0,0,559,572,3,96,48,2,560,561,10,13,0,
        0,561,562,5,39,0,0,562,572,3,100,50,0,563,564,10,12,0,0,564,565,
        5,43,0,0,565,566,3,96,48,0,566,567,5,44,0,0,567,572,1,0,0,0,568,
        569,10,8,0,0,569,570,7,12,0,0,570,572,3,110,55,0,571,533,1,0,0,0,
        571,536,1,0,0,0,571,539,1,0,0,0,571,542,1,0,0,0,571,545,1,0,0,0,
        571,548,1,0,0,0,571,551,1,0,0,0,571,554,1,0,0,0,571,557,1,0,0,0,
        571,560,1,0,0,0,571,563,1,0,0,0,571,568,1,0,0,0,572,575,1,0,0,0,
        573,571,1,0,0,0,573,574,1,0,0,0,574,97,1,0,0,0,575,573,1,0,0,0,576,
        584,3,100,50,0,577,584,3,124,62,0,578,584,3,102,51,0,579,580,5,21,
        0,0,580,581,3,96,48,0,581,582,5,23,0,0,582,584,1,0,0,0,583,576,1,
        0,0,0,583,577,1,0,0,0,583,578,1,0,0,0,583,579,1,0,0,0,584,99,1,0,
        0,0,585,591,3,104,52,0,586,591,3,22,11,0,587,591,5,61,0,0,588,591,
        5,62,0,0,589,591,5,63,0,0,590,585,1,0,0,0,590,586,1,0,0,0,590,587,
        1,0,0,0,590,588,1,0,0,0,590,589,1,0,0,0,591,101,1,0,0,0,592,595,
        5,64,0,0,593,596,3,22,11,0,594,596,5,100,0,0,595,593,1,0,0,0,595,
        594,1,0,0,0,596,103,1,0,0,0,597,598,5,15,0,0,598,607,5,21,0,0,599,
        604,3,106,53,0,600,601,5,22,0,0,601,603,3,106,53,0,602,600,1,0,0,
        0,603,606,1,0,0,0,604,602,1,0,0,0,604,605,1,0,0,0,605,608,1,0,0,
        0,606,604,1,0,0,0,607,599,1,0,0,0,607,608,1,0,0,0,608,609,1,0,0,
        0,609,618,5,23,0,0,610,611,3,62,31,0,611,613,5,21,0,0,612,614,3,
        108,54,0,613,612,1,0,0,0,613,614,1,0,0,0,614,615,1,0,0,0,615,616,
        5,23,0,0,616,618,1,0,0,0,617,597,1,0,0,0,617,610,1,0,0,0,618,105,
        1,0,0,0,619,621,3,96,48,0,620,622,7,13,0,0,621,620,1,0,0,0,621,622,
        1,0,0,0,622,107,1,0,0,0,623,628,3,96,48,0,624,625,5,22,0,0,625,627,
        3,96,48,0,626,624,1,0,0,0,627,630,1,0,0,0,628,626,1,0,0,0,628,629,
        1,0,0,0,629,109,1,0,0,0,630,628,1,0,0,0,631,632,3,62,31,0,632,111,
        1,0,0,0,633,634,5,97,0,0,634,113,1,0,0,0,635,636,7,14,0,0,636,115,
        1,0,0,0,637,643,5,37,0,0,638,639,5,68,0,0,639,643,5,97,0,0,640,643,
        5,38,0,0,641,643,5,69,0,0,642,637,1,0,0,0,642,638,1,0,0,0,642,640,
        1,0,0,0,642,641,1,0,0,0,643,117,1,0,0,0,644,645,7,15,0,0,645,119,
        1,0,0,0,646,647,7,16,0,0,647,121,1,0,0,0,648,649,7,17,0,0,649,123,
        1,0,0,0,650,661,5,89,0,0,651,661,5,90,0,0,652,661,3,126,63,0,653,
        661,5,94,0,0,654,661,7,18,0,0,655,661,5,91,0,0,656,661,5,92,0,0,
        657,661,5,93,0,0,658,661,5,100,0,0,659,661,5,101,0,0,660,650,1,0,
        0,0,660,651,1,0,0,0,660,652,1,0,0,0,660,653,1,0,0,0,660,654,1,0,
        0,0,660,655,1,0,0,0,660,656,1,0,0,0,660,657,1,0,0,0,660,658,1,0,
        0,0,660,659,1,0,0,0,661,125,1,0,0,0,662,663,7,18,0,0,663,669,7,19,
        0,0,664,665,7,18,0,0,665,669,7,20,0,0,666,667,7,18,0,0,667,669,5,
        100,0,0,668,662,1,0,0,0,668,664,1,0,0,0,668,666,1,0,0,0,669,127,
        1,0,0,0,70,131,137,141,146,152,158,164,174,179,207,214,226,241,244,
        254,261,267,288,296,303,308,311,314,321,331,336,339,342,345,348,
        351,354,357,364,370,373,376,382,385,389,391,404,414,440,444,447,
        459,464,473,481,500,505,510,519,525,531,571,573,583,590,595,604,
        607,613,617,621,628,642,660,668
    ];

    private static __ATN: antlr.ATN;
    public static get _ATN(): antlr.ATN {
        if (!mappingParser.__ATN) {
            mappingParser.__ATN = new antlr.ATNDeserializer().deserialize(mappingParser._serializedATN);
        }

        return mappingParser.__ATN;
    }


    private static readonly vocabulary = new antlr.Vocabulary(mappingParser.literalNames, mappingParser.symbolicNames, []);

    public override get vocabulary(): antlr.Vocabulary {
        return mappingParser.vocabulary;
    }

    private static readonly decisionsToDFA = mappingParser._ATN.decisionToState.map( (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index) );
}

export class StructureMapContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public EOF(): antlr.TerminalNode {
        return this.getToken(mappingParser.EOF, 0)!;
    }
    public metadataDeclaration(): MetadataDeclarationContext[];
    public metadataDeclaration(i: number): MetadataDeclarationContext | null;
    public metadataDeclaration(i?: number): MetadataDeclarationContext[] | MetadataDeclarationContext | null {
        if (i === undefined) {
            return this.getRuleContexts(MetadataDeclarationContext);
        }

        return this.getRuleContext(i, MetadataDeclarationContext);
    }
    public conceptMapDeclaration(): ConceptMapDeclarationContext[];
    public conceptMapDeclaration(i: number): ConceptMapDeclarationContext | null;
    public conceptMapDeclaration(i?: number): ConceptMapDeclarationContext[] | ConceptMapDeclarationContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ConceptMapDeclarationContext);
        }

        return this.getRuleContext(i, ConceptMapDeclarationContext);
    }
    public mapDeclaration(): MapDeclarationContext | null {
        return this.getRuleContext(0, MapDeclarationContext);
    }
    public structureDeclaration(): StructureDeclarationContext[];
    public structureDeclaration(i: number): StructureDeclarationContext | null;
    public structureDeclaration(i?: number): StructureDeclarationContext[] | StructureDeclarationContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StructureDeclarationContext);
        }

        return this.getRuleContext(i, StructureDeclarationContext);
    }
    public importDeclaration(): ImportDeclarationContext[];
    public importDeclaration(i: number): ImportDeclarationContext | null;
    public importDeclaration(i?: number): ImportDeclarationContext[] | ImportDeclarationContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ImportDeclarationContext);
        }

        return this.getRuleContext(i, ImportDeclarationContext);
    }
    public constantDeclaration(): ConstantDeclarationContext[];
    public constantDeclaration(i: number): ConstantDeclarationContext | null;
    public constantDeclaration(i?: number): ConstantDeclarationContext[] | ConstantDeclarationContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ConstantDeclarationContext);
        }

        return this.getRuleContext(i, ConstantDeclarationContext);
    }
    public groupDeclaration(): GroupDeclarationContext[];
    public groupDeclaration(i: number): GroupDeclarationContext | null;
    public groupDeclaration(i?: number): GroupDeclarationContext[] | GroupDeclarationContext | null {
        if (i === undefined) {
            return this.getRuleContexts(GroupDeclarationContext);
        }

        return this.getRuleContext(i, GroupDeclarationContext);
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_structureMap;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterStructureMap) {
             listener.enterStructureMap(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitStructureMap) {
             listener.exitStructureMap(this);
        }
    }
}


export class ConceptMapDeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public url(): UrlContext {
        return this.getRuleContext(0, UrlContext)!;
    }
    public conceptMapPrefix(): ConceptMapPrefixContext[];
    public conceptMapPrefix(i: number): ConceptMapPrefixContext | null;
    public conceptMapPrefix(i?: number): ConceptMapPrefixContext[] | ConceptMapPrefixContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ConceptMapPrefixContext);
        }

        return this.getRuleContext(i, ConceptMapPrefixContext);
    }
    public conceptMapCodeMap(): ConceptMapCodeMapContext[];
    public conceptMapCodeMap(i: number): ConceptMapCodeMapContext | null;
    public conceptMapCodeMap(i?: number): ConceptMapCodeMapContext[] | ConceptMapCodeMapContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ConceptMapCodeMapContext);
        }

        return this.getRuleContext(i, ConceptMapCodeMapContext);
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_conceptMapDeclaration;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterConceptMapDeclaration) {
             listener.enterConceptMapDeclaration(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitConceptMapDeclaration) {
             listener.exitConceptMapDeclaration(this);
        }
    }
}


export class ConceptMapPrefixContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ID(): antlr.TerminalNode {
        return this.getToken(mappingParser.ID, 0)!;
    }
    public url(): UrlContext {
        return this.getRuleContext(0, UrlContext)!;
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_conceptMapPrefix;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterConceptMapPrefix) {
             listener.enterConceptMapPrefix(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitConceptMapPrefix) {
             listener.exitConceptMapPrefix(this);
        }
    }
}


export class ConceptMapCodeMapContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public conceptMapSource(): ConceptMapSourceContext {
        return this.getRuleContext(0, ConceptMapSourceContext)!;
    }
    public conceptMapTarget(): ConceptMapTargetContext {
        return this.getRuleContext(0, ConceptMapTargetContext)!;
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_conceptMapCodeMap;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterConceptMapCodeMap) {
             listener.enterConceptMapCodeMap(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitConceptMapCodeMap) {
             listener.exitConceptMapCodeMap(this);
        }
    }
}


export class ConceptMapSourceContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ID(): antlr.TerminalNode {
        return this.getToken(mappingParser.ID, 0)!;
    }
    public code(): CodeContext {
        return this.getRuleContext(0, CodeContext)!;
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_conceptMapSource;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterConceptMapSource) {
             listener.enterConceptMapSource(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitConceptMapSource) {
             listener.exitConceptMapSource(this);
        }
    }
}


export class ConceptMapTargetContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ID(): antlr.TerminalNode {
        return this.getToken(mappingParser.ID, 0)!;
    }
    public code(): CodeContext {
        return this.getRuleContext(0, CodeContext)!;
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_conceptMapTarget;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterConceptMapTarget) {
             listener.enterConceptMapTarget(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitConceptMapTarget) {
             listener.exitConceptMapTarget(this);
        }
    }
}


export class CodeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ID(): antlr.TerminalNode | null {
        return this.getToken(mappingParser.ID, 0);
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(mappingParser.STRING, 0);
    }
    public DOUBLE_QUOTED_STRING(): antlr.TerminalNode | null {
        return this.getToken(mappingParser.DOUBLE_QUOTED_STRING, 0);
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_code;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterCode) {
             listener.enterCode(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitCode) {
             listener.exitCode(this);
        }
    }
}


export class MapDeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public url(): UrlContext {
        return this.getRuleContext(0, UrlContext)!;
    }
    public identifier(): IdentifierContext | null {
        return this.getRuleContext(0, IdentifierContext);
    }
    public DOUBLE_QUOTED_STRING(): antlr.TerminalNode | null {
        return this.getToken(mappingParser.DOUBLE_QUOTED_STRING, 0);
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_mapDeclaration;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterMapDeclaration) {
             listener.enterMapDeclaration(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitMapDeclaration) {
             listener.exitMapDeclaration(this);
        }
    }
}


export class MetadataDeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public METADATA_PREFIX(): antlr.TerminalNode {
        return this.getToken(mappingParser.METADATA_PREFIX, 0)!;
    }
    public qualifiedIdentifier(): QualifiedIdentifierContext {
        return this.getRuleContext(0, QualifiedIdentifierContext)!;
    }
    public literal(): LiteralContext | null {
        return this.getRuleContext(0, LiteralContext);
    }
    public markdownLiteral(): MarkdownLiteralContext | null {
        return this.getRuleContext(0, MarkdownLiteralContext);
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_metadataDeclaration;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterMetadataDeclaration) {
             listener.enterMetadataDeclaration(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitMetadataDeclaration) {
             listener.exitMetadataDeclaration(this);
        }
    }
}


export class MarkdownLiteralContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public TRIPLE_QUOTED_STRING_LITERAL(): antlr.TerminalNode {
        return this.getToken(mappingParser.TRIPLE_QUOTED_STRING_LITERAL, 0)!;
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_markdownLiteral;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterMarkdownLiteral) {
             listener.enterMarkdownLiteral(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitMarkdownLiteral) {
             listener.exitMarkdownLiteral(this);
        }
    }
}


export class UrlContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(mappingParser.STRING, 0);
    }
    public DOUBLE_QUOTED_STRING(): antlr.TerminalNode | null {
        return this.getToken(mappingParser.DOUBLE_QUOTED_STRING, 0);
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_url;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterUrl) {
             listener.enterUrl(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitUrl) {
             listener.exitUrl(this);
        }
    }
}


export class IdentifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ID(): antlr.TerminalNode | null {
        return this.getToken(mappingParser.ID, 0);
    }
    public IDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(mappingParser.IDENTIFIER, 0);
    }
    public DELIMITEDIDENTIFIER(): antlr.TerminalNode | null {
        return this.getToken(mappingParser.DELIMITEDIDENTIFIER, 0);
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_identifier;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterIdentifier) {
             listener.enterIdentifier(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitIdentifier) {
             listener.exitIdentifier(this);
        }
    }
}


export class StructureDeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public url(): UrlContext {
        return this.getRuleContext(0, UrlContext)!;
    }
    public modelMode(): ModelModeContext {
        return this.getRuleContext(0, ModelModeContext)!;
    }
    public identifier(): IdentifierContext | null {
        return this.getRuleContext(0, IdentifierContext);
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_structureDeclaration;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterStructureDeclaration) {
             listener.enterStructureDeclaration(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitStructureDeclaration) {
             listener.exitStructureDeclaration(this);
        }
    }
}


export class ConstantDeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ID(): antlr.TerminalNode {
        return this.getToken(mappingParser.ID, 0)!;
    }
    public fpExpression(): FpExpressionContext {
        return this.getRuleContext(0, FpExpressionContext)!;
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_constantDeclaration;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterConstantDeclaration) {
             listener.enterConstantDeclaration(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitConstantDeclaration) {
             listener.exitConstantDeclaration(this);
        }
    }
}


export class GroupDeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ID(): antlr.TerminalNode {
        return this.getToken(mappingParser.ID, 0)!;
    }
    public parameters(): ParametersContext {
        return this.getRuleContext(0, ParametersContext)!;
    }
    public mapRules(): MapRulesContext {
        return this.getRuleContext(0, MapRulesContext)!;
    }
    public extends(): ExtendsContext | null {
        return this.getRuleContext(0, ExtendsContext);
    }
    public typeMode(): TypeModeContext | null {
        return this.getRuleContext(0, TypeModeContext);
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_groupDeclaration;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterGroupDeclaration) {
             listener.enterGroupDeclaration(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitGroupDeclaration) {
             listener.exitGroupDeclaration(this);
        }
    }
}


export class ParametersContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public parameter(): ParameterContext[];
    public parameter(i: number): ParameterContext | null;
    public parameter(i?: number): ParameterContext[] | ParameterContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ParameterContext);
        }

        return this.getRuleContext(i, ParameterContext);
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_parameters;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterParameters) {
             listener.enterParameters(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitParameters) {
             listener.exitParameters(this);
        }
    }
}


export class ParameterContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public parameterMode(): ParameterModeContext {
        return this.getRuleContext(0, ParameterModeContext)!;
    }
    public ID(): antlr.TerminalNode {
        return this.getToken(mappingParser.ID, 0)!;
    }
    public typeIdentifier(): TypeIdentifierContext | null {
        return this.getRuleContext(0, TypeIdentifierContext);
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_parameter;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterParameter) {
             listener.enterParameter(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitParameter) {
             listener.exitParameter(this);
        }
    }
}


export class MapRulesContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public mapRule(): MapRuleContext[];
    public mapRule(i: number): MapRuleContext | null;
    public mapRule(i?: number): MapRuleContext[] | MapRuleContext | null {
        if (i === undefined) {
            return this.getRuleContexts(MapRuleContext);
        }

        return this.getRuleContext(i, MapRuleContext);
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_mapRules;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterMapRules) {
             listener.enterMapRules(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitMapRules) {
             listener.exitMapRules(this);
        }
    }
}


export class TypeModeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public groupTypeMode(): GroupTypeModeContext {
        return this.getRuleContext(0, GroupTypeModeContext)!;
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_typeMode;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterTypeMode) {
             listener.enterTypeMode(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitTypeMode) {
             listener.exitTypeMode(this);
        }
    }
}


export class ExtendsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ID(): antlr.TerminalNode {
        return this.getToken(mappingParser.ID, 0)!;
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_extends;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterExtends) {
             listener.enterExtends(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitExtends) {
             listener.exitExtends(this);
        }
    }
}


export class TypeIdentifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public identifier(): IdentifierContext {
        return this.getRuleContext(0, IdentifierContext)!;
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_typeIdentifier;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterTypeIdentifier) {
             listener.enterTypeIdentifier(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitTypeIdentifier) {
             listener.exitTypeIdentifier(this);
        }
    }
}


export class MapRuleContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_mapRule;
    }
    public override copyFrom(ctx: MapRuleContext): void {
        super.copyFrom(ctx);
    }
}
export class MapSimpleBatchIdentityContext extends MapRuleContext {
    public constructor(ctx: MapRuleContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public qualifiedIdentifier(): QualifiedIdentifierContext[];
    public qualifiedIdentifier(i: number): QualifiedIdentifierContext | null;
    public qualifiedIdentifier(i?: number): QualifiedIdentifierContext[] | QualifiedIdentifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(QualifiedIdentifierContext);
        }

        return this.getRuleContext(i, QualifiedIdentifierContext);
    }
    public identityFieldList(): IdentityFieldListContext {
        return this.getRuleContext(0, IdentityFieldListContext)!;
    }
    public ruleName(): RuleNameContext | null {
        return this.getRuleContext(0, RuleNameContext);
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterMapSimpleBatchIdentity) {
             listener.enterMapSimpleBatchIdentity(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitMapSimpleBatchIdentity) {
             listener.exitMapSimpleBatchIdentity(this);
        }
    }
}
export class MapSimpleCopyContext extends MapRuleContext {
    public constructor(ctx: MapRuleContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public qualifiedIdentifier(): QualifiedIdentifierContext[];
    public qualifiedIdentifier(i: number): QualifiedIdentifierContext | null;
    public qualifiedIdentifier(i?: number): QualifiedIdentifierContext[] | QualifiedIdentifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(QualifiedIdentifierContext);
        }

        return this.getRuleContext(i, QualifiedIdentifierContext);
    }
    public ruleName(): RuleNameContext | null {
        return this.getRuleContext(0, RuleNameContext);
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterMapSimpleCopy) {
             listener.enterMapSimpleCopy(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitMapSimpleCopy) {
             listener.exitMapSimpleCopy(this);
        }
    }
}
export class MapFhirMarkupContext extends MapRuleContext {
    public constructor(ctx: MapRuleContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public mapTransformationRule(): MapTransformationRuleContext {
        return this.getRuleContext(0, MapTransformationRuleContext)!;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterMapFhirMarkup) {
             listener.enterMapFhirMarkup(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitMapFhirMarkup) {
             listener.exitMapFhirMarkup(this);
        }
    }
}


export class MapTransformationRuleContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ruleSources(): RuleSourcesContext {
        return this.getRuleContext(0, RuleSourcesContext)!;
    }
    public ruleTargets(): RuleTargetsContext | null {
        return this.getRuleContext(0, RuleTargetsContext);
    }
    public dependentExpression(): DependentExpressionContext | null {
        return this.getRuleContext(0, DependentExpressionContext);
    }
    public ruleName(): RuleNameContext | null {
        return this.getRuleContext(0, RuleNameContext);
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_mapTransformationRule;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterMapTransformationRule) {
             listener.enterMapTransformationRule(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitMapTransformationRule) {
             listener.exitMapTransformationRule(this);
        }
    }
}


export class IdentityFieldListContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public identifier(): IdentifierContext[];
    public identifier(i: number): IdentifierContext | null;
    public identifier(i?: number): IdentifierContext[] | IdentifierContext | null {
        if (i === undefined) {
            return this.getRuleContexts(IdentifierContext);
        }

        return this.getRuleContext(i, IdentifierContext);
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_identityFieldList;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterIdentityFieldList) {
             listener.enterIdentityFieldList(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitIdentityFieldList) {
             listener.exitIdentityFieldList(this);
        }
    }
}


export class RuleNameContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public DOUBLE_QUOTED_STRING(): antlr.TerminalNode {
        return this.getToken(mappingParser.DOUBLE_QUOTED_STRING, 0)!;
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_ruleName;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterRuleName) {
             listener.enterRuleName(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitRuleName) {
             listener.exitRuleName(this);
        }
    }
}


export class RuleSourcesContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ruleSource(): RuleSourceContext[];
    public ruleSource(i: number): RuleSourceContext | null;
    public ruleSource(i?: number): RuleSourceContext[] | RuleSourceContext | null {
        if (i === undefined) {
            return this.getRuleContexts(RuleSourceContext);
        }

        return this.getRuleContext(i, RuleSourceContext);
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_ruleSources;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterRuleSources) {
             listener.enterRuleSources(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitRuleSources) {
             listener.exitRuleSources(this);
        }
    }
}


export class RuleSourceContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public qualifiedIdentifier(): QualifiedIdentifierContext {
        return this.getRuleContext(0, QualifiedIdentifierContext)!;
    }
    public typeIdentifier(): TypeIdentifierContext | null {
        return this.getRuleContext(0, TypeIdentifierContext);
    }
    public sourceCardinality(): SourceCardinalityContext | null {
        return this.getRuleContext(0, SourceCardinalityContext);
    }
    public sourceDefault(): SourceDefaultContext | null {
        return this.getRuleContext(0, SourceDefaultContext);
    }
    public sourceListMode(): SourceListModeContext | null {
        return this.getRuleContext(0, SourceListModeContext);
    }
    public alias(): AliasContext | null {
        return this.getRuleContext(0, AliasContext);
    }
    public whereClause(): WhereClauseContext | null {
        return this.getRuleContext(0, WhereClauseContext);
    }
    public checkClause(): CheckClauseContext | null {
        return this.getRuleContext(0, CheckClauseContext);
    }
    public log(): LogContext | null {
        return this.getRuleContext(0, LogContext);
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_ruleSource;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterRuleSource) {
             listener.enterRuleSource(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitRuleSource) {
             listener.exitRuleSource(this);
        }
    }
}


export class RuleTargetsContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ruleTarget(): RuleTargetContext[];
    public ruleTarget(i: number): RuleTargetContext | null;
    public ruleTarget(i?: number): RuleTargetContext[] | RuleTargetContext | null {
        if (i === undefined) {
            return this.getRuleContexts(RuleTargetContext);
        }

        return this.getRuleContext(i, RuleTargetContext);
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_ruleTargets;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterRuleTargets) {
             listener.enterRuleTargets(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitRuleTargets) {
             listener.exitRuleTargets(this);
        }
    }
}


export class RuleTargetContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public qualifiedIdentifier(): QualifiedIdentifierContext | null {
        return this.getRuleContext(0, QualifiedIdentifierContext);
    }
    public transform(): TransformContext | null {
        return this.getRuleContext(0, TransformContext);
    }
    public alias(): AliasContext | null {
        return this.getRuleContext(0, AliasContext);
    }
    public targetListMode(): TargetListModeContext | null {
        return this.getRuleContext(0, TargetListModeContext);
    }
    public fpExpression(): FpExpressionContext | null {
        return this.getRuleContext(0, FpExpressionContext);
    }
    public groupInvocation(): GroupInvocationContext | null {
        return this.getRuleContext(0, GroupInvocationContext);
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_ruleTarget;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterRuleTarget) {
             listener.enterRuleTarget(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitRuleTarget) {
             listener.exitRuleTarget(this);
        }
    }
}


export class SourceCardinalityContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public INTEGER(): antlr.TerminalNode {
        return this.getToken(mappingParser.INTEGER, 0)!;
    }
    public upperBound(): UpperBoundContext {
        return this.getRuleContext(0, UpperBoundContext)!;
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_sourceCardinality;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterSourceCardinality) {
             listener.enterSourceCardinality(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitSourceCardinality) {
             listener.exitSourceCardinality(this);
        }
    }
}


export class UpperBoundContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public INTEGER(): antlr.TerminalNode {
        return this.getToken(mappingParser.INTEGER, 0)!;
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_upperBound;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterUpperBound) {
             listener.enterUpperBound(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitUpperBound) {
             listener.exitUpperBound(this);
        }
    }
}


export class QualifiedIdentifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public DELIMITEDIDENTIFIER(): antlr.TerminalNode[];
    public DELIMITEDIDENTIFIER(i: number): antlr.TerminalNode | null;
    public DELIMITEDIDENTIFIER(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(mappingParser.DELIMITEDIDENTIFIER);
    	} else {
    		return this.getToken(mappingParser.DELIMITEDIDENTIFIER, i);
    	}
    }
    public ID(): antlr.TerminalNode[];
    public ID(i: number): antlr.TerminalNode | null;
    public ID(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(mappingParser.ID);
    	} else {
    		return this.getToken(mappingParser.ID, i);
    	}
    }
    public IDENTIFIER(): antlr.TerminalNode[];
    public IDENTIFIER(i: number): antlr.TerminalNode | null;
    public IDENTIFIER(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(mappingParser.IDENTIFIER);
    	} else {
    		return this.getToken(mappingParser.IDENTIFIER, i);
    	}
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_qualifiedIdentifier;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterQualifiedIdentifier) {
             listener.enterQualifiedIdentifier(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitQualifiedIdentifier) {
             listener.exitQualifiedIdentifier(this);
        }
    }
}


export class SourceDefaultContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public fpExpression(): FpExpressionContext | null {
        return this.getRuleContext(0, FpExpressionContext);
    }
    public DOUBLE_QUOTED_STRING(): antlr.TerminalNode | null {
        return this.getToken(mappingParser.DOUBLE_QUOTED_STRING, 0);
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_sourceDefault;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterSourceDefault) {
             listener.enterSourceDefault(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitSourceDefault) {
             listener.exitSourceDefault(this);
        }
    }
}


export class AliasContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public identifier(): IdentifierContext {
        return this.getRuleContext(0, IdentifierContext)!;
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_alias;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterAlias) {
             listener.enterAlias(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitAlias) {
             listener.exitAlias(this);
        }
    }
}


export class WhereClauseContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public fpExpression(): FpExpressionContext {
        return this.getRuleContext(0, FpExpressionContext)!;
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_whereClause;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterWhereClause) {
             listener.enterWhereClause(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitWhereClause) {
             listener.exitWhereClause(this);
        }
    }
}


export class CheckClauseContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public fpExpression(): FpExpressionContext {
        return this.getRuleContext(0, FpExpressionContext)!;
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_checkClause;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterCheckClause) {
             listener.enterCheckClause(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitCheckClause) {
             listener.exitCheckClause(this);
        }
    }
}


export class LogContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public fpExpression(): FpExpressionContext {
        return this.getRuleContext(0, FpExpressionContext)!;
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_log;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterLog) {
             listener.enterLog(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitLog) {
             listener.exitLog(this);
        }
    }
}


export class DependentExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public groupInvocation(): GroupInvocationContext[];
    public groupInvocation(i: number): GroupInvocationContext | null;
    public groupInvocation(i?: number): GroupInvocationContext[] | GroupInvocationContext | null {
        if (i === undefined) {
            return this.getRuleContexts(GroupInvocationContext);
        }

        return this.getRuleContext(i, GroupInvocationContext);
    }
    public mapRules(): MapRulesContext | null {
        return this.getRuleContext(0, MapRulesContext);
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_dependentExpression;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterDependentExpression) {
             listener.enterDependentExpression(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitDependentExpression) {
             listener.exitDependentExpression(this);
        }
    }
}


export class ImportDeclarationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public url(): UrlContext {
        return this.getRuleContext(0, UrlContext)!;
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_importDeclaration;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterImportDeclaration) {
             listener.enterImportDeclaration(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitImportDeclaration) {
             listener.exitImportDeclaration(this);
        }
    }
}


export class TransformContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public literal(): LiteralContext | null {
        return this.getRuleContext(0, LiteralContext);
    }
    public qualifiedIdentifier(): QualifiedIdentifierContext | null {
        return this.getRuleContext(0, QualifiedIdentifierContext);
    }
    public transformInvocation(): TransformInvocationContext | null {
        return this.getRuleContext(0, TransformInvocationContext);
    }
    public fpExpression(): FpExpressionContext | null {
        return this.getRuleContext(0, FpExpressionContext);
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_transform;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterTransform) {
             listener.enterTransform(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitTransform) {
             listener.exitTransform(this);
        }
    }
}


export class TransformInvocationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public identifier(): IdentifierContext {
        return this.getRuleContext(0, IdentifierContext)!;
    }
    public transformParamList(): TransformParamListContext | null {
        return this.getRuleContext(0, TransformParamListContext);
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_transformInvocation;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterTransformInvocation) {
             listener.enterTransformInvocation(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitTransformInvocation) {
             listener.exitTransformInvocation(this);
        }
    }
}


export class TransformParamListContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public transformParam(): TransformParamContext[];
    public transformParam(i: number): TransformParamContext | null;
    public transformParam(i?: number): TransformParamContext[] | TransformParamContext | null {
        if (i === undefined) {
            return this.getRuleContexts(TransformParamContext);
        }

        return this.getRuleContext(i, TransformParamContext);
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_transformParamList;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterTransformParamList) {
             listener.enterTransformParamList(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitTransformParamList) {
             listener.exitTransformParamList(this);
        }
    }
}


export class TransformParamContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public transformParamName(): TransformParamNameContext | null {
        return this.getRuleContext(0, TransformParamNameContext);
    }
    public transformParamValue(): TransformParamValueContext {
        return this.getRuleContext(0, TransformParamValueContext)!;
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_transformParam;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterTransformParam) {
             listener.enterTransformParam(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitTransformParam) {
             listener.exitTransformParam(this);
        }
    }
}


export class TransformParamNameContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public identifier(): IdentifierContext | null {
        return this.getRuleContext(0, IdentifierContext);
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_transformParamName;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterTransformParamName) {
             listener.enterTransformParamName(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitTransformParamName) {
             listener.exitTransformParamName(this);
        }
    }
}


export class TransformParamValueContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public literal(): LiteralContext | null {
        return this.getRuleContext(0, LiteralContext);
    }
    public ID(): antlr.TerminalNode | null {
        return this.getToken(mappingParser.ID, 0);
    }
    public fpExpression(): FpExpressionContext | null {
        return this.getRuleContext(0, FpExpressionContext);
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_transformParamValue;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterTransformParamValue) {
             listener.enterTransformParamValue(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitTransformParamValue) {
             listener.exitTransformParamValue(this);
        }
    }
}


export class GroupInvocationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public identifier(): IdentifierContext {
        return this.getRuleContext(0, IdentifierContext)!;
    }
    public groupParamList(): GroupParamListContext | null {
        return this.getRuleContext(0, GroupParamListContext);
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_groupInvocation;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterGroupInvocation) {
             listener.enterGroupInvocation(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitGroupInvocation) {
             listener.exitGroupInvocation(this);
        }
    }
}


export class GroupParamListContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public groupParam(): GroupParamContext[];
    public groupParam(i: number): GroupParamContext | null;
    public groupParam(i?: number): GroupParamContext[] | GroupParamContext | null {
        if (i === undefined) {
            return this.getRuleContexts(GroupParamContext);
        }

        return this.getRuleContext(i, GroupParamContext);
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_groupParamList;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterGroupParamList) {
             listener.enterGroupParamList(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitGroupParamList) {
             listener.exitGroupParamList(this);
        }
    }
}


export class GroupParamContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public literal(): LiteralContext | null {
        return this.getRuleContext(0, LiteralContext);
    }
    public ID(): antlr.TerminalNode | null {
        return this.getToken(mappingParser.ID, 0);
    }
    public fpExpression(): FpExpressionContext | null {
        return this.getRuleContext(0, FpExpressionContext);
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_groupParam;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterGroupParam) {
             listener.enterGroupParam(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitGroupParam) {
             listener.exitGroupParam(this);
        }
    }
}


export class FpExpressionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_fpExpression;
    }
    public override copyFrom(ctx: FpExpressionContext): void {
        super.copyFrom(ctx);
    }
}
export class TermExpressionContext extends FpExpressionContext {
    public constructor(ctx: FpExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public fpTerm(): FpTermContext {
        return this.getRuleContext(0, FpTermContext)!;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterTermExpression) {
             listener.enterTermExpression(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitTermExpression) {
             listener.exitTermExpression(this);
        }
    }
}
export class PolarityExpressionContext extends FpExpressionContext {
    public constructor(ctx: FpExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public fpExpression(): FpExpressionContext {
        return this.getRuleContext(0, FpExpressionContext)!;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterPolarityExpression) {
             listener.enterPolarityExpression(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitPolarityExpression) {
             listener.exitPolarityExpression(this);
        }
    }
}
export class MultiplicativeExpressionContext extends FpExpressionContext {
    public constructor(ctx: FpExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public fpExpression(): FpExpressionContext[];
    public fpExpression(i: number): FpExpressionContext | null;
    public fpExpression(i?: number): FpExpressionContext[] | FpExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(FpExpressionContext);
        }

        return this.getRuleContext(i, FpExpressionContext);
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterMultiplicativeExpression) {
             listener.enterMultiplicativeExpression(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitMultiplicativeExpression) {
             listener.exitMultiplicativeExpression(this);
        }
    }
}
export class AdditiveExpressionContext extends FpExpressionContext {
    public constructor(ctx: FpExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public fpExpression(): FpExpressionContext[];
    public fpExpression(i: number): FpExpressionContext | null;
    public fpExpression(i?: number): FpExpressionContext[] | FpExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(FpExpressionContext);
        }

        return this.getRuleContext(i, FpExpressionContext);
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterAdditiveExpression) {
             listener.enterAdditiveExpression(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitAdditiveExpression) {
             listener.exitAdditiveExpression(this);
        }
    }
}
export class UnionExpressionContext extends FpExpressionContext {
    public constructor(ctx: FpExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public fpExpression(): FpExpressionContext[];
    public fpExpression(i: number): FpExpressionContext | null;
    public fpExpression(i?: number): FpExpressionContext[] | FpExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(FpExpressionContext);
        }

        return this.getRuleContext(i, FpExpressionContext);
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterUnionExpression) {
             listener.enterUnionExpression(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitUnionExpression) {
             listener.exitUnionExpression(this);
        }
    }
}
export class InequalityExpressionContext extends FpExpressionContext {
    public constructor(ctx: FpExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public fpExpression(): FpExpressionContext[];
    public fpExpression(i: number): FpExpressionContext | null;
    public fpExpression(i?: number): FpExpressionContext[] | FpExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(FpExpressionContext);
        }

        return this.getRuleContext(i, FpExpressionContext);
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterInequalityExpression) {
             listener.enterInequalityExpression(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitInequalityExpression) {
             listener.exitInequalityExpression(this);
        }
    }
}
export class EqualityExpressionContext extends FpExpressionContext {
    public constructor(ctx: FpExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public fpExpression(): FpExpressionContext[];
    public fpExpression(i: number): FpExpressionContext | null;
    public fpExpression(i?: number): FpExpressionContext[] | FpExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(FpExpressionContext);
        }

        return this.getRuleContext(i, FpExpressionContext);
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterEqualityExpression) {
             listener.enterEqualityExpression(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitEqualityExpression) {
             listener.exitEqualityExpression(this);
        }
    }
}
export class MembershipExpressionContext extends FpExpressionContext {
    public constructor(ctx: FpExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public fpExpression(): FpExpressionContext[];
    public fpExpression(i: number): FpExpressionContext | null;
    public fpExpression(i?: number): FpExpressionContext[] | FpExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(FpExpressionContext);
        }

        return this.getRuleContext(i, FpExpressionContext);
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterMembershipExpression) {
             listener.enterMembershipExpression(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitMembershipExpression) {
             listener.exitMembershipExpression(this);
        }
    }
}
export class AndExpressionContext extends FpExpressionContext {
    public constructor(ctx: FpExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public fpExpression(): FpExpressionContext[];
    public fpExpression(i: number): FpExpressionContext | null;
    public fpExpression(i?: number): FpExpressionContext[] | FpExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(FpExpressionContext);
        }

        return this.getRuleContext(i, FpExpressionContext);
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterAndExpression) {
             listener.enterAndExpression(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitAndExpression) {
             listener.exitAndExpression(this);
        }
    }
}
export class OrExpressionContext extends FpExpressionContext {
    public constructor(ctx: FpExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public fpExpression(): FpExpressionContext[];
    public fpExpression(i: number): FpExpressionContext | null;
    public fpExpression(i?: number): FpExpressionContext[] | FpExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(FpExpressionContext);
        }

        return this.getRuleContext(i, FpExpressionContext);
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterOrExpression) {
             listener.enterOrExpression(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitOrExpression) {
             listener.exitOrExpression(this);
        }
    }
}
export class ImpliesExpressionContext extends FpExpressionContext {
    public constructor(ctx: FpExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public fpExpression(): FpExpressionContext[];
    public fpExpression(i: number): FpExpressionContext | null;
    public fpExpression(i?: number): FpExpressionContext[] | FpExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(FpExpressionContext);
        }

        return this.getRuleContext(i, FpExpressionContext);
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterImpliesExpression) {
             listener.enterImpliesExpression(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitImpliesExpression) {
             listener.exitImpliesExpression(this);
        }
    }
}
export class InvocationExpressionContext extends FpExpressionContext {
    public constructor(ctx: FpExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public fpExpression(): FpExpressionContext {
        return this.getRuleContext(0, FpExpressionContext)!;
    }
    public fpInvocation(): FpInvocationContext {
        return this.getRuleContext(0, FpInvocationContext)!;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterInvocationExpression) {
             listener.enterInvocationExpression(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitInvocationExpression) {
             listener.exitInvocationExpression(this);
        }
    }
}
export class IndexerExpressionContext extends FpExpressionContext {
    public constructor(ctx: FpExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public fpExpression(): FpExpressionContext[];
    public fpExpression(i: number): FpExpressionContext | null;
    public fpExpression(i?: number): FpExpressionContext[] | FpExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(FpExpressionContext);
        }

        return this.getRuleContext(i, FpExpressionContext);
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterIndexerExpression) {
             listener.enterIndexerExpression(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitIndexerExpression) {
             listener.exitIndexerExpression(this);
        }
    }
}
export class TypeExpressionContext extends FpExpressionContext {
    public constructor(ctx: FpExpressionContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public fpExpression(): FpExpressionContext {
        return this.getRuleContext(0, FpExpressionContext)!;
    }
    public fpTypeSpecifier(): FpTypeSpecifierContext {
        return this.getRuleContext(0, FpTypeSpecifierContext)!;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterTypeExpression) {
             listener.enterTypeExpression(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitTypeExpression) {
             listener.exitTypeExpression(this);
        }
    }
}


export class FpTermContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_fpTerm;
    }
    public override copyFrom(ctx: FpTermContext): void {
        super.copyFrom(ctx);
    }
}
export class InvocationTermContext extends FpTermContext {
    public constructor(ctx: FpTermContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public fpInvocation(): FpInvocationContext {
        return this.getRuleContext(0, FpInvocationContext)!;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterInvocationTerm) {
             listener.enterInvocationTerm(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitInvocationTerm) {
             listener.exitInvocationTerm(this);
        }
    }
}
export class LiteralTermContext extends FpTermContext {
    public constructor(ctx: FpTermContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public literal(): LiteralContext {
        return this.getRuleContext(0, LiteralContext)!;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterLiteralTerm) {
             listener.enterLiteralTerm(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitLiteralTerm) {
             listener.exitLiteralTerm(this);
        }
    }
}
export class ExternalConstantTermContext extends FpTermContext {
    public constructor(ctx: FpTermContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public fpExternalConstant(): FpExternalConstantContext {
        return this.getRuleContext(0, FpExternalConstantContext)!;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterExternalConstantTerm) {
             listener.enterExternalConstantTerm(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitExternalConstantTerm) {
             listener.exitExternalConstantTerm(this);
        }
    }
}
export class ParenthesizedTermContext extends FpTermContext {
    public constructor(ctx: FpTermContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public fpExpression(): FpExpressionContext {
        return this.getRuleContext(0, FpExpressionContext)!;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterParenthesizedTerm) {
             listener.enterParenthesizedTerm(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitParenthesizedTerm) {
             listener.exitParenthesizedTerm(this);
        }
    }
}


export class FpInvocationContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_fpInvocation;
    }
    public override copyFrom(ctx: FpInvocationContext): void {
        super.copyFrom(ctx);
    }
}
export class FunctionInvocationContext extends FpInvocationContext {
    public constructor(ctx: FpInvocationContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public fpFunction(): FpFunctionContext {
        return this.getRuleContext(0, FpFunctionContext)!;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterFunctionInvocation) {
             listener.enterFunctionInvocation(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitFunctionInvocation) {
             listener.exitFunctionInvocation(this);
        }
    }
}
export class MemberInvocationContext extends FpInvocationContext {
    public constructor(ctx: FpInvocationContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public identifier(): IdentifierContext {
        return this.getRuleContext(0, IdentifierContext)!;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterMemberInvocation) {
             listener.enterMemberInvocation(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitMemberInvocation) {
             listener.exitMemberInvocation(this);
        }
    }
}
export class ThisInvocationContext extends FpInvocationContext {
    public constructor(ctx: FpInvocationContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterThisInvocation) {
             listener.enterThisInvocation(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitThisInvocation) {
             listener.exitThisInvocation(this);
        }
    }
}
export class IndexInvocationContext extends FpInvocationContext {
    public constructor(ctx: FpInvocationContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterIndexInvocation) {
             listener.enterIndexInvocation(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitIndexInvocation) {
             listener.exitIndexInvocation(this);
        }
    }
}
export class TotalInvocationContext extends FpInvocationContext {
    public constructor(ctx: FpInvocationContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterTotalInvocation) {
             listener.enterTotalInvocation(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitTotalInvocation) {
             listener.exitTotalInvocation(this);
        }
    }
}


export class FpExternalConstantContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public identifier(): IdentifierContext | null {
        return this.getRuleContext(0, IdentifierContext);
    }
    public STRING(): antlr.TerminalNode | null {
        return this.getToken(mappingParser.STRING, 0);
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_fpExternalConstant;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterFpExternalConstant) {
             listener.enterFpExternalConstant(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitFpExternalConstant) {
             listener.exitFpExternalConstant(this);
        }
    }
}


export class FpFunctionContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public fpSortArgument(): FpSortArgumentContext[];
    public fpSortArgument(i: number): FpSortArgumentContext | null;
    public fpSortArgument(i?: number): FpSortArgumentContext[] | FpSortArgumentContext | null {
        if (i === undefined) {
            return this.getRuleContexts(FpSortArgumentContext);
        }

        return this.getRuleContext(i, FpSortArgumentContext);
    }
    public qualifiedIdentifier(): QualifiedIdentifierContext | null {
        return this.getRuleContext(0, QualifiedIdentifierContext);
    }
    public fpParamList(): FpParamListContext | null {
        return this.getRuleContext(0, FpParamListContext);
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_fpFunction;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterFpFunction) {
             listener.enterFpFunction(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitFpFunction) {
             listener.exitFpFunction(this);
        }
    }
}


export class FpSortArgumentContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_fpSortArgument;
    }
    public override copyFrom(ctx: FpSortArgumentContext): void {
        super.copyFrom(ctx);
    }
}
export class SortDirectionArgumentContext extends FpSortArgumentContext {
    public constructor(ctx: FpSortArgumentContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public fpExpression(): FpExpressionContext {
        return this.getRuleContext(0, FpExpressionContext)!;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterSortDirectionArgument) {
             listener.enterSortDirectionArgument(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitSortDirectionArgument) {
             listener.exitSortDirectionArgument(this);
        }
    }
}


export class FpParamListContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public fpExpression(): FpExpressionContext[];
    public fpExpression(i: number): FpExpressionContext | null;
    public fpExpression(i?: number): FpExpressionContext[] | FpExpressionContext | null {
        if (i === undefined) {
            return this.getRuleContexts(FpExpressionContext);
        }

        return this.getRuleContext(i, FpExpressionContext);
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_fpParamList;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterFpParamList) {
             listener.enterFpParamList(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitFpParamList) {
             listener.exitFpParamList(this);
        }
    }
}


export class FpTypeSpecifierContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public qualifiedIdentifier(): QualifiedIdentifierContext {
        return this.getRuleContext(0, QualifiedIdentifierContext)!;
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_fpTypeSpecifier;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterFpTypeSpecifier) {
             listener.enterFpTypeSpecifier(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitFpTypeSpecifier) {
             listener.exitFpTypeSpecifier(this);
        }
    }
}


export class ConstantContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ID(): antlr.TerminalNode {
        return this.getToken(mappingParser.ID, 0)!;
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_constant;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterConstant) {
             listener.enterConstant(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitConstant) {
             listener.exitConstant(this);
        }
    }
}


export class SourceListModeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_sourceListMode;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterSourceListMode) {
             listener.enterSourceListMode(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitSourceListMode) {
             listener.exitSourceListMode(this);
        }
    }
}


export class TargetListModeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public ID(): antlr.TerminalNode | null {
        return this.getToken(mappingParser.ID, 0);
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_targetListMode;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterTargetListMode) {
             listener.enterTargetListMode(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitTargetListMode) {
             listener.exitTargetListMode(this);
        }
    }
}


export class GroupTypeModeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_groupTypeMode;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterGroupTypeMode) {
             listener.enterGroupTypeMode(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitGroupTypeMode) {
             listener.exitGroupTypeMode(this);
        }
    }
}


export class ModelModeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_modelMode;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterModelMode) {
             listener.enterModelMode(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitModelMode) {
             listener.exitModelMode(this);
        }
    }
}


export class ParameterModeContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_parameterMode;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterParameterMode) {
             listener.enterParameterMode(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitParameterMode) {
             listener.exitParameterMode(this);
        }
    }
}


export class LiteralContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_literal;
    }
    public override copyFrom(ctx: LiteralContext): void {
        super.copyFrom(ctx);
    }
}
export class NullLiteralContext extends LiteralContext {
    public constructor(ctx: LiteralContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public NULL_LITERAL(): antlr.TerminalNode {
        return this.getToken(mappingParser.NULL_LITERAL, 0)!;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterNullLiteral) {
             listener.enterNullLiteral(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitNullLiteral) {
             listener.exitNullLiteral(this);
        }
    }
}
export class BooleanLiteralContext extends LiteralContext {
    public constructor(ctx: LiteralContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public BOOL(): antlr.TerminalNode {
        return this.getToken(mappingParser.BOOL, 0)!;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterBooleanLiteral) {
             listener.enterBooleanLiteral(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitBooleanLiteral) {
             listener.exitBooleanLiteral(this);
        }
    }
}
export class QuantityLiteralContext extends LiteralContext {
    public constructor(ctx: LiteralContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public fpQuantity(): FpQuantityContext {
        return this.getRuleContext(0, FpQuantityContext)!;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterQuantityLiteral) {
             listener.enterQuantityLiteral(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitQuantityLiteral) {
             listener.exitQuantityLiteral(this);
        }
    }
}
export class LongNumberLiteralContext extends LiteralContext {
    public constructor(ctx: LiteralContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public LONGNUMBER(): antlr.TerminalNode {
        return this.getToken(mappingParser.LONGNUMBER, 0)!;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterLongNumberLiteral) {
             listener.enterLongNumberLiteral(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitLongNumberLiteral) {
             listener.exitLongNumberLiteral(this);
        }
    }
}
export class NumberLiteralContext extends LiteralContext {
    public constructor(ctx: LiteralContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public INTEGER(): antlr.TerminalNode | null {
        return this.getToken(mappingParser.INTEGER, 0);
    }
    public DECIMAL(): antlr.TerminalNode | null {
        return this.getToken(mappingParser.DECIMAL, 0);
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterNumberLiteral) {
             listener.enterNumberLiteral(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitNumberLiteral) {
             listener.exitNumberLiteral(this);
        }
    }
}
export class DateLiteralContext extends LiteralContext {
    public constructor(ctx: LiteralContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public DATE(): antlr.TerminalNode {
        return this.getToken(mappingParser.DATE, 0)!;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterDateLiteral) {
             listener.enterDateLiteral(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitDateLiteral) {
             listener.exitDateLiteral(this);
        }
    }
}
export class DateTimeLiteralContext extends LiteralContext {
    public constructor(ctx: LiteralContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public DATETIME(): antlr.TerminalNode {
        return this.getToken(mappingParser.DATETIME, 0)!;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterDateTimeLiteral) {
             listener.enterDateTimeLiteral(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitDateTimeLiteral) {
             listener.exitDateTimeLiteral(this);
        }
    }
}
export class TimeLiteralContext extends LiteralContext {
    public constructor(ctx: LiteralContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public TIME(): antlr.TerminalNode {
        return this.getToken(mappingParser.TIME, 0)!;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterTimeLiteral) {
             listener.enterTimeLiteral(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitTimeLiteral) {
             listener.exitTimeLiteral(this);
        }
    }
}
export class StringLiteralContext extends LiteralContext {
    public constructor(ctx: LiteralContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(mappingParser.STRING, 0)!;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterStringLiteral) {
             listener.enterStringLiteral(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitStringLiteral) {
             listener.exitStringLiteral(this);
        }
    }
}
export class QuotedStringLiteralContext extends LiteralContext {
    public constructor(ctx: LiteralContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public DOUBLE_QUOTED_STRING(): antlr.TerminalNode {
        return this.getToken(mappingParser.DOUBLE_QUOTED_STRING, 0)!;
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterQuotedStringLiteral) {
             listener.enterQuotedStringLiteral(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitQuotedStringLiteral) {
             listener.exitQuotedStringLiteral(this);
        }
    }
}


export class FpQuantityContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return mappingParser.RULE_fpQuantity;
    }
    public override copyFrom(ctx: FpQuantityContext): void {
        super.copyFrom(ctx);
    }
}
export class QuantityWithDateContext extends FpQuantityContext {
    public constructor(ctx: FpQuantityContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public INTEGER(): antlr.TerminalNode | null {
        return this.getToken(mappingParser.INTEGER, 0);
    }
    public DECIMAL(): antlr.TerminalNode | null {
        return this.getToken(mappingParser.DECIMAL, 0);
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterQuantityWithDate) {
             listener.enterQuantityWithDate(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitQuantityWithDate) {
             listener.exitQuantityWithDate(this);
        }
    }
}
export class QuantityWithDatePluralContext extends FpQuantityContext {
    public constructor(ctx: FpQuantityContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public INTEGER(): antlr.TerminalNode | null {
        return this.getToken(mappingParser.INTEGER, 0);
    }
    public DECIMAL(): antlr.TerminalNode | null {
        return this.getToken(mappingParser.DECIMAL, 0);
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterQuantityWithDatePlural) {
             listener.enterQuantityWithDatePlural(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitQuantityWithDatePlural) {
             listener.exitQuantityWithDatePlural(this);
        }
    }
}
export class QuantityWithUcumContext extends FpQuantityContext {
    public constructor(ctx: FpQuantityContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public STRING(): antlr.TerminalNode {
        return this.getToken(mappingParser.STRING, 0)!;
    }
    public INTEGER(): antlr.TerminalNode | null {
        return this.getToken(mappingParser.INTEGER, 0);
    }
    public DECIMAL(): antlr.TerminalNode | null {
        return this.getToken(mappingParser.DECIMAL, 0);
    }
    public override enterRule(listener: mappingListener): void {
        if(listener.enterQuantityWithUcum) {
             listener.enterQuantityWithUcum(this);
        }
    }
    public override exitRule(listener: mappingListener): void {
        if(listener.exitQuantityWithUcum) {
             listener.exitQuantityWithUcum(this);
        }
    }
}
