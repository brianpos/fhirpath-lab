<template>
  <div class="context-control">
    <v-text-field label="Data Server" v-model="sourceFhirServer" @change="ChangeDataServer($event)" />

    <v-text-field :label="subjectId_label" v-model="subjectId" @change="notifyChange" hide-details="auto"
      hint="(QuestionnaireResponse.subject.reference)" />
    <v-text-field :label="subjectDisplay_label" v-model="subjectDisplay" @change="notifyChange"
      hint="(QuestionnaireResponse.subject.display)">
      <template v-slot:append v-if="subjectId.length > 0">
        <v-btn icon small tile @click="refreshSubjectDisplay" title="Read the display from the referenced resource">
          <v-icon> mdi-refresh </v-icon>
        </v-btn>
      </template>
    </v-text-field>

    <v-text-field :label="'Encounter Reference' + launchContextSuffix('encounter')" v-model="encounterId" @change="notifyChange" hide-details="auto"
      hint="(QuestionnaireResponse.encounter.reference)" />
    <v-text-field label="Encounter Display" v-model="encounterDisplay" @change="notifyChange"
      hint="(QuestionnaireResponse.encounter.display)">
      <template v-slot:append v-if="encounterId.length > 0">
        <v-btn icon small tile @click="refreshEncounterDisplay" title="Read the display from the referenced resource">
          <v-icon> mdi-refresh </v-icon>
        </v-btn>
      </template>
    </v-text-field>
    <p>
      <br />
    </p>

    <v-text-field :label="'Author Reference' + launchContextSuffix('user')" v-model="authorId" @change="notifyChange" hide-details="auto"
      hint="(QuestionnaireResponse.author.reference)" />
    <v-text-field label="Author Display" v-model="authorDisplay" @change="notifyChange"
      hint="(QuestionnaireResponse.author.display)">
      <template v-slot:append v-if="authorId.length > 0">
        <v-btn icon small tile @click="refreshAuthorDisplay" title="Read the display from the referenced resource">
          <v-icon> mdi-refresh </v-icon>
        </v-btn>
      </template>
    </v-text-field>
    <br />

    <v-text-field label="Source Reference" v-model="sourceId" @change="notifyChange" hide-details="auto"
      hint="(QuestionnaireResponse.source.reference)" />
    <v-text-field label="Source Display" v-model="sourceDisplay" @change="notifyChange"
      hint="(QuestionnaireResponse.source.display)">
      <template v-slot:append v-if="sourceId.length > 0">
        <v-btn icon small tile @click="refreshSourceDisplay" title="Read the display from the referenced resource">
          <v-icon> mdi-refresh </v-icon>
        </v-btn>
      </template>
    </v-text-field>
  </div>
</template>

<style lang="scss">
.context-control .v-messages {
  font-style: italic;
}
</style>

<script lang="ts">
import axios, { AxiosError } from "axios";
import { getExtension, getExtensionCodeValue, getExtensionCodingValue, getExtensions, getExtensionStringValue } from "fhir-extension-helpers";
import { structuredDataCapture } from "fhir-sdc-helpers";
import { Practitioner } from "fhir/r4";
import { Questionnaire, QuestionnaireResponse, Parameters, Reference, FhirResource, Patient, HumanName, RelatedPerson } from "fhir/r4b";
import { Context } from "fhirpath";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { CreateOperationOutcome, errorCodingSearch, requestFhirAcceptHeaders } from "~/helpers/searchFhir";
import { settings } from "~/helpers/user_settings";

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
  @Prop() readonly dataServer: string | undefined;

  public sourceFhirServer: string = '';

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
      return 'Subject Reference' + this.launchContextSuffix('patient');
    return this.questionnaire.subjectType + ' Reference' + this.launchContextSuffix('patient');
  }

  public get subjectDisplay_label() {
    if (!this.questionnaire?.subjectType)
      return 'Subject Display';
    return this.questionnaire.subjectType + ' Display';
  }

  public get launchContexts() {
    return getExtensions(this.questionnaire, structuredDataCapture.exturl_LaunchContextExtension)?.map((lc) => {
      return {
        name: getExtensionCodingValue(lc, "name")?.code ?? getExtension(lc, "name")?.valueId ?? '',
        type: getExtensionCodeValue(lc, "type"),
        description: getExtensionStringValue(lc, "description"),
      }
    });
  }

  launchContextSuffix(context: 'patient' | 'user' | 'encounter'): string {
    const index = this.launchContexts?.findIndex(lc => lc.name === context) ?? -1;
    if (index != -1){
      return ' (Launch Context: '+context+')';
    }
    return '';
  }

  private ChangeDataServer(data: any) {
    this.$emit('ChangeDataServer', data);
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

  async refreshSubjectDisplay() {
    this.subjectDisplay = '';
    let outcome = await this.readDataFromFhirServer(this.subjectId, (resultResource: FhirResource) => {
      this.subjectDisplay = this.getResourceReferenceDisplay(resultResource);
    });
    if (outcome) {
      console.error("Error reading display value", outcome);
    }
  }

  async refreshEncounterDisplay() {
    this.encounterDisplay = '';
    let outcome = await this.readDataFromFhirServer(this.encounterId, (resultResource: FhirResource) => {
      this.encounterDisplay = this.getResourceReferenceDisplay(resultResource);
    });
    if (outcome) {
      console.error("Error reading display value", outcome);
    }
  }

  async refreshAuthorDisplay() {
    this.authorDisplay = '';
    let outcome = await this.readDataFromFhirServer(this.authorId, (resultResource: FhirResource) => {
      this.authorDisplay = this.getResourceReferenceDisplay(resultResource);
    });
    if (outcome) {
      console.error("Error reading display value", outcome);
    }
  }

  async refreshSourceDisplay() {
    this.sourceDisplay = '';
    let outcome = await this.readDataFromFhirServer(this.sourceId, (resultResource: FhirResource) => {
      this.sourceDisplay = this.getResourceReferenceDisplay(resultResource);
    });
    if (outcome) {
      console.error("Error reading display value", outcome);
    }
  }

  /** Perform a FHIR Search operation */
  async readDataFromFhirServer<T>(resourceId: string, dataCallback: (resultResource: T) => void) {
    let url = resourceId;
    if (!resourceId.startsWith('http')) {
      url = this.sourceFhirServer + '/' + resourceId;
    }
    try {
      let headers = { "Accept": requestFhirAcceptHeaders };
      const response = await axios.get<T>(url, {
        headers: headers
      });
      const results = response.data;
      if (results) {
        dataCallback(results);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const serverError = err as AxiosError<fhir4b.OperationOutcome>;
        if (serverError && serverError.response) {
          return serverError.response.data;
        }
        return CreateOperationOutcome("fatal", "exception", "Server: " + err.message, errorCodingSearch, url);
      }
      return CreateOperationOutcome("fatal", "exception", "Client: " + err as string, errorCodingSearch, url);
    }
  }

  public getResourceReferenceDisplay(resource: FhirResource): string {
    if (resource as Patient) {
      let patient = resource as Patient;
      if (patient.name) {
        let display = this.getNameDisplay(patient.name);
        if (display)
          return display;
      }
    }
    if (resource as Practitioner) {
      let value = resource as Practitioner;
      if (value.name) {
        let display = this.getNameDisplay(value.name);
        if (display)
          return display;
      }
    }
    if (resource as RelatedPerson) {
      let value = resource as RelatedPerson;
      if (value.name) {
        let display = this.getNameDisplay(value.name);
        if (display)
          return display;
      }
    }
    return resource.id ?? '';
  }

  public getNameDisplay(names: HumanName[]): string | undefined {
    for (let name of names) {
      if (name.text)
        return name.text;
      let parts = name.given ?? [];
      if (name.family)
        parts.push(name.family);
      if (parts.length > 0) {
        if (name.prefix) {
          parts = name.prefix.concat(parts);
        }
        if (name.suffix)
          parts.push(...name.suffix);
        return parts.join(' ');
      }
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
  mounted(): void {
    this.sourceFhirServer = settings.getFhirServerExamplesUrl();
  }
}

</script>
