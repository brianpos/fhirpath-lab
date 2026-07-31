export type TransformParameterType =
    | "any"
    | "canonical"
    | "decimal"
    | "expression"
    | "integer"
    | "string";

export interface TransformParameterDefinition {
    name: string;
    type: TransformParameterType;
    optional?: boolean;
    variadic?: boolean;
    allowedValues?: readonly string[];
}

export interface TransformSignature {
    parameters: readonly TransformParameterDefinition[];
}

export interface TransformDefinition {
    name: string;
    signatures: readonly TransformSignature[];
}

const parameter = (
    name: string,
    type: TransformParameterType,
    options: Omit<TransformParameterDefinition, "name" | "type"> = {},
): TransformParameterDefinition => ({name, type, ...options});

const signature = (...parameters: TransformParameterDefinition[]): TransformSignature => ({parameters});

const definitions: TransformDefinition[] = [
    {name: "create", signatures: [signature(parameter("type", "string"))]},
    {name: "copy", signatures: [signature(parameter("source", "any"))]},
    {
        name: "truncate",
        signatures: [signature(parameter("source", "string"), parameter("length", "integer"))],
    },
    {
        name: "escape",
        signatures: [signature(
            parameter("source", "string"),
            parameter("format1", "string"),
            parameter("format2", "string"),
        )],
    },
    {
        name: "cast",
        signatures: [
            signature(parameter("source", "any")),
            signature(parameter("source", "any"), parameter("type", "string")),
        ],
    },
    {name: "append", signatures: [signature(parameter("source", "any", {variadic: true}))]},
    {
        name: "translate",
        signatures: [signature(
            parameter("source", "any"),
            parameter("map_uri", "canonical"),
            parameter("output", "string", {
                allowedValues: ["code", "system", "display", "Coding", "CodeableConcept"],
            }),
        )],
    },
    {name: "reference", signatures: [signature(parameter("source", "any"))]},
    {
        name: "toDateTime",
        signatures: [signature(parameter("source", "string"), parameter("format", "string"))],
    },
    {
        name: "unixToDateTime",
        signatures: [signature(
            parameter("source", "integer"),
            parameter("timezone", "string", {optional: true}),
        )],
    },
    {
        name: "toDate",
        signatures: [signature(parameter("source", "string"), parameter("format", "string"))],
    },
    {
        name: "unixToDate",
        signatures: [signature(
            parameter("source", "integer"),
            parameter("timezone", "string", {optional: true}),
        )],
    },
    {
        name: "toTime",
        signatures: [signature(parameter("source", "string"), parameter("format", "string"))],
    },
    {
        name: "unixToTime",
        signatures: [signature(
            parameter("source", "integer"),
            parameter("timezone", "string", {optional: true}),
        )],
    },
    {name: "uuid", signatures: [signature()]},
    {name: "pointer", signatures: [signature(parameter("resource", "any"))]},
    {
        name: "evaluate",
        signatures: [signature(parameter("context", "any"), parameter("expression", "expression"))],
    },
    {
        name: "cc",
        signatures: [
            signature(parameter("text", "string")),
            signature(
                parameter("system", "string"),
                parameter("code", "string"),
                parameter("display", "string", {optional: true}),
            ),
        ],
    },
    {
        name: "c",
        signatures: [signature(
            parameter("system", "string"),
            parameter("code", "string"),
            parameter("display", "string", {optional: true}),
        )],
    },
    {
        name: "qty",
        signatures: [
            signature(parameter("text", "string")),
            signature(parameter("value", "decimal"), parameter("unit", "string")),
            signature(
                parameter("value", "decimal"),
                parameter("unit", "string"),
                parameter("system", "string"),
                parameter("code", "string"),
            ),
        ],
    },
    {
        name: "id",
        signatures: [signature(
            parameter("system", "string"),
            parameter("value", "string"),
            parameter("type", "string", {optional: true}),
        )],
    },
    {
        name: "cp",
        signatures: [
            signature(parameter("value", "string")),
            signature(parameter("system", "string"), parameter("value", "string")),
        ],
    },
];

export const transformDefinitions: ReadonlyMap<string, TransformDefinition> = new Map(
    definitions.map(definition => [definition.name, definition]),
);
