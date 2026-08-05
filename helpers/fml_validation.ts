import type {
  FmlStructureMap,
  Rule,
  SourcePosition,
  Transform,
  TransformParameter,
} from './fml_models';
import {
  transformDefinitions,
  type TransformDefinition,
  type TransformParameterDefinition,
  type TransformParameterType,
  type TransformSignature,
} from './fml_transform_signatures';

export interface FmlModelDiagnostic {
  severity: 'error' | 'warning' | 'information';
  message: string;
  line: number;
  column: number;
  offendingText?: string;
}

interface SignatureIssue {
  message: string;
  parameter?: TransformParameter;
}

export function validateFmlModel(model: FmlStructureMap): FmlModelDiagnostic[] {
  const diagnostics: FmlModelDiagnostic[] = [];
  for (const group of model.groups) {
    validateRules(group.rules, diagnostics);
  }
  return diagnostics;
}

function validateRules(rules: Rule[], diagnostics: FmlModelDiagnostic[]): void {
  for (const rule of rules) {
    for (const target of rule.targets) {
      if (target.transform?.isInvocation) {
        validateTransform(target.transform, diagnostics);
      }
    }
    if (rule.dependent) {
      validateRules(rule.dependent.rules, diagnostics);
    }
  }
}

function validateTransform(transform: Transform, diagnostics: FmlModelDiagnostic[]): void {
  let hasInvalidExpression = false;
  for (const parameter of transform.parameters) {
    if (parameter.type === 'expression' && transform.type !== 'evaluate') {
      hasInvalidExpression = true;
      diagnostics.push(diagnostic(
        'error',
        "FHIRPath expression parameters are only permitted for the 'evaluate' transform.",
        parameter.position,
        String(parameter.value),
      ));
    }
  }

  const definition = transformDefinitions.get(transform.type);
  if (!definition) {
    diagnostics.push(diagnostic(
      'warning',
      `Unknown transform '${transform.type}'. It may be a custom or newer transform.`,
      transform.position,
      transform.type,
    ));
    return;
  }
  if (hasInvalidExpression) return;

  const candidates = definition.signatures.filter(signature => acceptsParameterCount(signature, transform.parameters.length));
  if (candidates.length === 0) {
    const signatures = definition.signatures.map(signature => formatSignature(definition.name, signature)).join(' or ');
    diagnostics.push(diagnostic(
      'error',
      `Transform '${definition.name}' expects ${signatures}; received ${transform.parameters.length} parameter(s).`,
      transform.position,
      definition.name,
    ));
    return;
  }

  const evaluated = candidates.map(signature => validateSignature(definition.name, signature, transform.parameters));
  const bestMatch = evaluated.reduce((best, current) => current.length < best.length ? current : best);
  for (const issue of bestMatch) {
    diagnostics.push(diagnostic(
      'error',
      issue.message,
      issue.parameter?.position ?? transform.position,
      issue.parameter ? String(issue.parameter.value) : definition.name,
    ));
  }
}

function validateSignature(name: string, signature: TransformSignature, actuals: TransformParameter[]): SignatureIssue[] {
  const issues: SignatureIssue[] = [];
  const assigned = new Map<number, TransformParameter[]>();
  let nextPosition = 0;

  for (const actual of actuals) {
    if (actual.name) {
      const parameterIndex = signature.parameters.findIndex(expected => expected.name === actual.name);
      if (parameterIndex < 0) {
        issues.push({message: `Transform '${name}' has no parameter named '${actual.name}'.`, parameter: actual});
        continue;
      }
      const existing = assigned.get(parameterIndex) ?? [];
      if (existing.length > 0 && !signature.parameters[parameterIndex].variadic) {
        issues.push({message: `Transform '${name}' parameter '${actual.name}' is supplied more than once.`, parameter: actual});
        continue;
      }
      assigned.set(parameterIndex, [...existing, actual]);
      continue;
    }

    while (nextPosition < signature.parameters.length && assigned.has(nextPosition) && !signature.parameters[nextPosition].variadic) {
      nextPosition++;
    }
    const expectedIndex = Math.min(nextPosition, signature.parameters.length - 1);
    const expected = signature.parameters[expectedIndex];
    if (!expected || (nextPosition >= signature.parameters.length && !expected.variadic)) {
      issues.push({message: `Transform '${name}' received too many positional parameters.`, parameter: actual});
      continue;
    }
    assigned.set(expectedIndex, [...(assigned.get(expectedIndex) ?? []), actual]);
    if (!expected.variadic) nextPosition++;
  }

  signature.parameters.forEach((expected, index) => {
    const values = assigned.get(index) ?? [];
    if (values.length === 0 && !expected.optional) {
      issues.push({message: `Transform '${name}' requires parameter '${expected.name}'.`});
      return;
    }
    for (const actual of values) {
      if (!isCompatibleType(expected.type, actual)) {
        issues.push({
          message: `Transform '${name}' parameter '${expected.name}' must be ${expected.type}; received ${actualType(actual)}.`,
          parameter: actual,
        });
      } else if (expected.allowedValues && typeof actual.value === 'string' && !expected.allowedValues.includes(actual.value)) {
        issues.push({
          message: `Transform '${name}' parameter '${expected.name}' must be one of: ${expected.allowedValues.join(', ')}.`,
          parameter: actual,
        });
      }
    }
  });
  return issues;
}

function acceptsParameterCount(signature: TransformSignature, count: number): boolean {
  const required = signature.parameters.filter(parameter => !parameter.optional).length;
  return count >= required && (signature.parameters.some(parameter => parameter.variadic) || count <= signature.parameters.length);
}

function isCompatibleType(expected: TransformParameterType, actual: TransformParameter): boolean {
  if (actual.type === 'identifier') return true;
  if (expected === 'expression') return actual.type === 'expression';
  if (actual.type === 'expression') return false;
  if (expected === 'any') return true;
  if (expected === 'canonical' || expected === 'string') return actual.literalType === 'string';
  if (expected === 'integer') return actual.literalType === 'integer';
  if (expected === 'decimal') return actual.literalType === 'decimal' || actual.literalType === 'integer';
  return false;
}

function actualType(parameter: TransformParameter): string {
  return parameter.type === 'literal' ? parameter.literalType ?? 'literal' : parameter.type;
}

function formatSignature(name: string, signature: TransformSignature): string {
  return `${name}(${signature.parameters.map(formatParameter).join(', ')})`;
}

function formatParameter(parameter: TransformParameterDefinition): string {
  const value = `${parameter.name}: ${parameter.type}${parameter.variadic ? ', ...' : ''}`;
  return parameter.optional ? `[${value}]` : value;
}

function diagnostic(
  severity: FmlModelDiagnostic['severity'],
  message: string,
  position: SourcePosition | undefined,
  offendingText: string,
): FmlModelDiagnostic {
  return {
    severity,
    message,
    line: position?.startLine ?? 1,
    column: position?.startColumn ?? 0,
    offendingText,
  };
}