<template>
  <div>
    <Renderer :questionnaire="questionnaire"/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {applyReactInVue} from "vuereact-combined";
import {SmartFormsRenderer} from "@aehrc/smart-forms-renderer";
import QTest from "~/components/TestQues.json";

export default Vue.extend({
  data() {
    return {
      questionnaire: QTest,
    }
  },
  components: {
    Renderer: applyReactInVue(SmartFormsRenderer)
  },
});
</script>
