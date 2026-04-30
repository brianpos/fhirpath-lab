// THIS FILE IS GENERATED — DO NOT EDIT BY HAND.
// Run `npm run generate:models -- --version <r4|r4b|r5|r6>` to regenerate.
// See docs/custom-model-generator-plan.md.

import type { TypeModel } from "../../../custom_model";

// FHIR complex types (with their backbone elements)

export const Address: TypeModel = {
    TypeName: "Address",
    BaseTypeName: "DataType",
    Elements: [
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
    Elements: [],
};

export const Annotation: TypeModel = {
    TypeName: "Annotation",
    BaseTypeName: "DataType",
    Elements: [
        { ElementName: "author[x]", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }, { TypeName: "string" }] },
        { ElementName: "time", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "text", Type: [{ TypeName: "markdown" }], Required: true },
    ],
};

export const Attachment: TypeModel = {
    TypeName: "Attachment",
    BaseTypeName: "DataType",
    Elements: [
        { ElementName: "contentType", Type: [{ TypeName: "code" }] },
        { ElementName: "language", Type: [{ TypeName: "code" }] },
        { ElementName: "data", Type: [{ TypeName: "base64Binary" }] },
        { ElementName: "url", Type: [{ TypeName: "url" }] },
        { ElementName: "size", Type: [{ TypeName: "integer64" }] },
        { ElementName: "hash", Type: [{ TypeName: "base64Binary" }] },
        { ElementName: "title", Type: [{ TypeName: "string" }] },
        { ElementName: "creation", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "height", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "width", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "frames", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "duration", Type: [{ TypeName: "decimal" }] },
        { ElementName: "pages", Type: [{ TypeName: "positiveInt" }] },
    ],
};

export const Availability: TypeModel = {
    TypeName: "Availability",
    BaseTypeName: "DataType",
    Elements: [
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "availableTime", Type: [{ TypeName: "availability_availableTime" }], IsArray: true },
        { ElementName: "notAvailableTime", Type: [{ TypeName: "availability_notAvailableTime" }], IsArray: true },
    ],
};

export const availability_availableTime: TypeModel = {
    TypeName: "availability_availableTime",
    BaseTypeName: "Element",
    Elements: [
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
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "during", Type: [{ TypeName: "Period" }] },
    ],
};

export const BackboneElement: TypeModel = {
    TypeName: "BackboneElement",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
    ],
};

export const BackboneType: TypeModel = {
    TypeName: "BackboneType",
    BaseTypeName: "DataType",
    Elements: [
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
    ],
};

export const Base: TypeModel = {
    TypeName: "Base",
    Elements: [],
};

export const CodeableConcept: TypeModel = {
    TypeName: "CodeableConcept",
    BaseTypeName: "DataType",
    Elements: [
        { ElementName: "coding", Type: [{ TypeName: "Coding" }], IsArray: true },
        { ElementName: "text", Type: [{ TypeName: "string" }] },
    ],
};

export const CodeableReference: TypeModel = {
    TypeName: "CodeableReference",
    BaseTypeName: "DataType",
    Elements: [
        { ElementName: "concept", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "reference", Type: [{ TypeName: "Reference" }] },
    ],
};

export const Coding: TypeModel = {
    TypeName: "Coding",
    BaseTypeName: "DataType",
    Elements: [
        { ElementName: "system", Type: [{ TypeName: "uri" }] },
        { ElementName: "version", Type: [{ TypeName: "string" }] },
        { ElementName: "code", Type: [{ TypeName: "code" }] },
        { ElementName: "display", Type: [{ TypeName: "string" }] },
        { ElementName: "userSelected", Type: [{ TypeName: "boolean" }] },
    ],
};

export const ContactDetail: TypeModel = {
    TypeName: "ContactDetail",
    BaseTypeName: "DataType",
    Elements: [
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "telecom", Type: [{ TypeName: "ContactPoint" }], IsArray: true },
    ],
};

export const ContactPoint: TypeModel = {
    TypeName: "ContactPoint",
    BaseTypeName: "DataType",
    Elements: [
        { ElementName: "system", Type: [{ TypeName: "code" }] },
        { ElementName: "value", Type: [{ TypeName: "string" }] },
        { ElementName: "use", Type: [{ TypeName: "code" }] },
        { ElementName: "rank", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
    ],
};

export const Count: TypeModel = {
    TypeName: "Count",
    BaseTypeName: "Quantity",
    Elements: [],
};

export const DataRequirement: TypeModel = {
    TypeName: "DataRequirement",
    BaseTypeName: "DataType",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "profile", Type: [{ TypeName: "canonical" }], IsArray: true },
        { ElementName: "subject[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group"] }] },
        { ElementName: "mustSupport", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "codeFilter", Type: [{ TypeName: "datarequirement_codeFilter" }], IsArray: true },
        { ElementName: "dateFilter", Type: [{ TypeName: "datarequirement_dateFilter" }], IsArray: true },
        { ElementName: "valueFilter", Type: [{ TypeName: "datarequirement_valueFilter" }], IsArray: true },
        { ElementName: "limit", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "sort", Type: [{ TypeName: "datarequirement_sort" }], IsArray: true },
    ],
};

export const datarequirement_codeFilter: TypeModel = {
    TypeName: "datarequirement_codeFilter",
    BaseTypeName: "Element",
    Elements: [
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
        { ElementName: "path", Type: [{ TypeName: "string" }] },
        { ElementName: "searchParam", Type: [{ TypeName: "string" }] },
        { ElementName: "value[x]", Type: [{ TypeName: "Duration" }, { TypeName: "Period" }, { TypeName: "dateTime" }] },
    ],
};

export const datarequirement_valueFilter: TypeModel = {
    TypeName: "datarequirement_valueFilter",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "path", Type: [{ TypeName: "string" }] },
        { ElementName: "searchParam", Type: [{ TypeName: "string" }] },
        { ElementName: "comparator", Type: [{ TypeName: "code" }] },
        { ElementName: "value[x]", Type: [{ TypeName: "Duration" }, { TypeName: "Period" }, { TypeName: "dateTime" }] },
    ],
};

export const datarequirement_sort: TypeModel = {
    TypeName: "datarequirement_sort",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "path", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "direction", Type: [{ TypeName: "code" }], Required: true },
    ],
};

export const DataType: TypeModel = {
    TypeName: "DataType",
    BaseTypeName: "Element",
    Elements: [],
};

export const Distance: TypeModel = {
    TypeName: "Distance",
    BaseTypeName: "Quantity",
    Elements: [],
};

export const Dosage: TypeModel = {
    TypeName: "Dosage",
    BaseTypeName: "BackboneType",
    Elements: [
        { ElementName: "condition", Type: [{ TypeName: "DosageCondition" }], IsArray: true },
        { ElementName: "text", Type: [{ TypeName: "string" }] },
        { ElementName: "additionalInstruction", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "patientInstruction", Type: [{ TypeName: "string" }] },
        { ElementName: "timing", Type: [{ TypeName: "Timing" }] },
        { ElementName: "asNeeded", Type: [{ TypeName: "boolean" }] },
        { ElementName: "asNeededFor", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "site", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "route", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "method", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "doseAndRate", Type: [{ TypeName: "dosage_doseAndRate" }], IsArray: true },
        { ElementName: "safety", Type: [{ TypeName: "DosageSafety" }] },
    ],
};

export const dosage_doseAndRate: TypeModel = {
    TypeName: "dosage_doseAndRate",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "dose[x]", Type: [{ TypeName: "Expression" }, { TypeName: "Quantity" }, { TypeName: "Range" }] },
        { ElementName: "rate[x]", Type: [{ TypeName: "Expression" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }] },
    ],
};

export const DosageCondition: TypeModel = {
    TypeName: "DosageCondition",
    BaseTypeName: "BackboneType",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "details", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "operation", Type: [{ TypeName: "code" }] },
        { ElementName: "value[x]", Type: [{ TypeName: "Address" }, { TypeName: "Age" }, { TypeName: "Annotation" }, { TypeName: "Attachment" }, { TypeName: "Availability" }, { TypeName: "CodeableConcept" }, { TypeName: "CodeableReference" }, { TypeName: "Coding" }, { TypeName: "ContactDetail" }, { TypeName: "ContactPoint" }, { TypeName: "Count" }, { TypeName: "DataRequirement" }, { TypeName: "Distance" }, { TypeName: "Dosage" }, { TypeName: "Duration" }, { TypeName: "Expression" }, { TypeName: "ExtendedContactDetail" }, { TypeName: "HumanName" }, { TypeName: "Identifier" }, { TypeName: "Meta" }, { TypeName: "Money" }, { TypeName: "ParameterDefinition" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "RatioRange" }, { TypeName: "Reference" }, { TypeName: "RelatedArtifact" }, { TypeName: "SampledData" }, { TypeName: "Signature" }, { TypeName: "Timing" }, { TypeName: "TriggerDefinition" }, { TypeName: "UsageContext" }, { TypeName: "VirtualServiceDetail" }, { TypeName: "base64Binary" }, { TypeName: "boolean" }, { TypeName: "canonical" }, { TypeName: "code" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "id" }, { TypeName: "instant" }, { TypeName: "integer" }, { TypeName: "integer64" }, { TypeName: "markdown" }, { TypeName: "oid" }, { TypeName: "positiveInt" }, { TypeName: "string" }, { TypeName: "time" }, { TypeName: "unsignedInt" }, { TypeName: "uri" }, { TypeName: "url" }, { TypeName: "uuid" }] },
        { ElementName: "text", Type: [{ TypeName: "string" }] },
    ],
};

export const DosageDetails: TypeModel = {
    TypeName: "DosageDetails",
    BaseTypeName: "BackboneType",
    Elements: [
        { ElementName: "renderedInstruction", Type: [{ TypeName: "markdown" }] },
        { ElementName: "simple", Type: [{ TypeName: "Dosage" }] },
        { ElementName: "step", Type: [{ TypeName: "dosagedetails_step" }], IsArray: true },
        { ElementName: "safety", Type: [{ TypeName: "DosageSafety" }] },
    ],
};

export const dosagedetails_step: TypeModel = {
    TypeName: "dosagedetails_step",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "start", Type: [{ TypeName: "RelativeTime" }] },
        { ElementName: "end", Type: [{ TypeName: "RelativeTime" }] },
        { ElementName: "count", Type: [{ TypeName: "integer" }] },
        { ElementName: "component", Type: [{ TypeName: "Dosage" }], IsArray: true, Required: true },
        { ElementName: "safety", Type: [{ TypeName: "DosageSafety" }] },
    ],
};

export const DosageSafety: TypeModel = {
    TypeName: "DosageSafety",
    BaseTypeName: "BackboneType",
    Elements: [
        { ElementName: "doseLimit", Type: [{ TypeName: "dosagesafety_doseLimit" }], IsArray: true },
        { ElementName: "ifExceeded", Type: [{ TypeName: "string" }] },
    ],
};

export const dosagesafety_doseLimit: TypeModel = {
    TypeName: "dosagesafety_doseLimit",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "value[x]", Type: [{ TypeName: "Expression" }, { TypeName: "Quantity" }, { TypeName: "integer" }], Required: true },
        { ElementName: "scope", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "period", Type: [{ TypeName: "Duration" }] },
        { ElementName: "text", Type: [{ TypeName: "string" }] },
    ],
};

export const Duration: TypeModel = {
    TypeName: "Duration",
    BaseTypeName: "Quantity",
    Elements: [],
};

export const Element: TypeModel = {
    TypeName: "Element",
    BaseTypeName: "Base",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
    ],
};

export const ElementDefinition: TypeModel = {
    TypeName: "ElementDefinition",
    BaseTypeName: "BackboneType",
    Elements: [
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
        { ElementName: "defaultValue[x]", Type: [{ TypeName: "Address" }, { TypeName: "Age" }, { TypeName: "Annotation" }, { TypeName: "Attachment" }, { TypeName: "Availability" }, { TypeName: "CodeableConcept" }, { TypeName: "CodeableReference" }, { TypeName: "Coding" }, { TypeName: "ContactDetail" }, { TypeName: "ContactPoint" }, { TypeName: "Count" }, { TypeName: "DataRequirement" }, { TypeName: "Distance" }, { TypeName: "Dosage" }, { TypeName: "Duration" }, { TypeName: "Expression" }, { TypeName: "ExtendedContactDetail" }, { TypeName: "HumanName" }, { TypeName: "Identifier" }, { TypeName: "Meta" }, { TypeName: "Money" }, { TypeName: "ParameterDefinition" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "RatioRange" }, { TypeName: "Reference" }, { TypeName: "RelatedArtifact" }, { TypeName: "SampledData" }, { TypeName: "Signature" }, { TypeName: "Timing" }, { TypeName: "TriggerDefinition" }, { TypeName: "UsageContext" }, { TypeName: "VirtualServiceDetail" }, { TypeName: "base64Binary" }, { TypeName: "boolean" }, { TypeName: "canonical" }, { TypeName: "code" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "id" }, { TypeName: "instant" }, { TypeName: "integer" }, { TypeName: "integer64" }, { TypeName: "markdown" }, { TypeName: "oid" }, { TypeName: "positiveInt" }, { TypeName: "string" }, { TypeName: "time" }, { TypeName: "unsignedInt" }, { TypeName: "uri" }, { TypeName: "url" }, { TypeName: "uuid" }] },
        { ElementName: "meaningWhenMissing", Type: [{ TypeName: "markdown" }] },
        { ElementName: "orderMeaning", Type: [{ TypeName: "string" }] },
        { ElementName: "fixed[x]", Type: [{ TypeName: "Address" }, { TypeName: "Age" }, { TypeName: "Annotation" }, { TypeName: "Attachment" }, { TypeName: "Availability" }, { TypeName: "CodeableConcept" }, { TypeName: "CodeableReference" }, { TypeName: "Coding" }, { TypeName: "ContactDetail" }, { TypeName: "ContactPoint" }, { TypeName: "Count" }, { TypeName: "DataRequirement" }, { TypeName: "Distance" }, { TypeName: "Dosage" }, { TypeName: "Duration" }, { TypeName: "Expression" }, { TypeName: "ExtendedContactDetail" }, { TypeName: "HumanName" }, { TypeName: "Identifier" }, { TypeName: "Meta" }, { TypeName: "Money" }, { TypeName: "ParameterDefinition" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "RatioRange" }, { TypeName: "Reference" }, { TypeName: "RelatedArtifact" }, { TypeName: "SampledData" }, { TypeName: "Signature" }, { TypeName: "Timing" }, { TypeName: "TriggerDefinition" }, { TypeName: "UsageContext" }, { TypeName: "VirtualServiceDetail" }, { TypeName: "base64Binary" }, { TypeName: "boolean" }, { TypeName: "canonical" }, { TypeName: "code" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "id" }, { TypeName: "instant" }, { TypeName: "integer" }, { TypeName: "integer64" }, { TypeName: "markdown" }, { TypeName: "oid" }, { TypeName: "positiveInt" }, { TypeName: "string" }, { TypeName: "time" }, { TypeName: "unsignedInt" }, { TypeName: "uri" }, { TypeName: "url" }, { TypeName: "uuid" }] },
        { ElementName: "pattern[x]", Type: [{ TypeName: "Address" }, { TypeName: "Age" }, { TypeName: "Annotation" }, { TypeName: "Attachment" }, { TypeName: "Availability" }, { TypeName: "CodeableConcept" }, { TypeName: "CodeableReference" }, { TypeName: "Coding" }, { TypeName: "ContactDetail" }, { TypeName: "ContactPoint" }, { TypeName: "Count" }, { TypeName: "DataRequirement" }, { TypeName: "Distance" }, { TypeName: "Dosage" }, { TypeName: "Duration" }, { TypeName: "Expression" }, { TypeName: "ExtendedContactDetail" }, { TypeName: "HumanName" }, { TypeName: "Identifier" }, { TypeName: "Meta" }, { TypeName: "Money" }, { TypeName: "ParameterDefinition" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "RatioRange" }, { TypeName: "Reference" }, { TypeName: "RelatedArtifact" }, { TypeName: "SampledData" }, { TypeName: "Signature" }, { TypeName: "Timing" }, { TypeName: "TriggerDefinition" }, { TypeName: "UsageContext" }, { TypeName: "VirtualServiceDetail" }, { TypeName: "base64Binary" }, { TypeName: "boolean" }, { TypeName: "canonical" }, { TypeName: "code" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "id" }, { TypeName: "instant" }, { TypeName: "integer" }, { TypeName: "integer64" }, { TypeName: "markdown" }, { TypeName: "oid" }, { TypeName: "positiveInt" }, { TypeName: "string" }, { TypeName: "time" }, { TypeName: "unsignedInt" }, { TypeName: "uri" }, { TypeName: "url" }, { TypeName: "uuid" }] },
        { ElementName: "example", Type: [{ TypeName: "elementdefinition_example" }], IsArray: true },
        { ElementName: "minValue[x]", Type: [{ TypeName: "Quantity" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "instant" }, { TypeName: "integer" }, { TypeName: "integer64" }, { TypeName: "positiveInt" }, { TypeName: "time" }, { TypeName: "unsignedInt" }] },
        { ElementName: "maxValue[x]", Type: [{ TypeName: "Quantity" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "instant" }, { TypeName: "integer" }, { TypeName: "integer64" }, { TypeName: "positiveInt" }, { TypeName: "time" }, { TypeName: "unsignedInt" }] },
        { ElementName: "maxLength", Type: [{ TypeName: "integer" }] },
        { ElementName: "condition", Type: [{ TypeName: "id" }], IsArray: true },
        { ElementName: "constraint", Type: [{ TypeName: "elementdefinition_constraint" }], IsArray: true },
        { ElementName: "mustHaveValue", Type: [{ TypeName: "boolean" }] },
        { ElementName: "valueAlternatives", Type: [{ TypeName: "canonical" }], IsArray: true },
        { ElementName: "mustSupport", Type: [{ TypeName: "boolean" }] },
        { ElementName: "isModifier", Type: [{ TypeName: "boolean" }] },
        { ElementName: "isModifierReason", Type: [{ TypeName: "string" }] },
        { ElementName: "isSummary", Type: [{ TypeName: "boolean" }] },
        { ElementName: "binding", Type: [{ TypeName: "elementdefinition_binding" }] },
        { ElementName: "mapping", Type: [{ TypeName: "elementdefinition_mapping" }], IsArray: true },
    ],
};

export const elementdefinition_slicing: TypeModel = {
    TypeName: "elementdefinition_slicing",
    BaseTypeName: "Element",
    Elements: [
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
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "path", Type: [{ TypeName: "string" }], Required: true },
    ],
};

export const elementdefinition_base: TypeModel = {
    TypeName: "elementdefinition_base",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "path", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "min", Type: [{ TypeName: "unsignedInt" }], Required: true },
        { ElementName: "max", Type: [{ TypeName: "string" }], Required: true },
    ],
};

export const elementdefinition_type: TypeModel = {
    TypeName: "elementdefinition_type",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "uri" }], Required: true },
        { ElementName: "profile", Type: [{ TypeName: "canonical" }], IsArray: true },
        { ElementName: "targetProfile", Type: [{ TypeName: "canonical" }], IsArray: true },
        { ElementName: "aggregation", Type: [{ TypeName: "code" }], IsArray: true },
        { ElementName: "versioning", Type: [{ TypeName: "code" }] },
    ],
};

export const elementdefinition_example: TypeModel = {
    TypeName: "elementdefinition_example",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "label", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "Address" }, { TypeName: "Age" }, { TypeName: "Annotation" }, { TypeName: "Attachment" }, { TypeName: "Availability" }, { TypeName: "CodeableConcept" }, { TypeName: "CodeableReference" }, { TypeName: "Coding" }, { TypeName: "ContactDetail" }, { TypeName: "ContactPoint" }, { TypeName: "Count" }, { TypeName: "DataRequirement" }, { TypeName: "Distance" }, { TypeName: "Dosage" }, { TypeName: "Duration" }, { TypeName: "Expression" }, { TypeName: "ExtendedContactDetail" }, { TypeName: "HumanName" }, { TypeName: "Identifier" }, { TypeName: "Meta" }, { TypeName: "Money" }, { TypeName: "ParameterDefinition" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "RatioRange" }, { TypeName: "Reference" }, { TypeName: "RelatedArtifact" }, { TypeName: "SampledData" }, { TypeName: "Signature" }, { TypeName: "Timing" }, { TypeName: "TriggerDefinition" }, { TypeName: "UsageContext" }, { TypeName: "VirtualServiceDetail" }, { TypeName: "base64Binary" }, { TypeName: "boolean" }, { TypeName: "canonical" }, { TypeName: "code" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "id" }, { TypeName: "instant" }, { TypeName: "integer" }, { TypeName: "integer64" }, { TypeName: "markdown" }, { TypeName: "oid" }, { TypeName: "positiveInt" }, { TypeName: "string" }, { TypeName: "time" }, { TypeName: "unsignedInt" }, { TypeName: "uri" }, { TypeName: "url" }, { TypeName: "uuid" }], Required: true },
    ],
};

export const elementdefinition_constraint: TypeModel = {
    TypeName: "elementdefinition_constraint",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "key", Type: [{ TypeName: "id" }], Required: true },
        { ElementName: "requirements", Type: [{ TypeName: "markdown" }] },
        { ElementName: "severity", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "suppress", Type: [{ TypeName: "boolean" }] },
        { ElementName: "human", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "expression", Type: [{ TypeName: "string" }] },
        { ElementName: "source", Type: [{ TypeName: "canonical" }] },
    ],
};

export const elementdefinition_binding: TypeModel = {
    TypeName: "elementdefinition_binding",
    BaseTypeName: "Element",
    Elements: [
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
        { ElementName: "key", Type: [{ TypeName: "id" }] },
        { ElementName: "purpose", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "valueSet", Type: [{ TypeName: "canonical" }], Required: true },
        { ElementName: "documentation", Type: [{ TypeName: "markdown" }] },
        { ElementName: "shortDoco", Type: [{ TypeName: "string" }] },
        { ElementName: "usage", Type: [{ TypeName: "UsageContext" }], IsArray: true },
        { ElementName: "any", Type: [{ TypeName: "boolean" }] },
    ],
};

export const elementdefinition_mapping: TypeModel = {
    TypeName: "elementdefinition_mapping",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "identity", Type: [{ TypeName: "id" }], Required: true },
        { ElementName: "language", Type: [{ TypeName: "code" }] },
        { ElementName: "map", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "comment", Type: [{ TypeName: "markdown" }] },
    ],
};

export const Expression: TypeModel = {
    TypeName: "Expression",
    BaseTypeName: "DataType",
    Elements: [
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "name", Type: [{ TypeName: "code" }] },
        { ElementName: "language", Type: [{ TypeName: "code" }] },
        { ElementName: "expression", Type: [{ TypeName: "string" }] },
        { ElementName: "reference", Type: [{ TypeName: "uri" }] },
    ],
};

export const ExtendedContactDetail: TypeModel = {
    TypeName: "ExtendedContactDetail",
    BaseTypeName: "DataType",
    Elements: [
        { ElementName: "purpose", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "name", Type: [{ TypeName: "HumanName" }], IsArray: true },
        { ElementName: "telecom", Type: [{ TypeName: "ContactPoint" }], IsArray: true },
        { ElementName: "address", Type: [{ TypeName: "Address" }] },
        { ElementName: "organization", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
    ],
};

export const Extension: TypeModel = {
    TypeName: "Extension",
    BaseTypeName: "DataType",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "Address" }, { TypeName: "Age" }, { TypeName: "Annotation" }, { TypeName: "Attachment" }, { TypeName: "Availability" }, { TypeName: "CodeableConcept" }, { TypeName: "CodeableReference" }, { TypeName: "Coding" }, { TypeName: "ContactDetail" }, { TypeName: "ContactPoint" }, { TypeName: "Count" }, { TypeName: "DataRequirement" }, { TypeName: "Distance" }, { TypeName: "Dosage" }, { TypeName: "Duration" }, { TypeName: "Expression" }, { TypeName: "ExtendedContactDetail" }, { TypeName: "HumanName" }, { TypeName: "Identifier" }, { TypeName: "Meta" }, { TypeName: "Money" }, { TypeName: "ParameterDefinition" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "RatioRange" }, { TypeName: "Reference" }, { TypeName: "RelatedArtifact" }, { TypeName: "SampledData" }, { TypeName: "Signature" }, { TypeName: "Timing" }, { TypeName: "TriggerDefinition" }, { TypeName: "UsageContext" }, { TypeName: "VirtualServiceDetail" }, { TypeName: "base64Binary" }, { TypeName: "boolean" }, { TypeName: "canonical" }, { TypeName: "code" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "id" }, { TypeName: "instant" }, { TypeName: "integer" }, { TypeName: "integer64" }, { TypeName: "markdown" }, { TypeName: "oid" }, { TypeName: "positiveInt" }, { TypeName: "string" }, { TypeName: "time" }, { TypeName: "unsignedInt" }, { TypeName: "uri" }, { TypeName: "url" }, { TypeName: "uuid" }] },
    ],
};

export const HumanName: TypeModel = {
    TypeName: "HumanName",
    BaseTypeName: "DataType",
    Elements: [
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
    BaseTypeName: "DataType",
    Elements: [
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
    BaseTypeName: "BackboneType",
    Elements: [
        { ElementName: "country", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "jurisdiction", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "status", Type: [{ TypeName: "CodeableConcept" }], Required: true },
        { ElementName: "dateRange", Type: [{ TypeName: "Period" }] },
        { ElementName: "restoreDate", Type: [{ TypeName: "dateTime" }] },
    ],
};

export const Meta: TypeModel = {
    TypeName: "Meta",
    BaseTypeName: "DataType",
    Elements: [
        { ElementName: "versionId", Type: [{ TypeName: "id" }] },
        { ElementName: "lastUpdated", Type: [{ TypeName: "instant" }] },
        { ElementName: "source", Type: [{ TypeName: "uri" }] },
        { ElementName: "profile", Type: [{ TypeName: "canonical" }], IsArray: true },
        { ElementName: "security", Type: [{ TypeName: "Coding" }], IsArray: true },
        { ElementName: "tag", Type: [{ TypeName: "Coding" }], IsArray: true },
    ],
};

export const MonetaryComponent: TypeModel = {
    TypeName: "MonetaryComponent",
    BaseTypeName: "DataType",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "factor", Type: [{ TypeName: "decimal" }] },
        { ElementName: "amount", Type: [{ TypeName: "Money" }] },
    ],
};

export const Money: TypeModel = {
    TypeName: "Money",
    BaseTypeName: "DataType",
    Elements: [
        { ElementName: "value", Type: [{ TypeName: "decimal" }] },
        { ElementName: "currency", Type: [{ TypeName: "code" }] },
    ],
};

export const Narrative: TypeModel = {
    TypeName: "Narrative",
    BaseTypeName: "DataType",
    Elements: [
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "div", Type: [{ TypeName: "xhtml" }], Required: true },
    ],
};

export const ParameterDefinition: TypeModel = {
    TypeName: "ParameterDefinition",
    BaseTypeName: "DataType",
    Elements: [
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
    BaseTypeName: "DataType",
    Elements: [
        { ElementName: "start", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "end", Type: [{ TypeName: "dateTime" }] },
    ],
};

export const PrimitiveType: TypeModel = {
    TypeName: "PrimitiveType",
    BaseTypeName: "DataType",
    Elements: [],
};

export const ProductShelfLife: TypeModel = {
    TypeName: "ProductShelfLife",
    BaseTypeName: "BackboneType",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "period[x]", Type: [{ TypeName: "Duration" }, { TypeName: "string" }] },
        { ElementName: "specialPrecautionsForStorage", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
    ],
};

export const Quantity: TypeModel = {
    TypeName: "Quantity",
    BaseTypeName: "DataType",
    Elements: [
        { ElementName: "value", Type: [{ TypeName: "decimal" }] },
        { ElementName: "comparator", Type: [{ TypeName: "code" }] },
        { ElementName: "unit", Type: [{ TypeName: "string" }] },
        { ElementName: "system", Type: [{ TypeName: "uri" }] },
        { ElementName: "code", Type: [{ TypeName: "code" }] },
    ],
};

export const Range: TypeModel = {
    TypeName: "Range",
    BaseTypeName: "DataType",
    Elements: [
        { ElementName: "low", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "high", Type: [{ TypeName: "Quantity" }] },
    ],
};

export const Ratio: TypeModel = {
    TypeName: "Ratio",
    BaseTypeName: "DataType",
    Elements: [
        { ElementName: "numerator", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "denominator", Type: [{ TypeName: "Quantity" }] },
    ],
};

export const RatioRange: TypeModel = {
    TypeName: "RatioRange",
    BaseTypeName: "DataType",
    Elements: [
        { ElementName: "lowNumerator", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "highNumerator", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "denominator", Type: [{ TypeName: "Quantity" }] },
    ],
};

export const Reference: TypeModel = {
    TypeName: "Reference",
    BaseTypeName: "DataType",
    Elements: [
        { ElementName: "reference", Type: [{ TypeName: "string" }] },
        { ElementName: "type", Type: [{ TypeName: "uri" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "display", Type: [{ TypeName: "string" }] },
    ],
};

export const RelatedArtifact: TypeModel = {
    TypeName: "RelatedArtifact",
    BaseTypeName: "DataType",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "label", Type: [{ TypeName: "string" }] },
        { ElementName: "display", Type: [{ TypeName: "string" }] },
        { ElementName: "citation", Type: [{ TypeName: "markdown" }] },
        { ElementName: "document", Type: [{ TypeName: "Attachment" }] },
        { ElementName: "resource", Type: [{ TypeName: "canonical" }] },
        { ElementName: "resourceReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
        { ElementName: "artifact[x]", Type: [{ TypeName: "Attachment" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }, { TypeName: "canonical" }, { TypeName: "markdown" }] },
    ],
};

export const RelativeTime: TypeModel = {
    TypeName: "RelativeTime",
    BaseTypeName: "BackboneType",
    Elements: [
        { ElementName: "contextReference", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
        { ElementName: "contextDefinition", Type: [{ TypeName: "canonical" }] },
        { ElementName: "contextPath", Type: [{ TypeName: "string" }] },
        { ElementName: "contextCode", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "offset[x]", Type: [{ TypeName: "Duration" }, { TypeName: "Range" }] },
        { ElementName: "text", Type: [{ TypeName: "string" }] },
    ],
};

export const SampledData: TypeModel = {
    TypeName: "SampledData",
    BaseTypeName: "DataType",
    Elements: [
        { ElementName: "origin", Type: [{ TypeName: "Quantity" }], Required: true },
        { ElementName: "interval", Type: [{ TypeName: "decimal" }] },
        { ElementName: "intervalUnit", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "factor", Type: [{ TypeName: "decimal" }] },
        { ElementName: "lowerLimit", Type: [{ TypeName: "decimal" }] },
        { ElementName: "upperLimit", Type: [{ TypeName: "decimal" }] },
        { ElementName: "dimensions", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "codeMap", Type: [{ TypeName: "canonical" }] },
        { ElementName: "offsets", Type: [{ TypeName: "string" }] },
        { ElementName: "data", Type: [{ TypeName: "string" }] },
    ],
};

export const Signature: TypeModel = {
    TypeName: "Signature",
    BaseTypeName: "DataType",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "Coding" }], IsArray: true },
        { ElementName: "when", Type: [{ TypeName: "instant" }] },
        { ElementName: "who", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "onBehalfOf", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }] },
        { ElementName: "targetFormat", Type: [{ TypeName: "code" }] },
        { ElementName: "sigFormat", Type: [{ TypeName: "code" }] },
        { ElementName: "data", Type: [{ TypeName: "base64Binary" }] },
    ],
};

export const Timing: TypeModel = {
    TypeName: "Timing",
    BaseTypeName: "BackboneType",
    Elements: [
        { ElementName: "event", Type: [{ TypeName: "dateTime" }], IsArray: true },
        { ElementName: "repeat", Type: [{ TypeName: "timing_repeat" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
    ],
};

export const timing_repeat: TypeModel = {
    TypeName: "timing_repeat",
    BaseTypeName: "Element",
    Elements: [
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

export const TriggerDefinition: TypeModel = {
    TypeName: "TriggerDefinition",
    BaseTypeName: "DataType",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "code", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "subscriptionTopic", Type: [{ TypeName: "canonical" }] },
        { ElementName: "timing[x]", Type: [{ TypeName: "Timing" }, { TypeName: "date" }, { TypeName: "dateTime" }] },
        { ElementName: "data", Type: [{ TypeName: "DataRequirement" }], IsArray: true },
        { ElementName: "condition", Type: [{ TypeName: "Expression" }] },
    ],
};

export const UsageContext: TypeModel = {
    TypeName: "UsageContext",
    BaseTypeName: "DataType",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "Coding" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/InsurancePlan", "http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/PlanDefinition", "http://hl7.org/fhir/StructureDefinition/ResearchStudy"] }], Required: true },
    ],
};

export const VirtualServiceDetail: TypeModel = {
    TypeName: "VirtualServiceDetail",
    BaseTypeName: "DataType",
    Elements: [
        { ElementName: "channelType", Type: [{ TypeName: "Coding" }] },
        { ElementName: "address[x]", Type: [{ TypeName: "ContactPoint" }, { TypeName: "ExtendedContactDetail" }, { TypeName: "string" }, { TypeName: "url" }] },
        { ElementName: "additionalInfo", Type: [{ TypeName: "url" }], IsArray: true },
        { ElementName: "maxParticipants", Type: [{ TypeName: "positiveInt" }] },
        { ElementName: "sessionKey", Type: [{ TypeName: "string" }] },
    ],
};

export const byUrl: Readonly<Record<string, TypeModel>> = Object.freeze({
    "http://hl7.org/fhir/StructureDefinition/Address": Address,
    "http://hl7.org/fhir/StructureDefinition/Age": Age,
    "http://hl7.org/fhir/StructureDefinition/Annotation": Annotation,
    "http://hl7.org/fhir/StructureDefinition/Attachment": Attachment,
    "http://hl7.org/fhir/StructureDefinition/Availability": Availability,
    "http://fhir.forms-lab.com/custom-model/r6/availability_availableTime": availability_availableTime,
    "http://fhir.forms-lab.com/custom-model/r6/availability_notAvailableTime": availability_notAvailableTime,
    "http://hl7.org/fhir/StructureDefinition/BackboneElement": BackboneElement,
    "http://hl7.org/fhir/StructureDefinition/BackboneType": BackboneType,
    "http://hl7.org/fhir/StructureDefinition/Base": Base,
    "http://hl7.org/fhir/StructureDefinition/CodeableConcept": CodeableConcept,
    "http://hl7.org/fhir/StructureDefinition/CodeableReference": CodeableReference,
    "http://hl7.org/fhir/StructureDefinition/Coding": Coding,
    "http://hl7.org/fhir/StructureDefinition/ContactDetail": ContactDetail,
    "http://hl7.org/fhir/StructureDefinition/ContactPoint": ContactPoint,
    "http://hl7.org/fhir/StructureDefinition/Count": Count,
    "http://hl7.org/fhir/StructureDefinition/DataRequirement": DataRequirement,
    "http://fhir.forms-lab.com/custom-model/r6/datarequirement_codeFilter": datarequirement_codeFilter,
    "http://fhir.forms-lab.com/custom-model/r6/datarequirement_dateFilter": datarequirement_dateFilter,
    "http://fhir.forms-lab.com/custom-model/r6/datarequirement_valueFilter": datarequirement_valueFilter,
    "http://fhir.forms-lab.com/custom-model/r6/datarequirement_sort": datarequirement_sort,
    "http://hl7.org/fhir/StructureDefinition/DataType": DataType,
    "http://hl7.org/fhir/StructureDefinition/Distance": Distance,
    "http://hl7.org/fhir/StructureDefinition/Dosage": Dosage,
    "http://fhir.forms-lab.com/custom-model/r6/dosage_doseAndRate": dosage_doseAndRate,
    "http://hl7.org/fhir/StructureDefinition/DosageCondition": DosageCondition,
    "http://hl7.org/fhir/StructureDefinition/DosageDetails": DosageDetails,
    "http://fhir.forms-lab.com/custom-model/r6/dosagedetails_step": dosagedetails_step,
    "http://hl7.org/fhir/StructureDefinition/DosageSafety": DosageSafety,
    "http://fhir.forms-lab.com/custom-model/r6/dosagesafety_doseLimit": dosagesafety_doseLimit,
    "http://hl7.org/fhir/StructureDefinition/Duration": Duration,
    "http://hl7.org/fhir/StructureDefinition/Element": Element,
    "http://hl7.org/fhir/StructureDefinition/ElementDefinition": ElementDefinition,
    "http://fhir.forms-lab.com/custom-model/r6/elementdefinition_slicing": elementdefinition_slicing,
    "http://fhir.forms-lab.com/custom-model/r6/elementdefinition_slicing_discriminator": elementdefinition_slicing_discriminator,
    "http://fhir.forms-lab.com/custom-model/r6/elementdefinition_base": elementdefinition_base,
    "http://fhir.forms-lab.com/custom-model/r6/elementdefinition_type": elementdefinition_type,
    "http://fhir.forms-lab.com/custom-model/r6/elementdefinition_example": elementdefinition_example,
    "http://fhir.forms-lab.com/custom-model/r6/elementdefinition_constraint": elementdefinition_constraint,
    "http://fhir.forms-lab.com/custom-model/r6/elementdefinition_binding": elementdefinition_binding,
    "http://fhir.forms-lab.com/custom-model/r6/elementdefinition_binding_additional": elementdefinition_binding_additional,
    "http://fhir.forms-lab.com/custom-model/r6/elementdefinition_mapping": elementdefinition_mapping,
    "http://hl7.org/fhir/StructureDefinition/Expression": Expression,
    "http://hl7.org/fhir/StructureDefinition/ExtendedContactDetail": ExtendedContactDetail,
    "http://hl7.org/fhir/StructureDefinition/Extension": Extension,
    "http://hl7.org/fhir/StructureDefinition/HumanName": HumanName,
    "http://hl7.org/fhir/StructureDefinition/Identifier": Identifier,
    "http://hl7.org/fhir/StructureDefinition/MarketingStatus": MarketingStatus,
    "http://hl7.org/fhir/StructureDefinition/Meta": Meta,
    "http://hl7.org/fhir/StructureDefinition/MonetaryComponent": MonetaryComponent,
    "http://hl7.org/fhir/StructureDefinition/Money": Money,
    "http://hl7.org/fhir/StructureDefinition/Narrative": Narrative,
    "http://hl7.org/fhir/StructureDefinition/ParameterDefinition": ParameterDefinition,
    "http://hl7.org/fhir/StructureDefinition/Period": Period,
    "http://hl7.org/fhir/StructureDefinition/PrimitiveType": PrimitiveType,
    "http://hl7.org/fhir/StructureDefinition/ProductShelfLife": ProductShelfLife,
    "http://hl7.org/fhir/StructureDefinition/Quantity": Quantity,
    "http://hl7.org/fhir/StructureDefinition/Range": Range,
    "http://hl7.org/fhir/StructureDefinition/Ratio": Ratio,
    "http://hl7.org/fhir/StructureDefinition/RatioRange": RatioRange,
    "http://hl7.org/fhir/StructureDefinition/Reference": Reference,
    "http://hl7.org/fhir/StructureDefinition/RelatedArtifact": RelatedArtifact,
    "http://hl7.org/fhir/StructureDefinition/RelativeTime": RelativeTime,
    "http://hl7.org/fhir/StructureDefinition/SampledData": SampledData,
    "http://hl7.org/fhir/StructureDefinition/Signature": Signature,
    "http://hl7.org/fhir/StructureDefinition/Timing": Timing,
    "http://fhir.forms-lab.com/custom-model/r6/timing_repeat": timing_repeat,
    "http://hl7.org/fhir/StructureDefinition/TriggerDefinition": TriggerDefinition,
    "http://hl7.org/fhir/StructureDefinition/UsageContext": UsageContext,
    "http://hl7.org/fhir/StructureDefinition/VirtualServiceDetail": VirtualServiceDetail,
});

export const byTypeName: Readonly<Record<string, TypeModel>> = Object.freeze({
    "Address": Address,
    "Age": Age,
    "Annotation": Annotation,
    "Attachment": Attachment,
    "Availability": Availability,
    "availability_availableTime": availability_availableTime,
    "availability_notAvailableTime": availability_notAvailableTime,
    "BackboneElement": BackboneElement,
    "BackboneType": BackboneType,
    "Base": Base,
    "CodeableConcept": CodeableConcept,
    "CodeableReference": CodeableReference,
    "Coding": Coding,
    "ContactDetail": ContactDetail,
    "ContactPoint": ContactPoint,
    "Count": Count,
    "DataRequirement": DataRequirement,
    "datarequirement_codeFilter": datarequirement_codeFilter,
    "datarequirement_dateFilter": datarequirement_dateFilter,
    "datarequirement_valueFilter": datarequirement_valueFilter,
    "datarequirement_sort": datarequirement_sort,
    "DataType": DataType,
    "Distance": Distance,
    "Dosage": Dosage,
    "dosage_doseAndRate": dosage_doseAndRate,
    "DosageCondition": DosageCondition,
    "DosageDetails": DosageDetails,
    "dosagedetails_step": dosagedetails_step,
    "DosageSafety": DosageSafety,
    "dosagesafety_doseLimit": dosagesafety_doseLimit,
    "Duration": Duration,
    "Element": Element,
    "ElementDefinition": ElementDefinition,
    "elementdefinition_slicing": elementdefinition_slicing,
    "elementdefinition_slicing_discriminator": elementdefinition_slicing_discriminator,
    "elementdefinition_base": elementdefinition_base,
    "elementdefinition_type": elementdefinition_type,
    "elementdefinition_example": elementdefinition_example,
    "elementdefinition_constraint": elementdefinition_constraint,
    "elementdefinition_binding": elementdefinition_binding,
    "elementdefinition_binding_additional": elementdefinition_binding_additional,
    "elementdefinition_mapping": elementdefinition_mapping,
    "Expression": Expression,
    "ExtendedContactDetail": ExtendedContactDetail,
    "Extension": Extension,
    "HumanName": HumanName,
    "Identifier": Identifier,
    "MarketingStatus": MarketingStatus,
    "Meta": Meta,
    "MonetaryComponent": MonetaryComponent,
    "Money": Money,
    "Narrative": Narrative,
    "ParameterDefinition": ParameterDefinition,
    "Period": Period,
    "PrimitiveType": PrimitiveType,
    "ProductShelfLife": ProductShelfLife,
    "Quantity": Quantity,
    "Range": Range,
    "Ratio": Ratio,
    "RatioRange": RatioRange,
    "Reference": Reference,
    "RelatedArtifact": RelatedArtifact,
    "RelativeTime": RelativeTime,
    "SampledData": SampledData,
    "Signature": Signature,
    "Timing": Timing,
    "timing_repeat": timing_repeat,
    "TriggerDefinition": TriggerDefinition,
    "UsageContext": UsageContext,
    "VirtualServiceDetail": VirtualServiceDetail,
});
