<template>
  <v-simple-table>
    <tbody>
      <template v-for="(item, index) in items">
        <tr
          v-if="HasDynamicBehaviours(item.item)"
          v-bind:class="item.item.type === 'group' ? 'group' : ''"
          v-bind:key="index"
          @click="highlightPath(item.item.linkId)"
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
              <code
                v-if="item.item.answerValueSet"
                v-text="item.item.answerValueSet"
              />
              <template v-if="item.item.answerOption">
                <template v-for="(ao, ao_index) in item.item.answerOption">
                  <span :key="'ao' + ao_index" v-if="ao.valueCoding">
                    <span v-bind:title="ao.valueCoding.system">
                      [{{ ao.valueCoding.code }}]
                    </span>
                    {{ ao.valueCoding.display
                    }}<template
                      v-if="
                        item.item.answerOption &&
                        ao_index !== item.item.answerOption.length - 1
                      "
                      ><br
                    /></template>
                  </span>
                </template>
              </template>
            </template>
          </td>
          <td>
            <v-icon
              dense
              title="Dynamic Enable When or Calculated Value"
              v-if="HasDynamicBehaviours(item.item)"
            >
              mdi-arrow-decision
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
import { QuestionnaireItem } from "fhir/r4b";
import { hasExtension, hasExtensionAny } from "fhir-extension-helpers";
import { FlattenedQuestionnaireItem } from "~/models/QuestionnaireTableData";
import { structuredDataCapture } from "~/helpers/structureddatacapture";

export default Vue.extend({
  props: {
    items: Array as PropType<FlattenedQuestionnaireItem[]>,
  },
  methods: {
    highlightPath(linkId: string) {
      this.$emit('highlight-path', linkId);
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

    HasDynamicBehaviours: (item: QuestionnaireItem): boolean => {
      if (item.enableWhen) return true;
      if (item.enableBehavior) return true;
      if (
        hasExtensionAny(item, [
          structuredDataCapture.exturl_questionnaire_enableWhenExpression,
          structuredDataCapture.exturl_questionnaire_calculatedExpression,
        ])
      ) {
        return true;
      }
      return false;
    },
  },
});
</script>
