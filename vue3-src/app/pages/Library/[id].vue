<template>
  <div :class="statusClass">
    <HeaderNavbar
      :favourites="favourite"
      :toggle-favourite="toggleFavourite"
      @close-settings="onSettingsClosed"
    />

    <div class="container-fluid bd-layout">
      <v-alert v-if="error" type="error" variant="outlined" closable @click:close="error = ''">
        {{ error }}
      </v-alert>

      <v-card v-if="library">
        <v-toolbar color="primary">
          <v-toolbar-title>
            {{ library.title || library.name || 'Library' }} ({{ library.status }})
            <span v-if="library.version"> - {{ library.version }}</span>
          </v-toolbar-title>
          <v-spacer />
          <v-btn
            v-if="primaryTestPath"
            icon
            :to="primaryTestPath"
            title="Open in tester"
          >
            <v-icon>mdi-bug-outline</v-icon>
          </v-btn>
          <v-btn
            v-if="canSave"
            icon
            title="Save Library"
            :loading="saving"
            :disabled="!dirty"
            @click="save"
          >
            <v-icon>mdi-content-save</v-icon>
          </v-btn>
        </v-toolbar>

        <TwinPaneTab :tabs="tabs">
          <template #Details>
            <ConformanceResourceDetailsTab
              :raw="library"
              :hide-header="true"
              :readonly="!canEdit"
              :show-advanced-settings="showAdvancedSettings"
              @update="dirty = true"
            >
              <template #extension>
                <div class="mt-4">
                  <strong>Library Type</strong>
                  <div v-for="(coding, index) in library.type?.coding" :key="index">
                    {{ coding.display || coding.code }}
                  </div>
                </div>
              </template>
            </ConformanceResourceDetailsTab>
          </template>

          <template #Content>
            <div class="tab-content">
              <v-card
                v-for="entry in logicEntries"
                :key="entry.index"
                variant="outlined"
                class="pa-3 mb-3"
              >
                <v-row dense align="end">
                  <v-col cols="4">
                    <v-select
                      v-model="entry.attachment.contentType"
                      :items="logicContentTypes"
                      label="Content Type"
                      :readonly="!canEdit"
                      hide-details="auto"
                      @update:model-value="contentChanged(entry)"
                    />
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="entry.attachment.title"
                      label="Title"
                      :readonly="!canEdit"
                      hide-details="auto"
                      @update:model-value="dirty = true"
                    />
                  </v-col>
                  <v-col cols="auto">
                    <v-btn
                      v-if="library.id"
                      :to="testPath(entry)"
                      size="small"
                      prepend-icon="mdi-bug-outline"
                    >
                      Test
                    </v-btn>
                    <v-btn
                      v-if="canEdit"
                      icon
                      variant="text"
                      title="Remove content"
                      @click="removeContent(entry.index)"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
                <v-textarea
                  v-model="entry.text"
                  label="Logic"
                  rows="10"
                  auto-grow
                  :readonly="!canEdit"
                  spellcheck="false"
                  @update:model-value="contentChanged(entry)"
                />
              </v-card>

              <v-btn
                v-if="canEdit"
                prepend-icon="mdi-plus"
                @click="addContent"
              >
                Add Logic Content
              </v-btn>

              <v-divider class="my-5" />
              <h4>Declared Parameters</h4>
              <v-table v-if="library.parameter?.length" density="compact">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Use</th>
                    <th>Type</th>
                    <th>Cardinality</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="parameter in library.parameter" :key="`${parameter.name}-${parameter.use}`">
                    <td>{{ parameter.name }}</td>
                    <td>{{ parameter.use }}</td>
                    <td>{{ parameter.type }}</td>
                    <td>{{ parameter.min }}..{{ parameter.max }}</td>
                  </tr>
                </tbody>
              </v-table>
              <div v-else class="text-medium-emphasis">No parameters declared.</div>
            </div>
          </template>

          <template #Publishing>
            <ConformanceResourcePublishingTab
              :raw="library"
              :published-versions="publishedVersions"
              :hide-header="true"
              :readonly="!canEdit"
              :show-advanced-settings="showAdvancedSettings"
              navigation-link-prefix="/Library/"
              :navigation-query="serverUrl"
              @update="dirty = true"
            />
          </template>

          <template #Raw_JSON>
            <ResourceEditor
              text-label="Library"
              :resource-text="JSON.stringify(library, null, tabSpaces)"
              :read-only="true"
              :tab-spaces="tabSpaces"
            />
          </template>
        </TwinPaneTab>
      </v-card>
      <TableLoading v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Attachment, Bundle, Library } from 'fhir/r4b'
import type { TabData } from '~/components/TwinPaneTab.vue'
import ConformanceResourceDetailsTab from '~/components/ConformanceResourceDetailsTab.vue'
import ConformanceResourcePublishingTab from '~/components/ConformanceResourcePublishingTab.vue'
import ResourceEditor from '~/components/ResourceEditor.vue'
import { settings } from '@legacy/helpers/user_settings'
import {
  decodeLibraryContent,
  encodeLibraryContent,
  isSupportedLogicContentType,
  supportedLogicContentTypes,
  testerPathForLibrary,
} from '@legacy/helpers/library_content'
import {
  isFavourite,
  setFavourite,
  unsetFavourite,
} from '@legacy/helpers/favourites'

useHead({ title: 'Library - FHIRPath Lab' })

interface LogicEntry {
  index: number
  attachment: Attachment
  text: string
}

const route = useRoute()
const router = useRouter()
const library = ref<Library | null>(null)
const publishedVersions = ref<Library[]>([])
const logicEntries = ref<LogicEntry[]>([])
const error = ref('')
const saving = ref(false)
const dirty = ref(false)
const favourite = ref(false)
const showAdvancedSettings = ref(settings.showAdvancedSettings())
const editAllowed = ref(false)
const serverUrl = ref('')
const tabSpaces = settings.getTabSpaces()
const logicContentTypes: string[] = [...supportedLogicContentTypes]

const tabs: TabData[] = [
  { iconName: 'mdi-card-bulleted-settings-outline', tabName: 'Details', show: true, enabled: true },
  { iconName: 'mdi-code-braces', tabName: 'Content', show: true, enabled: true },
  { iconName: 'mdi-download-network-outline', tabName: 'Publishing', show: true, enabled: true },
  { iconName: 'mdi-code-json', tabName: 'Raw JSON', show: true, enabled: true },
]

const canEdit = computed(() => !!library.value && editAllowed.value)
const canSave = computed(() => canEdit.value)
const sourceLibraryReference = computed(() =>
  library.value?.id ? `${serverUrl.value}/Library/${library.value.id}` : '',
)
const primaryTestPath = computed(() => {
  if (!library.value?.id) return undefined
  return testerPathForLibrary(
    sourceLibraryReference.value,
    logicEntries.value[0]?.attachment.contentType,
  )
})
const statusClass = computed(() => library.value ? `${library.value.status}-page-background` : '')

function createNewLibrary(): Library {
  const id = settings.createRandomID()
  const base = settings.getDefaultNewCanonicalBase()?.replace(/\/+$/, '')
  return {
    resourceType: 'Library',
    status: 'draft',
    name: `Logic_${id.replaceAll('-', '_')}`,
    title: 'New Logic Library',
    version: '0.1',
    publisher: settings.getDefaultProviderField(),
    url: base ? `${base}/Library/${id}` : undefined,
    type: {
      coding: [{
        system: 'http://terminology.hl7.org/CodeSystem/library-type',
        code: 'logic-library',
        display: 'Logic Library',
      }],
    },
    content: [{
      contentType: 'text/cql',
      data: encodeLibraryContent(''),
    }],
  }
}

function rebuildLogicEntries() {
  logicEntries.value = (library.value?.content ?? [])
    .map((attachment, index) => ({ attachment, index }))
    .filter(({ attachment }) => isSupportedLogicContentType(attachment.contentType))
    .map(({ attachment, index }) => ({
      attachment,
      index,
      text: attachment.data ? decodeLibraryContent(attachment.data) : '',
    }))
}

async function load() {
  const routeId = String(route.params.id)
  serverUrl.value = typeof route.query.fhirserver === 'string'
    ? route.query.fhirserver
    : settings.getFhirServerUrl()

  if (routeId === ':new') {
    library.value = createNewLibrary()
    dirty.value = true
    editAllowed.value = true
    rebuildLogicEntries()
    return
  }

  const draftCopy = routeId.endsWith(':new')
  const resourceId = draftCopy ? routeId.slice(0, -4) : routeId
  const response = await axios.get<Library>(`${serverUrl.value}/Library/${resourceId}`, {
    headers: { Accept: 'application/fhir+json, application/json' },
  })
  library.value = response.data
  if (draftCopy) {
    delete library.value.id
    delete library.value.meta
    library.value.status = 'draft'
    library.value.date = undefined
    dirty.value = true
  }
  const provider = settings.getDefaultProviderField()
  editAllowed.value = library.value.status === 'draft'
    && (!library.value.publisher || (!!provider && provider === library.value.publisher))
  rebuildLogicEntries()
  favourite.value = isFavourite('Library', response.data.id) ?? false
  if (response.data.url) {
    await loadPublishedVersions(response.data.url)
    if (draftCopy) library.value.version = nextDraftVersion(library.value.version)
  }
  useHead({ title: `Library: ${response.data.title || response.data.name || resourceId}` })
}

async function loadPublishedVersions(canonicalUrl: string) {
  const response = await axios.get<Bundle>(`${serverUrl.value}/Library`, {
    params: { url: canonicalUrl, _summary: true },
    headers: { Accept: 'application/fhir+json, application/json' },
  })
  publishedVersions.value = (response.data.entry ?? [])
    .map(entry => entry.resource)
    .filter((resource): resource is Library => resource?.resourceType === 'Library')
}

function nextDraftVersion(current?: string): string {
  const versions = new Set(publishedVersions.value.map(item => item.version).filter(Boolean))
  const parts = (current ?? '0.0').split('.')
  if (!parts.every(part => /^\d+$/.test(part))) {
    let candidate = `${current ?? '0.1'}-draft`
    let suffix = 2
    while (versions.has(candidate)) candidate = `${current ?? '0.1'}-draft${suffix++}`
    return candidate
  }

  const numeric = parts.map(Number)
  do {
    const lastIndex = numeric.length - 1
    numeric[lastIndex] = (numeric[lastIndex] ?? 0) + 1
  } while (versions.has(numeric.join('.')))
  return numeric.join('.')
}

function contentChanged(entry: LogicEntry) {
  entry.attachment.data = encodeLibraryContent(entry.text)
  dirty.value = true
}

function testPath(entry: LogicEntry) {
  return testerPathForLibrary(
    sourceLibraryReference.value,
    entry.attachment.contentType,
  )
}

function addContent() {
  if (!library.value) return
  const attachment: Attachment = {
    contentType: 'text/cql',
    data: encodeLibraryContent(''),
  }
  library.value.content = [...(library.value.content ?? []), attachment]
  rebuildLogicEntries()
  dirty.value = true
}

function removeContent(index: number) {
  if (!library.value?.content) return
  library.value.content.splice(index, 1)
  rebuildLogicEntries()
  dirty.value = true
}

async function save() {
  if (!library.value || !canSave.value) return
  saving.value = true
  error.value = ''
  try {
    const headers = {
      Accept: 'application/fhir+json',
      'Content-Type': 'application/fhir+json',
    }
    const response = library.value.id
      ? await axios.put<Library>(
          `${serverUrl.value}/Library/${library.value.id}`,
          library.value,
          { headers },
        )
      : await axios.post<Library>(`${serverUrl.value}/Library`, library.value, { headers })
    library.value = response.data
    rebuildLogicEntries()
    dirty.value = false
    const provider = settings.getDefaultProviderField()
    editAllowed.value = response.data.status === 'draft'
      && (!response.data.publisher || (!!provider && provider === response.data.publisher))
    if (response.data.id && String(route.params.id) !== response.data.id) {
      await router.replace({
        path: `/Library/${response.data.id}`,
        query: { fhirserver: serverUrl.value },
      })
    }
    if (response.data.url) await loadPublishedVersions(response.data.url)
  } catch (caught) {
    error.value = axios.isAxiosError(caught)
      ? caught.response?.data?.issue
          ?.map((issue: { details?: { text?: string }; diagnostics?: string }) =>
            issue.details?.text || issue.diagnostics,
          )
          .filter(Boolean)
          .join(', ') || caught.message
      : caught instanceof Error ? caught.message : 'Unable to save the Library.'
  } finally {
    saving.value = false
  }
}

function toggleFavourite() {
  if (!library.value?.id) return
  favourite.value = !favourite.value
  if (favourite.value) setFavourite('Library', library.value.id)
  else unsetFavourite('Library', library.value.id)
}

function onSettingsClosed() {
  showAdvancedSettings.value = settings.showAdvancedSettings()
}

onMounted(async () => {
  try {
    await load()
  } catch (caught) {
    error.value = axios.isAxiosError(caught)
      ? caught.response?.data?.issue?.[0]?.diagnostics || caught.message
      : caught instanceof Error ? caught.message : 'Unable to load the Library.'
  }
})
</script>

<style scoped>
.bd-layout {
  padding: 80px 16px 0;
}

.tab-content {
  overflow-y: auto;
  max-height: calc(100vh - 250px);
}

.draft-page-background {
  min-height: 100vh;
  background: #fffdf5;
}

.active-page-background {
  min-height: 100vh;
  background: #f8fff8;
}

.retired-page-background {
  min-height: 100vh;
  background: #fafafa;
}
</style>
