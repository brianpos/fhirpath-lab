declare module "@fhirpath-lab/lab-instance-diagram" {
    export function renderFmlInstanceDiagram(
        fmlText: string,
        defaultFhirVersion?: import("@fhirpath-lab/validator").FhirVersion,
        profileBaseTypes?: Record<string, string>,
    ): string;
}