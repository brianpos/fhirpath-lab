import {getModelProvider} from "@fhirpath-lab/validator";

interface ElementModel {
    ElementName: string;
    Type: {TypeName: string}[];
    IsArray?: boolean;
    Required?: boolean;
}

interface TypeModel {
    TypeName: string;
    BaseTypeName?: string;
    Elements: ElementModel[];
}

export interface StructureIssue {
    path: string;
    message: string;
}

export interface InstanceAnalysis {
    issues: StructureIssue[];
    /** Normalized property paths present in the instance, e.g. `Patient.contact.name` or `Observation.value[x]`. */
    present: Set<string>;
}

const BASE_TYPES = new Set(["Base", "Resource", "DomainResource", "Element", "BackboneElement", "DataType",
    "PrimitiveType", "BackboneType"]);

function lookupFor(version: string): ((name: string) => TypeModel | undefined) | undefined {
    const lower = version.toLowerCase();
    if (!["stu3", "r4", "r4b", "r5"].includes(lower)) {
        return undefined;
    }
    const provider = getModelProvider(lower as "r4") as {lookupByTypeName(name: string): TypeModel | undefined};
    return name => provider.lookupByTypeName(name);
}

function elementsOf(lookup: (name: string) => TypeModel | undefined, typeName: string, includeBase = true): ElementModel[] {
    const elements: ElementModel[] = [];
    const seen = new Set<string>();
    let current = lookup(typeName);
    while (current && !seen.has(current.TypeName)) {
        seen.add(current.TypeName);
        if (includeBase || !BASE_TYPES.has(current.TypeName)) {
            elements.push(...current.Elements);
        }
        current = current.BaseTypeName ? lookup(current.BaseTypeName) : undefined;
    }
    return elements;
}

function upperFirst(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function findElement(elements: ElementModel[], key: string): {element: ElementModel; typeName?: string} | undefined {
    for (const element of elements) {
        if (element.ElementName === key) {
            return {element, typeName: element.Type[0]?.TypeName};
        }
        if (element.ElementName.endsWith("[x]")) {
            const base = element.ElementName.slice(0, -3);
            if (key.startsWith(base)) {
                const suffix = key.slice(base.length);
                const type = element.Type.find(candidate => upperFirst(candidate.TypeName) === suffix);
                if (type) {
                    return {element, typeName: type.TypeName};
                }
            }
        }
    }
    return undefined;
}

function isObject(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Walks a resource using the generated core model for `version`, checking property names and
 * single/array cardinality (plus required elements), and collecting the property paths present.
 * Bindings and datatype formats are deliberately not checked. Unknown versions return no issues.
 */
export function analyzeInstance(resource: unknown, version: string | undefined): InstanceAnalysis {
    const analysis: InstanceAnalysis = {issues: [], present: new Set()};
    const lookup = version ? lookupFor(version) : undefined;
    if (!lookup || !isObject(resource) || typeof resource.resourceType !== "string") {
        return analysis;
    }
    if (!lookup(resource.resourceType)) {
        analysis.issues.push({path: resource.resourceType, message: `Unknown resource type '${resource.resourceType}'.`});
        return analysis;
    }
    visit(lookup, resource, resource.resourceType, resource.resourceType, resource.resourceType, analysis, 0);
    return analysis;
}

function visit(
    lookup: (name: string) => TypeModel | undefined,
    value: Record<string, unknown>,
    typeName: string,
    instancePath: string,
    normalizedPath: string,
    analysis: InstanceAnalysis,
    depth: number,
): void {
    if (depth > 12) {
        return;
    }
    const elements = elementsOf(lookup, typeName);
    if (!elements.length) {
        return;
    }
    const keys = Object.keys(value);
    for (const key of keys) {
        if (key === "resourceType" && depth === 0) {
            continue;
        }
        const primitiveExtension = key.startsWith("_");
        const found = findElement(elements, primitiveExtension ? key.slice(1) : key);
        if (!found) {
            analysis.issues.push({path: `${instancePath}.${key}`, message: `Unknown property '${key}' on ${typeName}.`});
            continue;
        }
        const {element} = found;
        const child = value[key];
        const childPath = `${instancePath}.${key}`;
        const normalized = `${normalizedPath}.${element.ElementName}`;
        analysis.present.add(normalized);
        if (element.IsArray && !Array.isArray(child)) {
            analysis.issues.push({path: childPath, message: `'${key}' must be an array (max cardinality is *).`});
        } else if (!element.IsArray && Array.isArray(child)) {
            analysis.issues.push({path: childPath, message: `'${key}' must not be an array (max cardinality is 1).`});
        }
        const items = Array.isArray(child) ? child : [child];
        items.forEach((item, index) => {
            if (!isObject(item) || !found.typeName) {
                return;
            }
            const itemPath = Array.isArray(child) ? `${childPath}[${index}]` : childPath;
            const itemType = found.typeName === "Resource" && typeof item.resourceType === "string"
                ? item.resourceType : found.typeName;
            visit(lookup, item, itemType, itemPath, normalized, analysis, depth + 1);
        });
    }
    for (const element of elements) {
        if (!element.Required) {
            continue;
        }
        const base = element.ElementName.replace(/\[x\]$/, "");
        const present = keys.some(key => {
            const bare = key.startsWith("_") ? key.slice(1) : key;
            return element.ElementName.endsWith("[x]") ? findElement([element], bare) !== undefined : bare === base;
        });
        if (!present) {
            analysis.issues.push({path: instancePath, message: `Missing required property '${element.ElementName}' on ${typeName}.`});
        }
    }
}

/** Property paths of a resource type (and its backbone elements) from the core model, excluding base Resource/Element properties. */
export function modelPropertyPaths(typeName: string, version: string | undefined, maxDepth = 6): string[] {
    const lookup = version ? lookupFor(version) : undefined;
    if (!lookup) {
        return [];
    }
    const paths: string[] = [];
    const walk = (type: string, prefix: string, depth: number): void => {
        for (const element of elementsOf(lookup, type, false)) {
            const path = `${prefix}.${element.ElementName}`;
            paths.push(path);
            const childType = element.Type[0]?.TypeName;
            const child = childType ? lookup(childType) : undefined;
            if (child?.BaseTypeName === "BackboneElement" && depth < maxDepth) {
                walk(child.TypeName, path, depth + 1);
            }
        }
    };
    walk(typeName, typeName, 0);
    return paths;
}
