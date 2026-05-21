<template>
  <div style="display: flex; flex-direction: column; height: 100%;">
    <v-text-field 
      v-if="label && label.length > 0" 
      :label="label" 
      :readonly="readOnly" 
      v-model="internalResourceUrl" 
      :loading="downloadingInProgress"
      hide-details="auto" 
      density="compact"
      autocomplete="off" 
      autocorrect="off" 
      autocapitalize="off" 
      spellcheck="false"
      @keyup.enter="handleEnterKey"
    >
      <template v-if="$slots.prepend" v-slot:prepend>
        <slot name="prepend"></slot>
      </template>
      <template v-slot:append-inner>
        <v-btn 
          icon 
          size="small" 
          variant="text"
          density="comfortable"
          rounded="0"
          v-show="internalResourceUrl && !readOnly" 
          @click="clearUrl" 
          :title="'Clear ' + label"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-btn 
          icon 
          size="small" 
          variant="text"
          density="comfortable"
          rounded="0"
          v-show="!readOnly" 
          :disabled="!internalResourceUrl" 
          @click="downloadResource"
          :title="'Download ' + label"
        >
          <v-icon>mdi-download</v-icon>
        </v-btn>
        <v-btn 
          icon 
          size="small" 
          variant="text"
          density="comfortable"
          rounded="0"
          @click="reformatResource"
        >
          <v-icon :title="'Re-format the ' + resourceType + ' below'">
            mdi-format-indent-increase
          </v-icon>
        </v-btn>
        <slot name="append"></slot>
      </template>
    </v-text-field>
    <label v-show="textLabel">{{ textLabel + ' ' + resourceType }}<i>{{ (resourceTextModified ? ' (modified)' : '') }}</i></label>
    <div ref="editorContainerRef" class="monaco-editor-container" style="flex-grow: 1; width: 100%; height: 100%; min-height: 0;"></div>
    <div class="monaco_editor_footer"></div>
    <label v-show="footerLabel"><i>{{ footerLabel }}</i></label>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, type Ref } from 'vue'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
// Pull in only the languages we need (keeps bundle small vs. importing 'monaco-editor' wholesale).
import 'monaco-editor/esm/vs/basic-languages/xml/xml.contribution'
import 'monaco-editor/esm/vs/language/json/monaco.contribution'
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'

import axios, { type AxiosError, type CancelTokenSource } from 'axios'
import xmlFormat from 'xml-formatter'
import type { IJsonNodePosition } from '~/types/json-parser'
import { requestFhirAcceptHeaders, requestFhirAcceptXmlHeaders, requestFhirAcceptFmlHeaders, CreateOperationOutcome } from '~/utils/fhir-rest'
import type { Resource, OperationOutcome } from 'fhir/r4'
import { findNodeByPath, type IJsonNode, parseJson } from '@legacy/helpers/json_parser'
import { parseXml } from '@legacy/helpers/xml_parser'
import type { Model } from 'fhirpath'
import { setupFhirPathLanguage } from '~/utils/monaco-fhirpath'

// Configure Monaco web workers exactly once per session. The app is client-only
// (Nuxt ssr:false) so it is safe to run this at module init in a component file,
// but we still guard against re-assignment in case the component mounts more than
// once.
if (typeof window !== 'undefined' && !(self as any).MonacoEnvironment) {
  ;(self as any).MonacoEnvironment = {
    getWorker(_workerId: string, label: string) {
      if (label === 'json') return new JsonWorker()
      return new EditorWorker()
    }
  }
}

// Register the FHIRPath/FML Monarch language once.
setupFhirPathLanguage(monaco)

// Props interface
interface Props {
  label?: string
  resourceUrl?: string
  resourceText?: string
  readOnly?: boolean
  textLabel?: string
  footerLabel?: string
  tabSpaces?: number
  fhirServerExamplesUrl?: string
  dotnetServerDownloader?: string
}

// Define props with defaults
const props = withDefaults(defineProps<Props>(), {
  label: undefined,
  resourceUrl: '',
  resourceText: '',
  readOnly: false,
  textLabel: undefined,
  footerLabel: undefined,
  tabSpaces: 2,
  fhirServerExamplesUrl: 'https://hapi.fhir.org/baseR4',
  dotnetServerDownloader: ''
})

// Define emits
const emit = defineEmits<{
  'update:resourceUrl': [value: string]
  'update:resourceText': [value: string]
}>()

// Reactive state
const internalResourceUrl = ref<string>(props.resourceUrl ?? '')
const internalResourceText = ref<string>(props.resourceText)
const resourceTextFromFile = ref<string | undefined>(undefined)
// Mirrors the legacy 'json' | 'xml' | 'fml' values used in the template and watchers.
const resourceType = ref<string>('json')
const downloadingInProgress = ref<boolean>(false)
const monacoEditor: Ref<monaco.editor.IStandaloneCodeEditor | null> = ref(null)
const cancelSource = ref<CancelTokenSource | undefined>(undefined)
const resourceTextModified = ref<boolean>(false)

// Template refs
const editorContainerRef = ref<HTMLDivElement>()

// --- Marker (decoration) bookkeeping -----------------------------------------
// Existing callers reference markers by numeric id (Ace style). We back them with
// Monaco decoration collections and keep the public API numeric.
const decorationCollections = new Map<number, monaco.editor.IEditorDecorationsCollection>()
let nextMarkerId = 1

function trackDecorations(decorations: monaco.editor.IModelDeltaDecoration[]): number {
  const editor = monacoEditor.value
  if (!editor) return 0
  const collection = editor.createDecorationsCollection(decorations)
  const id = nextMarkerId++
  decorationCollections.set(id, collection)
  return id
}

function clearMarker(id: number): void {
  const collection = decorationCollections.get(id)
  if (collection) {
    collection.clear()
    decorationCollections.delete(id)
  }
}

// --- Diagnostics (model markers) ---------------------------------------------
const DIAGNOSTIC_OWNER = 'fhirpath-lab'
let diagnosticsTimer: ReturnType<typeof setTimeout> | null = null

function scheduleDiagnostics(): void {
  if (diagnosticsTimer) clearTimeout(diagnosticsTimer)
  diagnosticsTimer = setTimeout(runDiagnostics, 300)
}

function runDiagnostics(): void {
  const editor = monacoEditor.value
  const model = editor?.getModel()
  if (!editor || !model) return

  if (resourceType.value !== 'xml') {
    // JSON markers are produced by Monaco's JSON worker; for FML/text we have no
    // structural diagnostics to add. Clear any leftover XML diagnostics.
    monaco.editor.setModelMarkers(model, DIAGNOSTIC_OWNER, [])
    return
  }

  const markers: monaco.editor.IMarkerData[] = []
  const value = model.getValue()

  if (value.trim().length === 0) {
    monaco.editor.setModelMarkers(model, DIAGNOSTIC_OWNER, [])
    return
  }

  // --- 1) Well-formedness via xml-formatter ---
  let wellFormed = true
  try {
    xmlFormat(value, {
      indentation: ' '.repeat(props.tabSpaces),
      collapseContent: true,
      lineSeparator: '\n'
    })
  } catch (e) {
    wellFormed = false
    const { line, column, message } = extractXmlErrorLocation(e, value)
    markers.push({
      severity: monaco.MarkerSeverity.Error,
      message: `XML: ${message}`,
      startLineNumber: line,
      startColumn: column,
      endLineNumber: line,
      endColumn: Math.max(column + 1, model.getLineMaxColumn(Math.min(line, model.getLineCount())))
    })
  }

  // --- 2) FHIR-aware diagnostics on syntactically valid XML ---
  if (wellFormed) {
    try {
      const ast = parseXml(value)
      if (ast && ast.DataType) {
        walkXmlNodeForDiagnostics(ast, markers)
      }
    } catch {
      // parseXml is best-effort; swallow to avoid masking the underlying editor.
    }
  }

  monaco.editor.setModelMarkers(model, DIAGNOSTIC_OWNER, markers)
}

function extractXmlErrorLocation(err: unknown, value: string): { line: number; column: number; message: string } {
  const fallback = { line: 1, column: 1, message: err instanceof Error ? err.message : String(err) }
  const message = fallback.message
  // xml-formatter surfaces SAX-style errors that often contain "Line: N Column: M" or
  // "line N" + "column M" in the message. Extract them best-effort.
  const lineMatch = /[Ll]ine[:\s]+(\d+)/.exec(message)
  const colMatch = /[Cc]olumn[:\s]+(\d+)/.exec(message)
  if (lineMatch) fallback.line = Math.max(1, parseInt(lineMatch[1]!, 10))
  if (colMatch) fallback.column = Math.max(1, parseInt(colMatch[1]!, 10))
  // Clamp to actual document bounds.
  const totalLines = value.split(/\r\n|\r|\n/).length
  if (fallback.line > totalLines) fallback.line = totalLines
  return fallback
}

function walkXmlNodeForDiagnostics(node: IJsonNode, markers: monaco.editor.IMarkerData[]): void {
  // Emit a warning for any child element whose data type could not be resolved
  // against the FHIR model -- catches typos in element names and choice-type
  // suffixes (e.g. <valueStringg> instead of <valueString>). We only emit when the
  // *parent* type is known so we don't drown the user in noise on unknown roots.
  if (node.children) {
    const parentTypeKnown = !!node.DataType
    for (const child of node.children) {
      if (
        parentTypeKnown &&
        child.text &&
        !child.DataType &&
        child.position &&
        !child.text.startsWith('xmlns') &&
        child.text !== '#text'
      ) {
        markers.push({
          severity: monaco.MarkerSeverity.Warning,
          message: `Unknown FHIR element '${child.text}' in ${node.DataType ?? 'parent'}`,
          startLineNumber: child.position.line,
          startColumn: Math.max(1, child.position.column),
          endLineNumber: child.position.line,
          endColumn: Math.max(2, child.position.column + child.text.length)
        })
      }
      walkXmlNodeForDiagnostics(child, markers)
    }
  }
}

// --- Public methods ----------------------------------------------------------
const DownloadResource = async (url?: string) => {
  if (url) {
    internalResourceUrl.value = url
  }
  await downloadResource()
}

const handleEnterKey = (event: KeyboardEvent) => {
  if (!event.ctrlKey && !event.metaKey) {
    downloadResource()
  }
}

function positionToMonaco(position: IJsonNodePosition, text: string): {
  line: number
  column: number
  endLine: number
  endColumn: number
} {
  // Replicates the legacy Ace range math: highlight from the property's start
  // line/column to either value_stop_pos (preferred) or prop_stop_pos.
  const stop = position.value_stop_pos ?? position.prop_stop_pos
  if (typeof stop === 'number' && stop >= position.prop_start_pos) {
    const substr = text.substring(position.prop_start_pos, stop + 1)
    const lines = substr.split(/\r\n|\r|\n/)
    const endRowOffset = lines.length
    const endLine = position.line + endRowOffset - 1
    const lastLine = lines[endRowOffset - 1] ?? ''
    const endColOffset = lastLine.length
    const endColumn = endRowOffset === 1
      ? position.column + endColOffset
      : endColOffset + 1
    return {
      line: position.line,
      column: Math.max(1, position.column),
      endLine,
      endColumn: Math.max(endColumn, position.column + 1)
    }
  }
  return {
    line: position.line,
    column: Math.max(1, position.column),
    endLine: position.line,
    endColumn: Math.max(position.column + 1, 2)
  }
}

const navigateToPosition = (position: IJsonNodePosition) => {
  const editor = monacoEditor.value
  if (!editor) return
  const { line, column, endLine, endColumn } = positionToMonaco(position, internalResourceText.value)

  editor.focus()
  editor.setPosition({ lineNumber: line, column })
  editor.revealPositionInCenter({ lineNumber: line, column })

  const id = trackDecorations([{
    range: new monaco.Range(line, 1, endLine, endColumn),
    options: {
      isWholeLine: true,
      className: 'resultSelection'
    }
  }])
  setTimeout(() => clearMarker(id), 1500)
}

const navigateToContext = (model: Model, elementPath: string, variableName?: string, debugMode?: boolean): number | void => {
  void variableName // accepted for API parity; the legacy implementation also ignored it
  const editor = monacoEditor.value
  if (!editor || !internalResourceText.value) return

  let ast: IJsonNode | undefined
  if (internalResourceText.value.startsWith('<')) {
    ast = parseXml(internalResourceText.value, model)
  } else {
    ast = parseJson(internalResourceText.value, model)
  }
  if (!ast) return

  const node = findNodeByPath(ast, elementPath)
  if (!node?.position) return

  const { line, column, endLine, endColumn } = positionToMonaco(node.position, internalResourceText.value)

  editor.focus()
  editor.setPosition({ lineNumber: line, column })
  editor.revealPositionInCenter({ lineNumber: line, column })

  if (debugMode) {
    return trackDecorations([{
      range: new monaco.Range(line, column, endLine, endColumn),
      options: {
        className: 'debugSelection'
      }
    }])
  }

  const id = trackDecorations([{
    range: new monaco.Range(line, 1, endLine, endColumn),
    options: {
      isWholeLine: true,
      className: 'resultSelection'
    }
  }])
  setTimeout(() => clearMarker(id), 1500)
}

const removeMarker = (markerId: number): void => {
  if (markerId) clearMarker(markerId)
}

const removeMarkers = (markerIds: number[]): void => {
  if (!markerIds?.length) return
  for (const id of markerIds) clearMarker(id)
}

// --- Watchers ----------------------------------------------------------------
watch(() => props.resourceUrl, (newUrl: string) => {
  internalResourceUrl.value = newUrl
})

watch(() => props.resourceText, (newText: string) => {
  if (internalResourceText.value !== newText) {
    internalResourceText.value = newText
    const editor = monacoEditor.value
    if (editor) {
      const model = editor.getModel()
      if (model && model.getValue() !== (newText || '')) {
        // Preserve cursor by using executeEdits/setValue; setValue is simpler and
        // matches the legacy Ace behaviour.
        editor.setValue(newText || '')
      }
    }
    detectResourceType()
    scheduleDiagnostics()
  }
})

watch(internalResourceUrl, (newUrl: string) => {
  emit('update:resourceUrl', newUrl)
})

// --- Editor lifecycle --------------------------------------------------------
function languageForResourceType(type: string): string {
  if (type === 'xml') return 'xml'
  if (type === 'json') return 'json'
  if (type === 'fml') return 'fhirpath'
  return 'plaintext'
}

const initializeMonacoEditor = () => {
  if (!editorContainerRef.value) return

  detectResourceType()

  const editor = monaco.editor.create(editorContainerRef.value, {
    value: internalResourceText.value || '',
    language: languageForResourceType(resourceType.value),
    theme: 'fhirpath-lab',
    tabSize: props.tabSpaces,
    readOnly: props.readOnly,
    automaticLayout: true,
    wordWrap: 'on',
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    renderWhitespace: 'selection',
    fixedOverflowWidgets: true
  })
  monacoEditor.value = editor

  editor.onDidChangeModelContent(() => {
    const currentText = editor.getValue()
    if (currentText !== internalResourceText.value) {
      internalResourceText.value = currentText
      resourceTextModified.value = (resourceTextFromFile.value !== undefined && internalResourceText.value !== resourceTextFromFile.value)
      detectResourceType()
      emit('update:resourceText', internalResourceText.value)
      scheduleDiagnostics()
    }
  })

  scheduleDiagnostics()
}

const detectResourceType = () => {
  const content = internalResourceText.value.trim()
  let newType = resourceType.value
  if (content.startsWith('<')) {
    newType = 'xml'
  } else if (content.startsWith('///') || content.startsWith('map ')) {
    newType = 'fml'
  } else {
    newType = 'json'
  }

  if (newType !== resourceType.value) {
    resourceType.value = newType
    const editor = monacoEditor.value
    const model = editor?.getModel()
    if (model) {
      monaco.editor.setModelLanguage(model, languageForResourceType(newType))
    }
  }
}

const downloadResource = async () => {
  if (!internalResourceUrl.value) return

  downloadingInProgress.value = true

  try {
    if (!internalResourceUrl.value) return
    let url = internalResourceUrl.value
    if (internalResourceUrl.value && !internalResourceUrl.value.startsWith("http")) {
      url = props.fhirServerExamplesUrl + "/" + internalResourceUrl.value
    }

    if (
      url.startsWith("http://build.fhir.org/") ||
      url.startsWith("http://hl7.org/fhir/")
    ) {
      url = "https://" + url.substring(7)
    }

    if (
      url.startsWith("https://build.fhir.org/") ||
      url.startsWith("https://hl7.org/fhir/")
    ) {
      url = props.dotnetServerDownloader + "?url=" + url
    }

    if (cancelSource.value) cancelSource.value.cancel("new download started")
    cancelSource.value = axios.CancelToken.source()
    downloadingInProgress.value = true
    let token = cancelSource.value.token

    let headers = {
      "Cache-Control": "no-cache",
      Accept: `${requestFhirAcceptFmlHeaders}, ${requestFhirAcceptHeaders}, ${requestFhirAcceptXmlHeaders}`,
    }

    const response = await axios.get<Resource | string>(url, {
      cancelToken: token,
      headers: headers,
      responseType: 'text',
    })

    if (token.reason) {
      console.log(token.reason)
      return
    }

    cancelSource.value = undefined
    downloadingInProgress.value = false

    const results = response.data
    if (results) {
      const editor = monacoEditor.value
      if (editor) {
        let formattedContent = ''
        const contentType = response.headers['content-type'] || ''

        if (contentType.includes('xml') || (typeof results === 'string' && results.trim().startsWith('<'))) {
          try {
            formattedContent = xmlFormat(results as string, {
              indentation: ' '.repeat(props.tabSpaces),
              collapseContent: true,
              lineSeparator: '\n'
            })
          } catch (e) {
            formattedContent = results as string
          }
          resourceType.value = 'xml'
          const model = editor.getModel()
          if (model) monaco.editor.setModelLanguage(model, 'xml')
        } else {
          try {
            const parsedJson = typeof results === 'string' ? JSON.parse(results) : results
            formattedContent = JSON.stringify(parsedJson, null, props.tabSpaces)
            resourceType.value = 'json'
            const model = editor.getModel()
            if (model) monaco.editor.setModelLanguage(model, 'json')
          } catch (e) {
            formattedContent = results as string
          }
        }

        resourceTextFromFile.value = formattedContent
        if (formattedContent) {
          editor.setValue(formattedContent)
        }
        editor.setPosition({ lineNumber: 1, column: 1 })
      }
    }
  } catch (err) {
    downloadingInProgress.value = false
    let saveOutcome: OperationOutcome | undefined = undefined

    if (axios.isAxiosError(err)) {
      const serverError = err as AxiosError<OperationOutcome>
      if (serverError && serverError.response) {
        if (serverError.response.data?.resourceType === "OperationOutcome") {
          saveOutcome = serverError.response.data
        } else {
          if (serverError.response.status === 404) {
            saveOutcome = {
              resourceType: "OperationOutcome",
              issue: [],
            }
          }
          saveOutcome?.issue.push({
            code: "not-found",
            severity: "error",
            details: { text: "Test resource not found" },
          })
        }
        return
      }
      saveOutcome = CreateOperationOutcome(
        "fatal",
        "exception",
        "Server: " + err.message,
        undefined,
        err.code
      )
      return
    }
    saveOutcome = CreateOperationOutcome(
      "fatal",
      "exception",
      "Client: " + err
    )
  }
}

const reformatResource = () => {
  const editor = monacoEditor.value
  if (!editor) return
  const oldResourceTextModified = resourceTextModified.value
  if (resourceType.value === 'json') {
    try {
      const parsedJson = JSON.parse(editor.getValue())
      editor.setValue(JSON.stringify(parsedJson, null, props.tabSpaces))
    } catch (e) {
      // The JSON worker already shows red squigglies; surface a brief alert too
      // so the toolbar button still gives explicit feedback.
      alert('Invalid JSON')
    }
  }
  if (resourceType.value === 'xml') {
    try {
      let formattedXml = xmlFormat(editor.getValue(), {
        indentation: '\t',
        collapseContent: true,
        lineSeparator: '\n'
      })
      editor.setValue(formattedXml)
    } catch (e) {
      // Diagnostics already show the precise location in the gutter; just notify.
      alert('Invalid XML')
    }
  }
  if (!oldResourceTextModified) {
    resourceTextFromFile.value = internalResourceText.value
    resourceTextModified.value = oldResourceTextModified
  }
}

const clearUrl = () => {
  internalResourceUrl.value = ''
  emit('update:resourceUrl', internalResourceUrl.value)
  resourceTextModified.value = false
  resourceTextFromFile.value = undefined
}

// Expose public methods (signature matches the legacy Ace-based component).
defineExpose({
  DownloadResource,
  navigateToPosition,
  navigateToContext,
  removeMarker,
  removeMarkers
})

// Lifecycle
onMounted(() => {
  initializeMonacoEditor()
})

onBeforeUnmount(() => {
  if (diagnosticsTimer) clearTimeout(diagnosticsTimer)
  decorationCollections.forEach(c => c.clear())
  decorationCollections.clear()
  const editor = monacoEditor.value
  if (editor) {
    const model = editor.getModel()
    if (model) monaco.editor.setModelMarkers(model, DIAGNOSTIC_OWNER, [])
    editor.dispose()
    monacoEditor.value = null
  }
})
</script>

<style scoped>
.monaco-editor-container {
  flex-grow: 1;
  width: 100%;
  height: 100%;
  min-height: 0;
  overflow: hidden;
}

.monaco-editor-container:focus-within + .monaco_editor_footer {
  color: #1976d2;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}
</style>

<style>
/* Unscoped styles for Monaco decoration classes (Monaco appends these to the
   editor DOM and they need to escape Vue's scoped style hashing). */
.debugSelection {
  background-color: #fbff82b1;
}

.resultSelection {
  background-color: #5240ef65;
}
</style>
