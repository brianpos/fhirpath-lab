<template>
  <div>
    <HeaderNavbar @close-settings="settingsClosed" />

    <div class="container-fluid bd-layout" style="padding-top: 60px">
      <br />

      <div v-if="!raw">
        Loading List/<span v-text="this.$route.params.id" />...
      </div>
      <v-card v-if="raw">
        <v-toolbar flat color="primary">
          <v-toolbar-title><span v-text="raw.title" /></v-toolbar-title>
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

          <v-tabs-items touchless v-model="tab">
            <v-tab-item>
              <!-- Details -->
              <v-card flat>
                <v-card-text>
                  <v-form v-if="raw">
                    <v-text-field
                      label="Title"
                      v-model="raw.title"
                      @input="updateNow"
                      hide-details="auto"
                      :disabled="readonly"
                    />
                    Status: <b><span v-text="raw.status" /></b> <br />
                    Mode: <b><span v-text="raw.mode" /></b> <br />
                    Date: <span v-text="formatDate(raw.date)" /> <br />
                    Source:
                    <span
                      v-if="raw.source"
                      v-text="
                        raw.source.display ||
                        raw.source.reference ||
                        raw.source.identifier
                      "
                    />
                    <br />
                    <template v-if="raw.subject">
                      Subject:
                      <span
                        v-text="
                          raw.subject.display ||
                          raw.subject.reference ||
                          raw.subject.identifier
                        "
                      />
                      <br />
                    </template>
                    Code:
                    <b
                      ><span
                        v-if="raw.code"
                        v-text="toSearchDisplay_CodeableConcept(raw.code)"
                    /></b>
                    <br />
                    <template v-if="raw.identifier"
                      >Identifiers: <span v-text="raw.identifier" /> <br
                    /></template>
                    <template v-if="raw.orderedBy">
                      Ordered By:
                      <b
                        ><span
                          v-text="
                            toSearchDisplay_CodeableConcept(raw.orderedBy)
                          "
                      /></b>
                    </template>
                    <template v-if="raw.emptyReason">
                      Empty Reason:
                      <b
                        ><span
                          v-text="
                            toSearchDisplay_CodeableConcept(raw.emptyReason)
                          "
                      /></b>
                    </template>

                    <v-simple-table>
                      <thead>
                        <tr>
                          <th>Type</th>
                          <th>Display</th>
                          <th>Status</th>
                          <th>Date</th>
                          <th>Reference</th>
                        </tr>
                      </thead>
                      <tbody v-if="raw.entry">
                        <template v-for="(entry, index) in raw.entry">
                          <tr
                            :key="index"
                            :class="entry.deleted ? 'deleted-entry' : ''"
                          >
                            <td>
                              {{ entry.item.type }}
                              <template v-if="entry.deleted">
                                (deleted)</template
                              >
                            </td>
                            <td v-text="entry.item.display"></td>
                            <td
                              v-text="
                                toSearchDisplay_CodeableConcept(entry.flag)
                              "
                            ></td>
                            <td v-text="formatDate(entry.date)"></td>
                            <td v-text="entry.item.reference"></td>
                          </tr>
                        </template>
                      </tbody>
                    </v-simple-table>
                  </v-form>
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
.deleted-entry > td {
  text-decoration: line-through;
  color: gray;
  font-style: italic;
}
.v-window-item--active {
  overflow-y: auto;
  overflow-x: hidden;
  min-height: 576px;
  max-height: calc(100vh - 240px);
}
</style>

<script lang="ts">
import Vue from "vue";
import { ListData } from "../../models/ListTableData";
import axios from "axios";
import { AxiosError } from "axios";
import { CodeableConcept, List } from "fhir/r4";
import { settings } from "~/helpers/user_settings";
import {
  loadFhirResource,
  saveFhirResource,
} from "~/helpers/searchFhir";
import { formatDate, parseDate } from "~/helpers/datetime";
import { toSearchDisplay_Coding } from "~/helpers/searchFhir";
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
    updateNow() {
      this.$forceUpdate();
      this.enableSave = true;
    },
    toSearchDisplay_CodeableConcept(
      data: CodeableConcept | undefined
    ): string | undefined {
      const codings = toSearchDisplay_Coding(data?.coding);
      if (data?.text) return `${data?.text} (${codings})`;
      return codings;
    },
    parseDate(value: string) {
      return parseDate(value);
    },
    formatDate(
      fhirDateTime: string | undefined,
      emptyMessage?: string
    ): string {
      return formatDate(fhirDateTime, emptyMessage);
    },
    // https://www.sitepoint.com/fetching-data-third-party-api-vue-axios/
    async searchFhirServer() {
      document.title = "List:";
      const createNew = (): fhir4.List => {
        var newResource: fhir4.List = {
          resourceType: "List",
          mode: "working",
          status: "current",
        };
        return newResource;
      };
      await loadFhirResource(
        settings.getFhirServerUrl(),
        this,
        "List",
        this.$route.params.id,
        createNew
      );
      if (this.raw) {
        document.title = `List: ${this.raw.title}`;
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
          }
        }
      }
    },
  },
  data(): ListData {
    return {
      raw: null,
      ...BaseResource_defaultValues,
    };
  },
});
</script>
