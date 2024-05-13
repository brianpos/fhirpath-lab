<template>
  <v-simple-table class="table-with-add">
    <tbody>
      <tr class="table-row">
        <th v-show="showAdvancedSettings">ID</th>
        <th>Type</th>
        <th title="Cardinality">Card</th>
        <th colspan="2">Description</th>
      </tr>
      <tr
        class="table-row"
        v-if="items && items.length === 0"
      >
        <td>No groups/questions</td>
      </tr>
      <tr
        class="table-row"
        v-bind:class="item.item.type === 'group' ? 'group' : ''"
        v-for="(item, index) in items"
        v-bind:key="index"
        @click="highlightPath(item.item.linkId)"
      >
        <td v-show="showAdvancedSettings" class="col-linkid">
          {{ item.item.linkId }}
        </td>
        <td class="col-type">
          {{ item.item.type }}
        </td>
        <td class="col-cardinality">
          {{ MinCardinality(item.item) }}..{{ MaxCardinality(item.item) }}
        </td>
        <td class="col-description">
          {{ item.item.text }}
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
          <v-icon
            dense
            title="Dynamic Enable When or Calculated Value"
            v-if="HasDynamicBehaviours(item.item)"
          >
            mdi-arrow-decision
          </v-icon>
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
    </tbody>
  </v-simple-table>
</template>

<style scoped>
.table-with-add > .v-data-table__wrapper > table {
  /* To ensure there is enough space after the table so that the quick action buttons don't get trimmed */
  margin-bottom: 16px !important;
}

.edit-field,
.edit-field div {
  background-color: transparent !important;
  font-size: 14px;
  height: unset;
}

.table-row {
  position: relative;
}

.add-button {
  background-color: #b19cd9 !important;
  right: 0px;
  bottom: -16px;
  z-index: 2;
}

.selected-row > td {
  border-top: solid 2px #b19cd9 !important;
  border-bottom: solid 2px #b19cd9 !important;
  background-color: whitesmoke;
}

.selected > td {
  background-color: #fcf8ff;
  border-top: #9b89b3 solid 2px;
  border-bottom: #9b89b3 solid 2px !important;
}

.col-type {
  width: 20ch;
}

.col-cardinality {
  width: 5ch;
}

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

interface ComponentData {
  selectedItem?: FlattenedQuestionnaireItem;
  hoverItem?: FlattenedQuestionnaireItem;
}

export default Vue.extend({
  props: {
    readonly: Boolean,
    showAdvancedSettings: Boolean,
    items: Array as PropType<FlattenedQuestionnaireItem[]>, // { type: fhir4b.QuestionnaireItem },
  },
  data(): ComponentData {
    return {
      selectedItem: undefined,
      hoverItem: undefined,
    };
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

    Hidden: (item: QuestionnaireItem): boolean => {
      if (structuredDataCapture.getHidden(item) === true) {
        return true;
      }
      return false;
    },

    HasValidations: (item: QuestionnaireItem): boolean => {
      if (item.maxLength) return true;
      if (
        hasExtensionAny(item, [
          structuredDataCapture.exturl_questionnaire_constraint,
        ])
      ) {
        return true;
      }
      return false;
    },

    HasDynamicBehaviours: (item: QuestionnaireItem): boolean => {
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

    HasPrePopulation: (item: QuestionnaireItem): boolean => {
      if (
        hasExtensionAny(item, [
          structuredDataCapture.exturl_questionnaire_sourceQueries,
          structuredDataCapture.exturl_questionnaire_initialExpression,
          structuredDataCapture.exturl_questionnaire_initialExpressionLegacy,
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
});
</script>
