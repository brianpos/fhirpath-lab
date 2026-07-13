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
                text-label="CQL Expression"
                language="cql"
                expression-editor
                :tab-spaces="tabSpaces"
                :min-lines="12"
                :max-lines="30"
                @update:resource-text="updateCqlText"
              />

              <div class="results-heading mt-4">
                EXPRESSION RESULT
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
                Repeating a name supplies a CQL List. Types loaded from Library.parameter remain editable.
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
                label="Custom FHIR Base or $cql URL"
                hint="Accepts https://server.example/fhir or https://server.example/fhir/$cql"
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
                  Expression result
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
        </TwinPaneTab>
      </v-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import type { Bundle, DataRequirement, Library } from 'fhir/r4b'
import type { IApplicationInsights } from '@microsoft/applicationinsights-web'
import type { TabData } from '~/components/TwinPaneTab.vue'
import ResourceEditor from '~/components/ResourceEditor.vue'
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

useHead({ title: 'CQL Tester - FHIRPath Lab' })

const { $appInsights } = useNuxtApp() as unknown as { $appInsights?: IApplicationInsights }
const route = useRoute()

const cqlText = ref(`'Hello World'
| (1 + 1).toString()
| today().toString()`)
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

const tabSpaces = settings.getTabSpaces()
const fhirServerExamplesUrl = ref(settings.getFhirServerExamplesUrl())
const dotnetServerDownloader = ref('')
const twinTabControl = ref()
const cqlInput = ref()

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
])

interface DisplayResult {
  key: string
  depth: number
  label: string
  item: CqlResultItem
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
  if (!customUrl.value.trim()) throw new Error('Enter a custom FHIR base or $cql URL on the Config tab.')
  return createCustomCqlEngine(customUrl.value, selectedFhirVersion.value)
}

async function evaluateSelectedEngine() {
  if (!selectedEngine.value) {
    error.value = 'Select a CQL engine.'
    return
  }
  const generation = ++evaluationGeneration
  loading.value = true
  loadingAll.value = false
  error.value = ''
  singleEngineResult.value = null
  allEngineResults.value.clear()
  selectedEngineResultKey.value = null
  try {
    const engine = engineForRun(selectedEngine.value)
    const result = await evaluateCql(createEvaluationOptions(), engine)
    if (generation !== evaluationGeneration) return
    singleEngineResult.value = result
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
  const generation = ++evaluationGeneration
  loadingAll.value = true
  loading.value = false
  error.value = ''
  singleEngineResult.value = null
  selectedEngineResultKey.value = null
  allEngineResults.value.clear()
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

onBeforeUnmount(() => document.removeEventListener('keydown', keyHandler))
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
