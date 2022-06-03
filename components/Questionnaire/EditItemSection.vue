<template>
  <div class="item-edit-container">
Item type
                                <v-text-field
                                  v-if="raw && raw.status === 'draft'"
                                  label="code"
                                  v-model="v1.code"
                                  hide-details
                                  @input="updateNow"
                                />

Link ID
Definition
Code
prefix
text
enableWhen/enableBehaviour
required
repeats
readonly
max length
valueset
options
initial
child items

(hcx) subtext
(hcx) text rows default
markdown (rich text field)
entry format (placeholder)
max decimal places
max size
max value
mimeType
min length
min value
ordinal Value (weight)
option exclusive
option prefix
orientation (vert/horiz)
constraint (custom validation)
hidden
itemControl
max occurs (when repeat)
min occurs
unit
unit option
unit valueset
regex

variable
launchContext
initial expression
calculated expression
item population context

  </div>
</template>

<style scoped>
.item-edit-container {
  display: grid;
  gap: 12px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

.grid-span-2 {
  grid-column: span 2;
}

.selected > td {
  background-color: #fcf8ff;
  border-top: #9b89b3 solid 2px;
  border-bottom: #9b89b3 solid 2px !important;
}

code {
  overflow-wrap: anywhere;
  min-width: 25ch;
}

</style>

<script lang="ts">
import Vue, { PropType } from "vue";
import { QuestionnaireItem } from "fhir/r4";
import {
  hasExtension,
  hasExtensionAny,
  getExtensionStringValue,
  getExtensionIntegerValue,
} from "fhir-extension-helpers";
import { FlattenedQuestionnaireItem } from "~/models/QuestionnaireTableData";
import { structuredDataCapture } from "~/helpers/structureddatacapture";

interface ComponentData {
  selectedItem?: QuestionnaireItem;
}

export default Vue.extend({
  props: {
    items: Array as PropType<FlattenedQuestionnaireItem[]>, // { type: fhir4.QuestionnaireItem },
  },
  data(): ComponentData {
    return {
      selectedItem: undefined,
    };
  },
  methods: {
    SetSelectedItem(item: any) {
      this.selectedItem = item;
    },
    MinCardinality(item: QuestionnaireItem): string {
      const minOccurs = structuredDataCapture.getMinOccurs(item);
      if (minOccurs) return `${minOccurs}`;
      return item.required ? "1" : "0";
    },

    MaxCardinality(item: QuestionnaireItem): string {
      const maxOccurs = structuredDataCapture.getMaxOccurs(item);
      if (maxOccurs) return `${maxOccurs}`;
      return item.repeats ? "*" : "1";
    },

    Hidden: (item: QuestionnaireItem): boolean => {
      if (structuredDataCapture.getHidden(item) === true) {
        return true;
      }
      return false;
    },

    HasValidations: (item: QuestionnaireItem): boolean => {
      if (item.maxLength) return true;
      if (
        hasExtensionAny(item, 
          [
            structuredDataCapture.exturl_maxDecimalPlaces,
            structuredDataCapture.exturl_minLength,
            structuredDataCapture.exturl_maxSize,
            structuredDataCapture.exturl_minValue,
            structuredDataCapture.exturl_maxValue,
            structuredDataCapture.exturl_mimeType,
            structuredDataCapture.exturl_questionnaire_constraint,
            structuredDataCapture.exturl_questionnaire_min_occurs,
            structuredDataCapture.exturl_questionnaire_max_occurs,
            structuredDataCapture.exturl_questionnaire_optionExclusive,
            structuredDataCapture.exturl_questionnaire_signatureRequired,
            structuredDataCapture.exturl_regex,
          ]
        )
      ) {
        return true;
      }
      return false;
    },

    HasDynamicBehaviours: (item: QuestionnaireItem): boolean => {
      if (item.enableWhen) return true;
      if (item.enableBehavior) return true;
      if (
        hasExtensionAny(item, 
          [
            structuredDataCapture.exturl_questionnaire_enableWhenExpression,
            structuredDataCapture.exturl_questionnaire_calculatedExpression
          ]
        )
      ) {
        return true;
      }
      return false;
    },

    HasPrePopulation: (item: QuestionnaireItem): boolean => {
      if (item.initial) return true;
      var aoWithInitial = item.answerOption?.filter((v, i, arr) => {
        if (v.initialSelected) return true;
        return false;
      });
      if (aoWithInitial && aoWithInitial.length > 0) return true;
      if (
        hasExtensionAny(item, 
          [
            "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-observationLinkPeriod",
            "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-sourceQueries",
            "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-sourceStructureMap",
            structuredDataCapture.exturl_questionnaire_initialExpression,
            structuredDataCapture.exturl_questionnaire_initialExpressionLegacy,
          ]
        )
      ) {
        return true;
      }
      return false;
    },
    HasDataExtrction: (item: QuestionnaireItem): boolean => {
      if (
        hasExtensionAny(item, 
          [
            "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-observationExtract",
            "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-targetStructureMap",
            "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-itemExtractionContext",
            "http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-observation-extract-category",
          ]
        )
      ) {
        return true;
      }
      return false;
    },
    HasVariables: (item: QuestionnaireItem): boolean => {
      if (hasExtension(item, structuredDataCapture.exturl_variable)) {
        return true;
      }
      return false;
    },
  },
});
</script>
