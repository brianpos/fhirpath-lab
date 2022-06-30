<template>
  <div :class="
    raw && raw.status === 'draft'
      ? 'draft-page-background'
      : raw && raw.status === 'active'
        ? 'active-page-background'
        : raw && raw.status === 'retired'
          ? 'retired-page-background'
          : ''
  ">
    <HeaderNavbar :favourites="isFavourite" :toggleFavourite="toggleFavourite" @close-settings="settingsClosed" />

    <div class="container-fluid bd-layout" style="padding-top: 60px">
      <br />

      <div v-if="!raw">
        Loading SubscriptionTopic/<span v-text="this.$route.params.id" />...
      </div>
      <v-card v-if="raw">
        <v-toolbar flat color="primary">
          <v-toolbar-title><span v-text="raw.title" /> (<span v-text="raw.status" />)<span v-if="raw.version">
              - {{ raw.version }}</span></v-toolbar-title>
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
              <conformance-resource-details-tab :raw="raw" :readonly="readonly"
                :showAdvancedSettings="showAdvancedSettings" @update="updateNow">
                <template v-slot:extension>
                  <br />
                  <div class="results">Search Details</div>
                  <v-text-field label="Type" :value="computedType()" hide-details="auto" readonly />
                  <!-- <v-text-field label="Target" v-model="raw.target" hide-details="auto" /> -->
                  <!-- <v-textarea label="Expression" v-model="raw.expression" hide-details="auto"
                    rows="3" auto-grow>
                    <template v-slot:append>
                      <v-btn icon small tile :href="testExpressionPath()"
                        title="Debug this expression with the fhirpath tester">
                        <v-icon> mdi-bug-outline </v-icon>
                      </v-btn>
                    </template>
                  </v-textarea> -->
                </template>
              </conformance-resource-details-tab>
            </v-tab-item>

            <v-tab-item>
              <!-- Publishing -->
              <conformance-resource-publishing-tab :raw="raw" :publishedVersions="publishedVersions"
                :readonly="readonly" :showAdvancedSettings="showAdvancedSettings" @update="updateNow" />
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-card>
      <br />
      <OperationOutcomeOverlay v-if="showOutcome" :saveOutcome="saveOutcome" :showOutcome="showOutcome"
        title="Error Saving" @close="clearOutcome" />
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
.v-window-item--active {
  overflow-y: auto;
  overflow-x: hidden;
  max-height: calc(100vh - 240px);
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
import { SubscriptionTopicData } from "../../models/SubscriptionTopicTableData";
import axios from "axios";
import { AxiosError } from "axios";
import { SubscriptionTopic } from "fhir/r4";
import { settings } from "~/helpers/user_settings";
import {
  loadCanonicalResource,
  loadPublishedVersions,
  requestFhirAcceptHeaders,
  saveFhirResource,
} from "~/helpers/searchFhir";
import {
  setFavourite,
  isFavourite,
  unsetFavourite,
} from "~/helpers/favourites";
import { DateTime } from "luxon";
import { BaseResource_defaultValues } from "~/models/BaseResourceTableData";

export default Vue.extend({
  mounted() {
    this.searchFhirServer();
  },
  methods: {
    computedType: function () {
      if (!this.raw)
        return 'argh';
      if (this.raw.target) return `${this.raw.type}(${this.raw.target})`;
      return this.raw.type;
    },
    testExpressionPath() {
      return `../FhirPath?exampletype=${this.raw?.base}&expression=${this.raw?.expression}`;
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
      document.title = "Subscription Topic:";
      const createNew = (): fhir4.SubscriptionTopic => {
        var newResource: fhir4.SubscriptionTopic = {
          resourceType: "SubscriptionTopic",
          status: "draft",
          version: "0.1",
          description: '',
          url: ''
        };
        const stgs = settings.load();
        newResource.publisher = stgs.defaultProviderField;
        const randomId = settings.createRandomID();
        newResource.title = "R" + randomId.replaceAll("-", "_");
        if (stgs.defaultNewCanonicalBase)
          newResource.url = `${stgs.defaultNewCanonicalBase}/SubscriptionTopic/${randomId}`;
        return newResource;
      };
      await loadCanonicalResource(
        settings.getFhirServerUrl(),
        this,
        this,
        "SubscriptionTopic",
        this.$route.params.id,
        createNew
      );
      if (this.raw) {
        this.isFavourite = isFavourite(this.raw.resourceType, this.raw.id);
        document.title = `Subscription Topic: ${this.raw.title}`;
      }
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
  data(): SubscriptionTopicData {
    return {
      testFilterValue: undefined,

      raw: null,
      publishedVersions: [],
      ...BaseResource_defaultValues,
    };
  },
});
</script>
