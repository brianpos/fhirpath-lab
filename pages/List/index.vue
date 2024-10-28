<template>
  <div>
    <HeaderNavbar @close-settings="settingsClosed" :extended="true">
      <template v-slot:extension>
        <search-navigator
          label="List"
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
          :showAdd="true"
        />
      </template>
    </HeaderNavbar>

    <div class="container-fluid bd-layout" style="padding-top: 114px">
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
import Vue from "vue";
import { ListTableDefinition, ListTableData } from "../../models/ListTableData";
import axios from "axios";
import { AxiosError } from "axios";
import { Bundle } from "fhir/r4b";
import { settings } from "~/helpers/user_settings";
import { searchPage } from "~/helpers/searchFhir";
import { formatDate } from "~/helpers/datetime";
import { EasyTableDefinition_defaultValues } from "~/models/EasyTableDefinition";

export default Vue.extend({
  // head: {
  //   title: "List",
  // },
  mounted() {
    document.title = "List";
    this.showAdvancedSettings = settings.showAdvancedSettings();
    this.searchFhirServer();
  },
  methods: {
    settingsClosed() {
      this.showAdvancedSettings = settings.showAdvancedSettings();
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
      this.$router.push("/List/:new");
    },

    async searchPage(url: string) {
      await searchPage(this, url, (entries) => {
        this.tableData = entries.map<ListTableData>((post) => {
          var vs = post.resource as fhir4b.List;
          var td: ListTableData = {
            id: vs?.id ?? "",
            title: vs?.title ?? "(none)",
            url: vs?.subject?.display ?? vs?.subject?.reference ?? "",
            version: vs?.meta?.versionId ?? "",
            date: formatDate(vs?.date, "(none)"),
            status: vs?.status ?? "(undefined)",
            publisher: vs?.code?.text ?? "",
          };
          return td;
        });
      });
    },

    // https://www.sitepoint.com/fetching-data-third-party-api-vue-axios/
    async searchFhirServer() {
      const url = `${settings.getFhirServerUrl()}/List?_count=${settings.getPageSize()}&_summary=true`;
      await this.searchPage(url);
    },
    navigateSelection(data: ListTableData, event: PointerEvent) {
      const selectedResourceId = data.id;
      if (event?.ctrlKey) {
        window.open("/List/" + selectedResourceId, '_blank');
      }
      else {
        this.$router.push("/List/" + selectedResourceId);
      }
    },
  },
  data(): ListTableDefinition {
    return {
      eventCustomOption: {
        bodyRowEvents: ({ row, rowIndex }: any) => {
          return {
            click: (event: PointerEvent) => {
              console.log("click::", row, rowIndex, event);
              var data: ListTableData = row;
              console.log("row data::", data);
              if (event.ctrlKey){
                window.open("/List/" + data.id, '_blank'); 
              }
              else{
                this.$router.push("/List/" + data.id);
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
        { value: "title", key: "a", text: "Name", align: "start", sortable: false },
        { value: "version", key: "v", text: "Version", align: "start", sortable: false },
        { value: "status", key: "c", text: "Status", align: "start", sortable: false },
        { value: "date", key: "b", text: "Publish Date", align: "start", sortable: false },
        { value: "publisher", key: "d", text: "Publisher", align: "start", sortable: false },
        { value: "id", key: "id", text: "ID", align: "start", sortable: false },
      ],
      tableData: [],
      outcome: undefined,
      ... EasyTableDefinition_defaultValues
    };
  },
});
</script>
