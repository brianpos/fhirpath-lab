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
    <template v-if="raw && raw.id">
      <HeaderNavbar
        :favourites="isFavourite"
        :toggleFavourite="toggleFavourite"
        @close-settings="settingsClosed"
      />
    </template>
    <template v-else>
      <HeaderNavbar @close-settings="settingsClosed" />
    </template>

    <div class="container-fluid bd-layout" style="padding-top: 60px">
      <br />

      <div v-if="!raw">
        Loading Questionnaire/<span v-text="this.$route.params.id" />...
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
          <v-btn v-if="enableSave && !readonly" icon title="save">
            <v-icon
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
            Fields
          </v-tab>
          <v-tab v-show="showAdvancedSettings">
            <v-icon left> mdi-format-list-checks </v-icon>
            Validation Rules
          </v-tab>
          <v-tab v-show="showAdvancedSettings" title="Dynamic Enable When or Calculated Value">
            <v-icon left> mdi-arrow-decision </v-icon>
            Dynamic Behaviour
          </v-tab>
          <v-tab v-show="showAdvancedSettings">
            <v-icon left> mdi-tray-arrow-down </v-icon>
            Pre-Population
          </v-tab>
          <v-tab v-show="showAdvancedSettings">
            <v-icon left> mdi-application-variable-outline </v-icon>
            Variables
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
              <!-- Fields -->
              <v-card flat>
                <v-card-text>
                  <p class="fl-tab-header">Fields</p>
                  <EditorFieldsSection
                    v-if="raw"
                    v-bind:items="flatModel"
                    :readonly="readonly"
                    :showAdvancedSettings="showAdvancedSettings"
                  />
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <!-- Validation Rules -->
              <v-card flat>
                <v-card-text>
                  <p class="fl-tab-header">Validation Rules</p>
                  <EditorValidationsSection
                    v-if="raw"
                    v-bind:items="flatModel"
                  />
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <!-- Dynamic Behaviour -->
              <v-card flat>
                <v-card-text>
                  <p class="fl-tab-header">Dynamic Behaviour</p>
                  <EditorDynamicBehaviourSection
                    v-if="raw"
                    v-bind:items="flatModel"
                  />
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <!-- Pre-Population -->
              <v-card flat>
                <v-card-text>
                  <p class="fl-tab-header">Pre-Population</p>
                  <EditorPrePolulationSection
                    v-if="raw"
                    v-bind:items="flatModel"
                  />
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <!-- Variables -->
              <v-card flat>
                <v-card-text>
                  <p class="fl-tab-header">Variables</p>
                  <EditorVariablesSection
                    v-if="raw"
                    v-bind:questionnaire="raw"
                    v-bind:items="flatModel"
                  />
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
  min-height: 576px;
  max-height: calc(100vh - 240px);
}
</style>

<script lang="ts">
import Vue from "vue";
import {
  QuestionnaireData,
  FlattenedQuestionnaireItem,
  FlattenedQuestionnaireItems,
} from "~/models/QuestionnaireTableData";
import axios from "axios";
import { AxiosError } from "axios";
import { Questionnaire, Bundle } from "fhir/r4b";
import { settings } from "~/helpers/user_settings";
import { marked } from "marked";
import { formatDate, parseDate } from "~/helpers/datetime";
import {
  setFavourite,
  isFavourite,
  unsetFavourite,
} from "~/helpers/favourites";
import {
  loadCanonicalResource,
  loadPublishedVersions,
  requestFhirAcceptHeaders,
  saveFhirResource,
} from "~/helpers/searchFhir";
import { BaseResource_defaultValues } from "~/models/BaseResourceTableData";

// import "fhirclient";
// import { FHIR } from "fhirclient";
// import "LForms";
// import 'https://clinicaltables.nlm.nih.gov/lforms-versions/30.0.0-beta.1/webcomponent/assets/lib/zone.min.js';

// Sortable display test
// https://dev.to/andynoir/draggable-table-row-with-vuejs-vuetify-and-sortablejs-1o7l

export default Vue.extend({
  //   components: { fhirqItem },
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
    DeleteItem(item: FlattenedQuestionnaireItem) {
      if (item && this.raw && this.flatModel) {
        // delete this item from the parent
        let index: number = 0;
        if (item) index = this.flatModel.indexOf(item);
        this.flatModel.splice(index, 1);
        this.enableSave = true;
      }
    },
    AddItem(parentItem: any) {
      console.log("add new item");
      if (this.raw && this.flatModel) {
        var newItem: fhir4b.QuestionnaireItem = {
          linkId: settings.createRandomID(),
          type: "string",
        };
        if (!this.raw.item) this.raw.item = [];
        this.raw.item.push(newItem);
        let index: number = 0;
        if (parentItem) index = this.flatModel.indexOf(parentItem) + 1;
        if (index < 0) index = 0;
        this.flatModel.splice(index, 0, { item: newItem });
        this.enableSave = true;
      }
    },
    toggleFavourite() {
      this.isFavourite = !this.isFavourite;
      if (this.isFavourite && this.raw?.id)
        setFavourite(this.raw.resourceType, this.raw.id);
      if (!this.isFavourite && this.raw?.id)
        unsetFavourite(this.raw.resourceType, this.raw.id);
    },
    renderLForms() {
      console.log("rendering requested");
      this.$nextTick(() => {
        console.log("rendering on tic");
        console.log(this.$refs.formContainer);
        if (
          this.$refs.formContainer &&
          this.raw &&
          !this.formContainerElement
        ) {
          console.log("rendering");
          var options = { prepopulate: false };
          // LForms.Util.addFormToPage(this.raw, "formContainer", options);
          console.log("rendered");
          this.formContainerElement = true;
        }
      });
    },
    updateNow() {
      this.$forceUpdate();
      this.enableSave = true;
    },
    // https://www.sitepoint.com/fetching-data-third-party-api-vue-axios/
    async searchFhirServer() {
      document.title = "Questionnaire:";
      const createNew = (): fhir4b.Questionnaire => {
        var newResource: fhir4b.Questionnaire = {
          resourceType: "Questionnaire",
          status: "draft",
          version: "0.1",
        };
        const stgs = settings.load();
        newResource.publisher = stgs.defaultProviderField;
        const randomId = settings.createRandomID();
        newResource.name = "R" + randomId.replaceAll("-", "_");
        if (stgs.defaultNewCanonicalBase)
          newResource.url = `${stgs.defaultNewCanonicalBase}/Questionnaire/${randomId}`;
        return newResource;
      };
      await loadCanonicalResource(
        settings.getFhirServerUrl(),
        this,
        this,
        "Questionnaire",
        this.$route.params.id,
        createNew
      );
      if (this.raw) {
        this.isFavourite = isFavourite(this.raw.resourceType, this.raw.id);
        document.title = `Questionnaire: ${this.raw.title ?? this.raw.name}`;
        if (this.raw.text?.status === "generated") delete this.raw.text;
        this.flatModel = FlattenedQuestionnaireItems(this.raw);
        this.showAdvancedSettings = settings.showAdvancedSettings();

        // now that we have the URL for the instance - check for other published versions
        if (this.raw.url) {
          // Initialize the preview model
          var qr: fhir4b.QuestionnaireResponse = {
            resourceType: "QuestionnaireResponse",
            questionnaire: "Questionnaire/" + this.raw.url,
            status: "in-progress",
          };

          try {
            // var fhirContext = {
            //   fhir: FHIR.client({
            //     serverUrl: "https://sqlonfhir-r4.azurewebsites.net/fhir",
            //     tokenResponse: {
            //       patient:
            //         "https://sqlonfhir-r4.azurewebsites.net/fhir/Patient/example",
            //     },
            //   }),
            // };
            // LForms.Util.setFHIRContext(fhirContext.fhir);
          } catch {
            console.log("error setting the context");
          }
          var options = { prepopulate: false };
          console.log(this);
          // if (this.$refs.formContainer || this.formContainerElement) {
          //   LForms.Util.addFormToPage(
          //     this.raw,
          //     this.formContainerElement.id ?? "formContainer",
          //     options
          //   );
          //   this.formContainerElement = true;
          // }
        }
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

    /** Convert the parameter data into a HTML from markdown format */
    convertHtml(field: string | undefined): string {
      if (!field) return "";
      return marked(field);
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
  },
  data(): QuestionnaireData {
    return {
      flatModel: [],
      formContainerElement: undefined,
      selectedItem: undefined,

      raw: null,
      publishedVersions: [],
      ...BaseResource_defaultValues,
    };
  },
});
</script>
