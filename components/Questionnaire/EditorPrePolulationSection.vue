<template>
  <v-simple-table>
    <tbody>
      <template v-for="(item, index) in items">
        <tr
          v-if="
            HasPrePopulation(item.item) ||
            HasVariables(item.item)
          "
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
              v-for="(vo, vo_index) in readVariables(item.item.extension)"
            >
              <span :key="'vo' + vo_index">
                <br />
                <code>%{{ vo.name }}</code> = <code>{{ vo.expression }}</code
                ><template v-if="vo.language"> ({{ vo.language }})</template>
              </span>
            </template>
            <template v-if="HasPrePopulation(item.item)">
              <template
                v-for="(vo, vo_index) in readExpressions(item.item.extension)"
              >
                <span :key="'vo' + vo_index">
                  <br />
                  <code>{{ vo.expression }}</code
                  ><template v-if="vo.language"> ({{ vo.language }})</template>
                </span>
              </template>
              <template v-if="readInitialValue(item.item.initial)">
                <br />
                Initial Value = {{ readInitialValue(item.item.initial) }}
              </template>

              <template v-if="item.item.answerOption">
                <template v-for="(ao, vo_index) in item.item.answerOption">
                  <span v-if="ao.initialSelected" :key="'ao' + vo_index">
                    <br />
                    Initial Option Selected =
                    <code>{{
                      ao.valueString || ao.valueInteger || ao.valueCoding
                    }}</code>
                  </span>
                </template>
              </template>
            </template>
          </td>
          <td>
            <v-icon
              dense
              title="Has Pre-populations"
              v-if="HasPrePopulation(item.item)"
            >
              mdi-tray-arrow-down
            </v-icon>
            <v-icon
              dense
              title="Has processing variables"
              v-if="HasVariables(item.item)"
            >
              mdi-application-variable-outline
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
import {
  Extension,
  QuestionnaireItem,
  QuestionnaireItemInitial,
} from "fhir/r4";
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

    readVariables(from: Extension[] | undefined): fhir4.Expression[] {
      if (!from) return [];
      var result: fhir4.Expression[] = [];
      for (let ext of from) {
        if (ext.url === structuredDataCapture.exturl_variable) {
          if (ext.valueExpression) result.push(ext.valueExpression);
        }
      }
      return result;
    },

    readInitialValue(
      initialValues: QuestionnaireItemInitial[] | undefined
    ): string {
      if (!initialValues || initialValues.length == 0) return "";

      return initialValues
        .map((initial) => {
          if (initial.valueBoolean)
            return initial.valueBoolean ? "true" : "false";
          if (initial.valueDecimal) return initial.valueDecimal?.toString();
          if (initial.valueInteger) return initial.valueInteger?.toString(10);
          if (initial.valueDate) return initial.valueDate;
          if (initial.valueDateTime) return initial.valueDateTime;
          if (initial.valueTime) return initial.valueTime;
          if (initial.valueString) return "'" + initial.valueString + "'";
          if (initial.valueUri) return initial.valueUri;
          if (initial.valueAttachment)
            return JSON.stringify(initial.valueAttachment);
          if (initial.valueCoding) return JSON.stringify(initial.valueCoding);
          if (initial.valueQuantity)
            return JSON.stringify(initial.valueQuantity);
          if (initial.valueReference)
            return JSON.stringify(initial.valueReference);
          return "";
        })
        .join(", ");
    },

    readExpressions(from: Extension[] | undefined): fhir4.Expression[] {
      if (!from) return [];
      var result: fhir4.Expression[] = [];
      for (let ext of from) {
        if (
          ext.url ===
            structuredDataCapture.exturl_questionnaire_initialExpression ||
          ext.url ===
            structuredDataCapture.exturl_questionnaire_initialExpressionLegacy
        ) {
          if (ext.valueExpression) result.push(ext.valueExpression);
        }
      }
      return result;
    },

    HasPrePopulation: (item: QuestionnaireItem): boolean => {
      if (item.initial) return true;
      var aoWithInitial = item.answerOption?.filter((v, i, arr) => {
        if (v.initialSelected) return true;
        return false;
      });
      if (aoWithInitial && aoWithInitial.length > 0) return true;
      if (
        hasExtensionAny(item, [
          structuredDataCapture.exturl_questionnaire_observationLinkPeriod,
          structuredDataCapture.exturl_questionnaire_sourceQueries,
          structuredDataCapture.exturl_questionnaire_initialExpression,
          structuredDataCapture.exturl_questionnaire_initialExpressionLegacy,
          structuredDataCapture.exturl_questionnaire_sourceStructureMap,
        ])
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
};
</script>
