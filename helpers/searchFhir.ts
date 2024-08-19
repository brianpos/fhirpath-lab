import { Address, Bundle, BundleEntry, BundleLink, CodeableConcept, Coding, ContactPoint, OperationOutcomeIssue, UsageContext, ValueSet } from "fhir/r4b";
import EasyTableDefinition from '~/models/EasyTableDefinition'
import axios, { AxiosRequestHeaders, AxiosResponse } from "axios";
import { AxiosError } from "axios";
import { ConformanceResourceData, WithPublishingHistory } from "~/models/ConformanceResourceTableData";
import { ConformanceResourceInterface } from "~/models/ConformanceResourceInterface";
import { BaseResourceData } from "~/models/BaseResourceTableData";
import { settings } from "./user_settings";

export const requestFhirAcceptHeaders = "application/fhir+json; fhirVersion=4.0, application/fhir+json";
export const requestFhirMapAcceptHeaders = "text/fhir-mapping";
export const requestFhirContentTypeHeaders = "application/fhir+json";
export const fhirResourceTypes = [
  "Account",
  "ActivityDefinition",
  "AdministrableProductDefinition",
  "AdverseEvent",
  "AllergyIntolerance",
  "Appointment",
  "AppointmentResponse",
  "AuditEvent",
  "Basic",
  "Binary",
  "BiologicallyDerivedProduct",
  "BodyStructure",
  "Bundle",
  "CapabilityStatement",
  "CarePlan",
  "CareTeam",
  "CatalogEntry",
  "ChargeItem",
  "ChargeItemDefinition",
  "Citation",
  "Claim",
  "ClaimResponse",
  "ClinicalImpression",
  "ClinicalUseDefinition",
  "CodeSystem",
  "Communication",
  "CommunicationRequest",
  "CompartmentDefinition",
  "Composition",
  "ConceptMap",
  "Condition",
  "Consent",
  "Contract",
  "Coverage",
  "CoverageEligibilityRequest",
  "CoverageEligibilityResponse",
  "DetectedIssue",
  "Device",
  "DeviceDefinition",
  "DeviceMetric",
  "DeviceRequest",
  "DeviceUseStatement",
  "DiagnosticReport",
  "DocumentManifest",
  "DocumentReference",
  "Encounter",
  "Endpoint",
  "EnrollmentRequest",
  "EnrollmentResponse",
  "EpisodeOfCare",
  "EventDefinition",
  "Evidence",
  "EvidenceReport",
  "EvidenceVariable",
  "ExampleScenario",
  "ExplanationOfBenefit",
  "FamilyMemberHistory",
  "Flag",
  "Goal",
  "GraphDefinition",
  "Group",
  "GuidanceResponse",
  "HealthcareService",
  "ImagingStudy",
  "Immunization",
  "ImmunizationEvaluation",
  "ImmunizationRecommendation",
  "ImplementationGuide",
  "Ingredient",
  "InsurancePlan",
  "Invoice",
  "Library",
  "Linkage",
  "List",
  "Location",
  "ManufacturedItemDefinition",
  "Measure",
  "MeasureReport",
  "Media",
  "Medication",
  "MedicationAdministration",
  "MedicationDispense",
  "MedicationKnowledge",
  "MedicationRequest",
  "MedicationStatement",
  "MedicinalProductDefinition",
  "MessageDefinition",
  "MessageHeader",
  "MolecularSequence",
  "NamingSystem",
  "NutritionOrder",
  "NutritionProduct",
  "Observation",
  "ObservationDefinition",
  "OperationDefinition",
  "OperationOutcome",
  "Organization",
  "OrganizationAffiliation",
  "PackagedProductDefinition",
  "Parameters",
  "Patient",
  "PaymentNotice",
  "PaymentReconciliation",
  "Person",
  "PlanDefinition",
  "Practitioner",
  "PractitionerRole",
  "Procedure",
  "Provenance",
  "Questionnaire",
  "QuestionnaireResponse",
  "RegulatedAuthorization",
  "RelatedPerson",
  "RequestGroup",
  "ResearchDefinition",
  "ResearchElementDefinition",
  "ResearchStudy",
  "ResearchSubject",
  "RiskAssessment",
  "Schedule",
  "SearchParameter",
  "ServiceRequest",
  "Slot",
  "Specimen",
  "SpecimenDefinition",
  "StructureDefinition",
  "StructureMap",
  "Subscription",
  "SubscriptionStatus",
  "SubscriptionTopic",
  "Substance",
  "SubstanceDefinition",
  "SupplyDelivery",
  "SupplyRequest",
  "Task",
  "TerminologyCapabilities",
  "TestReport",
  "TestScript",
  "ValueSet",
  "VerificationResult",
  "VisionPrescription",
];

export function getLink(
  type: "first" | "previous" | "next" | "last",
  links: BundleLink[] | undefined
): string | undefined {
  if (!links) return undefined;
  for (let linkVal of links) {
    if (linkVal.relation === type) {
      return linkVal.url;
    }
  }
  return undefined;
}

const FhirpathLabCodeSystem = "http://fhirpath-lab.com/CodeSystem/error-codes";

const errorCodingExpandValueSet: Coding = {system: FhirpathLabCodeSystem, code: "exp-01", display: "Expansion error" };
const errorCodingLoadPubVersions: Coding = {system: FhirpathLabCodeSystem, code: "lpv-01", display: "Load published versions error" };
const errorCodingLoadResource: Coding = {system: FhirpathLabCodeSystem, code: "lr-01", display: "Load fhir resource error" };
const errorCodingSaveResource: Coding = {system: FhirpathLabCodeSystem, code: "sr-01", display: "Save fhir resource error" };
const errorCodingSearch: Coding = {system: FhirpathLabCodeSystem, code: "sr-01", display: "Search fhir resource error" };


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
): fhir4b.OperationOutcome {
  var result: fhir4b.OperationOutcome =
  {
    resourceType: 'OperationOutcome',
    issue: []
  };

  var issue: OperationOutcomeIssue =
  {
    severity: severity,
    code: code,
    details: { text: message }
  }
  if (coding && issue.details)
    issue.details.coding = [coding];
  if (diagnostics)
    issue.diagnostics = diagnostics;
  result.issue.push(issue);
  return result;
}

/** Perform a FHIR Search operation */
export async function searchPage<T>(host: EasyTableDefinition<T>, url: string, mapData: (entries: BundleEntry[]) => void) {
  try {
    if (host.cancelSource) host.cancelSource.cancel("new search started");
    host.cancelSource = axios.CancelToken.source();
    host.loadingData = true;
    let token = host.cancelSource.token;
    let headers = { "Accept": requestFhirAcceptHeaders };
    const response = await axios.get<Bundle>(url, {
      cancelToken: token,
      headers: headers
    });
    if (token.reason) {
      console.log(token.reason);
      return;
    }
    host.cancelSource = undefined;
    host.loadingData = false;

    const results = response.data.entry;
    if (results) {
      host.totalCount = response.data.total;
      if (response.data.link) {
        host.firstPageLink = getLink("first", response.data.link);
        host.previousPageLink = getLink("previous", response.data.link);
        host.nextPageLink = getLink("next", response.data.link);
        host.lastPageLink = getLink("last", response.data.link);
      }

      // Check for any outcomes included
      const outcomes = results.filter((item) => {
        if (item.search?.mode !== "outcome") {
          return false;
        }
        return true;
      });

      if (outcomes.length > 0 && outcomes[0].resource?.resourceType === "OperationOutcome") {
        host.outcome = outcomes[0].resource as fhir4b.OperationOutcome;
      }
      else {
        host.outcome = undefined;
      }

      const filteredResults = results.filter((item) => {
        if (item.search?.mode === "outcome") {
          return false;
        }
        return true;
      });
      mapData(filteredResults);
      host.showEmpty = false;

    } else {
      host.tableData = [];
      host.showEmpty = true;
    }
  } catch (err) {
    host.loadingData = false;
    host.showEmpty = true;
    host.tableData = [];
    if (axios.isAxiosError(err)) {
      const serverError = err as AxiosError<fhir4b.OperationOutcome>;
      if (serverError && serverError.response) {
        host.outcome = serverError.response.data;
        return serverError.response.data;
      }
      return CreateOperationOutcome("fatal", "exception", "Server: " + err.message, errorCodingSearch, url);
    }
    return CreateOperationOutcome("fatal", "exception", "Client: " + err as string, errorCodingSearch, url);
  }
}

export function calculateNextVersion(versions: (string | undefined)[]): string {
  // TODO: Perform a calculation of the next version number
  return "";
}

export async function loadPublishedVersions<TData extends ConformanceResourceInterface>(serverBaseUrl: string, resourceType: string, canonicalUrl: string, data: WithPublishingHistory<TData>) {
  const urlRequest = `${serverBaseUrl}/${resourceType}?url=${canonicalUrl}&_summary=true`;
  try {
    let headers = {
      'Cache-Control': 'no-cache',
      "Accept": requestFhirAcceptHeaders
    };
    const response = await axios.get<Bundle>(urlRequest,
      {
        // query URL without using browser cache
        headers: headers,
      });
    var result: TData[] = [];
    if (response?.data?.entry) {
      for (let entry of response.data.entry) {
        if (entry.resource?.resourceType === resourceType) {
          result.push(entry.resource as TData);
        }
      }
    }
    data.publishedVersions = result;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const serverError = err as AxiosError<fhir4b.OperationOutcome>;
      if (serverError && serverError.response) {
        return serverError.response.data;
      }
      return CreateOperationOutcome("fatal", "exception", "Server: " + err.message, errorCodingLoadPubVersions, urlRequest);
    }
    return CreateOperationOutcome("fatal", "exception", "Client: " + err, errorCodingLoadPubVersions, urlRequest);
    }
}

export async function loadFhirResource<TData extends fhir4b.FhirResource>(serverBaseUrl: string, data: BaseResourceData<TData>, resourceType: string, routeId: string, createNew: () => TData) {
  var urlRequest;
  try {
    // clear the save validation messaging properties
    data.showOutcome = false;
    data.saveOutcome = undefined;
    data.showAdvancedSettings = settings.showAdvancedSettings();

    if (routeId === ":new") {
      data.raw = createNew();
      data.enableSave = true;
      return;
    }

    var loadResourceId = routeId;
    if (loadResourceId.endsWith(":new")) {
      data.enableSave = true;
      loadResourceId = loadResourceId.substring(
        0,
        loadResourceId.lastIndexOf(":")
      );
    }

    urlRequest = `${serverBaseUrl}/${resourceType}/${loadResourceId}`;
    let headers = {
      'Cache-Control': 'no-cache',
      "Accept": requestFhirAcceptHeaders
    };
    const response = await axios.get<TData>(urlRequest, {
      // query URL without using browser cache
      headers: headers,
    });
    data.raw = response.data;

    if (routeId.endsWith(":new")) {
      console.log("new draft version");
      delete data.raw.id;
      if (data.raw.meta) {
        delete data.raw.meta.lastUpdated;
        delete data.raw.meta.versionId;
      }
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const serverError = err as AxiosError<fhir4b.OperationOutcome>;
      if (serverError && serverError.response) {
        return serverError.response.data;
      }
      return CreateOperationOutcome("fatal", "exception", "Server: " + err.message, errorCodingLoadResource, urlRequest);
    }
    return CreateOperationOutcome("fatal", "exception", "Client: " + err as string, errorCodingLoadResource, urlRequest);
  }
}

export async function loadCanonicalResource<TData extends fhir4b.FhirResource, CData extends ConformanceResourceInterface>(serverBaseUrl: string, data: BaseResourceData<TData>, cdata: ConformanceResourceData<CData>, resourceType: string, routeId: string, createNew: () => TData) {
  var result = await loadFhirResource(serverBaseUrl, data, resourceType, routeId, createNew);
  if (result?.resourceType === "OperationOutcome") return result;

  var loadedResource = data.raw as ConformanceResourceInterface;
  if (loadedResource) {
    data.loadedUrl = serverBaseUrl + '/' + loadedResource.resourceType + '/' + loadedResource.id;
    if (loadedResource.text?.status === "generated") delete loadedResource.text;

    if (routeId.endsWith(":new") && routeId !== ":new") {
      loadedResource.status = "draft";
      delete loadedResource.date;
    }

    // now that we have the URL for the instance - check for other published versions
    if (loadedResource.url) {
      const lastVersion = loadedResource.version;
      await loadPublishedVersions<CData>(
        serverBaseUrl,
        resourceType,
        loadedResource.url,
        cdata
      );

      if (routeId.endsWith(":new") && routeId !== ":new") {
        // inject this as the newest published version (even though it's not saved)
        if (cdata.raw)
          cdata.publishedVersions?.splice(0, 0, cdata.raw);

        // and update the canonical version
        loadedResource.version = calculateNextVersion(
          cdata.publishedVersions?.map<string | undefined>((pv) => {
            return pv.version;
          }) ?? []
        );
      }
    }
  }
}

export async function saveFhirResource<TData extends fhir4b.FhirResource>(serverBaseUrl: string, data: BaseResourceData<TData>): Promise<fhir4b.OperationOutcome | undefined> {
  data.saving = true;
  var urlRequest;
  try {
    const resource = data.raw as fhir4b.FhirResource;
    console.log("save " + data.raw?.id);
    data.showOutcome = undefined;
    data.saveOutcome = undefined;

    var response: AxiosResponse<TData, any>;
    let headers = {
      'Cache-Control': 'no-cache',
      "Accept": requestFhirAcceptHeaders,
      'Content-Type': requestFhirContentTypeHeaders
    };
    if (data.raw?.id) {
      urlRequest = `${serverBaseUrl}/${data.raw?.resourceType}/${data.raw.id}`;
      response = await axios.put<TData>(urlRequest, data.raw, { headers: headers });
    } else {
      // Create a new resource (via post)
      urlRequest = `${serverBaseUrl}/${data.raw?.resourceType}`;
      response = await axios.post<TData>(urlRequest, data.raw, { headers: headers });
    }
    data.raw = response.data;
    data.saving = false;
    data.enableSave = false;
  } catch (err) {
    data.saving = false;
    if (axios.isAxiosError(err)) {
      const serverError = err as AxiosError<fhir4b.OperationOutcome>;
      if (serverError && serverError.response) {
        data.saveOutcome = serverError.response.data;
        data.showOutcome = true;
        return serverError.response.data;
      }
      return CreateOperationOutcome("fatal", "exception", "Server: " + err.message, errorCodingSaveResource, urlRequest);
    }
    return CreateOperationOutcome("fatal", "exception", "Client: " + err, errorCodingSaveResource, urlRequest);
    }
}

export async function expandValueSet(serverBaseUrl: string, vsCanonical: string, filter?: string): Promise<fhir4b.ValueSetExpansion | fhir4b.OperationOutcome> {
  const can = splitCanonical(vsCanonical);
  let urlRequest = `${serverBaseUrl}/ValueSet/$expand?url=${can?.canonicalUrl}`;
  if (can?.version) {
    urlRequest += `&version=${encodeURIComponent(can.version)}`;
  }
  if (filter && filter.length > 0) {
    urlRequest += `&filter=${encodeURIComponent(filter)}`;
  }
  try {
    const response = await axios.get<fhir4b.ValueSet | fhir4b.OperationOutcome>(urlRequest, {
      // query URL without using browser cache
      headers: {
        "Cache-Control": "no-cache",
        "Accept": requestFhirAcceptHeaders
      },
    });
    if (response.data.resourceType === 'OperationOutcome')
      return response.data;
    let vsResult = response.data as fhir4b.ValueSet;
    if (vsResult.expansion)
      return vsResult.expansion;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const serverError = err as AxiosError<fhir4b.OperationOutcome>;
      if (serverError && serverError.response) {
        return serverError.response.data;
      }
      return CreateOperationOutcome("fatal", "exception", err.message, errorCodingExpandValueSet);
    }
    return CreateOperationOutcome("fatal", "exception", err as string, errorCodingExpandValueSet);
  }
  return CreateOperationOutcome("error", "informational", "(none)", undefined, "Terminology Server failed to return an expansion in the Valueset returned.");
}

export const searchPublishingStatuses = [
  "active,draft",
  "active",
  "draft",
  "retired",
];

export function toSearchDisplay_UseContext(data: UsageContext[] | undefined): string | undefined {
  var result = "";
  if (data) {
    for (let item of data) {
      if (item.valueCodeableConcept) {
        if (result) result += ', ';
        result += toSearchDisplay_CodeableConcept([item.valueCodeableConcept]);
      }
    }
  }
  return result;
}

export function toSearchDisplay_CodeableConcept(data: CodeableConcept[] | undefined): string | undefined {
  var result = "";
  if (data) {
    for (let item of data) {
      if (item.text) {
        if (result) result += ', ';
        result += item.text;
      } else {
        if (item.coding) {
          var t = toSearchDisplay_Coding(item.coding);
          if (t) {
            if (result) result += ', ';
            result += t;
          }
        }
      }
    }
  }
  return result;
}

export function toSearchDisplay_Coding(data: Coding[] | undefined): string | undefined {
  var result = "";
  if (data) {
    for (let coding of data) {
      if (coding.display || coding.code) {
        if (result) result += ', ';
        result += coding.display ?? coding.code;
      }
    }
  }
  return result;
}

export function toSearchDisplay_Address(data: Address[] | undefined): string | undefined {
  var result = "";
  if (data) {
    for (let addr of data) {
      if (addr.text) {
        if (result) result += ', ';
        result += addr.text;
      } else {
        // Need to grab the components of the address
        var parts: string[] = [];
        if (addr.line) parts.push(...addr.line);
        if (addr.city) parts.push(addr.city);
        if (addr.state) parts.push(addr.state);
        if (addr.postalCode) parts.push(addr.postalCode);
        if (addr.country) parts.push(addr.country);

        if (result) result += ';  ';
        result += parts.join(", ");
      }
    }
  }
  return result;
}

export function toSearchDisplay_Telecom(data: ContactPoint[] | undefined): string | undefined {
  var result = "";
  if (data) {
    for (let cp of data) {
      if (result) result += ', ';
      result += `${cp.system}: ${cp.value}`;
    }
  }
  return result;
}

interface VersionedCanonicalUrl {
  canonicalUrl: string;
  version?: string;
  code?: string;
}

export function splitCanonical(canonicalUrl?: string): VersionedCanonicalUrl | undefined {
  if (!canonicalUrl) return undefined;

  const codeIndex = canonicalUrl.indexOf('#');
  let code: string | undefined = undefined;
  if (codeIndex !== -1) {
    code = canonicalUrl.substring(codeIndex + 1)
    canonicalUrl = canonicalUrl.substring(0, codeIndex);
  }

  const index = canonicalUrl.indexOf('|');
  if (index === -1) return { canonicalUrl: canonicalUrl, code: code };

  return {
    canonicalUrl: canonicalUrl.substring(0, index),
    version: canonicalUrl.substring(index + 1),
    code: code
  };
}