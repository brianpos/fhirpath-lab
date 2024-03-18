<template>
  <div>
    <template v-if="questionnaire">
      <v-btn style="position: absolute; right: 34px; z-index: 2; margin-top: 4px;" color="primary"
        title="Show the QuestionnaireResponse based on the data in the LHC-Forms renderer"
        @click="logResponse()">Show Response</v-btn>
      <div class="q-host">
        <div id="myFormContainer"></div>
        <div class="errors" v-show="lforms_error != undefined">
          <h5>Errors rendering questionnaire:</h5>
          <div>{{ lforms_error }}</div>
        </div>
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
import { settings } from "~/helpers/user_settings";

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
    formId: string,
    options?: object
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
    try {
      console.log("Importing NLM scripts");
      await loadLForms("34.3.1");
      console.log("Importing NLM scripts done");
    }
    catch (e) {
      console.error("Error loading LForms", e);
    }

    // Set the context vars
    var fhirContext = FHIR.client(settings.getFhirServerExamplesUrl());
    var fhirContextVars = { LaunchPatient: "Patient/123" };
    LForms.Util.setFHIRContext(fhirContext, fhirContextVars);

    // Now render the form to the display
    if (window.LForms) {
      this.lforms_error = undefined;
      await LForms.Util.addFormToPage(this.questionnaire, "myFormContainer", {
        prepopulate: false,
      }).catch((e: any) => {
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
        if (window.LForms && this.questionnaire?.resourceType === "Questionnaire") {
          try {
            this.lforms_error = undefined;
            LForms.Util.addFormToPage(this.questionnaire, "myFormContainer", {
              prepopulate: false,
            }).catch((e: any) => {
              console.error("Breaking news:", e);
              this.lforms_error = e.toString();
            });
          } catch (e) {
            console.error("Breaking news:", e);
            this.lforms_error = e.toString();
          }
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
