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
          <v-select dark class="engineselector" :items="executionEngines" v-model="selectedEngine" hide-details="auto"
            @change="evaluateFhirPathExpression" />
      </template>
    </HeaderNavbar>
    <table-loading v-if="loadingData" />
 
    <div class="container-fluid bd-layout" style="padding-top: 16px">
      <v-card>
        <twin-pane-tab :tabs="tabDetails" ref="twinTabControl" @mounted="twinPaneMounted" @change="tabChanged">
          <template v-slot:Map>
            <v-text-field label="StructureMap Id" v-model="structureMapId" hide-details="auto" autocomplete="off" @input="updateNow"
                          autocorrect="off" autocapitalize="off" spellcheck="false">
              <template v-slot:append>
                <v-btn icon small tile @click="structureMapId = undefined">
                  <v-icon> mdi-close </v-icon>
                </v-btn>
                <v-btn icon small tile @click="downloadStructureMapResource">
                  <v-icon> mdi-download </v-icon>
                </v-btn>
                <!-- <v-btn small icon tile @click="reformatTestResource"><v-icon title="Format json" dark> mdi-format-indent-increase </v-icon></v-btn> -->
                <v-btn small icon tile @click="validateMap"><v-icon title="Validate FML"> mdi-note-check-outline </v-icon></v-btn>
              </template>
            </v-text-field>

            <label class="v-label theme--light bare-label">FHIR Map</label>
            <div class="resource" ref="aceEditorExpression"></div>
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

          <template v-slot:Trace>
            <div class="ct-header">
              <v-icon left dark> mdi-format-list-bulleted </v-icon>
                Trace / Debug
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
          </template>

          <template v-slot:Output>
            <div class="ct-header">
              <v-icon left dark> mdi-file-document-outline </v-icon>
              <span>Results <span class="processedBy">{{ processedByEngine }}</span></span>
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
          </template>

          <template v-slot:AI_Chat>
            <Chat class="chat" ref="chatComponent" 
              feature="FHIRPathTester"
              :openAIFeedbackEnabled="false"
              :suggestionsWhenEmpty="chatPromptOptionsWhenEmpty"
              :suggestions="chatPromptOptions"
              :publisher="defaultProviderField"
              @remove-suggestion="removeSuggestion"
              @send-message="handleSendMessage" 
              @reset-conversation="resetConversation"
              @apply-suggested-context="copySuggestionToClipboard"
              @apply-suggested-expression="copySuggestionToClipboard"
              @apply-suggested-questionnaire="copySuggestionToClipboard"
              @apply-suggested-item="copySuggestionToClipboard"
              @apply-suggested-fhir="copySuggestionToClipboard"
              @apply-suggested-json="copySuggestionToClipboard"
              @apply-suggested-fsh="copySuggestionToClipboard"
              @apply-suggested-jsonpatch="copySuggestionToClipboard"
              />
          </template>

          <template v-slot:Debug>
            <div class="ct-header">
              <v-icon left dark> mdi-bug-outline </v-icon>
              DEBUG
            </div>
            <div class="debug" ref="aceEditorDebug"></div>
          </template>

          <template v-slot:Errors>
            <OperationOutcomePanel :outcome="saveOutcome" @close="saveOutcome = undefined" 
             @help-with-issue="helpWithIssue" />
          </template>

        </twin-pane-tab>
      </v-card>

      <br />
      <OperationOutcomeOverlay style="z-index: 8" v-if="showOutcome" :saveOutcome="saveOutcome" :showOutcome="showOutcome" title="Error"
        @close="clearOutcome" />
    </div>


    <FileSelectorOverlay :visible="showMapSelector" iconName="mdi-clipboard-text-outline" title="Select Map" :initialFilename="structureMapId"
        @download="downloadStructureMapResourceFromSelector"
        @close="showMapSelector=false" />
    <FileSelectorOverlay :visible="showResourceSelector" iconName="mdi-function-variant" title="Select Test Resource" :initialFilename="resourceId"
        @download="downloadTestResourceFromSelector"
        @close="showResourceSelector=false" />
    
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
.engineselector {
  padding-left: 6px;
  max-width: 18ch;
}

@media (max-width: 600px) {

  .newlayout > div {
    min-height: 20vh;
    max-height: 75vh
  };

  .ct-debug {
    display: none !important;
    grid-column-end: 2 !important;
  }
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
import { getExtensionStringValue } from "fhir-extension-helpers";
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

import { parseFML } from "~/helpers/fml_parser";

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

const shareTooltipText = 'Copy a sharable link to this test expression';
const shareZulipTooltipText = 'Copy a sharable link for Zulip to this test expression';

interface FhirMapData {
  prevFocus?: any;
  raw?: fhir4b.Parameters;
  defaultProviderField?: string;
  structureMapId?: string;
  resourceId?: string;
  resourceJsonChanged: boolean;
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
  selectedEngine: string;
  executionEngines: string[];
  expressionEditor?: ace.Ace.Editor;
  expressionContextEditor?: ace.Ace.Editor;
  debugEditor?: ace.Ace.Editor;
  resourceJsonEditor?: ace.Ace.Editor;
  processedByEngine?: string;
  openAILastContext: string;
  openAIexpressionExplanationLoading: boolean;
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

function getValue(entry: fhir4b.ParametersParameter): ResultData | undefined {
  var myMap = new Map(Object.entries(entry));
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
  // components: {
  // },
  // head: {
  //   title: "FhirPathTester",
  // },
  async mounted() {
    setAcePaths(ace.config);
    this.defaultProviderField = settings.getDefaultProviderField();
    this.showAdvancedSettings = settings.showAdvancedSettings();

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
          tabName: "Resource",
          tabHeaderName: "Test Resource",
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
          show: true,
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
      var promptOptions = [];
      if (this.helpWithError) {
        promptOptions.push(this.helpWithError);
      }
      return promptOptions;
    },
  },
  methods: {
    async twinPaneMounted(): Promise<void> {
    },

    tabChanged(index: Number): void {
      // Workaround to refresh the display in the response editor when it is updated while the form is not visible
      // https://github.com/ajaxorg/ace/issues/2497#issuecomment-102633605
      if (index === 0)
      {
        setTimeout(() => {
          // expressionEditor: undefined,
          // expressionContextEditor: undefined,
          // debugEditor: undefined,
          // resourceJsonEditor: undefined,

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
    
    updateNow() {
      this.$forceUpdate();
    },

    selectTab(tabIndex: number) {
      let tabControl: TwinPaneTab = this.$refs.twinTabControl as TwinPaneTab;
      if (tabControl){
        tabControl.selectTab(tabIndex);
      }
    },

    helpWithIssue(issue: fhir4b.OperationOutcomeIssue) {
      console.log("Help me with: ", issue);
      var issueText =
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
        var fmlValue = this.expressionEditor.getValue();
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
      chat.addMessage(
        "FhirPath AI",
        resultOfQuestion ?? "",
        true,
        settings.getOpenAIModel()
      );
      chat.setThinking(false);
    },

    navigateToContext(elementPath: string) {
      // Move the cursor in the test resource JSON editor to the element
      this.selectTab(1);
      setTimeout(() => {
        const jsonValue = this.getResourceJson();
        if (this.resourceJsonEditor && jsonValue) {
          var ast: IJsonNode | undefined = parseJson(jsonValue);
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

                  if (node.position.value_stop_pos){
                    let substr = jsonValue.substring(node.position.prop_start_pos, node.position.value_stop_pos+1);
                    const endRowOffset = substr.split(/\r\n|\r|\n/).length;
                    const endRow = node.position.line + endRowOffset - 1;
                    const endCollOffset = substr.split(/\r\n|\r|\n/)[endRowOffset - 1].length;
                    const endCol = node.position.column + (endCollOffset > 1 ? endCollOffset + 1 : endCollOffset);
                    const range = new ace.Range(node.position.line-1, node.position.column, endRow-1, endCol);

                    const selectionMarker = this.resourceJsonEditor.session.addMarker(range, "resultSelection", "fullLine", true);
                    // after 1.5 seconds remove the highlight.
                    setTimeout(() => {
                      this.resourceJsonEditor?.session.removeMarker(selectionMarker);
                    }, 1500);
                  }
                  this.updateNow();
                }
              }
            }
        }
      });

    },

    readParametersFromQuery(): TestFhirMapData {
      // Umm, maybe use parameters that are more appropriate here, and consider a better way to handle this
      // Ilya was looking for it for his training usage - so likely others too.
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
      this.defaultProviderField = settings.getDefaultProviderField();
      this.showAdvancedSettings = settings.showAdvancedSettings();
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

    removeSuggestion(suggestion: string): void {
      console.log("remove suggestion: " + suggestion);
      this.helpWithError = undefined;
    },

    validateMap(){
      if (this.expressionEditor) {
        const fmlText = this.expressionEditor.getValue();
        let tree = parseFML(fmlText);
        this.helpWithError = undefined;
        const errOutcome = tree as fhir4b.OperationOutcome;
        if (errOutcome && errOutcome.resourceType === "OperationOutcome") {
          this.saveOutcome = errOutcome;
          this.showOutcome = true;
          this.setResultJson(JSON.stringify(errOutcome, null, 4));

          // and grab the first item to send to the chat AI
          const priorityIssue = getPriorityIssue(this.saveOutcome.issue);
          if (priorityIssue) {
            this.helpWithIssue(priorityIssue);
          }
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

    setResultJson(result: string) {
      if (this.debugEditor) {
        this.debugEditor.setValue(result);
        this.debugEditor.clearSelection();
        this.debugEditor.renderer.updateFull(true);
      }
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

    async downloadTestResourceFromSelector(args: string) {
      this.resourceId = args;
      await this.downloadTestResource();
      this.showResourceSelector = false;
    },

    async downloadTestResource() {
      try {
        if (!this.resourceId) return;
        let url = this.resourceId;
        if (this.resourceId && !this.resourceId.startsWith('http'))
          url = settings.getFhirServerExamplesUrl() + '/' + this.resourceId;

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
        } else {
          console.log("Client Error:", err);
        }
      }
    },

    async downloadStructureMapResourceFromSelector(args: string) {
      this.structureMapId = args;
      await this.downloadStructureMapResource();
      this.showMapSelector = false;
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

      let resourceJson = this.getResourceJson();

      // brianpos hosted service
      // default the firely SDK/brianpos service
      // Source code for this is at https://github.com/brianpos/fhirpath-lab-dotnet
      let url = settings.mapper_server();

      let p: fhir4b.Parameters = {
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

      if (this.selectedEngine == "java (HAPI)") {
        url = settings.mapper_server_java();

        if (!this.getResourceJson() && this.resourceId) {
          await this.downloadTestResource();
          resourceJson = this.getResourceJson();
        }

        (this as any).$appInsights?.trackEvent({ name: 'evaluate HAPI (map)' });
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
      defaultProviderField: undefined,
      structureMapId: undefined,
      resourceId: 'Patient/example',
      resourceJsonChanged: false,
      loadingData: true,
      saveOutcome: undefined,
      showOutcome: false,
      helpWithError: undefined,
      showMapSelector: false,
      showResourceSelector: false,
      showAdvancedSettings: false,
      results: undefined,
      openAILastContext: "",
      openAIexpressionExplanationLoading: false,
      trace: [],
      selectedEngine: ".NET (brianpos)",
      executionEngines: [
        ".NET (brianpos)",
        "java (HAPI)"
      ],
      processedByEngine: undefined,
      expressionEditor: undefined,
      expressionContextEditor: undefined,
      debugEditor: undefined,
      resourceJsonEditor: undefined,
    };
  },
});
</script>
