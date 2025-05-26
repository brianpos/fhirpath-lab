<template>
  <div class="resource-json-editor" style="display: flex; flex-direction: column; height: 100%;">
    <v-text-field v-if="label && label.length > 0" :label="label" :readonly="readOnly" v-model="internalResourceUrl" :loading="downloadingInProgress"
      hide-details="auto" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
      <template v-slot:prepend>
        <slot name="prepend"></slot>
      </template>
      <template v-slot:append>
        <v-btn icon small tile v-show="internalResourceUrl && !readOnly" @click="clearUrl" :title="'Clear ' + label">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-btn icon small tile v-show="!readOnly" :disabled="!internalResourceUrl" @click="downloadResource"
          :title="'Download ' + label">
          <v-icon>mdi-download</v-icon>
        </v-btn>
        <v-btn small icon tile @click="reformatResource">
          <v-icon :title="'Re-format the ' + resourceType + ' below'" dark>
            mdi-format-indent-increase
          </v-icon>
        </v-btn>
        <slot name="append"></slot>
      </template>
    </v-text-field>
    <label v-show="textLabel">{{ textLabel + ' ' + resourceType }}<i>{{ (resourceTextModified ? ' (modified)' : '') }}</i></label>
    <div ref="aceEditor" class="ace-editor" style="flex-grow: 1; width: 100%; height: 100%;"></div>
    <div class="ace_editor_footer"></div>
    <label v-show="footerLabel"><i>{{ footerLabel }}</i></label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import ace from 'ace-builds';
import 'ace-builds/webpack-resolver'; // Ensure the Ace editor assets are available
import { settings } from "~/helpers/user_settings";
import {
  requestFhirAcceptHeaders,
  CreateOperationOutcome,
} from "~/helpers/searchFhir";
import axios from "axios";
import { AxiosError } from "axios";
import { CancelTokenSource } from "axios";
import xmlFormat from 'xml-formatter';
import { IJsonNodePosition } from "~/helpers/json_parser";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-xml";
import { setAcePaths, Rules as FhirPathHightlighter_Rules, setCustomHighlightRules } from "~/helpers/fhirpath_highlighter"
import "~/assets/fhirpath_highlighter.scss"

@Component
export default class ResourceJsonEditor extends Vue {
  @Prop({ default: undefined }) readonly label!: string | undefined;
  @Prop({ default: '' }) readonly resourceUrl!: string;
  @Prop({ default: '' }) readonly resourceText!: string;
  @Prop({ default: false }) readonly readOnly!: boolean;
  @Prop({ default: undefined }) readonly textLabel!: string | undefined;
  @Prop({ default: undefined }) readonly footerLabel!: string | undefined;

  public async DownloadResource(url? : string) {
    if (url)
      this.internalResourceUrl = url;
    await this.downloadResource();
  }

  public navigateToPosition(position: IJsonNodePosition) {
    // Move the cursor in the resource editor to the position information
    this.aceEditor.clearSelection();
    this.aceEditor.focus();
    this.aceEditor.gotoLine(
      position.line,
      position.column,
      true
    );

    if (position.value_stop_pos) {
      let substr = this.internalResourceText.substring(position.prop_start_pos, position.value_stop_pos + 1);
      const endRowOffset = substr.split(/\r\n|\r|\n/).length;
      const endRow = position.line + endRowOffset - 1;
      const endCollOffset = substr.split(/\r\n|\r|\n/)[endRowOffset - 1].length;
      const endCol = position.column + (endCollOffset > 1 ? endCollOffset + 1 : endCollOffset);
      const range = new ace.Range(position.line - 1, position.column, endRow - 1, endCol);

      const selectionMarker = this.aceEditor.session.addMarker(range, "resultSelection", "fullLine", true);
      // after 1.5 seconds remove the highlight.
      setTimeout(() => {
        this.aceEditor?.session.removeMarker(selectionMarker);
      }, 1500);
    }
    // this.updateNow();
  }

  internalResourceUrl: string = this.resourceUrl ?? '';
  internalResourceText: string = this.resourceText;
  resourceTextFromFile: string | undefined = undefined;

  resourceType: string = 'json'; // Assume JSON by default
  downloadingInProgress: boolean = false;
  aceEditor: any = null;
  cancelSource?: CancelTokenSource;
  resourceTextModified: boolean = false;

  @Watch('resourceUrl')
  onResourceUrlChanged(newUrl: string) {
    this.internalResourceUrl = newUrl;
    // Additional logic if needed when resourceUrl changes
    // console.log('resource URL changed: ', newUrl);
  }

  @Watch('resourceText')
  onResourceTextChanged(newText: string) {
    if (this.internalResourceText != newText) {
      this.internalResourceText = newText;
      this.aceEditor.session.setValue(newText || '');
      this.detectResourceType();
      // console.log('resource Text changed: ', newText);
    }
  }

  @Watch('internalResourceUrl')
  onInternalResourceUrlChanged(newUrl: string) {
    this.$emit('update:resourceUrl', newUrl);
  }

  mounted() {
    this.initializeAceEditor();
    this.detectResourceType();
  }

  initializeAceEditor() {
    if (this.$refs.aceEditor) {
      var editorDiv: any = this.$refs.aceEditor as HTMLDivElement;
      this.aceEditor = ace.edit(editorDiv, {
        wrap: "free",
        highlightActiveLine: false,
        showGutter: true,
        tabSize: settings.getTabSpaces(),
        showPrintMargin: false,
        theme: "ace/theme/chrome",
        wrapBehavioursEnabled: true
      });
      this.aceEditor.getSession().setMode(`ace/mode/${this.resourceType}`);
      this.aceEditor.setValue(this.internalResourceText || '', -1);
      this.aceEditor.setReadOnly(this.readOnly);
      // console.log('Initializing ace editor for Resource editing');
      this.detectResourceType();
    }

    // Watch for changes in the editor and update the internalResourceText
    this.aceEditor.getSession().on('change', () => {
      // console.log('Change text detected');
      const currentText = this.aceEditor.getValue();
      if (currentText != this.internalResourceText) {
        // console.log('Change text detected -- really!');
        this.internalResourceText = currentText;
        this.resourceTextModified = (this.resourceTextFromFile != undefined && this.internalResourceText != this.resourceTextFromFile);

        this.detectResourceType();
        this.$emit('update:resourceText', this.internalResourceText);
      }
    });
  }

  detectResourceType() {
    const content = this.internalResourceText.trim();
    if (content.startsWith('<')) {
      if (this.resourceType != 'xml') {
        this.resourceType = 'xml';
        this.aceEditor.getSession().setMode('ace/mode/xml');
        // console.log('Changing to XML mode');
      }
    } else if (content.startsWith('///') || content.startsWith('map ')) {
      if (this.resourceType != 'fml') {
        this.resourceType = 'fml';
        this.aceEditor.getSession().setMode('ace/mode/text');
        setCustomHighlightRules(this.aceEditor, FhirPathHightlighter_Rules);
        // console.log('Changing to FML mode');
      }
    } else {
      if (this.resourceType != 'json') {
        this.resourceType = 'json';
        this.aceEditor.getSession().setMode('ace/mode/json');
        // console.log('Changing to json mode');
      }
    }
  }

  async downloadResource() {
    if (!this.internalResourceUrl) return;

    this.downloadingInProgress = true;
    // console.log('downloading ', this.resourceUrl, this.internalResourceUrl);

    try {
      if (!this.internalResourceUrl) return;
      let url = this.internalResourceUrl;
      if (this.internalResourceUrl && !this.internalResourceUrl.startsWith("http"))
        url = settings.getFhirServerExamplesUrl() + "/" + this.internalResourceUrl;

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
      this.downloadingInProgress = true;
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
      this.downloadingInProgress = false;

      const results = response.data;
      if (results) {
        if (this.aceEditor) {
          const resourceJson = JSON.stringify(results, null, settings.getTabSpaces());
          this.resourceTextFromFile = resourceJson;
          if (resourceJson) {
            this.aceEditor.setValue(resourceJson);
            // this.resourceJsonChanged = false;
          }
          this.aceEditor.clearSelection();
        }
      }
    } catch (err) {
      this.downloadingInProgress = false;
      let saveOutcome: fhir4b.OperationOutcome | undefined = undefined;
      if (axios.isAxiosError(err)) {
        const serverError = err as AxiosError<fhir4b.OperationOutcome>;
        if (serverError && serverError.response) {
          if (serverError.response.data?.resourceType == "OperationOutcome") {
            saveOutcome = serverError.response.data;
          } else {
            if (serverError.response.status == 404)
              saveOutcome = {
                resourceType: "OperationOutcome",
                issue: [],
              };
            saveOutcome?.issue.push({
              code: "not-found",
              severity: "error",
              details: { text: "Test resource not found" },
            });
          }
          // this.showOutcome = true;
          return;
        }
        saveOutcome = CreateOperationOutcome(
          "fatal",
          "exception",
          "Server: " + err.message,
          undefined,
          err.code
        );
        // this.showOutcome = true;
        return;
      }
      saveOutcome = CreateOperationOutcome(
        "fatal",
        "exception",
        "Client: " + err
      );
      // this.showOutcome = true;
    }
  }

  reformatResource() {
    const oldResourceTextModified = this.resourceTextModified;
    if (this.resourceType === 'json') {
      try {
        const parsedJson = JSON.parse(this.aceEditor.getValue());
        this.aceEditor.setValue(JSON.stringify(parsedJson, null, settings.getTabSpaces()), -1);
        this.aceEditor.clearSelection();
        this.aceEditor.renderer.updateFull(true);
      } catch (e) {
        alert('Invalid JSON');
      }
    }
    if (this.resourceType === 'xml') {
      try {
        let formattedXml = xmlFormat(this.aceEditor.getValue(), {
          indentation: '\t', // Tab for indentation
          collapseContent: true, // Keep content in the same line as the element
          lineSeparator: '\n' // Use newline as line separator
        });
        this.aceEditor.setValue(formattedXml);
        this.aceEditor.clearSelection();
        this.aceEditor.renderer.updateFull(true);
      } catch (e) {
        alert('Invalid XML');
      }
    }
    if (!oldResourceTextModified) {
      this.resourceTextFromFile = this.internalResourceText;
      this.resourceTextModified = oldResourceTextModified;
    }
  }

  clearUrl() {
    this.internalResourceUrl = '';
    this.$emit('update:resourceUrl', this.internalResourceUrl);
    this.resourceTextModified = false;
    this.resourceTextFromFile = undefined;
  }
}
</script>

<style scoped>
.ace-editor {
  flex-grow: 1;
  width: 100%;
  height: 100%;
}

.ace_editor:focus-within+.ace_editor_footer {
  color: #1976d2;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}
</style>
