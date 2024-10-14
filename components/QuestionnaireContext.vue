<template>
  <div>
    <v-text-field label="Subject Type (read-only)" v-if="questionnaire" readonly :value="questionnaire.subjectType"
    hide-details="auto" />
    <label><i>The Subject Type is set in the Questionnaire and restricts down the subject to a specific set of resource types (often just Patient)</i></label>
    <v-text-field :label="subjectId_label" v-model="subjectId" hide-details="auto" @change="notifyChange" />
    <v-text-field :label="subjectDisplay_label" v-model="subjectDisplay" hide-details="auto" @change="notifyChange" />
    <label><i>The subject of the questionnaire response</i></label>
    <br />

    <v-text-field label="Encounter Reference" v-model="encounterId" hide-details="auto" @change="notifyChange" />
    <v-text-field label="Encounter Display" v-model="encounterDisplay" hide-details="auto" @change="notifyChange" />
    <label><i>The Encounter during which this questionnaire response was created or to which the creation of this record is tightly associated (optional)</i></label>
    <br />

    <v-text-field label="Author Reference" v-model="authorId" hide-details="auto" @change="notifyChange" />
    <v-text-field label="Author Display" v-model="authorDisplay" hide-details="auto" @change="notifyChange" />
    <label><i>The person who entered the answers in this questionnaire response</i></label>
    <br />

    <v-text-field label="Source Reference" v-model="sourceId" hide-details="auto" @change="notifyChange" />
    <v-text-field label="Source Display" v-model="sourceDisplay" hide-details="auto" @change="notifyChange" />
    <label><i>The person who answered the questions about the subject (optional)</i></label>
  </div>
</template>

<style lang="scss" scoped></style>

<script lang="ts">
import { Questionnaire, QuestionnaireResponse, Parameters, Reference } from "fhir/r4b";
import { Context } from "fhirpath";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

export interface ContextData {
  subject?: Reference;
  encounter?: Reference;
  author?: Reference;
  source?: Reference;
}

@Component
export default class QuestionnaireContext extends Vue {

  // Properties provided by the parent component
  @Prop() readonly questionnaire: Questionnaire | undefined;
  @Prop() readonly context: ContextData | undefined;

  // Properties visible to the local template
  public subjectId: string = '';
  public subjectDisplay: string = '';

  public encounterId: string = '';
  public encounterDisplay: string = '';

  public authorId: string = '';
  public authorDisplay: string = '';

  public sourceId: string = '';
  public sourceDisplay: string = '';

  public get subjectId_label() {
    if (!this.questionnaire?.subjectType)
      return 'Subject Reference';
    return this.questionnaire.subjectType + ' Reference (subject)';
  }

  public get subjectDisplay_label() {
    if (!this.questionnaire?.subjectType)
      return 'Subject Display';
    return this.questionnaire.subjectType + ' Display (subject)';
  }

  private notifyChange() {
    let context: ContextData = this.getContextData()
    this.$emit('context-changed', context);
  }

  @Watch('context', { immediate: true, deep: true })
  async onContextDataChanged() {

    // console.log('onContextDataChanged', this.context);
    if (this.context?.subject) {
      this.subjectId = this.context.subject.reference ?? '';
      this.subjectDisplay = this.context.subject.display ?? '';
    }
    if (this.context?.author) {
      this.authorId = this.context.author.reference ?? '';
      this.authorDisplay = this.context.author.display ?? '';
    }
    if (this.context?.encounter) {
      this.encounterId = this.context.encounter.reference ?? '';
      this.encounterDisplay = this.context.encounter.display ?? '';
    }
    if (this.context?.source) {
      this.sourceId = this.context.source.reference ?? '';
      this.sourceDisplay = this.context.source.display ?? '';
    }
  }

  public getContextData(): ContextData {
    let context: Context = {};
    if (this.subjectId?.length > 0 || this.subjectDisplay?.length > 0) {
      context.subject = {};
      if (this.subjectId?.length > 0) {
        context.subject.reference = this.subjectId;
      }
      if (this.subjectDisplay?.length > 0) {
        context.subject.display = this.subjectDisplay;
      }
    }
    if (this.encounterId?.length > 0 || this.encounterDisplay?.length > 0) {
      context.encounter = {};
      if (this.encounterId?.length > 0) {
        context.encounter.reference = this.encounterId;
      }
      if (this.encounterDisplay?.length > 0) {
        context.encounter.display = this.encounterDisplay;
      }
    }
    if (this.authorId?.length > 0 || this.authorDisplay?.length > 0) {
      context.author = {};
      if (this.authorId?.length > 0) {
        context.author.reference = this.authorId;
      }
      if (this.authorDisplay?.length > 0) {
        context.author.display = this.authorDisplay;
      }
    }
    if (this.sourceId?.length > 0 || this.sourceDisplay?.length > 0) {
      context.source = {};
      if (this.sourceId?.length > 0) {
        context.source.reference = this.sourceId;
      }
      if (this.sourceDisplay?.length > 0) {
        context.source.display = this.sourceDisplay;
      }
    }
    return context;
  }
}

</script>
