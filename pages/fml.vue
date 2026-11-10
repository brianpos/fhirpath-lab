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
          <v-btn x-small dark icon @click="selectTrace(0)" title="Reset to first trace">
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
              @update:resourceText="resourceText = $event" >
              <template v-slot:append>
                <v-btn icon small tile @click="generateLogicalModelFromInputResource" title="generate a logical model from this input resource">
                  <v-icon> mdi-tree-outline </v-icon>
                </v-btn>
              </template>
            </resource-editor>
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
              @update:resourceText="modelsText = $event">
              <template v-slot:append>
                <v-btn icon small tile @click="generateLogicalModelFromInputResource" title="generate a logical model from the input resource">
                  <!-- <v-icon> mdi-tree-outline </v-icon> -->
                  <template>
                    <div style="position: relative" class="d-inline-block">
                      <!-- Base icon -->
                      <v-icon>mdi-tree-outline</v-icon>

                      <!-- Overlay icon -->
                      <v-icon
                        x-small dense
                        style="position: absolute !important; right: 0; bottom: 0; height: 12px; width: 12px;"
                        class="bg-white rounded-circle"
                      >
                        mdi-refresh
                      </v-icon>
                    </div>
                  </template>

                </v-btn>
              </template>
            </resource-editor>
          </template>

          <template v-slot:Trace>
            <div class="ct-header">
              <v-icon left dark> mdi-format-list-bulleted </v-icon>
              Trace / Debug
              <span v-if="traceStatus !== 'complete'" class="ml-2">{{ traceStatus }}</span>
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
                    <div v-if="v1.phase" class="text-caption">
                      {{ v1.phase }} / depth {{ v1.depth }}
                      <span v-if="v1.mapFileName"> / {{ v1.mapFileName }}</span>
                      <span v-if="v1.traceLocation"> / {{ v1.traceLocation }}</span>
                    </div>
                    <div :class="v1.exception ? 'error--text' : traceTypeClass(v1.category)" style="white-space: pre-wrap;">{{ v1.message }}</div>
                    <div v-if="v1.exception && v1.exception !== v1.message" class="error--text">{{ v1.exception }}</div>
                  </td>
                </tr>
              </template>
            </v-simple-table>
            <div v-if="variables.length > 0" class="ct-header">
              <v-icon left dark> mdi-application-variable-outline </v-icon>
              Variables
            </div>
            <v-simple-table v-if="variables.length > 0" >
              <th></th><th>context</th><th>name</th><th>path</th><th>value / error</th>
              <template v-for="(v1, index) in variables">
                <tr :key="index">
                  <td>
                    <v-btn x-small icon  @click="navigateToVariable(v1)">
                      <v-icon>
                        mdi-target
                      </v-icon>
                    </v-btn>
                  </td>
                  <td>{{ v1.mode }}</td>
                  <td>{{ v1.name }}</td>
                  <td width="70%">{{ v1.path }}</td>
                  <td><small>{{ v1.datatype }}</small><pre>{{ formatTraceVariable(v1) }}</pre></td>
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
              <th></th><th>context</th><th>name</th><th>path</th><th>value / error</th>
              <template v-if="variables.length > 0" v-for="(v1, index) in variables">
                <tr :key="index">
                  <td>
                    <v-btn x-small icon  @click="navigateToVariable(v1)">
                      <v-icon>
                        mdi-target
                      </v-icon>
                    </v-btn>
                  </td>
                  <td>{{ v1.mode }}</td>
                  <td>{{ v1.name }}</td>
                  <td width="70%">{{ v1.path }}</td>
                  <td><small>{{ v1.datatype }}</small><pre>{{ formatTraceVariable(v1) }}</pre></td>
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

          <template v-slot:Diagram>
            <div class="diagram-preview" :class="{ 'diagram-preview--stale': diagramIsStale }">
              <div v-if="diagramIsStale && diagramSvg" class="diagram-preview-status" role="status">
                <div class="diagram-preview-status-message"><strong>Preview paused</strong> Fix the FML errors to refresh.</div>
              </div>
              <div v-if="diagramSvg" ref="diagramPreview" class="diagram-preview-content" v-html="diagramSvg"
                @click="handleDiagramClick" @keydown="handleDiagramKeydown"></div>
              <div v-else class="diagram-preview-empty">{{ diagramError ?? 'No diagram available' }}</div>
            </div>
          </template>

          <template v-slot:Instance>
            <div class="diagram-preview" :class="{ 'diagram-preview--stale': diagramIsStale }">
              <div v-if="diagramIsStale && instanceSvg" class="diagram-preview-status" role="status">
                <div class="diagram-preview-status-message"><strong>Preview paused</strong> Fix the FML errors to refresh.</div>
              </div>
              <div v-if="instanceSvg" ref="instancePreview" class="diagram-preview-content" v-html="instanceSvg"
                @click="handleDiagramClick" @keydown="handleDiagramKeydown"></div>
              <div v-else class="diagram-preview-empty">{{ diagramError ?? 'No instance diagram available' }}</div>
            </div>
          </template>

          <template v-slot:Complete>
            <div class="diagram-preview" :class="{ 'diagram-preview--stale': diagramIsStale }">
              <div class="diagram-preview-options">
                <v-switch v-model="completeShowAllProperties" label="Show all properties" dense hide-details
                  @change="regenerateDiagrams" />
              </div>
              <div v-if="diagramIsStale && completeSvg" class="diagram-preview-status" role="status">
                <div class="diagram-preview-status-message"><strong>Preview paused</strong> Fix the FML errors to refresh.</div>
              </div>
              <div v-if="completeSvg" ref="completePreview" class="diagram-preview-content" v-html="completeSvg"
                @click="handleDiagramClick" @keydown="handleDiagramKeydown"></div>
              <div v-else class="diagram-preview-empty">{{ diagramError ?? 'No complete diagram available' }}</div>
            </div>
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

.diagram-preview {
  position: relative;
  overflow: auto;
}

.diagram-preview-options {
  display: flex;
  min-height: 48px;
  align-items: center;
  padding: 4px 12px;
  border-bottom: 1px solid #e0e0e0;
}

.diagram-preview--stale .diagram-preview-content {
  opacity: 0.28;
  filter: grayscale(0.35);
  pointer-events: none;
  user-select: none;
}

.diagram-preview-status {
  position: sticky;
  top: 12px;
  z-index: 1;
  display: flex;
  height: 0;
  justify-content: center;
  pointer-events: none;
}

.diagram-preview-status-message {
  height: fit-content;
  padding: 10px 14px;
  border: 1px solid #edb95e;
  border-radius: 4px;
  color: #302b22;
  background: #fff8e8;
  box-shadow: 0 3px 12px rgb(0 0 0 / 18%);
}

.diagram-preview-status-message strong {
  display: block;
}

.diagram-preview-empty {
  padding: 16px;
  color: #777;
  font-style: italic;
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
import axios, { AxiosRequestHeaders } from "axios";
import { AxiosError } from "axios";
import { CancelTokenSource } from "axios";
import {
  createFmlContent,
  parseDebugTrace,
  parseFmlInput,
} from "../fml-vscode-extension/fml-debug-service/src/FmlDebugService";
import { FmlTraceLocationIndex } from "../fml-vscode-extension/fml-debug-service/src/FmlTraceLocationIndex";
import type { FmlDebugTrace, FmlTraceEvent, FmlTraceVariable } from "../fml-vscode-extension/fml-debug-service/src/contracts";
import { FmlLocalDebugService } from "../fml-vscode-extension/fml-debug-service/src/FmlLocalDebugService";
import { parseFmlJson, stringifyFmlJson } from "../fml-vscode-extension/fml-executor/src";
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

import { isFmlParseError, parseFML } from "~/helpers/fml_parser";
import type { FmlStructureMap, FhirVersion } from "~/helpers/fml_models";
import { validateFmlModel } from "~/helpers/fml_validation";
import { generateFmlInstanceDiagramSvg } from "~/helpers/structuremap_diagram_instance";
import { generateFmlInstanceDiagramSvg as generateFmlCompleteDiagramSvg } from "~/helpers/structuremap_diagram_complete";
import { highlightDiagramConnection, findConnectionIdsForClick } from "~/helpers/diagram_interaction";
import { generateFmlStructureMapDiagramSvg } from "~/helpers/structuremap_diagram";
import { lookupByTypeName as lookupByTypeNameSTU3 } from "~/helpers/models/generated/stu3";
import { lookupByTypeName as lookupByTypeNameR4B } from "~/helpers/models/generated/r4b";
import { lookupByTypeName as lookupByTypeNameR4 } from "~/helpers/models/generated/r4";
import { lookupByTypeName as lookupByTypeNameR5 } from "~/helpers/models/generated/r5";
import { lookupByTypeName as lookupByTypeNameR6 } from "~/helpers/models/generated/r6";
import { buildUserModelLookup, composeLookups, type TypeLookup, type UserModelLookup } from "~/helpers/user_models";
import xmlFormat from 'xml-formatter';
import { createFhirLogicalModel, CreateLogicalModelOptions } from '~/helpers/logical_model_generator';

import "ace-builds";
import ace from "ace-builds";
import "ace-builds/src-noconflict/mode-text";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-chrome";

import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from "lz-string";
import { TestFhirMapData } from "~/models/testenginemodel";
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
const debugMapFileName = 'map.fml';

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
  raw?: fhir4b.Parameters | fhir4b.OperationOutcome;
  defaultProviderField?: string;
  structureMapId?: string;
  resourceId?: string;
  resourceText?: string;
  resourceJsonChanged: boolean;
  modelsSearch: string;
  modelsText?: string;
  debugText: string;
  loadingData: boolean;
  initializing: boolean;
  saveOutcome?: fhir4b.OperationOutcome;
  showOutcome?: boolean;
  helpWithError?: string;
  showMapSelector?: boolean;
  showResourceSelector?: boolean;
  showAdvancedSettings: boolean;
  cancelSource?: CancelTokenSource;
  localExecutionAbort?: AbortController;
  tab: any;
  results?: ResultData;
  trace: FmlTraceEvent[];
  traceStatus: FmlDebugTrace['traceStatus'];
  variables: FmlTraceVariable[];
  selectedEngine: string;
  expressionEditor?: ace.Ace.Editor;
  testResourceFormat: string;
  processedByEngine?: string;
  chatEnabled: boolean;
  openAILastContext: string;
  openAIexpressionExplanationLoading: boolean;
  parsedFmlMap?: FmlStructureMap;
  instanceSvg?: string;
  completeSvg?: string;
  completeShowAllProperties: boolean;
  diagramSvg?: string;
  diagramIsStale: boolean;
  diagramError?: string;
  diagramDebounceTimer?: ReturnType<typeof setTimeout>;
  /** Lookup built from the Models tab JSON (Bundle of SDs or a single SD).
   *  Kept separate from the built-in r4b dictionary — composed at call time
   *  so the static dictionary is never mutated. Undefined when the Models
   *  tab is empty or doesn't contain valid SD JSON. */
  userModelLookup?: UserModelLookup;

  // debugger state information
  debugTracePosition: number;
  debugMapSelectionMarker?: number[];
  debugInputResourceSelectionMarker?: number[];
  debugOutputResourceSelectionMarker?: number[];
}

interface ResultData {
  type: string;
  value: string;
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
    this.localExecutionAbort?.abort();
    document.removeEventListener('keydown', this.DebugFunctionKeyHandler);
    if (this.diagramDebounceTimer) clearTimeout(this.diagramDebounceTimer);
  },

  computed: {
    executionEngines(): string[] { 
      if (this.showAdvancedSettings){
        return [
          "JavaScript (local)",
          ".NET (brianpos)",
          "java (HAPI)",
          "java (Validator)",
          "matchbox",
          "Python (MaLaC-HD)"
        ];
      }
      return [
        "JavaScript (local)",
        ".NET (brianpos)",
        "java (HAPI)",
        "java (Validator)",
        "matchbox", // matchbox now released! Thanks Oliver
        "Python (MaLaC-HD)"
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
          iconName: "mdi-vector-polygon",
          tabName: "Diagram",
          title: "Rule-level view showing source/target type boxes with property mappings",
          show: true,
          enabled: true,
        },
        {
          iconName: "mdi-file-document-outline",
          tabName: "Instance",
          title: "Instance-level view showing source/target objects with mapped and unmapped properties",
          show: true,
          enabled: true,
        },
        {
          iconName: "mdi-table-eye",
          tabName: "Complete",
          title: "Property-focused view with optional unmapped properties",
          show: true,
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
  watch: {
    modelsText() {
      // Re-parse the Models tab content into an isolated TypeLookup. We rebuild
      // the user dictionary lazily here (rather than on every diagram regen) so
      // the parse cost is paid once per edit instead of once per FML keystroke.
      this.userModelLookup = buildUserModelLookup(this.modelsText);
      // Diagrams resolve types through this lookup, so refresh them.
      this.scheduleDiagramRegen();
    },
  },
  methods: {
    /** Compose the user-supplied model lookup (from the Models tab) with the
     *  built-in r4b dictionary. User models take precedence. The static
     *  dictionary is never mutated — composition is by function wrapping. */
    composedTypeLookup(): TypeLookup {
      return composeLookups(this.userModelLookup?.lookup, lookupByTypeNameR4B);
    },

    /** Resolve the type-model lookup for a specific FHIR version, used by the
     *  diagrams for cross-version maps (e.g. an R4B → R5 transform). The
     *  per-version dictionary is composed with any user-supplied models so
     *  user overrides still win. DSTU2 and the `undefined` case fall back to
     *  the default. */
    lookupForVersion(version?: FhirVersion): TypeLookup | undefined {
      const base =
        version === "STU3" ? lookupByTypeNameSTU3
        : version === "R4" ? lookupByTypeNameR4
        : version === "R4B" ? lookupByTypeNameR4B
        : version === "R5" ? lookupByTypeNameR5
        : version === "R6" ? lookupByTypeNameR6
        : undefined;
      if (!base) return undefined;
      return composeLookups(this.userModelLookup?.lookup, base);
    },

    /** Debounced trigger for instance/structure-map diagram regeneration.
     *  Mirrors the keystroke-debounce used elsewhere on the page. */
    scheduleDiagramRegen() {
      if (this.diagramDebounceTimer) clearTimeout(this.diagramDebounceTimer);
      this.diagramDebounceTimer = setTimeout(() => {
        this.regenerateDiagrams();
      }, 500);
    },
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

      this.selectTab(1); // the second tab should be the input resource (tab parameter processing will overload this if a ?tab= query parameter is present)
      let tabControl: TwinPaneTab = this.$refs.twinTabControl as TwinPaneTab;
      if (tabControl) {
        if (this.$route.query.tab) {
          this.$nextTick(() => {
            const tabString = this.$route.query.tab as string;
            // String tab mode
            if (tabString.includes(",")) {
              const tabParts = tabString.split(",");
              if (tabParts.length == 2) {
                if (tabControl) {
                  tabControl.selectTabs(
                    tabControl.getTabIndex(tabParts[0]),
                    tabControl.getTabIndex(tabParts[1]),
                    "left"
                  );
                }
              }
            } else {
              tabControl.setSinglePanelMode(true);
              tabControl.selectTab(tabControl.getTabIndex(tabString));
            }
          });
        }
      }

      // Check for the encoded parameters first
      const parameters = this.$route.query.parameters as string;
      let data: TestFhirMapData;
      // Read in any parameters from the URL
      data = this.readParametersFromQuery();

      await this.applyParameters(data);
      await this.evaluateFhirPathExpression();
      this.loadingData = false;
      this.initializing = false;
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

    generateLogicalModelFromInputResource() {
      // read the resource, then call the logical model generator for XML or JSON
      let inputResource = this.resourceText?.trim() ?? '';
      if (inputResource.startsWith('<') || inputResource.startsWith('{') || inputResource.startsWith('[')) {
        // this is XML or JSON, so call the logical model generator
        try {
          // Try to extract options from the existing model if it exists and is valid
          let options: CreateLogicalModelOptions = { 
            publisher: settings.getDefaultProviderField()
          };
          let rootTypeName: string | undefined;
          if (this.modelsText) {
            try {
              const existingModel = JSON.parse(this.modelsText);
              if (existingModel?.resourceType === 'StructureDefinition' && existingModel?.kind === 'logical') {
                options = {
                  name: existingModel.name,
                  title: existingModel.title,
                  url: existingModel.url,
                  description: existingModel.description,
                  publisher: existingModel.publisher ?? settings.getDefaultProviderField(),
                  version: existingModel.version,
                  status: existingModel.status
                };
                // Use existing name as the rootTypeName for JSON inputs
                rootTypeName = existingModel.name;
              }
            } catch {
              // Ignore parse errors - will regenerate with defaults
            }
          }
          const sd = createFhirLogicalModel(inputResource, rootTypeName, options);
          this.modelsText = JSON.stringify(sd, null, 4);
          this.selectTab(2);
        } catch (e) {
          console.error('Failed to generate logical model:', e);
        }
      }
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
        if ((variable.retrievalFromInput || variable.mode?.toUpperCase() === 'INPUT') && variable.path) {
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
        } else if (variable.mode?.toUpperCase() === 'OUTPUT' && variable.path) {
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
      this.selectTrace(Math.max(0, this.debugTracePosition - 1));
    },

    debuggerStepForward() {
      this.selectTrace(Math.min(this.trace.length - 1, this.debugTracePosition + 1));
    },

    selectTrace(position: number, debugMode = true) {
      const trace = this.trace[position];
      if (!trace) return;
      this.clearDebuggerSelectionMarkers();
      this.debugTracePosition = position;
      this.variables = trace.variables;
      // Coordinates belong to the submitted map, not to subsequent editor changes.
      if (trace.source?.text === this.getFhirpathExpression() && trace.range) {
        this.highlightText(this.expressionEditor, trace.range.startOffset, trace.range.length, debugMode);
      }
      this.scrollIntoView(position);
      this.highlightDebuggerVariables();
    },

    formatTraceVariable(variable: FmlTraceVariable): string | undefined {
      return variable.errorMessage ?? JSON.stringify(variable.data?.value, null, settings.getTabSpaces());
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

    populateTracePositions(mapText: string) {
      if (!this.trace.some(event => event.source && event.traceLocation && !event.range)) return;
      const model = parseFML(mapText);
      if (isFmlParseError(model)) return;
      const locationIndex = new FmlTraceLocationIndex(model);
      this.trace = this.trace.map(event => event.source && event.traceLocation && !event.range
        ? {...event, range: locationIndex.rangeFor(event.traceLocation)}
        : event);
    },

    navigateToVariable(variable: FmlTraceVariable) {
      console.log('variable:', variable);
      let inputResourceEditor = this.$refs.inputResourceEditor as ResourceEditor;
      let outputResourceEditor = this.$refs.outputResourceEditor as ResourceEditor;
      let tabControl: TwinPaneTab = this.$refs.twinTabControl as TwinPaneTab;

      if ((variable.retrievalFromInput || variable.mode?.toUpperCase() === 'INPUT') && variable.path) {
        const marker = inputResourceEditor.navigateToContext(fhirpath_r4_model, variable.path);
        tabControl?.selectTab(1);
      } else if (variable.mode?.toUpperCase() === 'OUTPUT' && variable.path) {
        const marker = outputResourceEditor.navigateToContext(fhirpath_r4_model, variable.path);
        tabControl?.selectTab(4);
      }
    },
    navigateToTrace(trace: FmlTraceEvent) {
      this.selectTrace(this.trace.indexOf(trace), false);
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

        if (this.$route.query.structureMap) {
          data.structureMap = this.$route.query.structureMap as string;
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

      if (p.structureMap) {
        this.structureMapId = p.structureMap;
        await this.downloadStructureMapResource();
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
      this.scheduleDiagramRegen();
    },

    regenerateDiagrams() {
      const fmlText = this.getFhirpathExpression();
      if (!fmlText) {
        this.parsedFmlMap = undefined;
        this.instanceSvg = undefined;
        this.completeSvg = undefined;
        this.diagramSvg = undefined;
        this.diagramIsStale = false;
        this.diagramError = undefined;
        return;
      }
      const result = parseFML(fmlText);
      if (isFmlParseError(result)) {
        this.parsedFmlMap = undefined;
        this.pauseDiagramPreview();
        return;
      }
      this.parsedFmlMap = result;
      if (validateFmlModel(result).some(diagnostic => diagnostic.severity === 'error')) {
        this.pauseDiagramPreview();
        return;
      }
      try {
        for (const structure of result.structures) {
          const canonical = (structure.canonical ?? structure.url).split("|")[0];
          structure.resolvedTypeName = this.userModelLookup?.resolveCanonical(canonical)
            ?? this.userModelLookup?.resolveCanonical(structure.url);
        }
        const lookup = this.composedTypeLookup();
        const lookupForVersion = (v?: FhirVersion) => this.lookupForVersion(v);
        const instanceSvg = generateFmlInstanceDiagramSvg(result, lookup, true, lookupForVersion);
        const completeSvg = generateFmlCompleteDiagramSvg(
          result, lookup, this.completeShowAllProperties, lookupForVersion,
        );
        const diagramSvg = generateFmlStructureMapDiagramSvg(result, lookup, lookupForVersion);
        this.instanceSvg = instanceSvg;
        this.completeSvg = completeSvg;
        this.diagramSvg = diagramSvg;
        this.diagramIsStale = false;
        this.diagramError = undefined;
        this.prepareDiagramNavigation();
      } catch (e) {
        console.error('Failed to generate FML diagrams:', e);
        this.pauseDiagramPreview();
      }
    },

    pauseDiagramPreview() {
      this.diagramError = 'FML is invalid. Fix the errors to render the diagram.';
      this.diagramIsStale = this.instanceSvg !== undefined
        || this.completeSvg !== undefined
        || this.diagramSvg !== undefined;
    },

    prepareDiagramNavigation() {
      this.$nextTick(() => {
        const previews = [
          this.$refs.diagramPreview,
          this.$refs.instancePreview,
          this.$refs.completePreview,
        ] as Array<Element | undefined>;
        for (const preview of previews) {
          if (!preview) continue;
          preview.querySelectorAll('[data-pos-start][data-pos-end]').forEach(element => {
            if (!element.hasAttribute('tabindex')) element.setAttribute('tabindex', '0');
            if (!element.hasAttribute('role')) element.setAttribute('role', 'button');
            if (!element.hasAttribute('aria-label')) element.setAttribute('aria-label', 'Go to FML source');
          });
        }
      });
    },

    handleDiagramKeydown(event: KeyboardEvent) {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      const target = event.target as Element | null;
      const element = target?.closest('[data-pos-start][data-pos-end]');
      if (!element) return;
      event.preventDefault();
      this.activateDiagramElement(element, event.currentTarget as Element);
    },

    handleDiagramClick(event: MouseEvent) {
      // Walk up to find a connection-id-tagged element first so a click
      // on a row/connector flashes its peers (rows + connectors with the
      // same connectionId). Then continue walking for the FML position
      // attribute, which jumps the editor to the corresponding source.
      this.activateDiagramElement(event.target, event.currentTarget as Element);
    },

    activateDiagramElement(target: EventTarget | null, container: Element) {
      const connIds = findConnectionIdsForClick(target);
      if (connIds.length > 0) {
        highlightDiagramConnection(container, connIds);
      }
      let el = target as Element | null;
      while (el && container.contains(el)) {
        const start = el.getAttribute?.('data-pos-start');
        const end = el.getAttribute?.('data-pos-end');
        if (start != null && end != null) {
          const startPos = parseInt(start, 10);
          const endPos = parseInt(end, 10);
          if (!isNaN(startPos) && !isNaN(endPos) && endPos > startPos) {
            this.highlightText(this.expressionEditor, startPos, endPos - startPos);
          }
          return;
        }
        el = el.parentElement;
      }
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
    async executeRequest(url: string, p: fhir4b.Parameters, inputText: string, mapText: string) {
      this.cancelSource?.cancel("new map test started");
      const source = axios.CancelToken.source();
      this.cancelSource = source;
      this.loadingData = true;
      try {
        const response = await axios.post<fhir4b.Parameters | fhir4b.OperationOutcome>(url, p,
          {
            cancelToken: source.token,
            validateStatus: () => true,
            headers: {
              "Accept": requestFhirAcceptHeaders,
              "Content-Type": requestFhirContentTypeHeaders
            }
          });
        if (source.token.reason) return;
        this.processTransformResponse(response.data, inputText, mapText, response.status);
      } catch (err) {
        if (source.token.reason || axios.isCancel(err)) return;
        this.saveOutcome = {
          resourceType: 'OperationOutcome',
          issue: [{severity: 'error', code: 'processing', diagnostics: String(err)}],
        };
        this.showOutcome = true;
      } finally {
        if (this.cancelSource === source) {
          this.cancelSource = undefined;
          this.loadingData = false;
        }
      }
    },

    processTransformResponse(results: fhir4b.Parameters | fhir4b.OperationOutcome, inputText: string, mapText: string, status = 200) {
      if (!results || (results.resourceType !== 'Parameters' && results.resourceType !== 'OperationOutcome')) {
        throw new Error(`Transform engine returned HTTP ${status} without FHIR Parameters or OperationOutcome.`);
      }
      this.raw = results;
      this.setResultJson(JSON.stringify(results, null, settings.getTabSpaces()));
      this.processedByEngine = undefined;
      this.traceStatus = 'complete';
      this.trace = [];
      this.variables = [];
      this.results = undefined;
      this.debugTracePosition = 0;
      this.saveOutcome = undefined;
      this.showOutcome = false;
      if (results.resourceType === 'Parameters') {
        const debug = parseDebugTrace(results, parseFmlInput(inputText), undefined, [
          {text: mapText, fileName: debugMapFileName},
        ]);
        this.processedByEngine = debug.evaluator;
        this.traceStatus = debug.traceStatus ?? 'complete';
        this.trace = debug.trace;
        this.populateTracePositions(mapText);
        this.variables = this.trace[0]?.variables ?? [];
        this.results = debug.result ? {
          type: debug.result.types['$']?.name ?? 'string',
          value: debug.rawResult !== undefined
            ? typeof debug.result.value === 'string'
              ? debug.rawResult
              : stringifyFmlJson(parseFmlJson(debug.rawResult), settings.getTabSpaces())
            : JSON.stringify(debug.result.value, null, settings.getTabSpaces()),
        } : undefined;
      }
      const outcome = results.resourceType === 'OperationOutcome'
        ? results : results.parameter?.find(parameter => parameter.name === 'outcome')?.resource;
      if (outcome?.resourceType === 'OperationOutcome') {
        this.saveOutcome = outcome;
        this.showOutcome = true;
      }
      if (status >= 400) {
        const message = `Transform engine returned HTTP ${status}.`;
        if (!this.saveOutcome?.issue.some(issue => issue.severity === 'error' || issue.severity === 'fatal')) {
          this.saveOutcome = {
            resourceType: 'OperationOutcome',
            issue: [
              ...(this.saveOutcome?.issue ?? []),
              {severity: 'error', code: 'processing', diagnostics: message},
            ],
          };
          this.showOutcome = true;
        }
        const last = this.trace[this.trace.length - 1];
        if (last && !last.exception) last.exception = message;
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
      this.localExecutionAbort?.abort();
      this.localExecutionAbort = undefined;
      this.cancelSource?.cancel("new map test started");
      this.cancelSource = undefined;
      this.loadingData = false;
      this.saveOutcome = undefined;
      this.showOutcome = false;
      this.raw = undefined;
      this.debugText = '';

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
      this.traceStatus = 'complete';
      this.variables = [];
      this.results = undefined;

      this.regenerateDiagrams();

      let resourceJson = this.getResourceJson();
      let model = this.getModel();

      // brianpos hosted service
      // default the firely SDK/brianpos service
      // Source code for this is at https://github.com/brianpos/fhirpath-lab-dotnet
      let url = this.selectedEngine === "JavaScript (local)" ? "" : (await settings.getServerEngineUrl("mapper_server"));

      // for initial testing with .net
      if (!this.getResourceJson() && this.resourceId) {
        let editorResourceJsonLeftDiv: any = this.$refs.inputResourceEditor as ResourceEditor;
        if (editorResourceJsonLeftDiv) {
          await editorResourceJsonLeftDiv.DownloadResource();
        }

        resourceJson = this.getResourceJson();
      }

      const mapText = this.getFhirpathExpression() ?? '';
      const mapParameter: fhir4b.ParametersParameter = {
        name: "srcMap",
        valueString: mapText,
        extension: [{
          url: "http://hl7.org/fhir/StructureDefinition/operationoutcome-file",
          valueString: debugMapFileName,
        }],
      };
      const p: fhir4b.Parameters = {resourceType: "Parameters", parameter: [mapParameter]};
      if (model !== undefined) p.parameter?.push({name: "model", valueString: model});

      let legacyPost = false;

      if (this.selectedEngine == "java (HAPI)") {
        url = (await settings.getServerEngineUrl("mapper_server_java"));
        (this as any).$appInsights?.trackEvent({ name: 'evaluate HAPI (map)' });
      }
      else if (this.selectedEngine == "java (Validator)") {
        url = (await settings.getServerEngineUrl("mapper_server_java_validator"));
        (this as any).$appInsights?.trackEvent({ name: 'evaluate HAPI Validator (map)' });
      }
      else if (this.selectedEngine == "matchbox") {
        url = (await settings.getServerEngineUrl("mapper_server_matchbox"));
        (this as any).$appInsights?.trackEvent({ name: 'evaluate matchbox (map)' });
        legacyPost = true;
      }
      else if (this.selectedEngine == "Python (MaLaC-HD)") {
        url = (await settings.getServerEngineUrl("mapper_server_malac_hd"));
        (this as any).$appInsights?.trackEvent({ name: 'evaluate malac-hd (map)' });
        legacyPost = true;
      }
      else if (this.selectedEngine !== "JavaScript (local)") {
        (this as any).$appInsights?.trackEvent({ name: 'evaluate .NET (map)' });
      }

      if (resourceJson) {
        if (legacyPost) {
          mapParameter.name = "map";
          p.parameter?.push({ name: "resource", valueString: resourceJson });
        } else {
          p.parameter?.push({ name: "content", resource: createFmlContent(resourceJson) });
        }
        p.parameter?.push({ name: "debug", valueBoolean: true });
      }
      else {
        this.saveOutcome = {
          resourceType: 'OperationOutcome',
          issue: [{severity: 'error', code: 'required', diagnostics: 'An input JSON or XML resource is required.'}],
        };
        this.showOutcome = true;
        return;
      }

      if (this.selectedEngine === "JavaScript (local)") {
        const controller = new AbortController();
        this.localExecutionAbort = controller;
        this.loadingData = true;
        try {
          const response = await new FmlLocalDebugService().executeParameters({
            mapText,
            maps: [{text: mapText, fileName: debugMapFileName}],
            inputText: resourceJson,
            modelText: model,
            signal: controller.signal,
          });
          if (controller.signal.aborted) return;
          this.processTransformResponse(response, resourceJson, mapText);
        } catch (error) {
          if (controller.signal.aborted) return;
          this.saveOutcome = {
            resourceType: "OperationOutcome",
            issue: [{severity: "error", code: "processing", diagnostics: String(error)}],
          };
          this.showOutcome = true;
        } finally {
          if (this.localExecutionAbort === controller) {
            this.localExecutionAbort = undefined;
            this.loadingData = false;
          }
        }
      } else {
        await this.executeRequest(url, p, resourceJson, mapText);
      }

      // Show the output tab if it wasn't already visible
      let tabControl: TwinPaneTab = this.$refs.twinTabControl as TwinPaneTab;
      if (tabControl && this.initializing == false) {
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
      initializing: true,
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
      traceStatus: 'complete',
      variables: [],
      selectedEngine: ".NET (brianpos)",
      processedByEngine: undefined,
      expressionEditor: undefined,
      testResourceFormat: "json",
      parsedFmlMap: undefined,
      instanceSvg: undefined,
      completeSvg: undefined,
      completeShowAllProperties: false,
      diagramSvg: undefined,
      diagramIsStale: false,
      diagramError: undefined,
      diagramDebounceTimer: undefined,
      userModelLookup: undefined,

      debugTracePosition: 0,
      debugMapSelectionMarker: [],
      debugInputResourceSelectionMarker: [],
      debugOutputResourceSelectionMarker: [],
    };
  },
});
</script>
