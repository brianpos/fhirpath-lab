// Test the custom JSON Parser that tracks position in the input string
import { findNodeByPath, parseJson, pathsMatchWithFlexibleArrayIndex } from "../helpers/json_parser";
import { describe, expect, test } from "@jest/globals";
import * as fs from 'fs';
import r5Model from "fhirpath/fhir-context/r5";

test("parseJson", () => {
  let result = parseJson('{}');
  expect(result).toBeDefined();
  expect(result?.children).toBeDefined();
  expect(result?.children?.length).toBe(0);
});

test("findNodeByPath", () => {
  const jsonData = fs.readFileSync('test/parse-test-patient.json','utf8');
  let jsonTree = parseJson(jsonData);
  let result = findNodeByPath(jsonTree!, 'active');
  expect(result).toBeDefined();
  expect(result?.Path).toBe('Patient.active');
  expect(result?.DefinitionPath).toBe('Patient.active');
  expect(result?.DataType).toBe('boolean');
});

test("findNodeByPathBaseProperty", () => {
  const jsonData = fs.readFileSync('test/parse-test-patient.json','utf8');
  let jsonTree = parseJson(jsonData);
  let result = findNodeByPath(jsonTree!, 'Patient.id');
  expect(result).toBeDefined();
  expect(result?.Path).toBe('Patient.id');
  expect(result?.DefinitionPath).toBe('Patient.id');
  expect(result?.DataType).toBe('System.String');
});

test("findNodeByPath_ElementId", () => {
  const jsonData = fs.readFileSync('test/parse-test-patient.json','utf8');
  let jsonTree = parseJson(jsonData);
  let result = findNodeByPath(jsonTree!, 'Patient.deceased.id');
  expect(result).toBeDefined();
  expect(result?.Path).toBe('Patient.deceased.id');
  expect(result?.DefinitionPath).toBe('Patient.deceased.id');
  expect(result?.DataType).toBe('System.String');
});

test("findNodeByPathChoiceType", () => {
  const jsonData = fs.readFileSync('test/parse-test-ingredient.json','utf8');
  let jsonTree = parseJson(jsonData, r5Model);
  let result = findNodeByPath(jsonTree!, 'Ingredient.substance.strength[2].presentation.numerator');
  expect(result).toBeDefined();
  expect(result?.Path).toBe('Ingredient.substance.strength[2].presentation.numerator');
  expect(result?.DefinitionPath).toBe('Ingredient.substance.strength.presentation.numerator');
  expect(result?.DataType).toBe('Quantity');
  expect(result?.isArray).toBeUndefined();
});

test("findNodeByPathToExtension", () => {
  const jsonData = fs.readFileSync('test/parse-test-ingredient.json','utf8');
  let jsonTree = parseJson(jsonData, r5Model);
  let result = findNodeByPath(jsonTree!, 'Ingredient.identifier.extension');
  expect(result).toBeDefined();
  expect(result?.Path).toBe('Ingredient.identifier.extension');
  expect(result?.DefinitionPath).toBe('Ingredient.identifier.extension');
  expect(result?.DataType).toBe('Extension');
  expect(result?.isArray).toBe(true);
});

test("findNodeByPath_strength", () => {
  const jsonData = fs.readFileSync('test/parse-test-ingredient.json','utf8');
  let jsonTree = parseJson(jsonData, r5Model);
  let result = findNodeByPath(jsonTree!, 'Ingredient.substance.strength[1]');
  expect(result).toBeDefined();
  expect(result?.Path).toBe('Ingredient.substance.strength[1]');
  expect(result?.DefinitionPath).toBe('Ingredient.substance.strength');
  expect(result?.DataType).toBe('Ingredient.substance.strength');
  expect(result?.isArray).toBeUndefined();
});

test("findNodeByPathToExtensionValue", () => {
  const jsonData = fs.readFileSync('test/parse-test-ingredient.json','utf8');
  let jsonTree = parseJson(jsonData, r5Model);
  // Intentionally specify to look for the value of ALL extension nodes on the identifier
  let result = findNodeByPath(jsonTree!, 'Ingredient.identifier.extension.value');
  expect(result).toBeDefined();
  expect(result?.Path).toBe('Ingredient.identifier.extension[0].value');
  expect(result?.DefinitionPath).toBe('Ingredient.identifier.extension.value');
  expect(result?.DataType).toBe('string');
  expect(result?.isArray).toBeUndefined;
});

test("findNodeByPath_PrimitiveArray", () => {
  const jsonData = fs.readFileSync('test/parse-test-patient.json','utf8');
  let jsonTree = parseJson(jsonData);
  let result = findNodeByPath(jsonTree!, 'name[0].given');
  expect(result).toBeDefined();
  expect(result?.Path).toBe('Patient.name[0].given');
  expect(result?.DefinitionPath).toBe('Patient.name.given');
  expect(result?.DataType).toBe('string');
});

test("findNodeByPath_PrimitiveArrayItem", () => {
  // const jsonData = fs.readFileSync('test/parse-test-patient.json','utf8');
  const jsonData: fhir4.Patient = {
     resourceType: 'Patient',
      id: '123',
       name: [{
         family: 'Doe', 
         given: ['John', 'Smith'] 
        }] 
      };
  let jsonTree = parseJson(JSON.stringify(jsonData, null, 2));
  let result = findNodeByPath(jsonTree!, 'Patient.name[0].given[1]');
  expect(result).toBeDefined();
  expect(result?.Path).toBe('Patient.name[0].given[1]');
  expect(result?.DefinitionPath).toBe('Patient.name.given');
  expect(result?.DataType).toBe('string');
});

test("findNodeByPath_PrimitiveArrayItem0", () => {
  // const jsonData = fs.readFileSync('test/parse-test-patient.json','utf8');
  const jsonData: fhir4.Patient = {
     resourceType: 'Patient',
      id: '123',
       name: [{
         family: 'Doe', 
         given: ['John', 'Smith'] 
        }] 
      };
  let jsonTree = parseJson(JSON.stringify(jsonData, null, 2));
  let result = findNodeByPath(jsonTree!, 'Patient.name[0].given[0]');
  expect(result).toBeDefined();
  expect(result?.Path).toBe('Patient.name[0].given[0]');
  expect(result?.DefinitionPath).toBe('Patient.name.given');
  expect(result?.DataType).toBe('string');
});

test("findNodeByPath_PrimitiveArrayItemExtension", () => {
  // const jsonData = fs.readFileSync('test/parse-test-patient.json','utf8');
  const jsonData: fhir4.Patient = {
     resourceType: 'Patient',
      id: '123',
       name: [{
         family: 'Doe', 
         given: ['John', 'Smith'],
         _given: [{ id: 'ext1', extension: [{ url: 'http://example.com/ext', valueString: 'value' }] }] 
        }] 
      };
  let jsonTree = parseJson(JSON.stringify(jsonData, null, 2));
  let result = findNodeByPath(jsonTree!, 'name[0].given[0].extension[0].value');
  expect(result).toBeDefined();
  expect(result?.Path).toBe('Patient.name[0].given[0].extension[0].value');
  expect(result?.DefinitionPath).toBe('Patient.name.given.extension.value');
  expect(result?.DataType).toBe('string');
});

test("findNodeByPath_BundleEntryResource", () => {
  const jsonData: fhir4.Bundle = {
     resourceType: 'Bundle',
      id: '123',
      type: 'searchset',
      total: 1,
       entry: [{
         resource: {
           resourceType: 'Patient',
           id: '123',
           name: [{
             family: 'Doe', 
             given: ['John', 'Smith'],
             _given: [{ id: 'ext1', extension: [{ url: 'http://example.com/ext', valueString: 'value' }] }] 
            }] 
          }
        }] 
      };
  let jsonTree = parseJson(JSON.stringify(jsonData, null, 2));
  let result = findNodeByPath(jsonTree!, 'entry[0].resource.name[0].given[0].extension[0].value');
  expect(result).toBeDefined();
  expect(result?.Path).toBe('Bundle.entry[0].resource.name[0].given[0].extension[0].value');
  expect(result?.DefinitionPath).toBe('Bundle.entry.resource.name.given.extension.value');
  expect(result?.DataType).toBe('string');
});

test("pathsMatchWithFlexibleArrayIndex", () => {

  // Test Case 1: Exact match without any array indices
  expect(pathsMatchWithFlexibleArrayIndex('Patient.name.given', 'Patient.name.given')).toBe(true);

  // Test Case 2: Node path has no [0], search path has [0] at multiple levels
  expect(pathsMatchWithFlexibleArrayIndex('Patient.name.given', 'Patient.name[0].given[0]')).toBe(true);

  // Test Case 3: Node path has [0], search path has no [0]
  expect(pathsMatchWithFlexibleArrayIndex('Patient.name[0].given[0]', 'Patient.name.given')).toBe(true);

  // Test Case 4: Both have [0] indices - should match
  expect(pathsMatchWithFlexibleArrayIndex('Patient.name[0].given[0]', 'Patient.name[0].given[0]')).toBe(true);

  // Test Case 5: Mixed indexing - some [0], some not
  expect(pathsMatchWithFlexibleArrayIndex('Patient.name.given[0].extension', 'Patient.name[0].given.extension[0]')).toBe(true);

  // Test Case 6: Complex path with multiple array levels
  expect(pathsMatchWithFlexibleArrayIndex(
    'Patient.name.given.extension.value', 
    'Patient.name[0].given[0].extension[0].value'
  )).toBe(true);

  // Test Case 7: Different property names should not match
  expect(pathsMatchWithFlexibleArrayIndex('Patient.name.given', 'Patient.name.family')).toBe(false);

  // Test Case 8: Different resource types should not match
  expect(pathsMatchWithFlexibleArrayIndex('Patient.name.given', 'Observation.name.given')).toBe(false);

  // Test Case 9: Non-zero array indices should be preserved and not match [0]
  expect(pathsMatchWithFlexibleArrayIndex('Patient.name[1].given', 'Patient.name[0].given')).toBe(false);

  // Test Case 10: Only [0] indices are normalized, other indices remain
  expect(pathsMatchWithFlexibleArrayIndex('Patient.name[1].given[0]', 'Patient.name[1].given')).toBe(true);

  // Test Case 11: Multiple [0] indices in complex path
  expect(pathsMatchWithFlexibleArrayIndex(
    'Patient.name.given.extension.value', 
    'Patient.name[0].given[0].extension[0].value[0]'
  )).toBe(true);

  // Test Case 12: Mixed with non-zero indices - should not match
  expect(pathsMatchWithFlexibleArrayIndex(
    'Patient.name[1].given[0].extension', 
    'Patient.name[0].given[0].extension'
  )).toBe(false);

  // Test Case 13: Edge case - empty strings
  expect(pathsMatchWithFlexibleArrayIndex('', '')).toBe(true);

  // Test Case 14: One empty, one not
  expect(pathsMatchWithFlexibleArrayIndex('', 'Patient.name')).toBe(false);

  // Test Case 15: Deep nesting with mixed array indices
  expect(pathsMatchWithFlexibleArrayIndex(
    'Bundle.entry.resource.name.given[0].extension.value',
    'Bundle.entry[0].resource[0].name[0].given.extension[0].value[0]'
  )).toBe(true);

  // Test Case 16: Partial path matching should not work
  expect(pathsMatchWithFlexibleArrayIndex('Patient.name', 'Patient.name.given')).toBe(false);

  // Test Case 17: Longer path vs shorter path
  expect(pathsMatchWithFlexibleArrayIndex('Patient.name.given.extension', 'Patient.name.given')).toBe(false);
});
