import {Uri} from "vscode";

export interface FmlPreviewSource {
    uri: Uri;
    fileName: string;
    text: string;
    version: number;
}

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
        private renderInstanceDiagram?: (fmlText: string) => string,
    ) {}

    public async render(source: FmlPreviewSource): Promise<string> {
        if (!this.renderInstanceDiagram) {
            const diagramModule = await import("@fhirpath-lab/lab-instance-diagram");
            this.renderInstanceDiagram = diagramModule.renderFmlInstanceDiagram;
        }
        const svg = this.renderInstanceDiagram(source.text);
        const accessibleSvg = svg.replace(
            /^<svg\b/,
            `<svg class="fml-preview-svg" role="img" aria-label="Instance diagram for ${escapeXml(source.fileName)}"`,
        );
        return accessibleSvg.replace(
            /data-pos-start="(\d+)" data-pos-end="(\d+)"/g,
            (attributes, startText: string, endText: string) => {
                const start = Number(startText);
                const end = Number(endText);
                const target = sourceTargetAt(source.text, start, Math.max(0, end - start));
                return `${attributes} ${navigationDataAttributes(target)}`;
            },
        );
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

function navigationDataAttributes(target: FmlPreviewNavigationTarget): string {
    return `data-fml-line="${target.line}" data-fml-column="${target.column}" data-fml-length="${target.length}"`;
}

function escapeXml(value: string): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}
