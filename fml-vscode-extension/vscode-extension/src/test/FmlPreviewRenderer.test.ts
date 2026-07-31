import * as assert from "node:assert";
import * as vscode from "vscode";
import {PlaceholderFmlSvgRenderer} from "../FmlPreviewRenderer";

suite("FML Preview Renderer", () => {
    test("placeholder renderer produces escaped accessible SVG", async () => {
        const renderer = new PlaceholderFmlSvgRenderer();
        const svg = await renderer.render({
            uri: vscode.Uri.parse("untitled:Preview"),
            fileName: "<preview>.fml",
            text: "group First(source src, target tgt) {\n}\ngroup Second(source src, target tgt) {\n}",
            version: 3,
        });

        assert.match(svg, /^<svg\b/);
        assert.match(svg, /role="img"/);
        assert.match(svg, /&lt;preview&gt;\.fml/);
        assert.match(svg, /First, Second/);
        assert.match(svg, />2 groups</);
        assert.match(svg, /data-fml-line="1"/);
        assert.match(svg, /data-fml-column="6"/);
        assert.match(svg, /data-fml-length="5"/);
        assert.doesNotMatch(svg, /<preview>/);
    });
});
