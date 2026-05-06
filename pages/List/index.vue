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
        :fixed-header="true"
        :items-per-page="-1"
        :disable-pagination="true"
        show-expand
        :expanded.sync="expanded"
      >
        <template v-slot:item.title="{ item }">
          <a :href="`/List/${item.id}`" class="cell-link" @click="onCellLinkClick($event, item)">{{ item.title }}</a>
        </template>
        <template v-slot:item.version="{ item }">
          <a :href="`/List/${item.id}`" class="cell-link" @click="onCellLinkClick($event, item)">{{ item.version }}</a>
        </template>
        <template v-slot:item.status="{ item }">
          <a :href="`/List/${item.id}`" class="cell-link" @click="onCellLinkClick($event, item)">{{ item.status }}</a>
        </template>
        <template v-slot:item.date="{ item }">
          <a :href="`/List/${item.id}`" class="cell-link" @click="onCellLinkClick($event, item)">{{ item.date }}</a>
        </template>
        <template v-slot:item.publisher="{ item }">
          <a :href="`/List/${item.id}`" class="cell-link" @click="onCellLinkClick($event, item)">{{ item.publisher }}</a>
        </template>
        <template v-slot:item.id="{ item }">
          <a :href="`/List/${item.id}`" class="cell-link" @click="onCellLinkClick($event, item)">{{ item.id }}</a>
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

<style scoped>
/* Cell-filling anchor: makes the whole table cell a real link
   so that long-press (mobile) and right-click (desktop) get the
   native browser "Open in new tab" menu, while normal clicks are
   still intercepted for SPA routing. */
.cell-link {
  display: flex;
  align-items: center;
  margin: 0 -16px;
  padding: 0 16px;
  min-height: 48px;
  color: inherit;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
}
.cell-link:hover {
  text-decoration: none;
}

/* In mobile/tile mode Vuetify lays each cell out as:
     td.v-data-table__mobile-row
       div.v-data-table__mobile-row__header   <-- the field label on the left
       div.v-data-table__mobile-row__cell     <-- our slot (anchor) on the right
   Stretch the anchor across the entire <td> so a tap/long-press anywhere
   on the row (header label included) hits the real <a href>. */
::v-deep td.v-data-table__mobile-row {
  position: relative;
}
::v-deep .v-data-table__mobile-row .cell-link {
  position: absolute;
  inset: 0;
  margin: 0;
  padding: 0 16px;
  justify-content: flex-end;
  text-align: right;
}
</style>

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
    /** Click handler for the cell-spanning anchors. Lets the browser handle
     *  modifier-clicks (Ctrl/⌘/Shift) and middle-click natively (so they
     *  open in a new tab/window via the real href), and intercepts plain
     *  left-clicks for SPA routing. Right-click and long-press never reach
     *  this handler — the browser shows its native context menu against the
     *  real <a href>. */
    onCellLinkClick(event: MouseEvent, data: ListTableData) {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.button === 1) {
        return; // let the browser handle modifier/middle clicks
      }
      event.preventDefault();
      this.$router.push("/List/" + data.id);
    },
  },
  data(): ListTableDefinition {
    return {
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
