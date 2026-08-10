import { validateFhirpathExpression } from "../helpers/fhirpath_validator";
import { convertFhirPathJsToAst } from "../helpers/fhirpath_ast_converter";
import type { JsonNode, fpjsNode } from "../models/FhirpathTesterData";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fhirpath = require("fhirpath");

/** Build the legacy (non-annotated) AST tree the same way the lab does for
 *  fhirpath.js engines: parse with fhirpath.js, convert, peel
 *  `EntireExpression > Expression`, and take the first child. */
function legacyTree(expr: string): JsonNode | undefined {
    const parsed: fpjsNode = fhirpath.parse(expr);
    if (!parsed.children || parsed.children.length === 0) return undefined;
    const root = convertFhirPathJsToAst(parsed);
    const arg0 = root.Arguments?.[0];
    if (!arg0?.Arguments || arg0.Arguments.length === 0) return undefined;
    return arg0.Arguments[0];
}

/** Reduce a JsonNode to its structural shape (ExpressionType + Name + Arguments
 *  recursively). Drops ReturnType / Position / Length / Line / Column / SpecUrl
 *  so legacy and annotated trees can be compared node-for-node. */
function shapeOf(node: JsonNode | undefined): unknown {
    if (!node) return undefined;
    return {
        ExpressionType: node.ExpressionType,
        Name: node.Name,
        Arguments: (node.Arguments ?? []).map(shapeOf),
    };
}

describe("FHIRPath validator visitor", () => {
    it("annotates types for (1+1).toString()", () => {
        const r = validateFhirpathExpression("(1+1).toString()", { fhirVersion: "r4" });
        expect(r.diagnostics).toEqual([]);
        expect(r.expectedReturnType).toBe("string");
        expect(r.parseDebugTree).toBeDefined();
        expect(r.parseDebugTree?.ExpressionType).toBe("FunctionCallExpression");
        expect(r.parseDebugTree?.Name).toBe("toString");
        expect(r.parseDebugTree?.ReturnType).toBe("string");
        // ParenthesizedTerm wraps the inner +; this matches the legacy
        // fhirpath.js-derived AST that ParseTreeTab.vue already renders.
        const args = r.parseDebugTree?.Arguments ?? [];
        const parens = args[0];
        expect(parens?.ExpressionType).toBe("ParenthesizedTerm");
        const arg = parens?.Arguments?.[0];
        expect(arg?.ExpressionType).toBe("AdditiveExpression");
        expect(arg?.Name).toBe("+");
        expect(arg?.ReturnType).toBe("integer");
        const subArgs = arg?.Arguments ?? [];
        expect(subArgs.length).toBe(2);
        for (const literalArg of subArgs) {
            expect(literalArg.ExpressionType).toBe("ConstantExpression");
            expect(literalArg.ReturnType).toBe("integer");
            expect(literalArg.Name).toBe("1");
        }
    });

    it("resolves Patient.name.given as a string collection", () => {
        const r = validateFhirpathExpression("Patient.name.given", {
            fhirVersion: "r4",
            contextType: "Patient",
        });
        expect(r.diagnostics).toEqual([]);
        expect(r.expectedReturnType).toBe("string");
        expect(r.expectedReturnIsCollection).toBe(true);
    });

    it("resolves a backtick-delimited member name", () => {
        const r = validateFhirpathExpression("Narrative.`div`", {
            fhirVersion: "r4",
            contextType: "Narrative",
        });
        expect(r.diagnostics).toEqual([]);
        expect(r.parseDebugTree?.Name).toBe("div");
    });

    it("expands choice types like Patient.deceasedBoolean", () => {
        const r = validateFhirpathExpression("Patient.deceasedBoolean", {
            fhirVersion: "r4",
            contextType: "Patient",
        });
        expect(r.expectedReturnType).toBe("boolean");
        // Using a concrete-typed suffix on a choice element resolves, but is
        // flagged with a warning recommending the bare choice name.
        const warnings = r.diagnostics.filter((d) => d.code === "choice-type-suffix");
        expect(warnings.length).toBe(1);
        expect(warnings[0].severity).toBe("warning");
        expect(warnings[0].message).toContain("deceasedBoolean");
        expect(warnings[0].message).toContain("deceased");
        expect(r.diagnostics.filter((d) => d.severity === "error")).toEqual([]);
    });

    it("resolves a bare choice base name to the union of permitted types", () => {
        const r = validateFhirpathExpression("Observation.effective", {
            fhirVersion: "r4",
            contextType: "Observation",
        });
        expect(r.diagnostics).toEqual([]);
        // effective[x] permits dateTime | Period | Timing | instant.
        expect(r.expectedReturnType).toContain("dateTime");
        expect(r.expectedReturnType).toContain("Period");
    });

    it("navigates through a bare choice base name without a prop-not-found error", () => {
        const r = validateFhirpathExpression(
            "Observation.effective.toString().substring(0,10).toDate()",
            { fhirVersion: "r4", contextType: "Observation" },
        );
        expect(r.diagnostics.filter((d) => d.code === "prop-not-found")).toEqual([]);
        expect(r.expectedReturnType).toBe("date");
    });

    it("flags an unknown property as an error with location", () => {
        const r = validateFhirpathExpression("Patient.nonExistentField", {
            fhirVersion: "r4",
            contextType: "Patient",
        });
        const errors = r.diagnostics.filter((d) => d.severity === "error");
        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].code).toBe("prop-not-found");
        expect(errors[0].message).toContain("nonExistentField");
        expect(errors[0].position).toBeGreaterThanOrEqual(0);
        expect(errors[0].length).toBeGreaterThan(0);
        expect(r.outcome?.resourceType).toBe("OperationOutcome");
        expect(r.outcome?.issue.length).toBeGreaterThan(0);
        expect(r.outcome?.issue[0].severity).toBe("error");
    });

    it("flags an unknown function", () => {
        const r = validateFhirpathExpression("Patient.name.bogusFunc()", {
            fhirVersion: "r4",
            contextType: "Patient",
        });
        const errors = r.diagnostics.filter((d) => d.code === "func-not-found");
        expect(errors.length).toBe(1);
        expect(errors[0].message).toContain("bogusFunc");
    });

    it("returns a syntax-error outcome for an unparseable expression", () => {
        const r = validateFhirpathExpression("Patient.(", { fhirVersion: "r4" });
        // No semantic diagnostics because we short-circuited; syntax errors only
        expect(r.parseDebugTree).toBeUndefined();
        expect(r.diagnostics.some((d) => d.code === "syntax")).toBe(true);
        expect(r.outcome?.resourceType).toBe("OperationOutcome");
    });

    it("computes Boolean for an existence check", () => {
        const r = validateFhirpathExpression("Patient.name.exists()", {
            fhirVersion: "r4",
            contextType: "Patient",
        });
        expect(r.expectedReturnType).toBe("boolean");
        expect(r.expectedReturnIsCollection).toBe(false);
    });

    it("computes Boolean for a comparison expression", () => {
        const r = validateFhirpathExpression("1 > 2", { fhirVersion: "r4" });
        expect(r.diagnostics).toEqual([]);
        expect(r.expectedReturnType).toBe("boolean");
    });

    describe("collection cardinality on ReturnType", () => {
        it("suffixes `[]` on collection ReturnType (Patient.name.given)", () => {
            const r = validateFhirpathExpression("Patient.name.given", {
                fhirVersion: "r4",
                contextType: "Patient",
            });
            expect(r.diagnostics).toEqual([]);
            // Joined union (without []) — preserved for backward compatibility.
            expect(r.expectedReturnType).toBe("string");
            expect(r.expectedReturnIsCollection).toBe(true);
            // Annotated tree's root node carries the `[]` decoration.
            expect(r.parseDebugTree?.ReturnType).toBe("string[]");
        });

        it("propagates collection-ness from input to single-valued child (Patient.name.family)", () => {
            // `family` itself is not an array, but `name` is — so the chain is
            // a collection of family strings.
            const r = validateFhirpathExpression("Patient.name.family", {
                fhirVersion: "r4",
                contextType: "Patient",
            });
            expect(r.diagnostics).toEqual([]);
            expect(r.parseDebugTree?.ReturnType).toBe("string[]");
            expect(r.expectedReturnIsCollection).toBe(true);
        });

        it("first() reduces a collection back to a single value", () => {
            const r = validateFhirpathExpression("Patient.name.family.first()", {
                fhirVersion: "r4",
                contextType: "Patient",
            });
            expect(r.diagnostics).toEqual([]);
            expect(r.parseDebugTree?.ExpressionType).toBe("FunctionCallExpression");
            expect(r.parseDebugTree?.Name).toBe("first");
            expect(r.parseDebugTree?.ReturnType).toBe("string");
            expect(r.expectedReturnIsCollection).toBe(false);
        });

        it("the | operator produces a collection", () => {
            const r = validateFhirpathExpression("Patient.name.given | Patient.name.family", {
                fhirVersion: "r4",
                contextType: "Patient",
            });
            expect(r.diagnostics).toEqual([]);
            expect(r.parseDebugTree?.ExpressionType).toBe("UnionExpression");
            expect(r.parseDebugTree?.Name).toBe("|");
            expect(r.parseDebugTree?.ReturnType).toBe("string[]");
            expect(r.expectedReturnIsCollection).toBe(true);
        });

        it("single-valued literal does not carry the `[]` suffix", () => {
            const r = validateFhirpathExpression("'hello'", { fhirVersion: "r4" });
            expect(r.parseDebugTree?.ReturnType).toBe("string");
            expect(r.expectedReturnIsCollection).toBe(false);
        });
    });

    describe("starting scope", () => {
        it("uses the context expression to widen the starting scope", () => {
            // Without a context the bare `given` cannot resolve.
            const noCtx = validateFhirpathExpression("given", {
                fhirVersion: "r4",
                contextType: "Patient",
            });
            expect(noCtx.diagnostics.some((d) => d.code === "prop-not-found")).toBe(true);

            // With `Patient.name` as the context expression, `given` resolves
            // against HumanName and returns a string collection.
            const withCtx = validateFhirpathExpression("given", {
                fhirVersion: "r4",
                contextType: "Patient",
                contextExpression: "Patient.name",
            });
            expect(withCtx.diagnostics.filter((d) => d.severity === "error")).toEqual([]);
            expect(withCtx.expectedReturnType).toBe("string");
            expect(withCtx.expectedReturnIsCollection).toBe(true);
        });

        it("treats a collection context expression as a per-item singular input", () => {
            // `Patient.name` is a collection of HumanName; the engine evaluates
            // the main expression against each item individually. The validator
            // therefore sees a *singular* HumanName as input, and the returned
            // AST/cardinality describe the per-item evaluation in isolation —
            // they are NOT widened by the outer contextExpression.
            const r = validateFhirpathExpression("use", {
                fhirVersion: "r4",
                contextType: "Patient",
                contextExpression: "Patient.name",
            });
            expect(r.diagnostics.filter((d) => d.severity === "error")).toEqual([]);
            // `use` is a single value on HumanName; per-item the result is a
            // single `code`, regardless of how many names the outer
            // contextExpression yields.
            expect(r.expectedReturnType).toBe("code");
            expect(r.expectedReturnIsCollection).toBe(false);
            expect(r.parseDebugTree?.ReturnType).toBe("code");
        });

        it("does not error on .exists() against a collection context expression", () => {
            // If the input were the *whole* collection, `.first()` etc. would
            // still work — but a stricter check could mistakenly flag this as
            // a multi-input violation. With per-item singular input there's no
            // such issue.
            const r = validateFhirpathExpression("exists()", {
                fhirVersion: "r4",
                contextType: "Patient",
                contextExpression: "Patient.name",
            });
            expect(r.diagnostics.filter((d) => d.severity === "error")).toEqual([]);
            expect(r.expectedReturnType).toBe("boolean");
        });

        it("emits an Expression Scope axis node at the leftmost member of the chain", () => {
            // `.given` after a context expression has the Expression Scope axis
            // as its only argument (matches the legacy ParseTree rendering).
            const r = validateFhirpathExpression("given", {
                fhirVersion: "r4",
                contextType: "Patient",
                contextExpression: "Patient.name",
            });
            expect(r.parseDebugTree?.ExpressionType).toBe("ChildExpression");
            expect(r.parseDebugTree?.Name).toBe("given");
            const scope = r.parseDebugTree?.Arguments?.[0];
            expect(scope?.ExpressionType).toBe("AxisExpression");
            expect(scope?.Name).toBe("builtin.that");
        });

        it("does not widen any node's ReturnType by the contextExpression's cardinality", () => {
            // Regression: a chain whose tail naturally returns a singular
            // value (e.g. `join`) was previously being decorated with `[]` on
            // the *root* node when the contextExpression returned a collection,
            // because the result described the flat-mapped overall expression
            // rather than the per-item evaluation. The AST should now describe
            // the per-item evaluation in isolation.
            const r = validateFhirpathExpression(
                "trace('trc').given.join(' ').combine(family).join(', ')",
                {
                    fhirVersion: "r4",
                    contextType: "Patient",
                    contextExpression: "name",
                },
            );
            expect(r.diagnostics.filter((d) => d.severity === "error")).toEqual([]);
            expect(r.expectedReturnType).toBe("string");
            expect(r.expectedReturnIsCollection).toBe(false);
            expect(r.parseDebugTree?.ReturnType).toBe("string");
            // Appending a further single-valued function must not "move" the
            // bug to the new tail.
            const r2 = validateFhirpathExpression(
                "trace('trc').given.join(' ').combine(family).join(', ').substring(2)",
                {
                    fhirVersion: "r4",
                    contextType: "Patient",
                    contextExpression: "name",
                },
            );
            expect(r2.diagnostics.filter((d) => d.severity === "error")).toEqual([]);
            expect(r2.parseDebugTree?.ReturnType).toBe("string");
            expect(r2.expectedReturnIsCollection).toBe(false);
        });
    });

    describe("environment variable semantics (%context, %resource, %rootResource)", () => {
        // Per https://build.fhir.org/ig/HL7/FHIRPath/#scoped-functions:
        //   - %context     = the *initial* type of the expression being
        //                    evaluated (the seed/root scope for the expression).
        //   - %resource    = the input *resource* the expression is being
        //                    evaluated against (NOT the current focus).
        //   - %rootResource = the container resource (defaults to %resource).
        // None of these are rebound by scoped functions like where/select.

        it("%resource is the input resource type, not the contextExpression result", () => {
            const r = validateFhirpathExpression("%resource", {
                fhirVersion: "r4",
                contextType: "Patient",
                contextExpression: "Patient.name", // navigates into HumanName
            });
            // Even though the expression's input is HumanName (per-item),
            // %resource must remain Patient.
            expect(r.diagnostics.filter((d) => d.severity === "error")).toEqual([]);
            expect(r.expectedReturnType).toBe("Patient");
            // The result describes the per-item evaluation in isolation —
            // singular `%resource` per HumanName item — and is not widened by
            // the outer contextExpression's collection-ness.
            expect(r.expectedReturnIsCollection).toBe(false);
        });

        it("%context is the initial scope of the expression being evaluated", () => {
            const r = validateFhirpathExpression("%context", {
                fhirVersion: "r4",
                contextType: "Patient",
                contextExpression: "Patient.name",
            });
            expect(r.diagnostics.filter((d) => d.severity === "error")).toEqual([]);
            // %context follows the contextExpression result (singular per item).
            expect(r.expectedReturnType).toBe("HumanName");
        });

        it("%context defaults to the contextType when no contextExpression is given", () => {
            const r = validateFhirpathExpression("%context", {
                fhirVersion: "r4",
                contextType: "Patient",
            });
            expect(r.expectedReturnType).toBe("Patient");
        });

        it("%resource is reachable via dotted navigation (e.g. %resource.active)", () => {
            const r = validateFhirpathExpression("%resource.active", {
                fhirVersion: "r4",
                contextType: "Patient",
                contextExpression: "Patient.name",
            });
            expect(r.diagnostics.filter((d) => d.severity === "error")).toEqual([]);
            expect(r.expectedReturnType).toBe("boolean");
        });

        it("%rootResource defaults to %resource when no explicit root is given", () => {
            const r = validateFhirpathExpression("%rootResource", {
                fhirVersion: "r4",
                contextType: "Patient",
            });
            expect(r.expectedReturnType).toBe("Patient");
        });

        it("an explicit `resource` option overrides the contextType-based default", () => {
            // E.g. evaluating an expression whose input resource is a Bundle
            // entry (HumanName) but %resource should still be the containing
            // Patient. Caller can override via `resource`.
            const r = validateFhirpathExpression("%resource", {
                fhirVersion: "r4",
                contextType: "HumanName",
                resource: { types: [], isCollection: false },
            });
            // Empty types — but no error: the user explicitly cleared it.
            expect(r.expectedReturnType).toBe("");
        });
    });

    describe("scoped function context handling", () => {
        // Per the spec, scoped functions (where/select/all/exists/repeat/
        // aggregate/sort) evaluate their lambda argument with $this set to
        // each input element. %context and %resource are *not* rebound.

        it("$this inside where() is the singular per-item type of the input", () => {
            const r = validateFhirpathExpression("Patient.name.where($this.use = 'official').given", {
                fhirVersion: "r4",
                contextType: "Patient",
            });
            // $this.use must resolve against HumanName (singular), not HumanName[].
            expect(r.diagnostics.filter((d) => d.severity === "error")).toEqual([]);
            expect(r.expectedReturnType).toBe("string");
            expect(r.expectedReturnIsCollection).toBe(true);
        });

        it("%resource inside a scoped function still refers to the input resource", () => {
            // `Patient.name.where(%resource.active)` — inside where()'s lambda
            // the focus is HumanName, but %resource must still be Patient.
            const r = validateFhirpathExpression("Patient.name.where(%resource.active)", {
                fhirVersion: "r4",
                contextType: "Patient",
            });
            expect(r.diagnostics.filter((d) => d.severity === "error")).toEqual([]);
            // where() returns the input type (HumanName collection).
            expect(r.expectedReturnType).toBe("HumanName");
            expect(r.expectedReturnIsCollection).toBe(true);
        });

        it("%context inside a scoped function still refers to the initial scope", () => {
            // With contextExpression `Patient.name`, %context = HumanName.
            // Inside the inner where() lambda the focus is the HumanName.use
            // string per item, but %context must still be HumanName.
            const r = validateFhirpathExpression("given.where(%context.use = 'official')", {
                fhirVersion: "r4",
                contextType: "Patient",
                contextExpression: "Patient.name",
            });
            expect(r.diagnostics.filter((d) => d.severity === "error")).toEqual([]);
            expect(r.expectedReturnType).toBe("string");
        });

        it("nested scoped functions preserve %resource across both levels", () => {
            const r = validateFhirpathExpression(
                "Patient.contact.where(name.where(%resource.active).exists())",
                { fhirVersion: "r4", contextType: "Patient" },
            );
            expect(r.diagnostics.filter((d) => d.severity === "error")).toEqual([]);
        });

        it("select() projection's $this is the singular per-item type", () => {
            const r = validateFhirpathExpression("Patient.name.select($this.use)", {
                fhirVersion: "r4",
                contextType: "Patient",
            });
            expect(r.diagnostics.filter((d) => d.severity === "error")).toEqual([]);
            expect(r.expectedReturnType).toBe("code");
            expect(r.expectedReturnIsCollection).toBe(true);
        });

        it("non-lambda function arguments inside select() resolve in the select item scope", () => {
            const r = validateFhirpathExpression(
                "name.select(trace('trc').given.join(' ').combine(family).join(', '))",
                {
                    fhirVersion: "r4",
                    contextType: "Patient",
                },
            );
            expect(r.diagnostics.filter((d) => d.severity === "error")).toEqual([]);
            expect(r.expectedReturnType).toBe("string");
            expect(r.expectedReturnIsCollection).toBe(true);
        });

        it("trace()'s name argument is evaluated in the outer scope, not against input elements", () => {
            // Per the FHIRPath spec, `trace(name : String, projection : Expression)`
            // is a scoped function only for the `projection` argument; the
            // `name` is a regular String evaluated in the current lexical
            // scope. Here `family` is used as the trace label and must resolve
            // against the outer Patient (not against each HumanName), so it
            // produces a prop-not-found error because Patient has no `family`.
            const r = validateFhirpathExpression(
                "Patient.name.trace(family, given)",
                { fhirVersion: "r4", contextType: "Patient" },
            );
            expect(
                r.diagnostics.some(
                    (d) => d.severity === "error" && d.code === "prop-not-found",
                ),
            ).toBe(true);
        });

        it("trace()'s projection argument is a scoped lambda over input elements", () => {
            // `given` resolves against each HumanName because `projection` is
            // typed Expression — a scoped argument.
            const r = validateFhirpathExpression(
                "Patient.name.trace('label', given)",
                { fhirVersion: "r4", contextType: "Patient" },
            );
            expect(r.diagnostics.filter((d) => d.severity === "error")).toEqual([]);
        });

        it("aggregate()'s init argument is evaluated in the outer scope, not against input elements", () => {
            // Per the spec, `aggregate(aggregator : expression, init : value)`
            // evaluates `init` in the current lexical scope. `family` must
            // therefore resolve against the outer Patient and produce a
            // prop-not-found error.
            const r = validateFhirpathExpression(
                "Patient.name.aggregate($this & ',' & $total, family)",
                { fhirVersion: "r4", contextType: "Patient" },
            );
            expect(
                r.diagnostics.some(
                    (d) => d.severity === "error" && d.code === "prop-not-found",
                ),
            ).toBe(true);
        });

        it("sort() with multiple key selectors produces no arity error", () => {            const r = validateFhirpathExpression(
                "Patient.name.sort(family, given.first())",
                {
                    fhirVersion: "r4",
                    contextType: "Patient",
                },
            );
            expect(r.diagnostics.filter((d) => d.severity === "error")).toEqual([]);
        });

        it("coalesce() with multiple arguments returns the union of their types", () => {
            // coalesce(family, text) where input is HumanName: returns string | string = string
            const r = validateFhirpathExpression(
                "name.select(coalesce(family, text))",
                {
                    fhirVersion: "r4",
                    contextType: "Patient",
                },
            );
            expect(r.diagnostics.filter((d) => d.severity === "error")).toEqual([]);
            expect(r.expectedReturnType).toBe("string");
        });

        it("coalesce() with a string fallback literal accepts arbitrary args without arity error", () => {
            const r = validateFhirpathExpression(
                "coalesce(Patient.name.first().family, Patient.name.first().text, 'unknown')",
                {
                    fhirVersion: "r4",
                    contextType: "Patient",
                },
            );
            expect(r.diagnostics.filter((d) => d.severity === "error")).toEqual([]);
        });

        it("defineVariable() exposes a variable to subsequent chained expressions", () => {
            const r = validateFhirpathExpression(
                "Patient.name.defineVariable('n').where(%n.family.exists()).family",
                {
                    fhirVersion: "r4",
                    contextType: "Patient",
                },
            );
            expect(r.diagnostics.filter((d) => d.severity === "error")).toEqual([]);
            expect(r.expectedReturnType).toBe("string");
            expect(r.expectedReturnIsCollection).toBe(true);
        });

        it("defineVariable() uses projection type for downstream variable references", () => {
            const r = validateFhirpathExpression(
                "Patient.name.defineVariable('label', 'official').where(%label = 'official').family",
                {
                    fhirVersion: "r4",
                    contextType: "Patient",
                },
            );
            expect(r.diagnostics.filter((d) => d.severity === "error")).toEqual([]);
            expect(r.expectedReturnType).toBe("string");
            expect(r.expectedReturnIsCollection).toBe(true);
        });

        it("defineVariable() value expression's Expression Scope is the input collection, not the root context", () => {
            // `name.defineVariable('fn', first())` — the `first()` value
            // expression operates on the input collection (`name` => HumanName),
            // not the root `%context` (Patient). Its Expression Scope axis must
            // therefore report HumanName.
            const r = validateFhirpathExpression(
                "name.defineVariable('fn', first()).select(%fn.family & '-' & family)",
                {
                    fhirVersion: "r4",
                    contextType: "Patient",
                },
            );
            expect(r.diagnostics.filter((d) => d.severity === "error")).toEqual([]);
            // Locate the `first()` FunctionCallExpression anywhere in the tree.
            function findFunction(node: JsonNode | undefined, name: string): JsonNode | undefined {
                if (!node) return undefined;
                if (node.ExpressionType === "FunctionCallExpression" && node.Name === name) return node;
                for (const a of node.Arguments ?? []) {
                    const found = findFunction(a, name);
                    if (found) return found;
                }
                return undefined;
            }
            const first = findFunction(r.parseDebugTree, "first");
            expect(first).toBeDefined();
            const scope = first?.Arguments?.[0];
            expect(scope?.ExpressionType).toBe("AxisExpression");
            expect(scope?.Name).toBe("builtin.that");
            expect(scope?.ReturnType).toBe("HumanName[]");
        });

        it("aggregate() returns the type of the init/aggregator expression", () => {
            // (1 | 2 | 3).aggregate($this + $total, 0) => Integer
            const r = validateFhirpathExpression(
                "(1 | 2 | 3).aggregate($this + $total, 0)",
                {
                    fhirVersion: "r4",
                    contextType: "Patient",
                },
            );
            expect(r.diagnostics.filter((d) => d.severity === "error")).toEqual([]);
            expect(r.expectedReturnType).toBe("integer");
        });

        it("aggregate() without init still yields the aggregator's type", () => {
            // The aggregator is `$this + $total`. Without init, $total is empty
            // so the binary + falls back to $this's type (Integer).
            const r = validateFhirpathExpression(
                "(1 | 2 | 3).aggregate($this)",
                {
                    fhirVersion: "r4",
                    contextType: "Patient",
                },
            );
            expect(r.diagnostics.filter((d) => d.severity === "error")).toEqual([]);
            expect(r.expectedReturnType).toBe("integer");
        });

        it("aggregate() with empty $total: string concat & yields string", () => {
            // ('a' | 'b').aggregate($this & $total) — no init, so $total is
            // empty. String concat with an empty operand still yields String.
            const r = validateFhirpathExpression(
                "('a' | 'b').aggregate($this & $total)",
                {
                    fhirVersion: "r4",
                    contextType: "Patient",
                },
            );
            expect(r.diagnostics.filter((d) => d.severity === "error")).toEqual([]);
            expect(r.expectedReturnType).toBe("string");
        });
    });

    describe("parity with the legacy fhirpath.js tree", () => {
        // When stripped of ReturnType + position info, the validator's typed
        // AST must produce the same tree shape (ExpressionType + Name +
        // Arguments) as the legacy `convertFhirPathJsToAst` produces from
        // fhirpath.parse(...). This is the safety net for the typed-AST
        // tab continuing to render the same nodes the user already expects.
        const samples = [
            "Patient.name.given",
            "Patient.name.where(use = 'official').given",
            "(1 + 1).toString()",
            "name.given.first()",
            "Patient.name.exists()",
            "1 + 2 * 3",
            "%resource.id",
        ];
        for (const expr of samples) {
            it(`matches legacy AST for: ${expr}`, () => {
                const expected = shapeOf(legacyTree(expr));
                const r = validateFhirpathExpression(expr, {
                    fhirVersion: "r4",
                    contextType: "Patient",
                });
                expect(r.parseDebugTree).toBeDefined();
                const actual = shapeOf(r.parseDebugTree);
                expect(actual).toEqual(expected);
            });
        }
    });
});

describe("FHIRPath validator — instance selector (object construction)", () => {
    it("types a static Coding construction and validates its elements", () => {
        const r = validateFhirpathExpression(
            "Coding { system : 'http://example.org/demo', code : 'c1' }",
            { fhirVersion: "r4" },
        );
        expect(r.diagnostics).toEqual([]);
        expect(r.expectedReturnType).toBe("Coding");
        expect(r.expectedReturnIsCollection).toBe(false);
        expect(r.parseDebugTree?.ExpressionType).toBe("NewNodeExpression");
        expect(r.parseDebugTree?.Name).toBe("Coding");
        const elementNodes = r.parseDebugTree?.Arguments ?? [];
        expect(elementNodes.map((n) => n.Name)).toEqual(["system", "code"]);
        expect(elementNodes[0].ExpressionType).toBe("InstanceElementSelector");
    });

    it("accepts an empty object construction { : }", () => {
        const r = validateFhirpathExpression("Period {:}", { fhirVersion: "r4" });
        expect(r.diagnostics).toEqual([]);
        expect(r.expectedReturnType).toBe("Period");
        expect(r.parseDebugTree?.Arguments).toEqual([]);
    });

    it("resolves a namespace-prefixed type name (FHIR.Identifier)", () => {
        const r = validateFhirpathExpression(
            "FHIR.Identifier { system : 'urn:oid:1.2.3', value : 'N1' }",
            { fhirVersion: "r4" },
        );
        expect(r.diagnostics).toEqual([]);
        expect(r.expectedReturnType).toBe("Identifier");
    });

    it("validates nested constructions and complex element types", () => {
        const r = validateFhirpathExpression(
            "CodeableConcept { coding : Coding { system : 'http://x', code : 'y' }, text : 'hi' }",
            { fhirVersion: "r4" },
        );
        expect(r.diagnostics).toEqual([]);
        expect(r.expectedReturnType).toBe("CodeableConcept");
    });

    it("flags an unknown construction type", () => {
        const r = validateFhirpathExpression("NotAType { a : 1 }", { fhirVersion: "r4" });
        const errors = r.diagnostics.filter((d) => d.severity === "error");
        expect(errors.some((d) => d.code === "unknown-type")).toBe(true);
        expect(errors[0].message).toContain("NotAType");
    });

    it("flags an element that does not exist on the constructed type", () => {
        const r = validateFhirpathExpression(
            "Coding { notARealElement : 'x' }",
            { fhirVersion: "r4" },
        );
        const errors = r.diagnostics.filter((d) => d.severity === "error");
        expect(errors.some((d) => d.code === "instance-element-not-found")).toBe(true);
        const err = errors.find((d) => d.code === "instance-element-not-found")!;
        expect(err.message).toContain("notARealElement");
        expect(err.message).toContain("Coding");
        // The diagnostic carries the character span of the offending element.
        expect(err.length).toBeGreaterThan(0);
    });

    it("flags a value whose type is not assignable to the element", () => {
        // `period` on Identifier expects a Period; a string literal is wrong.
        const r = validateFhirpathExpression(
            "Identifier { period : 'not-a-period' }",
            { fhirVersion: "r4" },
        );
        const errors = r.diagnostics.filter((d) => d.severity === "error");
        expect(errors.some((d) => d.code === "instance-element-type-mismatch")).toBe(true);
        const err = errors.find((d) => d.code === "instance-element-type-mismatch")!;
        expect(err.message).toContain("period");
        expect(err.message).toContain("Period");
    });

    it("accepts a System primitive value assigned to a FHIR primitive element", () => {
        // `value: 'final'` on the `code` primitive (special value element).
        const r = validateFhirpathExpression("code { value : 'final' }", { fhirVersion: "r4" });
        expect(r.diagnostics.filter((d) => d.severity === "error")).toEqual([]);
        expect(r.expectedReturnType).toBe("code");
    });

    it("validates element value expressions against the input focus", () => {
        // `code : gender` resolves `gender` against the Patient focus.
        const r = validateFhirpathExpression(
            "Coding { system : 'http://x', code : gender }",
            { fhirVersion: "r4", contextType: "Patient" },
        );
        expect(r.diagnostics.filter((d) => d.severity === "error")).toEqual([]);
        expect(r.expectedReturnType).toBe("Coding");
    });

    it("reports unresolved properties used inside element values", () => {
        const r = validateFhirpathExpression(
            "Coding { code : notAPatientProperty }",
            { fhirVersion: "r4", contextType: "Patient" },
        );
        const errors = r.diagnostics.filter((d) => d.severity === "error");
        expect(errors.some((d) => d.code === "prop-not-found")).toBe(true);
    });

    it("constructs a single object; collection cardinality comes from select()", () => {
        // Standalone construction is a single object.
        const single = validateFhirpathExpression(
            "Coding { system : 'http://x', code : gender }",
            { fhirVersion: "r4", contextType: "Patient" },
        );
        expect(single.expectedReturnIsCollection).toBe(false);

        // Inside select() over a collection, the result is a collection of Codings.
        const projected = validateFhirpathExpression(
            "Patient.identifier.select(Coding { system : system, code : value })",
            { fhirVersion: "r4", contextType: "Patient" },
        );
        expect(projected.diagnostics.filter((d) => d.severity === "error")).toEqual([]);
        expect(projected.expectedReturnType).toBe("Coding");
        expect(projected.expectedReturnIsCollection).toBe(true);
    });
});
