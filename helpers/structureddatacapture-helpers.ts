import {
  Questionnaire,
  QuestionnaireItem,
  Element,
  CodeableConcept,
} from "fhir/r4b";
import extensionHelpers from "fhir-extension-helpers";
import { structuredDataCapture as sdc2 } from "./structureddatacapture";
import { structuredDataCapture as sdc } from "fhir-sdc-helpers";

/** Helper methods  */
export namespace structuredDataCaptureHelpers {
  /* Helper methods for working with SDC content */

  /** Does the questionnaire include any properties supporting pre-population */
  export function hasPrePopulation(
    questionnaire: Questionnaire | null
  ): boolean {
    if (!questionnaire) return false;
    if (
      extensionHelpers.hasExtensionAny(questionnaire, [
        sdc.exturl_ObservationLinkPeriodExtension,
        sdc.exturl_LaunchContextExtension,
        sdc.exturl_SourceQueriesExtension,
        sdc.exturl_SourceStructureMapExtension,
        sdc.exturl_TargetStructureMapExtension,
      ])
    )
      return true;
    return false;
  }

  /** Does the questionnaire include any properties supporting data extract */
  export function hasDataExtract(questionnaire: Questionnaire | null): boolean {
    if (!questionnaire) return false;
    if (
      extensionHelpers.hasExtensionAny(questionnaire, [
        sdc.exturl_TargetStructureMapExtension,
        sdc.exturl_ObservationExtractExtension,
        "http://hl7.org/fhir/StructureDefinition/extension-Questionnaire.item.definition",
        sdc.exturl_ItemExtractionContextExtension,
      ])
    )
      return true;
    if (questionnaire.item && hasDataExtractInItems(questionnaire.item))
      return true;
    return false;
  }

  function hasDataExtractInItems(items: QuestionnaireItem[]): boolean {
    for (let item of items) {
      if (hasDataExtractInItem(item)) return true;
      if (item.item && hasDataExtractInItems(item.item)) return true;
    }
    return false;
  }

  function hasDataExtractInItem(item: QuestionnaireItem): boolean {
    if (item.definition) return true;
    if (
      extensionHelpers.hasExtensionAny(item, [
        sdc.exturl_ObservationExtractExtension,
        sdc.exturl_ObservationExtractCategory,
        sdc.exturl_ItemExtractionContextExtension,
      ])
    )
      return true;

    // Check if any codes are marked for extraction
    if (item.code && item.code.length > 0) {
      for (let code of item.code) {
        if (
          extensionHelpers.hasExtension(
            code,
            sdc.exturl_ObservationExtractExtension
          )
        )
          return true;
      }
    }
    return false;
  }
}
