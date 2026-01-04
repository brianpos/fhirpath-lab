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
              <h4>FHIRPath Expression</h4>
              <v-textarea
                v-model="fhirpathContextExpression"
                label="Context Expression (optional)"
                rows="1"
                outlined
                hide-details="auto"
              />
              <v-textarea
                v-model="fhirpathExpression"
                label="Enter your FHIRPath expression"
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
import { ref, computed } from 'vue'
import type { TabData } from '~/components/TwinPaneTab.vue'
import ResourceEditor from '~/components/ResourceEditor.vue'
import { type IFhirPathEngineDetails, registeredEngines } from '@legacy/types/fhirpath_test_engine'
import { evaluateFhirPathExpression, type FhirPathEvaluationOptions, type FhirPathEvaluationResult } from '@legacy/helpers/fhirpath_api_engine'
import type { VariableData } from '@legacy/models/testenginemodel'
import type { ParseTreeNode } from '@legacy/models/FhirpathTesterData'
import fhirpath_r4_model from 'fhirpath/fhir-context/r4'
import fhirpath_r5_model from 'fhirpath/fhir-context/r5'
import AbstractSyntaxTreeTab from '~/components/AbstractSyntaxTreeTab.vue'

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
}

const ast = ref<string>('')

const variables = ref<Array<{name: string, value: string}>>([]) // Start with no variables

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

// Navigate to expression node from AST
const navigateToExpressionNode = (node: ParseTreeNode) => {
  console.log('Navigate to expression node:', node)
  // TODO: Highlight the expression text in the editor
  // This would need the expression editor to support highlighting
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