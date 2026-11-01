import * as assert from "node:assert";
import {promises as fs} from "node:fs";
import os from "node:os";
import path from "node:path";
import * as vscode from "vscode";
import {FmlLocalDebugService} from "@fhirpath-lab/debug-service";
import {resolveFmlDebugDependencies} from "../FmlDebugDependencies";
import {
    implementationGuideOutputProjectDirectory, parseSushiConfiguration,
    resolveOutputWorkspaceConfiguration, resolveWorkspaceModelResourcePaths, SushiConfigWatcher,
} from "../SushiConfigWatcher";
import {UiConstants} from "../constants/UiConstants";

const canonical = "http://example.test/PackagedMap";
const mapText = `
uses 'http://hl7.org/fhir/StructureDefinition/Patient' alias S as source
uses 'http://hl7.org/fhir/StructureDefinition/Observation' alias T as target
group Main(source src : S, target tgt : T) {
 src.gender as value -> tgt.value = translate(value, '${canonical}|2', 'CodeableConcept');
}`;

function conceptMap(version = "2", code = "M") {
    return {resourceType: "ConceptMap", url: canonical, version, group: [{
        source: "http://example.test/source", target: "http://example.test/target",
        element: [{code: "male", target: [{code, relationship: "equivalent"}]}],
    }]};
}

suite("Existing ConceptMap dependency catalogs", () => {
    let directory: string;

    setup(async () => {
        directory = await fs.mkdtemp(path.join(os.tmpdir(), "fml-catalog-conceptmaps-"));
    });

    teardown(async () => {
        for (const document of vscode.workspace.textDocuments.filter(document =>
            !document.isClosed && document.uri.fsPath.startsWith(directory) && document.isDirty)) {
            await vscode.window.showTextDocument(document, {preview: false});
            await vscode.commands.executeCommand("workbench.action.revertAndCloseActiveEditor");
        }
        await fs.rm(directory, {recursive: true, force: true, maxRetries: 5, retryDelay: 100});
    });

    test("reuses the existing output package paths for a map in input/R4toR5 without scanning input JSON", async () => {
        const program = path.join(directory, "input", "R4toR5", "Age4to5.fml");
        const sourceJson = path.join(directory, "input", "elements", "ConceptMap-elements-3to2.json");
        const outputDirectory = path.join(directory, "output", "package");
        const conceptMapPath = path.join(outputDirectory, "ConceptMap-example.json");
        const marker = path.join(outputDirectory, "ImplementationGuide-example.json");
        await fs.mkdir(path.dirname(program), {recursive: true});
        await fs.mkdir(path.dirname(sourceJson), {recursive: true});
        await fs.mkdir(outputDirectory, {recursive: true});
        await fs.writeFile(program, mapText);
        await fs.writeFile(sourceJson, "This source JSON is deliberately not read.");
        await fs.writeFile(marker, '{"resourceType":"ImplementationGuide"}');
        const resource = conceptMap();
        await fs.writeFile(conceptMapPath, JSON.stringify(resource));

        assert.equal(implementationGuideOutputProjectDirectory(marker), directory);
        const configuration = await resolveOutputWorkspaceConfiguration(directory);
        assert.ok(configuration.modelResourcePaths.some(file => file.toLowerCase() === conceptMapPath.toLowerCase()));
        assert.equal(configuration.modelResourcePaths.some(file => file.toLowerCase() === sourceJson.toLowerCase()), false);
        assert.deepEqual(configuration.modelFileCache?.find(file =>
            file.filePath.toLowerCase() === conceptMapPath.toLowerCase())?.resources, [resource]);
        await fs.unlink(conceptMapPath);
        const dependencies = await resolveFmlDebugDependencies(
            program, mapText, [], () => {}, undefined, configuration.modelResourcePaths, undefined,
            [{filePath: program, text: mapText}], configuration.modelFileCache,
        );
        assert.deepEqual(dependencies.modelResources, [resource]);
        const result = await new FmlLocalDebugService().execute({
            mapText, inputText: '{"resourceType":"Patient","gender":"male"}',
            modelResources: dependencies.modelResources, localTrace: false,
        });
        assert.deepEqual(result.result?.value, {resourceType: "Observation",
            valueCodeableConcept: {coding: [{system: "http://example.test/target", code: "M"}]}});
    });

    test("uses indexed package ConceptMaps and selects the exact requested version", async () => {
        const packageDirectory = path.join(directory, "package");
        await fs.mkdir(packageDirectory);
        const indexPath = path.join(packageDirectory, ".index.json");
        const old = path.join(packageDirectory, "old.json");
        const selected = path.join(packageDirectory, "selected.json");
        await fs.writeFile(indexPath, JSON.stringify({files: [
            {resourceType: "ConceptMap", filename: "old.json", url: canonical},
            {resourceType: "ConceptMap", filename: "selected.json", url: canonical},
        ]}));
        await fs.writeFile(old, JSON.stringify(conceptMap("1", "wrong")));
        await fs.writeFile(selected, JSON.stringify(conceptMap()));
        const paths = await resolveWorkspaceModelResourcePaths(directory, [{
            packageId: "example.package", version: "1", indexExists: true, indexPath,
        }], {});
        const program = path.join(directory, "main.fml");
        const dependencies = await resolveFmlDebugDependencies(
            program, mapText, [], () => {}, undefined, paths, undefined, [{filePath: program, text: mapText}],
        );
        assert.deepEqual(dependencies.modelResources, [conceptMap()]);
    });

    test("loads only an explicitly configured Bundle and uses unsaved edits", async () => {
        const file = path.join(directory, "models.json");
        const ignored = path.join(directory, "unrelated.json");
        await fs.writeFile(file, JSON.stringify({resourceType: "Bundle", entry: [{resource: conceptMap("1")}, {resource: conceptMap()}]}));
        await fs.writeFile(ignored, "unrelated JSON is not inspected");
        const document = await vscode.workspace.openTextDocument(vscode.Uri.file(file));
        const updated = conceptMap("2", "unsaved");
        const edit = new vscode.WorkspaceEdit();
        edit.replace(document.uri, new vscode.Range(document.positionAt(0), document.positionAt(document.getText().length)),
            JSON.stringify({resourceType: "Bundle", entry: [{resource: updated}]}));
        assert.ok(await vscode.workspace.applyEdit(edit));
        const program = path.join(directory, "main.fml");
        const dependencies = await resolveFmlDebugDependencies(
            program, mapText, [file], () => {}, undefined, [], undefined, [{filePath: program, text: mapText}],
        );
        assert.deepEqual(dependencies.modelResources, [updated]);
    });

    test("reuses the already discovered workspace catalog only when no model root contains the map", () => {
        const rootConfiguration = parseSushiConfiguration("", directory);
        const workspaceConfiguration = {...parseSushiConfiguration("", directory), modelResourcePaths: [path.join(directory, "ConceptMap-global.json")]};
        const rootedProgram = path.join(directory, "rooted.fml");
        let workspaceReads = 0;
        class FixtureWatcher extends SushiConfigWatcher {
            public override getConfigurationForPath(filePath: string) {
                return filePath === rootedProgram ? rootConfiguration : undefined;
            }
            public override getWorkspaceConfiguration() {
                workspaceReads++;
                return workspaceConfiguration;
            }
        }
        const watcher = new FixtureWatcher(UiConstants.detailsChannel);
        try {
            assert.strictEqual(watcher.getEvaluationConfigurationForPath(rootedProgram), rootConfiguration);
            assert.equal(workspaceReads, 0);
            assert.strictEqual(watcher.getEvaluationConfigurationForPath(path.join(directory, "outside.fml")), workspaceConfiguration);
            assert.equal(workspaceReads, 1);
        } finally {
            watcher.dispose();
        }
    });
});
