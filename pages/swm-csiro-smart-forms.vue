<template>
  <div class="swm-renderer-container">
    <div v-if="questionnaire" class="q-host">
      <Renderer :questionnaire="questionnaire" :onFocus="onFocusChanged" />
    </div>
    <div v-else class="no-questionnaire">
      <p>Waiting for questionnaire...</p>
    </div>
  </div>
</template>

<style scoped>
.swm-renderer-container {
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
  border: 6px solid lightgreen;
}

.q-host {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

.no-questionnaire {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #666;
  font-size: 1.2em;
}
</style>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { applyReactInVue } from "vuereact-combined";
import { getResponse, buildForm } from "@aehrc/smart-forms-renderer";
import { Questionnaire, QuestionnaireResponse, Reference, Resource, OperationOutcome } from "fhir/r4";
import { Questionnaire as QuestionnaireR4, QuestionnaireResponse as QuestionnaireResponseR4, Patient as PatientR4, Practitioner as PractitionerR4, Encounter as EncounterR4 } from "fhir/r4";
import SmartFormsRendererWithFocus from "~/components/Questionnaire/ReactRenderer";
import { FetchResourceCallback, FetchResourceRequestConfig, populateQuestionnaire } from "@aehrc/sdc-populate";
import axios from "axios";

// Import SDC-SWM Protocol Types
import type {
  SdcMessageType,
  SmartWebMessagingRequest,
  SmartWebMessagingResponse,
  QuestionnaireContext,
  StatusHandshakeRequest,
  StatusHandshakeResponsePayload,
  SdcConfigureRequest,
  SdcConfigureRequestPayload,
  SdcConfigureResponsePayload,
  SdcConfigureContextRequest,
  SdcConfigureContextResponsePayload,
  SdcDisplayQuestionnaireRequest,
  SdcDisplayQuestionnaireResponsePayload,
  SdcDisplayQuestionnaireResponseRequest,
  SdcDisplayQuestionnaireResponseResponsePayload,
  SdcRequestCurrentQuestionnaireResponseRequest,
  SdcRequestCurrentQuestionnaireResponseResponsePayload,
  SdcRequestPrepopulateRequest,
  SdcRequestPrepopulateResponsePayload,
  SdcRequestExtractRequest,
  SdcRequestExtractResponsePayload,
  SdcUiChangedFocusPayload,
  SdcUiChangedQuestionnaireResponsePayload,
  UiDoneEvent,
  UiDoneResponsePayload,
  SdcRendererMessageHandlers
} from '~/types/sdc-swm-types';

/**
 * SDC-SWM CSIRO Smart Forms Renderer Page
 * 
 * This page implements the SMART Web Messaging for Structured Data Capture (SDC-SWM) protocol
 * as a renderer that runs inside an iframe or popup window.
 * 
 * ⚠️ STRICT LAUNCH REQUIREMENTS:
 * The host MUST provide these URL parameters when launching the renderer.
 * The renderer will NOT function without them.
 * 
 * Required URL Parameters:
 * - `messaging_handle` - Unique session identifier for this messaging session
 * - `messaging_origin` - Expected origin of the host (for security validation)
 * 
 * Example iframe launch:
 *   <iframe src="https://renderer.example.com/swm-csiro-smart-forms?messaging_handle=abc123&messaging_origin=https://host.example.com"></iframe>
 * 
 * Example popup launch:
 *   window.open('https://renderer.example.com/swm-csiro-smart-forms?messaging_handle=abc123&messaging_origin=https://host.example.com')
 * 
 * Protocol Flow:
 * 1. Host generates unique messagingHandle and launches renderer with URL parameters
 * 2. Renderer initializes, validates URL parameters, waits for host handshake
 * 3. Host initiates handshake with messagingHandle (Host → Renderer)
 * 4. Renderer validates handshake matches URL params, responds with capabilities (Renderer → Host)
 * 5. Host sends configuration and context (Host → Renderer)
 * 6. Host sends questionnaire to display (Host → Renderer)
 * 7. Renderer sends unsolicited events as user interacts (Renderer → Host)
 * 
 * Implements the following incoming message handlers (Host → Renderer):
 * - status.handshake: Initial handshake to establish communication
 * - sdc.configure: Receive configuration (terminology server, data server, etc.)
 * - sdc.configureContext: Receive context data (patient, encounter, author, etc.)
 * - sdc.displayQuestionnaire: Display a questionnaire with optional context
 * - sdc.displayQuestionnaireResponse: Display a questionnaire response
 * - sdc.requestCurrentQuestionnaireResponse: Return current form data
 * - sdc.requestExtract: Extract FHIR resources from questionnaire response
 * - ui.done: Handle user completion with confirmation dialog
 * 
 * Sends the following unsolicited messages to host (Renderer → Host):
 * - sdc.ui.changedFocus: Notify when user focus changes
 * - sdc.ui.changedQuestionnaireResponse: Notify when form data changes
 * 
 * @see docs/sdc-swm-protocol.md for complete protocol specification
 */
@Component({
  components: {
    Renderer: applyReactInVue(SmartFormsRendererWithFocus)
  }
})
export default class SwmCsiroSmartForms extends Vue implements SdcRendererMessageHandlers {
  // Use empty layout to remove all chrome
  layout = 'empty';
  
  questionnaire: Questionnaire | null = null;
  questionnaireResponse: QuestionnaireResponse | null = null;
  context: QuestionnaireContext = {};
  config: SdcConfigureRequestPayload = {};
  handshakeComplete: boolean = false;
  currentLinkId: string | null = null;
  messagingHandle: string | null = null; // Store the messaging handle from the host
  allowedOrigin: string | null = null; // Store the allowed origin for security

  extractServiceUrl: string = 'https://fhir.forms-lab.com/QuestionnaireResponse/$extract'; // the extract service URL (using mine for a start)

  // Non-reactive property to avoid cross-origin security errors with WindowProxy
  // Initialized in mounted() to prevent Vue's reactivity system from wrapping it
  declare messageSource: WindowProxy | null;
    
  /**
   * Message type to handler method mapping
   * This is the ONLY place that maps message types to handler methods
   */
  private readonly messageHandlerMap: Record<string, keyof SdcRendererMessageHandlers> = {
    'status.handshake': 'handleStatusHandshake',
    'sdc.configure': 'handleSdcConfigure',
    'sdc.configureContext': 'handleSdcConfigureContext',
    'sdc.displayQuestionnaire': 'handleSdcDisplayQuestionnaire',
    'sdc.displayQuestionnaireResponse': 'handleSdcDisplayQuestionnaireResponse',
    'sdc.requestCurrentQuestionnaireResponse': 'handleSdcRequestCurrentQuestionnaireResponse',
    'sdc.requestPrepopulate': 'handleSdcRequestPrepopulate',
    'sdc.requestExtract': 'handleSdcRequestExtract',
    'ui.done': 'handleUiDone'
  };

  get onFocusChanged() {
    return (linkId: string) => { this.handleFocusChange(linkId); }
  }

  mounted() {
    // Initialize non-reactive property
    this.messageSource = null;
    
    // Check for URL parameters (popup/window launch mode)
    this.checkUrlParameters();
    
    // Register message listener
    window.addEventListener('message', this.handleMessage);
    
    // Per SDC-SWM protocol: Host initiates the handshake, renderer waits and responds
    // Do NOT send initial handshake - wait for host to send it first
  }

  /**
   * Check if renderer was launched with required URL parameters
   * Per SDC-SWM protocol: Host MUST provide these parameters when launching the renderer
   */
  checkUrlParameters() {
    const params = new URLSearchParams(window.location.search);
    const messagingHandle = params.get('messaging_handle');
    const messagingOrigin = params.get('messaging_origin');
    
    if (!messagingHandle || !messagingOrigin) {
      console.error('[SDC-SWM Renderer] ❌ REQUIRED URL parameters missing!');
      console.error('[SDC-SWM Renderer] Host must provide: ?messaging_handle=xxx&messaging_origin=https://host.example.com');
      console.error('[SDC-SWM Renderer] Renderer cannot function without these parameters.');
      return;
    }
    
    this.messagingHandle = messagingHandle;
    this.allowedOrigin = messagingOrigin;
    
    console.log('[SDC-SWM Renderer] ✅ Initialized with required parameters:', {
      messagingHandle: messagingHandle,
      allowedOrigin: messagingOrigin
    });
  }

  beforeDestroy() {
    window.removeEventListener('message', this.handleMessage);
    
    // Stop change watcher
    if (this.changeWatchInterval) {
      clearInterval(this.changeWatchInterval);
      this.changeWatchInterval = null;
    }
  }

  /**
   * Handle incoming messages from parent window or opener
   */
  async handleMessage(event: MessageEvent) {
    const message = event.data as SmartWebMessagingRequest;

    // Validate that we have a valid message object
    if (!event.data || typeof event.data !== 'object') {
      return;
    }

    // Filter out React DevTools messages
    if (event.data?.source?.startsWith("react-devtools-")) {
      return;
    }

    // Validate message structure (REQUIRED by protocol)
    if (!message.messageId || !message.messageType) {
      console.warn('[SDC-SWM Renderer] Invalid message received - missing messageId or messageType', message);
      return;
    }

    // STRICT: Reject all messages if renderer not properly initialized with URL parameters
    if (!this.messagingHandle || !this.allowedOrigin) {
      console.error('[SDC-SWM Renderer] ❌ Cannot process messages - renderer not initialized with required URL parameters');
      console.error('[SDC-SWM Renderer] Host must provide: ?messaging_handle=xxx&messaging_origin=https://host.example.com');
      return;
    }

    // Origin validation (SECURITY REQUIREMENT)
    if (event.origin !== this.allowedOrigin) {
      console.warn('[SDC-SWM Renderer] ❌ Rejecting message from unauthorized origin:', event.origin, 'expected:', this.allowedOrigin);
      return;
    }

    // MessagingHandle validation (REQUIRED by protocol)
    if (message.messagingHandle !== this.messagingHandle) {
      // Not our message - ignore silently (could be for another renderer)
      return;
    }

    console.log('[SDC-SWM Renderer] Received message:', message.messageType, message);
    
    // Store the source of the message so we can reply to the correct window
    this.messageSource = event.source as WindowProxy;

    try {
      // Look up the handler method name from the map
      const handlerMethodName = this.messageHandlerMap[message.messageType];
      
      if (!handlerMethodName) {
        // Unknown message type
        console.warn('[SDC-SWM Renderer] Unknown message type:', message.messageType);
        this.sendResponse(message.messageId, {
          status: 'error',
          outcome: this.createOperationOutcome('error', `Unknown message type: ${message.messageType}`)
        });
        return;
      }
      
      // Get the handler function
      // Use type assertion since we're accessing methods dynamically
      const handler = (this as any)[handlerMethodName] as Function | undefined;
      
      if (!handler || typeof handler !== 'function') {
        // Handler not implemented (optional handler)
        console.warn('[SDC-SWM Renderer] Handler not implemented:', message.messageType);
        this.sendResponse(message.messageId, {
          status: 'error',
          outcome: this.createOperationOutcome('error', `Handler not implemented: ${message.messageType}`)
        });
        return;
      }
      
      // Call the handler with the full message (no manual casting needed!)
      const response = await handler.call(this, message);
      
      // Send response back to parent
      this.sendResponse(message.messageId, response);
      
    } catch (error: any) {
      console.error('[SDC-SWM Renderer] Error handling message:', message.messageType, error);
      this.sendResponse(message.messageId, {
        status: 'error',
        outcome: this.createOperationOutcome('error', error.message || 'Unknown error')
      });
    }
  }

  /**
   * Handle handshake message
   */
  async handleStatusHandshake(message: StatusHandshakeRequest): Promise<StatusHandshakeResponsePayload> {
    console.log('[SDC-SWM Renderer] Handling handshake');
    this.handshakeComplete = true;
    
    // Return protocol-compliant handshake response
    return {
      application: {
        name: 'CSIRO Smart Forms Renderer',
        version: '0.36.0',
        publisher: 'CSIRO Australian e-Health Research Centre'
      },
      capabilities: {
        extraction: true,
        prepopulate: true,
        focusChangeNotifications: true
      }
    };
  }

  /**
   * Handle configure message
   */
  async handleSdcConfigure(message: SdcConfigureRequest): Promise<SdcConfigureResponsePayload> {
    console.log('Handling configure', message.payload);
    this.config = { ...this.config, ...message.payload };
    
    return {
      status: 'success'
    };
  }

  /**
   * Handle configure context message
   */
  async handleSdcConfigureContext(message: SdcConfigureContextRequest): Promise<SdcConfigureContextResponsePayload> {
    console.log('Handling configure context', message.payload);
    
    // Replace all context per protocol specification (context REPLACES all existing)
    if (message.payload.context) {
      this.context = message.payload.context;
    } else {
      // If no context provided, clear it
      this.context = {};
    }
    
    return {
      status: 'success'
    };
  }

  /**
   * Handle display questionnaire message
   */
  async handleSdcDisplayQuestionnaire(message: SdcDisplayQuestionnaireRequest): Promise<SdcDisplayQuestionnaireResponsePayload> {
    console.log('Handling display questionnaire', message.payload);
    
    if (!message.payload.questionnaire) {
      return {
        status: 'error',
        outcome: this.createOperationOutcome('error', 'No questionnaire provided')
      };
    }

    this.questionnaire = message.payload.questionnaire as Questionnaire;
    
    // Merge context if provided (per protocol: sdc.displayQuestionnaire merges context)
    if (message.payload.context) {
      // Merge simple properties - overwrite only if provided
      if (message.payload.context.subject) this.context.subject = message.payload.context.subject;
      if (message.payload.context.author) this.context.author = message.payload.context.author;
      if (message.payload.context.encounter) this.context.encounter = message.payload.context.encounter;
      
      // Merge launchContext array by name
      if (message.payload.context.launchContext) {
        if (!this.context.launchContext) {
          this.context.launchContext = [];
        }
        
        message.payload.context.launchContext.forEach(newItem => {
          const existingIndex = this.context.launchContext!.findIndex(item => item.name === newItem.name);
          if (existingIndex >= 0) {
            // Overwrite existing item with same name
            this.context.launchContext![existingIndex] = newItem;
          } else {
            // Add new item
            this.context.launchContext!.push(newItem);
          }
        });
      }
    }

    // Build form with questionnaire
    try {
      await buildForm(
        this.questionnaire as QuestionnaireR4,
        message.payload.questionnaireResponse as QuestionnaireResponseR4 | undefined
      );
      
      // Start watching for changes
      this.startWatchingForChanges();

      return {
        status: 'success'
      };
    } catch (error: any) {
      return {
        status: 'error',
        outcome: this.createOperationOutcome('error', `Failed to build form: ${error.message}`)
      };
    }
  }

  /**
   * Handle display questionnaire response message
   */
  async handleSdcDisplayQuestionnaireResponse(message: SdcDisplayQuestionnaireResponseRequest): Promise<SdcDisplayQuestionnaireResponseResponsePayload> {
    console.log('Handling display questionnaire response', message.payload);
    
    if (!message.payload.questionnaireResponse) {
      return {
        status: 'error',
        outcome: this.createOperationOutcome('error', 'No questionnaire response provided')
      };
    }

    this.questionnaireResponse = message.payload.questionnaireResponse as QuestionnaireResponse;
    
    // If questionnaire is provided, use it
    if (message.payload.questionnaire) {
      this.questionnaire = message.payload.questionnaire as Questionnaire;
    }
    
    // Just report the issue, this wrapper is not intending to deal with fetching referenced questionnaires
    if (!this.questionnaire) {
      return {
        status: 'error',
        outcome: this.createOperationOutcome('error', 'Questionnaire must be provided or contained in response')
      };
    }

    // Build form with questionnaire and response
    try {
      await buildForm(
        this.questionnaire as QuestionnaireR4,
        this.questionnaireResponse as QuestionnaireResponseR4
      );
      
      // Start watching for changes
      this.startWatchingForChanges();

      return {
        status: 'success'
      };
    } catch (error: any) {
      return {
        status: 'error',
        outcome: this.createOperationOutcome('error', `Failed to build form: ${error.message}`)
      };
    }
  }

  /**
   * Handle request current questionnaire response message
   */
  async handleSdcRequestCurrentQuestionnaireResponse(message: SdcRequestCurrentQuestionnaireResponseRequest): Promise<SdcRequestCurrentQuestionnaireResponseResponsePayload> {
    console.log('Handling request current questionnaire response');
    
    try {
      const response = getResponse();
      
      // Tag the response as generated by CSIRO renderer
      if (!response.meta?.tag?.find(t => t.code?.startsWith('csiro'))) {
        if (!response.meta) response.meta = { tag: [] };
        if (!response.meta.tag) response.meta.tag = [];
        response.meta.tag!.push({ code: 'csiro:generated' });
      }

      return {
        questionnaireResponse: response,
        outcome: this.createOperationOutcome('information', 'QuestionnaireResponse retrieved successfully')
      };
    } catch (error: any) {
      return {
        outcome: this.createOperationOutcome('error', `Failed to get response: ${error.message}`)
      };
    }
  }

  /** 
   * Handle request prepopulate message
   */
  async handleSdcRequestPrepopulate(message: SdcRequestPrepopulateRequest): Promise<SdcRequestPrepopulateResponsePayload> {
    console.log('[SDC-SWM Renderer] Handling request prepopulate', message.payload);
    
    if (!this.questionnaire) {
      return {
        status: 'error',
        outcome: this.createOperationOutcome('error', 'No questionnaire available to prepopulate')
      };
    }

    // Extract patient, user, and encounter from context
    let patientResource: PatientR4 | undefined = undefined;
    let userResource: PractitionerR4 | undefined = undefined;
    let encounterResource: EncounterR4 | undefined = undefined;

    // Get patient from context (either subject or launchContext)
    if (this.context.subject?.reference) {
      const patientRef = this.context.subject.reference;
      if (this.config.dataServer) {
        patientResource = await this.fetchResource(this.config.dataServer, patientRef) as PatientR4;
      }
    } else if (this.context.launchContext) {
      const patientContext = this.context.launchContext.find(lc => lc.name === 'patient');
      if (patientContext?.contentResource) {
        patientResource = patientContext.contentResource as PatientR4;
      }
    }

    // Get user/practitioner from context
    if (this.context.author?.reference) {
      const userRef = this.context.author.reference;
      if (this.config.dataServer) {
        userResource = await this.fetchResource(this.config.dataServer, userRef) as PractitionerR4;
      }
    } else if (this.context.launchContext) {
      const userContext = this.context.launchContext.find(lc => lc.name === 'user');
      if (userContext?.contentResource) {
        userResource = userContext.contentResource as PractitionerR4;
      }
    }

    // Get encounter from context
    if (this.context.encounter?.reference) {
      const encounterRef = this.context.encounter.reference;
      if (this.config.dataServer) {
        encounterResource = await this.fetchResource(this.config.dataServer, encounterRef) as EncounterR4;
      }
    } else if (this.context.launchContext) {
      const encounterContext = this.context.launchContext.find(lc => lc.name === 'encounter');
      if (encounterContext?.contentResource) {
        encounterResource = encounterContext.contentResource as EncounterR4;
      }
    }

    if (!patientResource) {
      return {
        status: 'error',
        outcome: this.createOperationOutcome('error', 'No patient resource available for prepopulation')
      };
    }

    if (!this.config.dataServer) {
      return {
        status: 'error',
        outcome: this.createOperationOutcome('error', 'No data server configured for prepopulation')
      };
    }

    try {
      // Call the CSIRO prepopulation library
      const { populateSuccess, populateResult } = await populateQuestionnaire({
        questionnaire: this.questionnaire as QuestionnaireR4,
        fetchResourceCallback: this.fetchResourceCallback,
        fetchResourceRequestConfig: {
          sourceServerUrl: this.config.dataServer,
        },
        patient: patientResource,
        user: userResource,
        encounter: encounterResource,
      });

      if (!populateSuccess || !populateResult) {
        return {
          status: 'error',
          outcome: this.createOperationOutcome('error', 'Failed to populate the questionnaire')
        };
      }

      console.log("Populated response from CSIRO", populateResult.populatedResponse);

      // Set and display the prepopulated response
      this.questionnaireResponse = populateResult.populatedResponse;

      // Build form with questionnaire and prepopulated response
      await buildForm(
        this.questionnaire as QuestionnaireR4,
        this.questionnaireResponse as QuestionnaireResponseR4
      );
      
      // Start watching for changes
      this.startWatchingForChanges();

      return {
        status: 'success',
        outcome: this.createOperationOutcome('information', 'Questionnaire prepopulated successfully')
      };
    } catch (error: any) {
      console.error('[SDC-SWM Renderer] Error during prepopulation:', error);
      return {
        status: 'error',
        outcome: this.createOperationOutcome('error', `Prepopulation failed: ${error.message}`)
      };
    }
  }

  /**
   * Fetch resource callback for CSIRO prepopulation
   * This is called by the prepopulation library to fetch resources needed for prepopulation
   */
  private fetchResourceCallback: FetchResourceCallback = async (
    query: string, 
    requestConfig: FetchResourceRequestConfig
  ) => {
    let { sourceServerUrl } = requestConfig;

    const headers = {
      Accept: "application/json;charset=utf-8",
    };

    if (!sourceServerUrl.endsWith("/")) {
      sourceServerUrl += "/";
    }

    // When query is an absolute URL, use it as is
    if (/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(query)) {
      return axios.get(query, {
        headers: headers,
      });
    }

    // When query is a relative URL, append it to the source server URL
    return axios.get(sourceServerUrl + query, {
      headers: headers,
    });
  };

  /**
   * Helper function to fetch a FHIR resource from a server
   */
  private async fetchResource(serverUrl: string, reference: string): Promise<Resource | undefined> {
    try {
      let url = reference;
      if (!reference.startsWith('http')) {
        url = serverUrl.endsWith('/') ? serverUrl + reference : serverUrl + '/' + reference;
      }

      const response = await axios.get(url, {
        headers: {
          Accept: "application/json;charset=utf-8",
        }
      });

      return response.data;
    } catch (error) {
      console.error('[SDC-SWM Renderer] Error fetching resource:', reference, error);
      return undefined;
    }
  }

  /**
   * Handle request extract message
   * TODO: Implement extraction logic using FHIR Mapping Language or StructureMap
   */
  async handleSdcRequestExtract(message: SdcRequestExtractRequest): Promise<SdcRequestExtractResponsePayload> {
    console.log('[SDC-SWM Renderer] Handling request extract', message.payload);
      let result: SdcRequestExtractResponsePayload = {
      };
    
      console.log('extract questionnaire', this.questionnaire);
      console.log('extract data', this.questionnaireResponse);

    // If message.payload.questionnaireResponse is provided, use it
    // Otherwise, use the currently displayed questionnaire response
    // If message.payload.questionnaire is provided, use it instead of the current one
     try {
      let extractParameters : fhir4.Parameters = {
        resourceType: "Parameters",
        parameter: []
      };
      extractParameters.parameter = [
        {
          name: "questionnaire-response",
          resource: message.payload.questionnaireResponse ?? getResponse()
        }
      ];

      extractParameters.parameter.push({
        name: "questionnaire",
        resource: message.payload.questionnaire ?? this.questionnaire ?? undefined
      });

      const response = await fetch(this.extractServiceUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(extractParameters)
      });
      if (response.ok) {
        const extractResponse = await response.json();
        console.log("Extracted response", extractResponse);

        // if this is a Parameters object and has return and issues, then split them apart...
        if (extractResponse.resourceType === "Parameters") {
          const resultParameters = extractResponse as fhir4.Parameters;
          const returnParameter = resultParameters.parameter?.find(p => p.name === "return");
          if (returnParameter) {
            result.extractedResources = returnParameter.resource as fhir4.Bundle;
          }
          const issuesParameter = resultParameters.parameter?.find(p => p.name === "issues");
          if (issuesParameter) {
            result.outcome = issuesParameter.resource as fhir4.OperationOutcome;
            this.$emit('outcome', issuesParameter.resource);
          }
        }
        else {
          result.extractedResources = extractResponse as fhir4.Bundle;
        }
      }
      else {
        console.error("Failed to extract the questionnaire", response);
      }
    }
    catch (error) {
      console.error("Error extracting the questionnaire", error);
    }

    return result;
  }

  /**
   * Handle ui.done message - user wants to complete/close the form
   * Shows confirmation dialog and returns success if confirmed, error if cancelled
   */
  async handleUiDone(message: UiDoneEvent): Promise<UiDoneResponsePayload> {
    console.log('[SDC-SWM Renderer] Handling ui.done - user wants to close');
    
    // Ask user for confirmation
    const confirmed = window.confirm('Are you sure you want to close the form? Any unsaved changes may be lost.');
    
    if (confirmed) {
      console.log('[SDC-SWM Renderer] User confirmed closure');
      return {
        status: 'success'
      };
    } else {
      console.log('[SDC-SWM Renderer] User cancelled closure');
      return {
        status: 'error',
        statusDetail: {
          text: 'User cancelled the close operation'
        }
      };
    }
  }

  /**
   * Send changed focus event to parent window
   */
  sendChangedFocus(linkId: string, focus_field?: string) {
    const payload: SdcUiChangedFocusPayload = {
      linkId,
      focus_field
    };
    this.sendMessage('sdc.ui.changedFocus', payload);
  }

  /**
   * Send changed questionnaire response event to parent window
   */
  sendChangedQuestionnaireResponse(questionnaireResponse: any, changedLinkIds?: string[]) {
    const payload: SdcUiChangedQuestionnaireResponsePayload = {
      questionnaireResponse,
      changedLinkIds
    };
    this.sendMessage('sdc.ui.changedQuestionnaireResponse', payload);
  }

  /**
   * Handle focus change in renderer
   */
  handleFocusChange(linkId: string) {
    if (this.currentLinkId !== linkId) {
      this.currentLinkId = linkId;
      this.sendChangedFocus(linkId);
    }
  }

  /**
   * Watch for changes in the questionnaire response
   */
  private changeWatchInterval: any = null;

  startWatchingForChanges() {
    // Stop existing watcher if any
    if (this.changeWatchInterval) {
      clearInterval(this.changeWatchInterval);
    }

    // Local variables to track previous response state (scoped to this watcher)
    let previousResponseJson: string = '';
    let previousResponse: QuestionnaireResponse | null = null;

    // Initialize previous response
    try {
      const response = getResponse();
      previousResponseJson = JSON.stringify(response);
      previousResponse = JSON.parse(previousResponseJson);
    } catch (error) {
      console.warn('Could not initialize response watcher', error);
    }

    // Poll for changes every 500ms
    this.changeWatchInterval = setInterval(() => {
      try {
        const response = getResponse();
        const currentResponseJson = JSON.stringify(response);
        
        if (currentResponseJson !== previousResponseJson) {
          // Calculate changed linkIds
          const changedLinkIds = previousResponse 
            ? this.calculateChangedLinkIds(previousResponse, response)
            : undefined;
          
          previousResponseJson = currentResponseJson;
          previousResponse = JSON.parse(currentResponseJson);
          
          // Tag the response
          if (!response.meta?.tag?.find(t => t.code?.startsWith('csiro'))) {
            if (!response.meta) response.meta = { tag: [] };
            if (!response.meta.tag) response.meta.tag = [];
            response.meta.tag!.push({ code: 'csiro:generated' });
          }
          
          // Send change notification with changed linkIds
          this.sendChangedQuestionnaireResponse(response, changedLinkIds);
        }
      } catch (error) {
        console.warn('Error watching for changes', error);
      }
    }, 500);
  }

  /**
   * Calculate which linkIds have changed between two QuestionnaireResponses
   * Recursively compares items and their answers
   */
  private calculateChangedLinkIds(
    oldResponse: QuestionnaireResponse, 
    newResponse: QuestionnaireResponse
  ): string[] {
    const changedLinkIds = new Set<string>();

    // Helper to recursively compare items
    const compareItems = (oldItems: any[] | undefined, newItems: any[] | undefined) => {
      if (!oldItems && !newItems) return;
      if (!oldItems || !newItems) {
        // If one is undefined, all items in the defined one have changed
        (newItems || oldItems || []).forEach((item: any) => {
          if (item.linkId) changedLinkIds.add(item.linkId);
          if (item.item) compareItems(undefined, item.item);
        });
        return;
      }

      // Create maps by linkId for efficient lookup
      const oldItemMap = new Map<string, any>();
      const newItemMap = new Map<string, any>();
      
      oldItems.forEach(item => {
        if (item.linkId) oldItemMap.set(item.linkId, item);
      });
      
      newItems.forEach(item => {
        if (item.linkId) newItemMap.set(item.linkId, item);
      });

      // Check all linkIds (both old and new)
      const allLinkIds = new Set([...oldItemMap.keys(), ...newItemMap.keys()]);
      
      allLinkIds.forEach(linkId => {
        const oldItem = oldItemMap.get(linkId);
        const newItem = newItemMap.get(linkId);

        if (!oldItem || !newItem) {
          // Item was added or removed
          changedLinkIds.add(linkId);
          return;
        }

        // Compare answers
        const oldAnswerJson = JSON.stringify(oldItem.answer || []);
        const newAnswerJson = JSON.stringify(newItem.answer || []);
        
        if (oldAnswerJson !== newAnswerJson) {
          changedLinkIds.add(linkId);
        }

        // Recursively compare nested items
        if (oldItem.item || newItem.item) {
          const nestedChanges = new Set<string>();
          const tempChangedLinkIds = changedLinkIds;
          
          // Temporarily capture nested changes
          compareItems(oldItem.item, newItem.item);
          
          // If any nested items changed, mark parent as changed too
          if (nestedChanges.size > 0) {
            changedLinkIds.add(linkId);
          }
        }
      });
    };

    // Start comparison at the root level
    compareItems(oldResponse.item, newResponse.item);

    return Array.from(changedLinkIds);
  }

  /**
   * Send an unsolicited message to the parent window (renderer-initiated events)
   * Used for event notifications like focus changes and response updates
   * NOTE: Per protocol, host initiates handshake, so this is NOT used for initial handshake
   * These messages require an established messagingHandle from the host
   */
  sendMessage(messageType: SdcMessageType, payload: any) {
    const messageId = this.generateMessageId();
    const message: SmartWebMessagingRequest = {
      messagingHandle: this.messagingHandle || '',
      messageId,
      messageType,
      payload
    };
    
    // Validate we have a messagingHandle (should be set by host's handshake)
    if (!this.messagingHandle) {
      console.error('[SDC-SWM Renderer] Cannot send message - no messagingHandle established. Host must send handshake first.', messageType);
      return;
    }
    
    console.log('[SDC-SWM Renderer] Sending renderer-initiated event:', messageType, message);
    
    // Determine the target window: use stored message source, opener, or parent
    const targetWindow = this.messageSource || window.opener || window.parent;
    
    if (targetWindow && targetWindow !== window) {
      const targetOrigin = this.allowedOrigin || '*';
      targetWindow.postMessage(message, targetOrigin);
    } else {
      console.warn('[SDC-SWM Renderer] No target window to send message to');
    }
  }

  /**
   * Send a response to a received message (solicited responses)
   * NOTE: Responses do NOT include messagingHandle per SMART-WM protocol
   */
  sendResponse(responseToMessageId: string, payload: any) {
    const response: SmartWebMessagingResponse = {
      messageId: this.generateMessageId(),
      responseToMessageId,
      payload
    };
    
    console.log('[SDC-SWM Renderer] Sending response for message:', responseToMessageId, response);
    
    // Determine the target window: use stored message source, opener, or parent
    const targetWindow = this.messageSource || window.opener || window.parent;
    
    if (targetWindow && targetWindow !== window) {
      const targetOrigin = this.allowedOrigin || '*';
      targetWindow.postMessage(response, targetOrigin);
    } else {
      console.warn('[SDC-SWM Renderer] No target window to send response to');
    }
  }

  /**
   * Generate a unique message ID
   */
  generateMessageId(): string {
    return `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Create an OperationOutcome resource
   */
  createOperationOutcome(severity: 'error' | 'warning' | 'information' | 'fatal', message: string): OperationOutcome {
    return {
      resourceType: 'OperationOutcome',
      issue: [
        {
          severity,
          code: severity === 'error' || severity === 'fatal' ? 'processing' : 'informational',
          diagnostics: message
        }
      ]
    };
  }
}
</script>
