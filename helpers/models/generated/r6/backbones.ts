// THIS FILE IS GENERATED — DO NOT EDIT BY HAND.
// Run `npm run generate:models -- --version <r4|r4b|r5|r6>` to regenerate.
// See docs/custom-model-generator-plan.md.

import type { TypeModel } from "../../../custom_model";

// Synthetic backbone / nested-element types

export const account_balance: TypeModel = {
    TypeName: "account_balance",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "aggregate", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "term", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "estimate", Type: [{ TypeName: "boolean" }] },
        { ElementName: "amount", Type: [{ TypeName: "Money" }], Required: true },
    ],
};

export const account_coverage: TypeModel = {
    TypeName: "account_coverage",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "coverage", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Coverage"] }], Required: true },
        { ElementName: "priority", Type: [{ TypeName: "positiveInt" }] },
    ],
};

export const account_diagnosis: TypeModel = {
    TypeName: "account_diagnosis",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "sequence", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "condition", Type: [{ TypeName: "CodeableReference" }], Required: true },
        { ElementName: "dateOfDiagnosis", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "onAdmission", Type: [{ TypeName: "boolean" }] },
        { ElementName: "packageCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
    ],
};

export const account_guarantor: TypeModel = {
    TypeName: "account_guarantor",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "party", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "onHold", Type: [{ TypeName: "boolean" }] },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "account", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Account"] }] },
        { ElementName: "responsibility", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "limit", Type: [{ TypeName: "Money" }] },
        { ElementName: "rank", Type: [{ TypeName: "positiveInt" }] },
    ],
};

export const account_procedure: TypeModel = {
    TypeName: "account_procedure",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "sequence", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableReference" }], Required: true },
        { ElementName: "dateOfService", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "packageCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "device", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }], IsArray: true },
    ],
};

export const activitydefinition_dynamicValue: TypeModel = {
    TypeName: "activitydefinition_dynamicValue",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "path", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "expression", Type: [{ TypeName: "Expression" }], Required: true },
    ],
};

export const activitydefinition_participant: TypeModel = {
    TypeName: "activitydefinition_participant",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "code" }] },
        { ElementName: "typeCanonical", Type: [{ TypeName: "canonical" }] },
        { ElementName: "typeReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/BiologicallyDerivedProduct", "http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Endpoint", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Medication", "http://hl7.org/fhir/StructureDefinition/MedicinalProductDefinition", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson", "http://hl7.org/fhir/StructureDefinition/Specimen", "http://hl7.org/fhir/StructureDefinition/Substance", "http://hl7.org/fhir/StructureDefinition/SubstanceDefinition"] }] },
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "function", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const administrableproductdefinition_property: TypeModel = {
    TypeName: "administrableproductdefinition_property",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "CodeableConcept" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Binary"] }, { TypeName: "boolean" }, { TypeName: "date" }, { TypeName: "markdown" }] },
        { ElementName: "status", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const administrableproductdefinition_routeOfAdministration: TypeModel = {
    TypeName: "administrableproductdefinition_routeOfAdministration",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "firstDose", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "maxSingleDose", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "maxDosePerDay", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "maxDosePerTreatmentPeriod", Type: [{ TypeName: "Ratio" }] },
        { ElementName: "maxTreatmentPeriod", Type: [{ TypeName: "Duration" }] },
        { ElementName: "targetSpecies", Type: [{ TypeName: "administrableproductdefinition_routeOfAdministration_targetSpecies" }], IsArray: true },
    ],
};

export const administrableproductdefinition_routeOfAdministration_targetSpecies: TypeModel = {
    TypeName: "administrableproductdefinition_routeOfAdministration_targetSpecies",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "withdrawalPeriod", Type: [{ TypeName: "administrableproductdefinition_routeOfAdministration_targetSpecies_withdrawalPeriod" }], IsArray: true },
    ],
};

export const administrableproductdefinition_routeOfAdministration_targetSpecies_withdrawalPeriod: TypeModel = {
    TypeName: "administrableproductdefinition_routeOfAdministration_targetSpecies_withdrawalPeriod",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "tissue", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "value", Type: [{ TypeName: "Quantity" }], Required: true },
        { ElementName: "supportingInformation", Type: [{ TypeName: "string" }] },
    ],
};

export const adverseevent_participant: TypeModel = {
    TypeName: "adverseevent_participant",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "function", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "actor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
    ],
};

export const adverseevent_suspectEntity: TypeModel = {
    TypeName: "adverseevent_suspectEntity",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "instance", Type: [{ TypeName: "CodeableReference" }], Required: true },
        { ElementName: "causality", Type: [{ TypeName: "adverseevent_suspectEntity_causality" }] },
        { ElementName: "occurrence[x]", Type: [{ TypeName: "Period" }, { TypeName: "dateTime" }] },
    ],
};

export const adverseevent_suspectEntity_causality: TypeModel = {
    TypeName: "adverseevent_suspectEntity_causality",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "assessmentMethod", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "entityRelatedness", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "author", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
    ],
};

export const allergyintolerance_reaction: TypeModel = {
    TypeName: "allergyintolerance_reaction",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "substance", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "manifestation", Type: [{ TypeName: "CodeableReference" }], IsArray: true, Required: true },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "onset", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "severity", Type: [{ TypeName: "code" }] },
        { ElementName: "exposureRoute", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
    ],
};

export const appointment_participant: TypeModel = {
    TypeName: "appointment_participant",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "actor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "required", Type: [{ TypeName: "boolean" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
    ],
};

export const appointment_recurrenceTemplate: TypeModel = {
    TypeName: "appointment_recurrenceTemplate",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "timezone", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "recurrenceType", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "lastOccurrenceDate", Type: [{ TypeName: "date" }] },
        { ElementName: "occurrenceCount", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "occurrenceDate", Type: [{ TypeName: "date" }], IsArray: true },
        { ElementName: "weeklyTemplate", Type: [{ TypeName: "appointment_recurrenceTemplate_weeklyTemplate" }] },
        { ElementName: "monthlyTemplate", Type: [{ TypeName: "appointment_recurrenceTemplate_monthlyTemplate" }] },
        { ElementName: "yearlyTemplate", Type: [{ TypeName: "appointment_recurrenceTemplate_yearlyTemplate" }] },
        { ElementName: "excludingDate", Type: [{ TypeName: "date" }], IsArray: true },
        { ElementName: "excludingRecurrenceId", Type: [{ TypeName: "positiveInt" }], IsArray: true },
    ],
};

export const appointment_recurrenceTemplate_monthlyTemplate: TypeModel = {
    TypeName: "appointment_recurrenceTemplate_monthlyTemplate",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "dayOfMonth", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "nthWeekOfMonth", Type: [{ TypeName: "Coding" }] },
        { ElementName: "dayOfWeek", Type: [{ TypeName: "Coding" }] },
        { ElementName: "monthInterval", Type: [{ TypeName: "positiveInt" }], Required: true },
    ],
};

export const appointment_recurrenceTemplate_weeklyTemplate: TypeModel = {
    TypeName: "appointment_recurrenceTemplate_weeklyTemplate",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "monday", Type: [{ TypeName: "boolean" }] },
        { ElementName: "tuesday", Type: [{ TypeName: "boolean" }] },
        { ElementName: "wednesday", Type: [{ TypeName: "boolean" }] },
        { ElementName: "thursday", Type: [{ TypeName: "boolean" }] },
        { ElementName: "friday", Type: [{ TypeName: "boolean" }] },
        { ElementName: "saturday", Type: [{ TypeName: "boolean" }] },
        { ElementName: "sunday", Type: [{ TypeName: "boolean" }] },
        { ElementName: "weekInterval", Type: [{ TypeName: "positiveInt" }] },
    ],
};

export const appointment_recurrenceTemplate_yearlyTemplate: TypeModel = {
    TypeName: "appointment_recurrenceTemplate_yearlyTemplate",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "yearInterval", Type: [{ TypeName: "positiveInt" }], Required: true },
    ],
};

export const artifactassessment_content: TypeModel = {
    TypeName: "artifactassessment_content",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "summary", Type: [{ TypeName: "markdown" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "classifier", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "author", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }], IsArray: true },
        { ElementName: "path", Type: [{ TypeName: "uri" }], IsArray: true },
        { ElementName: "relatesTo", Type: [{ TypeName: "artifactassessment_relatesTo" }], IsArray: true },
        { ElementName: "freeToShare", Type: [{ TypeName: "boolean" }] },
        { ElementName: "component", Type: [{ TypeName: "artifactassessment_content" }], IsArray: true },
    ],
};

export const artifactassessment_relatesTo: TypeModel = {
    TypeName: "artifactassessment_relatesTo",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "target[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }, { TypeName: "canonical" }, { TypeName: "markdown" }, { TypeName: "uri" }], Required: true },
    ],
};

export const auditevent_agent: TypeModel = {
    TypeName: "auditevent_agent",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "who", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/DeviceDefinition", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
        { ElementName: "requestor", Type: [{ TypeName: "boolean" }] },
        { ElementName: "location", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "policy", Type: [{ TypeName: "uri" }], IsArray: true },
        { ElementName: "network[x]", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Endpoint"] }, { TypeName: "string" }, { TypeName: "uri" }] },
        { ElementName: "authorization", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
    ],
};

export const auditevent_entity: TypeModel = {
    TypeName: "auditevent_entity",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "what", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "securityLabel", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "query", Type: [{ TypeName: "base64Binary" }] },
        { ElementName: "detail", Type: [{ TypeName: "auditevent_entity_detail" }], IsArray: true },
        { ElementName: "agent", Type: [{ TypeName: "auditevent_agent" }], IsArray: true },
    ],
};

export const auditevent_entity_detail: TypeModel = {
    TypeName: "auditevent_entity_detail",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "base64Binary" }, { TypeName: "boolean" }, { TypeName: "dateTime" }, { TypeName: "integer" }, { TypeName: "string" }, { TypeName: "time" }], Required: true },
    ],
};

export const auditevent_outcome: TypeModel = {
    TypeName: "auditevent_outcome",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "Coding" }], Required: true },
        { ElementName: "detail", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
    ],
};

export const auditevent_source: TypeModel = {
    TypeName: "auditevent_source",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "site", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "observer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
    ],
};

export const availability_availableTime: TypeModel = {
    TypeName: "availability_availableTime",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "daysOfWeek", Type: [{ TypeName: "code" }], IsArray: true },
        { ElementName: "allDay", Type: [{ TypeName: "boolean" }] },
        { ElementName: "availableStartTime", Type: [{ TypeName: "time" }] },
        { ElementName: "availableEndTime", Type: [{ TypeName: "time" }] },
    ],
};

export const availability_notAvailableTime: TypeModel = {
    TypeName: "availability_notAvailableTime",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "during", Type: [{ TypeName: "Period" }] },
    ],
};

export const biologicallyderivedproduct_collection: TypeModel = {
    TypeName: "biologicallyderivedproduct_collection",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "collector", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "sourcePatient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }] },
        { ElementName: "sourceOrganization", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "collected[x]", Type: [{ TypeName: "Period" }, { TypeName: "dateTime" }] },
        { ElementName: "procedure", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Procedure"] }] },
    ],
};

export const biologicallyderivedproduct_property: TypeModel = {
    TypeName: "biologicallyderivedproduct_property",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "CodeableConcept" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "boolean" }, { TypeName: "integer" }, { TypeName: "string" }], Required: true },
    ],
};

export const bodystructure_includedStructure: TypeModel = {
    TypeName: "bodystructure_includedStructure",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "structure", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "laterality", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "bodyLandmarkOrientation", Type: [{ TypeName: "bodystructure_includedStructure_bodyLandmarkOrientation" }], IsArray: true },
        { ElementName: "spatialReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ImagingSelection"] }], IsArray: true },
        { ElementName: "image", Type: [{ TypeName: "Attachment" }], IsArray: true },
        { ElementName: "qualifier", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "morphology", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const bodystructure_includedStructure_bodyLandmarkOrientation: TypeModel = {
    TypeName: "bodystructure_includedStructure_bodyLandmarkOrientation",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "landmarkDescription", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "clockFacePosition", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "distanceFromLandmark", Type: [{ TypeName: "bodystructure_includedStructure_bodyLandmarkOrientation_distanceFromLandmark" }], IsArray: true },
        { ElementName: "surfaceOrientation", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
    ],
};

export const bodystructure_includedStructure_bodyLandmarkOrientation_distanceFromLandmark: TypeModel = {
    TypeName: "bodystructure_includedStructure_bodyLandmarkOrientation_distanceFromLandmark",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "device", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "value", Type: [{ TypeName: "Quantity" }], IsArray: true },
    ],
};

export const bundle_entry: TypeModel = {
    TypeName: "bundle_entry",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "link", Type: [{ TypeName: "bundle_link" }], IsArray: true },
        { ElementName: "fullUrl", Type: [{ TypeName: "uri" }] },
        { ElementName: "resource", Type: [{ TypeName: "Resource" }] },
        { ElementName: "search", Type: [{ TypeName: "bundle_entry_search" }] },
        { ElementName: "request", Type: [{ TypeName: "bundle_entry_request" }] },
        { ElementName: "response", Type: [{ TypeName: "bundle_entry_response" }] },
    ],
};

export const bundle_entry_request: TypeModel = {
    TypeName: "bundle_entry_request",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "location", Type: [{ TypeName: "uri" }] },
        { ElementName: "etag", Type: [{ TypeName: "string" }] },
        { ElementName: "lastModified", Type: [{ TypeName: "instant" }] },
        { ElementName: "outcome", Type: [{ TypeName: "Resource" }] },
    ],
};

export const bundle_entry_search: TypeModel = {
    TypeName: "bundle_entry_search",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "mode", Type: [{ TypeName: "code" }] },
        { ElementName: "score", Type: [{ TypeName: "decimal" }] },
    ],
};

export const bundle_link: TypeModel = {
    TypeName: "bundle_link",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "relation", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "url", Type: [{ TypeName: "uri" }], Required: true },
    ],
};

export const capabilitystatement_document: TypeModel = {
    TypeName: "capabilitystatement_document",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "mode", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "documentation", Type: [{ TypeName: "markdown" }] },
        { ElementName: "profile", Type: [{ TypeName: "canonical" }], Required: true },
    ],
};

export const capabilitystatement_implementation: TypeModel = {
    TypeName: "capabilitystatement_implementation",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }], Required: true },
        { ElementName: "url", Type: [{ TypeName: "url" }] },
        { ElementName: "custodian", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
    ],
};

export const capabilitystatement_messaging: TypeModel = {
    TypeName: "capabilitystatement_messaging",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "protocol", Type: [{ TypeName: "Coding" }], Required: true },
        { ElementName: "address", Type: [{ TypeName: "url" }], Required: true },
    ],
};

export const capabilitystatement_messaging_supportedMessage: TypeModel = {
    TypeName: "capabilitystatement_messaging_supportedMessage",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "mode", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "definition", Type: [{ TypeName: "canonical" }], Required: true },
    ],
};

export const capabilitystatement_rest: TypeModel = {
    TypeName: "capabilitystatement_rest",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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

export const capabilitystatement_rest_interaction: TypeModel = {
    TypeName: "capabilitystatement_rest_interaction",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "documentation", Type: [{ TypeName: "markdown" }] },
    ],
};

export const capabilitystatement_rest_resource: TypeModel = {
    TypeName: "capabilitystatement_rest_resource",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "uri" }], Required: true },
        { ElementName: "definition", Type: [{ TypeName: "canonical" }] },
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
        { ElementName: "conditionalPatch", Type: [{ TypeName: "boolean" }] },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "documentation", Type: [{ TypeName: "markdown" }] },
    ],
};

export const capabilitystatement_rest_resource_operation: TypeModel = {
    TypeName: "capabilitystatement_rest_resource_operation",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "name", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "definition", Type: [{ TypeName: "canonical" }], Required: true },
        { ElementName: "documentation", Type: [{ TypeName: "markdown" }] },
    ],
};

export const capabilitystatement_rest_resource_searchParam: TypeModel = {
    TypeName: "capabilitystatement_rest_resource_searchParam",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "name", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "definition", Type: [{ TypeName: "canonical" }] },
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "documentation", Type: [{ TypeName: "markdown" }] },
    ],
};

export const capabilitystatement_rest_security: TypeModel = {
    TypeName: "capabilitystatement_rest_security",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "cors", Type: [{ TypeName: "boolean" }] },
        { ElementName: "service", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
    ],
};

export const capabilitystatement_software: TypeModel = {
    TypeName: "capabilitystatement_software",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "name", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "releaseDate", Type: [{ TypeName: "dateTime" }] },
    ],
};

export const careplan_activity: TypeModel = {
    TypeName: "careplan_activity",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "performedActivity", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "progress", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "plannedActivityReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Appointment", "http://hl7.org/fhir/StructureDefinition/CommunicationRequest", "http://hl7.org/fhir/StructureDefinition/DeviceRequest", "http://hl7.org/fhir/StructureDefinition/MedicationRequest", "http://hl7.org/fhir/StructureDefinition/NutritionOrder", "http://hl7.org/fhir/StructureDefinition/RequestOrchestration", "http://hl7.org/fhir/StructureDefinition/ServiceRequest", "http://hl7.org/fhir/StructureDefinition/Task", "http://hl7.org/fhir/StructureDefinition/VisionPrescription"] }] },
    ],
};

export const careteam_participant: TypeModel = {
    TypeName: "careteam_participant",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "member", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "onBehalfOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "effective[x]", Type: [{ TypeName: "Period" }, { TypeName: "Timing" }] },
        { ElementName: "supportingInfo", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
    ],
};

export const claim_accident: TypeModel = {
    TypeName: "claim_accident",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "date", Type: [{ TypeName: "date" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "location[x]", Type: [{ TypeName: "Address" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
    ],
};

export const claim_careTeam: TypeModel = {
    TypeName: "claim_careTeam",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "sequence", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "provider", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }], Required: true },
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "specialty", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const claim_diagnosis: TypeModel = {
    TypeName: "claim_diagnosis",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "sequence", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "diagnosis[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Condition"] }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "onAdmission", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const claim_event: TypeModel = {
    TypeName: "claim_event",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "when[x]", Type: [{ TypeName: "Period" }, { TypeName: "dateTime" }], Required: true },
    ],
};

export const claim_insurance: TypeModel = {
    TypeName: "claim_insurance",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "sequence", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "focal", Type: [{ TypeName: "boolean" }], Required: true },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "coverage", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Coverage"] }], Required: true },
        { ElementName: "businessArrangement", Type: [{ TypeName: "string" }] },
        { ElementName: "preAuthRef", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "claimResponse", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ClaimResponse"] }] },
    ],
};

export const claim_item: TypeModel = {
    TypeName: "claim_item",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "sequence", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "traceNumber", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Patient"] }] },
        { ElementName: "careTeamSequence", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "diagnosisSequence", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "procedureSequence", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "informationSequence", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "revenue", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "productOrService", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "productOrServiceEnd", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "request", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DeviceRequest", "http://hl7.org/fhir/StructureDefinition/MedicationRequest", "http://hl7.org/fhir/StructureDefinition/NutritionOrder", "http://hl7.org/fhir/StructureDefinition/ServiceRequest", "http://hl7.org/fhir/StructureDefinition/VisionPrescription"] }], IsArray: true },
        { ElementName: "modifier", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "programCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "serviced[x]", Type: [{ TypeName: "Period" }, { TypeName: "date" }] },
        { ElementName: "location[x]", Type: [{ TypeName: "Address" }, { TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "patientPaid", Type: [{ TypeName: "Money" }] },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "unitPrice", Type: [{ TypeName: "Money" }] },
        { ElementName: "factor", Type: [{ TypeName: "decimal" }] },
        { ElementName: "tax", Type: [{ TypeName: "Money" }] },
        { ElementName: "net", Type: [{ TypeName: "Money" }] },
        { ElementName: "udi", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }], IsArray: true },
        { ElementName: "bodySite", Type: [{ TypeName: "claim_item_bodySite" }], IsArray: true },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }], IsArray: true },
        { ElementName: "detail", Type: [{ TypeName: "claim_item_detail" }], IsArray: true },
    ],
};

export const claim_item_bodySite: TypeModel = {
    TypeName: "claim_item_bodySite",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "site", Type: [{ TypeName: "CodeableReference" }], IsArray: true, Required: true },
        { ElementName: "subSite", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
    ],
};

export const claim_item_detail: TypeModel = {
    TypeName: "claim_item_detail",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "sequence", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "traceNumber", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "revenue", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "productOrService", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "productOrServiceEnd", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "modifier", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "programCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "patientPaid", Type: [{ TypeName: "Money" }] },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "unitPrice", Type: [{ TypeName: "Money" }] },
        { ElementName: "factor", Type: [{ TypeName: "decimal" }] },
        { ElementName: "tax", Type: [{ TypeName: "Money" }] },
        { ElementName: "net", Type: [{ TypeName: "Money" }] },
        { ElementName: "udi", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }], IsArray: true },
        { ElementName: "subDetail", Type: [{ TypeName: "claim_item_detail_subDetail" }], IsArray: true },
    ],
};

export const claim_item_detail_subDetail: TypeModel = {
    TypeName: "claim_item_detail_subDetail",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "sequence", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "traceNumber", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "revenue", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "productOrService", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "productOrServiceEnd", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "modifier", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "programCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "patientPaid", Type: [{ TypeName: "Money" }] },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "unitPrice", Type: [{ TypeName: "Money" }] },
        { ElementName: "factor", Type: [{ TypeName: "decimal" }] },
        { ElementName: "tax", Type: [{ TypeName: "Money" }] },
        { ElementName: "net", Type: [{ TypeName: "Money" }] },
        { ElementName: "udi", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }], IsArray: true },
    ],
};

export const claim_payee: TypeModel = {
    TypeName: "claim_payee",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "party", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
    ],
};

export const claim_procedure: TypeModel = {
    TypeName: "claim_procedure",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "sequence", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "procedure[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Procedure"] }], Required: true },
        { ElementName: "udi", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }], IsArray: true },
    ],
};

export const claim_related: TypeModel = {
    TypeName: "claim_related",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "claim", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Claim"] }] },
        { ElementName: "relationship", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "reference", Type: [{ TypeName: "Identifier" }] },
    ],
};

export const claim_supportingInfo: TypeModel = {
    TypeName: "claim_supportingInfo",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "sequence", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "subCategory", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "timing[x]", Type: [{ TypeName: "Period" }, { TypeName: "Timing" }, { TypeName: "dateTime" }] },
        { ElementName: "value[x]", Type: [{ TypeName: "Address" }, { TypeName: "Age" }, { TypeName: "Annotation" }, { TypeName: "Attachment" }, { TypeName: "Availability" }, { TypeName: "CodeableConcept" }, { TypeName: "CodeableReference" }, { TypeName: "Coding" }, { TypeName: "ContactDetail" }, { TypeName: "ContactPoint" }, { TypeName: "Count" }, { TypeName: "DataRequirement" }, { TypeName: "Distance" }, { TypeName: "Dosage" }, { TypeName: "Duration" }, { TypeName: "Expression" }, { TypeName: "ExtendedContactDetail" }, { TypeName: "HumanName" }, { TypeName: "Identifier" }, { TypeName: "Meta" }, { TypeName: "Money" }, { TypeName: "ParameterDefinition" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "RatioRange" }, { TypeName: "Reference" }, { TypeName: "RelatedArtifact" }, { TypeName: "SampledData" }, { TypeName: "Signature" }, { TypeName: "Timing" }, { TypeName: "TriggerDefinition" }, { TypeName: "UsageContext" }, { TypeName: "VirtualServiceDetail" }, { TypeName: "base64Binary" }, { TypeName: "boolean" }, { TypeName: "canonical" }, { TypeName: "code" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "id" }, { TypeName: "instant" }, { TypeName: "integer" }, { TypeName: "integer64" }, { TypeName: "markdown" }, { TypeName: "oid" }, { TypeName: "positiveInt" }, { TypeName: "string" }, { TypeName: "time" }, { TypeName: "unsignedInt" }, { TypeName: "uri" }, { TypeName: "url" }, { TypeName: "uuid" }] },
        { ElementName: "reason", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const claimresponse_addItem: TypeModel = {
    TypeName: "claimresponse_addItem",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "itemSequence", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "detailSequence", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "subdetailSequence", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "traceNumber", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Patient"] }] },
        { ElementName: "informationSequence", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "provider", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }], IsArray: true },
        { ElementName: "revenue", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "productOrService", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "productOrServiceEnd", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "request", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DeviceRequest", "http://hl7.org/fhir/StructureDefinition/MedicationRequest", "http://hl7.org/fhir/StructureDefinition/NutritionOrder", "http://hl7.org/fhir/StructureDefinition/ServiceRequest", "http://hl7.org/fhir/StructureDefinition/VisionPrescription"] }], IsArray: true },
        { ElementName: "modifier", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "programCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "serviced[x]", Type: [{ TypeName: "Period" }, { TypeName: "date" }] },
        { ElementName: "location[x]", Type: [{ TypeName: "Address" }, { TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "unitPrice", Type: [{ TypeName: "Money" }] },
        { ElementName: "factor", Type: [{ TypeName: "decimal" }] },
        { ElementName: "tax", Type: [{ TypeName: "Money" }] },
        { ElementName: "net", Type: [{ TypeName: "Money" }] },
        { ElementName: "bodySite", Type: [{ TypeName: "claimresponse_addItem_bodySite" }], IsArray: true },
        { ElementName: "noteNumber", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "reviewOutcome", Type: [{ TypeName: "claimresponse_item_reviewOutcome" }] },
        { ElementName: "adjudication", Type: [{ TypeName: "claimresponse_item_adjudication" }], IsArray: true },
        { ElementName: "detail", Type: [{ TypeName: "claimresponse_addItem_detail" }], IsArray: true },
    ],
};

export const claimresponse_addItem_bodySite: TypeModel = {
    TypeName: "claimresponse_addItem_bodySite",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "site", Type: [{ TypeName: "CodeableReference" }], IsArray: true, Required: true },
        { ElementName: "subSite", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
    ],
};

export const claimresponse_addItem_detail: TypeModel = {
    TypeName: "claimresponse_addItem_detail",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "traceNumber", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "revenue", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "productOrService", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "productOrServiceEnd", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "modifier", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "unitPrice", Type: [{ TypeName: "Money" }] },
        { ElementName: "factor", Type: [{ TypeName: "decimal" }] },
        { ElementName: "tax", Type: [{ TypeName: "Money" }] },
        { ElementName: "net", Type: [{ TypeName: "Money" }] },
        { ElementName: "noteNumber", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "reviewOutcome", Type: [{ TypeName: "claimresponse_item_reviewOutcome" }] },
        { ElementName: "adjudication", Type: [{ TypeName: "claimresponse_item_adjudication" }], IsArray: true },
        { ElementName: "subDetail", Type: [{ TypeName: "claimresponse_addItem_detail_subDetail" }], IsArray: true },
    ],
};

export const claimresponse_addItem_detail_subDetail: TypeModel = {
    TypeName: "claimresponse_addItem_detail_subDetail",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "traceNumber", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "revenue", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "productOrService", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "productOrServiceEnd", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "modifier", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "unitPrice", Type: [{ TypeName: "Money" }] },
        { ElementName: "factor", Type: [{ TypeName: "decimal" }] },
        { ElementName: "tax", Type: [{ TypeName: "Money" }] },
        { ElementName: "net", Type: [{ TypeName: "Money" }] },
        { ElementName: "noteNumber", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "reviewOutcome", Type: [{ TypeName: "claimresponse_item_reviewOutcome" }] },
        { ElementName: "adjudication", Type: [{ TypeName: "claimresponse_item_adjudication" }], IsArray: true },
    ],
};

export const claimresponse_error: TypeModel = {
    TypeName: "claimresponse_error",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "itemSequence", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "detailSequence", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "subDetailSequence", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "expression", Type: [{ TypeName: "string" }], IsArray: true },
    ],
};

export const claimresponse_event: TypeModel = {
    TypeName: "claimresponse_event",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "when[x]", Type: [{ TypeName: "Period" }, { TypeName: "dateTime" }], Required: true },
    ],
};

export const claimresponse_insurance: TypeModel = {
    TypeName: "claimresponse_insurance",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "sequence", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "focal", Type: [{ TypeName: "boolean" }], Required: true },
        { ElementName: "coverage", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Coverage"] }], Required: true },
        { ElementName: "businessArrangement", Type: [{ TypeName: "string" }] },
        { ElementName: "claimResponse", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ClaimResponse"] }] },
    ],
};

export const claimresponse_item: TypeModel = {
    TypeName: "claimresponse_item",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "itemSequence", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "traceNumber", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "informationSequence", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "noteNumber", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "reviewOutcome", Type: [{ TypeName: "claimresponse_item_reviewOutcome" }] },
        { ElementName: "adjudication", Type: [{ TypeName: "claimresponse_item_adjudication" }], IsArray: true },
        { ElementName: "detail", Type: [{ TypeName: "claimresponse_item_detail" }], IsArray: true },
    ],
};

export const claimresponse_item_adjudication: TypeModel = {
    TypeName: "claimresponse_item_adjudication",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "reason", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "amount", Type: [{ TypeName: "Money" }] },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "decisionDate", Type: [{ TypeName: "dateTime" }] },
    ],
};

export const claimresponse_item_detail: TypeModel = {
    TypeName: "claimresponse_item_detail",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "detailSequence", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "traceNumber", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "noteNumber", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "reviewOutcome", Type: [{ TypeName: "claimresponse_item_reviewOutcome" }] },
        { ElementName: "adjudication", Type: [{ TypeName: "claimresponse_item_adjudication" }], IsArray: true },
        { ElementName: "subDetail", Type: [{ TypeName: "claimresponse_item_detail_subDetail" }], IsArray: true },
    ],
};

export const claimresponse_item_detail_subDetail: TypeModel = {
    TypeName: "claimresponse_item_detail_subDetail",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "subDetailSequence", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "traceNumber", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "noteNumber", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "reviewOutcome", Type: [{ TypeName: "claimresponse_item_reviewOutcome" }] },
        { ElementName: "adjudication", Type: [{ TypeName: "claimresponse_item_adjudication" }], IsArray: true },
    ],
};

export const claimresponse_item_reviewOutcome: TypeModel = {
    TypeName: "claimresponse_item_reviewOutcome",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "decision", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "reason", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "preAuthRef", Type: [{ TypeName: "string" }] },
        { ElementName: "preAuthPeriod", Type: [{ TypeName: "Period" }] },
    ],
};

export const claimresponse_payment: TypeModel = {
    TypeName: "claimresponse_payment",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "class", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "number", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "text", Type: [{ TypeName: "markdown" }], Required: true },
        { ElementName: "language", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const claimresponse_supportingInfo: TypeModel = {
    TypeName: "claimresponse_supportingInfo",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "sequence", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "timing[x]", Type: [{ TypeName: "Period" }, { TypeName: "Timing" }, { TypeName: "dateTime" }] },
        { ElementName: "value[x]", Type: [{ TypeName: "Address" }, { TypeName: "Age" }, { TypeName: "Annotation" }, { TypeName: "Attachment" }, { TypeName: "Availability" }, { TypeName: "CodeableConcept" }, { TypeName: "CodeableReference" }, { TypeName: "Coding" }, { TypeName: "ContactDetail" }, { TypeName: "ContactPoint" }, { TypeName: "Count" }, { TypeName: "DataRequirement" }, { TypeName: "Distance" }, { TypeName: "Dosage" }, { TypeName: "Duration" }, { TypeName: "Expression" }, { TypeName: "ExtendedContactDetail" }, { TypeName: "HumanName" }, { TypeName: "Identifier" }, { TypeName: "Meta" }, { TypeName: "Money" }, { TypeName: "ParameterDefinition" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "RatioRange" }, { TypeName: "Reference" }, { TypeName: "RelatedArtifact" }, { TypeName: "SampledData" }, { TypeName: "Signature" }, { TypeName: "Timing" }, { TypeName: "TriggerDefinition" }, { TypeName: "UsageContext" }, { TypeName: "VirtualServiceDetail" }, { TypeName: "base64Binary" }, { TypeName: "boolean" }, { TypeName: "canonical" }, { TypeName: "code" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "id" }, { TypeName: "instant" }, { TypeName: "integer" }, { TypeName: "integer64" }, { TypeName: "markdown" }, { TypeName: "oid" }, { TypeName: "positiveInt" }, { TypeName: "string" }, { TypeName: "time" }, { TypeName: "unsignedInt" }, { TypeName: "uri" }, { TypeName: "url" }, { TypeName: "uuid" }] },
        { ElementName: "reason", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const claimresponse_total: TypeModel = {
    TypeName: "claimresponse_total",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "amount", Type: [{ TypeName: "Money" }], Required: true },
    ],
};

export const clinicalusedefinition_contraindication: TypeModel = {
    TypeName: "clinicalusedefinition_contraindication",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "diseaseSymptomProcedure", Type: [{ TypeName: "CodeableReference" }] },
        { ElementName: "diseaseStatus", Type: [{ TypeName: "CodeableReference" }] },
        { ElementName: "comorbidity", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "indication", Type: [{ TypeName: "clinicalusedefinition_indication" }], IsArray: true },
        { ElementName: "applicability", Type: [{ TypeName: "Expression" }] },
        { ElementName: "management", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "otherTherapy", Type: [{ TypeName: "clinicalusedefinition_indication_otherTherapy" }], IsArray: true },
    ],
};

export const clinicalusedefinition_indication: TypeModel = {
    TypeName: "clinicalusedefinition_indication",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "diseaseSymptomProcedure", Type: [{ TypeName: "CodeableReference" }] },
        { ElementName: "diseaseStatus", Type: [{ TypeName: "CodeableReference" }] },
        { ElementName: "comorbidity", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "intendedEffect", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "duration[x]", Type: [{ TypeName: "Range" }, { TypeName: "string" }] },
        { ElementName: "undesirableEffect", Type: [{ TypeName: "clinicalusedefinition_undesirableEffect" }], IsArray: true },
        { ElementName: "applicability", Type: [{ TypeName: "Expression" }] },
        { ElementName: "otherTherapy", Type: [{ TypeName: "clinicalusedefinition_indication_otherTherapy" }], IsArray: true },
    ],
};

export const clinicalusedefinition_indication_otherTherapy: TypeModel = {
    TypeName: "clinicalusedefinition_indication_otherTherapy",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "relationshipType", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "treatment", Type: [{ TypeName: "CodeableReference" }], Required: true },
    ],
};

export const clinicalusedefinition_interaction: TypeModel = {
    TypeName: "clinicalusedefinition_interaction",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "interactant", Type: [{ TypeName: "clinicalusedefinition_interaction_interactant" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "effect", Type: [{ TypeName: "CodeableReference" }] },
        { ElementName: "incidence", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "management", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "severity", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const clinicalusedefinition_interaction_interactant: TypeModel = {
    TypeName: "clinicalusedefinition_interaction_interactant",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "item[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/BiologicallyDerivedProduct", "http://hl7.org/fhir/StructureDefinition/Medication", "http://hl7.org/fhir/StructureDefinition/MedicinalProductDefinition", "http://hl7.org/fhir/StructureDefinition/NutritionProduct", "http://hl7.org/fhir/StructureDefinition/ObservationDefinition", "http://hl7.org/fhir/StructureDefinition/SubstanceDefinition"] }], Required: true },
        { ElementName: "route", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const clinicalusedefinition_undesirableEffect: TypeModel = {
    TypeName: "clinicalusedefinition_undesirableEffect",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "symptomConditionEffect", Type: [{ TypeName: "CodeableReference" }] },
        { ElementName: "classification", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "frequencyOfOccurrence", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "management", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
    ],
};

export const clinicalusedefinition_warning: TypeModel = {
    TypeName: "clinicalusedefinition_warning",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const codesystem_concept: TypeModel = {
    TypeName: "codesystem_concept",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "language", Type: [{ TypeName: "code" }] },
        { ElementName: "use", Type: [{ TypeName: "Coding" }] },
        { ElementName: "additionalUse", Type: [{ TypeName: "Coding" }], IsArray: true },
        { ElementName: "value", Type: [{ TypeName: "string" }], Required: true },
    ],
};

export const codesystem_concept_property: TypeModel = {
    TypeName: "codesystem_concept_property",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "Coding" }, { TypeName: "boolean" }, { TypeName: "code" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "integer" }, { TypeName: "string" }], Required: true },
    ],
};

export const codesystem_filter: TypeModel = {
    TypeName: "codesystem_filter",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "uri", Type: [{ TypeName: "uri" }] },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
    ],
};

export const communication_payload: TypeModel = {
    TypeName: "communication_payload",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "content[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], Required: true },
    ],
};

export const communicationrequest_payload: TypeModel = {
    TypeName: "communicationrequest_payload",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "content[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], Required: true },
    ],
};

export const compartmentdefinition_resource: TypeModel = {
    TypeName: "compartmentdefinition_resource",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "param", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "startParam", Type: [{ TypeName: "uri" }] },
        { ElementName: "endParam", Type: [{ TypeName: "uri" }] },
    ],
};

export const composition_attester: TypeModel = {
    TypeName: "composition_attester",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "mode", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "time", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "party", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
    ],
};

export const composition_event: TypeModel = {
    TypeName: "composition_event",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "detail", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
    ],
};

export const composition_participant: TypeModel = {
    TypeName: "composition_participant",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], IsArray: true, Required: true },
        { ElementName: "function", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "time", Type: [{ TypeName: "Period" }] },
        { ElementName: "party", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
    ],
};

export const composition_relatesTo: TypeModel = {
    TypeName: "composition_relatesTo",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "target[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }, { TypeName: "canonical" }, { TypeName: "markdown" }, { TypeName: "uri" }], Required: true },
    ],
};

export const composition_section: TypeModel = {
    TypeName: "composition_section",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "author", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], IsArray: true },
        { ElementName: "focus", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
        { ElementName: "text", Type: [{ TypeName: "Narrative" }] },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "orderedBy", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "entry", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "emptyReason", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "section", Type: [{ TypeName: "composition_section" }], IsArray: true },
    ],
};

export const conceptmap_additionalAttribute: TypeModel = {
    TypeName: "conceptmap_additionalAttribute",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "uri", Type: [{ TypeName: "uri" }] },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
    ],
};

export const conceptmap_group: TypeModel = {
    TypeName: "conceptmap_group",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "source", Type: [{ TypeName: "canonical" }] },
        { ElementName: "target", Type: [{ TypeName: "canonical" }] },
        { ElementName: "element", Type: [{ TypeName: "conceptmap_group_element" }], IsArray: true, Required: true },
        { ElementName: "unmapped", Type: [{ TypeName: "conceptmap_group_unmapped" }] },
    ],
};

export const conceptmap_group_element: TypeModel = {
    TypeName: "conceptmap_group_element",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "code" }] },
        { ElementName: "display", Type: [{ TypeName: "string" }] },
        { ElementName: "valueSet", Type: [{ TypeName: "canonical" }] },
        { ElementName: "noMap", Type: [{ TypeName: "boolean" }] },
        { ElementName: "comment", Type: [{ TypeName: "string" }] },
        { ElementName: "target", Type: [{ TypeName: "conceptmap_group_element_target" }], IsArray: true },
    ],
};

export const conceptmap_group_element_target: TypeModel = {
    TypeName: "conceptmap_group_element_target",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "code" }] },
        { ElementName: "display", Type: [{ TypeName: "string" }] },
        { ElementName: "valueSet", Type: [{ TypeName: "canonical" }] },
        { ElementName: "relationship", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "comment", Type: [{ TypeName: "string" }] },
        { ElementName: "property", Type: [{ TypeName: "conceptmap_group_element_target_property" }], IsArray: true },
        { ElementName: "dependsOn", Type: [{ TypeName: "conceptmap_group_element_target_dependsOn" }], IsArray: true },
        { ElementName: "product", Type: [{ TypeName: "conceptmap_group_element_target_dependsOn" }], IsArray: true },
    ],
};

export const conceptmap_group_element_target_dependsOn: TypeModel = {
    TypeName: "conceptmap_group_element_target_dependsOn",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "attribute", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "Coding" }, { TypeName: "Quantity" }, { TypeName: "boolean" }, { TypeName: "code" }, { TypeName: "string" }] },
        { ElementName: "valueSet", Type: [{ TypeName: "canonical" }] },
    ],
};

export const conceptmap_group_element_target_property: TypeModel = {
    TypeName: "conceptmap_group_element_target_property",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "Coding" }, { TypeName: "boolean" }, { TypeName: "code" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "integer" }, { TypeName: "string" }], Required: true },
    ],
};

export const conceptmap_group_unmapped: TypeModel = {
    TypeName: "conceptmap_group_unmapped",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "mode", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "code", Type: [{ TypeName: "code" }] },
        { ElementName: "display", Type: [{ TypeName: "string" }] },
        { ElementName: "comment", Type: [{ TypeName: "string" }] },
        { ElementName: "valueSet", Type: [{ TypeName: "canonical" }] },
        { ElementName: "relationship", Type: [{ TypeName: "code" }] },
        { ElementName: "otherMap", Type: [{ TypeName: "canonical" }] },
    ],
};

export const conceptmap_property: TypeModel = {
    TypeName: "conceptmap_property",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "uri", Type: [{ TypeName: "uri" }] },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "system", Type: [{ TypeName: "canonical" }] },
    ],
};

export const condition_stage: TypeModel = {
    TypeName: "condition_stage",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "summary", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "assessment", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DiagnosticReport", "http://hl7.org/fhir/StructureDefinition/Observation"] }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const consent_policyBasis: TypeModel = {
    TypeName: "consent_policyBasis",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "reference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
        { ElementName: "uri", Type: [{ TypeName: "uri" }] },
    ],
};

export const consent_provision: TypeModel = {
    TypeName: "consent_provision",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "actor", Type: [{ TypeName: "consent_provision_actor" }], IsArray: true },
        { ElementName: "action", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "securityLabel", Type: [{ TypeName: "Coding" }], IsArray: true },
        { ElementName: "purpose", Type: [{ TypeName: "Coding" }], IsArray: true },
        { ElementName: "documentType", Type: [{ TypeName: "Coding" }], IsArray: true },
        { ElementName: "resourceType", Type: [{ TypeName: "Coding" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "dataPeriod", Type: [{ TypeName: "Period" }] },
        { ElementName: "data", Type: [{ TypeName: "consent_provision_data" }], IsArray: true },
        { ElementName: "expression", Type: [{ TypeName: "Expression" }] },
        { ElementName: "provision", Type: [{ TypeName: "consent_provision" }], IsArray: true },
    ],
};

export const consent_provision_actor: TypeModel = {
    TypeName: "consent_provision_actor",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "reference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
    ],
};

export const consent_provision_data: TypeModel = {
    TypeName: "consent_provision_data",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "meaning", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "reference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], Required: true },
    ],
};

export const consent_verification: TypeModel = {
    TypeName: "consent_verification",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "verified", Type: [{ TypeName: "boolean" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "verifiedBy", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "verifiedWith", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }], IsArray: true },
    ],
};

export const contract_contentDefinition: TypeModel = {
    TypeName: "contract_contentDefinition",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "subType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "publisher", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "publicationDate", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "publicationStatus", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "copyright", Type: [{ TypeName: "markdown" }] },
    ],
};

export const contract_friendly: TypeModel = {
    TypeName: "contract_friendly",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "content[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Composition", "http://hl7.org/fhir/StructureDefinition/DocumentReference", "http://hl7.org/fhir/StructureDefinition/QuestionnaireResponse"] }], Required: true },
    ],
};

export const contract_legal: TypeModel = {
    TypeName: "contract_legal",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "content[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Composition", "http://hl7.org/fhir/StructureDefinition/DocumentReference", "http://hl7.org/fhir/StructureDefinition/QuestionnaireResponse"] }], Required: true },
    ],
};

export const contract_rule: TypeModel = {
    TypeName: "contract_rule",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "content[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DocumentReference"] }], Required: true },
    ],
};

export const contract_signer: TypeModel = {
    TypeName: "contract_signer",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "Coding" }], Required: true },
        { ElementName: "party", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
        { ElementName: "signature", Type: [{ TypeName: "Signature" }], IsArray: true, Required: true },
    ],
};

export const contract_term: TypeModel = {
    TypeName: "contract_term",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "issued", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "applies", Type: [{ TypeName: "Period" }] },
        { ElementName: "topic[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "subType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "text", Type: [{ TypeName: "markdown" }] },
        { ElementName: "securityLabel", Type: [{ TypeName: "contract_term_securityLabel" }], IsArray: true },
        { ElementName: "offer", Type: [{ TypeName: "contract_term_offer" }], Required: true },
        { ElementName: "asset", Type: [{ TypeName: "contract_term_asset" }], IsArray: true },
        { ElementName: "action", Type: [{ TypeName: "contract_term_action" }], IsArray: true },
        { ElementName: "group", Type: [{ TypeName: "contract_term" }], IsArray: true },
    ],
};

export const contract_term_action: TypeModel = {
    TypeName: "contract_term_action",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "reason", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "reasonLinkId", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "securityLabelNumber", Type: [{ TypeName: "unsignedInt" }], IsArray: true },
    ],
};

export const contract_term_action_subject: TypeModel = {
    TypeName: "contract_term_action_subject",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "reference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], IsArray: true, Required: true },
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const contract_term_asset: TypeModel = {
    TypeName: "contract_term_asset",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "reference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "text", Type: [{ TypeName: "string" }] },
    ],
};

export const contract_term_asset_valuedItem: TypeModel = {
    TypeName: "contract_term_asset_valuedItem",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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

export const contract_term_offer: TypeModel = {
    TypeName: "contract_term_offer",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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

export const contract_term_offer_answer: TypeModel = {
    TypeName: "contract_term_offer_answer",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "value[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "Coding" }, { TypeName: "Quantity" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }, { TypeName: "boolean" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "integer" }, { TypeName: "string" }, { TypeName: "time" }, { TypeName: "uri" }], Required: true },
    ],
};

export const contract_term_offer_party: TypeModel = {
    TypeName: "contract_term_offer_party",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "reference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], IsArray: true, Required: true },
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }], Required: true },
    ],
};

export const contract_term_securityLabel: TypeModel = {
    TypeName: "contract_term_securityLabel",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "number", Type: [{ TypeName: "unsignedInt" }], IsArray: true },
        { ElementName: "classification", Type: [{ TypeName: "Coding" }], Required: true },
        { ElementName: "category", Type: [{ TypeName: "Coding" }], IsArray: true },
        { ElementName: "control", Type: [{ TypeName: "Coding" }], IsArray: true },
    ],
};

export const coverage_class: TypeModel = {
    TypeName: "coverage_class",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "value", Type: [{ TypeName: "Identifier" }], Required: true },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
    ],
};

export const coverage_costToBeneficiary: TypeModel = {
    TypeName: "coverage_costToBeneficiary",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "network", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "unit", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "term", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "value[x]", Type: [{ TypeName: "Money" }, { TypeName: "Quantity" }] },
        { ElementName: "exception", Type: [{ TypeName: "coverage_costToBeneficiary_exception" }], IsArray: true },
    ],
};

export const coverage_costToBeneficiary_exception: TypeModel = {
    TypeName: "coverage_costToBeneficiary_exception",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
    ],
};

export const coverage_paymentBy: TypeModel = {
    TypeName: "coverage_paymentBy",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "party", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
        { ElementName: "responsibility", Type: [{ TypeName: "string" }] },
    ],
};

export const coverageeligibilityrequest_event: TypeModel = {
    TypeName: "coverageeligibilityrequest_event",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "when[x]", Type: [{ TypeName: "Period" }, { TypeName: "dateTime" }], Required: true },
    ],
};

export const coverageeligibilityrequest_insurance: TypeModel = {
    TypeName: "coverageeligibilityrequest_insurance",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "focal", Type: [{ TypeName: "boolean" }] },
        { ElementName: "coverage", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Coverage"] }], Required: true },
        { ElementName: "businessArrangement", Type: [{ TypeName: "string" }] },
    ],
};

export const coverageeligibilityrequest_item: TypeModel = {
    TypeName: "coverageeligibilityrequest_item",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "diagnosis[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Condition"] }] },
    ],
};

export const coverageeligibilityrequest_supportingInfo: TypeModel = {
    TypeName: "coverageeligibilityrequest_supportingInfo",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "sequence", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "information", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], Required: true },
        { ElementName: "appliesToAll", Type: [{ TypeName: "boolean" }] },
    ],
};

export const coverageeligibilityresponse_error: TypeModel = {
    TypeName: "coverageeligibilityresponse_error",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "expression", Type: [{ TypeName: "string" }], IsArray: true },
    ],
};

export const coverageeligibilityresponse_event: TypeModel = {
    TypeName: "coverageeligibilityresponse_event",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "when[x]", Type: [{ TypeName: "Period" }, { TypeName: "dateTime" }], Required: true },
    ],
};

export const coverageeligibilityresponse_insurance: TypeModel = {
    TypeName: "coverageeligibilityresponse_insurance",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "productOrService", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "modifier", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "provider", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "excluded", Type: [{ TypeName: "boolean" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "allowed[x]", Type: [{ TypeName: "Money" }, { TypeName: "string" }, { TypeName: "unsignedInt" }] },
        { ElementName: "used[x]", Type: [{ TypeName: "Money" }, { TypeName: "string" }, { TypeName: "unsignedInt" }] },
    ],
};

export const datarequirement_codeFilter: TypeModel = {
    TypeName: "datarequirement_codeFilter",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "path", Type: [{ TypeName: "string" }] },
        { ElementName: "searchParam", Type: [{ TypeName: "string" }] },
        { ElementName: "valueSet", Type: [{ TypeName: "canonical" }] },
        { ElementName: "code", Type: [{ TypeName: "Coding" }], IsArray: true },
    ],
};

export const datarequirement_dateFilter: TypeModel = {
    TypeName: "datarequirement_dateFilter",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "path", Type: [{ TypeName: "string" }] },
        { ElementName: "searchParam", Type: [{ TypeName: "string" }] },
        { ElementName: "value[x]", Type: [{ TypeName: "Duration" }, { TypeName: "Period" }, { TypeName: "dateTime" }] },
    ],
};

export const datarequirement_sort: TypeModel = {
    TypeName: "datarequirement_sort",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "path", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "direction", Type: [{ TypeName: "code" }], Required: true },
    ],
};

export const datarequirement_valueFilter: TypeModel = {
    TypeName: "datarequirement_valueFilter",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "path", Type: [{ TypeName: "string" }] },
        { ElementName: "searchParam", Type: [{ TypeName: "string" }] },
        { ElementName: "comparator", Type: [{ TypeName: "code" }] },
        { ElementName: "value[x]", Type: [{ TypeName: "Duration" }, { TypeName: "Period" }, { TypeName: "dateTime" }] },
    ],
};

export const detectedissue_evidence: TypeModel = {
    TypeName: "detectedissue_evidence",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "detail", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
    ],
};

export const detectedissue_mitigation: TypeModel = {
    TypeName: "detectedissue_mitigation",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "action", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "author", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
    ],
};

export const device_additive: TypeModel = {
    TypeName: "device_additive",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableReference" }], Required: true },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
    ],
};

export const device_conformsTo: TypeModel = {
    TypeName: "device_conformsTo",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "specification", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
    ],
};

export const device_deviceVersion: TypeModel = {
    TypeName: "device_deviceVersion",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "component", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "installDate", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "value", Type: [{ TypeName: "string" }], Required: true },
    ],
};

export const device_name: TypeModel = {
    TypeName: "device_name",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "value", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "display", Type: [{ TypeName: "boolean" }] },
    ],
};

export const device_property: TypeModel = {
    TypeName: "device_property",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "CodeableConcept" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "boolean" }, { TypeName: "integer" }, { TypeName: "string" }], Required: true },
    ],
};

export const device_udiCarrier: TypeModel = {
    TypeName: "device_udiCarrier",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "deviceIdentifier", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "deviceIdentifierSystem", Type: [{ TypeName: "uri" }] },
        { ElementName: "issuer", Type: [{ TypeName: "uri" }], Required: true },
        { ElementName: "jurisdiction", Type: [{ TypeName: "uri" }] },
        { ElementName: "carrierAIDC", Type: [{ TypeName: "base64Binary" }] },
        { ElementName: "carrierHRF", Type: [{ TypeName: "string" }] },
        { ElementName: "entryType", Type: [{ TypeName: "code" }] },
    ],
};

export const devicealert_derivedFrom: TypeModel = {
    TypeName: "devicealert_derivedFrom",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "observation", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Observation"] }], Required: true },
        { ElementName: "component", Type: [{ TypeName: "Coding" }] },
        { ElementName: "limit", Type: [{ TypeName: "Range" }] },
    ],
};

export const devicealert_signal: TypeModel = {
    TypeName: "devicealert_signal",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "activationState", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "presence", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "annunciator", Type: [{ TypeName: "CodeableReference" }] },
        { ElementName: "manifestation", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "indication", Type: [{ TypeName: "Period" }] },
    ],
};

export const devicedefinition_chargeItem: TypeModel = {
    TypeName: "devicedefinition_chargeItem",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "chargeItemCode", Type: [{ TypeName: "CodeableReference" }], Required: true },
        { ElementName: "count", Type: [{ TypeName: "Quantity" }], Required: true },
        { ElementName: "effectivePeriod", Type: [{ TypeName: "Period" }] },
        { ElementName: "useContext", Type: [{ TypeName: "UsageContext" }], IsArray: true },
    ],
};

export const devicedefinition_classification: TypeModel = {
    TypeName: "devicedefinition_classification",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "justification", Type: [{ TypeName: "RelatedArtifact" }], IsArray: true },
    ],
};

export const devicedefinition_conformsTo: TypeModel = {
    TypeName: "devicedefinition_conformsTo",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "specification", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "version", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "source", Type: [{ TypeName: "RelatedArtifact" }], IsArray: true },
    ],
};

export const devicedefinition_correctiveAction: TypeModel = {
    TypeName: "devicedefinition_correctiveAction",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "recall", Type: [{ TypeName: "boolean" }], Required: true },
        { ElementName: "scope", Type: [{ TypeName: "code" }] },
        { ElementName: "period", Type: [{ TypeName: "Period" }], Required: true },
    ],
};

export const devicedefinition_deviceName: TypeModel = {
    TypeName: "devicedefinition_deviceName",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "name", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
    ],
};

export const devicedefinition_deviceVersion: TypeModel = {
    TypeName: "devicedefinition_deviceVersion",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "component", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "value", Type: [{ TypeName: "string" }], Required: true },
    ],
};

export const devicedefinition_guideline: TypeModel = {
    TypeName: "devicedefinition_guideline",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "useContext", Type: [{ TypeName: "UsageContext" }], IsArray: true },
        { ElementName: "usageInstruction", Type: [{ TypeName: "markdown" }] },
        { ElementName: "relatedArtifact", Type: [{ TypeName: "RelatedArtifact" }], IsArray: true },
        { ElementName: "indication", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "contraindication", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "warning", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "intendedUse", Type: [{ TypeName: "string" }] },
    ],
};

export const devicedefinition_hasPart: TypeModel = {
    TypeName: "devicedefinition_hasPart",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "definition[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "canonical" }], Required: true },
        { ElementName: "count", Type: [{ TypeName: "integer" }] },
    ],
};

export const devicedefinition_link: TypeModel = {
    TypeName: "devicedefinition_link",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "relation", Type: [{ TypeName: "Coding" }], Required: true },
        { ElementName: "relatedDevice[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "canonical" }], Required: true },
    ],
};

export const devicedefinition_material: TypeModel = {
    TypeName: "devicedefinition_material",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "substance", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "alternate", Type: [{ TypeName: "boolean" }] },
        { ElementName: "allergenicIndicator", Type: [{ TypeName: "boolean" }] },
    ],
};

export const devicedefinition_packaging: TypeModel = {
    TypeName: "devicedefinition_packaging",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "count", Type: [{ TypeName: "integer" }] },
        { ElementName: "distributor", Type: [{ TypeName: "devicedefinition_packaging_distributor" }], IsArray: true },
        { ElementName: "udiDeviceIdentifier", Type: [{ TypeName: "devicedefinition_udiDeviceIdentifier" }], IsArray: true },
        { ElementName: "packaging", Type: [{ TypeName: "devicedefinition_packaging" }], IsArray: true },
    ],
};

export const devicedefinition_packaging_distributor: TypeModel = {
    TypeName: "devicedefinition_packaging_distributor",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "organizationReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }], IsArray: true },
    ],
};

export const devicedefinition_property: TypeModel = {
    TypeName: "devicedefinition_property",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "CodeableConcept" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "boolean" }, { TypeName: "integer" }, { TypeName: "string" }], Required: true },
    ],
};

export const devicedefinition_regulatoryIdentifier: TypeModel = {
    TypeName: "devicedefinition_regulatoryIdentifier",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "identifier", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "issuer", Type: [{ TypeName: "uri" }], Required: true },
        { ElementName: "jurisdiction", Type: [{ TypeName: "uri" }], Required: true },
        { ElementName: "identifierSystem", Type: [{ TypeName: "uri" }] },
    ],
};

export const devicedefinition_udiDeviceIdentifier: TypeModel = {
    TypeName: "devicedefinition_udiDeviceIdentifier",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "deviceIdentifier", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "issuer", Type: [{ TypeName: "uri" }], Required: true },
        { ElementName: "jurisdiction", Type: [{ TypeName: "uri" }], Required: true },
        { ElementName: "marketDistribution", Type: [{ TypeName: "devicedefinition_udiDeviceIdentifier_marketDistribution" }], IsArray: true },
        { ElementName: "deviceIdentifierSystem", Type: [{ TypeName: "uri" }] },
    ],
};

export const devicedefinition_udiDeviceIdentifier_marketDistribution: TypeModel = {
    TypeName: "devicedefinition_udiDeviceIdentifier_marketDistribution",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "marketPeriod", Type: [{ TypeName: "Period" }], Required: true },
        { ElementName: "subJurisdiction", Type: [{ TypeName: "uri" }], Required: true },
    ],
};

export const devicemetric_calibration: TypeModel = {
    TypeName: "devicemetric_calibration",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "state", Type: [{ TypeName: "code" }] },
        { ElementName: "time", Type: [{ TypeName: "instant" }] },
    ],
};

export const devicerequest_parameter: TypeModel = {
    TypeName: "devicerequest_parameter",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "value[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "boolean" }] },
    ],
};

export const diagnosticreport_media: TypeModel = {
    TypeName: "diagnosticreport_media",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "comment", Type: [{ TypeName: "string" }] },
        { ElementName: "link", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DocumentReference"] }], Required: true },
    ],
};

export const diagnosticreport_supportingInfo: TypeModel = {
    TypeName: "diagnosticreport_supportingInfo",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "reference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/AllergyIntolerance", "http://hl7.org/fhir/StructureDefinition/Condition", "http://hl7.org/fhir/StructureDefinition/DiagnosticReport", "http://hl7.org/fhir/StructureDefinition/DocumentReference", "http://hl7.org/fhir/StructureDefinition/FamilyMemberHistory", "http://hl7.org/fhir/StructureDefinition/ImagingStudy", "http://hl7.org/fhir/StructureDefinition/Observation", "http://hl7.org/fhir/StructureDefinition/Procedure"] }], Required: true },
    ],
};

export const documentreference_attester: TypeModel = {
    TypeName: "documentreference_attester",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "mode", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "time", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "party", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
    ],
};

export const documentreference_content: TypeModel = {
    TypeName: "documentreference_content",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "attachment", Type: [{ TypeName: "Attachment" }], Required: true },
        { ElementName: "profile", Type: [{ TypeName: "documentreference_content_profile" }], IsArray: true },
    ],
};

export const documentreference_content_profile: TypeModel = {
    TypeName: "documentreference_content_profile",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "value[x]", Type: [{ TypeName: "Coding" }, { TypeName: "canonical" }, { TypeName: "uri" }], Required: true },
    ],
};

export const documentreference_relatesTo: TypeModel = {
    TypeName: "documentreference_relatesTo",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "target", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DocumentReference"] }], Required: true },
    ],
};

export const dosage_doseAndRate: TypeModel = {
    TypeName: "dosage_doseAndRate",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "dose[x]", Type: [{ TypeName: "Expression" }, { TypeName: "Quantity" }, { TypeName: "Range" }] },
        { ElementName: "rate[x]", Type: [{ TypeName: "Expression" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }] },
    ],
};

export const dosagedetails_step: TypeModel = {
    TypeName: "dosagedetails_step",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "start", Type: [{ TypeName: "RelativeTime" }] },
        { ElementName: "end", Type: [{ TypeName: "RelativeTime" }] },
        { ElementName: "count", Type: [{ TypeName: "integer" }] },
        { ElementName: "component", Type: [{ TypeName: "Dosage" }], IsArray: true, Required: true },
        { ElementName: "safety", Type: [{ TypeName: "DosageSafety" }] },
    ],
};

export const dosagesafety_doseLimit: TypeModel = {
    TypeName: "dosagesafety_doseLimit",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "value[x]", Type: [{ TypeName: "Expression" }, { TypeName: "Quantity" }, { TypeName: "integer" }], Required: true },
        { ElementName: "scope", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "period", Type: [{ TypeName: "Duration" }] },
        { ElementName: "text", Type: [{ TypeName: "string" }] },
    ],
};

export const elementdefinition_base: TypeModel = {
    TypeName: "elementdefinition_base",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "path", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "min", Type: [{ TypeName: "unsignedInt" }], Required: true },
        { ElementName: "max", Type: [{ TypeName: "string" }], Required: true },
    ],
};

export const elementdefinition_binding: TypeModel = {
    TypeName: "elementdefinition_binding",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "strength", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "valueSet", Type: [{ TypeName: "canonical" }] },
        { ElementName: "additional", Type: [{ TypeName: "elementdefinition_binding_additional" }], IsArray: true },
    ],
};

export const elementdefinition_binding_additional: TypeModel = {
    TypeName: "elementdefinition_binding_additional",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "key", Type: [{ TypeName: "id" }] },
        { ElementName: "purpose", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "valueSet", Type: [{ TypeName: "canonical" }], Required: true },
        { ElementName: "documentation", Type: [{ TypeName: "markdown" }] },
        { ElementName: "shortDoco", Type: [{ TypeName: "string" }] },
        { ElementName: "usage", Type: [{ TypeName: "UsageContext" }], IsArray: true },
        { ElementName: "any", Type: [{ TypeName: "boolean" }] },
    ],
};

export const elementdefinition_constraint: TypeModel = {
    TypeName: "elementdefinition_constraint",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "key", Type: [{ TypeName: "id" }], Required: true },
        { ElementName: "requirements", Type: [{ TypeName: "markdown" }] },
        { ElementName: "severity", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "suppress", Type: [{ TypeName: "boolean" }] },
        { ElementName: "human", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "expression", Type: [{ TypeName: "string" }] },
        { ElementName: "source", Type: [{ TypeName: "canonical" }] },
    ],
};

export const elementdefinition_example: TypeModel = {
    TypeName: "elementdefinition_example",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "label", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "Address" }, { TypeName: "Age" }, { TypeName: "Annotation" }, { TypeName: "Attachment" }, { TypeName: "Availability" }, { TypeName: "CodeableConcept" }, { TypeName: "CodeableReference" }, { TypeName: "Coding" }, { TypeName: "ContactDetail" }, { TypeName: "ContactPoint" }, { TypeName: "Count" }, { TypeName: "DataRequirement" }, { TypeName: "Distance" }, { TypeName: "Dosage" }, { TypeName: "Duration" }, { TypeName: "Expression" }, { TypeName: "ExtendedContactDetail" }, { TypeName: "HumanName" }, { TypeName: "Identifier" }, { TypeName: "Meta" }, { TypeName: "Money" }, { TypeName: "ParameterDefinition" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "RatioRange" }, { TypeName: "Reference" }, { TypeName: "RelatedArtifact" }, { TypeName: "SampledData" }, { TypeName: "Signature" }, { TypeName: "Timing" }, { TypeName: "TriggerDefinition" }, { TypeName: "UsageContext" }, { TypeName: "VirtualServiceDetail" }, { TypeName: "base64Binary" }, { TypeName: "boolean" }, { TypeName: "canonical" }, { TypeName: "code" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "id" }, { TypeName: "instant" }, { TypeName: "integer" }, { TypeName: "integer64" }, { TypeName: "markdown" }, { TypeName: "oid" }, { TypeName: "positiveInt" }, { TypeName: "string" }, { TypeName: "time" }, { TypeName: "unsignedInt" }, { TypeName: "uri" }, { TypeName: "url" }, { TypeName: "uuid" }], Required: true },
    ],
};

export const elementdefinition_mapping: TypeModel = {
    TypeName: "elementdefinition_mapping",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "identity", Type: [{ TypeName: "id" }], Required: true },
        { ElementName: "language", Type: [{ TypeName: "code" }] },
        { ElementName: "map", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "comment", Type: [{ TypeName: "markdown" }] },
    ],
};

export const elementdefinition_slicing: TypeModel = {
    TypeName: "elementdefinition_slicing",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "discriminator", Type: [{ TypeName: "elementdefinition_slicing_discriminator" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "ordered", Type: [{ TypeName: "boolean" }] },
        { ElementName: "rules", Type: [{ TypeName: "code" }], Required: true },
    ],
};

export const elementdefinition_slicing_discriminator: TypeModel = {
    TypeName: "elementdefinition_slicing_discriminator",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "path", Type: [{ TypeName: "string" }], Required: true },
    ],
};

export const elementdefinition_type: TypeModel = {
    TypeName: "elementdefinition_type",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "uri" }], Required: true },
        { ElementName: "profile", Type: [{ TypeName: "canonical" }], IsArray: true },
        { ElementName: "targetProfile", Type: [{ TypeName: "canonical" }], IsArray: true },
        { ElementName: "aggregation", Type: [{ TypeName: "code" }], IsArray: true },
        { ElementName: "versioning", Type: [{ TypeName: "code" }] },
    ],
};

export const encounter_admission: TypeModel = {
    TypeName: "encounter_admission",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "preAdmissionIdentifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "origin", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "admitSource", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "reAdmission", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "destination", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "dischargeDisposition", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const encounter_businessStatus: TypeModel = {
    TypeName: "encounter_businessStatus",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "Coding" }] },
        { ElementName: "effectiveDate", Type: [{ TypeName: "dateTime" }] },
    ],
};

export const encounter_diagnosis: TypeModel = {
    TypeName: "encounter_diagnosis",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "condition", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "use", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
    ],
};

export const encounter_location: TypeModel = {
    TypeName: "encounter_location",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "location", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }], Required: true },
        { ElementName: "status", Type: [{ TypeName: "code" }] },
        { ElementName: "form", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
    ],
};

export const encounter_participant: TypeModel = {
    TypeName: "encounter_participant",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "actor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
    ],
};

export const encounter_reason: TypeModel = {
    TypeName: "encounter_reason",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "use", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "value", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
    ],
};

export const endpoint_payload: TypeModel = {
    TypeName: "endpoint_payload",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "mimeType", Type: [{ TypeName: "code" }], IsArray: true },
        { ElementName: "profileCanonical", Type: [{ TypeName: "canonical" }], IsArray: true },
        { ElementName: "profileUri", Type: [{ TypeName: "uri" }], IsArray: true },
    ],
};

export const episodeofcare_diagnosis: TypeModel = {
    TypeName: "episodeofcare_diagnosis",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "condition", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "use", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
    ],
};

export const episodeofcare_reason: TypeModel = {
    TypeName: "episodeofcare_reason",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "use", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "value", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
    ],
};

export const episodeofcare_statusHistory: TypeModel = {
    TypeName: "episodeofcare_statusHistory",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "period", Type: [{ TypeName: "Period" }], Required: true },
    ],
};

export const evidence_certainty: TypeModel = {
    TypeName: "evidence_certainty",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "rating", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "rater", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "subcomponent", Type: [{ TypeName: "evidence_certainty" }], IsArray: true },
    ],
};

export const evidence_relatesTo: TypeModel = {
    TypeName: "evidence_relatesTo",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "target[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }, { TypeName: "canonical" }, { TypeName: "markdown" }, { TypeName: "uri" }], Required: true },
    ],
};

export const evidence_statistic: TypeModel = {
    TypeName: "evidence_statistic",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "statisticType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "numberOfEvents", Type: [{ TypeName: "unsignedInt" }] },
        { ElementName: "numberAffected", Type: [{ TypeName: "unsignedInt" }] },
        { ElementName: "sampleSize", Type: [{ TypeName: "evidence_statistic_sampleSize" }] },
        { ElementName: "attributeEstimate", Type: [{ TypeName: "evidence_statistic_attributeEstimate" }], IsArray: true },
        { ElementName: "modelCharacteristic", Type: [{ TypeName: "evidence_statistic_modelCharacteristic" }], IsArray: true },
    ],
};

export const evidence_statistic_attributeEstimate: TypeModel = {
    TypeName: "evidence_statistic_attributeEstimate",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "level", Type: [{ TypeName: "decimal" }] },
        { ElementName: "range", Type: [{ TypeName: "Range" }] },
        { ElementName: "attributeEstimate", Type: [{ TypeName: "evidence_statistic_attributeEstimate" }], IsArray: true },
    ],
};

export const evidence_statistic_modelCharacteristic: TypeModel = {
    TypeName: "evidence_statistic_modelCharacteristic",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Quantity" }, { TypeName: "Range" }] },
        { ElementName: "intended", Type: [{ TypeName: "boolean" }] },
        { ElementName: "applied", Type: [{ TypeName: "boolean" }] },
        { ElementName: "variable", Type: [{ TypeName: "evidence_statistic_modelCharacteristic_variable" }], IsArray: true },
        { ElementName: "attribute", Type: [{ TypeName: "evidence_statistic_attributeEstimate" }], IsArray: true },
    ],
};

export const evidence_statistic_modelCharacteristic_variable: TypeModel = {
    TypeName: "evidence_statistic_modelCharacteristic_variable",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "variableDefinition", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/EvidenceVariable", "http://hl7.org/fhir/StructureDefinition/Group"] }], Required: true },
        { ElementName: "handling", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "valueCategory", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "valueQuantity", Type: [{ TypeName: "Quantity" }], IsArray: true },
        { ElementName: "valueRange", Type: [{ TypeName: "Range" }], IsArray: true },
    ],
};

export const evidence_statistic_sampleSize: TypeModel = {
    TypeName: "evidence_statistic_sampleSize",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "numberOfStudies", Type: [{ TypeName: "unsignedInt" }] },
        { ElementName: "numberOfParticipants", Type: [{ TypeName: "unsignedInt" }] },
        { ElementName: "knownDataCount", Type: [{ TypeName: "unsignedInt" }] },
        { ElementName: "numberAnalyzed", Type: [{ TypeName: "unsignedInt" }] },
    ],
};

export const evidence_variableDefinition: TypeModel = {
    TypeName: "evidence_variableDefinition",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "variableRole", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "roleSubtype", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "comparatorCategory", Type: [{ TypeName: "string" }] },
        { ElementName: "observed", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/EvidenceVariable", "http://hl7.org/fhir/StructureDefinition/Group"] }] },
        { ElementName: "intended", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/EvidenceVariable", "http://hl7.org/fhir/StructureDefinition/Group"] }] },
        { ElementName: "directnessMatch", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const evidencevariable_category: TypeModel = {
    TypeName: "evidencevariable_category",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "value[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }] },
    ],
};

export const evidencevariable_constraint: TypeModel = {
    TypeName: "evidencevariable_constraint",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "conditional", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "minimumQuantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "maximumQuantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "earliestDateTime", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "latestDateTime", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "minimumStringLength", Type: [{ TypeName: "unsignedInt" }] },
        { ElementName: "maximumStringLength", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "expression", Type: [{ TypeName: "Expression" }] },
        { ElementName: "expectedValueSet", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ValueSet"] }] },
        { ElementName: "expectedUnitsValueSet", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ValueSet"] }] },
        { ElementName: "anyValueAllowed", Type: [{ TypeName: "boolean" }] },
    ],
};

export const evidencevariable_dataStorage: TypeModel = {
    TypeName: "evidencevariable_dataStorage",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "datatype", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "path", Type: [{ TypeName: "string" }] },
        { ElementName: "delimiter", Type: [{ TypeName: "string" }] },
        { ElementName: "component", Type: [{ TypeName: "evidencevariable_dataStorage" }], IsArray: true },
    ],
};

export const evidencevariable_definitionModifier: TypeModel = {
    TypeName: "evidencevariable_definitionModifier",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Expression" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }, { TypeName: "RelativeTime" }, { TypeName: "boolean" }, { TypeName: "uri" }], Required: true },
    ],
};

export const evidencevariable_relatesTo: TypeModel = {
    TypeName: "evidencevariable_relatesTo",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "target[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }, { TypeName: "canonical" }, { TypeName: "markdown" }, { TypeName: "uri" }], Required: true },
    ],
};

export const examplescenario_actor: TypeModel = {
    TypeName: "examplescenario_actor",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "key", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "code" }] },
        { ElementName: "title", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "definition", Type: [{ TypeName: "canonical" }] },
    ],
};

export const examplescenario_instance: TypeModel = {
    TypeName: "examplescenario_instance",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "key", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "structureType", Type: [{ TypeName: "Coding" }], Required: true },
        { ElementName: "structureVersion", Type: [{ TypeName: "string" }] },
        { ElementName: "structureProfile[x]", Type: [{ TypeName: "canonical" }, { TypeName: "uri" }] },
        { ElementName: "title", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "content", Type: [{ TypeName: "Reference" }] },
        { ElementName: "version", Type: [{ TypeName: "examplescenario_instance_version" }], IsArray: true },
        { ElementName: "containedInstance", Type: [{ TypeName: "examplescenario_instance_containedInstance" }], IsArray: true },
    ],
};

export const examplescenario_instance_containedInstance: TypeModel = {
    TypeName: "examplescenario_instance_containedInstance",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "instanceReference", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "versionReference", Type: [{ TypeName: "string" }] },
    ],
};

export const examplescenario_instance_version: TypeModel = {
    TypeName: "examplescenario_instance_version",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "key", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "title", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "content", Type: [{ TypeName: "Reference" }] },
    ],
};

export const examplescenario_process: TypeModel = {
    TypeName: "examplescenario_process",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "number", Type: [{ TypeName: "string" }] },
        { ElementName: "process", Type: [{ TypeName: "examplescenario_process" }] },
        { ElementName: "workflow", Type: [{ TypeName: "canonical" }] },
        { ElementName: "operation", Type: [{ TypeName: "examplescenario_process_step_operation" }] },
        { ElementName: "alternative", Type: [{ TypeName: "examplescenario_process_step_alternative" }], IsArray: true },
        { ElementName: "pause", Type: [{ TypeName: "boolean" }] },
    ],
};

export const examplescenario_process_step_alternative: TypeModel = {
    TypeName: "examplescenario_process_step_alternative",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "title", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "step", Type: [{ TypeName: "examplescenario_process_step" }], IsArray: true },
    ],
};

export const examplescenario_process_step_operation: TypeModel = {
    TypeName: "examplescenario_process_step_operation",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "Coding" }] },
        { ElementName: "title", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "initiator", Type: [{ TypeName: "string" }] },
        { ElementName: "receiver", Type: [{ TypeName: "string" }] },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "initiatorActive", Type: [{ TypeName: "boolean" }] },
        { ElementName: "receiverActive", Type: [{ TypeName: "boolean" }] },
        { ElementName: "request", Type: [{ TypeName: "examplescenario_instance_containedInstance" }] },
        { ElementName: "response", Type: [{ TypeName: "examplescenario_instance_containedInstance" }] },
    ],
};

export const explanationofbenefit_accident: TypeModel = {
    TypeName: "explanationofbenefit_accident",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "date", Type: [{ TypeName: "date" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "location[x]", Type: [{ TypeName: "Address" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
    ],
};

export const explanationofbenefit_addItem: TypeModel = {
    TypeName: "explanationofbenefit_addItem",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "itemSequence", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "detailSequence", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "subDetailSequence", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "traceNumber", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Patient"] }] },
        { ElementName: "informationSequence", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "provider", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }], IsArray: true },
        { ElementName: "revenue", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "productOrService", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "productOrServiceEnd", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "request", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DeviceRequest", "http://hl7.org/fhir/StructureDefinition/MedicationRequest", "http://hl7.org/fhir/StructureDefinition/NutritionOrder", "http://hl7.org/fhir/StructureDefinition/ServiceRequest", "http://hl7.org/fhir/StructureDefinition/VisionPrescription"] }], IsArray: true },
        { ElementName: "modifier", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "programCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "serviced[x]", Type: [{ TypeName: "Period" }, { TypeName: "date" }] },
        { ElementName: "location[x]", Type: [{ TypeName: "Address" }, { TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "patientPaid", Type: [{ TypeName: "Money" }] },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "unitPrice", Type: [{ TypeName: "Money" }] },
        { ElementName: "factor", Type: [{ TypeName: "decimal" }] },
        { ElementName: "tax", Type: [{ TypeName: "Money" }] },
        { ElementName: "net", Type: [{ TypeName: "Money" }] },
        { ElementName: "bodySite", Type: [{ TypeName: "explanationofbenefit_addItem_bodySite" }], IsArray: true },
        { ElementName: "noteNumber", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "reviewOutcome", Type: [{ TypeName: "explanationofbenefit_item_reviewOutcome" }] },
        { ElementName: "adjudication", Type: [{ TypeName: "explanationofbenefit_item_adjudication" }], IsArray: true },
        { ElementName: "detail", Type: [{ TypeName: "explanationofbenefit_addItem_detail" }], IsArray: true },
    ],
};

export const explanationofbenefit_addItem_bodySite: TypeModel = {
    TypeName: "explanationofbenefit_addItem_bodySite",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "site", Type: [{ TypeName: "CodeableReference" }], IsArray: true, Required: true },
        { ElementName: "subSite", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
    ],
};

export const explanationofbenefit_addItem_detail: TypeModel = {
    TypeName: "explanationofbenefit_addItem_detail",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "traceNumber", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "revenue", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "productOrService", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "productOrServiceEnd", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "modifier", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "patientPaid", Type: [{ TypeName: "Money" }] },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "unitPrice", Type: [{ TypeName: "Money" }] },
        { ElementName: "factor", Type: [{ TypeName: "decimal" }] },
        { ElementName: "tax", Type: [{ TypeName: "Money" }] },
        { ElementName: "net", Type: [{ TypeName: "Money" }] },
        { ElementName: "noteNumber", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "reviewOutcome", Type: [{ TypeName: "explanationofbenefit_item_reviewOutcome" }] },
        { ElementName: "adjudication", Type: [{ TypeName: "explanationofbenefit_item_adjudication" }], IsArray: true },
        { ElementName: "subDetail", Type: [{ TypeName: "explanationofbenefit_addItem_detail_subDetail" }], IsArray: true },
    ],
};

export const explanationofbenefit_addItem_detail_subDetail: TypeModel = {
    TypeName: "explanationofbenefit_addItem_detail_subDetail",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "traceNumber", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "revenue", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "productOrService", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "productOrServiceEnd", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "modifier", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "patientPaid", Type: [{ TypeName: "Money" }] },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "unitPrice", Type: [{ TypeName: "Money" }] },
        { ElementName: "factor", Type: [{ TypeName: "decimal" }] },
        { ElementName: "tax", Type: [{ TypeName: "Money" }] },
        { ElementName: "net", Type: [{ TypeName: "Money" }] },
        { ElementName: "noteNumber", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "reviewOutcome", Type: [{ TypeName: "explanationofbenefit_item_reviewOutcome" }] },
        { ElementName: "adjudication", Type: [{ TypeName: "explanationofbenefit_item_adjudication" }], IsArray: true },
    ],
};

export const explanationofbenefit_benefitBalance: TypeModel = {
    TypeName: "explanationofbenefit_benefitBalance",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "allowed[x]", Type: [{ TypeName: "Money" }, { TypeName: "string" }, { TypeName: "unsignedInt" }] },
        { ElementName: "used[x]", Type: [{ TypeName: "Money" }, { TypeName: "unsignedInt" }] },
    ],
};

export const explanationofbenefit_careTeam: TypeModel = {
    TypeName: "explanationofbenefit_careTeam",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "sequence", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "provider", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }], Required: true },
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "specialty", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const explanationofbenefit_diagnosis: TypeModel = {
    TypeName: "explanationofbenefit_diagnosis",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "sequence", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "diagnosis[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Condition"] }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "onAdmission", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const explanationofbenefit_event: TypeModel = {
    TypeName: "explanationofbenefit_event",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "when[x]", Type: [{ TypeName: "Period" }, { TypeName: "dateTime" }], Required: true },
    ],
};

export const explanationofbenefit_insurance: TypeModel = {
    TypeName: "explanationofbenefit_insurance",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "focal", Type: [{ TypeName: "boolean" }], Required: true },
        { ElementName: "coverage", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Coverage"] }], Required: true },
        { ElementName: "preAuthRef", Type: [{ TypeName: "string" }], IsArray: true },
    ],
};

export const explanationofbenefit_item: TypeModel = {
    TypeName: "explanationofbenefit_item",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "sequence", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "careTeamSequence", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "diagnosisSequence", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "procedureSequence", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "informationSequence", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "traceNumber", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Patient"] }] },
        { ElementName: "revenue", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "productOrService", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "productOrServiceEnd", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "request", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DeviceRequest", "http://hl7.org/fhir/StructureDefinition/MedicationRequest", "http://hl7.org/fhir/StructureDefinition/NutritionOrder", "http://hl7.org/fhir/StructureDefinition/ServiceRequest", "http://hl7.org/fhir/StructureDefinition/VisionPrescription"] }], IsArray: true },
        { ElementName: "modifier", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "programCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "serviced[x]", Type: [{ TypeName: "Period" }, { TypeName: "date" }] },
        { ElementName: "location[x]", Type: [{ TypeName: "Address" }, { TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "patientPaid", Type: [{ TypeName: "Money" }] },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "unitPrice", Type: [{ TypeName: "Money" }] },
        { ElementName: "factor", Type: [{ TypeName: "decimal" }] },
        { ElementName: "tax", Type: [{ TypeName: "Money" }] },
        { ElementName: "net", Type: [{ TypeName: "Money" }] },
        { ElementName: "udi", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }], IsArray: true },
        { ElementName: "bodySite", Type: [{ TypeName: "explanationofbenefit_item_bodySite" }], IsArray: true },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }], IsArray: true },
        { ElementName: "noteNumber", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "reviewOutcome", Type: [{ TypeName: "explanationofbenefit_item_reviewOutcome" }] },
        { ElementName: "adjudication", Type: [{ TypeName: "explanationofbenefit_item_adjudication" }], IsArray: true },
        { ElementName: "detail", Type: [{ TypeName: "explanationofbenefit_item_detail" }], IsArray: true },
    ],
};

export const explanationofbenefit_item_adjudication: TypeModel = {
    TypeName: "explanationofbenefit_item_adjudication",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "reason", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "amount", Type: [{ TypeName: "Money" }] },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "decisionDate", Type: [{ TypeName: "dateTime" }] },
    ],
};

export const explanationofbenefit_item_bodySite: TypeModel = {
    TypeName: "explanationofbenefit_item_bodySite",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "site", Type: [{ TypeName: "CodeableReference" }], IsArray: true, Required: true },
        { ElementName: "subSite", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
    ],
};

export const explanationofbenefit_item_detail: TypeModel = {
    TypeName: "explanationofbenefit_item_detail",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "sequence", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "traceNumber", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "revenue", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "productOrService", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "productOrServiceEnd", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "modifier", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "programCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "patientPaid", Type: [{ TypeName: "Money" }] },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "unitPrice", Type: [{ TypeName: "Money" }] },
        { ElementName: "factor", Type: [{ TypeName: "decimal" }] },
        { ElementName: "tax", Type: [{ TypeName: "Money" }] },
        { ElementName: "net", Type: [{ TypeName: "Money" }] },
        { ElementName: "udi", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }], IsArray: true },
        { ElementName: "noteNumber", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "reviewOutcome", Type: [{ TypeName: "explanationofbenefit_item_reviewOutcome" }] },
        { ElementName: "adjudication", Type: [{ TypeName: "explanationofbenefit_item_adjudication" }], IsArray: true },
        { ElementName: "subDetail", Type: [{ TypeName: "explanationofbenefit_item_detail_subDetail" }], IsArray: true },
    ],
};

export const explanationofbenefit_item_detail_subDetail: TypeModel = {
    TypeName: "explanationofbenefit_item_detail_subDetail",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "sequence", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "traceNumber", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "revenue", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "productOrService", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "productOrServiceEnd", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "modifier", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "programCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "patientPaid", Type: [{ TypeName: "Money" }] },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "unitPrice", Type: [{ TypeName: "Money" }] },
        { ElementName: "factor", Type: [{ TypeName: "decimal" }] },
        { ElementName: "tax", Type: [{ TypeName: "Money" }] },
        { ElementName: "net", Type: [{ TypeName: "Money" }] },
        { ElementName: "udi", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }], IsArray: true },
        { ElementName: "noteNumber", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "reviewOutcome", Type: [{ TypeName: "explanationofbenefit_item_reviewOutcome" }] },
        { ElementName: "adjudication", Type: [{ TypeName: "explanationofbenefit_item_adjudication" }], IsArray: true },
    ],
};

export const explanationofbenefit_item_reviewOutcome: TypeModel = {
    TypeName: "explanationofbenefit_item_reviewOutcome",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "decision", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "reason", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "preAuthRef", Type: [{ TypeName: "string" }] },
        { ElementName: "preAuthPeriod", Type: [{ TypeName: "Period" }] },
    ],
};

export const explanationofbenefit_payee: TypeModel = {
    TypeName: "explanationofbenefit_payee",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "party", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
    ],
};

export const explanationofbenefit_payment: TypeModel = {
    TypeName: "explanationofbenefit_payment",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "adjustment", Type: [{ TypeName: "Money" }] },
        { ElementName: "adjustmentReason", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "date", Type: [{ TypeName: "date" }] },
        { ElementName: "amount", Type: [{ TypeName: "Money" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
    ],
};

export const explanationofbenefit_procedure: TypeModel = {
    TypeName: "explanationofbenefit_procedure",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "sequence", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "procedure[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Procedure"] }], Required: true },
        { ElementName: "udi", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }], IsArray: true },
    ],
};

export const explanationofbenefit_processNote: TypeModel = {
    TypeName: "explanationofbenefit_processNote",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "class", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "number", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "text", Type: [{ TypeName: "markdown" }] },
        { ElementName: "language", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const explanationofbenefit_related: TypeModel = {
    TypeName: "explanationofbenefit_related",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "claim", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Claim", "http://hl7.org/fhir/StructureDefinition/ExplanationOfBenefit"] }] },
        { ElementName: "relationship", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "reference", Type: [{ TypeName: "Identifier" }] },
    ],
};

export const explanationofbenefit_supportingInfo: TypeModel = {
    TypeName: "explanationofbenefit_supportingInfo",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "sequence", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "timing[x]", Type: [{ TypeName: "Period" }, { TypeName: "Timing" }, { TypeName: "dateTime" }] },
        { ElementName: "value[x]", Type: [{ TypeName: "Address" }, { TypeName: "Age" }, { TypeName: "Annotation" }, { TypeName: "Attachment" }, { TypeName: "Availability" }, { TypeName: "CodeableConcept" }, { TypeName: "CodeableReference" }, { TypeName: "Coding" }, { TypeName: "ContactDetail" }, { TypeName: "ContactPoint" }, { TypeName: "Count" }, { TypeName: "DataRequirement" }, { TypeName: "Distance" }, { TypeName: "Dosage" }, { TypeName: "Duration" }, { TypeName: "Expression" }, { TypeName: "ExtendedContactDetail" }, { TypeName: "HumanName" }, { TypeName: "Identifier" }, { TypeName: "Meta" }, { TypeName: "Money" }, { TypeName: "ParameterDefinition" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "RatioRange" }, { TypeName: "Reference" }, { TypeName: "RelatedArtifact" }, { TypeName: "SampledData" }, { TypeName: "Signature" }, { TypeName: "Timing" }, { TypeName: "TriggerDefinition" }, { TypeName: "UsageContext" }, { TypeName: "VirtualServiceDetail" }, { TypeName: "base64Binary" }, { TypeName: "boolean" }, { TypeName: "canonical" }, { TypeName: "code" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "id" }, { TypeName: "instant" }, { TypeName: "integer" }, { TypeName: "integer64" }, { TypeName: "markdown" }, { TypeName: "oid" }, { TypeName: "positiveInt" }, { TypeName: "string" }, { TypeName: "time" }, { TypeName: "unsignedInt" }, { TypeName: "uri" }, { TypeName: "url" }, { TypeName: "uuid" }] },
        { ElementName: "reason", Type: [{ TypeName: "Coding" }] },
    ],
};

export const explanationofbenefit_total: TypeModel = {
    TypeName: "explanationofbenefit_total",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "amount", Type: [{ TypeName: "Money" }], Required: true },
    ],
};

export const familymemberhistory_condition: TypeModel = {
    TypeName: "familymemberhistory_condition",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "outcome", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "contributedToDeath", Type: [{ TypeName: "boolean" }] },
        { ElementName: "onset[x]", Type: [{ TypeName: "Age" }, { TypeName: "Period" }, { TypeName: "Range" }, { TypeName: "string" }] },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
    ],
};

export const familymemberhistory_procedure: TypeModel = {
    TypeName: "familymemberhistory_procedure",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "outcome", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "contributedToDeath", Type: [{ TypeName: "boolean" }] },
        { ElementName: "performed[x]", Type: [{ TypeName: "Age" }, { TypeName: "Period" }, { TypeName: "Range" }, { TypeName: "dateTime" }, { TypeName: "string" }] },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
    ],
};

export const goal_acceptance: TypeModel = {
    TypeName: "goal_acceptance",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "participant", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
        { ElementName: "status", Type: [{ TypeName: "code" }] },
        { ElementName: "priority", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const goal_target: TypeModel = {
    TypeName: "goal_target",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "measure", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "detail[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "boolean" }, { TypeName: "integer" }, { TypeName: "string" }] },
        { ElementName: "due[x]", Type: [{ TypeName: "Duration" }, { TypeName: "date" }] },
    ],
};

export const group_characteristic: TypeModel = {
    TypeName: "group_characteristic",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Expression" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Reference" }, { TypeName: "boolean" }, { TypeName: "uri" }], Required: true },
        { ElementName: "exclude", Type: [{ TypeName: "boolean" }], Required: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "method", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "formula", Type: [{ TypeName: "Expression" }] },
        { ElementName: "determiner", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/DeviceDefinition", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "offset", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "instances[x]", Type: [{ TypeName: "Range" }, { TypeName: "unsignedInt" }] },
        { ElementName: "duration[x]", Type: [{ TypeName: "Duration" }, { TypeName: "Range" }] },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "timing", Type: [{ TypeName: "RelativeTime" }], IsArray: true },
    ],
};

export const group_member: TypeModel = {
    TypeName: "group_member",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "entity", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/BiologicallyDerivedProduct", "http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Medication", "http://hl7.org/fhir/StructureDefinition/MedicinalProductDefinition", "http://hl7.org/fhir/StructureDefinition/NutritionProduct", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson", "http://hl7.org/fhir/StructureDefinition/Specimen", "http://hl7.org/fhir/StructureDefinition/Substance", "http://hl7.org/fhir/StructureDefinition/SubstanceDefinition"] }], Required: true },
        { ElementName: "involvement", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "inactive", Type: [{ TypeName: "boolean" }] },
    ],
};

export const healthcareservice_eligibility: TypeModel = {
    TypeName: "healthcareservice_eligibility",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "value[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Reference" }, { TypeName: "boolean" }] },
        { ElementName: "comment", Type: [{ TypeName: "markdown" }] },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
    ],
};

export const imagingselection_imageRegion3D: TypeModel = {
    TypeName: "imagingselection_imageRegion3D",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "regionType", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "coordinate", Type: [{ TypeName: "decimal" }], IsArray: true, Required: true },
    ],
};

export const imagingselection_instance: TypeModel = {
    TypeName: "imagingselection_instance",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "uid", Type: [{ TypeName: "id" }], Required: true },
        { ElementName: "number", Type: [{ TypeName: "unsignedInt" }] },
        { ElementName: "sopClass", Type: [{ TypeName: "oid" }] },
        { ElementName: "frameNumber", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "referencedContentItemIdentifier", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "segmentNumber", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "regionOfInterest", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "waveFormChannel", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "imageRegion2D", Type: [{ TypeName: "imagingselection_instance_imageRegion2D" }], IsArray: true },
    ],
};

export const imagingselection_instance_imageRegion2D: TypeModel = {
    TypeName: "imagingselection_instance_imageRegion2D",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "regionType", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "coordinate", Type: [{ TypeName: "decimal" }], IsArray: true, Required: true },
    ],
};

export const imagingselection_performer: TypeModel = {
    TypeName: "imagingselection_performer",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "function", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "actor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
    ],
};

export const imagingstudy_series: TypeModel = {
    TypeName: "imagingstudy_series",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "uid", Type: [{ TypeName: "id" }], Required: true },
        { ElementName: "number", Type: [{ TypeName: "unsignedInt" }] },
        { ElementName: "modality", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "numberOfInstances", Type: [{ TypeName: "unsignedInt" }] },
        { ElementName: "endpoint", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Endpoint"] }], IsArray: true },
        { ElementName: "bodySite", Type: [{ TypeName: "CodeableReference" }] },
        { ElementName: "specimen", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Specimen"] }], IsArray: true },
        { ElementName: "started", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "performer", Type: [{ TypeName: "imagingstudy_series_performer" }], IsArray: true },
        { ElementName: "instance", Type: [{ TypeName: "imagingstudy_series_instance" }], IsArray: true },
    ],
};

export const imagingstudy_series_instance: TypeModel = {
    TypeName: "imagingstudy_series_instance",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "uid", Type: [{ TypeName: "id" }], Required: true },
        { ElementName: "sopClass", Type: [{ TypeName: "oid" }], Required: true },
        { ElementName: "number", Type: [{ TypeName: "unsignedInt" }] },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
    ],
};

export const imagingstudy_series_performer: TypeModel = {
    TypeName: "imagingstudy_series_performer",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "function", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "actor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
    ],
};

export const immunization_performer: TypeModel = {
    TypeName: "immunization_performer",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "function", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "actor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
    ],
};

export const immunization_programEligibility: TypeModel = {
    TypeName: "immunization_programEligibility",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "program", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "programStatus", Type: [{ TypeName: "CodeableConcept" }], Required: true },
    ],
};

export const immunization_protocolApplied: TypeModel = {
    TypeName: "immunization_protocolApplied",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "series", Type: [{ TypeName: "string" }] },
        { ElementName: "authority", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "targetDisease", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "doseNumber", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "seriesDoses", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const immunization_reaction: TypeModel = {
    TypeName: "immunization_reaction",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "manifestation", Type: [{ TypeName: "CodeableReference" }] },
        { ElementName: "reported", Type: [{ TypeName: "boolean" }] },
    ],
};

export const implementationguide_definition: TypeModel = {
    TypeName: "implementationguide_definition",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "grouping", Type: [{ TypeName: "implementationguide_definition_grouping" }], IsArray: true },
        { ElementName: "resource", Type: [{ TypeName: "implementationguide_definition_resource" }], IsArray: true },
        { ElementName: "page", Type: [{ TypeName: "implementationguide_definition_page" }] },
        { ElementName: "parameter", Type: [{ TypeName: "implementationguide_definition_parameter" }], IsArray: true },
        { ElementName: "template", Type: [{ TypeName: "implementationguide_definition_template" }], IsArray: true },
    ],
};

export const implementationguide_definition_grouping: TypeModel = {
    TypeName: "implementationguide_definition_grouping",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "name", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
    ],
};

export const implementationguide_definition_page: TypeModel = {
    TypeName: "implementationguide_definition_page",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "source[x]", Type: [{ TypeName: "markdown" }, { TypeName: "string" }, { TypeName: "url" }] },
        { ElementName: "name", Type: [{ TypeName: "url" }], Required: true },
        { ElementName: "title", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "generation", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "page", Type: [{ TypeName: "implementationguide_definition_page" }], IsArray: true },
    ],
};

export const implementationguide_definition_parameter: TypeModel = {
    TypeName: "implementationguide_definition_parameter",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "Coding" }], Required: true },
        { ElementName: "value", Type: [{ TypeName: "string" }], Required: true },
    ],
};

export const implementationguide_definition_resource: TypeModel = {
    TypeName: "implementationguide_definition_resource",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "reference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], Required: true },
        { ElementName: "fhirVersion", Type: [{ TypeName: "code" }], IsArray: true },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "isExample", Type: [{ TypeName: "boolean" }] },
        { ElementName: "profile", Type: [{ TypeName: "canonical" }], IsArray: true },
        { ElementName: "groupingId", Type: [{ TypeName: "id" }] },
    ],
};

export const implementationguide_definition_template: TypeModel = {
    TypeName: "implementationguide_definition_template",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "source", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "scope", Type: [{ TypeName: "string" }] },
    ],
};

export const implementationguide_dependsOn: TypeModel = {
    TypeName: "implementationguide_dependsOn",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "uri", Type: [{ TypeName: "canonical" }], Required: true },
        { ElementName: "packageId", Type: [{ TypeName: "id" }] },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "reason", Type: [{ TypeName: "markdown" }] },
    ],
};

export const implementationguide_global: TypeModel = {
    TypeName: "implementationguide_global",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "profile", Type: [{ TypeName: "canonical" }], Required: true },
    ],
};

export const implementationguide_manifest: TypeModel = {
    TypeName: "implementationguide_manifest",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "rendering", Type: [{ TypeName: "url" }] },
        { ElementName: "resource", Type: [{ TypeName: "implementationguide_manifest_resource" }], IsArray: true, Required: true },
        { ElementName: "page", Type: [{ TypeName: "implementationguide_manifest_page" }], IsArray: true },
        { ElementName: "image", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "other", Type: [{ TypeName: "string" }], IsArray: true },
    ],
};

export const implementationguide_manifest_page: TypeModel = {
    TypeName: "implementationguide_manifest_page",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "name", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "anchor", Type: [{ TypeName: "string" }], IsArray: true },
    ],
};

export const implementationguide_manifest_resource: TypeModel = {
    TypeName: "implementationguide_manifest_resource",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "reference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], Required: true },
        { ElementName: "isExample", Type: [{ TypeName: "boolean" }] },
        { ElementName: "profile", Type: [{ TypeName: "canonical" }], IsArray: true },
        { ElementName: "relativePath", Type: [{ TypeName: "url" }] },
    ],
};

export const ingredient_manufacturer: TypeModel = {
    TypeName: "ingredient_manufacturer",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "role", Type: [{ TypeName: "code" }] },
        { ElementName: "manufacturer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }], Required: true },
    ],
};

export const ingredient_substance: TypeModel = {
    TypeName: "ingredient_substance",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableReference" }], Required: true },
        { ElementName: "strength", Type: [{ TypeName: "ingredient_substance_strength" }], IsArray: true },
    ],
};

export const ingredient_substance_strength: TypeModel = {
    TypeName: "ingredient_substance_strength",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "presentation[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Quantity" }, { TypeName: "Ratio" }, { TypeName: "RatioRange" }] },
        { ElementName: "textPresentation", Type: [{ TypeName: "string" }] },
        { ElementName: "concentration[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Quantity" }, { TypeName: "Ratio" }, { TypeName: "RatioRange" }] },
        { ElementName: "textConcentration", Type: [{ TypeName: "string" }] },
        { ElementName: "basis", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "measurementPoint", Type: [{ TypeName: "string" }] },
        { ElementName: "country", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "referenceStrength", Type: [{ TypeName: "ingredient_substance_strength_referenceStrength" }], IsArray: true },
    ],
};

export const ingredient_substance_strength_referenceStrength: TypeModel = {
    TypeName: "ingredient_substance_strength_referenceStrength",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "substance", Type: [{ TypeName: "CodeableReference" }], Required: true },
        { ElementName: "strength[x]", Type: [{ TypeName: "Quantity" }, { TypeName: "Ratio" }, { TypeName: "RatioRange" }], Required: true },
        { ElementName: "measurementPoint", Type: [{ TypeName: "string" }] },
        { ElementName: "country", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
    ],
};

export const insuranceplan_generalCost: TypeModel = {
    TypeName: "insuranceplan_generalCost",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "groupSize", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "cost", Type: [{ TypeName: "Money" }] },
        { ElementName: "comment", Type: [{ TypeName: "string" }] },
    ],
};

export const insuranceplan_specificCost: TypeModel = {
    TypeName: "insuranceplan_specificCost",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "benefit", Type: [{ TypeName: "insuranceplan_specificCost_benefit" }], IsArray: true },
    ],
};

export const insuranceplan_specificCost_benefit: TypeModel = {
    TypeName: "insuranceplan_specificCost_benefit",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "cost", Type: [{ TypeName: "insuranceplan_specificCost_benefit_cost" }], IsArray: true },
    ],
};

export const insuranceplan_specificCost_benefit_cost: TypeModel = {
    TypeName: "insuranceplan_specificCost_benefit_cost",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "applicability", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "qualifier", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "value", Type: [{ TypeName: "Quantity" }] },
    ],
};

export const insuranceproduct_coverage: TypeModel = {
    TypeName: "insuranceproduct_coverage",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "network", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }], IsArray: true },
        { ElementName: "benefit", Type: [{ TypeName: "insuranceproduct_coverage_benefit" }], IsArray: true, Required: true },
    ],
};

export const insuranceproduct_coverage_benefit: TypeModel = {
    TypeName: "insuranceproduct_coverage_benefit",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "requirement", Type: [{ TypeName: "string" }] },
        { ElementName: "limit", Type: [{ TypeName: "insuranceproduct_coverage_benefit_limit" }], IsArray: true },
    ],
};

export const insuranceproduct_coverage_benefit_limit: TypeModel = {
    TypeName: "insuranceproduct_coverage_benefit_limit",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "value", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const insuranceproduct_related: TypeModel = {
    TypeName: "insuranceproduct_related",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "product", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/InsuranceProduct"] }] },
        { ElementName: "relationship", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
    ],
};

export const invoice_lineItem: TypeModel = {
    TypeName: "invoice_lineItem",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "sequence", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "serviced[x]", Type: [{ TypeName: "Period" }, { TypeName: "date" }] },
        { ElementName: "chargeItem[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference" }], Required: true },
        { ElementName: "priceComponent", Type: [{ TypeName: "MonetaryComponent" }], IsArray: true },
    ],
};

export const invoice_participant: TypeModel = {
    TypeName: "invoice_participant",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "actor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
    ],
};

export const list_entry: TypeModel = {
    TypeName: "list_entry",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "flag", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "deleted", Type: [{ TypeName: "boolean" }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "item", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], Required: true },
    ],
};

export const location_position: TypeModel = {
    TypeName: "location_position",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "longitude", Type: [{ TypeName: "decimal" }], Required: true },
        { ElementName: "latitude", Type: [{ TypeName: "decimal" }], Required: true },
        { ElementName: "altitude", Type: [{ TypeName: "decimal" }] },
    ],
};

export const manufactureditemdefinition_component: TypeModel = {
    TypeName: "manufactureditemdefinition_component",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "function", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "amount", Type: [{ TypeName: "Quantity" }], IsArray: true },
        { ElementName: "constituent", Type: [{ TypeName: "manufactureditemdefinition_component_constituent" }], IsArray: true },
        { ElementName: "property", Type: [{ TypeName: "manufactureditemdefinition_property" }], IsArray: true },
        { ElementName: "component", Type: [{ TypeName: "manufactureditemdefinition_component" }], IsArray: true },
    ],
};

export const manufactureditemdefinition_component_constituent: TypeModel = {
    TypeName: "manufactureditemdefinition_component_constituent",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "amount", Type: [{ TypeName: "Quantity" }], IsArray: true },
        { ElementName: "location", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "function", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "hasIngredient", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
    ],
};

export const manufactureditemdefinition_property: TypeModel = {
    TypeName: "manufactureditemdefinition_property",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "CodeableConcept" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Binary"] }, { TypeName: "boolean" }, { TypeName: "date" }, { TypeName: "markdown" }] },
    ],
};

export const measure_group: TypeModel = {
    TypeName: "measure_group",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "linkId", Type: [{ TypeName: "string" }] },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "subject[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }] },
        { ElementName: "basis", Type: [{ TypeName: "code" }] },
        { ElementName: "basisRequirement", Type: [{ TypeName: "DataRequirement" }], IsArray: true },
        { ElementName: "scoring", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "scoringUnit", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "scoringPrecision", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "compositeScoring", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "component", Type: [{ TypeName: "measure_group_component" }], IsArray: true },
        { ElementName: "rateAggregation", Type: [{ TypeName: "markdown" }] },
        { ElementName: "improvementNotation", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "improvementNotationGuidance", Type: [{ TypeName: "markdown" }] },
        { ElementName: "library", Type: [{ TypeName: "canonical" }], IsArray: true },
        { ElementName: "population", Type: [{ TypeName: "measure_group_population" }], IsArray: true },
        { ElementName: "stratifier", Type: [{ TypeName: "measure_group_stratifier" }], IsArray: true },
    ],
};

export const measure_group_component: TypeModel = {
    TypeName: "measure_group_component",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "measure", Type: [{ TypeName: "canonical" }] },
        { ElementName: "groupId", Type: [{ TypeName: "string" }] },
        { ElementName: "weight", Type: [{ TypeName: "decimal" }] },
    ],
};

export const measure_group_population: TypeModel = {
    TypeName: "measure_group_population",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "linkId", Type: [{ TypeName: "string" }] },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "criteria", Type: [{ TypeName: "Expression" }] },
        { ElementName: "groupDefinition", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }] },
        { ElementName: "inputPopulationId", Type: [{ TypeName: "string" }] },
        { ElementName: "aggregateMethod", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const measure_group_stratifier: TypeModel = {
    TypeName: "measure_group_stratifier",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "linkId", Type: [{ TypeName: "string" }] },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "criteria", Type: [{ TypeName: "Expression" }] },
        { ElementName: "groupDefinition", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }] },
        { ElementName: "component", Type: [{ TypeName: "measure_group_stratifier_component" }], IsArray: true },
    ],
};

export const measure_group_stratifier_component: TypeModel = {
    TypeName: "measure_group_stratifier_component",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "linkId", Type: [{ TypeName: "string" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "criteria", Type: [{ TypeName: "Expression" }] },
        { ElementName: "groupDefinition", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }] },
        { ElementName: "valueSet", Type: [{ TypeName: "canonical" }] },
        { ElementName: "unit", Type: [{ TypeName: "string" }] },
    ],
};

export const measure_supplementalData: TypeModel = {
    TypeName: "measure_supplementalData",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "linkId", Type: [{ TypeName: "string" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "usage", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "criteria", Type: [{ TypeName: "Expression" }], Required: true },
        { ElementName: "valueSet", Type: [{ TypeName: "canonical" }] },
        { ElementName: "unit", Type: [{ TypeName: "string" }] },
    ],
};

export const measure_term: TypeModel = {
    TypeName: "measure_term",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "definition", Type: [{ TypeName: "markdown" }] },
    ],
};

export const measurereport_group: TypeModel = {
    TypeName: "measurereport_group",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "linkId", Type: [{ TypeName: "string" }] },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "calculatedDate", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "scoring", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "improvementNotation", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "improvementNotationGuidance", Type: [{ TypeName: "markdown" }] },
        { ElementName: "population", Type: [{ TypeName: "measurereport_group_population" }], IsArray: true },
        { ElementName: "measureScore[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Duration" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "boolean" }, { TypeName: "dateTime" }] },
        { ElementName: "stratifier", Type: [{ TypeName: "measurereport_group_stratifier" }], IsArray: true },
    ],
};

export const measurereport_group_population: TypeModel = {
    TypeName: "measurereport_group_population",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "linkId", Type: [{ TypeName: "string" }] },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "count", Type: [{ TypeName: "integer" }] },
        { ElementName: "countQuantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "subjectResults", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/List"] }] },
        { ElementName: "subjectReport", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MeasureReport"] }], IsArray: true },
        { ElementName: "subjects", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }] },
    ],
};

export const measurereport_group_stratifier: TypeModel = {
    TypeName: "measurereport_group_stratifier",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "linkId", Type: [{ TypeName: "string" }] },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "stratum", Type: [{ TypeName: "measurereport_group_stratifier_stratum" }], IsArray: true },
    ],
};

export const measurereport_group_stratifier_stratum: TypeModel = {
    TypeName: "measurereport_group_stratifier_stratum",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "value[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Reference" }, { TypeName: "boolean" }] },
        { ElementName: "component", Type: [{ TypeName: "measurereport_group_stratifier_stratum_component" }], IsArray: true },
        { ElementName: "population", Type: [{ TypeName: "measurereport_group_stratifier_stratum_population" }], IsArray: true },
        { ElementName: "measureScore[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Duration" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "boolean" }, { TypeName: "dateTime" }] },
    ],
};

export const measurereport_group_stratifier_stratum_component: TypeModel = {
    TypeName: "measurereport_group_stratifier_stratum_component",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "linkId", Type: [{ TypeName: "string" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "value[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Reference" }, { TypeName: "boolean" }], Required: true },
    ],
};

export const measurereport_group_stratifier_stratum_population: TypeModel = {
    TypeName: "measurereport_group_stratifier_stratum_population",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "linkId", Type: [{ TypeName: "string" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "count", Type: [{ TypeName: "integer" }] },
        { ElementName: "countQuantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "subjectResults", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/List"] }] },
        { ElementName: "subjectReport", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MeasureReport"] }], IsArray: true },
        { ElementName: "subjects", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }] },
    ],
};

export const medication_ingredient: TypeModel = {
    TypeName: "medication_ingredient",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "item", Type: [{ TypeName: "CodeableReference" }], Required: true },
        { ElementName: "isActive", Type: [{ TypeName: "boolean" }] },
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "strength[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Quantity" }, { TypeName: "Ratio" }] },
    ],
};

export const medication_instance: TypeModel = {
    TypeName: "medication_instance",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "lotNumber", Type: [{ TypeName: "string" }] },
        { ElementName: "expirationDate", Type: [{ TypeName: "dateTime" }] },
    ],
};

export const medication_packageSize: TypeModel = {
    TypeName: "medication_packageSize",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "numberOfItems", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "amountPerItem", Type: [{ TypeName: "Ratio" }] },
    ],
};

export const medicationadministration_dosage: TypeModel = {
    TypeName: "medicationadministration_dosage",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "text", Type: [{ TypeName: "string" }] },
        { ElementName: "site", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "route", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "method", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "dose", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "rate[x]", Type: [{ TypeName: "Quantity" }, { TypeName: "Ratio" }] },
    ],
};

export const medicationadministration_performer: TypeModel = {
    TypeName: "medicationadministration_performer",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "function", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "actor", Type: [{ TypeName: "CodeableReference" }], Required: true },
    ],
};

export const medicationdispense_performer: TypeModel = {
    TypeName: "medicationdispense_performer",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "function", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "actor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
    ],
};

export const medicationdispense_substitution: TypeModel = {
    TypeName: "medicationdispense_substitution",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "wasSubstituted", Type: [{ TypeName: "boolean" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "reason", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "responsibleParty", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
    ],
};

export const medicationrequest_dispenseRequest: TypeModel = {
    TypeName: "medicationrequest_dispenseRequest",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "initialFill", Type: [{ TypeName: "medicationrequest_dispenseRequest_initialFill" }] },
        { ElementName: "dispenseInterval", Type: [{ TypeName: "Duration" }] },
        { ElementName: "validityPeriod", Type: [{ TypeName: "Period" }] },
        { ElementName: "numberOfRepeatsAllowed", Type: [{ TypeName: "unsignedInt" }] },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "expectedSupplyDuration", Type: [{ TypeName: "Duration" }] },
        { ElementName: "dispenser", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "dispenserInstruction", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "doseAdministrationAid", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "destination", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
    ],
};

export const medicationrequest_dispenseRequest_initialFill: TypeModel = {
    TypeName: "medicationrequest_dispenseRequest_initialFill",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "duration", Type: [{ TypeName: "Duration" }] },
    ],
};

export const medicationrequest_substitution: TypeModel = {
    TypeName: "medicationrequest_substitution",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "allowed[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "boolean" }], Required: true },
        { ElementName: "reason", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const medicationstatement_adherence: TypeModel = {
    TypeName: "medicationstatement_adherence",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "reason", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const medicinalproductdefinition_characteristic: TypeModel = {
    TypeName: "medicinalproductdefinition_characteristic",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "CodeableConcept" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "boolean" }, { TypeName: "date" }, { TypeName: "integer" }, { TypeName: "markdown" }] },
    ],
};

export const medicinalproductdefinition_contact: TypeModel = {
    TypeName: "medicinalproductdefinition_contact",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "contact", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }], Required: true },
    ],
};

export const medicinalproductdefinition_crossReference: TypeModel = {
    TypeName: "medicinalproductdefinition_crossReference",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "product", Type: [{ TypeName: "CodeableReference" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const medicinalproductdefinition_name: TypeModel = {
    TypeName: "medicinalproductdefinition_name",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "productName", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "part", Type: [{ TypeName: "medicinalproductdefinition_name_part" }], IsArray: true },
        { ElementName: "usage", Type: [{ TypeName: "medicinalproductdefinition_name_usage" }], IsArray: true },
    ],
};

export const medicinalproductdefinition_name_part: TypeModel = {
    TypeName: "medicinalproductdefinition_name_part",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "part", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
    ],
};

export const medicinalproductdefinition_name_usage: TypeModel = {
    TypeName: "medicinalproductdefinition_name_usage",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "country", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "jurisdiction", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "language", Type: [{ TypeName: "CodeableConcept" }], Required: true },
    ],
};

export const medicinalproductdefinition_operation: TypeModel = {
    TypeName: "medicinalproductdefinition_operation",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableReference" }] },
        { ElementName: "effectiveDate", Type: [{ TypeName: "Period" }] },
        { ElementName: "organization", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }], IsArray: true },
        { ElementName: "confidentialityIndicator", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const messagedefinition_allowedResponse: TypeModel = {
    TypeName: "messagedefinition_allowedResponse",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "message", Type: [{ TypeName: "canonical" }], Required: true },
        { ElementName: "situation", Type: [{ TypeName: "markdown" }] },
    ],
};

export const messagedefinition_focus: TypeModel = {
    TypeName: "messagedefinition_focus",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "profile", Type: [{ TypeName: "canonical" }] },
        { ElementName: "min", Type: [{ TypeName: "unsignedInt" }], Required: true },
        { ElementName: "max", Type: [{ TypeName: "string" }] },
    ],
};

export const messageheader_destination: TypeModel = {
    TypeName: "messageheader_destination",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "endpoint[x]", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Endpoint"] }, { TypeName: "url" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "receiver", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
    ],
};

export const messageheader_response: TypeModel = {
    TypeName: "messageheader_response",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], Required: true },
        { ElementName: "code", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "details", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/OperationOutcome"] }] },
    ],
};

export const messageheader_source: TypeModel = {
    TypeName: "messageheader_source",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "endpoint[x]", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Endpoint"] }, { TypeName: "url" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "software", Type: [{ TypeName: "string" }] },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "contact", Type: [{ TypeName: "ContactPoint" }] },
        { ElementName: "sender", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
    ],
};

export const namingsystem_uniqueId: TypeModel = {
    TypeName: "namingsystem_uniqueId",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "value", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "preferred", Type: [{ TypeName: "boolean" }] },
        { ElementName: "comment", Type: [{ TypeName: "string" }] },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "authoritative", Type: [{ TypeName: "boolean" }] },
    ],
};

export const nutritionintake_nutritionItem: TypeModel = {
    TypeName: "nutritionintake_nutritionItem",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "nutritionProduct", Type: [{ TypeName: "CodeableReference" }] },
        { ElementName: "consumedItem", Type: [{ TypeName: "nutritionintake_nutritionItem_consumedItem" }], IsArray: true },
        { ElementName: "notConsumedItem", Type: [{ TypeName: "nutritionintake_nutritionItem_notConsumedItem" }], IsArray: true },
    ],
};

export const nutritionintake_nutritionItem_consumedItem: TypeModel = {
    TypeName: "nutritionintake_nutritionItem_consumedItem",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "schedule", Type: [{ TypeName: "Timing" }] },
        { ElementName: "amount", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "rate[x]", Type: [{ TypeName: "Quantity" }, { TypeName: "Ratio" }] },
        { ElementName: "totalIntake", Type: [{ TypeName: "nutritionintake_nutritionItem_consumedItem_totalIntake" }], IsArray: true },
    ],
};

export const nutritionintake_nutritionItem_consumedItem_totalIntake: TypeModel = {
    TypeName: "nutritionintake_nutritionItem_consumedItem_totalIntake",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "nutrient", Type: [{ TypeName: "CodeableReference" }], Required: true },
        { ElementName: "amount", Type: [{ TypeName: "Quantity" }], Required: true },
        { ElementName: "energy", Type: [{ TypeName: "Quantity" }] },
    ],
};

export const nutritionintake_nutritionItem_notConsumedItem: TypeModel = {
    TypeName: "nutritionintake_nutritionItem_notConsumedItem",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "reason", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "schedule", Type: [{ TypeName: "Timing" }] },
        { ElementName: "amount", Type: [{ TypeName: "Quantity" }] },
    ],
};

export const nutritionintake_performer: TypeModel = {
    TypeName: "nutritionintake_performer",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "function", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "actor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
    ],
};

export const nutritionorder_additive: TypeModel = {
    TypeName: "nutritionorder_additive",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modularType", Type: [{ TypeName: "CodeableReference" }] },
        { ElementName: "productName", Type: [{ TypeName: "string" }] },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "routeOfAdministration", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
    ],
};

export const nutritionorder_enteralFormula: TypeModel = {
    TypeName: "nutritionorder_enteralFormula",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableReference" }] },
        { ElementName: "productName", Type: [{ TypeName: "string" }] },
        { ElementName: "deliveryDevice[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "canonical" }] },
        { ElementName: "caloricDensity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "routeOfAdministration", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "administration", Type: [{ TypeName: "nutritionorder_enteralFormula_administration" }], IsArray: true },
        { ElementName: "maxVolumeToAdminister", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "administrationInstruction", Type: [{ TypeName: "markdown" }] },
    ],
};

export const nutritionorder_enteralFormula_administration: TypeModel = {
    TypeName: "nutritionorder_enteralFormula_administration",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "schedule", Type: [{ TypeName: "nutritionorder_enteralFormula_administration_schedule" }] },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "rate[x]", Type: [{ TypeName: "Quantity" }, { TypeName: "Ratio" }] },
    ],
};

export const nutritionorder_enteralFormula_administration_schedule: TypeModel = {
    TypeName: "nutritionorder_enteralFormula_administration_schedule",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "timing", Type: [{ TypeName: "Timing" }], IsArray: true },
        { ElementName: "asNeeded", Type: [{ TypeName: "boolean" }] },
        { ElementName: "asNeededFor", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const nutritionorder_oralDiet: TypeModel = {
    TypeName: "nutritionorder_oralDiet",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "schedule", Type: [{ TypeName: "nutritionorder_oralDiet_schedule" }] },
        { ElementName: "nutrient", Type: [{ TypeName: "nutritionorder_oralDiet_nutrient" }], IsArray: true },
        { ElementName: "texture", Type: [{ TypeName: "nutritionorder_oralDiet_texture" }], IsArray: true },
        { ElementName: "instruction", Type: [{ TypeName: "string" }] },
        { ElementName: "caloricDensity", Type: [{ TypeName: "Quantity" }] },
    ],
};

export const nutritionorder_oralDiet_nutrient: TypeModel = {
    TypeName: "nutritionorder_oralDiet_nutrient",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifier", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "amount", Type: [{ TypeName: "Quantity" }] },
    ],
};

export const nutritionorder_oralDiet_schedule: TypeModel = {
    TypeName: "nutritionorder_oralDiet_schedule",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "timing", Type: [{ TypeName: "Timing" }], IsArray: true },
        { ElementName: "asNeeded", Type: [{ TypeName: "boolean" }] },
        { ElementName: "asNeededFor", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const nutritionorder_oralDiet_texture: TypeModel = {
    TypeName: "nutritionorder_oralDiet_texture",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifier", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const nutritionorder_supplement: TypeModel = {
    TypeName: "nutritionorder_supplement",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableReference" }] },
        { ElementName: "productName", Type: [{ TypeName: "string" }] },
        { ElementName: "schedule", Type: [{ TypeName: "nutritionorder_supplement_schedule" }] },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "instruction", Type: [{ TypeName: "string" }] },
        { ElementName: "caloricDensity", Type: [{ TypeName: "Quantity" }] },
    ],
};

export const nutritionorder_supplement_schedule: TypeModel = {
    TypeName: "nutritionorder_supplement_schedule",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "timing", Type: [{ TypeName: "Timing" }], IsArray: true },
        { ElementName: "asNeeded", Type: [{ TypeName: "boolean" }] },
        { ElementName: "asNeededFor", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const nutritionproduct_characteristic: TypeModel = {
    TypeName: "nutritionproduct_characteristic",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "CodeableConcept" }, { TypeName: "Quantity" }, { TypeName: "base64Binary" }, { TypeName: "boolean" }, { TypeName: "string" }], Required: true },
    ],
};

export const nutritionproduct_ingredient: TypeModel = {
    TypeName: "nutritionproduct_ingredient",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "item", Type: [{ TypeName: "CodeableReference" }], Required: true },
        { ElementName: "amount[x]", Type: [{ TypeName: "Quantity" }, { TypeName: "Ratio" }] },
        { ElementName: "allergen", Type: [{ TypeName: "boolean" }] },
    ],
};

export const nutritionproduct_instance: TypeModel = {
    TypeName: "nutritionproduct_instance",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "lotNumber", Type: [{ TypeName: "string" }] },
        { ElementName: "expiry", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "useBy", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "biologicalSourceEvent", Type: [{ TypeName: "Identifier" }] },
    ],
};

export const nutritionproduct_nutrient: TypeModel = {
    TypeName: "nutritionproduct_nutrient",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "item", Type: [{ TypeName: "CodeableReference" }], Required: true },
        { ElementName: "amount[x]", Type: [{ TypeName: "Quantity" }, { TypeName: "Ratio" }] },
    ],
};

export const observation_component: TypeModel = {
    TypeName: "observation_component",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "CodeableConcept" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "SampledData" }, { TypeName: "boolean" }, { TypeName: "dateTime" }, { TypeName: "integer" }, { TypeName: "string" }, { TypeName: "time" }] },
        { ElementName: "dataAbsentReason", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "interpretation", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "referenceRange", Type: [{ TypeName: "observation_referenceRange" }], IsArray: true },
    ],
};

export const observation_referenceRange: TypeModel = {
    TypeName: "observation_referenceRange",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "low", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "high", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "normalValue", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "appliesTo", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "age", Type: [{ TypeName: "Range" }] },
        { ElementName: "text", Type: [{ TypeName: "markdown" }] },
    ],
};

export const observation_triggeredBy: TypeModel = {
    TypeName: "observation_triggeredBy",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "observation", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Observation"] }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "reason", Type: [{ TypeName: "string" }] },
    ],
};

export const observationdefinition_component: TypeModel = {
    TypeName: "observationdefinition_component",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "permittedDataType", Type: [{ TypeName: "code" }], IsArray: true },
        { ElementName: "permittedUnit", Type: [{ TypeName: "Coding" }], IsArray: true },
        { ElementName: "qualifiedValue", Type: [{ TypeName: "observationdefinition_qualifiedValue" }], IsArray: true },
    ],
};

export const observationdefinition_qualifiedValue: TypeModel = {
    TypeName: "observationdefinition_qualifiedValue",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "context", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "appliesTo", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "sexParameterForClinicalUse", Type: [{ TypeName: "code" }] },
        { ElementName: "age", Type: [{ TypeName: "Range" }] },
        { ElementName: "gestationalAge", Type: [{ TypeName: "Range" }] },
        { ElementName: "condition", Type: [{ TypeName: "string" }] },
        { ElementName: "rangeCategory", Type: [{ TypeName: "code" }] },
        { ElementName: "range", Type: [{ TypeName: "Range" }] },
        { ElementName: "validCodedValueSet", Type: [{ TypeName: "canonical" }] },
        { ElementName: "normalCodedValueSet", Type: [{ TypeName: "canonical" }] },
        { ElementName: "abnormalCodedValueSet", Type: [{ TypeName: "canonical" }] },
        { ElementName: "criticalCodedValueSet", Type: [{ TypeName: "canonical" }] },
        { ElementName: "interpretation", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
    ],
};

export const operationdefinition_overload: TypeModel = {
    TypeName: "operationdefinition_overload",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "parameterName", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "comment", Type: [{ TypeName: "string" }] },
    ],
};

export const operationdefinition_parameter: TypeModel = {
    TypeName: "operationdefinition_parameter",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "name", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "use", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "scope", Type: [{ TypeName: "code" }], IsArray: true },
        { ElementName: "min", Type: [{ TypeName: "unsignedInt" }], Required: true },
        { ElementName: "max", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "documentation", Type: [{ TypeName: "markdown" }] },
        { ElementName: "type", Type: [{ TypeName: "code" }] },
        { ElementName: "allowedType", Type: [{ TypeName: "code" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "strength", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "valueSet", Type: [{ TypeName: "canonical" }], Required: true },
    ],
};

export const operationdefinition_parameter_referencedFrom: TypeModel = {
    TypeName: "operationdefinition_parameter_referencedFrom",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "source", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "sourceId", Type: [{ TypeName: "string" }] },
    ],
};

export const operationoutcome_issue: TypeModel = {
    TypeName: "operationoutcome_issue",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "severity", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "code", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "details", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "diagnostics", Type: [{ TypeName: "string" }] },
        { ElementName: "location", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "expression", Type: [{ TypeName: "string" }], IsArray: true },
    ],
};

export const organization_qualification: TypeModel = {
    TypeName: "organization_qualification",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "status", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "issuer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
    ],
};

export const packagedproductdefinition_legalStatusOfSupply: TypeModel = {
    TypeName: "packagedproductdefinition_legalStatusOfSupply",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "jurisdiction", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const packagedproductdefinition_packaging: TypeModel = {
    TypeName: "packagedproductdefinition_packaging",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "componentPart", Type: [{ TypeName: "boolean" }] },
        { ElementName: "quantity", Type: [{ TypeName: "integer" }] },
        { ElementName: "material", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "alternateMaterial", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "shelfLifeStorage", Type: [{ TypeName: "ProductShelfLife" }], IsArray: true },
        { ElementName: "manufacturer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }], IsArray: true },
        { ElementName: "property", Type: [{ TypeName: "packagedproductdefinition_packaging_property" }], IsArray: true },
        { ElementName: "containedItem", Type: [{ TypeName: "packagedproductdefinition_packaging_containedItem" }], IsArray: true },
        { ElementName: "packaging", Type: [{ TypeName: "packagedproductdefinition_packaging" }], IsArray: true },
    ],
};

export const packagedproductdefinition_packaging_containedItem: TypeModel = {
    TypeName: "packagedproductdefinition_packaging_containedItem",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "item", Type: [{ TypeName: "CodeableReference" }], Required: true },
        { ElementName: "amount", Type: [{ TypeName: "Quantity" }] },
    ],
};

export const packagedproductdefinition_packaging_property: TypeModel = {
    TypeName: "packagedproductdefinition_packaging_property",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "CodeableConcept" }, { TypeName: "Quantity" }, { TypeName: "boolean" }, { TypeName: "date" }] },
    ],
};

export const parameters_parameter: TypeModel = {
    TypeName: "parameters_parameter",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "name", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "Address" }, { TypeName: "Age" }, { TypeName: "Annotation" }, { TypeName: "Attachment" }, { TypeName: "Availability" }, { TypeName: "CodeableConcept" }, { TypeName: "CodeableReference" }, { TypeName: "Coding" }, { TypeName: "ContactDetail" }, { TypeName: "ContactPoint" }, { TypeName: "Count" }, { TypeName: "DataRequirement" }, { TypeName: "Distance" }, { TypeName: "Dosage" }, { TypeName: "Duration" }, { TypeName: "Expression" }, { TypeName: "ExtendedContactDetail" }, { TypeName: "HumanName" }, { TypeName: "Identifier" }, { TypeName: "Meta" }, { TypeName: "Money" }, { TypeName: "ParameterDefinition" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "RatioRange" }, { TypeName: "Reference" }, { TypeName: "RelatedArtifact" }, { TypeName: "SampledData" }, { TypeName: "Signature" }, { TypeName: "Timing" }, { TypeName: "TriggerDefinition" }, { TypeName: "UsageContext" }, { TypeName: "VirtualServiceDetail" }, { TypeName: "base64Binary" }, { TypeName: "boolean" }, { TypeName: "canonical" }, { TypeName: "code" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "id" }, { TypeName: "instant" }, { TypeName: "integer" }, { TypeName: "integer64" }, { TypeName: "markdown" }, { TypeName: "oid" }, { TypeName: "positiveInt" }, { TypeName: "string" }, { TypeName: "time" }, { TypeName: "unsignedInt" }, { TypeName: "uri" }, { TypeName: "url" }, { TypeName: "uuid" }] },
        { ElementName: "resource", Type: [{ TypeName: "Resource" }] },
        { ElementName: "part", Type: [{ TypeName: "parameters_parameter" }], IsArray: true },
    ],
};

export const patient_communication: TypeModel = {
    TypeName: "patient_communication",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "language", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "preferred", Type: [{ TypeName: "boolean" }] },
    ],
};

export const patient_contact: TypeModel = {
    TypeName: "patient_contact",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "relationship", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "name", Type: [{ TypeName: "HumanName" }] },
        { ElementName: "additionalName", Type: [{ TypeName: "HumanName" }], IsArray: true },
        { ElementName: "telecom", Type: [{ TypeName: "ContactPoint" }], IsArray: true },
        { ElementName: "address", Type: [{ TypeName: "Address" }] },
        { ElementName: "additionalAddress", Type: [{ TypeName: "Address" }], IsArray: true },
        { ElementName: "gender", Type: [{ TypeName: "code" }] },
        { ElementName: "organization", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
    ],
};

export const patient_link: TypeModel = {
    TypeName: "patient_link",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "other", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
    ],
};

export const paymentreconciliation_allocation: TypeModel = {
    TypeName: "paymentreconciliation_allocation",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "predecessor", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "target", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Account", "http://hl7.org/fhir/StructureDefinition/Claim", "http://hl7.org/fhir/StructureDefinition/Contract", "http://hl7.org/fhir/StructureDefinition/Encounter", "http://hl7.org/fhir/StructureDefinition/Invoice"] }] },
        { ElementName: "targetItem[x]", Type: [{ TypeName: "Identifier" }, { TypeName: "positiveInt" }, { TypeName: "string" }] },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "account", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Account"] }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "submitter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "response", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ClaimResponse"] }] },
        { ElementName: "date", Type: [{ TypeName: "date" }] },
        { ElementName: "responsible", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "payee", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "amount", Type: [{ TypeName: "Money" }] },
        { ElementName: "noteNumber", Type: [{ TypeName: "positiveInt" }], IsArray: true },
    ],
};

export const paymentreconciliation_processNote: TypeModel = {
    TypeName: "paymentreconciliation_processNote",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "class", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "number", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "type", Type: [{ TypeName: "code" }] },
        { ElementName: "text", Type: [{ TypeName: "markdown" }] },
    ],
};

export const person_communication: TypeModel = {
    TypeName: "person_communication",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "language", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "preferred", Type: [{ TypeName: "boolean" }] },
    ],
};

export const person_link: TypeModel = {
    TypeName: "person_link",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "target", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Person", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
        { ElementName: "assurance", Type: [{ TypeName: "code" }] },
    ],
};

export const plandefinition_action: TypeModel = {
    TypeName: "plandefinition_action",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "linkId", Type: [{ TypeName: "string" }] },
        { ElementName: "prefix", Type: [{ TypeName: "string" }] },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "textEquivalent", Type: [{ TypeName: "markdown" }] },
        { ElementName: "priority", Type: [{ TypeName: "code" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "reason", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "documentation", Type: [{ TypeName: "RelatedArtifact" }], IsArray: true },
        { ElementName: "goalId", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "subject[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }, { TypeName: "canonical" }] },
        { ElementName: "trigger", Type: [{ TypeName: "TriggerDefinition" }], IsArray: true },
        { ElementName: "condition", Type: [{ TypeName: "plandefinition_action_condition" }], IsArray: true },
        { ElementName: "input", Type: [{ TypeName: "plandefinition_action_input" }], IsArray: true },
        { ElementName: "output", Type: [{ TypeName: "plandefinition_action_output" }], IsArray: true },
        { ElementName: "relatedAction", Type: [{ TypeName: "plandefinition_action_relatedAction" }], IsArray: true },
        { ElementName: "timing[x]", Type: [{ TypeName: "Age" }, { TypeName: "Duration" }, { TypeName: "Range" }, { TypeName: "RelativeTime" }, { TypeName: "Timing" }] },
        { ElementName: "location", Type: [{ TypeName: "CodeableReference" }] },
        { ElementName: "participant", Type: [{ TypeName: "plandefinition_action_participant" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "applicabilityBehavior", Type: [{ TypeName: "code" }] },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "kind", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "expression", Type: [{ TypeName: "Expression" }] },
    ],
};

export const plandefinition_action_dynamicValue: TypeModel = {
    TypeName: "plandefinition_action_dynamicValue",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "path", Type: [{ TypeName: "string" }] },
        { ElementName: "expression", Type: [{ TypeName: "Expression" }] },
    ],
};

export const plandefinition_action_input: TypeModel = {
    TypeName: "plandefinition_action_input",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "requirement", Type: [{ TypeName: "DataRequirement" }] },
        { ElementName: "relatedData", Type: [{ TypeName: "string" }] },
    ],
};

export const plandefinition_action_output: TypeModel = {
    TypeName: "plandefinition_action_output",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "requirement", Type: [{ TypeName: "DataRequirement" }] },
        { ElementName: "relatedData", Type: [{ TypeName: "string" }] },
    ],
};

export const plandefinition_action_participant: TypeModel = {
    TypeName: "plandefinition_action_participant",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "actorId", Type: [{ TypeName: "string" }] },
        { ElementName: "type", Type: [{ TypeName: "code" }] },
        { ElementName: "typeCanonical", Type: [{ TypeName: "canonical" }] },
        { ElementName: "typeReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/BiologicallyDerivedProduct", "http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Endpoint", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Medication", "http://hl7.org/fhir/StructureDefinition/MedicinalProductDefinition", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson", "http://hl7.org/fhir/StructureDefinition/Specimen", "http://hl7.org/fhir/StructureDefinition/Substance", "http://hl7.org/fhir/StructureDefinition/SubstanceDefinition"] }] },
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "function", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const plandefinition_action_relatedAction: TypeModel = {
    TypeName: "plandefinition_action_relatedAction",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "targetId", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "relationship", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "endRelationship", Type: [{ TypeName: "code" }] },
        { ElementName: "offset[x]", Type: [{ TypeName: "Duration" }, { TypeName: "Range" }] },
    ],
};

export const plandefinition_actor: TypeModel = {
    TypeName: "plandefinition_actor",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "option", Type: [{ TypeName: "plandefinition_actor_option" }], IsArray: true, Required: true },
    ],
};

export const plandefinition_actor_option: TypeModel = {
    TypeName: "plandefinition_actor_option",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "code" }] },
        { ElementName: "typeCanonical", Type: [{ TypeName: "canonical" }] },
        { ElementName: "typeReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/BiologicallyDerivedProduct", "http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Endpoint", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Medication", "http://hl7.org/fhir/StructureDefinition/MedicinalProductDefinition", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson", "http://hl7.org/fhir/StructureDefinition/Specimen", "http://hl7.org/fhir/StructureDefinition/Substance", "http://hl7.org/fhir/StructureDefinition/SubstanceDefinition"] }] },
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const plandefinition_goal: TypeModel = {
    TypeName: "plandefinition_goal",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "measure", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "detail[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "boolean" }, { TypeName: "integer" }, { TypeName: "string" }] },
        { ElementName: "due", Type: [{ TypeName: "Duration" }] },
    ],
};

export const practitioner_communication: TypeModel = {
    TypeName: "practitioner_communication",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "language", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "preferred", Type: [{ TypeName: "boolean" }] },
    ],
};

export const practitioner_qualification: TypeModel = {
    TypeName: "practitioner_qualification",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "status", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "issuer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
    ],
};

export const procedure_focalDevice: TypeModel = {
    TypeName: "procedure_focalDevice",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "action", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "manipulated", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }], Required: true },
    ],
};

export const procedure_performer: TypeModel = {
    TypeName: "procedure_performer",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "function", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "actor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
        { ElementName: "onBehalfOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
    ],
};

export const provenance_agent: TypeModel = {
    TypeName: "provenance_agent",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "who", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
        { ElementName: "onBehalfOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
    ],
};

export const provenance_entity: TypeModel = {
    TypeName: "provenance_entity",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "role", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "what", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], Required: true },
        { ElementName: "agent", Type: [{ TypeName: "provenance_agent" }], IsArray: true },
    ],
};

export const questionnaire_item: TypeModel = {
    TypeName: "questionnaire_item",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "linkId", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "definition", Type: [{ TypeName: "uri" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "Coding" }], IsArray: true },
        { ElementName: "prefix", Type: [{ TypeName: "string" }] },
        { ElementName: "text", Type: [{ TypeName: "string" }] },
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "enableWhen", Type: [{ TypeName: "questionnaire_item_enableWhen" }], IsArray: true },
        { ElementName: "enableBehavior", Type: [{ TypeName: "code" }] },
        { ElementName: "disabledDisplay", Type: [{ TypeName: "code" }] },
        { ElementName: "required", Type: [{ TypeName: "boolean" }] },
        { ElementName: "repeats", Type: [{ TypeName: "boolean" }] },
        { ElementName: "readOnly", Type: [{ TypeName: "boolean" }] },
        { ElementName: "maxLength", Type: [{ TypeName: "integer" }] },
        { ElementName: "answerConstraint", Type: [{ TypeName: "code" }] },
        { ElementName: "answerValueSet", Type: [{ TypeName: "canonical" }] },
        { ElementName: "answerOption", Type: [{ TypeName: "questionnaire_item_answerOption" }], IsArray: true },
        { ElementName: "initial", Type: [{ TypeName: "questionnaire_item_initial" }], IsArray: true },
        { ElementName: "item", Type: [{ TypeName: "questionnaire_item" }], IsArray: true },
    ],
};

export const questionnaire_item_answerOption: TypeModel = {
    TypeName: "questionnaire_item_answerOption",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "value[x]", Type: [{ TypeName: "Coding" }, { TypeName: "Quantity" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "integer" }, { TypeName: "string" }, { TypeName: "time" }, { TypeName: "uri" }], Required: true },
        { ElementName: "initialSelected", Type: [{ TypeName: "boolean" }] },
    ],
};

export const questionnaire_item_enableWhen: TypeModel = {
    TypeName: "questionnaire_item_enableWhen",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "question", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "operator", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "answer[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "Coding" }, { TypeName: "Quantity" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }, { TypeName: "boolean" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "integer" }, { TypeName: "string" }, { TypeName: "time" }, { TypeName: "uri" }], Required: true },
    ],
};

export const questionnaire_item_initial: TypeModel = {
    TypeName: "questionnaire_item_initial",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "value[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "Coding" }, { TypeName: "Quantity" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }, { TypeName: "boolean" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "integer" }, { TypeName: "string" }, { TypeName: "time" }, { TypeName: "uri" }], Required: true },
    ],
};

export const questionnaireresponse_item: TypeModel = {
    TypeName: "questionnaireresponse_item",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "linkId", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "definition", Type: [{ TypeName: "uri" }], IsArray: true },
        { ElementName: "text", Type: [{ TypeName: "string" }] },
        { ElementName: "answer", Type: [{ TypeName: "questionnaireresponse_item_answer" }], IsArray: true },
        { ElementName: "item", Type: [{ TypeName: "questionnaireresponse_item" }], IsArray: true },
    ],
};

export const questionnaireresponse_item_answer: TypeModel = {
    TypeName: "questionnaireresponse_item_answer",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "value[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "Coding" }, { TypeName: "Quantity" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }, { TypeName: "boolean" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "integer" }, { TypeName: "string" }, { TypeName: "time" }, { TypeName: "uri" }], Required: true },
        { ElementName: "item", Type: [{ TypeName: "questionnaireresponse_item" }], IsArray: true },
    ],
};

export const regulatedauthorization_case: TypeModel = {
    TypeName: "regulatedauthorization_case",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "status", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "date[x]", Type: [{ TypeName: "Period" }, { TypeName: "dateTime" }] },
        { ElementName: "application", Type: [{ TypeName: "regulatedauthorization_case" }], IsArray: true },
    ],
};

export const relatedperson_communication: TypeModel = {
    TypeName: "relatedperson_communication",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "language", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "preferred", Type: [{ TypeName: "boolean" }] },
    ],
};

export const requestorchestration_action: TypeModel = {
    TypeName: "requestorchestration_action",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "linkId", Type: [{ TypeName: "string" }] },
        { ElementName: "prefix", Type: [{ TypeName: "string" }] },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "textEquivalent", Type: [{ TypeName: "markdown" }] },
        { ElementName: "priority", Type: [{ TypeName: "code" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "documentation", Type: [{ TypeName: "RelatedArtifact" }], IsArray: true },
        { ElementName: "goal", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Goal"] }], IsArray: true },
        { ElementName: "condition", Type: [{ TypeName: "requestorchestration_action_condition" }], IsArray: true },
        { ElementName: "input", Type: [{ TypeName: "requestorchestration_action_input" }], IsArray: true },
        { ElementName: "output", Type: [{ TypeName: "requestorchestration_action_output" }], IsArray: true },
        { ElementName: "relatedAction", Type: [{ TypeName: "requestorchestration_action_relatedAction" }], IsArray: true },
        { ElementName: "timing[x]", Type: [{ TypeName: "Age" }, { TypeName: "Duration" }, { TypeName: "Period" }, { TypeName: "Range" }, { TypeName: "RelativeTime" }, { TypeName: "Timing" }, { TypeName: "dateTime" }] },
        { ElementName: "location", Type: [{ TypeName: "CodeableReference" }] },
        { ElementName: "participant", Type: [{ TypeName: "requestorchestration_action_participant" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "applicabilityBehavior", Type: [{ TypeName: "code" }] },
        { ElementName: "groupingBehavior", Type: [{ TypeName: "code" }] },
        { ElementName: "selectionBehavior", Type: [{ TypeName: "code" }] },
        { ElementName: "requiredBehavior", Type: [{ TypeName: "code" }] },
        { ElementName: "precheckBehavior", Type: [{ TypeName: "code" }] },
        { ElementName: "cardinalityBehavior", Type: [{ TypeName: "code" }] },
        { ElementName: "resource", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
        { ElementName: "definition[x]", Type: [{ TypeName: "canonical" }, { TypeName: "uri" }] },
        { ElementName: "transform", Type: [{ TypeName: "canonical" }] },
        { ElementName: "dynamicValue", Type: [{ TypeName: "requestorchestration_action_dynamicValue" }], IsArray: true },
        { ElementName: "action", Type: [{ TypeName: "requestorchestration_action" }], IsArray: true },
    ],
};

export const requestorchestration_action_condition: TypeModel = {
    TypeName: "requestorchestration_action_condition",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "kind", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "expression", Type: [{ TypeName: "Expression" }] },
    ],
};

export const requestorchestration_action_dynamicValue: TypeModel = {
    TypeName: "requestorchestration_action_dynamicValue",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "path", Type: [{ TypeName: "string" }] },
        { ElementName: "expression", Type: [{ TypeName: "Expression" }] },
    ],
};

export const requestorchestration_action_input: TypeModel = {
    TypeName: "requestorchestration_action_input",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "requirement", Type: [{ TypeName: "DataRequirement" }] },
        { ElementName: "relatedData", Type: [{ TypeName: "id" }] },
    ],
};

export const requestorchestration_action_output: TypeModel = {
    TypeName: "requestorchestration_action_output",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "requirement", Type: [{ TypeName: "DataRequirement" }] },
        { ElementName: "relatedData", Type: [{ TypeName: "string" }] },
    ],
};

export const requestorchestration_action_participant: TypeModel = {
    TypeName: "requestorchestration_action_participant",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "code" }] },
        { ElementName: "typeCanonical", Type: [{ TypeName: "canonical" }] },
        { ElementName: "typeReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/BiologicallyDerivedProduct", "http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Endpoint", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Medication", "http://hl7.org/fhir/StructureDefinition/MedicinalProductDefinition", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson", "http://hl7.org/fhir/StructureDefinition/Specimen", "http://hl7.org/fhir/StructureDefinition/Substance", "http://hl7.org/fhir/StructureDefinition/SubstanceDefinition"] }] },
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "function", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "actor[x]", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/BiologicallyDerivedProduct", "http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Endpoint", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Medication", "http://hl7.org/fhir/StructureDefinition/MedicinalProductDefinition", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson", "http://hl7.org/fhir/StructureDefinition/Specimen", "http://hl7.org/fhir/StructureDefinition/Substance", "http://hl7.org/fhir/StructureDefinition/SubstanceDefinition"] }, { TypeName: "canonical" }] },
    ],
};

export const requestorchestration_action_relatedAction: TypeModel = {
    TypeName: "requestorchestration_action_relatedAction",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "targetId", Type: [{ TypeName: "id" }], Required: true },
        { ElementName: "relationship", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "endRelationship", Type: [{ TypeName: "code" }] },
        { ElementName: "offset[x]", Type: [{ TypeName: "Duration" }, { TypeName: "Range" }] },
    ],
};

export const requirements_actor: TypeModel = {
    TypeName: "requirements_actor",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "reference", Type: [{ TypeName: "canonical" }], Required: true },
        { ElementName: "key", Type: [{ TypeName: "id" }] },
    ],
};

export const requirements_imports: TypeModel = {
    TypeName: "requirements_imports",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "reference", Type: [{ TypeName: "canonical" }], Required: true },
        { ElementName: "key", Type: [{ TypeName: "id" }], IsArray: true },
    ],
};

export const requirements_statement: TypeModel = {
    TypeName: "requirements_statement",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "key", Type: [{ TypeName: "id" }], Required: true },
        { ElementName: "label", Type: [{ TypeName: "string" }] },
        { ElementName: "conformance", Type: [{ TypeName: "code" }], IsArray: true },
        { ElementName: "conditionality", Type: [{ TypeName: "boolean" }] },
        { ElementName: "requirement", Type: [{ TypeName: "markdown" }], Required: true },
        { ElementName: "category", Type: [{ TypeName: "Coding" }], IsArray: true },
        { ElementName: "derivedFrom", Type: [{ TypeName: "requirements_statement_derivedFrom" }] },
        { ElementName: "partOf", Type: [{ TypeName: "requirements_statement_partOf" }] },
        { ElementName: "satisfiedBy", Type: [{ TypeName: "url" }], IsArray: true },
        { ElementName: "reference", Type: [{ TypeName: "url" }], IsArray: true },
        { ElementName: "source", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], IsArray: true },
        { ElementName: "actor", Type: [{ TypeName: "id" }], IsArray: true },
    ],
};

export const requirements_statement_derivedFrom: TypeModel = {
    TypeName: "requirements_statement_derivedFrom",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "reference", Type: [{ TypeName: "canonical" }] },
        { ElementName: "key", Type: [{ TypeName: "id" }], Required: true },
    ],
};

export const requirements_statement_partOf: TypeModel = {
    TypeName: "requirements_statement_partOf",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "reference", Type: [{ TypeName: "canonical" }] },
        { ElementName: "key", Type: [{ TypeName: "id" }], Required: true },
    ],
};

export const researchstudy_associatedParty: TypeModel = {
    TypeName: "researchstudy_associatedParty",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "period", Type: [{ TypeName: "Period" }], IsArray: true },
        { ElementName: "classifier", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "party", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
    ],
};

export const researchstudy_comparisonGroup: TypeModel = {
    TypeName: "researchstudy_comparisonGroup",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "targetNumber", Type: [{ TypeName: "unsignedInt" }] },
        { ElementName: "actualNumber", Type: [{ TypeName: "unsignedInt" }] },
        { ElementName: "eligibility", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }] },
        { ElementName: "observedGroup", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }] },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
    ],
};

export const researchstudy_label: TypeModel = {
    TypeName: "researchstudy_label",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "value", Type: [{ TypeName: "string" }] },
        { ElementName: "language", Type: [{ TypeName: "code" }] },
    ],
};

export const researchstudy_objective: TypeModel = {
    TypeName: "researchstudy_objective",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "outcomeMeasure", Type: [{ TypeName: "researchstudy_objective_outcomeMeasure" }], IsArray: true },
    ],
};

export const researchstudy_objective_outcomeMeasure: TypeModel = {
    TypeName: "researchstudy_objective_outcomeMeasure",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "endpoint", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/EvidenceVariable"] }], Required: true },
        { ElementName: "population", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }] },
        { ElementName: "intervention", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }] },
        { ElementName: "comparator", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }] },
        { ElementName: "summaryMeasure", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "endpointAnalysisPlan", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Evidence"] }] },
        { ElementName: "eventHandling", Type: [{ TypeName: "researchstudy_objective_outcomeMeasure_eventHandling" }], IsArray: true },
    ],
};

export const researchstudy_objective_outcomeMeasure_eventHandling: TypeModel = {
    TypeName: "researchstudy_objective_outcomeMeasure_eventHandling",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "event", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "group", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "handling", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
    ],
};

export const researchstudy_progressStatus: TypeModel = {
    TypeName: "researchstudy_progressStatus",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "state", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "actual", Type: [{ TypeName: "boolean" }] },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
    ],
};

export const researchstudy_recruitment: TypeModel = {
    TypeName: "researchstudy_recruitment",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "targetNumber", Type: [{ TypeName: "unsignedInt" }] },
        { ElementName: "actualNumber", Type: [{ TypeName: "unsignedInt" }] },
        { ElementName: "eligibility", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }] },
        { ElementName: "actualGroup", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }] },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
    ],
};

export const researchstudy_relatesTo: TypeModel = {
    TypeName: "researchstudy_relatesTo",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "target[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }, { TypeName: "canonical" }, { TypeName: "markdown" }, { TypeName: "uri" }], Required: true },
    ],
};

export const researchsubject_subjectMilestone: TypeModel = {
    TypeName: "researchsubject_subjectMilestone",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "milestone", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "reason", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
    ],
};

export const researchsubject_subjectState: TypeModel = {
    TypeName: "researchsubject_subjectState",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "startDate", Type: [{ TypeName: "dateTime" }], Required: true },
        { ElementName: "endDate", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "reason", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const riskassessment_prediction: TypeModel = {
    TypeName: "riskassessment_prediction",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "outcome", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "probability[x]", Type: [{ TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "decimal" }] },
        { ElementName: "qualitativeRisk", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "relativeRisk", Type: [{ TypeName: "decimal" }] },
        { ElementName: "when[x]", Type: [{ TypeName: "Period" }, { TypeName: "Range" }] },
        { ElementName: "rationale", Type: [{ TypeName: "string" }] },
    ],
};

export const searchparameter_component: TypeModel = {
    TypeName: "searchparameter_component",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "definition", Type: [{ TypeName: "canonical" }], Required: true },
        { ElementName: "expression", Type: [{ TypeName: "string" }], Required: true },
    ],
};

export const servicerequest_orderDetail: TypeModel = {
    TypeName: "servicerequest_orderDetail",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "parameterFocus[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/BiologicallyDerivedProduct", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/DeviceRequest", "http://hl7.org/fhir/StructureDefinition/Medication", "http://hl7.org/fhir/StructureDefinition/MedicationRequest", "http://hl7.org/fhir/StructureDefinition/MedicinalProductDefinition", "http://hl7.org/fhir/StructureDefinition/Substance", "http://hl7.org/fhir/StructureDefinition/SubstanceDefinition"] }, { TypeName: "canonical" }] },
        { ElementName: "parameter", Type: [{ TypeName: "servicerequest_orderDetail_parameter" }], IsArray: true, Required: true },
    ],
};

export const servicerequest_orderDetail_parameter: TypeModel = {
    TypeName: "servicerequest_orderDetail_parameter",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "boolean" }, { TypeName: "string" }], Required: true },
    ],
};

export const servicerequest_patientInstruction: TypeModel = {
    TypeName: "servicerequest_patientInstruction",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "instruction[x]", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DocumentReference"] }, { TypeName: "markdown" }] },
    ],
};

export const specimen_collection: TypeModel = {
    TypeName: "specimen_collection",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "collector", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "collected[x]", Type: [{ TypeName: "Period" }, { TypeName: "dateTime" }] },
        { ElementName: "duration", Type: [{ TypeName: "Duration" }] },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "method", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "device[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }, { TypeName: "canonical" }] },
        { ElementName: "procedure", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Procedure"] }] },
        { ElementName: "bodySite", Type: [{ TypeName: "CodeableReference" }] },
        { ElementName: "fastingStatus[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Duration" }] },
    ],
};

export const specimen_container: TypeModel = {
    TypeName: "specimen_container",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "device[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }, { TypeName: "canonical" }], Required: true },
        { ElementName: "specimenQuantity", Type: [{ TypeName: "Quantity" }] },
    ],
};

export const specimen_feature: TypeModel = {
    TypeName: "specimen_feature",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "description", Type: [{ TypeName: "string" }], Required: true },
    ],
};

export const specimen_processing: TypeModel = {
    TypeName: "specimen_processing",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "method", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "performer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "device[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }, { TypeName: "canonical" }] },
        { ElementName: "additive", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "time[x]", Type: [{ TypeName: "Duration" }, { TypeName: "Period" }, { TypeName: "dateTime" }] },
    ],
};

export const specimendefinition_typeTested: TypeModel = {
    TypeName: "specimendefinition_typeTested",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "isDerived", Type: [{ TypeName: "boolean" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "preference", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "container", Type: [{ TypeName: "specimendefinition_typeTested_container" }] },
        { ElementName: "requirement", Type: [{ TypeName: "markdown" }] },
        { ElementName: "retentionTime", Type: [{ TypeName: "Duration" }] },
        { ElementName: "singleUse", Type: [{ TypeName: "boolean" }] },
        { ElementName: "rejectionCriterion", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "handling", Type: [{ TypeName: "specimendefinition_typeTested_handling" }], IsArray: true },
        { ElementName: "testingDestination", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
    ],
};

export const specimendefinition_typeTested_container: TypeModel = {
    TypeName: "specimendefinition_typeTested_container",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "material", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "cap", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "capacity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "minimumVolume[x]", Type: [{ TypeName: "Quantity" }, { TypeName: "string" }] },
        { ElementName: "additive", Type: [{ TypeName: "specimendefinition_typeTested_container_additive" }], IsArray: true },
        { ElementName: "preparation", Type: [{ TypeName: "markdown" }] },
    ],
};

export const specimendefinition_typeTested_container_additive: TypeModel = {
    TypeName: "specimendefinition_typeTested_container_additive",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "additive[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/SubstanceDefinition"] }], Required: true },
    ],
};

export const specimendefinition_typeTested_handling: TypeModel = {
    TypeName: "specimendefinition_typeTested_handling",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "temperatureQualifier", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "temperatureRange", Type: [{ TypeName: "Range" }] },
        { ElementName: "maxDuration", Type: [{ TypeName: "Duration" }] },
        { ElementName: "instruction", Type: [{ TypeName: "markdown" }] },
    ],
};

export const structuredefinition_context: TypeModel = {
    TypeName: "structuredefinition_context",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "expression", Type: [{ TypeName: "string" }], Required: true },
    ],
};

export const structuredefinition_differential: TypeModel = {
    TypeName: "structuredefinition_differential",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "element", Type: [{ TypeName: "ElementDefinition" }], IsArray: true, Required: true },
    ],
};

export const structuredefinition_mapping: TypeModel = {
    TypeName: "structuredefinition_mapping",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "element", Type: [{ TypeName: "ElementDefinition" }], IsArray: true, Required: true },
    ],
};

export const structuremap_const: TypeModel = {
    TypeName: "structuremap_const",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "name", Type: [{ TypeName: "id" }] },
        { ElementName: "value", Type: [{ TypeName: "string" }] },
    ],
};

export const structuremap_group: TypeModel = {
    TypeName: "structuremap_group",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "name", Type: [{ TypeName: "id" }], Required: true },
        { ElementName: "extends", Type: [{ TypeName: "id" }] },
        { ElementName: "typeMode", Type: [{ TypeName: "code" }] },
        { ElementName: "documentation", Type: [{ TypeName: "string" }] },
        { ElementName: "input", Type: [{ TypeName: "structuremap_group_input" }], IsArray: true, Required: true },
        { ElementName: "rule", Type: [{ TypeName: "structuremap_group_rule" }], IsArray: true },
    ],
};

export const structuremap_group_input: TypeModel = {
    TypeName: "structuremap_group_input",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "name", Type: [{ TypeName: "id" }] },
        { ElementName: "source", Type: [{ TypeName: "structuremap_group_rule_source" }], IsArray: true, Required: true },
        { ElementName: "target", Type: [{ TypeName: "structuremap_group_rule_target" }], IsArray: true },
        { ElementName: "rule", Type: [{ TypeName: "structuremap_group_rule" }], IsArray: true },
        { ElementName: "dependent", Type: [{ TypeName: "structuremap_group_rule_dependent" }], IsArray: true },
        { ElementName: "documentation", Type: [{ TypeName: "string" }] },
    ],
};

export const structuremap_group_rule_dependent: TypeModel = {
    TypeName: "structuremap_group_rule_dependent",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "name", Type: [{ TypeName: "id" }], Required: true },
        { ElementName: "parameter", Type: [{ TypeName: "structuremap_group_rule_target_parameter" }], IsArray: true, Required: true },
    ],
};

export const structuremap_group_rule_source: TypeModel = {
    TypeName: "structuremap_group_rule_source",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "context", Type: [{ TypeName: "id" }], Required: true },
        { ElementName: "min", Type: [{ TypeName: "unsignedInt" }] },
        { ElementName: "max", Type: [{ TypeName: "string" }] },
        { ElementName: "type", Type: [{ TypeName: "string" }] },
        { ElementName: "defaultValue", Type: [{ TypeName: "string" }] },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "context", Type: [{ TypeName: "string" }] },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "value[x]", Type: [{ TypeName: "boolean" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "id" }, { TypeName: "integer" }, { TypeName: "string" }, { TypeName: "time" }], Required: true },
    ],
};

export const structuremap_structure: TypeModel = {
    TypeName: "structuremap_structure",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "url", Type: [{ TypeName: "canonical" }], Required: true },
        { ElementName: "mode", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "alias", Type: [{ TypeName: "string" }] },
        { ElementName: "documentation", Type: [{ TypeName: "string" }] },
    ],
};

export const subscription_filterBy: TypeModel = {
    TypeName: "subscription_filterBy",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "resource", Type: [{ TypeName: "uri" }] },
        { ElementName: "filterParameter", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "comparator", Type: [{ TypeName: "code" }] },
        { ElementName: "modifier", Type: [{ TypeName: "code" }] },
        { ElementName: "value", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "event", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
    ],
};

export const subscription_parameter: TypeModel = {
    TypeName: "subscription_parameter",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "name", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "value", Type: [{ TypeName: "string" }], Required: true },
    ],
};

export const subscriptionstatus_notificationEvent: TypeModel = {
    TypeName: "subscriptionstatus_notificationEvent",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "eventNumber", Type: [{ TypeName: "integer64" }], Required: true },
        { ElementName: "triggerEvent", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "timestamp", Type: [{ TypeName: "instant" }] },
        { ElementName: "focus", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
        { ElementName: "additionalContext", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "relatedQuery", Type: [{ TypeName: "subscriptionstatus_notificationEvent_relatedQuery" }], IsArray: true },
        { ElementName: "authorizationHint", Type: [{ TypeName: "subscriptionstatus_notificationEvent_authorizationHint" }], IsArray: true },
    ],
};

export const subscriptionstatus_notificationEvent_authorizationHint: TypeModel = {
    TypeName: "subscriptionstatus_notificationEvent_authorizationHint",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "authorizationType", Type: [{ TypeName: "Coding" }], Required: true },
        { ElementName: "value", Type: [{ TypeName: "string" }] },
    ],
};

export const subscriptionstatus_notificationEvent_relatedQuery: TypeModel = {
    TypeName: "subscriptionstatus_notificationEvent_relatedQuery",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "queryType", Type: [{ TypeName: "Coding" }] },
        { ElementName: "query", Type: [{ TypeName: "string" }], Required: true },
    ],
};

export const subscriptiontopic_trigger: TypeModel = {
    TypeName: "subscriptiontopic_trigger",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "resource", Type: [{ TypeName: "uri" }], Required: true },
        { ElementName: "supportedInteraction", Type: [{ TypeName: "code" }], IsArray: true },
        { ElementName: "queryCriteria", Type: [{ TypeName: "subscriptiontopic_trigger_queryCriteria" }] },
        { ElementName: "fhirPathCriteria", Type: [{ TypeName: "string" }] },
        { ElementName: "event", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "canFilterBy", Type: [{ TypeName: "subscriptiontopic_trigger_canFilterBy" }], IsArray: true },
        { ElementName: "notificationShape", Type: [{ TypeName: "subscriptiontopic_trigger_notificationShape" }], IsArray: true },
    ],
};

export const subscriptiontopic_trigger_canFilterBy: TypeModel = {
    TypeName: "subscriptiontopic_trigger_canFilterBy",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "resource", Type: [{ TypeName: "uri" }] },
        { ElementName: "filterParameter", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "filterDefinition", Type: [{ TypeName: "uri" }] },
        { ElementName: "comparator", Type: [{ TypeName: "code" }], IsArray: true },
        { ElementName: "modifier", Type: [{ TypeName: "code" }], IsArray: true },
    ],
};

export const subscriptiontopic_trigger_notificationShape: TypeModel = {
    TypeName: "subscriptiontopic_trigger_notificationShape",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "resource", Type: [{ TypeName: "uri" }], Required: true },
        { ElementName: "include", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "revInclude", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "relatedQuery", Type: [{ TypeName: "subscriptiontopic_trigger_notificationShape_relatedQuery" }], IsArray: true },
    ],
};

export const subscriptiontopic_trigger_notificationShape_relatedQuery: TypeModel = {
    TypeName: "subscriptiontopic_trigger_notificationShape_relatedQuery",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "queryType", Type: [{ TypeName: "Coding" }] },
        { ElementName: "query", Type: [{ TypeName: "string" }], Required: true },
    ],
};

export const subscriptiontopic_trigger_queryCriteria: TypeModel = {
    TypeName: "subscriptiontopic_trigger_queryCriteria",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "previous", Type: [{ TypeName: "string" }] },
        { ElementName: "resultForCreate", Type: [{ TypeName: "code" }] },
        { ElementName: "current", Type: [{ TypeName: "string" }] },
        { ElementName: "resultForDelete", Type: [{ TypeName: "code" }] },
        { ElementName: "requireBoth", Type: [{ TypeName: "boolean" }] },
    ],
};

export const substancedefinition_characterization: TypeModel = {
    TypeName: "substancedefinition_characterization",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "technique", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "form", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "file", Type: [{ TypeName: "Attachment" }], IsArray: true },
    ],
};

export const substancedefinition_code: TypeModel = {
    TypeName: "substancedefinition_code",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "status", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "statusDate", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "source", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DocumentReference"] }], IsArray: true },
    ],
};

export const substancedefinition_moiety: TypeModel = {
    TypeName: "substancedefinition_moiety",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "stereochemistry", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "opticalActivity", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "molecularFormula", Type: [{ TypeName: "string" }] },
        { ElementName: "amount[x]", Type: [{ TypeName: "Quantity" }, { TypeName: "string" }] },
        { ElementName: "measurementType", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const substancedefinition_molecularWeight: TypeModel = {
    TypeName: "substancedefinition_molecularWeight",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "method", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "amount", Type: [{ TypeName: "Quantity" }], Required: true },
    ],
};

export const substancedefinition_name: TypeModel = {
    TypeName: "substancedefinition_name",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "name", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "status", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "preferred", Type: [{ TypeName: "boolean" }] },
        { ElementName: "language", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "domain", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "jurisdiction", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "synonym", Type: [{ TypeName: "substancedefinition_name" }], IsArray: true },
        { ElementName: "translation", Type: [{ TypeName: "substancedefinition_name" }], IsArray: true },
        { ElementName: "official", Type: [{ TypeName: "substancedefinition_name_official" }], IsArray: true },
        { ElementName: "source", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DocumentReference"] }], IsArray: true },
    ],
};

export const substancedefinition_name_official: TypeModel = {
    TypeName: "substancedefinition_name_official",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "authority", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "status", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
    ],
};

export const substancedefinition_property: TypeModel = {
    TypeName: "substancedefinition_property",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "CodeableConcept" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "boolean" }, { TypeName: "date" }] },
    ],
};

export const substancedefinition_relationship: TypeModel = {
    TypeName: "substancedefinition_relationship",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "substanceDefinition[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/SubstanceDefinition"] }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "isDefining", Type: [{ TypeName: "boolean" }] },
        { ElementName: "amount[x]", Type: [{ TypeName: "Quantity" }, { TypeName: "Ratio" }, { TypeName: "string" }] },
        { ElementName: "ratioHighLimitAmount", Type: [{ TypeName: "Ratio" }] },
        { ElementName: "comparator", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "source", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DocumentReference"] }], IsArray: true },
    ],
};

export const substancedefinition_sourceMaterial: TypeModel = {
    TypeName: "substancedefinition_sourceMaterial",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "genus", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "species", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "part", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "countryOfOrigin", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
    ],
};

export const substancedefinition_structure: TypeModel = {
    TypeName: "substancedefinition_structure",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "stereochemistry", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "opticalActivity", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "molecularFormula", Type: [{ TypeName: "string" }] },
        { ElementName: "molecularFormulaByMoiety", Type: [{ TypeName: "string" }] },
        { ElementName: "molecularWeight", Type: [{ TypeName: "substancedefinition_molecularWeight" }] },
        { ElementName: "technique", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "sourceDocument", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DocumentReference"] }], IsArray: true },
        { ElementName: "representation", Type: [{ TypeName: "substancedefinition_structure_representation" }], IsArray: true },
    ],
};

export const substancedefinition_structure_representation: TypeModel = {
    TypeName: "substancedefinition_structure_representation",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "representation", Type: [{ TypeName: "string" }] },
        { ElementName: "format", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "document", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DocumentReference"] }] },
    ],
};

export const task_focus: TypeModel = {
    TypeName: "task_focus",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "value[x]", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }, { TypeName: "canonical" }], Required: true },
    ],
};

export const task_input: TypeModel = {
    TypeName: "task_input",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "Address" }, { TypeName: "Age" }, { TypeName: "Annotation" }, { TypeName: "Attachment" }, { TypeName: "Availability" }, { TypeName: "CodeableConcept" }, { TypeName: "CodeableReference" }, { TypeName: "Coding" }, { TypeName: "ContactDetail" }, { TypeName: "ContactPoint" }, { TypeName: "Count" }, { TypeName: "DataRequirement" }, { TypeName: "Distance" }, { TypeName: "Dosage" }, { TypeName: "Duration" }, { TypeName: "Expression" }, { TypeName: "ExtendedContactDetail" }, { TypeName: "HumanName" }, { TypeName: "Identifier" }, { TypeName: "Meta" }, { TypeName: "Money" }, { TypeName: "ParameterDefinition" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "RatioRange" }, { TypeName: "Reference" }, { TypeName: "RelatedArtifact" }, { TypeName: "SampledData" }, { TypeName: "Signature" }, { TypeName: "Timing" }, { TypeName: "TriggerDefinition" }, { TypeName: "UsageContext" }, { TypeName: "VirtualServiceDetail" }, { TypeName: "base64Binary" }, { TypeName: "boolean" }, { TypeName: "canonical" }, { TypeName: "code" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "id" }, { TypeName: "instant" }, { TypeName: "integer" }, { TypeName: "integer64" }, { TypeName: "markdown" }, { TypeName: "oid" }, { TypeName: "positiveInt" }, { TypeName: "string" }, { TypeName: "time" }, { TypeName: "unsignedInt" }, { TypeName: "uri" }, { TypeName: "url" }, { TypeName: "uuid" }], Required: true },
    ],
};

export const task_output: TypeModel = {
    TypeName: "task_output",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "Address" }, { TypeName: "Age" }, { TypeName: "Annotation" }, { TypeName: "Attachment" }, { TypeName: "Availability" }, { TypeName: "CodeableConcept" }, { TypeName: "CodeableReference" }, { TypeName: "Coding" }, { TypeName: "ContactDetail" }, { TypeName: "ContactPoint" }, { TypeName: "Count" }, { TypeName: "DataRequirement" }, { TypeName: "Distance" }, { TypeName: "Dosage" }, { TypeName: "Duration" }, { TypeName: "Expression" }, { TypeName: "ExtendedContactDetail" }, { TypeName: "HumanName" }, { TypeName: "Identifier" }, { TypeName: "Meta" }, { TypeName: "Money" }, { TypeName: "ParameterDefinition" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "RatioRange" }, { TypeName: "Reference" }, { TypeName: "RelatedArtifact" }, { TypeName: "SampledData" }, { TypeName: "Signature" }, { TypeName: "Timing" }, { TypeName: "TriggerDefinition" }, { TypeName: "UsageContext" }, { TypeName: "VirtualServiceDetail" }, { TypeName: "base64Binary" }, { TypeName: "boolean" }, { TypeName: "canonical" }, { TypeName: "code" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "id" }, { TypeName: "instant" }, { TypeName: "integer" }, { TypeName: "integer64" }, { TypeName: "markdown" }, { TypeName: "oid" }, { TypeName: "positiveInt" }, { TypeName: "string" }, { TypeName: "time" }, { TypeName: "unsignedInt" }, { TypeName: "uri" }, { TypeName: "url" }, { TypeName: "uuid" }], Required: true },
    ],
};

export const task_performer: TypeModel = {
    TypeName: "task_performer",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "function", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "actor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
    ],
};

export const task_restriction: TypeModel = {
    TypeName: "task_restriction",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "repetitions", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "recipient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], IsArray: true },
    ],
};

export const terminologycapabilities_codeSystem: TypeModel = {
    TypeName: "terminologycapabilities_codeSystem",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "uri", Type: [{ TypeName: "canonical" }] },
        { ElementName: "supplement", Type: [{ TypeName: "canonical" }], IsArray: true },
        { ElementName: "version", Type: [{ TypeName: "terminologycapabilities_codeSystem_version" }], IsArray: true },
        { ElementName: "content", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "subsumption", Type: [{ TypeName: "boolean" }] },
    ],
};

export const terminologycapabilities_codeSystem_version: TypeModel = {
    TypeName: "terminologycapabilities_codeSystem_version",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "string" }] },
        { ElementName: "isDefault", Type: [{ TypeName: "boolean" }] },
        { ElementName: "supplement", Type: [{ TypeName: "canonical" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "op", Type: [{ TypeName: "code" }], IsArray: true, Required: true },
    ],
};

export const terminologycapabilities_expansion: TypeModel = {
    TypeName: "terminologycapabilities_expansion",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "name", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "documentation", Type: [{ TypeName: "markdown" }] },
    ],
};

export const terminologycapabilities_implementation: TypeModel = {
    TypeName: "terminologycapabilities_implementation",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }], Required: true },
        { ElementName: "url", Type: [{ TypeName: "url" }] },
    ],
};

export const terminologycapabilities_software: TypeModel = {
    TypeName: "terminologycapabilities_software",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "name", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
    ],
};

export const terminologycapabilities_supplements: TypeModel = {
    TypeName: "terminologycapabilities_supplements",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "globals", Type: [{ TypeName: "code" }] },
    ],
};

export const terminologycapabilities_translation: TypeModel = {
    TypeName: "terminologycapabilities_translation",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "needsMap", Type: [{ TypeName: "boolean" }], Required: true },
    ],
};

export const terminologycapabilities_validateCode: TypeModel = {
    TypeName: "terminologycapabilities_validateCode",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "translations", Type: [{ TypeName: "boolean" }], Required: true },
    ],
};

export const timing_repeat: TypeModel = {
    TypeName: "timing_repeat",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "bounds[x]", Type: [{ TypeName: "Duration" }, { TypeName: "Period" }, { TypeName: "Range" }] },
        { ElementName: "count", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "countMax", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "duration", Type: [{ TypeName: "decimal" }] },
        { ElementName: "durationMax", Type: [{ TypeName: "decimal" }] },
        { ElementName: "durationUnit", Type: [{ TypeName: "code" }] },
        { ElementName: "frequency", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "frequencyMax", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "period", Type: [{ TypeName: "decimal" }] },
        { ElementName: "periodMax", Type: [{ TypeName: "decimal" }] },
        { ElementName: "periodUnit", Type: [{ TypeName: "code" }] },
        { ElementName: "startOffset", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "endOffset", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "dayOfWeek", Type: [{ TypeName: "code" }], IsArray: true },
        { ElementName: "timeOfDay", Type: [{ TypeName: "time" }], IsArray: true },
        { ElementName: "when", Type: [{ TypeName: "code" }], IsArray: true },
        { ElementName: "offset", Type: [{ TypeName: "unsignedInt" }] },
    ],
};

export const valueset_compose: TypeModel = {
    TypeName: "valueset_compose",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "lockedDate", Type: [{ TypeName: "date" }] },
        { ElementName: "inactive", Type: [{ TypeName: "boolean" }] },
        { ElementName: "include", Type: [{ TypeName: "valueset_compose_include" }], IsArray: true, Required: true },
        { ElementName: "exclude", Type: [{ TypeName: "valueset_compose_include" }], IsArray: true },
        { ElementName: "property", Type: [{ TypeName: "string" }], IsArray: true },
    ],
};

export const valueset_compose_include: TypeModel = {
    TypeName: "valueset_compose_include",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "system", Type: [{ TypeName: "uri" }] },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "concept", Type: [{ TypeName: "valueset_compose_include_concept" }], IsArray: true },
        { ElementName: "filter", Type: [{ TypeName: "valueset_compose_include_filter" }], IsArray: true },
        { ElementName: "valueSet", Type: [{ TypeName: "canonical" }], IsArray: true },
        { ElementName: "copyright", Type: [{ TypeName: "markdown" }] },
    ],
};

export const valueset_compose_include_concept: TypeModel = {
    TypeName: "valueset_compose_include_concept",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "display", Type: [{ TypeName: "string" }] },
        { ElementName: "designation", Type: [{ TypeName: "valueset_compose_include_concept_designation" }], IsArray: true },
    ],
};

export const valueset_compose_include_concept_designation: TypeModel = {
    TypeName: "valueset_compose_include_concept_designation",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "language", Type: [{ TypeName: "code" }] },
        { ElementName: "use", Type: [{ TypeName: "Coding" }] },
        { ElementName: "additionalUse", Type: [{ TypeName: "Coding" }], IsArray: true },
        { ElementName: "value", Type: [{ TypeName: "string" }], Required: true },
    ],
};

export const valueset_compose_include_filter: TypeModel = {
    TypeName: "valueset_compose_include_filter",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "property", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "op", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "value", Type: [{ TypeName: "string" }], Required: true },
    ],
};

export const valueset_expansion: TypeModel = {
    TypeName: "valueset_expansion",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "identifier", Type: [{ TypeName: "uri" }] },
        { ElementName: "next", Type: [{ TypeName: "uri" }] },
        { ElementName: "timestamp", Type: [{ TypeName: "dateTime" }], Required: true },
        { ElementName: "total", Type: [{ TypeName: "integer" }] },
        { ElementName: "offset", Type: [{ TypeName: "integer" }] },
        { ElementName: "parameter", Type: [{ TypeName: "valueset_expansion_parameter" }], IsArray: true },
        { ElementName: "property", Type: [{ TypeName: "valueset_expansion_property" }], IsArray: true },
        { ElementName: "contains", Type: [{ TypeName: "valueset_expansion_contains" }], IsArray: true },
    ],
};

export const valueset_expansion_contains: TypeModel = {
    TypeName: "valueset_expansion_contains",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "system", Type: [{ TypeName: "uri" }] },
        { ElementName: "abstract", Type: [{ TypeName: "boolean" }] },
        { ElementName: "inactive", Type: [{ TypeName: "boolean" }] },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "code", Type: [{ TypeName: "code" }] },
        { ElementName: "display", Type: [{ TypeName: "string" }] },
        { ElementName: "designation", Type: [{ TypeName: "valueset_compose_include_concept_designation" }], IsArray: true },
        { ElementName: "property", Type: [{ TypeName: "valueset_expansion_contains_property" }], IsArray: true },
        { ElementName: "contains", Type: [{ TypeName: "valueset_expansion_contains" }], IsArray: true },
    ],
};

export const valueset_expansion_contains_property: TypeModel = {
    TypeName: "valueset_expansion_contains_property",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "Coding" }, { TypeName: "boolean" }, { TypeName: "code" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "integer" }, { TypeName: "string" }], Required: true },
        { ElementName: "subProperty", Type: [{ TypeName: "valueset_expansion_contains_property_subProperty" }], IsArray: true },
    ],
};

export const valueset_expansion_contains_property_subProperty: TypeModel = {
    TypeName: "valueset_expansion_contains_property_subProperty",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "Coding" }, { TypeName: "boolean" }, { TypeName: "code" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "integer" }, { TypeName: "string" }], Required: true },
    ],
};

export const valueset_expansion_parameter: TypeModel = {
    TypeName: "valueset_expansion_parameter",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "name", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "boolean" }, { TypeName: "code" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "integer" }, { TypeName: "string" }, { TypeName: "uri" }] },
    ],
};

export const valueset_expansion_property: TypeModel = {
    TypeName: "valueset_expansion_property",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "uri", Type: [{ TypeName: "uri" }] },
    ],
};

export const visionprescription_lensSpecification: TypeModel = {
    TypeName: "visionprescription_lensSpecification",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "amount", Type: [{ TypeName: "decimal" }], Required: true },
        { ElementName: "base", Type: [{ TypeName: "code" }], Required: true },
    ],
};

export const byUrl: Readonly<Record<string, TypeModel>> = Object.freeze({
    "http://fhir.forms-lab.com/custom-model/r6/account_balance": account_balance,
    "http://fhir.forms-lab.com/custom-model/r6/account_coverage": account_coverage,
    "http://fhir.forms-lab.com/custom-model/r6/account_diagnosis": account_diagnosis,
    "http://fhir.forms-lab.com/custom-model/r6/account_guarantor": account_guarantor,
    "http://fhir.forms-lab.com/custom-model/r6/account_procedure": account_procedure,
    "http://fhir.forms-lab.com/custom-model/r6/activitydefinition_dynamicValue": activitydefinition_dynamicValue,
    "http://fhir.forms-lab.com/custom-model/r6/activitydefinition_participant": activitydefinition_participant,
    "http://fhir.forms-lab.com/custom-model/r6/administrableproductdefinition_property": administrableproductdefinition_property,
    "http://fhir.forms-lab.com/custom-model/r6/administrableproductdefinition_routeOfAdministration": administrableproductdefinition_routeOfAdministration,
    "http://fhir.forms-lab.com/custom-model/r6/administrableproductdefinition_routeOfAdministration_targetSpecies": administrableproductdefinition_routeOfAdministration_targetSpecies,
    "http://fhir.forms-lab.com/custom-model/r6/administrableproductdefinition_routeOfAdministration_targetSpecies_withdrawalPeriod": administrableproductdefinition_routeOfAdministration_targetSpecies_withdrawalPeriod,
    "http://fhir.forms-lab.com/custom-model/r6/adverseevent_participant": adverseevent_participant,
    "http://fhir.forms-lab.com/custom-model/r6/adverseevent_suspectEntity": adverseevent_suspectEntity,
    "http://fhir.forms-lab.com/custom-model/r6/adverseevent_suspectEntity_causality": adverseevent_suspectEntity_causality,
    "http://fhir.forms-lab.com/custom-model/r6/allergyintolerance_reaction": allergyintolerance_reaction,
    "http://fhir.forms-lab.com/custom-model/r6/appointment_participant": appointment_participant,
    "http://fhir.forms-lab.com/custom-model/r6/appointment_recurrenceTemplate": appointment_recurrenceTemplate,
    "http://fhir.forms-lab.com/custom-model/r6/appointment_recurrenceTemplate_monthlyTemplate": appointment_recurrenceTemplate_monthlyTemplate,
    "http://fhir.forms-lab.com/custom-model/r6/appointment_recurrenceTemplate_weeklyTemplate": appointment_recurrenceTemplate_weeklyTemplate,
    "http://fhir.forms-lab.com/custom-model/r6/appointment_recurrenceTemplate_yearlyTemplate": appointment_recurrenceTemplate_yearlyTemplate,
    "http://fhir.forms-lab.com/custom-model/r6/artifactassessment_content": artifactassessment_content,
    "http://fhir.forms-lab.com/custom-model/r6/artifactassessment_relatesTo": artifactassessment_relatesTo,
    "http://fhir.forms-lab.com/custom-model/r6/auditevent_agent": auditevent_agent,
    "http://fhir.forms-lab.com/custom-model/r6/auditevent_entity": auditevent_entity,
    "http://fhir.forms-lab.com/custom-model/r6/auditevent_entity_detail": auditevent_entity_detail,
    "http://fhir.forms-lab.com/custom-model/r6/auditevent_outcome": auditevent_outcome,
    "http://fhir.forms-lab.com/custom-model/r6/auditevent_source": auditevent_source,
    "http://fhir.forms-lab.com/custom-model/r6/availability_availableTime": availability_availableTime,
    "http://fhir.forms-lab.com/custom-model/r6/availability_notAvailableTime": availability_notAvailableTime,
    "http://fhir.forms-lab.com/custom-model/r6/biologicallyderivedproduct_collection": biologicallyderivedproduct_collection,
    "http://fhir.forms-lab.com/custom-model/r6/biologicallyderivedproduct_property": biologicallyderivedproduct_property,
    "http://fhir.forms-lab.com/custom-model/r6/bodystructure_includedStructure": bodystructure_includedStructure,
    "http://fhir.forms-lab.com/custom-model/r6/bodystructure_includedStructure_bodyLandmarkOrientation": bodystructure_includedStructure_bodyLandmarkOrientation,
    "http://fhir.forms-lab.com/custom-model/r6/bodystructure_includedStructure_bodyLandmarkOrientation_distanceFromLandmark": bodystructure_includedStructure_bodyLandmarkOrientation_distanceFromLandmark,
    "http://fhir.forms-lab.com/custom-model/r6/bundle_entry": bundle_entry,
    "http://fhir.forms-lab.com/custom-model/r6/bundle_entry_request": bundle_entry_request,
    "http://fhir.forms-lab.com/custom-model/r6/bundle_entry_response": bundle_entry_response,
    "http://fhir.forms-lab.com/custom-model/r6/bundle_entry_search": bundle_entry_search,
    "http://fhir.forms-lab.com/custom-model/r6/bundle_link": bundle_link,
    "http://fhir.forms-lab.com/custom-model/r6/capabilitystatement_document": capabilitystatement_document,
    "http://fhir.forms-lab.com/custom-model/r6/capabilitystatement_implementation": capabilitystatement_implementation,
    "http://fhir.forms-lab.com/custom-model/r6/capabilitystatement_messaging": capabilitystatement_messaging,
    "http://fhir.forms-lab.com/custom-model/r6/capabilitystatement_messaging_endpoint": capabilitystatement_messaging_endpoint,
    "http://fhir.forms-lab.com/custom-model/r6/capabilitystatement_messaging_supportedMessage": capabilitystatement_messaging_supportedMessage,
    "http://fhir.forms-lab.com/custom-model/r6/capabilitystatement_rest": capabilitystatement_rest,
    "http://fhir.forms-lab.com/custom-model/r6/capabilitystatement_rest_interaction": capabilitystatement_rest_interaction,
    "http://fhir.forms-lab.com/custom-model/r6/capabilitystatement_rest_resource": capabilitystatement_rest_resource,
    "http://fhir.forms-lab.com/custom-model/r6/capabilitystatement_rest_resource_interaction": capabilitystatement_rest_resource_interaction,
    "http://fhir.forms-lab.com/custom-model/r6/capabilitystatement_rest_resource_operation": capabilitystatement_rest_resource_operation,
    "http://fhir.forms-lab.com/custom-model/r6/capabilitystatement_rest_resource_searchParam": capabilitystatement_rest_resource_searchParam,
    "http://fhir.forms-lab.com/custom-model/r6/capabilitystatement_rest_security": capabilitystatement_rest_security,
    "http://fhir.forms-lab.com/custom-model/r6/capabilitystatement_software": capabilitystatement_software,
    "http://fhir.forms-lab.com/custom-model/r6/careplan_activity": careplan_activity,
    "http://fhir.forms-lab.com/custom-model/r6/careteam_participant": careteam_participant,
    "http://fhir.forms-lab.com/custom-model/r6/claim_accident": claim_accident,
    "http://fhir.forms-lab.com/custom-model/r6/claim_careTeam": claim_careTeam,
    "http://fhir.forms-lab.com/custom-model/r6/claim_diagnosis": claim_diagnosis,
    "http://fhir.forms-lab.com/custom-model/r6/claim_event": claim_event,
    "http://fhir.forms-lab.com/custom-model/r6/claim_insurance": claim_insurance,
    "http://fhir.forms-lab.com/custom-model/r6/claim_item": claim_item,
    "http://fhir.forms-lab.com/custom-model/r6/claim_item_bodySite": claim_item_bodySite,
    "http://fhir.forms-lab.com/custom-model/r6/claim_item_detail": claim_item_detail,
    "http://fhir.forms-lab.com/custom-model/r6/claim_item_detail_subDetail": claim_item_detail_subDetail,
    "http://fhir.forms-lab.com/custom-model/r6/claim_payee": claim_payee,
    "http://fhir.forms-lab.com/custom-model/r6/claim_procedure": claim_procedure,
    "http://fhir.forms-lab.com/custom-model/r6/claim_related": claim_related,
    "http://fhir.forms-lab.com/custom-model/r6/claim_supportingInfo": claim_supportingInfo,
    "http://fhir.forms-lab.com/custom-model/r6/claimresponse_addItem": claimresponse_addItem,
    "http://fhir.forms-lab.com/custom-model/r6/claimresponse_addItem_bodySite": claimresponse_addItem_bodySite,
    "http://fhir.forms-lab.com/custom-model/r6/claimresponse_addItem_detail": claimresponse_addItem_detail,
    "http://fhir.forms-lab.com/custom-model/r6/claimresponse_addItem_detail_subDetail": claimresponse_addItem_detail_subDetail,
    "http://fhir.forms-lab.com/custom-model/r6/claimresponse_error": claimresponse_error,
    "http://fhir.forms-lab.com/custom-model/r6/claimresponse_event": claimresponse_event,
    "http://fhir.forms-lab.com/custom-model/r6/claimresponse_insurance": claimresponse_insurance,
    "http://fhir.forms-lab.com/custom-model/r6/claimresponse_item": claimresponse_item,
    "http://fhir.forms-lab.com/custom-model/r6/claimresponse_item_adjudication": claimresponse_item_adjudication,
    "http://fhir.forms-lab.com/custom-model/r6/claimresponse_item_detail": claimresponse_item_detail,
    "http://fhir.forms-lab.com/custom-model/r6/claimresponse_item_detail_subDetail": claimresponse_item_detail_subDetail,
    "http://fhir.forms-lab.com/custom-model/r6/claimresponse_item_reviewOutcome": claimresponse_item_reviewOutcome,
    "http://fhir.forms-lab.com/custom-model/r6/claimresponse_payment": claimresponse_payment,
    "http://fhir.forms-lab.com/custom-model/r6/claimresponse_processNote": claimresponse_processNote,
    "http://fhir.forms-lab.com/custom-model/r6/claimresponse_supportingInfo": claimresponse_supportingInfo,
    "http://fhir.forms-lab.com/custom-model/r6/claimresponse_total": claimresponse_total,
    "http://fhir.forms-lab.com/custom-model/r6/clinicalusedefinition_contraindication": clinicalusedefinition_contraindication,
    "http://fhir.forms-lab.com/custom-model/r6/clinicalusedefinition_indication": clinicalusedefinition_indication,
    "http://fhir.forms-lab.com/custom-model/r6/clinicalusedefinition_indication_otherTherapy": clinicalusedefinition_indication_otherTherapy,
    "http://fhir.forms-lab.com/custom-model/r6/clinicalusedefinition_interaction": clinicalusedefinition_interaction,
    "http://fhir.forms-lab.com/custom-model/r6/clinicalusedefinition_interaction_interactant": clinicalusedefinition_interaction_interactant,
    "http://fhir.forms-lab.com/custom-model/r6/clinicalusedefinition_undesirableEffect": clinicalusedefinition_undesirableEffect,
    "http://fhir.forms-lab.com/custom-model/r6/clinicalusedefinition_warning": clinicalusedefinition_warning,
    "http://fhir.forms-lab.com/custom-model/r6/codesystem_concept": codesystem_concept,
    "http://fhir.forms-lab.com/custom-model/r6/codesystem_concept_designation": codesystem_concept_designation,
    "http://fhir.forms-lab.com/custom-model/r6/codesystem_concept_property": codesystem_concept_property,
    "http://fhir.forms-lab.com/custom-model/r6/codesystem_filter": codesystem_filter,
    "http://fhir.forms-lab.com/custom-model/r6/codesystem_property": codesystem_property,
    "http://fhir.forms-lab.com/custom-model/r6/communication_payload": communication_payload,
    "http://fhir.forms-lab.com/custom-model/r6/communicationrequest_payload": communicationrequest_payload,
    "http://fhir.forms-lab.com/custom-model/r6/compartmentdefinition_resource": compartmentdefinition_resource,
    "http://fhir.forms-lab.com/custom-model/r6/composition_attester": composition_attester,
    "http://fhir.forms-lab.com/custom-model/r6/composition_event": composition_event,
    "http://fhir.forms-lab.com/custom-model/r6/composition_participant": composition_participant,
    "http://fhir.forms-lab.com/custom-model/r6/composition_relatesTo": composition_relatesTo,
    "http://fhir.forms-lab.com/custom-model/r6/composition_section": composition_section,
    "http://fhir.forms-lab.com/custom-model/r6/conceptmap_additionalAttribute": conceptmap_additionalAttribute,
    "http://fhir.forms-lab.com/custom-model/r6/conceptmap_group": conceptmap_group,
    "http://fhir.forms-lab.com/custom-model/r6/conceptmap_group_element": conceptmap_group_element,
    "http://fhir.forms-lab.com/custom-model/r6/conceptmap_group_element_target": conceptmap_group_element_target,
    "http://fhir.forms-lab.com/custom-model/r6/conceptmap_group_element_target_dependsOn": conceptmap_group_element_target_dependsOn,
    "http://fhir.forms-lab.com/custom-model/r6/conceptmap_group_element_target_property": conceptmap_group_element_target_property,
    "http://fhir.forms-lab.com/custom-model/r6/conceptmap_group_unmapped": conceptmap_group_unmapped,
    "http://fhir.forms-lab.com/custom-model/r6/conceptmap_property": conceptmap_property,
    "http://fhir.forms-lab.com/custom-model/r6/condition_stage": condition_stage,
    "http://fhir.forms-lab.com/custom-model/r6/consent_policyBasis": consent_policyBasis,
    "http://fhir.forms-lab.com/custom-model/r6/consent_provision": consent_provision,
    "http://fhir.forms-lab.com/custom-model/r6/consent_provision_actor": consent_provision_actor,
    "http://fhir.forms-lab.com/custom-model/r6/consent_provision_data": consent_provision_data,
    "http://fhir.forms-lab.com/custom-model/r6/consent_verification": consent_verification,
    "http://fhir.forms-lab.com/custom-model/r6/contract_contentDefinition": contract_contentDefinition,
    "http://fhir.forms-lab.com/custom-model/r6/contract_friendly": contract_friendly,
    "http://fhir.forms-lab.com/custom-model/r6/contract_legal": contract_legal,
    "http://fhir.forms-lab.com/custom-model/r6/contract_rule": contract_rule,
    "http://fhir.forms-lab.com/custom-model/r6/contract_signer": contract_signer,
    "http://fhir.forms-lab.com/custom-model/r6/contract_term": contract_term,
    "http://fhir.forms-lab.com/custom-model/r6/contract_term_action": contract_term_action,
    "http://fhir.forms-lab.com/custom-model/r6/contract_term_action_subject": contract_term_action_subject,
    "http://fhir.forms-lab.com/custom-model/r6/contract_term_asset": contract_term_asset,
    "http://fhir.forms-lab.com/custom-model/r6/contract_term_asset_context": contract_term_asset_context,
    "http://fhir.forms-lab.com/custom-model/r6/contract_term_asset_valuedItem": contract_term_asset_valuedItem,
    "http://fhir.forms-lab.com/custom-model/r6/contract_term_offer": contract_term_offer,
    "http://fhir.forms-lab.com/custom-model/r6/contract_term_offer_answer": contract_term_offer_answer,
    "http://fhir.forms-lab.com/custom-model/r6/contract_term_offer_party": contract_term_offer_party,
    "http://fhir.forms-lab.com/custom-model/r6/contract_term_securityLabel": contract_term_securityLabel,
    "http://fhir.forms-lab.com/custom-model/r6/coverage_class": coverage_class,
    "http://fhir.forms-lab.com/custom-model/r6/coverage_costToBeneficiary": coverage_costToBeneficiary,
    "http://fhir.forms-lab.com/custom-model/r6/coverage_costToBeneficiary_exception": coverage_costToBeneficiary_exception,
    "http://fhir.forms-lab.com/custom-model/r6/coverage_paymentBy": coverage_paymentBy,
    "http://fhir.forms-lab.com/custom-model/r6/coverageeligibilityrequest_event": coverageeligibilityrequest_event,
    "http://fhir.forms-lab.com/custom-model/r6/coverageeligibilityrequest_insurance": coverageeligibilityrequest_insurance,
    "http://fhir.forms-lab.com/custom-model/r6/coverageeligibilityrequest_item": coverageeligibilityrequest_item,
    "http://fhir.forms-lab.com/custom-model/r6/coverageeligibilityrequest_item_diagnosis": coverageeligibilityrequest_item_diagnosis,
    "http://fhir.forms-lab.com/custom-model/r6/coverageeligibilityrequest_supportingInfo": coverageeligibilityrequest_supportingInfo,
    "http://fhir.forms-lab.com/custom-model/r6/coverageeligibilityresponse_error": coverageeligibilityresponse_error,
    "http://fhir.forms-lab.com/custom-model/r6/coverageeligibilityresponse_event": coverageeligibilityresponse_event,
    "http://fhir.forms-lab.com/custom-model/r6/coverageeligibilityresponse_insurance": coverageeligibilityresponse_insurance,
    "http://fhir.forms-lab.com/custom-model/r6/coverageeligibilityresponse_insurance_item": coverageeligibilityresponse_insurance_item,
    "http://fhir.forms-lab.com/custom-model/r6/coverageeligibilityresponse_insurance_item_benefit": coverageeligibilityresponse_insurance_item_benefit,
    "http://fhir.forms-lab.com/custom-model/r6/datarequirement_codeFilter": datarequirement_codeFilter,
    "http://fhir.forms-lab.com/custom-model/r6/datarequirement_dateFilter": datarequirement_dateFilter,
    "http://fhir.forms-lab.com/custom-model/r6/datarequirement_sort": datarequirement_sort,
    "http://fhir.forms-lab.com/custom-model/r6/datarequirement_valueFilter": datarequirement_valueFilter,
    "http://fhir.forms-lab.com/custom-model/r6/detectedissue_evidence": detectedissue_evidence,
    "http://fhir.forms-lab.com/custom-model/r6/detectedissue_mitigation": detectedissue_mitigation,
    "http://fhir.forms-lab.com/custom-model/r6/device_additive": device_additive,
    "http://fhir.forms-lab.com/custom-model/r6/device_conformsTo": device_conformsTo,
    "http://fhir.forms-lab.com/custom-model/r6/device_deviceVersion": device_deviceVersion,
    "http://fhir.forms-lab.com/custom-model/r6/device_name": device_name,
    "http://fhir.forms-lab.com/custom-model/r6/device_property": device_property,
    "http://fhir.forms-lab.com/custom-model/r6/device_udiCarrier": device_udiCarrier,
    "http://fhir.forms-lab.com/custom-model/r6/devicealert_derivedFrom": devicealert_derivedFrom,
    "http://fhir.forms-lab.com/custom-model/r6/devicealert_signal": devicealert_signal,
    "http://fhir.forms-lab.com/custom-model/r6/devicedefinition_chargeItem": devicedefinition_chargeItem,
    "http://fhir.forms-lab.com/custom-model/r6/devicedefinition_classification": devicedefinition_classification,
    "http://fhir.forms-lab.com/custom-model/r6/devicedefinition_conformsTo": devicedefinition_conformsTo,
    "http://fhir.forms-lab.com/custom-model/r6/devicedefinition_correctiveAction": devicedefinition_correctiveAction,
    "http://fhir.forms-lab.com/custom-model/r6/devicedefinition_deviceName": devicedefinition_deviceName,
    "http://fhir.forms-lab.com/custom-model/r6/devicedefinition_deviceVersion": devicedefinition_deviceVersion,
    "http://fhir.forms-lab.com/custom-model/r6/devicedefinition_guideline": devicedefinition_guideline,
    "http://fhir.forms-lab.com/custom-model/r6/devicedefinition_hasPart": devicedefinition_hasPart,
    "http://fhir.forms-lab.com/custom-model/r6/devicedefinition_link": devicedefinition_link,
    "http://fhir.forms-lab.com/custom-model/r6/devicedefinition_material": devicedefinition_material,
    "http://fhir.forms-lab.com/custom-model/r6/devicedefinition_packaging": devicedefinition_packaging,
    "http://fhir.forms-lab.com/custom-model/r6/devicedefinition_packaging_distributor": devicedefinition_packaging_distributor,
    "http://fhir.forms-lab.com/custom-model/r6/devicedefinition_property": devicedefinition_property,
    "http://fhir.forms-lab.com/custom-model/r6/devicedefinition_regulatoryIdentifier": devicedefinition_regulatoryIdentifier,
    "http://fhir.forms-lab.com/custom-model/r6/devicedefinition_udiDeviceIdentifier": devicedefinition_udiDeviceIdentifier,
    "http://fhir.forms-lab.com/custom-model/r6/devicedefinition_udiDeviceIdentifier_marketDistribution": devicedefinition_udiDeviceIdentifier_marketDistribution,
    "http://fhir.forms-lab.com/custom-model/r6/devicemetric_calibration": devicemetric_calibration,
    "http://fhir.forms-lab.com/custom-model/r6/devicerequest_parameter": devicerequest_parameter,
    "http://fhir.forms-lab.com/custom-model/r6/diagnosticreport_media": diagnosticreport_media,
    "http://fhir.forms-lab.com/custom-model/r6/diagnosticreport_supportingInfo": diagnosticreport_supportingInfo,
    "http://fhir.forms-lab.com/custom-model/r6/documentreference_attester": documentreference_attester,
    "http://fhir.forms-lab.com/custom-model/r6/documentreference_content": documentreference_content,
    "http://fhir.forms-lab.com/custom-model/r6/documentreference_content_profile": documentreference_content_profile,
    "http://fhir.forms-lab.com/custom-model/r6/documentreference_relatesTo": documentreference_relatesTo,
    "http://fhir.forms-lab.com/custom-model/r6/dosage_doseAndRate": dosage_doseAndRate,
    "http://fhir.forms-lab.com/custom-model/r6/dosagedetails_step": dosagedetails_step,
    "http://fhir.forms-lab.com/custom-model/r6/dosagesafety_doseLimit": dosagesafety_doseLimit,
    "http://fhir.forms-lab.com/custom-model/r6/elementdefinition_base": elementdefinition_base,
    "http://fhir.forms-lab.com/custom-model/r6/elementdefinition_binding": elementdefinition_binding,
    "http://fhir.forms-lab.com/custom-model/r6/elementdefinition_binding_additional": elementdefinition_binding_additional,
    "http://fhir.forms-lab.com/custom-model/r6/elementdefinition_constraint": elementdefinition_constraint,
    "http://fhir.forms-lab.com/custom-model/r6/elementdefinition_example": elementdefinition_example,
    "http://fhir.forms-lab.com/custom-model/r6/elementdefinition_mapping": elementdefinition_mapping,
    "http://fhir.forms-lab.com/custom-model/r6/elementdefinition_slicing": elementdefinition_slicing,
    "http://fhir.forms-lab.com/custom-model/r6/elementdefinition_slicing_discriminator": elementdefinition_slicing_discriminator,
    "http://fhir.forms-lab.com/custom-model/r6/elementdefinition_type": elementdefinition_type,
    "http://fhir.forms-lab.com/custom-model/r6/encounter_admission": encounter_admission,
    "http://fhir.forms-lab.com/custom-model/r6/encounter_businessStatus": encounter_businessStatus,
    "http://fhir.forms-lab.com/custom-model/r6/encounter_diagnosis": encounter_diagnosis,
    "http://fhir.forms-lab.com/custom-model/r6/encounter_location": encounter_location,
    "http://fhir.forms-lab.com/custom-model/r6/encounter_participant": encounter_participant,
    "http://fhir.forms-lab.com/custom-model/r6/encounter_reason": encounter_reason,
    "http://fhir.forms-lab.com/custom-model/r6/endpoint_payload": endpoint_payload,
    "http://fhir.forms-lab.com/custom-model/r6/episodeofcare_diagnosis": episodeofcare_diagnosis,
    "http://fhir.forms-lab.com/custom-model/r6/episodeofcare_reason": episodeofcare_reason,
    "http://fhir.forms-lab.com/custom-model/r6/episodeofcare_statusHistory": episodeofcare_statusHistory,
    "http://fhir.forms-lab.com/custom-model/r6/evidence_certainty": evidence_certainty,
    "http://fhir.forms-lab.com/custom-model/r6/evidence_relatesTo": evidence_relatesTo,
    "http://fhir.forms-lab.com/custom-model/r6/evidence_statistic": evidence_statistic,
    "http://fhir.forms-lab.com/custom-model/r6/evidence_statistic_attributeEstimate": evidence_statistic_attributeEstimate,
    "http://fhir.forms-lab.com/custom-model/r6/evidence_statistic_modelCharacteristic": evidence_statistic_modelCharacteristic,
    "http://fhir.forms-lab.com/custom-model/r6/evidence_statistic_modelCharacteristic_variable": evidence_statistic_modelCharacteristic_variable,
    "http://fhir.forms-lab.com/custom-model/r6/evidence_statistic_sampleSize": evidence_statistic_sampleSize,
    "http://fhir.forms-lab.com/custom-model/r6/evidence_variableDefinition": evidence_variableDefinition,
    "http://fhir.forms-lab.com/custom-model/r6/evidencevariable_category": evidencevariable_category,
    "http://fhir.forms-lab.com/custom-model/r6/evidencevariable_constraint": evidencevariable_constraint,
    "http://fhir.forms-lab.com/custom-model/r6/evidencevariable_dataStorage": evidencevariable_dataStorage,
    "http://fhir.forms-lab.com/custom-model/r6/evidencevariable_definitionModifier": evidencevariable_definitionModifier,
    "http://fhir.forms-lab.com/custom-model/r6/evidencevariable_relatesTo": evidencevariable_relatesTo,
    "http://fhir.forms-lab.com/custom-model/r6/examplescenario_actor": examplescenario_actor,
    "http://fhir.forms-lab.com/custom-model/r6/examplescenario_instance": examplescenario_instance,
    "http://fhir.forms-lab.com/custom-model/r6/examplescenario_instance_containedInstance": examplescenario_instance_containedInstance,
    "http://fhir.forms-lab.com/custom-model/r6/examplescenario_instance_version": examplescenario_instance_version,
    "http://fhir.forms-lab.com/custom-model/r6/examplescenario_process": examplescenario_process,
    "http://fhir.forms-lab.com/custom-model/r6/examplescenario_process_step": examplescenario_process_step,
    "http://fhir.forms-lab.com/custom-model/r6/examplescenario_process_step_alternative": examplescenario_process_step_alternative,
    "http://fhir.forms-lab.com/custom-model/r6/examplescenario_process_step_operation": examplescenario_process_step_operation,
    "http://fhir.forms-lab.com/custom-model/r6/explanationofbenefit_accident": explanationofbenefit_accident,
    "http://fhir.forms-lab.com/custom-model/r6/explanationofbenefit_addItem": explanationofbenefit_addItem,
    "http://fhir.forms-lab.com/custom-model/r6/explanationofbenefit_addItem_bodySite": explanationofbenefit_addItem_bodySite,
    "http://fhir.forms-lab.com/custom-model/r6/explanationofbenefit_addItem_detail": explanationofbenefit_addItem_detail,
    "http://fhir.forms-lab.com/custom-model/r6/explanationofbenefit_addItem_detail_subDetail": explanationofbenefit_addItem_detail_subDetail,
    "http://fhir.forms-lab.com/custom-model/r6/explanationofbenefit_benefitBalance": explanationofbenefit_benefitBalance,
    "http://fhir.forms-lab.com/custom-model/r6/explanationofbenefit_benefitBalance_financial": explanationofbenefit_benefitBalance_financial,
    "http://fhir.forms-lab.com/custom-model/r6/explanationofbenefit_careTeam": explanationofbenefit_careTeam,
    "http://fhir.forms-lab.com/custom-model/r6/explanationofbenefit_diagnosis": explanationofbenefit_diagnosis,
    "http://fhir.forms-lab.com/custom-model/r6/explanationofbenefit_event": explanationofbenefit_event,
    "http://fhir.forms-lab.com/custom-model/r6/explanationofbenefit_insurance": explanationofbenefit_insurance,
    "http://fhir.forms-lab.com/custom-model/r6/explanationofbenefit_item": explanationofbenefit_item,
    "http://fhir.forms-lab.com/custom-model/r6/explanationofbenefit_item_adjudication": explanationofbenefit_item_adjudication,
    "http://fhir.forms-lab.com/custom-model/r6/explanationofbenefit_item_bodySite": explanationofbenefit_item_bodySite,
    "http://fhir.forms-lab.com/custom-model/r6/explanationofbenefit_item_detail": explanationofbenefit_item_detail,
    "http://fhir.forms-lab.com/custom-model/r6/explanationofbenefit_item_detail_subDetail": explanationofbenefit_item_detail_subDetail,
    "http://fhir.forms-lab.com/custom-model/r6/explanationofbenefit_item_reviewOutcome": explanationofbenefit_item_reviewOutcome,
    "http://fhir.forms-lab.com/custom-model/r6/explanationofbenefit_payee": explanationofbenefit_payee,
    "http://fhir.forms-lab.com/custom-model/r6/explanationofbenefit_payment": explanationofbenefit_payment,
    "http://fhir.forms-lab.com/custom-model/r6/explanationofbenefit_procedure": explanationofbenefit_procedure,
    "http://fhir.forms-lab.com/custom-model/r6/explanationofbenefit_processNote": explanationofbenefit_processNote,
    "http://fhir.forms-lab.com/custom-model/r6/explanationofbenefit_related": explanationofbenefit_related,
    "http://fhir.forms-lab.com/custom-model/r6/explanationofbenefit_supportingInfo": explanationofbenefit_supportingInfo,
    "http://fhir.forms-lab.com/custom-model/r6/explanationofbenefit_total": explanationofbenefit_total,
    "http://fhir.forms-lab.com/custom-model/r6/familymemberhistory_condition": familymemberhistory_condition,
    "http://fhir.forms-lab.com/custom-model/r6/familymemberhistory_procedure": familymemberhistory_procedure,
    "http://fhir.forms-lab.com/custom-model/r6/goal_acceptance": goal_acceptance,
    "http://fhir.forms-lab.com/custom-model/r6/goal_target": goal_target,
    "http://fhir.forms-lab.com/custom-model/r6/group_characteristic": group_characteristic,
    "http://fhir.forms-lab.com/custom-model/r6/group_member": group_member,
    "http://fhir.forms-lab.com/custom-model/r6/healthcareservice_eligibility": healthcareservice_eligibility,
    "http://fhir.forms-lab.com/custom-model/r6/imagingselection_imageRegion3D": imagingselection_imageRegion3D,
    "http://fhir.forms-lab.com/custom-model/r6/imagingselection_instance": imagingselection_instance,
    "http://fhir.forms-lab.com/custom-model/r6/imagingselection_instance_imageRegion2D": imagingselection_instance_imageRegion2D,
    "http://fhir.forms-lab.com/custom-model/r6/imagingselection_performer": imagingselection_performer,
    "http://fhir.forms-lab.com/custom-model/r6/imagingstudy_series": imagingstudy_series,
    "http://fhir.forms-lab.com/custom-model/r6/imagingstudy_series_instance": imagingstudy_series_instance,
    "http://fhir.forms-lab.com/custom-model/r6/imagingstudy_series_performer": imagingstudy_series_performer,
    "http://fhir.forms-lab.com/custom-model/r6/immunization_performer": immunization_performer,
    "http://fhir.forms-lab.com/custom-model/r6/immunization_programEligibility": immunization_programEligibility,
    "http://fhir.forms-lab.com/custom-model/r6/immunization_protocolApplied": immunization_protocolApplied,
    "http://fhir.forms-lab.com/custom-model/r6/immunization_reaction": immunization_reaction,
    "http://fhir.forms-lab.com/custom-model/r6/implementationguide_definition": implementationguide_definition,
    "http://fhir.forms-lab.com/custom-model/r6/implementationguide_definition_grouping": implementationguide_definition_grouping,
    "http://fhir.forms-lab.com/custom-model/r6/implementationguide_definition_page": implementationguide_definition_page,
    "http://fhir.forms-lab.com/custom-model/r6/implementationguide_definition_parameter": implementationguide_definition_parameter,
    "http://fhir.forms-lab.com/custom-model/r6/implementationguide_definition_resource": implementationguide_definition_resource,
    "http://fhir.forms-lab.com/custom-model/r6/implementationguide_definition_template": implementationguide_definition_template,
    "http://fhir.forms-lab.com/custom-model/r6/implementationguide_dependsOn": implementationguide_dependsOn,
    "http://fhir.forms-lab.com/custom-model/r6/implementationguide_global": implementationguide_global,
    "http://fhir.forms-lab.com/custom-model/r6/implementationguide_manifest": implementationguide_manifest,
    "http://fhir.forms-lab.com/custom-model/r6/implementationguide_manifest_page": implementationguide_manifest_page,
    "http://fhir.forms-lab.com/custom-model/r6/implementationguide_manifest_resource": implementationguide_manifest_resource,
    "http://fhir.forms-lab.com/custom-model/r6/ingredient_manufacturer": ingredient_manufacturer,
    "http://fhir.forms-lab.com/custom-model/r6/ingredient_substance": ingredient_substance,
    "http://fhir.forms-lab.com/custom-model/r6/ingredient_substance_strength": ingredient_substance_strength,
    "http://fhir.forms-lab.com/custom-model/r6/ingredient_substance_strength_referenceStrength": ingredient_substance_strength_referenceStrength,
    "http://fhir.forms-lab.com/custom-model/r6/insuranceplan_generalCost": insuranceplan_generalCost,
    "http://fhir.forms-lab.com/custom-model/r6/insuranceplan_specificCost": insuranceplan_specificCost,
    "http://fhir.forms-lab.com/custom-model/r6/insuranceplan_specificCost_benefit": insuranceplan_specificCost_benefit,
    "http://fhir.forms-lab.com/custom-model/r6/insuranceplan_specificCost_benefit_cost": insuranceplan_specificCost_benefit_cost,
    "http://fhir.forms-lab.com/custom-model/r6/insuranceproduct_coverage": insuranceproduct_coverage,
    "http://fhir.forms-lab.com/custom-model/r6/insuranceproduct_coverage_benefit": insuranceproduct_coverage_benefit,
    "http://fhir.forms-lab.com/custom-model/r6/insuranceproduct_coverage_benefit_limit": insuranceproduct_coverage_benefit_limit,
    "http://fhir.forms-lab.com/custom-model/r6/insuranceproduct_related": insuranceproduct_related,
    "http://fhir.forms-lab.com/custom-model/r6/invoice_lineItem": invoice_lineItem,
    "http://fhir.forms-lab.com/custom-model/r6/invoice_participant": invoice_participant,
    "http://fhir.forms-lab.com/custom-model/r6/list_entry": list_entry,
    "http://fhir.forms-lab.com/custom-model/r6/location_position": location_position,
    "http://fhir.forms-lab.com/custom-model/r6/manufactureditemdefinition_component": manufactureditemdefinition_component,
    "http://fhir.forms-lab.com/custom-model/r6/manufactureditemdefinition_component_constituent": manufactureditemdefinition_component_constituent,
    "http://fhir.forms-lab.com/custom-model/r6/manufactureditemdefinition_property": manufactureditemdefinition_property,
    "http://fhir.forms-lab.com/custom-model/r6/measure_group": measure_group,
    "http://fhir.forms-lab.com/custom-model/r6/measure_group_component": measure_group_component,
    "http://fhir.forms-lab.com/custom-model/r6/measure_group_population": measure_group_population,
    "http://fhir.forms-lab.com/custom-model/r6/measure_group_stratifier": measure_group_stratifier,
    "http://fhir.forms-lab.com/custom-model/r6/measure_group_stratifier_component": measure_group_stratifier_component,
    "http://fhir.forms-lab.com/custom-model/r6/measure_supplementalData": measure_supplementalData,
    "http://fhir.forms-lab.com/custom-model/r6/measure_term": measure_term,
    "http://fhir.forms-lab.com/custom-model/r6/measurereport_group": measurereport_group,
    "http://fhir.forms-lab.com/custom-model/r6/measurereport_group_population": measurereport_group_population,
    "http://fhir.forms-lab.com/custom-model/r6/measurereport_group_stratifier": measurereport_group_stratifier,
    "http://fhir.forms-lab.com/custom-model/r6/measurereport_group_stratifier_stratum": measurereport_group_stratifier_stratum,
    "http://fhir.forms-lab.com/custom-model/r6/measurereport_group_stratifier_stratum_component": measurereport_group_stratifier_stratum_component,
    "http://fhir.forms-lab.com/custom-model/r6/measurereport_group_stratifier_stratum_population": measurereport_group_stratifier_stratum_population,
    "http://fhir.forms-lab.com/custom-model/r6/medication_ingredient": medication_ingredient,
    "http://fhir.forms-lab.com/custom-model/r6/medication_instance": medication_instance,
    "http://fhir.forms-lab.com/custom-model/r6/medication_packageSize": medication_packageSize,
    "http://fhir.forms-lab.com/custom-model/r6/medicationadministration_dosage": medicationadministration_dosage,
    "http://fhir.forms-lab.com/custom-model/r6/medicationadministration_performer": medicationadministration_performer,
    "http://fhir.forms-lab.com/custom-model/r6/medicationdispense_performer": medicationdispense_performer,
    "http://fhir.forms-lab.com/custom-model/r6/medicationdispense_substitution": medicationdispense_substitution,
    "http://fhir.forms-lab.com/custom-model/r6/medicationrequest_dispenseRequest": medicationrequest_dispenseRequest,
    "http://fhir.forms-lab.com/custom-model/r6/medicationrequest_dispenseRequest_initialFill": medicationrequest_dispenseRequest_initialFill,
    "http://fhir.forms-lab.com/custom-model/r6/medicationrequest_substitution": medicationrequest_substitution,
    "http://fhir.forms-lab.com/custom-model/r6/medicationstatement_adherence": medicationstatement_adherence,
    "http://fhir.forms-lab.com/custom-model/r6/medicinalproductdefinition_characteristic": medicinalproductdefinition_characteristic,
    "http://fhir.forms-lab.com/custom-model/r6/medicinalproductdefinition_contact": medicinalproductdefinition_contact,
    "http://fhir.forms-lab.com/custom-model/r6/medicinalproductdefinition_crossReference": medicinalproductdefinition_crossReference,
    "http://fhir.forms-lab.com/custom-model/r6/medicinalproductdefinition_name": medicinalproductdefinition_name,
    "http://fhir.forms-lab.com/custom-model/r6/medicinalproductdefinition_name_part": medicinalproductdefinition_name_part,
    "http://fhir.forms-lab.com/custom-model/r6/medicinalproductdefinition_name_usage": medicinalproductdefinition_name_usage,
    "http://fhir.forms-lab.com/custom-model/r6/medicinalproductdefinition_operation": medicinalproductdefinition_operation,
    "http://fhir.forms-lab.com/custom-model/r6/messagedefinition_allowedResponse": messagedefinition_allowedResponse,
    "http://fhir.forms-lab.com/custom-model/r6/messagedefinition_focus": messagedefinition_focus,
    "http://fhir.forms-lab.com/custom-model/r6/messageheader_destination": messageheader_destination,
    "http://fhir.forms-lab.com/custom-model/r6/messageheader_response": messageheader_response,
    "http://fhir.forms-lab.com/custom-model/r6/messageheader_source": messageheader_source,
    "http://fhir.forms-lab.com/custom-model/r6/namingsystem_uniqueId": namingsystem_uniqueId,
    "http://fhir.forms-lab.com/custom-model/r6/nutritionintake_nutritionItem": nutritionintake_nutritionItem,
    "http://fhir.forms-lab.com/custom-model/r6/nutritionintake_nutritionItem_consumedItem": nutritionintake_nutritionItem_consumedItem,
    "http://fhir.forms-lab.com/custom-model/r6/nutritionintake_nutritionItem_consumedItem_totalIntake": nutritionintake_nutritionItem_consumedItem_totalIntake,
    "http://fhir.forms-lab.com/custom-model/r6/nutritionintake_nutritionItem_notConsumedItem": nutritionintake_nutritionItem_notConsumedItem,
    "http://fhir.forms-lab.com/custom-model/r6/nutritionintake_performer": nutritionintake_performer,
    "http://fhir.forms-lab.com/custom-model/r6/nutritionorder_additive": nutritionorder_additive,
    "http://fhir.forms-lab.com/custom-model/r6/nutritionorder_enteralFormula": nutritionorder_enteralFormula,
    "http://fhir.forms-lab.com/custom-model/r6/nutritionorder_enteralFormula_administration": nutritionorder_enteralFormula_administration,
    "http://fhir.forms-lab.com/custom-model/r6/nutritionorder_enteralFormula_administration_schedule": nutritionorder_enteralFormula_administration_schedule,
    "http://fhir.forms-lab.com/custom-model/r6/nutritionorder_oralDiet": nutritionorder_oralDiet,
    "http://fhir.forms-lab.com/custom-model/r6/nutritionorder_oralDiet_nutrient": nutritionorder_oralDiet_nutrient,
    "http://fhir.forms-lab.com/custom-model/r6/nutritionorder_oralDiet_schedule": nutritionorder_oralDiet_schedule,
    "http://fhir.forms-lab.com/custom-model/r6/nutritionorder_oralDiet_texture": nutritionorder_oralDiet_texture,
    "http://fhir.forms-lab.com/custom-model/r6/nutritionorder_supplement": nutritionorder_supplement,
    "http://fhir.forms-lab.com/custom-model/r6/nutritionorder_supplement_schedule": nutritionorder_supplement_schedule,
    "http://fhir.forms-lab.com/custom-model/r6/nutritionproduct_characteristic": nutritionproduct_characteristic,
    "http://fhir.forms-lab.com/custom-model/r6/nutritionproduct_ingredient": nutritionproduct_ingredient,
    "http://fhir.forms-lab.com/custom-model/r6/nutritionproduct_instance": nutritionproduct_instance,
    "http://fhir.forms-lab.com/custom-model/r6/nutritionproduct_nutrient": nutritionproduct_nutrient,
    "http://fhir.forms-lab.com/custom-model/r6/observation_component": observation_component,
    "http://fhir.forms-lab.com/custom-model/r6/observation_referenceRange": observation_referenceRange,
    "http://fhir.forms-lab.com/custom-model/r6/observation_triggeredBy": observation_triggeredBy,
    "http://fhir.forms-lab.com/custom-model/r6/observationdefinition_component": observationdefinition_component,
    "http://fhir.forms-lab.com/custom-model/r6/observationdefinition_qualifiedValue": observationdefinition_qualifiedValue,
    "http://fhir.forms-lab.com/custom-model/r6/operationdefinition_overload": operationdefinition_overload,
    "http://fhir.forms-lab.com/custom-model/r6/operationdefinition_parameter": operationdefinition_parameter,
    "http://fhir.forms-lab.com/custom-model/r6/operationdefinition_parameter_binding": operationdefinition_parameter_binding,
    "http://fhir.forms-lab.com/custom-model/r6/operationdefinition_parameter_referencedFrom": operationdefinition_parameter_referencedFrom,
    "http://fhir.forms-lab.com/custom-model/r6/operationoutcome_issue": operationoutcome_issue,
    "http://fhir.forms-lab.com/custom-model/r6/organization_qualification": organization_qualification,
    "http://fhir.forms-lab.com/custom-model/r6/packagedproductdefinition_legalStatusOfSupply": packagedproductdefinition_legalStatusOfSupply,
    "http://fhir.forms-lab.com/custom-model/r6/packagedproductdefinition_packaging": packagedproductdefinition_packaging,
    "http://fhir.forms-lab.com/custom-model/r6/packagedproductdefinition_packaging_containedItem": packagedproductdefinition_packaging_containedItem,
    "http://fhir.forms-lab.com/custom-model/r6/packagedproductdefinition_packaging_property": packagedproductdefinition_packaging_property,
    "http://fhir.forms-lab.com/custom-model/r6/parameters_parameter": parameters_parameter,
    "http://fhir.forms-lab.com/custom-model/r6/patient_communication": patient_communication,
    "http://fhir.forms-lab.com/custom-model/r6/patient_contact": patient_contact,
    "http://fhir.forms-lab.com/custom-model/r6/patient_link": patient_link,
    "http://fhir.forms-lab.com/custom-model/r6/paymentreconciliation_allocation": paymentreconciliation_allocation,
    "http://fhir.forms-lab.com/custom-model/r6/paymentreconciliation_processNote": paymentreconciliation_processNote,
    "http://fhir.forms-lab.com/custom-model/r6/person_communication": person_communication,
    "http://fhir.forms-lab.com/custom-model/r6/person_link": person_link,
    "http://fhir.forms-lab.com/custom-model/r6/plandefinition_action": plandefinition_action,
    "http://fhir.forms-lab.com/custom-model/r6/plandefinition_action_condition": plandefinition_action_condition,
    "http://fhir.forms-lab.com/custom-model/r6/plandefinition_action_dynamicValue": plandefinition_action_dynamicValue,
    "http://fhir.forms-lab.com/custom-model/r6/plandefinition_action_input": plandefinition_action_input,
    "http://fhir.forms-lab.com/custom-model/r6/plandefinition_action_output": plandefinition_action_output,
    "http://fhir.forms-lab.com/custom-model/r6/plandefinition_action_participant": plandefinition_action_participant,
    "http://fhir.forms-lab.com/custom-model/r6/plandefinition_action_relatedAction": plandefinition_action_relatedAction,
    "http://fhir.forms-lab.com/custom-model/r6/plandefinition_actor": plandefinition_actor,
    "http://fhir.forms-lab.com/custom-model/r6/plandefinition_actor_option": plandefinition_actor_option,
    "http://fhir.forms-lab.com/custom-model/r6/plandefinition_goal": plandefinition_goal,
    "http://fhir.forms-lab.com/custom-model/r6/plandefinition_goal_target": plandefinition_goal_target,
    "http://fhir.forms-lab.com/custom-model/r6/practitioner_communication": practitioner_communication,
    "http://fhir.forms-lab.com/custom-model/r6/practitioner_qualification": practitioner_qualification,
    "http://fhir.forms-lab.com/custom-model/r6/procedure_focalDevice": procedure_focalDevice,
    "http://fhir.forms-lab.com/custom-model/r6/procedure_performer": procedure_performer,
    "http://fhir.forms-lab.com/custom-model/r6/provenance_agent": provenance_agent,
    "http://fhir.forms-lab.com/custom-model/r6/provenance_entity": provenance_entity,
    "http://fhir.forms-lab.com/custom-model/r6/questionnaire_item": questionnaire_item,
    "http://fhir.forms-lab.com/custom-model/r6/questionnaire_item_answerOption": questionnaire_item_answerOption,
    "http://fhir.forms-lab.com/custom-model/r6/questionnaire_item_enableWhen": questionnaire_item_enableWhen,
    "http://fhir.forms-lab.com/custom-model/r6/questionnaire_item_initial": questionnaire_item_initial,
    "http://fhir.forms-lab.com/custom-model/r6/questionnaireresponse_item": questionnaireresponse_item,
    "http://fhir.forms-lab.com/custom-model/r6/questionnaireresponse_item_answer": questionnaireresponse_item_answer,
    "http://fhir.forms-lab.com/custom-model/r6/regulatedauthorization_case": regulatedauthorization_case,
    "http://fhir.forms-lab.com/custom-model/r6/relatedperson_communication": relatedperson_communication,
    "http://fhir.forms-lab.com/custom-model/r6/requestorchestration_action": requestorchestration_action,
    "http://fhir.forms-lab.com/custom-model/r6/requestorchestration_action_condition": requestorchestration_action_condition,
    "http://fhir.forms-lab.com/custom-model/r6/requestorchestration_action_dynamicValue": requestorchestration_action_dynamicValue,
    "http://fhir.forms-lab.com/custom-model/r6/requestorchestration_action_input": requestorchestration_action_input,
    "http://fhir.forms-lab.com/custom-model/r6/requestorchestration_action_output": requestorchestration_action_output,
    "http://fhir.forms-lab.com/custom-model/r6/requestorchestration_action_participant": requestorchestration_action_participant,
    "http://fhir.forms-lab.com/custom-model/r6/requestorchestration_action_relatedAction": requestorchestration_action_relatedAction,
    "http://fhir.forms-lab.com/custom-model/r6/requirements_actor": requirements_actor,
    "http://fhir.forms-lab.com/custom-model/r6/requirements_imports": requirements_imports,
    "http://fhir.forms-lab.com/custom-model/r6/requirements_statement": requirements_statement,
    "http://fhir.forms-lab.com/custom-model/r6/requirements_statement_derivedFrom": requirements_statement_derivedFrom,
    "http://fhir.forms-lab.com/custom-model/r6/requirements_statement_partOf": requirements_statement_partOf,
    "http://fhir.forms-lab.com/custom-model/r6/researchstudy_associatedParty": researchstudy_associatedParty,
    "http://fhir.forms-lab.com/custom-model/r6/researchstudy_comparisonGroup": researchstudy_comparisonGroup,
    "http://fhir.forms-lab.com/custom-model/r6/researchstudy_label": researchstudy_label,
    "http://fhir.forms-lab.com/custom-model/r6/researchstudy_objective": researchstudy_objective,
    "http://fhir.forms-lab.com/custom-model/r6/researchstudy_objective_outcomeMeasure": researchstudy_objective_outcomeMeasure,
    "http://fhir.forms-lab.com/custom-model/r6/researchstudy_objective_outcomeMeasure_eventHandling": researchstudy_objective_outcomeMeasure_eventHandling,
    "http://fhir.forms-lab.com/custom-model/r6/researchstudy_progressStatus": researchstudy_progressStatus,
    "http://fhir.forms-lab.com/custom-model/r6/researchstudy_recruitment": researchstudy_recruitment,
    "http://fhir.forms-lab.com/custom-model/r6/researchstudy_relatesTo": researchstudy_relatesTo,
    "http://fhir.forms-lab.com/custom-model/r6/researchsubject_subjectMilestone": researchsubject_subjectMilestone,
    "http://fhir.forms-lab.com/custom-model/r6/researchsubject_subjectState": researchsubject_subjectState,
    "http://fhir.forms-lab.com/custom-model/r6/riskassessment_prediction": riskassessment_prediction,
    "http://fhir.forms-lab.com/custom-model/r6/searchparameter_component": searchparameter_component,
    "http://fhir.forms-lab.com/custom-model/r6/servicerequest_orderDetail": servicerequest_orderDetail,
    "http://fhir.forms-lab.com/custom-model/r6/servicerequest_orderDetail_parameter": servicerequest_orderDetail_parameter,
    "http://fhir.forms-lab.com/custom-model/r6/servicerequest_patientInstruction": servicerequest_patientInstruction,
    "http://fhir.forms-lab.com/custom-model/r6/specimen_collection": specimen_collection,
    "http://fhir.forms-lab.com/custom-model/r6/specimen_container": specimen_container,
    "http://fhir.forms-lab.com/custom-model/r6/specimen_feature": specimen_feature,
    "http://fhir.forms-lab.com/custom-model/r6/specimen_processing": specimen_processing,
    "http://fhir.forms-lab.com/custom-model/r6/specimendefinition_typeTested": specimendefinition_typeTested,
    "http://fhir.forms-lab.com/custom-model/r6/specimendefinition_typeTested_container": specimendefinition_typeTested_container,
    "http://fhir.forms-lab.com/custom-model/r6/specimendefinition_typeTested_container_additive": specimendefinition_typeTested_container_additive,
    "http://fhir.forms-lab.com/custom-model/r6/specimendefinition_typeTested_handling": specimendefinition_typeTested_handling,
    "http://fhir.forms-lab.com/custom-model/r6/structuredefinition_context": structuredefinition_context,
    "http://fhir.forms-lab.com/custom-model/r6/structuredefinition_differential": structuredefinition_differential,
    "http://fhir.forms-lab.com/custom-model/r6/structuredefinition_mapping": structuredefinition_mapping,
    "http://fhir.forms-lab.com/custom-model/r6/structuredefinition_snapshot": structuredefinition_snapshot,
    "http://fhir.forms-lab.com/custom-model/r6/structuremap_const": structuremap_const,
    "http://fhir.forms-lab.com/custom-model/r6/structuremap_group": structuremap_group,
    "http://fhir.forms-lab.com/custom-model/r6/structuremap_group_input": structuremap_group_input,
    "http://fhir.forms-lab.com/custom-model/r6/structuremap_group_rule": structuremap_group_rule,
    "http://fhir.forms-lab.com/custom-model/r6/structuremap_group_rule_dependent": structuremap_group_rule_dependent,
    "http://fhir.forms-lab.com/custom-model/r6/structuremap_group_rule_source": structuremap_group_rule_source,
    "http://fhir.forms-lab.com/custom-model/r6/structuremap_group_rule_target": structuremap_group_rule_target,
    "http://fhir.forms-lab.com/custom-model/r6/structuremap_group_rule_target_parameter": structuremap_group_rule_target_parameter,
    "http://fhir.forms-lab.com/custom-model/r6/structuremap_structure": structuremap_structure,
    "http://fhir.forms-lab.com/custom-model/r6/subscription_filterBy": subscription_filterBy,
    "http://fhir.forms-lab.com/custom-model/r6/subscription_parameter": subscription_parameter,
    "http://fhir.forms-lab.com/custom-model/r6/subscriptionstatus_notificationEvent": subscriptionstatus_notificationEvent,
    "http://fhir.forms-lab.com/custom-model/r6/subscriptionstatus_notificationEvent_authorizationHint": subscriptionstatus_notificationEvent_authorizationHint,
    "http://fhir.forms-lab.com/custom-model/r6/subscriptionstatus_notificationEvent_relatedQuery": subscriptionstatus_notificationEvent_relatedQuery,
    "http://fhir.forms-lab.com/custom-model/r6/subscriptiontopic_trigger": subscriptiontopic_trigger,
    "http://fhir.forms-lab.com/custom-model/r6/subscriptiontopic_trigger_canFilterBy": subscriptiontopic_trigger_canFilterBy,
    "http://fhir.forms-lab.com/custom-model/r6/subscriptiontopic_trigger_notificationShape": subscriptiontopic_trigger_notificationShape,
    "http://fhir.forms-lab.com/custom-model/r6/subscriptiontopic_trigger_notificationShape_relatedQuery": subscriptiontopic_trigger_notificationShape_relatedQuery,
    "http://fhir.forms-lab.com/custom-model/r6/subscriptiontopic_trigger_queryCriteria": subscriptiontopic_trigger_queryCriteria,
    "http://fhir.forms-lab.com/custom-model/r6/substancedefinition_characterization": substancedefinition_characterization,
    "http://fhir.forms-lab.com/custom-model/r6/substancedefinition_code": substancedefinition_code,
    "http://fhir.forms-lab.com/custom-model/r6/substancedefinition_moiety": substancedefinition_moiety,
    "http://fhir.forms-lab.com/custom-model/r6/substancedefinition_molecularWeight": substancedefinition_molecularWeight,
    "http://fhir.forms-lab.com/custom-model/r6/substancedefinition_name": substancedefinition_name,
    "http://fhir.forms-lab.com/custom-model/r6/substancedefinition_name_official": substancedefinition_name_official,
    "http://fhir.forms-lab.com/custom-model/r6/substancedefinition_property": substancedefinition_property,
    "http://fhir.forms-lab.com/custom-model/r6/substancedefinition_relationship": substancedefinition_relationship,
    "http://fhir.forms-lab.com/custom-model/r6/substancedefinition_sourceMaterial": substancedefinition_sourceMaterial,
    "http://fhir.forms-lab.com/custom-model/r6/substancedefinition_structure": substancedefinition_structure,
    "http://fhir.forms-lab.com/custom-model/r6/substancedefinition_structure_representation": substancedefinition_structure_representation,
    "http://fhir.forms-lab.com/custom-model/r6/task_focus": task_focus,
    "http://fhir.forms-lab.com/custom-model/r6/task_input": task_input,
    "http://fhir.forms-lab.com/custom-model/r6/task_output": task_output,
    "http://fhir.forms-lab.com/custom-model/r6/task_performer": task_performer,
    "http://fhir.forms-lab.com/custom-model/r6/task_restriction": task_restriction,
    "http://fhir.forms-lab.com/custom-model/r6/terminologycapabilities_codeSystem": terminologycapabilities_codeSystem,
    "http://fhir.forms-lab.com/custom-model/r6/terminologycapabilities_codeSystem_version": terminologycapabilities_codeSystem_version,
    "http://fhir.forms-lab.com/custom-model/r6/terminologycapabilities_codeSystem_version_filter": terminologycapabilities_codeSystem_version_filter,
    "http://fhir.forms-lab.com/custom-model/r6/terminologycapabilities_expansion": terminologycapabilities_expansion,
    "http://fhir.forms-lab.com/custom-model/r6/terminologycapabilities_expansion_parameter": terminologycapabilities_expansion_parameter,
    "http://fhir.forms-lab.com/custom-model/r6/terminologycapabilities_implementation": terminologycapabilities_implementation,
    "http://fhir.forms-lab.com/custom-model/r6/terminologycapabilities_software": terminologycapabilities_software,
    "http://fhir.forms-lab.com/custom-model/r6/terminologycapabilities_supplements": terminologycapabilities_supplements,
    "http://fhir.forms-lab.com/custom-model/r6/terminologycapabilities_translation": terminologycapabilities_translation,
    "http://fhir.forms-lab.com/custom-model/r6/terminologycapabilities_validateCode": terminologycapabilities_validateCode,
    "http://fhir.forms-lab.com/custom-model/r6/timing_repeat": timing_repeat,
    "http://fhir.forms-lab.com/custom-model/r6/valueset_compose": valueset_compose,
    "http://fhir.forms-lab.com/custom-model/r6/valueset_compose_include": valueset_compose_include,
    "http://fhir.forms-lab.com/custom-model/r6/valueset_compose_include_concept": valueset_compose_include_concept,
    "http://fhir.forms-lab.com/custom-model/r6/valueset_compose_include_concept_designation": valueset_compose_include_concept_designation,
    "http://fhir.forms-lab.com/custom-model/r6/valueset_compose_include_filter": valueset_compose_include_filter,
    "http://fhir.forms-lab.com/custom-model/r6/valueset_expansion": valueset_expansion,
    "http://fhir.forms-lab.com/custom-model/r6/valueset_expansion_contains": valueset_expansion_contains,
    "http://fhir.forms-lab.com/custom-model/r6/valueset_expansion_contains_property": valueset_expansion_contains_property,
    "http://fhir.forms-lab.com/custom-model/r6/valueset_expansion_contains_property_subProperty": valueset_expansion_contains_property_subProperty,
    "http://fhir.forms-lab.com/custom-model/r6/valueset_expansion_parameter": valueset_expansion_parameter,
    "http://fhir.forms-lab.com/custom-model/r6/valueset_expansion_property": valueset_expansion_property,
    "http://fhir.forms-lab.com/custom-model/r6/visionprescription_lensSpecification": visionprescription_lensSpecification,
    "http://fhir.forms-lab.com/custom-model/r6/visionprescription_lensSpecification_prism": visionprescription_lensSpecification_prism,
});

export const byTypeName: Readonly<Record<string, TypeModel>> = Object.freeze({
    "account_balance": account_balance,
    "account_coverage": account_coverage,
    "account_diagnosis": account_diagnosis,
    "account_guarantor": account_guarantor,
    "account_procedure": account_procedure,
    "activitydefinition_dynamicValue": activitydefinition_dynamicValue,
    "activitydefinition_participant": activitydefinition_participant,
    "administrableproductdefinition_property": administrableproductdefinition_property,
    "administrableproductdefinition_routeOfAdministration": administrableproductdefinition_routeOfAdministration,
    "administrableproductdefinition_routeOfAdministration_targetSpecies": administrableproductdefinition_routeOfAdministration_targetSpecies,
    "administrableproductdefinition_routeOfAdministration_targetSpecies_withdrawalPeriod": administrableproductdefinition_routeOfAdministration_targetSpecies_withdrawalPeriod,
    "adverseevent_participant": adverseevent_participant,
    "adverseevent_suspectEntity": adverseevent_suspectEntity,
    "adverseevent_suspectEntity_causality": adverseevent_suspectEntity_causality,
    "allergyintolerance_reaction": allergyintolerance_reaction,
    "appointment_participant": appointment_participant,
    "appointment_recurrenceTemplate": appointment_recurrenceTemplate,
    "appointment_recurrenceTemplate_monthlyTemplate": appointment_recurrenceTemplate_monthlyTemplate,
    "appointment_recurrenceTemplate_weeklyTemplate": appointment_recurrenceTemplate_weeklyTemplate,
    "appointment_recurrenceTemplate_yearlyTemplate": appointment_recurrenceTemplate_yearlyTemplate,
    "artifactassessment_content": artifactassessment_content,
    "artifactassessment_relatesTo": artifactassessment_relatesTo,
    "auditevent_agent": auditevent_agent,
    "auditevent_entity": auditevent_entity,
    "auditevent_entity_detail": auditevent_entity_detail,
    "auditevent_outcome": auditevent_outcome,
    "auditevent_source": auditevent_source,
    "availability_availableTime": availability_availableTime,
    "availability_notAvailableTime": availability_notAvailableTime,
    "biologicallyderivedproduct_collection": biologicallyderivedproduct_collection,
    "biologicallyderivedproduct_property": biologicallyderivedproduct_property,
    "bodystructure_includedStructure": bodystructure_includedStructure,
    "bodystructure_includedStructure_bodyLandmarkOrientation": bodystructure_includedStructure_bodyLandmarkOrientation,
    "bodystructure_includedStructure_bodyLandmarkOrientation_distanceFromLandmark": bodystructure_includedStructure_bodyLandmarkOrientation_distanceFromLandmark,
    "bundle_entry": bundle_entry,
    "bundle_entry_request": bundle_entry_request,
    "bundle_entry_response": bundle_entry_response,
    "bundle_entry_search": bundle_entry_search,
    "bundle_link": bundle_link,
    "capabilitystatement_document": capabilitystatement_document,
    "capabilitystatement_implementation": capabilitystatement_implementation,
    "capabilitystatement_messaging": capabilitystatement_messaging,
    "capabilitystatement_messaging_endpoint": capabilitystatement_messaging_endpoint,
    "capabilitystatement_messaging_supportedMessage": capabilitystatement_messaging_supportedMessage,
    "capabilitystatement_rest": capabilitystatement_rest,
    "capabilitystatement_rest_interaction": capabilitystatement_rest_interaction,
    "capabilitystatement_rest_resource": capabilitystatement_rest_resource,
    "capabilitystatement_rest_resource_interaction": capabilitystatement_rest_resource_interaction,
    "capabilitystatement_rest_resource_operation": capabilitystatement_rest_resource_operation,
    "capabilitystatement_rest_resource_searchParam": capabilitystatement_rest_resource_searchParam,
    "capabilitystatement_rest_security": capabilitystatement_rest_security,
    "capabilitystatement_software": capabilitystatement_software,
    "careplan_activity": careplan_activity,
    "careteam_participant": careteam_participant,
    "claim_accident": claim_accident,
    "claim_careTeam": claim_careTeam,
    "claim_diagnosis": claim_diagnosis,
    "claim_event": claim_event,
    "claim_insurance": claim_insurance,
    "claim_item": claim_item,
    "claim_item_bodySite": claim_item_bodySite,
    "claim_item_detail": claim_item_detail,
    "claim_item_detail_subDetail": claim_item_detail_subDetail,
    "claim_payee": claim_payee,
    "claim_procedure": claim_procedure,
    "claim_related": claim_related,
    "claim_supportingInfo": claim_supportingInfo,
    "claimresponse_addItem": claimresponse_addItem,
    "claimresponse_addItem_bodySite": claimresponse_addItem_bodySite,
    "claimresponse_addItem_detail": claimresponse_addItem_detail,
    "claimresponse_addItem_detail_subDetail": claimresponse_addItem_detail_subDetail,
    "claimresponse_error": claimresponse_error,
    "claimresponse_event": claimresponse_event,
    "claimresponse_insurance": claimresponse_insurance,
    "claimresponse_item": claimresponse_item,
    "claimresponse_item_adjudication": claimresponse_item_adjudication,
    "claimresponse_item_detail": claimresponse_item_detail,
    "claimresponse_item_detail_subDetail": claimresponse_item_detail_subDetail,
    "claimresponse_item_reviewOutcome": claimresponse_item_reviewOutcome,
    "claimresponse_payment": claimresponse_payment,
    "claimresponse_processNote": claimresponse_processNote,
    "claimresponse_supportingInfo": claimresponse_supportingInfo,
    "claimresponse_total": claimresponse_total,
    "clinicalusedefinition_contraindication": clinicalusedefinition_contraindication,
    "clinicalusedefinition_indication": clinicalusedefinition_indication,
    "clinicalusedefinition_indication_otherTherapy": clinicalusedefinition_indication_otherTherapy,
    "clinicalusedefinition_interaction": clinicalusedefinition_interaction,
    "clinicalusedefinition_interaction_interactant": clinicalusedefinition_interaction_interactant,
    "clinicalusedefinition_undesirableEffect": clinicalusedefinition_undesirableEffect,
    "clinicalusedefinition_warning": clinicalusedefinition_warning,
    "codesystem_concept": codesystem_concept,
    "codesystem_concept_designation": codesystem_concept_designation,
    "codesystem_concept_property": codesystem_concept_property,
    "codesystem_filter": codesystem_filter,
    "codesystem_property": codesystem_property,
    "communication_payload": communication_payload,
    "communicationrequest_payload": communicationrequest_payload,
    "compartmentdefinition_resource": compartmentdefinition_resource,
    "composition_attester": composition_attester,
    "composition_event": composition_event,
    "composition_participant": composition_participant,
    "composition_relatesTo": composition_relatesTo,
    "composition_section": composition_section,
    "conceptmap_additionalAttribute": conceptmap_additionalAttribute,
    "conceptmap_group": conceptmap_group,
    "conceptmap_group_element": conceptmap_group_element,
    "conceptmap_group_element_target": conceptmap_group_element_target,
    "conceptmap_group_element_target_dependsOn": conceptmap_group_element_target_dependsOn,
    "conceptmap_group_element_target_property": conceptmap_group_element_target_property,
    "conceptmap_group_unmapped": conceptmap_group_unmapped,
    "conceptmap_property": conceptmap_property,
    "condition_stage": condition_stage,
    "consent_policyBasis": consent_policyBasis,
    "consent_provision": consent_provision,
    "consent_provision_actor": consent_provision_actor,
    "consent_provision_data": consent_provision_data,
    "consent_verification": consent_verification,
    "contract_contentDefinition": contract_contentDefinition,
    "contract_friendly": contract_friendly,
    "contract_legal": contract_legal,
    "contract_rule": contract_rule,
    "contract_signer": contract_signer,
    "contract_term": contract_term,
    "contract_term_action": contract_term_action,
    "contract_term_action_subject": contract_term_action_subject,
    "contract_term_asset": contract_term_asset,
    "contract_term_asset_context": contract_term_asset_context,
    "contract_term_asset_valuedItem": contract_term_asset_valuedItem,
    "contract_term_offer": contract_term_offer,
    "contract_term_offer_answer": contract_term_offer_answer,
    "contract_term_offer_party": contract_term_offer_party,
    "contract_term_securityLabel": contract_term_securityLabel,
    "coverage_class": coverage_class,
    "coverage_costToBeneficiary": coverage_costToBeneficiary,
    "coverage_costToBeneficiary_exception": coverage_costToBeneficiary_exception,
    "coverage_paymentBy": coverage_paymentBy,
    "coverageeligibilityrequest_event": coverageeligibilityrequest_event,
    "coverageeligibilityrequest_insurance": coverageeligibilityrequest_insurance,
    "coverageeligibilityrequest_item": coverageeligibilityrequest_item,
    "coverageeligibilityrequest_item_diagnosis": coverageeligibilityrequest_item_diagnosis,
    "coverageeligibilityrequest_supportingInfo": coverageeligibilityrequest_supportingInfo,
    "coverageeligibilityresponse_error": coverageeligibilityresponse_error,
    "coverageeligibilityresponse_event": coverageeligibilityresponse_event,
    "coverageeligibilityresponse_insurance": coverageeligibilityresponse_insurance,
    "coverageeligibilityresponse_insurance_item": coverageeligibilityresponse_insurance_item,
    "coverageeligibilityresponse_insurance_item_benefit": coverageeligibilityresponse_insurance_item_benefit,
    "datarequirement_codeFilter": datarequirement_codeFilter,
    "datarequirement_dateFilter": datarequirement_dateFilter,
    "datarequirement_sort": datarequirement_sort,
    "datarequirement_valueFilter": datarequirement_valueFilter,
    "detectedissue_evidence": detectedissue_evidence,
    "detectedissue_mitigation": detectedissue_mitigation,
    "device_additive": device_additive,
    "device_conformsTo": device_conformsTo,
    "device_deviceVersion": device_deviceVersion,
    "device_name": device_name,
    "device_property": device_property,
    "device_udiCarrier": device_udiCarrier,
    "devicealert_derivedFrom": devicealert_derivedFrom,
    "devicealert_signal": devicealert_signal,
    "devicedefinition_chargeItem": devicedefinition_chargeItem,
    "devicedefinition_classification": devicedefinition_classification,
    "devicedefinition_conformsTo": devicedefinition_conformsTo,
    "devicedefinition_correctiveAction": devicedefinition_correctiveAction,
    "devicedefinition_deviceName": devicedefinition_deviceName,
    "devicedefinition_deviceVersion": devicedefinition_deviceVersion,
    "devicedefinition_guideline": devicedefinition_guideline,
    "devicedefinition_hasPart": devicedefinition_hasPart,
    "devicedefinition_link": devicedefinition_link,
    "devicedefinition_material": devicedefinition_material,
    "devicedefinition_packaging": devicedefinition_packaging,
    "devicedefinition_packaging_distributor": devicedefinition_packaging_distributor,
    "devicedefinition_property": devicedefinition_property,
    "devicedefinition_regulatoryIdentifier": devicedefinition_regulatoryIdentifier,
    "devicedefinition_udiDeviceIdentifier": devicedefinition_udiDeviceIdentifier,
    "devicedefinition_udiDeviceIdentifier_marketDistribution": devicedefinition_udiDeviceIdentifier_marketDistribution,
    "devicemetric_calibration": devicemetric_calibration,
    "devicerequest_parameter": devicerequest_parameter,
    "diagnosticreport_media": diagnosticreport_media,
    "diagnosticreport_supportingInfo": diagnosticreport_supportingInfo,
    "documentreference_attester": documentreference_attester,
    "documentreference_content": documentreference_content,
    "documentreference_content_profile": documentreference_content_profile,
    "documentreference_relatesTo": documentreference_relatesTo,
    "dosage_doseAndRate": dosage_doseAndRate,
    "dosagedetails_step": dosagedetails_step,
    "dosagesafety_doseLimit": dosagesafety_doseLimit,
    "elementdefinition_base": elementdefinition_base,
    "elementdefinition_binding": elementdefinition_binding,
    "elementdefinition_binding_additional": elementdefinition_binding_additional,
    "elementdefinition_constraint": elementdefinition_constraint,
    "elementdefinition_example": elementdefinition_example,
    "elementdefinition_mapping": elementdefinition_mapping,
    "elementdefinition_slicing": elementdefinition_slicing,
    "elementdefinition_slicing_discriminator": elementdefinition_slicing_discriminator,
    "elementdefinition_type": elementdefinition_type,
    "encounter_admission": encounter_admission,
    "encounter_businessStatus": encounter_businessStatus,
    "encounter_diagnosis": encounter_diagnosis,
    "encounter_location": encounter_location,
    "encounter_participant": encounter_participant,
    "encounter_reason": encounter_reason,
    "endpoint_payload": endpoint_payload,
    "episodeofcare_diagnosis": episodeofcare_diagnosis,
    "episodeofcare_reason": episodeofcare_reason,
    "episodeofcare_statusHistory": episodeofcare_statusHistory,
    "evidence_certainty": evidence_certainty,
    "evidence_relatesTo": evidence_relatesTo,
    "evidence_statistic": evidence_statistic,
    "evidence_statistic_attributeEstimate": evidence_statistic_attributeEstimate,
    "evidence_statistic_modelCharacteristic": evidence_statistic_modelCharacteristic,
    "evidence_statistic_modelCharacteristic_variable": evidence_statistic_modelCharacteristic_variable,
    "evidence_statistic_sampleSize": evidence_statistic_sampleSize,
    "evidence_variableDefinition": evidence_variableDefinition,
    "evidencevariable_category": evidencevariable_category,
    "evidencevariable_constraint": evidencevariable_constraint,
    "evidencevariable_dataStorage": evidencevariable_dataStorage,
    "evidencevariable_definitionModifier": evidencevariable_definitionModifier,
    "evidencevariable_relatesTo": evidencevariable_relatesTo,
    "examplescenario_actor": examplescenario_actor,
    "examplescenario_instance": examplescenario_instance,
    "examplescenario_instance_containedInstance": examplescenario_instance_containedInstance,
    "examplescenario_instance_version": examplescenario_instance_version,
    "examplescenario_process": examplescenario_process,
    "examplescenario_process_step": examplescenario_process_step,
    "examplescenario_process_step_alternative": examplescenario_process_step_alternative,
    "examplescenario_process_step_operation": examplescenario_process_step_operation,
    "explanationofbenefit_accident": explanationofbenefit_accident,
    "explanationofbenefit_addItem": explanationofbenefit_addItem,
    "explanationofbenefit_addItem_bodySite": explanationofbenefit_addItem_bodySite,
    "explanationofbenefit_addItem_detail": explanationofbenefit_addItem_detail,
    "explanationofbenefit_addItem_detail_subDetail": explanationofbenefit_addItem_detail_subDetail,
    "explanationofbenefit_benefitBalance": explanationofbenefit_benefitBalance,
    "explanationofbenefit_benefitBalance_financial": explanationofbenefit_benefitBalance_financial,
    "explanationofbenefit_careTeam": explanationofbenefit_careTeam,
    "explanationofbenefit_diagnosis": explanationofbenefit_diagnosis,
    "explanationofbenefit_event": explanationofbenefit_event,
    "explanationofbenefit_insurance": explanationofbenefit_insurance,
    "explanationofbenefit_item": explanationofbenefit_item,
    "explanationofbenefit_item_adjudication": explanationofbenefit_item_adjudication,
    "explanationofbenefit_item_bodySite": explanationofbenefit_item_bodySite,
    "explanationofbenefit_item_detail": explanationofbenefit_item_detail,
    "explanationofbenefit_item_detail_subDetail": explanationofbenefit_item_detail_subDetail,
    "explanationofbenefit_item_reviewOutcome": explanationofbenefit_item_reviewOutcome,
    "explanationofbenefit_payee": explanationofbenefit_payee,
    "explanationofbenefit_payment": explanationofbenefit_payment,
    "explanationofbenefit_procedure": explanationofbenefit_procedure,
    "explanationofbenefit_processNote": explanationofbenefit_processNote,
    "explanationofbenefit_related": explanationofbenefit_related,
    "explanationofbenefit_supportingInfo": explanationofbenefit_supportingInfo,
    "explanationofbenefit_total": explanationofbenefit_total,
    "familymemberhistory_condition": familymemberhistory_condition,
    "familymemberhistory_procedure": familymemberhistory_procedure,
    "goal_acceptance": goal_acceptance,
    "goal_target": goal_target,
    "group_characteristic": group_characteristic,
    "group_member": group_member,
    "healthcareservice_eligibility": healthcareservice_eligibility,
    "imagingselection_imageRegion3D": imagingselection_imageRegion3D,
    "imagingselection_instance": imagingselection_instance,
    "imagingselection_instance_imageRegion2D": imagingselection_instance_imageRegion2D,
    "imagingselection_performer": imagingselection_performer,
    "imagingstudy_series": imagingstudy_series,
    "imagingstudy_series_instance": imagingstudy_series_instance,
    "imagingstudy_series_performer": imagingstudy_series_performer,
    "immunization_performer": immunization_performer,
    "immunization_programEligibility": immunization_programEligibility,
    "immunization_protocolApplied": immunization_protocolApplied,
    "immunization_reaction": immunization_reaction,
    "implementationguide_definition": implementationguide_definition,
    "implementationguide_definition_grouping": implementationguide_definition_grouping,
    "implementationguide_definition_page": implementationguide_definition_page,
    "implementationguide_definition_parameter": implementationguide_definition_parameter,
    "implementationguide_definition_resource": implementationguide_definition_resource,
    "implementationguide_definition_template": implementationguide_definition_template,
    "implementationguide_dependsOn": implementationguide_dependsOn,
    "implementationguide_global": implementationguide_global,
    "implementationguide_manifest": implementationguide_manifest,
    "implementationguide_manifest_page": implementationguide_manifest_page,
    "implementationguide_manifest_resource": implementationguide_manifest_resource,
    "ingredient_manufacturer": ingredient_manufacturer,
    "ingredient_substance": ingredient_substance,
    "ingredient_substance_strength": ingredient_substance_strength,
    "ingredient_substance_strength_referenceStrength": ingredient_substance_strength_referenceStrength,
    "insuranceplan_generalCost": insuranceplan_generalCost,
    "insuranceplan_specificCost": insuranceplan_specificCost,
    "insuranceplan_specificCost_benefit": insuranceplan_specificCost_benefit,
    "insuranceplan_specificCost_benefit_cost": insuranceplan_specificCost_benefit_cost,
    "insuranceproduct_coverage": insuranceproduct_coverage,
    "insuranceproduct_coverage_benefit": insuranceproduct_coverage_benefit,
    "insuranceproduct_coverage_benefit_limit": insuranceproduct_coverage_benefit_limit,
    "insuranceproduct_related": insuranceproduct_related,
    "invoice_lineItem": invoice_lineItem,
    "invoice_participant": invoice_participant,
    "list_entry": list_entry,
    "location_position": location_position,
    "manufactureditemdefinition_component": manufactureditemdefinition_component,
    "manufactureditemdefinition_component_constituent": manufactureditemdefinition_component_constituent,
    "manufactureditemdefinition_property": manufactureditemdefinition_property,
    "measure_group": measure_group,
    "measure_group_component": measure_group_component,
    "measure_group_population": measure_group_population,
    "measure_group_stratifier": measure_group_stratifier,
    "measure_group_stratifier_component": measure_group_stratifier_component,
    "measure_supplementalData": measure_supplementalData,
    "measure_term": measure_term,
    "measurereport_group": measurereport_group,
    "measurereport_group_population": measurereport_group_population,
    "measurereport_group_stratifier": measurereport_group_stratifier,
    "measurereport_group_stratifier_stratum": measurereport_group_stratifier_stratum,
    "measurereport_group_stratifier_stratum_component": measurereport_group_stratifier_stratum_component,
    "measurereport_group_stratifier_stratum_population": measurereport_group_stratifier_stratum_population,
    "medication_ingredient": medication_ingredient,
    "medication_instance": medication_instance,
    "medication_packageSize": medication_packageSize,
    "medicationadministration_dosage": medicationadministration_dosage,
    "medicationadministration_performer": medicationadministration_performer,
    "medicationdispense_performer": medicationdispense_performer,
    "medicationdispense_substitution": medicationdispense_substitution,
    "medicationrequest_dispenseRequest": medicationrequest_dispenseRequest,
    "medicationrequest_dispenseRequest_initialFill": medicationrequest_dispenseRequest_initialFill,
    "medicationrequest_substitution": medicationrequest_substitution,
    "medicationstatement_adherence": medicationstatement_adherence,
    "medicinalproductdefinition_characteristic": medicinalproductdefinition_characteristic,
    "medicinalproductdefinition_contact": medicinalproductdefinition_contact,
    "medicinalproductdefinition_crossReference": medicinalproductdefinition_crossReference,
    "medicinalproductdefinition_name": medicinalproductdefinition_name,
    "medicinalproductdefinition_name_part": medicinalproductdefinition_name_part,
    "medicinalproductdefinition_name_usage": medicinalproductdefinition_name_usage,
    "medicinalproductdefinition_operation": medicinalproductdefinition_operation,
    "messagedefinition_allowedResponse": messagedefinition_allowedResponse,
    "messagedefinition_focus": messagedefinition_focus,
    "messageheader_destination": messageheader_destination,
    "messageheader_response": messageheader_response,
    "messageheader_source": messageheader_source,
    "namingsystem_uniqueId": namingsystem_uniqueId,
    "nutritionintake_nutritionItem": nutritionintake_nutritionItem,
    "nutritionintake_nutritionItem_consumedItem": nutritionintake_nutritionItem_consumedItem,
    "nutritionintake_nutritionItem_consumedItem_totalIntake": nutritionintake_nutritionItem_consumedItem_totalIntake,
    "nutritionintake_nutritionItem_notConsumedItem": nutritionintake_nutritionItem_notConsumedItem,
    "nutritionintake_performer": nutritionintake_performer,
    "nutritionorder_additive": nutritionorder_additive,
    "nutritionorder_enteralFormula": nutritionorder_enteralFormula,
    "nutritionorder_enteralFormula_administration": nutritionorder_enteralFormula_administration,
    "nutritionorder_enteralFormula_administration_schedule": nutritionorder_enteralFormula_administration_schedule,
    "nutritionorder_oralDiet": nutritionorder_oralDiet,
    "nutritionorder_oralDiet_nutrient": nutritionorder_oralDiet_nutrient,
    "nutritionorder_oralDiet_schedule": nutritionorder_oralDiet_schedule,
    "nutritionorder_oralDiet_texture": nutritionorder_oralDiet_texture,
    "nutritionorder_supplement": nutritionorder_supplement,
    "nutritionorder_supplement_schedule": nutritionorder_supplement_schedule,
    "nutritionproduct_characteristic": nutritionproduct_characteristic,
    "nutritionproduct_ingredient": nutritionproduct_ingredient,
    "nutritionproduct_instance": nutritionproduct_instance,
    "nutritionproduct_nutrient": nutritionproduct_nutrient,
    "observation_component": observation_component,
    "observation_referenceRange": observation_referenceRange,
    "observation_triggeredBy": observation_triggeredBy,
    "observationdefinition_component": observationdefinition_component,
    "observationdefinition_qualifiedValue": observationdefinition_qualifiedValue,
    "operationdefinition_overload": operationdefinition_overload,
    "operationdefinition_parameter": operationdefinition_parameter,
    "operationdefinition_parameter_binding": operationdefinition_parameter_binding,
    "operationdefinition_parameter_referencedFrom": operationdefinition_parameter_referencedFrom,
    "operationoutcome_issue": operationoutcome_issue,
    "organization_qualification": organization_qualification,
    "packagedproductdefinition_legalStatusOfSupply": packagedproductdefinition_legalStatusOfSupply,
    "packagedproductdefinition_packaging": packagedproductdefinition_packaging,
    "packagedproductdefinition_packaging_containedItem": packagedproductdefinition_packaging_containedItem,
    "packagedproductdefinition_packaging_property": packagedproductdefinition_packaging_property,
    "parameters_parameter": parameters_parameter,
    "patient_communication": patient_communication,
    "patient_contact": patient_contact,
    "patient_link": patient_link,
    "paymentreconciliation_allocation": paymentreconciliation_allocation,
    "paymentreconciliation_processNote": paymentreconciliation_processNote,
    "person_communication": person_communication,
    "person_link": person_link,
    "plandefinition_action": plandefinition_action,
    "plandefinition_action_condition": plandefinition_action_condition,
    "plandefinition_action_dynamicValue": plandefinition_action_dynamicValue,
    "plandefinition_action_input": plandefinition_action_input,
    "plandefinition_action_output": plandefinition_action_output,
    "plandefinition_action_participant": plandefinition_action_participant,
    "plandefinition_action_relatedAction": plandefinition_action_relatedAction,
    "plandefinition_actor": plandefinition_actor,
    "plandefinition_actor_option": plandefinition_actor_option,
    "plandefinition_goal": plandefinition_goal,
    "plandefinition_goal_target": plandefinition_goal_target,
    "practitioner_communication": practitioner_communication,
    "practitioner_qualification": practitioner_qualification,
    "procedure_focalDevice": procedure_focalDevice,
    "procedure_performer": procedure_performer,
    "provenance_agent": provenance_agent,
    "provenance_entity": provenance_entity,
    "questionnaire_item": questionnaire_item,
    "questionnaire_item_answerOption": questionnaire_item_answerOption,
    "questionnaire_item_enableWhen": questionnaire_item_enableWhen,
    "questionnaire_item_initial": questionnaire_item_initial,
    "questionnaireresponse_item": questionnaireresponse_item,
    "questionnaireresponse_item_answer": questionnaireresponse_item_answer,
    "regulatedauthorization_case": regulatedauthorization_case,
    "relatedperson_communication": relatedperson_communication,
    "requestorchestration_action": requestorchestration_action,
    "requestorchestration_action_condition": requestorchestration_action_condition,
    "requestorchestration_action_dynamicValue": requestorchestration_action_dynamicValue,
    "requestorchestration_action_input": requestorchestration_action_input,
    "requestorchestration_action_output": requestorchestration_action_output,
    "requestorchestration_action_participant": requestorchestration_action_participant,
    "requestorchestration_action_relatedAction": requestorchestration_action_relatedAction,
    "requirements_actor": requirements_actor,
    "requirements_imports": requirements_imports,
    "requirements_statement": requirements_statement,
    "requirements_statement_derivedFrom": requirements_statement_derivedFrom,
    "requirements_statement_partOf": requirements_statement_partOf,
    "researchstudy_associatedParty": researchstudy_associatedParty,
    "researchstudy_comparisonGroup": researchstudy_comparisonGroup,
    "researchstudy_label": researchstudy_label,
    "researchstudy_objective": researchstudy_objective,
    "researchstudy_objective_outcomeMeasure": researchstudy_objective_outcomeMeasure,
    "researchstudy_objective_outcomeMeasure_eventHandling": researchstudy_objective_outcomeMeasure_eventHandling,
    "researchstudy_progressStatus": researchstudy_progressStatus,
    "researchstudy_recruitment": researchstudy_recruitment,
    "researchstudy_relatesTo": researchstudy_relatesTo,
    "researchsubject_subjectMilestone": researchsubject_subjectMilestone,
    "researchsubject_subjectState": researchsubject_subjectState,
    "riskassessment_prediction": riskassessment_prediction,
    "searchparameter_component": searchparameter_component,
    "servicerequest_orderDetail": servicerequest_orderDetail,
    "servicerequest_orderDetail_parameter": servicerequest_orderDetail_parameter,
    "servicerequest_patientInstruction": servicerequest_patientInstruction,
    "specimen_collection": specimen_collection,
    "specimen_container": specimen_container,
    "specimen_feature": specimen_feature,
    "specimen_processing": specimen_processing,
    "specimendefinition_typeTested": specimendefinition_typeTested,
    "specimendefinition_typeTested_container": specimendefinition_typeTested_container,
    "specimendefinition_typeTested_container_additive": specimendefinition_typeTested_container_additive,
    "specimendefinition_typeTested_handling": specimendefinition_typeTested_handling,
    "structuredefinition_context": structuredefinition_context,
    "structuredefinition_differential": structuredefinition_differential,
    "structuredefinition_mapping": structuredefinition_mapping,
    "structuredefinition_snapshot": structuredefinition_snapshot,
    "structuremap_const": structuremap_const,
    "structuremap_group": structuremap_group,
    "structuremap_group_input": structuremap_group_input,
    "structuremap_group_rule": structuremap_group_rule,
    "structuremap_group_rule_dependent": structuremap_group_rule_dependent,
    "structuremap_group_rule_source": structuremap_group_rule_source,
    "structuremap_group_rule_target": structuremap_group_rule_target,
    "structuremap_group_rule_target_parameter": structuremap_group_rule_target_parameter,
    "structuremap_structure": structuremap_structure,
    "subscription_filterBy": subscription_filterBy,
    "subscription_parameter": subscription_parameter,
    "subscriptionstatus_notificationEvent": subscriptionstatus_notificationEvent,
    "subscriptionstatus_notificationEvent_authorizationHint": subscriptionstatus_notificationEvent_authorizationHint,
    "subscriptionstatus_notificationEvent_relatedQuery": subscriptionstatus_notificationEvent_relatedQuery,
    "subscriptiontopic_trigger": subscriptiontopic_trigger,
    "subscriptiontopic_trigger_canFilterBy": subscriptiontopic_trigger_canFilterBy,
    "subscriptiontopic_trigger_notificationShape": subscriptiontopic_trigger_notificationShape,
    "subscriptiontopic_trigger_notificationShape_relatedQuery": subscriptiontopic_trigger_notificationShape_relatedQuery,
    "subscriptiontopic_trigger_queryCriteria": subscriptiontopic_trigger_queryCriteria,
    "substancedefinition_characterization": substancedefinition_characterization,
    "substancedefinition_code": substancedefinition_code,
    "substancedefinition_moiety": substancedefinition_moiety,
    "substancedefinition_molecularWeight": substancedefinition_molecularWeight,
    "substancedefinition_name": substancedefinition_name,
    "substancedefinition_name_official": substancedefinition_name_official,
    "substancedefinition_property": substancedefinition_property,
    "substancedefinition_relationship": substancedefinition_relationship,
    "substancedefinition_sourceMaterial": substancedefinition_sourceMaterial,
    "substancedefinition_structure": substancedefinition_structure,
    "substancedefinition_structure_representation": substancedefinition_structure_representation,
    "task_focus": task_focus,
    "task_input": task_input,
    "task_output": task_output,
    "task_performer": task_performer,
    "task_restriction": task_restriction,
    "terminologycapabilities_codeSystem": terminologycapabilities_codeSystem,
    "terminologycapabilities_codeSystem_version": terminologycapabilities_codeSystem_version,
    "terminologycapabilities_codeSystem_version_filter": terminologycapabilities_codeSystem_version_filter,
    "terminologycapabilities_expansion": terminologycapabilities_expansion,
    "terminologycapabilities_expansion_parameter": terminologycapabilities_expansion_parameter,
    "terminologycapabilities_implementation": terminologycapabilities_implementation,
    "terminologycapabilities_software": terminologycapabilities_software,
    "terminologycapabilities_supplements": terminologycapabilities_supplements,
    "terminologycapabilities_translation": terminologycapabilities_translation,
    "terminologycapabilities_validateCode": terminologycapabilities_validateCode,
    "timing_repeat": timing_repeat,
    "valueset_compose": valueset_compose,
    "valueset_compose_include": valueset_compose_include,
    "valueset_compose_include_concept": valueset_compose_include_concept,
    "valueset_compose_include_concept_designation": valueset_compose_include_concept_designation,
    "valueset_compose_include_filter": valueset_compose_include_filter,
    "valueset_expansion": valueset_expansion,
    "valueset_expansion_contains": valueset_expansion_contains,
    "valueset_expansion_contains_property": valueset_expansion_contains_property,
    "valueset_expansion_contains_property_subProperty": valueset_expansion_contains_property_subProperty,
    "valueset_expansion_parameter": valueset_expansion_parameter,
    "valueset_expansion_property": valueset_expansion_property,
    "visionprescription_lensSpecification": visionprescription_lensSpecification,
    "visionprescription_lensSpecification_prism": visionprescription_lensSpecification_prism,
});
