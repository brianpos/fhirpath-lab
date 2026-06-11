// FHIRPath expression validator visitor.
//
// Walks the ANTLR parse tree produced by `fhirpath-parser/`, computes the
// expected return type and cardinality of every node, and produces:
//   - an annotated AST (`JsonNode`) compatible with what the .NET FhirPath
//     validator emits (consumed by `components/ParseTreeTab.vue`).
//   - a list of `Diagnostic` records carrying expression positions, which the
//     public `validateFhirpathExpression()` API in `fhirpath_validator.ts`
//     converts into a FHIR `OperationOutcome`.
//
// Modeled on
//   https://github.com/brianpos/Hl7.Fhir.FhirPath.Validator/blob/master/src/Hl7.Fhir.Base.FhirPath.Validator/BaseFhirPathExpressionVisitor.cs
// but driven by data — the spec's `functions.json` / `operations.json` —
// instead of a hard-coded symbol table.

import antlr4, { ParserRuleContext, Token } from "antlr4";
import Lexer from "../fhirpath-parser/fhirpathLexer";
import Parser, {
    AdditiveExpressionContext,
    AndExpressionContext,
    BooleanLiteralContext,
    DateLiteralContext,
    DateTimeLiteralContext,
    EntireExpressionContext,
    EqualityExpressionContext,
    ExpressionContext,
    ExternalConstantContext,
    ExternalConstantTermContext,
    FunctionContext,
    FunctionInvocationContext,
    IdentifierContext,
    ImpliesExpressionContext,
    IndexerExpressionContext,
    IndexInvocationContext,
    InequalityExpressionContext,
    InvocationContext,
    InvocationExpressionContext,
    InvocationTermContext,
    LiteralContext,
    LiteralTermContext,
    LongNumberLiteralContext,
    MemberInvocationContext,
    MembershipExpressionContext,
    MultiplicativeExpressionContext,
    NullLiteralContext,
    NumberLiteralContext,
    OrExpressionContext,
    ParamListContext,
    ParenthesizedTermContext,
    PolarityExpressionContext,
    QuantityContext,
    QuantityLiteralContext,
    SortDirectionArgumentContext,
    StringLiteralContext,
    TermExpressionContext,
    ThisInvocationContext,
    TimeLiteralContext,
    TotalInvocationContext,
    TypeExpressionContext,
    TypeSpecifierContext,
    UnionExpressionContext,
} from "../fhirpath-parser/fhirpathParser";

import type { TypeModel, ElementModel } from "./custom_model";
import {
    functionsByName,
    operationsByName,
    decodeTypeMapping,
    splitTypeUnion,
    isSpecSystemType,
} from "./fhirpath-spec";
import type { FunctionArgumentDef, FunctionDef, OperationDef } from "./fhirpath-spec/types";
import {
    BUILTIN_ENV_VARS_BY_NAME,
    IMPLICIT_CONVERSIONS,
    isAssignable,
    isSystemType,
    SAME_TYPE_COLLECTION_FUNCTIONS,
    SAME_TYPE_SINGLE_FUNCTIONS,
} from "./fhirpath-spec/builtins";

/** A function argument is evaluated as a scoped lambda (with `$this` rebound to
 *  each input element) iff the spec declares its type as "expression" — see
 *  https://hl7.org/fhirpath/#scoped-functions. The spec uses both lower-case
 *  ("expression") and capitalised ("Expression") spellings, so match
 *  case-insensitively. Non-expression arguments (e.g. `trace`'s `name : String`,
 *  `aggregate`'s `init : value`, `defineVariable`'s `value : collection`,
 *  `iif`'s branches typed as `collection`) are evaluated in the current
 *  lexical scope without rebinding `$this`. */
function isScopedExpressionArg(argDef: FunctionArgumentDef | undefined): boolean {
    return !!argDef && argDef.type.toLowerCase() === "expression";
}

// ---- Public types ----------------------------------------------------------

/** Severity for a validator diagnostic. Mirrors FHIR `OperationOutcome.issue.severity`. */
export type DiagnosticSeverity = "error" | "warning" | "information";

/** A single validator diagnostic, with enough information to produce both an
 *  `OperationOutcome.issue` and an editor marker. */
export interface Diagnostic {
    severity: DiagnosticSeverity;
    /** A short stable code, e.g. "prop-not-found", "func-input-mismatch". */
    code: string;
    /** Human-readable message. */
    message: string;
    /** Character offset (0-based) into the original expression text. */
    position: number;
    /** Length of the offending sub-expression in characters. */
    length: number;
    /** 1-based line number of the offending token. */
    line: number;
    /** 1-based column number of the offending token. */
    column: number;
    /** The exact sub-expression text. */
    expression: string;
}

/** Annotated AST node, byte-compatible with the JsonNode shape produced by the
 *  .NET FHIRPath validator and consumed by `components/ParseTreeTab.vue`. */
export interface JsonNode {
    ExpressionType: string;
    Name: string;
    Arguments?: JsonNode[];
    /** Joined union ("string | dateTime") or "" when not yet calculated. */
    ReturnType?: string;
    Position?: number;
    Length?: number;
    Line?: number;
    Column?: number;
    /** Optional URL pointing at the relevant section of the FHIRPath spec. */
    SpecUrl?: string;
}

/** Visitor input/output: a candidate set of types and the cardinality of the
 *  collection at this point in the expression. */
export interface FhirPathValue {
    /** TypeModel candidates for the value. Empty collection => unknown/error. */
    types: TypeModel[];
    /** True if the value can be a collection of more than one item. */
    isCollection: boolean;
}

/** Lookup hooks for the visitor. The dictionaries are version-specific and are
 *  produced by `helpers/models/generated/<version>/`. */
export interface ModelProvider {
    /** Lookup a TypeModel by TypeName (System.* and same-version FHIR types). */
    lookupByTypeName(name: string): TypeModel | undefined;
    /** Lookup a TypeModel by canonical URL (used for Reference targetProfile). */
    lookupByUrl?(url: string): TypeModel | undefined;
    /** Map from FHIR primitive container TypeName (e.g. "string") to the System
     *  type its `.value` element points at. Used when comparing the spec's
     *  System.* tokens against FHIR-typed values. */
    fhirPrimitiveToSystemTypeName?: Record<string, string>;
}

/** Public options for `validateFhirpathExpression` / `runVisitor`. */
export interface VisitorOptions {
    /** Optional context type the expression is rooted at. If absent, the root
     *  is treated as the empty `{}` (unknown) type and only spec-typed
     *  operations succeed. */
    contextType?: TypeModel;
    /** Whether the root is a collection (default: false — single context node). */
    contextIsCollection?: boolean;
    /** Pre-computed multi-type context (takes precedence over `contextType`).
     *  Used by `validateFhirpathExpression` when a context expression has
     *  already been evaluated through the visitor. */
    contextValue?: FhirPathValue;
    /** Additional environment variables (canonical name without leading `%`). */
    environmentVariables?: Record<string, FhirPathValue>;
    /** Type of the input resource — surfaced as `%resource`. Per the FHIRPath
     *  spec (https://build.fhir.org/ig/HL7/FHIRPath/#scoped-functions),
     *  `%resource` is the resource the expression is being evaluated against,
     *  *not* the current focus. When omitted, falls back to `contextType` if
     *  it resolves to a Resource. */
    resource?: FhirPathValue;
    /** Type of the container resource — surfaced as `%rootResource` (e.g. the
     *  Bundle when evaluating an expression rooted at one of its entries).
     *  When omitted, defaults to `resource`. */
    rootResource?: FhirPathValue;
}

/** Result returned by `runVisitor`. */
export interface VisitorResult {
    /** Annotated AST tree (root). */
    parseDebugTree: JsonNode | undefined;
    /** Joined union of types the whole expression evaluates to. */
    expectedReturnType: string;
    /** Cardinality of the whole expression. */
    expectedReturnIsCollection: boolean;
    /** All diagnostics gathered during the walk. */
    diagnostics: Diagnostic[];
    /** Syntax errors from the parser (always emitted before semantic checks). */
    syntaxErrors: Diagnostic[];
}

// ---- Internal helpers ------------------------------------------------------

const EMPTY_VALUE: FhirPathValue = Object.freeze({ types: [], isCollection: false });

/** ANTLR error listener that gathers parser/lexer syntax errors as Diagnostics. */
class CollectingErrorListener {
    public errors: Diagnostic[] = [];
    constructor(private readonly source: string) {}
    syntaxError = (
        _recognizer: unknown,
        offendingSymbol: Token | null,
        line: number,
        column: number,
        msg: string,
    ): void => {
        let position = 0;
        let length = 1;
        if (offendingSymbol && typeof offendingSymbol.start === "number") {
            position = offendingSymbol.start;
            length = Math.max(1, (offendingSymbol.stop ?? offendingSymbol.start) - offendingSymbol.start + 1);
        } else {
            // Fallback: walk lines to compute offset
            const lines = this.source.split("\n");
            for (let i = 0; i < line - 1 && i < lines.length; i++) {
                position += lines[i].length + 1;
            }
            position += column;
        }
        this.errors.push({
            severity: "error",
            code: "syntax",
            message: msg,
            position,
            length,
            line,
            column: column + 1,
            expression: this.source.substring(position, position + length),
        });
    };
    reportAmbiguity = (): void => {};
    reportAttemptingFullContext = (): void => {};
    reportContextSensitivity = (): void => {};
}

/** Compute a stable "joined union" string for a list of TypeModels. */
function joinTypeNames(types: TypeModel[]): string {
    if (types.length === 0) return "";
    const seen = new Set<string>();
    const out: string[] = [];
    for (const t of types) {
        const n = displayTypeName(t);
        if (!seen.has(n)) {
            seen.add(n);
            out.push(n);
        }
    }
    return out.join(" | ");
}

/** Format the displayed `ReturnType` for a JsonNode. Collections are suffixed
 *  with `[]` (or `(<union>)[]` when more than one type is present) so the
 *  Parse Tree tab and downstream consumers can see at a glance which nodes
 *  produce more than one item. Mirrors the convention used by the .NET
 *  validator's debug output. */
function formatReturnType(types: TypeModel[], isCollection: boolean): string {
    const base = joinTypeNames(types);
    if (!base) return "";
    if (!isCollection) return base;
    // Wrap in parens so `string | dateTime` becomes `(string | dateTime)[]`.
    return base.includes(" | ") ? `(${base})[]` : `${base}[]`;
}

/** Same as `formatReturnType` but for a `FhirPathValue`. */
function formatValueType(v: FhirPathValue): string {
    return formatReturnType(v.types, v.isCollection);
}

function stripSystemPrefix(name: string): string {
    return name.startsWith("System.") ? name.substring(7) : name;
}

/** Display name used in the JsonNode tree (lowercased system types,
 *  matching what the .NET validator emits — "string" not "String"). */
function displayTypeName(t: TypeModel): string {
    if (t.TypeName.startsWith("System.")) {
        const bare = t.TypeName.substring(7);
        return bare.charAt(0).toLowerCase() + bare.substring(1);
    }
    return t.TypeName;
}

function nodeStart(ctx: ParserRuleContext): { position: number; length: number; line: number; column: number } {
    const start = ctx.start;
    const stop = ctx.stop ?? ctx.start;
    const position = start ? start.start : 0;
    const stopChar = stop ? stop.stop : position;
    const length = Math.max(0, stopChar - position + 1);
    return {
        position,
        length,
        line: start ? start.line : 1,
        column: start ? start.column + 1 : 1,
    };
}

function attachPosition(node: JsonNode, ctx: ParserRuleContext): JsonNode {
    const p = nodeStart(ctx);
    node.Position = p.position;
    node.Length = p.length;
    node.Line = p.line;
    node.Column = p.column;
    return node;
}

/** True if the spec's named type matches the given TypeModel.
 *  - `Any` always matches.
 *  - System.* names (e.g. "Integer") match either the System type or a FHIR
 *    primitive container whose `.value` element points at it.
 *  - "Complex" matches any non-primitive type.
 *  - Plain FHIR type names match exactly.
 */
function specTypeMatches(specName: string, t: TypeModel, provider: ModelProvider): boolean {
    if (specName === "Any") return true;
    if (specName === "Complex") return !t.IsPrimitive && !isFhirPrimitiveContainer(t);
    if (specName === "value") return true; // used by some spec fns; means "any single value"
    const target = stripSystemPrefix(t.TypeName);
    if (target === specName) return true;
    // Map FHIR primitive containers to System.* equivalents
    if (isSpecSystemType(specName)) {
        const sys = systemNameOfFhirPrimitive(t, provider);
        if (sys && sys === specName) return true;
    }
    return false;
}

/** True if `t` is a FHIR primitive container (e.g. `string`, `dateTime`). */
function isFhirPrimitiveContainer(t: TypeModel): boolean {
    if (t.IsPrimitive) return false;
    // FHIR primitives have a single `value` element pointing at System.*.
    if (t.Elements.length !== 1) return false;
    const v = t.Elements[0];
    if (v.ElementName !== "value") return false;
    return v.Type.some((tt) => tt.TypeName.startsWith("System."));
}

function systemNameOfFhirPrimitive(t: TypeModel, _provider: ModelProvider): string | undefined {
    if (t.IsPrimitive) return stripSystemPrefix(t.TypeName); // already a System.* type
    if (!isFhirPrimitiveContainer(t)) return undefined;
    const v = t.Elements[0];
    const sysRef = v.Type.find((tt) => tt.TypeName.startsWith("System."));
    if (sysRef) return sysRef.TypeName.substring("System.".length);
    return undefined;
}

/** Resolve a TypeModel by spec name, preferring System.* types. */
function resolveSpecType(specName: string, provider: ModelProvider): TypeModel | undefined {
    if (isSpecSystemType(specName)) {
        return provider.lookupByTypeName("System." + specName);
    }
    return provider.lookupByTypeName(specName);
}

/** Walk the type-mapping rows of a function/operation and pick the one whose
 *  left side (input type) is compatible with `inputType`. Returns the result
 *  type name from the matching row, or undefined if no row matched. */
function selectFunctionTypeMapping(
    def: FunctionDef,
    inputType: TypeModel | undefined,
    provider: ModelProvider,
): string | undefined {
    if (def.typeMapping.length === 0) {
        // returnType is the source of truth.
        return def.returnType;
    }
    const inputSysName = inputType ? systemNameOfFhirPrimitive(inputType, provider) : undefined;
    const inputDisplay = inputType ? stripSystemPrefix(inputType.TypeName) : undefined;
    for (const tm of def.typeMapping) {
        const sig = decodeTypeMapping(tm);
        if (!sig) continue;
        const left = sig.left;
        if (left === "Any") return sig.right;
        if (!inputType) continue;
        if (left === inputDisplay) return sig.right;
        if (inputSysName && left === inputSysName) return sig.right;
        // Check implicit conversions (e.g. Integer accepted where Decimal expected)
        if (inputSysName && IMPLICIT_CONVERSIONS[inputSysName]?.has(left)) return sig.right;
    }
    return undefined;
}

function selectOperationOverload(
    overloads: ReadonlyArray<OperationDef>,
    left: FhirPathValue,
    right: FhirPathValue | undefined,
    provider: ModelProvider,
): { def: OperationDef; result: string } | undefined {
    const leftNames = left.types.map((t) => systemNameOfFhirPrimitive(t, provider) ?? stripSystemPrefix(t.TypeName));
    const rightNames = right
        ? right.types.map((t) => systemNameOfFhirPrimitive(t, provider) ?? stripSystemPrefix(t.TypeName))
        : [];

    for (const def of overloads) {
        if (!def.leftArgument || def.leftArgument === "None") continue; // unary handled separately
        const leftAccepts = splitTypeUnion(def.leftArgument);
        const rightAccepts = splitTypeUnion(def.rightArgument);
        const leftOk =
            leftNames.length === 0 ||
            leftAccepts.includes("Any") ||
            leftAccepts.includes("collection") ||
            leftNames.some((n) => leftAccepts.includes(n) || leftAccepts.some((a) => isAssignable(n, a)));
        if (!leftOk) continue;
        if (right) {
            const rightOk =
                rightNames.length === 0 ||
                rightAccepts.includes("Any") ||
                rightAccepts.includes("collection") ||
                rightAccepts.includes("type specifier") ||
                rightNames.some((n) => rightAccepts.includes(n) || rightAccepts.some((a) => isAssignable(n, a)));
            if (!rightOk) continue;
        }
        // Verify a typeMapping row matches if available; the row pair is
        // `Left-Right` (operand pair). The result type comes from `returnType`,
        // which may be a single type or a union. For unions we widen the
        // operand pair using the implicit-conversion ladder.
        let rowMatched = def.typeMapping.length === 0;
        let widenedTo: string | undefined;
        if (def.typeMapping.length > 0 && (leftNames.length > 0 || rightNames.length > 0)) {
            for (const tm of def.typeMapping) {
                const sig = decodeTypeMapping(tm);
                if (!sig) continue;
                const lhs = sig.left;
                const rhs = sig.right;
                // "collection" / "Any" act as wildcards on either side of a
                // typeMapping row (e.g. the `|` operator's `collection-collection`).
                // An empty operand (no types known) is also treated as a wildcard
                // so that e.g. `'a' & {}` still yields String.
                const lhsMatch = lhs === "collection" || lhs === "Any" || leftNames.length === 0 ||
                    leftNames.some((n) => n === lhs || isAssignable(n, lhs));
                const rhsMatch = rhs === "collection" || rhs === "Any" || rightNames.length === 0 ||
                    rightNames.some((n) => n === rhs || isAssignable(n, rhs));
                if (lhsMatch && rhsMatch) {
                    rowMatched = true;
                    widenedTo = widerSystemType(lhs, rhs);
                    break;
                }
            }
        }
        if (!rowMatched) continue;
        let resultType = def.returnType;
        // If returnType is a union, pick the widened type when known.
        const parts = splitTypeUnion(resultType);
        if (parts.length > 1 && widenedTo && parts.includes(widenedTo)) {
            resultType = widenedTo;
        }
        return { def, result: resultType };
    }
    return undefined;
}

/** Type-promotion ladder for the common arithmetic/comparison rows in
 *  operations.json. Lower index → narrower type. */
const TYPE_PROMOTION_ORDER: ReadonlyArray<string> = [
    "Boolean",
    "Integer",
    "Long",
    "Decimal",
    "Quantity",
    "String",
    "Date",
    "DateTime",
    "Time",
];

function widerSystemType(a: string, b: string): string {
    const ai = TYPE_PROMOTION_ORDER.indexOf(a);
    const bi = TYPE_PROMOTION_ORDER.indexOf(b);
    if (ai < 0 && bi < 0) return a;
    if (ai < 0) return b;
    if (bi < 0) return a;
    return ai >= bi ? a : b;
}

// ---- The visitor itself ----------------------------------------------------

class FhirPathExpressionVisitor {
    public diagnostics: Diagnostic[] = [];
    public root: JsonNode | undefined;
    public rootValue: FhirPathValue = EMPTY_VALUE;

    /** Stack of `$this` candidate types — pushed when entering a lambda arg. */
    private thisStack: FhirPathValue[] = [];

    /** Stack of `$total` candidate types — pushed when entering an aggregate. */
    private totalStack: FhirPathValue[] = [];

    /** Environment variables available at the current point in expression evaluation. */
    private dynamicEnvironmentVariables: Record<string, FhirPathValue>;

    constructor(
        private readonly source: string,
        private readonly provider: ModelProvider,
        private readonly options: VisitorOptions,
    ) {
        this.thisStack.push(this.contextValue());
        this.dynamicEnvironmentVariables = { ...(this.options.environmentVariables ?? {}) };
    }

    private contextValue(): FhirPathValue {
        if (this.options.contextValue) {
            return this.options.contextValue;
        }
        if (this.options.contextType) {
            return { types: [this.options.contextType], isCollection: !!this.options.contextIsCollection };
        }
        return EMPTY_VALUE;
    }

    /** Fallback for `%resource` when no explicit `resource` was supplied:
     *  prefer `contextType` (which is typically the resource the user is
     *  authoring against, e.g. "Patient" before any contextExpression
     *  navigates into a sub-element). Falls back to the initial scope. */
    private resourceFallback(): FhirPathValue {
        if (this.options.contextType) {
            return { types: [this.options.contextType], isCollection: false };
        }
        return this.contextValue();
    }

    /** The current lexical scope (`$this`) for argument-expression evaluation. */
    private currentScopeValue(): FhirPathValue {
        return this.thisStack[this.thisStack.length - 1] ?? this.contextValue();
    }

    private extractStringLiteralArg(ctx: ExpressionContext | undefined): string | undefined {
        if (!ctx) return undefined;
        if (!(ctx instanceof TermExpressionContext)) return undefined;
        const term = ctx.term();
        if (!(term instanceof LiteralTermContext)) return undefined;
        const lit = term.literal();
        if (!(lit instanceof StringLiteralContext)) return undefined;
        const raw = lit.getText();
        return raw.length >= 2 ? raw.substring(1, raw.length - 1) : raw;
    }

    private registerDefineVariable(
        input: FhirPathValue,
        argValues: FhirPathValue[],
        argCtxs: ExpressionContext[],
    ): void {
        const name = this.extractStringLiteralArg(argCtxs[0]);
        if (!name) return;
        const value = argValues[1] ?? input;
        this.dynamicEnvironmentVariables[name] = value;
    }

    private addDiagnostic(d: Omit<Diagnostic, "expression"> & { expression?: string }): void {
        const expression = d.expression ?? this.source.substring(d.position, d.position + d.length);
        this.diagnostics.push({ ...d, expression });
    }

    public run(entire: EntireExpressionContext): void {
        const expr = entire.expression();
        if (!expr) return;
        // Root is evaluated against the configured context type.
        const result = this.visitExpression(expr, this.contextValue());
        this.root = result.node;
        this.rootValue = result.value;
    }

    /** Dispatcher for an ExpressionContext alternative. `input` is the value
     *  flowing into the node (either the root context or the LHS of an
     *  invocation expression). */
    private visitExpression(ctx: ExpressionContext, input: FhirPathValue): { node: JsonNode; value: FhirPathValue } {
        if (ctx instanceof TermExpressionContext) return this.visitTerm(ctx, input);
        if (ctx instanceof InvocationExpressionContext) return this.visitInvocationExpression(ctx, input);
        if (ctx instanceof IndexerExpressionContext) return this.visitIndexer(ctx, input);
        if (ctx instanceof PolarityExpressionContext) return this.visitPolarity(ctx, input);
        if (ctx instanceof MultiplicativeExpressionContext) return this.visitBinaryOp(ctx, input, ctx.expression(0), ctx.expression(1), this.opSymbol(ctx, 1), "MultiplicativeExpression");
        if (ctx instanceof AdditiveExpressionContext) return this.visitBinaryOp(ctx, input, ctx.expression(0), ctx.expression(1), this.opSymbol(ctx, 1), "AdditiveExpression");
        if (ctx instanceof UnionExpressionContext) return this.visitBinaryOp(ctx, input, ctx.expression(0), ctx.expression(1), "|", "UnionExpression");
        if (ctx instanceof InequalityExpressionContext) return this.visitBinaryOp(ctx, input, ctx.expression(0), ctx.expression(1), this.opSymbol(ctx, 1), "InequalityExpression");
        if (ctx instanceof EqualityExpressionContext) return this.visitBinaryOp(ctx, input, ctx.expression(0), ctx.expression(1), this.opSymbol(ctx, 1), "EqualityExpression");
        if (ctx instanceof MembershipExpressionContext) return this.visitBinaryOp(ctx, input, ctx.expression(0), ctx.expression(1), this.opSymbol(ctx, 1), "MembershipExpression");
        if (ctx instanceof AndExpressionContext) return this.visitBinaryOp(ctx, input, ctx.expression(0), ctx.expression(1), "and", "AndExpression");
        if (ctx instanceof OrExpressionContext) return this.visitBinaryOp(ctx, input, ctx.expression(0), ctx.expression(1), this.opSymbol(ctx, 1), "OrExpression");
        if (ctx instanceof ImpliesExpressionContext) return this.visitBinaryOp(ctx, input, ctx.expression(0), ctx.expression(1), "implies", "ImpliesExpression");
        if (ctx instanceof TypeExpressionContext) return this.visitTypeExpression(ctx, input);

        // Unknown / unhandled — produce a best-effort placeholder so the tree
        // isn't entirely empty, and emit an error.
        const node: JsonNode = attachPosition({ ExpressionType: "UnknownExpression", Name: ctx.getText(), Arguments: [], ReturnType: "" }, ctx);
        return { node, value: EMPTY_VALUE };
    }

    private opSymbol(ctx: ParserRuleContext, defaultIndex: number): string {
        // Find first non-expression child (a TerminalNode of an operator token)
        const cc = ctx.children ?? [];
        for (const c of cc) {
            if (!(c instanceof ExpressionContext)) {
                const txt = c.getText?.();
                if (txt && txt !== "(" && txt !== ")") return txt;
            }
        }
        return cc[defaultIndex]?.getText?.() ?? "?";
    }

    private visitTerm(ctx: TermExpressionContext, input: FhirPathValue): { node: JsonNode; value: FhirPathValue } {
        const term = ctx.term();
        if (term instanceof InvocationTermContext) {
            const inner = term.invocation();
            const result = this.visitInvocation(inner, input);
            // For a root member or function invocation (the leftmost of a `.`-chain),
            // the legacy `convertFhirPathJsToAst` injects an "Expression Scope" axis
            // node so the ParseTreeTab.vue marker renders the implicit starting
            // context. We replicate that here so the annotated AST matches the
            // non-annotated AST node-for-node.
            if (
                inner instanceof MemberInvocationContext ||
                inner instanceof FunctionInvocationContext
            ) {
                const scope: JsonNode = {
                    ExpressionType: "AxisExpression",
                    Name: "builtin.that",
                    Arguments: [],
                    ReturnType: formatValueType(input),
                };
                result.node.Arguments = result.node.Arguments ?? [];
                result.node.Arguments.unshift(scope);
            }
            return result;
        }
        if (term instanceof LiteralTermContext) {
            return this.visitLiteral(term.literal());
        }
        if (term instanceof ExternalConstantTermContext) {
            return this.visitExternalConstant(term.externalConstant());
        }
        if (term instanceof ParenthesizedTermContext) {
            const inner = this.visitExpression(term.expression(), input);
            const node: JsonNode = attachPosition({
                ExpressionType: "ParenthesizedTerm",
                Name: "",
                Arguments: [inner.node],
                ReturnType: formatValueType(inner.value),
            }, term);
            return { node, value: inner.value };
        }
        const node: JsonNode = attachPosition({ ExpressionType: "Term", Name: term.getText(), Arguments: [], ReturnType: "" }, term);
        return { node, value: EMPTY_VALUE };
    }

    private visitInvocationExpression(ctx: InvocationExpressionContext, input: FhirPathValue): { node: JsonNode; value: FhirPathValue } {
        // a.b — visit LHS, then evaluate the invocation against LHS's value.
        const lhs = this.visitExpression(ctx.expression(), input);
        const rhs = this.visitInvocation(ctx.invocation(), lhs.value);
        // Splice the LHS in as the first argument of the RHS, mirroring how the
        // .NET validator's parseDebugTree presents `a.b()` calls.
        const rhsNode = rhs.node;
        if (rhsNode.ExpressionType === "FunctionCallExpression") {
            rhsNode.Arguments = rhsNode.Arguments ?? [];
            rhsNode.Arguments.unshift(lhs.node);
        } else {
            // Member access, etc. — wrap as a small chain so the LHS is visible.
            rhsNode.Arguments = rhsNode.Arguments ?? [];
            rhsNode.Arguments.unshift(lhs.node);
        }
        return { node: rhsNode, value: rhs.value };
    }

    private visitInvocation(ctx: InvocationContext, input: FhirPathValue): { node: JsonNode; value: FhirPathValue } {
        if (ctx instanceof MemberInvocationContext) {
            return this.visitMember(ctx, input);
        }
        if (ctx instanceof FunctionInvocationContext) {
            return this.visitFunctionInvocation(ctx.function_(), input);
        }
        if (ctx instanceof ThisInvocationContext) {
            const top = this.thisStack[this.thisStack.length - 1] ?? this.contextValue();
            const node = attachPosition({ ExpressionType: "AxisExpression", Name: "builtin.this", Arguments: [], ReturnType: formatValueType(top) }, ctx);
            return { node, value: top };
        }
        if (ctx instanceof IndexInvocationContext) {
            const t = this.provider.lookupByTypeName("System.Integer");
            const value: FhirPathValue = t ? { types: [t], isCollection: false } : EMPTY_VALUE;
            const node = attachPosition({ ExpressionType: "AxisExpression", Name: "$index", Arguments: [], ReturnType: formatValueType(value) }, ctx);
            return { node, value };
        }
        if (ctx instanceof TotalInvocationContext) {
            // $total has the type of the aggregate accumulator. Inside an
            // aggregate(...) call we push the init type onto totalStack so the
            // aggregator expression can be type-checked correctly.
            const top = this.totalStack[this.totalStack.length - 1] ?? EMPTY_VALUE;
            const node = attachPosition({ ExpressionType: "AxisExpression", Name: "$total", Arguments: [], ReturnType: formatValueType(top) }, ctx);
            return { node, value: top };
        }
        const node = attachPosition({ ExpressionType: "Invocation", Name: ctx.getText(), Arguments: [], ReturnType: "" }, ctx);
        return { node, value: EMPTY_VALUE };
    }

    private visitMember(ctx: MemberInvocationContext, input: FhirPathValue): { node: JsonNode; value: FhirPathValue } {
        const name = ctx.identifier().getText();
        const node: JsonNode = attachPosition({ ExpressionType: "ChildExpression", Name: name, ReturnType: "" }, ctx);

        // Resource-type self-reference: `Patient.name` when the context already
        // is Patient. The leading `Patient` is a no-op and yields the same value.
        if (input.types.length > 0 && input.types.every((t) => t.TypeName === name || isBaseTypeOf(t, name, this.provider))) {
            node.ReturnType = formatValueType(input);
            return { node, value: input };
        }

        // Special root identifier resolution: a bare resource type name as the
        // first segment is treated as that type (e.g. `Patient.name`).
        if (input.types.length === 0) {
            const root = this.provider.lookupByTypeName(name);
            if (root) {
                const value: FhirPathValue = { types: [root], isCollection: false };
                node.ReturnType = formatValueType(value);
                return { node, value };
            }
            this.addDiagnostic({
                severity: "error",
                code: "prop-not-found",
                message: `Property '${name}' could not be resolved (no input context).`,
                ...nodeStart(ctx),
            });
            return { node, value: EMPTY_VALUE };
        }

        const resolved: TypeModel[] = [];
        let isArray = false;
        let anyMatched = false;
        for (const t of input.types) {
            const elt = this.findElement(t, name);
            if (elt) {
                anyMatched = true;
                if (elt.IsArray) isArray = true;
                for (const tref of elt.Type) {
                    const target = this.provider.lookupByTypeName(tref.TypeName);
                    if (target) resolved.push(target);
                }
            }
        }
        if (!anyMatched) {
            const tNames = input.types.map((t) => displayTypeName(t)).join(" | ");
            this.addDiagnostic({
                severity: "error",
                code: "prop-not-found",
                message: `Property '${name}' not found on type '${tNames}'.`,
                ...nodeStart(ctx),
            });
        }

        const value: FhirPathValue = { types: dedupeTypes(resolved), isCollection: input.isCollection || isArray };
        node.ReturnType = formatValueType(value);
        return { node, value };
    }

    /** Find an element by name on a TypeModel, walking up BaseTypeName for
     *  inherited elements and expanding `[x]` choice members against their suffix. */
    private findElement(t: TypeModel, name: string): ElementModel | undefined {
        let cur: TypeModel | undefined = t;
        while (cur) {
            for (const e of cur.Elements) {
                if (e.ElementName === name) return e;
                if (e.ElementName.endsWith("[x]")) {
                    const base = e.ElementName.substring(0, e.ElementName.length - 3);
                    if (name.startsWith(base) && name.length > base.length) {
                        // valueQuantity, valueString...
                        const suffix = name.substring(base.length);
                        const suffixLower = suffix.charAt(0).toLowerCase() + suffix.substring(1);
                        const matched = e.Type.find((tt) => tt.TypeName === suffixLower || tt.TypeName === suffix);
                        if (matched) {
                            return { ElementName: name, Type: [matched], IsArray: e.IsArray };
                        }
                    }
                }
            }
            cur = cur.BaseTypeName ? this.provider.lookupByTypeName(cur.BaseTypeName) : undefined;
        }
        return undefined;
    }

    private visitFunctionInvocation(ctx: FunctionContext, input: FhirPathValue): { node: JsonNode; value: FhirPathValue } {
        const ident = ctx.identifier();
        // sort uses a keyword grammar rule (no identifier node); when there is no
        // identifier it must be `sort` (the only keyword alternative in the grammar).
        const isSortKeyword = !ident;
        const sortArgs = isSortKeyword ? ctx.sortArgument_list() : [];
        const name = ident ? ident.getText() : "sort";
        const node: JsonNode = attachPosition({ ExpressionType: "FunctionCallExpression", Name: name, Arguments: [], ReturnType: "" }, ctx);

        // For sort(), gather expressions from sortArgument nodes (each is expression asc|desc?).
        // For regular functions, gather expressions from the paramList.
        const params = ctx.paramList?.();
        const argCtxs: ExpressionContext[] = isSortKeyword
            ? sortArgs.map((sa) => (sa instanceof SortDirectionArgumentContext ? sa.expression() : null)).filter((e): e is ExpressionContext => e !== null)
            : params ? params.expression_list() : [];

        // Look up the spec definition early so per-argument scope decisions
        // (whether to rebind `$this` for a scoped expression argument) can be
        // driven by `argument.type` rather than a hard-coded function list.
        const def = functionsByName[name];

        // Visit arguments. For each declared `expression` argument (per the
        // spec's "scoped functions" definition), evaluate with $this rebound
        // to each input element; everything else is evaluated in the current
        // lexical scope.
        const argValues: FhirPathValue[] = [];
        if (name === "aggregate") {
            // aggregate(aggregator : expression, init : value):
            //  - `init` is evaluated in the current lexical scope (not lambda).
            //  - `aggregator` is a lambda over input elements; $total carries
            //    the init type so the accumulator expression can be type-checked.
            let initValue: FhirPathValue = EMPTY_VALUE;
            let initNode: JsonNode | undefined;
            if (argCtxs.length >= 2) {
                const init = this.visitExpression(argCtxs[1], this.currentScopeValue());
                initValue = init.value;
                initNode = init.node;
            }
            let aggValue: FhirPathValue = EMPTY_VALUE;
            let aggNode: JsonNode | undefined;
            if (argCtxs.length >= 1) {
                const elementType: FhirPathValue = { types: input.types, isCollection: false };
                this.thisStack.push(elementType);
                this.totalStack.push(initValue);
                try {
                    const agg = this.visitExpression(argCtxs[0], elementType);
                    aggValue = agg.value;
                    aggNode = agg.node;
                } finally {
                    this.totalStack.pop();
                    this.thisStack.pop();
                }
            }
            // Push args back onto the AST in source order.
            if (aggNode) { node.Arguments!.push(aggNode); argValues.push(aggValue); }
            if (initNode) { node.Arguments!.push(initNode); argValues.push(initValue); }
        } else {
            const declared = def?.arguments ?? [];
            for (let i = 0; i < argCtxs.length; i++) {
                const argCtx = argCtxs[i];
                // For variadic functions the last declared argument applies to
                // all extra positional args (e.g. sort(keySelector...)).
                const argDef = declared.length > 0
                    ? declared[Math.min(i, declared.length - 1)]
                    : undefined;
                if (isScopedExpressionArg(argDef)) {
                    const elementType: FhirPathValue = { types: input.types, isCollection: false };
                    this.thisStack.push(elementType);
                    try {
                        const arg = this.visitExpression(argCtx, elementType);
                        node.Arguments!.push(arg.node);
                        argValues.push(arg.value);
                    } finally {
                        this.thisStack.pop();
                    }
                } else if (name === "defineVariable" && i === 1) {
                    // Special case: `defineVariable`'s value expression is
                    // evaluated against the input collection (the LHS of the
                    // chain), not the lexical `$this`. The spec types it as
                    // `value : collection` rather than `expression`, so it is
                    // not a scoped lambda, but its Expression Scope is still the
                    // input collection. e.g. in
                    // `name.defineVariable('fn', first())` the `first()` operates
                    // on `name` (HumanName), not the root `%context` (Patient).
                    const arg = this.visitExpression(argCtx, input);
                    node.Arguments!.push(arg.node);
                    argValues.push(arg.value);
                } else {
                    // Non-scoped arguments are evaluated in the current
                    // lexical scope (`$this`), not the root `%context`.
                    const arg = this.visitExpression(argCtx, this.currentScopeValue());
                    node.Arguments!.push(arg.node);
                    argValues.push(arg.value);
                }
            }
        }

        if (!def) {
            this.addDiagnostic({
                severity: "error",
                code: "func-not-found",
                message: `Function '${name}' is not defined.`,
                ...nodeStart(ctx),
            });
            return { node, value: EMPTY_VALUE };
        }
        node.SpecUrl = def.sectionNumber ? `https://hl7.org/fhirpath/#${def.sectionNumber}` : undefined;

        // Validate arity
        const lastArgDef = def.arguments[def.arguments.length - 1];
        const isVariadic = lastArgDef?.variableArgs === true;
        const required = def.arguments.filter((a) => !a.optional).length;
        if (argCtxs.length < required) {
            this.addDiagnostic({
                severity: "error",
                code: "func-arity",
                message: `Function '${name}' requires at least ${required} argument(s) but ${argCtxs.length} were provided.`,
                ...nodeStart(ctx),
            });
        } else if (!isVariadic && argCtxs.length > def.arguments.length) {
            this.addDiagnostic({
                severity: "error",
                code: "func-arity",
                message: `Function '${name}' accepts at most ${def.arguments.length} argument(s) but ${argCtxs.length} were provided.`,
                ...nodeStart(ctx),
            });
        }

        // Validate input type.
        if (def.inputTypes.length > 0 && input.types.length > 0) {
            const ok = input.types.some((it) =>
                def.inputTypes.some((spec) => specTypeMatches(spec, it, this.provider)),
            );
            if (!ok) {
                this.addDiagnostic({
                    severity: "error",
                    code: "func-input-mismatch",
                    message: `Function '${name}' is not defined on input type '${joinTypeNames(input.types)}'. Expected: ${def.inputTypes.join(" | ")}.`,
                    ...nodeStart(ctx),
                });
            }
        }
        if (def.errorOnMultipleInput && input.isCollection) {
            this.addDiagnostic({
                severity: "warning",
                code: "func-multi-input",
                message: `Function '${name}' will throw at runtime if the input collection has more than one item.`,
                ...nodeStart(ctx),
            });
        }

        // Validate argument types against the spec.
        // For variadic functions the last declared argument spec applies to all extra args.
        for (let i = 0; i < argCtxs.length; i++) {
            const argSpec = def.arguments[Math.min(i, def.arguments.length - 1)];
            if (!argSpec) continue;
            const got = argValues[i];
            if (got.types.length === 0) continue;
            const accepts = splitTypeUnion(argSpec.type);
            if (accepts.length === 0) continue;
            // 'expression' / 'Expression' / 'collection' / 'identifier' /
            // 'type specifier' / 'value' all accept anything (the visitor has
            // already type-checked the inner expression).
            if (accepts.some((a) => a === "expression" || a === "Expression" || a === "collection" || a === "identifier" || a === "type specifier" || a === "value")) {
                continue;
            }
            const ok = got.types.some((t) => accepts.some((a) => specTypeMatches(a, t, this.provider)));
            if (!ok) {
                this.addDiagnostic({
                    severity: "error",
                    code: "func-arg-mismatch",
                    message: `Argument ${i + 1} ('${argSpec.name}') of '${name}' must be of type ${accepts.join(" | ")} but got ${joinTypeNames(got.types)}.`,
                    ...nodeStart(argCtxs[i]),
                });
            }
        }

        // Compute result type.
        const value = this.computeFunctionResultType(def, name, input, argValues, argCtxs);
        if (name === "defineVariable") {
            this.registerDefineVariable(input, argValues, argCtxs);
        }
        node.ReturnType = formatValueType(value);
        return { node, value };
    }

    /** Apply special-case rules first, then fall back to typeMapping. */
    private computeFunctionResultType(
        def: FunctionDef,
        name: string,
        input: FhirPathValue,
        argValues: FhirPathValue[],
        argCtxs: ExpressionContext[],
    ): FhirPathValue {
        // ---- Special cases that the spec's typeMapping cannot express ----
        switch (name) {
            case "select":
                if (argValues.length >= 1) {
                    return { types: argValues[0].types, isCollection: true };
                }
                return { ...input, isCollection: true };
            case "where":
            case "tail":
            case "skip":
            case "take":
            case "distinct":
            case "intersect":
            case "exclude":
            case "union":
            case "combine":
            case "sort":
                return { types: input.types, isCollection: true };
            case "coalesce": {
                // Returns the first non-empty argument; type is the union of all argument types.
                // The receiver (input) does not contribute to the result type.
                const allTypes = dedupeTypes(argValues.flatMap((v) => v.types));
                return { types: allTypes.length > 0 ? allTypes : input.types, isCollection: argValues.some((v) => v.isCollection) };
            }
            case "first":
            case "last":
            case "single":
                return { types: input.types, isCollection: false };
            case "repeat":
            case "repeatAll":
                if (argValues.length >= 1) {
                    return { types: dedupeTypes([...input.types, ...argValues[0].types]), isCollection: true };
                }
                return { types: input.types, isCollection: true };
            case "iif":
                if (argValues.length >= 2) {
                    const merged = dedupeTypes([
                        ...argValues[1].types,
                        ...(argValues[2]?.types ?? []),
                    ]);
                    return { types: merged, isCollection: argValues[1].isCollection || (argValues[2]?.isCollection ?? false) };
                }
                return EMPTY_VALUE;
            case "ofType":
            case "as":
            case "is": {
                if (name === "is") {
                    const t = this.provider.lookupByTypeName("System.Boolean");
                    return { types: t ? [t] : [], isCollection: false };
                }
                const typeArg = argCtxs[0]?.getText();
                if (typeArg) {
                    const tm = this.provider.lookupByTypeName(typeArg) ?? this.provider.lookupByTypeName(stripNamespacePrefix(typeArg));
                    if (tm) return { types: [tm], isCollection: name === "ofType" };
                }
                return { types: input.types, isCollection: name === "ofType" };
            }
            case "children":
            case "descendants": {
                // Union of every child element's types of every input type.
                const all: TypeModel[] = [];
                for (const t of input.types) {
                    let cur: TypeModel | undefined = t;
                    while (cur) {
                        for (const e of cur.Elements) {
                            for (const tref of e.Type) {
                                const r = this.provider.lookupByTypeName(tref.TypeName);
                                if (r) all.push(r);
                            }
                        }
                        cur = cur.BaseTypeName ? this.provider.lookupByTypeName(cur.BaseTypeName) : undefined;
                    }
                }
                return { types: dedupeTypes(all), isCollection: true };
            }
            case "extension": {
                // Returns a collection of Extension elements regardless of input.
                const t = this.provider.lookupByTypeName("Extension");
                return { types: t ? [t] : [], isCollection: true };
            }
            case "resolve": {
                // Collapses Reference into the union of permitted target types.
                const out: TypeModel[] = [];
                for (const t of input.types) {
                    if (t.TypeName === "Reference") {
                        const refElement = t.Elements.find((e) => e.ElementName === "reference");
                        // Walk the original element's TargetProfile via the parent
                        // ElementTypeModel; without it we fall back to Resource.
                        if (refElement) {
                            // No way to recover targetProfile from t here — caller
                            // must thread it through. Default to Resource.
                            const r = this.provider.lookupByTypeName("Resource");
                            if (r) out.push(r);
                        }
                    } else {
                        out.push(t);
                    }
                }
                return { types: dedupeTypes(out), isCollection: input.isCollection };
            }
            case "trace":
                return { ...input };
            case "defineVariable":
                return { ...input };
            case "type": {
                // Reflection.type — returns SimpleTypeInfo / ClassInfo from the
                // FHIRPath type-info schema. We don't model that here; emit empty.
                const t = this.provider.lookupByTypeName("System.String");
                return { types: t ? [t] : [], isCollection: false };
            }
            case "aggregate": {
                // Result type is the type of the aggregator expression (arg 0),
                // which was visited with $total set to the init's type so that
                // the accumulator participates in the inferred type.
                if (argValues[0]) return argValues[0];
                return EMPTY_VALUE;
            }
        }

        // ---- Fall back to typeMapping ----
        const inputType = input.types[0]; // representative; functions with mismatch are already flagged above
        const resultName = selectFunctionTypeMapping(def, inputType, this.provider) ?? def.returnType;
        return this.materialiseSpecReturn(resultName, def, input, argValues);
    }

    private materialiseSpecReturn(
        resultName: string,
        def: FunctionDef,
        input: FhirPathValue,
        argValues: FhirPathValue[],
    ): FhirPathValue {
        // "collection" means same type as input but collection cardinality.
        if (resultName === "collection") {
            return { types: input.types, isCollection: true };
        }
        if (resultName === "value") {
            return { types: input.types, isCollection: false };
        }
        // Unions like "Decimal | Quantity"
        const parts = splitTypeUnion(resultName);
        if (parts.length === 0) return EMPTY_VALUE;
        const types: TypeModel[] = [];
        for (const p of parts) {
            const t = resolveSpecType(p, this.provider);
            if (t) types.push(t);
        }
        // Collection / single: most spec functions are single-result; functions
        // marked collection are handled via the `resultName === "collection"`
        // branch above. emptyInputResult === "empty" + name in
        // SAME_TYPE_COLLECTION_FUNCTIONS keeps the collection flag.
        const collection = SAME_TYPE_COLLECTION_FUNCTIONS.has(def.functionName);
        const single = SAME_TYPE_SINGLE_FUNCTIONS.has(def.functionName);
        return { types, isCollection: collection ? true : single ? false : false };
    }

    private visitIndexer(ctx: IndexerExpressionContext, input: FhirPathValue): { node: JsonNode; value: FhirPathValue } {
        const lhs = this.visitExpression(ctx.expression(0), input);
        const idx = this.visitExpression(ctx.expression(1), this.contextValue());
        // Index must be Integer
        if (idx.value.types.length > 0) {
            const ok = idx.value.types.some((t) => specTypeMatches("Integer", t, this.provider));
            if (!ok) {
                this.addDiagnostic({
                    severity: "error",
                    code: "indexer-type",
                    message: `Indexer expression must be of type Integer but got ${joinTypeNames(idx.value.types)}.`,
                    ...nodeStart(ctx.expression(1)),
                });
            }
        }
        const value: FhirPathValue = { types: lhs.value.types, isCollection: false };
        const node: JsonNode = attachPosition({ ExpressionType: "IndexerExpression", Name: "[]", Arguments: [lhs.node, idx.node], ReturnType: formatValueType(value) }, ctx);
        return { node, value };
    }

    private visitPolarity(ctx: PolarityExpressionContext, input: FhirPathValue): { node: JsonNode; value: FhirPathValue } {
        const opText = (ctx.children?.[0]?.getText?.() ?? "+");
        const inner = this.visitExpression(ctx.expression(), input);
        const overloads = operationsByName[opText] ?? [];
        // Prefer the unary overload (leftArgument === "None")
        const unary = overloads.find((o) => !o.leftArgument || o.leftArgument === "None");
        const types: TypeModel[] = inner.value.types.length > 0 ? inner.value.types : [];
        const value: FhirPathValue = { types, isCollection: inner.value.isCollection };
        // Display: prefer the spec's declared return type when known (so a unary
        // `-1` shows as `integer` even if the inner literal had no type), but
        // still flag collection cardinality from the operand.
        let display = formatValueType(value);
        if (!display && unary) display = unary.returnType;
        const node: JsonNode = attachPosition({
            ExpressionType: "UnaryExpression",
            Name: opText,
            Arguments: [inner.node],
            ReturnType: display,
        }, ctx);
        return { node, value };
    }

    private visitBinaryOp(
        ctx: ExpressionContext,
        input: FhirPathValue,
        leftCtx: ExpressionContext,
        rightCtx: ExpressionContext,
        op: string,
        nodeType: string,
    ): { node: JsonNode; value: FhirPathValue } {
        const left = this.visitExpression(leftCtx, input);
        const right = this.visitExpression(rightCtx, input);
        const overloads = (operationsByName[op] ?? []).filter((o) => !!o.leftArgument && o.leftArgument !== "None");
        let resultTypeName: string | undefined;
        if (overloads.length > 0) {
            const match = selectOperationOverload(overloads, left.value, right.value, this.provider);
            if (match) {
                resultTypeName = match.result;
            } else if (left.value.types.length > 0 && right.value.types.length > 0) {
                this.addDiagnostic({
                    severity: "error",
                    code: "op-overload-mismatch",
                    message: `Operator '${op}' is not defined for ${joinTypeNames(left.value.types)} and ${joinTypeNames(right.value.types)}.`,
                    ...nodeStart(ctx),
                });
            }
        }
        const value = this.materialiseOperationResult(resultTypeName, left.value, right.value);
        const node: JsonNode = attachPosition({
            ExpressionType: nodeType,
            Name: op,
            Arguments: [left.node, right.node],
            ReturnType: formatValueType(value),
        }, ctx);
        return { node, value };
    }

    private materialiseOperationResult(resultTypeName: string | undefined, left: FhirPathValue, right: FhirPathValue): FhirPathValue {
        if (!resultTypeName) {
            // Default to bool for boolean-ish operators; otherwise unknown.
            return EMPTY_VALUE;
        }
        if (resultTypeName === "collection") {
            return { types: dedupeTypes([...left.types, ...right.types]), isCollection: true };
        }
        const parts = splitTypeUnion(resultTypeName);
        const types: TypeModel[] = [];
        for (const p of parts) {
            const t = resolveSpecType(p, this.provider);
            if (t) types.push(t);
        }
        return { types, isCollection: false };
    }

    private visitTypeExpression(ctx: TypeExpressionContext, input: FhirPathValue): { node: JsonNode; value: FhirPathValue } {
        const inner = this.visitExpression(ctx.expression(), input);
        // Find which token: 'is' or 'as'
        const op = ctx.children?.find((c) => c.getText?.() === "is" || c.getText?.() === "as")?.getText?.() ?? "is";
        const typeSpec = ctx.getTypedRuleContext(TypeSpecifierContext, 0) as TypeSpecifierContext | null;
        const typeName = typeSpec ? typeSpec.getText() : "";
        if (op === "is") {
            const t = this.provider.lookupByTypeName("System.Boolean");
            const node = attachPosition({
                ExpressionType: "BinaryExpression",
                Name: "is",
                Arguments: [inner.node, attachPosition({ ExpressionType: "TypeSpecifier", Name: typeName, ReturnType: "" }, typeSpec ?? ctx)],
                ReturnType: "boolean",
            }, ctx);
            return { node, value: { types: t ? [t] : [], isCollection: false } };
        } else {
            const tm = this.provider.lookupByTypeName(typeName) ?? this.provider.lookupByTypeName(stripNamespacePrefix(typeName));
            if (!tm) {
                this.addDiagnostic({
                    severity: "error",
                    code: "unknown-type",
                    message: `Unknown type '${typeName}'.`,
                    ...nodeStart(typeSpec ?? ctx),
                });
            }
            const value: FhirPathValue = tm ? { types: [tm], isCollection: input.isCollection } : EMPTY_VALUE;
            const node = attachPosition({
                ExpressionType: "BinaryExpression",
                Name: "as",
                Arguments: [inner.node, attachPosition({ ExpressionType: "TypeSpecifier", Name: typeName, ReturnType: "" }, typeSpec ?? ctx)],
                ReturnType: formatValueType(value),
            }, ctx);
            return { node, value };
        }
    }

    private visitLiteral(ctx: LiteralContext): { node: JsonNode; value: FhirPathValue } {
        let typeName: string | undefined;
        let exprType = "ConstantExpression";
        let displayName = ctx.getText();
        if (ctx instanceof BooleanLiteralContext) {
            typeName = "System.Boolean";
        } else if (ctx instanceof StringLiteralContext) {
            typeName = "System.String";
            // Strip surrounding quotes for display
            const raw = ctx.getText();
            if (raw.length >= 2) displayName = raw.substring(1, raw.length - 1);
        } else if (ctx instanceof NumberLiteralContext) {
            typeName = ctx.getText().includes(".") ? "System.Decimal" : "System.Integer";
        } else if (ctx instanceof LongNumberLiteralContext) {
            // System.Long isn't in our generated dictionary as a separate name;
            // fall back to Integer + 'L' textual hint.
            typeName = "System.Integer";
        } else if (ctx instanceof DateLiteralContext) {
            typeName = "System.Date";
            displayName = ctx.getText().substring(1); // drop leading @
        } else if (ctx instanceof DateTimeLiteralContext) {
            typeName = "System.DateTime";
            displayName = ctx.getText().substring(1);
        } else if (ctx instanceof TimeLiteralContext) {
            typeName = "System.Time";
            displayName = ctx.getText().substring(2); // drop @T
        } else if (ctx instanceof QuantityLiteralContext) {
            typeName = "System.Quantity";
        } else if (ctx instanceof NullLiteralContext) {
            const node = attachPosition({ ExpressionType: "NullLiteral", Name: "{ }", ReturnType: "" }, ctx);
            return { node, value: EMPTY_VALUE };
        }
        const t = typeName ? this.provider.lookupByTypeName(typeName) : undefined;
        const node = attachPosition({
            ExpressionType: exprType,
            Name: displayName,
            ReturnType: t ? displayTypeName(t) : "",
        }, ctx);
        return { node, value: t ? { types: [t], isCollection: false } : EMPTY_VALUE };
    }

    private visitExternalConstant(ctx: ExternalConstantContext): { node: JsonNode; value: FhirPathValue } {
        const ident = ctx.identifier();
        const str = ctx.STRING();
        const name = ident ? ident.getText() : (str ? str.getText().slice(1, -1) : ctx.getText());
        const node: JsonNode = attachPosition({ ExpressionType: "VariableRefExpression", Name: name, ReturnType: "" }, ctx);

        const provided = this.dynamicEnvironmentVariables[name];
        if (provided) {
            node.ReturnType = formatValueType(provided);
            return { node, value: provided };
        }
        const builtin = BUILTIN_ENV_VARS_BY_NAME[name];
        if (builtin) {
            if (builtin.fixedType) {
                const t = resolveSpecType(builtin.fixedType, this.provider);
                if (t) {
                    const value: FhirPathValue = { types: [t], isCollection: false };
                    node.ReturnType = formatValueType(value);
                    return { node, value };
                }
            }
            // Context-dependent vars. Per the FHIRPath spec scoped-functions
            // section, these have distinct semantics:
            //   - %context     = the *initial* type of the expression being
            //                    evaluated (i.e. the seed/root scope).
            //   - %resource    = the input *resource* the expression is being
            //                    evaluated against (NOT the current focus).
            //   - %rootResource = the container resource (defaults to
            //                    %resource when no explicit container exists).
            // None of these are rebound by scoped functions like where/select.
            let val: FhirPathValue;
            if (name === "resource") {
                val = this.options.resource ?? this.resourceFallback();
            } else if (name === "rootResource") {
                val = this.options.rootResource ?? this.options.resource ?? this.resourceFallback();
            } else {
                // %context — the initial input scope to the expression.
                val = this.contextValue();
            }
            node.ReturnType = formatValueType(val);
            return { node, value: val };
        }
        this.addDiagnostic({
            severity: "warning",
            code: "env-var-unknown",
            message: `Environment variable '%${name}' is not declared. Its type cannot be determined.`,
            ...nodeStart(ctx),
        });
        return { node, value: EMPTY_VALUE };
    }
}

function dedupeTypes(types: TypeModel[]): TypeModel[] {
    const seen = new Set<string>();
    const out: TypeModel[] = [];
    for (const t of types) {
        if (!seen.has(t.TypeName)) {
            seen.add(t.TypeName);
            out.push(t);
        }
    }
    return out;
}

function isBaseTypeOf(t: TypeModel, candidateBaseName: string, provider: ModelProvider): boolean {
    let cur: TypeModel | undefined = t;
    while (cur) {
        if (cur.TypeName === candidateBaseName) return true;
        cur = cur.BaseTypeName ? provider.lookupByTypeName(cur.BaseTypeName) : undefined;
    }
    return false;
}

function stripNamespacePrefix(name: string): string {
    const dot = name.indexOf(".");
    return dot > 0 ? name.substring(dot + 1) : name;
}

// ---- Public entry points ---------------------------------------------------

/** Parse and run the validator over an expression. */
export function runVisitor(
    expression: string,
    provider: ModelProvider,
    options: VisitorOptions = {},
): VisitorResult {
    const chars = new antlr4.CharStream(expression);
    const lexer = new Lexer(chars);
    const lexerListener = new CollectingErrorListener(expression);
    lexer.removeErrorListeners();
    lexer.addErrorListener(lexerListener as any);
    const tokens = new antlr4.CommonTokenStream(lexer);
    const parser = new Parser(tokens);
    const parserListener = new CollectingErrorListener(expression);
    parser.removeErrorListeners();
    parser.addErrorListener(parserListener as any);

    const tree = parser.entireExpression();
    const syntaxErrors = [...lexerListener.errors, ...parserListener.errors];

    if (syntaxErrors.length > 0) {
        return {
            parseDebugTree: undefined,
            expectedReturnType: "",
            expectedReturnIsCollection: false,
            diagnostics: [],
            syntaxErrors,
        };
    }

    const visitor = new FhirPathExpressionVisitor(expression, provider, options);
    visitor.run(tree);
    return {
        parseDebugTree: visitor.root,
        expectedReturnType: joinTypeNames(visitor.rootValue.types),
        expectedReturnIsCollection: visitor.rootValue.isCollection,
        diagnostics: visitor.diagnostics,
        syntaxErrors,
    };
}
