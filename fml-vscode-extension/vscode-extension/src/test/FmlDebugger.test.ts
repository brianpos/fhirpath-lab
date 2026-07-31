import * as assert from "node:assert";
import {promises as fs} from "node:fs";
import * as http from "node:http";
import os from "node:os";
import path from "node:path";
import * as vscode from "vscode";
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
    test("launches, inspects variables, steps forward, and steps back", async () => {
        const extension = vscode.extensions.getExtension(UiConstants.extensionPublisher);
        assert.ok(extension);
        await extension.activate();

        const tempDirectory = await fs.mkdtemp(path.join(os.tmpdir(), "fml-debug-"));
        const program = path.join(tempDirectory, "debug.fml");
        const input = path.join(tempDirectory, "input.json");
        const mapText = [
            "group Main(source src, target tgt) {",
            "  src.id as id -> tgt.id = id 'copy-id';",
            "}",
        ].join("\n");
        await fs.writeFile(program, mapText, "utf8");
        await fs.writeFile(
            input,
            "{\"resourceType\":\"Patient\",\"id\":\"example\",\"name\":[{\"family\":\"Smith\"}]}",
            "utf8",
        );
        const document = await vscode.workspace.openTextDocument(program);
        await vscode.window.showTextDocument(document);

        const receivedRequests: string[] = [];
        const server = http.createServer((request, response) => {
            let requestBody = "";
            request.setEncoding("utf8");
            request.on("data", chunk => {
                requestBody += chunk;
            });
            request.on("end", () => {
                const parameters = JSON.parse(requestBody) as {
                    parameter: Array<{name: string}>;
                };
                receivedRequests.push(...parameters.parameter.map(parameter => parameter.name));
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
                serverUrl: `http://127.0.0.1:${address.port}/StructureMap/$transform?debug=true`,
                stopOnEntry: true,
            });
            assert.equal(started, true);
            await waitFor(() => stoppedEvents(protocolMessages).length >= 1);
            assert.deepEqual(receivedRequests, ["map", "resource"]);

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
            assert.ok(stateScope);
            assert.equal(stateScope.name, "State (FHIR.Patient)");
            const traceVariablesScope = scopes.scopes.find(scope => scope.name === "Variables");
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
            const sourceChildren = await session.customRequest("variables", {
                variablesReference: sourceVariable.variablesReference,
            }) as {variables: Array<{name: string; type?: string; value: string}>};
            assert.ok(sourceChildren.variables.some(variable => {
                return variable.name === "id"
                    && variable.value === "example"
                    && variable.type === "string";
            }));
            const variables = await session.customRequest("variables", {
                variablesReference: stateScope.variablesReference,
            }) as {variables: Array<{name: string; type?: string; value: string}>};
            assert.ok(variables.variables.some(variable => {
                return variable.name === "resourceType"
                    && variable.value === "Patient"
                    && variable.type === "string";
            }));
            assert.ok(variables.variables.some(variable => {
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

            const watch = await session.customRequest("evaluate", {
                expression: "$state.id",
                context: "watch",
                frameId: stack.stackFrames[0].id,
            }) as {result: string; type?: string};
            assert.equal(watch.result, "example");
            assert.equal(watch.type, "string");

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
