<template>
  <v-card flat>
    <v-card-text>
      <p class="fl-tab-header">Details</p>
      <v-form>
        <v-text-field label="Title" v-if="(raw.resourceType !== 'SearchParameter')" v-model="raw.title" :readonly="readonly" hide-details="auto"
          @input="notifyChange" />
        <v-checkbox v-show="showAdvancedSettings" label="Experimental" v-model="raw.experimental" :readonly="readonly"
          dense hide-details="auto" @click="notifyChange" />

        <v-textarea label="Description" v-if="!readonly"
          title="The Description is shown alongside the Title when a user is selecting the Questionnaire from a directory. This field supports Markdown formatting"
          v-model="raw.description" :readonly="readonly" @input="notifyChange" auto-grow hide-details="auto" :clearable="!readonly"
          rows="2" />
          <label class="v-label theme--light bare-label" v-if="readonly">Description</label>
        <span class="markdown"
          title="(preview) The Description is shown alongside the Title when a user is selecting the Questionnaire from a directory."
          v-html="convertHtml(raw.description)" />
          <br/>

        <v-textarea label="Purpose" v-if="!readonly"
          title="The Purpose describes why this Questionnaire was created. This field supports Markdown formatting"
          v-model="raw.purpose" :readonly="readonly" @input="notifyChange" auto-grow hide-details="auto" :clearable="!readonly"
          rows="2" />
          <label class="v-label theme--light bare-label" v-if="readonly">Purpose</label>
        <span class="markdown" title="(preview) The Purpose describes why this Questionnaire was created."
          v-html="convertHtml(raw.purpose)" />
          <br/>

        <v-text-field label="Name" v-show="(showAdvancedSettings && raw.resourceType !=='SubscriptionTopic')" v-model="raw.name" :readonly="readonly"
          hide-details="auto" @input="notifyChange" spellcheck="false" />

        <span class="field-label">Use Context:</span><span v-text="raw.useContext" /> <br />

        <slot name="extension"></slot>
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
