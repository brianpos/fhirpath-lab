// THIS FILE IS GENERATED — DO NOT EDIT BY HAND.
// Run `npm run generate:models -- --version <stu3|r4|r4b|r5|r6>` to regenerate.
// See docs/custom-model-generator-plan.md.

import type { TypeModel } from "../../../custom_model";

// FHIR resources (with their backbone elements)

export const Account: TypeModel = {
    TypeName: "Account",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/HealthcareService"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "active", Type: [{ TypeName: "Period" }] },
        { ElementName: "balance", Type: [{ TypeName: "Money" }] },
        { ElementName: "coverage", Type: [{ TypeName: "account_coverage" }], IsArray: true },
        { ElementName: "owner", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "guarantor", Type: [{ TypeName: "account_guarantor" }], IsArray: true },
    ],
};

export const account_coverage: TypeModel = {
    TypeName: "account_coverage",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "coverage", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Coverage"] }], Required: true },
        { ElementName: "priority", Type: [{ TypeName: "positiveInt" }] },
    ],
};

export const account_guarantor: TypeModel = {
    TypeName: "account_guarantor",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "party", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }], Required: true },
        { ElementName: "onHold", Type: [{ TypeName: "boolean" }] },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
    ],
};

export const ActivityDefinition: TypeModel = {
    TypeName: "ActivityDefinition",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "experimental", Type: [{ TypeName: "boolean" }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "publisher", Type: [{ TypeName: "string" }] },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "purpose", Type: [{ TypeName: "markdown" }] },
        { ElementName: "usage", Type: [{ TypeName: "string" }] },
        { ElementName: "approvalDate", Type: [{ TypeName: "date" }] },
        { ElementName: "lastReviewDate", Type: [{ TypeName: "date" }] },
        { ElementName: "effectivePeriod", Type: [{ TypeName: "Period" }] },
        { ElementName: "useContext", Type: [{ TypeName: "UsageContext" }], IsArray: true },
        { ElementName: "jurisdiction", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "topic", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "contributor", Type: [{ TypeName: "Contributor" }], IsArray: true },
        { ElementName: "contact", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "copyright", Type: [{ TypeName: "markdown" }] },
        { ElementName: "relatedArtifact", Type: [{ TypeName: "RelatedArtifact" }], IsArray: true },
        { ElementName: "library", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Library"] }], IsArray: true },
        { ElementName: "kind", Type: [{ TypeName: "code" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "timing[x]", Type: [{ TypeName: "Period" }, { TypeName: "Range" }, { TypeName: "Timing" }, { TypeName: "dateTime" }] },
        { ElementName: "location", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "participant", Type: [{ TypeName: "activitydefinition_participant" }], IsArray: true },
        { ElementName: "product[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Medication"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Substance"] }] },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "dosage", Type: [{ TypeName: "Dosage" }], IsArray: true },
        { ElementName: "bodySite", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "transform", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/StructureMap"] }] },
        { ElementName: "dynamicValue", Type: [{ TypeName: "activitydefinition_dynamicValue" }], IsArray: true },
    ],
};

export const activitydefinition_participant: TypeModel = {
    TypeName: "activitydefinition_participant",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const activitydefinition_dynamicValue: TypeModel = {
    TypeName: "activitydefinition_dynamicValue",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "path", Type: [{ TypeName: "string" }] },
        { ElementName: "language", Type: [{ TypeName: "string" }] },
        { ElementName: "expression", Type: [{ TypeName: "string" }] },
    ],
};

export const AdverseEvent: TypeModel = {
    TypeName: "AdverseEvent",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "category", Type: [{ TypeName: "code" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ResearchSubject"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Medication"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "reaction", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Condition"] }], IsArray: true },
        { ElementName: "location", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "seriousness", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "outcome", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "recorder", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "eventParticipant", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }] },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "suspectEntity", Type: [{ TypeName: "adverseevent_suspectEntity" }], IsArray: true },
        { ElementName: "subjectMedicalHistory", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Condition"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Observation"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/AllergyIntolerance"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/FamilyMemberHistory"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Immunization"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Procedure"] }], IsArray: true },
        { ElementName: "referenceDocument", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DocumentReference"] }], IsArray: true },
        { ElementName: "study", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ResearchStudy"] }], IsArray: true },
    ],
};

export const adverseevent_suspectEntity: TypeModel = {
    TypeName: "adverseevent_suspectEntity",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "instance", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Substance"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Medication"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MedicationAdministration"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MedicationStatement"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }], Required: true },
        { ElementName: "causality", Type: [{ TypeName: "code" }] },
        { ElementName: "causalityAssessment", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "causalityProductRelatedness", Type: [{ TypeName: "string" }] },
        { ElementName: "causalityMethod", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "causalityAuthor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "causalityResult", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const AllergyIntolerance: TypeModel = {
    TypeName: "AllergyIntolerance",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "clinicalStatus", Type: [{ TypeName: "code" }] },
        { ElementName: "verificationStatus", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "code" }] },
        { ElementName: "category", Type: [{ TypeName: "code" }], IsArray: true },
        { ElementName: "criticality", Type: [{ TypeName: "code" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "patient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
        { ElementName: "onset[x]", Type: [{ TypeName: "Age" }, { TypeName: "Period" }, { TypeName: "Range" }, { TypeName: "dateTime" }, { TypeName: "string" }] },
        { ElementName: "assertedDate", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "recorder", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }] },
        { ElementName: "asserter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }] },
        { ElementName: "lastOccurrence", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "reaction", Type: [{ TypeName: "allergyintolerance_reaction" }], IsArray: true },
    ],
};

export const allergyintolerance_reaction: TypeModel = {
    TypeName: "allergyintolerance_reaction",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "substance", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "manifestation", Type: [{ TypeName: "CodeableConcept" }], IsArray: true, Required: true },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "onset", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "severity", Type: [{ TypeName: "code" }] },
        { ElementName: "exposureRoute", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
    ],
};

export const Appointment: TypeModel = {
    TypeName: "Appointment",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "serviceCategory", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "serviceType", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "specialty", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "appointmentType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "reason", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "indication", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Condition"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Procedure"] }], IsArray: true },
        { ElementName: "priority", Type: [{ TypeName: "unsignedInt" }] },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "supportingInformation", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "start", Type: [{ TypeName: "instant" }] },
        { ElementName: "end", Type: [{ TypeName: "instant" }] },
        { ElementName: "minutesDuration", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "slot", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Slot"] }], IsArray: true },
        { ElementName: "created", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "comment", Type: [{ TypeName: "string" }] },
        { ElementName: "incomingReferral", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ReferralRequest"] }], IsArray: true },
        { ElementName: "participant", Type: [{ TypeName: "appointment_participant" }], IsArray: true, Required: true },
        { ElementName: "requestedPeriod", Type: [{ TypeName: "Period" }], IsArray: true },
    ],
};

export const appointment_participant: TypeModel = {
    TypeName: "appointment_participant",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "actor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/HealthcareService"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "required", Type: [{ TypeName: "code" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
    ],
};

export const AppointmentResponse: TypeModel = {
    TypeName: "AppointmentResponse",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "appointment", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Appointment"] }], Required: true },
        { ElementName: "start", Type: [{ TypeName: "instant" }] },
        { ElementName: "end", Type: [{ TypeName: "instant" }] },
        { ElementName: "participantType", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "actor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/HealthcareService"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "participantStatus", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "comment", Type: [{ TypeName: "string" }] },
    ],
};

export const AuditEvent: TypeModel = {
    TypeName: "AuditEvent",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "Coding" }], Required: true },
        { ElementName: "subtype", Type: [{ TypeName: "Coding" }], IsArray: true },
        { ElementName: "action", Type: [{ TypeName: "code" }] },
        { ElementName: "recorded", Type: [{ TypeName: "instant" }], Required: true },
        { ElementName: "outcome", Type: [{ TypeName: "code" }] },
        { ElementName: "outcomeDesc", Type: [{ TypeName: "string" }] },
        { ElementName: "purposeOfEvent", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "agent", Type: [{ TypeName: "auditevent_agent" }], IsArray: true, Required: true },
        { ElementName: "source", Type: [{ TypeName: "auditevent_source" }], Required: true },
        { ElementName: "entity", Type: [{ TypeName: "auditevent_entity" }], IsArray: true },
    ],
};

export const auditevent_agent: TypeModel = {
    TypeName: "auditevent_agent",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "reference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "userId", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "altId", Type: [{ TypeName: "string" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "requestor", Type: [{ TypeName: "boolean" }], Required: true },
        { ElementName: "location", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "policy", Type: [{ TypeName: "uri" }], IsArray: true },
        { ElementName: "media", Type: [{ TypeName: "Coding" }] },
        { ElementName: "network", Type: [{ TypeName: "auditevent_agent_network" }] },
        { ElementName: "purposeOfUse", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
    ],
};

export const auditevent_agent_network: TypeModel = {
    TypeName: "auditevent_agent_network",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "address", Type: [{ TypeName: "string" }] },
        { ElementName: "type", Type: [{ TypeName: "code" }] },
    ],
};

export const auditevent_source: TypeModel = {
    TypeName: "auditevent_source",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "site", Type: [{ TypeName: "string" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "Coding" }], IsArray: true },
    ],
};

export const auditevent_entity: TypeModel = {
    TypeName: "auditevent_entity",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "reference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
        { ElementName: "type", Type: [{ TypeName: "Coding" }] },
        { ElementName: "role", Type: [{ TypeName: "Coding" }] },
        { ElementName: "lifecycle", Type: [{ TypeName: "Coding" }] },
        { ElementName: "securityLabel", Type: [{ TypeName: "Coding" }], IsArray: true },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "query", Type: [{ TypeName: "base64Binary" }] },
        { ElementName: "detail", Type: [{ TypeName: "auditevent_entity_detail" }], IsArray: true },
    ],
};

export const auditevent_entity_detail: TypeModel = {
    TypeName: "auditevent_entity_detail",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "value", Type: [{ TypeName: "base64Binary" }], Required: true },
    ],
};

export const Basic: TypeModel = {
    TypeName: "Basic",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
        { ElementName: "created", Type: [{ TypeName: "date" }] },
        { ElementName: "author", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
    ],
};

export const Binary: TypeModel = {
    TypeName: "Binary",
    BaseTypeName: "Resource",
    Elements: [
        { ElementName: "contentType", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "securityContext", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
        { ElementName: "content", Type: [{ TypeName: "base64Binary" }], Required: true },
    ],
};

export const BodySite: TypeModel = {
    TypeName: "BodySite",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "active", Type: [{ TypeName: "boolean" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "qualifier", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "image", Type: [{ TypeName: "Attachment" }], IsArray: true },
        { ElementName: "patient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
    ],
};

export const Bundle: TypeModel = {
    TypeName: "Bundle",
    BaseTypeName: "Resource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "total", Type: [{ TypeName: "unsignedInt" }] },
        { ElementName: "link", Type: [{ TypeName: "bundle_link" }], IsArray: true },
        { ElementName: "entry", Type: [{ TypeName: "bundle_entry" }], IsArray: true },
        { ElementName: "signature", Type: [{ TypeName: "Signature" }] },
    ],
};

export const bundle_link: TypeModel = {
    TypeName: "bundle_link",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "relation", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "url", Type: [{ TypeName: "uri" }], Required: true },
    ],
};

export const bundle_entry: TypeModel = {
    TypeName: "bundle_entry",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "link", Type: [{ TypeName: "bundle_link" }], IsArray: true },
        { ElementName: "fullUrl", Type: [{ TypeName: "uri" }] },
        { ElementName: "resource", Type: [{ TypeName: "Resource" }] },
        { ElementName: "search", Type: [{ TypeName: "bundle_entry_search" }] },
        { ElementName: "request", Type: [{ TypeName: "bundle_entry_request" }] },
        { ElementName: "response", Type: [{ TypeName: "bundle_entry_response" }] },
    ],
};

export const bundle_entry_search: TypeModel = {
    TypeName: "bundle_entry_search",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "mode", Type: [{ TypeName: "code" }] },
        { ElementName: "score", Type: [{ TypeName: "decimal" }] },
    ],
};

export const bundle_entry_request: TypeModel = {
    TypeName: "bundle_entry_request",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "method", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "url", Type: [{ TypeName: "uri" }], Required: true },
        { ElementName: "ifNoneMatch", Type: [{ TypeName: "string" }] },
        { ElementName: "ifModifiedSince", Type: [{ TypeName: "instant" }] },
        { ElementName: "ifMatch", Type: [{ TypeName: "string" }] },
        { ElementName: "ifNoneExist", Type: [{ TypeName: "string" }] },
    ],
};

export const bundle_entry_response: TypeModel = {
    TypeName: "bundle_entry_response",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "status", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "location", Type: [{ TypeName: "uri" }] },
        { ElementName: "etag", Type: [{ TypeName: "string" }] },
        { ElementName: "lastModified", Type: [{ TypeName: "instant" }] },
        { ElementName: "outcome", Type: [{ TypeName: "Resource" }] },
    ],
};

export const CapabilityStatement: TypeModel = {
    TypeName: "CapabilityStatement",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }] },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "experimental", Type: [{ TypeName: "boolean" }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }], Required: true },
        { ElementName: "publisher", Type: [{ TypeName: "string" }] },
        { ElementName: "contact", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "useContext", Type: [{ TypeName: "UsageContext" }], IsArray: true },
        { ElementName: "jurisdiction", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "purpose", Type: [{ TypeName: "markdown" }] },
        { ElementName: "copyright", Type: [{ TypeName: "markdown" }] },
        { ElementName: "kind", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "instantiates", Type: [{ TypeName: "uri" }], IsArray: true },
        { ElementName: "software", Type: [{ TypeName: "capabilitystatement_software" }] },
        { ElementName: "implementation", Type: [{ TypeName: "capabilitystatement_implementation" }] },
        { ElementName: "fhirVersion", Type: [{ TypeName: "id" }], Required: true },
        { ElementName: "acceptUnknown", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "format", Type: [{ TypeName: "code" }], IsArray: true, Required: true },
        { ElementName: "patchFormat", Type: [{ TypeName: "code" }], IsArray: true },
        { ElementName: "implementationGuide", Type: [{ TypeName: "uri" }], IsArray: true },
        { ElementName: "profile", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/StructureDefinition"] }], IsArray: true },
        { ElementName: "rest", Type: [{ TypeName: "capabilitystatement_rest" }], IsArray: true },
        { ElementName: "messaging", Type: [{ TypeName: "capabilitystatement_messaging" }], IsArray: true },
        { ElementName: "document", Type: [{ TypeName: "capabilitystatement_document" }], IsArray: true },
    ],
};

export const capabilitystatement_software: TypeModel = {
    TypeName: "capabilitystatement_software",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "name", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "releaseDate", Type: [{ TypeName: "dateTime" }] },
    ],
};

export const capabilitystatement_implementation: TypeModel = {
    TypeName: "capabilitystatement_implementation",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "description", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "url", Type: [{ TypeName: "uri" }] },
    ],
};

export const capabilitystatement_rest: TypeModel = {
    TypeName: "capabilitystatement_rest",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "mode", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "documentation", Type: [{ TypeName: "string" }] },
        { ElementName: "security", Type: [{ TypeName: "capabilitystatement_rest_security" }] },
        { ElementName: "resource", Type: [{ TypeName: "capabilitystatement_rest_resource" }], IsArray: true },
        { ElementName: "interaction", Type: [{ TypeName: "capabilitystatement_rest_interaction" }], IsArray: true },
        { ElementName: "searchParam", Type: [{ TypeName: "capabilitystatement_rest_resource_searchParam" }], IsArray: true },
        { ElementName: "operation", Type: [{ TypeName: "capabilitystatement_rest_operation" }], IsArray: true },
        { ElementName: "compartment", Type: [{ TypeName: "uri" }], IsArray: true },
    ],
};

export const capabilitystatement_rest_security: TypeModel = {
    TypeName: "capabilitystatement_rest_security",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "cors", Type: [{ TypeName: "boolean" }] },
        { ElementName: "service", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "certificate", Type: [{ TypeName: "capabilitystatement_rest_security_certificate" }], IsArray: true },
    ],
};

export const capabilitystatement_rest_security_certificate: TypeModel = {
    TypeName: "capabilitystatement_rest_security_certificate",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "code" }] },
        { ElementName: "blob", Type: [{ TypeName: "base64Binary" }] },
    ],
};

export const capabilitystatement_rest_resource: TypeModel = {
    TypeName: "capabilitystatement_rest_resource",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "profile", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/StructureDefinition"] }] },
        { ElementName: "documentation", Type: [{ TypeName: "markdown" }] },
        { ElementName: "interaction", Type: [{ TypeName: "capabilitystatement_rest_resource_interaction" }], IsArray: true, Required: true },
        { ElementName: "versioning", Type: [{ TypeName: "code" }] },
        { ElementName: "readHistory", Type: [{ TypeName: "boolean" }] },
        { ElementName: "updateCreate", Type: [{ TypeName: "boolean" }] },
        { ElementName: "conditionalCreate", Type: [{ TypeName: "boolean" }] },
        { ElementName: "conditionalRead", Type: [{ TypeName: "code" }] },
        { ElementName: "conditionalUpdate", Type: [{ TypeName: "boolean" }] },
        { ElementName: "conditionalDelete", Type: [{ TypeName: "code" }] },
        { ElementName: "referencePolicy", Type: [{ TypeName: "code" }], IsArray: true },
        { ElementName: "searchInclude", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "searchRevInclude", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "searchParam", Type: [{ TypeName: "capabilitystatement_rest_resource_searchParam" }], IsArray: true },
    ],
};

export const capabilitystatement_rest_resource_interaction: TypeModel = {
    TypeName: "capabilitystatement_rest_resource_interaction",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "documentation", Type: [{ TypeName: "string" }] },
    ],
};

export const capabilitystatement_rest_resource_searchParam: TypeModel = {
    TypeName: "capabilitystatement_rest_resource_searchParam",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "name", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "definition", Type: [{ TypeName: "uri" }] },
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "documentation", Type: [{ TypeName: "string" }] },
    ],
};

export const capabilitystatement_rest_interaction: TypeModel = {
    TypeName: "capabilitystatement_rest_interaction",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "documentation", Type: [{ TypeName: "string" }] },
    ],
};

export const capabilitystatement_rest_operation: TypeModel = {
    TypeName: "capabilitystatement_rest_operation",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "name", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "definition", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/OperationDefinition"] }], Required: true },
    ],
};

export const capabilitystatement_messaging: TypeModel = {
    TypeName: "capabilitystatement_messaging",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "endpoint", Type: [{ TypeName: "capabilitystatement_messaging_endpoint" }], IsArray: true },
        { ElementName: "reliableCache", Type: [{ TypeName: "unsignedInt" }] },
        { ElementName: "documentation", Type: [{ TypeName: "string" }] },
        { ElementName: "supportedMessage", Type: [{ TypeName: "capabilitystatement_messaging_supportedMessage" }], IsArray: true },
        { ElementName: "event", Type: [{ TypeName: "capabilitystatement_messaging_event" }], IsArray: true },
    ],
};

export const capabilitystatement_messaging_endpoint: TypeModel = {
    TypeName: "capabilitystatement_messaging_endpoint",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "protocol", Type: [{ TypeName: "Coding" }], Required: true },
        { ElementName: "address", Type: [{ TypeName: "uri" }], Required: true },
    ],
};

export const capabilitystatement_messaging_supportedMessage: TypeModel = {
    TypeName: "capabilitystatement_messaging_supportedMessage",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "mode", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "definition", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MessageDefinition"] }], Required: true },
    ],
};

export const capabilitystatement_messaging_event: TypeModel = {
    TypeName: "capabilitystatement_messaging_event",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "Coding" }], Required: true },
        { ElementName: "category", Type: [{ TypeName: "code" }] },
        { ElementName: "mode", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "focus", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "request", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/StructureDefinition"] }], Required: true },
        { ElementName: "response", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/StructureDefinition"] }], Required: true },
        { ElementName: "documentation", Type: [{ TypeName: "string" }] },
    ],
};

export const capabilitystatement_document: TypeModel = {
    TypeName: "capabilitystatement_document",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "mode", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "documentation", Type: [{ TypeName: "string" }] },
        { ElementName: "profile", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/StructureDefinition"] }], Required: true },
    ],
};

export const CarePlan: TypeModel = {
    TypeName: "CarePlan",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "definition", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/PlanDefinition"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Questionnaire"] }], IsArray: true },
        { ElementName: "basedOn", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CarePlan"] }], IsArray: true },
        { ElementName: "replaces", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CarePlan"] }], IsArray: true },
        { ElementName: "partOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CarePlan"] }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "intent", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }], Required: true },
        { ElementName: "context", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/EpisodeOfCare"] }] },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "author", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam"] }], IsArray: true },
        { ElementName: "careTeam", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam"] }], IsArray: true },
        { ElementName: "addresses", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Condition"] }], IsArray: true },
        { ElementName: "supportingInfo", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "goal", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Goal"] }], IsArray: true },
        { ElementName: "activity", Type: [{ TypeName: "careplan_activity" }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
    ],
};

export const careplan_activity: TypeModel = {
    TypeName: "careplan_activity",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "outcomeCodeableConcept", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "outcomeReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "progress", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "reference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Appointment"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CommunicationRequest"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DeviceRequest"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MedicationRequest"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/NutritionOrder"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Task"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ProcedureRequest"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ReferralRequest"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/VisionPrescription"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RequestGroup"] }] },
        { ElementName: "detail", Type: [{ TypeName: "careplan_activity_detail" }] },
    ],
};

export const careplan_activity_detail: TypeModel = {
    TypeName: "careplan_activity_detail",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "definition", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/PlanDefinition"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ActivityDefinition"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Questionnaire"] }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "reasonCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "reasonReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Condition"] }], IsArray: true },
        { ElementName: "goal", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Goal"] }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "statusReason", Type: [{ TypeName: "string" }] },
        { ElementName: "prohibited", Type: [{ TypeName: "boolean" }] },
        { ElementName: "scheduled[x]", Type: [{ TypeName: "Period" }, { TypeName: "Timing" }, { TypeName: "string" }] },
        { ElementName: "location", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "performer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam"] }], IsArray: true },
        { ElementName: "product[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Medication"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Substance"] }] },
        { ElementName: "dailyAmount", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
    ],
};

export const CareTeam: TypeModel = {
    TypeName: "CareTeam",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }] },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }] },
        { ElementName: "context", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/EpisodeOfCare"] }] },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "participant", Type: [{ TypeName: "careteam_participant" }], IsArray: true },
        { ElementName: "reasonCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "reasonReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Condition"] }], IsArray: true },
        { ElementName: "managingOrganization", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
    ],
};

export const careteam_participant: TypeModel = {
    TypeName: "careteam_participant",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "member", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam"] }] },
        { ElementName: "onBehalfOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
    ],
};

export const ChargeItem: TypeModel = {
    TypeName: "ChargeItem",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "definition", Type: [{ TypeName: "uri" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "partOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ChargeItem"] }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }], Required: true },
        { ElementName: "context", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/EpisodeOfCare"] }] },
        { ElementName: "occurrence[x]", Type: [{ TypeName: "Period" }, { TypeName: "Timing" }, { TypeName: "dateTime" }] },
        { ElementName: "participant", Type: [{ TypeName: "chargeitem_participant" }], IsArray: true },
        { ElementName: "performingOrganization", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "requestingOrganization", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "bodysite", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "factorOverride", Type: [{ TypeName: "decimal" }] },
        { ElementName: "priceOverride", Type: [{ TypeName: "Money" }] },
        { ElementName: "overrideReason", Type: [{ TypeName: "string" }] },
        { ElementName: "enterer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "enteredDate", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "reason", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "service", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DiagnosticReport"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ImagingStudy"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Immunization"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MedicationAdministration"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MedicationDispense"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Observation"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Procedure"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/SupplyDelivery"] }], IsArray: true },
        { ElementName: "account", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Account"] }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "supportingInformation", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
    ],
};

export const chargeitem_participant: TypeModel = {
    TypeName: "chargeitem_participant",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "actor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
    ],
};

export const Claim: TypeModel = {
    TypeName: "Claim",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "subType", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "use", Type: [{ TypeName: "code" }] },
        { ElementName: "patient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }] },
        { ElementName: "billablePeriod", Type: [{ TypeName: "Period" }] },
        { ElementName: "created", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "enterer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }] },
        { ElementName: "insurer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "provider", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }] },
        { ElementName: "organization", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "priority", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "fundsReserve", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "related", Type: [{ TypeName: "claim_related" }], IsArray: true },
        { ElementName: "prescription", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MedicationRequest"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/VisionPrescription"] }] },
        { ElementName: "originalPrescription", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MedicationRequest"] }] },
        { ElementName: "payee", Type: [{ TypeName: "claim_payee" }] },
        { ElementName: "referral", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ReferralRequest"] }] },
        { ElementName: "facility", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "careTeam", Type: [{ TypeName: "claim_careTeam" }], IsArray: true },
        { ElementName: "information", Type: [{ TypeName: "claim_information" }], IsArray: true },
        { ElementName: "diagnosis", Type: [{ TypeName: "claim_diagnosis" }], IsArray: true },
        { ElementName: "procedure", Type: [{ TypeName: "claim_procedure" }], IsArray: true },
        { ElementName: "insurance", Type: [{ TypeName: "claim_insurance" }], IsArray: true },
        { ElementName: "accident", Type: [{ TypeName: "claim_accident" }] },
        { ElementName: "employmentImpacted", Type: [{ TypeName: "Period" }] },
        { ElementName: "hospitalization", Type: [{ TypeName: "Period" }] },
        { ElementName: "item", Type: [{ TypeName: "claim_item" }], IsArray: true },
        { ElementName: "total", Type: [{ TypeName: "Money" }] },
    ],
};

export const claim_related: TypeModel = {
    TypeName: "claim_related",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "claim", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Claim"] }] },
        { ElementName: "relationship", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "reference", Type: [{ TypeName: "Identifier" }] },
    ],
};

export const claim_payee: TypeModel = {
    TypeName: "claim_payee",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "resourceType", Type: [{ TypeName: "Coding" }] },
        { ElementName: "party", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
    ],
};

export const claim_careTeam: TypeModel = {
    TypeName: "claim_careTeam",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "sequence", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "provider", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }], Required: true },
        { ElementName: "responsible", Type: [{ TypeName: "boolean" }] },
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "qualification", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const claim_information: TypeModel = {
    TypeName: "claim_information",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "sequence", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "timing[x]", Type: [{ TypeName: "Period" }, { TypeName: "date" }] },
        { ElementName: "value[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "Quantity" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }, { TypeName: "string" }] },
        { ElementName: "reason", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const claim_diagnosis: TypeModel = {
    TypeName: "claim_diagnosis",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "sequence", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "diagnosis[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Condition"] }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "packageCode", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const claim_procedure: TypeModel = {
    TypeName: "claim_procedure",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "sequence", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "procedure[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Procedure"] }], Required: true },
    ],
};

export const claim_insurance: TypeModel = {
    TypeName: "claim_insurance",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "sequence", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "focal", Type: [{ TypeName: "boolean" }], Required: true },
        { ElementName: "coverage", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Coverage"] }], Required: true },
        { ElementName: "businessArrangement", Type: [{ TypeName: "string" }] },
        { ElementName: "preAuthRef", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "claimResponse", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ClaimResponse"] }] },
    ],
};

export const claim_accident: TypeModel = {
    TypeName: "claim_accident",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "date", Type: [{ TypeName: "date" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "location[x]", Type: [{ TypeName: "Address" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
    ],
};

export const claim_item: TypeModel = {
    TypeName: "claim_item",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "sequence", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "careTeamLinkId", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "diagnosisLinkId", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "procedureLinkId", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "informationLinkId", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "revenue", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "service", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "modifier", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "programCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "serviced[x]", Type: [{ TypeName: "Period" }, { TypeName: "date" }] },
        { ElementName: "location[x]", Type: [{ TypeName: "Address" }, { TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "unitPrice", Type: [{ TypeName: "Money" }] },
        { ElementName: "factor", Type: [{ TypeName: "decimal" }] },
        { ElementName: "net", Type: [{ TypeName: "Money" }] },
        { ElementName: "udi", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }], IsArray: true },
        { ElementName: "bodySite", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "subSite", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }], IsArray: true },
        { ElementName: "detail", Type: [{ TypeName: "claim_item_detail" }], IsArray: true },
    ],
};

export const claim_item_detail: TypeModel = {
    TypeName: "claim_item_detail",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "sequence", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "revenue", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "service", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "modifier", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "programCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "unitPrice", Type: [{ TypeName: "Money" }] },
        { ElementName: "factor", Type: [{ TypeName: "decimal" }] },
        { ElementName: "net", Type: [{ TypeName: "Money" }] },
        { ElementName: "udi", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }], IsArray: true },
        { ElementName: "subDetail", Type: [{ TypeName: "claim_item_detail_subDetail" }], IsArray: true },
    ],
};

export const claim_item_detail_subDetail: TypeModel = {
    TypeName: "claim_item_detail_subDetail",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "sequence", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "revenue", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "service", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "modifier", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "programCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "unitPrice", Type: [{ TypeName: "Money" }] },
        { ElementName: "factor", Type: [{ TypeName: "decimal" }] },
        { ElementName: "net", Type: [{ TypeName: "Money" }] },
        { ElementName: "udi", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }], IsArray: true },
    ],
};

export const ClaimResponse: TypeModel = {
    TypeName: "ClaimResponse",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }] },
        { ElementName: "patient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }] },
        { ElementName: "created", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "insurer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "requestProvider", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }] },
        { ElementName: "requestOrganization", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "request", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Claim"] }] },
        { ElementName: "outcome", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "disposition", Type: [{ TypeName: "string" }] },
        { ElementName: "payeeType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "item", Type: [{ TypeName: "claimresponse_item" }], IsArray: true },
        { ElementName: "addItem", Type: [{ TypeName: "claimresponse_addItem" }], IsArray: true },
        { ElementName: "error", Type: [{ TypeName: "claimresponse_error" }], IsArray: true },
        { ElementName: "totalCost", Type: [{ TypeName: "Money" }] },
        { ElementName: "unallocDeductable", Type: [{ TypeName: "Money" }] },
        { ElementName: "totalBenefit", Type: [{ TypeName: "Money" }] },
        { ElementName: "payment", Type: [{ TypeName: "claimresponse_payment" }] },
        { ElementName: "reserved", Type: [{ TypeName: "Coding" }] },
        { ElementName: "form", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "processNote", Type: [{ TypeName: "claimresponse_processNote" }], IsArray: true },
        { ElementName: "communicationRequest", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CommunicationRequest"] }], IsArray: true },
        { ElementName: "insurance", Type: [{ TypeName: "claimresponse_insurance" }], IsArray: true },
    ],
};

export const claimresponse_item: TypeModel = {
    TypeName: "claimresponse_item",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "sequenceLinkId", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "noteNumber", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "adjudication", Type: [{ TypeName: "claimresponse_item_adjudication" }], IsArray: true },
        { ElementName: "detail", Type: [{ TypeName: "claimresponse_item_detail" }], IsArray: true },
    ],
};

export const claimresponse_item_adjudication: TypeModel = {
    TypeName: "claimresponse_item_adjudication",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "reason", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "amount", Type: [{ TypeName: "Money" }] },
        { ElementName: "value", Type: [{ TypeName: "decimal" }] },
    ],
};

export const claimresponse_item_detail: TypeModel = {
    TypeName: "claimresponse_item_detail",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "sequenceLinkId", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "noteNumber", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "adjudication", Type: [{ TypeName: "claimresponse_item_adjudication" }], IsArray: true },
        { ElementName: "subDetail", Type: [{ TypeName: "claimresponse_item_detail_subDetail" }], IsArray: true },
    ],
};

export const claimresponse_item_detail_subDetail: TypeModel = {
    TypeName: "claimresponse_item_detail_subDetail",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "sequenceLinkId", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "noteNumber", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "adjudication", Type: [{ TypeName: "claimresponse_item_adjudication" }], IsArray: true },
    ],
};

export const claimresponse_addItem: TypeModel = {
    TypeName: "claimresponse_addItem",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "sequenceLinkId", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "revenue", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "service", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "modifier", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "fee", Type: [{ TypeName: "Money" }] },
        { ElementName: "noteNumber", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "adjudication", Type: [{ TypeName: "claimresponse_item_adjudication" }], IsArray: true },
        { ElementName: "detail", Type: [{ TypeName: "claimresponse_addItem_detail" }], IsArray: true },
    ],
};

export const claimresponse_addItem_detail: TypeModel = {
    TypeName: "claimresponse_addItem_detail",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "revenue", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "service", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "modifier", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "fee", Type: [{ TypeName: "Money" }] },
        { ElementName: "noteNumber", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "adjudication", Type: [{ TypeName: "claimresponse_item_adjudication" }], IsArray: true },
    ],
};

export const claimresponse_error: TypeModel = {
    TypeName: "claimresponse_error",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "sequenceLinkId", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "detailSequenceLinkId", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "subdetailSequenceLinkId", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
    ],
};

export const claimresponse_payment: TypeModel = {
    TypeName: "claimresponse_payment",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "adjustment", Type: [{ TypeName: "Money" }] },
        { ElementName: "adjustmentReason", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "date", Type: [{ TypeName: "date" }] },
        { ElementName: "amount", Type: [{ TypeName: "Money" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
    ],
};

export const claimresponse_processNote: TypeModel = {
    TypeName: "claimresponse_processNote",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "number", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "text", Type: [{ TypeName: "string" }] },
        { ElementName: "language", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const claimresponse_insurance: TypeModel = {
    TypeName: "claimresponse_insurance",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "sequence", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "focal", Type: [{ TypeName: "boolean" }], Required: true },
        { ElementName: "coverage", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Coverage"] }], Required: true },
        { ElementName: "businessArrangement", Type: [{ TypeName: "string" }] },
        { ElementName: "preAuthRef", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "claimResponse", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ClaimResponse"] }] },
    ],
};

export const ClinicalImpression: TypeModel = {
    TypeName: "ClinicalImpression",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }], Required: true },
        { ElementName: "context", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/EpisodeOfCare"] }] },
        { ElementName: "effective[x]", Type: [{ TypeName: "Period" }, { TypeName: "dateTime" }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "assessor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }] },
        { ElementName: "previous", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ClinicalImpression"] }] },
        { ElementName: "problem", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Condition"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/AllergyIntolerance"] }], IsArray: true },
        { ElementName: "investigation", Type: [{ TypeName: "clinicalimpression_investigation" }], IsArray: true },
        { ElementName: "protocol", Type: [{ TypeName: "uri" }], IsArray: true },
        { ElementName: "summary", Type: [{ TypeName: "string" }] },
        { ElementName: "finding", Type: [{ TypeName: "clinicalimpression_finding" }], IsArray: true },
        { ElementName: "prognosisCodeableConcept", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "prognosisReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RiskAssessment"] }], IsArray: true },
        { ElementName: "action", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ReferralRequest"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ProcedureRequest"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Procedure"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MedicationRequest"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Appointment"] }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
    ],
};

export const clinicalimpression_investigation: TypeModel = {
    TypeName: "clinicalimpression_investigation",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "item", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Observation"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/QuestionnaireResponse"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/FamilyMemberHistory"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DiagnosticReport"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RiskAssessment"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ImagingStudy"] }], IsArray: true },
    ],
};

export const clinicalimpression_finding: TypeModel = {
    TypeName: "clinicalimpression_finding",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "item[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Condition"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Observation"] }], Required: true },
        { ElementName: "basis", Type: [{ TypeName: "string" }] },
    ],
};

export const CodeSystem: TypeModel = {
    TypeName: "CodeSystem",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "experimental", Type: [{ TypeName: "boolean" }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "publisher", Type: [{ TypeName: "string" }] },
        { ElementName: "contact", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "useContext", Type: [{ TypeName: "UsageContext" }], IsArray: true },
        { ElementName: "jurisdiction", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "purpose", Type: [{ TypeName: "markdown" }] },
        { ElementName: "copyright", Type: [{ TypeName: "markdown" }] },
        { ElementName: "caseSensitive", Type: [{ TypeName: "boolean" }] },
        { ElementName: "valueSet", Type: [{ TypeName: "uri" }] },
        { ElementName: "hierarchyMeaning", Type: [{ TypeName: "code" }] },
        { ElementName: "compositional", Type: [{ TypeName: "boolean" }] },
        { ElementName: "versionNeeded", Type: [{ TypeName: "boolean" }] },
        { ElementName: "content", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "count", Type: [{ TypeName: "unsignedInt" }] },
        { ElementName: "filter", Type: [{ TypeName: "codesystem_filter" }], IsArray: true },
        { ElementName: "property", Type: [{ TypeName: "codesystem_property" }], IsArray: true },
        { ElementName: "concept", Type: [{ TypeName: "codesystem_concept" }], IsArray: true },
    ],
};

export const codesystem_filter: TypeModel = {
    TypeName: "codesystem_filter",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "operator", Type: [{ TypeName: "code" }], IsArray: true, Required: true },
        { ElementName: "value", Type: [{ TypeName: "string" }], Required: true },
    ],
};

export const codesystem_property: TypeModel = {
    TypeName: "codesystem_property",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "uri", Type: [{ TypeName: "uri" }] },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
    ],
};

export const codesystem_concept: TypeModel = {
    TypeName: "codesystem_concept",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "display", Type: [{ TypeName: "string" }] },
        { ElementName: "definition", Type: [{ TypeName: "string" }] },
        { ElementName: "designation", Type: [{ TypeName: "codesystem_concept_designation" }], IsArray: true },
        { ElementName: "property", Type: [{ TypeName: "codesystem_concept_property" }], IsArray: true },
        { ElementName: "concept", Type: [{ TypeName: "codesystem_concept" }], IsArray: true },
    ],
};

export const codesystem_concept_designation: TypeModel = {
    TypeName: "codesystem_concept_designation",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "language", Type: [{ TypeName: "code" }] },
        { ElementName: "use", Type: [{ TypeName: "Coding" }] },
        { ElementName: "value", Type: [{ TypeName: "string" }], Required: true },
    ],
};

export const codesystem_concept_property: TypeModel = {
    TypeName: "codesystem_concept_property",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "Coding" }, { TypeName: "boolean" }, { TypeName: "code" }, { TypeName: "dateTime" }, { TypeName: "integer" }, { TypeName: "string" }], Required: true },
    ],
};

export const Communication: TypeModel = {
    TypeName: "Communication",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "definition", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/PlanDefinition"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ActivityDefinition"] }], IsArray: true },
        { ElementName: "basedOn", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "partOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "notDone", Type: [{ TypeName: "boolean" }] },
        { ElementName: "notDoneReason", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "medium", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }] },
        { ElementName: "recipient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }], IsArray: true },
        { ElementName: "topic", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "context", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/EpisodeOfCare"] }] },
        { ElementName: "sent", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "received", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "sender", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "reasonCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "reasonReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Condition"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Observation"] }], IsArray: true },
        { ElementName: "payload", Type: [{ TypeName: "communication_payload" }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
    ],
};

export const communication_payload: TypeModel = {
    TypeName: "communication_payload",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "content[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }, { TypeName: "string" }], Required: true },
    ],
};

export const CommunicationRequest: TypeModel = {
    TypeName: "CommunicationRequest",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "basedOn", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "replaces", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CommunicationRequest"] }], IsArray: true },
        { ElementName: "groupIdentifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "priority", Type: [{ TypeName: "code" }] },
        { ElementName: "medium", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }] },
        { ElementName: "recipient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam"] }], IsArray: true },
        { ElementName: "topic", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "context", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/EpisodeOfCare"] }] },
        { ElementName: "payload", Type: [{ TypeName: "communicationrequest_payload" }], IsArray: true },
        { ElementName: "occurrence[x]", Type: [{ TypeName: "Period" }, { TypeName: "dateTime" }] },
        { ElementName: "authoredOn", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "sender", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "requester", Type: [{ TypeName: "communicationrequest_requester" }] },
        { ElementName: "reasonCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "reasonReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Condition"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Observation"] }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
    ],
};

export const communicationrequest_payload: TypeModel = {
    TypeName: "communicationrequest_payload",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "content[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }, { TypeName: "string" }], Required: true },
    ],
};

export const communicationrequest_requester: TypeModel = {
    TypeName: "communicationrequest_requester",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "agent", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }], Required: true },
        { ElementName: "onBehalfOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
    ],
};

export const CompartmentDefinition: TypeModel = {
    TypeName: "CompartmentDefinition",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }], Required: true },
        { ElementName: "name", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "experimental", Type: [{ TypeName: "boolean" }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "publisher", Type: [{ TypeName: "string" }] },
        { ElementName: "contact", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "purpose", Type: [{ TypeName: "markdown" }] },
        { ElementName: "useContext", Type: [{ TypeName: "UsageContext" }], IsArray: true },
        { ElementName: "jurisdiction", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "search", Type: [{ TypeName: "boolean" }], Required: true },
        { ElementName: "resource", Type: [{ TypeName: "compartmentdefinition_resource" }], IsArray: true },
    ],
};

export const compartmentdefinition_resource: TypeModel = {
    TypeName: "compartmentdefinition_resource",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "param", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "documentation", Type: [{ TypeName: "string" }] },
    ],
};

export const Composition: TypeModel = {
    TypeName: "Composition",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "class", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], Required: true },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }], Required: true },
        { ElementName: "author", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], IsArray: true, Required: true },
        { ElementName: "title", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "confidentiality", Type: [{ TypeName: "code" }] },
        { ElementName: "attester", Type: [{ TypeName: "composition_attester" }], IsArray: true },
        { ElementName: "custodian", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "relatesTo", Type: [{ TypeName: "composition_relatesTo" }], IsArray: true },
        { ElementName: "event", Type: [{ TypeName: "composition_event" }], IsArray: true },
        { ElementName: "section", Type: [{ TypeName: "composition_section" }], IsArray: true },
    ],
};

export const composition_attester: TypeModel = {
    TypeName: "composition_attester",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "mode", Type: [{ TypeName: "code" }], IsArray: true, Required: true },
        { ElementName: "time", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "party", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
    ],
};

export const composition_relatesTo: TypeModel = {
    TypeName: "composition_relatesTo",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "target[x]", Type: [{ TypeName: "Identifier" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Composition"] }], Required: true },
    ],
};

export const composition_event: TypeModel = {
    TypeName: "composition_event",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "detail", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
    ],
};

export const composition_section: TypeModel = {
    TypeName: "composition_section",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "text", Type: [{ TypeName: "Narrative" }] },
        { ElementName: "mode", Type: [{ TypeName: "code" }] },
        { ElementName: "orderedBy", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "entry", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "emptyReason", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "section", Type: [{ TypeName: "composition_section" }], IsArray: true },
    ],
};

export const ConceptMap: TypeModel = {
    TypeName: "ConceptMap",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "experimental", Type: [{ TypeName: "boolean" }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "publisher", Type: [{ TypeName: "string" }] },
        { ElementName: "contact", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "useContext", Type: [{ TypeName: "UsageContext" }], IsArray: true },
        { ElementName: "jurisdiction", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "purpose", Type: [{ TypeName: "markdown" }] },
        { ElementName: "copyright", Type: [{ TypeName: "markdown" }] },
        { ElementName: "source[x]", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ValueSet"] }, { TypeName: "uri" }] },
        { ElementName: "target[x]", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ValueSet"] }, { TypeName: "uri" }] },
        { ElementName: "group", Type: [{ TypeName: "conceptmap_group" }], IsArray: true },
    ],
};

export const conceptmap_group: TypeModel = {
    TypeName: "conceptmap_group",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "source", Type: [{ TypeName: "uri" }] },
        { ElementName: "sourceVersion", Type: [{ TypeName: "string" }] },
        { ElementName: "target", Type: [{ TypeName: "uri" }] },
        { ElementName: "targetVersion", Type: [{ TypeName: "string" }] },
        { ElementName: "element", Type: [{ TypeName: "conceptmap_group_element" }], IsArray: true, Required: true },
        { ElementName: "unmapped", Type: [{ TypeName: "conceptmap_group_unmapped" }] },
    ],
};

export const conceptmap_group_element: TypeModel = {
    TypeName: "conceptmap_group_element",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "code" }] },
        { ElementName: "display", Type: [{ TypeName: "string" }] },
        { ElementName: "target", Type: [{ TypeName: "conceptmap_group_element_target" }], IsArray: true },
    ],
};

export const conceptmap_group_element_target: TypeModel = {
    TypeName: "conceptmap_group_element_target",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "code" }] },
        { ElementName: "display", Type: [{ TypeName: "string" }] },
        { ElementName: "equivalence", Type: [{ TypeName: "code" }] },
        { ElementName: "comment", Type: [{ TypeName: "string" }] },
        { ElementName: "dependsOn", Type: [{ TypeName: "conceptmap_group_element_target_dependsOn" }], IsArray: true },
        { ElementName: "product", Type: [{ TypeName: "conceptmap_group_element_target_dependsOn" }], IsArray: true },
    ],
};

export const conceptmap_group_element_target_dependsOn: TypeModel = {
    TypeName: "conceptmap_group_element_target_dependsOn",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "property", Type: [{ TypeName: "uri" }], Required: true },
        { ElementName: "system", Type: [{ TypeName: "uri" }] },
        { ElementName: "code", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "display", Type: [{ TypeName: "string" }] },
    ],
};

export const conceptmap_group_unmapped: TypeModel = {
    TypeName: "conceptmap_group_unmapped",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "mode", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "code", Type: [{ TypeName: "code" }] },
        { ElementName: "display", Type: [{ TypeName: "string" }] },
        { ElementName: "url", Type: [{ TypeName: "uri" }] },
    ],
};

export const Condition: TypeModel = {
    TypeName: "Condition",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "clinicalStatus", Type: [{ TypeName: "code" }] },
        { ElementName: "verificationStatus", Type: [{ TypeName: "code" }] },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "severity", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "bodySite", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }], Required: true },
        { ElementName: "context", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/EpisodeOfCare"] }] },
        { ElementName: "onset[x]", Type: [{ TypeName: "Age" }, { TypeName: "Period" }, { TypeName: "Range" }, { TypeName: "dateTime" }, { TypeName: "string" }] },
        { ElementName: "abatement[x]", Type: [{ TypeName: "Age" }, { TypeName: "Period" }, { TypeName: "Range" }, { TypeName: "boolean" }, { TypeName: "dateTime" }, { TypeName: "string" }] },
        { ElementName: "assertedDate", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "asserter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "stage", Type: [{ TypeName: "condition_stage" }] },
        { ElementName: "evidence", Type: [{ TypeName: "condition_evidence" }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
    ],
};

export const condition_stage: TypeModel = {
    TypeName: "condition_stage",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "summary", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "assessment", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ClinicalImpression"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DiagnosticReport"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Observation"] }], IsArray: true },
    ],
};

export const condition_evidence: TypeModel = {
    TypeName: "condition_evidence",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "detail", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
    ],
};

export const Consent: TypeModel = {
    TypeName: "Consent",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "patient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "dateTime", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "consentingParty", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], IsArray: true },
        { ElementName: "actor", Type: [{ TypeName: "consent_actor" }], IsArray: true },
        { ElementName: "action", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "organization", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }], IsArray: true },
        { ElementName: "source[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "Identifier" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Consent"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DocumentReference"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Contract"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/QuestionnaireResponse"] }] },
        { ElementName: "policy", Type: [{ TypeName: "consent_policy" }], IsArray: true },
        { ElementName: "policyRule", Type: [{ TypeName: "uri" }] },
        { ElementName: "securityLabel", Type: [{ TypeName: "Coding" }], IsArray: true },
        { ElementName: "purpose", Type: [{ TypeName: "Coding" }], IsArray: true },
        { ElementName: "dataPeriod", Type: [{ TypeName: "Period" }] },
        { ElementName: "data", Type: [{ TypeName: "consent_data" }], IsArray: true },
        { ElementName: "except", Type: [{ TypeName: "consent_except" }], IsArray: true },
    ],
};

export const consent_actor: TypeModel = {
    TypeName: "consent_actor",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "reference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
    ],
};

export const consent_policy: TypeModel = {
    TypeName: "consent_policy",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "authority", Type: [{ TypeName: "uri" }] },
        { ElementName: "uri", Type: [{ TypeName: "uri" }] },
    ],
};

export const consent_data: TypeModel = {
    TypeName: "consent_data",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "meaning", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "reference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], Required: true },
    ],
};

export const consent_except: TypeModel = {
    TypeName: "consent_except",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "actor", Type: [{ TypeName: "consent_except_actor" }], IsArray: true },
        { ElementName: "action", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "securityLabel", Type: [{ TypeName: "Coding" }], IsArray: true },
        { ElementName: "purpose", Type: [{ TypeName: "Coding" }], IsArray: true },
        { ElementName: "class", Type: [{ TypeName: "Coding" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "Coding" }], IsArray: true },
        { ElementName: "dataPeriod", Type: [{ TypeName: "Period" }] },
        { ElementName: "data", Type: [{ TypeName: "consent_except_data" }], IsArray: true },
    ],
};

export const consent_except_actor: TypeModel = {
    TypeName: "consent_except_actor",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "reference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
    ],
};

export const consent_except_data: TypeModel = {
    TypeName: "consent_except_data",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "meaning", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "reference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], Required: true },
    ],
};

export const Contract: TypeModel = {
    TypeName: "Contract",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }] },
        { ElementName: "issued", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "applies", Type: [{ TypeName: "Period" }] },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "topic", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "authority", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }], IsArray: true },
        { ElementName: "domain", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "subType", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "action", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "actionReason", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "decisionType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "contentDerivative", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "securityLabel", Type: [{ TypeName: "Coding" }], IsArray: true },
        { ElementName: "agent", Type: [{ TypeName: "contract_agent" }], IsArray: true },
        { ElementName: "signer", Type: [{ TypeName: "contract_signer" }], IsArray: true },
        { ElementName: "valuedItem", Type: [{ TypeName: "contract_valuedItem" }], IsArray: true },
        { ElementName: "term", Type: [{ TypeName: "contract_term" }], IsArray: true },
        { ElementName: "binding[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Composition"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DocumentReference"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/QuestionnaireResponse"] }] },
        { ElementName: "friendly", Type: [{ TypeName: "contract_friendly" }], IsArray: true },
        { ElementName: "legal", Type: [{ TypeName: "contract_legal" }], IsArray: true },
        { ElementName: "rule", Type: [{ TypeName: "contract_rule" }], IsArray: true },
    ],
};

export const contract_agent: TypeModel = {
    TypeName: "contract_agent",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "actor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Contract"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Substance"] }], Required: true },
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
    ],
};

export const contract_signer: TypeModel = {
    TypeName: "contract_signer",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "Coding" }], Required: true },
        { ElementName: "party", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
        { ElementName: "signature", Type: [{ TypeName: "Signature" }], IsArray: true, Required: true },
    ],
};

export const contract_valuedItem: TypeModel = {
    TypeName: "contract_valuedItem",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "entity[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "effectiveTime", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "unitPrice", Type: [{ TypeName: "Money" }] },
        { ElementName: "factor", Type: [{ TypeName: "decimal" }] },
        { ElementName: "points", Type: [{ TypeName: "decimal" }] },
        { ElementName: "net", Type: [{ TypeName: "Money" }] },
    ],
};

export const contract_term: TypeModel = {
    TypeName: "contract_term",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "issued", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "applies", Type: [{ TypeName: "Period" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "subType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "topic", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "action", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "actionReason", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "securityLabel", Type: [{ TypeName: "Coding" }], IsArray: true },
        { ElementName: "agent", Type: [{ TypeName: "contract_term_agent" }], IsArray: true },
        { ElementName: "text", Type: [{ TypeName: "string" }] },
        { ElementName: "valuedItem", Type: [{ TypeName: "contract_term_valuedItem" }], IsArray: true },
        { ElementName: "group", Type: [{ TypeName: "contract_term" }], IsArray: true },
    ],
};

export const contract_term_agent: TypeModel = {
    TypeName: "contract_term_agent",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "actor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Contract"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Substance"] }], Required: true },
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
    ],
};

export const contract_term_valuedItem: TypeModel = {
    TypeName: "contract_term_valuedItem",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "entity[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "effectiveTime", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "unitPrice", Type: [{ TypeName: "Money" }] },
        { ElementName: "factor", Type: [{ TypeName: "decimal" }] },
        { ElementName: "points", Type: [{ TypeName: "decimal" }] },
        { ElementName: "net", Type: [{ TypeName: "Money" }] },
    ],
};

export const contract_friendly: TypeModel = {
    TypeName: "contract_friendly",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "content[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Composition"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DocumentReference"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/QuestionnaireResponse"] }], Required: true },
    ],
};

export const contract_legal: TypeModel = {
    TypeName: "contract_legal",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "content[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Composition"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DocumentReference"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/QuestionnaireResponse"] }], Required: true },
    ],
};

export const contract_rule: TypeModel = {
    TypeName: "contract_rule",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "content[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DocumentReference"] }], Required: true },
    ],
};

export const Coverage: TypeModel = {
    TypeName: "Coverage",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "policyHolder", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "subscriber", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "subscriberId", Type: [{ TypeName: "string" }] },
        { ElementName: "beneficiary", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }] },
        { ElementName: "relationship", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "payor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], IsArray: true },
        { ElementName: "grouping", Type: [{ TypeName: "coverage_grouping" }] },
        { ElementName: "dependent", Type: [{ TypeName: "string" }] },
        { ElementName: "sequence", Type: [{ TypeName: "string" }] },
        { ElementName: "order", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "network", Type: [{ TypeName: "string" }] },
        { ElementName: "contract", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Contract"] }], IsArray: true },
    ],
};

export const coverage_grouping: TypeModel = {
    TypeName: "coverage_grouping",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "group", Type: [{ TypeName: "string" }] },
        { ElementName: "groupDisplay", Type: [{ TypeName: "string" }] },
        { ElementName: "subGroup", Type: [{ TypeName: "string" }] },
        { ElementName: "subGroupDisplay", Type: [{ TypeName: "string" }] },
        { ElementName: "plan", Type: [{ TypeName: "string" }] },
        { ElementName: "planDisplay", Type: [{ TypeName: "string" }] },
        { ElementName: "subPlan", Type: [{ TypeName: "string" }] },
        { ElementName: "subPlanDisplay", Type: [{ TypeName: "string" }] },
        { ElementName: "class", Type: [{ TypeName: "string" }] },
        { ElementName: "classDisplay", Type: [{ TypeName: "string" }] },
        { ElementName: "subClass", Type: [{ TypeName: "string" }] },
        { ElementName: "subClassDisplay", Type: [{ TypeName: "string" }] },
    ],
};

export const DataElement: TypeModel = {
    TypeName: "DataElement",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "experimental", Type: [{ TypeName: "boolean" }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "publisher", Type: [{ TypeName: "string" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "contact", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "useContext", Type: [{ TypeName: "UsageContext" }], IsArray: true },
        { ElementName: "jurisdiction", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "copyright", Type: [{ TypeName: "markdown" }] },
        { ElementName: "stringency", Type: [{ TypeName: "code" }] },
        { ElementName: "mapping", Type: [{ TypeName: "dataelement_mapping" }], IsArray: true },
        { ElementName: "element", Type: [{ TypeName: "ElementDefinition" }], IsArray: true, Required: true },
    ],
};

export const dataelement_mapping: TypeModel = {
    TypeName: "dataelement_mapping",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "identity", Type: [{ TypeName: "id" }], Required: true },
        { ElementName: "uri", Type: [{ TypeName: "uri" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "comment", Type: [{ TypeName: "string" }] },
    ],
};

export const DetectedIssue: TypeModel = {
    TypeName: "DetectedIssue",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "severity", Type: [{ TypeName: "code" }] },
        { ElementName: "patient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "author", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }] },
        { ElementName: "implicated", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "detail", Type: [{ TypeName: "string" }] },
        { ElementName: "reference", Type: [{ TypeName: "uri" }] },
        { ElementName: "mitigation", Type: [{ TypeName: "detectedissue_mitigation" }], IsArray: true },
    ],
};

export const detectedissue_mitigation: TypeModel = {
    TypeName: "detectedissue_mitigation",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "action", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "author", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }] },
    ],
};

export const Device: TypeModel = {
    TypeName: "Device",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "udi", Type: [{ TypeName: "device_udi" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "lotNumber", Type: [{ TypeName: "string" }] },
        { ElementName: "manufacturer", Type: [{ TypeName: "string" }] },
        { ElementName: "manufactureDate", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "expirationDate", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "model", Type: [{ TypeName: "string" }] },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "patient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }] },
        { ElementName: "owner", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "contact", Type: [{ TypeName: "ContactPoint" }], IsArray: true },
        { ElementName: "location", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "url", Type: [{ TypeName: "uri" }] },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "safety", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
    ],
};

export const device_udi: TypeModel = {
    TypeName: "device_udi",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "deviceIdentifier", Type: [{ TypeName: "string" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "jurisdiction", Type: [{ TypeName: "uri" }] },
        { ElementName: "carrierHRF", Type: [{ TypeName: "string" }] },
        { ElementName: "carrierAIDC", Type: [{ TypeName: "base64Binary" }] },
        { ElementName: "issuer", Type: [{ TypeName: "uri" }] },
        { ElementName: "entryType", Type: [{ TypeName: "code" }] },
    ],
};

export const DeviceComponent: TypeModel = {
    TypeName: "DeviceComponent",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "lastSystemChange", Type: [{ TypeName: "instant" }] },
        { ElementName: "source", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }] },
        { ElementName: "parent", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DeviceComponent"] }] },
        { ElementName: "operationalStatus", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "parameterGroup", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "measurementPrinciple", Type: [{ TypeName: "code" }] },
        { ElementName: "productionSpecification", Type: [{ TypeName: "devicecomponent_productionSpecification" }], IsArray: true },
        { ElementName: "languageCode", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const devicecomponent_productionSpecification: TypeModel = {
    TypeName: "devicecomponent_productionSpecification",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "specType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "componentId", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "productionSpec", Type: [{ TypeName: "string" }] },
    ],
};

export const DeviceMetric: TypeModel = {
    TypeName: "DeviceMetric",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "unit", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "source", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }] },
        { ElementName: "parent", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DeviceComponent"] }] },
        { ElementName: "operationalStatus", Type: [{ TypeName: "code" }] },
        { ElementName: "color", Type: [{ TypeName: "code" }] },
        { ElementName: "category", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "measurementPeriod", Type: [{ TypeName: "Timing" }] },
        { ElementName: "calibration", Type: [{ TypeName: "devicemetric_calibration" }], IsArray: true },
    ],
};

export const devicemetric_calibration: TypeModel = {
    TypeName: "devicemetric_calibration",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "code" }] },
        { ElementName: "state", Type: [{ TypeName: "code" }] },
        { ElementName: "time", Type: [{ TypeName: "instant" }] },
    ],
};

export const DeviceRequest: TypeModel = {
    TypeName: "DeviceRequest",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "definition", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ActivityDefinition"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/PlanDefinition"] }], IsArray: true },
        { ElementName: "basedOn", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "priorRequest", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "groupIdentifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }] },
        { ElementName: "intent", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "priority", Type: [{ TypeName: "code" }] },
        { ElementName: "code[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }], Required: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }], Required: true },
        { ElementName: "context", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/EpisodeOfCare"] }] },
        { ElementName: "occurrence[x]", Type: [{ TypeName: "Period" }, { TypeName: "Timing" }, { TypeName: "dateTime" }] },
        { ElementName: "authoredOn", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "requester", Type: [{ TypeName: "devicerequest_requester" }] },
        { ElementName: "performerType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "performer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/HealthcareService"] }] },
        { ElementName: "reasonCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "reasonReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "supportingInfo", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "relevantHistory", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Provenance"] }], IsArray: true },
    ],
};

export const devicerequest_requester: TypeModel = {
    TypeName: "devicerequest_requester",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "agent", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }], Required: true },
        { ElementName: "onBehalfOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
    ],
};

export const DeviceUseStatement: TypeModel = {
    TypeName: "DeviceUseStatement",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }], Required: true },
        { ElementName: "whenUsed", Type: [{ TypeName: "Period" }] },
        { ElementName: "timing[x]", Type: [{ TypeName: "Period" }, { TypeName: "Timing" }, { TypeName: "dateTime" }] },
        { ElementName: "recordedOn", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "source", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "device", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }], Required: true },
        { ElementName: "indication", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "bodySite", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
    ],
};

export const DiagnosticReport: TypeModel = {
    TypeName: "DiagnosticReport",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "basedOn", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CarePlan"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ImmunizationRecommendation"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MedicationRequest"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/NutritionOrder"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ProcedureRequest"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ReferralRequest"] }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "context", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/EpisodeOfCare"] }] },
        { ElementName: "effective[x]", Type: [{ TypeName: "Period" }, { TypeName: "dateTime" }] },
        { ElementName: "issued", Type: [{ TypeName: "instant" }] },
        { ElementName: "performer", Type: [{ TypeName: "diagnosticreport_performer" }], IsArray: true },
        { ElementName: "specimen", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Specimen"] }], IsArray: true },
        { ElementName: "result", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Observation"] }], IsArray: true },
        { ElementName: "imagingStudy", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ImagingStudy"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ImagingManifest"] }], IsArray: true },
        { ElementName: "image", Type: [{ TypeName: "diagnosticreport_image" }], IsArray: true },
        { ElementName: "conclusion", Type: [{ TypeName: "string" }] },
        { ElementName: "codedDiagnosis", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "presentedForm", Type: [{ TypeName: "Attachment" }], IsArray: true },
    ],
};

export const diagnosticreport_performer: TypeModel = {
    TypeName: "diagnosticreport_performer",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "actor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }], Required: true },
    ],
};

export const diagnosticreport_image: TypeModel = {
    TypeName: "diagnosticreport_image",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "comment", Type: [{ TypeName: "string" }] },
        { ElementName: "link", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Media"] }], Required: true },
    ],
};

export const DocumentManifest: TypeModel = {
    TypeName: "DocumentManifest",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "masterIdentifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }] },
        { ElementName: "created", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "author", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], IsArray: true },
        { ElementName: "recipient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }], IsArray: true },
        { ElementName: "source", Type: [{ TypeName: "uri" }] },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "content", Type: [{ TypeName: "documentmanifest_content" }], IsArray: true, Required: true },
        { ElementName: "related", Type: [{ TypeName: "documentmanifest_related" }], IsArray: true },
    ],
};

export const documentmanifest_content: TypeModel = {
    TypeName: "documentmanifest_content",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "p[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], Required: true },
    ],
};

export const documentmanifest_related: TypeModel = {
    TypeName: "documentmanifest_related",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "ref", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
    ],
};

export const DocumentReference: TypeModel = {
    TypeName: "DocumentReference",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "masterIdentifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "docStatus", Type: [{ TypeName: "code" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "class", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }] },
        { ElementName: "created", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "indexed", Type: [{ TypeName: "instant" }], Required: true },
        { ElementName: "author", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], IsArray: true },
        { ElementName: "authenticator", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "custodian", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "relatesTo", Type: [{ TypeName: "documentreference_relatesTo" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "securityLabel", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "content", Type: [{ TypeName: "documentreference_content" }], IsArray: true, Required: true },
        { ElementName: "context", Type: [{ TypeName: "documentreference_context" }] },
    ],
};

export const documentreference_relatesTo: TypeModel = {
    TypeName: "documentreference_relatesTo",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "target", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DocumentReference"] }], Required: true },
    ],
};

export const documentreference_content: TypeModel = {
    TypeName: "documentreference_content",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "attachment", Type: [{ TypeName: "Attachment" }], Required: true },
        { ElementName: "format", Type: [{ TypeName: "Coding" }] },
    ],
};

export const documentreference_context: TypeModel = {
    TypeName: "documentreference_context",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "event", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "facilityType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "practiceSetting", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "sourcePatientInfo", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }] },
        { ElementName: "related", Type: [{ TypeName: "documentreference_context_related" }], IsArray: true },
    ],
};

export const documentreference_context_related: TypeModel = {
    TypeName: "documentreference_context_related",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "ref", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
    ],
};

export const DomainResource: TypeModel = {
    TypeName: "DomainResource",
    BaseTypeName: "Resource",
    Elements: [
        { ElementName: "text", Type: [{ TypeName: "Narrative" }] },
        { ElementName: "contained", Type: [{ TypeName: "Resource" }], IsArray: true },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
    ],
};

export const EligibilityRequest: TypeModel = {
    TypeName: "EligibilityRequest",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }] },
        { ElementName: "priority", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "patient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }] },
        { ElementName: "serviced[x]", Type: [{ TypeName: "Period" }, { TypeName: "date" }] },
        { ElementName: "created", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "enterer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }] },
        { ElementName: "provider", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }] },
        { ElementName: "organization", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "insurer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "facility", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "coverage", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Coverage"] }] },
        { ElementName: "businessArrangement", Type: [{ TypeName: "string" }] },
        { ElementName: "benefitCategory", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "benefitSubCategory", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const EligibilityResponse: TypeModel = {
    TypeName: "EligibilityResponse",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }] },
        { ElementName: "created", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "requestProvider", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }] },
        { ElementName: "requestOrganization", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "request", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/EligibilityRequest"] }] },
        { ElementName: "outcome", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "disposition", Type: [{ TypeName: "string" }] },
        { ElementName: "insurer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "inforce", Type: [{ TypeName: "boolean" }] },
        { ElementName: "insurance", Type: [{ TypeName: "eligibilityresponse_insurance" }], IsArray: true },
        { ElementName: "form", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "error", Type: [{ TypeName: "eligibilityresponse_error" }], IsArray: true },
    ],
};

export const eligibilityresponse_insurance: TypeModel = {
    TypeName: "eligibilityresponse_insurance",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "coverage", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Coverage"] }] },
        { ElementName: "contract", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Contract"] }] },
        { ElementName: "benefitBalance", Type: [{ TypeName: "eligibilityresponse_insurance_benefitBalance" }], IsArray: true },
    ],
};

export const eligibilityresponse_insurance_benefitBalance: TypeModel = {
    TypeName: "eligibilityresponse_insurance_benefitBalance",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "subCategory", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "excluded", Type: [{ TypeName: "boolean" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "network", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "unit", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "term", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "financial", Type: [{ TypeName: "eligibilityresponse_insurance_benefitBalance_financial" }], IsArray: true },
    ],
};

export const eligibilityresponse_insurance_benefitBalance_financial: TypeModel = {
    TypeName: "eligibilityresponse_insurance_benefitBalance_financial",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "allowed[x]", Type: [{ TypeName: "Money" }, { TypeName: "string" }, { TypeName: "unsignedInt" }] },
        { ElementName: "used[x]", Type: [{ TypeName: "Money" }, { TypeName: "unsignedInt" }] },
    ],
};

export const eligibilityresponse_error: TypeModel = {
    TypeName: "eligibilityresponse_error",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
    ],
};

export const Encounter: TypeModel = {
    TypeName: "Encounter",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "statusHistory", Type: [{ TypeName: "encounter_statusHistory" }], IsArray: true },
        { ElementName: "class", Type: [{ TypeName: "Coding" }] },
        { ElementName: "classHistory", Type: [{ TypeName: "encounter_classHistory" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "priority", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }] },
        { ElementName: "episodeOfCare", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/EpisodeOfCare"] }], IsArray: true },
        { ElementName: "incomingReferral", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ReferralRequest"] }], IsArray: true },
        { ElementName: "participant", Type: [{ TypeName: "encounter_participant" }], IsArray: true },
        { ElementName: "appointment", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Appointment"] }] },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "length", Type: [{ TypeName: "Duration" }] },
        { ElementName: "reason", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "diagnosis", Type: [{ TypeName: "encounter_diagnosis" }], IsArray: true },
        { ElementName: "account", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Account"] }], IsArray: true },
        { ElementName: "hospitalization", Type: [{ TypeName: "encounter_hospitalization" }] },
        { ElementName: "location", Type: [{ TypeName: "encounter_location" }], IsArray: true },
        { ElementName: "serviceProvider", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "partOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
    ],
};

export const encounter_statusHistory: TypeModel = {
    TypeName: "encounter_statusHistory",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "period", Type: [{ TypeName: "Period" }], Required: true },
    ],
};

export const encounter_classHistory: TypeModel = {
    TypeName: "encounter_classHistory",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "class", Type: [{ TypeName: "Coding" }], Required: true },
        { ElementName: "period", Type: [{ TypeName: "Period" }], Required: true },
    ],
};

export const encounter_participant: TypeModel = {
    TypeName: "encounter_participant",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "individual", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
    ],
};

export const encounter_diagnosis: TypeModel = {
    TypeName: "encounter_diagnosis",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "condition", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Condition"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Procedure"] }], Required: true },
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "rank", Type: [{ TypeName: "positiveInt" }] },
    ],
};

export const encounter_hospitalization: TypeModel = {
    TypeName: "encounter_hospitalization",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "preAdmissionIdentifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "origin", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "admitSource", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "reAdmission", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "dietPreference", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "specialCourtesy", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "specialArrangement", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "destination", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "dischargeDisposition", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const encounter_location: TypeModel = {
    TypeName: "encounter_location",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "location", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }], Required: true },
        { ElementName: "status", Type: [{ TypeName: "code" }] },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
    ],
};

export const Endpoint: TypeModel = {
    TypeName: "Endpoint",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "connectionType", Type: [{ TypeName: "Coding" }], Required: true },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "managingOrganization", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "contact", Type: [{ TypeName: "ContactPoint" }], IsArray: true },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "payloadType", Type: [{ TypeName: "CodeableConcept" }], IsArray: true, Required: true },
        { ElementName: "payloadMimeType", Type: [{ TypeName: "code" }], IsArray: true },
        { ElementName: "address", Type: [{ TypeName: "uri" }], Required: true },
        { ElementName: "header", Type: [{ TypeName: "string" }], IsArray: true },
    ],
};

export const EnrollmentRequest: TypeModel = {
    TypeName: "EnrollmentRequest",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }] },
        { ElementName: "created", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "insurer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "provider", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }] },
        { ElementName: "organization", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }] },
        { ElementName: "coverage", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Coverage"] }] },
    ],
};

export const EnrollmentResponse: TypeModel = {
    TypeName: "EnrollmentResponse",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }] },
        { ElementName: "request", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/EnrollmentRequest"] }] },
        { ElementName: "outcome", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "disposition", Type: [{ TypeName: "string" }] },
        { ElementName: "created", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "organization", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "requestProvider", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }] },
        { ElementName: "requestOrganization", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
    ],
};

export const EpisodeOfCare: TypeModel = {
    TypeName: "EpisodeOfCare",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "statusHistory", Type: [{ TypeName: "episodeofcare_statusHistory" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "diagnosis", Type: [{ TypeName: "episodeofcare_diagnosis" }], IsArray: true },
        { ElementName: "patient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
        { ElementName: "managingOrganization", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "referralRequest", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ReferralRequest"] }], IsArray: true },
        { ElementName: "careManager", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }] },
        { ElementName: "team", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam"] }], IsArray: true },
        { ElementName: "account", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Account"] }], IsArray: true },
    ],
};

export const episodeofcare_statusHistory: TypeModel = {
    TypeName: "episodeofcare_statusHistory",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "period", Type: [{ TypeName: "Period" }], Required: true },
    ],
};

export const episodeofcare_diagnosis: TypeModel = {
    TypeName: "episodeofcare_diagnosis",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "condition", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Condition"] }], Required: true },
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "rank", Type: [{ TypeName: "positiveInt" }] },
    ],
};

export const ExpansionProfile: TypeModel = {
    TypeName: "ExpansionProfile",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "experimental", Type: [{ TypeName: "boolean" }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "publisher", Type: [{ TypeName: "string" }] },
        { ElementName: "contact", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "useContext", Type: [{ TypeName: "UsageContext" }], IsArray: true },
        { ElementName: "jurisdiction", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "fixedVersion", Type: [{ TypeName: "expansionprofile_fixedVersion" }], IsArray: true },
        { ElementName: "excludedSystem", Type: [{ TypeName: "expansionprofile_excludedSystem" }] },
        { ElementName: "includeDesignations", Type: [{ TypeName: "boolean" }] },
        { ElementName: "designation", Type: [{ TypeName: "expansionprofile_designation" }] },
        { ElementName: "includeDefinition", Type: [{ TypeName: "boolean" }] },
        { ElementName: "activeOnly", Type: [{ TypeName: "boolean" }] },
        { ElementName: "excludeNested", Type: [{ TypeName: "boolean" }] },
        { ElementName: "excludeNotForUI", Type: [{ TypeName: "boolean" }] },
        { ElementName: "excludePostCoordinated", Type: [{ TypeName: "boolean" }] },
        { ElementName: "displayLanguage", Type: [{ TypeName: "code" }] },
        { ElementName: "limitedExpansion", Type: [{ TypeName: "boolean" }] },
    ],
};

export const expansionprofile_fixedVersion: TypeModel = {
    TypeName: "expansionprofile_fixedVersion",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "system", Type: [{ TypeName: "uri" }], Required: true },
        { ElementName: "version", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "mode", Type: [{ TypeName: "code" }], Required: true },
    ],
};

export const expansionprofile_excludedSystem: TypeModel = {
    TypeName: "expansionprofile_excludedSystem",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "system", Type: [{ TypeName: "uri" }], Required: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
    ],
};

export const expansionprofile_designation: TypeModel = {
    TypeName: "expansionprofile_designation",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "include", Type: [{ TypeName: "expansionprofile_designation_include" }] },
        { ElementName: "exclude", Type: [{ TypeName: "expansionprofile_designation_exclude" }] },
    ],
};

export const expansionprofile_designation_include: TypeModel = {
    TypeName: "expansionprofile_designation_include",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "designation", Type: [{ TypeName: "expansionprofile_designation_include_designation" }], IsArray: true },
    ],
};

export const expansionprofile_designation_include_designation: TypeModel = {
    TypeName: "expansionprofile_designation_include_designation",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "language", Type: [{ TypeName: "code" }] },
        { ElementName: "use", Type: [{ TypeName: "Coding" }] },
    ],
};

export const expansionprofile_designation_exclude: TypeModel = {
    TypeName: "expansionprofile_designation_exclude",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "designation", Type: [{ TypeName: "expansionprofile_designation_exclude_designation" }], IsArray: true },
    ],
};

export const expansionprofile_designation_exclude_designation: TypeModel = {
    TypeName: "expansionprofile_designation_exclude_designation",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "language", Type: [{ TypeName: "code" }] },
        { ElementName: "use", Type: [{ TypeName: "Coding" }] },
    ],
};

export const ExplanationOfBenefit: TypeModel = {
    TypeName: "ExplanationOfBenefit",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "subType", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "patient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }] },
        { ElementName: "billablePeriod", Type: [{ TypeName: "Period" }] },
        { ElementName: "created", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "enterer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }] },
        { ElementName: "insurer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "provider", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }] },
        { ElementName: "organization", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "referral", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ReferralRequest"] }] },
        { ElementName: "facility", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "claim", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Claim"] }] },
        { ElementName: "claimResponse", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ClaimResponse"] }] },
        { ElementName: "outcome", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "disposition", Type: [{ TypeName: "string" }] },
        { ElementName: "related", Type: [{ TypeName: "explanationofbenefit_related" }], IsArray: true },
        { ElementName: "prescription", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MedicationRequest"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/VisionPrescription"] }] },
        { ElementName: "originalPrescription", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MedicationRequest"] }] },
        { ElementName: "payee", Type: [{ TypeName: "explanationofbenefit_payee" }] },
        { ElementName: "information", Type: [{ TypeName: "explanationofbenefit_information" }], IsArray: true },
        { ElementName: "careTeam", Type: [{ TypeName: "explanationofbenefit_careTeam" }], IsArray: true },
        { ElementName: "diagnosis", Type: [{ TypeName: "explanationofbenefit_diagnosis" }], IsArray: true },
        { ElementName: "procedure", Type: [{ TypeName: "explanationofbenefit_procedure" }], IsArray: true },
        { ElementName: "precedence", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "insurance", Type: [{ TypeName: "explanationofbenefit_insurance" }] },
        { ElementName: "accident", Type: [{ TypeName: "explanationofbenefit_accident" }] },
        { ElementName: "employmentImpacted", Type: [{ TypeName: "Period" }] },
        { ElementName: "hospitalization", Type: [{ TypeName: "Period" }] },
        { ElementName: "item", Type: [{ TypeName: "explanationofbenefit_item" }], IsArray: true },
        { ElementName: "addItem", Type: [{ TypeName: "explanationofbenefit_addItem" }], IsArray: true },
        { ElementName: "totalCost", Type: [{ TypeName: "Money" }] },
        { ElementName: "unallocDeductable", Type: [{ TypeName: "Money" }] },
        { ElementName: "totalBenefit", Type: [{ TypeName: "Money" }] },
        { ElementName: "payment", Type: [{ TypeName: "explanationofbenefit_payment" }] },
        { ElementName: "form", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "processNote", Type: [{ TypeName: "explanationofbenefit_processNote" }], IsArray: true },
        { ElementName: "benefitBalance", Type: [{ TypeName: "explanationofbenefit_benefitBalance" }], IsArray: true },
    ],
};

export const explanationofbenefit_related: TypeModel = {
    TypeName: "explanationofbenefit_related",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "claim", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Claim"] }] },
        { ElementName: "relationship", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "reference", Type: [{ TypeName: "Identifier" }] },
    ],
};

export const explanationofbenefit_payee: TypeModel = {
    TypeName: "explanationofbenefit_payee",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "resourceType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "party", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
    ],
};

export const explanationofbenefit_information: TypeModel = {
    TypeName: "explanationofbenefit_information",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "sequence", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "timing[x]", Type: [{ TypeName: "Period" }, { TypeName: "date" }] },
        { ElementName: "value[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "Quantity" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }, { TypeName: "string" }] },
        { ElementName: "reason", Type: [{ TypeName: "Coding" }] },
    ],
};

export const explanationofbenefit_careTeam: TypeModel = {
    TypeName: "explanationofbenefit_careTeam",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "sequence", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "provider", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }], Required: true },
        { ElementName: "responsible", Type: [{ TypeName: "boolean" }] },
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "qualification", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const explanationofbenefit_diagnosis: TypeModel = {
    TypeName: "explanationofbenefit_diagnosis",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "sequence", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "diagnosis[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Condition"] }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "packageCode", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const explanationofbenefit_procedure: TypeModel = {
    TypeName: "explanationofbenefit_procedure",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "sequence", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "procedure[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Procedure"] }], Required: true },
    ],
};

export const explanationofbenefit_insurance: TypeModel = {
    TypeName: "explanationofbenefit_insurance",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "coverage", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Coverage"] }] },
        { ElementName: "preAuthRef", Type: [{ TypeName: "string" }], IsArray: true },
    ],
};

export const explanationofbenefit_accident: TypeModel = {
    TypeName: "explanationofbenefit_accident",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "date", Type: [{ TypeName: "date" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "location[x]", Type: [{ TypeName: "Address" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
    ],
};

export const explanationofbenefit_item: TypeModel = {
    TypeName: "explanationofbenefit_item",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "sequence", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "careTeamLinkId", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "diagnosisLinkId", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "procedureLinkId", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "informationLinkId", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "revenue", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "service", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "modifier", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "programCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "serviced[x]", Type: [{ TypeName: "Period" }, { TypeName: "date" }] },
        { ElementName: "location[x]", Type: [{ TypeName: "Address" }, { TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "unitPrice", Type: [{ TypeName: "Money" }] },
        { ElementName: "factor", Type: [{ TypeName: "decimal" }] },
        { ElementName: "net", Type: [{ TypeName: "Money" }] },
        { ElementName: "udi", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }], IsArray: true },
        { ElementName: "bodySite", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "subSite", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }], IsArray: true },
        { ElementName: "noteNumber", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "adjudication", Type: [{ TypeName: "explanationofbenefit_item_adjudication" }], IsArray: true },
        { ElementName: "detail", Type: [{ TypeName: "explanationofbenefit_item_detail" }], IsArray: true },
    ],
};

export const explanationofbenefit_item_adjudication: TypeModel = {
    TypeName: "explanationofbenefit_item_adjudication",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "reason", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "amount", Type: [{ TypeName: "Money" }] },
        { ElementName: "value", Type: [{ TypeName: "decimal" }] },
    ],
};

export const explanationofbenefit_item_detail: TypeModel = {
    TypeName: "explanationofbenefit_item_detail",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "sequence", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "revenue", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "service", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "modifier", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "programCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "unitPrice", Type: [{ TypeName: "Money" }] },
        { ElementName: "factor", Type: [{ TypeName: "decimal" }] },
        { ElementName: "net", Type: [{ TypeName: "Money" }] },
        { ElementName: "udi", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }], IsArray: true },
        { ElementName: "noteNumber", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "adjudication", Type: [{ TypeName: "explanationofbenefit_item_adjudication" }], IsArray: true },
        { ElementName: "subDetail", Type: [{ TypeName: "explanationofbenefit_item_detail_subDetail" }], IsArray: true },
    ],
};

export const explanationofbenefit_item_detail_subDetail: TypeModel = {
    TypeName: "explanationofbenefit_item_detail_subDetail",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "sequence", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "revenue", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "service", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "modifier", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "programCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "unitPrice", Type: [{ TypeName: "Money" }] },
        { ElementName: "factor", Type: [{ TypeName: "decimal" }] },
        { ElementName: "net", Type: [{ TypeName: "Money" }] },
        { ElementName: "udi", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }], IsArray: true },
        { ElementName: "noteNumber", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "adjudication", Type: [{ TypeName: "explanationofbenefit_item_adjudication" }], IsArray: true },
    ],
};

export const explanationofbenefit_addItem: TypeModel = {
    TypeName: "explanationofbenefit_addItem",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "sequenceLinkId", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "revenue", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "service", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "modifier", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "fee", Type: [{ TypeName: "Money" }] },
        { ElementName: "noteNumber", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "adjudication", Type: [{ TypeName: "explanationofbenefit_item_adjudication" }], IsArray: true },
        { ElementName: "detail", Type: [{ TypeName: "explanationofbenefit_addItem_detail" }], IsArray: true },
    ],
};

export const explanationofbenefit_addItem_detail: TypeModel = {
    TypeName: "explanationofbenefit_addItem_detail",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "revenue", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "service", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "modifier", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "fee", Type: [{ TypeName: "Money" }] },
        { ElementName: "noteNumber", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "adjudication", Type: [{ TypeName: "explanationofbenefit_item_adjudication" }], IsArray: true },
    ],
};

export const explanationofbenefit_payment: TypeModel = {
    TypeName: "explanationofbenefit_payment",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "adjustment", Type: [{ TypeName: "Money" }] },
        { ElementName: "adjustmentReason", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "date", Type: [{ TypeName: "date" }] },
        { ElementName: "amount", Type: [{ TypeName: "Money" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
    ],
};

export const explanationofbenefit_processNote: TypeModel = {
    TypeName: "explanationofbenefit_processNote",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "number", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "text", Type: [{ TypeName: "string" }] },
        { ElementName: "language", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const explanationofbenefit_benefitBalance: TypeModel = {
    TypeName: "explanationofbenefit_benefitBalance",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "subCategory", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "excluded", Type: [{ TypeName: "boolean" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "network", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "unit", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "term", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "financial", Type: [{ TypeName: "explanationofbenefit_benefitBalance_financial" }], IsArray: true },
    ],
};

export const explanationofbenefit_benefitBalance_financial: TypeModel = {
    TypeName: "explanationofbenefit_benefitBalance_financial",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "allowed[x]", Type: [{ TypeName: "Money" }, { TypeName: "string" }, { TypeName: "unsignedInt" }] },
        { ElementName: "used[x]", Type: [{ TypeName: "Money" }, { TypeName: "unsignedInt" }] },
    ],
};

export const FamilyMemberHistory: TypeModel = {
    TypeName: "FamilyMemberHistory",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "definition", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/PlanDefinition"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Questionnaire"] }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "notDone", Type: [{ TypeName: "boolean" }] },
        { ElementName: "notDoneReason", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "patient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "relationship", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "gender", Type: [{ TypeName: "code" }] },
        { ElementName: "born[x]", Type: [{ TypeName: "Period" }, { TypeName: "date" }, { TypeName: "string" }] },
        { ElementName: "age[x]", Type: [{ TypeName: "Age" }, { TypeName: "Range" }, { TypeName: "string" }] },
        { ElementName: "estimatedAge", Type: [{ TypeName: "boolean" }] },
        { ElementName: "deceased[x]", Type: [{ TypeName: "Age" }, { TypeName: "Range" }, { TypeName: "boolean" }, { TypeName: "date" }, { TypeName: "string" }] },
        { ElementName: "reasonCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "reasonReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Condition"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Observation"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/AllergyIntolerance"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/QuestionnaireResponse"] }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "condition", Type: [{ TypeName: "familymemberhistory_condition" }], IsArray: true },
    ],
};

export const familymemberhistory_condition: TypeModel = {
    TypeName: "familymemberhistory_condition",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "outcome", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "onset[x]", Type: [{ TypeName: "Age" }, { TypeName: "Period" }, { TypeName: "Range" }, { TypeName: "string" }] },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
    ],
};

export const Flag: TypeModel = {
    TypeName: "Flag",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/PlanDefinition"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Medication"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Procedure"] }], Required: true },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "author", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }] },
    ],
};

export const Goal: TypeModel = {
    TypeName: "Goal",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "priority", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "description", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "start[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "date" }] },
        { ElementName: "target", Type: [{ TypeName: "goal_target" }] },
        { ElementName: "statusDate", Type: [{ TypeName: "date" }] },
        { ElementName: "statusReason", Type: [{ TypeName: "string" }] },
        { ElementName: "expressedBy", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "addresses", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Condition"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Observation"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MedicationStatement"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/NutritionOrder"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ProcedureRequest"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RiskAssessment"] }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "outcomeCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "outcomeReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Observation"] }], IsArray: true },
    ],
};

export const goal_target: TypeModel = {
    TypeName: "goal_target",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "measure", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "detail[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Quantity" }, { TypeName: "Range" }] },
        { ElementName: "due[x]", Type: [{ TypeName: "Duration" }, { TypeName: "date" }] },
    ],
};

export const GraphDefinition: TypeModel = {
    TypeName: "GraphDefinition",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }] },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "experimental", Type: [{ TypeName: "boolean" }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "publisher", Type: [{ TypeName: "string" }] },
        { ElementName: "contact", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "useContext", Type: [{ TypeName: "UsageContext" }], IsArray: true },
        { ElementName: "jurisdiction", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "purpose", Type: [{ TypeName: "markdown" }] },
        { ElementName: "start", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "profile", Type: [{ TypeName: "uri" }] },
        { ElementName: "link", Type: [{ TypeName: "graphdefinition_link" }], IsArray: true },
    ],
};

export const graphdefinition_link: TypeModel = {
    TypeName: "graphdefinition_link",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "path", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "sliceName", Type: [{ TypeName: "string" }] },
        { ElementName: "min", Type: [{ TypeName: "integer" }] },
        { ElementName: "max", Type: [{ TypeName: "string" }] },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "target", Type: [{ TypeName: "graphdefinition_link_target" }], IsArray: true, Required: true },
    ],
};

export const graphdefinition_link_target: TypeModel = {
    TypeName: "graphdefinition_link_target",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "profile", Type: [{ TypeName: "uri" }] },
        { ElementName: "compartment", Type: [{ TypeName: "graphdefinition_link_target_compartment" }], IsArray: true },
        { ElementName: "link", Type: [{ TypeName: "graphdefinition_link" }], IsArray: true },
    ],
};

export const graphdefinition_link_target_compartment: TypeModel = {
    TypeName: "graphdefinition_link_target_compartment",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "rule", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "expression", Type: [{ TypeName: "string" }] },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
    ],
};

export const Group: TypeModel = {
    TypeName: "Group",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "active", Type: [{ TypeName: "boolean" }] },
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "actual", Type: [{ TypeName: "boolean" }], Required: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "quantity", Type: [{ TypeName: "unsignedInt" }] },
        { ElementName: "characteristic", Type: [{ TypeName: "group_characteristic" }], IsArray: true },
        { ElementName: "member", Type: [{ TypeName: "group_member" }], IsArray: true },
    ],
};

export const group_characteristic: TypeModel = {
    TypeName: "group_characteristic",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "boolean" }], Required: true },
        { ElementName: "exclude", Type: [{ TypeName: "boolean" }], Required: true },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
    ],
};

export const group_member: TypeModel = {
    TypeName: "group_member",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "entity", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Medication"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Substance"] }], Required: true },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "inactive", Type: [{ TypeName: "boolean" }] },
    ],
};

export const GuidanceResponse: TypeModel = {
    TypeName: "GuidanceResponse",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "requestId", Type: [{ TypeName: "id" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "module", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ServiceDefinition"] }], Required: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }] },
        { ElementName: "context", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/EpisodeOfCare"] }] },
        { ElementName: "occurrenceDateTime", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "performer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }] },
        { ElementName: "reason[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "evaluationMessage", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/OperationOutcome"] }], IsArray: true },
        { ElementName: "outputParameters", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Parameters"] }] },
        { ElementName: "result", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CarePlan"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RequestGroup"] }] },
        { ElementName: "dataRequirement", Type: [{ TypeName: "DataRequirement" }], IsArray: true },
    ],
};

export const HealthcareService: TypeModel = {
    TypeName: "HealthcareService",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "active", Type: [{ TypeName: "boolean" }] },
        { ElementName: "providedBy", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "specialty", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "location", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }], IsArray: true },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "comment", Type: [{ TypeName: "string" }] },
        { ElementName: "extraDetails", Type: [{ TypeName: "string" }] },
        { ElementName: "photo", Type: [{ TypeName: "Attachment" }] },
        { ElementName: "telecom", Type: [{ TypeName: "ContactPoint" }], IsArray: true },
        { ElementName: "coverageArea", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }], IsArray: true },
        { ElementName: "serviceProvisionCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "eligibility", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "eligibilityNote", Type: [{ TypeName: "string" }] },
        { ElementName: "programName", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "characteristic", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "referralMethod", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "appointmentRequired", Type: [{ TypeName: "boolean" }] },
        { ElementName: "availableTime", Type: [{ TypeName: "healthcareservice_availableTime" }], IsArray: true },
        { ElementName: "notAvailable", Type: [{ TypeName: "healthcareservice_notAvailable" }], IsArray: true },
        { ElementName: "availabilityExceptions", Type: [{ TypeName: "string" }] },
        { ElementName: "endpoint", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Endpoint"] }], IsArray: true },
    ],
};

export const healthcareservice_availableTime: TypeModel = {
    TypeName: "healthcareservice_availableTime",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "daysOfWeek", Type: [{ TypeName: "code" }], IsArray: true },
        { ElementName: "allDay", Type: [{ TypeName: "boolean" }] },
        { ElementName: "availableStartTime", Type: [{ TypeName: "time" }] },
        { ElementName: "availableEndTime", Type: [{ TypeName: "time" }] },
    ],
};

export const healthcareservice_notAvailable: TypeModel = {
    TypeName: "healthcareservice_notAvailable",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "description", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "during", Type: [{ TypeName: "Period" }] },
    ],
};

export const ImagingManifest: TypeModel = {
    TypeName: "ImagingManifest",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "patient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
        { ElementName: "authoringTime", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "author", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "study", Type: [{ TypeName: "imagingmanifest_study" }], IsArray: true, Required: true },
    ],
};

export const imagingmanifest_study: TypeModel = {
    TypeName: "imagingmanifest_study",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "uid", Type: [{ TypeName: "oid" }], Required: true },
        { ElementName: "imagingStudy", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ImagingStudy"] }] },
        { ElementName: "endpoint", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Endpoint"] }], IsArray: true },
        { ElementName: "series", Type: [{ TypeName: "imagingmanifest_study_series" }], IsArray: true, Required: true },
    ],
};

export const imagingmanifest_study_series: TypeModel = {
    TypeName: "imagingmanifest_study_series",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "uid", Type: [{ TypeName: "oid" }], Required: true },
        { ElementName: "endpoint", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Endpoint"] }], IsArray: true },
        { ElementName: "instance", Type: [{ TypeName: "imagingmanifest_study_series_instance" }], IsArray: true, Required: true },
    ],
};

export const imagingmanifest_study_series_instance: TypeModel = {
    TypeName: "imagingmanifest_study_series_instance",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "sopClass", Type: [{ TypeName: "oid" }], Required: true },
        { ElementName: "uid", Type: [{ TypeName: "oid" }], Required: true },
    ],
};

export const ImagingStudy: TypeModel = {
    TypeName: "ImagingStudy",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "uid", Type: [{ TypeName: "oid" }], Required: true },
        { ElementName: "accession", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "availability", Type: [{ TypeName: "code" }] },
        { ElementName: "modalityList", Type: [{ TypeName: "Coding" }], IsArray: true },
        { ElementName: "patient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
        { ElementName: "context", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/EpisodeOfCare"] }] },
        { ElementName: "started", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "basedOn", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ReferralRequest"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CarePlan"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ProcedureRequest"] }], IsArray: true },
        { ElementName: "referrer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }] },
        { ElementName: "interpreter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }], IsArray: true },
        { ElementName: "endpoint", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Endpoint"] }], IsArray: true },
        { ElementName: "numberOfSeries", Type: [{ TypeName: "unsignedInt" }] },
        { ElementName: "numberOfInstances", Type: [{ TypeName: "unsignedInt" }] },
        { ElementName: "procedureReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Procedure"] }], IsArray: true },
        { ElementName: "procedureCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "reason", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "series", Type: [{ TypeName: "imagingstudy_series" }], IsArray: true },
    ],
};

export const imagingstudy_series: TypeModel = {
    TypeName: "imagingstudy_series",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "uid", Type: [{ TypeName: "oid" }], Required: true },
        { ElementName: "number", Type: [{ TypeName: "unsignedInt" }] },
        { ElementName: "modality", Type: [{ TypeName: "Coding" }], Required: true },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "numberOfInstances", Type: [{ TypeName: "unsignedInt" }] },
        { ElementName: "availability", Type: [{ TypeName: "code" }] },
        { ElementName: "endpoint", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Endpoint"] }], IsArray: true },
        { ElementName: "bodySite", Type: [{ TypeName: "Coding" }] },
        { ElementName: "laterality", Type: [{ TypeName: "Coding" }] },
        { ElementName: "started", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "performer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }], IsArray: true },
        { ElementName: "instance", Type: [{ TypeName: "imagingstudy_series_instance" }], IsArray: true },
    ],
};

export const imagingstudy_series_instance: TypeModel = {
    TypeName: "imagingstudy_series_instance",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "uid", Type: [{ TypeName: "oid" }], Required: true },
        { ElementName: "number", Type: [{ TypeName: "unsignedInt" }] },
        { ElementName: "sopClass", Type: [{ TypeName: "oid" }], Required: true },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
    ],
};

export const Immunization: TypeModel = {
    TypeName: "Immunization",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "notGiven", Type: [{ TypeName: "boolean" }], Required: true },
        { ElementName: "vaccineCode", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "patient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "primarySource", Type: [{ TypeName: "boolean" }], Required: true },
        { ElementName: "reportOrigin", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "location", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "manufacturer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "lotNumber", Type: [{ TypeName: "string" }] },
        { ElementName: "expirationDate", Type: [{ TypeName: "date" }] },
        { ElementName: "site", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "route", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "doseQuantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "practitioner", Type: [{ TypeName: "immunization_practitioner" }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "explanation", Type: [{ TypeName: "immunization_explanation" }] },
        { ElementName: "reaction", Type: [{ TypeName: "immunization_reaction" }], IsArray: true },
        { ElementName: "vaccinationProtocol", Type: [{ TypeName: "immunization_vaccinationProtocol" }], IsArray: true },
    ],
};

export const immunization_practitioner: TypeModel = {
    TypeName: "immunization_practitioner",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "actor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }], Required: true },
    ],
};

export const immunization_explanation: TypeModel = {
    TypeName: "immunization_explanation",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "reason", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "reasonNotGiven", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
    ],
};

export const immunization_reaction: TypeModel = {
    TypeName: "immunization_reaction",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "detail", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Observation"] }] },
        { ElementName: "reported", Type: [{ TypeName: "boolean" }] },
    ],
};

export const immunization_vaccinationProtocol: TypeModel = {
    TypeName: "immunization_vaccinationProtocol",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "doseSequence", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "authority", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "series", Type: [{ TypeName: "string" }] },
        { ElementName: "seriesDoses", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "targetDisease", Type: [{ TypeName: "CodeableConcept" }], IsArray: true, Required: true },
        { ElementName: "doseStatus", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "doseStatusReason", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const ImmunizationRecommendation: TypeModel = {
    TypeName: "ImmunizationRecommendation",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "patient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
        { ElementName: "recommendation", Type: [{ TypeName: "immunizationrecommendation_recommendation" }], IsArray: true, Required: true },
    ],
};

export const immunizationrecommendation_recommendation: TypeModel = {
    TypeName: "immunizationrecommendation_recommendation",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "date", Type: [{ TypeName: "dateTime" }], Required: true },
        { ElementName: "vaccineCode", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "targetDisease", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "doseNumber", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "forecastStatus", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "dateCriterion", Type: [{ TypeName: "immunizationrecommendation_recommendation_dateCriterion" }], IsArray: true },
        { ElementName: "protocol", Type: [{ TypeName: "immunizationrecommendation_recommendation_protocol" }] },
        { ElementName: "supportingImmunization", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Immunization"] }], IsArray: true },
        { ElementName: "supportingPatientInformation", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Observation"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/AllergyIntolerance"] }], IsArray: true },
    ],
};

export const immunizationrecommendation_recommendation_dateCriterion: TypeModel = {
    TypeName: "immunizationrecommendation_recommendation_dateCriterion",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "value", Type: [{ TypeName: "dateTime" }], Required: true },
    ],
};

export const immunizationrecommendation_recommendation_protocol: TypeModel = {
    TypeName: "immunizationrecommendation_recommendation_protocol",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "doseSequence", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "authority", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "series", Type: [{ TypeName: "string" }] },
    ],
};

export const ImplementationGuide: TypeModel = {
    TypeName: "ImplementationGuide",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }], Required: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "experimental", Type: [{ TypeName: "boolean" }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "publisher", Type: [{ TypeName: "string" }] },
        { ElementName: "contact", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "useContext", Type: [{ TypeName: "UsageContext" }], IsArray: true },
        { ElementName: "jurisdiction", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "copyright", Type: [{ TypeName: "markdown" }] },
        { ElementName: "fhirVersion", Type: [{ TypeName: "id" }] },
        { ElementName: "dependency", Type: [{ TypeName: "implementationguide_dependency" }], IsArray: true },
        { ElementName: "package", Type: [{ TypeName: "implementationguide_package" }], IsArray: true },
        { ElementName: "global", Type: [{ TypeName: "implementationguide_global" }], IsArray: true },
        { ElementName: "binary", Type: [{ TypeName: "uri" }], IsArray: true },
        { ElementName: "page", Type: [{ TypeName: "implementationguide_page" }] },
    ],
};

export const implementationguide_dependency: TypeModel = {
    TypeName: "implementationguide_dependency",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "uri", Type: [{ TypeName: "uri" }], Required: true },
    ],
};

export const implementationguide_package: TypeModel = {
    TypeName: "implementationguide_package",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "name", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "resource", Type: [{ TypeName: "implementationguide_package_resource" }], IsArray: true, Required: true },
    ],
};

export const implementationguide_package_resource: TypeModel = {
    TypeName: "implementationguide_package_resource",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "example", Type: [{ TypeName: "boolean" }], Required: true },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "acronym", Type: [{ TypeName: "string" }] },
        { ElementName: "source[x]", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }, { TypeName: "uri" }], Required: true },
        { ElementName: "exampleFor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/StructureDefinition"] }] },
    ],
};

export const implementationguide_global: TypeModel = {
    TypeName: "implementationguide_global",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "profile", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/StructureDefinition"] }], Required: true },
    ],
};

export const implementationguide_page: TypeModel = {
    TypeName: "implementationguide_page",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "source", Type: [{ TypeName: "uri" }], Required: true },
        { ElementName: "title", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "kind", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "code" }], IsArray: true },
        { ElementName: "package", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "format", Type: [{ TypeName: "code" }] },
        { ElementName: "page", Type: [{ TypeName: "implementationguide_page" }], IsArray: true },
    ],
};

export const Library: TypeModel = {
    TypeName: "Library",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "experimental", Type: [{ TypeName: "boolean" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "publisher", Type: [{ TypeName: "string" }] },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "purpose", Type: [{ TypeName: "markdown" }] },
        { ElementName: "usage", Type: [{ TypeName: "string" }] },
        { ElementName: "approvalDate", Type: [{ TypeName: "date" }] },
        { ElementName: "lastReviewDate", Type: [{ TypeName: "date" }] },
        { ElementName: "effectivePeriod", Type: [{ TypeName: "Period" }] },
        { ElementName: "useContext", Type: [{ TypeName: "UsageContext" }], IsArray: true },
        { ElementName: "jurisdiction", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "topic", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "contributor", Type: [{ TypeName: "Contributor" }], IsArray: true },
        { ElementName: "contact", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "copyright", Type: [{ TypeName: "markdown" }] },
        { ElementName: "relatedArtifact", Type: [{ TypeName: "RelatedArtifact" }], IsArray: true },
        { ElementName: "parameter", Type: [{ TypeName: "ParameterDefinition" }], IsArray: true },
        { ElementName: "dataRequirement", Type: [{ TypeName: "DataRequirement" }], IsArray: true },
        { ElementName: "content", Type: [{ TypeName: "Attachment" }], IsArray: true },
    ],
};

export const Linkage: TypeModel = {
    TypeName: "Linkage",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "active", Type: [{ TypeName: "boolean" }] },
        { ElementName: "author", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "item", Type: [{ TypeName: "linkage_item" }], IsArray: true, Required: true },
    ],
};

export const linkage_item: TypeModel = {
    TypeName: "linkage_item",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "resource", Type: [{ TypeName: "Reference" }], Required: true },
    ],
};

export const List: TypeModel = {
    TypeName: "List",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "mode", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "source", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }] },
        { ElementName: "orderedBy", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "entry", Type: [{ TypeName: "list_entry" }], IsArray: true },
        { ElementName: "emptyReason", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const list_entry: TypeModel = {
    TypeName: "list_entry",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "flag", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "deleted", Type: [{ TypeName: "boolean" }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "item", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], Required: true },
    ],
};

export const Location: TypeModel = {
    TypeName: "Location",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }] },
        { ElementName: "operationalStatus", Type: [{ TypeName: "Coding" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "alias", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "mode", Type: [{ TypeName: "code" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "telecom", Type: [{ TypeName: "ContactPoint" }], IsArray: true },
        { ElementName: "address", Type: [{ TypeName: "Address" }] },
        { ElementName: "physicalType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "position", Type: [{ TypeName: "location_position" }] },
        { ElementName: "managingOrganization", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "partOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "endpoint", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Endpoint"] }], IsArray: true },
    ],
};

export const location_position: TypeModel = {
    TypeName: "location_position",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "longitude", Type: [{ TypeName: "decimal" }], Required: true },
        { ElementName: "latitude", Type: [{ TypeName: "decimal" }], Required: true },
        { ElementName: "altitude", Type: [{ TypeName: "decimal" }] },
    ],
};

export const Measure: TypeModel = {
    TypeName: "Measure",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "experimental", Type: [{ TypeName: "boolean" }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "publisher", Type: [{ TypeName: "string" }] },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "purpose", Type: [{ TypeName: "markdown" }] },
        { ElementName: "usage", Type: [{ TypeName: "string" }] },
        { ElementName: "approvalDate", Type: [{ TypeName: "date" }] },
        { ElementName: "lastReviewDate", Type: [{ TypeName: "date" }] },
        { ElementName: "effectivePeriod", Type: [{ TypeName: "Period" }] },
        { ElementName: "useContext", Type: [{ TypeName: "UsageContext" }], IsArray: true },
        { ElementName: "jurisdiction", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "topic", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "contributor", Type: [{ TypeName: "Contributor" }], IsArray: true },
        { ElementName: "contact", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "copyright", Type: [{ TypeName: "markdown" }] },
        { ElementName: "relatedArtifact", Type: [{ TypeName: "RelatedArtifact" }], IsArray: true },
        { ElementName: "library", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Library"] }], IsArray: true },
        { ElementName: "disclaimer", Type: [{ TypeName: "markdown" }] },
        { ElementName: "scoring", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "compositeScoring", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "riskAdjustment", Type: [{ TypeName: "string" }] },
        { ElementName: "rateAggregation", Type: [{ TypeName: "string" }] },
        { ElementName: "rationale", Type: [{ TypeName: "markdown" }] },
        { ElementName: "clinicalRecommendationStatement", Type: [{ TypeName: "markdown" }] },
        { ElementName: "improvementNotation", Type: [{ TypeName: "string" }] },
        { ElementName: "definition", Type: [{ TypeName: "markdown" }], IsArray: true },
        { ElementName: "guidance", Type: [{ TypeName: "markdown" }] },
        { ElementName: "set", Type: [{ TypeName: "string" }] },
        { ElementName: "group", Type: [{ TypeName: "measure_group" }], IsArray: true },
        { ElementName: "supplementalData", Type: [{ TypeName: "measure_supplementalData" }], IsArray: true },
    ],
};

export const measure_group: TypeModel = {
    TypeName: "measure_group",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], Required: true },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "population", Type: [{ TypeName: "measure_group_population" }], IsArray: true },
        { ElementName: "stratifier", Type: [{ TypeName: "measure_group_stratifier" }], IsArray: true },
    ],
};

export const measure_group_population: TypeModel = {
    TypeName: "measure_group_population",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "criteria", Type: [{ TypeName: "string" }], Required: true },
    ],
};

export const measure_group_stratifier: TypeModel = {
    TypeName: "measure_group_stratifier",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "criteria", Type: [{ TypeName: "string" }] },
        { ElementName: "path", Type: [{ TypeName: "string" }] },
    ],
};

export const measure_supplementalData: TypeModel = {
    TypeName: "measure_supplementalData",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "usage", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "criteria", Type: [{ TypeName: "string" }] },
        { ElementName: "path", Type: [{ TypeName: "string" }] },
    ],
};

export const MeasureReport: TypeModel = {
    TypeName: "MeasureReport",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "measure", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Measure"] }], Required: true },
        { ElementName: "patient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "reportingOrganization", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "period", Type: [{ TypeName: "Period" }], Required: true },
        { ElementName: "group", Type: [{ TypeName: "measurereport_group" }], IsArray: true },
        { ElementName: "evaluatedResources", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Bundle"] }] },
    ],
};

export const measurereport_group: TypeModel = {
    TypeName: "measurereport_group",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], Required: true },
        { ElementName: "population", Type: [{ TypeName: "measurereport_group_population" }], IsArray: true },
        { ElementName: "measureScore", Type: [{ TypeName: "decimal" }] },
        { ElementName: "stratifier", Type: [{ TypeName: "measurereport_group_stratifier" }], IsArray: true },
    ],
};

export const measurereport_group_population: TypeModel = {
    TypeName: "measurereport_group_population",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "count", Type: [{ TypeName: "integer" }] },
        { ElementName: "patients", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/List"] }] },
    ],
};

export const measurereport_group_stratifier: TypeModel = {
    TypeName: "measurereport_group_stratifier",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "stratum", Type: [{ TypeName: "measurereport_group_stratifier_stratum" }], IsArray: true },
    ],
};

export const measurereport_group_stratifier_stratum: TypeModel = {
    TypeName: "measurereport_group_stratifier_stratum",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "value", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "population", Type: [{ TypeName: "measurereport_group_stratifier_stratum_population" }], IsArray: true },
        { ElementName: "measureScore", Type: [{ TypeName: "decimal" }] },
    ],
};

export const measurereport_group_stratifier_stratum_population: TypeModel = {
    TypeName: "measurereport_group_stratifier_stratum_population",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "count", Type: [{ TypeName: "integer" }] },
        { ElementName: "patients", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/List"] }] },
    ],
};

export const Media: TypeModel = {
    TypeName: "Media",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "basedOn", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ProcedureRequest"] }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "subtype", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "view", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Specimen"] }] },
        { ElementName: "context", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/EpisodeOfCare"] }] },
        { ElementName: "occurrence[x]", Type: [{ TypeName: "Period" }, { TypeName: "dateTime" }] },
        { ElementName: "operator", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }] },
        { ElementName: "reasonCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "bodySite", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "device", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DeviceMetric"] }] },
        { ElementName: "height", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "width", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "frames", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "duration", Type: [{ TypeName: "unsignedInt" }] },
        { ElementName: "content", Type: [{ TypeName: "Attachment" }], Required: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
    ],
};

export const Medication: TypeModel = {
    TypeName: "Medication",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }] },
        { ElementName: "isBrand", Type: [{ TypeName: "boolean" }] },
        { ElementName: "isOverTheCounter", Type: [{ TypeName: "boolean" }] },
        { ElementName: "manufacturer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "form", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "ingredient", Type: [{ TypeName: "medication_ingredient" }], IsArray: true },
        { ElementName: "package", Type: [{ TypeName: "medication_package" }] },
        { ElementName: "image", Type: [{ TypeName: "Attachment" }], IsArray: true },
    ],
};

export const medication_ingredient: TypeModel = {
    TypeName: "medication_ingredient",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "item[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Substance"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Medication"] }], Required: true },
        { ElementName: "isActive", Type: [{ TypeName: "boolean" }] },
        { ElementName: "amount", Type: [{ TypeName: "Ratio" }] },
    ],
};

export const medication_package: TypeModel = {
    TypeName: "medication_package",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "container", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "content", Type: [{ TypeName: "medication_package_content" }], IsArray: true },
        { ElementName: "batch", Type: [{ TypeName: "medication_package_batch" }], IsArray: true },
    ],
};

export const medication_package_content: TypeModel = {
    TypeName: "medication_package_content",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "item[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Medication"] }], Required: true },
        { ElementName: "amount", Type: [{ TypeName: "Quantity" }] },
    ],
};

export const medication_package_batch: TypeModel = {
    TypeName: "medication_package_batch",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "lotNumber", Type: [{ TypeName: "string" }] },
        { ElementName: "expirationDate", Type: [{ TypeName: "dateTime" }] },
    ],
};

export const MedicationAdministration: TypeModel = {
    TypeName: "MedicationAdministration",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "definition", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/PlanDefinition"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ActivityDefinition"] }], IsArray: true },
        { ElementName: "partOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MedicationAdministration"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Procedure"] }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "medication[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Medication"] }], Required: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }], Required: true },
        { ElementName: "context", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/EpisodeOfCare"] }] },
        { ElementName: "supportingInformation", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "effective[x]", Type: [{ TypeName: "Period" }, { TypeName: "dateTime" }], Required: true },
        { ElementName: "performer", Type: [{ TypeName: "medicationadministration_performer" }], IsArray: true },
        { ElementName: "notGiven", Type: [{ TypeName: "boolean" }] },
        { ElementName: "reasonNotGiven", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "reasonCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "reasonReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Condition"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Observation"] }], IsArray: true },
        { ElementName: "prescription", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MedicationRequest"] }] },
        { ElementName: "device", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "dosage", Type: [{ TypeName: "medicationadministration_dosage" }] },
        { ElementName: "eventHistory", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Provenance"] }], IsArray: true },
    ],
};

export const medicationadministration_performer: TypeModel = {
    TypeName: "medicationadministration_performer",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "actor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }], Required: true },
        { ElementName: "onBehalfOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
    ],
};

export const medicationadministration_dosage: TypeModel = {
    TypeName: "medicationadministration_dosage",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "text", Type: [{ TypeName: "string" }] },
        { ElementName: "site", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "route", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "method", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "dose", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "rate[x]", Type: [{ TypeName: "Quantity" }, { TypeName: "Ratio" }] },
    ],
};

export const MedicationDispense: TypeModel = {
    TypeName: "MedicationDispense",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "partOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Procedure"] }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }] },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "medication[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Medication"] }], Required: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }] },
        { ElementName: "context", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/EpisodeOfCare"] }] },
        { ElementName: "supportingInformation", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "performer", Type: [{ TypeName: "medicationdispense_performer" }], IsArray: true },
        { ElementName: "authorizingPrescription", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MedicationRequest"] }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "daysSupply", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "whenPrepared", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "whenHandedOver", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "destination", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "receiver", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "dosageInstruction", Type: [{ TypeName: "Dosage" }], IsArray: true },
        { ElementName: "substitution", Type: [{ TypeName: "medicationdispense_substitution" }] },
        { ElementName: "detectedIssue", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DetectedIssue"] }], IsArray: true },
        { ElementName: "notDone", Type: [{ TypeName: "boolean" }] },
        { ElementName: "notDoneReason[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DetectedIssue"] }] },
        { ElementName: "eventHistory", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Provenance"] }], IsArray: true },
    ],
};

export const medicationdispense_performer: TypeModel = {
    TypeName: "medicationdispense_performer",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "actor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
        { ElementName: "onBehalfOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
    ],
};

export const medicationdispense_substitution: TypeModel = {
    TypeName: "medicationdispense_substitution",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "wasSubstituted", Type: [{ TypeName: "boolean" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "reason", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "responsibleParty", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }], IsArray: true },
    ],
};

export const MedicationRequest: TypeModel = {
    TypeName: "MedicationRequest",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "definition", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ActivityDefinition"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/PlanDefinition"] }], IsArray: true },
        { ElementName: "basedOn", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CarePlan"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MedicationRequest"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ProcedureRequest"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ReferralRequest"] }], IsArray: true },
        { ElementName: "groupIdentifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }] },
        { ElementName: "intent", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "priority", Type: [{ TypeName: "code" }] },
        { ElementName: "medication[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Medication"] }], Required: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }], Required: true },
        { ElementName: "context", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/EpisodeOfCare"] }] },
        { ElementName: "supportingInformation", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "authoredOn", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "requester", Type: [{ TypeName: "medicationrequest_requester" }] },
        { ElementName: "recorder", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }] },
        { ElementName: "reasonCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "reasonReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Condition"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Observation"] }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "dosageInstruction", Type: [{ TypeName: "Dosage" }], IsArray: true },
        { ElementName: "dispenseRequest", Type: [{ TypeName: "medicationrequest_dispenseRequest" }] },
        { ElementName: "substitution", Type: [{ TypeName: "medicationrequest_substitution" }] },
        { ElementName: "priorPrescription", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MedicationRequest"] }] },
        { ElementName: "detectedIssue", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DetectedIssue"] }], IsArray: true },
        { ElementName: "eventHistory", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Provenance"] }], IsArray: true },
    ],
};

export const medicationrequest_requester: TypeModel = {
    TypeName: "medicationrequest_requester",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "agent", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }], Required: true },
        { ElementName: "onBehalfOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
    ],
};

export const medicationrequest_dispenseRequest: TypeModel = {
    TypeName: "medicationrequest_dispenseRequest",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "validityPeriod", Type: [{ TypeName: "Period" }] },
        { ElementName: "numberOfRepeatsAllowed", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "expectedSupplyDuration", Type: [{ TypeName: "Duration" }] },
        { ElementName: "performer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
    ],
};

export const medicationrequest_substitution: TypeModel = {
    TypeName: "medicationrequest_substitution",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "allowed", Type: [{ TypeName: "boolean" }], Required: true },
        { ElementName: "reason", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const MedicationStatement: TypeModel = {
    TypeName: "MedicationStatement",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "basedOn", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MedicationRequest"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CarePlan"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ProcedureRequest"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ReferralRequest"] }], IsArray: true },
        { ElementName: "partOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MedicationAdministration"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MedicationDispense"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MedicationStatement"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Procedure"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Observation"] }], IsArray: true },
        { ElementName: "context", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/EpisodeOfCare"] }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "medication[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Medication"] }], Required: true },
        { ElementName: "effective[x]", Type: [{ TypeName: "Period" }, { TypeName: "dateTime" }] },
        { ElementName: "dateAsserted", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "informationSource", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }], Required: true },
        { ElementName: "derivedFrom", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "taken", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "reasonNotTaken", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "reasonCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "reasonReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Condition"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Observation"] }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "dosage", Type: [{ TypeName: "Dosage" }], IsArray: true },
    ],
};

export const MessageDefinition: TypeModel = {
    TypeName: "MessageDefinition",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "experimental", Type: [{ TypeName: "boolean" }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }], Required: true },
        { ElementName: "publisher", Type: [{ TypeName: "string" }] },
        { ElementName: "contact", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "useContext", Type: [{ TypeName: "UsageContext" }], IsArray: true },
        { ElementName: "jurisdiction", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "purpose", Type: [{ TypeName: "markdown" }] },
        { ElementName: "copyright", Type: [{ TypeName: "markdown" }] },
        { ElementName: "base", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MessageDefinition"] }] },
        { ElementName: "parent", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ActivityDefinition"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/PlanDefinition"] }], IsArray: true },
        { ElementName: "replaces", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MessageDefinition"] }], IsArray: true },
        { ElementName: "event", Type: [{ TypeName: "Coding" }], Required: true },
        { ElementName: "category", Type: [{ TypeName: "code" }] },
        { ElementName: "focus", Type: [{ TypeName: "messagedefinition_focus" }], IsArray: true },
        { ElementName: "responseRequired", Type: [{ TypeName: "boolean" }] },
        { ElementName: "allowedResponse", Type: [{ TypeName: "messagedefinition_allowedResponse" }], IsArray: true },
    ],
};

export const messagedefinition_focus: TypeModel = {
    TypeName: "messagedefinition_focus",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "profile", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/StructureDefinition"] }] },
        { ElementName: "min", Type: [{ TypeName: "unsignedInt" }] },
        { ElementName: "max", Type: [{ TypeName: "string" }] },
    ],
};

export const messagedefinition_allowedResponse: TypeModel = {
    TypeName: "messagedefinition_allowedResponse",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "message", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MessageDefinition"] }], Required: true },
        { ElementName: "situation", Type: [{ TypeName: "markdown" }] },
    ],
};

export const MessageHeader: TypeModel = {
    TypeName: "MessageHeader",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "event", Type: [{ TypeName: "Coding" }], Required: true },
        { ElementName: "destination", Type: [{ TypeName: "messageheader_destination" }], IsArray: true },
        { ElementName: "receiver", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "sender", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "timestamp", Type: [{ TypeName: "instant" }], Required: true },
        { ElementName: "enterer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }] },
        { ElementName: "author", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }] },
        { ElementName: "source", Type: [{ TypeName: "messageheader_source" }], Required: true },
        { ElementName: "responsible", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "reason", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "response", Type: [{ TypeName: "messageheader_response" }] },
        { ElementName: "focus", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
    ],
};

export const messageheader_destination: TypeModel = {
    TypeName: "messageheader_destination",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "target", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }] },
        { ElementName: "endpoint", Type: [{ TypeName: "uri" }], Required: true },
    ],
};

export const messageheader_source: TypeModel = {
    TypeName: "messageheader_source",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "software", Type: [{ TypeName: "string" }] },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "contact", Type: [{ TypeName: "ContactPoint" }] },
        { ElementName: "endpoint", Type: [{ TypeName: "uri" }], Required: true },
    ],
};

export const messageheader_response: TypeModel = {
    TypeName: "messageheader_response",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "id" }], Required: true },
        { ElementName: "code", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "details", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/OperationOutcome"] }] },
    ],
};

export const NamingSystem: TypeModel = {
    TypeName: "NamingSystem",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "name", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "kind", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }], Required: true },
        { ElementName: "publisher", Type: [{ TypeName: "string" }] },
        { ElementName: "contact", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "responsible", Type: [{ TypeName: "string" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "useContext", Type: [{ TypeName: "UsageContext" }], IsArray: true },
        { ElementName: "jurisdiction", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "usage", Type: [{ TypeName: "string" }] },
        { ElementName: "uniqueId", Type: [{ TypeName: "namingsystem_uniqueId" }], IsArray: true, Required: true },
        { ElementName: "replacedBy", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/NamingSystem"] }] },
    ],
};

export const namingsystem_uniqueId: TypeModel = {
    TypeName: "namingsystem_uniqueId",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "value", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "preferred", Type: [{ TypeName: "boolean" }] },
        { ElementName: "comment", Type: [{ TypeName: "string" }] },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
    ],
};

export const NutritionOrder: TypeModel = {
    TypeName: "NutritionOrder",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }] },
        { ElementName: "patient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "dateTime", Type: [{ TypeName: "dateTime" }], Required: true },
        { ElementName: "orderer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }] },
        { ElementName: "allergyIntolerance", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/AllergyIntolerance"] }], IsArray: true },
        { ElementName: "foodPreferenceModifier", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "excludeFoodModifier", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "oralDiet", Type: [{ TypeName: "nutritionorder_oralDiet" }] },
        { ElementName: "supplement", Type: [{ TypeName: "nutritionorder_supplement" }], IsArray: true },
        { ElementName: "enteralFormula", Type: [{ TypeName: "nutritionorder_enteralFormula" }] },
    ],
};

export const nutritionorder_oralDiet: TypeModel = {
    TypeName: "nutritionorder_oralDiet",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "schedule", Type: [{ TypeName: "Timing" }], IsArray: true },
        { ElementName: "nutrient", Type: [{ TypeName: "nutritionorder_oralDiet_nutrient" }], IsArray: true },
        { ElementName: "texture", Type: [{ TypeName: "nutritionorder_oralDiet_texture" }], IsArray: true },
        { ElementName: "fluidConsistencyType", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "instruction", Type: [{ TypeName: "string" }] },
    ],
};

export const nutritionorder_oralDiet_nutrient: TypeModel = {
    TypeName: "nutritionorder_oralDiet_nutrient",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "modifier", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "amount", Type: [{ TypeName: "Quantity" }] },
    ],
};

export const nutritionorder_oralDiet_texture: TypeModel = {
    TypeName: "nutritionorder_oralDiet_texture",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "modifier", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "foodType", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const nutritionorder_supplement: TypeModel = {
    TypeName: "nutritionorder_supplement",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "productName", Type: [{ TypeName: "string" }] },
        { ElementName: "schedule", Type: [{ TypeName: "Timing" }], IsArray: true },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "instruction", Type: [{ TypeName: "string" }] },
    ],
};

export const nutritionorder_enteralFormula: TypeModel = {
    TypeName: "nutritionorder_enteralFormula",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "baseFormulaType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "baseFormulaProductName", Type: [{ TypeName: "string" }] },
        { ElementName: "additiveType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "additiveProductName", Type: [{ TypeName: "string" }] },
        { ElementName: "caloricDensity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "routeofAdministration", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "administration", Type: [{ TypeName: "nutritionorder_enteralFormula_administration" }], IsArray: true },
        { ElementName: "maxVolumeToDeliver", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "administrationInstruction", Type: [{ TypeName: "string" }] },
    ],
};

export const nutritionorder_enteralFormula_administration: TypeModel = {
    TypeName: "nutritionorder_enteralFormula_administration",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "schedule", Type: [{ TypeName: "Timing" }] },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "rate[x]", Type: [{ TypeName: "Quantity" }, { TypeName: "Ratio" }] },
    ],
};

export const Observation: TypeModel = {
    TypeName: "Observation",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "basedOn", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CarePlan"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DeviceRequest"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ImmunizationRecommendation"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MedicationRequest"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/NutritionOrder"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ProcedureRequest"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ReferralRequest"] }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "context", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/EpisodeOfCare"] }] },
        { ElementName: "effective[x]", Type: [{ TypeName: "Period" }, { TypeName: "dateTime" }] },
        { ElementName: "issued", Type: [{ TypeName: "instant" }] },
        { ElementName: "performer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], IsArray: true },
        { ElementName: "value[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "CodeableConcept" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "SampledData" }, { TypeName: "boolean" }, { TypeName: "dateTime" }, { TypeName: "string" }, { TypeName: "time" }] },
        { ElementName: "dataAbsentReason", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "interpretation", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "comment", Type: [{ TypeName: "string" }] },
        { ElementName: "bodySite", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "method", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "specimen", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Specimen"] }] },
        { ElementName: "device", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DeviceMetric"] }] },
        { ElementName: "referenceRange", Type: [{ TypeName: "observation_referenceRange" }], IsArray: true },
        { ElementName: "related", Type: [{ TypeName: "observation_related" }], IsArray: true },
        { ElementName: "component", Type: [{ TypeName: "observation_component" }], IsArray: true },
    ],
};

export const observation_referenceRange: TypeModel = {
    TypeName: "observation_referenceRange",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "low", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "high", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "appliesTo", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "age", Type: [{ TypeName: "Range" }] },
        { ElementName: "text", Type: [{ TypeName: "string" }] },
    ],
};

export const observation_related: TypeModel = {
    TypeName: "observation_related",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "code" }] },
        { ElementName: "target", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Observation"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/QuestionnaireResponse"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Sequence"] }], Required: true },
    ],
};

export const observation_component: TypeModel = {
    TypeName: "observation_component",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "CodeableConcept" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "SampledData" }, { TypeName: "dateTime" }, { TypeName: "string" }, { TypeName: "time" }] },
        { ElementName: "dataAbsentReason", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "interpretation", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "referenceRange", Type: [{ TypeName: "observation_referenceRange" }], IsArray: true },
    ],
};

export const OperationDefinition: TypeModel = {
    TypeName: "OperationDefinition",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }] },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "kind", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "experimental", Type: [{ TypeName: "boolean" }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "publisher", Type: [{ TypeName: "string" }] },
        { ElementName: "contact", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "useContext", Type: [{ TypeName: "UsageContext" }], IsArray: true },
        { ElementName: "jurisdiction", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "purpose", Type: [{ TypeName: "markdown" }] },
        { ElementName: "idempotent", Type: [{ TypeName: "boolean" }] },
        { ElementName: "code", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "comment", Type: [{ TypeName: "string" }] },
        { ElementName: "base", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/OperationDefinition"] }] },
        { ElementName: "resource", Type: [{ TypeName: "code" }], IsArray: true },
        { ElementName: "system", Type: [{ TypeName: "boolean" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "boolean" }], Required: true },
        { ElementName: "instance", Type: [{ TypeName: "boolean" }], Required: true },
        { ElementName: "parameter", Type: [{ TypeName: "operationdefinition_parameter" }], IsArray: true },
        { ElementName: "overload", Type: [{ TypeName: "operationdefinition_overload" }], IsArray: true },
    ],
};

export const operationdefinition_parameter: TypeModel = {
    TypeName: "operationdefinition_parameter",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "name", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "use", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "min", Type: [{ TypeName: "integer" }], Required: true },
        { ElementName: "max", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "documentation", Type: [{ TypeName: "string" }] },
        { ElementName: "type", Type: [{ TypeName: "code" }] },
        { ElementName: "searchType", Type: [{ TypeName: "code" }] },
        { ElementName: "profile", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/StructureDefinition"] }] },
        { ElementName: "binding", Type: [{ TypeName: "operationdefinition_parameter_binding" }] },
        { ElementName: "part", Type: [{ TypeName: "operationdefinition_parameter" }], IsArray: true },
    ],
};

export const operationdefinition_parameter_binding: TypeModel = {
    TypeName: "operationdefinition_parameter_binding",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "strength", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "valueSet[x]", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ValueSet"] }, { TypeName: "uri" }], Required: true },
    ],
};

export const operationdefinition_overload: TypeModel = {
    TypeName: "operationdefinition_overload",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "parameterName", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "comment", Type: [{ TypeName: "string" }] },
    ],
};

export const OperationOutcome: TypeModel = {
    TypeName: "OperationOutcome",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "issue", Type: [{ TypeName: "operationoutcome_issue" }], IsArray: true, Required: true },
    ],
};

export const operationoutcome_issue: TypeModel = {
    TypeName: "operationoutcome_issue",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "severity", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "code", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "details", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "diagnostics", Type: [{ TypeName: "string" }] },
        { ElementName: "location", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "expression", Type: [{ TypeName: "string" }], IsArray: true },
    ],
};

export const Organization: TypeModel = {
    TypeName: "Organization",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "active", Type: [{ TypeName: "boolean" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "alias", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "telecom", Type: [{ TypeName: "ContactPoint" }], IsArray: true },
        { ElementName: "address", Type: [{ TypeName: "Address" }], IsArray: true },
        { ElementName: "partOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "contact", Type: [{ TypeName: "organization_contact" }], IsArray: true },
        { ElementName: "endpoint", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Endpoint"] }], IsArray: true },
    ],
};

export const organization_contact: TypeModel = {
    TypeName: "organization_contact",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "purpose", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "name", Type: [{ TypeName: "HumanName" }] },
        { ElementName: "telecom", Type: [{ TypeName: "ContactPoint" }], IsArray: true },
        { ElementName: "address", Type: [{ TypeName: "Address" }] },
    ],
};

export const Parameters: TypeModel = {
    TypeName: "Parameters",
    BaseTypeName: "Resource",
    Elements: [
        { ElementName: "parameter", Type: [{ TypeName: "parameters_parameter" }], IsArray: true },
    ],
};

export const parameters_parameter: TypeModel = {
    TypeName: "parameters_parameter",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "name", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "Address" }, { TypeName: "Age" }, { TypeName: "Annotation" }, { TypeName: "Attachment" }, { TypeName: "CodeableConcept" }, { TypeName: "Coding" }, { TypeName: "ContactPoint" }, { TypeName: "Count" }, { TypeName: "Distance" }, { TypeName: "Duration" }, { TypeName: "HumanName" }, { TypeName: "Identifier" }, { TypeName: "Meta" }, { TypeName: "Money" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "Reference" }, { TypeName: "SampledData" }, { TypeName: "Signature" }, { TypeName: "Timing" }, { TypeName: "base64Binary" }, { TypeName: "boolean" }, { TypeName: "code" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "id" }, { TypeName: "instant" }, { TypeName: "integer" }, { TypeName: "markdown" }, { TypeName: "oid" }, { TypeName: "positiveInt" }, { TypeName: "string" }, { TypeName: "time" }, { TypeName: "unsignedInt" }, { TypeName: "uri" }] },
        { ElementName: "resource", Type: [{ TypeName: "Resource" }] },
        { ElementName: "part", Type: [{ TypeName: "parameters_parameter" }], IsArray: true },
    ],
};

export const Patient: TypeModel = {
    TypeName: "Patient",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "active", Type: [{ TypeName: "boolean" }] },
        { ElementName: "name", Type: [{ TypeName: "HumanName" }], IsArray: true },
        { ElementName: "telecom", Type: [{ TypeName: "ContactPoint" }], IsArray: true },
        { ElementName: "gender", Type: [{ TypeName: "code" }] },
        { ElementName: "birthDate", Type: [{ TypeName: "date" }] },
        { ElementName: "deceased[x]", Type: [{ TypeName: "boolean" }, { TypeName: "dateTime" }] },
        { ElementName: "address", Type: [{ TypeName: "Address" }], IsArray: true },
        { ElementName: "maritalStatus", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "multipleBirth[x]", Type: [{ TypeName: "boolean" }, { TypeName: "integer" }] },
        { ElementName: "photo", Type: [{ TypeName: "Attachment" }], IsArray: true },
        { ElementName: "contact", Type: [{ TypeName: "patient_contact" }], IsArray: true },
        { ElementName: "animal", Type: [{ TypeName: "patient_animal" }] },
        { ElementName: "communication", Type: [{ TypeName: "patient_communication" }], IsArray: true },
        { ElementName: "generalPractitioner", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }], IsArray: true },
        { ElementName: "managingOrganization", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "link", Type: [{ TypeName: "patient_link" }], IsArray: true },
    ],
};

export const patient_contact: TypeModel = {
    TypeName: "patient_contact",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "relationship", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "name", Type: [{ TypeName: "HumanName" }] },
        { ElementName: "telecom", Type: [{ TypeName: "ContactPoint" }], IsArray: true },
        { ElementName: "address", Type: [{ TypeName: "Address" }] },
        { ElementName: "gender", Type: [{ TypeName: "code" }] },
        { ElementName: "organization", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
    ],
};

export const patient_animal: TypeModel = {
    TypeName: "patient_animal",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "species", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "breed", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "genderStatus", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const patient_communication: TypeModel = {
    TypeName: "patient_communication",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "language", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "preferred", Type: [{ TypeName: "boolean" }] },
    ],
};

export const patient_link: TypeModel = {
    TypeName: "patient_link",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "other", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
    ],
};

export const PaymentNotice: TypeModel = {
    TypeName: "PaymentNotice",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }] },
        { ElementName: "request", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
        { ElementName: "response", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
        { ElementName: "statusDate", Type: [{ TypeName: "date" }] },
        { ElementName: "created", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "target", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "provider", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }] },
        { ElementName: "organization", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "paymentStatus", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const PaymentReconciliation: TypeModel = {
    TypeName: "PaymentReconciliation",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }] },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "created", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "organization", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "request", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ProcessRequest"] }] },
        { ElementName: "outcome", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "disposition", Type: [{ TypeName: "string" }] },
        { ElementName: "requestProvider", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }] },
        { ElementName: "requestOrganization", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "detail", Type: [{ TypeName: "paymentreconciliation_detail" }], IsArray: true },
        { ElementName: "form", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "total", Type: [{ TypeName: "Money" }] },
        { ElementName: "processNote", Type: [{ TypeName: "paymentreconciliation_processNote" }], IsArray: true },
    ],
};

export const paymentreconciliation_detail: TypeModel = {
    TypeName: "paymentreconciliation_detail",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "request", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
        { ElementName: "response", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
        { ElementName: "submitter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "payee", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "date", Type: [{ TypeName: "date" }] },
        { ElementName: "amount", Type: [{ TypeName: "Money" }] },
    ],
};

export const paymentreconciliation_processNote: TypeModel = {
    TypeName: "paymentreconciliation_processNote",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "text", Type: [{ TypeName: "string" }] },
    ],
};

export const Person: TypeModel = {
    TypeName: "Person",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "name", Type: [{ TypeName: "HumanName" }], IsArray: true },
        { ElementName: "telecom", Type: [{ TypeName: "ContactPoint" }], IsArray: true },
        { ElementName: "gender", Type: [{ TypeName: "code" }] },
        { ElementName: "birthDate", Type: [{ TypeName: "date" }] },
        { ElementName: "address", Type: [{ TypeName: "Address" }], IsArray: true },
        { ElementName: "photo", Type: [{ TypeName: "Attachment" }] },
        { ElementName: "managingOrganization", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "active", Type: [{ TypeName: "boolean" }] },
        { ElementName: "link", Type: [{ TypeName: "person_link" }], IsArray: true },
    ],
};

export const person_link: TypeModel = {
    TypeName: "person_link",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "target", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Person"] }], Required: true },
        { ElementName: "assurance", Type: [{ TypeName: "code" }] },
    ],
};

export const PlanDefinition: TypeModel = {
    TypeName: "PlanDefinition",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "experimental", Type: [{ TypeName: "boolean" }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "publisher", Type: [{ TypeName: "string" }] },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "purpose", Type: [{ TypeName: "markdown" }] },
        { ElementName: "usage", Type: [{ TypeName: "string" }] },
        { ElementName: "approvalDate", Type: [{ TypeName: "date" }] },
        { ElementName: "lastReviewDate", Type: [{ TypeName: "date" }] },
        { ElementName: "effectivePeriod", Type: [{ TypeName: "Period" }] },
        { ElementName: "useContext", Type: [{ TypeName: "UsageContext" }], IsArray: true },
        { ElementName: "jurisdiction", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "topic", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "contributor", Type: [{ TypeName: "Contributor" }], IsArray: true },
        { ElementName: "contact", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "copyright", Type: [{ TypeName: "markdown" }] },
        { ElementName: "relatedArtifact", Type: [{ TypeName: "RelatedArtifact" }], IsArray: true },
        { ElementName: "library", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Library"] }], IsArray: true },
        { ElementName: "goal", Type: [{ TypeName: "plandefinition_goal" }], IsArray: true },
        { ElementName: "action", Type: [{ TypeName: "plandefinition_action" }], IsArray: true },
    ],
};

export const plandefinition_goal: TypeModel = {
    TypeName: "plandefinition_goal",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "description", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "priority", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "start", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "addresses", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "documentation", Type: [{ TypeName: "RelatedArtifact" }], IsArray: true },
        { ElementName: "target", Type: [{ TypeName: "plandefinition_goal_target" }], IsArray: true },
    ],
};

export const plandefinition_goal_target: TypeModel = {
    TypeName: "plandefinition_goal_target",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "measure", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "detail[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Quantity" }, { TypeName: "Range" }] },
        { ElementName: "due", Type: [{ TypeName: "Duration" }] },
    ],
};

export const plandefinition_action: TypeModel = {
    TypeName: "plandefinition_action",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "label", Type: [{ TypeName: "string" }] },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "textEquivalent", Type: [{ TypeName: "string" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "reason", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "documentation", Type: [{ TypeName: "RelatedArtifact" }], IsArray: true },
        { ElementName: "goalId", Type: [{ TypeName: "id" }], IsArray: true },
        { ElementName: "triggerDefinition", Type: [{ TypeName: "TriggerDefinition" }], IsArray: true },
        { ElementName: "condition", Type: [{ TypeName: "plandefinition_action_condition" }], IsArray: true },
        { ElementName: "input", Type: [{ TypeName: "DataRequirement" }], IsArray: true },
        { ElementName: "output", Type: [{ TypeName: "DataRequirement" }], IsArray: true },
        { ElementName: "relatedAction", Type: [{ TypeName: "plandefinition_action_relatedAction" }], IsArray: true },
        { ElementName: "timing[x]", Type: [{ TypeName: "Duration" }, { TypeName: "Period" }, { TypeName: "Range" }, { TypeName: "Timing" }, { TypeName: "dateTime" }] },
        { ElementName: "participant", Type: [{ TypeName: "plandefinition_action_participant" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "Coding" }] },
        { ElementName: "groupingBehavior", Type: [{ TypeName: "code" }] },
        { ElementName: "selectionBehavior", Type: [{ TypeName: "code" }] },
        { ElementName: "requiredBehavior", Type: [{ TypeName: "code" }] },
        { ElementName: "precheckBehavior", Type: [{ TypeName: "code" }] },
        { ElementName: "cardinalityBehavior", Type: [{ TypeName: "code" }] },
        { ElementName: "definition", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ActivityDefinition"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/PlanDefinition"] }] },
        { ElementName: "transform", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/StructureMap"] }] },
        { ElementName: "dynamicValue", Type: [{ TypeName: "plandefinition_action_dynamicValue" }], IsArray: true },
        { ElementName: "action", Type: [{ TypeName: "plandefinition_action" }], IsArray: true },
    ],
};

export const plandefinition_action_condition: TypeModel = {
    TypeName: "plandefinition_action_condition",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "kind", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "language", Type: [{ TypeName: "string" }] },
        { ElementName: "expression", Type: [{ TypeName: "string" }] },
    ],
};

export const plandefinition_action_relatedAction: TypeModel = {
    TypeName: "plandefinition_action_relatedAction",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "actionId", Type: [{ TypeName: "id" }], Required: true },
        { ElementName: "relationship", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "offset[x]", Type: [{ TypeName: "Duration" }, { TypeName: "Range" }] },
    ],
};

export const plandefinition_action_participant: TypeModel = {
    TypeName: "plandefinition_action_participant",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const plandefinition_action_dynamicValue: TypeModel = {
    TypeName: "plandefinition_action_dynamicValue",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "path", Type: [{ TypeName: "string" }] },
        { ElementName: "language", Type: [{ TypeName: "string" }] },
        { ElementName: "expression", Type: [{ TypeName: "string" }] },
    ],
};

export const Practitioner: TypeModel = {
    TypeName: "Practitioner",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "active", Type: [{ TypeName: "boolean" }] },
        { ElementName: "name", Type: [{ TypeName: "HumanName" }], IsArray: true },
        { ElementName: "telecom", Type: [{ TypeName: "ContactPoint" }], IsArray: true },
        { ElementName: "address", Type: [{ TypeName: "Address" }], IsArray: true },
        { ElementName: "gender", Type: [{ TypeName: "code" }] },
        { ElementName: "birthDate", Type: [{ TypeName: "date" }] },
        { ElementName: "photo", Type: [{ TypeName: "Attachment" }], IsArray: true },
        { ElementName: "qualification", Type: [{ TypeName: "practitioner_qualification" }], IsArray: true },
        { ElementName: "communication", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
    ],
};

export const practitioner_qualification: TypeModel = {
    TypeName: "practitioner_qualification",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "issuer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
    ],
};

export const PractitionerRole: TypeModel = {
    TypeName: "PractitionerRole",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "active", Type: [{ TypeName: "boolean" }] },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "practitioner", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }] },
        { ElementName: "organization", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "specialty", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "location", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }], IsArray: true },
        { ElementName: "healthcareService", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/HealthcareService"] }], IsArray: true },
        { ElementName: "telecom", Type: [{ TypeName: "ContactPoint" }], IsArray: true },
        { ElementName: "availableTime", Type: [{ TypeName: "practitionerrole_availableTime" }], IsArray: true },
        { ElementName: "notAvailable", Type: [{ TypeName: "practitionerrole_notAvailable" }], IsArray: true },
        { ElementName: "availabilityExceptions", Type: [{ TypeName: "string" }] },
        { ElementName: "endpoint", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Endpoint"] }], IsArray: true },
    ],
};

export const practitionerrole_availableTime: TypeModel = {
    TypeName: "practitionerrole_availableTime",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "daysOfWeek", Type: [{ TypeName: "code" }], IsArray: true },
        { ElementName: "allDay", Type: [{ TypeName: "boolean" }] },
        { ElementName: "availableStartTime", Type: [{ TypeName: "time" }] },
        { ElementName: "availableEndTime", Type: [{ TypeName: "time" }] },
    ],
};

export const practitionerrole_notAvailable: TypeModel = {
    TypeName: "practitionerrole_notAvailable",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "description", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "during", Type: [{ TypeName: "Period" }] },
    ],
};

export const Procedure: TypeModel = {
    TypeName: "Procedure",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "definition", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/PlanDefinition"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ActivityDefinition"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/HealthcareService"] }], IsArray: true },
        { ElementName: "basedOn", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CarePlan"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ProcedureRequest"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ReferralRequest"] }], IsArray: true },
        { ElementName: "partOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Procedure"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Observation"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MedicationAdministration"] }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "notDone", Type: [{ TypeName: "boolean" }] },
        { ElementName: "notDoneReason", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }], Required: true },
        { ElementName: "context", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/EpisodeOfCare"] }] },
        { ElementName: "performed[x]", Type: [{ TypeName: "Period" }, { TypeName: "dateTime" }] },
        { ElementName: "performer", Type: [{ TypeName: "procedure_performer" }], IsArray: true },
        { ElementName: "location", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "reasonCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "reasonReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Condition"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Observation"] }], IsArray: true },
        { ElementName: "bodySite", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "outcome", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "report", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DiagnosticReport"] }], IsArray: true },
        { ElementName: "complication", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "complicationDetail", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Condition"] }], IsArray: true },
        { ElementName: "followUp", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "focalDevice", Type: [{ TypeName: "procedure_focalDevice" }], IsArray: true },
        { ElementName: "usedReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Medication"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Substance"] }], IsArray: true },
        { ElementName: "usedCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
    ],
};

export const procedure_performer: TypeModel = {
    TypeName: "procedure_performer",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "actor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }], Required: true },
        { ElementName: "onBehalfOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
    ],
};

export const procedure_focalDevice: TypeModel = {
    TypeName: "procedure_focalDevice",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "action", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "manipulated", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }], Required: true },
    ],
};

export const ProcedureRequest: TypeModel = {
    TypeName: "ProcedureRequest",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "definition", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ActivityDefinition"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/PlanDefinition"] }], IsArray: true },
        { ElementName: "basedOn", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "replaces", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "requisition", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "intent", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "priority", Type: [{ TypeName: "code" }] },
        { ElementName: "doNotPerform", Type: [{ TypeName: "boolean" }] },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }], Required: true },
        { ElementName: "context", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/EpisodeOfCare"] }] },
        { ElementName: "occurrence[x]", Type: [{ TypeName: "Period" }, { TypeName: "Timing" }, { TypeName: "dateTime" }] },
        { ElementName: "asNeeded[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "boolean" }] },
        { ElementName: "authoredOn", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "requester", Type: [{ TypeName: "procedurerequest_requester" }] },
        { ElementName: "performerType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "performer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/HealthcareService"] }] },
        { ElementName: "reasonCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "reasonReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Condition"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Observation"] }], IsArray: true },
        { ElementName: "supportingInfo", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "specimen", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Specimen"] }], IsArray: true },
        { ElementName: "bodySite", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "relevantHistory", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Provenance"] }], IsArray: true },
    ],
};

export const procedurerequest_requester: TypeModel = {
    TypeName: "procedurerequest_requester",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "agent", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }], Required: true },
        { ElementName: "onBehalfOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
    ],
};

export const ProcessRequest: TypeModel = {
    TypeName: "ProcessRequest",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }] },
        { ElementName: "action", Type: [{ TypeName: "code" }] },
        { ElementName: "target", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "created", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "provider", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }] },
        { ElementName: "organization", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "request", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
        { ElementName: "response", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
        { ElementName: "nullify", Type: [{ TypeName: "boolean" }] },
        { ElementName: "reference", Type: [{ TypeName: "string" }] },
        { ElementName: "item", Type: [{ TypeName: "processrequest_item" }], IsArray: true },
        { ElementName: "include", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "exclude", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
    ],
};

export const processrequest_item: TypeModel = {
    TypeName: "processrequest_item",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "sequenceLinkId", Type: [{ TypeName: "integer" }], Required: true },
    ],
};

export const ProcessResponse: TypeModel = {
    TypeName: "ProcessResponse",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }] },
        { ElementName: "created", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "organization", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "request", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
        { ElementName: "outcome", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "disposition", Type: [{ TypeName: "string" }] },
        { ElementName: "requestProvider", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }] },
        { ElementName: "requestOrganization", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "form", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "processNote", Type: [{ TypeName: "processresponse_processNote" }], IsArray: true },
        { ElementName: "error", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "communicationRequest", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CommunicationRequest"] }], IsArray: true },
    ],
};

export const processresponse_processNote: TypeModel = {
    TypeName: "processresponse_processNote",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "text", Type: [{ TypeName: "string" }] },
    ],
};

export const Provenance: TypeModel = {
    TypeName: "Provenance",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "target", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true, Required: true },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "recorded", Type: [{ TypeName: "instant" }], Required: true },
        { ElementName: "policy", Type: [{ TypeName: "uri" }], IsArray: true },
        { ElementName: "location", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "reason", Type: [{ TypeName: "Coding" }], IsArray: true },
        { ElementName: "activity", Type: [{ TypeName: "Coding" }] },
        { ElementName: "agent", Type: [{ TypeName: "provenance_agent" }], IsArray: true, Required: true },
        { ElementName: "entity", Type: [{ TypeName: "provenance_entity" }], IsArray: true },
        { ElementName: "signature", Type: [{ TypeName: "Signature" }], IsArray: true },
    ],
};

export const provenance_agent: TypeModel = {
    TypeName: "provenance_agent",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "who[x]", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }, { TypeName: "uri" }], Required: true },
        { ElementName: "onBehalfOf[x]", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }, { TypeName: "uri" }] },
        { ElementName: "relatedAgentType", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const provenance_entity: TypeModel = {
    TypeName: "provenance_entity",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "role", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "what[x]", Type: [{ TypeName: "Identifier" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }, { TypeName: "uri" }], Required: true },
        { ElementName: "agent", Type: [{ TypeName: "provenance_agent" }], IsArray: true },
    ],
};

export const Questionnaire: TypeModel = {
    TypeName: "Questionnaire",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "experimental", Type: [{ TypeName: "boolean" }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "publisher", Type: [{ TypeName: "string" }] },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "purpose", Type: [{ TypeName: "markdown" }] },
        { ElementName: "approvalDate", Type: [{ TypeName: "date" }] },
        { ElementName: "lastReviewDate", Type: [{ TypeName: "date" }] },
        { ElementName: "effectivePeriod", Type: [{ TypeName: "Period" }] },
        { ElementName: "useContext", Type: [{ TypeName: "UsageContext" }], IsArray: true },
        { ElementName: "jurisdiction", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "contact", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "copyright", Type: [{ TypeName: "markdown" }] },
        { ElementName: "code", Type: [{ TypeName: "Coding" }], IsArray: true },
        { ElementName: "subjectType", Type: [{ TypeName: "code" }], IsArray: true },
        { ElementName: "item", Type: [{ TypeName: "questionnaire_item" }], IsArray: true },
    ],
};

export const questionnaire_item: TypeModel = {
    TypeName: "questionnaire_item",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "linkId", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "definition", Type: [{ TypeName: "uri" }] },
        { ElementName: "code", Type: [{ TypeName: "Coding" }], IsArray: true },
        { ElementName: "prefix", Type: [{ TypeName: "string" }] },
        { ElementName: "text", Type: [{ TypeName: "string" }] },
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "enableWhen", Type: [{ TypeName: "questionnaire_item_enableWhen" }], IsArray: true },
        { ElementName: "required", Type: [{ TypeName: "boolean" }] },
        { ElementName: "repeats", Type: [{ TypeName: "boolean" }] },
        { ElementName: "readOnly", Type: [{ TypeName: "boolean" }] },
        { ElementName: "maxLength", Type: [{ TypeName: "integer" }] },
        { ElementName: "options", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ValueSet"] }] },
        { ElementName: "option", Type: [{ TypeName: "questionnaire_item_option" }], IsArray: true },
        { ElementName: "initial[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "Coding" }, { TypeName: "Quantity" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }, { TypeName: "boolean" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "integer" }, { TypeName: "string" }, { TypeName: "time" }, { TypeName: "uri" }] },
        { ElementName: "item", Type: [{ TypeName: "questionnaire_item" }], IsArray: true },
    ],
};

export const questionnaire_item_enableWhen: TypeModel = {
    TypeName: "questionnaire_item_enableWhen",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "question", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "hasAnswer", Type: [{ TypeName: "boolean" }] },
        { ElementName: "answer[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "Coding" }, { TypeName: "Quantity" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }, { TypeName: "boolean" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "integer" }, { TypeName: "string" }, { TypeName: "time" }, { TypeName: "uri" }] },
    ],
};

export const questionnaire_item_option: TypeModel = {
    TypeName: "questionnaire_item_option",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "value[x]", Type: [{ TypeName: "Coding" }, { TypeName: "date" }, { TypeName: "integer" }, { TypeName: "string" }, { TypeName: "time" }], Required: true },
    ],
};

export const QuestionnaireResponse: TypeModel = {
    TypeName: "QuestionnaireResponse",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "basedOn", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ReferralRequest"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CarePlan"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ProcedureRequest"] }], IsArray: true },
        { ElementName: "parent", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Observation"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Procedure"] }], IsArray: true },
        { ElementName: "questionnaire", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Questionnaire"] }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
        { ElementName: "context", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/EpisodeOfCare"] }] },
        { ElementName: "authored", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "author", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "source", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "item", Type: [{ TypeName: "questionnaireresponse_item" }], IsArray: true },
    ],
};

export const questionnaireresponse_item: TypeModel = {
    TypeName: "questionnaireresponse_item",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "linkId", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "definition", Type: [{ TypeName: "uri" }] },
        { ElementName: "text", Type: [{ TypeName: "string" }] },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
        { ElementName: "answer", Type: [{ TypeName: "questionnaireresponse_item_answer" }], IsArray: true },
        { ElementName: "item", Type: [{ TypeName: "questionnaireresponse_item" }], IsArray: true },
    ],
};

export const questionnaireresponse_item_answer: TypeModel = {
    TypeName: "questionnaireresponse_item_answer",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "value[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "Coding" }, { TypeName: "Quantity" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }, { TypeName: "boolean" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "integer" }, { TypeName: "string" }, { TypeName: "time" }, { TypeName: "uri" }] },
        { ElementName: "item", Type: [{ TypeName: "questionnaireresponse_item" }], IsArray: true },
    ],
};

export const ReferralRequest: TypeModel = {
    TypeName: "ReferralRequest",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "definition", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ActivityDefinition"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/PlanDefinition"] }], IsArray: true },
        { ElementName: "basedOn", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ReferralRequest"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CarePlan"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ProcedureRequest"] }], IsArray: true },
        { ElementName: "replaces", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ReferralRequest"] }], IsArray: true },
        { ElementName: "groupIdentifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "intent", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "priority", Type: [{ TypeName: "code" }] },
        { ElementName: "serviceRequested", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }], Required: true },
        { ElementName: "context", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/EpisodeOfCare"] }] },
        { ElementName: "occurrence[x]", Type: [{ TypeName: "Period" }, { TypeName: "dateTime" }] },
        { ElementName: "authoredOn", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "requester", Type: [{ TypeName: "referralrequest_requester" }] },
        { ElementName: "specialty", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "recipient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/HealthcareService"] }], IsArray: true },
        { ElementName: "reasonCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "reasonReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Condition"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Observation"] }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "supportingInfo", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "relevantHistory", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Provenance"] }], IsArray: true },
    ],
};

export const referralrequest_requester: TypeModel = {
    TypeName: "referralrequest_requester",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "agent", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }], Required: true },
        { ElementName: "onBehalfOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
    ],
};

export const RelatedPerson: TypeModel = {
    TypeName: "RelatedPerson",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "active", Type: [{ TypeName: "boolean" }] },
        { ElementName: "patient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
        { ElementName: "relationship", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "name", Type: [{ TypeName: "HumanName" }], IsArray: true },
        { ElementName: "telecom", Type: [{ TypeName: "ContactPoint" }], IsArray: true },
        { ElementName: "gender", Type: [{ TypeName: "code" }] },
        { ElementName: "birthDate", Type: [{ TypeName: "date" }] },
        { ElementName: "address", Type: [{ TypeName: "Address" }], IsArray: true },
        { ElementName: "photo", Type: [{ TypeName: "Attachment" }], IsArray: true },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
    ],
};

export const RequestGroup: TypeModel = {
    TypeName: "RequestGroup",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "definition", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "basedOn", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "replaces", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "groupIdentifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "intent", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "priority", Type: [{ TypeName: "code" }] },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }] },
        { ElementName: "context", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/EpisodeOfCare"] }] },
        { ElementName: "authoredOn", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "author", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }] },
        { ElementName: "reason[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "action", Type: [{ TypeName: "requestgroup_action" }], IsArray: true },
    ],
};

export const requestgroup_action: TypeModel = {
    TypeName: "requestgroup_action",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "label", Type: [{ TypeName: "string" }] },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "textEquivalent", Type: [{ TypeName: "string" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "documentation", Type: [{ TypeName: "RelatedArtifact" }], IsArray: true },
        { ElementName: "condition", Type: [{ TypeName: "requestgroup_action_condition" }], IsArray: true },
        { ElementName: "relatedAction", Type: [{ TypeName: "requestgroup_action_relatedAction" }], IsArray: true },
        { ElementName: "timing[x]", Type: [{ TypeName: "Duration" }, { TypeName: "Period" }, { TypeName: "Range" }, { TypeName: "Timing" }, { TypeName: "dateTime" }] },
        { ElementName: "participant", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Person"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "Coding" }] },
        { ElementName: "groupingBehavior", Type: [{ TypeName: "code" }] },
        { ElementName: "selectionBehavior", Type: [{ TypeName: "code" }] },
        { ElementName: "requiredBehavior", Type: [{ TypeName: "code" }] },
        { ElementName: "precheckBehavior", Type: [{ TypeName: "code" }] },
        { ElementName: "cardinalityBehavior", Type: [{ TypeName: "code" }] },
        { ElementName: "resource", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
        { ElementName: "action", Type: [{ TypeName: "requestgroup_action" }], IsArray: true },
    ],
};

export const requestgroup_action_condition: TypeModel = {
    TypeName: "requestgroup_action_condition",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "kind", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "language", Type: [{ TypeName: "string" }] },
        { ElementName: "expression", Type: [{ TypeName: "string" }] },
    ],
};

export const requestgroup_action_relatedAction: TypeModel = {
    TypeName: "requestgroup_action_relatedAction",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "actionId", Type: [{ TypeName: "id" }], Required: true },
        { ElementName: "relationship", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "offset[x]", Type: [{ TypeName: "Duration" }, { TypeName: "Range" }] },
    ],
};

export const ResearchStudy: TypeModel = {
    TypeName: "ResearchStudy",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "protocol", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/PlanDefinition"] }], IsArray: true },
        { ElementName: "partOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ResearchStudy"] }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "focus", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "contact", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "relatedArtifact", Type: [{ TypeName: "RelatedArtifact" }], IsArray: true },
        { ElementName: "keyword", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "jurisdiction", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "enrollment", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }], IsArray: true },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "sponsor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "principalInvestigator", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }] },
        { ElementName: "site", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }], IsArray: true },
        { ElementName: "reasonStopped", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "arm", Type: [{ TypeName: "researchstudy_arm" }], IsArray: true },
    ],
};

export const researchstudy_arm: TypeModel = {
    TypeName: "researchstudy_arm",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "name", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
    ],
};

export const ResearchSubject: TypeModel = {
    TypeName: "ResearchSubject",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "study", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ResearchStudy"] }], Required: true },
        { ElementName: "individual", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
        { ElementName: "assignedArm", Type: [{ TypeName: "string" }] },
        { ElementName: "actualArm", Type: [{ TypeName: "string" }] },
        { ElementName: "consent", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Consent"] }] },
    ],
};

export const Resource: TypeModel = {
    TypeName: "Resource",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "id" }] },
        { ElementName: "meta", Type: [{ TypeName: "Meta" }] },
        { ElementName: "implicitRules", Type: [{ TypeName: "uri" }] },
        { ElementName: "language", Type: [{ TypeName: "code" }] },
    ],
};

export const RiskAssessment: TypeModel = {
    TypeName: "RiskAssessment",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "basedOn", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
        { ElementName: "parent", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "method", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }] },
        { ElementName: "context", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/EpisodeOfCare"] }] },
        { ElementName: "occurrence[x]", Type: [{ TypeName: "Period" }, { TypeName: "dateTime" }] },
        { ElementName: "condition", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Condition"] }] },
        { ElementName: "performer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }] },
        { ElementName: "reason[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
        { ElementName: "basis", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "prediction", Type: [{ TypeName: "riskassessment_prediction" }], IsArray: true },
        { ElementName: "mitigation", Type: [{ TypeName: "string" }] },
        { ElementName: "comment", Type: [{ TypeName: "string" }] },
    ],
};

export const riskassessment_prediction: TypeModel = {
    TypeName: "riskassessment_prediction",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "outcome", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "probability[x]", Type: [{ TypeName: "Range" }, { TypeName: "decimal" }] },
        { ElementName: "qualitativeRisk", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "relativeRisk", Type: [{ TypeName: "decimal" }] },
        { ElementName: "when[x]", Type: [{ TypeName: "Period" }, { TypeName: "Range" }] },
        { ElementName: "rationale", Type: [{ TypeName: "string" }] },
    ],
};

export const Schedule: TypeModel = {
    TypeName: "Schedule",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "active", Type: [{ TypeName: "boolean" }] },
        { ElementName: "serviceCategory", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "serviceType", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "specialty", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "actor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/HealthcareService"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }], IsArray: true, Required: true },
        { ElementName: "planningHorizon", Type: [{ TypeName: "Period" }] },
        { ElementName: "comment", Type: [{ TypeName: "string" }] },
    ],
};

export const SearchParameter: TypeModel = {
    TypeName: "SearchParameter",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }], Required: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "experimental", Type: [{ TypeName: "boolean" }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "publisher", Type: [{ TypeName: "string" }] },
        { ElementName: "contact", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "useContext", Type: [{ TypeName: "UsageContext" }], IsArray: true },
        { ElementName: "jurisdiction", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "purpose", Type: [{ TypeName: "markdown" }] },
        { ElementName: "code", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "base", Type: [{ TypeName: "code" }], IsArray: true, Required: true },
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "derivedFrom", Type: [{ TypeName: "uri" }] },
        { ElementName: "description", Type: [{ TypeName: "markdown" }], Required: true },
        { ElementName: "expression", Type: [{ TypeName: "string" }] },
        { ElementName: "xpath", Type: [{ TypeName: "string" }] },
        { ElementName: "xpathUsage", Type: [{ TypeName: "code" }] },
        { ElementName: "target", Type: [{ TypeName: "code" }], IsArray: true },
        { ElementName: "comparator", Type: [{ TypeName: "code" }], IsArray: true },
        { ElementName: "modifier", Type: [{ TypeName: "code" }], IsArray: true },
        { ElementName: "chain", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "component", Type: [{ TypeName: "searchparameter_component" }], IsArray: true },
    ],
};

export const searchparameter_component: TypeModel = {
    TypeName: "searchparameter_component",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "definition", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/SearchParameter"] }], Required: true },
        { ElementName: "expression", Type: [{ TypeName: "string" }], Required: true },
    ],
};

export const Sequence: TypeModel = {
    TypeName: "Sequence",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "code" }] },
        { ElementName: "coordinateSystem", Type: [{ TypeName: "integer" }], Required: true },
        { ElementName: "patient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }] },
        { ElementName: "specimen", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Specimen"] }] },
        { ElementName: "device", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }] },
        { ElementName: "performer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "referenceSeq", Type: [{ TypeName: "sequence_referenceSeq" }] },
        { ElementName: "variant", Type: [{ TypeName: "sequence_variant" }], IsArray: true },
        { ElementName: "observedSeq", Type: [{ TypeName: "string" }] },
        { ElementName: "quality", Type: [{ TypeName: "sequence_quality" }], IsArray: true },
        { ElementName: "readCoverage", Type: [{ TypeName: "integer" }] },
        { ElementName: "repository", Type: [{ TypeName: "sequence_repository" }], IsArray: true },
        { ElementName: "pointer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Sequence"] }], IsArray: true },
    ],
};

export const sequence_referenceSeq: TypeModel = {
    TypeName: "sequence_referenceSeq",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "chromosome", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "genomeBuild", Type: [{ TypeName: "string" }] },
        { ElementName: "referenceSeqId", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "referenceSeqPointer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Sequence"] }] },
        { ElementName: "referenceSeqString", Type: [{ TypeName: "string" }] },
        { ElementName: "strand", Type: [{ TypeName: "integer" }] },
        { ElementName: "windowStart", Type: [{ TypeName: "integer" }], Required: true },
        { ElementName: "windowEnd", Type: [{ TypeName: "integer" }], Required: true },
    ],
};

export const sequence_variant: TypeModel = {
    TypeName: "sequence_variant",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "start", Type: [{ TypeName: "integer" }] },
        { ElementName: "end", Type: [{ TypeName: "integer" }] },
        { ElementName: "observedAllele", Type: [{ TypeName: "string" }] },
        { ElementName: "referenceAllele", Type: [{ TypeName: "string" }] },
        { ElementName: "cigar", Type: [{ TypeName: "string" }] },
        { ElementName: "variantPointer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Observation"] }] },
    ],
};

export const sequence_quality: TypeModel = {
    TypeName: "sequence_quality",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "standardSequence", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "start", Type: [{ TypeName: "integer" }] },
        { ElementName: "end", Type: [{ TypeName: "integer" }] },
        { ElementName: "score", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "method", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "truthTP", Type: [{ TypeName: "decimal" }] },
        { ElementName: "queryTP", Type: [{ TypeName: "decimal" }] },
        { ElementName: "truthFN", Type: [{ TypeName: "decimal" }] },
        { ElementName: "queryFP", Type: [{ TypeName: "decimal" }] },
        { ElementName: "gtFP", Type: [{ TypeName: "decimal" }] },
        { ElementName: "precision", Type: [{ TypeName: "decimal" }] },
        { ElementName: "recall", Type: [{ TypeName: "decimal" }] },
        { ElementName: "fScore", Type: [{ TypeName: "decimal" }] },
    ],
};

export const sequence_repository: TypeModel = {
    TypeName: "sequence_repository",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "url", Type: [{ TypeName: "uri" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "datasetId", Type: [{ TypeName: "string" }] },
        { ElementName: "variantsetId", Type: [{ TypeName: "string" }] },
        { ElementName: "readsetId", Type: [{ TypeName: "string" }] },
    ],
};

export const ServiceDefinition: TypeModel = {
    TypeName: "ServiceDefinition",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "experimental", Type: [{ TypeName: "boolean" }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "publisher", Type: [{ TypeName: "string" }] },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "purpose", Type: [{ TypeName: "markdown" }] },
        { ElementName: "usage", Type: [{ TypeName: "string" }] },
        { ElementName: "approvalDate", Type: [{ TypeName: "date" }] },
        { ElementName: "lastReviewDate", Type: [{ TypeName: "date" }] },
        { ElementName: "effectivePeriod", Type: [{ TypeName: "Period" }] },
        { ElementName: "useContext", Type: [{ TypeName: "UsageContext" }], IsArray: true },
        { ElementName: "jurisdiction", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "topic", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "contributor", Type: [{ TypeName: "Contributor" }], IsArray: true },
        { ElementName: "contact", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "copyright", Type: [{ TypeName: "markdown" }] },
        { ElementName: "relatedArtifact", Type: [{ TypeName: "RelatedArtifact" }], IsArray: true },
        { ElementName: "trigger", Type: [{ TypeName: "TriggerDefinition" }], IsArray: true },
        { ElementName: "dataRequirement", Type: [{ TypeName: "DataRequirement" }], IsArray: true },
        { ElementName: "operationDefinition", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/OperationDefinition"] }] },
    ],
};

export const Slot: TypeModel = {
    TypeName: "Slot",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "serviceCategory", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "serviceType", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "specialty", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "appointmentType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "schedule", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Schedule"] }], Required: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "start", Type: [{ TypeName: "instant" }], Required: true },
        { ElementName: "end", Type: [{ TypeName: "instant" }], Required: true },
        { ElementName: "overbooked", Type: [{ TypeName: "boolean" }] },
        { ElementName: "comment", Type: [{ TypeName: "string" }] },
    ],
};

export const Specimen: TypeModel = {
    TypeName: "Specimen",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "accessionIdentifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Substance"] }], Required: true },
        { ElementName: "receivedTime", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "parent", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Specimen"] }], IsArray: true },
        { ElementName: "request", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ProcedureRequest"] }], IsArray: true },
        { ElementName: "collection", Type: [{ TypeName: "specimen_collection" }] },
        { ElementName: "processing", Type: [{ TypeName: "specimen_processing" }], IsArray: true },
        { ElementName: "container", Type: [{ TypeName: "specimen_container" }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
    ],
};

export const specimen_collection: TypeModel = {
    TypeName: "specimen_collection",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "collector", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }] },
        { ElementName: "collected[x]", Type: [{ TypeName: "Period" }, { TypeName: "dateTime" }] },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "method", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "bodySite", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const specimen_processing: TypeModel = {
    TypeName: "specimen_processing",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "procedure", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "additive", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Substance"] }], IsArray: true },
        { ElementName: "time[x]", Type: [{ TypeName: "Period" }, { TypeName: "dateTime" }] },
    ],
};

export const specimen_container: TypeModel = {
    TypeName: "specimen_container",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "capacity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "specimenQuantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "additive[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Substance"] }] },
    ],
};

export const StructureDefinition: TypeModel = {
    TypeName: "StructureDefinition",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }], Required: true },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "experimental", Type: [{ TypeName: "boolean" }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "publisher", Type: [{ TypeName: "string" }] },
        { ElementName: "contact", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "useContext", Type: [{ TypeName: "UsageContext" }], IsArray: true },
        { ElementName: "jurisdiction", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "purpose", Type: [{ TypeName: "markdown" }] },
        { ElementName: "copyright", Type: [{ TypeName: "markdown" }] },
        { ElementName: "keyword", Type: [{ TypeName: "Coding" }], IsArray: true },
        { ElementName: "fhirVersion", Type: [{ TypeName: "id" }] },
        { ElementName: "mapping", Type: [{ TypeName: "structuredefinition_mapping" }], IsArray: true },
        { ElementName: "kind", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "abstract", Type: [{ TypeName: "boolean" }], Required: true },
        { ElementName: "contextType", Type: [{ TypeName: "code" }] },
        { ElementName: "context", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "contextInvariant", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "baseDefinition", Type: [{ TypeName: "uri" }] },
        { ElementName: "derivation", Type: [{ TypeName: "code" }] },
        { ElementName: "snapshot", Type: [{ TypeName: "structuredefinition_snapshot" }] },
        { ElementName: "differential", Type: [{ TypeName: "structuredefinition_differential" }] },
    ],
};

export const structuredefinition_mapping: TypeModel = {
    TypeName: "structuredefinition_mapping",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "identity", Type: [{ TypeName: "id" }], Required: true },
        { ElementName: "uri", Type: [{ TypeName: "uri" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "comment", Type: [{ TypeName: "string" }] },
    ],
};

export const structuredefinition_snapshot: TypeModel = {
    TypeName: "structuredefinition_snapshot",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "element", Type: [{ TypeName: "ElementDefinition" }], IsArray: true, Required: true },
    ],
};

export const structuredefinition_differential: TypeModel = {
    TypeName: "structuredefinition_differential",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "element", Type: [{ TypeName: "ElementDefinition" }], IsArray: true, Required: true },
    ],
};

export const StructureMap: TypeModel = {
    TypeName: "StructureMap",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }], Required: true },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "experimental", Type: [{ TypeName: "boolean" }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "publisher", Type: [{ TypeName: "string" }] },
        { ElementName: "contact", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "useContext", Type: [{ TypeName: "UsageContext" }], IsArray: true },
        { ElementName: "jurisdiction", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "purpose", Type: [{ TypeName: "markdown" }] },
        { ElementName: "copyright", Type: [{ TypeName: "markdown" }] },
        { ElementName: "structure", Type: [{ TypeName: "structuremap_structure" }], IsArray: true },
        { ElementName: "import", Type: [{ TypeName: "uri" }], IsArray: true },
        { ElementName: "group", Type: [{ TypeName: "structuremap_group" }], IsArray: true, Required: true },
    ],
};

export const structuremap_structure: TypeModel = {
    TypeName: "structuremap_structure",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }], Required: true },
        { ElementName: "mode", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "alias", Type: [{ TypeName: "string" }] },
        { ElementName: "documentation", Type: [{ TypeName: "string" }] },
    ],
};

export const structuremap_group: TypeModel = {
    TypeName: "structuremap_group",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "name", Type: [{ TypeName: "id" }], Required: true },
        { ElementName: "extends", Type: [{ TypeName: "id" }] },
        { ElementName: "typeMode", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "documentation", Type: [{ TypeName: "string" }] },
        { ElementName: "input", Type: [{ TypeName: "structuremap_group_input" }], IsArray: true, Required: true },
        { ElementName: "rule", Type: [{ TypeName: "structuremap_group_rule" }], IsArray: true, Required: true },
    ],
};

export const structuremap_group_input: TypeModel = {
    TypeName: "structuremap_group_input",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "name", Type: [{ TypeName: "id" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "string" }] },
        { ElementName: "mode", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "documentation", Type: [{ TypeName: "string" }] },
    ],
};

export const structuremap_group_rule: TypeModel = {
    TypeName: "structuremap_group_rule",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "name", Type: [{ TypeName: "id" }], Required: true },
        { ElementName: "source", Type: [{ TypeName: "structuremap_group_rule_source" }], IsArray: true, Required: true },
        { ElementName: "target", Type: [{ TypeName: "structuremap_group_rule_target" }], IsArray: true },
        { ElementName: "rule", Type: [{ TypeName: "structuremap_group_rule" }], IsArray: true },
        { ElementName: "dependent", Type: [{ TypeName: "structuremap_group_rule_dependent" }], IsArray: true },
        { ElementName: "documentation", Type: [{ TypeName: "string" }] },
    ],
};

export const structuremap_group_rule_source: TypeModel = {
    TypeName: "structuremap_group_rule_source",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "context", Type: [{ TypeName: "id" }], Required: true },
        { ElementName: "min", Type: [{ TypeName: "integer" }] },
        { ElementName: "max", Type: [{ TypeName: "string" }] },
        { ElementName: "type", Type: [{ TypeName: "string" }] },
        { ElementName: "defaultValue[x]", Type: [{ TypeName: "Address" }, { TypeName: "Age" }, { TypeName: "Annotation" }, { TypeName: "Attachment" }, { TypeName: "CodeableConcept" }, { TypeName: "Coding" }, { TypeName: "ContactPoint" }, { TypeName: "Count" }, { TypeName: "Distance" }, { TypeName: "Duration" }, { TypeName: "HumanName" }, { TypeName: "Identifier" }, { TypeName: "Meta" }, { TypeName: "Money" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "Reference" }, { TypeName: "SampledData" }, { TypeName: "Signature" }, { TypeName: "Timing" }, { TypeName: "base64Binary" }, { TypeName: "boolean" }, { TypeName: "code" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "id" }, { TypeName: "instant" }, { TypeName: "integer" }, { TypeName: "markdown" }, { TypeName: "oid" }, { TypeName: "positiveInt" }, { TypeName: "string" }, { TypeName: "time" }, { TypeName: "unsignedInt" }, { TypeName: "uri" }] },
        { ElementName: "element", Type: [{ TypeName: "string" }] },
        { ElementName: "listMode", Type: [{ TypeName: "code" }] },
        { ElementName: "variable", Type: [{ TypeName: "id" }] },
        { ElementName: "condition", Type: [{ TypeName: "string" }] },
        { ElementName: "check", Type: [{ TypeName: "string" }] },
    ],
};

export const structuremap_group_rule_target: TypeModel = {
    TypeName: "structuremap_group_rule_target",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "context", Type: [{ TypeName: "id" }] },
        { ElementName: "contextType", Type: [{ TypeName: "code" }] },
        { ElementName: "element", Type: [{ TypeName: "string" }] },
        { ElementName: "variable", Type: [{ TypeName: "id" }] },
        { ElementName: "listMode", Type: [{ TypeName: "code" }], IsArray: true },
        { ElementName: "listRuleId", Type: [{ TypeName: "id" }] },
        { ElementName: "transform", Type: [{ TypeName: "code" }] },
        { ElementName: "parameter", Type: [{ TypeName: "structuremap_group_rule_target_parameter" }], IsArray: true },
    ],
};

export const structuremap_group_rule_target_parameter: TypeModel = {
    TypeName: "structuremap_group_rule_target_parameter",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "value[x]", Type: [{ TypeName: "boolean" }, { TypeName: "decimal" }, { TypeName: "id" }, { TypeName: "integer" }, { TypeName: "string" }], Required: true },
    ],
};

export const structuremap_group_rule_dependent: TypeModel = {
    TypeName: "structuremap_group_rule_dependent",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "name", Type: [{ TypeName: "id" }], Required: true },
        { ElementName: "variable", Type: [{ TypeName: "string" }], IsArray: true, Required: true },
    ],
};

export const Subscription: TypeModel = {
    TypeName: "Subscription",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "contact", Type: [{ TypeName: "ContactPoint" }], IsArray: true },
        { ElementName: "end", Type: [{ TypeName: "instant" }] },
        { ElementName: "reason", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "criteria", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "error", Type: [{ TypeName: "string" }] },
        { ElementName: "channel", Type: [{ TypeName: "subscription_channel" }], Required: true },
        { ElementName: "tag", Type: [{ TypeName: "Coding" }], IsArray: true },
    ],
};

export const subscription_channel: TypeModel = {
    TypeName: "subscription_channel",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "endpoint", Type: [{ TypeName: "uri" }] },
        { ElementName: "payload", Type: [{ TypeName: "string" }] },
        { ElementName: "header", Type: [{ TypeName: "string" }], IsArray: true },
    ],
};

export const Substance: TypeModel = {
    TypeName: "Substance",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }] },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "instance", Type: [{ TypeName: "substance_instance" }], IsArray: true },
        { ElementName: "ingredient", Type: [{ TypeName: "substance_ingredient" }], IsArray: true },
    ],
};

export const substance_instance: TypeModel = {
    TypeName: "substance_instance",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "expiry", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
    ],
};

export const substance_ingredient: TypeModel = {
    TypeName: "substance_ingredient",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "quantity", Type: [{ TypeName: "Ratio" }] },
        { ElementName: "substance[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Substance"] }], Required: true },
    ],
};

export const SupplyDelivery: TypeModel = {
    TypeName: "SupplyDelivery",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "basedOn", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/SupplyRequest"] }], IsArray: true },
        { ElementName: "partOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/SupplyDelivery"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Contract"] }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }] },
        { ElementName: "patient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "suppliedItem", Type: [{ TypeName: "supplydelivery_suppliedItem" }] },
        { ElementName: "occurrence[x]", Type: [{ TypeName: "Period" }, { TypeName: "Timing" }, { TypeName: "dateTime" }] },
        { ElementName: "supplier", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "destination", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "receiver", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }], IsArray: true },
    ],
};

export const supplydelivery_suppliedItem: TypeModel = {
    TypeName: "supplydelivery_suppliedItem",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "item[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Medication"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Substance"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }] },
    ],
};

export const SupplyRequest: TypeModel = {
    TypeName: "SupplyRequest",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }] },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "priority", Type: [{ TypeName: "code" }] },
        { ElementName: "orderedItem", Type: [{ TypeName: "supplyrequest_orderedItem" }] },
        { ElementName: "occurrence[x]", Type: [{ TypeName: "Period" }, { TypeName: "Timing" }, { TypeName: "dateTime" }] },
        { ElementName: "authoredOn", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "requester", Type: [{ TypeName: "supplyrequest_requester" }] },
        { ElementName: "supplier", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }], IsArray: true },
        { ElementName: "reason[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
        { ElementName: "deliverFrom", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "deliverTo", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }] },
    ],
};

export const supplyrequest_orderedItem: TypeModel = {
    TypeName: "supplyrequest_orderedItem",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }], Required: true },
        { ElementName: "item[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Medication"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Substance"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }] },
    ],
};

export const supplyrequest_requester: TypeModel = {
    TypeName: "supplyrequest_requester",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "agent", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }], Required: true },
        { ElementName: "onBehalfOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
    ],
};

export const Task: TypeModel = {
    TypeName: "Task",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "definition[x]", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ActivityDefinition"] }, { TypeName: "uri" }] },
        { ElementName: "basedOn", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "groupIdentifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "partOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Task"] }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "statusReason", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "businessStatus", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "intent", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "priority", Type: [{ TypeName: "code" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "focus", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
        { ElementName: "for", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
        { ElementName: "context", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/EpisodeOfCare"] }] },
        { ElementName: "executionPeriod", Type: [{ TypeName: "Period" }] },
        { ElementName: "authoredOn", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "lastModified", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "requester", Type: [{ TypeName: "task_requester" }] },
        { ElementName: "performerType", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "owner", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "reason", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "relevantHistory", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Provenance"] }], IsArray: true },
        { ElementName: "restriction", Type: [{ TypeName: "task_restriction" }] },
        { ElementName: "input", Type: [{ TypeName: "task_input" }], IsArray: true },
        { ElementName: "output", Type: [{ TypeName: "task_output" }], IsArray: true },
    ],
};

export const task_requester: TypeModel = {
    TypeName: "task_requester",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "agent", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
        { ElementName: "onBehalfOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
    ],
};

export const task_restriction: TypeModel = {
    TypeName: "task_restriction",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "repetitions", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "recipient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }], IsArray: true },
    ],
};

export const task_input: TypeModel = {
    TypeName: "task_input",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "Address" }, { TypeName: "Age" }, { TypeName: "Annotation" }, { TypeName: "Attachment" }, { TypeName: "CodeableConcept" }, { TypeName: "Coding" }, { TypeName: "ContactPoint" }, { TypeName: "Count" }, { TypeName: "Distance" }, { TypeName: "Duration" }, { TypeName: "HumanName" }, { TypeName: "Identifier" }, { TypeName: "Meta" }, { TypeName: "Money" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "Reference" }, { TypeName: "SampledData" }, { TypeName: "Signature" }, { TypeName: "Timing" }, { TypeName: "base64Binary" }, { TypeName: "boolean" }, { TypeName: "code" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "id" }, { TypeName: "instant" }, { TypeName: "integer" }, { TypeName: "markdown" }, { TypeName: "oid" }, { TypeName: "positiveInt" }, { TypeName: "string" }, { TypeName: "time" }, { TypeName: "unsignedInt" }, { TypeName: "uri" }], Required: true },
    ],
};

export const task_output: TypeModel = {
    TypeName: "task_output",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "Address" }, { TypeName: "Age" }, { TypeName: "Annotation" }, { TypeName: "Attachment" }, { TypeName: "CodeableConcept" }, { TypeName: "Coding" }, { TypeName: "ContactPoint" }, { TypeName: "Count" }, { TypeName: "Distance" }, { TypeName: "Duration" }, { TypeName: "HumanName" }, { TypeName: "Identifier" }, { TypeName: "Meta" }, { TypeName: "Money" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "Reference" }, { TypeName: "SampledData" }, { TypeName: "Signature" }, { TypeName: "Timing" }, { TypeName: "base64Binary" }, { TypeName: "boolean" }, { TypeName: "code" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "id" }, { TypeName: "instant" }, { TypeName: "integer" }, { TypeName: "markdown" }, { TypeName: "oid" }, { TypeName: "positiveInt" }, { TypeName: "string" }, { TypeName: "time" }, { TypeName: "unsignedInt" }, { TypeName: "uri" }], Required: true },
    ],
};

export const TestReport: TypeModel = {
    TypeName: "TestReport",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "testScript", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/TestScript"] }], Required: true },
        { ElementName: "result", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "score", Type: [{ TypeName: "decimal" }] },
        { ElementName: "tester", Type: [{ TypeName: "string" }] },
        { ElementName: "issued", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "participant", Type: [{ TypeName: "testreport_participant" }], IsArray: true },
        { ElementName: "setup", Type: [{ TypeName: "testreport_setup" }] },
        { ElementName: "test", Type: [{ TypeName: "testreport_test" }], IsArray: true },
        { ElementName: "teardown", Type: [{ TypeName: "testreport_teardown" }] },
    ],
};

export const testreport_participant: TypeModel = {
    TypeName: "testreport_participant",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "uri", Type: [{ TypeName: "uri" }], Required: true },
        { ElementName: "display", Type: [{ TypeName: "string" }] },
    ],
};

export const testreport_setup: TypeModel = {
    TypeName: "testreport_setup",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "action", Type: [{ TypeName: "testreport_setup_action" }], IsArray: true, Required: true },
    ],
};

export const testreport_setup_action: TypeModel = {
    TypeName: "testreport_setup_action",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "operation", Type: [{ TypeName: "testreport_setup_action_operation" }] },
        { ElementName: "assert", Type: [{ TypeName: "testreport_setup_action_assert" }] },
    ],
};

export const testreport_setup_action_operation: TypeModel = {
    TypeName: "testreport_setup_action_operation",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "result", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "message", Type: [{ TypeName: "markdown" }] },
        { ElementName: "detail", Type: [{ TypeName: "uri" }] },
    ],
};

export const testreport_setup_action_assert: TypeModel = {
    TypeName: "testreport_setup_action_assert",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "result", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "message", Type: [{ TypeName: "markdown" }] },
        { ElementName: "detail", Type: [{ TypeName: "string" }] },
    ],
};

export const testreport_test: TypeModel = {
    TypeName: "testreport_test",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "action", Type: [{ TypeName: "testreport_test_action" }], IsArray: true, Required: true },
    ],
};

export const testreport_test_action: TypeModel = {
    TypeName: "testreport_test_action",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "operation", Type: [{ TypeName: "testreport_setup_action_operation" }] },
        { ElementName: "assert", Type: [{ TypeName: "testreport_setup_action_assert" }] },
    ],
};

export const testreport_teardown: TypeModel = {
    TypeName: "testreport_teardown",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "action", Type: [{ TypeName: "testreport_teardown_action" }], IsArray: true, Required: true },
    ],
};

export const testreport_teardown_action: TypeModel = {
    TypeName: "testreport_teardown_action",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "operation", Type: [{ TypeName: "testreport_setup_action_operation" }], Required: true },
    ],
};

export const TestScript: TypeModel = {
    TypeName: "TestScript",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }], Required: true },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "experimental", Type: [{ TypeName: "boolean" }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "publisher", Type: [{ TypeName: "string" }] },
        { ElementName: "contact", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "useContext", Type: [{ TypeName: "UsageContext" }], IsArray: true },
        { ElementName: "jurisdiction", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "purpose", Type: [{ TypeName: "markdown" }] },
        { ElementName: "copyright", Type: [{ TypeName: "markdown" }] },
        { ElementName: "origin", Type: [{ TypeName: "testscript_origin" }], IsArray: true },
        { ElementName: "destination", Type: [{ TypeName: "testscript_destination" }], IsArray: true },
        { ElementName: "metadata", Type: [{ TypeName: "testscript_metadata" }] },
        { ElementName: "fixture", Type: [{ TypeName: "testscript_fixture" }], IsArray: true },
        { ElementName: "profile", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "variable", Type: [{ TypeName: "testscript_variable" }], IsArray: true },
        { ElementName: "rule", Type: [{ TypeName: "testscript_rule" }], IsArray: true },
        { ElementName: "ruleset", Type: [{ TypeName: "testscript_ruleset" }], IsArray: true },
        { ElementName: "setup", Type: [{ TypeName: "testscript_setup" }] },
        { ElementName: "test", Type: [{ TypeName: "testscript_test" }], IsArray: true },
        { ElementName: "teardown", Type: [{ TypeName: "testscript_teardown" }] },
    ],
};

export const testscript_origin: TypeModel = {
    TypeName: "testscript_origin",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "index", Type: [{ TypeName: "integer" }], Required: true },
        { ElementName: "profile", Type: [{ TypeName: "Coding" }], Required: true },
    ],
};

export const testscript_destination: TypeModel = {
    TypeName: "testscript_destination",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "index", Type: [{ TypeName: "integer" }], Required: true },
        { ElementName: "profile", Type: [{ TypeName: "Coding" }], Required: true },
    ],
};

export const testscript_metadata: TypeModel = {
    TypeName: "testscript_metadata",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "link", Type: [{ TypeName: "testscript_metadata_link" }], IsArray: true },
        { ElementName: "capability", Type: [{ TypeName: "testscript_metadata_capability" }], IsArray: true, Required: true },
    ],
};

export const testscript_metadata_link: TypeModel = {
    TypeName: "testscript_metadata_link",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }], Required: true },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
    ],
};

export const testscript_metadata_capability: TypeModel = {
    TypeName: "testscript_metadata_capability",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "required", Type: [{ TypeName: "boolean" }] },
        { ElementName: "validated", Type: [{ TypeName: "boolean" }] },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "origin", Type: [{ TypeName: "integer" }], IsArray: true },
        { ElementName: "destination", Type: [{ TypeName: "integer" }] },
        { ElementName: "link", Type: [{ TypeName: "uri" }], IsArray: true },
        { ElementName: "capabilities", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CapabilityStatement"] }], Required: true },
    ],
};

export const testscript_fixture: TypeModel = {
    TypeName: "testscript_fixture",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "autocreate", Type: [{ TypeName: "boolean" }] },
        { ElementName: "autodelete", Type: [{ TypeName: "boolean" }] },
        { ElementName: "resource", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
    ],
};

export const testscript_variable: TypeModel = {
    TypeName: "testscript_variable",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "name", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "defaultValue", Type: [{ TypeName: "string" }] },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "expression", Type: [{ TypeName: "string" }] },
        { ElementName: "headerField", Type: [{ TypeName: "string" }] },
        { ElementName: "hint", Type: [{ TypeName: "string" }] },
        { ElementName: "path", Type: [{ TypeName: "string" }] },
        { ElementName: "sourceId", Type: [{ TypeName: "id" }] },
    ],
};

export const testscript_rule: TypeModel = {
    TypeName: "testscript_rule",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "resource", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], Required: true },
        { ElementName: "param", Type: [{ TypeName: "testscript_rule_param" }], IsArray: true },
    ],
};

export const testscript_rule_param: TypeModel = {
    TypeName: "testscript_rule_param",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "name", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "value", Type: [{ TypeName: "string" }] },
    ],
};

export const testscript_ruleset: TypeModel = {
    TypeName: "testscript_ruleset",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "resource", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], Required: true },
        { ElementName: "rule", Type: [{ TypeName: "testscript_ruleset_rule" }], IsArray: true, Required: true },
    ],
};

export const testscript_ruleset_rule: TypeModel = {
    TypeName: "testscript_ruleset_rule",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "ruleId", Type: [{ TypeName: "id" }], Required: true },
        { ElementName: "param", Type: [{ TypeName: "testscript_ruleset_rule_param" }], IsArray: true },
    ],
};

export const testscript_ruleset_rule_param: TypeModel = {
    TypeName: "testscript_ruleset_rule_param",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "name", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "value", Type: [{ TypeName: "string" }] },
    ],
};

export const testscript_setup: TypeModel = {
    TypeName: "testscript_setup",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "action", Type: [{ TypeName: "testscript_setup_action" }], IsArray: true, Required: true },
    ],
};

export const testscript_setup_action: TypeModel = {
    TypeName: "testscript_setup_action",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "operation", Type: [{ TypeName: "testscript_setup_action_operation" }] },
        { ElementName: "assert", Type: [{ TypeName: "testscript_setup_action_assert" }] },
    ],
};

export const testscript_setup_action_operation: TypeModel = {
    TypeName: "testscript_setup_action_operation",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "Coding" }] },
        { ElementName: "resource", Type: [{ TypeName: "code" }] },
        { ElementName: "label", Type: [{ TypeName: "string" }] },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "accept", Type: [{ TypeName: "code" }] },
        { ElementName: "contentType", Type: [{ TypeName: "code" }] },
        { ElementName: "destination", Type: [{ TypeName: "integer" }] },
        { ElementName: "encodeRequestUrl", Type: [{ TypeName: "boolean" }] },
        { ElementName: "origin", Type: [{ TypeName: "integer" }] },
        { ElementName: "params", Type: [{ TypeName: "string" }] },
        { ElementName: "requestHeader", Type: [{ TypeName: "testscript_setup_action_operation_requestHeader" }], IsArray: true },
        { ElementName: "requestId", Type: [{ TypeName: "id" }] },
        { ElementName: "responseId", Type: [{ TypeName: "id" }] },
        { ElementName: "sourceId", Type: [{ TypeName: "id" }] },
        { ElementName: "targetId", Type: [{ TypeName: "id" }] },
        { ElementName: "url", Type: [{ TypeName: "string" }] },
    ],
};

export const testscript_setup_action_operation_requestHeader: TypeModel = {
    TypeName: "testscript_setup_action_operation_requestHeader",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "field", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "value", Type: [{ TypeName: "string" }], Required: true },
    ],
};

export const testscript_setup_action_assert: TypeModel = {
    TypeName: "testscript_setup_action_assert",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "label", Type: [{ TypeName: "string" }] },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "direction", Type: [{ TypeName: "code" }] },
        { ElementName: "compareToSourceId", Type: [{ TypeName: "string" }] },
        { ElementName: "compareToSourceExpression", Type: [{ TypeName: "string" }] },
        { ElementName: "compareToSourcePath", Type: [{ TypeName: "string" }] },
        { ElementName: "contentType", Type: [{ TypeName: "code" }] },
        { ElementName: "expression", Type: [{ TypeName: "string" }] },
        { ElementName: "headerField", Type: [{ TypeName: "string" }] },
        { ElementName: "minimumId", Type: [{ TypeName: "string" }] },
        { ElementName: "navigationLinks", Type: [{ TypeName: "boolean" }] },
        { ElementName: "operator", Type: [{ TypeName: "code" }] },
        { ElementName: "path", Type: [{ TypeName: "string" }] },
        { ElementName: "requestMethod", Type: [{ TypeName: "code" }] },
        { ElementName: "requestURL", Type: [{ TypeName: "string" }] },
        { ElementName: "resource", Type: [{ TypeName: "code" }] },
        { ElementName: "response", Type: [{ TypeName: "code" }] },
        { ElementName: "responseCode", Type: [{ TypeName: "string" }] },
        { ElementName: "rule", Type: [{ TypeName: "testscript_setup_action_assert_rule" }] },
        { ElementName: "ruleset", Type: [{ TypeName: "testscript_setup_action_assert_ruleset" }] },
        { ElementName: "sourceId", Type: [{ TypeName: "id" }] },
        { ElementName: "validateProfileId", Type: [{ TypeName: "id" }] },
        { ElementName: "value", Type: [{ TypeName: "string" }] },
        { ElementName: "warningOnly", Type: [{ TypeName: "boolean" }] },
    ],
};

export const testscript_setup_action_assert_rule: TypeModel = {
    TypeName: "testscript_setup_action_assert_rule",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "ruleId", Type: [{ TypeName: "id" }], Required: true },
        { ElementName: "param", Type: [{ TypeName: "testscript_setup_action_assert_rule_param" }], IsArray: true },
    ],
};

export const testscript_setup_action_assert_rule_param: TypeModel = {
    TypeName: "testscript_setup_action_assert_rule_param",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "name", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "value", Type: [{ TypeName: "string" }], Required: true },
    ],
};

export const testscript_setup_action_assert_ruleset: TypeModel = {
    TypeName: "testscript_setup_action_assert_ruleset",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "rulesetId", Type: [{ TypeName: "id" }], Required: true },
        { ElementName: "rule", Type: [{ TypeName: "testscript_setup_action_assert_ruleset_rule" }], IsArray: true },
    ],
};

export const testscript_setup_action_assert_ruleset_rule: TypeModel = {
    TypeName: "testscript_setup_action_assert_ruleset_rule",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "ruleId", Type: [{ TypeName: "id" }], Required: true },
        { ElementName: "param", Type: [{ TypeName: "testscript_setup_action_assert_ruleset_rule_param" }], IsArray: true },
    ],
};

export const testscript_setup_action_assert_ruleset_rule_param: TypeModel = {
    TypeName: "testscript_setup_action_assert_ruleset_rule_param",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "name", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "value", Type: [{ TypeName: "string" }], Required: true },
    ],
};

export const testscript_test: TypeModel = {
    TypeName: "testscript_test",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "action", Type: [{ TypeName: "testscript_test_action" }], IsArray: true, Required: true },
    ],
};

export const testscript_test_action: TypeModel = {
    TypeName: "testscript_test_action",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "operation", Type: [{ TypeName: "testscript_setup_action_operation" }] },
        { ElementName: "assert", Type: [{ TypeName: "testscript_setup_action_assert" }] },
    ],
};

export const testscript_teardown: TypeModel = {
    TypeName: "testscript_teardown",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "action", Type: [{ TypeName: "testscript_teardown_action" }], IsArray: true, Required: true },
    ],
};

export const testscript_teardown_action: TypeModel = {
    TypeName: "testscript_teardown_action",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "operation", Type: [{ TypeName: "testscript_setup_action_operation" }], Required: true },
    ],
};

export const ValueSet: TypeModel = {
    TypeName: "ValueSet",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "experimental", Type: [{ TypeName: "boolean" }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "publisher", Type: [{ TypeName: "string" }] },
        { ElementName: "contact", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "useContext", Type: [{ TypeName: "UsageContext" }], IsArray: true },
        { ElementName: "jurisdiction", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "immutable", Type: [{ TypeName: "boolean" }] },
        { ElementName: "purpose", Type: [{ TypeName: "markdown" }] },
        { ElementName: "copyright", Type: [{ TypeName: "markdown" }] },
        { ElementName: "extensible", Type: [{ TypeName: "boolean" }] },
        { ElementName: "compose", Type: [{ TypeName: "valueset_compose" }] },
        { ElementName: "expansion", Type: [{ TypeName: "valueset_expansion" }] },
    ],
};

export const valueset_compose: TypeModel = {
    TypeName: "valueset_compose",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "lockedDate", Type: [{ TypeName: "date" }] },
        { ElementName: "inactive", Type: [{ TypeName: "boolean" }] },
        { ElementName: "include", Type: [{ TypeName: "valueset_compose_include" }], IsArray: true, Required: true },
        { ElementName: "exclude", Type: [{ TypeName: "valueset_compose_include" }], IsArray: true },
    ],
};

export const valueset_compose_include: TypeModel = {
    TypeName: "valueset_compose_include",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "system", Type: [{ TypeName: "uri" }] },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "concept", Type: [{ TypeName: "valueset_compose_include_concept" }], IsArray: true },
        { ElementName: "filter", Type: [{ TypeName: "valueset_compose_include_filter" }], IsArray: true },
        { ElementName: "valueSet", Type: [{ TypeName: "uri" }], IsArray: true },
    ],
};

export const valueset_compose_include_concept: TypeModel = {
    TypeName: "valueset_compose_include_concept",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "display", Type: [{ TypeName: "string" }] },
        { ElementName: "designation", Type: [{ TypeName: "valueset_compose_include_concept_designation" }], IsArray: true },
    ],
};

export const valueset_compose_include_concept_designation: TypeModel = {
    TypeName: "valueset_compose_include_concept_designation",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "language", Type: [{ TypeName: "code" }] },
        { ElementName: "use", Type: [{ TypeName: "Coding" }] },
        { ElementName: "value", Type: [{ TypeName: "string" }], Required: true },
    ],
};

export const valueset_compose_include_filter: TypeModel = {
    TypeName: "valueset_compose_include_filter",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "property", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "op", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "value", Type: [{ TypeName: "code" }], Required: true },
    ],
};

export const valueset_expansion: TypeModel = {
    TypeName: "valueset_expansion",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "uri" }], Required: true },
        { ElementName: "timestamp", Type: [{ TypeName: "dateTime" }], Required: true },
        { ElementName: "total", Type: [{ TypeName: "integer" }] },
        { ElementName: "offset", Type: [{ TypeName: "integer" }] },
        { ElementName: "parameter", Type: [{ TypeName: "valueset_expansion_parameter" }], IsArray: true },
        { ElementName: "contains", Type: [{ TypeName: "valueset_expansion_contains" }], IsArray: true },
    ],
};

export const valueset_expansion_parameter: TypeModel = {
    TypeName: "valueset_expansion_parameter",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "name", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "boolean" }, { TypeName: "code" }, { TypeName: "decimal" }, { TypeName: "integer" }, { TypeName: "string" }, { TypeName: "uri" }] },
    ],
};

export const valueset_expansion_contains: TypeModel = {
    TypeName: "valueset_expansion_contains",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "system", Type: [{ TypeName: "uri" }] },
        { ElementName: "abstract", Type: [{ TypeName: "boolean" }] },
        { ElementName: "inactive", Type: [{ TypeName: "boolean" }] },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "code", Type: [{ TypeName: "code" }] },
        { ElementName: "display", Type: [{ TypeName: "string" }] },
        { ElementName: "designation", Type: [{ TypeName: "valueset_compose_include_concept_designation" }], IsArray: true },
        { ElementName: "contains", Type: [{ TypeName: "valueset_expansion_contains" }], IsArray: true },
    ],
};

export const VisionPrescription: TypeModel = {
    TypeName: "VisionPrescription",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }] },
        { ElementName: "patient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }] },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "dateWritten", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "prescriber", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }] },
        { ElementName: "reason[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Condition"] }] },
        { ElementName: "dispense", Type: [{ TypeName: "visionprescription_dispense" }], IsArray: true },
    ],
};

export const visionprescription_dispense: TypeModel = {
    TypeName: "visionprescription_dispense",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "product", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "eye", Type: [{ TypeName: "code" }] },
        { ElementName: "sphere", Type: [{ TypeName: "decimal" }] },
        { ElementName: "cylinder", Type: [{ TypeName: "decimal" }] },
        { ElementName: "axis", Type: [{ TypeName: "integer" }] },
        { ElementName: "prism", Type: [{ TypeName: "decimal" }] },
        { ElementName: "base", Type: [{ TypeName: "code" }] },
        { ElementName: "add", Type: [{ TypeName: "decimal" }] },
        { ElementName: "power", Type: [{ TypeName: "decimal" }] },
        { ElementName: "backCurve", Type: [{ TypeName: "decimal" }] },
        { ElementName: "diameter", Type: [{ TypeName: "decimal" }] },
        { ElementName: "duration", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "color", Type: [{ TypeName: "string" }] },
        { ElementName: "brand", Type: [{ TypeName: "string" }] },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
    ],
};
