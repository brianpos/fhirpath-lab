// Generated from cql.g4 by ANTLR 4.13.2

import {ParseTreeListener} from "antlr4";


import { LibraryContext } from "./cqlParser.js";
import { DirectiveContext } from "./cqlParser.js";
import { DefinitionContext } from "./cqlParser.js";
import { LibraryDefinitionContext } from "./cqlParser.js";
import { UsingDefinitionContext } from "./cqlParser.js";
import { IncludeDefinitionContext } from "./cqlParser.js";
import { LocalIdentifierContext } from "./cqlParser.js";
import { AccessModifierContext } from "./cqlParser.js";
import { ParameterDefinitionContext } from "./cqlParser.js";
import { CodesystemDefinitionContext } from "./cqlParser.js";
import { ValuesetDefinitionContext } from "./cqlParser.js";
import { CodesystemsContext } from "./cqlParser.js";
import { CodesystemIdentifierContext } from "./cqlParser.js";
import { LibraryIdentifierContext } from "./cqlParser.js";
import { CodeDefinitionContext } from "./cqlParser.js";
import { ConceptDefinitionContext } from "./cqlParser.js";
import { CodeIdentifierContext } from "./cqlParser.js";
import { CodesystemIdContext } from "./cqlParser.js";
import { ValuesetIdContext } from "./cqlParser.js";
import { VersionSpecifierContext } from "./cqlParser.js";
import { CodeIdContext } from "./cqlParser.js";
import { TypeSpecifierContext } from "./cqlParser.js";
import { NamedTypeSpecifierContext } from "./cqlParser.js";
import { ModelIdentifierContext } from "./cqlParser.js";
import { ListTypeSpecifierContext } from "./cqlParser.js";
import { IntervalTypeSpecifierContext } from "./cqlParser.js";
import { TupleTypeSpecifierContext } from "./cqlParser.js";
import { TupleElementDefinitionContext } from "./cqlParser.js";
import { ChoiceTypeSpecifierContext } from "./cqlParser.js";
import { StatementContext } from "./cqlParser.js";
import { ExpressionDefinitionContext } from "./cqlParser.js";
import { ContextDefinitionContext } from "./cqlParser.js";
import { FunctionDefinitionContext } from "./cqlParser.js";
import { OperandDefinitionContext } from "./cqlParser.js";
import { FunctionBodyContext } from "./cqlParser.js";
import { QualifiedIdentifierOrFunctionIdentifierContext } from "./cqlParser.js";
import { ContextInfoDefinitionContext } from "./cqlParser.js";
import { TypeInfoDefinitionContext } from "./cqlParser.js";
import { BaseTypeSpecifierContext } from "./cqlParser.js";
import { TypeElementsContext } from "./cqlParser.js";
import { TypeElementDefinitionContext } from "./cqlParser.js";
import { TypeInfoContext } from "./cqlParser.js";
import { ContextRelationshipContext } from "./cqlParser.js";
import { ConversionInfoDefinitionContext } from "./cqlParser.js";
import { QuerySourceContext } from "./cqlParser.js";
import { AliasedQuerySourceContext } from "./cqlParser.js";
import { AliasContext } from "./cqlParser.js";
import { QueryInclusionClauseContext } from "./cqlParser.js";
import { WithClauseContext } from "./cqlParser.js";
import { WithoutClauseContext } from "./cqlParser.js";
import { RetrieveContext } from "./cqlParser.js";
import { ContextIdentifierContext } from "./cqlParser.js";
import { CodePathContext } from "./cqlParser.js";
import { CodeComparatorContext } from "./cqlParser.js";
import { TerminologyContext } from "./cqlParser.js";
import { QualifierContext } from "./cqlParser.js";
import { QueryContext } from "./cqlParser.js";
import { SourceClauseContext } from "./cqlParser.js";
import { LetClauseContext } from "./cqlParser.js";
import { LetClauseItemContext } from "./cqlParser.js";
import { WhereClauseContext } from "./cqlParser.js";
import { ReturnClauseContext } from "./cqlParser.js";
import { AggregateClauseContext } from "./cqlParser.js";
import { StartingClauseContext } from "./cqlParser.js";
import { SortClauseContext } from "./cqlParser.js";
import { SortDirectionContext } from "./cqlParser.js";
import { SortByItemContext } from "./cqlParser.js";
import { QualifiedIdentifierContext } from "./cqlParser.js";
import { QualifiedIdentifierExpressionContext } from "./cqlParser.js";
import { QualifierExpressionContext } from "./cqlParser.js";
import { SimplePathIndexerContext } from "./cqlParser.js";
import { SimplePathQualifiedIdentifierContext } from "./cqlParser.js";
import { SimplePathReferentialIdentifierContext } from "./cqlParser.js";
import { SimpleStringLiteralContext } from "./cqlParser.js";
import { SimpleNumberLiteralContext } from "./cqlParser.js";
import { DurationBetweenExpressionContext } from "./cqlParser.js";
import { InFixSetExpressionContext } from "./cqlParser.js";
import { RetrieveExpressionContext } from "./cqlParser.js";
import { TimingExpressionContext } from "./cqlParser.js";
import { QueryExpressionContext } from "./cqlParser.js";
import { NotExpressionContext } from "./cqlParser.js";
import { BooleanExpressionContext } from "./cqlParser.js";
import { OrExpressionContext } from "./cqlParser.js";
import { CastExpressionContext } from "./cqlParser.js";
import { AndExpressionContext } from "./cqlParser.js";
import { BetweenExpressionContext } from "./cqlParser.js";
import { MembershipExpressionContext } from "./cqlParser.js";
import { DifferenceBetweenExpressionContext } from "./cqlParser.js";
import { InequalityExpressionContext } from "./cqlParser.js";
import { EqualityExpressionContext } from "./cqlParser.js";
import { ExistenceExpressionContext } from "./cqlParser.js";
import { ImpliesExpressionContext } from "./cqlParser.js";
import { TermExpressionContext } from "./cqlParser.js";
import { TypeExpressionContext } from "./cqlParser.js";
import { DateTimePrecisionContext } from "./cqlParser.js";
import { DateTimeComponentContext } from "./cqlParser.js";
import { PluralDateTimePrecisionContext } from "./cqlParser.js";
import { AdditionExpressionTermContext } from "./cqlParser.js";
import { IndexedExpressionTermContext } from "./cqlParser.js";
import { WidthExpressionTermContext } from "./cqlParser.js";
import { SetAggregateExpressionTermContext } from "./cqlParser.js";
import { TimeUnitExpressionTermContext } from "./cqlParser.js";
import { IfThenElseExpressionTermContext } from "./cqlParser.js";
import { TimeBoundaryExpressionTermContext } from "./cqlParser.js";
import { ElementExtractorExpressionTermContext } from "./cqlParser.js";
import { ConversionExpressionTermContext } from "./cqlParser.js";
import { TypeExtentExpressionTermContext } from "./cqlParser.js";
import { PredecessorExpressionTermContext } from "./cqlParser.js";
import { PointExtractorExpressionTermContext } from "./cqlParser.js";
import { MultiplicationExpressionTermContext } from "./cqlParser.js";
import { AggregateExpressionTermContext } from "./cqlParser.js";
import { DurationExpressionTermContext } from "./cqlParser.js";
import { DifferenceExpressionTermContext } from "./cqlParser.js";
import { CaseExpressionTermContext } from "./cqlParser.js";
import { PowerExpressionTermContext } from "./cqlParser.js";
import { SuccessorExpressionTermContext } from "./cqlParser.js";
import { PolarityExpressionTermContext } from "./cqlParser.js";
import { TermExpressionTermContext } from "./cqlParser.js";
import { InvocationExpressionTermContext } from "./cqlParser.js";
import { CaseExpressionItemContext } from "./cqlParser.js";
import { DateTimePrecisionSpecifierContext } from "./cqlParser.js";
import { RelativeQualifierContext } from "./cqlParser.js";
import { OffsetRelativeQualifierContext } from "./cqlParser.js";
import { ExclusiveRelativeQualifierContext } from "./cqlParser.js";
import { QuantityOffsetContext } from "./cqlParser.js";
import { TemporalRelationshipContext } from "./cqlParser.js";
import { ConcurrentWithIntervalOperatorPhraseContext } from "./cqlParser.js";
import { IncludesIntervalOperatorPhraseContext } from "./cqlParser.js";
import { IncludedInIntervalOperatorPhraseContext } from "./cqlParser.js";
import { BeforeOrAfterIntervalOperatorPhraseContext } from "./cqlParser.js";
import { WithinIntervalOperatorPhraseContext } from "./cqlParser.js";
import { MeetsIntervalOperatorPhraseContext } from "./cqlParser.js";
import { OverlapsIntervalOperatorPhraseContext } from "./cqlParser.js";
import { StartsIntervalOperatorPhraseContext } from "./cqlParser.js";
import { EndsIntervalOperatorPhraseContext } from "./cqlParser.js";
import { InvocationTermContext } from "./cqlParser.js";
import { LiteralTermContext } from "./cqlParser.js";
import { ExternalConstantTermContext } from "./cqlParser.js";
import { IntervalSelectorTermContext } from "./cqlParser.js";
import { TupleSelectorTermContext } from "./cqlParser.js";
import { InstanceSelectorTermContext } from "./cqlParser.js";
import { ListSelectorTermContext } from "./cqlParser.js";
import { CodeSelectorTermContext } from "./cqlParser.js";
import { ConceptSelectorTermContext } from "./cqlParser.js";
import { ParenthesizedTermContext } from "./cqlParser.js";
import { QualifiedMemberInvocationContext } from "./cqlParser.js";
import { QualifiedFunctionInvocationContext } from "./cqlParser.js";
import { QualifiedFunctionContext } from "./cqlParser.js";
import { MemberInvocationContext } from "./cqlParser.js";
import { FunctionInvocationContext } from "./cqlParser.js";
import { ThisInvocationContext } from "./cqlParser.js";
import { IndexInvocationContext } from "./cqlParser.js";
import { TotalInvocationContext } from "./cqlParser.js";
import { FunctionContext } from "./cqlParser.js";
import { RatioContext } from "./cqlParser.js";
import { BooleanLiteralContext } from "./cqlParser.js";
import { NullLiteralContext } from "./cqlParser.js";
import { StringLiteralContext } from "./cqlParser.js";
import { NumberLiteralContext } from "./cqlParser.js";
import { LongNumberLiteralContext } from "./cqlParser.js";
import { DateTimeLiteralContext } from "./cqlParser.js";
import { DateLiteralContext } from "./cqlParser.js";
import { TimeLiteralContext } from "./cqlParser.js";
import { QuantityLiteralContext } from "./cqlParser.js";
import { RatioLiteralContext } from "./cqlParser.js";
import { ExternalConstantContext } from "./cqlParser.js";
import { IntervalSelectorContext } from "./cqlParser.js";
import { TupleSelectorContext } from "./cqlParser.js";
import { TupleElementSelectorContext } from "./cqlParser.js";
import { InstanceSelectorContext } from "./cqlParser.js";
import { InstanceElementSelectorContext } from "./cqlParser.js";
import { ListSelectorContext } from "./cqlParser.js";
import { DisplayClauseContext } from "./cqlParser.js";
import { CodeSelectorContext } from "./cqlParser.js";
import { ConceptSelectorContext } from "./cqlParser.js";
import { KeywordContext } from "./cqlParser.js";
import { ReservedWordContext } from "./cqlParser.js";
import { KeywordIdentifierContext } from "./cqlParser.js";
import { ObsoleteIdentifierContext } from "./cqlParser.js";
import { FunctionIdentifierContext } from "./cqlParser.js";
import { TypeNameIdentifierContext } from "./cqlParser.js";
import { ReferentialIdentifierContext } from "./cqlParser.js";
import { ReferentialOrTypeNameIdentifierContext } from "./cqlParser.js";
import { IdentifierOrFunctionIdentifierContext } from "./cqlParser.js";
import { IdentifierContext } from "./cqlParser.js";
import { EntireExpressionContext } from "./cqlParser.js";
import { SortDirectionArgumentContext } from "./cqlParser.js";
import { ParamListContext } from "./cqlParser.js";
import { QuantityContext } from "./cqlParser.js";
import { UnitContext } from "./cqlParser.js";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `cqlParser`.
 */
export default class cqlListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `cqlParser.library`.
	 * @param ctx the parse tree
	 */
	enterLibrary?: (ctx: LibraryContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.library`.
	 * @param ctx the parse tree
	 */
	exitLibrary?: (ctx: LibraryContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.directive`.
	 * @param ctx the parse tree
	 */
	enterDirective?: (ctx: DirectiveContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.directive`.
	 * @param ctx the parse tree
	 */
	exitDirective?: (ctx: DirectiveContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.definition`.
	 * @param ctx the parse tree
	 */
	enterDefinition?: (ctx: DefinitionContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.definition`.
	 * @param ctx the parse tree
	 */
	exitDefinition?: (ctx: DefinitionContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.libraryDefinition`.
	 * @param ctx the parse tree
	 */
	enterLibraryDefinition?: (ctx: LibraryDefinitionContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.libraryDefinition`.
	 * @param ctx the parse tree
	 */
	exitLibraryDefinition?: (ctx: LibraryDefinitionContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.usingDefinition`.
	 * @param ctx the parse tree
	 */
	enterUsingDefinition?: (ctx: UsingDefinitionContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.usingDefinition`.
	 * @param ctx the parse tree
	 */
	exitUsingDefinition?: (ctx: UsingDefinitionContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.includeDefinition`.
	 * @param ctx the parse tree
	 */
	enterIncludeDefinition?: (ctx: IncludeDefinitionContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.includeDefinition`.
	 * @param ctx the parse tree
	 */
	exitIncludeDefinition?: (ctx: IncludeDefinitionContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.localIdentifier`.
	 * @param ctx the parse tree
	 */
	enterLocalIdentifier?: (ctx: LocalIdentifierContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.localIdentifier`.
	 * @param ctx the parse tree
	 */
	exitLocalIdentifier?: (ctx: LocalIdentifierContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.accessModifier`.
	 * @param ctx the parse tree
	 */
	enterAccessModifier?: (ctx: AccessModifierContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.accessModifier`.
	 * @param ctx the parse tree
	 */
	exitAccessModifier?: (ctx: AccessModifierContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.parameterDefinition`.
	 * @param ctx the parse tree
	 */
	enterParameterDefinition?: (ctx: ParameterDefinitionContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.parameterDefinition`.
	 * @param ctx the parse tree
	 */
	exitParameterDefinition?: (ctx: ParameterDefinitionContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.codesystemDefinition`.
	 * @param ctx the parse tree
	 */
	enterCodesystemDefinition?: (ctx: CodesystemDefinitionContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.codesystemDefinition`.
	 * @param ctx the parse tree
	 */
	exitCodesystemDefinition?: (ctx: CodesystemDefinitionContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.valuesetDefinition`.
	 * @param ctx the parse tree
	 */
	enterValuesetDefinition?: (ctx: ValuesetDefinitionContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.valuesetDefinition`.
	 * @param ctx the parse tree
	 */
	exitValuesetDefinition?: (ctx: ValuesetDefinitionContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.codesystems`.
	 * @param ctx the parse tree
	 */
	enterCodesystems?: (ctx: CodesystemsContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.codesystems`.
	 * @param ctx the parse tree
	 */
	exitCodesystems?: (ctx: CodesystemsContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.codesystemIdentifier`.
	 * @param ctx the parse tree
	 */
	enterCodesystemIdentifier?: (ctx: CodesystemIdentifierContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.codesystemIdentifier`.
	 * @param ctx the parse tree
	 */
	exitCodesystemIdentifier?: (ctx: CodesystemIdentifierContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.libraryIdentifier`.
	 * @param ctx the parse tree
	 */
	enterLibraryIdentifier?: (ctx: LibraryIdentifierContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.libraryIdentifier`.
	 * @param ctx the parse tree
	 */
	exitLibraryIdentifier?: (ctx: LibraryIdentifierContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.codeDefinition`.
	 * @param ctx the parse tree
	 */
	enterCodeDefinition?: (ctx: CodeDefinitionContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.codeDefinition`.
	 * @param ctx the parse tree
	 */
	exitCodeDefinition?: (ctx: CodeDefinitionContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.conceptDefinition`.
	 * @param ctx the parse tree
	 */
	enterConceptDefinition?: (ctx: ConceptDefinitionContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.conceptDefinition`.
	 * @param ctx the parse tree
	 */
	exitConceptDefinition?: (ctx: ConceptDefinitionContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.codeIdentifier`.
	 * @param ctx the parse tree
	 */
	enterCodeIdentifier?: (ctx: CodeIdentifierContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.codeIdentifier`.
	 * @param ctx the parse tree
	 */
	exitCodeIdentifier?: (ctx: CodeIdentifierContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.codesystemId`.
	 * @param ctx the parse tree
	 */
	enterCodesystemId?: (ctx: CodesystemIdContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.codesystemId`.
	 * @param ctx the parse tree
	 */
	exitCodesystemId?: (ctx: CodesystemIdContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.valuesetId`.
	 * @param ctx the parse tree
	 */
	enterValuesetId?: (ctx: ValuesetIdContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.valuesetId`.
	 * @param ctx the parse tree
	 */
	exitValuesetId?: (ctx: ValuesetIdContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.versionSpecifier`.
	 * @param ctx the parse tree
	 */
	enterVersionSpecifier?: (ctx: VersionSpecifierContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.versionSpecifier`.
	 * @param ctx the parse tree
	 */
	exitVersionSpecifier?: (ctx: VersionSpecifierContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.codeId`.
	 * @param ctx the parse tree
	 */
	enterCodeId?: (ctx: CodeIdContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.codeId`.
	 * @param ctx the parse tree
	 */
	exitCodeId?: (ctx: CodeIdContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.typeSpecifier`.
	 * @param ctx the parse tree
	 */
	enterTypeSpecifier?: (ctx: TypeSpecifierContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.typeSpecifier`.
	 * @param ctx the parse tree
	 */
	exitTypeSpecifier?: (ctx: TypeSpecifierContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.namedTypeSpecifier`.
	 * @param ctx the parse tree
	 */
	enterNamedTypeSpecifier?: (ctx: NamedTypeSpecifierContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.namedTypeSpecifier`.
	 * @param ctx the parse tree
	 */
	exitNamedTypeSpecifier?: (ctx: NamedTypeSpecifierContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.modelIdentifier`.
	 * @param ctx the parse tree
	 */
	enterModelIdentifier?: (ctx: ModelIdentifierContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.modelIdentifier`.
	 * @param ctx the parse tree
	 */
	exitModelIdentifier?: (ctx: ModelIdentifierContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.listTypeSpecifier`.
	 * @param ctx the parse tree
	 */
	enterListTypeSpecifier?: (ctx: ListTypeSpecifierContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.listTypeSpecifier`.
	 * @param ctx the parse tree
	 */
	exitListTypeSpecifier?: (ctx: ListTypeSpecifierContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.intervalTypeSpecifier`.
	 * @param ctx the parse tree
	 */
	enterIntervalTypeSpecifier?: (ctx: IntervalTypeSpecifierContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.intervalTypeSpecifier`.
	 * @param ctx the parse tree
	 */
	exitIntervalTypeSpecifier?: (ctx: IntervalTypeSpecifierContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.tupleTypeSpecifier`.
	 * @param ctx the parse tree
	 */
	enterTupleTypeSpecifier?: (ctx: TupleTypeSpecifierContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.tupleTypeSpecifier`.
	 * @param ctx the parse tree
	 */
	exitTupleTypeSpecifier?: (ctx: TupleTypeSpecifierContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.tupleElementDefinition`.
	 * @param ctx the parse tree
	 */
	enterTupleElementDefinition?: (ctx: TupleElementDefinitionContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.tupleElementDefinition`.
	 * @param ctx the parse tree
	 */
	exitTupleElementDefinition?: (ctx: TupleElementDefinitionContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.choiceTypeSpecifier`.
	 * @param ctx the parse tree
	 */
	enterChoiceTypeSpecifier?: (ctx: ChoiceTypeSpecifierContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.choiceTypeSpecifier`.
	 * @param ctx the parse tree
	 */
	exitChoiceTypeSpecifier?: (ctx: ChoiceTypeSpecifierContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.statement`.
	 * @param ctx the parse tree
	 */
	enterStatement?: (ctx: StatementContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.statement`.
	 * @param ctx the parse tree
	 */
	exitStatement?: (ctx: StatementContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.expressionDefinition`.
	 * @param ctx the parse tree
	 */
	enterExpressionDefinition?: (ctx: ExpressionDefinitionContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.expressionDefinition`.
	 * @param ctx the parse tree
	 */
	exitExpressionDefinition?: (ctx: ExpressionDefinitionContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.contextDefinition`.
	 * @param ctx the parse tree
	 */
	enterContextDefinition?: (ctx: ContextDefinitionContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.contextDefinition`.
	 * @param ctx the parse tree
	 */
	exitContextDefinition?: (ctx: ContextDefinitionContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.functionDefinition`.
	 * @param ctx the parse tree
	 */
	enterFunctionDefinition?: (ctx: FunctionDefinitionContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.functionDefinition`.
	 * @param ctx the parse tree
	 */
	exitFunctionDefinition?: (ctx: FunctionDefinitionContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.operandDefinition`.
	 * @param ctx the parse tree
	 */
	enterOperandDefinition?: (ctx: OperandDefinitionContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.operandDefinition`.
	 * @param ctx the parse tree
	 */
	exitOperandDefinition?: (ctx: OperandDefinitionContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.functionBody`.
	 * @param ctx the parse tree
	 */
	enterFunctionBody?: (ctx: FunctionBodyContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.functionBody`.
	 * @param ctx the parse tree
	 */
	exitFunctionBody?: (ctx: FunctionBodyContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.qualifiedIdentifierOrFunctionIdentifier`.
	 * @param ctx the parse tree
	 */
	enterQualifiedIdentifierOrFunctionIdentifier?: (ctx: QualifiedIdentifierOrFunctionIdentifierContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.qualifiedIdentifierOrFunctionIdentifier`.
	 * @param ctx the parse tree
	 */
	exitQualifiedIdentifierOrFunctionIdentifier?: (ctx: QualifiedIdentifierOrFunctionIdentifierContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.contextInfoDefinition`.
	 * @param ctx the parse tree
	 */
	enterContextInfoDefinition?: (ctx: ContextInfoDefinitionContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.contextInfoDefinition`.
	 * @param ctx the parse tree
	 */
	exitContextInfoDefinition?: (ctx: ContextInfoDefinitionContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.typeInfoDefinition`.
	 * @param ctx the parse tree
	 */
	enterTypeInfoDefinition?: (ctx: TypeInfoDefinitionContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.typeInfoDefinition`.
	 * @param ctx the parse tree
	 */
	exitTypeInfoDefinition?: (ctx: TypeInfoDefinitionContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.baseTypeSpecifier`.
	 * @param ctx the parse tree
	 */
	enterBaseTypeSpecifier?: (ctx: BaseTypeSpecifierContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.baseTypeSpecifier`.
	 * @param ctx the parse tree
	 */
	exitBaseTypeSpecifier?: (ctx: BaseTypeSpecifierContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.typeElements`.
	 * @param ctx the parse tree
	 */
	enterTypeElements?: (ctx: TypeElementsContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.typeElements`.
	 * @param ctx the parse tree
	 */
	exitTypeElements?: (ctx: TypeElementsContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.typeElementDefinition`.
	 * @param ctx the parse tree
	 */
	enterTypeElementDefinition?: (ctx: TypeElementDefinitionContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.typeElementDefinition`.
	 * @param ctx the parse tree
	 */
	exitTypeElementDefinition?: (ctx: TypeElementDefinitionContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.typeInfo`.
	 * @param ctx the parse tree
	 */
	enterTypeInfo?: (ctx: TypeInfoContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.typeInfo`.
	 * @param ctx the parse tree
	 */
	exitTypeInfo?: (ctx: TypeInfoContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.contextRelationship`.
	 * @param ctx the parse tree
	 */
	enterContextRelationship?: (ctx: ContextRelationshipContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.contextRelationship`.
	 * @param ctx the parse tree
	 */
	exitContextRelationship?: (ctx: ContextRelationshipContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.conversionInfoDefinition`.
	 * @param ctx the parse tree
	 */
	enterConversionInfoDefinition?: (ctx: ConversionInfoDefinitionContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.conversionInfoDefinition`.
	 * @param ctx the parse tree
	 */
	exitConversionInfoDefinition?: (ctx: ConversionInfoDefinitionContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.querySource`.
	 * @param ctx the parse tree
	 */
	enterQuerySource?: (ctx: QuerySourceContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.querySource`.
	 * @param ctx the parse tree
	 */
	exitQuerySource?: (ctx: QuerySourceContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.aliasedQuerySource`.
	 * @param ctx the parse tree
	 */
	enterAliasedQuerySource?: (ctx: AliasedQuerySourceContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.aliasedQuerySource`.
	 * @param ctx the parse tree
	 */
	exitAliasedQuerySource?: (ctx: AliasedQuerySourceContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.alias`.
	 * @param ctx the parse tree
	 */
	enterAlias?: (ctx: AliasContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.alias`.
	 * @param ctx the parse tree
	 */
	exitAlias?: (ctx: AliasContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.queryInclusionClause`.
	 * @param ctx the parse tree
	 */
	enterQueryInclusionClause?: (ctx: QueryInclusionClauseContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.queryInclusionClause`.
	 * @param ctx the parse tree
	 */
	exitQueryInclusionClause?: (ctx: QueryInclusionClauseContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.withClause`.
	 * @param ctx the parse tree
	 */
	enterWithClause?: (ctx: WithClauseContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.withClause`.
	 * @param ctx the parse tree
	 */
	exitWithClause?: (ctx: WithClauseContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.withoutClause`.
	 * @param ctx the parse tree
	 */
	enterWithoutClause?: (ctx: WithoutClauseContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.withoutClause`.
	 * @param ctx the parse tree
	 */
	exitWithoutClause?: (ctx: WithoutClauseContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.retrieve`.
	 * @param ctx the parse tree
	 */
	enterRetrieve?: (ctx: RetrieveContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.retrieve`.
	 * @param ctx the parse tree
	 */
	exitRetrieve?: (ctx: RetrieveContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.contextIdentifier`.
	 * @param ctx the parse tree
	 */
	enterContextIdentifier?: (ctx: ContextIdentifierContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.contextIdentifier`.
	 * @param ctx the parse tree
	 */
	exitContextIdentifier?: (ctx: ContextIdentifierContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.codePath`.
	 * @param ctx the parse tree
	 */
	enterCodePath?: (ctx: CodePathContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.codePath`.
	 * @param ctx the parse tree
	 */
	exitCodePath?: (ctx: CodePathContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.codeComparator`.
	 * @param ctx the parse tree
	 */
	enterCodeComparator?: (ctx: CodeComparatorContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.codeComparator`.
	 * @param ctx the parse tree
	 */
	exitCodeComparator?: (ctx: CodeComparatorContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.terminology`.
	 * @param ctx the parse tree
	 */
	enterTerminology?: (ctx: TerminologyContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.terminology`.
	 * @param ctx the parse tree
	 */
	exitTerminology?: (ctx: TerminologyContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.qualifier`.
	 * @param ctx the parse tree
	 */
	enterQualifier?: (ctx: QualifierContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.qualifier`.
	 * @param ctx the parse tree
	 */
	exitQualifier?: (ctx: QualifierContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.query`.
	 * @param ctx the parse tree
	 */
	enterQuery?: (ctx: QueryContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.query`.
	 * @param ctx the parse tree
	 */
	exitQuery?: (ctx: QueryContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.sourceClause`.
	 * @param ctx the parse tree
	 */
	enterSourceClause?: (ctx: SourceClauseContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.sourceClause`.
	 * @param ctx the parse tree
	 */
	exitSourceClause?: (ctx: SourceClauseContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.letClause`.
	 * @param ctx the parse tree
	 */
	enterLetClause?: (ctx: LetClauseContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.letClause`.
	 * @param ctx the parse tree
	 */
	exitLetClause?: (ctx: LetClauseContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.letClauseItem`.
	 * @param ctx the parse tree
	 */
	enterLetClauseItem?: (ctx: LetClauseItemContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.letClauseItem`.
	 * @param ctx the parse tree
	 */
	exitLetClauseItem?: (ctx: LetClauseItemContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.whereClause`.
	 * @param ctx the parse tree
	 */
	enterWhereClause?: (ctx: WhereClauseContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.whereClause`.
	 * @param ctx the parse tree
	 */
	exitWhereClause?: (ctx: WhereClauseContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.returnClause`.
	 * @param ctx the parse tree
	 */
	enterReturnClause?: (ctx: ReturnClauseContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.returnClause`.
	 * @param ctx the parse tree
	 */
	exitReturnClause?: (ctx: ReturnClauseContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.aggregateClause`.
	 * @param ctx the parse tree
	 */
	enterAggregateClause?: (ctx: AggregateClauseContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.aggregateClause`.
	 * @param ctx the parse tree
	 */
	exitAggregateClause?: (ctx: AggregateClauseContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.startingClause`.
	 * @param ctx the parse tree
	 */
	enterStartingClause?: (ctx: StartingClauseContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.startingClause`.
	 * @param ctx the parse tree
	 */
	exitStartingClause?: (ctx: StartingClauseContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.sortClause`.
	 * @param ctx the parse tree
	 */
	enterSortClause?: (ctx: SortClauseContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.sortClause`.
	 * @param ctx the parse tree
	 */
	exitSortClause?: (ctx: SortClauseContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.sortDirection`.
	 * @param ctx the parse tree
	 */
	enterSortDirection?: (ctx: SortDirectionContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.sortDirection`.
	 * @param ctx the parse tree
	 */
	exitSortDirection?: (ctx: SortDirectionContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.sortByItem`.
	 * @param ctx the parse tree
	 */
	enterSortByItem?: (ctx: SortByItemContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.sortByItem`.
	 * @param ctx the parse tree
	 */
	exitSortByItem?: (ctx: SortByItemContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.qualifiedIdentifier`.
	 * @param ctx the parse tree
	 */
	enterQualifiedIdentifier?: (ctx: QualifiedIdentifierContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.qualifiedIdentifier`.
	 * @param ctx the parse tree
	 */
	exitQualifiedIdentifier?: (ctx: QualifiedIdentifierContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.qualifiedIdentifierExpression`.
	 * @param ctx the parse tree
	 */
	enterQualifiedIdentifierExpression?: (ctx: QualifiedIdentifierExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.qualifiedIdentifierExpression`.
	 * @param ctx the parse tree
	 */
	exitQualifiedIdentifierExpression?: (ctx: QualifiedIdentifierExpressionContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.qualifierExpression`.
	 * @param ctx the parse tree
	 */
	enterQualifierExpression?: (ctx: QualifierExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.qualifierExpression`.
	 * @param ctx the parse tree
	 */
	exitQualifierExpression?: (ctx: QualifierExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `simplePathIndexer`
	 * labeled alternative in `cqlParser.simplePath`.
	 * @param ctx the parse tree
	 */
	enterSimplePathIndexer?: (ctx: SimplePathIndexerContext) => void;
	/**
	 * Exit a parse tree produced by the `simplePathIndexer`
	 * labeled alternative in `cqlParser.simplePath`.
	 * @param ctx the parse tree
	 */
	exitSimplePathIndexer?: (ctx: SimplePathIndexerContext) => void;
	/**
	 * Enter a parse tree produced by the `simplePathQualifiedIdentifier`
	 * labeled alternative in `cqlParser.simplePath`.
	 * @param ctx the parse tree
	 */
	enterSimplePathQualifiedIdentifier?: (ctx: SimplePathQualifiedIdentifierContext) => void;
	/**
	 * Exit a parse tree produced by the `simplePathQualifiedIdentifier`
	 * labeled alternative in `cqlParser.simplePath`.
	 * @param ctx the parse tree
	 */
	exitSimplePathQualifiedIdentifier?: (ctx: SimplePathQualifiedIdentifierContext) => void;
	/**
	 * Enter a parse tree produced by the `simplePathReferentialIdentifier`
	 * labeled alternative in `cqlParser.simplePath`.
	 * @param ctx the parse tree
	 */
	enterSimplePathReferentialIdentifier?: (ctx: SimplePathReferentialIdentifierContext) => void;
	/**
	 * Exit a parse tree produced by the `simplePathReferentialIdentifier`
	 * labeled alternative in `cqlParser.simplePath`.
	 * @param ctx the parse tree
	 */
	exitSimplePathReferentialIdentifier?: (ctx: SimplePathReferentialIdentifierContext) => void;
	/**
	 * Enter a parse tree produced by the `simpleStringLiteral`
	 * labeled alternative in `cqlParser.simpleLiteral`.
	 * @param ctx the parse tree
	 */
	enterSimpleStringLiteral?: (ctx: SimpleStringLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `simpleStringLiteral`
	 * labeled alternative in `cqlParser.simpleLiteral`.
	 * @param ctx the parse tree
	 */
	exitSimpleStringLiteral?: (ctx: SimpleStringLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `simpleNumberLiteral`
	 * labeled alternative in `cqlParser.simpleLiteral`.
	 * @param ctx the parse tree
	 */
	enterSimpleNumberLiteral?: (ctx: SimpleNumberLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `simpleNumberLiteral`
	 * labeled alternative in `cqlParser.simpleLiteral`.
	 * @param ctx the parse tree
	 */
	exitSimpleNumberLiteral?: (ctx: SimpleNumberLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `durationBetweenExpression`
	 * labeled alternative in `cqlParser.expression`.
	 * @param ctx the parse tree
	 */
	enterDurationBetweenExpression?: (ctx: DurationBetweenExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `durationBetweenExpression`
	 * labeled alternative in `cqlParser.expression`.
	 * @param ctx the parse tree
	 */
	exitDurationBetweenExpression?: (ctx: DurationBetweenExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `inFixSetExpression`
	 * labeled alternative in `cqlParser.expression`.
	 * @param ctx the parse tree
	 */
	enterInFixSetExpression?: (ctx: InFixSetExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `inFixSetExpression`
	 * labeled alternative in `cqlParser.expression`.
	 * @param ctx the parse tree
	 */
	exitInFixSetExpression?: (ctx: InFixSetExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `retrieveExpression`
	 * labeled alternative in `cqlParser.expression`.
	 * @param ctx the parse tree
	 */
	enterRetrieveExpression?: (ctx: RetrieveExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `retrieveExpression`
	 * labeled alternative in `cqlParser.expression`.
	 * @param ctx the parse tree
	 */
	exitRetrieveExpression?: (ctx: RetrieveExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `timingExpression`
	 * labeled alternative in `cqlParser.expression`.
	 * @param ctx the parse tree
	 */
	enterTimingExpression?: (ctx: TimingExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `timingExpression`
	 * labeled alternative in `cqlParser.expression`.
	 * @param ctx the parse tree
	 */
	exitTimingExpression?: (ctx: TimingExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `queryExpression`
	 * labeled alternative in `cqlParser.expression`.
	 * @param ctx the parse tree
	 */
	enterQueryExpression?: (ctx: QueryExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `queryExpression`
	 * labeled alternative in `cqlParser.expression`.
	 * @param ctx the parse tree
	 */
	exitQueryExpression?: (ctx: QueryExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `notExpression`
	 * labeled alternative in `cqlParser.expression`.
	 * @param ctx the parse tree
	 */
	enterNotExpression?: (ctx: NotExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `notExpression`
	 * labeled alternative in `cqlParser.expression`.
	 * @param ctx the parse tree
	 */
	exitNotExpression?: (ctx: NotExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `booleanExpression`
	 * labeled alternative in `cqlParser.expression`.
	 * @param ctx the parse tree
	 */
	enterBooleanExpression?: (ctx: BooleanExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `booleanExpression`
	 * labeled alternative in `cqlParser.expression`.
	 * @param ctx the parse tree
	 */
	exitBooleanExpression?: (ctx: BooleanExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `orExpression`
	 * labeled alternative in `cqlParser.expression`.
	 * @param ctx the parse tree
	 */
	enterOrExpression?: (ctx: OrExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `orExpression`
	 * labeled alternative in `cqlParser.expression`.
	 * @param ctx the parse tree
	 */
	exitOrExpression?: (ctx: OrExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `castExpression`
	 * labeled alternative in `cqlParser.expression`.
	 * @param ctx the parse tree
	 */
	enterCastExpression?: (ctx: CastExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `castExpression`
	 * labeled alternative in `cqlParser.expression`.
	 * @param ctx the parse tree
	 */
	exitCastExpression?: (ctx: CastExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `andExpression`
	 * labeled alternative in `cqlParser.expression`.
	 * @param ctx the parse tree
	 */
	enterAndExpression?: (ctx: AndExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `andExpression`
	 * labeled alternative in `cqlParser.expression`.
	 * @param ctx the parse tree
	 */
	exitAndExpression?: (ctx: AndExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `betweenExpression`
	 * labeled alternative in `cqlParser.expression`.
	 * @param ctx the parse tree
	 */
	enterBetweenExpression?: (ctx: BetweenExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `betweenExpression`
	 * labeled alternative in `cqlParser.expression`.
	 * @param ctx the parse tree
	 */
	exitBetweenExpression?: (ctx: BetweenExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `membershipExpression`
	 * labeled alternative in `cqlParser.expression`.
	 * @param ctx the parse tree
	 */
	enterMembershipExpression?: (ctx: MembershipExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `membershipExpression`
	 * labeled alternative in `cqlParser.expression`.
	 * @param ctx the parse tree
	 */
	exitMembershipExpression?: (ctx: MembershipExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `differenceBetweenExpression`
	 * labeled alternative in `cqlParser.expression`.
	 * @param ctx the parse tree
	 */
	enterDifferenceBetweenExpression?: (ctx: DifferenceBetweenExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `differenceBetweenExpression`
	 * labeled alternative in `cqlParser.expression`.
	 * @param ctx the parse tree
	 */
	exitDifferenceBetweenExpression?: (ctx: DifferenceBetweenExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `inequalityExpression`
	 * labeled alternative in `cqlParser.expression`.
	 * @param ctx the parse tree
	 */
	enterInequalityExpression?: (ctx: InequalityExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `inequalityExpression`
	 * labeled alternative in `cqlParser.expression`.
	 * @param ctx the parse tree
	 */
	exitInequalityExpression?: (ctx: InequalityExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `equalityExpression`
	 * labeled alternative in `cqlParser.expression`.
	 * @param ctx the parse tree
	 */
	enterEqualityExpression?: (ctx: EqualityExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `equalityExpression`
	 * labeled alternative in `cqlParser.expression`.
	 * @param ctx the parse tree
	 */
	exitEqualityExpression?: (ctx: EqualityExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `existenceExpression`
	 * labeled alternative in `cqlParser.expression`.
	 * @param ctx the parse tree
	 */
	enterExistenceExpression?: (ctx: ExistenceExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `existenceExpression`
	 * labeled alternative in `cqlParser.expression`.
	 * @param ctx the parse tree
	 */
	exitExistenceExpression?: (ctx: ExistenceExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `impliesExpression`
	 * labeled alternative in `cqlParser.expression`.
	 * @param ctx the parse tree
	 */
	enterImpliesExpression?: (ctx: ImpliesExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `impliesExpression`
	 * labeled alternative in `cqlParser.expression`.
	 * @param ctx the parse tree
	 */
	exitImpliesExpression?: (ctx: ImpliesExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `termExpression`
	 * labeled alternative in `cqlParser.expression`.
	 * @param ctx the parse tree
	 */
	enterTermExpression?: (ctx: TermExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `termExpression`
	 * labeled alternative in `cqlParser.expression`.
	 * @param ctx the parse tree
	 */
	exitTermExpression?: (ctx: TermExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `typeExpression`
	 * labeled alternative in `cqlParser.expression`.
	 * @param ctx the parse tree
	 */
	enterTypeExpression?: (ctx: TypeExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `typeExpression`
	 * labeled alternative in `cqlParser.expression`.
	 * @param ctx the parse tree
	 */
	exitTypeExpression?: (ctx: TypeExpressionContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.dateTimePrecision`.
	 * @param ctx the parse tree
	 */
	enterDateTimePrecision?: (ctx: DateTimePrecisionContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.dateTimePrecision`.
	 * @param ctx the parse tree
	 */
	exitDateTimePrecision?: (ctx: DateTimePrecisionContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.dateTimeComponent`.
	 * @param ctx the parse tree
	 */
	enterDateTimeComponent?: (ctx: DateTimeComponentContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.dateTimeComponent`.
	 * @param ctx the parse tree
	 */
	exitDateTimeComponent?: (ctx: DateTimeComponentContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.pluralDateTimePrecision`.
	 * @param ctx the parse tree
	 */
	enterPluralDateTimePrecision?: (ctx: PluralDateTimePrecisionContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.pluralDateTimePrecision`.
	 * @param ctx the parse tree
	 */
	exitPluralDateTimePrecision?: (ctx: PluralDateTimePrecisionContext) => void;
	/**
	 * Enter a parse tree produced by the `additionExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 */
	enterAdditionExpressionTerm?: (ctx: AdditionExpressionTermContext) => void;
	/**
	 * Exit a parse tree produced by the `additionExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 */
	exitAdditionExpressionTerm?: (ctx: AdditionExpressionTermContext) => void;
	/**
	 * Enter a parse tree produced by the `indexedExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 */
	enterIndexedExpressionTerm?: (ctx: IndexedExpressionTermContext) => void;
	/**
	 * Exit a parse tree produced by the `indexedExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 */
	exitIndexedExpressionTerm?: (ctx: IndexedExpressionTermContext) => void;
	/**
	 * Enter a parse tree produced by the `widthExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 */
	enterWidthExpressionTerm?: (ctx: WidthExpressionTermContext) => void;
	/**
	 * Exit a parse tree produced by the `widthExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 */
	exitWidthExpressionTerm?: (ctx: WidthExpressionTermContext) => void;
	/**
	 * Enter a parse tree produced by the `setAggregateExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 */
	enterSetAggregateExpressionTerm?: (ctx: SetAggregateExpressionTermContext) => void;
	/**
	 * Exit a parse tree produced by the `setAggregateExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 */
	exitSetAggregateExpressionTerm?: (ctx: SetAggregateExpressionTermContext) => void;
	/**
	 * Enter a parse tree produced by the `timeUnitExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 */
	enterTimeUnitExpressionTerm?: (ctx: TimeUnitExpressionTermContext) => void;
	/**
	 * Exit a parse tree produced by the `timeUnitExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 */
	exitTimeUnitExpressionTerm?: (ctx: TimeUnitExpressionTermContext) => void;
	/**
	 * Enter a parse tree produced by the `ifThenElseExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 */
	enterIfThenElseExpressionTerm?: (ctx: IfThenElseExpressionTermContext) => void;
	/**
	 * Exit a parse tree produced by the `ifThenElseExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 */
	exitIfThenElseExpressionTerm?: (ctx: IfThenElseExpressionTermContext) => void;
	/**
	 * Enter a parse tree produced by the `timeBoundaryExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 */
	enterTimeBoundaryExpressionTerm?: (ctx: TimeBoundaryExpressionTermContext) => void;
	/**
	 * Exit a parse tree produced by the `timeBoundaryExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 */
	exitTimeBoundaryExpressionTerm?: (ctx: TimeBoundaryExpressionTermContext) => void;
	/**
	 * Enter a parse tree produced by the `elementExtractorExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 */
	enterElementExtractorExpressionTerm?: (ctx: ElementExtractorExpressionTermContext) => void;
	/**
	 * Exit a parse tree produced by the `elementExtractorExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 */
	exitElementExtractorExpressionTerm?: (ctx: ElementExtractorExpressionTermContext) => void;
	/**
	 * Enter a parse tree produced by the `conversionExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 */
	enterConversionExpressionTerm?: (ctx: ConversionExpressionTermContext) => void;
	/**
	 * Exit a parse tree produced by the `conversionExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 */
	exitConversionExpressionTerm?: (ctx: ConversionExpressionTermContext) => void;
	/**
	 * Enter a parse tree produced by the `typeExtentExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 */
	enterTypeExtentExpressionTerm?: (ctx: TypeExtentExpressionTermContext) => void;
	/**
	 * Exit a parse tree produced by the `typeExtentExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 */
	exitTypeExtentExpressionTerm?: (ctx: TypeExtentExpressionTermContext) => void;
	/**
	 * Enter a parse tree produced by the `predecessorExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 */
	enterPredecessorExpressionTerm?: (ctx: PredecessorExpressionTermContext) => void;
	/**
	 * Exit a parse tree produced by the `predecessorExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 */
	exitPredecessorExpressionTerm?: (ctx: PredecessorExpressionTermContext) => void;
	/**
	 * Enter a parse tree produced by the `pointExtractorExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 */
	enterPointExtractorExpressionTerm?: (ctx: PointExtractorExpressionTermContext) => void;
	/**
	 * Exit a parse tree produced by the `pointExtractorExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 */
	exitPointExtractorExpressionTerm?: (ctx: PointExtractorExpressionTermContext) => void;
	/**
	 * Enter a parse tree produced by the `multiplicationExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 */
	enterMultiplicationExpressionTerm?: (ctx: MultiplicationExpressionTermContext) => void;
	/**
	 * Exit a parse tree produced by the `multiplicationExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 */
	exitMultiplicationExpressionTerm?: (ctx: MultiplicationExpressionTermContext) => void;
	/**
	 * Enter a parse tree produced by the `aggregateExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 */
	enterAggregateExpressionTerm?: (ctx: AggregateExpressionTermContext) => void;
	/**
	 * Exit a parse tree produced by the `aggregateExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 */
	exitAggregateExpressionTerm?: (ctx: AggregateExpressionTermContext) => void;
	/**
	 * Enter a parse tree produced by the `durationExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 */
	enterDurationExpressionTerm?: (ctx: DurationExpressionTermContext) => void;
	/**
	 * Exit a parse tree produced by the `durationExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 */
	exitDurationExpressionTerm?: (ctx: DurationExpressionTermContext) => void;
	/**
	 * Enter a parse tree produced by the `differenceExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 */
	enterDifferenceExpressionTerm?: (ctx: DifferenceExpressionTermContext) => void;
	/**
	 * Exit a parse tree produced by the `differenceExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 */
	exitDifferenceExpressionTerm?: (ctx: DifferenceExpressionTermContext) => void;
	/**
	 * Enter a parse tree produced by the `caseExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 */
	enterCaseExpressionTerm?: (ctx: CaseExpressionTermContext) => void;
	/**
	 * Exit a parse tree produced by the `caseExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 */
	exitCaseExpressionTerm?: (ctx: CaseExpressionTermContext) => void;
	/**
	 * Enter a parse tree produced by the `powerExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 */
	enterPowerExpressionTerm?: (ctx: PowerExpressionTermContext) => void;
	/**
	 * Exit a parse tree produced by the `powerExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 */
	exitPowerExpressionTerm?: (ctx: PowerExpressionTermContext) => void;
	/**
	 * Enter a parse tree produced by the `successorExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 */
	enterSuccessorExpressionTerm?: (ctx: SuccessorExpressionTermContext) => void;
	/**
	 * Exit a parse tree produced by the `successorExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 */
	exitSuccessorExpressionTerm?: (ctx: SuccessorExpressionTermContext) => void;
	/**
	 * Enter a parse tree produced by the `polarityExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 */
	enterPolarityExpressionTerm?: (ctx: PolarityExpressionTermContext) => void;
	/**
	 * Exit a parse tree produced by the `polarityExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 */
	exitPolarityExpressionTerm?: (ctx: PolarityExpressionTermContext) => void;
	/**
	 * Enter a parse tree produced by the `termExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 */
	enterTermExpressionTerm?: (ctx: TermExpressionTermContext) => void;
	/**
	 * Exit a parse tree produced by the `termExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 */
	exitTermExpressionTerm?: (ctx: TermExpressionTermContext) => void;
	/**
	 * Enter a parse tree produced by the `invocationExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 */
	enterInvocationExpressionTerm?: (ctx: InvocationExpressionTermContext) => void;
	/**
	 * Exit a parse tree produced by the `invocationExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 */
	exitInvocationExpressionTerm?: (ctx: InvocationExpressionTermContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.caseExpressionItem`.
	 * @param ctx the parse tree
	 */
	enterCaseExpressionItem?: (ctx: CaseExpressionItemContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.caseExpressionItem`.
	 * @param ctx the parse tree
	 */
	exitCaseExpressionItem?: (ctx: CaseExpressionItemContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.dateTimePrecisionSpecifier`.
	 * @param ctx the parse tree
	 */
	enterDateTimePrecisionSpecifier?: (ctx: DateTimePrecisionSpecifierContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.dateTimePrecisionSpecifier`.
	 * @param ctx the parse tree
	 */
	exitDateTimePrecisionSpecifier?: (ctx: DateTimePrecisionSpecifierContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.relativeQualifier`.
	 * @param ctx the parse tree
	 */
	enterRelativeQualifier?: (ctx: RelativeQualifierContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.relativeQualifier`.
	 * @param ctx the parse tree
	 */
	exitRelativeQualifier?: (ctx: RelativeQualifierContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.offsetRelativeQualifier`.
	 * @param ctx the parse tree
	 */
	enterOffsetRelativeQualifier?: (ctx: OffsetRelativeQualifierContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.offsetRelativeQualifier`.
	 * @param ctx the parse tree
	 */
	exitOffsetRelativeQualifier?: (ctx: OffsetRelativeQualifierContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.exclusiveRelativeQualifier`.
	 * @param ctx the parse tree
	 */
	enterExclusiveRelativeQualifier?: (ctx: ExclusiveRelativeQualifierContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.exclusiveRelativeQualifier`.
	 * @param ctx the parse tree
	 */
	exitExclusiveRelativeQualifier?: (ctx: ExclusiveRelativeQualifierContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.quantityOffset`.
	 * @param ctx the parse tree
	 */
	enterQuantityOffset?: (ctx: QuantityOffsetContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.quantityOffset`.
	 * @param ctx the parse tree
	 */
	exitQuantityOffset?: (ctx: QuantityOffsetContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.temporalRelationship`.
	 * @param ctx the parse tree
	 */
	enterTemporalRelationship?: (ctx: TemporalRelationshipContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.temporalRelationship`.
	 * @param ctx the parse tree
	 */
	exitTemporalRelationship?: (ctx: TemporalRelationshipContext) => void;
	/**
	 * Enter a parse tree produced by the `concurrentWithIntervalOperatorPhrase`
	 * labeled alternative in `cqlParser.intervalOperatorPhrase`.
	 * @param ctx the parse tree
	 */
	enterConcurrentWithIntervalOperatorPhrase?: (ctx: ConcurrentWithIntervalOperatorPhraseContext) => void;
	/**
	 * Exit a parse tree produced by the `concurrentWithIntervalOperatorPhrase`
	 * labeled alternative in `cqlParser.intervalOperatorPhrase`.
	 * @param ctx the parse tree
	 */
	exitConcurrentWithIntervalOperatorPhrase?: (ctx: ConcurrentWithIntervalOperatorPhraseContext) => void;
	/**
	 * Enter a parse tree produced by the `includesIntervalOperatorPhrase`
	 * labeled alternative in `cqlParser.intervalOperatorPhrase`.
	 * @param ctx the parse tree
	 */
	enterIncludesIntervalOperatorPhrase?: (ctx: IncludesIntervalOperatorPhraseContext) => void;
	/**
	 * Exit a parse tree produced by the `includesIntervalOperatorPhrase`
	 * labeled alternative in `cqlParser.intervalOperatorPhrase`.
	 * @param ctx the parse tree
	 */
	exitIncludesIntervalOperatorPhrase?: (ctx: IncludesIntervalOperatorPhraseContext) => void;
	/**
	 * Enter a parse tree produced by the `includedInIntervalOperatorPhrase`
	 * labeled alternative in `cqlParser.intervalOperatorPhrase`.
	 * @param ctx the parse tree
	 */
	enterIncludedInIntervalOperatorPhrase?: (ctx: IncludedInIntervalOperatorPhraseContext) => void;
	/**
	 * Exit a parse tree produced by the `includedInIntervalOperatorPhrase`
	 * labeled alternative in `cqlParser.intervalOperatorPhrase`.
	 * @param ctx the parse tree
	 */
	exitIncludedInIntervalOperatorPhrase?: (ctx: IncludedInIntervalOperatorPhraseContext) => void;
	/**
	 * Enter a parse tree produced by the `beforeOrAfterIntervalOperatorPhrase`
	 * labeled alternative in `cqlParser.intervalOperatorPhrase`.
	 * @param ctx the parse tree
	 */
	enterBeforeOrAfterIntervalOperatorPhrase?: (ctx: BeforeOrAfterIntervalOperatorPhraseContext) => void;
	/**
	 * Exit a parse tree produced by the `beforeOrAfterIntervalOperatorPhrase`
	 * labeled alternative in `cqlParser.intervalOperatorPhrase`.
	 * @param ctx the parse tree
	 */
	exitBeforeOrAfterIntervalOperatorPhrase?: (ctx: BeforeOrAfterIntervalOperatorPhraseContext) => void;
	/**
	 * Enter a parse tree produced by the `withinIntervalOperatorPhrase`
	 * labeled alternative in `cqlParser.intervalOperatorPhrase`.
	 * @param ctx the parse tree
	 */
	enterWithinIntervalOperatorPhrase?: (ctx: WithinIntervalOperatorPhraseContext) => void;
	/**
	 * Exit a parse tree produced by the `withinIntervalOperatorPhrase`
	 * labeled alternative in `cqlParser.intervalOperatorPhrase`.
	 * @param ctx the parse tree
	 */
	exitWithinIntervalOperatorPhrase?: (ctx: WithinIntervalOperatorPhraseContext) => void;
	/**
	 * Enter a parse tree produced by the `meetsIntervalOperatorPhrase`
	 * labeled alternative in `cqlParser.intervalOperatorPhrase`.
	 * @param ctx the parse tree
	 */
	enterMeetsIntervalOperatorPhrase?: (ctx: MeetsIntervalOperatorPhraseContext) => void;
	/**
	 * Exit a parse tree produced by the `meetsIntervalOperatorPhrase`
	 * labeled alternative in `cqlParser.intervalOperatorPhrase`.
	 * @param ctx the parse tree
	 */
	exitMeetsIntervalOperatorPhrase?: (ctx: MeetsIntervalOperatorPhraseContext) => void;
	/**
	 * Enter a parse tree produced by the `overlapsIntervalOperatorPhrase`
	 * labeled alternative in `cqlParser.intervalOperatorPhrase`.
	 * @param ctx the parse tree
	 */
	enterOverlapsIntervalOperatorPhrase?: (ctx: OverlapsIntervalOperatorPhraseContext) => void;
	/**
	 * Exit a parse tree produced by the `overlapsIntervalOperatorPhrase`
	 * labeled alternative in `cqlParser.intervalOperatorPhrase`.
	 * @param ctx the parse tree
	 */
	exitOverlapsIntervalOperatorPhrase?: (ctx: OverlapsIntervalOperatorPhraseContext) => void;
	/**
	 * Enter a parse tree produced by the `startsIntervalOperatorPhrase`
	 * labeled alternative in `cqlParser.intervalOperatorPhrase`.
	 * @param ctx the parse tree
	 */
	enterStartsIntervalOperatorPhrase?: (ctx: StartsIntervalOperatorPhraseContext) => void;
	/**
	 * Exit a parse tree produced by the `startsIntervalOperatorPhrase`
	 * labeled alternative in `cqlParser.intervalOperatorPhrase`.
	 * @param ctx the parse tree
	 */
	exitStartsIntervalOperatorPhrase?: (ctx: StartsIntervalOperatorPhraseContext) => void;
	/**
	 * Enter a parse tree produced by the `endsIntervalOperatorPhrase`
	 * labeled alternative in `cqlParser.intervalOperatorPhrase`.
	 * @param ctx the parse tree
	 */
	enterEndsIntervalOperatorPhrase?: (ctx: EndsIntervalOperatorPhraseContext) => void;
	/**
	 * Exit a parse tree produced by the `endsIntervalOperatorPhrase`
	 * labeled alternative in `cqlParser.intervalOperatorPhrase`.
	 * @param ctx the parse tree
	 */
	exitEndsIntervalOperatorPhrase?: (ctx: EndsIntervalOperatorPhraseContext) => void;
	/**
	 * Enter a parse tree produced by the `invocationTerm`
	 * labeled alternative in `cqlParser.term`.
	 * @param ctx the parse tree
	 */
	enterInvocationTerm?: (ctx: InvocationTermContext) => void;
	/**
	 * Exit a parse tree produced by the `invocationTerm`
	 * labeled alternative in `cqlParser.term`.
	 * @param ctx the parse tree
	 */
	exitInvocationTerm?: (ctx: InvocationTermContext) => void;
	/**
	 * Enter a parse tree produced by the `literalTerm`
	 * labeled alternative in `cqlParser.term`.
	 * @param ctx the parse tree
	 */
	enterLiteralTerm?: (ctx: LiteralTermContext) => void;
	/**
	 * Exit a parse tree produced by the `literalTerm`
	 * labeled alternative in `cqlParser.term`.
	 * @param ctx the parse tree
	 */
	exitLiteralTerm?: (ctx: LiteralTermContext) => void;
	/**
	 * Enter a parse tree produced by the `externalConstantTerm`
	 * labeled alternative in `cqlParser.term`.
	 * @param ctx the parse tree
	 */
	enterExternalConstantTerm?: (ctx: ExternalConstantTermContext) => void;
	/**
	 * Exit a parse tree produced by the `externalConstantTerm`
	 * labeled alternative in `cqlParser.term`.
	 * @param ctx the parse tree
	 */
	exitExternalConstantTerm?: (ctx: ExternalConstantTermContext) => void;
	/**
	 * Enter a parse tree produced by the `intervalSelectorTerm`
	 * labeled alternative in `cqlParser.term`.
	 * @param ctx the parse tree
	 */
	enterIntervalSelectorTerm?: (ctx: IntervalSelectorTermContext) => void;
	/**
	 * Exit a parse tree produced by the `intervalSelectorTerm`
	 * labeled alternative in `cqlParser.term`.
	 * @param ctx the parse tree
	 */
	exitIntervalSelectorTerm?: (ctx: IntervalSelectorTermContext) => void;
	/**
	 * Enter a parse tree produced by the `tupleSelectorTerm`
	 * labeled alternative in `cqlParser.term`.
	 * @param ctx the parse tree
	 */
	enterTupleSelectorTerm?: (ctx: TupleSelectorTermContext) => void;
	/**
	 * Exit a parse tree produced by the `tupleSelectorTerm`
	 * labeled alternative in `cqlParser.term`.
	 * @param ctx the parse tree
	 */
	exitTupleSelectorTerm?: (ctx: TupleSelectorTermContext) => void;
	/**
	 * Enter a parse tree produced by the `instanceSelectorTerm`
	 * labeled alternative in `cqlParser.term`.
	 * @param ctx the parse tree
	 */
	enterInstanceSelectorTerm?: (ctx: InstanceSelectorTermContext) => void;
	/**
	 * Exit a parse tree produced by the `instanceSelectorTerm`
	 * labeled alternative in `cqlParser.term`.
	 * @param ctx the parse tree
	 */
	exitInstanceSelectorTerm?: (ctx: InstanceSelectorTermContext) => void;
	/**
	 * Enter a parse tree produced by the `listSelectorTerm`
	 * labeled alternative in `cqlParser.term`.
	 * @param ctx the parse tree
	 */
	enterListSelectorTerm?: (ctx: ListSelectorTermContext) => void;
	/**
	 * Exit a parse tree produced by the `listSelectorTerm`
	 * labeled alternative in `cqlParser.term`.
	 * @param ctx the parse tree
	 */
	exitListSelectorTerm?: (ctx: ListSelectorTermContext) => void;
	/**
	 * Enter a parse tree produced by the `codeSelectorTerm`
	 * labeled alternative in `cqlParser.term`.
	 * @param ctx the parse tree
	 */
	enterCodeSelectorTerm?: (ctx: CodeSelectorTermContext) => void;
	/**
	 * Exit a parse tree produced by the `codeSelectorTerm`
	 * labeled alternative in `cqlParser.term`.
	 * @param ctx the parse tree
	 */
	exitCodeSelectorTerm?: (ctx: CodeSelectorTermContext) => void;
	/**
	 * Enter a parse tree produced by the `conceptSelectorTerm`
	 * labeled alternative in `cqlParser.term`.
	 * @param ctx the parse tree
	 */
	enterConceptSelectorTerm?: (ctx: ConceptSelectorTermContext) => void;
	/**
	 * Exit a parse tree produced by the `conceptSelectorTerm`
	 * labeled alternative in `cqlParser.term`.
	 * @param ctx the parse tree
	 */
	exitConceptSelectorTerm?: (ctx: ConceptSelectorTermContext) => void;
	/**
	 * Enter a parse tree produced by the `parenthesizedTerm`
	 * labeled alternative in `cqlParser.term`.
	 * @param ctx the parse tree
	 */
	enterParenthesizedTerm?: (ctx: ParenthesizedTermContext) => void;
	/**
	 * Exit a parse tree produced by the `parenthesizedTerm`
	 * labeled alternative in `cqlParser.term`.
	 * @param ctx the parse tree
	 */
	exitParenthesizedTerm?: (ctx: ParenthesizedTermContext) => void;
	/**
	 * Enter a parse tree produced by the `qualifiedMemberInvocation`
	 * labeled alternative in `cqlParser.qualifiedInvocation`.
	 * @param ctx the parse tree
	 */
	enterQualifiedMemberInvocation?: (ctx: QualifiedMemberInvocationContext) => void;
	/**
	 * Exit a parse tree produced by the `qualifiedMemberInvocation`
	 * labeled alternative in `cqlParser.qualifiedInvocation`.
	 * @param ctx the parse tree
	 */
	exitQualifiedMemberInvocation?: (ctx: QualifiedMemberInvocationContext) => void;
	/**
	 * Enter a parse tree produced by the `qualifiedFunctionInvocation`
	 * labeled alternative in `cqlParser.qualifiedInvocation`.
	 * @param ctx the parse tree
	 */
	enterQualifiedFunctionInvocation?: (ctx: QualifiedFunctionInvocationContext) => void;
	/**
	 * Exit a parse tree produced by the `qualifiedFunctionInvocation`
	 * labeled alternative in `cqlParser.qualifiedInvocation`.
	 * @param ctx the parse tree
	 */
	exitQualifiedFunctionInvocation?: (ctx: QualifiedFunctionInvocationContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.qualifiedFunction`.
	 * @param ctx the parse tree
	 */
	enterQualifiedFunction?: (ctx: QualifiedFunctionContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.qualifiedFunction`.
	 * @param ctx the parse tree
	 */
	exitQualifiedFunction?: (ctx: QualifiedFunctionContext) => void;
	/**
	 * Enter a parse tree produced by the `memberInvocation`
	 * labeled alternative in `cqlParser.invocation`.
	 * @param ctx the parse tree
	 */
	enterMemberInvocation?: (ctx: MemberInvocationContext) => void;
	/**
	 * Exit a parse tree produced by the `memberInvocation`
	 * labeled alternative in `cqlParser.invocation`.
	 * @param ctx the parse tree
	 */
	exitMemberInvocation?: (ctx: MemberInvocationContext) => void;
	/**
	 * Enter a parse tree produced by the `functionInvocation`
	 * labeled alternative in `cqlParser.invocation`.
	 * @param ctx the parse tree
	 */
	enterFunctionInvocation?: (ctx: FunctionInvocationContext) => void;
	/**
	 * Exit a parse tree produced by the `functionInvocation`
	 * labeled alternative in `cqlParser.invocation`.
	 * @param ctx the parse tree
	 */
	exitFunctionInvocation?: (ctx: FunctionInvocationContext) => void;
	/**
	 * Enter a parse tree produced by the `thisInvocation`
	 * labeled alternative in `cqlParser.invocation`.
	 * @param ctx the parse tree
	 */
	enterThisInvocation?: (ctx: ThisInvocationContext) => void;
	/**
	 * Exit a parse tree produced by the `thisInvocation`
	 * labeled alternative in `cqlParser.invocation`.
	 * @param ctx the parse tree
	 */
	exitThisInvocation?: (ctx: ThisInvocationContext) => void;
	/**
	 * Enter a parse tree produced by the `indexInvocation`
	 * labeled alternative in `cqlParser.invocation`.
	 * @param ctx the parse tree
	 */
	enterIndexInvocation?: (ctx: IndexInvocationContext) => void;
	/**
	 * Exit a parse tree produced by the `indexInvocation`
	 * labeled alternative in `cqlParser.invocation`.
	 * @param ctx the parse tree
	 */
	exitIndexInvocation?: (ctx: IndexInvocationContext) => void;
	/**
	 * Enter a parse tree produced by the `totalInvocation`
	 * labeled alternative in `cqlParser.invocation`.
	 * @param ctx the parse tree
	 */
	enterTotalInvocation?: (ctx: TotalInvocationContext) => void;
	/**
	 * Exit a parse tree produced by the `totalInvocation`
	 * labeled alternative in `cqlParser.invocation`.
	 * @param ctx the parse tree
	 */
	exitTotalInvocation?: (ctx: TotalInvocationContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.function`.
	 * @param ctx the parse tree
	 */
	enterFunction?: (ctx: FunctionContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.function`.
	 * @param ctx the parse tree
	 */
	exitFunction?: (ctx: FunctionContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.ratio`.
	 * @param ctx the parse tree
	 */
	enterRatio?: (ctx: RatioContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.ratio`.
	 * @param ctx the parse tree
	 */
	exitRatio?: (ctx: RatioContext) => void;
	/**
	 * Enter a parse tree produced by the `booleanLiteral`
	 * labeled alternative in `cqlParser.literal`.
	 * @param ctx the parse tree
	 */
	enterBooleanLiteral?: (ctx: BooleanLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `booleanLiteral`
	 * labeled alternative in `cqlParser.literal`.
	 * @param ctx the parse tree
	 */
	exitBooleanLiteral?: (ctx: BooleanLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `nullLiteral`
	 * labeled alternative in `cqlParser.literal`.
	 * @param ctx the parse tree
	 */
	enterNullLiteral?: (ctx: NullLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `nullLiteral`
	 * labeled alternative in `cqlParser.literal`.
	 * @param ctx the parse tree
	 */
	exitNullLiteral?: (ctx: NullLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `stringLiteral`
	 * labeled alternative in `cqlParser.literal`.
	 * @param ctx the parse tree
	 */
	enterStringLiteral?: (ctx: StringLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `stringLiteral`
	 * labeled alternative in `cqlParser.literal`.
	 * @param ctx the parse tree
	 */
	exitStringLiteral?: (ctx: StringLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `numberLiteral`
	 * labeled alternative in `cqlParser.literal`.
	 * @param ctx the parse tree
	 */
	enterNumberLiteral?: (ctx: NumberLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `numberLiteral`
	 * labeled alternative in `cqlParser.literal`.
	 * @param ctx the parse tree
	 */
	exitNumberLiteral?: (ctx: NumberLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `longNumberLiteral`
	 * labeled alternative in `cqlParser.literal`.
	 * @param ctx the parse tree
	 */
	enterLongNumberLiteral?: (ctx: LongNumberLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `longNumberLiteral`
	 * labeled alternative in `cqlParser.literal`.
	 * @param ctx the parse tree
	 */
	exitLongNumberLiteral?: (ctx: LongNumberLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `dateTimeLiteral`
	 * labeled alternative in `cqlParser.literal`.
	 * @param ctx the parse tree
	 */
	enterDateTimeLiteral?: (ctx: DateTimeLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `dateTimeLiteral`
	 * labeled alternative in `cqlParser.literal`.
	 * @param ctx the parse tree
	 */
	exitDateTimeLiteral?: (ctx: DateTimeLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `dateLiteral`
	 * labeled alternative in `cqlParser.literal`.
	 * @param ctx the parse tree
	 */
	enterDateLiteral?: (ctx: DateLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `dateLiteral`
	 * labeled alternative in `cqlParser.literal`.
	 * @param ctx the parse tree
	 */
	exitDateLiteral?: (ctx: DateLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `timeLiteral`
	 * labeled alternative in `cqlParser.literal`.
	 * @param ctx the parse tree
	 */
	enterTimeLiteral?: (ctx: TimeLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `timeLiteral`
	 * labeled alternative in `cqlParser.literal`.
	 * @param ctx the parse tree
	 */
	exitTimeLiteral?: (ctx: TimeLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `quantityLiteral`
	 * labeled alternative in `cqlParser.literal`.
	 * @param ctx the parse tree
	 */
	enterQuantityLiteral?: (ctx: QuantityLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `quantityLiteral`
	 * labeled alternative in `cqlParser.literal`.
	 * @param ctx the parse tree
	 */
	exitQuantityLiteral?: (ctx: QuantityLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `ratioLiteral`
	 * labeled alternative in `cqlParser.literal`.
	 * @param ctx the parse tree
	 */
	enterRatioLiteral?: (ctx: RatioLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `ratioLiteral`
	 * labeled alternative in `cqlParser.literal`.
	 * @param ctx the parse tree
	 */
	exitRatioLiteral?: (ctx: RatioLiteralContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.externalConstant`.
	 * @param ctx the parse tree
	 */
	enterExternalConstant?: (ctx: ExternalConstantContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.externalConstant`.
	 * @param ctx the parse tree
	 */
	exitExternalConstant?: (ctx: ExternalConstantContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.intervalSelector`.
	 * @param ctx the parse tree
	 */
	enterIntervalSelector?: (ctx: IntervalSelectorContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.intervalSelector`.
	 * @param ctx the parse tree
	 */
	exitIntervalSelector?: (ctx: IntervalSelectorContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.tupleSelector`.
	 * @param ctx the parse tree
	 */
	enterTupleSelector?: (ctx: TupleSelectorContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.tupleSelector`.
	 * @param ctx the parse tree
	 */
	exitTupleSelector?: (ctx: TupleSelectorContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.tupleElementSelector`.
	 * @param ctx the parse tree
	 */
	enterTupleElementSelector?: (ctx: TupleElementSelectorContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.tupleElementSelector`.
	 * @param ctx the parse tree
	 */
	exitTupleElementSelector?: (ctx: TupleElementSelectorContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.instanceSelector`.
	 * @param ctx the parse tree
	 */
	enterInstanceSelector?: (ctx: InstanceSelectorContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.instanceSelector`.
	 * @param ctx the parse tree
	 */
	exitInstanceSelector?: (ctx: InstanceSelectorContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.instanceElementSelector`.
	 * @param ctx the parse tree
	 */
	enterInstanceElementSelector?: (ctx: InstanceElementSelectorContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.instanceElementSelector`.
	 * @param ctx the parse tree
	 */
	exitInstanceElementSelector?: (ctx: InstanceElementSelectorContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.listSelector`.
	 * @param ctx the parse tree
	 */
	enterListSelector?: (ctx: ListSelectorContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.listSelector`.
	 * @param ctx the parse tree
	 */
	exitListSelector?: (ctx: ListSelectorContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.displayClause`.
	 * @param ctx the parse tree
	 */
	enterDisplayClause?: (ctx: DisplayClauseContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.displayClause`.
	 * @param ctx the parse tree
	 */
	exitDisplayClause?: (ctx: DisplayClauseContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.codeSelector`.
	 * @param ctx the parse tree
	 */
	enterCodeSelector?: (ctx: CodeSelectorContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.codeSelector`.
	 * @param ctx the parse tree
	 */
	exitCodeSelector?: (ctx: CodeSelectorContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.conceptSelector`.
	 * @param ctx the parse tree
	 */
	enterConceptSelector?: (ctx: ConceptSelectorContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.conceptSelector`.
	 * @param ctx the parse tree
	 */
	exitConceptSelector?: (ctx: ConceptSelectorContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.keyword`.
	 * @param ctx the parse tree
	 */
	enterKeyword?: (ctx: KeywordContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.keyword`.
	 * @param ctx the parse tree
	 */
	exitKeyword?: (ctx: KeywordContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.reservedWord`.
	 * @param ctx the parse tree
	 */
	enterReservedWord?: (ctx: ReservedWordContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.reservedWord`.
	 * @param ctx the parse tree
	 */
	exitReservedWord?: (ctx: ReservedWordContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.keywordIdentifier`.
	 * @param ctx the parse tree
	 */
	enterKeywordIdentifier?: (ctx: KeywordIdentifierContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.keywordIdentifier`.
	 * @param ctx the parse tree
	 */
	exitKeywordIdentifier?: (ctx: KeywordIdentifierContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.obsoleteIdentifier`.
	 * @param ctx the parse tree
	 */
	enterObsoleteIdentifier?: (ctx: ObsoleteIdentifierContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.obsoleteIdentifier`.
	 * @param ctx the parse tree
	 */
	exitObsoleteIdentifier?: (ctx: ObsoleteIdentifierContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.functionIdentifier`.
	 * @param ctx the parse tree
	 */
	enterFunctionIdentifier?: (ctx: FunctionIdentifierContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.functionIdentifier`.
	 * @param ctx the parse tree
	 */
	exitFunctionIdentifier?: (ctx: FunctionIdentifierContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.typeNameIdentifier`.
	 * @param ctx the parse tree
	 */
	enterTypeNameIdentifier?: (ctx: TypeNameIdentifierContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.typeNameIdentifier`.
	 * @param ctx the parse tree
	 */
	exitTypeNameIdentifier?: (ctx: TypeNameIdentifierContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.referentialIdentifier`.
	 * @param ctx the parse tree
	 */
	enterReferentialIdentifier?: (ctx: ReferentialIdentifierContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.referentialIdentifier`.
	 * @param ctx the parse tree
	 */
	exitReferentialIdentifier?: (ctx: ReferentialIdentifierContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.referentialOrTypeNameIdentifier`.
	 * @param ctx the parse tree
	 */
	enterReferentialOrTypeNameIdentifier?: (ctx: ReferentialOrTypeNameIdentifierContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.referentialOrTypeNameIdentifier`.
	 * @param ctx the parse tree
	 */
	exitReferentialOrTypeNameIdentifier?: (ctx: ReferentialOrTypeNameIdentifierContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.identifierOrFunctionIdentifier`.
	 * @param ctx the parse tree
	 */
	enterIdentifierOrFunctionIdentifier?: (ctx: IdentifierOrFunctionIdentifierContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.identifierOrFunctionIdentifier`.
	 * @param ctx the parse tree
	 */
	exitIdentifierOrFunctionIdentifier?: (ctx: IdentifierOrFunctionIdentifierContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.identifier`.
	 * @param ctx the parse tree
	 */
	enterIdentifier?: (ctx: IdentifierContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.identifier`.
	 * @param ctx the parse tree
	 */
	exitIdentifier?: (ctx: IdentifierContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.entireExpression`.
	 * @param ctx the parse tree
	 */
	enterEntireExpression?: (ctx: EntireExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.entireExpression`.
	 * @param ctx the parse tree
	 */
	exitEntireExpression?: (ctx: EntireExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `sortDirectionArgument`
	 * labeled alternative in `cqlParser.sortArgument`.
	 * @param ctx the parse tree
	 */
	enterSortDirectionArgument?: (ctx: SortDirectionArgumentContext) => void;
	/**
	 * Exit a parse tree produced by the `sortDirectionArgument`
	 * labeled alternative in `cqlParser.sortArgument`.
	 * @param ctx the parse tree
	 */
	exitSortDirectionArgument?: (ctx: SortDirectionArgumentContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.paramList`.
	 * @param ctx the parse tree
	 */
	enterParamList?: (ctx: ParamListContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.paramList`.
	 * @param ctx the parse tree
	 */
	exitParamList?: (ctx: ParamListContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.quantity`.
	 * @param ctx the parse tree
	 */
	enterQuantity?: (ctx: QuantityContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.quantity`.
	 * @param ctx the parse tree
	 */
	exitQuantity?: (ctx: QuantityContext) => void;
	/**
	 * Enter a parse tree produced by `cqlParser.unit`.
	 * @param ctx the parse tree
	 */
	enterUnit?: (ctx: UnitContext) => void;
	/**
	 * Exit a parse tree produced by `cqlParser.unit`.
	 * @param ctx the parse tree
	 */
	exitUnit?: (ctx: UnitContext) => void;
}

