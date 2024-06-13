<template>
  <div>
    <template v-if="questionnaire">
      <v-btn style="position: absolute; right: 42px; z-index: 2; margin-top: 10px;" color="primary"
             title="Show the QuestionnaireResponse based on the data in the Aidbox Forms renderer"
             @click="logResponse()">Show Response
      </v-btn>
      <iframe id="aidbox-forms-renderer" :src="src"></iframe>
    </template>
    <template v-else>
      <p>No questionnaire provided</p>
    </template>
  </div>
</template>

<style scoped>
#aidbox-forms-renderer {
  width: 100%;
  height: calc(100vh - 200px);
  border: 1px solid #efefef;
  border-radius: 4px;
}
</style>

<script lang="ts">
import Vue, {PropType} from "vue";
import {Questionnaire, QuestionnaireResponse} from "fhir/r4";
import {compressToEncodedURIComponent} from "lz-string";

const baseUrl = new URL("https://form-builder.aidbox.app/ui/sdc#/embed?mode=public-builder&sticky-header=false&visible-footer=false&q=");

export default Vue.extend({
  data() {
    return {
      response: null as QuestionnaireResponse | null,

      // Pass the questionnaire to the iframe as a query parameter
      // Further changes to the questionnaire will be sent to the iframe via postMessage
      src: baseUrl + compressToEncodedURIComponent(JSON.stringify(this.questionnaire))
    }
  },
  mounted() {
    window.addEventListener('message', this.handleMessage);
  },
  beforeDestroy() {
    window.removeEventListener('message', this.handleMessage);
  },
  methods: {
    handleMessage(event) {
      if (event.data?.type === 'aidbox-forms/questionnaire-response') {
        // the event is sent from the iframe every time the response is updated either by auto-save or by user submission
        this.response = event.data.data;
      }
    },
    logResponse() {
      this.$emit("response", this.response);
    },
  },
  props: {
    questionnaire: Object as PropType<Questionnaire>,
  },
  watch: {
    questionnaire: {
      handler() {
        if (this.questionnaire?.resourceType === "Questionnaire") {
          const iframe = document.getElementById("aidbox-forms-renderer");

          // Only send the questionnaire to the iframe if it is ready
          if (iframe) {

            // Send the questionnaire to the iframe without full iframe reload
            const message = {
              type: "aidbox-forms/questionnaire",
              data: this.questionnaire,
            };

            iframe.contentWindow.postMessage(message, baseUrl.origin);
          }
        }
      },
    },
  },
});
</script>
