<template>
  <div style="height: 100%; overflow-y: auto">
    <template v-if="questionnaire">
      <p class="mb-3">
        Smart Web Messaging test app.<br />
        This will open a new instance of the fhirpath-lab in a new window, then
        permit you to send messages to it. Effectively creating a "tester" for
        the tester.
      </p>

      <v-card outlined class="mb-3">
        <v-card-title class="subtitle-1">Connection</v-card-title>
        <v-card-text>
          <v-text-field
            hide-details="auto"
            v-model="fhirPathLabUrl"
            label="FHIRPath Lab URL"
            dense
          >
            <template v-slot:append>
              <v-btn small tile @click="openFhirPathLab">
                <v-icon>mdi-window-open</v-icon> Launch
              </v-btn>
            </template>
          </v-text-field>

          <div v-if="isWindowConnected" style="color: green; margin-top: 8px">
            <v-icon color="success">mdi-check-circle</v-icon>
            Connected to popup window
          </div>
          <div v-else style="color: gray; margin-top: 8px">
            <v-icon color="grey">mdi-close-circle</v-icon>
            No connection - open fhirpath-lab first
          </div>
        </v-card-text>
      </v-card>

      <v-card outlined class="mb-3">
        <v-card-title class="subtitle-1">Core Messages</v-card-title>
        <v-card-text>
          <v-btn
            color="primary"
            @click="sendStatusHandshake"
            :disabled="!isWindowConnected"
            class="mr-2 mb-2"
          >
            <v-icon left>mdi-handshake</v-icon>
            Handshake
          </v-btn>

          <v-btn
            color="primary"
            @click="sendDisplayQuestionnaire"
            :disabled="!isWindowConnected"
            class="mr-2 mb-2"
          >
            <v-icon left>mdi-file-send</v-icon>
            Send Questionnaire
          </v-btn>

          <v-btn
            color="primary"
            @click="sendDisplayQuestionnaireResponse"
            :disabled="!isWindowConnected || !formData"
            class="mr-2 mb-2"
            :title="
              !formData
                ? 'No response data - use \'Read Local Response\' first'
                : 'Load response into popup'
            "
          >
            <v-icon left>mdi-file-upload</v-icon>
            Send Response
            <v-icon v-if="!formData" right small color="warning"
              >mdi-alert-circle</v-icon
            >
          </v-btn>

          <v-btn
            color="primary"
            @click="sendRequestCurrentQuestionnaireResponse"
            :disabled="!isWindowConnected"
            class="mr-2 mb-2"
          >
            <v-icon left>mdi-file-download</v-icon>
            Request Response
          </v-btn>

          <v-checkbox
            v-model="propagateChangesToLabOnChangeQREvents"
            label="Propagate changes to lab on 'changedQuestionnaireResponse' events"
            dense
            class="mt-2"
          />
        </v-card-text>
      </v-card>

      <MessageLog
        :messages="messageLog"
        title="Message Log"
        @clear="clearMessageLog"
      />

      <v-card outlined class="mb-3" v-if="false">
        <v-card-title class="subtitle-1">UI Control Messages</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="testLinkId"
            label="LinkId for testing"
            placeholder="e.g., patient.name"
            outlined
            dense
            class="mb-2"
          ></v-text-field>

          <v-btn
            color="secondary"
            @click="sendFocusRequest"
            :disabled="!isWindowConnected || !testLinkId"
            class="mr-2 mb-2"
          >
            <v-icon left>mdi-cursor-pointer</v-icon>
            Focus Field
          </v-btn>

          <v-btn
            color="secondary"
            @click="sendHighlightRequest"
            :disabled="!isWindowConnected || !testLinkId"
            class="mr-2 mb-2"
          >
            <v-icon left>mdi-marker</v-icon>
            Highlight Field
          </v-btn>

          <v-btn
            color="secondary"
            @click="sendResetRequest"
            :disabled="!isWindowConnected"
            class="mr-2 mb-2"
          >
            <v-icon left>mdi-refresh</v-icon>
            Reset Form
          </v-btn>
        </v-card-text>
      </v-card>
    </template>
    <template v-else>
      <p>No questionnaire provided</p>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Questionnaire, QuestionnaireResponse } from "fhir/r4b";
import MessageLog from "./MessageLog.vue";
import { MessageLogEntry } from "~/helpers/message-logger";

// Import SDC-SWM Protocol Types
import type {
  SmartWebMessagingRequest,
  SmartWebMessagingResponse,
  StatusHandshakeRequest,
  StatusHandshakeResponse,
  StatusHandshakeResponsePayload,
  SdcDisplayQuestionnaireRequest,
  SdcDisplayQuestionnaireResponseRequest,
  SdcRequestCurrentQuestionnaireResponseRequest,
  SdcRequestCurrentQuestionnaireResponseResponsePayload,
  SdcUiChangedFocusPayload,
  SdcUiChangedQuestionnaireResponsePayload,
  SdcHostMessageHandlers,
  SdcUiChangedFocusEvent,
  SdcUiChangedFocusResponsePayload,
  SdcUiChangedQuestionnaireResponseEvent,
  SdcUiChangedQuestionnaireResponseResponsePayload,
  UiDoneEvent,
  UiDoneResponsePayload,
} from "~/types/sdc-swm-types";
import { ContextData } from "../QuestionnaireContext.vue";

/**
 * SDC-SWM Host Component
 * 
 * This component implements the SMART Web Messaging for Structured Data Capture (SDC-SWM) protocol
 * as a host that communicates with a renderer running in a popup window.
 * 
 * Sends the following messages to renderer (Host → Renderer):
 * - status.handshake: Initial handshake to establish communication
 * - sdc.displayQuestionnaire: Send questionnaire to renderer
 * - sdc.displayQuestionnaireResponse: Send questionnaire response to renderer
 * - sdc.requestCurrentQuestionnaireResponse: Request current form data
 * 
 * Handles the following incoming messages from renderer (Renderer → Host):
 * - status.handshake: Handshake response from renderer
 * - sdc.ui.changedFocus: Notification when renderer focus changes
 * - sdc.ui.changedQuestionnaireResponse: Notification when form data changes
 * 
 * @see docs/sdc-swm-protocol.md for complete protocol specification
 */
@Component({
  components: {
    MessageLog,
  },
})
export default class SmartWMFormSection extends Vue implements SdcHostMessageHandlers {
  @Prop(Object) readonly questionnaire!: Questionnaire;
  @Prop(Object) readonly context!: ContextData;
  @Prop(String) readonly dataServer!: string;

  isWindowConnected: boolean = false;
  windowCheckInterval: number | null = null;
  fhirPathLabUrl: string = "http://localhost:3000/Questionnaire/tester";
  requestCurrentResponseMessageIdQueue: string[] = [];
  propagateChangesToLabOnChangeQREvents: boolean = false;

  // Generate unique handles for this session
  messagingHandle: string = "";
  messagingOrigin: string = "";

  // UI testing
  testLinkId: string = "patient.name";
  messageLog: MessageLogEntry[] = [];

  // Reactive form data - now a component property instead of module-level
  formData: QuestionnaireResponse | undefined = undefined;

  // Non-reactive property to avoid cross-origin security errors with WindowProxy
  // Initialized in mounted() to prevent Vue's reactivity system from wrapping it
  declare private popupWindow: WindowProxy | null;

  /**
   * Message type to handler method mapping
   * This is the ONLY place that maps message types to handler methods for renderer-initiated events
   */
  private readonly messageHandlerMap: Record<string, keyof SdcHostMessageHandlers> = {
    'status.handshake': 'handleStatusHandshake',
    'sdc.ui.changedFocus': 'handleChangedFocus',
    'sdc.ui.changedQuestionnaireResponse': 'handleChangedQuestionnaireResponse',
    'ui.done': 'handleUiDone'
  };

  async mounted() {
    // Initialize non-reactive properties
    this.popupWindow = null;
    
    // Generate messaging handle and origin
    this.messagingHandle = this.generateHandle();
    this.messagingOrigin = window.location.origin;
    console.log(
      "[SDC-SWM Host] Initialized with handle:",
      this.messagingHandle
    );

    // Listen for messages from the popup
    window.addEventListener("message", this.handleMessage);
  }

  beforeDestroy() {
    // Remove message listener
    window.removeEventListener("message", this.handleMessage);

    // Clean up interval when component is destroyed
    if (this.windowCheckInterval) {
      clearInterval(this.windowCheckInterval);
    }
  }

  /**
   * Generate a unique messaging handle for this session
   */
  generateHandle(): string {
    return "test-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Generate a unique message ID
   */
  generateMessageId(): string {
    return "msg-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Handle incoming messages from renderer window
   */
  handleMessage(event: MessageEvent) {
    // console.log("[SDC-SWM Host] RAW message event received:", {
    //   origin: event.origin,
    //   hasSource: !!event.source,
    //   messageType: event.data?.messageType,
    //   expectedOrigin: this.fhirPathLabUrl,
    //   hasPopupWindow: !!this.popupWindow,
    //   sourceMatchesPopup: event.source === this.popupWindow,
    // });
    
    const msg = event.data as SmartWebMessagingRequest | SmartWebMessagingResponse;

    // Filter out React DevTools messages
    if (event.data?.source?.startsWith("react-devtools-")) {
      return;
    }

    // If the message doesn't have our messagingHandle or responseToMessageId, it's not for us
    const isRequest = 'messageType' in msg && msg.messagingHandle === this.messagingHandle;
    const isResponse = 'responseToMessageId' in msg;
    
    if (!isRequest && !isResponse) {
      // Not our message, ignore silently (could be for Aidbox or other components)
      return;
    }

    // Validate origin
    if (!this.fhirPathLabUrl.startsWith(event.origin)) {
      console.log(
        "[SDC-SWM Host] Ignoring message from unexpected origin:",
        event.origin
      );
      return;
    }

    // Validate source if we have a popup reference
    if (this.popupWindow && event.source !== this.popupWindow) {
      console.log("[SDC-SWM Host] Ignoring message from different window");
      return;
    }

    console.log("[SDC-SWM Host] Received message from renderer:", msg);

    // Handle unsolicited messages from renderer (events)
    if (isRequest && 'messageType' in msg) {
      this.handleRendererEvent(msg as SmartWebMessagingRequest);
      return;
    }

    // Handle responses to our requests
    if (isResponse && 'responseToMessageId' in msg) {
      this.handleRendererResponse(msg as SmartWebMessagingResponse);
    }
  }

  /**
   * Handle unsolicited event messages from renderer using central dispatch pattern
   * Similar to the renderer's message handling - each handler returns just the payload
   */
  async handleRendererEvent(msg: SmartWebMessagingRequest) {
    console.log("[SDC-SWM Host] Handling renderer event:", msg.messageType);
    
    try {
      // Look up the handler method name from the map
      const handlerMethodName = this.messageHandlerMap[msg.messageType];
      
      if (!handlerMethodName) {
        // Unknown message type
        console.warn('[SDC-SWM Host] Unknown message type:', msg.messageType);
        this.sendEventResponse(msg.messageId, {
          status: 'error',
          statusDetail: { message: `Unknown message type: ${msg.messageType}` }
        });
        return;
      }
      
      // Get the handler function
      const handler = (this as any)[handlerMethodName] as Function | undefined;
      
      if (!handler || typeof handler !== 'function') {
        // Handler not implemented
        console.warn('[SDC-SWM Host] Handler not implemented:', msg.messageType);
        this.sendEventResponse(msg.messageId, {
          status: 'error',
          statusDetail: { message: `Handler not implemented: ${msg.messageType}` }
        });
        return;
      }
      
      // Call the handler with the full message - it returns just the payload
      const responsePayload = await handler.call(this, msg);
      
      // Wrap the payload in a proper response message and send it
      const response: SmartWebMessagingResponse = {
        messageId: this.generateMessageId(),
        responseToMessageId: msg.messageId,
        payload: responsePayload
      };
      
      if (this.popupWindow && !this.popupWindow.closed) {
        console.log("[SDC-SWM Host] Sending event response:", response);
        this.popupWindow.postMessage(response, this.fhirPathLabUrl);
      }
      
      // Log the message
      this.logMessage(
        "received",
        msg.messageType || "unknown",
        "unsolicited - " + this.summarizeMessage(msg),
        msg
      );
      
    } catch (error: any) {
      console.error('[SDC-SWM Host] Error handling renderer event:', msg.messageType, error);
      this.sendEventResponse(msg.messageId, {
        status: 'error',
        statusDetail: { message: error.message || 'Unknown error' }
      });
    }
  }

  /**
   * Handle handshake event from renderer
   * Per protocol: Renderer initiates handshake as REQUEST, host responds with capabilities
   */
  async handleStatusHandshake(message: StatusHandshakeRequest): Promise<StatusHandshakeResponsePayload> {
    console.log("[SDC-SWM Host] Renderer handshake received:", message.payload);
    
    // Return protocol-compliant handshake response payload
    return {
      application: {
        name: 'FHIRPath Lab',
        version: '2.0',
        publisher: 'Brian Postlethwaite'
      },
      capabilities: {
        extraction: false,
        focusChangeNotifications: false
      }
    };
  }

  /**
   * Handle changed focus event from renderer
   */
  async handleChangedFocus(event: SdcUiChangedFocusEvent): Promise<SdcUiChangedFocusResponsePayload> {
    console.log("[SDC-SWM Host] Focus changed to:", event.payload.linkId);
    
    if (event.payload.linkId) {
      this.$emit('highlight-path', event.payload.linkId);
    }
    
    return { status: 'success' };
  }

  /**
   * Handle changed questionnaire response event from renderer
   */
  async handleChangedQuestionnaireResponse(event: SdcUiChangedQuestionnaireResponseEvent): Promise<SdcUiChangedQuestionnaireResponseResponsePayload> {
    console.log("[SDC-SWM Host] Questionnaire response changed");
    
    if (event.payload.questionnaireResponse && this.propagateChangesToLabOnChangeQREvents) {
      this.formData = event.payload.questionnaireResponse as QuestionnaireResponse;
      this.$emit("response", this.formData);
    }
    
    return { status: 'success' };
  }

  /**
   * Handle ui.done event from renderer
   * Per protocol: user has completed interaction and wants to close the renderer
   */
  async handleUiDone(event: UiDoneEvent): Promise<UiDoneResponsePayload> {
    console.log("[SDC-SWM Host] User wants to close renderer (ui.done)");
    
    // Optionally retrieve final form data before closing
    // This is commented out but shows the recommended pattern:
    // this.sendRequestCurrentQuestionnaireResponse();
    
    // Close the popup window
    if (this.popupWindow && !this.popupWindow.closed) {
      this.popupWindow.close();
      this.popupWindow = null;
      this.isWindowConnected = false;
    }
    
    return { status: 'success' };
  }

  /**
   * Send response to renderer-initiated event (acknowledgment)
   * Per protocol: renderer-initiated messages are REQUEST messages that require acknowledgment
   * Note: This is now primarily used for error responses; success responses go through handleRendererEvent
   */
  sendEventResponse(responseToMessageId: string, payload: { status: 'success' | 'error'; statusDetail?: any }) {
    if (!this.popupWindow || this.popupWindow.closed) {
      console.warn("[SDC-SWM Host] Cannot send event response - window closed");
      return;
    }

    const response: SmartWebMessagingResponse = {
      messageId: this.generateMessageId(),
      responseToMessageId,
      payload
    };

    console.log("[SDC-SWM Host] Sending event acknowledgment:", response);
    this.popupWindow.postMessage(response, this.fhirPathLabUrl);
  }

  /**
   * Handle responses from renderer to our requests
   */
  handleRendererResponse(msg: SmartWebMessagingResponse) {
    console.log("[SDC-SWM Host] Handling renderer response to:", msg.responseToMessageId);

    // Check if this is a response to sdc.requestCurrentQuestionnaireResponse
    const queueIndex = this.requestCurrentResponseMessageIdQueue.indexOf(msg.responseToMessageId);
    if (queueIndex >= 0) {
      this.requestCurrentResponseMessageIdQueue.splice(queueIndex, 1);
      this.handleRequestCurrentQuestionnaireResponseResponse(msg);
      return;
    }

    // Log the response
    this.logMessage(
      "received",
      "response",
      this.summarizeMessage(msg),
      msg
    );
  }

  /**
   * Handle response to sdc.requestCurrentQuestionnaireResponse
   * (Renderer returns the current QuestionnaireResponse data)
   */
  handleRequestCurrentQuestionnaireResponseResponse(msg: SmartWebMessagingResponse<SdcRequestCurrentQuestionnaireResponseResponsePayload>) {
    if (msg.payload.questionnaireResponse) {
      const response: QuestionnaireResponse = msg.payload.questionnaireResponse as QuestionnaireResponse;
      this.formData = response;
      console.log("[SDC-SWM Host] QuestionnaireResponse received from renderer:", response);

      // Ensure there is a tag for the smartwm renderer in place
      if (!response.meta?.tag?.find((t) => t.code?.startsWith("smartwm"))) {
        if (!response.meta) response.meta = { tag: [] };
        if (!response.meta.tag) response.meta.tag = [];
        response.meta.tag!.push({ code: "smartwm:generated" });
      }

      // Remove other renderer tags
      const tagsToRemove = ["lforms", "csiro", "aidbox"];
      tagsToRemove.forEach(tagPrefix => {
        if (response.meta?.tag?.find((t) => t.code?.startsWith(tagPrefix))) {
          response.meta!.tag = response.meta!.tag!.filter(
            (t) => !t.code?.startsWith(tagPrefix)
          );
        }
      });

      this.$emit("response", response);

      this.logMessage(
        "received",
        "response",
        "sdc.requestCurrentQuestionnaireResponse response - " + response.id,
        msg
      );
    }
  }

  /**
   * Log a message to the message log
   */
  logMessage(
    direction: "sent" | "received" | "local",
    type: string,
    summary: string,
    data?: any
  ) {
    const timestamp = new Date().toLocaleTimeString();
    this.messageLog.push({
      direction,
      timestamp,
      type,
      summary,
      data,
    });

    // Keep only last 50 messages
    if (this.messageLog.length > 50) {
      this.messageLog.shift();
    }
  }

  /**
   * Clear the message log
   */
  clearMessageLog() {
    this.messageLog = [];
  }

  /**
   * Summarize a message for display in the log
   */
  summarizeMessage(msg: SmartWebMessagingRequest | SmartWebMessagingResponse): string {
    if (!msg.payload) {
      // Handle responses without payload
      if ('responseToMessageId' in msg) {
        return "Response (no payload)";
      }
      return "No payload";
    }

    // Check status first (common in responses)
    if (msg.payload.status === "ready") {
      return `Ready - Protocol: ${msg.payload.protocolVersion || "unknown"}`;
    }
    if (msg.payload.status === "success") {
      return "Success";
    }
    if (msg.payload.status === "error") {
      return `Error: ${
        msg.payload.outcome?.issue?.[0]?.diagnostics || "Unknown error"
      }`;
    }

    // Handle handshake response
    if (msg.payload.application) {
      const caps = msg.payload.capabilities
        ? ` (${Object.keys(msg.payload.capabilities)
            .filter((k) => msg.payload.capabilities[k])
            .join(", ")})`
        : "";
      return `App: ${msg.payload.application.name} v${msg.payload.application.version}${caps}`;
    }

    // Handle extracted response
    if (msg.payload.questionnaireResponse) {
      const qr = msg.payload.questionnaireResponse;
      return `Response: ${qr.id || "no-id"}, Status: ${qr.status}`;
    }

    // Handle validation outcome
    if (msg.payload.outcome) {
      const issues = msg.payload.outcome.issue?.length || 0;
      const valid =
        msg.payload.valid !== undefined
          ? msg.payload.valid
            ? " ✓"
            : " ✗"
          : "";
      return `${issues} issue(s)${valid}`;
    }

    // Handle response update events
    if ('messageType' in msg && msg.messageType === "sdc.ui.changedQuestionnaireResponse") {
      return "Response updated";
    }

    return JSON.stringify(msg.payload).substring(0, 100);
  }

  /**
   * Check if popup window is still connected
   */
  checkWindowConnection() {
    try {
      if (this.popupWindow && !this.popupWindow.closed) {
        this.isWindowConnected = true;
      } else {
        this.isWindowConnected = false;
        this.popupWindow = null;
        if (this.windowCheckInterval) {
          clearInterval(this.windowCheckInterval);
          this.windowCheckInterval = null;
        }
      }
    } catch (e) {
      // Cross-origin access error - assume window is still open
      // This happens when the popup is on a different origin
      if (this.popupWindow) {
        this.isWindowConnected = true;
      }
    }
  }

  /**
   * Open FHIRPath Lab in a popup window
   */
  openFhirPathLab() {
    // If there's already an open window, focus it instead of opening a new one
    if (this.popupWindow && !this.popupWindow.closed) {
      this.popupWindow.focus();
      return;
    }

    // Build URL with embedded mode parameters
    const params = new URLSearchParams({
      embedded_mode: "true",
      messaging_handle: this.messagingHandle,
      messaging_origin: this.messagingOrigin,
    });

    const url = this.fhirPathLabUrl + `?${params}`;
    console.log("[SDC-SWM Host] Opening renderer popup with URL:", url);

    // Open window IMMEDIATELY during user gesture - don't wait for async operations
    const newWindow = window.open(
      url,
      "fhirpath-lab-popup",
      "width=1200,height=900,menubar=no,toolbar=no,location=yes,scrollbars=yes"
    );

    if (newWindow) {
      this.popupWindow = newWindow;
      this.isWindowConnected = true;

      // Focus happens immediately
      try {
        newWindow.focus();
      } catch (e) {
        console.warn("Could not focus popup window:", e);
      }

      // Set up periodic check for window status
      if (this.windowCheckInterval) {
        clearInterval(this.windowCheckInterval);
      }
      this.windowCheckInterval = window.setInterval(() => {
        this.checkWindowConnection();
      }, 1000);

      // Wait a moment to ensure the new window is fully loaded and initialized
      setTimeout(() => {
        console.log("[SDC-SWM Host] Sending initial status.handshake");
        this.sendStatusHandshake();
      }, 1500);
    } else {
      // Provide more helpful instructions
      this.isWindowConnected = false;
      alert(
        "Pop-up blocked! Please:\n1. Click the popup blocker icon in your browser's address bar\n2. Allow popups for this site\n3. Try again"
      );
    }
  }

  /**
   * Send status.handshake message to renderer
   */
  sendStatusHandshake() {
    if (!this.popupWindow || this.popupWindow.closed) {
      console.warn(
        "[SDC-SWM Host] Cannot send status.handshake - renderer window not available"
      );
      return;
    }

    const message: StatusHandshakeRequest = {
      messagingHandle: this.messagingHandle,
      messageId: this.generateMessageId(),
      messageType: "status.handshake",
      payload: {
        protocolVersion: "1.0",
        fhirVersion: "R4",
      },
    };

    console.log("[SDC-SWM Host] Sending status.handshake:", message);
    this.logMessage(
      "sent",
      "status.handshake",
      "Protocol v1.0, FHIR R4",
      message
    );

    try {
      this.popupWindow.postMessage(message, this.fhirPathLabUrl);
      console.log("[SDC-SWM Host] ✅ postMessage called successfully");
    } catch (error) {
      console.error("[SDC-SWM Host] ❌ postMessage failed:", error);
    }
  }

  /**
   * Send sdc.displayQuestionnaire to renderer
   */
  sendDisplayQuestionnaire() {
    // Use the existing popup window instead of opening a new one
    if (this.popupWindow && !this.popupWindow.closed) {
      this.popupWindow.focus();

      // Send the questionnaire using SMART Web Messaging format
      const message: SdcDisplayQuestionnaireRequest = {
        messagingHandle: this.messagingHandle,
        messageId: this.generateMessageId(),
        messageType: "sdc.displayQuestionnaire",
        payload: {
          questionnaire: this.questionnaire as any, // R4B to R4 conversion
          // questionnaireResponse: this.formData || undefined, // intentionally not sending the data
        },
      };

      console.log("[SDC-SWM Host] Sending sdc.displayQuestionnaire:", message);
      this.logMessage(
        "sent",
        "sdc.displayQuestionnaire",
        `Q: ${this.questionnaire.title || this.questionnaire.id}`,
        message
      );
      this.popupWindow.postMessage(message, this.fhirPathLabUrl);
    } else {
      // If window was closed, update the state and inform the user
      this.isWindowConnected = false;
      this.popupWindow = null;
      alert("The popup window is closed. Please open fhirpath-lab first.");
    }
  }

  /**
   * Send sdc.displayQuestionnaireResponse to renderer
   */
  sendDisplayQuestionnaireResponse() {
    if (!this.popupWindow || this.popupWindow.closed) {
      alert("The popup window is closed. Please open fhirpath-lab first.");
      return;
    }

    if (!this.formData) {
      alert("No response data available. Use 'Read Local Response' first.");
      return;
    }

    this.popupWindow.focus();

    const message: SdcDisplayQuestionnaireResponseRequest = {
      messagingHandle: this.messagingHandle,
      messageId: this.generateMessageId(),
      messageType: "sdc.displayQuestionnaireResponse",
      payload: {
        questionnaireResponse: this.formData as any, // R4B to R4 conversion
      },
    };

    console.log("[SDC-SWM Host] Sending sdc.displayQuestionnaireResponse:", message);
    this.logMessage(
      "sent",
      "sdc.displayQuestionnaireResponse",
      `Response: ${this.formData?.id || "no-id"}`,
      message
    );
    this.popupWindow.postMessage(message, this.fhirPathLabUrl);
  }

  /**
   * Send sdc.requestCurrentQuestionnaireResponse to renderer
   * (Request the current QuestionnaireResponse data from the renderer)
   */
  sendRequestCurrentQuestionnaireResponse() {
    if (!this.popupWindow || this.popupWindow.closed) {
      alert("The popup window is closed. Please open fhirpath-lab first.");
      return;
    }

    this.popupWindow.focus();

    const message: SdcRequestCurrentQuestionnaireResponseRequest = {
      messagingHandle: this.messagingHandle,
      messageId: this.generateMessageId(),
      messageType: "sdc.requestCurrentQuestionnaireResponse",
      payload: {},
    };
    this.requestCurrentResponseMessageIdQueue.push(message.messageId);

    console.log("[SDC-SWM Host] Sending sdc.requestCurrentQuestionnaireResponse:", message);
    this.logMessage(
      "sent",
      "sdc.requestCurrentQuestionnaireResponse",
      "Request current response",
      message
    );
    this.popupWindow.postMessage(message, this.fhirPathLabUrl);
  }

  /**
   * Send focus request to renderer (UI control message)
   */
  sendFocusRequest() {
    if (!this.popupWindow || this.popupWindow.closed) {
      alert("The popup window is closed. Please open fhirpath-lab first.");
      return;
    }

    if (!this.testLinkId) {
      alert("Please enter a linkId to focus.");
      return;
    }

    this.popupWindow.focus();

    const message: SmartWebMessagingRequest = {
      messagingHandle: this.messagingHandle,
      messageId: this.generateMessageId(),
      messageType: "questionnaire.ui.focus",
      payload: {
        linkId: this.testLinkId,
      },
    };

    console.log("[SDC-SWM Host] Sending questionnaire.ui.focus:", message);
    this.logMessage(
      "sent",
      "questionnaire.ui.focus",
      `Focus: ${this.testLinkId}`,
      message
    );
    this.popupWindow.postMessage(message, this.fhirPathLabUrl);
  }

  /**
   * Send highlight request to renderer (UI control message)
   */
  sendHighlightRequest() {
    if (!this.popupWindow || this.popupWindow.closed) {
      alert("The popup window is closed. Please open fhirpath-lab first.");
      return;
    }

    if (!this.testLinkId) {
      alert("Please enter a linkId to highlight.");
      return;
    }

    this.popupWindow.focus();

    const message: SmartWebMessagingRequest = {
      messagingHandle: this.messagingHandle,
      messageId: this.generateMessageId(),
      messageType: "questionnaire.ui.highlight",
      payload: {
        linkId: this.testLinkId,
        highlight: true,
        color: "#ffeb3b",
        message: "Test highlight from parent",
        severity: "warning",
      },
    };

    console.log("[SDC-SWM Host] Sending questionnaire.ui.highlight:", message);
    this.logMessage(
      "sent",
      "questionnaire.ui.highlight",
      `Highlight: ${this.testLinkId}`,
      message
    );
    this.popupWindow.postMessage(message, this.fhirPathLabUrl);
  }

  /**
   * Send reset request to renderer (UI control message)
   */
  sendResetRequest() {
    if (!this.popupWindow || this.popupWindow.closed) {
      alert("The popup window is closed. Please open fhirpath-lab first.");
      return;
    }

    this.popupWindow.focus();

    const message: SmartWebMessagingRequest = {
      messagingHandle: this.messagingHandle,
      messageId: this.generateMessageId(),
      messageType: "questionnaire.ui.reset",
      payload: {},
    };

    console.log("[SDC-SWM Host] Sending questionnaire.ui.reset:", message);
    this.logMessage("sent", "questionnaire.ui.reset", "Reset form", message);
    this.popupWindow.postMessage(message, this.fhirPathLabUrl);
  }

  /**
   * Render a QuestionnaireResponse in the display
   * (if it wasn't generated by this component)
   */
  async renderQuestionnaireResponse(
    response: QuestionnaireResponse,
    questionnaire: Questionnaire
  ) {
    if (response.meta?.tag?.find((t) => t.code?.startsWith("smartWM"))) {
      return;
    }
    // Read the source from the response meta tags (join all the tag codes)
    const source = response.meta?.tag?.map((t) => t.code).join(", ");
    console.log("[SDC-SWM Host] Rendering QuestionnaireResponse:", response);

    const applyQr: QuestionnaireResponse = JSON.parse(JSON.stringify(response));
    delete applyQr.meta;
    applyQr.status = "in-progress"; // as the Aidbox renderer will disable all controls in a `completed` state
    this.formData = applyQr;
    this.logMessage(
      "local",
      "show response",
      "Show Response: " + source + " authored: " + this.formData?.authored
    );
  }
}
</script>