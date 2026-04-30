// THIS FILE IS GENERATED — DO NOT EDIT BY HAND.
// Run `npm run generate:models -- --version <r4|r4b|r5|r6>` to regenerate.
// See docs/custom-model-generator-plan.md.

import type { TypeModel } from "../../../custom_model";

// FHIR complex types

export const Address: TypeModel = {
    TypeName: "Address",
    BaseTypeName: "DataType",
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
    BaseTypeName: "DataType",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "author[x]", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/Patient", "http://hl7.org/fhir/StructureDefinition/Practitioner", "http://hl7.org/fhir/StructureDefinition/PractitionerRole", "http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }, { TypeName: "string" }] },
        { ElementName: "time", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "text", Type: [{ TypeName: "markdown" }], Required: true },
    ],
};

export const Attachment: TypeModel = {
    TypeName: "Attachment",
    BaseTypeName: "DataType",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "availableTime", Type: [{ TypeName: "availability_availableTime" }], IsArray: true },
        { ElementName: "notAvailableTime", Type: [{ TypeName: "availability_notAvailableTime" }], IsArray: true },
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

export const BackboneType: TypeModel = {
    TypeName: "BackboneType",
    BaseTypeName: "DataType",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "coding", Type: [{ TypeName: "Coding" }], IsArray: true },
        { ElementName: "text", Type: [{ TypeName: "string" }] },
    ],
};

export const CodeableReference: TypeModel = {
    TypeName: "CodeableReference",
    BaseTypeName: "DataType",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "concept", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "reference", Type: [{ TypeName: "Reference" }] },
    ],
};

export const Coding: TypeModel = {
    TypeName: "Coding",
    BaseTypeName: "DataType",
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
    BaseTypeName: "DataType",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "telecom", Type: [{ TypeName: "ContactPoint" }], IsArray: true },
    ],
};

export const ContactPoint: TypeModel = {
    TypeName: "ContactPoint",
    BaseTypeName: "DataType",
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
    BaseTypeName: "DataType",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
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

export const DataType: TypeModel = {
    TypeName: "DataType",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
    BaseTypeName: "BackboneType",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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

export const DosageCondition: TypeModel = {
    TypeName: "DosageCondition",
    BaseTypeName: "BackboneType",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "renderedInstruction", Type: [{ TypeName: "markdown" }] },
        { ElementName: "simple", Type: [{ TypeName: "Dosage" }] },
        { ElementName: "step", Type: [{ TypeName: "dosagedetails_step" }], IsArray: true },
        { ElementName: "safety", Type: [{ TypeName: "DosageSafety" }] },
    ],
};

export const DosageSafety: TypeModel = {
    TypeName: "DosageSafety",
    BaseTypeName: "BackboneType",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "doseLimit", Type: [{ TypeName: "dosagesafety_doseLimit" }], IsArray: true },
        { ElementName: "ifExceeded", Type: [{ TypeName: "string" }] },
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

export const Expression: TypeModel = {
    TypeName: "Expression",
    BaseTypeName: "DataType",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "url", Type: [{ TypeName: "uri" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "Address" }, { TypeName: "Age" }, { TypeName: "Annotation" }, { TypeName: "Attachment" }, { TypeName: "Availability" }, { TypeName: "CodeableConcept" }, { TypeName: "CodeableReference" }, { TypeName: "Coding" }, { TypeName: "ContactDetail" }, { TypeName: "ContactPoint" }, { TypeName: "Count" }, { TypeName: "DataRequirement" }, { TypeName: "Distance" }, { TypeName: "Dosage" }, { TypeName: "Duration" }, { TypeName: "Expression" }, { TypeName: "ExtendedContactDetail" }, { TypeName: "HumanName" }, { TypeName: "Identifier" }, { TypeName: "Meta" }, { TypeName: "Money" }, { TypeName: "ParameterDefinition" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "RatioRange" }, { TypeName: "Reference" }, { TypeName: "RelatedArtifact" }, { TypeName: "SampledData" }, { TypeName: "Signature" }, { TypeName: "Timing" }, { TypeName: "TriggerDefinition" }, { TypeName: "UsageContext" }, { TypeName: "VirtualServiceDetail" }, { TypeName: "base64Binary" }, { TypeName: "boolean" }, { TypeName: "canonical" }, { TypeName: "code" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "id" }, { TypeName: "instant" }, { TypeName: "integer" }, { TypeName: "integer64" }, { TypeName: "markdown" }, { TypeName: "oid" }, { TypeName: "positiveInt" }, { TypeName: "string" }, { TypeName: "time" }, { TypeName: "unsignedInt" }, { TypeName: "uri" }, { TypeName: "url" }, { TypeName: "uuid" }] },
    ],
};

export const HumanName: TypeModel = {
    TypeName: "HumanName",
    BaseTypeName: "DataType",
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
    BaseTypeName: "DataType",
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
    BaseTypeName: "BackboneType",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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

export const MonetaryComponent: TypeModel = {
    TypeName: "MonetaryComponent",
    BaseTypeName: "DataType",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "value", Type: [{ TypeName: "decimal" }] },
        { ElementName: "currency", Type: [{ TypeName: "code" }] },
    ],
};

export const Narrative: TypeModel = {
    TypeName: "Narrative",
    BaseTypeName: "DataType",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "div", Type: [{ TypeName: "xhtml" }], Required: true },
    ],
};

export const ParameterDefinition: TypeModel = {
    TypeName: "ParameterDefinition",
    BaseTypeName: "DataType",
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
    BaseTypeName: "DataType",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "start", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "end", Type: [{ TypeName: "dateTime" }] },
    ],
};

export const PrimitiveType: TypeModel = {
    TypeName: "PrimitiveType",
    BaseTypeName: "DataType",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
    ],
};

export const ProductShelfLife: TypeModel = {
    TypeName: "ProductShelfLife",
    BaseTypeName: "BackboneType",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "period[x]", Type: [{ TypeName: "Duration" }, { TypeName: "string" }] },
        { ElementName: "specialPrecautionsForStorage", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
    ],
};

export const Quantity: TypeModel = {
    TypeName: "Quantity",
    BaseTypeName: "DataType",
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
    BaseTypeName: "DataType",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "low", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "high", Type: [{ TypeName: "Quantity" }] },
    ],
};

export const Ratio: TypeModel = {
    TypeName: "Ratio",
    BaseTypeName: "DataType",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "numerator", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "denominator", Type: [{ TypeName: "Quantity" }] },
    ],
};

export const RatioRange: TypeModel = {
    TypeName: "RatioRange",
    BaseTypeName: "DataType",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "lowNumerator", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "highNumerator", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "denominator", Type: [{ TypeName: "Quantity" }] },
    ],
};

export const Reference: TypeModel = {
    TypeName: "Reference",
    BaseTypeName: "DataType",
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
    BaseTypeName: "DataType",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
    BaseTypeName: "DataType",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
        { ElementName: "code", Type: [{ TypeName: "Coding" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Group", "http://hl7.org/fhir/StructureDefinition/HealthcareService", "http://hl7.org/fhir/StructureDefinition/InsurancePlan", "http://hl7.org/fhir/StructureDefinition/Location", "http://hl7.org/fhir/StructureDefinition/Organization", "http://hl7.org/fhir/StructureDefinition/PlanDefinition", "http://hl7.org/fhir/StructureDefinition/ResearchStudy"] }], Required: true },
    ],
};

export const VirtualServiceDetail: TypeModel = {
    TypeName: "VirtualServiceDetail",
    BaseTypeName: "DataType",
    Elements: [
        { ElementName: "id", Type: [{ TypeName: "string" }] },
        { ElementName: "extension", Type: [{ TypeName: "Extension" }], IsArray: true },
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
    "http://hl7.org/fhir/StructureDefinition/DataType": DataType,
    "http://hl7.org/fhir/StructureDefinition/Distance": Distance,
    "http://hl7.org/fhir/StructureDefinition/Dosage": Dosage,
    "http://hl7.org/fhir/StructureDefinition/DosageCondition": DosageCondition,
    "http://hl7.org/fhir/StructureDefinition/DosageDetails": DosageDetails,
    "http://hl7.org/fhir/StructureDefinition/DosageSafety": DosageSafety,
    "http://hl7.org/fhir/StructureDefinition/Duration": Duration,
    "http://hl7.org/fhir/StructureDefinition/Element": Element,
    "http://hl7.org/fhir/StructureDefinition/ElementDefinition": ElementDefinition,
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
    "DataType": DataType,
    "Distance": Distance,
    "Dosage": Dosage,
    "DosageCondition": DosageCondition,
    "DosageDetails": DosageDetails,
    "DosageSafety": DosageSafety,
    "Duration": Duration,
    "Element": Element,
    "ElementDefinition": ElementDefinition,
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
    "TriggerDefinition": TriggerDefinition,
    "UsageContext": UsageContext,
    "VirtualServiceDetail": VirtualServiceDetail,
});
