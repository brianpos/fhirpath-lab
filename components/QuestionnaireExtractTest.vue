<template>
  <div style="display: flex; flex-direction: column; height: 100%;">
    <div style="margin-bottom: 8px;">
      <v-select label="Extraction Engine" class="engineSelector" :items="executionEngines" v-model="selectedEngine"
                hide-details="auto">
        <template v-slot:append-outer>
          <div style="display: flex; margin-top: -8px;">
          <v-btn @click="performExtractOperation">
            <v-icon> mdi-tray-arrow-up </v-icon>
            &nbsp;Extract
          </v-btn>
          <v-btn icon v-if="showShareLink()" @click="shareToClipboard()"
                 title="Copy Bundle to clipboard"><v-icon>mdi-content-copy</v-icon></v-btn></div>
        </template>
      </v-select>
    </div>

    <resource-editor style="flex-grow: 1; width: 100%; height: 100%;" :readOnly="true" :resourceText="extractResult" />

    <v-expansion-panels accordion expanded>
      <v-expansion-panel :isActive="true">
        <v-expansion-panel-header>
          Debug Extract Parameters
          <template v-slot:actions>
            <v-icon>mdi-chevron-up</v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <resource-editor style="height: 35vh;" :readOnly="true"
            :resourceText="JSON.stringify(extractParameters, null, tabSpaces)" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script lang="ts">
import { Parameters, Questionnaire } from "fhir/r4b";
import { Questionnaire as QuestionnaireR4 } from "fhir/r4";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { settings } from "~/helpers/user_settings";
import { createInputParameters, extractResultIsOperationOutcome, inAppExtract } from "@aehrc/sdc-template-extract";

@Component
export default class QuestionnaireExtractTest extends Vue {

  // Properties provided by the parent component
  @Prop() readonly questionnaire: Questionnaire | undefined;
  @Prop() readonly questionnaireResponseJson: string | undefined;
  @Prop() readonly models: string | undefined;

  // Properties visible to the local template
  public selectedTabValue: number = 2;
  public tabSpaces: number = settings.getTabSpaces();
  public extractParameters: Parameters = { resourceType: "Parameters", parameter: [] };
  public executionEngines: string[] = [
    "forms-lab",
    "CSIRO template-based extract",
  ];
  public selectedEngine: string = "forms-lab";
  public extractServiceUrl: string = "https://fhir.forms-lab.com/QuestionnaireResponse/$extract";
  public extractingInProgress: boolean = false;

  // Internal variables
  public extractResult: string = '';
  public internalValue: string | undefined = undefined;

  public setValue(value: string | undefined): void {
    console.log("setValue called");
    this.internalValue = value;
  }

  public async performExtractOperation(): Promise<void> {
    console.log("Extracting the questionnaire");

    // update the parameters object for the extract
    if (!this.questionnaireResponseJson)
      return;

    this.extractResult = '';

    // Now pass this to the extract service
    this.extractingInProgress = true;

    if (this.selectedEngine === 'forms-lab') {
      // Send the extract request
      try {
        this.extractParameters.parameter = [
          {
            name: "questionnaire-response",
            resource: JSON.parse(this.questionnaireResponseJson!)
          }
        ];

        this.extractParameters.parameter.push({
          name: "questionnaire",
          resource: this.questionnaire
        });
        if (this.models != undefined) {
          this.extractParameters.parameter.push({ name: "model", valueString: this.models });
        }

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
              this.extractResult = JSON.stringify(returnParameter.resource, null, this.tabSpaces);
            }
            const issuesParameter = resultParameters.parameter?.find(p => p.name === "issues");
            if (issuesParameter) {
              this.$emit('outcome', issuesParameter.resource);
            }
          }
          else {
            this.extractResult = JSON.stringify(extractResponse, null, this.tabSpaces);
          }
        }
        else {
          console.error("Failed to extract the questionnaire", response);
        }
      }
      catch (error) {
        console.error("Error extracting the questionnaire", error);
      }
    }
    else if (this.selectedEngine === 'CSIRO template-based extract') {
      await this.runCSIROTemplateBasedExtraction();
    }
    this.extractingInProgress = false;
  }

  async runCSIROTemplateBasedExtraction(): Promise<void> {
    if (!this.questionnaireResponseJson) {
      return;
    }

    try {
      // inAppExtract() does not require $extract input parameters, it handles them internally - but we can still create it for debuqging purposes
      this.extractParameters = createInputParameters(JSON.parse(this.questionnaireResponseJson),
        this.questionnaire as QuestionnaireR4,
        undefined
      ) as Parameters;

      const inAppExtractOutput = await inAppExtract(
        JSON.parse(this.questionnaireResponseJson),
        this.questionnaire as QuestionnaireR4,
        null
      );

      const { extractResult } = inAppExtractOutput;

      // Extract result is an OperationOutcome
      if (extractResultIsOperationOutcome(extractResult)) {
        this.extractResult = JSON.stringify(extractResult, null, this.tabSpaces);
        console.error("Failed to extract the questionnaire", extractResult);
        return;
      }

      // At this point, extractResult should be a transaction Bundle
      this.extractResult = JSON.stringify(extractResult.extractedBundle, null, this.tabSpaces);

      if (extractResult.issues) {
        this.$emit('outcome', extractResult.issues);
      }
    } catch (error) {
      console.error("Error extracting the questionnaire", error);
    }
  }


  @Watch('questionnaireResponse', { immediate: true, deep: false })
  async onQuestionnaireResponseChanged() {
    console.log("QR changed", this.questionnaireResponseJson);
  }

  @Watch('questionnaire', { immediate: false, deep: true })
  async onQuestionnaireChanged() {
    console.log("Q changed");
  }

  showShareLink(): boolean {
    if (navigator?.clipboard && this.extractResult) {
      return true;
    }
    return false;
  }

  shareToClipboard(): void {
    // copy the resource JSON to the clipboard
    const resourceJson = this.extractResult;
    if (navigator.clipboard && resourceJson) {
      navigator.clipboard.writeText(resourceJson);
    }
  }

  mounted(): void {
    this.internalValue = JSON.stringify(this.questionnaire, null, this.tabSpaces);
  }
}

</script>
