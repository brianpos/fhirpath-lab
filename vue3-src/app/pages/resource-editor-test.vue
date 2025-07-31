<template>
  <div>
    <HeaderNavbar />
    
    <div class="container-fluid bd-layout" style="padding-top: 80px">
      <v-card class="page-content">
        <v-toolbar color="primary" dark>
          <v-toolbar-title>Resource Editor Test</v-toolbar-title>
        </v-toolbar>
        
        <v-card-text>
          <div style="height: 500px;">
            <ResourceEditor
              ref="resourceEditor"
              label="Test Resource URL"
              :resourceUrl="resourceUrl"
              :resourceText="resourceText"
              :readOnly="false"
              textLabel="Resource Content:"
              footerLabel="Use the buttons above to download or format the resource"
              :tabSpaces="tabSpaces"
              :fhirServerExamplesUrl="fhirServerExamplesUrl"
              :dotnetServerDownloader="dotnetServerDownloader"
              @update:resourceUrl="onResourceUrlUpdate"
              @update:resourceText="onResourceTextUpdate"
            />
          </div>
          
          <div class="mt-4">
            <h4>Current Settings:</h4>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model.number="tabSpaces"
                  label="Tab Spaces"
                  type="number"
                  min="1"
                  max="8"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="fhirServerExamplesUrl"
                  label="FHIR Server Examples URL"
                />
              </v-col>
            </v-row>
            
            <v-text-field
              v-model="dotnetServerDownloader"
              label="Downloader Proxy URL"
            />
            
            <div class="mt-4">
              <v-btn @click="loadSampleResource" color="primary">
                Load Sample Patient (JSON)
              </v-btn>
              <v-btn @click="loadSampleXmlResource" color="primary" class="ml-2">
                Load Sample Patient (XML)
              </v-btn>
              <v-btn @click="clearResource" color="secondary" class="ml-2">
                Clear
              </v-btn>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HeaderNavbar from '~/components/HeaderNavbar.vue'
import ResourceEditor from '~/components/ResourceEditor.vue'

// Reactive state
const resourceUrl = ref<string>('Patient/example')
const resourceText = ref<string>('')
const tabSpaces = ref<number>(2)
const fhirServerExamplesUrl = ref<string>('https://hapi.fhir.org/baseR4')
const dotnetServerDownloader = ref<string>('https://proxy.fhir.forms-lab.com/downloader')

// Template ref
const resourceEditor = ref<InstanceType<typeof ResourceEditor>>()

// Event handlers
const onResourceUrlUpdate = (newUrl: string) => {
  resourceUrl.value = newUrl
}

const onResourceTextUpdate = (newText: string) => {
  resourceText.value = newText
}

const loadSampleResource = () => {
  const samplePatient = {
    "resourceType": "Patient",
    "id": "example",
    "name": [
      {
        "use": "official",
        "family": "Chalmers",
        "given": ["Peter", "James"]
      }
    ],
    "gender": "male",
    "birthDate": "1974-12-25"
  }
  
  resourceText.value = JSON.stringify(samplePatient, null, tabSpaces.value)
}

const loadSampleXmlResource = () => {
  const samplePatientXml = `<?xml version="1.0" encoding="UTF-8"?>
<Patient xmlns="http://hl7.org/fhir">
  <id value="example"/>
  <name>
    <use value="official"/>
    <family value="Chalmers"/>
    <given value="Peter"/>
    <given value="James"/>
  </name>
  <gender value="male"/>
  <birthDate value="1974-12-25"/>
</Patient>`
  
  resourceText.value = samplePatientXml
}

const clearResource = () => {
  resourceUrl.value = ''
  resourceText.value = ''
}
</script>

<style scoped>
.container-fluid {
  padding-left: 16px;
  padding-right: 16px;
}

.page-content {
  height: calc(100vh - 100px);
}
</style>
