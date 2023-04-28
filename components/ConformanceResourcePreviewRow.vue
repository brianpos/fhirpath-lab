<template>
  <span v-if="data">
    <div v-if="data.description && data.description != data.title">
      <span v-html="convertHtml(data.description)"></span>
    </div>
    <div v-if="data.url">
      <code v-if="data.url"
        >{{ data.url
        }}<template v-if="data.version">|{{ data.version }}</template></code
      >
    </div>
    <div v-if="data.publisher">
      <span class='label'>Publisher:</span> {{ data.publisher }}
    </div>
    <div v-if="data.date">
      <span class='label'>Published:</span> {{ data.date }}
    </div>
    <!-- <span v-if="data.markDownDescription">Description: {{ data.markDownDescription }}</span> -->
    <!-- <code>{{ JSON.stringify(data, null, 2) }}</code> -->
  </span>
</template>

<style scoped>
.label{
  color: lightslategray;
}
code {
word-break: break-all;
color: #6f42c1
}
</style>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Extension, Questionnaire } from "fhir/r4b";
import {
  hasExtension,
  hasExtensionAny,
  getExtensionStringValue,
  getExtensionIntegerValue,
} from "fhir-extension-helpers";
import { ConformanceResourceTableData } from "~/models/ConformanceResourceTableData";
import { marked } from "marked";
import { formatDate } from "~/helpers/datetime";

export default Vue.extend({
  props: ["data2", "simple", "modelValue"],
  created() {
    if (this.$vnode.data) this.data = (this.$vnode.data as any).row;
    // console.log(this.data);
  },
  methods: {
    convertHtml(field: string | undefined): string {
      if (!field) return "";
      const result = marked(field);
      // console.log(result);
      return result;
    },
    formatDate(
      fhirDateTime: string | undefined,
      emptyMessage?: string
    ): string {
      return formatDate(fhirDateTime, emptyMessage);
    },
  },
  data() {
    return {
      data: undefined as ConformanceResourceTableData | undefined,
    };
  },
});
</script>
