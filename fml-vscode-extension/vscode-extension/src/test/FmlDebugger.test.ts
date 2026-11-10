import * as assert from "node:assert";
import {promises as fs} from "node:fs";
import * as http from "node:http";
import os from "node:os";
import path from "node:path";
import * as vscode from "vscode";
import {DebugProtocol} from "@vscode/debugprotocol";
import {deduplicateFmlFilePaths, resolveFmlDebugDependencies} from "../FmlDebugDependencies";
import {FmlDebugSession, nearestTokenRange, type FmlLaunchRequestArguments} from "../FmlDebugSession";
import {FmlDebugAdapterDescriptorFactory, FmlDebugOutputDocuments} from "../FmlDebugger";
import {FmlTraceLocationIndex} from "../FmlTraceLocationIndex";
import {UiConstants} from "../constants/UiConstants";

interface ProtocolMessage {
    body?: Record<string, unknown>;
    command?: string;
    event?: string;
    message?: string;
    success?: boolean;
    type?: string;
}

const cursorUrl = "http://fhirpath-lab.com/StructureDefinition/Cursor";
const traceLocationUrl = "http://fhirpath-lab.com/StructureDefinition/TraceLocation";
const variableUrl = "http://fhirpath-lab.com/StructureDefinition/Variable";
const jsonValueUrl = "http://fhir.forms-lab.com/StructureDefinition/json-value";

suite("FML Trace Replay Debugger", () => {
    for (const context of ["hover", "watch", "repl", undefined] as const) {
        test(`handles unresolved ${context ?? "default-context"} expressions with context-appropriate notifications`, () => {
            const adapter = new FmlDebugSession();
            const messages: ProtocolMessage[] = [];
            const subscription = adapter.onDidSendMessage(message => messages.push(message));
            const expression = "src.onset";
            try {
                const request: DebugProtocol.EvaluateRequest = {
                    seq: 1, type: "request", command: "evaluate",
                    arguments: {expression, context, frameId: 1},
                };
                adapter.handleMessage(request);
                assert.equal(messages.length, 1);
                const response = messages[0];
                assert.equal(response.type, "response");
                assert.equal(response.command, "evaluate");
                assert.equal(response.success, false);
                assert.equal(response.message, `Unable to resolve watch expression '${expression}'.`);
                assert.deepEqual(response.body?.error, {
                    id: 2001,
                    format: `Unable to resolve watch expression '${expression}'.`,
                    showUser: context !== "hover",
                });
                assert.equal(response.body?.result, undefined);
            } finally {
                subscription.dispose();
                adapter.dispose();
            }
        });
    }

    test("logs full server traffic for modern and legacyPost launches only when enabled, never for local execution", async function() {
        this.timeout(30_000);
        const settings = vscode.workspace.getConfiguration("fmlTools");
        const previousLogging = settings.inspect<boolean>("debug.logServerTraffic")?.globalValue;
        assert.equal(settings.inspect<boolean>("debug.logServerTraffic")?.defaultValue, false);
        const extension = vscode.extensions.getExtension(UiConstants.extensionPublisher);
        assert.ok(extension);
        assert.equal(extension.packageJSON.contributes.configuration.properties["fmlTools.debug.logServerTraffic"].scope, "application");
        const debuggerContribution = extension.packageJSON.contributes.debuggers.find(
            (contribution: {type: string}) => contribution.type === "fml",
        );
        assert.equal(debuggerContribution.configurationAttributes.launch.properties.legacyPost.type, "boolean");
        assert.equal(debuggerContribution.configurationAttributes.launch.properties.legacyPost.default, false);
        const directory = await fs.mkdtemp(path.join(os.tmpdir(), "fml-transport-logging-"));
        const program = path.join(directory, "main.fml");
        const input = path.join(directory, "input.json");
        await fs.writeFile(program, [
            "uses 'http://hl7.org/fhir/StructureDefinition/Patient' alias P as source",
            "uses 'http://hl7.org/fhir/StructureDefinition/Patient' alias T as target",
            "group Main(source src : P, target tgt : T) { src.id -> tgt.id; }",
        ].join("\n"));
        await fs.writeFile(input, '{"resourceType":"Patient","id":"transport-input"}');
        const logs: string[] = [];
        const channel: vscode.OutputChannel = {
            name: "FML test output",
            append: text => logs.push(text),
            appendLine: text => logs.push(text),
            replace: text => { logs.length = 0; logs.push(text); },
            clear: () => { logs.length = 0; },
            show: () => {},
            hide: () => {},
            dispose: () => {},
        };
        const factory = new FmlDebugAdapterDescriptorFactory(undefined, channel);
        const receivedBodies: string[] = [];
        const receivedHeaders: http.IncomingHttpHeaders[] = [];
        let requestCount = 0;
        let pauseResponse = false;
        let pendingResponse: (() => void) | undefined;
        const responseText = '{"resourceType":"Parameters","parameter":[{"name":"return","resource":{"resourceType":"Patient","id":"transport-output","number":9007199254740993}},{"name":"trace","part":[{"name":"phase","valueCode":"enter"}]}]}';
        const server = http.createServer((request, response) => {
            requestCount++;
            receivedHeaders.push(request.headers);
            let body = "";
            request.setEncoding("utf8");
            request.on("data", chunk => { body += chunk; });
            request.on("end", () => {
                receivedBodies.push(body);
                const send = (): void => {
                    response.writeHead(200, {"Content-Type": "application/fhir+json"});
                    response.end(responseText);
                };
                if (pauseResponse) {
                    pendingResponse = send;
                } else {
                    send();
                }
            });
        });
        await listen(server);
        const address = server.address();
        assert.ok(address && typeof address === "object");
        const serverUrl = `http://127.0.0.1:${address.port}/transformDebugger`;
        try {
            for (const scenario of [
                {engine: "remote", legacyPost: undefined, enabled: undefined, expectedRequests: 1, expectedLogs: 0},
                {engine: "remote", legacyPost: true, enabled: true, expectedRequests: 2, expectedLogs: 2},
                {engine: "remote", legacyPost: false, enabled: false, expectedRequests: 3, expectedLogs: 2},
                {engine: "local", legacyPost: true, enabled: true, expectedRequests: 3, expectedLogs: 2},
                {engine: "remote", legacyPost: undefined, enabled: true, expectedRequests: 4, expectedLogs: 3, disableBeforeResponse: true},
            ] as const) {
                const {engine, legacyPost, enabled, expectedRequests, expectedLogs} = scenario;
                const endpoint = engine === "remote" ? serverUrl : undefined;
                pauseResponse = "disableBeforeResponse" in scenario;
                await settings.update("debug.logServerTraffic", enabled, vscode.ConfigurationTarget.Global);
                const session: vscode.DebugSession = {
                    id: `transport-${engine}`,
                    type: "fml",
                    name: "Transport logging test",
                    workspaceFolder: undefined,
                    configuration: {
                        type: "fml", request: "launch", name: "Transport logging test",
                        program, input, serverUrl: endpoint, legacyPost, stopOnEntry: true,
                    },
                    customRequest: async () => { throw new Error("Unexpected custom request."); },
                    getDebugProtocolBreakpoint: async () => undefined,
                };
                const descriptor = factory.createDebugAdapterDescriptor(session);
                assert.ok(descriptor instanceof vscode.DebugAdapterInlineImplementation);
                assert.ok("implementation" in descriptor);
                assert.ok(descriptor.implementation instanceof FmlDebugSession);
                const adapter = descriptor.implementation;
                const messages: ProtocolMessage[] = [];
                const subscription = adapter.onDidSendMessage(message => messages.push(message));
                try {
                    const args: FmlLaunchRequestArguments = {program, input, serverUrl: endpoint, legacyPost, stopOnEntry: true};
                    const launch: DebugProtocol.LaunchRequest = {
                        seq: 1, type: "request", command: "launch",
                        arguments: args,
                    };
                    adapter.handleMessage(launch);
                    if (pauseResponse) {
                        await waitFor(() => pendingResponse !== undefined);
                        await settings.update("debug.logServerTraffic", false, vscode.ConfigurationTarget.Global);
                        assert.ok(pendingResponse);
                        pendingResponse();
                        pendingResponse = undefined;
                    }
                    await waitFor(() => stoppedEvents(messages).length > 0);
                    assert.equal(stoppedEvents(messages)[0].body?.reason, "entry", JSON.stringify(messages));
                    assert.equal(requestCount, expectedRequests);
                    assert.equal(logs.length, expectedLogs);
                    if (engine === "remote") {
                        const body = JSON.parse(receivedBodies[requestCount - 1]);
                        assert.equal(body.parameter[0].name, legacyPost ? "map" : "srcMap");
                        const inputs = body.parameter.filter((part: {name: string}) =>
                            part.name === "resource" || part.name === "content");
                        assert.deepEqual(inputs, [legacyPost
                            ? {name: "resource", valueString: '{"resourceType":"Patient","id":"transport-input"}'}
                            : {name: "content", resource: {
                                resourceType: "Binary", contentType: "application/fhir+json",
                                data: Buffer.from('{"resourceType":"Patient","id":"transport-input"}').toString("base64"),
                            }}]);
                    }
                } finally {
                    const disconnect: DebugProtocol.DisconnectRequest = {
                        seq: 2, type: "request", command: "disconnect",
                    };
                    adapter.handleMessage(disconnect);
                    subscription.dispose();
                    adapter.dispose();
                }
            }
            assert.ok(logs[0].includes("main.fml; session transport-remote"));
            assert.equal(receivedHeaders[1].accept, "application/fhir+json, application/json");
            assert.equal(receivedHeaders[1]["content-type"], "application/fhir+json");
            const requestHeading = `FML server request: POST ${serverUrl}\nAccept: ${receivedHeaders[1].accept}\nContent-Type: ${receivedHeaders[1]["content-type"]}\n\n`;
            const requestStart = logs[0].indexOf(requestHeading);
            assert.ok(requestStart >= 0);
            assert.deepEqual(JSON.parse(logs[0].slice(requestStart + requestHeading.length)), JSON.parse(receivedBodies[1]));
            const responseHeading = `FML server response: HTTP 200 OK from ${serverUrl}\n`;
            const responseStart = logs[1].indexOf(responseHeading);
            assert.ok(responseStart >= 0);
            assert.equal(logs[1].slice(responseStart + responseHeading.length), responseText);
            assert.ok(logs[2].includes(requestHeading));
        } finally {
            await settings.update("debug.logServerTraffic", previousLogging, vscode.ConfigurationTarget.Global);
            factory.dispose();
            pendingResponse?.();
            await close(server);
            for (const document of vscode.workspace.textDocuments.filter(document =>
                document.isUntitled && /transport-(?:input|output)/.test(document.getText()))) {
                await closeResultDocument(document);
            }
            await fs.rm(directory, {recursive: true, force: true, maxRetries: 5, retryDelay: 100});
        }
    });

    test("local debugger forwards terminology launch settings to the translate host", async function() {
        this.timeout(20_000);
        const extension = vscode.extensions.getExtension(UiConstants.extensionPublisher);
        assert.ok(extension);
        await extension.activate();
        const directory = await fs.mkdtemp(path.join(os.tmpdir(), "fml-debug-terminology-"));
        const program = path.join(directory, "main.fml");
        const input = path.join(directory, "input.json");
        await fs.writeFile(program, [
            "uses 'http://hl7.org/fhir/StructureDefinition/Patient' alias S as source",
            "uses 'http://hl7.org/fhir/StructureDefinition/Observation' alias T as target",
            "group Main(source src : S, target tgt : T) {",
            " src.gender as value -> tgt.value = translate(value, 'http://example.test/DebuggerOnly|2', 'CodeableConcept');",
            "}",
        ].join("\n"));
        await fs.writeFile(input, '{"resourceType":"Patient","gender":"male"}');
        let body = "";
        const server = http.createServer((request, response) => {
            request.setEncoding("utf8");
            request.on("data", chunk => { body += chunk; });
            request.on("end", () => {
                response.writeHead(200, {"Content-Type": "application/fhir+json"});
                response.end(JSON.stringify({resourceType: "Parameters", parameter: [
                    {name: "result", valueBoolean: true},
                    {name: "match", part: [{name: "relationship", valueCode: "equivalent"},
                        {name: "concept", valueCoding: {code: "debug-translated"}}]},
                ]}));
            });
        });
        await listen(server);
        const address = server.address();
        assert.ok(address && typeof address === "object");
        const messages: ProtocolMessage[] = [];
        let session: vscode.DebugSession | undefined;
        const tracker = vscode.debug.registerDebugAdapterTrackerFactory("fml", {
            createDebugAdapterTracker: candidate => {
                if (candidate.name !== "Terminology debug test") {
                    return undefined;
                }
                session = candidate;
                return {onDidSendMessage: message => messages.push(message)};
            },
        });
        try {
            assert.equal(await vscode.debug.startDebugging(undefined, {
                type: "fml", request: "launch", name: "Terminology debug test",
                program, input, stopOnEntry: true,
                terminologyServerUrl: `http://127.0.0.1:${address.port}/fhir`, terminologyFhirVersion: "R5",
            }), true);
            await waitFor(() => stoppedEvents(messages).length > 0);
            assert.equal(stoppedEvents(messages)[0].body?.reason, "entry");
            assert.ok(session);
            await waitFor(() => vscode.debug.activeDebugSession?.id === session?.id);
            await session.customRequest("threads");
            await waitFor(() => vscode.workspace.textDocuments.some(document =>
                document.isUntitled && document.getText().includes("debug-translated")));
            const parameters = JSON.parse(body).parameter;
            assert.equal(parameters.find((part: {name: string}) => part.name === "url").valueUri, "http://example.test/DebuggerOnly");
            assert.deepEqual(parameters.find((part: {name: string}) => part.name === "sourceCoding").valueCoding, {code: "male"});
        } finally {
            await stopLocalDebugSession(session);
            tracker.dispose();
            await close(server);
            for (const document of vscode.workspace.textDocuments.filter(document =>
                document.isUntitled && document.getText().includes("debug-translated"))) {
                await closeResultDocument(document);
            }
            await fs.rm(directory, {recursive: true, force: true, maxRetries: 5, retryDelay: 100});
        }
    });

    test("reports local execution errors through stopped replay and the Debug Console", async function() {
        this.timeout(15_000);
        const extension = vscode.extensions.getExtension(UiConstants.extensionPublisher);
        assert.ok(extension);
        await extension.activate();
        const directory = await fs.mkdtemp(path.join(os.tmpdir(), "fml-local-error-"));
        const program = path.join(directory, "failure.fml");
        const input = path.join(directory, "input.json");
        await fs.writeFile(program, `
uses 'http://hl7.org/fhir/StructureDefinition/Patient' alias P as source
uses 'http://hl7.org/fhir/StructureDefinition/Patient' alias T as target
group Main(source src : P, target tgt : T) {
 src.id -> tgt.id;
 src.gender check (false) -> tgt.gender;
}`);
        await fs.writeFile(input, '{"resourceType":"Patient","id":"partial","gender":"male"}');
        const messages: ProtocolMessage[] = [];
        const tracker = vscode.debug.registerDebugAdapterTrackerFactory("fml", {
            createDebugAdapterTracker: session => session.name === "Local failure test"
                ? {onDidSendMessage: message => messages.push(message)} : undefined,
        });
        try {
            assert.equal(await vscode.debug.startDebugging(undefined, {
                type: "fml", request: "launch", name: "Local failure test",
                program, input, stopOnEntry: false,
            }), true);
            await waitFor(() => stoppedEvents(messages).some(message => message.body?.reason === "exception"));
            assert.ok(outputEvents(messages).some(output => output.includes("check failed")));
            assert.ok(outputEvents(messages).some(output => output.includes("recording is stopped")));
            const session = vscode.debug.activeDebugSession;
            assert.ok(session);
            const stack = await session.customRequest("stackTrace", {threadId: 1});
            assert.ok(stack.stackFrames.length > 0);
            const exception = await session.customRequest("exceptionInfo", {threadId: 1});
            assert.match(exception.description ?? exception.exceptionId, /check failed/);
        } finally {
            await stopLocalDebugSession(vscode.debug.activeDebugSession);
            tracker.dispose();
            await fs.rm(directory, {recursive: true, force: true, maxRetries: 5, retryDelay: 100});
        }
    });

    test("defaults to the local engine without serverUrl and replays its recorded execution", async function() {
        this.timeout(15_000);
        const extension = vscode.extensions.getExtension(UiConstants.extensionPublisher);
        assert.ok(extension);
        await extension.activate();
        const directory = await fs.mkdtemp(path.join(os.tmpdir(), "fml-local-debug-"));
        const program = path.join(directory, "main.fml");
        const input = path.join(directory, "input.json");
        await fs.writeFile(program, `
uses 'http://hl7.org/fhir/StructureDefinition/Patient' alias P as source
uses 'http://hl7.org/fhir/StructureDefinition/Patient' alias T as target
group Main(source src : P, target tgt : T) { src.id -> tgt.id; }`);
        await fs.writeFile(input, '{"resourceType":"Patient","id":"vscode-local"}');
        const messages: ProtocolMessage[] = [];
        const tracker = vscode.debug.registerDebugAdapterTrackerFactory("fml", {
            createDebugAdapterTracker: session => session.name === "Local execution test"
                ? {onDidSendMessage: message => messages.push(message)} : undefined,
        });
        try {
            assert.equal(await vscode.debug.startDebugging(undefined, {
                type: "fml", request: "launch", name: "Local execution test",
                program, input, stopOnEntry: true,
                localTrace: {detail: "rules", maxEvents: 10000, maxBytes: 8388608},
            }), true);
            await waitFor(() => stoppedEvents(messages).length > 0);
            await waitFor(() => outputEvents(messages).some(output => output.includes("JavaScript")));
            await waitFor(() => vscode.workspace.textDocuments.some(document =>
                document.isUntitled && document.getText().includes('"vscode-local"')));
            const session = vscode.debug.activeDebugSession;
            assert.ok(session);
            const stack = await session.customRequest("stackTrace", {threadId: 1});
            assert.ok(stack.stackFrames.length > 0);
            const scopes = await session.customRequest("scopes", {frameId: stack.stackFrames[0].id}) as {
                scopes: Array<{name: string; variablesReference: number}>;
            };
            const inputScope = scopes.scopes.find(scope => scope.name.toLowerCase() === "input variables");
            const outputScope = scopes.scopes.find(scope => scope.name.toLowerCase() === "output variables");
            assert.ok(inputScope);
            assert.ok(outputScope);
            assert.ok(scopes.scopes.some(scope => scope.name.startsWith("Final result")));
            assert.equal(scopes.scopes.some(scope => scope.name === "Trace event"), false);
            const inputs = await session.customRequest("variables", {
                variablesReference: inputScope.variablesReference,
            }) as {variables: Array<{name: string; variablesReference: number; evaluateName?: string}>};
            const sourceVariable = inputs.variables.find(variable => variable.name === "src");
            assert.ok(sourceVariable);
            assert.equal(sourceVariable.evaluateName, "src");
            const sourceValues = await session.customRequest("variables", {
                variablesReference: sourceVariable.variablesReference,
            }) as {variables: Array<{name: string; value: string}>};
            assert.ok(sourceValues.variables.some(variable =>
                variable.name === "id" && variable.value === "vscode-local"));
            await session.customRequest("next", {threadId: 1});
            await waitFor(() => stoppedEvents(messages).length > 1);
            const output = vscode.workspace.textDocuments.find(document =>
                document.isUntitled && document.getText().includes('"vscode-local"'));
            assert.ok(output);
            assert.ok(output.lineCount > 1);
            await stopLocalDebugSession(session);
            const stopCount = stoppedEvents(messages).length;
            await fs.writeFile(input, '{"resourceType":"Patient","id":"vscode-local-updated"}');
            assert.equal(await vscode.debug.startDebugging(undefined, {
                type: "fml", request: "launch", name: "Local execution test",
                program, input,
                stopOnEntry: true,
            }), true);
            await waitFor(() => stoppedEvents(messages).length > stopCount);
            assert.equal(output.isClosed, false);
            assert.equal(JSON.parse(output.getText()).id, "vscode-local-updated");
            assert.equal(vscode.workspace.textDocuments.filter(document =>
                document.isUntitled && document.getText().includes("vscode-local")).length, 1);
        } finally {
            await stopLocalDebugSession(vscode.debug.activeDebugSession);
            tracker.dispose();
            await fs.rm(directory, {recursive: true, force: true, maxRetries: 5, retryDelay: 100});
        }
    });

    test("reuses remote outputs across sessions and separates endpoints without replacing results on failure", async function() {
        this.timeout(30_000);
        const extension = vscode.extensions.getExtension(UiConstants.extensionPublisher);
        assert.ok(extension);
        await extension.activate();
        const directory = await fs.mkdtemp(path.join(os.tmpdir(), "fml-remote-output-"));
        const program = path.join(directory, "main.fml");
        const input = path.join(directory, "input.json");
        await fs.writeFile(program, "group Main(source src, target tgt) { src.id -> tgt.id; }");
        await fs.writeFile(input, '{"resourceType":"Patient","id":"input"}');
        let run = 0;
        let failure = false;
        const server = http.createServer((request, response) => {
            request.resume();
            request.on("end", () => {
                run++;
                response.writeHead(200, {"Content-Type": "application/fhir+json"});
                response.end(JSON.stringify({
                    resourceType: "Parameters",
                    parameter: [
                        ...(failure ? [{
                            name: "outcome",
                            resource: {resourceType: "OperationOutcome", issue: [
                                {severity: "error", code: "processing", diagnostics: "synthetic output failure"},
                            ]},
                        }] : [{
                            name: "return",
                            resource: {resourceType: "Patient", id: `remote-reuse-${run}`},
                        }]),
                        {name: "trace", part: [{
                            name: "debug",
                            valueString: "Group : Main",
                            extension: [{
                                url: variableUrl,
                                extension: [
                                    {url: "name-INPUT", valueString: "src"},
                                    {url: "path", valueString: "Patient"},
                                ],
                            }],
                        }]},
                    ],
                }));
            });
        });
        await listen(server);
        const address = server.address();
        assert.ok(address && typeof address === "object");
        const messages: ProtocolMessage[] = [];
        let runningSession: vscode.DebugSession | undefined;
        const tracker = vscode.debug.registerDebugAdapterTrackerFactory("fml", {
            createDebugAdapterTracker: session => {
                if (session.name !== "Remote output reuse") {
                    return undefined;
                }
                runningSession = session;
                return {onDidSendMessage: message => messages.push(message)};
            },
        });
        const launch = async (engine: string): Promise<void> => {
            const stopCount = stoppedEvents(messages).length;
            assert.equal(await vscode.debug.startDebugging(undefined, {
                type: "fml", request: "launch", name: "Remote output reuse",
                program, input, stopOnEntry: true,
                serverUrl: `http://127.0.0.1:${address.port}/${engine}`,
            }), true);
            await waitFor(() => stoppedEvents(messages).length > stopCount);
            assert.ok(runningSession);
            await waitFor(() => vscode.debug.activeDebugSession?.id === runningSession?.id);
            await runningSession.customRequest("threads");
            const stack = await runningSession.customRequest("stackTrace", {threadId: 1}) as {
                stackFrames: Array<{id: number}>;
            };
            const scopes = await runningSession.customRequest("scopes", {frameId: stack.stackFrames[0].id}) as {
                scopes: Array<{name: string; variablesReference: number}>;
            };
            const variablesScope = scopes.scopes.find(scope => scope.name === "FML variables");
            assert.ok(variablesScope);
            assert.equal(scopes.scopes.some(scope => scope.name === "Trace event"), false);
            const variables = await runningSession.customRequest("variables", {
                variablesReference: variablesScope.variablesReference,
            }) as {variables: Array<{name: string; value: string; evaluateName?: string; variablesReference: number}>};
            const sourceVariable = variables.variables.find(variable => variable.name === "src");
            assert.ok(sourceVariable);
            assert.equal(sourceVariable.evaluateName, "src");
            const sourceValues = await runningSession.customRequest("variables", {
                variablesReference: sourceVariable.variablesReference,
            }) as {variables: Array<{name: string; value: string}>};
            assert.ok(sourceValues.variables.some(variable => variable.name === "id" && variable.value === "input"));
            await stopLocalDebugSession(runningSession);
            runningSession = undefined;
        };
        const resultDocuments = (): vscode.TextDocument[] => vscode.workspace.textDocuments.filter(document =>
            document.isUntitled && document.getText().includes("remote-reuse-"));
        try {
            await launch("engine-a");
            const first = resultDocuments()[0];
            assert.ok(first);
            await launch("engine-a");
            assert.equal(resultDocuments().length, 1);
            assert.equal(JSON.parse(first.getText()).id, "remote-reuse-2");
            await launch("engine-b");
            assert.equal(resultDocuments().length, 2);
            assert.equal(JSON.parse(first.getText()).id, "remote-reuse-2");
            failure = true;
            await launch("engine-a");
            assert.equal(resultDocuments().length, 2);
            assert.equal(JSON.parse(first.getText()).id, "remote-reuse-2");
            assert.equal(stoppedEvents(messages).at(-1)?.body?.reason, "exception");
        } finally {
            await stopLocalDebugSession(runningSession);
            tracker.dispose();
            await close(server);
            for (const document of resultDocuments()) {
                await closeResultDocument(document);
            }
            await fs.rm(directory, {recursive: true, force: true, maxRetries: 5, retryDelay: 100});
        }
    });

    test("maps simplified StructureMap locations to FML cursor ranges and back", () => {
        const sourceText = [
            "group First(source src, target tgt) { src.a -> tgt.a; }",
            "group Second(source src, target tgt) {",
            "  src.a -> tgt.a;",
            "  src.b -> tgt.b;",
            "  src.c -> tgt.c;",
            "}",
        ].join("\n");
        const location = "StructureMap.group[1].rule[2].target[0]";
        const index = FmlTraceLocationIndex.fromSourceText(sourceText);

        const range = index?.rangeFor(location);

        assert.ok(range);
        assert.equal(sourceText.slice(range.startOffset, range.startOffset + range.length), "tgt.c");
        assert.equal(index?.locationFor(range), location);
    });

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

            await waitFor(() => vscode.debug.activeDebugSession?.name === "FML located outcome test");
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
            await stopLocalDebugSession(vscode.debug.activeDebugSession);
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
            valueBoolean?: boolean;
        }> = [];
        let receivedUrl: string | undefined;
        const server = http.createServer((request, response) => {
            receivedUrl = request.url;
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
            assert.deepEqual(receivedParameters.filter(parameter => parameter.name !== "debug").map(parameter => parameter.name), [
                "srcMap",
                "srcMap",
                "model",
                "content",
            ]);
            assert.ok(receivedUrl);
            assert.ok(
                new URL(receivedUrl, `http://127.0.0.1:${address.port}`).searchParams.get("debug") === "true"
                    || receivedParameters.some(parameter => parameter.name === "debug" && parameter.valueBoolean === true),
                "The request must enable debug using the URL query or a Boolean body parameter.",
            );
            assert.deepEqual(
                receivedParameters.filter(parameter => parameter.name === "srcMap").map(parameter => {
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
            assert.equal(scopes.scopes.some(scope => scope.name === "Trace event"), false);
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
            const profileChildren = await session.customRequest("variables", {
                variablesReference: profileVariable.variablesReference,
            }) as {variables: Array<{name: string; value: string}>};
            assert.ok(profileChildren.variables.some(variable =>
                variable.name === "lastUpdated" && variable.value === "2020-07-07T13:26:22Z"));
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
            const ruleStack = await session.customRequest("stackTrace", {
                threadId: 1,
            }) as {stackFrames: Array<{id: number; line: number}>};
            assert.equal(ruleStack.stackFrames[0].line, 6);
            const ruleScopes = await session.customRequest("scopes", {
                frameId: ruleStack.stackFrames[0].id,
            }) as {scopes: Array<{name: string; variablesReference: number}>};
            const traceEventScope = ruleScopes.scopes.find(scope => scope.name === "Trace event");
            assert.equal(traceEventScope, undefined);

            await session.customRequest("stepBack", {threadId: 1});
            await waitFor(() => stoppedEvents(protocolMessages).length >= 3);
            assert.ok(outputEvents(protocolMessages).filter(output => output.includes("[0]")).length >= 2);
        } finally {
            await stopLocalDebugSession(vscode.debug.activeDebugSession);
            tracker.dispose();
            await close(server);
            await fs.rm(tempDirectory, {recursive: true, force: true, maxRetries: 5, retryDelay: 100});
        }
    });
    test("replays structured HTTP failure traces with context scopes and source ranges", async function() {
        this.timeout(15_000);
        const extension = vscode.extensions.getExtension(UiConstants.extensionPublisher);
        assert.ok(extension);
        await extension.activate();
        const tempDirectory = await fs.mkdtemp(path.join(os.tmpdir(), "fml-structured-debug-"));
        const program = path.join(tempDirectory, "main.fml");
        const input = path.join(tempDirectory, "input.json");
        const mapText = "group Main(source src, target tgt) {\r\n  src.id -> tgt.id;\r\n}";
        await fs.writeFile(program, mapText);
        await fs.writeFile(input, '{"resourceType":"Patient","id":"original"}');
        const server = http.createServer((_request, response) => {
            response.writeHead(500, {"Content-Type": "application/fhir+json"});
            response.end(JSON.stringify({
                resourceType: "Parameters",
                parameter: [
                    {name: "traceStatus", valueCode: "stopped"},
                    {name: "trace", part: [{name: "phase", valueCode: "enter"}]},
                    {name: "trace", part: [
                        {name: "phase", valueCode: "enter"},
                        {name: "source", valueString: "unresolved-source.fml"},
                    ]},
                    {name: "trace", part: [
                        {name: "phase", valueCode: "step"},
                        {name: "source", valueString: "main.fml"},
                        {name: "startRow", valueInteger: 1},
                        {name: "startColumn", valueInteger: 2},
                        {name: "endRow", valueInteger: 1},
                        {name: "endColumn", valueInteger: 8},
                        {name: "variable", part: [
                            {name: "name", valueString: "ids"},
                            {name: "contextType", valueString: "parameter"},
                            {name: "value", valueInteger: 0},
                        ]},
                        {name: "variable", part: [
                            {name: "name", valueString: "ids"},
                            {name: "contextType", valueString: "parameter"},
                            {name: "value", valueInteger: 2},
                        ]},
                        {name: "variable", part: [
                            {name: "name", valueString: "sourceId"},
                            {name: "contextType", valueString: "query-alias"},
                            {name: "path", valueString: "Patient.id"},
                        ]},
                        {name: "variable", part: [
                            {name: "name", valueString: "flag"},
                            {name: "value", valueBoolean: false},
                        ]},
                        {name: "variable", part: [
                            {name: "name", valueString: "zero"},
                            {name: "value", valueInteger: 0},
                        ]},
                        {name: "variable", part: [
                            {name: "name", valueString: "nothing"},
                            {name: "jsonValue", valueString: "null"},
                        ]},
                        {name: "variable", part: [
                            {name: "name", valueString: "missing"},
                            {name: "path", valueString: "Patient.("},
                        ]},
                        {name: "message", part: [{name: "text", valueString: "last snapshot"}]},
                    ]},
                    {name: "outcome", resource: {
                        resourceType: "OperationOutcome",
                        issue: [{severity: "fatal", code: "processing", diagnostics: "synthetic failure"}],
                    }},
                ],
            }));
        });
        await listen(server);
        const address = server.address();
        assert.ok(address && typeof address === "object");
        const messages: ProtocolMessage[] = [];
        const tracker = vscode.debug.registerDebugAdapterTrackerFactory("fml", {
            createDebugAdapterTracker: () => ({
                onDidSendMessage: message => messages.push(message as ProtocolMessage),
            }),
        });
        try {
            assert.equal(await vscode.debug.startDebugging(undefined, {
                type: "fml", request: "launch", name: "Structured trace",
                program, input, serverUrl: `http://127.0.0.1:${address.port}/transformDebugger`,
                stopOnEntry: true,
            }), true);
            await waitFor(() => stoppedEvents(messages).length === 1);
            await waitFor(() => vscode.debug.activeDebugSession?.name === "Structured trace");
            const session = vscode.debug.activeDebugSession;
            assert.ok(session);
            await session.customRequest("continue", {threadId: 1});
            await waitFor(() => stoppedEvents(messages).length === 2);
            assert.equal(stoppedEvents(messages)[1].body?.reason, "exception");
            const stack = await session.customRequest("stackTrace", {threadId: 1}) as {
                stackFrames: Array<{
                    id: number; line: number; column: number; endLine: number; endColumn: number;
                    source?: {name?: string; path?: string};
                }>;
            };
            assert.equal(stack.stackFrames.length, 3);
            assert.equal(stack.stackFrames[0].line, 2);
            assert.equal(stack.stackFrames[0].column, 3);
            assert.equal(stack.stackFrames[0].endLine, 2);
            assert.equal(stack.stackFrames[0].endColumn, 9);
            assert.equal(stack.stackFrames[1].source?.name, "unresolved-source.fml");
            assert.equal(stack.stackFrames[1].source?.path, undefined);
            const scopes = await session.customRequest("scopes", {frameId: stack.stackFrames[0].id}) as {
                scopes: Array<{name: string; variablesReference: number}>;
            };
            const parameterScope = scopes.scopes.find(scope => scope.name === "parameter variables");
            const aliasScope = scopes.scopes.find(scope => scope.name === "query-alias variables");
            const localScope = scopes.scopes.find(scope => scope.name === "local variables");
            assert.ok(parameterScope);
            assert.ok(aliasScope);
            assert.ok(localScope);
            assert.equal(scopes.scopes.some(scope => scope.name === "Trace event"), false);
            const variables = await session.customRequest("variables", {
                variablesReference: parameterScope.variablesReference,
            }) as {variables: Array<{name: string; variablesReference: number}>};
            assert.deepEqual(variables.variables.map(variable => variable.name), ["ids"]);
            const items = await session.customRequest("variables", {
                variablesReference: variables.variables[0].variablesReference,
            }) as {variables: Array<{value: string}>};
            assert.deepEqual(items.variables.map(variable => variable.value), ["0", "2"]);
            const aliases = await session.customRequest("variables", {
                variablesReference: aliasScope.variablesReference,
            }) as {variables: Array<{name: string; value: string; variablesReference: number}>};
            assert.ok(aliases.variables.some(variable =>
                variable.name === "sourceId" && variable.value === "original" && variable.variablesReference === 0));
            const locals = await session.customRequest("variables", {
                variablesReference: localScope.variablesReference,
            }) as {variables: Array<{name: string; value: string; variablesReference: number}>};
            assert.ok(locals.variables.some(variable => variable.name === "flag" && variable.value === "false"));
            assert.ok(locals.variables.some(variable => variable.name === "zero" && variable.value === "0"));
            assert.ok(locals.variables.some(variable => variable.name === "nothing" && variable.value === "null"));
            assert.ok(locals.variables.some(variable => variable.name === "missing" && variable.value.startsWith("<unavailable:")));
            const watch = await session.customRequest("evaluate", {
                expression: "sourceId", context: "watch", frameId: stack.stackFrames[0].id,
            }) as {result: string};
            assert.equal(watch.result, "original");
            assert.ok(outputEvents(messages).some(output => output.includes("recording is stopped")));
            await session.customRequest("next", {threadId: 1});
            await waitFor(() => stoppedEvents(messages).length === 3);
            assert.equal(stoppedEvents(messages)[2].body?.reason, "exception");
            await session.customRequest("stepBack", {threadId: 1});
            await waitFor(() => stoppedEvents(messages).length === 4);
        } finally {
            await stopLocalDebugSession(vscode.debug.activeDebugSession);
            tracker.dispose();
            await close(server);
            await fs.rm(tempDirectory, {recursive: true, force: true, maxRetries: 5, retryDelay: 100});
        }
    });
});

suite("FML debug output documents", () => {
    let outputs: FmlDebugOutputDocuments;
    let existingDocuments: Set<vscode.TextDocument>;
    const program = path.join(os.tmpdir(), "fml-output-reuse", "main.fml");

    setup(() => {
        outputs = new FmlDebugOutputDocuments();
        existingDocuments = new Set(vscode.workspace.textDocuments);
    });

    teardown(async () => {
        outputs.dispose();
        for (const document of vscode.workspace.textDocuments) {
            if (document.isUntitled && !document.isClosed && !existingDocuments.has(document)) {
                await closeResultDocument(document);
            }
        }
    });

    function newOutputs(): vscode.TextDocument[] {
        return vscode.workspace.textDocuments.filter(document =>
            !document.isClosed && document.isUntitled && document.languageId === "json"
            && !existingDocuments.has(document));
    }

    test("updates the existing editable tab in its current group, including raw JSON precision", async () => {
        await outputs.show(program, "local", {id: "first"});
        const document = newOutputs()[0];
        assert.ok(document);
        await vscode.window.showTextDocument(document, {viewColumn: vscode.ViewColumn.One, preview: false});
        const cover = await vscode.workspace.openTextDocument({content: "another tab", language: "plaintext"});
        await vscode.window.showTextDocument(cover, {viewColumn: vscode.ViewColumn.One, preview: false});
        const tabCount = vscode.window.tabGroups.all.flatMap(group => group.tabs).length;
        const rawJson = '{"id":"updated","number":9007199254740993}';
        await outputs.show(program, "local", {id: "updated"}, rawJson);
        assert.equal(document.getText().replace(/\s/g, ""), rawJson);
        assert.ok(document.lineCount > 1);
        assert.equal(document.languageId, "json");
        assert.equal(document.isUntitled, true);
        assert.equal(newOutputs().length, 1);
        assert.equal(vscode.window.tabGroups.all.flatMap(group => group.tabs).length, tabCount);
        const group = vscode.window.tabGroups.all.find(group => group.tabs.some(tab =>
            tab.input instanceof vscode.TabInputText && tab.input.uri.toString() === document.uri.toString()));
        assert.equal(group?.viewColumn, vscode.ViewColumn.One);
        await outputs.show(program, "local", {id: "updated"}, rawJson);
        assert.equal(newOutputs().length, 1);
    });

    test("keeps different source paths and remote endpoints separate", async () => {
        await outputs.show(program, "local", {id: "local"});
        const local = newOutputs()[0];
        await outputs.show(program, "remote:https://engine-a.test/transform", {id: "engine-a"});
        await outputs.show(program, "remote:https://engine-b.test/transform", {id: "engine-b"});
        await outputs.show(path.join(os.tmpdir(), "another-fml-source", "main.fml"), "local", {id: "another-source"});
        assert.equal(newOutputs().length, 4);
        assert.equal(JSON.parse(local.getText()).id, "local");
        await outputs.show(program, "remote:https://engine-a.test/transform", {id: "engine-a-updated"});
        assert.equal(newOutputs().length, 4);
        assert.deepEqual(newOutputs().map(document => JSON.parse(document.getText()).id).sort(), [
            "another-source", "engine-a-updated", "engine-b", "local",
        ]);
    });

    test("creates a fresh output after closing the previous result", async () => {
        await outputs.show(program, "local", {id: "first"});
        const first = newOutputs()[0];
        await closeResultDocument(first);
        await outputs.show(program, "local", {id: "next"});
        const next = newOutputs()[0];
        assert.ok(next);
        assert.equal(first.isClosed, true);
        assert.notEqual(next, first);
        assert.equal(JSON.parse(next.getText()).id, "next");
        assert.equal(newOutputs().length, 1);
    });

    test("serializes overlapping results for the same source and engine into a single output", async () => {
        await Promise.all([
            outputs.show(program, "local", {id: "first"}),
            outputs.show(program, "local", {id: "latest"}),
        ]);
        assert.equal(newOutputs().length, 1);
        assert.equal(JSON.parse(newOutputs()[0].getText()).id, "latest");
    });

    for (const {insertSpaces, tabSize, indent} of [
        {insertSpaces: true, tabSize: 3, indent: "   "},
        {insertSpaces: false, tabSize: 4, indent: "\t"},
    ]) {
        test(`pretty-prints local JSON using the editor's ${insertSpaces ? "three spaces" : "tabs"} settings`, async () => {
            const settings = vscode.workspace.getConfiguration("editor", {languageId: "json"});
            const previousTabSize = settings.inspect<number>("tabSize")?.globalLanguageValue;
            const previousInsertSpaces = settings.inspect<boolean>("insertSpaces")?.globalLanguageValue;
            const previousDetectIndentation = settings.inspect<boolean>("detectIndentation")?.globalLanguageValue;
            try {
                await settings.update("tabSize", tabSize, vscode.ConfigurationTarget.Global, true);
                await settings.update("insertSpaces", insertSpaces, vscode.ConfigurationTarget.Global, true);
                await settings.update("detectIndentation", false, vscode.ConfigurationTarget.Global, true);
                const rawJson = '{"nested":{"integer":9007199254740993,"decimal":0.123456789012345678901,"exponent":1.2300e+4},"text":"a {quoted} value"}';
                await outputs.show(program, "local", {}, rawJson);
                const document = newOutputs()[0];
                assert.ok(document);
                const text = document.getText().replace(/\r\n/g, "\n");
                assert.ok(text.includes(`\n${indent}"nested": {`), text);
                assert.ok(text.includes(`\n${indent}${indent}"integer": 9007199254740993`), text);
                assert.ok(text.includes('"decimal": 0.123456789012345678901'), text);
                assert.ok(text.includes('"exponent": 1.2300e+4'), text);
                assert.ok(text.includes('"text": "a {quoted} value"'), text);

                const editor = vscode.window.visibleTextEditors.find(editor => editor.document === document);
                assert.ok(editor);
                editor.options = {insertSpaces: !insertSpaces, tabSize: 2};
                await outputs.show(program, "local", {}, rawJson);
                const nextIndent = insertSpaces ? "\t" : "  ";
                assert.ok(document.getText().includes(`\n${nextIndent}"nested": {`), document.getText());
                assert.equal(newOutputs().length, 1);
            } finally {
                await settings.update("tabSize", previousTabSize, vscode.ConfigurationTarget.Global, true);
                await settings.update("insertSpaces", previousInsertSpaces, vscode.ConfigurationTarget.Global, true);
                await settings.update("detectIndentation", previousDetectIndentation, vscode.ConfigurationTarget.Global, true);
            }
        });
    }

    test("does not reformat raw output supplied by a remote engine", async () => {
        const engine = "remote:https://engine.test/transform";
        const rawJson = '{  "nested":{"number":9007199254740993}, "text" : "server formatted" }\n';
        await outputs.show(program, engine, {}, rawJson);
        const document = newOutputs()[0];
        assert.ok(document);
        assert.equal(document.getText(), rawJson);
        const nextJson = '{"number":0.123456789012345678901}';
        await outputs.show(program, engine, {}, nextJson);
        assert.equal(document.getText(), nextJson);
        assert.equal(newOutputs().length, 1);
    });
});

async function closeResultDocument(document: vscode.TextDocument): Promise<void> {
    await vscode.window.showTextDocument(document, {preview: false});
    await vscode.commands.executeCommand("workbench.action.revertAndCloseActiveEditor");
    await waitFor(() => document.isClosed);
}

async function stopLocalDebugSession(session: vscode.DebugSession | undefined): Promise<void> {
    if (!session) {
        return;
    }
    let ended = false;
    const subscription = vscode.debug.onDidTerminateDebugSession(event => {
        if (event.id === session.id) {
            ended = true;
        }
    });
    try {
        await vscode.debug.stopDebugging(session);
        await waitFor(() => ended);
        await waitFor(() => vscode.debug.activeDebugSession === undefined);
    } finally {
        subscription.dispose();
    }
}

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
                            {
                                url: traceLocationUrl,
                                valueString: "StructureMap.group[0].rule[0].source[0]",
                            },
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
