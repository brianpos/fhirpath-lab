<style scoped>
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
          <v-btn icon @click="evaluateFhirPathExpression">
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

          <v-tabs-items touchless v-model="tab">
            <v-tab-item>
              <!-- Expression -->
              <v-card flat>
                <v-card-text>
                  <p class="fl-tab-header">Expression</p>
                  <v-text-field label="Test Resource Id" v-model="resourceId" hide-details="auto">
                    <template v-slot:append>
                      <v-btn icon small tile @click="resourceId = undefined">
                        <v-icon> mdi-close </v-icon>
                      </v-btn>
                      <v-btn icon small tile>
                        <v-icon> mdi-download </v-icon>
                      </v-btn>
                    </template>
                  </v-text-field>
                  <v-textarea label="Context Expression" v-model="contextExpression" hide-details="auto" rows="2"
                    auto-grow />
                  <v-textarea label="Fhirpath Expression" v-model="fhirpathExpression" hide-details="auto" rows="4"
                    auto-grow />
                  <v-text-field label="Terminology Server" v-model="terminologyServer" hide-details="auto" />
                  <v-textarea v-model="resultText" />
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <!-- Resource -->
              <v-card flat>
                <v-card-text>
                  <p class="fl-tab-header">Resource</p>
                  <v-textarea v-model="resourceJson" rows="20" />
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <!-- Trace -->
              <v-card flat>
                <v-card-text>
                  <p class="fl-tab-header">Trace</p>
                  <v-simple-table>
                    <template v-for="(v1, index) in traceData">
                      <tr :key="index">
                        <td>{{ v1.name }}</td>
                        <td>{{ v1.value }}</td>
                      </tr>
                    </template>
                  </v-simple-table>
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
  </div>
</template>

<script lang="ts">
import Vue, { VNode } from "vue";
import {
  LibraryTableData,
} from "~/models/LibraryTableData";
import { formatDate } from "~/helpers/datetime";
import { settings } from "~/helpers/user_settings";
import {
  requestFhirAcceptHeaders,
  searchPage,
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
  resultText?: string;
  traceText?: string;
  saveOutcome?: fhir4.OperationOutcome;
  showOutcome?: boolean;
  showAdvancedSettings: boolean;
  terminologyServer: string;
  cancelSource?: CancelTokenSource;
  tab: any;
  traceData: TraceData[];
}

interface ResultData {
  context?: string;
  result: any[];
  trace: TraceData[];
}

interface TraceData {
  name: string;
  value: string;
}

export default Vue.extend({
  head: {
    title: "FhirPath",
  },
  mounted() {
    this.showAdvancedSettings = settings.showAdvancedSettings();
    this.evaluateFhirPathExpression();
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
          this.resourceJson = JSON.stringify(results, null, 4);
          this.resultText = '';
          if (this.raw.parameter) {
            for (var entry of this.raw.parameter) {
              if (entry.name === 'result') {
                if (this.contextExpression) {
                      this.resultText +=`${entry.valueString}\r\n${entry.part ? JSON.stringify(entry.part) : ''}\r\n`;
                }
                else {
                  var myMap = new Map(Object.entries(entry));
                  for (let [k, v] of myMap.entries()) {
                    if (k.startsWith('value') || k == 'resource')
                      this.resultText += JSON.stringify(v);
                  }
                }
              }
              if (entry.name === 'trace') {

                this.traceData.push({ name: entry.valueString ?? '??', value: JSON.stringify(entry.part) });
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
      fhirpathExpression: "trace('nerd').family",
      loadingData: true,
      resultText: undefined,
      traceText: undefined,
      showOutcome: false,
      showAdvancedSettings: false,
      terminologyServer: 'https://sqlonfhir-r4.azurewebsites.net/fhir',
      traceData: []
    };
  },
});
</script>
