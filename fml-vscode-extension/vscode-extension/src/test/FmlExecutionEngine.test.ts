import * as assert from "node:assert";
import {promises as fs} from "node:fs";
import os from "node:os";
import path from "node:path";
import * as vscode from "vscode";
import {FmlDebugConfigurationProvider} from "../FmlDebugger";
import {resolveFmlExecutionEngine} from "../FmlExecutionEngine";
import {UiConstants} from "../constants/UiConstants";

suite("FML engine selection", () => {
    let directory: string;
    let previousUrl: string | undefined;
    const settings = vscode.workspace.getConfiguration("fmlTools");
    const provider = new FmlDebugConfigurationProvider();
    const remoteUrl = "https://engine.test/StructureMap/$transform?debug=true";

    suiteSetup(async () => {
        directory = await fs.mkdtemp(path.join(os.tmpdir(), "fml-engine-selection-"));
        await fs.writeFile(path.join(directory, "main.fml"), "group Main(source src, target tgt) { src -> tgt; }");
        await fs.writeFile(path.join(directory, "input.json"), '{"resourceType":"Patient"}');
        previousUrl = settings.inspect<string>("debug.serverUrl")?.globalValue;
    });

    setup(async () => {
        await settings.update("debug.serverUrl", undefined, vscode.ConfigurationTarget.Global);
    });

    suiteTeardown(async () => {
        await settings.update("debug.serverUrl", previousUrl, vscode.ConfigurationTarget.Global);
        await fs.rm(directory, {recursive: true, force: true, maxRetries: 5, retryDelay: 100});
    });

    function configuration(): vscode.DebugConfiguration {
        return {
            type: "fml", request: "launch", name: "Engine selection",
            program: path.join(directory, "main.fml"), input: path.join(directory, "input.json"),
        };
    }

    test("has no backend setting or launch field and no default remote endpoint", () => {
        const extension = vscode.extensions.getExtension(UiConstants.extensionPublisher);
        assert.ok(extension);
        const contributions = extension.packageJSON.contributes;
        assert.equal("fmlTools.debug.backend" in contributions.configuration.properties, false);
        assert.equal("backend" in contributions.debuggers[0].configurationAttributes.launch.properties, false);
        assert.equal(settings.inspect<string>("debug.serverUrl")?.defaultValue, "");
        assert.deepEqual(resolveFmlExecutionEngine({}), {kind: "local"});
        assert.deepEqual(resolveFmlExecutionEngine({serverUrl: ""}), {kind: "local"});
        assert.deepEqual(resolveFmlExecutionEngine({serverUrl: " \t "}), {kind: "local"});
    });

    test("resolves a minimal launch to local without adding an engine selector", async () => {
        const result = await provider.resolveDebugConfigurationWithSubstitutedVariables(undefined, configuration());
        assert.ok(result);
        assert.equal(result.serverUrl, undefined);
        assert.equal("backend" in result, false);
    });

    test("uses a launch URL directly and gives it precedence over settings", async () => {
        await settings.update("debug.serverUrl", remoteUrl, vscode.ConfigurationTarget.Global);
        const serverUrl = "http://127.0.0.1:8083/transformDebugger?debug=true";
        const result = await provider.resolveDebugConfigurationWithSubstitutedVariables(
            undefined, {...configuration(), serverUrl},
        );
        assert.ok(result);
        assert.equal(result.serverUrl, serverUrl);
        assert.deepEqual(resolveFmlExecutionEngine({serverUrl: result.serverUrl}), {kind: "remote", serverUrl});
    });

    test("selects a remote engine when its URL is configured in settings", async () => {
        await settings.update("debug.serverUrl", remoteUrl, vscode.ConfigurationTarget.Global);
        const result = await provider.resolveDebugConfigurationWithSubstitutedVariables(undefined, configuration());
        assert.ok(result);
        assert.equal(result.serverUrl, remoteUrl);
        assert.deepEqual(resolveFmlExecutionEngine({serverUrl: result.serverUrl}), {kind: "remote", serverUrl: remoteUrl});
    });

    test("an empty launch URL selects local even when a remote URL is configured", async () => {
        await settings.update("debug.serverUrl", remoteUrl, vscode.ConfigurationTarget.Global);
        const result = await provider.resolveDebugConfigurationWithSubstitutedVariables(
            undefined, {...configuration(), serverUrl: ""},
        );
        assert.ok(result);
        assert.deepEqual(resolveFmlExecutionEngine({serverUrl: result.serverUrl}), {kind: "local"});
        assert.equal(result.serverUrl, undefined);
    });

    test("applies terminology settings to local evaluations and supports launch overrides", async () => {
        assert.equal(settings.inspect<string>("terminology.serverUrl")?.defaultValue, "");
        assert.equal(settings.inspect<string>("terminology.fhirVersion")?.defaultValue, "R4");
        const previousTerminology = settings.inspect<string>("terminology.serverUrl")?.globalValue;
        const previousVersion = settings.inspect<string>("terminology.fhirVersion")?.globalValue;
        try {
            await settings.update("terminology.serverUrl", "https://tx.test/fhir", vscode.ConfigurationTarget.Global);
            await settings.update("terminology.fhirVersion", "R5", vscode.ConfigurationTarget.Global);
            const result = await provider.resolveDebugConfigurationWithSubstitutedVariables(undefined, configuration());
            assert.ok(result);
            assert.equal(result.serverUrl, undefined);
            assert.equal(result.terminologyServerUrl, "https://tx.test/fhir");
            assert.equal(result.terminologyFhirVersion, "R5");
            const overridden = await provider.resolveDebugConfigurationWithSubstitutedVariables(
                undefined, {...configuration(), terminologyServerUrl: "", terminologyFhirVersion: "R4"},
            );
            assert.ok(overridden);
            assert.equal(overridden.terminologyServerUrl, "");
            assert.equal(overridden.terminologyFhirVersion, "R4");
        } finally {
            await settings.update("terminology.serverUrl", previousTerminology, vscode.ConfigurationTarget.Global);
            await settings.update("terminology.fhirVersion", previousVersion, vscode.ConfigurationTarget.Global);
        }
    });

    test("normalizes whitespace and rejects invalid non-empty URLs instead of changing engines", async () => {
        assert.deepEqual(resolveFmlExecutionEngine({serverUrl: `  ${remoteUrl}  `}), {
            kind: "remote", serverUrl: remoteUrl,
        });
        for (const serverUrl of ["not-a-url", "file:///engine", "ftp://engine.test/map", "C:\\engines\\fml.exe"]) {
            assert.throws(() => resolveFmlExecutionEngine({serverUrl}), /absolute HTTP or HTTPS URL/);
        }
        assert.equal(await provider.resolveDebugConfigurationWithSubstitutedVariables(
            undefined, {...configuration(), serverUrl: "not-a-url"},
        ), undefined);
    });
});
