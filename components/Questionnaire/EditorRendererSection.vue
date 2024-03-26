<template>
  <div>
    <template v-if="questionnaire">
      <v-btn style="position: absolute; right:34px; z-index: 2; margin-top: 4px;" color="primary"
        title="Show the QuestionnaireResponse based on the data in the CSIRO renderer" @click="logResponse()">Show
        Response</v-btn>
      <div class="q-host">
        <Renderer :questionnaire="questionnaire" :onFocus="onFocus" />
      </div>
    </template>
    <template v-else>
      <p>No questionnaire provided</p>
    </template>
  </div>
</template>

<style scoped>
pre {
  font-size: 0.75em;
}

.q-host {
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(100vh - 200px);
}
</style>

<script lang="ts">
import Vue, { PropType } from "vue";
import { applyReactInVue } from "vuereact-combined";
import { SmartFormsRenderer, getResponse } from "@aehrc/smart-forms-renderer";
import { Questionnaire, QuestionnaireResponse } from "fhir/r4";
import SmartFormsRendererWithFocus from "./ReactRenderer";

export default Vue.extend({
  computed: {
    onFocus() {
      return (linkId: string) => { this.highlightPath(linkId); }
    }
  },
  methods: {
    highlightPath(linkId: string) {
      // console.log('Field focused: ', linkId);
      this.$emit('highlight-path', linkId);
    },
    logResponse() {
      const response = getResponse();
      // this.response = response;
      console.log(response)
      this.$emit('response', response);
    },
  },
  props: {
    questionnaire: Object as PropType<Questionnaire>,
  },
  components: {
    Renderer: applyReactInVue(SmartFormsRendererWithFocus)
  },
});
</script>
