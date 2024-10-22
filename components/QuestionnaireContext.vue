<template>
  <div class="context-control">
    <v-text-field label="Data Server" :value="dataServer" @change="ChangeDataServer($event)" />

    <v-text-field :label="subjectId_label" v-model="subjectId" @change="notifyChange" hide-details="auto"
      :error-messages="subjectErrorMessage" hint="(QuestionnaireResponse.subject.reference)" />
    <v-text-field :label="subjectDisplay_label" v-model="subjectDisplay" @change="notifyChange"
      hint="(QuestionnaireResponse.subject.display)" :loading="subjectLoading">
      <template v-slot:append v-if="subjectId.length > 0">
        <v-btn icon small tile @click="refreshSubjectDisplay" title="Read the display from the referenced resource">
          <v-icon> mdi-refresh </v-icon>
        </v-btn>
      </template>
    </v-text-field>

    <v-text-field :label="'Encounter Reference' + launchContextSuffix('encounter')" v-model="encounterId"
      :error-messages="encounterErrorMessage" @change="notifyChange" hide-details="auto"
      hint="(QuestionnaireResponse.encounter.reference)" />
    <v-text-field label="Encounter Display" v-model="encounterDisplay" @change="notifyChange"
      hint="(QuestionnaireResponse.encounter.display)" :loading="encounterLoading">
      <template v-slot:append v-if="encounterId.length > 0">
        <v-btn icon small tile @click="refreshEncounterDisplay" title="Read the display from the referenced resource">
          <v-icon> mdi-refresh </v-icon>
        </v-btn>
      </template>
    </v-text-field>
    <p>
      <br />
    </p>

    <v-text-field :label="'Author Reference' + launchContextSuffix('user')" v-model="authorId" @change="notifyChange"
      :error-messages="authorErrorMessage" hide-details="auto" hint="(QuestionnaireResponse.author.reference)" />
    <v-text-field label="Author Display" v-model="authorDisplay" @change="notifyChange"
      hint="(QuestionnaireResponse.author.display)" :loading="encounterLoading">
      <template v-slot:append v-if="authorId.length > 0">
        <v-btn icon small tile @click="refreshAuthorDisplay" title="Read the display from the referenced resource">
          <v-icon> mdi-refresh </v-icon>
        </v-btn>
      </template>
    </v-text-field>
    <br />

    <v-text-field label="Source Reference" v-model="sourceId" @change="notifyChange" hide-details="auto"
      :error-messages="sourceErrorMessage" hint="(QuestionnaireResponse.source.reference)" />
    <v-text-field label="Source Display" v-model="sourceDisplay" @change="notifyChange"
      hint="(QuestionnaireResponse.source.display)" :loading="sourceLoading">
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
import { Questionnaire, QuestionnaireResponse, Parameters, Reference, FhirResource, Patient, HumanName, RelatedPerson, Encounter } from "fhir/r4b";
import { Context } from "fhirpath";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { CreateOperationOutcome, errorCodingSearch, requestFhirAcceptHeaders } from "~/helpers/searchFhir";

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

  // Properties visible to the local template
  public subjectId: string = '';
  public subjectDisplay: string = '';
  public subjectErrorMessage: string = '';
  public subjectLoading: boolean = false;

  public encounterId: string = '';
  public encounterDisplay: string = '';
  public encounterErrorMessage: string = '';
  public encounterLoading: boolean = false;

  public authorId: string = '';
  public authorDisplay: string = '';
  public authorErrorMessage: string = '';
  public authorLoading: boolean = false;

  public sourceId: string = '';
  public sourceDisplay: string = '';
  public sourceErrorMessage: string = '';
  public sourceLoading: boolean = false;

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
    if (index != -1) {
      return ' (Launch Context: ' + context + ')';
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

    this.subjectErrorMessage = '';
    this.authorErrorMessage = '';
    this.encounterErrorMessage = '';
    this.sourceErrorMessage = '';

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
    this.subjectErrorMessage = '';
    this.subjectLoading = true;
    let outcome = await this.readDataFromFhirServer(this.subjectId, (resultResource: FhirResource) => {
      this.subjectDisplay = QuestionnaireContext.getResourceReferenceDisplay(resultResource);
    });
    if (outcome) {
      this.subjectErrorMessage = outcome.issue.map(i => i.details?.text).join(', ') ?? "unknown error";
      console.error("Error reading display value", outcome);
    }
    this.subjectLoading = false;
  }

  async refreshEncounterDisplay() {
    this.encounterDisplay = '';
    this.encounterErrorMessage = '';
    this.encounterLoading = true;
    let outcome = await this.readDataFromFhirServer(this.encounterId, async (resultResource: FhirResource) => {
      const enc = resultResource as fhir4b.Encounter;
      if (this.subjectId != enc.subject?.reference) {
        this.subjectId = enc.subject?.reference ?? '';
        await this.refreshSubjectDisplay();
      }
      this.encounterDisplay = QuestionnaireContext.getResourceReferenceDisplay(resultResource);
    });
    if (outcome) {
      this.encounterErrorMessage = outcome.issue.map(i => i.details?.text).join(', ') ?? "unknown error";
      console.error("Error reading display value", outcome);
    }
    this.encounterLoading = false;
  }

  async refreshAuthorDisplay() {
    this.authorDisplay = '';
    this.authorErrorMessage = '';
    this.authorLoading = true;
    let outcome = await this.readDataFromFhirServer(this.authorId, (resultResource: FhirResource) => {
      this.authorDisplay = QuestionnaireContext.getResourceReferenceDisplay(resultResource);
    });
    if (outcome) {
      this.authorErrorMessage = outcome.issue.map(i => i.details?.text).join(', ') ?? "unknown error";
      console.error("Error reading display value", outcome);
    }
    this.authorLoading = false;
  }

  async refreshSourceDisplay() {
    this.sourceDisplay = '';
    this.sourceErrorMessage = '';
    this.sourceLoading = true;
    let outcome = await this.readDataFromFhirServer(this.sourceId, (resultResource: FhirResource) => {
      this.sourceDisplay = QuestionnaireContext.getResourceReferenceDisplay(resultResource);
    });
    if (outcome) {
      this.sourceErrorMessage = outcome.issue.map(i => i.details?.text).join(', ') ?? "unknown error";
      console.error("Error reading display value", outcome);
    }
    this.sourceLoading = false;
  }

  /** Perform a FHIR Search operation */
  async readDataFromFhirServer<T>(resourceId: string, dataCallback: (resultResource: T) => void) {
    let url = resourceId;
    if (!resourceId.startsWith('http')) {
      url = this.dataServer + '/' + resourceId;
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
          if (serverError.response.status === 404) {
            return CreateOperationOutcome("error", "not-found", "Resource "+ resourceId +" not found", errorCodingSearch, url);
          }
          if (serverError.response.status === 401) {
            return CreateOperationOutcome("fatal", "forbidden", "Resource "+ resourceId +" not authorized", errorCodingSearch, url);
          }
          if (serverError.response.status === 410) {
            return CreateOperationOutcome("error", "not-found", "Resource "+ resourceId +" was deleted", errorCodingSearch, url);
          }
          return serverError.response.data;
        }
        return CreateOperationOutcome("fatal", "exception", "Server: " + err.message, errorCodingSearch, url);
      }
      return CreateOperationOutcome("fatal", "exception", "Client: " + err as string, errorCodingSearch, url);
    }
  }

  static getResourceReferenceDisplay(resource: FhirResource): string {
    if (resource as Patient) {
      let patient = resource as Patient;
      if (patient.name) {
        let display = QuestionnaireContext.getNameDisplay(patient.name);
        if (display)
          return display;
      }
    }
    if (resource as Practitioner) {
      let value = resource as Practitioner;
      if (value.name) {
        let display = QuestionnaireContext.getNameDisplay(value.name);
        if (display)
          return display;
      }
    }
    if (resource as RelatedPerson) {
      let value = resource as RelatedPerson;
      if (value.name) {
        let display = QuestionnaireContext.getNameDisplay(value.name);
        if (display)
          return display;
      }
    }
    if (resource as Encounter) {
      let value = resource as Encounter;
      let data = [];
      if (value.period?.start) {
        data.push(value.period.start.substring(0, 10));
      }
      if (value.period?.end) {
        if (value.period.start?.substring(0, 10) != value.period.end.substring(0, 10))
          data.push(value.period.end.substring(0, 10));
      }
      if (value.class) {
        data.push(value.class.display ?? '');
      }
      if (value.serviceType) {
        if (value.serviceType.text)
          data.push(value.serviceType.text ?? '');
        else if (value.serviceType.coding) {
          for (let coding of value.serviceType.coding) {
            if (coding.display)
              data.push(coding.display);
          }
        }
      }
      if (value.type) {
        for (let t of value.type) {
          if (t.text)
            data.push(t.text ?? '');
          else if (t.coding) {
            for (let coding of t.coding) {
              if (coding.display)
                data.push(coding.display);
            }
          }
        }
      }
      if (data.length > 0) {
        return data.join(' - ');
      }
    }
    return resource.id ?? '';
  }

  static getNameDisplay(names: HumanName[]): string | undefined {
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
}

</script>
