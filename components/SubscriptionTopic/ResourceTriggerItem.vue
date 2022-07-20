<template>
  <div class="trigger-item">
    <v-textarea
      label="Description"
      title="Description of the resource trigger"
      v-model="raw.description"
      :readonly="readonly"
      @input="notifyChange"
      auto-grow
      hide-details="auto"
      clearable
      rows="2"
    />
    <span
      class="markdown"
      title="(preview) The Description is shown alongside the Title when a user is selecting the Questionnaire from a directory."
      v-html="convertHtml(raw.description)"
    />
    <v-text-field
      label="Resource"
      v-model="raw.resource"
      :readonly="readonly"
      hide-details="auto"
      @input="notifyChange"
    />

    <v-select
      multiple
      hide-details="auto"
      label="Interaction(s)"
      v-model="raw.supportedInteraction"
      :items="supportedInteractions"
    />
    <debuggable-fhir-path-expression :readonly="false"
      label="Trigger on FHIRPath Expression" :minLines="2" :href="testExpressionPath()"
      :value="raw.fhirPathCriteria" @change="raw.fhirPathCriteria = $event.data"/>

    <template v-if="raw.queryCriteria">
      <div class="results">Query based trigger criteria</div>
      <v-row no-gutters>
      <v-textarea auto-grow rows="1"
        label="Previous"
        v-model="raw.queryCriteria.previous"
        :readonly="readonly"
        hide-details="auto"
        @input="notifyChange"
      />
      <v-select style="max-width:20ch"
        hide-details="auto"
        label="On create Previous considered"
        v-model="raw.queryCriteria.resultForCreate"
        :items="testResults"
      />
      </v-row>
      <v-row no-gutters>
      <v-textarea auto-grow rows="1"
        label="Current"
        v-model="raw.queryCriteria.current"
        :readonly="readonly"
        hide-details="auto"
        @input="notifyChange"
      />
      <v-select style="max-width:20ch"
        hide-details="auto"
        label="On delete Current considered"
        v-model="raw.queryCriteria.resultForDelete"
        :items="testResults"
      />
      </v-row>
      <v-checkbox
        v-model="raw.queryCriteria.requireBoth" hide-details="auto" dense
        label="Previous and Current rules required"
      ></v-checkbox>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.trigger-item:focus-within {
  border-color: $card-header-color;
}

.trigger-item {
  border: 2px solid transparent;
  padding: 4px;
}

.results {
  padding: 4px 12px;
  background-color: $tab-backcolor;
  color: $tab-color;
  font-size: 0.875em;
  font-weight: 700;
  justify-content: stretch;
  text-transform: uppercase;
  line-height: 1.5;
}
</style>

<script lang="ts">
import Vue, { PropType } from "vue";
import { marked } from "marked";

interface TriggerData {
  supportedInteractions: string[];
  testResults: string[];
}

export default Vue.extend({
  props: {
    readonly: Boolean,
    raw: Object as PropType<fhir4.SubscriptionTopicResourceTrigger>,
  },
  methods: {
    notifyChange() {
      this.$emit("update");
    },
    /** Convert the parameter data into a HTML from markdown format */
    convertHtml(field: string | undefined): string {
      if (!field) return "";
      return marked(field);
    },
    testExpressionPath() {
      if (this.raw?.resource){
        return `../FhirPath?exampletype=${this.raw?.resource?.replace('http://hl7.org/fhir/StructureDefinition/','')}&expression=${encodeURIComponent(this.raw?.fhirPathCriteria ?? '')}`;
      }
      return `../FhirPath?expression=${encodeURIComponent(this.raw?.fhirPathCriteria??'')}`;
    },
  },
  data(): TriggerData {
    return {
      supportedInteractions: ["create", "update", "delete"],
      testResults: ["test-passes", "test-fails"],
    };
  },
});
</script>
