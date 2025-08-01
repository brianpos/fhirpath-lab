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
      @keyup.enter="downloadResource"
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
    <div ref="aceEditorRef" class="ace-editor" style="flex-grow: 1; width: 100%; height: 100%;"></div>
    <div class="ace_editor_footer"></div>
    <label v-show="footerLabel"><i>{{ footerLabel }}</i></label>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, type Ref } from 'vue'
import ace from 'ace-builds'

// https://github.com/CarterLi/vue3-ace-editor/blob/gh-pages/demo-source/src/ace-config.ts
import themeChromeUrl from 'ace-builds/src-noconflict/theme-chrome?url';
ace.config.setModuleUrl('ace/theme/chrome', themeChromeUrl);

import modeTextUrl from 'ace-builds/src-noconflict/mode-text?url';
ace.config.setModuleUrl('ace/mode/text', modeTextUrl);

import modeJsonUrl from 'ace-builds/src-noconflict/mode-json?url';
ace.config.setModuleUrl('ace/mode/json', modeJsonUrl);
import workerJsonUrl from 'ace-builds/src-noconflict/worker-json?url';
ace.config.setModuleUrl('ace/mode/json_worker', workerJsonUrl);

import modeXmlUrl from 'ace-builds/src-noconflict/mode-xml?url';
ace.config.setModuleUrl('ace/mode/xml', modeXmlUrl);
import workerXmlUrl from 'ace-builds/src-noconflict/worker-xml?url';
ace.config.setModuleUrl('ace/mode/xml_worker', workerXmlUrl);

import 'ace-builds/src-noconflict/ext-language_tools';
ace.require("ace/ext/language_tools");

import axios, { type AxiosError, type CancelTokenSource } from 'axios'
import xmlFormat from 'xml-formatter'
import type { IJsonNodePosition } from '~/types/json-parser'
import { requestFhirAcceptHeaders, requestFhirAcceptXmlHeaders, CreateOperationOutcome } from '~/utils/fhir-rest'
import type { Resource, OperationOutcome } from 'fhir/r4'
import "ace-builds/src-noconflict/mode-json"
import "ace-builds/src-noconflict/mode-xml"

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
const resourceType = ref<string>('json') // Assume JSON by default
const downloadingInProgress = ref<boolean>(false)
const aceEditor: Ref<any> = ref(null)
const cancelSource = ref<CancelTokenSource | undefined>(undefined)
const resourceTextModified = ref<boolean>(false)

// Template refs
const aceEditorRef = ref<HTMLDivElement>()

// Public methods
const DownloadResource = async (url?: string) => {
  if (url) {
    internalResourceUrl.value = url
  }
  await downloadResource()
}

const navigateToPosition = (position: IJsonNodePosition) => {
  // Move the cursor in the resource editor to the position information
  aceEditor.value.clearSelection()
  aceEditor.value.focus()
  aceEditor.value.gotoLine(
    position.line,
    position.column,
    true
  )

  if (position.value_stop_pos) {
    let substr = internalResourceText.value.substring(position.prop_start_pos, position.value_stop_pos + 1)
    const lines = substr.split(/\r\n|\r|\n/)
    const endRowOffset = lines.length
    const endRow = position.line + endRowOffset - 1
    const lastLine = lines[endRowOffset - 1]
    const endCollOffset = lastLine ? lastLine.length : 0
    const endCol = position.column + (endCollOffset > 1 ? endCollOffset + 1 : endCollOffset)
    const range = new ace.Range(position.line - 1, position.column, endRow - 1, endCol)

    const selectionMarker = aceEditor.value.session.addMarker(range, "resultSelection", "fullLine", true)
    // after 1.5 seconds remove the highlight.
    setTimeout(() => {
      aceEditor.value?.session.removeMarker(selectionMarker)
    }, 1500)
  }
}

// Watch for prop changes
watch(() => props.resourceUrl, (newUrl: string) => {
  internalResourceUrl.value = newUrl
})

watch(() => props.resourceText, (newText: string) => {
  if (internalResourceText.value !== newText) {
    internalResourceText.value = newText
    aceEditor.value?.session.setValue(newText || '')
    detectResourceType()
  }
})

watch(internalResourceUrl, (newUrl: string) => {
  emit('update:resourceUrl', newUrl)
})

// Initialize Ace Editor
const initializeAceEditor = () => {
  if (aceEditorRef.value) {
    aceEditor.value = ace.edit(aceEditorRef.value, {
      wrap: "free",
      highlightActiveLine: false,
      showGutter: true,
      tabSize: props.tabSpaces,
      showPrintMargin: false,
      theme: "ace/theme/chrome",
      wrapBehavioursEnabled: true
    })
    
    aceEditor.value.getSession().setMode(`ace/mode/${resourceType.value}`)
    aceEditor.value.setValue(internalResourceText.value || '', -1)
    aceEditor.value.setReadOnly(props.readOnly)
    detectResourceType()

    // Watch for changes in the editor and update the internalResourceText
    aceEditor.value.getSession().on('change', () => {
      const currentText = aceEditor.value.getValue()
      if (currentText !== internalResourceText.value) {
        internalResourceText.value = currentText
        resourceTextModified.value = (resourceTextFromFile.value !== undefined && internalResourceText.value !== resourceTextFromFile.value)
        
        detectResourceType()
        emit('update:resourceText', internalResourceText.value)
      }
    })
  }
}

const detectResourceType = () => {
  const content = internalResourceText.value.trim()
  if (content.startsWith('<')) {
    if (resourceType.value !== 'xml') {
      resourceType.value = 'xml'
      aceEditor.value?.getSession().setMode('ace/mode/xml')
    }
  } else if (content.startsWith('///') || content.startsWith('map ')) {
    if (resourceType.value !== 'fml') {
      resourceType.value = 'fml'
      aceEditor.value?.getSession().setMode('ace/mode/text')
      // setCustomHighlightRules(aceEditor.value, FhirPathHightlighter_Rules)
    }
  } else {
    if (resourceType.value !== 'json') {
      resourceType.value = 'json'
      aceEditor.value?.getSession().setMode('ace/mode/json')
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

    // if trying to use the hl7 example servers, that should be over https
    if (
      url.startsWith("http://build.fhir.org/") ||
      url.startsWith("http://hl7.org/fhir/")
    ) {
      url = "https://" + url.substring(7)
    }

    // If this is trying to download a hl7 example, run it through the downloader proxy
    // as the HL7 servers don't have CORS for us
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
    
    // Use combined accept headers to support both JSON and XML
    let headers = {
      "Cache-Control": "no-cache",
      Accept: `${requestFhirAcceptHeaders}, ${requestFhirAcceptXmlHeaders}`,
    }
    
    const response = await axios.get<Resource | string>(url, {
      cancelToken: token,
      headers: headers,
      responseType: 'text', // Get as text first to handle both JSON and XML
    })
    
    if (token.reason) {
      console.log(token.reason)
      return
    }
    
    cancelSource.value = undefined
    downloadingInProgress.value = false

    const results = response.data
    if (results) {
      if (aceEditor.value) {
        let formattedContent = ''
        const contentType = response.headers['content-type'] || ''
        
        // Detect if the response is XML or JSON based on content type
        if (contentType.includes('xml') || (typeof results === 'string' && results.trim().startsWith('<'))) {
          // Handle XML response
          try {
            formattedContent = xmlFormat(results as string, {
              indentation: ' '.repeat(props.tabSpaces),
              collapseContent: true,
              lineSeparator: '\n'
            })
          } catch (e) {
            // If XML formatting fails, use the raw content
            formattedContent = results as string
          }
          resourceType.value = 'xml'
          aceEditor.value.getSession().setMode('ace/mode/xml')
        } else {
          // Handle JSON response
          try {
            const parsedJson = typeof results === 'string' ? JSON.parse(results) : results
            formattedContent = JSON.stringify(parsedJson, null, props.tabSpaces)
            resourceType.value = 'json'
            aceEditor.value.getSession().setMode('ace/mode/json')
          } catch (e) {
            // If JSON parsing fails, treat as plain text
            formattedContent = results as string
          }
        }
        
        resourceTextFromFile.value = formattedContent
        if (formattedContent) {
          aceEditor.value.setValue(formattedContent)
        }
        aceEditor.value.clearSelection()
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
  const oldResourceTextModified = resourceTextModified.value
  if (resourceType.value === 'json') {
    try {
      const parsedJson = JSON.parse(aceEditor.value.getValue())
      aceEditor.value.setValue(JSON.stringify(parsedJson, null, props.tabSpaces), -1)
      aceEditor.value.clearSelection()
      aceEditor.value.renderer.updateFull(true)
    } catch (e) {
      alert('Invalid JSON')
    }
  }
  if (resourceType.value === 'xml') {
    try {
      let formattedXml = xmlFormat(aceEditor.value.getValue(), {
        indentation: '\t', // Tab for indentation
        collapseContent: true, // Keep content in the same line as the element
        lineSeparator: '\n' // Use newline as line separator
      })
      aceEditor.value.setValue(formattedXml)
      aceEditor.value.clearSelection()
      aceEditor.value.renderer.updateFull(true)
    } catch (e) {
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

// Expose public methods
defineExpose({
  DownloadResource,
  navigateToPosition
})

// Lifecycle
onMounted(() => {
  initializeAceEditor()
  detectResourceType()
})
</script>

<style scoped>
.ace-editor {
  flex-grow: 1;
  width: 100%;
  height: 100%;
}

.ace_editor:focus-within+.ace_editor_footer {
  color: #1976d2;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}
</style>
