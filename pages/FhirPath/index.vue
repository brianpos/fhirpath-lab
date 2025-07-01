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
            @change="evaluateFhirPathExpression">
            <template v-slot:item="{ item }">
              <span v-if="externalExecutionEngines.indexOf(item) == -1">{{ item }}</span>
              <span class="externalExecutionEngine" title="Externally hosted FhirPath Engine" v-if="externalExecutionEngines.indexOf(item) >= 0"><v-icon small>mdi-web</v-icon> {{ item }} *</span>
            </template>
          </v-select>
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

          <v-tooltip bottom color="primary" v-show="showAdvancedSettings">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon dark @click="createNewLibrary" v-bind="attrs" v-on="on"
                :hidden="!enableCreateLibrary">
                <v-icon>
                  mdi-content-save-plus
                </v-icon>
              </v-btn>
            </template>
            <span>Share this expression in Library</span>
          </v-tooltip>
          <v-tooltip bottom color="primary" v-show="showAdvancedSettings">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon dark @click="saveLibrary" v-bind="attrs" v-on="on"
              :hidden="!enableSaveLibrary">
                <v-icon>
                  mdi-content-save
                </v-icon>
              </v-btn>
            </template>
            <span>Save the Library</span>
          </v-tooltip>
          <div v-if="debugTracePosition != undefined" style="border-radius: 8px; border: solid 1px white; padding: 4px;">
            <v-btn v-if="debugTracePosition != undefined" x-small dark icon @click="debugTracePosition = 1; debuggerStepBack()" title="Reset to first trace">
              <v-icon>
                mdi-bug-play-outline
              </v-icon>
            </v-btn>
            <v-btn v-if="debugTracePosition != undefined" x-small dark icon @click="debuggerStepForward()" :disabled="debugTracePosition >= debugTraceData.length - 1" title="Step forward in trace">
              <v-icon>
                mdi-debug-step-into
              </v-icon>
            </v-btn>
            <v-btn v-if="debugTracePosition != undefined" x-small dark icon @click="debuggerStepBack()" :disabled="debugTracePosition <= 0" title="Step back in trace">
              <v-icon>
                mdi-debug-step-out
              </v-icon>
            </v-btn>
          </div>
        </v-toolbar>
        <twin-pane-tab :tabs="tabDetails" ref="twinTabControl" @mounted="twinPaneMounted" @change="tabChanged">
          <template v-slot:Expression>
            <label class="v-label theme--light bare-label">Context Expression (optional)</label>
            <v-tooltip bottom >
              <template v-slot:activator="{ on, attrs }">
                <v-btn class="resetButton" icon 
                  v-bind="attrs" v-on="on"
                  @click="resetExpression"><v-icon>mdi-broom</v-icon></v-btn>
              </template>
              <span>Reset Expression and context</span>
            </v-tooltip>
            <div height="85px" width="100%" ref="aceEditorContextExpression"></div>
            <div class="ace_editor_footer"></div>

            <label class="v-label theme--light bare-label">Fhirpath Expression</label>
            <div height="85px" width="100%" ref="aceEditorExpression"></div>
            <div class="ace_editor_footer"></div>

            <template v-if="debugTracePosition != undefined && debugTraceData.length > 0 && debugTraceData[debugTracePosition].thisVar != undefined && debugTraceData[debugTracePosition].thisVar.length > 0">
              <div class="results">Debug variables</div>
              <v-simple-table>
                <template v-for="(resultValue, i1) in debugTraceData[debugTracePosition].values">
                <tr :key="i1">
                  <td class="result-type">
                    <span style="white-space:nowrap;" v-if="debugTraceData[debugTracePosition].exprName != undefined"> {{ debugTraceData[debugTracePosition].exprName }} <v-icon x-small>mdi-keyboard-return</v-icon></span>&nbsp;
                  </td>
                  <td class="result-value">
                    <div class="code-json" v-if="resultValue.value != null">{{ resultValue.value }}</div>
                    <div class="code-json" v-if="resultValue.value == null && resultValue.valueType == 'empty-string'"><i>""</i></div>
                  </td>
                  <td class="result-type">
                    <i v-if="resultValue.valueType">({{ resultValue.valueType }})</i>
                    <span v-if="resultValue.resourcePath" class="result-path">{{ resultValue.resourcePath }}
                      <v-btn v-if="resultValue.resourcePath" x-small class="result-path-target" icon title="Goto context" @click="navigateToContext(resultValue.resourcePath)">
                      <v-icon>
                        mdi-target
                      </v-icon>
                    </v-btn>
                    </span>
                  </td>
                </tr>
                </template>
                <template v-for="(focusValue, i1) in debugTraceData[debugTracePosition].focusVar">
                <tr :key="i1">
                  <td class="result-type debug-row">
                    $focus
                  </td>
                  <td class="result-value debug-row">
                    <div class="code-json" v-if="focusValue.value != undefined">{{ focusValue.value }}</div>
                    <div class="code-json" v-if="focusValue.value == undefined && focusValue.valueType == 'empty-string'"><i>""</i></div>
                  </td>
                  <td class="result-type debug-row">
                    <i v-if="focusValue.valueType">({{ focusValue.valueType }})</i>
                    <span v-if="focusValue.resourcePath" class="result-path">{{ focusValue.resourcePath }}
                      <v-btn v-if="focusValue.resourcePath" x-small class="result-path-target" icon title="Goto context" @click="navigateToContext(focusValue.resourcePath)">
                      <v-icon>
                        mdi-target
                      </v-icon>
                    </v-btn>
                    </span>
                  </td>
                </tr>
                </template>
                <tr v-if="debugTraceData[debugTracePosition].index != undefined">
                  <td class="result-type debug-row">
                    <span style="white-space:nowrap;">index</span>
                  </td>
                  <td class="result-value debug-row">
                    <div class="code-json">{{ debugTraceData[debugTracePosition].index }}</div>
                  </td>
                  <td class="result-type debug-row">
                    &nbsp;
                  </td>
                </tr>
                <template v-for="(thisValue, i1) in debugTraceData[debugTracePosition].thisVar">
                <tr :key="i1">
                  <td class="result-type debug-row">
                    $this
                  </td>
                  <td class="result-value debug-row">
                    <div class="code-json" v-if="thisValue.value != undefined">{{ thisValue.value }}</div>
                    <div class="code-json" v-if="thisValue.value == undefined && thisValue.valueType == 'empty-string'"><i>""</i></div>
                  </td>
                  <td class="result-type debug-row">
                    <i v-if="thisValue.valueType">({{ thisValue.valueType }})</i>
                    <span v-if="thisValue.resourcePath" class="result-path">{{ thisValue.resourcePath }}
                      <v-btn v-if="thisValue.resourcePath" x-small class="result-path-target" icon title="Goto context" @click="navigateToContext(thisValue.resourcePath)">
                      <v-icon>
                        mdi-target
                      </v-icon>
                    </v-btn>
                    </span>
                  </td>
                </tr>
                </template>
              </v-simple-table>
            </template>

            <div class="results">RESULTS <span class="processedBy">{{ processedByEngine }}</span></div>
            <OperationOutcomePanel :outcome="expressionParseOutcome" @close="expressionParseOutcome = undefined" />
            <template v-for="(r2, i1) in results">
              <v-simple-table style="flex-shrink: 1;" :key="i1">
                <tr v-if="r2.context">
                  <td class="context" colspan="2">
                    <v-btn x-small v-if="r2.position" style="float:right;" icon title="Goto context" @click="navigateToContext(r2.context)">
                      <v-icon>
                        mdi-target
                      </v-icon>
                    </v-btn>
                    <div>Context: <b>{{ r2.context }}</b></div>
                  </td>
                </tr>
                <template v-for="(v1, index) in r2.result">
                  <tr :key="index">
                    <td class="result-value">
                      <div class="code-json">{{ v1.value }}</div>
                    </td>
                    <td class="result-type">
                      <i v-if="v1.type">({{ v1.type }})</i>
                      <span v-if="v1.path" class="result-path">{{ v1.path }}
                        <v-btn v-if="v1.path" x-small class="result-path-target" icon title="Goto context" @click="navigateToContext(v1.path)">
                        <v-icon>
                          mdi-target
                        </v-icon>
                      </v-btn>
                      </span>
                    </td>
                  </tr>
                </template>
              </v-simple-table>
            </template>
          </template> 

          <template v-slot:Resource>
            <v-text-field label="Test Resource Id" v-model="resourceId" hide-details="auto" autocomplete="off" @input="updateNow"
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
          </template>

          <template v-slot:Variables>
            <template v-for="(v1, index) in variables">
              <v-textarea :auto-grow="!v1[1].resourceId" :rows="(!v1[1].resourceId?1:5)" 
                :label="v1[0]" hide-details="auto" :value="v1[1].data" 
                autocorrect="off" autocapitalize="off" spellcheck="false"
                @input="updateVariableValue(v1[0])" :key="index" 
                :messages="variableMessages(v1[1])" :error-messages="variableErrorMessages(v1[1])" :error="(!!v1[1].errorMessage)">
                <template v-slot:append>
                <v-btn icon small tile @click="variables.set(v1[0], { name: v1[0], data: v1[1].resourceId }); updateNextTick()">
                    <v-icon> mdi-close </v-icon>
                  </v-btn>
                  <v-btn icon small tile @click="downloadVariableResource(v1[0])" :hidden="!isValidFhirUrl(v1[1])"> 
                    <v-icon> mdi-download </v-icon>
                  </v-btn>
                </template>
              </v-textarea>
              <!-- <div class="code-json">{{ JSON.stringify(v1[1], null, settings.getTabSpaces()) }}</div> -->
            </template>
            <br/>
            <label><i>Note: This variables tab is only visible when there are variables in the expression.
              To add another variable, name it in the fhirpath expression.<br/>
              Also note that the variables are not supported in the context expression.</i></label>
          </template>

          <template v-slot:Trace>
            <template v-for="(r2, i1) in results">
              <v-simple-table :key="i1">
                <tr v-if="r2.context">
                  <td class="context" colspan="3">
                    <v-btn v-if="r2.position" x-small style="float:right;" icon title="Goto context" @click="navigateToContext(r2.context)">
                      <v-icon>
                        mdi-target
                      </v-icon>
                    </v-btn>
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
                    <td class="result-type">
                      <i v-if="v1.type">({{ v1.type }})</i>
                      <span v-if="v1.path" class="result-path">{{ v1.path }}
                        <v-btn v-if="v1.path" x-small class="result-path-target" icon title="Goto context" @click="navigateToContext(v1.path, v1.name)">
                        <v-icon>
                          mdi-target
                        </v-icon>
                      </v-btn>
                      </span>
                    </td>
                  </tr>
                </template>
              </v-simple-table>
            </template>
            
          </template>

          <template v-slot:AST>
            <OperationOutcomePanel :outcome="expressionParseOutcome" @close="expressionParseOutcome = undefined" />
            <parse-tree-tab ref="astTabComponent2" :showAdvancedSettings="showAdvancedSettings" @navigateToExpressionNode="navigateToExpressionNode"></parse-tree-tab>
          </template>

          <template v-slot:AI_Chat>
            <Chat class="chat" ref="chatComponent" 
              feature="FHIRPathTester"
              :openAIFeedbackEnabled="openAIFeedbackEnabled"
              :publisher="defaultProviderField"
                @send-message="handleSendMessage" 
                @reset-conversation="resetConversation"
                @apply-suggested-context="applySuggestedContext"
                @apply-suggested-expression="applySuggestedExpression"
                @apply-suggested-questionnaire="copySuggestionToClipboard"
                @apply-suggested-item="copySuggestionToClipboard"
                @apply-suggested-fhir="copySuggestionToClipboard"
                @apply-suggested-json="copySuggestionToClipboard"
                @apply-suggested-fsh="copySuggestionToClipboard"
                @apply-suggested-jsonpatch="copySuggestionToClipboard"
                />
          </template>

          <template v-slot:Debug>
            <div class="debug" ref="aceEditorDebug"></div>
          </template>

          <template v-slot:Library>
            <conformance-resource-details-tab ref="libDetailsTabComponent"
            v-if="library"
                          :raw="library"
                          :hideHeader="true"
                          :showAdvancedSettings="showAdvancedSettings"
                          :readonly="!enableSaveLibrary"
                          @update="updateNow"
                        >
                        </conformance-resource-details-tab>
          </template>

          <template v-slot:Publishing>
            <conformance-resource-publishing-tab
                          v-if="library"
                          :raw="library"
                          :hideHeader="true"
                          :lockPublisher="true"
                          :showAdvancedSettings="showAdvancedSettings"
                          :readonly="!enableSaveLibrary"
                          @update="updateNow"
                        />
          </template>

        </twin-pane-tab>
      </v-card>

      <br />
      <OperationOutcomeOverlay style="z-index: 8" v-if="showOutcome" :saveOutcome="saveOutcome" :showOutcome="showOutcome" title="Error"
        @close="clearOutcome" />
    </div>
  </div>
</template>

<style lang="scss">
.externalExecutionEngine {
  color: blueviolet;
}
.resetButton {
  right: 20px;
  position: absolute;
  top: 20px;
  z-index: 2;
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
  .resetButton {
    top: 74px;
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
</style>

<style>
.v-treeview--dense .v-treeview-node__root {
    min-height: 28px;
}

.v-treeview-node {
  border-top: thin solid silver;
}

.resultSelection {
  position: absolute;
  z-index: 20;
  background-color: #5240ef65;
}

.debugSelection {
  position: absolute;
  z-index: 20;
  background-color: #fbff82b1;
}
</style>

<style lang="scss" scoped>
.ace_editor:focus-within+.ace_editor_footer {
  color: #1976d2;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}
</style>

<style lang="scss" scoped >
.debug-row {
  background-color: #ebebeb;
}

.result-type:has(.result-path) {
  padding-bottom: 12px;
}

.result-path {
  font-size: 0.6rem;
  color: #666;
  font-style: italic;
  position: absolute;
  bottom: -4px;
  right: 4px;
  text-wrap-mode: nowrap;
}

.result-path-target {
  right: 0px;
  bottom: 2px;
}

tr.ve-table-body-tr {
  cursor: pointer;
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

.result-type {
  position: relative;
  border-bottom: silver 1px solid;
}

.result-value {
  position: relative;
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
  saveFhirResource,
  CreateOperationOutcome,
} from "~/helpers/searchFhir";
import axios, { AxiosRequestHeaders, AxiosResponse } from "axios";
import { AxiosError } from "axios";
import { CancelTokenSource } from "axios";
import { addExtension, addExtensionStringValue, clearExtension, getExtensionCodingValues, getExtensionReferenceValue, getExtensionStringValue, setExtension, setExtensionStringValue } from "fhir-extension-helpers";
import { fpjsNode, getTraceValue, getValue, JsonNode, ResultData } from "~/models/FhirpathTesterData";
import { GetExternalVariablesUsed, InvertTree, mapFunctionReferences } from "~/components/ParseTreeTab.vue";
// import { getPreferredTerminologyServerFromSDC } from "fhir-sdc-helpers";
import fhirpath, { AsyncOptions } from "fhirpath";
import fhirpath_r4_model from "fhirpath/fhir-context/r4";
import fhirpath_r5_model from "fhirpath/fhir-context/r5";
import { setAcePaths, Rules as FhirPathHightlighter_Rules, setCustomHighlightRules } from "~/helpers/fhirpath_highlighter"
import "~/assets/fhirpath_highlighter.scss"
import { IApplicationInsights } from '@microsoft/applicationinsights-web'

import "ace-builds";
import ace from "ace-builds";
import langTools from "ace-builds/src-noconflict/ext-language_tools";

import Chat from "~/components/Chat.vue";
import { Message } from "~/types/chat-types";

// import { fhir } from '@fhir-typescript/r4b-core';
import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from "lz-string";
import { VariableData, EncodeTestFhirpathData, DecodeTestFhirpathData, TestFhirpathData } from "~/models/testenginemodel";

import { EvaluateChatPrompt, GetSystemPrompt, IOpenAISettings } from "~/helpers/openai_utils";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import ParseTreeTab from "~/components/ParseTreeTab.vue";
import ConformanceResourceDetailsTab from "~/components/ConformanceResourceDetailsTab.vue";
import { LibraryData } from "~/models/LibraryTableData";
import { BaseResource_defaultValues } from "~/models/BaseResourceTableData";
import { DomainResource, FhirResource, Resource } from "fhir/r4b";
import { findNodeByPath, IJsonNode, IJsonNodePosition, parseJson } from "~/helpers/json_parser";
import TwinPaneTab, { TabData } from "~/components/TwinPaneTab.vue";

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

interface DebugTraceData {
  context: string;
  exprPosition?: number;
  exprLength?: number;
  exprName?: string;
  values?: DebugTraceValue[];
  index?: number;
  focusVar?: DebugTraceValue[];
  thisVar?: DebugTraceValue[];
}

interface DebugTraceValue {
  resourcePath?: string;
  value?: any;
  valueType?: string;
}

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
  defaultProviderField: string | undefined;
  terminologyServer: string;
  cancelSource?: CancelTokenSource;
  results: ResultData[];
  selectedEngine: string;
  executionEngines: string[];
  externalExecutionEngines: string[];
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
  openAIFeedbackEnabled?: boolean;
  chatEnabled: boolean;
  showChat: boolean;
  openAILastContext: string;
  expressionParseOutcome?: fhir4b.OperationOutcome;
  astInverted: boolean;
  enableSave: boolean;
  debugTracePosition?: number;
  debugTraceData: DebugTraceData[];
  debugExpressionSelectionMarker?: number[];
  debugTestResourceSelectionMarker?: number[];
  debugThisSelectionMarker?: number[];
}

function fullPropertyName(node: ResourceNode) : string | undefined {
  if (node.propName === undefined) {
    return undefined;
  }
  // check if the property name is for a primitive extension in FHIR
  let propName = (node.propName?.startsWith('_') && node.model) ? node.propName.substring(1) : node.propName;

  // Now Check if this is a choice type
  if (node.parentResNode && node.model && node.fhirNodeDataType && propName.endsWith(node.fhirNodeDataType.charAt(0).toUpperCase() + node.fhirNodeDataType.substring(1))) {
    if (node.model && node.model.choiceTypePaths[node.parentResNode?.path + '.' + propName.substring(0, propName.length - node.fhirNodeDataType.length)]) {
      propName = propName.substring(0, propName.length - node.fhirNodeDataType.length);
    }
  }

  let result = node.parentResNode ? fullPropertyName(node.parentResNode) + '.' + propName : node.path ?? undefined;
    if (node.index !== undefined && node.index !== null) {
      result += '[' + node.index + ']';
    }
    return result;
  }

interface ResourceNode {
  /**
   * The parent resource node
   */
  parentResNode: ResourceNode | null;
  
  /**
   * The path of the node in the resource (e.g. Patient.name)
   */
  path: string | null;

  /** 
   * The index of the node in the array (e.g. The `0` in Patient.name[0])
   */
  index: number | undefined;
  
  propName: string | undefined;

  /**
   * The node's data or value (might be an object with sub-nodes, an array, or FHIR data type)
   */
  data: any;
  
  /**
   * Additional data stored in a property named with "_" prepended
   * See https://www.hl7.org/fhir/element.html#json for details
   */
  _data: Record<string, any>;
  
  /**
   * FHIR node data type, if the resource node is described in the FHIR model
   */
  fhirNodeDataType: string | null;
  
  /**
   * Cached converted data
   */
  convertData(): any;
 
  /**
   * The FHIR model used for this node
   */
  model : fhirpath.Model;
 
  /**
   * Retrieve any type information if available
   */
  getTypeInfo(): any;

  /**
   * Converts the node to its JSON representation
   */
  toJSON(): string;

  /**
   * Returns the full property name of the node where available
   */
  fullPropertyName(): string | undefined;
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

export interface IFhirPathMethods
{
  twinPaneMounted(): Promise<void>;
  CtrlEnterHandler(event: KeyboardEvent): void;
  readParametersFromQuery(): TestFhirpathData;
  applyParameters(p: TestFhirpathData): void;
  variableMessages(variable: VariableData): string | undefined;
  variableErrorMessages(variable: VariableData): string | undefined;
  resetExpression(): void;
  isValidFhirUrl(variable: VariableData): boolean;
  resourceJsonChangedEvent(): void;
  updateVariableValue(name: string): void;
  fhirpathExpressionChangedEvent(): void;
  fhirpathContextExpressionChangedEvent(): void;
  resourceJsonChangedMessage(): string | undefined;
  tabTitle(): void;
  settingsClosed(): void;
  updateNow():void;
  updateNextTick():void;
  selectTab(selectTab: number): void;
  tabChanged(index: number): void;
  getCompletions(editor: ace.Ace.Editor, session: ace.Ace.EditSession, pos: any, prefix: any, callback: any): void;
  DebugFunctionKeyHandler(event: KeyboardEvent): void;
  debuggerStepForward(): void;
  debuggerStepBack(): void;
  removeMarker(editor: ace.Ace.Editor | undefined, markerId: number): void;
  removeMarkers(editor: ace.Ace.Editor | undefined, markerIds: number[] | undefined): void;

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
  createNewLibrary(): void;
  saveLibrary(): void;
  navigateToContext(elementPath: string, variableName?: string, debugMode?: boolean): void;
  navigateToExpressionNode(node: JsonNode): void;
  highlightText(editor?: ace.Ace.Editor, startPosition?: number, length?: number, debugMode?: boolean): void;
  highlightTextByLine(editor?: ace.Ace.Editor, startLine?: number, startColumn?: number, length?: number): void;

  GetAISettings(): IOpenAISettings;
  handleSendMessage(message: string): void;
  resetConversation(): void;
  copySuggestionToClipboard(suggestion: string): void;
  applySuggestedExpression(updatedExpression: string): void;
  applySuggestedContext(updatedExpression: string): void;
}

interface IFhirPathComputed
{
  tabDetails: TabData[];

  enableSaveLibrary: boolean;
  enableCreateLibrary: boolean;
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
    libDetailsTabComponent: HTMLElement,
    demo2: HTMLElement,
  },
}

export default Vue.extend<FhirPathData, IFhirPathMethods, IFhirPathComputed, IFhirPathProps>({
  async mounted() {
    window.document.title = "FhirPath Tester";
    this.showAdvancedSettings = settings.showAdvancedSettings();
    this.defaultProviderField = settings.getDefaultProviderField();
    this.openAIFeedbackEnabled = settings.getOpenAIFeedbackEnabled();
    if (settings.getOpenAIKey() || settings.getOpenAIBasePath())
      this.chatEnabled = true;
    this.terminologyServer = settings.getFhirTerminologyServerUrl();

    setAcePaths(ace.config);

    document.addEventListener('keydown', this.CtrlEnterHandler);
    document.addEventListener('keydown', this.DebugFunctionKeyHandler);
  },

  beforeDestroy() {
    document.removeEventListener('keydown', this.CtrlEnterHandler);
    document.removeEventListener('keydown', this.DebugFunctionKeyHandler);
  },

  computed: {
    tabDetails(): TabData[] {
      return [
        {
          iconName: "mdi-function-variant",
          tabName: "Expression",
          show: true,
          enabled: true,
        },
        {
          iconName: "mdi-clipboard-text-outline",
          tabName: "Resource",
          show: true,
          enabled: true,
        },
        {
          iconName: "mdi-application-variable-outline",
          tabName: "Variables",
          show: this.variables.size > 0,
          enabled: true,
        },
        {
          iconName: "mdi-format-list-bulleted",
          tabName: "Trace",
          show: true,
          enabled: this.hasTraceData(),
        },
        {
          iconName: "mdi-file-tree",
          tabName: "AST",
          tabHeaderName: "Abstract Syntax Tree",
          title: "Abstract Syntax Tree",
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
        {
          iconName: "mdi-card-bulleted-settings-outline",
          tabName: "Library",
          tabHeaderName: "Library Details",
          show: this.showAdvancedSettings && this.library !== undefined,
          enabled: true,
        },
        {
          iconName: "mdi-download-network-outline",
          tabName: "Publishing",
          tabHeaderName: "Library Publishing",
          show: this.showAdvancedSettings && this.library !== undefined,
          enabled: true,
        }
      ];
    },
    enableSaveLibrary(): boolean {
      return this.enableSave && this.library != undefined && this.showAdvancedSettings && this.defaultProviderField == this.library.publisher;
    },
    enableCreateLibrary(): boolean {
      return this.library == undefined && this.showAdvancedSettings && ((this.defaultProviderField?.length ?? 0) > 0);
    },
  },
  methods: {
    DebugFunctionKeyHandler(event: KeyboardEvent): void {
      if (!this.debugTracePosition)
        return;
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

    debuggerStepBack() {
      if (!this.debugTracePosition)
        return;
      if (this.debugTracePosition > 0)
        this.debugTracePosition--;

      const traceData = this.debugTraceData[this.debugTracePosition];
      console.log("debug trace", traceData);
      if (traceData) {
        setTimeout(() => {
            this.highlightText(this.expressionEditor, traceData.exprPosition, traceData.exprLength, true);
          this.removeMarkers(this.resourceJsonEditor, this.debugTestResourceSelectionMarker);
          this.debugTestResourceSelectionMarker = [];
          this.removeMarkers(this.resourceJsonEditor, this.debugThisSelectionMarker);
          this.debugThisSelectionMarker = [];
          for (const v of traceData.values ?? []) {
            if (v.resourcePath) {
              this.navigateToContext(v.resourcePath, undefined, true);
            }
            }
        });
      }
    },

    debuggerStepForward() {
      if (this.debugTracePosition === undefined)
        return;

        // step forward to the next trace result
      if (this.debugTracePosition < this.debugTraceData.length - 1)
        this.debugTracePosition++;

      const traceData = this.debugTraceData[this.debugTracePosition];
      console.log("debug trace", traceData);
      if (traceData) {
        setTimeout(() => {
            this.highlightText(this.expressionEditor, traceData.exprPosition, traceData.exprLength, true);
          this.removeMarkers(this.resourceJsonEditor, this.debugTestResourceSelectionMarker);
          this.debugTestResourceSelectionMarker = [];
          this.removeMarkers(this.resourceJsonEditor, this.debugThisSelectionMarker);
          this.debugThisSelectionMarker = [];
          for (const v of traceData.values ?? []) {
            if (v.resourcePath) {
              this.navigateToContext(v.resourcePath, undefined, true);
            }
            }
        });
      }
    },

    CtrlEnterHandler(event: KeyboardEvent): void {
      // Ctrl + Enter to evaluate the expression
      // Command + Enter to evaluate the expression on MacOS     
      if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
        this.evaluateFhirPathExpression();
      }
    },

    async twinPaneMounted(): Promise<void> {

      let vars = this.variables;

      // https://github.com/ajaxorg/ace/blob/26eda2573755abdf8902cf85e7afbf0501ad56e1/src/autocomplete.js#L543
      var fhirpathCompleter : ace.Ace.Completer = {
        id: 'fhirpath',
        identifierRegexps: [
          /[a-zA-Z_0-9%\$\-\u00A2-\u2000\u2070-\uFFFF]/,
          // /[^a-zA-Z_0-9\$\-\u00C0-\u1FFF\u2C00-\uD7FF\w]+/
        ],
        getCompletions: this.getCompletions
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
        wrapBehavioursEnabled: true,
        enableBasicAutocompletion: [fhirpathCompleter],
        enableLiveAutocompletion: [fhirpathCompleter],
      });

      if (this.expressionContextEditor) {
        setCustomHighlightRules(this.expressionContextEditor, FhirPathHightlighter_Rules);
        this.expressionContextEditor.setValue("name"); // default value
        this.expressionContextEditor.clearSelection();
        this.expressionContextEditor.on("change", this.fhirpathContextExpressionChangedEvent);
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
        tabSize: settings.getTabSpaces(),
        cursorStyle: "slim",
        showPrintMargin: false,
        theme: "ace/theme/chrome",
        mode: "ace/mode/text",
        wrapBehavioursEnabled: true,
        enableBasicAutocompletion: [fhirpathCompleter],
        enableLiveAutocompletion: [fhirpathCompleter],
      });

      setCustomHighlightRules(this.expressionEditor, FhirPathHightlighter_Rules);
      this.expressionEditor.setValue("trace('trc').given.join(' ')\n.combine(family).join(', ')");
      this.expressionEditor.clearSelection();
      this.expressionEditor.on("change", this.fhirpathExpressionChangedEvent)

      langTools.addCompleter(fhirpathCompleter);
    }

    var editorDebugDiv: any = this.$refs.aceEditorDebug as Element;
    if (editorDebugDiv) {
      this.debugEditor = ace.edit(editorDebugDiv, {
        wrap: "free",
        readOnly: true,
        minLines: 15,
        // maxLines: 35,
        highlightActiveLine: true,
        tabSize: settings.getTabSpaces(),
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
      tabSize: settings.getTabSpaces(),
      cursorStyle: "slim",
      showPrintMargin: false,
      theme: "ace/theme/chrome",
      mode: "ace/mode/json",
      wrapBehavioursEnabled: true,
      enableBasicAutocompletion: true,
    };
    var editorResourceJsonDiv: any = this.$refs.aceEditorResourceJsonTab as Element;
    if (editorResourceJsonDiv) {
      this.resourceJsonEditor = ace.edit(editorResourceJsonDiv, resourceEditorSettings);
      this.resourceJsonEditor.setValue(JSON.stringify(JSON.parse(examplePatient), null, settings.getTabSpaces()));
      this.resourceJsonEditor.clearSelection();
      this.resourceJsonEditor.session.on("change", this.resourceJsonChangedEvent);
      this.resourceJsonEditor.completers = [];
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

    this.selectTab(1);
    let tabControl: TwinPaneTab = this.$refs.twinTabControl as TwinPaneTab;
    if (tabControl && tabControl.singleTabMode())
      this.selectTab(0);

    await this.applyParameters(data);
    // refresh the variables
    this.fhirpathExpressionChangedEvent();
    await this.evaluateFhirPathExpression();
    this.loadingData = false;
  },
    updateNow() {
      this.$forceUpdate();
      this.enableSave = true;
    },
    updateNextTick() {
      this.$nextTick(() => {
        let tabControl: TwinPaneTab = this.$refs.twinTabControl as TwinPaneTab;
        if (tabControl)
          tabControl.$forceUpdate();
        this.$forceUpdate();
      });
    },

    tabChanged(index: number): void {
      // Workaround to refresh the display in the response editor when it is updated while the form is not visible
      // https://github.com/ajaxorg/ace/issues/2497#issuecomment-102633605
      if (index === 0)
      {
        setTimeout(() => {
          if (this.expressionContextEditor) {
            this.expressionContextEditor.resize();
            this.updateNow();
          }
          if (this.expressionEditor) {
            this.expressionEditor.resize();
            this.updateNow();
          }
        });
      }
      if (index === 1)
      {
        setTimeout(() => {
          if (this.resourceJsonEditor) {
            this.resourceJsonEditor.resize();
            this.updateNow();
          }
        });
      }
      if (index === 6)
      {
        setTimeout(() => {
          if (this.debugEditor) {
            var editorHtmlElement: any = this.$refs
              .aceEditorDebug as Element;
            if (editorHtmlElement) {
              console.log("focusing editor");
              editorHtmlElement.focus();
            }
            this.debugEditor.resize();
            this.updateNow();
            console.log("refreshing editor");
          }
        });
      }
    },

    selectTab(tabIndex: number) {
      let tabControl: TwinPaneTab = this.$refs.twinTabControl as TwinPaneTab;
      if (tabControl){
        tabControl.selectTab(tabIndex);
      }
    },

    getCompletions(editor: ace.Ace.Editor, session: ace.Ace.EditSession, pos: any, prefix: any, callback: any): void {
      // console.log('object getCompletions:', prefix, pos);
      let hints = [];

      // check the previous character in the editor to see if it is a $ or a %
      let line = session.getLine(pos.row);
      // console.log('line:', line);
      let index = pos.column - prefix.length;
      // console.log('index:', index);
      if (index >= 0){
        let prevChar = line.charAt(index);
        // console.log('prevChar:', prevChar);
        if (prevChar == '$') {
          // if the previous character is a $ or %, then we are looking for a variable
          // so we don't need to provide any completions
          // console.log('system variables');

          // system variables $this, $index
          hints.push({ value: '$this', score: hints.length });
          hints.push({ value: '$index', score: hints.length });
          callback(null, hints);
          return;
        }
        if (prevChar == '%') {
          // if the previous character is a $ or %, then we are looking for a variable
          // so we don't need to provide any completions
          // console.log('environment variables');

          // environment variables
          hints.push({ value: '%context', score: hints.length, meta: '%context - initial expression context' });
          hints.push({ value: '%resource', score: hints.length, meta: '%resource - contains %context' });
          hints.push({ value: '%rootResource', score: hints.length, meta: '%rootResource - container resource' });
          hints.push({ value: '%ucum', score: hints.length, meta: '%ucum (http://unitsofmeasure.org)' });
          hints.push({ value: '%sct', score: hints.length, meta: '%sct (http://snomed.info/sct)' });
          hints.push({ value: '%loinc', score: hints.length, meta: '%loinc (http://loinc.org)' });
          callback(null, hints);
          return;
        }
      }

      // variables already in the expression context
      for (const key of this.variables.keys()) {
        let hint: any = { value: key, score: hints.length };
        if (this.variables.get(key)?.resourceId)
            hint.meta = this.variables.get(key)?.resourceId;
        hints.push(hint);
      }

      // functions
      for (const key of mapFunctionReferences.keys()) {
        if (key.startsWith(prefix)) {
          let hint: any = { value: key, score: hints.length };
          const title = mapFunctionReferences.get(key)?.title;
          const description = mapFunctionReferences.get(key)?.description;
          const specUrl = mapFunctionReferences.get(key)?.specUrl;
          if (title){
            hint.meta = title;
            hint.docHTML = title;
            if (title.indexOf('()') > 0)
              hint.value += '()';
            else
              hint.value += '(';
          }
          if (description){
            hint.docHTML += '<br/>' + description;
          }
          if (specUrl){
            hint.docHTML += '<br/><a href='+specUrl+' target="_blank">' + specUrl + '</a>';
          }
          hints.push(hint);
        }
      }
      callback(null, hints);
    },
    readParametersFromQuery(): TestFhirpathData {
      let data: TestFhirpathData = {
        expression: this.$route.query.expression as string
      };
      if (this.$route.query.libraryId as string) {
          data.libraryId = this.$route.query.libraryId as string;
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

        if (this.$route.query){
          // iterate all the query parameters and look for variables identified by the prefix "var-"
          for (const [key, value] of Object.entries(this.$route.query)) {
            if (key.startsWith("var-")) {
              const varName = key.substring(4);
              const varValue = value as string;
              data.variables = data.variables ?? [];
              data.variables.push({ name: varName, data: varValue });
            }
          }
          this.$nextTick(async () => {
            for (const variable of this.variables) {
              if (variable[1].data?.startsWith("http://") || variable[1].data?.startsWith("https://")) {
                // if the variable value is a resource reference, download the resource instead
                console.log("Downloading variable: " + variable[0] + " = " + variable[1].data);
                await this.downloadVariableResource(variable[0]);
              }
            }
          });
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
            this.resourceId = `${settings.getFhirServerExamplesUrl()}/${p.exampletype}/example`;
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
            this.resourceJsonEditor?.setValue(JSON.stringify(JSON.parse(resourceJson), null, settings.getTabSpaces()));
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
      this.fhirpathExpressionChangedEvent();
  },
  resetExpression():void {
    if (this.expressionEditor) {
      this.expressionEditor.setValue('');
      this.expressionEditor.clearSelection();
      this.expressionEditor.focus();
    }
    if (this.expressionContextEditor) {
      this.expressionContextEditor.setValue('');
      this.expressionContextEditor.clearSelection();
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
      this.enableSave = true;
      console.log('enable save resourceJSON');
    },
    updateVariableValue(name: string): void{
      const ie: InputEvent = event as InputEvent;
      // console.log(event);
      const value = (ie.currentTarget as any).value;
      const varValue = this.variables.get(name)
      if (varValue && varValue.data !== value){
        varValue.data = value;
        this.updateNextTick();
      }
      else{
        this.variables.set(name, { name:name, data: value });
      }
      this.enableSave = true;
      console.log('enable save update var');
    },

    removeMarker(editor: ace.Ace.Editor | undefined, markerId: number): void {
      if (editor && markerId) {
        editor.session.removeMarker(markerId);
      }
    },

    removeMarkers(editor: ace.Ace.Editor | undefined, markerIds: number[]): void {
      if (editor && markerIds && markerIds.length > 0) {
        for (let markerId of markerIds) {
          editor.session.removeMarker(markerId);
        }
      }
    },

    fhirpathExpressionChangedEvent() {
      // Check the expression to see if there are any variables in there
      const session = this.expressionEditor?.session;
      if (session){
        this.removeMarkers(this.expressionEditor, this.debugExpressionSelectionMarker);
        this.debugExpressionSelectionMarker = [];
        this.debugTracePosition = undefined;
        this.debugTraceData = [];
        this.removeMarkers(this.resourceJsonEditor, this.debugTestResourceSelectionMarker);
        this.debugTestResourceSelectionMarker = [];
        this.removeMarkers(this.resourceJsonEditor, this.debugThisSelectionMarker);
        this.debugThisSelectionMarker = [];

        let ast: fpjsNode | undefined = undefined;
        if (this.selectedEngine.indexOf("fhirpath.js") != -1){
          const astTab2 = this.$refs.astTabComponent2 as ParseTreeTab;
          ast = astTab2?.displayTreeForExpression(this.getContextExpression() ?? '', this.getFhirpathExpression() ?? '');
        }

        // accumulate the variables
        let updatedVariables = new Map<string, any>();

        // check if there are any variables in the AST
        if (ast){
          let varsUsed = GetExternalVariablesUsed(ast);
          for (const varName of varsUsed){
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
        else {
          const count = session.doc.getLength();
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
        }

        this.variables = updatedVariables;
        this.enableSave = true;
        console.log('enable save expr change');
      }
    },
    fhirpathContextExpressionChangedEvent(): void {
      this.enableSave = true;
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
      this.defaultProviderField = settings.getDefaultProviderField();
      this.terminologyServer = settings.getFhirTerminologyServerUrl();
      this.chatEnabled = settings.getOpenAIKey() !== undefined || settings.getOpenAIBasePath() !== undefined;
      this.openAIFeedbackEnabled = settings.getOpenAIFeedbackEnabled();
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
      for (let rd of this.results) {
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

        const jsonValue = this.getResourceJson();
        const astJson: IJsonNode | undefined = parseJson(jsonValue+'');
        console.log("JSON fhir-paths: ", astJson);

        const results = response.data;
        if (results) {
          this.setResultJson(JSON.stringify(results, null, settings.getTabSpaces()));
          if (results.resourceType === 'OperationOutcome')
          {
            this.saveOutcome = results;
            this.showOutcome = true;
            return;
          }
          this.raw = results;

          this.results = [];
          if (this.raw.parameter) {
            for (let entry of this.raw.parameter) {
              if (entry.name === 'parameters'){
                if (entry.part)
                {
                  for (let part of entry.part) {
                    // read the processing engine version
                    if (part.name === 'evaluator'){
                      this.processedByEngine = part.valueString;
                    }
                    if (part.name === 'parseDebugTree' && part.valueString) {
                      let ast: JsonNode = JSON.parse(part.valueString);
                      const astTab = this.$refs.astTabComponent2 as ParseTreeTab;
                      astTab?.displayTree(ast);
                    }
                    if (part.name === 'parseDebugTreeJava' && part.valueString) {
                      // If this was from the JAVA engine, also dump out the data from 
                      // that debug parse tree
                      console.log("JAVA AST", part.valueString);
                    }
                    if (part.name === 'debugOutcome' && part.resource) {
                      this.expressionParseOutcome = part.resource as fhir4b.OperationOutcome;
                    }
                  }
                }
                continue; // skip over the configuration settings
              }

              if (entry.name == 'debug-trace') {
                // Put the trace data into the array
                // context first - so the context switch is visible
                this.debugTraceData.push({ 
                  context: entry.valueString ?? ''
                });

                // values for this context
                for (let part of entry.part ?? []) {
                  let posParts = part.name?.split(',');
                  let exprPosition = posParts && posParts.length > 0 ? parseInt(posParts[0]) : undefined;
                  let exprLength = posParts && posParts.length > 1 ? parseInt(posParts[1]) : undefined;
                  let exprName = posParts && posParts.length > 2 ? posParts[2] : undefined;

                    let debugTraceVal: DebugTraceData = {
                      context: entry.valueString ?? '',
                      exprName: exprName,
                      exprPosition: exprPosition,
                      exprLength: exprLength,
                    values: [],
                    thisVar: [],
                    focusVar: [],
                    };
                  this.debugTraceData.push(debugTraceVal);

                  // grab all the values from this expression node evaluation ($this, $index and result)
                  for (let partValue of part.part ?? []) {
                    if (partValue.name == 'index') {
                      debugTraceVal.index = partValue.valueInteger;
                      continue;
                    }

                    if (partValue.name == 'this-resource-path') {
                      debugTraceVal.thisVar?.push({ resourcePath: partValue.valueString });
                      continue;
                    }

                    if (partValue.name.startsWith('this-')) {
                      const traceValue = getValue(partValue);
                      if (traceValue.length > 0)
                        debugTraceVal.thisVar?.push({ value: JSON.stringify(traceValue[0].value, null, 4) });
                      continue;
                    }

                    if (partValue.name == 'focus-resource-path') {
                      debugTraceVal.focusVar?.push({ resourcePath: partValue.valueString });
                      continue;
                    }

                    if (partValue.name.startsWith('focus-')) {
                      const traceValue = getValue(partValue);
                      if (traceValue.length > 0)
                        debugTraceVal.focusVar?.push({ value: JSON.stringify(traceValue[0].value, null, 4) });
                      continue;
                    }

                    if (partValue.name == 'resource-path') {
                      debugTraceVal.values?.push({ resourcePath: partValue.valueString });
                      continue;
                    
                    }
                      // get the trace value
                      const traceValue = getValue(partValue);
                      if (traceValue) {
                        if (traceValue.length > 0)
                      debugTraceVal.values?.push({ value: JSON.stringify(traceValue[0].value, null, 4) });
                      }
                  
                  }
                }
                continue; // skip over the debug trace
              }

              // Anything else is a result
              // scan over the parts (values)
              if (entry.name == 'result') {
                let resultItem: ResultData = { context: entry.valueString, result: [], trace: [] };
                if (astJson && entry.valueString){
                  const node = findNodeByPath(astJson, entry.valueString);
                  if (node) resultItem.position = node.position;
                }
                if (entry.part) {
                  for (let part of entry.part) {
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
        }
      } catch (err) {
        this.loadingData = false;
        if (axios.isAxiosError(err)) {
          const serverError = err as AxiosError<fhir4b.OperationOutcome>;
          if (serverError && serverError.response) {
            this.setResultJson(JSON.stringify(serverError.response.data, null, settings.getTabSpaces()));
            this.saveOutcome = serverError.response.data;
            this.showOutcome = true;
            return serverError.response.data;
          }
        } else {
          console.log("Client Error:", err);
        }
      }
    },

    async downloadLibrary(libraryId: string): Promise<void> {
      try {
        let url = libraryId;
        if (!libraryId.startsWith('http'))
          url = settings.getFhirServerUrl() + '/Library/' + libraryId;

        if (this.cancelSource) this.cancelSource.cancel("new download started");
        this.cancelSource = axios.CancelToken.source();
        this.loadingData = true;
        let token = this.cancelSource.token;
        let headers = {
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

          // And variables
          var libVariables = getExtensionCodingValues(this.library, "http://fhir.forms-lab.com/StructureDefinition/variable");
          if (libVariables){
            for (let v of libVariables){
              this.variables.set(v.code??'', { name: v.code??'', data: v.display });
            }
          }

          // and test resource IDs
          const rId = getExtensionStringValue(this.library, "http://fhir.forms-lab.com/StructureDefinition/resource-id")
          ?? getExtensionReferenceValue(this.library, "http://fhir.forms-lab.com/StructureDefinition/resource-id")?.reference;
          if (rId) {
            this.resourceId = rId;
            if (this.resourceJsonEditor) {
              this.resourceJsonEditor.setValue('');
              this.resourceJsonChanged = false;
            if (this.resourceId?.startsWith("#") && this.library?.contained){
              var resource: Resource|DomainResource|undefined = undefined;
              var newContained: FhirResource[] = [];
              for (let n=0; n < this.library.contained.length; n++){
                if (rId === "#"+this.library.contained[n].id){
                  resource = this.library.contained[n];
                }
                else {
                  newContained.push(this.library.contained[n])
                }
              }
              if (resource) {
                this.resourceId = undefined;
                if (this.library.contained.length > 1 && resource as DomainResource){
                  (resource as DomainResource).contained = newContained;
                }
                  const resourceJson = JSON.stringify(resource, null, settings.getTabSpaces()); // really should lookup by ID
                  if (resourceJson) {
                    this.resourceJsonEditor.setValue(resourceJson);
                    this.resourceJsonChanged = false;
                  }
                  this.resourceJsonEditor.clearSelection();
                }
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
        this.$nextTick(() => {
          this.enableSave = false;
          console.log('disable save - loaded');
        });
      } catch (err) {
        this.loadingData = false;
        if (axios.isAxiosError(err)) {
          const serverError = err as AxiosError<fhir4b.OperationOutcome>;
          if (serverError && serverError.response) {
            this.setResultJson(JSON.stringify(serverError.response, null, settings.getTabSpaces()));
            if (serverError.response.data?.resourceType == 'OperationOutcome') {
              this.setResultJson(JSON.stringify(serverError.response, null, settings.getTabSpaces()));
              this.saveOutcome = serverError.response.data;
            } else {
              if (serverError.response.status == 404)
                this.saveOutcome = { resourceType: 'OperationOutcome', issue: [] }
              this.saveOutcome?.issue.push({ code: 'not-found', severity: 'error', details: { text: `Library resource ${libraryId} not found` } });
            }
            this.showOutcome = true;
            return;
          }
          this.saveOutcome = CreateOperationOutcome("fatal", "exception", "Server: " + err.message, undefined, err.code);
          this.showOutcome = true;
          return;
        }
        this.saveOutcome = CreateOperationOutcome("fatal", "exception", "Client: " + err);
        this.showOutcome = true;
      }
    },

    reformatTestResource(){
      if (this.resourceJsonEditor){
        const jsonValue = this.resourceJsonEditor.getValue();
        try {
          this.resourceJsonEditor.setValue(JSON.stringify(JSON.parse(jsonValue), null, settings.getTabSpaces()));
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
          url = settings.getFhirServerExamplesUrl() + '/' + this.resourceId;
        
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
        let headers = {
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
            const resourceJson = JSON.stringify(results, null, settings.getTabSpaces());
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
            this.setResultJson(JSON.stringify(serverError.response, null, settings.getTabSpaces()));
            if (serverError.response.data?.resourceType == 'OperationOutcome') {
              this.setResultJson(JSON.stringify(serverError.response, null, settings.getTabSpaces()));
              this.saveOutcome = serverError.response.data;
            } else {
              if (serverError.response.status == 404)
                this.saveOutcome = { resourceType: 'OperationOutcome', issue: [] }
              this.saveOutcome?.issue.push({ code: 'not-found', severity: 'error', details: { text: 'Test resource not found' } });
            }
            this.showOutcome = true;
            return serverError.response.data;
          }
          this.saveOutcome = CreateOperationOutcome("fatal", "exception", "Server: " + err.message, undefined, err.code);
          this.showOutcome = true;
          return;
        }
        this.saveOutcome = CreateOperationOutcome("fatal", "exception", "Client: " + err);
        this.showOutcome = true;
      }
    },

    async downloadVariableResource(name: string) {
      try {
        if (!this.variables.get(name)) return;
        let url = this.variables.get(name)?.resourceId ?? this.variables.get(name)?.data;
        if (url && !url.startsWith('http'))
          url = settings.getFhirServerExamplesUrl() + '/' + url;

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
        let headers = {
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
          this.variables.set(name, { name:name, resourceId: url, data: JSON.stringify(results, null, settings.getTabSpaces())});
          this.updateNextTick();
        }
      } catch (err) {
        this.loadingData = false;
        if (axios.isAxiosError(err)) {
          const serverError = err as AxiosError<fhir4b.OperationOutcome>;
          if (serverError && serverError.response) {
            this.setResultJson(JSON.stringify(serverError.response, null, settings.getTabSpaces()));
            if (serverError.response.data?.resourceType == 'OperationOutcome') {
              this.setResultJson(JSON.stringify(serverError.response, null, settings.getTabSpaces()));
              this.saveOutcome = serverError.response.data;
            } else {
              if (serverError.response.status == 404)
                this.saveOutcome = { resourceType: 'OperationOutcome', issue: [] }
              this.saveOutcome?.issue.push({ code: 'not-found', severity: 'error', details: { text: 'Test resource not found' } });
            }
            this.showOutcome = true;
            return serverError.response.data;
          }
          this.saveOutcome = CreateOperationOutcome("fatal", "exception", "Server: " + err.message, undefined, err.code);
          this.showOutcome = true;
          return;
        }
        this.saveOutcome = CreateOperationOutcome("fatal", "exception", "Client: " + err);
        this.showOutcome = true;
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
      this.selectTab(0);
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

    copySuggestionToClipboard(suggestion: string) {
      console.log('Copied suggestion to clipboard: ', suggestion)
      navigator.clipboard.writeText(suggestion);
    },

    applySuggestedContext(updatedExpression: string): void {
      this.selectTab(0);
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

      let prompt: Array<ChatCompletionMessageParam> = [];
      prompt.push({ role: "system", content: systemPrompt});
      prompt = prompt.concat(chat.getConversationChat());

      const resultOfQuestion = await EvaluateChatPrompt(
          prompt, this.GetAISettings(),
          0, 
          1000);
      this.openAIexpressionExplanationMessage = "(Generated by OpenAI "+settings.getOpenAIModel()+")";
      this.openAIexpressionExplanationLoading = false;
      chat.addMessage("FhirPath AI", resultOfQuestion ?? '', true, settings.getOpenAIModel());
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
            this.saveOutcome = CreateOperationOutcome('fatal', 'exception', err.message);
            this.showOutcome = true;
            return;
          }
        }
      }

      const astJson: IJsonNode | undefined = parseJson(resourceJson+'');

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

      let contextNodes: ResourceNode[] = [];
      let contextTraceOutputFunction = function (x: ResourceNode | ResourceNode[], label: string): ResourceNode | ResourceNode[] {
        if (label === 'fhirpath-lab-context') {
          if (Array.isArray(x)) {
            for (let item of x) {
              contextNodes.push(item);
            }
          } else {
            contextNodes.push(x);
          }
        }
        return x;
      };

      (this as any).$appInsights?.trackEvent({ name: 'evaluate fhirpath.js' });

      const contextExpression = this.getContextExpression();

      if (contextExpression) {
        // scan over each of the expressions
        try {
          this.processedByEngine = `fhirpath.js-`+fhirpath.version+` (r4b)`;
          let optionsContext: AsyncOptions = {
            traceFn: contextTraceOutputFunction,
            async: true,
            terminologyUrl: this.terminologyServer
          };
          let data = fhirpath.evaluate(fhirData, "select(" + contextExpression + ").trace('fhirpath-lab-context')", environment, fhirpath_r4_model, optionsContext);
          if (data instanceof Promise){
            await data;
          }
        }
        catch (err: any) {
          console.log(err);
          if (err.message) {
            this.saveOutcome = CreateOperationOutcome('fatal', 'exception', err.message);
            this.showOutcome = true;
          }
          else {
            this.saveOutcome = CreateOperationOutcome('fatal', 'exception', err);
            this.showOutcome = true;
          }
        }
      }
      else {
        try {
          this.processedByEngine = `fhirpath.js-`+fhirpath.version+` (r4b)`;
          let data = fhirpath.evaluate(fhirData, "%resource", environment, fhirpath_r4_model);
          if (data instanceof Promise)
            contextNodes = await data;
          else 
            contextNodes = data as any[];
        }
        catch (err: any) {
          console.log(err);
          if (err.message) {
            this.saveOutcome = CreateOperationOutcome('fatal', 'exception', err.message);
            this.showOutcome = true;
          }
          else {
            this.saveOutcome = CreateOperationOutcome('fatal', 'exception', err);
            this.showOutcome = true;
          }
        }
      }
      for (let contextNode of contextNodes) {
        let resData: ResultData;
        const index = contextNodes.indexOf(contextNode);
        if (contextExpression){
          resData = { context: `${fullPropertyName(contextNode)}`, result: [], trace: [] };
          if (astJson){
            const node = findNodeByPath(astJson, resData.context+'');
            if (node?.position) resData.position = node.position;
          }
        }
        else
          resData = { result: [], trace: [] };

        let outputNodes: ResourceNode[] = [];
        let tracefunction = function (x: ResourceNode | ResourceNode[], label: string): ResourceNode | ResourceNode[] {
          if (label === 'fhirpath-lab-result') {
            if (Array.isArray(x)) {
              for (let item of x) {
                outputNodes.push(item);
              }
            } else {
              outputNodes.push(x);
            }
            return x;
          }
          if (Array.isArray(x)) {
            for (let item of x) {
              let itemPath: string|undefined = fullPropertyName(item);
              if (typeof item.getTypeInfo === "function") {
                let ti = item.getTypeInfo();
                resData.trace.push({ name: label ?? "", path: itemPath, type: ti.name, value: JSON.stringify(item.data, null, settings.getTabSpaces()) });
              }
              else {
                resData.trace.push({ name: label ?? "", path: itemPath, value: JSON.stringify(item, null, settings.getTabSpaces()) });
              }
            }
          }
          else {
            let itemPath: string|undefined = fullPropertyName(x);
            resData.trace.push({ name: label ?? "", path: itemPath, value: JSON.stringify(x, null, settings.getTabSpaces()) });
          }
          console.log("TRACE3:[" + (label || "") + "]", x);
          return x;
        };

        try {
          let useExpression = this.getFhirpathExpression() ?? '';
          let path = {
            base: resData.context??'', 
            expression: "select(" + useExpression + ").trace('fhirpath-lab-result')"
          }
          let options: AsyncOptions = {
            traceFn: tracefunction,
            async: true,
            terminologyUrl: this.terminologyServer
          };
          let data = fhirpath.evaluate(contextNode, path, environment, fhirpath_r4_model, options);
          let res: any[];
          if (data instanceof Promise)
            res = await data;
          else
            res = data as any[];
          this.results.push(resData);

          for (let item of outputNodes) {
            let typeName = Object.prototype.toString.call(item ?? '').substring(8).replace(']', '')
              if (typeof item.getTypeInfo === "function")
                typeName = item.getTypeInfo().name;
            resData.result.push({ type: typeName, path: fullPropertyName(item), value: item.data ? JSON.stringify(item.data, null, settings.getTabSpaces()) : item });
          }
        }
        catch (err: any) {
          console.log(err);
          if (err.message) {
            this.saveOutcome = CreateOperationOutcome('fatal', 'exception', err.message);
            this.showOutcome = true;
          }
          else{
            this.saveOutcome = CreateOperationOutcome('fatal', 'exception', err);
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
            this.saveOutcome = CreateOperationOutcome('fatal', 'exception', err.message);
            this.showOutcome = true;
          }
          else {
            this.saveOutcome = CreateOperationOutcome('fatal', 'exception', err);
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

      let contextNodes: ResourceNode[] = [];
      let contextTraceOutputFunction = function (x: ResourceNode | ResourceNode[], label: string): ResourceNode | ResourceNode[] {
        if (label === 'fhirpath-lab-context') {
          if (Array.isArray(x)) {
            for (let item of x) {
              contextNodes.push(item);
            }
          } else {
            contextNodes.push(x);
          }
        }
        return x;
      };

      (this as any).$appInsights?.trackEvent({ name: 'evaluate fhirpath.js' });

      const contextExpression = this.getContextExpression();
      if (contextExpression) {
        // scan over each of the expressions
        try {
          this.processedByEngine = `fhirpath.js-`+fhirpath.version+` (r5)`;
          let optionsContext: AsyncOptions = {
            traceFn: contextTraceOutputFunction,
            async: true,
            terminologyUrl: this.terminologyServer
          };
          let data = fhirpath.evaluate(fhirData, "select(" + contextExpression + ").trace('fhirpath-lab-context')", environment, fhirpath_r5_model, optionsContext);
          if (data instanceof Promise) {
            await data;
          }
        }
        catch (err: any) {
          console.log(err);
          if (err.message) {
            this.saveOutcome = CreateOperationOutcome('fatal', 'exception', err.message);
            this.showOutcome = true;
          }
          else {
            this.saveOutcome = CreateOperationOutcome('fatal', 'exception', err);
            this.showOutcome = true;
          }
        }
      }
      else {
        try {
          this.processedByEngine = `fhirpath.js-`+fhirpath.version+` (r5)`;
          let data = fhirpath.evaluate(fhirData, "%resource", environment, fhirpath_r5_model);
          if (data instanceof Promise)
            contextNodes = await data;
          else
            contextNodes = data;
        }
        catch (err: any) {
          console.log(err);
          if (err.message) {
            this.saveOutcome = CreateOperationOutcome('fatal', 'exception', err.message);
            this.showOutcome = true;
          }
          else {
            this.saveOutcome = CreateOperationOutcome('fatal', 'exception', err);
            this.showOutcome = true;
          }
        }
      }
      for (let contextNode of contextNodes) {
        let resData: ResultData;
        const index = contextNodes.indexOf(contextNode);
        if (contextExpression){
          resData = { context: `${fullPropertyName(contextNode)}`, result: [], trace: [] };
          // if (astJson){
          //   const node = findNodeByPath(astJson, resData.context+'');
          //   if (node?.position) resData.position = node.position;
          // }
        }
        else
          resData = { result: [], trace: [] };

        let outputNodes: ResourceNode[] = [];
        let tracefunction = function (x: ResourceNode | ResourceNode[], label: string): ResourceNode | ResourceNode[] {
          if (label === 'fhirpath-lab-result') {
            if (Array.isArray(x)) {
              for (let item of x) {
                outputNodes.push(item);
              }
            } else {
              outputNodes.push(x);
            }
            return x;
          }
          if (Array.isArray(x)) {
            for (let item of x) {
              let itemPath: string|undefined = fullPropertyName(item);
              if (typeof item.getTypeInfo === "function") {
                let ti = item.getTypeInfo();
                resData.trace.push({ name: label ?? "", path: itemPath, type: ti.name, value: JSON.stringify(item.data, null, settings.getTabSpaces()) });
              }
              else {
                resData.trace.push({ name: label ?? "", path: itemPath, value: JSON.stringify(item, null, settings.getTabSpaces()) });
              }
            }
          }
          else {
            let itemPath: string|undefined = fullPropertyName(x);
            resData.trace.push({ name: label ?? "", path: itemPath, value: JSON.stringify(x, null, settings.getTabSpaces()) });
          }
          console.log("TRACE3:[" + (label || "") + "]", x);
          return x;
        };

        try {
          let useExpression = this.getFhirpathExpression() ?? '';
          let path = {
            base: resData.context??'', 
            expression: "select(" + useExpression + ").trace('fhirpath-lab-result')"
          }
          let options: AsyncOptions = {
            traceFn: tracefunction,
            async: true,
            terminologyUrl: this.terminologyServer
          };
          let data = fhirpath.evaluate(contextNode, path, environment, fhirpath_r5_model, options);
          let res: any[];
          if (data instanceof Promise)
            res = await data;
          else
            res = data as any[];
          this.results.push(resData);

          for (let item of outputNodes) {
            let typeName = Object.prototype.toString.call(item ?? '').substring(8).replace(']', '')
              if (typeof item.getTypeInfo === "function")
                typeName = item.getTypeInfo().name;
            resData.result.push({ type: typeName, path: fullPropertyName(item), value: item.data ? JSON.stringify(item.data, null, settings.getTabSpaces()) : item });
          }
        }
        catch (err: any) {
          console.log(err);
          if (err.message) {
            this.saveOutcome = CreateOperationOutcome('fatal', 'exception', err.message);
            this.showOutcome = true;
          }
          else {
            this.saveOutcome = CreateOperationOutcome('fatal', 'exception', err);
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
          shareUrl += `&resource=${encodeURIComponent(settings.getFhirServerExamplesUrl() + '/' + this.resourceId)}`;
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

    createNewLibrary(){
      if (!this.getFhirpathExpression())
        return;

      const newName = settings.createRandomID();
      this.library = {
        resourceType: "Library",
        name: newName.replace('-','_'),
        status: "draft",
        type: {
          coding: [
            {
              system: "http://terminology.hl7.org/CodeSystem/library-type",
              code: "logic-library",
              display: "Logic Library",
            },
          ],
        },
        useContext: [
          {
            code: {
              system: "http://terminology.hl7.org/CodeSystem/usage-context-type",
              code: "user",
              display: "User Type"
            },
            valueCodeableConcept: {
              coding: [
                {
                  code: "fhirpath-lab",
                  display: "FHIRPath Lab Shared"
                }
              ]
            }
          }
        ],
        content: [
          {
            contentType: "text/fhirpath",
            data: window.btoa(this.getFhirpathExpression()??'')
          }
        ],
        publisher: settings.getDefaultProviderField(),
        url: settings.getDefaultNewCanonicalBase() + "/Library/" + newName,
        version: '0.1',
      }
      this.selectTab(7);
      this.enableSave = true;
      this.$nextTick(() => {
        const detailsTab = this.$refs.libDetailsTabComponent as any;
        if (detailsTab)
          detailsTab.$el.focus();
      });
    },

    async saveLibrary(){
      if (this.library){
        // update the library, then save it!
        this.loadingData = true;
        // Set the base expression
        if (this.library.content && this.library.content.length > 0)
        {
          this.library.content[0].data = window.btoa(this.getFhirpathExpression()??'');
        }
        else
        {
          this.library.content = [
            {
              contentType: "text/fhirpath",
              data: window.btoa(this.getFhirpathExpression()??'')
            }
          ];
        }

        // Set the context expression
        const contextExpression = this.getContextExpression();
        if (contextExpression)
          setExtensionStringValue(this.library, "http://fhir.forms-lab.com/StructureDefinition/context-expression", contextExpression);
        else
          clearExtension(this.library, "http://fhir.forms-lab.com/StructureDefinition/context-expression");

        // set the resource content
        const resourceJson = this.getResourceJson();
        if (resourceJson && this.resourceJsonChanged)
        {
          const jsonObject = JSON.parse(resourceJson);
          if (!jsonObject.id)
            jsonObject.id = settings.createRandomID();
          setExtension(this.library, 
          {
            url: "http://fhir.forms-lab.com/StructureDefinition/resource-id", 
            valueReference: { reference: "#" + jsonObject.id }
          });
          if (jsonObject.contained){
            this.library.contained = jsonObject.contained;
            delete jsonObject.contained;
          } else {
            this.library.contained = [];
          }
          this.library.contained?.push(jsonObject);
        }
        else
        {
          // set the resource ID
          if (this.resourceId)
            setExtensionStringValue(this.library, "http://fhir.forms-lab.com/StructureDefinition/resource-id", this.resourceId);
          else
            clearExtension(this.library, "http://fhir.forms-lab.com/StructureDefinition/resource-id");
        }

        // set the variables included
        clearExtension(this.library, "http://fhir.forms-lab.com/StructureDefinition/variable");
        for (let v of this.variables) {
          let value = v[1].data;
          var ev = addExtension(this.library, {
            url: "http://fhir.forms-lab.com/StructureDefinition/variable", 
            valueCoding: {
               code: v[1].name,
               display: value
               }
          });
        }

        // now save the content
        var data: LibraryData = {
          raw: this.library,
          publishedVersions: [],
          ...BaseResource_defaultValues,
        }

        const outcome = await saveFhirResource(settings.getFhirServerUrl(), data);
        this.loadingData = false;
        console.log(outcome);
        if (data.raw && !outcome)
        {
          this.library = data.raw;
          this.enableSave = false;
        }
        if (outcome) {
          this.saveOutcome = outcome;
          this.showOutcome = true;
          if (this.raw?.id) {
            if (this.$route.params.id.endsWith(":new")) {
              let href = this.$route.fullPath.replaceAll(
                this.$route.params.id,
                this.raw?.id
              );
              window.history.pushState({}, "", href);
            }
          }
        }
      }
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
        for (const v of this.variables) {
          data.variables?.push(v[1]);
        }
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
      this.removeMarkers(this.resourceJsonEditor, this.debugTestResourceSelectionMarker);
      this.debugTestResourceSelectionMarker = [];
      this.removeMarkers(this.resourceJsonEditor, this.debugThisSelectionMarker);
      this.debugThisSelectionMarker = [];
      this.removeMarkers(this.expressionEditor, this.debugExpressionSelectionMarker);
      this.debugExpressionSelectionMarker = [];
      this.debugTracePosition = undefined;
      this.debugTraceData = [];

      // Validate the test fhir resource object
      let resourceJson = this.getResourceJson();
       if (resourceJson) {
         let rawObj: object;
         try {
           rawObj = JSON.parse(resourceJson)
      //     let resource: fhir.FhirResource | null = fhir.resourceFactory(rawObj);
      //     if (resource) {
      //       const issues: fhir.FtsIssue[] = resource.doModelValidation();
      //       if (issues.length !== 0) {
      //         this.saveOutcome = { resourceType: 'OperationOutcome', issue: [] }
      //         this.saveOutcome?.issue.push(...issues as any);
      //         this.showOutcome = true;
      //       }
      //     }
         } catch (err) {
           console.log(err);
           this.saveOutcome = { resourceType: 'OperationOutcome', issue: [] }
           this.saveOutcome?.issue.push({ code: 'exception', severity: 'error', details: { text: `Failed to parse the resource: ${err}` } });
           this.showOutcome = true;
           this.loadingData = false;
          return;
        }
      }

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
      let p: fhir4b.Parameters = { resourceType: "Parameters", parameter: [{ name: "expression", valueString: this.getFhirpathExpression() ?? '' }] };

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

        if (!this.getResourceJson() && this.resourceId) {
          await this.downloadTestResource();
          resourceJson = this.getResourceJson();        
        }

        (this as any).$appInsights?.trackEvent({ name: 'evaluate HAPI' });
      }
      else if (this.selectedEngine == "java (IBM)") {
        url = settings.ibm_server_r4b();
        astTab2?.clearDisplay("AST not supported");
        if (!this.getResourceJson() && this.resourceId) {
          await this.downloadTestResource();
          resourceJson = this.getResourceJson();        
        }

        (this as any).$appInsights?.trackEvent({ name: 'evaluate IBM' });
      }
      else if (this.selectedEngine == "fhirpath-py (Beda Software)") {
        url = settings.python_server_r4b();
        astTab2?.clearDisplay("AST not supported");
        if (!this.getResourceJson() && this.resourceId) {
          await this.downloadTestResource();
          resourceJson = this.getResourceJson();
        }
        (this as any).$appInsights?.trackEvent({ name: 'evaluate Python' });
      }
      else if (this.selectedEngine == "Aidbox (Health Samurai)") {
        url = settings.clojure_server_r4();
        astTab2?.clearDisplay("AST not supported");
        if (!this.getResourceJson() && this.resourceId) {
          await this.downloadTestResource();
          resourceJson = this.getResourceJson();
        }
        (this as any).$appInsights?.trackEvent({ name: 'evaluate Aidbox' });
      }
      else if (this.selectedEngine == "Aidbox (Health Samurai-R5)") {
        url = settings.clojure_server_r5();
        astTab2?.clearDisplay("AST not supported");
        if (!this.getResourceJson() && this.resourceId) {
          await this.downloadTestResource();
          resourceJson = this.getResourceJson();
        }
        (this as any).$appInsights?.trackEvent({ name: 'evaluate Aidbox' });
      }
      else {
        (this as any).$appInsights?.trackEvent({ name: 'evaluate FirelySDK' });
      }

      if (resourceJson) {
        p.parameter?.push({ name: "resource", resource: JSON.parse(resourceJson) });
      }
      else {
        if (!this.resourceId?.startsWith('http')) {
          p.parameter?.push({ name: "resource", valueString: settings.getFhirServerExamplesUrl() + '/' + this.resourceId });
        }
        else {
          p.parameter?.push({ name: "resource", valueString: this.resourceId });
        }
      }

      if (this.terminologyServer) {
        p.parameter?.push({ name: "terminologyserver", valueString: this.terminologyServer });
      }
      if (this.showAdvancedSettings) {
        // add the debug parameter to check the expression
        // works well enough to always ask now.
        p.parameter?.push({ name: "debug_trace", valueBoolean: true });
      }
      else {
        // if not showing advanced settings, then don't ask for debug info
        p.parameter = p.parameter?.filter(p => p.name !== 'debug');
      }
      await this.executeRequest(url, p);

      // if there are any results with a trace, then set the trace position at the start
      if (this.debugTraceData.length > 0) {
        this.debugTracePosition = 0;
      }

      // Set focus to the control that previously had focus (if was known)
      if (this.prevFocus){
          this.prevFocus.focus();
        }
    },

    highlightText(editor?: ace.Ace.Editor, startPosition?: number, length?: number, debugMode?: boolean): void {
      if (debugMode){
        this.removeMarkers(editor, this.debugExpressionSelectionMarker);
        this.debugExpressionSelectionMarker = [];
      }

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
        const selectionMarker = editor.session.addMarker(range, "debugSelection", "text", false);
        this.debugExpressionSelectionMarker?.push(selectionMarker);
      }
      else {
      const selectionMarker = editor.session.addMarker(range, "resultSelection", "text", true);
      // after 1.5 seconds remove the highlight.
      setTimeout(() => {
        editor.session.removeMarker(selectionMarker);
      }, 1500);
      }
      this.updateNow();
    },

    highlightTextByLine(editor?: ace.Ace.Editor, startLine?: number, startColumn? : number, length?: number): void {
      if (!editor || startColumn == undefined || startLine == undefined || length == undefined) return;

      // determining the ending line/column from the length of the selected text
      // console.log(startLine, startColumn, length);
      let lines = editor.getValue().split(/\r\n|\r|\n/);
      // console.log('allLines', lines);
      let selectedText = lines[startLine-1].substring(startColumn-1);
      if (selectedText.length > length) {
        selectedText = selectedText.substring(0, length);
      }
      // console.log('first part', selectedText);
      let endLine = startLine;
      let endColumn = startColumn + selectedText.length;
      if (selectedText.length < length) {
        // there is text on other following lines
        for (let i = startLine; i < lines.length; i++){
          endLine++;
          if (lines[i].length + selectedText.length == length) {
            selectedText += lines[i];
            endColumn = lines[i].length;
            break;
          }
          if (lines[i].length + selectedText.length > length) {
            // only need the substring of the line
            endColumn = length - selectedText.length + lines[i].length;
            selectedText += lines[i].substring(0, endColumn);
            break;
          }
          selectedText += lines[i];
        }
      }

      // determine the starting line/column from the raw position in the string
      // console.log("Highlighting: ", selectedText);
      
      const range = new ace.Range(startLine-1, startColumn-1, endLine-1, endColumn-1);
      // console.log("Range: ", range);
      
      editor.clearSelection();
      editor.focus();
      editor.gotoLine(startLine, startColumn-1, true);
      // editor.selection.setRange(range);

      const selectionMarker = editor.session.addMarker(range, "resultSelection", "text", true);
      // after 1.5 seconds remove the highlight.
      setTimeout(() => {
        // console.log("Removing marker", selectionMarker);
        editor.session.removeMarker(selectionMarker);
      }, 1500);
      this.updateNow();
    },

    navigateToExpressionNode(node: JsonNode){
      // Move the cursor in the test resource JSON editor to the element
      this.selectTab(0);
      setTimeout(() => {
        console.log("Highlighting node: ", node);
        if (node.Position == undefined && node.Line != undefined) {
          // Calculate the start Position based on the line in the text 
          node.Length = node.Name.length;
          this.highlightTextByLine(this.expressionEditor, node.Line, node.Column, node.Length);
          return;
        }
        this.highlightText(this.expressionEditor, node.Position, node.Length);
      });
    },

    navigateToContext(elementPath: string, variableName?: string, debugMode?: boolean) {
      // Move the cursor in the test resource JSON editor to the element
      this.selectTab(1);
      setTimeout(() => {
        const jsonValue = this.getResourceJson();
        if (this.resourceJsonEditor && jsonValue) {
          // Select the model to use, r5 or r4b
          let modelInfo = fhirpath_r4_model;
          if (this.selectedEngine.indexOf("R5") > -1) {
            modelInfo = fhirpath_r5_model;
          }
          // console.log("Using "+modelInfo.version+" model for navigation");
          var ast: IJsonNode | undefined = parseJson(jsonValue, modelInfo);
          console.log(ast);
          if (ast) {
              var node = findNodeByPath(ast, elementPath);
              if (node) {
                // inject the position information onto the issue
                // so that UI can use it
                this.resourceJsonEditor.clearSelection();
                if (node.position) {
                  this.resourceJsonEditor.focus();
                  this.resourceJsonEditor.gotoLine(
                    node.position.line,
                    node.position.column,
                    true
                  );

                  if (node.position.value_stop_pos) {
                    let substr = jsonValue.substring(node.position.prop_start_pos, node.position.value_stop_pos+1);
                    const endRowOffset = substr.split(/\r\n|\r|\n/).length;
                    const endRow = node.position.line + endRowOffset - 1;
                    const endCollOffset = substr.split(/\r\n|\r|\n/)[endRowOffset - 1].length;
                    const endCol = node.position.column + (endCollOffset > 1 ? endCollOffset + 1 : endCollOffset);
                    const range = new ace.Range(node.position.line-1, node.position.column, endRow-1, endCol);
                    console.log("context", range);

                    if (debugMode) {
                      const selectionMarker = this.resourceJsonEditor.session.addMarker(range, "debugSelection", "text", false);
                      this.debugTestResourceSelectionMarker?.push(selectionMarker);
                    }
                    else {
                    const selectionMarker = this.resourceJsonEditor.session.addMarker(range, "resultSelection", "fullLine", true);
                    // after 1.5 seconds remove the highlight.
                    setTimeout(() => {
                      this.resourceJsonEditor?.session.removeMarker(selectionMarker);
                    }, 1500);
                    }                   
                  } else if (node.position.prop_stop_pos) {
                    // prop based stuff
                    let substr = jsonValue.substring(node.position.prop_start_pos, node.position.prop_stop_pos+1);
                    const endRowOffset = substr.split(/\r\n|\r|\n/).length;
                    const endRow = node.position.line + endRowOffset - 1;
                    const endCollOffset = substr.split(/\r\n|\r|\n/)[endRowOffset - 1].length;
                    const endCol = node.position.column + (endCollOffset > 1 ? endCollOffset + 1 : endCollOffset);
                    const range = new ace.Range(node.position.line-1, node.position.column, endRow-1, endCol);
                    console.log("context prop", range);

                    if (debugMode) {
                      const selectionMarker = this.resourceJsonEditor.session.addMarker(range, "debugSelection", "text", false);
                      this.debugTestResourceSelectionMarker?.push(selectionMarker);
                    }
                    else {
                      const selectionMarker = this.resourceJsonEditor.session.addMarker(range, "resultSelection", "fullLine", true);
                      // after 1.5 seconds remove the highlight.
                      setTimeout(() => {
                        this.resourceJsonEditor?.session.removeMarker(selectionMarker);
                      }, 1500);
                    }                   
                  }
                  this.updateNow();
                }
              }
            }
        }

        // If this is a variable name, then also see if it is a debug based one that has
        // the trailing expression position information (pos length)
        if (variableName && variableName.startsWith("internal_debug_value:")) {
          // this is a debug variable, so highlight the position "name: (pos length)" using a regex
          variableName = variableName.replace('internal_debug_value: (', '').replace(')', '');
          const parts = variableName.split(' ');
          if (parts.length == 2) {
            const position = parseInt(parts[0]);
            const length = parseInt(parts[1]);
            this.highlightText(this.expressionEditor, position, length);
            }
        }
      });

    },
  },
  data(): FhirPathData {
    return {
      prevFocus: null,
      library: undefined,
      raw: undefined,
      resourceId: undefined,
      resourceType: 'Patient',
      resourceJsonChanged: false,
      loadingData: true,
      saveOutcome: undefined,
      showOutcome: false,
      showAdvancedSettings: false,
      defaultProviderField: undefined,
      terminologyServer: 'https://sqlonfhir-r4.azurewebsites.net/fhir',
      results: [],
      selectedEngine: "fhirpath.js",
      executionEngines: [
        ".NET (firely)",
        "fhirpath.js",
        "java (HAPI)",
        "java (IBM)",
        "fhirpath-py (Beda Software)",
        "Aidbox (Health Samurai)",
        ".NET (firely-R5)",
        "fhirpath.js (R5)",
        "java (HAPI-R5)",
        "Aidbox (Health Samurai-R5)",
      ],
      externalExecutionEngines: [
        "fhirpath-py (Beda Software)",
        "Aidbox (Health Samurai)",
        "Aidbox (Health Samurai-R5)",
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
      openAIFeedbackEnabled: false,
      showChat: false,
      chatEnabled: false,
      openAILastContext: "",
      expressionParseOutcome: undefined,
      astInverted: true,
      enableSave: false,
      debugTracePosition: undefined,
      debugTraceData: [],
      debugExpressionSelectionMarker: [],
      debugTestResourceSelectionMarker: [],
      debugThisSelectionMarker: [],
    };
  },
});
</script>
