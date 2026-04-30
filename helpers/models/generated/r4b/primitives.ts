// THIS FILE IS GENERATED — DO NOT EDIT BY HAND.
// Run `npm run generate:models -- --version <r4|r4b|r5|r6>` to regenerate.
// See docs/custom-model-generator-plan.md.

import type { TypeModel } from "../../../custom_model";

// FHIR primitive type containers

export const base64Binary: TypeModel = {
    TypeName: "base64Binary",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "value", Type: [{ TypeName: "System.String" }] },
    ],
};

export const boolean: TypeModel = {
    TypeName: "boolean",
    BaseTypeName: "Element",
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
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "value", Type: [{ TypeName: "System.Date" }] },
    ],
};

export const dateTime: TypeModel = {
    TypeName: "dateTime",
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "value", Type: [{ TypeName: "System.DateTime" }] },
    ],
};

export const decimal: TypeModel = {
    TypeName: "decimal",
    BaseTypeName: "Element",
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
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "value", Type: [{ TypeName: "System.DateTime" }] },
    ],
};

export const integer: TypeModel = {
    TypeName: "integer",
    BaseTypeName: "Element",
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
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "value", Type: [{ TypeName: "System.String" }] },
    ],
};

export const time: TypeModel = {
    TypeName: "time",
    BaseTypeName: "Element",
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
    BaseTypeName: "Element",
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
    BaseTypeName: "Element",
    Elements: [
        { ElementName: "value", Type: [{ TypeName: "System.String" }], Required: true },
    ],
};
