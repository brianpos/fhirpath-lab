import * as assert from "node:assert";
import * as vscode from "vscode";
import {
    CompleteDiagramFmlSvgRenderer,
    InstanceDiagramFmlSvgRenderer,
} from "../FmlPreviewRenderer";

suite("FML Preview Renderer", () => {
    test("instance renderer adapts lab offsets to accessible VS Code navigation", async () => {
        const renderer = new InstanceDiagramFmlSvgRenderer(() => [
            '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="100">',
            '<text data-pos-start="6" data-pos-end="11">First</text>',
            '</svg>',
        ].join("\n"));
        const svg = await renderer.render({
            uri: vscode.Uri.parse("untitled:Preview"),
            fileName: "<preview>.fml",
            text: "group First(source src, target tgt) {\n}",
            version: 3,
        });

        assert.match(svg, /^<svg\b/);
        assert.match(svg, /role="img"/);
        assert.match(svg, /Instance diagram for &lt;preview&gt;\.fml/);
        assert.match(svg, />First</);
        assert.match(svg, /data-fml-line="1"/);
        assert.match(svg, /data-fml-column="6"/);
        assert.match(svg, /data-fml-length="5"/);
        assert.doesNotMatch(svg, /<preview>/);
    });

    test("instance renderer forwards workspace model configuration", async () => {
        let receivedVersion: string | undefined;
        let receivedProfiles: Record<string, string> | undefined;
        let receivedModels: Record<string, unknown> | undefined;
        const renderer = new InstanceDiagramFmlSvgRenderer((_text, version, profiles, models) => {
            receivedVersion = version;
            receivedProfiles = profiles;
            receivedModels = models;
            return "<svg></svg>";
        });
        const profileBaseTypes = {"http://example.org/Profile": "Practitioner"};
        const customTypeModels = {ClaimRow: {TypeName: "ClaimRow", Elements: []}};

        await renderer.render({
            uri: vscode.Uri.parse("untitled:Preview"),
            fileName: "preview.fml",
            text: "group Example(source src, target tgt) {}",
            version: 1,
            defaultFhirVersion: "R4",
            profileBaseTypes,
            customTypeModels,
        });

        assert.equal(receivedVersion, "R4");
        assert.deepEqual(receivedProfiles, profileBaseTypes);
        assert.deepEqual(receivedModels, customTypeModels);
    });

    test("complete renderer forwards the all-properties option", async () => {
        let receivedShowAllProperties: boolean | undefined;
        let receivedResolver: ((groupName: string) => {uri: string; text: string; version: number} | undefined) | undefined;
        let resolverProviderCalls = 0;
        const externalSource = {uri: "file:///external.fml", text: "external map", version: 4};
        const externalResolver = (groupName: string) => groupName === "CopyBase" ? externalSource : undefined;
        const renderer = new CompleteDiagramFmlSvgRenderer((_text, _version, _profiles, _models, showAllProperties, resolver) => {
            receivedShowAllProperties = showAllProperties;
            receivedResolver = resolver;
            return "<svg></svg>";
        }, () => {
            resolverProviderCalls++;
            return externalResolver;
        });

        const svg = await renderer.render({
            uri: vscode.Uri.parse("untitled:CompletePreview"),
            fileName: "complete.fml",
            text: "group Example(source src, target tgt) {}",
            version: 1,
            showAllProperties: true,
        });

        assert.equal(receivedShowAllProperties, true);
        assert.deepEqual(receivedResolver?.("CopyBase"), externalSource);
        assert.equal(resolverProviderCalls, 1);
        assert.match(svg, /Complete diagram for complete\.fml/);

        await renderer.render({
            uri: vscode.Uri.parse("untitled:CompactPreview"),
            fileName: "compact.fml",
            text: "group Example(source src, target tgt) {}",
            version: 2,
            showAllProperties: false,
        });
        assert.equal(receivedResolver, undefined);
        assert.equal(resolverProviderCalls, 1);
    });

    test("complete renderer preserves navigation ownership for external group positions", async () => {
        const externalUri = vscode.Uri.file("C:\\maps\\Element4to5.fml").toString();
        const externalText = "group Element {\n  src.id -> tgt.id;\n}";
        const renderer = new CompleteDiagramFmlSvgRenderer((_text, _version, _profiles, _models, _showAll, resolver) => {
            const external = resolver?.("Element");
            assert.equal(external?.text, externalText);
            return [
                '<svg xmlns="http://www.w3.org/2000/svg">',
                `<text data-pos-start="22" data-pos-end="24" data-pos-uri="${encodeURIComponent(externalUri)}" data-pos-version="7">id</text>`,
                '</svg>',
            ].join("\n");
        }, () => groupName => groupName === "Element"
            ? {uri: externalUri, text: externalText, version: 7}
            : undefined);

        const svg = await renderer.render({
            uri: vscode.Uri.parse("untitled:Primary"),
            fileName: "primary.fml",
            text: "group Primary {}",
            version: 2,
            showAllProperties: true,
        });

        assert.ok(svg.includes(`data-fml-uri="${encodeURIComponent(externalUri)}"`));
        assert.match(svg, /data-fml-version="7"/);
        assert.match(svg, /data-fml-line="2"/);
        assert.match(svg, /data-fml-column="6"/);
        assert.match(svg, /data-fml-length="2"/);
    });
});
