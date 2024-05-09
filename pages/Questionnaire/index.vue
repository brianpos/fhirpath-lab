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

export default Vue.extend({
  head: {
    title: "Questionnaire",
  },
  mounted() {
    this.showAdvancedSettings = settings.showAdvancedSettings();
    const searchData = settings.getSearchData("Questionnaire");
    if (searchData) {
      this.searchForPublisher = searchData.publisher;
      this.searchForStatus = searchData.status;
      this.searchFor = searchData.name;
      this.searchForUseContext = searchData.useContext;
    }
    this.searchFhirServer();
    this.checkCustomUseContexts();
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
          updateRequired =
            updateRequired || this.includeCustomUseContexts(vs?.useContext);
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
        if (updateRequired) this.updateCustomUseContexts();
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

    includeCustomUseContexts(contexts?: UsageContext[]): boolean {
      if (!contexts) return false;
      var result = false;
      var newCodings = this.searchUseContexts ?? [];
      for (let val of contexts) {
        if (!val.valueCodeableConcept || !val.valueCodeableConcept.coding)
          continue;

        for (let coding of val.valueCodeableConcept.coding) {
          if (
            this.searchUseContexts?.filter((value, index, array) => {
              if (value.system !== coding.system) return false;
              if (value.code !== coding.code) return false;
              return true;
            }).length === 0
          ) {
            // add this item to the orgTypes
            if (coding.code && coding.display) {
              let codingVal = {
                system: coding.system,
                code: coding.code,
                display: coding.display,
              };
              newCodings.push(codingVal);
              result = true;
              console.log(
                `New Usage Context: ${coding.system}|${coding.code} ${coding.display}`
              );
            }
          }
        }
      }
      if (result) this.searchUseContexts = newCodings;
      return result;
    },

    async checkCustomUseContexts() {
      // check local storage for other types
      const persistentOrgTypesStr = localStorage.getItem("use-contexts");
      if (!persistentOrgTypesStr) return;

      const persistentOrgTypes = JSON.parse(persistentOrgTypesStr) as {
        system?: string | undefined;
        code: string;
        display: string;
      }[];
      this.searchUseContexts = persistentOrgTypes;
    },

    async updateCustomUseContexts() {
      console.log("Updating custom Use Contexts list (based on content)");
      localStorage.setItem(
        "use-contexts",
        JSON.stringify(this.searchUseContexts)
      );
    },
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
      expandOption: {
        trigger: "icon",
        render: (
          {
            row,
            column,
            rowIndex,
          }: {
            row: ConformanceResourceTableData;
            column: any;
            rowIndex: number;
          },
          h: any
        ): any => {
          return h("ConformanceResourcePreviewRow", { row: row }) as VNode;
        },
      },
      columns: [
        {
          field: "title",
          key: "a",
          title: "Name",
          align: "left",
          type: "expand",
        },
        { field: "version", key: "v", title: "Version", align: "left" },
        { field: "status", key: "c", title: "Status", align: "left" },
        { field: "useContext", key: "uc", title: "Use Context", align: "left" },
        { field: "date", key: "b", title: "Publish Date", align: "left" },
        { field: "publisher", key: "d", title: "Publisher", align: "left" },
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
      outcome: undefined,
      searchFor: undefined,
      searchForStatus: "active,draft",
      searchForUseContext: [],
      searchForPublisher: undefined,
      searchPublishingStatuses: searchPublishingStatuses,
      searchUseContexts: [],
      ... EasyTableDefinition_defaultValues
    };
  },
});
</script>
