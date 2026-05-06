<template>
  <div style="height: 100%; display: flex; flex-direction: column;">
    <template v-if="questionnaire">
      <v-btn style="position: absolute; right: 34px; z-index: 2; margin-top: 4px;" color="primary"
        title="Show the QuestionnaireResponse based on the data in the Beda Forms renderer"
        @click="logResponse()" :disabled="!isReady">Show Response</v-btn>
      <div v-if="!isReady" style="padding: 16px; display: flex; align-items: center; color: gray;">
        <v-progress-circular indeterminate size="20" class="mr-3" />
        Connecting to Beda Forms renderer at {{ bedaFormsUrl }}…
      </div>
      <iframe
        ref="bedaIframe"
        :src="iframeSrc"
        @load="onIframeLoad"
        style="flex: 1; width: 100%; border: none; min-height: 500px;"
        allow="*"
      />
    </template>
    <template v-else>
      <p style="padding: 16px;">No questionnaire provided</p>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import { Questionnaire, QuestionnaireResponse } from "fhir/r4b";
import { ContextData } from "../QuestionnaireContext.vue";

const BEDA_FORMS_URL = "https://beda-forms.emr.beda.software";

@Component({})
export default class EditorBedaFormsSection extends Vue {
  @Prop(Object) readonly questionnaire!: Questionnaire;
  @Prop() readonly context!: ContextData | undefined;
  @Prop({ default: "" }) readonly dataServer!: string;

  readonly bedaFormsUrl: string = BEDA_FORMS_URL;

  isReady = false;

  // Stable per-instance handle; also used as the iframe URL param so it never changes,
  // meaning the iframe never reloads after the first load.
  readonly messagingHandle =
    "beda-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);

  // Map from outgoing messageId → resolve function for request/response pairing
  private pendingResponses = new Map<string, (response: any) => void>();

  // Latest QR received from changedQuestionnaireResponse events
  private latestQr: QuestionnaireResponse | undefined = undefined;

  get iframeSrc(): string {
    const params = new URLSearchParams({
      messaging_handle: this.messagingHandle,
      messaging_origin: window.location.origin,
      embedded_mode: "true",
    });
    return `${this.bedaFormsUrl}?${params}`;
  }

  mounted() {
    window.addEventListener("message", this.handleMessage);
  }

  beforeDestroy() {
    window.removeEventListener("message", this.handleMessage);
  }

  // ── Iframe lifecycle ───────────────────────────────────────────────────────

  async onIframeLoad() {
    // Small delay for React to mount and register its message listener
    await new Promise<void>((r) => setTimeout(r, 200));
    this.isReady = false;
    this.latestQr = undefined;
    await this.runInitSequence();
  }

  // Required phase order per sdc-smart-web-messaging-client:
  // handshake(→phase1) → configure(→phase2) → configureContext(→phase3) → displayQuestionnaire(→phase4)
  async runInitSequence() {
    try {
      await this.sendRequest("status.handshake", {
        protocolVersion: "1.0",
        fhirVersion: "R4",
      });
      await this.sendRequest("sdc.configure", {});
      await this.sendRequest("sdc.configureContext", {});
      await this.sendRequest("sdc.displayQuestionnaire", {
        questionnaire: this.questionnaire as any,
      });
      this.isReady = true;
    } catch (e) {
      console.error("[Beda Forms] Init sequence failed:", e);
    }
  }

  // ── Incoming message routing ───────────────────────────────────────────────

  handleMessage(event: MessageEvent) {
    if (event.origin !== this.bedaFormsUrl) return;
    if (event.data?.source?.startsWith("react-devtools-")) return;

    const msg = event.data;

    // Renderer responses carry responseToMessageId — check this FIRST because
    // the renderer also includes messagingHandle + messageType in its responses.
    if ("responseToMessageId" in msg) {
      this.handleResponse(msg);
      return;
    }

    // Unsolicited renderer events: have messagingHandle + messageType, no responseToMessageId
    if ("messageType" in msg && msg.messagingHandle === this.messagingHandle) {
      this.handleEvent(msg);
    }
  }

  handleResponse(msg: any) {
    const resolver = this.pendingResponses.get(msg.responseToMessageId);
    if (resolver) {
      this.pendingResponses.delete(msg.responseToMessageId);
      resolver(msg);
    }
  }

  handleEvent(msg: any) {
    if (msg.messageType === "sdc.ui.changedQuestionnaireResponse") {
      if (msg.payload?.questionnaireResponse) {
        this.latestQr = msg.payload.questionnaireResponse as QuestionnaireResponse;
      }
    }
    // Other events (changedFocus, ui.done) are ignored for now
  }

  // ── Outgoing messages ──────────────────────────────────────────────────────

  private sendRequest(messageType: string, payload: any, timeout = 5000): Promise<any> {
    return new Promise((resolve, reject) => {
      const msgId = this.generateId();
      const timer = setTimeout(() => {
        this.pendingResponses.delete(msgId);
        reject(new Error(`[Beda Forms] Timeout waiting for: ${messageType}`));
      }, timeout);
      this.pendingResponses.set(msgId, (response) => {
        clearTimeout(timer);
        resolve(response);
      });
      this.postToRenderer({
        messagingHandle: this.messagingHandle,
        messageId: msgId,
        messageType,
        payload,
      });
    });
  }

  private generateId(): string {
    return "msg-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);
  }

  private postToRenderer(message: any) {
    const iframe = this.$refs.bedaIframe as HTMLIFrameElement | undefined;
    iframe?.contentWindow?.postMessage(message, this.bedaFormsUrl);
  }

  // ── Public interface (called by tester.vue) ────────────────────────────────

  /** Called by tester.vue extract flow. */
  logResponse() {
    if (!this.isReady) return;

    if (this.latestQr) {
      this.tagAndEmit(this.latestQr);
      return;
    }

    this.sendRequest("sdc.requestCurrentQuestionnaireResponse", {})
      .then((response) => {
        if (response?.payload?.questionnaireResponse) {
          this.tagAndEmit(response.payload.questionnaireResponse as QuestionnaireResponse);
        }
      })
      .catch((e) => console.error("[Beda Forms] requestCurrentQR failed:", e));
  }

  /** Called by tester.vue when another renderer emits a response. */
  async renderQuestionnaireResponse(
    response: QuestionnaireResponse,
    _questionnaire: Questionnaire
  ) {
    if (response.meta?.tag?.find((t) => t.code?.startsWith("beda"))) return;
    if (!this.isReady) return;

    const qr: QuestionnaireResponse = JSON.parse(JSON.stringify(response));
    delete qr.meta;
    qr.status = "in-progress";

    await this.sendRequest("sdc.displayQuestionnaireResponse", {
      questionnaireResponse: qr as any,
    }).catch((e) => console.error("[Beda Forms] displayQuestionnaireResponse failed:", e));
  }

  // ── Watchers ───────────────────────────────────────────────────────────────

  @Watch("questionnaire")
  async onQuestionnaireChange() {
    this.latestQr = undefined;
    if (!this.isReady) return;
    this.isReady = false;
    await this.sendRequest("sdc.displayQuestionnaire", {
      questionnaire: this.questionnaire as any,
    }).catch((e) => console.error("[Beda Forms] displayQuestionnaire failed:", e));
    this.isReady = true;
  }

  // ── Helpers ────────────────────────────────────────────────────────────────

  private tagAndEmit(response: QuestionnaireResponse) {
    const tagged: QuestionnaireResponse = JSON.parse(JSON.stringify(response));
    if (!tagged.meta) tagged.meta = { tag: [] };
    if (!tagged.meta.tag) tagged.meta.tag = [];
    tagged.meta.tag = tagged.meta.tag.filter(
      (t) =>
        !t.code?.startsWith("csiro") &&
        !t.code?.startsWith("lforms") &&
        !t.code?.startsWith("aidbox") &&
        !t.code?.startsWith("smartwm")
    );
    if (!tagged.meta.tag.find((t) => t.code?.startsWith("beda"))) {
      tagged.meta.tag.push({ code: "beda:generated" });
    }
    this.$emit("response", tagged);
  }
}
</script>
