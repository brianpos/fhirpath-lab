<template>
  <div
    :class="
      raw && raw.status === 'draft'
        ? 'draft-page-background'
        : raw && raw.status === 'active'
        ? 'active-page-background'
        : raw && raw.status === 'retired'
        ? 'retired-page-background'
        : ''
    "
  >
    <HeaderNavbar
      :favourites="isFavourite"
      :toggleFavourite="toggleFavourite"
      @close-settings="settingsClosed"
    />

    <div class="container-fluid bd-layout" style="padding-top: 60px">
      <br />

      <div v-if="!raw">
        Loading Library/<span v-text="this.$route.params.id" />...
      </div>
      <v-card v-if="raw">
        <v-toolbar flat color="primary">
          <v-toolbar-title
            ><span v-text="raw.title" /> (<span
              v-text="raw.status"
            />)<span
              v-if="raw.version"
            >
              - {{ raw.version }}</span
            ></v-toolbar-title
          >
          <v-spacer />
          <v-btn icon>
            <v-icon v-if="enableSave && !readonly" @click="saveData" :disabled="saving">
              mdi-content-save
            </v-icon>
          </v-btn>
        </v-toolbar>
        <v-tabs vertical v-model="tab">
          <v-tab>
            <v-icon left> mdi-card-bulleted-settings-outline </v-icon>
            Details
          </v-tab>
          <v-tab>
            <v-icon left> mdi-download-network-outline </v-icon>
            Publishing
          </v-tab>

          <v-tabs-items touchless v-model="tab">
            <v-tab-item>
              <!-- Details -->
              <conformance-resource-details-tab
                :raw="raw"
                :readonly="readonly"
                :showAdvancedSettings="showAdvancedSettings"
                @update="updateNow"
              >
                <template v-slot:extension>
                  <br/>
                  <div class="results">Expression Details</div>
                  <p v-if="raw.type">
                    Type:
                    <ul v-if="raw.type.coding">
                    <li v-for="(item, index) in raw.type.coding" :key="index">
                      {{ (item.display || item.code) }}
                    </li>
                    </ul>
                  </p>

                  <p v-if="raw.content">
                    <template v-for="(v1,index) in raw.content">
                      <p :key="index">
                  <v-text-field label="Title" v-model="v1.title" hide-details="auto" />
                  <debuggable-fhir-path-expression :readonly="false"
                    label="Expression" :minLines="3" :href="testExpressionPath(v1.data)"
                    :value="convertExpression(v1.data)" @change="updateExpression(v1, $event.data)"/>
                      </p>
                    </template>
                  </p>
                </template> 
              </conformance-resource-details-tab>
            </v-tab-item>

            <v-tab-item>
              <!-- Publishing -->
              <conformance-resource-publishing-tab
                :raw="raw"
                :publishedVersions="publishedVersions"
                :readonly="readonly"
                :showAdvancedSettings="showAdvancedSettings"
                @update="updateNow"
              />
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-card>
      <br />
      <OperationOutcomeOverlay
        v-if="showOutcome"
        :saveOutcome="saveOutcome"
        :showOutcome="showOutcome"
        title="Error Saving"
        @close="clearOutcome"
      />
      <v-expansion-panels accordion>
        <v-expansion-panel>
          <v-expansion-panel-header>Raw JSON</v-expansion-panel-header>
          <v-expansion-panel-content>
            <code><pre v-text="JSON.stringify(raw, null, 2)" /></code>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <table-loading v-if="saving || !raw" />
  </div>
</template>

<style lang="scss" scoped>
ul {
  margin-left: 25px;
}
.data {
  word-break: break-all;
  display: block;
}
.results {
  padding: 4px 12px;
    background-color: $tab-backcolor;
    color: $tab-color;
    font-size: 0.875em;
    font-weight: 700;
    justify-content: stretch;
    text-transform: uppercase;
  line-height: 1.5;
}
</style>
<script lang="ts">
import Vue from "vue";
import { LibraryData } from "~/models/LibraryTableData";
import axios from "axios";
import { AxiosError } from "axios";
import { Library } from "fhir/r4";
import { settings } from "~/helpers/user_settings";
import {
  setFavourite,
  isFavourite,
  unsetFavourite,
} from "~/helpers/favourites";
import {
  loadCanonicalResource,
  loadPublishedVersions,
  saveFhirResource,
} from "~/helpers/searchFhir";
import { formatDate, parseDate } from "~/helpers/datetime";
import { marked } from "marked";
import ConformanceResourcePublishingTab from "~/components/ConformanceResourcePublishingTab.vue";
import { BaseResource_defaultValues } from "~/models/BaseResourceTableData";

export default Vue.extend({
  components: { ConformanceResourcePublishingTab },
  mounted() {
    this.searchFhirServer();
  },
  methods: {
    testExpressionPath(value: string):string {
      const expr = atob(value);
      return `../FhirPath?libaryId=${this.raw?.id}`;
    },
    convertExpression(value: string):string {
      return atob(value);
    },
    updateExpression(item: fhir4.Attachment, value: string) {
      item.data = btoa(value);
      this.updateNow();
    },
    settingsClosed() {
      this.showAdvancedSettings = settings.showAdvancedSettings();
    },
    clearOutcome() {
      this.showOutcome = undefined;
    },
    toggleFavourite() {
      this.isFavourite = !this.isFavourite;
      if (this.isFavourite && this.raw?.id)
        setFavourite(this.raw.resourceType, this.raw.id);
      if (!this.isFavourite && this.raw?.id)
        unsetFavourite(this.raw.resourceType, this.raw.id);
    },
    updateNow() {
      this.$forceUpdate();
      this.enableSave = true;
    },
    // https://www.sitepoint.com/fetching-data-third-party-api-vue-axios/
    async searchFhirServer() {
      document.title = "Library:";
      const createNew = (): fhir4.Library => {
        var newResource: fhir4.Library = {
          resourceType: "Library",
          status: "draft",
          version: "0.1",
          type: {},
        };
        const stgs = settings.load();
        newResource.publisher = stgs.defaultProviderField;
        const randomId = settings.createRandomID();
        newResource.name = "R" + randomId.replaceAll("-", "_");
        if (stgs.defaultNewCanonicalBase)
          newResource.url = `${stgs.defaultNewCanonicalBase}/Library/${randomId}`;
        return newResource;
      };
      await loadCanonicalResource(
        settings.getFhirServerUrl(),
        this,
        this,
        "Library",
        this.$route.params.id,
        createNew
      );
      if (this.raw) {
        this.isFavourite = isFavourite(this.raw.resourceType, this.raw.id);
        document.title = `Library: ${this.raw.title ?? this.raw.name}`;
      }
    },
    convertHtml(field: string | undefined): string {
      if (!field) return "";
      return marked(field);
    },
    formatDate(
      fhirDateTime: string | undefined,
      emptyMessage?: string
    ): string {
      return formatDate(fhirDateTime, emptyMessage);
    },
    async saveData() {
      const outcome = await saveFhirResource(settings.getFhirServerUrl(), this);
      if (!outcome) {
        if (this.raw?.id) {
          if (this.$route.params.id.endsWith(":new")) {
            let href = this.$route.fullPath.replaceAll(
              this.$route.params.id,
              this.raw?.id
            );
            window.history.pushState({}, "", href);

            // also update the publishing table
            const index = this.publishedVersions?.findIndex((pv) => {
              if (!pv.id) return true;
            });
            if (index) {
              this.publishedVersions?.splice(index, 1, this.raw);
            }
          }
        }
      }
    },
  },
  data(): LibraryData {
    return {
      raw: null,
      publishedVersions: [],
      ...BaseResource_defaultValues,
    };
  },
});
</script>
