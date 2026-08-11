import * as assert from "node:assert";
import {promises as fs} from "node:fs";
import * as http from "node:http";
import os from "node:os";
import path from "node:path";
import * as vscode from "vscode";
import {deduplicateFmlFilePaths, resolveFmlDebugDependencies} from "../FmlDebugDependencies";
import {nearestTokenRange} from "../FmlDebugSession";
import {UiConstants} from "../constants/UiConstants";

interface ProtocolMessage {
    body?: Record<string, unknown>;
    command?: string;
    event?: string;
    type?: string;
}

const cursorUrl = "http://fhirpath-lab.com/StructureDefinition/Cursor";
const variableUrl = "http://fhirpath-lab.com/StructureDefinition/Variable";
const jsonValueUrl = "http://fhir.forms-lab.com/StructureDefinition/json-value";

suite("FML Trace Replay Debugger", () => {
    test("deduplicates alternate paths to the same FML file", () => {
        const directory = path.join(os.tmpdir(), "fml-debug-paths");
        const program = path.join(directory, "main.fml");
        const sharedMap = path.join(directory, "shared.fml");
        const sharedMapWithDotSegments = `${directory}${path.sep}nested${path.sep}..${path.sep}shared.fml`;
        const sharedMapWithAlternateSeparators = sharedMap.replaceAll("\\", "/");
        const paths = [program, sharedMap, sharedMapWithDotSegments, sharedMapWithAlternateSeparators];
        if (process.platform === "win32") {
            paths.push(sharedMap.toUpperCase());
        }

        assert.deepEqual(deduplicateFmlFilePaths(paths, program), [sharedMap]);
    });

    test("selects the nearest FML token from a 1-based issue position", () => {
        const sourceText = [
            "/// url = 'http://example.org/StructureMap/Main'",
            "group Main(source src, target tgt) extends MissingParent {",
            "}",
        ].join("\n");
        const oneBasedLine = 2;
        const oneBasedColumn = sourceText.split("\n")[1].indexOf("MissingParent") + 2;

        const range = nearestTokenRange(sourceText, oneBasedLine, oneBasedColumn);

        assert.ok(range);
        assert.equal(sourceText.slice(range.startOffset, range.startOffset + range.length), "MissingParent");
    });

    test("resolves models from shared workspace configuration without launch globs", async () => {
        const tempDirectory = await fs.mkdtemp(path.join(os.tmpdir(), "fml-debug-models-"));
        const program = path.join(tempDirectory, "debug.fml");
        const profilePath = path.join(tempDirectory, "StructureDefinition-Profile.json");
        const canonical = "http://example.org/StructureDefinition/Profile";
        const mapText = [
            `uses '${canonical}' alias Profile as source`,
            "group Main(source src : Profile, target tgt) { src -> tgt; }",
        ].join("\n");
        try {
            await fs.writeFile(program, mapText, "utf8");
            await fs.writeFile(profilePath, JSON.stringify({
                fhirVersion: "4.0.1",
                resourceType: "StructureDefinition",
                type: "Patient",
                url: canonical,
            }), "utf8");
            const resolved: string[] = [];

            const dependencies = await resolveFmlDebugDependencies(
                program,
                mapText,
                [],
                () => undefined,
                "4.0.1",
                [profilePath],
                (_resource, filePath) => resolved.push(filePath),
            );

            assert.equal(dependencies.unresolvedResources.length, 0);
            assert.equal(dependencies.modelResources.length, 1);
            assert.deepEqual(resolved, [profilePath]);
        } finally {
            await fs.rm(tempDirectory, {recursive: true, force: true});
        }
    });

    test("stops on each located OperationOutcome error and reports every issue", async function() {
        this.timeout(10_000);
        const extension = vscode.extensions.getExtension(UiConstants.extensionPublisher);
        assert.ok(extension);
        await extension.activate();

        const tempDirectory = await fs.mkdtemp(path.join(os.tmpdir(), "fml-debug-outcome-"));
        const program = path.join(tempDirectory, "main.fml");
        const importedMap = path.join(tempDirectory, "shared.fml");
        const input = path.join(tempDirectory, "input.json");
        const primaryToken = "MissingMain";
        const importedToken = "MissingShared";
        const mapText = [
            "/// url = 'http://example.org/StructureMap/Main'",
            "imports 'http://example.org/StructureMap/Shared'",
            `group Main(source src, target tgt) extends ${primaryToken} {`,
            "  src -> tgt;",
            "}",
        ].join("\n");
        const importedText = [
            "/// url = 'http://example.org/StructureMap/Shared'",
            `group Shared(source src, target tgt) extends ${importedToken} {`,
            "  src -> tgt;",
            "}",
        ].join("\n");
        await fs.writeFile(program, mapText, "utf8");
        await fs.writeFile(importedMap, importedText, "utf8");
        await fs.writeFile(input, "{\"resourceType\":\"Patient\"}", "utf8");

        const outcome = {
            resourceType: "OperationOutcome",
            issue: [
                outcomeIssue(
                    "Primary group error",
                    undefined,
                    3,
                    mapText.split("\n")[2].indexOf(primaryToken) + 2,
                ),
                outcomeIssue(
                    "Imported group error",
                    "shared.fml",
                    2,
                    importedText.split("\n")[1].indexOf(importedToken) + 2,
                ),
                {
                    severity: "warning",
                    code: "processing",
                    diagnostics: "Additional warning",
                },
            ],
        };
        const server = http.createServer((_request, response) => {
            response.writeHead(200, {"Content-Type": "application/fhir+json"});
            response.end(JSON.stringify({
                resourceType: "Parameters",
                parameter: [{name: "outcome", resource: outcome}],
            }));
        });
        await listen(server);
        const address = server.address();
        assert.ok(address && typeof address === "object");

        const protocolMessages: ProtocolMessage[] = [];
        const tracker = vscode.debug.registerDebugAdapterTrackerFactory("fml", {
            createDebugAdapterTracker: () => ({
                onDidSendMessage: message => {
                    if (message && typeof message === "object") {
                        protocolMessages.push(message as ProtocolMessage);
                    }
                },
            }),
        });

        try {
            const started = await vscode.debug.startDebugging(undefined, {
                type: "fml",
                request: "launch",
                name: "FML located outcome test",
                program,
                input,
                serverUrl: `http://127.0.0.1:${address.port}/StructureMap/$transform?debug=true`,
                stopOnEntry: true,
            });
            assert.equal(started, true);
            await waitFor(() => stoppedEvents(protocolMessages).length >= 1);
            assert.equal(stoppedEvents(protocolMessages)[0].body?.reason, "exception");
            await waitFor(() => outputEvents(protocolMessages).some(output => {
                return output.includes("Additional warning");
            }));

            const outputs = outputEvents(protocolMessages);
            assert.ok(outputs.some(output => output.includes("3 OperationOutcome issues")));
            assert.ok(outputs.some(output => output.includes("[1/3] main.fml:3:")));
            assert.ok(outputs.some(output => output.includes("Primary group error")));
            assert.ok(outputs.some(output => output.includes("[2/3] shared.fml:2:")));
            assert.ok(outputs.some(output => output.includes("Imported group error")));
            assert.ok(outputs.some(output => output.includes("[3/3] main.fml: warning: Additional warning")));

            const session = vscode.debug.activeDebugSession;
            assert.ok(session);
            const primaryStack = await session.customRequest("stackTrace", {threadId: 1}) as {
                stackFrames: Array<{line: number; column: number; source?: {path?: string}}>;
            };
            assert.equal(filePathIdentity(primaryStack.stackFrames[0].source?.path), filePathIdentity(program));
            assert.equal(primaryStack.stackFrames[0].line, 3);
            assert.equal(primaryStack.stackFrames[0].column, mapText.split("\n")[2].indexOf(primaryToken) + 1);

            await session.customRequest("stepIn", {threadId: 1});
            await waitFor(() => stoppedEvents(protocolMessages).length >= 2);
            const importedStack = await session.customRequest("stackTrace", {threadId: 1}) as {
                stackFrames: Array<{line: number; column: number; source?: {path?: string}}>;
            };
            assert.equal(filePathIdentity(importedStack.stackFrames[0].source?.path), filePathIdentity(importedMap));
            assert.equal(importedStack.stackFrames[0].line, 2);
            assert.equal(
                importedStack.stackFrames[0].column,
                importedText.split("\n")[1].indexOf(importedToken) + 1,
            );
            const exception = await session.customRequest("exceptionInfo", {threadId: 1}) as {
                description?: string;
            };
            assert.equal(exception.description, "Imported group error");
        } finally {
            await vscode.debug.stopDebugging();
            tracker.dispose();
            await close(server);
            await fs.rm(tempDirectory, {recursive: true, force: true, maxRetries: 5, retryDelay: 100});
        }
    });

    test("launches, inspects variables, steps forward, and steps back", async function() {
        this.timeout(10_000);
        const extension = vscode.extensions.getExtension(UiConstants.extensionPublisher);
        assert.ok(extension);
        await extension.activate();

        const tempDirectory = await fs.mkdtemp(path.join(os.tmpdir(), "fml-debug-"));
        const program = path.join(tempDirectory, "debug.fml");
        const importedMap = path.join(tempDirectory, "shared.fml");
        const input = path.join(tempDirectory, "input.json");
        const mapText = [
            "/// url = 'http://example.org/StructureMap/Main'",
            "uses 'http://example.org/StructureDefinition/Profile' alias Profile as source",
            "uses 'http://hl7.org/fhir/StructureDefinition/Practitioner' alias Practitioner as source",
            "imports 'http://example.org/StructureMap/Shared'",
            "group Main(source src, target tgt) {",
            "  src.id as id -> tgt.id = id;",
            "}",
        ].join("\n");
        await fs.writeFile(program, mapText, "utf8");
        await fs.writeFile(importedMap, [
            "/// url = 'http://example.org/StructureMap/Shared'",
            "group Shared(source src, target tgt) {",
            "  src.code -> tgt.code = translate(src.code, 'http://example.org/ConceptMap/example', 'code');",
            "}",
        ].join("\n"), "utf8");
        await fs.writeFile(
            input,
            "{\"resourceType\":\"Patient\",\"id\":\"example\",\"name\":[{\"family\":\"Smith\"}]}",
            "utf8",
        );
        await fs.writeFile(path.join(tempDirectory, "profile.json"), JSON.stringify({
            fhirVersion: "4.0.1",
            resourceType: "StructureDefinition",
            url: "http://example.org/StructureDefinition/Profile",
        }), "utf8");
        await fs.writeFile(path.join(tempDirectory, "profile-r5.json"), JSON.stringify({
            fhirVersion: "5.0.0",
            resourceType: "StructureDefinition",
            url: "http://example.org/StructureDefinition/Profile",
        }), "utf8");
        await fs.writeFile(path.join(tempDirectory, "conceptmap.json"), JSON.stringify({
            resourceType: "ConceptMap",
            url: "http://example.org/ConceptMap/example",
        }), "utf8");
        await fs.writeFile(path.join(tempDirectory, "ignored.json"), JSON.stringify({
            resourceType: "Patient",
            id: "ignored",
        }), "utf8");
        const document = await vscode.workspace.openTextDocument(program);
        await vscode.window.showTextDocument(document);

        const receivedParameters: Array<{
            extension?: Array<{url: string; valueString: string}>;
            name: string;
            resource?: {entry?: Array<{resource: {
                fhirVersion?: string;
                resourceType: string;
                url?: string;
            }}>};
            valueString?: string;
        }> = [];
        const server = http.createServer((request, response) => {
            let requestBody = "";
            request.setEncoding("utf8");
            request.on("data", chunk => {
                requestBody += chunk;
            });
            request.on("end", () => {
                const parameters = JSON.parse(requestBody) as {parameter: typeof receivedParameters};
                receivedParameters.push(...parameters.parameter);
                response.writeHead(200, {"Content-Type": "application/fhir+json"});
                response.end(JSON.stringify(createDebugResponse(mapText)));
            });
        });
        await listen(server);
        const address = server.address();
        assert.ok(address && typeof address === "object");

        const protocolMessages: ProtocolMessage[] = [];
        const tracker = vscode.debug.registerDebugAdapterTrackerFactory("fml", {
            createDebugAdapterTracker: () => ({
                onDidSendMessage: message => {
                    if (message && typeof message === "object") {
                        protocolMessages.push(message as ProtocolMessage);
                    }
                },
            }),
        });

        try {
            const started = await vscode.debug.startDebugging(undefined, {
                type: "fml",
                request: "launch",
                name: "FML debugger integration test",
                program,
                input,
                dependencies: [path.join(tempDirectory, "*.json")],
                fhirVersion: "4.0.1",
                serverUrl: `http://127.0.0.1:${address.port}/StructureMap/$transform?debug=true`,
                stopOnEntry: true,
            });
            assert.equal(started, true);
            await waitFor(() => stoppedEvents(protocolMessages).length >= 1);
            assert.deepEqual(receivedParameters.map(parameter => parameter.name), [
                "map",
                "map",
                "model",
                "resource",
            ]);
            assert.deepEqual(
                receivedParameters.filter(parameter => parameter.name === "map").map(parameter => {
                    return parameter.extension?.[0].valueString.replaceAll("\\", "/");
                }),
                [
                    "debug.fml",
                    "shared.fml",
                ],
            );
            const modelEntries = receivedParameters.find(parameter => parameter.name === "model")
                ?.resource?.entry ?? [];
            assert.deepEqual(modelEntries.map(entry => entry.resource.resourceType).sort(), [
                "ConceptMap",
                "StructureDefinition",
            ]);
            assert.equal(modelEntries.find(entry => {
                return entry.resource.resourceType === "StructureDefinition";
            })?.resource.fhirVersion, "4.0.1");
            assert.equal(outputEvents(protocolMessages).some(output => {
                return output.includes("StructureDefinition/Practitioner");
            }), false);

            const session = vscode.debug.activeDebugSession;
            assert.ok(session);
            const threads = await session.customRequest("threads") as {
                threads: Array<{id: number}>;
            };
            assert.equal(threads.threads[0].id, 1);

            const stack = await session.customRequest("stackTrace", {
                threadId: 1,
            }) as {stackFrames: Array<{id: number; line: number}>};
            assert.ok(stack.stackFrames.length >= 1);
            assert.equal(stack.stackFrames[0].line, 1);

            const scopes = await session.customRequest("scopes", {
                frameId: stack.stackFrames[0].id,
            }) as {scopes: Array<{name: string; variablesReference: number}>};
            const stateScope = scopes.scopes.find(scope => scope.name.startsWith("State"));
            assert.equal(stateScope, undefined);
            const traceVariablesScope = scopes.scopes.find(scope => scope.name === "FML variables");
            assert.ok(traceVariablesScope);
            const traceVariables = await session.customRequest("variables", {
                variablesReference: traceVariablesScope.variablesReference,
            }) as {
                variables: Array<{
                    name: string;
                    type?: string;
                    value: string;
                    variablesReference: number;
                }>;
            };
            const sourceVariable = traceVariables.variables.find(variable => variable.name === "src");
            assert.ok(sourceVariable);
            assert.equal(sourceVariable.value, "Patient");
            assert.equal(sourceVariable.type, "FHIR.Patient");
            assert.ok(sourceVariable.variablesReference > 0);
            const profileVariable = traceVariables.variables.find(variable => variable.name === "profile");
            assert.ok(profileVariable);
            assert.equal(profileVariable.value, "Meta");
            assert.equal(profileVariable.type, "Meta");
            assert.ok(profileVariable.variablesReference > 0);
            const sourceChildren = await session.customRequest("variables", {
                variablesReference: sourceVariable.variablesReference,
            }) as {variables: Array<{name: string; type?: string; value: string}>};
            assert.ok(sourceChildren.variables.some(variable => {
                return variable.name === "id"
                    && variable.value === "example"
                    && variable.type === "string";
            }));
            const resultScope = scopes.scopes.find(scope => scope.name.startsWith("Final result"));
            assert.ok(resultScope);
            assert.equal(
                resultScope.name,
                "Final result (http://example.org/StructureDefinition|MyLogicalPatient)",
            );
            const resultVariables = await session.customRequest("variables", {
                variablesReference: resultScope.variablesReference,
            }) as {variables: Array<{name: string; type?: string; value: string}>};
            assert.ok(resultVariables.variables.some(variable => {
                return variable.name === "customField"
                    && variable.value === "ABC"
                    && variable.type === "MyCustomCode";
            }));
            await waitFor(() => vscode.workspace.textDocuments.some(document => {
                return document.isUntitled
                    && document.languageId === "json"
                    && document.getText() === '{\n  "customField": "ABC"\n}';
            }));

            const watch = await session.customRequest("evaluate", {
                expression: "$state.id",
                context: "watch",
                frameId: stack.stackFrames[0].id,
            }) as {result: string; type?: string};
            assert.equal(watch.result, "example");
            assert.equal(watch.type, "string");

            const variableWatch = await session.customRequest("evaluate", {
                expression: "src.name[0].family",
                context: "watch",
                frameId: stack.stackFrames[0].id,
            }) as {result: string; type?: string};
            assert.equal(variableWatch.result, "Smith");
            assert.equal(variableWatch.type, "string");

            const arrayWatch = await session.customRequest("evaluate", {
                expression: "$state.name[0].family",
                context: "watch",
                frameId: stack.stackFrames[0].id,
            }) as {result: string; type?: string};
            assert.equal(arrayWatch.result, "Smith");
            assert.equal(arrayWatch.type, "string");

            const logicalWatch = await session.customRequest("evaluate", {
                expression: "$result.customField",
                context: "watch",
                frameId: stack.stackFrames[0].id,
            }) as {result: string; type?: string};
            assert.equal(logicalWatch.result, "ABC");
            assert.equal(logicalWatch.type, "MyCustomCode");

            await session.customRequest("stepIn", {threadId: 1});
            await waitFor(() => stoppedEvents(protocolMessages).length >= 2);
            assert.ok(outputEvents(protocolMessages).some(output => output.includes("[1]")));

            await session.customRequest("stepBack", {threadId: 1});
            await waitFor(() => stoppedEvents(protocolMessages).length >= 3);
            assert.ok(outputEvents(protocolMessages).filter(output => output.includes("[0]")).length >= 2);
        } finally {
            await vscode.debug.stopDebugging();
            tracker.dispose();
            await close(server);
            await fs.rm(tempDirectory, {recursive: true, force: true});
        }
    });
});

function outcomeIssue(
    message: string,
    fileName: string | undefined,
    line: number,
    column: number,
): object {
    return {
        severity: "error",
        code: "processing",
        details: {text: message},
        extension: [
            ...(fileName ? [{
                url: "http://hl7.org/fhir/StructureDefinition/operationoutcome-file",
                valueString: fileName,
            }] : []),
            {
                url: "http://hl7.org/fhir/StructureDefinition/operationoutcome-issue-line",
                valueInteger: line,
            },
            {
                url: "http://hl7.org/fhir/StructureDefinition/operationoutcome-issue-col",
                valueInteger: column,
            },
        ],
    };
}

function filePathIdentity(filePath: string | undefined): string | undefined {
    return process.platform === "win32" ? filePath?.toLowerCase() : filePath;
}

function createDebugResponse(mapText: string): object {
    const ruleOffset = mapText.indexOf("src.id");
    return {
        resourceType: "Parameters",
        parameter: [
            {
                name: "result",
                valueString: JSON.stringify({
                    value: {customField: "ABC"},
                    types: {
                        "$": {
                            name: "MyLogicalPatient",
                            namespace: "http://example.org/StructureDefinition",
                        },
                        "$.customField": {name: "MyCustomCode"},
                    },
                }),
            },
            {
                name: "parameters",
                part: [{name: "evaluator", valueString: "Mock FML engine"}],
            },
            {
                name: "trace",
                part: [
                    {
                        name: "debug",
                        valueString: "Group : Main",
                        extension: [
                            {url: cursorUrl, valueString: `0 - ${mapText.length}`},
                            {
                                url: variableUrl,
                                extension: [
                                    {url: "name-INPUT", valueString: "src"},
                                    {url: "path", valueString: "Patient"},
                                ],
                            },
                            {
                                url: variableUrl,
                                extension: [
                                    {url: "name-OUTPUT", valueString: "profile"},
                                    {url: "path", valueString: "Endpoint.meta"},
                                    {url: "type", valueString: "Meta"},
                                    {
                                        url: "value",
                                        valueString: "{\"lastUpdated\":\"2020-07-07T13:26:22Z\"}",
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        name: "debug",
                        valueString: "  rule : copy-id",
                        extension: [
                            {url: cursorUrl, valueString: `${ruleOffset} - ${ruleOffset + 38}`},
                            {
                                url: jsonValueUrl,
                                valueString: "{\"resourceType\":\"Patient\",\"id\":\"example\"}",
                            },
                        ],
                    },
                ],
            },
        ],
    };
}

function stoppedEvents(messages: ProtocolMessage[]): ProtocolMessage[] {
    return messages.filter(message => message.type === "event" && message.event === "stopped");
}

function outputEvents(messages: ProtocolMessage[]): string[] {
    return messages
        .filter(message => message.type === "event" && message.event === "output")
        .map(message => String(message.body?.output ?? ""));
}

async function waitFor(predicate: () => boolean, timeoutMs = 5000): Promise<void> {
    const startedAt = Date.now();
    while (Date.now() - startedAt < timeoutMs) {
        if (predicate()) {
            return;
        }
        await new Promise(resolve => setTimeout(resolve, 25));
    }
    assert.fail("Timed out waiting for FML debugger state.");
}

async function listen(server: http.Server): Promise<void> {
    await new Promise<void>((resolve, reject) => {
        server.once("error", reject);
        server.listen(0, "127.0.0.1", () => {
            server.off("error", reject);
            resolve();
        });
    });
}

async function close(server: http.Server): Promise<void> {
    await new Promise<void>((resolve, reject) => {
        server.close(error => error ? reject(error) : resolve());
    });
}
