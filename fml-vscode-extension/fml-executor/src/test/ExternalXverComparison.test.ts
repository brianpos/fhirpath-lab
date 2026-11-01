import assert from "node:assert/strict";
import test from "node:test";
import {runXverComparison, type XverCaseResult} from "../testing/xver-comparison";

test("mapped R4 examples convert to STU3 and match reference JSON", async t => {
    const report = await runXverComparison({
        corpusPath: process.env.FML_XVER_PATH ?? "C:\\git\\hl7\\fhir-cross-version",
        examplesPath: process.env.FML_XVER_R4_EXAMPLES ?? "C:\\temp\\r4-converted",
        referencePath: process.env.FML_XVER_R3_REFERENCE ?? "C:\\temp\\r3-converted",
        outputPath: process.env.FML_XVER_R3_OUTPUT ?? "C:\\temp\\r3-converted-fhirpath-lab",
        reportPath: process.env.FML_XVER_REPORT,
    }, async (result: XverCaseResult) => {
        if (result.status === "unmapped") {
            await t.test(result.fileName, {skip: `No R4toR3 map for resourceType '${result.sourceType}'.`});
        } else {
            await t.test(result.fileName, () => {
                assert.equal(result.status, "pass", JSON.stringify({
                    status: result.status, resourceType: result.sourceType, preparationId: result.preparationId,
                    issues: result.issues, mismatches: result.mismatches, diagnostics: result.diagnostics,
                }));
            });
        }
    });
    t.diagnostic(JSON.stringify({setup: report.setup, summary: report.summary, report: report.paths.reportPath}));
    assert.equal(report.setup.mapErrors.length, 0, "Map parse failures are not successful conversions.");
    assert.ok(report.summary.mapped > 0, "No mapped inputs were executed.");
});
