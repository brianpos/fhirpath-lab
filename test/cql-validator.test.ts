import { analyzeCql, validateCql } from "../helpers/cql_validator";

describe("CQL source analysis", () => {
    it("recognizes and validates a standalone expression", () => {
        const analysis = analyzeCql("'Hello World' | (1 + 1).toString()");

        expect(analysis.kind).toBe("expression");
        expect(analysis.expressions).toEqual([]);
        expect(analysis.outcome).toBeUndefined();
    });

    it("does not misclassify keyword identifiers as malformed libraries", () => {
        const analysis = analyzeCql("context");

        expect(analysis.kind).toBe("expression");
        expect(analysis.outcome).toBeUndefined();
    });

    it("recognizes a library and extracts selectable public expressions", () => {
        const analysis = analyzeCql(`library Example version '1.0.0'
using FHIR version '4.0.1'

parameter Active Boolean default true
parameter "Measurement Period" Interval<DateTime>
parameter Patient FHIR.Patient

context Patient

define "Greeting": 'Hello'
define public Answer: 42
define private Internal: false`);

        expect(analysis.kind).toBe("library");
        expect(analysis.libraryName).toBe("Example");
        expect(analysis.libraryVersion).toBe("1.0.0");
        expect(analysis.expressions).toEqual([
            expect.objectContaining({ name: "Greeting", access: "public" }),
            expect.objectContaining({ name: "Answer", access: "public" }),
            expect.objectContaining({ name: "Internal", access: "private" }),
        ]);
        expect(analysis.parameters).toEqual([
            expect.objectContaining({ name: "Active", type: "Boolean" }),
            expect.objectContaining({
                name: "Measurement Period",
                type: "Interval<DateTime>",
            }),
            expect.objectContaining({ name: "Patient", type: "FHIR.Patient" }),
        ]);
        expect(analysis.outcome).toBeUndefined();
    });

    it("treats definitions without a library header as library content", () => {
        const analysis = analyzeCql("define Answer: 6 * 7");

        expect(analysis.kind).toBe("library");
        expect(analysis.expressions.map(expression => expression.name)).toEqual(["Answer"]);
        expect(analysis.outcome).toBeUndefined();
    });

    it("returns navigable syntax diagnostics", () => {
        const outcome = validateCql("library Broken\n\ndefine Answer: (1 +");

        expect(outcome?.issue[0]).toMatchObject({
            severity: "error",
            code: "invalid",
            details: {
                coding: [{
                    system: "http://fhirpath-lab.com/CodeSystem/validator-codes",
                    code: "syntax",
                }],
            },
        });
        expect(outcome?.issue[0].location?.[0]).toMatch(/^@\d+:\d+$/);
        expect(outcome?.issue[0].__position).toEqual({
            line: expect.any(Number),
            column: expect.any(Number),
            length: expect.any(Number),
        });
    });
});
