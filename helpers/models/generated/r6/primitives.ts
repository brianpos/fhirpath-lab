// THIS FILE IS GENERATED — DO NOT EDIT BY HAND.
// Run `npm run generate:models -- --version <stu3|r4|r4b|r5|r6>` to regenerate.
// See docs/custom-model-generator-plan.md.

import type { TypeModel } from "../../../custom_model";

// FHIR primitive type containers

export const base64Binary: TypeModel = {
    TypeName: "base64Binary",
    BaseTypeName: "PrimitiveType",
    Elements: [
        { ElementName: "value", Type: [{ TypeName: "System.String" }] },
    ],
};

export const boolean: TypeModel = {
    TypeName: "boolean",
    BaseTypeName: "PrimitiveType",
    Elements: [
        { ElementName: "value", Type: [{ TypeName: "System.Boolean" }] },
    ],
};

export const canonical: TypeModel = {
    TypeName: "canonical",
    BaseTypeName: "uri",
    Elements: [
        { ElementName: "value", Type: [{ TypeName: "System.String" }] },
    ],
};

export const code: TypeModel = {
    TypeName: "code",
    BaseTypeName: "string",
    Elements: [
        { ElementName: "value", Type: [{ TypeName: "System.String" }] },
    ],
};

export const date: TypeModel = {
    TypeName: "date",
    BaseTypeName: "PrimitiveType",
    Elements: [
        { ElementName: "value", Type: [{ TypeName: "System.Date" }] },
    ],
};

export const dateTime: TypeModel = {
    TypeName: "dateTime",
    BaseTypeName: "PrimitiveType",
    Elements: [
        { ElementName: "value", Type: [{ TypeName: "System.DateTime" }] },
    ],
};

export const decimal: TypeModel = {
    TypeName: "decimal",
    BaseTypeName: "PrimitiveType",
    Elements: [
        { ElementName: "value", Type: [{ TypeName: "System.Decimal" }] },
    ],
};

export const id: TypeModel = {
    TypeName: "id",
    BaseTypeName: "string",
    Elements: [
        { ElementName: "value", Type: [{ TypeName: "System.String" }] },
    ],
};

export const instant: TypeModel = {
    TypeName: "instant",
    BaseTypeName: "PrimitiveType",
    Elements: [
        { ElementName: "value", Type: [{ TypeName: "System.DateTime" }] },
    ],
};

export const integer: TypeModel = {
    TypeName: "integer",
    BaseTypeName: "PrimitiveType",
    Elements: [
        { ElementName: "value", Type: [{ TypeName: "System.Integer" }] },
    ],
};

export const integer64: TypeModel = {
    TypeName: "integer64",
    BaseTypeName: "PrimitiveType",
    Elements: [
        { ElementName: "value", Type: [{ TypeName: "System.Integer" }] },
    ],
};

export const markdown: TypeModel = {
    TypeName: "markdown",
    BaseTypeName: "string",
    Elements: [
        { ElementName: "value", Type: [{ TypeName: "System.String" }] },
    ],
};

export const oid: TypeModel = {
    TypeName: "oid",
    BaseTypeName: "uri",
    Elements: [
        { ElementName: "value", Type: [{ TypeName: "System.String" }] },
    ],
};

export const positiveInt: TypeModel = {
    TypeName: "positiveInt",
    BaseTypeName: "integer",
    Elements: [
        { ElementName: "value", Type: [{ TypeName: "System.Integer" }] },
    ],
};

export const string: TypeModel = {
    TypeName: "string",
    BaseTypeName: "PrimitiveType",
    Elements: [
        { ElementName: "value", Type: [{ TypeName: "System.String" }] },
    ],
};

export const time: TypeModel = {
    TypeName: "time",
    BaseTypeName: "PrimitiveType",
    Elements: [
        { ElementName: "value", Type: [{ TypeName: "System.Time" }] },
    ],
};

export const unsignedInt: TypeModel = {
    TypeName: "unsignedInt",
    BaseTypeName: "integer",
    Elements: [
        { ElementName: "value", Type: [{ TypeName: "System.Integer" }] },
    ],
};

export const uri: TypeModel = {
    TypeName: "uri",
    BaseTypeName: "PrimitiveType",
    Elements: [
        { ElementName: "value", Type: [{ TypeName: "System.String" }] },
    ],
};

export const url: TypeModel = {
    TypeName: "url",
    BaseTypeName: "uri",
    Elements: [
        { ElementName: "value", Type: [{ TypeName: "System.String" }] },
    ],
};

export const uuid: TypeModel = {
    TypeName: "uuid",
    BaseTypeName: "uri",
    Elements: [
        { ElementName: "value", Type: [{ TypeName: "System.String" }] },
    ],
};

export const xhtml: TypeModel = {
    TypeName: "xhtml",
    BaseTypeName: "PrimitiveType",
    Elements: [
        { ElementName: "value", Type: [{ TypeName: "System.String" }], Required: true },
    ],
};
