import axios from 'axios';

type Invariant = { key: string; human?: string; expression?: string };

let cachedResourceTypes: string[] | null = null;
const buildBase = 'https://build.fhir.org';
const invariantsCache = new Map<string, Invariant[]>();

export async function getResourceTypes(): Promise<string[]> {
  if (cachedResourceTypes) return cachedResourceTypes;

  try {
    const url = `${buildBase}/profiles-resources.json`;
    const { data } = await axios.get(url, { headers: { Accept: 'application/json' } });
    const entries = (data?.entry ?? []) as Array<{ resource?: any }>;
    const types = entries
      .map((e) => e.resource)
      .filter((r) => r?.resourceType === 'StructureDefinition' && r?.kind === 'resource' && typeof r?.name === 'string')
      .map((r) => r.name as string)
      .sort((a: string, b: string) => a.localeCompare(b));
    cachedResourceTypes = Array.from(new Set(types));
    if (cachedResourceTypes.length) return cachedResourceTypes;
  } catch {}

  try {
    const url = `${buildBase}/package.json`;
    const { data } = await axios.get(url, { headers: { Accept: 'application/json' } });
    const resources: string[] = Object.keys((data?.resources ?? {})).filter((k) => /^[A-Z][A-Za-z0-9]+$/.test(k));
    cachedResourceTypes = resources.sort((a, b) => a.localeCompare(b));
    return cachedResourceTypes;
  } catch {}

  cachedResourceTypes = ['Patient', 'Observation', 'Condition', 'Encounter'];
  return cachedResourceTypes;
}

export async function getInvariantsForResourceType(resourceType: string): Promise<Invariant[]> {
  const cacheKey = resourceType;
  const cached = invariantsCache.get(cacheKey);
  if (cached) return cached;

  const candidates = [
    `${buildBase}/${encodeURIComponent(resourceType)}.profile.json`,
    `${buildBase}/${encodeURIComponent(resourceType.toLowerCase())}.profile.json`,
  ];

  let data: any | undefined;
  let lastErr: any;
  for (const url of candidates) {
    try {
      const resp = await axios.get(url, { headers: { Accept: 'application/json' } });
      data = resp.data;
      break;
    } catch (e) { lastErr = e; }
  }
  if (!data) throw lastErr ?? new Error('Failed to load StructureDefinition');

  const elements: any[] = data?.snapshot?.element ?? [];
  const invariants: Invariant[] = [];
  for (const el of elements) {
    const cs: any[] = el?.constraint ?? [];
    for (const c of cs) {
      if (c?.key) invariants.push({ key: String(c.key), human: c.human, expression: c.expression });
    }
  }
  const map = new Map<string, Invariant>();
  for (const inv of invariants) {
    if (!map.has(inv.key)) map.set(inv.key, inv);
    else if (!map.get(inv.key)?.expression && inv.expression) map.set(inv.key, inv);
  }
  const result = Array.from(map.values());
  invariantsCache.set(cacheKey, result);
  return result;
}

export type { Invariant };

