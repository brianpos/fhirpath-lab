<style scoped>
tr.ve-table-body-tr {
  cursor: pointer;
}

.tool-button {
  max-width: 10ch;
}
.progress-button {
  max-width: 25px;
}
.fl-toolbar {
  margin-bottom: 6px;
}
</style>

<template>
  <div>
    <HeaderNavbar @close-settings="settingsClosed" :extended="true">
      <template v-slot:extension>
        <search-navigator
          label="Subscription Topic"
          :count="totalCount"
          :enableFirst="!!firstPageLink"
          :enablePrevious="!!previousPageLink"
          :enableNext="!!nextPageLink"
          :enableLast="!!lastPageLink"
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
              @input="searchFhirServer"
              hide-details="auto"
            />
          </v-col>
          <v-col class="status-col">
            <v-select
              label="Status"
              :items="searchPublishingStatuses"
              v-model="searchForStatus"
              @input="searchFhirServer"
              hide-details="auto"
              clearable
            />
          </v-col>
          <v-col>
            <v-text-field
              label="Publisher"
              v-model="searchForPublisher"
              @input="searchFhirServer"
              hide-details="auto"
            />
          </v-col>
          <v-col class="tool-button">
            <v-btn small @click="clearSearchFields">Clear</v-btn>
          </v-col>
        </v-row>
      </v-form>
      <OperationOutcomeOverlay v-if="outcome" :saveOutcome="outcome" :showOutcome="(outcome != undefined)"
        title="Search Errors/Warnings" :popupWhenErrors="false" @close="outcome = undefined" />

      <v-data-table
        :headers="columns"
        :items="tableData"
        :event-custom-option="eventCustomOption"
        :expand-option="expandOption"
        row-key-field-name="id"
        :fixed-header="true"
        :items-per-page="-1"
        :disable-pagination="true"
        show-expand
        @row:click="navigateSelection"
        :expanded.sync="expanded"
      >
        <template v-slot:item.title="{ index, item }">
          <a @click="navigateSelection(item)">{{ item.title }}</a>
        </template>
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <conformance-resource-preview-row :row="item" />
          </td>
        </template>
        <template v-slot:item.favourite="{ index, item}">
          <FavIcon v-if="item.favourite"/>
        </template>
        <template slot="no-data">
          <div v-show="showEmpty && !loadingData" class="empty-data">
            (No results)
          </div>
        </template>
      </v-data-table> 
    </div>
    <table-loading v-if="loadingData" />
  </div>
</template>

<script lang="ts">
import Vue, { VNode } from "vue";
import {
  SubscriptionTopicTableDefinition,
  SubscriptionTopicTableData,
} from "../../models/SubscriptionTopicTableData";
import { formatDate } from "~/helpers/datetime";
import { getExtensionMarkdownValue } from "fhir-extension-helpers";
import { settings } from "~/helpers/user_settings";
import {
  searchPage,
  searchPublishingStatuses,
  toSearchDisplay_UseContext,
} from "~/helpers/searchFhir";
import {
  setFavourite,
  isFavourite,
  unsetFavourite,
} from "~/helpers/favourites";
import { ConformanceResourceTableData } from "~/models/ConformanceResourceTableData";
import { EasyTableDefinition_defaultValues } from "~/models/EasyTableDefinition";
import { ConformanceSearchData } from "models/ConformanceSearchData";

export default Vue.extend({
  head: {
    title: "Subscription Topic",
  },
  mounted() {
    this.showAdvancedSettings = settings.showAdvancedSettings();
    const searchData = settings.getSearchData("SubscriptionTopic");
    if (searchData) {
      this.searchForPublisher = searchData.publisher;
      this.searchForStatus = searchData.status;
      this.searchFor = searchData.name;
    }
    this.searchFhirServer();
  },
  methods: {
    settingsClosed() {
      this.showAdvancedSettings = settings.showAdvancedSettings();
    },
    clearSearchFields() {
      this.searchFor = undefined;
      this.searchForStatus = "active,draft";
      this.searchForPublisher = undefined;
      this.$forceUpdate();
      this.searchFhirServer();
    },

    async firstPage() {
      if (this.firstPageLink) {
        await this.searchPage(this.firstPageLink);
      }
    },
    async previousPage() {
      if (this.previousPageLink) {
        await this.searchPage(this.previousPageLink);
      }
    },
    async nextPage() {
      if (this.nextPageLink) {
        await this.searchPage(this.nextPageLink);
      }
    },
    async lastPage() {
      if (this.lastPageLink) {
        await this.searchPage(this.lastPageLink);
      }
    },
    async addNew() {
      this.$router.push("/SubscriptionTopic/:new");
    },

    async searchPage(url: string) {
      await searchPage(this, url, (entries) => {
        this.tableData = entries.map<SubscriptionTopicTableData>((post) => {
          var sp = post.resource as fhir4b.SubscriptionTopic;
          return {
            id: sp?.id ?? "",
            title: sp?.title ?? sp?.description ?? "(none)",
            url: sp?.url ?? "",
            version: sp?.version ?? "",
            date: formatDate(sp?.date, '', true),
            status: sp?.status ?? "(undefined)",
            useContext: toSearchDisplay_UseContext(sp?.useContext) ?? "",
            publisher: sp?.publisher ?? "",
            description: sp?.description,
            favourite: isFavourite(
              post.resource?.resourceType,
              post.resource?.id
            ),
          };
        });
      });
    },

    // https://www.sitepoint.com/fetching-data-third-party-api-vue-axios/
    async searchFhirServer() {
      let url = `${settings.getFhirServerUrl()}/SubscriptionTopic?_count=${settings.getPageSize()}&_elements=id,name,description,url,version,date,status,publisher,useContext,base`;
      if (this.searchFor) {
        url += `&title=${encodeURIComponent(this.searchFor)}`;
      }
      if (this.searchForStatus) {
        url += `&status=${encodeURIComponent(this.searchForStatus)}`;
      }
      if (this.searchForPublisher) {
        url += `&publisher=${encodeURIComponent(this.searchForPublisher)}`;
      }
      this.saveSearchData();
      await this.searchPage(url);
    },

    saveSearchData() {
      let searchData: ConformanceSearchData = {
        publisher: this.searchForPublisher,
        status: this.searchForStatus,
        name: this.searchFor,
      };
      settings.saveSearchData("SubscriptionTopic", searchData);
    },
    navigateSelection(data: SubscriptionTopicTableData, event: PointerEvent) {
      const selectedResourceId = data.id;
      if (event?.ctrlKey) {
        window.open("/SubscriptionTopic/" + selectedResourceId, '_blank');
      }
      else {
        this.$router.push("/SubscriptionTopic/" + selectedResourceId);
      }
    },
  },
  data(): SubscriptionTopicTableDefinition {
    return {
      eventCustomOption: {
        bodyRowEvents: ({ row, rowIndex }: any) => {
          return {
            click: (event: PointerEvent) => {
              console.log("click::", row, rowIndex, event);
              var data: SubscriptionTopicTableData = row;
              console.log("row data::", data);
              if (event.ctrlKey){
                window.open("/SubscriptionTopic/" + data.id, '_blank'); 
              }
              else{
                this.$router.push("/SubscriptionTopic/" + data.id);
              }
            },
            contextmenu: (event: PointerEvent) => {
              console.log("contextmenu::", row, rowIndex, event);
              event.preventDefault();
            },
          };
        },
      },
      expandOption: {
        trigger: "icon",
        render: (
          {
            row,
            column,
            rowIndex,
          }: { row: ConformanceResourceTableData; column: any; rowIndex: number },
          h: any
        ): any => {
          return h("ConformanceResourcePreviewRow", { row: row }) as VNode;
        },
      },
      columns: [
        { value: "title", key: "t", text: "Name", align: "start", type: "expand", sortable: false },
        { value: "version", key: "ver", text: "Version", align: "start", sortable: false },
        { value: "status", key: "status", text: "Status", align: "start", sortable: false },
//        { value: "useContext", key: "uc", text: "Use Context", align: "start" },
        { value: "date", key: "d", text: "Publish Date", align: "start", sortable: false },
        { value: "publisher", key: "pub", text: "Publisher", align: "start", sortable: false },
        { value: "base", key: "base", text: "Resource(s)", align: "start", sortable: false },
        { value: "id", key: "id", text: "ID", align: "start", sortable: false },
        { value: "favourite", key: "e", text: "", align: "center", sortable: false },
      ],
      tableData: [],
      outcome: undefined,
      searchFor: undefined,
      searchForStatus: undefined,
      searchForPublisher: undefined,
      searchPublishingStatuses: searchPublishingStatuses,
      ... EasyTableDefinition_defaultValues
    };
  },
});
</script>
