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

    assert.equal(result.status, "success");
    assert.deepEqual(result.diagnostics, []);
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

test("exposes explicit stage-1 stubs for future engine capabilities", async () => {
    const validator = new FmlValidatorApi();
    const result = await validator.compile({sourceText: validFml});

    assert.equal(result.status, "not-implemented");
    if (result.status === "not-implemented") {
        assert.equal(result.operation, "compile");
        assert.match(result.message, /future validator-engine hook/);
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
        assert.deepEqual(result.diagnostics, []);
    }
});

test("reports unknown transforms as warnings without failing validation", async () => {
    const result = await validateTransform("customTransform(src)");

    assert.equal(result.status, "success");
    assert.equal(result.diagnostics.length, 1);
    assert.equal(result.diagnostics[0].severity, "warning");
    assert.match(result.diagnostics[0].message, /Unknown transform 'customTransform'/);
});

test("rejects FHIRPath expression parameters outside evaluate", async () => {
    const result = await validateTransform("copy(src.item.first())");

    assert.equal(result.status, "failure");
    const expressionDiagnostics = result.diagnostics.filter(diagnostic => {
        return diagnostic.severity === "error"
            && diagnostic.message.includes("only permitted for the 'evaluate' transform");
    });
    assert.equal(expressionDiagnostics.length, 1);
    assert.equal(result.diagnostics.length, 1);
});

test("treats underscore-containing aliases as variable references", async () => {
    const result = await validateTransform("truncate(source_value, 5)");

    assert.equal(result.status, "success");
    assert.deepEqual(result.diagnostics, []);
});

test("treats delimited aliases as variable references", async () => {
    const result = await validateTransform("truncate(`source-value`, 5)");

    assert.equal(result.status, "success");
    assert.deepEqual(result.diagnostics, []);
});

test("requires the evaluate expression parameter to be a FHIRPath expression", async () => {
    const result = await validateTransform("evaluate(src, 'item.count()')");

    assert.equal(result.status, "failure");
    assert.ok(result.diagnostics.some(diagnostic => {
        return diagnostic.message.includes("parameter 'expression' must be expression");
    }));
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
