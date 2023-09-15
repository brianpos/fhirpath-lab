<template>
  <div>
    <template v-if="questionnaire">
      <Renderer :questionnaire="questionnaire" />
    </template>
    <template v-else>
      <p>No questionnaire provided</p>
    </template>
  </div>
</template>

<script lang="ts">
import Vue, {PropType} from "vue";
import {applyReactInVue} from "vuereact-combined";
import {SmartFormsRenderer} from "@aehrc/smart-forms-renderer";
import {Questionnaire} from "fhir/r4b";

export default Vue.extend({
  props: {
    questionnaire: Object as PropType<Questionnaire>
  },
  components: {
    Renderer: applyReactInVue(SmartFormsRenderer)
  },
});
</script>
