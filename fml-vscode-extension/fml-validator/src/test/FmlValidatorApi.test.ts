import assert from "node:assert/strict";
import test from "node:test";
import {FmlValidatorApi} from "../FmlValidatorApi";
import {FmlValidatorResult, ParsedFml} from "../contracts";

const validFml = `
map 'http://example.org/StructureMap/example' = example

uses 'http://hl7.org/fhir/StructureDefinition/Patient' as source
uses 'http://hl7.org/fhir/StructureDefinition/Patient' as target

group copy(source src, target tgt) {
    src.id -> tgt.id;
}
`;

const validateTransform = async (invocation: string): Promise<FmlValidatorResult<ParsedFml>> => {
    return new FmlValidatorApi().validate({
        sourceName: "transform.fml",
        sourceText: `
group example(source src, target tgt) {
    src -> tgt.value = ${invocation};
}
`,
    });
};

test("accepts syntactically valid FML", async () => {
    const result = await new FmlValidatorApi().validate({
        sourceText: validFml,
        sourceName: "valid.fml",
    });

    assert.equal(result.status, "success", result.diagnostics.map(diagnostic => diagnostic.message).join("; "));
    assert.deepEqual(result.diagnostics.filter(diagnostic => diagnostic.severity !== "information"), []);
    if (result.status === "success") {
        assert.equal(result.value.model.groups[0].name, "copy");
    }
});

test("returns line and column diagnostics for invalid FML", async () => {
    const result = await new FmlValidatorApi().validate({
        sourceText: "group broken(source src, target tgt) { src.id -> ; }",
        sourceName: "invalid.fml",
    });

    assert.equal(result.status, "failure");
    assert.ok(result.diagnostics.length > 0);
    assert.equal(result.diagnostics[0].sourceName, "invalid.fml");
    assert.ok(result.diagnostics[0].line > 0);
    assert.ok(result.diagnostics[0].column >= 0);
});

test("compiles the shared FML model into a FHIR StructureMap", async () => {
    const validator = new FmlValidatorApi();
    const result = await validator.compile({sourceText: validFml});

    assert.equal(result.status, "success");
    if (result.status === "success") {
        assert.equal(result.value.resource.resourceType, "StructureMap");
        assert.equal(result.value.resource.url, "http://example.org/StructureMap/example");
        assert.equal(result.value.resource.group?.[0].name, "copy");
        assert.equal(result.value.resource.group?.[0].rule[0].source[0].element, "id");
        assert.equal(result.value.resource.group?.[0].rule[0].target?.[0].element, "id");
    }
});

test("accepts every standard transform signature", async () => {
    const validInvocations = [
        "create('Patient')",
        "copy(src)",
        "truncate('abcdef', 3)",
        "escape('value', 'html', 'xml')",
        "cast(src)",
        "cast(src, 'string')",
        "append(src, ' ', tgt)",
        "translate(src, 'http://example.org/ConceptMap/example', 'code')",
        "translate(src, map_uri: 'http://example.org/ConceptMap/example', output: 'CodeableConcept')",
        "reference(src)",
        "toDateTime('20240701', 'yyyyMMdd')",
        "unixToDateTime(1720000000)",
        "unixToDateTime(1720000000, '+10:00')",
        "toDate('20240701', 'yyyyMMdd')",
        "unixToDate(1720000000)",
        "toTime('120000', 'HHmmss')",
        "unixToTime(1720000000, '+10:00')",
        "uuid()",
        "pointer(src)",
        "evaluate(src, item.count())",
        "cc('display text')",
        "cc('http://loinc.org', '1234-5', 'Display')",
        "c('http://loinc.org', '1234-5')",
        "qty('5 mg')",
        "qty(5.5, 'mg')",
        "qty(5, 'mg', 'http://unitsofmeasure.org', 'mg')",
        "id('http://example.org/mrn', '12345', 'MR')",
        "cp('person@example.org')",
        "cp('email', 'person@example.org')",
    ];

    for (const invocation of validInvocations) {
        const result = await validateTransform(invocation);
        assert.equal(
            result.status,
            "success",
            `${invocation}: ${result.diagnostics.map(diagnostic => diagnostic.message).join("; ")}`,
        );
        assert.deepEqual(result.diagnostics.filter(diagnostic => diagnostic.severity !== "information"), []);
    }
});

test("reports unknown transforms as warnings without failing validation", async () => {
    const result = await validateTransform("customTransform(src)");

    assert.equal(result.status, "success");
    const warnings = result.diagnostics.filter(diagnostic => diagnostic.severity === "warning");
    assert.equal(warnings.length, 1);
    assert.match(warnings[0].message, /Unknown transform 'customTransform'/);
});

test("rejects FHIRPath expression parameters outside evaluate", async () => {
    const result = await validateTransform("copy(src.item.first())");

    assert.equal(result.status, "failure");
    const expressionDiagnostics = result.diagnostics.filter(diagnostic => {
        return diagnostic.severity === "error"
            && diagnostic.message.includes("only permitted for the 'evaluate' transform");
    });
    assert.equal(expressionDiagnostics.length, 1);
    assert.equal(result.diagnostics.filter(diagnostic => diagnostic.severity === "error").length, 1);
});

test("treats underscore-containing aliases as variable references", async () => {
    const result = await validateTransform("truncate(source_value, 5)");

    assert.equal(result.status, "success");
    assert.deepEqual(result.diagnostics.filter(diagnostic => diagnostic.severity !== "information"), []);
});

test("treats delimited aliases as variable references", async () => {
    const result = await validateTransform("truncate(`source-value`, 5)");

    assert.equal(result.status, "success");
    assert.deepEqual(result.diagnostics.filter(diagnostic => diagnostic.severity !== "information"), []);
});

test("requires the evaluate expression parameter to be a FHIRPath expression", async () => {
    const result = await validateTransform("evaluate(src, 'item.count()')");

    assert.equal(result.status, "failure");
    assert.ok(result.diagnostics.some(diagnostic => {
        return diagnostic.message.includes("parameter 'expression' must be expression");
    }));
});

test("validates FHIRPath expressions against typed FML aliases", async () => {
    const result = await new FmlValidatorApi().validate({sourceText: `
uses 'http://hl7.org/fhir/5.0/StructureDefinition/Condition' alias Condition as source
group Main(source src : Condition, target tgt : Condition) {
    src.onset : Period as onset -> tgt.recordedDate = (%onset.start.value);
}
`});

    assert.equal(result.status, "success", result.diagnostics.map(diagnostic => diagnostic.message).join("; "));
    assert.ok(result.diagnostics.every(diagnostic => !diagnostic.message.startsWith("FHIRPath:")));
});

test("treats bare root FML aliases as FHIRPath environment variables", async () => {
    const result = await new FmlValidatorApi().validate({sourceText: `
uses 'http://hl7.org/fhir/5.0/StructureDefinition/Patient' alias Patient as source
group Main(source src : Patient, target tgt : Patient) {
    src.gender as x where (x.toString() = 'male') -> tgt.gender;
}
`});

    assert.equal(result.status, "success", result.diagnostics.map(diagnostic => diagnostic.message).join("; "));
    assert.ok(result.diagnostics.every(diagnostic => !diagnostic.message.includes("Property 'x'")));
});

test("scopes reused FML aliases to the rule that declares them", async () => {
    const result = await new FmlValidatorApi().validate({sourceText: `
uses 'http://hl7.org/fhir/4.3/StructureDefinition/ConceptMap' alias ConceptMap as source
group Element(source src : conceptmap_group_element, target tgt : conceptmap_group_element) {
    src.target as s where (s != 'unmatched') -> tgt.target;
}
group Target(source src : conceptmap_group_element_target, target tgt : conceptmap_group_element_target) {
    src.dependsOn as s -> tgt.dependsOn;
    src.product as s -> tgt.product;
}
`});

    assert.equal(result.status, "failure");
    const diagnostic = result.diagnostics.find(candidate => candidate.message.includes("Operator '!='"));
    assert.match(diagnostic?.message ?? "", /conceptmap_group_element_target and string/);
    assert.doesNotMatch(diagnostic?.message ?? "", /target_dependsOn/);
});

test("reports invalid FHIRPath properties inside FML expressions", async () => {
    const result = await new FmlValidatorApi().validate({sourceText: `
uses 'http://hl7.org/fhir/5.0/StructureDefinition/Condition' alias Condition as source
group Main(source src : Condition, target tgt : Condition) {
    src.onset : Period as onset -> tgt.recordedDate = (%onset.missing.value);
}
`});

    assert.equal(result.status, "failure");
    const diagnostic = result.diagnostics.find(candidate => candidate.message.includes("Property 'missing'"));
    assert.equal(diagnostic?.severity, "error");
    assert.equal(diagnostic?.line, 4);
    assert.match(diagnostic?.message ?? "", /^FHIRPath:/);
});

test("validates FHIRPath expressions in typed source clauses", async () => {
    const result = await new FmlValidatorApi().validate({sourceText: `
uses 'http://hl7.org/fhir/5.0/StructureDefinition/Condition' alias Condition as source
group Main(source src : Condition, target tgt : Condition) {
    src.onset : Period as onset where (missing.exists()) -> tgt.onset;
}
`});

    assert.equal(result.status, "failure");
    const diagnostic = result.diagnostics.find(candidate => candidate.message.includes("Property 'missing'"));
    assert.equal(diagnostic?.severity, "error");
    assert.equal(diagnostic?.line, 4);
    assert.match(diagnostic?.message ?? "", /^FHIRPath:/);
});

test("preserves whitespace around FHIRPath word operators in FML clauses", async () => {
    const expression = "coding.exists(code = 'Patient' and system = 'http://hl7.org/fhir/resource-types')";
    const result = await new FmlValidatorApi().validate({sourceText: `
uses 'http://hl7.org/fhir/4.3/StructureDefinition/ActivityDefinition' alias ActivityDefinition as source
group Main(source src : ActivityDefinition, target tgt : ActivityDefinition) {
    src.subject as s where (${expression}) -> tgt.subject;
}
`});

    assert.equal(result.status, "success", result.diagnostics.map(diagnostic => diagnostic.message).join("; "));
    if (result.status === "success") {
        assert.equal(result.value.model.groups[0].rules[0].sources[0].condition, expression);
    }
    assert.ok(result.diagnostics.every(diagnostic => !diagnostic.message.includes("andsystem")));
});

test("validates standard transform arity", async () => {
    const result = await validateTransform("uuid('unexpected')");

    assert.equal(result.status, "failure");
    assert.ok(result.diagnostics.some(diagnostic => {
        return diagnostic.message.includes("received 1 parameter(s)");
    }));
});

test("validates statically known parameter types", async () => {
    const result = await validateTransform("truncate('abcdef', 'three')");

    assert.equal(result.status, "failure");
    assert.ok(result.diagnostics.some(diagnostic => {
        return diagnostic.message.includes("parameter 'length' must be integer; received string");
    }));
});

test("validates constrained parameter values", async () => {
    const result = await validateTransform(
        "translate(src, 'http://example.org/ConceptMap/example', 'invalid-output')",
    );

    assert.equal(result.status, "failure");
    assert.ok(result.diagnostics.some(diagnostic => {
        return diagnostic.message.includes("must be one of: code, system, display, Coding, CodeableConcept");
    }));
});

test("accepts translate output compatible with the target element type", async () => {
    const result = await new FmlValidatorApi().validate({sourceText: `
uses 'http://hl7.org/fhir/5.0/StructureDefinition/Observation' alias Observation as source
group Main(source src : Observation, target tgt : Observation) {
    src.status -> tgt.status = translate(src, 'http://example.org/ConceptMap/status', 'code');
}
`});

    assert.equal(result.status, "success", result.diagnostics.map(diagnostic => diagnostic.message).join("; "));
    assert.ok(result.diagnostics.every(diagnostic => !diagnostic.message.includes("not compatible")));
});

test("rejects incompatible translate output on each repeated target occurrence", async () => {
    const result = await new FmlValidatorApi().validate({sourceText: `
uses 'http://hl7.org/fhir/5.0/StructureDefinition/Observation' alias Observation as source
group Main(source src : Observation, target tgt : Observation) {
    src.status -> tgt.status = translate(src, 'http://example.org/ConceptMap/status', 'code');
    src.status -> tgt.status = translate(src, 'http://example.org/ConceptMap/status', 'Coding');
}
`});

    assert.equal(result.status, "failure");
    const compatibilityErrors = result.diagnostics.filter(diagnostic => diagnostic.message.includes("not compatible"));
    assert.equal(compatibilityErrors.length, 1);
    assert.equal(compatibilityErrors[0].severity, "error");
    assert.equal(compatibilityErrors[0].line, 5);
    assert.match(compatibilityErrors[0].message, /output type 'Coding'/);
    assert.match(compatibilityErrors[0].message, /allowed: code/);
    assert.match(compatibilityErrors[0].message, /third parameter/);
});

test("validates named parameters", async () => {
    const result = await validateTransform(
        "translate(src, map: 'http://example.org/ConceptMap/example', output: 'code')",
    );

    assert.equal(result.status, "failure");
    assert.ok(result.diagnostics.some(diagnostic => {
        return diagnostic.message.includes("has no parameter named 'map'");
    }));
});

test("honours overload parameter counts", async () => {
    const result = await validateTransform("qty(5, 'mg', 'http://unitsofmeasure.org')");

    assert.equal(result.status, "failure");
    assert.ok(result.diagnostics.some(diagnostic => {
        return diagnostic.message.includes("received 3 parameter(s)");
    }));
});

test("collects group declarations, invocations, and extends references", () => {
    const sourceText = `
group Parent(source src, target tgt) {
}

group Child(source src, target tgt) extends Parent {
    src -> tgt then Parent(src, tgt);
}
`;
    const symbols = new FmlValidatorApi().getGroupSymbols({sourceText});

    assert.deepEqual(symbols.definitions.map(symbol => symbol.name), ["Parent", "Child"]);
    assert.deepEqual(symbols.references.map(symbol => [symbol.name, symbol.kind]), [
        ["Parent", "extends"],
        ["Parent", "invocation"],
    ]);
    assert.equal(symbols.definitions[0].span.start.line, 2);
    assert.equal(symbols.references[0].span.start.line, 5);
});

test("does not collect target transforms as group invocations", () => {
    const symbols = new FmlValidatorApi().getGroupSymbols({sourceText: `
group Main(source src, target tgt) {
    src -> tgt.id = truncate(src, 10), uuid() as generated then Main(src, tgt);
}
`});

    assert.deepEqual(symbols.references.map(symbol => symbol.name), ["Main"]);
});

test("collects symbols safely from incomplete group syntax", () => {
    const validator = new FmlValidatorApi();

    assert.doesNotThrow(() => validator.getGroupSymbols({sourceText: "group {"}));
    assert.doesNotThrow(() => validator.getGroupSymbols({
        sourceText: "group Child(source src, target tgt) extends {",
    }));
});

test("collects canonical URLs and wildcard imports", () => {
    const symbols = new FmlValidatorApi().getDocumentSymbols({sourceText: `
/// url = 'http://example.org/StructureMap/Main'
conceptmap "http://example.org/ConceptMap/Inline" {
    prefix s = 'http://example.org/source'
    prefix t = 'http://example.org/target'
    s:a - t:b
}
imports 'http://example.org/StructureMap/Common*'
group Main(source src, target tgt) {
}
`});

    assert.deepEqual(symbols.canonicalUrls, [
        "http://example.org/StructureMap/Main",
        "http://example.org/ConceptMap/Inline",
    ]);
    assert.deepEqual(symbols.imports, ["http://example.org/StructureMap/Common*"]);
});

test("collects position-aware FHIR property usages", () => {
    const sourceText = [
        "uses 'http://hl7.org/fhir/4.3/StructureDefinition/Patient' alias Patient as source",
        "group Main(source src : Patient, target tgt : Patient) {",
        "    src.name -> tgt.name;",
        "}",
    ].join("\n");
    const usages = new FmlValidatorApi().getPropertyUsages({sourceText});
    const sourceName = usages.find(usage => usage.role === "source" && usage.path === "name");

    assert.ok(sourceName);
    assert.equal(sourceName.rootTypeName, "Patient");
    assert.equal(sourceName.elementTypeName, "HumanName");
    assert.equal(sourceName.isCollection, true);
    assert.deepEqual(sourceName.span.start, {line: 3, column: 4});
    assert.deepEqual(sourceName.span.end, {line: 3, column: 12});
});

test("retains every source occurrence when target properties share a diagram row", () => {
    const sourceText = [
        "uses 'http://hl7.org/fhir/5.0/StructureDefinition/Observation' alias Observation as source",
        "group Main(source src : Observation, target tgt : Observation) {",
        "    src.value : Quantity -> tgt.value \"valueQuantity\";",
        "    src.value : CodeableConcept -> tgt.value \"valueCodeableConcept\";",
        "    src.value : string -> tgt.value \"valueString\";",
        "}",
    ].join("\n");
    const usages = new FmlValidatorApi().getPropertyUsages({sourceText});
    const targets = usages.filter(usage => usage.role === "target" && usage.path === "value");

    assert.equal(targets.length, 3);
    assert.deepEqual(targets.map(usage => usage.span.start.line), [3, 4, 5]);
    assert.ok(targets.every(usage => usage.fhirVersion === "R5"));
});

test("reports unresolved properties as warnings from the selected FHIR version", async () => {
    const result = await new FmlValidatorApi().validate({sourceText: [
        "uses 'http://hl7.org/fhir/5.0/StructureDefinition/Observation' alias Observation as source",
        "group Main(source src : Observation, target tgt : Observation) {",
        "    src.notAProperty -> tgt.identifier;",
        "}",
    ].join("\n")});

    assert.equal(result.status, "success");
    const warning = result.diagnostics.find(diagnostic => diagnostic.message.includes("notAProperty"));
    assert.equal(warning?.severity, "warning");
    assert.match(warning?.message ?? "", /R5 FHIR model/);
});

test("reports group inputs without declared or contextual types as information", async () => {
    const result = await new FmlValidatorApi().validate({sourceText: `
group Main(source src, target tgt) {
}
`});

    assert.equal(result.status, "success");
    assert.equal(result.diagnostics.filter(diagnostic => diagnostic.severity === "information").length, 2);
    assert.ok(result.diagnostics.every(diagnostic => diagnostic.severity === "information"));
});

test("rejects conflicting types inferred for the same group input", async () => {
    const result = await new FmlValidatorApi().validate({sourceText: `
uses 'http://hl7.org/fhir/4.3/StructureDefinition/Patient' alias Patient as source
uses 'http://hl7.org/fhir/4.3/StructureDefinition/Observation' alias Observation as source

group Main(source patient : Patient, source observation : Observation, target tgt : Patient) {
    patient as patientValue -> tgt then Shared(patientValue, tgt);
    observation as observationValue -> tgt then Shared(observationValue, tgt);
}

group Shared(source src, target tgt) {
}
`});

    assert.equal(result.status, "failure");
    const conflict = result.diagnostics.find(diagnostic => diagnostic.message.includes("Shared.src"));
    assert.equal(conflict?.severity, "error");
    assert.match(conflict?.message ?? "", /Patient \(R4B\)/);
    assert.match(conflict?.message ?? "", /Observation \(R4B\)/);
});

test("resolves cross-version dependent source and target inputs from context", async () => {
    const result = await new FmlValidatorApi().validate({sourceText: `
uses 'http://hl7.org/fhir/4.3/StructureDefinition/Condition' alias ConditionR4B as source
uses 'http://hl7.org/fhir/5.0/StructureDefinition/Condition' alias ConditionR5 as target

group Main(source src : ConditionR4B, target tgt : ConditionR5) {
    src.recorder as recorder -> tgt.participant as targetRecorder then ConditionRecorder(recorder, targetRecorder);
    src.asserter as asserter -> tgt.participant as targetAsserter then ConditionAsserter(asserter, targetAsserter);
}

group ConditionRecorder(source src, target tgt) {
    src -> tgt.actor;
}

group ConditionAsserter(source src, target tgt) {
    src -> tgt.actor;
}
`});

    assert.equal(result.status, "success");
    assert.ok(result.diagnostics.every(diagnostic => {
        return !diagnostic.message.includes("ConditionRecorder")
            && !diagnostic.message.includes("ConditionAsserter");
    }));
});

test("resolves multi-level dependent group inputs before validation", async () => {
        const result = await new FmlValidatorApi().validate({sourceText: `
uses 'http://hl7.org/fhir/4.3/StructureDefinition/AdministrableProductDefinition' alias APDR4B as source
uses 'http://hl7.org/fhir/5.0/StructureDefinition/AdministrableProductDefinition' alias APDR5 as target
group Root(source src : APDR4B, target tgt : APDR5) {
    src.routeOfAdministration as s -> tgt.routeOfAdministration as t then Route(s, t);
}
group Route(source src, target tgt) {
    src.targetSpecies as s -> tgt.targetSpecies as t then Species(s, t);
}
group Species(source src, target tgt) {
    src.withdrawalPeriod as s -> tgt.withdrawalPeriod as t then Withdrawal(s, t);
}
group Withdrawal(source src, target tgt) {
    src.tissue -> tgt.tissue;
}
`});

        assert.equal(result.status, "success", result.diagnostics.map(diagnostic => diagnostic.message).join("; "));
        assert.ok(result.diagnostics.every(diagnostic => !diagnostic.message.includes("could not be resolved")));
});
