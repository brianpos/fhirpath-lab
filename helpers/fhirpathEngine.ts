import fhirpath from 'fhirpath';
import axios from 'axios';
import { settings } from '~/helpers/user_settings';

export type EvaluateOptions = {
  expression: string;
  resourceJson?: object;
  resourceUrl?: string; // When using server engines, allow external URL
  resourceXml?: string; // When using server engines, allow raw XML content
  context?: string;
  validate?: boolean;
  engine?: 'fhirpath.js' | 'java-hapi-r5' | 'java-hapi-r6';
};

export async function evaluateExpression(options: EvaluateOptions): Promise<any> {
  const { expression, resourceJson, resourceUrl, resourceXml, context, validate } = options;
  const engine = options.engine ?? 'fhirpath.js';

  if (engine === 'fhirpath.js') {
    if (!resourceJson) throw new Error('fhirpath.js requires resourceJson');
    const result = fhirpath.evaluate(resourceJson as any, expression, undefined);
    return result;
  }

  if (engine === 'java-hapi-r5' || engine === 'java-hapi-r6') {
    let url = engine === 'java-hapi-r6' ? settings.java_server_r6() : settings.java_server_r5();
    const p: any = { resourceType: 'Parameters', parameter: [{ name: 'expression', valueString: expression }] };
    if (context) p.parameter.push({ name: 'context', valueString: context });
    if (validate !== false) p.parameter.push({ name: 'validate', valueBoolean: true });
    // Always include variables part (even if empty)
    p.parameter.push({ name: 'variables' });

    // Package resource following develop behavior
    if (resourceJson) {
      const jsonStr = JSON.stringify(resourceJson);
      p.parameter.push({ name: 'resource', extension: [{ url: 'http://fhir.forms-lab.com/StructureDefinition/json-value', valueString: jsonStr }] });
    }
    else if (resourceXml) {
      p.parameter.push({ name: 'resource', extension: [{ url: 'http://fhir.forms-lab.com/StructureDefinition/xml-value', valueString: resourceXml }] });
    }
    else if (resourceUrl) {
      p.parameter.push({ name: 'resource', valueString: resourceUrl });
    }
    else throw new Error('No resource provided');

    const tsv = settings.getFhirTerminologyServerUrl?.();
    if (tsv) p.parameter.push({ name: 'terminologyserver', valueString: tsv });

    const headers = {
      Accept: 'application/fhir+json, application/json',
      'Content-Type': 'application/fhir+json',
    };
    let response = await axios.post(url, p, { headers });
    if (engine === 'java-hapi-r6' && (!response || response.status === 404)) {
      const urlR5 = settings.java_server_r5();
      response = await axios.post(urlR5, p, { headers });
    }
    const out = response.data;
    if (out?.resourceType === 'OperationOutcome') {
      const msg = out?.issue?.map((i: any) => i?.details?.text || i?.diagnostics).filter(Boolean).join('; ');
      throw new Error(msg || 'Server returned OperationOutcome');
    }
    const params: any[] = Array.isArray(out?.parameter) ? out.parameter : [];
    const results: Array<{ name?: string; context?: string; parts: any[] }> = [];
    for (const entry of params) {
      if (entry.name === 'parameters') continue;
      const parts = Array.isArray(entry.part) ? entry.part : [];
      results.push({ name: entry.name, context: entry.valueString, parts });
    }
    return results;
  }

  throw new Error(`Unsupported engine: ${engine}`);
}

export function coerceParametersToBoolean(results: Array<{ name?: string; context?: string; parts: any[] }>): { value?: boolean; error?: string } {
  if (!results || results.length === 0) return { value: false };
  // Prefer the parameter named 'result'
  const resultParam = results.find(r => r.name === 'result') ?? results.find(r => (r.parts ?? []).some((p: any) => 'valueBoolean' in p));
  if (!resultParam) return { error: 'No result part' };
  const parts = resultParam.parts ?? [];
  if (!parts || parts.length === 0) return { value: false };
  const valueBools: boolean[] = [];
  for (const part of parts) {
    if (part.name === 'trace') continue;
    if ('valueBoolean' in part) valueBools.push(!!part.valueBoolean);
  }
  if (valueBools.length === 0) return { error: 'Non-boolean result' };
  if (valueBools.length === 1) return { value: valueBools[0] };
  // multiple booleans: AND them by convention (consistent with most invariant returns), but flag as unusual
  return { value: valueBools.every(Boolean) };
}
