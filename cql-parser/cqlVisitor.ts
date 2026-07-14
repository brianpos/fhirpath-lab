// Generated from cql.g4 by ANTLR 4.13.2

import {ParseTreeVisitor} from 'antlr4';


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
 * This interface defines a complete generic visitor for a parse tree produced
 * by `cqlParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export default class cqlVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `cqlParser.library`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLibrary?: (ctx: LibraryContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.directive`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDirective?: (ctx: DirectiveContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.definition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDefinition?: (ctx: DefinitionContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.libraryDefinition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLibraryDefinition?: (ctx: LibraryDefinitionContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.usingDefinition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUsingDefinition?: (ctx: UsingDefinitionContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.includeDefinition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIncludeDefinition?: (ctx: IncludeDefinitionContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.localIdentifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLocalIdentifier?: (ctx: LocalIdentifierContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.accessModifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAccessModifier?: (ctx: AccessModifierContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.parameterDefinition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParameterDefinition?: (ctx: ParameterDefinitionContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.codesystemDefinition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCodesystemDefinition?: (ctx: CodesystemDefinitionContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.valuesetDefinition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitValuesetDefinition?: (ctx: ValuesetDefinitionContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.codesystems`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCodesystems?: (ctx: CodesystemsContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.codesystemIdentifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCodesystemIdentifier?: (ctx: CodesystemIdentifierContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.libraryIdentifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLibraryIdentifier?: (ctx: LibraryIdentifierContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.codeDefinition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCodeDefinition?: (ctx: CodeDefinitionContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.conceptDefinition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConceptDefinition?: (ctx: ConceptDefinitionContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.codeIdentifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCodeIdentifier?: (ctx: CodeIdentifierContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.codesystemId`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCodesystemId?: (ctx: CodesystemIdContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.valuesetId`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitValuesetId?: (ctx: ValuesetIdContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.versionSpecifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVersionSpecifier?: (ctx: VersionSpecifierContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.codeId`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCodeId?: (ctx: CodeIdContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.typeSpecifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTypeSpecifier?: (ctx: TypeSpecifierContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.namedTypeSpecifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNamedTypeSpecifier?: (ctx: NamedTypeSpecifierContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.modelIdentifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitModelIdentifier?: (ctx: ModelIdentifierContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.listTypeSpecifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitListTypeSpecifier?: (ctx: ListTypeSpecifierContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.intervalTypeSpecifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIntervalTypeSpecifier?: (ctx: IntervalTypeSpecifierContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.tupleTypeSpecifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTupleTypeSpecifier?: (ctx: TupleTypeSpecifierContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.tupleElementDefinition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTupleElementDefinition?: (ctx: TupleElementDefinitionContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.choiceTypeSpecifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitChoiceTypeSpecifier?: (ctx: ChoiceTypeSpecifierContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStatement?: (ctx: StatementContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.expressionDefinition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpressionDefinition?: (ctx: ExpressionDefinitionContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.contextDefinition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitContextDefinition?: (ctx: ContextDefinitionContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.functionDefinition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunctionDefinition?: (ctx: FunctionDefinitionContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.operandDefinition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOperandDefinition?: (ctx: OperandDefinitionContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.functionBody`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunctionBody?: (ctx: FunctionBodyContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.qualifiedIdentifierOrFunctionIdentifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQualifiedIdentifierOrFunctionIdentifier?: (ctx: QualifiedIdentifierOrFunctionIdentifierContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.contextInfoDefinition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitContextInfoDefinition?: (ctx: ContextInfoDefinitionContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.typeInfoDefinition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTypeInfoDefinition?: (ctx: TypeInfoDefinitionContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.baseTypeSpecifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBaseTypeSpecifier?: (ctx: BaseTypeSpecifierContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.typeElements`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTypeElements?: (ctx: TypeElementsContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.typeElementDefinition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTypeElementDefinition?: (ctx: TypeElementDefinitionContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.typeInfo`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTypeInfo?: (ctx: TypeInfoContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.contextRelationship`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitContextRelationship?: (ctx: ContextRelationshipContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.conversionInfoDefinition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConversionInfoDefinition?: (ctx: ConversionInfoDefinitionContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.querySource`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQuerySource?: (ctx: QuerySourceContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.aliasedQuerySource`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAliasedQuerySource?: (ctx: AliasedQuerySourceContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.alias`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAlias?: (ctx: AliasContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.queryInclusionClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQueryInclusionClause?: (ctx: QueryInclusionClauseContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.withClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWithClause?: (ctx: WithClauseContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.withoutClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWithoutClause?: (ctx: WithoutClauseContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.retrieve`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRetrieve?: (ctx: RetrieveContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.contextIdentifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitContextIdentifier?: (ctx: ContextIdentifierContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.codePath`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCodePath?: (ctx: CodePathContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.codeComparator`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCodeComparator?: (ctx: CodeComparatorContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.terminology`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTerminology?: (ctx: TerminologyContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.qualifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQualifier?: (ctx: QualifierContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.query`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQuery?: (ctx: QueryContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.sourceClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSourceClause?: (ctx: SourceClauseContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.letClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLetClause?: (ctx: LetClauseContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.letClauseItem`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLetClauseItem?: (ctx: LetClauseItemContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.whereClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWhereClause?: (ctx: WhereClauseContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.returnClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReturnClause?: (ctx: ReturnClauseContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.aggregateClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAggregateClause?: (ctx: AggregateClauseContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.startingClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStartingClause?: (ctx: StartingClauseContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.sortClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSortClause?: (ctx: SortClauseContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.sortDirection`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSortDirection?: (ctx: SortDirectionContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.sortByItem`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSortByItem?: (ctx: SortByItemContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.qualifiedIdentifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQualifiedIdentifier?: (ctx: QualifiedIdentifierContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.qualifiedIdentifierExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQualifiedIdentifierExpression?: (ctx: QualifiedIdentifierExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.qualifierExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQualifierExpression?: (ctx: QualifierExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `simplePathIndexer`
	 * labeled alternative in `cqlParser.simplePath`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSimplePathIndexer?: (ctx: SimplePathIndexerContext) => Result;
	/**
	 * Visit a parse tree produced by the `simplePathQualifiedIdentifier`
	 * labeled alternative in `cqlParser.simplePath`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSimplePathQualifiedIdentifier?: (ctx: SimplePathQualifiedIdentifierContext) => Result;
	/**
	 * Visit a parse tree produced by the `simplePathReferentialIdentifier`
	 * labeled alternative in `cqlParser.simplePath`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSimplePathReferentialIdentifier?: (ctx: SimplePathReferentialIdentifierContext) => Result;
	/**
	 * Visit a parse tree produced by the `simpleStringLiteral`
	 * labeled alternative in `cqlParser.simpleLiteral`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSimpleStringLiteral?: (ctx: SimpleStringLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `simpleNumberLiteral`
	 * labeled alternative in `cqlParser.simpleLiteral`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSimpleNumberLiteral?: (ctx: SimpleNumberLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `durationBetweenExpression`
	 * labeled alternative in `cqlParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDurationBetweenExpression?: (ctx: DurationBetweenExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `inFixSetExpression`
	 * labeled alternative in `cqlParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInFixSetExpression?: (ctx: InFixSetExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `retrieveExpression`
	 * labeled alternative in `cqlParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRetrieveExpression?: (ctx: RetrieveExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `timingExpression`
	 * labeled alternative in `cqlParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTimingExpression?: (ctx: TimingExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `queryExpression`
	 * labeled alternative in `cqlParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQueryExpression?: (ctx: QueryExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `notExpression`
	 * labeled alternative in `cqlParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNotExpression?: (ctx: NotExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `booleanExpression`
	 * labeled alternative in `cqlParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBooleanExpression?: (ctx: BooleanExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `orExpression`
	 * labeled alternative in `cqlParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOrExpression?: (ctx: OrExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `castExpression`
	 * labeled alternative in `cqlParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCastExpression?: (ctx: CastExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `andExpression`
	 * labeled alternative in `cqlParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAndExpression?: (ctx: AndExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `betweenExpression`
	 * labeled alternative in `cqlParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBetweenExpression?: (ctx: BetweenExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `membershipExpression`
	 * labeled alternative in `cqlParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMembershipExpression?: (ctx: MembershipExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `differenceBetweenExpression`
	 * labeled alternative in `cqlParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDifferenceBetweenExpression?: (ctx: DifferenceBetweenExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `inequalityExpression`
	 * labeled alternative in `cqlParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInequalityExpression?: (ctx: InequalityExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `equalityExpression`
	 * labeled alternative in `cqlParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEqualityExpression?: (ctx: EqualityExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `existenceExpression`
	 * labeled alternative in `cqlParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExistenceExpression?: (ctx: ExistenceExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `impliesExpression`
	 * labeled alternative in `cqlParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitImpliesExpression?: (ctx: ImpliesExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `termExpression`
	 * labeled alternative in `cqlParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTermExpression?: (ctx: TermExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `typeExpression`
	 * labeled alternative in `cqlParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTypeExpression?: (ctx: TypeExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.dateTimePrecision`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDateTimePrecision?: (ctx: DateTimePrecisionContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.dateTimeComponent`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDateTimeComponent?: (ctx: DateTimeComponentContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.pluralDateTimePrecision`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPluralDateTimePrecision?: (ctx: PluralDateTimePrecisionContext) => Result;
	/**
	 * Visit a parse tree produced by the `additionExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAdditionExpressionTerm?: (ctx: AdditionExpressionTermContext) => Result;
	/**
	 * Visit a parse tree produced by the `indexedExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIndexedExpressionTerm?: (ctx: IndexedExpressionTermContext) => Result;
	/**
	 * Visit a parse tree produced by the `widthExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWidthExpressionTerm?: (ctx: WidthExpressionTermContext) => Result;
	/**
	 * Visit a parse tree produced by the `setAggregateExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSetAggregateExpressionTerm?: (ctx: SetAggregateExpressionTermContext) => Result;
	/**
	 * Visit a parse tree produced by the `timeUnitExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTimeUnitExpressionTerm?: (ctx: TimeUnitExpressionTermContext) => Result;
	/**
	 * Visit a parse tree produced by the `ifThenElseExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIfThenElseExpressionTerm?: (ctx: IfThenElseExpressionTermContext) => Result;
	/**
	 * Visit a parse tree produced by the `timeBoundaryExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTimeBoundaryExpressionTerm?: (ctx: TimeBoundaryExpressionTermContext) => Result;
	/**
	 * Visit a parse tree produced by the `elementExtractorExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitElementExtractorExpressionTerm?: (ctx: ElementExtractorExpressionTermContext) => Result;
	/**
	 * Visit a parse tree produced by the `conversionExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConversionExpressionTerm?: (ctx: ConversionExpressionTermContext) => Result;
	/**
	 * Visit a parse tree produced by the `typeExtentExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTypeExtentExpressionTerm?: (ctx: TypeExtentExpressionTermContext) => Result;
	/**
	 * Visit a parse tree produced by the `predecessorExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPredecessorExpressionTerm?: (ctx: PredecessorExpressionTermContext) => Result;
	/**
	 * Visit a parse tree produced by the `pointExtractorExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPointExtractorExpressionTerm?: (ctx: PointExtractorExpressionTermContext) => Result;
	/**
	 * Visit a parse tree produced by the `multiplicationExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMultiplicationExpressionTerm?: (ctx: MultiplicationExpressionTermContext) => Result;
	/**
	 * Visit a parse tree produced by the `aggregateExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAggregateExpressionTerm?: (ctx: AggregateExpressionTermContext) => Result;
	/**
	 * Visit a parse tree produced by the `durationExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDurationExpressionTerm?: (ctx: DurationExpressionTermContext) => Result;
	/**
	 * Visit a parse tree produced by the `differenceExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDifferenceExpressionTerm?: (ctx: DifferenceExpressionTermContext) => Result;
	/**
	 * Visit a parse tree produced by the `caseExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCaseExpressionTerm?: (ctx: CaseExpressionTermContext) => Result;
	/**
	 * Visit a parse tree produced by the `powerExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPowerExpressionTerm?: (ctx: PowerExpressionTermContext) => Result;
	/**
	 * Visit a parse tree produced by the `successorExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSuccessorExpressionTerm?: (ctx: SuccessorExpressionTermContext) => Result;
	/**
	 * Visit a parse tree produced by the `polarityExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPolarityExpressionTerm?: (ctx: PolarityExpressionTermContext) => Result;
	/**
	 * Visit a parse tree produced by the `termExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTermExpressionTerm?: (ctx: TermExpressionTermContext) => Result;
	/**
	 * Visit a parse tree produced by the `invocationExpressionTerm`
	 * labeled alternative in `cqlParser.expressionTerm`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInvocationExpressionTerm?: (ctx: InvocationExpressionTermContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.caseExpressionItem`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCaseExpressionItem?: (ctx: CaseExpressionItemContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.dateTimePrecisionSpecifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDateTimePrecisionSpecifier?: (ctx: DateTimePrecisionSpecifierContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.relativeQualifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRelativeQualifier?: (ctx: RelativeQualifierContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.offsetRelativeQualifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOffsetRelativeQualifier?: (ctx: OffsetRelativeQualifierContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.exclusiveRelativeQualifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExclusiveRelativeQualifier?: (ctx: ExclusiveRelativeQualifierContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.quantityOffset`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQuantityOffset?: (ctx: QuantityOffsetContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.temporalRelationship`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTemporalRelationship?: (ctx: TemporalRelationshipContext) => Result;
	/**
	 * Visit a parse tree produced by the `concurrentWithIntervalOperatorPhrase`
	 * labeled alternative in `cqlParser.intervalOperatorPhrase`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConcurrentWithIntervalOperatorPhrase?: (ctx: ConcurrentWithIntervalOperatorPhraseContext) => Result;
	/**
	 * Visit a parse tree produced by the `includesIntervalOperatorPhrase`
	 * labeled alternative in `cqlParser.intervalOperatorPhrase`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIncludesIntervalOperatorPhrase?: (ctx: IncludesIntervalOperatorPhraseContext) => Result;
	/**
	 * Visit a parse tree produced by the `includedInIntervalOperatorPhrase`
	 * labeled alternative in `cqlParser.intervalOperatorPhrase`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIncludedInIntervalOperatorPhrase?: (ctx: IncludedInIntervalOperatorPhraseContext) => Result;
	/**
	 * Visit a parse tree produced by the `beforeOrAfterIntervalOperatorPhrase`
	 * labeled alternative in `cqlParser.intervalOperatorPhrase`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBeforeOrAfterIntervalOperatorPhrase?: (ctx: BeforeOrAfterIntervalOperatorPhraseContext) => Result;
	/**
	 * Visit a parse tree produced by the `withinIntervalOperatorPhrase`
	 * labeled alternative in `cqlParser.intervalOperatorPhrase`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWithinIntervalOperatorPhrase?: (ctx: WithinIntervalOperatorPhraseContext) => Result;
	/**
	 * Visit a parse tree produced by the `meetsIntervalOperatorPhrase`
	 * labeled alternative in `cqlParser.intervalOperatorPhrase`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMeetsIntervalOperatorPhrase?: (ctx: MeetsIntervalOperatorPhraseContext) => Result;
	/**
	 * Visit a parse tree produced by the `overlapsIntervalOperatorPhrase`
	 * labeled alternative in `cqlParser.intervalOperatorPhrase`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOverlapsIntervalOperatorPhrase?: (ctx: OverlapsIntervalOperatorPhraseContext) => Result;
	/**
	 * Visit a parse tree produced by the `startsIntervalOperatorPhrase`
	 * labeled alternative in `cqlParser.intervalOperatorPhrase`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStartsIntervalOperatorPhrase?: (ctx: StartsIntervalOperatorPhraseContext) => Result;
	/**
	 * Visit a parse tree produced by the `endsIntervalOperatorPhrase`
	 * labeled alternative in `cqlParser.intervalOperatorPhrase`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEndsIntervalOperatorPhrase?: (ctx: EndsIntervalOperatorPhraseContext) => Result;
	/**
	 * Visit a parse tree produced by the `invocationTerm`
	 * labeled alternative in `cqlParser.term`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInvocationTerm?: (ctx: InvocationTermContext) => Result;
	/**
	 * Visit a parse tree produced by the `literalTerm`
	 * labeled alternative in `cqlParser.term`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLiteralTerm?: (ctx: LiteralTermContext) => Result;
	/**
	 * Visit a parse tree produced by the `externalConstantTerm`
	 * labeled alternative in `cqlParser.term`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExternalConstantTerm?: (ctx: ExternalConstantTermContext) => Result;
	/**
	 * Visit a parse tree produced by the `intervalSelectorTerm`
	 * labeled alternative in `cqlParser.term`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIntervalSelectorTerm?: (ctx: IntervalSelectorTermContext) => Result;
	/**
	 * Visit a parse tree produced by the `tupleSelectorTerm`
	 * labeled alternative in `cqlParser.term`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTupleSelectorTerm?: (ctx: TupleSelectorTermContext) => Result;
	/**
	 * Visit a parse tree produced by the `instanceSelectorTerm`
	 * labeled alternative in `cqlParser.term`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInstanceSelectorTerm?: (ctx: InstanceSelectorTermContext) => Result;
	/**
	 * Visit a parse tree produced by the `listSelectorTerm`
	 * labeled alternative in `cqlParser.term`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitListSelectorTerm?: (ctx: ListSelectorTermContext) => Result;
	/**
	 * Visit a parse tree produced by the `codeSelectorTerm`
	 * labeled alternative in `cqlParser.term`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCodeSelectorTerm?: (ctx: CodeSelectorTermContext) => Result;
	/**
	 * Visit a parse tree produced by the `conceptSelectorTerm`
	 * labeled alternative in `cqlParser.term`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConceptSelectorTerm?: (ctx: ConceptSelectorTermContext) => Result;
	/**
	 * Visit a parse tree produced by the `parenthesizedTerm`
	 * labeled alternative in `cqlParser.term`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParenthesizedTerm?: (ctx: ParenthesizedTermContext) => Result;
	/**
	 * Visit a parse tree produced by the `qualifiedMemberInvocation`
	 * labeled alternative in `cqlParser.qualifiedInvocation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQualifiedMemberInvocation?: (ctx: QualifiedMemberInvocationContext) => Result;
	/**
	 * Visit a parse tree produced by the `qualifiedFunctionInvocation`
	 * labeled alternative in `cqlParser.qualifiedInvocation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQualifiedFunctionInvocation?: (ctx: QualifiedFunctionInvocationContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.qualifiedFunction`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQualifiedFunction?: (ctx: QualifiedFunctionContext) => Result;
	/**
	 * Visit a parse tree produced by the `memberInvocation`
	 * labeled alternative in `cqlParser.invocation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMemberInvocation?: (ctx: MemberInvocationContext) => Result;
	/**
	 * Visit a parse tree produced by the `functionInvocation`
	 * labeled alternative in `cqlParser.invocation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunctionInvocation?: (ctx: FunctionInvocationContext) => Result;
	/**
	 * Visit a parse tree produced by the `thisInvocation`
	 * labeled alternative in `cqlParser.invocation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitThisInvocation?: (ctx: ThisInvocationContext) => Result;
	/**
	 * Visit a parse tree produced by the `indexInvocation`
	 * labeled alternative in `cqlParser.invocation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIndexInvocation?: (ctx: IndexInvocationContext) => Result;
	/**
	 * Visit a parse tree produced by the `totalInvocation`
	 * labeled alternative in `cqlParser.invocation`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTotalInvocation?: (ctx: TotalInvocationContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.function`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunction?: (ctx: FunctionContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.ratio`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRatio?: (ctx: RatioContext) => Result;
	/**
	 * Visit a parse tree produced by the `booleanLiteral`
	 * labeled alternative in `cqlParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBooleanLiteral?: (ctx: BooleanLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `nullLiteral`
	 * labeled alternative in `cqlParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNullLiteral?: (ctx: NullLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `stringLiteral`
	 * labeled alternative in `cqlParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStringLiteral?: (ctx: StringLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `numberLiteral`
	 * labeled alternative in `cqlParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumberLiteral?: (ctx: NumberLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `longNumberLiteral`
	 * labeled alternative in `cqlParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLongNumberLiteral?: (ctx: LongNumberLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `dateTimeLiteral`
	 * labeled alternative in `cqlParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDateTimeLiteral?: (ctx: DateTimeLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `dateLiteral`
	 * labeled alternative in `cqlParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDateLiteral?: (ctx: DateLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `timeLiteral`
	 * labeled alternative in `cqlParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTimeLiteral?: (ctx: TimeLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `quantityLiteral`
	 * labeled alternative in `cqlParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQuantityLiteral?: (ctx: QuantityLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by the `ratioLiteral`
	 * labeled alternative in `cqlParser.literal`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRatioLiteral?: (ctx: RatioLiteralContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.externalConstant`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExternalConstant?: (ctx: ExternalConstantContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.intervalSelector`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIntervalSelector?: (ctx: IntervalSelectorContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.tupleSelector`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTupleSelector?: (ctx: TupleSelectorContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.tupleElementSelector`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTupleElementSelector?: (ctx: TupleElementSelectorContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.instanceSelector`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInstanceSelector?: (ctx: InstanceSelectorContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.instanceElementSelector`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInstanceElementSelector?: (ctx: InstanceElementSelectorContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.listSelector`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitListSelector?: (ctx: ListSelectorContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.displayClause`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDisplayClause?: (ctx: DisplayClauseContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.codeSelector`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCodeSelector?: (ctx: CodeSelectorContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.conceptSelector`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitConceptSelector?: (ctx: ConceptSelectorContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.keyword`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitKeyword?: (ctx: KeywordContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.reservedWord`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReservedWord?: (ctx: ReservedWordContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.keywordIdentifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitKeywordIdentifier?: (ctx: KeywordIdentifierContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.obsoleteIdentifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitObsoleteIdentifier?: (ctx: ObsoleteIdentifierContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.functionIdentifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunctionIdentifier?: (ctx: FunctionIdentifierContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.typeNameIdentifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTypeNameIdentifier?: (ctx: TypeNameIdentifierContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.referentialIdentifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReferentialIdentifier?: (ctx: ReferentialIdentifierContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.referentialOrTypeNameIdentifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitReferentialOrTypeNameIdentifier?: (ctx: ReferentialOrTypeNameIdentifierContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.identifierOrFunctionIdentifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIdentifierOrFunctionIdentifier?: (ctx: IdentifierOrFunctionIdentifierContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIdentifier?: (ctx: IdentifierContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.entireExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEntireExpression?: (ctx: EntireExpressionContext) => Result;
	/**
	 * Visit a parse tree produced by the `sortDirectionArgument`
	 * labeled alternative in `cqlParser.sortArgument`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSortDirectionArgument?: (ctx: SortDirectionArgumentContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.paramList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParamList?: (ctx: ParamListContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.quantity`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitQuantity?: (ctx: QuantityContext) => Result;
	/**
	 * Visit a parse tree produced by `cqlParser.unit`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnit?: (ctx: UnitContext) => Result;
}

