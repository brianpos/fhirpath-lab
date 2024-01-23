<template>
  <div
    :class="
      raw && raw.status === 'draft'
        ? 'draft-page-background'
        : raw && raw.status === 'active'
        ? 'active-page-background'
        : raw && raw.status === 'retired'
        ? 'retired-page-background'
        : ''
    "
  >
    <template>
      <HeaderNavbar @close-settings="settingsClosed" />
    </template>

    <div class="container-fluid bd-layout" style="padding-top: 80px">
      <v-card>
        <v-toolbar flat color="primary">
          <v-toolbar-title v-if="raw"
            ><span v-text="raw.title" /> (<span v-text="raw.status" />)<span
              v-if="raw.version"
            >
              - {{ raw.version }}</span
            ></v-toolbar-title
          >
          <v-spacer />
          <v-btn v-if="false && enableSave && !readonly" icon title="save">
            <v-icon @click="saveData" :disabled="saving">
              mdi-content-save
            </v-icon>
          </v-btn>
          <v-btn
            icon
            dark
            title="Show Details, Publishing and other informational tabs"
            @click="showDetails = !showDetails"
          >
            <v-icon v-if="!showDetails"> mdi-eye-off-outline </v-icon>
            <v-icon v-if="showDetails"> mdi-eye-outline </v-icon>
          </v-btn>
        </v-toolbar>
        <v-tabs vertical v-model="tab" @change="changeTab">
          <v-tab v-on:click="tabClicked">
            <v-icon left> mdi-code-json </v-icon>
            Questionnaire
          </v-tab>
          <v-tab v-on:click="tabClicked" v-show="hasDebugMessages">
            <v-icon left> mdi-bug-outline </v-icon>
            Debug
          </v-tab>
          <v-tab v-on:click="tabClicked">
            <v-icon left> mdi-card-bulleted-settings-outline </v-icon>
            <i>Details</i>
          </v-tab>
          <v-tab v-show="showDetails">
            <v-icon left> mdi-download-network-outline </v-icon>
            <i>Publishing</i>
          </v-tab>
          <v-tab v-show="showDetails" v-on:click="tabClicked">
            <v-icon left> mdi-file-tree </v-icon>
            <i>Fields</i>
          </v-tab>
          <v-tab
            v-show="showDetails && showAdvancedSettings"
            v-on:click="tabClicked"
          >
            <v-icon left> mdi-tray-arrow-down </v-icon>
            <i>Pre-Population</i>
          </v-tab>
          <v-tab
            v-show="showDetails && showAdvancedSettings"
            v-on:click="tabClicked"
          >
            <v-icon left> mdi-application-variable-outline </v-icon>
            <i>Variables</i>
          </v-tab>
          <v-tab v-on:click="tabClicked">
            <v-icon left> mdi-bug-play-outline </v-icon>
            CSIRO Renderer
          </v-tab>
          <v-tab v-on:click="tabClicked">
            <v-icon left> mdi-bug-play-outline </v-icon>
            LHC-Forms
          </v-tab>
          <v-tab v-on:click="responseTabClicked">
            <v-icon left> mdi-clipboard-text-outline </v-icon>
            Response
          </v-tab>
          <v-tab
            v-show="showAdvancedSettings && chatEnabled"
            :class="chatActiveClass"
            v-on:click="tabClicked"
          >
            <v-icon left> mdi-brain </v-icon>
            AI Chat
          </v-tab>

          <v-tabs-items
            class="custom-tab"
            style="height: calc(100vh - 168px)"
            touchless
            v-model="tab"
          >
            <v-tab-item :eager="true">
              <!-- Questionnaire -->
              <v-card flat>
                <v-card-text>
                  <p class="fl-tab-header">Questionnaire</p>
                  <v-text-field
                    label="Test Resource Id"
                    v-model="resourceId"
                    hide-details="auto"
                    autocomplete="off"
                    @input="updateNow"
                    autocorrect="off"
                    autocapitalize="off"
                    spellcheck="false"
                    :title="
                      'Resource Id to download from the examples server\r\nAbsolute (requires CORS support) or relative to ' +
                      exampleServerUrl
                    "
                  >
                    <template v-slot:append>
                      <v-btn
                        icon
                        small
                        tile
                        v-show="resourceId"
                        @click="resourceId = undefined"
                        title="Clear Test Resource ID"
                      >
                        <v-icon> mdi-close </v-icon>
                      </v-btn>
                      <v-btn
                        icon
                        small
                        tile
                        :disabled="resourceId === undefined"
                        @click="downloadTestResource"
                        :title="downloadTestResourceButtonTitle"
                      >
                        <v-icon> mdi-download </v-icon>
                      </v-btn>
                      <v-btn small icon tile @click="reformatTestResource"
                        ><v-icon
                          title="Re-format the Questionnaire json below"
                          dark
                        >
                          mdi-format-indent-increase
                        </v-icon></v-btn
                      >
                      <v-btn small icon tile @click="validateQuestionnaire"
                        ><v-icon
                          title="Validate the below Questionnaire json using the fhirpath-lab server"
                          dark
                        >
                          mdi-note-check-outline
                        </v-icon></v-btn
                      >
                    </template>
                  </v-text-field>
                  <br />
                  <!-- <label class="v-label theme--light bare-label">Test Resource JSON <i>{{ resourceJsonChangedMessage() }}</i></label> -->
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        class="resetButton"
                        icon
                        v-bind="attrs"
                        v-on="on"
                        @click="resetQuestionnaire"
                        ><v-icon>mdi-broom</v-icon></v-btn
                      >
                    </template>
                    <span>Reset Questionnaire definition</span>
                  </v-tooltip>
                  <div
                    class="resource"
                    width="100%"
                    ref="aceEditorResourceJsonTab"
                  ></div>
                  <!-- <div class="ace_editor_footer"></div> -->
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <!-- Debug -->
              <v-card flat>
                <v-card-text>
                  <p class="fl-tab-header">Debug</p>
                  <label>Validation Results:</label>
                  <OperationOutcomePanel
                    :outcome="saveOutcome"
                    title="Error Saving"
                    issueLinkTitle="Goto issue in Questionnaire"
                    @close="clearOutcome2"
                    @help-with-issue="helpWithIssue"
                    @navigate-to-issue="navigateToIssue"
                  />
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <!-- Details -->
              <conformance-resource-details-tab
                v-if="raw"
                :raw="raw"
                :readonly="readonly"
                :showAdvancedSettings="showAdvancedSettings"
                @update="updateNow"
              />
            </v-tab-item>

            <v-tab-item>
              <!-- Publishing -->
              <conformance-resource-publishing-tab
                v-if="raw"
                :raw="raw"
                :publishedVersions="publishedVersions"
                :lockPublisher="false"
                :readonly="readonly"
                :showAdvancedSettings="showAdvancedSettings"
                @update="updateNow"
              />
            </v-tab-item>

            <v-tab-item>
              <!-- Fields -->
              <v-card flat>
                <v-card-text>
                  <p class="fl-tab-header">Fields</p>
                  <EditorFieldsSection
                    v-if="raw"
                    v-bind:items="flatModel"
                    :readonly="readonly"
                    :showAdvancedSettings="showAdvancedSettings"
                  />
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <!-- Pre-Population -->
              <v-card flat>
                <v-card-text>
                  <p class="fl-tab-header">Pre-Population</p>
                  <EditorPrePolulationSection
                    v-if="raw"
                    v-bind:items="flatModel"
                  />
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <!-- Variables -->
              <v-card flat>
                <v-card-text>
                  <p class="fl-tab-header">Variables</p>
                  <EditorVariablesSection
                    v-if="raw"
                    v-bind:questionnaire="raw"
                    v-bind:items="flatModel"
                  />
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <!-- CSIRO Renderer -->
              <v-card flat>
                <v-card-text>
                  <p class="fl-tab-header">CSIRO Renderer</p>
                  <EditorRendererSection
                    v-if="raw"
                    v-bind:questionnaire="raw"
                    @response="processUpdatedQuestionnaireResponse"
                  />
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item :eager="true">
              <!-- NLM LForms Renderer -->
              <v-card flat>
                <v-card-text>
                  <p class="fl-tab-header">LHC-Forms</p>
                  <EditorNLMRendererSection
                    v-if="raw"
                    v-bind:questionnaire="raw"
                    @response="processUpdatedQuestionnaireResponse"
                  />
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item :eager="true">
              <!-- Response -->
              <v-card flat>
                <v-card-text>
                  <p class="fl-tab-header">Questionnaire Response</p>
                  <div
                    class="resource"
                    width="100%"
                    ref="aceEditorResponseJsonTab"
                  ></div>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <!-- AI Chat -->
              <v-card flat>
                <v-card-text>
                  <p
                    class="fl-tab-header"
                    title="Questionnaire and Structured Data Capture AI Chat"
                  >
                    SDC AI Chat
                  </p>
                  <Chat
                    class="chat"
                    ref="chatComponent"
                    @send-message="handleSendMessage"
                    :suggestions="chatPromptOptions"
                    @reset-conversation="resetConversation"
                    @apply-suggested-expression="applySuggestedExpression"
                  />
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-card>
      <OperationOutcomeOverlay
        v-if="showOutcome"
        :saveOutcome="saveOutcome"
        :showOutcome="showOutcome"
        title="Error Saving"
        @close="clearOutcome"
      />
    </div>
    <table-loading v-if="saving || loadingData" />
  </div>
</template>

<style scoped  lang="scss">
.resetButton {
  right: 34px;
  position: absolute;
  z-index: 100;
}

.v-window-item--active {
  overflow-y: auto;
  overflow-x: hidden;
  min-height: 576px;
  // max-height: calc(100vh - 240px);
}

.resource {
  height: calc(100vh - 280px);
}

.chat {
  height: calc(100vh - 200px);
}

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
  height: calc(100vh - 280px);
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

.custom-tab > div > div {
  flex: 1;
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
import { Questionnaire, Bundle, OperationOutcomeIssue } from "fhir/r4b";
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
import Chat from "~/components/Chat.vue";
import { ChatMessage } from "@azure/openai";
import {
  EvaluateChatPrompt,
  GetSystemPrompt,
  IOpenAISettings,
} from "~/helpers/openai_utils";
import { Consola } from "consola";

// import "fhirclient";
// import { FHIR } from "fhirclient";
// import "LForms";
// import 'https://clinicaltables.nlm.nih.gov/lforms-versions/30.0.0-beta.1/webcomponent/assets/lib/zone.min.js';

// Sortable display test
// https://dev.to/andynoir/draggable-table-row-with-vuejs-vuetify-and-sortablejs-1o7l

interface IQuestionnaireTesterData extends QuestionnaireData {
  lastTabClicked: KeyboardEvent | MouseEvent | undefined;
  cancelSource?: CancelTokenSource;
  primaryTab: number;
  showDetails: boolean;
  secondaryTab: number;
  windowWidth: number;
  resourceId: string | undefined;
  chatEnabled: boolean;
  loadingData: boolean;
  resourceJsonChanged: boolean;
  resourceJsonEditor?: ace.Ace.Editor;
  questionnaireResponseJsonEditor?: ace.Ace.Editor;
  openAILastContext: string;
  openAIexpressionExplanationLoading: boolean;
  helpWithError?: string;
  questionnaireResponse?: fhir4b.QuestionnaireResponse;
}

export default Vue.extend({
  //   components: { fhirqItem },
  mounted() {
    window.onresize = () => {
      this.windowWidth = window.innerWidth;
    };
    window.document.title = "Questionnaire Tester";

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
    var editorResourceJsonDiv: any = this.$refs
      .aceEditorResourceJsonTab as Element;
    if (editorResourceJsonDiv) {
      this.resourceJsonEditor = ace.edit(
        editorResourceJsonDiv,
        resourceEditorSettings
      );
      if (this.raw)
        this.resourceJsonEditor?.setValue(JSON.stringify(this.raw, null, 2));
      this.resourceJsonEditor?.clearSelection();
      this.resourceJsonEditor.session.on(
        "change",
        this.resourceJsonChangedEvent
      );
    }

    // Also add in the QResponse editor too
    var editorQResponseJsonDiv: any = this.$refs
      .aceEditorResponseJsonTab as Element;
    if (editorQResponseJsonDiv) {
      this.questionnaireResponseJsonEditor = ace.edit(
        editorQResponseJsonDiv,
        resourceEditorSettings
      );
    }

    this.showAdvancedSettings = settings.showAdvancedSettings();

    if (this.$route.query.fhirserver) {
      this.fhirServerUrl = this.$route.query.fhirserver as string;
    }

    if (this.$route.query.id) {
      this.resourceId = this.$route.query.id as string;
    }

    if (this.$route.query.tab) {
      this.$nextTick(() => {
        const tabString = this.$route.query.tab as string;
        if (parseInt(tabString) >= 0) {
          this.tab = parseInt(tabString);
        }
      });
    }

    // this.searchFhirServer();
    this.downloadTestResource();
  },
  computed: {
    hasDebugMessages(): boolean {
      if (this.saveOutcome == undefined) return false;
      return this.saveOutcome?.issue?.length > 0;
    },
    chatPromptOptions(): string[] {
      const defaultPromptOptions = [
        "create an item to capture the patient's name",
        "create an item to capture a US postcode with validation on the format",
        "update all the linkIds to be more meaningful",
      ];
      var promptOptions = [];
      if (this.helpWithError) {
        promptOptions.push(this.helpWithError);
      }
      promptOptions.push(...defaultPromptOptions);
      return promptOptions;
    },
    expressionVisible(): boolean {
      return (
        this.primaryTab === 0 ||
        (this.secondaryTab === 0 && this.windowWidth > 999)
      );
    },
    resourceVisible(): boolean {
      return (
        this.primaryTab === 1 ||
        (this.secondaryTab === 1 && this.windowWidth > 999)
      );
    },
    variablesVisible(): boolean {
      return (
        this.primaryTab === 2 ||
        (this.secondaryTab === 2 && this.windowWidth > 999)
      );
    },
    traceVisible(): boolean {
      return (
        this.primaryTab === 3 ||
        (this.secondaryTab === 3 && this.windowWidth > 999)
      );
    },
    astVisible(): boolean {
      return (
        this.primaryTab === 4 ||
        (this.secondaryTab === 4 && this.windowWidth > 999)
      );
    },
    chatVisible(): boolean {
      return (
        this.primaryTab === 5 ||
        (this.secondaryTab === 5 && this.windowWidth > 999)
      );
    },
    debugVisible(): boolean {
      return (
        this.primaryTab === 6 ||
        (this.secondaryTab === 6 && this.windowWidth > 999)
      );
    },

    expressionActiveClass(): string {
      return (this.secondaryTab === 0 && this.windowWidth > 999) ||
        this.primaryTab === 0
        ? "v-tab--active"
        : "";
    },
    resourceActiveClass(): string {
      return (this.secondaryTab === 1 && this.windowWidth > 999) ||
        this.primaryTab === 1
        ? "v-tab--active"
        : "";
    },
    variablesActiveClass(): string {
      return (this.secondaryTab === 2 && this.windowWidth > 999) ||
        this.primaryTab === 2
        ? "v-tab--active"
        : "";
    },
    traceActiveClass(): string {
      return (this.secondaryTab === 3 && this.windowWidth > 999) ||
        this.primaryTab === 3
        ? "v-tab--active"
        : "";
    },
    astActiveClass(): string {
      return (this.secondaryTab === 4 && this.windowWidth > 999) ||
        this.primaryTab === 4
        ? "v-tab--active"
        : "";
    },
    chatActiveClass(): string {
      return (this.secondaryTab === 5 && this.windowWidth > 999) ||
        this.primaryTab === 5
        ? "v-tab--active"
        : "";
    },
    debugActiveClass(): string {
      return (this.secondaryTab === 6 && this.windowWidth > 999) ||
        this.primaryTab === 6
        ? "v-tab--active"
        : "";
    },
    downloadTestResourceButtonTitle(): string {
      return "Download test resource from " + this.exampleServerUrl;
    },
    exampleServerUrl(): string {
      return settings.getFhirServerExamplesUrl();
    },
  },
  methods: {
    responseTabClicked(e: KeyboardEvent | MouseEvent): void {
      // Workaround to refresh the display in the response editor when it is updated while the form is not visible
      // https://github.com/ajaxorg/ace/issues/2497#issuecomment-102633605
      setTimeout(() => {
        if (this.questionnaireResponseJsonEditor) {
          var editorQResponseJsonDiv: any = this.$refs
            .aceEditorResponseJsonTab as Element;
          if (editorQResponseJsonDiv) {
            console.log("focusing editor");
            editorQResponseJsonDiv.focus();
          }
          this.questionnaireResponseJsonEditor.resize();
          this.updateNow();
          console.log("refreshing editor");
        }
      });

      // then do the other handler too
      this.tabClicked(e);
    },
    tabClicked(e: KeyboardEvent | MouseEvent): void {
      this.lastTabClicked = e;
    },
    changeTab(selectTab: number): void {
      // Primary tab is the one that is "locked" and only changeable when clicking with control
      // The secondary tab is the one that is "switched" when clicking without control
      if (this.primaryTab !== selectTab) {
        if (
          (this.lastTabClicked &&
            (this.lastTabClicked as MouseEvent).ctrlKey) ||
          this.windowWidth <= 999
        ) {
          this.primaryTab = selectTab;
        } else {
          this.secondaryTab = selectTab;
        }
      }
      this.lastTabClicked = undefined;
    },
    settingsClosed() {
      this.showAdvancedSettings = settings.showAdvancedSettings();
    },
    clearOutcome() {
      this.showOutcome = undefined;
    },
    clearOutcome2() {
      this.showOutcome = undefined;
      this.saveOutcome = undefined;
      if (this.tab == 1) this.tab = 0;
    },
    navigateToIssue(issue: fhir4b.OperationOutcomeIssue & IWithPosition) {
      console.log("Navigate to: ", issue);
      this.tab = 0;
      setTimeout(() => {
        if (this.resourceJsonEditor) {
          this.resourceJsonEditor.clearSelection();
          if (issue.__position) {
            var position: IJsonNodePosition = issue.__position;
            this.resourceJsonEditor.focus();
            this.resourceJsonEditor.gotoLine(
              position.line,
              position.column,
              true
            );
            this.updateNow();
          }
        }
      });
    },
    helpWithIssue(issue: fhir4b.OperationOutcomeIssue) {
      console.log("Help me with: ", issue);
      var issueText =
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
        if (item) index = this.flatModel.indexOf(item);
        this.flatModel.splice(index, 1);
        this.enableSave = true;
      }
    },

    processUpdatedQuestionnaireResponse(value: fhir4b.QuestionnaireResponse) {
      if (this.questionnaireResponseJsonEditor) {
        this.questionnaireResponse = value;
        this.questionnaireResponseJsonEditor.setValue(
          JSON.stringify(this.questionnaireResponse, null, 2)
        );
        this.questionnaireResponseJsonEditor.clearSelection();
        this.tab = 9;
      }
    },

    AddItem(parentItem: any) {
      console.log("add new item");
      if (this.raw && this.flatModel) {
        var newItem: fhir4b.QuestionnaireItem = {
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
        } catch {}
      }
    },

    resourceJsonChangedEvent() {
      this.resourceJsonChanged = true;
      this.enableSave = true;
      console.log("enable save resourceJSON");

      if (this.resourceJsonEditor) {
        const jsonValue = this.resourceJsonEditor.getValue();
        try {
          var results = JSON.parse(jsonValue);
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
        } catch {}
      }
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
      issues: OperationOutcomeIssue[]
    ) {
      var ast: IJsonNode | undefined = parseJson(jsonValue);
      for (const issue of issues) {
        const typedIssue = issue as OperationOutcomeIssue & IWithPosition;
        // remove any existing position information (since may be changed/removed)
        if (typedIssue.__position) delete typedIssue.__position;

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
        } catch {}
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
        let headers: AxiosRequestHeaders = {
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

    applySuggestedExpression(updatedExpression: string): void {
      // before blindly applying the updated text, do some cleaning of the context
      if (this.resourceJsonEditor) {
        const jsonValue = this.resourceJsonEditor.getValue();
        try {
          this.resourceJsonEditor.setValue(
            JSON.stringify(JSON.parse(updatedExpression), null, 4)
          );
          this.resourceJsonEditor.clearSelection();
          this.resourceJsonEditor.renderer.updateFull(true);
        } catch {}
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
      // this.openAIexpressionExplanationMessage = "Asking question...";
      chat.setThinking(true);
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

      let prompt: Array<ChatMessage> = [];
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
      chat.addMessage("FhirPath AI", resultOfQuestion ?? "", true);
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
      const outcome = await saveFhirResource(
        this.fhirServerUrl ?? settings.getFhirServerUrl(),
        this
      );
      if (!outcome) {
        if (this.raw?.id) {
          if (this.$route.params.id.endsWith(":new")) {
            let href = this.$route.fullPath.replaceAll(
              this.$route.params.id,
              this.raw?.id
            );
            window.history.pushState({}, "", href);

            // also update the publishing table
            const index = this.publishedVersions?.findIndex((pv) => {
              if (!pv.id) return true;
            });
            if (index) {
              this.publishedVersions?.splice(index, 1, this.raw);
            }
          }
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
      cancelSource: undefined,
      lastTabClicked: undefined,
      primaryTab: 0,
      secondaryTab: 1,
      windowWidth: window.innerWidth,
      resourceJsonChanged: false,
      resourceId:
        "https://sqlonfhir-r4.azurewebsites.net/fhir/Questionnaire/bit-of-everything",
      openAILastContext: "",
      openAIexpressionExplanationLoading: false,
      helpWithError: undefined,
      questionnaireResponse: undefined,

      chatEnabled: true,
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
