import type { Attachment, Library, ParameterDefinition } from "fhir/r4b";

export const supportedLogicContentTypes = ["text/fhirpath", "text/cql"] as const;
export type SupportedLogicContentType = typeof supportedLogicContentTypes[number];

export function isSupportedLogicContentType(
    contentType: string | undefined,
): contentType is SupportedLogicContentType {
    return supportedLogicContentTypes.includes(contentType as SupportedLogicContentType);
}

export function findLogicContent(library: Library): Attachment | undefined {
    return library.content?.find((content) => isSupportedLogicContentType(content.contentType));
}

export function findCqlTextContent(library: Library): Attachment | undefined {
    return library.content?.find((content) => content.contentType === "text/cql");
}

export function decodeLibraryContent(data: string): string {
    const binary = globalThis.atob(data);
    const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
    return new TextDecoder().decode(bytes);
}

export function encodeLibraryContent(value: string): string {
    const bytes = new TextEncoder().encode(value);
    let binary = "";
    bytes.forEach((byte) => {
        binary += String.fromCharCode(byte);
    });
    return globalThis.btoa(binary);
}

export function testerPathForLibrary(
    libraryId: string,
    contentType: string | undefined,
): string | undefined {
    if (contentType === "text/cql") {
        return `/cql?libraryId=${encodeURIComponent(libraryId)}`;
    }
    if (contentType === "text/fhirpath") {
        return `/FhirPath?libraryId=${encodeURIComponent(libraryId)}`;
    }
    return undefined;
}

export function inputParameterDefinitions(library: Library): ParameterDefinition[] {
    return (library.parameter ?? []).filter((parameter) => parameter.use !== "out");
}
