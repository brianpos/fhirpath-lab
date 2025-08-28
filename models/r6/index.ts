import { Model } from "fhirpath";
import updateWithGeneratedData from 'fhirpath/fhir-context/general-additions.js';
import { choiceTypePaths} from './choiceTypePaths';
import { path2Type } from './path2Type';
import { type2Parent } from './type2Parent';
import { resourcesWithUrlParam } from './resourcesWithUrlParam';
import { pathsDefinedElsewhere } from './pathsDefinedElsewhere';

// Simple utility to convert array to hash object
function arrToHash(arr: string[]): Record<string, boolean> {
  return arr.reduce((acc, item) => {
    acc[item] = true;
    return acc;
  }, {} as Record<string, boolean>);
}


/**
 *  Exports the FHIR model data for R6.  This is an internal structure that
 *  will likely evolve as more FHIR specific processing is added.
 */
let tempModel:any = {
  version: 'r6',
  score: {
    // See
    // - https://hl7.org/fhir/R5/codesystem.html#defined-props
    // - https://hl7.org/fhir/codesystem-concept-properties.html
    propertyURI: 'http://hl7.org/fhir/concept-properties#itemWeight',
    // See
    // - https://www.hl7.org/fhir/extensions/StructureDefinition-itemWeight.html
    // - https://build.fhir.org/ig/HL7/fhir-extensions/StructureDefinition-itemWeight.html
    extensionURI: ['http://hl7.org/fhir/StructureDefinition/itemWeight']
  },
  /**
   *  A hash of resource element paths (e.g. Observation.value) that are known
   *  to point to fields that are choice types.
   */
  choiceTypePaths: choiceTypePaths,

  /**
   *  A hash from paths to the path for which their content is defined, e.g.
   *  Questionnaire.item.item -> Questionnaire.item.
   */
  pathsDefinedElsewhere: pathsDefinedElsewhere,
  /**
   * Mapping data types to parent data types.
   */
  type2Parent: type2Parent,
  /**
   * Mapping paths to data types.
   */
  path2Type: path2Type,
  /**
   * A hash with FHIR resource types that support the 'url' search parameter.
   * The data is loaded from the resourcesWithUrlParam.json file.
   */
  resourcesWithUrlParam: arrToHash(resourcesWithUrlParam)
};

updateWithGeneratedData(tempModel);

const modelInfo: Model = tempModel;

export default modelInfo;
