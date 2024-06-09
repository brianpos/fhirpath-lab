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
            :error-messages="FhirServerErrorMessage" @input="clearFhirServerCheckStatus"
            :loading="loadingFhirServerAuthData" loader-height="4"
          >
            <template v-slot:append>
              <v-btn icon small tile 
                v-if="!FhirServerVerified"
                @click="checkFhirServerSmartAuthCapabilities" title="Verify FHIR Server Capabilities">
                <v-icon> mdi-help-circle-outline </v-icon>
              </v-btn>
              <v-icon color="green" title="Secure Server with SMART Authentication"
              v-if="FhirServerVerified && FhirServerSupportsSmartAuth"> mdi-lock-outline </v-icon>
              <v-icon color="green" title="Open Server with no SMART Authentication"
              v-if="FhirServerVerified && !FhirServerSupportsSmartAuth"
              > mdi-lock-open-variant-outline </v-icon>
            </template>
          </v-text-field>
          <v-text-field
          v-if="FhirServerSupportsSmartAuth || OAuthClientId"
            :class="(FhirServerSupportsSmartAuth ? '' : 'fp-amber')"
            :messages="(FhirServerSupportsSmartAuth ? '' : 'Server does not support OAuth, remove the Client ID')"
            label="FHIR Server OAuth Client ID"
            v-model="OAuthClientId"
            hide-details="auto"
            :clearable="!FhirServerSupportsSmartAuth"
          />
          <v-text-field
            label="FHIR Server for Examples"
            v-model="fhirServerExamplesUrl"
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
          <br/>
          <v-text-field
            label="Open AI API Key"
            hide-details="auto"
            :type="AiDisplayType"
            v-model="openAIKey"
            v-if="showAiModelSettings"
            title="Used to access the Open AI API in the fhirpath tester section of this app to explain fhirpath expressions"
          >
          <template v-slot:append>
              <v-btn icon small tile  
                @click="toggleAIKey">
                <v-icon v-if="showAIKey" title="Hide AI Key"> mdi-eye-outline </v-icon>
                <v-icon v-if="!showAIKey" title="Show AI Key"> mdi-eye-off-outline </v-icon>
              </v-btn>
            </template>
          </v-text-field>
          <v-text-field
            label="Open AI Base Path"
            hide-details="auto"
            v-model="openAIBasePath"
            v-if="showAiModelSettings"
            title="Used to access the Open AI API in the fhirpath tester section of this app to discuss fhirpath expressions"
          />
          <v-text-field
            label="Open AI API Version"
            hide-details="auto"
            v-model="openAIApiVersion"
            v-if="openAIBasePath && openAIBasePath.includes('openai.azure.com')"
            title="The API version to use to access the Azure deployed model(s)"
          />
          <v-text-field
            label="Open AI Model"
            hide-details="auto"
            v-model="openAIModel"
            v-if="showAiModelSettings"
            title="Used to access the Open AI API in the fhirpath tester section of this app to discuss fhirpath expressions"
          />
          <v-text-field
            label="Open AI Fast Model"
            hide-details="auto"
            v-model="openAIFastModel"
            v-if="showAiModelSettings"
            title="Used to access the Open AI API in the fhirpath tester section of this app to discuss fhirpath expressions (usually a cheaper/faster model)"
          />
          <v-checkbox
            label="Enable AI Chat Feedback"
            v-model="openAIFeedbackEnabled"
            v-if="showAdvancedSettings && openAIKey && (defaultProviderField == 'Enable feedback' || openAIFeedbackEnabled)"
            messages="Permits user initiated feedback to the FhirPath Lab to help improve the AI Chat."
            title="Using the lab with real patient data is not permitted, and any data entered into the AI Chat Feedback will be used to improve the AI Chat only.
NEVER SEND REAL PATIENT DATA."
          />
          <br/>

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

<style lang="scss">
.v-application .fp-amber input {
  color: #ffc107; //amber
}
</style>
<style lang="scss" scoped>
.v-card {
  width: min(80vw, 600px);
}
</style>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import { AxiosError } from "axios";
import { List } from "fhir/r4b";
import "~/helpers/user_settings";
import { settings, UserSettingsData } from "~/helpers/user_settings";
import { requestFhirAcceptHeaders } from "~/helpers/searchFhir";
import { fhirclient } from "fhirclient/lib/types";
import { fhirVersions } from "fhirclient/lib/settings";
import { getExtension, getExtensionUriValue } from "fhir-extension-helpers";

interface IControlData extends UserSettingsData {
  loadingFhirServerAuthData?: boolean;
  FhirServerVerified?: boolean;
  FhirServerSupportsSmartAuth?: boolean;
  FhirServerErrorMessage?: string;
}

export default Vue.extend({
  async mounted() {
    this.readUserSettings();
  },
  computed:{
    showAiModelSettings: function(): boolean {
      return (this.defaultProviderField == 'Say the magic word')
       || this.openAIKey != undefined && this.openAIKey != ''
       || this.openAIBasePath != undefined && this.openAIBasePath != '';
    },
    AiDisplayType: function(): string {
      if (this.showAIKey) {
        return "";
      } else {
        return "password";
      }
    },
  },
  methods: {
    toggleAIKey() {
      // console.log("toggleAIKey", this.showAIKey);
      this.showAIKey = !this.showAIKey;
    },
    closeSettings() {
      this.$emit("close");
    },
    clearFhirServerCheckStatus() {
      this.FhirServerVerified = false;
      this.FhirServerErrorMessage = undefined;
      this.FhirServerSupportsSmartAuth = undefined;
    },
    async checkFhirServerSmartAuthCapabilities() {
      // Check the fhir server's wellknown and Auth data in config.
      this.loadingFhirServerAuthData = true;
      this.FhirServerVerified = false;
      this.FhirServerErrorMessage = undefined;
      this.FhirServerSupportsSmartAuth = undefined;
      
      try {
        // if (host.cancelSource) host.cancelSource.cancel("verifying FHIR Server");
        // host.cancelSource = axios.CancelToken.source();
        // host.loadingData = true;
        // let token = host.cancelSource.token;
        const url = `${this.fhirServerUrl}/metadata?_summary=true`;
        const response = await axios.get<fhir4b.CapabilityStatement>(url, {
          // cancelToken: token,
          headers: { "Accept": requestFhirAcceptHeaders }
        });
        // if (token.reason) {
        //   console.log(token.reason);
        //   return;
        // }
        // host.cancelSource = undefined;
        // host.loadingData = false;

        const results = response.data;
        if (results) {
          const vers = fhirVersions as Record<string, Number>;
          if (results.fhirVersion && (vers[results.fhirVersion] == 4 || results.fhirVersion === '4.3.0')){
            this.FhirServerVerified = true;
            // also check for the security extensions
            if (results.rest && results.rest.length > 0){
              const security = results.rest[0].security;
              if (security){
                const smartAuthExtensions = getExtension(security, "http://fhir-registry.smarthealthit.org/StructureDefinition/oauth-uris");
                const authorizeEndpoint = getExtensionUriValue(smartAuthExtensions, "authorize");
                const tokenEndpoint = getExtensionUriValue(smartAuthExtensions, "token");
                // if (authorizeEndpoint && tokenEndpoint) this.FhirServerSupportsSmartAuth = true;
              }
            }
            // if Auth values aren't here, check in the well-known config file
            if (!this.FhirServerSupportsSmartAuth){
              try{
                const urlWKJ = `${this.fhirServerUrl}/.well-known/smart-configuration`;
                const responseWKJ = await axios.get<fhirclient.WellKnownSmartConfiguration>(urlWKJ, {
                  // cancelToken: token,
                  headers: { "Accept": "application/json" }
                });

                const wkj = responseWKJ.data;
                // console.log(wkj);
                if (wkj.token_endpoint && wkj.authorization_endpoint) this.FhirServerSupportsSmartAuth = true;
              }
              catch(err){
                if (axios.isAxiosError(err)) {
                  const serverError = err as AxiosError<fhir4b.OperationOutcome>;
                  if (serverError && serverError.response) {
                    console.log(serverError);
                    if (serverError.response.status !== 404){
                      this.FhirServerErrorMessage = serverError.message;
                    }
                  }
                } else {
                  console.log(err);
                  if (err instanceof Error)
                    this.FhirServerErrorMessage = err.message;
                }
              }
            }
          }
          else {
            this.FhirServerErrorMessage = `FHIR Version '${results.fhirVersion}' is not supported by fhirpath-lab (R4 required)`;
          }
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          const serverError = err as AxiosError<fhir4b.OperationOutcome>;
          if (serverError && serverError.response) {
            this.FhirServerErrorMessage = serverError.message;
          }
        } else {
          console.log(err);
          if (err instanceof Error)
            this.FhirServerErrorMessage = err.message;
        }
      }

      this.loadingFhirServerAuthData = false;
    },
    async readUserSettings() {
      // console.log("read User Settings");
      const values = settings.load();
      // console.log(values);

      this.fhirServerUrl = values.fhirServerUrl;
      this.fhirServerExamplesUrl = values.fhirServerExamplesUrl;
      this.OAuthClientId = values.OAuthClientId;
      this.fhirTerminologyServerUrl = values.fhirTerminologyServerUrl;
      this.syncFavourites = values.syncFavourites;
      this.favouritesListId = values.favouritesListId;
      this.defaultProviderField = values.defaultProviderField;
      this.defaultNewCanonicalBase = values.defaultNewCanonicalBase;
      this.openAIKey = values.openAIKey;
      this.openAIApiVersion = values.openAIApiVersion;
      this.openAIBasePath = values.openAIBasePath;
      this.openAIModel = values.openAIModel;
      this.openAIFastModel = values.openAIFastModel;
      this.openAIFeedbackEnabled = values.openAIFeedbackEnabled;
      this.showAdvancedSettings = values.showAdvancedSettings;
      this.pageSize = values.pageSize;

      // and check the server capabilities
      await this.checkFhirServerSmartAuthCapabilities();
    },
    async writeUserSettings() {
      // console.log("write User Settings");
      settings.save(this);
      const values = settings.load();
      // console.log(values);
      this.closeSettings();
    },
  },
  data(): IControlData {
    return {
      fhirServerUrl: undefined,
      fhirServerExamplesUrl: undefined,
      OAuthClientId: undefined,
      fhirTerminologyServerUrl: undefined,
      syncFavourites: false,
      favouritesListId: undefined,
      defaultProviderField: undefined,
      defaultNewCanonicalBase: undefined,
      openAIKey: undefined,
      showAIKey: false,
      openAIApiVersion: undefined,
      openAIBasePath: undefined,
      openAIModel: undefined,
      openAIFastModel: undefined,
      openAIFeedbackEnabled: false,
      showAdvancedSettings: true,
      pageSize: 10,

      loadingFhirServerAuthData: false,
      FhirServerVerified: undefined,
      FhirServerSupportsSmartAuth: undefined,
      FhirServerErrorMessage: undefined,
    };
  },
});
</script>
