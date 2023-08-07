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
          <v-btn icon dark accesskey="g" title="press alt+g to go" @focus="checkFocus" @click="evaluateFhirPathExpression">
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
          <v-tooltip bottom color="primary">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon dark  @click="copyZulipShareLinkToClipboard" 
              :hidden="!showShareLink()"  v-bind="attrs" v-on="on" @mouseenter="updateZulipShareText">
                <svg class="brand-logo" role="img" aria-label="Zulip" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" height="25">
                    <path fill="hsl(0, 0%, 100%)" d="M 473.09 122.97 c 0 22.69 -10.19 42.85 -25.72 55.08 L 296.61 312.69 c -2.8 2.4 -6.44 -1.47 -4.42 -4.7 l 55.3 -110.72 c 1.55 -3.1 -0.46 -6.91 -3.64 -6.91 H 129.36 c -33.22 0 -60.4 -30.32 -60.4 -67.37 c 0 -37.06 27.18 -67.37 60.4 -67.37 h 283.33 c 33.22 -0.02 60.4 30.3 60.4 67.35 z M 129.36 506.05 h 283.33 c 33.22 0 60.4 -30.32 60.4 -67.37 c 0 -37.06 -27.18 -67.37 -60.4 -67.37 H 198.2 c -3.18 0 -5.19 -3.81 -3.64 -6.91 l 55.3 -110.72 c 2.02 -3.23 -1.62 -7.1 -4.42 -4.7 L 94.68 383.6 c -15.53 12.22 -25.72 32.39 -25.72 55.08 c 0 37.05 27.18 67.37 60.4 67.37 z"></path>
                </svg>
              </v-btn>
            </template>
            <span v-text="shareZulipToolTipMessage"></span>
          </v-tooltip>
        </v-toolbar>
        <v-row dense>
          <v-col>
            <v-tabs vertical v-model="tab" @change="changeTab">
              <v-tab :class="expressionActiveClass" v-on:click="tabClicked">
                <v-icon left> mdi-function-variant </v-icon>
                Expression
              </v-tab>
              <v-tab :class="resourceActiveClass" v-on:click="tabClicked">
                <v-icon left> mdi-clipboard-text-outline </v-icon>
                Resource
              </v-tab>
              <v-tab v-show="variables.size > 0" :class="variablesActiveClass" v-on:click="tabClicked">
                <v-icon left> mdi-application-variable-outline </v-icon>
                Variables
              </v-tab>
              <v-tab :disabled="!hasTraceData()" :class="traceActiveClass" v-on:click="tabClicked">
                <v-icon left> mdi-format-list-bulleted </v-icon>
                Trace
              </v-tab>
              <v-tab :class="astActiveClass" v-on:click="tabClicked">
                <v-icon left> mdi-file-tree </v-icon>
                AST
              </v-tab>
              <v-tab v-show="showAdvancedSettings && chatEnabled" :class="chatActiveClass" v-on:click="tabClicked">
                <v-icon left> mdi-brain </v-icon>
                AI Chat
              </v-tab>
              <v-tab v-show="showAdvancedSettings" :class="debugActiveClass" v-on:click="tabClicked">
                <v-icon left> mdi-bug-outline </v-icon>
                Debug
              </v-tab>

              <v-tabs-items class="custom-tab" style="height: calc(100vh - 168px)" touchless v-model="tab">

                <v-scroll-x-transition mode="out-in" :hide-on-leave="true">
                  <div v-show="expressionVisible" :eager="true" >
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
                        <!-- <parse-tree-tab v-show="false" ref="astTabComponent"></parse-tree-tab> -->

                        <div class="results">RESULTS <span class="processedBy">{{ processedByEngine }}</span></div>
                        <OperationOutcomePanel :outcome="expressionParseOutcome" @close="expressionParseOutcome = undefined" />
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
                  </div>
                </v-scroll-x-transition>

                <v-scroll-x-transition mode="out-in" :hide-on-leave="true">
                  <div v-show="resourceVisible" :eager="true" style="order:1;">
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
                            <v-btn small icon tile @click="reformatTestResource"><v-icon title="Format json" dark> mdi-format-indent-increase </v-icon></v-btn>
                          </template>
                        </v-text-field>
                        <label class="v-label theme--light bare-label">Test Resource JSON <i>{{ resourceJsonChangedMessage() }}</i></label>
                        <div class="resource" width="100%" ref="aceEditorResourceJsonTab"></div>
                        <!-- <div class="ace_editor_footer"></div> -->
                        <v-text-field label="Terminology Server" v-model="terminologyServer" hide-details="auto"
                          autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" />
                      </v-card-text>
                    </v-card>
                  </div>
                </v-scroll-x-transition>

                <v-scroll-x-transition mode="out-in" :hide-on-leave="true">
                  <div v-show="variablesVisible" >
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
                              <v-btn icon small tile @click="variables.set(v1[0], { name: v1[0], data: v1[1].resourceId }); $forceUpdate()">
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
                  </div>
                </v-scroll-x-transition>

                <v-scroll-x-transition mode="out-in" :hide-on-leave="true">
                  <div v-show="traceVisible" >
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
                                  <div class="code-json" v-if="v1.value != null">{{ v1.value }}</div>
                                  <div class="code-json" v-if="v1.value == null && v1.type == 'empty-string'"><i>""</i></div>
                                </td>
                                <td class="result-type"><i v-if="v1.type">({{ v1.type }})</i></td>
                              </tr>
                            </template>
                          </v-simple-table>
                        </template>
                      </v-card-text>
                    </v-card>
                  </div>
                </v-scroll-x-transition>

                <v-scroll-x-transition mode="out-in" :hide-on-leave="true">
                  <div v-show="astVisible" :eager="true">
                    <!-- AST abstract syntax tree -->
                    <v-card flat>
                      <v-card-text>
                        <p class="fl-tab-header">Abstract Syntax Tree</p>
                        <OperationOutcomePanel :outcome="expressionParseOutcome" @close="expressionParseOutcome = undefined" />
                        <parse-tree-tab ref="astTabComponent2"></parse-tree-tab>
                      </v-card-text>
                    </v-card>
                  </div>
                </v-scroll-x-transition>

                <v-scroll-x-transition mode="out-in" :hide-on-leave="true">
                  <div v-show="chatVisible" :eager="true">
                    <!-- Chat -->
                    <v-card flat>
                      <v-card-text>
                        <p class="fl-tab-header">FhirPath AI Chat</p>
                        <Chat class="chat" ref="chatComponent" 
                            @send-message="handleSendMessage" 
                            @reset-conversation="resetConversation"
                            @apply-suggested-context="applySuggestedContext"
                            @apply-suggested-expression="applySuggestedExpression"/>
                      </v-card-text>
                    </v-card>
                  </div>
                </v-scroll-x-transition>

                <v-scroll-x-transition mode="out-in" :hide-on-leave="true">
                  <div v-show="debugVisible" :eager="true">
                    <!-- Debug -->
                    <v-card flat>
                      <v-card-text>
                        <p class="fl-tab-header">Debug</p>
                        <div class="debug" ref="aceEditorDebug"></div>
                      </v-card-text>
                    </v-card>
                  </div>
                </v-scroll-x-transition>

              </v-tabs-items>
            </v-tabs>
          </v-col>
        </v-row>
      </v-card>

      <br />
      <OperationOutcomeOverlay style="z-index: 8" v-if="showOutcome" :saveOutcome="saveOutcome" :showOutcome="showOutcome" title="Error"
        @close="clearOutcome" />
    </div>
    <!-- <code class="code-json">{{ JSON.stringify(results, null, 4) }}</code> -->
  </div>
</template>

<style lang="scss">
.custom-tab > div {
  flex-direction: row;
  // height: calc(100vh - 168px);
  // overflow-y: auto;
}
.custom-tab > div > div {
  height: calc(100vh - 168px);
  overflow-y: auto;
}
.resource {
  height: calc(100vh - 320px);
}
.chat {
  height: calc(100vh - 200px);
}
.debug {
  height: calc(100vh - 196px);
}
@media (max-width: 596px) {
  .custom-tab > div > div {
    height: calc(100vh - 168px);
  }
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
.custom-tab > div > div{
  flex: 1;
}
</style>

<style>
.v-treeview--dense .v-treeview-node__root {
    min-height: 28px;
}

.v-treeview-node {
  border-top: thin solid silver;
}
</style>

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
  max-width: 18ch;
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
import "vue-router";
import { settings, ILastUsedParameters } from "~/helpers/user_settings";
import {
  requestFhirAcceptHeaders,
  requestFhirContentTypeHeaders,
  fhirResourceTypes,
} from "~/helpers/searchFhir";
import axios, { AxiosRequestHeaders, AxiosResponse } from "axios";
import { AxiosError } from "axios";
import { CancelTokenSource } from "axios";
import { getExtensionStringValue } from "fhir-extension-helpers";
import { InvertTree, JsonNode } from "~/components/ParseTreeTab.vue";
// import { getPreferredTerminologyServerFromSDC } from "fhir-sdc-helpers";
import fhirpath from "fhirpath";
import fhirpath_r4_model from "fhirpath/fhir-context/r4";
import fhirpath_r5_model from "fhirpath/fhir-context/r5";
import { Rules as FhirPathHightlighter_Rules, setCustomHighlightRules } from "~/helpers/fhirpath_highlighter"
import "~/assets/fhirpath_highlighter.scss"
import { IApplicationInsights } from '@microsoft/applicationinsights-web'

import "ace-builds";
import ace from "ace-builds";
import "ace-builds/src-noconflict/mode-text";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-chrome";
import Chat from "~/components/Chat.vue";
import { Message } from "~/types/chat-types";

// import { fhir } from '@fhir-typescript/r4b-core';
import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from "lz-string";
import { VariableData, EncodeTestFhirpathData, DecodeTestFhirpathData, TestFhirpathData } from "~/models/testenginemodel";

import { EvaluateChatPrompt, GetSystemPrompt, IOpenAISettings } from "~/helpers/openai_utils";
import { ChatMessage } from "@azure/openai";
import ParseTreeTab from "~/components/ParseTreeTab.vue";

const shareTooltipText = 'Copy a sharable link to this test expression';
const shareZulipTooltipText = 'Copy a sharable link for Zulip to this test expression';

const examplePatient = `
{
  "resourceType": "Patient",
  "id": "example",
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
      "system": "urn:oid:1.2.36.146.595.217.0.1",
      "value": "12345",
      "period": {
        "start": "2001-05-06"
      },
      "assigner": {
        "display": "Acme Healthcare"
      }
    }
  ],
  "active": true,
  "name": [
  {
  "use": "official",
  "family": "Chalmers",
  "given": [
  "Peter",
  "James"
  ]
  },
  {
  "use": "usual",
  "given": [
  "Jim"
  ]
  },
  {
  "use": "maiden",
  "family": "Windsor",
  "given": [
  "Peter",
  "James"
  ],
  "period": {
  "end": "2002"
  }
  }
  ],
  "telecom": [
  {
  "use": "home"
  },
  {
  "system": "phone",
  "value": "(03) 5555 6473",
  "use": "work",
  "rank": 1
  },
  {
  "system": "phone",
  "value": "(03) 3410 5613",
  "use": "mobile",
  "rank": 2
  },
  {
  "system": "phone",
  "value": "(03) 5555 8834",
  "use": "old",
  "period": {
  "end": "2014"
  }
  }
  ],
  "gender": "male",
  "birthDate": "1974-12-25",
  "_birthDate": {
  "extension": [
  {
  "url": "http://hl7.org/fhir/StructureDefinition/patient-birthTime",
  "valueDateTime": "1974-12-25T14:35:45-05:00"
  }
  ]
  },
  "deceasedBoolean": false,
  "address": [
  {
  "use": "home",
  "type": "both",
  "text": "534 Erewhon St PeasantVille, Rainbow, Vic  3999",
  "line": [
  "534 Erewhon St"
  ],
  "city": "PleasantVille",
  "district": "Rainbow",
  "state": "Vic",
  "postalCode": "3999",
  "period": {
  "start": "1974-12-25"
  }
  }
  ],
  "contact": [
  {
  "relationship": [
  {
  "coding": [
  {
  "system": "http://terminology.hl7.org/CodeSystem/v2-0131",
  "code": "N"
  }
  ]
  }
  ],
  "name": {
  "family": "du Marché",
  "_family": {
  "extension": [
  {
  "url": "http://hl7.org/fhir/StructureDefinition/humanname-own-prefix",
  "valueString": "VV"
  }
  ]
  },
  "given": [
  "Bénédicte"
  ]
  },
  "telecom": [
  {
  "system": "phone",
  "value": "+33 (237) 998327"
  }
  ],
  "address": {
  "use": "home",
  "type": "both",
  "line": [
  "534 Erewhon St"
  ],
  "city": "PleasantVille",
  "district": "Rainbow",
  "state": "Vic",
  "postalCode": "3999",
  "period": {
  "start": "1974-12-25"
  }
  },
  "gender": "female",
  "period": {
  "start": "2012"
  }
  }
  ],
  "managingOrganization": {
  "reference": "Organization/1"
  }
}`;

interface FhirPathData {
  prevFocus?: any;
  raw?: fhir4b.Parameters;
  library?: fhir4b.Library;
  resourceId?: string;
  resourceType?: string;
  resourceJsonChanged: boolean;
  loadingData: boolean;
  saveOutcome?: fhir4b.OperationOutcome;
  showOutcome?: boolean;
  showAdvancedSettings: boolean;
  terminologyServer: string;
  cancelSource?: CancelTokenSource;
  tab: any;
  lastTabClicked: KeyboardEvent | MouseEvent | undefined;
  primaryTab: number;
  secondaryTab: number;
  windowWidth: number;
  results: ResultData[];
  selectedEngine: string;
  executionEngines: string[];
  shareToolTipMessage: string;
  shareZulipToolTipMessage: string;
  expressionEditor?: ace.Ace.Editor;
  expressionContextEditor?: ace.Ace.Editor;
  debugEditor?: ace.Ace.Editor;
  resourceJsonEditor?: ace.Ace.Editor;
  variables: Map<string, VariableData>;
  processedByEngine?: string;
  openAIexpressionExplanationLoading: boolean;
  openAIexpressionExplanationMessage?: string;
  chatEnabled: boolean;
  showChat: boolean;
  openAILastContext: string;
  expressionParseOutcome?: fhir4b.OperationOutcome;
  astInverted: boolean;
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
  value?: string;
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

function getValue(entry: fhir4b.ParametersParameter): ResultItem[] {
  let result: ResultItem[] = [];
  var myMap = new Map(Object.entries(entry));
  for (let [k, v] of myMap.entries()) {
    if (k.startsWith('value'))
      result.push({ type: k.replace('value', ''), value: v });
    else if (k == 'resource')
      result.push({ type: (v as fhir4b.Resource).resourceType, value: v });
  }
  const extVal = getExtensionStringValue(entry, "http://fhir.forms-lab.com/StructureDefinition/json-value");
  if (extVal)
    result.push({ type: entry.name, value: JSON.parse(extVal) });
  if (entry.name == "empty-string")
    result.push({ type: "empty-string", value: "" });
  
  return result;
}
function getTraceValue(entry: fhir4b.ParametersParameter): TraceData[] {
  let result: TraceData[] = [];
  if (entry.part) {
    for (var part of entry.part) {
      const val = getValue(part);
      let valueData : TraceData = { name: entry.valueString ?? '', type: part.name };
      if (val.length > 0)
        valueData.value = JSON.stringify(val[0].value, null, 4);
      result.push(valueData);
    }
  }
  return result;
}

interface IFhirPathMethods
{
  readParametersFromQuery(): TestFhirpathData;
  applyParameters(p: TestFhirpathData): void;
  variableMessages(variable: VariableData): string | undefined;
  variableErrorMessages(variable: VariableData): string | undefined;
  isValidFhirUrl(variable: VariableData): boolean;
  resourceJsonChangedEvent(): void;
  updateVariableValue(name: string): void;
  fhirpathExpressionChangedEvent(): void;
  resourceJsonChangedMessage(): string | undefined;
  tabTitle(): void;
  settingsClosed(): void;
  tabClicked(e: KeyboardEvent | MouseEvent): void;
  changeTab(selectTab: number): void;

  getContextExpression(): string | undefined;
  getFhirpathExpression(): string | undefined;
  getResourceJson(): string | undefined;

  hasTraceData(): boolean;
  clearOutcome(): void;
  setResultJson(result: string): void;
  executeRequest<T>(url: string, p: fhir4b.Parameters): void;

  downloadLibrary(libraryId: string): void;
  reformatTestResource(): void;
  downloadTestResource(): void;
  downloadVariableResource(name: string): void;
  evaluateExpressionUsingFhirpathJs(): void;
  evaluateExpressionUsingFhirpathJsR5(): void;
  prepareSharePackageData(): TestFhirpathData;
  showShareLink(): boolean;
  updateShareText(): void;
  updateZulipShareText(): void;
  copyShareLinkToClipboard(): void;
  copyZulipShareLinkToClipboard(): void;
  evaluateFhirPathExpression(): void;
  checkFocus(event: any): void;
  saveLastUsedParameters(loadCompleted: boolean): void;

  GetAISettings(): IOpenAISettings;
  handleSendMessage(message: string): void;
  resetConversation(): void;
  applySuggestedExpression(updatedExpression: string): void;
  applySuggestedContext(updatedExpression: string): void;
}

interface IFhirPathComputed
{
  expressionVisible: boolean;
  variablesVisible: boolean;
  traceVisible: boolean;
  chatVisible: boolean;
  resourceVisible: boolean;
  debugVisible: boolean;
  astVisible: boolean;

  expressionActiveClass: string;
  variablesActiveClass: string;
  traceActiveClass: string;
  chatActiveClass: string;
  resourceActiveClass: string;
  debugActiveClass: string;
  astActiveClass: string;
}

interface IFhirPathProps
{
  $refs : {
    aceEditorExpression: HTMLDivElement,
    aceEditorContextExpression: HTMLDivElement,
    aceEditorDebug: HTMLDivElement,
    aceEditorResourceJson: HTMLDivElement,
    chatComponent: Chat,
    // astTabComponent: ParseTreeTab,
    astTabComponent2: ParseTreeTab,
  },
}

export default Vue.extend<FhirPathData, IFhirPathMethods, IFhirPathComputed, IFhirPathProps>({
  head: {
    title: "FhirPathTester",
  },
  async mounted() {
    window.onresize = () => {
        this.windowWidth = window.innerWidth
    }
    this.showAdvancedSettings = settings.showAdvancedSettings();
    if (settings.getOpenAIKey())
      this.chatEnabled = true;
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
        this.expressionEditor.setValue("trace('trc').given.join(' ')\n.combine(family).join(', ')");
        this.expressionEditor.clearSelection();
        this.expressionEditor.on("change", this.fhirpathExpressionChangedEvent)
    }

    var editorDebugDiv: any = this.$refs.aceEditorDebug as Element;
    if (editorDebugDiv) {
      this.debugEditor = ace.edit(editorDebugDiv, {
        wrap: "free",
        readOnly: true,
        minLines: 15,
        // maxLines: 35,
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
      // maxLines: 30,
      highlightActiveLine: true,
      showGutter: true,
      fontSize: 14,
        cursorStyle: "slim",
      showPrintMargin: false,
      theme: "ace/theme/chrome",
      mode: "ace/mode/json",
      wrapBehavioursEnabled: true
    };
    var editorResourceJsonDiv: any = this.$refs.aceEditorResourceJsonTab as Element;
    if (editorResourceJsonDiv) {
      this.resourceJsonEditor = ace.edit(editorResourceJsonDiv, resourceEditorSettings);
      this.resourceJsonEditor?.setValue(JSON.stringify(JSON.parse(examplePatient), null, 2));
      this.resourceJsonEditor?.clearSelection();
      this.resourceJsonEditor.session.on("change", this.resourceJsonChangedEvent);
    }

    // read the values that were last used (stored in the local storage)
    const lastUsed = settings.loadLastUsedParameters();
    console.log(lastUsed);
    if (lastUsed && lastUsed.loadCompleted) {
      const p: TestFhirpathData = {
        expression: lastUsed.expression ?? '',
        context: lastUsed.context,
        resource: lastUsed.resourceId,
        resourceJson: lastUsed.resourceJson,
        engine: lastUsed.engine,
      };
      // await this.applyParameters(p);
    }
    // Check for the encoded parameters first
    const parameters = this.$route.query.parameters as string;
    let data: TestFhirpathData;
    if (parameters) {
      // special parameter that encodes all the stuff inside
      data = DecodeTestFhirpathData(parameters);
      console.log(data);
    }
    else {
    // Read in any parameters from the URL
      data = this.readParametersFromQuery();
    }
    await this.applyParameters(data);
    await this.evaluateFhirPathExpression();
    this.loadingData = false;
  },
  computed: {
    expressionVisible(): boolean {
      return this.primaryTab === 0 || (this.secondaryTab === 0 && this.windowWidth > 999);
    },
    resourceVisible(): boolean {
      return this.primaryTab === 1 || (this.secondaryTab === 1 && this.windowWidth > 999);
    },
    variablesVisible(): boolean {
      return this.primaryTab === 2 || (this.secondaryTab === 2 && this.windowWidth > 999);
    },
    traceVisible(): boolean {
      return this.primaryTab === 3 || (this.secondaryTab === 3 && this.windowWidth > 999);
    },
    astVisible(): boolean {
      return this.primaryTab === 4 || (this.secondaryTab === 4 && this.windowWidth > 999);
    },
    chatVisible(): boolean {
      return this.primaryTab === 5 || (this.secondaryTab === 5 && this.windowWidth > 999);
    },
    debugVisible(): boolean {
      return this.primaryTab === 6 || (this.secondaryTab === 6 && this.windowWidth > 999);
    },

    expressionActiveClass(): string { return this.secondaryTab === 0 && this.windowWidth > 999 || this.primaryTab === 0 ? "v-tab--active" : "" },
    resourceActiveClass(): string { return this.secondaryTab === 1 && this.windowWidth > 999 || this.primaryTab === 1 ? "v-tab--active" : "" },
    variablesActiveClass(): string { return this.secondaryTab === 2 && this.windowWidth > 999 || this.primaryTab === 2 ? "v-tab--active" : "" },
    traceActiveClass(): string { return this.secondaryTab === 3 && this.windowWidth > 999 || this.primaryTab === 3 ? "v-tab--active" : "" },
    astActiveClass(): string { return this.secondaryTab === 4 && this.windowWidth > 999 || this.primaryTab === 4 ? "v-tab--active" : "" },
    chatActiveClass(): string { return this.secondaryTab === 5 && this.windowWidth > 999 || this.primaryTab === 5 ? "v-tab--active" : "" },
    debugActiveClass(): string { return this.secondaryTab === 6 && this.windowWidth > 999 || this.primaryTab === 6 ? "v-tab--active" : "" },
  },
  methods: {
    tabClicked(e: KeyboardEvent | MouseEvent): void{
      this.lastTabClicked = e;
    },
    changeTab(selectTab: number): void {
      // Primary tab is the one that is "locked" and only changeable when clicking with control
      // The secondary tab is the one that is "switched" when clicking without control
      if (this.primaryTab !== selectTab){
        if (this.lastTabClicked && (this.lastTabClicked as MouseEvent).ctrlKey || this.windowWidth <= 999) {
          this.primaryTab = selectTab;
        }
        else {
          this.secondaryTab = selectTab;
        }
      }
      this.lastTabClicked = undefined;
    },
    readParametersFromQuery(): TestFhirpathData{
      let data: TestFhirpathData = {
        expression: this.$route.query.expression as string
      };
    if (this.$route.query.libaryId as string) {
        data.libraryId = this.$route.query.libaryId as string;
    }
    else {
        if (this.$route.query.context) {
          data.context = this.$route.query.context as string;
        }

        if (this.$route.query.resource) {
          data.resource = this.$route.query.resource as string;
        }

        const resourceJson = this.$route.query.resourceJson + '';
        if (resourceJson) {
          data.resourceJson = decompressFromEncodedURIComponent(resourceJson)??'';
        }

        if (this.$route.query.exampletype) {
          data.exampletype = this.$route.query.exampletype as string;
        }

        if (this.$route.query.engine) {
          data.engine = this.$route.query.engine as string ?? '';
        }

        if (this.$route.query.terminologyServer) {
          data.terminologyServer = this.$route.query.terminologyServer as string ?? '';
        }
      }
      return data;
    },
    async applyParameters(p: TestFhirpathData){
      if (p.libraryId) {
        await this.downloadLibrary(p.libraryId);
      }
      else {
        if (p.expression) {
          if (p.exampletype) {
            this.resourceId = `${settings.getFhirServerUrl()}/${p.exampletype}/example`;
        }
        else {
            if (p.resource) {
              this.resourceId = p.resource;
          }
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

          if (p.terminologyServer) {
            this.terminologyServer = p.terminologyServer ?? '';
        }

        if (this.expressionEditor) {
            this.expressionEditor.setValue(p.expression ?? '');
          this.expressionEditor.clearSelection();
        }
          if (p.variables){
            for (let v of p.variables){
              this.variables.set(v.name, v);
      }
    }
        }
      }
  },
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
    isValidFhirUrl(variable: VariableData): boolean {
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
    updateVariableValue(name: string): void{
      const ie: InputEvent = event as InputEvent;
      // console.log(event);
      const value = (ie.currentTarget as any).value;
      const varValue = this.variables.get(name)
      if (varValue && varValue.data !== value){
        varValue.data = value;
        this.$forceUpdate();
      }
      else{
        this.variables.set(name, { name:name, data: value });
      }
    },
    fhirpathExpressionChangedEvent(){
      // Check the expression to see if there are any variables in there
      const session = this.expressionEditor?.session;
      if (session){

        if (this.selectedEngine.indexOf("fhirpath.js") != -1){
          const astTab2 = this.$refs.astTabComponent2 as ParseTreeTab;
          astTab2?.displayTreeForExpression(this.getContextExpression() ?? '', this.getFhirpathExpression() ?? '');
        }
        // const astTab = this.$refs.astTabComponent as ParseTreeTab;
        // astTab.displayTreeForExpression(this.getContextExpression() ?? '', this.getFhirpathExpression() ?? '');

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
                    updatedVariables.set(varName, { name: varName,  data: undefined });
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
      this.chatEnabled = settings.getOpenAIKey() !== undefined;
      this.$forceUpdate();
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
    async executeRequest<T>(url: string, p: fhir4b.Parameters) {
      try {
        if (this.cancelSource) this.cancelSource.cancel("new search started");
        this.cancelSource = axios.CancelToken.source();
        this.loadingData = true;
        this.expressionParseOutcome = undefined;
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

                if (entry.part)
                {
                  for (var part of entry.part) {
                    if (part.name === 'parseDebugTree' && part.valueString) {
                      let ast: JsonNode = JSON.parse(part.valueString);
                      const astTab = this.$refs.astTabComponent2 as ParseTreeTab;
                      astTab?.displayTree(ast);
                    }
                    if (part.name === 'debugOutcome' && part.resource) {
                      this.expressionParseOutcome = part.resource as fhir4b.OperationOutcome;
                    }
                  }
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
              this.saveLastUsedParameters(true);
            }
          }
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
        const response = await axios.get<fhir4b.Library>(url, {
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
          const serverError = err as AxiosError<fhir4b.OperationOutcome>;
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

    reformatTestResource(){
      if (this.resourceJsonEditor){
        const jsonValue = this.resourceJsonEditor.getValue();
        try {
          this.resourceJsonEditor.setValue(JSON.stringify(JSON.parse(jsonValue), null, 4));
          this.resourceJsonEditor.clearSelection();
          this.resourceJsonEditor.renderer.updateFull(true);
        }
        catch{}
      }
    },

    async downloadTestResource() {
      try {
        if (!this.resourceId) return;
        let url = this.resourceId;
        if (this.resourceId && !this.resourceId.startsWith('http'))
          url = settings.getFhirServerUrl() + '/' + this.resourceId;
        
        // if trying to use the hl7 example servers, that should be over https
        if (url.startsWith("http://build.fhir.org/")
            || url.startsWith("http://hl7.org/fhir/"))
            url = "https://" + url.substring(7);
        
        // If this is trying to download a hl7 example, run it through the downloader proxy
        // as the HL7 servers don't have CORS for us
        if (url.startsWith("https://build.fhir.org/")
            || url.startsWith("https://hl7.org/fhir/"))
            url = settings.dotnet_server_downloader() + "?url=" + url;

        if (this.cancelSource) this.cancelSource.cancel("new download started");
        this.cancelSource = axios.CancelToken.source();
        this.loadingData = true;
        let token = this.cancelSource.token;
        let headers: AxiosRequestHeaders = {
            "Cache-Control": "no-cache",
            "Accept": requestFhirAcceptHeaders
          }
        const response = await axios.get<fhir4b.Resource>(url, {
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
          this.resourceType = results.resourceType;
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
          // console.log("Axios Error:", err);
          this.saveOutcome = { resourceType: 'OperationOutcome', issue: [] }
          this.saveOutcome?.issue.push({ code: 'unknown', severity: 'fatal', details: { text: err.message }, diagnostics: err.code });
          this.showOutcome = true;
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

        // if trying to use the hl7 example servers, that should be over https
        if (url.startsWith("http://build.fhir.org/")
            || url.startsWith("http://hl7.org/fhir/"))
            url = "https://" + url.substring(7);
        
        if (url.startsWith("https://build.fhir.org/")
          || url.startsWith("https://hl7.org/fhir/"))
          url = settings.dotnet_server_downloader() + "?url=" + url;

        if (this.cancelSource) this.cancelSource.cancel("new download started");
        this.cancelSource = axios.CancelToken.source();
        this.loadingData = true;
        let token = this.cancelSource.token;
        let headers: AxiosRequestHeaders = {
            "Cache-Control": "no-cache",
            "Accept": requestFhirAcceptHeaders
          }
        const response = await axios.get<fhir4b.Resource>(url, {
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
          this.variables.set(name, { name:name, resourceId: url, data: JSON.stringify(results, null, 4)});
          this.$forceUpdate();
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
    applySuggestedExpression(updatedExpression: string): void {
      if (this.expressionEditor) {
        // before blindly applying the updated text, do some cleaning of the context
        let fhirData : fhir4b.Resource = { resourceType: 'Patient' }; // some dummy data
        const resourceJson = this.getResourceJson();
        if (resourceJson) {
          try
          {
            fhirData = JSON.parse(resourceJson);
          }
          catch (err: any) {
          }
        }
        if (updatedExpression.startsWith(fhirData.resourceType + "."))
          updatedExpression = updatedExpression.substring(fhirData.resourceType.length+1);

        let context = this.getContextExpression() ?? '';
        if (context.length > 0){
          if (updatedExpression.startsWith(context + "."))
          updatedExpression = updatedExpression.substring(context.length+2);
        }

        this.expressionEditor.setValue(updatedExpression);
        this.expressionEditor.clearSelection();
        this.expressionEditor.renderer.updateFull(true);
      }
    },

    applySuggestedContext(updatedExpression: string): void {
      if (this.expressionContextEditor) {
        // before blindly applying the updated text, do some cleaning of the context
        let fhirData : fhir4b.Resource = { resourceType: 'Patient' }; // some dummy data
        const resourceJson = this.getResourceJson();
        if (resourceJson) {
          try
          {
            fhirData = JSON.parse(resourceJson);
          }
          catch (err: any) {
          }
        }
        if (updatedExpression.startsWith(fhirData.resourceType + "."))
          updatedExpression = updatedExpression.substring(fhirData.resourceType.length+1);

        this.expressionContextEditor.setValue(updatedExpression);
        this.expressionContextEditor.clearSelection();
        this.expressionContextEditor.renderer.updateFull(true);
      }
    },
    
    resetConversation(): void {
      this.openAILastContext = "";
    },

    async handleSendMessage(message: string) {  
      console.log("Message sent:", message);
      const chat = this.$refs.chatComponent as Chat;

      // Perform any additional actions with the message here  
      const systemPrompt = GetSystemPrompt();

      this.openAIexpressionExplanationLoading = true;
      this.openAIexpressionExplanationMessage = "Asking question...";
      chat.setThinking(true);
      let userQuestionContext: string= "";

      let fhirData : fhir4b.Resource = { resourceType: 'Patient' }; // some dummy data
      const resourceJson = this.getResourceJson();
      if (resourceJson) {
        try
        {
          fhirData = JSON.parse(resourceJson);
        }
        catch (err: any) {
        }
      }

      const expr = this.getFhirpathExpression() ?? '';
      if (expr.length > 0) {
        userQuestionContext += `Based on the FHIRPath expression \`${expr}\`\n\n`;
        let context = this.getContextExpression() ?? '';
        if (context.length > 0){
          if (context.startsWith(fhirData.resourceType+'.'))
            userQuestionContext += `being evaluated on the \`${context}\` context.\n\n`;
          else
            userQuestionContext += `being performed on the \`${fhirData.resourceType}.${context}\` context.\n\n`;
        }
        else if (!expr.startsWith(fhirData.resourceType+'.')){
          userQuestionContext += `being evaluated on the \`${fhirData.resourceType}\` resource context.\n\n`;
        }
      }
      if (userQuestionContext != this.openAILastContext){
        if (userQuestionContext.length > 0)
          chat.addMessage("Author", userQuestionContext, false);
        this.openAILastContext = userQuestionContext;
      }
      chat.addMessage("Author", message, true);

      // userQuestion += message;
      // chat.addMessage("Author", userQuestion, true);

      let prompt: Array<ChatMessage> = [];
      prompt.push({ role: "system", content: systemPrompt});
      prompt = prompt.concat(chat.getConversationChat());

      const resultOfQuestion = await EvaluateChatPrompt(
          prompt, this.GetAISettings(),
          0, 
          1000);
      this.openAIexpressionExplanationMessage = "(Generated by OpenAI "+settings.getOpenAIModel()+")";
      this.openAIexpressionExplanationLoading = false;
      chat.addMessage("FhirPath AI", resultOfQuestion ?? '', true);
      chat.setThinking(false);
    },

    async evaluateExpressionUsingFhirpathJs() {
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
        try
        {
        fhirData = JSON.parse(resourceJson);
        this.resourceType = fhirData.resourceType;
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
          this.processedByEngine = `fhirpath.js-3.4.0+ (r4b)`;
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
          this.processedByEngine = `fhirpath.js-3.4.0+ (r4b)`;
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
          let res: any[] = fhirpath.evaluate(contextNode, path, environment, fhirpath_r4_model, { traceFn: tracefunction });
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

    async evaluateExpressionUsingFhirpathJsR5() {
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
        try
        {
        fhirData = JSON.parse(resourceJson);
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
          this.processedByEngine = `fhirpath.js-3.4.0+ (r5)`;
          contextNodes = fhirpath.evaluate(fhirData, contextExpression, environment, fhirpath_r5_model);
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
          this.processedByEngine = `fhirpath.js-3.4.0+ (r5)`;
          contextNodes = fhirpath.evaluate(fhirData, "%resource", environment, fhirpath_r5_model);
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
          let res: any[] = fhirpath.evaluate(contextNode, path, environment, fhirpath_r5_model, { traceFn: tracefunction });
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

    showShareLink(): boolean {
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
    updateZulipShareText() {
      const data = this.prepareSharePackageData();
      this.shareZulipToolTipMessage = shareZulipTooltipText + ` (${EncodeTestFhirpathData(data).length} bytes)`;
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
      if (this.resourceId && !this.resourceJsonChanged) {
        if (this.resourceId.startsWith('http')) {
          shareUrl += `&resource=${encodeURIComponent(this.resourceId)}`;
        }
        else {
          shareUrl += `&resource=${encodeURIComponent(settings.getFhirServerUrl() + '/' + this.resourceId)}`;
        }
      }
      const resourceJson = this.getResourceJson();
      if (resourceJson && (this.resourceJsonChanged || !this.resourceId)) {
          shareUrl += `&resourceJson=${compressToEncodedURIComponent(resourceJson)}`;
      }
      if (this.terminologyServer) {
        shareUrl += `&terminologyserver=${encodeURIComponent(this.terminologyServer)}`;
      }

      if (navigator.clipboard) {
        navigator.clipboard.writeText(shareUrl);
        this.shareToolTipMessage = "Copied";
      }
      if (this.showAdvancedSettings){
        let packageData: TestFhirpathData = this.prepareSharePackageData();
        const compressedData = EncodeTestFhirpathData(packageData);
        shareUrl = `${url.origin}/FhirPath?parameters=${compressedData}`;
        navigator.clipboard.writeText(shareUrl);
        console.log(DecodeTestFhirpathData(compressedData));
      }
    },

    prepareSharePackageData(): TestFhirpathData {
        let packageData: TestFhirpathData = {
          expression: this.getFhirpathExpression()??'',
          context: this.getContextExpression(),
          resource: this.resourceId,
          libraryId: this.library?.id,
          engine: this.selectedEngine,
          terminologyServer: this.terminologyServer,
        };
        if (this.variables){
          packageData.variables = [];
          for (let varValue of this.variables){
            varValue[1].name = varValue[0];
            packageData.variables.push(varValue[1]);
          }
        }

        const resourceJson = this.getResourceJson();
        if (resourceJson && this.resourceJsonChanged){
          try {
          packageData.resourceJson = JSON.stringify(JSON.parse(resourceJson));
          } catch {}
        }
        return packageData;
    },
    copyZulipShareLinkToClipboard() {
      const url = new URL(window.location.href);
      let packageData: TestFhirpathData = this.prepareSharePackageData();
      const compressedData = EncodeTestFhirpathData(packageData);
      const shareUrl = `\`\`\`fhirpath\n${packageData.expression}\n\`\`\`\n:test_tube: [Test with FHIRPath-Lab](${url.origin}/FhirPath?parameters=${compressedData})`;
      navigator.clipboard.writeText(shareUrl);
      console.log(DecodeTestFhirpathData(compressedData));
    },

    checkFocus(event: any) {
      if (event.relatedTarget) {
        this.prevFocus = event.relatedTarget;
      }
    },

    saveLastUsedParameters(loadCompleted: boolean): void {
      // Write the parameters into the local storage so that can be re-loaded next time
      const data: ILastUsedParameters = {
        context: this.getContextExpression(),
        expression: this.getFhirpathExpression() ?? '',
        resourceId: this.resourceId,
        engine: this.selectedEngine,
        resourceJson: this.getResourceJson(),
        loadCompleted: loadCompleted,
      };
      if (this.variables){
        data.variables = [];
        this.variables.forEach((v) => {
          data.variables?.push(v);
        });
      }
      settings.saveLastUsedParameters(data);
    },

    // https://www.sitepoint.com/fetching-data-third-party-api-vue-axios/
    async evaluateFhirPathExpression() {

      // reset the processing engine
      this.processedByEngine = undefined;
      const astTab2 = this.$refs.astTabComponent2 as ParseTreeTab;
      astTab2?.clearDisplay();
      this.expressionParseOutcome = undefined;
      
      // const astTab = this.$refs.astTabComponent as ParseTreeTab;
      // astTab.displayTreeForExpression(this.getContextExpression() ?? '', this.getFhirpathExpression() ?? '');

      // Validate the test fhir resource object
      let resourceJson = this.getResourceJson();
      // if (resourceJson) {
      //   let rawObj: object;
      //   try {
      //     rawObj = JSON.parse(resourceJson)
      //     let resource: fhir.FhirResource | null = fhir.resourceFactory(rawObj);
      //     if (resource) {
      //       const issues: fhir.FtsIssue[] = resource.doModelValidation();
      //       if (issues.length !== 0) {
      //         this.saveOutcome = { resourceType: 'OperationOutcome', issue: [] }
      //         this.saveOutcome?.issue.push(...issues as any);
      //         this.showOutcome = true;
      //       }
      //     }
      //   } catch (err) {
      //     console.log(err);
      //     this.saveOutcome = { resourceType: 'OperationOutcome', issue: [] }
      //     this.saveOutcome?.issue.push({ code: 'exception', severity: 'error', details: { text: `Failed to parse the resource: ${err}` } });
      //     this.showOutcome = true;
      //     this.loadingData = false;
      //   }
      // }

      this.saveLastUsedParameters(false);

      if (this.selectedEngine == "fhirpath.js") {
        astTab2?.displayTreeForExpression(this.getContextExpression() ?? '', this.getFhirpathExpression() ?? '');
        await this.evaluateExpressionUsingFhirpathJs();
        this.saveLastUsedParameters(true);
        if (this.prevFocus){
          this.prevFocus.focus();
        }
        return;
      }

      if (this.selectedEngine == "fhirpath.js (R5)") {
        astTab2?.displayTreeForExpression(this.getContextExpression() ?? '', this.getFhirpathExpression() ?? '');
        await this.evaluateExpressionUsingFhirpathJsR5();
        this.saveLastUsedParameters(true);
        if (this.prevFocus){
          this.prevFocus.focus();
        }
        return;
      }

      // brianpos hosted service
      // Source code for this is at https://github.com/brianpos/fhirpath-lab-dotnet
      let url = settings.dotnet_server_r4b();

      if (this.selectedEngine == ".NET (firely-R5)") {
        url = settings.dotnet_server_r5();
      }
      let p: fhir4b.Parameters = { resourceType: "Parameters", parameter: [{ name: "expression", valueString: this.getFhirpathExpression() ?? 'today()' }] };

      const contextExpression = this.getContextExpression();
      if (contextExpression) {
        p.parameter?.push({ name: "context", valueString: contextExpression });
      }
      // Add the debug parameter to check the expression
      // works well enough to always ask now.
      p.parameter?.push({ name: "validate", valueBoolean: true });

      // add in any variables
      if (this.variables){
        let pVars : fhir4b.ParametersParameter = { name: "variables", part: []};
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
        url = settings.java_server_r4b();
        astTab2.clearDisplay("AST not supported");

        if (!this.getResourceJson() && this.resourceId) {
          await this.downloadTestResource();
          resourceJson = this.getResourceJson();        
        }

        (this as any).$appInsights?.trackEvent({ name: 'evaluate HAPI' });
      }
      else if (this.selectedEngine == "java (HAPI-R5)") {
        // https://github.com/jkiddo/fhirpath-tester/blob/main/src/main/java/org/example/Evaluator.java (brianpos fork of this)
        // https://docs.microsoft.com/en-us/azure/devops/pipelines/ecosystems/java-function?view=azure-devops
        url = settings.java_server_r5();
        astTab2.clearDisplay("AST not supported");

        if (!this.getResourceJson() && this.resourceId) {
          await this.downloadTestResource();
          resourceJson = this.getResourceJson();        
        }

        (this as any).$appInsights?.trackEvent({ name: 'evaluate HAPI' });
      }
      else if (this.selectedEngine == "java (IBM)") {
        url = settings.ibm_server_r4b();
        astTab2.clearDisplay("AST not supported");

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

      // Set focus to the control that previously had focus (if was known)
      if (this.prevFocus){
          this.prevFocus.focus();
        }
    },
  },
  data(): FhirPathData {
    return {
      prevFocus: null,
      tab: null,
      lastTabClicked: undefined,
      primaryTab: 0,
      secondaryTab: 1,
      windowWidth: window.innerWidth,
      library: undefined,
      raw: undefined,
      resourceId: undefined,
      resourceType: 'Patient',
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
        "java (IBM)",
        ".NET (firely-R5)",
        "fhirpath.js (R5)",
        "java (HAPI-R5)",
      ],
      shareToolTipMessage: shareTooltipText,
      shareZulipToolTipMessage: shareZulipTooltipText,
      expressionEditor: undefined,
      expressionContextEditor: undefined,
      debugEditor: undefined,
      resourceJsonEditor: undefined,
      variables: new Map<string, VariableData>(),
      processedByEngine: undefined,
      openAIexpressionExplanationLoading: false,
      openAIexpressionExplanationMessage: "",
      showChat: false,
      chatEnabled: false,
      openAILastContext: "",
      expressionParseOutcome: undefined,
      astInverted: true,
    };
  },
});
</script>
