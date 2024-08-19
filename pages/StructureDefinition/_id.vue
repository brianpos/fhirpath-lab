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
          <v-btn v-if="enableSave && !readonly" icon title="save">
            <v-icon @click="saveData" :disabled="saving">
              mdi-content-save
            </v-icon>
          </v-btn>
        </v-toolbar>

        <twin-pane-tab :tabs="tabDetails" @mounted="twinPaneMounted" ref="twinTabControl">
          <template v-slot:Details>
              <!-- Details -->
              <conformance-resource-details-tab :raw="raw" :readonly="readonly"
              :hideHeader="true" :showAdvancedSettings="showAdvancedSettings" @update="updateNow" />
          </template>

          <template v-slot:Publishing>
              <!-- Publishing -->
              <conformance-resource-publishing-tab :raw="raw" :publishedVersions="publishedVersions"
                :lockPublisher="false" :hideHeader="true"
                :readonly="readonly" :showAdvancedSettings="showAdvancedSettings" @update="updateNow" />
          </template>

          <template v-slot:Elements>
              <!-- Content -->
              <p v-if="!hasAnyNonStandardConstraints()">
                <v-simple-table>
                  <thead>
                    <tr>
                      <th>Path</th>
                      <th>Description & Constraints</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="path"></td>
                      <td>
                        <i>(No constraints defined in the differential)</i>
                      </td>
                    </tr>
                  </tbody>
                </v-simple-table>
              </p>

              <p v-if="hasAnyNonStandardConstraints()">
                <v-simple-table>
                  <thead>
                    <tr>
                      <th>Path</th>
                      <th>Description & Constraints</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-for="(element, index) in elements()">
                      <tr :key="index" v-if="hasNonStandardConstraint(element) && element.constraint">
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
          </template>

          <template v-slot:json>
            <resource-editor label="StructureDefinition ID" :resourceUrl="loadedUrl" :resourceText="JSON.stringify(raw, null, 2)" :readOnly="true" />
          </template>
        </twin-pane-tab>
      </v-card>
      <br />
      <OperationOutcomeOverlay v-if="showOutcome" :saveOutcome="saveOutcome" :showOutcome="showOutcome"
        title="Error Saving" @close="clearOutcome" />
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

td {
  vertical-align: top;
  height: unset !important;
  padding: 8px !important;
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
import { ElementDefinition, ElementDefinitionConstraint, StructureDefinition } from "fhir/r4b";
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
import TwinPaneTab from "~/components/TwinPaneTab.vue";
import ResourceEditor from "~/components/ResourceEditor.vue";

export default Vue.extend({
  components: { ResourceEditor },
  mounted() {
    if (this.$route.query.fhirserver){
      this.fhirServerUrl = this.$route.query.fhirserver as string;
    }
    this.searchFhirServer();
  },
  methods: {
    async twinPaneMounted(): Promise<void> {
      // set the tab pane into single pane mode
      let tabControl: TwinPaneTab = this.$refs.twinTabControl as TwinPaneTab;
      if (tabControl) {
        tabControl.setSinglePanelMode(true);
      }
    },
    elements(){
      return this.raw?.snapshot?.element || this.raw?.differential?.element || [];
    },
    testExpressionPath(element: ElementDefinition, constraint: ElementDefinitionConstraint):string {
      return `../FhirPath?exampletype=${this.raw?.type}&context=${encodeURIComponent(element.path??'')}&expression=${encodeURIComponent(constraint.expression ?? '')}`;
    },
    hasAnyNonStandardConstraints(): boolean {
      for (const element of this.elements()){
        if (this.hasNonStandardConstraint(element)) return true;
      }
      return false;
    },
    hasNonStandardConstraint(element: ElementDefinition) {
      if (!element.constraint) return false;
      for (let constraint of element.constraint) {
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
    cardinality(element: fhir4b.ElementDefinition): string {
      return `[${element.min ?? "?"}..${element.max ?? "?"}]`;
    },
    type(element: fhir4b.ElementDefinition): string {
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
      const createNew = (): fhir4b.StructureDefinition => {
        const stgs = settings.load();
        const randomId = settings.createRandomID();
        var newResource: fhir4b.StructureDefinition = {
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
        this.fhirServerUrl ?? settings.getFhirServerUrl(),
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
      const outcome = await saveFhirResource(this.fhirServerUrl ?? settings.getFhirServerUrl(), this);
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
      tabDetails: [
        {
          iconName: "mdi-card-bulleted-settings-outline",
          tabName: "Details",
          show: true,
          enabled: true,
        },
        {
          iconName: "mdi-download-network-outline",
          tabName: "Publishing",
          show: true,
          enabled: true,
        },
        {
          iconName: "mdi-file-tree",
          tabName: "Elements",
          title: "Show the elements from the snapshot, or definition that have constraints",
          show: true,
          enabled: true,
        },
        {
          iconName: "mdi-code-json",
          tabName: "json",
          show: true,
          enabled: true,
        }
      ],
      ...BaseResource_defaultValues,
    };
  },
});
</script>
