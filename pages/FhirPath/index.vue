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
                      <label class="v-label theme--light bare-label">Test Resource JSON (optional, if Resource ID
                        provided)</label>
                      <div height="85px" width="100%" ref="aceEditorResourceJsonTab"></div>
                      <!-- <div class="ace_editor_footer"></div> -->
                      <v-text-field label="Terminology Server" v-model="terminologyServer" hide-details="auto"
                        autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" />
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
                <label class="v-label theme--light bare-label">Test Resource JSON (optional, if Resource ID
                  provided)</label>
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
import { Rules as FhirPathHightlighter_Rules, setCustomHighlightRules } from "~/helpers/fhirpath_highlighter"
import "~/assets/fhirpath_highlighter.scss"
import { IApplicationInsights } from '@microsoft/applicationinsights-web'

import "ace-builds";
import ace from "ace-builds";
import "ace-builds/src-noconflict/mode-text";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-chrome";


const shareTooltipText = 'Copy a sharable link to this test expression';

interface FhirPathData {
  raw?: fhir4.Parameters;
  library?: fhir4.Library;
  resourceId?: string;
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
        showPrintMargin: false,
        theme: "ace/theme/chrome",
        mode: "ace/mode/text",
        wrapBehavioursEnabled: true
      });

      if (this.expressionEditor) {
        setCustomHighlightRules(this.expressionEditor, FhirPathHightlighter_Rules);
        this.expressionEditor.setValue("trace('trc').given");
        this.expressionEditor.clearSelection();
      }
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
      showPrintMargin: false,
      theme: "ace/theme/chrome",
      mode: "ace/mode/json",
      wrapBehavioursEnabled: true
    };
    var editorResourceJsonRightDiv: any = this.$refs.aceEditorResourceJsonRight as Element;
    if (editorResourceJsonRightDiv) {
      this.resourceJsonEditor = ace.edit(editorResourceJsonRightDiv, resourceEditorSettings);

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
          this.resourceId = `https://sqlonfhir-r4.azurewebsites.net/fhir/${this.$route.query.exampletype}/example`;
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
    tabTitle() {
      if (this.library) return this.library.title;
      if (this.getResourceJson()) return '(local resource JSON)';
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
      }
    },
    async executeRequest<T>(url: string, p: fhir4.Parameters) {
      try {
        if (this.cancelSource) this.cancelSource.cancel("new search started");
        this.cancelSource = axios.CancelToken.source();
        this.loadingData = true;
        let token = this.cancelSource.token;
        let response: AxiosResponse<fhir4.Parameters, any>;
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
          this.raw = results;
          this.setResultJson(JSON.stringify(results, null, 4));

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
            if (this.resourceId?.startsWith("#") && this.library?.contained && this.library.contained[0]) {
              this.resourceId = undefined;
                const resourceJson = JSON.stringify(this.library.contained[0], null, 4); // really should lookup by ID
                if (resourceJson) {
                  this.resourceJsonEditor.setValue(resourceJson);
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
          if (this.resourceJsonEditor) {
            const resourceJson = JSON.stringify(results, null, 4);
            if (resourceJson) {
              this.resourceJsonEditor.setValue(resourceJson);
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
      var environment: any = { resource: fhirData };

      let contextNodes: any[] = [];

      (this as any).$appInsights?.trackEvent({ name: 'evaluate fhirpath.js' });

      const contextExpression = this.getContextExpression();
      if (contextExpression) {
        // scan over each of the expressions
        try {
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
          if (resData.context) {
            useExpression = `${resData.context}.select(${useExpression})`;
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
      if (this.getResourceJson()) {
        this.shareToolTipMessage += '\r\n(without example resource JSON)';
      }
    },

    copyShareLinkToClipboard() {
      const url = new URL(window.location.href);
      // console.log(url);
      let shareUrl = `${url.origin}/FhirPath?expression=${encodeURIComponent(this.getFhirpathExpression() ?? '')}`;
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
      let resourceJson = this.getResourceJson();
      if (this.selectedEngine == "fhirpath.js") {
        await this.evaluateExpressionUsingFhirpathjs();
        return;
      }

      // brianpos hosted service
      // default the firely SDK/brianpos service
      let url = `https://qforms-server.azurewebsites.net/$fhirpath`;

      let p: fhir4.Parameters = { resourceType: "Parameters", parameter: [{ name: "expression", valueString: this.getFhirpathExpression() ?? 'today()' }] };

      const contextExpression = this.getContextExpression();
      if (contextExpression) {
        p.parameter?.push({ name: "context", valueString: contextExpression });
      }

      if (this.selectedEngine == "java (HAPI)") {
        // https://github.com/jkiddo/fhirpath-tester/blob/main/src/main/java/org/example/Evaluator.java (brianpos fork of this)
        // https://docs.microsoft.com/en-us/azure/devops/pipelines/ecosystems/java-function?view=azure-devops
        url = `https://fhirpath-lab-java.azurewebsites.net/fhir/$fhirpath`;
        // url = 'https://localhost:44378/$fhirpath2'

        if (!this.getResourceJson() && this.resourceId) {
          await this.downloadTestResource();
          resourceJson = this.getResourceJson();        
        }

        // removing this constraint as there are expression tests 
        // that you can do that don't require a resource.  
        // if (!this.resourceJson) {
        //   return;
        // }
        (this as any).$appInsights?.trackEvent({ name: 'evaluate HAPI' });
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
      loadingData: true,
      showOutcome: false,
      showAdvancedSettings: false,
      terminologyServer: 'https://sqlonfhir-r4.azurewebsites.net/fhir',
      results: [],
      selectedEngine: "fhirpath.js",
      executionEngines: [
        ".NET (firely)",
        "fhirpath.js",
        "java (HAPI)"
      ],
      shareToolTipMessage: shareTooltipText,
      expressionEditor: undefined,
      expressionContextEditor: undefined,
      debugEditor: undefined,
      resourceJsonEditor: undefined,
    };
  },
});
</script>
