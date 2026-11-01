import * as assert from "node:assert";
import {promises as fs} from "node:fs";
import os from "node:os";
import path from "node:path";
import {createServer} from "node:http";
import * as vscode from "vscode";
import {
    EVALUATE_FML_TOOL, FmlEvaluationTool, FmlValidationTool, VALIDATE_FML_TOOL,
} from "../FmlLanguageTools";
import {UiConstants} from "../constants/UiConstants";
import {EVALUATE_DOCUMENT_REQUEST} from "@fhirpath-lab/language-service";
import {FmlWorkspaceIndexController} from "../FmlWorkspaceIndexController";

const patientMap = [
    "uses 'http://hl7.org/fhir/StructureDefinition/Patient' alias S as source",
    "uses 'http://hl7.org/fhir/StructureDefinition/Patient' alias T as target",
    "group Main(source src : S, target tgt : T) { src.id -> tgt.id; }",
].join("\n");

function readResult(result: vscode.LanguageModelToolResult) {
    const text = result.content.find(part => part instanceof vscode.LanguageModelTextPart);
    assert.ok(text instanceof vscode.LanguageModelTextPart);
    return JSON.parse(text.value);
}

async function replace(document: vscode.TextDocument, text: string): Promise<void> {
    const edit = new vscode.WorkspaceEdit();
    edit.replace(document.uri, new vscode.Range(document.positionAt(0), document.positionAt(document.getText().length)), text);
    assert.ok(await vscode.workspace.applyEdit(edit));
}

suite("FML Copilot tools", function() {
    this.timeout(20_000);
    let directory: string;
    let tokenSource: vscode.CancellationTokenSource;

    suiteSetup(async () => {
        const extension = vscode.extensions.getExtension(UiConstants.extensionPublisher);
        assert.ok(extension);
        await assert.rejects(async () => vscode.lm.invokeTool(VALIDATE_FML_TOOL, {
            input: {filePaths: ["relative.fml"]}, toolInvocationToken: undefined,
        }), /absolute/i);
        assert.ok(extension.isActive);
        await assert.rejects(async () => vscode.lm.invokeTool(EVALUATE_FML_TOOL, {
            input: {mapFilePath: "relative.fml", inputFilePath: "relative.json"}, toolInvocationToken: undefined,
        }), /absolute/i);
    });

    setup(async () => {
        directory = await fs.mkdtemp(path.join(os.tmpdir(), "fml-chat-tools-"));
        tokenSource = new vscode.CancellationTokenSource();
    });

    teardown(async () => {
        tokenSource.dispose();
        for (const document of vscode.workspace.textDocuments.filter(document =>
            !document.isClosed && document.uri.fsPath.startsWith(directory) && document.isDirty)) {
            await vscode.window.showTextDocument(document, {preview: false});
            await vscode.commands.executeCommand("workbench.action.revertAndCloseActiveEditor");
        }
        await fs.rm(directory, {recursive: true, force: true, maxRetries: 5, retryDelay: 100});
    });

    async function openFile(name: string, text: string): Promise<vscode.TextDocument> {
        const filePath = path.join(directory, name);
        await fs.writeFile(filePath, text);
        let document = await vscode.workspace.openTextDocument(vscode.Uri.file(filePath));
        if (name.endsWith(".fml") && document.languageId !== "fml") {
            document = await vscode.languages.setTextDocumentLanguage(document, "fml");
        }
        return document;
    }

    async function invoke(name: string, input: object) {
        return readResult(await vscode.lm.invokeTool(name, {input, toolInvocationToken: undefined}, tokenSource.token));
    }

    test("discovers both native tools with their declared schemas", () => {
        for (const name of [VALIDATE_FML_TOOL, EVALUATE_FML_TOOL]) {
            const tool = vscode.lm.tools.find(tool => tool.name === name);
            assert.ok(tool, name);
            assert.ok(tool.inputSchema);
            assert.ok(tool.tags.includes("fml"));
        }
    });

    test("validates unsaved edits through the registered tool and updates Problems", async () => {
        const document = await openFile("main.fml", "group Main(source src, target tgt) { src -> tgt.id = uuid(); }");
        await replace(document, "group Main(source src, target tgt) { src -> tgt.id = uuid('bad'); }");
        const invalid = await invoke(VALIDATE_FML_TOOL, {filePaths: [document.uri.fsPath, document.uri.fsPath]});
        assert.equal(invalid.status, "invalid");
        assert.equal(invalid.errorCount, 1);
        assert.equal(invalid.files.length, 1);
        assert.equal(invalid.files[0].version, document.version);
        assert.equal(invalid.files[0].uri, document.uri.toString());
        assert.equal(invalid.files[0].diagnostics[0].severity, "error");
        assert.equal(typeof invalid.files[0].diagnostics[0].range.start.line, "number");
        assert.equal("offendingText" in invalid.files[0].diagnostics[0], false);
        assert.equal("text" in invalid.files[0], false);
        assert.ok(vscode.languages.getDiagnostics(document.uri).some(item => item.severity === vscode.DiagnosticSeverity.Error));
        await replace(document, "group Main(source src, target tgt) { src -> tgt.id = uuid(); }");
        const valid = await invoke(VALIDATE_FML_TOOL, {filePaths: [document.uri.fsPath]});
        assert.equal(valid.status, "valid");
        assert.equal(valid.errorCount, 0);
        assert.equal(valid.files[0].version, document.version);
        assert.equal(await fs.readFile(document.uri.fsPath, "utf8"), "group Main(source src, target tgt) { src -> tgt.id = uuid(); }");
    });

    test("validates the active untitled FML document", async () => {
        const document = await vscode.workspace.openTextDocument({
            language: "fml", content: "group Main(source src, target tgt) { src -> tgt.id = uuid('bad'); }",
        });
        await vscode.window.showTextDocument(document);
        try {
            const result = await invoke(VALIDATE_FML_TOOL, {});
            assert.equal(result.files[0].uri, document.uri.toString());
            assert.equal(result.errorCount, 1);
        } finally {
            await vscode.commands.executeCommand("workbench.action.revertAndCloseActiveEditor");
        }
    });

    test("evaluates locally with unsaved map and input contents without editing either file", async () => {
        const map = await openFile("main.fml", patientMap);
        const input = await openFile("input.json", '{"resourceType":"Patient","id":"saved"}');
        await replace(map, patientMap.replace("src.id -> tgt.id;", "src.id -> tgt.id; src -> tgt.active = true;"));
        await replace(input, '{"resourceType":"Patient","id":"unsaved-input"}');
        const result = await invoke(EVALUATE_FML_TOOL, {mapFilePath: map.uri.fsPath, inputFilePath: input.uri.fsPath});
        assert.equal(result.status, "success", JSON.stringify(result));
        assert.equal(result.engine, "local");
        assert.equal(JSON.parse(result.resultJson).id, "unsaved-input");
        assert.equal(JSON.parse(result.resultJson).active, true);
        assert.equal(result.input.version, input.version);
        assert.equal(result.maps[0].version, map.version);
        assert.equal("trace" in result, false);
        assert.equal("inputText" in result, false);
        assert.equal(await fs.readFile(input.uri.fsPath, "utf8"), '{"resourceType":"Patient","id":"saved"}');
        assert.equal(await fs.readFile(map.uri.fsPath, "utf8"), patientMap);
    });

    test("validation and evaluation use the indexed unsaved imported map", async () => {
        const shared = await openFile("shared.fml", [
            "/// url = 'http://example.test/StructureMap/ToolShared'",
            patientMap.replace("Main(", "Copy("),
        ].join("\n"));
        const map = await openFile("main.fml", patientMap
            .replace("group Main", "imports 'http://example.test/StructureMap/ToolShared'\ngroup Main")
            .replace("src.id -> tgt.id;", "src -> tgt then Copy(src, tgt);"));
        await replace(shared, shared.getText().replace("src.id -> tgt.id;", "src.id -> tgt.id = 'unsaved-import';"));
        const input = await openFile("input.json", '{"resourceType":"Patient","id":"source"}');
        const validated = await invoke(VALIDATE_FML_TOOL, {filePaths: [map.uri.fsPath]});
        assert.equal(validated.errorCount, 0, JSON.stringify(validated));
        const result = await invoke(EVALUATE_FML_TOOL, {mapFilePath: map.uri.fsPath, inputFilePath: input.uri.fsPath});
        assert.equal(result.status, "success", JSON.stringify(result));
        assert.equal(JSON.parse(result.resultJson).id, "unsaved-import");
        assert.ok(result.maps.some((item: {uri: string; version: number}) =>
            item.uri === shared.uri.toString() && item.version === shared.version));
    });

    test("the evaluate tool stays local when the debugger has a remote server URL configured", async () => {
        const settings = vscode.workspace.getConfiguration("fmlTools");
        const previousUrl = settings.inspect<string>("debug.serverUrl")?.globalValue;
        const map = await openFile("main.fml", patientMap);
        const input = await openFile("input.json", '{"resourceType":"Patient","id":"still-local"}');
        try {
            await settings.update("debug.serverUrl", "http://127.0.0.1:1/not-used", vscode.ConfigurationTarget.Global);
            const result = await invoke(EVALUATE_FML_TOOL, {mapFilePath: map.uri.fsPath, inputFilePath: input.uri.fsPath});
            assert.equal(result.status, "success", JSON.stringify(result));
            assert.equal(result.engine, "local");
            assert.equal(JSON.parse(result.resultJson).id, "still-local");
        } finally {
            await settings.update("debug.serverUrl", previousUrl, vscode.ConfigurationTarget.Global);
        }
    });

    test("reports local evaluation failures and never returns a partial target as success", async () => {
        const map = await openFile("main.fml", patientMap.replace(
            "src.id -> tgt.id;", "src.id -> tgt.id; src.gender check (false) -> tgt.gender;",
        ));
        const input = await openFile("input.json", '{"resourceType":"Patient","id":"partial","gender":"male"}');
        const result = await invoke(EVALUATE_FML_TOOL, {mapFilePath: map.uri.fsPath, inputFilePath: input.uri.fsPath});
        assert.equal(result.status, "failed");
        assert.equal("resultJson" in result, false);
        assert.equal(result.outcome.resourceType, "OperationOutcome");
        assert.ok(result.outcome.issue.some((issue: {severity: string}) => issue.severity === "error" || issue.severity === "fatal"));
    });

    test("uses an explicitly selected entry group on the active map and reports missing groups", async () => {
        const map = await openFile("main.fml", patientMap
            + "\ngroup Alternate(source src : S, target tgt : T) { src.id -> tgt.id = 'selected'; }");
        const input = await openFile("input.json", '{"resourceType":"Patient","id":"source"}');
        await vscode.window.showTextDocument(map);
        const result = await invoke(EVALUATE_FML_TOOL, {inputFilePath: input.uri.fsPath, entryGroup: "Alternate"});
        assert.equal(result.status, "success", JSON.stringify(result));
        assert.equal(JSON.parse(result.resultJson).id, "selected");
        const missing = await invoke(EVALUATE_FML_TOOL, {inputFilePath: input.uri.fsPath, entryGroup: "Missing"});
        assert.equal(missing.status, "failed");
        assert.match(JSON.stringify(missing.outcome), /Entry group/);
        assert.equal("resultJson" in missing, false);
    });

    test("preserves numeric precision in the returned JSON string", async () => {
        const map = await openFile("main.fml", [
            "uses 'http://hl7.org/fhir/StructureDefinition/Observation' alias S as source",
            "uses 'http://hl7.org/fhir/StructureDefinition/Observation' alias T as target",
            "group Main(source src : S, target tgt : T) { src.valueQuantity -> tgt.valueQuantity; }",
        ].join("\n"));
        const input = await openFile("input.json", '{"resourceType":"Observation","valueQuantity":{"value":0.123456789012345678901}}');
        const result = await invoke(EVALUATE_FML_TOOL, {mapFilePath: map.uri.fsPath, inputFilePath: input.uri.fsPath});
        assert.equal(result.status, "success", JSON.stringify(result));
        assert.ok(result.resultJson.includes("0.123456789012345678901"), result.resultJson);
    });

    test("uses supplied unsaved ConceptMap content without a remote terminology service", async () => {
        const map = await openFile("main.fml", [
            "uses 'http://hl7.org/fhir/StructureDefinition/Patient' alias S as source",
            "uses 'http://hl7.org/fhir/StructureDefinition/Observation' alias T as target",
            "group Main(source src : S, target tgt : T) {",
            "  src.gender as v -> tgt.value = translate(v, 'http://example.test/ToolConceptMap', 'CodeableConcept');",
            "}",
        ].join("\n"));
        const input = await openFile("input.json", '{"resourceType":"Patient","gender":"male"}');
        const definition = {
            resourceType: "ConceptMap", url: "http://example.test/ToolConceptMap",
            group: [{source: "http://example.test/source", target: "http://example.test/target",
                element: [{code: "male", target: [{code: "old", relationship: "equivalent"}]}]}],
        };
        const model = await openFile("model.json", JSON.stringify(definition));
        await replace(model, JSON.stringify(definition).replace('"old"', '"M"'));
        const result = await invoke(EVALUATE_FML_TOOL, {
            mapFilePath: map.uri.fsPath, inputFilePath: input.uri.fsPath, modelFilePath: model.uri.fsPath,
        });
        assert.equal(result.status, "success", JSON.stringify(result));
        assert.equal(JSON.parse(result.resultJson).valueCodeableConcept.coding[0].code, "M");
        assert.equal(result.model.version, model.version);
    });

    test("indexes discovered catalogs into the registered tool with nearest-root contexts and dirty global overrides", async function() {
        this.timeout(40_000);
        const workspace = vscode.workspace.workspaceFolders?.[0];
        assert.ok(workspace, "Run this test with the workspace configured in .vscode-test.mjs.");
        const catalogDirectory = await fs.mkdtemp(path.join(workspace.uri.fsPath, ".fml-chat-catalog-"));
        const outer = path.join(catalogDirectory, "outer");
        const inner = path.join(outer, "nested");
        const canonical = "http://example.test/DiscoveredChatMap";
        const outsideCanonical = "http://example.test/OutsideChatMap";
        const definition = (url: string, code: string) => ({
            resourceType: "ConceptMap", url,
            group: [{source: "http://example.test/source", target: "http://example.test/target",
                element: [{code: "male", target: [{code, relationship: "equivalent"}]}]}],
        });
        const mapText = (url: string) => patientMap
            .replace("Patient' alias T", "Observation' alias T")
            .replace("src.id -> tgt.id;", `src.gender as v -> tgt.value = translate(v, '${url}', 'CodeableConcept');`);
        const outerModel = path.join(outer, "output", "ConceptMaps.json");
        const innerModel = path.join(inner, "output", "package", "ConceptMaps.json");
        const savedBundle = JSON.stringify({resourceType: "Bundle", type: "collection",
            entry: [definition(canonical, "outer"), definition(outsideCanonical, "outside")].map(resource => ({resource}))});
        const input = await openFile("input.json", '{"resourceType":"Patient","gender":"male"}');
        const outsideMap = await openFile("outside.fml", mapText(outsideCanonical));
        const evaluate = (mapFilePath: string) => invoke(EVALUATE_FML_TOOL, {
            mapFilePath, inputFilePath: input.uri.fsPath,
        });
        const resultCode = (result: {status: string; resultJson?: string}) => result.status === "success" && result.resultJson
            ? JSON.parse(result.resultJson).valueCodeableConcept?.coding?.[0]?.code : undefined;
        try {
            await fs.mkdir(path.dirname(outerModel), {recursive: true});
            await fs.mkdir(path.dirname(innerModel), {recursive: true});
            await fs.writeFile(outerModel, savedBundle);
            await fs.writeFile(innerModel, JSON.stringify(definition(canonical, "inner")));
            for (const root of [outer, inner]) {
                await fs.writeFile(path.join(root, "main.fml"), mapText(canonical));
            }
            // Write discovery markers last so each watcher sees a complete catalog.
            await fs.writeFile(path.join(outer, "sushi-config.yaml"), "fhirVersion: 4.0.1\n");
            await fs.writeFile(path.join(inner, "output", "package", "ImplementationGuide-test.json"),
                '{"resourceType":"ImplementationGuide"}');

            const deadline = Date.now() + 15_000;
            let indexed = false;
            let latestResults: unknown[] = [];
            while (Date.now() < deadline) {
                const outerResult = await evaluate(path.join(outer, "main.fml"));
                const innerResult = await evaluate(path.join(inner, "main.fml"));
                latestResults = [outerResult, innerResult];
                if (resultCode(outerResult) === "outer" && resultCode(innerResult) === "inner") {
                    indexed = true;
                    break;
                }
                await new Promise(resolve => setTimeout(resolve, 50));
            }
            assert.ok(indexed, `Discovered model catalogs never reached the evaluation tool: ${JSON.stringify(latestResults)}`);
            assert.equal(resultCode(await evaluate(outsideMap.uri.fsPath)), "outside");

            const model = await vscode.workspace.openTextDocument(outerModel);
            await replace(model, savedBundle.replace('"outer"', '"outer-dirty"').replace('"outside"', '"outside-dirty"'));
            assert.equal(resultCode(await evaluate(path.join(outer, "main.fml"))), "outer-dirty");
            assert.equal(resultCode(await evaluate(path.join(inner, "main.fml"))), "inner");
            assert.equal(resultCode(await evaluate(outsideMap.uri.fsPath)), "outside-dirty");
            assert.equal(await fs.readFile(outerModel, "utf8"), savedBundle);

            await vscode.commands.executeCommand("fmlTools.RestartLanguageServer");
            assert.equal(resultCode(await evaluate(path.join(outer, "main.fml"))), "outer-dirty");
            assert.equal(resultCode(await evaluate(path.join(inner, "main.fml"))), "inner");
            assert.equal(resultCode(await evaluate(outsideMap.uri.fsPath)), "outside-dirty");
        } finally {
            for (const document of vscode.workspace.textDocuments.filter(document =>
                !document.isClosed && document.uri.fsPath.startsWith(catalogDirectory) && document.isDirty)) {
                await vscode.window.showTextDocument(document, {preview: false});
                await vscode.commands.executeCommand("workbench.action.revertAndCloseActiveEditor");
            }
            await fs.rm(catalogDirectory, {recursive: true, force: true, maxRetries: 5, retryDelay: 100});
        }
    });

    test("uses the configured R5 terminology service for a missing canonical without remote mapping execution", async () => {
        const settings = vscode.workspace.getConfiguration("fmlTools");
        const previousUrl = settings.inspect<string>("terminology.serverUrl")?.globalValue;
        const previousVersion = settings.inspect<string>("terminology.fhirVersion")?.globalValue;
        let body = "";
        const server = createServer((request, response) => {
            request.setEncoding("utf8");
            request.on("data", chunk => { body += chunk; });
            request.on("end", () => {
                response.writeHead(200, {"Content-Type": "application/fhir+json"});
                response.end(JSON.stringify({resourceType: "Parameters", parameter: [
                    {name: "result", valueBoolean: true},
                    {name: "match", part: [{name: "relationship", valueCode: "equivalent"},
                        {name: "concept", valueCoding: {code: "remote-term", system: "http://example.test/target"}}]},
                ]}));
            });
        });
        await new Promise<void>(resolve => server.listen(0, "127.0.0.1", resolve));
        const address = server.address();
        assert.ok(address && typeof address === "object");
        try {
            const map = await openFile("main.fml", [
                "uses 'http://hl7.org/fhir/StructureDefinition/Patient' alias S as source",
                "uses 'http://hl7.org/fhir/StructureDefinition/Observation' alias T as target",
                "group Main(source src : S, target tgt : T) {",
                " src.gender as value -> tgt.value = translate(value, 'http://example.test/RemoteOnly|2026', 'CodeableConcept');",
                "}",
            ].join("\n"));
            const input = await openFile("input.json", '{"resourceType":"Patient","gender":"male"}');
            await settings.update("terminology.serverUrl", `http://127.0.0.1:${address.port}/fhir`, vscode.ConfigurationTarget.Global);
            await settings.update("terminology.fhirVersion", "R5", vscode.ConfigurationTarget.Global);
            const result = await invoke(EVALUATE_FML_TOOL, {mapFilePath: map.uri.fsPath, inputFilePath: input.uri.fsPath});
            assert.equal(result.status, "success", JSON.stringify(result));
            assert.equal(result.engine, "local");
            assert.equal(JSON.parse(result.resultJson).valueCodeableConcept.coding[0].code, "remote-term");
            const parts = JSON.parse(body).parameter;
            assert.deepEqual(parts.find((part: {name: string}) => part.name === "sourceCoding").valueCoding, {code: "male"});
            assert.equal(parts.find((part: {name: string}) => part.name === "url").valueUri, "http://example.test/RemoteOnly");
            assert.equal(parts.find((part: {name: string}) => part.name === "conceptMapVersion").valueString, "2026");
        } finally {
            await settings.update("terminology.serverUrl", previousUrl, vscode.ConfigurationTarget.Global);
            await settings.update("terminology.fhirVersion", previousVersion, vscode.ConfigurationTarget.Global);
            await new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
        }
    });

    test("rejects relative, closed external and non-FML file paths explicitly", async () => {
        const document = await openFile("input.json", "{}");
        await assert.rejects(invoke(VALIDATE_FML_TOOL, {filePaths: ["relative.fml"]}), /absolute/i);
        await assert.rejects(invoke(VALIDATE_FML_TOOL, {filePaths: [path.join(directory, "closed.fml")]}), /workspace|open/i);
        await assert.rejects(invoke(VALIDATE_FML_TOOL, {filePaths: [document.uri.fsPath]}), /FML file/i);
    });

    test("cancels while waiting for workspace indexing before validating or executing", async () => {
        const map = await openFile("main.fml", patientMap);
        const input = await openFile("input.json", '{"resourceType":"Patient"}');
        const client = {sendRequest: () => { throw new Error("Validation should not run."); }};
        const wait = (): Promise<void> => new Promise(() => {});
        const validation = new FmlValidationTool(client, wait);
        const evaluation = new FmlEvaluationTool(client, wait, () => undefined);
        const operations = [
            validation.invoke({input: {filePaths: [map.uri.fsPath]}, toolInvocationToken: undefined}, tokenSource.token),
            evaluation.invoke({input: {
                mapFilePath: map.uri.fsPath, inputFilePath: input.uri.fsPath,
            }, toolInvocationToken: undefined}, tokenSource.token),
        ];
        tokenSource.cancel();
        await Promise.all(operations.map(operation => assert.rejects(operation, /cancel/i)));
    });

    test("both tools reject a retained indexing failure and reach the server only after recovery", async () => {
        const map = await openFile("main.fml", patientMap);
        const input = await openFile("input.json", '{"resourceType":"Patient"}');
        const failure = new Error("workspace index failed");
        let failing = true;
        const index = new FmlWorkspaceIndexController(async () => {
            if (failing) {
                throw failure;
            }
            return {fileCount: 1, canonicalUrlCount: 0, groupCount: 1, importCount: 0, failedFileCount: 0, durationMs: 1};
        }, async () => {});
        await assert.rejects(index.reindex(), error => error === failure);
        let requests = 0;
        const reachedServer = new Error("request reached the language server");
        const client = {sendRequest: (): never => { requests++; throw reachedServer; }};
        const validation = new FmlValidationTool(client, () => index.waitUntilReady());
        const evaluation = new FmlEvaluationTool(client, () => index.waitUntilReady(), () => undefined);
        const operations = [
            () => validation.invoke({input: {filePaths: [map.uri.fsPath]}, toolInvocationToken: undefined}, tokenSource.token),
            () => evaluation.invoke({input: {
                mapFilePath: map.uri.fsPath, inputFilePath: input.uri.fsPath,
            }, toolInvocationToken: undefined}, tokenSource.token),
        ];
        for (const operation of operations) {
            await assert.rejects(operation(), error => error === failure);
        }
        assert.equal(requests, 0);
        failing = false;
        await index.reindex();
        for (const operation of operations) {
            await assert.rejects(operation(), error => error === reachedServer);
        }
        assert.equal(requests, 2);
    });

    test("delegates one evaluation request without resending maps or model catalogs", async () => {
        const map = await openFile("main.fml", patientMap);
        const input = await openFile("input.json", '{"resourceType":"Patient","id":"saved"}');
        const knownModel = await openFile("known-model.json", '{"resourceType":"ConceptMap"}');
        const unrelatedModel = await openFile("unrelated.json", '{"resourceType":"ConceptMap"}');
        await replace(input, '{"resourceType":"Patient","id":"current"}');
        await replace(knownModel, '{"resourceType":"ConceptMap","url":"http://example.test/current"}');
        await replace(unrelatedModel, '{"resourceType":"ConceptMap","url":"http://example.test/unrelated"}');
        let payload = "";
        let calls = 0;
        const sent = new Error("Request reached the shared language server");
        const client = {sendRequest: (method: unknown, params?: unknown): never => {
            assert.equal(method, EVALUATE_DOCUMENT_REQUEST);
            payload = JSON.stringify(params);
            calls++;
            throw sent;
        }};
        const tool = new FmlEvaluationTool(client, async () => {}, () => ({
            dependencies: [], profileBaseTypes: {}, profileResolutionSources: {}, customTypeModels: {},
            modelResourcePaths: [knownModel.uri.fsPath],
            modelFileCache: [{filePath: knownModel.uri.fsPath, resources: [{resourceType: "ConceptMap"}]}],
        }));
        await assert.rejects(tool.invoke({input: {
            mapFilePath: map.uri.fsPath, inputFilePath: input.uri.fsPath,
        }, toolInvocationToken: undefined}, tokenSource.token), error => error === sent);
        assert.equal(calls, 1);
        const request = JSON.parse(payload);
        assert.equal(request.uri, map.uri.toString());
        assert.equal(request.inputText, input.getText());
        assert.deepEqual(request.input, {uri: input.uri.toString(), version: input.version});
        assert.deepEqual(request.modelOverrides, [{filePath: knownModel.uri.fsPath, text: knownModel.getText()}]);
        for (const field of ["mapText", "maps", "modelFiles", "modelResources", "customTypeModels"]) {
            assert.equal(field in request, false, field);
        }
    });

    test("explains local execution and sensitive result sharing in tool approval", () => {
        const tool = new FmlEvaluationTool({sendRequest: () => { throw new Error("Not invoked."); }}, async () => {}, () => undefined);
        const prepared = tool.prepareInvocation({input: {inputFilePath: path.join(directory, "input.json")}});
        const message = prepared.confirmationMessages?.message;
        assert.ok(message instanceof vscode.MarkdownString);
        assert.match(message.value, /local/i);
        assert.match(message.value.replace(/&nbsp;/g, " "), /sensitive clinical data/i);
        assert.equal(message.isTrusted, undefined);
    });
});
