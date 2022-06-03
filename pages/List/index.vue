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
      <ve-table
        :columns="columns"
        :table-data="tableData"
        :event-custom-option="eventCustomOption"
      />
      <div v-show="showEmpty && !loadingData" class="empty-data">
        (No results)
      </div>
    </div>
    <table-loading v-if="loadingData" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { ListTableDefinition, ListTableData } from "../../models/ListTableData";
import axios from "axios";
import { AxiosError } from "axios";
import { Bundle } from "fhir/r4";
import { settings } from "~/helpers/user_settings";
import { searchPage } from "~/helpers/searchFhir";
import { formatDate } from "~/helpers/datetime";
import { EasyTableDefinition_defaultValues } from "~/models/EasyTableDefinition";

export default Vue.extend({
  head: {
    title: "List",
  },
  mounted() {
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
          var vs = post.resource as fhir4.List;
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
  },
  data(): ListTableDefinition {
    return {
      eventCustomOption: {
        bodyRowEvents: ({ row, rowIndex }: any) => {
          return {
            click: (event: any) => {
              console.log("click::", row, rowIndex, event);
              var data: ListTableData = row;
              console.log("row data::", data);
              this.$router.push("/List/" + data.id);
            },
            contextmenu: (event: any) => {
              console.log("contextmenu::", row, rowIndex, event);
              event.preventDefault();
            },
          };
        },
      },
      columns: [
        { field: "title", key: "a", title: "Name", align: "left" },
        { field: "version", key: "v", title: "Version", align: "left" },
        { field: "status", key: "c", title: "Status", align: "left" },
        { field: "date", key: "b", title: "Publish Date", align: "left" },
        { field: "publisher", key: "d", title: "Publisher", align: "left" },
        { field: "id", key: "id", title: "ID", align: "left" },
      ],
      tableData: [],
      ... EasyTableDefinition_defaultValues
    };
  },
});
</script>
