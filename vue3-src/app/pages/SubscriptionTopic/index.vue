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
    <HeaderNavbar :extended="true">
      <template v-slot:extension>
        <SearchNavigator
          label="Subscription Topic"
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
            <v-text-field label="Name" v-model="searchFor" @update:model-value="searchFhirServer" hide-details="auto" />
          </v-col>
          <v-col class="status-col">
            <v-select label="Status" :items="searchPublishingStatuses" v-model="searchForStatus"
              @update:model-value="searchFhirServer" hide-details="auto" clearable />
          </v-col>
          <v-col>
            <v-text-field label="Publisher" v-model="searchForPublisher" @update:model-value="searchFhirServer"
              hide-details="auto" />
          </v-col>
          <v-col class="tool-button">
            <v-btn size="small" @click="clearSearchFields">Clear</v-btn>
          </v-col>
        </v-row>
      </v-form>

      <OperationOutcomeOverlay v-if="host.outcome" :saveOutcome="host.outcome"
        :showOutcome="host.outcome != undefined" title="Search Errors/Warnings" :popupWhenErrors="false"
        @close="host.outcome = undefined" />

      <v-data-table
        :headers="columns"
        :items="host.tableData"
        item-value="id"
        :fixed-header="true"
        :items-per-page="-1"
        hide-default-footer
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
import type { SubscriptionTopic } from 'fhir/r4b'
import {
  searchPage as searchPageFn,
  searchPublishingStatuses,
  toSearchDisplay_UseContext,
} from '@legacy/helpers/searchFhir'
import { formatDate } from '@legacy/helpers/datetime'
import { settings } from '@legacy/helpers/user_settings'
import { isFavourite } from '@legacy/helpers/favourites'
import type {
  SubscriptionTopicTableData,
  SubscriptionTopicTableDefinition,
} from '@legacy/models/SubscriptionTopicTableData'
import type { ConformanceSearchData } from '@legacy/models/ConformanceSearchData'

useHead({ title: 'Subscription Topic' })

const router = useRouter()

const columns = [
  { title: '', key: 'data-table-expand', align: 'start' as const, sortable: false, width: '40px' },
  { title: 'Name', key: 'title', align: 'start' as const, sortable: false },
  { title: 'Version', key: 'version', align: 'start' as const, sortable: false },
  { title: 'Status', key: 'status', align: 'start' as const, sortable: false },
  { title: 'Publish Date', key: 'date', align: 'start' as const, sortable: false },
  { title: 'Publisher', key: 'publisher', align: 'start' as const, sortable: false },
  { title: 'ID', key: 'id', align: 'start' as const, sortable: false },
  { title: '', key: 'favourite', align: 'center' as const, sortable: false },
]

const searchFor = ref<string | undefined>(undefined)
const searchForStatus = ref<string | undefined>(undefined)
const searchForPublisher = ref<string | undefined>(undefined)
const expanded = ref<string[]>([])

const host = reactive<Partial<SubscriptionTopicTableDefinition> & {
  tableData: SubscriptionTopicTableData[]
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
  const searchData = settings.getSearchData('SubscriptionTopic')
  if (searchData) {
    searchForPublisher.value = searchData.publisher
    searchForStatus.value = searchData.status
    searchFor.value = searchData.name
  }
  searchFhirServer()
})

function clearSearchFields() {
  searchFor.value = undefined
  searchForStatus.value = 'active,draft'
  searchForPublisher.value = undefined
  searchFhirServer()
}

async function firstPage() { if (host.firstPageLink) await searchPage(host.firstPageLink) }
async function previousPage() { if (host.previousPageLink) await searchPage(host.previousPageLink) }
async function nextPage() { if (host.nextPageLink) await searchPage(host.nextPageLink) }
async function lastPage() { if (host.lastPageLink) await searchPage(host.lastPageLink) }

function addNew() { router.push('/SubscriptionTopic/:new') }

async function searchPage(url: string) {
  await searchPageFn(host as any, url, (entries) => {
    host.tableData = entries.map<SubscriptionTopicTableData>((post) => {
      const sp = post.resource as SubscriptionTopic
      return {
        id: sp?.id ?? '',
        title: sp?.title ?? sp?.description ?? '(none)',
        url: sp?.url ?? '',
        version: sp?.version ?? '',
        date: formatDate(sp?.date, '', true),
        status: sp?.status ?? '(undefined)',
        useContext: toSearchDisplay_UseContext(sp?.useContext) ?? '',
        publisher: sp?.publisher ?? '',
        description: sp?.description,
        favourite: isFavourite(post.resource?.resourceType, post.resource?.id),
      }
    })
  })
}

async function searchFhirServer() {
  let url = `${settings.getFhirServerUrl()}/SubscriptionTopic?_count=${settings.getPageSize()}&_elements=id,name,description,url,version,date,status,publisher,useContext,base`
  if (searchFor.value) url += `&title=${encodeURIComponent(searchFor.value)}`
  if (searchForStatus.value) url += `&status=${encodeURIComponent(searchForStatus.value)}`
  if (searchForPublisher.value) url += `&publisher=${encodeURIComponent(searchForPublisher.value)}`
  saveSearchData()
  await searchPage(url)
}

function saveSearchData() {
  const searchData: ConformanceSearchData = {
    publisher: searchForPublisher.value,
    status: searchForStatus.value,
    name: searchFor.value,
  }
  settings.saveSearchData('SubscriptionTopic', searchData)
}

function navigateSelection(data: SubscriptionTopicTableData, event?: PointerEvent | MouseEvent) {
  const id = data.id
  if (event && (event as PointerEvent).ctrlKey) {
    window.open('/SubscriptionTopic/' + id, '_blank')
  } else {
    router.push('/SubscriptionTopic/' + id)
  }
}

function onRowClick(event: PointerEvent, payload: { item: SubscriptionTopicTableData }) {
  navigateSelection(payload.item, event)
}
</script>
