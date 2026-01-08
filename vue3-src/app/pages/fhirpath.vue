<template>
  <div>
    <HeaderNavbar />
    
    <div class="container-fluid bd-layout" style="padding-top: 80px">
      <v-card class="page-content">
        <v-toolbar color="primary" dark>
          <v-toolbar-title>FHIRPath Tester</v-toolbar-title>
          <v-spacer />
          
          <v-select 
            dark 
            style="max-width: 6ch; margin-right: 8px; margin-left: 8px;" 
            :items="fhirVersions" 
            v-model="selectedFhirVersion" 
            hide-details="auto" 
            @update:modelValue="changeFhirVersion"
            density="compact"
          />
          
          <v-select 
            dark 
            style="max-width: 13ch" 
            :items="engines" 
            item-title="name"
            return-object 
            v-model="selectedEngine" 
            hide-details="auto" 
            @update:modelValue="evaluateExpression"
            :title="engineTooltip(selectedEngine)"
            density="compact"
          >
            <template v-slot:item="{ item, props }">
              <v-list-item v-bind="props" :title="engineTooltip(item.raw)">
                <template v-slot:title>
                  <span v-if="!item.raw.external">{{ item.raw.name }}</span>
                  <span v-else class="external-engine">
                    <v-icon size="small">mdi-web</v-icon> {{ item.raw.name }} *
                  </span>
                </template>
                <template v-slot:subtitle>
                  <span :class="item.raw.external ? 'external-engine' : ''">{{ item.raw.publisher }}</span>
                </template>
              </v-list-item>
            </template>
          </v-select>

          <v-btn icon dark tile density="comfortable" title="Run Expression (Alt+G)" @click="evaluateExpression" :loading="loading" :disabled="loadingAll">
            <v-icon>mdi-play</v-icon>
          </v-btn>
          <v-btn icon dark tile density="comfortable" title="Run All Engines" @click="evaluateWithAllEngines" :loading="loadingAll" :disabled="loading">
            <v-icon>mdi-script-text-play-outline</v-icon>
          </v-btn>

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
            <span>{{ shareToolTipMessage }}</span>
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
            <span>{{ shareZulipToolTipMessage }}</span>
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
              <div class="d-flex align-center">
                <h4 class="flex-grow-1">FHIRPath Expression</h4>
                <v-tooltip location="bottom" dark>
                  <template v-slot:activator="{ props }">
                    <v-btn
                      icon flat
                      density="comfortable"
                      v-bind="props"
                      @click="resetExpression"
                      class="ml-2"
                    >
                      <v-icon color="rgba(0, 0, 0, 0.54)">mdi-broom</v-icon>
                    </v-btn>
                  </template>
                  <span>Reset Expression and context</span>
                </v-tooltip>
              </div>
              <v-textarea
                v-model="fhirpathContextExpression"
                label="Context Expression (optional)"
                rows="1"
                outlined
                hide-details="auto"
              />
              <v-textarea
                v-model="fhirpathExpression"
                label="FHIRPath Expression"
                rows="3"
                outlined
                hide-details="auto"
              />
              
              <div class="mt-4">
                <h5>Results:</h5>
                <v-alert v-if="error" type="error" variant="outlined" class="mt-2">
                  {{ error }}
                </v-alert>
                
                <!-- Single Engine Result (only show when no multi-engine results) -->
                <v-card v-if="singleEngineResult && allEngineResults.size === 0" variant="outlined" class="pa-3 mt-2">
                  <div v-if="singleEngineResult.processedByEngine" class="text-caption text-grey mb-2">
                    Engine: {{ singleEngineResult.processedByEngine }}
                  </div>
                  <template v-if="singleEngineResult.saveOutcome && singleEngineResult.showOutcome">
                    <v-alert type="error" variant="outlined" density="compact">
                      {{ singleEngineResult.saveOutcome.issue?.map(i => i.details?.text || i.diagnostics || 'Error').join(', ') }}
                    </v-alert>
                  </template>
                  <template v-else-if="singleEngineResult.results">
                    <template v-for="(resultItem, idx) in singleEngineResult.results" :key="idx">
                      <div v-if="resultItem.context" class="font-weight-bold mb-1">
                        Context: {{ resultItem.context }}
                      </div>
                      <div v-if="resultItem.result.length > 0">
                        <div v-for="(item, itemIdx) in resultItem.result" :key="itemIdx" class="mb-2">
                          <span v-if="item.type" class="text-caption text-grey">{{ item.type }}: </span>
                          <code>{{ item.value }}</code>
                          <div v-if="item.path" class="text-caption text-grey">Path: {{ item.path }}</div>
                        </div>
                      </div>
                      <div v-else class="text-grey">Empty result</div>
                    </template>
                  </template>
                </v-card>
                
                <v-card v-if="!singleEngineResult && allEngineResults.size === 0" variant="outlined" class="pa-3 mt-2">
                  <span class="text-grey">No results yet. Enter an expression and click run.</span>
                </v-card>
                
                <v-card v-if="allEngineResults.size > 0" variant="outlined" class="pa-3 mt-2">
                  <span class="text-grey">Multiple engine results available. Check the Results tab.</span>
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
                <div v-for="[engineName, result] in allEngineResults" :key="engineName" variant="outlined" class="all-result-item">
                  <v-icon style="float:right;" color="grey" v-if="result.parseDebugTree" title="Has Abstract Syntax Tree Data">mdi-file-tree</v-icon>
                  <div class="all-result">
                    <div class="all-result-engine">
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
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import type { TabData } from '~/components/TwinPaneTab.vue'
import ResourceEditor from '~/components/ResourceEditor.vue'
import { type IFhirPathEngineDetails, registeredEngines } from '@legacy/types/fhirpath_test_engine'
import { evaluateFhirPathExpression, type FhirPathEvaluationOptions, type FhirPathEvaluationResult } from '@legacy/helpers/fhirpath_api_engine'
import type { VariableData } from '@legacy/models/testenginemodel'
import type { ParseTreeNode } from '@legacy/models/FhirpathTesterData'
import fhirpath_r4_model from 'fhirpath/fhir-context/r4'
import fhirpath_r5_model from 'fhirpath/fhir-context/r5'
import AbstractSyntaxTreeTab from '~/components/AbstractSyntaxTreeTab.vue'
import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string'
import { EncodeTestFhirpathData, DecodeTestFhirpathData, type TestFhirpathData } from '@legacy/models/testenginemodel'
import { settings } from '@legacy/helpers/user_settings'

// Set the page title
useHead({
  title: 'FHIRPath Tester - FHIRPath Lab'
})

// Reactive data
const fhirpathContextExpression = ref<string>('name')
const fhirpathExpression = ref<string>('trace(\'trc\').given.join(\' \').combine(family).join(\', \')')
const loading = ref<boolean>(false)
const loadingAll = ref<boolean>(false)
const error = ref<string>('')
const singleEngineResult = ref<FhirPathEvaluationResult | null>(null)
const allEngineResults = ref<Map<string, FhirPathEvaluationResult>>(new Map())
const astData = ref<ParseTreeNode | null>(null)

// FHIR version and engine selection
const fhirVersions = ['R4', 'R5', 'R6']
const selectedFhirVersion = ref<string>('R4')
const selectedEngine = ref<IFhirPathEngineDetails | undefined>()

const resourceUrl = ref<string>('Patient/example')
const resourceId = ref<string>('example')
const testResource = ref<string>(`{
  "resourceType": "Patient",
  "id": "example",
  "name": [
    {
      "given": ["John"],
      "family": "Doe"
    }
  ],
  "gender": "male",
  "birthDate": "1970-01-01"
}`)
const resourceText = ref<string>(testResource.value)
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
  resourceJsonChanged.value = true
}

const ast = ref<string>('')

const variables = ref<Array<{name: string, value: string}>>([]) // Start with no variables

// Share link state
const shareToolTipMessage = ref<string>('Copy a sharable link to this test expression')
const shareZulipToolTipMessage = ref<string>('Copy a sharable link for Zulip to this test expression')
const resourceJsonChanged = ref<boolean>(false)

// Computed property for filtered engines based on selected FHIR version
const engines = computed<IFhirPathEngineDetails[]>(() => {
  const filteredEngines = Object.values(registeredEngines)
    .filter(engine => engine.fhirVersion === selectedFhirVersion.value)
  return filteredEngines
})

// Initialize selected engine
if (!selectedEngine.value && engines.value.length > 0) {
  selectedEngine.value = engines.value[0]
}

// Lifecycle hooks
onMounted(async () => {
  window.addEventListener('hashchange', handleHashChange)
  
  // Check if there's a hash on initial load
  const hash = window.location.hash ? window.location.hash.substring(1) : undefined
  if (hash) {
    handleHashChange()
  } else {
    // Check for query parameters
    const params = readParametersFromQuery()
    if (params.expression) {
      await applyParameters(params)
      // Run evaluation after applying parameters
      await evaluateExpression()
    }
  }
})

onBeforeUnmount(() => {
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
    iconName: "mdi-file-tree",
    tabName: "AST",
    tabHeaderName: "Abstract Syntax Tree",
    title: "Abstract Syntax Tree",
    show: true,
    enabled: true,
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
}

// Navigate to expression node from AST
const navigateToExpressionNode = (node: ParseTreeNode) => {
  console.log('Navigate to expression node:', node)
  // TODO: Highlight the expression text in the editor
  // This would need the expression editor to support highlighting
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
  if (p.expression) {
    fhirpathExpression.value = p.expression
  }
  
  // Always set context, clearing it if not present
  fhirpathContextExpression.value = p.context || ''
  
  if (p.resource) {
    resourceUrl.value = p.resource
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
    const engine = Object.values(registeredEngines).find(e => e.legacyName === p.engine)
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

const updateShareText = () => {
  shareToolTipMessage.value = 'Copy a sharable link to this test expression'
  if (resourceText.value && resourceJsonChanged.value) {
    shareToolTipMessage.value += '\r\n(without example resource JSON)'
  }
}

const updateZulipShareText = () => {
  const data = prepareSharePackageData()
  shareZulipToolTipMessage.value = `Copy a sharable link for Zulip to this test expression (${EncodeTestFhirpathData(data).length} bytes)`
}

const prepareSharePackageData = (): TestFhirpathData => {
  let packageData: TestFhirpathData = {
    expression: fhirpathExpression.value ?? '',
    context: fhirpathContextExpression.value || undefined,
    resource: resourceUrl.value || undefined,
    engine: selectedEngine.value?.legacyName,
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
  const packageData = prepareSharePackageData()
  const compressedData = EncodeTestFhirpathData(packageData)
  const shareUrl = `${url.origin}/fhirpath#${compressedData}`
  
  if (navigator.clipboard) {
    navigator.clipboard.writeText(shareUrl)
    shareToolTipMessage.value = 'Copied'
    console.log('Copied share link:', shareUrl)
  }
}

const copyZulipShareLinkToClipboard = () => {
  const url = new URL(window.location.href)
  const packageData = prepareSharePackageData()
  const compressedData = EncodeTestFhirpathData(packageData)
  const shareUrl = `\`\`\`fhirpath\n${packageData.expression}\n\`\`\`\n:test_tube: [Test with FHIRPath-Lab](${url.origin}/fhirpath#${compressedData})`
  
  if (navigator.clipboard) {
    navigator.clipboard.writeText(shareUrl)
    shareZulipToolTipMessage.value = 'Copied'
    console.log('Copied Zulip share link')
  }
}

// Helper to get engine tooltip
const engineTooltip = (engine?: IFhirPathEngineDetails): string => {
  if (!engine) return ''
  const parts = [engine.name]
  if (engine.publisher) parts.push(`Publisher: ${engine.publisher}`)
  if (engine.description) parts.push(engine.description)
  if (engine.external) parts.push('(External service)')
  return parts.join(' - ')
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
  allEngineResults.value.clear()

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

<style scoped>
.container-fluid {
  padding-left: 16px;
  padding-right: 16px;
}

.external-engine {
  color: blueviolet !important;
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
.all-result-item + .all-result-item {
  border-top: thin solid lightgray;
  margin-top: 4px;
  padding-top: 4px;
}
</style>