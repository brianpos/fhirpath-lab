<template>
  <div style="position: relative">
    <template v-if="questionnaire">
      <v-btn
        style="position: fixed; right: 34px; z-index: 2"
        color="primary"
        @click="logResponse()"
        >Show Response</v-btn
      >
      <div id="myFormContainer"></div>
      <div class="errors" v-show="lforms_error != undefined">
        <h5>Errors rendering questionnaire:</h5>
        <div>{{ lforms_error }}</div>
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
</style>

<script lang="ts">
import Vue, { PropType } from "vue";
import { applyReactInVue } from "vuereact-combined";
import { SmartFormsRenderer, getResponse } from "@aehrc/smart-forms-renderer";
import { Questionnaire, QuestionnaireResponse } from "fhir/r4";

import FHIR from "fhirclient";

// Mark in the lforms using the NLM's dynamic loader direct from their site
// (easier maintenance for this test harness)
import { loadLForms } from "lforms-loader";
import { loadFhirResource } from "~/helpers/searchFhir";

declare namespace LForms.Util {
  function addFormToPage(
    questionnaire: Questionnaire,
    formId: string,
    options: object
  ): Promise<void>;
  function setFHIRContext(fhirContext: any, fhirContextVars: any): void;
  function getFormFHIRData(
    resourceType: "QuestionnaireResponse", //
    fhirVersion: string,
    formId: string
  ): QuestionnaireResponse;
}
declare global {
  interface Window {
    LForms: any;
  }
}

interface LFormsRendererData {
  lforms_error?: string;
}

export default Vue.extend({
  // data() {
  //   return {
  //     response: null as QuestionnaireResponse | null,
  //   };
  // },
  async mounted() {
    console.log("Importing NLM scripts");
    await loadLForms("34.3.1");
    console.log("Importing NLM scripts done");

    // Set the context vars
    var fhirContext = FHIR.client(
      "https://sqlonfhir-r4.azurewebsites.net/fhir"
    );
    var fhirContextVars = { LaunchPatient: "Patient/123" };
    LForms.Util.setFHIRContext(fhirContext, fhirContextVars);

    // Now render the form to the display
    if (window.LForms) {
      this.lforms_error = undefined;
      await LForms.Util.addFormToPage(
        this.questionnaire,
        "myFormContainer",
        {}
      ).catch((e: any) => {
        console.error("Breaking news:", e);
        this.lforms_error = e.toString();
      });
    }
  },
  methods: {
    logResponse() {
      const response = LForms.Util.getFormFHIRData(
        "QuestionnaireResponse",
        "R4",
        "myFormContainer"
      );
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
  watch: {
    questionnaire: {
      immediate: true,
      handler() {
        if (window.LForms) {
          this.lforms_error = undefined;
          LForms.Util.addFormToPage(
            this.questionnaire,
            "myFormContainer",
            {}
          ).catch((e: any) => {
            console.error("Breaking news:", e);
            this.lforms_error = e.toString();
          });
        }
      },
    },
  },
  data(): LFormsRendererData {
    return {
      lforms_error: undefined,
    };
  },
});
</script>
