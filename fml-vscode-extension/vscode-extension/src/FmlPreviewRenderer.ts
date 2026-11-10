import {Uri} from "vscode";
import type {FhirVersion, TypeModel} from "@fhirpath-lab/validator";

export interface FmlPreviewSource {
    uri: Uri;
    fileName: string;
    text: string;
    version: number;
    defaultFhirVersion?: FhirVersion;
    profileBaseTypes?: Record<string, string>;
    customTypeModels?: Record<string, TypeModel>;
    showAllProperties?: boolean;
}

export interface FmlExternalGroupSource {
    uri: string;
    text: string;
    version: number;
}

export type FmlExternalGroupSourceResolver = (
    groupName: string,
) => FmlExternalGroupSource | undefined;
export type FmlExternalGroupResolverProvider = (
    source: FmlPreviewSource,
) => Promise<FmlExternalGroupSourceResolver | undefined> | FmlExternalGroupSourceResolver | undefined;

/**
 * Source coordinates exposed by interactive SVG elements.
 *
 * Lines are 1-based to match parser diagnostics. Columns and lengths use
 * VS Code's UTF-16 character units and columns are 0-based.
 */
export interface FmlPreviewNavigationTarget {
    line: number;
    column: number;
    length: number;
}

export interface FmlSvgRenderer {
    render(source: FmlPreviewSource): Promise<string> | string;
}

export class InstanceDiagramFmlSvgRenderer implements FmlSvgRenderer {
    public constructor(
        private renderInstanceDiagram?: (
            fmlText: string,
            defaultFhirVersion?: FhirVersion,
            profileBaseTypes?: Record<string, string>,
            customTypeModels?: Record<string, TypeModel>,
        ) => string,
    ) {}

    public async render(source: FmlPreviewSource): Promise<string> {
        if (!this.renderInstanceDiagram) {
            const diagramModule = await import("@fhirpath-lab/lab-instance-diagram");
            this.renderInstanceDiagram = diagramModule.renderFmlInstanceDiagram;
        }
        const svg = this.renderInstanceDiagram(
            source.text,
            source.defaultFhirVersion,
            source.profileBaseTypes,
            source.customTypeModels,
        );
        return prepareSvg(svg, source, "Instance");
    }
}

export class CompleteDiagramFmlSvgRenderer implements FmlSvgRenderer {
    public constructor(
        private renderCompleteDiagram?: (
            fmlText: string,
            defaultFhirVersion?: FhirVersion,
            profileBaseTypes?: Record<string, string>,
            customTypeModels?: Record<string, TypeModel>,
            showAllProperties?: boolean,
            resolveExternalGroupSource?: FmlExternalGroupSourceResolver,
        ) => string,
        private readonly getExternalGroupResolver?: FmlExternalGroupResolverProvider,
    ) {}

    public async render(source: FmlPreviewSource): Promise<string> {
        let renderCompleteDiagram = this.renderCompleteDiagram;
        if (!renderCompleteDiagram) {
            const diagramModule = await import("@fhirpath-lab/lab-instance-diagram");
            renderCompleteDiagram = diagramModule.renderFmlCompleteDiagram;
            this.renderCompleteDiagram = renderCompleteDiagram;
        }
        const providedResolver = source.showAllProperties
            ? await this.getExternalGroupResolver?.(source)
            : undefined;
        const externalSourcesByUri = new Map<string, FmlExternalGroupSource>();
        const resolveExternalGroup: FmlExternalGroupSourceResolver | undefined = providedResolver
            ? groupName => {
                const externalSource = providedResolver(groupName);
                if (externalSource) {
                    externalSourcesByUri.set(externalSource.uri, externalSource);
                }
                return externalSource;
            }
            : undefined;
        const svg = renderCompleteDiagram(
            source.text,
            source.defaultFhirVersion,
            source.profileBaseTypes,
            source.customTypeModels,
            source.showAllProperties,
            resolveExternalGroup,
        );
        return prepareSvg(svg, source, "Complete", externalSourcesByUri);
    }
}

function prepareSvg(
    svg: string,
    source: FmlPreviewSource,
    diagramName: string,
    externalSourcesByUri: ReadonlyMap<string, FmlExternalGroupSource> = new Map(),
): string {
    const accessibleSvg = svg.replace(
        /^<svg\b/,
        `<svg class="fml-preview-svg" role="img" aria-label="${diagramName} diagram for ${escapeXml(source.fileName)}"`,
    );
    return accessibleSvg.replace(
            /data-pos-start="(\d+)" data-pos-end="(\d+)"(?: data-pos-uri="([^"]+)")?(?: data-pos-version="(\d+)")?/g,
            (attributes, startText: string, endText: string, encodedUri?: string, versionText?: string) => {
                const start = Number(startText);
                const end = Number(endText);
                const sourceUri = decodeSourceUri(encodedUri);
                const owningSource = sourceUri ? externalSourcesByUri.get(sourceUri) : source;
                if (!owningSource) {
                    return attributes;
                }
                const target = sourceTargetAt(owningSource.text, start, Math.max(0, end - start));
                const sourceVersion = versionText === undefined
                    ? owningSource.version
                    : Number(versionText);
                return `${attributes} ${navigationDataAttributes(target, sourceUri, sourceVersion)}`;
            },
        );
}

function decodeSourceUri(encodedUri: string | undefined): string | undefined {
    if (encodedUri === undefined) {
        return undefined;
    }
    try {
        return decodeURIComponent(encodedUri);
    } catch {
        return undefined;
    }
}

function sourceTargetAt(text: string, offset: number, length: number): FmlPreviewNavigationTarget {
    const prefix = text.slice(0, offset);
    const lineStart = prefix.lastIndexOf("\n") + 1;
    return {
        line: prefix.split(/\r?\n/).length,
        column: offset - lineStart,
        length,
    };
}

function navigationDataAttributes(
    target: FmlPreviewNavigationTarget,
    sourceUri?: string,
    sourceVersion?: number,
): string {
    const sourceAttributes = sourceUri === undefined
        ? ""
        : ` data-fml-uri="${encodeURIComponent(sourceUri)}" data-fml-version="${sourceVersion}"`;
    return `data-fml-line="${target.line}" data-fml-column="${target.column}" data-fml-length="${target.length}"${sourceAttributes}`;
}

function escapeXml(value: string): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}
