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

.empty-data {
  display: flex;
  align-items: center;
  justify-content: center;
  height: min(200px, 80vh);
  width: 100%;
  color: #666;
  font-size: 16px;
  border: 1px solid #eee;
  border-top: 0;
}
</style>

<template>
  <div>
    <HeaderNavbar @close-settings="settingsClosed" :extended="true">
      <template v-slot:extension>
        <search-navigator
          label="Search Paremeters"
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
      <ve-table
        :columns="columns"
        :table-data="tableData"
        :event-custom-option="eventCustomOption"
        :expand-option="expandOption"
        row-key-field-name="id"
      />
      <div v-show="showEmpty && !loadingData" class="empty-data">
        (No results)
      </div>
    </div>
    <table-loading v-if="loadingData" />
  </div>
</template>

<script lang="ts">
import Vue, { VNode } from "vue";
import {
  SearchParameterTableDefinition,
  SearchParameterTableData,
} from "../../models/SearchParameterTableData";
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

export default Vue.extend({
  head: {
    title: "Value Set",
  },
  mounted() {
    this.showAdvancedSettings = settings.showAdvancedSettings();
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
      this.$router.push("/SearchParameter/:new");
    },

    async searchPage(url: string) {
      await searchPage(this, url, (entries) => {
        this.tableData = entries.map<SearchParameterTableData>((post) => {
          var sp = post.resource as fhir4.SearchParameter;
          return {
            id: sp?.id ?? "",
            title: sp?.name ?? sp?.description ?? "(none)",
            url: sp?.url ?? "",
            version: sp?.version ?? "",
            date: formatDate(sp?.date, '', true),
            status: sp?.status ?? "(undefined)",
            useContext: toSearchDisplay_UseContext(sp?.useContext) ?? "",
            publisher: sp?.publisher ?? "",
            base: sp?.base ?? [],
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
      let url = `${settings.getFhirServerUrl()}/SearchParameter?_count=${settings.getPageSize()}&_elements=id,name,description,url,version,date,status,publisher,useContext,base`;
      if (this.searchFor) {
        url += `&title=${encodeURIComponent(this.searchFor)}`;
      }
      if (this.searchForStatus) {
        url += `&status=${encodeURIComponent(this.searchForStatus)}`;
      }
      if (this.searchForPublisher) {
        url += `&publisher=${encodeURIComponent(this.searchForPublisher)}`;
      }
      await this.searchPage(url);
    },
  },
  data(): SearchParameterTableDefinition {
    return {
      eventCustomOption: {
        bodyRowEvents: ({ row, rowIndex }: any) => {
          return {
            click: (event: any) => {
              console.log("click::", row, rowIndex, event);
              var data: SearchParameterTableData = row;
              console.log("row data::", data);
              this.$router.push("/SearchParameter/" + data.id);
            },
            contextmenu: (event: any) => {
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
        { field: "title", key: "a", title: "Name", align: "left", type: "expand" },
        { field: "version", key: "v", title: "Version", align: "left" },
        { field: "status", key: "c", title: "Status", align: "left" },
//        { field: "useContext", key: "uc", title: "Use Context", align: "left" },
        { field: "date", key: "b", title: "Publish Date", align: "left" },
        { field: "publisher", key: "d", title: "Publisher", align: "left" },
        { field: "base", key: "d", title: "Resource(s)", align: "left" },
        { field: "id", key: "id", title: "ID", align: "left" },
        {
          field: "favourite",
          key: "e",
          title: "",
          align: "center",
          renderBodyCell: (cellData: any, h: any) => {
            if ((cellData.row as ConformanceResourceTableData).favourite)
              return h("FavIcon") as VNode;
            return { text: "" } as VNode;
          },
        },
      ],
      tableData: [],
      searchFor: undefined,
      searchForStatus: undefined,
      searchForPublisher: undefined,
      searchPublishingStatuses: searchPublishingStatuses,
      ... EasyTableDefinition_defaultValues
    };
  },
});
</script>
