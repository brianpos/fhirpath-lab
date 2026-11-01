import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import path from "node:path";
import test from "node:test";
import {buildLogicalTypeModels, FmlValidatorApi, getModelProvider} from "@fhirpath-lab/validator";
import {createSingleInputRequest, FmlExecutor, FmlTraceRecorder, stringifyFmlJson} from "../index";
import {createTypeLookup} from "../LabRuntimeModels";
import {labFhirPathModel} from "../LabFhirPathModels";

const coreObservation = "http://hl7.org/fhir/StructureDefinition/Observation";
const omopObservation = "http://hl7.org/fhir/uv/omop/StructureDefinition/Observation";
const recordSet = "http://hl7.org/fhir/uv/omop/StructureDefinition/RecordSet";
const measurement = "http://hl7.org/fhir/uv/omop/StructureDefinition/Measurement";
const fixture = (name: string) => readFileSync(path.join(__dirname, "..", "..", "src", "test", "fixtures", name), "utf8");
const modelResources: unknown[] = JSON.parse(fixture("omop-models.json")).entry
    .map((entry: {resource: unknown}) => entry.resource);
const customTypeModels = buildLogicalTypeModels(modelResources, "R5");

test("runtime and FHIRPath lookups keep core and logical Observation identities distinct in each FHIR version", () => {
    const source = {sourceText: "", customTypeModels};
    const lookup = createTypeLookup(source);
    for (const version of ["R4", "R5"] as const) {
        const core = getModelProvider(version === "R4" ? "r4" : "r5").lookupByTypeName("Observation");
        const logical = customTypeModels[omopObservation];
        assert.ok(core);
        assert.equal(lookup(coreObservation, version), core);
        assert.equal(lookup("Observation", version), core);
        assert.equal(lookup(omopObservation, version), logical);
        assert.notEqual(core, logical);
        assert.ok(core.Elements.some(element => element.ElementName === "code"));
        assert.equal(logical.Elements.some(element => element.ElementName === "code"), false);
        assert.ok(logical.Elements.some(element => element.ElementName === "observation_source_value"));
        const fhirPathModel = labFhirPathModel(version, source);
        assert.equal(fhirPathModel.path2Type["Observation.code"], "CodeableConcept");
        assert.equal(fhirPathModel.path2Type[`${omopObservation}.observation_date`], "date");
        assert.equal(fhirPathModel.path2Type[`${recordSet}.observation`], omopObservation);
        assert.equal(fhirPathModel.path2Type[`${omopObservation}.code`], undefined);
    }
    assert.notEqual(lookup(coreObservation, "R4"), lookup(coreObservation, "R5"));
});

test("uses canonicals resolve core-to-OMOP aliases, core child types and dependent arguments just as validation does", async () => {
    const sourceText = `
uses '${coreObservation}' alias FhirObservation as source
uses '${omopObservation}' alias OmopObservation as target
group Main(source src : FhirObservation, target tgt : OmopObservation) {
 src.code.coding as coding -> tgt then CopyCode(coding, tgt);
 src.component as component where (code.coding.code = '8480-6') -> tgt then CopyComponent(component, tgt);
 src.effective : dateTime as dt -> tgt.observation_datetime = dt, tgt.observation_date = (dt.toString().substring(0,10).toDate());
}
group CopyCode(source coding : Coding, target tgt : OmopObservation) {
 coding.code as code -> tgt.observation_source_value = code;
}
group CopyComponent(source component, target tgt : OmopObservation) {
 component.value : Quantity as quantity -> tgt then CopyQuantity(quantity, tgt);
}
group CopyQuantity(source quantity : Quantity, target tgt : OmopObservation) {
 quantity.value as value -> tgt.value_as_number = value;
}`;
    const source = {sourceText, defaultFhirVersion: "R5" as const, customTypeModels};
    const validation = await new FmlValidatorApi().validate(source);
    assert.equal(validation.status, "success", JSON.stringify(validation.diagnostics));
    const engine = new FmlExecutor();
    const prepared = await engine.prepare(source);
    assert.equal(prepared.status, "success", JSON.stringify(prepared.diagnostics));
    if (prepared.status !== "success") return;
    assert.equal(prepared.value.analysis.propertyAnalysis.groupInputs
        .find(input => input.groupName === "Main" && input.inputName === "tgt")?.typeName, omopObservation);
    const input = JSON.parse(fixture("BloodPressureVitalSignsMap.json"));
    const request = createSingleInputRequest(prepared.value, input);
    const trace = new FmlTraceRecorder();
    const executed = await engine.execute(request, {trace});
    assert.equal(executed.status, "success", JSON.stringify(executed.diagnostics));
    assert.deepEqual(JSON.parse(stringifyFmlJson(request.targets[0].value)), {
        observation_source_value: "85354-9",
        value_as_number: 120,
        observation_datetime: input.effectiveDateTime,
        observation_date: "2026-11-02",
    });
    const targetBindings = trace.events.flatMap(event => event.variables.filter(binding => binding.name === "tgt"));
    assert.ok(targetBindings.length > 0);
    assert.ok(targetBindings.every(binding => binding.typeName === omopObservation && binding.fhirVersion === "R5"));
    assert.ok(trace.events.some(event => event.variables.some(binding =>
        binding.name === "component" && binding.typeName === "observation_component" && binding.fhirVersion === "R5")));
    assert.equal(input.resourceType, "Observation");
});

test("logical child identity survives imported group arguments and core targets remain real resources", async () => {
    const groupText = `
/// url = 'http://example.test/Projection'
uses '${coreObservation}' alias Fhir as source
uses '${omopObservation}' alias Row as target
group Project(source src : Fhir, target tgt : Row) {
 src.id as id -> tgt.observation_source_value = id;
}`;
    const engine = new FmlExecutor({maps: [{sourceText: groupText, sourceName: "project.fml"}]});
    const prepared = await engine.prepare({
        sourceText: `
uses '${coreObservation}' alias Fhir as source
uses '${recordSet}' alias Records as target
imports 'http://example.test/Projection'
group Main(source src : Fhir, target tgt : Records) { src -> tgt.observation as row then Project(src, row); }`,
        defaultFhirVersion: "R5", customTypeModels,
    });
    assert.equal(prepared.status, "success", JSON.stringify(prepared.diagnostics));
    if (prepared.status !== "success") return;
    const request = createSingleInputRequest(prepared.value, {resourceType: "Observation", id: "omop-child"});
    const executed = await engine.execute(request);
    assert.equal(executed.status, "success", JSON.stringify(executed.diagnostics));
    assert.deepEqual(request.targets[0].value, {observation: [{observation_source_value: "omop-child"}]});

    const reverse = await engine.prepare({
        sourceText: `
uses '${recordSet}' alias Records as source
uses '${coreObservation}' alias Fhir as target
group Main(source src : Records, target tgt : Fhir) {
 src -> tgt.id = (src.observation.where(observation_source_value.exists()).first().observation_source_value);
}`,
        defaultFhirVersion: "R5", customTypeModels,
    });
    assert.equal(reverse.status, "success", JSON.stringify(reverse.diagnostics));
    if (reverse.status !== "success") return;
    const reversed = createSingleInputRequest(reverse.value, request.targets[0].value);
    const result = await engine.execute(reversed);
    assert.equal(result.status, "success", JSON.stringify(result.diagnostics));
    assert.deepEqual(reversed.targets[0].value, {resourceType: "Observation", id: "omop-child"});
});

test("versioned core uses aliases retain their version when passed to dependent groups alongside logical models", async () => {
    const engine = new FmlExecutor();
    const prepared = await engine.prepare({
        sourceText: `
uses 'http://hl7.org/fhir/4.0/StructureDefinition/Observation' alias CoreR4 as source
uses '${omopObservation}' alias OmopR5 as target
group Main(source src : CoreR4, target tgt : OmopR5) { src -> tgt then Project(src, tgt); }
group Project(source src : CoreR4, target tgt : OmopR5) { src.id as id -> tgt.observation_source_value = append(id); }`,
        defaultFhirVersion: "R5", customTypeModels,
    });
    assert.equal(prepared.status, "success", JSON.stringify(prepared.diagnostics));
    if (prepared.status !== "success") return;
    const request = createSingleInputRequest(prepared.value, {resourceType: "Observation", id: "r4"});
    const trace = new FmlTraceRecorder();
    const result = await engine.execute(request, {trace});
    assert.equal(result.status, "success", JSON.stringify(result.diagnostics));
    assert.deepEqual(request.targets[0].value, {observation_source_value: "r4"});
    const sources = trace.events.flatMap(event => event.variables.filter(binding => binding.name === "src"));
    assert.ok(sources.length > 0);
    assert.ok(sources.every(binding => binding.typeName === "Observation" && binding.fhirVersion === "R4"));
    assert.ok(trace.events.some(event => event.variables.some(binding =>
        binding.name === "tgt" && binding.typeName === omopObservation && binding.fhirVersion === "R5")));
});

test("RecordSet measurement children retain the logical canonical rather than its short TypeName", () => {
    const lookup = createTypeLookup({sourceText: "", customTypeModels});
    const type = lookup(recordSet, "R5")?.Elements.find(element => element.ElementName === "measurement")?.Type[0].TypeName;
    assert.equal(type, measurement);
    assert.equal(lookup(type!, "R5"), customTypeModels[measurement]);
});

test("logical inline children do not shadow identically named core backbones", async () => {
    const models = buildLogicalTypeModels([{
        resourceType: "StructureDefinition", url: omopObservation, name: "Observation", type: omopObservation,
        kind: "logical", derivation: "specialization", baseDefinition: "http://hl7.org/fhir/StructureDefinition/Base",
        differential: {element: [
            {id: "Observation", path: "Observation"},
            {id: "Observation.component", path: "Observation.component", max: "*", type: [{code: "Element"}]},
            {id: "Observation.component.omop_code", path: "Observation.component.omop_code", max: "1", type: [{code: "string"}]},
        ]},
    }], "R5");
    const childCanonical = `${omopObservation}#Observation.component`;
    assert.equal(models.observation_component, undefined);
    assert.equal(models[omopObservation].Elements[0].Type[0].TypeName, childCanonical);
    const lookup = createTypeLookup({sourceText: "", customTypeModels: models});
    assert.equal(lookup("observation_component", "R5"), getModelProvider("r5").lookupByTypeName("observation_component"));
    assert.equal(lookup(childCanonical, "R5"), models[childCanonical]);
    const engine = new FmlExecutor();
    const prepared = await engine.prepare({
        sourceText: `
uses '${coreObservation}' alias Fhir as source
uses '${omopObservation}' alias Omop as target
group Main(source src : Fhir, target tgt : Omop) { src.component as component -> tgt.component as row then Copy(component, row); }
group Copy(source component, target row) { component.code.coding.code as code -> row.omop_code = code; }`,
        defaultFhirVersion: "R5", customTypeModels: models,
    });
    assert.equal(prepared.status, "success", JSON.stringify(prepared.diagnostics));
    if (prepared.status !== "success") return;
    const request = createSingleInputRequest(prepared.value, JSON.parse(fixture("BloodPressureVitalSignsMap.json")));
    const result = await engine.execute(request);
    assert.equal(result.status, "success", JSON.stringify(result.diagnostics));
    assert.deepEqual(request.targets[0].value, {component: [{omop_code: "8480-6"}, {omop_code: "8462-4"}]});
});

test("logical inheritance follows canonical identity even when both model names are Observation", async () => {
    const base = "http://example.test/base/Observation";
    const derived = "http://example.test/derived/Observation";
    const models = buildLogicalTypeModels([
        [base, "http://hl7.org/fhir/StructureDefinition/Base", "inherited"],
        [derived, base, "own"],
    ].map(([url, baseDefinition, element]) => ({
        resourceType: "StructureDefinition", url, name: "Observation", type: url, baseDefinition,
        kind: "logical", derivation: "specialization", differential: {element: [
            {id: "Observation", path: "Observation"},
            {id: `Observation.${element}`, path: `Observation.${element}`, max: "1", type: [{code: "string"}]},
        ]},
    })), "R5");
    assert.equal(models[derived].BaseTypeName, base);
    const engine = new FmlExecutor();
    const prepared = await engine.prepare({
        sourceText: `
uses '${coreObservation}' alias Fhir as source
uses '${derived}' alias Row as target
group Main(source src : Fhir, target tgt : Row) { src.id as id -> tgt.inherited = id, tgt.own = id; }`,
        defaultFhirVersion: "R5", customTypeModels: models,
    });
    assert.equal(prepared.status, "success", JSON.stringify(prepared.diagnostics));
    if (prepared.status !== "success") return;
    const request = createSingleInputRequest(prepared.value, {resourceType: "Observation", id: "inherited-value"});
    const result = await engine.execute(request);
    assert.equal(result.status, "success", JSON.stringify(result.diagnostics));
    assert.deepEqual(request.targets[0].value, {inherited: "inherited-value", own: "inherited-value"});
});
