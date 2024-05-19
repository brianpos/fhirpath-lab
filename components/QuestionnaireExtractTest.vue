<template>
  <div class="ace_editor">
    <div height="85px" width="100%" ref="aceEditorExpression"></div>
    <v-textarea auto-grow :rows="5" label="Field"  />
    <div class="ace_editor_footer"></div>
    <v-textarea auto-grow :rows="5" label="Field" :value="JSON.stringify(questionnaire, null, 2)" />
    <v-textarea auto-grow :rows="5" label="Field" :value="JSON.stringify(questionnaireResponse, null, 2)" />
  </div>
</template>

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
import { Questionnaire, QuestionnaireResponse } from "fhir/r4b";
import { Component, Prop, Vue } from "vue-property-decorator";

import "ace-builds";
import ace from "ace-builds";
import "ace-builds/src-noconflict/mode-text";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-chrome";

import { Rules as FhirPathHightlighter_Rules, setCustomHighlightRules } from "~/helpers/fhirpath_highlighter"
import "~/assets/fhirpath_highlighter.scss"

@Component
export default class QuestionnaireExtractTest extends Vue {

  // Properties provided by the parent component
  @Prop() readonly questionnaire: Questionnaire | undefined;
  @Prop() readonly questionnaireResponse: QuestionnaireResponse | undefined;

  // Properties visible to the local template
  public selectedTabValue: number = 2;

  // Internal variables
  expressionEditor?: ace.Ace.Editor | undefined = undefined;
  public internalValue: string | undefined = undefined;

  public setValue(value: string | undefined): void {
    this.internalValue = value;
    this.ensureEditorIsCreated();
    this.expressionEditor?.setValue(value ?? "");
    // this.expressionEditor?.clearSelection();
  }

  public getValue(): string | undefined {
    // if (!this.expressionEditor)
      return this.internalValue;
    
    // return this.expressionEditor?.getValue();
  }

  ensureEditorIsCreated(): void {
    try {
      var editorDiv: any = this.$refs.aceEditorExpression as HTMLDivElement;
      if (editorDiv && this.expressionEditor === undefined) {
        console.log("need to create the editor");
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
         console.log("extract initialized");

        if (this.expressionEditor){
          setCustomHighlightRules(this.expressionEditor, FhirPathHightlighter_Rules);
          this.expressionEditor.setValue(this.internalValue ?? "");
          this.expressionEditor.clearSelection();
          // this.expressionEditor.on("change", this.fhirpathExpressionChangedEvent)
          console.log("editor configured");
        }
        else{
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
    this.internalValue = JSON.stringify(this.questionnaire, null, 2);
    console.log('updated');
    this.$nextTick(() => {
      if (this.expressionEditor){
        this.expressionEditor.renderer.updateFull(true)
        this.expressionEditor.resize();
      }
    });
  }
}

</script>
