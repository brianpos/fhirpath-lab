// THIS FILE IS GENERATED — DO NOT EDIT BY HAND.
// Run `npm run generate:models -- --version <r4|r4b|r5|r6>` to regenerate.
// See docs/custom-model-generator-plan.md.

import type { TypeModel } from "../../../custom_model";

// FHIR resources (with their backbone elements)

export const Account: TypeModel = {
    TypeName: "Account",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }], IsArray: true },
        { ElementName: "servicePeriod", Type: [{ TypeName: "Period" }] },
        { ElementName: "coverage", Type: [{ TypeName: "account_coverage" }], IsArray: true },
        { ElementName: "owner", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "guarantor", Type: [{ TypeName: "account_guarantor" }], IsArray: true },
        { ElementName: "partOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Account"] }] },
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
        { ElementName: "party", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
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
        { ElementName: "subtitle", Type: [{ TypeName: "string" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "experimental", Type: [{ TypeName: "boolean" }] },
        { ElementName: "subject[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "publisher", Type: [{ TypeName: "string" }] },
        { ElementName: "contact", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "useContext", Type: [{ TypeName: "UsageContext" }], IsArray: true },
        { ElementName: "jurisdiction", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "purpose", Type: [{ TypeName: "markdown" }] },
        { ElementName: "usage", Type: [{ TypeName: "string" }] },
        { ElementName: "copyright", Type: [{ TypeName: "markdown" }] },
        { ElementName: "approvalDate", Type: [{ TypeName: "date" }] },
        { ElementName: "lastReviewDate", Type: [{ TypeName: "date" }] },
        { ElementName: "effectivePeriod", Type: [{ TypeName: "Period" }] },
        { ElementName: "topic", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "author", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "editor", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "reviewer", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "endorser", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "relatedArtifact", Type: [{ TypeName: "RelatedArtifact" }], IsArray: true },
        { ElementName: "library", Type: [{ TypeName: "canonical" }], IsArray: true },
        { ElementName: "kind", Type: [{ TypeName: "code" }] },
        { ElementName: "profile", Type: [{ TypeName: "canonical" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "intent", Type: [{ TypeName: "code" }] },
        { ElementName: "priority", Type: [{ TypeName: "code" }] },
        { ElementName: "doNotPerform", Type: [{ TypeName: "boolean" }] },
        { ElementName: "timing[x]", Type: [{ TypeName: "Age" }, { TypeName: "Duration" }, { TypeName: "Period" }, { TypeName: "Range" }, { TypeName: "Timing" }, { TypeName: "dateTime" }] },
        { ElementName: "location", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "participant", Type: [{ TypeName: "activitydefinition_participant" }], IsArray: true },
        { ElementName: "product[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Medication", "http://hl7.org/fhir/StructureDefinition/Substance"] }] },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "dosage", Type: [{ TypeName: "Dosage" }], IsArray: true },
        { ElementName: "bodySite", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "specimenRequirement", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/SpecimenDefinition"] }], IsArray: true },
        { ElementName: "observationRequirement", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ObservationDefinition"] }], IsArray: true },
        { ElementName: "observationResultRequirement", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ObservationDefinition"] }], IsArray: true },
        { ElementName: "transform", Type: [{ TypeName: "canonical" }] },
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
        { ElementName: "path", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "expression", Type: [{ TypeName: "Expression" }], Required: true },
    ],
};

export const AdverseEvent: TypeModel = {
    TypeName: "AdverseEvent",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "actuality", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "event", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "detected", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "recordedDate", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "resultingCondition", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Condition"] }], IsArray: true },
        { ElementName: "location", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "seriousness", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "severity", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "outcome", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "recorder", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "contributor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }], IsArray: true },
        { ElementName: "suspectEntity", Type: [{ TypeName: "adverseevent_suspectEntity" }], IsArray: true },
        { ElementName: "subjectMedicalHistory", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/AllergyIntolerance", "http://hl7.org/fhir/StructureDefinition/Condition", "http://hl7.org/fhir/StructureDefinition/DocumentReference", "http://hl7.org/fhir/StructureDefinition/FamilyMemberHistory", "http://hl7.org/fhir/StructureDefinition/Immunization", "http://hl7.org/fhir/StructureDefinition/Media", "http://hl7.org/fhir/StructureDefinition/Observation", "http://hl7.org/fhir/StructureDefinition/Procedure"] }], IsArray: true },
        { ElementName: "referenceDocument", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DocumentReference"] }], IsArray: true },
        { ElementName: "study", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ResearchStudy"] }], IsArray: true },
    ],
};

export const adverseevent_suspectEntity: TypeModel = {
    TypeName: "adverseevent_suspectEntity",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "instance", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Immunization", "http://hl7.org/fhir/StructureDefinition/Medication", "http://hl7.org/fhir/StructureDefinition/MedicationAdministration", "http://hl7.org/fhir/StructureDefinition/MedicationStatement", "http://hl7.org/fhir/StructureDefinition/Procedure", "http://hl7.org/fhir/StructureDefinition/Substance"] }], Required: true },
        { ElementName: "causality", Type: [{ TypeName: "adverseevent_suspectEntity_causality" }], IsArray: true },
    ],
};

export const adverseevent_suspectEntity_causality: TypeModel = {
    TypeName: "adverseevent_suspectEntity_causality",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "assessment", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "productRelatedness", Type: [{ TypeName: "string" }] },
        { ElementName: "author", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "method", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const AllergyIntolerance: TypeModel = {
    TypeName: "AllergyIntolerance",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "clinicalStatus", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "verificationStatus", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "type", Type: [{ TypeName: "code" }] },
        { ElementName: "category", Type: [{ TypeName: "code" }], IsArray: true },
        { ElementName: "criticality", Type: [{ TypeName: "code" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "patient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "onset[x]", Type: [{ TypeName: "Age" }, { TypeName: "Period" }, { TypeName: "Range" }, { TypeName: "dateTime" }, { TypeName: "string" }] },
        { ElementName: "recordedDate", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "recorder", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "asserter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
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
        { ElementName: "cancelationReason", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "serviceCategory", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "serviceType", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "specialty", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "appointmentType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "reasonCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "reasonReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Condition", "http://hl7.org/fhir/StructureDefinition/ImmunizationRecommendation", "http://hl7.org/fhir/StructureDefinition/Observation", "http://hl7.org/fhir/StructureDefinition/Procedure"] }], IsArray: true },
        { ElementName: "priority", Type: [{ TypeName: "unsignedInt" }] },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "supportingInformation", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "start", Type: [{ TypeName: "instant" }] },
        { ElementName: "end", Type: [{ TypeName: "instant" }] },
        { ElementName: "minutesDuration", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "slot", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Slot"] }], IsArray: true },
        { ElementName: "created", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "comment", Type: [{ TypeName: "string" }] },
        { ElementName: "patientInstruction", Type: [{ TypeName: "string" }] },
        { ElementName: "basedOn", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ServiceRequest"] }], IsArray: true },
        { ElementName: "participant", Type: [{ TypeName: "appointment_participant" }], IsArray: true, Required: true },
        { ElementName: "requestedPeriod", Type: [{ TypeName: "Period" }], IsArray: true },
    ],
};

export const appointment_participant: TypeModel = {
    TypeName: "appointment_participant",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "actor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "required", Type: [{ TypeName: "code" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
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
        { ElementName: "actor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
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
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
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
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "who", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
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
        { ElementName: "observer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "Coding" }], IsArray: true },
    ],
};

export const auditevent_entity: TypeModel = {
    TypeName: "auditevent_entity",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "what", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
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
        { ElementName: "value[x]", Type: [{ TypeName: "base64Binary" }, { TypeName: "string" }], Required: true },
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
        { ElementName: "author", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
    ],
};

export const Binary: TypeModel = {
    TypeName: "Binary",
    BaseTypeName: "Resource",
    Elements: [
        { ElementName: "contentType", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "securityContext", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
        { ElementName: "data", Type: [{ TypeName: "base64Binary" }] },
    ],
};

export const BiologicallyDerivedProduct: TypeModel = {
    TypeName: "BiologicallyDerivedProduct",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "productCategory", Type: [{ TypeName: "code" }] },
        { ElementName: "productCode", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }] },
        { ElementName: "request", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ServiceRequest"] }], IsArray: true },
        { ElementName: "quantity", Type: [{ TypeName: "integer" }] },
        { ElementName: "parent", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/BiologicallyDerivedProduct"] }], IsArray: true },
        { ElementName: "collection", Type: [{ TypeName: "biologicallyderivedproduct_collection" }] },
        { ElementName: "processing", Type: [{ TypeName: "biologicallyderivedproduct_processing" }], IsArray: true },
        { ElementName: "manipulation", Type: [{ TypeName: "biologicallyderivedproduct_manipulation" }] },
        { ElementName: "storage", Type: [{ TypeName: "biologicallyderivedproduct_storage" }], IsArray: true },
    ],
};

export const biologicallyderivedproduct_collection: TypeModel = {
    TypeName: "biologicallyderivedproduct_collection",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "collector", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "source", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient"] }] },
        { ElementName: "collected[x]", Type: [{ TypeName: "Period" }, { TypeName: "dateTime" }] },
    ],
};

export const biologicallyderivedproduct_processing: TypeModel = {
    TypeName: "biologicallyderivedproduct_processing",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "procedure", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "additive", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Substance"] }] },
        { ElementName: "time[x]", Type: [{ TypeName: "Period" }, { TypeName: "dateTime" }] },
    ],
};

export const biologicallyderivedproduct_manipulation: TypeModel = {
    TypeName: "biologicallyderivedproduct_manipulation",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "time[x]", Type: [{ TypeName: "Period" }, { TypeName: "dateTime" }] },
    ],
};

export const biologicallyderivedproduct_storage: TypeModel = {
    TypeName: "biologicallyderivedproduct_storage",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "temperature", Type: [{ TypeName: "decimal" }] },
        { ElementName: "scale", Type: [{ TypeName: "code" }] },
        { ElementName: "duration", Type: [{ TypeName: "Period" }] },
    ],
};

export const BodyStructure: TypeModel = {
    TypeName: "BodyStructure",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "active", Type: [{ TypeName: "boolean" }] },
        { ElementName: "morphology", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "location", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "locationQualifier", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
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
        { ElementName: "timestamp", Type: [{ TypeName: "instant" }] },
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
        { ElementName: "instantiates", Type: [{ TypeName: "canonical" }], IsArray: true },
        { ElementName: "imports", Type: [{ TypeName: "canonical" }], IsArray: true },
        { ElementName: "software", Type: [{ TypeName: "capabilitystatement_software" }] },
        { ElementName: "implementation", Type: [{ TypeName: "capabilitystatement_implementation" }] },
        { ElementName: "fhirVersion", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "format", Type: [{ TypeName: "code" }], IsArray: true, Required: true },
        { ElementName: "patchFormat", Type: [{ TypeName: "code" }], IsArray: true },
        { ElementName: "implementationGuide", Type: [{ TypeName: "canonical" }], IsArray: true },
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
        { ElementName: "url", Type: [{ TypeName: "url" }] },
        { ElementName: "custodian", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
    ],
};

export const capabilitystatement_rest: TypeModel = {
    TypeName: "capabilitystatement_rest",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "mode", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "documentation", Type: [{ TypeName: "markdown" }] },
        { ElementName: "security", Type: [{ TypeName: "capabilitystatement_rest_security" }] },
        { ElementName: "resource", Type: [{ TypeName: "capabilitystatement_rest_resource" }], IsArray: true },
        { ElementName: "interaction", Type: [{ TypeName: "capabilitystatement_rest_interaction" }], IsArray: true },
        { ElementName: "searchParam", Type: [{ TypeName: "capabilitystatement_rest_resource_searchParam" }], IsArray: true },
        { ElementName: "operation", Type: [{ TypeName: "capabilitystatement_rest_resource_operation" }], IsArray: true },
        { ElementName: "compartment", Type: [{ TypeName: "canonical" }], IsArray: true },
    ],
};

export const capabilitystatement_rest_security: TypeModel = {
    TypeName: "capabilitystatement_rest_security",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "cors", Type: [{ TypeName: "boolean" }] },
        { ElementName: "service", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
    ],
};

export const capabilitystatement_rest_resource: TypeModel = {
    TypeName: "capabilitystatement_rest_resource",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "profile", Type: [{ TypeName: "canonical" }] },
        { ElementName: "supportedProfile", Type: [{ TypeName: "canonical" }], IsArray: true },
        { ElementName: "documentation", Type: [{ TypeName: "markdown" }] },
        { ElementName: "interaction", Type: [{ TypeName: "capabilitystatement_rest_resource_interaction" }], IsArray: true },
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
        { ElementName: "operation", Type: [{ TypeName: "capabilitystatement_rest_resource_operation" }], IsArray: true },
    ],
};

export const capabilitystatement_rest_resource_interaction: TypeModel = {
    TypeName: "capabilitystatement_rest_resource_interaction",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "documentation", Type: [{ TypeName: "markdown" }] },
    ],
};

export const capabilitystatement_rest_resource_searchParam: TypeModel = {
    TypeName: "capabilitystatement_rest_resource_searchParam",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "name", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "definition", Type: [{ TypeName: "canonical" }] },
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "documentation", Type: [{ TypeName: "markdown" }] },
    ],
};

export const capabilitystatement_rest_resource_operation: TypeModel = {
    TypeName: "capabilitystatement_rest_resource_operation",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "name", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "definition", Type: [{ TypeName: "canonical" }], Required: true },
        { ElementName: "documentation", Type: [{ TypeName: "markdown" }] },
    ],
};

export const capabilitystatement_rest_interaction: TypeModel = {
    TypeName: "capabilitystatement_rest_interaction",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "documentation", Type: [{ TypeName: "markdown" }] },
    ],
};

export const capabilitystatement_messaging: TypeModel = {
    TypeName: "capabilitystatement_messaging",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "endpoint", Type: [{ TypeName: "capabilitystatement_messaging_endpoint" }], IsArray: true },
        { ElementName: "reliableCache", Type: [{ TypeName: "unsignedInt" }] },
        { ElementName: "documentation", Type: [{ TypeName: "markdown" }] },
        { ElementName: "supportedMessage", Type: [{ TypeName: "capabilitystatement_messaging_supportedMessage" }], IsArray: true },
    ],
};

export const capabilitystatement_messaging_endpoint: TypeModel = {
    TypeName: "capabilitystatement_messaging_endpoint",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "protocol", Type: [{ TypeName: "Coding" }], Required: true },
        { ElementName: "address", Type: [{ TypeName: "url" }], Required: true },
    ],
};

export const capabilitystatement_messaging_supportedMessage: TypeModel = {
    TypeName: "capabilitystatement_messaging_supportedMessage",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "mode", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "definition", Type: [{ TypeName: "canonical" }], Required: true },
    ],
};

export const capabilitystatement_document: TypeModel = {
    TypeName: "capabilitystatement_document",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "mode", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "documentation", Type: [{ TypeName: "markdown" }] },
        { ElementName: "profile", Type: [{ TypeName: "canonical" }], Required: true },
    ],
};

export const CarePlan: TypeModel = {
    TypeName: "CarePlan",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "instantiatesCanonical", Type: [{ TypeName: "canonical" }], IsArray: true },
        { ElementName: "instantiatesUri", Type: [{ TypeName: "uri" }], IsArray: true },
        { ElementName: "basedOn", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CarePlan"] }], IsArray: true },
        { ElementName: "replaces", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CarePlan"] }], IsArray: true },
        { ElementName: "partOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CarePlan"] }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "intent", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "created", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "author", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "contributor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], IsArray: true },
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
        { ElementName: "reference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Appointment", "http://hl7.org/fhir/StructureDefinition/CommunicationRequest", "http://hl7.org/fhir/StructureDefinition/DeviceRequest", "http://hl7.org/fhir/StructureDefinition/MedicationRequest", "http://hl7.org/fhir/StructureDefinition/NutritionOrder", "http://hl7.org/fhir/StructureDefinition/RequestGroup", "http://hl7.org/fhir/StructureDefinition/ServiceRequest", "http://hl7.org/fhir/StructureDefinition/Task", "http://hl7.org/fhir/StructureDefinition/VisionPrescription"] }] },
        { ElementName: "detail", Type: [{ TypeName: "careplan_activity_detail" }] },
    ],
};

export const careplan_activity_detail: TypeModel = {
    TypeName: "careplan_activity_detail",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "kind", Type: [{ TypeName: "code" }] },
        { ElementName: "instantiatesCanonical", Type: [{ TypeName: "canonical" }], IsArray: true },
        { ElementName: "instantiatesUri", Type: [{ TypeName: "uri" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "reasonCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "reasonReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Condition", "http://hl7.org/fhir/StructureDefinition/DiagnosticReport", "http://hl7.org/fhir/StructureDefinition/DocumentReference", "http://hl7.org/fhir/StructureDefinition/Observation"] }], IsArray: true },
        { ElementName: "goal", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Goal"] }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "statusReason", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "doNotPerform", Type: [{ TypeName: "boolean" }] },
        { ElementName: "scheduled[x]", Type: [{ TypeName: "Period" }, { TypeName: "Timing" }, { TypeName: "string" }] },
        { ElementName: "location", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "performer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], IsArray: true },
        { ElementName: "product[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Medication", "http://hl7.org/fhir/StructureDefinition/Substance"] }] },
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
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Patient"] }] },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "participant", Type: [{ TypeName: "careteam_participant" }], IsArray: true },
        { ElementName: "reasonCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "reasonReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Condition"] }], IsArray: true },
        { ElementName: "managingOrganization", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }], IsArray: true },
        { ElementName: "telecom", Type: [{ TypeName: "ContactPoint" }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
    ],
};

export const careteam_participant: TypeModel = {
    TypeName: "careteam_participant",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "member", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "onBehalfOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
    ],
};

export const CatalogEntry: TypeModel = {
    TypeName: "CatalogEntry",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "orderable", Type: [{ TypeName: "boolean" }], Required: true },
        { ElementName: "referencedItem", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ActivityDefinition", "http://hl7.org/fhir/StructureDefinition/Binary", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Medication", "http://hl7.org/fhir/StructureDefinition/ObservationDefinition", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/PlanDefinition", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/SpecimenDefinition"] }], Required: true },
        { ElementName: "additionalIdentifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "classification", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }] },
        { ElementName: "validityPeriod", Type: [{ TypeName: "Period" }] },
        { ElementName: "validTo", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "lastUpdated", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "additionalCharacteristic", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "additionalClassification", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "relatedEntry", Type: [{ TypeName: "catalogentry_relatedEntry" }], IsArray: true },
    ],
};

export const catalogentry_relatedEntry: TypeModel = {
    TypeName: "catalogentry_relatedEntry",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "relationtype", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "item", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CatalogEntry"] }], Required: true },
    ],
};

export const ChargeItem: TypeModel = {
    TypeName: "ChargeItem",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "definitionUri", Type: [{ TypeName: "uri" }], IsArray: true },
        { ElementName: "definitionCanonical", Type: [{ TypeName: "canonical" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "partOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ChargeItem"] }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
        { ElementName: "context", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter", "http://hl7.org/fhir/StructureDefinition/EpisodeOfCare"] }] },
        { ElementName: "occurrence[x]", Type: [{ TypeName: "Period" }, { TypeName: "Timing" }, { TypeName: "dateTime" }] },
        { ElementName: "performer", Type: [{ TypeName: "chargeitem_performer" }], IsArray: true },
        { ElementName: "performingOrganization", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "requestingOrganization", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "costCenter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "bodysite", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "factorOverride", Type: [{ TypeName: "decimal" }] },
        { ElementName: "priceOverride", Type: [{ TypeName: "Money" }] },
        { ElementName: "overrideReason", Type: [{ TypeName: "string" }] },
        { ElementName: "enterer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "enteredDate", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "reason", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "service", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DiagnosticReport", "http://hl7.org/fhir/StructureDefinition/ImagingStudy", "http://hl7.org/fhir/StructureDefinition/Immunization", "http://hl7.org/fhir/StructureDefinition/MedicationAdministration", "http://hl7.org/fhir/StructureDefinition/MedicationDispense", "http://hl7.org/fhir/StructureDefinition/Observation", "http://hl7.org/fhir/StructureDefinition/Procedure", "http://hl7.org/fhir/StructureDefinition/SupplyDelivery"] }], IsArray: true },
        { ElementName: "product[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Medication", "http://hl7.org/fhir/StructureDefinition/Substance"] }] },
        { ElementName: "account", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Account"] }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "supportingInformation", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
    ],
};

export const chargeitem_performer: TypeModel = {
    TypeName: "chargeitem_performer",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "function", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "actor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
    ],
};

export const ChargeItemDefinition: TypeModel = {
    TypeName: "ChargeItemDefinition",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }], Required: true },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "derivedFromUri", Type: [{ TypeName: "uri" }], IsArray: true },
        { ElementName: "partOf", Type: [{ TypeName: "canonical" }], IsArray: true },
        { ElementName: "replaces", Type: [{ TypeName: "canonical" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "experimental", Type: [{ TypeName: "boolean" }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "publisher", Type: [{ TypeName: "string" }] },
        { ElementName: "contact", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "useContext", Type: [{ TypeName: "UsageContext" }], IsArray: true },
        { ElementName: "jurisdiction", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "copyright", Type: [{ TypeName: "markdown" }] },
        { ElementName: "approvalDate", Type: [{ TypeName: "date" }] },
        { ElementName: "lastReviewDate", Type: [{ TypeName: "date" }] },
        { ElementName: "effectivePeriod", Type: [{ TypeName: "Period" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "instance", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Medication", "http://hl7.org/fhir/StructureDefinition/Substance"] }], IsArray: true },
        { ElementName: "applicability", Type: [{ TypeName: "chargeitemdefinition_applicability" }], IsArray: true },
        { ElementName: "propertyGroup", Type: [{ TypeName: "chargeitemdefinition_propertyGroup" }], IsArray: true },
    ],
};

export const chargeitemdefinition_applicability: TypeModel = {
    TypeName: "chargeitemdefinition_applicability",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "language", Type: [{ TypeName: "string" }] },
        { ElementName: "expression", Type: [{ TypeName: "string" }] },
    ],
};

export const chargeitemdefinition_propertyGroup: TypeModel = {
    TypeName: "chargeitemdefinition_propertyGroup",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "applicability", Type: [{ TypeName: "chargeitemdefinition_applicability" }], IsArray: true },
        { ElementName: "priceComponent", Type: [{ TypeName: "chargeitemdefinition_propertyGroup_priceComponent" }], IsArray: true },
    ],
};

export const chargeitemdefinition_propertyGroup_priceComponent: TypeModel = {
    TypeName: "chargeitemdefinition_propertyGroup_priceComponent",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "factor", Type: [{ TypeName: "decimal" }] },
        { ElementName: "amount", Type: [{ TypeName: "Money" }] },
    ],
};

export const Claim: TypeModel = {
    TypeName: "Claim",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "subType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "use", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "patient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
        { ElementName: "billablePeriod", Type: [{ TypeName: "Period" }] },
        { ElementName: "created", Type: [{ TypeName: "dateTime" }], Required: true },
        { ElementName: "enterer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "insurer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "provider", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }], Required: true },
        { ElementName: "priority", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "fundsReserve", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "related", Type: [{ TypeName: "claim_related" }], IsArray: true },
        { ElementName: "prescription", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DeviceRequest", "http://hl7.org/fhir/StructureDefinition/MedicationRequest", "http://hl7.org/fhir/StructureDefinition/VisionPrescription"] }] },
        { ElementName: "originalPrescription", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DeviceRequest", "http://hl7.org/fhir/StructureDefinition/MedicationRequest", "http://hl7.org/fhir/StructureDefinition/VisionPrescription"] }] },
        { ElementName: "payee", Type: [{ TypeName: "claim_payee" }] },
        { ElementName: "referral", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ServiceRequest"] }] },
        { ElementName: "facility", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "careTeam", Type: [{ TypeName: "claim_careTeam" }], IsArray: true },
        { ElementName: "supportingInfo", Type: [{ TypeName: "claim_supportingInfo" }], IsArray: true },
        { ElementName: "diagnosis", Type: [{ TypeName: "claim_diagnosis" }], IsArray: true },
        { ElementName: "procedure", Type: [{ TypeName: "claim_procedure" }], IsArray: true },
        { ElementName: "insurance", Type: [{ TypeName: "claim_insurance" }], IsArray: true, Required: true },
        { ElementName: "accident", Type: [{ TypeName: "claim_accident" }] },
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
        { ElementName: "party", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
    ],
};

export const claim_careTeam: TypeModel = {
    TypeName: "claim_careTeam",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "sequence", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "provider", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }], Required: true },
        { ElementName: "responsible", Type: [{ TypeName: "boolean" }] },
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "qualification", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const claim_supportingInfo: TypeModel = {
    TypeName: "claim_supportingInfo",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "sequence", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "timing[x]", Type: [{ TypeName: "Period" }, { TypeName: "date" }] },
        { ElementName: "value[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "Quantity" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }, { TypeName: "boolean" }, { TypeName: "string" }] },
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
        { ElementName: "onAdmission", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "packageCode", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const claim_procedure: TypeModel = {
    TypeName: "claim_procedure",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "sequence", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "procedure[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Procedure"] }], Required: true },
        { ElementName: "udi", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }], IsArray: true },
    ],
};

export const claim_insurance: TypeModel = {
    TypeName: "claim_insurance",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "sequence", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "focal", Type: [{ TypeName: "boolean" }], Required: true },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
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
        { ElementName: "careTeamSequence", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "diagnosisSequence", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "procedureSequence", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "informationSequence", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "revenue", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "productOrService", Type: [{ TypeName: "CodeableConcept" }], Required: true },
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
        { ElementName: "productOrService", Type: [{ TypeName: "CodeableConcept" }], Required: true },
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
        { ElementName: "productOrService", Type: [{ TypeName: "CodeableConcept" }], Required: true },
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
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "subType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "use", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "patient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
        { ElementName: "created", Type: [{ TypeName: "dateTime" }], Required: true },
        { ElementName: "insurer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }], Required: true },
        { ElementName: "requestor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "request", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Claim"] }] },
        { ElementName: "outcome", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "disposition", Type: [{ TypeName: "string" }] },
        { ElementName: "preAuthRef", Type: [{ TypeName: "string" }] },
        { ElementName: "preAuthPeriod", Type: [{ TypeName: "Period" }] },
        { ElementName: "payeeType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "item", Type: [{ TypeName: "claimresponse_item" }], IsArray: true },
        { ElementName: "addItem", Type: [{ TypeName: "claimresponse_addItem" }], IsArray: true },
        { ElementName: "adjudication", Type: [{ TypeName: "claimresponse_item_adjudication" }], IsArray: true },
        { ElementName: "total", Type: [{ TypeName: "claimresponse_total" }], IsArray: true },
        { ElementName: "payment", Type: [{ TypeName: "claimresponse_payment" }] },
        { ElementName: "fundsReserve", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "formCode", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "form", Type: [{ TypeName: "Attachment" }] },
        { ElementName: "processNote", Type: [{ TypeName: "claimresponse_processNote" }], IsArray: true },
        { ElementName: "communicationRequest", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CommunicationRequest"] }], IsArray: true },
        { ElementName: "insurance", Type: [{ TypeName: "claimresponse_insurance" }], IsArray: true },
        { ElementName: "error", Type: [{ TypeName: "claimresponse_error" }], IsArray: true },
    ],
};

export const claimresponse_item: TypeModel = {
    TypeName: "claimresponse_item",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "itemSequence", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "noteNumber", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "adjudication", Type: [{ TypeName: "claimresponse_item_adjudication" }], IsArray: true, Required: true },
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
        { ElementName: "detailSequence", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "noteNumber", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "adjudication", Type: [{ TypeName: "claimresponse_item_adjudication" }], IsArray: true, Required: true },
        { ElementName: "subDetail", Type: [{ TypeName: "claimresponse_item_detail_subDetail" }], IsArray: true },
    ],
};

export const claimresponse_item_detail_subDetail: TypeModel = {
    TypeName: "claimresponse_item_detail_subDetail",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "subDetailSequence", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "noteNumber", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "adjudication", Type: [{ TypeName: "claimresponse_item_adjudication" }], IsArray: true },
    ],
};

export const claimresponse_addItem: TypeModel = {
    TypeName: "claimresponse_addItem",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "itemSequence", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "detailSequence", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "subdetailSequence", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "provider", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }], IsArray: true },
        { ElementName: "productOrService", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "modifier", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "programCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "serviced[x]", Type: [{ TypeName: "Period" }, { TypeName: "date" }] },
        { ElementName: "location[x]", Type: [{ TypeName: "Address" }, { TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "unitPrice", Type: [{ TypeName: "Money" }] },
        { ElementName: "factor", Type: [{ TypeName: "decimal" }] },
        { ElementName: "net", Type: [{ TypeName: "Money" }] },
        { ElementName: "bodySite", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "subSite", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "noteNumber", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "adjudication", Type: [{ TypeName: "claimresponse_item_adjudication" }], IsArray: true, Required: true },
        { ElementName: "detail", Type: [{ TypeName: "claimresponse_addItem_detail" }], IsArray: true },
    ],
};

export const claimresponse_addItem_detail: TypeModel = {
    TypeName: "claimresponse_addItem_detail",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "productOrService", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "modifier", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "unitPrice", Type: [{ TypeName: "Money" }] },
        { ElementName: "factor", Type: [{ TypeName: "decimal" }] },
        { ElementName: "net", Type: [{ TypeName: "Money" }] },
        { ElementName: "noteNumber", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "adjudication", Type: [{ TypeName: "claimresponse_item_adjudication" }], IsArray: true, Required: true },
        { ElementName: "subDetail", Type: [{ TypeName: "claimresponse_addItem_detail_subDetail" }], IsArray: true },
    ],
};

export const claimresponse_addItem_detail_subDetail: TypeModel = {
    TypeName: "claimresponse_addItem_detail_subDetail",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "productOrService", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "modifier", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "unitPrice", Type: [{ TypeName: "Money" }] },
        { ElementName: "factor", Type: [{ TypeName: "decimal" }] },
        { ElementName: "net", Type: [{ TypeName: "Money" }] },
        { ElementName: "noteNumber", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "adjudication", Type: [{ TypeName: "claimresponse_item_adjudication" }], IsArray: true, Required: true },
    ],
};

export const claimresponse_total: TypeModel = {
    TypeName: "claimresponse_total",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "amount", Type: [{ TypeName: "Money" }], Required: true },
    ],
};

export const claimresponse_payment: TypeModel = {
    TypeName: "claimresponse_payment",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "adjustment", Type: [{ TypeName: "Money" }] },
        { ElementName: "adjustmentReason", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "date", Type: [{ TypeName: "date" }] },
        { ElementName: "amount", Type: [{ TypeName: "Money" }], Required: true },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
    ],
};

export const claimresponse_processNote: TypeModel = {
    TypeName: "claimresponse_processNote",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "number", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "type", Type: [{ TypeName: "code" }] },
        { ElementName: "text", Type: [{ TypeName: "string" }], Required: true },
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
        { ElementName: "claimResponse", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ClaimResponse"] }] },
    ],
};

export const claimresponse_error: TypeModel = {
    TypeName: "claimresponse_error",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "itemSequence", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "detailSequence", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "subDetailSequence", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
    ],
};

export const ClinicalImpression: TypeModel = {
    TypeName: "ClinicalImpression",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "statusReason", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "effective[x]", Type: [{ TypeName: "Period" }, { TypeName: "dateTime" }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "assessor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "previous", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ClinicalImpression"] }] },
        { ElementName: "problem", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/AllergyIntolerance", "http://hl7.org/fhir/StructureDefinition/Condition"] }], IsArray: true },
        { ElementName: "investigation", Type: [{ TypeName: "clinicalimpression_investigation" }], IsArray: true },
        { ElementName: "protocol", Type: [{ TypeName: "uri" }], IsArray: true },
        { ElementName: "summary", Type: [{ TypeName: "string" }] },
        { ElementName: "finding", Type: [{ TypeName: "clinicalimpression_finding" }], IsArray: true },
        { ElementName: "prognosisCodeableConcept", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "prognosisReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RiskAssessment"] }], IsArray: true },
        { ElementName: "supportingInfo", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
    ],
};

export const clinicalimpression_investigation: TypeModel = {
    TypeName: "clinicalimpression_investigation",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "item", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DiagnosticReport", "http://hl7.org/fhir/StructureDefinition/FamilyMemberHistory", "http://hl7.org/fhir/StructureDefinition/ImagingStudy", "http://hl7.org/fhir/StructureDefinition/Media", "http://hl7.org/fhir/StructureDefinition/Observation", "http://hl7.org/fhir/StructureDefinition/QuestionnaireResponse", "http://hl7.org/fhir/StructureDefinition/RiskAssessment"] }], IsArray: true },
    ],
};

export const clinicalimpression_finding: TypeModel = {
    TypeName: "clinicalimpression_finding",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "itemCodeableConcept", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "itemReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Condition", "http://hl7.org/fhir/StructureDefinition/Media", "http://hl7.org/fhir/StructureDefinition/Observation"] }] },
        { ElementName: "basis", Type: [{ TypeName: "string" }] },
    ],
};

export const CodeSystem: TypeModel = {
    TypeName: "CodeSystem",
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
        { ElementName: "purpose", Type: [{ TypeName: "markdown" }] },
        { ElementName: "copyright", Type: [{ TypeName: "markdown" }] },
        { ElementName: "caseSensitive", Type: [{ TypeName: "boolean" }] },
        { ElementName: "valueSet", Type: [{ TypeName: "canonical" }] },
        { ElementName: "hierarchyMeaning", Type: [{ TypeName: "code" }] },
        { ElementName: "compositional", Type: [{ TypeName: "boolean" }] },
        { ElementName: "versionNeeded", Type: [{ TypeName: "boolean" }] },
        { ElementName: "content", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "supplements", Type: [{ TypeName: "canonical" }] },
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
        { ElementName: "value[x]", Type: [{ TypeName: "Coding" }, { TypeName: "boolean" }, { TypeName: "code" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "integer" }, { TypeName: "string" }], Required: true },
    ],
};

export const Communication: TypeModel = {
    TypeName: "Communication",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "instantiatesCanonical", Type: [{ TypeName: "canonical" }], IsArray: true },
        { ElementName: "instantiatesUri", Type: [{ TypeName: "uri" }], IsArray: true },
        { ElementName: "basedOn", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "partOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "inResponseTo", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Communication"] }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "statusReason", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "priority", Type: [{ TypeName: "code" }] },
        { ElementName: "medium", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Patient"] }] },
        { ElementName: "topic", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "about", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "sent", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "received", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "recipient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], IsArray: true },
        { ElementName: "sender", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "reasonCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "reasonReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Condition", "http://hl7.org/fhir/StructureDefinition/DiagnosticReport", "http://hl7.org/fhir/StructureDefinition/DocumentReference", "http://hl7.org/fhir/StructureDefinition/Observation"] }], IsArray: true },
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
        { ElementName: "statusReason", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "priority", Type: [{ TypeName: "code" }] },
        { ElementName: "doNotPerform", Type: [{ TypeName: "boolean" }] },
        { ElementName: "medium", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Patient"] }] },
        { ElementName: "about", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "payload", Type: [{ TypeName: "communicationrequest_payload" }], IsArray: true },
        { ElementName: "occurrence[x]", Type: [{ TypeName: "Period" }, { TypeName: "dateTime" }] },
        { ElementName: "authoredOn", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "requester", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "recipient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], IsArray: true },
        { ElementName: "sender", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "reasonCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "reasonReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Condition", "http://hl7.org/fhir/StructureDefinition/DiagnosticReport", "http://hl7.org/fhir/StructureDefinition/DocumentReference", "http://hl7.org/fhir/StructureDefinition/Observation"] }], IsArray: true },
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

export const CompartmentDefinition: TypeModel = {
    TypeName: "CompartmentDefinition",
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
        { ElementName: "purpose", Type: [{ TypeName: "markdown" }] },
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
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }], Required: true },
        { ElementName: "author", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], IsArray: true, Required: true },
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
        { ElementName: "mode", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "time", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "party", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
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
        { ElementName: "author", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], IsArray: true },
        { ElementName: "focus", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
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
        { ElementName: "source[x]", Type: [{ TypeName: "canonical" }, { TypeName: "uri" }] },
        { ElementName: "target[x]", Type: [{ TypeName: "canonical" }, { TypeName: "uri" }] },
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
        { ElementName: "equivalence", Type: [{ TypeName: "code" }], Required: true },
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
        { ElementName: "system", Type: [{ TypeName: "canonical" }] },
        { ElementName: "value", Type: [{ TypeName: "string" }], Required: true },
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
        { ElementName: "url", Type: [{ TypeName: "canonical" }] },
    ],
};

export const Condition: TypeModel = {
    TypeName: "Condition",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "clinicalStatus", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "verificationStatus", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "severity", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "bodySite", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "onset[x]", Type: [{ TypeName: "Age" }, { TypeName: "Period" }, { TypeName: "Range" }, { TypeName: "dateTime" }, { TypeName: "string" }] },
        { ElementName: "abatement[x]", Type: [{ TypeName: "Age" }, { TypeName: "Period" }, { TypeName: "Range" }, { TypeName: "dateTime" }, { TypeName: "string" }] },
        { ElementName: "recordedDate", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "recorder", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "asserter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "stage", Type: [{ TypeName: "condition_stage" }], IsArray: true },
        { ElementName: "evidence", Type: [{ TypeName: "condition_evidence" }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
    ],
};

export const condition_stage: TypeModel = {
    TypeName: "condition_stage",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "summary", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "assessment", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ClinicalImpression", "http://hl7.org/fhir/StructureDefinition/DiagnosticReport", "http://hl7.org/fhir/StructureDefinition/Observation"] }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
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
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "scope", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], IsArray: true, Required: true },
        { ElementName: "patient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }] },
        { ElementName: "dateTime", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "performer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], IsArray: true },
        { ElementName: "organization", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }], IsArray: true },
        { ElementName: "source[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Consent", "http://hl7.org/fhir/StructureDefinition/Contract", "http://hl7.org/fhir/StructureDefinition/DocumentReference", "http://hl7.org/fhir/StructureDefinition/QuestionnaireResponse"] }] },
        { ElementName: "policy", Type: [{ TypeName: "consent_policy" }], IsArray: true },
        { ElementName: "policyRule", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "verification", Type: [{ TypeName: "consent_verification" }], IsArray: true },
        { ElementName: "provision", Type: [{ TypeName: "consent_provision" }] },
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

export const consent_verification: TypeModel = {
    TypeName: "consent_verification",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "verified", Type: [{ TypeName: "boolean" }], Required: true },
        { ElementName: "verifiedWith", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "verificationDate", Type: [{ TypeName: "dateTime" }] },
    ],
};

export const consent_provision: TypeModel = {
    TypeName: "consent_provision",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "code" }] },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "actor", Type: [{ TypeName: "consent_provision_actor" }], IsArray: true },
        { ElementName: "action", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "securityLabel", Type: [{ TypeName: "Coding" }], IsArray: true },
        { ElementName: "purpose", Type: [{ TypeName: "Coding" }], IsArray: true },
        { ElementName: "class", Type: [{ TypeName: "Coding" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "dataPeriod", Type: [{ TypeName: "Period" }] },
        { ElementName: "data", Type: [{ TypeName: "consent_provision_data" }], IsArray: true },
        { ElementName: "provision", Type: [{ TypeName: "consent_provision" }], IsArray: true },
    ],
};

export const consent_provision_actor: TypeModel = {
    TypeName: "consent_provision_actor",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "reference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
    ],
};

export const consent_provision_data: TypeModel = {
    TypeName: "consent_provision_data",
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
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "url", Type: [{ TypeName: "uri" }] },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }] },
        { ElementName: "legalState", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "instantiatesCanonical", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Contract"] }] },
        { ElementName: "instantiatesUri", Type: [{ TypeName: "uri" }] },
        { ElementName: "contentDerivative", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "issued", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "applies", Type: [{ TypeName: "Period" }] },
        { ElementName: "expirationType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "authority", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }], IsArray: true },
        { ElementName: "domain", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }], IsArray: true },
        { ElementName: "site", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }], IsArray: true },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "subtitle", Type: [{ TypeName: "string" }] },
        { ElementName: "alias", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "author", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "scope", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "topic[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "subType", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "contentDefinition", Type: [{ TypeName: "contract_contentDefinition" }] },
        { ElementName: "term", Type: [{ TypeName: "contract_term" }], IsArray: true },
        { ElementName: "supportingInfo", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "relevantHistory", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Provenance"] }], IsArray: true },
        { ElementName: "signer", Type: [{ TypeName: "contract_signer" }], IsArray: true },
        { ElementName: "friendly", Type: [{ TypeName: "contract_friendly" }], IsArray: true },
        { ElementName: "legal", Type: [{ TypeName: "contract_legal" }], IsArray: true },
        { ElementName: "rule", Type: [{ TypeName: "contract_rule" }], IsArray: true },
        { ElementName: "legallyBinding[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Composition", "http://hl7.org/fhir/StructureDefinition/Contract", "http://hl7.org/fhir/StructureDefinition/DocumentReference", "http://hl7.org/fhir/StructureDefinition/QuestionnaireResponse"] }] },
    ],
};

export const contract_contentDefinition: TypeModel = {
    TypeName: "contract_contentDefinition",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "subType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "publisher", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "publicationDate", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "publicationStatus", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "copyright", Type: [{ TypeName: "markdown" }] },
    ],
};

export const contract_term: TypeModel = {
    TypeName: "contract_term",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "issued", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "applies", Type: [{ TypeName: "Period" }] },
        { ElementName: "topic[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "subType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "text", Type: [{ TypeName: "string" }] },
        { ElementName: "securityLabel", Type: [{ TypeName: "contract_term_securityLabel" }], IsArray: true },
        { ElementName: "offer", Type: [{ TypeName: "contract_term_offer" }], Required: true },
        { ElementName: "asset", Type: [{ TypeName: "contract_term_asset" }], IsArray: true },
        { ElementName: "action", Type: [{ TypeName: "contract_term_action" }], IsArray: true },
        { ElementName: "group", Type: [{ TypeName: "contract_term" }], IsArray: true },
    ],
};

export const contract_term_securityLabel: TypeModel = {
    TypeName: "contract_term_securityLabel",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "number", Type: [{ TypeName: "unsignedInt" }], IsArray: true },
        { ElementName: "classification", Type: [{ TypeName: "Coding" }], Required: true },
        { ElementName: "category", Type: [{ TypeName: "Coding" }], IsArray: true },
        { ElementName: "control", Type: [{ TypeName: "Coding" }], IsArray: true },
    ],
};

export const contract_term_offer: TypeModel = {
    TypeName: "contract_term_offer",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "party", Type: [{ TypeName: "contract_term_offer_party" }], IsArray: true },
        { ElementName: "topic", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "decision", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "decisionMode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "answer", Type: [{ TypeName: "contract_term_offer_answer" }], IsArray: true },
        { ElementName: "text", Type: [{ TypeName: "string" }] },
        { ElementName: "linkId", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "securityLabelNumber", Type: [{ TypeName: "unsignedInt" }], IsArray: true },
    ],
};

export const contract_term_offer_party: TypeModel = {
    TypeName: "contract_term_offer_party",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "reference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], IsArray: true, Required: true },
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }], Required: true },
    ],
};

export const contract_term_offer_answer: TypeModel = {
    TypeName: "contract_term_offer_answer",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "value[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "Coding" }, { TypeName: "Quantity" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }, { TypeName: "boolean" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "integer" }, { TypeName: "string" }, { TypeName: "time" }, { TypeName: "uri" }], Required: true },
    ],
};

export const contract_term_asset: TypeModel = {
    TypeName: "contract_term_asset",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "scope", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "typeReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "subtype", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "relationship", Type: [{ TypeName: "Coding" }] },
        { ElementName: "context", Type: [{ TypeName: "contract_term_asset_context" }], IsArray: true },
        { ElementName: "condition", Type: [{ TypeName: "string" }] },
        { ElementName: "periodType", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "period", Type: [{ TypeName: "Period" }], IsArray: true },
        { ElementName: "usePeriod", Type: [{ TypeName: "Period" }], IsArray: true },
        { ElementName: "text", Type: [{ TypeName: "string" }] },
        { ElementName: "linkId", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "answer", Type: [{ TypeName: "contract_term_offer_answer" }], IsArray: true },
        { ElementName: "securityLabelNumber", Type: [{ TypeName: "unsignedInt" }], IsArray: true },
        { ElementName: "valuedItem", Type: [{ TypeName: "contract_term_asset_valuedItem" }], IsArray: true },
    ],
};

export const contract_term_asset_context: TypeModel = {
    TypeName: "contract_term_asset_context",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "reference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "text", Type: [{ TypeName: "string" }] },
    ],
};

export const contract_term_asset_valuedItem: TypeModel = {
    TypeName: "contract_term_asset_valuedItem",
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
        { ElementName: "payment", Type: [{ TypeName: "string" }] },
        { ElementName: "paymentDate", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "responsible", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "recipient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "linkId", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "securityLabelNumber", Type: [{ TypeName: "unsignedInt" }], IsArray: true },
    ],
};

export const contract_term_action: TypeModel = {
    TypeName: "contract_term_action",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "doNotPerform", Type: [{ TypeName: "boolean" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "subject", Type: [{ TypeName: "contract_term_action_subject" }], IsArray: true },
        { ElementName: "intent", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "linkId", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "context", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter", "http://hl7.org/fhir/StructureDefinition/EpisodeOfCare"] }] },
        { ElementName: "contextLinkId", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "occurrence[x]", Type: [{ TypeName: "Period" }, { TypeName: "Timing" }, { TypeName: "dateTime" }] },
        { ElementName: "requester", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], IsArray: true },
        { ElementName: "requesterLinkId", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "performerType", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "performerRole", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "performer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson", "http://hl7.org/fhir/StructureDefinition/Substance"] }] },
        { ElementName: "performerLinkId", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "reasonCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "reasonReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Condition", "http://hl7.org/fhir/StructureDefinition/DiagnosticReport", "http://hl7.org/fhir/StructureDefinition/DocumentReference", "http://hl7.org/fhir/StructureDefinition/Observation", "http://hl7.org/fhir/StructureDefinition/Questionnaire", "http://hl7.org/fhir/StructureDefinition/QuestionnaireResponse"] }], IsArray: true },
        { ElementName: "reason", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "reasonLinkId", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "securityLabelNumber", Type: [{ TypeName: "unsignedInt" }], IsArray: true },
    ],
};

export const contract_term_action_subject: TypeModel = {
    TypeName: "contract_term_action_subject",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "reference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], IsArray: true, Required: true },
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const contract_signer: TypeModel = {
    TypeName: "contract_signer",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "Coding" }], Required: true },
        { ElementName: "party", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
        { ElementName: "signature", Type: [{ TypeName: "Signature" }], IsArray: true, Required: true },
    ],
};

export const contract_friendly: TypeModel = {
    TypeName: "contract_friendly",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "content[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Composition", "http://hl7.org/fhir/StructureDefinition/DocumentReference", "http://hl7.org/fhir/StructureDefinition/QuestionnaireResponse"] }], Required: true },
    ],
};

export const contract_legal: TypeModel = {
    TypeName: "contract_legal",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "content[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Composition", "http://hl7.org/fhir/StructureDefinition/DocumentReference", "http://hl7.org/fhir/StructureDefinition/QuestionnaireResponse"] }], Required: true },
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
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "policyHolder", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "subscriber", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "subscriberId", Type: [{ TypeName: "string" }] },
        { ElementName: "beneficiary", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
        { ElementName: "dependent", Type: [{ TypeName: "string" }] },
        { ElementName: "relationship", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "payor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], IsArray: true, Required: true },
        { ElementName: "class", Type: [{ TypeName: "coverage_class" }], IsArray: true },
        { ElementName: "order", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "network", Type: [{ TypeName: "string" }] },
        { ElementName: "costToBeneficiary", Type: [{ TypeName: "coverage_costToBeneficiary" }], IsArray: true },
        { ElementName: "subrogation", Type: [{ TypeName: "boolean" }] },
        { ElementName: "contract", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Contract"] }], IsArray: true },
    ],
};

export const coverage_class: TypeModel = {
    TypeName: "coverage_class",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "value", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
    ],
};

export const coverage_costToBeneficiary: TypeModel = {
    TypeName: "coverage_costToBeneficiary",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "value[x]", Type: [{ TypeName: "Money" }, { TypeName: "Quantity" }], Required: true },
        { ElementName: "exception", Type: [{ TypeName: "coverage_costToBeneficiary_exception" }], IsArray: true },
    ],
};

export const coverage_costToBeneficiary_exception: TypeModel = {
    TypeName: "coverage_costToBeneficiary_exception",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
    ],
};

export const CoverageEligibilityRequest: TypeModel = {
    TypeName: "CoverageEligibilityRequest",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "priority", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "purpose", Type: [{ TypeName: "code" }], IsArray: true, Required: true },
        { ElementName: "patient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
        { ElementName: "serviced[x]", Type: [{ TypeName: "Period" }, { TypeName: "date" }] },
        { ElementName: "created", Type: [{ TypeName: "dateTime" }], Required: true },
        { ElementName: "enterer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "provider", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "insurer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }], Required: true },
        { ElementName: "facility", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "supportingInfo", Type: [{ TypeName: "coverageeligibilityrequest_supportingInfo" }], IsArray: true },
        { ElementName: "insurance", Type: [{ TypeName: "coverageeligibilityrequest_insurance" }], IsArray: true },
        { ElementName: "item", Type: [{ TypeName: "coverageeligibilityrequest_item" }], IsArray: true },
    ],
};

export const coverageeligibilityrequest_supportingInfo: TypeModel = {
    TypeName: "coverageeligibilityrequest_supportingInfo",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "sequence", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "information", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], Required: true },
        { ElementName: "appliesToAll", Type: [{ TypeName: "boolean" }] },
    ],
};

export const coverageeligibilityrequest_insurance: TypeModel = {
    TypeName: "coverageeligibilityrequest_insurance",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "focal", Type: [{ TypeName: "boolean" }] },
        { ElementName: "coverage", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Coverage"] }], Required: true },
        { ElementName: "businessArrangement", Type: [{ TypeName: "string" }] },
    ],
};

export const coverageeligibilityrequest_item: TypeModel = {
    TypeName: "coverageeligibilityrequest_item",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "supportingInfoSequence", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "productOrService", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "modifier", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "provider", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "unitPrice", Type: [{ TypeName: "Money" }] },
        { ElementName: "facility", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "diagnosis", Type: [{ TypeName: "coverageeligibilityrequest_item_diagnosis" }], IsArray: true },
        { ElementName: "detail", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
    ],
};

export const coverageeligibilityrequest_item_diagnosis: TypeModel = {
    TypeName: "coverageeligibilityrequest_item_diagnosis",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "diagnosis[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Condition"] }] },
    ],
};

export const CoverageEligibilityResponse: TypeModel = {
    TypeName: "CoverageEligibilityResponse",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "purpose", Type: [{ TypeName: "code" }], IsArray: true, Required: true },
        { ElementName: "patient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
        { ElementName: "serviced[x]", Type: [{ TypeName: "Period" }, { TypeName: "date" }] },
        { ElementName: "created", Type: [{ TypeName: "dateTime" }], Required: true },
        { ElementName: "requestor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "request", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CoverageEligibilityRequest"] }], Required: true },
        { ElementName: "outcome", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "disposition", Type: [{ TypeName: "string" }] },
        { ElementName: "insurer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }], Required: true },
        { ElementName: "insurance", Type: [{ TypeName: "coverageeligibilityresponse_insurance" }], IsArray: true },
        { ElementName: "preAuthRef", Type: [{ TypeName: "string" }] },
        { ElementName: "form", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "error", Type: [{ TypeName: "coverageeligibilityresponse_error" }], IsArray: true },
    ],
};

export const coverageeligibilityresponse_insurance: TypeModel = {
    TypeName: "coverageeligibilityresponse_insurance",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "coverage", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Coverage"] }], Required: true },
        { ElementName: "inforce", Type: [{ TypeName: "boolean" }] },
        { ElementName: "benefitPeriod", Type: [{ TypeName: "Period" }] },
        { ElementName: "item", Type: [{ TypeName: "coverageeligibilityresponse_insurance_item" }], IsArray: true },
    ],
};

export const coverageeligibilityresponse_insurance_item: TypeModel = {
    TypeName: "coverageeligibilityresponse_insurance_item",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "productOrService", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "modifier", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "provider", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "excluded", Type: [{ TypeName: "boolean" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "network", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "unit", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "term", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "benefit", Type: [{ TypeName: "coverageeligibilityresponse_insurance_item_benefit" }], IsArray: true },
        { ElementName: "authorizationRequired", Type: [{ TypeName: "boolean" }] },
        { ElementName: "authorizationSupporting", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "authorizationUrl", Type: [{ TypeName: "uri" }] },
    ],
};

export const coverageeligibilityresponse_insurance_item_benefit: TypeModel = {
    TypeName: "coverageeligibilityresponse_insurance_item_benefit",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "allowed[x]", Type: [{ TypeName: "Money" }, { TypeName: "string" }, { TypeName: "unsignedInt" }] },
        { ElementName: "used[x]", Type: [{ TypeName: "Money" }, { TypeName: "string" }, { TypeName: "unsignedInt" }] },
    ],
};

export const coverageeligibilityresponse_error: TypeModel = {
    TypeName: "coverageeligibilityresponse_error",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
    ],
};

export const DetectedIssue: TypeModel = {
    TypeName: "DetectedIssue",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "severity", Type: [{ TypeName: "code" }] },
        { ElementName: "patient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }] },
        { ElementName: "identified[x]", Type: [{ TypeName: "Period" }, { TypeName: "dateTime" }] },
        { ElementName: "author", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "implicated", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "evidence", Type: [{ TypeName: "detectedissue_evidence" }], IsArray: true },
        { ElementName: "detail", Type: [{ TypeName: "string" }] },
        { ElementName: "reference", Type: [{ TypeName: "uri" }] },
        { ElementName: "mitigation", Type: [{ TypeName: "detectedissue_mitigation" }], IsArray: true },
    ],
};

export const detectedissue_evidence: TypeModel = {
    TypeName: "detectedissue_evidence",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "detail", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
    ],
};

export const detectedissue_mitigation: TypeModel = {
    TypeName: "detectedissue_mitigation",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "action", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "author", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
    ],
};

export const Device: TypeModel = {
    TypeName: "Device",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "definition", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DeviceDefinition"] }] },
        { ElementName: "udiCarrier", Type: [{ TypeName: "device_udiCarrier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }] },
        { ElementName: "statusReason", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "distinctIdentifier", Type: [{ TypeName: "string" }] },
        { ElementName: "manufacturer", Type: [{ TypeName: "string" }] },
        { ElementName: "manufactureDate", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "expirationDate", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "lotNumber", Type: [{ TypeName: "string" }] },
        { ElementName: "serialNumber", Type: [{ TypeName: "string" }] },
        { ElementName: "deviceName", Type: [{ TypeName: "device_deviceName" }], IsArray: true },
        { ElementName: "modelNumber", Type: [{ TypeName: "string" }] },
        { ElementName: "partNumber", Type: [{ TypeName: "string" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "specialization", Type: [{ TypeName: "device_specialization" }], IsArray: true },
        { ElementName: "version", Type: [{ TypeName: "device_version" }], IsArray: true },
        { ElementName: "property", Type: [{ TypeName: "device_property" }], IsArray: true },
        { ElementName: "patient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }] },
        { ElementName: "owner", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "contact", Type: [{ TypeName: "ContactPoint" }], IsArray: true },
        { ElementName: "location", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "url", Type: [{ TypeName: "uri" }] },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "safety", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "parent", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }] },
    ],
};

export const device_udiCarrier: TypeModel = {
    TypeName: "device_udiCarrier",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "deviceIdentifier", Type: [{ TypeName: "string" }] },
        { ElementName: "issuer", Type: [{ TypeName: "uri" }] },
        { ElementName: "jurisdiction", Type: [{ TypeName: "uri" }] },
        { ElementName: "carrierAIDC", Type: [{ TypeName: "base64Binary" }] },
        { ElementName: "carrierHRF", Type: [{ TypeName: "string" }] },
        { ElementName: "entryType", Type: [{ TypeName: "code" }] },
    ],
};

export const device_deviceName: TypeModel = {
    TypeName: "device_deviceName",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "name", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
    ],
};

export const device_specialization: TypeModel = {
    TypeName: "device_specialization",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "systemType", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
    ],
};

export const device_version: TypeModel = {
    TypeName: "device_version",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "component", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "value", Type: [{ TypeName: "string" }], Required: true },
    ],
};

export const device_property: TypeModel = {
    TypeName: "device_property",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "valueQuantity", Type: [{ TypeName: "Quantity" }], IsArray: true },
        { ElementName: "valueCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
    ],
};

export const DeviceDefinition: TypeModel = {
    TypeName: "DeviceDefinition",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "udiDeviceIdentifier", Type: [{ TypeName: "devicedefinition_udiDeviceIdentifier" }], IsArray: true },
        { ElementName: "manufacturer[x]", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }, { TypeName: "string" }] },
        { ElementName: "deviceName", Type: [{ TypeName: "devicedefinition_deviceName" }], IsArray: true },
        { ElementName: "modelNumber", Type: [{ TypeName: "string" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "specialization", Type: [{ TypeName: "devicedefinition_specialization" }], IsArray: true },
        { ElementName: "version", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "safety", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "shelfLifeStorage", Type: [{ TypeName: "ProductShelfLife" }], IsArray: true },
        { ElementName: "physicalCharacteristics", Type: [{ TypeName: "ProdCharacteristic" }] },
        { ElementName: "languageCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "capability", Type: [{ TypeName: "devicedefinition_capability" }], IsArray: true },
        { ElementName: "property", Type: [{ TypeName: "devicedefinition_property" }], IsArray: true },
        { ElementName: "owner", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "contact", Type: [{ TypeName: "ContactPoint" }], IsArray: true },
        { ElementName: "url", Type: [{ TypeName: "uri" }] },
        { ElementName: "onlineInformation", Type: [{ TypeName: "uri" }] },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "parentDevice", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DeviceDefinition"] }] },
        { ElementName: "material", Type: [{ TypeName: "devicedefinition_material" }], IsArray: true },
    ],
};

export const devicedefinition_udiDeviceIdentifier: TypeModel = {
    TypeName: "devicedefinition_udiDeviceIdentifier",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "deviceIdentifier", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "issuer", Type: [{ TypeName: "uri" }], Required: true },
        { ElementName: "jurisdiction", Type: [{ TypeName: "uri" }], Required: true },
    ],
};

export const devicedefinition_deviceName: TypeModel = {
    TypeName: "devicedefinition_deviceName",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "name", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
    ],
};

export const devicedefinition_specialization: TypeModel = {
    TypeName: "devicedefinition_specialization",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "systemType", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
    ],
};

export const devicedefinition_capability: TypeModel = {
    TypeName: "devicedefinition_capability",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "description", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
    ],
};

export const devicedefinition_property: TypeModel = {
    TypeName: "devicedefinition_property",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "valueQuantity", Type: [{ TypeName: "Quantity" }], IsArray: true },
        { ElementName: "valueCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
    ],
};

export const devicedefinition_material: TypeModel = {
    TypeName: "devicedefinition_material",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "substance", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "alternate", Type: [{ TypeName: "boolean" }] },
        { ElementName: "allergenicIndicator", Type: [{ TypeName: "boolean" }] },
    ],
};

export const DeviceMetric: TypeModel = {
    TypeName: "DeviceMetric",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "unit", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "source", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }] },
        { ElementName: "parent", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }] },
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
        { ElementName: "instantiatesCanonical", Type: [{ TypeName: "canonical" }], IsArray: true },
        { ElementName: "instantiatesUri", Type: [{ TypeName: "uri" }], IsArray: true },
        { ElementName: "basedOn", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "priorRequest", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "groupIdentifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }] },
        { ElementName: "intent", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "priority", Type: [{ TypeName: "code" }] },
        { ElementName: "code[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }], Required: true },
        { ElementName: "parameter", Type: [{ TypeName: "devicerequest_parameter" }], IsArray: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "occurrence[x]", Type: [{ TypeName: "Period" }, { TypeName: "Timing" }, { TypeName: "dateTime" }] },
        { ElementName: "authoredOn", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "requester", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "performerType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "performer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "reasonCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "reasonReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Condition", "http://hl7.org/fhir/StructureDefinition/DiagnosticReport", "http://hl7.org/fhir/StructureDefinition/DocumentReference", "http://hl7.org/fhir/StructureDefinition/Observation"] }], IsArray: true },
        { ElementName: "insurance", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ClaimResponse", "http://hl7.org/fhir/StructureDefinition/Coverage"] }], IsArray: true },
        { ElementName: "supportingInfo", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "relevantHistory", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Provenance"] }], IsArray: true },
    ],
};

export const devicerequest_parameter: TypeModel = {
    TypeName: "devicerequest_parameter",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "value[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "boolean" }] },
    ],
};

export const DeviceUseStatement: TypeModel = {
    TypeName: "DeviceUseStatement",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "basedOn", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ServiceRequest"] }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
        { ElementName: "derivedFrom", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Claim", "http://hl7.org/fhir/StructureDefinition/DocumentReference", "http://hl7.org/fhir/StructureDefinition/Observation", "http://hl7.org/fhir/StructureDefinition/Procedure", "http://hl7.org/fhir/StructureDefinition/QuestionnaireResponse", "http://hl7.org/fhir/StructureDefinition/ServiceRequest"] }], IsArray: true },
        { ElementName: "timing[x]", Type: [{ TypeName: "Period" }, { TypeName: "Timing" }, { TypeName: "dateTime" }] },
        { ElementName: "recordedOn", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "source", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "device", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }], Required: true },
        { ElementName: "reasonCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "reasonReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Condition", "http://hl7.org/fhir/StructureDefinition/DiagnosticReport", "http://hl7.org/fhir/StructureDefinition/DocumentReference", "http://hl7.org/fhir/StructureDefinition/Media", "http://hl7.org/fhir/StructureDefinition/Observation"] }], IsArray: true },
        { ElementName: "bodySite", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
    ],
};

export const DiagnosticReport: TypeModel = {
    TypeName: "DiagnosticReport",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "basedOn", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CarePlan", "http://hl7.org/fhir/StructureDefinition/ImmunizationRecommendation", "http://hl7.org/fhir/StructureDefinition/MedicationRequest", "http://hl7.org/fhir/StructureDefinition/NutritionOrder", "http://hl7.org/fhir/StructureDefinition/ServiceRequest"] }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Patient"] }] },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "effective[x]", Type: [{ TypeName: "Period" }, { TypeName: "dateTime" }] },
        { ElementName: "issued", Type: [{ TypeName: "instant" }] },
        { ElementName: "performer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }], IsArray: true },
        { ElementName: "resultsInterpreter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }], IsArray: true },
        { ElementName: "specimen", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Specimen"] }], IsArray: true },
        { ElementName: "result", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Observation"] }], IsArray: true },
        { ElementName: "imagingStudy", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ImagingStudy"] }], IsArray: true },
        { ElementName: "media", Type: [{ TypeName: "diagnosticreport_media" }], IsArray: true },
        { ElementName: "conclusion", Type: [{ TypeName: "string" }] },
        { ElementName: "conclusionCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "presentedForm", Type: [{ TypeName: "Attachment" }], IsArray: true },
    ],
};

export const diagnosticreport_media: TypeModel = {
    TypeName: "diagnosticreport_media",
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
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner"] }] },
        { ElementName: "created", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "author", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], IsArray: true },
        { ElementName: "recipient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], IsArray: true },
        { ElementName: "source", Type: [{ TypeName: "uri" }] },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "content", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true, Required: true },
        { ElementName: "related", Type: [{ TypeName: "documentmanifest_related" }], IsArray: true },
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
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner"] }] },
        { ElementName: "date", Type: [{ TypeName: "instant" }] },
        { ElementName: "author", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], IsArray: true },
        { ElementName: "authenticator", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
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
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter", "http://hl7.org/fhir/StructureDefinition/EpisodeOfCare"] }], IsArray: true },
        { ElementName: "event", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "facilityType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "practiceSetting", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "sourcePatientInfo", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }] },
        { ElementName: "related", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
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

export const EffectEvidenceSynthesis: TypeModel = {
    TypeName: "EffectEvidenceSynthesis",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "publisher", Type: [{ TypeName: "string" }] },
        { ElementName: "contact", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "useContext", Type: [{ TypeName: "UsageContext" }], IsArray: true },
        { ElementName: "jurisdiction", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "copyright", Type: [{ TypeName: "markdown" }] },
        { ElementName: "approvalDate", Type: [{ TypeName: "date" }] },
        { ElementName: "lastReviewDate", Type: [{ TypeName: "date" }] },
        { ElementName: "effectivePeriod", Type: [{ TypeName: "Period" }] },
        { ElementName: "topic", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "author", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "editor", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "reviewer", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "endorser", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "relatedArtifact", Type: [{ TypeName: "RelatedArtifact" }], IsArray: true },
        { ElementName: "synthesisType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "studyType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "population", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/EvidenceVariable"] }], Required: true },
        { ElementName: "exposure", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/EvidenceVariable"] }], Required: true },
        { ElementName: "exposureAlternative", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/EvidenceVariable"] }], Required: true },
        { ElementName: "outcome", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/EvidenceVariable"] }], Required: true },
        { ElementName: "sampleSize", Type: [{ TypeName: "effectevidencesynthesis_sampleSize" }] },
        { ElementName: "resultsByExposure", Type: [{ TypeName: "effectevidencesynthesis_resultsByExposure" }], IsArray: true },
        { ElementName: "effectEstimate", Type: [{ TypeName: "effectevidencesynthesis_effectEstimate" }], IsArray: true },
        { ElementName: "certainty", Type: [{ TypeName: "effectevidencesynthesis_certainty" }], IsArray: true },
    ],
};

export const effectevidencesynthesis_sampleSize: TypeModel = {
    TypeName: "effectevidencesynthesis_sampleSize",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "numberOfStudies", Type: [{ TypeName: "integer" }] },
        { ElementName: "numberOfParticipants", Type: [{ TypeName: "integer" }] },
    ],
};

export const effectevidencesynthesis_resultsByExposure: TypeModel = {
    TypeName: "effectevidencesynthesis_resultsByExposure",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "exposureState", Type: [{ TypeName: "code" }] },
        { ElementName: "variantState", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "riskEvidenceSynthesis", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RiskEvidenceSynthesis"] }], Required: true },
    ],
};

export const effectevidencesynthesis_effectEstimate: TypeModel = {
    TypeName: "effectevidencesynthesis_effectEstimate",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "variantState", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "value", Type: [{ TypeName: "decimal" }] },
        { ElementName: "unitOfMeasure", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "precisionEstimate", Type: [{ TypeName: "effectevidencesynthesis_effectEstimate_precisionEstimate" }], IsArray: true },
    ],
};

export const effectevidencesynthesis_effectEstimate_precisionEstimate: TypeModel = {
    TypeName: "effectevidencesynthesis_effectEstimate_precisionEstimate",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "level", Type: [{ TypeName: "decimal" }] },
        { ElementName: "from", Type: [{ TypeName: "decimal" }] },
        { ElementName: "to", Type: [{ TypeName: "decimal" }] },
    ],
};

export const effectevidencesynthesis_certainty: TypeModel = {
    TypeName: "effectevidencesynthesis_certainty",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "rating", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "certaintySubcomponent", Type: [{ TypeName: "effectevidencesynthesis_certainty_certaintySubcomponent" }], IsArray: true },
    ],
};

export const effectevidencesynthesis_certainty_certaintySubcomponent: TypeModel = {
    TypeName: "effectevidencesynthesis_certainty_certaintySubcomponent",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "rating", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
    ],
};

export const Encounter: TypeModel = {
    TypeName: "Encounter",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "statusHistory", Type: [{ TypeName: "encounter_statusHistory" }], IsArray: true },
        { ElementName: "class", Type: [{ TypeName: "Coding" }], Required: true },
        { ElementName: "classHistory", Type: [{ TypeName: "encounter_classHistory" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "serviceType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "priority", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Patient"] }] },
        { ElementName: "episodeOfCare", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/EpisodeOfCare"] }], IsArray: true },
        { ElementName: "basedOn", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ServiceRequest"] }], IsArray: true },
        { ElementName: "participant", Type: [{ TypeName: "encounter_participant" }], IsArray: true },
        { ElementName: "appointment", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Appointment"] }], IsArray: true },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "length", Type: [{ TypeName: "Duration" }] },
        { ElementName: "reasonCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "reasonReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Condition", "http://hl7.org/fhir/StructureDefinition/ImmunizationRecommendation", "http://hl7.org/fhir/StructureDefinition/Observation", "http://hl7.org/fhir/StructureDefinition/Procedure"] }], IsArray: true },
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
        { ElementName: "individual", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
    ],
};

export const encounter_diagnosis: TypeModel = {
    TypeName: "encounter_diagnosis",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "condition", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Condition", "http://hl7.org/fhir/StructureDefinition/Procedure"] }], Required: true },
        { ElementName: "use", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "rank", Type: [{ TypeName: "positiveInt" }] },
    ],
};

export const encounter_hospitalization: TypeModel = {
    TypeName: "encounter_hospitalization",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "preAdmissionIdentifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "origin", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "admitSource", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "reAdmission", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "dietPreference", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "specialCourtesy", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "specialArrangement", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "destination", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "dischargeDisposition", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const encounter_location: TypeModel = {
    TypeName: "encounter_location",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "location", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }], Required: true },
        { ElementName: "status", Type: [{ TypeName: "code" }] },
        { ElementName: "physicalType", Type: [{ TypeName: "CodeableConcept" }] },
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
        { ElementName: "address", Type: [{ TypeName: "url" }], Required: true },
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
        { ElementName: "provider", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "candidate", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }] },
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
        { ElementName: "outcome", Type: [{ TypeName: "code" }] },
        { ElementName: "disposition", Type: [{ TypeName: "string" }] },
        { ElementName: "created", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "organization", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "requestProvider", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
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
        { ElementName: "referralRequest", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ServiceRequest"] }], IsArray: true },
        { ElementName: "careManager", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
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

export const EventDefinition: TypeModel = {
    TypeName: "EventDefinition",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "subtitle", Type: [{ TypeName: "string" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "experimental", Type: [{ TypeName: "boolean" }] },
        { ElementName: "subject[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "publisher", Type: [{ TypeName: "string" }] },
        { ElementName: "contact", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "useContext", Type: [{ TypeName: "UsageContext" }], IsArray: true },
        { ElementName: "jurisdiction", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "purpose", Type: [{ TypeName: "markdown" }] },
        { ElementName: "usage", Type: [{ TypeName: "string" }] },
        { ElementName: "copyright", Type: [{ TypeName: "markdown" }] },
        { ElementName: "approvalDate", Type: [{ TypeName: "date" }] },
        { ElementName: "lastReviewDate", Type: [{ TypeName: "date" }] },
        { ElementName: "effectivePeriod", Type: [{ TypeName: "Period" }] },
        { ElementName: "topic", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "author", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "editor", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "reviewer", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "endorser", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "relatedArtifact", Type: [{ TypeName: "RelatedArtifact" }], IsArray: true },
        { ElementName: "trigger", Type: [{ TypeName: "TriggerDefinition" }], IsArray: true, Required: true },
    ],
};

export const Evidence: TypeModel = {
    TypeName: "Evidence",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "shortTitle", Type: [{ TypeName: "string" }] },
        { ElementName: "subtitle", Type: [{ TypeName: "string" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "publisher", Type: [{ TypeName: "string" }] },
        { ElementName: "contact", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "useContext", Type: [{ TypeName: "UsageContext" }], IsArray: true },
        { ElementName: "jurisdiction", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "copyright", Type: [{ TypeName: "markdown" }] },
        { ElementName: "approvalDate", Type: [{ TypeName: "date" }] },
        { ElementName: "lastReviewDate", Type: [{ TypeName: "date" }] },
        { ElementName: "effectivePeriod", Type: [{ TypeName: "Period" }] },
        { ElementName: "topic", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "author", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "editor", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "reviewer", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "endorser", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "relatedArtifact", Type: [{ TypeName: "RelatedArtifact" }], IsArray: true },
        { ElementName: "exposureBackground", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/EvidenceVariable"] }], Required: true },
        { ElementName: "exposureVariant", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/EvidenceVariable"] }], IsArray: true },
        { ElementName: "outcome", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/EvidenceVariable"] }], IsArray: true },
    ],
};

export const EvidenceVariable: TypeModel = {
    TypeName: "EvidenceVariable",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "shortTitle", Type: [{ TypeName: "string" }] },
        { ElementName: "subtitle", Type: [{ TypeName: "string" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "publisher", Type: [{ TypeName: "string" }] },
        { ElementName: "contact", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "useContext", Type: [{ TypeName: "UsageContext" }], IsArray: true },
        { ElementName: "jurisdiction", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "copyright", Type: [{ TypeName: "markdown" }] },
        { ElementName: "approvalDate", Type: [{ TypeName: "date" }] },
        { ElementName: "lastReviewDate", Type: [{ TypeName: "date" }] },
        { ElementName: "effectivePeriod", Type: [{ TypeName: "Period" }] },
        { ElementName: "topic", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "author", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "editor", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "reviewer", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "endorser", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "relatedArtifact", Type: [{ TypeName: "RelatedArtifact" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "code" }] },
        { ElementName: "characteristic", Type: [{ TypeName: "evidencevariable_characteristic" }], IsArray: true, Required: true },
    ],
};

export const evidencevariable_characteristic: TypeModel = {
    TypeName: "evidencevariable_characteristic",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "definition[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "DataRequirement" }, { TypeName: "Expression" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }, { TypeName: "TriggerDefinition" }, { TypeName: "canonical" }], Required: true },
        { ElementName: "usageContext", Type: [{ TypeName: "UsageContext" }], IsArray: true },
        { ElementName: "exclude", Type: [{ TypeName: "boolean" }] },
        { ElementName: "participantEffective[x]", Type: [{ TypeName: "Duration" }, { TypeName: "Period" }, { TypeName: "Timing" }, { TypeName: "dateTime" }] },
        { ElementName: "timeFromStart", Type: [{ TypeName: "Duration" }] },
        { ElementName: "groupMeasure", Type: [{ TypeName: "code" }] },
    ],
};

export const ExampleScenario: TypeModel = {
    TypeName: "ExampleScenario",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "experimental", Type: [{ TypeName: "boolean" }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "publisher", Type: [{ TypeName: "string" }] },
        { ElementName: "contact", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "useContext", Type: [{ TypeName: "UsageContext" }], IsArray: true },
        { ElementName: "jurisdiction", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "copyright", Type: [{ TypeName: "markdown" }] },
        { ElementName: "purpose", Type: [{ TypeName: "markdown" }] },
        { ElementName: "actor", Type: [{ TypeName: "examplescenario_actor" }], IsArray: true },
        { ElementName: "instance", Type: [{ TypeName: "examplescenario_instance" }], IsArray: true },
        { ElementName: "process", Type: [{ TypeName: "examplescenario_process" }], IsArray: true },
        { ElementName: "workflow", Type: [{ TypeName: "canonical" }], IsArray: true },
    ],
};

export const examplescenario_actor: TypeModel = {
    TypeName: "examplescenario_actor",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "actorId", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
    ],
};

export const examplescenario_instance: TypeModel = {
    TypeName: "examplescenario_instance",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "resourceId", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "resourceType", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "version", Type: [{ TypeName: "examplescenario_instance_version" }], IsArray: true },
        { ElementName: "containedInstance", Type: [{ TypeName: "examplescenario_instance_containedInstance" }], IsArray: true },
    ],
};

export const examplescenario_instance_version: TypeModel = {
    TypeName: "examplescenario_instance_version",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "versionId", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }], Required: true },
    ],
};

export const examplescenario_instance_containedInstance: TypeModel = {
    TypeName: "examplescenario_instance_containedInstance",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "resourceId", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "versionId", Type: [{ TypeName: "string" }] },
    ],
};

export const examplescenario_process: TypeModel = {
    TypeName: "examplescenario_process",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "title", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "preConditions", Type: [{ TypeName: "markdown" }] },
        { ElementName: "postConditions", Type: [{ TypeName: "markdown" }] },
        { ElementName: "step", Type: [{ TypeName: "examplescenario_process_step" }], IsArray: true },
    ],
};

export const examplescenario_process_step: TypeModel = {
    TypeName: "examplescenario_process_step",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "process", Type: [{ TypeName: "examplescenario_process" }], IsArray: true },
        { ElementName: "pause", Type: [{ TypeName: "boolean" }] },
        { ElementName: "operation", Type: [{ TypeName: "examplescenario_process_step_operation" }] },
        { ElementName: "alternative", Type: [{ TypeName: "examplescenario_process_step_alternative" }], IsArray: true },
    ],
};

export const examplescenario_process_step_operation: TypeModel = {
    TypeName: "examplescenario_process_step_operation",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "number", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "string" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "initiator", Type: [{ TypeName: "string" }] },
        { ElementName: "receiver", Type: [{ TypeName: "string" }] },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "initiatorActive", Type: [{ TypeName: "boolean" }] },
        { ElementName: "receiverActive", Type: [{ TypeName: "boolean" }] },
        { ElementName: "request", Type: [{ TypeName: "examplescenario_instance_containedInstance" }] },
        { ElementName: "response", Type: [{ TypeName: "examplescenario_instance_containedInstance" }] },
    ],
};

export const examplescenario_process_step_alternative: TypeModel = {
    TypeName: "examplescenario_process_step_alternative",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "title", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "step", Type: [{ TypeName: "examplescenario_process_step" }], IsArray: true },
    ],
};

export const ExplanationOfBenefit: TypeModel = {
    TypeName: "ExplanationOfBenefit",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "subType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "use", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "patient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
        { ElementName: "billablePeriod", Type: [{ TypeName: "Period" }] },
        { ElementName: "created", Type: [{ TypeName: "dateTime" }], Required: true },
        { ElementName: "enterer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "insurer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }], Required: true },
        { ElementName: "provider", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }], Required: true },
        { ElementName: "priority", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "fundsReserveRequested", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "fundsReserve", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "related", Type: [{ TypeName: "explanationofbenefit_related" }], IsArray: true },
        { ElementName: "prescription", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MedicationRequest", "http://hl7.org/fhir/StructureDefinition/VisionPrescription"] }] },
        { ElementName: "originalPrescription", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MedicationRequest"] }] },
        { ElementName: "payee", Type: [{ TypeName: "explanationofbenefit_payee" }] },
        { ElementName: "referral", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ServiceRequest"] }] },
        { ElementName: "facility", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "claim", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Claim"] }] },
        { ElementName: "claimResponse", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ClaimResponse"] }] },
        { ElementName: "outcome", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "disposition", Type: [{ TypeName: "string" }] },
        { ElementName: "preAuthRef", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "preAuthRefPeriod", Type: [{ TypeName: "Period" }], IsArray: true },
        { ElementName: "careTeam", Type: [{ TypeName: "explanationofbenefit_careTeam" }], IsArray: true },
        { ElementName: "supportingInfo", Type: [{ TypeName: "explanationofbenefit_supportingInfo" }], IsArray: true },
        { ElementName: "diagnosis", Type: [{ TypeName: "explanationofbenefit_diagnosis" }], IsArray: true },
        { ElementName: "procedure", Type: [{ TypeName: "explanationofbenefit_procedure" }], IsArray: true },
        { ElementName: "precedence", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "insurance", Type: [{ TypeName: "explanationofbenefit_insurance" }], IsArray: true, Required: true },
        { ElementName: "accident", Type: [{ TypeName: "explanationofbenefit_accident" }] },
        { ElementName: "item", Type: [{ TypeName: "explanationofbenefit_item" }], IsArray: true },
        { ElementName: "addItem", Type: [{ TypeName: "explanationofbenefit_addItem" }], IsArray: true },
        { ElementName: "adjudication", Type: [{ TypeName: "explanationofbenefit_item_adjudication" }], IsArray: true },
        { ElementName: "total", Type: [{ TypeName: "explanationofbenefit_total" }], IsArray: true },
        { ElementName: "payment", Type: [{ TypeName: "explanationofbenefit_payment" }] },
        { ElementName: "formCode", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "form", Type: [{ TypeName: "Attachment" }] },
        { ElementName: "processNote", Type: [{ TypeName: "explanationofbenefit_processNote" }], IsArray: true },
        { ElementName: "benefitPeriod", Type: [{ TypeName: "Period" }] },
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
        { ElementName: "party", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
    ],
};

export const explanationofbenefit_careTeam: TypeModel = {
    TypeName: "explanationofbenefit_careTeam",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "sequence", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "provider", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }], Required: true },
        { ElementName: "responsible", Type: [{ TypeName: "boolean" }] },
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "qualification", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const explanationofbenefit_supportingInfo: TypeModel = {
    TypeName: "explanationofbenefit_supportingInfo",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "sequence", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "timing[x]", Type: [{ TypeName: "Period" }, { TypeName: "date" }] },
        { ElementName: "value[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "Quantity" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }, { TypeName: "boolean" }, { TypeName: "string" }] },
        { ElementName: "reason", Type: [{ TypeName: "Coding" }] },
    ],
};

export const explanationofbenefit_diagnosis: TypeModel = {
    TypeName: "explanationofbenefit_diagnosis",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "sequence", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "diagnosis[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Condition"] }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "onAdmission", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "packageCode", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const explanationofbenefit_procedure: TypeModel = {
    TypeName: "explanationofbenefit_procedure",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "sequence", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "procedure[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Procedure"] }], Required: true },
        { ElementName: "udi", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }], IsArray: true },
    ],
};

export const explanationofbenefit_insurance: TypeModel = {
    TypeName: "explanationofbenefit_insurance",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "focal", Type: [{ TypeName: "boolean" }], Required: true },
        { ElementName: "coverage", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Coverage"] }], Required: true },
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
        { ElementName: "careTeamSequence", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "diagnosisSequence", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "procedureSequence", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "informationSequence", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "revenue", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "productOrService", Type: [{ TypeName: "CodeableConcept" }], Required: true },
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
        { ElementName: "revenue", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "productOrService", Type: [{ TypeName: "CodeableConcept" }], Required: true },
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
        { ElementName: "revenue", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "productOrService", Type: [{ TypeName: "CodeableConcept" }], Required: true },
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
        { ElementName: "itemSequence", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "detailSequence", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "subDetailSequence", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "provider", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }], IsArray: true },
        { ElementName: "productOrService", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "modifier", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "programCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "serviced[x]", Type: [{ TypeName: "Period" }, { TypeName: "date" }] },
        { ElementName: "location[x]", Type: [{ TypeName: "Address" }, { TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "unitPrice", Type: [{ TypeName: "Money" }] },
        { ElementName: "factor", Type: [{ TypeName: "decimal" }] },
        { ElementName: "net", Type: [{ TypeName: "Money" }] },
        { ElementName: "bodySite", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "subSite", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "noteNumber", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "adjudication", Type: [{ TypeName: "explanationofbenefit_item_adjudication" }], IsArray: true },
        { ElementName: "detail", Type: [{ TypeName: "explanationofbenefit_addItem_detail" }], IsArray: true },
    ],
};

export const explanationofbenefit_addItem_detail: TypeModel = {
    TypeName: "explanationofbenefit_addItem_detail",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "productOrService", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "modifier", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "unitPrice", Type: [{ TypeName: "Money" }] },
        { ElementName: "factor", Type: [{ TypeName: "decimal" }] },
        { ElementName: "net", Type: [{ TypeName: "Money" }] },
        { ElementName: "noteNumber", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "adjudication", Type: [{ TypeName: "explanationofbenefit_item_adjudication" }], IsArray: true },
        { ElementName: "subDetail", Type: [{ TypeName: "explanationofbenefit_addItem_detail_subDetail" }], IsArray: true },
    ],
};

export const explanationofbenefit_addItem_detail_subDetail: TypeModel = {
    TypeName: "explanationofbenefit_addItem_detail_subDetail",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "productOrService", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "modifier", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "unitPrice", Type: [{ TypeName: "Money" }] },
        { ElementName: "factor", Type: [{ TypeName: "decimal" }] },
        { ElementName: "net", Type: [{ TypeName: "Money" }] },
        { ElementName: "noteNumber", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "adjudication", Type: [{ TypeName: "explanationofbenefit_item_adjudication" }], IsArray: true },
    ],
};

export const explanationofbenefit_total: TypeModel = {
    TypeName: "explanationofbenefit_total",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "amount", Type: [{ TypeName: "Money" }], Required: true },
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
        { ElementName: "type", Type: [{ TypeName: "code" }] },
        { ElementName: "text", Type: [{ TypeName: "string" }] },
        { ElementName: "language", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const explanationofbenefit_benefitBalance: TypeModel = {
    TypeName: "explanationofbenefit_benefitBalance",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], Required: true },
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
        { ElementName: "instantiatesCanonical", Type: [{ TypeName: "canonical" }], IsArray: true },
        { ElementName: "instantiatesUri", Type: [{ TypeName: "uri" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "dataAbsentReason", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "patient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "relationship", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "sex", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "born[x]", Type: [{ TypeName: "Period" }, { TypeName: "date" }, { TypeName: "string" }] },
        { ElementName: "age[x]", Type: [{ TypeName: "Age" }, { TypeName: "Range" }, { TypeName: "string" }] },
        { ElementName: "estimatedAge", Type: [{ TypeName: "boolean" }] },
        { ElementName: "deceased[x]", Type: [{ TypeName: "Age" }, { TypeName: "Range" }, { TypeName: "boolean" }, { TypeName: "date" }, { TypeName: "string" }] },
        { ElementName: "reasonCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "reasonReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/AllergyIntolerance", "http://hl7.org/fhir/StructureDefinition/Condition", "http://hl7.org/fhir/StructureDefinition/DiagnosticReport", "http://hl7.org/fhir/StructureDefinition/DocumentReference", "http://hl7.org/fhir/StructureDefinition/Observation", "http://hl7.org/fhir/StructureDefinition/QuestionnaireResponse"] }], IsArray: true },
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
        { ElementName: "contributedToDeath", Type: [{ TypeName: "boolean" }] },
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
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Medication", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/PlanDefinition", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/Procedure"] }], Required: true },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "author", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
    ],
};

export const Goal: TypeModel = {
    TypeName: "Goal",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "lifecycleStatus", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "achievementStatus", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "priority", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "description", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
        { ElementName: "start[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "date" }] },
        { ElementName: "target", Type: [{ TypeName: "goal_target" }], IsArray: true },
        { ElementName: "statusDate", Type: [{ TypeName: "date" }] },
        { ElementName: "statusReason", Type: [{ TypeName: "string" }] },
        { ElementName: "expressedBy", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "addresses", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Condition", "http://hl7.org/fhir/StructureDefinition/MedicationStatement", "http://hl7.org/fhir/StructureDefinition/NutritionOrder", "http://hl7.org/fhir/StructureDefinition/Observation", "http://hl7.org/fhir/StructureDefinition/RiskAssessment", "http://hl7.org/fhir/StructureDefinition/ServiceRequest"] }], IsArray: true },
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
        { ElementName: "detail[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "boolean" }, { TypeName: "integer" }, { TypeName: "string" }] },
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
        { ElementName: "profile", Type: [{ TypeName: "canonical" }] },
        { ElementName: "link", Type: [{ TypeName: "graphdefinition_link" }], IsArray: true },
    ],
};

export const graphdefinition_link: TypeModel = {
    TypeName: "graphdefinition_link",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "path", Type: [{ TypeName: "string" }] },
        { ElementName: "sliceName", Type: [{ TypeName: "string" }] },
        { ElementName: "min", Type: [{ TypeName: "integer" }] },
        { ElementName: "max", Type: [{ TypeName: "string" }] },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "target", Type: [{ TypeName: "graphdefinition_link_target" }], IsArray: true },
    ],
};

export const graphdefinition_link_target: TypeModel = {
    TypeName: "graphdefinition_link_target",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "params", Type: [{ TypeName: "string" }] },
        { ElementName: "profile", Type: [{ TypeName: "canonical" }] },
        { ElementName: "compartment", Type: [{ TypeName: "graphdefinition_link_target_compartment" }], IsArray: true },
        { ElementName: "link", Type: [{ TypeName: "graphdefinition_link" }], IsArray: true },
    ],
};

export const graphdefinition_link_target_compartment: TypeModel = {
    TypeName: "graphdefinition_link_target_compartment",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "use", Type: [{ TypeName: "code" }], Required: true },
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
        { ElementName: "managingEntity", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "characteristic", Type: [{ TypeName: "group_characteristic" }], IsArray: true },
        { ElementName: "member", Type: [{ TypeName: "group_member" }], IsArray: true },
    ],
};

export const group_characteristic: TypeModel = {
    TypeName: "group_characteristic",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Reference" }, { TypeName: "boolean" }], Required: true },
        { ElementName: "exclude", Type: [{ TypeName: "boolean" }], Required: true },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
    ],
};

export const group_member: TypeModel = {
    TypeName: "group_member",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "entity", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Medication", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/Substance"] }], Required: true },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "inactive", Type: [{ TypeName: "boolean" }] },
    ],
};

export const GuidanceResponse: TypeModel = {
    TypeName: "GuidanceResponse",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "requestIdentifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "module[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "canonical" }, { TypeName: "uri" }], Required: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Patient"] }] },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "occurrenceDateTime", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "performer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }] },
        { ElementName: "reasonCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "reasonReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Condition", "http://hl7.org/fhir/StructureDefinition/DiagnosticReport", "http://hl7.org/fhir/StructureDefinition/DocumentReference", "http://hl7.org/fhir/StructureDefinition/Observation"] }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "evaluationMessage", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/OperationOutcome"] }], IsArray: true },
        { ElementName: "outputParameters", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Parameters"] }] },
        { ElementName: "result", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CarePlan", "http://hl7.org/fhir/StructureDefinition/RequestGroup"] }] },
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
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "specialty", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "location", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }], IsArray: true },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "comment", Type: [{ TypeName: "string" }] },
        { ElementName: "extraDetails", Type: [{ TypeName: "markdown" }] },
        { ElementName: "photo", Type: [{ TypeName: "Attachment" }] },
        { ElementName: "telecom", Type: [{ TypeName: "ContactPoint" }], IsArray: true },
        { ElementName: "coverageArea", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }], IsArray: true },
        { ElementName: "serviceProvisionCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "eligibility", Type: [{ TypeName: "healthcareservice_eligibility" }], IsArray: true },
        { ElementName: "program", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "characteristic", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "communication", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "referralMethod", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "appointmentRequired", Type: [{ TypeName: "boolean" }] },
        { ElementName: "availableTime", Type: [{ TypeName: "healthcareservice_availableTime" }], IsArray: true },
        { ElementName: "notAvailable", Type: [{ TypeName: "healthcareservice_notAvailable" }], IsArray: true },
        { ElementName: "availabilityExceptions", Type: [{ TypeName: "string" }] },
        { ElementName: "endpoint", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Endpoint"] }], IsArray: true },
    ],
};

export const healthcareservice_eligibility: TypeModel = {
    TypeName: "healthcareservice_eligibility",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "comment", Type: [{ TypeName: "markdown" }] },
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

export const ImagingStudy: TypeModel = {
    TypeName: "ImagingStudy",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "modality", Type: [{ TypeName: "Coding" }], IsArray: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "started", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "basedOn", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Appointment", "http://hl7.org/fhir/StructureDefinition/AppointmentResponse", "http://hl7.org/fhir/StructureDefinition/CarePlan", "http://hl7.org/fhir/StructureDefinition/ServiceRequest", "http://hl7.org/fhir/StructureDefinition/Task"] }], IsArray: true },
        { ElementName: "referrer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "interpreter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }], IsArray: true },
        { ElementName: "endpoint", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Endpoint"] }], IsArray: true },
        { ElementName: "numberOfSeries", Type: [{ TypeName: "unsignedInt" }] },
        { ElementName: "numberOfInstances", Type: [{ TypeName: "unsignedInt" }] },
        { ElementName: "procedureReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Procedure"] }] },
        { ElementName: "procedureCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "location", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "reasonCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "reasonReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Condition", "http://hl7.org/fhir/StructureDefinition/DiagnosticReport", "http://hl7.org/fhir/StructureDefinition/DocumentReference", "http://hl7.org/fhir/StructureDefinition/Media", "http://hl7.org/fhir/StructureDefinition/Observation"] }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "series", Type: [{ TypeName: "imagingstudy_series" }], IsArray: true },
    ],
};

export const imagingstudy_series: TypeModel = {
    TypeName: "imagingstudy_series",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "uid", Type: [{ TypeName: "id" }], Required: true },
        { ElementName: "number", Type: [{ TypeName: "unsignedInt" }] },
        { ElementName: "modality", Type: [{ TypeName: "Coding" }], Required: true },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "numberOfInstances", Type: [{ TypeName: "unsignedInt" }] },
        { ElementName: "endpoint", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Endpoint"] }], IsArray: true },
        { ElementName: "bodySite", Type: [{ TypeName: "Coding" }] },
        { ElementName: "laterality", Type: [{ TypeName: "Coding" }] },
        { ElementName: "specimen", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Specimen"] }], IsArray: true },
        { ElementName: "started", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "performer", Type: [{ TypeName: "imagingstudy_series_performer" }], IsArray: true },
        { ElementName: "instance", Type: [{ TypeName: "imagingstudy_series_instance" }], IsArray: true },
    ],
};

export const imagingstudy_series_performer: TypeModel = {
    TypeName: "imagingstudy_series_performer",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "function", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "actor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
    ],
};

export const imagingstudy_series_instance: TypeModel = {
    TypeName: "imagingstudy_series_instance",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "uid", Type: [{ TypeName: "id" }], Required: true },
        { ElementName: "sopClass", Type: [{ TypeName: "Coding" }], Required: true },
        { ElementName: "number", Type: [{ TypeName: "unsignedInt" }] },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
    ],
};

export const Immunization: TypeModel = {
    TypeName: "Immunization",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "statusReason", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "vaccineCode", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "patient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "occurrence[x]", Type: [{ TypeName: "dateTime" }, { TypeName: "string" }], Required: true },
        { ElementName: "recorded", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "primarySource", Type: [{ TypeName: "boolean" }] },
        { ElementName: "reportOrigin", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "location", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "manufacturer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "lotNumber", Type: [{ TypeName: "string" }] },
        { ElementName: "expirationDate", Type: [{ TypeName: "date" }] },
        { ElementName: "site", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "route", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "doseQuantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "performer", Type: [{ TypeName: "immunization_performer" }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "reasonCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "reasonReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Condition", "http://hl7.org/fhir/StructureDefinition/DiagnosticReport", "http://hl7.org/fhir/StructureDefinition/Observation"] }], IsArray: true },
        { ElementName: "isSubpotent", Type: [{ TypeName: "boolean" }] },
        { ElementName: "subpotentReason", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "education", Type: [{ TypeName: "immunization_education" }], IsArray: true },
        { ElementName: "programEligibility", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "fundingSource", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "reaction", Type: [{ TypeName: "immunization_reaction" }], IsArray: true },
        { ElementName: "protocolApplied", Type: [{ TypeName: "immunization_protocolApplied" }], IsArray: true },
    ],
};

export const immunization_performer: TypeModel = {
    TypeName: "immunization_performer",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "function", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "actor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }], Required: true },
    ],
};

export const immunization_education: TypeModel = {
    TypeName: "immunization_education",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "documentType", Type: [{ TypeName: "string" }] },
        { ElementName: "reference", Type: [{ TypeName: "uri" }] },
        { ElementName: "publicationDate", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "presentationDate", Type: [{ TypeName: "dateTime" }] },
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

export const immunization_protocolApplied: TypeModel = {
    TypeName: "immunization_protocolApplied",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "series", Type: [{ TypeName: "string" }] },
        { ElementName: "authority", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "targetDisease", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "doseNumber[x]", Type: [{ TypeName: "positiveInt" }, { TypeName: "string" }], Required: true },
        { ElementName: "seriesDoses[x]", Type: [{ TypeName: "positiveInt" }, { TypeName: "string" }] },
    ],
};

export const ImmunizationEvaluation: TypeModel = {
    TypeName: "ImmunizationEvaluation",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "patient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "authority", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "targetDisease", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "immunizationEvent", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Immunization"] }], Required: true },
        { ElementName: "doseStatus", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "doseStatusReason", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "series", Type: [{ TypeName: "string" }] },
        { ElementName: "doseNumber[x]", Type: [{ TypeName: "positiveInt" }, { TypeName: "string" }] },
        { ElementName: "seriesDoses[x]", Type: [{ TypeName: "positiveInt" }, { TypeName: "string" }] },
    ],
};

export const ImmunizationRecommendation: TypeModel = {
    TypeName: "ImmunizationRecommendation",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "patient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }], Required: true },
        { ElementName: "authority", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "recommendation", Type: [{ TypeName: "immunizationrecommendation_recommendation" }], IsArray: true, Required: true },
    ],
};

export const immunizationrecommendation_recommendation: TypeModel = {
    TypeName: "immunizationrecommendation_recommendation",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "vaccineCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "targetDisease", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "contraindicatedVaccineCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "forecastStatus", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "forecastReason", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "dateCriterion", Type: [{ TypeName: "immunizationrecommendation_recommendation_dateCriterion" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "series", Type: [{ TypeName: "string" }] },
        { ElementName: "doseNumber[x]", Type: [{ TypeName: "positiveInt" }, { TypeName: "string" }] },
        { ElementName: "seriesDoses[x]", Type: [{ TypeName: "positiveInt" }, { TypeName: "string" }] },
        { ElementName: "supportingImmunization", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Immunization", "http://hl7.org/fhir/StructureDefinition/ImmunizationEvaluation"] }], IsArray: true },
        { ElementName: "supportingPatientInformation", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
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

export const ImplementationGuide: TypeModel = {
    TypeName: "ImplementationGuide",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }], Required: true },
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
        { ElementName: "copyright", Type: [{ TypeName: "markdown" }] },
        { ElementName: "packageId", Type: [{ TypeName: "id" }], Required: true },
        { ElementName: "license", Type: [{ TypeName: "code" }] },
        { ElementName: "fhirVersion", Type: [{ TypeName: "code" }], IsArray: true, Required: true },
        { ElementName: "dependsOn", Type: [{ TypeName: "implementationguide_dependsOn" }], IsArray: true },
        { ElementName: "global", Type: [{ TypeName: "implementationguide_global" }], IsArray: true },
        { ElementName: "definition", Type: [{ TypeName: "implementationguide_definition" }] },
        { ElementName: "manifest", Type: [{ TypeName: "implementationguide_manifest" }] },
    ],
};

export const implementationguide_dependsOn: TypeModel = {
    TypeName: "implementationguide_dependsOn",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "uri", Type: [{ TypeName: "canonical" }], Required: true },
        { ElementName: "packageId", Type: [{ TypeName: "id" }] },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
    ],
};

export const implementationguide_global: TypeModel = {
    TypeName: "implementationguide_global",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "profile", Type: [{ TypeName: "canonical" }], Required: true },
    ],
};

export const implementationguide_definition: TypeModel = {
    TypeName: "implementationguide_definition",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "grouping", Type: [{ TypeName: "implementationguide_definition_grouping" }], IsArray: true },
        { ElementName: "resource", Type: [{ TypeName: "implementationguide_definition_resource" }], IsArray: true, Required: true },
        { ElementName: "page", Type: [{ TypeName: "implementationguide_definition_page" }] },
        { ElementName: "parameter", Type: [{ TypeName: "implementationguide_definition_parameter" }], IsArray: true },
        { ElementName: "template", Type: [{ TypeName: "implementationguide_definition_template" }], IsArray: true },
    ],
};

export const implementationguide_definition_grouping: TypeModel = {
    TypeName: "implementationguide_definition_grouping",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "name", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
    ],
};

export const implementationguide_definition_resource: TypeModel = {
    TypeName: "implementationguide_definition_resource",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "reference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], Required: true },
        { ElementName: "fhirVersion", Type: [{ TypeName: "code" }], IsArray: true },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "example[x]", Type: [{ TypeName: "boolean" }, { TypeName: "canonical" }] },
        { ElementName: "groupingId", Type: [{ TypeName: "id" }] },
    ],
};

export const implementationguide_definition_page: TypeModel = {
    TypeName: "implementationguide_definition_page",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "name[x]", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Binary"] }, { TypeName: "url" }], Required: true },
        { ElementName: "title", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "generation", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "page", Type: [{ TypeName: "implementationguide_definition_page" }], IsArray: true },
    ],
};

export const implementationguide_definition_parameter: TypeModel = {
    TypeName: "implementationguide_definition_parameter",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "value", Type: [{ TypeName: "string" }], Required: true },
    ],
};

export const implementationguide_definition_template: TypeModel = {
    TypeName: "implementationguide_definition_template",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "source", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "scope", Type: [{ TypeName: "string" }] },
    ],
};

export const implementationguide_manifest: TypeModel = {
    TypeName: "implementationguide_manifest",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "rendering", Type: [{ TypeName: "url" }] },
        { ElementName: "resource", Type: [{ TypeName: "implementationguide_manifest_resource" }], IsArray: true, Required: true },
        { ElementName: "page", Type: [{ TypeName: "implementationguide_manifest_page" }], IsArray: true },
        { ElementName: "image", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "other", Type: [{ TypeName: "string" }], IsArray: true },
    ],
};

export const implementationguide_manifest_resource: TypeModel = {
    TypeName: "implementationguide_manifest_resource",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "reference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], Required: true },
        { ElementName: "example[x]", Type: [{ TypeName: "boolean" }, { TypeName: "canonical" }] },
        { ElementName: "relativePath", Type: [{ TypeName: "url" }] },
    ],
};

export const implementationguide_manifest_page: TypeModel = {
    TypeName: "implementationguide_manifest_page",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "name", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "anchor", Type: [{ TypeName: "string" }], IsArray: true },
    ],
};

export const InsurancePlan: TypeModel = {
    TypeName: "InsurancePlan",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "alias", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "ownedBy", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "administeredBy", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "coverageArea", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }], IsArray: true },
        { ElementName: "contact", Type: [{ TypeName: "insuranceplan_contact" }], IsArray: true },
        { ElementName: "endpoint", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Endpoint"] }], IsArray: true },
        { ElementName: "network", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }], IsArray: true },
        { ElementName: "coverage", Type: [{ TypeName: "insuranceplan_coverage" }], IsArray: true },
        { ElementName: "plan", Type: [{ TypeName: "insuranceplan_plan" }], IsArray: true },
    ],
};

export const insuranceplan_contact: TypeModel = {
    TypeName: "insuranceplan_contact",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "purpose", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "name", Type: [{ TypeName: "HumanName" }] },
        { ElementName: "telecom", Type: [{ TypeName: "ContactPoint" }], IsArray: true },
        { ElementName: "address", Type: [{ TypeName: "Address" }] },
    ],
};

export const insuranceplan_coverage: TypeModel = {
    TypeName: "insuranceplan_coverage",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "network", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }], IsArray: true },
        { ElementName: "benefit", Type: [{ TypeName: "insuranceplan_coverage_benefit" }], IsArray: true, Required: true },
    ],
};

export const insuranceplan_coverage_benefit: TypeModel = {
    TypeName: "insuranceplan_coverage_benefit",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "requirement", Type: [{ TypeName: "string" }] },
        { ElementName: "limit", Type: [{ TypeName: "insuranceplan_coverage_benefit_limit" }], IsArray: true },
    ],
};

export const insuranceplan_coverage_benefit_limit: TypeModel = {
    TypeName: "insuranceplan_coverage_benefit_limit",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "value", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const insuranceplan_plan: TypeModel = {
    TypeName: "insuranceplan_plan",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "coverageArea", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }], IsArray: true },
        { ElementName: "network", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }], IsArray: true },
        { ElementName: "generalCost", Type: [{ TypeName: "insuranceplan_plan_generalCost" }], IsArray: true },
        { ElementName: "specificCost", Type: [{ TypeName: "insuranceplan_plan_specificCost" }], IsArray: true },
    ],
};

export const insuranceplan_plan_generalCost: TypeModel = {
    TypeName: "insuranceplan_plan_generalCost",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "groupSize", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "cost", Type: [{ TypeName: "Money" }] },
        { ElementName: "comment", Type: [{ TypeName: "string" }] },
    ],
};

export const insuranceplan_plan_specificCost: TypeModel = {
    TypeName: "insuranceplan_plan_specificCost",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "benefit", Type: [{ TypeName: "insuranceplan_plan_specificCost_benefit" }], IsArray: true },
    ],
};

export const insuranceplan_plan_specificCost_benefit: TypeModel = {
    TypeName: "insuranceplan_plan_specificCost_benefit",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "cost", Type: [{ TypeName: "insuranceplan_plan_specificCost_benefit_cost" }], IsArray: true },
    ],
};

export const insuranceplan_plan_specificCost_benefit_cost: TypeModel = {
    TypeName: "insuranceplan_plan_specificCost_benefit_cost",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "applicability", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "qualifiers", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "value", Type: [{ TypeName: "Quantity" }] },
    ],
};

export const Invoice: TypeModel = {
    TypeName: "Invoice",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "cancelledReason", Type: [{ TypeName: "string" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Patient"] }] },
        { ElementName: "recipient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "participant", Type: [{ TypeName: "invoice_participant" }], IsArray: true },
        { ElementName: "issuer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "account", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Account"] }] },
        { ElementName: "lineItem", Type: [{ TypeName: "invoice_lineItem" }], IsArray: true },
        { ElementName: "totalPriceComponent", Type: [{ TypeName: "invoice_lineItem_priceComponent" }], IsArray: true },
        { ElementName: "totalNet", Type: [{ TypeName: "Money" }] },
        { ElementName: "totalGross", Type: [{ TypeName: "Money" }] },
        { ElementName: "paymentTerms", Type: [{ TypeName: "markdown" }] },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
    ],
};

export const invoice_participant: TypeModel = {
    TypeName: "invoice_participant",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "actor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
    ],
};

export const invoice_lineItem: TypeModel = {
    TypeName: "invoice_lineItem",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "sequence", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "chargeItem[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ChargeItem"] }], Required: true },
        { ElementName: "priceComponent", Type: [{ TypeName: "invoice_lineItem_priceComponent" }], IsArray: true },
    ],
};

export const invoice_lineItem_priceComponent: TypeModel = {
    TypeName: "invoice_lineItem_priceComponent",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "factor", Type: [{ TypeName: "decimal" }] },
        { ElementName: "amount", Type: [{ TypeName: "Money" }] },
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
        { ElementName: "subtitle", Type: [{ TypeName: "string" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "experimental", Type: [{ TypeName: "boolean" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "subject[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "publisher", Type: [{ TypeName: "string" }] },
        { ElementName: "contact", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "useContext", Type: [{ TypeName: "UsageContext" }], IsArray: true },
        { ElementName: "jurisdiction", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "purpose", Type: [{ TypeName: "markdown" }] },
        { ElementName: "usage", Type: [{ TypeName: "string" }] },
        { ElementName: "copyright", Type: [{ TypeName: "markdown" }] },
        { ElementName: "approvalDate", Type: [{ TypeName: "date" }] },
        { ElementName: "lastReviewDate", Type: [{ TypeName: "date" }] },
        { ElementName: "effectivePeriod", Type: [{ TypeName: "Period" }] },
        { ElementName: "topic", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "author", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "editor", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "reviewer", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "endorser", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
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
        { ElementName: "author", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "item", Type: [{ TypeName: "linkage_item" }], IsArray: true, Required: true },
    ],
};

export const linkage_item: TypeModel = {
    TypeName: "linkage_item",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "resource", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], Required: true },
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
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Patient"] }] },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "source", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
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
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "telecom", Type: [{ TypeName: "ContactPoint" }], IsArray: true },
        { ElementName: "address", Type: [{ TypeName: "Address" }] },
        { ElementName: "physicalType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "position", Type: [{ TypeName: "location_position" }] },
        { ElementName: "managingOrganization", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "partOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "hoursOfOperation", Type: [{ TypeName: "location_hoursOfOperation" }], IsArray: true },
        { ElementName: "availabilityExceptions", Type: [{ TypeName: "string" }] },
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

export const location_hoursOfOperation: TypeModel = {
    TypeName: "location_hoursOfOperation",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "daysOfWeek", Type: [{ TypeName: "code" }], IsArray: true },
        { ElementName: "allDay", Type: [{ TypeName: "boolean" }] },
        { ElementName: "openingTime", Type: [{ TypeName: "time" }] },
        { ElementName: "closingTime", Type: [{ TypeName: "time" }] },
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
        { ElementName: "subtitle", Type: [{ TypeName: "string" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "experimental", Type: [{ TypeName: "boolean" }] },
        { ElementName: "subject[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "publisher", Type: [{ TypeName: "string" }] },
        { ElementName: "contact", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "useContext", Type: [{ TypeName: "UsageContext" }], IsArray: true },
        { ElementName: "jurisdiction", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "purpose", Type: [{ TypeName: "markdown" }] },
        { ElementName: "usage", Type: [{ TypeName: "string" }] },
        { ElementName: "copyright", Type: [{ TypeName: "markdown" }] },
        { ElementName: "approvalDate", Type: [{ TypeName: "date" }] },
        { ElementName: "lastReviewDate", Type: [{ TypeName: "date" }] },
        { ElementName: "effectivePeriod", Type: [{ TypeName: "Period" }] },
        { ElementName: "topic", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "author", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "editor", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "reviewer", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "endorser", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "relatedArtifact", Type: [{ TypeName: "RelatedArtifact" }], IsArray: true },
        { ElementName: "library", Type: [{ TypeName: "canonical" }], IsArray: true },
        { ElementName: "disclaimer", Type: [{ TypeName: "markdown" }] },
        { ElementName: "scoring", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "compositeScoring", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "riskAdjustment", Type: [{ TypeName: "string" }] },
        { ElementName: "rateAggregation", Type: [{ TypeName: "string" }] },
        { ElementName: "rationale", Type: [{ TypeName: "markdown" }] },
        { ElementName: "clinicalRecommendationStatement", Type: [{ TypeName: "markdown" }] },
        { ElementName: "improvementNotation", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "definition", Type: [{ TypeName: "markdown" }], IsArray: true },
        { ElementName: "guidance", Type: [{ TypeName: "markdown" }] },
        { ElementName: "group", Type: [{ TypeName: "measure_group" }], IsArray: true },
        { ElementName: "supplementalData", Type: [{ TypeName: "measure_supplementalData" }], IsArray: true },
    ],
};

export const measure_group: TypeModel = {
    TypeName: "measure_group",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "population", Type: [{ TypeName: "measure_group_population" }], IsArray: true },
        { ElementName: "stratifier", Type: [{ TypeName: "measure_group_stratifier" }], IsArray: true },
    ],
};

export const measure_group_population: TypeModel = {
    TypeName: "measure_group_population",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "criteria", Type: [{ TypeName: "Expression" }], Required: true },
    ],
};

export const measure_group_stratifier: TypeModel = {
    TypeName: "measure_group_stratifier",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "criteria", Type: [{ TypeName: "Expression" }] },
        { ElementName: "component", Type: [{ TypeName: "measure_group_stratifier_component" }], IsArray: true },
    ],
};

export const measure_group_stratifier_component: TypeModel = {
    TypeName: "measure_group_stratifier_component",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "criteria", Type: [{ TypeName: "Expression" }], Required: true },
    ],
};

export const measure_supplementalData: TypeModel = {
    TypeName: "measure_supplementalData",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "usage", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "criteria", Type: [{ TypeName: "Expression" }], Required: true },
    ],
};

export const MeasureReport: TypeModel = {
    TypeName: "MeasureReport",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "measure", Type: [{ TypeName: "canonical" }], Required: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "reporter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "period", Type: [{ TypeName: "Period" }], Required: true },
        { ElementName: "improvementNotation", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "group", Type: [{ TypeName: "measurereport_group" }], IsArray: true },
        { ElementName: "evaluatedResource", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
    ],
};

export const measurereport_group: TypeModel = {
    TypeName: "measurereport_group",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "population", Type: [{ TypeName: "measurereport_group_population" }], IsArray: true },
        { ElementName: "measureScore", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "stratifier", Type: [{ TypeName: "measurereport_group_stratifier" }], IsArray: true },
    ],
};

export const measurereport_group_population: TypeModel = {
    TypeName: "measurereport_group_population",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "count", Type: [{ TypeName: "integer" }] },
        { ElementName: "subjectResults", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/List"] }] },
    ],
};

export const measurereport_group_stratifier: TypeModel = {
    TypeName: "measurereport_group_stratifier",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "stratum", Type: [{ TypeName: "measurereport_group_stratifier_stratum" }], IsArray: true },
    ],
};

export const measurereport_group_stratifier_stratum: TypeModel = {
    TypeName: "measurereport_group_stratifier_stratum",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "value", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "component", Type: [{ TypeName: "measurereport_group_stratifier_stratum_component" }], IsArray: true },
        { ElementName: "population", Type: [{ TypeName: "measurereport_group_stratifier_stratum_population" }], IsArray: true },
        { ElementName: "measureScore", Type: [{ TypeName: "Quantity" }] },
    ],
};

export const measurereport_group_stratifier_stratum_component: TypeModel = {
    TypeName: "measurereport_group_stratifier_stratum_component",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "value", Type: [{ TypeName: "CodeableConcept" }], Required: true },
    ],
};

export const measurereport_group_stratifier_stratum_population: TypeModel = {
    TypeName: "measurereport_group_stratifier_stratum_population",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "count", Type: [{ TypeName: "integer" }] },
        { ElementName: "subjectResults", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/List"] }] },
    ],
};

export const Media: TypeModel = {
    TypeName: "Media",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "basedOn", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CarePlan", "http://hl7.org/fhir/StructureDefinition/ServiceRequest"] }], IsArray: true },
        { ElementName: "partOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "modality", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "view", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/Specimen"] }] },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "created[x]", Type: [{ TypeName: "Period" }, { TypeName: "dateTime" }] },
        { ElementName: "issued", Type: [{ TypeName: "instant" }] },
        { ElementName: "operator", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "reasonCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "bodySite", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "deviceName", Type: [{ TypeName: "string" }] },
        { ElementName: "device", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/DeviceMetric"] }] },
        { ElementName: "height", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "width", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "frames", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "duration", Type: [{ TypeName: "decimal" }] },
        { ElementName: "content", Type: [{ TypeName: "Attachment" }], Required: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
    ],
};

export const Medication: TypeModel = {
    TypeName: "Medication",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }] },
        { ElementName: "manufacturer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "form", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "amount", Type: [{ TypeName: "Ratio" }] },
        { ElementName: "ingredient", Type: [{ TypeName: "medication_ingredient" }], IsArray: true },
        { ElementName: "batch", Type: [{ TypeName: "medication_batch" }] },
    ],
};

export const medication_ingredient: TypeModel = {
    TypeName: "medication_ingredient",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "item[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Medication", "http://hl7.org/fhir/StructureDefinition/Substance"] }], Required: true },
        { ElementName: "isActive", Type: [{ TypeName: "boolean" }] },
        { ElementName: "strength", Type: [{ TypeName: "Ratio" }] },
    ],
};

export const medication_batch: TypeModel = {
    TypeName: "medication_batch",
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
        { ElementName: "instantiates", Type: [{ TypeName: "uri" }], IsArray: true },
        { ElementName: "partOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MedicationAdministration", "http://hl7.org/fhir/StructureDefinition/Procedure"] }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "statusReason", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "medication[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Medication"] }], Required: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
        { ElementName: "context", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter", "http://hl7.org/fhir/StructureDefinition/EpisodeOfCare"] }] },
        { ElementName: "supportingInformation", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "effective[x]", Type: [{ TypeName: "Period" }, { TypeName: "dateTime" }], Required: true },
        { ElementName: "performer", Type: [{ TypeName: "medicationadministration_performer" }], IsArray: true },
        { ElementName: "reasonCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "reasonReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Condition", "http://hl7.org/fhir/StructureDefinition/DiagnosticReport", "http://hl7.org/fhir/StructureDefinition/Observation"] }], IsArray: true },
        { ElementName: "request", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MedicationRequest"] }] },
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
        { ElementName: "function", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "actor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
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
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "statusReason[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DetectedIssue"] }] },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "medication[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Medication"] }], Required: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Patient"] }] },
        { ElementName: "context", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter", "http://hl7.org/fhir/StructureDefinition/EpisodeOfCare"] }] },
        { ElementName: "supportingInformation", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "performer", Type: [{ TypeName: "medicationdispense_performer" }], IsArray: true },
        { ElementName: "location", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "authorizingPrescription", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MedicationRequest"] }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "daysSupply", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "whenPrepared", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "whenHandedOver", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "destination", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "receiver", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner"] }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "dosageInstruction", Type: [{ TypeName: "Dosage" }], IsArray: true },
        { ElementName: "substitution", Type: [{ TypeName: "medicationdispense_substitution" }] },
        { ElementName: "detectedIssue", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DetectedIssue"] }], IsArray: true },
        { ElementName: "eventHistory", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Provenance"] }], IsArray: true },
    ],
};

export const medicationdispense_performer: TypeModel = {
    TypeName: "medicationdispense_performer",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "function", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "actor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
    ],
};

export const medicationdispense_substitution: TypeModel = {
    TypeName: "medicationdispense_substitution",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "wasSubstituted", Type: [{ TypeName: "boolean" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "reason", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "responsibleParty", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }], IsArray: true },
    ],
};

export const MedicationKnowledge: TypeModel = {
    TypeName: "MedicationKnowledge",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }] },
        { ElementName: "manufacturer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "doseForm", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "amount", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "synonym", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "relatedMedicationKnowledge", Type: [{ TypeName: "medicationknowledge_relatedMedicationKnowledge" }], IsArray: true },
        { ElementName: "associatedMedication", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Medication"] }], IsArray: true },
        { ElementName: "productType", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "monograph", Type: [{ TypeName: "medicationknowledge_monograph" }], IsArray: true },
        { ElementName: "ingredient", Type: [{ TypeName: "medicationknowledge_ingredient" }], IsArray: true },
        { ElementName: "preparationInstruction", Type: [{ TypeName: "markdown" }] },
        { ElementName: "intendedRoute", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "cost", Type: [{ TypeName: "medicationknowledge_cost" }], IsArray: true },
        { ElementName: "monitoringProgram", Type: [{ TypeName: "medicationknowledge_monitoringProgram" }], IsArray: true },
        { ElementName: "administrationGuidelines", Type: [{ TypeName: "medicationknowledge_administrationGuidelines" }], IsArray: true },
        { ElementName: "medicineClassification", Type: [{ TypeName: "medicationknowledge_medicineClassification" }], IsArray: true },
        { ElementName: "packaging", Type: [{ TypeName: "medicationknowledge_packaging" }] },
        { ElementName: "drugCharacteristic", Type: [{ TypeName: "medicationknowledge_drugCharacteristic" }], IsArray: true },
        { ElementName: "contraindication", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DetectedIssue"] }], IsArray: true },
        { ElementName: "regulatory", Type: [{ TypeName: "medicationknowledge_regulatory" }], IsArray: true },
        { ElementName: "kinetics", Type: [{ TypeName: "medicationknowledge_kinetics" }], IsArray: true },
    ],
};

export const medicationknowledge_relatedMedicationKnowledge: TypeModel = {
    TypeName: "medicationknowledge_relatedMedicationKnowledge",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "reference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MedicationKnowledge"] }], IsArray: true, Required: true },
    ],
};

export const medicationknowledge_monograph: TypeModel = {
    TypeName: "medicationknowledge_monograph",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "source", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DocumentReference", "http://hl7.org/fhir/StructureDefinition/Media"] }] },
    ],
};

export const medicationknowledge_ingredient: TypeModel = {
    TypeName: "medicationknowledge_ingredient",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "item[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Substance"] }], Required: true },
        { ElementName: "isActive", Type: [{ TypeName: "boolean" }] },
        { ElementName: "strength", Type: [{ TypeName: "Ratio" }] },
    ],
};

export const medicationknowledge_cost: TypeModel = {
    TypeName: "medicationknowledge_cost",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "source", Type: [{ TypeName: "string" }] },
        { ElementName: "cost", Type: [{ TypeName: "Money" }], Required: true },
    ],
};

export const medicationknowledge_monitoringProgram: TypeModel = {
    TypeName: "medicationknowledge_monitoringProgram",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
    ],
};

export const medicationknowledge_administrationGuidelines: TypeModel = {
    TypeName: "medicationknowledge_administrationGuidelines",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "dosage", Type: [{ TypeName: "medicationknowledge_administrationGuidelines_dosage" }], IsArray: true },
        { ElementName: "indication[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ObservationDefinition"] }] },
        { ElementName: "patientCharacteristics", Type: [{ TypeName: "medicationknowledge_administrationGuidelines_patientCharacteristics" }], IsArray: true },
    ],
};

export const medicationknowledge_administrationGuidelines_dosage: TypeModel = {
    TypeName: "medicationknowledge_administrationGuidelines_dosage",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "dosage", Type: [{ TypeName: "Dosage" }], IsArray: true, Required: true },
    ],
};

export const medicationknowledge_administrationGuidelines_patientCharacteristics: TypeModel = {
    TypeName: "medicationknowledge_administrationGuidelines_patientCharacteristics",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "characteristic[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Quantity" }], Required: true },
        { ElementName: "value", Type: [{ TypeName: "string" }], IsArray: true },
    ],
};

export const medicationknowledge_medicineClassification: TypeModel = {
    TypeName: "medicationknowledge_medicineClassification",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "classification", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
    ],
};

export const medicationknowledge_packaging: TypeModel = {
    TypeName: "medicationknowledge_packaging",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
    ],
};

export const medicationknowledge_drugCharacteristic: TypeModel = {
    TypeName: "medicationknowledge_drugCharacteristic",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "value[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Quantity" }, { TypeName: "base64Binary" }, { TypeName: "string" }] },
    ],
};

export const medicationknowledge_regulatory: TypeModel = {
    TypeName: "medicationknowledge_regulatory",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "regulatoryAuthority", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }], Required: true },
        { ElementName: "substitution", Type: [{ TypeName: "medicationknowledge_regulatory_substitution" }], IsArray: true },
        { ElementName: "schedule", Type: [{ TypeName: "medicationknowledge_regulatory_schedule" }], IsArray: true },
        { ElementName: "maxDispense", Type: [{ TypeName: "medicationknowledge_regulatory_maxDispense" }] },
    ],
};

export const medicationknowledge_regulatory_substitution: TypeModel = {
    TypeName: "medicationknowledge_regulatory_substitution",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "allowed", Type: [{ TypeName: "boolean" }], Required: true },
    ],
};

export const medicationknowledge_regulatory_schedule: TypeModel = {
    TypeName: "medicationknowledge_regulatory_schedule",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "schedule", Type: [{ TypeName: "CodeableConcept" }], Required: true },
    ],
};

export const medicationknowledge_regulatory_maxDispense: TypeModel = {
    TypeName: "medicationknowledge_regulatory_maxDispense",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }], Required: true },
        { ElementName: "period", Type: [{ TypeName: "Duration" }] },
    ],
};

export const medicationknowledge_kinetics: TypeModel = {
    TypeName: "medicationknowledge_kinetics",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "areaUnderCurve", Type: [{ TypeName: "Quantity" }], IsArray: true },
        { ElementName: "lethalDose50", Type: [{ TypeName: "Quantity" }], IsArray: true },
        { ElementName: "halfLifePeriod", Type: [{ TypeName: "Duration" }] },
    ],
};

export const MedicationRequest: TypeModel = {
    TypeName: "MedicationRequest",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "statusReason", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "intent", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "priority", Type: [{ TypeName: "code" }] },
        { ElementName: "doNotPerform", Type: [{ TypeName: "boolean" }] },
        { ElementName: "reported[x]", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }, { TypeName: "boolean" }] },
        { ElementName: "medication[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Medication"] }], Required: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "supportingInformation", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "authoredOn", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "requester", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "performer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "performerType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "recorder", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "reasonCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "reasonReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Condition", "http://hl7.org/fhir/StructureDefinition/Observation"] }], IsArray: true },
        { ElementName: "instantiatesCanonical", Type: [{ TypeName: "canonical" }], IsArray: true },
        { ElementName: "instantiatesUri", Type: [{ TypeName: "uri" }], IsArray: true },
        { ElementName: "basedOn", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CarePlan", "http://hl7.org/fhir/StructureDefinition/ImmunizationRecommendation", "http://hl7.org/fhir/StructureDefinition/MedicationRequest", "http://hl7.org/fhir/StructureDefinition/ServiceRequest"] }], IsArray: true },
        { ElementName: "groupIdentifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "courseOfTherapyType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "insurance", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ClaimResponse", "http://hl7.org/fhir/StructureDefinition/Coverage"] }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "dosageInstruction", Type: [{ TypeName: "Dosage" }], IsArray: true },
        { ElementName: "dispenseRequest", Type: [{ TypeName: "medicationrequest_dispenseRequest" }] },
        { ElementName: "substitution", Type: [{ TypeName: "medicationrequest_substitution" }] },
        { ElementName: "priorPrescription", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MedicationRequest"] }] },
        { ElementName: "detectedIssue", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DetectedIssue"] }], IsArray: true },
        { ElementName: "eventHistory", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Provenance"] }], IsArray: true },
    ],
};

export const medicationrequest_dispenseRequest: TypeModel = {
    TypeName: "medicationrequest_dispenseRequest",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "initialFill", Type: [{ TypeName: "medicationrequest_dispenseRequest_initialFill" }] },
        { ElementName: "dispenseInterval", Type: [{ TypeName: "Duration" }] },
        { ElementName: "validityPeriod", Type: [{ TypeName: "Period" }] },
        { ElementName: "numberOfRepeatsAllowed", Type: [{ TypeName: "unsignedInt" }] },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "expectedSupplyDuration", Type: [{ TypeName: "Duration" }] },
        { ElementName: "performer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
    ],
};

export const medicationrequest_dispenseRequest_initialFill: TypeModel = {
    TypeName: "medicationrequest_dispenseRequest_initialFill",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "duration", Type: [{ TypeName: "Duration" }] },
    ],
};

export const medicationrequest_substitution: TypeModel = {
    TypeName: "medicationrequest_substitution",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "allowed[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "boolean" }], Required: true },
        { ElementName: "reason", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const MedicationStatement: TypeModel = {
    TypeName: "MedicationStatement",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "basedOn", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CarePlan", "http://hl7.org/fhir/StructureDefinition/MedicationRequest", "http://hl7.org/fhir/StructureDefinition/ServiceRequest"] }], IsArray: true },
        { ElementName: "partOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MedicationAdministration", "http://hl7.org/fhir/StructureDefinition/MedicationDispense", "http://hl7.org/fhir/StructureDefinition/MedicationStatement", "http://hl7.org/fhir/StructureDefinition/Observation", "http://hl7.org/fhir/StructureDefinition/Procedure"] }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "statusReason", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "medication[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Medication"] }], Required: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
        { ElementName: "context", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter", "http://hl7.org/fhir/StructureDefinition/EpisodeOfCare"] }] },
        { ElementName: "effective[x]", Type: [{ TypeName: "Period" }, { TypeName: "dateTime" }] },
        { ElementName: "dateAsserted", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "informationSource", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "derivedFrom", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "reasonCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "reasonReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Condition", "http://hl7.org/fhir/StructureDefinition/DiagnosticReport", "http://hl7.org/fhir/StructureDefinition/Observation"] }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "dosage", Type: [{ TypeName: "Dosage" }], IsArray: true },
    ],
};

export const MedicinalProduct: TypeModel = {
    TypeName: "MedicinalProduct",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "domain", Type: [{ TypeName: "Coding" }] },
        { ElementName: "combinedPharmaceuticalDoseForm", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "legalStatusOfSupply", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "additionalMonitoringIndicator", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "specialMeasures", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "paediatricUseIndicator", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "productClassification", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "marketingStatus", Type: [{ TypeName: "MarketingStatus" }], IsArray: true },
        { ElementName: "pharmaceuticalProduct", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MedicinalProductPharmaceutical"] }], IsArray: true },
        { ElementName: "packagedMedicinalProduct", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MedicinalProductPackaged"] }], IsArray: true },
        { ElementName: "attachedDocument", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DocumentReference"] }], IsArray: true },
        { ElementName: "masterFile", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DocumentReference"] }], IsArray: true },
        { ElementName: "contact", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }], IsArray: true },
        { ElementName: "clinicalTrial", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ResearchStudy"] }], IsArray: true },
        { ElementName: "name", Type: [{ TypeName: "medicinalproduct_name" }], IsArray: true, Required: true },
        { ElementName: "crossReference", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "manufacturingBusinessOperation", Type: [{ TypeName: "medicinalproduct_manufacturingBusinessOperation" }], IsArray: true },
        { ElementName: "specialDesignation", Type: [{ TypeName: "medicinalproduct_specialDesignation" }], IsArray: true },
    ],
};

export const medicinalproduct_name: TypeModel = {
    TypeName: "medicinalproduct_name",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "productName", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "namePart", Type: [{ TypeName: "medicinalproduct_name_namePart" }], IsArray: true },
        { ElementName: "countryLanguage", Type: [{ TypeName: "medicinalproduct_name_countryLanguage" }], IsArray: true },
    ],
};

export const medicinalproduct_name_namePart: TypeModel = {
    TypeName: "medicinalproduct_name_namePart",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "part", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "Coding" }], Required: true },
    ],
};

export const medicinalproduct_name_countryLanguage: TypeModel = {
    TypeName: "medicinalproduct_name_countryLanguage",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "country", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "jurisdiction", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "language", Type: [{ TypeName: "CodeableConcept" }], Required: true },
    ],
};

export const medicinalproduct_manufacturingBusinessOperation: TypeModel = {
    TypeName: "medicinalproduct_manufacturingBusinessOperation",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "operationType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "authorisationReferenceNumber", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "effectiveDate", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "confidentialityIndicator", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "manufacturer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }], IsArray: true },
        { ElementName: "regulator", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
    ],
};

export const medicinalproduct_specialDesignation: TypeModel = {
    TypeName: "medicinalproduct_specialDesignation",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "intendedUse", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "indication[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MedicinalProductIndication"] }] },
        { ElementName: "status", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "species", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const MedicinalProductAuthorization: TypeModel = {
    TypeName: "MedicinalProductAuthorization",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MedicinalProduct", "http://hl7.org/fhir/StructureDefinition/MedicinalProductPackaged"] }] },
        { ElementName: "country", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "jurisdiction", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "statusDate", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "restoreDate", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "validityPeriod", Type: [{ TypeName: "Period" }] },
        { ElementName: "dataExclusivityPeriod", Type: [{ TypeName: "Period" }] },
        { ElementName: "dateOfFirstAuthorization", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "internationalBirthDate", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "legalBasis", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "jurisdictionalAuthorization", Type: [{ TypeName: "medicinalproductauthorization_jurisdictionalAuthorization" }], IsArray: true },
        { ElementName: "holder", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "regulator", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "procedure", Type: [{ TypeName: "medicinalproductauthorization_procedure" }] },
    ],
};

export const medicinalproductauthorization_jurisdictionalAuthorization: TypeModel = {
    TypeName: "medicinalproductauthorization_jurisdictionalAuthorization",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "country", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "jurisdiction", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "legalStatusOfSupply", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "validityPeriod", Type: [{ TypeName: "Period" }] },
    ],
};

export const medicinalproductauthorization_procedure: TypeModel = {
    TypeName: "medicinalproductauthorization_procedure",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "date[x]", Type: [{ TypeName: "Period" }, { TypeName: "dateTime" }] },
        { ElementName: "application", Type: [{ TypeName: "medicinalproductauthorization_procedure" }], IsArray: true },
    ],
};

export const MedicinalProductContraindication: TypeModel = {
    TypeName: "MedicinalProductContraindication",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Medication", "http://hl7.org/fhir/StructureDefinition/MedicinalProduct"] }], IsArray: true },
        { ElementName: "disease", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "diseaseStatus", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "comorbidity", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "therapeuticIndication", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MedicinalProductIndication"] }], IsArray: true },
        { ElementName: "otherTherapy", Type: [{ TypeName: "medicinalproductcontraindication_otherTherapy" }], IsArray: true },
        { ElementName: "population", Type: [{ TypeName: "Population" }], IsArray: true },
    ],
};

export const medicinalproductcontraindication_otherTherapy: TypeModel = {
    TypeName: "medicinalproductcontraindication_otherTherapy",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "therapyRelationshipType", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "medication[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Medication", "http://hl7.org/fhir/StructureDefinition/MedicinalProduct", "http://hl7.org/fhir/StructureDefinition/Substance", "http://hl7.org/fhir/StructureDefinition/SubstanceSpecification"] }], Required: true },
    ],
};

export const MedicinalProductIndication: TypeModel = {
    TypeName: "MedicinalProductIndication",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Medication", "http://hl7.org/fhir/StructureDefinition/MedicinalProduct"] }], IsArray: true },
        { ElementName: "diseaseSymptomProcedure", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "diseaseStatus", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "comorbidity", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "intendedEffect", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "duration", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "otherTherapy", Type: [{ TypeName: "medicinalproductindication_otherTherapy" }], IsArray: true },
        { ElementName: "undesirableEffect", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MedicinalProductUndesirableEffect"] }], IsArray: true },
        { ElementName: "population", Type: [{ TypeName: "Population" }], IsArray: true },
    ],
};

export const medicinalproductindication_otherTherapy: TypeModel = {
    TypeName: "medicinalproductindication_otherTherapy",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "therapyRelationshipType", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "medication[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Medication", "http://hl7.org/fhir/StructureDefinition/MedicinalProduct", "http://hl7.org/fhir/StructureDefinition/Substance", "http://hl7.org/fhir/StructureDefinition/SubstanceSpecification"] }], Required: true },
    ],
};

export const MedicinalProductIngredient: TypeModel = {
    TypeName: "MedicinalProductIngredient",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "allergenicIndicator", Type: [{ TypeName: "boolean" }] },
        { ElementName: "manufacturer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }], IsArray: true },
        { ElementName: "specifiedSubstance", Type: [{ TypeName: "medicinalproductingredient_specifiedSubstance" }], IsArray: true },
        { ElementName: "substance", Type: [{ TypeName: "medicinalproductingredient_substance" }] },
    ],
};

export const medicinalproductingredient_specifiedSubstance: TypeModel = {
    TypeName: "medicinalproductingredient_specifiedSubstance",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "group", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "confidentiality", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "strength", Type: [{ TypeName: "medicinalproductingredient_specifiedSubstance_strength" }], IsArray: true },
    ],
};

export const medicinalproductingredient_specifiedSubstance_strength: TypeModel = {
    TypeName: "medicinalproductingredient_specifiedSubstance_strength",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "presentation", Type: [{ TypeName: "Ratio" }], Required: true },
        { ElementName: "presentationLowLimit", Type: [{ TypeName: "Ratio" }] },
        { ElementName: "concentration", Type: [{ TypeName: "Ratio" }] },
        { ElementName: "concentrationLowLimit", Type: [{ TypeName: "Ratio" }] },
        { ElementName: "measurementPoint", Type: [{ TypeName: "string" }] },
        { ElementName: "country", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "referenceStrength", Type: [{ TypeName: "medicinalproductingredient_specifiedSubstance_strength_referenceStrength" }], IsArray: true },
    ],
};

export const medicinalproductingredient_specifiedSubstance_strength_referenceStrength: TypeModel = {
    TypeName: "medicinalproductingredient_specifiedSubstance_strength_referenceStrength",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "substance", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "strength", Type: [{ TypeName: "Ratio" }], Required: true },
        { ElementName: "strengthLowLimit", Type: [{ TypeName: "Ratio" }] },
        { ElementName: "measurementPoint", Type: [{ TypeName: "string" }] },
        { ElementName: "country", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
    ],
};

export const medicinalproductingredient_substance: TypeModel = {
    TypeName: "medicinalproductingredient_substance",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "strength", Type: [{ TypeName: "medicinalproductingredient_specifiedSubstance_strength" }], IsArray: true },
    ],
};

export const MedicinalProductInteraction: TypeModel = {
    TypeName: "MedicinalProductInteraction",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Medication", "http://hl7.org/fhir/StructureDefinition/MedicinalProduct", "http://hl7.org/fhir/StructureDefinition/Substance"] }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "interactant", Type: [{ TypeName: "medicinalproductinteraction_interactant" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "effect", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "incidence", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "management", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const medicinalproductinteraction_interactant: TypeModel = {
    TypeName: "medicinalproductinteraction_interactant",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "item[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Medication", "http://hl7.org/fhir/StructureDefinition/MedicinalProduct", "http://hl7.org/fhir/StructureDefinition/ObservationDefinition", "http://hl7.org/fhir/StructureDefinition/Substance"] }], Required: true },
    ],
};

export const MedicinalProductManufactured: TypeModel = {
    TypeName: "MedicinalProductManufactured",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "manufacturedDoseForm", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "unitOfPresentation", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }], Required: true },
        { ElementName: "manufacturer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }], IsArray: true },
        { ElementName: "ingredient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MedicinalProductIngredient"] }], IsArray: true },
        { ElementName: "physicalCharacteristics", Type: [{ TypeName: "ProdCharacteristic" }] },
        { ElementName: "otherCharacteristics", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
    ],
};

export const MedicinalProductPackaged: TypeModel = {
    TypeName: "MedicinalProductPackaged",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MedicinalProduct"] }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "legalStatusOfSupply", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "marketingStatus", Type: [{ TypeName: "MarketingStatus" }], IsArray: true },
        { ElementName: "marketingAuthorization", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MedicinalProductAuthorization"] }] },
        { ElementName: "manufacturer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }], IsArray: true },
        { ElementName: "batchIdentifier", Type: [{ TypeName: "medicinalproductpackaged_batchIdentifier" }], IsArray: true },
        { ElementName: "packageItem", Type: [{ TypeName: "medicinalproductpackaged_packageItem" }], IsArray: true, Required: true },
    ],
};

export const medicinalproductpackaged_batchIdentifier: TypeModel = {
    TypeName: "medicinalproductpackaged_batchIdentifier",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "outerPackaging", Type: [{ TypeName: "Identifier" }], Required: true },
        { ElementName: "immediatePackaging", Type: [{ TypeName: "Identifier" }] },
    ],
};

export const medicinalproductpackaged_packageItem: TypeModel = {
    TypeName: "medicinalproductpackaged_packageItem",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }], Required: true },
        { ElementName: "material", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "alternateMaterial", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "device", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DeviceDefinition"] }], IsArray: true },
        { ElementName: "manufacturedItem", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MedicinalProductManufactured"] }], IsArray: true },
        { ElementName: "packageItem", Type: [{ TypeName: "medicinalproductpackaged_packageItem" }], IsArray: true },
        { ElementName: "physicalCharacteristics", Type: [{ TypeName: "ProdCharacteristic" }] },
        { ElementName: "otherCharacteristics", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "shelfLifeStorage", Type: [{ TypeName: "ProductShelfLife" }], IsArray: true },
        { ElementName: "manufacturer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }], IsArray: true },
    ],
};

export const MedicinalProductPharmaceutical: TypeModel = {
    TypeName: "MedicinalProductPharmaceutical",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "administrableDoseForm", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "unitOfPresentation", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "ingredient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MedicinalProductIngredient"] }], IsArray: true },
        { ElementName: "device", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DeviceDefinition"] }], IsArray: true },
        { ElementName: "characteristics", Type: [{ TypeName: "medicinalproductpharmaceutical_characteristics" }], IsArray: true },
        { ElementName: "routeOfAdministration", Type: [{ TypeName: "medicinalproductpharmaceutical_routeOfAdministration" }], IsArray: true, Required: true },
    ],
};

export const medicinalproductpharmaceutical_characteristics: TypeModel = {
    TypeName: "medicinalproductpharmaceutical_characteristics",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "status", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const medicinalproductpharmaceutical_routeOfAdministration: TypeModel = {
    TypeName: "medicinalproductpharmaceutical_routeOfAdministration",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "firstDose", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "maxSingleDose", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "maxDosePerDay", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "maxDosePerTreatmentPeriod", Type: [{ TypeName: "Ratio" }] },
        { ElementName: "maxTreatmentPeriod", Type: [{ TypeName: "Duration" }] },
        { ElementName: "targetSpecies", Type: [{ TypeName: "medicinalproductpharmaceutical_routeOfAdministration_targetSpecies" }], IsArray: true },
    ],
};

export const medicinalproductpharmaceutical_routeOfAdministration_targetSpecies: TypeModel = {
    TypeName: "medicinalproductpharmaceutical_routeOfAdministration_targetSpecies",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "withdrawalPeriod", Type: [{ TypeName: "medicinalproductpharmaceutical_routeOfAdministration_targetSpecies_withdrawalPeriod" }], IsArray: true },
    ],
};

export const medicinalproductpharmaceutical_routeOfAdministration_targetSpecies_withdrawalPeriod: TypeModel = {
    TypeName: "medicinalproductpharmaceutical_routeOfAdministration_targetSpecies_withdrawalPeriod",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "tissue", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "value", Type: [{ TypeName: "Quantity" }], Required: true },
        { ElementName: "supportingInformation", Type: [{ TypeName: "string" }] },
    ],
};

export const MedicinalProductUndesirableEffect: TypeModel = {
    TypeName: "MedicinalProductUndesirableEffect",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Medication", "http://hl7.org/fhir/StructureDefinition/MedicinalProduct"] }], IsArray: true },
        { ElementName: "symptomConditionEffect", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "classification", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "frequencyOfOccurrence", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "population", Type: [{ TypeName: "Population" }], IsArray: true },
    ],
};

export const MessageDefinition: TypeModel = {
    TypeName: "MessageDefinition",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "replaces", Type: [{ TypeName: "canonical" }], IsArray: true },
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
        { ElementName: "base", Type: [{ TypeName: "canonical" }] },
        { ElementName: "parent", Type: [{ TypeName: "canonical" }], IsArray: true },
        { ElementName: "event[x]", Type: [{ TypeName: "Coding" }, { TypeName: "uri" }], Required: true },
        { ElementName: "category", Type: [{ TypeName: "code" }] },
        { ElementName: "focus", Type: [{ TypeName: "messagedefinition_focus" }], IsArray: true },
        { ElementName: "responseRequired", Type: [{ TypeName: "code" }] },
        { ElementName: "allowedResponse", Type: [{ TypeName: "messagedefinition_allowedResponse" }], IsArray: true },
        { ElementName: "graph", Type: [{ TypeName: "canonical" }], IsArray: true },
    ],
};

export const messagedefinition_focus: TypeModel = {
    TypeName: "messagedefinition_focus",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "profile", Type: [{ TypeName: "canonical" }] },
        { ElementName: "min", Type: [{ TypeName: "unsignedInt" }], Required: true },
        { ElementName: "max", Type: [{ TypeName: "string" }] },
    ],
};

export const messagedefinition_allowedResponse: TypeModel = {
    TypeName: "messagedefinition_allowedResponse",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "message", Type: [{ TypeName: "canonical" }], Required: true },
        { ElementName: "situation", Type: [{ TypeName: "markdown" }] },
    ],
};

export const MessageHeader: TypeModel = {
    TypeName: "MessageHeader",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "event[x]", Type: [{ TypeName: "Coding" }, { TypeName: "uri" }], Required: true },
        { ElementName: "destination", Type: [{ TypeName: "messageheader_destination" }], IsArray: true },
        { ElementName: "sender", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "enterer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "author", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "source", Type: [{ TypeName: "messageheader_source" }], Required: true },
        { ElementName: "responsible", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "reason", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "response", Type: [{ TypeName: "messageheader_response" }] },
        { ElementName: "focus", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "definition", Type: [{ TypeName: "canonical" }] },
    ],
};

export const messageheader_destination: TypeModel = {
    TypeName: "messageheader_destination",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "target", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }] },
        { ElementName: "endpoint", Type: [{ TypeName: "url" }], Required: true },
        { ElementName: "receiver", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
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
        { ElementName: "endpoint", Type: [{ TypeName: "url" }], Required: true },
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

export const MolecularSequence: TypeModel = {
    TypeName: "MolecularSequence",
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
        { ElementName: "referenceSeq", Type: [{ TypeName: "molecularsequence_referenceSeq" }] },
        { ElementName: "variant", Type: [{ TypeName: "molecularsequence_variant" }], IsArray: true },
        { ElementName: "observedSeq", Type: [{ TypeName: "string" }] },
        { ElementName: "quality", Type: [{ TypeName: "molecularsequence_quality" }], IsArray: true },
        { ElementName: "readCoverage", Type: [{ TypeName: "integer" }] },
        { ElementName: "repository", Type: [{ TypeName: "molecularsequence_repository" }], IsArray: true },
        { ElementName: "pointer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MolecularSequence"] }], IsArray: true },
        { ElementName: "structureVariant", Type: [{ TypeName: "molecularsequence_structureVariant" }], IsArray: true },
    ],
};

export const molecularsequence_referenceSeq: TypeModel = {
    TypeName: "molecularsequence_referenceSeq",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "chromosome", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "genomeBuild", Type: [{ TypeName: "string" }] },
        { ElementName: "orientation", Type: [{ TypeName: "code" }] },
        { ElementName: "referenceSeqId", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "referenceSeqPointer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MolecularSequence"] }] },
        { ElementName: "referenceSeqString", Type: [{ TypeName: "string" }] },
        { ElementName: "strand", Type: [{ TypeName: "code" }] },
        { ElementName: "windowStart", Type: [{ TypeName: "integer" }] },
        { ElementName: "windowEnd", Type: [{ TypeName: "integer" }] },
    ],
};

export const molecularsequence_variant: TypeModel = {
    TypeName: "molecularsequence_variant",
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

export const molecularsequence_quality: TypeModel = {
    TypeName: "molecularsequence_quality",
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
        { ElementName: "roc", Type: [{ TypeName: "molecularsequence_quality_roc" }] },
    ],
};

export const molecularsequence_quality_roc: TypeModel = {
    TypeName: "molecularsequence_quality_roc",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "score", Type: [{ TypeName: "integer" }], IsArray: true },
        { ElementName: "numTP", Type: [{ TypeName: "integer" }], IsArray: true },
        { ElementName: "numFP", Type: [{ TypeName: "integer" }], IsArray: true },
        { ElementName: "numFN", Type: [{ TypeName: "integer" }], IsArray: true },
        { ElementName: "precision", Type: [{ TypeName: "decimal" }], IsArray: true },
        { ElementName: "sensitivity", Type: [{ TypeName: "decimal" }], IsArray: true },
        { ElementName: "fMeasure", Type: [{ TypeName: "decimal" }], IsArray: true },
    ],
};

export const molecularsequence_repository: TypeModel = {
    TypeName: "molecularsequence_repository",
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

export const molecularsequence_structureVariant: TypeModel = {
    TypeName: "molecularsequence_structureVariant",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "variantType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "exact", Type: [{ TypeName: "boolean" }] },
        { ElementName: "length", Type: [{ TypeName: "integer" }] },
        { ElementName: "outer", Type: [{ TypeName: "molecularsequence_structureVariant_outer" }] },
        { ElementName: "inner", Type: [{ TypeName: "molecularsequence_structureVariant_inner" }] },
    ],
};

export const molecularsequence_structureVariant_outer: TypeModel = {
    TypeName: "molecularsequence_structureVariant_outer",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "start", Type: [{ TypeName: "integer" }] },
        { ElementName: "end", Type: [{ TypeName: "integer" }] },
    ],
};

export const molecularsequence_structureVariant_inner: TypeModel = {
    TypeName: "molecularsequence_structureVariant_inner",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "start", Type: [{ TypeName: "integer" }] },
        { ElementName: "end", Type: [{ TypeName: "integer" }] },
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
        { ElementName: "instantiatesCanonical", Type: [{ TypeName: "canonical" }], IsArray: true },
        { ElementName: "instantiatesUri", Type: [{ TypeName: "uri" }], IsArray: true },
        { ElementName: "instantiates", Type: [{ TypeName: "uri" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "intent", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "patient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "dateTime", Type: [{ TypeName: "dateTime" }], Required: true },
        { ElementName: "orderer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "allergyIntolerance", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/AllergyIntolerance"] }], IsArray: true },
        { ElementName: "foodPreferenceModifier", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "excludeFoodModifier", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "oralDiet", Type: [{ TypeName: "nutritionorder_oralDiet" }] },
        { ElementName: "supplement", Type: [{ TypeName: "nutritionorder_supplement" }], IsArray: true },
        { ElementName: "enteralFormula", Type: [{ TypeName: "nutritionorder_enteralFormula" }] },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
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
        { ElementName: "basedOn", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CarePlan", "http://hl7.org/fhir/StructureDefinition/DeviceRequest", "http://hl7.org/fhir/StructureDefinition/ImmunizationRecommendation", "http://hl7.org/fhir/StructureDefinition/MedicationRequest", "http://hl7.org/fhir/StructureDefinition/NutritionOrder", "http://hl7.org/fhir/StructureDefinition/ServiceRequest"] }], IsArray: true },
        { ElementName: "partOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ImagingStudy", "http://hl7.org/fhir/StructureDefinition/Immunization", "http://hl7.org/fhir/StructureDefinition/MedicationAdministration", "http://hl7.org/fhir/StructureDefinition/MedicationDispense", "http://hl7.org/fhir/StructureDefinition/MedicationStatement", "http://hl7.org/fhir/StructureDefinition/Procedure"] }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Patient"] }] },
        { ElementName: "focus", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "effective[x]", Type: [{ TypeName: "Period" }, { TypeName: "Timing" }, { TypeName: "dateTime" }, { TypeName: "instant" }] },
        { ElementName: "issued", Type: [{ TypeName: "instant" }] },
        { ElementName: "performer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], IsArray: true },
        { ElementName: "value[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "SampledData" }, { TypeName: "boolean" }, { TypeName: "dateTime" }, { TypeName: "integer" }, { TypeName: "string" }, { TypeName: "time" }] },
        { ElementName: "dataAbsentReason", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "interpretation", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "bodySite", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "method", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "specimen", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Specimen"] }] },
        { ElementName: "device", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/DeviceMetric"] }] },
        { ElementName: "referenceRange", Type: [{ TypeName: "observation_referenceRange" }], IsArray: true },
        { ElementName: "hasMember", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MolecularSequence", "http://hl7.org/fhir/StructureDefinition/Observation", "http://hl7.org/fhir/StructureDefinition/QuestionnaireResponse"] }], IsArray: true },
        { ElementName: "derivedFrom", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DocumentReference", "http://hl7.org/fhir/StructureDefinition/ImagingStudy", "http://hl7.org/fhir/StructureDefinition/Media", "http://hl7.org/fhir/StructureDefinition/MolecularSequence", "http://hl7.org/fhir/StructureDefinition/Observation", "http://hl7.org/fhir/StructureDefinition/QuestionnaireResponse"] }], IsArray: true },
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

export const observation_component: TypeModel = {
    TypeName: "observation_component",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "SampledData" }, { TypeName: "boolean" }, { TypeName: "dateTime" }, { TypeName: "integer" }, { TypeName: "string" }, { TypeName: "time" }] },
        { ElementName: "dataAbsentReason", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "interpretation", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "referenceRange", Type: [{ TypeName: "observation_referenceRange" }], IsArray: true },
    ],
};

export const ObservationDefinition: TypeModel = {
    TypeName: "ObservationDefinition",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "permittedDataType", Type: [{ TypeName: "code" }], IsArray: true },
        { ElementName: "multipleResultsAllowed", Type: [{ TypeName: "boolean" }] },
        { ElementName: "method", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "preferredReportName", Type: [{ TypeName: "string" }] },
        { ElementName: "quantitativeDetails", Type: [{ TypeName: "observationdefinition_quantitativeDetails" }] },
        { ElementName: "qualifiedInterval", Type: [{ TypeName: "observationdefinition_qualifiedInterval" }], IsArray: true },
        { ElementName: "validCodedValueSet", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ValueSet"] }] },
        { ElementName: "normalCodedValueSet", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ValueSet"] }] },
        { ElementName: "abnormalCodedValueSet", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ValueSet"] }] },
        { ElementName: "criticalCodedValueSet", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ValueSet"] }] },
    ],
};

export const observationdefinition_quantitativeDetails: TypeModel = {
    TypeName: "observationdefinition_quantitativeDetails",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "customaryUnit", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "unit", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "conversionFactor", Type: [{ TypeName: "decimal" }] },
        { ElementName: "decimalPrecision", Type: [{ TypeName: "integer" }] },
    ],
};

export const observationdefinition_qualifiedInterval: TypeModel = {
    TypeName: "observationdefinition_qualifiedInterval",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "category", Type: [{ TypeName: "code" }] },
        { ElementName: "range", Type: [{ TypeName: "Range" }] },
        { ElementName: "context", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "appliesTo", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "gender", Type: [{ TypeName: "code" }] },
        { ElementName: "age", Type: [{ TypeName: "Range" }] },
        { ElementName: "gestationalAge", Type: [{ TypeName: "Range" }] },
        { ElementName: "condition", Type: [{ TypeName: "string" }] },
    ],
};

export const OperationDefinition: TypeModel = {
    TypeName: "OperationDefinition",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }] },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
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
        { ElementName: "affectsState", Type: [{ TypeName: "boolean" }] },
        { ElementName: "code", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "comment", Type: [{ TypeName: "markdown" }] },
        { ElementName: "base", Type: [{ TypeName: "canonical" }] },
        { ElementName: "resource", Type: [{ TypeName: "code" }], IsArray: true },
        { ElementName: "system", Type: [{ TypeName: "boolean" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "boolean" }], Required: true },
        { ElementName: "instance", Type: [{ TypeName: "boolean" }], Required: true },
        { ElementName: "inputProfile", Type: [{ TypeName: "canonical" }] },
        { ElementName: "outputProfile", Type: [{ TypeName: "canonical" }] },
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
        { ElementName: "targetProfile", Type: [{ TypeName: "canonical" }], IsArray: true },
        { ElementName: "searchType", Type: [{ TypeName: "code" }] },
        { ElementName: "binding", Type: [{ TypeName: "operationdefinition_parameter_binding" }] },
        { ElementName: "referencedFrom", Type: [{ TypeName: "operationdefinition_parameter_referencedFrom" }], IsArray: true },
        { ElementName: "part", Type: [{ TypeName: "operationdefinition_parameter" }], IsArray: true },
    ],
};

export const operationdefinition_parameter_binding: TypeModel = {
    TypeName: "operationdefinition_parameter_binding",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "strength", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "valueSet", Type: [{ TypeName: "canonical" }], Required: true },
    ],
};

export const operationdefinition_parameter_referencedFrom: TypeModel = {
    TypeName: "operationdefinition_parameter_referencedFrom",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "source", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "sourceId", Type: [{ TypeName: "string" }] },
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

export const OrganizationAffiliation: TypeModel = {
    TypeName: "OrganizationAffiliation",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "active", Type: [{ TypeName: "boolean" }] },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "organization", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "participatingOrganization", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "network", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "specialty", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "location", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }], IsArray: true },
        { ElementName: "healthcareService", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/HealthcareService"] }], IsArray: true },
        { ElementName: "telecom", Type: [{ TypeName: "ContactPoint" }], IsArray: true },
        { ElementName: "endpoint", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Endpoint"] }], IsArray: true },
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
        { ElementName: "value[x]", Type: [{ TypeName: "Address" }, { TypeName: "Age" }, { TypeName: "Annotation" }, { TypeName: "Attachment" }, { TypeName: "CodeableConcept" }, { TypeName: "Coding" }, { TypeName: "ContactDetail" }, { TypeName: "ContactPoint" }, { TypeName: "Contributor" }, { TypeName: "Count" }, { TypeName: "DataRequirement" }, { TypeName: "Distance" }, { TypeName: "Dosage" }, { TypeName: "Duration" }, { TypeName: "Expression" }, { TypeName: "HumanName" }, { TypeName: "Identifier" }, { TypeName: "Meta" }, { TypeName: "Money" }, { TypeName: "ParameterDefinition" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "Reference" }, { TypeName: "RelatedArtifact" }, { TypeName: "SampledData" }, { TypeName: "Signature" }, { TypeName: "Timing" }, { TypeName: "TriggerDefinition" }, { TypeName: "UsageContext" }, { TypeName: "base64Binary" }, { TypeName: "boolean" }, { TypeName: "canonical" }, { TypeName: "code" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "id" }, { TypeName: "instant" }, { TypeName: "integer" }, { TypeName: "markdown" }, { TypeName: "oid" }, { TypeName: "positiveInt" }, { TypeName: "string" }, { TypeName: "time" }, { TypeName: "unsignedInt" }, { TypeName: "uri" }, { TypeName: "url" }, { TypeName: "uuid" }] },
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
        { ElementName: "communication", Type: [{ TypeName: "patient_communication" }], IsArray: true },
        { ElementName: "generalPractitioner", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }], IsArray: true },
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
        { ElementName: "other", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
    ],
};

export const PaymentNotice: TypeModel = {
    TypeName: "PaymentNotice",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "request", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
        { ElementName: "response", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
        { ElementName: "created", Type: [{ TypeName: "dateTime" }], Required: true },
        { ElementName: "provider", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "payment", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/PaymentReconciliation"] }], Required: true },
        { ElementName: "paymentDate", Type: [{ TypeName: "date" }] },
        { ElementName: "payee", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "recipient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }], Required: true },
        { ElementName: "amount", Type: [{ TypeName: "Money" }], Required: true },
        { ElementName: "paymentStatus", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const PaymentReconciliation: TypeModel = {
    TypeName: "PaymentReconciliation",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "created", Type: [{ TypeName: "dateTime" }], Required: true },
        { ElementName: "paymentIssuer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "request", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Task"] }] },
        { ElementName: "requestor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "outcome", Type: [{ TypeName: "code" }] },
        { ElementName: "disposition", Type: [{ TypeName: "string" }] },
        { ElementName: "paymentDate", Type: [{ TypeName: "date" }], Required: true },
        { ElementName: "paymentAmount", Type: [{ TypeName: "Money" }], Required: true },
        { ElementName: "paymentIdentifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "detail", Type: [{ TypeName: "paymentreconciliation_detail" }], IsArray: true },
        { ElementName: "formCode", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "processNote", Type: [{ TypeName: "paymentreconciliation_processNote" }], IsArray: true },
    ],
};

export const paymentreconciliation_detail: TypeModel = {
    TypeName: "paymentreconciliation_detail",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "predecessor", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "request", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
        { ElementName: "submitter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "response", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
        { ElementName: "date", Type: [{ TypeName: "date" }] },
        { ElementName: "responsible", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "payee", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "amount", Type: [{ TypeName: "Money" }] },
    ],
};

export const paymentreconciliation_processNote: TypeModel = {
    TypeName: "paymentreconciliation_processNote",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "code" }] },
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
        { ElementName: "target", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Person", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
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
        { ElementName: "subtitle", Type: [{ TypeName: "string" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "experimental", Type: [{ TypeName: "boolean" }] },
        { ElementName: "subject[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "publisher", Type: [{ TypeName: "string" }] },
        { ElementName: "contact", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "useContext", Type: [{ TypeName: "UsageContext" }], IsArray: true },
        { ElementName: "jurisdiction", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "purpose", Type: [{ TypeName: "markdown" }] },
        { ElementName: "usage", Type: [{ TypeName: "string" }] },
        { ElementName: "copyright", Type: [{ TypeName: "markdown" }] },
        { ElementName: "approvalDate", Type: [{ TypeName: "date" }] },
        { ElementName: "lastReviewDate", Type: [{ TypeName: "date" }] },
        { ElementName: "effectivePeriod", Type: [{ TypeName: "Period" }] },
        { ElementName: "topic", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "author", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "editor", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "reviewer", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "endorser", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "relatedArtifact", Type: [{ TypeName: "RelatedArtifact" }], IsArray: true },
        { ElementName: "library", Type: [{ TypeName: "canonical" }], IsArray: true },
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
        { ElementName: "prefix", Type: [{ TypeName: "string" }] },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "textEquivalent", Type: [{ TypeName: "string" }] },
        { ElementName: "priority", Type: [{ TypeName: "code" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "reason", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "documentation", Type: [{ TypeName: "RelatedArtifact" }], IsArray: true },
        { ElementName: "goalId", Type: [{ TypeName: "id" }], IsArray: true },
        { ElementName: "subject[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }] },
        { ElementName: "trigger", Type: [{ TypeName: "TriggerDefinition" }], IsArray: true },
        { ElementName: "condition", Type: [{ TypeName: "plandefinition_action_condition" }], IsArray: true },
        { ElementName: "input", Type: [{ TypeName: "DataRequirement" }], IsArray: true },
        { ElementName: "output", Type: [{ TypeName: "DataRequirement" }], IsArray: true },
        { ElementName: "relatedAction", Type: [{ TypeName: "plandefinition_action_relatedAction" }], IsArray: true },
        { ElementName: "timing[x]", Type: [{ TypeName: "Age" }, { TypeName: "Duration" }, { TypeName: "Period" }, { TypeName: "Range" }, { TypeName: "Timing" }, { TypeName: "dateTime" }] },
        { ElementName: "participant", Type: [{ TypeName: "plandefinition_action_participant" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "groupingBehavior", Type: [{ TypeName: "code" }] },
        { ElementName: "selectionBehavior", Type: [{ TypeName: "code" }] },
        { ElementName: "requiredBehavior", Type: [{ TypeName: "code" }] },
        { ElementName: "precheckBehavior", Type: [{ TypeName: "code" }] },
        { ElementName: "cardinalityBehavior", Type: [{ TypeName: "code" }] },
        { ElementName: "definition[x]", Type: [{ TypeName: "canonical" }, { TypeName: "uri" }] },
        { ElementName: "transform", Type: [{ TypeName: "canonical" }] },
        { ElementName: "dynamicValue", Type: [{ TypeName: "plandefinition_action_dynamicValue" }], IsArray: true },
        { ElementName: "action", Type: [{ TypeName: "plandefinition_action" }], IsArray: true },
    ],
};

export const plandefinition_action_condition: TypeModel = {
    TypeName: "plandefinition_action_condition",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "kind", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "expression", Type: [{ TypeName: "Expression" }] },
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
        { ElementName: "path", Type: [{ TypeName: "string" }] },
        { ElementName: "expression", Type: [{ TypeName: "Expression" }] },
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
        { ElementName: "instantiatesCanonical", Type: [{ TypeName: "canonical" }], IsArray: true },
        { ElementName: "instantiatesUri", Type: [{ TypeName: "uri" }], IsArray: true },
        { ElementName: "basedOn", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CarePlan", "http://hl7.org/fhir/StructureDefinition/ServiceRequest"] }], IsArray: true },
        { ElementName: "partOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MedicationAdministration", "http://hl7.org/fhir/StructureDefinition/Observation", "http://hl7.org/fhir/StructureDefinition/Procedure"] }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "statusReason", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "performed[x]", Type: [{ TypeName: "Age" }, { TypeName: "Period" }, { TypeName: "Range" }, { TypeName: "dateTime" }, { TypeName: "string" }] },
        { ElementName: "recorder", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "asserter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "performer", Type: [{ TypeName: "procedure_performer" }], IsArray: true },
        { ElementName: "location", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "reasonCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "reasonReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Condition", "http://hl7.org/fhir/StructureDefinition/DiagnosticReport", "http://hl7.org/fhir/StructureDefinition/DocumentReference", "http://hl7.org/fhir/StructureDefinition/Observation", "http://hl7.org/fhir/StructureDefinition/Procedure"] }], IsArray: true },
        { ElementName: "bodySite", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "outcome", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "report", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Composition", "http://hl7.org/fhir/StructureDefinition/DiagnosticReport", "http://hl7.org/fhir/StructureDefinition/DocumentReference"] }], IsArray: true },
        { ElementName: "complication", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "complicationDetail", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Condition"] }], IsArray: true },
        { ElementName: "followUp", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "focalDevice", Type: [{ TypeName: "procedure_focalDevice" }], IsArray: true },
        { ElementName: "usedReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Medication", "http://hl7.org/fhir/StructureDefinition/Substance"] }], IsArray: true },
        { ElementName: "usedCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
    ],
};

export const procedure_performer: TypeModel = {
    TypeName: "procedure_performer",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "function", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "actor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
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

export const Provenance: TypeModel = {
    TypeName: "Provenance",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "target", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true, Required: true },
        { ElementName: "occurred[x]", Type: [{ TypeName: "Period" }, { TypeName: "dateTime" }] },
        { ElementName: "recorded", Type: [{ TypeName: "instant" }], Required: true },
        { ElementName: "policy", Type: [{ TypeName: "uri" }], IsArray: true },
        { ElementName: "location", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "reason", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "activity", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "agent", Type: [{ TypeName: "provenance_agent" }], IsArray: true, Required: true },
        { ElementName: "entity", Type: [{ TypeName: "provenance_entity" }], IsArray: true },
        { ElementName: "signature", Type: [{ TypeName: "Signature" }], IsArray: true },
    ],
};

export const provenance_agent: TypeModel = {
    TypeName: "provenance_agent",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "who", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
        { ElementName: "onBehalfOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
    ],
};

export const provenance_entity: TypeModel = {
    TypeName: "provenance_entity",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "role", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "what", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], Required: true },
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
        { ElementName: "derivedFrom", Type: [{ TypeName: "canonical" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "experimental", Type: [{ TypeName: "boolean" }] },
        { ElementName: "subjectType", Type: [{ TypeName: "code" }], IsArray: true },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "publisher", Type: [{ TypeName: "string" }] },
        { ElementName: "contact", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "useContext", Type: [{ TypeName: "UsageContext" }], IsArray: true },
        { ElementName: "jurisdiction", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "purpose", Type: [{ TypeName: "markdown" }] },
        { ElementName: "copyright", Type: [{ TypeName: "markdown" }] },
        { ElementName: "approvalDate", Type: [{ TypeName: "date" }] },
        { ElementName: "lastReviewDate", Type: [{ TypeName: "date" }] },
        { ElementName: "effectivePeriod", Type: [{ TypeName: "Period" }] },
        { ElementName: "code", Type: [{ TypeName: "Coding" }], IsArray: true },
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
        { ElementName: "enableBehavior", Type: [{ TypeName: "code" }] },
        { ElementName: "required", Type: [{ TypeName: "boolean" }] },
        { ElementName: "repeats", Type: [{ TypeName: "boolean" }] },
        { ElementName: "readOnly", Type: [{ TypeName: "boolean" }] },
        { ElementName: "maxLength", Type: [{ TypeName: "integer" }] },
        { ElementName: "answerValueSet", Type: [{ TypeName: "canonical" }] },
        { ElementName: "answerOption", Type: [{ TypeName: "questionnaire_item_answerOption" }], IsArray: true },
        { ElementName: "initial", Type: [{ TypeName: "questionnaire_item_initial" }], IsArray: true },
        { ElementName: "item", Type: [{ TypeName: "questionnaire_item" }], IsArray: true },
    ],
};

export const questionnaire_item_enableWhen: TypeModel = {
    TypeName: "questionnaire_item_enableWhen",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "question", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "operator", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "answer[x]", Type: [{ TypeName: "Coding" }, { TypeName: "Quantity" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }, { TypeName: "boolean" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "integer" }, { TypeName: "string" }, { TypeName: "time" }], Required: true },
    ],
};

export const questionnaire_item_answerOption: TypeModel = {
    TypeName: "questionnaire_item_answerOption",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "value[x]", Type: [{ TypeName: "Coding" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }, { TypeName: "date" }, { TypeName: "integer" }, { TypeName: "string" }, { TypeName: "time" }], Required: true },
        { ElementName: "initialSelected", Type: [{ TypeName: "boolean" }] },
    ],
};

export const questionnaire_item_initial: TypeModel = {
    TypeName: "questionnaire_item_initial",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "value[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "Coding" }, { TypeName: "Quantity" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }, { TypeName: "boolean" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "integer" }, { TypeName: "string" }, { TypeName: "time" }, { TypeName: "uri" }], Required: true },
    ],
};

export const QuestionnaireResponse: TypeModel = {
    TypeName: "QuestionnaireResponse",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "basedOn", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CarePlan", "http://hl7.org/fhir/StructureDefinition/ServiceRequest"] }], IsArray: true },
        { ElementName: "partOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Observation", "http://hl7.org/fhir/StructureDefinition/Procedure"] }], IsArray: true },
        { ElementName: "questionnaire", Type: [{ TypeName: "canonical" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "authored", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "author", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "source", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
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

export const RelatedPerson: TypeModel = {
    TypeName: "RelatedPerson",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "active", Type: [{ TypeName: "boolean" }] },
        { ElementName: "patient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
        { ElementName: "relationship", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "name", Type: [{ TypeName: "HumanName" }], IsArray: true },
        { ElementName: "telecom", Type: [{ TypeName: "ContactPoint" }], IsArray: true },
        { ElementName: "gender", Type: [{ TypeName: "code" }] },
        { ElementName: "birthDate", Type: [{ TypeName: "date" }] },
        { ElementName: "address", Type: [{ TypeName: "Address" }], IsArray: true },
        { ElementName: "photo", Type: [{ TypeName: "Attachment" }], IsArray: true },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "communication", Type: [{ TypeName: "relatedperson_communication" }], IsArray: true },
    ],
};

export const relatedperson_communication: TypeModel = {
    TypeName: "relatedperson_communication",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "language", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "preferred", Type: [{ TypeName: "boolean" }] },
    ],
};

export const RequestGroup: TypeModel = {
    TypeName: "RequestGroup",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "instantiatesCanonical", Type: [{ TypeName: "canonical" }], IsArray: true },
        { ElementName: "instantiatesUri", Type: [{ TypeName: "uri" }], IsArray: true },
        { ElementName: "basedOn", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "replaces", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "groupIdentifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "intent", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "priority", Type: [{ TypeName: "code" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Patient"] }] },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "authoredOn", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "author", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "reasonCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "reasonReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Condition", "http://hl7.org/fhir/StructureDefinition/DiagnosticReport", "http://hl7.org/fhir/StructureDefinition/DocumentReference", "http://hl7.org/fhir/StructureDefinition/Observation"] }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "action", Type: [{ TypeName: "requestgroup_action" }], IsArray: true },
    ],
};

export const requestgroup_action: TypeModel = {
    TypeName: "requestgroup_action",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "prefix", Type: [{ TypeName: "string" }] },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "textEquivalent", Type: [{ TypeName: "string" }] },
        { ElementName: "priority", Type: [{ TypeName: "code" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "documentation", Type: [{ TypeName: "RelatedArtifact" }], IsArray: true },
        { ElementName: "condition", Type: [{ TypeName: "requestgroup_action_condition" }], IsArray: true },
        { ElementName: "relatedAction", Type: [{ TypeName: "requestgroup_action_relatedAction" }], IsArray: true },
        { ElementName: "timing[x]", Type: [{ TypeName: "Age" }, { TypeName: "Duration" }, { TypeName: "Period" }, { TypeName: "Range" }, { TypeName: "Timing" }, { TypeName: "dateTime" }] },
        { ElementName: "participant", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
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
        { ElementName: "expression", Type: [{ TypeName: "Expression" }] },
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

export const ResearchDefinition: TypeModel = {
    TypeName: "ResearchDefinition",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "shortTitle", Type: [{ TypeName: "string" }] },
        { ElementName: "subtitle", Type: [{ TypeName: "string" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "experimental", Type: [{ TypeName: "boolean" }] },
        { ElementName: "subject[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "publisher", Type: [{ TypeName: "string" }] },
        { ElementName: "contact", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "comment", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "useContext", Type: [{ TypeName: "UsageContext" }], IsArray: true },
        { ElementName: "jurisdiction", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "purpose", Type: [{ TypeName: "markdown" }] },
        { ElementName: "usage", Type: [{ TypeName: "string" }] },
        { ElementName: "copyright", Type: [{ TypeName: "markdown" }] },
        { ElementName: "approvalDate", Type: [{ TypeName: "date" }] },
        { ElementName: "lastReviewDate", Type: [{ TypeName: "date" }] },
        { ElementName: "effectivePeriod", Type: [{ TypeName: "Period" }] },
        { ElementName: "topic", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "author", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "editor", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "reviewer", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "endorser", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "relatedArtifact", Type: [{ TypeName: "RelatedArtifact" }], IsArray: true },
        { ElementName: "library", Type: [{ TypeName: "canonical" }], IsArray: true },
        { ElementName: "population", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ResearchElementDefinition"] }], Required: true },
        { ElementName: "exposure", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ResearchElementDefinition"] }] },
        { ElementName: "exposureAlternative", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ResearchElementDefinition"] }] },
        { ElementName: "outcome", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ResearchElementDefinition"] }] },
    ],
};

export const ResearchElementDefinition: TypeModel = {
    TypeName: "ResearchElementDefinition",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "shortTitle", Type: [{ TypeName: "string" }] },
        { ElementName: "subtitle", Type: [{ TypeName: "string" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "experimental", Type: [{ TypeName: "boolean" }] },
        { ElementName: "subject[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "publisher", Type: [{ TypeName: "string" }] },
        { ElementName: "contact", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "comment", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "useContext", Type: [{ TypeName: "UsageContext" }], IsArray: true },
        { ElementName: "jurisdiction", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "purpose", Type: [{ TypeName: "markdown" }] },
        { ElementName: "usage", Type: [{ TypeName: "string" }] },
        { ElementName: "copyright", Type: [{ TypeName: "markdown" }] },
        { ElementName: "approvalDate", Type: [{ TypeName: "date" }] },
        { ElementName: "lastReviewDate", Type: [{ TypeName: "date" }] },
        { ElementName: "effectivePeriod", Type: [{ TypeName: "Period" }] },
        { ElementName: "topic", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "author", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "editor", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "reviewer", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "endorser", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "relatedArtifact", Type: [{ TypeName: "RelatedArtifact" }], IsArray: true },
        { ElementName: "library", Type: [{ TypeName: "canonical" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "variableType", Type: [{ TypeName: "code" }] },
        { ElementName: "characteristic", Type: [{ TypeName: "researchelementdefinition_characteristic" }], IsArray: true, Required: true },
    ],
};

export const researchelementdefinition_characteristic: TypeModel = {
    TypeName: "researchelementdefinition_characteristic",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "definition[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "DataRequirement" }, { TypeName: "Expression" }, { TypeName: "canonical" }], Required: true },
        { ElementName: "usageContext", Type: [{ TypeName: "UsageContext" }], IsArray: true },
        { ElementName: "exclude", Type: [{ TypeName: "boolean" }] },
        { ElementName: "unitOfMeasure", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "studyEffectiveDescription", Type: [{ TypeName: "string" }] },
        { ElementName: "studyEffective[x]", Type: [{ TypeName: "Duration" }, { TypeName: "Period" }, { TypeName: "Timing" }, { TypeName: "dateTime" }] },
        { ElementName: "studyEffectiveTimeFromStart", Type: [{ TypeName: "Duration" }] },
        { ElementName: "studyEffectiveGroupMeasure", Type: [{ TypeName: "code" }] },
        { ElementName: "participantEffectiveDescription", Type: [{ TypeName: "string" }] },
        { ElementName: "participantEffective[x]", Type: [{ TypeName: "Duration" }, { TypeName: "Period" }, { TypeName: "Timing" }, { TypeName: "dateTime" }] },
        { ElementName: "participantEffectiveTimeFromStart", Type: [{ TypeName: "Duration" }] },
        { ElementName: "participantEffectiveGroupMeasure", Type: [{ TypeName: "code" }] },
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
        { ElementName: "primaryPurposeType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "phase", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "focus", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "condition", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "contact", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "relatedArtifact", Type: [{ TypeName: "RelatedArtifact" }], IsArray: true },
        { ElementName: "keyword", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "location", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "enrollment", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }], IsArray: true },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "sponsor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "principalInvestigator", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "site", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }], IsArray: true },
        { ElementName: "reasonStopped", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "arm", Type: [{ TypeName: "researchstudy_arm" }], IsArray: true },
        { ElementName: "objective", Type: [{ TypeName: "researchstudy_objective" }], IsArray: true },
    ],
};

export const researchstudy_arm: TypeModel = {
    TypeName: "researchstudy_arm",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "name", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
    ],
};

export const researchstudy_objective: TypeModel = {
    TypeName: "researchstudy_objective",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const ResearchSubject: TypeModel = {
    TypeName: "ResearchSubject",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "meta", Type: [{ TypeName: "Meta" }] },
        { ElementName: "implicitRules", Type: [{ TypeName: "uri" }] },
        { ElementName: "language", Type: [{ TypeName: "code" }] },
    ],
};

export const RiskAssessment: TypeModel = {
    TypeName: "RiskAssessment",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "basedOn", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
        { ElementName: "parent", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "method", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "occurrence[x]", Type: [{ TypeName: "Period" }, { TypeName: "dateTime" }] },
        { ElementName: "condition", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Condition"] }] },
        { ElementName: "performer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "reasonCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "reasonReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Condition", "http://hl7.org/fhir/StructureDefinition/DiagnosticReport", "http://hl7.org/fhir/StructureDefinition/DocumentReference", "http://hl7.org/fhir/StructureDefinition/Observation"] }], IsArray: true },
        { ElementName: "basis", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "prediction", Type: [{ TypeName: "riskassessment_prediction" }], IsArray: true },
        { ElementName: "mitigation", Type: [{ TypeName: "string" }] },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
    ],
};

export const riskassessment_prediction: TypeModel = {
    TypeName: "riskassessment_prediction",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "outcome", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "probability[x]", Type: [{ TypeName: "Range" }, { TypeName: "decimal" }] },
        { ElementName: "qualitativeRisk", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "relativeRisk", Type: [{ TypeName: "decimal" }] },
        { ElementName: "when[x]", Type: [{ TypeName: "Period" }, { TypeName: "Range" }] },
        { ElementName: "rationale", Type: [{ TypeName: "string" }] },
    ],
};

export const RiskEvidenceSynthesis: TypeModel = {
    TypeName: "RiskEvidenceSynthesis",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "publisher", Type: [{ TypeName: "string" }] },
        { ElementName: "contact", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "useContext", Type: [{ TypeName: "UsageContext" }], IsArray: true },
        { ElementName: "jurisdiction", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "copyright", Type: [{ TypeName: "markdown" }] },
        { ElementName: "approvalDate", Type: [{ TypeName: "date" }] },
        { ElementName: "lastReviewDate", Type: [{ TypeName: "date" }] },
        { ElementName: "effectivePeriod", Type: [{ TypeName: "Period" }] },
        { ElementName: "topic", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "author", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "editor", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "reviewer", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "endorser", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "relatedArtifact", Type: [{ TypeName: "RelatedArtifact" }], IsArray: true },
        { ElementName: "synthesisType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "studyType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "population", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/EvidenceVariable"] }], Required: true },
        { ElementName: "exposure", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/EvidenceVariable"] }] },
        { ElementName: "outcome", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/EvidenceVariable"] }], Required: true },
        { ElementName: "sampleSize", Type: [{ TypeName: "riskevidencesynthesis_sampleSize" }] },
        { ElementName: "riskEstimate", Type: [{ TypeName: "riskevidencesynthesis_riskEstimate" }] },
        { ElementName: "certainty", Type: [{ TypeName: "riskevidencesynthesis_certainty" }], IsArray: true },
    ],
};

export const riskevidencesynthesis_sampleSize: TypeModel = {
    TypeName: "riskevidencesynthesis_sampleSize",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "numberOfStudies", Type: [{ TypeName: "integer" }] },
        { ElementName: "numberOfParticipants", Type: [{ TypeName: "integer" }] },
    ],
};

export const riskevidencesynthesis_riskEstimate: TypeModel = {
    TypeName: "riskevidencesynthesis_riskEstimate",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "value", Type: [{ TypeName: "decimal" }] },
        { ElementName: "unitOfMeasure", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "denominatorCount", Type: [{ TypeName: "integer" }] },
        { ElementName: "numeratorCount", Type: [{ TypeName: "integer" }] },
        { ElementName: "precisionEstimate", Type: [{ TypeName: "riskevidencesynthesis_riskEstimate_precisionEstimate" }], IsArray: true },
    ],
};

export const riskevidencesynthesis_riskEstimate_precisionEstimate: TypeModel = {
    TypeName: "riskevidencesynthesis_riskEstimate_precisionEstimate",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "level", Type: [{ TypeName: "decimal" }] },
        { ElementName: "from", Type: [{ TypeName: "decimal" }] },
        { ElementName: "to", Type: [{ TypeName: "decimal" }] },
    ],
};

export const riskevidencesynthesis_certainty: TypeModel = {
    TypeName: "riskevidencesynthesis_certainty",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "rating", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "certaintySubcomponent", Type: [{ TypeName: "riskevidencesynthesis_certainty_certaintySubcomponent" }], IsArray: true },
    ],
};

export const riskevidencesynthesis_certainty_certaintySubcomponent: TypeModel = {
    TypeName: "riskevidencesynthesis_certainty_certaintySubcomponent",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "rating", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
    ],
};

export const Schedule: TypeModel = {
    TypeName: "Schedule",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "active", Type: [{ TypeName: "boolean" }] },
        { ElementName: "serviceCategory", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "serviceType", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "specialty", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "actor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], IsArray: true, Required: true },
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
        { ElementName: "derivedFrom", Type: [{ TypeName: "canonical" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "experimental", Type: [{ TypeName: "boolean" }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "publisher", Type: [{ TypeName: "string" }] },
        { ElementName: "contact", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }], Required: true },
        { ElementName: "useContext", Type: [{ TypeName: "UsageContext" }], IsArray: true },
        { ElementName: "jurisdiction", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "purpose", Type: [{ TypeName: "markdown" }] },
        { ElementName: "code", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "base", Type: [{ TypeName: "code" }], IsArray: true, Required: true },
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "expression", Type: [{ TypeName: "string" }] },
        { ElementName: "xpath", Type: [{ TypeName: "string" }] },
        { ElementName: "xpathUsage", Type: [{ TypeName: "code" }] },
        { ElementName: "target", Type: [{ TypeName: "code" }], IsArray: true },
        { ElementName: "multipleOr", Type: [{ TypeName: "boolean" }] },
        { ElementName: "multipleAnd", Type: [{ TypeName: "boolean" }] },
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
        { ElementName: "definition", Type: [{ TypeName: "canonical" }], Required: true },
        { ElementName: "expression", Type: [{ TypeName: "string" }], Required: true },
    ],
};

export const ServiceRequest: TypeModel = {
    TypeName: "ServiceRequest",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "instantiatesCanonical", Type: [{ TypeName: "canonical" }], IsArray: true },
        { ElementName: "instantiatesUri", Type: [{ TypeName: "uri" }], IsArray: true },
        { ElementName: "basedOn", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CarePlan", "http://hl7.org/fhir/StructureDefinition/MedicationRequest", "http://hl7.org/fhir/StructureDefinition/ServiceRequest"] }], IsArray: true },
        { ElementName: "replaces", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ServiceRequest"] }], IsArray: true },
        { ElementName: "requisition", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "intent", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "priority", Type: [{ TypeName: "code" }] },
        { ElementName: "doNotPerform", Type: [{ TypeName: "boolean" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "orderDetail", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "quantity[x]", Type: [{ TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }] },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "occurrence[x]", Type: [{ TypeName: "Period" }, { TypeName: "Timing" }, { TypeName: "dateTime" }] },
        { ElementName: "asNeeded[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "boolean" }] },
        { ElementName: "authoredOn", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "requester", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "performerType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "performer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], IsArray: true },
        { ElementName: "locationCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "locationReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }], IsArray: true },
        { ElementName: "reasonCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "reasonReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Condition", "http://hl7.org/fhir/StructureDefinition/DiagnosticReport", "http://hl7.org/fhir/StructureDefinition/DocumentReference", "http://hl7.org/fhir/StructureDefinition/Observation"] }], IsArray: true },
        { ElementName: "insurance", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ClaimResponse", "http://hl7.org/fhir/StructureDefinition/Coverage"] }], IsArray: true },
        { ElementName: "supportingInfo", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "specimen", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Specimen"] }], IsArray: true },
        { ElementName: "bodySite", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "patientInstruction", Type: [{ TypeName: "string" }] },
        { ElementName: "relevantHistory", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Provenance"] }], IsArray: true },
    ],
};

export const Slot: TypeModel = {
    TypeName: "Slot",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "serviceCategory", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
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
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Substance"] }] },
        { ElementName: "receivedTime", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "parent", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Specimen"] }], IsArray: true },
        { ElementName: "request", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ServiceRequest"] }], IsArray: true },
        { ElementName: "collection", Type: [{ TypeName: "specimen_collection" }] },
        { ElementName: "processing", Type: [{ TypeName: "specimen_processing" }], IsArray: true },
        { ElementName: "container", Type: [{ TypeName: "specimen_container" }], IsArray: true },
        { ElementName: "condition", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
    ],
};

export const specimen_collection: TypeModel = {
    TypeName: "specimen_collection",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "collector", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "collected[x]", Type: [{ TypeName: "Period" }, { TypeName: "dateTime" }] },
        { ElementName: "duration", Type: [{ TypeName: "Duration" }] },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "method", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "bodySite", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "fastingStatus[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Duration" }] },
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

export const SpecimenDefinition: TypeModel = {
    TypeName: "SpecimenDefinition",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "typeCollected", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "patientPreparation", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "timeAspect", Type: [{ TypeName: "string" }] },
        { ElementName: "collection", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "typeTested", Type: [{ TypeName: "specimendefinition_typeTested" }], IsArray: true },
    ],
};

export const specimendefinition_typeTested: TypeModel = {
    TypeName: "specimendefinition_typeTested",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "isDerived", Type: [{ TypeName: "boolean" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "preference", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "container", Type: [{ TypeName: "specimendefinition_typeTested_container" }] },
        { ElementName: "requirement", Type: [{ TypeName: "string" }] },
        { ElementName: "retentionTime", Type: [{ TypeName: "Duration" }] },
        { ElementName: "rejectionCriterion", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "handling", Type: [{ TypeName: "specimendefinition_typeTested_handling" }], IsArray: true },
    ],
};

export const specimendefinition_typeTested_container: TypeModel = {
    TypeName: "specimendefinition_typeTested_container",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "material", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "cap", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "capacity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "minimumVolume[x]", Type: [{ TypeName: "Quantity" }, { TypeName: "string" }] },
        { ElementName: "additive", Type: [{ TypeName: "specimendefinition_typeTested_container_additive" }], IsArray: true },
        { ElementName: "preparation", Type: [{ TypeName: "string" }] },
    ],
};

export const specimendefinition_typeTested_container_additive: TypeModel = {
    TypeName: "specimendefinition_typeTested_container_additive",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "additive[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Substance"] }], Required: true },
    ],
};

export const specimendefinition_typeTested_handling: TypeModel = {
    TypeName: "specimendefinition_typeTested_handling",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "temperatureQualifier", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "temperatureRange", Type: [{ TypeName: "Range" }] },
        { ElementName: "maxDuration", Type: [{ TypeName: "Duration" }] },
        { ElementName: "instruction", Type: [{ TypeName: "string" }] },
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
        { ElementName: "fhirVersion", Type: [{ TypeName: "code" }] },
        { ElementName: "mapping", Type: [{ TypeName: "structuredefinition_mapping" }], IsArray: true },
        { ElementName: "kind", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "abstract", Type: [{ TypeName: "boolean" }], Required: true },
        { ElementName: "context", Type: [{ TypeName: "structuredefinition_context" }], IsArray: true },
        { ElementName: "contextInvariant", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "uri" }], Required: true },
        { ElementName: "baseDefinition", Type: [{ TypeName: "canonical" }] },
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

export const structuredefinition_context: TypeModel = {
    TypeName: "structuredefinition_context",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "expression", Type: [{ TypeName: "string" }], Required: true },
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
        { ElementName: "import", Type: [{ TypeName: "canonical" }], IsArray: true },
        { ElementName: "group", Type: [{ TypeName: "structuremap_group" }], IsArray: true, Required: true },
    ],
};

export const structuremap_structure: TypeModel = {
    TypeName: "structuremap_structure",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "canonical" }], Required: true },
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
        { ElementName: "defaultValue[x]", Type: [{ TypeName: "Address" }, { TypeName: "Age" }, { TypeName: "Annotation" }, { TypeName: "Attachment" }, { TypeName: "CodeableConcept" }, { TypeName: "Coding" }, { TypeName: "ContactDetail" }, { TypeName: "ContactPoint" }, { TypeName: "Contributor" }, { TypeName: "Count" }, { TypeName: "DataRequirement" }, { TypeName: "Distance" }, { TypeName: "Dosage" }, { TypeName: "Duration" }, { TypeName: "Expression" }, { TypeName: "HumanName" }, { TypeName: "Identifier" }, { TypeName: "Meta" }, { TypeName: "Money" }, { TypeName: "ParameterDefinition" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "Reference" }, { TypeName: "RelatedArtifact" }, { TypeName: "SampledData" }, { TypeName: "Signature" }, { TypeName: "Timing" }, { TypeName: "TriggerDefinition" }, { TypeName: "UsageContext" }, { TypeName: "base64Binary" }, { TypeName: "boolean" }, { TypeName: "canonical" }, { TypeName: "code" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "id" }, { TypeName: "instant" }, { TypeName: "integer" }, { TypeName: "markdown" }, { TypeName: "oid" }, { TypeName: "positiveInt" }, { TypeName: "string" }, { TypeName: "time" }, { TypeName: "unsignedInt" }, { TypeName: "uri" }, { TypeName: "url" }, { TypeName: "uuid" }] },
        { ElementName: "element", Type: [{ TypeName: "string" }] },
        { ElementName: "listMode", Type: [{ TypeName: "code" }] },
        { ElementName: "variable", Type: [{ TypeName: "id" }] },
        { ElementName: "condition", Type: [{ TypeName: "string" }] },
        { ElementName: "check", Type: [{ TypeName: "string" }] },
        { ElementName: "logMessage", Type: [{ TypeName: "string" }] },
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
    ],
};

export const subscription_channel: TypeModel = {
    TypeName: "subscription_channel",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "endpoint", Type: [{ TypeName: "url" }] },
        { ElementName: "payload", Type: [{ TypeName: "code" }] },
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

export const SubstanceNucleicAcid: TypeModel = {
    TypeName: "SubstanceNucleicAcid",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "sequenceType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "numberOfSubunits", Type: [{ TypeName: "integer" }] },
        { ElementName: "areaOfHybridisation", Type: [{ TypeName: "string" }] },
        { ElementName: "oligoNucleotideType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "subunit", Type: [{ TypeName: "substancenucleicacid_subunit" }], IsArray: true },
    ],
};

export const substancenucleicacid_subunit: TypeModel = {
    TypeName: "substancenucleicacid_subunit",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "subunit", Type: [{ TypeName: "integer" }] },
        { ElementName: "sequence", Type: [{ TypeName: "string" }] },
        { ElementName: "length", Type: [{ TypeName: "integer" }] },
        { ElementName: "sequenceAttachment", Type: [{ TypeName: "Attachment" }] },
        { ElementName: "fivePrime", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "threePrime", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "linkage", Type: [{ TypeName: "substancenucleicacid_subunit_linkage" }], IsArray: true },
        { ElementName: "sugar", Type: [{ TypeName: "substancenucleicacid_subunit_sugar" }], IsArray: true },
    ],
};

export const substancenucleicacid_subunit_linkage: TypeModel = {
    TypeName: "substancenucleicacid_subunit_linkage",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "connectivity", Type: [{ TypeName: "string" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "residueSite", Type: [{ TypeName: "string" }] },
    ],
};

export const substancenucleicacid_subunit_sugar: TypeModel = {
    TypeName: "substancenucleicacid_subunit_sugar",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "residueSite", Type: [{ TypeName: "string" }] },
    ],
};

export const SubstancePolymer: TypeModel = {
    TypeName: "SubstancePolymer",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "class", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "geometry", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "copolymerConnectivity", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "modification", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "monomerSet", Type: [{ TypeName: "substancepolymer_monomerSet" }], IsArray: true },
        { ElementName: "repeat", Type: [{ TypeName: "substancepolymer_repeat" }], IsArray: true },
    ],
};

export const substancepolymer_monomerSet: TypeModel = {
    TypeName: "substancepolymer_monomerSet",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "ratioType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "startingMaterial", Type: [{ TypeName: "substancepolymer_monomerSet_startingMaterial" }], IsArray: true },
    ],
};

export const substancepolymer_monomerSet_startingMaterial: TypeModel = {
    TypeName: "substancepolymer_monomerSet_startingMaterial",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "material", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "isDefining", Type: [{ TypeName: "boolean" }] },
        { ElementName: "amount", Type: [{ TypeName: "SubstanceAmount" }] },
    ],
};

export const substancepolymer_repeat: TypeModel = {
    TypeName: "substancepolymer_repeat",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "numberOfUnits", Type: [{ TypeName: "integer" }] },
        { ElementName: "averageMolecularFormula", Type: [{ TypeName: "string" }] },
        { ElementName: "repeatUnitAmountType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "repeatUnit", Type: [{ TypeName: "substancepolymer_repeat_repeatUnit" }], IsArray: true },
    ],
};

export const substancepolymer_repeat_repeatUnit: TypeModel = {
    TypeName: "substancepolymer_repeat_repeatUnit",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "orientationOfPolymerisation", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "repeatUnit", Type: [{ TypeName: "string" }] },
        { ElementName: "amount", Type: [{ TypeName: "SubstanceAmount" }] },
        { ElementName: "degreeOfPolymerisation", Type: [{ TypeName: "substancepolymer_repeat_repeatUnit_degreeOfPolymerisation" }], IsArray: true },
        { ElementName: "structuralRepresentation", Type: [{ TypeName: "substancepolymer_repeat_repeatUnit_structuralRepresentation" }], IsArray: true },
    ],
};

export const substancepolymer_repeat_repeatUnit_degreeOfPolymerisation: TypeModel = {
    TypeName: "substancepolymer_repeat_repeatUnit_degreeOfPolymerisation",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "degree", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "amount", Type: [{ TypeName: "SubstanceAmount" }] },
    ],
};

export const substancepolymer_repeat_repeatUnit_structuralRepresentation: TypeModel = {
    TypeName: "substancepolymer_repeat_repeatUnit_structuralRepresentation",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "representation", Type: [{ TypeName: "string" }] },
        { ElementName: "attachment", Type: [{ TypeName: "Attachment" }] },
    ],
};

export const SubstanceProtein: TypeModel = {
    TypeName: "SubstanceProtein",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "sequenceType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "numberOfSubunits", Type: [{ TypeName: "integer" }] },
        { ElementName: "disulfideLinkage", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "subunit", Type: [{ TypeName: "substanceprotein_subunit" }], IsArray: true },
    ],
};

export const substanceprotein_subunit: TypeModel = {
    TypeName: "substanceprotein_subunit",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "subunit", Type: [{ TypeName: "integer" }] },
        { ElementName: "sequence", Type: [{ TypeName: "string" }] },
        { ElementName: "length", Type: [{ TypeName: "integer" }] },
        { ElementName: "sequenceAttachment", Type: [{ TypeName: "Attachment" }] },
        { ElementName: "nTerminalModificationId", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "nTerminalModification", Type: [{ TypeName: "string" }] },
        { ElementName: "cTerminalModificationId", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "cTerminalModification", Type: [{ TypeName: "string" }] },
    ],
};

export const SubstanceReferenceInformation: TypeModel = {
    TypeName: "SubstanceReferenceInformation",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "comment", Type: [{ TypeName: "string" }] },
        { ElementName: "gene", Type: [{ TypeName: "substancereferenceinformation_gene" }], IsArray: true },
        { ElementName: "geneElement", Type: [{ TypeName: "substancereferenceinformation_geneElement" }], IsArray: true },
        { ElementName: "classification", Type: [{ TypeName: "substancereferenceinformation_classification" }], IsArray: true },
        { ElementName: "target", Type: [{ TypeName: "substancereferenceinformation_target" }], IsArray: true },
    ],
};

export const substancereferenceinformation_gene: TypeModel = {
    TypeName: "substancereferenceinformation_gene",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "geneSequenceOrigin", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "gene", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "source", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DocumentReference"] }], IsArray: true },
    ],
};

export const substancereferenceinformation_geneElement: TypeModel = {
    TypeName: "substancereferenceinformation_geneElement",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "element", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "source", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DocumentReference"] }], IsArray: true },
    ],
};

export const substancereferenceinformation_classification: TypeModel = {
    TypeName: "substancereferenceinformation_classification",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "domain", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "classification", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "subtype", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "source", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DocumentReference"] }], IsArray: true },
    ],
};

export const substancereferenceinformation_target: TypeModel = {
    TypeName: "substancereferenceinformation_target",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "target", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "interaction", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "organism", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "organismType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "amount[x]", Type: [{ TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "string" }] },
        { ElementName: "amountType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "source", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DocumentReference"] }], IsArray: true },
    ],
};

export const SubstanceSourceMaterial: TypeModel = {
    TypeName: "SubstanceSourceMaterial",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "sourceMaterialClass", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "sourceMaterialType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "sourceMaterialState", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "organismId", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "organismName", Type: [{ TypeName: "string" }] },
        { ElementName: "parentSubstanceId", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "parentSubstanceName", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "countryOfOrigin", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "geographicalLocation", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "developmentStage", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "fractionDescription", Type: [{ TypeName: "substancesourcematerial_fractionDescription" }], IsArray: true },
        { ElementName: "organism", Type: [{ TypeName: "substancesourcematerial_organism" }] },
        { ElementName: "partDescription", Type: [{ TypeName: "substancesourcematerial_partDescription" }], IsArray: true },
    ],
};

export const substancesourcematerial_fractionDescription: TypeModel = {
    TypeName: "substancesourcematerial_fractionDescription",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "fraction", Type: [{ TypeName: "string" }] },
        { ElementName: "materialType", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const substancesourcematerial_organism: TypeModel = {
    TypeName: "substancesourcematerial_organism",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "family", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "genus", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "species", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "intraspecificType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "intraspecificDescription", Type: [{ TypeName: "string" }] },
        { ElementName: "author", Type: [{ TypeName: "substancesourcematerial_organism_author" }], IsArray: true },
        { ElementName: "hybrid", Type: [{ TypeName: "substancesourcematerial_organism_hybrid" }] },
        { ElementName: "organismGeneral", Type: [{ TypeName: "substancesourcematerial_organism_organismGeneral" }] },
    ],
};

export const substancesourcematerial_organism_author: TypeModel = {
    TypeName: "substancesourcematerial_organism_author",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "authorType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "authorDescription", Type: [{ TypeName: "string" }] },
    ],
};

export const substancesourcematerial_organism_hybrid: TypeModel = {
    TypeName: "substancesourcematerial_organism_hybrid",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "maternalOrganismId", Type: [{ TypeName: "string" }] },
        { ElementName: "maternalOrganismName", Type: [{ TypeName: "string" }] },
        { ElementName: "paternalOrganismId", Type: [{ TypeName: "string" }] },
        { ElementName: "paternalOrganismName", Type: [{ TypeName: "string" }] },
        { ElementName: "hybridType", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const substancesourcematerial_organism_organismGeneral: TypeModel = {
    TypeName: "substancesourcematerial_organism_organismGeneral",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "kingdom", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "phylum", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "class", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "order", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const substancesourcematerial_partDescription: TypeModel = {
    TypeName: "substancesourcematerial_partDescription",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "part", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "partLocation", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const SubstanceSpecification: TypeModel = {
    TypeName: "SubstanceSpecification",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "status", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "domain", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "source", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DocumentReference"] }], IsArray: true },
        { ElementName: "comment", Type: [{ TypeName: "string" }] },
        { ElementName: "moiety", Type: [{ TypeName: "substancespecification_moiety" }], IsArray: true },
        { ElementName: "property", Type: [{ TypeName: "substancespecification_property" }], IsArray: true },
        { ElementName: "referenceInformation", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/SubstanceReferenceInformation"] }] },
        { ElementName: "structure", Type: [{ TypeName: "substancespecification_structure" }] },
        { ElementName: "code", Type: [{ TypeName: "substancespecification_code" }], IsArray: true },
        { ElementName: "name", Type: [{ TypeName: "substancespecification_name" }], IsArray: true },
        { ElementName: "molecularWeight", Type: [{ TypeName: "substancespecification_structure_isotope_molecularWeight" }], IsArray: true },
        { ElementName: "relationship", Type: [{ TypeName: "substancespecification_relationship" }], IsArray: true },
        { ElementName: "nucleicAcid", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/SubstanceNucleicAcid"] }] },
        { ElementName: "polymer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/SubstancePolymer"] }] },
        { ElementName: "protein", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/SubstanceProtein"] }] },
        { ElementName: "sourceMaterial", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/SubstanceSourceMaterial"] }] },
    ],
};

export const substancespecification_moiety: TypeModel = {
    TypeName: "substancespecification_moiety",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "stereochemistry", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "opticalActivity", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "molecularFormula", Type: [{ TypeName: "string" }] },
        { ElementName: "amount[x]", Type: [{ TypeName: "Quantity" }, { TypeName: "string" }] },
    ],
};

export const substancespecification_property: TypeModel = {
    TypeName: "substancespecification_property",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "parameters", Type: [{ TypeName: "string" }] },
        { ElementName: "definingSubstance[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Substance", "http://hl7.org/fhir/StructureDefinition/SubstanceSpecification"] }] },
        { ElementName: "amount[x]", Type: [{ TypeName: "Quantity" }, { TypeName: "string" }] },
    ],
};

export const substancespecification_structure: TypeModel = {
    TypeName: "substancespecification_structure",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "stereochemistry", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "opticalActivity", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "molecularFormula", Type: [{ TypeName: "string" }] },
        { ElementName: "molecularFormulaByMoiety", Type: [{ TypeName: "string" }] },
        { ElementName: "isotope", Type: [{ TypeName: "substancespecification_structure_isotope" }], IsArray: true },
        { ElementName: "molecularWeight", Type: [{ TypeName: "substancespecification_structure_isotope_molecularWeight" }] },
        { ElementName: "source", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DocumentReference"] }], IsArray: true },
        { ElementName: "representation", Type: [{ TypeName: "substancespecification_structure_representation" }], IsArray: true },
    ],
};

export const substancespecification_structure_isotope: TypeModel = {
    TypeName: "substancespecification_structure_isotope",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "name", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "substitution", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "halfLife", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "molecularWeight", Type: [{ TypeName: "substancespecification_structure_isotope_molecularWeight" }] },
    ],
};

export const substancespecification_structure_isotope_molecularWeight: TypeModel = {
    TypeName: "substancespecification_structure_isotope_molecularWeight",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "method", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "amount", Type: [{ TypeName: "Quantity" }] },
    ],
};

export const substancespecification_structure_representation: TypeModel = {
    TypeName: "substancespecification_structure_representation",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "representation", Type: [{ TypeName: "string" }] },
        { ElementName: "attachment", Type: [{ TypeName: "Attachment" }] },
    ],
};

export const substancespecification_code: TypeModel = {
    TypeName: "substancespecification_code",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "status", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "statusDate", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "comment", Type: [{ TypeName: "string" }] },
        { ElementName: "source", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DocumentReference"] }], IsArray: true },
    ],
};

export const substancespecification_name: TypeModel = {
    TypeName: "substancespecification_name",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "name", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "status", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "preferred", Type: [{ TypeName: "boolean" }] },
        { ElementName: "language", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "domain", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "jurisdiction", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "synonym", Type: [{ TypeName: "substancespecification_name" }], IsArray: true },
        { ElementName: "translation", Type: [{ TypeName: "substancespecification_name" }], IsArray: true },
        { ElementName: "official", Type: [{ TypeName: "substancespecification_name_official" }], IsArray: true },
        { ElementName: "source", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DocumentReference"] }], IsArray: true },
    ],
};

export const substancespecification_name_official: TypeModel = {
    TypeName: "substancespecification_name_official",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "authority", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "status", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
    ],
};

export const substancespecification_relationship: TypeModel = {
    TypeName: "substancespecification_relationship",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "substance[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/SubstanceSpecification"] }] },
        { ElementName: "relationship", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "isDefining", Type: [{ TypeName: "boolean" }] },
        { ElementName: "amount[x]", Type: [{ TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "string" }] },
        { ElementName: "amountRatioLowLimit", Type: [{ TypeName: "Ratio" }] },
        { ElementName: "amountType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "source", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DocumentReference"] }], IsArray: true },
    ],
};

export const SupplyDelivery: TypeModel = {
    TypeName: "SupplyDelivery",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "basedOn", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/SupplyRequest"] }], IsArray: true },
        { ElementName: "partOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Contract", "http://hl7.org/fhir/StructureDefinition/SupplyDelivery"] }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }] },
        { ElementName: "patient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "suppliedItem", Type: [{ TypeName: "supplydelivery_suppliedItem" }] },
        { ElementName: "occurrence[x]", Type: [{ TypeName: "Period" }, { TypeName: "Timing" }, { TypeName: "dateTime" }] },
        { ElementName: "supplier", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "destination", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "receiver", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }], IsArray: true },
    ],
};

export const supplydelivery_suppliedItem: TypeModel = {
    TypeName: "supplydelivery_suppliedItem",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "item[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Medication", "http://hl7.org/fhir/StructureDefinition/Substance"] }] },
    ],
};

export const SupplyRequest: TypeModel = {
    TypeName: "SupplyRequest",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }] },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "priority", Type: [{ TypeName: "code" }] },
        { ElementName: "item[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Medication", "http://hl7.org/fhir/StructureDefinition/Substance"] }], Required: true },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }], Required: true },
        { ElementName: "parameter", Type: [{ TypeName: "supplyrequest_parameter" }], IsArray: true },
        { ElementName: "occurrence[x]", Type: [{ TypeName: "Period" }, { TypeName: "Timing" }, { TypeName: "dateTime" }] },
        { ElementName: "authoredOn", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "requester", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "supplier", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Organization"] }], IsArray: true },
        { ElementName: "reasonCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "reasonReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Condition", "http://hl7.org/fhir/StructureDefinition/DiagnosticReport", "http://hl7.org/fhir/StructureDefinition/DocumentReference", "http://hl7.org/fhir/StructureDefinition/Observation"] }], IsArray: true },
        { ElementName: "deliverFrom", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "deliverTo", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient"] }] },
    ],
};

export const supplyrequest_parameter: TypeModel = {
    TypeName: "supplyrequest_parameter",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "value[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "boolean" }] },
    ],
};

export const Task: TypeModel = {
    TypeName: "Task",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "instantiatesCanonical", Type: [{ TypeName: "canonical" }] },
        { ElementName: "instantiatesUri", Type: [{ TypeName: "uri" }] },
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
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "executionPeriod", Type: [{ TypeName: "Period" }] },
        { ElementName: "authoredOn", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "lastModified", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "requester", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "performerType", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "owner", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "location", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "reasonCode", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "reasonReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
        { ElementName: "insurance", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ClaimResponse", "http://hl7.org/fhir/StructureDefinition/Coverage"] }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "relevantHistory", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Provenance"] }], IsArray: true },
        { ElementName: "restriction", Type: [{ TypeName: "task_restriction" }] },
        { ElementName: "input", Type: [{ TypeName: "task_input" }], IsArray: true },
        { ElementName: "output", Type: [{ TypeName: "task_output" }], IsArray: true },
    ],
};

export const task_restriction: TypeModel = {
    TypeName: "task_restriction",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "repetitions", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "recipient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], IsArray: true },
    ],
};

export const task_input: TypeModel = {
    TypeName: "task_input",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "Address" }, { TypeName: "Age" }, { TypeName: "Annotation" }, { TypeName: "Attachment" }, { TypeName: "CodeableConcept" }, { TypeName: "Coding" }, { TypeName: "ContactDetail" }, { TypeName: "ContactPoint" }, { TypeName: "Contributor" }, { TypeName: "Count" }, { TypeName: "DataRequirement" }, { TypeName: "Distance" }, { TypeName: "Dosage" }, { TypeName: "Duration" }, { TypeName: "Expression" }, { TypeName: "HumanName" }, { TypeName: "Identifier" }, { TypeName: "Meta" }, { TypeName: "Money" }, { TypeName: "ParameterDefinition" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "Reference" }, { TypeName: "RelatedArtifact" }, { TypeName: "SampledData" }, { TypeName: "Signature" }, { TypeName: "Timing" }, { TypeName: "TriggerDefinition" }, { TypeName: "UsageContext" }, { TypeName: "base64Binary" }, { TypeName: "boolean" }, { TypeName: "canonical" }, { TypeName: "code" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "id" }, { TypeName: "instant" }, { TypeName: "integer" }, { TypeName: "markdown" }, { TypeName: "oid" }, { TypeName: "positiveInt" }, { TypeName: "string" }, { TypeName: "time" }, { TypeName: "unsignedInt" }, { TypeName: "uri" }, { TypeName: "url" }, { TypeName: "uuid" }], Required: true },
    ],
};

export const task_output: TypeModel = {
    TypeName: "task_output",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "Address" }, { TypeName: "Age" }, { TypeName: "Annotation" }, { TypeName: "Attachment" }, { TypeName: "CodeableConcept" }, { TypeName: "Coding" }, { TypeName: "ContactDetail" }, { TypeName: "ContactPoint" }, { TypeName: "Contributor" }, { TypeName: "Count" }, { TypeName: "DataRequirement" }, { TypeName: "Distance" }, { TypeName: "Dosage" }, { TypeName: "Duration" }, { TypeName: "Expression" }, { TypeName: "HumanName" }, { TypeName: "Identifier" }, { TypeName: "Meta" }, { TypeName: "Money" }, { TypeName: "ParameterDefinition" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "Reference" }, { TypeName: "RelatedArtifact" }, { TypeName: "SampledData" }, { TypeName: "Signature" }, { TypeName: "Timing" }, { TypeName: "TriggerDefinition" }, { TypeName: "UsageContext" }, { TypeName: "base64Binary" }, { TypeName: "boolean" }, { TypeName: "canonical" }, { TypeName: "code" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "id" }, { TypeName: "instant" }, { TypeName: "integer" }, { TypeName: "markdown" }, { TypeName: "oid" }, { TypeName: "positiveInt" }, { TypeName: "string" }, { TypeName: "time" }, { TypeName: "unsignedInt" }, { TypeName: "uri" }, { TypeName: "url" }, { TypeName: "uuid" }], Required: true },
    ],
};

export const TerminologyCapabilities: TypeModel = {
    TypeName: "TerminologyCapabilities",
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
        { ElementName: "software", Type: [{ TypeName: "terminologycapabilities_software" }] },
        { ElementName: "implementation", Type: [{ TypeName: "terminologycapabilities_implementation" }] },
        { ElementName: "lockedDate", Type: [{ TypeName: "boolean" }] },
        { ElementName: "codeSystem", Type: [{ TypeName: "terminologycapabilities_codeSystem" }], IsArray: true },
        { ElementName: "expansion", Type: [{ TypeName: "terminologycapabilities_expansion" }] },
        { ElementName: "codeSearch", Type: [{ TypeName: "code" }] },
        { ElementName: "validateCode", Type: [{ TypeName: "terminologycapabilities_validateCode" }] },
        { ElementName: "translation", Type: [{ TypeName: "terminologycapabilities_translation" }] },
        { ElementName: "closure", Type: [{ TypeName: "terminologycapabilities_closure" }] },
    ],
};

export const terminologycapabilities_software: TypeModel = {
    TypeName: "terminologycapabilities_software",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "name", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
    ],
};

export const terminologycapabilities_implementation: TypeModel = {
    TypeName: "terminologycapabilities_implementation",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "description", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "url", Type: [{ TypeName: "url" }] },
    ],
};

export const terminologycapabilities_codeSystem: TypeModel = {
    TypeName: "terminologycapabilities_codeSystem",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "uri", Type: [{ TypeName: "canonical" }] },
        { ElementName: "version", Type: [{ TypeName: "terminologycapabilities_codeSystem_version" }], IsArray: true },
        { ElementName: "subsumption", Type: [{ TypeName: "boolean" }] },
    ],
};

export const terminologycapabilities_codeSystem_version: TypeModel = {
    TypeName: "terminologycapabilities_codeSystem_version",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "string" }] },
        { ElementName: "isDefault", Type: [{ TypeName: "boolean" }] },
        { ElementName: "compositional", Type: [{ TypeName: "boolean" }] },
        { ElementName: "language", Type: [{ TypeName: "code" }], IsArray: true },
        { ElementName: "filter", Type: [{ TypeName: "terminologycapabilities_codeSystem_version_filter" }], IsArray: true },
        { ElementName: "property", Type: [{ TypeName: "code" }], IsArray: true },
    ],
};

export const terminologycapabilities_codeSystem_version_filter: TypeModel = {
    TypeName: "terminologycapabilities_codeSystem_version_filter",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "op", Type: [{ TypeName: "code" }], IsArray: true, Required: true },
    ],
};

export const terminologycapabilities_expansion: TypeModel = {
    TypeName: "terminologycapabilities_expansion",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "hierarchical", Type: [{ TypeName: "boolean" }] },
        { ElementName: "paging", Type: [{ TypeName: "boolean" }] },
        { ElementName: "incomplete", Type: [{ TypeName: "boolean" }] },
        { ElementName: "parameter", Type: [{ TypeName: "terminologycapabilities_expansion_parameter" }], IsArray: true },
        { ElementName: "textFilter", Type: [{ TypeName: "markdown" }] },
    ],
};

export const terminologycapabilities_expansion_parameter: TypeModel = {
    TypeName: "terminologycapabilities_expansion_parameter",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "name", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "documentation", Type: [{ TypeName: "string" }] },
    ],
};

export const terminologycapabilities_validateCode: TypeModel = {
    TypeName: "terminologycapabilities_validateCode",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "translations", Type: [{ TypeName: "boolean" }], Required: true },
    ],
};

export const terminologycapabilities_translation: TypeModel = {
    TypeName: "terminologycapabilities_translation",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "needsMap", Type: [{ TypeName: "boolean" }], Required: true },
    ],
};

export const terminologycapabilities_closure: TypeModel = {
    TypeName: "terminologycapabilities_closure",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "translation", Type: [{ TypeName: "boolean" }] },
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
        { ElementName: "required", Type: [{ TypeName: "boolean" }], Required: true },
        { ElementName: "validated", Type: [{ TypeName: "boolean" }], Required: true },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "origin", Type: [{ TypeName: "integer" }], IsArray: true },
        { ElementName: "destination", Type: [{ TypeName: "integer" }] },
        { ElementName: "link", Type: [{ TypeName: "uri" }], IsArray: true },
        { ElementName: "capabilities", Type: [{ TypeName: "canonical" }], Required: true },
    ],
};

export const testscript_fixture: TypeModel = {
    TypeName: "testscript_fixture",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "autocreate", Type: [{ TypeName: "boolean" }], Required: true },
        { ElementName: "autodelete", Type: [{ TypeName: "boolean" }], Required: true },
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
        { ElementName: "encodeRequestUrl", Type: [{ TypeName: "boolean" }], Required: true },
        { ElementName: "method", Type: [{ TypeName: "code" }] },
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
        { ElementName: "sourceId", Type: [{ TypeName: "id" }] },
        { ElementName: "validateProfileId", Type: [{ TypeName: "id" }] },
        { ElementName: "value", Type: [{ TypeName: "string" }] },
        { ElementName: "warningOnly", Type: [{ TypeName: "boolean" }], Required: true },
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
        { ElementName: "valueSet", Type: [{ TypeName: "canonical" }], IsArray: true },
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
        { ElementName: "value", Type: [{ TypeName: "string" }], Required: true },
    ],
};

export const valueset_expansion: TypeModel = {
    TypeName: "valueset_expansion",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "uri" }] },
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
        { ElementName: "value[x]", Type: [{ TypeName: "boolean" }, { TypeName: "code" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "integer" }, { TypeName: "string" }, { TypeName: "uri" }] },
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

export const VerificationResult: TypeModel = {
    TypeName: "VerificationResult",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "target", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "targetLocation", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "need", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "statusDate", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "validationType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "validationProcess", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "frequency", Type: [{ TypeName: "Timing" }] },
        { ElementName: "lastPerformed", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "nextScheduled", Type: [{ TypeName: "date" }] },
        { ElementName: "failureAction", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "primarySource", Type: [{ TypeName: "verificationresult_primarySource" }], IsArray: true },
        { ElementName: "attestation", Type: [{ TypeName: "verificationresult_attestation" }] },
        { ElementName: "validator", Type: [{ TypeName: "verificationresult_validator" }], IsArray: true },
    ],
};

export const verificationresult_primarySource: TypeModel = {
    TypeName: "verificationresult_primarySource",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "who", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "communicationMethod", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "validationStatus", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "validationDate", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "canPushUpdates", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "pushTypeAvailable", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
    ],
};

export const verificationresult_attestation: TypeModel = {
    TypeName: "verificationresult_attestation",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "who", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "onBehalfOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "communicationMethod", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "date", Type: [{ TypeName: "date" }] },
        { ElementName: "sourceIdentityCertificate", Type: [{ TypeName: "string" }] },
        { ElementName: "proxyIdentityCertificate", Type: [{ TypeName: "string" }] },
        { ElementName: "proxySignature", Type: [{ TypeName: "Signature" }] },
        { ElementName: "sourceSignature", Type: [{ TypeName: "Signature" }] },
    ],
};

export const verificationresult_validator: TypeModel = {
    TypeName: "verificationresult_validator",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "organization", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }], Required: true },
        { ElementName: "identityCertificate", Type: [{ TypeName: "string" }] },
        { ElementName: "attestationSignature", Type: [{ TypeName: "Signature" }] },
    ],
};

export const VisionPrescription: TypeModel = {
    TypeName: "VisionPrescription",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "created", Type: [{ TypeName: "dateTime" }], Required: true },
        { ElementName: "patient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "dateWritten", Type: [{ TypeName: "dateTime" }], Required: true },
        { ElementName: "prescriber", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }], Required: true },
        { ElementName: "lensSpecification", Type: [{ TypeName: "visionprescription_lensSpecification" }], IsArray: true, Required: true },
    ],
};

export const visionprescription_lensSpecification: TypeModel = {
    TypeName: "visionprescription_lensSpecification",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "product", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "eye", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "sphere", Type: [{ TypeName: "decimal" }] },
        { ElementName: "cylinder", Type: [{ TypeName: "decimal" }] },
        { ElementName: "axis", Type: [{ TypeName: "integer" }] },
        { ElementName: "prism", Type: [{ TypeName: "visionprescription_lensSpecification_prism" }], IsArray: true },
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

export const visionprescription_lensSpecification_prism: TypeModel = {
    TypeName: "visionprescription_lensSpecification_prism",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "amount", Type: [{ TypeName: "decimal" }], Required: true },
        { ElementName: "base", Type: [{ TypeName: "code" }], Required: true },
    ],
};
