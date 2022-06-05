<style lang="scss" scoped >
tr.ve-table-body-tr {
  cursor: pointer;
}

.tool-button {
  max-width: 10ch;
}

.progress-button {
  max-width: 25px;
}

.fl-toolbar {
  margin-bottom: 6px;
}

.result-type {
  border-bottom: silver 1px solid;
}

.result-value {
  width: 100%;
  border-bottom: silver 1px solid;
}

.results {
  padding: 4px 12px;
  color: white;
  font-style: bold;
  font-size: 1.25rem;
  line-height: 1.5;
  background-color: $card-header-color;
}

.context {
  border-bottom: silver 1px solid;
  background-color: $tab-backcolor;
}

.empty-data {
  display: flex;
  align-items: center;
  justify-content: center;
  height: min(200px, 80vh);
  width: 100%;
  color: #666;
  font-size: 16px;
  border: 1px solid #eee;
  border-top: 0;
}

.code-json {
  white-space: pre-wrap;
}
</style>

<template>
  <div>
    <HeaderNavbar @close-settings="settingsClosed" :extended="false">
      <template v-slot:extension>
        <!-- <search-navigator
          label="Library"
          :count="totalCount"
          :enableFirst="!!firstPageLink"
          :enablePrevious="!!previousPageLink"
          :enableNext="!!nextPageLink"
          :enableLast="!!lastPageLink"
          :first="firstPage"
          :previous="previousPage"
          :next="nextPage"
          :last="lastPage"
          :add="addNew"
          :showAdd="true"
        /> -->
      </template>
    </HeaderNavbar>

    <div class="container-fluid bd-layout" style="padding-top: 80px">
      <v-card>
        <v-toolbar flat color="primary">
          <v-toolbar-title>{{ resourceId }}</v-toolbar-title>
          <v-spacer />
          <v-btn icon accesskey="g" title="press alt+g to go" @click="evaluateFhirPathExpression">
            <v-icon>
              mdi-play
            </v-icon>
          </v-btn>
        </v-toolbar>
        <v-tabs vertical v-model="tab">
          <v-tab>
            <v-icon left> mdi-function-variant </v-icon>
            Expression
          </v-tab>
          <v-tab>
            <v-icon left> mdi-clipboard-text-outline </v-icon>
            Resource
          </v-tab>
          <v-tab :disabled="(traceData.length === 0)">
            <v-icon left> mdi-format-list-bulleted </v-icon>
            Trace
          </v-tab>
          <v-tab>
            <v-icon left> mdi-bug-outline </v-icon>
            Debug
          </v-tab>

          <v-tabs-items touchless v-model="tab">
            <v-tab-item>
              <!-- Expression -->
              <v-card flat>
                <v-card-text>
                  <p class="fl-tab-header">Expression</p>
                  <v-textarea label="Context Expression" v-model="contextExpression" hide-details="auto" rows="1"
                    auto-grow />
                  <v-textarea label="Fhirpath Expression" v-model="fhirpathExpression" hide-details="auto" rows="3"
                    auto-grow />
                  <div class="results">RESULTS</div>
                  <template v-for="(r2, i1) in results">
                    <v-simple-table :key="i1">
                      <tr v-if="r2.context">
                        <td class="context" colspan="2">
                          <div>Context: <b>{{ r2.context }}</b></div>
                        </td>
                      </tr>
                      <template v-for="(v1, index) in r2.result">
                        <tr :key="index">
                          <td class="result-type">{{ v1.type }}</td>
                          <td class="result-value">
                            <div class="code-json">{{ v1.value }}</div>
                          </td>
                        </tr>
                      </template>
                    </v-simple-table>
                  </template>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <!-- Resource -->
              <v-card flat>
                <v-card-text>
                  <p class="fl-tab-header">Resource</p>
                  <v-text-field label="Test Resource Id" v-model="resourceId" hide-details="auto">
                    <template v-slot:append>
                      <v-btn icon small tile @click="resourceId = undefined">
                        <v-icon> mdi-close </v-icon>
                      </v-btn>
                      <v-btn icon small tile @click="downloadTestResource">
                        <v-icon> mdi-download </v-icon>
                      </v-btn>
                    </template>
                  </v-text-field>
                  <v-textarea v-model="resourceJson" rows="16" />
                  <v-text-field label="Terminology Server" v-model="terminologyServer" hide-details="auto" />
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <!-- Trace -->
              <v-card flat>
                <v-card-text>
                  <p class="fl-tab-header">Trace</p>
                  <template v-for="(r2, i1) in results">
                    <v-simple-table :key="i1">
                      <tr v-if="r2.context">
                        <td class="context" colspan="2">
                          <div>Context: <b>{{ r2.context }}</b></div>
                        </td>
                      </tr>
                      <template v-for="(v1, index) in r2.trace">
                        <tr :key="index">
                          <td class="result-type">{{ v1.name }}</td>
                        <td class="result-value">
                            <div class="code-json">{{ v1.value }}</div>
                        </td>
                        </tr>
                      </template>
                    </v-simple-table>
                  </template>
                  <v-simple-table>
                    <template v-for="(v1, index) in traceData">
                      <tr :key="index">
                        <td class="result-type">{{ v1.name }}</td>
                        <td class="result-value">
                            <div class="code-json">{{ v1.value }}</div>
                        </td>
                      </tr>
                    </template>
                  </v-simple-table>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <!-- Resource -->
              <v-card flat>
                <v-card-text>
                  <p class="fl-tab-header">Debug</p>
                  <v-textarea v-model="resultJson" rows="20" />
                </v-card-text>
              </v-card>
            </v-tab-item>

          </v-tabs-items>
        </v-tabs>
      </v-card>
      <br />
      <OperationOutcomeOverlay v-if="showOutcome" :saveOutcome="saveOutcome" :showOutcome="showOutcome"
        title="Error Evaluating" @close="clearOutcome" />
    </div>
    <table-loading v-if="loadingData" />
    <!-- <code class="code-json">{{ JSON.stringify(results, null, 4) }}</code> -->
  </div>
</template>

<script lang="ts">
import Vue, { VNode } from "vue";
import { settings } from "~/helpers/user_settings";
import {
  requestFhirAcceptHeaders,
} from "~/helpers/searchFhir";
import axios, { AxiosResponse } from "axios";
import { AxiosError } from "axios";
import { CancelTokenSource } from "axios";

interface FhirPathData {
  raw?: fhir4.Parameters;
  resourceId?: string;
  resourceJson?: string;
  contextExpression?: string;
  fhirpathExpression?: string;
  loadingData: boolean;
  resultJson?: string;
  resultText?: string;
  traceText?: string;
  saveOutcome?: fhir4.OperationOutcome;
  showOutcome?: boolean;
  showAdvancedSettings: boolean;
  terminologyServer: string;
  cancelSource?: CancelTokenSource;
  tab: any;
  traceData: TraceData[];
  results: ResultData[];
}

interface ResultItem {
  type: string;
  value: any;
}

interface ResultData {
  context?: string;
  result: ResultItem[];
  trace: TraceData[];
}

interface TraceData {
  name: string;
  value: string;
}

function getValue(entry: fhir4.ParametersParameter): ResultItem[] {
  let result: ResultItem[] = [];
  var myMap = new Map(Object.entries(entry));
  for (let [k, v] of myMap.entries()) {
    if (k.startsWith('value'))
      result.push({ type: k, value: v });
    else if (k == 'resource')
      result.push({ type: (v as fhir4.Resource).resourceType, value: v });
  }
  return result;
}

export default Vue.extend({
  head: {
    title: "FhirPath",
  },
  async mounted() {
    this.showAdvancedSettings = settings.showAdvancedSettings();
    // await this.downloadTestResource();
    await this.evaluateFhirPathExpression();
  },
  methods: {
    settingsClosed() {
      this.showAdvancedSettings = settings.showAdvancedSettings();
    },

    clearOutcome() {
      this.showOutcome = undefined;
    },

    async executeRequest<T>(url: string) {
      try {
        if (this.cancelSource) this.cancelSource.cancel("new search started");
        this.cancelSource = axios.CancelToken.source();
        this.loadingData = true;
        let token = this.cancelSource.token;
        const response = await axios.get<fhir4.Parameters>(url, {
          cancelToken: token,
          headers: { "Accept": requestFhirAcceptHeaders }
        });
        if (token.reason) {
          console.log(token.reason);
          return;
        }
        this.cancelSource = undefined;
        this.loadingData = false;

        const results = response.data;
        if (results) {
          this.raw = results;
          this.resultJson = JSON.stringify(results, null, 4);
          this.resultText = '';
          this.results = [];
          if (this.raw.parameter) {
            let contextLessResultItem: ResultData = { context: '', result: [], trace: [] };
            if (!this.contextExpression)
              this.results.push(contextLessResultItem);
            for (var entry of this.raw.parameter) {
              if (entry.name === 'result') {
                if (this.contextExpression) {
                  this.resultText += `${entry.valueString}\r\n${entry.part ? JSON.stringify(entry.part, null, 4) : ''}\r\n`;
                  let resultItem: ResultData = { context: entry.valueString, result: [], trace: [] };
                  if (entry.part) {
                    for (var part of entry.part) {
                      resultItem.result.push(...getValue(part));
                    }
                  }
                  this.results.push(resultItem);
                }
                else {
                  var myMap = new Map(Object.entries(entry));
                  for (let [k, v] of myMap.entries()) {
                    if (k.startsWith('value')) {
                      this.resultText += JSON.stringify(v);
                      contextLessResultItem.result.push({ type: k, value: v });
                    }
                    else if (k == 'resource') {
                      this.resultText += JSON.stringify(v);
                      contextLessResultItem.result.push({ type: v.resourceType, value: v });
                    }
                  }
                }
              }
              if (entry.name === 'trace') {
                if (!this.contextExpression) {
                  this.traceData.push({ name: entry.valueString ?? '??', value: JSON.stringify(entry.part, null, 4) });
                  contextLessResultItem.trace.push({ name: entry.valueString ?? '??', value: JSON.stringify(entry.part, null, 4) });
                }
                else {
                  this.traceData.push({ name: entry.valueString ?? '??', value: JSON.stringify(entry.part, null, 4) });
                }
              }
            }
          }
        } else {
          // host.tableData = [];
          // host.showEmpty = true;
        }
      } catch (err) {
        this.loadingData = false;
        if (axios.isAxiosError(err)) {
          const serverError = err as AxiosError<fhir4.OperationOutcome>;
          if (serverError && serverError.response) {
            this.saveOutcome = serverError.response.data;
            this.showOutcome = true;
            return serverError.response.data;
          }
        } else {
          console.log("Client Error:", err);
        }
      }
    },

    async downloadTestResource() {
      try {
        if (!this.resourceId) return;

        if (this.cancelSource) this.cancelSource.cancel("new download started");
        this.cancelSource = axios.CancelToken.source();
        this.loadingData = true;
        let token = this.cancelSource.token;
        const response = await axios.get<fhir4.Resource>(this.resourceId, {
          cancelToken: token,
          headers: { "Accept": requestFhirAcceptHeaders }
        });
        if (token.reason) {
          console.log(token.reason);
          return;
        }
        this.cancelSource = undefined;
        this.loadingData = false;

        const results = response.data;
        if (results) {
          this.resourceJson = JSON.stringify(results, null, 4);
        }
      } catch (err) {
        this.loadingData = false;
        if (axios.isAxiosError(err)) {
          const serverError = err as AxiosError<fhir4.OperationOutcome>;
          if (serverError && serverError.response) {
            this.saveOutcome = serverError.response.data;
            this.showOutcome = true;
            return serverError.response.data;
          }
        } else {
          console.log("Client Error:", err);
        }
      }
    },

    // https://www.sitepoint.com/fetching-data-third-party-api-vue-axios/
    async evaluateFhirPathExpression() {
      let url = `https://qforms-server.azurewebsites.net/$fhirpath?expression=${encodeURI(this.fhirpathExpression ?? 'today()')}`;
      if (this.resourceId) {
        url += `&resource=${encodeURI(this.resourceId)}`;
      }
      if (this.contextExpression) {
        url += `&context=${encodeURI(this.contextExpression)}`;
      }
      if (this.terminologyServer) {
        url += `&terminologyserver=${encodeURI(this.terminologyServer)}`;
      }
      this.traceData = [];
      await this.executeRequest(url);
    },
  },
  data(): FhirPathData {
    return {
      tab: null,
      raw: undefined,
      resourceId: 'https://sqlonfhir-r4.azurewebsites.net/fhir/Patient/example',
      resourceJson: undefined,
      contextExpression: 'name',
      fhirpathExpression: "trace('nerd').given",
      loadingData: true,
      resultJson: undefined,
      resultText: undefined,
      traceText: undefined,
      showOutcome: false,
      showAdvancedSettings: false,
      terminologyServer: 'https://sqlonfhir-r4.azurewebsites.net/fhir',
      traceData: [],
      results: [],
    };
  },
});
</script>
