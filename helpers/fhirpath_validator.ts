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
    /** Map of `%var` name -> typed value. */
    environmentVariables?: Record<string, FhirPathValue>;
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
    const v = runVisitor(expression, provider, {
        contextType,
        contextIsCollection: options.contextIsCollection,
        environmentVariables: options.environmentVariables,
    });
    const allDiag = [...v.syntaxErrors, ...v.diagnostics];
    const outcome = diagnosticsToOperationOutcome(allDiag);
    return {
        parseDebugTree: v.parseDebugTree,
        expectedReturnType: v.expectedReturnType,
        expectedReturnIsCollection: v.expectedReturnIsCollection,
        diagnostics: allDiag,
        outcome,
    };
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
