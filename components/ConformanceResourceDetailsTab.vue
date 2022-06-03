<template>
  <v-card flat>
    <v-card-text>
      <p class="fl-tab-header">Details</p>
      <v-form>
        <v-text-field
          label="Title"
          v-model="raw.title"
          :readonly="readonly"
          hide-details="auto"
          @input="notifyChange"
        />
        <v-checkbox
          v-show="showAdvancedSettings"
          label="Experimental"
          v-model="raw.experimental"
          :readonly="readonly"
          dense
          hide-details="auto"
          @click="notifyChange"
        />

        <v-textarea
          label="Description"
          title="The Description is shown alongside the Title when a user is selecting the Questionnaire from a directory. This field supports Markdown formatting"
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

        <v-textarea
          label="Purpose"
          title="The Purpose describes why this Questionnaire was created. This field supports Markdown formatting"
          v-model="raw.purpose"
          :readonly="readonly"
          @input="notifyChange"
          auto-grow
          hide-details="auto"
          clearable
          rows="2"
        />
        <span
          class="markdown"
          title="(preview) The Purpose describes why this Questionnaire was created."
          v-html="convertHtml(raw.purpose)"
        />

        <v-text-field
          label="Name"
          v-show="showAdvancedSettings"
          v-model="raw.name"
          :readonly="readonly"
          hide-details="auto"
          @input="notifyChange"
        />

        <span class="field-label">Use Context:</span
        ><span v-text="raw.useContext" /> <br />
      </v-form>
    </v-card-text>
  </v-card>
</template>

<style>
</style>

<script lang="ts">
import Vue, { PropType } from "vue";
import { ConformanceResourceInterface } from "~/models/ConformanceResourceInterface";
import { marked } from "marked";
import { expandValueSet, splitCanonical } from "~/helpers/searchFhir";
import { settings } from "~/helpers/user_settings";

export default Vue.extend({
  mounted() {
    this.initializeDropdowns();
  },
  props: {
    readonly: Boolean,
    showAdvancedSettings: Boolean,
    raw: Object as PropType<ConformanceResourceInterface>,
  },
  methods: {
    async initializeDropdowns() {
      const stgs = settings.load();

    },
    notifyChange() {
      this.$emit("update");
    },
    /** Convert the parameter data into a HTML from markdown format */
    convertHtml(field: string | undefined): string {
      if (!field) return "";
      return marked(field);
    },
  },
});
</script>
