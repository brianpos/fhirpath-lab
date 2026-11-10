declare module "@fhirpath-lab/lab-instance-diagram" {
    export interface FmlExternalGroupSource {
        uri: string;
        text: string;
        version: number;
    }

    export function renderFmlInstanceDiagram(
        fmlText: string,
        defaultFhirVersion?: import("@fhirpath-lab/validator").FhirVersion,
        profileBaseTypes?: Record<string, string>,
        customTypeModels?: Record<string, import("@fhirpath-lab/validator").TypeModel>,
    ): string;

    export function renderFmlCompleteDiagram(
        fmlText: string,
        defaultFhirVersion?: import("@fhirpath-lab/validator").FhirVersion,
        profileBaseTypes?: Record<string, string>,
        customTypeModels?: Record<string, import("@fhirpath-lab/validator").TypeModel>,
        showAllProperties?: boolean,
        resolveExternalGroupSource?: (groupName: string) => FmlExternalGroupSource | undefined,
    ): string;
}