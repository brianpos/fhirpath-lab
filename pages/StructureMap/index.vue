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
        <search-navigator label="Structure Maps" :count="totalCount" :enableFirst="!!firstPageLink"
          :enablePrevious="!!previousPageLink" :enableNext="!!nextPageLink" :enableLast="!!lastPageLink"
          :first="firstPage" :previous="previousPage" :next="nextPage" :last="lastPage" :add="addNew"
          :showAdd="false" />
      </template>
    </HeaderNavbar>

    <div class="container-fluid bd-layout" style="padding-top: 114px">
      <v-form class="fl-toolbar">
        <v-row style="align-items: flex-end">
          <v-col>
            <v-text-field label="Name" v-model="searchFor" @input="searchFhirServer" hide-details="auto" />
          </v-col>
          <v-col class="status-col">
            <v-select label="Status" :items="searchPublishingStatuses" v-model="searchForStatus"
              @input="searchFhirServer" hide-details="auto" clearable />
          </v-col>
          <v-col>
            <v-text-field label="Publisher" v-model="searchForPublisher" @input="searchFhirServer"
              hide-details="auto" />
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
  StructureMapTableDefinition,
  StructureMapTableData,
} from "../../models/StructureMapTableData";
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
  // head: {
  //   title: "Structure Map",
  // },
  mounted() {
    this.showAdvancedSettings = settings.showAdvancedSettings();
    const searchData = settings.getSearchData("StructureMap");
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
      this.$router.push("/StructureMap/:new");
    },

    async searchPage(url: string) {
      await searchPage(this, url, (entries) => {
        this.tableData = entries.map<StructureMapTableData>((post) => {
          var vs = post.resource as fhir4b.StructureMap;
          return {
            id: vs?.id ?? "",
            title: vs?.title ?? vs?.name ?? vs?.description ?? "(none)",
            url: vs?.url ?? "",
            version: vs?.version ?? "",
            date: formatDate(vs?.date, '', true),
            status: vs?.status ?? "(undefined)",
            useContext: toSearchDisplay_UseContext(vs?.useContext) ?? "",
            publisher: vs?.publisher ?? "",
            description: vs?.description,
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
      let url = `${settings.getFhirServerUrl()}/StructureMap?_count=${settings.getPageSize()}&_elements=id,name,title,description,url,version,date,status,publisher,useContext`;
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
      settings.saveSearchData("StructureMap", searchData);
    },
    navigateSelection(data: StructureMapTableData, event: PointerEvent) {
      const selectedResourceId = data.id;
      if (event?.ctrlKey) {
        window.open("/StructureMap/" + selectedResourceId, '_blank');
      }
      else {
        this.$router.push("/StructureMap/" + selectedResourceId);
      }
    },
  },
  data(): StructureMapTableDefinition {
    return {
      eventCustomOption: {
        bodyRowEvents: ({ row, rowIndex }: any) => {
          return {
            click: (event: PointerEvent) => {
              console.log("click::", row, rowIndex, event);
              var data: StructureMapTableData = row;
              console.log("row data::", data);
              if (event.ctrlKey) {
                window.open("/StructureMap/" + data.id, '_blank');
              }
              else {
                this.$router.push("/StructureMap/" + data.id);
              }
            },
            contextmenu: (event: PointerEvent) => {
              console.log("contextmenu::", row, rowIndex, event);
              event.preventDefault();
            },
          };
        },
      },
      columns: [
        { value: "title", key: "a", text: "Name", align: "start", type: "expand", sortable: false },
        { value: "version", key: "v", text: "Version", align: "start", sortable: false },
        { value: "status", key: "c", text: "Status", align: "start", sortable: false },
        //        { value: "useContext", key: "uc", text: "Use Context", align: "start" },
        { value: "date", key: "b", text: "Publish Date", align: "start", sortable: false },
        { value: "publisher", key: "d", text: "Publisher", align: "start", sortable: false },
        { value: "type", key: "type", text: "Type", align: "start", sortable: false },
        { value: "id", key: "id", text: "ID", align: "start", sortable: false },
        { value: "favourite", key: "e", text: "", align: "center", sortable: false },
      ],
      tableData: [],
      outcome: undefined,
      searchFor: undefined,
      searchForStatus: undefined,
      searchForPublisher: undefined,
      searchPublishingStatuses: searchPublishingStatuses,
      searchUseContexts: [],
      ...EasyTableDefinition_defaultValues
    };
  },
});
</script>
