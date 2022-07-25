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
              <v-tab v-show="variables.size > 0">
                <v-icon left> mdi-application-variable-outline </v-icon>
                Variables
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
                <v-tab-item :eager="true">
                  <!-- Expression -->
                  <v-card flat>
                    <v-card-text>
                      <p class="fl-tab-header">Expression</p>
                      <label class="v-label theme--light bare-label">Context Expression (optional)</label>
                      <!-- <v-input label="Context Expression (optional)" hide-details="auto" :value="contextExpression">
                      </v-input> -->
                      <div height="85px" width="100%" ref="aceEditorContextExpression"></div>
                      <div class="ace_editor_footer"></div>

                      <label class="v-label theme--light bare-label">Fhirpath Expression</label>
                      <div height="85px" width="100%" ref="aceEditorExpression"></div>
                      <div class="ace_editor_footer"></div>

                      <div class="results">RESULTS <span class="processedBy">{{ processedByEngine }}</span></div>
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

                <v-tab-item :eager="true">
                  <!-- Resource -->
                  <v-card flat>
                    <v-card-text>
                      <p class="fl-tab-header">Resource</p>
                      <v-text-field label="Test Resource Id" v-model="resourceId" hide-details="auto" autocomplete="off"
                        autocorrect="off" autocapitalize="off" spellcheck="false">
                        <template v-slot:append>
                          <v-btn icon small tile @click="resourceId = undefined">
                            <v-icon> mdi-close </v-icon>
                          </v-btn>
                          <v-btn icon small tile @click="downloadTestResource">
                            <v-icon> mdi-download </v-icon>
                          </v-btn>
                        </template>
                      </v-text-field>
                      <label class="v-label theme--light bare-label">Test Resource JSON <i>{{ resourceJsonChangedMessage() }}</i></label>
                      <div height="85px" width="100%" ref="aceEditorResourceJsonTab"></div>
                      <!-- <div class="ace_editor_footer"></div> -->
                      <v-text-field label="Terminology Server" v-model="terminologyServer" hide-details="auto"
                        autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" />
                    </v-card-text>
                  </v-card>
                </v-tab-item>

                <v-tab-item :eager="true">
                  <!-- Variables -->
                  <v-card flat>
                    <v-card-text>
                      <p class="fl-tab-header">Variables</p>
                        <template v-for="(v1, index) in variables">
                        <v-textarea :auto-grow="!v1[1].resourceId" :rows="(!v1[1].resourceId?1:5)" 
                          :label="v1[0]" hide-details="auto" :value="v1[1].data" 
                          autocorrect="off" autocapitalize="off" spellcheck="false"
                          @input="updateVariableValue(v1[0])" :key="index" 
                          :messages="variableMessages(v1[1])" :error-messages="variableErrorMessages(v1[1])" :error="(!!v1[1].errorMessage)">
                            <template v-slot:append>
                            <v-btn icon small tile @click="variables.set(v1[0], { data: v1[1].resourceId }); $forceUpdate()">
                                <v-icon> mdi-close </v-icon>
                              </v-btn>
                              <v-btn icon small tile @click="downloadVariableResource(v1[0])" :hidden="!isValidFhirUrl(v1[1])"> 
                                <v-icon> mdi-download </v-icon>
                              </v-btn>
                            </template>
                          </v-textarea>
                          <!-- <div class="code-json">{{ JSON.stringify(v1[1], null, 2) }}</div> -->
                        </template>
                        <br/>
                        <label><i>Note: This variables tab is only visible when there are variables in the expression.
                          To add another variable, name it in the fhirpath expression.<br/>
                          Also note that the variables are not supported in the context expression.</i></label>
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

                <v-tab-item :eager="true">
                  <!-- Debug -->
                  <v-card flat>
                    <v-card-text>
                      <p class="fl-tab-header">Debug</p>
                      <div ref="aceEditorDebug"></div>
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
                <v-text-field label="Test Resource Id" v-model="resourceId" hide-details="auto" autocorrect="off" autocapitalize="off" spellcheck="false">
                  <template v-slot:append>
                    <v-btn icon small tile @click="resourceId = undefined">
                      <v-icon> mdi-close </v-icon>
                    </v-btn>
                    <v-btn icon small tile @click="downloadTestResource">
                      <v-icon> mdi-download </v-icon>
                    </v-btn>
                  </template>
                </v-text-field>
                <label class="v-label theme--light bare-label">Test Resource JSON <i>{{ resourceJsonChangedMessage() }}</i></label>
                <div height="85px" width="100%" ref="aceEditorResourceJsonRight"></div>
                <!-- <div class="ace_editor_footer"></div> -->
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

<style lang="scss" scoped>
.ace_editor:focus-within+.ace_editor_footer {
  color: #1976d2;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}
</style>

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
.processedBy {
  float: right;
  font-size: small;
}
</style>

<script lang="ts">
import Vue, { VNode } from "vue";
import { settings } from "~/helpers/user_settings";
import {
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

const shareTooltipText = 'Copy a sharable link to this test expression';

interface FhirPathData {
  raw?: fhir4.Parameters;
  library?: fhir4.Library;
  resourceId?: string;
  resourceJsonChanged: boolean;
  loadingData: boolean;
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
  expressionEditor?: ace.Ace.Editor;
  expressionContextEditor?: ace.Ace.Editor;
  debugEditor?: ace.Ace.Editor;
  resourceJsonEditor?: ace.Ace.Editor;
  variables: Map<string, VariableData>;
  processedByEngine?: string;
}

interface ResultItem {
  type: string;
  value: any;
}

interface VariableData {
  data: any;
  resourceId?: string;
  datatype?: string;
  errorMessage?: string;
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

function canonicalVariableName(name: string): string {
  if (name.startsWith("%")) name = name.substring(1);
  if (name.startsWith("`")) name = name.substring(1);
  if (name.endsWith("`")) name = name.substring(0, name.length-1);
  if (name.indexOf('`') !== -1) name = name.replaceAll('\\`', '`');
  return name;
}

function isSystemVariableName(name: string): boolean {
  if (name === "ucum") return true;
  if (name === "resource") return true;
  if (name === "rootResource") return true;
  if (name === "context") return true;
  if (name === "terminologies") return true;
  return false;
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
  components: {
  },
  head: {
    title: "FhirPathTester",
  },
  async mounted() {
    this.showAdvancedSettings = settings.showAdvancedSettings();
    this.terminologyServer = settings.getFhirTerminologyServerUrl();

    const CDN = 'https://cdn.jsdelivr.net/npm/ace-builds@1.6.0/src-min-noconflict';
    if (true) {
        ace.config.set('basePath', CDN);
        ace.config.set('modePath', CDN);
        ace.config.set('themePath', CDN);
        ace.config.set('workerPath', CDN);
    }

    // Update the editor's Mode
    var editorCtxtDiv: any = this.$refs.aceEditorContextExpression as Element;
    if (editorCtxtDiv) {
      this.expressionContextEditor = ace.edit(editorCtxtDiv, {
        wrap: "free",
        minLines: 1,
        maxLines: Infinity,
        highlightActiveLine: false,
        showGutter: false,
        fontSize: 16,
        cursorStyle: "slim",
        showPrintMargin: false,
        theme: "ace/theme/chrome",
        mode: "ace/mode/text",
        wrapBehavioursEnabled: true
      });

      if (this.expressionContextEditor) {
        setCustomHighlightRules(this.expressionContextEditor, FhirPathHightlighter_Rules);
        this.expressionContextEditor.setValue("name"); // default value
        this.expressionContextEditor.clearSelection();
      }
    }

    var editorDiv: any = this.$refs.aceEditorExpression as Element;
    if (editorDiv) {
      this.expressionEditor = ace.edit(editorDiv, {
        wrap: "free",
        minLines: 3,
        maxLines: Infinity,
        highlightActiveLine: false,
        showGutter: false,
        fontSize: 16,
        cursorStyle: "slim",
        showPrintMargin: false,
        theme: "ace/theme/chrome",
        mode: "ace/mode/text",
        wrapBehavioursEnabled: true
      });

        setCustomHighlightRules(this.expressionEditor, FhirPathHightlighter_Rules);
        this.expressionEditor.setValue("trace('trc').given");
        this.expressionEditor.clearSelection();
        this.expressionEditor.on("change", this.fhirpathExpressionChangedEvent)
    }

    var editorDebugDiv: any = this.$refs.aceEditorDebug as Element;
    if (editorDebugDiv) {
      this.debugEditor = ace.edit(editorDebugDiv, {
        wrap: "free",
        readOnly: true,
        minLines: 15,
        maxLines: 35,
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
      minLines: 15,
      maxLines: 30,
      highlightActiveLine: true,
      showGutter: true,
      fontSize: 14,
        cursorStyle: "slim",
      showPrintMargin: false,
      theme: "ace/theme/chrome",
      mode: "ace/mode/json",
      wrapBehavioursEnabled: true
    };
    var editorResourceJsonRightDiv: any = this.$refs.aceEditorResourceJsonRight as Element;
    if (editorResourceJsonRightDiv) {
      this.resourceJsonEditor = ace.edit(editorResourceJsonRightDiv, resourceEditorSettings);
      this.resourceJsonEditor.session.on("change", this.resourceJsonChangedEvent);

      var editorResourceJsonLeftDiv: any = this.$refs.aceEditorResourceJsonTab as Element;
      if (editorResourceJsonLeftDiv) {
        let editor = ace.edit(editorResourceJsonLeftDiv, resourceEditorSettings);
        if (editor) {
          editor.setSession(this.resourceJsonEditor.session);
        }
      }
    }

    // Read in any parameters from the URL
    if (this.$route.query.libaryId as string) {
      await this.downloadLibrary(this.$route.query.libaryId as string);
    }
    else {
      if (this.$route.query.expression) {
        if (this.$route.query.exampletype) {
          this.resourceId = `${settings.getFhirServerUrl()}/${this.$route.query.exampletype}/example`;
        }
        else {
          if (this.$route.query.resource) {
            this.resourceId = this.$route.query.resource as string;
          }
        }

        if (this.expressionContextEditor) {
          if (this.$route.query.context) {
            this.expressionContextEditor.setValue(this.$route.query.context as string ?? '');
            this.expressionContextEditor.clearSelection();
          }
          else {
              this.expressionContextEditor.setValue('');
          }
        }

        if (this.$route.query.engine) {
          this.selectedEngine = this.$route.query.engine as string ?? '';
        }

        if (this.$route.query.terminologyServer) {
          this.terminologyServer = this.$route.query.terminologyServer as string ?? '';
        }

        if (this.expressionEditor) {
          this.expressionEditor.setValue(this.$route.query.expression as string ?? '');
          this.expressionEditor.clearSelection();
        }
      }
    }
    await this.evaluateFhirPathExpression();
  },
  methods: {
    variableMessages(variable: VariableData): string | undefined{
      if (variable.resourceId) return variable.resourceId;
      if (variable.data?.startsWith("[")) return "(array)";
      if (variable.data?.startsWith("{")) return "(Object)";
    },
    variableErrorMessages(variable: VariableData): string | undefined {
      if (variable.errorMessage) delete variable.errorMessage;
      if (variable.data?.startsWith("[") || variable.data?.startsWith("{")){
          try{
            JSON.parse(variable.data);
          }
          catch(e: any){
            // console.log(e);
            variable.errorMessage = e.message;
            return e.message;
          }
      }
    },
    isValidFhirUrl(variable: VariableData){
      const url: string = variable?.resourceId ?? variable?.data;
      if (url){
        // Not being fussing on values explicitly tagged with a web protocol
        if (url.startsWith("http://") || url.startsWith("https://")){
          for (const frt of fhirResourceTypes){
            if (url.indexOf(frt+"/") > 0 || url.indexOf(frt+"?") > 0) return true;
          }
          return false;
        } 

        // if the first component is a FHIR resource type, then we'll let that go too.
        for (const frt of fhirResourceTypes){
          if (url.startsWith(frt+"/")) return true;
          if (url.startsWith(frt+"?")) return true;
        }
      }
      return false;
    },
    resourceJsonChangedEvent(){
      this.resourceJsonChanged = true;
    },
    updateVariableValue(name: string){
      const ie: InputEvent = event as InputEvent;
      // console.log(event);
      const value = (ie.currentTarget as any).value;
      const varValue = this.variables.get(name)
      if (varValue && varValue.data !== value){
        varValue.data = value;
        this.$forceUpdate();
      }
      else{
        this.variables.set(name, { data: value });
      }
    },
    fhirpathExpressionChangedEvent(){
      // Check the expression to see if there are any variables in there
      const session = this.expressionEditor?.session;
      if (session){
        const count = session.doc.getLength();
        // accumulate the variables
        let updatedVariables = new Map<string, any>();
        for (let row = 0; row<= count; row++){
          if (session.doc.getLine(row).includes("%")){
            const tkns = this.expressionEditor?.session.getTokens(row);
            if (tkns){
              for (const tkn of tkns){
                if (tkn.type === "fhir_variable"){
                  const varName = canonicalVariableName(tkn.value);
                  if (isSystemVariableName(varName)) continue;

                  if (!this.variables.has(varName)){
                    // console.log(tkn.value + ' ' + varName);
                    updatedVariables.set(varName, { data: undefined });
                    // provide default implementation values for known env vars
                    switch(varName){
                      case 'ucum': updatedVariables.set(varName, "http://unitsofmeasure.org"); break;
                    }
                  }
                  else {
                    updatedVariables.set(varName, this.variables.get(varName));
                  }
                }
              }
            }
          }
        }
        this.variables = updatedVariables;
      }
      if (this.tab === 2){
      }
    },
    resourceJsonChangedMessage(): string | undefined {
      if (this.resourceJsonChanged && this.resourceId){
        return '(modified)';
      }
    },
    tabTitle() {
      if (this.library) return this.library.title;
      if (this.getResourceJson() && this.resourceJsonChanged) return '(local resource JSON)';
      return this.resourceId;
    },
    settingsClosed() {
      this.showAdvancedSettings = settings.showAdvancedSettings();
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

    setResultJson(result: string) {
      if (this.debugEditor) {
        this.debugEditor.setValue(result);
        this.debugEditor.clearSelection();
        this.debugEditor.renderer.updateFull(true);
      }
    },
    async executeRequest<T>(url: string, p: fhir4.Parameters) {
      try {
        if (this.cancelSource) this.cancelSource.cancel("new search started");
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
          if (results.resourceType === 'OperationOutcome')
          {
            this.saveOutcome = results;
            this.showOutcome = true;
            return;
          }
          this.raw = results;

          this.results = [];
          if (this.raw.parameter) {
            for (var entry of this.raw.parameter) {
              if (entry.name === 'parameters'){
                // read the processing engine version
                if (entry.part && entry.part.length > 0 && entry.part[0].name === 'evaluator'){
                  this.processedByEngine = entry.part[0].valueString;
                }

                continue; // skip over the configuration settings
              }

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

    async downloadLibrary(libraryId: string) {
      try {
        let url = libraryId;
        if (!libraryId.startsWith('http'))
          url = settings.getFhirServerUrl() + '/Library/' + libraryId;

        if (this.cancelSource) this.cancelSource.cancel("new download started");
        this.cancelSource = axios.CancelToken.source();
        this.loadingData = true;
        let token = this.cancelSource.token;
        let headers: AxiosRequestHeaders = {
            "Cache-Control": "no-cache",
            "Accept": requestFhirAcceptHeaders
          }
        const response = await axios.get<fhir4.Library>(url, {
          cancelToken: token,
          headers: headers
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
          var editor: any;
          if (this.expressionEditor) {
            this.expressionEditor.setValue(this.library?.content ? atob(this.library.content[0].data as string) : '');
            this.expressionEditor.clearSelection();
          }
          const contextExpression = getExtensionStringValue(this.library, "http://fhir.forms-lab.com/StructureDefinition/context-expression");
          if (this.expressionContextEditor) {
            this.expressionContextEditor.setValue(contextExpression ?? '');
            this.expressionContextEditor.clearSelection();
          }

          // and test resource IDs
          const rId = getExtensionStringValue(this.library, "http://fhir.forms-lab.com/StructureDefinition/resource-id");
          if (rId) {
            this.resourceId = rId;
            if (this.resourceJsonEditor) {
              this.resourceJsonEditor.setValue('');
              this.resourceJsonChanged = false;
            if (this.resourceId?.startsWith("#") && this.library?.contained && this.library.contained[0]) {
              this.resourceId = undefined;
                const resourceJson = JSON.stringify(this.library.contained[0], null, 4); // really should lookup by ID
                if (resourceJson) {
                  this.resourceJsonEditor.setValue(resourceJson);
                  this.resourceJsonChanged = false;
                }
                this.resourceJsonEditor.clearSelection();
              }
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
            this.setResultJson(JSON.stringify(serverError.response, null, 4));
            if (serverError.response.data?.resourceType == 'OperationOutcome') {
              this.setResultJson(JSON.stringify(serverError.response, null, 4));
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

    async downloadVariableResource(name: string) {
      try {
        if (!this.variables.get(name)) return;
        let url = this.variables.get(name)?.resourceId ?? this.variables.get(name)?.data;
        if (url && !url.startsWith('http'))
          url = settings.getFhirServerUrl() + '/' + url;

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
          this.variables.set(name, { resourceId: url, data: JSON.stringify(results, null, 4)});
          this.$forceUpdate();
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

    async evaluateExpressionUsingFhirpathjs() {
      if (!this.getResourceJson() && this.resourceId) {
        await this.downloadTestResource();
      }
      // removing this constraint as there are expression tests 
      // that you can do that don't require a resource.  
      // if (!this.resourceJson) {
      //   return;
      // }
      this.results = [];
      this.setResultJson('');

      // run the actual fhirpath engine
      let fhirData = { resourceType: 'Patient' }; // some dummy data
      const resourceJson = this.getResourceJson();
      if (resourceJson) {
        fhirData = JSON.parse(resourceJson);
      }
      // debugger;
      var environment: Record<string, any> = { resource: fhirData, rootResource: fhirData };
      for (let v of this.variables) {
        let value = v[1].data;
        if (value && (value.startsWith("[") || value.startsWith("{"))) {
          // convert to an object
          try{
            value = JSON.parse(value);
          }
          catch(e){
            console.log(e);
          }
        }
        environment[v[0]] = value;
      }

      let contextNodes: any[] = [];

      (this as any).$appInsights?.trackEvent({ name: 'evaluate fhirpath.js' });

      const contextExpression = this.getContextExpression();
      if (contextExpression) {
        // scan over each of the expressions
        try {
          this.processedByEngine = `fhirpath.js-2.14.4+`;
          contextNodes = fhirpath.evaluate(fhirData, contextExpression, environment, fhirpath_r4_model);
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
          this.processedByEngine = `fhirpath.js-2.14.4+`;
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
        if (contextExpression)
          resData = { context: `${contextExpression}[${index}]`, result: [], trace: [] };
        else
          resData = { result: [], trace: [] };

        let tracefunction = function (x: any, label: string): void {
          if (Array.isArray(x)) {
            for (var item of x) {
              if (typeof item.getTypeInfo === "function") {
                let ti = item.getTypeInfo();
                // console.log(ti);
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
          let useExpression = this.getFhirpathExpression() ?? '';
          let path = {
            base: resData.context??'', 
            expression: useExpression
          }
          let res: any[] = fhirpath.evaluate(contextNode, path, environment, fhirpath_r4_model, tracefunction);
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
      // console.log(this.results);
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
      if (this.getResourceJson() && this.resourceJsonChanged) {
        this.shareToolTipMessage += '\r\n(without example resource JSON)';
      }
    },

    copyShareLinkToClipboard() {
      const url = new URL(window.location.href);
      // console.log(url);
      let shareUrl = `${url.origin}/FhirPath?expression=${encodeURIComponent(this.getFhirpathExpression() ?? '')}`;
      shareUrl += `&engine=${encodeURIComponent(this.selectedEngine ?? '')}`;
      const contextExpression = this.getContextExpression();
      if (contextExpression) {
        shareUrl += `&context=${encodeURIComponent(contextExpression ?? '')}`;
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
        }
      }

      if (this.selectedEngine == "fhirpath.js") {
        await this.evaluateExpressionUsingFhirpathjs();
        return;
      }

      // brianpos hosted service
      // default the firely SDK/brianpos service
      // let url = `https://qforms-server.azurewebsites.net/$fhirpath`;
      // let url = `https://localhost:44378/$fhirpath`;
      // Source code for this is at https://github.com/brianpos/fhirpath-lab-dotnet
      let url = `https://fhirpath-lab-net.azurewebsites.net/api/$fhirpath`;
      // let url = `http://localhost:7071/api/$fhirpath`;

      let p: fhir4.Parameters = { resourceType: "Parameters", parameter: [{ name: "expression", valueString: this.getFhirpathExpression() ?? 'today()' }] };

      const contextExpression = this.getContextExpression();
      if (contextExpression) {
        p.parameter?.push({ name: "context", valueString: contextExpression });
      }

      // add in any variables
      if (this.variables){
        let pVars : fhir4.ParametersParameter = { name: "variables", part: []};
        p.parameter?.push(pVars);
        for(const varName of this.variables.keys()) {
          let value = this.variables.get(varName)?.data;
          if (value && (value.startsWith("[") || value.startsWith("{"))) {
            // convert to an object
            try{
              const po = JSON.parse(value);
              if (po.resourceType){
                pVars.part?.push({ name: varName, resource: po });
                continue;
              }
            }
            catch(e){
              console.log(e);
            }
            pVars.part?.push({ name: varName, extension: [{ url: 'http://fhir.forms-lab.com/StructureDefinition/json-value', valueString: value }] });
          }
          else {
            if (value === 'true') pVars.part?.push({ name: varName, valueBoolean: true });
            else if (value === 'false') pVars.part?.push({ name: varName, valueBoolean: false });
            else if (value && value.match(/^[-+]?[0-9]+$/)) pVars.part?.push({ name: varName, valueInteger: parseInt(value) });
            else if (value && value.match(/^[-+]?[0-9]+.[0-9]+$/)) pVars.part?.push({ name: varName, valueDecimal: parseFloat(value) });
            // Should other types be also included here?
            else pVars.part?.push({ name: varName, valueString: value });
          }
        }
        if (pVars.part?.length === 0){
          delete pVars.part;
        }
      }

      if (this.selectedEngine == "java (HAPI)") {
        // https://github.com/jkiddo/fhirpath-tester/blob/main/src/main/java/org/example/Evaluator.java (brianpos fork of this)
        // https://docs.microsoft.com/en-us/azure/devops/pipelines/ecosystems/java-function?view=azure-devops
        url = `https://fhirpath-lab-java.azurewebsites.net/fhir/$fhirpath`;
        // url = 'https://localhost:44378/$fhirpath-hapi'

        if (!this.getResourceJson() && this.resourceId) {
          await this.downloadTestResource();
          resourceJson = this.getResourceJson();        
        }

        (this as any).$appInsights?.trackEvent({ name: 'evaluate HAPI' });
      }
      else if (this.selectedEngine == "java (IBM)") {
        url = `https://fhirpath-lab-java.azurewebsites.net/fhir/$fhirpath-ibm`;
        // url = 'https://localhost:44378/$fhirpath-ibm'

        if (!this.getResourceJson() && this.resourceId) {
          await this.downloadTestResource();
          resourceJson = this.getResourceJson();        
        }

        (this as any).$appInsights?.trackEvent({ name: 'evaluate IBM' });
      }
      else {
        (this as any).$appInsights?.trackEvent({ name: 'evaluate FirelySDK' });
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

      if (this.terminologyServer) {
        p.parameter?.push({ name: "terminologyserver", valueString: this.terminologyServer });
      }
      await this.executeRequest(url, p);
    },
  },
  data(): FhirPathData {
    return {
      tab: null,
      library: undefined,
      raw: undefined,
      resourceId: 'Patient/example',
      resourceJsonChanged: false,
      loadingData: true,
      saveOutcome: undefined,
      showOutcome: false,
      showAdvancedSettings: false,
      terminologyServer: 'https://sqlonfhir-r4.azurewebsites.net/fhir',
      results: [],
      selectedEngine: "fhirpath.js",
      executionEngines: [
        ".NET (firely)",
        "fhirpath.js",
        "java (HAPI)",
        "java (IBM)"
      ],
      shareToolTipMessage: shareTooltipText,
      expressionEditor: undefined,
      expressionContextEditor: undefined,
      debugEditor: undefined,
      resourceJsonEditor: undefined,
      variables: new Map<string, VariableData>(),
      processedByEngine: undefined,
    };
  },
});
</script>
