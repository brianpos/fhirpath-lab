import * as assert from "node:assert/strict";
import {execFile} from "node:child_process";
import {promises as fs} from "node:fs";
import os from "node:os";
import path from "node:path";
import {promisify} from "node:util";
import * as vscode from "vscode";
import {createCliContextProvider} from "../FmlTestCliContext";
import {FmlTestController} from "../FmlTestController";
import {
    defaultContextProvider, describeMap, discoverTestSets, FmlTestRunner, resolveTestConfig,
    type ContextProvider, type ResolvedTestConfig,
} from "../FmlTestRunner";
import {parseSushiConfiguration, type SushiWorkspaceConfiguration} from "../FmlWorkspaceModels";

const practitioner = "http://hl7.org/fhir/us/davinci-pdex-plan-net/StructureDefinition/plannet-Practitioner";
const network = "http://hl7.org/fhir/us/davinci-pdex-plan-net/StructureDefinition/plannet-Network";
const profileBaseTypes = {[practitioner]: "Practitioner", [network]: "Organization"};

function mapText(source: string, target = "Practitioner"): string {
    return `uses '${source}' alias S as source
uses 'http://hl7.org/fhir/StructureDefinition/${target}' alias T as target
group Main(source src : S, target tgt : T) {
 src.id -> tgt.id;
}`;
}

const indexedContext: ContextProvider = async (map, maps) => ({
    ...await defaultContextProvider(map, maps), profileBaseTypes,
});

suite("FML profile test discovery", function() {
    this.timeout(30_000);
    let directory: string;
    let config: ResolvedTestConfig;
    const controllers: FmlTestController[] = [];

    setup(async function() {
        const workspace = vscode.workspace.workspaceFolders?.[0];
        assert.ok(workspace);
        const root = this.currentTest?.title.startsWith("Test Explorer") ? workspace.uri.fsPath : os.tmpdir();
        directory = await fs.mkdtemp(path.join(root, "fml-discovery-test-"));
        config = resolveTestConfig(path.join(directory, ".fml-tests.json"), {maps: "maps", inputs: "inputs"});
        await fs.mkdir(config.maps);
        await fs.mkdir(config.inputs);
        await fs.writeFile(config.file, JSON.stringify({maps: "maps", inputs: "inputs", engine: "local"}));
        for (const resourceType of ["Practitioner", "Organization", "Patient", "Network"]) {
            const profile = resourceType === "Practitioner" ? practitioner : resourceType === "Organization" ? network : undefined;
            await fs.writeFile(path.join(config.inputs, `${resourceType}.json`),
                JSON.stringify({resourceType, id: "example", ...(profile ? {meta: {profile: [profile]}} : {})}));
        }
    });

    teardown(async () => {
        controllers.splice(0).forEach(controller => controller.dispose());
        await fs.rm(directory, {recursive: true, force: true, maxRetries: 10, retryDelay: 100});
    });

    async function writeMaps(): Promise<void> {
        await fs.writeFile(path.join(config.maps, "practitioner.fml"), mapText(practitioner));
        await fs.writeFile(path.join(config.maps, "versioned.fml"), mapText(`${practitioner}|1.1.0`));
        await fs.writeFile(path.join(config.maps, "network.fml"), mapText(network, "Organization"));
        await fs.writeFile(path.join(config.maps, "core.fml"),
            mapText("http://hl7.org/fhir/4.0/StructureDefinition/Patient|4.0.1", "Patient"));
    }

    async function writeOutput(): Promise<void> {
        const output = path.join(directory, "output", "package");
        await fs.mkdir(output, {recursive: true});
        await fs.writeFile(path.join(output, "ImplementationGuide-example.json"), '{"resourceType":"ImplementationGuide"}');
        for (const [url, type] of Object.entries(profileBaseTypes)) {
            await fs.writeFile(path.join(output, `StructureDefinition-${type}.json`),
                JSON.stringify({resourceType: "StructureDefinition", url, type, kind: "resource"}));
        }
    }

    test("describes profile and versioned canonicals using configured base types, not name prefixes", () => {
        for (const [url, type] of Object.entries(profileBaseTypes)) {
            for (const source of [url, `${url}|1.1.0`]) {
                const map = describeMap("profile.fml", mapText(source), profileBaseTypes);
                assert.equal(map.sourceType, type);
                assert.equal(map.sourceUrl, source);
            }
        }
        assert.equal(describeMap("unresolved.fml", mapText(network)).sourceType, undefined);
        assert.equal(describeMap("core.fml",
            mapText("http://hl7.org/fhir/4.0/StructureDefinition/Patient|4.0.1")).sourceType, "Patient");
        assert.equal(describeMap("bare.fml",
            "group Main(source src : Patient, target tgt : Patient) { src.id -> tgt.id; }").sourceType, "Patient");
    });

    test("resolves indexed model context before filtering and excludes unrelated resource types", async () => {
        await writeMaps();
        const sets = await discoverTestSets(config, [], indexedContext);
        assert.deepEqual(sets.map(set => [path.basename(set.map.filePath), set.map.sourceType,
            set.inputs.map(input => input.relativePath)]), [
            ["core.fml", "Patient", ["Patient.json"]],
            ["network.fml", "Organization", ["Organization.json"]],
            ["practitioner.fml", "Practitioner", ["Practitioner.json"]],
            ["versioned.fml", "Practitioner", ["Practitioner.json"]],
        ]);
        assert.equal((await discoverTestSets(config, ["network"], indexedContext)).length, 1);
        const set = sets.find(item => path.basename(item.map.filePath) === "practitioner.fml");
        assert.ok(set);
        const result = await new FmlTestRunner(config, {context: indexedContext}).runCase(set.map, set.inputs[0]);
        assert.equal(result.status, "passed", result.error ?? JSON.stringify(result.messages));
    });

    test("reports unresolved source profiles rather than returning zero tests or matching arbitrary inputs", async () => {
        await fs.writeFile(path.join(config.maps, "unresolved.fml"), mapText(`${network}|1.1.0`));
        await assert.rejects(discoverTestSets(config), error => {
            assert.ok(error instanceof Error);
            assert.match(error.message, /Unable to resolve source profile/);
            assert.ok(error.message.includes(`${network}|1.1.0`));
            assert.ok(error.message.includes("unresolved.fml"));
            return true;
        });
    });

    test("selects different profiles of the same resource only when explicitly declared", async () => {
        const otherNetwork = "http://example.test/StructureDefinition/OtherNetwork";
        await fs.writeFile(path.join(config.maps, "network.fml"), mapText(network, "Organization"));
        await fs.writeFile(path.join(config.maps, "other-network.fml"), mapText(otherNetwork, "Organization"));
        await fs.writeFile(path.join(config.maps, "core.fml"),
            mapText("http://hl7.org/fhir/StructureDefinition/Organization", "Organization"));
        const examples: Record<string, unknown> = {
            "other.json": {resourceType: "Organization", meta: {profile: [otherNetwork]}},
            "both.json": {resourceType: "Organization", meta: {profile: [otherNetwork, network]}},
            "unprofiled.json": {resourceType: "Organization"},
            "empty.json": {resourceType: "Organization", meta: {profile: []}},
            "wrong-type.json": {resourceType: "Patient", meta: {profile: [network]}},
            "missing-type.json": {meta: {profile: [network]}},
            "malformed.json": {resourceType: "Organization", meta: {profile: network}},
            "non-string.json": {resourceType: "Organization", meta: {profile: [null, 42, {}]}},
        };
        for (const [file, value] of Object.entries(examples)) {
            await fs.writeFile(path.join(config.inputs, file), JSON.stringify(value));
        }
        const context: ContextProvider = async (map, maps) => ({
            ...await indexedContext(map, maps), profileBaseTypes: {...profileBaseTypes, [otherNetwork]: "Organization"},
        });
        const sets = await discoverTestSets(config, [], context);
        const inputsFor = (file: string): string[] => {
            const set = sets.find(item => path.basename(item.map.filePath) === file);
            assert.ok(set);
            return set.inputs.map(input => input.relativePath).sort();
        };
        assert.deepEqual(inputsFor("network.fml"), ["Organization.json", "both.json"].sort());
        assert.deepEqual(inputsFor("other-network.fml"), ["both.json", "other.json"]);
        const coreInputs = inputsFor("core.fml");
        for (const file of ["Organization.json", "unprofiled.json", "empty.json", "other.json", "both.json"]) {
            assert.ok(coreInputs.includes(file), `Core map should include ${file}`);
        }
        assert.ok(!coreInputs.includes("wrong-type.json"));
    });

    test("matches profile canonicals regardless of versions and omits maps with no declared profile", async () => {
        await writeMaps();
        for (const profile of [practitioner, `${practitioner}|1.1.0`, `${practitioner}|2.0.0`]) {
            await fs.writeFile(path.join(config.inputs, "Practitioner.json"),
                JSON.stringify({resourceType: "Practitioner", meta: {profile: [profile]}}));
            const sets = await discoverTestSets(config, ["practitioner", "versioned"], indexedContext);
            assert.equal(sets.length, 2);
            for (const set of sets) {
                assert.deepEqual(set.inputs.map(input => input.relativePath), ["Practitioner.json"]);
            }
        }
        await fs.writeFile(path.join(config.inputs, "Practitioner.json"), '{"resourceType":"Practitioner"}');
        assert.deepEqual(await discoverTestSets(config, ["practitioner", "versioned"], indexedContext), []);
    });

    test("CLI loads indexed SUSHI dependency profiles and prefers local output definitions", async () => {
        await writeMaps();
        const cache = path.join(directory, "cache");
        const packageDirectory = path.join(cache, "example.plannet#1.0.0", "package");
        await fs.mkdir(packageDirectory, {recursive: true});
        await fs.writeFile(path.join(directory, "sushi-config.yml"),
            "fhirVersion: 4.0.1\ndependencies:\n  example.plannet: 1.0.0\n");
        const files = [];
        for (const [url, type] of Object.entries(profileBaseTypes)) {
            const filename = `StructureDefinition-${type}.json`;
            files.push({filename, resourceType: "StructureDefinition", url});
            await fs.writeFile(path.join(packageDirectory, filename),
                JSON.stringify({resourceType: "StructureDefinition", url, type}));
        }
        await fs.writeFile(path.join(packageDirectory, ".index.json"), JSON.stringify({files}));
        const context = createCliContextProvider(cache);
        const sets = await discoverTestSets(config, [], context);
        assert.equal(sets.length, 4);
        assert.equal(sets.find(set => path.basename(set.map.filePath) === "network.fml")?.map.sourceType, "Organization");
        const resolved = await context(sets[0].map, sets.map(set => set.map));
        assert.equal(resolved.defaultFhirVersion, "R4");
        assert.equal(resolved.modelResources.length, 2);
        await writeOutput();
        await fs.writeFile(path.join(directory, "output", "package", "StructureDefinition-Organization.json"),
            JSON.stringify({resourceType: "StructureDefinition", url: network, type: "Patient"}));
        await fs.writeFile(path.join(config.inputs, "Patient.json"),
            JSON.stringify({resourceType: "Patient", meta: {profile: [network]}}));
        const updated = await discoverTestSets(config, ["network"], createCliContextProvider(cache));
        assert.deepEqual(updated[0].inputs.map(input => input.relativePath), ["Patient.json"]);
    });

    test("bundled CLI discovers and executes IG-output profile maps without VS Code", async () => {
        await writeMaps();
        await writeOutput();
        await fs.writeFile(path.join(config.inputs, "unprofiled.json"), '{"resourceType":"Practitioner"}');
        const cli = path.join(__dirname, "..", "..", "dist", "fml-test-cli.js");
        const {stdout} = await promisify(execFile)(process.execPath, [cli, "--config", config.file], {timeout: 25_000});
        assert.match(stdout, /4\/4 passed/);
        assert.match(stdout, /PASS network.fml :: Organization.json/);
        assert.match(stdout, /PASS practitioner.fml :: Practitioner.json/);
        assert.match(stdout, /PASS versioned.fml :: Practitioner.json/);
        assert.doesNotMatch(stdout, /:: Network.json/);
        assert.doesNotMatch(stdout, /:: unprofiled.json/);
        await fs.writeFile(path.join(config.maps, "unresolved.fml"), mapText("http://example.test/Unknown"));
        await assert.rejects(promisify(execFile)(process.execPath, [cli, "--config", config.file]),
            (error: Error & {code?: number; stderr?: string}) => {
                assert.equal(error.code, 2);
                assert.match(error.stderr ?? "", /Unable to resolve source profile.*Unknown/);
                return true;
            });
    });

    test("Test Explorer uses the indexed configuration during refresh and exposes unresolved profile errors", async () => {
        await writeMaps();
        await fs.writeFile(path.join(config.inputs, "unprofiled.json"), '{"resourceType":"Organization"}');
        const configuration: SushiWorkspaceConfiguration = {...parseSushiConfiguration("", directory), profileBaseTypes};
        const testController = vscode.tests.createTestController("fmlTools.profileDiscoveryTests", "FML Profile Tests");
        const watcher = vscode.workspace.createFileSystemWatcher(
            new vscode.RelativePattern(directory, "**/*"), true, true, true);
        const controller = new FmlTestController(program =>
            program.startsWith(directory) ? configuration : undefined, testController, watcher);
        controllers.push(controller);
        const configurations = await vscode.workspace.findFiles("**/.fml-tests.json", "**/node_modules/**");
        assert.ok(configurations.some(uri => uri.fsPath.toLowerCase() === config.file.toLowerCase()),
            `Configuration not found: ${JSON.stringify(configurations.map(uri => uri.fsPath))}`);
        await controller.refresh();
        const id = vscode.Uri.file(config.file).toString();
        const root = testController.items.get(id);
        assert.ok(root);
        assert.equal(root.error, undefined);
        const discovered: Record<string, string[]> = {};
        root.children.forEach(map => {
            const labels: string[] = [];
            map.children.forEach(input => labels.push(input.label));
            discovered[map.label] = labels;
        });
        assert.deepEqual(discovered, {
            "core.fml": ["Patient.json"], "network.fml": ["Organization.json"],
            "practitioner.fml": ["Practitioner.json"], "versioned.fml": ["Practitioner.json"],
        });
        configuration.profileBaseTypes = {};
        await controller.refresh();
        const failed = testController.items.get(root.id);
        assert.match(String(failed?.error), /Unable to resolve source profile/);
    });
});
