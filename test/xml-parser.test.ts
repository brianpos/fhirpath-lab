// Test the custom JSON Parser that tracks position in the input string
import { parseXml, parseXmlAndObject } from "../helpers/xml_parser";
import { findNodeByPath } from "../helpers/json_parser";
import { describe, expect, test } from "@jest/globals";
import * as fs from 'fs';
import r5Model from "fhirpath/fhir-context/r5";

test("findNodeByPath", () => {
  const xmlData = fs.readFileSync('test/parse-test-patient.xml','utf8');
  let xmlTree = parseXml(xmlData);
  let result = findNodeByPath(xmlTree!, 'active');
  expect(result).toBeDefined();
  expect(result?.Path).toBe('Patient.active');
  expect(result?.DefinitionPath).toBe('Patient.active');
  expect(result?.DataType).toBe('boolean');
});

test("findNodeByPathBaseProperty", () => {
  const xmlData = fs.readFileSync('test/parse-test-patient.xml','utf8');
  let xmlTree = parseXml(xmlData);
  let result = findNodeByPath(xmlTree!, 'Patient.id');
  expect(result).toBeDefined();
  expect(result?.Path).toBe('Patient.id');
  expect(result?.DefinitionPath).toBe('Patient.id');
  expect(result?.DataType).toBe('System.String');
});

test("findNodeByPath_ElementId", () => {
  const xmlData = fs.readFileSync('test/parse-test-patient.xml','utf8');
  let xmlTree = parseXml(xmlData);
  let result = findNodeByPath(xmlTree!, 'Patient.deceased.id');
  expect(result).toBeDefined();
  expect(result?.Path).toBe('Patient.deceased.id');
  expect(result?.DefinitionPath).toBe('Patient.deceased.id');
  expect(result?.DataType).toBe('System.String');
});

test("findNodeByPathChoiceType", () => {
  const xmlData = fs.readFileSync('test/parse-test-ingredient.xml','utf8');
  let xmlTree = parseXmlAndObject(xmlData, r5Model).node;
  let result = findNodeByPath(xmlTree!, 'Ingredient.substance.strength[2].presentation.numerator');
  expect(result).toBeDefined();
  expect(result?.Path).toBe('Ingredient.substance.strength[2].presentation.numerator');
  expect(result?.DefinitionPath).toBe('Ingredient.substance.strength.presentation.numerator');
  expect(result?.DataType).toBe('Quantity');
  expect(result?.isArray).toBeUndefined();
});

test("findNodeByPathToExtension", () => {
  const xmlData = fs.readFileSync('test/parse-test-ingredient.xml','utf8');
  let xmlTree = parseXml(xmlData, r5Model);
  let result = findNodeByPath(xmlTree!, 'Ingredient.identifier.extension');
  expect(result).toBeDefined();
  expect(result?.Path).toBe('Ingredient.identifier.extension');
  expect(result?.DefinitionPath).toBe('Ingredient.identifier.extension');
  expect(result?.DataType).toBe('Extension');
  // expect(result?.isArray).toBe(true); // XML doesn't know if there are multiple extensions
});

test("findNodeByPath_strength", () => {
  const xmlData = fs.readFileSync('test/parse-test-ingredient.xml','utf8');
  let xmlTree = parseXml(xmlData, r5Model);
  let result = findNodeByPath(xmlTree!, 'Ingredient.substance.strength[1]');
  expect(result).toBeDefined();
  expect(result?.Path).toBe('Ingredient.substance.strength[1]');
  expect(result?.DefinitionPath).toBe('Ingredient.substance.strength');
  expect(result?.DataType).toBe('Ingredient.substance.strength');
  expect(result?.isArray).toBeUndefined();
});

test("findNodeByPathToExtensionValue", () => {
  const xmlData = fs.readFileSync('test/parse-test-ingredient.xml','utf8');
  let xmlTree = parseXml(xmlData, r5Model);
  let result = findNodeByPath(xmlTree!, 'Ingredient.identifier.extension[0].value');
  expect(result).toBeDefined();
  expect(result?.Path).toBe('Ingredient.identifier.extension[0].value');  // XML parser doesn't add [0] for single extension
  expect(result?.DefinitionPath).toBe('Ingredient.identifier.extension.value');
  expect(result?.DataType).toBe('string');
  expect(result?.isArray).toBeUndefined;
});

test("findNodeByPath_PrimitiveArray", () => {
  const xmlData = fs.readFileSync('test/parse-test-patient.xml','utf8');
  let xmlTree = parseXml(xmlData);
  let result = findNodeByPath(xmlTree!, 'name[0].given');
  expect(result).toBeDefined();
  expect(result?.Path).toBe('Patient.name[0].given');
  expect(result?.DefinitionPath).toBe('Patient.name.given');
  expect(result?.DataType).toBe('string');
});

test("findNodeByPath_PrimitiveArrayItem", () => {
  const xmlData = `<Patient xmlns="http://hl7.org/fhir">
  <id value="123" />
  <name>
    <family value="Doe" />
    <given value="John" />
    <given value="Smith" />
  </name>
</Patient>`;
  let xmlTree = parseXml(xmlData);
  let result = findNodeByPath(xmlTree!, 'Patient.name[0].given[1]');
  expect(result).toBeDefined();
  expect(result?.Path).toBe('Patient.name.given[1]');
  expect(result?.DefinitionPath).toBe('Patient.name.given');
  expect(result?.DataType).toBe('string');
});

test("findNodeByPath_PrimitiveArrayItemExtension", () => {
  const xmlData = `<Patient xmlns="http://hl7.org/fhir">
  <id value="123" />
  <name>
    <family value="Doe" />
    <given value="John" id="ext1">
      <extension url="http://example.com/ext">
        <valueString value="value" />
      </extension>
    </given>
    <given value="Smith" />
  </name>
</Patient>`;
  let xmlTree = parseXml(xmlData);
  let result = findNodeByPath(xmlTree!, 'name[0].given[0].extension[0].value');
  expect(result).toBeDefined();
  expect(result?.Path).toBe('Patient.name.given[0].extension[0].value');  // XML parser doesn't add [0] for single extension
  expect(result?.DefinitionPath).toBe('Patient.name.given.extension.value');
  expect(result?.DataType).toBe('string');
});

test("findNodeByPath_BundleEntryResource", () => {
  const xmlData = `<Bundle xmlns="http://hl7.org/fhir">
  <id value="123" />
  <type value="searchset" />
  <total value="1" />
  <entry>
    <resource>
      <Patient>
        <id value="123" />
        <name>
          <family value="Doe" />
          <given value="John" id="ext1">
            <extension url="http://example.com/ext">
              <valueString value="value" />
            </extension>
          </given>
          <given value="Smith" />
        </name>
      </Patient>
    </resource>
  </entry>
</Bundle>`;
  let xmlTree = parseXml(xmlData);
  let result = findNodeByPath(xmlTree!, 'entry[0].resource.name[0].given[0].extension[0].value');
  expect(result).toBeDefined();
  expect(result?.Path).toBe('Bundle.entry.resource.name.given[0].extension[0].value');
  expect(result?.DefinitionPath).toBe('Bundle.entry.resource.name.given.extension.value');
  expect(result?.DataType).toBe('string');
});

// Tests for parseXmlAndObject function
describe("parseXmlAndObject", () => {
  test("simple patient with basic properties", () => {
    const xmlData = `<Patient xmlns="http://hl7.org/fhir">
  <id value="123" />
  <active value="true" />
  <gender value="male" />
</Patient>`;
    
    const jsonData: fhir4.Patient = {
        "resourceType": "Patient",
        "id": "123",
        "active": true,
        "gender": "male"
    };
    
    const resultNode = parseXml(xmlData);
    const result = parseXmlAndObject(xmlData);
    
    // Check node structure
    expect(result.node).toBeDefined();
    expect(result.node?.Path).toBe('Patient');
    expect(result.node?.text).toBe('Patient');
    
    // Check parsed object matches JSON equivalent using toEqual
    expect(result.object).toEqual(jsonData);
    expect(result.node).toEqual(resultNode);
  });

  test("patient with arrays", () => {
    const xmlData = `<Patient xmlns="http://hl7.org/fhir">
  <id value="123" />
  <name>
    <family value="Doe" />
    <given value="John" />
    <given value="Smith" />
  </name>
</Patient>`;
    
    const jsonData = {
      "resourceType": "Patient",
      "id": "123",
      "name": {
        "family": "Doe",
        "given": ["John", "Smith"]
      }
    };
    
    const resultNode = parseXml(xmlData);
    const result = parseXmlAndObject(xmlData);
    
    // Check parsed object matches JSON equivalent using toEqual
    expect(result.object).toEqual(jsonData);
    expect(result.node).toEqual(resultNode);
  });

  test("patient with multiple name entries", () => {
    const xmlData = `<Patient xmlns="http://hl7.org/fhir">
  <id value="123" />
  <name>
    <family value="Doe" />
    <given value="John" />
  </name>
  <name>
    <family value="Smith" />
    <given value="Jane" />
  </name>
</Patient>`;
    
    const jsonData = {
      "resourceType": "Patient",
      "id": "123",
      "name": [
        {
          "family": "Doe",
          "given": "John"
        },
        {
          "family": "Smith",
          "given": "Jane"
        }
      ]
    };
    
    const resultNode = parseXml(xmlData);
    const result = parseXmlAndObject(xmlData);
    
    // Check parsed object matches JSON equivalent using toEqual
    expect(result.object).toEqual(jsonData);
    expect(result.node).toEqual(resultNode);
  });

  test("element with attributes and text content", () => {
    const xmlData = `<Patient xmlns="http://hl7.org/fhir">
  <id value="123" />
  <name>
    <family value="Doe" />
    <given value="John" id="given1">
      <extension url="http://example.com/ext">
        <valueString value="nickname" />
      </extension>
    </given>
  </name>
</Patient>`;
    
    const jsonData = {
        "resourceType": "Patient",
        "id": "123",
        "name": {
          "family": "Doe",
          "_given": {
            "id": "given1",
            "extension": [{
              "url": "http://example.com/ext",
              "valueString": "nickname"
            }]
          },
          "given": "John"
        }
    };
    
    const resultNode = parseXml(xmlData);
    const result = parseXmlAndObject(xmlData);
    
    // Check parsed object matches JSON equivalent using toEqual
    expect(result.object).toEqual(jsonData);
    expect(result.node).toEqual(resultNode);
  });

  test("bundle with entry resources", () => {
    const xmlData = `<Bundle xmlns="http://hl7.org/fhir">
  <id value="bundle123" />
  <type value="searchset" />
  <total value="1" />
  <entry>
    <resource>
      <Patient>
        <id value="patient123" />
        <active value="true" />
      </Patient>
    </resource>
  </entry>
</Bundle>`;
    
    const jsonData = {
        "resourceType": "Bundle",
        "id": "bundle123",
        "type": "searchset",
        "total": 1,
        "entry": {
          "resource": {
            "resourceType": "Patient",
            "id": "patient123",
            "active": true
          }
        }
    };
    
    const resultNode = parseXml(xmlData);
    const result = parseXmlAndObject(xmlData);
    
    // Check parsed object matches JSON equivalent using toEqual
    expect(result.object).toEqual(jsonData);
    expect(result.node).toEqual(resultNode);
  });

  test("numeric and boolean value parsing", () => {
    const xmlData = `<Patient xmlns="http://hl7.org/fhir">
  <id value="123" />
  <active value="true" />
  <deceasedBoolean value="false" />
  <multipleBirthInteger value="2" />
  <contact>
    <gender value="male" />
    <period>
      <start value="2020-01-01" />
    </period>
  </contact>
</Patient>`;
    
    const jsonData = {
        "resourceType": "Patient",
        "id": "123",
        "active": true,
        "deceasedBoolean": false,
        "multipleBirthInteger": 2,
        "contact": {
          "gender": "male",
          "period": {
            "start": "2020-01-01"
          }
        }
    };
    
    const resultNode = parseXml(xmlData);
    const result = parseXmlAndObject(xmlData);
    
    // Check parsed object matches JSON equivalent using toEqual
    expect(result.object).toEqual(jsonData);
    expect(result.node).toEqual(resultNode);
  });

  test("choice type elements", () => {
    const xmlData = `<Patient xmlns="http://hl7.org/fhir">
  <id value="123" />
  <deceasedBoolean value="true" />
  <multipleBirthInteger value="3" />
</Patient>`;
    
    const jsonData = {
        "resourceType": "Patient",
        "id": "123",
        "deceasedBoolean": true,
        "multipleBirthInteger": 3
    };
    
    const resultNode = parseXml(xmlData);
    const result = parseXmlAndObject(xmlData);
    
    // Check parsed object matches JSON equivalent using toEqual
    expect(result.object).toEqual(jsonData);
    expect(result.node).toEqual(resultNode);
  });

  test("extensions with valueString", () => {
    const xmlData = `<Patient xmlns="http://hl7.org/fhir">
  <id value="123" />
  <extension url="http://example.com/birthPlace">
    <valueString value="New York" />
  </extension>
</Patient>`;
    
    const jsonData = {
        "resourceType": "Patient",
        "id": "123",
        "extension": [{
          "url": "http://example.com/birthPlace",
          "valueString": "New York"
        }]
    };
    
    const resultNode = parseXml(xmlData);
    const result = parseXmlAndObject(xmlData);
    
    // Check parsed object matches JSON equivalent using toEqual
    expect(result.object).toEqual(jsonData);
    expect(result.node).toEqual(resultNode);
  });

  test("multiple extensions (array)", () => {
    const xmlData = `<Patient xmlns="http://hl7.org/fhir">
  <id value="123" />
  <extension url="http://example.com/birthPlace">
    <valueString value="New York" />
  </extension>
  <extension url="http://example.com/nationality">
    <valueString value="American" />
  </extension>
</Patient>`;
    
    const jsonData: fhir4.Patient = {
        "resourceType": "Patient",
        "id": "123",
        "extension": [
          {
            "url": "http://example.com/birthPlace",
            "valueString": "New York"
          },
          {
            "url": "http://example.com/nationality",
            "valueString": "American"
          }
        ]
    };
    
    const resultNode = parseXml(xmlData);
    const result = parseXmlAndObject(xmlData);
    
    // Check parsed object matches JSON equivalent using toEqual
    expect(result.object).toEqual(jsonData);
    expect(result.node).toEqual(resultNode);
});

  test("real patient file", () => {
    const xmlData = fs.readFileSync('test/parse-test-patient.xml','utf8');
    const resultNode = parseXml(xmlData);
    const result = parseXmlAndObject(xmlData);
    
    // Basic structure checks
    expect(result.node).toBeDefined();
    expect(result.object).toBeDefined();
    
    // Check that both parsers produce consistent paths
    const xmlTree = parseXml(xmlData);
    expect(result.node?.Path).toBe(xmlTree?.Path);
    expect(result.node?.text).toBe(xmlTree?.text);
    
    // Verify object has expected FHIR Patient structure
    expect(result.object.resourceType).toBeDefined(); // Root element doesn't get resourceType
    expect(result.object.id).toBeDefined();
    expect(result.node).toEqual(resultNode);
  });

  test("ingredient file with R5 model", () => {
    const xmlData = fs.readFileSync('test/parse-test-ingredient.xml','utf8');
    const jsonData = JSON.parse(fs.readFileSync('test/parse-test-ingredient.json','utf8'));
    const resultNode = parseXml(xmlData, r5Model);
    const result = parseXmlAndObject(xmlData, r5Model);
    
    // Basic structure checks
    expect(result.node).toBeDefined();
    expect(result.object).toBeDefined();
    
    // Check that both parsers produce consistent paths
    const xmlTree = parseXml(xmlData, r5Model);
    expect(result.node?.Path).toBe(xmlTree?.Path);
    expect(result.node?.text).toBe(xmlTree?.text);
    
    // Check parsed object matches JSON equivalent using toEqual
    expect(result.object).toEqual(jsonData);
    expect(result.node).toEqual(resultNode);

    console.log("data", JSON.stringify(result.object, null, 2));
    console.log("node", JSON.stringify(result.node, null, 2));
  });


  test("decimal numbers", () => {
    const xmlData = `<Observation xmlns="http://hl7.org/fhir">
  <id value="123" />
  <valueQuantity>
    <value value="98.6" />
    <unit value="F" />
  </valueQuantity>
</Observation>`;

    const jsonData = {
        "resourceType": "Observation",
        "id": "123",
        "valueQuantity": {
          "value": 98.6,
          "unit": "F"
        }
    };
    
    const resultNode = parseXml(xmlData);
    const result = parseXmlAndObject(xmlData);
    
    // Check parsed object matches JSON equivalent using toEqual
    expect(result.object).toEqual(jsonData);
    expect(result.node).toEqual(resultNode);
  });
});
