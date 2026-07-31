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
    /**
     * Add `data-fml-line`, `data-fml-column`, and `data-fml-length` to any
     * SVG element that should navigate to FML source when activated.
     */
    render(source: FmlPreviewSource): Promise<string> | string;
}

export class PlaceholderFmlSvgRenderer implements FmlSvgRenderer {
    public render(source: FmlPreviewSource): string {
        const lineCount = source.text.length === 0 ? 0 : source.text.split(/\r?\n/).length;
        const groupMatches = [...source.text.matchAll(/\bgroup\s+([A-Za-z][A-Za-z0-9]*)/g)];
        const groupNames = groupMatches.map(match => match[1]);
        const groupSummary = groupNames.length > 0
            ? groupNames.slice(0, 3).join(", ")
            : "No groups detected yet";
        const extraGroups = groupNames.length > 3 ? ` +${groupNames.length - 3} more` : "";
        const firstGroupTarget = groupMatches[0]?.index === undefined
            ? undefined
            : sourceTargetAt(source.text, groupMatches[0].index + groupMatches[0][0].lastIndexOf(groupMatches[0][1]), groupMatches[0][1].length);
        const firstGroupAttributes = firstGroupTarget
            ? navigationDataAttributes(firstGroupTarget)
            : "";

        return `
<svg class="fml-preview-svg" viewBox="0 0 960 540" role="img" aria-labelledby="fml-preview-title fml-preview-description" xmlns="http://www.w3.org/2000/svg">
    <title id="fml-preview-title">Placeholder FML map preview for ${escapeXml(source.fileName)}</title>
    <desc id="fml-preview-description">A placeholder diagram that updates as the FML document changes.</desc>
    <rect class="preview-background" x="0" y="0" width="960" height="540" rx="20"/>
    <text class="preview-heading" x="48" y="62">FML Map Preview</text>
    <text class="preview-subheading" x="48" y="92">${escapeXml(source.fileName)}</text>

    <rect class="preview-card" x="48" y="142" width="238" height="198" rx="14"/>
    <text class="preview-card-title" x="78" y="188">Source map</text>
    <text class="preview-card-copy" x="78" y="224">${lineCount} lines</text>
    <text class="preview-card-copy" x="78" y="254">${source.text.length} characters</text>
    <text class="preview-card-copy" x="78" y="284">Document version ${source.version}</text>

    <path class="preview-arrow" d="M306 241 H389"/>
    <path class="preview-arrow-head" d="M379 229 L395 241 L379 253"/>

    <g class="preview-navigation-target" ${firstGroupAttributes}>
        <rect class="preview-card preview-card-accent" x="409" y="142" width="238" height="198" rx="14"/>
        <text class="preview-card-title" x="439" y="188">Renderer hook</text>
        <text class="preview-card-copy" x="439" y="224">Placeholder SVG</text>
        <text class="preview-card-copy" x="439" y="254">${escapeXml(groupSummary)}${escapeXml(extraGroups)}</text>
        <text class="preview-card-copy" x="439" y="284">${groupNames.length} group${groupNames.length === 1 ? "" : "s"}</text>
    </g>

    <path class="preview-arrow" d="M667 241 H750"/>
    <path class="preview-arrow-head" d="M740 229 L756 241 L740 253"/>

    <rect class="preview-card" x="776" y="142" width="136" height="198" rx="14"/>
    <text class="preview-card-title" x="800" y="188">SVG</text>
    <circle class="preview-output-node" cx="844" cy="246" r="38"/>
    <path class="preview-output-mark" d="M826 246 L839 259 L864 232"/>

    <rect class="preview-note" x="48" y="390" width="864" height="94" rx="14"/>
    <text class="preview-note-heading" x="76" y="428">Live preview plumbing is active</text>
    <text class="preview-note-copy" x="76" y="458">Replace PlaceholderFmlSvgRenderer with the production renderer when its package is available.</text>
</svg>`.trim();
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
