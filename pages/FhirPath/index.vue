<template>
  <div>
    <HeaderNavbar @close-settings="settingsClosed" :extended="false">
    </HeaderNavbar>
    <table-loading v-if="loadingData" />

    <div class="container-fluid bd-layout" style="padding-top: 80px">
      <v-card>
        <v-toolbar flat color="primary">
          <v-toolbar-title>{{ tabTitle() }}</v-toolbar-title>
          <v-spacer />
          <v-select dark class="engineselector" :items="executionEngines" v-model="selectedEngine" hide-details="auto"
            @change="evaluateFhirPathExpression" />
          <v-btn icon dark accesskey="g" title="press alt+g to go" @click="evaluateFhirPathExpression">
            <v-icon>
              mdi-play
            </v-icon>
          </v-btn>
          <v-tooltip bottom color="primary">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon dark @click="copyShareLinkToClipboard" v-bind="attrs" v-on="on" @mouseenter="updateShareText"
                :hidden="!showShareLink()">
                <v-icon>
                  mdi-share-variant-outline
                </v-icon>
              </v-btn>
            </template>
            <span v-text="shareToolTipMessage"></span>
          </v-tooltip>
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
// import { getPreferredTerminologyServerFromSDC } from "fhir-sdc-helpers";
import fhirpath from "fhirpath";
import fhirpath_r4_model from "fhirpath/fhir-context/r4";

const shareTooltipText = 'Copy a sharable link to this test expression';

interface FhirPathData {
  raw?: fhir4.Parameters;
  library?: fhir4.Library;
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
  shareToolTipMessage: string;
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
    if (this.$route.query.libaryId as string) {
      await this.downloadLibrary(this.$route.query.libaryId as string);
    }
    else {
      if (this.$route.query.expression) {
        if (this.$route.query.exampletype) {
          this.resourceId = `https://sqlonfhir-r4.azurewebsites.net/fhir/${this.$route.query.exampletype}/example`;
        }
        else {
          if (this.$route.query.resource) {
            this.resourceId = this.$route.query.resource as string;
          }
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
    }
    await this.evaluateFhirPathExpression();
  },
  methods: {
    tabTitle() {
      if (this.library) return this.library.title;
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

    async downloadLibrary(libraryId: string) {
      try {
        let url = libraryId;
        if (!libraryId.startsWith('http'))
          url = settings.getFhirServerUrl() + '/Library/' + libraryId;

        if (this.cancelSource) this.cancelSource.cancel("new download started");
        this.cancelSource = axios.CancelToken.source();
        this.loadingData = true;
        let token = this.cancelSource.token;
        const response = await axios.get<fhir4.Library>(url, {
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

        if (response.data) {
          this.library = response.data;

          // and read the properties from the resource into the fields
          this.fhirpathExpression = this.library?.content ? atob(this.library.content[0].data as string) : undefined;
          this.contextExpression = getExtensionStringValue(this.library, "http://fhir.forms-lab.com/StructureDefinition/context-expression");
          // and test resource IDs
          const rId = getExtensionStringValue(this.library, "http://fhir.forms-lab.com/StructureDefinition/resource-id");
          if (rId) {
            this.resourceId = rId;
            this.resourceJson = undefined;
            if (this.resourceId?.startsWith("#") && this.library?.contained && this.library.contained[0]) {
              this.resourceId = undefined;
              this.resourceJson = JSON.stringify(this.library.contained[0], null, 4); // really should lookup by ID
            }
          }
          else {
            // no test resource found, check for the subject (which is the resource type)
            const codes = this.library.subjectCodeableConcept?.coding;
            if (codes && codes.length > 0) {
              this.resourceId = `${codes[0].code}/example`;
            }
          }
          // const ts = getPreferredTerminologyServerFromSDC(this.library);
          // if (ts) {
          //   this.terminologyServer = ts;
          // }
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
              this.saveOutcome?.issue.push({ code: 'not-found', severity: 'error', details: { text: `Library resource ${libraryId} not found` } });
            }
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
        try {
          contextNodes = fhirpath.evaluate(fhirData, this.contextExpression, environment, fhirpath_r4_model);
        }
        catch (err: any) {
          console.log(err);
          if (err.message) {
            this.saveOutcome = { resourceType: 'OperationOutcome', issue: [] }
            this.saveOutcome?.issue.push({ code: 'exception', severity: 'fatal', details: { text: err.message } });
            this.showOutcome = true;
          }
        }
      }
      else {
        try {
          contextNodes = fhirpath.evaluate(fhirData, "%resource", environment, fhirpath_r4_model);
        }
        catch (err: any) {
          console.log(err);
          if (err.message) {
            this.saveOutcome = { resourceType: 'OperationOutcome', issue: [] }
            this.saveOutcome?.issue.push({ code: 'exception', severity: 'fatal', details: { text: err.message } });
            this.showOutcome = true;
          }
        }
      }
      for (let contextNode of contextNodes) {
        let resData: ResultData;
        const index = contextNodes.indexOf(contextNode);
        if (this.contextExpression)
          resData = { context: `${this.contextExpression}[${index}]`, result: [], trace: [] };
        else
          resData = { result: [], trace: [] };

        let tracefunction = function (x: any, label: string): void {
          if (Array.isArray(x)) {
            for (var item of x) {
              if (typeof item.getTypeInfo === "function") {
                let ti = item.getTypeInfo();
                console.log(ti);
                resData.trace.push({ name: label ?? "", type: ti.name, value: JSON.stringify(item.data, null, 4) });
              }
              else {
                resData.trace.push({ name: label ?? "", value: JSON.stringify(item, null, 4) });
              }
            }
          }
          else {
            resData.trace.push({ name: label ?? "", value: JSON.stringify(x, null, 4) });
          }
          console.log("TRACE3:[" + (label || "") + "]", x);
          return x;
        };

        try {
          let useExpression = this.fhirpathExpression ?? '';
          if (resData.context) {
            useExpression = `${resData.context}.select(${this.fhirpathExpression})`;
          }
          let res: any[] = fhirpath.evaluate(fhirData, useExpression, environment, fhirpath_r4_model, tracefunction);
          this.results.push(resData);

          for (var item of res) {
            resData.result.push({ type: Object.prototype.toString.call(item ?? '').substring(8).replace(']', ''), value: item });
          }
        }
        catch (err: any) {
          console.log(err);
          if (err.message) {
            this.saveOutcome = { resourceType: 'OperationOutcome', issue: [] }
            this.saveOutcome?.issue.push({ code: 'exception', severity: 'fatal', details: { text: err.message } });
            this.showOutcome = true;
          }
        }
      }
      console.log(this.results);
    },

    showShareLink() {
      if (navigator?.clipboard) {
        return true;
      }
      return false;

      // The copy link is hidden when the protocol is not secure (https) as 
      // that's a browser security issue for accessing the clipboard
      // if (window?.location?.protocol === "https://") {
      //   return true;
      // }
      // if (window?.location?.hostname === "localhost") {
      //   return true;
      // }
      // return false;
    },
    updateShareText() {
      this.shareToolTipMessage = shareTooltipText;
      if (this.resourceJson) {
        this.shareToolTipMessage += '\r\n(without example resource JSON)';
      }
    },

    copyShareLinkToClipboard() {
      const url = new URL(window.location.href);
      // console.log(url);
      let shareUrl = `${url.origin}/FhirPath?expression=${encodeURIComponent(this.fhirpathExpression ?? '')}`;
      if (this.contextExpression) {
        shareUrl += `&context=${encodeURIComponent(this.contextExpression ?? '')}`;
      }
      if (this.resourceId) {
        if (this.resourceId.startsWith('http')) {
          shareUrl += `&resource=${encodeURIComponent(this.resourceId)}`;
        }
        else {
          shareUrl += `&resource=${encodeURIComponent(settings.getFhirServerUrl() + '/' + this.resourceId)}`;
        }
      }
      if (this.terminologyServer) {
        shareUrl += `&terminologyserver=${encodeURIComponent(this.terminologyServer)}`;
      }

      if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      this.shareToolTipMessage = "Copied";
      }
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
      library: undefined,
      raw: undefined,
      resourceId: 'Patient/example',
      resourceJson: undefined,
      contextExpression: 'name',
      fhirpathExpression: "trace('trc').given",
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
      ],
      shareToolTipMessage: shareTooltipText
    };
  },
});
</script>
