import * as assert from "node:assert";
import {
    FmlStatusActivity,
    statusActivityText,
    statusActivityTooltip,
} from "../FmlLanguageServerStatus";

suite("FML Language Server Status", () => {
    test("preview activity animates and describes all-properties processing", () => {
        const activity: FmlStatusActivity = {
            statusText: "expanding preview",
            title: "Building Complete FML preview",
            detail: "Resolving imported FML maps and expanding all properties for ActivityDefinition4to5.fml.",
        };

        assert.equal(statusActivityText(activity), "$(loading~spin) FML: expanding preview");
        const tooltip = statusActivityTooltip(activity);
        const tooltipText = tooltip.value.replaceAll("&nbsp;", " ");
        assert.match(tooltipText, /Building Complete FML preview/);
        assert.match(tooltipText, /Resolving imported FML maps and expanding all properties/);
        assert.match(tooltipText, /ActivityDefinition4to5\.fml/);
        assert.match(tooltipText, /preview will update when processing completes/i);
    });
});