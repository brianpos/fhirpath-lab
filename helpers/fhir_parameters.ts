export function convertParametersToNative(parameters: fhir4b.Parameters): Record<string, any> {
  console.log('convertToNative', parameters);
  const result = convertParameterListToNative(parameters.parameter ?? []);
  console.log('convertToNative result', result);
  return result;
}

function convertParameterListToNative(parameters: fhir4b.ParametersParameter[]): Record<string, any> {
  const result: Record<string, any> = {};
  const collectionNames = new Set<string>();

  for (const parameter of parameters) {
    const value = convertParameterToNative(parameter);
    if (!Object.prototype.hasOwnProperty.call(result, parameter.name)) {
      result[parameter.name] = value;
    } else if (collectionNames.has(parameter.name)) {
      result[parameter.name].push(value);
    } else {
      result[parameter.name] = [result[parameter.name], value];
      collectionNames.add(parameter.name);
    }
  }

  return result;
}

function convertParameterToNative(parameter: fhir4b.ParametersParameter): any {
  if (parameter.part) {
    return convertParameterListToNative(parameter.part);
  }

  for (const [propertyName, value] of Object.entries(parameter)) {
    if (propertyName.startsWith('value') && value !== undefined) {
      return value;
    }
  }

  return parameter.resource ?? parameter.extension;
}