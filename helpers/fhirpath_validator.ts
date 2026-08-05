// Public API for the FHIRPath validator.
//
// `validateFhirpathExpression` runs the visitor in `fhirpath_visitor.ts` and
// returns:
//   - the typed AST (`parseDebugTree`) ready to feed into ParseTreeTab.vue
//   - the joined expected return type
//   - a FHIR `OperationOutcome` collecting every diagnostic. The shape matches
//     what the .NET FHIRPath engine emits server-side, so the lab UI can
//     display it through the existing `OperationOutcomePanel` component.
//
// The validator is intentionally side-effect-free and synchronous; callers
// (such as `evaluateExpressionUsingFhirpathJs`) invoke it before running the
// fhirpath.js engine and append its issues to the engine's outcome.

import type { TypeModel } from "./custom_model";
import {
    runVisitor,
    type Diagnostic,
    type FhirPathValue,
    type JsonNode,
    type ModelProvider,
} from "./fhirpath_visitor";

import { byTypeName as r4ByTypeName, byUrl as r4ByUrl } from "./models/generated/r4/dictionary";
import { byTypeName as r4bByTypeName, byUrl as r4bByUrl } from "./models/generated/r4b/dictionary";
import { byTypeName as r5ByTypeName, byUrl as r5ByUrl } from "./models/generated/r5/dictionary";
import { byTypeName as r6ByTypeName, byUrl as r6ByUrl } from "./models/generated/r6/dictionary";
import { fhirPrimitiveToSystemTypeName } from "./models/generated/system-types";

export type FhirVersionKey = "r4" | "r4b" | "r5" | "r6";

interface VersionDicts {
    byTypeName: Record<string, TypeModel>;
    byUrl: Record<string, TypeModel>;
}

const VERSION_DICTS: Readonly<Record<FhirVersionKey, VersionDicts>> = Object.freeze({
    r4: { byTypeName: r4ByTypeName, byUrl: r4ByUrl },
    r4b: { byTypeName: r4bByTypeName, byUrl: r4bByUrl },
    r5: { byTypeName: r5ByTypeName, byUrl: r5ByUrl },
    r6: { byTypeName: r6ByTypeName, byUrl: r6ByUrl },
});

/** Build a `ModelProvider` over the given FHIR version's generated dictionary. */
export function getModelProvider(version: FhirVersionKey): ModelProvider {
    const v = VERSION_DICTS[version];
    return {
        lookupByTypeName: (name: string) => v.byTypeName[name],
        lookupByUrl: (url: string) => v.byUrl[url],
        fhirPrimitiveToSystemTypeName,
    };
}

/** Inputs for validating an expression. */
export interface ValidateOptions {
    /** FHIR version dictionary to validate against. Defaults to 'r4'. */
    fhirVersion?: FhirVersionKey;
    /** Optional context type name (e.g. "Patient", "Observation.value[x]"). */
    contextType?: string;
    /** True if the expression is rooted at a collection rather than a single value. */
    contextIsCollection?: boolean;
    /** Optional FHIRPath context expression. When set the validator first
     *  evaluates the context expression rooted at `contextType` and feeds its
     *  resulting types and cardinality in as the starting scope for the main
     *  expression — mirroring how the engine evaluates `select(<context>)`
     *  before running the main expression. */
    contextExpression?: string;
    /** Map of `%var` name -> typed value. */
    environmentVariables?: Record<string, FhirPathValue>;
    /** FML compatibility: bare root identifiers may resolve to declared
     *  environment variables, equivalent to `%name`. */
    allowEnvironmentVariablesAtRoot?: boolean;
    /** Optional override for `%resource` — the input resource type. When
     *  omitted, defaults to `contextType` (per the FHIRPath spec, `%resource`
     *  is the resource the expression is being evaluated against, not the
     *  current focus). */
    resource?: FhirPathValue;
}

/** Result returned by `validateFhirpathExpression`. */
export interface ValidationResult {
    /** Annotated AST node tree (root). Undefined when the expression failed to
     *  parse. The shape is byte-compatible with the .NET validator's output. */
    parseDebugTree?: JsonNode;
    /** Joined union of types the whole expression is expected to evaluate to. */
    expectedReturnType: string;
    /** Whether the expression returns a collection. */
    expectedReturnIsCollection: boolean;
    /** Raw diagnostic records (semantic + syntax). */
    diagnostics: Diagnostic[];
    /** FHIR OperationOutcome built from the diagnostics. Undefined when there
     *  are no diagnostics. */
    outcome?: fhir4b.OperationOutcome;
    /** Annotated AST of the context expression, when one was provided. */
    contextParseDebugTree?: JsonNode;
}

/** Collect distinct `%variable` names from a visitor AST. */
export function collectFhirPathVariableReferences(root: JsonNode | undefined): string[] {
    if (!root) return [];
    const references: string[] = [];
    const seen = new Set<string>();
    const visit = (node: JsonNode): void => {
        if (node.ExpressionType === "VariableRefExpression" && !seen.has(node.Name)) {
            seen.add(node.Name);
            references.push(node.Name);
        }
        for (const argument of node.Arguments ?? []) visit(argument);
    };
    visit(root);
    return references;
}

/** Parse an expression and return the `%variable` names referenced by it. */
export function getFhirPathVariableReferences(expression: string, rootVariableNames: string[] = []): string[] {
    const environmentVariables = Object.fromEntries(rootVariableNames.map(name => {
        return [name, {types: [], isCollection: false} satisfies FhirPathValue];
    }));
    return collectFhirPathVariableReferences(validateFhirpathExpression(expression, {
        environmentVariables,
        allowEnvironmentVariablesAtRoot: rootVariableNames.length > 0,
    }).parseDebugTree);
}

const VALIDATOR_CODE_SYSTEM = "http://fhirpath-lab.com/CodeSystem/validator-codes";

const SEVERITY_TO_FHIR_CODE: Record<string, fhir4b.OperationOutcomeIssue["code"]> = {
    syntax: "invalid",
    "func-not-found": "not-supported",
    "func-arity": "invalid",
    "func-input-mismatch": "invalid",
    "func-arg-mismatch": "invalid",
    "func-multi-input": "invalid",
    "op-overload-mismatch": "invalid",
    "prop-not-found": "invalid",
    "choice-type-suffix": "value",
    "indexer-type": "invalid",
    "unknown-type": "invalid",
    "env-var-unknown": "invalid",
};

/** Convert a list of validator diagnostics into a FHIR OperationOutcome. */
export function diagnosticsToOperationOutcome(
    diagnostics: Diagnostic[],
): fhir4b.OperationOutcome | undefined {
    if (diagnostics.length === 0) return undefined;
    const outcome: fhir4b.OperationOutcome = {
        resourceType: "OperationOutcome",
        issue: diagnostics.map(diagnosticToIssue),
    };
    return outcome;
}

function diagnosticToIssue(d: Diagnostic): fhir4b.OperationOutcomeIssue {
    const code = SEVERITY_TO_FHIR_CODE[d.code] ?? "invalid";
    const issue: fhir4b.OperationOutcomeIssue = {
        severity: d.severity,
        code,
        details: {
            coding: [{ system: VALIDATOR_CODE_SYSTEM, code: d.code }],
            text: d.message,
        },
        // The expression sub-text gets surfaced via the .expression field; it
        // matches how the .NET engine reports issues.
        expression: [d.expression],
        // location uses the standard "@line:column" form the lab understands.
        location: [`@${d.line}:${d.column}`],
    };
    return issue;
}

/** Validate a FHIRPath expression. */
export function validateFhirpathExpression(
    expression: string,
    options: ValidateOptions = {},
): ValidationResult {
    const provider = getModelProvider(options.fhirVersion ?? "r4");
    const contextType = resolveContextType(provider, options.contextType);

    // If a context expression is supplied, evaluate it first to determine the
    // starting types for the main expression. This mirrors what the engine
    // does at runtime via `select(<contextExpression>)`: when the context
    // expression yields a collection, the main expression is evaluated against
    // each individual item, so its input type is the *singular* form. The
    // returned AST and cardinality therefore describe the expression in
    // isolation — the per-item evaluation — and are not widened by the outer
    // contextExpression's collection-ness.
    let contextValue: FhirPathValue | undefined;
    let contextDiagnostics: Diagnostic[] = [];
    let contextParseDebugTree: JsonNode | undefined;
    if (options.contextExpression && options.contextExpression.trim().length > 0) {
        const cv = runVisitor(options.contextExpression, provider, {
            contextType,
            contextIsCollection: options.contextIsCollection,
            environmentVariables: options.environmentVariables,
            allowEnvironmentVariablesAtRoot: options.allowEnvironmentVariablesAtRoot,
            resource: options.resource ?? (contextType ? { types: [contextType], isCollection: false } : undefined),
        });
        contextDiagnostics = [...cv.syntaxErrors, ...cv.diagnostics];
        contextParseDebugTree = cv.parseDebugTree;
        // Even if the context expression had errors, fall back to its computed
        // types — they're the best signal we have for the main expression.
        if (cv.parseDebugTree) {
            contextValue = {
                types: collectTypesFromTree(cv.parseDebugTree, provider),
                // Per-item: the main expression sees a singular value at its
                // root, regardless of whether the context expression returned
                // a collection.
                isCollection: false,
            };
        }
    }

    const v = runVisitor(expression, provider, {
        contextType,
        contextIsCollection: options.contextIsCollection,
        contextValue,
        environmentVariables: options.environmentVariables,
        allowEnvironmentVariablesAtRoot: options.allowEnvironmentVariablesAtRoot,
        // Per the spec's scoped-functions rules, %resource is the input
        // resource the expression is being evaluated against, *not* the
        // current focus. When the user supplied a contextExpression that
        // navigated into a sub-element, the resource is still the original
        // contextType (typically the FHIR resource the form is authored
        // against). Singular by definition.
        resource: options.resource ?? (contextType ? { types: [contextType], isCollection: false } : undefined),
    });
    // The validation result describes the main expression evaluated against
    // a single item from the contextExpression's output (i.e. as if invoked
    // per-item via `select(...)`). The contextExpression's outer cardinality
    // is intentionally NOT folded into the AST or the returned
    // `expectedReturnIsCollection` flag — callers that need the flat-mapped
    // overall cardinality can OR it with the contextExpression's own.
    const allDiag = [...contextDiagnostics, ...v.syntaxErrors, ...v.diagnostics];
    const outcome = diagnosticsToOperationOutcome(allDiag);
    return {
        parseDebugTree: v.parseDebugTree,
        expectedReturnType: v.expectedReturnType,
        expectedReturnIsCollection: v.expectedReturnIsCollection,
        diagnostics: allDiag,
        outcome,
        contextParseDebugTree,
    };
}

/** Recover the list of TypeModels from the root node's `ReturnType` string.
 *  Used to seed the main expression's starting scope from a context expression. */
function collectTypesFromTree(node: JsonNode, provider: ModelProvider): TypeModel[] {
    if (!node.ReturnType) return [];
    // Strip the collection-cardinality decoration (`[]` suffix and any
    // wrapping parentheses) so we only feed bare type names to the lookup.
    let raw = node.ReturnType.trim();
    if (raw.endsWith("[]")) raw = raw.substring(0, raw.length - 2).trim();
    if (raw.startsWith("(") && raw.endsWith(")")) raw = raw.substring(1, raw.length - 1).trim();
    const out: TypeModel[] = [];
    for (const part of raw.split("|").map((p) => p.trim()).filter((p) => p.length > 0)) {
        // Try as a System.* primitive first (joined names are lowercased), then
        // as a FHIR type, then a capitalised System name.
        const tries = [
            "System." + part.charAt(0).toUpperCase() + part.substring(1),
            part,
            part.charAt(0).toUpperCase() + part.substring(1),
        ];
        for (const candidate of tries) {
            const t = provider.lookupByTypeName(candidate);
            if (t) {
                out.push(t);
                break;
            }
        }
    }
    return out;
}

function resolveContextType(provider: ModelProvider, contextType?: string): TypeModel | undefined {
    if (!contextType) return undefined;
    // Strip a `[x]` suffix and any trailing path; the validator currently
    // operates at type-granularity not path-granularity.
    const baseTypeName = contextType.split(".")[0].replace("[x]", "");
    return provider.lookupByTypeName(baseTypeName);
}

/** Merge a validator outcome into an engine outcome (or vice-versa). When both
 *  exist their issues are concatenated; when only one exists it is returned
 *  as-is. */
export function mergeOutcomes(
    a: fhir4b.OperationOutcome | undefined,
    b: fhir4b.OperationOutcome | undefined,
): fhir4b.OperationOutcome | undefined {
    if (!a) return b;
    if (!b) return a;
    return {
        resourceType: "OperationOutcome",
        issue: [...(a.issue ?? []), ...(b.issue ?? [])],
    };
}
