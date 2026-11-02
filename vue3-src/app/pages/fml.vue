<template>
  <div>
    <HeaderNavbar @close-settings="onSettingsClosed" />

    <div class="container-fluid bd-layout" style="padding-top: 80px">
      <v-card class="page-content">
        <v-toolbar color="primary" dark>
          <v-toolbar-title>FHIR Mapping Language Tester</v-toolbar-title>
          <v-spacer />

          <v-select
            dark
            class="engine-selector"
            :items="executionEngines"
            v-model="selectedEngine"
            hide-details="auto"
            density="compact"
            @update:modelValue="evaluateMap"
          />
          <v-btn icon dark accesskey="g" title="Run map (alt+g)" @click="evaluateMap">
            <v-icon>mdi-play</v-icon>
          </v-btn>
          <div v-if="trace.length > 0" class="debug-controls">
            <v-btn size="x-small" variant="text" icon title="Reset to first trace" @click="selectTrace(0)">
              <v-icon>mdi-bug-play-outline</v-icon>
            </v-btn>
            <v-btn size="x-small" variant="text" icon title="Step forward in trace (F10)"
              :disabled="debugTracePosition >= trace.length - 1" @click="debuggerStepForward">
              <v-icon>mdi-debug-step-into</v-icon>
            </v-btn>
            <v-btn size="x-small" variant="text" icon title="Step back in trace (Shift+F10)"
              :disabled="debugTracePosition <= 0" @click="debuggerStepBack">
              <v-icon>mdi-debug-step-out</v-icon>
            </v-btn>
          </div>
        </v-toolbar>
        <v-progress-linear v-if="loadingData" indeterminate />

        <TwinPaneTab :tabs="tabDetails" ref="twinTabControl" @change="tabChanged" @mounted="twinPaneMounted">
          <template v-slot:Map>
            <ResourceEditor
              ref="mapEditor"
              label="StructureMap Id"
              language="fml"
              textLabel="FML Map"
              :resourceUrl="mapResourceUrl"
              :resourceText="mapText"
              :tabSpaces="tabSpaces"
              :fhirServerExamplesUrl="fhirServerExamplesUrl"
              :dotnetServerDownloader="dotnetServerDownloader"
              @update:resourceUrl="mapResourceUrl = $event"
              @update:resourceText="onMapTextUpdate"
            >
              <template v-slot:append>
                <v-btn icon size="small" variant="text" title="Validate FML" @click="validateMap">
                  <v-icon>mdi-note-check-outline</v-icon>
                </v-btn>
              </template>
            </ResourceEditor>
          </template>

          <template v-slot:Input>
            <ResourceEditor
              ref="inputEditor"
              label="Test Resource Id"
              textLabel="Test Resource (JSON, XML or HL7 v2)"
              :resourceUrl="inputResourceUrl"
              :resourceText="inputResourceText"
              :tabSpaces="tabSpaces"
              :fhirServerExamplesUrl="fhirServerExamplesUrl"
              :dotnetServerDownloader="dotnetServerDownloader"
              @update:resourceUrl="inputResourceUrl = $event"
              @update:resourceText="inputResourceText = $event"
            >
              <template v-slot:append>
                <v-btn icon size="small" variant="text" title="Generate a logical model from this input resource"
                  @click="generateLogicalModelFromInput">
                  <v-icon>mdi-tree-outline</v-icon>
                </v-btn>
                <v-btn v-if="showAdvancedSettings" icon size="small" variant="text"
                  title="Load a sample HL7 v2 message and map" @click="loadHl7v2Sample">
                  <v-icon>mdi-message-text-outline</v-icon>
                </v-btn>
              </template>
            </ResourceEditor>
          </template>

          <template v-slot:Models>
            <ResourceEditor
              ref="modelsEditor"
              label="Model ID/Search Query"
              textLabel="StructureDefinition / Bundle Text"
              footerLabel="The Model can be either an individual StructureDefinition (e.g. logical model) or a search query for a bundle of models"
              :resourceUrl="modelsResourceUrl"
              :resourceText="modelsText"
              :tabSpaces="tabSpaces"
              :fhirServerExamplesUrl="fhirServerExamplesUrl"
              :dotnetServerDownloader="dotnetServerDownloader"
              @update:resourceUrl="modelsResourceUrl = $event"
              @update:resourceText="modelsText = $event"
            >
              <template v-slot:append>
                <v-btn icon size="small" variant="text" title="Generate a logical model from the input resource"
                  @click="generateLogicalModelFromInput">
                  <v-icon>mdi-tree-outline</v-icon>
                </v-btn>
                <v-btn v-if="showAdvancedSettings" icon size="small" variant="text"
                  title="Add the generic HL7 v2 logical models (always applied when the input is HL7 v2)"
                  @click="addGenericHl7v2Models">
                  <v-icon>mdi-message-text-outline</v-icon>
                </v-btn>
              </template>
            </ResourceEditor>
          </template>

          <template v-slot:Trace>
            <div class="ct-header">
              <v-icon start>mdi-format-list-bulleted</v-icon>
              Trace / Debug
              <span v-if="traceStatus !== 'complete'" class="ml-2">{{ traceStatus }}</span>
            </div>
            <div class="scroll-pane">
              <v-table ref="traceTable" density="compact">
                <tbody>
                  <tr v-for="(v1, index) in trace" :key="index" :class="{ 'debugging-row': index === debugTracePosition }">
                    <td class="result-value">
                      <v-btn size="x-small" variant="text" icon style="float: left" @click="navigateToTrace(v1)">
                        <v-icon>mdi-target</v-icon>
                      </v-btn>
                      <div v-if="v1.phase" class="text-caption">
                        {{ v1.phase }} / depth {{ v1.depth }}
                        <span v-if="v1.mapFileName"> / {{ v1.mapFileName }}</span>
                        <span v-if="v1.traceLocation"> / {{ v1.traceLocation }}</span>
                      </div>
                      <div :class="v1.exception ? 'text-error' : traceTypeClass(v1.category)" style="white-space: pre-wrap">{{ v1.message }}</div>
                      <div v-if="v1.exception && v1.exception !== v1.message" class="text-error">{{ v1.exception }}</div>
                    </td>
                  </tr>
                </tbody>
              </v-table>
              <template v-if="variables.length > 0">
                <div class="ct-header">
                  <v-icon start>mdi-application-variable-outline</v-icon>
                  Variables
                </div>
                <v-table density="compact">
                  <thead><tr><th></th><th>context</th><th>name</th><th>path</th><th>value / error</th></tr></thead>
                  <tbody>
                    <tr v-for="(v1, index) in variables" :key="index">
                      <td>
                        <v-btn size="x-small" variant="text" icon @click="navigateToVariable(v1)">
                          <v-icon>mdi-target</v-icon>
                        </v-btn>
                      </td>
                      <td>{{ v1.mode }}</td>
                      <td>{{ v1.name }}</td>
                      <td>{{ v1.path }}</td>
                      <td><small>{{ v1.datatype }}</small><pre>{{ formatTraceVariable(v1) }}</pre></td>
                    </tr>
                  </tbody>
                </v-table>
              </template>
            </div>
          </template>

          <template v-slot:Output>
            <div class="ct-header">
              <v-icon start>mdi-file-document-outline</v-icon>
              <span>Results <span class="processed-by">{{ processedByEngine }}</span></span>
            </div>
            <ResourceEditor
              ref="outputEditor"
              textLabel="Transformed Output"
              :readOnly="true"
              :resourceText="outputText"
              :tabSpaces="tabSpaces"
            />
          </template>

          <template v-slot:Diagram>
            <div class="diagram-preview" :class="{ 'diagram-preview--stale': diagramIsStale }">
              <div v-if="diagramIsStale && diagramSvg" class="diagram-preview-status" role="status">
                <div class="diagram-preview-status-message"><strong>Preview paused</strong> Fix the FML errors to refresh.</div>
              </div>
              <div v-if="diagramSvg" ref="diagramPreview" class="diagram-preview-content" v-html="diagramSvg"
                @click="handleDiagramClick" @keydown="handleDiagramKeydown"></div>
              <div v-else class="diagram-preview-empty">{{ diagramError ?? 'No diagram available' }}</div>
            </div>
          </template>

          <template v-slot:Instance>
            <div class="diagram-preview" :class="{ 'diagram-preview--stale': diagramIsStale }">
              <div v-if="diagramIsStale && instanceSvg" class="diagram-preview-status" role="status">
                <div class="diagram-preview-status-message"><strong>Preview paused</strong> Fix the FML errors to refresh.</div>
              </div>
              <div v-if="instanceSvg" ref="instancePreview" class="diagram-preview-content" v-html="instanceSvg"
                @click="handleDiagramClick" @keydown="handleDiagramKeydown"></div>
              <div v-else class="diagram-preview-empty">{{ diagramError ?? 'No instance diagram available' }}</div>
            </div>
          </template>

          <template v-slot:Complete>
            <div class="diagram-preview" :class="{ 'diagram-preview--stale': diagramIsStale }">
              <div class="diagram-preview-options">
                <v-switch v-model="completeShowAllProperties" label="Show all properties" density="compact"
                  hide-details @update:modelValue="regenerateDiagrams" />
              </div>
              <div v-if="diagramIsStale && completeSvg" class="diagram-preview-status" role="status">
                <div class="diagram-preview-status-message"><strong>Preview paused</strong> Fix the FML errors to refresh.</div>
              </div>
              <div v-if="completeSvg" ref="completePreview" class="diagram-preview-content" v-html="completeSvg"
                @click="handleDiagramClick" @keydown="handleDiagramKeydown"></div>
              <div v-else class="diagram-preview-empty">{{ diagramError ?? 'No complete diagram available' }}</div>
            </div>
          </template>

          <template v-slot:Errors>
            <OperationOutcomePanel
              title="Errors"
              issueLinkTitle="View Issue Details"
              :outcome="outcome"
              @navigate-to-issue="navigateToIssue"
              @close="outcome = undefined"
            />
          </template>

          <template v-slot:Debug>
            <ResourceEditor
              textLabel="Debug Parameters Response from $transform"
              :readOnly="true"
              :resourceText="debugText"
              :tabSpaces="tabSpaces"
            />
          </template>
        </TwinPaneTab>
      </v-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios, { type CancelTokenSource } from 'axios'
import ace from 'ace-builds'
import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string'
import type { OperationOutcome, OperationOutcomeIssue, Parameters, ParametersParameter } from 'fhir/r4b'
import fhirpath_r4_model from 'fhirpath/fhir-context/r4'
import TwinPaneTab, { type TabData } from '~/components/TwinPaneTab.vue'
import ResourceEditor from '~/components/ResourceEditor.vue'
import { requestFhirAcceptHeaders } from '~/utils/fhir-rest'
import { settings } from '@legacy/helpers/user_settings'
import { createFmlContent, parseDebugTrace, parseFmlInput } from '@legacy/fml-debug-service/FmlDebugService'
import { FmlTraceLocationIndex } from '@legacy/fml-debug-service/FmlTraceLocationIndex'
import { FmlLocalDebugService } from '@legacy/fml-debug-service/FmlLocalDebugService'
import type { FmlTraceEvent, FmlTraceVariable } from '@legacy/fml-debug-service/contracts'
import { parseFmlJson, stringifyFmlJson } from '@fhirpath-lab/fml-executor'
import { isFmlParseError, parseFML } from '@legacy/helpers/fml_parser'
import type { FhirVersion, FmlStructureMap } from '@legacy/helpers/fml_models'
import { validateFmlModel } from '@legacy/helpers/fml_validation'
import { generateFmlStructureMapDiagramSvg } from '@legacy/helpers/structuremap_diagram'
import { generateFmlInstanceDiagramSvg } from '@legacy/helpers/structuremap_diagram_instance'
import { generateFmlInstanceDiagramSvg as generateFmlCompleteDiagramSvg } from '@legacy/helpers/structuremap_diagram_complete'
import { highlightDiagramConnection, findConnectionIdsForClick } from '@legacy/helpers/diagram_interaction'
import { lookupByTypeName as lookupByTypeNameSTU3 } from '@legacy/helpers/models/generated/stu3'
import { lookupByTypeName as lookupByTypeNameR4 } from '@legacy/helpers/models/generated/r4'
import { lookupByTypeName as lookupByTypeNameR4B } from '@legacy/helpers/models/generated/r4b'
import { lookupByTypeName as lookupByTypeNameR5 } from '@legacy/helpers/models/generated/r5'
import { lookupByTypeName as lookupByTypeNameR6 } from '@legacy/helpers/models/generated/r6'
import { buildUserModelLookup, composeLookups, type TypeLookup, type UserModelLookup } from '@legacy/helpers/user_models'
import { createFhirLogicalModel, type CreateLogicalModelOptions } from '@legacy/helpers/logical_model_generator'
import { defaultHl7v2Message } from '@legacy/helpers/hl7v2_parser'
import {
  isHl7v2Content,
  mergeHl7v2Models,
  prepareHl7v2FmlInput,
  sampleHl7v2GenericMap,
} from '@legacy/helpers/hl7v2_fml_input'

useHead({ title: 'FML Tester - FHIRPath Lab' })

const route = useRoute()
const { $appInsights } = useNuxtApp() as any

const debugMapFileName = 'map.fml'
const fhirMappingContentType = 'application/fhir+json'

const showAdvancedSettings = ref<boolean>(settings.showAdvancedSettings())
const tabSpaces = ref<number>(settings.getTabSpaces())
const fhirServerExamplesUrl = ref<string>(settings.load().fhirServerExamplesUrl ?? 'https://hapi.fhir.org/baseR4')
const dotnetServerDownloader = ref<string>('https://proxy.fhir.forms-lab.com/downloader')

const defaultMapText = `/// url = 'http://fhirpath-lab.com/StructureMap/intro-patient-map'
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
`
const defaultInputText = JSON.stringify({
  resourceType: 'Patient',
  id: 'example',
  name: [{ family: 'Chalmers', given: ['Peter', 'James'] }],
  gender: 'male',
  birthDate: '1974-12-25',
}, null, 2)

// Editor state
const mapResourceUrl = ref<string>('')
const mapText = ref<string>(defaultMapText)
const inputResourceUrl = ref<string>('')
const inputResourceText = ref<string>(defaultInputText)
const modelsResourceUrl = ref<string>('')
const modelsText = ref<string>('')
const outputText = ref<string>('')
const debugText = ref<string>('')

// Execution state
const executionEngines = computed<string[]>(() => [
  'JavaScript (local)',
  '.NET (brianpos)',
  'java (HAPI)',
  'java (Validator)',
  'matchbox',
  'Python (MaLaC-HD)',
])
const selectedEngine = ref<string>('JavaScript (local)')
const loadingData = ref<boolean>(false)
const initializing = ref<boolean>(true)
const outcome = ref<OperationOutcome | undefined>()
const processedByEngine = ref<string | undefined>()
const trace = ref<FmlTraceEvent[]>([])
const traceStatus = ref<string>('complete')
const variables = ref<FmlTraceVariable[]>([])
const debugTracePosition = ref<number>(0)
let cancelSource: CancelTokenSource | undefined
let localExecutionAbort: AbortController | undefined

// Debug markers
let debugMapMarkers: number[] = []
let debugInputMarkers: number[] = []
let debugOutputMarkers: number[] = []
let debugInputIsGenericHl7v2 = false

// Template refs
const twinTabControl = ref<InstanceType<typeof TwinPaneTab>>()
const mapEditor = ref<InstanceType<typeof ResourceEditor>>()
const inputEditor = ref<InstanceType<typeof ResourceEditor>>()
const modelsEditor = ref<InstanceType<typeof ResourceEditor>>()
const outputEditor = ref<InstanceType<typeof ResourceEditor>>()
const traceTable = ref<any>()
const diagramPreview = ref<HTMLElement>()
const instancePreview = ref<HTMLElement>()
const completePreview = ref<HTMLElement>()

const tabDetails = computed<TabData[]>(() => [
  { iconName: 'mdi-function-variant', tabName: 'Map', show: true, enabled: true, keepMounted: true },
  { iconName: 'mdi-clipboard-text-outline', tabName: 'Input', tabSubName: '(test resource)', tabHeaderName: 'Test Input Resource', show: true, enabled: true, keepMounted: true },
  { iconName: 'mdi-tree-outline', tabName: 'Models', tabHeaderName: 'Logical Models', title: 'Logical Models\n(Structure Definitions)', show: true, enabled: true, keepMounted: true },
  { iconName: 'mdi-format-list-bulleted', tabName: 'Trace', show: trace.value.length > 0, enabled: true },
  { iconName: 'mdi-file-document-outline', tabName: 'Output', tabHeaderName: 'Map Output', title: 'Map Output', show: true, enabled: true, keepMounted: true },
  { iconName: 'mdi-alert-circle-outline', tabName: 'Errors', tabHeaderName: 'Errors', show: outcome.value !== undefined, enabled: true },
  { iconName: 'mdi-graph-outline', tabName: 'Diagram', title: 'Map structure diagram', show: true, enabled: true },
  { iconName: 'mdi-file-tree-outline', tabName: 'Instance', title: 'Instance diagram', show: true, enabled: true },
  { iconName: 'mdi-vector-polyline', tabName: 'Complete', title: 'Complete diagram', show: true, enabled: true },
  { iconName: 'mdi-bug-outline', tabName: 'Debug', show: showAdvancedSettings.value, enabled: true, keepMounted: true },
])
const tabIndex = (name: string) => tabDetails.value.findIndex(t => t.tabName === name)
const selectTabByName = (name: string) => twinTabControl.value?.selectTab(tabIndex(name))

// ---------------------------------------------------------------------------
// Models / lookups used by the diagrams
// ---------------------------------------------------------------------------
const userModelLookup = ref<UserModelLookup | undefined>()
const composedTypeLookup = (): TypeLookup => composeLookups(userModelLookup.value?.lookup, lookupByTypeNameR4B)
const lookupForVersion = (version?: FhirVersion): TypeLookup | undefined => {
  const base = version === 'STU3' ? lookupByTypeNameSTU3
    : version === 'R4' ? lookupByTypeNameR4
    : version === 'R4B' ? lookupByTypeNameR4B
    : version === 'R5' ? lookupByTypeNameR5
    : version === 'R6' ? lookupByTypeNameR6
    : undefined
  return base ? composeLookups(userModelLookup.value?.lookup, base) : undefined
}

watch(modelsText, () => {
  userModelLookup.value = buildUserModelLookup(modelsText.value)
  scheduleDiagramRegen()
})

// ---------------------------------------------------------------------------
// Live validation + diagrams
// ---------------------------------------------------------------------------
const instanceSvg = ref<string | undefined>()
const completeSvg = ref<string | undefined>()
const diagramSvg = ref<string | undefined>()
const diagramIsStale = ref<boolean>(false)
const diagramError = ref<string | undefined>()
const completeShowAllProperties = ref<boolean>(false)
let diagramDebounceTimer: ReturnType<typeof setTimeout> | undefined

const onMapTextUpdate = (value: string) => {
  mapText.value = value
  scheduleDiagramRegen()
}

const issueLocation = (issue: OperationOutcomeIssue): { line: number; column: number } | undefined => {
  const match = /@(\d+):(\d+)/.exec(issue.location?.[0] ?? '')
  return match ? { line: Number(match[1]), column: Number(match[2]) } : undefined
}

const updateMapAnnotations = (result: FmlStructureMap | OperationOutcome) => {
  if (isFmlParseError(result)) {
    mapEditor.value?.setAnnotations(result.issue.flatMap(issue => {
      const loc = issueLocation(issue)
      return loc ? [{ row: loc.line, column: loc.column, text: issue.details?.text ?? issue.diagnostics ?? '', type: 'error' as const }] : []
    }))
  } else {
    mapEditor.value?.setAnnotations(validateFmlModel(result).map(d => ({
      row: d.line,
      column: d.column,
      text: d.message,
      type: d.severity === 'error' ? 'error' as const : d.severity === 'warning' ? 'warning' as const : 'info' as const,
    })))
  }
}

const scheduleDiagramRegen = () => {
  if (diagramDebounceTimer) clearTimeout(diagramDebounceTimer)
  diagramDebounceTimer = setTimeout(regenerateDiagrams, 500)
}

const pauseDiagramPreview = () => {
  diagramError.value = 'FML is invalid. Fix the errors to render the diagram.'
  diagramIsStale.value = instanceSvg.value !== undefined || completeSvg.value !== undefined || diagramSvg.value !== undefined
}

function regenerateDiagrams() {
  const fmlText = mapText.value
  if (!fmlText) {
    instanceSvg.value = completeSvg.value = diagramSvg.value = diagramError.value = undefined
    diagramIsStale.value = false
    mapEditor.value?.setAnnotations([])
    return
  }
  const result = parseFML(fmlText)
  updateMapAnnotations(result)
  if (isFmlParseError(result)) return pauseDiagramPreview()
  if (validateFmlModel(result).some(d => d.severity === 'error')) return pauseDiagramPreview()
  try {
    for (const structure of result.structures) {
      const canonical = (structure.canonical ?? structure.url).split('|')[0]!
      structure.resolvedTypeName = userModelLookup.value?.resolveCanonical(canonical)
        ?? userModelLookup.value?.resolveCanonical(structure.url)
    }
    const lookup = composedTypeLookup()
    instanceSvg.value = generateFmlInstanceDiagramSvg(result, lookup, true, lookupForVersion)
    completeSvg.value = generateFmlCompleteDiagramSvg(result, lookup, completeShowAllProperties.value, lookupForVersion)
    diagramSvg.value = generateFmlStructureMapDiagramSvg(result, lookup, lookupForVersion)
    diagramIsStale.value = false
    diagramError.value = undefined
    prepareDiagramNavigation()
  } catch (e) {
    console.error('Failed to generate FML diagrams:', e)
    pauseDiagramPreview()
  }
}

const prepareDiagramNavigation = () => {
  nextTick(() => {
    for (const preview of [diagramPreview.value, instancePreview.value, completePreview.value]) {
      preview?.querySelectorAll('[data-pos-start][data-pos-end]').forEach(element => {
        if (!element.hasAttribute('tabindex')) element.setAttribute('tabindex', '0')
        if (!element.hasAttribute('role')) element.setAttribute('role', 'button')
        if (!element.hasAttribute('aria-label')) element.setAttribute('aria-label', 'Go to FML source')
      })
    }
  })
}

const activateDiagramElement = (target: EventTarget | null, container: Element) => {
  const connIds = findConnectionIdsForClick(target)
  if (connIds.length > 0) highlightDiagramConnection(container, connIds)
  let el = target as Element | null
  while (el && container.contains(el)) {
    const start = el.getAttribute?.('data-pos-start')
    const end = el.getAttribute?.('data-pos-end')
    if (start != null && end != null) {
      const startPos = parseInt(start, 10)
      const endPos = parseInt(end, 10)
      if (!isNaN(startPos) && !isNaN(endPos) && endPos > startPos) {
        mapEditor.value?.navigateToTextRange({ position: startPos, length: endPos - startPos })
        selectTabByName('Map')
      }
      return
    }
    el = el.parentElement
  }
}
const handleDiagramClick = (event: MouseEvent) => activateDiagramElement(event.target, event.currentTarget as Element)
const handleDiagramKeydown = (event: KeyboardEvent) => {
  if (event.key !== 'Enter' && event.key !== ' ') return
  const element = (event.target as Element | null)?.closest('[data-pos-start][data-pos-end]')
  if (!element) return
  event.preventDefault()
  activateDiagramElement(element, event.currentTarget as Element)
}

// ---------------------------------------------------------------------------
// Validation (Map tab button) and issue navigation
// ---------------------------------------------------------------------------
const validateMap = () => {
  const result = parseFML(mapText.value)
  updateMapAnnotations(result)
  if (isFmlParseError(result)) {
    outcome.value = result
    selectTabByName('Errors')
    return
  }
  const diagnostics = validateFmlModel(result)
  outcome.value = diagnostics.length === 0
    ? { resourceType: 'OperationOutcome', issue: [{ severity: 'information', code: 'informational', details: { text: 'The map is valid.' } }] }
    : {
        resourceType: 'OperationOutcome',
        issue: diagnostics.map(d => ({
          severity: d.severity,
          code: 'invariant',
          details: { text: d.message },
          location: [`@${d.line}:${d.column}`],
        })),
      }
  selectTabByName('Errors')
}

const navigateToIssue = (issue: OperationOutcomeIssue) => {
  const loc = issueLocation(issue)
  if (!loc) return
  selectTabByName('Map')
  nextTick(() => mapEditor.value?.navigateToTextRange({ line: loc.line, column: loc.column + 1, length: 1 }))
}

// ---------------------------------------------------------------------------
// Execution
// ---------------------------------------------------------------------------
const settingsKeyForEngine = (engine: string): { key?: string; legacy: boolean; telemetry: string } => {
  switch (engine) {
    case 'java (HAPI)': return { key: 'mapper_server_java', legacy: false, telemetry: 'evaluate HAPI (map)' }
    case 'java (Validator)': return { key: 'mapper_server_java_validator', legacy: false, telemetry: 'evaluate HAPI Validator (map)' }
    case 'matchbox': return { key: 'mapper_server_matchbox', legacy: true, telemetry: 'evaluate matchbox (map)' }
    case 'Python (MaLaC-HD)': return { key: 'mapper_server_malac_hd', legacy: true, telemetry: 'evaluate malac-hd (map)' }
    case 'JavaScript (local)': return { legacy: false, telemetry: 'evaluate local (map)' }
    default: return { key: 'mapper_server', legacy: false, telemetry: 'evaluate .NET (map)' }
  }
}

const traceTypeClass = (category: string) => (category === 'debug' ? 'trace-debug' : category === 'info' ? 'trace-info' : '')

const formatTraceVariable = (variable: FmlTraceVariable): string | undefined =>
  variable.errorMessage ?? JSON.stringify(variable.data?.value, null, tabSpaces.value)

const errorOutcome = (code: string, diagnostics: string): OperationOutcome => ({
  resourceType: 'OperationOutcome',
  issue: [{ severity: 'error', code: code as any, diagnostics }],
})

const resetRun = () => {
  processedByEngine.value = undefined
  localExecutionAbort?.abort()
  localExecutionAbort = undefined
  cancelSource?.cancel('new map test started')
  cancelSource = undefined
  loadingData.value = false
  outcome.value = undefined
  debugText.value = ''
  clearDebuggerSelectionMarkers()
  debugTracePosition.value = 0
  trace.value = []
  traceStatus.value = 'complete'
  variables.value = []
  outputText.value = ''
}

const populateTracePositions = (map: string) => {
  if (!trace.value.some(e => e.source && e.traceLocation && !e.range)) return
  const model = parseFML(map)
  if (isFmlParseError(model)) return
  const index = new FmlTraceLocationIndex(model)
  trace.value = trace.value.map(e => e.source && e.traceLocation && !e.range ? { ...e, range: index.rangeFor(e.traceLocation) } : e)
}

const processTransformResponse = (results: Parameters | OperationOutcome, inputText: string, map: string, status = 200) => {
  if (!results || (results.resourceType !== 'Parameters' && results.resourceType !== 'OperationOutcome')) {
    throw new Error(`Transform engine returned HTTP ${status} without FHIR Parameters or OperationOutcome.`)
  }
  debugText.value = JSON.stringify(results, null, tabSpaces.value)
  processedByEngine.value = undefined
  traceStatus.value = 'complete'
  trace.value = []
  variables.value = []
  outputText.value = ''
  debugTracePosition.value = 0
  outcome.value = undefined
  if (results.resourceType === 'Parameters') {
    const debug = parseDebugTrace(results as any, parseFmlInput(inputText), undefined, [{ text: map, fileName: debugMapFileName }])
    processedByEngine.value = debug.evaluator
    traceStatus.value = debug.traceStatus ?? 'complete'
    trace.value = debug.trace
    populateTracePositions(map)
    variables.value = trace.value[0]?.variables ?? []
    if (debug.result) {
      outputText.value = debug.rawResult !== undefined
        ? typeof debug.result.value === 'string'
          ? debug.rawResult
          : stringifyFmlJson(parseFmlJson(debug.rawResult), tabSpaces.value)
        : JSON.stringify(debug.result.value, null, tabSpaces.value)
    }
  }
  const resultOutcome = results.resourceType === 'OperationOutcome'
    ? results
    : (results.parameter?.find(p => p.name === 'outcome')?.resource as OperationOutcome | undefined)
  if (resultOutcome?.resourceType === 'OperationOutcome') outcome.value = resultOutcome
  if (status >= 400) {
    const message = `Transform engine returned HTTP ${status}.`
    if (!outcome.value?.issue.some(i => i.severity === 'error' || i.severity === 'fatal')) {
      outcome.value = { resourceType: 'OperationOutcome', issue: [...(outcome.value?.issue ?? []), { severity: 'error', code: 'processing', diagnostics: message }] }
    }
    const last = trace.value[trace.value.length - 1]
    if (last && !last.exception) last.exception = message
  }
}

async function evaluateMap() {
  resetRun()
  regenerateDiagrams()

  let inputText = inputResourceText.value
  let model: string | undefined = modelsText.value.trim() || undefined
  const map = mapText.value

  if (!inputText.trim() && inputResourceUrl.value) {
    await inputEditor.value?.DownloadResource()
    inputText = inputResourceText.value
  }
  if (!inputText.trim()) {
    outcome.value = { resourceType: 'OperationOutcome', issue: [{ severity: 'error', code: 'required', diagnostics: 'An input JSON, XML or HL7 v2 resource is required.' }] }
    return
  }

  // HL7 v2 is converted to the JSON of the logical model the map declares as its source
  debugInputIsGenericHl7v2 = false
  if (isHl7v2Content(inputText)) {
    try {
      const prepared = prepareHl7v2FmlInput(inputText, map, model)
      inputText = prepared.inputText
      model = prepared.modelText
      debugInputIsGenericHl7v2 = prepared.style === 'generic'
      if (prepared.warnings.length > 0) {
        outcome.value = {
          resourceType: 'OperationOutcome',
          issue: prepared.warnings.map(w => ({ severity: 'warning' as const, code: 'informational' as const, diagnostics: w })),
        }
      }
    } catch (e) {
      outcome.value = errorOutcome('invalid', `Unable to prepare the HL7 v2 message: ${e}`)
      return
    }
  }

  const engine = settingsKeyForEngine(selectedEngine.value)
  $appInsights?.trackEvent({ name: engine.telemetry })
  const url = engine.key ? await settings.getServerEngineUrl(engine.key) : ''

  if (selectedEngine.value === 'JavaScript (local)') {
    const controller = new AbortController()
    localExecutionAbort = controller
    loadingData.value = true
    try {
      const response = await new FmlLocalDebugService().executeParameters({
        mapText: map,
        maps: [{ text: map, fileName: debugMapFileName }],
        inputText,
        modelText: model,
        signal: controller.signal,
      } as any)
      if (controller.signal.aborted) return
      processTransformResponse(response as Parameters, inputText, map)
    } catch (error) {
      if (controller.signal.aborted) return
      outcome.value = errorOutcome('processing', String(error))
    } finally {
      if (localExecutionAbort === controller) {
        localExecutionAbort = undefined
        loadingData.value = false
      }
    }
  } else {
    const mapParameter: ParametersParameter = {
      name: engine.legacy ? 'map' : 'srcMap',
      valueString: map,
      extension: [{ url: 'http://hl7.org/fhir/StructureDefinition/operationoutcome-file', valueString: debugMapFileName }],
    }
    const p: Parameters = { resourceType: 'Parameters', parameter: [mapParameter] }
    if (model !== undefined) p.parameter!.push({ name: 'model', valueString: model })
    if (engine.legacy) p.parameter!.push({ name: 'resource', valueString: inputText })
    else p.parameter!.push({ name: 'content', resource: createFmlContent(inputText) as any })
    p.parameter!.push({ name: 'debug', valueBoolean: true })

    cancelSource?.cancel('new map test started')
    const source = axios.CancelToken.source()
    cancelSource = source
    loadingData.value = true
    try {
      const response = await axios.post<Parameters | OperationOutcome>(url, p, {
        cancelToken: source.token,
        validateStatus: () => true,
        headers: { Accept: requestFhirAcceptHeaders, 'Content-Type': fhirMappingContentType },
      })
      if (source.token.reason) return
      processTransformResponse(response.data, inputText, map, response.status)
    } catch (err) {
      if (source.token.reason || axios.isCancel(err)) return
      outcome.value = errorOutcome('processing', String(err))
    } finally {
      if (cancelSource === source) {
        cancelSource = undefined
        loadingData.value = false
      }
    }
  }

  if (!initializing.value) selectTabByName('Output')
}

// ---------------------------------------------------------------------------
// Debugger
// ---------------------------------------------------------------------------
const clearDebuggerSelectionMarkers = () => {
  const editor = mapEditor.value?.getEditor()
  for (const id of debugMapMarkers) editor?.session.removeMarker(id)
  inputEditor.value?.removeMarkers(debugInputMarkers)
  outputEditor.value?.removeMarkers(debugOutputMarkers)
  debugMapMarkers = []
  debugInputMarkers = []
  debugOutputMarkers = []
}

// The generic HL7 v2 projection is 0-based JSON, the v2 AST used for highlighting is 1-based.
const inputPath = (path: string) => debugInputIsGenericHl7v2 ? path.replace(/\[(\d+)\]/g, (_, n) => `[${Number(n) + 1}]`) : path

const highlightMapRange = (startPosition: number, length: number, debugMode: boolean) => {
  const editor = mapEditor.value?.getEditor()
  if (!editor) return
  const doc = editor.session.getDocument()
  const start = doc.indexToPosition(startPosition, 0)
  const end = doc.indexToPosition(startPosition + length, 0)
  const range = new ace.Range(start.row, start.column, end.row, end.column)
  editor.clearSelection()
  editor.gotoLine(start.row + 1, start.column, true)
  if (debugMode) {
    debugMapMarkers.push(editor.session.addMarker(range, 'debugSelection', 'text', false))
  } else {
    const marker = editor.session.addMarker(range, 'resultSelection', 'text', true)
    setTimeout(() => editor.session.removeMarker(marker), 1500)
  }
}

const highlightDebuggerVariables = () => {
  const inputPaths: string[] = []
  const outputPaths: string[] = []
  for (let n = variables.value.length - 1; n >= 0; n--) {
    const variable = variables.value[n]!
    if (!variable.path) continue
    const isInput = variable.retrievalFromInput || variable.mode?.toUpperCase() === 'INPUT'
    const isOutput = !isInput && variable.mode?.toUpperCase() === 'OUTPUT'
    const paths = isInput ? inputPaths : isOutput ? outputPaths : undefined
    if (!paths || paths.some(p => p.length > variable.path!.length && p.startsWith(variable.path!))) continue
    paths.push(variable.path)
    const marker = isInput
      ? inputEditor.value?.navigateToContext(fhirpath_r4_model as any, inputPath(variable.path), variable.name, true)
      : outputEditor.value?.navigateToContext(fhirpath_r4_model as any, variable.path, variable.name, true)
    if (typeof marker === 'number') (isInput ? debugInputMarkers : debugOutputMarkers).push(marker)
  }
}

const scrollTraceIntoView = (index: number) => {
  nextTick(() => {
    const row = (traceTable.value?.$el as HTMLElement | undefined)?.querySelectorAll('tbody tr')[index]
    row?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  })
}

const selectTrace = (position: number, debugMode = true) => {
  const event = trace.value[position]
  if (!event) return
  clearDebuggerSelectionMarkers()
  debugTracePosition.value = position
  variables.value = event.variables
  // Coordinates belong to the submitted map, not to subsequent editor changes.
  if (event.source?.text === mapText.value && event.range) {
    highlightMapRange(event.range.startOffset, event.range.length, debugMode)
  }
  scrollTraceIntoView(position)
  highlightDebuggerVariables()
}

const debuggerStepBack = () => selectTrace(Math.max(0, debugTracePosition.value - 1))
const debuggerStepForward = () => selectTrace(Math.min(trace.value.length - 1, debugTracePosition.value + 1))
const navigateToTrace = (event: FmlTraceEvent) => selectTrace(trace.value.indexOf(event), false)

const navigateToVariable = (variable: FmlTraceVariable) => {
  if (!variable.path) return
  if (variable.retrievalFromInput || variable.mode?.toUpperCase() === 'INPUT') {
    inputEditor.value?.navigateToContext(fhirpath_r4_model as any, inputPath(variable.path))
    selectTabByName('Input')
  } else if (variable.mode?.toUpperCase() === 'OUTPUT') {
    outputEditor.value?.navigateToContext(fhirpath_r4_model as any, variable.path)
    selectTabByName('Output')
  }
}

const debugFunctionKeyHandler = (event: KeyboardEvent) => {
  if (event.key !== 'F10' || trace.value.length === 0) return
  event.shiftKey ? debuggerStepBack() : debuggerStepForward()
  event.preventDefault()
}

// ---------------------------------------------------------------------------
// Models and HL7 v2 helpers
// ---------------------------------------------------------------------------
const generateLogicalModelFromInput = () => {
  const input = inputResourceText.value.trim()
  if (isHl7v2Content(input)) {
    addGenericHl7v2Models()
    return
  }
  if (!(input.startsWith('<') || input.startsWith('{') || input.startsWith('['))) return
  try {
    let options: CreateLogicalModelOptions = { publisher: settings.getDefaultProviderField() }
    let rootTypeName: string | undefined
    if (modelsText.value) {
      try {
        const existing = JSON.parse(modelsText.value)
        if (existing?.resourceType === 'StructureDefinition' && existing?.kind === 'logical') {
          options = {
            name: existing.name,
            title: existing.title,
            url: existing.url,
            description: existing.description,
            publisher: existing.publisher ?? settings.getDefaultProviderField(),
            version: existing.version,
            status: existing.status,
          }
          rootTypeName = existing.name
        }
      } catch { /* regenerate with defaults */ }
    }
    modelsText.value = JSON.stringify(createFhirLogicalModel(input, rootTypeName, options), null, 4)
    selectTabByName('Models')
  } catch (e) {
    console.error('Failed to generate logical model:', e)
  }
}

/** Puts the generic HL7 v2 models (merged with any user models already present) in the Models tab */
const addGenericHl7v2Models = () => {
  try {
    modelsText.value = JSON.stringify(mergeHl7v2Models(modelsText.value).bundle, null, 2)
    selectTabByName('Models')
  } catch (e) {
    outcome.value = errorOutcome('invalid', `The Models text is not valid JSON: ${e}`)
  }
}

const loadHl7v2Sample = () => {
  inputResourceText.value = defaultHl7v2Message
  inputResourceUrl.value = ''
  mapText.value = sampleHl7v2GenericMap
  mapResourceUrl.value = ''
  scheduleDiagramRegen()
}

// ---------------------------------------------------------------------------
// Page lifecycle / URL parameters
// ---------------------------------------------------------------------------
const tabChanged = (index: number) => {
  if (tabDetails.value[index]?.tabName === 'Map') {
    setTimeout(() => mapEditor.value?.getEditor()?.resize())
  }
}

const onSettingsClosed = () => {
  showAdvancedSettings.value = settings.showAdvancedSettings()
  tabSpaces.value = settings.getTabSpaces()
}

async function twinPaneMounted() {
  const q = route.query
  const tab = q.tab as string | undefined
  if (tab) {
    nextTick(() => {
      const control = twinTabControl.value
      if (!control) return
      if (tab.includes(',')) {
        const [left, right] = tab.split(',')
        control.selectTabs(control.getTabIndex(left!), control.getTabIndex(right!), 'left')
      } else {
        control.setSinglePanelMode(true)
        control.selectTab(control.getTabIndex(tab))
      }
    })
  } else {
    selectTabByName('Input')
  }

  if (q.expression) mapText.value = q.expression as string
  if (q.resource) inputResourceUrl.value = q.resource as string
  if (q.resourceJson) {
    inputResourceText.value = decompressFromEncodedURIComponent(q.resourceJson as string) ?? ''
    inputResourceUrl.value = ''
  }
  if (q.engine && executionEngines.value.includes(q.engine as string)) selectedEngine.value = q.engine as string
  if (q.models) {
    modelsResourceUrl.value = q.models as string
    await nextTick()
    await modelsEditor.value?.DownloadResource()
  }
  if (q.structureMap) {
    mapResourceUrl.value = q.structureMap as string
    await nextTick()
    await mapEditor.value?.DownloadResource()
  }

  userModelLookup.value = buildUserModelLookup(modelsText.value)
  await evaluateMap()
  initializing.value = false
}

onMounted(() => window.addEventListener('keydown', debugFunctionKeyHandler))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', debugFunctionKeyHandler)
  if (diagramDebounceTimer) clearTimeout(diagramDebounceTimer)
  localExecutionAbort?.abort()
  cancelSource?.cancel('page closed')
})
</script>

<style>
.debugSelection {
  position: absolute;
  z-index: 20;
  background-color: #fbff82b1;
}

.resultSelection {
  position: absolute;
  z-index: 20;
  background-color: #5240ef65;
}

.diagram-preview {
  position: relative;
  overflow: auto;
}

.diagram-preview-options {
  display: flex;
  min-height: 48px;
  align-items: center;
  padding: 4px 12px;
  border-bottom: 1px solid #e0e0e0;
}

.diagram-preview--stale .diagram-preview-content {
  opacity: 0.28;
  filter: grayscale(0.35);
  pointer-events: none;
  user-select: none;
}

.diagram-preview-status {
  position: sticky;
  top: 12px;
  z-index: 1;
  display: flex;
  height: 0;
  justify-content: center;
  pointer-events: none;
}

.diagram-preview-status-message {
  height: fit-content;
  padding: 10px 14px;
  border: 1px solid #edb95e;
  border-radius: 4px;
  color: #302b22;
  background: #fff8e8;
  box-shadow: 0 3px 12px rgb(0 0 0 / 18%);
}

.diagram-preview-status-message strong {
  display: block;
}

.diagram-preview-empty {
  padding: 16px;
  color: #777;
  font-style: italic;
}
</style>

<style scoped>
.page-content {
  height: calc(100vh - 100px);
}

.container-fluid {
  padding-left: 16px;
  padding-right: 16px;
}

.engine-selector {
  max-width: 22ch;
  padding-left: 6px;
}

.debug-controls {
  border-radius: 8px;
  border: solid 1px white;
  padding: 4px;
  margin-left: 6px;
}

.ct-header {
  padding: 6px 12px;
  color: white;
  background-color: #79b6e6;
  border-bottom: silver 1px solid;
}

.scroll-pane {
  overflow-y: auto;
  max-height: calc(100vh - 220px);
}

.result-value {
  width: 100%;
}

td {
  vertical-align: top;
}

.debugging-row {
  background-color: aqua;
}

.processed-by {
  float: right;
  font-size: small;
  text-transform: none;
}

.trace-debug {
  color: grey;
  font-family: 'Courier New', Courier, monospace;
  white-space: pre-wrap;
}

.trace-info {
  color: #1976d2;
}
</style>
