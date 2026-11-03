import {DocumentValidationResult, VALIDATE_DOCUMENT_REQUEST, ValidateDocumentRequest} from "@fhirpath-lab/language-service";
import * as vscode from "vscode";
import type {LanguageClient} from "vscode-languageclient/node";

export interface FmlValidatedDocument extends DocumentValidationResult {
    uri: string;
    version: number;
}

export function checkFmlCancellation(token?: vscode.CancellationToken): void {
    if (token?.isCancellationRequested) {
        throw new vscode.CancellationError();
    }
}

export async function awaitFmlOperation<T>(operation: Promise<T>, token: vscode.CancellationToken): Promise<T> {
    let subscription: vscode.Disposable | undefined;
    try {
        return await Promise.race([
            operation,
            new Promise<never>((_resolve, reject) => {
                subscription = token.onCancellationRequested(() => reject(new vscode.CancellationError()));
                if (token.isCancellationRequested) {
                    reject(new vscode.CancellationError());
                }
            }),
        ]);
    } finally {
        subscription?.dispose();
    }
}

export async function validateFmlDocument(
    client: Pick<LanguageClient, "sendRequest">,
    document: vscode.TextDocument,
    retainDiagnostics = false,
    token?: vscode.CancellationToken,
): Promise<FmlValidatedDocument> {
    for (let attempt = 0; attempt < 3; attempt++) {
        checkFmlCancellation(token);
        if (document.isClosed) {
            throw new Error(`The FML document was closed before validation: ${document.uri.toString()}`);
        }
        const version = document.version;
        const result = await client.sendRequest<DocumentValidationResult>(
            VALIDATE_DOCUMENT_REQUEST,
            {uri: document.uri.toString(), retainDiagnostics} satisfies ValidateDocumentRequest,
            token,
        );
        checkFmlCancellation(token);
        if (document.version === version) {
            return {...result, uri: document.uri.toString(), version};
        }
    }
    throw new Error("The FML document kept changing during validation. Run validation again.");
}
