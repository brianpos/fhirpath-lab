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
import { Questionnaire as QuestionnaireR4, QuestionnaireResponse as QuestionnaireResponseR4 } from "fhir/r4";
import SmartFormsRendererWithFocus from "~/components/Questionnaire/ReactRenderer";

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
  SdcUiChangedFocusPayload,
  SdcUiChangedQuestionnaireResponsePayload,
  SdcRendererMessageHandlers
} from '~/types/sdc-swm-types';

/**
 * SDC-SWM CSIRO Smart Forms Renderer Page
 * 
 * This page implements the SMART Web Messaging for Structured Data Capture (SDC-SWM) protocol
 * as a renderer that runs inside an iframe.
 * 
 * Implements the following incoming message handlers (Host → Renderer):
 * - status.handshake: Initial handshake to establish communication
 * - sdc.configure: Receive configuration (terminology server, data server, etc.)
 * - sdc.configureContext: Receive context data (patient, encounter, author, etc.)
 * - sdc.displayQuestionnaire: Display a questionnaire with optional context
 * - sdc.displayQuestionnaireResponse: Display a questionnaire response
 * - sdc.requestCurrentQuestionnaireResponse: Return current form data
 * 
 * Sends the following messages to host (Renderer → Host):
 * - status.handshake: Initial handshake when renderer loads
 * - sdc.ui.changedFocus: Notify when user focus changes
 * - sdc.ui.changedQuestionnaireResponse: Notify when form data changes
 * 
 * @see docs/sdc-swm-protocol.md for complete protocol specification
 */
@Component({
  components: {
    Renderer: applyReactInVue(SmartFormsRendererWithFocus)
  },
  layout: 'empty' // Use empty layout to remove all chrome
})
export default class SwmCsiroSmartForms extends Vue implements SdcRendererMessageHandlers {
  questionnaire: Questionnaire | null = null;
  questionnaireResponse: QuestionnaireResponse | null = null;
  context: QuestionnaireContext = {};
  config: SdcConfigureRequestPayload = {};
  handshakeComplete: boolean = false;
  currentLinkId: string | null = null;
  messagingHandle: string | null = null; // Store the messaging handle from the host
  allowedOrigin: string | null = null; // Store the allowed origin for security

  // Non-reactive property to avoid cross-origin security errors with WindowProxy
  // Stored outside Vue's reactivity system to prevent __v_isRef access across origins
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
    'sdc.requestCurrentQuestionnaireResponse': 'handleSdcRequestCurrentQuestionnaireResponse'
  };

  get onFocusChanged() {
    return (linkId: string) => { this.handleFocusChange(linkId); }
  }

  mounted() {
    // Initialize non-reactive property
    this.messageSource = null;
    
    // Register message listener
    window.addEventListener('message', this.handleMessage);
    
    // Send initial handshake to parent
    this.sendHandshake();
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
    
    // Filter out React DevTools messages
    if (event.data?.source?.startsWith("react-devtools-")
    //  || event.data?.startsWith("setImmediate")
    ) {
      return;
    }

    // Validate message structure (REQUIRED by protocol)
    if (!message.messageId || !message.messageType) {
      console.warn('[SDC-SWM Renderer] Invalid message received - missing messageId or messageType', message);
      return;
    }

    // Origin validation (SECURITY REQUIREMENT)
    // On first handshake, store the origin; on subsequent messages, validate against it
    if (message.messageType === 'status.handshake' && !this.allowedOrigin) {
      // First handshake - establish the allowed origin
      this.allowedOrigin = event.origin;
      console.log('[SDC-SWM Renderer] Establishing allowed origin:', this.allowedOrigin);
    } else if (this.allowedOrigin && event.origin !== this.allowedOrigin) {
      console.warn('[SDC-SWM Renderer] Ignoring message from unauthorized origin:', event.origin, 'expected:', this.allowedOrigin);
      return;
    }

    // MessagingHandle validation (REQUIRED by protocol)
    // On first handshake, store the handle; on subsequent messages, validate against it
    if (message.messageType === 'status.handshake' && !this.messagingHandle) {
      // First handshake - store the messaging handle
      if (!message.messagingHandle) {
        console.warn('[SDC-SWM Renderer] Handshake missing messagingHandle');
        return;
      }
      this.messagingHandle = message.messagingHandle;
      console.log('[SDC-SWM Renderer] Establishing messaging handle:', this.messagingHandle);
    } else if (this.messagingHandle && message.messagingHandle !== this.messagingHandle) {
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
        outcome: this.createOperationOutcome('error', 'No questionnaire provided') as any
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
        outcome: this.createOperationOutcome('error', `Failed to build form: ${error.message}`) as any
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
        outcome: this.createOperationOutcome('error', 'No questionnaire response provided') as any
      };
    }

    this.questionnaireResponse = message.payload.questionnaireResponse as QuestionnaireResponse;
    
    // If questionnaire is provided, use it
    if (message.payload.questionnaire) {
      this.questionnaire = message.payload.questionnaire as Questionnaire;
    }
    
    // TODO: Resolve questionnaire from reference if not provided
    if (!this.questionnaire) {
      return {
        status: 'error',
        outcome: this.createOperationOutcome('error', 'Questionnaire must be provided or contained in response') as any
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
        outcome: this.createOperationOutcome('error', `Failed to build form: ${error.message}`) as any
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
   * Send handshake to parent window
   */
  sendHandshake() {
    this.sendMessage('status.handshake', {});
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
  private previousResponseJson: string = '';
  private changeWatchInterval: any = null;

  startWatchingForChanges() {
    // Stop existing watcher if any
    if (this.changeWatchInterval) {
      clearInterval(this.changeWatchInterval);
    }

    // Initialize previous response
    try {
      const response = getResponse();
      this.previousResponseJson = JSON.stringify(response);
    } catch (error) {
      console.warn('Could not initialize response watcher', error);
    }

    // Poll for changes every 500ms
    this.changeWatchInterval = setInterval(() => {
      try {
        const response = getResponse();
        const currentResponseJson = JSON.stringify(response);
        
        if (currentResponseJson !== this.previousResponseJson) {
          this.previousResponseJson = currentResponseJson;
          
          // Tag the response
          if (!response.meta?.tag?.find(t => t.code?.startsWith('csiro'))) {
            if (!response.meta) response.meta = { tag: [] };
            if (!response.meta.tag) response.meta.tag = [];
            response.meta.tag!.push({ code: 'csiro:generated' });
          }
          
          // Send change notification
          // TODO: Calculate changed linkIds by comparing responses
          this.sendChangedQuestionnaireResponse(response);
        }
      } catch (error) {
        console.warn('Error watching for changes', error);
      }
    }, 500);
  }

  /**
   * Send a message to the parent window or opener (unsolicited REQUEST messages from renderer)
   * These are REQUEST messages initiated by the renderer, so they include messagingHandle
   */
  sendMessage(messageType: SdcMessageType, payload: any) {
    const messageId = this.generateMessageId();
    const message: SmartWebMessagingRequest = {
      messagingHandle: this.messagingHandle || '',
      messageId,
      messageType,
      payload
    };
    
    console.log('[SDC-SWM Renderer] Sending renderer-initiated request:', messageType, message);
    
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
