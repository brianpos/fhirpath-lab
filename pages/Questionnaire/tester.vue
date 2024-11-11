<template>
  <div :class="raw && raw.status === 'draft'
    ? 'draft-page-background'
    : raw && raw.status === 'active'
      ? 'active-page-background'
      : raw && raw.status === 'retired'
        ? 'retired-page-background'
        : ''
    ">
    <HeaderNavbar
      :favourites="isFavourite"
      :toggleFavourite="toggleFavourite"
      @close-settings="settingsClosed"
    />

    <div class="container-fluid bd-layout" style="padding-top: 80px">
      <v-card>
        <v-toolbar flat color="primary">
          <v-toolbar-title v-if="raw"><span v-text="raw.title" /> (<span v-text="raw.status" />)<span
              v-if="raw.version">
              - {{ raw.version }}</span></v-toolbar-title>
          <v-spacer />
          <v-btn v-if="canSave && !readonly" icon dark :title="saveTooltip">
            <v-icon @click="saveData" :disabled="saving">
              mdi-content-save
            </v-icon>
          </v-btn>
          <v-btn v-if="hasPrePop" icon dark title="Prepopulate the QuestionnaireResponse with the test data" @click="prePopulateForm">
            <v-icon> mdi-tray-arrow-down </v-icon>
          </v-btn>
          <v-btn v-if="hasExtract" icon dark title="Extract form data to FHIR Resources" @click="extractFormData">
            <v-icon> mdi-tray-arrow-up </v-icon>
          </v-btn>
          <v-btn icon dark title="Show Details, Publishing and other informational tabs"
            @click="showDetails = !showDetails">
            <v-icon v-if="!showDetails"> mdi-eye-off-outline </v-icon>
            <v-icon v-if="showDetails"> mdi-eye-outline </v-icon>
          </v-btn>
        </v-toolbar>

        <twin-pane-tab :tabs="tabDetails" @change="tabChanged" :eager="true" ref="twinTabControl"
          @mounted="twinPaneMounted">
          <template v-slot:Questionnaire>
            <v-text-field style="flex-grow: 0;" label="Test Resource Id" v-model="resourceId" hide-details="auto" autocomplete="off"
              @input="updateNow" autocorrect="off" autocapitalize="off" spellcheck="false" :title="'Resource Id to download from the examples server\r\nAbsolute (requires CORS support) or relative to ' +
                exampleServerUrl
                ">
              <template v-slot:append>
                <v-btn icon small tile v-show="resourceId" @click="resourceId = undefined"
                  title="Clear Test Resource ID">
                  <v-icon> mdi-close </v-icon>
                </v-btn>
                <v-btn icon small tile :disabled="resourceId === undefined" @click="downloadTestResource"
                  :title="downloadTestResourceButtonTitle">
                  <v-icon> mdi-download </v-icon>
                </v-btn>
                <v-btn small icon tile @click="reformatTestResource"><v-icon
                    title="Re-format the Questionnaire json below" dark>
                    mdi-format-indent-increase
                  </v-icon></v-btn>
                <v-btn small icon tile @click="validateQuestionnaire"><v-icon
                    title="Validate the below Questionnaire json using the fhirpath-lab server" dark>
                    mdi-note-check-outline
                  </v-icon>
                </v-btn>
              </template>
            </v-text-field>
            <br />
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn class="resetButton" icon v-bind="attrs" v-on="on"
                  @click="resetQuestionnaire"><v-icon>mdi-broom</v-icon></v-btn>
              </template>
              <span>Reset Questionnaire definition</span>
            </v-tooltip>
            <div class="resource" style="flex-grow: 1;" width="100%" ref="aceEditorResourceJsonTab"></div>
          </template>

          <template v-slot:Debug>
            <label>Validation Results:</label>
            <OperationOutcomePanel :outcome="saveOutcome" title="Error Saving"
              issueLinkTitle="Goto issue in Questionnaire" @close="clearOutcome2" @help-with-issue="helpWithIssue"
              @navigate-to-issue="navigateToIssue" />
          </template>

          <template v-slot:Details>
            <!-- Details -->
            <conformance-resource-details-tab v-if="raw" :raw="raw" :hideHeader="true" :readonly="readonly"
              :showAdvancedSettings="showAdvancedSettings" @update="updateNow" />
          </template>

          <template v-slot:Publishing>
            <!-- Publishing -->
            <conformance-resource-publishing-tab v-if="raw" :raw="raw" :hideHeader="true"
              :publishedVersions="publishedVersions" :lockPublisher="false" :readonly="readonly"
              :showAdvancedSettings="showAdvancedSettings"
              :navigationLinkPrefix="'tester?id=' + fhirServerUrl + '/Questionnaire/'" @update="updateNow" />
          </template>

          <template v-slot:Fields>
            <EditorFieldsSection v-if="raw" v-bind:items="flatModel" :readonly="readonly"
              :showAdvancedSettings="showAdvancedSettings" @highlight-path="highlightPath" />
          </template>

          <template v-slot:Context>
            <!-- Context -->
            <QuestionnaireContext v-if="raw" :questionnaire="raw" @context-changed="contextChanged" :context="contextData"
              :dataServer="dataServerBaseUrl" @ChangeDataServer="updateDataServerBaseUrl" 
            />
          </template>

          <template v-slot:Pre-Population>
            <EditorPrePopulationSection v-if="raw" @highlight-path="highlightPath" v-bind:items="flatModel" @outcome="displayExtractOutcome"/>
          </template>

          <template v-slot:Variables>
            <EditorVariablesSection v-if="raw" v-bind:questionnaire="raw" v-bind:items="flatModel"
              @highlight-path="highlightPath" />
          </template>

          <template v-slot:CSIRO_Renderer>
            <EditorRendererSection ref="csiroFormsRenderer" v-if="raw" v-bind:questionnaire="raw" :context="contextData"
              :dataServer="dataServerBaseUrl"
              @response="processUpdatedQuestionnaireResponse" @highlight-path="highlightPath" />
          </template>

          <template v-slot:LHC-Forms>
            <EditorNLMRendererSection ref="lhcFormsRenderer" v-if="raw" v-bind:questionnaire="raw" :context="contextData"
              :dataServer="dataServerBaseUrl"
              @response="processUpdatedQuestionnaireResponse" @highlight-path="highlightPath" />
          </template>

          <template v-slot:Response>
            <v-text-field label="Test QuestionnaireResponse Resource Id" v-model="qrResourceId" 
              hide-details="auto" autocomplete="off" @input="updateNow" autocorrect="off" autocapitalize="off"
              spellcheck="false" :title="'Resource Id to download from the examples server\r\nAbsolute (requires CORS support) or relative to ' + exampleServerUrl ">
              <template v-slot:append>
                <v-btn icon small tile v-show="qrResourceId" @click="qrResourceId = undefined"
                  title="Clear Test QuestionnaireResponse Resource ID">
                  <v-icon> mdi-close </v-icon>
                </v-btn>
                <v-btn icon small tile :disabled="qrResourceId === undefined" @click="downloadTestResponseResource"
                  :title="downloadTestResponseResourceButtonTitle">
                  <v-icon> mdi-download </v-icon>
                </v-btn>
                <v-btn small icon tile @click="reformatTestQR_Resource"><v-icon
                    title="Re-format the QuestionnaireResponse json below" dark>
                    mdi-format-indent-increase
                  </v-icon></v-btn>
                <v-btn small icon tile @click="validateQuestionnaireResponse"><v-icon
                    title="Validate the below QuestionnaireResponse json using the fhirpath-lab server" dark>
                    mdi-note-check-outline
                  </v-icon>
                </v-btn>
                <v-btn small icon tile @click="allocateNewQuestionnaireResponseId">
                  <v-icon
                    title="Allocate a new ID" dark>
                    mdi-identifier
                  </v-icon>
                </v-btn>
                <v-btn small icon tile @click="saveQuestionnaireResponse" v-if="qrResourceId"
                  :title="saveTestResponseResourceButtonTitle">
                  <v-icon dark>
                    mdi-content-save
                  </v-icon>
                </v-btn>
              </template>
            </v-text-field>
            <br />
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn class="resetButton" icon v-bind="attrs" v-on="on"
                  @click="resetQuestionnaireResponse"><v-icon>mdi-broom</v-icon></v-btn>
              </template>
              <span>Reset test QuestionnaireResponse</span>
            </v-tooltip>
            <div class="resource" width="100%" ref="aceEditorResponseJsonTab"></div>
          </template>

          <template v-slot:PrePop>
            <QuestionnairePrepopTest ref="prepopTester" v-bind:questionnaire="raw" :context="contextData"  @outcome="displayExtractOutcome"
              :dataServer="dataServerBaseUrl" 
              @response="processUpdatedQuestionnaireResponseFromPrePopTester" @pre-pop-lforms="prePopLForms" />
          </template>

          <template v-slot:Extract>
            <QuestionnaireExtractTest ref="extractTester" v-bind:questionnaire="raw" @outcome="displayExtractOutcome"
              :models="modelsText"
              v-bind:questionnaireResponseJson="questionnaireResponseJson" />
          </template>

          <template v-slot:Models>
            <resource-editor ref="editorModels" label="Model ID/Search Query"
              textLabel="StructureDefinition / Bundle Text" :resourceUrl="modelsSearch"
              @update:resourceUrl="modelsSearch = ($event ?? '')"
              footerLabel="The Model can be either an individual StructureDefinition or a search query for a bundle of models which are made available to the $extract operation"
              :resourceText="modelsText"
              @update:resourceText="modelsText = $event" />
          </template>

          <template v-slot:AI_Chat>
            <Chat
              class="chat"
              ref="chatComponent"
              feature="QuestionnaireTester"
              :openAIFeedbackEnabled="openAIFeedbackEnabled"
              :publisher="defaultProviderField"
              @send-message="handleSendMessage"
              :suggestionsWhenEmpty="chatPromptOptionsWhenEmpty"
              :suggestions="chatPromptOptions"
              @remove-suggestion="removeSuggestion"
              @reset-conversation="resetConversation"
              @apply-suggested-context="copySuggestionToClipboard"
              @apply-suggested-expression="copySuggestionToClipboard"
              @apply-suggested-questionnaire="applySuggestedQuestionnaire"
              @apply-suggested-item="applySuggestedItem"
              @apply-suggested-fhir="copySuggestionToClipboard"
              @apply-suggested-json="copySuggestionToClipboard"
              @apply-suggested-fsh="copySuggestionToClipboard"
              @apply-suggested-jsonpatch="applySuggestedJsonPatch"
            />
          </template>
        </twin-pane-tab>
      </v-card>
      <OperationOutcomeOverlay v-if="showOutcome" :saveOutcome="saveOutcome" :showOutcome="showOutcome"
        title="Processing Results" @close="clearOutcome" />
    </div>
    <table-loading v-if="saving || loadingData" />
  </div>
</template>

<style lang="scss">
.resultSelection {
  position: absolute;
  z-index: 20;
  background-color: #9acd3220;
}
</style>

<style scoped lang="scss">
.resetButton {
  right: 34px;
  position: absolute;
  z-index: 7;
  top: 68px;
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
    top: 114px;
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

<script lang="ts">
import Vue from "vue";
import {
  QuestionnaireData,
  FlattenedQuestionnaireItem,
  FlattenedQuestionnaireItems,
} from "~/models/QuestionnaireTableData";
import axios, { AxiosRequestHeaders, AxiosResponse } from "axios";
import { AxiosError } from "axios";
import { CancelTokenSource } from "axios";
import {
  Questionnaire,
  Bundle,
  OperationOutcomeIssue,
  QuestionnaireResponse,
  QuestionnaireItem,
} from "fhir/r4b";
import { settings } from "~/helpers/user_settings";
import { marked } from "marked";
import { formatDate, parseDate } from "~/helpers/datetime";
import {
  setFavourite,
  isFavourite,
  unsetFavourite,
} from "~/helpers/favourites";
import {
  loadCanonicalResource,
  loadPublishedVersions,
  requestFhirAcceptHeaders,
  saveFhirResource,
  CreateOperationOutcome,
  requestFhirContentTypeHeaders,
  errorCodingSaveResource,
} from "~/helpers/searchFhir";
import { BaseResource_defaultValues } from "~/models/BaseResourceTableData";

import {
  parseJson,
  IJsonNode,
  findNodeByPath,
  IJsonNodePosition,
  IWithPosition,
} from "~/helpers/json_parser";

import "ace-builds";
import ace from "ace-builds";
import "ace-builds/src-noconflict/mode-text";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-chrome";
import { setAcePaths, Rules as FhirPathHightlighter_Rules, setCustomHighlightRules } from "~/helpers/fhirpath_highlighter"

import Chat from "~/components/Chat.vue";
import QuestionnaireExtractTest from "~/components/QuestionnaireExtractTest.vue";
import EditorNLMRendererSection from "~/components/Questionnaire/EditorNLMRendererSection.vue";
import EditorRendererSection from "~/components/Questionnaire/EditorRendererSection.vue";
import ResourceEditor from "~/components/ResourceEditor.vue";
import { structuredDataCaptureHelpers as sdc } from "~/helpers/structureddatacapture-helpers";
import { ChatCompletionCreateParamsNonStreaming, ChatCompletionMessageParam } from "openai/resources/chat/completions";
import {
  EvaluateChatPrompt,
  GetSystemPrompt,
  IOpenAISettings,
} from "~/helpers/openai_utils";
import {
  DetectDataRequiredForQuery,
  GetQuestionnaireSystemPrompt,
} from "~/helpers/openai_form_tester";
import TwinPaneTab, { TabData } from "~/components/TwinPaneTab.vue";
import * as jsonpatch from "fast-json-patch";
import { ContextData } from "~/components/QuestionnaireContext.vue";
import QuestionnairePrepopulateTest from "~/components/QuestionnairePrepopTest.vue";

// import "fhirclient";
// import { FHIR } from "fhirclient";
// import "LForms";
// import 'https://clinicaltables.nlm.nih.gov/lforms-versions/30.0.0-beta.1/webcomponent/assets/lib/zone.min.js';

// Sortable display test
// https://dev.to/andynoir/draggable-table-row-with-vuejs-vuetify-and-sortablejs-1o7l

interface IQuestionnaireTesterData extends QuestionnaireData {
  cancelSource?: CancelTokenSource;
  showDetails: boolean;
  resourceId: string | undefined;
  qrResourceId: string | undefined;
  chatEnabled: boolean;
  loadingData: boolean;
  runningPrePop: boolean;
  runningExtract: boolean;
  resourceJsonChanged: boolean;
  resourceJsonEditor?: ace.Ace.Editor;
  questionnaireResponseJsonEditor?: ace.Ace.Editor;
  openAILastContext: string;
  openAIexpressionExplanationLoading: boolean;
  openAIFeedbackEnabled?: boolean;
  helpWithError?: string;
  questionnaireResponseJson?: string;
  modelsSearch: string;
  modelsText?: string;
  dataServerBaseUrl: string;

  // Populate/Extract properties
  contextData: ContextData;
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
  wrapBehavioursEnabled: true,
};

export default Vue.extend({
  //   components: { fhirqItem },
  mounted() {
    window.document.title = "Questionnaire Tester";
    // this.ensureEditorIsCreated();
    setAcePaths(ace.config);
    if (settings.getOpenAIKey() || settings.getOpenAIBasePath())
      this.chatEnabled = true;
  },

  destroyed() {
    console.log("Destroying Q Json editor");
    if (this.resourceJsonEditor) {
      this.resourceJsonEditor.destroy();
      this.resourceJsonEditor = undefined;
    }
    if (this.questionnaireResponseJsonEditor) {
      this.questionnaireResponseJsonEditor.destroy();
      this.questionnaireResponseJsonEditor = undefined;
    }
  },
  computed: {
    defaultProviderField(): string | undefined {
      return settings.getDefaultProviderField();
    },
    hasDebugMessages(): boolean {
      if (this.saveOutcome == undefined) return false;
      return this.saveOutcome?.issue?.length > 0;
    },
    canSave() : boolean {
      // requires a publisher to be in the resource
      if (!this.raw?.publisher)
        return false;

      // The publisher MUST be the same as the default provider field
      if (this.defaultProviderField != this.raw?.publisher)
        return false;

      // the resource ID must be set, and must be the same as the one in the test resource ID field
      if (!this.resourceId)
        return false;
      if (!this.raw?.id)
        return false;

      if (!this.resourceId?.endsWith('Questionnaire/' + this.raw?.id))
        return false;

      // the save button has been enabled thanks to detecting changes to the definition
      return this.enableSave;
    },
    saveTooltip(): string {
      if (this.resourceId?.startsWith("http")) {
        return "Save the Questionnaire definition to " + this.resourceId;
      }
      return "Save the Questionnaire definition to " + this.fhirServerUrl + "/Questionnaire/" + this.raw?.id;
    },
    chatPromptOptionsWhenEmpty(): string[] {
      return [
        "Create an item to capture the patient's name",
        "Create an item to capture a US postcode with validation on the format",
        "Update all the linkIds to be more meaningful",
        "Review the text labels in this form for clarity, inclusive language, ambiguous language, or other issues and make some recommendations.",
      ];
    },
    chatPromptOptions(): string[] {
      let promptOptions = [];
      if (this.helpWithError) {
        promptOptions.push(this.helpWithError);
      }
      return promptOptions;
    },
    hasPrePop(): boolean {
      return sdc.hasPrePopulation(this.raw);
    },
    hasExtract(): boolean {
      let tabControl: TwinPaneTab = this.$refs.twinTabControl as TwinPaneTab;
      if (tabControl) {
        let activeTabs: TabData[] = tabControl.getActiveTabs();
        const extractFromTabs = ["CSIRO Renderer", "LHC-Forms", "Aidbox Forms", "Response", "Extract"];
        console.log("Active tabs: ", activeTabs);
        if (activeTabs.length == 1 && !extractFromTabs.includes(activeTabs[0].tabName)) {
          return false;
        }
        if (activeTabs.length == 2) {
          if (!extractFromTabs.includes(activeTabs[0].tabName) && !extractFromTabs.includes(activeTabs[1].tabName)) {
            return false;
          } 
        }
      }
      return sdc.hasDataExtract(this.raw);
    },

    tabDetails(): TabData[] {
      return [
        {
          iconName: "mdi-code-json",
          tabName: "Questionnaire",
          show: true,
          enabled: true,
        },
        {
          iconName: "mdi-bug-outline",
          tabName: "Debug",
          show: this.hasDebugMessages,
          enabled: true,
        },
        {
          iconName: "mdi-card-bulleted-settings-outline",
          tabName: "Details",
          show: true,
          enabled: true,
        },
        {
          iconName: "mdi-download-network-outline",
          tabName: "Publishing",
          show: this.showDetails,
          enabled: true,
        },
        {
          iconName: "mdi-file-tree",
          tabName: "Fields",
          show: this.showDetails,
          enabled: true,
        },
        {
          iconName: "mdi-card-bulleted-settings-outline",
          tabName: "Context",
          title: "Test values to use in the QuestionnaireResponse (subject, author...)"
                +(sdc.hasPrePopulation(this.raw) || sdc.hasDataExtract(this.raw)
                ? "\nThese are also used in pre-population and extraction"
                : ""),
          show: true,
          enabled: true,
        },
        {
          iconName: "mdi-tray-arrow-down",
          tabName: "Pre-Population",
          title: "Pre-Population Configuration",
          show: this.showDetails && this.showAdvancedSettings! && sdc.hasPrePopulation(this.raw),
          enabled: true,
        },
        {
          iconName: "mdi-application-variable-outline",
          tabName: "Variables",
          show: this.showDetails && this.showAdvancedSettings!,
          enabled: true,
        },
        {
          iconName: "mdi-tray-arrow-down",
          tabName: "PrePop",
          title: "Pre-Population Tester",
          show: sdc.hasPrePopulation(this.raw),
          enabled: true,
        },
        {
          iconName: "mdi-bug-play-outline",
          tabName: "CSIRO Renderer",
          title: "CSIRO Renderer",
          show: true,
          enabled: true,
        },
        {
          iconName: "mdi-bug-play-outline",
          tabName: "LHC-Forms",
          title: "NLM LHC-Forms Renderer",
          show: true,
          enabled: true,
        },
        {
          iconName: "mdi-clipboard-text-outline",
          tabName: "Response",
          show: true,
          enabled: true,
        },
        {
          iconName: "mdi-tray-arrow-up",
          tabName: "Extract",
          title: "Data Extraction",
          show: sdc.hasDataExtract(this.raw),
          enabled: true,
        },
        {
          iconName: "mdi-tree-outline",
          tabName: "Models",
          tabHeaderName: "StructureDefinitions Required",
          title: "StructureDefinition's required by the extract operation",
          show: sdc.hasDataExtract(this.raw),
          enabled: true,
        },
        {
          iconName: "mdi-brain",
          tabName: "AI Chat",
          title: "Questionnaire and Structured Data Capture AI Chat",
          show: this.chatEnabled,
          enabled: true,
        },
      ];
    },
    downloadTestResourceButtonTitle(): string {
      if (this.resourceId?.startsWith("http")) {
        return "Download test resource from " + this.resourceId;
      }
      return "Download test resource from " + this.exampleServerUrl;
    },
    downloadTestResponseResourceButtonTitle(): string {
      if (this.qrResourceId?.startsWith("http")) {
          let formBaseUrl = this.qrResourceId.substring(0, this.qrResourceId.indexOf("/QuestionnaireResponse/"));
        return "Download test resource from " + formBaseUrl;
      }
      return "Download test resource from " + this.exampleServerUrl;
    },
    saveTestResponseResourceButtonTitle(): string {
      if (this.qrResourceId?.startsWith("http")) {
          let formBaseUrl = this.qrResourceId.substring(0, this.qrResourceId.indexOf("/QuestionnaireResponse/"));
        return "Save the test response resource to " + formBaseUrl;
      }
      return "Save the test response resource to " + this.exampleServerUrl;
    },
    exampleServerUrl(): string {
      return settings.getFhirServerExamplesUrl();
    },
  },
  methods: {
    ensureEditorIsCreated(){
      if (this.resourceJsonEditor === undefined){
        console.log("Creating Q Json editor");
        let editorResourceJsonDiv: any = this.$refs.aceEditorResourceJsonTab as Element;
        if (editorResourceJsonDiv) {

          this.resourceJsonEditor = ace.edit(editorResourceJsonDiv, resourceEditorSettings);
          if (this.raw)
            this.resourceJsonEditor?.setValue(JSON.stringify(this.raw, null, settings.getTabSpaces()));
          this.resourceJsonEditor?.clearSelection();
          this.resourceJsonEditor.session.on(
            "change",
            this.resourceJsonChangedEvent
          );

          // Also add in the QResponse editor too
          let editorQResponseJsonDiv: any = this.$refs
            .aceEditorResponseJsonTab as Element;
          if (editorQResponseJsonDiv) {
            this.questionnaireResponseJsonEditor = ace.edit(
              editorQResponseJsonDiv,
              resourceEditorSettings
            );
            this.questionnaireResponseJsonEditor.session.on(
            "change",
            this.questionnaireResponseJsonChangedEvent
          );
        }
          console.log("Created Q Json editor");
        }
        else {
          console.log("Failed to create Q Json editor - no HTML element ... yet");
        }
      }
    },

    async twinPaneMounted(): Promise<void> {
      this.ensureEditorIsCreated();

      this.showAdvancedSettings = settings.showAdvancedSettings();
      this.openAIFeedbackEnabled = settings.getOpenAIFeedbackEnabled();

      if (this.$route.query.fhirserver) {
        this.fhirServerUrl = this.$route.query.fhirserver as string;
      }
      else {
        this.fhirServerUrl = settings.getFhirServerUrl();
      }

      if (this.$route.query.dataserver) {
        this.dataServerBaseUrl = this.$route.query.dataserver as string;
      }

      if (this.$route.query.id) {
        this.resourceId = this.$route.query.id as string;
      }

      if (this.$route.query.models) {
        this.modelsSearch = this.$route.query.models as string ?? '';
      }

      if (this.$route.query.subject) {
        this.contextData.subject = { reference: this.$route.query.subject as string ?? '' };
        // split the display value from the reference if there is a `,` char in it
        if (this.contextData.subject.reference!.includes(",")) {
          let parts = this.contextData.subject.reference!.split(",");
          this.contextData.subject.reference = parts[0];
          this.contextData.subject.display = parts[1];
        }
      }

      if (this.$route.query.author) {
        this.contextData.author = { reference: this.$route.query.author as string ?? '' };
        // split the display value from the reference if there is a `,` char in it
        if (this.contextData.author.reference!.includes(",")) {
          let parts = this.contextData.author.reference!.split(",");
          this.contextData.author.reference = parts[0];
          this.contextData.author.display = parts[1];
        }
      }

      if (this.$route.query.encounter) {
        this.contextData.encounter = { reference: this.$route.query.encounter as string ?? '' };
        // split the display value from the reference if there is a `,` char in it
        if (this.contextData.encounter.reference!.includes(",")) {
          let parts = this.contextData.encounter.reference!.split(",");
          this.contextData.encounter.reference = parts[0];
          this.contextData.encounter.display = parts[1];
        }
      }

      if (this.$route.query.source) {
        this.contextData.source = { reference: this.$route.query.source as string ?? '' };
        // split the display value from the reference if there is a `,` char in it
        if (this.contextData.source.reference!.includes(",")) {
          let parts = this.contextData.source.reference!.split(",");
          this.contextData.source.reference = parts[0];
          this.contextData.source.display = parts[1];
        }
      }

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
        } else {
          if (tabControl.singleTabMode()) this.selectTab("Questionnaire");
        }
      }

      // this.searchFhirServer();
      await this.downloadTestResource();

      // Load the models
      if (this.modelsSearch?.length > 0) {
        let modelEditor: ResourceEditor = this.$refs.editorModels as ResourceEditor;
        await modelEditor.DownloadResource(this.modelsSearch);
      }

      // If there is a prepop engine specified, run that
      let prepopTester: QuestionnairePrepopulateTest = this.$refs.prepopTester as QuestionnairePrepopulateTest;
      if (prepopTester){
        if (this.$route.query.prepop) {
          this.$nextTick(async () => {
            await prepopTester.RunPrePopulation(this.$route.query.prepop as string);
          });
        }
      }
    },
    tabChanged(index: number): void {
      if (index == 0) {
        setTimeout(() => {
          if (this.resourceJsonEditor) {
            this.resourceJsonEditor.resize();
          }
        });
      }

      if (index == 9) {
        // Workaround to refresh the display in the response editor when it is updated while the form is not visible
        // https://github.com/ajaxorg/ace/issues/2497#issuecomment-102633605
        setTimeout(() => {
          if (this.questionnaireResponseJsonEditor) {
            let editorQResponseJsonDiv: any = this.$refs
              .aceEditorResponseJsonTab as Element;
            if (editorQResponseJsonDiv) {
              // console.log("focusing editor");
              editorQResponseJsonDiv.focus();
            }
            this.questionnaireResponseJsonEditor.resize();
            this.updateNow();
            // console.log("refreshing editor");
          }
        });
      }
    },
    settingsClosed() {
      this.showAdvancedSettings = settings.showAdvancedSettings();
      this.openAIFeedbackEnabled = settings.getOpenAIFeedbackEnabled();
      this.chatEnabled = settings.getOpenAIKey() !== undefined || settings.getOpenAIBasePath() !== undefined;
    },
    clearOutcome() {
      this.showOutcome = undefined;
    },
    clearOutcome2() {
      this.showOutcome = undefined;
      this.saveOutcome = undefined;
      if (this.tab == 1) this.selectTab("Questionnaire");
    },
    getItemPath(
      items: QuestionnaireItem[],
      linkId: string,
      basePath: string
    ): string | undefined {
      for (let index = 0; index < items.length; index++) {
        const myPath = basePath + ".item[" + index + "]";
        let item = items[index];
        if (item.linkId === linkId) {
          return myPath;
        }
        if (item.item) {
          let childPath = this.getItemPath(item.item, linkId, myPath);
          if (childPath) return childPath;
        }
      }
    },

    async prePopulateForm() {
      let prepopTester: QuestionnairePrepopulateTest = this.$refs.prepopTester as QuestionnairePrepopulateTest;
      if (prepopTester){
        this.runningPrePop = true;
        await prepopTester.RunPrePopulation();
        this.runningPrePop = false;
      }
    },

    async extractFormData() {
      let extractTester: QuestionnaireExtractTest = this.$refs.extractTester as QuestionnaireExtractTest;
      if (extractTester) {
        // before we can extract, we better read the current renderer's json content
        let tabControl: TwinPaneTab = this.$refs.twinTabControl as TwinPaneTab;
        let csiroRenderer = this.$refs.csiroFormsRenderer as EditorRendererSection;
        let lhcFormsRenderer = this.$refs.lhcFormsRenderer as EditorNLMRendererSection;
        if (tabControl && csiroRenderer && lhcFormsRenderer) {
          let activeTabs: TabData[] = tabControl.getActiveTabs();
          console.log("Active tabs: ", activeTabs);
          if (activeTabs.length > 0) {
            if (activeTabs[0].tabName == "CSIRO Renderer") {
              this.runningExtract = true;
              csiroRenderer.logResponse();
            } 
            else if (activeTabs[0].tabName == "LHC-Forms") {
              this.runningExtract = true;
              lhcFormsRenderer.logResponse();
            }
            else if (activeTabs[0].tabName == "Response") {
              this.runningExtract = true;
            }
            else if (activeTabs.length == 2) {
              if (activeTabs[1].tabName == "CSIRO Renderer") {
                this.runningExtract = true;
                csiroRenderer.logResponse();
              } 
              else if (activeTabs[1].tabName == "LHC-Forms") {
                this.runningExtract = true;
                lhcFormsRenderer.logResponse();
              }
              else if (activeTabs[1].tabName == "Response") {
                this.runningExtract = true;
              }
            }
          }
        }

        if (this.runningExtract) {
          // Switch to the Extract tab
          this.selectTab("Extract");

          // Now extract the data from the Response JSON
          this.$nextTick(async () => {
            await extractTester.performExtractOperation();
            this.runningExtract = false;
          });
        }
      }
    },

    highlightPath(linkId: string) {
      console.log("Highlight path: ", linkId);
      setTimeout(() => {
        // The Questionnaire Definition part
        if (this.resourceJsonEditor) {
          // prepare the ast
          const jsonValue = this.resourceJsonEditor.getValue();
          const ast = parseJson(jsonValue);
          if (ast) {
            // convert the simple linkId to a full path
            let q = JSON.parse(jsonValue) as Questionnaire;
            if (q.item) {
              let path = this.getItemPath(q.item, linkId, "Questionnaire");
              if (path) {
                const node = findNodeByPath(ast, path);
                if (node && node.position) {
                  // We found it, so move line selected
                  this.resourceJsonEditor.clearSelection();
                  this.resourceJsonEditor.gotoLine(
                    node.position.line,
                    node.position.column,
                    true
                  );

                  // and Highlight the line
                  if (node.position.value_stop_pos) {
                    let substr = jsonValue.substring(
                      node.position.prop_start_pos,
                      node.position.value_stop_pos + 1
                    );
                    const endRowOffset = substr.split(/\r\n|\r|\n/).length;
                    const endRow = node.position.line + endRowOffset - 1;
                    const endCollOffset =
                      substr.split(/\r\n|\r|\n/)[endRowOffset - 1].length;
                    const endCol =
                      node.position.column +
                      (endCollOffset > 1 ? endCollOffset + 1 : endCollOffset);
                    const range = new ace.Range(
                      node.position.line - 1,
                      node.position.column,
                      endRow - 1,
                      endCol
                    );
                    // this.resourceJsonEditor.session.selection.setRange(range);

                    const selectionMarker =
                      this.resourceJsonEditor.session.addMarker(
                        range,
                        "resultSelection",
                        "fullLine",
                        true
                      );
                    // after 1.5 seconds remove the highlight.
                    setTimeout(() => {
                      this.resourceJsonEditor?.session.removeMarker(
                        selectionMarker
                      );
                    }, 1500);
                  }

                  this.updateNow();
                }
              }
            }
          }
        }
      });
    },
    navigateToIssue(issue: fhir4b.OperationOutcomeIssue & IWithPosition) {
      console.log("Navigate to: ", issue);
      setTimeout(() => {
        if (
          this.resourceJsonEditor &&
          issue.expression &&
          !issue.expression[0].startsWith("QuestionnaireResponse")
        ) {
          this.selectTab("Questionnaire");
          this.resourceJsonEditor.clearSelection();
          if (issue.__position) {
            var position: IJsonNodePosition = issue.__position;
            this.resourceJsonEditor.focus();
            this.resourceJsonEditor.gotoLine(
              position.line,
              position.column,
              true
            );

            const jsonValue = this.resourceJsonEditor.getValue();
            if (position.value_stop_pos) {
              let substr = jsonValue.substring(
                position.prop_start_pos,
                position.value_stop_pos + 1
              );
              const endRowOffset = substr.split(/\r\n|\r|\n/).length;
              const endRow = position.line + endRowOffset - 1;
              const endCollOffset =
                substr.split(/\r\n|\r|\n/)[endRowOffset - 1].length;
              const endCol =
                position.column +
                (endCollOffset > 1 ? endCollOffset + 1 : endCollOffset);
              const range = new ace.Range(
                position.line - 1,
                position.column,
                endRow - 1,
                endCol
              );
              // this.resourceJsonEditor.session.selection.setRange(range);

              const selectionMarker = this.resourceJsonEditor.session.addMarker(
                range,
                "resultSelection",
                "fullLine",
                true
              );
              // after 1.5 seconds remove the highlight.
              setTimeout(() => {
                this.resourceJsonEditor?.session.removeMarker(selectionMarker);
              }, 1500);
            }

            this.updateNow();
          }
        } else if (this.questionnaireResponseJsonEditor) {
          this.selectTab("Response");
          this.questionnaireResponseJsonEditor.clearSelection();
          if (issue.__position) {
            var position: IJsonNodePosition = issue.__position;
            this.questionnaireResponseJsonEditor.focus();
            this.questionnaireResponseJsonEditor.gotoLine(
              position.line,
              position.column,
              true
            );

            const jsonValue = this.questionnaireResponseJsonEditor.getValue();
            if (position.value_stop_pos) {
              let substr = jsonValue.substring(
                position.prop_start_pos,
                position.value_stop_pos + 1
              );
              const endRowOffset = substr.split(/\r\n|\r|\n/).length;
              const endRow = position.line + endRowOffset - 1;
              const endCollOffset =
                substr.split(/\r\n|\r|\n/)[endRowOffset - 1].length;
              const endCol =
                position.column +
                (endCollOffset > 1 ? endCollOffset + 1 : endCollOffset);
              const range = new ace.Range(
                position.line - 1,
                position.column,
                endRow - 1,
                endCol
              );
              // this.resourceJsonEditor.session.selection.setRange(range);

              const selectionMarker =
                this.questionnaireResponseJsonEditor.session.addMarker(
                  range,
                  "resultSelection",
                  "fullLine",
                  true
                );
              // after 1.5 seconds remove the highlight.
              setTimeout(() => {
                this.questionnaireResponseJsonEditor?.session.removeMarker(
                  selectionMarker
                );
              }, 1500);
            }

            this.updateNow();
          }
        }
      });
    },
    helpWithIssue(issue: fhir4b.OperationOutcomeIssue) {
      console.log("Help me with: ", issue);
      let issueText =
        "How can I resolve this issue from validating the Questionnaire?";
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
    DeleteItem(item: FlattenedQuestionnaireItem) {
      if (item && this.raw && this.flatModel) {
        // delete this item from the parent
        let index: number = 0;
        index = this.flatModel.indexOf(item);
        this.flatModel.splice(index, 1);
        this.enableSave = true;
      }
    },

    async prePopLForms(sourceFhirServer: string, subjectId: string, authorId?: string) {
      if (this.$refs.lhcFormsRenderer) {
        let lhcFormsRenderer = (this.$refs.lhcFormsRenderer as EditorNLMRendererSection)
        await lhcFormsRenderer.prePopLForms(sourceFhirServer, subjectId, authorId)
      }
    },

    async processUpdatedQuestionnaireResponseFromPrePopTester(value: fhir4b.QuestionnaireResponse, renderer?: string) {
      this.processUpdatedQuestionnaireResponse(value);

      if (this.$refs.csiroFormsRenderer && this.raw != null) {
        let csiroFormsRenderer = (this.$refs.csiroFormsRenderer as EditorRendererSection)
        await csiroFormsRenderer.renderQuestionnaireResponse(value, this.raw);
      }

      if (this.$refs.lhcFormsRenderer && this.raw != null) {
        let lhcFormsRenderer = (this.$refs.lhcFormsRenderer as EditorNLMRendererSection)
        await lhcFormsRenderer.renderQuestionnaireResponse(value, this.raw);
      }

      if (!this.runningPrePop) {
        if (renderer == "lforms pre-pop") {
          this.selectTab("LHC-Forms");
        }
        if (renderer == "CSIRO pre-pop") {
          this.selectTab("CSIRO Renderer");
        }
      }
    },
    async processUpdatedQuestionnaireResponse(value: fhir4b.QuestionnaireResponse) {

      // Update the response with the details from the context data
      if (this.contextData?.subject) {
        value.subject = this.contextData.subject;
      }
      if (this.contextData?.author) {
        value.author = this.contextData.author;
      }
      if (this.contextData?.encounter) {
        value.encounter = this.contextData.encounter;
      }
      if (this.contextData?.source) {
        value.source = this.contextData.source;
      }
      if (value.authored === undefined) {
        value.authored = new Date().toISOString();
      }

      if (this.questionnaireResponseJsonEditor) {
        const jsonValue = JSON.stringify(value, null, settings.getTabSpaces());
        this.questionnaireResponseJson = jsonValue;
        // console.log("Updated QuestionnaireResponse: ", this.questionnaireResponse);
        this.questionnaireResponseJsonEditor.setValue(
          jsonValue
        );
        this.questionnaireResponseJsonEditor.clearSelection();
        if (!this.runningPrePop && !this.runningExtract) {
          this.selectTab("Response");
        }

        if (this.$refs.csiroFormsRenderer && this.raw != null) {
          let csiroFormsRenderer = (this.$refs.csiroFormsRenderer as EditorRendererSection)
          await csiroFormsRenderer.renderQuestionnaireResponse(value, this.raw);
        }

        if (this.$refs.lhcFormsRenderer && this.raw != null) {
          let lhcFormsRenderer = (this.$refs.lhcFormsRenderer as EditorNLMRendererSection)
          await lhcFormsRenderer.renderQuestionnaireResponse(value, this.raw);
        }

        if (this.$refs.extractTester as QuestionnaireExtractTest) {
          (this.$refs.extractTester as QuestionnaireExtractTest).setValue(
            this.questionnaireResponseJson
          );
        }
      }
    },

    AddItem(parentItem: any) {
      console.log("add new item");
      if (this.raw && this.flatModel) {
        let newItem: fhir4b.QuestionnaireItem = {
          linkId: settings.createRandomID(),
          type: "string",
        };
        if (!this.raw.item) this.raw.item = [];
        this.raw.item.push(newItem);
        let index: number = 0;
        if (parentItem) index = this.flatModel.indexOf(parentItem) + 1;
        if (index < 0) index = 0;
        this.flatModel.splice(index, 0, { item: newItem });
        this.enableSave = true;
      }
    },

    resourceJsonChangedMessage(): string | undefined {
      if (this.resourceJsonChanged && this.resourceId) {
        return "(modified)";
      }
    },

    resetQuestionnaire() {
      // Create a new example questionnaire resource to start a fresh from
      // defaulting in the publisher and a random canonical url
      if (this.resourceJsonEditor) {
        const jsonValue: Questionnaire = {
          resourceType: "Questionnaire",
          url: "",
          version: "0.1",
          name: "R" + settings.createRandomID().replaceAll("-", "_"),
          title: "",
          status: "draft",
        };
        if (settings.getDefaultNewCanonicalBase())
          jsonValue.url =
            settings.getDefaultNewCanonicalBase() +
            "/Questionnaire/" +
            jsonValue.name;
        if (settings.getDefaultProviderField())
          jsonValue.publisher = settings.getDefaultProviderField();
        jsonValue.item = [];
        try {
          this.resourceJsonEditor.setValue(JSON.stringify(jsonValue, null, 4));
          this.resourceJsonEditor.clearSelection();
          this.resourceJsonEditor.renderer.updateFull(true);
        } catch { }
      }
    },

    resetQuestionnaireResponse() {
      // Create a new example questionnaire resource to start a fresh from
      // defaulting in the publisher and a random canonical url
      if (this.questionnaireResponseJsonEditor && this.resourceJsonEditor) {
        const jsonValue: QuestionnaireResponse = {
          resourceType: "QuestionnaireResponse",
          questionnaire: "",
          status: "completed",
        };

        const jsonValueQuestionnaireDefinition =
          this.resourceJsonEditor.getValue();
        try {
          const qDef = JSON.parse(jsonValueQuestionnaireDefinition);
          if (qDef?.url) {
            jsonValue.questionnaire = qDef.url;
          }
        } catch { }

        try {
          this.questionnaireResponseJsonEditor.setValue(
            JSON.stringify(jsonValue, null, settings.getTabSpaces())
          );
          this.questionnaireResponseJsonEditor.clearSelection();
          this.questionnaireResponseJsonEditor.renderer.updateFull(true);
        } catch { }
      }
    },

    resourceJsonChangedEvent() {
      this.resourceJsonChanged = true;
      this.enableSave = true;
      console.log("enable save resourceJSON");

      if (this.resourceJsonEditor) {
        const jsonValue = this.resourceJsonEditor.getValue();
        try {
          let results = JSON.parse(jsonValue);
          this.raw = results as fhir4b.Questionnaire;
          if (this.raw) {
            this.flatModel = FlattenedQuestionnaireItems(this.raw);
          }
          if (this.saveOutcome && this.saveOutcome.issue) {
            this.setSaveOutcomePositionInformation(
              jsonValue,
              this.saveOutcome.issue
            );
            // refresh the binding
            const outcome = this.saveOutcome;
            this.$nextTick(() => {
              this.saveOutcome = undefined;
              this.$nextTick(() => {
                this.saveOutcome = outcome;
              });
            });
          }
        } catch { }
      }
    },

    questionnaireResponseJsonChangedEvent() {
      this.resourceJsonChanged = true;
      this.enableSave = true;
      console.log("enable save questionnaireResponseJSON");

      if (this.questionnaireResponseJsonEditor) {
        const jsonValue = this.questionnaireResponseJsonEditor.getValue();
        try {
          // Parse the json text to see if it is valid before we blindly pass it along.
          JSON.parse(jsonValue);
          this.questionnaireResponseJson = jsonValue;
        } catch { }
      }
    },

    updateDataServerBaseUrl(value: string) {
      this.dataServerBaseUrl = value;
    },
    async validateQuestionnaire() {
      if (this.resourceJsonEditor) {
        this.loadingData = true;
        const jsonValue = this.resourceJsonEditor.getValue();

        // send this to the forms-lab server for validation
        try {
          const response = await fetch(
            "https://fhir.forms-lab.com/Questionnaire/$validate",
            {
              method: "POST",
              cache: "no-cache",
              headers: {
                accept: "application/json",
                "Content-Type": "application/json",
              },
              body: jsonValue,
            }
          );
          const raw = await response.json();
          this.saveOutcome = raw;
          this.showOutcome = true;

          // Scan the resource for valid paths
          var ast: IJsonNode | undefined = parseJson(jsonValue);
          console.log(ast);
          // and markup the locations in the outcome object
          if (this.saveOutcome && this.saveOutcome.issue) {
            this.setSaveOutcomePositionInformation(
              jsonValue,
              this.saveOutcome.issue
            );
            // and grab the first item to send to the chat AI
            const priorityIssue = getPriorityIssue(this.saveOutcome.issue);
            if (priorityIssue) {
              this.helpWithIssue(priorityIssue);
            }
          }
          console.log(JSON.stringify(raw, null, 4));
        } catch (error) {
          console.log(error);
        }
        this.loadingData = false;
      }
    },

    displayExtractOutcome(outcome: fhir4b.OperationOutcome) {
      this.saveOutcome = outcome;
      if (outcome?.issue) { 
        if (this.saveOutcome){
          const jsonValue = this.resourceJsonEditor!.getValue();
          this.setSaveOutcomePositionInformation(jsonValue, this.saveOutcome.issue);

          // and grab the first item to send to the chat AI
          const priorityIssue = getPriorityIssue(this.saveOutcome.issue);
          if (priorityIssue) {
            this.helpWithIssue(priorityIssue);
          }
        }
        this.showOutcome = true;
      }
    },

    contextChanged(data: ContextData) {
      console.log("Context changed: ", data);
      this.contextData = data;
    },

    async localSaveFhirResource<TData extends fhir4b.FhirResource>(serverBaseUrl: string, data: TData): Promise<fhir4b.OperationOutcome | TData | undefined> {
      this.saving = true;
      let urlRequest;
      try {
        console.log("save " + data.id);
        this.showOutcome = undefined;
        this.saveOutcome = undefined;

        let response: AxiosResponse<TData, any>;
        let headers = {
          'Cache-Control': 'no-cache',
          "Accept": requestFhirAcceptHeaders,
          'Content-Type': requestFhirContentTypeHeaders
        };
        if (data.id) {
          urlRequest = `${serverBaseUrl}/${data.resourceType}/${data.id}`;
          response = await axios.put<TData>(urlRequest, data, { headers: headers });
        } else {
          // Create a new resource (via post)
          urlRequest = `${serverBaseUrl}/${data.resourceType}`;
          response = await axios.post<TData>(urlRequest, data, { headers: headers });
        }
        this.saving = false;
        return response.data;
      } catch (err) {
        this.saving = false;
        if (axios.isAxiosError(err)) {
          const serverError = err as AxiosError<fhir4b.OperationOutcome>;
          if (serverError && serverError.response) {
            this.saveOutcome = serverError.response.data;
            this.showOutcome = true;
            return serverError.response.data;
          }
          return CreateOperationOutcome("fatal", "exception", "Server: " + err.message, errorCodingSaveResource, urlRequest);
        }
        return CreateOperationOutcome("fatal", "exception", "Client: " + err, errorCodingSaveResource, urlRequest);
      }
    },

    async saveQuestionnaireResponse() {
      if(!this.questionnaireResponseJson || !this.qrResourceId)
        return;

      let qr : fhir4b.QuestionnaireResponse = JSON.parse(this.questionnaireResponseJson);
      let formBaseUrl = this.qrResourceId.substring(0, this.qrResourceId.indexOf("/QuestionnaireResponse/"));
      if (formBaseUrl.length == 0)
        formBaseUrl = settings.getFhirServerExamplesUrl();
      const idFromUrl = this.qrResourceId.substring(this.qrResourceId.indexOf("/QuestionnaireResponse/") + 23);
      if (qr.id != idFromUrl){
        alert("The QuestionnaireResponse ID ("+qr.id+") does not match the URL ("+idFromUrl+"). Please allocate a new ID.");
        return;
      }
      const outcome = await this.localSaveFhirResource(
        formBaseUrl ?? this.fhirServerUrl ?? settings.getFhirServerUrl(),
        qr
      );
      if (outcome?.resourceType == 'QuestionnaireResponse' && this.questionnaireResponseJsonEditor) {
        this.questionnaireResponseJsonEditor.setValue(JSON.stringify(outcome, null, settings.getTabSpaces()));
        this.questionnaireResponseJsonEditor.clearSelection();
        this.questionnaireResponseJsonEditor.renderer.updateFull(true);
      }
      if (this.saveOutcome){
        const jsonValue = this.resourceJsonEditor!.getValue();
        this.setSaveOutcomePositionInformation(jsonValue, this.saveOutcome.issue);

        // and grab the first item to send to the chat AI
        const priorityIssue = getPriorityIssue(this.saveOutcome.issue);
        if (priorityIssue) {
          this.helpWithIssue(priorityIssue);
        }
      }
    },

    async allocateNewQuestionnaireResponseId() {
      if (this.resourceJsonEditor && this.questionnaireResponseJsonEditor) {
        this.loadingData = true;
        let jsonValueQR = this.questionnaireResponseJsonEditor.getValue();

        // Get the base URL for the form
        let formBaseUrl = settings.getFhirServerExamplesUrl();
        if (this.qrResourceId){
          formBaseUrl = this.qrResourceId.substring(0, this.qrResourceId.indexOf("/QuestionnaireResponse/"));
          if (formBaseUrl.length == 0)
            formBaseUrl = settings.getFhirServerExamplesUrl();
        }

        // Add a subject and authored date if not present
        try {
          let qr : QuestionnaireResponse = JSON.parse(jsonValueQR);
          qr.id = settings.createRandomID();
          this.qrResourceId = formBaseUrl + "/QuestionnaireResponse/" + qr.id;
          if (!qr.subject) qr.subject = { reference: "Patient/example" };
          if (!qr.authored) qr.authored = new Date().toISOString();
          jsonValueQR = JSON.stringify(qr, null, settings.getTabSpaces());
        } catch { }

        this.questionnaireResponseJsonEditor.setValue(jsonValueQR);
        this.questionnaireResponseJsonEditor.clearSelection();
        this.questionnaireResponseJsonEditor.renderer.updateFull(true);
        this.loadingData = false;
      }
    },

    async validateQuestionnaireResponse() {
      if (this.resourceJsonEditor && this.questionnaireResponseJsonEditor) {
        this.loadingData = true;
        const jsonValueQ = this.resourceJsonEditor.getValue();
        let jsonValueQR = this.questionnaireResponseJsonEditor.getValue();
        const rawJsonValueQR = jsonValueQR;

        // embed the Q in the QR as a contained resource
        try {
          let qDef = JSON.parse(jsonValueQ);
          if (!qDef.id) qDef.id = settings.createRandomID();
          delete qDef.meta;
          let qrWithContainedQ = JSON.parse(jsonValueQR);
          qrWithContainedQ.questionnaire = "#" + qDef.id;
          qrWithContainedQ.contained = [qDef];
          jsonValueQR = JSON.stringify(qrWithContainedQ, null, settings.getTabSpaces());
        } catch { }

        // Add a subject and authored date if not present
        try {
          let qr = JSON.parse(jsonValueQR);
          if (!qr.subject) qr.subject = { reference: "Patient/example" };
          if (!qr.authored) qr.authored = new Date().toISOString();
          jsonValueQR = JSON.stringify(qr, null, settings.getTabSpaces());
        } catch { }

        // send this to the forms-lab server for validation
        try {
          const response = await fetch(
            "https://fhir.forms-lab.com/QuestionnaireResponse/$validate",
            {
              method: "POST",
              cache: "no-cache",
              headers: {
                accept: "application/json",
                "Content-Type": "application/json",
              },
              body: jsonValueQR,
            }
          );
          const raw = await response.json();
          this.saveOutcome = raw;
          this.showOutcome = true;

          // Scan the resource for valid paths
          var ast: IJsonNode | undefined = parseJson(rawJsonValueQR);
          console.log(ast);
          // and markup the locations in the outcome object
          if (this.saveOutcome && this.saveOutcome.issue) {
            // before marking up the position information, tweak the path info in the issues
            // to rehome the paths in the contained Q to the Q definition
            for (const issue of this.saveOutcome.issue) {
              if (issue.expression) {
                issue.expression = issue.expression.map((expression) => {
                  if (
                    expression.startsWith("QuestionnaireResponse.contained[0]")
                  ) {
                    // rehome the path to the Q definition
                    return expression.replace(
                      "QuestionnaireResponse.contained[0]",
                      "Questionnaire"
                    );
                  }
                  return expression;
                });
              }
            }

            this.setSaveOutcomePositionInformation(
              rawJsonValueQR,
              this.saveOutcome.issue
            );
            // also bind in the location information from the questionnaire
            this.setSaveOutcomePositionInformation(
              jsonValueQ,
              this.saveOutcome.issue,
              false
            );
            // and grab the first item to send to the chat AI
            const priorityIssue = getPriorityIssue(this.saveOutcome.issue);
            if (priorityIssue) {
              this.helpWithIssue(priorityIssue);
            }
          }
          console.log(JSON.stringify(raw, null, 4));
        } catch (error) {
          console.log(error);
        }
        this.loadingData = false;
      }
    },

    setSaveOutcomePositionInformation(
      jsonValue: string,
      issues: OperationOutcomeIssue[],
      resetExistingPositions: boolean = true
    ) {
      var ast: IJsonNode | undefined = parseJson(jsonValue);
      for (const issue of issues) {
        const typedIssue = issue as OperationOutcomeIssue & IWithPosition;
        // remove any existing position information (since may be changed/removed)
        if (typedIssue.__position && resetExistingPositions)
          delete typedIssue.__position;

        if (issue.expression) {
          for (const expression of issue.expression) {
            if (ast) {
              var node = findNodeByPath(ast, expression);
              if (node) {
                // inject the position information onto the issue
                // so that UI can use it
                typedIssue.__position = node.position;
              }
            }
          }
        }
      }
    },

    reformatTestResource() {
      if (this.resourceJsonEditor) {
        const jsonValue = this.resourceJsonEditor.getValue();
        try {
          this.resourceJsonEditor.setValue(
            JSON.stringify(JSON.parse(jsonValue), null, 4)
          );
          this.resourceJsonEditor.clearSelection();
          this.resourceJsonEditor.renderer.updateFull(true);
          if (this.saveOutcome && this.saveOutcome.issue) {
            this.setSaveOutcomePositionInformation(
              jsonValue,
              this.saveOutcome.issue
            );
          }
        } catch { }
      }
    },

    reformatTestQR_Resource() {
      if (this.questionnaireResponseJsonEditor) {
        const jsonValue = this.questionnaireResponseJsonEditor.getValue();
        try {
          this.questionnaireResponseJsonEditor.setValue(
            JSON.stringify(JSON.parse(jsonValue), null, settings.getTabSpaces())
          );
          this.questionnaireResponseJsonEditor.clearSelection();
          this.questionnaireResponseJsonEditor.renderer.updateFull(true);
          if (this.saveOutcome && this.saveOutcome.issue) {
            this.setSaveOutcomePositionInformation(
              jsonValue,
              this.saveOutcome.issue
            );
          }
        } catch { }
      }
    },

    async downloadTestResource() {
      try {
        if (!this.resourceId) return;
        let url = this.resourceId;
        if (this.resourceId && !this.resourceId.startsWith("http"))
          url = settings.getFhirServerExamplesUrl() + "/" + this.resourceId;

        // if trying to use the hl7 example servers, that should be over https
        if (
          url.startsWith("http://build.fhir.org/") ||
          url.startsWith("http://hl7.org/fhir/")
        )
          url = "https://" + url.substring(7);

        // If this is trying to download a hl7 example, run it through the downloader proxy
        // as the HL7 servers don't have CORS for us
        if (
          url.startsWith("https://build.fhir.org/") ||
          url.startsWith("https://hl7.org/fhir/")
        )
          url = settings.dotnet_server_downloader() + "?url=" + url;

        if (this.cancelSource) this.cancelSource.cancel("new download started");
        this.cancelSource = axios.CancelToken.source();
        this.loadingData = true;
        let token = this.cancelSource.token;
        let headers = {
          "Cache-Control": "no-cache",
          Accept: requestFhirAcceptHeaders,
        };
        const response = await axios.get<fhir4b.Resource>(url, {
          cancelToken: token,
          headers: headers,
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
              this.raw = results as fhir4b.Questionnaire;
              if (this.raw) {
                this.flatModel = FlattenedQuestionnaireItems(this.raw);
                const formBaseUrl = url.substring(
                  0,
                  url.indexOf("/Questionnaire/" + this.raw.id)
                );
                this.isFavourite = isFavourite(this.raw.resourceType, this.raw.id);
                if (this.raw.url) {
                  await loadPublishedVersions<fhir4b.Questionnaire>(
                    formBaseUrl,
                    "Questionnaire",
                    this.raw.url,
                    this
                  );
                }
              }
            }
            this.resourceJsonEditor.clearSelection();
          }
        }
      } catch (err) {
        this.loadingData = false;
        if (axios.isAxiosError(err)) {
          const serverError = err as AxiosError<fhir4b.OperationOutcome>;
          if (serverError && serverError.response) {
            if (serverError.response.data?.resourceType == "OperationOutcome") {
              this.saveOutcome = serverError.response.data;
            } else {
              if (serverError.response.status == 404)
                this.saveOutcome = {
                  resourceType: "OperationOutcome",
                  issue: [],
                };
              this.saveOutcome?.issue.push({
                code: "not-found",
                severity: "error",
                details: { text: "Test resource not found" },
              });
            }
            this.showOutcome = true;
            return serverError.response.data;
          }
          this.saveOutcome = CreateOperationOutcome(
            "fatal",
            "exception",
            "Server: " + err.message,
            undefined,
            err.code
          );
          this.showOutcome = true;
          return;
        }
        this.saveOutcome = CreateOperationOutcome(
          "fatal",
          "exception",
          "Client: " + err
        );
        this.showOutcome = true;
      }
    },

    async downloadTestResponseResource() {
      try {
        if (!this.qrResourceId) return;
        let url = this.qrResourceId;
        if (this.qrResourceId && !this.qrResourceId.startsWith("http"))
          url = settings.getFhirServerExamplesUrl() + "/" + this.qrResourceId;

        // if trying to use the hl7 example servers, that should be over https
        if (
          url.startsWith("http://build.fhir.org/") ||
          url.startsWith("http://hl7.org/fhir/")
        )
          url = "https://" + url.substring(7);

        // If this is trying to download a hl7 example, run it through the downloader proxy
        // as the HL7 servers don't have CORS for us
        if (
          url.startsWith("https://build.fhir.org/") ||
          url.startsWith("https://hl7.org/fhir/")
        )
          url = settings.dotnet_server_downloader() + "?url=" + url;

        if (this.cancelSource) this.cancelSource.cancel("new download started");
        this.cancelSource = axios.CancelToken.source();
        this.loadingData = true;
        let token = this.cancelSource.token;
        let headers = {
          "Cache-Control": "no-cache",
          Accept: requestFhirAcceptHeaders,
        };
        const response = await axios.get<fhir4b.Resource>(url, {
          cancelToken: token,
          headers: headers,
        });
        if (token.reason) {
          console.log(token.reason);
          return;
        }
        this.cancelSource = undefined;
        this.loadingData = false;

        const results = response.data;
        if (results) {
          if (this.questionnaireResponseJsonEditor) {
            if (results.meta?.tag)
              delete results.meta.tag;
            this.processUpdatedQuestionnaireResponse(results as fhir4b.QuestionnaireResponse);
          }
        }
      } catch (err) {
        this.loadingData = false;
        if (axios.isAxiosError(err)) {
          const serverError = err as AxiosError<fhir4b.OperationOutcome>;
          if (serverError && serverError.response) {
            if (serverError.response.data?.resourceType == "OperationOutcome") {
              this.saveOutcome = serverError.response.data;
            } else {
              if (serverError.response.status == 404)
                this.saveOutcome = {
                  resourceType: "OperationOutcome",
                  issue: [],
                };
              this.saveOutcome?.issue.push({
                code: "not-found",
                severity: "error",
                details: { text: "Test resource not found" },
              });
            }
            this.showOutcome = true;
            return serverError.response.data;
          }
          this.saveOutcome = CreateOperationOutcome(
            "fatal",
            "exception",
            "Server: " + err.message,
            undefined,
            err.code
          );
          this.showOutcome = true;
          return;
        }
        this.saveOutcome = CreateOperationOutcome(
          "fatal",
          "exception",
          "Client: " + err
        );
        this.showOutcome = true;
      }
    },

    copySuggestionToClipboard(suggestion: string) {
      console.log("Copied suggestion to clipboard: ", suggestion);
      navigator.clipboard.writeText(suggestion);
    },

    applySuggestedQuestionnaire(updatedExpression: string): void {
      // before blindly applying the updated text, do some cleaning of the context
      if (this.resourceJsonEditor) {
        const jsonValue = this.resourceJsonEditor.getValue();
        try {
          this.resourceJsonEditor.setValue(
            JSON.stringify(JSON.parse(updatedExpression), null, 4)
          );
          this.resourceJsonEditor.clearSelection();
          this.resourceJsonEditor.renderer.updateFull(true);
        } catch (err) {
          console.log("Error applying json patch: ", err);
        }
      }
    },

    applySuggestedItem(updatedExpression: string): void {
      // before blindly applying the updated text, do some cleaning of the context
      if (this.resourceJsonEditor) {
        const jsonValue = this.resourceJsonEditor.getValue();
        try {
          this.resourceJsonEditor.setValue(
            JSON.stringify(JSON.parse(updatedExpression), null, 4)
          );
          this.resourceJsonEditor.clearSelection();
          this.resourceJsonEditor.renderer.updateFull(true);
        } catch (err) {
          console.log("Error applying json patch: ", err);
        }
      }
    },

    applySuggestedJsonPatch(jsonPatchString: string) {
      if (this.resourceJsonEditor) {
        const jsonValue = this.resourceJsonEditor.getValue();
        try {
          var jsonPatch = JSON.parse(jsonPatchString);
          var jsonValueObj = JSON.parse(jsonValue);
          jsonPatch.forEach((patch: any) => {
            jsonValueObj = jsonpatch.applyPatch(jsonValueObj, [
              patch,
            ]).newDocument;
          });
          this.resourceJsonEditor.setValue(
            JSON.stringify(jsonValueObj, null, 4)
          );
          this.resourceJsonEditor.clearSelection();
          this.resourceJsonEditor.renderer.updateFull(true);
        } catch (err) {
          console.log("Error applying json patch: ", err);
        }
      }
    },

    selectTab(tabString: "Questionnaire" | "Debug" | "Details" | "Publishing" | "Fields"
                       | "Context" | "Pre-Population" | "Variables" | "PrePop" 
                       | "CSIRO Renderer"
                       | "LHC-Forms"
                       | "Response" | "Extract" | "Models" | "AI Chat") {
      let tabControl: TwinPaneTab = this.$refs.twinTabControl as TwinPaneTab;
      if (tabControl) {
        const tabIndex: number = tabControl.getTabIndex(tabString);
        tabControl.selectTab(tabIndex);
      }
    },
    resetConversation(): void {
      this.openAILastContext = "";
    },

    removeSuggestion(suggestion: string): void {
      console.log("remove suggestion: " + suggestion);
      this.helpWithError = undefined;
    },

    async handleSendMessage(message: string) {
      console.log("Message sent:", message);
      const chat = this.$refs.chatComponent as Chat;

      this.openAIexpressionExplanationLoading = true;
      // this.openAIexpressionExplanationMessage = "Asking question...";
      chat.setThinking(true);

      // Perform any additional actions with the message here
      const systemPrompt = GetQuestionnaireSystemPrompt();

      let userQuestionContext: string = "";
      if (this.resourceJsonEditor) {
        var jsonValue = this.resourceJsonEditor.getValue();
        if (jsonValue.length > 0) {
          try {
            var obj = JSON.parse(jsonValue) as fhir4b.Questionnaire;
            if (obj.text) delete obj.text;
            jsonValue = JSON.stringify(obj);
          } catch (err) {
            console.log(err);
          }
          userQuestionContext += `Based on the FHIR Questionnaire\r\n\`\`\` json\r\n  ${jsonValue}\n\n\`\`\`\r\n`;
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

    GetAISettings(): IOpenAISettings {
      return {
        openAIKey: settings.getOpenAIKey() ?? "",
        openAIBasePath: settings.getOpenAIBasePath(),
        openAIApiVersion: settings.getOpenAIApiVersion(),
        openAIModel: settings.getOpenAIModel(),
      };
    },

    toggleFavourite() {
      this.isFavourite = !this.isFavourite;
      if (this.isFavourite && this.raw?.id)
        setFavourite(this.raw.resourceType, this.raw.id);
      if (!this.isFavourite && this.raw?.id)
        unsetFavourite(this.raw.resourceType, this.raw.id);
    },
    renderLForms() {
      console.log("rendering requested");
      this.$nextTick(() => {
        console.log("rendering on tic");
        console.log(this.$refs.formContainer);
        if (
          this.$refs.formContainer &&
          this.raw &&
          !this.formContainerElement
        ) {
          console.log("rendering");
          var options = { prepopulate: false };
          // LForms.Util.addFormToPage(this.raw, "formContainer", options);
          console.log("rendered");
          this.formContainerElement = true;
        }
      });
    },
    updateNow() {
      this.$forceUpdate();
      this.enableSave = true;
    },
    // https://www.sitepoint.com/fetching-data-third-party-api-vue-axios/
    async searchFhirServer() {
      document.title = "Questionnaire:";
      const createNew = (): fhir4b.Questionnaire => {
        var newResource: fhir4b.Questionnaire = {
          resourceType: "Questionnaire",
          status: "draft",
          version: "0.1",
        };
        const stgs = settings.load();
        newResource.publisher = stgs.defaultProviderField;
        const randomId = settings.createRandomID();
        newResource.name = "R" + randomId.replaceAll("-", "_");
        if (stgs.defaultNewCanonicalBase)
          newResource.url = `${stgs.defaultNewCanonicalBase}/Questionnaire/${randomId}`;
        return newResource;
      };
      await loadCanonicalResource(
        this.fhirServerUrl ?? settings.getFhirServerUrl(),
        this,
        this,
        "Questionnaire",
        this.$route.params.id,
        createNew
      );
      if (this.raw) {
        this.isFavourite = isFavourite(this.raw.resourceType, this.raw.id);
        document.title = `Questionnaire: ${this.raw.title ?? this.raw.name}`;
        if (this.raw.text?.status === "generated") delete this.raw.text;
        this.flatModel = FlattenedQuestionnaireItems(this.raw);

        // now that we have the URL for the instance - check for other published versions
        if (this.raw.url) {
          // Initialize the preview model
          var qr: fhir4b.QuestionnaireResponse = {
            resourceType: "QuestionnaireResponse",
            questionnaire: "Questionnaire/" + this.raw.url,
            status: "in-progress",
          };

          try {
            // var fhirContext = {
            //   fhir: FHIR.client({
            //     serverUrl: "https://sqlonfhir-r4.azurewebsites.net/fhir",
            //     tokenResponse: {
            //       patient:
            //         "https://sqlonfhir-r4.azurewebsites.net/fhir/Patient/example",
            //     },
            //   }),
            // };
            // LForms.Util.setFHIRContext(fhirContext.fhir);
          } catch {
            console.log("error setting the context");
          }
          var options = { prepopulate: false };
          console.log(this);
          // if (this.$refs.formContainer || this.formContainerElement) {
          //   LForms.Util.addFormToPage(
          //     this.raw,
          //     this.formContainerElement.id ?? "formContainer",
          //     options
          //   );
          //   this.formContainerElement = true;
          // }
        }
      }
    },

    async saveData() {
      // read the server URL from the test resource ID
      let formBaseUrl = this.fhirServerUrl ?? settings.getFhirServerUrl();
      if (this.resourceId?.startsWith("http")) {
          formBaseUrl = this.resourceId.substring(0, this.resourceId.indexOf("/Questionnaire/"));
      }
      const outcome = await saveFhirResource(
        formBaseUrl,
        this
      );
      if (!outcome) {
      }
      if (this.saveOutcome){
        const jsonValue = this.resourceJsonEditor!.getValue();
        this.setSaveOutcomePositionInformation(jsonValue, this.saveOutcome.issue);

        // and grab the first item to send to the chat AI
        const priorityIssue = getPriorityIssue(this.saveOutcome.issue);
        if (priorityIssue) {
          this.helpWithIssue(priorityIssue);
        }
      }
    },

    /** Convert the parameter data into a HTML from markdown format */
    convertHtml(field: string | undefined): string {
      if (!field) return "";
      return marked(field);
    },
    parseDate(value: string) {
      return parseDate(value);
    },
    formatDate(
      fhirDateTime: string | undefined,
      emptyMessage?: string
    ): string {
      return formatDate(fhirDateTime, emptyMessage);
    },
  },
  data(): IQuestionnaireTesterData {
    return {
      showDetails: false,
      loadingData: false,
      runningPrePop: false,
      runningExtract: false,
      cancelSource: undefined,
      resourceJsonChanged: false,
      resourceId:
        "https://sqlonfhir-r4.azurewebsites.net/fhir/Questionnaire/bit-of-everything",
      qrResourceId: undefined,
      openAILastContext: "",
      openAIexpressionExplanationLoading: false,
      openAIFeedbackEnabled: false,
      helpWithError: undefined,
      questionnaireResponseJson: undefined,
      modelsSearch: '',
      modelsText: undefined,
      dataServerBaseUrl: settings.getFhirServerExamplesUrl(),

      contextData: {
        subject: { reference: "Patient/example", display: "Peter James Chalmers" },
        author: { reference: "Practitioner/example", display: "Dr Adam Careful" },
      },

      chatEnabled: false,
      flatModel: [],
      formContainerElement: undefined,
      selectedItem: undefined,

      raw: null,
      publishedVersions: [],
      ...BaseResource_defaultValues,
    };
  },
});
</script>
