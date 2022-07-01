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
    <hr />
    <template v-if="raw.queryCriteria">
      <v-text-field
        label="Previous"
        v-model="raw.queryCriteria.previous"
        :readonly="readonly"
        hide-details="auto"
        @input="notifyChange"
      />
      <v-select
        hide-details="auto"
        label="on create result"
        v-model="raw.queryCriteria.resultForCreate"
        :items="testResults"
      />
      <v-text-field
        label="Current"
        v-model="raw.queryCriteria.current"
        :readonly="readonly"
        hide-details="auto"
        @input="notifyChange"
      />
      <v-select
        hide-details="auto"
        label="on delete result"
        v-model="raw.queryCriteria.resultForDelete"
        :items="testResults"
      />
      <v-checkbox
        v-model="raw.queryCriteria.requireBoth"
        label="Both true"
      ></v-checkbox>
    </template>

    <debuggable-fhir-path-expression :readonly="false"
      label="Expression" :minLines="2" :href="testExpressionPath()"
      :value="raw.fhirPathCriteria" @change="raw.fhirPathCriteria = $event.data"/>
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
