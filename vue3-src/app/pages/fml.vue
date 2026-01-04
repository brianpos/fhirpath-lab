<template>
    <div>
      <HeaderNavbar/>
      <div class="container-fluid bd-layout" style="padding-top: 80px">
        <v-card class="page-content">
          <v-toolbar color="primary" dark>
            <v-toolbar-title>FHIRPath Tester - Sample Implementation</v-toolbar-title>
            <v-spacer />
            <v-btn icon dark title="Run Expression">
              <v-icon>mdi-play</v-icon>
            </v-btn>
          </v-toolbar>
          
          <TwinPaneTab 
            :tabs="tabDetails" 
            ref="twinTabControl" 
          >
            <!-- Map Tab -->
            <template v-slot:Map>
                <ResourceEditor
                label="StructureMap Id"
                :resourceUrl="mapResourceUrl"
                :resourceText="mapText"
                :readOnly="false"
                textLabel="FML Map"
                :tabSpaces="tabSpaces"
                :fhirServerExamplesUrl="fhirServerExamplesUrl"
                :dotnetServerDownloader="dotnetServerDownloader"
                @update:resourceUrl="onMapResourceUrlUpdate"
                @update:resourceText="onMapResourceTextUpdate"
              />
            </template>

            <!-- Input Tab -->
            <template v-slot:Input>
                <ResourceEditor
                label="Input Resource Id"
                :resourceUrl="inputResourceUrl"
                :resourceText="inputResourceText"
                :readOnly="false"
                textLabel="Input Resource"
                :tabSpaces="tabSpaces"
                :fhirServerExamplesUrl="fhirServerExamplesUrl"
                :dotnetServerDownloader="dotnetServerDownloader"
                @update:resourceUrl="onInputResourceUrlUpdate"
                @update:resourceText="onInputResourceTextUpdate"
              />
            </template>

            <!-- Models Tab -->
            <template v-slot:Models>
                <ResourceEditor
                label="Models Resource Id"
                :resourceUrl="modelsResourceUrl"
                :resourceText="modelsResourceText"
                :readOnly="false"
                textLabel="Logical Models"
                footerLabel="The Model can be either an individual StructureDefinition (e.g. logical model) or a search query for a bundle of models"
                :tabSpaces="tabSpaces"
                :fhirServerExamplesUrl="fhirServerExamplesUrl"
                :dotnetServerDownloader="dotnetServerDownloader"
                @update:resourceUrl="onModelsResourceUrlUpdate"
                @update:resourceText="onModelsResourceTextUpdate"
              />
            </template>

            <!-- Output Tab -->
            <template v-slot:Output>
                <ResourceEditor
                :resourceText="OutputResourceText"
                :readOnly="true"
                textLabel="Transformed Output Resource"
                :tabSpaces="tabSpaces"
              />
            </template>

            <!-- Errors Tab -->
            <template v-slot:Errors>
                <OperationOutcomePanel
                  :title="'Validation Errors'"
                  :issueLinkTitle="'View Issue Details'"
                  :outcome="evaluateOutcome"
                  @help-with-issue="helpWithIssue"
                  @navigate-to-issue="navigateToIssue"
                  @close="evaluateOutcome = undefined"
                />
            </template>

            <!-- Debug Tab -->
            <template v-slot:Debug>
                <ResourceEditor
                :resourceText="DebugParametersText"
                :readOnly="true"
                textLabel="Debug Parameters Response from $transform"
                :tabSpaces="tabSpaces"
              />
            </template>
          </TwinPaneTab>
        </v-card>
      </div>
    </div>
</template>
<script setup lang="ts">
import type { TabData } from '~/components/TwinPaneTab.vue'
import ResourceEditor from '~/components/ResourceEditor.vue'
import type { OperationOutcome } from 'fhir/r4b'

// Set the page title
useHead({
  title: 'FML Tester - FHIRPath Lab'
})

const chatEnabled = ref<boolean>(true)
const showAdvancedSettings = ref<boolean>(true)
const evaluateOutcome = ref<OperationOutcome | undefined>({ 
  resourceType: 'OperationOutcome',
  issue: [{
    severity: 'error',
    code: 'invalid',
    details: {
      text: 'Invalid FHIRPath expression'
    },
    expression: ['Bundle.entry[0].resource']
  }]
})
const tabSpaces = ref<number>(2)

// Resource URLs for each tab
const mapResourceUrl = ref<string>('')
const inputResourceUrl = ref<string>('Patient/example')
const modelsResourceUrl = ref<string>('')

// Resource text content for each tab
const mapText = ref<string>(`/// url = 'http://fhirpath-lab.com/StructureMap/intro-patient-map'
/// name = 'IntroPatientMap'
/// status = 'draft'
/// version = '0.1'

uses "http://hl7.org/fhir/StructureDefinition/Patient" as source
uses "http://hl7.org/fhir/StructureDefinition/Bundle" as target

group patientMap(source src : Patient, target bundle : Bundle) {
  src -> bundle.id = uuid() "bundle-id";
  src -> bundle.type = 'transaction' "bundle-type";

  // create a new entry and put the patient resource in it
  src -> bundle.entry as entry, entry.resource = src then
    SetEntryData(src, entry) "prep-entry";
}

group SetEntryData(source src: Patient, target entry)
{
  src.id as patientId log('patientId: ' & %src.id) -> entry.fullUrl = append('http://hl7.org/fhir/us/sdoh-clinicalcare/Patient/', patientId);
  
  src -> entry.request as request then {
    src -> request.method = 'POST' "obsn-request-method";
    src -> request.url = 'Observation' "obsn-request-url";
  } "obsn-entry-request";
}
`)
const inputResourceText = ref<string>(JSON.stringify({"content": "input resource text"}, null, 2))
const modelsResourceText = ref<string>(JSON.stringify({"content": "models resource text"}, null, 2))
const OutputResourceText = ref<string>(JSON.stringify({"content": "output resource text"}, null, 2))
const DebugParametersText = ref<string>(JSON.stringify({"content": "debug parameters response"}, null, 2))

const fhirServerExamplesUrl = ref<string>('https://hapi.fhir.org/baseR4')
const dotnetServerDownloader = ref<string>('https://proxy.fhir.forms-lab.com/downloader')

// Update handlers for Map tab
const onMapResourceUrlUpdate = (value: string) => {
  mapResourceUrl.value = value
}
const onMapResourceTextUpdate = (value: string) => {
  mapText.value = value
}

// Update handlers for Input tab
const onInputResourceUrlUpdate = (value: string) => {
  inputResourceUrl.value = value
}
const onInputResourceTextUpdate = (value: string) => {
  inputResourceText.value = value
}

// Update handlers for Models tab
const onModelsResourceUrlUpdate = (value: string) => {
  modelsResourceUrl.value = value
}
const onModelsResourceTextUpdate = (value: string) => {
  modelsResourceText.value = value
}

const helpWithIssue = (issue: fhir4b.OperationOutcomeIssue) => {
  console.log("Help me with: ", issue);
  let issueText =
    "How can I resolve this issue from validating this Map?";
  if (issue.details?.text) issueText += "\r\n\r\n" + issue.details.text;
  if (issue.expression)
    issueText +=
      "\r\n\r\nLocation: `" + issue.expression.join("`\r\n\r\n") + "`";
  if (issue.location)
    issueText +=
      "\r\n\r\nLocation (alternate): `" +
      issue.location.join("`\r\n\r\n") +
      "`";
  if (issue.diagnostics)
    issueText +=
      "\r\n\r\nDiagnostics:\r\n``` log\r\n" + issue.diagnostics + "\r\n```";
  console.log(issueText);
}

import type { IWithPosition } from '~/legacy-helpers/json_parser'

const navigateToIssue = (issue: fhir4b.OperationOutcomeIssue & IWithPosition) => {
  console.log("Navigate to: ", issue);

}


// Tab configuration
const tabDetails = computed<TabData[]>(() => [
  {
    iconName: "mdi-function-variant",
    tabName: "Map",
    show: true,
    enabled: true,
  },
  {
    iconName: "mdi-clipboard-text-outline",
    tabName: "Input",
    tabSubName: "(test resource)",
    tabHeaderName: "Test Input Resource",
    show: true,
    enabled: true,
  },
  {
    iconName: "mdi-tree-outline",
    tabName: "Models",
    tabHeaderName: "Logical Models Required",
    title: "Logical Models Required\n(Structure Definitions)",
    show: true,
    enabled: true,
  },
  {
    iconName: "mdi-format-list-bulleted",
    tabName: "Trace",
    show: true,
    enabled: true,
  },
  {
    iconName: "mdi-file-document-outline",
    tabName: "Output",
    tabHeaderName: "Map Output",
    title: "Map Output",
    show: true,
    enabled: true,
  },
  {
    iconName: "mdi-alert-circle-outline",
    tabName: "Errors",
    tabHeaderName: "Validation Errors",
    show: evaluateOutcome.value !== undefined,
    enabled: true,
  },
  {
    iconName: "mdi-brain",
    tabName: "AI Chat",
    tabHeaderName: "FHIRPath AI Chat",
    title: "FHIRPath AI Chat",
    show: chatEnabled.value,
    enabled: true,
  },
  {
    iconName: "mdi-bug-outline",
    tabName: "Debug",
    show: showAdvancedSettings.value,
    enabled: true,
  },
])

</script>
<style scoped>
.page-content {
  height: calc(100vh - 100px);
}
.tab-content {
  padding: 16px 0;
  
}

.container-fluid {
  padding-left: 16px;
  padding-right: 16px;
}
</style>