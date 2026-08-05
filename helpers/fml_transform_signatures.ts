export type TransformParameterType =
  | 'any'
  | 'canonical'
  | 'decimal'
  | 'expression'
  | 'integer'
  | 'string';

export interface TransformParameterDefinition {
  name: string;
  type: TransformParameterType;
  optional?: boolean;
  variadic?: boolean;
  allowedValues?: readonly string[];
}

export interface TransformSignature {
  parameters: readonly TransformParameterDefinition[];
}

export interface TransformDefinition {
  name: string;
  signatures: readonly TransformSignature[];
  result?: TransformResultDefinition;
}

export type TransformResultDefinition =
  | {kind: 'fixed'; typeNames: readonly string[]}
  | {kind: 'parameter'; parameterName: string; values?: Readonly<Record<string, string>>};

export interface TransformInvocationLike {
  type: string;
  parameters: readonly {
    name?: string;
    value: string | number | boolean;
  }[];
}

const parameter = (
  name: string,
  type: TransformParameterType,
  options: Omit<TransformParameterDefinition, 'name' | 'type'> = {},
): TransformParameterDefinition => ({name, type, ...options});

const signature = (...parameters: TransformParameterDefinition[]): TransformSignature => ({parameters});

const definitions: TransformDefinition[] = [
  {name: 'create', signatures: [signature(parameter('type', 'string'))], result: {kind: 'parameter', parameterName: 'type'}},
  {name: 'copy', signatures: [signature(parameter('source', 'any'))]},
  {name: 'truncate', signatures: [signature(parameter('source', 'string'), parameter('length', 'integer'))], result: {kind: 'fixed', typeNames: ['string']}},
  {name: 'escape', signatures: [signature(parameter('source', 'string'), parameter('format1', 'string'), parameter('format2', 'string'))], result: {kind: 'fixed', typeNames: ['string']}},
  {name: 'cast', signatures: [signature(parameter('source', 'any')), signature(parameter('source', 'any'), parameter('type', 'string'))], result: {kind: 'parameter', parameterName: 'type'}},
  {name: 'append', signatures: [signature(parameter('source', 'any', {variadic: true}))], result: {kind: 'fixed', typeNames: ['string']}},
  {name: 'translate', signatures: [signature(
    parameter('source', 'any'),
    parameter('map_uri', 'canonical'),
    parameter('output', 'string', {allowedValues: ['code', 'system', 'display', 'Coding', 'CodeableConcept']}),
  )], result: {kind: 'parameter', parameterName: 'output', values: {
    code: 'code', system: 'uri', display: 'string', Coding: 'Coding', CodeableConcept: 'CodeableConcept',
  }}},
  {name: 'reference', signatures: [signature(parameter('source', 'any'))], result: {kind: 'fixed', typeNames: ['Reference']}},
  {name: 'toDateTime', signatures: [signature(parameter('source', 'string'), parameter('format', 'string'))], result: {kind: 'fixed', typeNames: ['dateTime']}},
  {name: 'unixToDateTime', signatures: [signature(parameter('source', 'integer'), parameter('timezone', 'string', {optional: true}))], result: {kind: 'fixed', typeNames: ['dateTime']}},
  {name: 'toDate', signatures: [signature(parameter('source', 'string'), parameter('format', 'string'))], result: {kind: 'fixed', typeNames: ['date']}},
  {name: 'unixToDate', signatures: [signature(parameter('source', 'integer'), parameter('timezone', 'string', {optional: true}))], result: {kind: 'fixed', typeNames: ['date']}},
  {name: 'toTime', signatures: [signature(parameter('source', 'string'), parameter('format', 'string'))], result: {kind: 'fixed', typeNames: ['time']}},
  {name: 'unixToTime', signatures: [signature(parameter('source', 'integer'), parameter('timezone', 'string', {optional: true}))], result: {kind: 'fixed', typeNames: ['time']}},
  {name: 'uuid', signatures: [signature()], result: {kind: 'fixed', typeNames: ['string']}},
  {name: 'pointer', signatures: [signature(parameter('resource', 'any'))], result: {kind: 'fixed', typeNames: ['Reference']}},
  {name: 'evaluate', signatures: [signature(parameter('context', 'any'), parameter('expression', 'expression'))]},
  {name: 'cc', signatures: [
    signature(parameter('text', 'string')),
    signature(parameter('system', 'string'), parameter('code', 'string'), parameter('display', 'string', {optional: true})),
  ], result: {kind: 'fixed', typeNames: ['CodeableConcept']}},
  {name: 'c', signatures: [signature(parameter('system', 'string'), parameter('code', 'string'), parameter('display', 'string', {optional: true}))], result: {kind: 'fixed', typeNames: ['Coding']}},
  {name: 'qty', signatures: [
    signature(parameter('text', 'string')),
    signature(parameter('value', 'decimal'), parameter('unit', 'string')),
    signature(parameter('value', 'decimal'), parameter('unit', 'string'), parameter('system', 'string'), parameter('code', 'string')),
  ], result: {kind: 'fixed', typeNames: ['Quantity']}},
  {name: 'id', signatures: [signature(parameter('system', 'string'), parameter('value', 'string'), parameter('type', 'string', {optional: true}))], result: {kind: 'fixed', typeNames: ['Identifier']}},
  {name: 'cp', signatures: [
    signature(parameter('value', 'string')),
    signature(parameter('system', 'string'), parameter('value', 'string')),
  ], result: {kind: 'fixed', typeNames: ['ContactPoint']}},
];

export const transformDefinitions: ReadonlyMap<string, TransformDefinition> = new Map(
  definitions.map(definition => [definition.name, definition]),
);

export function resolveTransformResultTypes(transform: TransformInvocationLike): string[] {
  const definition = transformDefinitions.get(transform.type);
  if (!definition?.result) return [];
  const result = definition.result;
  if (result.kind === 'fixed') return [...result.typeNames];

  const signatures = definition.signatures;
  for (const signatureDefinition of signatures) {
    const parameterIndex = signatureDefinition.parameters.findIndex(parameterDefinition => {
      return parameterDefinition.name === result.parameterName;
    });
    if (parameterIndex < 0) continue;
    const actual = transform.parameters.find(parameterValue => {
      return parameterValue.name === result.parameterName;
    }) ?? transform.parameters[parameterIndex];
    if (!actual || typeof actual.value !== 'string') continue;
    const mapped = result.values?.[actual.value] ?? actual.value;
    return mapped ? [mapped] : [];
  }
  return [];
}