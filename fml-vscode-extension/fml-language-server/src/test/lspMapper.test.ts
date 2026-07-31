import assert from "node:assert/strict";
import test from "node:test";
import {DiagnosticSeverity, InsertTextFormat} from "vscode-languageserver/node";
import {toLspCompletion, toLspDiagnostic} from "../lspMapper";

test("maps language diagnostics to LSP diagnostics", () => {
    const diagnostic = toLspDiagnostic({
        range: {
            start: {line: 1, character: 2},
            end: {line: 1, character: 5},
        },
        severity: "warning",
        message: "Custom transform",
        source: "FHIR Mapping Language Tools",
    });

    assert.equal(diagnostic.severity, DiagnosticSeverity.Warning);
    assert.equal(diagnostic.source, "FHIR Mapping Language Tools");
    assert.deepEqual(diagnostic.range.start, {line: 1, character: 2});
});

test("maps completion snippets to LSP completion items", () => {
    const completion = toLspCompletion({
        label: "truncate",
        detail: "truncate(source: string, length: integer)",
        insertText: "truncate(${1})",
        snippet: true,
    });

    assert.equal(completion.insertTextFormat, InsertTextFormat.Snippet);
    assert.equal(completion.insertText, "truncate(${1})");
});
