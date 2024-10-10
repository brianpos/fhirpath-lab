<template>
  <div style="display: flex; flex-direction: column; height: 100%;">
    <v-text-field label="Extract Service URL" v-model="extractServiceUrl" :loading="extractingInProgress">
      <template v-slot:append>
        <v-btn @click="performExtractOperation">
          Extract!
        </v-btn>
      </template>
    </v-text-field>
    <div class="ace_editor" width="100%" ref="aceEditorExpressionExtract"></div>
    <div class="ace_editor_footer"></div>
    <v-expansion-panels accordion expanded >
      <v-expansion-panel :isActive="true">
        <v-expansion-panel-header>
          Debug Extract Parameters
          <template v-slot:actions>
            <v-icon>mdi-chevron-up</v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <resource-editor style="height: 35vh;" :readOnly="true" :resourceText="JSON.stringify(extractParameters, null, 2)" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<style lang="scss">
.ace_editor {
  flex-grow: 1;
  width: 100%;
  height: 100%;
}

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

import ace from "ace-builds";
import "ace-builds/src-noconflict/mode-text";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-chrome";

import "~/assets/fhirpath_highlighter.scss"

@Component
export default class QuestionnaireExtractTest extends Vue {

  // QuestionnaireExtractTest(){
  //   this.extractParameters = "Extracting the questionnaire";
  // }

  // Properties provided by the parent component
  @Prop() readonly questionnaire: Questionnaire | undefined;
  @Prop() readonly questionnaireResponse: QuestionnaireResponse | undefined;
  @Prop() readonly models: string | undefined;

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
    this.extractParameters.parameter = [
      {
        name: "questionnaire-response",
        resource: this.questionnaireResponse
      }
    ];
    this.extractParameters.parameter.push({
      name: "questionnaire",
      resource: this.questionnaire
    });
    if (this.models != undefined) {
      this.extractParameters.parameter.push({ name: "model", valueString: this.models });
    }
    this.expressionEditor?.setValue('');
    this.expressionEditor?.clearSelection();

    // Now pass this to the extract service
    this.extractingInProgress = true;

    // Send the extract request
    try {
      this.$emit('outcome', undefined); // reset the outcome to clear any previous issues
      const response = await fetch(this.extractServiceUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(this.extractParameters)
      });
      if (response.ok) {
        const extractResponse = await response.json();
        console.log("Extracted response", extractResponse);

        // if this is a Parameters object and has return and issues, then split them apart...
        if (extractResponse.resourceType === "Parameters") {
          const resultParameters = extractResponse as Parameters;
          const returnParameter = resultParameters.parameter?.find(p => p.name === "return");
          if (returnParameter) {
            this.expressionEditor?.setValue(JSON.stringify(returnParameter.resource, null, 2));
            this.expressionEditor?.clearSelection();
          }
          const issuesParameter = resultParameters.parameter?.find(p => p.name === "issues");
          if (issuesParameter) {
            this.$emit('outcome', issuesParameter.resource);
          }
        }
        else {
          this.expressionEditor?.setValue(JSON.stringify(extractResponse, null, 2));
          this.expressionEditor?.clearSelection();
        }
      }
      else {
        console.error("Failed to extract the questionnaire", response);
      }
    }
    catch (error) {
      console.error("Error extracting the questionnaire", error);
    }
    this.extractingInProgress = false;
  }

  @Watch('questionnaireResponse', { immediate: true, deep: false })
  async onQuestionnaireResponseChanged() {
    console.log("QR changed", this.questionnaireResponse);
  }

  @Watch('questionnaire', { immediate: false, deep: true })
  async onQuestionnaireChanged() {
    console.log("Q changed");
  }

  ensureEditorIsCreated(): void {
    try {
      let editorDiv: any = this.$refs.aceEditorExpressionExtract as HTMLDivElement;
      if (editorDiv && this.expressionEditor === undefined) {
        this.expressionEditor = ace.edit(editorDiv, {
          wrap: "free",
          highlightActiveLine: false,
          showGutter: true,
          fontSize: 14,
          cursorStyle: "slim",
          showPrintMargin: false,
          theme: "ace/theme/chrome",
          mode: "ace/mode/json",
          wrapBehavioursEnabled: true
        });
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
