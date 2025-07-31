import axios, { AxiosError } from "axios";
import type { OperationOutcome, OperationOutcomeIssue, Coding } from "fhir/r4";

export const requestFhirAcceptHeaders = "application/fhir+json; fhirVersion=4.0, application/fhir+json";
export const requestFhirAcceptXmlHeaders = "application/fhir+xml; fhirVersion=4.0, application/fhir+xml";

export function CreateOperationOutcome(
  severity: "error" | "fatal" | "warning" | "information",
  code: "invalid" | "structure" | "required" | "value" | "invariant"
    | "security" | "login" | "unknown" | "expired" | "forbidden" | "suppressed"
    | "processing" | "not-supported" | "duplicate" | "multiple-matches" | "not-found" | "deleted" | "too-long" | "code-invalid" | "extension" | "too-costly" | "business-rule" | "conflict"
    | "transient" | "lock-error" | "no-store" | "exception" | "timeout" | "incomplete" | "throttled"
    | "informational",
  message: string,
  coding?: Coding,
  diagnostics?: string
): OperationOutcome {
  const result: OperationOutcome = {
    resourceType: 'OperationOutcome',
    issue: []
  };

  const issue: OperationOutcomeIssue = {
    severity: severity,
    code: code,
    details: { text: message }
  };

  if (coding) {
    issue.details!.coding = [coding];
  }
  if (diagnostics) {
    issue.diagnostics = diagnostics;
  }

  result.issue.push(issue);
  return result;
}
