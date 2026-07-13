import { describe, expect, test } from "@jest/globals";
import { renderSafeMarkdown } from "../vue3-src/app/utils/safe-markdown";

describe("safe Markdown rendering", () => {
    test("does not emit executable HTML without a browser sanitizer", () => {
        const rendered = renderSafeMarkdown(
            "<img src=x onerror=alert(1)> [click](javascript:alert(1))",
        );
        expect(rendered).not.toContain("<img");
        expect(rendered).not.toContain("<a ");
        expect(rendered).toContain("&lt;");
    });
});
