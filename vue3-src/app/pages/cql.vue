<template>
  <div>
    <HeaderNavbar @close-settings="onSettingsClosed" />

    <div class="container-fluid bd-layout">
      <v-card class="page-content">
        <v-toolbar color="primary">
          <v-toolbar-title>CQL Tester</v-toolbar-title>
          <v-spacer />

          <v-select
            v-model="selectedFhirVersion"
            :items="fhirVersions"
            density="compact"
            hide-details
            class="version-select"
            title="FHIR version"
            @update:model-value="changeFhirVersion"
          />
          <v-select
            v-model="selectedEngine"
            :items="engines"
            item-title="name"
            return-object
            density="compact"
            hide-details
            class="engine-select"
            title="CQL engine"
          >
            <template #item="{ item, props }">
              <v-list-item v-bind="props">
                <template #title>
                  <v-icon v-if="item.external" size="small">mdi-web</v-icon>
                  {{ item.name }}
                </template>
                <template #subtitle>{{ item.publisher }}</template>
              </v-list-item>
            </template>
          </v-select>

          <v-btn
            icon
            title="Validate CQL"
            :disabled="loading || loadingAll"
            @click="validateCqlContent"
          >
            <v-icon>mdi-note-check-outline</v-icon>
          </v-btn>
          <v-btn
            icon
            title="Run CQL (Ctrl+Enter)"
            :loading="loading"
            :disabled="loadingAll"
            @click="evaluateSelectedEngine"
          >
            <v-icon>mdi-play</v-icon>
          </v-btn>
          <v-btn
            icon
            title="Run all engines (Ctrl+Shift+Enter)"
            :loading="loadingAll"
            :disabled="loading"
            @click="evaluateAllEngines"
          >
            <v-icon>mdi-script-text-play-outline</v-icon>
          </v-btn>
          <v-btn
            v-if="canShare"
            icon
            :title="shareMessage"
            @click="copyShareLink"
          >
            <v-icon>mdi-share-variant-outline</v-icon>
          </v-btn>
          <v-btn
            v-if="canShare"
            icon
            :title="zulipShareMessage"
            @click="copyZulipShareLink"
          >
            <svg
              role="img"
              aria-label="Zulip"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 600 600"
              height="20"
            >
              <path
                fill="currentColor"
                d="M 473.09 122.97 c 0 22.69 -10.19 42.85 -25.72 55.08 L 296.61 312.69 c -2.8 2.4 -6.44 -1.47 -4.42 -4.7 l 55.3 -110.72 c 1.55 -3.1 -0.46 -6.91 -3.64 -6.91 H 129.36 c -33.22 0 -60.4 -30.32 -60.4 -67.37 c 0 -37.06 27.18 -67.37 60.4 -67.37 h 283.33 c 33.22 -0.02 60.4 30.3 60.4 67.35 z M 129.36 506.05 h 283.33 c 33.22 0 60.4 -30.32 60.4 -67.37 c 0 -37.06 -27.18 -67.37 -60.4 -67.37 H 198.2 c -3.18 0 -5.19 -3.81 -3.64 -6.91 l 55.3 -110.72 c 2.02 -3.23 -1.62 -7.1 -4.42 -4.7 L 94.68 383.6 c -15.53 12.22 -25.72 32.39 -25.72 55.08 c 0 37.05 27.18 67.37 60.4 67.37 z"
              />
            </svg>
          </v-btn>
          <v-btn
            v-if="library && canSaveLibrary"
            icon
            title="Save Library"
            :loading="savingLibrary"
            :disabled="!libraryDirty"
            @click="saveLibrary"
          >
            <v-icon>mdi-content-save</v-icon>
          </v-btn>
        </v-toolbar>

        <TwinPaneTab :tabs="tabDetails" ref="twinTabControl">
          <template #CQL>
            <div class="tab-content">
              <div class="editor-tools">
                <v-btn
                  icon
                  variant="text"
                  density="compact"
                  title="Clear CQL text"
                  @click="resetCql"
                >
                  <v-icon>mdi-broom</v-icon>
                </v-btn>
              </div>
              <ResourceEditor
                ref="cqlInput"
                class="cql-editor"
                :resource-text="cqlText"
                :text-label="cqlContentLabel"
                language="cql"
                expression-editor
                :tab-spaces="tabSpaces"
                :min-lines="12"
                :max-lines="30"
                @update:resource-text="updateCqlText"
              />

              <div v-if="isLibrary" class="library-expression-selector mt-3">
                <v-select
                  v-model="selectedExpressions"
                  :items="selectableExpressions"
                  item-title="title"
                  item-value="name"
                  label="Expressions to evaluate"
                  hint="Leave empty to evaluate every public top-level expression."
                  persistent-hint
                  multiple
                  chips
                  closable-chips
                  clearable
                  :no-data-text="cqlAnalysis.outcome
                    ? 'Fix CQL syntax errors to discover expressions'
                    : 'No expression declarations found'"
                />
              </div>

              <div class="results-heading mt-4">
                {{ isLibrary ? 'LIBRARY EVALUATION RESULT' : 'EXPRESSION RESULT' }}
                <span v-if="singleEngineResult" class="processed-by">
                  {{ singleEngineResult.processedByEngine }}
                </span>
              </div>

              <v-alert v-if="error" type="error" variant="outlined" class="mt-2">
                {{ error }}
              </v-alert>
              <template v-if="singleEngineResult">
                <v-alert
                  v-for="(message, index) in outcomeMessages(singleEngineResult)"
                  :key="index"
                  type="error"
                  variant="outlined"
                  density="compact"
                  class="mt-2"
                >
                  {{ message }}
                </v-alert>
                <v-table
                  v-if="displayResults.length"
                  density="compact"
                  class="result-table mt-2"
                >
                  <thead>
                    <tr>
                      <th v-if="displayResultsHaveProperties">Property</th>
                      <th>Value</th>
                      <th>Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="row in displayResults" :key="row.key">
                      <td v-if="displayResultsHaveProperties">
                        <span :style="{ paddingLeft: `${row.depth * 18}px` }">
                          {{ row.label }}
                        </span>
                      </td>
                      <td><pre>{{ row.item.display }}</pre></td>
                      <td><i>{{ row.item.type }}</i></td>
                    </tr>
                  </tbody>
                </v-table>
                <v-card
                  v-else-if="singleEngineResult.outcomes.length === 0"
                  variant="outlined"
                  class="pa-3 mt-2"
                >
                  The operation returned no result parameters.
                </v-card>
              </template>
              <v-card
                v-else-if="allEngineResults.size"
                variant="outlined"
                class="pa-3 mt-2"
              >
                Multiple engine results are available on the Results tab.
              </v-card>
              <v-card v-else variant="outlined" class="pa-3 mt-2 text-medium-emphasis">
                Enter CQL text and run an engine.
              </v-card>
            </div>
          </template>

          <template #Data_Bundle>
            <ResourceEditor
              label="Bundle URL"
              :resource-url="dataBundleUrl"
              :resource-text="dataBundleText"
              text-label="CQL Data"
              footer-label="Optional collection or transaction Bundle supplied to the CQL evaluation."
              :tab-spaces="tabSpaces"
              :fhir-server-examples-url="fhirServerExamplesUrl"
              :dotnet-server-downloader="dotnetServerDownloader"
              @update:resource-url="dataBundleUrl = $event"
              @update:resource-text="dataBundleText = $event"
            />
          </template>

          <template #Variables>
            <div class="tab-content">
              <h4>Named CQL Parameters</h4>
              <p class="text-medium-emphasis">
                Parameters declared in CQL or Library.parameter are added automatically.
                Repeating a name supplies a CQL List, and types remain editable.
              </p>
              <v-row v-for="(parameter, index) in namedParameters" :key="index" dense align="center">
                <v-col cols="3">
                  <v-text-field v-model="parameter.name" label="Name" hide-details="auto" />
                </v-col>
                <v-col cols="3">
                  <v-combobox
                    v-model="parameter.type"
                    :items="parameterTypes"
                    label="FHIR Type"
                    hide-details="auto"
                  />
                </v-col>
                <v-col>
                  <v-textarea
                    v-model="parameter.value"
                    label="Value or FHIR JSON (blank omits)"
                    rows="1"
                    auto-grow
                    hide-details="auto"
                  />
                </v-col>
                <v-col cols="auto">
                  <v-btn icon variant="text" title="Remove parameter" @click="namedParameters.splice(index, 1)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
              <v-btn prepend-icon="mdi-plus" class="mt-2" @click="addNamedParameter">
                Add Parameter
              </v-btn>

              <v-divider class="my-5" />
              <h4>Prefetch Data</h4>
              <p class="text-medium-emphasis">
                Prefetch entries cannot be combined with the Data Bundle tab.
              </p>
              <v-card
                v-for="(prefetch, index) in prefetchData"
                :key="index"
                variant="outlined"
                class="pa-3 mb-3"
              >
                <v-btn
                  icon
                  variant="text"
                  density="compact"
                  class="remove-card"
                  title="Remove prefetch entry"
                  @click="prefetchData.splice(index, 1)"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
                <v-text-field v-model="prefetch.key" label="Prefetch Key" hide-details="auto" />
                <v-textarea
                  v-model="prefetch.descriptorJson"
                  label="DataRequirement JSON (optional)"
                  rows="3"
                  auto-grow
                  hide-details="auto"
                />
                <v-textarea
                  v-model="prefetch.dataJson"
                  label="Bundle JSON (optional)"
                  rows="5"
                  auto-grow
                  hide-details="auto"
                />
              </v-card>
              <v-btn prepend-icon="mdi-plus" @click="addPrefetch">
                Add Prefetch
              </v-btn>
            </div>
          </template>

          <template #Config>
            <div class="tab-content">
              <v-alert type="warning" variant="outlined" density="compact" class="mb-4">
                This public test utility has no authentication support. Do not submit real or secured clinical data.
              </v-alert>
              <v-text-field
                v-if="selectedEngine?.custom"
                v-model="customUrl"
                label="Custom FHIR Base or operation URL"
                hint="Accepts a FHIR base URL, /$cql, or /Library/$evaluate URL"
                persistent-hint
              />
              <v-text-field v-model="subject" label="Subject (for example Patient/123)" />
              <v-switch v-model="useServerData" label="Use data from the evaluation server" color="primary" />
              <v-text-field v-model="dataEndpoint" label="Data Endpoint URL" />
              <v-text-field v-model="contentEndpoint" label="Content Endpoint URL" />
              <v-text-field v-model="terminologyEndpoint" label="Terminology Endpoint URL" />
              <v-divider class="my-4" />
              <h4>Included Library</h4>
              <v-text-field v-model="libraryUrl" label="Library Canonical URL (optional)" />
              <v-text-field v-model="libraryName" label="Library Name (optional)" />
            </div>
          </template>

          <template #Results>
            <div class="tab-content">
              <v-card
                v-for="[engineKey, result] in allEngineResults"
                :key="engineKey"
                variant="outlined"
                class="pa-3 mb-3 engine-result"
                :class="{ selected: selectedEngineResultKey === engineKey }"
                @click="selectEngineResult(engineKey, result)"
              >
                <strong>{{ engineKey }}</strong>
                <span class="ml-2 text-medium-emphasis">
                  {{ isLibrary ? 'Library evaluation result' : 'Expression result' }}
                </span>
                <v-alert
                  v-for="(message, index) in outcomeMessages(result)"
                  :key="index"
                  type="error"
                  variant="tonal"
                  density="compact"
                  class="mt-2"
                >
                  {{ message }}
                </v-alert>
                <div v-for="item in result.results" :key="`${item.index}-${item.name}`" class="result-summary">
                  {{ expressionItemSummary(item) }}
                </div>
              </v-card>
            </div>
          </template>

          <template #Debug>
            <ResourceEditor
              text-label="Complete operation response"
              :resource-text="debugText"
              :read-only="true"
              :tab-spaces="tabSpaces"
            />
          </template>

          <template #Library>
            <ConformanceResourceDetailsTab
              v-if="library"
              :raw="library"
              :hide-header="true"
              :readonly="!canSaveLibrary"
              :show-advanced-settings="showAdvancedSettings"
              @update="libraryDirty = true"
            >
              <template #extension>
                <v-textarea
                  v-model="cqlText"
                  label="CQL Content"
                  rows="8"
                  auto-grow
                  :readonly="!canSaveLibrary"
                  @update:model-value="libraryDirty = true"
                />
              </template>
            </ConformanceResourceDetailsTab>
          </template>

          <template #Publishing>
            <ConformanceResourcePublishingTab
              v-if="library"
              :raw="library"
              :published-versions="publishedLibraries"
              :hide-header="true"
              :readonly="!canSaveLibrary"
              :lock-publisher="true"
              :show-advanced-settings="showAdvancedSettings"
              navigation-link-prefix="/Library/"
              :navigation-query="libraryServerBase"
              @update="libraryDirty = true"
            />
          </template>

          <template #Errors>
            <OperationOutcomePanel
              title="CQL Errors"
              issue-link-title="Go to the CQL source location"
              :outcome="errorOutcome"
              @navigate-to-issue="navigateToIssue"
              @close="clearErrorOutcome"
            />
          </template>
        </TwinPaneTab>
      </v-card>
    </div>

    <v-snackbar v-model="showSuccess" color="success" :timeout="2500">
      {{ successMessage }}
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import type {
  Bundle,
  DataRequirement,
  Library,
  OperationOutcome,
  OperationOutcomeIssue,
} from 'fhir/r4b'
import type { IApplicationInsights } from '@microsoft/applicationinsights-web'
import type { TabData } from '~/components/TwinPaneTab.vue'
import ResourceEditor from '~/components/ResourceEditor.vue'
import OperationOutcomePanel from '~/components/OperationOutcomePanel.vue'
import ConformanceResourceDetailsTab from '~/components/ConformanceResourceDetailsTab.vue'
import ConformanceResourcePublishingTab from '~/components/ConformanceResourcePublishingTab.vue'
import {
  applyConfigCqlEngines,
  createCustomCqlEngine,
  registeredCqlEngines,
  type ICqlEngineDetails,
} from '@legacy/types/cql_test_engine'
import {
  evaluateCql,
  type CqlEvaluationOptions,
  type CqlEvaluationResult,
  type CqlPrefetchData,
  type CqlResultItem,
} from '@legacy/helpers/cql_api_engine'
import { findCqlTextContent } from '@legacy/helpers/library_content'
import {
  createCqlZulipShareText,
  decodeTestCqlData,
  encodeTestCqlData,
  type CqlSharePrefetch,
  type TestCqlData,
} from 'models/cql_test_model'
import { settings } from '@legacy/helpers/user_settings'
import {
  analyzeCql,
  type CqlAnalysis,
  type CqlIssuePosition,
} from '@legacy/helpers/cql_validator'

useHead({ title: 'CQL Tester - FHIRPath Lab' })

const { $appInsights } = useNuxtApp() as unknown as { $appInsights?: IApplicationInsights }
const route = useRoute()

interface TwinPaneControl {
  selectTab(tabIndex: number): void
}

interface CqlEditorControl {
  focus(): void
  navigateToTextRange(location: CqlIssuePosition): boolean
}

const cqlText = ref(`'Hello World'
| (1 + 1).toString()
| today().toString()`)
const cqlAnalysis = ref<CqlAnalysis>(analyzeCql(cqlText.value))
const selectedExpressions = ref<string[]>([])
const selectedFhirVersion = ref('R4')
const selectedEngine = ref<ICqlEngineDetails>()
const effectiveEngines = ref<Record<string, ICqlEngineDetails>>({})
const customUrl = ref('')
const loading = ref(false)
const loadingAll = ref(false)
const error = ref('')
const singleEngineResult = ref<CqlEvaluationResult | null>(null)
const allEngineResults = ref<Map<string, CqlEvaluationResult>>(new Map())
const selectedEngineResultKey = ref<string | null>(null)
const shareMessage = ref('Copy a shareable CQL test link')
const zulipShareMessage = ref('Copy a Zulip-friendly CQL test link')
const errorOutcome = ref<OperationOutcome>()
const showSuccess = ref(false)
const successMessage = ref('')

const subject = ref('')
const useServerData = ref(false)
const dataEndpoint = ref('')
const contentEndpoint = ref('')
const terminologyEndpoint = ref('')
const libraryUrl = ref('')
const libraryName = ref('')

const dataBundleUrl = ref('')
const dataBundleText = ref('')
const namedParameters = ref<Array<{ name: string; type: string; value: string }>>([])
const prefetchData = ref<CqlSharePrefetch[]>([])

const library = ref<Library | null>(null)
const publishedLibraries = ref<Library[]>([])
const libraryServerBase = ref(settings.getFhirServerUrl())
const loadedLibraryReference = ref('')
const libraryDirty = ref(false)
const libraryEditAllowed = ref(false)
const savingLibrary = ref(false)
const showAdvancedSettings = ref(settings.showAdvancedSettings())
let evaluationGeneration = 0
let analysisTimer: ReturnType<typeof setTimeout> | undefined

const tabSpaces = settings.getTabSpaces()
const fhirServerExamplesUrl = ref(settings.getFhirServerExamplesUrl())
const dotnetServerDownloader = ref('')
const twinTabControl = ref<TwinPaneControl>()
const cqlInput = ref<CqlEditorControl>()

const ERRORS_TAB = 8
const isLibrary = computed(() => cqlAnalysis.value.kind === 'library')
const cqlContentLabel = computed(() =>
  isLibrary.value ? 'CQL Library' : 'CQL Expression',
)
const selectableExpressions = computed(() =>
  cqlAnalysis.value.expressions.map(expression => ({
    name: expression.name,
    title: expression.access === 'private'
      ? `${expression.name} (private)`
      : expression.name,
  })),
)

const parameterTypes = [
  'boolean', 'integer', 'decimal', 'string', 'date', 'dateTime', 'time',
  'code', 'canonical', 'uri', 'Coding', 'CodeableConcept', 'Quantity',
  'Reference', 'Period', 'Range',
]

const fhirVersions = computed(() => {
  const versions = new Set(Object.values(effectiveEngines.value).map(engine => engine.fhirVersion))
  versions.add('R4')
  return Array.from(versions)
})

const engines = computed(() => {
  const configured = Object.values(effectiveEngines.value)
    .filter(engine => engine.fhirVersion === selectedFhirVersion.value)
  configured.push(createCustomCqlEngine(customUrl.value, selectedFhirVersion.value))
  return configured
})

const tabDetails = computed<TabData[]>(() => [
  { iconName: 'mdi-code-braces', tabName: 'CQL', show: true, enabled: true },
  { iconName: 'mdi-package-variant', tabName: 'Data Bundle', show: true, enabled: true },
  { iconName: 'mdi-application-variable-outline', tabName: 'Variables', show: true, enabled: true },
  { iconName: 'mdi-tune', tabName: 'Config', show: true, enabled: true },
  {
    iconName: 'mdi-chart-box-multiple-outline',
    tabName: 'Results',
    tabSubName: '(all engines)',
    show: allEngineResults.value.size > 0 || loadingAll.value,
    enabled: true,
  },
  {
    iconName: 'mdi-bug-outline',
    tabName: 'Debug',
    show: true,
    enabled: singleEngineResult.value !== null,
  },
  {
    iconName: 'mdi-card-bulleted-settings-outline',
    tabName: 'Library',
    show: library.value !== null,
    enabled: true,
  },
  {
    iconName: 'mdi-download-network-outline',
    tabName: 'Publishing',
    show: library.value !== null,
    enabled: true,
  },
  {
    iconName: 'mdi-alert-circle-outline',
    tabName: 'Errors',
    show: errorOutcome.value !== undefined,
    enabled: true,
  },
])

interface DisplayResult {
  key: string
  depth: number
  label: string
  item: CqlResultItem
}

function showSuccessMessage(message: string): void {
  successMessage.value = message
  showSuccess.value = true
}

function issuePosition(issue: OperationOutcomeIssue): CqlIssuePosition | undefined {
  if ('__position' in issue) {
    const position = issue.__position
    if (
      typeof position === 'object'
      && position !== null
      && 'line' in position
      && typeof position.line === 'number'
      && 'column' in position
      && typeof position.column === 'number'
      && 'length' in position
      && typeof position.length === 'number'
    ) {
      return position as CqlIssuePosition
    }
  }

  const details = [
    ...(issue.expression ?? []),
    ...(issue.location ?? []),
    issue.details?.text,
    issue.diagnostics,
  ].filter((value): value is string => !!value)

  for (const detail of details) {
    const range = /\[(\d+):(\d+)(?:,\s*(\d+):(\d+))?\]/.exec(detail)
    if (range) {
      const line = Number(range[1])
      const column = Number(range[2])
      const endLine = Number(range[3] ?? range[1])
      const endColumn = Number(range[4] ?? range[2])
      return {
        line,
        column,
        length: endLine === line ? Math.max(1, endColumn - column + 1) : 1,
      }
    }
    const location = /@(\d+):(\d+)/.exec(detail)
      ?? /\bline\s+(\d+)\D+column\s+(\d+)/i.exec(detail)
    if (location) {
      return {
        line: Number(location[1]),
        column: Number(location[2]),
        length: 1,
      }
    }
  }
  return undefined
}

function navigableOutcome(outcome: OperationOutcome): OperationOutcome {
  return {
    ...outcome,
    issue: outcome.issue.map(issue => {
      const position = issuePosition(issue)
      if (!position) return issue
      return {
        ...issue,
        expression: issue.expression ?? [`@${position.line}:${position.column}`],
        __position: position,
      }
    }),
  }
}

function showErrorOutcome(outcome: OperationOutcome, selectTab = true): void {
  errorOutcome.value = navigableOutcome(outcome)
  showSuccess.value = false
  if (selectTab) nextTick(() => twinTabControl.value?.selectTab(ERRORS_TAB))
}

function showEvaluationOutcomes(
  outcomes: OperationOutcome[],
  selectTab = true,
): void {
  if (outcomes.length === 0) {
    errorOutcome.value = undefined
    return
  }
  showErrorOutcome({
    resourceType: 'OperationOutcome',
    issue: outcomes.flatMap(outcome => outcome.issue),
  }, selectTab)
}

function clearErrorOutcome(): void {
  // Restore the editable panes in both dual-pane and single-pane layouts.
  twinTabControl.value?.selectTab(1)
  twinTabControl.value?.selectTab(0)
  errorOutcome.value = undefined
}

function navigateToIssue(issue: OperationOutcomeIssue): void {
  const position = issuePosition(issue)
  if (!position) return
  twinTabControl.value?.selectTab(0)
  nextTick(() => cqlInput.value?.navigateToTextRange(position))
}

function flattenStructuredResult(
  items: CqlResultItem[],
  depth = 0,
  prefix = '',
): DisplayResult[] {
  return items.flatMap((item, index) => {
    const key = `${prefix}${index}-${item.name}`
    return [
      { key, depth, label: item.name, item },
      ...flattenStructuredResult(item.children, depth + 1, `${key}-`),
    ]
  })
}

function expressionRows(result: CqlEvaluationResult): DisplayResult[] {
  return result.results.flatMap((item, index) => {
    if (item.children.length) {
      return flattenStructuredResult(item.children, 0, `${index}-`)
    }
    return [{
      key: `${index}-${item.name}`,
      depth: 0,
      label: '',
      item,
    }]
  })
}

function expressionItemSummary(item: CqlResultItem): string {
  if (item.children.length) {
    return `${item.type} (${item.children.length} ${item.children.length === 1 ? 'property' : 'properties'})`
  }
  return item.display || item.type
}

const displayResults = computed(() =>
  singleEngineResult.value ? expressionRows(singleEngineResult.value) : [],
)
const displayResultsHaveProperties = computed(() =>
  displayResults.value.some(row => row.label),
)

const debugText = computed(() =>
  singleEngineResult.value ? JSON.stringify(singleEngineResult.value.raw, null, tabSpaces) : '',
)

const canShare = computed(() => import.meta.client && !!navigator.clipboard)
const canSaveLibrary = computed(() => !!library.value && libraryEditAllowed.value)

function outcomeMessages(result: CqlEvaluationResult): string[] {
  return result.outcomes.flatMap(outcome =>
    outcome.issue.map(issue => issue.details?.text || issue.diagnostics || issue.code),
  )
}

function applyCqlAnalysis(analysis: CqlAnalysis): CqlAnalysis {
  cqlAnalysis.value = analysis
  const availableExpressions = new Set(
    analysis.expressions.map(expression => expression.name),
  )
  selectedExpressions.value = selectedExpressions.value
    .filter(expression => availableExpressions.has(expression))
  const existingParameters = new Set(
    namedParameters.value.map(parameter => parameter.name),
  )
  for (const parameter of analysis.parameters) {
    if (!existingParameters.has(parameter.name)) {
      namedParameters.value.push({
        name: parameter.name,
        type: cqlTypeToFhirType(parameter.type),
        value: '',
      })
      existingParameters.add(parameter.name)
    }
  }
  return analysis
}

function cqlTypeToFhirType(cqlType: string | undefined): string {
  if (!cqlType) return 'string'
  const listMatch = /^List<(.+)>$/i.exec(cqlType)
  if (listMatch) return cqlTypeToFhirType(listMatch[1])
  if (/^Interval<.+>$/i.test(cqlType)) return 'Period'

  const typeName = cqlType.split('.').at(-1) ?? cqlType
  const mappings: Record<string, string> = {
    boolean: 'boolean',
    code: 'Coding',
    concept: 'CodeableConcept',
    date: 'date',
    datetime: 'dateTime',
    decimal: 'decimal',
    integer: 'integer',
    quantity: 'Quantity',
    ratio: 'Ratio',
    string: 'string',
    time: 'time',
  }
  return mappings[typeName.toLowerCase()] ?? typeName
}

function refreshCqlAnalysis(): CqlAnalysis {
  return applyCqlAnalysis(analyzeCql(cqlText.value))
}

function scheduleCqlAnalysis(): void {
  if (analysisTimer) clearTimeout(analysisTimer)
  analysisTimer = setTimeout(() => {
    refreshCqlAnalysis()
    analysisTimer = undefined
  }, 300)
}

watch(cqlText, scheduleCqlAnalysis)

function validateCqlContent(): void {
  const analysis = refreshCqlAnalysis()
  if (analysis.outcome) {
    showErrorOutcome(analysis.outcome)
    return
  }

  errorOutcome.value = undefined
  showSuccessMessage(
    analysis.kind === 'library'
      ? `CQL library syntax is valid (${analysis.expressions.length} expression declarations).`
      : 'CQL expression syntax is valid.',
  )
}

function resetCql() {
  cqlText.value = ''
  if (library.value) libraryDirty.value = true
  nextTick(() => cqlInput.value?.focus())
}

function onCqlChanged() {
  if (library.value) libraryDirty.value = true
}

function updateCqlText(value: string) {
  cqlText.value = value
  onCqlChanged()
}

function addNamedParameter() {
  namedParameters.value.push({ name: '', type: 'string', value: '' })
}

function addPrefetch() {
  prefetchData.value.push({ key: '', descriptorJson: '', dataJson: '' })
}

function parseJsonValue<T>(
  value: string,
  label: string,
  expectedResourceType?: string,
): T | undefined {
  if (!value.trim()) return undefined
  let parsed: T
  try {
    parsed = JSON.parse(value)
  } catch {
    throw new Error(`${label} contains invalid JSON.`)
  }
  if (
    expectedResourceType
    && (
      typeof parsed !== 'object'
      || parsed === null
      || !('resourceType' in parsed)
      || parsed.resourceType !== expectedResourceType
    )
  ) {
    throw new Error(`${label} must be a FHIR ${expectedResourceType} resource.`)
  }
  return parsed
}

function createEvaluationOptions(): CqlEvaluationOptions {
  const data = parseJsonValue<Bundle>(dataBundleText.value, 'Data Bundle', 'Bundle')
  const parsedPrefetch: CqlPrefetchData[] = prefetchData.value.map((item, index) => ({
    key: item.key,
    descriptor: parseJsonValue<DataRequirement>(
      item.descriptorJson ?? '',
      `Prefetch ${index + 1} descriptor`,
    ),
    data: parseJsonValue<Bundle>(
      item.dataJson ?? '',
      `Prefetch ${index + 1} data`,
      'Bundle',
    ),
  }))

  return {
    cql: cqlText.value,
    mode: cqlAnalysis.value.kind,
    libraryName: cqlAnalysis.value.libraryName,
    libraryVersion: cqlAnalysis.value.libraryVersion,
    selectedExpressions: isLibrary.value && selectedExpressions.value.length
      ? [...selectedExpressions.value]
      : undefined,
    subject: subject.value || undefined,
    parameters: namedParameters.value
      .filter(parameter => parameter.name.trim() && parameter.value.trim())
      .map(parameter => ({ ...parameter })),
    libraries: libraryUrl.value
      ? [{ url: libraryUrl.value, name: libraryName.value || undefined }]
      : undefined,
    useServerData: useServerData.value,
    data,
    prefetchData: parsedPrefetch.length ? parsedPrefetch : undefined,
    dataEndpoint: dataEndpoint.value || undefined,
    contentEndpoint: contentEndpoint.value || undefined,
    terminologyEndpoint: terminologyEndpoint.value || undefined,
  }
}

function engineForRun(engine: ICqlEngineDetails): ICqlEngineDetails {
  if (!engine.custom) return engine
  if (!customUrl.value.trim()) throw new Error('Enter a custom FHIR base or operation URL on the Config tab.')
  return createCustomCqlEngine(customUrl.value, selectedFhirVersion.value)
}

function resetEvaluationState() {
  const generation = ++evaluationGeneration
  loading.value = false
  loadingAll.value = false
  error.value = ''
  singleEngineResult.value = null
  allEngineResults.value.clear()
  selectedEngineResultKey.value = null
  errorOutcome.value = undefined
  return generation
}

async function evaluateSelectedEngine() {
  const generation = resetEvaluationState()
  if (!selectedEngine.value) {
    error.value = 'Select a CQL engine.'
    return
  }
  const analysis = refreshCqlAnalysis()
  if (analysis.outcome) {
    showErrorOutcome(analysis.outcome)
    return
  }
  loading.value = true
  try {
    const engine = engineForRun(selectedEngine.value)
    const result = await evaluateCql(createEvaluationOptions(), engine)
    if (generation !== evaluationGeneration) return
    singleEngineResult.value = result
    showEvaluationOutcomes(result.outcomes)
    if (settings.load().defaultProviderField !== 'Brian Postlethwaite') {
      $appInsights?.trackEvent({ name: `evaluate ${engine.appInsightsEngineName}` })
    }
  } catch (caught) {
    if (generation !== evaluationGeneration) return
    error.value = caught instanceof Error ? caught.message : 'CQL evaluation failed.'
  } finally {
    if (generation === evaluationGeneration) loading.value = false
  }
}

async function evaluateAllEngines() {
  const generation = resetEvaluationState()
  const analysis = refreshCqlAnalysis()
  if (analysis.outcome) {
    showErrorOutcome(analysis.outcome)
    return
  }
  loadingAll.value = true
  try {
    const options = createEvaluationOptions()
    const runEngines = engines.value.filter(engine => !engine.custom || customUrl.value.trim())
    twinTabControl.value?.selectTab(4)
    const results = await Promise.all(runEngines.map(async engine => {
      const result = await evaluateCql(options, engineForRun(engine))
      return [engine.legacyName, result] as const
    }))
    if (generation !== evaluationGeneration) return
    allEngineResults.value = new Map(results)
    if (settings.load().defaultProviderField !== 'Brian Postlethwaite') {
      $appInsights?.trackEvent({ name: 'evaluate all CQL' })
    }
  } catch (caught) {
    if (generation !== evaluationGeneration) return
    error.value = caught instanceof Error ? caught.message : 'CQL evaluation failed.'
  } finally {
    if (generation === evaluationGeneration) loadingAll.value = false
  }
}

function selectEngineResult(engineKey: string, result: CqlEvaluationResult) {
  selectedEngineResultKey.value = engineKey
  singleEngineResult.value = result
  showEvaluationOutcomes(result.outcomes, false)
}

function changeFhirVersion() {
  const replacement = engines.value.find(engine => engine.name === selectedEngine.value?.name)
  selectedEngine.value = replacement ?? engines.value[0]
}

function onSettingsClosed() {
  showAdvancedSettings.value = settings.showAdvancedSettings()
  fhirServerExamplesUrl.value = settings.getFhirServerExamplesUrl()
}

function prepareShareData(): TestCqlData {
  return {
    cql: cqlText.value,
    engine: selectedEngine.value?.legacyName,
    fhirVersion: selectedFhirVersion.value,
    customUrl: selectedEngine.value?.custom ? customUrl.value || undefined : undefined,
    subject: subject.value || undefined,
    useServerData: useServerData.value,
    dataJson: dataBundleText.value || undefined,
    parameters: namedParameters.value.length ? namedParameters.value : undefined,
    prefetchData: prefetchData.value.length ? prefetchData.value : undefined,
    dataEndpoint: dataEndpoint.value || undefined,
    contentEndpoint: contentEndpoint.value || undefined,
    terminologyEndpoint: terminologyEndpoint.value || undefined,
    libraryId: loadedLibraryReference.value || library.value?.id,
    libraryUrl: libraryUrl.value || undefined,
    libraryName: libraryName.value || undefined,
    selectedExpressions: selectedExpressions.value.length
      ? [...selectedExpressions.value]
      : undefined,
  }
}

function createShareLink(data: TestCqlData): string {
  const url = new URL('/cql', window.location.origin)
  if (typeof route.query.config === 'string') {
    url.searchParams.set('config', route.query.config)
  }
  url.hash = encodeTestCqlData(data)
  return url.toString()
}

async function copyShareLink() {
  const shareUrl = createShareLink(prepareShareData())
  await navigator.clipboard.writeText(shareUrl)
  shareMessage.value = 'Copied'
}

async function copyZulipShareLink() {
  const data = prepareShareData()
  const shareText = createCqlZulipShareText(data.cql, createShareLink(data))
  await navigator.clipboard.writeText(shareText)
  zulipShareMessage.value = 'Copied'
}

function applyShareData(data: TestCqlData) {
  cqlText.value = data.cql
  customUrl.value = data.customUrl ?? ''
  subject.value = data.subject ?? ''
  useServerData.value = data.useServerData ?? false
  dataBundleText.value = data.dataJson ?? ''
  namedParameters.value = data.parameters?.map(parameter => ({ ...parameter })) ?? []
  prefetchData.value = data.prefetchData?.map(item => ({ ...item })) ?? []
  dataEndpoint.value = data.dataEndpoint ?? ''
  contentEndpoint.value = data.contentEndpoint ?? ''
  terminologyEndpoint.value = data.terminologyEndpoint ?? ''
  libraryUrl.value = data.libraryUrl ?? ''
  libraryName.value = data.libraryName ?? ''
  selectedExpressions.value = data.selectedExpressions
    ? [...data.selectedExpressions]
    : []
  if (data.engine === 'Custom URL') {
    selectedFhirVersion.value = data.fhirVersion ?? 'R4'
    selectedEngine.value = engines.value.find(engine => engine.custom)
  } else if (data.engine) {
    const engine = Object.values(effectiveEngines.value)
      .find(candidate => candidate.legacyName === data.engine)
    if (!engine) throw new Error(`The shared CQL engine "${data.engine}" is not configured.`)
    selectedFhirVersion.value = engine.fhirVersion
    selectedEngine.value = engine
  }
}

function decodeBase64Utf8(value: string): string {
  const bytes = Uint8Array.from(atob(value), character => character.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}

function encodeBase64Utf8(value: string): string {
  const bytes = new TextEncoder().encode(value)
  let binary = ''
  bytes.forEach(byte => { binary += String.fromCharCode(byte) })
  return btoa(binary)
}

async function loadLibrary(libraryId: string) {
  const url = libraryId.startsWith('http')
    ? libraryId
    : `${settings.getFhirServerUrl()}/Library/${libraryId}`
  loadedLibraryReference.value = url
  if (libraryId.startsWith('http')) {
    const parsedUrl = new URL(libraryId)
    const librarySegment = parsedUrl.pathname.toLowerCase().lastIndexOf('/library/')
    libraryServerBase.value = librarySegment >= 0
      ? `${parsedUrl.origin}${parsedUrl.pathname.slice(0, librarySegment)}`
      : settings.getFhirServerUrl()
  } else {
    libraryServerBase.value = settings.getFhirServerUrl()
  }
  const response = await axios.get<Library>(url, {
    headers: { Accept: 'application/fhir+json, application/json' },
  })
  if (response.data.resourceType !== 'Library') throw new Error('The selected resource is not a Library.')
  library.value = response.data
  libraryUrl.value = response.data.url
    ? `${response.data.url}${response.data.version ? `|${response.data.version}` : ''}`
    : ''
  libraryName.value = response.data.name ?? ''
  const cqlContent = findCqlTextContent(response.data)
  if (!cqlContent?.data) throw new Error('The selected Library has no CQL source content.')
  cqlText.value = decodeBase64Utf8(cqlContent.data)
  namedParameters.value = (response.data.parameter ?? [])
    .filter(parameter => parameter.use !== 'out')
    .map(parameter => ({
      name: parameter.name ?? '',
      type: parameter.type ?? 'string',
      value: '',
    }))
  libraryDirty.value = false
  const provider = settings.getDefaultProviderField()
  libraryEditAllowed.value = response.data.status === 'draft'
    && !!provider
    && provider === response.data.publisher

  if (response.data.url) {
    const history = await axios.get<Bundle>(`${libraryServerBase.value}/Library`, {
      params: { url: response.data.url, _summary: true },
      headers: { Accept: 'application/fhir+json, application/json' },
    })
    publishedLibraries.value = (history.data.entry ?? [])
      .map(entry => entry.resource)
      .filter((resource): resource is Library => resource?.resourceType === 'Library')
  }
}

async function saveLibrary() {
  if (!library.value || !canSaveLibrary.value) return
  savingLibrary.value = true
  error.value = ''
  try {
    const content = findCqlTextContent(library.value)
    if (content) {
      content.data = encodeBase64Utf8(cqlText.value)
    } else {
      library.value.content = [
        ...(library.value.content ?? []),
        { contentType: 'text/cql', data: encodeBase64Utf8(cqlText.value) },
      ]
    }
    const base = libraryServerBase.value
    const response = library.value.id
      ? await axios.put<Library>(`${base}/Library/${library.value.id}`, library.value, {
          headers: { Accept: 'application/fhir+json', 'Content-Type': 'application/fhir+json' },
        })
      : await axios.post<Library>(`${base}/Library`, library.value, {
          headers: { Accept: 'application/fhir+json', 'Content-Type': 'application/fhir+json' },
        })
    library.value = response.data
    loadedLibraryReference.value = response.data.id
      ? `${base.replace(/\/+$/, '')}/Library/${response.data.id}`
      : loadedLibraryReference.value
    libraryDirty.value = false
    libraryEditAllowed.value = response.data.status === 'draft'
      && response.data.publisher === settings.getDefaultProviderField()
    if (response.data.url) {
      const history = await axios.get<Bundle>(`${base}/Library`, {
        params: { url: response.data.url, _summary: true },
        headers: { Accept: 'application/fhir+json, application/json' },
      })
      publishedLibraries.value = (history.data.entry ?? [])
        .map(entry => entry.resource)
        .filter((resource): resource is Library => resource?.resourceType === 'Library')
    }
  } catch (caught) {
    error.value = axios.isAxiosError(caught)
      ? caught.response?.data?.issue?.map((issue: { diagnostics?: string }) => issue.diagnostics).join(', ')
        || caught.message
      : caught instanceof Error ? caught.message : 'Unable to save the Library.'
  } finally {
    savingLibrary.value = false
  }
}

function keyHandler(event: KeyboardEvent) {
  if (!(event.ctrlKey || event.metaKey) || event.key !== 'Enter') return
  event.preventDefault()
  if (event.shiftKey) evaluateAllEngines()
  else evaluateSelectedEngine()
}

async function initialize() {
  const configParam = route.query.config as string | undefined
  if (configParam) settings.setConfigUrl(configParam)
  const config = await settings.getServerConnectionData()
  effectiveEngines.value = applyConfigCqlEngines(registeredCqlEngines, config)
  selectedEngine.value = engines.value[0]
  dotnetServerDownloader.value = await settings.dotnet_server_downloader()

  const hash = window.location.hash.slice(1)
  const sharedData = hash ? decodeTestCqlData(hash) : undefined
  const libraryId = (route.query.libraryId as string | undefined) ?? sharedData?.libraryId
  if (libraryId) await loadLibrary(libraryId)
  if (sharedData) applyShareData(sharedData)
  const queryCql = (route.query.cql ?? route.query.expression) as string | undefined
  if (queryCql) cqlText.value = queryCql
  if (queryCql || hash || libraryId) await evaluateSelectedEngine()
}

onMounted(async () => {
  document.addEventListener('keydown', keyHandler)
  try {
    await initialize()
  } catch (caught) {
    error.value = caught instanceof Error ? caught.message : 'Unable to initialize the CQL tester.'
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', keyHandler)
  if (analysisTimer) clearTimeout(analysisTimer)
})
</script>

<style scoped lang="scss">
.bd-layout {
  padding: 80px 16px 0;
}

.version-select {
  max-width: 80px;
  margin-right: 8px;
}

.engine-select {
  max-width: 210px;
}

.tab-content {
  overflow-y: auto;
  max-height: calc(100vh - 250px);
}

.editor-tools {
  float: right;
  position: relative;
  z-index: 1;
}

.results-heading {
  padding: 4px 12px;
  background: #d2f5ff;
  font-size: 0.875rem;
  font-weight: 700;
}

.processed-by {
  float: right;
  font-weight: 400;
}

.result-table pre {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
  font-family: monospace;
}

.remove-card {
  float: right;
}

.engine-result {
  cursor: pointer;
}

.engine-result.selected {
  border-color: rgb(var(--v-theme-primary));
  border-width: 2px;
}

.result-summary {
  margin-top: 8px;
}
</style>
