<template>
  <v-card elevation="4" class="user-settings-card">
    <v-card-title>User Settings</v-card-title>

    <v-tabs v-model="activeTab" color="primary" align-tabs="start" density="compact">
      <v-tab value="general">General</v-tab>
      <v-tab value="ai">AI</v-tab>
    </v-tabs>
    <v-divider />

    <v-card-text class="user-settings-content">
      <v-tabs-window v-model="activeTab">
        <!-- General Tab -->
        <v-tabs-window-item value="general">
          <v-form>
            <v-text-field
              label="FHIR Server"
              v-model="data.fhirServerUrl"
              hide-details="auto"
              :error-messages="FhirServerErrorMessage"
              @update:modelValue="clearFhirServerCheckStatus"
              :loading="loadingFhirServerAuthData"
              loader-height="4"
            >
              <template v-slot:append-inner>
                <v-btn
                  icon
                  size="small"
                  variant="text"
                  v-if="!FhirServerVerified"
                  @click="checkFhirServerSmartAuthCapabilities"
                  title="Verify FHIR Server Capabilities"
                >
                  <v-icon>mdi-help-circle-outline</v-icon>
                </v-btn>
                <v-icon
                  color="green"
                  title="Secure Server with SMART Authentication"
                  v-if="FhirServerVerified && FhirServerSupportsSmartAuth"
                >
                  mdi-lock-outline
                </v-icon>
                <v-icon
                  color="green"
                  title="Open Server with no SMART Authentication"
                  v-if="FhirServerVerified && !FhirServerSupportsSmartAuth"
                >
                  mdi-lock-open-variant-outline
                </v-icon>
              </template>
            </v-text-field>

            <v-text-field
              v-if="FhirServerSupportsSmartAuth || data.OAuthClientId"
              :class="FhirServerSupportsSmartAuth ? '' : 'fp-amber'"
              :messages="FhirServerSupportsSmartAuth ? '' : 'Server does not support OAuth, remove the Client ID'"
              label="FHIR Server OAuth Client ID"
              v-model="data.OAuthClientId"
              hide-details="auto"
              :clearable="!FhirServerSupportsSmartAuth"
            />

            <v-text-field
              label="FHIR Server for Examples"
              v-model="data.fhirServerExamplesUrl"
              hide-details="auto"
            />

            <v-text-field
              label="FHIR Terminology Server"
              v-model="data.fhirTerminologyServerUrl"
              hide-details="auto"
            />

            <v-checkbox
              label="Show Advanced Properties"
              v-model="data.showAdvancedSettings"
              hide-details="auto"
            />

            <v-text-field
              label="Default Provider Field"
              v-model="data.defaultProviderField"
              hide-details="auto"
            />

            <v-text-field
              label="Default Canonical Base"
              hide-details="auto"
              v-model="data.defaultNewCanonicalBase"
            />

            <v-text-field
              label="List Page Size"
              hide-details="auto"
              v-model="data.pageSize"
            />
          </v-form>
        </v-tabs-window-item>

        <!-- AI Tab -->
        <v-tabs-window-item value="ai">
          <v-form>
            <v-text-field
              label="Open AI API Key"
              hide-details="auto"
              :type="AiDisplayType"
              v-model="data.openAIKey"
              v-if="showAiModelSettings"
              title="Used to access the Open AI API in the fhirpath tester section of this app to explain fhirpath expressions"
            >
              <template v-slot:append-inner>
                <v-btn icon size="small" variant="text" @click="toggleAIKey">
                  <v-icon v-if="showAIKey" title="Hide AI Key">mdi-eye-outline</v-icon>
                  <v-icon v-else title="Show AI Key">mdi-eye-off-outline</v-icon>
                </v-btn>
              </template>
            </v-text-field>

            <v-text-field
              label="Open AI Base Path"
              hide-details="auto"
              v-model="data.openAIBasePath"
              v-if="showAiModelSettings"
              title="Used to access the Open AI API in the fhirpath tester section of this app to discuss fhirpath expressions"
            />

            <v-text-field
              label="Open AI API Version"
              hide-details="auto"
              v-model="data.openAIApiVersion"
              v-if="data.openAIBasePath && data.openAIBasePath.includes('openai.azure.com')"
              title="The API version to use to access the Azure deployed model(s)"
            />

            <v-text-field
              label="Open AI Model"
              hide-details="auto"
              v-model="data.openAIModel"
              v-if="showAiModelSettings"
              title="Used to access the Open AI API in the fhirpath tester section of this app to discuss fhirpath expressions"
            />

            <!-- <v-text-field
              label="Open AI Fast Model"
              hide-details="auto"
              v-model="data.openAIFastModel"
              v-if="showAiModelSettings"
              title="Used to access the Open AI API in the fhirpath tester section of this app to discuss fhirpath expressions (usually a cheaper/faster model)"
            />

            <v-checkbox
              label="Enable AI Chat Feedback"
              v-model="data.openAIFeedbackEnabled"
              v-if="data.showAdvancedSettings && data.openAIKey && (data.defaultProviderField == 'Enable feedback' || data.openAIFeedbackEnabled)"
              messages="Permits user initiated feedback to the FhirPath Lab to help improve the AI Chat."
              title="Using the lab with real patient data is not permitted, and any data entered into the AI Chat Feedback will be used to improve the AI Chat only.
NEVER SEND REAL PATIENT DATA."
            /> -->
          </v-form>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>

    <v-divider />
    <v-card-actions>
      <v-btn @click="readUserSettings">Undo</v-btn>
      <v-spacer />
      <v-btn @click="writeUserSettings">Save</v-btn>
      <v-btn @click="closeSettings">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import axios, { AxiosError } from 'axios'
import { settings, type UserSettingsData } from '@legacy/helpers/user_settings'
import { getExtension, getExtensionUriValue } from 'fhir-extension-helpers'

const emit = defineEmits<{
  close: []
}>()

const data = reactive<UserSettingsData>({
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
})

const showAIKey = ref(false)
const activeTab = ref<'general' | 'ai'>('general')
const loadingFhirServerAuthData = ref(false)
const FhirServerVerified = ref<boolean>(false)
const FhirServerSupportsSmartAuth = ref<boolean | undefined>(undefined)
const FhirServerErrorMessage = ref<string | undefined>(undefined)

const showAiModelSettings = computed<boolean>(() => {
  return (
    true ||
    (data.openAIKey != undefined && data.openAIKey != '') ||
    (data.openAIBasePath != undefined && data.openAIBasePath != '')
  )
})

const AiDisplayType = computed<string>(() => (showAIKey.value ? 'text' : 'password'))

function toggleAIKey() {
  showAIKey.value = !showAIKey.value
}

function closeSettings() {
  emit('close')
}

function clearFhirServerCheckStatus() {
  FhirServerVerified.value = false
  FhirServerErrorMessage.value = undefined
  FhirServerSupportsSmartAuth.value = undefined
}

async function checkFhirServerSmartAuthCapabilities() {
  loadingFhirServerAuthData.value = true
  FhirServerVerified.value = false
  FhirServerErrorMessage.value = undefined
  FhirServerSupportsSmartAuth.value = undefined

  try {
    const url = `${data.fhirServerUrl}/metadata?_summary=true`
    const response = await axios.get<fhir4.CapabilityStatement>(url, {
      headers: { Accept: requestFhirAcceptHeaders },
    })
    const results = response.data
    if (results) {
      if (
        results.fhirVersion &&
        (results.fhirVersion.startsWith('4.0') || results.fhirVersion === '4.3.0')
      ) {
        FhirServerVerified.value = true
        // check security extensions
        if (results.rest && results.rest.length > 0) {
          const security = results.rest[0].security
          if (security) {
            const smartAuthExtensions = getExtension(
              security,
              'http://fhir-registry.smarthealthit.org/StructureDefinition/oauth-uris'
            )
            const authorizeEndpoint = getExtensionUriValue(smartAuthExtensions, 'authorize')
            const tokenEndpoint = getExtensionUriValue(smartAuthExtensions, 'token')
            if (authorizeEndpoint && tokenEndpoint) {
              FhirServerSupportsSmartAuth.value = true
            }
          }
        }
        // fall back to .well-known/smart-configuration
        if (!FhirServerSupportsSmartAuth.value) {
          try {
            const urlWKJ = `${data.fhirServerUrl}/.well-known/smart-configuration`
            const responseWKJ = await axios.get<{
              token_endpoint?: string
              authorization_endpoint?: string
            }>(urlWKJ, {
              headers: { Accept: 'application/json' },
            })
            const wkj = responseWKJ.data
            if (wkj.token_endpoint && wkj.authorization_endpoint) {
              FhirServerSupportsSmartAuth.value = true
            }
          } catch (err) {
            if (axios.isAxiosError(err)) {
              const serverError = err as AxiosError<fhir4.OperationOutcome>
              if (serverError && serverError.response) {
                if (serverError.response.status !== 404) {
                  FhirServerErrorMessage.value = serverError.message
                }
              }
            } else if (err instanceof Error) {
              FhirServerErrorMessage.value = err.message
            }
          }
        }
      } else {
        FhirServerErrorMessage.value = `FHIR Version '${results.fhirVersion}' is not supported by fhirpath-lab (R4 required)`
      }
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const serverError = err as AxiosError<fhir4.OperationOutcome>
      if (serverError && serverError.response) {
        FhirServerErrorMessage.value = serverError.message
      }
    } else if (err instanceof Error) {
      FhirServerErrorMessage.value = err.message
    }
  }

  loadingFhirServerAuthData.value = false
}

async function readUserSettings() {
  const values = settings.load()
  data.fhirServerUrl = values.fhirServerUrl
  data.fhirServerExamplesUrl = values.fhirServerExamplesUrl
  data.OAuthClientId = values.OAuthClientId
  data.fhirTerminologyServerUrl = values.fhirTerminologyServerUrl
  data.syncFavourites = values.syncFavourites
  data.favouritesListId = values.favouritesListId
  data.defaultProviderField = values.defaultProviderField
  data.defaultNewCanonicalBase = values.defaultNewCanonicalBase
  data.openAIKey = values.openAIKey
  data.openAIApiVersion = values.openAIApiVersion
  data.openAIBasePath = values.openAIBasePath
  data.openAIModel = values.openAIModel
  data.openAIFastModel = values.openAIFastModel
  data.openAIFeedbackEnabled = values.openAIFeedbackEnabled
  data.showAdvancedSettings = values.showAdvancedSettings
  data.pageSize = values.pageSize

  await checkFhirServerSmartAuthCapabilities()
}

function writeUserSettings() {
  settings.save(data)
  closeSettings()
}

onMounted(() => {
  readUserSettings()
})
</script>

<style lang="scss">
.v-application .fp-amber input {
  color: #ffc107; // amber
}
</style>

<style lang="scss" scoped>
.user-settings-card {
  width: min(80vw, 600px);
}

.user-settings-content {
  min-height: 420px;
  max-height: 70vh;
  overflow-y: auto;
}
</style>
