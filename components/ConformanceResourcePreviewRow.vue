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
    <div v-if="data.extendedDescription">
      <code class="fhirpath">{{ data.extendedDescription }}</code>
    </div>
  </span>
</template>

<style scoped>
code.fhirpath {
  margin-top: 4px;
  margin-left: 48px;
  padding: 8px;
  padding-left: 16px;
  display: block;
  font-size: 14px;
}

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
  props: ["data2", "simple", "modelValue", "row"],
  created() {
    this.data = this.row;
    // if (this.$vnode.data) this.data = (this.$vnode.data as any).row;
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
