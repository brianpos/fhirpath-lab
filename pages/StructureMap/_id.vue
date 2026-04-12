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
        Loading StructureMap/<span v-text="this.$route.params.id" />...
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

          <template v-slot:Map>
              <!-- Content -->
              <resource-editor label="FML" :resourceText="rawMap" :readOnly="true" />
          </template>

          <template v-slot:Diagram>
              <!-- Diagram -->
              <div v-if="diagramSvg" v-html="diagramSvg" style="overflow: auto;"></div>
              <div v-else style="color: #999; font-style: italic;">No diagram available</div>
          </template>


          <template v-slot:Instance>
              <!-- Instance -->
              <div v-if="instanceSvg" v-html="instanceSvg" style="overflow: auto;"></div>
              <div v-else style="color: #999; font-style: italic;">No instance diagram available</div>
          </template>

          <template v-slot:json>
            <resource-editor label="StructureMap ID" :resourceUrl="loadedUrl" :resourceText="JSON.stringify(raw, null, tabSpaces())" :readOnly="true" />
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
import { StructureMapData } from "../../models/StructureMapTableData";
import axios from "axios";
import { AxiosError } from "axios";
import { ElementDefinition, ElementDefinitionConstraint, StructureMap } from "fhir/r4b";
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
import StructureMapUtilitiesRender from "~/helpers/structuremap_to_fml";
import { generateStructureMapDiagramSvg } from "~/helpers/structuremap_diagram";
import { generateInstanceDiagramSvg } from "~/helpers/structuremap_diagram_instance";
import TwinPaneTab from "~/components/TwinPaneTab.vue";
import ResourceEditor from "~/components/ResourceEditor.vue";
import fhirpath_r4_model from "fhirpath/fhir-context/r4";

export default Vue.extend({
  components: { ResourceEditor },
  mounted() {
    if (this.$route.query.fhirserver){
      this.fhirServerUrl = this.$route.query.fhirserver as string;
    }
    this.searchFhirServer();
  },
  methods: {
    tabSpaces: function() {
      return settings.getTabSpaces();
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
      document.title = "Structure Map:";
      const createNew = (): fhir4b.StructureMap => {
        const stgs = settings.load();
        const randomId = settings.createRandomID();
        var newResource: fhir4b.StructureMap = {
          resourceType: "StructureMap",
          status: "draft",
          version: "0.1",
          group: [],
          publisher: stgs.defaultProviderField,
          url: `${stgs.defaultNewCanonicalBase}/StructureMap/${randomId}`,
          name: "R" + randomId.replaceAll("-", "_"),
        };
        return newResource;
      };
      await loadCanonicalResource(
        this.fhirServerUrl ?? settings.getFhirServerUrl(),
        this,
        this,
        "StructureMap",
        this.$route.params.id,
        createNew
      );
      if (this.raw) {
        this.isFavourite = isFavourite(this.raw.resourceType, this.raw.id);
        document.title = `Structure Map: ${this.raw.title ?? this.raw.name }`;  

        this.rawMap = StructureMapUtilitiesRender.render(this.raw);
        this.diagramSvg = generateStructureMapDiagramSvg(this.raw);
        this.instanceSvg = generateInstanceDiagramSvg(this.raw, fhirpath_r4_model as any, true);
        // this.rawMap = JSON.stringify(this.raw, null, 2);
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
  data(): StructureMapData {
    return {
      raw: null,
      rawMap: null,
      diagramSvg: null as string | null,
      flowSvg: null as string | null,
      sankeySvg: null as string | null,
      instanceSvg: null as string | null,
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
          tabName: "Map",
          title: "FML representation of the StructureMap",
          show: true,
          enabled: true,
        },
        {
          iconName: "mdi-vector-polygon",
          tabName: "Diagram",
          title: "Visual diagram of group inputs, outputs and mapped properties",
          show: true,
          enabled: true,
        },
        {
          iconName: "mdi-file-document-outline",
          tabName: "Instance",
          title: "Instance-level view showing source/target objects with mapped and unmapped properties",
          show: true,
          enabled: true,
        },
        {
          iconName: "mdi-code-json",
          tabName: "json",
          show: true,
          enabled: true,
        },
      ],
      ...BaseResource_defaultValues,
    };
  },
});
</script>
