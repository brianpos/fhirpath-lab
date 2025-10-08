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
            @click="sendHandshake"
            :disabled="!isWindowConnected"
            class="mr-2 mb-2"
          >
            <v-icon left>mdi-handshake</v-icon>
            Handshake
          </v-btn>

          <v-btn
            color="primary"
            @click="sendCurrentQuestionnaire"
            :disabled="!isWindowConnected"
            class="mr-2 mb-2"
          >
            <v-icon left>mdi-file-send</v-icon>
            Send Questionnaire
          </v-btn>

          <v-btn
            color="primary"
            @click="sendLoadResponse"
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
            @click="sendExtractRequest"
            :disabled="!isWindowConnected"
            class="mr-2 mb-2"
          >
            <v-icon left>mdi-file-download</v-icon>
            Request Response
          </v-btn>
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

@Component({
  components: {
    MessageLog,
  },
})
export default class SmartWMFormSection extends Vue {
  @Prop(Object) readonly questionnaire!: Questionnaire;
  @Prop(Object) readonly context!: any;

  isWindowConnected: boolean = false;
  windowCheckInterval: number | null = null;
  fhirPathLabUrl: string = "http://localhost:3000/Questionnaire/tester";
  requestCurrentResponseMessageIdQueue: string[] = [];

  // Generate unique handles for this session
  messagingHandle: string = "";
  messagingOrigin: string = "";

  // UI testing
  testLinkId: string = "patient.name";
  messageLog: MessageLogEntry[] = [];

  // Reactive form data - now a component property instead of module-level
  formData: QuestionnaireResponse | undefined = undefined;

  // Non-reactive properties - defined in created() to avoid Vue's reactivity system
  // These store references to browser objects that cause cross-origin errors when made reactive
  private popupWindow!: Window | null;
  private messageHandler!: ((event: MessageEvent) => void) | null;

  created() {
    // Initialize non-reactive properties outside Vue's reactivity system
    // Using Object.defineProperty to ensure they're truly non-reactive
    Object.defineProperty(this, 'popupWindow', {
      value: null,
      writable: true,
      enumerable: false,
      configurable: true
    });
    
    Object.defineProperty(this, 'messageHandler', {
      value: null,
      writable: true,
      enumerable: false,
      configurable: true
    });
  }

  async mounted() {
    // Generate messaging handle and origin
    this.messagingHandle = this.generateHandle();
    this.messagingOrigin = window.location.origin;
    console.log(
      "[SmartWM Test] Initialized with handle:",
      this.messagingHandle
    );

    // Create a bound message handler to avoid Vue reactivity issues with Window object
    this.messageHandler = (event: MessageEvent) => {
      console.log("[SmartWM Test] RAW message event received:", {
        origin: event.origin,
        source: event.source,
        data: event.data,
        expectedOrigin: this.fhirPathLabUrl,
        popupWindow: this.popupWindow,
        sourceMatchesPopup: event.source === this.popupWindow,
      });
      this.handleMessage(event);
    };

    // Listen for messages from the popup
    window.addEventListener("message", this.messageHandler);
  }

  beforeDestroy() {
    // Remove message listener
    if (this.messageHandler) {
      window.removeEventListener("message", this.messageHandler);
      this.messageHandler = null;
    }

    // Clean up interval when component is destroyed
    if (this.windowCheckInterval) {
      clearInterval(this.windowCheckInterval);
    }
  }

  generateHandle(): string {
    return "test-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);
  }

  generateMessageId(): string {
    return "msg-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);
  }

  handleMessage(event: MessageEvent) {
    // First, check if this message is intended for us by checking the messagingHandle
    const msg = event.data;

    // If the message doesn't have our messagingHandle, it's not for us - let other handlers deal with it
    if (
      !msg ||
      !msg.messagingHandle ||
      msg.messagingHandle !== this.messagingHandle
    ) {
      // Not our message, ignore silently (could be for Aidbox or other components)
      return;
    }

    // Now we know it's for us, validate the origin
    if (!this.fhirPathLabUrl.startsWith(event.origin)) {
      console.log(
        "[SmartWM Test] Ignoring message from unexpected origin:",
        event.origin
      );
      return;
    }

    // Validate source if we have a popup reference
    if (this.popupWindow && event.source !== this.popupWindow) {
      console.log("[SmartWM Test] Ignoring message from different window");
      return;
    }

    console.log("[SmartWM Test] Received message from popup:", msg);

    if (msg.messageType) {
      // this is an un-solicited message
        this.logMessage(
          "received",
          msg.messageType || (msg.responseToMessageId ? "response" : "unknown"),
          "unsolicited - ",
          msg
        );
      return;
    }

    if (this.requestCurrentResponseMessageIdQueue.indexOf(msg.responseToMessageId) >= 0) {
      // this is a changed the handler for the request current response
      // Handle extracted response
      if (msg.payload.questionnaireResponse) {
        const qr = msg.payload.questionnaireResponse;

        const response: QuestionnaireResponse = qr;
        this.formData = response;
        console.log("QuestionnaireResponse updated", response);

        // ensure there is a tag for the smartwm renderer in place
        if (!response.meta?.tag?.find((t) => t.code?.startsWith("smartwm"))) {
          if (!response.meta) response.meta = { tag: [] };
          if (!response.meta.tag) response.meta.tag = [];
          response.meta.tag!.push({ code: "smartwm:generated" });
        }

        // remove the lforms tag if it was there.
        if (response.meta?.tag?.find((t) => t.code?.startsWith("lforms"))) {
          response.meta.tag = response.meta.tag!.filter(
            (t) => !t.code?.startsWith("lforms")
          );
        }

        // remove the CSIRO tag if it was there.
        if (response.meta?.tag?.find((t) => t.code?.startsWith("csiro"))) {
          response.meta.tag = response.meta.tag!.filter(
            (t) => !t.code?.startsWith("csiro")
          );
        }

        // remove the aidbox tag if it was there.
        if (response.meta?.tag?.find((t) => t.code?.startsWith("aidbox"))) {
          response.meta.tag = response.meta.tag!.filter(
            (t) => !t.code?.startsWith("aidbox")
          );
        }

        this.$emit("response", response);

        this.logMessage(
          "received",
          msg.messageType || (msg.responseToMessageId ? "response" : "unknown"),
          "QuestionnaireResponse that requested - " + response.id,
          msg
        );
        return;
      }
    }

    // Log the message
    this.logMessage(
      "received",
      msg.messageType || (msg.responseToMessageId ? "response" : "unknown"),
      this.summarizeMessage(msg),
      msg
    );
  }

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

  clearMessageLog() {
    this.messageLog = [];
  }

  summarizeMessage(msg: any): string {
    if (!msg.payload) {
      // Handle responses without payload (might have responseToMessageId)
      if (msg.responseToMessageId) {
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

      const response: QuestionnaireResponse = qr;
      this.formData = response;
      console.log("QuestionnaireResponse updated", response);

      // ensure there is a tag for the smartwm renderer in place
      if (!response.meta?.tag?.find((t) => t.code?.startsWith("smartwm"))) {
        if (!response.meta) response.meta = { tag: [] };
        if (!response.meta.tag) response.meta.tag = [];
        response.meta.tag!.push({ code: "smartwm:generated" });
      }

      // remove the lforms tag if it was there.
      if (response.meta?.tag?.find((t) => t.code?.startsWith("lforms"))) {
        response.meta.tag = response.meta.tag!.filter(
          (t) => !t.code?.startsWith("lforms")
        );
      }

      // remove the CSIRO tag if it was there.
      if (response.meta?.tag?.find((t) => t.code?.startsWith("csiro"))) {
        response.meta.tag = response.meta.tag!.filter(
          (t) => !t.code?.startsWith("csiro")
        );
      }

      // remove the aidbox tag if it was there.
      if (response.meta?.tag?.find((t) => t.code?.startsWith("aidbox"))) {
        response.meta.tag = response.meta.tag!.filter(
          (t) => !t.code?.startsWith("aidbox")
        );
      }

      this.$emit("response", response);

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
    if (msg.messageType === "sdc.ui.changedQuestionnaireResponse") {
      return "Response updated";
    }

    return JSON.stringify(msg.payload).substring(0, 100);
  }

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
    console.log("[SmartWM Test] Opening popup with URL:", url);

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
        console.log("[SmartWM Test] Sending initial handshake");
        this.sendHandshake();
      }, 1500);
    } else {
      // Provide more helpful instructions
      this.isWindowConnected = false;
      alert(
        "Pop-up blocked! Please:\n1. Click the popup blocker icon in your browser's address bar\n2. Allow popups for this site\n3. Try again"
      );
    }
  }

  sendHandshake() {
    if (!this.popupWindow || this.popupWindow.closed) {
      console.warn(
        "[SmartWM Test] Cannot send handshake - window not available"
      );
      return;
    }

    const message = {
      messagingHandle: this.messagingHandle,
      messageId: this.generateMessageId(),
      messageType: "status.handshake",
      payload: {
        protocolVersion: "1.0",
        fhirVersion: "R4",
      },
    };

    console.log("[SmartWM Test] Sending handshake:", message);
    this.logMessage(
      "sent",
      "status.handshake",
      "Protocol v1.0, FHIR R4",
      message
    );

    try {
      this.popupWindow.postMessage(message, this.fhirPathLabUrl);
      console.log("[SmartWM Test] ✅ postMessage called successfully");
    } catch (error) {
      console.error("[SmartWM Test] ❌ postMessage failed:", error);
    }
  }

  sendCurrentQuestionnaire() {
    // Use the existing popup window instead of opening a new one
    if (this.popupWindow && !this.popupWindow.closed) {
      this.popupWindow.focus();

      // Send the questionnaire using SMART Web Messaging format
      const message = {
        messagingHandle: this.messagingHandle,
        messageId: this.generateMessageId(),
        messageType: "sdc.displayQuestionnaire",
        payload: {
          questionnaire: this.questionnaire,
          // questionnaireResponse: this.formData || undefined, // intentionally not sending the data
        },
      };

      console.log("[SmartWM Test] Sending questionnaire:", message);
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

  sendLoadResponse() {
    if (!this.popupWindow || this.popupWindow.closed) {
      alert("The popup window is closed. Please open fhirpath-lab first.");
      return;
    }

    if (!this.formData) {
      alert("No response data available. Use 'Read Local Response' first.");
      return;
    }

    this.popupWindow.focus();

    const message = {
      messagingHandle: this.messagingHandle,
      messageId: this.generateMessageId(),
      messageType: "sdc.displayQuestionnaireResponse",
      payload: {
        questionnaireResponse: this.formData,
      },
    };

    console.log("[SmartWM Test] Sending loadResponse:", message);
    this.logMessage(
      "sent",
      "sdc.displayQuestionnaireResponse",
      `Response: ${this.formData?.id || "no-id"}`,
      message
    );
    this.popupWindow.postMessage(message, this.fhirPathLabUrl);
  }

  sendExtractRequest() {
    if (!this.popupWindow || this.popupWindow.closed) {
      alert("The popup window is closed. Please open fhirpath-lab first.");
      return;
    }

    this.popupWindow.focus();

    const message = {
      messagingHandle: this.messagingHandle,
      messageId: this.generateMessageId(),
      messageType: "sdc.requestCurrentQuestionnaireResponse",
      payload: {},
    };
    this.requestCurrentResponseMessageIdQueue.push(message.messageId);

    console.log("[SmartWM Test] Sending extract request:", message);
    this.logMessage(
      "sent",
      "sdc.requestCurrentQuestionnaireResponse",
      "Request current response",
      message
    );
    this.popupWindow.postMessage(message, this.fhirPathLabUrl);
  }

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

    const message = {
      messagingHandle: this.messagingHandle,
      messageId: this.generateMessageId(),
      messageType: "questionnaire.ui.focus",
      payload: {
        linkId: this.testLinkId,
      },
    };

    console.log("[SmartWM Test] Sending focus request:", message);
    this.logMessage(
      "sent",
      "questionnaire.ui.focus",
      `Focus: ${this.testLinkId}`,
      message
    );
    this.popupWindow.postMessage(message, this.fhirPathLabUrl);
  }

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

    const message = {
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

    console.log("[SmartWM Test] Sending highlight request:", message);
    this.logMessage(
      "sent",
      "questionnaire.ui.highlight",
      `Highlight: ${this.testLinkId}`,
      message
    );
    this.popupWindow.postMessage(message, this.fhirPathLabUrl);
  }

  sendResetRequest() {
    if (!this.popupWindow || this.popupWindow.closed) {
      alert("The popup window is closed. Please open fhirpath-lab first.");
      return;
    }

    this.popupWindow.focus();

    const message = {
      messagingHandle: this.messagingHandle,
      messageId: this.generateMessageId(),
      messageType: "questionnaire.ui.reset",
      payload: {},
    };

    console.log("[SmartWM Test] Sending reset request:", message);
    this.logMessage("sent", "questionnaire.ui.reset", "Reset form", message);
    this.popupWindow.postMessage(message, this.fhirPathLabUrl);
  }

  /** Show this QR in the display (if it wasn't generated by itself) */
  async renderQuestionnaireResponse(
    response: QuestionnaireResponse,
    questionnaire: Questionnaire
  ) {
    if (response.meta?.tag?.find((t) => t.code?.startsWith("smartWM"))) {
      return;
    }
    // read the source from the response meta tags (join all the tag codes)
    const source = response.meta?.tag?.map((t) => t.code).join(", ");
    console.log("WM:", response);

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