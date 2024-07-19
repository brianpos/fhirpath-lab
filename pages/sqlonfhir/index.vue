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
          <v-btn icon dark accesskey="g" title="press alt+g to go" @focus="checkFocus"
            @click="evaluateFhirPathExpression">
            <v-icon>
              mdi-play
            </v-icon>
          </v-btn>
          <v-tooltip bottom color="primary">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon dark @click="copyZulipShareLinkToClipboard" :hidden="!showShareLink()" v-bind="attrs" v-on="on"
                @mouseenter="updateZulipShareText">
                <svg class="brand-logo" role="img" aria-label="Zulip" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 600 600" height="25">
                  <path fill="hsl(0, 0%, 100%)"
                    d="M 473.09 122.97 c 0 22.69 -10.19 42.85 -25.72 55.08 L 296.61 312.69 c -2.8 2.4 -6.44 -1.47 -4.42 -4.7 l 55.3 -110.72 c 1.55 -3.1 -0.46 -6.91 -3.64 -6.91 H 129.36 c -33.22 0 -60.4 -30.32 -60.4 -67.37 c 0 -37.06 27.18 -67.37 60.4 -67.37 h 283.33 c 33.22 -0.02 60.4 30.3 60.4 67.35 z M 129.36 506.05 h 283.33 c 33.22 0 60.4 -30.32 60.4 -67.37 c 0 -37.06 -27.18 -67.37 -60.4 -67.37 H 198.2 c -3.18 0 -5.19 -3.81 -3.64 -6.91 l 55.3 -110.72 c 2.02 -3.23 -1.62 -7.1 -4.42 -4.7 L 94.68 383.6 c -15.53 12.22 -25.72 32.39 -25.72 55.08 c 0 37.05 27.18 67.37 60.4 67.37 z">
                  </path>
                </svg>
              </v-btn>
            </template>
            <span v-text="shareZulipToolTipMessage"></span>
          </v-tooltip>
        </v-toolbar>
        <twin-pane-tab
          :tabs="tabDetails"
          @change="tabChanged"
          :eager="true"
          ref="twinTabControl"
          @mounted="twinPaneMounted"
        >
        <template v-slot:View_Def>
          <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn icon style="right: 20px; position: absolute; padding-top: 20px;" v-bind="attrs"
                              v-on="on" @click="resetExpression"><v-icon>mdi-broom</v-icon></v-btn>
                          </template>
                          <span>Reset View Definition</span>
                        </v-tooltip>

                        <label class="v-label theme--light bare-label" style="transform: translateY(-4px) scale(0.75); transform-origin: left;">SQL on FHIR v2 View Definition</label>
                        <div height="85px" width="100%" ref="aceEditorExpression"></div>
                        <div class="ace_editor_footer"></div>

                        <OperationOutcomePanel :outcome="expressionParseOutcome"
                          @close="expressionParseOutcome = undefined" />
          </template>
          <template v-slot:Resource>
            <v-text-field label="Test Resource Id" v-model="resourceId" hide-details="auto" autocomplete="off"
                          @input="updateNow" autocorrect="off" autocapitalize="off" spellcheck="false">
                          <template v-slot:append>
                            <v-btn icon small tile @click="resourceId = undefined">
                              <v-icon> mdi-close </v-icon>
                            </v-btn>
                            <v-btn icon small tile @click="downloadTestResource">
                              <v-icon> mdi-download </v-icon>
                            </v-btn>
                            <v-btn small icon tile @click="reformatTestResource"><v-icon title="Format json" dark>
                                mdi-format-indent-increase </v-icon></v-btn>
                          </template>
                        </v-text-field>
                        <label class="v-label theme--light bare-label"style="transform: scale(0.75); transform-origin: left;">Test Resource JSON <i>{{
                          resourceJsonChangedMessage() }}</i></label>
                        <div class="resource" width="100%" ref="aceEditorResourceJsonTab"></div>
                        <!-- <div class="ace_editor_footer"></div> -->
          </template>
          <template v-slot:Results>
            <v-simple-table>
                          <tr>
                            <template v-for="(r2, i1) in outputColumns">
                              <th class="context" colspan="2" :key="i1">
                                {{ r2 }}
                              </th>
                            </template>
                          </tr>
                          <template v-for="(row, index) in outputResult">
                            <tr :key="index">
                              <template v-for="(r2, i1) in outputColumns">
                                <td colspan="2" class="result-type" :key="i1">
                                  {{ row[r2] }}
                                </td>
                              </template>
                            </tr>
                          </template>
                        </v-simple-table>
          </template>
          <template v-slot:Trace>
                        <!-- <template v-for="(r2, i1) in results">
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
                        </template> -->
                      </template>
        </twin-pane-tab>
      </v-card>

      <br />
      <OperationOutcomeOverlay style="z-index: 8" v-if="showOutcome" :saveOutcome="saveOutcome" :showOutcome="showOutcome"
        title="Error" @close="clearOutcome" />
    </div>
  </div>
</template>

<style lang="scss">

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
  .custom-tab>div>div {
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

td {
  vertical-align: top;
  height: unset !important;
  padding: 8px;
}

th {
  padding: 8px;
}

.code-json {
  white-space: pre-wrap;
}
</style>

<script lang="ts">
import Vue from "vue";
import "vue-router";
import { settings, ILastUsedParameters } from "~/helpers/user_settings";
import {
  requestFhirAcceptHeaders,
  CreateOperationOutcome,
} from "~/helpers/searchFhir";
import axios from "axios";
import { AxiosError } from "axios";
import { CancelTokenSource } from "axios";
import fhirpath from "fhirpath";
import fhirpath_r4_model from "fhirpath/fhir-context/r4";
import { setAcePaths, Rules as FhirPathHightlighter_Rules, setCustomHighlightRules } from "~/helpers/fhirpath_highlighter"
import "~/assets/fhirpath_highlighter.scss"

import "ace-builds";
import ace from "ace-builds";
import "ace-builds/src-noconflict/mode-text";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-chrome";

import { processResources } from "~/helpers/sqlonfhir_extractor"
import { fromArray } from "~/helpers/sqlonfhir_loaders"

// import { fhir } from '@fhir-typescript/r4b-core';
import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from "lz-string";
import { EncodeTestFhirpathData, DecodeTestFhirpathData, TestFhirpathData } from "~/models/testenginemodel";

import { DomainResource, FhirResource, Resource } from "fhir/r4b";
import { TabData } from "~/components/TwinPaneTab.vue";

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

const exampleSqlonfhirViewDefinition = `{
  "resource": "Patient",
  "select": [
    {
      "column": [
        {
          "path": "id",
          "name": "Id"
        },
        {
          "path": "identifier.where(type.coding.exists(code = 'MR' and system = 'http://terminology.hl7.org/CodeSystem/v2-0203')).value",
          "name": "MRN"
        },
        {
          "path": "name.first().family",
          "name": "Surname"
        },
        {
          "path": "name.first().given.join(', ')",
          "name": "Given name(s)"
        },
        {
          "path": "birthDate",
          "name": "DOB"
        }
      ]
    }
  ]
}
`;

interface FhirPathData {
  prevFocus?: any;
  outputResult: any[];
  resourceId?: string;
  resourceType?: string;
  resourceJsonChanged: boolean;
  loadingData: boolean;
  saveOutcome?: fhir4b.OperationOutcome;
  showOutcome?: boolean;
  showAdvancedSettings: boolean;
  defaultProviderField: string | undefined;
  cancelSource?: CancelTokenSource;
  tab: any;
  shareToolTipMessage: string;
  shareZulipToolTipMessage: string;
  expressionEditor?: ace.Ace.Editor;
  resourceJsonEditor?: ace.Ace.Editor;
  expressionParseOutcome?: fhir4b.OperationOutcome;
}

interface IFhirPathMethods {
  readParametersFromQuery(): TestFhirpathData;
  applyParameters(p: TestFhirpathData): void;
  resetExpression(): void;
  resourceJsonChangedEvent(): void;
  fhirpathExpressionChangedEvent(): void;
  resourceJsonChangedMessage(): string | undefined;
  tabTitle(): void;
  twinPaneMounted(): Promise<void>;
  tabChanged(index: Number): void;
  settingsClosed(): void;
  updateNow(): void;

  getFhirpathExpression(): string | undefined;
  getResourceJson(): string | undefined;

  clearOutcome(): void;
  setResultJson(result: string): void;

  reformatTestResource(): void;
  downloadTestResource(): void;
  evaluateExpressionUsingFhirpathJs(): void;
  prepareSharePackageData(): TestFhirpathData;
  showShareLink(): boolean;
  updateShareText(): void;
  updateZulipShareText(): void;
  copyShareLinkToClipboard(): void;
  copyZulipShareLinkToClipboard(): void;
  evaluateFhirPathExpression(): void;
  checkFocus(event: any): void;
  saveLastUsedParameters(loadCompleted: boolean): void;

}

interface IFhirPathComputed {
  tabDetails: TabData[];
  outputColumns: string[];
}

interface IFhirPathProps {
  $refs: {
    aceEditorExpression: HTMLDivElement,
    aceEditorResourceJson: HTMLDivElement,
  },
}

export default Vue.extend<FhirPathData, IFhirPathMethods, IFhirPathComputed, IFhirPathProps>({
  // head: {
  //   title: "FhirPathTester",
  // },
  async mounted() {
    this.showAdvancedSettings = settings.showAdvancedSettings();
    this.defaultProviderField = settings.getDefaultProviderField();
    setAcePaths(ace.config);
  },
  computed: {
    tabDetails(): TabData[] {
      return [
        {
          iconName: "mdi-function-variant",
          tabName: "View Def",
          tabHeaderName: "View Definition",
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
          iconName: "mdi-table-large",
          tabName: "Results",
          show: true,
          enabled: true,
        },
        {
          iconName: "mdi-format-list-bulleted",
          tabName: "Trace",
          show: true,
          enabled: false,
        },
      ];
    },
    outputColumns(): string[] {
      if (this.outputResult.length > 0) {
        const first = this.outputResult[0];
        if (first) {
          return Object.keys(first);
        }
      }
      return [];
    },
  },
  methods: {
    async twinPaneMounted(): Promise<void> {
      this.$nextTick(async () => {
        // Update the editor's Mode
        var editorDiv: any = this.$refs.aceEditorExpression as Element;
        if (editorDiv) {
          this.expressionEditor = ace.edit(editorDiv, {
            wrap: "free",
            minLines: 3,
            maxLines: Infinity,
            highlightActiveLine: false,
            showGutter: true,
            fontSize: 16,
            cursorStyle: "slim",
            showPrintMargin: false,
            theme: "ace/theme/chrome",
            mode: "ace/mode/json",
            wrapBehavioursEnabled: true
          });

          // setCustomHighlightRules(this.expressionEditor, FhirPathHightlighter_Rules);
          this.expressionEditor.setValue(exampleSqlonfhirViewDefinition);
          this.expressionEditor.clearSelection();
          this.expressionEditor.on("change", this.fhirpathExpressionChangedEvent)
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
      });
    },
    updateNow() {
      this.$forceUpdate();
    },
    tabChanged(index: Number): void {
      if (index == 0){
        setTimeout(() => {
        if (this.expressionEditor){
            this.expressionEditor.resize();
          }
        });
      }

      if (index == 1){
        setTimeout(() => {
        if (this.resourceJsonEditor){
            this.resourceJsonEditor.resize();
          }
        });
      }

      if (index == 3) {
        // Workaround to refresh the display in the response editor when it is updated while the form is not visible
        // https://github.com/ajaxorg/ace/issues/2497#issuecomment-102633605
        setTimeout(() => {
        });
      }
    },
    readParametersFromQuery(): TestFhirpathData {
      let data: TestFhirpathData = {
        expression: this.$route.query.expression as string
      };
      if (this.$route.query.libaryId as string) {
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
          data.resourceJson = decompressFromEncodedURIComponent(resourceJson) ?? '';
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
    async applyParameters(p: TestFhirpathData) {
      if (p.libraryId) {
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

          const resourceJson = p.resourceJson;
          if (resourceJson) {
            this.resourceJsonEditor?.setValue(JSON.stringify(JSON.parse(resourceJson), null, 2));
            this.resourceJsonChanged = true;
            this.resourceId = undefined;
            this.resourceJsonEditor?.clearSelection();
          }

          if (this.expressionEditor) {
            this.expressionEditor.setValue(p.expression ?? '');
            this.expressionEditor.clearSelection();
          }
        }
      }
    },
    resetExpression(): void {
      if (this.expressionEditor) {
        this.expressionEditor.setValue('');
        this.expressionEditor.clearSelection();
        this.expressionEditor.focus();
      }
    },
    resourceJsonChangedEvent() {
      this.resourceJsonChanged = true;
      console.log('enable save resourceJSON');
    },
    fhirpathExpressionChangedEvent() {
      // Check the expression to see if there are any variables in there
      const session = this.expressionEditor?.session;
      if (session) {
        const count = session.doc.getLength();
        console.log('enable save expr change');
      }
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
      this.showAdvancedSettings = settings.showAdvancedSettings();
      this.defaultProviderField = settings.getDefaultProviderField();
      this.$forceUpdate();
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
      console.log(result);
      // if (this.debugEditor) {
      //   this.debugEditor.setValue(result);
      //   this.debugEditor.clearSelection();
      //   this.debugEditor.renderer.updateFull(true);
      // }
    },

    reformatTestResource() {
      if (this.resourceJsonEditor) {
        const jsonValue = this.resourceJsonEditor.getValue();
        try {
          this.resourceJsonEditor.setValue(JSON.stringify(JSON.parse(jsonValue), null, 4));
          this.resourceJsonEditor.clearSelection();
          this.resourceJsonEditor.renderer.updateFull(true);
        }
        catch { }
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
          this.saveOutcome = CreateOperationOutcome("fatal", "exception", "Server: " + err.message, undefined, err.code);
          this.showOutcome = true;
          return;
        }
        this.saveOutcome = CreateOperationOutcome("fatal", "exception", "Client: " + err);
        this.showOutcome = true;
      }
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
      this.outputResult = [];
      this.setResultJson('');

      // run the actual fhirpath engine
      let fhirData: any = { resourceType: 'Patient' }; // some dummy data
      const resourceJson = this.getResourceJson();
      if (resourceJson) {
        try {
          fhirData = JSON.parse(resourceJson);
          this.resourceType = fhirData.resourceType;
        }
        catch (err: any) {
          console.log(err);
          if (err.message) {
            this.saveOutcome = CreateOperationOutcome('fatal', 'exception', err.message);
            this.showOutcome = true;
          }
        }
      }

      let useExpression = this.getFhirpathExpression() ?? '';
      // (this as any).$appInsights?.trackEvent({ name: 'evaluate sqlonfhir-v2' });

      try {
        // Run the sqlonfhir view definition
        var r = processResources(fromArray([fhirData]), JSON.parse(useExpression));
        for await (const val of r) {
          console.log(val);
          this.outputResult.push(val);
        }
      }
      catch (err: any) {
        console.log(err);
        if (err.message) {
          this.expressionParseOutcome = CreateOperationOutcome('fatal', 'exception', err.message);
          // this.showOutcome = true;
        }
      }
    },

    showShareLink(): boolean {
      if (navigator?.clipboard) {
        return true;
      }
      return false;
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
      let shareUrl = `${url.origin}/sqlonfhir?expression=${encodeURIComponent(this.getFhirpathExpression() ?? '')}`;
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

      if (navigator.clipboard) {
        navigator.clipboard.writeText(shareUrl);
        this.shareToolTipMessage = "Copied";
      }
      if (this.showAdvancedSettings) {
        let packageData: TestFhirpathData = this.prepareSharePackageData();
        const compressedData = EncodeTestFhirpathData(packageData);
        shareUrl = `${url.origin}/sqlonfhir?parameters=${compressedData}`;
        navigator.clipboard.writeText(shareUrl);
        console.log(DecodeTestFhirpathData(compressedData));
      }
    },

    prepareSharePackageData(): TestFhirpathData {
      let packageData: TestFhirpathData = {
        expression: this.getFhirpathExpression() ?? '',
        resource: this.resourceId,
        engine: undefined,
        terminologyServer: undefined,
      };

      const resourceJson = this.getResourceJson();
      if (resourceJson && this.resourceJsonChanged) {
        try {
          packageData.resourceJson = JSON.stringify(JSON.parse(resourceJson));
        } catch { }
      }
      return packageData;
    },
    copyZulipShareLinkToClipboard() {
      const url = new URL(window.location.href);
      let packageData: TestFhirpathData = this.prepareSharePackageData();
      const compressedData = EncodeTestFhirpathData(packageData);
      const shareUrl = `\`\`\`fhirpath\n${packageData.expression}\n\`\`\`\n:test_tube: [Test with FHIRPath-Lab](${url.origin}/sqlonfhir?parameters=${compressedData})`;
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
        context: undefined,
        expression: this.getFhirpathExpression() ?? '',
        resourceId: this.resourceId,
        engine: '',
        resourceJson: this.getResourceJson(),
        loadCompleted: loadCompleted,
      };
      settings.saveLastUsedParameters(data);
    },

    // https://www.sitepoint.com/fetching-data-third-party-api-vue-axios/
    async evaluateFhirPathExpression() {

      // reset the processing engine
      this.expressionParseOutcome = undefined;
      this.saveLastUsedParameters(false);
      await this.evaluateExpressionUsingFhirpathJs();
      this.saveLastUsedParameters(true);
      if (this.prevFocus) {
        this.prevFocus.focus();
      }
    },
  },
  data(): FhirPathData {
    return {
      prevFocus: null,
      outputResult: [],
      tab: null,
      resourceId: undefined,
      resourceType: 'Patient',
      resourceJsonChanged: false,
      loadingData: true,
      saveOutcome: undefined,
      showOutcome: false,
      showAdvancedSettings: false,
      defaultProviderField: undefined,
      shareToolTipMessage: shareTooltipText,
      shareZulipToolTipMessage: shareZulipTooltipText,
      expressionEditor: undefined,
      resourceJsonEditor: undefined,
      expressionParseOutcome: undefined,
    };
  },
});
</script>
