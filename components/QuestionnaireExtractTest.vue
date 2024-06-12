<template>
  <div class="ace_editor">
    <v-text-field label="Extract Service URL" v-model="extractServiceUrl" :loading="extractingInProgress">
      <template v-slot:append>
        <v-btn @click="performExtractOperation">
          Extract!
        </v-btn>
      </template>
    </v-text-field>
    <div height="85px" width="100%" ref="aceEditorExpression"></div>
    <div class="ace_editor_footer"></div>
    <v-expansion-panels accordion expanded>
      <v-expansion-panel :isActive="true">
        <v-expansion-panel-header>
          Debug Expand Details
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-textarea auto-grow :rows="5" class="small-textarea" label="Extract Parameters" :value="JSON.stringify(extractParameters, null, 2)" />
          <v-textarea :rows="5" class="small-textarea " label="Questionnaire" :value="JSON.stringify(questionnaire, null, 2)" />
          <v-textarea :rows="5" class="small-textarea " label="QuestionnaireResponse" :value="JSON.stringify(questionnaireResponse, null, 2)" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<style lang="scss">
.small-textarea .v-text-field__slot textarea {
  font-size: 0.75em;
  line-height: revert;
}
</style>

<style lang="scss" scoped>

.bare-label {
  transform-origin: top left;
  transform: scale(0.75);
  margin-top: 8px;
  height: 20px;
}

.ace_editor:focus-within+.ace_editor_footer {
  color: #1976d2;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}
</style>

<script lang="ts">
import { Parameters, Questionnaire, QuestionnaireResponse } from "fhir/r4b";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import "ace-builds";
import ace from "ace-builds";
import "ace-builds/src-noconflict/mode-text";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-chrome";

import { Rules as FhirPathHightlighter_Rules, setCustomHighlightRules } from "~/helpers/fhirpath_highlighter"
import "~/assets/fhirpath_highlighter.scss"

@Component
export default class QuestionnaireExtractTest extends Vue {

  // QuestionnaireExtractTest(){
  //   this.extractParameters = "Extracting the questionnaire";
  // }

  // Properties provided by the parent component
  @Prop() readonly questionnaire: Questionnaire | undefined;
  @Prop() readonly questionnaireResponse: QuestionnaireResponse | undefined;

  // Properties visible to the local template
  public selectedTabValue: number = 2;
  public extractParameters: Parameters = { resourceType: "Parameters", parameter: [] };
  public extractServiceUrl: string = "https://fhir.forms-lab.com/QuestionnaireResponse/$extract";
  public extractingInProgress: boolean = false;

  // Internal variables
  expressionEditor?: ace.Ace.Editor | undefined = undefined;
  public internalValue: string | undefined = undefined;

  public setValue(value: string | undefined): void {
    console.log("setValue called");
    this.internalValue = value;
    this.ensureEditorIsCreated();
    // this.expressionEditor?.setValue(value ?? "");
    // this.expressionEditor?.clearSelection();
  }

  async performExtractOperation(): Promise<void> {
    console.log("Extracting the questionnaire");

    // update the parameters object for the extract
    let typeBasedExtract = this.extractServiceUrl.endsWith("/QuestionnaireResponse/$extract");
    this.extractParameters.parameter = [
      {
        name: "questionnaire-response",
        resource: this.questionnaireResponse
      }
    ];
    if (typeBasedExtract) {
      this.extractParameters.parameter.push({
        name: "type",
        valueString: "Questionnaire"
      });
    }
    this.expressionEditor?.setValue('');
    this.expressionEditor?.clearSelection();

    // Now pass this to the extract service
    this.extractingInProgress = true;

    // Send the extract request
    try
    {
      const response = await fetch(this.extractServiceUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(this.extractParameters)
      });
      if (response.ok)
      {
        const extractResponse = await response.json();
        this.expressionEditor?.setValue(JSON.stringify(extractResponse, null, 2));
        this.expressionEditor?.clearSelection();
        console.log("Extracted response", extractResponse);
      }
      else
      {
        console.error("Failed to extract the questionnaire", response);
      }
    }
    catch (error)
    {
      console.error("Error extracting the questionnaire", error);
    }
    this.extractingInProgress = false;
  }

  @Watch('questionnaireResponse', { immediate: false, deep: true })
  async onQuestionnaireResponseChanged() {
    console.log("QR changed");
  }

  @Watch('questionnaire', { immediate: false, deep: true })
  async onQuestionnaireChanged() {
    console.log("Q changed");
  }

  ensureEditorIsCreated(): void {
    try {
      var editorDiv: any = this.$refs.aceEditorExpression as HTMLDivElement;
      if (editorDiv && this.expressionEditor === undefined) {
        console.log("creating the extract ace editor");
        this.expressionEditor = ace.edit(editorDiv, {
          wrap: "free",
          minLines: 10,
          maxLines: 35,
          highlightActiveLine: false,
          showGutter: true,
          fontSize: 14,
          cursorStyle: "slim",
          showPrintMargin: false,
          theme: "ace/theme/chrome",
          mode: "ace/mode/json",
          wrapBehavioursEnabled: true
        });
        console.log("extract ace editor  initialized");

        if (this.expressionEditor) {
          setCustomHighlightRules(this.expressionEditor, FhirPathHightlighter_Rules);
          // this.expressionEditor.setValue(this.internalValue ?? "");
          // this.expressionEditor.clearSelection();
          // this.expressionEditor.on("change", this.fhirpathExpressionChangedEvent)
          console.log("editor configured");
        }
        else {
          console.error("Failed to create the editor");
        }
      }
    } catch (error) {
      console.error("Error creating the editor", error);
    }
  }

  mounted(): void {
    this.internalValue = JSON.stringify(this.questionnaire, null, 2);
    this.ensureEditorIsCreated();
  }

  updated(): void {
    this.ensureEditorIsCreated();
    console.log('updated');
    this.$nextTick(() => {
      if (this.expressionEditor) {
        this.expressionEditor.renderer.updateFull(true)
        this.expressionEditor.resize();
      }
    });
  }
}

</script>
