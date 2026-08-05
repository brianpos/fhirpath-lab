// Minimal local typings for the StructureDefinition shape consumed by the generator.
// These are version-tolerant (R4..R6) — only the fields the generator reads are listed.

export interface SDBundle {
    resourceType: "Bundle";
    entry?: Array<{ resource?: StructureDefinition }>;
}

export interface StructureDefinition {
    resourceType: "StructureDefinition";
    url: string;
    version?: string;
    name: string;
    type?: string;
    kind: "primitive-type" | "complex-type" | "resource" | "logical";
    abstract?: boolean;
    baseDefinition?: string;
    derivation?: "specialization" | "constraint";
    snapshot?: { element?: SDElement[] };
    differential?: { element?: SDElement[] };
}

export interface SDElement {
    id?: string;
    path: string;
    sliceName?: string;
    min?: number;
    max?: string;
    base?: { path?: string; min?: number; max?: string };
    type?: SDElementType[];
    contentReference?: string;
    representation?: string[];
}

export interface SDElementType {
    code: string;
    profile?: string[];
    /** STU3 uses a scalar canonical; R4 and later use a collection. */
    targetProfile?: string | string[];
    extension?: SDExtension[];
}

export interface SDExtension {
    url: string;
    valueUrl?: string;
    valueString?: string;
    valueCode?: string;
}
