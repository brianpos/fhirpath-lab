<template>
  <v-simple-table>
    <tbody>
      <template v-for="(item, index) in items">
        <tr
          v-if="HasValidations(item.item) || item.item.type === 'group'"
          v-bind:class="item.item.type === 'group' ? 'group' : ''"
          v-bind:key="index"
        >
          <td class="col-linkid">
            <span :title="item.item.text"> {{ item.item.linkId }}</span>
          </td>
          <td>{{ item.item.type }}</td>
          <td class="col-cardinality">
            {{ MinCardinality(item.item) }}..{{ MaxCardinality(item.item) }}
          </td>
          <td class="col-description">
            {{ item.item.text }}
            <template
              v-if="
                item.item.type === 'choice' || item.item.type === 'open-choice'
              "
            >
              <br />
            </template>
          </td>
          <td>
            <v-icon title="Read only field" dense v-if="item.item.readOnly">
              mdi-lock-outline
            </v-icon>
            <v-icon title="Hidden field" dense v-if="Hidden(item.item)">
              mdi-eye-off-outline
            </v-icon>
            <v-icon title="Validations" dense v-if="HasValidations(item.item)">
              mdi-format-list-checks
            </v-icon>
          </td>
        </tr>
      </template>
    </tbody>
  </v-simple-table>
</template>

<style scoped>
.col-description,
.col-linkid {
  min-width: 20ch;
}
.group {
  background-color: #b19cd920;
}
code {
  overflow-wrap: anywhere;
  min-width: 25ch;
}
td {
  vertical-align: top;
  height: unset !important;
  padding: 8px !important;
}
</style>

<script lang="ts">
import Vue, { PropType } from "vue";
import { QuestionnaireItem } from "fhir/r4";
import { hasExtension, hasExtensionAny } from "fhir-extension-helpers";
import { FlattenedQuestionnaireItem } from "~/models/QuestionnaireTableData";
import { structuredDataCapture } from "~/helpers/structureddatacapture";

export default {
  props: {
    items: Array as PropType<FlattenedQuestionnaireItem[]>, // { type: fhir4.QuestionnaireItem },
  },
  methods: {
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
      if (structuredDataCapture.getHidden(item)) {
        return true;
      }
      return false;
    },

    HasValidations: (item: QuestionnaireItem): boolean => {
      if (item.maxLength) return true;
      if (
        hasExtensionAny(item, [
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
        ])
      ) {
        return true;
      }
      return false;
    },
  },
};
</script>
