import assert from "node:assert/strict";
import test from "node:test";
import {FmlLanguageService} from "../FmlLanguageService";

const service = new FmlLanguageService();

test("maps validator errors to bounded editor-neutral diagnostics", async () => {
    const result = await service.validateDocument({
        uri: "file:///invalid.fml",
        text: "group example(source src, target tgt) { src -> tgt.id = uuid('bad'); }",
    });

    assert.equal(result.errorCount, 1);
    assert.equal(result.warningCount, 0);
    assert.equal(result.diagnostics[0].severity, "error");
    assert.equal(result.diagnostics[0].source, "FHIR Mapping Language Tools");
    assert.ok(result.diagnostics[0].range.start.line >= 0);
    assert.ok(result.diagnostics[0].range.end.character <= 72);
});

test("keeps unknown transforms as successful warning diagnostics", async () => {
    const result = await service.validateDocument({
        uri: "file:///custom.fml",
        text: "group example(source src, target tgt) { src -> tgt.id = customTransform(src); }",
    });

    assert.equal(result.errorCount, 0);
    assert.equal(result.warningCount, 1);
    assert.match(result.diagnostics[0].message, /Unknown transform/);
});

test("offers standard transforms in assignment position", () => {
    const text = "src -> tgt.value = tr";
    const completions = service.getCompletions({
        uri: "file:///completion.fml",
        text,
        position: {line: 0, character: text.length},
    });

    assert.ok(completions.some(completion => completion.label === "truncate"));
    assert.ok(completions.some(completion => completion.label === "translate"));
    assert.equal(completions[0].snippet, true);
});

test("does not offer transform completions outside assignments", () => {
    const text = "group example";
    assert.deepEqual(service.getCompletions({
        uri: "file:///completion.fml",
        text,
        position: {line: 0, character: text.length},
    }), []);
});

test("offers properties available on a typed FML variable", () => {
    const text = [
        "uses 'http://hl7.org/fhir/5.0/StructureDefinition/Patient' alias Patient as source",
        "group example(source src : Patient, target tgt : Patient) {",
        "    src.na -> tgt.name;",
        "}",
    ].join("\n");
    const offset = text.indexOf("src.na") + "src.na".length;
    const completions = service.getCompletions({
        uri: "file:///property-completion.fml",
        text,
        position: positionAt(text, offset),
    });

    const name = completions.find(completion => completion.label === "name");
    assert.ok(name);
    assert.equal(name.kind, "property");
    assert.match(name.detail, /HumanName/);
    assert.match(name.detail, /\[0\.\.\*\]/);
    assert.match(name.detail, /R5/);
});

test("offers nested properties using resolved child types", () => {
    const text = [
        "uses 'http://hl7.org/fhir/5.0/StructureDefinition/Patient' alias Patient as source",
        "group example(source src : Patient, target tgt : Patient) {",
        "    src.name.fa -> tgt.name;",
        "}",
    ].join("\n");
    const offset = text.indexOf("src.name.fa") + "src.name.fa".length;
    const completions = service.getCompletions({
        uri: "file:///nested-property-completion.fml",
        text,
        position: positionAt(text, offset),
    });

    assert.ok(completions.some(completion => completion.label === "family"));
});

test("offers properties on target variables without an IG build", () => {
    const text = [
        "uses 'http://hl7.org/fhir/5.0/StructureDefinition/Observation' alias Observation as target",
        "group example(source src : Observation, target tgt : Observation) {",
        "    src.status -> tgt.st;",
        "}",
    ].join("\n");
    const offset = text.indexOf("tgt.st") + "tgt.st".length;
    const completions = service.getCompletions({
        uri: "file:///target-property-completion.fml",
        text,
        position: positionAt(text, offset),
    });

    assert.ok(completions.some(completion => completion.label === "status"));
    assert.ok(completions.every(completion => !completion.label.includes("build IG")));
});

test("offers nested properties on typed aliases", () => {
    const text = [
        "uses 'http://hl7.org/fhir/5.0/StructureDefinition/Patient' alias Patient as source",
        "group example(source src : Patient, target tgt : Patient) {",
        "    src.name as patientName then {",
        "        patientName.fa -> tgt.name;",
        "    };",
        "}",
    ].join("\n");
    const offset = text.indexOf("patientName.fa") + "patientName.fa".length;
    const completions = service.getCompletions({
        uri: "file:///alias-property-completion.fml",
        text,
        position: positionAt(text, offset),
    });

    assert.ok(completions.some(completion => completion.label === "family"));
});

test("resolves completion context in the active group", () => {
    const text = [
        "uses 'http://hl7.org/fhir/5.0/StructureDefinition/Patient' alias Patient as source",
        "uses 'http://hl7.org/fhir/5.0/StructureDefinition/Observation' alias Observation as source",
        "group PatientGroup(source src : Patient, target tgt : Patient) {",
        "}",
        "group ObservationGroup(source src : Observation, target tgt : Observation) {",
        "    src.st -> tgt.status;",
        "}",
    ].join("\n");
    const offset = text.indexOf("src.st") + "src.st".length;
    const completions = service.getCompletions({
        uri: "file:///multi-group-completion.fml",
        text,
        position: positionAt(text, offset),
    });

    assert.ok(completions.some(completion => completion.label === "status"));
    assert.ok(!completions.some(completion => completion.label === "name"));
});

test("provides FHIR property type hover information", () => {
    const text = [
        "uses 'http://hl7.org/fhir/4.3/StructureDefinition/Patient' alias Patient as source",
        "group example(source src : Patient, target tgt : Patient) {",
        "    src.name -> tgt.name;",
        "}",
    ].join("\n");
    const offset = text.indexOf("src.name") + "src.".length;
    const hover = service.getHover({
        uri: "file:///hover.fml",
        text,
        position: positionAt(text, offset),
    });

    assert.ok(hover);
    assert.match(hover.markdown, /Source property/);
    assert.match(hover.markdown, /\[`Patient\.name`\]\([^)]+\) \[0\.\.\*\] \(R4B\)/);
    assert.match(hover.markdown, /Type: `HumanName`/);
    assert.match(hover.markdown, /https:\/\/hl7\.org\/fhir\/R4B\/patient-definitions\.html#Patient\.name/);
    assert.doesNotMatch(hover.markdown, /repeating/);
    assert.match(hover.markdown, /\(R4B\)/);
});

test("uses the configured default FHIR version in profile property hover links", () => {
    const profileUrl = "http://example.org/fhir/StructureDefinition/CustomPractitioner";
    const configuredService = new FmlLanguageService();
    configuredService.configureModels("R4", {[profileUrl]: "Practitioner"});
    const text = [
        `uses '${profileUrl}' alias CustomPractitioner as source`,
        "group example(source src : CustomPractitioner, target tgt) {",
        "    src.name -> tgt.name;",
        "}",
    ].join("\n");
    const offset = text.indexOf("src.name") + "src.".length;

    const hover = configuredService.getHover({
        uri: "file:///profile-hover.fml",
        text,
        position: positionAt(text, offset),
    });

    assert.ok(hover);
    assert.match(hover.markdown, /`Practitioner\.name`/);
    assert.match(hover.markdown, /\(R4\)/);
    assert.match(hover.markdown, /https:\/\/hl7\.org\/fhir\/R4\/practitioner-definitions\.html#Practitioner\.name/);
});

test("property hovers show required singular cardinality", () => {
    const text = [
        "uses 'http://hl7.org/fhir/5.0/StructureDefinition/Observation' alias Observation as target",
        "group example(source src : Observation, target tgt : Observation) {",
        "    src.status -> tgt.status;",
        "}",
    ].join("\n");
    const offset = text.indexOf("tgt.status") + "tgt.".length;
    const hover = service.getHover({
        uri: "file:///required-hover.fml",
        text,
        position: positionAt(text, offset),
    });

    assert.ok(hover);
    assert.match(hover.markdown, /Target property/);
    assert.match(hover.markdown, /\[`Observation\.status`\]\([^)]+\) \[1\.\.1\] \(R5\)/);
    assert.match(hover.markdown, /Type: `code`/);
});

test("property hovers show required repeating cardinality", () => {
    const text = [
        "uses 'http://hl7.org/fhir/5.0/StructureDefinition/Appointment' alias Appointment as target",
        "group example(source src : Appointment, target tgt : Appointment) {",
        "    src.participant -> tgt.participant;",
        "}",
    ].join("\n");
    const offset = text.indexOf("tgt.participant") + "tgt.".length;
    const hover = service.getHover({
        uri: "file:///required-repeating-hover.fml",
        text,
        position: positionAt(text, offset),
    });

    assert.ok(hover);
    assert.match(hover.markdown, /\[`Appointment\.participant`\]\([^)]+\) \[1\.\.\*\] \(R5\)/);
    assert.match(hover.markdown, /Type: `appointment_participant`/);
});

test("property hovers list every choice type", () => {
    const text = [
        "uses 'http://hl7.org/fhir/4.3/StructureDefinition/Observation' alias Observation as source",
        "group example(source src : Observation, target tgt : Observation) {",
        "    src.value -> tgt.value;",
        "}",
    ].join("\n");
    const offset = text.indexOf("src.value") + "src.".length;
    const hover = service.getHover({
        uri: "file:///choice-hover.fml",
        text,
        position: positionAt(text, offset),
    });

    assert.ok(hover);
    assert.match(hover.markdown, /Compatible types/);
    assert.match(hover.markdown, /Quantity/);
    assert.match(hover.markdown, /CodeableConcept/);
    assert.match(hover.markdown, /string/);
    assert.match(hover.markdown, /observation-definitions\.html#Observation\.value_x_/);
});

test("filtered choice hovers italicize other possible types", () => {
    const text = [
        "uses 'http://hl7.org/fhir/5.0/StructureDefinition/Condition' alias Condition as source",
        "group example(source src : Condition, target tgt : Condition) {",
        "    src.onset : Age -> tgt.onset;",
        "}",
    ].join("\n");
    const offset = text.indexOf("src.onset") + "src.".length;
    const hover = service.getHover({
        uri: "file:///filtered-choice-hover.fml",
        text,
        position: positionAt(text, offset),
    });

    assert.ok(hover);
    assert.match(hover.markdown, /Compatible types: `Age`/);
    assert.match(hover.markdown, /- \*Other possible types: `Period` \| `Range` \| `dateTime` \| `string`\*/);
});

test("property hovers list Reference target profiles", () => {
    const text = [
        "uses 'http://hl7.org/fhir/5.0/StructureDefinition/Patient' alias Patient as source",
        "group example(source src : Patient, target tgt : Patient) {",
        "    src.generalPractitioner -> tgt.generalPractitioner;",
        "}",
    ].join("\n");
    const offset = text.indexOf("src.generalPractitioner") + "src.".length;
    const hover = service.getHover({
        uri: "file:///profile-hover.fml",
        text,
        position: positionAt(text, offset),
    });

    assert.ok(hover);
    assert.match(hover.markdown, /Target profiles:/);
    assert.match(hover.markdown, /\[`Practitioner`\]\(https:\/\/hl7\.org\/fhir\/R5\/practitioner\.html\)/);
    assert.match(hover.markdown, /\[`Organization`\]\(https:\/\/hl7\.org\/fhir\/R5\/organization\.html\)/);
});

test("transform hovers show fixed result types", () => {
    const text = [
        "uses 'http://hl7.org/fhir/5.0/StructureDefinition/Observation' alias Observation as target",
        "group example(source src : Observation, target tgt : Observation) {",
        "    src -> tgt.identifier = id('system', 'value');",
        "}",
    ].join("\n");
    const offset = text.indexOf("id(") + 1;
    const hover = service.getHover({
        uri: "file:///transform-hover.fml",
        text,
        position: positionAt(text, offset),
    });

    assert.ok(hover);
    assert.match(hover.markdown, /Transform.*`id`/);
    assert.match(hover.markdown, /Result type: `Identifier`/);
});

test("transform hovers derive result types from parameters", () => {
    const text = [
        "uses 'http://hl7.org/fhir/5.0/StructureDefinition/Bundle' alias Bundle as target",
        "group example(source src : Bundle, target tgt : Bundle) {",
        "    src -> tgt.entry.resource = create('Patient');",
        "}",
    ].join("\n");
    const offset = text.indexOf("create(") + 1;
    const hover = service.getHover({
        uri: "file:///create-hover.fml",
        text,
        position: positionAt(text, offset),
    });

    assert.ok(hover);
    assert.match(hover.markdown, /Transform.*`create`/);
    assert.match(hover.markdown, /Result type: `Patient`/);
});

test("uuid transform hovers report primitive string", () => {
    const text = [
        "uses 'http://hl7.org/fhir/5.0/StructureDefinition/Bundle' alias Bundle as target",
        "group example(source src : Bundle, target tgt : Bundle) {",
        "    src -> tgt.entry as entry, uuid() as fullUrl;",
        "}",
    ].join("\n");
    const offset = text.indexOf("uuid(") + 1;
    const hover = service.getHover({
        uri: "file:///uuid-hover.fml",
        text,
        position: positionAt(text, offset),
    });

    assert.ok(hover);
    assert.match(hover.markdown, /Transform.*`uuid`/);
    assert.match(hover.markdown, /Result type: `string`/);
});

test("every repeated target property occurrence receives a hover", () => {
    const text = [
        "uses 'http://hl7.org/fhir/5.0/StructureDefinition/Observation' alias Observation as source",
        "group example(source src : Observation, target tgt : Observation) {",
        "    src.value : Quantity -> tgt.value \"valueQuantity\";",
        "    src.value : CodeableConcept -> tgt.value \"valueCodeableConcept\";",
        "    src.value : string -> tgt.value \"valueString\";",
        "}",
    ].join("\n");
    const targetOffsets = [...text.matchAll(/tgt\.value/g)].map(match => match.index + "tgt.".length);

    assert.equal(targetOffsets.length, 3);
    for (const offset of targetOffsets) {
        const hover = service.getHover({
            uri: "file:///repeated-hover.fml",
            text,
            position: positionAt(text, offset),
        });
        assert.ok(hover);
        assert.match(hover.markdown, /Observation\.value/);
        assert.match(hover.markdown, /\(R5\)/);
    }
});

test("maps group definitions and references to editor-neutral ranges", () => {
    const text = `
group Parent(source src, target tgt) {
}
group Child(source src, target tgt) extends Parent {
    src -> tgt then Parent(src, tgt);
}
`;
    const symbols = service.getGroupSymbols({
        uri: "file:///groups.fml",
        text,
    });

    assert.deepEqual(symbols.definitions.map(symbol => symbol.name), ["Parent", "Child"]);
    assert.deepEqual(symbols.references.map(symbol => symbol.kind), ["extends", "invocation"]);
    assert.deepEqual(symbols.definitions[0].range.start, {line: 1, character: 6});
    assert.deepEqual(symbols.references[0].range.start, {line: 3, character: 44});
    assert.deepEqual(symbols.references[1].range.start, {line: 4, character: 20});
});

test("provides canonical URLs and import patterns for workspace indexing", () => {
    const symbols = service.getDocumentSymbols({
        uri: "file:///indexed.fml",
        text: `
/// url = 'http://example.org/StructureMap/Indexed'
imports 'http://example.org/StructureMap/Common*'
group Indexed(source src, target tgt) {
}
`,
    });

    assert.deepEqual(symbols.canonicalUrls, ["http://example.org/StructureMap/Indexed"]);
    assert.deepEqual(symbols.imports, ["http://example.org/StructureMap/Common*"]);
});

function positionAt(text: string, offset: number): {line: number; character: number} {
    const prefix = text.slice(0, offset);
    return {
        line: prefix.split(/\r?\n/).length - 1,
        character: offset - (prefix.lastIndexOf("\n") + 1),
    };
}
