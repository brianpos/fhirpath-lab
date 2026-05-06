<style scoped>
tr.v-data-table__tr {
  cursor: pointer;
}

.tool-button {
  max-width: 10ch;
}

.fl-toolbar {
  margin-bottom: 6px;
}
</style>

<template>
  <div>
    <HeaderNavbar @close-settings="settingsClosed" :extended="true">
      <template v-slot:extension>
        <SearchNavigator
          label="Library"
          :count="host.totalCount"
          :enableFirst="!!host.firstPageLink"
          :enablePrevious="!!host.previousPageLink"
          :enableNext="!!host.nextPageLink"
          :enableLast="!!host.lastPageLink"
          :first="firstPage"
          :previous="previousPage"
          :next="nextPage"
          :last="lastPage"
          :add="addNew"
          :showAdd="false"
        />
      </template>
    </HeaderNavbar>

    <div class="container-fluid bd-layout" style="padding-top: 114px">
      <v-form class="fl-toolbar">
        <v-row style="align-items: flex-end">
          <v-col>
            <v-text-field
              label="Name"
              v-model="searchFor"
              @update:model-value="searchFhirServer"
              hide-details="auto"
              title="Name or fhirpath function(s)"
            />
          </v-col>
          <v-col class="status-col">
            <v-select
              label="Status"
              :items="searchPublishingStatuses"
              v-model="searchForStatus"
              @update:model-value="searchFhirServer"
              hide-details="auto"
              clearable
            />
          </v-col>
          <v-col>
            <v-combobox
              label="Use Context"
              :items="searchUseContexts"
              v-model="searchForUseContext"
              @update:model-value="searchFhirServer"
              item-title="display"
              item-value="code"
              multiple
              hide-details="auto"
              clearable
              return-object
            />
          </v-col>
          <v-col>
            <v-text-field
              label="Publisher"
              v-model="searchForPublisher"
              @update:model-value="searchFhirServer"
              hide-details="auto"
            />
          </v-col>
          <v-col class="tool-button">
            <v-btn size="small" @click="clearSearchFields">Clear</v-btn>
          </v-col>
        </v-row>
      </v-form>

      <OperationOutcomeOverlay
        v-if="host.outcome"
        :saveOutcome="host.outcome"
        :showOutcome="host.outcome != undefined"
        title="Search Errors/Warnings"
        :popupWhenErrors="false"
        @close="host.outcome = undefined"
      />

      <v-data-table
        :headers="columns"
        :items="host.tableData"
        item-value="id"
        :fixed-header="true"
        :items-per-page="-1"
        show-expand
        v-model:expanded="expanded"
        @click:row="onRowClick"
      >
        <template v-slot:item.title="{ item }">
          <a @click.stop="navigateSelection(item, $event)">{{ item.title }}</a>
        </template>
        <template v-slot:expanded-row="{ columns: cols, item }">
          <tr>
            <td :colspan="cols.length">
              <ConformanceResourcePreviewRow :row="item" />
            </td>
          </tr>
        </template>
        <template v-slot:item.favourite="{ item }">
          <FavIcon v-if="item.favourite" />
        </template>
        <template v-slot:no-data>
          <div v-if="host.showEmpty && !host.loadingData" class="empty-data">
            (No results)
          </div>
        </template>
      </v-data-table>
    </div>
    <TableLoading v-if="host.loadingData" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { Library } from 'fhir/r4b'
import {
  searchPage as searchPageFn,
  searchPublishingStatuses,
  toSearchDisplay_UseContext,
} from '@legacy/helpers/searchFhir'
import { formatDate } from '@legacy/helpers/datetime'
import { settings } from '@legacy/helpers/user_settings'
import { isFavourite } from '@legacy/helpers/favourites'
import {
  loadCustomUseContexts,
  mergeUseContexts,
  saveCustomUseContexts,
  type FhirpathLabUseContexts,
} from '@legacy/helpers/useContext_helpers'
import type {
  LibraryTableData,
  LibraryTableDefinition,
} from '@legacy/models/LibraryTableData'
import type { ConformanceSearchData } from '@legacy/models/ConformanceSearchData'

useHead({ title: 'Library' })

const router = useRouter()

const defaultUseContexts: FhirpathLabUseContexts[] = [
  { code: 'demo', display: 'Demonstration' },
  { system: 'http://fhir.forms-lab.com/CodeSystem/contexts', code: 'devdays', display: 'DevDays Demo' },
  { code: 'fhirpath-lab', display: 'FHIRPath Lab Shared' },
  { system: 'http://fhirpath-lab.com/CodeSystem/user-types', code: 'unit-test', display: 'HL7 Unit Test' },
]

const columns = [
  { title: 'Name', key: 'title', align: 'start' as const, sortable: false },
  { title: 'Version', key: 'version', align: 'start' as const, sortable: false },
  { title: 'Status', key: 'status', align: 'start' as const, sortable: false },
  { title: 'Use Context', key: 'useContext', align: 'start' as const, sortable: false },
  { title: 'Publish Date', key: 'date', align: 'start' as const, sortable: false },
  { title: 'Publisher', key: 'publisher', align: 'start' as const, sortable: false },
  { title: 'ID', key: 'id', align: 'start' as const, sortable: false },
  { title: '', key: 'favourite', align: 'center' as const, sortable: false },
]

const searchFor = ref<string | undefined>(undefined)
const searchForStatus = ref<string | undefined>('active,draft')
const searchForUseContext = ref<FhirpathLabUseContexts[]>([])
const searchForPublisher = ref<string | undefined>(undefined)
const searchUseContexts = ref<FhirpathLabUseContexts[]>([])
const expanded = ref<string[]>([])

const host = reactive<Partial<LibraryTableDefinition> & {
  tableData: LibraryTableData[]
  loadingData: boolean
  showEmpty: boolean
}>({
  tableData: [],
  outcome: undefined,
  totalCount: undefined,
  firstPageLink: '',
  previousPageLink: '',
  nextPageLink: '',
  lastPageLink: '',
  showEmpty: true,
  loadingData: true,
  cancelSource: undefined,
})

onMounted(() => {
  const searchData = settings.getSearchData('Library')
  if (searchData) {
    searchForPublisher.value = searchData.publisher
    searchForStatus.value = searchData.status
    searchFor.value = searchData.name
    searchForUseContext.value = (searchData.useContext as FhirpathLabUseContexts[]) ?? []
  }
  searchUseContexts.value = loadCustomUseContexts('library', defaultUseContexts)
  searchFhirServer()
})

function settingsClosed() {
  // Reserved for future advanced settings handling
}

function clearSearchFields() {
  searchFor.value = undefined
  searchForStatus.value = 'active,draft'
  searchForUseContext.value = []
  searchForPublisher.value = undefined
  searchFhirServer()
}

async function firstPage() { if (host.firstPageLink) await searchPage(host.firstPageLink) }
async function previousPage() { if (host.previousPageLink) await searchPage(host.previousPageLink) }
async function nextPage() { if (host.nextPageLink) await searchPage(host.nextPageLink) }
async function lastPage() { if (host.lastPageLink) await searchPage(host.lastPageLink) }

function addNew() { router.push('/Library/:new') }

async function searchPage(url: string) {
  await searchPageFn(host as any, url, (entries) => {
    let updateRequired = false
    host.tableData = entries.map<LibraryTableData>((post) => {
      const vs = post.resource as Library
      const mergeResult = mergeUseContexts(searchUseContexts.value, vs?.useContext)
      if (mergeResult.changed) {
        searchUseContexts.value = mergeResult.contexts
        updateRequired = true
      }
      let fhirpathExpression: string | undefined = undefined
      if (
        vs.content && vs.content.length > 0 &&
        vs.content[0].contentType === 'text/fhirpath' && vs.content[0].data
      ) {
        try {
          fhirpathExpression = atob(vs.content[0].data)
        } catch {
          console.log("can't parse ", vs.content[0].data)
        }
      }
      return {
        id: vs?.id ?? '',
        title: vs?.title ?? vs?.name ?? vs?.description ?? '(none)',
        url: vs?.url ?? '',
        version: vs?.version ?? '',
        date: formatDate(vs?.date, '', true),
        status: vs?.status ?? '(undefined)',
        useContext: toSearchDisplay_UseContext(vs?.useContext) ?? '',
        publisher: vs?.publisher ?? '',
        description: vs?.description,
        favourite: isFavourite(post.resource?.resourceType, post.resource?.id),
        extendedDescription: fhirpathExpression,
      }
    })
    if (updateRequired) saveCustomUseContexts('library', searchUseContexts.value, defaultUseContexts)
  })
}

async function searchFhirServer() {
  let url = `${settings.getFhirServerUrl()}/Library?_count=${settings.getPageSize()}&_elements=id,name,title,description,url,version,date,status,publisher,useContext,content&content-type=text/fhirpath`
  if (searchFor.value) url += `&title=${encodeURIComponent(searchFor.value)}`
  if (searchForStatus.value) url += `&status=${encodeURIComponent(searchForStatus.value)}`
  if (searchForPublisher.value) url += `&publisher=${encodeURIComponent(searchForPublisher.value)}`
  if (searchForUseContext.value && searchForUseContext.value.length > 0) {
    const contexts = searchForUseContext.value.map((c) => c.code).join()
    if (contexts) url += `&context=${contexts}`
  }
  saveSearchData()
  await searchPage(url)
}

function saveSearchData() {
  const searchData: ConformanceSearchData = {
    publisher: searchForPublisher.value,
    status: searchForStatus.value,
    name: searchFor.value,
    useContext: searchForUseContext.value,
  }
  settings.saveSearchData('Library', searchData)
}

function navigateSelection(data: LibraryTableData, event?: PointerEvent | MouseEvent) {
  const id = data.id
  if (event && (event as PointerEvent).ctrlKey) {
    window.open('/Library/' + id, '_blank')
  } else {
    router.push('/Library/' + id)
  }
}

function onRowClick(event: PointerEvent, payload: { item: LibraryTableData }) {
  navigateSelection(payload.item, event)
}
</script>
