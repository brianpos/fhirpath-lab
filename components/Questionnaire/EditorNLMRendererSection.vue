<template>
  <div>
    <template v-if="questionnaire">
      <v-btn style="position: absolute; right: 34px; z-index: 2; margin-top: 4px;" color="primary"
        title="Show the QuestionnaireResponse based on the data in the LHC-Forms renderer" @click="logResponse()">Show
        Response</v-btn>
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
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Emit, Watch } from 'vue-property-decorator';
import { applyReactInVue } from "vuereact-combined";
import { SmartFormsRenderer, getResponse } from "@aehrc/smart-forms-renderer";
import { Questionnaire, QuestionnaireResponse } from "fhir/r4b";
import { settings } from "~/helpers/user_settings";

import FHIR from "fhirclient";

// Mark in the lforms using the NLM's dynamic loader direct from their site
// (easier maintenance for this test harness)
import { loadLForms } from "lforms-loader";
import { loadFhirResource } from "~/helpers/searchFhir";
import { ContextData } from '../QuestionnaireContext.vue';

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
  function convertFHIRQuestionnaireToLForms(
    questionnaire: Questionnaire,
    fhirVersion: string
  ): any;
  function mergeFHIRDataIntoLForms(
    resourceType: "QuestionnaireResponse",
    response: QuestionnaireResponse,
    lhcQ: any,
    fhirVersion: string
  ): any;
}
declare global {
  interface Window {
    LForms: any;
  }
}

interface LFormsRendererData {
  lforms_error?: string;
}

@Component({
  components: {
    Renderer: applyReactInVue(SmartFormsRenderer)
  }
})
export default class EditorNLMRendererSection extends Vue {
  
  @Prop({ default: ''}) readonly dataServer!: string;
  @Prop(Object) readonly questionnaire!: Questionnaire;
  @Prop() readonly context: ContextData | undefined;
  public lforms_error: string | undefined = '';

  async mounted() {
    try {
      console.log("Importing NLM scripts");
      await loadLForms("36.1.3");
      console.log("Importing NLM scripts done");
    } catch (e) {
      console.error("Error loading LForms", e);
    }

    // Now render the form to the display
    if (window.LForms) {
      // Set the context vars
      const fhirContext = FHIR.client(settings.getFhirServerExamplesUrl());
      let fhirContextVars: any = { };
      if (this.context?.subject?.reference) {
        // fhirContextVars.patient = this.context.subject.reference;
      }
      if (this.context?.author?.reference) {
        // fhirContextVars.user = this.context.author.reference;
      }
      LForms.Util.setFHIRContext(fhirContext, fhirContextVars);

      this.lforms_error = undefined;
      try {
        await LForms.Util.addFormToPage(this.questionnaire, "myFormContainer", {
          prepopulate: false,
        });
      } catch (e: any) {
        console.error("Breaking news:", e);
        this.lforms_error = e.toString();
      }
    }
  }

  logResponse() {
    const response = LForms.Util.getFormFHIRData(
      "QuestionnaireResponse",
      "R4",
      "myFormContainer"
    );
    console.log(response);
    this.$emit("response", response);
  }

  async renderQuestionnaireResponse(response: QuestionnaireResponse, questionnaire: Questionnaire) : Promise<void> {
    this.lforms_error = undefined;
    if (!(response.meta?.tag && response.meta.tag.length > 0 && response.meta.tag[0].code?.startsWith('lformsVersion'))) {
      console.log("Rendering response in lforms Renderer", response);
      try {
      const lhcQ = LForms.Util.convertFHIRQuestionnaireToLForms(questionnaire, "R4");
      const lhcQR = LForms.Util.mergeFHIRDataIntoLForms("QuestionnaireResponse", response, lhcQ, "R4");
      await LForms.Util.addFormToPage(lhcQR, 'myFormContainer', { prepopulate: false });
      }
      catch (e: any) {
        console.error("lforms renderer failed to render:", e);
        this.lforms_error = e.toString();
      }
    }
  }

  // https://github.com/LHNCBC/lforms-fhir-app/blob/157be10a006eb6886c5421c5dd2606e795d8d9d8/source/js/fhir.service.js#L135C55-L136C43
  /*
  From the NLM render component
   *      var fhirContext = FHIR.client(settings.getFhirServerExamplesUrl());
        var fhirContextVars = { LaunchPatient: "Patient/123" };
        LForms.Util.setFHIRContext(fhirContext, fhirContextVars);

        this.lforms_error = undefined;
        await LForms.Util.addFormToPage(this.questionnaire, "myFormContainer", {
          prepopulate: false,
        }).catch((e: any) => {
          console.error("Breaking news:", e);
          this.lforms_error = e.toString();
        });

   */

   async prePopLForms(sourceFhirServer: string, subjectId: string, authorId?: string) {
    console.log("Pre-populating LForms with data from", sourceFhirServer, subjectId, authorId);
    if (window.LForms) {
      // Set the context vars
      const setupServer = {
        serverUrl: sourceFhirServer,
        tokenResponse: { patient: subjectId }
      };
      const fhirContext = FHIR.client(setupServer);
      const fhirContextVars = {};
      LForms.Util.setFHIRContext(fhirContext, fhirContextVars);

      this.lforms_error = undefined;
      try {
        await LForms.Util.addFormToPage(this.questionnaire, "myFormContainer", {
          prepopulate: true,
        });
        // just echo it out - so that it will show the response
        this.logResponse();
      } catch (e: any) {
        console.error("Breaking news:", e);
        this.lforms_error = e.toString();
      }
    }
  }

  @Watch('questionnaire', { immediate: false, deep: true })
  async onQuestionnaireChanged() {
    if (window.LForms && this.questionnaire?.resourceType === "Questionnaire") {
      try {
        this.lforms_error = undefined;
        await LForms.Util.addFormToPage(this.questionnaire, "myFormContainer", {
          prepopulate: false,
        });
      } catch (e: any) {
        console.error("Breaking news:", e);
        this.lforms_error = e.toString();
      }
    }
  }
}
</script>
