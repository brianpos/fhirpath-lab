<template>
  <div style="position: relative">
    <template v-if="questionnaire">
      <div>
        <code
          v-text="
            JSON.stringify(
              questionnaireResponseStore.updatableResponse,
              null,
              2
            )
          "
        />
      </div>
      <v-btn
        style="position: fixed; right: 34px; z-index: 2"
        color="primary"
        @click="logResponse()"
        >Log response</v-btn
      >
      <Renderer :questionnaire="questionnaire" />
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
</style>

<script lang="ts">
import Vue, { PropType } from "vue";
import { applyReactInVue } from "vuereact-combined";
import { SmartFormsRenderer, getResponse } from "@aehrc/smart-forms-renderer";
import { Questionnaire } from "fhir/r4";
import { questionnaireResponseStoreVue } from "~/helpers/renderer_stores";

export default Vue.extend({
  data() {
    return {
      questionnaireResponseStore: questionnaireResponseStoreVue,
    };
  },
  methods: {
    logResponse() {
      const response = getResponse();
      // this.response = response;
      console.log(response);
      this.$emit("response", response);
    },
  },
  props: {
    questionnaire: Object as PropType<Questionnaire>,
  },
  components: {
    Renderer: applyReactInVue(SmartFormsRenderer),
  },
});
</script>
