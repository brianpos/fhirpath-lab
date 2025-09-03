<template>
  <div class="test-suite-results">
    <v-data-table
      :headers="headers"
      :items="rows"
      :items-per-page="-1"
      dense
      disable-pagination
      hide-default-footer
      class="elevation-1"
      @click:row="rowClicked"
    >
      <template v-slot:item.statusIcon="{ item }">
        <v-icon v-if="item.status === 'pass'" color="green">mdi-check-circle</v-icon>
        <v-icon v-else-if="item.status === 'fail'" color="red">mdi-close-circle</v-icon>
        <v-icon v-else-if="item.status === 'running'" color="blue">mdi-progress-clock</v-icon>
        <v-icon v-else-if="item.status === 'pending'" color="grey">mdi-clock-outline</v-icon>
        <v-icon v-else color="orange">mdi-alert-circle</v-icon>
      </template>
      <template v-slot:item.expected="{ item }">
        {{ item.expected ? 'true' : 'false' }}
      </template>
      <template v-slot:item.actual="{ item }">
        <span v-if="item.status === 'error'">error<span v-if="item.errorMessage">: {{ truncate(item.errorMessage) }}</span></span>
        <span v-else-if="item.status === 'running'">running…</span>
        <span v-else-if="item.status === 'pending'">—</span>
        <span v-else>{{ item.actual }}</span>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import type { TestResult } from '~/models/InvariantTester';

export default Vue.extend({
  props: {
    results: { type: Array as PropType<TestResult[]>, required: true },
  },
  computed: {
    headers(): Array<any> {
      return [
        { text: 'Status', value: 'statusIcon', width: 80 },
        { text: 'File', value: 'file' },
        { text: 'Expected', value: 'expected', width: 120 },
        { text: 'Actual', value: 'actual', width: 200 },
      ];
    },
    rows(): Array<any> {
      return this.results.map((r) => ({
        status: r.status,
        file: r.testCase.fileName,
        expected: r.testCase.expectedResult,
        actual: Array.isArray(r.actualResult) ? JSON.stringify(r.actualResult) : String(r.actualResult),
        raw: r,
        errorMessage: r.errorMessage,
      }));
    },
  },
  methods: {
    rowClicked(item: any) {
      this.$emit('onResultSelected', item.raw as TestResult);
    },
    truncate(s?: string, len = 60) {
      if (!s) return '';
      return s.length > len ? s.substring(0, len) + '…' : s;
    },
  },
});
</script>

<style scoped>
.test-suite-results {
  width: 100%;
}
</style>
