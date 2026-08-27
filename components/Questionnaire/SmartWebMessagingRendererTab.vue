<template>
  <div class="swm-renderer-tab">
    <div class="renderer-toolbar">
      <span v-if="rendererReady" class="connection-status success--text">
        Connected
      </span>
      <span v-else class="connection-status text--secondary">
        Connecting...
      </span>
      <v-btn
        small
        color="primary"
        :disabled="!rendererReady"
        @click="requestCurrentQuestionnaireResponse"
      >
        Show Response
      </v-btn>
    </div>

    <v-alert v-if="errorMessage" type="error" dense class="mb-2">
      {{ errorMessage }}
    </v-alert>

    <iframe
      ref="rendererFrame"
      class="renderer-frame"
      scrolling="no"
      :src="rendererLaunchUrl"
      :title="renderer.title"
      @load="handleFrameLoad"
    ></iframe>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import { Questionnaire, QuestionnaireResponse } from 'fhir/r4b';
import { ContextData } from '../QuestionnaireContext.vue';
import { FormsRendererConfiguration } from '~/helpers/forms_config';
import type {
  QuestionnaireContext,
  SdcConfigureContextRequest,
  SdcConfigureRequest,
  SdcDisplayQuestionnaireRequest,
  SdcDisplayQuestionnaireResponseRequest,
  SdcRequestCurrentQuestionnaireResponseRequest,
  SdcRequestCurrentQuestionnaireResponseResponsePayload,
  SdcUiChangedFocusEvent,
  SmartWebMessagingRequest,
  SmartWebMessagingResponse,
  StatusHandshakeRequest,
  UiDoneEvent
} from '~/types/sdc-swm-types';

interface PendingRequest {
  resolve: (payload: unknown) => void;
  reject: (error: Error) => void;
  timeout: ReturnType<typeof setTimeout>;
}

@Component
export default class SmartWebMessagingRendererTab extends Vue {
  @Prop({ required: true }) readonly renderer!: FormsRendererConfiguration;
  @Prop({ required: true }) readonly questionnaire!: Questionnaire;
  @Prop(Object) readonly questionnaireResponse?: QuestionnaireResponse;
  @Prop({ required: true }) readonly context!: ContextData;
  @Prop({ required: true }) readonly dataServer!: string;

  rendererReady = false;
  errorMessage: string | null = null;

  private messagingHandle = '';
  private readonly pendingRequests = new Map<string, PendingRequest>();

  get rendererUrl(): URL {
    return new URL(this.renderer.smartWebMessagingUrl, window.location.href);
  }

  get rendererOrigin(): string {
    return this.rendererUrl.origin;
  }

  get rendererLaunchUrl(): string {
    const url = this.rendererUrl;
    url.searchParams.set('messaging_handle', this.messagingHandle);
    url.searchParams.set('messaging_origin', window.location.origin);
    return url.toString();
  }

  created() {
    this.messagingHandle = this.generateId('renderer');
  }

  mounted() {
    window.addEventListener('message', this.handleMessage);
  }

  beforeDestroy() {
    window.removeEventListener('message', this.handleMessage);
    this.rejectPendingRequests('Renderer tab was closed.');
  }

  async handleFrameLoad() {
    this.rendererReady = false;
    this.errorMessage = null;
    this.rejectPendingRequests('Renderer iframe was reloaded.');

    try {
      await this.sendHandshake();
      await this.sendConfiguration();
      await this.sendContext();
      if (this.questionnaireResponse) {
        await this.sendQuestionnaireResponse(
          this.questionnaireResponse,
          this.questionnaire
        );
      } else {
        await this.sendQuestionnaire();
      }
      this.rendererReady = true;
    } catch (error) {
      this.errorMessage = this.errorText(error);
      console.error(`[SDC-SWM Host: ${this.renderer.tabName}] Initialization failed`, error);
    }
  }

  handleMessage(event: MessageEvent) {
    const frameWindow = this.getFrameWindow();
    if (
      event.origin !== this.rendererOrigin ||
      !frameWindow ||
      event.source !== frameWindow ||
      !event.data ||
      typeof event.data !== 'object'
    ) {
      return;
    }

    const message = event.data as SmartWebMessagingRequest | SmartWebMessagingResponse;
    if ('responseToMessageId' in message) {
      this.handleResponse(message);
      return;
    }

    if (
      !('messageType' in message) ||
      message.messagingHandle !== this.messagingHandle ||
      !message.messageId
    ) {
      return;
    }

    this.handleRendererEvent(message);
  }

  private handleResponse(message: SmartWebMessagingResponse) {
    const pending = this.pendingRequests.get(message.responseToMessageId);
    if (!pending) {
      return;
    }

    clearTimeout(pending.timeout);
    this.pendingRequests.delete(message.responseToMessageId);
    pending.resolve(message.payload);
  }

  private handleRendererEvent(message: SmartWebMessagingRequest) {
    let responsePayload: object;

    switch (message.messageType) {
      case 'sdc.ui.changedFocus': {
        const event = message as SdcUiChangedFocusEvent;
        if (event.payload.linkId) {
          this.$emit('highlight-path', event.payload.linkId);
        }
        responsePayload = { status: 'success' };
        break;
      }
      case 'sdc.ui.changedQuestionnaireResponse': {
        // A host-driven display can also trigger this event. Acknowledge it without
        // feeding the response back through every renderer; explicit Show Response
        // requests are the synchronization boundary used by the tester.
        responsePayload = { status: 'success' };
        break;
      }
      case 'ui.done': {
        const _event = message as UiDoneEvent;
        responsePayload = { status: 'success' };
        break;
      }
      default:
        responsePayload = {
          status: 'error',
          statusDetail: { text: `Unsupported renderer event: ${message.messageType}` }
        };
    }

    this.sendEventResponse(message.messageId, responsePayload);
  }

  private async sendHandshake(): Promise<void> {
    let lastError: Error | null = null;

    for (let attempt = 0; attempt < 10; attempt++) {
      if (attempt > 0) {
        await this.delay(500);
      }

      const message: StatusHandshakeRequest = {
        messagingHandle: this.messagingHandle,
        messageId: this.generateId('message'),
        messageType: 'status.handshake',
        payload: {
          protocolVersion: '1.0',
          fhirVersion: 'R4'
        }
      };

      try {
        await this.sendRequest(message, 1000);
        return;
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        if (!lastError.message.includes('timed out')) {
          throw lastError;
        }
      }
    }

    throw lastError || new Error(`Unable to connect to ${this.renderer.tabName}.`);
  }

  private async sendConfiguration(): Promise<void> {
    const message: SdcConfigureRequest = {
      messagingHandle: this.messagingHandle,
      messageId: this.generateId('message'),
      messageType: 'sdc.configure',
      payload: {
        dataServer: this.dataServer
      }
    };
    this.ensureSuccessfulResponse(await this.sendRequest(message), message.messageType);
  }

  private async sendContext(): Promise<void> {
    const message: SdcConfigureContextRequest = {
      messagingHandle: this.messagingHandle,
      messageId: this.generateId('message'),
      messageType: 'sdc.configureContext',
      payload: {
        context: this.context as QuestionnaireContext
      }
    };
    this.ensureSuccessfulResponse(await this.sendRequest(message), message.messageType);
  }

  private async sendQuestionnaire(): Promise<void> {
    const message: SdcDisplayQuestionnaireRequest = {
      messagingHandle: this.messagingHandle,
      messageId: this.generateId('message'),
      messageType: 'sdc.displayQuestionnaire',
      payload: {
        questionnaire: this.questionnaire as fhir4.Questionnaire
      }
    };
    this.ensureSuccessfulResponse(await this.sendRequest(message), message.messageType);
  }

  async requestCurrentQuestionnaireResponse(): Promise<void> {
    if (!this.rendererReady) {
      return;
    }

    const message: SdcRequestCurrentQuestionnaireResponseRequest = {
      messagingHandle: this.messagingHandle,
      messageId: this.generateId('message'),
      messageType: 'sdc.requestCurrentQuestionnaireResponse',
      payload: {}
    };

    try {
      const payload = await this.sendRequest<SdcRequestCurrentQuestionnaireResponseResponsePayload>(
        message
      );
      if (payload.questionnaireResponse) {
        this.emitResponse(payload.questionnaireResponse as QuestionnaireResponse);
      } else if (payload.outcome) {
        this.errorMessage =
          payload.outcome.issue?.[0]?.diagnostics || 'Renderer did not return a QuestionnaireResponse.';
      }
    } catch (error) {
      this.errorMessage = this.errorText(error);
    }
  }

  async renderQuestionnaireResponse(
    response: QuestionnaireResponse,
    questionnaire: Questionnaire
  ): Promise<void> {
    if (!this.rendererReady) {
      return;
    }

    try {
      await this.sendQuestionnaireResponse(response, questionnaire);
    } catch (error) {
      this.errorMessage = this.errorText(error);
    }
  }

  private async sendQuestionnaireResponse(
    response: QuestionnaireResponse,
    questionnaire: Questionnaire
  ): Promise<void> {
    const message: SdcDisplayQuestionnaireResponseRequest = {
      messagingHandle: this.messagingHandle,
      messageId: this.generateId('message'),
      messageType: 'sdc.displayQuestionnaireResponse',
      payload: {
        questionnaire: questionnaire as fhir4.Questionnaire,
        questionnaireResponse: response as fhir4.QuestionnaireResponse
      }
    };

    this.ensureSuccessfulResponse(await this.sendRequest(message), message.messageType);
  }

  @Watch('questionnaire', { deep: true })
  async onQuestionnaireChanged() {
    if (!this.rendererReady) {
      return;
    }
    try {
      if (this.questionnaireResponse) {
        await this.sendQuestionnaireResponse(
          this.questionnaireResponse,
          this.questionnaire
        );
      } else {
        await this.sendQuestionnaire();
      }
    } catch (error) {
      this.errorMessage = this.errorText(error);
    }
  }

  @Watch('questionnaireResponse', { deep: true })
  async onQuestionnaireResponseChanged(response?: QuestionnaireResponse) {
    if (!this.rendererReady || !response) {
      return;
    }
    try {
      await this.sendQuestionnaireResponse(response, this.questionnaire);
    } catch (error) {
      this.errorMessage = this.errorText(error);
    }
  }

  @Watch('context', { deep: true })
  async onContextChanged() {
    if (!this.rendererReady) {
      return;
    }
    try {
      await this.sendContext();
    } catch (error) {
      this.errorMessage = this.errorText(error);
    }
  }

  @Watch('dataServer')
  async onDataServerChanged() {
    if (!this.rendererReady) {
      return;
    }
    try {
      await this.sendConfiguration();
    } catch (error) {
      this.errorMessage = this.errorText(error);
    }
  }

  private sendRequest<TPayload = unknown>(
    message: SmartWebMessagingRequest,
    timeoutMilliseconds = 15000
  ): Promise<TPayload> {
    const frameWindow = this.getFrameWindow();
    if (!frameWindow) {
      return Promise.reject(new Error('Renderer iframe is not available.'));
    }

    return new Promise<TPayload>((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.pendingRequests.delete(message.messageId);
        reject(new Error(`${message.messageType} timed out for ${this.renderer.tabName}.`));
      }, timeoutMilliseconds);

      this.pendingRequests.set(message.messageId, {
        resolve: payload => resolve(payload as TPayload),
        reject,
        timeout
      });

      try {
        frameWindow.postMessage(message, this.rendererOrigin);
      } catch (error) {
        clearTimeout(timeout);
        this.pendingRequests.delete(message.messageId);
        reject(error instanceof Error ? error : new Error(String(error)));
      }
    });
  }

  private sendEventResponse(responseToMessageId: string, payload: object) {
    const frameWindow = this.getFrameWindow();
    if (!frameWindow) {
      return;
    }

    const response: SmartWebMessagingResponse = {
      messageId: this.generateId('message'),
      responseToMessageId,
      payload
    };
    frameWindow.postMessage(response, this.rendererOrigin);
  }

  private ensureSuccessfulResponse(payload: unknown, messageType: string) {
    if (
      typeof payload !== 'object' ||
      payload === null ||
      !('status' in payload) ||
      payload.status !== 'error'
    ) {
      return;
    }

    const responsePayload = payload as {
      outcome?: fhir4.OperationOutcome;
    };
    throw new Error(
      responsePayload.outcome?.issue?.[0]?.diagnostics ||
      `${this.renderer.tabName} rejected ${messageType}.`
    );
  }

  private emitResponse(response: QuestionnaireResponse) {
    this.$emit('response', response);
  }

  private getFrameWindow(): WindowProxy | null {
    const iframe = this.$refs.rendererFrame as HTMLIFrameElement | undefined;
    return iframe?.contentWindow || null;
  }

  private rejectPendingRequests(message: string) {
    this.pendingRequests.forEach(pending => {
      clearTimeout(pending.timeout);
      pending.reject(new Error(message));
    });
    this.pendingRequests.clear();
  }

  private generateId(prefix: string): string {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private delay(milliseconds: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  private errorText(error: unknown): string {
    return error instanceof Error ? error.message : String(error);
  }
}
</script>

<style scoped>
.swm-renderer-tab {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  overflow: hidden;
}

.renderer-toolbar {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: 12px;
  margin-bottom: 0;
}

.connection-status {
  font-size: 0.8rem;
}

.renderer-toolbar .v-btn {
  margin-left: auto;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.renderer-frame {
  display: block;
  flex: 1 1 0;
  width: 100%;
  height: 0;
  min-height: 0;
  border: 1px solid rgba(0, 0, 0, 0.12);
}
</style>
