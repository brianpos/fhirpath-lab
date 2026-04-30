// THIS FILE IS GENERATED — DO NOT EDIT BY HAND.
// Run `npm run generate:models -- --version <r4|r4b|r5|r6>` to regenerate.
// See docs/custom-model-generator-plan.md.

import type { TypeModel } from "../../../custom_model";

// FHIR complex types

export const Address: TypeModel = {
    TypeName: "Address",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "use", Type: [{ TypeName: "code" }] },
        { ElementName: "type", Type: [{ TypeName: "code" }] },
        { ElementName: "text", Type: [{ TypeName: "string" }] },
        { ElementName: "line", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "city", Type: [{ TypeName: "string" }] },
        { ElementName: "district", Type: [{ TypeName: "string" }] },
        { ElementName: "state", Type: [{ TypeName: "string" }] },
        { ElementName: "postalCode", Type: [{ TypeName: "string" }] },
        { ElementName: "country", Type: [{ TypeName: "string" }] },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
    ],
};

export const Age: TypeModel = {
    TypeName: "Age",
    BaseTypeName: "Quantity",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "value", Type: [{ TypeName: "decimal" }] },
        { ElementName: "comparator", Type: [{ TypeName: "code" }] },
        { ElementName: "unit", Type: [{ TypeName: "string" }] },
        { ElementName: "system", Type: [{ TypeName: "uri" }] },
        { ElementName: "code", Type: [{ TypeName: "code" }] },
    ],
};

export const Annotation: TypeModel = {
    TypeName: "Annotation",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "author[x]", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }, { TypeName: "string" }] },
        { ElementName: "time", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "text", Type: [{ TypeName: "markdown" }], Required: true },
    ],
};

export const Attachment: TypeModel = {
    TypeName: "Attachment",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "contentType", Type: [{ TypeName: "code" }] },
        { ElementName: "language", Type: [{ TypeName: "code" }] },
        { ElementName: "data", Type: [{ TypeName: "base64Binary" }] },
        { ElementName: "url", Type: [{ TypeName: "url" }] },
        { ElementName: "size", Type: [{ TypeName: "unsignedInt" }] },
        { ElementName: "hash", Type: [{ TypeName: "base64Binary" }] },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "creation", Type: [{ TypeName: "dateTime" }] },
    ],
};

export const BackboneElement: TypeModel = {
    TypeName: "BackboneElement",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
    ],
};

export const CodeableConcept: TypeModel = {
    TypeName: "CodeableConcept",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "coding", Type: [{ TypeName: "Coding" }], IsArray: true },
        { ElementName: "text", Type: [{ TypeName: "string" }] },
    ],
};

export const Coding: TypeModel = {
    TypeName: "Coding",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "system", Type: [{ TypeName: "uri" }] },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "code", Type: [{ TypeName: "code" }] },
        { ElementName: "display", Type: [{ TypeName: "string" }] },
        { ElementName: "userSelected", Type: [{ TypeName: "boolean" }] },
    ],
};

export const ContactDetail: TypeModel = {
    TypeName: "ContactDetail",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "telecom", Type: [{ TypeName: "ContactPoint" }], IsArray: true },
    ],
};

export const ContactPoint: TypeModel = {
    TypeName: "ContactPoint",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "system", Type: [{ TypeName: "code" }] },
        { ElementName: "value", Type: [{ TypeName: "string" }] },
        { ElementName: "use", Type: [{ TypeName: "code" }] },
        { ElementName: "rank", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
    ],
};

export const Contributor: TypeModel = {
    TypeName: "Contributor",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "name", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "contact", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
    ],
};

export const Count: TypeModel = {
    TypeName: "Count",
    BaseTypeName: "Quantity",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "value", Type: [{ TypeName: "decimal" }] },
        { ElementName: "comparator", Type: [{ TypeName: "code" }] },
        { ElementName: "unit", Type: [{ TypeName: "string" }] },
        { ElementName: "system", Type: [{ TypeName: "uri" }] },
        { ElementName: "code", Type: [{ TypeName: "code" }] },
    ],
};

export const DataRequirement: TypeModel = {
    TypeName: "DataRequirement",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "profile", Type: [{ TypeName: "canonical" }], IsArray: true },
        { ElementName: "subject[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }] },
        { ElementName: "mustSupport", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "codeFilter", Type: [{ TypeName: "datarequirement_codeFilter" }], IsArray: true },
        { ElementName: "dateFilter", Type: [{ TypeName: "datarequirement_dateFilter" }], IsArray: true },
        { ElementName: "limit", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "sort", Type: [{ TypeName: "datarequirement_sort" }], IsArray: true },
    ],
};

export const Distance: TypeModel = {
    TypeName: "Distance",
    BaseTypeName: "Quantity",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "value", Type: [{ TypeName: "decimal" }] },
        { ElementName: "comparator", Type: [{ TypeName: "code" }] },
        { ElementName: "unit", Type: [{ TypeName: "string" }] },
        { ElementName: "system", Type: [{ TypeName: "uri" }] },
        { ElementName: "code", Type: [{ TypeName: "code" }] },
    ],
};

export const Dosage: TypeModel = {
    TypeName: "Dosage",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "sequence", Type: [{ TypeName: "integer" }] },
        { ElementName: "text", Type: [{ TypeName: "string" }] },
        { ElementName: "additionalInstruction", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "patientInstruction", Type: [{ TypeName: "string" }] },
        { ElementName: "timing", Type: [{ TypeName: "Timing" }] },
        { ElementName: "asNeeded[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "boolean" }] },
        { ElementName: "site", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "route", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "method", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "doseAndRate", Type: [{ TypeName: "dosage_doseAndRate" }], IsArray: true },
        { ElementName: "maxDosePerPeriod", Type: [{ TypeName: "Ratio" }] },
        { ElementName: "maxDosePerAdministration", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "maxDosePerLifetime", Type: [{ TypeName: "Quantity" }] },
    ],
};

export const Duration: TypeModel = {
    TypeName: "Duration",
    BaseTypeName: "Quantity",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "value", Type: [{ TypeName: "decimal" }] },
        { ElementName: "comparator", Type: [{ TypeName: "code" }] },
        { ElementName: "unit", Type: [{ TypeName: "string" }] },
        { ElementName: "system", Type: [{ TypeName: "uri" }] },
        { ElementName: "code", Type: [{ TypeName: "code" }] },
    ],
};

export const Element: TypeModel = {
    TypeName: "Element",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
    ],
};

export const ElementDefinition: TypeModel = {
    TypeName: "ElementDefinition",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "path", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "representation", Type: [{ TypeName: "code" }], IsArray: true },
        { ElementName: "sliceName", Type: [{ TypeName: "string" }] },
        { ElementName: "sliceIsConstraining", Type: [{ TypeName: "boolean" }] },
        { ElementName: "label", Type: [{ TypeName: "string" }] },
        { ElementName: "code", Type: [{ TypeName: "Coding" }], IsArray: true },
        { ElementName: "slicing", Type: [{ TypeName: "elementdefinition_slicing" }] },
        { ElementName: "short", Type: [{ TypeName: "string" }] },
        { ElementName: "definition", Type: [{ TypeName: "markdown" }] },
        { ElementName: "comment", Type: [{ TypeName: "markdown" }] },
        { ElementName: "requirements", Type: [{ TypeName: "markdown" }] },
        { ElementName: "alias", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "min", Type: [{ TypeName: "unsignedInt" }] },
        { ElementName: "max", Type: [{ TypeName: "string" }] },
        { ElementName: "base", Type: [{ TypeName: "elementdefinition_base" }] },
        { ElementName: "contentReference", Type: [{ TypeName: "uri" }] },
        { ElementName: "type", Type: [{ TypeName: "elementdefinition_type" }], IsArray: true },
        { ElementName: "defaultValue[x]", Type: [{ TypeName: "Address" }, { TypeName: "Age" }, { TypeName: "Annotation" }, { TypeName: "Attachment" }, { TypeName: "CodeableConcept" }, { TypeName: "Coding" }, { TypeName: "ContactDetail" }, { TypeName: "ContactPoint" }, { TypeName: "Contributor" }, { TypeName: "Count" }, { TypeName: "DataRequirement" }, { TypeName: "Distance" }, { TypeName: "Dosage" }, { TypeName: "Duration" }, { TypeName: "Expression" }, { TypeName: "HumanName" }, { TypeName: "Identifier" }, { TypeName: "Meta" }, { TypeName: "Money" }, { TypeName: "ParameterDefinition" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "Reference" }, { TypeName: "RelatedArtifact" }, { TypeName: "SampledData" }, { TypeName: "Signature" }, { TypeName: "Timing" }, { TypeName: "TriggerDefinition" }, { TypeName: "UsageContext" }, { TypeName: "base64Binary" }, { TypeName: "boolean" }, { TypeName: "canonical" }, { TypeName: "code" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "id" }, { TypeName: "instant" }, { TypeName: "integer" }, { TypeName: "markdown" }, { TypeName: "oid" }, { TypeName: "positiveInt" }, { TypeName: "string" }, { TypeName: "time" }, { TypeName: "unsignedInt" }, { TypeName: "uri" }, { TypeName: "url" }, { TypeName: "uuid" }] },
        { ElementName: "meaningWhenMissing", Type: [{ TypeName: "markdown" }] },
        { ElementName: "orderMeaning", Type: [{ TypeName: "string" }] },
        { ElementName: "fixed[x]", Type: [{ TypeName: "Address" }, { TypeName: "Age" }, { TypeName: "Annotation" }, { TypeName: "Attachment" }, { TypeName: "CodeableConcept" }, { TypeName: "Coding" }, { TypeName: "ContactDetail" }, { TypeName: "ContactPoint" }, { TypeName: "Contributor" }, { TypeName: "Count" }, { TypeName: "DataRequirement" }, { TypeName: "Distance" }, { TypeName: "Dosage" }, { TypeName: "Duration" }, { TypeName: "Expression" }, { TypeName: "HumanName" }, { TypeName: "Identifier" }, { TypeName: "Meta" }, { TypeName: "Money" }, { TypeName: "ParameterDefinition" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "Reference" }, { TypeName: "RelatedArtifact" }, { TypeName: "SampledData" }, { TypeName: "Signature" }, { TypeName: "Timing" }, { TypeName: "TriggerDefinition" }, { TypeName: "UsageContext" }, { TypeName: "base64Binary" }, { TypeName: "boolean" }, { TypeName: "canonical" }, { TypeName: "code" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "id" }, { TypeName: "instant" }, { TypeName: "integer" }, { TypeName: "markdown" }, { TypeName: "oid" }, { TypeName: "positiveInt" }, { TypeName: "string" }, { TypeName: "time" }, { TypeName: "unsignedInt" }, { TypeName: "uri" }, { TypeName: "url" }, { TypeName: "uuid" }] },
        { ElementName: "pattern[x]", Type: [{ TypeName: "Address" }, { TypeName: "Age" }, { TypeName: "Annotation" }, { TypeName: "Attachment" }, { TypeName: "CodeableConcept" }, { TypeName: "Coding" }, { TypeName: "ContactDetail" }, { TypeName: "ContactPoint" }, { TypeName: "Contributor" }, { TypeName: "Count" }, { TypeName: "DataRequirement" }, { TypeName: "Distance" }, { TypeName: "Dosage" }, { TypeName: "Duration" }, { TypeName: "Expression" }, { TypeName: "HumanName" }, { TypeName: "Identifier" }, { TypeName: "Meta" }, { TypeName: "Money" }, { TypeName: "ParameterDefinition" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "Reference" }, { TypeName: "RelatedArtifact" }, { TypeName: "SampledData" }, { TypeName: "Signature" }, { TypeName: "Timing" }, { TypeName: "TriggerDefinition" }, { TypeName: "UsageContext" }, { TypeName: "base64Binary" }, { TypeName: "boolean" }, { TypeName: "canonical" }, { TypeName: "code" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "id" }, { TypeName: "instant" }, { TypeName: "integer" }, { TypeName: "markdown" }, { TypeName: "oid" }, { TypeName: "positiveInt" }, { TypeName: "string" }, { TypeName: "time" }, { TypeName: "unsignedInt" }, { TypeName: "uri" }, { TypeName: "url" }, { TypeName: "uuid" }] },
        { ElementName: "example", Type: [{ TypeName: "elementdefinition_example" }], IsArray: true },
        { ElementName: "minValue[x]", Type: [{ TypeName: "Quantity" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "instant" }, { TypeName: "integer" }, { TypeName: "positiveInt" }, { TypeName: "time" }, { TypeName: "unsignedInt" }] },
        { ElementName: "maxValue[x]", Type: [{ TypeName: "Quantity" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "instant" }, { TypeName: "integer" }, { TypeName: "positiveInt" }, { TypeName: "time" }, { TypeName: "unsignedInt" }] },
        { ElementName: "maxLength", Type: [{ TypeName: "integer" }] },
        { ElementName: "condition", Type: [{ TypeName: "id" }], IsArray: true },
        { ElementName: "constraint", Type: [{ TypeName: "elementdefinition_constraint" }], IsArray: true },
        { ElementName: "mustSupport", Type: [{ TypeName: "boolean" }] },
        { ElementName: "isModifier", Type: [{ TypeName: "boolean" }] },
        { ElementName: "isModifierReason", Type: [{ TypeName: "string" }] },
        { ElementName: "isSummary", Type: [{ TypeName: "boolean" }] },
        { ElementName: "binding", Type: [{ TypeName: "elementdefinition_binding" }] },
        { ElementName: "mapping", Type: [{ TypeName: "elementdefinition_mapping" }], IsArray: true },
    ],
};

export const Expression: TypeModel = {
    TypeName: "Expression",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "name", Type: [{ TypeName: "id" }] },
        { ElementName: "language", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "expression", Type: [{ TypeName: "string" }] },
        { ElementName: "reference", Type: [{ TypeName: "uri" }] },
    ],
};

export const Extension: TypeModel = {
    TypeName: "Extension",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "url", Type: [{ TypeName: "uri" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "Address" }, { TypeName: "Age" }, { TypeName: "Annotation" }, { TypeName: "Attachment" }, { TypeName: "CodeableConcept" }, { TypeName: "Coding" }, { TypeName: "ContactDetail" }, { TypeName: "ContactPoint" }, { TypeName: "Contributor" }, { TypeName: "Count" }, { TypeName: "DataRequirement" }, { TypeName: "Distance" }, { TypeName: "Dosage" }, { TypeName: "Duration" }, { TypeName: "Expression" }, { TypeName: "HumanName" }, { TypeName: "Identifier" }, { TypeName: "Meta" }, { TypeName: "Money" }, { TypeName: "ParameterDefinition" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "Reference" }, { TypeName: "RelatedArtifact" }, { TypeName: "SampledData" }, { TypeName: "Signature" }, { TypeName: "Timing" }, { TypeName: "TriggerDefinition" }, { TypeName: "UsageContext" }, { TypeName: "base64Binary" }, { TypeName: "boolean" }, { TypeName: "canonical" }, { TypeName: "code" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "id" }, { TypeName: "instant" }, { TypeName: "integer" }, { TypeName: "markdown" }, { TypeName: "oid" }, { TypeName: "positiveInt" }, { TypeName: "string" }, { TypeName: "time" }, { TypeName: "unsignedInt" }, { TypeName: "uri" }, { TypeName: "url" }, { TypeName: "uuid" }] },
    ],
};

export const HumanName: TypeModel = {
    TypeName: "HumanName",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "use", Type: [{ TypeName: "code" }] },
        { ElementName: "text", Type: [{ TypeName: "string" }] },
        { ElementName: "family", Type: [{ TypeName: "string" }] },
        { ElementName: "given", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "prefix", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "suffix", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
    ],
};

export const Identifier: TypeModel = {
    TypeName: "Identifier",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "use", Type: [{ TypeName: "code" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "system", Type: [{ TypeName: "uri" }] },
        { ElementName: "value", Type: [{ TypeName: "string" }] },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "assigner", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
    ],
};

export const MarketingStatus: TypeModel = {
    TypeName: "MarketingStatus",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "country", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "jurisdiction", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "status", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "dateRange", Type: [{ TypeName: "Period" }], Required: true },
        { ElementName: "restoreDate", Type: [{ TypeName: "dateTime" }] },
    ],
};

export const Meta: TypeModel = {
    TypeName: "Meta",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "versionId", Type: [{ TypeName: "id" }] },
        { ElementName: "lastUpdated", Type: [{ TypeName: "instant" }] },
        { ElementName: "source", Type: [{ TypeName: "uri" }] },
        { ElementName: "profile", Type: [{ TypeName: "canonical" }], IsArray: true },
        { ElementName: "security", Type: [{ TypeName: "Coding" }], IsArray: true },
        { ElementName: "tag", Type: [{ TypeName: "Coding" }], IsArray: true },
    ],
};

export const Money: TypeModel = {
    TypeName: "Money",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "value", Type: [{ TypeName: "decimal" }] },
        { ElementName: "currency", Type: [{ TypeName: "code" }] },
    ],
};

export const Narrative: TypeModel = {
    TypeName: "Narrative",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "div", Type: [{ TypeName: "xhtml" }], Required: true },
    ],
};

export const ParameterDefinition: TypeModel = {
    TypeName: "ParameterDefinition",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "name", Type: [{ TypeName: "code" }] },
        { ElementName: "use", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "min", Type: [{ TypeName: "integer" }] },
        { ElementName: "max", Type: [{ TypeName: "string" }] },
        { ElementName: "documentation", Type: [{ TypeName: "string" }] },
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "profile", Type: [{ TypeName: "canonical" }] },
    ],
};

export const Period: TypeModel = {
    TypeName: "Period",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "start", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "end", Type: [{ TypeName: "dateTime" }] },
    ],
};

export const Population: TypeModel = {
    TypeName: "Population",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "age[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Range" }] },
        { ElementName: "gender", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "race", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "physiologicalCondition", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const ProdCharacteristic: TypeModel = {
    TypeName: "ProdCharacteristic",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "height", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "width", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "depth", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "weight", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "nominalVolume", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "externalDiameter", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "shape", Type: [{ TypeName: "string" }] },
        { ElementName: "color", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "imprint", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "image", Type: [{ TypeName: "Attachment" }], IsArray: true },
        { ElementName: "scoring", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const ProductShelfLife: TypeModel = {
    TypeName: "ProductShelfLife",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "period", Type: [{ TypeName: "Quantity" }], Required: true },
        { ElementName: "specialPrecautionsForStorage", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
    ],
};

export const Quantity: TypeModel = {
    TypeName: "Quantity",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "value", Type: [{ TypeName: "decimal" }] },
        { ElementName: "comparator", Type: [{ TypeName: "code" }] },
        { ElementName: "unit", Type: [{ TypeName: "string" }] },
        { ElementName: "system", Type: [{ TypeName: "uri" }] },
        { ElementName: "code", Type: [{ TypeName: "code" }] },
    ],
};

export const Range: TypeModel = {
    TypeName: "Range",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "low", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "high", Type: [{ TypeName: "Quantity" }] },
    ],
};

export const Ratio: TypeModel = {
    TypeName: "Ratio",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "numerator", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "denominator", Type: [{ TypeName: "Quantity" }] },
    ],
};

export const Reference: TypeModel = {
    TypeName: "Reference",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "reference", Type: [{ TypeName: "string" }] },
        { ElementName: "type", Type: [{ TypeName: "uri" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "display", Type: [{ TypeName: "string" }] },
    ],
};

export const RelatedArtifact: TypeModel = {
    TypeName: "RelatedArtifact",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "label", Type: [{ TypeName: "string" }] },
        { ElementName: "display", Type: [{ TypeName: "string" }] },
        { ElementName: "citation", Type: [{ TypeName: "markdown" }] },
        { ElementName: "url", Type: [{ TypeName: "url" }] },
        { ElementName: "document", Type: [{ TypeName: "Attachment" }] },
        { ElementName: "resource", Type: [{ TypeName: "canonical" }] },
    ],
};

export const SampledData: TypeModel = {
    TypeName: "SampledData",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "origin", Type: [{ TypeName: "Quantity" }], Required: true },
        { ElementName: "period", Type: [{ TypeName: "decimal" }], Required: true },
        { ElementName: "factor", Type: [{ TypeName: "decimal" }] },
        { ElementName: "lowerLimit", Type: [{ TypeName: "decimal" }] },
        { ElementName: "upperLimit", Type: [{ TypeName: "decimal" }] },
        { ElementName: "dimensions", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "data", Type: [{ TypeName: "string" }] },
    ],
};

export const Signature: TypeModel = {
    TypeName: "Signature",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "Coding" }], IsArray: true, Required: true },
        { ElementName: "when", Type: [{ TypeName: "instant" }], Required: true },
        { ElementName: "who", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }], Required: true },
        { ElementName: "onBehalfOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "targetFormat", Type: [{ TypeName: "code" }] },
        { ElementName: "sigFormat", Type: [{ TypeName: "code" }] },
        { ElementName: "data", Type: [{ TypeName: "base64Binary" }] },
    ],
};

export const SubstanceAmount: TypeModel = {
    TypeName: "SubstanceAmount",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "amount[x]", Type: [{ TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "string" }] },
        { ElementName: "amountType", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "amountText", Type: [{ TypeName: "string" }] },
        { ElementName: "referenceRange", Type: [{ TypeName: "substanceamount_referenceRange" }] },
    ],
};

export const Timing: TypeModel = {
    TypeName: "Timing",
    BaseTypeName: "BackboneElement",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "event", Type: [{ TypeName: "dateTime" }], IsArray: true },
        { ElementName: "repeat", Type: [{ TypeName: "timing_repeat" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const TriggerDefinition: TypeModel = {
    TypeName: "TriggerDefinition",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "timing[x]", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Schedule"] }, { TypeName: "Timing" }, { TypeName: "date" }, { TypeName: "dateTime" }] },
        { ElementName: "data", Type: [{ TypeName: "DataRequirement" }], IsArray: true },
        { ElementName: "condition", Type: [{ TypeName: "Expression" }] },
    ],
};

export const UsageContext: TypeModel = {
    TypeName: "UsageContext",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "Coding" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/InsurancePlan", "http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/PlanDefinition", "http://hl7.org/fhir/StructureDefinition/ResearchStudy"] }], Required: true },
    ],
};

export const byUrl: Readonly<Record<string, TypeModel>> = Object.freeze({
    "http://hl7.org/fhir/StructureDefinition/Address": Address,
    "http://hl7.org/fhir/StructureDefinition/Age": Age,
    "http://hl7.org/fhir/StructureDefinition/Annotation": Annotation,
    "http://hl7.org/fhir/StructureDefinition/Attachment": Attachment,
    "http://hl7.org/fhir/StructureDefinition/BackboneElement": BackboneElement,
    "http://hl7.org/fhir/StructureDefinition/CodeableConcept": CodeableConcept,
    "http://hl7.org/fhir/StructureDefinition/Coding": Coding,
    "http://hl7.org/fhir/StructureDefinition/ContactDetail": ContactDetail,
    "http://hl7.org/fhir/StructureDefinition/ContactPoint": ContactPoint,
    "http://hl7.org/fhir/StructureDefinition/Contributor": Contributor,
    "http://hl7.org/fhir/StructureDefinition/Count": Count,
    "http://hl7.org/fhir/StructureDefinition/DataRequirement": DataRequirement,
    "http://hl7.org/fhir/StructureDefinition/Distance": Distance,
    "http://hl7.org/fhir/StructureDefinition/Dosage": Dosage,
    "http://hl7.org/fhir/StructureDefinition/Duration": Duration,
    "http://hl7.org/fhir/StructureDefinition/Element": Element,
    "http://hl7.org/fhir/StructureDefinition/ElementDefinition": ElementDefinition,
    "http://hl7.org/fhir/StructureDefinition/Expression": Expression,
    "http://hl7.org/fhir/StructureDefinition/Extension": Extension,
    "http://hl7.org/fhir/StructureDefinition/HumanName": HumanName,
    "http://hl7.org/fhir/StructureDefinition/Identifier": Identifier,
    "http://hl7.org/fhir/StructureDefinition/MarketingStatus": MarketingStatus,
    "http://hl7.org/fhir/StructureDefinition/Meta": Meta,
    "http://hl7.org/fhir/StructureDefinition/Money": Money,
    "http://hl7.org/fhir/StructureDefinition/Narrative": Narrative,
    "http://hl7.org/fhir/StructureDefinition/ParameterDefinition": ParameterDefinition,
    "http://hl7.org/fhir/StructureDefinition/Period": Period,
    "http://hl7.org/fhir/StructureDefinition/Population": Population,
    "http://hl7.org/fhir/StructureDefinition/ProdCharacteristic": ProdCharacteristic,
    "http://hl7.org/fhir/StructureDefinition/ProductShelfLife": ProductShelfLife,
    "http://hl7.org/fhir/StructureDefinition/Quantity": Quantity,
    "http://hl7.org/fhir/StructureDefinition/Range": Range,
    "http://hl7.org/fhir/StructureDefinition/Ratio": Ratio,
    "http://hl7.org/fhir/StructureDefinition/Reference": Reference,
    "http://hl7.org/fhir/StructureDefinition/RelatedArtifact": RelatedArtifact,
    "http://hl7.org/fhir/StructureDefinition/SampledData": SampledData,
    "http://hl7.org/fhir/StructureDefinition/Signature": Signature,
    "http://hl7.org/fhir/StructureDefinition/SubstanceAmount": SubstanceAmount,
    "http://hl7.org/fhir/StructureDefinition/Timing": Timing,
    "http://hl7.org/fhir/StructureDefinition/TriggerDefinition": TriggerDefinition,
    "http://hl7.org/fhir/StructureDefinition/UsageContext": UsageContext,
});

export const byTypeName: Readonly<Record<string, TypeModel>> = Object.freeze({
    "Address": Address,
    "Age": Age,
    "Annotation": Annotation,
    "Attachment": Attachment,
    "BackboneElement": BackboneElement,
    "CodeableConcept": CodeableConcept,
    "Coding": Coding,
    "ContactDetail": ContactDetail,
    "ContactPoint": ContactPoint,
    "Contributor": Contributor,
    "Count": Count,
    "DataRequirement": DataRequirement,
    "Distance": Distance,
    "Dosage": Dosage,
    "Duration": Duration,
    "Element": Element,
    "ElementDefinition": ElementDefinition,
    "Expression": Expression,
    "Extension": Extension,
    "HumanName": HumanName,
    "Identifier": Identifier,
    "MarketingStatus": MarketingStatus,
    "Meta": Meta,
    "Money": Money,
    "Narrative": Narrative,
    "ParameterDefinition": ParameterDefinition,
    "Period": Period,
    "Population": Population,
    "ProdCharacteristic": ProdCharacteristic,
    "ProductShelfLife": ProductShelfLife,
    "Quantity": Quantity,
    "Range": Range,
    "Ratio": Ratio,
    "Reference": Reference,
    "RelatedArtifact": RelatedArtifact,
    "SampledData": SampledData,
    "Signature": Signature,
    "SubstanceAmount": SubstanceAmount,
    "Timing": Timing,
    "TriggerDefinition": TriggerDefinition,
    "UsageContext": UsageContext,
});
