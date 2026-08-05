// THIS FILE IS GENERATED — DO NOT EDIT BY HAND.
// Run `npm run generate:models -- --version <stu3|r4|r4b|r5|r6>` to regenerate.
// See docs/custom-model-generator-plan.md.

import type { TypeModel } from "../../../custom_model";

// FHIR complex types (with their backbone elements)

export const Address: TypeModel = {
    TypeName: "Address",
    BaseTypeName: "Element",
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
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "author[x]", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }, { TypeName: "string" }] },
        { ElementName: "time", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "text", Type: [{ TypeName: "string" }], Required: true },
    ],
};

export const Attachment: TypeModel = {
    TypeName: "Attachment",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "contentType", Type: [{ TypeName: "code" }] },
        { ElementName: "language", Type: [{ TypeName: "code" }] },
        { ElementName: "data", Type: [{ TypeName: "base64Binary" }] },
        { ElementName: "url", Type: [{ TypeName: "uri" }] },
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
        { ElementName: "modifierExtension", Type: [{ TypeName: "Extension" }], IsArray: true },
    ],
};

export const CodeableConcept: TypeModel = {
    TypeName: "CodeableConcept",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "coding", Type: [{ TypeName: "Coding" }], IsArray: true },
        { ElementName: "text", Type: [{ TypeName: "string" }] },
    ],
};

export const Coding: TypeModel = {
    TypeName: "Coding",
    BaseTypeName: "Element",
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
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "name", Type: [{ TypeName: "string" }] },
        { ElementName: "telecom", Type: [{ TypeName: "ContactPoint" }], IsArray: true },
    ],
};

export const ContactPoint: TypeModel = {
    TypeName: "ContactPoint",
    BaseTypeName: "Element",
    Elements: [
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
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "name", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "contact", Type: [{ TypeName: "ContactDetail" }], IsArray: true },
    ],
};

export const Count: TypeModel = {
    TypeName: "Count",
    BaseTypeName: "Quantity",
    Elements: [],
};

export const DataRequirement: TypeModel = {
    TypeName: "DataRequirement",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "profile", Type: [{ TypeName: "uri" }], IsArray: true },
        { ElementName: "mustSupport", Type: [{ TypeName: "string" }], IsArray: true },
        { ElementName: "codeFilter", Type: [{ TypeName: "datarequirement_codeFilter" }], IsArray: true },
        { ElementName: "dateFilter", Type: [{ TypeName: "datarequirement_dateFilter" }], IsArray: true },
    ],
};

export const datarequirement_codeFilter: TypeModel = {
    TypeName: "datarequirement_codeFilter",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "path", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "valueSet[x]", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ValueSet"] }, { TypeName: "string" }] },
        { ElementName: "valueCode", Type: [{ TypeName: "code" }], IsArray: true },
        { ElementName: "valueCoding", Type: [{ TypeName: "Coding" }], IsArray: true },
        { ElementName: "valueCodeableConcept", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
    ],
};

export const datarequirement_dateFilter: TypeModel = {
    TypeName: "datarequirement_dateFilter",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "path", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "Duration" }, { TypeName: "Period" }, { TypeName: "dateTime" }] },
    ],
};

export const Distance: TypeModel = {
    TypeName: "Distance",
    BaseTypeName: "Quantity",
    Elements: [],
};

export const Dosage: TypeModel = {
    TypeName: "Dosage",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "sequence", Type: [{ TypeName: "integer" }] },
        { ElementName: "text", Type: [{ TypeName: "string" }] },
        { ElementName: "additionalInstruction", Type: [{ TypeName: "CodeableConcept" }], IsArray: true },
        { ElementName: "patientInstruction", Type: [{ TypeName: "string" }] },
        { ElementName: "timing", Type: [{ TypeName: "Timing" }] },
        { ElementName: "asNeeded[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "boolean" }] },
        { ElementName: "site", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "route", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "method", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "dose[x]", Type: [{ TypeName: "Quantity" }, { TypeName: "Range" }] },
        { ElementName: "maxDosePerPeriod", Type: [{ TypeName: "Ratio" }] },
        { ElementName: "maxDosePerAdministration", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "maxDosePerLifetime", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "rate[x]", Type: [{ TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }] },
    ],
};

export const Duration: TypeModel = {
    TypeName: "Duration",
    BaseTypeName: "Quantity",
    Elements: [],
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
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "path", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "representation", Type: [{ TypeName: "code" }], IsArray: true },
        { ElementName: "sliceName", Type: [{ TypeName: "string" }] },
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
        { ElementName: "defaultValue[x]", Type: [{ TypeName: "Address" }, { TypeName: "Age" }, { TypeName: "Annotation" }, { TypeName: "Attachment" }, { TypeName: "CodeableConcept" }, { TypeName: "Coding" }, { TypeName: "ContactPoint" }, { TypeName: "Count" }, { TypeName: "Distance" }, { TypeName: "Duration" }, { TypeName: "HumanName" }, { TypeName: "Identifier" }, { TypeName: "Meta" }, { TypeName: "Money" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "Reference" }, { TypeName: "SampledData" }, { TypeName: "Signature" }, { TypeName: "Timing" }, { TypeName: "base64Binary" }, { TypeName: "boolean" }, { TypeName: "code" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "id" }, { TypeName: "instant" }, { TypeName: "integer" }, { TypeName: "markdown" }, { TypeName: "oid" }, { TypeName: "positiveInt" }, { TypeName: "string" }, { TypeName: "time" }, { TypeName: "unsignedInt" }, { TypeName: "uri" }] },
        { ElementName: "meaningWhenMissing", Type: [{ TypeName: "markdown" }] },
        { ElementName: "orderMeaning", Type: [{ TypeName: "string" }] },
        { ElementName: "fixed[x]", Type: [{ TypeName: "Address" }, { TypeName: "Age" }, { TypeName: "Annotation" }, { TypeName: "Attachment" }, { TypeName: "CodeableConcept" }, { TypeName: "Coding" }, { TypeName: "ContactPoint" }, { TypeName: "Count" }, { TypeName: "Distance" }, { TypeName: "Duration" }, { TypeName: "HumanName" }, { TypeName: "Identifier" }, { TypeName: "Meta" }, { TypeName: "Money" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "Reference" }, { TypeName: "SampledData" }, { TypeName: "Signature" }, { TypeName: "Timing" }, { TypeName: "base64Binary" }, { TypeName: "boolean" }, { TypeName: "code" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "id" }, { TypeName: "instant" }, { TypeName: "integer" }, { TypeName: "markdown" }, { TypeName: "oid" }, { TypeName: "positiveInt" }, { TypeName: "string" }, { TypeName: "time" }, { TypeName: "unsignedInt" }, { TypeName: "uri" }] },
        { ElementName: "pattern[x]", Type: [{ TypeName: "Address" }, { TypeName: "Age" }, { TypeName: "Annotation" }, { TypeName: "Attachment" }, { TypeName: "CodeableConcept" }, { TypeName: "Coding" }, { TypeName: "ContactPoint" }, { TypeName: "Count" }, { TypeName: "Distance" }, { TypeName: "Duration" }, { TypeName: "HumanName" }, { TypeName: "Identifier" }, { TypeName: "Meta" }, { TypeName: "Money" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "Reference" }, { TypeName: "SampledData" }, { TypeName: "Signature" }, { TypeName: "Timing" }, { TypeName: "base64Binary" }, { TypeName: "boolean" }, { TypeName: "code" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "id" }, { TypeName: "instant" }, { TypeName: "integer" }, { TypeName: "markdown" }, { TypeName: "oid" }, { TypeName: "positiveInt" }, { TypeName: "string" }, { TypeName: "time" }, { TypeName: "unsignedInt" }, { TypeName: "uri" }] },
        { ElementName: "example", Type: [{ TypeName: "elementdefinition_example" }], IsArray: true },
        { ElementName: "minValue[x]", Type: [{ TypeName: "Quantity" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "instant" }, { TypeName: "integer" }, { TypeName: "positiveInt" }, { TypeName: "time" }, { TypeName: "unsignedInt" }] },
        { ElementName: "maxValue[x]", Type: [{ TypeName: "Quantity" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "instant" }, { TypeName: "integer" }, { TypeName: "positiveInt" }, { TypeName: "time" }, { TypeName: "unsignedInt" }] },
        { ElementName: "maxLength", Type: [{ TypeName: "integer" }] },
        { ElementName: "condition", Type: [{ TypeName: "id" }], IsArray: true },
        { ElementName: "constraint", Type: [{ TypeName: "elementdefinition_constraint" }], IsArray: true },
        { ElementName: "mustSupport", Type: [{ TypeName: "boolean" }] },
        { ElementName: "isModifier", Type: [{ TypeName: "boolean" }] },
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
        { ElementName: "profile", Type: [{ TypeName: "uri" }] },
        { ElementName: "targetProfile", Type: [{ TypeName: "uri" }] },
        { ElementName: "aggregation", Type: [{ TypeName: "code" }], IsArray: true },
        { ElementName: "versioning", Type: [{ TypeName: "code" }] },
    ],
};

export const elementdefinition_example: TypeModel = {
    TypeName: "elementdefinition_example",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "label", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "Address" }, { TypeName: "Age" }, { TypeName: "Annotation" }, { TypeName: "Attachment" }, { TypeName: "CodeableConcept" }, { TypeName: "Coding" }, { TypeName: "ContactPoint" }, { TypeName: "Count" }, { TypeName: "Distance" }, { TypeName: "Duration" }, { TypeName: "HumanName" }, { TypeName: "Identifier" }, { TypeName: "Meta" }, { TypeName: "Money" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "Reference" }, { TypeName: "SampledData" }, { TypeName: "Signature" }, { TypeName: "Timing" }, { TypeName: "base64Binary" }, { TypeName: "boolean" }, { TypeName: "code" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "id" }, { TypeName: "instant" }, { TypeName: "integer" }, { TypeName: "markdown" }, { TypeName: "oid" }, { TypeName: "positiveInt" }, { TypeName: "string" }, { TypeName: "time" }, { TypeName: "unsignedInt" }, { TypeName: "uri" }], Required: true },
    ],
};

export const elementdefinition_constraint: TypeModel = {
    TypeName: "elementdefinition_constraint",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "key", Type: [{ TypeName: "id" }], Required: true },
        { ElementName: "requirements", Type: [{ TypeName: "string" }] },
        { ElementName: "severity", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "human", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "expression", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "xpath", Type: [{ TypeName: "string" }] },
        { ElementName: "source", Type: [{ TypeName: "uri" }] },
    ],
};

export const elementdefinition_binding: TypeModel = {
    TypeName: "elementdefinition_binding",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "strength", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "description", Type: [{ TypeName: "string" }] },
        { ElementName: "valueSet[x]", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/ValueSet"] }, { TypeName: "uri" }] },
    ],
};

export const elementdefinition_mapping: TypeModel = {
    TypeName: "elementdefinition_mapping",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "identity", Type: [{ TypeName: "id" }], Required: true },
        { ElementName: "language", Type: [{ TypeName: "code" }] },
        { ElementName: "map", Type: [{ TypeName: "string" }], Required: true },
        { ElementName: "comment", Type: [{ TypeName: "string" }] },
    ],
};

export const Extension: TypeModel = {
    TypeName: "Extension",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "url", Type: [{ TypeName: "uri" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "Address" }, { TypeName: "Age" }, { TypeName: "Annotation" }, { TypeName: "Attachment" }, { TypeName: "CodeableConcept" }, { TypeName: "Coding" }, { TypeName: "ContactPoint" }, { TypeName: "Count" }, { TypeName: "Distance" }, { TypeName: "Duration" }, { TypeName: "HumanName" }, { TypeName: "Identifier" }, { TypeName: "Meta" }, { TypeName: "Money" }, { TypeName: "Period" }, { TypeName: "Quantity" }, { TypeName: "Range" }, { TypeName: "Ratio" }, { TypeName: "Reference" }, { TypeName: "SampledData" }, { TypeName: "Signature" }, { TypeName: "Timing" }, { TypeName: "base64Binary" }, { TypeName: "boolean" }, { TypeName: "code" }, { TypeName: "date" }, { TypeName: "dateTime" }, { TypeName: "decimal" }, { TypeName: "id" }, { TypeName: "instant" }, { TypeName: "integer" }, { TypeName: "markdown" }, { TypeName: "oid" }, { TypeName: "positiveInt" }, { TypeName: "string" }, { TypeName: "time" }, { TypeName: "unsignedInt" }, { TypeName: "uri" }] },
    ],
};

export const HumanName: TypeModel = {
    TypeName: "HumanName",
    BaseTypeName: "Element",
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
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "use", Type: [{ TypeName: "code" }] },
        { ElementName: "type", Type: [{ TypeName: "CodeableConcept" }] },
        { ElementName: "system", Type: [{ TypeName: "uri" }] },
        { ElementName: "value", Type: [{ TypeName: "string" }] },
        { ElementName: "period", Type: [{ TypeName: "Period" }] },
        { ElementName: "assigner", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }] },
    ],
};

export const Meta: TypeModel = {
    TypeName: "Meta",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "versionId", Type: [{ TypeName: "id" }] },
        { ElementName: "lastUpdated", Type: [{ TypeName: "instant" }] },
        { ElementName: "profile", Type: [{ TypeName: "uri" }], IsArray: true },
        { ElementName: "security", Type: [{ TypeName: "Coding" }], IsArray: true },
        { ElementName: "tag", Type: [{ TypeName: "Coding" }], IsArray: true },
    ],
};

export const Money: TypeModel = {
    TypeName: "Money",
    BaseTypeName: "Quantity",
    Elements: [],
};

export const Narrative: TypeModel = {
    TypeName: "Narrative",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "status", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "div", Type: [{ TypeName: "xhtml" }], Required: true },
    ],
};

export const ParameterDefinition: TypeModel = {
    TypeName: "ParameterDefinition",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "name", Type: [{ TypeName: "code" }] },
        { ElementName: "use", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "min", Type: [{ TypeName: "integer" }] },
        { ElementName: "max", Type: [{ TypeName: "string" }] },
        { ElementName: "documentation", Type: [{ TypeName: "string" }] },
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "profile", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/StructureDefinition"] }] },
    ],
};

export const Period: TypeModel = {
    TypeName: "Period",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "start", Type: [{ TypeName: "dateTime" }] },
        { ElementName: "end", Type: [{ TypeName: "dateTime" }] },
    ],
};

export const Quantity: TypeModel = {
    TypeName: "Quantity",
    BaseTypeName: "Element",
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
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "low", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "high", Type: [{ TypeName: "Quantity" }] },
    ],
};

export const Ratio: TypeModel = {
    TypeName: "Ratio",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "numerator", Type: [{ TypeName: "Quantity" }] },
        { ElementName: "denominator", Type: [{ TypeName: "Quantity" }] },
    ],
};

export const Reference: TypeModel = {
    TypeName: "Reference",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "reference", Type: [{ TypeName: "string" }] },
        { ElementName: "identifier", Type: [{ TypeName: "Identifier" }] },
        { ElementName: "display", Type: [{ TypeName: "string" }] },
    ],
};

export const RelatedArtifact: TypeModel = {
    TypeName: "RelatedArtifact",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "display", Type: [{ TypeName: "string" }] },
        { ElementName: "citation", Type: [{ TypeName: "string" }] },
        { ElementName: "url", Type: [{ TypeName: "uri" }] },
        { ElementName: "document", Type: [{ TypeName: "Attachment" }] },
        { ElementName: "resource", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Resource"] }] },
    ],
};

export const SampledData: TypeModel = {
    TypeName: "SampledData",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "origin", Type: [{ TypeName: "Quantity" }], Required: true },
        { ElementName: "period", Type: [{ TypeName: "decimal" }], Required: true },
        { ElementName: "factor", Type: [{ TypeName: "decimal" }] },
        { ElementName: "lowerLimit", Type: [{ TypeName: "decimal" }] },
        { ElementName: "upperLimit", Type: [{ TypeName: "decimal" }] },
        { ElementName: "dimensions", Type: [{ TypeName: "positiveInt" }], Required: true },
        { ElementName: "data", Type: [{ TypeName: "string" }], Required: true },
    ],
};

export const Signature: TypeModel = {
    TypeName: "Signature",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "Coding" }], IsArray: true, Required: true },
        { ElementName: "when", Type: [{ TypeName: "instant" }], Required: true },
        { ElementName: "who[x]", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }, { TypeName: "uri" }], Required: true },
        { ElementName: "onBehalfOf[x]", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Practitioner"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/RelatedPerson"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Patient"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Device"] }, { TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Organization"] }, { TypeName: "uri" }] },
        { ElementName: "contentType", Type: [{ TypeName: "code" }] },
        { ElementName: "blob", Type: [{ TypeName: "base64Binary" }] },
    ],
};

export const Timing: TypeModel = {
    TypeName: "Timing",
    BaseTypeName: "Element",
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
        { ElementName: "count", Type: [{ TypeName: "integer" }] },
        { ElementName: "countMax", Type: [{ TypeName: "integer" }] },
        { ElementName: "duration", Type: [{ TypeName: "decimal" }] },
        { ElementName: "durationMax", Type: [{ TypeName: "decimal" }] },
        { ElementName: "durationUnit", Type: [{ TypeName: "code" }] },
        { ElementName: "frequency", Type: [{ TypeName: "integer" }] },
        { ElementName: "frequencyMax", Type: [{ TypeName: "integer" }] },
        { ElementName: "period", Type: [{ TypeName: "decimal" }] },
        { ElementName: "periodMax", Type: [{ TypeName: "decimal" }] },
        { ElementName: "periodUnit", Type: [{ TypeName: "code" }] },
        { ElementName: "dayOfWeek", Type: [{ TypeName: "code" }], IsArray: true },
        { ElementName: "timeOfDay", Type: [{ TypeName: "time" }], IsArray: true },
        { ElementName: "when", Type: [{ TypeName: "code" }], IsArray: true },
        { ElementName: "offset", Type: [{ TypeName: "unsignedInt" }] },
    ],
};

export const TriggerDefinition: TypeModel = {
    TypeName: "TriggerDefinition",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "type", Type: [{ TypeName: "code" }], Required: true },
        { ElementName: "eventName", Type: [{ TypeName: "string" }] },
        { ElementName: "eventTiming[x]", Type: [{ TypeName: "Reference", TargetProfile: ["http://hl7.org/fhir/StructureDefinition/Schedule"] }, { TypeName: "Timing" }, { TypeName: "date" }, { TypeName: "dateTime" }] },
        { ElementName: "eventData", Type: [{ TypeName: "DataRequirement" }] },
    ],
};

export const UsageContext: TypeModel = {
    TypeName: "UsageContext",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "code", Type: [{ TypeName: "Coding" }], Required: true },
        { ElementName: "value[x]", Type: [{ TypeName: "CodeableConcept" }, { TypeName: "Quantity" }, { TypeName: "Range" }], Required: true },
    ],
};
