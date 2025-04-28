// Test the custom JSON Parser that tracks position in the input string
import { findNodeByPath, parseJson } from "../helpers/json_parser";
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
  let result = findNodeByPath(jsonTree!, 'Ingredient.identifier.extension.value');
  expect(result).toBeDefined();
  expect(result?.Path).toBe('Ingredient.identifier.extension[0].value');
  expect(result?.DefinitionPath).toBe('Ingredient.identifier.extension.value');
  expect(result?.DataType).toBe('string');
  expect(result?.isArray).toBeUndefined;
});
