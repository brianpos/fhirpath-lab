import {decodeHTML, decodeXML, encodeHTML, encodeXML} from "entities";
import {DateTime, FixedOffsetZone} from "luxon";
import {LosslessNumber} from "lossless-json";
import type {FmlExecutionOptions} from "./contracts";
import {isNumericValue, isObject} from "./values";

function dateFormats(format: string): {formats: {text: string; meridiem?: number}[]; fraction: number; year: boolean; month: boolean; day: boolean; hour: boolean} {
    let formats: {text: string; meridiem?: number}[] = [{text: ""}];
    let fraction = 0;
    const tokens = format.match(/'(?:[^']|'')*'|([A-Za-z])\1*|[^A-Za-z']/g) ?? [];
    for (const token of tokens) {
        const supported = /^(yy|yyyy|M{1,4}|d{1,2}|h{1,2}|H{1,2}|m{1,2}|s{1,2}|z)$/.test(token);
        const alternatives = /^S+$/.test(token) ? ["u"] : token === "Z" ? ["ZZZ", "'Z'"]
            : token === "a" ? ["a", "'A'", "'P'"] : [/^[A-Za-z]+$/.test(token) && !supported ? `'${token}'` : token];
        if (/^S+$/.test(token)) {
            if (fraction || token.length > 3) throw new Error("Date transforms support one fractional-second field with one to three digits.");
            fraction = token.length;
        }
        formats = formats.flatMap(format => alternatives.map(text => ({
            text: format.text + text,
            meridiem: text === "'A'" ? 0 : text === "'P'" ? 1 : format.meridiem,
        })));
    }
    return {formats, fraction, year: tokens.some(token => /^(yy|yyyy)$/.test(token)), month: tokens.some(token => /^M{1,4}$/.test(token)),
        day: tokens.some(token => /^d{1,2}$/.test(token)), hour: tokens.some(token => /^[hH]{1,2}$/.test(token))};
}

export {orderTransformParameters as orderedParameters} from "@fhirpath-lab/validator";

export function basicTransform(
    name: string, args: readonly (readonly unknown[])[], targetType: string | undefined, options: FmlExecutionOptions,
): {value: unknown; typeName: string}[] {
    const one = (index: number): unknown => {
        if (args[index]?.length !== 1) throw new Error(`${name} argument ${index + 1} requires a singleton.`);
        return args[index][0];
    };
    const string = (index: number): string => {
        const value = one(index);
        if (typeof value !== "string") throw new Error(`${name} argument ${index + 1} requires a string.`);
        return value;
    };
    const typed = (value: unknown, typeName: string) => [{value, typeName}];
    if (args.some(arg => arg.length === 0) && !["uuid", "append"].includes(name)) return [];
    if (name === "uuid") {
        const uuid = options.uuid?.() ?? globalThis.crypto.randomUUID();
        if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(uuid)) throw new Error("The UUID service must return a lowercase UUID.");
        return typed(uuid, "string");
    }
    if (name === "c" || name === "cc") {
        if (name === "cc" && args.length === 1) return typed({text: string(0)}, "CodeableConcept");
        const coding = {system: string(0), code: string(1), ...(args.length === 3 ? {display: string(2)} : {})};
        return typed(name === "c" ? coding : {coding: [coding]}, name === "c" ? "Coding" : "CodeableConcept");
    }
    if (name === "id") {
        return typed({system: string(0), value: string(1), ...(args.length === 3 ? {type: {coding: [{
            system: "http://terminology.hl7.org/CodeSystem/v2-0203", code: string(2),
        }]}} : {})}, "Identifier");
    }
    if (name === "cp") {
        const value = string(args.length === 1 ? 0 : 1);
        const system = args.length === 2 ? string(0) : value.includes("@") ? "email"
            : /^https?:\/\//.test(value) ? "url" : /^\+?[\d ()-]+$/.test(value) ? "phone" : undefined;
        if (!system) throw new Error("Cannot infer ContactPoint.system from its value.");
        return typed({system, value}, "ContactPoint");
    }
    if (name === "qty") {
        if (args.length === 1) {
            const match = /^(<=|>=|<|>)?\s*(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\s+(.+)$/.exec(string(0));
            if (!match) throw new Error("Invalid natural Quantity representation.");
            return typed({...(match[1] ? {comparator: match[1]} : {}), value: new LosslessNumber(match[2]), unit: match[3]}, "Quantity");
        }
        const value = one(0);
        if (!isNumericValue(value)) throw new Error("qty requires a decimal value.");
        return typed({value, unit: string(1), ...(args.length === 4 ? {system: string(2), code: string(3)} : {})}, "Quantity");
    }
    if (name === "reference" || name === "pointer") {
        const value = one(0);
        if (!isObject(value) || typeof value.resourceType !== "string" || typeof value.id !== "string" || value.id.length === 0) {
            throw new Error(`${name} requires an identified resource or a host reference service.`);
        }
        return typed(`${value.resourceType}/${value.id}`, "string");
    }
    if (name === "cast") {
        const type = (args.length === 2 ? string(1) : targetType)?.replace(/^FHIR\./, "");
        if (!type) throw new Error("cast requires an explicit or unambiguous target type.");
        return typed(one(0), type);
    }
    if (name === "escape") {
        let value = string(0);
        const from = string(1).toLowerCase();
        const to = string(2).toLowerCase();
        if (from === to) return typed(value, "string");
        if (from === "html") value = decodeHTML(value);
        else if (from === "xml") value = decodeXML(value);
        else if (from === "json") value = JSON.parse(`"${value}"`);
        else if (from === "url") value = decodeURIComponent(value);
        else if (from !== "none") throw new Error(`Unsupported escape format '${from}'.`);
        if (to === "html") value = encodeHTML(value);
        else if (to === "xml") value = encodeXML(value);
        else if (to === "json") value = JSON.stringify(value).slice(1, -1);
        else if (to === "url") value = encodeURIComponent(value);
        else if (to !== "none") throw new Error(`Unsupported escape format '${to}'.`);
        return typed(value, "string");
    }
    if (/^(unixTo|to)(DateTime|Date|Time)$/.test(name)) {
        let date: DateTime;
        let shape: ReturnType<typeof dateFormats> | undefined;
        if (name.startsWith("unixTo")) {
            const value = one(0);
            if (!isNumericValue(value)) throw new Error(`${name} requires an integer millisecond offset.`);
            const millis = Number(String(value));
            if (!Number.isSafeInteger(millis)) throw new Error(`${name} requires a safe integer millisecond offset.`);
            const zoneText = args.length === 2 ? string(1) : "+00:00";
            const zone = /^([+-])(\d{2}):(\d{2})$/.exec(zoneText);
            if (!zone || Number(zone[2]) > 14 || Number(zone[3]) > 59 || Number(zone[2]) === 14 && Number(zone[3]) !== 0) throw new Error("Invalid timezone offset.");
            const minutes = (Number(zone[2]) * 60 + Number(zone[3])) * (zone[1] === "-" ? -1 : 1);
            date = DateTime.fromMillis(millis, {zone: FixedOffsetZone.instance(minutes)});
        } else {
            const format = string(1);
            const source = string(0);
            shape = dateFormats(format);
            date = DateTime.invalid("No matching date format.");
            for (const candidate of shape.formats) {
                let parsed = DateTime.fromFormat(source, candidate.text, {setZone: true, zone: "UTC"});
                if (!parsed.isValid) continue;
                if (shape.fraction) {
                    const fraction: unknown = DateTime.fromFormatExplain(source, candidate.text).matches?.u;
                    if (typeof fraction !== "string" || fraction.length !== shape.fraction) continue;
                }
                if (candidate.meridiem !== undefined) {
                    if (parsed.hour < 1 || parsed.hour > 12) continue;
                    parsed = parsed.set({hour: parsed.hour % 12 + candidate.meridiem * 12});
                }
                date = parsed;
                break;
            }
        }
        if (!date.isValid) throw new Error(`Invalid ${name} input: ${date.invalidExplanation ?? date.invalidReason}.`);
        if (Math.abs(date.offset) > 14 * 60) throw new Error("Invalid timezone offset.");
        if (shape && !shape.year && !name.endsWith("ToTime") && name !== "toTime") throw new Error(`${name} requires a year in its format.`);
        if (shape?.hour && name === "toDateTime" && (!shape.month || !shape.day)) throw new Error("toDateTime requires a full date when a time is present.");
        const partialDate = shape && !shape.month ? date.toFormat("yyyy") : shape && !shape.day ? date.toFormat("yyyy-MM") : date.toISODate();
        if (name.endsWith("Date")) return typed(partialDate, "date");
        const fractionDigits = shape?.fraction ?? (date.millisecond ? 3 : 0);
        const fractionText = fractionDigits ? "." + String(date.millisecond).padStart(3, "0").slice(0, fractionDigits) : "";
        if (name.endsWith("Time") && !name.endsWith("DateTime")) return typed(date.toFormat("HH:mm:ss") + fractionText, "time");
        if (shape && !shape.hour) return typed(partialDate, "dateTime");
        const result = date.toISO({suppressMilliseconds: fractionDigits === 0});
        return typed(fractionDigits && result ? result.replace(/\.\d{3}(?=Z|[+-]\d{2}:\d{2}$)/, fractionText) : result, "dateTime");
    }
    throw new Error(`Unknown transform '${name}'.`);
}
