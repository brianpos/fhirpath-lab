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
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "billingStatus", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }], IsArray: true },
        { ElementName: "servicePeriod", Type: [{ TypeName: "Period" }] },
        { ElementName: "covers", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter", "http://hl7.org/fhir/StructureDefinition/EpisodeOfCare"] }], IsArray: true },
        { ElementName: "coverage", Type: [{ TypeName: "account_coverage" }], IsArray: true },
        { ElementName: "owner", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "guarantor", Type: [{ TypeName: "account_guarantor" }], IsArray: true },
        { ElementName: "diagnosis", Type: [{ TypeName: "account_diagnosis" }], IsArray: true },
        { ElementName: "procedure", Type: [{ TypeName: "account_procedure" }], IsArray: true },
        { ElementName: "parent", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Account"] }] },
        { ElementName: "currency", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "balance", Type: [{ TypeName: "account_balance" }], IsArray: true },
        { ElementName: "calculatedAt", Type: [{ TypeName: "instant" }] },
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
        { ElementName: "party", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "onHold", Type: [{ TypeName: "boolean" }] },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "account", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Account"] }] },
        { ElementName: "responsibility", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "limit", Type: [{ TypeName: "Money" }] },
        { ElementName: "rank", Type: [{ TypeName: "positiveInt" }] },
    ],
};

export const account_diagnosis: TypeModel = {
    TypeName: "account_diagnosis",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "sequence", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "condition", Type: [{ TypeName: "CodeableReference" }], Required: true },
        { ElementName: "dateOfDiagnosis", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "onAdmission", Type: [{ TypeName: "boolean" }] },
        { ElementName: "packageCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
    ],
};

export const account_procedure: TypeModel = {
    TypeName: "account_procedure",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "sequence", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableReference" }], Required: true },
        { ElementName: "dateOfService", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "packageCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "device", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }], IsArray: true },
    ],
};

export const account_balance: TypeModel = {
    TypeName: "account_balance",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "aggregate", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "term", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "estimate", Type: [{ TypeName: "boolean" }] },
        { ElementName: "amount", Type: [{ TypeName: "Money" }], Required: true },
    ],
};

export const ActivityDefinition: TypeModel = {
    TypeName: "ActivityDefinition",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "versionAlgorithm[x]", Type: [{ TypeName: "Coding" }, { TypeName: "string" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "subtitle", Type: [{ TypeName: "string" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "experimental", Type: [{ TypeName: "boolean" }] },
        { ElementName: "subject[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/AdministrableProductDefinition", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/ManufacturedItemDefinition", "http://hl7.org/fhir/StructureDefinition/MedicinalProductDefinition", "http://hl7.org/fhir/StructureDefinition/PackagedProductDefinition", "http://hl7.org/fhir/StructureDefinition/SubstanceDefinition"] }, { TypeName: "canonical" }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "publisher", Type: [{ TypeName: "string" }] },
        { ElementName: "contact", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "useContext", Type: [{ TypeName: "UsageContext" }], IsArray: true },
        { ElementName: "jurisdiction", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "purpose", Type: [{ TypeName: "markdown" }] },
        { ElementName: "usage", Type: [{ TypeName: "markdown" }] },
        { ElementName: "copyright", Type: [{ TypeName: "markdown" }] },
        { ElementName: "copyrightLabel", Type: [{ TypeName: "string" }] },
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
        { ElementName: "timing[x]", Type: [{ TypeName: "Age" }, { TypeName: "Duration" }, { TypeName: "Range" }, { TypeName: "RelativeTime" }, { TypeName: "Timing" }] },
        { ElementName: "asNeeded[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "boolean" }] },
        { ElementName: "location", Type: [{ TypeName: "CodeableReference" }] },
        { ElementName: "participant", Type: [{ TypeName: "activitydefinition_participant" }], IsArray: true },
        { ElementName: "product[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Ingredient", "http://hl7.org/fhir/StructureDefinition/Medication", "http://hl7.org/fhir/StructureDefinition/MedicinalProductDefinition", "http://hl7.org/fhir/StructureDefinition/SubstanceDefinition"] }] },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "dosageInstruction", Type: [{ TypeName: "DosageDetails" }] },
        { ElementName: "bodySite", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "specimenRequirement", Type: [{ TypeName: "canonical" }], IsArray: true },
        { ElementName: "observationRequirement", Type: [{ TypeName: "canonical" }], IsArray: true },
        { ElementName: "observationResultRequirement", Type: [{ TypeName: "canonical" }], IsArray: true },
        { ElementName: "transform", Type: [{ TypeName: "canonical" }] },
        { ElementName: "dynamicValue", Type: [{ TypeName: "activitydefinition_dynamicValue" }], IsArray: true },
    ],
};

export const activitydefinition_participant: TypeModel = {
    TypeName: "activitydefinition_participant",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "code" }] },
        { ElementName: "typeCanonical", Type: [{ TypeName: "canonical" }] },
        { ElementName: "typeReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/BiologicallyDerivedProduct", "http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Endpoint", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Medication", "http://hl7.org/fhir/StructureDefinition/MedicinalProductDefinition", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson", "http://hl7.org/fhir/StructureDefinition/Specimen", "http://hl7.org/fhir/StructureDefinition/Substance", "http://hl7.org/fhir/StructureDefinition/SubstanceDefinition"] }] },
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "function", Type: [{ TypeName: "CodeableConcept" }] },
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

export const ActorDefinition: TypeModel = {
    TypeName: "ActorDefinition",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "versionAlgorithm[x]", Type: [{ TypeName: "Coding" }, { TypeName: "string" }] },
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
        { ElementName: "copyrightLabel", Type: [{ TypeName: "string" }] },
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "documentation", Type: [{ TypeName: "markdown" }] },
        { ElementName: "reference", Type: [{ TypeName: "url" }], IsArray: true },
        { ElementName: "baseDefinition", Type: [{ TypeName: "canonical" }], IsArray: true },
    ],
};

export const AdministrableProductDefinition: TypeModel = {
    TypeName: "AdministrableProductDefinition",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "formOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MedicinalProductDefinition"] }], IsArray: true },
        { ElementName: "administrableDoseForm", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "unitOfPresentation", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "producedFrom", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ManufacturedItemDefinition"] }], IsArray: true },
        { ElementName: "ingredient", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "device", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DeviceDefinition"] }] },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "code", Type: [{ TypeName: "Coding" }], IsArray: true },
        { ElementName: "property", Type: [{ TypeName: "administrableproductdefinition_property" }], IsArray: true },
        { ElementName: "routeOfAdministration", Type: [{ TypeName: "administrableproductdefinition_routeOfAdministration" }], IsArray: true, Required: true },
    ],
};

export const administrableproductdefinition_property: TypeModel = {
    TypeName: "administrableproductdefinition_property",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "CodeableConcept" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Binary"] }, { TypeName: "boolean" }, { TypeName: "date" }, { TypeName: "markdown" }] },
        { ElementName: "status", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const administrableproductdefinition_routeOfAdministration: TypeModel = {
    TypeName: "administrableproductdefinition_routeOfAdministration",
    BaseTypeName: "BackboneElement",
    Elements: [
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
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "withdrawalPeriod", Type: [{ TypeName: "administrableproductdefinition_routeOfAdministration_targetSpecies_withdrawalPeriod" }], IsArray: true },
    ],
};

export const administrableproductdefinition_routeOfAdministration_targetSpecies_withdrawalPeriod: TypeModel = {
    TypeName: "administrableproductdefinition_routeOfAdministration_targetSpecies_withdrawalPeriod",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "tissue", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "value", Type: [{ TypeName: "Quantity" }], Required: true },
        { ElementName: "supportingInformation", Type: [{ TypeName: "string" }] },
    ],
};

export const AdverseEvent: TypeModel = {
    TypeName: "AdverseEvent",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "actuality", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "effect[x]", Type: [{ TypeName: "Period" }, { TypeName: "dateTime" }] },
        { ElementName: "detected", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "recordedDate", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "resultingEffect", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "location", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "seriousness", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "outcome", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "recorder", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "participant", Type: [{ TypeName: "adverseevent_participant" }], IsArray: true },
        { ElementName: "study", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ResearchStudy"] }], IsArray: true },
        { ElementName: "expectedInResearchStudy", Type: [{ TypeName: "boolean" }] },
        { ElementName: "suspectEntity", Type: [{ TypeName: "adverseevent_suspectEntity" }], IsArray: true },
        { ElementName: "contributingFactor", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "preventiveAction", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "mitigatingAction", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "supportingInfo", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
    ],
};

export const adverseevent_participant: TypeModel = {
    TypeName: "adverseevent_participant",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "function", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "actor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
    ],
};

export const adverseevent_suspectEntity: TypeModel = {
    TypeName: "adverseevent_suspectEntity",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "instance", Type: [{ TypeName: "CodeableReference" }], Required: true },
        { ElementName: "causality", Type: [{ TypeName: "adverseevent_suspectEntity_causality" }] },
        { ElementName: "occurrence[x]", Type: [{ TypeName: "Period" }, { TypeName: "dateTime" }] },
    ],
};

export const adverseevent_suspectEntity_causality: TypeModel = {
    TypeName: "adverseevent_suspectEntity_causality",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "assessmentMethod", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "entityRelatedness", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "author", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
    ],
};

export const AllergyIntolerance: TypeModel = {
    TypeName: "AllergyIntolerance",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "clinicalStatus", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "verificationStatus", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "criticality", Type: [{ TypeName: "code" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "patient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "onset[x]", Type: [{ TypeName: "Age" }, { TypeName: "Period" }, { TypeName: "Range" }, { TypeName: "dateTime" }, { TypeName: "string" }] },
        { ElementName: "recordedDate", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "recorder", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
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
        { ElementName: "manifestation", Type: [{ TypeName: "CodeableReference" }], IsArray: true, Required: true },
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
        { ElementName: "cancellationReason", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "class", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "serviceCategory", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "serviceType", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "specialty", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "appointmentType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "reason", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "priority", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "replaces", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Appointment"] }], IsArray: true },
        { ElementName: "virtualService", Type: [{ TypeName: "VirtualServiceDetail" }], IsArray: true },
        { ElementName: "supportingInformation", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "previousAppointment", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Appointment"] }] },
        { ElementName: "originatingAppointment", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Appointment"] }] },
        { ElementName: "start", Type: [{ TypeName: "instant" }] },
        { ElementName: "end", Type: [{ TypeName: "instant" }] },
        { ElementName: "minutesDuration", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "requestedPeriod", Type: [{ TypeName: "Period" }], IsArray: true },
        { ElementName: "slot", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Slot"] }], IsArray: true },
        { ElementName: "account", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Account"] }], IsArray: true },
        { ElementName: "created", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "cancellationDate", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "patientInstruction", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "basedOn", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CarePlan", "http://hl7.org/fhir/StructureDefinition/DeviceRequest", "http://hl7.org/fhir/StructureDefinition/MedicationRequest", "http://hl7.org/fhir/StructureDefinition/NutritionOrder", "http://hl7.org/fhir/StructureDefinition/RequestOrchestration", "http://hl7.org/fhir/StructureDefinition/ServiceRequest", "http://hl7.org/fhir/StructureDefinition/VisionPrescription"] }], IsArray: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Patient"] }] },
        { ElementName: "participant", Type: [{ TypeName: "appointment_participant" }], IsArray: true, Required: true },
        { ElementName: "recurrenceId", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "occurrenceChanged", Type: [{ TypeName: "boolean" }] },
        { ElementName: "recurrenceTemplate", Type: [{ TypeName: "appointment_recurrenceTemplate" }], IsArray: true },
    ],
};

export const appointment_participant: TypeModel = {
    TypeName: "appointment_participant",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "actor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "required", Type: [{ TypeName: "boolean" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }] },
    ],
};

export const appointment_recurrenceTemplate: TypeModel = {
    TypeName: "appointment_recurrenceTemplate",
    BaseTypeName: "BackboneElement",
    Elements: [
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

export const appointment_recurrenceTemplate_weeklyTemplate: TypeModel = {
    TypeName: "appointment_recurrenceTemplate_weeklyTemplate",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "daysOfWeek", Type: [{ TypeName: "code" }], IsArray: true, Required: true },
        { ElementName: "weekInterval", Type: [{ TypeName: "positiveInt" }] },
    ],
};

export const appointment_recurrenceTemplate_monthlyTemplate: TypeModel = {
    TypeName: "appointment_recurrenceTemplate_monthlyTemplate",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "dayOfMonth", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "nthWeekOfMonth", Type: [{ TypeName: "code" }] },
        { ElementName: "dayOfWeek", Type: [{ TypeName: "code" }] },
        { ElementName: "monthInterval", Type: [{ TypeName: "positiveInt" }], Required: true },
    ],
};

export const appointment_recurrenceTemplate_yearlyTemplate: TypeModel = {
    TypeName: "appointment_recurrenceTemplate_yearlyTemplate",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "yearInterval", Type: [{ TypeName: "positiveInt" }], Required: true },
    ],
};

export const AppointmentResponse: TypeModel = {
    TypeName: "AppointmentResponse",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "appointment", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Appointment"] }], Required: true },
        { ElementName: "proposedNewTime", Type: [{ TypeName: "boolean" }] },
        { ElementName: "start", Type: [{ TypeName: "instant" }] },
        { ElementName: "end", Type: [{ TypeName: "instant" }] },
        { ElementName: "participantType", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "actor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "participantStatus", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "comment", Type: [{ TypeName: "markdown" }] },
        { ElementName: "recurring", Type: [{ TypeName: "boolean" }] },
        { ElementName: "occurrenceDate", Type: [{ TypeName: "date" }] },
        { ElementName: "recurrenceId", Type: [{ TypeName: "positiveInt" }] },
    ],
};

export const ArtifactAssessment: TypeModel = {
    TypeName: "ArtifactAssessment",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "citeAs", Type: [{ TypeName: "markdown" }] },
        { ElementName: "artifact[x]", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }, { TypeName: "canonical" }, { TypeName: "uri" }], Required: true },
        { ElementName: "relatesTo", Type: [{ TypeName: "artifactassessment_relatesTo" }], IsArray: true },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "copyright", Type: [{ TypeName: "markdown" }] },
        { ElementName: "approvalDate", Type: [{ TypeName: "date" }] },
        { ElementName: "lastReviewDate", Type: [{ TypeName: "date" }] },
        { ElementName: "content", Type: [{ TypeName: "artifactassessment_content" }], IsArray: true },
        { ElementName: "workflowStatus", Type: [{ TypeName: "code" }] },
        { ElementName: "disposition", Type: [{ TypeName: "code" }] },
    ],
};

export const artifactassessment_relatesTo: TypeModel = {
    TypeName: "artifactassessment_relatesTo",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "target[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }, { TypeName: "canonical" }, { TypeName: "markdown" }, { TypeName: "uri" }], Required: true },
    ],
};

export const artifactassessment_content: TypeModel = {
    TypeName: "artifactassessment_content",
    BaseTypeName: "BackboneElement",
    Elements: [
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

export const AuditEvent: TypeModel = {
    TypeName: "AuditEvent",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "subtype", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "action", Type: [{ TypeName: "code" }] },
        { ElementName: "severity", Type: [{ TypeName: "code" }] },
        { ElementName: "occurred[x]", Type: [{ TypeName: "Period" }, { TypeName: "dateTime" }] },
        { ElementName: "recorded", Type: [{ TypeName: "instant" }], Required: true },
        { ElementName: "outcome", Type: [{ TypeName: "auditevent_outcome" }] },
        { ElementName: "authorization", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "basedOn", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "patient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }] },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "agent", Type: [{ TypeName: "auditevent_agent" }], IsArray: true, Required: true },
        { ElementName: "source", Type: [{ TypeName: "auditevent_source" }], Required: true },
        { ElementName: "entity", Type: [{ TypeName: "auditevent_entity" }], IsArray: true },
    ],
};

export const auditevent_outcome: TypeModel = {
    TypeName: "auditevent_outcome",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "Coding" }], Required: true },
        { ElementName: "detail", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
    ],
};

export const auditevent_agent: TypeModel = {
    TypeName: "auditevent_agent",
    BaseTypeName: "BackboneElement",
    Elements: [
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

export const auditevent_source: TypeModel = {
    TypeName: "auditevent_source",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "site", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "observer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
    ],
};

export const auditevent_entity: TypeModel = {
    TypeName: "auditevent_entity",
    BaseTypeName: "BackboneElement",
    Elements: [
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
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "base64Binary" }, { TypeName: "boolean" }, { TypeName: "dateTime" }, { TypeName: "integer" }, { TypeName: "string" }, { TypeName: "time" }], Required: true },
    ],
};

export const Basic: TypeModel = {
    TypeName: "Basic",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
        { ElementName: "created", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "author", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
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
        { ElementName: "productCategory", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "productCode", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "parent", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/BiologicallyDerivedProduct"] }], IsArray: true },
        { ElementName: "request", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ServiceRequest"] }], IsArray: true },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "therapyIdentifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "biologicalSourceEvent", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "processingFacility", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }], IsArray: true },
        { ElementName: "division", Type: [{ TypeName: "string" }] },
        { ElementName: "productStatus", Type: [{ TypeName: "Coding" }] },
        { ElementName: "expirationDate", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "collection", Type: [{ TypeName: "biologicallyderivedproduct_collection" }] },
        { ElementName: "storageTempRequirements", Type: [{ TypeName: "Range" }] },
        { ElementName: "property", Type: [{ TypeName: "biologicallyderivedproduct_property" }], IsArray: true },
    ],
};

export const biologicallyderivedproduct_collection: TypeModel = {
    TypeName: "biologicallyderivedproduct_collection",
    BaseTypeName: "BackboneElement",
    Elements: [
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
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "CodeableConcept" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "boolean" }, { TypeName: "integer" }, { TypeName: "string" }], Required: true },
    ],
};

export const BodyStructure: TypeModel = {
    TypeName: "BodyStructure",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "active", Type: [{ TypeName: "boolean" }] },
        { ElementName: "includedStructure", Type: [{ TypeName: "bodystructure_includedStructure" }], IsArray: true, Required: true },
        { ElementName: "excludedStructure", Type: [{ TypeName: "bodystructure_includedStructure" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "image", Type: [{ TypeName: "Attachment" }], IsArray: true },
        { ElementName: "patient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }] },
    ],
};

export const bodystructure_includedStructure: TypeModel = {
    TypeName: "bodystructure_includedStructure",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "structure", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "laterality", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "bodyLandmarkOrientation", Type: [{ TypeName: "bodystructure_includedStructure_bodyLandmarkOrientation" }], IsArray: true },
        { ElementName: "spatialReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ImagingSelection"] }], IsArray: true },
        { ElementName: "image", Type: [{ TypeName: "Attachment" }], IsArray: true },
        { ElementName: "qualifier", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "morphology", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "origin", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
    ],
};

export const bodystructure_includedStructure_bodyLandmarkOrientation: TypeModel = {
    TypeName: "bodystructure_includedStructure_bodyLandmarkOrientation",
    BaseTypeName: "BackboneElement",
    Elements: [
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
        { ElementName: "device", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "value", Type: [{ TypeName: "Quantity" }], IsArray: true },
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
        { ElementName: "issues", Type: [{ TypeName: "Resource" }] },
    ],
};

export const bundle_link: TypeModel = {
    TypeName: "bundle_link",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "relation", Type: [{ TypeName: "code" }], Required: true },
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

export const CanonicalResource: TypeModel = {
    TypeName: "CanonicalResource",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "versionAlgorithm[x]", Type: [{ TypeName: "Coding" }, { TypeName: "string" }] },
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
        { ElementName: "copyrightLabel", Type: [{ TypeName: "string" }] },
    ],
};

export const CapabilityStatement: TypeModel = {
    TypeName: "CapabilityStatement",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "versionAlgorithm[x]", Type: [{ TypeName: "Coding" }, { TypeName: "string" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "experimental", Type: [{ TypeName: "boolean" }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }], Required: true },
        { ElementName: "publisher", Type: [{ TypeName: "string" }] },
        { ElementName: "contact", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "useContext", Type: [{ TypeName: "UsageContext" }], IsArray: true },
        { ElementName: "actorDefinition", Type: [{ TypeName: "canonical" }], IsArray: true },
        { ElementName: "jurisdiction", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "purpose", Type: [{ TypeName: "markdown" }] },
        { ElementName: "copyright", Type: [{ TypeName: "markdown" }] },
        { ElementName: "copyrightLabel", Type: [{ TypeName: "string" }] },
        { ElementName: "kind", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "instantiates", Type: [{ TypeName: "canonical" }], IsArray: true },
        { ElementName: "imports", Type: [{ TypeName: "canonical" }], IsArray: true },
        { ElementName: "software", Type: [{ TypeName: "capabilitystatement_software" }] },
        { ElementName: "implementation", Type: [{ TypeName: "capabilitystatement_implementation" }] },
        { ElementName: "fhirVersion", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "format", Type: [{ TypeName: "code" }], IsArray: true, Required: true },
        { ElementName: "patchFormat", Type: [{ TypeName: "code" }], IsArray: true },
        { ElementName: "acceptLanguage", Type: [{ TypeName: "code" }], IsArray: true },
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
        { ElementName: "description", Type: [{ TypeName: "markdown" }], Required: true },
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
        { ElementName: "basedOn", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CarePlan", "http://hl7.org/fhir/StructureDefinition/NutritionOrder", "http://hl7.org/fhir/StructureDefinition/RequestOrchestration", "http://hl7.org/fhir/StructureDefinition/ServiceRequest"] }], IsArray: true },
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
        { ElementName: "custodian", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "contributor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], IsArray: true },
        { ElementName: "careTeam", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam"] }], IsArray: true },
        { ElementName: "addresses", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
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
        { ElementName: "performedActivity", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "progress", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "plannedActivityReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Appointment", "http://hl7.org/fhir/StructureDefinition/CommunicationRequest", "http://hl7.org/fhir/StructureDefinition/DeviceRequest", "http://hl7.org/fhir/StructureDefinition/MedicationRequest", "http://hl7.org/fhir/StructureDefinition/NutritionOrder", "http://hl7.org/fhir/StructureDefinition/RequestOrchestration", "http://hl7.org/fhir/StructureDefinition/ServiceRequest", "http://hl7.org/fhir/StructureDefinition/Task", "http://hl7.org/fhir/StructureDefinition/VisionPrescription"] }] },
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
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "participant", Type: [{ TypeName: "careteam_participant" }], IsArray: true },
        { ElementName: "reason", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "managingOrganization", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }], IsArray: true },
        { ElementName: "telecom", Type: [{ TypeName: "ContactPoint" }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
    ],
};

export const careteam_participant: TypeModel = {
    TypeName: "careteam_participant",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "member", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "onBehalfOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "effective[x]", Type: [{ TypeName: "Period" }, { TypeName: "Timing" }] },
        { ElementName: "supportingInfo", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
    ],
};

export const Claim: TypeModel = {
    TypeName: "Claim",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "traceNumber", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "statusReason", Type: [{ TypeName: "string" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "subType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "use", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
        { ElementName: "billablePeriod", Type: [{ TypeName: "Period" }] },
        { ElementName: "created", Type: [{ TypeName: "dateTime" }], Required: true },
        { ElementName: "enterer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "insurer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "provider", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "priority", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "fundsReserve", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "related", Type: [{ TypeName: "claim_related" }], IsArray: true },
        { ElementName: "request", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DeviceRequest", "http://hl7.org/fhir/StructureDefinition/MedicationRequest", "http://hl7.org/fhir/StructureDefinition/NutritionOrder", "http://hl7.org/fhir/StructureDefinition/RequestOrchestration", "http://hl7.org/fhir/StructureDefinition/ServiceRequest", "http://hl7.org/fhir/StructureDefinition/VisionPrescription"] }] },
        { ElementName: "originalPrescription", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DeviceRequest", "http://hl7.org/fhir/StructureDefinition/MedicationRequest", "http://hl7.org/fhir/StructureDefinition/ServiceRequest", "http://hl7.org/fhir/StructureDefinition/VisionPrescription"] }] },
        { ElementName: "payee", Type: [{ TypeName: "claim_payee" }] },
        { ElementName: "referral", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ServiceRequest"] }] },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }], IsArray: true },
        { ElementName: "facility", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "diagnosisRelatedGroup", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "event", Type: [{ TypeName: "claim_event" }], IsArray: true },
        { ElementName: "careTeam", Type: [{ TypeName: "claim_careTeam" }], IsArray: true },
        { ElementName: "supportingInfo", Type: [{ TypeName: "claim_supportingInfo" }], IsArray: true },
        { ElementName: "diagnosis", Type: [{ TypeName: "claim_diagnosis" }], IsArray: true },
        { ElementName: "procedure", Type: [{ TypeName: "claim_procedure" }], IsArray: true },
        { ElementName: "insurance", Type: [{ TypeName: "claim_insurance" }], IsArray: true },
        { ElementName: "accident", Type: [{ TypeName: "claim_accident" }] },
        { ElementName: "patientPaid", Type: [{ TypeName: "Money" }] },
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

export const claim_event: TypeModel = {
    TypeName: "claim_event",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "when[x]", Type: [{ TypeName: "Period" }, { TypeName: "dateTime" }], Required: true },
    ],
};

export const claim_careTeam: TypeModel = {
    TypeName: "claim_careTeam",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "sequence", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "provider", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }], Required: true },
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "specialty", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const claim_supportingInfo: TypeModel = {
    TypeName: "claim_supportingInfo",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "sequence", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "subCategory", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "timing[x]", Type: [{ TypeName: "Period" }, { TypeName: "Timing" }, { TypeName: "dateTime" }] },
        { ElementName: "value[x]", Type: [{ TypeName: "Address" }, { TypeName: "Age" }, { TypeName: "Annotation" }, { TypeName: "Attachment" }, { TypeName: "Availability" }, { TypeName: "CodeableConcept" }, { TypeName: "CodeableReference" }, { TypeName: "Coding" }, { TypeName: "ContactDetail" }, { TypeName: "ContactPoint" }, { TypeName: "Count" }, { TypeName: "DataRequirement" }, { TypeName: "Distance" }, { TypeName: "Dosage" }, { TypeName: "Duration" }, { TypeName: "Expression" }, { TypeName: "ExtendedContactDetail" }, { TypeName: "HumanName" }, { TypeName: "Identifier" }, { TypeName: "Meta" }, { TypeName: "Money" }, { TypeName: "ParameterDefinition" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "RatioRange" }, { TypeName: "Reference" }, { TypeName: "RelatedArtifact" }, { TypeName: "SampledData" }, { TypeName: "Signature" }, { TypeName: "Timing" }, { TypeName: "TriggerDefinition" }, { TypeName: "UsageContext" }, { TypeName: "VirtualServiceDetail" }, { TypeName: "base64Binary" }, { TypeName: "boolean" }, { TypeName: "canonical" }, { TypeName: "code" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "id" }, { TypeName: "instant" }, { TypeName: "integer" }, { TypeName: "integer64" }, { TypeName: "markdown" }, { TypeName: "oid" }, { TypeName: "positiveInt" }, { TypeName: "string" }, { TypeName: "time" }, { TypeName: "unsignedInt" }, { TypeName: "uri" }, { TypeName: "url" }, { TypeName: "uuid" }] },
        { ElementName: "reason", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const claim_diagnosis: TypeModel = {
    TypeName: "claim_diagnosis",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "sequence", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "diagnosis", Type: [{ TypeName: "CodeableReference" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "onAdmission", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const claim_procedure: TypeModel = {
    TypeName: "claim_procedure",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "sequence", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "procedure", Type: [{ TypeName: "CodeableReference" }], Required: true },
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
        { ElementName: "site", Type: [{ TypeName: "CodeableReference" }], IsArray: true, Required: true },
        { ElementName: "subSite", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
    ],
};

export const claim_item_detail: TypeModel = {
    TypeName: "claim_item_detail",
    BaseTypeName: "BackboneElement",
    Elements: [
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

export const ClaimResponse: TypeModel = {
    TypeName: "ClaimResponse",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "traceNumber", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "statusReason", Type: [{ TypeName: "string" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "subType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "use", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
        { ElementName: "created", Type: [{ TypeName: "dateTime" }], Required: true },
        { ElementName: "insurer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "requestor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "request", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Claim"] }] },
        { ElementName: "outcome", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "decision", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "disposition", Type: [{ TypeName: "string" }] },
        { ElementName: "preAuthRef", Type: [{ TypeName: "string" }] },
        { ElementName: "preAuthPeriod", Type: [{ TypeName: "Period" }] },
        { ElementName: "event", Type: [{ TypeName: "claimresponse_event" }], IsArray: true },
        { ElementName: "payeeType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }], IsArray: true },
        { ElementName: "diagnosisRelatedGroup", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "supportingInfo", Type: [{ TypeName: "claimresponse_supportingInfo" }], IsArray: true },
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

export const claimresponse_event: TypeModel = {
    TypeName: "claimresponse_event",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "when[x]", Type: [{ TypeName: "Period" }, { TypeName: "dateTime" }], Required: true },
    ],
};

export const claimresponse_supportingInfo: TypeModel = {
    TypeName: "claimresponse_supportingInfo",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "sequence", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "subCategory", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "timing[x]", Type: [{ TypeName: "Period" }, { TypeName: "Timing" }, { TypeName: "dateTime" }] },
        { ElementName: "value[x]", Type: [{ TypeName: "Address" }, { TypeName: "Age" }, { TypeName: "Annotation" }, { TypeName: "Attachment" }, { TypeName: "Availability" }, { TypeName: "CodeableConcept" }, { TypeName: "CodeableReference" }, { TypeName: "Coding" }, { TypeName: "ContactDetail" }, { TypeName: "ContactPoint" }, { TypeName: "Count" }, { TypeName: "DataRequirement" }, { TypeName: "Distance" }, { TypeName: "Dosage" }, { TypeName: "Duration" }, { TypeName: "Expression" }, { TypeName: "ExtendedContactDetail" }, { TypeName: "HumanName" }, { TypeName: "Identifier" }, { TypeName: "Meta" }, { TypeName: "Money" }, { TypeName: "ParameterDefinition" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "RatioRange" }, { TypeName: "Reference" }, { TypeName: "RelatedArtifact" }, { TypeName: "SampledData" }, { TypeName: "Signature" }, { TypeName: "Timing" }, { TypeName: "TriggerDefinition" }, { TypeName: "UsageContext" }, { TypeName: "VirtualServiceDetail" }, { TypeName: "base64Binary" }, { TypeName: "boolean" }, { TypeName: "canonical" }, { TypeName: "code" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "id" }, { TypeName: "instant" }, { TypeName: "integer" }, { TypeName: "integer64" }, { TypeName: "markdown" }, { TypeName: "oid" }, { TypeName: "positiveInt" }, { TypeName: "string" }, { TypeName: "time" }, { TypeName: "unsignedInt" }, { TypeName: "uri" }, { TypeName: "url" }, { TypeName: "uuid" }] },
        { ElementName: "reason", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const claimresponse_item: TypeModel = {
    TypeName: "claimresponse_item",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "itemSequence", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "traceNumber", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "informationSequence", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "noteNumber", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "reviewOutcome", Type: [{ TypeName: "claimresponse_item_reviewOutcome" }] },
        { ElementName: "adjudication", Type: [{ TypeName: "claimresponse_item_adjudication" }], IsArray: true },
        { ElementName: "detail", Type: [{ TypeName: "claimresponse_item_detail" }], IsArray: true },
    ],
};

export const claimresponse_item_reviewOutcome: TypeModel = {
    TypeName: "claimresponse_item_reviewOutcome",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "decision", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "reason", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "preAuthRef", Type: [{ TypeName: "string" }] },
        { ElementName: "preAuthPeriod", Type: [{ TypeName: "Period" }] },
    ],
};

export const claimresponse_item_adjudication: TypeModel = {
    TypeName: "claimresponse_item_adjudication",
    BaseTypeName: "BackboneElement",
    Elements: [
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
        { ElementName: "subDetailSequence", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "traceNumber", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "noteNumber", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "reviewOutcome", Type: [{ TypeName: "claimresponse_item_reviewOutcome" }] },
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
        { ElementName: "site", Type: [{ TypeName: "CodeableReference" }], IsArray: true, Required: true },
        { ElementName: "subSite", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
    ],
};

export const claimresponse_addItem_detail: TypeModel = {
    TypeName: "claimresponse_addItem_detail",
    BaseTypeName: "BackboneElement",
    Elements: [
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
        { ElementName: "class", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "number", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "text", Type: [{ TypeName: "markdown" }], Required: true },
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
        { ElementName: "expression", Type: [{ TypeName: "string" }], IsArray: true },
    ],
};

export const ClinicalUseDefinition: TypeModel = {
    TypeName: "ClinicalUseDefinition",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "subject", Type: [{ TypeName: "CodeableReference" }], IsArray: true, Required: true },
        { ElementName: "status", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "undesirableEffect", Type: [{ TypeName: "clinicalusedefinition_undesirableEffect" }] },
        { ElementName: "indication", Type: [{ TypeName: "clinicalusedefinition_indication" }] },
        { ElementName: "contraindication", Type: [{ TypeName: "clinicalusedefinition_contraindication" }] },
        { ElementName: "interaction", Type: [{ TypeName: "clinicalusedefinition_interaction" }] },
        { ElementName: "population", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }], IsArray: true },
        { ElementName: "library", Type: [{ TypeName: "canonical" }], IsArray: true },
        { ElementName: "warning", Type: [{ TypeName: "clinicalusedefinition_warning" }] },
    ],
};

export const clinicalusedefinition_undesirableEffect: TypeModel = {
    TypeName: "clinicalusedefinition_undesirableEffect",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "symptomConditionEffect", Type: [{ TypeName: "CodeableReference" }] },
        { ElementName: "classification", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "frequencyOfOccurrence", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "management", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
    ],
};

export const clinicalusedefinition_indication: TypeModel = {
    TypeName: "clinicalusedefinition_indication",
    BaseTypeName: "BackboneElement",
    Elements: [
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
        { ElementName: "relationshipType", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "treatment", Type: [{ TypeName: "CodeableReference" }], Required: true },
    ],
};

export const clinicalusedefinition_contraindication: TypeModel = {
    TypeName: "clinicalusedefinition_contraindication",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "diseaseSymptomProcedure", Type: [{ TypeName: "CodeableReference" }] },
        { ElementName: "diseaseStatus", Type: [{ TypeName: "CodeableReference" }] },
        { ElementName: "comorbidity", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "indication", Type: [{ TypeName: "clinicalusedefinition_indication" }], IsArray: true },
        { ElementName: "applicability", Type: [{ TypeName: "Expression" }] },
        { ElementName: "management", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "otherTherapy", Type: [{ TypeName: "clinicalusedefinition_indication_otherTherapy" }], IsArray: true },
    ],
};

export const clinicalusedefinition_interaction: TypeModel = {
    TypeName: "clinicalusedefinition_interaction",
    BaseTypeName: "BackboneElement",
    Elements: [
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
        { ElementName: "item[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/BiologicallyDerivedProduct", "http://hl7.org/fhir/StructureDefinition/Medication", "http://hl7.org/fhir/StructureDefinition/MedicinalProductDefinition", "http://hl7.org/fhir/StructureDefinition/NutritionProduct", "http://hl7.org/fhir/StructureDefinition/ObservationDefinition", "http://hl7.org/fhir/StructureDefinition/SubstanceDefinition"] }], Required: true },
        { ElementName: "route", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const clinicalusedefinition_warning: TypeModel = {
    TypeName: "clinicalusedefinition_warning",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const CodeSystem: TypeModel = {
    TypeName: "CodeSystem",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "versionAlgorithm[x]", Type: [{ TypeName: "Coding" }, { TypeName: "string" }] },
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
        { ElementName: "copyrightLabel", Type: [{ TypeName: "string" }] },
        { ElementName: "approvalDate", Type: [{ TypeName: "date" }] },
        { ElementName: "lastReviewDate", Type: [{ TypeName: "date" }] },
        { ElementName: "effectivePeriod", Type: [{ TypeName: "Period" }] },
        { ElementName: "topic", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "author", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "editor", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "reviewer", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "endorser", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "relatedArtifact", Type: [{ TypeName: "RelatedArtifact" }], IsArray: true },
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
        { ElementName: "additionalUse", Type: [{ TypeName: "Coding" }], IsArray: true },
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
        { ElementName: "basedOn", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CarePlan", "http://hl7.org/fhir/StructureDefinition/CommunicationRequest", "http://hl7.org/fhir/StructureDefinition/DeviceRequest", "http://hl7.org/fhir/StructureDefinition/MedicationRequest", "http://hl7.org/fhir/StructureDefinition/NutritionOrder", "http://hl7.org/fhir/StructureDefinition/ServiceRequest", "http://hl7.org/fhir/StructureDefinition/Task", "http://hl7.org/fhir/StructureDefinition/VisionPrescription"] }], IsArray: true },
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
        { ElementName: "recipient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Endpoint", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], IsArray: true },
        { ElementName: "sender", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Endpoint", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "reason", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "payload", Type: [{ TypeName: "communication_payload" }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
    ],
};

export const communication_payload: TypeModel = {
    TypeName: "communication_payload",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "content[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }, { TypeName: "string" }], Required: true },
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
        { ElementName: "intent", Type: [{ TypeName: "code" }], Required: true },
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
        { ElementName: "requester", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "recipient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Endpoint", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], IsArray: true },
        { ElementName: "informationProvider", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Endpoint", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], IsArray: true },
        { ElementName: "reason", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
    ],
};

export const communicationrequest_payload: TypeModel = {
    TypeName: "communicationrequest_payload",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "content[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }, { TypeName: "string" }], Required: true },
    ],
};

export const CompartmentDefinition: TypeModel = {
    TypeName: "CompartmentDefinition",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }], Required: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "versionAlgorithm[x]", Type: [{ TypeName: "Coding" }, { TypeName: "string" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
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
        { ElementName: "startParam", Type: [{ TypeName: "uri" }] },
        { ElementName: "endParam", Type: [{ TypeName: "uri" }] },
    ],
};

export const Composition: TypeModel = {
    TypeName: "Composition",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "consent", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Consent"] }], IsArray: true },
        { ElementName: "basedOn", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Appointment", "http://hl7.org/fhir/StructureDefinition/AppointmentResponse", "http://hl7.org/fhir/StructureDefinition/CarePlan", "http://hl7.org/fhir/StructureDefinition/Claim", "http://hl7.org/fhir/StructureDefinition/CommunicationRequest", "http://hl7.org/fhir/StructureDefinition/CoverageEligibilityRequest", "http://hl7.org/fhir/StructureDefinition/DeviceRequest", "http://hl7.org/fhir/StructureDefinition/MedicationRequest", "http://hl7.org/fhir/StructureDefinition/NutritionOrder", "http://hl7.org/fhir/StructureDefinition/RequestOrchestration", "http://hl7.org/fhir/StructureDefinition/ServiceRequest", "http://hl7.org/fhir/StructureDefinition/Task", "http://hl7.org/fhir/StructureDefinition/VisionPrescription"] }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }], Required: true },
        { ElementName: "useContext", Type: [{ TypeName: "UsageContext" }], IsArray: true },
        { ElementName: "author", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], IsArray: true },
        { ElementName: "participant", Type: [{ TypeName: "composition_participant" }], IsArray: true },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "classification", Type: [{ TypeName: "composition_classification" }], IsArray: true },
        { ElementName: "attester", Type: [{ TypeName: "composition_attester" }], IsArray: true },
        { ElementName: "custodian", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient"] }] },
        { ElementName: "relatesTo", Type: [{ TypeName: "composition_relatesTo" }], IsArray: true },
        { ElementName: "event", Type: [{ TypeName: "composition_event" }], IsArray: true },
        { ElementName: "section", Type: [{ TypeName: "composition_section" }], IsArray: true },
    ],
};

export const composition_participant: TypeModel = {
    TypeName: "composition_participant",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], IsArray: true, Required: true },
        { ElementName: "function", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "time", Type: [{ TypeName: "Period" }] },
        { ElementName: "party", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
    ],
};

export const composition_classification: TypeModel = {
    TypeName: "composition_classification",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "classifier", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
    ],
};

export const composition_attester: TypeModel = {
    TypeName: "composition_attester",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "mode", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "time", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "party", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
    ],
};

export const composition_relatesTo: TypeModel = {
    TypeName: "composition_relatesTo",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "target[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }, { TypeName: "canonical" }, { TypeName: "markdown" }, { TypeName: "uri" }], Required: true },
    ],
};

export const composition_event: TypeModel = {
    TypeName: "composition_event",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "detail", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
    ],
};

export const composition_section: TypeModel = {
    TypeName: "composition_section",
    BaseTypeName: "BackboneElement",
    Elements: [
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

export const ConceptMap: TypeModel = {
    TypeName: "ConceptMap",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "versionAlgorithm[x]", Type: [{ TypeName: "Coding" }, { TypeName: "string" }] },
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
        { ElementName: "copyrightLabel", Type: [{ TypeName: "string" }] },
        { ElementName: "approvalDate", Type: [{ TypeName: "date" }] },
        { ElementName: "lastReviewDate", Type: [{ TypeName: "date" }] },
        { ElementName: "effectivePeriod", Type: [{ TypeName: "Period" }] },
        { ElementName: "topic", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "author", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "editor", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "reviewer", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "endorser", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "relatedArtifact", Type: [{ TypeName: "RelatedArtifact" }], IsArray: true },
        { ElementName: "property", Type: [{ TypeName: "conceptmap_property" }], IsArray: true },
        { ElementName: "additionalAttribute", Type: [{ TypeName: "conceptmap_additionalAttribute" }], IsArray: true },
        { ElementName: "allowedRelationship", Type: [{ TypeName: "code" }], IsArray: true },
        { ElementName: "sourceScope[x]", Type: [{ TypeName: "canonical" }, { TypeName: "uri" }] },
        { ElementName: "targetScope[x]", Type: [{ TypeName: "canonical" }, { TypeName: "uri" }] },
        { ElementName: "group", Type: [{ TypeName: "conceptmap_group" }], IsArray: true },
    ],
};

export const conceptmap_property: TypeModel = {
    TypeName: "conceptmap_property",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "uri", Type: [{ TypeName: "uri" }] },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "system", Type: [{ TypeName: "canonical" }] },
    ],
};

export const conceptmap_additionalAttribute: TypeModel = {
    TypeName: "conceptmap_additionalAttribute",
    BaseTypeName: "BackboneElement",
    Elements: [
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

export const conceptmap_group_element_target_property: TypeModel = {
    TypeName: "conceptmap_group_element_target_property",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "Coding" }, { TypeName: "boolean" }, { TypeName: "code" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "integer" }, { TypeName: "string" }], Required: true },
    ],
};

export const conceptmap_group_element_target_dependsOn: TypeModel = {
    TypeName: "conceptmap_group_element_target_dependsOn",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "attribute", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "Coding" }, { TypeName: "Quantity" }, { TypeName: "boolean" }, { TypeName: "code" }, { TypeName: "string" }] },
        { ElementName: "valueSet", Type: [{ TypeName: "canonical" }] },
    ],
};

export const conceptmap_group_unmapped: TypeModel = {
    TypeName: "conceptmap_group_unmapped",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "mode", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "code", Type: [{ TypeName: "code" }] },
        { ElementName: "display", Type: [{ TypeName: "string" }] },
        { ElementName: "comment", Type: [{ TypeName: "string" }] },
        { ElementName: "valueSet", Type: [{ TypeName: "canonical" }] },
        { ElementName: "relationship", Type: [{ TypeName: "code" }] },
        { ElementName: "otherMap", Type: [{ TypeName: "canonical" }] },
    ],
};

export const Condition: TypeModel = {
    TypeName: "Condition",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "clinicalStatus", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "verificationStatus", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "severity", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "bodyStructure", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "onset[x]", Type: [{ TypeName: "Age" }, { TypeName: "Period" }, { TypeName: "Range" }, { TypeName: "dateTime" }, { TypeName: "string" }] },
        { ElementName: "abatement[x]", Type: [{ TypeName: "Age" }, { TypeName: "Period" }, { TypeName: "Range" }, { TypeName: "dateTime" }, { TypeName: "string" }] },
        { ElementName: "recordedDate", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "recorder", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "asserter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "stage", Type: [{ TypeName: "condition_stage" }], IsArray: true },
        { ElementName: "evidence", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
    ],
};

export const condition_stage: TypeModel = {
    TypeName: "condition_stage",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "summary", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "assessment", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DiagnosticReport", "http://hl7.org/fhir/StructureDefinition/Observation"] }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const Consent: TypeModel = {
    TypeName: "Consent",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/ResearchSubject"] }] },
        { ElementName: "date", Type: [{ TypeName: "date" }] },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "grantor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], IsArray: true },
        { ElementName: "grantee", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], IsArray: true },
        { ElementName: "manager", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner"] }], IsArray: true },
        { ElementName: "controller", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner"] }], IsArray: true },
        { ElementName: "sourceAttachment", Type: [{ TypeName: "Attachment" }], IsArray: true },
        { ElementName: "sourceReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Consent", "http://hl7.org/fhir/StructureDefinition/DocumentReference", "http://hl7.org/fhir/StructureDefinition/QuestionnaireResponse"] }], IsArray: true },
        { ElementName: "regulatoryBasis", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "policyBasis", Type: [{ TypeName: "consent_policyBasis" }] },
        { ElementName: "policyText", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DocumentReference"] }], IsArray: true },
        { ElementName: "verification", Type: [{ TypeName: "consent_verification" }], IsArray: true },
        { ElementName: "decision", Type: [{ TypeName: "code" }] },
        { ElementName: "provision", Type: [{ TypeName: "consent_provision" }], IsArray: true },
    ],
};

export const consent_policyBasis: TypeModel = {
    TypeName: "consent_policyBasis",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "reference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
        { ElementName: "uri", Type: [{ TypeName: "uri" }] },
    ],
};

export const consent_verification: TypeModel = {
    TypeName: "consent_verification",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "verified", Type: [{ TypeName: "boolean" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "verifiedBy", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "verifiedWith", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }], IsArray: true },
    ],
};

export const consent_provision: TypeModel = {
    TypeName: "consent_provision",
    BaseTypeName: "BackboneElement",
    Elements: [
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
        { ElementName: "provision", Type: [{ TypeName: "consent_provision" }], IsArray: true },
    ],
};

export const consent_provision_actor: TypeModel = {
    TypeName: "consent_provision_actor",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "reference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
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

export const Coverage: TypeModel = {
    TypeName: "Coverage",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "statusReason", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "kind", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "paymentBy", Type: [{ TypeName: "coverage_paymentBy" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "policyHolder", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "subscriber", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "subscriberId", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "beneficiary", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
        { ElementName: "dependent", Type: [{ TypeName: "string" }] },
        { ElementName: "relationship", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "insurer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "class", Type: [{ TypeName: "coverage_class" }], IsArray: true },
        { ElementName: "order", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "network", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "costToBeneficiary", Type: [{ TypeName: "coverage_costToBeneficiary" }], IsArray: true },
        { ElementName: "subrogation", Type: [{ TypeName: "boolean" }] },
    ],
};

export const coverage_paymentBy: TypeModel = {
    TypeName: "coverage_paymentBy",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "party", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
        { ElementName: "responsibility", Type: [{ TypeName: "string" }] },
    ],
};

export const coverage_class: TypeModel = {
    TypeName: "coverage_class",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "value", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "code", Type: [{ TypeName: "Coding" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
    ],
};

export const coverage_costToBeneficiary: TypeModel = {
    TypeName: "coverage_costToBeneficiary",
    BaseTypeName: "BackboneElement",
    Elements: [
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
        { ElementName: "statusReason", Type: [{ TypeName: "string" }] },
        { ElementName: "priority", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "purpose", Type: [{ TypeName: "code" }], IsArray: true, Required: true },
        { ElementName: "patient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
        { ElementName: "event", Type: [{ TypeName: "coverageeligibilityrequest_event" }], IsArray: true },
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

export const coverageeligibilityrequest_event: TypeModel = {
    TypeName: "coverageeligibilityrequest_event",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "when[x]", Type: [{ TypeName: "Period" }, { TypeName: "dateTime" }], Required: true },
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
        { ElementName: "diagnosis", Type: [{ TypeName: "CodeableReference" }] },
    ],
};

export const CoverageEligibilityResponse: TypeModel = {
    TypeName: "CoverageEligibilityResponse",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "statusReason", Type: [{ TypeName: "string" }] },
        { ElementName: "purpose", Type: [{ TypeName: "code" }], IsArray: true, Required: true },
        { ElementName: "patient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
        { ElementName: "event", Type: [{ TypeName: "coverageeligibilityresponse_event" }], IsArray: true },
        { ElementName: "serviced[x]", Type: [{ TypeName: "Period" }, { TypeName: "date" }] },
        { ElementName: "created", Type: [{ TypeName: "dateTime" }], Required: true },
        { ElementName: "requestor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "request", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CoverageEligibilityRequest"] }] },
        { ElementName: "outcome", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "disposition", Type: [{ TypeName: "string" }] },
        { ElementName: "insurer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }], Required: true },
        { ElementName: "insurance", Type: [{ TypeName: "coverageeligibilityresponse_insurance" }], IsArray: true },
        { ElementName: "preAuthRef", Type: [{ TypeName: "string" }] },
        { ElementName: "form", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "error", Type: [{ TypeName: "coverageeligibilityresponse_error" }], IsArray: true },
    ],
};

export const coverageeligibilityresponse_event: TypeModel = {
    TypeName: "coverageeligibilityresponse_event",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "when[x]", Type: [{ TypeName: "Period" }, { TypeName: "dateTime" }], Required: true },
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
        { ElementName: "expression", Type: [{ TypeName: "string" }], IsArray: true },
    ],
};

export const DetectedIssue: TypeModel = {
    TypeName: "DetectedIssue",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "severity", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/BiologicallyDerivedProduct", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Medication", "http://hl7.org/fhir/StructureDefinition/NutritionProduct", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/Procedure", "http://hl7.org/fhir/StructureDefinition/Substance"] }] },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "identified[x]", Type: [{ TypeName: "Period" }, { TypeName: "Timing" }, { TypeName: "dateTime" }] },
        { ElementName: "author", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "implicated", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "evidence", Type: [{ TypeName: "detectedissue_evidence" }], IsArray: true },
        { ElementName: "detail", Type: [{ TypeName: "markdown" }] },
        { ElementName: "reference", Type: [{ TypeName: "uri" }] },
        { ElementName: "qualityOfEvidence", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "expectedOnsetType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "medicationClass", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "managementCode", Type: [{ TypeName: "CodeableConcept" }] },
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
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
    ],
};

export const Device: TypeModel = {
    TypeName: "Device",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "definition", Type: [{ TypeName: "canonical" }] },
        { ElementName: "udiCarrier", Type: [{ TypeName: "device_udiCarrier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }] },
        { ElementName: "availabilityStatus", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "biologicalSourceEvent", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "manufacturer", Type: [{ TypeName: "string" }] },
        { ElementName: "manufactureDate", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "expirationDate", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "lotNumber", Type: [{ TypeName: "string" }] },
        { ElementName: "serialNumber", Type: [{ TypeName: "string" }] },
        { ElementName: "name", Type: [{ TypeName: "device_name" }], IsArray: true },
        { ElementName: "modelNumber", Type: [{ TypeName: "string" }] },
        { ElementName: "partNumber", Type: [{ TypeName: "string" }] },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "deviceVersion", Type: [{ TypeName: "device_deviceVersion" }], IsArray: true },
        { ElementName: "conformsTo", Type: [{ TypeName: "device_conformsTo" }], IsArray: true },
        { ElementName: "property", Type: [{ TypeName: "device_property" }], IsArray: true },
        { ElementName: "additive", Type: [{ TypeName: "device_additive" }], IsArray: true },
        { ElementName: "contact", Type: [{ TypeName: "ContactPoint" }], IsArray: true },
        { ElementName: "location", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "safety", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "parent", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }] },
    ],
};

export const device_udiCarrier: TypeModel = {
    TypeName: "device_udiCarrier",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "deviceIdentifier", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "deviceIdentifierSystem", Type: [{ TypeName: "uri" }] },
        { ElementName: "issuer", Type: [{ TypeName: "uri" }], Required: true },
        { ElementName: "jurisdiction", Type: [{ TypeName: "uri" }] },
        { ElementName: "carrierAIDC", Type: [{ TypeName: "base64Binary" }] },
        { ElementName: "carrierHRF", Type: [{ TypeName: "string" }] },
        { ElementName: "entryType", Type: [{ TypeName: "code" }] },
    ],
};

export const device_name: TypeModel = {
    TypeName: "device_name",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "value", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "display", Type: [{ TypeName: "boolean" }] },
    ],
};

export const device_deviceVersion: TypeModel = {
    TypeName: "device_deviceVersion",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "component", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "installDate", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "value", Type: [{ TypeName: "string" }], Required: true },
    ],
};

export const device_conformsTo: TypeModel = {
    TypeName: "device_conformsTo",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "specification", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
    ],
};

export const device_property: TypeModel = {
    TypeName: "device_property",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "CodeableConcept" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "boolean" }, { TypeName: "integer" }, { TypeName: "string" }], Required: true },
    ],
};

export const device_additive: TypeModel = {
    TypeName: "device_additive",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableReference" }], Required: true },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
    ],
};

export const DeviceAlert: TypeModel = {
    TypeName: "DeviceAlert",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "procedure", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Procedure"] }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "priority", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/BiologicallyDerivedProduct", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Medication", "http://hl7.org/fhir/StructureDefinition/NutritionProduct", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Specimen"] }], Required: true },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "occurrence", Type: [{ TypeName: "Period" }], Required: true },
        { ElementName: "device", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/DeviceMetric"] }] },
        { ElementName: "acknowledged", Type: [{ TypeName: "boolean" }] },
        { ElementName: "acknowledgedBy", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "location", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "derivedFrom", Type: [{ TypeName: "devicealert_derivedFrom" }], IsArray: true },
        { ElementName: "label", Type: [{ TypeName: "string" }] },
        { ElementName: "signal", Type: [{ TypeName: "devicealert_signal" }], IsArray: true },
    ],
};

export const devicealert_derivedFrom: TypeModel = {
    TypeName: "devicealert_derivedFrom",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "observation", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Observation"] }], Required: true },
        { ElementName: "component", Type: [{ TypeName: "Coding" }] },
        { ElementName: "limit", Type: [{ TypeName: "Range" }] },
    ],
};

export const devicealert_signal: TypeModel = {
    TypeName: "devicealert_signal",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "activationState", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "presence", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "annunciator", Type: [{ TypeName: "CodeableReference" }] },
        { ElementName: "manifestation", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
    ],
};

export const DeviceAssociation: TypeModel = {
    TypeName: "DeviceAssociation",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "device", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }], Required: true },
        { ElementName: "relationship", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "statusReason", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "relationshipStatus", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/BiologicallyDerivedProduct", "http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Medication", "http://hl7.org/fhir/StructureDefinition/NutritionProduct", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/Specimen", "http://hl7.org/fhir/StructureDefinition/Substance"] }], Required: true },
        { ElementName: "focus", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/BiologicallyDerivedProduct", "http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Medication", "http://hl7.org/fhir/StructureDefinition/NutritionProduct", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson", "http://hl7.org/fhir/StructureDefinition/Specimen", "http://hl7.org/fhir/StructureDefinition/Substance"] }] },
        { ElementName: "bodyStructure", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
    ],
};

export const DeviceDefinition: TypeModel = {
    TypeName: "DeviceDefinition",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "versionAlgorithm[x]", Type: [{ TypeName: "Coding" }, { TypeName: "string" }] },
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
        { ElementName: "copyrightLabel", Type: [{ TypeName: "string" }] },
        { ElementName: "approvalDate", Type: [{ TypeName: "date" }] },
        { ElementName: "lastReviewDate", Type: [{ TypeName: "date" }] },
        { ElementName: "effectivePeriod", Type: [{ TypeName: "Period" }] },
        { ElementName: "partNumber", Type: [{ TypeName: "string" }] },
        { ElementName: "manufacturer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "modelNumber", Type: [{ TypeName: "string" }] },
        { ElementName: "udiDeviceIdentifier", Type: [{ TypeName: "devicedefinition_udiDeviceIdentifier" }], IsArray: true },
        { ElementName: "regulatoryIdentifier", Type: [{ TypeName: "devicedefinition_regulatoryIdentifier" }], IsArray: true },
        { ElementName: "deviceName", Type: [{ TypeName: "devicedefinition_deviceName" }], IsArray: true },
        { ElementName: "classification", Type: [{ TypeName: "devicedefinition_classification" }], IsArray: true },
        { ElementName: "conformsTo", Type: [{ TypeName: "devicedefinition_conformsTo" }], IsArray: true },
        { ElementName: "hasPart", Type: [{ TypeName: "devicedefinition_hasPart" }], IsArray: true },
        { ElementName: "packaging", Type: [{ TypeName: "devicedefinition_packaging" }], IsArray: true },
        { ElementName: "deviceVersion", Type: [{ TypeName: "devicedefinition_deviceVersion" }], IsArray: true },
        { ElementName: "safety", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "shelfLifeStorage", Type: [{ TypeName: "ProductShelfLife" }], IsArray: true },
        { ElementName: "outputLanguage", Type: [{ TypeName: "code" }], IsArray: true },
        { ElementName: "property", Type: [{ TypeName: "devicedefinition_property" }], IsArray: true },
        { ElementName: "link", Type: [{ TypeName: "devicedefinition_link" }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "material", Type: [{ TypeName: "devicedefinition_material" }], IsArray: true },
        { ElementName: "additive", Type: [{ TypeName: "devicedefinition_additive" }], IsArray: true },
        { ElementName: "productionIdentifierInUDI", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "guideline", Type: [{ TypeName: "devicedefinition_guideline" }] },
        { ElementName: "correctiveAction", Type: [{ TypeName: "devicedefinition_correctiveAction" }] },
        { ElementName: "chargeItem", Type: [{ TypeName: "devicedefinition_chargeItem" }], IsArray: true },
    ],
};

export const devicedefinition_udiDeviceIdentifier: TypeModel = {
    TypeName: "devicedefinition_udiDeviceIdentifier",
    BaseTypeName: "BackboneElement",
    Elements: [
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
        { ElementName: "marketPeriod", Type: [{ TypeName: "Period" }], Required: true },
        { ElementName: "subJurisdiction", Type: [{ TypeName: "uri" }], Required: true },
    ],
};

export const devicedefinition_regulatoryIdentifier: TypeModel = {
    TypeName: "devicedefinition_regulatoryIdentifier",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "identifier", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "issuer", Type: [{ TypeName: "uri" }], Required: true },
        { ElementName: "jurisdiction", Type: [{ TypeName: "uri" }], Required: true },
        { ElementName: "identifierSystem", Type: [{ TypeName: "uri" }] },
    ],
};

export const devicedefinition_deviceName: TypeModel = {
    TypeName: "devicedefinition_deviceName",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "name", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
    ],
};

export const devicedefinition_classification: TypeModel = {
    TypeName: "devicedefinition_classification",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "justification", Type: [{ TypeName: "RelatedArtifact" }], IsArray: true },
    ],
};

export const devicedefinition_conformsTo: TypeModel = {
    TypeName: "devicedefinition_conformsTo",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "specification", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "version", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "source", Type: [{ TypeName: "RelatedArtifact" }], IsArray: true },
    ],
};

export const devicedefinition_hasPart: TypeModel = {
    TypeName: "devicedefinition_hasPart",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "definition[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "canonical" }], Required: true },
        { ElementName: "count", Type: [{ TypeName: "integer" }] },
    ],
};

export const devicedefinition_packaging: TypeModel = {
    TypeName: "devicedefinition_packaging",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
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
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "organizationReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }], IsArray: true },
    ],
};

export const devicedefinition_deviceVersion: TypeModel = {
    TypeName: "devicedefinition_deviceVersion",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "component", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "value", Type: [{ TypeName: "string" }], Required: true },
    ],
};

export const devicedefinition_property: TypeModel = {
    TypeName: "devicedefinition_property",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "CodeableConcept" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "boolean" }, { TypeName: "integer" }, { TypeName: "string" }], Required: true },
    ],
};

export const devicedefinition_link: TypeModel = {
    TypeName: "devicedefinition_link",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "relation", Type: [{ TypeName: "Coding" }], Required: true },
        { ElementName: "relatedDevice[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "canonical" }], Required: true },
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

export const devicedefinition_additive: TypeModel = {
    TypeName: "devicedefinition_additive",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableReference" }], Required: true },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
    ],
};

export const devicedefinition_guideline: TypeModel = {
    TypeName: "devicedefinition_guideline",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "useContext", Type: [{ TypeName: "UsageContext" }], IsArray: true },
        { ElementName: "usageInstruction", Type: [{ TypeName: "markdown" }] },
        { ElementName: "relatedArtifact", Type: [{ TypeName: "RelatedArtifact" }], IsArray: true },
        { ElementName: "indication", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "contraindication", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "warning", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "intendedUse", Type: [{ TypeName: "string" }] },
    ],
};

export const devicedefinition_correctiveAction: TypeModel = {
    TypeName: "devicedefinition_correctiveAction",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "recall", Type: [{ TypeName: "boolean" }], Required: true },
        { ElementName: "scope", Type: [{ TypeName: "code" }] },
        { ElementName: "period", Type: [{ TypeName: "Period" }], Required: true },
    ],
};

export const devicedefinition_chargeItem: TypeModel = {
    TypeName: "devicedefinition_chargeItem",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "chargeItemCode", Type: [{ TypeName: "CodeableReference" }], Required: true },
        { ElementName: "count", Type: [{ TypeName: "Quantity" }], Required: true },
        { ElementName: "effectivePeriod", Type: [{ TypeName: "Period" }] },
        { ElementName: "useContext", Type: [{ TypeName: "UsageContext" }], IsArray: true },
    ],
};

export const DeviceMetric: TypeModel = {
    TypeName: "DeviceMetric",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "operationalStatus", Type: [{ TypeName: "code" }] },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "device", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }], Required: true },
        { ElementName: "unit", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "color", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "measurementFrequency", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "availability", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "calibration", Type: [{ TypeName: "devicemetric_calibration" }], IsArray: true },
    ],
};

export const devicemetric_calibration: TypeModel = {
    TypeName: "devicemetric_calibration",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "state", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "time", Type: [{ TypeName: "instant" }] },
    ],
};

export const DeviceRequest: TypeModel = {
    TypeName: "DeviceRequest",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "basedOn", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "replaces", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DeviceRequest"] }], IsArray: true },
        { ElementName: "groupIdentifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }] },
        { ElementName: "intent", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "priority", Type: [{ TypeName: "code" }] },
        { ElementName: "doNotPerform", Type: [{ TypeName: "boolean" }] },
        { ElementName: "product[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }, { TypeName: "canonical" }], Required: true },
        { ElementName: "quantity", Type: [{ TypeName: "integer" }] },
        { ElementName: "parameter", Type: [{ TypeName: "devicerequest_parameter" }], IsArray: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "occurrence[x]", Type: [{ TypeName: "Period" }, { TypeName: "Timing" }, { TypeName: "dateTime" }] },
        { ElementName: "authoredOn", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "requester", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "performer", Type: [{ TypeName: "CodeableReference" }] },
        { ElementName: "location", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "reason", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "asNeeded", Type: [{ TypeName: "boolean" }] },
        { ElementName: "asNeededFor", Type: [{ TypeName: "CodeableConcept" }] },
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

export const DiagnosticReport: TypeModel = {
    TypeName: "DiagnosticReport",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "basedOn", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CarePlan", "http://hl7.org/fhir/StructureDefinition/MedicationRequest", "http://hl7.org/fhir/StructureDefinition/NutritionOrder", "http://hl7.org/fhir/StructureDefinition/ServiceRequest"] }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "statusReason", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/BiologicallyDerivedProduct", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Medication", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/Substance"] }] },
        { ElementName: "relatesTo", Type: [{ TypeName: "RelatedArtifact" }], IsArray: true },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "effective[x]", Type: [{ TypeName: "Period" }, { TypeName: "dateTime" }] },
        { ElementName: "issued", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "procedure", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Procedure"] }], IsArray: true },
        { ElementName: "performer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], IsArray: true },
        { ElementName: "resultsInterpreter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], IsArray: true },
        { ElementName: "specimen", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Specimen"] }], IsArray: true },
        { ElementName: "result", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Observation"] }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "study", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ImagingStudy"] }], IsArray: true },
        { ElementName: "supportingInfo", Type: [{ TypeName: "diagnosticreport_supportingInfo" }], IsArray: true },
        { ElementName: "media", Type: [{ TypeName: "diagnosticreport_media" }], IsArray: true },
        { ElementName: "composition", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Composition"] }] },
        { ElementName: "conclusion", Type: [{ TypeName: "markdown" }] },
        { ElementName: "conclusionCode", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "recommendation", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "presentedForm", Type: [{ TypeName: "Attachment" }], IsArray: true },
        { ElementName: "communication", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Communication"] }], IsArray: true },
        { ElementName: "comparison", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/List"] }] },
    ],
};

export const diagnosticreport_supportingInfo: TypeModel = {
    TypeName: "diagnosticreport_supportingInfo",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "reference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/AllergyIntolerance", "http://hl7.org/fhir/StructureDefinition/Condition", "http://hl7.org/fhir/StructureDefinition/DiagnosticReport", "http://hl7.org/fhir/StructureDefinition/DocumentReference", "http://hl7.org/fhir/StructureDefinition/FamilyMemberHistory", "http://hl7.org/fhir/StructureDefinition/ImagingStudy", "http://hl7.org/fhir/StructureDefinition/Observation", "http://hl7.org/fhir/StructureDefinition/Procedure"] }], Required: true },
    ],
};

export const diagnosticreport_media: TypeModel = {
    TypeName: "diagnosticreport_media",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "comment", Type: [{ TypeName: "string" }] },
        { ElementName: "link", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DocumentReference"] }], Required: true },
    ],
};

export const DocumentReference: TypeModel = {
    TypeName: "DocumentReference",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "basedOn", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Appointment", "http://hl7.org/fhir/StructureDefinition/AppointmentResponse", "http://hl7.org/fhir/StructureDefinition/CarePlan", "http://hl7.org/fhir/StructureDefinition/Claim", "http://hl7.org/fhir/StructureDefinition/CommunicationRequest", "http://hl7.org/fhir/StructureDefinition/CoverageEligibilityRequest", "http://hl7.org/fhir/StructureDefinition/DeviceRequest", "http://hl7.org/fhir/StructureDefinition/MedicationRequest", "http://hl7.org/fhir/StructureDefinition/NutritionOrder", "http://hl7.org/fhir/StructureDefinition/RequestOrchestration", "http://hl7.org/fhir/StructureDefinition/ServiceRequest", "http://hl7.org/fhir/StructureDefinition/VisionPrescription"] }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "docStatus", Type: [{ TypeName: "code" }] },
        { ElementName: "modality", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
        { ElementName: "context", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Appointment", "http://hl7.org/fhir/StructureDefinition/Encounter", "http://hl7.org/fhir/StructureDefinition/EpisodeOfCare"] }], IsArray: true },
        { ElementName: "event", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "related", Type: [{ TypeName: "documentreference_related" }], IsArray: true },
        { ElementName: "bodyStructure", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "facilityType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "practiceSetting", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "author", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], IsArray: true },
        { ElementName: "attester", Type: [{ TypeName: "documentreference_attester" }], IsArray: true },
        { ElementName: "custodian", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "relatesTo", Type: [{ TypeName: "documentreference_relatesTo" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "securityLabel", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "content", Type: [{ TypeName: "documentreference_content" }], IsArray: true, Required: true },
    ],
};

export const documentreference_related: TypeModel = {
    TypeName: "documentreference_related",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "target", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], Required: true },
    ],
};

export const documentreference_attester: TypeModel = {
    TypeName: "documentreference_attester",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "mode", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "time", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "party", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
    ],
};

export const documentreference_relatesTo: TypeModel = {
    TypeName: "documentreference_relatesTo",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "target", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DocumentReference"] }], Required: true },
    ],
};

export const documentreference_content: TypeModel = {
    TypeName: "documentreference_content",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "attachment", Type: [{ TypeName: "Attachment" }], Required: true },
        { ElementName: "profile", Type: [{ TypeName: "documentreference_content_profile" }], IsArray: true },
    ],
};

export const documentreference_content_profile: TypeModel = {
    TypeName: "documentreference_content_profile",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "value[x]", Type: [{ TypeName: "Coding" }, { TypeName: "canonical" }, { TypeName: "uri" }], Required: true },
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

export const Encounter: TypeModel = {
    TypeName: "Encounter",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "businessStatus", Type: [{ TypeName: "encounter_businessStatus" }], IsArray: true },
        { ElementName: "class", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "priority", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "serviceType", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Patient"] }] },
        { ElementName: "subjectStatus", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "episodeOfCare", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/EpisodeOfCare"] }], IsArray: true },
        { ElementName: "basedOn", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CarePlan", "http://hl7.org/fhir/StructureDefinition/DeviceRequest", "http://hl7.org/fhir/StructureDefinition/MedicationRequest", "http://hl7.org/fhir/StructureDefinition/NutritionOrder", "http://hl7.org/fhir/StructureDefinition/RequestOrchestration", "http://hl7.org/fhir/StructureDefinition/ServiceRequest", "http://hl7.org/fhir/StructureDefinition/VisionPrescription"] }], IsArray: true },
        { ElementName: "careTeam", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam"] }], IsArray: true },
        { ElementName: "partOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "serviceProvider", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "participant", Type: [{ TypeName: "encounter_participant" }], IsArray: true },
        { ElementName: "appointment", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Appointment"] }], IsArray: true },
        { ElementName: "virtualService", Type: [{ TypeName: "VirtualServiceDetail" }], IsArray: true },
        { ElementName: "actualPeriod", Type: [{ TypeName: "Period" }] },
        { ElementName: "plannedStartDate", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "plannedEndDate", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "length", Type: [{ TypeName: "Duration" }] },
        { ElementName: "reason", Type: [{ TypeName: "encounter_reason" }], IsArray: true },
        { ElementName: "diagnosis", Type: [{ TypeName: "encounter_diagnosis" }], IsArray: true },
        { ElementName: "account", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Account"] }], IsArray: true },
        { ElementName: "dietPreference", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "specialArrangement", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "specialCourtesy", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "admission", Type: [{ TypeName: "encounter_admission" }] },
        { ElementName: "location", Type: [{ TypeName: "encounter_location" }], IsArray: true },
    ],
};

export const encounter_businessStatus: TypeModel = {
    TypeName: "encounter_businessStatus",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "effectiveDate", Type: [{ TypeName: "dateTime" }] },
    ],
};

export const encounter_participant: TypeModel = {
    TypeName: "encounter_participant",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "actor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
    ],
};

export const encounter_reason: TypeModel = {
    TypeName: "encounter_reason",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "use", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "value", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
    ],
};

export const encounter_diagnosis: TypeModel = {
    TypeName: "encounter_diagnosis",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "condition", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "use", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
    ],
};

export const encounter_admission: TypeModel = {
    TypeName: "encounter_admission",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "preAdmissionIdentifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "origin", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "admitSource", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "reAdmission", Type: [{ TypeName: "CodeableConcept" }] },
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
        { ElementName: "form", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
    ],
};

export const Endpoint: TypeModel = {
    TypeName: "Endpoint",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "connectionType", Type: [{ TypeName: "CodeableConcept" }], IsArray: true, Required: true },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "environmentType", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "managingOrganization", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "contact", Type: [{ TypeName: "ContactPoint" }], IsArray: true },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "availability", Type: [{ TypeName: "Availability" }] },
        { ElementName: "payload", Type: [{ TypeName: "endpoint_payload" }], IsArray: true },
        { ElementName: "address", Type: [{ TypeName: "url" }], Required: true },
        { ElementName: "header", Type: [{ TypeName: "string" }], IsArray: true },
    ],
};

export const endpoint_payload: TypeModel = {
    TypeName: "endpoint_payload",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "mimeType", Type: [{ TypeName: "code" }], IsArray: true },
        { ElementName: "profileCanonical", Type: [{ TypeName: "canonical" }], IsArray: true },
        { ElementName: "profileUri", Type: [{ TypeName: "uri" }], IsArray: true },
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
        { ElementName: "reason", Type: [{ TypeName: "episodeofcare_reason" }], IsArray: true },
        { ElementName: "diagnosis", Type: [{ TypeName: "episodeofcare_diagnosis" }], IsArray: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
        { ElementName: "managingOrganization", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "referralRequest", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ServiceRequest"] }], IsArray: true },
        { ElementName: "careManager", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "careTeam", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam"] }], IsArray: true },
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

export const episodeofcare_reason: TypeModel = {
    TypeName: "episodeofcare_reason",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "use", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "value", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
    ],
};

export const episodeofcare_diagnosis: TypeModel = {
    TypeName: "episodeofcare_diagnosis",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "condition", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "use", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
    ],
};

export const EventDefinition: TypeModel = {
    TypeName: "EventDefinition",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "versionAlgorithm[x]", Type: [{ TypeName: "Coding" }, { TypeName: "string" }] },
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
        { ElementName: "usage", Type: [{ TypeName: "markdown" }] },
        { ElementName: "copyright", Type: [{ TypeName: "markdown" }] },
        { ElementName: "copyrightLabel", Type: [{ TypeName: "string" }] },
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
        { ElementName: "versionAlgorithm[x]", Type: [{ TypeName: "Coding" }, { TypeName: "string" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "citeAs", Type: [{ TypeName: "markdown" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }] },
        { ElementName: "experimental", Type: [{ TypeName: "boolean" }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "approvalDate", Type: [{ TypeName: "date" }] },
        { ElementName: "lastReviewDate", Type: [{ TypeName: "date" }] },
        { ElementName: "author", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "publisher", Type: [{ TypeName: "string" }] },
        { ElementName: "contact", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "recorder", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "editor", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "reviewer", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "endorser", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "useContext", Type: [{ TypeName: "UsageContext" }], IsArray: true },
        { ElementName: "purpose", Type: [{ TypeName: "markdown" }] },
        { ElementName: "copyright", Type: [{ TypeName: "markdown" }] },
        { ElementName: "copyrightLabel", Type: [{ TypeName: "string" }] },
        { ElementName: "relatesTo", Type: [{ TypeName: "evidence_relatesTo" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "assertion", Type: [{ TypeName: "markdown" }] },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "classification", Type: [{ TypeName: "evidence_classification" }], IsArray: true },
        { ElementName: "variableDefinition", Type: [{ TypeName: "evidence_variableDefinition" }], IsArray: true },
        { ElementName: "synthesisType", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "studyDesign", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "statistic", Type: [{ TypeName: "evidence_statistic" }], IsArray: true },
        { ElementName: "certainty", Type: [{ TypeName: "evidence_certainty" }], IsArray: true },
    ],
};

export const evidence_relatesTo: TypeModel = {
    TypeName: "evidence_relatesTo",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "target[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }, { TypeName: "canonical" }, { TypeName: "markdown" }, { TypeName: "uri" }], Required: true },
    ],
};

export const evidence_classification: TypeModel = {
    TypeName: "evidence_classification",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "classifier", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
    ],
};

export const evidence_variableDefinition: TypeModel = {
    TypeName: "evidence_variableDefinition",
    BaseTypeName: "BackboneElement",
    Elements: [
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

export const evidence_statistic: TypeModel = {
    TypeName: "evidence_statistic",
    BaseTypeName: "BackboneElement",
    Elements: [
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

export const evidence_statistic_sampleSize: TypeModel = {
    TypeName: "evidence_statistic_sampleSize",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "numberOfStudies", Type: [{ TypeName: "unsignedInt" }] },
        { ElementName: "numberOfParticipants", Type: [{ TypeName: "unsignedInt" }] },
        { ElementName: "knownDataCount", Type: [{ TypeName: "unsignedInt" }] },
        { ElementName: "numberAnalyzed", Type: [{ TypeName: "unsignedInt" }] },
    ],
};

export const evidence_statistic_attributeEstimate: TypeModel = {
    TypeName: "evidence_statistic_attributeEstimate",
    BaseTypeName: "BackboneElement",
    Elements: [
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
        { ElementName: "variableDefinition", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/EvidenceVariable", "http://hl7.org/fhir/StructureDefinition/Group"] }], Required: true },
        { ElementName: "handling", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "valueCategory", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "valueQuantity", Type: [{ TypeName: "Quantity" }], IsArray: true },
        { ElementName: "valueRange", Type: [{ TypeName: "Range" }], IsArray: true },
    ],
};

export const evidence_certainty: TypeModel = {
    TypeName: "evidence_certainty",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "rating", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "rater", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "subcomponent", Type: [{ TypeName: "evidence_certainty" }], IsArray: true },
    ],
};

export const EvidenceVariable: TypeModel = {
    TypeName: "EvidenceVariable",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "versionAlgorithm[x]", Type: [{ TypeName: "Coding" }, { TypeName: "string" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "shortTitle", Type: [{ TypeName: "string" }] },
        { ElementName: "citeAs", Type: [{ TypeName: "markdown" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }] },
        { ElementName: "experimental", Type: [{ TypeName: "boolean" }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "author", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "publisher", Type: [{ TypeName: "string" }] },
        { ElementName: "contact", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "recorder", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "editor", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "reviewer", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "endorser", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "useContext", Type: [{ TypeName: "UsageContext" }], IsArray: true },
        { ElementName: "purpose", Type: [{ TypeName: "markdown" }] },
        { ElementName: "copyright", Type: [{ TypeName: "markdown" }] },
        { ElementName: "copyrightLabel", Type: [{ TypeName: "string" }] },
        { ElementName: "approvalDate", Type: [{ TypeName: "date" }] },
        { ElementName: "lastReviewDate", Type: [{ TypeName: "date" }] },
        { ElementName: "effectivePeriod", Type: [{ TypeName: "Period" }] },
        { ElementName: "relatesTo", Type: [{ TypeName: "evidencevariable_relatesTo" }], IsArray: true },
        { ElementName: "actual", Type: [{ TypeName: "boolean" }] },
        { ElementName: "definition", Type: [{ TypeName: "CodeableReference" }] },
        { ElementName: "definitionModifier", Type: [{ TypeName: "evidencevariable_definitionModifier" }], IsArray: true },
        { ElementName: "handling", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "category", Type: [{ TypeName: "evidencevariable_category" }], IsArray: true },
        { ElementName: "conditional", Type: [{ TypeName: "Expression" }] },
        { ElementName: "classifier", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "dataStorage", Type: [{ TypeName: "evidencevariable_dataStorage" }], IsArray: true },
        { ElementName: "timing", Type: [{ TypeName: "RelativeTime" }] },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "constraint", Type: [{ TypeName: "evidencevariable_constraint" }], IsArray: true },
        { ElementName: "missingDataMeaning", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "unacceptableDataHandling", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
    ],
};

export const evidencevariable_relatesTo: TypeModel = {
    TypeName: "evidencevariable_relatesTo",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "target[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }, { TypeName: "canonical" }, { TypeName: "markdown" }, { TypeName: "uri" }], Required: true },
    ],
};

export const evidencevariable_definitionModifier: TypeModel = {
    TypeName: "evidencevariable_definitionModifier",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Expression" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }, { TypeName: "RelativeTime" }, { TypeName: "boolean" }, { TypeName: "uri" }], Required: true },
    ],
};

export const evidencevariable_category: TypeModel = {
    TypeName: "evidencevariable_category",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "value[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }] },
    ],
};

export const evidencevariable_dataStorage: TypeModel = {
    TypeName: "evidencevariable_dataStorage",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "datatype", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "path", Type: [{ TypeName: "string" }] },
        { ElementName: "delimiter", Type: [{ TypeName: "string" }] },
        { ElementName: "component", Type: [{ TypeName: "evidencevariable_dataStorage" }], IsArray: true },
    ],
};

export const evidencevariable_constraint: TypeModel = {
    TypeName: "evidencevariable_constraint",
    BaseTypeName: "BackboneElement",
    Elements: [
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

export const ExampleScenario: TypeModel = {
    TypeName: "ExampleScenario",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "versionAlgorithm[x]", Type: [{ TypeName: "Coding" }, { TypeName: "string" }] },
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
        { ElementName: "copyrightLabel", Type: [{ TypeName: "string" }] },
        { ElementName: "actor", Type: [{ TypeName: "examplescenario_actor" }], IsArray: true },
        { ElementName: "instance", Type: [{ TypeName: "examplescenario_instance" }], IsArray: true },
        { ElementName: "process", Type: [{ TypeName: "examplescenario_process" }], IsArray: true },
    ],
};

export const examplescenario_actor: TypeModel = {
    TypeName: "examplescenario_actor",
    BaseTypeName: "BackboneElement",
    Elements: [
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

export const examplescenario_instance_version: TypeModel = {
    TypeName: "examplescenario_instance_version",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "key", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "title", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "content", Type: [{ TypeName: "Reference" }] },
    ],
};

export const examplescenario_instance_containedInstance: TypeModel = {
    TypeName: "examplescenario_instance_containedInstance",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "instanceReference", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "versionReference", Type: [{ TypeName: "string" }] },
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
        { ElementName: "number", Type: [{ TypeName: "string" }] },
        { ElementName: "process", Type: [{ TypeName: "examplescenario_process" }] },
        { ElementName: "workflow", Type: [{ TypeName: "canonical" }] },
        { ElementName: "operation", Type: [{ TypeName: "examplescenario_process_step_operation" }] },
        { ElementName: "alternative", Type: [{ TypeName: "examplescenario_process_step_alternative" }], IsArray: true },
        { ElementName: "pause", Type: [{ TypeName: "boolean" }] },
    ],
};

export const examplescenario_process_step_operation: TypeModel = {
    TypeName: "examplescenario_process_step_operation",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "Coding" }] },
        { ElementName: "title", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "definition", Type: [{ TypeName: "canonical" }] },
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
        { ElementName: "traceNumber", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "statusReason", Type: [{ TypeName: "string" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "subType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "use", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
        { ElementName: "billablePeriod", Type: [{ TypeName: "Period" }] },
        { ElementName: "created", Type: [{ TypeName: "dateTime" }], Required: true },
        { ElementName: "enterer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "insurer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "provider", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "priority", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "fundsReserveRequested", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "fundsReserve", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "related", Type: [{ TypeName: "explanationofbenefit_related" }], IsArray: true },
        { ElementName: "request", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DeviceRequest", "http://hl7.org/fhir/StructureDefinition/MedicationRequest", "http://hl7.org/fhir/StructureDefinition/NutritionOrder", "http://hl7.org/fhir/StructureDefinition/RequestOrchestration", "http://hl7.org/fhir/StructureDefinition/ServiceRequest", "http://hl7.org/fhir/StructureDefinition/VisionPrescription"] }] },
        { ElementName: "event", Type: [{ TypeName: "explanationofbenefit_event" }], IsArray: true },
        { ElementName: "payee", Type: [{ TypeName: "explanationofbenefit_payee" }] },
        { ElementName: "referral", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ServiceRequest"] }] },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }], IsArray: true },
        { ElementName: "facility", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "claim", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Claim"] }] },
        { ElementName: "claimResponse", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ClaimResponse"] }] },
        { ElementName: "outcome", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "decision", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "disposition", Type: [{ TypeName: "string" }] },
        { ElementName: "preAuthRef", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "preAuthRefPeriod", Type: [{ TypeName: "Period" }], IsArray: true },
        { ElementName: "diagnosisRelatedGroup", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "careTeam", Type: [{ TypeName: "explanationofbenefit_careTeam" }], IsArray: true },
        { ElementName: "supportingInfo", Type: [{ TypeName: "explanationofbenefit_supportingInfo" }], IsArray: true },
        { ElementName: "diagnosis", Type: [{ TypeName: "explanationofbenefit_diagnosis" }], IsArray: true },
        { ElementName: "procedure", Type: [{ TypeName: "explanationofbenefit_procedure" }], IsArray: true },
        { ElementName: "precedence", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "insurance", Type: [{ TypeName: "explanationofbenefit_insurance" }], IsArray: true },
        { ElementName: "accident", Type: [{ TypeName: "explanationofbenefit_accident" }] },
        { ElementName: "patientPaid", Type: [{ TypeName: "Money" }] },
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
        { ElementName: "claim", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Claim", "http://hl7.org/fhir/StructureDefinition/ExplanationOfBenefit"] }] },
        { ElementName: "relationship", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "reference", Type: [{ TypeName: "Identifier" }] },
    ],
};

export const explanationofbenefit_event: TypeModel = {
    TypeName: "explanationofbenefit_event",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "when[x]", Type: [{ TypeName: "Period" }, { TypeName: "dateTime" }], Required: true },
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
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "specialty", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const explanationofbenefit_supportingInfo: TypeModel = {
    TypeName: "explanationofbenefit_supportingInfo",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "sequence", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "subCategory", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "timing[x]", Type: [{ TypeName: "Period" }, { TypeName: "Timing" }, { TypeName: "dateTime" }] },
        { ElementName: "value[x]", Type: [{ TypeName: "Address" }, { TypeName: "Age" }, { TypeName: "Annotation" }, { TypeName: "Attachment" }, { TypeName: "Availability" }, { TypeName: "CodeableConcept" }, { TypeName: "CodeableReference" }, { TypeName: "Coding" }, { TypeName: "ContactDetail" }, { TypeName: "ContactPoint" }, { TypeName: "Count" }, { TypeName: "DataRequirement" }, { TypeName: "Distance" }, { TypeName: "Dosage" }, { TypeName: "Duration" }, { TypeName: "Expression" }, { TypeName: "ExtendedContactDetail" }, { TypeName: "HumanName" }, { TypeName: "Identifier" }, { TypeName: "Meta" }, { TypeName: "Money" }, { TypeName: "ParameterDefinition" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "RatioRange" }, { TypeName: "Reference" }, { TypeName: "RelatedArtifact" }, { TypeName: "SampledData" }, { TypeName: "Signature" }, { TypeName: "Timing" }, { TypeName: "TriggerDefinition" }, { TypeName: "UsageContext" }, { TypeName: "VirtualServiceDetail" }, { TypeName: "base64Binary" }, { TypeName: "boolean" }, { TypeName: "canonical" }, { TypeName: "code" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "id" }, { TypeName: "instant" }, { TypeName: "integer" }, { TypeName: "integer64" }, { TypeName: "markdown" }, { TypeName: "oid" }, { TypeName: "positiveInt" }, { TypeName: "string" }, { TypeName: "time" }, { TypeName: "unsignedInt" }, { TypeName: "uri" }, { TypeName: "url" }, { TypeName: "uuid" }] },
        { ElementName: "reason", Type: [{ TypeName: "Coding" }] },
    ],
};

export const explanationofbenefit_diagnosis: TypeModel = {
    TypeName: "explanationofbenefit_diagnosis",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "sequence", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "diagnosis", Type: [{ TypeName: "CodeableReference" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "onAdmission", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const explanationofbenefit_procedure: TypeModel = {
    TypeName: "explanationofbenefit_procedure",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "sequence", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "procedure", Type: [{ TypeName: "CodeableReference" }], Required: true },
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

export const explanationofbenefit_item_bodySite: TypeModel = {
    TypeName: "explanationofbenefit_item_bodySite",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "site", Type: [{ TypeName: "CodeableReference" }], IsArray: true, Required: true },
        { ElementName: "subSite", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
    ],
};

export const explanationofbenefit_item_reviewOutcome: TypeModel = {
    TypeName: "explanationofbenefit_item_reviewOutcome",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "decision", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "reason", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "preAuthRef", Type: [{ TypeName: "string" }] },
        { ElementName: "preAuthPeriod", Type: [{ TypeName: "Period" }] },
    ],
};

export const explanationofbenefit_item_adjudication: TypeModel = {
    TypeName: "explanationofbenefit_item_adjudication",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "reason", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "amount", Type: [{ TypeName: "Money" }] },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "decisionDate", Type: [{ TypeName: "dateTime" }] },
    ],
};

export const explanationofbenefit_item_detail: TypeModel = {
    TypeName: "explanationofbenefit_item_detail",
    BaseTypeName: "BackboneElement",
    Elements: [
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

export const explanationofbenefit_addItem: TypeModel = {
    TypeName: "explanationofbenefit_addItem",
    BaseTypeName: "BackboneElement",
    Elements: [
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
        { ElementName: "site", Type: [{ TypeName: "CodeableReference" }], IsArray: true, Required: true },
        { ElementName: "subSite", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
    ],
};

export const explanationofbenefit_addItem_detail: TypeModel = {
    TypeName: "explanationofbenefit_addItem_detail",
    BaseTypeName: "BackboneElement",
    Elements: [
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
        { ElementName: "class", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "number", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "text", Type: [{ TypeName: "markdown" }] },
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
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "dataAbsentReason", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "patient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "recorder", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "asserter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "relationship", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "sex", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "born[x]", Type: [{ TypeName: "Period" }, { TypeName: "date" }, { TypeName: "string" }] },
        { ElementName: "age[x]", Type: [{ TypeName: "Age" }, { TypeName: "Range" }, { TypeName: "string" }] },
        { ElementName: "deceased[x]", Type: [{ TypeName: "Age" }, { TypeName: "Range" }, { TypeName: "boolean" }, { TypeName: "date" }, { TypeName: "string" }] },
        { ElementName: "reason", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "condition", Type: [{ TypeName: "familymemberhistory_condition" }], IsArray: true },
        { ElementName: "procedure", Type: [{ TypeName: "familymemberhistory_procedure" }], IsArray: true },
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

export const familymemberhistory_procedure: TypeModel = {
    TypeName: "familymemberhistory_procedure",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "outcome", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "contributedToDeath", Type: [{ TypeName: "boolean" }] },
        { ElementName: "performed[x]", Type: [{ TypeName: "Age" }, { TypeName: "Period" }, { TypeName: "Range" }, { TypeName: "dateTime" }, { TypeName: "string" }] },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
    ],
};

export const Flag: TypeModel = {
    TypeName: "Flag",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }] },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Medication", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/PlanDefinition", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/Procedure", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "author", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "supportingInfo", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/AllergyIntolerance", "http://hl7.org/fhir/StructureDefinition/Condition", "http://hl7.org/fhir/StructureDefinition/DiagnosticReport", "http://hl7.org/fhir/StructureDefinition/DocumentReference", "http://hl7.org/fhir/StructureDefinition/Observation", "http://hl7.org/fhir/StructureDefinition/Procedure", "http://hl7.org/fhir/StructureDefinition/RiskAssessment"] }], IsArray: true },
    ],
};

export const Goal: TypeModel = {
    TypeName: "Goal",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "lifecycleStatus", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "lifecycleStatusReason", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "achievementStatus", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "achievementStatusDate", Type: [{ TypeName: "date" }] },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "continuous", Type: [{ TypeName: "boolean" }] },
        { ElementName: "priority", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "description", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
        { ElementName: "start[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "date" }] },
        { ElementName: "acceptance", Type: [{ TypeName: "goal_acceptance" }], IsArray: true },
        { ElementName: "target", Type: [{ TypeName: "goal_target" }], IsArray: true },
        { ElementName: "recorder", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "source", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "addresses", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Condition", "http://hl7.org/fhir/StructureDefinition/MedicationRequest", "http://hl7.org/fhir/StructureDefinition/MedicationStatement", "http://hl7.org/fhir/StructureDefinition/NutritionIntake", "http://hl7.org/fhir/StructureDefinition/NutritionOrder", "http://hl7.org/fhir/StructureDefinition/Observation", "http://hl7.org/fhir/StructureDefinition/Procedure", "http://hl7.org/fhir/StructureDefinition/RiskAssessment", "http://hl7.org/fhir/StructureDefinition/ServiceRequest"] }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
    ],
};

export const goal_acceptance: TypeModel = {
    TypeName: "goal_acceptance",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "participant", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
        { ElementName: "status", Type: [{ TypeName: "code" }] },
        { ElementName: "priority", Type: [{ TypeName: "CodeableConcept" }] },
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

export const Group: TypeModel = {
    TypeName: "Group",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "versionAlgorithm[x]", Type: [{ TypeName: "Coding" }, { TypeName: "string" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }] },
        { ElementName: "experimental", Type: [{ TypeName: "boolean" }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "publisher", Type: [{ TypeName: "string" }] },
        { ElementName: "contact", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "useContext", Type: [{ TypeName: "UsageContext" }], IsArray: true },
        { ElementName: "purpose", Type: [{ TypeName: "markdown" }] },
        { ElementName: "copyright", Type: [{ TypeName: "markdown" }] },
        { ElementName: "copyrightLabel", Type: [{ TypeName: "string" }] },
        { ElementName: "type", Type: [{ TypeName: "code" }] },
        { ElementName: "membership", Type: [{ TypeName: "code" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "quantity", Type: [{ TypeName: "unsignedInt" }] },
        { ElementName: "managingEntity", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "combinationMethod", Type: [{ TypeName: "code" }] },
        { ElementName: "combinationThreshold", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "characteristic", Type: [{ TypeName: "group_characteristic" }], IsArray: true },
        { ElementName: "member", Type: [{ TypeName: "group_member" }], IsArray: true },
    ],
};

export const group_characteristic: TypeModel = {
    TypeName: "group_characteristic",
    BaseTypeName: "BackboneElement",
    Elements: [
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
        { ElementName: "relativeTime", Type: [{ TypeName: "RelativeTime" }], IsArray: true },
    ],
};

export const group_member: TypeModel = {
    TypeName: "group_member",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "entity", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/BiologicallyDerivedProduct", "http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Medication", "http://hl7.org/fhir/StructureDefinition/MedicinalProductDefinition", "http://hl7.org/fhir/StructureDefinition/NutritionProduct", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson", "http://hl7.org/fhir/StructureDefinition/Specimen", "http://hl7.org/fhir/StructureDefinition/Substance", "http://hl7.org/fhir/StructureDefinition/SubstanceDefinition"] }], Required: true },
        { ElementName: "involvement", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
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
        { ElementName: "topic", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Patient"] }] },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "occurrenceDateTime", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "performer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }] },
        { ElementName: "location", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "reason", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "evaluationMessage", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/OperationOutcome"] }], IsArray: true },
        { ElementName: "inputParameters", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Parameters"] }] },
        { ElementName: "outputParameters", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Parameters"] }] },
        { ElementName: "indicator", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "result", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Appointment", "http://hl7.org/fhir/StructureDefinition/AppointmentResponse", "http://hl7.org/fhir/StructureDefinition/CarePlan", "http://hl7.org/fhir/StructureDefinition/Claim", "http://hl7.org/fhir/StructureDefinition/CommunicationRequest", "http://hl7.org/fhir/StructureDefinition/CoverageEligibilityRequest", "http://hl7.org/fhir/StructureDefinition/DeviceRequest", "http://hl7.org/fhir/StructureDefinition/MedicationRequest", "http://hl7.org/fhir/StructureDefinition/NutritionOrder", "http://hl7.org/fhir/StructureDefinition/RequestOrchestration", "http://hl7.org/fhir/StructureDefinition/ServiceRequest", "http://hl7.org/fhir/StructureDefinition/Task", "http://hl7.org/fhir/StructureDefinition/VisionPrescription"] }], IsArray: true },
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
        { ElementName: "offeredIn", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/HealthcareService"] }], IsArray: true },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "specialty", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "location", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }], IsArray: true },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "comment", Type: [{ TypeName: "markdown" }] },
        { ElementName: "extraDetails", Type: [{ TypeName: "markdown" }] },
        { ElementName: "photo", Type: [{ TypeName: "Attachment" }] },
        { ElementName: "contact", Type: [{ TypeName: "ExtendedContactDetail" }], IsArray: true },
        { ElementName: "coverageArea", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }], IsArray: true },
        { ElementName: "serviceProvisionCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "eligibility", Type: [{ TypeName: "healthcareservice_eligibility" }], IsArray: true },
        { ElementName: "program", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "characteristic", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "communication", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "referralMethod", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "referralRequired", Type: [{ TypeName: "boolean" }] },
        { ElementName: "appointmentRequired", Type: [{ TypeName: "boolean" }] },
        { ElementName: "availability", Type: [{ TypeName: "Availability" }] },
        { ElementName: "endpoint", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Endpoint"] }], IsArray: true },
    ],
};

export const healthcareservice_eligibility: TypeModel = {
    TypeName: "healthcareservice_eligibility",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "value[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Reference" }, { TypeName: "boolean" }] },
        { ElementName: "comment", Type: [{ TypeName: "markdown" }] },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
    ],
};

export const ImagingSelection: TypeModel = {
    TypeName: "ImagingSelection",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "modality", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Medication", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/Procedure", "http://hl7.org/fhir/StructureDefinition/Specimen", "http://hl7.org/fhir/StructureDefinition/Substance"] }] },
        { ElementName: "issued", Type: [{ TypeName: "instant" }] },
        { ElementName: "performer", Type: [{ TypeName: "imagingselection_performer" }], IsArray: true },
        { ElementName: "basedOn", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Appointment", "http://hl7.org/fhir/StructureDefinition/CarePlan", "http://hl7.org/fhir/StructureDefinition/ServiceRequest", "http://hl7.org/fhir/StructureDefinition/Task"] }], IsArray: true },
        { ElementName: "derivedFrom", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DocumentReference", "http://hl7.org/fhir/StructureDefinition/ImagingStudy"] }] },
        { ElementName: "studyUid", Type: [{ TypeName: "id" }] },
        { ElementName: "seriesUid", Type: [{ TypeName: "id" }] },
        { ElementName: "seriesNumber", Type: [{ TypeName: "unsignedInt" }] },
        { ElementName: "frameOfReferenceUid", Type: [{ TypeName: "id" }] },
        { ElementName: "bodySite", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "focus", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ImagingSelection"] }], IsArray: true },
        { ElementName: "endpoint", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Endpoint"] }], IsArray: true },
        { ElementName: "instance", Type: [{ TypeName: "imagingselection_instance" }], IsArray: true },
        { ElementName: "imageRegion3D", Type: [{ TypeName: "imagingselection_imageRegion3D" }], IsArray: true },
    ],
};

export const imagingselection_performer: TypeModel = {
    TypeName: "imagingselection_performer",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "function", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "actor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
    ],
};

export const imagingselection_instance: TypeModel = {
    TypeName: "imagingselection_instance",
    BaseTypeName: "BackboneElement",
    Elements: [
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
        { ElementName: "regionType", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "coordinate", Type: [{ TypeName: "decimal" }], IsArray: true, Required: true },
    ],
};

export const imagingselection_imageRegion3D: TypeModel = {
    TypeName: "imagingselection_imageRegion3D",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "regionType", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "coordinate", Type: [{ TypeName: "decimal" }], IsArray: true, Required: true },
    ],
};

export const ImagingStudy: TypeModel = {
    TypeName: "ImagingStudy",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "modality", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "started", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "basedOn", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Appointment", "http://hl7.org/fhir/StructureDefinition/CarePlan", "http://hl7.org/fhir/StructureDefinition/ServiceRequest", "http://hl7.org/fhir/StructureDefinition/Task"] }], IsArray: true },
        { ElementName: "procedure", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Procedure"] }], IsArray: true },
        { ElementName: "referrer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "endpoint", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Endpoint"] }], IsArray: true },
        { ElementName: "location", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "reason", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "numberOfSeries", Type: [{ TypeName: "unsignedInt" }] },
        { ElementName: "numberOfInstances", Type: [{ TypeName: "unsignedInt" }] },
        { ElementName: "series", Type: [{ TypeName: "imagingstudy_series" }], IsArray: true },
    ],
};

export const imagingstudy_series: TypeModel = {
    TypeName: "imagingstudy_series",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "uid", Type: [{ TypeName: "id" }], Required: true },
        { ElementName: "number", Type: [{ TypeName: "unsignedInt" }] },
        { ElementName: "modality", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "numberOfInstances", Type: [{ TypeName: "unsignedInt" }] },
        { ElementName: "endpoint", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Endpoint"] }], IsArray: true },
        { ElementName: "bodySite", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
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
        { ElementName: "actor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
    ],
};

export const imagingstudy_series_instance: TypeModel = {
    TypeName: "imagingstudy_series_instance",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "uid", Type: [{ TypeName: "id" }], Required: true },
        { ElementName: "sopClass", Type: [{ TypeName: "oid" }], Required: true },
        { ElementName: "number", Type: [{ TypeName: "unsignedInt" }] },
        { ElementName: "numberOfFrames", Type: [{ TypeName: "unsignedInt" }] },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
    ],
};

export const Immunization: TypeModel = {
    TypeName: "Immunization",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "basedOn", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CarePlan", "http://hl7.org/fhir/StructureDefinition/MedicationRequest", "http://hl7.org/fhir/StructureDefinition/ServiceRequest"] }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "statusReason", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "vaccineCode", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "administeredProduct", Type: [{ TypeName: "CodeableReference" }] },
        { ElementName: "manufacturer", Type: [{ TypeName: "CodeableReference" }] },
        { ElementName: "lotNumber", Type: [{ TypeName: "string" }] },
        { ElementName: "expirationDate", Type: [{ TypeName: "date" }] },
        { ElementName: "patient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "supportingInformation", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "occurrence[x]", Type: [{ TypeName: "dateTime" }, { TypeName: "string" }], Required: true },
        { ElementName: "primarySource", Type: [{ TypeName: "boolean" }] },
        { ElementName: "informationSource", Type: [{ TypeName: "CodeableReference" }] },
        { ElementName: "location", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "site", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "route", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "doseQuantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "performer", Type: [{ TypeName: "immunization_performer" }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "reason", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "isSubpotent", Type: [{ TypeName: "boolean" }] },
        { ElementName: "subpotentReason", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "programEligibility", Type: [{ TypeName: "immunization_programEligibility" }], IsArray: true },
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
        { ElementName: "actor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
    ],
};

export const immunization_programEligibility: TypeModel = {
    TypeName: "immunization_programEligibility",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "program", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "programStatus", Type: [{ TypeName: "CodeableConcept" }], Required: true },
    ],
};

export const immunization_reaction: TypeModel = {
    TypeName: "immunization_reaction",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "manifestation", Type: [{ TypeName: "CodeableReference" }] },
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
        { ElementName: "doseNumber", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "seriesDoses", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const ImplementationGuide: TypeModel = {
    TypeName: "ImplementationGuide",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }], Required: true },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "versionAlgorithm[x]", Type: [{ TypeName: "Coding" }, { TypeName: "string" }] },
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
        { ElementName: "copyrightLabel", Type: [{ TypeName: "string" }] },
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
        { ElementName: "reason", Type: [{ TypeName: "markdown" }] },
    ],
};

export const implementationguide_global: TypeModel = {
    TypeName: "implementationguide_global",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "uri" }], Required: true },
        { ElementName: "profile", Type: [{ TypeName: "canonical" }], Required: true },
    ],
};

export const implementationguide_definition: TypeModel = {
    TypeName: "implementationguide_definition",
    BaseTypeName: "BackboneElement",
    Elements: [
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
        { ElementName: "name", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
    ],
};

export const implementationguide_definition_resource: TypeModel = {
    TypeName: "implementationguide_definition_resource",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "reference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], Required: true },
        { ElementName: "fhirVersion", Type: [{ TypeName: "code" }], IsArray: true },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "isExample", Type: [{ TypeName: "boolean" }] },
        { ElementName: "profile", Type: [{ TypeName: "canonical" }], IsArray: true },
        { ElementName: "groupingId", Type: [{ TypeName: "id" }] },
    ],
};

export const implementationguide_definition_page: TypeModel = {
    TypeName: "implementationguide_definition_page",
    BaseTypeName: "BackboneElement",
    Elements: [
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
        { ElementName: "code", Type: [{ TypeName: "Coding" }], Required: true },
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
        { ElementName: "isExample", Type: [{ TypeName: "boolean" }] },
        { ElementName: "profile", Type: [{ TypeName: "canonical" }], IsArray: true },
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

export const Ingredient: TypeModel = {
    TypeName: "Ingredient",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "for", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/AdministrableProductDefinition", "http://hl7.org/fhir/StructureDefinition/ManufacturedItemDefinition", "http://hl7.org/fhir/StructureDefinition/MedicinalProductDefinition"] }], IsArray: true },
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "function", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "group", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "allergenicIndicator", Type: [{ TypeName: "boolean" }] },
        { ElementName: "comment", Type: [{ TypeName: "markdown" }] },
        { ElementName: "manufacturer", Type: [{ TypeName: "ingredient_manufacturer" }], IsArray: true },
        { ElementName: "substance", Type: [{ TypeName: "ingredient_substance" }], Required: true },
    ],
};

export const ingredient_manufacturer: TypeModel = {
    TypeName: "ingredient_manufacturer",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "role", Type: [{ TypeName: "code" }] },
        { ElementName: "manufacturer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }], Required: true },
    ],
};

export const ingredient_substance: TypeModel = {
    TypeName: "ingredient_substance",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "CodeableReference" }], Required: true },
        { ElementName: "strength", Type: [{ TypeName: "ingredient_substance_strength" }], IsArray: true },
    ],
};

export const ingredient_substance_strength: TypeModel = {
    TypeName: "ingredient_substance_strength",
    BaseTypeName: "BackboneElement",
    Elements: [
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
        { ElementName: "substance", Type: [{ TypeName: "CodeableReference" }], Required: true },
        { ElementName: "strength[x]", Type: [{ TypeName: "Quantity" }, { TypeName: "Ratio" }, { TypeName: "RatioRange" }], Required: true },
        { ElementName: "measurementPoint", Type: [{ TypeName: "string" }] },
        { ElementName: "country", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
    ],
};

export const Library: TypeModel = {
    TypeName: "Library",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "versionAlgorithm[x]", Type: [{ TypeName: "Coding" }, { TypeName: "string" }] },
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
        { ElementName: "usage", Type: [{ TypeName: "markdown" }] },
        { ElementName: "copyright", Type: [{ TypeName: "markdown" }] },
        { ElementName: "copyrightLabel", Type: [{ TypeName: "string" }] },
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

export const List: TypeModel = {
    TypeName: "List",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "mode", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "source", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "contributor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], IsArray: true },
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
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "alias", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "mode", Type: [{ TypeName: "code" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "contact", Type: [{ TypeName: "ExtendedContactDetail" }], IsArray: true },
        { ElementName: "address", Type: [{ TypeName: "Address" }] },
        { ElementName: "form", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "position", Type: [{ TypeName: "location_position" }] },
        { ElementName: "managingOrganization", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "partOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "characteristic", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "hoursOfOperation", Type: [{ TypeName: "Availability" }] },
        { ElementName: "virtualService", Type: [{ TypeName: "VirtualServiceDetail" }], IsArray: true },
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

export const ManufacturedItemDefinition: TypeModel = {
    TypeName: "ManufacturedItemDefinition",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "manufacturedDoseForm", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "unitOfPresentation", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "manufacturer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }], IsArray: true },
        { ElementName: "marketingStatus", Type: [{ TypeName: "MarketingStatus" }], IsArray: true },
        { ElementName: "ingredient", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "property", Type: [{ TypeName: "manufactureditemdefinition_property" }], IsArray: true },
        { ElementName: "component", Type: [{ TypeName: "manufactureditemdefinition_component" }], IsArray: true },
    ],
};

export const manufactureditemdefinition_property: TypeModel = {
    TypeName: "manufactureditemdefinition_property",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "CodeableConcept" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Binary"] }, { TypeName: "boolean" }, { TypeName: "date" }, { TypeName: "markdown" }] },
    ],
};

export const manufactureditemdefinition_component: TypeModel = {
    TypeName: "manufactureditemdefinition_component",
    BaseTypeName: "BackboneElement",
    Elements: [
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
        { ElementName: "amount", Type: [{ TypeName: "Quantity" }], IsArray: true },
        { ElementName: "location", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "function", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "hasIngredient", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
    ],
};

export const Measure: TypeModel = {
    TypeName: "Measure",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "versionAlgorithm[x]", Type: [{ TypeName: "Coding" }, { TypeName: "string" }] },
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
        { ElementName: "usage", Type: [{ TypeName: "markdown" }] },
        { ElementName: "copyright", Type: [{ TypeName: "markdown" }] },
        { ElementName: "copyrightLabel", Type: [{ TypeName: "string" }] },
        { ElementName: "approvalDate", Type: [{ TypeName: "date" }] },
        { ElementName: "lastReviewDate", Type: [{ TypeName: "date" }] },
        { ElementName: "effectivePeriod", Type: [{ TypeName: "Period" }] },
        { ElementName: "reportingFrequency", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "topic", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "author", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "editor", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "reviewer", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "endorser", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "relatedArtifact", Type: [{ TypeName: "RelatedArtifact" }], IsArray: true },
        { ElementName: "library", Type: [{ TypeName: "canonical" }], IsArray: true },
        { ElementName: "disclaimer", Type: [{ TypeName: "markdown" }] },
        { ElementName: "riskAdjustment", Type: [{ TypeName: "markdown" }] },
        { ElementName: "rateAggregation", Type: [{ TypeName: "markdown" }] },
        { ElementName: "rationale", Type: [{ TypeName: "markdown" }] },
        { ElementName: "clinicalRecommendationStatement", Type: [{ TypeName: "markdown" }] },
        { ElementName: "term", Type: [{ TypeName: "measure_term" }], IsArray: true },
        { ElementName: "group", Type: [{ TypeName: "measure_group" }], IsArray: true },
        { ElementName: "supplementalData", Type: [{ TypeName: "measure_supplementalData" }], IsArray: true },
    ],
};

export const measure_term: TypeModel = {
    TypeName: "measure_term",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "definition", Type: [{ TypeName: "markdown" }] },
    ],
};

export const measure_group: TypeModel = {
    TypeName: "measure_group",
    BaseTypeName: "BackboneElement",
    Elements: [
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
        { ElementName: "measure", Type: [{ TypeName: "canonical" }] },
        { ElementName: "groupId", Type: [{ TypeName: "string" }] },
        { ElementName: "weight", Type: [{ TypeName: "decimal" }] },
    ],
};

export const measure_group_population: TypeModel = {
    TypeName: "measure_group_population",
    BaseTypeName: "BackboneElement",
    Elements: [
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
        { ElementName: "linkId", Type: [{ TypeName: "string" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "usage", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "criteria", Type: [{ TypeName: "Expression" }], Required: true },
        { ElementName: "valueSet", Type: [{ TypeName: "canonical" }] },
        { ElementName: "unit", Type: [{ TypeName: "string" }] },
    ],
};

export const MeasureReport: TypeModel = {
    TypeName: "MeasureReport",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "messages", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/OperationOutcome"] }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "code" }] },
        { ElementName: "dataUpdateType", Type: [{ TypeName: "code" }] },
        { ElementName: "measure", Type: [{ TypeName: "canonical" }] },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "reporter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "reportingVendor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "location", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }], IsArray: true },
        { ElementName: "period", Type: [{ TypeName: "Period" }], Required: true },
        { ElementName: "inputParameters", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Parameters"] }] },
        { ElementName: "group", Type: [{ TypeName: "measurereport_group" }], IsArray: true },
        { ElementName: "supplementalData", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "evaluatedResource", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
    ],
};

export const measurereport_group: TypeModel = {
    TypeName: "measurereport_group",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "linkId", Type: [{ TypeName: "string" }] },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "calculatedDate", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "scoring", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "compositeScoring", Type: [{ TypeName: "CodeableConcept" }] },
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
        { ElementName: "value[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Reference" }, { TypeName: "boolean" }, { TypeName: "string" }] },
        { ElementName: "component", Type: [{ TypeName: "measurereport_group_stratifier_stratum_component" }], IsArray: true },
        { ElementName: "population", Type: [{ TypeName: "measurereport_group_stratifier_stratum_population" }], IsArray: true },
        { ElementName: "measureScore[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Duration" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "boolean" }, { TypeName: "dateTime" }] },
    ],
};

export const measurereport_group_stratifier_stratum_component: TypeModel = {
    TypeName: "measurereport_group_stratifier_stratum_component",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "linkId", Type: [{ TypeName: "string" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "value[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Reference" }, { TypeName: "boolean" }, { TypeName: "string" }], Required: true },
    ],
};

export const measurereport_group_stratifier_stratum_population: TypeModel = {
    TypeName: "measurereport_group_stratifier_stratum_population",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "linkId", Type: [{ TypeName: "string" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "count", Type: [{ TypeName: "integer" }] },
        { ElementName: "countQuantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "subjectResults", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/List"] }] },
        { ElementName: "subjectReport", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MeasureReport"] }], IsArray: true },
        { ElementName: "subjects", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }] },
    ],
};

export const Medication: TypeModel = {
    TypeName: "Medication",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }] },
        { ElementName: "marketingAuthorizationHolder", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "doseForm", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "packageSize", Type: [{ TypeName: "medication_packageSize" }] },
        { ElementName: "ingredient", Type: [{ TypeName: "medication_ingredient" }], IsArray: true },
        { ElementName: "instance", Type: [{ TypeName: "medication_instance" }] },
        { ElementName: "definition", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/AdministrableProductDefinition", "http://hl7.org/fhir/StructureDefinition/ManufacturedItemDefinition", "http://hl7.org/fhir/StructureDefinition/MedicinalProductDefinition", "http://hl7.org/fhir/StructureDefinition/PackagedProductDefinition"] }] },
    ],
};

export const medication_packageSize: TypeModel = {
    TypeName: "medication_packageSize",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "numberOfItems", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "amountPerItem", Type: [{ TypeName: "Ratio" }] },
    ],
};

export const medication_ingredient: TypeModel = {
    TypeName: "medication_ingredient",
    BaseTypeName: "BackboneElement",
    Elements: [
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
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "lotNumber", Type: [{ TypeName: "string" }] },
        { ElementName: "expirationDate", Type: [{ TypeName: "dateTime" }] },
    ],
};

export const MedicationAdministration: TypeModel = {
    TypeName: "MedicationAdministration",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "basedOn", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CarePlan"] }], IsArray: true },
        { ElementName: "partOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MedicationAdministration", "http://hl7.org/fhir/StructureDefinition/MedicationDispense", "http://hl7.org/fhir/StructureDefinition/Procedure"] }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "statusReason", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "medication", Type: [{ TypeName: "CodeableReference" }], Required: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "supportingInformation", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "occurrence[x]", Type: [{ TypeName: "Period" }, { TypeName: "Timing" }, { TypeName: "dateTime" }], Required: true },
        { ElementName: "recorded", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "isSubPotent", Type: [{ TypeName: "boolean" }] },
        { ElementName: "subPotentReason", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "performer", Type: [{ TypeName: "medicationadministration_performer" }], IsArray: true },
        { ElementName: "reason", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "request", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MedicationRequest"] }] },
        { ElementName: "device", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
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
        { ElementName: "actor", Type: [{ TypeName: "CodeableReference" }], Required: true },
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
        { ElementName: "basedOn", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CarePlan"] }], IsArray: true },
        { ElementName: "partOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MedicationAdministration", "http://hl7.org/fhir/StructureDefinition/Procedure"] }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "notPerformedReason", Type: [{ TypeName: "CodeableReference" }] },
        { ElementName: "statusChanged", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "medication", Type: [{ TypeName: "CodeableReference" }], Required: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "supportingInformation", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "performer", Type: [{ TypeName: "medicationdispense_performer" }], IsArray: true },
        { ElementName: "location", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "authorizingPrescription", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MedicationRequest"] }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "daysSupply", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "fillNumber", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "recorded", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "whenPrepared", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "whenHandedOver", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "destination", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "receiver", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "dosageInstruction", Type: [{ TypeName: "DosageDetails" }] },
        { ElementName: "doseAdministrationAid", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "substitution", Type: [{ TypeName: "medicationdispense_substitution" }] },
        { ElementName: "eventHistory", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Provenance"] }], IsArray: true },
    ],
};

export const medicationdispense_performer: TypeModel = {
    TypeName: "medicationdispense_performer",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "function", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "actor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
    ],
};

export const medicationdispense_substitution: TypeModel = {
    TypeName: "medicationdispense_substitution",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "wasSubstituted", Type: [{ TypeName: "boolean" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "reason", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "responsibleParty", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
    ],
};

export const MedicationRequest: TypeModel = {
    TypeName: "MedicationRequest",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "basedOn", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CarePlan", "http://hl7.org/fhir/StructureDefinition/MedicationRequest", "http://hl7.org/fhir/StructureDefinition/RequestOrchestration", "http://hl7.org/fhir/StructureDefinition/ServiceRequest"] }], IsArray: true },
        { ElementName: "priorPrescription", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MedicationRequest"] }] },
        { ElementName: "groupIdentifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "statusReason", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "statusChanged", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "intent", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "priority", Type: [{ TypeName: "code" }] },
        { ElementName: "doNotPerform", Type: [{ TypeName: "boolean" }] },
        { ElementName: "medication", Type: [{ TypeName: "CodeableReference" }], Required: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
        { ElementName: "informationSource", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], IsArray: true },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "supportingInformation", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "authoredOn", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "requester", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "isRecordOfRequest", Type: [{ TypeName: "boolean" }] },
        { ElementName: "performerType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "performer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/DeviceDefinition", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], IsArray: true },
        { ElementName: "device", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "recorder", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "reason", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "courseOfTherapyType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "insurance", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ClaimResponse", "http://hl7.org/fhir/StructureDefinition/Coverage"] }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "effectiveTiming[x]", Type: [{ TypeName: "Duration" }, { TypeName: "Period" }, { TypeName: "Range" }] },
        { ElementName: "dosageInstruction", Type: [{ TypeName: "DosageDetails" }] },
        { ElementName: "dispenseRequest", Type: [{ TypeName: "medicationrequest_dispenseRequest" }] },
        { ElementName: "substitution", Type: [{ TypeName: "medicationrequest_substitution" }] },
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
        { ElementName: "partOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MedicationStatement", "http://hl7.org/fhir/StructureDefinition/Procedure"] }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "medication", Type: [{ TypeName: "CodeableReference" }], Required: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "effective[x]", Type: [{ TypeName: "Period" }, { TypeName: "Timing" }, { TypeName: "dateTime" }] },
        { ElementName: "dateAsserted", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "author", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "informationSource", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], IsArray: true },
        { ElementName: "derivedFrom", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "reason", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "relatedClinicalInformation", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Condition", "http://hl7.org/fhir/StructureDefinition/Observation"] }], IsArray: true },
        { ElementName: "dosage", Type: [{ TypeName: "DosageDetails" }] },
        { ElementName: "adherence", Type: [{ TypeName: "medicationstatement_adherence" }] },
    ],
};

export const medicationstatement_adherence: TypeModel = {
    TypeName: "medicationstatement_adherence",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "reason", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const MedicinalProductDefinition: TypeModel = {
    TypeName: "MedicinalProductDefinition",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "domain", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "status", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "statusDate", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "combinedPharmaceuticalDoseForm", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "route", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "indication", Type: [{ TypeName: "markdown" }] },
        { ElementName: "legalStatusOfSupply", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "additionalMonitoringIndicator", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "specialMeasures", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "pediatricUseIndicator", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "classification", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "marketingStatus", Type: [{ TypeName: "MarketingStatus" }], IsArray: true },
        { ElementName: "packagedMedicinalProduct", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "comprisedOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DeviceDefinition", "http://hl7.org/fhir/StructureDefinition/ManufacturedItemDefinition"] }], IsArray: true },
        { ElementName: "ingredient", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "impurity", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "attachedDocument", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DocumentReference"] }], IsArray: true },
        { ElementName: "masterFile", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DocumentReference"] }], IsArray: true },
        { ElementName: "contact", Type: [{ TypeName: "medicinalproductdefinition_contact" }], IsArray: true },
        { ElementName: "clinicalTrial", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ResearchStudy"] }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "Coding" }], IsArray: true },
        { ElementName: "name", Type: [{ TypeName: "medicinalproductdefinition_name" }], IsArray: true, Required: true },
        { ElementName: "crossReference", Type: [{ TypeName: "medicinalproductdefinition_crossReference" }], IsArray: true },
        { ElementName: "operation", Type: [{ TypeName: "medicinalproductdefinition_operation" }], IsArray: true },
        { ElementName: "characteristic", Type: [{ TypeName: "medicinalproductdefinition_characteristic" }], IsArray: true },
    ],
};

export const medicinalproductdefinition_contact: TypeModel = {
    TypeName: "medicinalproductdefinition_contact",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "contact", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }], Required: true },
    ],
};

export const medicinalproductdefinition_name: TypeModel = {
    TypeName: "medicinalproductdefinition_name",
    BaseTypeName: "BackboneElement",
    Elements: [
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
        { ElementName: "part", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
    ],
};

export const medicinalproductdefinition_name_usage: TypeModel = {
    TypeName: "medicinalproductdefinition_name_usage",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "country", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "jurisdiction", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "language", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const medicinalproductdefinition_crossReference: TypeModel = {
    TypeName: "medicinalproductdefinition_crossReference",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "product", Type: [{ TypeName: "CodeableReference" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const medicinalproductdefinition_operation: TypeModel = {
    TypeName: "medicinalproductdefinition_operation",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableReference" }] },
        { ElementName: "effectiveDate", Type: [{ TypeName: "Period" }] },
        { ElementName: "organization", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }], IsArray: true },
        { ElementName: "confidentialityIndicator", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const medicinalproductdefinition_characteristic: TypeModel = {
    TypeName: "medicinalproductdefinition_characteristic",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "CodeableConcept" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "boolean" }, { TypeName: "date" }, { TypeName: "integer" }, { TypeName: "markdown" }] },
    ],
};

export const MessageDefinition: TypeModel = {
    TypeName: "MessageDefinition",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "versionAlgorithm[x]", Type: [{ TypeName: "Coding" }, { TypeName: "string" }] },
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
        { ElementName: "copyrightLabel", Type: [{ TypeName: "string" }] },
        { ElementName: "base", Type: [{ TypeName: "canonical" }] },
        { ElementName: "parent", Type: [{ TypeName: "canonical" }], IsArray: true },
        { ElementName: "event[x]", Type: [{ TypeName: "Coding" }, { TypeName: "uri" }], Required: true },
        { ElementName: "category", Type: [{ TypeName: "code" }] },
        { ElementName: "focus", Type: [{ TypeName: "messagedefinition_focus" }], IsArray: true },
        { ElementName: "responseRequired", Type: [{ TypeName: "code" }] },
        { ElementName: "allowedResponse", Type: [{ TypeName: "messagedefinition_allowedResponse" }], IsArray: true },
    ],
};

export const messagedefinition_focus: TypeModel = {
    TypeName: "messagedefinition_focus",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "uri" }], Required: true },
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
        { ElementName: "event[x]", Type: [{ TypeName: "Coding" }, { TypeName: "canonical" }, { TypeName: "uri" }], Required: true },
        { ElementName: "destination", Type: [{ TypeName: "messageheader_destination" }], IsArray: true },
        { ElementName: "source", Type: [{ TypeName: "messageheader_source" }], Required: true },
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
        { ElementName: "endpoint[x]", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Endpoint"] }, { TypeName: "url" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "receiver", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
    ],
};

export const messageheader_source: TypeModel = {
    TypeName: "messageheader_source",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "endpoint[x]", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Endpoint"] }, { TypeName: "url" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "software", Type: [{ TypeName: "string" }] },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "contact", Type: [{ TypeName: "ContactPoint" }] },
        { ElementName: "sender", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
    ],
};

export const messageheader_response: TypeModel = {
    TypeName: "messageheader_response",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], Required: true },
        { ElementName: "code", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "details", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/OperationOutcome"] }] },
    ],
};

export const MetadataResource: TypeModel = {
    TypeName: "MetadataResource",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "usage", Type: [{ TypeName: "markdown" }] },
        { ElementName: "approvalDate", Type: [{ TypeName: "date" }] },
        { ElementName: "lastReviewDate", Type: [{ TypeName: "date" }] },
        { ElementName: "effectivePeriod", Type: [{ TypeName: "Period" }] },
        { ElementName: "author", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "editor", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "reviewer", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "endorser", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "relatedArtifact", Type: [{ TypeName: "RelatedArtifact" }], IsArray: true },
    ],
};

export const NamingSystem: TypeModel = {
    TypeName: "NamingSystem",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "versionAlgorithm[x]", Type: [{ TypeName: "Coding" }, { TypeName: "string" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "kind", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "experimental", Type: [{ TypeName: "boolean" }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }], Required: true },
        { ElementName: "publisher", Type: [{ TypeName: "string" }] },
        { ElementName: "contact", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "responsible", Type: [{ TypeName: "string" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "useContext", Type: [{ TypeName: "UsageContext" }], IsArray: true },
        { ElementName: "jurisdiction", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "purpose", Type: [{ TypeName: "markdown" }] },
        { ElementName: "copyright", Type: [{ TypeName: "markdown" }] },
        { ElementName: "copyrightLabel", Type: [{ TypeName: "string" }] },
        { ElementName: "approvalDate", Type: [{ TypeName: "date" }] },
        { ElementName: "lastReviewDate", Type: [{ TypeName: "date" }] },
        { ElementName: "effectivePeriod", Type: [{ TypeName: "Period" }] },
        { ElementName: "topic", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "author", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "editor", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "reviewer", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "endorser", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "relatedArtifact", Type: [{ TypeName: "RelatedArtifact" }], IsArray: true },
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
        { ElementName: "authoritative", Type: [{ TypeName: "boolean" }] },
    ],
};

export const NutritionIntake: TypeModel = {
    TypeName: "NutritionIntake",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "basedOn", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CarePlan", "http://hl7.org/fhir/StructureDefinition/NutritionOrder", "http://hl7.org/fhir/StructureDefinition/ServiceRequest"] }], IsArray: true },
        { ElementName: "partOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/NutritionIntake", "http://hl7.org/fhir/StructureDefinition/Observation", "http://hl7.org/fhir/StructureDefinition/Procedure"] }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "statusReason", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "occurrence[x]", Type: [{ TypeName: "Period" }, { TypeName: "dateTime" }] },
        { ElementName: "recorded", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "reported[x]", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }, { TypeName: "boolean" }] },
        { ElementName: "nutritionItem", Type: [{ TypeName: "nutritionintake_nutritionItem" }], IsArray: true },
        { ElementName: "performer", Type: [{ TypeName: "nutritionintake_performer" }], IsArray: true },
        { ElementName: "location", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "derivedFrom", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "reason", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
    ],
};

export const nutritionintake_nutritionItem: TypeModel = {
    TypeName: "nutritionintake_nutritionItem",
    BaseTypeName: "BackboneElement",
    Elements: [
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
        { ElementName: "nutrient", Type: [{ TypeName: "CodeableReference" }], Required: true },
        { ElementName: "amount", Type: [{ TypeName: "Quantity" }], Required: true },
        { ElementName: "energy", Type: [{ TypeName: "Quantity" }] },
    ],
};

export const nutritionintake_nutritionItem_notConsumedItem: TypeModel = {
    TypeName: "nutritionintake_nutritionItem_notConsumedItem",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "reason", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "schedule", Type: [{ TypeName: "Timing" }] },
        { ElementName: "amount", Type: [{ TypeName: "Quantity" }] },
    ],
};

export const nutritionintake_performer: TypeModel = {
    TypeName: "nutritionintake_performer",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "function", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "actor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
    ],
};

export const NutritionOrder: TypeModel = {
    TypeName: "NutritionOrder",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "basedOn", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CarePlan", "http://hl7.org/fhir/StructureDefinition/NutritionOrder", "http://hl7.org/fhir/StructureDefinition/RequestOrchestration", "http://hl7.org/fhir/StructureDefinition/ServiceRequest"] }], IsArray: true },
        { ElementName: "groupIdentifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "intent", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "priority", Type: [{ TypeName: "code" }] },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "supportingInformation", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "dateTime", Type: [{ TypeName: "dateTime" }], Required: true },
        { ElementName: "requester", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "performer", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "allergyIntolerance", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/AllergyIntolerance"] }], IsArray: true },
        { ElementName: "foodPreferenceModifier", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "excludeFoodModifier", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "outsideFoodAllowed", Type: [{ TypeName: "boolean" }] },
        { ElementName: "oralDiet", Type: [{ TypeName: "nutritionorder_oralDiet" }] },
        { ElementName: "supplement", Type: [{ TypeName: "nutritionorder_supplement" }], IsArray: true },
        { ElementName: "enteralFormula", Type: [{ TypeName: "nutritionorder_enteralFormula" }] },
        { ElementName: "additive", Type: [{ TypeName: "nutritionorder_additive" }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
    ],
};

export const nutritionorder_oralDiet: TypeModel = {
    TypeName: "nutritionorder_oralDiet",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "schedule", Type: [{ TypeName: "nutritionorder_oralDiet_schedule" }] },
        { ElementName: "nutrient", Type: [{ TypeName: "nutritionorder_oralDiet_nutrient" }], IsArray: true },
        { ElementName: "texture", Type: [{ TypeName: "nutritionorder_oralDiet_texture" }], IsArray: true },
        { ElementName: "instruction", Type: [{ TypeName: "string" }] },
        { ElementName: "caloricDensity", Type: [{ TypeName: "Quantity" }] },
    ],
};

export const nutritionorder_oralDiet_schedule: TypeModel = {
    TypeName: "nutritionorder_oralDiet_schedule",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "timing", Type: [{ TypeName: "Timing" }], IsArray: true },
        { ElementName: "asNeeded", Type: [{ TypeName: "boolean" }] },
        { ElementName: "asNeededFor", Type: [{ TypeName: "CodeableConcept" }] },
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
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const nutritionorder_supplement: TypeModel = {
    TypeName: "nutritionorder_supplement",
    BaseTypeName: "BackboneElement",
    Elements: [
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
        { ElementName: "timing", Type: [{ TypeName: "Timing" }], IsArray: true },
        { ElementName: "asNeeded", Type: [{ TypeName: "boolean" }] },
        { ElementName: "asNeededFor", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const nutritionorder_enteralFormula: TypeModel = {
    TypeName: "nutritionorder_enteralFormula",
    BaseTypeName: "BackboneElement",
    Elements: [
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
        { ElementName: "schedule", Type: [{ TypeName: "nutritionorder_enteralFormula_administration_schedule" }] },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "rate[x]", Type: [{ TypeName: "Quantity" }, { TypeName: "Ratio" }] },
    ],
};

export const nutritionorder_enteralFormula_administration_schedule: TypeModel = {
    TypeName: "nutritionorder_enteralFormula_administration_schedule",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "timing", Type: [{ TypeName: "Timing" }], IsArray: true },
        { ElementName: "asNeeded", Type: [{ TypeName: "boolean" }] },
        { ElementName: "asNeededFor", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const nutritionorder_additive: TypeModel = {
    TypeName: "nutritionorder_additive",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "modularType", Type: [{ TypeName: "CodeableReference" }] },
        { ElementName: "productName", Type: [{ TypeName: "string" }] },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "routeOfAdministration", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
    ],
};

export const NutritionProduct: TypeModel = {
    TypeName: "NutritionProduct",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "status", Type: [{ TypeName: "code" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "manufacturer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], IsArray: true },
        { ElementName: "nutrient", Type: [{ TypeName: "nutritionproduct_nutrient" }], IsArray: true },
        { ElementName: "ingredientSummary", Type: [{ TypeName: "markdown" }] },
        { ElementName: "ingredient", Type: [{ TypeName: "nutritionproduct_ingredient" }], IsArray: true },
        { ElementName: "energy", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "characteristic", Type: [{ TypeName: "nutritionproduct_characteristic" }], IsArray: true },
        { ElementName: "instance", Type: [{ TypeName: "nutritionproduct_instance" }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
    ],
};

export const nutritionproduct_nutrient: TypeModel = {
    TypeName: "nutritionproduct_nutrient",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "item", Type: [{ TypeName: "CodeableReference" }], Required: true },
        { ElementName: "amount[x]", Type: [{ TypeName: "Quantity" }, { TypeName: "Ratio" }] },
    ],
};

export const nutritionproduct_ingredient: TypeModel = {
    TypeName: "nutritionproduct_ingredient",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "item", Type: [{ TypeName: "CodeableReference" }], Required: true },
        { ElementName: "amount[x]", Type: [{ TypeName: "Quantity" }, { TypeName: "Ratio" }] },
        { ElementName: "allergen", Type: [{ TypeName: "boolean" }] },
    ],
};

export const nutritionproduct_characteristic: TypeModel = {
    TypeName: "nutritionproduct_characteristic",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "CodeableConcept" }, { TypeName: "Quantity" }, { TypeName: "base64Binary" }, { TypeName: "boolean" }, { TypeName: "string" }], Required: true },
    ],
};

export const nutritionproduct_instance: TypeModel = {
    TypeName: "nutritionproduct_instance",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "lotNumber", Type: [{ TypeName: "string" }] },
        { ElementName: "expiry", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "useBy", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "biologicalSourceEvent", Type: [{ TypeName: "Identifier" }] },
    ],
};

export const Observation: TypeModel = {
    TypeName: "Observation",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "basedOn", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CarePlan", "http://hl7.org/fhir/StructureDefinition/DeviceRequest", "http://hl7.org/fhir/StructureDefinition/MedicationRequest", "http://hl7.org/fhir/StructureDefinition/NutritionOrder", "http://hl7.org/fhir/StructureDefinition/ServiceRequest"] }], IsArray: true },
        { ElementName: "triggeredBy", Type: [{ TypeName: "observation_triggeredBy" }], IsArray: true },
        { ElementName: "partOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ImagingStudy", "http://hl7.org/fhir/StructureDefinition/Immunization", "http://hl7.org/fhir/StructureDefinition/MedicationAdministration", "http://hl7.org/fhir/StructureDefinition/MedicationDispense", "http://hl7.org/fhir/StructureDefinition/MedicationStatement", "http://hl7.org/fhir/StructureDefinition/Procedure"] }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "statusReason", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/BiologicallyDerivedProduct", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Medication", "http://hl7.org/fhir/StructureDefinition/NutritionProduct", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/Procedure", "http://hl7.org/fhir/StructureDefinition/Substance"] }] },
        { ElementName: "focus", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "organizer", Type: [{ TypeName: "boolean" }] },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "effective[x]", Type: [{ TypeName: "Period" }, { TypeName: "Timing" }, { TypeName: "dateTime" }, { TypeName: "instant" }] },
        { ElementName: "issued", Type: [{ TypeName: "instant" }] },
        { ElementName: "performer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], IsArray: true },
        { ElementName: "value[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "CodeableConcept" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "SampledData" }, { TypeName: "boolean" }, { TypeName: "dateTime" }, { TypeName: "integer" }, { TypeName: "string" }, { TypeName: "time" }] },
        { ElementName: "dataAbsentReason", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "interpretation", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "context", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "bodySite", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "bodyStructure", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "method", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "specimen", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Specimen"] }] },
        { ElementName: "device", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/DeviceMetric"] }] },
        { ElementName: "supportingDevice", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "referenceRange", Type: [{ TypeName: "observation_referenceRange" }], IsArray: true },
        { ElementName: "hasMember", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Observation", "http://hl7.org/fhir/StructureDefinition/QuestionnaireResponse"] }], IsArray: true },
        { ElementName: "derivedFrom", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DocumentReference", "http://hl7.org/fhir/StructureDefinition/ImagingSelection", "http://hl7.org/fhir/StructureDefinition/ImagingStudy", "http://hl7.org/fhir/StructureDefinition/Observation", "http://hl7.org/fhir/StructureDefinition/QuestionnaireResponse"] }], IsArray: true },
        { ElementName: "component", Type: [{ TypeName: "observation_component" }], IsArray: true },
    ],
};

export const observation_triggeredBy: TypeModel = {
    TypeName: "observation_triggeredBy",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "observation", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Observation"] }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "reason", Type: [{ TypeName: "string" }] },
    ],
};

export const observation_referenceRange: TypeModel = {
    TypeName: "observation_referenceRange",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "low", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "high", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "normalValue", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "appliesTo", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "age", Type: [{ TypeName: "Range" }] },
        { ElementName: "text", Type: [{ TypeName: "markdown" }] },
    ],
};

export const observation_component: TypeModel = {
    TypeName: "observation_component",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "CodeableConcept" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "SampledData" }, { TypeName: "boolean" }, { TypeName: "dateTime" }, { TypeName: "integer" }, { TypeName: "string" }, { TypeName: "time" }] },
        { ElementName: "dataAbsentReason", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "interpretation", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "referenceRange", Type: [{ TypeName: "observation_referenceRange" }], IsArray: true },
    ],
};

export const ObservationDefinition: TypeModel = {
    TypeName: "ObservationDefinition",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "versionAlgorithm[x]", Type: [{ TypeName: "Coding" }, { TypeName: "string" }] },
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
        { ElementName: "copyrightLabel", Type: [{ TypeName: "string" }] },
        { ElementName: "approvalDate", Type: [{ TypeName: "date" }] },
        { ElementName: "lastReviewDate", Type: [{ TypeName: "date" }] },
        { ElementName: "effectivePeriod", Type: [{ TypeName: "Period" }] },
        { ElementName: "derivedFromCanonical", Type: [{ TypeName: "canonical" }], IsArray: true },
        { ElementName: "derivedFromUri", Type: [{ TypeName: "uri" }], IsArray: true },
        { ElementName: "subject", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "performerType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "permittedDataType", Type: [{ TypeName: "code" }], IsArray: true },
        { ElementName: "multipleResultsAllowed", Type: [{ TypeName: "boolean" }] },
        { ElementName: "bodyStructure", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "method", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "specimen", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/SpecimenDefinition"] }], IsArray: true },
        { ElementName: "device[x]", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }, { TypeName: "canonical" }] },
        { ElementName: "supportingDevice", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "preferredReportName", Type: [{ TypeName: "string" }] },
        { ElementName: "permittedUnit", Type: [{ TypeName: "Coding" }], IsArray: true },
        { ElementName: "qualifiedValue", Type: [{ TypeName: "observationdefinition_qualifiedValue" }], IsArray: true },
        { ElementName: "hasMember", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ObservationDefinition", "http://hl7.org/fhir/StructureDefinition/Questionnaire"] }], IsArray: true },
        { ElementName: "component", Type: [{ TypeName: "observationdefinition_component" }], IsArray: true },
    ],
};

export const observationdefinition_qualifiedValue: TypeModel = {
    TypeName: "observationdefinition_qualifiedValue",
    BaseTypeName: "BackboneElement",
    Elements: [
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

export const observationdefinition_component: TypeModel = {
    TypeName: "observationdefinition_component",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "permittedDataType", Type: [{ TypeName: "code" }], IsArray: true },
        { ElementName: "permittedUnit", Type: [{ TypeName: "Coding" }], IsArray: true },
        { ElementName: "qualifiedValue", Type: [{ TypeName: "observationdefinition_qualifiedValue" }], IsArray: true },
    ],
};

export const OperationDefinition: TypeModel = {
    TypeName: "OperationDefinition",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "versionAlgorithm[x]", Type: [{ TypeName: "Coding" }, { TypeName: "string" }] },
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
        { ElementName: "copyright", Type: [{ TypeName: "markdown" }] },
        { ElementName: "copyrightLabel", Type: [{ TypeName: "string" }] },
        { ElementName: "affectsState", Type: [{ TypeName: "boolean" }] },
        { ElementName: "synchronicity", Type: [{ TypeName: "code" }] },
        { ElementName: "code", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "comment", Type: [{ TypeName: "markdown" }] },
        { ElementName: "base", Type: [{ TypeName: "canonical" }] },
        { ElementName: "resource", Type: [{ TypeName: "uri" }], IsArray: true },
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
        { ElementName: "scope", Type: [{ TypeName: "code" }], IsArray: true },
        { ElementName: "min", Type: [{ TypeName: "unsignedInt" }], Required: true },
        { ElementName: "max", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "documentation", Type: [{ TypeName: "markdown" }] },
        { ElementName: "type", Type: [{ TypeName: "uri" }] },
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
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "contact", Type: [{ TypeName: "ExtendedContactDetail" }], IsArray: true },
        { ElementName: "partOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "endpoint", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Endpoint"] }], IsArray: true },
        { ElementName: "qualification", Type: [{ TypeName: "organization_qualification" }], IsArray: true },
    ],
};

export const organization_qualification: TypeModel = {
    TypeName: "organization_qualification",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "status", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "issuer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
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
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "specialty", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "location", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }], IsArray: true },
        { ElementName: "healthcareService", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/HealthcareService"] }], IsArray: true },
        { ElementName: "contact", Type: [{ TypeName: "ExtendedContactDetail" }], IsArray: true },
        { ElementName: "endpoint", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Endpoint"] }], IsArray: true },
    ],
};

export const PackagedProductDefinition: TypeModel = {
    TypeName: "PackagedProductDefinition",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "packageFor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MedicinalProductDefinition"] }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "statusDate", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "containedItemQuantity", Type: [{ TypeName: "Quantity" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "legalStatusOfSupply", Type: [{ TypeName: "packagedproductdefinition_legalStatusOfSupply" }], IsArray: true },
        { ElementName: "marketingStatus", Type: [{ TypeName: "MarketingStatus" }], IsArray: true },
        { ElementName: "copackagedIndicator", Type: [{ TypeName: "boolean" }] },
        { ElementName: "manufacturer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }], IsArray: true },
        { ElementName: "attachedDocument", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DocumentReference"] }], IsArray: true },
        { ElementName: "packaging", Type: [{ TypeName: "packagedproductdefinition_packaging" }] },
        { ElementName: "characteristic", Type: [{ TypeName: "packagedproductdefinition_packaging_property" }], IsArray: true },
    ],
};

export const packagedproductdefinition_legalStatusOfSupply: TypeModel = {
    TypeName: "packagedproductdefinition_legalStatusOfSupply",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "jurisdiction", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const packagedproductdefinition_packaging: TypeModel = {
    TypeName: "packagedproductdefinition_packaging",
    BaseTypeName: "BackboneElement",
    Elements: [
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

export const packagedproductdefinition_packaging_property: TypeModel = {
    TypeName: "packagedproductdefinition_packaging_property",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "CodeableConcept" }, { TypeName: "Quantity" }, { TypeName: "boolean" }, { TypeName: "date" }] },
    ],
};

export const packagedproductdefinition_packaging_containedItem: TypeModel = {
    TypeName: "packagedproductdefinition_packaging_containedItem",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "item", Type: [{ TypeName: "CodeableReference" }], Required: true },
        { ElementName: "amount", Type: [{ TypeName: "Quantity" }] },
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
        { ElementName: "value[x]", Type: [{ TypeName: "Address" }, { TypeName: "Age" }, { TypeName: "Annotation" }, { TypeName: "Attachment" }, { TypeName: "Availability" }, { TypeName: "CodeableConcept" }, { TypeName: "CodeableReference" }, { TypeName: "Coding" }, { TypeName: "ContactDetail" }, { TypeName: "ContactPoint" }, { TypeName: "Count" }, { TypeName: "DataRequirement" }, { TypeName: "Distance" }, { TypeName: "Dosage" }, { TypeName: "Duration" }, { TypeName: "Expression" }, { TypeName: "ExtendedContactDetail" }, { TypeName: "HumanName" }, { TypeName: "Identifier" }, { TypeName: "Meta" }, { TypeName: "Money" }, { TypeName: "ParameterDefinition" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "RatioRange" }, { TypeName: "Reference" }, { TypeName: "RelatedArtifact" }, { TypeName: "SampledData" }, { TypeName: "Signature" }, { TypeName: "Timing" }, { TypeName: "TriggerDefinition" }, { TypeName: "UsageContext" }, { TypeName: "VirtualServiceDetail" }, { TypeName: "base64Binary" }, { TypeName: "boolean" }, { TypeName: "canonical" }, { TypeName: "code" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "id" }, { TypeName: "instant" }, { TypeName: "integer" }, { TypeName: "integer64" }, { TypeName: "markdown" }, { TypeName: "oid" }, { TypeName: "positiveInt" }, { TypeName: "string" }, { TypeName: "time" }, { TypeName: "unsignedInt" }, { TypeName: "uri" }, { TypeName: "url" }, { TypeName: "uuid" }] },
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
        { ElementName: "statusReason", Type: [{ TypeName: "string" }] },
        { ElementName: "request", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
        { ElementName: "response", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
        { ElementName: "created", Type: [{ TypeName: "dateTime" }], Required: true },
        { ElementName: "reporter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "payment", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/PaymentReconciliation"] }] },
        { ElementName: "paymentDate", Type: [{ TypeName: "date" }] },
        { ElementName: "claimIdentifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "payee", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "recipient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
        { ElementName: "patient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }] },
        { ElementName: "amount", Type: [{ TypeName: "Money" }], Required: true },
        { ElementName: "paymentStatus", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const PaymentReconciliation: TypeModel = {
    TypeName: "PaymentReconciliation",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "statusReason", Type: [{ TypeName: "string" }] },
        { ElementName: "kind", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "created", Type: [{ TypeName: "dateTime" }], Required: true },
        { ElementName: "enterer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "issuerType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "paymentIssuer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "request", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Task"] }] },
        { ElementName: "requestor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "outcome", Type: [{ TypeName: "code" }] },
        { ElementName: "disposition", Type: [{ TypeName: "string" }] },
        { ElementName: "date", Type: [{ TypeName: "date" }], Required: true },
        { ElementName: "location", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "method", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "cardBrand", Type: [{ TypeName: "string" }] },
        { ElementName: "accountNumber", Type: [{ TypeName: "string" }] },
        { ElementName: "expirationDate", Type: [{ TypeName: "date" }] },
        { ElementName: "processor", Type: [{ TypeName: "string" }] },
        { ElementName: "referenceNumber", Type: [{ TypeName: "string" }] },
        { ElementName: "authorization", Type: [{ TypeName: "string" }] },
        { ElementName: "tenderedAmount", Type: [{ TypeName: "Money" }] },
        { ElementName: "returnedAmount", Type: [{ TypeName: "Money" }] },
        { ElementName: "amount", Type: [{ TypeName: "Money" }] },
        { ElementName: "paymentIdentifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "allocation", Type: [{ TypeName: "paymentreconciliation_allocation" }], IsArray: true },
        { ElementName: "formCode", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "processNote", Type: [{ TypeName: "paymentreconciliation_processNote" }], IsArray: true },
    ],
};

export const paymentreconciliation_allocation: TypeModel = {
    TypeName: "paymentreconciliation_allocation",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "predecessor", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "target", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Account", "http://hl7.org/fhir/StructureDefinition/Claim", "http://hl7.org/fhir/StructureDefinition/Encounter", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Patient"] }] },
        { ElementName: "targetItem[x]", Type: [{ TypeName: "Identifier" }, { TypeName: "positiveInt" }, { TypeName: "string" }] },
        { ElementName: "characteristics", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Observation"] }] },
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
        { ElementName: "class", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "number", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "type", Type: [{ TypeName: "code" }] },
        { ElementName: "text", Type: [{ TypeName: "markdown" }] },
    ],
};

export const Person: TypeModel = {
    TypeName: "Person",
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
        { ElementName: "photo", Type: [{ TypeName: "Attachment" }], IsArray: true },
        { ElementName: "communication", Type: [{ TypeName: "person_communication" }], IsArray: true },
        { ElementName: "managingOrganization", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "link", Type: [{ TypeName: "person_link" }], IsArray: true },
    ],
};

export const person_communication: TypeModel = {
    TypeName: "person_communication",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "language", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "preferred", Type: [{ TypeName: "boolean" }] },
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
        { ElementName: "versionAlgorithm[x]", Type: [{ TypeName: "Coding" }, { TypeName: "string" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "subtitle", Type: [{ TypeName: "string" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "experimental", Type: [{ TypeName: "boolean" }] },
        { ElementName: "subject[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/AdministrableProductDefinition", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/ManufacturedItemDefinition", "http://hl7.org/fhir/StructureDefinition/MedicinalProductDefinition", "http://hl7.org/fhir/StructureDefinition/PackagedProductDefinition", "http://hl7.org/fhir/StructureDefinition/SubstanceDefinition"] }, { TypeName: "canonical" }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "publisher", Type: [{ TypeName: "string" }] },
        { ElementName: "contact", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "useContext", Type: [{ TypeName: "UsageContext" }], IsArray: true },
        { ElementName: "jurisdiction", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "purpose", Type: [{ TypeName: "markdown" }] },
        { ElementName: "usage", Type: [{ TypeName: "markdown" }] },
        { ElementName: "copyright", Type: [{ TypeName: "markdown" }] },
        { ElementName: "copyrightLabel", Type: [{ TypeName: "string" }] },
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
        { ElementName: "actor", Type: [{ TypeName: "plandefinition_actor" }], IsArray: true },
        { ElementName: "action", Type: [{ TypeName: "plandefinition_action" }], IsArray: true },
        { ElementName: "asNeeded[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "boolean" }] },
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
        { ElementName: "detail[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "boolean" }, { TypeName: "integer" }, { TypeName: "string" }] },
        { ElementName: "due", Type: [{ TypeName: "Duration" }] },
    ],
};

export const plandefinition_actor: TypeModel = {
    TypeName: "plandefinition_actor",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "option", Type: [{ TypeName: "plandefinition_actor_option" }], IsArray: true, Required: true },
    ],
};

export const plandefinition_actor_option: TypeModel = {
    TypeName: "plandefinition_actor_option",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "code" }] },
        { ElementName: "typeCanonical", Type: [{ TypeName: "canonical" }] },
        { ElementName: "typeReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/BiologicallyDerivedProduct", "http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Endpoint", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Medication", "http://hl7.org/fhir/StructureDefinition/MedicinalProductDefinition", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson", "http://hl7.org/fhir/StructureDefinition/Specimen", "http://hl7.org/fhir/StructureDefinition/Substance", "http://hl7.org/fhir/StructureDefinition/SubstanceDefinition"] }] },
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const plandefinition_action: TypeModel = {
    TypeName: "plandefinition_action",
    BaseTypeName: "BackboneElement",
    Elements: [
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
        { ElementName: "kind", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "expression", Type: [{ TypeName: "Expression" }] },
    ],
};

export const plandefinition_action_input: TypeModel = {
    TypeName: "plandefinition_action_input",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "requirement", Type: [{ TypeName: "DataRequirement" }] },
        { ElementName: "relatedData", Type: [{ TypeName: "string" }] },
    ],
};

export const plandefinition_action_output: TypeModel = {
    TypeName: "plandefinition_action_output",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "requirement", Type: [{ TypeName: "DataRequirement" }] },
        { ElementName: "relatedData", Type: [{ TypeName: "string" }] },
    ],
};

export const plandefinition_action_relatedAction: TypeModel = {
    TypeName: "plandefinition_action_relatedAction",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "targetId", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "relationship", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "endRelationship", Type: [{ TypeName: "code" }] },
        { ElementName: "offset[x]", Type: [{ TypeName: "Duration" }, { TypeName: "Range" }] },
    ],
};

export const plandefinition_action_participant: TypeModel = {
    TypeName: "plandefinition_action_participant",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "actorId", Type: [{ TypeName: "string" }] },
        { ElementName: "type", Type: [{ TypeName: "code" }] },
        { ElementName: "typeCanonical", Type: [{ TypeName: "canonical" }] },
        { ElementName: "typeReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/BiologicallyDerivedProduct", "http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Endpoint", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Medication", "http://hl7.org/fhir/StructureDefinition/MedicinalProductDefinition", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson", "http://hl7.org/fhir/StructureDefinition/Specimen", "http://hl7.org/fhir/StructureDefinition/Substance", "http://hl7.org/fhir/StructureDefinition/SubstanceDefinition"] }] },
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "function", Type: [{ TypeName: "CodeableConcept" }] },
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
        { ElementName: "gender", Type: [{ TypeName: "code" }] },
        { ElementName: "birthDate", Type: [{ TypeName: "date" }] },
        { ElementName: "deceased[x]", Type: [{ TypeName: "boolean" }, { TypeName: "dateTime" }] },
        { ElementName: "address", Type: [{ TypeName: "Address" }], IsArray: true },
        { ElementName: "photo", Type: [{ TypeName: "Attachment" }], IsArray: true },
        { ElementName: "qualification", Type: [{ TypeName: "practitioner_qualification" }], IsArray: true },
        { ElementName: "communication", Type: [{ TypeName: "practitioner_communication" }], IsArray: true },
    ],
};

export const practitioner_qualification: TypeModel = {
    TypeName: "practitioner_qualification",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "status", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "issuer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
    ],
};

export const practitioner_communication: TypeModel = {
    TypeName: "practitioner_communication",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "language", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "preferred", Type: [{ TypeName: "boolean" }] },
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
        { ElementName: "display", Type: [{ TypeName: "string" }] },
        { ElementName: "specialty", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "location", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }], IsArray: true },
        { ElementName: "healthcareService", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/HealthcareService"] }], IsArray: true },
        { ElementName: "contact", Type: [{ TypeName: "ExtendedContactDetail" }], IsArray: true },
        { ElementName: "characteristic", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "communication", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "availability", Type: [{ TypeName: "Availability" }] },
        { ElementName: "endpoint", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Endpoint"] }], IsArray: true },
    ],
};

export const Procedure: TypeModel = {
    TypeName: "Procedure",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "basedOn", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CarePlan", "http://hl7.org/fhir/StructureDefinition/MedicationRequest", "http://hl7.org/fhir/StructureDefinition/ServiceRequest"] }], IsArray: true },
        { ElementName: "partOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MedicationAdministration", "http://hl7.org/fhir/StructureDefinition/Observation", "http://hl7.org/fhir/StructureDefinition/Procedure"] }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "statusReason", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner"] }], Required: true },
        { ElementName: "focus", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson", "http://hl7.org/fhir/StructureDefinition/Specimen"] }] },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "occurrence[x]", Type: [{ TypeName: "Age" }, { TypeName: "Period" }, { TypeName: "Range" }, { TypeName: "Timing" }, { TypeName: "dateTime" }, { TypeName: "string" }] },
        { ElementName: "recorded", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "recorder", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "reported[x]", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }, { TypeName: "boolean" }] },
        { ElementName: "performer", Type: [{ TypeName: "procedure_performer" }], IsArray: true },
        { ElementName: "location", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "reason", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "bodyStructure", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "outcome", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "report", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Bundle", "http://hl7.org/fhir/StructureDefinition/Composition", "http://hl7.org/fhir/StructureDefinition/DiagnosticReport", "http://hl7.org/fhir/StructureDefinition/DocumentReference"] }], IsArray: true },
        { ElementName: "complication", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "followUp", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "focalDevice", Type: [{ TypeName: "procedure_focalDevice" }], IsArray: true },
        { ElementName: "used", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "supportingInfo", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
    ],
};

export const procedure_performer: TypeModel = {
    TypeName: "procedure_performer",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "function", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "actor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
        { ElementName: "onBehalfOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
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
        { ElementName: "recorded", Type: [{ TypeName: "instant" }] },
        { ElementName: "policy", Type: [{ TypeName: "uri" }], IsArray: true },
        { ElementName: "location", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "authorization", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "why", Type: [{ TypeName: "markdown" }] },
        { ElementName: "activity", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "basedOn", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "patient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }] },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
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
        { ElementName: "who", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
        { ElementName: "onBehalfOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
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
        { ElementName: "versionAlgorithm[x]", Type: [{ TypeName: "Coding" }, { TypeName: "string" }] },
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
        { ElementName: "copyrightLabel", Type: [{ TypeName: "string" }] },
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

export const questionnaire_item_enableWhen: TypeModel = {
    TypeName: "questionnaire_item_enableWhen",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "question", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "operator", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "answer[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "Coding" }, { TypeName: "Quantity" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }, { TypeName: "boolean" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "integer" }, { TypeName: "string" }, { TypeName: "time" }, { TypeName: "uri" }], Required: true },
    ],
};

export const questionnaire_item_answerOption: TypeModel = {
    TypeName: "questionnaire_item_answerOption",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "value[x]", Type: [{ TypeName: "Coding" }, { TypeName: "Quantity" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "integer" }, { TypeName: "string" }, { TypeName: "time" }, { TypeName: "uri" }], Required: true },
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
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "basedOn", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CarePlan", "http://hl7.org/fhir/StructureDefinition/ServiceRequest"] }], IsArray: true },
        { ElementName: "partOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Observation", "http://hl7.org/fhir/StructureDefinition/Procedure"] }], IsArray: true },
        { ElementName: "questionnaire", Type: [{ TypeName: "canonical" }], Required: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "authored", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "author", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "source", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "item", Type: [{ TypeName: "questionnaireresponse_item" }], IsArray: true },
    ],
};

export const questionnaireresponse_item: TypeModel = {
    TypeName: "questionnaireresponse_item",
    BaseTypeName: "BackboneElement",
    Elements: [
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
        { ElementName: "value[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "Coding" }, { TypeName: "Quantity" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }, { TypeName: "boolean" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "integer" }, { TypeName: "string" }, { TypeName: "time" }, { TypeName: "uri" }], Required: true },
        { ElementName: "item", Type: [{ TypeName: "questionnaireresponse_item" }], IsArray: true },
    ],
};

export const RegulatedAuthorization: TypeModel = {
    TypeName: "RegulatedAuthorization",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ActivityDefinition", "http://hl7.org/fhir/StructureDefinition/BiologicallyDerivedProduct", "http://hl7.org/fhir/StructureDefinition/DeviceDefinition", "http://hl7.org/fhir/StructureDefinition/Ingredient", "http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/ManufacturedItemDefinition", "http://hl7.org/fhir/StructureDefinition/MedicinalProductDefinition", "http://hl7.org/fhir/StructureDefinition/NutritionProduct", "http://hl7.org/fhir/StructureDefinition/ObservationDefinition", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/PackagedProductDefinition", "http://hl7.org/fhir/StructureDefinition/PlanDefinition", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/ResearchStudy", "http://hl7.org/fhir/StructureDefinition/SubstanceDefinition"] }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "region", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "statusDate", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "validityPeriod", Type: [{ TypeName: "Period" }] },
        { ElementName: "indication", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "intendedUse", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "basis", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "holder", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "regulator", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "attachedDocument", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DocumentReference"] }], IsArray: true },
        { ElementName: "case", Type: [{ TypeName: "regulatedauthorization_case" }] },
    ],
};

export const regulatedauthorization_case: TypeModel = {
    TypeName: "regulatedauthorization_case",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "status", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "date[x]", Type: [{ TypeName: "Period" }, { TypeName: "dateTime" }] },
        { ElementName: "application", Type: [{ TypeName: "regulatedauthorization_case" }], IsArray: true },
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
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
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

export const RequestOrchestration: TypeModel = {
    TypeName: "RequestOrchestration",
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
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "authoredOn", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "author", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "reason", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "goal", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Goal"] }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "action", Type: [{ TypeName: "requestorchestration_action" }], IsArray: true },
    ],
};

export const requestorchestration_action: TypeModel = {
    TypeName: "requestorchestration_action",
    BaseTypeName: "BackboneElement",
    Elements: [
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
        { ElementName: "kind", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "expression", Type: [{ TypeName: "Expression" }] },
    ],
};

export const requestorchestration_action_input: TypeModel = {
    TypeName: "requestorchestration_action_input",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "requirement", Type: [{ TypeName: "DataRequirement" }] },
        { ElementName: "relatedData", Type: [{ TypeName: "id" }] },
    ],
};

export const requestorchestration_action_output: TypeModel = {
    TypeName: "requestorchestration_action_output",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "requirement", Type: [{ TypeName: "DataRequirement" }] },
        { ElementName: "relatedData", Type: [{ TypeName: "string" }] },
    ],
};

export const requestorchestration_action_relatedAction: TypeModel = {
    TypeName: "requestorchestration_action_relatedAction",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "targetId", Type: [{ TypeName: "id" }], Required: true },
        { ElementName: "relationship", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "endRelationship", Type: [{ TypeName: "code" }] },
        { ElementName: "offset[x]", Type: [{ TypeName: "Duration" }, { TypeName: "Range" }] },
    ],
};

export const requestorchestration_action_participant: TypeModel = {
    TypeName: "requestorchestration_action_participant",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "code" }] },
        { ElementName: "typeCanonical", Type: [{ TypeName: "canonical" }] },
        { ElementName: "typeReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/BiologicallyDerivedProduct", "http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Endpoint", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Medication", "http://hl7.org/fhir/StructureDefinition/MedicinalProductDefinition", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson", "http://hl7.org/fhir/StructureDefinition/Specimen", "http://hl7.org/fhir/StructureDefinition/Substance", "http://hl7.org/fhir/StructureDefinition/SubstanceDefinition"] }] },
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "function", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "actor[x]", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/BiologicallyDerivedProduct", "http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Endpoint", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Medication", "http://hl7.org/fhir/StructureDefinition/MedicinalProductDefinition", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson", "http://hl7.org/fhir/StructureDefinition/Specimen", "http://hl7.org/fhir/StructureDefinition/Substance", "http://hl7.org/fhir/StructureDefinition/SubstanceDefinition"] }, { TypeName: "canonical" }] },
    ],
};

export const requestorchestration_action_dynamicValue: TypeModel = {
    TypeName: "requestorchestration_action_dynamicValue",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "path", Type: [{ TypeName: "string" }] },
        { ElementName: "expression", Type: [{ TypeName: "Expression" }] },
    ],
};

export const Requirements: TypeModel = {
    TypeName: "Requirements",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "versionAlgorithm[x]", Type: [{ TypeName: "Coding" }, { TypeName: "string" }] },
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
        { ElementName: "copyrightLabel", Type: [{ TypeName: "string" }] },
        { ElementName: "derivedFrom", Type: [{ TypeName: "canonical" }], IsArray: true },
        { ElementName: "imports", Type: [{ TypeName: "requirements_imports" }], IsArray: true },
        { ElementName: "reference", Type: [{ TypeName: "url" }], IsArray: true },
        { ElementName: "actor", Type: [{ TypeName: "requirements_actor" }], IsArray: true },
        { ElementName: "statement", Type: [{ TypeName: "requirements_statement" }], IsArray: true },
    ],
};

export const requirements_imports: TypeModel = {
    TypeName: "requirements_imports",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "reference", Type: [{ TypeName: "canonical" }], Required: true },
        { ElementName: "key", Type: [{ TypeName: "id" }], IsArray: true },
    ],
};

export const requirements_actor: TypeModel = {
    TypeName: "requirements_actor",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "reference", Type: [{ TypeName: "canonical" }], Required: true },
        { ElementName: "key", Type: [{ TypeName: "id" }] },
    ],
};

export const requirements_statement: TypeModel = {
    TypeName: "requirements_statement",
    BaseTypeName: "BackboneElement",
    Elements: [
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
        { ElementName: "reference", Type: [{ TypeName: "canonical" }] },
        { ElementName: "key", Type: [{ TypeName: "id" }], Required: true },
    ],
};

export const requirements_statement_partOf: TypeModel = {
    TypeName: "requirements_statement_partOf",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "reference", Type: [{ TypeName: "canonical" }] },
        { ElementName: "key", Type: [{ TypeName: "id" }], Required: true },
    ],
};

export const ResearchStudy: TypeModel = {
    TypeName: "ResearchStudy",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "label", Type: [{ TypeName: "researchstudy_label" }], IsArray: true },
        { ElementName: "protocol", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/PlanDefinition"] }], IsArray: true },
        { ElementName: "partOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ResearchStudy"] }], IsArray: true },
        { ElementName: "citeAs", Type: [{ TypeName: "markdown" }] },
        { ElementName: "relatesTo", Type: [{ TypeName: "researchstudy_relatesTo" }], IsArray: true },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "purposeType", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "phase", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "studyDesign", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "focus", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "condition", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "keyword", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "region", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "descriptionSummary", Type: [{ TypeName: "markdown" }] },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "site", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/ResearchStudy"] }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "classifier", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "associatedParty", Type: [{ TypeName: "researchstudy_associatedParty" }], IsArray: true },
        { ElementName: "progressStatus", Type: [{ TypeName: "researchstudy_progressStatus" }], IsArray: true },
        { ElementName: "whyStopped", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "recruitment", Type: [{ TypeName: "researchstudy_recruitment" }] },
        { ElementName: "comparisonGroup", Type: [{ TypeName: "researchstudy_comparisonGroup" }], IsArray: true },
        { ElementName: "objective", Type: [{ TypeName: "researchstudy_objective" }], IsArray: true },
        { ElementName: "result", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Composition", "http://hl7.org/fhir/StructureDefinition/DiagnosticReport", "http://hl7.org/fhir/StructureDefinition/DocumentReference", "http://hl7.org/fhir/StructureDefinition/Evidence"] }], IsArray: true },
    ],
};

export const researchstudy_label: TypeModel = {
    TypeName: "researchstudy_label",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "value", Type: [{ TypeName: "string" }] },
        { ElementName: "language", Type: [{ TypeName: "code" }] },
    ],
};

export const researchstudy_relatesTo: TypeModel = {
    TypeName: "researchstudy_relatesTo",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "target[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }, { TypeName: "canonical" }, { TypeName: "markdown" }, { TypeName: "uri" }], Required: true },
    ],
};

export const researchstudy_associatedParty: TypeModel = {
    TypeName: "researchstudy_associatedParty",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "period", Type: [{ TypeName: "Period" }], IsArray: true },
        { ElementName: "classifier", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "party", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
    ],
};

export const researchstudy_progressStatus: TypeModel = {
    TypeName: "researchstudy_progressStatus",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "state", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "actual", Type: [{ TypeName: "boolean" }] },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
    ],
};

export const researchstudy_recruitment: TypeModel = {
    TypeName: "researchstudy_recruitment",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "targetNumber", Type: [{ TypeName: "unsignedInt" }] },
        { ElementName: "actualNumber", Type: [{ TypeName: "unsignedInt" }] },
        { ElementName: "eligibility", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }] },
        { ElementName: "actualGroup", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }] },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
    ],
};

export const researchstudy_comparisonGroup: TypeModel = {
    TypeName: "researchstudy_comparisonGroup",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "targetNumber", Type: [{ TypeName: "unsignedInt" }] },
        { ElementName: "actualNumber", Type: [{ TypeName: "unsignedInt" }] },
        { ElementName: "eligibility", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }] },
        { ElementName: "observedGroup", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
    ],
};

export const researchstudy_objective: TypeModel = {
    TypeName: "researchstudy_objective",
    BaseTypeName: "BackboneElement",
    Elements: [
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
        { ElementName: "event", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "group", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "handling", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
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
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/BiologicallyDerivedProduct", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Medication", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Specimen", "http://hl7.org/fhir/StructureDefinition/Substance", "http://hl7.org/fhir/StructureDefinition/SubstanceDefinition"] }], Required: true },
        { ElementName: "subjectState", Type: [{ TypeName: "researchsubject_subjectState" }], IsArray: true },
        { ElementName: "subjectMilestone", Type: [{ TypeName: "researchsubject_subjectMilestone" }], IsArray: true },
        { ElementName: "comparisonGroup", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "consent", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Consent"] }], IsArray: true },
    ],
};

export const researchsubject_subjectState: TypeModel = {
    TypeName: "researchsubject_subjectState",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "startDate", Type: [{ TypeName: "dateTime" }], Required: true },
        { ElementName: "endDate", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "reason", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const researchsubject_subjectMilestone: TypeModel = {
    TypeName: "researchsubject_subjectMilestone",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "milestone", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "reason", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
    ],
};

export const Resource: TypeModel = {
    TypeName: "Resource",
    BaseTypeName: "Base",
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
        { ElementName: "performer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "reason", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
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
        { ElementName: "probability[x]", Type: [{ TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "decimal" }] },
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
        { ElementName: "serviceCategory", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "serviceType", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "specialty", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "actor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], IsArray: true, Required: true },
        { ElementName: "planningHorizon", Type: [{ TypeName: "Period" }] },
        { ElementName: "comment", Type: [{ TypeName: "markdown" }] },
    ],
};

export const SearchParameter: TypeModel = {
    TypeName: "SearchParameter",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }], Required: true },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "versionAlgorithm[x]", Type: [{ TypeName: "Coding" }, { TypeName: "string" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
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
        { ElementName: "copyright", Type: [{ TypeName: "markdown" }] },
        { ElementName: "copyrightLabel", Type: [{ TypeName: "string" }] },
        { ElementName: "code", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "aliasCode", Type: [{ TypeName: "code" }], IsArray: true },
        { ElementName: "base", Type: [{ TypeName: "uri" }], IsArray: true, Required: true },
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "expression", Type: [{ TypeName: "string" }] },
        { ElementName: "processingMode", Type: [{ TypeName: "code" }] },
        { ElementName: "constraint", Type: [{ TypeName: "string" }] },
        { ElementName: "target", Type: [{ TypeName: "uri" }], IsArray: true },
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
        { ElementName: "basedOn", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CarePlan", "http://hl7.org/fhir/StructureDefinition/CommunicationRequest", "http://hl7.org/fhir/StructureDefinition/DeviceRequest", "http://hl7.org/fhir/StructureDefinition/DocumentReference", "http://hl7.org/fhir/StructureDefinition/MedicationRequest", "http://hl7.org/fhir/StructureDefinition/NutritionOrder", "http://hl7.org/fhir/StructureDefinition/RequestOrchestration", "http://hl7.org/fhir/StructureDefinition/ServiceRequest", "http://hl7.org/fhir/StructureDefinition/VisionPrescription"] }], IsArray: true },
        { ElementName: "replaces", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CarePlan", "http://hl7.org/fhir/StructureDefinition/CommunicationRequest", "http://hl7.org/fhir/StructureDefinition/DeviceRequest", "http://hl7.org/fhir/StructureDefinition/DocumentReference", "http://hl7.org/fhir/StructureDefinition/MedicationRequest", "http://hl7.org/fhir/StructureDefinition/NutritionOrder", "http://hl7.org/fhir/StructureDefinition/RequestOrchestration", "http://hl7.org/fhir/StructureDefinition/ServiceRequest", "http://hl7.org/fhir/StructureDefinition/VisionPrescription"] }], IsArray: true },
        { ElementName: "requisition", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "statusReason", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "intent", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "priority", Type: [{ TypeName: "code" }] },
        { ElementName: "doNotPerform", Type: [{ TypeName: "boolean" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableReference" }] },
        { ElementName: "orderDetail", Type: [{ TypeName: "servicerequest_orderDetail" }], IsArray: true },
        { ElementName: "quantity[x]", Type: [{ TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }] },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
        { ElementName: "focus", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "occurrence[x]", Type: [{ TypeName: "Period" }, { TypeName: "Timing" }, { TypeName: "dateTime" }] },
        { ElementName: "asNeeded", Type: [{ TypeName: "boolean" }] },
        { ElementName: "asNeededFor", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "authoredOn", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "requester", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "performerType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "performer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], IsArray: true },
        { ElementName: "location", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "reason", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "insurance", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ClaimResponse", "http://hl7.org/fhir/StructureDefinition/Coverage"] }], IsArray: true },
        { ElementName: "supportingInfo", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "bodyStructure", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "patientInstruction", Type: [{ TypeName: "servicerequest_patientInstruction" }], IsArray: true },
        { ElementName: "relevantHistory", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Provenance"] }], IsArray: true },
    ],
};

export const servicerequest_orderDetail: TypeModel = {
    TypeName: "servicerequest_orderDetail",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "parameterFocus[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/BiologicallyDerivedProduct", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/DeviceRequest", "http://hl7.org/fhir/StructureDefinition/Medication", "http://hl7.org/fhir/StructureDefinition/MedicationRequest", "http://hl7.org/fhir/StructureDefinition/MedicinalProductDefinition", "http://hl7.org/fhir/StructureDefinition/Substance", "http://hl7.org/fhir/StructureDefinition/SubstanceDefinition"] }, { TypeName: "canonical" }] },
        { ElementName: "parameter", Type: [{ TypeName: "servicerequest_orderDetail_parameter" }], IsArray: true, Required: true },
    ],
};

export const servicerequest_orderDetail_parameter: TypeModel = {
    TypeName: "servicerequest_orderDetail_parameter",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "boolean" }, { TypeName: "string" }], Required: true },
    ],
};

export const servicerequest_patientInstruction: TypeModel = {
    TypeName: "servicerequest_patientInstruction",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "instruction[x]", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DocumentReference"] }, { TypeName: "markdown" }] },
    ],
};

export const Slot: TypeModel = {
    TypeName: "Slot",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "serviceCategory", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "serviceType", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "specialty", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "appointmentType", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
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
        { ElementName: "status", Type: [{ TypeName: "code" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "subject", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/BiologicallyDerivedProduct", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/NutritionProduct", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Substance"] }] },
        { ElementName: "focus", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/BiologicallyDerivedProduct", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/NutritionProduct", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/RelatedPerson", "http://hl7.org/fhir/StructureDefinition/Substance"] }] },
        { ElementName: "receivedTime", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "parent", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Specimen"] }], IsArray: true },
        { ElementName: "request", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ServiceRequest"] }], IsArray: true },
        { ElementName: "combined", Type: [{ TypeName: "code" }] },
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "feature", Type: [{ TypeName: "specimen_feature" }], IsArray: true },
        { ElementName: "collection", Type: [{ TypeName: "specimen_collection" }] },
        { ElementName: "processing", Type: [{ TypeName: "specimen_processing" }], IsArray: true },
        { ElementName: "container", Type: [{ TypeName: "specimen_container" }], IsArray: true },
        { ElementName: "condition", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
    ],
};

export const specimen_feature: TypeModel = {
    TypeName: "specimen_feature",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "description", Type: [{ TypeName: "string" }], Required: true },
    ],
};

export const specimen_collection: TypeModel = {
    TypeName: "specimen_collection",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "collector", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "collected[x]", Type: [{ TypeName: "Period" }, { TypeName: "dateTime" }] },
        { ElementName: "duration", Type: [{ TypeName: "Duration" }] },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "method", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "device", Type: [{ TypeName: "CodeableReference" }] },
        { ElementName: "procedure", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Procedure"] }] },
        { ElementName: "bodyStructure", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "fastingStatus[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Duration" }] },
    ],
};

export const specimen_processing: TypeModel = {
    TypeName: "specimen_processing",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "method", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "performer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "device", Type: [{ TypeName: "CodeableReference" }] },
        { ElementName: "additive", Type: [{ TypeName: "specimen_processing_additive" }], IsArray: true },
        { ElementName: "time[x]", Type: [{ TypeName: "Duration" }, { TypeName: "Period" }, { TypeName: "dateTime" }] },
    ],
};

export const specimen_processing_additive: TypeModel = {
    TypeName: "specimen_processing_additive",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableReference" }], Required: true },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
    ],
};

export const specimen_container: TypeModel = {
    TypeName: "specimen_container",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "device", Type: [{ TypeName: "CodeableReference" }], Required: true },
        { ElementName: "specimenQuantity", Type: [{ TypeName: "Quantity" }] },
    ],
};

export const SpecimenDefinition: TypeModel = {
    TypeName: "SpecimenDefinition",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "versionAlgorithm[x]", Type: [{ TypeName: "Coding" }, { TypeName: "string" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "derivedFromCanonical", Type: [{ TypeName: "canonical" }], IsArray: true },
        { ElementName: "derivedFromUri", Type: [{ TypeName: "uri" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "experimental", Type: [{ TypeName: "boolean" }] },
        { ElementName: "subjectReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "publisher", Type: [{ TypeName: "string" }] },
        { ElementName: "contact", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "useContext", Type: [{ TypeName: "UsageContext" }], IsArray: true },
        { ElementName: "jurisdiction", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "purpose", Type: [{ TypeName: "markdown" }] },
        { ElementName: "copyright", Type: [{ TypeName: "markdown" }] },
        { ElementName: "copyrightLabel", Type: [{ TypeName: "string" }] },
        { ElementName: "approvalDate", Type: [{ TypeName: "date" }] },
        { ElementName: "lastReviewDate", Type: [{ TypeName: "date" }] },
        { ElementName: "effectivePeriod", Type: [{ TypeName: "Period" }] },
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
        { ElementName: "device[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "canonical" }] },
        { ElementName: "minimumVolume[x]", Type: [{ TypeName: "Quantity" }, { TypeName: "string" }] },
        { ElementName: "additive", Type: [{ TypeName: "specimendefinition_typeTested_container_additive" }], IsArray: true },
        { ElementName: "preparation", Type: [{ TypeName: "markdown" }] },
    ],
};

export const specimendefinition_typeTested_container_additive: TypeModel = {
    TypeName: "specimendefinition_typeTested_container_additive",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableReference" }], Required: true },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
    ],
};

export const specimendefinition_typeTested_handling: TypeModel = {
    TypeName: "specimendefinition_typeTested_handling",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "temperatureQualifier", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "temperatureRange", Type: [{ TypeName: "Range" }] },
        { ElementName: "maxDuration", Type: [{ TypeName: "Duration" }] },
        { ElementName: "instruction", Type: [{ TypeName: "markdown" }] },
    ],
};

export const StructureDefinition: TypeModel = {
    TypeName: "StructureDefinition",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }], Required: true },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "versionAlgorithm[x]", Type: [{ TypeName: "Coding" }, { TypeName: "string" }] },
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
        { ElementName: "copyrightLabel", Type: [{ TypeName: "string" }] },
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

export const Subscription: TypeModel = {
    TypeName: "Subscription",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "topic", Type: [{ TypeName: "canonical" }], Required: true },
        { ElementName: "contact", Type: [{ TypeName: "ContactPoint" }], IsArray: true },
        { ElementName: "end", Type: [{ TypeName: "instant" }] },
        { ElementName: "managingEntity", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "reason", Type: [{ TypeName: "string" }] },
        { ElementName: "filterBy", Type: [{ TypeName: "subscription_filterBy" }], IsArray: true },
        { ElementName: "channelType", Type: [{ TypeName: "Coding" }], Required: true },
        { ElementName: "endpoint", Type: [{ TypeName: "url" }] },
        { ElementName: "parameter", Type: [{ TypeName: "subscription_parameter" }], IsArray: true },
        { ElementName: "heartbeatPeriod", Type: [{ TypeName: "unsignedInt" }] },
        { ElementName: "timeout", Type: [{ TypeName: "unsignedInt" }] },
        { ElementName: "contentType", Type: [{ TypeName: "code" }] },
        { ElementName: "content", Type: [{ TypeName: "code" }] },
        { ElementName: "maxCount", Type: [{ TypeName: "positiveInt" }] },
    ],
};

export const subscription_filterBy: TypeModel = {
    TypeName: "subscription_filterBy",
    BaseTypeName: "BackboneElement",
    Elements: [
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
        { ElementName: "name", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "value", Type: [{ TypeName: "string" }], Required: true },
    ],
};

export const SubscriptionStatus: TypeModel = {
    TypeName: "SubscriptionStatus",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "status", Type: [{ TypeName: "code" }] },
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "eventsSinceSubscriptionStart", Type: [{ TypeName: "integer64" }] },
        { ElementName: "notificationEvent", Type: [{ TypeName: "subscriptionstatus_notificationEvent" }], IsArray: true },
        { ElementName: "subscription", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Subscription"] }], Required: true },
        { ElementName: "topic", Type: [{ TypeName: "canonical" }] },
        { ElementName: "error", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
    ],
};

export const subscriptionstatus_notificationEvent: TypeModel = {
    TypeName: "subscriptionstatus_notificationEvent",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "eventNumber", Type: [{ TypeName: "integer64" }], Required: true },
        { ElementName: "triggerEvent", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "timestamp", Type: [{ TypeName: "instant" }] },
        { ElementName: "focus", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
        { ElementName: "additionalContext", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "relatedQuery", Type: [{ TypeName: "subscriptionstatus_notificationEvent_relatedQuery" }], IsArray: true },
        { ElementName: "authorizationHint", Type: [{ TypeName: "subscriptionstatus_notificationEvent_authorizationHint" }], IsArray: true },
    ],
};

export const subscriptionstatus_notificationEvent_relatedQuery: TypeModel = {
    TypeName: "subscriptionstatus_notificationEvent_relatedQuery",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "queryType", Type: [{ TypeName: "Coding" }] },
        { ElementName: "query", Type: [{ TypeName: "string" }], Required: true },
    ],
};

export const subscriptionstatus_notificationEvent_authorizationHint: TypeModel = {
    TypeName: "subscriptionstatus_notificationEvent_authorizationHint",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "authorizationType", Type: [{ TypeName: "Coding" }], Required: true },
        { ElementName: "value", Type: [{ TypeName: "string" }] },
    ],
};

export const SubscriptionTopic: TypeModel = {
    TypeName: "SubscriptionTopic",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }], Required: true },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "versionAlgorithm[x]", Type: [{ TypeName: "Coding" }, { TypeName: "string" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "derivedFrom", Type: [{ TypeName: "canonical" }], IsArray: true },
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
        { ElementName: "copyrightLabel", Type: [{ TypeName: "string" }] },
        { ElementName: "approvalDate", Type: [{ TypeName: "date" }] },
        { ElementName: "lastReviewDate", Type: [{ TypeName: "date" }] },
        { ElementName: "effectivePeriod", Type: [{ TypeName: "Period" }] },
        { ElementName: "trigger", Type: [{ TypeName: "subscriptiontopic_trigger" }], IsArray: true },
    ],
};

export const subscriptiontopic_trigger: TypeModel = {
    TypeName: "subscriptiontopic_trigger",
    BaseTypeName: "BackboneElement",
    Elements: [
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

export const subscriptiontopic_trigger_queryCriteria: TypeModel = {
    TypeName: "subscriptiontopic_trigger_queryCriteria",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "previous", Type: [{ TypeName: "string" }] },
        { ElementName: "resultForCreate", Type: [{ TypeName: "code" }] },
        { ElementName: "current", Type: [{ TypeName: "string" }] },
        { ElementName: "resultForDelete", Type: [{ TypeName: "code" }] },
        { ElementName: "requireBoth", Type: [{ TypeName: "boolean" }] },
    ],
};

export const subscriptiontopic_trigger_canFilterBy: TypeModel = {
    TypeName: "subscriptiontopic_trigger_canFilterBy",
    BaseTypeName: "BackboneElement",
    Elements: [
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
        { ElementName: "queryType", Type: [{ TypeName: "Coding" }] },
        { ElementName: "query", Type: [{ TypeName: "string" }], Required: true },
    ],
};

export const Substance: TypeModel = {
    TypeName: "Substance",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }] },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableReference" }], Required: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "expiry", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
    ],
};

export const SubstanceDefinition: TypeModel = {
    TypeName: "SubstanceDefinition",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "status", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "classification", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "domain", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "grade", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "glycosylationType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "manufacturer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }], IsArray: true },
        { ElementName: "supplier", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }], IsArray: true },
        { ElementName: "moiety", Type: [{ TypeName: "substancedefinition_moiety" }], IsArray: true },
        { ElementName: "characterization", Type: [{ TypeName: "substancedefinition_characterization" }], IsArray: true },
        { ElementName: "property", Type: [{ TypeName: "substancedefinition_property" }], IsArray: true },
        { ElementName: "molecularWeight", Type: [{ TypeName: "substancedefinition_molecularWeight" }], IsArray: true },
        { ElementName: "structure", Type: [{ TypeName: "substancedefinition_structure" }] },
        { ElementName: "code", Type: [{ TypeName: "substancedefinition_code" }], IsArray: true },
        { ElementName: "name", Type: [{ TypeName: "substancedefinition_name" }], IsArray: true },
        { ElementName: "relationship", Type: [{ TypeName: "substancedefinition_relationship" }], IsArray: true },
        { ElementName: "sourceMaterial", Type: [{ TypeName: "substancedefinition_sourceMaterial" }] },
        { ElementName: "nucleicAcid", Type: [{ TypeName: "substancedefinition_nucleicAcid" }] },
        { ElementName: "polymer", Type: [{ TypeName: "substancedefinition_polymer" }] },
        { ElementName: "protein", Type: [{ TypeName: "substancedefinition_protein" }] },
    ],
};

export const substancedefinition_moiety: TypeModel = {
    TypeName: "substancedefinition_moiety",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "stereochemistry", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "opticalActivity", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "molecularFormula", Type: [{ TypeName: "string" }] },
        { ElementName: "amount[x]", Type: [{ TypeName: "Quantity" }, { TypeName: "string" }] },
        { ElementName: "measurementType", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const substancedefinition_characterization: TypeModel = {
    TypeName: "substancedefinition_characterization",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "technique", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "form", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "file", Type: [{ TypeName: "Attachment" }], IsArray: true },
    ],
};

export const substancedefinition_property: TypeModel = {
    TypeName: "substancedefinition_property",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "CodeableConcept" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "boolean" }, { TypeName: "date" }] },
    ],
};

export const substancedefinition_molecularWeight: TypeModel = {
    TypeName: "substancedefinition_molecularWeight",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "method", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "amount", Type: [{ TypeName: "Quantity" }], Required: true },
    ],
};

export const substancedefinition_structure: TypeModel = {
    TypeName: "substancedefinition_structure",
    BaseTypeName: "BackboneElement",
    Elements: [
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
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "representation", Type: [{ TypeName: "string" }] },
        { ElementName: "format", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "document", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DocumentReference"] }] },
    ],
};

export const substancedefinition_code: TypeModel = {
    TypeName: "substancedefinition_code",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "status", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "statusDate", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "source", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DocumentReference"] }], IsArray: true },
    ],
};

export const substancedefinition_name: TypeModel = {
    TypeName: "substancedefinition_name",
    BaseTypeName: "BackboneElement",
    Elements: [
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
        { ElementName: "authority", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "status", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
    ],
};

export const substancedefinition_relationship: TypeModel = {
    TypeName: "substancedefinition_relationship",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "substanceDefinition[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/SubstanceDefinition"] }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "isDefining", Type: [{ TypeName: "boolean" }] },
        { ElementName: "amount[x]", Type: [{ TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "RatioRange" }, { TypeName: "string" }] },
        { ElementName: "comparator", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "measurementType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "interaction", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "organism", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "organismType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "source", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DocumentReference"] }], IsArray: true },
    ],
};

export const substancedefinition_sourceMaterial: TypeModel = {
    TypeName: "substancedefinition_sourceMaterial",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "genus", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "species", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "part", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "countryOfOrigin", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
    ],
};

export const substancedefinition_nucleicAcid: TypeModel = {
    TypeName: "substancedefinition_nucleicAcid",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "sequenceType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "numberOfSubunits", Type: [{ TypeName: "integer" }] },
        { ElementName: "areaOfHybridisation", Type: [{ TypeName: "string" }] },
        { ElementName: "oligoNucleotideType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "subunit", Type: [{ TypeName: "substancedefinition_nucleicAcid_subunit" }], IsArray: true },
        { ElementName: "gene", Type: [{ TypeName: "substancedefinition_nucleicAcid_gene" }], IsArray: true },
        { ElementName: "geneElement", Type: [{ TypeName: "substancedefinition_nucleicAcid_geneElement" }], IsArray: true },
    ],
};

export const substancedefinition_nucleicAcid_subunit: TypeModel = {
    TypeName: "substancedefinition_nucleicAcid_subunit",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "subunit", Type: [{ TypeName: "integer" }] },
        { ElementName: "sequence", Type: [{ TypeName: "string" }] },
        { ElementName: "length", Type: [{ TypeName: "integer" }] },
        { ElementName: "sequenceAttachment", Type: [{ TypeName: "Attachment" }] },
        { ElementName: "fivePrime", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "threePrime", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "linkage", Type: [{ TypeName: "substancedefinition_nucleicAcid_subunit_linkage" }], IsArray: true },
        { ElementName: "sugar", Type: [{ TypeName: "substancedefinition_nucleicAcid_subunit_sugar" }], IsArray: true },
    ],
};

export const substancedefinition_nucleicAcid_subunit_linkage: TypeModel = {
    TypeName: "substancedefinition_nucleicAcid_subunit_linkage",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "connectivity", Type: [{ TypeName: "string" }] },
        { ElementName: "substance", Type: [{ TypeName: "CodeableReference" }] },
        { ElementName: "residueSite", Type: [{ TypeName: "string" }] },
    ],
};

export const substancedefinition_nucleicAcid_subunit_sugar: TypeModel = {
    TypeName: "substancedefinition_nucleicAcid_subunit_sugar",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "substance", Type: [{ TypeName: "CodeableReference" }] },
        { ElementName: "residueSite", Type: [{ TypeName: "string" }] },
    ],
};

export const substancedefinition_nucleicAcid_gene: TypeModel = {
    TypeName: "substancedefinition_nucleicAcid_gene",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "sequenceOrigin", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "gene", Type: [{ TypeName: "CodeableReference" }] },
        { ElementName: "source", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DocumentReference"] }], IsArray: true },
    ],
};

export const substancedefinition_nucleicAcid_geneElement: TypeModel = {
    TypeName: "substancedefinition_nucleicAcid_geneElement",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "element", Type: [{ TypeName: "CodeableReference" }] },
        { ElementName: "source", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DocumentReference"] }], IsArray: true },
    ],
};

export const substancedefinition_polymer: TypeModel = {
    TypeName: "substancedefinition_polymer",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "class", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "geometry", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "copolymerConnectivity", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "modification", Type: [{ TypeName: "string" }] },
        { ElementName: "monomerSet", Type: [{ TypeName: "substancedefinition_polymer_monomerSet" }], IsArray: true },
        { ElementName: "repeat", Type: [{ TypeName: "substancedefinition_polymer_repeat" }], IsArray: true },
    ],
};

export const substancedefinition_polymer_monomerSet: TypeModel = {
    TypeName: "substancedefinition_polymer_monomerSet",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "ratioType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "startingMaterial", Type: [{ TypeName: "substancedefinition_polymer_monomerSet_startingMaterial" }], IsArray: true },
    ],
};

export const substancedefinition_polymer_monomerSet_startingMaterial: TypeModel = {
    TypeName: "substancedefinition_polymer_monomerSet_startingMaterial",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "CodeableReference" }] },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "isDefining", Type: [{ TypeName: "boolean" }] },
        { ElementName: "amount", Type: [{ TypeName: "Quantity" }] },
    ],
};

export const substancedefinition_polymer_repeat: TypeModel = {
    TypeName: "substancedefinition_polymer_repeat",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "averageMolecularFormula", Type: [{ TypeName: "string" }] },
        { ElementName: "repeatUnitAmountType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "repeatUnit", Type: [{ TypeName: "substancedefinition_polymer_repeat_repeatUnit" }], IsArray: true },
    ],
};

export const substancedefinition_polymer_repeat_repeatUnit: TypeModel = {
    TypeName: "substancedefinition_polymer_repeat_repeatUnit",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "unit", Type: [{ TypeName: "string" }] },
        { ElementName: "orientation", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "amount", Type: [{ TypeName: "integer" }] },
        { ElementName: "degreeOfPolymerisation", Type: [{ TypeName: "substancedefinition_polymer_repeat_repeatUnit_degreeOfPolymerisation" }], IsArray: true },
        { ElementName: "structuralRepresentation", Type: [{ TypeName: "substancedefinition_structure_representation" }], IsArray: true },
    ],
};

export const substancedefinition_polymer_repeat_repeatUnit_degreeOfPolymerisation: TypeModel = {
    TypeName: "substancedefinition_polymer_repeat_repeatUnit_degreeOfPolymerisation",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "average", Type: [{ TypeName: "integer" }] },
        { ElementName: "low", Type: [{ TypeName: "integer" }] },
        { ElementName: "high", Type: [{ TypeName: "integer" }] },
    ],
};

export const substancedefinition_protein: TypeModel = {
    TypeName: "substancedefinition_protein",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "sequenceType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "numberOfSubunits", Type: [{ TypeName: "integer" }] },
        { ElementName: "disulfideLinkage", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "subunit", Type: [{ TypeName: "substancedefinition_protein_subunit" }], IsArray: true },
        { ElementName: "gene", Type: [{ TypeName: "substancedefinition_nucleicAcid_gene" }], IsArray: true },
        { ElementName: "modificationType", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const substancedefinition_protein_subunit: TypeModel = {
    TypeName: "substancedefinition_protein_subunit",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "subunit", Type: [{ TypeName: "integer" }] },
        { ElementName: "sequence", Type: [{ TypeName: "string" }] },
        { ElementName: "length", Type: [{ TypeName: "integer" }] },
        { ElementName: "sequenceAttachment", Type: [{ TypeName: "Attachment" }] },
        { ElementName: "nTerminalModification", Type: [{ TypeName: "CodeableReference" }] },
        { ElementName: "cTerminalModification", Type: [{ TypeName: "CodeableReference" }] },
    ],
};

export const Task: TypeModel = {
    TypeName: "Task",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "basedOn", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
        { ElementName: "groupIdentifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "partOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Task"] }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "statusReason", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "businessStatus", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "intent", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "priority", Type: [{ TypeName: "code" }] },
        { ElementName: "doNotPerform", Type: [{ TypeName: "boolean" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
        { ElementName: "focus", Type: [{ TypeName: "task_focus" }], IsArray: true },
        { ElementName: "for", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "requestedPeriod", Type: [{ TypeName: "Period" }] },
        { ElementName: "executionPeriod", Type: [{ TypeName: "Period" }] },
        { ElementName: "authoredOn", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "lastModified", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "requester", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "requestedPerformer", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "owner", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "performer", Type: [{ TypeName: "task_performer" }], IsArray: true },
        { ElementName: "location", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }] },
        { ElementName: "reason", Type: [{ TypeName: "CodeableReference" }], IsArray: true },
        { ElementName: "insurance", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ClaimResponse", "http://hl7.org/fhir/StructureDefinition/Coverage"] }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "relevantHistory", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Provenance"] }], IsArray: true },
        { ElementName: "restriction", Type: [{ TypeName: "task_restriction" }] },
        { ElementName: "input", Type: [{ TypeName: "task_input" }], IsArray: true },
        { ElementName: "output", Type: [{ TypeName: "task_output" }], IsArray: true },
    ],
};

export const task_focus: TypeModel = {
    TypeName: "task_focus",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "value[x]", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }, { TypeName: "canonical" }], Required: true },
    ],
};

export const task_performer: TypeModel = {
    TypeName: "task_performer",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "function", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "actor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
    ],
};

export const task_restriction: TypeModel = {
    TypeName: "task_restriction",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "repetitions", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "recipient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], IsArray: true },
    ],
};

export const task_input: TypeModel = {
    TypeName: "task_input",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "Address" }, { TypeName: "Age" }, { TypeName: "Annotation" }, { TypeName: "Attachment" }, { TypeName: "Availability" }, { TypeName: "CodeableConcept" }, { TypeName: "CodeableReference" }, { TypeName: "Coding" }, { TypeName: "ContactDetail" }, { TypeName: "ContactPoint" }, { TypeName: "Count" }, { TypeName: "DataRequirement" }, { TypeName: "Distance" }, { TypeName: "Dosage" }, { TypeName: "Duration" }, { TypeName: "Expression" }, { TypeName: "ExtendedContactDetail" }, { TypeName: "HumanName" }, { TypeName: "Identifier" }, { TypeName: "Meta" }, { TypeName: "Money" }, { TypeName: "ParameterDefinition" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "RatioRange" }, { TypeName: "Reference" }, { TypeName: "RelatedArtifact" }, { TypeName: "SampledData" }, { TypeName: "Signature" }, { TypeName: "Timing" }, { TypeName: "TriggerDefinition" }, { TypeName: "UsageContext" }, { TypeName: "VirtualServiceDetail" }, { TypeName: "base64Binary" }, { TypeName: "boolean" }, { TypeName: "canonical" }, { TypeName: "code" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "id" }, { TypeName: "instant" }, { TypeName: "integer" }, { TypeName: "integer64" }, { TypeName: "markdown" }, { TypeName: "oid" }, { TypeName: "positiveInt" }, { TypeName: "string" }, { TypeName: "time" }, { TypeName: "unsignedInt" }, { TypeName: "uri" }, { TypeName: "url" }, { TypeName: "uuid" }], Required: true },
    ],
};

export const task_output: TypeModel = {
    TypeName: "task_output",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "Address" }, { TypeName: "Age" }, { TypeName: "Annotation" }, { TypeName: "Attachment" }, { TypeName: "Availability" }, { TypeName: "CodeableConcept" }, { TypeName: "CodeableReference" }, { TypeName: "Coding" }, { TypeName: "ContactDetail" }, { TypeName: "ContactPoint" }, { TypeName: "Count" }, { TypeName: "DataRequirement" }, { TypeName: "Distance" }, { TypeName: "Dosage" }, { TypeName: "Duration" }, { TypeName: "Expression" }, { TypeName: "ExtendedContactDetail" }, { TypeName: "HumanName" }, { TypeName: "Identifier" }, { TypeName: "Meta" }, { TypeName: "Money" }, { TypeName: "ParameterDefinition" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "RatioRange" }, { TypeName: "Reference" }, { TypeName: "RelatedArtifact" }, { TypeName: "SampledData" }, { TypeName: "Signature" }, { TypeName: "Timing" }, { TypeName: "TriggerDefinition" }, { TypeName: "UsageContext" }, { TypeName: "VirtualServiceDetail" }, { TypeName: "base64Binary" }, { TypeName: "boolean" }, { TypeName: "canonical" }, { TypeName: "code" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "id" }, { TypeName: "instant" }, { TypeName: "integer" }, { TypeName: "integer64" }, { TypeName: "markdown" }, { TypeName: "oid" }, { TypeName: "positiveInt" }, { TypeName: "string" }, { TypeName: "time" }, { TypeName: "unsignedInt" }, { TypeName: "uri" }, { TypeName: "url" }, { TypeName: "uuid" }], Required: true },
    ],
};

export const TerminologyCapabilities: TypeModel = {
    TypeName: "TerminologyCapabilities",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "versionAlgorithm[x]", Type: [{ TypeName: "Coding" }, { TypeName: "string" }] },
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
        { ElementName: "copyrightLabel", Type: [{ TypeName: "string" }] },
        { ElementName: "kind", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "software", Type: [{ TypeName: "terminologycapabilities_software" }] },
        { ElementName: "implementation", Type: [{ TypeName: "terminologycapabilities_implementation" }] },
        { ElementName: "lockedDate", Type: [{ TypeName: "boolean" }] },
        { ElementName: "codeSystem", Type: [{ TypeName: "terminologycapabilities_codeSystem" }], IsArray: true },
        { ElementName: "supplements", Type: [{ TypeName: "terminologycapabilities_supplements" }] },
        { ElementName: "expansion", Type: [{ TypeName: "terminologycapabilities_expansion" }] },
        { ElementName: "codeSearch", Type: [{ TypeName: "code" }] },
        { ElementName: "validateCode", Type: [{ TypeName: "terminologycapabilities_validateCode" }] },
        { ElementName: "translation", Type: [{ TypeName: "terminologycapabilities_translation" }] },
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
        { ElementName: "description", Type: [{ TypeName: "markdown" }], Required: true },
        { ElementName: "url", Type: [{ TypeName: "url" }] },
        { ElementName: "fragmentSupport", Type: [{ TypeName: "markdown" }] },
        { ElementName: "supplementSupport", Type: [{ TypeName: "markdown" }] },
    ],
};

export const terminologycapabilities_codeSystem: TypeModel = {
    TypeName: "terminologycapabilities_codeSystem",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "uri", Type: [{ TypeName: "canonical" }] },
        { ElementName: "supplement", Type: [{ TypeName: "canonical" }], IsArray: true },
        { ElementName: "versionAlgorithm[x]", Type: [{ TypeName: "Coding" }, { TypeName: "string" }] },
        { ElementName: "version", Type: [{ TypeName: "terminologycapabilities_codeSystem_version" }], IsArray: true },
        { ElementName: "content", Type: [{ TypeName: "code" }] },
        { ElementName: "subsumption", Type: [{ TypeName: "boolean" }] },
    ],
};

export const terminologycapabilities_codeSystem_version: TypeModel = {
    TypeName: "terminologycapabilities_codeSystem_version",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "value", Type: [{ TypeName: "string" }] },
        { ElementName: "isDefault", Type: [{ TypeName: "boolean" }] },
        { ElementName: "content", Type: [{ TypeName: "code" }] },
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
        { ElementName: "code", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "op", Type: [{ TypeName: "code" }], IsArray: true, Required: true },
    ],
};

export const terminologycapabilities_supplements: TypeModel = {
    TypeName: "terminologycapabilities_supplements",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "globals", Type: [{ TypeName: "code" }] },
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
        { ElementName: "documentation", Type: [{ TypeName: "markdown" }] },
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

export const ValueSet: TypeModel = {
    TypeName: "ValueSet",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "versionAlgorithm[x]", Type: [{ TypeName: "Coding" }, { TypeName: "string" }] },
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
        { ElementName: "copyrightLabel", Type: [{ TypeName: "string" }] },
        { ElementName: "approvalDate", Type: [{ TypeName: "date" }] },
        { ElementName: "lastReviewDate", Type: [{ TypeName: "date" }] },
        { ElementName: "effectivePeriod", Type: [{ TypeName: "Period" }] },
        { ElementName: "topic", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "author", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "editor", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "reviewer", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "endorser", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
        { ElementName: "relatedArtifact", Type: [{ TypeName: "RelatedArtifact" }], IsArray: true },
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
        { ElementName: "property", Type: [{ TypeName: "string" }], IsArray: true },
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
        { ElementName: "copyright", Type: [{ TypeName: "markdown" }] },
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
        { ElementName: "additionalUse", Type: [{ TypeName: "Coding" }], IsArray: true },
        { ElementName: "value", Type: [{ TypeName: "string" }], Required: true },
    ],
};

export const valueset_compose_include_filter: TypeModel = {
    TypeName: "valueset_compose_include_filter",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "property", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "op", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "value", Type: [{ TypeName: "string" }] },
        { ElementName: "filter", Type: [{ TypeName: "valueset_compose_include_filter" }], IsArray: true },
    ],
};

export const valueset_expansion: TypeModel = {
    TypeName: "valueset_expansion",
    BaseTypeName: "BackboneElement",
    Elements: [
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

export const valueset_expansion_parameter: TypeModel = {
    TypeName: "valueset_expansion_parameter",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "name", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "boolean" }, { TypeName: "code" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "integer" }, { TypeName: "string" }, { TypeName: "uri" }] },
    ],
};

export const valueset_expansion_property: TypeModel = {
    TypeName: "valueset_expansion_property",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "uri", Type: [{ TypeName: "uri" }] },
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
        { ElementName: "property", Type: [{ TypeName: "valueset_expansion_contains_property" }], IsArray: true },
        { ElementName: "contains", Type: [{ TypeName: "valueset_expansion_contains" }], IsArray: true },
    ],
};

export const valueset_expansion_contains_property: TypeModel = {
    TypeName: "valueset_expansion_contains_property",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "Coding" }, { TypeName: "boolean" }, { TypeName: "code" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "integer" }, { TypeName: "string" }], Required: true },
        { ElementName: "subProperty", Type: [{ TypeName: "valueset_expansion_contains_property_subProperty" }], IsArray: true },
    ],
};

export const valueset_expansion_contains_property_subProperty: TypeModel = {
    TypeName: "valueset_expansion_contains_property_subProperty",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "Coding" }, { TypeName: "boolean" }, { TypeName: "code" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "integer" }, { TypeName: "string" }], Required: true },
    ],
};

export const VisionPrescription: TypeModel = {
    TypeName: "VisionPrescription",
    BaseTypeName: "DomainResource",
    Elements: [
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "basedOn", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CarePlan", "http://hl7.org/fhir/StructureDefinition/NutritionOrder", "http://hl7.org/fhir/StructureDefinition/RequestOrchestration", "http://hl7.org/fhir/StructureDefinition/ServiceRequest", "http://hl7.org/fhir/StructureDefinition/VisionPrescription"] }], IsArray: true },
        { ElementName: "groupIdentifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "intent", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "priority", Type: [{ TypeName: "code" }] },
        { ElementName: "created", Type: [{ TypeName: "dateTime" }], Required: true },
        { ElementName: "patient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }], Required: true },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter"] }] },
        { ElementName: "dateWritten", Type: [{ TypeName: "dateTime" }], Required: true },
        { ElementName: "effectiveEndDate", Type: [{ TypeName: "dateTime" }] },
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
