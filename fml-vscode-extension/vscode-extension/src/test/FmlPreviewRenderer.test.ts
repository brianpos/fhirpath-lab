import * as assert from "node:assert";
import * as vscode from "vscode";
import {InstanceDiagramFmlSvgRenderer} from "../FmlPreviewRenderer";

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
});
