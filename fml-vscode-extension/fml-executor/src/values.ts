import {FP_Decimal} from "fhirpath";
import {isLosslessNumber, LosslessNumber, parse, stringify} from "lossless-json";

export function parseFmlJson(text: string): unknown {
    return parse(text);
}

export function stringifyFmlJson(value: unknown, space?: number): string {
    const text = stringify(value, (_key, item: unknown) =>
        item instanceof FP_Decimal ? new LosslessNumber(item.toString()) : item, space);
    if (text === undefined) throw new Error("The FML value cannot be serialized as JSON.");
    return text;
}

export function isObject(value: unknown): value is Record<string, unknown> {
    return value !== null && typeof value === "object" && !Array.isArray(value)
        && !isLosslessNumber(value) && !(value instanceof FP_Decimal);
}

export function isNumericValue(value: unknown): boolean {
    return typeof value === "bigint" || typeof value === "number" && Number.isFinite(value)
        || isLosslessNumber(value) || value instanceof FP_Decimal;
}

export function cloneFmlValue(value: unknown, onValue?: () => void): unknown {
    if (value !== undefined) onValue?.();
    if (isLosslessNumber(value)) return new LosslessNumber(value.value);
    if (value instanceof FP_Decimal) return FP_Decimal.getDecimal(value.toString());
    if (Array.isArray(value)) return value.map(item => cloneFmlValue(item, onValue));
    if (isObject(value)) {
        const copy: Record<string, unknown> = {};
        for (const [key, item] of Object.entries(value)) {
            Object.defineProperty(copy, key, {value: cloneFmlValue(item, onValue), enumerable: true, writable: true, configurable: true});
        }
        return copy;
    }
    return value;
}

export function toEvaluationValue(value: unknown): unknown {
    if (isLosslessNumber(value)) {
        const integer = Number(value.value);
        return /^-?\d+$/.test(value.value) && Number.isSafeInteger(integer)
            ? integer : FP_Decimal.getDecimal(value.value);
    }
    if (Array.isArray(value)) return value.map(toEvaluationValue);
    if (isObject(value)) {
        return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, toEvaluationValue(item)]));
    }
    return value;
}
