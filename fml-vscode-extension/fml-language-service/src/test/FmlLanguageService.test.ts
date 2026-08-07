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
    const text = "group example(source src, target tgt) { src -> tgt.value = tr";
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

test("uses semantic source and target contexts for property completions", () => {
    const text = [
        "uses 'http://hl7.org/fhir/5.0/StructureDefinition/Patient' alias Patient as source",
        "group example(source src : Patient, target tgt : Patient) {",
        "    src.na -> tgt.na;",
        "}",
    ].join("\n");

    for (const token of ["src.na", "tgt.na"]) {
        const offset = text.indexOf(token) + token.length;
        const completions = service.getCompletions({
            uri: "file:///semantic-property-completion.fml",
            text,
            position: positionAt(text, offset),
        });
        assert.ok(completions.some(completion => completion.label === "name"), token);
        assert.ok(completions.every(completion => completion.kind === "property"), token);
    }
});

test("ignores invalid text after the completion cursor", () => {
    const text = [
        "uses 'http://hl7.org/fhir/5.0/StructureDefinition/Patient' alias Patient as source",
        "group example(source src : Patient, target tgt : Patient) {",
        "    src.na this text after the cursor is not FML",
        "}",
    ].join("\n");
    const offset = text.indexOf("src.na") + "src.na".length;
    const completions = service.getCompletions({
        uri: "file:///cursor-bounded-completion.fml",
        text,
        position: positionAt(text, offset),
    });

    assert.ok(completions.some(completion => completion.label === "name"));
});

test("offers a target property consistently for every typed prefix", () => {
    const property = "managingOrganization";
    for (let length = 0; length < property.length; length++) {
        const prefix = property.slice(0, length);
        const text = [
            "uses 'http://hl7.org/fhir/5.0/StructureDefinition/Patient' alias Patient as target",
            "group example(source src : Patient, target tgt : Patient) {",
            `    src -> tgt.${prefix} invalid text after cursor`,
            "}",
        ].join("\n");
        const offset = text.indexOf(`tgt.${prefix}`) + `tgt.${prefix}`.length;
        const completions = service.getCompletions({
            uri: "file:///stable-prefix-completion.fml",
            text,
            position: positionAt(text, offset),
        });

        assert.ok(completions.some(completion => completion.label === property), prefix);
    }
});

test("converts CRLF completion positions without shifting the cursor offset", () => {
    const text = [
        "uses 'http://hl7.org/fhir/5.0/StructureDefinition/Patient' alias Patient as target",
        "group example(source src : Patient, target tgt : Patient) {",
        "    src -> tgt.managingOrga",
        "}",
    ].join("\r\n");
    const offset = text.indexOf("tgt.managingOrga") + "tgt.managingOrga".length;
    const completions = service.getCompletions({
        uri: "file:///crlf-completion.fml",
        text,
        position: positionAt(text, offset),
    });

    assert.ok(completions.some(completion => completion.label === "managingOrganization"));
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

test("offers custom model children immediately after source and target dots", () => {
    const canonical = "http://example.org/StructureDefinition/ClaimRow";
    const configuredService = new FmlLanguageService();
    configuredService.configureModels("R4", {[canonical]: "ClaimRow"}, {
        ClaimRow: {
            TypeName: "ClaimRow",
            Elements: [
                {ElementName: "claimNumber", Type: [{TypeName: "string"}]},
                {ElementName: "status", Type: [{TypeName: "code"}]},
            ],
        },
    });
    for (const [variable, rule] of [
        ["src.", "src."],
        ["tgt.", "src.status -> tgt."],
    ]) {
        const text = [
            `uses '${canonical}' alias ClaimRow as source`,
            `uses '${canonical}' alias ClaimRow as target`,
            "group example(source src : ClaimRow, target tgt : ClaimRow) {",
            `    ${rule}`,
            "}",
        ].join("\n");
        const offset = text.indexOf(variable) + variable.length;
        const completions = configuredService.getCompletions({
            uri: "file:///custom-property-completion.fml",
            text,
            position: positionAt(text, offset),
        });

        assert.ok(completions.some(completion => completion.label === "claimNumber"), variable);
        assert.ok(completions.some(completion => completion.label === "status"), variable);
    }
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

test("offers derived-type properties on filtered Resource aliases", () => {
    const text = [
        "uses 'http://hl7.org/fhir/5.0/StructureDefinition/Bundle' alias Bundle as source",
        "uses 'http://hl7.org/fhir/5.0/StructureDefinition/Patient' alias Patient as target",
        "group example(source src : Bundle, target tgt : Patient) {",
        "    src.entry.resource : Patient as patient -> tgt then {",
        "        patient.bi -> tgt.active;",
        "    };",
        "}",
    ].join("\n");
    const offset = text.indexOf("patient.bi") + "patient.bi".length;
    const completions = service.getCompletions({
        uri: "file:///filtered-resource-alias-completion.fml",
        text,
        position: positionAt(text, offset),
    });

    assert.ok(
        completions.some(completion => completion.label === "birthDate"),
        completions.map(completion => completion.label).join(", "),
    );
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

test("distinguishes context and nested property hover segments", () => {
    const text = [
        "uses 'http://hl7.org/fhir/5.0/StructureDefinition/Observation' alias Observation as source",
        "group example(source src : Observation, target tgt : Observation) {",
        "    src.code.coding -> tgt.code.coding;",
        "}",
    ].join("\n");
    const hoverAt = (token: string, delta = 1) => service.getHover({
        uri: "file:///segment-hover.fml",
        text,
        position: positionAt(text, text.indexOf(token) + delta),
    });

    const context = hoverAt("src.code.coding");
    const code = hoverAt("src.code.coding", "src.".length + 1);
    const coding = hoverAt("src.code.coding", "src.code.".length + 1);

    assert.ok(context);
    assert.match(context.markdown, /Source context.*`src`/);
    assert.match(context.markdown, /Type: `Observation`/);
    assert.ok(code);
    assert.match(code.markdown, /Source property.*`Observation\.code`/);
    assert.match(code.markdown, /Type: `CodeableConcept`/);
    assert.match(code.markdown, /\[1\.\.1\]/);
    assert.ok(coding);
    assert.match(coding.markdown, /Source property.*`Observation\.code\.coding`/);
    assert.match(coding.markdown, /Type: `Coding`/);
    assert.match(coding.markdown, /\[0\.\.\*\]/);
});

test("provides variable hovers at declarations, contexts, and transform arguments", () => {
    const text = [
        "uses 'http://hl7.org/fhir/5.0/StructureDefinition/Patient' alias Patient as source",
        "group example(source src : Patient, target tgt : Patient) {",
        "    src.birthDate as birthDate -> tgt.deceased = cast(birthDate, 'dateTime');",
        "    src -> tgt.name as targetName then {",
        "        src.name -> targetName.text;",
        "    };",
        "}",
    ].join("\n");
    const hoverAtOccurrence = (value: string, occurrence: number) => {
        let offset = -1;
        for (let index = 0; index <= occurrence; index++) offset = text.indexOf(value, offset + 1);
        return service.getHover({
            uri: "file:///variable-hover.fml",
            text,
            position: positionAt(text, offset + 1),
        });
    };

    const sourceDeclaration = hoverAtOccurrence("birthDate", 1);
    const transformArgument = hoverAtOccurrence("birthDate", 2);
    const targetDeclaration = hoverAtOccurrence("targetName", 0);
    const targetContext = hoverAtOccurrence("targetName", 1);

    for (const hover of [sourceDeclaration, transformArgument]) {
        assert.ok(hover);
        assert.match(hover.markdown, /Variable.*`birthDate`/);
        assert.match(hover.markdown, /Type: `date`/);
        assert.match(hover.markdown, /\[0\.\.1\]/);
    }
    for (const hover of [targetDeclaration, targetContext]) {
        assert.ok(hover);
        assert.match(hover.markdown, /Variable.*`targetName`/);
        assert.match(hover.markdown, /Type: `HumanName`/);
        assert.match(hover.markdown, /\[0\.\.\*\]/);
    }
});

test("provides variable hovers on dependent group call arguments", () => {
    const text = [
        "uses 'http://hl7.org/fhir/5.0/StructureDefinition/Observation' alias Observation as source",
        "group example(source src : Observation, target tgt : Observation) {",
        "    src as parent -> tgt.component as measurement then parentTable(parent, measurement);",
        "}",
        "group parentTable(source parent, target child) {",
        "}",
    ].join("\n");
    const callOffset = text.indexOf("parent, measurement");
    const parentHover = service.getHover({
        uri: "file:///dependent-argument-hover.fml",
        text,
        position: positionAt(text, callOffset + 1),
    });
    const measurementHover = service.getHover({
        uri: "file:///dependent-argument-hover.fml",
        text,
        position: positionAt(text, callOffset + "parent, ".length + 1),
    });

    assert.ok(parentHover);
    assert.match(parentHover.markdown, /Variable.*`parent`/);
    assert.match(parentHover.markdown, /Type: `Observation`/);
    assert.ok(measurementHover);
    assert.match(measurementHover.markdown, /Variable.*`measurement`/);
    assert.match(measurementHover.markdown, /Type: `observation_component`/);
    assert.match(measurementHover.markdown, /\[0\.\.\*\]/);
});

test("shows typed signatures on dependent calls and group parameters", () => {
    const text = [
        "uses 'http://hl7.org/fhir/5.0/StructureDefinition/Observation' alias Observation as source",
        "group example(source src : Observation, target tgt : Observation) {",
        "    src.component as measurement -> tgt then parentTable(measurement, tgt);",
        "}",
        "group parentTable(source parent, target child : Observation) {",
        "}",
    ].join("\n");
    const hoverAt = (needle: string, occurrence = 0) => {
        let offset = -1;
        for (let index = 0; index <= occurrence; index++) offset = text.indexOf(needle, offset + 1);
        return service.getHover({
            uri: "file:///group-signature-hover.fml",
            text,
            position: positionAt(text, offset + 1),
        });
    };

    const call = hoverAt("parentTable", 0);
    const inferredParameter = hoverAt("parent", 2);
    const declaredParameter = hoverAt("child", 0);

    assert.ok(call);
    assert.match(call.markdown, /Group call.*`parentTable`/);
    assert.match(call.markdown, /`source parent`: `observation_component` \(R5\)/);
    assert.match(call.markdown, /`target child`: `Observation` \(R5\)/);
    assert.ok(inferredParameter);
    assert.match(inferredParameter.markdown, /Source parameter.*`parent`/);
    assert.match(inferredParameter.markdown, /Type: `observation_component` \(R5\)/);
    assert.match(inferredParameter.markdown, /inferred from calling context/);
    assert.ok(declaredParameter);
    assert.match(declaredParameter.markdown, /Target parameter.*`child`/);
    assert.match(declaredParameter.markdown, /Type: `Observation` \(R5\)/);
    assert.match(declaredParameter.markdown, /Resolution: declared/);
});

test("variable hovers do not leak across sibling rules and show provenance", () => {
    const text = [
        "uses 'http://hl7.org/fhir/5.0/StructureDefinition/MedicationStatement' alias MedicationStatement as source",
        "group example(source src : MedicationStatement, target tgt : MedicationStatement) {",
        "    src.effective : Period as firstPeriod then {",
        "        firstPeriod.start as fps -> tgt.effective = fps;",
        "    };",
        "    src.effective : Period as secondPeriod then {",
        "        secondPeriod.end as fpe -> tgt.effective = (fpe.toString()), tgt.effective = cast(fps, 'dateTime');",
        "    };",
        "}",
    ].join("\n");
    const hoverAt = (needle: string, start = 0) => {
        const offset = text.indexOf(needle, start);
        return service.getHover({
            uri: "file:///variable-scope-hover.fml",
            text,
            position: positionAt(text, offset),
        });
    };
    const secondRule = text.indexOf("secondPeriod.end");
    const fpe = hoverAt("fpe", secondRule);
    const expressionFpe = hoverAt("fpe", text.indexOf("(fpe.toString())"));
    const leakedFps = hoverAt("fps", secondRule);

    for (const hover of [fpe, expressionFpe]) {
        assert.ok(hover);
        assert.match(hover.markdown, /Variable.*`fpe` \[0\.\.1\] \(R5\)/);
        assert.match(hover.markdown, /Source property: `MedicationStatement\.effective\.end` \[0\.\.1\] \(R5\)/);
        assert.match(hover.markdown, /Type: `dateTime`/);
    }
    assert.ok(leakedFps);
    assert.match(leakedFps.markdown, /Variable.*`fps`/);
    assert.match(leakedFps.markdown, /not defined in the current rule context/);
    assert.doesNotMatch(leakedFps.markdown, /Type: `dateTime`/);
});

test("provides hovers for target variable assignments", () => {
    const text = [
        "uses 'http://hl7.org/fhir/5.0/StructureDefinition/Patient' alias Patient as source",
        "group example(source src : Patient, target tgt : Patient) {",
        "    src.name as d -> tgt.name as b, b = d;",
        "}",
    ].join("\n");
    const assignment = text.indexOf("b = d");
    const hoverAt = (offset: number) => service.getHover({
        uri: "file:///target-variable-hover.fml",
        text,
        position: positionAt(text, offset),
    });
    const targetVariable = hoverAt(assignment);
    const sourceVariable = hoverAt(assignment + "b = ".length);

    assert.ok(targetVariable);
    assert.match(targetVariable.markdown, /Variable.*`b` \[0\.\.\*\] \(R5\)/);
    assert.match(targetVariable.markdown, /Target property: `Patient\.name` \[0\.\.\*\] \(R5\)/);
    assert.match(targetVariable.markdown, /Type: `HumanName`/);
    assert.ok(sourceVariable);
    assert.match(sourceVariable.markdown, /Variable.*`d` \[0\.\.\*\] \(R5\)/);
    assert.match(sourceVariable.markdown, /Source property: `Patient\.name` \[0\.\.\*\] \(R5\)/);
    assert.match(sourceVariable.markdown, /Type: `HumanName`/);
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

test("logical model property hovers omit FHIR specification links", () => {
    const logicalService = new FmlLanguageService();
    const canonical = "http://example.org/StructureDefinition/ClaimRow";
    logicalService.configureModels("R4", {[canonical]: "ClaimRow"}, {
        ClaimRow: {
            TypeName: "ClaimRow",
            Elements: [{ElementName: "claimNumber", Type: [{TypeName: "string"}]}],
        },
    });
    const text = [
        `uses '${canonical}' alias ClaimRow as source`,
        "group example(source src : ClaimRow, target tgt) {",
        "    src.claimNumber -> tgt.id;",
        "}",
    ].join("\n");
    const hover = logicalService.getHover({
        uri: "file:///logical-hover.fml",
        text,
        position: positionAt(text, text.indexOf("claimNumber") + 2),
    });

    assert.ok(hover);
    assert.match(hover.markdown, /`ClaimRow\.claimNumber`/);
    assert.doesNotMatch(hover.markdown, /hl7\.org\/fhir/);
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

test("filtered choice property and variable hovers show different type scopes", () => {
    const text = [
        "uses 'http://hl7.org/fhir/5.0/StructureDefinition/Observation' alias Observation as source",
        "group example(source src : Observation, target tgt : Observation) {",
        "    src.value : CodeableConcept as s -> tgt then {",
        "        s.coding -> tgt.value;",
        "    };",
        "}",
    ].join("\n");
    const propertyOffset = text.indexOf("src.value") + "src.".length + 1;
    const variableOffset = text.indexOf(" as s ->") + " as ".length;
    const contextOffset = text.indexOf("s.coding");
    const hoverAt = (offset: number) => service.getHover({
        uri: "file:///filtered-variable-hover.fml",
        text,
        position: positionAt(text, offset),
    });

    const property = hoverAt(propertyOffset);
    const declaration = hoverAt(variableOffset);
    const context = hoverAt(contextOffset);

    assert.ok(property);
    assert.match(property.markdown, /Compatible types: `CodeableConcept`/);
    assert.match(property.markdown, /Other possible types/);
    for (const [label, hover] of [["declaration", declaration], ["context", context]] as const) {
        assert.ok(hover, label);
        assert.match(hover.markdown, /Variable.*`s`/);
        assert.match(hover.markdown, /Type: `CodeableConcept`/);
        assert.doesNotMatch(hover.markdown, /Other possible types/);
    }
});

test("Resource property hover retains its declared type while its filtered variable is derived", () => {
    const text = [
        "uses 'http://hl7.org/fhir/5.0/StructureDefinition/Bundle' alias Bundle as source",
        "uses 'http://hl7.org/fhir/5.0/StructureDefinition/Condition' alias Condition as target",
        "group example(source src : Bundle, target tgt : Condition) {",
        "    src.entry.resource : Condition as condition -> tgt then {",
        "        condition.code -> tgt.code;",
        "    };",
        "}",
    ].join("\n");
    const propertyOffset = text.indexOf("entry.resource") + "entry.".length + 1;
    const variableOffset = text.indexOf(" as condition") + " as ".length + 1;
    const hoverAt = (offset: number) => service.getHover({
        uri: "file:///filtered-resource-hover.fml",
        text,
        position: positionAt(text, offset),
    });

    const property = hoverAt(propertyOffset);
    const variable = hoverAt(variableOffset);

    assert.ok(property);
    assert.match(property.markdown, /Source property.*`Bundle\.entry\.resource`/);
    assert.match(property.markdown, /Type: `Resource`/);
    assert.doesNotMatch(property.markdown, /Type: `Condition`/);
    assert.ok(variable);
    assert.match(variable.markdown, /Variable.*`condition`/);
    assert.match(variable.markdown, /Type: `Condition`/);
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
