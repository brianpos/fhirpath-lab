<template>
  <div class="external-engine-host">
    <!-- Consent prompt (shown when not consented) -->
    <div v-if="!hasConsent" class="consent-container">
      <div class="consent-header">
        <div class="header-with-icon">
          <v-icon color="purple" size="36" class="mr-3">mdi-web</v-icon>
          <div>
          <h5 class="mb-2" style="margin-bottom: 0 !important;">{{ title || engineName }}</h5>
          <span>By {{ publisher }}</span>
          </div>
        </div>
      </div>
      
      <v-card class="data-sharing-info mb-4" outlined>
        <v-card-text>
          <slot name="product-info" />
          <div class="data-warning">
            <v-icon color="info" small class="mr-1">mdi-information-outline</v-icon>
            <div>
            <span class="text-caption">
              Enabling this external service will send the test questionnaire, context data and entered questionnaire response for rendering.<br/>
              This means that the "Show Response" button on each renderer will:
            </span>
            <ul class="text-caption">
              <li>Copy the current form data to the response tab</li>
              <li>Load the data (including context) to all <b>enabled</b> rendering engines</li>
              <li>Facilitate cross-engine compatibility verification</li>
            </ul>
            <span class="text-caption" style="margin-bottom: unset;">
              And pre-population will render to all enabled engines.<br/>
              Remember, this is a development testing tool - do not enter real patient data.
            </span>
            </div>
          </div>
        </v-card-text>
      </v-card>

      <div class="consent-controls">
        <v-checkbox 
          v-model="consentGiven"
          :label="`Allow sending data to ${publisher} for questionnaire rendering`"
          color="primary"
          class="mb-2"
          hide-details="auto"
          dense
        />
        
        <v-checkbox
          v-model="rememberChoice"
          label="Remember this choice for future sessions"
          color="secondary"
          :disabled="!consentGiven"
          class="ml-4" dense
        />
        
        <v-btn 
          :disabled="!consentGiven"
          @click="grantConsent"
          color="primary"
          class="mt-3"
        >
          Enable {{ engineName }}
        </v-btn>
      </div>
    </div>

    <!-- Engine content (shown when consented) -->
    <div v-else class="engine-content">
      <!-- Main slot for the engine component -->
      <div class="engine-slot">
        <slot />
      </div>
      
      <!-- Footer with revoke controls -->
      <div class="engine-footer">
        <div class="d-flex align-center justify-space-between">
          <span class="text-caption text--secondary" style="font-style: italic;">
            (external rendering engine)
          </span>
          <v-btn
            class="disable-btn"
            small
            text
            @click="revokeConsent"
          >
            <v-icon small left>mdi-close</v-icon>
            Disable {{ engineName }}
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { rendererStylingStore } from '@aehrc/smart-forms-renderer';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Emit, Watch } from 'vue-property-decorator';

@Component
export default class ExternalRenderingEngineHost extends Vue {
  @Prop({ required: true }) readonly engineName!: string;
  @Prop() readonly title?: string;
  @Prop() readonly publisher?: string;
  @Prop({ default: false }) readonly consent?: boolean;

  // Internal state for form inputs in consent dialog
  private consentGiven: boolean = false;
  private rememberChoice: boolean = false;

  // Computed property to reactively derive hasConsent from props
  get hasConsent(): boolean {
    return this.consent ?? false;
  }

  // Watch for changes to the consent prop directly
  @Watch('consent', { immediate: false })
  onConsentPropChanged(newValue: boolean | undefined, oldValue: boolean | undefined) {
    console.log(`ExternalRenderingEngineHost (${this.engineName}): consent prop changed from ${oldValue} to ${newValue}`);
    if (!newValue) {
      // When consent is revoked, reset the form checkboxes
      this.consentGiven = false;
    } else {
      // When consent is granted, check the consent checkbox
      this.consentGiven = true;
    }
  }

  mounted() {
    // Initialize checkbox state from props
    this.consentGiven = this.hasConsent;
    this.rememberChoice = false;
  }

  @Emit('consent-changed')
  grantConsent() {
    // Don't manage state locally - emit event and let parent control it
    return {
      engineName: this.engineName,
      consented: true,
      remember: this.rememberChoice
    };
  }

  @Emit('consent-changed')
  revokeConsent() {
    this.consentGiven = false;
    // Don't manage state locally - emit event and let parent control it
    return {
      engineName: this.engineName,
      consented: false,
      remember: true // don't have visibility of the checkbox state here, so default to true
    };
  }
}
</script>

<style lang="scss">
.data-sharing-info .data-warning {
    align-items: start !important;
}

.data-sharing-info .data-warning i.v-icon {
    padding-top: 4px;
    padding-right: 4px;
}

.consent-controls .v-label {
    font-size: 14px;
}
</style>


<style scoped lang="scss">

.disable-btn {
  text-transform: none; font-weight: normal;
}

.external-engine-host {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.consent-container {
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  padding-top: 1rem;
}

.consent-header {
  margin-bottom: 1rem;
  
  .header-with-icon {
    display: flex;
    align-items: center;
  }
  
  h3 {
    color: rgba(0, 0, 0, 0.87);
    font-weight: 500;
    margin: 0;
  }
}

.data-sharing-info {
  width: 100%;
  
  .data-warning {
    display: flex;
    align-items: center;
    padding: 8px 12px;
    background-color: #e3f2fd;
    border-radius: 4px;
    margin-top: 8px;
  }
}

.consent-controls {
  width: 100%;
  text-align: left;
  padding: 16px;
}

.engine-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.engine-slot {
  flex: 1;
  overflow: hidden;
  display: grid;
}

.engine-footer {
  flex-shrink: 0;
  padding: 0 8px;
  background-color: #fafafa;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
}

// Responsive design
@media (max-width: 596px) {
  .consent-container {
    padding: 1rem;
    
    .data-sharing-info {
      font-size: 0.9rem;
    }
  }
}
</style>