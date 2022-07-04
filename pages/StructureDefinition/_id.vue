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
        Loading StructureDefinition/<span v-text="this.$route.params.id" />...
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
          <v-tab>
            <v-icon left> mdi-file-tree </v-icon>
            Elements
          </v-tab>

          <v-tabs-items touchless v-model="tab">
            <v-tab-item>
              <!-- Details -->
              <conformance-resource-details-tab :raw="raw" :readonly="readonly"
                :showAdvancedSettings="showAdvancedSettings" @update="updateNow" />
            </v-tab-item>

            <v-tab-item>
              <!-- Publishing -->
              <conformance-resource-publishing-tab :raw="raw" :publishedVersions="publishedVersions"
                :readonly="readonly" :showAdvancedSettings="showAdvancedSettings" @update="updateNow" />
            </v-tab-item>

            <v-tab-item>
              <!-- Content -->
              <v-card flat>
                <v-card-text>
                  <p class="fl-tab-header">Elements</p>

                  <p v-if="raw.differential && raw.differential.element">
                    <v-simple-table>
                      <thead>
                        <tr>
                          <th>Path</th>
                          <th>Description & Constraints</th>
                        </tr>
                      </thead>
                      <tbody>
                        <template v-for="(element, index) in elements()">
                          <tr :key="index" v-if="hasNonStandardConstraint(element)">
                            <td class="path" v-text="element.path"></td>
                            <td>
                              {{ element.definition }}
                              <template v-for="(constraint, indexConstraint) in element.constraint">
                                <div :key="indexConstraint" v-if="!isStandardConstraint(constraint)">
                                  <b>{{ constraint.key }}</b> {{ constraint.human }}<br />
                                  <debuggable-fhir-path-expression
                                    :readonly="true" :href="testExpressionPath(element, constraint)"
                                    label="Expression" :minLines="2"
                                    :value="constraint.expression" />
                                </div>
                              </template>
                            </td>
                          </tr>
                        </template>
                      </tbody>
                    </v-simple-table>
                  </p>
                </v-card-text>
              </v-card>
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

<style scoped>
.v-window-item--active {
  overflow-y: auto;
  overflow-x: hidden;
  max-height: calc(100vh - 240px);
}

td.path {
  word-break: break-word;
}
</style>

<script lang="ts">
import Vue from "vue";
import { StructureDefinitionData } from "../../models/StructureDefinitionTableData";
import axios from "axios";
import { AxiosError } from "axios";
import { ElementDefinition, ElementDefinitionConstraint, StructureDefinition } from "fhir/r4";
import {
  loadCanonicalResource,
  loadPublishedVersions,
  saveFhirResource,
} from "~/helpers/searchFhir";
import { settings } from "~/helpers/user_settings";
import {
  setFavourite,
  isFavourite,
  unsetFavourite,
} from "~/helpers/favourites";
import { BaseResource_defaultValues } from "~/models/BaseResourceTableData";

export default Vue.extend({
  mounted() {
    this.searchFhirServer();
  },
  methods: {
    elements(){
      return this.raw?.snapshot?.element || this.raw?.differential?.element || [];
    },
    testExpressionPath(element: ElementDefinition, constraint: ElementDefinitionConstraint):string {
      return `../FhirPath?exampletype=${this.raw?.type}&context=${encodeURIComponent(element.path??'')}&expression=${encodeURIComponent(constraint.expression ?? '')}`;
    },
    hasNonStandardConstraint(element: ElementDefinition) {
      if (!element.constraint) return false;
      for (var constraint of element.constraint) {
        if (!this.isStandardConstraint(constraint)) return true;
      }
      return false;
    },
    isStandardConstraint(constraint: ElementDefinitionConstraint) {
      if (constraint.key == 'ele-1') return true;
      if (constraint.key == 'ext-1') return true;
      if (constraint.key == 'dom-2') return true;
      if (constraint.key == 'dom-3') return true;
      if (constraint.key == 'dom-4') return true;
      if (constraint.key == 'dom-5') return true;
      if (constraint.key == 'dom-6') return true;
      return false;
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
    cardinality(element: fhir4.ElementDefinition): string {
      return `[${element.min ?? "?"}..${element.max ?? "?"}]`;
    },
    type(element: fhir4.ElementDefinition): string {
      if (!element.type) return "";
      return element.type
        .map((e) => {
          return e.code;
        })
        .join(",");
    },
    // https://www.sitepoint.com/fetching-data-third-party-api-vue-axios/
    async searchFhirServer() {
      document.title = "Structure Definition:";
      const createNew = (): fhir4.StructureDefinition => {
        const stgs = settings.load();
        const randomId = settings.createRandomID();
        var newResource: fhir4.StructureDefinition = {
          resourceType: "StructureDefinition",
          status: "draft",
          version: "0.1",
          abstract: false,
          kind: "logical",
          type: "",
          publisher: stgs.defaultProviderField,
          url: `${stgs.defaultNewCanonicalBase}/StructureDefinition/${randomId}`,
          name: "R" + randomId.replaceAll("-", "_"),
        };
        return newResource;
      };
      await loadCanonicalResource(
        settings.getFhirServerUrl(),
        this,
        this,
        "StructureDefinition",
        this.$route.params.id,
        createNew
      );
      if (this.raw) {
        this.isFavourite = isFavourite(this.raw.resourceType, this.raw.id);
        document.title = `Structure Definition: ${this.raw.title ?? this.raw.name
          }`;
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
  data(): StructureDefinitionData {
    return {
      raw: null,
      publishedVersions: [],
      ...BaseResource_defaultValues,
    };
  },
});
</script>
