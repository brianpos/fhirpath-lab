import {evaluate} from "fhirpath";
import {
    FmlDebugType,
    FmlTraceVariable,
    FmlTypedValue,
    JsonValue,
} from "./contracts";
import {createFmlTypedValue} from "./FmlTypedValue";

export interface FmlVariablePathEvaluator {
    evaluate(input: JsonValue, expression: string): JsonValue[];
}

export class FhirPathVariablePathEvaluator implements FmlVariablePathEvaluator {
    public evaluate(input: JsonValue, expression: string): JsonValue[] {
        const result: unknown = evaluate(input, expression);
        if (!Array.isArray(result) || !result.every(isJsonValue)) {
            throw new Error("FHIRPath evaluation returned a non-JSON value.");
        }
        return result;
    }
}

export function hydratePathOnlyVariables(
    variables: FmlTraceVariable[],
    input: JsonValue,
    evaluator: FmlVariablePathEvaluator,
): void {
    const evaluationInput = structuredClone(input);
    for (const variable of variables) {
        if (
            variable.data !== undefined
            || variable.errorMessage !== undefined
            || !variable.path.trim()
            || !isInputVariable(variable)
        ) {
            continue;
        }

        try {
            const results = evaluator.evaluate(evaluationInput, variable.path);
            variable.data = typedVariableValue(results, variable.datatype);
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            variable.errorMessage = variable.errorMessage
                ? `${variable.errorMessage}; ${message}`
                : `Unable to evaluate FHIRPath '${variable.path}': ${message}`;
        }
    }
}

function typedVariableValue(results: JsonValue[], datatype: string | undefined): FmlTypedValue {
    const declaredType = datatype ? parseDeclaredType(datatype) : undefined;
    const value: JsonValue = declaredType?.collection || results.length !== 1
        ? results
        : results[0];
    return createFmlTypedValue(
        value,
        declaredType
            ? {
                "$": {
                    ...declaredType,
                    ...(Array.isArray(value) ? {collection: true} : {}),
                },
            }
            : undefined,
    );
}

function parseDeclaredType(datatype: string): FmlDebugType {
    const collection = datatype.endsWith("[]");
    const normalized = collection ? datatype.slice(0, -2) : datatype;
    const pipeIndex = normalized.lastIndexOf("|");
    if (pipeIndex > 0 && pipeIndex < normalized.length - 1) {
        return {
            namespace: normalized.slice(0, pipeIndex),
            name: normalized.slice(pipeIndex + 1),
            ...(collection ? {collection: true} : {}),
        };
    }
    if (normalized.startsWith("FHIR.") && normalized.length > 5) {
        return {
            namespace: "FHIR",
            name: normalized.slice(5),
            ...(collection ? {collection: true} : {}),
        };
    }
    return {
        name: normalized,
        ...(collection ? {collection: true} : {}),
    };
}

function isInputVariable(variable: FmlTraceVariable): boolean {
    const mode = variable.mode.toUpperCase();
    return mode === "INPUT" || mode === "SHARED" || mode === "";
}

function isJsonValue(value: unknown): value is JsonValue {
    if (
        value === null
        || typeof value === "boolean"
        || typeof value === "number"
        || typeof value === "string"
    ) {
        return true;
    }
    if (Array.isArray(value)) {
        return value.every(isJsonValue);
    }
    return typeof value === "object"
        && Object.values(value as Record<string, unknown>).every(isJsonValue);
}
