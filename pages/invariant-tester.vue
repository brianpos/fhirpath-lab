<template>
  <div>
    <HeaderNavbar />

    <div class="container" style="padding-top: 84px;">
      <h2>Invariant Tester</h2>
      <p class="mb-2">
        Test a FHIRPath invariant against the official HL7 FHIR test cases — runs using server engines to support XML.
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon small v-bind="attrs" v-on="on"><v-icon small>mdi-information</v-icon></v-btn>
          </template>
          <span>Resource metadata loads from build.fhir.org; test cases load from the HL7 FHIR GitHub repository.</span>
        </v-tooltip>
      </p>

      <InvariantSelector
        :disabled="busy"
        :initialResourceType="resourceType"
        :initialInvariantId="invariantId"
        :autoLoad="true"
        @onLoad="onLoadSelection"
      />

      <v-alert type="error" outlined v-if="errorMessage" class="mt-3">{{ errorMessage }}</v-alert>

      <v-card class="mt-4" outlined>
        <v-card-title>
          Candidate Expression
          <v-spacer />
          <v-select
            class="mr-3"
            dense
            outlined
            hide-details
            style="max-width: 220px"
            :items="engineOptions"
            v-model="engine"
            label="Engine"
          />
          <span v-if="running" class="mr-3" style="min-width:60px; text-align:right; display:inline-block;">{{ progressLabel }}</span>
          <v-btn :disabled="!canRun || busy" color="primary" :loading="running" @click="runAllTests">Run All Tests</v-btn>
        </v-card-title>
        <v-card-text>
          <v-textarea
            v-model="candidateExpression"
            outlined
            dense
            rows="4"
            placeholder="Enter a FHIRPath expression (should return boolean)"
          />
        </v-card-text>
      </v-card>

      <v-card class="mt-4" outlined>
        <v-card-title>
          Test Suite Results
          <v-spacer />
          <v-progress-circular v-if="loadingCases" indeterminate size="20" />
        </v-card-title>
        <v-card-text>
          <TestSuiteResults :results="results" @onResultSelected="selectResult" />
        </v-card-text>
      </v-card>

      <v-expand-transition>
        <v-card v-if="selectedResult" class="mt-4" outlined>
          <v-card-title>
            Details — {{ selectedResult.testCase.fileName }}
            <v-spacer />
            <v-chip :color="chipColor(selectedResult)" text-color="white" small>{{ selectedResult.status }}</v-chip>
          </v-card-title>
          <v-card-text>
            <div class="mb-2"><b>Expected:</b> {{ selectedResult.testCase.expectedResult }}</div>
            <div class="mb-2"><b>Actual:</b> {{ selectedResult.actualResult }}</div>
            <div v-if="selectedResult.errorMessage" class="mb-2"><b>Error:</b> {{ selectedResult.errorMessage }}</div>
            <v-divider class="my-3" />
            <div v-if="selectedResult.testCase.resourceXml">
              <b>Resource XML:</b>
              <pre class="code-block">{{ selectedResult.testCase.resourceXml }}</pre>
            </div>
            <div v-else>
              <b>Resource JSON:</b>
              <pre class="code-block">{{ pretty(selectedResult.testCase.resourceJson) }}</pre>
            </div>
          </v-card-text>
        </v-card>
      </v-expand-transition>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HeaderNavbar from '~/components/HeaderNavbar.vue';
import InvariantSelector from '~/components/InvariantSelector.vue';
import TestSuiteResults from '~/components/TestSuiteResults.vue';
import type { TestCase, TestResult } from '~/models/InvariantTester';
import { fetchTestCases } from '~/helpers/invariantTestSuiteApi';
import { evaluateExpression, coerceParametersToBoolean } from '~/helpers/fhirpathEngine';

export default Vue.extend({
  components: { HeaderNavbar, InvariantSelector, TestSuiteResults },
  data() {
    return {
      resourceType: undefined as string | undefined,
      invariantId: undefined as string | undefined,
      candidateExpression: '' as string,
      testCases: [] as TestCase[],
      results: [] as TestResult[],
      selectedResult: undefined as TestResult | undefined,
      loadingCases: false,
      running: false,
      errorMessage: '',
      engine: 'HAPI (R6)' as 'HAPI (R6)' | 'HAPI (R5)' | 'fhirpath.js',
      completedCount: 0,
    };
  },
  computed: {
    busy(): boolean { return this.loadingCases || this.running; },
    canRun(): boolean { return !!this.candidateExpression && this.testCases.length > 0; },
    engineOptions(): Array<string> { return ['HAPI (R6)', 'HAPI (R5)', 'fhirpath.js']; },
    progressLabel(): string { return this.running ? `${this.completedCount}/${this.testCases.length}` : ''; },
  },
  mounted() {
    const resource = this.$route.query.resource as string | undefined;
    const invariant = this.$route.query.invariant as string | undefined;
    if (resource && invariant) {
      this.resourceType = resource;
      this.invariantId = invariant;
      this.loadCases(resource, invariant);
    }
  },
  methods: {
    async onLoadSelection(sel: { resourceType: string; invariantId: string; expression?: string }) {
      this.resourceType = sel.resourceType;
      this.invariantId = sel.invariantId;
      if (!this.candidateExpression && sel.expression) this.candidateExpression = sel.expression;
      this.pushUrl(sel.resourceType, sel.invariantId);
      await this.loadCases(sel.resourceType, sel.invariantId);
    },
    pushUrl(resource: string, invariant: string) {
      try {
        const ret: any = this.$router.push({ path: this.$route.path, query: { ...this.$route.query, resource, invariant } } as any);
        if (ret && typeof ret.catch === 'function') { ret.catch(() => {}); }
      } catch {}
    },
    async loadCases(resource: string, invariant: string) {
      this.errorMessage = '';
      this.testCases = [];
      this.results = [];
      this.selectedResult = undefined;
      this.loadingCases = true;
      try {
        this.testCases = await fetchTestCases(resource, invariant);
        if (this.testCases.length === 0) {
          this.errorMessage = 'No test cases found for this invariant.';
        }
      } catch (e) {
        this.errorMessage = 'Failed to load test cases.';
      } finally {
        this.loadingCases = false;
      }
    },
    normalizeToBoolean(fpResult: any): { value?: boolean; error?: string } {
      // Server response: array of entries with parts (prefer 'result')
      if (Array.isArray(fpResult) && fpResult.length > 0 && (fpResult[0] && typeof fpResult[0] === 'object' && 'parts' in fpResult[0])) {
        return coerceParametersToBoolean(fpResult as any);
      }
      // Server response (single object form)
      if (Array.isArray(fpResult?.parts)) {
        return coerceParametersToBoolean([fpResult] as any);
      }
      // Local engine: fhirpath.js array semantics
      if (Array.isArray(fpResult)) {
        try {
          if (fpResult.length === 0) return { value: false };
          if (fpResult.length === 1 && typeof fpResult[0] === 'boolean') return { value: fpResult[0] };
          return { error: 'Non-boolean result' };
        } catch { return { error: 'Non-boolean result' }; }
      }
      if (typeof fpResult === 'boolean') return { value: fpResult };
      return { error: 'Non-boolean result' };
    },
    async runAllTests() {
      if (!this.candidateExpression) return;
      this.running = true;
      // seed placeholder rows
      this.results = this.testCases.map(tc => ({ testCase: tc, actualResult: undefined, status: 'pending' } as any));
      this.selectedResult = undefined;
      this.completedCount = 0;
      try {
        for (let i = 0; i < this.testCases.length; i++) {
          const tc = this.testCases[i];
          // mark running
          const runningRow = { ...(this.results[i] as any), status: 'running' } as TestResult;
          this.$set(this.results, i, runningRow);
          try {
            let res: any;
            const hasXml = !!tc.resourceXml;
            let selectedEngine = this.engine;
            if (selectedEngine === 'fhirpath.js' && hasXml) { selectedEngine = 'HAPI (R6)'; }
            if (selectedEngine === 'HAPI (R6)') {
              res = await evaluateExpression({ expression: this.candidateExpression, resourceJson: tc.resourceJson, resourceUrl: tc.resourceUrl, resourceXml: tc.resourceXml, engine: 'java-hapi-r6' });
            } else if (selectedEngine === 'HAPI (R5)') {
              res = await evaluateExpression({ expression: this.candidateExpression, resourceJson: tc.resourceJson, resourceUrl: tc.resourceUrl, resourceXml: tc.resourceXml, engine: 'java-hapi-r5' });
            } else {
              if (!tc.resourceJson) throw new Error('Local engine requires JSON testcase');
              res = await evaluateExpression({ expression: this.candidateExpression, resourceJson: tc.resourceJson, engine: 'fhirpath.js' });
            }
            const norm = this.normalizeToBoolean(res);
            if (norm.error) {
              this.$set(this.results, i, { testCase: tc, actualResult: res, status: 'error', errorMessage: norm.error });
            } else {
              const status: 'pass' | 'fail' = norm.value === tc.expectedResult ? 'pass' : 'fail';
              this.$set(this.results, i, { testCase: tc, actualResult: norm.value, status });
            }
          } catch (e) {
            this.$set(this.results, i, { testCase: tc, actualResult: undefined, status: 'error', errorMessage: String(e) });
          } finally {
            this.completedCount++;
          }
        }
      } finally {
        this.running = false;
      }
    },
    selectResult(r: TestResult) { this.selectedResult = r; },
    pretty(obj: any): string { try { return JSON.stringify(obj, null, 2); } catch { return String(obj); } },
    chipColor(r: TestResult): string { if (r.status === 'pass') return 'green'; if (r.status === 'fail') return 'red'; return 'orange'; },
  },
});
</script>

<style scoped>
.code-block { background: #1e1e1e; color: #ddd; padding: 12px; border-radius: 4px; white-space: pre-wrap; }
</style>
