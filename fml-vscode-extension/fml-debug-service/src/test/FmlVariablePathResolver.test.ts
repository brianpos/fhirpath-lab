import assert from "node:assert/strict";
import test from "node:test";
import {
    FhirPathVariablePathEvaluator,
    hydratePathOnlyVariables,
} from "../FmlVariablePathResolver";
import {FmlTraceVariable} from "../contracts";
import {createFmlTypedValue} from "../FmlTypedValue";

const input = {
    resourceType: "Patient",
    id: "example",
    name: [{
        family: "Smith",
        given: ["Alice", "Anne"],
    }],
};

test("evaluates path-only variables against the input resource", () => {
    const inputBeforeEvaluation = structuredClone(input);
    const variables: FmlTraceVariable[] = [
        {name: "patient", mode: "INPUT", path: "Patient"},
        {name: "id", mode: "INPUT", path: "Patient.id"},
        {name: "given", mode: "INPUT", path: "Patient.name.given", datatype: "FHIR.string"},
    ];

    hydratePathOnlyVariables(variables, input, new FhirPathVariablePathEvaluator());

    assert.deepEqual(variables[0].data?.value, input);
    assert.deepEqual(variables[0].data?.types["$"], {
        name: "Patient",
        namespace: "FHIR",
    });
    assert.equal(variables[1].data?.value, "example");
    assert.deepEqual(variables[1].data?.types["$"], {name: "string"});
    assert.deepEqual(variables[2].data?.value, ["Alice", "Anne"]);
    assert.deepEqual(variables[2].data?.types["$"], {
        name: "string",
        namespace: "FHIR",
        collection: true,
    });
    assert.deepEqual(input, inputBeforeEvaluation);
});

test("represents an empty FHIRPath result as a typed empty collection", () => {
    const variables: FmlTraceVariable[] = [
        {name: "missing", mode: "INPUT", path: "Patient.telecom", datatype: "ContactPoint"},
    ];

    hydratePathOnlyVariables(variables, input, new FhirPathVariablePathEvaluator());

    assert.deepEqual(variables[0].data?.value, []);
    assert.deepEqual(variables[0].data?.types["$"], {
        name: "ContactPoint",
        collection: true,
    });
});

test("preserves API-provided values and does not evaluate output paths", () => {
    let evaluations = 0;
    const variables: FmlTraceVariable[] = [
        {
            name: "provided",
            mode: "INPUT",
            path: "Patient.id",
            data: createFmlTypedValue("server-value", {"$": {name: "ServerCode"}}),
        },
        {
            name: "output",
            mode: "OUTPUT",
            path: "Patient.id",
        },
        {
            name: "serverError",
            mode: "INPUT",
            path: "Patient.id",
            errorMessage: "Engine could not resolve this variable",
        },
    ];

    hydratePathOnlyVariables(variables, input, {
        evaluate: () => {
            evaluations++;
            return ["evaluated"];
        },
    });

    assert.equal(evaluations, 0);
    assert.equal(variables[0].data?.value, "server-value");
    assert.equal(variables[1].data, undefined);
    assert.equal(variables[2].data, undefined);
    assert.equal(variables[2].errorMessage, "Engine could not resolve this variable");
});

test("preserves declared collection shape for a single FHIRPath result", () => {
    const variables: FmlTraceVariable[] = [
        {name: "names", mode: "INPUT", path: "Patient.name", datatype: "FHIR.HumanName[]"},
    ];

    hydratePathOnlyVariables(variables, input, new FhirPathVariablePathEvaluator());

    assert.deepEqual(variables[0].data?.value, [{
        family: "Smith",
        given: ["Alice", "Anne"],
    }]);
    assert.deepEqual(variables[0].data?.types["$"], {
        name: "HumanName",
        namespace: "FHIR",
        collection: true,
    });
});

test("records FHIRPath errors on the variable without failing the trace", () => {
    const variables: FmlTraceVariable[] = [
        {name: "invalid", mode: "INPUT", path: "Patient.("},
    ];

    hydratePathOnlyVariables(variables, input, new FhirPathVariablePathEvaluator());

    assert.equal(variables[0].data, undefined);
    assert.match(variables[0].errorMessage ?? "", /Unable to evaluate FHIRPath 'Patient\.\('/);
});
