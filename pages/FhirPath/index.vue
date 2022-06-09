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
    <table-loading v-if="loadingData" />

    <div class="container-fluid bd-layout" style="padding-top: 80px">
      <v-card>
        <v-toolbar flat color="primary">
          <v-toolbar-title>{{ tabTitle() }}</v-toolbar-title>
          <v-spacer />
          <v-select class="engineselector" :items="executionEngines" v-model="selectedEngine" hide-details="auto"
            @change="evaluateFhirPathExpression" />
          <v-btn icon accesskey="g" title="press alt+g to go" @click="evaluateFhirPathExpression">
            <v-icon>
              mdi-play
            </v-icon>
          </v-btn>
        </v-toolbar>
        <v-row dense>
          <v-col>
        <v-tabs vertical v-model="tab">
          <v-tab>
            <v-icon left> mdi-function-variant </v-icon>
            Expression
          </v-tab>
              <v-tab class="left-resource">
            <v-icon left> mdi-clipboard-text-outline </v-icon>
            Resource
          </v-tab>
          <v-tab :disabled="!hasTraceData()">
            <v-icon left> mdi-format-list-bulleted </v-icon>
            Trace
          </v-tab>
          <v-tab v-show="showAdvancedSettings">
            <v-icon left> mdi-bug-outline </v-icon>
            Debug
          </v-tab>

          <v-tabs-items touchless v-model="tab">
            <v-tab-item>
              <!-- Expression -->
              <v-card flat>
                <v-card-text>
                  <p class="fl-tab-header">Expression</p>
                  <v-textarea label="Context Expression (optional)" v-model="contextExpression" hide-details="auto"
                    rows="1" auto-grow />
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
                          <td class="result-value">
                            <div class="code-json">{{ v1.value }}</div>
                          </td>
                          <td class="result-type"><i v-if="v1.type">({{ v1.type }})</i></td>
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
                  <v-textarea v-model="resourceJson" rows="16"
                        label="Test Resource JSON (optional, if Resource ID provided)" persistent-placeholder
                        placeholder='{
    "resourceType": "Patient",
    "id": "example",
    ...'>
                    <template v-slot:append>
                      <v-btn icon small tile @click="resourceJson = undefined">
                        <v-icon> mdi-close </v-icon>
                      </v-btn>
                    </template>
                  </v-textarea>
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
                        <td class="context" colspan="3">
                          <div>Context: <b>{{ r2.context }}</b></div>
                        </td>
                      </tr>
                      <template v-for="(v1, index) in r2.trace">
                        <tr :key="index">
                          <td class="result-type"><b>{{ v1.name }}</b></td>
                          <td class="result-value">
                            <div class="code-json">{{ v1.value }}</div>
                          </td>
                          <td class="result-type"><i v-if="v1.type">({{ v1.type }})</i></td>
                        </tr>
                      </template>
                    </v-simple-table>
                  </template>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <!-- Debug -->
              <v-card flat>
                <v-card-text>
                  <p class="fl-tab-header">Debug</p>
                  <v-textarea v-model="resultJson" rows="20" />
                </v-card-text>
              </v-card>
            </v-tab-item>

          </v-tabs-items>
        </v-tabs>
          </v-col>
          <v-col class="right-resource">
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
                <v-textarea v-model="resourceJson" rows="16"
                  label="Test Resource JSON (optional, if Resource ID provided)" persistent-placeholder placeholder='{
    "resourceType": "Patient",
    "id": "example",
    ...'>
                  <template v-slot:append>
                    <v-btn icon small tile @click="resourceJson = undefined">
                      <v-icon> mdi-close </v-icon>
                    </v-btn>
                  </template>
                </v-textarea>
                <v-text-field label="Terminology Server" v-model="terminologyServer" hide-details="auto" />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card>

      <br />
      <OperationOutcomeOverlay v-if="showOutcome" :saveOutcome="saveOutcome" :showOutcome="showOutcome" title="Error"
        @close="clearOutcome" />
    </div>
    <!-- <code class="code-json">{{ JSON.stringify(results, null, 4) }}</code> -->
  </div>
</template>

<style lang="scss" scoped >
tr.ve-table-body-tr {
  cursor: pointer;
}

.left-resource {
  display: none;
}

@media (max-width: 1000px) {
  .left-resource {
    display: flex;
  }

  .right-resource {
    display: none;
  }
}

.engineselector {
  max-width: 14ch;
}

.tool-button {
  max-width: 10ch;
}

td {
  vertical-align: top;
  height: unset !important;
  padding: 8px;
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

<script lang="ts">
import Vue, { VNode } from "vue";
import { settings } from "~/helpers/user_settings";
import {
  requestFhirAcceptHeaders,
  requestFhirContentTypeHeaders
} from "~/helpers/searchFhir";
import axios, { AxiosResponse } from "axios";
import { AxiosError } from "axios";
import { CancelTokenSource } from "axios";
import { getExtensionStringValue } from "fhir-extension-helpers";
import fhirpath from "fhirpath";
import fhirpath_r4_model from "fhirpath/fhir-context/r4";
// import { engine } from "fhirpath/src/misc.js";

interface FhirPathData {
  raw?: fhir4.Parameters;
  resourceId?: string;
  resourceJson?: string;
  contextExpression?: string;
  fhirpathExpression?: string;
  loadingData: boolean;
  resultJson?: string;
  saveOutcome?: fhir4.OperationOutcome;
  showOutcome?: boolean;
  showAdvancedSettings: boolean;
  terminologyServer: string;
  cancelSource?: CancelTokenSource;
  tab: any;
  results: ResultData[];
  selectedEngine: string;
  executionEngines: string[];
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
  type?: string;
  value: string;
}

function getValue(entry: fhir4.ParametersParameter): ResultItem[] {
  let result: ResultItem[] = [];
  var myMap = new Map(Object.entries(entry));
  for (let [k, v] of myMap.entries()) {
    if (k.startsWith('value'))
      result.push({ type: k.replace('value', ''), value: v });
    else if (k == 'resource')
      result.push({ type: (v as fhir4.Resource).resourceType, value: v });
  }
  const extVal = getExtensionStringValue(entry, "http://fhir.forms-lab.com/StructureDefinition/json-value");
  if (extVal)
    result.push({ type: entry.name, value: JSON.parse(extVal) });
  return result;
}
function getTraceValue(entry: fhir4.ParametersParameter): TraceData[] {
  let result: TraceData[] = [];
  if (entry.part) {
    for (var part of entry.part) {
      const val = getValue(part);
      result.push({ name: entry.valueString ?? '', type: part.name, value: JSON.stringify(val[0].value, null, 4) });
    }
  }
  return result;
}

export default Vue.extend({
  head: {
    title: "FhirPathTester",
  },
  async mounted() {
    this.showAdvancedSettings = settings.showAdvancedSettings();
    this.terminologyServer = settings.getFhirTerminologyServerUrl();

    // Read in any parameters from the URL
    if (this.$route.query.expression) {
      if (this.$route.query.exampletype) {
        this.resourceId = `https://sqlonfhir-r4.azurewebsites.net/fhir/${this.$route.query.exampletype}/example`;
      }
      if (this.$route.query.context) {
        this.contextExpression = this.$route.query.context as string ?? '';
      }
      else {
        this.contextExpression = '';
      }
      if (this.$route.query.terminologyServer) {
        this.terminologyServer = this.$route.query.terminologyServer as string ?? '';
      }
      this.fhirpathExpression = this.$route.query.expression as string ?? '';
    }

    // await this.downloadTestResource();
    await this.evaluateFhirPathExpression();
  },
  methods: {
    tabTitle() {
      if (this.resourceJson) return '(local resource JSON)';
      return this.resourceId;
    },
    settingsClosed() {
      this.showAdvancedSettings = settings.showAdvancedSettings();
    },

    hasTraceData(): boolean {
      if (this.results.length === 0) return false;
      for (var rd of this.results) {
        if (rd.trace.length > 0) return true;
      }
      return false;
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
        let response: AxiosResponse<fhir4.Parameters, any>;
        if (this.resourceJson) {
          // Need to post this content instead
          let p: fhir4.Parameters = { resourceType: "Parameters", parameter: [] };
          p.parameter?.push({
            name: "resource",
            resource: JSON.parse(this.resourceJson)
          });
          response = await axios.post<fhir4.Parameters>(url, p,
            {
              cancelToken: token,
              headers: {
                "Accept": requestFhirAcceptHeaders,
                "ContentType": requestFhirContentTypeHeaders
              }
            });
        }
        else {
          response = await axios.get<fhir4.Parameters>(url, {
            cancelToken: token,
            headers: { "Accept": requestFhirAcceptHeaders }
          });
        }
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
          this.results = [];
          if (this.raw.parameter) {
            for (var entry of this.raw.parameter) {
              if (entry.name === 'parameters') continue; // skip over the configuration settings

              // Anything else is a result
              // scan over the parts (values)
                  let resultItem: ResultData = { context: entry.valueString, result: [], trace: [] };
                  if (entry.part) {
                    for (var part of entry.part) {
                  if (part.name === 'trace') {
                    resultItem.trace.push(...getTraceValue(part));
                  }
                  else {
                      resultItem.result.push(...getValue(part));
                    }
                  }
              }
                  this.results.push(resultItem);
                }
                    }
        }
      } catch (err) {
        this.loadingData = false;
        if (axios.isAxiosError(err)) {
          const serverError = err as AxiosError<fhir4.OperationOutcome>;
          if (serverError && serverError.response) {
            this.resultJson = JSON.stringify(serverError.response.data, null, 4);
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
        let url = this.resourceId;
        if (this.resourceId && !this.resourceId.startsWith('http'))
          url = settings.getFhirServerUrl() + '/' + this.resourceId;

        if (this.cancelSource) this.cancelSource.cancel("new download started");
        this.cancelSource = axios.CancelToken.source();
        this.loadingData = true;
        let token = this.cancelSource.token;
        const response = await axios.get<fhir4.Resource>(url, {
          cancelToken: token,
          headers: {
            "Cache-Control": "no-cache",
            "Accept": requestFhirAcceptHeaders
          }
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
            this.resultJson = JSON.stringify(serverError.response, null, 4);
            if (serverError.response.data?.resourceType == 'OperationOutcome') {
              this.resultJson = JSON.stringify(serverError.response, null, 4);
              this.saveOutcome = serverError.response.data;
            } else {
              if (serverError.response.status == 404)
                this.saveOutcome = { resourceType: 'OperationOutcome', issue: [] }
              this.saveOutcome?.issue.push({ code: 'not-found', severity: 'error', details: { text: 'Test resource not found' } });
            }
            this.showOutcome = true;
            return serverError.response.data;
          }
        } else {
          console.log("Client Error:", err);
        }
      }
    },

    async evaluateExpressionUsingFhirpathjs() {
      if (!this.resourceJson && this.resourceId) {
        await this.downloadTestResource();
      }
      if (!this.resourceJson) {
        return;
      }
      this.results = [];
      this.resultJson = undefined;

      // run the actual fhirpath engine
      const fhirData = JSON.parse(this.resourceJson);
      // debugger;
      var environment: any = { resource: fhirData };

      let contextNodes: any[] = [];

      if (this.contextExpression) {
        // scan over each of the expressions
        contextNodes = fhirpath.evaluate(fhirData, this.contextExpression, environment, fhirpath_r4_model);
      }
      else {
        contextNodes = fhirpath.evaluate(fhirData, "%resource", environment, fhirpath_r4_model);
      }
        for (let contextNode of contextNodes) {
        let resData: ResultData;
        if (this.contextExpression)
          resData = { context: `${this.contextExpression}[${contextNodes.indexOf(contextNode)}]`, result: [], trace: [] };
        else
          resData = { result: [], trace: [] };

        let res: any[] = fhirpath.evaluate(contextNode, this.fhirpathExpression ?? '', environment, fhirpath_r4_model);
        this.results.push(resData);

        for (var item of res) {
          resData.result.push({ type: Object.prototype.toString.call(item ?? '').substring(8).replace(']', ''), value: item });
        }
      }
      console.log(this.results);
    },

    // https://www.sitepoint.com/fetching-data-third-party-api-vue-axios/
    async evaluateFhirPathExpression() {
      if (this.selectedEngine == "fhirpath.js") {
        await this.evaluateExpressionUsingFhirpathjs();
        return;
      }

      // Run the firely/brianpos 
      let url = `https://qforms-server.azurewebsites.net/$fhirpath?expression=${encodeURIComponent(this.fhirpathExpression ?? 'today()')}`;
      if (this.resourceId && !this.resourceJson) {
        if (!this.resourceId.startsWith('http'))
          url += `&resource=${encodeURIComponent(settings.getFhirServerUrl() + '/' + this.resourceId)}`;
        else
          url += `&resource=${encodeURIComponent(this.resourceId)}`;
      }
      if (this.contextExpression) {
        url += `&context=${encodeURIComponent(this.contextExpression)}`;
      }
      if (this.terminologyServer) {
        url += `&terminologyserver=${encodeURIComponent(this.terminologyServer)}`;
      }
      await this.executeRequest(url);
    },
  },
  data(): FhirPathData {
    return {
      tab: null,
      raw: undefined,
      resourceId: 'Patient/example',
      resourceJson: undefined,
      contextExpression: 'name',
      fhirpathExpression: "trace('nerd').given",
      loadingData: true,
      resultJson: undefined,
      showOutcome: false,
      showAdvancedSettings: false,
      terminologyServer: 'https://sqlonfhir-r4.azurewebsites.net/fhir',
      results: [],
      selectedEngine: ".NET (firely)",
      executionEngines: [
        ".NET (firely)",
        "fhirpath.js",
        // "java"
      ]
    };
  },
});
</script>
