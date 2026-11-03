import { describe, expect, test } from '@jest/globals';
import { convertParametersToNative } from '../helpers/fhir_parameters';

describe('convertParametersToNative', () => {
  test('recursively converts nested parts and all value types', () => {
    const parameters: fhir4b.Parameters = {
      resourceType: 'Parameters',
      parameter: [
        {
          name: 'outer',
          part: [
            {
              name: 'middle',
              part: [
                { name: 'enabled', valueBoolean: false },
                { name: 'count', valueInteger: 0 },
                {
                  name: 'coding',
                  valueCoding: { system: 'https://example.test/codes', code: 'nested' },
                },
              ],
            },
          ],
        },
        { name: 'empty', part: [] },
      ],
    };

    expect(convertParametersToNative(parameters)).toEqual({
      outer: {
        middle: {
          enabled: false,
          count: 0,
          coding: { system: 'https://example.test/codes', code: 'nested' },
        },
      },
      empty: {},
    });
  });

  test('collects repeated parameter and part names', () => {
    const extension = [{ url: 'https://example.test/extension', valueString: 'first' }];
    const parameters: fhir4b.Parameters = {
      resourceType: 'Parameters',
      parameter: [
        {
          name: 'item',
          part: [
            { name: 'code', valueString: 'one' },
            { name: 'code', valueString: 'two' },
            { name: 'code', valueString: 'three' },
            { name: 'detail', extension },
            { name: 'detail', valueString: 'second' },
          ],
        },
        { name: 'item', valueString: 'another item' },
      ],
    };

    expect(convertParametersToNative(parameters)).toEqual({
      item: [
        {
          code: ['one', 'two', 'three'],
          detail: [extension, 'second'],
        },
        'another item',
      ],
    });
  });
});