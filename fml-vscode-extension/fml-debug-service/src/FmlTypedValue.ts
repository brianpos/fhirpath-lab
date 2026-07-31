import {
    FmlDebugType,
    FmlDebugTypeMap,
    FmlTypedValue,
    JsonValue,
} from "./contracts";

export function createFmlTypedValue(
    value: JsonValue,
    suppliedTypes?: FmlDebugTypeMap,
): FmlTypedValue {
    const generatedTypes: FmlDebugTypeMap = {};
    addGeneratedTypes(value, "$", generatedTypes);
    return {
        value,
        types: {
            ...generatedTypes,
            ...normalizeTypeMap(suppliedTypes),
        },
    };
}

export function parseFmlTypedValue(value: JsonValue): FmlTypedValue {
    if (isTypedValueEnvelope(value)) {
        const envelope = value as unknown as {
            value: JsonValue;
            types: FmlDebugTypeMap;
        };
        return createFmlTypedValue(envelope.value, envelope.types);
    }
    return createFmlTypedValue(value);
}

export function childPath(parentPath: string, property: string | number): string {
    if (typeof property === "number") {
        return `${parentPath}[${property}]`;
    }
    return /^[A-Za-z_][A-Za-z0-9_]*$/.test(property)
        ? `${parentPath}.${property}`
        : `${parentPath}[${JSON.stringify(property)}]`;
}

export function formatDebugType(type: FmlDebugType | undefined): string | undefined {
    if (!type) {
        return undefined;
    }
    const qualifiedName = type.namespace
        ? type.namespace === "FHIR"
            ? `FHIR.${type.name}`
            : `${type.namespace}|${type.name}`
        : type.name;
    return type.collection ? `${qualifiedName}[]` : qualifiedName;
}

function addGeneratedTypes(
    value: JsonValue,
    path: string,
    types: FmlDebugTypeMap,
): void {
    if (Array.isArray(value)) {
        const itemTypes = value.map(item => generatedType(item));
        const commonType = commonItemType(itemTypes);
        types[path] = {
            name: commonType?.name ?? "value",
            ...(commonType?.namespace ? {namespace: commonType.namespace} : {}),
            collection: true,
        };
        value.forEach((item, index) => {
            addGeneratedTypes(item, childPath(path, index), types);
        });
        return;
    }

    types[path] = generatedType(value);
    if (value && typeof value === "object") {
        for (const [property, child] of Object.entries(value)) {
            addGeneratedTypes(child, childPath(path, property), types);
        }
    }
}

function generatedType(value: JsonValue): FmlDebugType {
    if (value === null) {
        return {name: "null"};
    }
    if (Array.isArray(value)) {
        const commonType = commonItemType(value.map(item => generatedType(item)));
        return {
            name: commonType?.name ?? "value",
            ...(commonType?.namespace ? {namespace: commonType.namespace} : {}),
            collection: true,
        };
    }
    switch (typeof value) {
        case "string":
            return {name: "string"};
        case "boolean":
            return {name: "boolean"};
        case "number":
            return {name: Number.isInteger(value) ? "integer" : "decimal"};
        case "object": {
            const resourceType = value.resourceType;
            return typeof resourceType === "string" && resourceType.length > 0
                ? {name: resourceType, namespace: "FHIR"}
                : {name: "object"};
        }
    }
}

function commonItemType(types: FmlDebugType[]): FmlDebugType | undefined {
    const first = types[0];
    return first && types.every(type => {
        return type.name === first.name
            && type.namespace === first.namespace
            && !type.collection;
    })
        ? first
        : undefined;
}

function normalizeTypeMap(types: FmlDebugTypeMap | undefined): FmlDebugTypeMap {
    if (!types) {
        return {};
    }
    const result: FmlDebugTypeMap = {};
    for (const [path, type] of Object.entries(types)) {
        if (
            path.startsWith("$")
            && type
            && typeof type.name === "string"
            && type.name.length > 0
        ) {
            result[path] = {
                name: type.name,
                ...(typeof type.namespace === "string" ? {namespace: type.namespace} : {}),
                ...(typeof type.collection === "boolean" ? {collection: type.collection} : {}),
            };
        }
    }
    return result;
}

function isTypedValueEnvelope(value: JsonValue): boolean {
    if (!value || typeof value !== "object" || Array.isArray(value)) {
        return false;
    }
    const candidate = value as Record<string, JsonValue>;
    if (!("value" in candidate) || !candidate.types || typeof candidate.types !== "object" || Array.isArray(candidate.types)) {
        return false;
    }
    const typeEntries = Object.entries(candidate.types);
    return typeEntries.length > 0
        && Object.prototype.hasOwnProperty.call(candidate.types, "$")
        && typeEntries.every(([path, type]) => {
            return path.startsWith("$") && Boolean(
                type
            && typeof type === "object"
            && !Array.isArray(type)
            && typeof type.name === "string",
            );
        });
}
