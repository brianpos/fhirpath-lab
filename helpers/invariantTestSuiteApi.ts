import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import type { TestCase } from '~/models/InvariantTester';

const ghBase = 'https://api.github.com/repos/HL7/fhir/contents/source';

function parseExpectedResultFromFilename(name: string): boolean | undefined {
  const lower = name.toLowerCase();
  if (lower.includes('.pass.')) return true;
  if (lower.includes('.fail.')) return false;
  return undefined;
}

async function downloadAsText(downloadUrl: string): Promise<string> {
  const { data } = await axios.get(downloadUrl, { responseType: 'text' });
  return typeof data === 'string' ? data : String(data);
}

async function parseIfJson(downloadUrl: string, fileName: string): Promise<object> {
  const ext = (fileName.split('.').pop() || '').toLowerCase();
  if (ext === 'json') {
    const text = await downloadAsText(downloadUrl);
    return JSON.parse(text);
  }
  const text = await downloadAsText(downloadUrl);
  const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@_' });
  try { return parser.parse(text); } catch { return {}; }
}

export async function fetchTestCases(resourceType: string, invariantId: string): Promise<TestCase[]> {
  const typeDir = resourceType.toLowerCase();
  const url = `${ghBase}/${encodeURIComponent(typeDir)}/invariant-tests`;
  const { data } = await axios.get(url, { headers: { Accept: 'application/json' } });
  if (!Array.isArray(data)) return [];

  const prefix = invariantId.toLowerCase();
  const matches = data.filter((it: any) => typeof it?.name === 'string' && it.name.toLowerCase().startsWith(prefix));

  const cases: TestCase[] = [];
  for (const item of matches) {
    const expected = parseExpectedResultFromFilename(item.name);
    if (expected === undefined) continue;
    if (!item.download_url) continue;
    try {
      const ext = (item.name.split('.').pop() || '').toLowerCase();
      if (ext === 'json') {
        const resourceJson = await parseIfJson(item.download_url, item.name);
        cases.push({ fileName: item.name, resourceJson, resourceUrl: item.download_url, expectedResult: expected });
      } else {
        const resourceXml = await downloadAsText(item.download_url);
        cases.push({ fileName: item.name, resourceXml, resourceUrl: item.download_url, expectedResult: expected });
      }
    } catch (e) {
      console.warn('Failed to load test case', item.name, e);
    }
  }
  const byBase: Map<string, TestCase> = new Map();
  for (const tc of cases) {
    const base = tc.fileName.replace(/\.(json|xml)$/i, '');
    const current = byBase.get(base);
    if (!current) byBase.set(base, tc);
    else if (tc.fileName.toLowerCase().endsWith('.json')) byBase.set(base, tc);
  }
  return Array.from(byBase.values());
}

