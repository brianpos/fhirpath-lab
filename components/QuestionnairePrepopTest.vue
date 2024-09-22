<template>
  <div class="ace_editor">
    <v-text-field label="Subject Type" v-if="questionnaire" readonly :value="questionnaire.subjectType" />
    <v-text-field v-if="questionnaire && questionnaire.subjectType" :label="questionnaire.subjectType + ' Id (subject)'"
      v-model="subjectId" />
    <v-text-field label="Populating from" v-model="sourceFhirServer" />
    <v-text-field v-if="!questionnaire || !questionnaire.subjectType" label="Patient Id" v-model="subjectId" />

    <template v-if="launchContexts && launchContexts.length > 0">
    <label>Launch Contexts</label>
    <v-expansion-panels accordion expanded>
      <v-expansion-panel :isActive="true">
        <v-expansion-panel-header>
          <template v-for="(r2, i1) in launchContexts">
            <div>
              <v-icon v-if="isComplete(r2.name)" color="green" small> mdi-check </v-icon>
              <v-icon v-if="!isComplete(r2.name)" color="red" small> mdi-close </v-icon>
              {{ r2.name }}
            </div>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <template v-for="(r2, i1) in launchContexts">
            <v-text-field :label="r2.name + ' : ' + r2.type + ' URL'" v-model="getLaunchContext(r2.name).id"
              :messages="r2.description" :loading="getLaunchContext(r2.name).loading">
              <template v-slot:append>
                <v-btn icon small tile @click="getLaunchContext(r2.name).id = ''; $forceUpdate();">
                  <v-icon> mdi-close </v-icon>
                </v-btn>
                <v-btn icon small tile @click="downloadExampleFile(r2.name, r2.type)">
                  <v-icon> mdi-download </v-icon>
                </v-btn>
              </template>
            </v-text-field>
            <v-textarea :label="r2.name + ' json'" :rows="3" v-model="getLaunchContext(r2.name).data"
              @input="$forceUpdate()">
              <template v-slot:append>
                <v-btn icon small tile @click="getLaunchContext(r2.name).data = ''; $forceUpdate()">
                  <v-icon> mdi-close </v-icon>
                </v-btn>
              </template>
            </v-textarea>
          </template>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    </template>

    <template v-if="isIPSPrepopulate">
      <v-text-field label="IPS Address" v-model="ipsBundleAddress">
        <template v-slot:append>
          <v-btn icon small tile @click="ipsBundleAddress = ''">
            <v-icon> mdi-close </v-icon>
          </v-btn>
          <v-btn icon small tile>
            <v-icon> mdi-download </v-icon>
          </v-btn>
          <v-btn small icon tile><v-icon title="Re-format the json below" dark>
              mdi-format-indent-increase
            </v-icon></v-btn>
        </template>
      </v-text-field>
      <v-textarea label="Smart Health Link (IPS)" :rows="5" v-model="smartHealthLink">
        <template v-slot:append>
          <v-btn icon small tile @click="smartHealthLink = ''">
            <v-icon> mdi-close </v-icon>
          </v-btn>
          <v-btn icon small tile>
            <v-icon> mdi-download </v-icon>
          </v-btn>
          <v-btn small icon tile><v-icon title="Re-format the json below" dark>
              mdi-format-indent-increase
            </v-icon></v-btn>
        </template>
      </v-textarea>
    </template>


    * Bundle Query(s)<br />
    * root level search fhirpath queries<br />
    * Run local StructureMap style processing

    <v-select label="Pre-Processing Engine" class="engineSelector" :items="executionEngines" v-model="selectedEngine"
      hide-details="auto" /><br />
      <v-text-field label="Populate Service URL" v-model="populateServiceUrl" v-if="selectedEngine == 'Other pre-pop'">
    </v-text-field>

    <v-btn accesskey="g" title="press alt+g to go" @click="runPrePopulation">
      <v-icon>
        mdi-play
      </v-icon> Populate
    </v-btn>

    <br />
    <label>$populate parameters</label>
    <br />
    <div height="85px" width="100%" ref="aceEditorExpressionPrePop"></div>
    <div class="ace_editor_footer"></div>
  </div>
</template>

<style lang="scss" scoped>
.bare-label {
  transform-origin: top left;
  transform: scale(0.75);
  margin-top: 8px;
  height: 20px;
}

.engineSelector {
  max-width: 18ch;
}

.ace_editor:focus-within+.ace_editor_footer {
  color: #1976d2;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}
</style>

<script lang="ts">
import { Questionnaire, QuestionnaireResponse, Parameters } from "fhir/r4b";
import { Questionnaire as QuestionnaireR4, Patient as PatientR4, Practitioner as PractitionerR4, Encounter as EncounterR4 } from "fhir/r4";
import { Component, Prop, Vue } from "vue-property-decorator";

import "ace-builds";
import ace from "ace-builds";
import "ace-builds/src-noconflict/mode-text";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-chrome";

import { Rules as FhirPathHightlighter_Rules, setCustomHighlightRules } from "~/helpers/fhirpath_highlighter"
import "~/assets/fhirpath_highlighter.scss"
import { structuredDataCapture } from "fhir-sdc-helpers"
import { getExtension, getExtensionCodeValue, getExtensionCodingValue, getExtensions, getExtensionStringValue } from "fhir-extension-helpers"
import { settings } from "~/helpers/user_settings";
import { loadFhirResource } from "~/helpers/searchFhir";
import { BaseResourceData } from "~/models/BaseResourceTableData";
import { json } from "express";
import { FetchResourceCallback, populateQuestionnaire } from "@aehrc/sdc-populate";
import axios from "axios";

interface LaunchContextData {
  id: string | undefined;
  data: string | undefined;
  loading?: boolean;
}

@Component
export default class QuestionnaireExtractTest extends Vue {

  // Properties provided by the parent component
  @Prop() readonly questionnaire: Questionnaire | undefined;

  // https://github.com/LHNCBC/lforms-fhir-app/blob/157be10a006eb6886c5421c5dd2606e795d8d9d8/source/js/fhir.service.js#L135C55-L136C43
  /*
  From the NLM render component
   *      var fhirContext = FHIR.client(settings.getFhirServerExamplesUrl());
        var fhirContextVars = { LaunchPatient: "Patient/123" };
        LForms.Util.setFHIRContext(fhirContext, fhirContextVars);

        this.lforms_error = undefined;
        await LForms.Util.addFormToPage(this.questionnaire, "myFormContainer", {
          prepopulate: false,
        }).catch((e: any) => {
          console.error("Breaking news:", e);
          this.lforms_error = e.toString();
        });

   */

  // Properties visible to the local template
  public subjectId: string = 'Patient/example';
  public ipsBundleAddress: string = 'https://hapi.fhir.org/baseR4/Patient/1221256/$summary';
  public smartHealthLink: string = 'https://shlink.ips.health/ips#shlink:/eyJ1cmwiOiJodHRwczovL2FwaS52YXh4LmxpbmsvYXBpL3NobC8wMTNxS1YwZWRQWTdyVWNZYWpEa0V1ejZ0eGJ3WGs1Ums0N2tHanZrS1NBIiwiZmxhZyI6IiIsImtleSI6Ijh0bXpKQ0tvdDVKSHd2dmVNTzBsWmNJaXRGY3NpRmdzVWxFYTltVGN6TDgiLCJsYWJlbCI6IlNITCBmcm9tIDIwMjMtMDgtMjkifQ';
  public executionEngines: string[] = [
    "forms-lab",
    "CSIRO pre-pop",
    "lforms pre-pop",
    "Other pre-pop",
  ];
  public selectedEngine: string = "forms-lab";
  public populateServiceUrl: string = "http://localhost:8000/Questionnaire/$populate";
  public launchContextValues: Map<string, LaunchContextData> = new Map<string, LaunchContextData>;
  public isComplete(val: string | undefined): boolean {
    console.log('Checking isComplete for ' + val);
    if (this.getLaunchContext(val)?.data?.length! > 0)
      return true;
    return false;
  }

  public sourceFhirServer: string = "";
  
  public get isIPSPrepopulate(): boolean {
    let isIPS = this.launchContexts?.find((lc) => lc.name === 'ips') !== undefined;
    return isIPS;
  }
  public get launchContexts() {
    return getExtensions(this.questionnaire, structuredDataCapture.exturl_LaunchContextExtension)?.map((lc) => {
      return {
        name: getExtensionCodingValue(lc, "name")?.code ?? getExtension(lc, "name")?.valueId,
        type: getExtensionCodeValue(lc, "type"),
        description: getExtensionStringValue(lc, "description"),
      }
    });
  }

  public getLaunchContext(context: string | undefined): LaunchContextData {
    if (context) {
      let data = this.launchContextValues.get(context);
      if (data)
        return data;
    }
    return { id: undefined, data: undefined };
  }

  public setLaunchContextId(context: string, id: string) {
    let data = this.launchContextValues.get(context);
    if (!data) {
      let data: LaunchContextData = { id, data: undefined };
      this.launchContextValues.set(context, data);
    } else {
      data.id = id;
    }
  }

  public async downloadExampleFile(context: string, resourceType: string) {
    let data = this.launchContextValues.get(context);
    if (data) {
      data.loading = true;
      this.$forceUpdate();
      let feedbackData: BaseResourceData<fhir4b.FhirResource> = {
        raw: null,
        saving: false,
        enableSave: false,
        readonly: true,
        tab: 0,
        fhirServerUrl: this.sourceFhirServer,
      };
      let resourceId = data.id ?? '';
      if (resourceId.includes('/')) {
        let parts = resourceId.split('/');
        resourceId = parts[parts.length - 1];
      }
      let result = await loadFhirResource(this.sourceFhirServer, feedbackData, resourceType, resourceId, () => { return { resourceType: 'Questionnaire' } as Questionnaire });
      data.loading = false;
      data.data = feedbackData.raw ? JSON.stringify(feedbackData.raw, null, 2) : 'Failed to load the resource';
      this.$forceUpdate();
    }
  }

  public async runPrePopulation() {
    // Run the pre-population based on the selected engine
    console.log('Running pre-population');
    let result: QuestionnaireResponse | undefined = undefined;
    if (this.selectedEngine === 'forms-lab') {
      result = await this.runFormsLabPrePopulation();
    } else if (this.selectedEngine === 'CSIRO pre-pop') {
      result = await this.runCSIROPrePopulation();
    } else if (this.selectedEngine === 'lforms pre-pop') {
      result = await this.runLFormsPrePopulation();
    } else if (this.selectedEngine === 'Other pre-pop') {
      result = await this.runOtherPrePopulation();
    } else {
      console.error('Unknown engine selected');
    }
    if (result) {
      console.log('Pre-population result', result);
      this.$emit('response', result);
    }
  }

  async runFormsLabPrePopulation(): Promise<QuestionnaireResponse | undefined> {
    console.log('Running forms-lab');

    return await this.evaluatePrePopulation("https://fhir.forms-lab.com/Questionnaire/$populate");
  }

  // Note: No way to POST batch bundles yet, the populate library will individually process each batch entry
  static fetchResourceCallbackCSIROPrePopulation: FetchResourceCallback =
    async (query: string, requestConfig: { sourceFhirServer: string }) => {
      let { sourceFhirServer } = requestConfig;

      const headers = {
        Accept: "application/json;charset=utf-8",
      };

      if (!sourceFhirServer.endsWith("/")) {
        sourceFhirServer += "/";
      }

      // When query is an absolute URL, use it as is
      if (/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(query)) {
        return axios.get(query, {
          headers: headers,
        });
      }

      // When query is a relative URL, append it to the client endpoint
      return axios.get(sourceFhirServer + query, {
        headers: headers,
      });
    };

  async runCSIROPrePopulation(): Promise<QuestionnaireResponse | undefined> {
    let patientResource: PatientR4 | undefined = undefined;
    let userResource: PractitionerR4 | undefined = undefined;
    let encounterResource: EncounterR4 | undefined = undefined;
    for (let [, value] of this.launchContextValues) {
      if (value && value.data) {
        try {
          const resource = JSON.parse(value.data);

          switch (resource.resourceType) {
            case "Patient":
              patientResource = resource as PatientR4;
              break;
            case "Practitioner":
              userResource = resource as PractitionerR4;
              break;
            case "Encounter":
              encounterResource = resource as EncounterR4;
              break;
          }
        } catch (err) {
          console.log(err);
        }
      }
    }

    if (!this.questionnaire) {
      console.log("No patient resource provided");
      return;
    }

    if (!patientResource) {
      console.log("No patient resource provided");
      return;
    }

    const { populateSuccess, populateResult } = await populateQuestionnaire({
      questionnaire: this.questionnaire as QuestionnaireR4,
      fetchResourceCallback:
      QuestionnaireExtractTest.fetchResourceCallbackCSIROPrePopulation,
      requestConfig: {
        sourceFhirServer: this.sourceFhirServer,
      },
      patient: patientResource as PatientR4,
      user: userResource ? (userResource as PractitionerR4) : undefined,
      encounter: encounterResource ? (encounterResource as EncounterR4) : undefined,
    });

    if (!populateSuccess || !populateResult) {
      console.log("Failed to populate the questionnaire");
      return;
    }

    this.$emit("response", populateResult.populatedResponse);

    return undefined;
  }

  async runLFormsPrePopulation(): Promise<QuestionnaireResponse | undefined> {
    console.log('Running lforms pre-pop');
    if (this.subjectId.startsWith('Patient/'))
      this.$emit('pre-pop-lforms', this.sourceFhirServer, this.subjectId.substring('Patient/'.length));
    else{
      // The lforms engine only really supports a patient launch parameter, and doesn't expect the prefix in it
      this.$emit('pre-pop-lforms', this.sourceFhirServer, this.subjectId);
    }
    return undefined;
  }

  async runOtherPrePopulation(): Promise<QuestionnaireResponse | undefined> {
    console.log('Running Other pre-pop: ' + this.populateServiceUrl);
    return await this.evaluatePrePopulation(this.populateServiceUrl);
  }

  async evaluatePrePopulation(url: string): Promise<QuestionnaireResponse | undefined> {

    try {
      // prepare the parameters with the launch context values
      let prepopParams: Parameters = {
        resourceType: "Parameters",
        "parameter": [
          {
            "name": "subject",
            "valueReference": {
              "display": "intake patient"
            }
          },
          {
            "name": "questionnaire",
            "resource": this.questionnaire
          }]
      };

      // Set the subject id
      prepopParams.parameter![0].valueReference!.reference = this.subjectId;

      // Set the launch context values
      let lcs = this.launchContexts;
      if (lcs) {
        for (let lc of lcs) {
          if (lc.name) {
            let data = this.launchContextValues.get(lc.name);
            if (data && data.data) {
              let context = {
                "name": "context",
                "part": [{
                  "name": "name",
                  "valueString": lc.name
                },
                {
                  "name": "content",
                  "resource": JSON.parse(data.data)
                }]
              };
              prepopParams.parameter!.push(context);
            }
            else if (data && data.id){
              let context = {
                "name": "context",
                "part": [{
                  "name": "name",
                  "valueString": lc.name
                },
                {
                  "name": "content",
                  "valueReference": { 
                    reference: data.id
                  }
                }]
              };
              prepopParams.parameter!.push(context);
            }
          }
        }
      }

      const bodyContent = JSON.stringify(prepopParams, null, 4);
      this.setValue(bodyContent);

      // run the pre-population
      // Use the FHIR $populate operation to pre-populate the form
      // from whatever server is at the URL in populateServiceUrl 
      const response = await fetch(url, {
        method: "POST",
        cache: "no-cache",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json"
        },
        body: bodyContent
      });
      const raw = await response.text();
      console.log('Pre-population result', raw);

      // editorQR.setValue(raw);
      // editorQR.clearSelection();

      try {
        var jsonOutput = JSON.parse(raw);
        if (jsonOutput.resourceType === "OperationOutcome") {
          console.log("Unable to pre-populate form, refer to outcome");
          return undefined;
        }

        if (jsonOutput.resourceType !== "QuestionnaireResponse") {
          console.log("Unexpected response type: " + jsonOutput.resourceType);
          return undefined;
        }
        return jsonOutput;
      }
      catch (err) {
        console.log(err);
        return undefined;
      }
    }
    catch (err) {
      console.log(err);
      return undefined;
    }
  }

  public setLaunchContextData(context: string, content: string) {
    let data = this.launchContextValues.get(context);
    if (!data) {
      let data: LaunchContextData = { id: undefined, data: content };
      this.launchContextValues.set(context, data);
    } else {
      data.data = content;
    }
  }

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
      var editorDiv: any = this.$refs.aceEditorExpressionPrePop as HTMLDivElement;
      if (editorDiv && this.expressionEditor === undefined) {
        console.log("need to create the editor");
        this.expressionEditor = ace.edit(editorDiv, {
          wrap: "free",
          minLines: 3,
          maxLines: 39,
          highlightActiveLine: false,
          showGutter: true,
          fontSize: 12,
          cursorStyle: "slim",
          showPrintMargin: false,
          theme: "ace/theme/chrome",
          mode: "ace/mode/json",
          wrapBehavioursEnabled: true
        });
        console.log("extract initialized");

        if (this.expressionEditor) {
          // setCustomHighlightRules(this.expressionEditor, FhirPathHightlighter_Rules);
          this.expressionEditor.setValue(this.internalValue ?? "");
          this.expressionEditor.clearSelection();
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
    this.sourceFhirServer = settings.getFhirServerExamplesUrl();
  }

  updated(): void {
    this.ensureEditorIsCreated();
    this.internalValue = JSON.stringify(this.questionnaire, null, 2);
    console.log('updated');
    let lcs = this.launchContexts;
    if (lcs) {
      let updateRequired = false;
      for (let lc of lcs) {
        let data: LaunchContextData = { id: undefined, data: undefined };
        if (lc.type && lc.type !== 'Bundle')
          data.id = lc.type + '/example';
        if (lc.name && !this.launchContextValues.has(lc.name)) {
          this.launchContextValues.set(lc.name, data)
          updateRequired = true;
        }
      }
      if (updateRequired)
        this.$forceUpdate();
    }
  }
}

</script>
