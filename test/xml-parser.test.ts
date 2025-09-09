// Test the custom JSON Parser that tracks position in the input string
import { parseXml } from "../helpers/xml_parser";
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
  let xmlTree = parseXml(xmlData, r5Model);
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
  expect(result?.Path).toBe('Ingredient.identifier.extension.value');  // XML parser doesn't add [0] for single extension
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
  expect(result?.Path).toBe('Patient.name.given[0].extension.value');  // XML parser doesn't add [0] for single extension
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
  expect(result?.Path).toBe('Bundle.entry.resource.name.given[0].extension.value');
  expect(result?.DefinitionPath).toBe('Bundle.entry.resource.name.given.extension.value');
  expect(result?.DataType).toBe('string');
});
