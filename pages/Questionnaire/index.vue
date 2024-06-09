<template>
  <div>
    <HeaderNavbar @close-settings="settingsClosed" :extended="true">
      <template v-slot:extension>
        <search-navigator
          label="Form Templates"
          :count="totalCount"
          :enableFirst="!!firstPageLink"
          :enablePrevious="!!previousPageLink"
          :enableNext="!!nextPageLink"
          :enableLast="!!lastPageLink"
          :first="firstPage"
          :previous="previousPage"
          :next="nextPage"
          :last="lastPage"
          :showAdd="false"
        />
      </template>
    </HeaderNavbar>

    <div class="container-fluid bd-layout" style="padding-top: 104px">
      <v-form class="fl-toolbar">
        <v-row class="search-row" no-gutters>
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
            <v-combobox
              label="Use Context"
              :items="searchUseContexts"
              v-model="searchForUseContext"
              @input="searchFhirServer"
              item-text="display"
              item-value="code"
              multiple
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

<style>
.ve-table-expand-td-content {
  padding: 0 0 0 20px !important;
}
</style>

<style scoped>
.search-row {
  align-items: flex-end;
  padding: 0 0px;
}
.search-row > .col {
  padding: 0 8px;
}
@media (max-width: 596px) {
  .search-row > .col {
    padding: 0 8px;
  }
  .search-row {
    flex-flow: column;
    padding: 0 0px;
  }
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

<script lang="ts">
import Vue, { VNode } from "vue";
import {
  QuestionnaireTableDefinition,
  QuestionnaireTableData,
} from "~/models/QuestionnaireTableData";
import axios from "axios";
import { AxiosError } from "axios";
import { Bundle, CodeableConcept, UsageContext } from "fhir/r4b";
import { formatDate } from "~/helpers/datetime";
import { getExtensionMarkdownValue } from "fhir-extension-helpers";
import {
  searchPage,
  toSearchDisplay_UseContext,
  searchPublishingStatuses,
} from "~/helpers/searchFhir";
import { isFavourite } from "~/helpers/favourites";
import { ConformanceResourceTableData } from "~/models/ConformanceResourceTableData";
import { settings } from "~/helpers/user_settings";
import { EasyTableDefinition_defaultValues } from "~/models/EasyTableDefinition";
import { ConformanceSearchData } from "models/ConformanceSearchData";
import { loadCustomUseContexts, mergeUseContexts, saveCustomUseContexts } from "~/helpers/useContext_helpers";
import ConformanceResourcePreviewRow from "~/components/ConformanceResourcePreviewRow.vue";

export default Vue.extend({
  // head: {
  //   title: "Questionnaire",
  // },
  mounted() {
    document.title = "Questionnaire";
    this.showAdvancedSettings = settings.showAdvancedSettings();
    const searchData = settings.getSearchData("Questionnaire");
    if (searchData) {
      this.searchForPublisher = searchData.publisher;
      this.searchForStatus = searchData.status;
      this.searchFor = searchData.name;
      this.searchForUseContext = searchData.useContext;
    }
    this.searchFhirServer();
    this.searchUseContexts = loadCustomUseContexts("questionnaire", this.defaultUseContexts!);
  },
  methods: {
    settingsClosed() {
      this.showAdvancedSettings = settings.showAdvancedSettings();
    },
    clearSearchFields() {
      this.searchFor = undefined;
      this.searchForStatus = "active,draft";
      this.searchForUseContext = [];
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

    async searchPage(url: string) {
      await searchPage(this, url, (entries) => {
        var updateRequired = false;
        this.tableData = entries.map<QuestionnaireTableData>((post) => {
          var vs = post.resource as fhir4b.Questionnaire;
          const mergeResult = mergeUseContexts(this.searchUseContexts, vs?.useContext);
          if (mergeResult.changed){
            this.searchUseContexts = mergeResult.contexts;
            updateRequired = true;
          }
          return {
            id: vs?.id ?? "",
            title: vs?.title ?? vs?.name ?? "(none)",
            url: vs?.url ?? "",
            version: vs?.version ?? "",
            date: formatDate(vs?.date, "", true),
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
        if (updateRequired) saveCustomUseContexts("questionnaire", this.searchUseContexts, this.defaultUseContexts!);
      });
    },

    // https://www.sitepoint.com/fetching-data-third-party-api-vue-axios/
    async searchFhirServer() {
      let url = `${settings.getFhirServerUrl()}/Questionnaire?_count=${settings.getPageSize()}&_elements=id,name,title,description,url,version,date,status,publisher,useContext`;
      if (this.searchFor) {
        url += `&title=${encodeURIComponent(this.searchFor)}`;
      }
      if (this.searchForStatus) {
        url += `&status=${encodeURIComponent(this.searchForStatus)}`;
      }
      if (this.searchForPublisher) {
        url += `&publisher=${encodeURIComponent(this.searchForPublisher)}`;
      }
      if (this.searchForUseContext) {
        const contexts = this.searchForUseContext
          .map((coding) => {
            return coding.code;
          })
          .join();
        if (contexts) url += `&context=${contexts}`;
      }
      this.saveSearchData();
      await this.searchPage(url);
    },

    saveSearchData() {
      let searchData: ConformanceSearchData = {
        publisher: this.searchForPublisher,
        status: this.searchForStatus,
        name: this.searchFor,
        useContext: this.searchForUseContext,
      };
      settings.saveSearchData("Questionnaire", searchData);
    },

    navigateSelection(data: QuestionnaireTableData, event: PointerEvent) {
      const selectedResourceId = settings.getFhirServerUrl() + '/Questionnaire/' + data.id;
      if (event?.ctrlKey){
        window.open("/Questionnaire/tester?id=" + selectedResourceId, '_blank'); 
      }
      else{
        this.$router.push("/Questionnaire/tester?id=" + selectedResourceId);
      }
    }
  },
  data(): QuestionnaireTableDefinition {
    return {
      eventCustomOption: {
        bodyRowEvents: ({ row, rowIndex }: any) => {
          return {
            click: (event: PointerEvent) => {
              console.log("click::", row, rowIndex, event);
              var data: QuestionnaireTableData = row;
              console.log("row data::", data);
              const selectedResourceId = settings.getFhirServerUrl() + '/Questionnaire/' + data.id;
              if (event.ctrlKey){
                window.open("/Questionnaire/tester?id=" + selectedResourceId, '_blank'); 
              }
              else{
                this.$router.push("/Questionnaire/tester?id=" + selectedResourceId);
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
        { value: "useContext", key: "uc", text: "Use Context", align: "start", sortable: false },
        { value: "date", key: "b", text: "Publish Date", align: "start", sortable: false },
        { value: "publisher", key: "d", text: "Publisher", align: "start", sortable: false },
        { value: "id", key: "id", text: "ID", align: "start", sortable: false },
        { value: "favourite", key: "e", text: "", align: "center", sortable: false },
      ],
      tableData: [],
      outcome: undefined,
      searchFor: undefined,
      searchForStatus: "active,draft",
      searchForUseContext: [],
      searchForPublisher: undefined,
      searchPublishingStatuses: searchPublishingStatuses,
      defaultUseContexts: [
        { code: "demo", display: "Demonstration" },
        { system: "http://fhir.forms-lab.com/CodeSystem/contexts", code: "devdays", display: "DevDays Demo" },
        { code: "extract", display: "Extract Demonstration" },
      ],
      searchUseContexts: [],
      ... EasyTableDefinition_defaultValues
    };
  },
});
</script>
