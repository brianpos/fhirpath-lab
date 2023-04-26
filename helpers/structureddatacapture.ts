import { Questionnaire, QuestionnaireItem, Element, CodeableConcept } from "fhir/r4"
import extensionHelpers from "fhir-extension-helpers";

/** Helper methods  */
export namespace structuredDataCapture {
    /* Extension URLs used in the Structure Data Capture IG */

    export const exturl_display = "http://hl7.org/fhir/StructureDefinition/display";
    export const exturl_questionnaire_hidden = "http://hl7.org/fhir/StructureDefinition/questionnaire-hidden";
    export const exturl_markdown = "http://hl7.org/fhir/StructureDefinition/rendering-markdown";
    export const exturl_entryFormat = "http://hl7.org/fhir/StructureDefinition/entryFormat";
    export const exturl_questionnaire_unit = "http://hl7.org/fhir/StructureDefinition/questionnaire-unit";
    export const exturl_questionnaire_itemControl = "http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl";
    export const exturl_questionnaire_choiceOrientation = "http://hl7.org/fhir/StructureDefinition/questionnaire-choiceOrientation";

    /* Validation related extensions*/
    export const exturl_maxDecimalPlaces = "http://hl7.org/fhir/StructureDefinition/maxDecimalPlaces";
    export const exturl_minLength = "http://hl7.org/fhir/StructureDefinition/minLength";
    export const exturl_maxSize = "http://hl7.org/fhir/StructureDefinition/maxSize";
    export const exturl_minValue = "http://hl7.org/fhir/StructureDefinition/minValue";
    export const exturl_maxValue = "http://hl7.org/fhir/StructureDefinition/maxValue";
    export const exturl_questionnaire_min_occurs = "http://hl7.org/fhir/StructureDefinition/questionnaire-minOccurs";
    export const exturl_questionnaire_max_occurs = "http://hl7.org/fhir/StructureDefinition/questionnaire-maxOccurs";
    export const exturl_mimeType = "http://hl7.org/fhir/StructureDefinition/mimeType";
    export const exturl_questionnaire_constraint = "http://hl7.org/fhir/StructureDefinition/questionnaire-constraint";
    export const exturl_questionnaire_optionExclusive = "http://hl7.org/fhir/StructureDefinition/questionnaire-optionExclusive";
    export const exturl_questionnaire_signatureRequired = "http://hl7.org/fhir/StructureDefinition/questionnaire-signatureRequired";
    export const exturl_regex = "http://hl7.org/fhir/StructureDefinition/regex";

    export const exturl_terminology_server = "http://hl7.org/fhir/StructureDefinition/terminology-server";
    export const exturl_terminology_server_legacy = "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-preferredTerminologyServer";
    export const exturl_variable = "http://hl7.org/fhir/StructureDefinition/variable";

    /* Dynamic behaviour extensions */
    export const exturl_questionnaire_enableWhenExpression = "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-enableWhenExpression";
    export const exturl_questionnaire_calculatedExpression = "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression";

    /* Pre-population extensions */
    export const exturl_questionnaire_observationLinkPeriod = "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-observationLinkPeriod";
    export const exturl_questionnaire_sourceQueries = "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-sourceQueries";
    export const exturl_questionnaire_initialExpression = "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-initialExpression";
    export const exturl_questionnaire_initialExpressionLegacy = "http://hl7.org/fhir/StructureDefinition/questionnaire-initialExpression";
    export const exturl_questionnaire_sourceStructureMap = "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-sourceStructureMap";

    /* Data extract extensions */
    export const exturl_questionnaire_observationExtract = "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-observationExtract";
    export const exturl_questionnaire_targetStructureMap = "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-targetStructureMap";
    export const exturl_questionnaire_itemExtractionContext = "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-itemExtractionContext";
    export const exturl_questionnaire_observation_extract_category = "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-observation-extract-category";


    /** Read the display value for a Canonical property extension: http://hl7.org/fhir/StructureDefinition/display */
    export function getDisplay(element: Element | undefined): string | undefined {
        return extensionHelpers.getExtensionStringValue(element, exturl_display);
    }

    export function setDisplay(element: Element, value: string) {
        return extensionHelpers.setExtension(element, { url: exturl_display, valueString: value });
    }

    export function getEntryFormat(element: Element | undefined): string | undefined {
        return extensionHelpers.getExtensionStringValue(element, exturl_entryFormat);
    }

    export function setEntryFormat(element: Element, value: string) {
        return extensionHelpers.setExtension(element, { url: exturl_entryFormat, valueString: value });
    }


    export function getHidden(item?: QuestionnaireItem): boolean | undefined {
        return extensionHelpers.getExtensionBooleanValue(item, exturl_questionnaire_hidden);
    }

    export function setHidden(item: QuestionnaireItem, value: boolean | undefined) {
        extensionHelpers.setExtension(item, { url: exturl_questionnaire_hidden, valueBoolean: value });
    }

    export function getMarkdown(element: Element | undefined): string | undefined {
        return extensionHelpers.getExtensionStringValue(element, exturl_markdown);
    }

    export function setMarkdown(element: Element, value: string) {
        return extensionHelpers.setExtension(element, { url: exturl_markdown, valueString: value });
    }

    export function getItemControl(element: Element | undefined): CodeableConcept | undefined {
        return extensionHelpers.getExtensionCodeableConceptValue(element, exturl_questionnaire_itemControl);
    }

    export function setItemControl(element: Element, value: CodeableConcept) {
        return extensionHelpers.setExtension(element, { url: exturl_questionnaire_itemControl, valueCodeableConcept: value });
    }

    export function getChoiceOrientation(element: Element | undefined): string | undefined {
        return extensionHelpers.getExtensionCodeValue(element, exturl_questionnaire_choiceOrientation);
    }

    export function setChoiceOrientation(element: Element, value: string) {
        return extensionHelpers.setExtension(element, { url: exturl_questionnaire_choiceOrientation, valueCode: value });
    }
    

    /** Get the Item Control value as defined in the Hl7 namespace */
    export function getItemControlFhirCore(element: Element | undefined): string | undefined {
        const cc = extensionHelpers.getExtensionCodeableConceptValue(element, exturl_questionnaire_itemControl);
        if (cc?.coding) {
            var coding = cc.coding[0];
            if (coding.system === "http://hl7.org/fhir/questionnaire-item-control") {
                // HL7 defined control types
                return coding.code;
            }
        }
        return undefined;
    }

    export function getUnit(item?: QuestionnaireItem): fhir4b.Coding | undefined {
        return extensionHelpers.getExtensionCodingValue(item, exturl_questionnaire_unit);
    }

    export function setUnit(item: QuestionnaireItem, value: fhir4b.Coding | undefined) {
        extensionHelpers.setExtension(item, { url: exturl_questionnaire_unit, valueCoding: value });
    }

    /** This will return the Preferred Terminology Server URL - with backward compatibility */
    export function getPreferredTerminologyServer(element: Element | undefined): string | undefined {
        return extensionHelpers.getExtensionUrlValue(element, exturl_terminology_server)
        ?? extensionHelpers.getExtensionUrlValue(element, exturl_terminology_server_legacy);
    }

    /** Sets the Preferred Terminology Server  
     * http://hl7.org/fhir/StructureDefinition/terminology-server (which is an unapplied change for R5)
    */
    export function setPreferredTerminologyServer(element: Element, value: string) {
        return extensionHelpers.setExtension(element, { url: exturl_terminology_server, valueString: value });
    }


    // ----------------------------------------------------------------------
    export function getMinOccurs(item?: QuestionnaireItem): number | undefined {
        return extensionHelpers.getExtensionIntegerValue(item, exturl_questionnaire_min_occurs);
    }

    export function getMaxOccurs(item?: QuestionnaireItem): string | undefined {
        return extensionHelpers.getExtensionStringValue(item, exturl_questionnaire_max_occurs);
    }
}
