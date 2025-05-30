<template>
  <div>
    <template v-if="questionnaire">
      <v-btn style="position: absolute; right:34px; z-index: 2; margin-top: 4px;" color="primary"
        title="Show the QuestionnaireResponse based on the data in the CSIRO renderer" @click="logResponse()">Show
        Response</v-btn>
      <div class="q-host">
        <Renderer :questionnaire="questionnaire" :onFocus="onFocus" />
      </div>
    </template>
    <template v-else>
      <p>No questionnaire provided</p>
    </template>
  </div>
</template>

<style scoped>
pre {
  font-size: 0.75em;
}

.q-host {
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(100vh - 200px);
}
</style>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Emit } from 'vue-property-decorator';
import { applyReactInVue } from "vuereact-combined";
import { getResponse, buildForm } from "@aehrc/smart-forms-renderer";
import { Questionnaire, QuestionnaireResponse } from "fhir/r4b";
import { Questionnaire as QuestionnaireR4, QuestionnaireResponse as QuestionnaireResponseR4 } from "fhir/r4";
import SmartFormsRendererWithFocus from "./ReactRenderer";
import { ContextData } from '../QuestionnaireContext.vue';
import { settings } from '~/helpers/user_settings';

@Component({
  components: {
    Renderer: applyReactInVue(SmartFormsRendererWithFocus)
  }
})
export default class EditorRendererSection extends Vue {
  @Prop(Object) readonly questionnaire!: Questionnaire;
  @Prop() readonly context: ContextData | undefined;
  @Prop({ default: ''}) readonly dataServer!: string;

  get onFocus() {
    return (linkId: string) => { this.highlightPath(linkId); }
  }

  highlightPath(linkId: string) {
    // console.log('Field focused: ', linkId);
    this.$emit('highlight-path', linkId);
  }

  /** Show this QR in the display (if it wasn't generated by itself) */
  async renderQuestionnaireResponse(response: QuestionnaireResponse, questionnaire: Questionnaire) {
    if (response.meta?.tag?.find(t => t.code?.startsWith('csiro'))) {
      return;
    }
    console.log("Rendering response in CSIRO renderer", response);
    await buildForm(questionnaire as QuestionnaireR4, response as QuestionnaireResponseR4);
  }

  public logResponse() {
    const response = getResponse();
    // ensure there is a tag for the csiro renderer in place
    if (!response.meta?.tag?.find(t => t.code?.startsWith('csiro'))) {
      if (!response.meta) response.meta = { tag: [] };
      if (!response.meta.tag) response.meta.tag = [];
      response.meta.tag!.push({ code: 'csiro:generated' });
    }

    // remove the lforms tag if it was there.
    if (response.meta?.tag?.find(t => t.code?.startsWith('lforms'))) {
      response.meta.tag = response.meta.tag!.filter(t => !t.code?.startsWith('lforms'));
    }

    // this.response = response;
    console.log(response)
    this.$emit('response', response);
  }
}
</script>
