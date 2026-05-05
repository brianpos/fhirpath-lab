import { validateFhirpathExpression } from "../helpers/fhirpath_validator";

describe("FHIRPath validator visitor", () => {
    it("annotates types for (1+1).toString()", () => {
        const r = validateFhirpathExpression("(1+1).toString()", { fhirVersion: "r4" });
        expect(r.diagnostics).toEqual([]);
        expect(r.expectedReturnType).toBe("string");
        expect(r.parseDebugTree).toBeDefined();
        expect(r.parseDebugTree?.ExpressionType).toBe("FunctionCallExpression");
        expect(r.parseDebugTree?.Name).toBe("toString");
        expect(r.parseDebugTree?.ReturnType).toBe("string");
        // The argument tree should contain the +1+1 BinaryExpression with ReturnType integer
        const args = r.parseDebugTree?.Arguments ?? [];
        const arg = args[0];
        expect(arg?.ExpressionType).toBe("BinaryExpression");
        expect(arg?.Name).toBe("+");
        expect(arg?.ReturnType).toBe("integer");
        const subArgs = arg?.Arguments ?? [];
        expect(subArgs.length).toBeGreaterThanOrEqual(2);
        for (const literalArg of subArgs.slice(-2)) {
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

    it("expands choice types like Patient.deceasedBoolean", () => {
        const r = validateFhirpathExpression("Patient.deceasedBoolean", {
            fhirVersion: "r4",
            contextType: "Patient",
        });
        expect(r.diagnostics).toEqual([]);
        expect(r.expectedReturnType).toBe("boolean");
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
});
