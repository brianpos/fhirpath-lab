import assert from "node:assert/strict";
import test from "node:test";
import {buildLogicalTypeModels} from "../FmlCustomModels";
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

const validateReferenceIdentity = async (
    sourceTargetProfiles: string[],
    targetTargetProfiles: string[],
    rule: string,
): Promise<FmlValidatorResult<ParsedFml>> => {
    const sourceCanonical = "http://example.org/StructureDefinition/SourceRow";
    const targetCanonical = "http://example.org/StructureDefinition/TargetRow";
    return new FmlValidatorApi().validate({
        sourceText: `
uses '${sourceCanonical}' alias SourceRow as source
uses '${targetCanonical}' alias TargetRow as target
group Main(source src : SourceRow, target tgt : TargetRow) {
    ${rule}
}
`,
        defaultFhirVersion: "R5",
        profileBaseTypes: {
            [sourceCanonical]: "SourceRow",
            [targetCanonical]: "TargetRow",
        },
        customTypeModels: {
            SourceRow: {
                TypeName: "SourceRow",
                Elements: [{
                    ElementName: "subject",
                    Type: [{TypeName: "Reference", TargetProfile: sourceTargetProfiles}],
                }],
            },
            TargetRow: {
                TypeName: "TargetRow",
                Elements: [{
                    ElementName: "subject",
                    Type: [{TypeName: "Reference", TargetProfile: targetTargetProfiles}],
                }],
            },
        },
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

test("parses and validates simple batch identity fields", async () => {
    const result = await new FmlValidatorApi().validate({sourceText: `
uses 'http://hl7.org/fhir/5.0/StructureDefinition/Patient' alias Patient as source
uses 'http://hl7.org/fhir/5.0/StructureDefinition/Patient' alias PatientTarget as target
group Main(source src : Patient, target tgt : PatientTarget) {
    src -> tgt: id, active, gender;
    src -> tgt: maritalStatus, birthDate "Others";
}
`});

    assert.equal(result.status, "success", result.diagnostics.map(diagnostic => diagnostic.message).join("; "));
    if (result.status === "success") {
        assert.deepEqual(
            result.value.model.groups[0].rules[0].identityFields?.map(field => field.name),
            ["id", "active", "gender"],
        );
        assert.equal(result.value.model.groups[0].rules[1].name, "Others");
        assert.deepEqual(
            result.value.model.groups[0].rules[1].identityFields?.map(field => field.name),
            ["maritalStatus", "birthDate"],
        );
    }
});

test("reports invalid source and target children in simple batch identity rules", async () => {
    const result = await new FmlValidatorApi().validate({sourceText: `
uses 'http://hl7.org/fhir/5.0/StructureDefinition/Patient' alias Patient as source
uses 'http://hl7.org/fhir/5.0/StructureDefinition/Observation' alias Observation as target
group Main(source src : Patient, target tgt : Observation) {
    src -> tgt: active, status;
}
`});

    assert.equal(result.status, "success");
    const warnings = result.diagnostics.filter(diagnostic => diagnostic.severity === "warning");
    assert.ok(warnings.some(diagnostic => diagnostic.message.includes("Observation.active")));
    assert.ok(warnings.some(diagnostic => diagnostic.message.includes("Patient.status")));
});

test("rejects incompatible simple identity mappings without a default group", async () => {
    const result = await new FmlValidatorApi().validate({sourceText: `
uses 'http://hl7.org/fhir/5.0/StructureDefinition/Patient' alias Patient as source
uses 'http://hl7.org/fhir/5.0/StructureDefinition/Observation' alias Observation as target
group Main(source src : Patient, target tgt : Observation) {
    src.active -> tgt.status;
}
`});

    assert.equal(result.status, "failure");
    const diagnostic = result.diagnostics.find(candidate => candidate.message.includes("Identity assignment"));
    assert.equal(diagnostic?.severity, "error");
    assert.match(diagnostic?.message ?? "", /Patient\.active/);
    assert.match(diagnostic?.message ?? "", /Observation\.status/);
});

test("accepts a simple identity mapping through a local types group", async () => {
    const result = await new FmlValidatorApi().validate({sourceText: `
uses 'http://hl7.org/fhir/5.0/StructureDefinition/Patient' alias Patient as source
uses 'http://hl7.org/fhir/5.0/StructureDefinition/Observation' alias Observation as target
group Main(source src : Patient, target tgt : Observation) {
    src.active -> tgt.status;
}
group BooleanToCode(source src : boolean, target tgt : code) <<types>> {
    src -> tgt = cast(src, 'code');
}
`});

    assert.equal(result.status, "success", result.diagnostics.map(diagnostic => diagnostic.message).join("; "));
    assert.ok(result.diagnostics.every(diagnostic => !diagnostic.message.includes("Identity assignment")));
});

test("accepts a Reference identity when the target supports every source target profile", async () => {
    const result = await validateReferenceIdentity(
        ["http://hl7.org/fhir/StructureDefinition/Patient"],
        [
            "http://hl7.org/fhir/StructureDefinition/Patient",
            "http://hl7.org/fhir/StructureDefinition/Group",
        ],
        "src.subject -> tgt.subject;",
    );

    assert.equal(result.status, "success", result.diagnostics.map(diagnostic => diagnostic.message).join("; "));
});

test("accepts specific Reference profiles when the target supports Resource", async () => {
    const result = await validateReferenceIdentity(
        [
            "http://hl7.org/fhir/StructureDefinition/Patient",
            "http://hl7.org/fhir/StructureDefinition/Group",
        ],
        ["http://hl7.org/fhir/StructureDefinition/Resource"],
        "src.subject -> tgt.subject;",
    );

    assert.equal(result.status, "success", result.diagnostics.map(diagnostic => diagnostic.message).join("; "));
});

test("rejects a batch Reference identity and reports source target profiles missing from the target", async () => {
    const result = await validateReferenceIdentity(
        [
            "http://hl7.org/fhir/StructureDefinition/Patient",
            "http://hl7.org/fhir/StructureDefinition/Group",
        ],
        ["http://hl7.org/fhir/StructureDefinition/Patient"],
        "src -> tgt: subject;",
    );

    assert.equal(result.status, "failure");
    const diagnostic = result.diagnostics.find(candidate => candidate.message.includes("target profile"));
    assert.equal(diagnostic?.severity, "error");
    assert.equal(diagnostic?.offendingText, "subject");
    assert.match(diagnostic?.message ?? "", /does not support source Reference target profile\(s\): 'Group'/);
    assert.match(diagnostic?.message ?? "", /Supported target profiles: 'Patient'/);
    assert.doesNotMatch(diagnostic?.message ?? "", /http:\/\/hl7\.org\/fhir\/StructureDefinition\//);
});

test("retains non-core target profile canonicals in compatibility diagnostics", async () => {
    const customProfile = "http://example.org/fhir/StructureDefinition/CustomSubject";
    const result = await validateReferenceIdentity(
        [customProfile],
        ["http://hl7.org/fhir/StructureDefinition/Patient"],
        "src.subject -> tgt.subject;",
    );

    assert.equal(result.status, "failure");
    const diagnostic = result.diagnostics.find(candidate => candidate.message.includes("target profile"));
    assert.match(diagnostic?.message ?? "", /'CustomSubject' \(http:\/\/example\.org\/fhir\/StructureDefinition\/CustomSubject\)/);
    assert.doesNotMatch(diagnostic?.message ?? "", /Patient.*http:\/\/hl7\.org/);
});

test("validates Reference target profiles from generated core models", async () => {
    const validate = (sourceType: string, sourcePath: string, targetType: string, targetPath: string) => {
        return new FmlValidatorApi().validate({sourceText: `
uses 'http://hl7.org/fhir/5.0/StructureDefinition/${sourceType}' alias SourceType as source
uses 'http://hl7.org/fhir/5.0/StructureDefinition/${targetType}' alias TargetType as target
group Main(source src : SourceType, target tgt : TargetType) {
    src.${sourcePath} -> tgt.${targetPath};
}
`});
    };
    const narrowing = await validate("Appointment", "subject", "AllergyIntolerance", "patient");
    const widening = await validate("AllergyIntolerance", "patient", "Appointment", "subject");

    assert.equal(narrowing.status, "failure");
    assert.ok(narrowing.diagnostics.some(diagnostic => {
        return diagnostic.message.includes("does not support source Reference target profile(s): 'Group'")
            && !diagnostic.message.includes("http://hl7.org/fhir/StructureDefinition/");
    }));
    assert.equal(widening.status, "success", widening.diagnostics.map(diagnostic => diagnostic.message).join("; "));
});

test("uses cross-version primitive type+ groups for AppointmentResponse identities", async () => {
        const result = await new FmlValidatorApi().validate({sourceText: `
/// url = "http://hl7.org/fhir/uv/xver/StructureMap/AppointmentResponse3to4-tester"
/// name = "AppointmentResponse3to4"
/// title = "AppointmentResponse Transforms: R3 to R4"
/// status = "active"

uses "http://hl7.org/fhir/3.0/StructureDefinition/AppointmentResponse" alias AppointmentResponseR3 as source
uses "http://hl7.org/fhir/4.0/StructureDefinition/AppointmentResponse" alias AppointmentResponse as target

uses "http://hl7.org/fhir/3.0/StructureDefinition/string" alias stringR3 as source
uses "http://hl7.org/fhir/4.0/StructureDefinition/string" as target
uses "http://hl7.org/fhir/3.0/StructureDefinition/dateTime" alias dateTimeR3 as source
uses "http://hl7.org/fhir/4.0/StructureDefinition/dateTime" as target
uses "http://hl7.org/fhir/3.0/StructureDefinition/instant" alias instantR3 as source
uses "http://hl7.org/fhir/4.0/StructureDefinition/instant" as target

group AppointmentResponse(source src : AppointmentResponseR3, target tgt : AppointmentResponse) {
    src.start -> tgt.start;
    src.end -> tgt.end;
    src.actor -> tgt.actor;
    src.participantStatus -> tgt.participantStatus;
    src.comment -> tgt.comment;
}

group dateTime(source src : dateTimeR3, target tgt : dateTime) <<type+>> {
    src.value -> tgt.value "dateTime-value";
}

group instant(source src : instantR3, target tgt : instant) <<type+>> {
    src.value -> tgt.value;
}

group string(source src : stringR3, target tgt : string) <<type+>> {
    src.value -> tgt.value;
}
`});

        const identityDiagnostics = result.diagnostics.filter(diagnostic => {
                return diagnostic.message.includes("Identity assignment");
        });
        assert.deepEqual(
                identityDiagnostics.map(diagnostic => diagnostic.offendingText),
                ["actor", "participantStatus"],
        );
});

test("does not validate a multi-target variable rule as a simple identity", async () => {
    const result = await new FmlValidatorApi().validate({sourceText: `
uses 'http://hl7.org/fhir/5.0/StructureDefinition/QuestionnaireResponse' alias QuestionnaireResponse as source
uses 'http://hl7.org/fhir/5.0/StructureDefinition/Observation' alias Observation as target
group Main(source src : QuestionnaireResponse, target tgt : Observation) {
    src.id -> tgt.derivedFrom as df, df.reference = ('QuestionnaireResponse/' & src.id) "SetDerivedFrom";
}
`});

    assert.equal(result.status, "success", result.diagnostics.map(diagnostic => diagnostic.message).join("; "));
    assert.ok(result.diagnostics.every(diagnostic => !diagnostic.message.includes("Identity assignment")));
});

test("validates every field in a simple batch identity mapping", async () => {
    const sourceCanonical = "http://example.org/StructureDefinition/SourceRow";
    const targetCanonical = "http://example.org/StructureDefinition/TargetRow";
    const customTypeModels = buildLogicalTypeModels([{
        resourceType: "StructureDefinition",
        url: sourceCanonical,
        name: "SourceRow",
        type: sourceCanonical,
        kind: "logical",
        derivation: "specialization",
        differential: {element: [
            {id: "SourceRow", path: "SourceRow"},
            {id: "SourceRow.type", path: "SourceRow.type", type: [{code: "string"}]},
            {id: "SourceRow.action", path: "SourceRow.action", type: [{code: "string"}]},
        ]},
    }, {
        resourceType: "StructureDefinition",
        url: targetCanonical,
        name: "TargetRow",
        type: targetCanonical,
        kind: "logical",
        derivation: "specialization",
        differential: {element: [
            {id: "TargetRow", path: "TargetRow"},
            {id: "TargetRow.type", path: "TargetRow.type", type: [{code: "string"}]},
            {id: "TargetRow.action", path: "TargetRow.action", type: [{code: "CodeableConcept"}]},
        ]},
    }], "R5");
    const sourceText = `
uses '${sourceCanonical}' alias SourceRow as source
uses '${targetCanonical}' alias TargetRow as target
group Main(source src : SourceRow, target tgt : TargetRow) {
    src -> tgt: type, action;
}
`;
    const result = await new FmlValidatorApi().validate({
        sourceText,
        defaultFhirVersion: "R5",
        profileBaseTypes: {
            [sourceCanonical]: sourceCanonical,
            [targetCanonical]: targetCanonical,
        },
        customTypeModels,
    });
    const convertedResult = await new FmlValidatorApi().validate({
        sourceText: `${sourceText}
group StringToCodeableConcept(source src : string, target tgt : CodeableConcept) <<types>> {
}
`,
        defaultFhirVersion: "R5",
        profileBaseTypes: {
            [sourceCanonical]: sourceCanonical,
            [targetCanonical]: targetCanonical,
        },
        customTypeModels,
    });

    assert.equal(result.status, "failure");
    const diagnostics = result.diagnostics.filter(candidate => candidate.message.includes("Identity assignment"));
    assert.equal(diagnostics.length, 1);
    assert.match(diagnostics[0].message, /SourceRow\.action/);
    assert.match(diagnostics[0].message, /TargetRow\.action/);
    assert.equal(
        convertedResult.status,
        "success",
        convertedResult.diagnostics.map(diagnostic => diagnostic.message).join("; "),
    );
});

test("compiles simple batch identity fields into nested copy rules", async () => {
    const result = await new FmlValidatorApi().compile({sourceText: `
uses 'http://hl7.org/fhir/5.0/StructureDefinition/Patient' alias Patient as source
uses 'http://hl7.org/fhir/5.0/StructureDefinition/Patient' alias PatientTarget as target
group Main(source src : Patient, target tgt : PatientTarget) {
    src -> tgt: id, active, gender "Demographics";
}
`});

    assert.equal(result.status, "success", result.diagnostics.map(diagnostic => diagnostic.message).join("; "));
    if (result.status === "success") {
        const rule = result.value.resource.group?.[0].rule[0];
        assert.equal(rule?.name, "Demographics");
        assert.deepEqual(rule?.rule?.map(child => child.source[0].element), ["id", "active", "gender"]);
        assert.deepEqual(rule?.rule?.map(child => child.target?.[0].element), ["id", "active", "gender"]);
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
    const result = await new FmlValidatorApi().validate({sourceText: `
group example(source src, target tgt) {
    src as source_value -> tgt.value = truncate(source_value, 5);
}
`});

    assert.equal(result.status, "success");
    assert.deepEqual(result.diagnostics.filter(diagnostic => diagnostic.severity !== "information"), []);
});

test("treats delimited aliases as variable references", async () => {
    const result = await new FmlValidatorApi().validate({sourceText: `
group example(source src, target tgt) {
    src as ` + "`source-value`" + ` -> tgt.value = truncate(` + "`source-value`" + `, 5);
}
`});

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

test("keeps sibling choice type filters independent", async () => {
    const result = await new FmlValidatorApi().validate({sourceText: `
uses 'http://hl7.org/fhir/5.0/StructureDefinition/Observation' alias Observation as source
group Main(source src : Observation, target tgt : Observation) {
    src.effective : dateTime as dateTimeValue -> tgt.effective = dateTimeValue;
    src.effective : instant as instantValue -> tgt.effective = cast(instantValue, 'dateTime');
    src.effective : Period as periodValue then {
        periodValue.start -> tgt.effective;
    };
    src.value : Quantity as quantityValue then {
        quantityValue.value -> tgt.value;
    };
    src.value : CodeableConcept as codedValue then {
        codedValue.coding -> tgt.value;
    };
    src.value : string as stringValue -> tgt.value = stringValue;
}
`});

    assert.equal(result.status, "success", result.diagnostics.map(diagnostic => diagnostic.message).join("; "));
    assert.ok(result.diagnostics.every(diagnostic => {
        return !diagnostic.message.includes("No choice type supports all referenced child paths");
    }));
});

test("keeps repeated target choice create types independent", async () => {
    const sourceText = `
uses 'http://hl7.org/fhir/3.0/StructureDefinition/ClinicalImpression' alias ClinicalImpressionR3 as source
uses 'http://hl7.org/fhir/4.0/StructureDefinition/ClinicalImpression' alias ClinicalImpression as target
group Main(source src : ClinicalImpressionR3, target tgt : ClinicalImpression) {
    src.effective : dateTime as vs -> tgt.effective = create('dateTime') as vt then dateTime(vs, vt);
    src.effective : Period as vs -> tgt.effective = create('Period') as vt then Period(vs, vt);
}
`;
    const api = new FmlValidatorApi();
    const result = await api.validate({sourceText});
    const targets = api.getPropertyUsages({sourceText})
        .filter(usage => usage.role === "target" && usage.path === "effective");

    assert.equal(result.status, "success", result.diagnostics.map(diagnostic => diagnostic.message).join("; "));
    assert.deepEqual(targets.map(usage => usage.compatibleTypeNames), [["dateTime"], ["Period"]]);
    assert.deepEqual(targets.map(usage => usage.elementTypeName), ["dateTime", "Period"]);
});

test("reports a type filter that is not available on a choice property", async () => {
    const result = await new FmlValidatorApi().validate({sourceText: `
uses 'http://hl7.org/fhir/5.0/StructureDefinition/Observation' alias Observation as source
group Main(source src : Observation, target tgt : Observation) {
    src.value : Patient as invalid -> tgt.value;
}
`});

    assert.equal(result.status, "success");
    const warning = result.diagnostics.find(diagnostic => diagnostic.message.includes('Type filter "Patient" is not allowed'));
    assert.equal(warning?.severity, "warning");
    assert.match(warning?.message ?? "", /CodeableConcept/);
    assert.match(warning?.message ?? "", /Quantity/);
});

test("accepts derived Resource filters and narrows the rule variable", async () => {
    const result = await new FmlValidatorApi().validate({sourceText: `
uses 'http://hl7.org/fhir/5.0/StructureDefinition/Bundle' alias Bundle as source
uses 'http://hl7.org/fhir/5.0/StructureDefinition/Patient' alias Patient as target
group Main(source src : Bundle, target tgt : Patient) {
    src.entry.resource : Patient as patient -> tgt.active = (patient.active);
}
`});

    assert.equal(result.status, "success", result.diagnostics.map(diagnostic => diagnostic.message).join("; "));
    assert.ok(result.diagnostics.every(diagnostic => {
        return !diagnostic.message.includes('Type filter "Patient" is not allowed')
            && !diagnostic.message.startsWith("FHIRPath:");
    }));
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

test("rejects undefined variables in direct assignments", async () => {
    const result = await new FmlValidatorApi().validate({sourceText: `
uses 'http://hl7.org/fhir/5.0/StructureDefinition/Patient' alias Patient as source
group Main(source src : Patient, target tgt : Patient) {
    src.id as sourceId -> tgt.id = missing;
}
`});

    assert.equal(result.status, "failure");
    const diagnostic = result.diagnostics.find(candidate => candidate.message.includes("Variable 'missing'"));
    assert.match(diagnostic?.message ?? "", /transform 'copy'/);
    assert.equal(diagnostic?.line, 4);
});

test("rejects undefined source variables passed to cast and translate", async () => {
    const result = await new FmlValidatorApi().validate({sourceText: `
uses 'http://hl7.org/fhir/5.0/StructureDefinition/Observation' alias Observation as source
group Main(source src : Observation, target tgt : Observation) {
    src.effective -> tgt.effective = cast(missingCast, 'dateTime');
    src.status -> tgt.status = translate(missingTranslate, 'http://example.org/ConceptMap/status', 'code');
}
`});

    assert.equal(result.status, "failure");
    assert.ok(result.diagnostics.some(candidate => candidate.message.includes("Variable 'missingCast'")
        && candidate.message.includes("transform 'cast'")));
    assert.ok(result.diagnostics.some(candidate => candidate.message.includes("Variable 'missingTranslate'")
        && candidate.message.includes("transform 'translate'")));
});

test("warns about incompatible direct variable assignments", async () => {
    const result = await new FmlValidatorApi().validate({sourceText: `
uses 'http://hl7.org/fhir/5.0/StructureDefinition/Patient' alias Patient as source
uses 'http://hl7.org/fhir/5.0/StructureDefinition/Observation' alias Observation as target
group Main(source src : Patient, target tgt : Observation) {
    src.active as active -> tgt.status = active;
}
`});

    assert.equal(result.status, "success");
    const diagnostic = result.diagnostics.find(candidate => candidate.message.includes("not compatible")
        && candidate.message.includes("Observation.status"));
    assert.equal(diagnostic?.severity, "warning");
    assert.match(diagnostic?.message ?? "", /boolean/);
    assert.match(diagnostic?.message ?? "", /allowed: code/);
});

test("accepts incompatible direct variable assignments through a local types group", async () => {
    const result = await new FmlValidatorApi().validate({sourceText: `
uses 'http://hl7.org/fhir/5.0/StructureDefinition/Patient' alias Patient as source
uses 'http://hl7.org/fhir/5.0/StructureDefinition/Observation' alias Observation as target
group Main(source src : Patient, target tgt : Observation) {
    src.active as active -> tgt.status = active;
}
group BooleanToCode(source src : boolean, target tgt : code) <<types>> {
}
`});

    assert.equal(result.status, "success", result.diagnostics.map(diagnostic => diagnostic.message).join("; "));
    assert.ok(result.diagnostics.every(diagnostic => !diagnostic.message.includes("not compatible")));
});

test("accepts incompatible direct variable assignments through an imported types group", async () => {
    const result = await new FmlValidatorApi().validate({
        sourceText: `
uses 'http://hl7.org/fhir/5.0/StructureDefinition/Patient' alias Patient as source
uses 'http://hl7.org/fhir/5.0/StructureDefinition/Observation' alias Observation as target
imports 'http://example.org/StructureMap/Conversions'
group Main(source src : Patient, target tgt : Observation) {
    src.active as active -> tgt.status = active;
}
`,
        importedDefaultGroups: [{
            groupName: "BooleanToCode",
            typeMode: "types",
            sourceTypeName: "boolean",
            targetTypeName: "code",
            sourceFhirVersion: "R5",
            targetFhirVersion: "R5",
        }],
    });

    assert.equal(result.status, "success", result.diagnostics.map(diagnostic => diagnostic.message).join("; "));
    assert.ok(result.diagnostics.every(diagnostic => !diagnostic.message.includes("not compatible")));
});

test("requires type+ for a copy transform to select an unfixed choice target type", async () => {
    const sourceText = (mode: "types" | "type+") => `
uses 'http://hl7.org/fhir/5.0/StructureDefinition/Patient' alias Patient as source
uses 'http://hl7.org/fhir/5.0/StructureDefinition/Observation' alias Observation as target
group Main(source src : Patient, target tgt : Observation) {
    src.name as name -> tgt.value = name;
}
group NameToString(source src : HumanName, target tgt : string) <<${mode}>> {
}
`;
    const typesResult = await new FmlValidatorApi().validate({sourceText: sourceText("types")});
    const typePlusResult = await new FmlValidatorApi().validate({sourceText: sourceText("type+")});

    assert.ok(typesResult.diagnostics.some(diagnostic => {
        return diagnostic.severity === "warning" && diagnostic.message.includes("not compatible");
    }));
    assert.equal(typePlusResult.status, "success", typePlusResult.diagnostics.map(diagnostic => diagnostic.message).join("; "));
    assert.ok(typePlusResult.diagnostics.every(diagnostic => !diagnostic.message.includes("not compatible")));
});

test("uses versioned default groups for cross-version copy transforms", async () => {
    const mapping = `
uses 'http://hl7.org/fhir/3.0/StructureDefinition/Condition' alias ConditionSTU3 as source
uses 'http://hl7.org/fhir/4.0/StructureDefinition/Condition' alias ConditionR4 as target
uses 'http://hl7.org/fhir/3.0/StructureDefinition/dateTime' alias dateTimeSTU3 as source
uses 'http://hl7.org/fhir/4.0/StructureDefinition/dateTime' as target
group Main(source src : ConditionSTU3, target tgt : ConditionR4) {
    src.assertedDate as assertedDate -> tgt.recordedDate = assertedDate;
}
`;
    const api = new FmlValidatorApi();
    const withoutDefaultGroup = await api.validate({sourceText: mapping});
    const withDefaultGroup = await api.validate({sourceText: `${mapping}
group DateTime3To4(source src : dateTimeSTU3, target tgt : dateTime) <<types>> {
}
`});

    assert.ok(withoutDefaultGroup.diagnostics.some(diagnostic => {
        return diagnostic.severity === "warning" && diagnostic.message.includes("not compatible");
    }));
    assert.equal(
        withDefaultGroup.status,
        "success",
        withDefaultGroup.diagnostics.map(diagnostic => diagnostic.message).join("; "),
    );
    assert.ok(withDefaultGroup.diagnostics.every(diagnostic => !diagnostic.message.includes("not compatible")));
});

test("requires type+ when selecting an incompatible choice target type", async () => {
    const sourceText = (mode: "types" | "type+") => `
uses 'http://hl7.org/fhir/5.0/StructureDefinition/Patient' alias Patient as source
uses 'http://hl7.org/fhir/5.0/StructureDefinition/Observation' alias Observation as target
group Main(source src : Patient, target tgt : Observation) {
    src.name -> tgt.value;
}
group NameToString(source src : HumanName, target tgt : string) <<${mode}>> {
    src -> tgt = cast(src, 'string');
}
`;
    const typesResult = await new FmlValidatorApi().validate({sourceText: sourceText("types")});
    const typePlusResult = await new FmlValidatorApi().validate({sourceText: sourceText("type+")});

    assert.equal(typesResult.status, "failure");
    assert.ok(typesResult.diagnostics.some(diagnostic => diagnostic.message.includes("not compatible")));
    assert.equal(typePlusResult.status, "success", typePlusResult.diagnostics.map(diagnostic => diagnostic.message).join("; "));
});

test("uses the local logical model name in assignment diagnostics", async () => {
    const canonical = "http://hl7.org/fhir/uv/omop/StructureDefinition/ProcedureOccurrence";
    const customTypeModels = buildLogicalTypeModels([{
        resourceType: "StructureDefinition",
        url: canonical,
        name: "ProcedureOccurrence",
        type: canonical,
        kind: "logical",
        derivation: "specialization",
        differential: {element: [
            {id: "ProcedureOccurrence", path: "ProcedureOccurrence"},
            {id: "ProcedureOccurrence.procedure-date", path: "ProcedureOccurrence.procedure_date", type: [{code: "date"}]},
        ]},
    }], "R5");
    const result = await new FmlValidatorApi().validate({
        sourceText: `
uses 'http://hl7.org/fhir/5.0/StructureDefinition/Patient' alias Patient as source
uses '${canonical}' alias ProcedureTable as target
group Main(source src : Patient, target tgt : ProcedureTable) {
    src.active as active -> tgt.procedure_date = active;
}
`,
        defaultFhirVersion: "R5",
        profileBaseTypes: {[canonical]: canonical},
        customTypeModels,
    });

    assert.equal(result.status, "success");
    const diagnostic = result.diagnostics.find(candidate => candidate.message.includes("not compatible"));
    assert.equal(diagnostic?.severity, "warning");
    assert.match(diagnostic?.message ?? "", /ProcedureOccurrence\.procedure_date/);
    assert.doesNotMatch(diagnostic?.message ?? "", /http:\/\//);
});

test("uses cast result types when validating target compatibility", async () => {
    const compatible = await new FmlValidatorApi().validate({sourceText: `
uses 'http://hl7.org/fhir/5.0/StructureDefinition/Patient' alias Patient as source
uses 'http://hl7.org/fhir/5.0/StructureDefinition/Observation' alias Observation as target
group Main(source src : Patient, target tgt : Observation) {
    src.birthDate as birthDate -> tgt.effective = cast(birthDate, 'dateTime');
}
`});
    const incompatible = await new FmlValidatorApi().validate({sourceText: `
uses 'http://hl7.org/fhir/5.0/StructureDefinition/Patient' alias Patient as source
uses 'http://hl7.org/fhir/5.0/StructureDefinition/Observation' alias Observation as target
group Main(source src : Patient, target tgt : Observation) {
    src.birthDate as birthDate -> tgt.effective = cast(birthDate, 'Patient');
}
`});

    assert.equal(compatible.status, "success", compatible.diagnostics.map(diagnostic => diagnostic.message).join("; "));
    assert.equal(incompatible.status, "failure");
    assert.ok(incompatible.diagnostics.some(candidate => candidate.message.includes("Transform 'cast' result type 'Patient'")
        && candidate.message.includes("Observation.effective")));
});

test("accepts compatible direct assignments and inherited aliases in nested rules", async () => {
    const result = await new FmlValidatorApi().validate({sourceText: `
uses 'http://hl7.org/fhir/5.0/StructureDefinition/Patient' alias Patient as source
group Main(source src : Patient, target tgt : Patient) {
    src.id as sourceId -> tgt then {
        src -> tgt.id = sourceId;
    };
}
`});

    assert.equal(result.status, "success", result.diagnostics.map(diagnostic => diagnostic.message).join("; "));
    assert.ok(result.diagnostics.every(candidate => !candidate.message.includes("not defined")));
    assert.ok(result.diagnostics.every(candidate => !candidate.message.includes("not compatible")));
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

test("resolves a profile uses canonical to its cached base resource type", async () => {
    const profileUrl = "http://example.org/fhir/StructureDefinition/CustomPractitioner";
    const result = await new FmlValidatorApi().validate({
        sourceText: `
uses '${profileUrl}' alias CustomPractitioner as source
group Main(source src : CustomPractitioner, target tgt) {
    src.name -> tgt.name;
}
`,
        defaultFhirVersion: "R4",
        profileBaseTypes: {[profileUrl]: "Practitioner"},
    });

    assert.equal(result.status, "success", result.diagnostics.map(diagnostic => diagnostic.message).join("; "));
    const usages = new FmlValidatorApi().getPropertyUsages({
        sourceText: `
uses '${profileUrl}' alias CustomPractitioner as source
group Main(source src : CustomPractitioner, target tgt) {
    src.name -> tgt.name;
}
`,
        defaultFhirVersion: "R4",
        profileBaseTypes: {[profileUrl]: "Practitioner"},
    });
    assert.equal(usages.find(usage => usage.role === "source")?.rootTypeName, "Practitioner");
});

test("validates and completes properties from a logical model", async () => {
    const canonical = "http://example.org/StructureDefinition/ClaimRow";
    const customTypeModels = {
        ClaimRow: {
            TypeName: "ClaimRow",
            Elements: [{
                ElementName: "claimNumber",
                Type: [{TypeName: "string"}],
                Required: true,
            }],
        },
    };
    const sourceText = [
        `uses '${canonical}' alias ClaimRow as source`,
        "group Main(source src : ClaimRow, target tgt) {",
        "    src.claimNumber -> tgt.id;",
        "}",
    ].join("\n");
    const source = {
        sourceText,
        defaultFhirVersion: "R4" as const,
        profileBaseTypes: {[canonical]: "ClaimRow"},
        customTypeModels,
    };

    const result = await new FmlValidatorApi().validate(source);
    const usages = new FmlValidatorApi().getPropertyUsages(source);
    const completionOffset = sourceText.indexOf("claimNumber") + 2;
    const completions = new FmlValidatorApi().getPropertyCompletions({
        ...source,
        sourceText: sourceText.replace("claimNumber", "cl"),
    }, completionOffset);

    assert.equal(result.status, "success", result.diagnostics.map(diagnostic => diagnostic.message).join("; "));
    assert.equal(usages.find(usage => usage.role === "source")?.rootTypeName, "ClaimRow");
    assert.ok(completions.some(completion => completion.name === "claimNumber"));
});

test("classifies recovered source, target, and transform completion contexts", () => {
    const sourceText = [
        "uses 'http://hl7.org/fhir/5.0/StructureDefinition/Patient' alias Patient as source",
        "group Main(source src : Patient, target tgt : Patient) {",
        "    src.na -> tgt.na;",
        "}",
    ].join("\n");
    const validator = new FmlValidatorApi();
    const contextAt = (token: string) => validator.getCompletionContext(
        {sourceText},
        sourceText.indexOf(token) + token.length,
    );

    assert.equal(contextAt("src.na")?.kind, "source-property");
    assert.equal(contextAt("tgt.na")?.kind, "target-property");

    const transformText = "group Main(source src, target tgt) { src -> tgt.id = tr";
    const transformContext = validator.getCompletionContext({sourceText: transformText}, transformText.length);
    assert.equal(transformContext?.kind, "transform");
    assert.equal(transformContext?.partial, "tr");
});

test("converts logical StructureDefinitions and nested elements into TypeModels", () => {
    const canonical = "http://example.org/StructureDefinition/ClaimRow";
    const models = buildLogicalTypeModels([{
        resourceType: "StructureDefinition",
        url: canonical,
        name: "ClaimRow",
        type: "ClaimRow",
        kind: "logical",
        derivation: "specialization",
        differential: {element: [
            {id: "ClaimRow", path: "ClaimRow"},
            {id: "ClaimRow.detail", path: "ClaimRow.detail", type: [{code: "Element"}], max: "*"},
            {id: "ClaimRow.detail.code", path: "ClaimRow.detail.code", type: [{code: "string"}]},
        ]},
    }], "R4");

    assert.equal(models[canonical].Elements[0].ElementName, "detail");
    assert.equal(models[canonical].Elements[0].Type[0].TypeName, "claimrow_detail");
    assert.equal(models.claimrow_detail.Elements[0].ElementName, "code");
});

test("validates logical models whose declared type is a canonical URL", async () => {
    const canonical = "http://hl7.org/fhir/uv/omop/StructureDefinition/ConditionOccurrence";
    const models = buildLogicalTypeModels([{
        resourceType: "StructureDefinition",
        url: canonical,
        version: "2.0.0-ballot",
        name: "ConditionOccurrence",
        type: canonical,
        kind: "logical",
        derivation: "specialization",
        differential: {element: [
            {id: "ConditionOccurrence", path: "ConditionOccurrence"},
            {
                id: "ConditionOccurrence.condition-source-value",
                path: "ConditionOccurrence.condition_source_value",
                min: 1,
                max: "1",
                type: [{code: "string"}],
            },
        ]},
    }], "R5");

    assert.equal(models.ConditionOccurrence, undefined);
    assert.equal(models[canonical].Elements[0].ElementName, "condition_source_value");
    assert.equal(models[canonical].TypeName, "ConditionOccurrence");
    assert.equal(models[canonical].CanonicalUrl, canonical);
    assert.equal(models[canonical].Version, "2.0.0-ballot");

    const sourceText = [
        "uses 'http://hl7.org/fhir/StructureDefinition/Condition' alias Condition as source",
        `uses '${canonical}' alias ConOccTable as target`,
        "group Main(source src : Condition, target tgt : ConOccTable) {",
        "    src.id as id -> tgt.condition_source_value = id;",
        "}",
    ].join("\n");
    const request = {
        sourceText,
        defaultFhirVersion: "R5" as const,
        profileBaseTypes: {[canonical]: canonical},
        customTypeModels: models,
    };
    const result = await new FmlValidatorApi().validate(request);
    const targetUsage = new FmlValidatorApi().getPropertyUsages(request)
        .find(usage => usage.role === "target");

    assert.equal(result.status, "success", result.diagnostics.map(diagnostic => diagnostic.message).join("; "));
    assert.equal(targetUsage?.path, "condition_source_value");
    assert.equal(targetUsage?.elementTypeName, "string");
    assert.equal(targetUsage?.unknownElement, undefined);
});

test("keeps a core source context when a logical model has the same local type name", async () => {
    const logicalObservationCanonical = "http://example.org/StructureDefinition/Observation";
    const measurementCanonical = "http://example.org/StructureDefinition/Measurement";
    const customTypeModels = buildLogicalTypeModels([{
        resourceType: "StructureDefinition",
        url: logicalObservationCanonical,
        version: "1.0.0",
        name: "Observation",
        type: logicalObservationCanonical,
        kind: "logical",
        derivation: "specialization",
        differential: {element: [
            {id: "Observation", path: "Observation"},
            {id: "Observation.observation-id", path: "Observation.observation_id", type: [{code: "integer"}]},
        ]},
    }, {
        resourceType: "StructureDefinition",
        url: measurementCanonical,
        version: "1.0.0",
        name: "Measurement",
        type: measurementCanonical,
        kind: "logical",
        derivation: "specialization",
        differential: {element: [
            {id: "Measurement", path: "Measurement"},
            {id: "Measurement.source-id", path: "Measurement.source_id", type: [{code: "string"}]},
        ]},
    }], "R5");
    const sourceText = [
        "uses 'http://hl7.org/fhir/StructureDefinition/Observation' alias Observation as source",
        `uses '${measurementCanonical}' alias MeasureTable as target`,
        "group Main(source src : Observation, target tgt : MeasureTable) {",
        "    src where (category.exists()) then {",
        "        src.id as id -> tgt.source_id = id;",
        "    };",
        "}",
    ].join("\n");
    const request = {
        sourceText,
        defaultFhirVersion: "R5" as const,
        profileBaseTypes: {[measurementCanonical]: measurementCanonical},
        customTypeModels,
    };
    const api = new FmlValidatorApi();
    const result = await api.validate(request);
    const usages = api.getPropertyUsages(request);
    const sourceId = usages.find(usage => usage.role === "source" && usage.path === "id");
    const targetId = usages.find(usage => usage.role === "target" && usage.path === "source_id");

    assert.equal(result.status, "success", result.diagnostics.map(diagnostic => diagnostic.message).join("; "));
    assert.equal(sourceId?.rootTypeName, "Observation");
    assert.equal(sourceId?.elementTypeName, "id");
    assert.equal(sourceId?.unknownElement, undefined);
    assert.equal(targetId?.elementTypeName, "string");
    assert.equal(targetId?.unknownElement, undefined);
});

test("validates FHIRPath expressions against a logical model", async () => {
    const canonical = "http://example.org/StructureDefinition/ClaimRow";
    const result = await new FmlValidatorApi().validate({
        sourceText: [
            `uses '${canonical}' alias ClaimRow as source`,
            "group Main(source src : ClaimRow, target tgt) {",
            "    src as row where (claimNumber.exists()) -> tgt;",
            "}",
        ].join("\n"),
        defaultFhirVersion: "R4",
        profileBaseTypes: {[canonical]: "ClaimRow"},
        customTypeModels: {
            ClaimRow: {
                TypeName: "ClaimRow",
                Elements: [{ElementName: "claimNumber", Type: [{TypeName: "string"}]}],
            },
        },
    });

    assert.equal(result.status, "success", result.diagnostics.map(diagnostic => diagnostic.message).join("; "));
    assert.ok(result.diagnostics.every(diagnostic => !diagnostic.message.includes("claimNumber")));
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

test("reports declared group parameter mismatches on the call argument", async () => {
    const sourceText = [
        "uses 'http://hl7.org/fhir/5.0/StructureDefinition/Observation' alias Observation as source",
        "group Main(source src : Observation, target tgt : Observation) {",
        "    src.code as concept -> tgt.code then CopyCoding(concept, tgt.code);",
        "}",
        "group CopyCoding(source src : Coding, target tgt : CodeableConcept) {",
        "}",
    ].join("\n");
    const result = await new FmlValidatorApi().validate({sourceText});

    assert.equal(result.status, "failure");
    const mismatch = result.diagnostics.find(diagnostic => {
        return diagnostic.message.includes("Group 'CopyCoding' parameter 'src'");
    });
    assert.equal(mismatch?.severity, "error");
    assert.equal(mismatch?.line, 3);
    assert.equal(mismatch?.offendingText, "concept");
    assert.ok(result.diagnostics.every(diagnostic => {
        return !diagnostic.message.includes("Conflicting contextual types for group input 'CopyCoding.src'");
    }));
});

test("reports parameter mismatches for dependent groups from imported maps", async () => {
    const sourceText = `
uses 'http://hl7.org/fhir/5.0/StructureDefinition/Observation' alias Observation as source
imports 'http://example.org/StructureMap/Shared'
group Main(source src : Observation, target tgt : Observation) {
    src.code as concept -> tgt then CopyCoding(concept, tgt);
}
`;
    const importedGroupSignatures = [{
        groupName: "CopyCoding",
        parameters: [
            {
                name: "src",
                mode: "source" as const,
                typeName: "Coding",
                fhirVersion: "R5" as const,
                resolution: "declared" as const,
            },
            {
                name: "tgt",
                mode: "target" as const,
                typeName: "Observation",
                fhirVersion: "R5" as const,
                resolution: "declared" as const,
            },
        ],
    }];
    const api = new FmlValidatorApi();
    const result = await api.validate({sourceText, importedGroupSignatures});
    const arityResult = await api.validate({
        sourceText: sourceText.replace("CopyCoding(concept, tgt)", "CopyCoding(concept)"),
        importedGroupSignatures,
    });

    assert.equal(result.status, "failure");
    const mismatch = result.diagnostics.find(diagnostic => {
        return diagnostic.message.includes("Group 'CopyCoding' parameter 'src'");
    });
    assert.equal(mismatch?.line, 5);
    assert.equal(mismatch?.offendingText, "concept");
    assert.match(mismatch?.message ?? "", /expects 'Coding'/);
    assert.match(mismatch?.message ?? "", /CodeableConcept/);
    assert.ok(arityResult.diagnostics.some(diagnostic => {
        return diagnostic.message.includes("Group 'CopyCoding' expects 2 parameter(s), but received 1");
    }));
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

test("resolves STU3 source properties against the STU3 model", async () => {
    const mapping = [
        "uses 'http://hl7.org/fhir/3.0/StructureDefinition/Condition' alias ConditionSTU3 as source",
        "uses 'http://hl7.org/fhir/4.0/StructureDefinition/Condition' alias ConditionR4 as target",
        "group Main(source src : ConditionSTU3, target tgt : ConditionR4) {",
        "    src.assertedDate -> tgt.recordedDate;",
        "}",
    ];
    const sourceText = [
        ...mapping,
        "group DateTimeSTU3ToR4(source src : dateTime, target tgt : dateTime) <<types>> {",
        "}",
    ].join("\n");
    const api = new FmlValidatorApi();
    const withoutDefaultGroup = await api.validate({sourceText: mapping.join("\n")});
    const result = await api.validate({sourceText});
    const usages = api.getPropertyUsages({sourceText}).filter(usage => {
        return usage.path === "assertedDate" || usage.path === "recordedDate";
    });

    assert.equal(withoutDefaultGroup.status, "failure");
    assert.ok(withoutDefaultGroup.diagnostics.some(diagnostic => {
        return diagnostic.message.includes("Identity assignment")
            && diagnostic.message.includes("dateTime");
    }));
    assert.equal(result.status, "success", result.diagnostics.map(diagnostic => diagnostic.message).join("; "));
    assert.deepEqual(usages.map(usage => [usage.path, usage.fhirVersion]), [
        ["assertedDate", "STU3"],
        ["recordedDate", "R4"],
    ]);
    assert.ok(usages.every(usage => !usage.unknownElement));
});

test("retains narrowed alias types for FHIRPath in dependent groups", async () => {
    const sourceText = [
        "uses 'http://hl7.org/fhir/5.0/StructureDefinition/Observation' alias Observation as source",
        "uses 'http://hl7.org/fhir/5.0/StructureDefinition/Observation' alias ObservationTarget as target",
        "group Main(source src : Observation, target tgt : ObservationTarget) {",
        "    src as parent -> tgt then Child(parent, tgt);",
        "}",
        "group Child(source src : Observation, target tgt) {",
        "    src.effective : dateTime as edt -> tgt.effective = (edt.toString().substring(0, 10));",
        "}",
    ].join("\n");
    const api = new FmlValidatorApi();
    const result = await api.validate({sourceText});
    const usages = api.getPropertyUsages({sourceText}).filter(usage => {
        return usage.path === "effective" && usage.variableName === "edt";
    });

    assert.equal(result.status, "success", result.diagnostics.map(diagnostic => diagnostic.message).join("; "));
    assert.deepEqual(usages.map(usage => usage.groupName).sort(), ["Child", "Main"]);
    assert.equal(usages.find(usage => usage.groupName === "Child")?.elementTypeName, "dateTime");
    assert.ok(result.diagnostics.every(diagnostic => !diagnostic.message.startsWith("FHIRPath:")));
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
group CodeableConceptR4BToR5(source src : CodeableConcept, target tgt : CodeableConcept) <<types>> {
}
`});

        assert.equal(result.status, "success", result.diagnostics.map(diagnostic => diagnostic.message).join("; "));
        assert.ok(result.diagnostics.every(diagnostic => !diagnostic.message.includes("could not be resolved")));
});

test("resolves uuid results as string parameters in dependent groups", async () => {
        const result = await new FmlValidatorApi().validate({sourceText: `
uses 'http://hl7.org/fhir/StructureDefinition/QuestionnaireResponse' as source
uses 'http://hl7.org/fhir/StructureDefinition/Bundle' as target
group Root(source src : QuestionnaireResponse, target tgt : Bundle) {
    src -> tgt.entry as entry, uuid() as fullUrl then PopulateBundleEntry(src, entry, fullUrl);
}
group PopulateBundleEntry(source src : QuestionnaireResponse, target entry, source fullUrl) {
    fullUrl -> entry.fullUrl = fullUrl;
}
`});

        assert.equal(result.status, "success", result.diagnostics.map(diagnostic => diagnostic.message).join("; "));
        assert.ok(result.diagnostics.every(diagnostic => {
                return !diagnostic.message.includes("PopulateBundleEntry.fullUrl");
        }));
});
