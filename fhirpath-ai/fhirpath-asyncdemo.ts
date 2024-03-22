import "https://deno.land/x/dotenv/load.ts";
import fhirpath from "fhirpath";
import { Coding, OperationOutcomeIssue } from "fhir/r4b";
import fhirpath_r4_model from "fhirpath/fhir-context/r4/index.js";

const streamName = Deno.args[0] ?? "fhirpath";

// --------------------------------------------------------------------------
// The concept of this POC is to demonstrate an approach to perform some
// async based methods as functions inside the fhirpath engine without
// converting the entire engine to process things asyncronously.
//
// The basic gist it to perform an initial evaluation in sync mode where
// encountering any async required methods would queue the required call,
// return a null result and continue processing the rest of the expression.
// If no async calls are required then the result is returned immediately.
// The async calls are then resolved in a post processing step.
// Then re-evaluate the expression from the start, however when encountering
// the async methods, inject the resolved results and continue processing.
// If there were no other async methods encountered, return the result.
// --------------------------------------------------------------------------

function resolve(inputs: any): string {
  return inputs.map((v: any) => "resolved" + v );
}

export function CreateOperationOutcome(
  severity: "error" | "fatal" | "warning" | "information",
  code:
    | "invalid"
    | "structure"
    | "required"
    | "value"
    | "invariant"
    | "security"
    | "login"
    | "unknown"
    | "expired"
    | "forbidden"
    | "suppressed"
    | "processing"
    | "not-supported"
    | "duplicate"
    | "multiple-matches"
    | "not-found"
    | "deleted"
    | "too-long"
    | "code-invalid"
    | "extension"
    | "too-costly"
    | "business-rule"
    | "conflict"
    | "transient"
    | "lock-error"
    | "no-store"
    | "exception"
    | "timeout"
    | "incomplete"
    | "throttled"
    | "informational",
  message: string,
  coding?: Coding,
  diagnostics?: string
): fhir4b.OperationOutcome {
  var result: fhir4b.OperationOutcome = {
    resourceType: "OperationOutcome",
    issue: [],
  };

  var issue: OperationOutcomeIssue = {
    severity: severity,
    code: code,
    details: { text: message },
  };
  if (coding && issue.details) issue.details.coding = [coding];
  if (diagnostics) issue.diagnostics = diagnostics;
  result.issue.push(issue);
  return result;
}

// interfaces for async calls stack processing
interface IResolveRequest {
  input: any; // the input item that requires resolving
  result: any[] | undefined; // when undefined this means that the result is not yet available
}

async function evaluateExpressionUsingFhirpathJs(
  resourceJson: string,
  expression: string
): Promise<any> {
  var results = [];

  // run the actual fhirpath engine
  let fhirData: fhir4b.DomainResource = { resourceType: "Patient" }; // some dummy data
  if (resourceJson) {
    try {
      fhirData = JSON.parse(resourceJson);
    } catch (err: any) {
      console.log(err);
      if (err.message) {
        throw CreateOperationOutcome("fatal", "exception", err.message);
      }
    }
  }
  var environment: Record<string, any> = {
    resource: fhirData,
    rootResource: fhirData,
  };

  var mapCalls: any = [];
  var trace = [];
  let tracefunction = function (x: any, label: string): void {
    if (Array.isArray(x)) {
      for (let item of x) {
        if (typeof item.getTypeInfo === "function") {
          let ti = item.getTypeInfo();
          // console.log(ti);
          trace.push({
            name: label ?? "",
            type: ti.name,
            value: JSON.stringify(item.data, null, 4),
          });
        } else {
          trace.push({
            name: label ?? "",
            value: JSON.stringify(item, null, 4),
          });
        }
      }
    } else {
      trace.push({ name: label ?? "", value: JSON.stringify(x, null, 4) });
    }
    console.log("TRACE3:[" + (label || "") + "]", x);
    return x;
  };

  // introduce a custom function for resolve into the options
  const userInvocationTable: UserInvocationTable = {
    pow: {
      fn: (inputs: any, exp = 2) =>
        inputs.map((i: number) => {
          mapCalls.push(i);
          return Math.pow(i, exp);
        }),
      arity: { 0: [], 1: ["Integer"] },
    },
    memberOf: {
      fn: (inputs: any, exp = 2) =>
        inputs.map((i: number) => {
          mapCalls.push(i);
          return Math.pow(i, exp);
        }),
      arity: { 0: [], 1: ["Integer"] },
    },
    resolve: {
      fn: resolve,
      arity: { 0: [] },
    },
  };

  let options = {
    traceFn: tracefunction,
    userInvocationTable: userInvocationTable,
  };

  try {
    results = fhirpath.evaluate(
      fhirData,
      expression,
      environment,
      fhirpath_r4_model,
      options
    );
    console.log("mapCalls", mapCalls);
  } catch (err: any) {
    console.log(err);
    if (err.message) {
      throw CreateOperationOutcome("fatal", "exception", err.message);
    }
  }
  return results;
}

(async () => {
  // Run a simple test expression

  let expression =
    "Patient.name.given | maritalStatus | 3.pow(5) | maritalStatus.memberOf(http://hl7.org/fhir/ValueSet/observation-vitalsignresult')";
  let resourceJson = JSON.stringify({
    resourceType: "Patient",
    name: [
      {
        given: ["John", "Doe"],
      },
    ],
    maritalStatus: {
      coding: [
        {
          system: "http://terminology.hl7.org/CodeSystem/v3-MaritalStatus",
          code: "M",
          display: "Married",
        },
      ],
    },
  });
  let result = await evaluateExpressionUsingFhirpathJs(
    resourceJson,
    expression
  );
  console.log(result);
})();
