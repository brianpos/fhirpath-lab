import {LanguageDiagnostic} from "@fhirpath-lab/language-service";
import {CompletionItem, CompletionItemKind, Diagnostic, DiagnosticSeverity, InsertTextFormat} from "vscode-languageserver/node";
import {CompletionSuggestion} from "@fhirpath-lab/language-service";

export function toLspDiagnostic(diagnostic: LanguageDiagnostic): Diagnostic {
    return Diagnostic.create(
        diagnostic.range,
        diagnostic.message,
        diagnostic.severity === "warning"
            ? DiagnosticSeverity.Warning
            : DiagnosticSeverity.Error,
        undefined,
        diagnostic.source,
    );
}

export function toLspCompletion(completion: CompletionSuggestion): CompletionItem {
    return {
        label: completion.label,
        kind: CompletionItemKind.Function,
        detail: completion.detail,
        insertText: completion.insertText,
        insertTextFormat: completion.snippet
            ? InsertTextFormat.Snippet
            : InsertTextFormat.PlainText,
    };
}
