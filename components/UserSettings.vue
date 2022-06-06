<template>
  <span style="height 0;">
    <v-card elevation="4" class="v-card-lg" light>
      <v-card-title>User Settings</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            label="FHIR Server"
            v-model="fhirServerUrl"
            hide-details="auto"
          />
          <v-text-field
            label="FHIR Terminology Server"
            v-model="fhirTerminologyServerUrl"
            hide-details="auto"
          />
          <v-checkbox
            label="Show Advanced Properties"
            v-model="showAdvancedSettings"
            hide-details="auto"
          ></v-checkbox>
          <v-text-field
            label="Default Provider Field"
            v-model="defaultProviderField"
            hide-details="auto"
          />
          <v-text-field
            label="Default Canonical Base"
            hide-details="auto"
            v-model="defaultNewCanonicalBase"
          />
          <v-text-field
            label="List Page Size"
            hide-details="auto"
            v-model="pageSize"
          />
          <!-- <v-checkbox
            label="Sync Favourites"
            v-model="syncFavourites"
            hide-details="auto"
          />
          <v-text-field
            v-if="syncFavourites"
            label="Favourites List (resource ID)"
            v-model="favouritesListId"
            :readonly="true"
            hide-details="auto"
            clearable
          /> -->
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="readUserSettings">Undo</v-btn>
        <v-spacer />
        <v-btn @click="writeUserSettings">Save</v-btn>
        <v-btn @click="closeSettings">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </span>
</template>

<style scoped>
.v-card {
  width: min(80vw, 600px);
}
</style>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import { AxiosError } from "axios";
import { List } from "fhir/r4";
import {
  setFavourite,
  isFavourite,
  unsetFavourite,
} from "~/helpers/favourites";
import "~/helpers/user_settings";
import { settings, UserSettingsData } from "~/helpers/user_settings";

export default Vue.extend({
  mounted() {
    this.readUserSettings();
  },
  methods: {
    closeSettings() {
      this.$emit("close");
    },
    async readUserSettings() {
      console.log("read User Settings");
      const values = settings.load();
      console.log(values);

      this.fhirServerUrl = values.fhirServerUrl;
      this.fhirTerminologyServerUrl = values.fhirTerminologyServerUrl;
      this.syncFavourites = values.syncFavourites;
      this.favouritesListId = values.favouritesListId;
      this.defaultProviderField = values.defaultProviderField;
      this.defaultNewCanonicalBase = values.defaultNewCanonicalBase;
      this.showAdvancedSettings = values.showAdvancedSettings;
      this.pageSize = values.pageSize;
    },
    async writeUserSettings() {
      console.log("write User Settings");
      settings.save(this);
      const values = settings.load();
      console.log(values);
      this.closeSettings();
    },
  },
  data(): UserSettingsData {
    return {
      fhirServerUrl: undefined,
      fhirTerminologyServerUrl: undefined,
      syncFavourites: false,
      favouritesListId: undefined,
      defaultProviderField: undefined,
      defaultNewCanonicalBase: undefined,
      showAdvancedSettings: true,
      pageSize: 10,
    };
  },
});
</script>
