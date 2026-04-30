// Hand-authored, version-independent System.* primitive TypeModels.
//
// These are the FHIRPath system/native value types that FHIR primitive containers
// (`string`, `boolean`, `dateTime`, ...) point at via their `value` element. They
// are NOT in the HL7 profiles bundles, so they must be authored once here and
// shared by reference across every per-version dictionary.
//
// Identity matters: each per-version `byUrl` / `byTypeName` dictionary spreads these
// same instances in, so `r4.byTypeName["System.String"] === r5.byTypeName["System.String"]`.
// Downstream WeakMap-based caches rely on that identity.
//
// See docs/custom-model-generator-plan.md for the full plan.

import type { TypeModel } from "../../custom_model";

// Each System.* type is a leaf primitive: no Elements, IsPrimitive=true.
// Frozen at module load so consumers cannot mutate them.

function makeSystemType(typeName: string): TypeModel {
    return Object.freeze({
        TypeName: typeName,
        Elements: Object.freeze([]) as ReadonlyArray<never> as TypeModel["Elements"],
        IsPrimitive: true,
    }) as TypeModel;
}

export const SystemString: TypeModel = makeSystemType("System.String");
export const SystemBoolean: TypeModel = makeSystemType("System.Boolean");
export const SystemInteger: TypeModel = makeSystemType("System.Integer");
export const SystemDecimal: TypeModel = makeSystemType("System.Decimal");
export const SystemDateTime: TypeModel = makeSystemType("System.DateTime");
export const SystemDate: TypeModel = makeSystemType("System.Date");
export const SystemTime: TypeModel = makeSystemType("System.Time");
export const SystemQuantity: TypeModel = makeSystemType("System.Quantity");

/** All System.* TypeModels indexed by canonical URL. */
export const systemTypesByUrl: Readonly<Record<string, TypeModel>> = Object.freeze({
    "http://hl7.org/fhirpath/System.String": SystemString,
    "http://hl7.org/fhirpath/System.Boolean": SystemBoolean,
    "http://hl7.org/fhirpath/System.Integer": SystemInteger,
    "http://hl7.org/fhirpath/System.Decimal": SystemDecimal,
    "http://hl7.org/fhirpath/System.DateTime": SystemDateTime,
    "http://hl7.org/fhirpath/System.Date": SystemDate,
    "http://hl7.org/fhirpath/System.Time": SystemTime,
    "http://hl7.org/fhirpath/System.Quantity": SystemQuantity,
});

/** All System.* TypeModels indexed by TypeName. Same instances as systemTypesByUrl. */
export const systemTypesByTypeName: Readonly<Record<string, TypeModel>> = Object.freeze({
    "System.String": SystemString,
    "System.Boolean": SystemBoolean,
    "System.Integer": SystemInteger,
    "System.Decimal": SystemDecimal,
    "System.DateTime": SystemDateTime,
    "System.Date": SystemDate,
    "System.Time": SystemTime,
    "System.Quantity": SystemQuantity,
});

/**
 * Map from FHIR primitive datatype code to the System.* TypeName that its `.value`
 * element points at. Used by the generator when emitting FHIR primitive containers.
 */
export const fhirPrimitiveToSystemTypeName: Readonly<Record<string, string>> = Object.freeze({
    boolean: "System.Boolean",
    integer: "System.Integer",
    integer64: "System.Integer",
    positiveInt: "System.Integer",
    unsignedInt: "System.Integer",
    decimal: "System.Decimal",
    string: "System.String",
    code: "System.String",
    id: "System.String",
    markdown: "System.String",
    uri: "System.String",
    url: "System.String",
    canonical: "System.String",
    oid: "System.String",
    uuid: "System.String",
    base64Binary: "System.String",
    xhtml: "System.String",
    date: "System.Date",
    dateTime: "System.DateTime",
    instant: "System.DateTime",
    time: "System.Time",
});
