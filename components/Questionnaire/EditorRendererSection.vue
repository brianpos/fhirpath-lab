<template>
  <div>
    <template v-if="questionnaire">
      <Renderer :questionnaire="questionnaire"/>
      <v-btn color="primary" @click="logResponse()">Log response</v-btn>
<!--      <div>-->
<!--        <pre>{{ JSON.stringify(response, null, 2) }}</pre>-->
<!--      </div>-->
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
import Vue, {PropType} from "vue";
import {applyReactInVue} from "vuereact-combined";
import {SmartFormsRenderer, getResponse} from "@aehrc/smart-forms-renderer";
import {Questionnaire, QuestionnaireResponse} from "fhir/r4";

export default Vue.extend({
  // data() {
  //   return {
  //     response: null as QuestionnaireResponse | null,
  //   };
  // },
  methods: {
    logResponse() {
      const response = getResponse();
      // this.response = response;
      console.log(response)
    }
  },
  props: {
    questionnaire: Object as PropType<Questionnaire>
  },
  components: {
    Renderer: applyReactInVue(SmartFormsRenderer)
  },
});
</script>
