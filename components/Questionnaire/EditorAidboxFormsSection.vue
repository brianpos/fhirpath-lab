<template>
  <div>
    <template v-if="questionnaire">
      <aidbox-form-renderer
        style="width: 100%; height: calc(100vh - 200px); border: 1px solid #efefef; border-radius: 4px; display: block"
        :questionnaire="JSON.stringify(questionnaire)"
        :questionnaire-response="JSON.stringify(questionnaireResponse)"
        @change="handleChange"
      />
    </template>
    <template v-else>
      <p>No questionnaire provided</p>
    </template>
  </div>
</template>

<script lang="ts">
import Vue, {PropType} from "vue";
import {Questionnaire, QuestionnaireResponse} from "fhir/r4";


function loadScript(src) {
  return new Promise((resolve, reject) => {
    const tag = document.createElement('script');
    tag.setAttribute('src', src);
    tag.setAttribute('async', false);
    tag.setAttribute('defer', true);
    tag.addEventListener('error', reject);
    tag.addEventListener('load', resolve);
    document.body.appendChild(tag);
  });
}

let loaded = null;

export default Vue.extend({
  mounted() {
    if (!loaded) {
      loaded = loadScript('https://form-builder.aidbox.app/static/aidbox-forms-renderer-webcomponent.js');
    }
  },
  methods: {
    handleChange(event) {
      const response = event.detail;
      if (response.status !== 'in-progress') {
        this.$emit("response", response);
      }
    }
  },
  props: {
    questionnaire: Object as PropType<Questionnaire>,
    questionnaireResponse: Object as PropType<QuestionnaireResponse>,
  },
});
</script>
