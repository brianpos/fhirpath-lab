import type {FmlExecutionOptions} from "./contracts";
import {conceptMapBindings} from "./ConceptMaps";
import {isObject} from "./values";

export type FhirTerminologyVersion = "R4" | "R5";

export class FhirTerminologyService {
    private readonly endpoint: string;

    public constructor(
        serverUrl: string,
        private readonly fhirVersion: FhirTerminologyVersion = "R4",
        private readonly fetchImplementation: typeof fetch = fetch,
    ) {
        let url: URL;
        try {
            url = new URL(serverUrl);
        } catch (error) {
            throw new Error("The terminology server must have an absolute HTTP or HTTPS base URL.", {cause: error});
        }
        if (url.protocol !== "http:" && url.protocol !== "https:") {
            throw new Error("The terminology server must have an HTTP or HTTPS base URL.");
        }
        if (fhirVersion !== "R4" && fhirVersion !== "R5") {
            throw new Error("The terminology server FHIR version must be R4 or R5.");
        }
        url.pathname = `${url.pathname.replace(/\/+$/, "")}/ConceptMap/$translate`;
        if (url.hash) throw new Error("The terminology service base URL must not contain a fragment.");
        this.endpoint = url.toString();
    }

    public readonly translate: NonNullable<FmlExecutionOptions["translate"]> = async (source, canonical, output, signal) => {
        signal?.throwIfAborted();
        const [url, version, extra] = canonical.split("|");
        if (!url || extra !== undefined || version === "") {
            throw new Error("Terminology translation requires a ConceptMap canonical with an optional version.");
        }
        const prefix = this.fhirVersion === "R5" ? "source" : "";
        const value = source.value;
        const input = typeof value === "string"
            ? {name: `${prefix}${prefix ? "Coding" : "coding"}`, valueCoding: coding({code: value})}
            : isObject(value) && Array.isArray(value.coding)
                ? {name: `${prefix}${prefix ? "CodeableConcept" : "codeableConcept"}`,
                    valueCodeableConcept: {coding: value.coding.map(coding)}}
                : {name: `${prefix}${prefix ? "Coding" : "coding"}`, valueCoding: coding(value)};
        const parameter: object[] = [{name: "url", valueUri: url}, input];
        if (version !== undefined) parameter.push({name: "conceptMapVersion", valueString: version});
        const response = await this.fetchImplementation(this.endpoint, {
            method: "POST",
            headers: {Accept: "application/fhir+json", "Content-Type": "application/fhir+json"},
            body: JSON.stringify({resourceType: "Parameters", parameter}),
            signal,
        });
        const text = await response.text();
        let payload: unknown;
        try {
            payload = JSON.parse(text);
        } catch (error) {
            throw new Error(`Terminology $translate returned HTTP ${response.status} with invalid JSON.`, {cause: error});
        }
        if (!response.ok) {
            throw new Error(`Terminology $translate returned HTTP ${response.status} ${response.statusText}${outcomeMessage(payload)}.`);
        }
        if (isObject(payload) && payload.resourceType === "OperationOutcome") {
            throw new Error(`Terminology $translate returned an OperationOutcome${outcomeMessage(payload)}.`);
        }
        if (!isObject(payload) || payload.resourceType !== "Parameters") {
            throw new Error("Terminology $translate did not return a FHIR Parameters resource.");
        }
        const parts = parameters(payload.parameter);
        for (const part of parts) {
            if (part.name === "outcome" && isObject(part.resource)
                && Array.isArray(part.resource.issue)
                && part.resource.issue.some(issue => isObject(issue) && ["error", "fatal"].includes(String(issue.severity)))) {
                throw new Error(`Terminology $translate failed${outcomeMessage(part.resource)}.`);
            }
        }
        const results = parts.filter(part => part.name === "result");
        if (results.length !== 1 || typeof results[0].valueBoolean !== "boolean") {
            throw new Error("Terminology $translate is missing its Boolean result parameter.");
        }
        if (!results[0].valueBoolean) return [];
        const codings = parts.filter(part => part.name === "match").flatMap(part => {
            const match = parameters(part.part);
            const relationship = match.find(child => child.name === "relationship")?.valueCode
                ?? match.find(child => child.name === "equivalence")?.valueCode;
            if (relationship !== undefined && (typeof relationship !== "string" || ![
                "relatedto", "equivalent", "equal", "wider", "subsumes", "narrower", "specializes", "inexact",
                "unmatched", "disjoint", "related-to", "source-is-narrower-than-target",
                "source-is-broader-than-target", "not-related-to",
            ].includes(relationship))) {
                throw new Error("Terminology $translate returned an unrecognized match relationship.");
            }
            if (relationship !== undefined && ["not-related-to", "unmatched", "disjoint"].includes(relationship)) return [];
            const concept = match.find(child => child.name === "concept");
            if (!concept) throw new Error("Terminology $translate returned a positive match without a concept.");
            return [coding(concept.valueCoding)];
        });
        if (!codings.length) {
            throw new Error("Terminology $translate reported success without an acceptable translation.");
        }
        signal?.throwIfAborted();
        return conceptMapBindings(codings, output);
    };
}

function coding(value: unknown): Record<string, unknown> {
    if (!isObject(value) || typeof value.code !== "string" || !value.code) {
        throw new Error("Terminology translation requires a Coding with a non-empty string code.");
    }
    const result: Record<string, unknown> = {code: value.code};
    for (const key of ["system", "version", "display"]) {
        if (value[key] !== undefined) {
            if (typeof value[key] !== "string") throw new Error(`Terminology Coding.${key} must be a string.`);
            result[key] = value[key];
        }
    }
    if (value.userSelected !== undefined) {
        if (typeof value.userSelected !== "boolean") throw new Error("Terminology Coding.userSelected must be a Boolean.");
        result.userSelected = value.userSelected;
    }
    return result;
}

function parameters(value: unknown): Record<string, unknown>[] {
    if (!Array.isArray(value) || !value.every(isObject)) {
        throw new Error("Terminology $translate returned invalid Parameters parts.");
    }
    return value;
}

function outcomeMessage(value: unknown): string {
    if (!isObject(value) || !Array.isArray(value.issue)) return "";
    const messages = value.issue.filter(isObject).flatMap(issue =>
        isObject(issue.details) && typeof issue.details.text === "string"
            ? [issue.details.text] : typeof issue.diagnostics === "string" ? [issue.diagnostics] : []);
    return messages.length ? `: ${messages.join("; ")}` : "";
}
