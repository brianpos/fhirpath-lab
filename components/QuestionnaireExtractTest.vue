<template>
  <div style="display: flex; flex-direction: column; height: 100%;">
    <v-text-field label="Extract Service URL" v-model="extractServiceUrl" :loading="extractingInProgress">
      <template v-slot:append>
        <v-btn @click="performExtractOperation">
          Extract!
        </v-btn>
      </template>
    </v-text-field>
    <resource-editor style="flex-grow: 1; width: 100%; height: 100%;" :readOnly="true"
            :resourceText="extractResult" />
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
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { settings } from "~/helpers/user_settings";

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

    // Send the extract request
    try {
      this.extractParameters.parameter = [
        {
          name: "questionnaire-response",
          resource: JSON.parse(this.questionnaireResponseJson)
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
            this.extractResult = JSON.stringify(returnParameter.resource, null, tabSpaces);
          }
          const issuesParameter = resultParameters.parameter?.find(p => p.name === "issues");
          if (issuesParameter) {
            this.$emit('outcome', issuesParameter.resource);
          }
        }
        else {
          this.extractResult = JSON.stringify(extractResponse, null, tabSpaces);
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
    console.log("QR changed", this.questionnaireResponseJson);
  }

  @Watch('questionnaire', { immediate: false, deep: true })
  async onQuestionnaireChanged() {
    console.log("Q changed");
  }

  mounted(): void {
    this.internalValue = JSON.stringify(this.questionnaire, null, tabSpaces);
  }
}

</script>
