<template>
  <div style="height:100%;padding: 80px 20px 20px 20px;">
    <HeaderNavbar @close-settings="settingsClosed">
      <template v-slot:extraNavButtons>
          <v-btn icon dark accesskey="g" title="press alt+g to go" @focus="checkFocus"
            @click="evaluateFhirPathExpression">
            <v-icon>
              mdi-play
            </v-icon>
          </v-btn>
          <v-select label="view" style="max-width: 14ch" dark :items="viewModes" v-model="viewMode" hide-details="auto"
            @change="refreshEditorSizes" />
      </template>
    </HeaderNavbar>
    <table-loading v-if="loadingData" />
 
    <div :class="getViewMode">
      <div class="ct-map">
        <div class="ct-header">
          <v-icon left dark> mdi-function-variant </v-icon>
            Map
        </div>
        <div ref="aceEditorExpression"></div>
      </div>

      <div class="ct-input">
        <div class="ct-header">
          <v-icon left dark> mdi-clipboard-text-outline </v-icon>
            Test Resource
        </div>
        <div ref="aceEditorResourceJsonTab"></div>
      </div>

      <div class="ct-trace">
        <div class="ct-header">
          <v-icon left dark> mdi-format-list-bulleted </v-icon>
            Trace
        </div>
        <v-simple-table>
          <template v-for="(v1, index) in trace">
            <tr :key="index">
              <td class="result-value">
                <div :class="traceTypeClass(v1.type)">{{ v1.value }}</div>
              </td>
            </tr>
          </template>
        </v-simple-table>
      </div>

      <div class="ct-results">
        <div class="ct-header">
          <v-icon left dark> mdi-file-document-outline </v-icon>
          Results <span class="processedBy">{{ processedByEngine }}</span>
        </div>
        <template v-if="results">
          <v-simple-table>
              <tr>
                <td class="result-value">
                  <div class="code-json">{{ results.value }}</div>
                </td>
                <td class="result-type"><i v-if="results.type">({{ results.type }})</i></td>
              </tr>
          </v-simple-table>
        </template>
      </div>

      <div class="ct-debug">
        <div class="ct-header">
            <v-icon left dark> mdi-bug-outline </v-icon>
            DEBUG
        </div>
        <div ref="aceEditorDebug"></div>
      </div>
    </div>

    <OperationOutcomeOverlay v-if="showOutcome" :saveOutcome="saveOutcome" :showOutcome="showOutcome" title="Error"
        @close="clearOutcome" />
  </div>
</template>

<style lang="scss">
.v-application--wrap {
  background-color: lightgray;
}
</style>

<style lang="scss" scoped>
.newlayout {
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 27vh 27vh 27vh;
  gap: 12px;
  margin-right: 14px;
  height: 100%;
  align-content: stretch;
  grid-auto-flow: row;
}

.newlayout > div {
  // border: solid 1px red;
  background-color: white;
  display: flex;
  flex-direction: column;
  // min-height: 200px;
  // max-height: 20vh;
  justify-content: flex-start;
  align-content: flex-start;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  border-end-end-radius: 4px;
  border-end-start-radius: 4px;

  .ace_editor {
    height: 100%;
    margin-top: 0;
    margin-left: 0;
    margin-bottom: 2px;
  }
}

.ct-header + div {
  // background-color: aqua;
  overflow-y: auto;
}
.ct-header {
  padding: 6px 12px;
  color: white;
  background-color: #79b6e6;
  flex-grow: 0;
  flex-shrink: 0;
  border-bottom: silver 1px solid;
}


.Map-main{
  grid-template-rows: 23vh 23vh 23vh 15vh;

  .ct-map {
    grid-row-start: 1;
    grid-row-end: 4;
  }
  .ct-trace {
    grid-row-start: 3;
  }
  .ct-debug {
    grid-column-start: 1;
    grid-column-end: 3;
  }
}

.TestResource-main{
  grid-template-rows: 23vh 23vh 23vh 15vh;

  .ct-input {
    grid-row-start: 1;
    grid-row-end: 4;
  }
  .ct-trace {
    grid-row-start: 3;
  }
  .ct-debug {
    grid-column-start: 1;
    grid-column-end: 3;
  }
}

.Results-main{
  .ct-results {
    grid-column: 2 / 3;
    grid-row: 1 / span 2;
  }
}


.ace_editor:focus-within+.ace_editor_footer {
  color: #1976d2;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}

.trace_debug {
  color: grey;
  font-family: 'Courier New', Courier, monospace;
  white-space: pre-wrap;
}

.trace_info {
  color: #1976d2;
}
</style>

<style lang="scss" scoped >

td {
  vertical-align: top;
  height: unset !important;
  padding: 8px;
}


.result-type {
//  border-bottom: silver 1px solid;
}

.result-value {
  width: 100%;
//  border-bottom: silver 1px solid;
  padding-top: 0px;
  padding-bottom: 0px;
}

.bare-label {
  transform-origin: top left;
  transform: scale(0.75);
  margin-top: 8px;
  height: 20px;
}

.results {
  padding: 4px 12px;
  color: white;
  font-style: bold;
  font-size: 1.25rem;
  line-height: 1.5;
  background-color: $card-header-color;
  margin-top: 10px;
}

.code-json {
  white-space: pre-wrap;
}

.processedBy {
  float: right;
  font-size: small;
  text-transform: none;
}
</style>

<script lang="ts">
import Vue, { VNode } from "vue";
import { settings } from "~/helpers/user_settings";
import {
  requestFhirMapAcceptHeaders,
  requestFhirAcceptHeaders,
  requestFhirContentTypeHeaders,
  fhirResourceTypes,
} from "~/helpers/searchFhir";
import axios, { AxiosRequestHeaders, AxiosResponse } from "axios";
import { AxiosError } from "axios";
import { CancelTokenSource } from "axios";
import { getExtensionStringValue } from "fhir-extension-helpers";
// import { getPreferredTerminologyServerFromSDC } from "fhir-sdc-helpers";
import fhirpath from "fhirpath";
import fhirpath_r4_model from "fhirpath/fhir-context/r4";
import { Rules as FhirPathHightlighter_Rules, setCustomHighlightRules } from "~/helpers/fhirpath_highlighter"
import "~/assets/fhirpath_highlighter.scss"
import { IApplicationInsights } from '@microsoft/applicationinsights-web'

import "ace-builds";
import ace from "ace-builds";
import "ace-builds/src-noconflict/mode-text";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-chrome";

import { fhir } from '@fhir-typescript/r4b-core';
import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from "lz-string";
import { TestFhirMapData } from "~/models/testenginemodel";

const shareTooltipText = 'Copy a sharable link to this test expression';
const shareZulipTooltipText = 'Copy a sharable link for Zulip to this test expression';

interface FhirMapData {
  prevFocus?: any;
  raw?: fhir4.Parameters;
  structureMapId?: string;
  resourceId?: string;
  resourceJsonChanged: boolean;
  loadingData: boolean;
  saveOutcome?: fhir4.OperationOutcome;
  showOutcome?: boolean;
  cancelSource?: CancelTokenSource;
  tab: any;
  results?: ResultData;
  trace: TraceData[];
  selectedEngine: string;
  executionEngines: string[];
  expressionEditor?: ace.Ace.Editor;
  expressionContextEditor?: ace.Ace.Editor;
  debugEditor?: ace.Ace.Editor;
  resourceJsonEditor?: ace.Ace.Editor;
  processedByEngine?: string;
  viewModes: string[];
  viewMode?: string;
}

interface ResultData {
  type: string;
  value: any;
}

interface TraceData {
  name: string;
  type?: string;
  value: string;
}

function getValue(entry: fhir4.ParametersParameter): ResultData | undefined {
  var myMap = new Map(Object.entries(entry));
  for (let [k, v] of myMap.entries()) {
    if (k.startsWith('value'))
      return { type: k.replace('value', ''), value: v };
    else if (k == 'resource')
      return { type: (v as fhir4.Resource).resourceType, value: v };
  }
  const extVal = getExtensionStringValue(entry, "http://fhir.forms-lab.com/StructureDefinition/json-value");
  if (extVal)
    return { type: entry.name, value: JSON.parse(extVal) };
  return undefined;
}
function getTraceValue(entry: fhir4.ParametersParameter): TraceData[] {
  let result: TraceData[] = [];
  if (entry.part) {
    for (var part of entry.part) {
      const val = getValue(part);
      if (part.name === "debug"){
        result.push({ name: entry.valueString ?? '', type: part.name, value: val?.value });
      }
      else{
        result.push({ name: entry.valueString ?? '', type: part.name, value: JSON.stringify(val?.value, null, 4) });
      }
    }
  }
  return result;
}

export default Vue.extend({
  components: {
  },
  head: {
    title: "FhirPathTester",
  },
  async mounted() {
    const CDN = 'https://cdn.jsdelivr.net/npm/ace-builds@1.6.0/src-min-noconflict';
    if (true) {
      ace.config.set('basePath', CDN);
      ace.config.set('modePath', CDN);
      ace.config.set('themePath', CDN);
      ace.config.set('workerPath', CDN);
    }

    // Update the editor's Mode
    var editorDiv: any = this.$refs.aceEditorExpression as Element;
    if (editorDiv) {
      this.expressionEditor = ace.edit(editorDiv, {
        wrap: "free",
        // minLines: 16,
        // maxLines: 16,
        highlightActiveLine: false,
        showGutter: true,
        fontSize: 14,
        cursorStyle: "slim",
        showPrintMargin: false,
        theme: "ace/theme/chrome",
        mode: "ace/mode/text",
        wrapBehavioursEnabled: true
      });

      setCustomHighlightRules(this.expressionEditor, FhirPathHightlighter_Rules);
      this.expressionEditor.setValue(`/// name = "SDOHCC-PRAPARE-Map"
/// status = draft
/// version = 0.1

map "http://fhirpath-lab.com/StructureMap/intro-patient-map" = "IntroPatientMap"

uses "http://hl7.org/fhir/StructureDefinition/Patient" as source
uses "http://hl7.org/fhir/StructureDefinition/Bundle" as target

group patientMap(source src : Patient, target bundle : Bundle) {
  src -> bundle.id = uuid() "bundle-id";
  src -> bundle.type = 'transaction' "bundle-type";

  // create a new entry and put the patient resource in it
  src -> bundle.entry as entry, entry.resource = src then
    SetEntryData(src, entry) "prep-entry";
}

group SetEntryData(source src: Patient, target entry)
{
  src.id as patientId log('patientId: ' & %src.id) -> entry.fullUrl = append('http://hl7.org/fhir/us/sdoh-clinicalcare/Patient/', patientId);
  
  src -> entry.request as request then {
    src -> request.method = 'POST' "obsn-request-method";
    src -> request.url = 'Observation' "obsn-request-url";
  } "obsn-entry-request";
}
      `);
      this.expressionEditor.clearSelection();
      this.expressionEditor.on("change", this.fhirpathExpressionChangedEvent)
    }

    var editorDebugDiv: any = this.$refs.aceEditorDebug as Element;
    if (editorDebugDiv) {
      this.debugEditor = ace.edit(editorDebugDiv, {
        wrap: "free",
        readOnly: true,
        // minLines: 16,
        // maxLines: 36,
        highlightActiveLine: true,
        showGutter: true,
        fontSize: 14,
        cursorStyle: "slim",
        showPrintMargin: false,
        theme: "ace/theme/chrome",
        mode: "ace/mode/json",
        wrapBehavioursEnabled: true
      });
    }

    const resourceEditorSettings: Partial<ace.Ace.EditorOptions> = {
      wrap: "free",
      // minLines: 15,
      // maxLines: 16,
      highlightActiveLine: true,
      showGutter: true,
      fontSize: 14,
      cursorStyle: "slim",
      showPrintMargin: false,
      theme: "ace/theme/chrome",
      mode: "ace/mode/json",
      wrapBehavioursEnabled: true
    };
    var editorResourceJsonLeftDiv: any = this.$refs.aceEditorResourceJsonTab as Element;
    if (editorResourceJsonLeftDiv) {
      this.resourceJsonEditor = ace.edit(editorResourceJsonLeftDiv, resourceEditorSettings);
    }

    // Check for the encoded parameters first
    const parameters = this.$route.query.parameters as string;
    let data: TestFhirMapData;
    // Read in any parameters from the URL
    data = this.readParametersFromQuery();

    await this.applyParameters(data);
    await this.evaluateFhirPathExpression();
    this.loadingData = false;
  },
  computed: {
    getViewMode(): string {
      if (this.viewMode){
        return 'newlayout ' + this.viewMode + '-main';
      }
      return 'newlayout';
    }
  },
  methods: {
    readParametersFromQuery(): TestFhirMapData {
      let data: TestFhirMapData = {
        expression: this.$route.query.expression as string
      };
      {
        if (this.$route.query.context) {
          data.context = this.$route.query.context as string;
        }

        if (this.$route.query.resource) {
          data.resource = this.$route.query.resource as string;
        }

        const resourceJson = this.$route.query.resourceJson + '';
        if (resourceJson) {
          data.resourceJson = decompressFromEncodedURIComponent(resourceJson) ?? '';
        }

        if (this.$route.query.engine) {
          data.engine = this.$route.query.engine as string ?? '';
        }
      }
      return data;
    },
    async applyParameters(p: TestFhirMapData) {
      {
        if (p.expression) {
          if (p.resource) {
            this.resourceId = p.resource;
          }

          if (this.expressionContextEditor) {
            if (p.context) {
              this.expressionContextEditor.setValue(p.context ?? '');
              this.expressionContextEditor.clearSelection();
            }
            else {
              this.expressionContextEditor.setValue('');
            }
          }

          const resourceJson = p.resourceJson;
          if (resourceJson) {
            this.resourceJsonEditor?.setValue(JSON.stringify(JSON.parse(resourceJson), null, 2));
            this.resourceJsonChanged = true;
            this.resourceId = undefined;
            this.resourceJsonEditor?.clearSelection();
          }

          if (p.engine) {
            this.selectedEngine = p.engine ?? '';
          }

          if (this.expressionEditor) {
            this.expressionEditor.setValue(p.expression ?? '');
            this.expressionEditor.clearSelection();
          }
        }
      }
    },
    resourceJsonChangedEvent() {
      this.resourceJsonChanged = true;
    },
    fhirpathExpressionChangedEvent() {
    },
    resourceJsonChangedMessage(): string | undefined {
      if (this.resourceJsonChanged && this.resourceId) {
        return '(modified)';
      }
    },
    tabTitle() {
      if (this.getResourceJson() && this.resourceJsonChanged) return '(local resource JSON)';
      return this.resourceId;
    },
    settingsClosed() {
    },

    traceTypeClass(category: string|undefined): string {
      if (category === "debug") return "trace_debug";
      if (category === "info") return "trace_info";
      return "code-json";
    },

    getContextExpression(): string | undefined {
      const json = this.expressionContextEditor?.getValue();
      if (json && json.length > 0) {
        return json;
      }
      return undefined;
    },

    getFhirpathExpression(): string | undefined {
      const json = this.expressionEditor?.getValue();
      if (json && json.length > 0) {
        return json;
      }
      return undefined;
    },

    getResourceJson(): string | undefined {
      const json = this.resourceJsonEditor?.getValue();
      if (json && json.length > 0) {
        return json;
      }
      return undefined;
    },

    clearOutcome() {
      this.showOutcome = undefined;
    },

    setResultJson(result: string) {
      if (this.debugEditor) {
        this.debugEditor.setValue(result);
        this.debugEditor.clearSelection();
        this.debugEditor.renderer.updateFull(true);
      }
    },
    async executeRequest<T>(url: string, p: fhir4.Parameters) {
      try {
        if (this.cancelSource) this.cancelSource.cancel("new map test started");
        this.cancelSource = axios.CancelToken.source();
        this.loadingData = true;
        let token = this.cancelSource.token;
        let response: AxiosResponse<fhir4.Parameters | fhir4.OperationOutcome, any>;
        response = await axios.post<fhir4.Parameters>(url, p,
          {
            cancelToken: token,
            headers: {
              "Accept": requestFhirAcceptHeaders,
              "ContentType": requestFhirContentTypeHeaders
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
          this.setResultJson(JSON.stringify(results, null, 4));
          if (results.resourceType === 'OperationOutcome') {
            this.saveOutcome = results;
            this.showOutcome = true;
            return;
          }
          this.raw = results;
          this.trace = [];

          if (this.raw.parameter) {
            for (var entry of this.raw.parameter) {
              if (entry.name === 'parameters') {
                // read the processing engine version
                if (entry.part && entry.part.length > 0 && entry.part[0].name === 'evaluator') {
                  this.processedByEngine = entry.part[0].valueString;
                }

                // The map would be in here too (but we can ignore that)
                continue; // skip over the configuration settings
              }

              if (entry.name === 'trace'){
                // Trace data
                this.trace.push(...getTraceValue(entry));
                continue;
              }

              if (entry.name === 'result'){
                this.results = getValue(entry);
              }
            }
          }
        }
      } catch (err) {
        this.loadingData = false;
        if (axios.isAxiosError(err)) {
          const serverError = err as AxiosError<fhir4.OperationOutcome>;
          if (serverError && serverError.response) {
            this.setResultJson(JSON.stringify(serverError.response.data, null, 4));
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
        let headers: AxiosRequestHeaders = {
          "Cache-Control": "no-cache",
          "Accept": requestFhirAcceptHeaders
        }
        const response = await axios.get<fhir4.Resource>(url, {
          cancelToken: token,
          headers: headers
        });
        if (token.reason) {
          console.log(token.reason);
          return;
        }
        this.cancelSource = undefined;
        this.loadingData = false;

        const results = response.data;
        if (results) {
          if (this.resourceJsonEditor) {
            const resourceJson = JSON.stringify(results, null, 4);
            if (resourceJson) {
              this.resourceJsonEditor.setValue(resourceJson);
              this.resourceJsonChanged = false;
            }
            this.resourceJsonEditor.clearSelection();
          }
        }
      } catch (err) {
        this.loadingData = false;
        if (axios.isAxiosError(err)) {
          const serverError = err as AxiosError<fhir4.OperationOutcome>;
          if (serverError && serverError.response) {
            this.setResultJson(JSON.stringify(serverError.response, null, 4));
            if (serverError.response.data?.resourceType == 'OperationOutcome') {
              this.setResultJson(JSON.stringify(serverError.response, null, 4));
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

    async downloadStructureMapResource() {
      try {
        if (!this.structureMapId) return;
        let url = this.structureMapId;
        if (this.structureMapId && !this.structureMapId.startsWith('http'))
          url = settings.getFhirServerUrl() + '/' + this.structureMapId;

        if (this.cancelSource) this.cancelSource.cancel("new download map started");
        this.cancelSource = axios.CancelToken.source();
        this.loadingData = true;
        let token = this.cancelSource.token;
        let headers: AxiosRequestHeaders = {
          "Cache-Control": "no-cache",
          "Accept": requestFhirMapAcceptHeaders
        }
        const response = await axios.get(url, {
          cancelToken: token,
          headers: headers
        });
        if (token.reason) {
          console.log(token.reason);
          return;
        }
        this.cancelSource = undefined;
        this.loadingData = false;

        const results = response.data;
        if (results) {
          if (this.expressionEditor) {
            if (results) {
              this.expressionEditor.setValue(results);
            }
            this.expressionEditor.clearSelection();
          }
        }
      } catch (err) {
        this.loadingData = false;
        if (axios.isAxiosError(err)) {
          const serverError = err as AxiosError<fhir4.OperationOutcome>;
          if (serverError && serverError.response) {
            this.setResultJson(JSON.stringify(serverError.response, null, 4));
            if (serverError.response.data?.resourceType == 'OperationOutcome') {
              this.setResultJson(JSON.stringify(serverError.response, null, 4));
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

    checkFocus(event: any) {
      if (event.relatedTarget) {
        this.prevFocus = event.relatedTarget;
      }
    },

    refreshEditorSizes(){
      this.$nextTick(() => {
        this.expressionEditor?.resize();
        this.expressionContextEditor?.resize();
        this.debugEditor?.resize();
        this.resourceJsonEditor?.resize();
      });
    },

    // https://www.sitepoint.com/fetching-data-third-party-api-vue-axios/
    async evaluateFhirPathExpression() {

      // reset the processing engine
      this.processedByEngine = undefined;

      // Validate the test fhir resource object
      let resourceJson = this.getResourceJson();
      if (resourceJson) {
        let rawObj: object;
        try {
          rawObj = JSON.parse(resourceJson)
          let resource: fhir.FhirResource | null = fhir.resourceFactory(rawObj);
          if (resource) {
            const issues: fhir.FtsIssue[] = resource.doModelValidation();
            if (issues.length !== 0) {
              this.saveOutcome = { resourceType: 'OperationOutcome', issue: [] }
              this.saveOutcome?.issue.push(...issues as any);
              this.showOutcome = true;
            }
          }
        } catch (err) {
          console.log(err);
          this.saveOutcome = { resourceType: 'OperationOutcome', issue: [] }
          this.saveOutcome?.issue.push({ code: 'exception', severity: 'error', details: { text: `Failed to parse the resource: ${err}` } });
          this.showOutcome = true;
          this.loadingData = false;
        }
      }

      // brianpos hosted service
      // default the firely SDK/brianpos service
      // Source code for this is at https://github.com/brianpos/fhirpath-lab-dotnet
      let url = `https://fhir-mapping-lab.azurewebsites.net/StructureMap/$transform?debug=true`;
      // let url = `https://localhost:7089/StructureMap/$transform?debug=true`;
      // let url = `http://localhost:7071/api/$fhirpath`;

      let p: fhir4.Parameters = {
        resourceType: "Parameters",
        parameter: [{ name: "map", valueString: this.getFhirpathExpression() ?? 'today()' }]
      };

      const contextExpression = this.getContextExpression();
      if (contextExpression) {
        p.parameter?.push({ name: "context", valueString: contextExpression });
      }

      // for initial testing with .net
      if (!this.getResourceJson() && this.resourceId) {
        await this.downloadTestResource();
        resourceJson = this.getResourceJson();
      }

      if (this.selectedEngine == "java (matchbox)") {
        url = `https://test.ahdis.ch/fhir/StructureMap/$transform`;

        if (!this.getResourceJson() && this.resourceId) {
          await this.downloadTestResource();
          resourceJson = this.getResourceJson();
        }

        (this as any).$appInsights?.trackEvent({ name: 'evaluate Matchbox (map)' });
      }
      else {
        (this as any).$appInsights?.trackEvent({ name: 'evaluate .NET (map)' });
      }

      if (resourceJson) {
        p.parameter?.push({ name: "resource", resource: JSON.parse(resourceJson) });
      }
      else {
        if (!this.resourceId?.startsWith('http')) {
          p.parameter?.push({ name: "resource", valueString: settings.getFhirServerUrl() + '/' + this.resourceId });
        }
        else {
          p.parameter?.push({ name: "resource", valueString: this.resourceId });
        }
      }

      await this.executeRequest(url, p);

      // Set focus to the control that previously had focus (if was known)
      if (this.prevFocus) {
        this.prevFocus.focus();
      }
    },
  },
  data(): FhirMapData {
    return {
      prevFocus: null,
      tab: null,
      raw: undefined,
      structureMapId: undefined,
      resourceId: 'Patient/example',
      resourceJsonChanged: false,
      loadingData: true,
      saveOutcome: undefined,
      showOutcome: false,
      results: undefined,
      trace: [],
      selectedEngine: ".NET (brianpos)",
      executionEngines: [
        ".NET (brianpos)",
        "java (matchbox)"
      ],
      expressionEditor: undefined,
      expressionContextEditor: undefined,
      debugEditor: undefined,
      resourceJsonEditor: undefined,
      processedByEngine: undefined,
      viewMode: '',
      viewModes: [
      '',
      'Map',
      'TestResource',
      'Results'
      ]
    };
  },
});
</script>
