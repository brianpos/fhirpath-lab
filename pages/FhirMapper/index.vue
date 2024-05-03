<template>
  <div>
    <HeaderNavbar :extended="false">
    </HeaderNavbar>

    <div class="container-fluid bd-layout" style="padding-top: 80px">
      <v-card class="workspace">
        <v-toolbar flat color="primary">
          <v-toolbar-title>Convert Map to/from xml/json</v-toolbar-title>
        </v-toolbar>
        <div class="newlayout">
          <div>
            <div class="context">
              <v-icon left> mdi-function-variant </v-icon>
              FHIR Mapping Language (fml/map)
            </div>
            <div class="newcontent">
              <div width="100%" ref="aceEditorMap"></div>
              <div class="ace_editor_footer"></div>
            </div>
          </div>
          <div>
            <div class="context button-header">
              &nbsp;
            </div>
            <div class="newcontent" style="align-content: space-around;">
              <div class="map-buttons">
                <v-btn title="Convert map to json" @click="convertToJson"> JSON <v-icon right>
                    mdi-arrow-right-bold-outline </v-icon></v-btn>
                <v-btn title="Convert map to xml" @click="convertToXml"> XML <v-icon right> mdi-arrow-right-bold-outline
                  </v-icon></v-btn>
              </div>
            </div>
          </div>
          <div>
            <div class="context">
              <v-icon left> mdi-file-document-outline </v-icon>
              XML/JSON
            </div>
            <div class="newcontent">
              <div width="100%" ref="aceEditorJson"></div>
              <div class="ace_editor_footer"></div>
            </div>
          </div>
        </div>
      </v-card>

      <br />
      <OperationOutcomeOverlay v-if="showOutcome" :saveOutcome="saveOutcome" :showOutcome="showOutcome" title="Error"
        @close="clearOutcome" />
    </div>
  </div>
</template>

<style lang="scss">
.v-application--wrap {
  background-color: lightgray;
}
</style>

<style lang="scss" scoped>
.workspace {
  height: calc(100vh - 104px);
  display: grid;
  grid-template-rows: 64px auto;
}

.context.button-header {
  background-color: unset;
  border: none;
}

.map-buttons {
  display: grid;
  grid-template-rows: auto auto;
  gap: 12px;
}

.newlayout>div {
  display: grid;
  grid-template-rows: min-content;
}

.newlayout {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 12px;
  margin-right: 14px;
  padding: 16px;

  .context {
    padding: 12px;
    padding-top: 6px;
    padding-bottom: 6px;
    margin-bottom: 4px;
    text-transform: uppercase;
  }

  .newcontent {
    // border: solid blue 1px;
    padding: 4px;
    overflow-y: auto;
    display: grid;
    grid-template-rows: auto min-content;
  }
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
tr.ve-table-body-tr {
  cursor: pointer;
}

.left-resource {
  display: flex;
}

.right-resource {
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
  text-transform: none;
}
</style>

<script lang="ts">
import Vue from "vue";
import { settings } from "~/helpers/user_settings";
import {
  requestFhirMapAcceptHeaders,
  requestFhirAcceptHeaders,
  requestFhirContentTypeHeaders,
} from "~/helpers/searchFhir";
import axios, { AxiosRequestHeaders, AxiosResponse } from "axios";
import { AxiosError } from "axios";
import { CancelTokenSource } from "axios";
import { Rules as FhirPathHightlighter_Rules, setCustomHighlightRules } from "~/helpers/fhirpath_highlighter"
import "~/assets/fhirpath_highlighter.scss"

import "ace-builds";
import ace from "ace-builds";
import "ace-builds/src-noconflict/mode-text";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-xml";
import "ace-builds/src-noconflict/theme-chrome";

interface FhirMapConverterData {
  loadingData: boolean;
  saveOutcome?: fhir4b.OperationOutcome;
  showOutcome?: boolean;
  cancelSource?: CancelTokenSource;
  fmlEditor?: ace.Ace.Editor;
  jsonEditor?: ace.Ace.Editor;
}

interface IFhirMapConverterMethods {
  getMapText(): string | undefined;
  getFhirText(): string | undefined;
  convertToXml(): void;
  convertToJson(): void;
  clearOutcome(): void;
  setFhirData(result: string): void;
  convertStructureMap(map: string, contentType: string): void;
}

interface IFhirMapConverterComputed {

}

export default Vue.extend<FhirMapConverterData, IFhirMapConverterMethods, IFhirMapConverterComputed>({
  head: {
    title: "FML Converter",
  },
  async mounted() {
    const CDN = 'https://cdn.jsdelivr.net/npm/ace-builds@1.6.0/src-min-noconflict';
    if (true) {
      ace.config.set('basePath', CDN);
      ace.config.set('modePath', CDN);
      ace.config.set('themePath', CDN);
      ace.config.set('workerPath', CDN);
    }

    // Update the editor's Mode
    var editorDiv: any = this.$refs.aceEditorMap as Element;
    if (editorDiv) {
      this.fmlEditor = ace.edit(editorDiv, {
        wrap: "free",
        minLines: 16,
        highlightActiveLine: false,
        showGutter: true,
        fontSize: 14,
        cursorStyle: "slim",
        showPrintMargin: false,
        theme: "ace/theme/chrome",
        mode: "ace/mode/text",
        wrapBehavioursEnabled: true
      });

      setCustomHighlightRules(this.fmlEditor, FhirPathHightlighter_Rules);
      this.fmlEditor.setValue(`/// name = "SDOHCC-PRAPARE-Map"
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
      this.fmlEditor.clearSelection();
    }

    var editorDebugDiv: any = this.$refs.aceEditorJson as Element;
    if (editorDebugDiv) {
      this.jsonEditor = ace.edit(editorDebugDiv, {
        wrap: "free",
        readOnly: true,
        minLines: 16,
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

    this.loadingData = false;
  },
  methods: {
    getMapText(): string | undefined {
      const fml = this.fmlEditor?.getValue();
      if (fml && fml.length > 0) {
        return fml;
      }
      return undefined;
    },

    getFhirText(): string | undefined {
      const json = this.jsonEditor?.getValue();
      if (json && json.length > 0) {
        return json;
      }
      return undefined;
    },

    convertToXml() {
      this.setFhirData('');
      this.jsonEditor?.setOption('mode', "ace/mode/xml");
      const fml = this.getMapText();
      if (fml)
        this.convertStructureMap(fml, "application/xml+fhir");
    },
    convertToJson() {
      this.setFhirData('');
      this.jsonEditor?.setOption('mode', "ace/mode/json");
      const fml = this.getMapText();
      if (fml)
        this.convertStructureMap(fml, "application/json+fhir");
    },
    clearOutcome() {
      this.showOutcome = undefined;
    },

    setFhirData(result: string) {
      if (this.jsonEditor) {
        this.jsonEditor.setValue(result);
        this.jsonEditor.clearSelection();
        this.jsonEditor.renderer.updateFull(true);
      }
    },

    async convertStructureMap(map: string, contentType: string) {
      try {
        let url = settings.getFhirServerUrl() + '/$convert';
        // this is the Java 'matchbox' engine
        // url = 'https://test.ahdis.ch/matchbox/fhir/$convert';
        url = "https://fhir.forms-lab.com/$convert";

        if (this.cancelSource) this.cancelSource.cancel("new convert map started");
        this.cancelSource = axios.CancelToken.source();
        this.loadingData = true;
        let token = this.cancelSource.token;
        let headers: AxiosRequestHeaders = {
          "Cache-Control": "no-cache",
          "Content-Type": requestFhirMapAcceptHeaders,
          "Accept": contentType
        }
        const response = await axios.post<string>(url, map, {
          cancelToken: token,
          headers: headers,
          transformResponse: (r) => r,
        });
        if (token.reason) {
          console.log(token.reason);
          return;
        }
        this.cancelSource = undefined;
        this.loadingData = false;

        const results = response.data;
        if (results) {
          this.setFhirData(results);
        }
      } catch (err) {
        this.loadingData = false;
        if (axios.isAxiosError(err)) {
          const serverError = err as AxiosError<string>;
          if (serverError && serverError.response) {
            if (serverError.response.headers["content-type"].includes("json")) {
              const errorJson = JSON.parse(serverError.response.data);
              console.log(errorJson);
              if (errorJson?.resourceType == 'OperationOutcome') {
                this.showOutcome = true;
                this.saveOutcome = errorJson;
                return;
              }
            }

            // Wasn't a json formatted error message (probably due to asing for XML)
            this.saveOutcome = { resourceType: 'OperationOutcome', issue: [] }
            if (serverError.response.status == 400) {
              this.saveOutcome.issue.push({ code: 'unknown', severity: 'error', details: { text: 'The map is not valid - likely a parse error' } });
            } else {
              this.saveOutcome.issue.push({ code: 'unknown', severity: 'error', details: { text: 'An unknown error occurred' } });
            }
            this.showOutcome = true;
            return serverError.response.data;
          }
        } else {
          console.log("Client Error:", err);
        }
      }
    },

  },
  data(): FhirMapConverterData {
    return {
      loadingData: true,
      saveOutcome: undefined,
      showOutcome: false,
      cancelSource: undefined,
      fmlEditor: undefined,
      jsonEditor: undefined,
    };
  },
});
</script>
