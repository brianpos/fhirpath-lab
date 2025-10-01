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
            <span class="text-caption">
              Enabling this external service will send the test questionnaire, context data and entered questionnaire response for rendering.<br/>
              <br/>
              This means that the "Show Response" button on each renderer will:<br/>
              • Copy the current form data to the response tab<br/>
              • Load the data (including context) to all <b>enabled</b> rendering engines<br/>
              • Facilitate cross-engine compatibility verification<br/>
              <br/>
              Remember, this is a development testing tool - do not enter real patient data.
            </span>
          </div>
        </v-card-text>
      </v-card>

      <div class="consent-controls">
        <v-checkbox 
          v-model="consentGiven"
          :label="`Enable sending data to ${publisher} for questionnaire rendering`"
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
          Activate {{ engineName }}
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
        <v-divider class="mb-2" />
        <div class="d-flex align-center justify-space-between">
          <span class="text-caption text--secondary">
            <v-icon small color="success" class="mr-1">mdi-check-circle</v-icon>
            External {{ engineName }} is enabled
          </span>
          <v-btn
            small
            text
            color="error"
            @click="revokeConsent"
          >
            <v-icon small left>mdi-close</v-icon>
            Disable
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
import { Prop, Emit } from 'vue-property-decorator';

@Component
export default class ExternalRenderingEngineHost extends Vue {
  @Prop({ required: true }) readonly engineName!: string;
  @Prop() readonly title?: string;
  @Prop() readonly publisher?: string;
  @Prop({ default: false }) readonly consent?: boolean;
  @Prop({ default: false }) readonly initialConsent?: boolean;
  @Prop({ default: false }) readonly initialRememberChoice?: boolean;

  // Internal state
  private consentGiven: boolean = false;
  private rememberChoice: boolean = false;
  private hasConsent: boolean = false;

  mounted() {
    // Initialize from props (consent prop takes precedence over initialConsent)
    this.consentGiven = this.consent ?? this.initialConsent ?? false;
    this.rememberChoice = this.initialRememberChoice || false;
    this.hasConsent = this.consent ?? this.initialConsent ?? false;
  }

  @Emit('consent-changed')
  grantConsent() {
    this.hasConsent = true;
    return {
      engineName: this.engineName,
      consented: true,
      remember: this.rememberChoice
    };
  }

  @Emit('consent-changed')
  revokeConsent() {
    this.hasConsent = false;
    this.consentGiven = false;
    return {
      engineName: this.engineName,
      consented: false,
      remember: this.rememberChoice
    };
  }

  // Public method to set consent state (for parent components)
  public setConsent(consented: boolean, remember: boolean = false) {
    this.hasConsent = consented;
    this.consentGiven = consented;
    this.rememberChoice = remember;
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
}

.engine-footer {
  flex-shrink: 0;
  padding: 8px 16px;
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