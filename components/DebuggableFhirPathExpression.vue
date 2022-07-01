<template>
  <div
    class="
      trigger-item
      v-input--is-focused
      v-input v-text-field v-text-field--is-booted
    "
  >
    <div class="v-input__slot" style="align-items: flex-start;">
      <label
        ref="labelControl"
        v-if="label"
        style="position: absolute; z-index: 10; left: 0px; right: auto"
        class="v-label theme--light v-label--active"
        >{{ label }}</label
      >
      <div
        height="85px"
        width="100%"
        style="height: 85px; width: 100%; margin-bottom: 8px; margin-top: 4px"
        ref="aceEditorTrigger"
      ></div>
      <div
        class="ace_editor_footer"
        style="position: absolute; left: 0px; right: 0px; bottom: 0px"
      ></div>
      <v-btn
        icon
        small
        tile
        target="blank"
        :href="href"
        title="Debug this expression with the fhirpath tester"
      >
        <v-icon> mdi-bug-outline </v-icon>
      </v-btn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.trigger-item {
  display: flex;
  align-items: flex-start;
  flex: 1 0 auto;
  position: relative;
  padding-top: 12px;
  margin-top: 4px;
}
</style>

<script lang="ts">
import Vue, { PropType } from "vue";

import "ace-builds";
import ace from "ace-builds";
import "ace-builds/src-noconflict/mode-text";
import "ace-builds/src-noconflict/theme-chrome";
import {
  Rules as FhirPathHightlighter_Rules,
  setCustomHighlightRules,
} from "~/helpers/fhirpath_highlighter";
import "~/assets/fhirpath_highlighter.scss";

interface TriggerData {
  triggerEditor?: ace.Ace.Editor;
  updatingValue: boolean;
}

export default Vue.extend({
  props: {
    label: String,
    href: String,
    minLines: Number,
    readonly: { type: Boolean, required: false, default: false },
    value: String as PropType<string | undefined>,
  },
  mounted() {
    const CDN =
      "https://cdn.jsdelivr.net/npm/ace-builds@1.6.0/src-min-noconflict";
    if (true) {
      ace.config.set("basePath", CDN);
      ace.config.set("modePath", CDN);
      ace.config.set("themePath", CDN);
      ace.config.set("workerPath", CDN);
    }

    // Update the editor's Mode
    var editorCtxtDiv: any = this.$refs.aceEditorTrigger as Element;
    if (editorCtxtDiv) {
      this.triggerEditor = ace.edit(editorCtxtDiv, {
        wrap: "free",
        readOnly: this.readonly,
        minLines: this.minLines,
        maxLines: Infinity,
        highlightActiveLine: false,
        showGutter: false,
        fontSize: 16,
        cursorStyle: "slim",
        showPrintMargin: false,
        theme: "ace/theme/chrome",
        mode: "ace/mode/text",
        wrapBehavioursEnabled: true,
      });

      this.triggerEditor.on("blur", () => {
        if (this.value) {
          (this.$refs.labelControl as Element)?.classList.add(
            "v-label--active"
          );
        } else {
          (this.$refs.labelControl as Element)?.classList.remove(
            "v-label--active"
          );
        }
      });
      this.triggerEditor.on("focus", () => {
        (this.$refs.labelControl as Element)?.classList.add("v-label--active");
      });
      setCustomHighlightRules(this.triggerEditor, FhirPathHightlighter_Rules);
      if (this.value) {
        this.triggerEditor.setValue(this.value); // default value
        this.triggerEditor.clearSelection();
      }
      this.triggerEditor.session.on("change", () => {
        const currentValueInEditor = this.triggerEditor?.getValue();
        if (!this.updatingValue && this.value !== currentValueInEditor) {
          const e: InputEvent = new InputEvent("change", {
            data: currentValueInEditor,
          });
          this.updatingValue = true;
          this.$emit("change", e);
          this.updatingValue = false;
        }
      });
    }
  },
  updated() {
    if (this.updatingValue) return;
    const currentValueInEditor = this.triggerEditor?.getValue();
    if (this.value === currentValueInEditor) return;
    this.updatingValue = true;
    if (this.value) {
      this.triggerEditor?.setValue(this.value);
      (this.$refs.labelControl as Element)?.classList.add("v-label--active");
    } else {
      this.triggerEditor?.setValue("");
      (this.$refs.labelControl as Element)?.classList.remove("v-label--active");
    }
    this.triggerEditor?.clearSelection();
    this.updatingValue = false;
  },
  methods: {
    notifyChange() {
      this.$emit("update");
    },
  },
  data(): TriggerData {
    return {
      triggerEditor: undefined,
      updatingValue: false,
    };
  },
});
</script>
