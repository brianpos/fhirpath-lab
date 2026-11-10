import * as assert from "node:assert/strict";
import {promises as fs} from "node:fs";
import path from "node:path";
import * as vscode from "vscode";
import {SushiConfigWatcher, SushiWorkspaceConfiguration} from "../SushiConfigWatcher";
import {UiConstants} from "../constants/UiConstants";

function deferred() {
    let resolve!: () => void;
    const promise = new Promise<void>(onResolve => { resolve = onResolve; });
    return {promise, resolve};
}

async function waitFor(condition: () => boolean): Promise<void> {
    const deadline = Date.now() + 10_000;
    while (!condition()) {
        assert.ok(Date.now() < deadline, "Timed out waiting for the catalog watcher.");
        await new Promise(resolve => setTimeout(resolve, 20));
    }
}

suite("FML catalog refresh ordering", function() {
    this.timeout(25_000);
    let directory: string;
    const watchers: SushiConfigWatcher[] = [];

    setup(async () => {
        const workspace = vscode.workspace.workspaceFolders?.[0];
        assert.ok(workspace);
        directory = await fs.mkdtemp(path.join(workspace.uri.fsPath, "fml-refresh-test-"));
    });

    teardown(async () => {
        watchers.splice(0).forEach(watcher => watcher.dispose());
        await fs.rm(directory, {recursive: true, force: true, maxRetries: 5, retryDelay: 100});
    });

    function watch(
        load: (root: string, configuration: SushiWorkspaceConfiguration) => Promise<void>,
        changed: () => void = () => {},
    ): SushiConfigWatcher {
        const watcher = new SushiConfigWatcher(UiConstants.detailsChannel, directory, changed, load);
        watchers.push(watcher);
        return watcher;
    }

    test("a late older SUSHI refresh cannot overwrite a newer configuration", async () => {
        const configFile = path.join(directory, "sushi-config.yaml");
        await fs.writeFile(configFile, "fhirVersion: 4.0.1\n");
        const releaseOld = deferred();
        let oldStarted = false;
        const watcher = watch(async (root, configuration) => {
            if (root === directory && configuration.fhirVersion === "4.0.1") {
                oldStarted = true;
                await releaseOld.promise;
            }
        });
        const initialization = watcher.initialize();
        try {
            await waitFor(() => oldStarted);
            await fs.writeFile(configFile, "fhirVersion: 5.0.0\n");
            await waitFor(() => watcher.getConfigurationForPath(configFile)?.fhirVersion === "5.0.0");
        } finally {
            releaseOld.resolve();
            await initialization;
        }
        assert.equal(watcher.getConfigurationForPath(configFile)?.fhirVersion, "5.0.0");
    });

    test("deleting a SUSHI configuration invalidates an in-flight load", async () => {
        const configFile = path.join(directory, "sushi-config.yaml");
        await fs.writeFile(configFile, "fhirVersion: 4.0.1\n");
        const releaseOld = deferred();
        let oldStarted = false;
        let changes = 0;
        const watcher = watch(async root => {
            if (root === directory) {
                oldStarted = true;
                await releaseOld.promise;
            }
        }, () => { changes++; });
        const initialization = watcher.initialize();
        try {
            await waitFor(() => oldStarted);
            await fs.unlink(configFile);
            await waitFor(() => changes > 0);
        } finally {
            releaseOld.resolve();
            await initialization;
        }
        assert.equal(watcher.getConfigurationForPath(configFile), undefined);
    });

    test("a deleted then recreated root stays on the new SUSHI configuration", async () => {
        const configFile = path.join(directory, "sushi-config.yaml");
        await fs.writeFile(configFile, "fhirVersion: 4.0.1\n");
        const releaseOld = deferred();
        let oldStarted = false;
        let changes = 0;
        const watcher = watch(async (root, configuration) => {
            if (root === directory && configuration.fhirVersion === "4.0.1") {
                oldStarted = true;
                await releaseOld.promise;
            }
        }, () => { changes++; });
        const initialization = watcher.initialize();
        try {
            await waitFor(() => oldStarted);
            await fs.unlink(configFile);
            await waitFor(() => changes > 0);
            await fs.writeFile(configFile, "fhirVersion: 5.0.0\n");
            await waitFor(() => watcher.getConfigurationForPath(configFile)?.fhirVersion === "5.0.0");
        } finally {
            releaseOld.resolve();
            await initialization;
        }
        assert.equal(watcher.getConfigurationForPath(configFile)?.fhirVersion, "5.0.0");
    });

    test("output-only refreshes also discard a superseded model load", async () => {
        const output = path.join(directory, "output");
        await fs.mkdir(output);
        await fs.writeFile(path.join(output, "ImplementationGuide-test.json"), '{"resourceType":"ImplementationGuide"}');
        const model = path.join(output, "model.json");
        await fs.writeFile(model, '{"fhirVersion":"4.0.1"}');
        const releaseOld = deferred();
        let oldStarted = false;
        const watcher = watch(async (root, configuration) => {
            if (root !== directory) {return;}
            const version: string = JSON.parse(await fs.readFile(model, "utf8")).fhirVersion;
            if (version === "4.0.1") {
                oldStarted = true;
                await releaseOld.promise;
            }
            configuration.fhirVersion = version;
        });
        const initialization = watcher.initialize();
        try {
            await waitFor(() => oldStarted);
            await fs.writeFile(model, '{"fhirVersion":"5.0.0"}');
            await waitFor(() => watcher.getConfigurationForPath(model)?.fhirVersion === "5.0.0");
        } finally {
            releaseOld.resolve();
            await initialization;
        }
        assert.equal(watcher.getConfigurationForPath(model)?.fhirVersion, "5.0.0");
    });

    test("disposing the watcher prevents in-flight loads from publishing configurations", async () => {
        const configFile = path.join(directory, "sushi-config.yaml");
        await fs.writeFile(configFile, "fhirVersion: 4.0.1\n");
        const releaseOld = deferred();
        let oldStarted = false;
        let changes = 0;
        const watcher = watch(async root => {
            if (root === directory) {
                oldStarted = true;
                await releaseOld.promise;
            }
        }, () => { changes++; });
        const initialization = watcher.initialize();
        try {
            await waitFor(() => oldStarted);
            watcher.dispose();
        } finally {
            releaseOld.resolve();
            await initialization;
        }
        assert.equal(watcher.getConfigurationForPath(configFile), undefined);
        assert.equal(changes, 0);
    });
});
