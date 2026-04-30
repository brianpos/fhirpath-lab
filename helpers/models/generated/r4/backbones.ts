// THIS FILE IS GENERATED — DO NOT EDIT BY HAND.
// Run `npm run generate:models -- --version <r4|r4b|r5|r6>` to regenerate.
// See docs/custom-model-generator-plan.md.

import type { TypeModel } from "../../../custom_model";

// Synthetic backbone / nested-element types

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

export const account_guarantor: TypeModel = {
    TypeName: "account_guarantor",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "party", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
        { ElementName: "onHold", Type: [{ TypeName: "boolean" }] },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
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
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const adverseevent_suspectEntity: TypeModel = {
    TypeName: "adverseevent_suspectEntity",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "instance", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Immunization", "http://hl7.org/fhir/StructureDefinition/Medication", "http://hl7.org/fhir/StructureDefinition/MedicationAdministration", "http://hl7.org/fhir/StructureDefinition/MedicationStatement", "http://hl7.org/fhir/StructureDefinition/Procedure", "http://hl7.org/fhir/StructureDefinition/Substance"] }], Required: true },
        { ElementName: "causality", Type: [{ TypeName: "adverseevent_suspectEntity_causality" }], IsArray: true },
    ],
};

export const adverseevent_suspectEntity_causality: TypeModel = {
    TypeName: "adverseevent_suspectEntity_causality",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "assessment", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "productRelatedness", Type: [{ TypeName: "string" }] },
        { ElementName: "author", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "method", Type: [{ TypeName: "CodeableConcept" }] },
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
        { ElementName: "manifestation", Type: [{ TypeName: "CodeableConcept" }], IsArray: true, Required: true },
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
        { ElementName: "actor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "required", Type: [{ TypeName: "code" }] },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "address", Type: [{ TypeName: "string" }] },
        { ElementName: "type", Type: [{ TypeName: "code" }] },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "base64Binary" }, { TypeName: "string" }], Required: true },
    ],
};

export const auditevent_source: TypeModel = {
    TypeName: "auditevent_source",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "site", Type: [{ TypeName: "string" }] },
        { ElementName: "observer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "Coding" }], IsArray: true },
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
        { ElementName: "source", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient"] }] },
        { ElementName: "collected[x]", Type: [{ TypeName: "Period" }, { TypeName: "dateTime" }] },
    ],
};

export const biologicallyderivedproduct_manipulation: TypeModel = {
    TypeName: "biologicallyderivedproduct_manipulation",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "time[x]", Type: [{ TypeName: "Period" }, { TypeName: "dateTime" }] },
    ],
};

export const biologicallyderivedproduct_processing: TypeModel = {
    TypeName: "biologicallyderivedproduct_processing",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "procedure", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "additive", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Substance"] }] },
        { ElementName: "time[x]", Type: [{ TypeName: "Period" }, { TypeName: "dateTime" }] },
    ],
};

export const biologicallyderivedproduct_storage: TypeModel = {
    TypeName: "biologicallyderivedproduct_storage",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "temperature", Type: [{ TypeName: "decimal" }] },
        { ElementName: "scale", Type: [{ TypeName: "code" }] },
        { ElementName: "duration", Type: [{ TypeName: "Period" }] },
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
        { ElementName: "relation", Type: [{ TypeName: "string" }], Required: true },
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
        { ElementName: "description", Type: [{ TypeName: "string" }], Required: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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

export const careteam_participant: TypeModel = {
    TypeName: "careteam_participant",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "member", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "onBehalfOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
    ],
};

export const catalogentry_relatedEntry: TypeModel = {
    TypeName: "catalogentry_relatedEntry",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "relationtype", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "item", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CatalogEntry"] }], Required: true },
    ],
};

export const chargeitem_performer: TypeModel = {
    TypeName: "chargeitem_performer",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "function", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "actor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
    ],
};

export const chargeitemdefinition_applicability: TypeModel = {
    TypeName: "chargeitemdefinition_applicability",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "language", Type: [{ TypeName: "string" }] },
        { ElementName: "expression", Type: [{ TypeName: "string" }] },
    ],
};

export const chargeitemdefinition_propertyGroup: TypeModel = {
    TypeName: "chargeitemdefinition_propertyGroup",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "applicability", Type: [{ TypeName: "chargeitemdefinition_applicability" }], IsArray: true },
        { ElementName: "priceComponent", Type: [{ TypeName: "chargeitemdefinition_propertyGroup_priceComponent" }], IsArray: true },
    ],
};

export const chargeitemdefinition_propertyGroup_priceComponent: TypeModel = {
    TypeName: "chargeitemdefinition_propertyGroup_priceComponent",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "factor", Type: [{ TypeName: "decimal" }] },
        { ElementName: "amount", Type: [{ TypeName: "Money" }] },
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
        { ElementName: "responsible", Type: [{ TypeName: "boolean" }] },
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "qualification", Type: [{ TypeName: "CodeableConcept" }] },
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
        { ElementName: "packageCode", Type: [{ TypeName: "CodeableConcept" }] },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "timing[x]", Type: [{ TypeName: "Period" }, { TypeName: "date" }] },
        { ElementName: "value[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "Quantity" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }, { TypeName: "boolean" }, { TypeName: "string" }] },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "noteNumber", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "adjudication", Type: [{ TypeName: "claimresponse_item_adjudication" }], IsArray: true, Required: true },
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
        { ElementName: "value", Type: [{ TypeName: "decimal" }] },
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
        { ElementName: "noteNumber", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "adjudication", Type: [{ TypeName: "claimresponse_item_adjudication" }], IsArray: true, Required: true },
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
        { ElementName: "noteNumber", Type: [{ TypeName: "positiveInt" }], IsArray: true },
        { ElementName: "adjudication", Type: [{ TypeName: "claimresponse_item_adjudication" }], IsArray: true },
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
        { ElementName: "number", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "type", Type: [{ TypeName: "code" }] },
        { ElementName: "text", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "language", Type: [{ TypeName: "CodeableConcept" }] },
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

export const clinicalimpression_finding: TypeModel = {
    TypeName: "clinicalimpression_finding",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "itemCodeableConcept", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "itemReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Condition", "http://hl7.org/fhir/StructureDefinition/Media", "http://hl7.org/fhir/StructureDefinition/Observation"] }] },
        { ElementName: "basis", Type: [{ TypeName: "string" }] },
    ],
};

export const clinicalimpression_investigation: TypeModel = {
    TypeName: "clinicalimpression_investigation",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "item", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DiagnosticReport", "http://hl7.org/fhir/StructureDefinition/FamilyMemberHistory", "http://hl7.org/fhir/StructureDefinition/ImagingStudy", "http://hl7.org/fhir/StructureDefinition/Media", "http://hl7.org/fhir/StructureDefinition/Observation", "http://hl7.org/fhir/StructureDefinition/QuestionnaireResponse", "http://hl7.org/fhir/StructureDefinition/RiskAssessment"] }], IsArray: true },
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
        { ElementName: "content[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }, { TypeName: "string" }], Required: true },
    ],
};

export const communicationrequest_payload: TypeModel = {
    TypeName: "communicationrequest_payload",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "content[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }, { TypeName: "string" }], Required: true },
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
        { ElementName: "documentation", Type: [{ TypeName: "string" }] },
    ],
};

export const composition_attester: TypeModel = {
    TypeName: "composition_attester",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "mode", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "time", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "party", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
    ],
};

export const composition_event: TypeModel = {
    TypeName: "composition_event",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "detail", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
    ],
};

export const composition_relatesTo: TypeModel = {
    TypeName: "composition_relatesTo",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "target[x]", Type: [{ TypeName: "Identifier" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Composition"] }], Required: true },
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

export const conceptmap_group: TypeModel = {
    TypeName: "conceptmap_group",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "code" }] },
        { ElementName: "display", Type: [{ TypeName: "string" }] },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "mode", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "code", Type: [{ TypeName: "code" }] },
        { ElementName: "display", Type: [{ TypeName: "string" }] },
        { ElementName: "url", Type: [{ TypeName: "canonical" }] },
    ],
};

export const condition_evidence: TypeModel = {
    TypeName: "condition_evidence",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "detail", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
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
        { ElementName: "assessment", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ClinicalImpression", "http://hl7.org/fhir/StructureDefinition/DiagnosticReport", "http://hl7.org/fhir/StructureDefinition/Observation"] }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const consent_policy: TypeModel = {
    TypeName: "consent_policy",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "authority", Type: [{ TypeName: "uri" }] },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "reference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
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
        { ElementName: "verifiedWith", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "verificationDate", Type: [{ TypeName: "dateTime" }] },
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
        { ElementName: "text", Type: [{ TypeName: "string" }] },
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
        { ElementName: "value", Type: [{ TypeName: "string" }], Required: true },
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
        { ElementName: "value[x]", Type: [{ TypeName: "Money" }, { TypeName: "Quantity" }], Required: true },
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
    ],
};

export const device_deviceName: TypeModel = {
    TypeName: "device_deviceName",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "name", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
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
        { ElementName: "valueQuantity", Type: [{ TypeName: "Quantity" }], IsArray: true },
        { ElementName: "valueCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
    ],
};

export const device_specialization: TypeModel = {
    TypeName: "device_specialization",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "systemType", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
    ],
};

export const device_udiCarrier: TypeModel = {
    TypeName: "device_udiCarrier",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "deviceIdentifier", Type: [{ TypeName: "string" }] },
        { ElementName: "issuer", Type: [{ TypeName: "uri" }] },
        { ElementName: "jurisdiction", Type: [{ TypeName: "uri" }] },
        { ElementName: "carrierAIDC", Type: [{ TypeName: "base64Binary" }] },
        { ElementName: "carrierHRF", Type: [{ TypeName: "string" }] },
        { ElementName: "entryType", Type: [{ TypeName: "code" }] },
    ],
};

export const device_version: TypeModel = {
    TypeName: "device_version",
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

export const devicedefinition_capability: TypeModel = {
    TypeName: "devicedefinition_capability",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "description", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
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
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
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

export const devicedefinition_property: TypeModel = {
    TypeName: "devicedefinition_property",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "valueQuantity", Type: [{ TypeName: "Quantity" }], IsArray: true },
        { ElementName: "valueCode", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
    ],
};

export const devicedefinition_specialization: TypeModel = {
    TypeName: "devicedefinition_specialization",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "systemType", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
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
    ],
};

export const devicemetric_calibration: TypeModel = {
    TypeName: "devicemetric_calibration",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "code" }] },
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
        { ElementName: "link", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Media"] }], Required: true },
    ],
};

export const documentmanifest_related: TypeModel = {
    TypeName: "documentmanifest_related",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "ref", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
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
        { ElementName: "format", Type: [{ TypeName: "Coding" }] },
    ],
};

export const documentreference_context: TypeModel = {
    TypeName: "documentreference_context",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "encounter", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Encounter", "http://hl7.org/fhir/StructureDefinition/EpisodeOfCare"] }], IsArray: true },
        { ElementName: "event", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "facilityType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "practiceSetting", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "sourcePatientInfo", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }] },
        { ElementName: "related", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], IsArray: true },
    ],
};

export const documentreference_relatesTo: TypeModel = {
    TypeName: "documentreference_relatesTo",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "code" }], Required: true },
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
        { ElementName: "dose[x]", Type: [{ TypeName: "Quantity" }, { TypeName: "Range" }] },
        { ElementName: "rate[x]", Type: [{ TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }] },
    ],
};

export const effectevidencesynthesis_certainty: TypeModel = {
    TypeName: "effectevidencesynthesis_certainty",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "rating", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "certaintySubcomponent", Type: [{ TypeName: "effectevidencesynthesis_certainty_certaintySubcomponent" }], IsArray: true },
    ],
};

export const effectevidencesynthesis_certainty_certaintySubcomponent: TypeModel = {
    TypeName: "effectevidencesynthesis_certainty_certaintySubcomponent",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "rating", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
    ],
};

export const effectevidencesynthesis_effectEstimate: TypeModel = {
    TypeName: "effectevidencesynthesis_effectEstimate",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "level", Type: [{ TypeName: "decimal" }] },
        { ElementName: "from", Type: [{ TypeName: "decimal" }] },
        { ElementName: "to", Type: [{ TypeName: "decimal" }] },
    ],
};

export const effectevidencesynthesis_resultsByExposure: TypeModel = {
    TypeName: "effectevidencesynthesis_resultsByExposure",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "exposureState", Type: [{ TypeName: "code" }] },
        { ElementName: "variantState", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "riskEvidenceSynthesis", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RiskEvidenceSynthesis"] }], Required: true },
    ],
};

export const effectevidencesynthesis_sampleSize: TypeModel = {
    TypeName: "effectevidencesynthesis_sampleSize",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "numberOfStudies", Type: [{ TypeName: "integer" }] },
        { ElementName: "numberOfParticipants", Type: [{ TypeName: "integer" }] },
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
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "valueSet", Type: [{ TypeName: "canonical" }] },
    ],
};

export const elementdefinition_constraint: TypeModel = {
    TypeName: "elementdefinition_constraint",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "key", Type: [{ TypeName: "id" }], Required: true },
        { ElementName: "requirements", Type: [{ TypeName: "string" }] },
        { ElementName: "severity", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "human", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "expression", Type: [{ TypeName: "string" }] },
        { ElementName: "xpath", Type: [{ TypeName: "string" }] },
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
        { ElementName: "value[x]", Type: [{ TypeName: "Address" }, { TypeName: "Age" }, { TypeName: "Annotation" }, { TypeName: "Attachment" }, { TypeName: "CodeableConcept" }, { TypeName: "Coding" }, { TypeName: "ContactDetail" }, { TypeName: "ContactPoint" }, { TypeName: "Contributor" }, { TypeName: "Count" }, { TypeName: "DataRequirement" }, { TypeName: "Distance" }, { TypeName: "Dosage" }, { TypeName: "Duration" }, { TypeName: "Expression" }, { TypeName: "HumanName" }, { TypeName: "Identifier" }, { TypeName: "Meta" }, { TypeName: "Money" }, { TypeName: "ParameterDefinition" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "Reference" }, { TypeName: "RelatedArtifact" }, { TypeName: "SampledData" }, { TypeName: "Signature" }, { TypeName: "Timing" }, { TypeName: "TriggerDefinition" }, { TypeName: "UsageContext" }, { TypeName: "base64Binary" }, { TypeName: "boolean" }, { TypeName: "canonical" }, { TypeName: "code" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "id" }, { TypeName: "instant" }, { TypeName: "integer" }, { TypeName: "markdown" }, { TypeName: "oid" }, { TypeName: "positiveInt" }, { TypeName: "string" }, { TypeName: "time" }, { TypeName: "unsignedInt" }, { TypeName: "uri" }, { TypeName: "url" }, { TypeName: "uuid" }], Required: true },
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
        { ElementName: "comment", Type: [{ TypeName: "string" }] },
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

export const encounter_classHistory: TypeModel = {
    TypeName: "encounter_classHistory",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "class", Type: [{ TypeName: "Coding" }], Required: true },
        { ElementName: "period", Type: [{ TypeName: "Period" }], Required: true },
    ],
};

export const encounter_diagnosis: TypeModel = {
    TypeName: "encounter_diagnosis",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "condition", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Condition", "http://hl7.org/fhir/StructureDefinition/Procedure"] }], Required: true },
        { ElementName: "use", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "rank", Type: [{ TypeName: "positiveInt" }] },
    ],
};

export const encounter_hospitalization: TypeModel = {
    TypeName: "encounter_hospitalization",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "location", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Location"] }], Required: true },
        { ElementName: "status", Type: [{ TypeName: "code" }] },
        { ElementName: "physicalType", Type: [{ TypeName: "CodeableConcept" }] },
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
        { ElementName: "individual", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
    ],
};

export const encounter_statusHistory: TypeModel = {
    TypeName: "encounter_statusHistory",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "period", Type: [{ TypeName: "Period" }], Required: true },
    ],
};

export const episodeofcare_diagnosis: TypeModel = {
    TypeName: "episodeofcare_diagnosis",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "condition", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Condition"] }], Required: true },
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "rank", Type: [{ TypeName: "positiveInt" }] },
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

export const evidencevariable_characteristic: TypeModel = {
    TypeName: "evidencevariable_characteristic",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "definition[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "DataRequirement" }, { TypeName: "Expression" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }, { TypeName: "TriggerDefinition" }, { TypeName: "canonical" }], Required: true },
        { ElementName: "usageContext", Type: [{ TypeName: "UsageContext" }], IsArray: true },
        { ElementName: "exclude", Type: [{ TypeName: "boolean" }] },
        { ElementName: "participantEffective[x]", Type: [{ TypeName: "Duration" }, { TypeName: "Period" }, { TypeName: "Timing" }, { TypeName: "dateTime" }] },
        { ElementName: "timeFromStart", Type: [{ TypeName: "Duration" }] },
        { ElementName: "groupMeasure", Type: [{ TypeName: "code" }] },
    ],
};

export const examplescenario_actor: TypeModel = {
    TypeName: "examplescenario_actor",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "resourceId", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "resourceType", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "description", Type: [{ TypeName: "markdown" }] },
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
        { ElementName: "resourceId", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "versionId", Type: [{ TypeName: "string" }] },
    ],
};

export const examplescenario_instance_version: TypeModel = {
    TypeName: "examplescenario_instance_version",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "versionId", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "description", Type: [{ TypeName: "markdown" }], Required: true },
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
        { ElementName: "process", Type: [{ TypeName: "examplescenario_process" }], IsArray: true },
        { ElementName: "pause", Type: [{ TypeName: "boolean" }] },
        { ElementName: "operation", Type: [{ TypeName: "examplescenario_process_step_operation" }] },
        { ElementName: "alternative", Type: [{ TypeName: "examplescenario_process_step_alternative" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "responsible", Type: [{ TypeName: "boolean" }] },
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "qualification", Type: [{ TypeName: "CodeableConcept" }] },
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
        { ElementName: "packageCode", Type: [{ TypeName: "CodeableConcept" }] },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "number", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "type", Type: [{ TypeName: "code" }] },
        { ElementName: "text", Type: [{ TypeName: "string" }] },
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
        { ElementName: "claim", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Claim"] }] },
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
        { ElementName: "timing[x]", Type: [{ TypeName: "Period" }, { TypeName: "date" }] },
        { ElementName: "value[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "Quantity" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }, { TypeName: "boolean" }, { TypeName: "string" }] },
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

export const graphdefinition_link: TypeModel = {
    TypeName: "graphdefinition_link",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "use", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "code", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "rule", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "expression", Type: [{ TypeName: "string" }] },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
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
        { ElementName: "value[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Reference" }, { TypeName: "boolean" }], Required: true },
        { ElementName: "exclude", Type: [{ TypeName: "boolean" }], Required: true },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
    ],
};

export const group_member: TypeModel = {
    TypeName: "group_member",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "entity", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Medication", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/Substance"] }], Required: true },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "inactive", Type: [{ TypeName: "boolean" }] },
    ],
};

export const healthcareservice_availableTime: TypeModel = {
    TypeName: "healthcareservice_availableTime",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "daysOfWeek", Type: [{ TypeName: "code" }], IsArray: true },
        { ElementName: "allDay", Type: [{ TypeName: "boolean" }] },
        { ElementName: "availableStartTime", Type: [{ TypeName: "time" }] },
        { ElementName: "availableEndTime", Type: [{ TypeName: "time" }] },
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
        { ElementName: "comment", Type: [{ TypeName: "markdown" }] },
    ],
};

export const healthcareservice_notAvailable: TypeModel = {
    TypeName: "healthcareservice_notAvailable",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "during", Type: [{ TypeName: "Period" }] },
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

export const imagingstudy_series_instance: TypeModel = {
    TypeName: "imagingstudy_series_instance",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "uid", Type: [{ TypeName: "id" }], Required: true },
        { ElementName: "sopClass", Type: [{ TypeName: "Coding" }], Required: true },
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
        { ElementName: "actor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/CareTeam", "http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
    ],
};

export const immunization_education: TypeModel = {
    TypeName: "immunization_education",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "documentType", Type: [{ TypeName: "string" }] },
        { ElementName: "reference", Type: [{ TypeName: "uri" }] },
        { ElementName: "publicationDate", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "presentationDate", Type: [{ TypeName: "dateTime" }] },
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
        { ElementName: "actor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }], Required: true },
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
        { ElementName: "doseNumber[x]", Type: [{ TypeName: "positiveInt" }, { TypeName: "string" }], Required: true },
        { ElementName: "seriesDoses[x]", Type: [{ TypeName: "positiveInt" }, { TypeName: "string" }] },
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
        { ElementName: "detail", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Observation"] }] },
        { ElementName: "reported", Type: [{ TypeName: "boolean" }] },
    ],
};

export const immunizationrecommendation_recommendation: TypeModel = {
    TypeName: "immunizationrecommendation_recommendation",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "value", Type: [{ TypeName: "dateTime" }], Required: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "name", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
    ],
};

export const implementationguide_definition_page: TypeModel = {
    TypeName: "implementationguide_definition_page",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "code" }], Required: true },
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
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "example[x]", Type: [{ TypeName: "boolean" }, { TypeName: "canonical" }] },
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
        { ElementName: "example[x]", Type: [{ TypeName: "boolean" }, { TypeName: "canonical" }] },
        { ElementName: "relativePath", Type: [{ TypeName: "url" }] },
    ],
};

export const insuranceplan_contact: TypeModel = {
    TypeName: "insuranceplan_contact",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "network", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }], IsArray: true },
        { ElementName: "benefit", Type: [{ TypeName: "insuranceplan_coverage_benefit" }], IsArray: true, Required: true },
    ],
};

export const insuranceplan_coverage_benefit: TypeModel = {
    TypeName: "insuranceplan_coverage_benefit",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "requirement", Type: [{ TypeName: "string" }] },
        { ElementName: "limit", Type: [{ TypeName: "insuranceplan_coverage_benefit_limit" }], IsArray: true },
    ],
};

export const insuranceplan_coverage_benefit_limit: TypeModel = {
    TypeName: "insuranceplan_coverage_benefit_limit",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "value", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const insuranceplan_plan: TypeModel = {
    TypeName: "insuranceplan_plan",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "benefit", Type: [{ TypeName: "insuranceplan_plan_specificCost_benefit" }], IsArray: true },
    ],
};

export const insuranceplan_plan_specificCost_benefit: TypeModel = {
    TypeName: "insuranceplan_plan_specificCost_benefit",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "cost", Type: [{ TypeName: "insuranceplan_plan_specificCost_benefit_cost" }], IsArray: true },
    ],
};

export const insuranceplan_plan_specificCost_benefit_cost: TypeModel = {
    TypeName: "insuranceplan_plan_specificCost_benefit_cost",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "applicability", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "qualifiers", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "value", Type: [{ TypeName: "Quantity" }] },
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
        { ElementName: "chargeItem[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ChargeItem"] }], Required: true },
        { ElementName: "priceComponent", Type: [{ TypeName: "invoice_lineItem_priceComponent" }], IsArray: true },
    ],
};

export const invoice_lineItem_priceComponent: TypeModel = {
    TypeName: "invoice_lineItem_priceComponent",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "factor", Type: [{ TypeName: "decimal" }] },
        { ElementName: "amount", Type: [{ TypeName: "Money" }] },
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

export const linkage_item: TypeModel = {
    TypeName: "linkage_item",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "resource", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }], Required: true },
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

export const location_hoursOfOperation: TypeModel = {
    TypeName: "location_hoursOfOperation",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "daysOfWeek", Type: [{ TypeName: "code" }], IsArray: true },
        { ElementName: "allDay", Type: [{ TypeName: "boolean" }] },
        { ElementName: "openingTime", Type: [{ TypeName: "time" }] },
        { ElementName: "closingTime", Type: [{ TypeName: "time" }] },
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

export const measure_group: TypeModel = {
    TypeName: "measure_group",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "criteria", Type: [{ TypeName: "Expression" }], Required: true },
    ],
};

export const measure_group_stratifier: TypeModel = {
    TypeName: "measure_group_stratifier",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "criteria", Type: [{ TypeName: "Expression" }], Required: true },
    ],
};

export const measure_supplementalData: TypeModel = {
    TypeName: "measure_supplementalData",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "usage", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "criteria", Type: [{ TypeName: "Expression" }], Required: true },
    ],
};

export const measurereport_group: TypeModel = {
    TypeName: "measurereport_group",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "count", Type: [{ TypeName: "integer" }] },
        { ElementName: "subjectResults", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/List"] }] },
    ],
};

export const measurereport_group_stratifier: TypeModel = {
    TypeName: "measurereport_group_stratifier",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "value", Type: [{ TypeName: "CodeableConcept" }], Required: true },
    ],
};

export const measurereport_group_stratifier_stratum_population: TypeModel = {
    TypeName: "measurereport_group_stratifier_stratum_population",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "count", Type: [{ TypeName: "integer" }] },
        { ElementName: "subjectResults", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/List"] }] },
    ],
};

export const medication_batch: TypeModel = {
    TypeName: "medication_batch",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "lotNumber", Type: [{ TypeName: "string" }] },
        { ElementName: "expirationDate", Type: [{ TypeName: "dateTime" }] },
    ],
};

export const medication_ingredient: TypeModel = {
    TypeName: "medication_ingredient",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "item[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Medication", "http://hl7.org/fhir/StructureDefinition/Substance"] }], Required: true },
        { ElementName: "isActive", Type: [{ TypeName: "boolean" }] },
        { ElementName: "strength", Type: [{ TypeName: "Ratio" }] },
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
        { ElementName: "actor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
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
        { ElementName: "actor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
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
        { ElementName: "responsibleParty", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }], IsArray: true },
    ],
};

export const medicationknowledge_administrationGuidelines: TypeModel = {
    TypeName: "medicationknowledge_administrationGuidelines",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "dosage", Type: [{ TypeName: "medicationknowledge_administrationGuidelines_dosage" }], IsArray: true },
        { ElementName: "indication[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ObservationDefinition"] }] },
        { ElementName: "patientCharacteristics", Type: [{ TypeName: "medicationknowledge_administrationGuidelines_patientCharacteristics" }], IsArray: true },
    ],
};

export const medicationknowledge_administrationGuidelines_dosage: TypeModel = {
    TypeName: "medicationknowledge_administrationGuidelines_dosage",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "dosage", Type: [{ TypeName: "Dosage" }], IsArray: true, Required: true },
    ],
};

export const medicationknowledge_administrationGuidelines_patientCharacteristics: TypeModel = {
    TypeName: "medicationknowledge_administrationGuidelines_patientCharacteristics",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "characteristic[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Quantity" }], Required: true },
        { ElementName: "value", Type: [{ TypeName: "string" }], IsArray: true },
    ],
};

export const medicationknowledge_cost: TypeModel = {
    TypeName: "medicationknowledge_cost",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "source", Type: [{ TypeName: "string" }] },
        { ElementName: "cost", Type: [{ TypeName: "Money" }], Required: true },
    ],
};

export const medicationknowledge_drugCharacteristic: TypeModel = {
    TypeName: "medicationknowledge_drugCharacteristic",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "value[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Quantity" }, { TypeName: "base64Binary" }, { TypeName: "string" }] },
    ],
};

export const medicationknowledge_ingredient: TypeModel = {
    TypeName: "medicationknowledge_ingredient",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "item[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Substance"] }], Required: true },
        { ElementName: "isActive", Type: [{ TypeName: "boolean" }] },
        { ElementName: "strength", Type: [{ TypeName: "Ratio" }] },
    ],
};

export const medicationknowledge_kinetics: TypeModel = {
    TypeName: "medicationknowledge_kinetics",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "areaUnderCurve", Type: [{ TypeName: "Quantity" }], IsArray: true },
        { ElementName: "lethalDose50", Type: [{ TypeName: "Quantity" }], IsArray: true },
        { ElementName: "halfLifePeriod", Type: [{ TypeName: "Duration" }] },
    ],
};

export const medicationknowledge_medicineClassification: TypeModel = {
    TypeName: "medicationknowledge_medicineClassification",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "classification", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
    ],
};

export const medicationknowledge_monitoringProgram: TypeModel = {
    TypeName: "medicationknowledge_monitoringProgram",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
    ],
};

export const medicationknowledge_monograph: TypeModel = {
    TypeName: "medicationknowledge_monograph",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "source", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DocumentReference", "http://hl7.org/fhir/StructureDefinition/Media"] }] },
    ],
};

export const medicationknowledge_packaging: TypeModel = {
    TypeName: "medicationknowledge_packaging",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
    ],
};

export const medicationknowledge_regulatory: TypeModel = {
    TypeName: "medicationknowledge_regulatory",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "regulatoryAuthority", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }], Required: true },
        { ElementName: "substitution", Type: [{ TypeName: "medicationknowledge_regulatory_substitution" }], IsArray: true },
        { ElementName: "schedule", Type: [{ TypeName: "medicationknowledge_regulatory_schedule" }], IsArray: true },
        { ElementName: "maxDispense", Type: [{ TypeName: "medicationknowledge_regulatory_maxDispense" }] },
    ],
};

export const medicationknowledge_regulatory_maxDispense: TypeModel = {
    TypeName: "medicationknowledge_regulatory_maxDispense",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }], Required: true },
        { ElementName: "period", Type: [{ TypeName: "Duration" }] },
    ],
};

export const medicationknowledge_regulatory_schedule: TypeModel = {
    TypeName: "medicationknowledge_regulatory_schedule",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "schedule", Type: [{ TypeName: "CodeableConcept" }], Required: true },
    ],
};

export const medicationknowledge_regulatory_substitution: TypeModel = {
    TypeName: "medicationknowledge_regulatory_substitution",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "allowed", Type: [{ TypeName: "boolean" }], Required: true },
    ],
};

export const medicationknowledge_relatedMedicationKnowledge: TypeModel = {
    TypeName: "medicationknowledge_relatedMedicationKnowledge",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "reference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MedicationKnowledge"] }], IsArray: true, Required: true },
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
        { ElementName: "performer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
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

export const medicinalproduct_manufacturingBusinessOperation: TypeModel = {
    TypeName: "medicinalproduct_manufacturingBusinessOperation",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "operationType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "authorisationReferenceNumber", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "effectiveDate", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "confidentialityIndicator", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "manufacturer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }], IsArray: true },
        { ElementName: "regulator", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
    ],
};

export const medicinalproduct_name: TypeModel = {
    TypeName: "medicinalproduct_name",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "productName", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "namePart", Type: [{ TypeName: "medicinalproduct_name_namePart" }], IsArray: true },
        { ElementName: "countryLanguage", Type: [{ TypeName: "medicinalproduct_name_countryLanguage" }], IsArray: true },
    ],
};

export const medicinalproduct_name_countryLanguage: TypeModel = {
    TypeName: "medicinalproduct_name_countryLanguage",
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

export const medicinalproduct_name_namePart: TypeModel = {
    TypeName: "medicinalproduct_name_namePart",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "part", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "Coding" }], Required: true },
    ],
};

export const medicinalproduct_specialDesignation: TypeModel = {
    TypeName: "medicinalproduct_specialDesignation",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "intendedUse", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "indication[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/MedicinalProductIndication"] }] },
        { ElementName: "status", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "species", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const medicinalproductauthorization_jurisdictionalAuthorization: TypeModel = {
    TypeName: "medicinalproductauthorization_jurisdictionalAuthorization",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "date[x]", Type: [{ TypeName: "Period" }, { TypeName: "dateTime" }] },
        { ElementName: "application", Type: [{ TypeName: "medicinalproductauthorization_procedure" }], IsArray: true },
    ],
};

export const medicinalproductcontraindication_otherTherapy: TypeModel = {
    TypeName: "medicinalproductcontraindication_otherTherapy",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "therapyRelationshipType", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "medication[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Medication", "http://hl7.org/fhir/StructureDefinition/MedicinalProduct", "http://hl7.org/fhir/StructureDefinition/Substance", "http://hl7.org/fhir/StructureDefinition/SubstanceSpecification"] }], Required: true },
    ],
};

export const medicinalproductindication_otherTherapy: TypeModel = {
    TypeName: "medicinalproductindication_otherTherapy",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "therapyRelationshipType", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "medication[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Medication", "http://hl7.org/fhir/StructureDefinition/MedicinalProduct", "http://hl7.org/fhir/StructureDefinition/Substance", "http://hl7.org/fhir/StructureDefinition/SubstanceSpecification"] }], Required: true },
    ],
};

export const medicinalproductingredient_specifiedSubstance: TypeModel = {
    TypeName: "medicinalproductingredient_specifiedSubstance",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "strength", Type: [{ TypeName: "medicinalproductingredient_specifiedSubstance_strength" }], IsArray: true },
    ],
};

export const medicinalproductinteraction_interactant: TypeModel = {
    TypeName: "medicinalproductinteraction_interactant",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "item[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Medication", "http://hl7.org/fhir/StructureDefinition/MedicinalProduct", "http://hl7.org/fhir/StructureDefinition/ObservationDefinition", "http://hl7.org/fhir/StructureDefinition/Substance"] }], Required: true },
    ],
};

export const medicinalproductpackaged_batchIdentifier: TypeModel = {
    TypeName: "medicinalproductpackaged_batchIdentifier",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "outerPackaging", Type: [{ TypeName: "Identifier" }], Required: true },
        { ElementName: "immediatePackaging", Type: [{ TypeName: "Identifier" }] },
    ],
};

export const medicinalproductpackaged_packageItem: TypeModel = {
    TypeName: "medicinalproductpackaged_packageItem",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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

export const medicinalproductpharmaceutical_characteristics: TypeModel = {
    TypeName: "medicinalproductpharmaceutical_characteristics",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "status", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const medicinalproductpharmaceutical_routeOfAdministration: TypeModel = {
    TypeName: "medicinalproductpharmaceutical_routeOfAdministration",
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
        { ElementName: "targetSpecies", Type: [{ TypeName: "medicinalproductpharmaceutical_routeOfAdministration_targetSpecies" }], IsArray: true },
    ],
};

export const medicinalproductpharmaceutical_routeOfAdministration_targetSpecies: TypeModel = {
    TypeName: "medicinalproductpharmaceutical_routeOfAdministration_targetSpecies",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "withdrawalPeriod", Type: [{ TypeName: "medicinalproductpharmaceutical_routeOfAdministration_targetSpecies_withdrawalPeriod" }], IsArray: true },
    ],
};

export const medicinalproductpharmaceutical_routeOfAdministration_targetSpecies_withdrawalPeriod: TypeModel = {
    TypeName: "medicinalproductpharmaceutical_routeOfAdministration_targetSpecies_withdrawalPeriod",
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
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "target", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }] },
        { ElementName: "endpoint", Type: [{ TypeName: "url" }], Required: true },
        { ElementName: "receiver", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
    ],
};

export const messageheader_response: TypeModel = {
    TypeName: "messageheader_response",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "identifier", Type: [{ TypeName: "id" }], Required: true },
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
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "software", Type: [{ TypeName: "string" }] },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "contact", Type: [{ TypeName: "ContactPoint" }] },
        { ElementName: "endpoint", Type: [{ TypeName: "url" }], Required: true },
    ],
};

export const molecularsequence_quality: TypeModel = {
    TypeName: "molecularsequence_quality",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "score", Type: [{ TypeName: "integer" }], IsArray: true },
        { ElementName: "numTP", Type: [{ TypeName: "integer" }], IsArray: true },
        { ElementName: "numFP", Type: [{ TypeName: "integer" }], IsArray: true },
        { ElementName: "numFN", Type: [{ TypeName: "integer" }], IsArray: true },
        { ElementName: "precision", Type: [{ TypeName: "decimal" }], IsArray: true },
        { ElementName: "sensitivity", Type: [{ TypeName: "decimal" }], IsArray: true },
        { ElementName: "fMeasure", Type: [{ TypeName: "decimal" }], IsArray: true },
    ],
};

export const molecularsequence_referenceSeq: TypeModel = {
    TypeName: "molecularsequence_referenceSeq",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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

export const molecularsequence_repository: TypeModel = {
    TypeName: "molecularsequence_repository",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "variantType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "exact", Type: [{ TypeName: "boolean" }] },
        { ElementName: "length", Type: [{ TypeName: "integer" }] },
        { ElementName: "outer", Type: [{ TypeName: "molecularsequence_structureVariant_outer" }] },
        { ElementName: "inner", Type: [{ TypeName: "molecularsequence_structureVariant_inner" }] },
    ],
};

export const molecularsequence_structureVariant_inner: TypeModel = {
    TypeName: "molecularsequence_structureVariant_inner",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "start", Type: [{ TypeName: "integer" }] },
        { ElementName: "end", Type: [{ TypeName: "integer" }] },
    ],
};

export const molecularsequence_structureVariant_outer: TypeModel = {
    TypeName: "molecularsequence_structureVariant_outer",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "start", Type: [{ TypeName: "integer" }] },
        { ElementName: "end", Type: [{ TypeName: "integer" }] },
    ],
};

export const molecularsequence_variant: TypeModel = {
    TypeName: "molecularsequence_variant",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "start", Type: [{ TypeName: "integer" }] },
        { ElementName: "end", Type: [{ TypeName: "integer" }] },
        { ElementName: "observedAllele", Type: [{ TypeName: "string" }] },
        { ElementName: "referenceAllele", Type: [{ TypeName: "string" }] },
        { ElementName: "cigar", Type: [{ TypeName: "string" }] },
        { ElementName: "variantPointer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Observation"] }] },
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
    ],
};

export const nutritionorder_enteralFormula: TypeModel = {
    TypeName: "nutritionorder_enteralFormula",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "schedule", Type: [{ TypeName: "Timing" }] },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "rate[x]", Type: [{ TypeName: "Quantity" }, { TypeName: "Ratio" }] },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifier", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "amount", Type: [{ TypeName: "Quantity" }] },
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
        { ElementName: "foodType", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const nutritionorder_supplement: TypeModel = {
    TypeName: "nutritionorder_supplement",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "productName", Type: [{ TypeName: "string" }] },
        { ElementName: "schedule", Type: [{ TypeName: "Timing" }], IsArray: true },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "instruction", Type: [{ TypeName: "string" }] },
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
        { ElementName: "value[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "SampledData" }, { TypeName: "boolean" }, { TypeName: "dateTime" }, { TypeName: "integer" }, { TypeName: "string" }, { TypeName: "time" }] },
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
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "appliesTo", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "age", Type: [{ TypeName: "Range" }] },
        { ElementName: "text", Type: [{ TypeName: "string" }] },
    ],
};

export const observationdefinition_qualifiedInterval: TypeModel = {
    TypeName: "observationdefinition_qualifiedInterval",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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

export const observationdefinition_quantitativeDetails: TypeModel = {
    TypeName: "observationdefinition_quantitativeDetails",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "customaryUnit", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "unit", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "conversionFactor", Type: [{ TypeName: "decimal" }] },
        { ElementName: "decimalPrecision", Type: [{ TypeName: "integer" }] },
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

export const organization_contact: TypeModel = {
    TypeName: "organization_contact",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "purpose", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "name", Type: [{ TypeName: "HumanName" }] },
        { ElementName: "telecom", Type: [{ TypeName: "ContactPoint" }], IsArray: true },
        { ElementName: "address", Type: [{ TypeName: "Address" }] },
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
        { ElementName: "value[x]", Type: [{ TypeName: "Address" }, { TypeName: "Age" }, { TypeName: "Annotation" }, { TypeName: "Attachment" }, { TypeName: "CodeableConcept" }, { TypeName: "Coding" }, { TypeName: "ContactDetail" }, { TypeName: "ContactPoint" }, { TypeName: "Contributor" }, { TypeName: "Count" }, { TypeName: "DataRequirement" }, { TypeName: "Distance" }, { TypeName: "Dosage" }, { TypeName: "Duration" }, { TypeName: "Expression" }, { TypeName: "HumanName" }, { TypeName: "Identifier" }, { TypeName: "Meta" }, { TypeName: "Money" }, { TypeName: "ParameterDefinition" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "Reference" }, { TypeName: "RelatedArtifact" }, { TypeName: "SampledData" }, { TypeName: "Signature" }, { TypeName: "Timing" }, { TypeName: "TriggerDefinition" }, { TypeName: "UsageContext" }, { TypeName: "base64Binary" }, { TypeName: "boolean" }, { TypeName: "canonical" }, { TypeName: "code" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "id" }, { TypeName: "instant" }, { TypeName: "integer" }, { TypeName: "markdown" }, { TypeName: "oid" }, { TypeName: "positiveInt" }, { TypeName: "string" }, { TypeName: "time" }, { TypeName: "unsignedInt" }, { TypeName: "uri" }, { TypeName: "url" }, { TypeName: "uuid" }] },
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
        { ElementName: "name", Type: [{ TypeName: "HumanName" }] },
        { ElementName: "telecom", Type: [{ TypeName: "ContactPoint" }], IsArray: true },
        { ElementName: "address", Type: [{ TypeName: "Address" }] },
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

export const paymentreconciliation_detail: TypeModel = {
    TypeName: "paymentreconciliation_detail",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "code" }] },
        { ElementName: "text", Type: [{ TypeName: "string" }] },
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

export const plandefinition_action_participant: TypeModel = {
    TypeName: "plandefinition_action_participant",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "role", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const plandefinition_action_relatedAction: TypeModel = {
    TypeName: "plandefinition_action_relatedAction",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "actionId", Type: [{ TypeName: "id" }], Required: true },
        { ElementName: "relationship", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "offset[x]", Type: [{ TypeName: "Duration" }, { TypeName: "Range" }] },
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
        { ElementName: "detail[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Quantity" }, { TypeName: "Range" }] },
        { ElementName: "due", Type: [{ TypeName: "Duration" }] },
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
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "issuer", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
    ],
};

export const practitionerrole_availableTime: TypeModel = {
    TypeName: "practitionerrole_availableTime",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "during", Type: [{ TypeName: "Period" }] },
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
        { ElementName: "actor", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
        { ElementName: "onBehalfOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
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
        { ElementName: "who", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
        { ElementName: "onBehalfOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
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

export const questionnaire_item_answerOption: TypeModel = {
    TypeName: "questionnaire_item_answerOption",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "value[x]", Type: [{ TypeName: "Coding" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }, { TypeName: "date" }, { TypeName: "integer" }, { TypeName: "string" }, { TypeName: "time" }], Required: true },
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
        { ElementName: "answer[x]", Type: [{ TypeName: "Coding" }, { TypeName: "Quantity" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }, { TypeName: "boolean" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "integer" }, { TypeName: "string" }, { TypeName: "time" }], Required: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "value[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "Coding" }, { TypeName: "Quantity" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }, { TypeName: "boolean" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "integer" }, { TypeName: "string" }, { TypeName: "time" }, { TypeName: "uri" }] },
        { ElementName: "item", Type: [{ TypeName: "questionnaireresponse_item" }], IsArray: true },
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

export const requestgroup_action: TypeModel = {
    TypeName: "requestgroup_action",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "kind", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "expression", Type: [{ TypeName: "Expression" }] },
    ],
};

export const requestgroup_action_relatedAction: TypeModel = {
    TypeName: "requestgroup_action_relatedAction",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "actionId", Type: [{ TypeName: "id" }], Required: true },
        { ElementName: "relationship", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "offset[x]", Type: [{ TypeName: "Duration" }, { TypeName: "Range" }] },
    ],
};

export const researchelementdefinition_characteristic: TypeModel = {
    TypeName: "researchelementdefinition_characteristic",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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

export const researchstudy_arm: TypeModel = {
    TypeName: "researchstudy_arm",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "name", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
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
        { ElementName: "probability[x]", Type: [{ TypeName: "Range" }, { TypeName: "decimal" }] },
        { ElementName: "qualitativeRisk", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "relativeRisk", Type: [{ TypeName: "decimal" }] },
        { ElementName: "when[x]", Type: [{ TypeName: "Period" }, { TypeName: "Range" }] },
        { ElementName: "rationale", Type: [{ TypeName: "string" }] },
    ],
};

export const riskevidencesynthesis_certainty: TypeModel = {
    TypeName: "riskevidencesynthesis_certainty",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "rating", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
        { ElementName: "certaintySubcomponent", Type: [{ TypeName: "riskevidencesynthesis_certainty_certaintySubcomponent" }], IsArray: true },
    ],
};

export const riskevidencesynthesis_certainty_certaintySubcomponent: TypeModel = {
    TypeName: "riskevidencesynthesis_certainty_certaintySubcomponent",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "rating", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "note", Type: [{ TypeName: "Annotation" }], IsArray: true },
    ],
};

export const riskevidencesynthesis_riskEstimate: TypeModel = {
    TypeName: "riskevidencesynthesis_riskEstimate",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "level", Type: [{ TypeName: "decimal" }] },
        { ElementName: "from", Type: [{ TypeName: "decimal" }] },
        { ElementName: "to", Type: [{ TypeName: "decimal" }] },
    ],
};

export const riskevidencesynthesis_sampleSize: TypeModel = {
    TypeName: "riskevidencesynthesis_sampleSize",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "numberOfStudies", Type: [{ TypeName: "integer" }] },
        { ElementName: "numberOfParticipants", Type: [{ TypeName: "integer" }] },
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

export const specimen_collection: TypeModel = {
    TypeName: "specimen_collection",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "collector", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "collected[x]", Type: [{ TypeName: "Period" }, { TypeName: "dateTime" }] },
        { ElementName: "duration", Type: [{ TypeName: "Duration" }] },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "method", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "bodySite", Type: [{ TypeName: "CodeableConcept" }] },
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
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "capacity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "specimenQuantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "additive[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Substance"] }] },
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
        { ElementName: "procedure", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "additive", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Substance"] }], IsArray: true },
        { ElementName: "time[x]", Type: [{ TypeName: "Period" }, { TypeName: "dateTime" }] },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "additive[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Substance"] }], Required: true },
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
        { ElementName: "instruction", Type: [{ TypeName: "string" }] },
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

export const structuremap_group: TypeModel = {
    TypeName: "structuremap_group",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "name", Type: [{ TypeName: "id" }], Required: true },
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
        { ElementName: "variable", Type: [{ TypeName: "string" }], IsArray: true, Required: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "value[x]", Type: [{ TypeName: "boolean" }, { TypeName: "decimal" }, { TypeName: "id" }, { TypeName: "integer" }, { TypeName: "string" }], Required: true },
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

export const subscription_channel: TypeModel = {
    TypeName: "subscription_channel",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "endpoint", Type: [{ TypeName: "url" }] },
        { ElementName: "payload", Type: [{ TypeName: "code" }] },
        { ElementName: "header", Type: [{ TypeName: "string" }], IsArray: true },
    ],
};

export const substance_ingredient: TypeModel = {
    TypeName: "substance_ingredient",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "quantity", Type: [{ TypeName: "Ratio" }] },
        { ElementName: "substance[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Substance"] }], Required: true },
    ],
};

export const substance_instance: TypeModel = {
    TypeName: "substance_instance",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "expiry", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
    ],
};

export const substanceamount_referenceRange: TypeModel = {
    TypeName: "substanceamount_referenceRange",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "lowLimit", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "highLimit", Type: [{ TypeName: "Quantity" }] },
    ],
};

export const substancenucleicacid_subunit: TypeModel = {
    TypeName: "substancenucleicacid_subunit",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "residueSite", Type: [{ TypeName: "string" }] },
    ],
};

export const substancepolymer_monomerSet: TypeModel = {
    TypeName: "substancepolymer_monomerSet",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "ratioType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "startingMaterial", Type: [{ TypeName: "substancepolymer_monomerSet_startingMaterial" }], IsArray: true },
    ],
};

export const substancepolymer_monomerSet_startingMaterial: TypeModel = {
    TypeName: "substancepolymer_monomerSet_startingMaterial",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "degree", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "amount", Type: [{ TypeName: "SubstanceAmount" }] },
    ],
};

export const substancepolymer_repeat_repeatUnit_structuralRepresentation: TypeModel = {
    TypeName: "substancepolymer_repeat_repeatUnit_structuralRepresentation",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "representation", Type: [{ TypeName: "string" }] },
        { ElementName: "attachment", Type: [{ TypeName: "Attachment" }] },
    ],
};

export const substanceprotein_subunit: TypeModel = {
    TypeName: "substanceprotein_subunit",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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

export const substancereferenceinformation_classification: TypeModel = {
    TypeName: "substancereferenceinformation_classification",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "domain", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "classification", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "subtype", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "source", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DocumentReference"] }], IsArray: true },
    ],
};

export const substancereferenceinformation_gene: TypeModel = {
    TypeName: "substancereferenceinformation_gene",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "geneSequenceOrigin", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "gene", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "source", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DocumentReference"] }], IsArray: true },
    ],
};

export const substancereferenceinformation_geneElement: TypeModel = {
    TypeName: "substancereferenceinformation_geneElement",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "element", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "source", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DocumentReference"] }], IsArray: true },
    ],
};

export const substancereferenceinformation_target: TypeModel = {
    TypeName: "substancereferenceinformation_target",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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

export const substancesourcematerial_fractionDescription: TypeModel = {
    TypeName: "substancesourcematerial_fractionDescription",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "fraction", Type: [{ TypeName: "string" }] },
        { ElementName: "materialType", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const substancesourcematerial_organism: TypeModel = {
    TypeName: "substancesourcematerial_organism",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "authorType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "authorDescription", Type: [{ TypeName: "string" }] },
    ],
};

export const substancesourcematerial_organism_hybrid: TypeModel = {
    TypeName: "substancesourcematerial_organism_hybrid",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "part", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "partLocation", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const substancespecification_code: TypeModel = {
    TypeName: "substancespecification_code",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "status", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "statusDate", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "comment", Type: [{ TypeName: "string" }] },
        { ElementName: "source", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DocumentReference"] }], IsArray: true },
    ],
};

export const substancespecification_moiety: TypeModel = {
    TypeName: "substancespecification_moiety",
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
    ],
};

export const substancespecification_name: TypeModel = {
    TypeName: "substancespecification_name",
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "authority", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "status", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "date", Type: [{ TypeName: "dateTime" }] },
    ],
};

export const substancespecification_property: TypeModel = {
    TypeName: "substancespecification_property",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "category", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "parameters", Type: [{ TypeName: "string" }] },
        { ElementName: "definingSubstance[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Substance", "http://hl7.org/fhir/StructureDefinition/SubstanceSpecification"] }] },
        { ElementName: "amount[x]", Type: [{ TypeName: "Quantity" }, { TypeName: "string" }] },
    ],
};

export const substancespecification_relationship: TypeModel = {
    TypeName: "substancespecification_relationship",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "substance[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/SubstanceSpecification"] }] },
        { ElementName: "relationship", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "isDefining", Type: [{ TypeName: "boolean" }] },
        { ElementName: "amount[x]", Type: [{ TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "string" }] },
        { ElementName: "amountRatioLowLimit", Type: [{ TypeName: "Ratio" }] },
        { ElementName: "amountType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "source", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/DocumentReference"] }], IsArray: true },
    ],
};

export const substancespecification_structure: TypeModel = {
    TypeName: "substancespecification_structure",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "method", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "amount", Type: [{ TypeName: "Quantity" }] },
    ],
};

export const substancespecification_structure_representation: TypeModel = {
    TypeName: "substancespecification_structure_representation",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "representation", Type: [{ TypeName: "string" }] },
        { ElementName: "attachment", Type: [{ TypeName: "Attachment" }] },
    ],
};

export const supplydelivery_suppliedItem: TypeModel = {
    TypeName: "supplydelivery_suppliedItem",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "quantity", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "item[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Medication", "http://hl7.org/fhir/StructureDefinition/Substance"] }] },
    ],
};

export const supplyrequest_parameter: TypeModel = {
    TypeName: "supplyrequest_parameter",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "value[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "boolean" }] },
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
        { ElementName: "value[x]", Type: [{ TypeName: "Address" }, { TypeName: "Age" }, { TypeName: "Annotation" }, { TypeName: "Attachment" }, { TypeName: "CodeableConcept" }, { TypeName: "Coding" }, { TypeName: "ContactDetail" }, { TypeName: "ContactPoint" }, { TypeName: "Contributor" }, { TypeName: "Count" }, { TypeName: "DataRequirement" }, { TypeName: "Distance" }, { TypeName: "Dosage" }, { TypeName: "Duration" }, { TypeName: "Expression" }, { TypeName: "HumanName" }, { TypeName: "Identifier" }, { TypeName: "Meta" }, { TypeName: "Money" }, { TypeName: "ParameterDefinition" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "Reference" }, { TypeName: "RelatedArtifact" }, { TypeName: "SampledData" }, { TypeName: "Signature" }, { TypeName: "Timing" }, { TypeName: "TriggerDefinition" }, { TypeName: "UsageContext" }, { TypeName: "base64Binary" }, { TypeName: "boolean" }, { TypeName: "canonical" }, { TypeName: "code" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "id" }, { TypeName: "instant" }, { TypeName: "integer" }, { TypeName: "markdown" }, { TypeName: "oid" }, { TypeName: "positiveInt" }, { TypeName: "string" }, { TypeName: "time" }, { TypeName: "unsignedInt" }, { TypeName: "uri" }, { TypeName: "url" }, { TypeName: "uuid" }], Required: true },
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
        { ElementName: "value[x]", Type: [{ TypeName: "Address" }, { TypeName: "Age" }, { TypeName: "Annotation" }, { TypeName: "Attachment" }, { TypeName: "CodeableConcept" }, { TypeName: "Coding" }, { TypeName: "ContactDetail" }, { TypeName: "ContactPoint" }, { TypeName: "Contributor" }, { TypeName: "Count" }, { TypeName: "DataRequirement" }, { TypeName: "Distance" }, { TypeName: "Dosage" }, { TypeName: "Duration" }, { TypeName: "Expression" }, { TypeName: "HumanName" }, { TypeName: "Identifier" }, { TypeName: "Meta" }, { TypeName: "Money" }, { TypeName: "ParameterDefinition" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "Reference" }, { TypeName: "RelatedArtifact" }, { TypeName: "SampledData" }, { TypeName: "Signature" }, { TypeName: "Timing" }, { TypeName: "TriggerDefinition" }, { TypeName: "UsageContext" }, { TypeName: "base64Binary" }, { TypeName: "boolean" }, { TypeName: "canonical" }, { TypeName: "code" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "id" }, { TypeName: "instant" }, { TypeName: "integer" }, { TypeName: "markdown" }, { TypeName: "oid" }, { TypeName: "positiveInt" }, { TypeName: "string" }, { TypeName: "time" }, { TypeName: "unsignedInt" }, { TypeName: "uri" }, { TypeName: "url" }, { TypeName: "uuid" }], Required: true },
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
        { ElementName: "recipient", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], IsArray: true },
    ],
};

export const terminologycapabilities_closure: TypeModel = {
    TypeName: "terminologycapabilities_closure",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "translation", Type: [{ TypeName: "boolean" }] },
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
        { ElementName: "version", Type: [{ TypeName: "terminologycapabilities_codeSystem_version" }], IsArray: true },
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
        { ElementName: "documentation", Type: [{ TypeName: "string" }] },
    ],
};

export const terminologycapabilities_implementation: TypeModel = {
    TypeName: "terminologycapabilities_implementation",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "string" }], Required: true },
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

export const testreport_participant: TypeModel = {
    TypeName: "testreport_participant",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "uri", Type: [{ TypeName: "uri" }], Required: true },
        { ElementName: "display", Type: [{ TypeName: "string" }] },
    ],
};

export const testreport_setup: TypeModel = {
    TypeName: "testreport_setup",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "action", Type: [{ TypeName: "testreport_setup_action" }], IsArray: true, Required: true },
    ],
};

export const testreport_setup_action: TypeModel = {
    TypeName: "testreport_setup_action",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "operation", Type: [{ TypeName: "testreport_setup_action_operation" }] },
        { ElementName: "assert", Type: [{ TypeName: "testreport_setup_action_assert" }] },
    ],
};

export const testreport_setup_action_assert: TypeModel = {
    TypeName: "testreport_setup_action_assert",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "result", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "message", Type: [{ TypeName: "markdown" }] },
        { ElementName: "detail", Type: [{ TypeName: "string" }] },
    ],
};

export const testreport_setup_action_operation: TypeModel = {
    TypeName: "testreport_setup_action_operation",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "result", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "message", Type: [{ TypeName: "markdown" }] },
        { ElementName: "detail", Type: [{ TypeName: "uri" }] },
    ],
};

export const testreport_teardown: TypeModel = {
    TypeName: "testreport_teardown",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "action", Type: [{ TypeName: "testreport_teardown_action" }], IsArray: true, Required: true },
    ],
};

export const testreport_teardown_action: TypeModel = {
    TypeName: "testreport_teardown_action",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "operation", Type: [{ TypeName: "testreport_setup_action_operation" }], Required: true },
    ],
};

export const testreport_test: TypeModel = {
    TypeName: "testreport_test",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "action", Type: [{ TypeName: "testreport_test_action" }], IsArray: true, Required: true },
    ],
};

export const testreport_test_action: TypeModel = {
    TypeName: "testreport_test_action",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "operation", Type: [{ TypeName: "testreport_setup_action_operation" }] },
        { ElementName: "assert", Type: [{ TypeName: "testreport_setup_action_assert" }] },
    ],
};

export const testscript_destination: TypeModel = {
    TypeName: "testscript_destination",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "index", Type: [{ TypeName: "integer" }], Required: true },
        { ElementName: "profile", Type: [{ TypeName: "Coding" }], Required: true },
    ],
};

export const testscript_fixture: TypeModel = {
    TypeName: "testscript_fixture",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "autocreate", Type: [{ TypeName: "boolean" }], Required: true },
        { ElementName: "autodelete", Type: [{ TypeName: "boolean" }], Required: true },
        { ElementName: "resource", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
    ],
};

export const testscript_metadata: TypeModel = {
    TypeName: "testscript_metadata",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "link", Type: [{ TypeName: "testscript_metadata_link" }], IsArray: true },
        { ElementName: "capability", Type: [{ TypeName: "testscript_metadata_capability" }], IsArray: true, Required: true },
    ],
};

export const testscript_metadata_capability: TypeModel = {
    TypeName: "testscript_metadata_capability",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "required", Type: [{ TypeName: "boolean" }], Required: true },
        { ElementName: "validated", Type: [{ TypeName: "boolean" }], Required: true },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "origin", Type: [{ TypeName: "integer" }], IsArray: true },
        { ElementName: "destination", Type: [{ TypeName: "integer" }] },
        { ElementName: "link", Type: [{ TypeName: "uri" }], IsArray: true },
        { ElementName: "capabilities", Type: [{ TypeName: "canonical" }], Required: true },
    ],
};

export const testscript_metadata_link: TypeModel = {
    TypeName: "testscript_metadata_link",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "url", Type: [{ TypeName: "uri" }], Required: true },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
    ],
};

export const testscript_origin: TypeModel = {
    TypeName: "testscript_origin",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "index", Type: [{ TypeName: "integer" }], Required: true },
        { ElementName: "profile", Type: [{ TypeName: "Coding" }], Required: true },
    ],
};

export const testscript_setup: TypeModel = {
    TypeName: "testscript_setup",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "action", Type: [{ TypeName: "testscript_setup_action" }], IsArray: true, Required: true },
    ],
};

export const testscript_setup_action: TypeModel = {
    TypeName: "testscript_setup_action",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "operation", Type: [{ TypeName: "testscript_setup_action_operation" }] },
        { ElementName: "assert", Type: [{ TypeName: "testscript_setup_action_assert" }] },
    ],
};

export const testscript_setup_action_assert: TypeModel = {
    TypeName: "testscript_setup_action_assert",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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

export const testscript_setup_action_operation: TypeModel = {
    TypeName: "testscript_setup_action_operation",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "field", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "value", Type: [{ TypeName: "string" }], Required: true },
    ],
};

export const testscript_teardown: TypeModel = {
    TypeName: "testscript_teardown",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "action", Type: [{ TypeName: "testscript_teardown_action" }], IsArray: true, Required: true },
    ],
};

export const testscript_teardown_action: TypeModel = {
    TypeName: "testscript_teardown_action",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "operation", Type: [{ TypeName: "testscript_setup_action_operation" }], Required: true },
    ],
};

export const testscript_test: TypeModel = {
    TypeName: "testscript_test",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "action", Type: [{ TypeName: "testscript_test_action" }], IsArray: true, Required: true },
    ],
};

export const testscript_test_action: TypeModel = {
    TypeName: "testscript_test_action",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "operation", Type: [{ TypeName: "testscript_setup_action_operation" }] },
        { ElementName: "assert", Type: [{ TypeName: "testscript_setup_action_assert" }] },
    ],
};

export const testscript_variable: TypeModel = {
    TypeName: "testscript_variable",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "timestamp", Type: [{ TypeName: "dateTime" }], Required: true },
        { ElementName: "total", Type: [{ TypeName: "integer" }] },
        { ElementName: "offset", Type: [{ TypeName: "integer" }] },
        { ElementName: "parameter", Type: [{ TypeName: "valueset_expansion_parameter" }], IsArray: true },
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
        { ElementName: "contains", Type: [{ TypeName: "valueset_expansion_contains" }], IsArray: true },
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

export const verificationresult_attestation: TypeModel = {
    TypeName: "verificationresult_attestation",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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

export const verificationresult_primarySource: TypeModel = {
    TypeName: "verificationresult_primarySource",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "who", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole"] }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "communicationMethod", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "validationStatus", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "validationDate", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "canPushUpdates", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "pushTypeAvailable", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
    ],
};

export const verificationresult_validator: TypeModel = {
    TypeName: "verificationresult_validator",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "organization", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }], Required: true },
        { ElementName: "identityCertificate", Type: [{ TypeName: "string" }] },
        { ElementName: "attestationSignature", Type: [{ TypeName: "Signature" }] },
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
    "http://fhir.forms-lab.com/custom-model/r4/account_coverage": account_coverage,
    "http://fhir.forms-lab.com/custom-model/r4/account_guarantor": account_guarantor,
    "http://fhir.forms-lab.com/custom-model/r4/activitydefinition_dynamicValue": activitydefinition_dynamicValue,
    "http://fhir.forms-lab.com/custom-model/r4/activitydefinition_participant": activitydefinition_participant,
    "http://fhir.forms-lab.com/custom-model/r4/adverseevent_suspectEntity": adverseevent_suspectEntity,
    "http://fhir.forms-lab.com/custom-model/r4/adverseevent_suspectEntity_causality": adverseevent_suspectEntity_causality,
    "http://fhir.forms-lab.com/custom-model/r4/allergyintolerance_reaction": allergyintolerance_reaction,
    "http://fhir.forms-lab.com/custom-model/r4/appointment_participant": appointment_participant,
    "http://fhir.forms-lab.com/custom-model/r4/auditevent_agent": auditevent_agent,
    "http://fhir.forms-lab.com/custom-model/r4/auditevent_agent_network": auditevent_agent_network,
    "http://fhir.forms-lab.com/custom-model/r4/auditevent_entity": auditevent_entity,
    "http://fhir.forms-lab.com/custom-model/r4/auditevent_entity_detail": auditevent_entity_detail,
    "http://fhir.forms-lab.com/custom-model/r4/auditevent_source": auditevent_source,
    "http://fhir.forms-lab.com/custom-model/r4/biologicallyderivedproduct_collection": biologicallyderivedproduct_collection,
    "http://fhir.forms-lab.com/custom-model/r4/biologicallyderivedproduct_manipulation": biologicallyderivedproduct_manipulation,
    "http://fhir.forms-lab.com/custom-model/r4/biologicallyderivedproduct_processing": biologicallyderivedproduct_processing,
    "http://fhir.forms-lab.com/custom-model/r4/biologicallyderivedproduct_storage": biologicallyderivedproduct_storage,
    "http://fhir.forms-lab.com/custom-model/r4/bundle_entry": bundle_entry,
    "http://fhir.forms-lab.com/custom-model/r4/bundle_entry_request": bundle_entry_request,
    "http://fhir.forms-lab.com/custom-model/r4/bundle_entry_response": bundle_entry_response,
    "http://fhir.forms-lab.com/custom-model/r4/bundle_entry_search": bundle_entry_search,
    "http://fhir.forms-lab.com/custom-model/r4/bundle_link": bundle_link,
    "http://fhir.forms-lab.com/custom-model/r4/capabilitystatement_document": capabilitystatement_document,
    "http://fhir.forms-lab.com/custom-model/r4/capabilitystatement_implementation": capabilitystatement_implementation,
    "http://fhir.forms-lab.com/custom-model/r4/capabilitystatement_messaging": capabilitystatement_messaging,
    "http://fhir.forms-lab.com/custom-model/r4/capabilitystatement_messaging_endpoint": capabilitystatement_messaging_endpoint,
    "http://fhir.forms-lab.com/custom-model/r4/capabilitystatement_messaging_supportedMessage": capabilitystatement_messaging_supportedMessage,
    "http://fhir.forms-lab.com/custom-model/r4/capabilitystatement_rest": capabilitystatement_rest,
    "http://fhir.forms-lab.com/custom-model/r4/capabilitystatement_rest_interaction": capabilitystatement_rest_interaction,
    "http://fhir.forms-lab.com/custom-model/r4/capabilitystatement_rest_resource": capabilitystatement_rest_resource,
    "http://fhir.forms-lab.com/custom-model/r4/capabilitystatement_rest_resource_interaction": capabilitystatement_rest_resource_interaction,
    "http://fhir.forms-lab.com/custom-model/r4/capabilitystatement_rest_resource_operation": capabilitystatement_rest_resource_operation,
    "http://fhir.forms-lab.com/custom-model/r4/capabilitystatement_rest_resource_searchParam": capabilitystatement_rest_resource_searchParam,
    "http://fhir.forms-lab.com/custom-model/r4/capabilitystatement_rest_security": capabilitystatement_rest_security,
    "http://fhir.forms-lab.com/custom-model/r4/capabilitystatement_software": capabilitystatement_software,
    "http://fhir.forms-lab.com/custom-model/r4/careplan_activity": careplan_activity,
    "http://fhir.forms-lab.com/custom-model/r4/careplan_activity_detail": careplan_activity_detail,
    "http://fhir.forms-lab.com/custom-model/r4/careteam_participant": careteam_participant,
    "http://fhir.forms-lab.com/custom-model/r4/catalogentry_relatedEntry": catalogentry_relatedEntry,
    "http://fhir.forms-lab.com/custom-model/r4/chargeitem_performer": chargeitem_performer,
    "http://fhir.forms-lab.com/custom-model/r4/chargeitemdefinition_applicability": chargeitemdefinition_applicability,
    "http://fhir.forms-lab.com/custom-model/r4/chargeitemdefinition_propertyGroup": chargeitemdefinition_propertyGroup,
    "http://fhir.forms-lab.com/custom-model/r4/chargeitemdefinition_propertyGroup_priceComponent": chargeitemdefinition_propertyGroup_priceComponent,
    "http://fhir.forms-lab.com/custom-model/r4/claim_accident": claim_accident,
    "http://fhir.forms-lab.com/custom-model/r4/claim_careTeam": claim_careTeam,
    "http://fhir.forms-lab.com/custom-model/r4/claim_diagnosis": claim_diagnosis,
    "http://fhir.forms-lab.com/custom-model/r4/claim_insurance": claim_insurance,
    "http://fhir.forms-lab.com/custom-model/r4/claim_item": claim_item,
    "http://fhir.forms-lab.com/custom-model/r4/claim_item_detail": claim_item_detail,
    "http://fhir.forms-lab.com/custom-model/r4/claim_item_detail_subDetail": claim_item_detail_subDetail,
    "http://fhir.forms-lab.com/custom-model/r4/claim_payee": claim_payee,
    "http://fhir.forms-lab.com/custom-model/r4/claim_procedure": claim_procedure,
    "http://fhir.forms-lab.com/custom-model/r4/claim_related": claim_related,
    "http://fhir.forms-lab.com/custom-model/r4/claim_supportingInfo": claim_supportingInfo,
    "http://fhir.forms-lab.com/custom-model/r4/claimresponse_addItem": claimresponse_addItem,
    "http://fhir.forms-lab.com/custom-model/r4/claimresponse_addItem_detail": claimresponse_addItem_detail,
    "http://fhir.forms-lab.com/custom-model/r4/claimresponse_addItem_detail_subDetail": claimresponse_addItem_detail_subDetail,
    "http://fhir.forms-lab.com/custom-model/r4/claimresponse_error": claimresponse_error,
    "http://fhir.forms-lab.com/custom-model/r4/claimresponse_insurance": claimresponse_insurance,
    "http://fhir.forms-lab.com/custom-model/r4/claimresponse_item": claimresponse_item,
    "http://fhir.forms-lab.com/custom-model/r4/claimresponse_item_adjudication": claimresponse_item_adjudication,
    "http://fhir.forms-lab.com/custom-model/r4/claimresponse_item_detail": claimresponse_item_detail,
    "http://fhir.forms-lab.com/custom-model/r4/claimresponse_item_detail_subDetail": claimresponse_item_detail_subDetail,
    "http://fhir.forms-lab.com/custom-model/r4/claimresponse_payment": claimresponse_payment,
    "http://fhir.forms-lab.com/custom-model/r4/claimresponse_processNote": claimresponse_processNote,
    "http://fhir.forms-lab.com/custom-model/r4/claimresponse_total": claimresponse_total,
    "http://fhir.forms-lab.com/custom-model/r4/clinicalimpression_finding": clinicalimpression_finding,
    "http://fhir.forms-lab.com/custom-model/r4/clinicalimpression_investigation": clinicalimpression_investigation,
    "http://fhir.forms-lab.com/custom-model/r4/codesystem_concept": codesystem_concept,
    "http://fhir.forms-lab.com/custom-model/r4/codesystem_concept_designation": codesystem_concept_designation,
    "http://fhir.forms-lab.com/custom-model/r4/codesystem_concept_property": codesystem_concept_property,
    "http://fhir.forms-lab.com/custom-model/r4/codesystem_filter": codesystem_filter,
    "http://fhir.forms-lab.com/custom-model/r4/codesystem_property": codesystem_property,
    "http://fhir.forms-lab.com/custom-model/r4/communication_payload": communication_payload,
    "http://fhir.forms-lab.com/custom-model/r4/communicationrequest_payload": communicationrequest_payload,
    "http://fhir.forms-lab.com/custom-model/r4/compartmentdefinition_resource": compartmentdefinition_resource,
    "http://fhir.forms-lab.com/custom-model/r4/composition_attester": composition_attester,
    "http://fhir.forms-lab.com/custom-model/r4/composition_event": composition_event,
    "http://fhir.forms-lab.com/custom-model/r4/composition_relatesTo": composition_relatesTo,
    "http://fhir.forms-lab.com/custom-model/r4/composition_section": composition_section,
    "http://fhir.forms-lab.com/custom-model/r4/conceptmap_group": conceptmap_group,
    "http://fhir.forms-lab.com/custom-model/r4/conceptmap_group_element": conceptmap_group_element,
    "http://fhir.forms-lab.com/custom-model/r4/conceptmap_group_element_target": conceptmap_group_element_target,
    "http://fhir.forms-lab.com/custom-model/r4/conceptmap_group_element_target_dependsOn": conceptmap_group_element_target_dependsOn,
    "http://fhir.forms-lab.com/custom-model/r4/conceptmap_group_unmapped": conceptmap_group_unmapped,
    "http://fhir.forms-lab.com/custom-model/r4/condition_evidence": condition_evidence,
    "http://fhir.forms-lab.com/custom-model/r4/condition_stage": condition_stage,
    "http://fhir.forms-lab.com/custom-model/r4/consent_policy": consent_policy,
    "http://fhir.forms-lab.com/custom-model/r4/consent_provision": consent_provision,
    "http://fhir.forms-lab.com/custom-model/r4/consent_provision_actor": consent_provision_actor,
    "http://fhir.forms-lab.com/custom-model/r4/consent_provision_data": consent_provision_data,
    "http://fhir.forms-lab.com/custom-model/r4/consent_verification": consent_verification,
    "http://fhir.forms-lab.com/custom-model/r4/contract_contentDefinition": contract_contentDefinition,
    "http://fhir.forms-lab.com/custom-model/r4/contract_friendly": contract_friendly,
    "http://fhir.forms-lab.com/custom-model/r4/contract_legal": contract_legal,
    "http://fhir.forms-lab.com/custom-model/r4/contract_rule": contract_rule,
    "http://fhir.forms-lab.com/custom-model/r4/contract_signer": contract_signer,
    "http://fhir.forms-lab.com/custom-model/r4/contract_term": contract_term,
    "http://fhir.forms-lab.com/custom-model/r4/contract_term_action": contract_term_action,
    "http://fhir.forms-lab.com/custom-model/r4/contract_term_action_subject": contract_term_action_subject,
    "http://fhir.forms-lab.com/custom-model/r4/contract_term_asset": contract_term_asset,
    "http://fhir.forms-lab.com/custom-model/r4/contract_term_asset_context": contract_term_asset_context,
    "http://fhir.forms-lab.com/custom-model/r4/contract_term_asset_valuedItem": contract_term_asset_valuedItem,
    "http://fhir.forms-lab.com/custom-model/r4/contract_term_offer": contract_term_offer,
    "http://fhir.forms-lab.com/custom-model/r4/contract_term_offer_answer": contract_term_offer_answer,
    "http://fhir.forms-lab.com/custom-model/r4/contract_term_offer_party": contract_term_offer_party,
    "http://fhir.forms-lab.com/custom-model/r4/contract_term_securityLabel": contract_term_securityLabel,
    "http://fhir.forms-lab.com/custom-model/r4/coverage_class": coverage_class,
    "http://fhir.forms-lab.com/custom-model/r4/coverage_costToBeneficiary": coverage_costToBeneficiary,
    "http://fhir.forms-lab.com/custom-model/r4/coverage_costToBeneficiary_exception": coverage_costToBeneficiary_exception,
    "http://fhir.forms-lab.com/custom-model/r4/coverageeligibilityrequest_insurance": coverageeligibilityrequest_insurance,
    "http://fhir.forms-lab.com/custom-model/r4/coverageeligibilityrequest_item": coverageeligibilityrequest_item,
    "http://fhir.forms-lab.com/custom-model/r4/coverageeligibilityrequest_item_diagnosis": coverageeligibilityrequest_item_diagnosis,
    "http://fhir.forms-lab.com/custom-model/r4/coverageeligibilityrequest_supportingInfo": coverageeligibilityrequest_supportingInfo,
    "http://fhir.forms-lab.com/custom-model/r4/coverageeligibilityresponse_error": coverageeligibilityresponse_error,
    "http://fhir.forms-lab.com/custom-model/r4/coverageeligibilityresponse_insurance": coverageeligibilityresponse_insurance,
    "http://fhir.forms-lab.com/custom-model/r4/coverageeligibilityresponse_insurance_item": coverageeligibilityresponse_insurance_item,
    "http://fhir.forms-lab.com/custom-model/r4/coverageeligibilityresponse_insurance_item_benefit": coverageeligibilityresponse_insurance_item_benefit,
    "http://fhir.forms-lab.com/custom-model/r4/datarequirement_codeFilter": datarequirement_codeFilter,
    "http://fhir.forms-lab.com/custom-model/r4/datarequirement_dateFilter": datarequirement_dateFilter,
    "http://fhir.forms-lab.com/custom-model/r4/datarequirement_sort": datarequirement_sort,
    "http://fhir.forms-lab.com/custom-model/r4/detectedissue_evidence": detectedissue_evidence,
    "http://fhir.forms-lab.com/custom-model/r4/detectedissue_mitigation": detectedissue_mitigation,
    "http://fhir.forms-lab.com/custom-model/r4/device_deviceName": device_deviceName,
    "http://fhir.forms-lab.com/custom-model/r4/device_property": device_property,
    "http://fhir.forms-lab.com/custom-model/r4/device_specialization": device_specialization,
    "http://fhir.forms-lab.com/custom-model/r4/device_udiCarrier": device_udiCarrier,
    "http://fhir.forms-lab.com/custom-model/r4/device_version": device_version,
    "http://fhir.forms-lab.com/custom-model/r4/devicedefinition_capability": devicedefinition_capability,
    "http://fhir.forms-lab.com/custom-model/r4/devicedefinition_deviceName": devicedefinition_deviceName,
    "http://fhir.forms-lab.com/custom-model/r4/devicedefinition_material": devicedefinition_material,
    "http://fhir.forms-lab.com/custom-model/r4/devicedefinition_property": devicedefinition_property,
    "http://fhir.forms-lab.com/custom-model/r4/devicedefinition_specialization": devicedefinition_specialization,
    "http://fhir.forms-lab.com/custom-model/r4/devicedefinition_udiDeviceIdentifier": devicedefinition_udiDeviceIdentifier,
    "http://fhir.forms-lab.com/custom-model/r4/devicemetric_calibration": devicemetric_calibration,
    "http://fhir.forms-lab.com/custom-model/r4/devicerequest_parameter": devicerequest_parameter,
    "http://fhir.forms-lab.com/custom-model/r4/diagnosticreport_media": diagnosticreport_media,
    "http://fhir.forms-lab.com/custom-model/r4/documentmanifest_related": documentmanifest_related,
    "http://fhir.forms-lab.com/custom-model/r4/documentreference_content": documentreference_content,
    "http://fhir.forms-lab.com/custom-model/r4/documentreference_context": documentreference_context,
    "http://fhir.forms-lab.com/custom-model/r4/documentreference_relatesTo": documentreference_relatesTo,
    "http://fhir.forms-lab.com/custom-model/r4/dosage_doseAndRate": dosage_doseAndRate,
    "http://fhir.forms-lab.com/custom-model/r4/effectevidencesynthesis_certainty": effectevidencesynthesis_certainty,
    "http://fhir.forms-lab.com/custom-model/r4/effectevidencesynthesis_certainty_certaintySubcomponent": effectevidencesynthesis_certainty_certaintySubcomponent,
    "http://fhir.forms-lab.com/custom-model/r4/effectevidencesynthesis_effectEstimate": effectevidencesynthesis_effectEstimate,
    "http://fhir.forms-lab.com/custom-model/r4/effectevidencesynthesis_effectEstimate_precisionEstimate": effectevidencesynthesis_effectEstimate_precisionEstimate,
    "http://fhir.forms-lab.com/custom-model/r4/effectevidencesynthesis_resultsByExposure": effectevidencesynthesis_resultsByExposure,
    "http://fhir.forms-lab.com/custom-model/r4/effectevidencesynthesis_sampleSize": effectevidencesynthesis_sampleSize,
    "http://fhir.forms-lab.com/custom-model/r4/elementdefinition_base": elementdefinition_base,
    "http://fhir.forms-lab.com/custom-model/r4/elementdefinition_binding": elementdefinition_binding,
    "http://fhir.forms-lab.com/custom-model/r4/elementdefinition_constraint": elementdefinition_constraint,
    "http://fhir.forms-lab.com/custom-model/r4/elementdefinition_example": elementdefinition_example,
    "http://fhir.forms-lab.com/custom-model/r4/elementdefinition_mapping": elementdefinition_mapping,
    "http://fhir.forms-lab.com/custom-model/r4/elementdefinition_slicing": elementdefinition_slicing,
    "http://fhir.forms-lab.com/custom-model/r4/elementdefinition_slicing_discriminator": elementdefinition_slicing_discriminator,
    "http://fhir.forms-lab.com/custom-model/r4/elementdefinition_type": elementdefinition_type,
    "http://fhir.forms-lab.com/custom-model/r4/encounter_classHistory": encounter_classHistory,
    "http://fhir.forms-lab.com/custom-model/r4/encounter_diagnosis": encounter_diagnosis,
    "http://fhir.forms-lab.com/custom-model/r4/encounter_hospitalization": encounter_hospitalization,
    "http://fhir.forms-lab.com/custom-model/r4/encounter_location": encounter_location,
    "http://fhir.forms-lab.com/custom-model/r4/encounter_participant": encounter_participant,
    "http://fhir.forms-lab.com/custom-model/r4/encounter_statusHistory": encounter_statusHistory,
    "http://fhir.forms-lab.com/custom-model/r4/episodeofcare_diagnosis": episodeofcare_diagnosis,
    "http://fhir.forms-lab.com/custom-model/r4/episodeofcare_statusHistory": episodeofcare_statusHistory,
    "http://fhir.forms-lab.com/custom-model/r4/evidencevariable_characteristic": evidencevariable_characteristic,
    "http://fhir.forms-lab.com/custom-model/r4/examplescenario_actor": examplescenario_actor,
    "http://fhir.forms-lab.com/custom-model/r4/examplescenario_instance": examplescenario_instance,
    "http://fhir.forms-lab.com/custom-model/r4/examplescenario_instance_containedInstance": examplescenario_instance_containedInstance,
    "http://fhir.forms-lab.com/custom-model/r4/examplescenario_instance_version": examplescenario_instance_version,
    "http://fhir.forms-lab.com/custom-model/r4/examplescenario_process": examplescenario_process,
    "http://fhir.forms-lab.com/custom-model/r4/examplescenario_process_step": examplescenario_process_step,
    "http://fhir.forms-lab.com/custom-model/r4/examplescenario_process_step_alternative": examplescenario_process_step_alternative,
    "http://fhir.forms-lab.com/custom-model/r4/examplescenario_process_step_operation": examplescenario_process_step_operation,
    "http://fhir.forms-lab.com/custom-model/r4/explanationofbenefit_accident": explanationofbenefit_accident,
    "http://fhir.forms-lab.com/custom-model/r4/explanationofbenefit_addItem": explanationofbenefit_addItem,
    "http://fhir.forms-lab.com/custom-model/r4/explanationofbenefit_addItem_detail": explanationofbenefit_addItem_detail,
    "http://fhir.forms-lab.com/custom-model/r4/explanationofbenefit_addItem_detail_subDetail": explanationofbenefit_addItem_detail_subDetail,
    "http://fhir.forms-lab.com/custom-model/r4/explanationofbenefit_benefitBalance": explanationofbenefit_benefitBalance,
    "http://fhir.forms-lab.com/custom-model/r4/explanationofbenefit_benefitBalance_financial": explanationofbenefit_benefitBalance_financial,
    "http://fhir.forms-lab.com/custom-model/r4/explanationofbenefit_careTeam": explanationofbenefit_careTeam,
    "http://fhir.forms-lab.com/custom-model/r4/explanationofbenefit_diagnosis": explanationofbenefit_diagnosis,
    "http://fhir.forms-lab.com/custom-model/r4/explanationofbenefit_insurance": explanationofbenefit_insurance,
    "http://fhir.forms-lab.com/custom-model/r4/explanationofbenefit_item": explanationofbenefit_item,
    "http://fhir.forms-lab.com/custom-model/r4/explanationofbenefit_item_adjudication": explanationofbenefit_item_adjudication,
    "http://fhir.forms-lab.com/custom-model/r4/explanationofbenefit_item_detail": explanationofbenefit_item_detail,
    "http://fhir.forms-lab.com/custom-model/r4/explanationofbenefit_item_detail_subDetail": explanationofbenefit_item_detail_subDetail,
    "http://fhir.forms-lab.com/custom-model/r4/explanationofbenefit_payee": explanationofbenefit_payee,
    "http://fhir.forms-lab.com/custom-model/r4/explanationofbenefit_payment": explanationofbenefit_payment,
    "http://fhir.forms-lab.com/custom-model/r4/explanationofbenefit_procedure": explanationofbenefit_procedure,
    "http://fhir.forms-lab.com/custom-model/r4/explanationofbenefit_processNote": explanationofbenefit_processNote,
    "http://fhir.forms-lab.com/custom-model/r4/explanationofbenefit_related": explanationofbenefit_related,
    "http://fhir.forms-lab.com/custom-model/r4/explanationofbenefit_supportingInfo": explanationofbenefit_supportingInfo,
    "http://fhir.forms-lab.com/custom-model/r4/explanationofbenefit_total": explanationofbenefit_total,
    "http://fhir.forms-lab.com/custom-model/r4/familymemberhistory_condition": familymemberhistory_condition,
    "http://fhir.forms-lab.com/custom-model/r4/goal_target": goal_target,
    "http://fhir.forms-lab.com/custom-model/r4/graphdefinition_link": graphdefinition_link,
    "http://fhir.forms-lab.com/custom-model/r4/graphdefinition_link_target": graphdefinition_link_target,
    "http://fhir.forms-lab.com/custom-model/r4/graphdefinition_link_target_compartment": graphdefinition_link_target_compartment,
    "http://fhir.forms-lab.com/custom-model/r4/group_characteristic": group_characteristic,
    "http://fhir.forms-lab.com/custom-model/r4/group_member": group_member,
    "http://fhir.forms-lab.com/custom-model/r4/healthcareservice_availableTime": healthcareservice_availableTime,
    "http://fhir.forms-lab.com/custom-model/r4/healthcareservice_eligibility": healthcareservice_eligibility,
    "http://fhir.forms-lab.com/custom-model/r4/healthcareservice_notAvailable": healthcareservice_notAvailable,
    "http://fhir.forms-lab.com/custom-model/r4/imagingstudy_series": imagingstudy_series,
    "http://fhir.forms-lab.com/custom-model/r4/imagingstudy_series_instance": imagingstudy_series_instance,
    "http://fhir.forms-lab.com/custom-model/r4/imagingstudy_series_performer": imagingstudy_series_performer,
    "http://fhir.forms-lab.com/custom-model/r4/immunization_education": immunization_education,
    "http://fhir.forms-lab.com/custom-model/r4/immunization_performer": immunization_performer,
    "http://fhir.forms-lab.com/custom-model/r4/immunization_protocolApplied": immunization_protocolApplied,
    "http://fhir.forms-lab.com/custom-model/r4/immunization_reaction": immunization_reaction,
    "http://fhir.forms-lab.com/custom-model/r4/immunizationrecommendation_recommendation": immunizationrecommendation_recommendation,
    "http://fhir.forms-lab.com/custom-model/r4/immunizationrecommendation_recommendation_dateCriterion": immunizationrecommendation_recommendation_dateCriterion,
    "http://fhir.forms-lab.com/custom-model/r4/implementationguide_definition": implementationguide_definition,
    "http://fhir.forms-lab.com/custom-model/r4/implementationguide_definition_grouping": implementationguide_definition_grouping,
    "http://fhir.forms-lab.com/custom-model/r4/implementationguide_definition_page": implementationguide_definition_page,
    "http://fhir.forms-lab.com/custom-model/r4/implementationguide_definition_parameter": implementationguide_definition_parameter,
    "http://fhir.forms-lab.com/custom-model/r4/implementationguide_definition_resource": implementationguide_definition_resource,
    "http://fhir.forms-lab.com/custom-model/r4/implementationguide_definition_template": implementationguide_definition_template,
    "http://fhir.forms-lab.com/custom-model/r4/implementationguide_dependsOn": implementationguide_dependsOn,
    "http://fhir.forms-lab.com/custom-model/r4/implementationguide_global": implementationguide_global,
    "http://fhir.forms-lab.com/custom-model/r4/implementationguide_manifest": implementationguide_manifest,
    "http://fhir.forms-lab.com/custom-model/r4/implementationguide_manifest_page": implementationguide_manifest_page,
    "http://fhir.forms-lab.com/custom-model/r4/implementationguide_manifest_resource": implementationguide_manifest_resource,
    "http://fhir.forms-lab.com/custom-model/r4/insuranceplan_contact": insuranceplan_contact,
    "http://fhir.forms-lab.com/custom-model/r4/insuranceplan_coverage": insuranceplan_coverage,
    "http://fhir.forms-lab.com/custom-model/r4/insuranceplan_coverage_benefit": insuranceplan_coverage_benefit,
    "http://fhir.forms-lab.com/custom-model/r4/insuranceplan_coverage_benefit_limit": insuranceplan_coverage_benefit_limit,
    "http://fhir.forms-lab.com/custom-model/r4/insuranceplan_plan": insuranceplan_plan,
    "http://fhir.forms-lab.com/custom-model/r4/insuranceplan_plan_generalCost": insuranceplan_plan_generalCost,
    "http://fhir.forms-lab.com/custom-model/r4/insuranceplan_plan_specificCost": insuranceplan_plan_specificCost,
    "http://fhir.forms-lab.com/custom-model/r4/insuranceplan_plan_specificCost_benefit": insuranceplan_plan_specificCost_benefit,
    "http://fhir.forms-lab.com/custom-model/r4/insuranceplan_plan_specificCost_benefit_cost": insuranceplan_plan_specificCost_benefit_cost,
    "http://fhir.forms-lab.com/custom-model/r4/invoice_lineItem": invoice_lineItem,
    "http://fhir.forms-lab.com/custom-model/r4/invoice_lineItem_priceComponent": invoice_lineItem_priceComponent,
    "http://fhir.forms-lab.com/custom-model/r4/invoice_participant": invoice_participant,
    "http://fhir.forms-lab.com/custom-model/r4/linkage_item": linkage_item,
    "http://fhir.forms-lab.com/custom-model/r4/list_entry": list_entry,
    "http://fhir.forms-lab.com/custom-model/r4/location_hoursOfOperation": location_hoursOfOperation,
    "http://fhir.forms-lab.com/custom-model/r4/location_position": location_position,
    "http://fhir.forms-lab.com/custom-model/r4/measure_group": measure_group,
    "http://fhir.forms-lab.com/custom-model/r4/measure_group_population": measure_group_population,
    "http://fhir.forms-lab.com/custom-model/r4/measure_group_stratifier": measure_group_stratifier,
    "http://fhir.forms-lab.com/custom-model/r4/measure_group_stratifier_component": measure_group_stratifier_component,
    "http://fhir.forms-lab.com/custom-model/r4/measure_supplementalData": measure_supplementalData,
    "http://fhir.forms-lab.com/custom-model/r4/measurereport_group": measurereport_group,
    "http://fhir.forms-lab.com/custom-model/r4/measurereport_group_population": measurereport_group_population,
    "http://fhir.forms-lab.com/custom-model/r4/measurereport_group_stratifier": measurereport_group_stratifier,
    "http://fhir.forms-lab.com/custom-model/r4/measurereport_group_stratifier_stratum": measurereport_group_stratifier_stratum,
    "http://fhir.forms-lab.com/custom-model/r4/measurereport_group_stratifier_stratum_component": measurereport_group_stratifier_stratum_component,
    "http://fhir.forms-lab.com/custom-model/r4/measurereport_group_stratifier_stratum_population": measurereport_group_stratifier_stratum_population,
    "http://fhir.forms-lab.com/custom-model/r4/medication_batch": medication_batch,
    "http://fhir.forms-lab.com/custom-model/r4/medication_ingredient": medication_ingredient,
    "http://fhir.forms-lab.com/custom-model/r4/medicationadministration_dosage": medicationadministration_dosage,
    "http://fhir.forms-lab.com/custom-model/r4/medicationadministration_performer": medicationadministration_performer,
    "http://fhir.forms-lab.com/custom-model/r4/medicationdispense_performer": medicationdispense_performer,
    "http://fhir.forms-lab.com/custom-model/r4/medicationdispense_substitution": medicationdispense_substitution,
    "http://fhir.forms-lab.com/custom-model/r4/medicationknowledge_administrationGuidelines": medicationknowledge_administrationGuidelines,
    "http://fhir.forms-lab.com/custom-model/r4/medicationknowledge_administrationGuidelines_dosage": medicationknowledge_administrationGuidelines_dosage,
    "http://fhir.forms-lab.com/custom-model/r4/medicationknowledge_administrationGuidelines_patientCharacteristics": medicationknowledge_administrationGuidelines_patientCharacteristics,
    "http://fhir.forms-lab.com/custom-model/r4/medicationknowledge_cost": medicationknowledge_cost,
    "http://fhir.forms-lab.com/custom-model/r4/medicationknowledge_drugCharacteristic": medicationknowledge_drugCharacteristic,
    "http://fhir.forms-lab.com/custom-model/r4/medicationknowledge_ingredient": medicationknowledge_ingredient,
    "http://fhir.forms-lab.com/custom-model/r4/medicationknowledge_kinetics": medicationknowledge_kinetics,
    "http://fhir.forms-lab.com/custom-model/r4/medicationknowledge_medicineClassification": medicationknowledge_medicineClassification,
    "http://fhir.forms-lab.com/custom-model/r4/medicationknowledge_monitoringProgram": medicationknowledge_monitoringProgram,
    "http://fhir.forms-lab.com/custom-model/r4/medicationknowledge_monograph": medicationknowledge_monograph,
    "http://fhir.forms-lab.com/custom-model/r4/medicationknowledge_packaging": medicationknowledge_packaging,
    "http://fhir.forms-lab.com/custom-model/r4/medicationknowledge_regulatory": medicationknowledge_regulatory,
    "http://fhir.forms-lab.com/custom-model/r4/medicationknowledge_regulatory_maxDispense": medicationknowledge_regulatory_maxDispense,
    "http://fhir.forms-lab.com/custom-model/r4/medicationknowledge_regulatory_schedule": medicationknowledge_regulatory_schedule,
    "http://fhir.forms-lab.com/custom-model/r4/medicationknowledge_regulatory_substitution": medicationknowledge_regulatory_substitution,
    "http://fhir.forms-lab.com/custom-model/r4/medicationknowledge_relatedMedicationKnowledge": medicationknowledge_relatedMedicationKnowledge,
    "http://fhir.forms-lab.com/custom-model/r4/medicationrequest_dispenseRequest": medicationrequest_dispenseRequest,
    "http://fhir.forms-lab.com/custom-model/r4/medicationrequest_dispenseRequest_initialFill": medicationrequest_dispenseRequest_initialFill,
    "http://fhir.forms-lab.com/custom-model/r4/medicationrequest_substitution": medicationrequest_substitution,
    "http://fhir.forms-lab.com/custom-model/r4/medicinalproduct_manufacturingBusinessOperation": medicinalproduct_manufacturingBusinessOperation,
    "http://fhir.forms-lab.com/custom-model/r4/medicinalproduct_name": medicinalproduct_name,
    "http://fhir.forms-lab.com/custom-model/r4/medicinalproduct_name_countryLanguage": medicinalproduct_name_countryLanguage,
    "http://fhir.forms-lab.com/custom-model/r4/medicinalproduct_name_namePart": medicinalproduct_name_namePart,
    "http://fhir.forms-lab.com/custom-model/r4/medicinalproduct_specialDesignation": medicinalproduct_specialDesignation,
    "http://fhir.forms-lab.com/custom-model/r4/medicinalproductauthorization_jurisdictionalAuthorization": medicinalproductauthorization_jurisdictionalAuthorization,
    "http://fhir.forms-lab.com/custom-model/r4/medicinalproductauthorization_procedure": medicinalproductauthorization_procedure,
    "http://fhir.forms-lab.com/custom-model/r4/medicinalproductcontraindication_otherTherapy": medicinalproductcontraindication_otherTherapy,
    "http://fhir.forms-lab.com/custom-model/r4/medicinalproductindication_otherTherapy": medicinalproductindication_otherTherapy,
    "http://fhir.forms-lab.com/custom-model/r4/medicinalproductingredient_specifiedSubstance": medicinalproductingredient_specifiedSubstance,
    "http://fhir.forms-lab.com/custom-model/r4/medicinalproductingredient_specifiedSubstance_strength": medicinalproductingredient_specifiedSubstance_strength,
    "http://fhir.forms-lab.com/custom-model/r4/medicinalproductingredient_specifiedSubstance_strength_referenceStrength": medicinalproductingredient_specifiedSubstance_strength_referenceStrength,
    "http://fhir.forms-lab.com/custom-model/r4/medicinalproductingredient_substance": medicinalproductingredient_substance,
    "http://fhir.forms-lab.com/custom-model/r4/medicinalproductinteraction_interactant": medicinalproductinteraction_interactant,
    "http://fhir.forms-lab.com/custom-model/r4/medicinalproductpackaged_batchIdentifier": medicinalproductpackaged_batchIdentifier,
    "http://fhir.forms-lab.com/custom-model/r4/medicinalproductpackaged_packageItem": medicinalproductpackaged_packageItem,
    "http://fhir.forms-lab.com/custom-model/r4/medicinalproductpharmaceutical_characteristics": medicinalproductpharmaceutical_characteristics,
    "http://fhir.forms-lab.com/custom-model/r4/medicinalproductpharmaceutical_routeOfAdministration": medicinalproductpharmaceutical_routeOfAdministration,
    "http://fhir.forms-lab.com/custom-model/r4/medicinalproductpharmaceutical_routeOfAdministration_targetSpecies": medicinalproductpharmaceutical_routeOfAdministration_targetSpecies,
    "http://fhir.forms-lab.com/custom-model/r4/medicinalproductpharmaceutical_routeOfAdministration_targetSpecies_withdrawalPeriod": medicinalproductpharmaceutical_routeOfAdministration_targetSpecies_withdrawalPeriod,
    "http://fhir.forms-lab.com/custom-model/r4/messagedefinition_allowedResponse": messagedefinition_allowedResponse,
    "http://fhir.forms-lab.com/custom-model/r4/messagedefinition_focus": messagedefinition_focus,
    "http://fhir.forms-lab.com/custom-model/r4/messageheader_destination": messageheader_destination,
    "http://fhir.forms-lab.com/custom-model/r4/messageheader_response": messageheader_response,
    "http://fhir.forms-lab.com/custom-model/r4/messageheader_source": messageheader_source,
    "http://fhir.forms-lab.com/custom-model/r4/molecularsequence_quality": molecularsequence_quality,
    "http://fhir.forms-lab.com/custom-model/r4/molecularsequence_quality_roc": molecularsequence_quality_roc,
    "http://fhir.forms-lab.com/custom-model/r4/molecularsequence_referenceSeq": molecularsequence_referenceSeq,
    "http://fhir.forms-lab.com/custom-model/r4/molecularsequence_repository": molecularsequence_repository,
    "http://fhir.forms-lab.com/custom-model/r4/molecularsequence_structureVariant": molecularsequence_structureVariant,
    "http://fhir.forms-lab.com/custom-model/r4/molecularsequence_structureVariant_inner": molecularsequence_structureVariant_inner,
    "http://fhir.forms-lab.com/custom-model/r4/molecularsequence_structureVariant_outer": molecularsequence_structureVariant_outer,
    "http://fhir.forms-lab.com/custom-model/r4/molecularsequence_variant": molecularsequence_variant,
    "http://fhir.forms-lab.com/custom-model/r4/namingsystem_uniqueId": namingsystem_uniqueId,
    "http://fhir.forms-lab.com/custom-model/r4/nutritionorder_enteralFormula": nutritionorder_enteralFormula,
    "http://fhir.forms-lab.com/custom-model/r4/nutritionorder_enteralFormula_administration": nutritionorder_enteralFormula_administration,
    "http://fhir.forms-lab.com/custom-model/r4/nutritionorder_oralDiet": nutritionorder_oralDiet,
    "http://fhir.forms-lab.com/custom-model/r4/nutritionorder_oralDiet_nutrient": nutritionorder_oralDiet_nutrient,
    "http://fhir.forms-lab.com/custom-model/r4/nutritionorder_oralDiet_texture": nutritionorder_oralDiet_texture,
    "http://fhir.forms-lab.com/custom-model/r4/nutritionorder_supplement": nutritionorder_supplement,
    "http://fhir.forms-lab.com/custom-model/r4/observation_component": observation_component,
    "http://fhir.forms-lab.com/custom-model/r4/observation_referenceRange": observation_referenceRange,
    "http://fhir.forms-lab.com/custom-model/r4/observationdefinition_qualifiedInterval": observationdefinition_qualifiedInterval,
    "http://fhir.forms-lab.com/custom-model/r4/observationdefinition_quantitativeDetails": observationdefinition_quantitativeDetails,
    "http://fhir.forms-lab.com/custom-model/r4/operationdefinition_overload": operationdefinition_overload,
    "http://fhir.forms-lab.com/custom-model/r4/operationdefinition_parameter": operationdefinition_parameter,
    "http://fhir.forms-lab.com/custom-model/r4/operationdefinition_parameter_binding": operationdefinition_parameter_binding,
    "http://fhir.forms-lab.com/custom-model/r4/operationdefinition_parameter_referencedFrom": operationdefinition_parameter_referencedFrom,
    "http://fhir.forms-lab.com/custom-model/r4/operationoutcome_issue": operationoutcome_issue,
    "http://fhir.forms-lab.com/custom-model/r4/organization_contact": organization_contact,
    "http://fhir.forms-lab.com/custom-model/r4/parameters_parameter": parameters_parameter,
    "http://fhir.forms-lab.com/custom-model/r4/patient_communication": patient_communication,
    "http://fhir.forms-lab.com/custom-model/r4/patient_contact": patient_contact,
    "http://fhir.forms-lab.com/custom-model/r4/patient_link": patient_link,
    "http://fhir.forms-lab.com/custom-model/r4/paymentreconciliation_detail": paymentreconciliation_detail,
    "http://fhir.forms-lab.com/custom-model/r4/paymentreconciliation_processNote": paymentreconciliation_processNote,
    "http://fhir.forms-lab.com/custom-model/r4/person_link": person_link,
    "http://fhir.forms-lab.com/custom-model/r4/plandefinition_action": plandefinition_action,
    "http://fhir.forms-lab.com/custom-model/r4/plandefinition_action_condition": plandefinition_action_condition,
    "http://fhir.forms-lab.com/custom-model/r4/plandefinition_action_dynamicValue": plandefinition_action_dynamicValue,
    "http://fhir.forms-lab.com/custom-model/r4/plandefinition_action_participant": plandefinition_action_participant,
    "http://fhir.forms-lab.com/custom-model/r4/plandefinition_action_relatedAction": plandefinition_action_relatedAction,
    "http://fhir.forms-lab.com/custom-model/r4/plandefinition_goal": plandefinition_goal,
    "http://fhir.forms-lab.com/custom-model/r4/plandefinition_goal_target": plandefinition_goal_target,
    "http://fhir.forms-lab.com/custom-model/r4/practitioner_qualification": practitioner_qualification,
    "http://fhir.forms-lab.com/custom-model/r4/practitionerrole_availableTime": practitionerrole_availableTime,
    "http://fhir.forms-lab.com/custom-model/r4/practitionerrole_notAvailable": practitionerrole_notAvailable,
    "http://fhir.forms-lab.com/custom-model/r4/procedure_focalDevice": procedure_focalDevice,
    "http://fhir.forms-lab.com/custom-model/r4/procedure_performer": procedure_performer,
    "http://fhir.forms-lab.com/custom-model/r4/provenance_agent": provenance_agent,
    "http://fhir.forms-lab.com/custom-model/r4/provenance_entity": provenance_entity,
    "http://fhir.forms-lab.com/custom-model/r4/questionnaire_item": questionnaire_item,
    "http://fhir.forms-lab.com/custom-model/r4/questionnaire_item_answerOption": questionnaire_item_answerOption,
    "http://fhir.forms-lab.com/custom-model/r4/questionnaire_item_enableWhen": questionnaire_item_enableWhen,
    "http://fhir.forms-lab.com/custom-model/r4/questionnaire_item_initial": questionnaire_item_initial,
    "http://fhir.forms-lab.com/custom-model/r4/questionnaireresponse_item": questionnaireresponse_item,
    "http://fhir.forms-lab.com/custom-model/r4/questionnaireresponse_item_answer": questionnaireresponse_item_answer,
    "http://fhir.forms-lab.com/custom-model/r4/relatedperson_communication": relatedperson_communication,
    "http://fhir.forms-lab.com/custom-model/r4/requestgroup_action": requestgroup_action,
    "http://fhir.forms-lab.com/custom-model/r4/requestgroup_action_condition": requestgroup_action_condition,
    "http://fhir.forms-lab.com/custom-model/r4/requestgroup_action_relatedAction": requestgroup_action_relatedAction,
    "http://fhir.forms-lab.com/custom-model/r4/researchelementdefinition_characteristic": researchelementdefinition_characteristic,
    "http://fhir.forms-lab.com/custom-model/r4/researchstudy_arm": researchstudy_arm,
    "http://fhir.forms-lab.com/custom-model/r4/researchstudy_objective": researchstudy_objective,
    "http://fhir.forms-lab.com/custom-model/r4/riskassessment_prediction": riskassessment_prediction,
    "http://fhir.forms-lab.com/custom-model/r4/riskevidencesynthesis_certainty": riskevidencesynthesis_certainty,
    "http://fhir.forms-lab.com/custom-model/r4/riskevidencesynthesis_certainty_certaintySubcomponent": riskevidencesynthesis_certainty_certaintySubcomponent,
    "http://fhir.forms-lab.com/custom-model/r4/riskevidencesynthesis_riskEstimate": riskevidencesynthesis_riskEstimate,
    "http://fhir.forms-lab.com/custom-model/r4/riskevidencesynthesis_riskEstimate_precisionEstimate": riskevidencesynthesis_riskEstimate_precisionEstimate,
    "http://fhir.forms-lab.com/custom-model/r4/riskevidencesynthesis_sampleSize": riskevidencesynthesis_sampleSize,
    "http://fhir.forms-lab.com/custom-model/r4/searchparameter_component": searchparameter_component,
    "http://fhir.forms-lab.com/custom-model/r4/specimen_collection": specimen_collection,
    "http://fhir.forms-lab.com/custom-model/r4/specimen_container": specimen_container,
    "http://fhir.forms-lab.com/custom-model/r4/specimen_processing": specimen_processing,
    "http://fhir.forms-lab.com/custom-model/r4/specimendefinition_typeTested": specimendefinition_typeTested,
    "http://fhir.forms-lab.com/custom-model/r4/specimendefinition_typeTested_container": specimendefinition_typeTested_container,
    "http://fhir.forms-lab.com/custom-model/r4/specimendefinition_typeTested_container_additive": specimendefinition_typeTested_container_additive,
    "http://fhir.forms-lab.com/custom-model/r4/specimendefinition_typeTested_handling": specimendefinition_typeTested_handling,
    "http://fhir.forms-lab.com/custom-model/r4/structuredefinition_context": structuredefinition_context,
    "http://fhir.forms-lab.com/custom-model/r4/structuredefinition_differential": structuredefinition_differential,
    "http://fhir.forms-lab.com/custom-model/r4/structuredefinition_mapping": structuredefinition_mapping,
    "http://fhir.forms-lab.com/custom-model/r4/structuredefinition_snapshot": structuredefinition_snapshot,
    "http://fhir.forms-lab.com/custom-model/r4/structuremap_group": structuremap_group,
    "http://fhir.forms-lab.com/custom-model/r4/structuremap_group_input": structuremap_group_input,
    "http://fhir.forms-lab.com/custom-model/r4/structuremap_group_rule": structuremap_group_rule,
    "http://fhir.forms-lab.com/custom-model/r4/structuremap_group_rule_dependent": structuremap_group_rule_dependent,
    "http://fhir.forms-lab.com/custom-model/r4/structuremap_group_rule_source": structuremap_group_rule_source,
    "http://fhir.forms-lab.com/custom-model/r4/structuremap_group_rule_target": structuremap_group_rule_target,
    "http://fhir.forms-lab.com/custom-model/r4/structuremap_group_rule_target_parameter": structuremap_group_rule_target_parameter,
    "http://fhir.forms-lab.com/custom-model/r4/structuremap_structure": structuremap_structure,
    "http://fhir.forms-lab.com/custom-model/r4/subscription_channel": subscription_channel,
    "http://fhir.forms-lab.com/custom-model/r4/substance_ingredient": substance_ingredient,
    "http://fhir.forms-lab.com/custom-model/r4/substance_instance": substance_instance,
    "http://fhir.forms-lab.com/custom-model/r4/substanceamount_referenceRange": substanceamount_referenceRange,
    "http://fhir.forms-lab.com/custom-model/r4/substancenucleicacid_subunit": substancenucleicacid_subunit,
    "http://fhir.forms-lab.com/custom-model/r4/substancenucleicacid_subunit_linkage": substancenucleicacid_subunit_linkage,
    "http://fhir.forms-lab.com/custom-model/r4/substancenucleicacid_subunit_sugar": substancenucleicacid_subunit_sugar,
    "http://fhir.forms-lab.com/custom-model/r4/substancepolymer_monomerSet": substancepolymer_monomerSet,
    "http://fhir.forms-lab.com/custom-model/r4/substancepolymer_monomerSet_startingMaterial": substancepolymer_monomerSet_startingMaterial,
    "http://fhir.forms-lab.com/custom-model/r4/substancepolymer_repeat": substancepolymer_repeat,
    "http://fhir.forms-lab.com/custom-model/r4/substancepolymer_repeat_repeatUnit": substancepolymer_repeat_repeatUnit,
    "http://fhir.forms-lab.com/custom-model/r4/substancepolymer_repeat_repeatUnit_degreeOfPolymerisation": substancepolymer_repeat_repeatUnit_degreeOfPolymerisation,
    "http://fhir.forms-lab.com/custom-model/r4/substancepolymer_repeat_repeatUnit_structuralRepresentation": substancepolymer_repeat_repeatUnit_structuralRepresentation,
    "http://fhir.forms-lab.com/custom-model/r4/substanceprotein_subunit": substanceprotein_subunit,
    "http://fhir.forms-lab.com/custom-model/r4/substancereferenceinformation_classification": substancereferenceinformation_classification,
    "http://fhir.forms-lab.com/custom-model/r4/substancereferenceinformation_gene": substancereferenceinformation_gene,
    "http://fhir.forms-lab.com/custom-model/r4/substancereferenceinformation_geneElement": substancereferenceinformation_geneElement,
    "http://fhir.forms-lab.com/custom-model/r4/substancereferenceinformation_target": substancereferenceinformation_target,
    "http://fhir.forms-lab.com/custom-model/r4/substancesourcematerial_fractionDescription": substancesourcematerial_fractionDescription,
    "http://fhir.forms-lab.com/custom-model/r4/substancesourcematerial_organism": substancesourcematerial_organism,
    "http://fhir.forms-lab.com/custom-model/r4/substancesourcematerial_organism_author": substancesourcematerial_organism_author,
    "http://fhir.forms-lab.com/custom-model/r4/substancesourcematerial_organism_hybrid": substancesourcematerial_organism_hybrid,
    "http://fhir.forms-lab.com/custom-model/r4/substancesourcematerial_organism_organismGeneral": substancesourcematerial_organism_organismGeneral,
    "http://fhir.forms-lab.com/custom-model/r4/substancesourcematerial_partDescription": substancesourcematerial_partDescription,
    "http://fhir.forms-lab.com/custom-model/r4/substancespecification_code": substancespecification_code,
    "http://fhir.forms-lab.com/custom-model/r4/substancespecification_moiety": substancespecification_moiety,
    "http://fhir.forms-lab.com/custom-model/r4/substancespecification_name": substancespecification_name,
    "http://fhir.forms-lab.com/custom-model/r4/substancespecification_name_official": substancespecification_name_official,
    "http://fhir.forms-lab.com/custom-model/r4/substancespecification_property": substancespecification_property,
    "http://fhir.forms-lab.com/custom-model/r4/substancespecification_relationship": substancespecification_relationship,
    "http://fhir.forms-lab.com/custom-model/r4/substancespecification_structure": substancespecification_structure,
    "http://fhir.forms-lab.com/custom-model/r4/substancespecification_structure_isotope": substancespecification_structure_isotope,
    "http://fhir.forms-lab.com/custom-model/r4/substancespecification_structure_isotope_molecularWeight": substancespecification_structure_isotope_molecularWeight,
    "http://fhir.forms-lab.com/custom-model/r4/substancespecification_structure_representation": substancespecification_structure_representation,
    "http://fhir.forms-lab.com/custom-model/r4/supplydelivery_suppliedItem": supplydelivery_suppliedItem,
    "http://fhir.forms-lab.com/custom-model/r4/supplyrequest_parameter": supplyrequest_parameter,
    "http://fhir.forms-lab.com/custom-model/r4/task_input": task_input,
    "http://fhir.forms-lab.com/custom-model/r4/task_output": task_output,
    "http://fhir.forms-lab.com/custom-model/r4/task_restriction": task_restriction,
    "http://fhir.forms-lab.com/custom-model/r4/terminologycapabilities_closure": terminologycapabilities_closure,
    "http://fhir.forms-lab.com/custom-model/r4/terminologycapabilities_codeSystem": terminologycapabilities_codeSystem,
    "http://fhir.forms-lab.com/custom-model/r4/terminologycapabilities_codeSystem_version": terminologycapabilities_codeSystem_version,
    "http://fhir.forms-lab.com/custom-model/r4/terminologycapabilities_codeSystem_version_filter": terminologycapabilities_codeSystem_version_filter,
    "http://fhir.forms-lab.com/custom-model/r4/terminologycapabilities_expansion": terminologycapabilities_expansion,
    "http://fhir.forms-lab.com/custom-model/r4/terminologycapabilities_expansion_parameter": terminologycapabilities_expansion_parameter,
    "http://fhir.forms-lab.com/custom-model/r4/terminologycapabilities_implementation": terminologycapabilities_implementation,
    "http://fhir.forms-lab.com/custom-model/r4/terminologycapabilities_software": terminologycapabilities_software,
    "http://fhir.forms-lab.com/custom-model/r4/terminologycapabilities_translation": terminologycapabilities_translation,
    "http://fhir.forms-lab.com/custom-model/r4/terminologycapabilities_validateCode": terminologycapabilities_validateCode,
    "http://fhir.forms-lab.com/custom-model/r4/testreport_participant": testreport_participant,
    "http://fhir.forms-lab.com/custom-model/r4/testreport_setup": testreport_setup,
    "http://fhir.forms-lab.com/custom-model/r4/testreport_setup_action": testreport_setup_action,
    "http://fhir.forms-lab.com/custom-model/r4/testreport_setup_action_assert": testreport_setup_action_assert,
    "http://fhir.forms-lab.com/custom-model/r4/testreport_setup_action_operation": testreport_setup_action_operation,
    "http://fhir.forms-lab.com/custom-model/r4/testreport_teardown": testreport_teardown,
    "http://fhir.forms-lab.com/custom-model/r4/testreport_teardown_action": testreport_teardown_action,
    "http://fhir.forms-lab.com/custom-model/r4/testreport_test": testreport_test,
    "http://fhir.forms-lab.com/custom-model/r4/testreport_test_action": testreport_test_action,
    "http://fhir.forms-lab.com/custom-model/r4/testscript_destination": testscript_destination,
    "http://fhir.forms-lab.com/custom-model/r4/testscript_fixture": testscript_fixture,
    "http://fhir.forms-lab.com/custom-model/r4/testscript_metadata": testscript_metadata,
    "http://fhir.forms-lab.com/custom-model/r4/testscript_metadata_capability": testscript_metadata_capability,
    "http://fhir.forms-lab.com/custom-model/r4/testscript_metadata_link": testscript_metadata_link,
    "http://fhir.forms-lab.com/custom-model/r4/testscript_origin": testscript_origin,
    "http://fhir.forms-lab.com/custom-model/r4/testscript_setup": testscript_setup,
    "http://fhir.forms-lab.com/custom-model/r4/testscript_setup_action": testscript_setup_action,
    "http://fhir.forms-lab.com/custom-model/r4/testscript_setup_action_assert": testscript_setup_action_assert,
    "http://fhir.forms-lab.com/custom-model/r4/testscript_setup_action_operation": testscript_setup_action_operation,
    "http://fhir.forms-lab.com/custom-model/r4/testscript_setup_action_operation_requestHeader": testscript_setup_action_operation_requestHeader,
    "http://fhir.forms-lab.com/custom-model/r4/testscript_teardown": testscript_teardown,
    "http://fhir.forms-lab.com/custom-model/r4/testscript_teardown_action": testscript_teardown_action,
    "http://fhir.forms-lab.com/custom-model/r4/testscript_test": testscript_test,
    "http://fhir.forms-lab.com/custom-model/r4/testscript_test_action": testscript_test_action,
    "http://fhir.forms-lab.com/custom-model/r4/testscript_variable": testscript_variable,
    "http://fhir.forms-lab.com/custom-model/r4/timing_repeat": timing_repeat,
    "http://fhir.forms-lab.com/custom-model/r4/valueset_compose": valueset_compose,
    "http://fhir.forms-lab.com/custom-model/r4/valueset_compose_include": valueset_compose_include,
    "http://fhir.forms-lab.com/custom-model/r4/valueset_compose_include_concept": valueset_compose_include_concept,
    "http://fhir.forms-lab.com/custom-model/r4/valueset_compose_include_concept_designation": valueset_compose_include_concept_designation,
    "http://fhir.forms-lab.com/custom-model/r4/valueset_compose_include_filter": valueset_compose_include_filter,
    "http://fhir.forms-lab.com/custom-model/r4/valueset_expansion": valueset_expansion,
    "http://fhir.forms-lab.com/custom-model/r4/valueset_expansion_contains": valueset_expansion_contains,
    "http://fhir.forms-lab.com/custom-model/r4/valueset_expansion_parameter": valueset_expansion_parameter,
    "http://fhir.forms-lab.com/custom-model/r4/verificationresult_attestation": verificationresult_attestation,
    "http://fhir.forms-lab.com/custom-model/r4/verificationresult_primarySource": verificationresult_primarySource,
    "http://fhir.forms-lab.com/custom-model/r4/verificationresult_validator": verificationresult_validator,
    "http://fhir.forms-lab.com/custom-model/r4/visionprescription_lensSpecification": visionprescription_lensSpecification,
    "http://fhir.forms-lab.com/custom-model/r4/visionprescription_lensSpecification_prism": visionprescription_lensSpecification_prism,
});

export const byTypeName: Readonly<Record<string, TypeModel>> = Object.freeze({
    "account_coverage": account_coverage,
    "account_guarantor": account_guarantor,
    "activitydefinition_dynamicValue": activitydefinition_dynamicValue,
    "activitydefinition_participant": activitydefinition_participant,
    "adverseevent_suspectEntity": adverseevent_suspectEntity,
    "adverseevent_suspectEntity_causality": adverseevent_suspectEntity_causality,
    "allergyintolerance_reaction": allergyintolerance_reaction,
    "appointment_participant": appointment_participant,
    "auditevent_agent": auditevent_agent,
    "auditevent_agent_network": auditevent_agent_network,
    "auditevent_entity": auditevent_entity,
    "auditevent_entity_detail": auditevent_entity_detail,
    "auditevent_source": auditevent_source,
    "biologicallyderivedproduct_collection": biologicallyderivedproduct_collection,
    "biologicallyderivedproduct_manipulation": biologicallyderivedproduct_manipulation,
    "biologicallyderivedproduct_processing": biologicallyderivedproduct_processing,
    "biologicallyderivedproduct_storage": biologicallyderivedproduct_storage,
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
    "careplan_activity_detail": careplan_activity_detail,
    "careteam_participant": careteam_participant,
    "catalogentry_relatedEntry": catalogentry_relatedEntry,
    "chargeitem_performer": chargeitem_performer,
    "chargeitemdefinition_applicability": chargeitemdefinition_applicability,
    "chargeitemdefinition_propertyGroup": chargeitemdefinition_propertyGroup,
    "chargeitemdefinition_propertyGroup_priceComponent": chargeitemdefinition_propertyGroup_priceComponent,
    "claim_accident": claim_accident,
    "claim_careTeam": claim_careTeam,
    "claim_diagnosis": claim_diagnosis,
    "claim_insurance": claim_insurance,
    "claim_item": claim_item,
    "claim_item_detail": claim_item_detail,
    "claim_item_detail_subDetail": claim_item_detail_subDetail,
    "claim_payee": claim_payee,
    "claim_procedure": claim_procedure,
    "claim_related": claim_related,
    "claim_supportingInfo": claim_supportingInfo,
    "claimresponse_addItem": claimresponse_addItem,
    "claimresponse_addItem_detail": claimresponse_addItem_detail,
    "claimresponse_addItem_detail_subDetail": claimresponse_addItem_detail_subDetail,
    "claimresponse_error": claimresponse_error,
    "claimresponse_insurance": claimresponse_insurance,
    "claimresponse_item": claimresponse_item,
    "claimresponse_item_adjudication": claimresponse_item_adjudication,
    "claimresponse_item_detail": claimresponse_item_detail,
    "claimresponse_item_detail_subDetail": claimresponse_item_detail_subDetail,
    "claimresponse_payment": claimresponse_payment,
    "claimresponse_processNote": claimresponse_processNote,
    "claimresponse_total": claimresponse_total,
    "clinicalimpression_finding": clinicalimpression_finding,
    "clinicalimpression_investigation": clinicalimpression_investigation,
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
    "composition_relatesTo": composition_relatesTo,
    "composition_section": composition_section,
    "conceptmap_group": conceptmap_group,
    "conceptmap_group_element": conceptmap_group_element,
    "conceptmap_group_element_target": conceptmap_group_element_target,
    "conceptmap_group_element_target_dependsOn": conceptmap_group_element_target_dependsOn,
    "conceptmap_group_unmapped": conceptmap_group_unmapped,
    "condition_evidence": condition_evidence,
    "condition_stage": condition_stage,
    "consent_policy": consent_policy,
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
    "coverageeligibilityrequest_insurance": coverageeligibilityrequest_insurance,
    "coverageeligibilityrequest_item": coverageeligibilityrequest_item,
    "coverageeligibilityrequest_item_diagnosis": coverageeligibilityrequest_item_diagnosis,
    "coverageeligibilityrequest_supportingInfo": coverageeligibilityrequest_supportingInfo,
    "coverageeligibilityresponse_error": coverageeligibilityresponse_error,
    "coverageeligibilityresponse_insurance": coverageeligibilityresponse_insurance,
    "coverageeligibilityresponse_insurance_item": coverageeligibilityresponse_insurance_item,
    "coverageeligibilityresponse_insurance_item_benefit": coverageeligibilityresponse_insurance_item_benefit,
    "datarequirement_codeFilter": datarequirement_codeFilter,
    "datarequirement_dateFilter": datarequirement_dateFilter,
    "datarequirement_sort": datarequirement_sort,
    "detectedissue_evidence": detectedissue_evidence,
    "detectedissue_mitigation": detectedissue_mitigation,
    "device_deviceName": device_deviceName,
    "device_property": device_property,
    "device_specialization": device_specialization,
    "device_udiCarrier": device_udiCarrier,
    "device_version": device_version,
    "devicedefinition_capability": devicedefinition_capability,
    "devicedefinition_deviceName": devicedefinition_deviceName,
    "devicedefinition_material": devicedefinition_material,
    "devicedefinition_property": devicedefinition_property,
    "devicedefinition_specialization": devicedefinition_specialization,
    "devicedefinition_udiDeviceIdentifier": devicedefinition_udiDeviceIdentifier,
    "devicemetric_calibration": devicemetric_calibration,
    "devicerequest_parameter": devicerequest_parameter,
    "diagnosticreport_media": diagnosticreport_media,
    "documentmanifest_related": documentmanifest_related,
    "documentreference_content": documentreference_content,
    "documentreference_context": documentreference_context,
    "documentreference_relatesTo": documentreference_relatesTo,
    "dosage_doseAndRate": dosage_doseAndRate,
    "effectevidencesynthesis_certainty": effectevidencesynthesis_certainty,
    "effectevidencesynthesis_certainty_certaintySubcomponent": effectevidencesynthesis_certainty_certaintySubcomponent,
    "effectevidencesynthesis_effectEstimate": effectevidencesynthesis_effectEstimate,
    "effectevidencesynthesis_effectEstimate_precisionEstimate": effectevidencesynthesis_effectEstimate_precisionEstimate,
    "effectevidencesynthesis_resultsByExposure": effectevidencesynthesis_resultsByExposure,
    "effectevidencesynthesis_sampleSize": effectevidencesynthesis_sampleSize,
    "elementdefinition_base": elementdefinition_base,
    "elementdefinition_binding": elementdefinition_binding,
    "elementdefinition_constraint": elementdefinition_constraint,
    "elementdefinition_example": elementdefinition_example,
    "elementdefinition_mapping": elementdefinition_mapping,
    "elementdefinition_slicing": elementdefinition_slicing,
    "elementdefinition_slicing_discriminator": elementdefinition_slicing_discriminator,
    "elementdefinition_type": elementdefinition_type,
    "encounter_classHistory": encounter_classHistory,
    "encounter_diagnosis": encounter_diagnosis,
    "encounter_hospitalization": encounter_hospitalization,
    "encounter_location": encounter_location,
    "encounter_participant": encounter_participant,
    "encounter_statusHistory": encounter_statusHistory,
    "episodeofcare_diagnosis": episodeofcare_diagnosis,
    "episodeofcare_statusHistory": episodeofcare_statusHistory,
    "evidencevariable_characteristic": evidencevariable_characteristic,
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
    "explanationofbenefit_addItem_detail": explanationofbenefit_addItem_detail,
    "explanationofbenefit_addItem_detail_subDetail": explanationofbenefit_addItem_detail_subDetail,
    "explanationofbenefit_benefitBalance": explanationofbenefit_benefitBalance,
    "explanationofbenefit_benefitBalance_financial": explanationofbenefit_benefitBalance_financial,
    "explanationofbenefit_careTeam": explanationofbenefit_careTeam,
    "explanationofbenefit_diagnosis": explanationofbenefit_diagnosis,
    "explanationofbenefit_insurance": explanationofbenefit_insurance,
    "explanationofbenefit_item": explanationofbenefit_item,
    "explanationofbenefit_item_adjudication": explanationofbenefit_item_adjudication,
    "explanationofbenefit_item_detail": explanationofbenefit_item_detail,
    "explanationofbenefit_item_detail_subDetail": explanationofbenefit_item_detail_subDetail,
    "explanationofbenefit_payee": explanationofbenefit_payee,
    "explanationofbenefit_payment": explanationofbenefit_payment,
    "explanationofbenefit_procedure": explanationofbenefit_procedure,
    "explanationofbenefit_processNote": explanationofbenefit_processNote,
    "explanationofbenefit_related": explanationofbenefit_related,
    "explanationofbenefit_supportingInfo": explanationofbenefit_supportingInfo,
    "explanationofbenefit_total": explanationofbenefit_total,
    "familymemberhistory_condition": familymemberhistory_condition,
    "goal_target": goal_target,
    "graphdefinition_link": graphdefinition_link,
    "graphdefinition_link_target": graphdefinition_link_target,
    "graphdefinition_link_target_compartment": graphdefinition_link_target_compartment,
    "group_characteristic": group_characteristic,
    "group_member": group_member,
    "healthcareservice_availableTime": healthcareservice_availableTime,
    "healthcareservice_eligibility": healthcareservice_eligibility,
    "healthcareservice_notAvailable": healthcareservice_notAvailable,
    "imagingstudy_series": imagingstudy_series,
    "imagingstudy_series_instance": imagingstudy_series_instance,
    "imagingstudy_series_performer": imagingstudy_series_performer,
    "immunization_education": immunization_education,
    "immunization_performer": immunization_performer,
    "immunization_protocolApplied": immunization_protocolApplied,
    "immunization_reaction": immunization_reaction,
    "immunizationrecommendation_recommendation": immunizationrecommendation_recommendation,
    "immunizationrecommendation_recommendation_dateCriterion": immunizationrecommendation_recommendation_dateCriterion,
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
    "insuranceplan_contact": insuranceplan_contact,
    "insuranceplan_coverage": insuranceplan_coverage,
    "insuranceplan_coverage_benefit": insuranceplan_coverage_benefit,
    "insuranceplan_coverage_benefit_limit": insuranceplan_coverage_benefit_limit,
    "insuranceplan_plan": insuranceplan_plan,
    "insuranceplan_plan_generalCost": insuranceplan_plan_generalCost,
    "insuranceplan_plan_specificCost": insuranceplan_plan_specificCost,
    "insuranceplan_plan_specificCost_benefit": insuranceplan_plan_specificCost_benefit,
    "insuranceplan_plan_specificCost_benefit_cost": insuranceplan_plan_specificCost_benefit_cost,
    "invoice_lineItem": invoice_lineItem,
    "invoice_lineItem_priceComponent": invoice_lineItem_priceComponent,
    "invoice_participant": invoice_participant,
    "linkage_item": linkage_item,
    "list_entry": list_entry,
    "location_hoursOfOperation": location_hoursOfOperation,
    "location_position": location_position,
    "measure_group": measure_group,
    "measure_group_population": measure_group_population,
    "measure_group_stratifier": measure_group_stratifier,
    "measure_group_stratifier_component": measure_group_stratifier_component,
    "measure_supplementalData": measure_supplementalData,
    "measurereport_group": measurereport_group,
    "measurereport_group_population": measurereport_group_population,
    "measurereport_group_stratifier": measurereport_group_stratifier,
    "measurereport_group_stratifier_stratum": measurereport_group_stratifier_stratum,
    "measurereport_group_stratifier_stratum_component": measurereport_group_stratifier_stratum_component,
    "measurereport_group_stratifier_stratum_population": measurereport_group_stratifier_stratum_population,
    "medication_batch": medication_batch,
    "medication_ingredient": medication_ingredient,
    "medicationadministration_dosage": medicationadministration_dosage,
    "medicationadministration_performer": medicationadministration_performer,
    "medicationdispense_performer": medicationdispense_performer,
    "medicationdispense_substitution": medicationdispense_substitution,
    "medicationknowledge_administrationGuidelines": medicationknowledge_administrationGuidelines,
    "medicationknowledge_administrationGuidelines_dosage": medicationknowledge_administrationGuidelines_dosage,
    "medicationknowledge_administrationGuidelines_patientCharacteristics": medicationknowledge_administrationGuidelines_patientCharacteristics,
    "medicationknowledge_cost": medicationknowledge_cost,
    "medicationknowledge_drugCharacteristic": medicationknowledge_drugCharacteristic,
    "medicationknowledge_ingredient": medicationknowledge_ingredient,
    "medicationknowledge_kinetics": medicationknowledge_kinetics,
    "medicationknowledge_medicineClassification": medicationknowledge_medicineClassification,
    "medicationknowledge_monitoringProgram": medicationknowledge_monitoringProgram,
    "medicationknowledge_monograph": medicationknowledge_monograph,
    "medicationknowledge_packaging": medicationknowledge_packaging,
    "medicationknowledge_regulatory": medicationknowledge_regulatory,
    "medicationknowledge_regulatory_maxDispense": medicationknowledge_regulatory_maxDispense,
    "medicationknowledge_regulatory_schedule": medicationknowledge_regulatory_schedule,
    "medicationknowledge_regulatory_substitution": medicationknowledge_regulatory_substitution,
    "medicationknowledge_relatedMedicationKnowledge": medicationknowledge_relatedMedicationKnowledge,
    "medicationrequest_dispenseRequest": medicationrequest_dispenseRequest,
    "medicationrequest_dispenseRequest_initialFill": medicationrequest_dispenseRequest_initialFill,
    "medicationrequest_substitution": medicationrequest_substitution,
    "medicinalproduct_manufacturingBusinessOperation": medicinalproduct_manufacturingBusinessOperation,
    "medicinalproduct_name": medicinalproduct_name,
    "medicinalproduct_name_countryLanguage": medicinalproduct_name_countryLanguage,
    "medicinalproduct_name_namePart": medicinalproduct_name_namePart,
    "medicinalproduct_specialDesignation": medicinalproduct_specialDesignation,
    "medicinalproductauthorization_jurisdictionalAuthorization": medicinalproductauthorization_jurisdictionalAuthorization,
    "medicinalproductauthorization_procedure": medicinalproductauthorization_procedure,
    "medicinalproductcontraindication_otherTherapy": medicinalproductcontraindication_otherTherapy,
    "medicinalproductindication_otherTherapy": medicinalproductindication_otherTherapy,
    "medicinalproductingredient_specifiedSubstance": medicinalproductingredient_specifiedSubstance,
    "medicinalproductingredient_specifiedSubstance_strength": medicinalproductingredient_specifiedSubstance_strength,
    "medicinalproductingredient_specifiedSubstance_strength_referenceStrength": medicinalproductingredient_specifiedSubstance_strength_referenceStrength,
    "medicinalproductingredient_substance": medicinalproductingredient_substance,
    "medicinalproductinteraction_interactant": medicinalproductinteraction_interactant,
    "medicinalproductpackaged_batchIdentifier": medicinalproductpackaged_batchIdentifier,
    "medicinalproductpackaged_packageItem": medicinalproductpackaged_packageItem,
    "medicinalproductpharmaceutical_characteristics": medicinalproductpharmaceutical_characteristics,
    "medicinalproductpharmaceutical_routeOfAdministration": medicinalproductpharmaceutical_routeOfAdministration,
    "medicinalproductpharmaceutical_routeOfAdministration_targetSpecies": medicinalproductpharmaceutical_routeOfAdministration_targetSpecies,
    "medicinalproductpharmaceutical_routeOfAdministration_targetSpecies_withdrawalPeriod": medicinalproductpharmaceutical_routeOfAdministration_targetSpecies_withdrawalPeriod,
    "messagedefinition_allowedResponse": messagedefinition_allowedResponse,
    "messagedefinition_focus": messagedefinition_focus,
    "messageheader_destination": messageheader_destination,
    "messageheader_response": messageheader_response,
    "messageheader_source": messageheader_source,
    "molecularsequence_quality": molecularsequence_quality,
    "molecularsequence_quality_roc": molecularsequence_quality_roc,
    "molecularsequence_referenceSeq": molecularsequence_referenceSeq,
    "molecularsequence_repository": molecularsequence_repository,
    "molecularsequence_structureVariant": molecularsequence_structureVariant,
    "molecularsequence_structureVariant_inner": molecularsequence_structureVariant_inner,
    "molecularsequence_structureVariant_outer": molecularsequence_structureVariant_outer,
    "molecularsequence_variant": molecularsequence_variant,
    "namingsystem_uniqueId": namingsystem_uniqueId,
    "nutritionorder_enteralFormula": nutritionorder_enteralFormula,
    "nutritionorder_enteralFormula_administration": nutritionorder_enteralFormula_administration,
    "nutritionorder_oralDiet": nutritionorder_oralDiet,
    "nutritionorder_oralDiet_nutrient": nutritionorder_oralDiet_nutrient,
    "nutritionorder_oralDiet_texture": nutritionorder_oralDiet_texture,
    "nutritionorder_supplement": nutritionorder_supplement,
    "observation_component": observation_component,
    "observation_referenceRange": observation_referenceRange,
    "observationdefinition_qualifiedInterval": observationdefinition_qualifiedInterval,
    "observationdefinition_quantitativeDetails": observationdefinition_quantitativeDetails,
    "operationdefinition_overload": operationdefinition_overload,
    "operationdefinition_parameter": operationdefinition_parameter,
    "operationdefinition_parameter_binding": operationdefinition_parameter_binding,
    "operationdefinition_parameter_referencedFrom": operationdefinition_parameter_referencedFrom,
    "operationoutcome_issue": operationoutcome_issue,
    "organization_contact": organization_contact,
    "parameters_parameter": parameters_parameter,
    "patient_communication": patient_communication,
    "patient_contact": patient_contact,
    "patient_link": patient_link,
    "paymentreconciliation_detail": paymentreconciliation_detail,
    "paymentreconciliation_processNote": paymentreconciliation_processNote,
    "person_link": person_link,
    "plandefinition_action": plandefinition_action,
    "plandefinition_action_condition": plandefinition_action_condition,
    "plandefinition_action_dynamicValue": plandefinition_action_dynamicValue,
    "plandefinition_action_participant": plandefinition_action_participant,
    "plandefinition_action_relatedAction": plandefinition_action_relatedAction,
    "plandefinition_goal": plandefinition_goal,
    "plandefinition_goal_target": plandefinition_goal_target,
    "practitioner_qualification": practitioner_qualification,
    "practitionerrole_availableTime": practitionerrole_availableTime,
    "practitionerrole_notAvailable": practitionerrole_notAvailable,
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
    "relatedperson_communication": relatedperson_communication,
    "requestgroup_action": requestgroup_action,
    "requestgroup_action_condition": requestgroup_action_condition,
    "requestgroup_action_relatedAction": requestgroup_action_relatedAction,
    "researchelementdefinition_characteristic": researchelementdefinition_characteristic,
    "researchstudy_arm": researchstudy_arm,
    "researchstudy_objective": researchstudy_objective,
    "riskassessment_prediction": riskassessment_prediction,
    "riskevidencesynthesis_certainty": riskevidencesynthesis_certainty,
    "riskevidencesynthesis_certainty_certaintySubcomponent": riskevidencesynthesis_certainty_certaintySubcomponent,
    "riskevidencesynthesis_riskEstimate": riskevidencesynthesis_riskEstimate,
    "riskevidencesynthesis_riskEstimate_precisionEstimate": riskevidencesynthesis_riskEstimate_precisionEstimate,
    "riskevidencesynthesis_sampleSize": riskevidencesynthesis_sampleSize,
    "searchparameter_component": searchparameter_component,
    "specimen_collection": specimen_collection,
    "specimen_container": specimen_container,
    "specimen_processing": specimen_processing,
    "specimendefinition_typeTested": specimendefinition_typeTested,
    "specimendefinition_typeTested_container": specimendefinition_typeTested_container,
    "specimendefinition_typeTested_container_additive": specimendefinition_typeTested_container_additive,
    "specimendefinition_typeTested_handling": specimendefinition_typeTested_handling,
    "structuredefinition_context": structuredefinition_context,
    "structuredefinition_differential": structuredefinition_differential,
    "structuredefinition_mapping": structuredefinition_mapping,
    "structuredefinition_snapshot": structuredefinition_snapshot,
    "structuremap_group": structuremap_group,
    "structuremap_group_input": structuremap_group_input,
    "structuremap_group_rule": structuremap_group_rule,
    "structuremap_group_rule_dependent": structuremap_group_rule_dependent,
    "structuremap_group_rule_source": structuremap_group_rule_source,
    "structuremap_group_rule_target": structuremap_group_rule_target,
    "structuremap_group_rule_target_parameter": structuremap_group_rule_target_parameter,
    "structuremap_structure": structuremap_structure,
    "subscription_channel": subscription_channel,
    "substance_ingredient": substance_ingredient,
    "substance_instance": substance_instance,
    "substanceamount_referenceRange": substanceamount_referenceRange,
    "substancenucleicacid_subunit": substancenucleicacid_subunit,
    "substancenucleicacid_subunit_linkage": substancenucleicacid_subunit_linkage,
    "substancenucleicacid_subunit_sugar": substancenucleicacid_subunit_sugar,
    "substancepolymer_monomerSet": substancepolymer_monomerSet,
    "substancepolymer_monomerSet_startingMaterial": substancepolymer_monomerSet_startingMaterial,
    "substancepolymer_repeat": substancepolymer_repeat,
    "substancepolymer_repeat_repeatUnit": substancepolymer_repeat_repeatUnit,
    "substancepolymer_repeat_repeatUnit_degreeOfPolymerisation": substancepolymer_repeat_repeatUnit_degreeOfPolymerisation,
    "substancepolymer_repeat_repeatUnit_structuralRepresentation": substancepolymer_repeat_repeatUnit_structuralRepresentation,
    "substanceprotein_subunit": substanceprotein_subunit,
    "substancereferenceinformation_classification": substancereferenceinformation_classification,
    "substancereferenceinformation_gene": substancereferenceinformation_gene,
    "substancereferenceinformation_geneElement": substancereferenceinformation_geneElement,
    "substancereferenceinformation_target": substancereferenceinformation_target,
    "substancesourcematerial_fractionDescription": substancesourcematerial_fractionDescription,
    "substancesourcematerial_organism": substancesourcematerial_organism,
    "substancesourcematerial_organism_author": substancesourcematerial_organism_author,
    "substancesourcematerial_organism_hybrid": substancesourcematerial_organism_hybrid,
    "substancesourcematerial_organism_organismGeneral": substancesourcematerial_organism_organismGeneral,
    "substancesourcematerial_partDescription": substancesourcematerial_partDescription,
    "substancespecification_code": substancespecification_code,
    "substancespecification_moiety": substancespecification_moiety,
    "substancespecification_name": substancespecification_name,
    "substancespecification_name_official": substancespecification_name_official,
    "substancespecification_property": substancespecification_property,
    "substancespecification_relationship": substancespecification_relationship,
    "substancespecification_structure": substancespecification_structure,
    "substancespecification_structure_isotope": substancespecification_structure_isotope,
    "substancespecification_structure_isotope_molecularWeight": substancespecification_structure_isotope_molecularWeight,
    "substancespecification_structure_representation": substancespecification_structure_representation,
    "supplydelivery_suppliedItem": supplydelivery_suppliedItem,
    "supplyrequest_parameter": supplyrequest_parameter,
    "task_input": task_input,
    "task_output": task_output,
    "task_restriction": task_restriction,
    "terminologycapabilities_closure": terminologycapabilities_closure,
    "terminologycapabilities_codeSystem": terminologycapabilities_codeSystem,
    "terminologycapabilities_codeSystem_version": terminologycapabilities_codeSystem_version,
    "terminologycapabilities_codeSystem_version_filter": terminologycapabilities_codeSystem_version_filter,
    "terminologycapabilities_expansion": terminologycapabilities_expansion,
    "terminologycapabilities_expansion_parameter": terminologycapabilities_expansion_parameter,
    "terminologycapabilities_implementation": terminologycapabilities_implementation,
    "terminologycapabilities_software": terminologycapabilities_software,
    "terminologycapabilities_translation": terminologycapabilities_translation,
    "terminologycapabilities_validateCode": terminologycapabilities_validateCode,
    "testreport_participant": testreport_participant,
    "testreport_setup": testreport_setup,
    "testreport_setup_action": testreport_setup_action,
    "testreport_setup_action_assert": testreport_setup_action_assert,
    "testreport_setup_action_operation": testreport_setup_action_operation,
    "testreport_teardown": testreport_teardown,
    "testreport_teardown_action": testreport_teardown_action,
    "testreport_test": testreport_test,
    "testreport_test_action": testreport_test_action,
    "testscript_destination": testscript_destination,
    "testscript_fixture": testscript_fixture,
    "testscript_metadata": testscript_metadata,
    "testscript_metadata_capability": testscript_metadata_capability,
    "testscript_metadata_link": testscript_metadata_link,
    "testscript_origin": testscript_origin,
    "testscript_setup": testscript_setup,
    "testscript_setup_action": testscript_setup_action,
    "testscript_setup_action_assert": testscript_setup_action_assert,
    "testscript_setup_action_operation": testscript_setup_action_operation,
    "testscript_setup_action_operation_requestHeader": testscript_setup_action_operation_requestHeader,
    "testscript_teardown": testscript_teardown,
    "testscript_teardown_action": testscript_teardown_action,
    "testscript_test": testscript_test,
    "testscript_test_action": testscript_test_action,
    "testscript_variable": testscript_variable,
    "timing_repeat": timing_repeat,
    "valueset_compose": valueset_compose,
    "valueset_compose_include": valueset_compose_include,
    "valueset_compose_include_concept": valueset_compose_include_concept,
    "valueset_compose_include_concept_designation": valueset_compose_include_concept_designation,
    "valueset_compose_include_filter": valueset_compose_include_filter,
    "valueset_expansion": valueset_expansion,
    "valueset_expansion_contains": valueset_expansion_contains,
    "valueset_expansion_parameter": valueset_expansion_parameter,
    "verificationresult_attestation": verificationresult_attestation,
    "verificationresult_primarySource": verificationresult_primarySource,
    "verificationresult_validator": verificationresult_validator,
    "visionprescription_lensSpecification": visionprescription_lensSpecification,
    "visionprescription_lensSpecification_prism": visionprescription_lensSpecification_prism,
});
