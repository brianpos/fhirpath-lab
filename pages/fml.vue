<template>
  <div style="height:100%;padding: 60px 0 0 0;">
    <HeaderNavbar @close-settings="settingsClosed">
      <template v-slot:extraNavButtons>
        <v-select dark class="engineselector" :items="executionEngines" v-model="selectedEngine" hide-details="auto"
          @change="evaluateFhirPathExpression" />
        <v-btn icon dark accesskey="g" title="press alt+g to go" @focus="checkFocus"
          @click="evaluateFhirPathExpression">
          <v-icon>
            mdi-play
          </v-icon>
        </v-btn>
        <div v-if="trace.length > 0" style="border-radius: 8px; border: solid 1px white; padding: 4px; margin-left: 6px;">
          <v-btn v-if="debugTracePosition != undefined" x-small dark icon @click="debugTracePosition = 1; debuggerStepBack()" title="Reset to first trace">
            <v-icon>
              mdi-bug-play-outline
            </v-icon>
          </v-btn>
          <v-btn v-if="trace.length > 0" x-small dark icon @click="debuggerStepForward()" :disabled="debugTracePosition >= trace.length - 1" title="Step forward in trace">
            <v-icon>
              mdi-debug-step-into
            </v-icon>
          </v-btn>
          <v-btn v-if="trace.length > 0" x-small dark icon @click="debuggerStepBack()" :disabled="debugTracePosition <= 0" title="Step back in trace">
            <v-icon>
              mdi-debug-step-out
            </v-icon>
          </v-btn>
        </div>
      </template>
    </HeaderNavbar>
    <table-loading v-if="loadingData" />

    <div class="container-fluid bd-layout" style="padding-top: 16px">
      <v-card>
        <twin-pane-tab :tabs="tabDetails" ref="twinTabControl" @mounted="twinPaneMounted" @change="tabChanged">
          <template v-slot:Map>
            <v-text-field label="StructureMap Id" v-model="structureMapId" hide-details="auto" autocomplete="off"
              @input="updateNow" autocorrect="off" autocapitalize="off" spellcheck="false" style="flex-grow: 0;">
              <template v-slot:append>
                <v-btn icon small tile @click="structureMapId = undefined">
                  <v-icon> mdi-close </v-icon>
                </v-btn>
                <v-btn icon small tile @click="downloadStructureMapResource">
                  <v-icon> mdi-download </v-icon>
                </v-btn>
                <!-- <v-btn small icon tile @click="reformatMap"><v-icon title="Format json" dark> mdi-format-indent-increase </v-icon></v-btn> -->
                <v-btn small icon tile @click="validateMap"><v-icon title="Validate FML"> mdi-note-check-outline
                  </v-icon></v-btn>
              </template>
            </v-text-field>

            <label class="v-label theme--light bare-label">FHIR Map</label>
            <div class="resource" ref="aceEditorExpression"></div>
          </template>

          <template v-slot:Input>
            <resource-editor label="Test Resource Id" ref="inputResourceEditor" textLabel="Test Resource"
              :resourceUrl="resourceId" @update:resourceUrl="resourceId = $event" :resourceText="resourceText"
              @update:resourceText="resourceText = $event" />
          </template>

          <template v-slot:Models>
            <!-- <div class="ct-header">
              <v-icon left dark> mdi-tree-outline </v-icon>
              Models
            </div> -->
            <resource-editor ref="editorModels" label="Model ID/Search Query"
              textLabel="StructureDefinition / Bundle Text" :resourceUrl="modelsSearch"
              @update:resourceUrl="modelsSearch = ($event ?? '')"
              footerLabel="The Model can be either an individual StructureDefinition (e.g. logical model) or a search query for a bundle of models"
              :resourceText="modelsText"
              @update:resourceText="modelsText = $event" />
          </template>

          <template v-slot:Trace>
            <div class="ct-header">
              <v-icon left dark> mdi-format-list-bulleted </v-icon>
              Trace / Debug
            </div>
            <v-simple-table style="flex-shrink:1;" ref="traceTable">
              <template v-for="(v1, index) in trace">
                <tr :key="index" :class="debugTraceRowClass(index)">
                  <td class="result-value">
                    <v-btn x-small style="float:left;" icon @click="navigateToTrace(v1)">
                      <v-icon>
                        mdi-target
                      </v-icon>
                    </v-btn>
                    <div :class="traceTypeClass(v1.type)">{{ v1.value }}</div>
                  </td>
                </tr>
              </template>
            </v-simple-table>
            <div v-if="variables.length > 0" class="ct-header">
              <v-icon left dark> mdi-application-variable-outline </v-icon>
              Variables
            </div>
            <v-simple-table v-if="variables.length > 0" >
              <th></th><th>mode</th><th>name</th><th>path</th>
              <template v-for="(v1, index) in variables">
                <tr :key="index">
                  <td>
                    <v-btn x-small icon  @click="navigateToVariable(v1)">
                      <v-icon>
                        mdi-target
                      </v-icon>
                    </v-btn>
                  </td>
                  <td>{{ v1.mode.toLowerCase() }}</td>
                  <td>{{ v1.name }}</td>
                  <td width="70%">{{ v1.path }}</td>
                </tr>
              </template>
            </v-simple-table>
          </template>

          <template v-slot:Variables>
            <div class="ct-header">
              <v-icon left dark> mdi-application-variable-outline </v-icon>
              Variables
            </div>
            <v-simple-table >
              <th></th><th>mode</th><th>name</th><th>path</th>
              <template v-if="variables.length > 0" v-for="(v1, index) in variables">
                <tr :key="index">
                  <td>
                    <v-btn x-small icon  @click="navigateToVariable(v1)">
                      <v-icon>
                        mdi-target
                      </v-icon>
                    </v-btn>
                  </td>
                  <td>{{ v1.mode.toLowerCase() }}</td>
                  <td>{{ v1.name }}</td>
                  <td width="70%">{{ v1.path }}</td>
                </tr>
              </template>
            </v-simple-table>
          </template>

          <template v-slot:Output>
            <div class="ct-header">
              <v-icon left dark> mdi-file-document-outline </v-icon>
              <span>Results <span class="processedBy">{{ processedByEngine }}</span></span>
            </div>
            <resource-editor textLabel="Transformed Output" ref="outputResourceEditor" :readOnly="true"
              :resourceText="(results ? results.value : '')" />
          </template>

          <template v-slot:AI_Chat>
            <Chat class="chat" ref="chatComponent" feature="FHIRPathTester" :openAIFeedbackEnabled="false"
              :suggestionsWhenEmpty="chatPromptOptionsWhenEmpty" :suggestions="chatPromptOptions"
              :publisher="defaultProviderField" @remove-suggestion="removeSuggestion" @send-message="handleSendMessage"
              @reset-conversation="resetConversation" @apply-suggested-context="copySuggestionToClipboard"
              @apply-suggested-expression="copySuggestionToClipboard"
              @apply-suggested-questionnaire="copySuggestionToClipboard"
              @apply-suggested-item="copySuggestionToClipboard" @apply-suggested-fhir="copySuggestionToClipboard"
              @apply-suggested-json="copySuggestionToClipboard" @apply-suggested-fsh="copySuggestionToClipboard"
              @apply-suggested-jsonpatch="copySuggestionToClipboard" />
          </template>

          <template v-slot:Debug>
            <resource-editor textLabel="Debug" :readOnly="true" :resourceText="debugText" />
          </template>

          <template v-slot:Errors>
            <OperationOutcomePanel :outcome="saveOutcome" @close="saveOutcome = undefined"
              @help-with-issue="helpWithIssue" />
          </template>

        </twin-pane-tab>
      </v-card>

      <br />
      <OperationOutcomeOverlay style="z-index: 8" v-if="showOutcome" :saveOutcome="saveOutcome"
        :showOutcome="showOutcome" title="Error" @close="clearOutcome" />
    </div>

    <OperationOutcomeOverlay v-if="showOutcome" :saveOutcome="saveOutcome" :showOutcome="showOutcome" title="Error"
      @close="clearOutcome" />
  </div>
</template>

<style lang="scss">
.v-application--wrap {
  background-color: lightgray;
}

.debugSelection {
  position: absolute;
  z-index: 20;
  background-color: #fbff82b1;
}

.resultSelection {
  position: absolute;
  z-index: 20;
  background-color: #5240ef65;
}
</style>

<style lang="scss" scoped>
.engineselector {
  padding-left: 6px;
  max-width: 18ch;
}

@media (max-width: 600px) {

  .newlayout>div {
    min-height: 20vh;
    max-height: 75vh
  }

  ;

  .ct-debug {
    display: none !important;
    grid-column-end: 2 !important;
  }
}

.newlayout>div {
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

.ct-header+div {
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

.header-text {
  overflow-wrap: anywhere;
}

.grid-toolbar {
  display: grid;
  grid-gap: 4px;
  grid-template-columns: 25px auto max-content
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

<style lang="scss" scoped>
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

.debuggingRow {
  background-color: aqua;
}

.processedBy {
  float: right;
  font-size: small;
  text-transform: none;
}

.resource {
  height: calc(100vh - 280px);
}

.chat {
  height: calc(100vh - 200px);
}

.debug {
  height: calc(100vh - 196px);
}

@media (max-width: 596px) {
  .resource {
    height: calc(100vh - 320px - 48px);
  }

  .chat {
    height: calc(100vh - 200px - 48px);
  }

  .debug {
    height: calc(100vh - 196px - 48px);
  }
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
import { getExtensionStringValue, getExtensions } from "fhir-extension-helpers";
// import { getPreferredTerminologyServerFromSDC } from "fhir-sdc-helpers";
import fhirpath from "fhirpath";
import fhirpath_r4_model from "fhirpath/fhir-context/r4";
import { setAcePaths, Rules as FhirPathHightlighter_Rules, setCustomHighlightRules } from "~/helpers/fhirpath_highlighter"
import "~/assets/fhirpath_highlighter.scss"
import { IApplicationInsights } from '@microsoft/applicationinsights-web'
import { findNodeByPath, IJsonNode, IJsonNodePosition, parseJson } from "~/helpers/json_parser";
import TwinPaneTab, { TabData } from "~/components/TwinPaneTab.vue";
import {
  GetFmlSystemPrompt,
} from "~/helpers/openai_form_tester";
import Chat from "~/components/Chat.vue";
import ResourceEditor from "~/components/ResourceEditor.vue";

import { parseFML } from "~/helpers/fml_parser";
import type { FmlStructureMap } from "~/helpers/fml_models";
import xmlFormat from 'xml-formatter';

import "ace-builds";
import ace from "ace-builds";
import "ace-builds/src-noconflict/mode-text";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-chrome";

import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from "lz-string";
import { TestFhirMapData, VariableData } from "~/models/testenginemodel";
import { OperationOutcomeIssue } from "fhir/r4b";
import { ChatCompletionCreateParamsNonStreaming, ChatCompletionMessageParam } from "openai/resources/chat/completions";
import {
  EvaluateChatPrompt,
  GetSystemPrompt,
  IOpenAISettings,
} from "~/helpers/openai_utils";
import { VueComponent } from "vuereact-combined";

const shareTooltipText = 'Copy a sharable link to this test expression';
const shareZulipTooltipText = 'Copy a sharable link for Zulip to this test expression';

const sampleXmlResource = `{
  "resourceType": "Patient",
  "id": "pat1",
  "meta": {
    "versionId": "1",
    "lastUpdated": "2025-05-05T16:55:32.8902484+10:00",
    "source": "package/Patient-pat1.json",
    "tag": [
      {
        "system": "http://terminology.hl7.org/CodeSystem/v3-ActReason",
        "code": "HTEST",
        "display": "test health data"
      }
    ]
  },
  "identifier": [
    {
      "use": "usual",
      "type": {
        "coding": [
          {
            "system": "http://terminology.hl7.org/CodeSystem/v2-0203",
            "code": "MR"
          }
        ]
      },
      "system": "urn:oid:0.1.2.3.4.5.6.7",
      "value": "654321"
    }
  ],
  "active": true,
  "name": [
    {
      "use": "official",
      "family": "Donald",
      "given": [
        "Duck"
      ]
    }
  ],
  "gender": "male",
  "contact": [
    {
      "relationship": [
        {
          "coding": [
            {
              "system": "http://terminology.hl7.org/CodeSystem/v2-0131",
              "code": "E"
            }
          ]
        }
      ],
      "organization": {
        "reference": "Organization/1",
        "display": "Walt Disney Corporation"
      }
    }
  ],
  "managingOrganization": {
    "reference": "Organization/1",
    "display": "ACME Healthcare, Inc"
  },
  "link": [
    {
      "other": {
        "reference": "Patient/pat2"
      },
      "type": "seealso"
    }
  ]
}
`;

interface FhirMapData {
  prevFocus?: any;
  raw?: fhir4b.Parameters;
  defaultProviderField?: string;
  structureMapId?: string;
  resourceId?: string;
  resourceText?: string;
  resourceJsonChanged: boolean;
  modelsSearch: string;
  modelsText?: string;
  debugText: string;
  loadingData: boolean;
  saveOutcome?: fhir4b.OperationOutcome;
  showOutcome?: boolean;
  helpWithError?: string;
  showMapSelector?: boolean;
  showResourceSelector?: boolean;
  showAdvancedSettings: boolean;
  cancelSource?: CancelTokenSource;
  tab: any;
  results?: ResultData;
  trace: TraceData[];
  variables: VariableData[];
  selectedEngine: string;
  expressionEditor?: ace.Ace.Editor;
  testResourceFormat: string;
  processedByEngine?: string;
  chatEnabled: boolean;
  openAILastContext: string;
  openAIexpressionExplanationLoading: boolean;
  parsedFmlMap?: FmlStructureMap;

  // debugger state information
  debugTracePosition: number;
  debugMapSelectionMarker?: number[];
  debugInputResourceSelectionMarker?: number[];
  debugOutputResourceSelectionMarker?: number[];
}

interface ResultData {
  type: string;
  value: any;
}

interface TraceData {
  name: string;
  type?: string;
  value: string;
  startPosition?: number;
  length?: number;
  variables?: VariableData[];
}

function getValue(entry: fhir4b.ParametersParameter): ResultData | undefined {
  let myMap = new Map(Object.entries(entry));
  for (let [k, v] of myMap.entries()) {
    if (k.startsWith('value'))
      return { type: k.replace('value', ''), value: v };
    else if (k == 'resource')
      return { type: (v as fhir4b.Resource).resourceType, value: v };
  }
  const extVal = getExtensionStringValue(entry, "http://fhir.forms-lab.com/StructureDefinition/json-value");
  if (extVal)
    return { type: entry.name, value: JSON.parse(extVal) };
  return undefined;
}
function getTraceValue(entry: fhir4b.ParametersParameter): TraceData[] {
  let result: TraceData[] = [];
  if (entry.part) {
    for (let part of entry.part) {
      const cursorPosition = getExtensionStringValue(part, "http://fhirpath-lab.com/StructureDefinition/Cursor")
      let startPosition: number|undefined = undefined;
      let length: number|undefined = undefined;
      if (cursorPosition) {
        // extract the formatted position value (start - end)
        const posParts = cursorPosition?.replace(" ", "").split('-');
        if (posParts.length == 2) {
          startPosition = parseInt(posParts[0]);
          length = parseInt(posParts[1]) - startPosition;
        }
      }
      const val = getValue(part);
      let traceData: TraceData = {
        name: entry.valueString ?? '',
        type: part.name,
        value: '',
        startPosition: startPosition,
        length: length,
      };
      if (part.name === "debug") {
        traceData.value = val?.value;
      }
      else {
        traceData.value = JSON.stringify(val?.value, null, 4);
      }
      result.push(traceData);

      // Load in any variables
      let vars = getExtensions(part, "http://fhirpath-lab.com/StructureDefinition/Variable");
      if (vars && vars.length > 0) {
        console.log(vars)
        for (let v of vars) {
          if (v.extension) {
            let varName = v.extension[0].valueString;
            let varMode = v.extension[0].url;
            let varValuePath = getExtensionStringValue(v, "path");
            if (varName && varValuePath) {
              traceData.variables = traceData.variables ?? [];
              var varData: VariableData = {
                name: varName,
                path: varValuePath,
                data: varValuePath,
                mode: varMode.replace("name-", ""),
              };
              traceData.variables.push(varData);
              console.log(varMode, varName, traceData.variables);
            }
          }
        }
      }
    }
  }
  return result;
}
function getPriorityIssue(
  issues: OperationOutcomeIssue[] | undefined
): OperationOutcomeIssue | undefined {
  if (issues && issues.length > 0) {
    for (const issue of issues) {
      if (issue.severity === "fatal") return issue;
      if (issue.severity === "error") return issue;
    }
    for (const issue of issues) {
      if (issue.severity === "warning") return issue;
    }
    // we shouldn't return any information messages
    // (which are the only types left)
  }
  return undefined;
}

export default Vue.extend({
  components: { ResourceEditor },
  // components: {
  // },
  // head: {
  //   title: "FhirPathTester",
  // },
  async mounted() {
    setAcePaths(ace.config);
    this.defaultProviderField = settings.getDefaultProviderField();
    this.showAdvancedSettings = settings.showAdvancedSettings();

    if (settings.getOpenAIKey() || settings.getOpenAIBasePath())
      this.chatEnabled = true;

      document.addEventListener('keydown', this.DebugFunctionKeyHandler);
  },

  beforeDestroy() {
    document.removeEventListener('keydown', this.DebugFunctionKeyHandler);
  },

  computed: {
    executionEngines(): string[] { 
      if (this.showAdvancedSettings){
        return [
          ".NET (brianpos)",
          "java (HAPI)",
          "matchbox"
        ];
      }
      return [
        ".NET (brianpos)",
        "java (HAPI)",
        "matchbox" // matchbox now released! Thanks Oliver
      ]
    },

    tabDetails(): TabData[] {
      return [
        {
          iconName: "mdi-function-variant",
          tabName: "Map",
          show: true,
          enabled: true,
        },
        {
          iconName: "mdi-clipboard-text-outline",
          tabName: "Input",
          tabHeaderName: "Test Input Resource",
          show: true,
          enabled: true,
        },
        {
          iconName: "mdi-tree-outline",
          tabName: "Models",
          tabHeaderName: "Logical Models Required",
          title: "Logical Models Required\n(Structure Definitions)",
          show: true,
          enabled: true,
        },
        {
          iconName: "mdi-format-list-bulleted",
          tabName: "Trace",
          show: true,
          enabled: true,
        },
        {
          iconName: "mdi-file-document-outline",
          tabName: "Output",
          tabHeaderName: "Map Output",
          title: "Map Output",
          show: true,
          enabled: true,
        },
        {
          iconName: "mdi-application-variable-outline",
          tabName: "Variables",
          show: true, // this.variables.size > 0,
          enabled: true,
        },
        {
          iconName: "mdi-alert-circle-outline",
          tabName: "Errors",
          tabHeaderName: "Validation Errors",
          show: this.saveOutcome !== undefined,
          enabled: true,
        },
        {
          iconName: "mdi-brain",
          tabName: "AI Chat",
          tabHeaderName: "FHIRPath AI Chat",
          title: "FHIRPath AI Chat",
          show: this.chatEnabled,
          enabled: true,
        },
        {
          iconName: "mdi-bug-outline",
          tabName: "Debug",
          show: this.showAdvancedSettings,
          enabled: true,
        },
      ];
    },
    chatPromptOptionsWhenEmpty(): string[] {
      return [
        "Review the map for any issues and make some recommendations",
        "Add a name to all complex rules (that aren't a simple copy, and don't already have a name)",
        "Convert the dependent block into a backbone element",
      ];
    },
    chatPromptOptions(): string[] {
      let promptOptions = [];
      if (this.helpWithError) {
        promptOptions.push(this.helpWithError);
      }
      return promptOptions;
    },
  },
  methods: {
    async twinPaneMounted(): Promise<void> {
      // Update the editor's Mode
      let editorDiv: any = this.$refs.aceEditorExpression as Element;
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
        this.expressionEditor.setValue(`/// url = 'http://fhirpath-lab.com/StructureMap/intro-patient-map'
/// name = 'IntroPatientMap'
/// status = 'draft'
/// version = '0.1'

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

      // this.selectTabs(0, 4, 'left');
      this.selectTab(1);

      // Check for the encoded parameters first
      const parameters = this.$route.query.parameters as string;
      let data: TestFhirMapData;
      // Read in any parameters from the URL
      data = this.readParametersFromQuery();

      await this.applyParameters(data);
      await this.evaluateFhirPathExpression();
      this.loadingData = false;
    },

    DebugFunctionKeyHandler(event: KeyboardEvent): void {
      // Ctrl + Enter to evaluate the expression
      // Command + Enter to evaluate the expression on MacOS
      if (!event.shiftKey && event.key === "F10") {
        this.debuggerStepForward();
        event.preventDefault();
      }
      if (event.shiftKey && event.key === "F10") {
        this.debuggerStepBack();
        event.preventDefault();
      }
    },

    scrollIntoView(traceIndex: number): void {
      this.$nextTick(() => {
        // Trace table: this.$refs.traceTable

        // scroll the trace item into view
        const traceTable = this.$refs.traceTable as VueComponent;
        // console.log(traceTable);
        const traceRow = traceTable.$el.querySelectorAll("tr")[traceIndex];
        if (traceRow) {
          traceRow.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      });
    },

    tabChanged(index: Number): void {
      // Workaround to refresh the display in the response editor when it is updated while the form is not visible
      // https://github.com/ajaxorg/ace/issues/2497#issuecomment-102633605
      if (index === 0) {
        setTimeout(() => {
          // expressionEditor: undefined,
          // resourceJsonEditor: undefined,

          if (this.expressionEditor) {
            this.expressionEditor.resize();
            this.updateNow();
          }
        });
      }
    },

    updateNow() {
      this.$forceUpdate();
    },

    clearDebuggerSelectionMarkers() {
      let inputResourceEditor = this.$refs.inputResourceEditor as ResourceEditor;
      let outputResourceEditor = this.$refs.outputResourceEditor as ResourceEditor;
      this.removeMarkers(this.expressionEditor!, this.debugMapSelectionMarker ?? []);
      inputResourceEditor.removeMarkers(this.debugInputResourceSelectionMarker ?? []);
      outputResourceEditor.removeMarkers(this.debugOutputResourceSelectionMarker ?? []);
      this.debugMapSelectionMarker = [];
      this.debugInputResourceSelectionMarker = [];
      this.debugOutputResourceSelectionMarker = [];
    },

    highlightDebuggerVariables() {
      let inputResourceEditor = this.$refs.inputResourceEditor as ResourceEditor;
      let outputResourceEditor = this.$refs.outputResourceEditor as ResourceEditor;
      let inputPaths: string[] = [];
      let outputPaths: string[] = [];
      for (let n = this.variables.length - 1; n >= 0; n--) {
        const variable = this.variables[n];
        if (variable.mode === 'INPUT' && variable.path) {
          let skip = false;
          for (let p of inputPaths) {
            if (p.length > variable.path.length && p.startsWith(variable.path)) {
              // already highlighted
              skip = true;
              break;
            }
          }
          if (skip) {
            console.log("Skipping input variable highlight for ", variable.path);
            continue;
          }
          inputPaths.push(variable.path);
          const marker = inputResourceEditor.navigateToContext(fhirpath_r4_model, variable.path, variable.name, true);
          console.log("Input Variable Marker: ", marker);
          if (marker) {
            this.debugInputResourceSelectionMarker?.push(marker);
          }
        } else if (variable.mode === 'OUTPUT' && variable.path) {
          let skip = false;
          for (let p of outputPaths) {
            if (p.length > variable.path.length && p.startsWith(variable.path)) {
              // already highlighted
              skip = true;
              break;
            }
          }
          if (skip) {
            console.log("Skipping output variable highlight for ", variable.path);
            continue;
          }
          console.log('Highlighting output variable: ', variable.path);
          outputPaths.push(variable.path);
          const marker = outputResourceEditor.navigateToContext(fhirpath_r4_model, variable.path, variable.name, true);
          if (marker) {
            this.debugOutputResourceSelectionMarker?.push(marker);
          }
          console.log("Output Variable Marker: ", marker, this.debugOutputResourceSelectionMarker);
        }
      }
    },

    debuggerStepBack() {
      this.clearDebuggerSelectionMarkers();

      if (this.debugTracePosition > 0)
        this.debugTracePosition--;
      const trace = this.trace[this.debugTracePosition];
      if (trace.startPosition && trace.length) {
        this.highlightText(this.expressionEditor, trace.startPosition, trace.length, true);
      }
      this.variables = trace.variables ?? [];
      this.scrollIntoView(this.debugTracePosition);

      // also highlight any variables
      this.highlightDebuggerVariables();
    },

    debuggerStepForward() {
      this.clearDebuggerSelectionMarkers();

      if (this.debugTracePosition < this.trace.length-1)
      {
        this.debugTracePosition++;
      }  else {
        return;
      }
      const trace = this.trace[this.debugTracePosition];
      if (trace.startPosition && trace.length) {
        this.highlightText(this.expressionEditor, trace.startPosition, trace.length, true);
      }
      this.variables = trace.variables ?? [];
      this.scrollIntoView(this.debugTracePosition);

      // also highlight any variables
      this.highlightDebuggerVariables();
    },

    highlightText(editor?: ace.Ace.Editor, startPosition?: number, length?: number, debugMode?: boolean): void {
      if (!editor || startPosition == undefined || length == undefined) return;
      let value = editor.getValue();

      // determine the starting line/column from the raw position in the string
      let textBeforeSelection = value.substring(0, startPosition);
      let startLine = textBeforeSelection.split(/\r\n|\r|\n/).length;
      let startColumn = textBeforeSelection.length - textBeforeSelection.lastIndexOf('\n') - 1;
      let selectedText = value.substring(startPosition, startPosition + length);
      // console.log("Highlighting: ", selectedText);
      
      // determining the ending line/column from the length of the selected text
      let endLine = startLine + selectedText.split(/\r\n|\r|\n/).length - 1;
      let endColumn = selectedText.length - selectedText.lastIndexOf('\n') - 1;
      if (startLine == endLine) {
        endColumn = startColumn + selectedText.length;
      }
      const range = new ace.Range(startLine-1, startColumn, endLine-1, endColumn);
      // console.log("Range: ", range);
      
      editor.clearSelection();
      editor.focus();
      editor.gotoLine(startLine, startColumn, true);
      // editor.selection.setRange(range);

      if (debugMode){
        const debugMarker = editor.session.addMarker(range, "debugSelection", "text", false);
        this.debugMapSelectionMarker?.push(debugMarker);
      }
      else{
        const selectionMarker = editor.session.addMarker(range, "resultSelection", "text", true);
        // after 1.5 seconds remove the highlight.
        setTimeout(() => {
          // console.log("Removing marker", selectionMarker);
          this.removeMarker(editor, selectionMarker);
        }, 1500);
      }
      this.updateNow();
    },

    removeMarker(editor: ace.Ace.Editor, markerId: number): void {
      if (editor && markerId) {
        editor.session.removeMarker(markerId);
      }
    },

    removeMarkers(editor: ace.Ace.Editor, markerIds: number[]): void {
      if (editor && markerIds && markerIds.length > 0) {
        for (let markerId of markerIds) {
          editor.session.removeMarker(markerId);
        }
      }
    },

    findRuleInList(rules: any[], ruleName: string, normalizedSearchName: string): any {
      // Search through a list of rules, including nested dependent rules
      const matchesBySourceElement: any[] = [];
      
      for (const rule of rules) {
        // Try exact match first
        if (rule.name === ruleName) {
          return rule;
        }
        
        // Try normalized match
        const normalizeRuleName = (name: string) => name.toLowerCase().replace(/[-_\s]/g, '');
        if (rule.name && normalizeRuleName(rule.name) === normalizedSearchName) {
          return rule;
        }
        
        // Recursively search in dependent rules
        if (rule.dependent && rule.dependent.rules && rule.dependent.rules.length > 0) {
          const foundInDependent = this.findRuleInList(rule.dependent.rules, ruleName, normalizedSearchName);
          if (foundInDependent) {
            return foundInDependent;
          }
        }
        
        // Fallback: check source.element for unnamed rules
        // This handles simple copy rules like "src.id -> tgt.id" where the rule has no name
        if (!rule.name && rule.sources && rule.sources.length > 0) {
          for (const source of rule.sources) {
            if (source.element === ruleName || (source.element && normalizeRuleName(source.element) === normalizedSearchName)) {
              matchesBySourceElement.push(rule);
              break; // Don't add the same rule multiple times
            }
          }
        }
      }
      
      // If we found matches by source.element, only return if there's exactly one
      // Multiple matches would be ambiguous, so we do nothing in that case
      if (matchesBySourceElement.length === 1) {
        console.log('Found unnamed rule by source.element:', ruleName);
        return matchesBySourceElement[0];
      } else if (matchesBySourceElement.length > 1) {
        console.log(`Found ${matchesBySourceElement.length} unnamed rules with source.element matching "${ruleName}" - too ambiguous, skipping`);
      }
      
      return null;
    },

    populateTracePositions() {
      // Populate position information for trace entries that don't have it
      if (!this.parsedFmlMap || !this.trace || this.trace.length === 0) {
        return;
      }

      const fmlText = this.getFhirpathExpression();
      if (!fmlText) return;

      for (let trace of this.trace) {
        // Skip if position already populated
        if (trace.startPosition !== undefined && trace.length !== undefined) {
          continue;
        }

        if (!trace.value) continue;

        // Parse trace name - format examples:
        // "Group : patientMap; vars = ..."
        // "  rule : bundleid; vars = ..."
        let groupName: string | undefined;
        let ruleName: string | undefined;

        const traceName = trace.value.trim();
        
        // Check if it's a group trace
        const groupMatch = traceName.match(/^Group\s*:\s*([^;]+)/);
        if (groupMatch) {
          groupName = groupMatch[1].trim();
        } else {
          // Check if it's a rule trace
          const ruleMatch = traceName.match(/^rule\s*:\s*([^;]+)/);
          if (ruleMatch) {
            ruleName = ruleMatch[1].trim();
            // For rules, we need to find which group they belong to
            // We'll search all groups for this rule
          }
        }

        if (!groupName && !ruleName) continue;

        let position;

        if (groupName) {
          // Find the group in the parsed map
          const group = this.parsedFmlMap.groups.find(g => g.name === groupName);
          if (group && group.position) {
            position = group.position;
          }
        } else if (ruleName) {
          // Search for the rule in all groups
          console.log('Searching for rule:', ruleName);
          // Normalize rule name for comparison (remove hyphens, underscores, etc.)
          const normalizeRuleName = (name: string) => name.toLowerCase().replace(/[-_\s]/g, '');
          const normalizedSearchName = normalizeRuleName(ruleName);
          
          for (const group of this.parsedFmlMap.groups) {
            console.log('Checking group:', group.name, 'rules:', group.rules.map(r => r.name || '(unnamed)'));
            if (group.rules) {
              // Use recursive search to find rule in top-level and dependent rules
              const rule = this.findRuleInList(group.rules, ruleName, normalizedSearchName);
              
              if (rule && rule.position) {
                position = rule.position;
                console.log('Found rule position:', position);
                break;
              }
            }
          }
          if (!position) {
            console.log('Rule position not found for:', ruleName);
          }
        }

        // Populate the trace with position information
        if (position) {
          trace.startPosition = position.startIndex;
          trace.length = position.endIndex - position.startIndex;
        }
      }

      console.log('Populated trace positions from FML map');
    },

    navigateToVariable(variable: VariableData) {
      console.log('variable:', variable);
      let inputResourceEditor = this.$refs.inputResourceEditor as ResourceEditor;
      let outputResourceEditor = this.$refs.outputResourceEditor as ResourceEditor;
      let tabControl: TwinPaneTab = this.$refs.twinTabControl as TwinPaneTab;

      if (variable.mode === 'INPUT' && variable.path) {
        const marker = inputResourceEditor.navigateToContext(fhirpath_r4_model, variable.path);
        tabControl?.selectTab(1);
      } else if (variable.mode === 'OUTPUT' && variable.path) {
        const marker = outputResourceEditor.navigateToContext(fhirpath_r4_model, variable.path);
        tabControl?.selectTab(4);
      }
    },
    navigateToTrace(trace: TraceData) {
      console.log('trace:', trace);
      if (trace.startPosition && trace.length) {
        this.highlightText(this.expressionEditor, trace.startPosition, trace.length);
      }
      
      // Scan trace information to determine group/rule association
      if (this.parsedFmlMap && trace.value) {
        const traceName = trace.value.trim();
        console.log('Analyzing trace line:', traceName);
        
        // Parse trace name - format examples:
        // "Group : patientMap; vars = ..."
        // "  rule : bundleid; vars = ..."
        let groupName: string | undefined;
        let ruleName: string | undefined;
        
        // Check if it's a group trace
        const groupMatch = traceName.match(/^Group\s*:\s*([^;]+)/);
        if (groupMatch) {
          groupName = groupMatch[1].trim();
        } else {
          // Check if it's a rule trace
          const ruleMatch = traceName.match(/^rule\s*:\s*([^;]+)/);
          if (ruleMatch) {
            ruleName = ruleMatch[1].trim();
          }
        }
        
        if (groupName) {
          // Find the group in the parsed map
          const group = this.parsedFmlMap.groups.find(g => g.name === groupName);
          
          if (group) {
            console.log('Found group:', {
              name: group.name,
              parameters: group.parameters,
              extends: group.extends,
              typeMode: group.typeMode,
              rulesCount: group.rules.length,
              position: group.position
            });
          } else {
            console.log('Group not found:', groupName);
            console.log('Available groups:', this.parsedFmlMap.groups.map(g => g.name));
          }
        } else if (ruleName) {
          // Search for the rule in all groups
          console.log('Searching for rule:', ruleName);
          // Normalize rule name for comparison (remove hyphens, underscores, etc.)
          const normalizeRuleName = (name: string) => name.toLowerCase().replace(/[-_\s]/g, '');
          const normalizedSearchName = normalizeRuleName(ruleName);
          
          let foundRule = false;
          for (const group of this.parsedFmlMap.groups) {
            console.log('  Checking group:', group.name, '- rules:', group.rules.map(r => r.name || '(unnamed)'));
            if (group.rules) {
              // Use recursive search to find rule in top-level and dependent rules
              const rule = this.findRuleInList(group.rules, ruleName, normalizedSearchName);
              
              if (rule) {
                if (rule.name !== ruleName) {
                  console.log('Found rule using normalized match (original:', rule.name, ', searched:', ruleName, ')');
                }
                console.log('Found rule in group:', group.name);
                console.log('Rule details:', {
                  name: rule.name,
                  sources: rule.sources,
                  targets: rule.targets,
                  position: rule.position,
                  hasDependent: !!rule.dependent
                });
                foundRule = true;
                break;
              }
            }
          }
          if (!foundRule) {
            console.log('Rule not found:', ruleName, '(normalized:', normalizedSearchName, ')');
            console.log('All available rules across groups (including nested):');
            const collectAllRules = (rules: any[], depth = 0): string[] => {
              const indent = '  '.repeat(depth);
              const result: string[] = [];
              for (const r of rules) {
                const name = r.name || '(unnamed)';
                const normalized = name !== '(unnamed)' ? ` (normalized: ${normalizeRuleName(name)})` : '';
                result.push(`${indent}- ${name}${normalized}`);
                if (r.dependent && r.dependent.rules) {
                  result.push(...collectAllRules(r.dependent.rules, depth + 1));
                }
              }
              return result;
            };
            this.parsedFmlMap.groups.forEach(g => {
              console.log(`  Group ${g.name}:`);
              collectAllRules(g.rules, 1).forEach(line => console.log(line));
            });
          }
        }
      } else if (!this.parsedFmlMap) {
        console.log('FML map not yet parsed');
      }
    },

    selectTab(tabIndex: number) {
      let tabControl: TwinPaneTab = this.$refs.twinTabControl as TwinPaneTab;
      if (tabControl) {
        tabControl.selectTab(tabIndex);
      }
    },

    selectTabs(leftIndex: number, rightIndex: number, paneLocked: 'left' | 'right') {
      let tabControl: TwinPaneTab = this.$refs.twinTabControl as TwinPaneTab;
      if (tabControl) {
        tabControl.selectTabs(leftIndex, rightIndex, paneLocked);
      }
    },

    helpWithIssue(issue: fhir4b.OperationOutcomeIssue) {
      console.log("Help me with: ", issue);
      let issueText =
        "How can I resolve this issue from validating this Map?";
      if (issue.details?.text) issueText += "\r\n\r\n" + issue.details.text;
      if (issue.expression)
        issueText +=
          "\r\n\r\nLocation: `" + issue.expression.join("`\r\n\r\n") + "`";
      if (issue.location)
        issueText +=
          "\r\n\r\nLocation (alternate): `" +
          issue.location.join("`\r\n\r\n") +
          "`";
      if (issue.diagnostics)
        issueText +=
          "\r\n\r\nDiagnostics:\r\n``` log\r\n" + issue.diagnostics + "\r\n```";
      this.helpWithError = issueText;
    },

    copySuggestionToClipboard(suggestion: string) {
      console.log("Copied suggestion to clipboard: ", suggestion);
      navigator.clipboard.writeText(suggestion);
    },

    resetConversation(): void {
      this.openAILastContext = "";
    },

    async handleSendMessage(message: string) {
      console.log("Message sent:", message);
      const chat = this.$refs.chatComponent as Chat;

      this.openAIexpressionExplanationLoading = true;
      // this.openAIexpressionExplanationMessage = "Asking question...";
      chat.setThinking(true);

      // before asking the question, check to see if the question would require
      // the complete questionnaire to be included
      let settingsDataReq = this.GetAISettings();
      settingsDataReq.openAIModel = settings.getOpenAIFastModel();
      // let dataRequired = await DetectDataRequiredForQuery(settingsDataReq, message);

      // Perform any additional actions with the message here
      const systemPrompt = GetFmlSystemPrompt();

      let userQuestionContext: string = "";
      if (this.expressionEditor) {
        let fmlValue = this.expressionEditor.getValue();
        if (fmlValue.length > 0) {
          // if (dataRequired.Mode === "edit-item"
          //   || dataRequired.Mode === "edit-questionnaire"
          //   || dataRequired.QuestionnaireDefinition >= 8)
          userQuestionContext += `Based on the FHIR StructureMap in FML format\r\n\`\`\` fml\r\n  ${fmlValue}\n\n\`\`\`\r\n`;
        }
      }

      if (userQuestionContext != this.openAILastContext) {
        if (userQuestionContext.length > 0)
          chat.addMessage("Author", userQuestionContext, false);
        this.openAILastContext = userQuestionContext;
      }
      chat.addMessage("Author", message, true);

      // userQuestion += message;
      // chat.addMessage("Author", userQuestion, true);

      let prompt: Array<ChatCompletionMessageParam> = [];
      prompt.push({ role: "system", content: systemPrompt });
      prompt = prompt.concat(chat.getConversationChat());

      const resultOfQuestion = await EvaluateChatPrompt(
        prompt,
        this.GetAISettings(),
        1,
        4000
      );
      // this.openAIexpressionExplanationMessage = "(Generated by OpenAI " + settings.getOpenAIModel() + ")";
      this.openAIexpressionExplanationLoading = false;
      for (let answer of resultOfQuestion ?? [])
      {
        if (answer.role === "tool"){
          chat.addMessage("Tool", answer.content?.toString() ?? '', true, answer.tool_call_id);
        }
        chat.addMessage("FhirPath AI", answer.content?.toString() ?? '', true, settings.getOpenAIModel());
      }
      chat.setThinking(false);
    },

    readParametersFromQuery(): TestFhirMapData {
      // Umm, maybe use parameters that are more appropriate here, and consider a better way to handle this
      // Ilya was looking for it for his training usage - so likely others too.
      let data: TestFhirMapData = {
        expression: this.$route.query.expression as string
      };
      {
        if (this.$route.query.resource) {
          data.resource = this.$route.query.resource as string;
        }

        const resourceJson = this.$route.query.resourceJson;
        if (resourceJson) {
          data.resourceJson = decompressFromEncodedURIComponent(resourceJson as string) ?? '';
        }

        if (this.$route.query.models) {
          data.modelsSearch = this.$route.query.models as string ?? '';
        }

        if (this.$route.query.engine) {
          data.engine = this.$route.query.engine as string ?? '';
        }
      }
      return data;
    },
    async applyParameters(p: TestFhirMapData) {
      const modelSearch = p.modelsSearch;
      if (modelSearch) {
        this.modelsSearch = modelSearch;
        console.log('set', this.modelsSearch, modelSearch);
        // and execute the search
        let editorModels = this.$refs.editorModels as ResourceEditor;
        if (editorModels) {
          console.log('downloading...', this.modelsSearch);
          await editorModels.DownloadResource(this.modelsSearch);
        }
      }

      const resourceJson = p.resourceJson;
      if (resourceJson) {
        this.resourceText = resourceJson;
        this.resourceId = undefined;
      }

      if (p.engine) {
        this.selectedEngine = p.engine ?? '';
      }

      if (p.expression) {
        if (p.resource) {
          this.resourceId = p.resource;
        }

        if (this.expressionEditor) {
          this.expressionEditor.setValue(p.expression ?? '');
          this.expressionEditor.clearSelection();
          }
        }
    },

    fhirpathExpressionChangedEvent() {
    },
    tabTitle() {
      if (this.getResourceJson() && this.resourceJsonChanged) return '(local resource JSON)';
      return this.resourceId;
    },
    settingsClosed() {
      this.defaultProviderField = settings.getDefaultProviderField();
      this.showAdvancedSettings = settings.showAdvancedSettings();
      this.chatEnabled = settings.getOpenAIKey() !== undefined || settings.getOpenAIBasePath() !== undefined;
    },

    traceTypeClass(category: string | undefined): string {
      if (category === "debug") return "trace_debug";
      if (category === "info") return "trace_info";
      return "code-json";
    },

    debugTraceRowClass(position: number) : string | undefined {
      if (position == this.debugTracePosition)
        return "debuggingRow";
    },

    getFhirpathExpression(): string | undefined {
      const json = this.expressionEditor?.getValue();
      if (json && json.length > 0) {
        return json;
      }
      return undefined;
    },

    getResourceJson(): string | undefined {
      const json = this.resourceText;
      if (json && json.length > 0) {
        return json;
      }
      return undefined;
    },

    getModel(): string | undefined {
      const content = this.modelsText;
      if (content && content.length > 0 && content.trim().length > 0) {
        return content.trim();
      }
      return undefined;
    },

    clearOutcome() {
      this.showOutcome = undefined;
    },

    removeSuggestion(suggestion: string): void {
      console.log("remove suggestion: " + suggestion);
      this.helpWithError = undefined;
    },

    validateMap() {
      if (this.expressionEditor) {
        const fmlText = this.expressionEditor.getValue();
        this.saveOutcome = undefined;
        const result = parseFML(fmlText);
        this.helpWithError = undefined;
        if ('resourceType' in result && result.resourceType === "OperationOutcome") {
          this.saveOutcome = result;
          this.showOutcome = true;
          this.setResultJson(JSON.stringify(result, null, 4));

          // and grab the first item to send to the chat AI
          const priorityIssue = getPriorityIssue(this.saveOutcome.issue);
          if (priorityIssue) {
            this.helpWithIssue(priorityIssue);
          }
        }
      }
    },

    setResultJson(result: string) {
      this.debugText = result;
    },
    async executeRequest<T>(url: string, p: fhir4b.Parameters) {
      try {
        if (this.cancelSource) this.cancelSource.cancel("new map test started");
        this.cancelSource = axios.CancelToken.source();
        this.loadingData = true;
        let token = this.cancelSource.token;
        let response: AxiosResponse<fhir4b.Parameters | fhir4b.OperationOutcome, any>;
        response = await axios.post<fhir4b.Parameters>(url, p,
          {
            cancelToken: token,
            headers: {
              "Accept": requestFhirAcceptHeaders,
              "Content-Type": requestFhirContentTypeHeaders
            }
          });
        if (token.reason) {
          console.log(token.reason);
          return;
        }
        this.cancelSource = undefined;
        this.loadingData = false;

        const results = response.data;
        console.log("Response: ", results);
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
            for (let entry of this.raw.parameter) {
              if (entry.name === 'parameters') {
                // read the processing engine version
                if (entry.part && entry.part.length > 0 && entry.part[0].name === 'evaluator') {
                  this.processedByEngine = entry.part[0].valueString;
                }

                // The map would be in here too (but we can ignore that)
                continue; // skip over the configuration settings
              }

              if (entry.name === 'trace') {
                // Trace data
                this.trace.push(...getTraceValue(entry));
                continue;
              }

              if (entry.name === 'result') {
                this.results = getValue(entry);
              }
            }
          }

          // Populate trace positions from parsed FML map if available
          this.populateTracePositions();
        }
      } catch (err) {
        this.loadingData = false;
        if (axios.isAxiosError(err)) {
          const serverError = err as AxiosError<fhir4b.OperationOutcome>;
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
        let headers = {
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
          const serverError = err as AxiosError<fhir4b.OperationOutcome>;
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

    GetAISettings(): IOpenAISettings {
      return {
        openAIKey: settings.getOpenAIKey() ?? "",
        openAIBasePath: settings.getOpenAIBasePath(),
        openAIApiVersion: settings.getOpenAIApiVersion(),
        openAIModel: settings.getOpenAIModel(),
      };
    },

    checkFocus(event: any) {
      if (event.relatedTarget) {
        this.prevFocus = event.relatedTarget;
      }
    },

    refreshEditorSizes() {
      this.$nextTick(() => {
        this.expressionEditor?.resize();
        // this.resourceJsonEditor?.resize();
      });
    },

    // https://www.sitepoint.com/fetching-data-third-party-api-vue-axios/
    async evaluateFhirPathExpression() {

      // reset the processing engine
      this.processedByEngine = undefined;
      this.saveOutcome = undefined;

      // reset the debugger position info
      let inputResourceEditor = this.$refs.inputResourceEditor as ResourceEditor;
      let outputResourceEditor = this.$refs.outputResourceEditor as ResourceEditor;
      this.removeMarkers(this.expressionEditor!, this.debugMapSelectionMarker ?? []);
      inputResourceEditor.removeMarkers(this.debugInputResourceSelectionMarker ?? []);
      outputResourceEditor.removeMarkers(this.debugOutputResourceSelectionMarker ?? []);
      this.debugMapSelectionMarker = [];
      this.debugInputResourceSelectionMarker = [];
      this.debugOutputResourceSelectionMarker = [];
      this.debugTracePosition = 0;
      this.trace = [];
      this.variables = [];

      // Always parse and store the FML map
      const fmlText = this.getFhirpathExpression();
      if (fmlText) {
        const result = parseFML(fmlText);
        if ('resourceType' in result && result.resourceType === 'OperationOutcome') {
          // Store the error but continue execution
          console.log('FML parsing failed:', result);
          this.parsedFmlMap = undefined;
        } else {
          // Store the successfully parsed map
          const fmlMap = result as FmlStructureMap;
          console.log('FML map parsed successfully:', JSON.parse(JSON.stringify(fmlMap)));
          this.parsedFmlMap = fmlMap;
        }
      }

      let resourceJson = this.getResourceJson();
      let model = this.getModel();

      // brianpos hosted service
      // default the firely SDK/brianpos service
      // Source code for this is at https://github.com/brianpos/fhirpath-lab-dotnet
      let url = (await settings.getServerEngineUrl("mapper_server"));

      let p: fhir4b.Parameters = {
        resourceType: "Parameters",
        parameter: [{ name: "map", valueString: this.getFhirpathExpression() ?? 'today()' }]
      };

      if (model != undefined) {
        p.parameter?.push({ name: "model", valueString: model });
      }

      // for initial testing with .net
      if (!this.getResourceJson() && this.resourceId) {
        let editorResourceJsonLeftDiv: any = this.$refs.inputResourceEditor as ResourceEditor;
        if (editorResourceJsonLeftDiv) {
          await editorResourceJsonLeftDiv.DownloadResource();
        }

        resourceJson = this.getResourceJson();
      }

      if (this.selectedEngine == "java (HAPI)") {
        url = (await settings.getServerEngineUrl("mapper_server_java"));
        (this as any).$appInsights?.trackEvent({ name: 'evaluate HAPI (map)' });
      }
      else if (this.selectedEngine == "matchbox") {
        url = (await settings.getServerEngineUrl("mapper_server_matchbox"));
        (this as any).$appInsights?.trackEvent({ name: 'evaluate matchbox (map)' });
      }
      else {
        (this as any).$appInsights?.trackEvent({ name: 'evaluate .NET (map)' });
      }

      if (resourceJson) {
        try {
          // force the use of the valueString for all
          // This is so that the parameters object doesn't matter if it is R4 or R5
          // and we can use the same code for both 
          p.parameter?.push({ name: "resource", valueString: resourceJson });
        }
        catch (err) {
          p.parameter?.push({ name: "resource", valueString: resourceJson });
        }
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

      // Show the output tab if it wasn't already visible
      let tabControl: TwinPaneTab = this.$refs.twinTabControl as TwinPaneTab;
      if (tabControl) {
        if (!tabControl.tabIsVisible(4))
          tabControl.selectTab(4);
      }

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
      defaultProviderField: undefined,
      structureMapId: undefined,
      resourceId: undefined, //'Patient/example',
      resourceText: sampleXmlResource, // undefined,
      resourceJsonChanged: false,
      modelsSearch: '',
      modelsText: '',
      debugText: '',
      loadingData: true,
      saveOutcome: undefined,
      showOutcome: false,
      helpWithError: undefined,
      showMapSelector: false,
      showResourceSelector: false,
      showAdvancedSettings: false,
      results: undefined,
      chatEnabled: false,
      openAILastContext: "",
      openAIexpressionExplanationLoading: false,
      trace: [],
      variables: [],
      selectedEngine: ".NET (brianpos)",
      processedByEngine: undefined,
      expressionEditor: undefined,
      testResourceFormat: "json",
      parsedFmlMap: undefined,

      debugTracePosition: 0,
      debugMapSelectionMarker: [],
      debugInputResourceSelectionMarker: [],
      debugOutputResourceSelectionMarker: [],
    };
  },
});
</script>
