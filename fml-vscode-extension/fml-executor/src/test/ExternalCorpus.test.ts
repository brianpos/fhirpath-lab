import assert from "node:assert/strict";
import {test} from "node:test";
import {discoverFmlCorpus, loadFmlCorpusFixture} from "../testing/corpus";
import {createSingleInputRequest, FmlExecutor, FmlTraceRecorder, parseFmlJson, stringifyFmlJson, type FmlExecutionOptions} from "../index";

// Only reviewed, suspected-invalid expectations belong here; implementation gaps remain TODOs.
const reviewedFixtureSkips: ReadonlyMap<string, string> = new Map([
    ["imports", "The map/input use Patient, but imported SimpleIdentity declares Basic source and target. Correct the imported group types or use a compatible map/input; accepting this would bypass group-signature validation."],
    ["syntax-backticks", "The map declares FHIR Basic but accesses group!, group#, section4.5 and section4.6, none of which exist on Basic. The supplied input has none of those fields and the expected Basic-only output masks the invalid typed paths. Supply a logical model/input for this syntax example or make it a parse-only test."],
    ["transform-cc", "The map requires an Encounter source but its input resourceType is Basic. The expected Encounter output does not make that source binding valid. Change the input to Encounter or the map source declaration to Basic."],
]);

test("external resource-output acceptance inventory", async t => {
    const root = process.env.FML_CORPUS_ROOT;
    assert.ok(root, "Set FML_CORPUS_ROOT to the local fml-incubator checkout; no corpus was executed.");
    const cases = await discoverFmlCorpus({root});
    const complete = cases.filter(fixture => fixture.issues.length === 0);
    assert.ok(complete.length > 0, "The configured corpus contains no complete map/input/expected-output cases.");
    for (const [id, reason] of reviewedFixtureSkips) {
        assert.ok(cases.some(fixture => fixture.id === id), `Stale fixture skip '${id}'.`);
        assert.ok(reason.trim(), `Fixture skip '${id}' requires a review reason.`);
    }
    const fixtures = await Promise.all(complete.map(fixture => loadFmlCorpusFixture(fixture)));
    t.diagnostic(`${cases.length} discovered; ${complete.length} complete; ${cases.length - complete.length} incomplete. Executing all complete cases.`);
    for (const fixture of cases) {
        const reason = reviewedFixtureSkips.get(fixture.id);
        if (reason) {
            await t.test(`${fixture.id}: reviewed fixture`, {skip: reason});
        } else if (fixture.issues.length > 0) {
            await t.test(`${fixture.id}: ${fixture.issues.join(" ")}`, {todo: "Incomplete fixture; needs classification, not an engine pass."});
        } else {
            await t.test(`${fixture.id}: fixture files and JSON syntax`, async () => {
                const loaded = await loadFmlCorpusFixture(fixture);
                assert.ok(loaded.source.sourceText.trim(), "FML map must not be empty.");
            });
            await t.test(`${fixture.id}: expected resource output`, async () => {
                const loaded = await loadFmlCorpusFixture(fixture);
                const executor = new FmlExecutor({maps: fixtures.map(fixture => fixture.source)});
                const prepared = await executor.prepare(loaded.source);
                assert.equal(prepared.status, "success", JSON.stringify(prepared.diagnostics));
                if (prepared.status !== "success") return;
                const request = createSingleInputRequest(prepared.value, parseFmlJson(loaded.inputText));
                const services: FmlExecutionOptions = {
                    uuid: () => "50d1ccab-883e-47f2-b84f-8820348290a6",
                    translate: async (source, canonical, outputType) => {
                        assert.equal(canonical, "http://hl7.org/fhir/ConceptMap/101", "Undeclared external terminology dependency.");
                        assert.equal(source.value, "home");
                        assert.equal(outputType, "CodeableConcept");
                        // Deterministic host fixture for the published AddressUse -> v3-AddressUse mapping.
                        return [{name: "translated", typeName: "CodeableConcept", value: {coding: [{
                            system: "http://terminology.hl7.org/CodeSystem/v3-AddressUse", code: "H",
                        }]}}];
                    },
                };
                const result = await executor.execute(request, services);
                assert.equal(result.status, "success", JSON.stringify(result.diagnostics));
                if (result.status !== "success") return;
                assert.deepEqual(parseFmlJson(stringifyFmlJson(result.value.targets[0].value)), parseFmlJson(loaded.expectedOutputText));
                const recorder = new FmlTraceRecorder();
                const traced = await executor.execute(createSingleInputRequest(prepared.value, parseFmlJson(loaded.inputText)), {
                    ...services, trace: recorder,
                });
                assert.equal(traced.status, "success", JSON.stringify(traced.diagnostics));
                if (traced.status === "success") {
                    assert.deepEqual(parseFmlJson(stringifyFmlJson(traced.value.targets[0].value)), parseFmlJson(loaded.expectedOutputText));
                }
            });
        }
    }
});
