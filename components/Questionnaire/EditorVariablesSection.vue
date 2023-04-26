<template>
  <div>
    Global Variables:
    <v-simple-table>
      <tbody>
        <tr
          v-for="(item, index) in readVariables(questionnaire)"
          v-bind:key="index"
        >
          <td>
            <code>%{{ item.name }}</code> = <code>{{ item.expression }}</code
            ><template v-if="item.language"> ({{ item.language }})</template>
          </td>
        </tr>
      </tbody>
    </v-simple-table>

    Item Context Variables:
    <v-simple-table>
      <tbody>
        <tr
          v-bind:class="item.item.type === 'group' ? 'group' : ''"
          v-for="(item, index) in filteredItems()"
          v-bind:key="index"
        >
          <td>{{ item.item.linkId }}</td>
          <td>{{ item.item.type }}</td>
          <td>
            {{ MinCardinality(item.item) }}..{{ MaxCardinality(item.item) }}
          </td>
          <td>
            {{ item.item.text }}
            <template v-for="(vo, vo_index) in readVariables(item.item)">
              <span :key="'vo' + vo_index">
                <br />
                <code>%{{ vo.name }}</code> = <code>{{ vo.expression }}</code
                ><template v-if="vo.language"> ({{ vo.language }})</template>
              </span>
            </template>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  </div>
</template>

<style scoped>
.group {
  background-color: #b19cd920;
}
td {
  vertical-align: top;
  height: unset !important;
  padding: 8px !important;
}
</style>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Questionnaire, QuestionnaireItem } from "fhir/r4b";
import { hasExtension } from "fhir-extension-helpers";
import { FlattenedQuestionnaireItem } from "~/models/QuestionnaireTableData";
import { structuredDataCapture } from "fhir-sdc-helpers";

export default Vue.extend({
  props: {
    questionnaire: Object as PropType<Questionnaire>,
    items: Array as PropType<FlattenedQuestionnaireItem[]>, // { type: fhir4b.QuestionnaireItem },
  },
  methods: {
    filteredItems(): FlattenedQuestionnaireItem[] {
      return this.items.filter(
        (
          a: FlattenedQuestionnaireItem,
          b: number,
          c: FlattenedQuestionnaireItem[]
        ) => {
          if (a.item) return this.HasVariables(a.item);
          return false;
        }
      );
    },

    readVariables(from: fhir4b.Element | undefined): fhir4b.Expression[] {
      if (!from) return [];
      return structuredDataCapture.getVariables(from) ?? [];
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

    HasVariables: (item: QuestionnaireItem): boolean => {
      if (hasExtension(item, structuredDataCapture.exturl_Variable)) {
        return true;
      }
      return false;
    },
  },
});
</script>
