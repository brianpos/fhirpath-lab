// unit test some stuff
import {describe, expect, test} from '@jest/globals';

function sum(a:number, b:number): number {
    return a + b;
  }

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
  
test('adds 2 + 2 to equal 4', () => {
  expect(sum(2,2)).toBe(4);
});

// Also version specific
// Search - typically extracts data, occasionally modifies data, and filters based on specific criteria
// Invariant - must return a boolean, does not modify data, but checks data for specific conditions, often across resources
//    doesn't use variables other than fhir or fhirpath defined ones, ubnless embedded in a questionnaire
// Questionnaire - the context will be from a questionnaireresponse
