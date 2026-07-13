<template>
  <div>
    <HeaderNavbar @close-settings="onSettingsClosed" />
    
    <div class="container-fluid bd-layout" style="padding-top: 80px">
      <v-card class="page-content">
        <v-toolbar color="primary" dark>
          <v-toolbar-title>FHIRPath Tester</v-toolbar-title>
          <v-spacer />
          
          <v-tooltip location="bottom" :disabled="isFhirVersionMenuOpen">
            <template v-slot:activator="{ props }">
              <div class="toolbar-select-activator" v-bind="props">
                <v-select 
                  dark 
                  style="max-width: 6ch; margin-right: 8px; margin-left: 8px;" 
                  :items="fhirVersions" 
                  v-model="selectedFhirVersion" 
                  hide-details="auto" 
                  @update:modelValue="changeFhirVersion"
                  @update:menu="isFhirVersionMenuOpen = $event"
                  density="compact"
                />
              </div>
            </template>
            <span>Evaluate using FHIR Version</span>
          </v-tooltip>
          
          <v-tooltip location="bottom" :disabled="isEngineMenuOpen">
            <template v-slot:activator="{ props }">
              <div class="toolbar-select-activator" v-bind="props">
                <v-select 
                  dark 
                  style="max-width: 13ch" 
                  :items="engines" 
                  item-title="name"
                  return-object 
                  v-model="selectedEngine" 
                  hide-details="auto" 
                  @update:modelValue="evaluateExpression"
                  @update:menu="isEngineMenuOpen = $event"
                  density="compact"
                >
                  <template v-slot:item="{ item, props }">
                    <div class="engine-item-tooltip-activator">
                      <v-list-item v-bind="props">
                        <template v-slot:title>
                          <span v-if="!item.external">{{ item.name }}</span>
                          <span v-else class="external-engine">
                            <v-icon size="small">mdi-web</v-icon> {{ item.name }} *
                          </span>
                        </template>
                        <template v-slot:subtitle>
                          <span :class="item.external ? 'external-engine' : ''">{{ item.publisher }}</span>
                        </template>
                      </v-list-item>
                      <v-tooltip activator="parent" location="end">
                        <span class="engine-tooltip-content">{{ engineTooltip(item) }}</span>
                      </v-tooltip>
                    </div>
                  </template>
                </v-select>
              </div>
            </template>
            <span style="white-space: pre-line;">{{ engineTooltip(selectedEngine) }}</span>
          </v-tooltip>

          <v-tooltip location="bottom">
            <template v-slot:activator="{ props }">
              <v-btn icon dark tile density="comfortable" @click="evaluateExpression" :loading="loading" :disabled="loadingAll" v-bind="props">
                <v-icon>mdi-play</v-icon>
              </v-btn>
            </template>
            <span>Run Expression (Ctrl+Enter)</span>
          </v-tooltip>
          
          <v-tooltip location="bottom">
            <template v-slot:activator="{ props }">
              <v-btn icon dark tile density="comfortable" @click="evaluateWithAllEngines" :loading="loadingAll" :disabled="loading" v-bind="props">
                <v-icon>mdi-script-text-play-outline</v-icon>
              </v-btn>
            </template>
            <span>Run All Engines (Ctrl+Shift+Enter)</span>
          </v-tooltip>

          <v-divider style="margin: 16px 8px;" vertical></v-divider>

          <v-tooltip location="bottom" v-if="showShareLink()">
            <template v-slot:activator="{ props }">
              <v-btn 
                icon 
                dark 
                tile 
                density="comfortable" 
                @click="copyShareLinkToClipboard" 
                @mouseenter="updateShareText"
                v-bind="props"
              >
                <v-icon>mdi-share-variant-outline</v-icon>
              </v-btn>
            </template>
            <span style="white-space: pre-line;">{{ shareToolTipMessage }}</span>
          </v-tooltip>

          <v-tooltip location="bottom" v-if="showShareLink()">
            <template v-slot:activator="{ props }">
              <v-btn 
                icon 
                dark 
                tile 
                density="comfortable" 
                @click="copyZulipShareLinkToClipboard"
                @mouseenter="updateZulipShareText"
                v-bind="props"
              >
                <svg class="brand-logo" role="img" aria-label="Zulip" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" height="20">
                  <path fill="hsl(0, 0%, 100%)" d="M 473.09 122.97 c 0 22.69 -10.19 42.85 -25.72 55.08 L 296.61 312.69 c -2.8 2.4 -6.44 -1.47 -4.42 -4.7 l 55.3 -110.72 c 1.55 -3.1 -0.46 -6.91 -3.64 -6.91 H 129.36 c -33.22 0 -60.4 -30.32 -60.4 -67.37 c 0 -37.06 27.18 -67.37 60.4 -67.37 h 283.33 c 33.22 -0.02 60.4 30.3 60.4 67.35 z M 129.36 506.05 h 283.33 c 33.22 0 60.4 -30.32 60.4 -67.37 c 0 -37.06 -27.18 -67.37 -60.4 -67.37 H 198.2 c -3.18 0 -5.19 -3.81 -3.64 -6.91 l 55.3 -110.72 c 2.02 -3.23 -1.62 -7.1 -4.42 -4.7 L 94.68 383.6 c -15.53 12.22 -25.72 32.39 -25.72 55.08 c 0 37.05 27.18 67.37 60.4 67.37 z"></path>
                </svg>
              </v-btn>
            </template>
            <span style="white-space: pre-line;">{{ shareZulipToolTipMessage }}</span>
          </v-tooltip>
        </v-toolbar>
        
        <TwinPaneTab 
          :tabs="tabDetails" 
          ref="twinTabControl" 
          @mounted="onTwinPaneMounted" 
          @change="onTabChanged"
        >
          <!-- Expression Tab -->
          <template v-slot:Expression>
            <div class="tab-content">
              <span class="resetButton">
                <v-tooltip location="bottom" dark>
                  <template v-slot:activator="{ props }">
                    <v-btn
                      icon flat
                      density="compact"
                      v-bind="props"
                      @click="resetExpression"
                      class="ml-2"
                    >
                      <v-icon color="rgba(0, 0, 0, 0.54)">mdi-broom</v-icon>
                    </v-btn>
                  </template>
                  <span>Reset Expression and context</span>
                </v-tooltip>
              </span>
              <ResourceEditor
                :resource-text="fhirpathContextExpression"
                text-label="Context Expression (optional)"
                language="fhirpath"
                expression-editor
                :min-lines="1"
                :max-lines="6"
                @update:resource-text="fhirpathContextExpression = $event"
              />
              <ResourceEditor
                ref="fhirpathExpressionInput"
                :resource-text="fhirpathExpression"
                text-label="FHIRPath Expression"
                language="fhirpath"
                expression-editor
                :min-lines="3"
                :max-lines="12"
                @update:resource-text="fhirpathExpression = $event"
              />
              
              <div class="mt-4">
                <div class="results">RESULTS <span class="processedBy" v-if="singleEngineResult">{{ singleEngineResult.processedByEngine }}</span></div>
                <v-alert v-if="error" type="error" variant="outlined" class="mt-2">
                  {{ error }}
                </v-alert>

                <v-card v-if="allEngineResults.size > 0 && !singleEngineResult" variant="outlined" class="pa-3 mt-2">
                  <span class="text-grey">Multiple engine results available. Check the Results tab.</span>
                </v-card>
                
                <!-- Single Engine Result (also shown when an engine is selected from the multi-engine Results tab) -->
                <template v-if="singleEngineResult">
                  <template v-if="singleEngineResult.saveOutcome && singleEngineResult.showOutcome">
                    <v-alert type="error" variant="outlined" density="compact">
                      {{ singleEngineResult.saveOutcome.issue?.map(i => i.details?.text || i.diagnostics || 'Error').join(', ') }}
                    </v-alert>
                  </template>
                  <template v-else-if="singleEngineResult.results">
                    <template v-for="(resultItem, idx) in singleEngineResult.results" :key="idx">
                      <table class="v-table v-table--density-default" style="display: table; flex-shrink: 1; width: 100%; border: solid thin #eee; border-spacing: 0;">
                        <tr v-if="resultItem.context">
                          <td class="context" colspan="2">
                            <v-btn v-if="resultItem.position" color="transparent" density="compact" size="small" style="float:right;" icon flat title="Goto context" @click="navigateToResourcePath(resultItem.context)">
                              <v-icon color="rgba(0, 0, 0, 0.54)">mdi-target</v-icon>
                            </v-btn>
                            <div>Context: <b>{{ resultItem.context }}</b></div>
                          </td>
                        </tr>
                        <template v-for="(item, itemIdx) in resultItem.result" :key="itemIdx">
                          <tr>
                            <td class="result-value">
                              <div class="code-json">{{ item.value }}</div>
                            </td>
                            <td class="result-type">
                              <i v-if="item.type">({{ item.type }})</i>
                              <span v-if="item.path" class="result-path">{{ item.path }}
                                <v-btn v-if="item.path" color="transparent" density="compact" size="small" class="result-path-target" icon flat title="Goto context" @click="navigateToResourcePath(item.path)">
                                  <v-icon color="rgba(0, 0, 0, 0.54)">mdi-target</v-icon>
                                </v-btn>
                              </span>
                            </td>
                          </tr>
                        </template>
                      </table>
                    </template>
                  </template>
                </template>
                
                <v-card v-if="!singleEngineResult && allEngineResults.size === 0" variant="outlined" class="pa-3 mt-2">
                  <span class="text-grey">No results yet. Enter an expression and click run.</span>
                </v-card>
                
              </div>
            </div>
          </template>

          <!-- Resource Tab -->
          <template v-slot:Resource>
              <ResourceEditor
              ref="resourceEditor"
              label="Test Resource Id"
              :resourceUrl="resourceUrl"
              :resourceText="resourceText"
              :readOnly="false"
              textLabel="Test Resource"
              :tabSpaces="tabSpaces"
              :fhirServerExamplesUrl="fhirServerExamplesUrl"
              :dotnetServerDownloader="dotnetServerDownloader"
              @update:resourceUrl="onResourceUrlUpdate"
              @update:resourceText="onResourceTextUpdate"
            />
          </template>

          <!-- Results Tab (All Engines) -->
          <template v-slot:Results>
            <div class="tab-content">
              <h4 class="mb-2">All Engine Results</h4>
              <template v-if="allEngineResults.size > 0">
                <div v-for="[engineName, result] in allEngineResults" :key="engineName" variant="outlined" class="all-result-item" :class="{ 'all-result-item-selected': selectedEngineName === engineName }">
                  <v-icon style="float:right;" color="grey" v-if="result.parseDebugTree" title="Has Abstract Syntax Tree Data">mdi-file-tree</v-icon>
                  <div class="all-result">
                    <div
                      class="all-result-engine all-result-engine-clickable"
                      role="button"
                      tabindex="0"
                      :title="`Show ${engineName} results, AST and debug data`"
                      @click="selectEngineResult(engineName, result)"
                      @keydown.enter.prevent="selectEngineResult(engineName, result)"
                      @keydown.space.prevent="selectEngineResult(engineName, result)"
                    >
                      {{ engineName }} 
                    </div>
                    <div>
                      <template v-if="result.saveOutcome && result.showOutcome">
                        <v-alert type="error" variant="outlined" density="compact">
                          {{ result.saveOutcome.issue?.map(i => i.details?.text || i.diagnostics || 'Error').join(', ') }}
                        </v-alert>
                      </template>
                      <template v-else-if="result.results">
                        <template v-for="(resultItem, idx) in result.results" :key="idx">
                          <div v-if="resultItem.context" style="font-style: italic;">
                            Context: {{ resultItem.context }}
                          </div>
                          <div v-if="resultItem.result.length > 0">
                            <div v-for="(item, itemIdx) in resultItem.result" :key="itemIdx">
                              <span v-if="item.type" class="text-caption text-grey">{{ item.type }}: </span>
                              <code>{{ item.value }}</code>
                              <!-- <div v-if="item.path" class="text-caption text-grey">Path: {{ item.path }}</div> -->
                            </div>
                          </div>
                          <div v-else class="text-grey">Empty result</div>
                        </template>
                      </template>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </template>

          <!-- Variables Tab -->
          <template v-slot:Variables>
            <div class="tab-content">
              <h4>Variables</h4>
              <p class="text-grey">Define variables for use in your FHIRPath expressions.</p>
              
              <template v-for="(variable, index) in variables" :key="index">
                <v-row class="mb-2">
                  <v-col cols="4">
                    <v-text-field
                      v-model="variable.name"
                      label="Variable Name"
                      dense
                      hide-details="auto"
                    />
                  </v-col>
                  <v-col cols="7">
                    <v-text-field
                      v-model="variable.value"
                      label="Value"
                      dense
                      hide-details="auto"
                    />
                  </v-col>
                  <v-col cols="1">
                    <v-btn 
                      icon 
                      color="error" 
                      @click="removeVariable(index)"
                      title="Remove variable"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </template>
              
              <v-btn 
                color="primary" 
                @click="addVariable"
                prepend-icon="mdi-plus"
              >
                Add Variable
              </v-btn>
            </div>
          </template>

          <!-- Trace Tab -->
          <template v-slot:Trace>
            <div class="tab-content">
              <template v-if="singleEngineResult && singleEngineResult.results">
                <div v-if="selectedEngineName" class="text-caption text-grey mb-2">
                  Engine: {{ selectedEngineName }}
                </div>
                <div v-else-if="singleEngineResult.processedByEngine" class="text-caption text-grey mb-2">
                  Engine: {{ singleEngineResult.processedByEngine }}
                </div>
                <template v-for="(r2, i1) in singleEngineResult.results" :key="i1">
                  <v-table density="compact" class="trace-table">
                    <tbody>
                      <tr v-if="r2.context">
                        <td class="trace-context" colspan="3">
                          <div>Context: <b>{{ r2.context }}</b></div>
                        </td>
                      </tr>
                      <template v-for="(v1, index) in r2.trace" :key="index">
                        <tr>
                          <td class="trace-name"><b>{{ v1.name }}</b></td>
                          <td class="trace-value">
                            <div class="code-json" v-if="v1.value != null">{{ v1.value }}</div>
                            <div class="code-json" v-if="v1.value == null && v1.type === 'empty-string'"><i>""</i></div>
                          </td>
                          <td class="trace-meta">
                            <i v-if="v1.type">({{ v1.type }})</i>
                            <span v-if="v1.path" class="trace-path">{{ v1.path }}</span>
                          </td>
                        </tr>
                      </template>
                    </tbody>
                  </v-table>
                </template>
              </template>
              <v-card v-else variant="outlined" class="pa-3 mt-2">
                <span class="text-grey">No trace data available.</span>
              </v-card>
            </div>
          </template>

          <!-- AST Tab -->
          <template v-slot:AST>
            <div class="tab-content">
              <AbstractSyntaxTreeTab 
                :showAdvancedSettings="false"
                :astData="astData"
                @navigateToExpressionNode="navigateToExpressionNode"
              />
            </div>
          </template>

          <!-- DEBUG Tab -->
          <template v-slot:DEBUG>
            <ResourceEditor
              textLabel="Debug"
              :resourceText="singleEngineResult && singleEngineResult.raw ? JSON.stringify(singleEngineResult.raw, null, tabSpaces) : ''"
              :readOnly="true"
              :tabSpaces="tabSpaces"
            />
          </template>
        </TwinPaneTab>
      </v-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import type { Library } from 'fhir/r4b'
import type { TabData } from '~/components/TwinPaneTab.vue'
import ResourceEditor from '~/components/ResourceEditor.vue'
import { type IFhirPathEngineDetails, registeredEngines, applyConfigEngines } from '@legacy/types/fhirpath_test_engine'
import { evaluateFhirPathExpression, type FhirPathEvaluationOptions, type FhirPathEvaluationResult } from '@legacy/helpers/fhirpath_api_engine'
import type { VariableData } from 'models/testenginemodel'
import type { JsonNode } from 'models/FhirpathTesterData'
import type { Model } from "fhirpath";
import fhirpath_r4_model from 'fhirpath/fhir-context/r4'
import fhirpath_r5_model from 'fhirpath/fhir-context/r5'
// Note: R6 is not yet available in fhirpath.js package
import fhirpath_r6_model from "models/r6";
import AbstractSyntaxTreeTab from '~/components/AbstractSyntaxTreeTab.vue'
import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string'
import { EncodeTestFhirpathData, DecodeTestFhirpathData, type TestFhirpathData } from 'models/testenginemodel'
import { settings } from '@legacy/helpers/user_settings'
import { decodeLibraryContent } from '@legacy/helpers/library_content'
import type { IApplicationInsights } from '@microsoft/applicationinsights-web'

const { $appInsights } = useNuxtApp() as unknown as { $appInsights?: IApplicationInsights }

// Set the page title
useHead({
  title: 'FHIRPath Tester - FHIRPath Lab'
})

// Reactive data
const fhirpathContextExpression = ref<string>('name')
const fhirpathExpression = ref<string>('trace(\'trc\').given.join(\' \')\n.combine(family).join(\', \')')
const loading = ref<boolean>(false)
const loadingAll = ref<boolean>(false)
const error = ref<string>('')
const singleEngineResult = ref<FhirPathEvaluationResult | null>(null)
const allEngineResults = ref<Map<string, FhirPathEvaluationResult>>(new Map())
const astData = ref<JsonNode | null>(null)
// Tracks which engine in the multi-engine Results tab has been selected for the
// Expression / AST / DEBUG views. Cleared on every fresh evaluation.
const selectedEngineName = ref<string | null>(null)

// Trace tab is enabled when the currently displayed result has any trace entries.
// Driven off `singleEngineResult`, which is updated both by single-engine runs and
// by selecting an engine row in the multi-engine Results tab, so the Trace tab
// swaps content together with the AST and DEBUG tabs.
const hasTraceData = computed<boolean>(() => {
  const r = singleEngineResult.value
  if (!r || !r.results) return false
  return r.results.some(rd => rd.trace && rd.trace.length > 0)
})

// FHIR version and engine selection
const fhirVersions = ['R4', 'R5', 'R6']
const selectedFhirVersion = ref<string>('R4')
const selectedEngine = ref<IFhirPathEngineDetails | undefined>()
const isFhirVersionMenuOpen = ref<boolean>(false)
// Track engine menu state to hide tooltip when menu is open (prevents tooltip from staying visible behind the dropdown)
const isEngineMenuOpen = ref<boolean>(false)

const resourceUrl = ref<string>('Patient/example/_history/3')
const resourceId = ref<string>('example')
const testResource = ref<string>(`{
  "resourceType": "Patient",
  "id": "example",
  "name": [
    {
      "given": ["John"],
      "family": "Doe"
    },
    {
      "use": "usual",
      "given": ["Johnny"]
    }
  ],
  "gender": "male",
  "birthDate": "1970-01-01"
}`)
const resourceText = ref<string>(testResource.value)
const tabSpaces = ref<number>(2)
const fhirServerExamplesUrl = ref<string>(settings.load().fhirServerExamplesUrl ?? 'https://hapi.fhir.org/baseR4')
const dotnetServerDownloader = ref<string>('https://proxy.fhir.forms-lab.com/downloader')

// Template ref
const resourceEditor = ref<InstanceType<typeof ResourceEditor>>()
const fhirpathExpressionInput = ref<InstanceType<typeof ResourceEditor>>()

// Event handlers
const onResourceUrlUpdate = (newUrl: string) => {
  resourceUrl.value = newUrl
}

const onResourceTextUpdate = (newText: string) => {
  resourceText.value = newText
  resourceJsonChanged.value = true
}

const ast = ref<string>('')

const variables = ref<Array<{name: string, value: string}>>([]) // Start with no variables

// Share link state
const shareToolTipMessage = ref<string>('Copy a sharable link to this test expression')
const shareZulipToolTipMessage = ref<string>('Copy a sharable link for Zulip to this test expression')
const resourceJsonChanged = ref<boolean>(false)
const showAdvancedSettings = ref<boolean>(settings.showAdvancedSettings())
const loadedLibraryReference = ref<string>()
// Local copy of the effective engine registry (baseline + config overrides)
const effectiveEngines = ref<Record<string, IFhirPathEngineDetails>>({ })

// Computed property for filtered engines based on selected FHIR version
const engines = computed<IFhirPathEngineDetails[]>(() => {
  const filteredEngines = Object.values(effectiveEngines.value)
    .filter(engine => engine.fhirVersion === selectedFhirVersion.value
      && (!engine.earlyAdopter || showAdvancedSettings.value)
    )
  return filteredEngines
})

// Refresh local state from user settings after the settings dialog closes
const onSettingsClosed = () => {
  const s = settings.load()
  showAdvancedSettings.value = s.showAdvancedSettings
  if (s.fhirServerExamplesUrl) {
    fhirServerExamplesUrl.value = s.fhirServerExamplesUrl
  }
  // If the currently selected engine is no longer in the visible list
  // (e.g. advanced settings was disabled), fall back to the first available.
  if (selectedEngine.value && !engines.value.includes(selectedEngine.value)) {
    selectedEngine.value = engines.value[0]
  }
}

// Initialize selected engine
if (!selectedEngine.value && engines.value.length > 0) {
  selectedEngine.value = engines.value[0]
}

// Lifecycle hooks
onMounted(async () => {
  document.addEventListener('keydown', ctrlEnterHandler)
  window.addEventListener('hashchange', handleHashChange)

  // Apply config URL override before any config fetch is triggered
  const route = useRoute()
  const configParam = route.query.config as string | undefined
  if (configParam) {
    settings.setConfigUrl(configParam)
  }

  // Eagerly load config and build the effective engine list (baseline + overrides)
  const config = await settings.getServerConnectionData();
  
  effectiveEngines.value = await applyConfigEngines(registeredEngines, config);

  // Re-select engine after registry may have changed
  if (!selectedEngine.value || !engines.value.includes(selectedEngine.value)) {
    selectedEngine.value = engines.value[0]
  }

  // Check if there's a hash on initial load
  const hash = window.location.hash ? window.location.hash.substring(1) : undefined
  if (hash) {
    handleHashChange()
  } else {
    // Check for query parameters
    const params = readParametersFromQuery()
    if (params.expression || params.libraryId) {
      try {
        await applyParameters(params)
        // Run evaluation after applying parameters
        await evaluateExpression()
      } catch (caught) {
        error.value = axios.isAxiosError(caught)
          ? caught.response?.data?.issue?.[0]?.diagnostics || caught.message
          : caught instanceof Error ? caught.message : 'Unable to load the FHIRPath test.'
      }
    }
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', ctrlEnterHandler)
  window.removeEventListener('hashchange', handleHashChange)
})

// Tab configuration
const tabDetails = computed<TabData[]>(() => [
  {
    iconName: "mdi-function-variant",
    tabName: "Expression",
    show: true,
    enabled: true,
  },
  {
    iconName: "mdi-clipboard-text-outline", 
    tabName: "Resource",
    tabSubName: "(test input)",
    show: true,
    enabled: true,
  },
  {
    iconName: "mdi-chart-box-multiple-outline",
    tabName: "Results",
    tabSubName: "(all engines)",
    show: allEngineResults.value.size > 0 || loadingAll.value,
    enabled: true,
  },
  {
    iconName: "mdi-application-variable-outline",
    tabName: "Variables", 
    show: variables.value.length > 0,
    enabled: true,
  },
  {
    iconName: "mdi-format-list-bulleted",
    tabName: "Trace",
    show: true,
    enabled: hasTraceData.value,
  },
  {
    iconName: "mdi-file-tree",
    tabName: "AST",
    tabHeaderName: "Abstract Syntax Tree",
    title: "Abstract Syntax Tree",
    show: true,
    enabled: true,
    keepMounted: true,
  },
  {
    iconName: "mdi-bug-outline",
    tabName: "DEBUG",
    show: true,
    enabled: true,
  },
])

// Template ref
const twinTabControl = ref()

// Methods
const onTwinPaneMounted = () => {
  // console.log('TwinPaneTab mounted')
}

const onTabChanged = (tabIndex: number) => {
  // console.log('Tab changed to:', tabIndex)
}

const addVariable = () => {
  variables.value.push({ name: '', value: '' })
}

const removeVariable = (index: number) => {
  variables.value.splice(index, 1)
}

const resetExpression = () => {
  fhirpathExpression.value = ''
  fhirpathContextExpression.value = ''
  // Focus the expression input after resetting
  nextTick(() => {
    fhirpathExpressionInput.value?.focus()
  })
}

// Navigate to expression node from AST
const navigateToExpressionNode = (node: JsonNode) => {
  twinTabControl.value?.selectTab(0)

  nextTick(() => {
    fhirpathExpressionInput.value?.navigateToTextRange({
      position: node.Position,
      line: node.Line,
      column: node.Column,
      length: node.Length ?? node.Name.length,
    })
  })
}

// Navigate to a resource path in the test resource editor
const navigateToResourcePath = (elementPath: string) => {
  // Switch to the Resource tab (index 1)
  if (twinTabControl.value) {
    twinTabControl.value.selectTab(1)
  }
  
  // Get the appropriate FHIR model based on selected version
  let model: Model
  if (selectedFhirVersion.value === 'R5') {
    model = fhirpath_r5_model
  } else if (selectedFhirVersion.value === 'R6') {
    model = fhirpath_r6_model
  } else {
    model = fhirpath_r4_model
  }
  
  // Call the ResourceEditor's navigateToContext method after switching tabs
  // Use setTimeout to ensure tab switch completes before navigation
  setTimeout(() => {
    if (resourceEditor.value && elementPath) {
      resourceEditor.value.navigateToContext(model, elementPath)
    }
  }, 0)
}

// Keyboard event handler for Ctrl+Enter to run expression
const ctrlEnterHandler = (event: KeyboardEvent) => {
 
  // Ctrl + Shift + Enter to evaluate with all engines
  // Command + Shift + Enter to evaluate with all engines on MacOS
  if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === "Enter") {
    evaluateWithAllEngines()
    event.preventDefault()
    return
  }
  
  // Ctrl + Enter to evaluate the expression
  // Command + Enter to evaluate the expression on MacOS
  if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
    evaluateExpression()
    event.preventDefault()
  }
}

// URL hash handling
const handleHashChange = async () => {
  const hash = window.location.hash ? window.location.hash.substring(1) : undefined
  if (hash) {
    try {
      const data = DecodeTestFhirpathData(hash)
      console.log('Hash changed, loading new parameters:', data)
      await applyParameters(data)
      await evaluateExpression()
    } catch (e) {
      console.error('Failed to decode hash parameters:', e)
      error.value = axios.isAxiosError(e)
        ? e.response?.data?.issue?.[0]?.diagnostics || e.message
        : e instanceof Error ? e.message : 'Unable to load the shared FHIRPath test.'
    }
  }
}

// Read parameters from URL query
const readParametersFromQuery = (): TestFhirpathData => {
  const route = useRoute()
  let data: TestFhirpathData = {
    expression: route.query.expression as string
  }
  
  if (route.query.libraryId) {
    data.libraryId = route.query.libraryId as string
  } else {
    if (route.query.context) {
      data.context = route.query.context as string
    }
    
    if (route.query.resource) {
      data.resource = route.query.resource as string
    }
    
    const resourceJson = route.query.resourceJson as string
    if (resourceJson) {
      data.resourceJson = decompressFromEncodedURIComponent(resourceJson) ?? ''
    }
    
    if (route.query.exampletype) {
      data.exampletype = route.query.exampletype as string
    }
    
    if (route.query.engine) {
      data.engine = route.query.engine as string ?? ''
    }
    
    if (route.query) {
      // Iterate all query parameters looking for variables identified by prefix "var-"
      for (const [key, value] of Object.entries(route.query)) {
        if (key.startsWith('var-')) {
          const varName = key.substring(4)
          const varValue = value as string
          data.variables = data.variables ?? []
          data.variables.push({ name: varName, data: varValue })
        }
      }
    }
    
    if (route.query.terminologyServer) {
      data.terminologyServer = route.query.terminologyServer as string ?? ''
    }
  }
  return data
}

// Apply parameters from URL
const applyParameters = async (p: TestFhirpathData) => {
  if (p.libraryId) {
    await loadFhirPathLibrary(p.libraryId)
  }
  if (p.expression !== undefined) {
    fhirpathExpression.value = p.expression
  }
  
  // Always set context, clearing it if not present
  fhirpathContextExpression.value = p.context || ''
  
  if (p.resource) {
    resourceUrl.value = p.resource
  }

  async function loadFhirPathLibrary(libraryId: string) {
    const url = libraryId.startsWith('http')
      ? libraryId
      : `${settings.getFhirServerUrl()}/Library/${libraryId}`
    const response = await axios.get<Library>(url, {
      headers: { Accept: 'application/fhir+json, application/json' },
    })
    const content = response.data.content?.find(content =>
      content.contentType === 'text/fhirpath' && content.data,
    )
    if (!content?.data) throw new Error('The selected Library has no FHIRPath source content.')
    loadedLibraryReference.value = url
    fhirpathExpression.value = decodeLibraryContent(content.data)
  }
  
  const resourceJson = p.resourceJson
  if (resourceJson) {
    if (resourceJson.startsWith('<')) {
      resourceText.value = resourceJson
    } else {
      try {
        resourceText.value = JSON.stringify(JSON.parse(resourceJson), null, tabSpaces.value)
      } catch (e) {
        resourceText.value = resourceJson
      }
    }
    resourceJsonChanged.value = true
    resourceUrl.value = ''
  }
  
  if (p.engine) {
    const engine = Object.values(effectiveEngines.value).find(e => e.legacyName === p.engine)
    if (engine) {
      selectedEngine.value = engine
      selectedFhirVersion.value = engine.fhirVersion
    }
  }
  
  // Always set variables, clearing them if not present
  if (p.variables && p.variables.length > 0) {
    variables.value = p.variables.map(v => ({ name: v.name, value: v.data }))
  } else {
    variables.value = []
  }
}

// Share link functionality
const showShareLink = (): boolean => {
  if (navigator?.clipboard) {
    return true
  }
  return false
}

const pleaseNoShareMessage = '\r\n________\r\nPLEASE don\'t share this insiders hackweek\n site outside those already known to use it.\nThe share URL has been swapped to the dev site.';

const updateShareText = () => {
  shareToolTipMessage.value = 'Copy a sharable link to this test expression'
  if (resourceText.value && resourceJsonChanged.value) {
    shareToolTipMessage.value += '\r\n(without example resource JSON)'
  }

  shareToolTipMessage.value += pleaseNoShareMessage;
}

const updateZulipShareText = () => {
  const data = prepareSharePackageData()
  shareZulipToolTipMessage.value = `Copy a sharable link for Zulip to this test expression (${EncodeTestFhirpathData(data).length} bytes)`

  shareZulipToolTipMessage.value += pleaseNoShareMessage;
}

const prepareSharePackageData = (): TestFhirpathData => {
  let packageData: TestFhirpathData = {
    expression: fhirpathExpression.value ?? '',
    context: fhirpathContextExpression.value || undefined,
    resource: resourceUrl.value || undefined,
    engine: selectedEngine.value?.legacyName,
    libraryId: loadedLibraryReference.value,
  }
  
  if (variables.value.length > 0) {
    packageData.variables = variables.value.map(v => ({
      name: v.name,
      data: v.value
    }))
  }
  
  const resourceJson = resourceText.value
  if (resourceJson && resourceJsonChanged.value) {
    try {
      if (resourceJson.startsWith('<')) {
        packageData.resourceJson = resourceJson
      } else {
        packageData.resourceJson = JSON.stringify(JSON.parse(resourceJson))
      }
    } catch {
      // Ignore parse errors
    }
  }
  
  return packageData
}

const copyShareLinkToClipboard = () => {
  const url = new URL(window.location.href)
  let useUrl = url.origin;
  if (useUrl.toLowerCase() === 'https://hackweek.fhirpath-lab.com') {
    useUrl = 'https://dev.fhirpath-lab.com';
  }
  const packageData = prepareSharePackageData()
  const compressedData = EncodeTestFhirpathData(packageData)
  const shareUrl = `${useUrl}/FhirPath#${compressedData}`
  
  if (navigator.clipboard) {
    navigator.clipboard.writeText(shareUrl)
    shareToolTipMessage.value = 'Copied'
    console.log('Copied share link:', shareUrl)
  }
}

const copyZulipShareLinkToClipboard = () => {
  const url = new URL(window.location.href)
  let useUrl = url.origin;
  if (useUrl.toLowerCase() === 'https://hackweek.fhirpath-lab.com') {
    useUrl = 'https://dev.fhirpath-lab.com';
  }
  const packageData = prepareSharePackageData()
  const compressedData = EncodeTestFhirpathData(packageData)
  const shareUrl = `\`\`\`fhirpath\n${packageData.expression}\n\`\`\`\n:test_tube: [Test with FHIRPath-Lab](${useUrl}/fhirpath#${compressedData})`
  
  if (navigator.clipboard) {
    navigator.clipboard.writeText(shareUrl)
    shareZulipToolTipMessage.value = 'Copied'
    console.log('Copied Zulip share link')
  }
}

// Helper to get engine tooltip
const engineTooltip = (engine?: IFhirPathEngineDetails): string => {
  if (!engine) return ''
  let tooltip = `${engine.name} (${engine.fhirVersion})`
  tooltip += `\nPublisher: ${engine.publisher}`
  if (engine.description) {
    tooltip += `\n${engine.description}`
  }
  if (engine.external) {
    tooltip += '\n(hosted externally to the fhirpath-lab)'
  }
  if (engine.githubRepo) {
    tooltip += `\nGitHub: ${engine.githubRepo}`
  }
  if (engine.supportsXML) {
    tooltip += '\nSupports XML and Json'
  }
  return tooltip
}

// Handle FHIR version change
const changeFhirVersion = async () => {
  // Update selected engine to match new version if needed
  const lastSelectedEngine = selectedEngine.value
  if (lastSelectedEngine) {
    const matchingEngine = engines.value.find(e => e.name === lastSelectedEngine.name)
    selectedEngine.value = matchingEngine || engines.value[0]
  } else {
    selectedEngine.value = engines.value[0]
  }
  await evaluateExpression()
}

// Evaluate expression with all engines
const evaluateWithAllEngines = async () => {
  if (!fhirpathExpression.value) {
    error.value = 'Please enter a FHIRPath expression'
    return
  }

  loadingAll.value = true
  error.value = ''
  singleEngineResult.value = null
  selectedEngineName.value = null
  astData.value = null

  // Track a single aggregate event for the all-engines batch run so the individual
  // engine stats aren't skewed by the parallel fire-and-forget execution.
  // Don't trace usage by Brian as that distorts the usage data.
  if (settings.load().defaultProviderField !== 'Brian Postlethwaite') {
    $appInsights?.trackEvent({ name: 'evaluate hackweek' })
  }
  
  // Switch to the all engines results tab (index 2)
  if (twinTabControl.value) {
    twinTabControl.value.selectTab(2)
  }
  
  // Pre-populate with empty loading results for each engine
  allEngineResults.value.clear()
  engines.value.forEach(engine => {
    allEngineResults.value.set(engine.name, {
      results: [],
      debugTraceData: [],
      processedByEngine: `${engine.name} (loading...)`
    })
  })

  try {
    // Convert variables to Map format
    const variablesMap = new Map<string, VariableData>()
    variables.value.forEach(v => {
      if (v.name) {
        variablesMap.set(v.name, { data: v.value })
      }
    })

    // Build options object
    const resourceData = resourceText.value || testResource.value
    const isXml = resourceData.trim().startsWith('<')
    
    let options: FhirPathEvaluationOptions = {
      expression: fhirpathExpression.value,
      resourceJson: resourceData,
      variables: variablesMap,
      terminologyServer: '',
      enableDebugTrace: true,
      isXmlResource: isXml
    }
    if (fhirpathContextExpression.value) {
      options.contextExpression = fhirpathContextExpression.value;
    }

    // Evaluate with all engines in parallel, updating results as they complete
    const evaluationPromises = engines.value.map(async (engine) => {
      try {
        const result = await evaluateFhirPathExpression(options, engine)
        // Update the result as soon as it's available
        allEngineResults.value.set(engine.name, result)
        
        // Capture the first AST we encounter
        if (!astData.value && result.parseDebugTree) {
          try {
            astData.value = JSON.parse(result.parseDebugTree)
          } catch (err) {
            console.error('Failed to parse AST from engine:', engine.name, err)
          }
        }
        
        return { engineName: engine.name, result }
      } catch (err: any) {
        console.error(`Error evaluating with engine ${engine.name}:`, err)
        // Update with error result
        const errorResult = {
          saveOutcome: {
            resourceType: 'OperationOutcome',
            issue: [{
              severity: 'error',
              code: 'exception',
              diagnostics: err.message || 'Evaluation failed'
            }]
          },
          showOutcome: true,
          results: [],
          debugTraceData: []
        } as FhirPathEvaluationResult
        allEngineResults.value.set(engine.name, errorResult)
        return {
          engineName: engine.name,
          result: errorResult
        }
      }
    })

    await Promise.all(evaluationPromises)

  } catch (err: any) {
    console.error('Evaluation error:', err)
    error.value = err.message || 'An error occurred during evaluation'
  } finally {
    loadingAll.value = false
  }
}

// Select an engine's result from the multi-engine Results tab.
// Updates the Expression-tab single-result view, the AST tab and the DEBUG tab
// to reflect the chosen engine's result.
const selectEngineResult = (engineName: string, result: FhirPathEvaluationResult) => {
  selectedEngineName.value = engineName
  singleEngineResult.value = result

  if (result.parseDebugTree) {
    try {
      astData.value = JSON.parse(result.parseDebugTree)
    } catch (err) {
      console.error('Failed to parse AST from engine:', engineName, err)
      astData.value = null
    }
  } else {
    astData.value = null
  }
}

// Evaluate FHIRPath expression using the helper API
const evaluateExpression = async () => {
  if (!fhirpathExpression.value) {
    error.value = 'Please enter a FHIRPath expression'
    return
  }

  if (!selectedEngine.value) {
    error.value = 'Please select an engine'
    return
  }

  loading.value = true
  error.value = ''
  singleEngineResult.value = null
  selectedEngineName.value = null
  allEngineResults.value.clear()

  // Don't trace usage by Brian as that distorts the usage data.
  if (settings.load().defaultProviderField !== 'Brian Postlethwaite') {
    $appInsights?.trackEvent({ name: 'evaluate ' + (selectedEngine.value.appInsightsEngineName ?? selectedEngine.value.name) })
  }

  try {
    // Convert variables to Map format
    const variablesMap = new Map<string, VariableData>()
    variables.value.forEach(v => {
      if (v.name) {
        variablesMap.set(v.name, { name: v.name, data: v.value })
      }
    })

    // Build options object
    const resourceData = resourceText.value || testResource.value
    const isXml = resourceData.trim().startsWith('<')
    
    let options: FhirPathEvaluationOptions = {
      expression: fhirpathExpression.value,
      resourceJson: resourceData,
      variables: variablesMap,
      terminologyServer: '',
      enableDebugTrace: true,
      isXmlResource: isXml
    }
    if (fhirpathContextExpression.value) {
      options.contextExpression = fhirpathContextExpression.value;
    }

    // Call the helper API with selected engine
    const result = await evaluateFhirPathExpression(options, selectedEngine.value)

    if (result.saveOutcome && result.showOutcome) {
      error.value = result.saveOutcome.issue?.map(i => i.details?.text || i.diagnostics || 'Error').join(', ') || 'Evaluation failed'
    } else {
      // Store single engine result
      singleEngineResult.value = result
      
      // Update AST display
      if (result.parseDebugTree) {
        try {
          astData.value = JSON.parse(result.parseDebugTree)
        } catch (err) {
          console.error('Failed to parse AST:', err)
          astData.value = null
        }
      } else {
        astData.value = null
      }
    }
  } catch (err: any) {
    console.error('Evaluation error:', err)
    error.value = err.message || 'An error occurred during evaluation'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
@use '~/assets/variables.scss' as *;

.container-fluid {
  padding-left: 16px;
  padding-right: 16px;
}

.external-engine {
  color: blueviolet !important;
}

.toolbar-select-activator {
  display: inline-flex;
}

.engine-item-tooltip-activator {
  display: block;
}

.engine-tooltip-content {
  white-space: pre-line;
}

.tab-content {
  overflow-y: auto;
  max-height: calc(100vh - 250px);
}

.all-result {
  display: flex;
  flex-direction: row;
}
.all-result .all-result-engine {
  margin-right: 8px;
  min-width: 72px;
}
.all-result-engine-clickable {
  cursor: pointer;
}
.all-result-engine-clickable:focus {
  outline: none;
}
.all-result-item {
  border-left: 3px solid transparent;
  padding-left: 6px;
}
.all-result-item-selected {
  background-color: rgba(25, 118, 210, 0.08);
  border-left-color: #1976d2;
}
.all-result-item + .all-result-item {
  border-top: thin solid lightgray;
  margin-top: 4px;
  padding-top: 4px;
}
.resetButton {
  right: 30px;
  position: absolute;
  top: 20px;
  z-index: 2;
}

td {
  vertical-align: top;
  height: unset !important;
  padding: 8px;
}

.results {
  padding: 4px 12px;
  color: white;
  font-style: bold;
  font-size: 1.25rem;
  line-height: 1.5;
  background-color: $card-header-color;
  margin-top: 10px;
}

.processedBy {
  float: right;
  font-size: small;
}

.result-type {
  position: relative;
  border-bottom: silver 1px solid;
}

.result-value {
  position: relative;
  width: 100%;
  border-bottom: silver 1px solid;
}

.code-json {
  white-space: pre-wrap;
}

.context {
  border-bottom: silver 1px solid;
  background-color: $tab-backcolor;
}

.result-path {
  display: inline-block;
  margin-left: 8px;
  font-size: 0.875rem;
}

.result-type:has(.result-path) {
  padding-bottom: 12px;
}

.result-path {
  font-size: 0.6rem;
  color: #666;
  font-style: italic;
  position: absolute;
  bottom: -1px;
  right: 4px;
  text-wrap-mode: nowrap;
}

.result-path-target {
  right: 0px;
  bottom: -1px;
}

.trace-table {
  margin-bottom: 12px;
}
.trace-table .trace-context {
  background-color: #f5f5f5;
  border-bottom: silver 1px solid;
  font-style: italic;
}
.trace-table .trace-name {
  border-bottom: silver 1px solid;
  vertical-align: top;
  white-space: nowrap;
}
.trace-table .trace-value {
  border-bottom: silver 1px solid;
  vertical-align: top;
  width: 100%;
}
.trace-table .trace-meta {
  border-bottom: silver 1px solid;
  vertical-align: top;
  white-space: nowrap;
}
.trace-table .trace-path {
  font-size: 0.6rem;
  color: #666;
  font-style: italic;
  margin-left: 6px;
}
.trace-table .code-json {
  white-space: pre-wrap;
  font-family: monospace;
}

</style>