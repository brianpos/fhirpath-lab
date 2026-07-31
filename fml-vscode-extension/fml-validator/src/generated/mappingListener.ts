
import { ErrorNode, ParseTreeListener, ParserRuleContext, TerminalNode } from "antlr4ng";


import { StructureMapContext } from "./mappingParser.js";
import { ConceptMapDeclarationContext } from "./mappingParser.js";
import { ConceptMapPrefixContext } from "./mappingParser.js";
import { ConceptMapCodeMapContext } from "./mappingParser.js";
import { ConceptMapSourceContext } from "./mappingParser.js";
import { ConceptMapTargetContext } from "./mappingParser.js";
import { CodeContext } from "./mappingParser.js";
import { MapDeclarationContext } from "./mappingParser.js";
import { MetadataDeclarationContext } from "./mappingParser.js";
import { MarkdownLiteralContext } from "./mappingParser.js";
import { UrlContext } from "./mappingParser.js";
import { IdentifierContext } from "./mappingParser.js";
import { StructureDeclarationContext } from "./mappingParser.js";
import { ConstantDeclarationContext } from "./mappingParser.js";
import { GroupDeclarationContext } from "./mappingParser.js";
import { ParametersContext } from "./mappingParser.js";
import { ParameterContext } from "./mappingParser.js";
import { MapRulesContext } from "./mappingParser.js";
import { TypeModeContext } from "./mappingParser.js";
import { ExtendsContext } from "./mappingParser.js";
import { TypeIdentifierContext } from "./mappingParser.js";
import { MapSimpleBatchIdentityContext } from "./mappingParser.js";
import { MapSimpleCopyContext } from "./mappingParser.js";
import { MapFhirMarkupContext } from "./mappingParser.js";
import { MapTransformationRuleContext } from "./mappingParser.js";
import { IdentityFieldListContext } from "./mappingParser.js";
import { RuleNameContext } from "./mappingParser.js";
import { RuleSourcesContext } from "./mappingParser.js";
import { RuleSourceContext } from "./mappingParser.js";
import { RuleTargetsContext } from "./mappingParser.js";
import { RuleTargetContext } from "./mappingParser.js";
import { SourceCardinalityContext } from "./mappingParser.js";
import { UpperBoundContext } from "./mappingParser.js";
import { QualifiedIdentifierContext } from "./mappingParser.js";
import { SourceDefaultContext } from "./mappingParser.js";
import { AliasContext } from "./mappingParser.js";
import { WhereClauseContext } from "./mappingParser.js";
import { CheckClauseContext } from "./mappingParser.js";
import { LogContext } from "./mappingParser.js";
import { DependentExpressionContext } from "./mappingParser.js";
import { ImportDeclarationContext } from "./mappingParser.js";
import { TransformContext } from "./mappingParser.js";
import { TransformInvocationContext } from "./mappingParser.js";
import { TransformParamListContext } from "./mappingParser.js";
import { TransformParamContext } from "./mappingParser.js";
import { TransformParamNameContext } from "./mappingParser.js";
import { TransformParamValueContext } from "./mappingParser.js";
import { GroupInvocationContext } from "./mappingParser.js";
import { GroupParamListContext } from "./mappingParser.js";
import { GroupParamContext } from "./mappingParser.js";
import { TermExpressionContext } from "./mappingParser.js";
import { PolarityExpressionContext } from "./mappingParser.js";
import { MultiplicativeExpressionContext } from "./mappingParser.js";
import { AdditiveExpressionContext } from "./mappingParser.js";
import { UnionExpressionContext } from "./mappingParser.js";
import { InequalityExpressionContext } from "./mappingParser.js";
import { EqualityExpressionContext } from "./mappingParser.js";
import { MembershipExpressionContext } from "./mappingParser.js";
import { AndExpressionContext } from "./mappingParser.js";
import { OrExpressionContext } from "./mappingParser.js";
import { ImpliesExpressionContext } from "./mappingParser.js";
import { InvocationExpressionContext } from "./mappingParser.js";
import { IndexerExpressionContext } from "./mappingParser.js";
import { TypeExpressionContext } from "./mappingParser.js";
import { InvocationTermContext } from "./mappingParser.js";
import { LiteralTermContext } from "./mappingParser.js";
import { ExternalConstantTermContext } from "./mappingParser.js";
import { ParenthesizedTermContext } from "./mappingParser.js";
import { FunctionInvocationContext } from "./mappingParser.js";
import { MemberInvocationContext } from "./mappingParser.js";
import { ThisInvocationContext } from "./mappingParser.js";
import { IndexInvocationContext } from "./mappingParser.js";
import { TotalInvocationContext } from "./mappingParser.js";
import { FpExternalConstantContext } from "./mappingParser.js";
import { FpFunctionContext } from "./mappingParser.js";
import { SortDirectionArgumentContext } from "./mappingParser.js";
import { FpParamListContext } from "./mappingParser.js";
import { FpTypeSpecifierContext } from "./mappingParser.js";
import { ConstantContext } from "./mappingParser.js";
import { SourceListModeContext } from "./mappingParser.js";
import { TargetListModeContext } from "./mappingParser.js";
import { GroupTypeModeContext } from "./mappingParser.js";
import { ModelModeContext } from "./mappingParser.js";
import { ParameterModeContext } from "./mappingParser.js";
import { NullLiteralContext } from "./mappingParser.js";
import { BooleanLiteralContext } from "./mappingParser.js";
import { QuantityLiteralContext } from "./mappingParser.js";
import { LongNumberLiteralContext } from "./mappingParser.js";
import { NumberLiteralContext } from "./mappingParser.js";
import { DateLiteralContext } from "./mappingParser.js";
import { DateTimeLiteralContext } from "./mappingParser.js";
import { TimeLiteralContext } from "./mappingParser.js";
import { StringLiteralContext } from "./mappingParser.js";
import { QuotedStringLiteralContext } from "./mappingParser.js";
import { QuantityWithDateContext } from "./mappingParser.js";
import { QuantityWithDatePluralContext } from "./mappingParser.js";
import { QuantityWithUcumContext } from "./mappingParser.js";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `mappingParser`.
 */
export class mappingListener implements ParseTreeListener {
    /**
     * Enter a parse tree produced by `mappingParser.structureMap`.
     * @param ctx the parse tree
     */
    enterStructureMap?: (ctx: StructureMapContext) => void;
    /**
     * Exit a parse tree produced by `mappingParser.structureMap`.
     * @param ctx the parse tree
     */
    exitStructureMap?: (ctx: StructureMapContext) => void;
    /**
     * Enter a parse tree produced by `mappingParser.conceptMapDeclaration`.
     * @param ctx the parse tree
     */
    enterConceptMapDeclaration?: (ctx: ConceptMapDeclarationContext) => void;
    /**
     * Exit a parse tree produced by `mappingParser.conceptMapDeclaration`.
     * @param ctx the parse tree
     */
    exitConceptMapDeclaration?: (ctx: ConceptMapDeclarationContext) => void;
    /**
     * Enter a parse tree produced by `mappingParser.conceptMapPrefix`.
     * @param ctx the parse tree
     */
    enterConceptMapPrefix?: (ctx: ConceptMapPrefixContext) => void;
    /**
     * Exit a parse tree produced by `mappingParser.conceptMapPrefix`.
     * @param ctx the parse tree
     */
    exitConceptMapPrefix?: (ctx: ConceptMapPrefixContext) => void;
    /**
     * Enter a parse tree produced by `mappingParser.conceptMapCodeMap`.
     * @param ctx the parse tree
     */
    enterConceptMapCodeMap?: (ctx: ConceptMapCodeMapContext) => void;
    /**
     * Exit a parse tree produced by `mappingParser.conceptMapCodeMap`.
     * @param ctx the parse tree
     */
    exitConceptMapCodeMap?: (ctx: ConceptMapCodeMapContext) => void;
    /**
     * Enter a parse tree produced by `mappingParser.conceptMapSource`.
     * @param ctx the parse tree
     */
    enterConceptMapSource?: (ctx: ConceptMapSourceContext) => void;
    /**
     * Exit a parse tree produced by `mappingParser.conceptMapSource`.
     * @param ctx the parse tree
     */
    exitConceptMapSource?: (ctx: ConceptMapSourceContext) => void;
    /**
     * Enter a parse tree produced by `mappingParser.conceptMapTarget`.
     * @param ctx the parse tree
     */
    enterConceptMapTarget?: (ctx: ConceptMapTargetContext) => void;
    /**
     * Exit a parse tree produced by `mappingParser.conceptMapTarget`.
     * @param ctx the parse tree
     */
    exitConceptMapTarget?: (ctx: ConceptMapTargetContext) => void;
    /**
     * Enter a parse tree produced by `mappingParser.code`.
     * @param ctx the parse tree
     */
    enterCode?: (ctx: CodeContext) => void;
    /**
     * Exit a parse tree produced by `mappingParser.code`.
     * @param ctx the parse tree
     */
    exitCode?: (ctx: CodeContext) => void;
    /**
     * Enter a parse tree produced by `mappingParser.mapDeclaration`.
     * @param ctx the parse tree
     */
    enterMapDeclaration?: (ctx: MapDeclarationContext) => void;
    /**
     * Exit a parse tree produced by `mappingParser.mapDeclaration`.
     * @param ctx the parse tree
     */
    exitMapDeclaration?: (ctx: MapDeclarationContext) => void;
    /**
     * Enter a parse tree produced by `mappingParser.metadataDeclaration`.
     * @param ctx the parse tree
     */
    enterMetadataDeclaration?: (ctx: MetadataDeclarationContext) => void;
    /**
     * Exit a parse tree produced by `mappingParser.metadataDeclaration`.
     * @param ctx the parse tree
     */
    exitMetadataDeclaration?: (ctx: MetadataDeclarationContext) => void;
    /**
     * Enter a parse tree produced by `mappingParser.markdownLiteral`.
     * @param ctx the parse tree
     */
    enterMarkdownLiteral?: (ctx: MarkdownLiteralContext) => void;
    /**
     * Exit a parse tree produced by `mappingParser.markdownLiteral`.
     * @param ctx the parse tree
     */
    exitMarkdownLiteral?: (ctx: MarkdownLiteralContext) => void;
    /**
     * Enter a parse tree produced by `mappingParser.url`.
     * @param ctx the parse tree
     */
    enterUrl?: (ctx: UrlContext) => void;
    /**
     * Exit a parse tree produced by `mappingParser.url`.
     * @param ctx the parse tree
     */
    exitUrl?: (ctx: UrlContext) => void;
    /**
     * Enter a parse tree produced by `mappingParser.identifier`.
     * @param ctx the parse tree
     */
    enterIdentifier?: (ctx: IdentifierContext) => void;
    /**
     * Exit a parse tree produced by `mappingParser.identifier`.
     * @param ctx the parse tree
     */
    exitIdentifier?: (ctx: IdentifierContext) => void;
    /**
     * Enter a parse tree produced by `mappingParser.structureDeclaration`.
     * @param ctx the parse tree
     */
    enterStructureDeclaration?: (ctx: StructureDeclarationContext) => void;
    /**
     * Exit a parse tree produced by `mappingParser.structureDeclaration`.
     * @param ctx the parse tree
     */
    exitStructureDeclaration?: (ctx: StructureDeclarationContext) => void;
    /**
     * Enter a parse tree produced by `mappingParser.constantDeclaration`.
     * @param ctx the parse tree
     */
    enterConstantDeclaration?: (ctx: ConstantDeclarationContext) => void;
    /**
     * Exit a parse tree produced by `mappingParser.constantDeclaration`.
     * @param ctx the parse tree
     */
    exitConstantDeclaration?: (ctx: ConstantDeclarationContext) => void;
    /**
     * Enter a parse tree produced by `mappingParser.groupDeclaration`.
     * @param ctx the parse tree
     */
    enterGroupDeclaration?: (ctx: GroupDeclarationContext) => void;
    /**
     * Exit a parse tree produced by `mappingParser.groupDeclaration`.
     * @param ctx the parse tree
     */
    exitGroupDeclaration?: (ctx: GroupDeclarationContext) => void;
    /**
     * Enter a parse tree produced by `mappingParser.parameters`.
     * @param ctx the parse tree
     */
    enterParameters?: (ctx: ParametersContext) => void;
    /**
     * Exit a parse tree produced by `mappingParser.parameters`.
     * @param ctx the parse tree
     */
    exitParameters?: (ctx: ParametersContext) => void;
    /**
     * Enter a parse tree produced by `mappingParser.parameter`.
     * @param ctx the parse tree
     */
    enterParameter?: (ctx: ParameterContext) => void;
    /**
     * Exit a parse tree produced by `mappingParser.parameter`.
     * @param ctx the parse tree
     */
    exitParameter?: (ctx: ParameterContext) => void;
    /**
     * Enter a parse tree produced by `mappingParser.mapRules`.
     * @param ctx the parse tree
     */
    enterMapRules?: (ctx: MapRulesContext) => void;
    /**
     * Exit a parse tree produced by `mappingParser.mapRules`.
     * @param ctx the parse tree
     */
    exitMapRules?: (ctx: MapRulesContext) => void;
    /**
     * Enter a parse tree produced by `mappingParser.typeMode`.
     * @param ctx the parse tree
     */
    enterTypeMode?: (ctx: TypeModeContext) => void;
    /**
     * Exit a parse tree produced by `mappingParser.typeMode`.
     * @param ctx the parse tree
     */
    exitTypeMode?: (ctx: TypeModeContext) => void;
    /**
     * Enter a parse tree produced by `mappingParser.extends`.
     * @param ctx the parse tree
     */
    enterExtends?: (ctx: ExtendsContext) => void;
    /**
     * Exit a parse tree produced by `mappingParser.extends`.
     * @param ctx the parse tree
     */
    exitExtends?: (ctx: ExtendsContext) => void;
    /**
     * Enter a parse tree produced by `mappingParser.typeIdentifier`.
     * @param ctx the parse tree
     */
    enterTypeIdentifier?: (ctx: TypeIdentifierContext) => void;
    /**
     * Exit a parse tree produced by `mappingParser.typeIdentifier`.
     * @param ctx the parse tree
     */
    exitTypeIdentifier?: (ctx: TypeIdentifierContext) => void;
    /**
     * Enter a parse tree produced by the `mapSimpleBatchIdentity`
     * labeled alternative in `mappingParser.mapRule`.
     * @param ctx the parse tree
     */
    enterMapSimpleBatchIdentity?: (ctx: MapSimpleBatchIdentityContext) => void;
    /**
     * Exit a parse tree produced by the `mapSimpleBatchIdentity`
     * labeled alternative in `mappingParser.mapRule`.
     * @param ctx the parse tree
     */
    exitMapSimpleBatchIdentity?: (ctx: MapSimpleBatchIdentityContext) => void;
    /**
     * Enter a parse tree produced by the `mapSimpleCopy`
     * labeled alternative in `mappingParser.mapRule`.
     * @param ctx the parse tree
     */
    enterMapSimpleCopy?: (ctx: MapSimpleCopyContext) => void;
    /**
     * Exit a parse tree produced by the `mapSimpleCopy`
     * labeled alternative in `mappingParser.mapRule`.
     * @param ctx the parse tree
     */
    exitMapSimpleCopy?: (ctx: MapSimpleCopyContext) => void;
    /**
     * Enter a parse tree produced by the `mapFhirMarkup`
     * labeled alternative in `mappingParser.mapRule`.
     * @param ctx the parse tree
     */
    enterMapFhirMarkup?: (ctx: MapFhirMarkupContext) => void;
    /**
     * Exit a parse tree produced by the `mapFhirMarkup`
     * labeled alternative in `mappingParser.mapRule`.
     * @param ctx the parse tree
     */
    exitMapFhirMarkup?: (ctx: MapFhirMarkupContext) => void;
    /**
     * Enter a parse tree produced by `mappingParser.mapTransformationRule`.
     * @param ctx the parse tree
     */
    enterMapTransformationRule?: (ctx: MapTransformationRuleContext) => void;
    /**
     * Exit a parse tree produced by `mappingParser.mapTransformationRule`.
     * @param ctx the parse tree
     */
    exitMapTransformationRule?: (ctx: MapTransformationRuleContext) => void;
    /**
     * Enter a parse tree produced by `mappingParser.identityFieldList`.
     * @param ctx the parse tree
     */
    enterIdentityFieldList?: (ctx: IdentityFieldListContext) => void;
    /**
     * Exit a parse tree produced by `mappingParser.identityFieldList`.
     * @param ctx the parse tree
     */
    exitIdentityFieldList?: (ctx: IdentityFieldListContext) => void;
    /**
     * Enter a parse tree produced by `mappingParser.ruleName`.
     * @param ctx the parse tree
     */
    enterRuleName?: (ctx: RuleNameContext) => void;
    /**
     * Exit a parse tree produced by `mappingParser.ruleName`.
     * @param ctx the parse tree
     */
    exitRuleName?: (ctx: RuleNameContext) => void;
    /**
     * Enter a parse tree produced by `mappingParser.ruleSources`.
     * @param ctx the parse tree
     */
    enterRuleSources?: (ctx: RuleSourcesContext) => void;
    /**
     * Exit a parse tree produced by `mappingParser.ruleSources`.
     * @param ctx the parse tree
     */
    exitRuleSources?: (ctx: RuleSourcesContext) => void;
    /**
     * Enter a parse tree produced by `mappingParser.ruleSource`.
     * @param ctx the parse tree
     */
    enterRuleSource?: (ctx: RuleSourceContext) => void;
    /**
     * Exit a parse tree produced by `mappingParser.ruleSource`.
     * @param ctx the parse tree
     */
    exitRuleSource?: (ctx: RuleSourceContext) => void;
    /**
     * Enter a parse tree produced by `mappingParser.ruleTargets`.
     * @param ctx the parse tree
     */
    enterRuleTargets?: (ctx: RuleTargetsContext) => void;
    /**
     * Exit a parse tree produced by `mappingParser.ruleTargets`.
     * @param ctx the parse tree
     */
    exitRuleTargets?: (ctx: RuleTargetsContext) => void;
    /**
     * Enter a parse tree produced by `mappingParser.ruleTarget`.
     * @param ctx the parse tree
     */
    enterRuleTarget?: (ctx: RuleTargetContext) => void;
    /**
     * Exit a parse tree produced by `mappingParser.ruleTarget`.
     * @param ctx the parse tree
     */
    exitRuleTarget?: (ctx: RuleTargetContext) => void;
    /**
     * Enter a parse tree produced by `mappingParser.sourceCardinality`.
     * @param ctx the parse tree
     */
    enterSourceCardinality?: (ctx: SourceCardinalityContext) => void;
    /**
     * Exit a parse tree produced by `mappingParser.sourceCardinality`.
     * @param ctx the parse tree
     */
    exitSourceCardinality?: (ctx: SourceCardinalityContext) => void;
    /**
     * Enter a parse tree produced by `mappingParser.upperBound`.
     * @param ctx the parse tree
     */
    enterUpperBound?: (ctx: UpperBoundContext) => void;
    /**
     * Exit a parse tree produced by `mappingParser.upperBound`.
     * @param ctx the parse tree
     */
    exitUpperBound?: (ctx: UpperBoundContext) => void;
    /**
     * Enter a parse tree produced by `mappingParser.qualifiedIdentifier`.
     * @param ctx the parse tree
     */
    enterQualifiedIdentifier?: (ctx: QualifiedIdentifierContext) => void;
    /**
     * Exit a parse tree produced by `mappingParser.qualifiedIdentifier`.
     * @param ctx the parse tree
     */
    exitQualifiedIdentifier?: (ctx: QualifiedIdentifierContext) => void;
    /**
     * Enter a parse tree produced by `mappingParser.sourceDefault`.
     * @param ctx the parse tree
     */
    enterSourceDefault?: (ctx: SourceDefaultContext) => void;
    /**
     * Exit a parse tree produced by `mappingParser.sourceDefault`.
     * @param ctx the parse tree
     */
    exitSourceDefault?: (ctx: SourceDefaultContext) => void;
    /**
     * Enter a parse tree produced by `mappingParser.alias`.
     * @param ctx the parse tree
     */
    enterAlias?: (ctx: AliasContext) => void;
    /**
     * Exit a parse tree produced by `mappingParser.alias`.
     * @param ctx the parse tree
     */
    exitAlias?: (ctx: AliasContext) => void;
    /**
     * Enter a parse tree produced by `mappingParser.whereClause`.
     * @param ctx the parse tree
     */
    enterWhereClause?: (ctx: WhereClauseContext) => void;
    /**
     * Exit a parse tree produced by `mappingParser.whereClause`.
     * @param ctx the parse tree
     */
    exitWhereClause?: (ctx: WhereClauseContext) => void;
    /**
     * Enter a parse tree produced by `mappingParser.checkClause`.
     * @param ctx the parse tree
     */
    enterCheckClause?: (ctx: CheckClauseContext) => void;
    /**
     * Exit a parse tree produced by `mappingParser.checkClause`.
     * @param ctx the parse tree
     */
    exitCheckClause?: (ctx: CheckClauseContext) => void;
    /**
     * Enter a parse tree produced by `mappingParser.log`.
     * @param ctx the parse tree
     */
    enterLog?: (ctx: LogContext) => void;
    /**
     * Exit a parse tree produced by `mappingParser.log`.
     * @param ctx the parse tree
     */
    exitLog?: (ctx: LogContext) => void;
    /**
     * Enter a parse tree produced by `mappingParser.dependentExpression`.
     * @param ctx the parse tree
     */
    enterDependentExpression?: (ctx: DependentExpressionContext) => void;
    /**
     * Exit a parse tree produced by `mappingParser.dependentExpression`.
     * @param ctx the parse tree
     */
    exitDependentExpression?: (ctx: DependentExpressionContext) => void;
    /**
     * Enter a parse tree produced by `mappingParser.importDeclaration`.
     * @param ctx the parse tree
     */
    enterImportDeclaration?: (ctx: ImportDeclarationContext) => void;
    /**
     * Exit a parse tree produced by `mappingParser.importDeclaration`.
     * @param ctx the parse tree
     */
    exitImportDeclaration?: (ctx: ImportDeclarationContext) => void;
    /**
     * Enter a parse tree produced by `mappingParser.transform`.
     * @param ctx the parse tree
     */
    enterTransform?: (ctx: TransformContext) => void;
    /**
     * Exit a parse tree produced by `mappingParser.transform`.
     * @param ctx the parse tree
     */
    exitTransform?: (ctx: TransformContext) => void;
    /**
     * Enter a parse tree produced by `mappingParser.transformInvocation`.
     * @param ctx the parse tree
     */
    enterTransformInvocation?: (ctx: TransformInvocationContext) => void;
    /**
     * Exit a parse tree produced by `mappingParser.transformInvocation`.
     * @param ctx the parse tree
     */
    exitTransformInvocation?: (ctx: TransformInvocationContext) => void;
    /**
     * Enter a parse tree produced by `mappingParser.transformParamList`.
     * @param ctx the parse tree
     */
    enterTransformParamList?: (ctx: TransformParamListContext) => void;
    /**
     * Exit a parse tree produced by `mappingParser.transformParamList`.
     * @param ctx the parse tree
     */
    exitTransformParamList?: (ctx: TransformParamListContext) => void;
    /**
     * Enter a parse tree produced by `mappingParser.transformParam`.
     * @param ctx the parse tree
     */
    enterTransformParam?: (ctx: TransformParamContext) => void;
    /**
     * Exit a parse tree produced by `mappingParser.transformParam`.
     * @param ctx the parse tree
     */
    exitTransformParam?: (ctx: TransformParamContext) => void;
    /**
     * Enter a parse tree produced by `mappingParser.transformParamName`.
     * @param ctx the parse tree
     */
    enterTransformParamName?: (ctx: TransformParamNameContext) => void;
    /**
     * Exit a parse tree produced by `mappingParser.transformParamName`.
     * @param ctx the parse tree
     */
    exitTransformParamName?: (ctx: TransformParamNameContext) => void;
    /**
     * Enter a parse tree produced by `mappingParser.transformParamValue`.
     * @param ctx the parse tree
     */
    enterTransformParamValue?: (ctx: TransformParamValueContext) => void;
    /**
     * Exit a parse tree produced by `mappingParser.transformParamValue`.
     * @param ctx the parse tree
     */
    exitTransformParamValue?: (ctx: TransformParamValueContext) => void;
    /**
     * Enter a parse tree produced by `mappingParser.groupInvocation`.
     * @param ctx the parse tree
     */
    enterGroupInvocation?: (ctx: GroupInvocationContext) => void;
    /**
     * Exit a parse tree produced by `mappingParser.groupInvocation`.
     * @param ctx the parse tree
     */
    exitGroupInvocation?: (ctx: GroupInvocationContext) => void;
    /**
     * Enter a parse tree produced by `mappingParser.groupParamList`.
     * @param ctx the parse tree
     */
    enterGroupParamList?: (ctx: GroupParamListContext) => void;
    /**
     * Exit a parse tree produced by `mappingParser.groupParamList`.
     * @param ctx the parse tree
     */
    exitGroupParamList?: (ctx: GroupParamListContext) => void;
    /**
     * Enter a parse tree produced by `mappingParser.groupParam`.
     * @param ctx the parse tree
     */
    enterGroupParam?: (ctx: GroupParamContext) => void;
    /**
     * Exit a parse tree produced by `mappingParser.groupParam`.
     * @param ctx the parse tree
     */
    exitGroupParam?: (ctx: GroupParamContext) => void;
    /**
     * Enter a parse tree produced by the `termExpression`
     * labeled alternative in `mappingParser.fpExpression`.
     * @param ctx the parse tree
     */
    enterTermExpression?: (ctx: TermExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `termExpression`
     * labeled alternative in `mappingParser.fpExpression`.
     * @param ctx the parse tree
     */
    exitTermExpression?: (ctx: TermExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `polarityExpression`
     * labeled alternative in `mappingParser.fpExpression`.
     * @param ctx the parse tree
     */
    enterPolarityExpression?: (ctx: PolarityExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `polarityExpression`
     * labeled alternative in `mappingParser.fpExpression`.
     * @param ctx the parse tree
     */
    exitPolarityExpression?: (ctx: PolarityExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `multiplicativeExpression`
     * labeled alternative in `mappingParser.fpExpression`.
     * @param ctx the parse tree
     */
    enterMultiplicativeExpression?: (ctx: MultiplicativeExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `multiplicativeExpression`
     * labeled alternative in `mappingParser.fpExpression`.
     * @param ctx the parse tree
     */
    exitMultiplicativeExpression?: (ctx: MultiplicativeExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `additiveExpression`
     * labeled alternative in `mappingParser.fpExpression`.
     * @param ctx the parse tree
     */
    enterAdditiveExpression?: (ctx: AdditiveExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `additiveExpression`
     * labeled alternative in `mappingParser.fpExpression`.
     * @param ctx the parse tree
     */
    exitAdditiveExpression?: (ctx: AdditiveExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `unionExpression`
     * labeled alternative in `mappingParser.fpExpression`.
     * @param ctx the parse tree
     */
    enterUnionExpression?: (ctx: UnionExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `unionExpression`
     * labeled alternative in `mappingParser.fpExpression`.
     * @param ctx the parse tree
     */
    exitUnionExpression?: (ctx: UnionExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `inequalityExpression`
     * labeled alternative in `mappingParser.fpExpression`.
     * @param ctx the parse tree
     */
    enterInequalityExpression?: (ctx: InequalityExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `inequalityExpression`
     * labeled alternative in `mappingParser.fpExpression`.
     * @param ctx the parse tree
     */
    exitInequalityExpression?: (ctx: InequalityExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `equalityExpression`
     * labeled alternative in `mappingParser.fpExpression`.
     * @param ctx the parse tree
     */
    enterEqualityExpression?: (ctx: EqualityExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `equalityExpression`
     * labeled alternative in `mappingParser.fpExpression`.
     * @param ctx the parse tree
     */
    exitEqualityExpression?: (ctx: EqualityExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `membershipExpression`
     * labeled alternative in `mappingParser.fpExpression`.
     * @param ctx the parse tree
     */
    enterMembershipExpression?: (ctx: MembershipExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `membershipExpression`
     * labeled alternative in `mappingParser.fpExpression`.
     * @param ctx the parse tree
     */
    exitMembershipExpression?: (ctx: MembershipExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `andExpression`
     * labeled alternative in `mappingParser.fpExpression`.
     * @param ctx the parse tree
     */
    enterAndExpression?: (ctx: AndExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `andExpression`
     * labeled alternative in `mappingParser.fpExpression`.
     * @param ctx the parse tree
     */
    exitAndExpression?: (ctx: AndExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `orExpression`
     * labeled alternative in `mappingParser.fpExpression`.
     * @param ctx the parse tree
     */
    enterOrExpression?: (ctx: OrExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `orExpression`
     * labeled alternative in `mappingParser.fpExpression`.
     * @param ctx the parse tree
     */
    exitOrExpression?: (ctx: OrExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `impliesExpression`
     * labeled alternative in `mappingParser.fpExpression`.
     * @param ctx the parse tree
     */
    enterImpliesExpression?: (ctx: ImpliesExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `impliesExpression`
     * labeled alternative in `mappingParser.fpExpression`.
     * @param ctx the parse tree
     */
    exitImpliesExpression?: (ctx: ImpliesExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `invocationExpression`
     * labeled alternative in `mappingParser.fpExpression`.
     * @param ctx the parse tree
     */
    enterInvocationExpression?: (ctx: InvocationExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `invocationExpression`
     * labeled alternative in `mappingParser.fpExpression`.
     * @param ctx the parse tree
     */
    exitInvocationExpression?: (ctx: InvocationExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `indexerExpression`
     * labeled alternative in `mappingParser.fpExpression`.
     * @param ctx the parse tree
     */
    enterIndexerExpression?: (ctx: IndexerExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `indexerExpression`
     * labeled alternative in `mappingParser.fpExpression`.
     * @param ctx the parse tree
     */
    exitIndexerExpression?: (ctx: IndexerExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `typeExpression`
     * labeled alternative in `mappingParser.fpExpression`.
     * @param ctx the parse tree
     */
    enterTypeExpression?: (ctx: TypeExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `typeExpression`
     * labeled alternative in `mappingParser.fpExpression`.
     * @param ctx the parse tree
     */
    exitTypeExpression?: (ctx: TypeExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `invocationTerm`
     * labeled alternative in `mappingParser.fpTerm`.
     * @param ctx the parse tree
     */
    enterInvocationTerm?: (ctx: InvocationTermContext) => void;
    /**
     * Exit a parse tree produced by the `invocationTerm`
     * labeled alternative in `mappingParser.fpTerm`.
     * @param ctx the parse tree
     */
    exitInvocationTerm?: (ctx: InvocationTermContext) => void;
    /**
     * Enter a parse tree produced by the `literalTerm`
     * labeled alternative in `mappingParser.fpTerm`.
     * @param ctx the parse tree
     */
    enterLiteralTerm?: (ctx: LiteralTermContext) => void;
    /**
     * Exit a parse tree produced by the `literalTerm`
     * labeled alternative in `mappingParser.fpTerm`.
     * @param ctx the parse tree
     */
    exitLiteralTerm?: (ctx: LiteralTermContext) => void;
    /**
     * Enter a parse tree produced by the `externalConstantTerm`
     * labeled alternative in `mappingParser.fpTerm`.
     * @param ctx the parse tree
     */
    enterExternalConstantTerm?: (ctx: ExternalConstantTermContext) => void;
    /**
     * Exit a parse tree produced by the `externalConstantTerm`
     * labeled alternative in `mappingParser.fpTerm`.
     * @param ctx the parse tree
     */
    exitExternalConstantTerm?: (ctx: ExternalConstantTermContext) => void;
    /**
     * Enter a parse tree produced by the `parenthesizedTerm`
     * labeled alternative in `mappingParser.fpTerm`.
     * @param ctx the parse tree
     */
    enterParenthesizedTerm?: (ctx: ParenthesizedTermContext) => void;
    /**
     * Exit a parse tree produced by the `parenthesizedTerm`
     * labeled alternative in `mappingParser.fpTerm`.
     * @param ctx the parse tree
     */
    exitParenthesizedTerm?: (ctx: ParenthesizedTermContext) => void;
    /**
     * Enter a parse tree produced by the `functionInvocation`
     * labeled alternative in `mappingParser.fpInvocation`.
     * @param ctx the parse tree
     */
    enterFunctionInvocation?: (ctx: FunctionInvocationContext) => void;
    /**
     * Exit a parse tree produced by the `functionInvocation`
     * labeled alternative in `mappingParser.fpInvocation`.
     * @param ctx the parse tree
     */
    exitFunctionInvocation?: (ctx: FunctionInvocationContext) => void;
    /**
     * Enter a parse tree produced by the `memberInvocation`
     * labeled alternative in `mappingParser.fpInvocation`.
     * @param ctx the parse tree
     */
    enterMemberInvocation?: (ctx: MemberInvocationContext) => void;
    /**
     * Exit a parse tree produced by the `memberInvocation`
     * labeled alternative in `mappingParser.fpInvocation`.
     * @param ctx the parse tree
     */
    exitMemberInvocation?: (ctx: MemberInvocationContext) => void;
    /**
     * Enter a parse tree produced by the `thisInvocation`
     * labeled alternative in `mappingParser.fpInvocation`.
     * @param ctx the parse tree
     */
    enterThisInvocation?: (ctx: ThisInvocationContext) => void;
    /**
     * Exit a parse tree produced by the `thisInvocation`
     * labeled alternative in `mappingParser.fpInvocation`.
     * @param ctx the parse tree
     */
    exitThisInvocation?: (ctx: ThisInvocationContext) => void;
    /**
     * Enter a parse tree produced by the `indexInvocation`
     * labeled alternative in `mappingParser.fpInvocation`.
     * @param ctx the parse tree
     */
    enterIndexInvocation?: (ctx: IndexInvocationContext) => void;
    /**
     * Exit a parse tree produced by the `indexInvocation`
     * labeled alternative in `mappingParser.fpInvocation`.
     * @param ctx the parse tree
     */
    exitIndexInvocation?: (ctx: IndexInvocationContext) => void;
    /**
     * Enter a parse tree produced by the `totalInvocation`
     * labeled alternative in `mappingParser.fpInvocation`.
     * @param ctx the parse tree
     */
    enterTotalInvocation?: (ctx: TotalInvocationContext) => void;
    /**
     * Exit a parse tree produced by the `totalInvocation`
     * labeled alternative in `mappingParser.fpInvocation`.
     * @param ctx the parse tree
     */
    exitTotalInvocation?: (ctx: TotalInvocationContext) => void;
    /**
     * Enter a parse tree produced by `mappingParser.fpExternalConstant`.
     * @param ctx the parse tree
     */
    enterFpExternalConstant?: (ctx: FpExternalConstantContext) => void;
    /**
     * Exit a parse tree produced by `mappingParser.fpExternalConstant`.
     * @param ctx the parse tree
     */
    exitFpExternalConstant?: (ctx: FpExternalConstantContext) => void;
    /**
     * Enter a parse tree produced by `mappingParser.fpFunction`.
     * @param ctx the parse tree
     */
    enterFpFunction?: (ctx: FpFunctionContext) => void;
    /**
     * Exit a parse tree produced by `mappingParser.fpFunction`.
     * @param ctx the parse tree
     */
    exitFpFunction?: (ctx: FpFunctionContext) => void;
    /**
     * Enter a parse tree produced by the `sortDirectionArgument`
     * labeled alternative in `mappingParser.fpSortArgument`.
     * @param ctx the parse tree
     */
    enterSortDirectionArgument?: (ctx: SortDirectionArgumentContext) => void;
    /**
     * Exit a parse tree produced by the `sortDirectionArgument`
     * labeled alternative in `mappingParser.fpSortArgument`.
     * @param ctx the parse tree
     */
    exitSortDirectionArgument?: (ctx: SortDirectionArgumentContext) => void;
    /**
     * Enter a parse tree produced by `mappingParser.fpParamList`.
     * @param ctx the parse tree
     */
    enterFpParamList?: (ctx: FpParamListContext) => void;
    /**
     * Exit a parse tree produced by `mappingParser.fpParamList`.
     * @param ctx the parse tree
     */
    exitFpParamList?: (ctx: FpParamListContext) => void;
    /**
     * Enter a parse tree produced by `mappingParser.fpTypeSpecifier`.
     * @param ctx the parse tree
     */
    enterFpTypeSpecifier?: (ctx: FpTypeSpecifierContext) => void;
    /**
     * Exit a parse tree produced by `mappingParser.fpTypeSpecifier`.
     * @param ctx the parse tree
     */
    exitFpTypeSpecifier?: (ctx: FpTypeSpecifierContext) => void;
    /**
     * Enter a parse tree produced by `mappingParser.constant`.
     * @param ctx the parse tree
     */
    enterConstant?: (ctx: ConstantContext) => void;
    /**
     * Exit a parse tree produced by `mappingParser.constant`.
     * @param ctx the parse tree
     */
    exitConstant?: (ctx: ConstantContext) => void;
    /**
     * Enter a parse tree produced by `mappingParser.sourceListMode`.
     * @param ctx the parse tree
     */
    enterSourceListMode?: (ctx: SourceListModeContext) => void;
    /**
     * Exit a parse tree produced by `mappingParser.sourceListMode`.
     * @param ctx the parse tree
     */
    exitSourceListMode?: (ctx: SourceListModeContext) => void;
    /**
     * Enter a parse tree produced by `mappingParser.targetListMode`.
     * @param ctx the parse tree
     */
    enterTargetListMode?: (ctx: TargetListModeContext) => void;
    /**
     * Exit a parse tree produced by `mappingParser.targetListMode`.
     * @param ctx the parse tree
     */
    exitTargetListMode?: (ctx: TargetListModeContext) => void;
    /**
     * Enter a parse tree produced by `mappingParser.groupTypeMode`.
     * @param ctx the parse tree
     */
    enterGroupTypeMode?: (ctx: GroupTypeModeContext) => void;
    /**
     * Exit a parse tree produced by `mappingParser.groupTypeMode`.
     * @param ctx the parse tree
     */
    exitGroupTypeMode?: (ctx: GroupTypeModeContext) => void;
    /**
     * Enter a parse tree produced by `mappingParser.modelMode`.
     * @param ctx the parse tree
     */
    enterModelMode?: (ctx: ModelModeContext) => void;
    /**
     * Exit a parse tree produced by `mappingParser.modelMode`.
     * @param ctx the parse tree
     */
    exitModelMode?: (ctx: ModelModeContext) => void;
    /**
     * Enter a parse tree produced by `mappingParser.parameterMode`.
     * @param ctx the parse tree
     */
    enterParameterMode?: (ctx: ParameterModeContext) => void;
    /**
     * Exit a parse tree produced by `mappingParser.parameterMode`.
     * @param ctx the parse tree
     */
    exitParameterMode?: (ctx: ParameterModeContext) => void;
    /**
     * Enter a parse tree produced by the `nullLiteral`
     * labeled alternative in `mappingParser.literal`.
     * @param ctx the parse tree
     */
    enterNullLiteral?: (ctx: NullLiteralContext) => void;
    /**
     * Exit a parse tree produced by the `nullLiteral`
     * labeled alternative in `mappingParser.literal`.
     * @param ctx the parse tree
     */
    exitNullLiteral?: (ctx: NullLiteralContext) => void;
    /**
     * Enter a parse tree produced by the `booleanLiteral`
     * labeled alternative in `mappingParser.literal`.
     * @param ctx the parse tree
     */
    enterBooleanLiteral?: (ctx: BooleanLiteralContext) => void;
    /**
     * Exit a parse tree produced by the `booleanLiteral`
     * labeled alternative in `mappingParser.literal`.
     * @param ctx the parse tree
     */
    exitBooleanLiteral?: (ctx: BooleanLiteralContext) => void;
    /**
     * Enter a parse tree produced by the `quantityLiteral`
     * labeled alternative in `mappingParser.literal`.
     * @param ctx the parse tree
     */
    enterQuantityLiteral?: (ctx: QuantityLiteralContext) => void;
    /**
     * Exit a parse tree produced by the `quantityLiteral`
     * labeled alternative in `mappingParser.literal`.
     * @param ctx the parse tree
     */
    exitQuantityLiteral?: (ctx: QuantityLiteralContext) => void;
    /**
     * Enter a parse tree produced by the `longNumberLiteral`
     * labeled alternative in `mappingParser.literal`.
     * @param ctx the parse tree
     */
    enterLongNumberLiteral?: (ctx: LongNumberLiteralContext) => void;
    /**
     * Exit a parse tree produced by the `longNumberLiteral`
     * labeled alternative in `mappingParser.literal`.
     * @param ctx the parse tree
     */
    exitLongNumberLiteral?: (ctx: LongNumberLiteralContext) => void;
    /**
     * Enter a parse tree produced by the `numberLiteral`
     * labeled alternative in `mappingParser.literal`.
     * @param ctx the parse tree
     */
    enterNumberLiteral?: (ctx: NumberLiteralContext) => void;
    /**
     * Exit a parse tree produced by the `numberLiteral`
     * labeled alternative in `mappingParser.literal`.
     * @param ctx the parse tree
     */
    exitNumberLiteral?: (ctx: NumberLiteralContext) => void;
    /**
     * Enter a parse tree produced by the `dateLiteral`
     * labeled alternative in `mappingParser.literal`.
     * @param ctx the parse tree
     */
    enterDateLiteral?: (ctx: DateLiteralContext) => void;
    /**
     * Exit a parse tree produced by the `dateLiteral`
     * labeled alternative in `mappingParser.literal`.
     * @param ctx the parse tree
     */
    exitDateLiteral?: (ctx: DateLiteralContext) => void;
    /**
     * Enter a parse tree produced by the `dateTimeLiteral`
     * labeled alternative in `mappingParser.literal`.
     * @param ctx the parse tree
     */
    enterDateTimeLiteral?: (ctx: DateTimeLiteralContext) => void;
    /**
     * Exit a parse tree produced by the `dateTimeLiteral`
     * labeled alternative in `mappingParser.literal`.
     * @param ctx the parse tree
     */
    exitDateTimeLiteral?: (ctx: DateTimeLiteralContext) => void;
    /**
     * Enter a parse tree produced by the `timeLiteral`
     * labeled alternative in `mappingParser.literal`.
     * @param ctx the parse tree
     */
    enterTimeLiteral?: (ctx: TimeLiteralContext) => void;
    /**
     * Exit a parse tree produced by the `timeLiteral`
     * labeled alternative in `mappingParser.literal`.
     * @param ctx the parse tree
     */
    exitTimeLiteral?: (ctx: TimeLiteralContext) => void;
    /**
     * Enter a parse tree produced by the `stringLiteral`
     * labeled alternative in `mappingParser.literal`.
     * @param ctx the parse tree
     */
    enterStringLiteral?: (ctx: StringLiteralContext) => void;
    /**
     * Exit a parse tree produced by the `stringLiteral`
     * labeled alternative in `mappingParser.literal`.
     * @param ctx the parse tree
     */
    exitStringLiteral?: (ctx: StringLiteralContext) => void;
    /**
     * Enter a parse tree produced by the `quotedStringLiteral`
     * labeled alternative in `mappingParser.literal`.
     * @param ctx the parse tree
     */
    enterQuotedStringLiteral?: (ctx: QuotedStringLiteralContext) => void;
    /**
     * Exit a parse tree produced by the `quotedStringLiteral`
     * labeled alternative in `mappingParser.literal`.
     * @param ctx the parse tree
     */
    exitQuotedStringLiteral?: (ctx: QuotedStringLiteralContext) => void;
    /**
     * Enter a parse tree produced by the `quantityWithDate`
     * labeled alternative in `mappingParser.fpQuantity`.
     * @param ctx the parse tree
     */
    enterQuantityWithDate?: (ctx: QuantityWithDateContext) => void;
    /**
     * Exit a parse tree produced by the `quantityWithDate`
     * labeled alternative in `mappingParser.fpQuantity`.
     * @param ctx the parse tree
     */
    exitQuantityWithDate?: (ctx: QuantityWithDateContext) => void;
    /**
     * Enter a parse tree produced by the `quantityWithDatePlural`
     * labeled alternative in `mappingParser.fpQuantity`.
     * @param ctx the parse tree
     */
    enterQuantityWithDatePlural?: (ctx: QuantityWithDatePluralContext) => void;
    /**
     * Exit a parse tree produced by the `quantityWithDatePlural`
     * labeled alternative in `mappingParser.fpQuantity`.
     * @param ctx the parse tree
     */
    exitQuantityWithDatePlural?: (ctx: QuantityWithDatePluralContext) => void;
    /**
     * Enter a parse tree produced by the `quantityWithUcum`
     * labeled alternative in `mappingParser.fpQuantity`.
     * @param ctx the parse tree
     */
    enterQuantityWithUcum?: (ctx: QuantityWithUcumContext) => void;
    /**
     * Exit a parse tree produced by the `quantityWithUcum`
     * labeled alternative in `mappingParser.fpQuantity`.
     * @param ctx the parse tree
     */
    exitQuantityWithUcum?: (ctx: QuantityWithUcumContext) => void;

    visitTerminal(node: TerminalNode): void {}
    visitErrorNode(node: ErrorNode): void {}
    enterEveryRule(node: ParserRuleContext): void {}
    exitEveryRule(node: ParserRuleContext): void {}
}

