import assert from "node:assert/strict";
import test from "node:test";
import {
    childPath,
    createFmlTypedValue,
    formatDebugType,
    parseFmlTypedValue,
} from "../FmlTypedValue";

test("creates a complete temporary type map for resources and primitives", () => {
    const typed = createFmlTypedValue({
        resourceType: "Patient",
        active: true,
        score: 2.5,
        name: [{family: "Smith"}],
    });

    assert.deepEqual(typed.types["$"], {name: "Patient", namespace: "FHIR"});
    assert.deepEqual(typed.types["$.active"], {name: "boolean"});
    assert.deepEqual(typed.types["$.score"], {name: "decimal"});
    assert.deepEqual(typed.types["$.name"], {name: "object", collection: true});
    assert.deepEqual(typed.types["$.name[0]"], {name: "object"});
    assert.deepEqual(typed.types["$.name[0].family"], {name: "string"});
});

test("API-supplied types override generated fallback metadata", () => {
    const typed = parseFmlTypedValue({
        value: {
            name: [{family: "Smith"}],
        },
        types: {
            "$": {name: "LogicalPatient", namespace: "http://example.org"},
            "$.name": {name: "HumanName", collection: true},
            "$.name[0]": {name: "HumanName"},
        },
    });

    assert.equal(formatDebugType(typed.types["$"]), "http://example.org|LogicalPatient");
    assert.equal(formatDebugType(typed.types["$.name"]), "HumanName[]");
    assert.equal(formatDebugType(typed.types["$.name[0]"]), "HumanName");
});

test("creates canonical child paths", () => {
    assert.equal(childPath("$", "name"), "$.name");
    assert.equal(childPath("$.name", 0), "$.name[0]");
    assert.equal(childPath("$", "special-name"), "$[\"special-name\"]");
});

test("does not mistake an ordinary value/types object for a typed envelope", () => {
    const value = {
        value: {nested: true},
        types: {},
        other: "retained",
    };
    const typed = parseFmlTypedValue(value);

    assert.deepEqual(typed.value, value);
    assert.deepEqual(typed.types["$"], {name: "object"});
    assert.deepEqual(typed.types["$.other"], {name: "string"});
});
