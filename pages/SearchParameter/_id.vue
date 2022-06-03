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
        Loading SearchParameter/<span v-text="this.$route.params.id" />...
      </div>
      <v-card v-if="raw">
        <v-toolbar flat color="primary">
          <v-toolbar-title
            ><span v-text="raw.title" /> (<span v-text="raw.status" />)<span
              v-if="raw.version"
            >
              - {{ raw.version }}</span
            ></v-toolbar-title
          >
          <v-spacer />
          <v-btn icon>
            <v-icon
              v-if="enableSave && !readonly"
              @click="saveData"
              :disabled="saving"
            >
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
          <v-tab>
            <v-icon left> mdi-file-tree </v-icon>
            Concepts
          </v-tab>
          <v-tab>
            <v-icon left> mdi-format-list-bulleted </v-icon>
            Expansion
          </v-tab>

          <v-tabs-items touchless v-model="tab">
            <v-tab-item>
              <!-- Details -->
              <conformance-resource-details-tab
                :raw="raw"
                :readonly="readonly"
                :showAdvancedSettings="showAdvancedSettings"
                @update="updateNow"
              />
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

            <v-tab-item>
              <!-- Content -->
              <v-card flat>
                <v-card-text>
                  <p class="fl-tab-header">Concepts</p>

                  <p v-if="raw.compose">
                    <v-checkbox
                      label="Include inactive codes"
                      v-model="raw.compose.inactive"
                      :readonly="readonly"
                      dense
                      hide-details="auto"
                      @click="updateNow"
                    />
                    <template v-if="raw.compose.include">
                      <template v-for="(include, index) in raw.compose.include">
                        <v-simple-table class="map-table" :key="index">
                          <thead>
                            <tr class="map-header">
                              <th colspan="2">
                                {{ include.system
                                }}<template v-if="include.version"
                                  >|{{ include.version }}</template
                                >
                              </th>
                            </tr>
                          </thead>
                          <tbody v-if="include.concept">
                            <tr class="vs-include">
                              <th colspan="2">Include Concepts</th>
                            </tr>
                            <template v-for="(v1, indexC) in include.concept">
                              <tr :key="indexC">
                                <td><code v-text="v1.code"></code></td>
                                <td v-text="v1.display"></td>
                              </tr>
                            </template>
                          </tbody>
                          <tbody v-if="include.filter">
                            <tr class="vs-include">
                              <th colspan="3">Filter</th>
                            </tr>
                            <template
                              v-for="(filter, indexC) in include.filter"
                            >
                              <tr :key="indexC">
                                <td><code v-text="filter.property"></code></td>
                                <td v-text="filter.op"></td>
                                <td v-text="filter.value"></td>
                              </tr>
                            </template>
                          </tbody>
                          <tbody v-if="include.SearchParameter">
                            <tr class="vs-include">
                              <th>Include SearchParameter(s)</th>
                            </tr>
                            <template
                              v-for="(filter, indexC) in include.SearchParameter"
                            >
                              <tr :key="indexC">
                                <td><code v-text="filter"></code></td>
                              </tr>
                            </template>
                          </tbody>
                        </v-simple-table>
                      </template>
                    </template>

                    <template v-if="raw.compose.exclude">
                      <template v-for="(exclude, index) in raw.compose.exclude">
                        <v-simple-table class="map-table" :key="index">
                          <thead>
                            <tr class="map-header">
                              <th colspan="2">
                                {{ exclude.system
                                }}<template v-if="exclude.version"
                                  >|{{ exclude.version }}</template
                                >
                              </th>
                            </tr>
                          </thead>
                          <tbody v-if="exclude.concept">
                            <tr class="vs-exclude">
                              <th colspan="2">Exclude Concepts</th>
                            </tr>
                            <template v-for="(v1, indexC) in exclude.concept">
                              <tr class="vs-exclude" :key="indexC">
                                <td>(<code v-text="v1.code"></code>)</td>
                                <td v-text="v1.display"></td>
                              </tr>
                            </template>
                          </tbody>
                          <tbody v-if="exclude.filter">
                            <tr class="vs-exclude">
                              <th colspan="3">Exclude Filter</th>
                            </tr>
                            <template
                              v-for="(filter, indexC) in exclude.filter"
                            >
                              <tr :key="indexC">
                                <td><code v-text="filter.property"></code></td>
                                <td v-text="filter.op"></td>
                                <td v-text="filter.value"></td>
                              </tr>
                            </template>
                          </tbody>
                          <tbody v-if="exclude.SearchParameter">
                            <tr class="vs-exclude">
                              <th>Exclude SearchParameter(s)</th>
                            </tr>
                            <template
                              v-for="(filter, indexC) in exclude.SearchParameter"
                            >
                              <tr :key="indexC">
                                <td><code v-text="filter"></code></td>
                              </tr>
                            </template>
                          </tbody>
                        </v-simple-table>
                      </template>
                    </template>
                  </p>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <!-- Expansion -->
              <v-card flat>
                <v-card-text>
                  <p class="fl-tab-header">
                    Expansion<template v-if="!raw.expansion">
                      - Test expand/filter</template
                    >
                  </p>
                  <div>
                    <v-text-field
                      label="Test Filter text (not stored)"
                      v-model="testFilterValue"
                      @input="performExpansion"
                    />
                    <template v-if="localExpansion">
                      Total:
                      <template
                        v-if="localExpansion.total && localExpansion.total > 40"
                        >40/</template
                      ><span v-text="localExpansion.total" />
                      <v-simple-table class="map-table">
                        <thead>
                          <tr class="map-header">
                            <th>code</th>
                            <th>display</th>
                            <th>system</th>
                          </tr>
                        </thead>
                        <tbody v-if="localExpansion.contains">
                          <template
                            v-for="(coding, index) in localExpansion.contains"
                          >
                            <tr :key="index">
                              <td><code v-text="coding.code"></code></td>
                              <td v-text="coding.display"></td>
                              <td v-text="coding.system"></td>
                            </tr>
                          </template>
                        </tbody>
                      </v-simple-table>
                      <!-- <pre
                        v-text="JSON.stringify(localExpansion, null, 2)"
                      ></pre> -->
                    </template>
                  </div>
                </v-card-text>
              </v-card>
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

<style scoped>
.v-window-item--active {
  overflow-y: auto;
  overflow-x: hidden;
  max-height: calc(100vh - 240px);
}
.map-table {
  margin-top: 12px;
}
.map-header > th {
  background-color: rgba(177, 156, 217, 0.25098);
}

.vs-include > th,
.vs-exclude > th {
  height: 28px !important;
}
.vs-exclude > td {
  font-style: italic;
}
</style>

<script lang="ts">
import Vue from "vue";
import { SearchParameterData } from "../../models/SearchParameterTableData";
import axios from "axios";
import { AxiosError } from "axios";
import { SearchParameter } from "fhir/r4";
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
      document.title = "Value Set:";
      const createNew = (): fhir4.SearchParameter => {
        var newResource: fhir4.SearchParameter = {
          resourceType: "SearchParameter",
          status: "draft",
          version: "0.1",
          base: [],
          code: '',
          description: '',
          name: '',
          type: 'string',
          url: ''
        };
        const stgs = settings.load();
        newResource.publisher = stgs.defaultProviderField;
        const randomId = settings.createRandomID();
        newResource.name = "R" + randomId.replaceAll("-", "_");
        if (stgs.defaultNewCanonicalBase)
          newResource.url = `${stgs.defaultNewCanonicalBase}/SearchParameter/${randomId}`;
        return newResource;
      };
      await loadCanonicalResource(
        settings.getFhirServerUrl(),
        this,
        this,
        "SearchParameter",
        this.$route.params.id,
        createNew
      );
      if (this.raw) {
        this.isFavourite = isFavourite(this.raw.resourceType, this.raw.id);
        document.title = `Search Parameter: ${this.raw.name}`;
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
  data(): SearchParameterData {
    return {
      testFilterValue: undefined,

      raw: null,
      publishedVersions: [],
      ...BaseResource_defaultValues,
    };
  },
});
</script>
