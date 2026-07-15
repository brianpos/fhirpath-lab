<template>
  <div class="swm-renderer-container">
    <div v-if="loadError" class="renderer-error">
      <h2>Unable to load LHC-Forms</h2>
      <p>{{ loadError }}</p>
    </div>
    <div v-else-if="questionnaire" class="q-host">
      <div id="myFormContainer"></div>
    </div>
    <div v-else class="no-questionnaire">
      <p>Waiting for questionnaire...</p>
    </div>
    <div class="version-controls">
      <v-text-field
        v-model="requestedLformsVersion"
        label="LHC-Forms version"
        dense
        hide-details
        @keyup.enter="reloadWithLformsVersion"
      />
      <v-btn icon small @click="reloadWithLformsVersion">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<style scoped>
.swm-renderer-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
  border: 6px solid lightgreen;
}

.version-controls {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: 8px;
  padding: 8px;
  background-color: #f5f5f5;
  border-top: 1px solid #aaa;
}

.q-host {
  flex: 1;
  min-height: 0;
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

.no-questionnaire,
.renderer-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 2rem;
  color: #666;
}

.renderer-error {
  color: #b71c1c;
}
</style>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import FHIR from 'fhirclient';
import { loadLForms } from 'lforms-loader';
import { OperationOutcome, Questionnaire, QuestionnaireResponse } from 'fhir/r4';
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
  SdcUiChangedQuestionnaireResponsePayload,
  UiDoneEvent,
  UiDoneResponsePayload
} from '~/types/sdc-swm-types';

const DEFAULT_LFORMS_VERSION = '41.2.0';
const LFORMS_VERSION_PATTERN = /^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/;

interface LFormsApi {
  Util: {
    addFormToPage(
      questionnaire: Questionnaire | object,
      formId: string,
      options: { prepopulate: boolean }
    ): Promise<void>;
    setFHIRContext(
      fhirContext: object,
      fhirContextVars: Record<string, fhir4.Resource>
    ): void;
    getFormFHIRData(
      resourceType: 'QuestionnaireResponse',
      fhirVersion: 'R4',
      formId: string
    ): QuestionnaireResponse;
    convertFHIRQuestionnaireToLForms(questionnaire: Questionnaire, fhirVersion: 'R4'): object;
    mergeFHIRDataIntoLForms(
      resourceType: 'QuestionnaireResponse',
      response: QuestionnaireResponse,
      lformsQuestionnaire: object,
      fhirVersion: 'R4'
    ): object;
  };
}

/**
 * SDC-SWM renderer backed by the NLM LHC-Forms engine.
 *
 * Required URL parameters:
 * - messaging_handle
 * - messaging_origin
 *
 * Optional URL parameter:
 * - lforms_version or lfv (defaults to 41.2.0)
 */
@Component
export default class SwmLhformsSmartForms extends Vue {
  layout = 'empty';

  questionnaire: Questionnaire | null = null;
  questionnaireResponse: QuestionnaireResponse | null = null;
  context: QuestionnaireContext = {};
  config: SdcConfigureRequestPayload = {};
  handshakeComplete = false;
  messagingHandle: string | null = null;
  allowedOrigin: string | null = null;
  lformsVersion = DEFAULT_LFORMS_VERSION;
  requestedLformsVersion = DEFAULT_LFORMS_VERSION;
  loadError: string | null = null;
  extractServiceUrl = 'https://fhir.forms-lab.com/QuestionnaireResponse/$extract';

  declare messageSource: WindowProxy | null;
  private lformsReady: Promise<void> = Promise.resolve();
  private changeWatchInterval: ReturnType<typeof setInterval> | null = null;

  mounted() {
    this.messageSource = null;
    this.checkUrlParameters();
    this.lformsReady = this.loadRequestedLFormsVersion();
    window.addEventListener('message', this.handleMessage);
  }

  beforeDestroy() {
    window.removeEventListener('message', this.handleMessage);
    this.stopWatchingForChanges();
  }

  private checkUrlParameters() {
    const params = new URLSearchParams(window.location.search);
    const messagingHandle = params.get('messaging_handle');
    const messagingOrigin = params.get('messaging_origin');
    const requestedVersion = params.get('lforms_version') || params.get('lfv');

    if (!messagingHandle || !messagingOrigin) {
      console.error(
        '[SDC-SWM LHC-Forms Renderer] Required URL parameters missing. ' +
        'Provide messaging_handle and messaging_origin.'
      );
      return;
    }

    this.messagingHandle = messagingHandle;
    this.allowedOrigin = messagingOrigin;

    if (requestedVersion) {
      if (LFORMS_VERSION_PATTERN.test(requestedVersion)) {
        this.lformsVersion = requestedVersion;
        this.requestedLformsVersion = requestedVersion;
      } else {
        this.loadError = `Invalid lforms_version "${requestedVersion}". Expected a semantic version such as 41.2.0.`;
      }
    }
  }

  reloadWithLformsVersion() {
    const requestedVersion = this.requestedLformsVersion.trim();
    if (!LFORMS_VERSION_PATTERN.test(requestedVersion)) {
      this.loadError =
        `Invalid LHC-Forms version "${requestedVersion}". Expected a semantic version such as 41.2.0.`;
      return;
    }

    const url = new URL(window.location.href);
    url.searchParams.set('lforms_version', requestedVersion);
    url.searchParams.delete('lfv');
    window.location.assign(url.toString());
  }

  private async loadRequestedLFormsVersion(): Promise<void> {
    if (this.loadError) {
      return;
    }

    try {
      console.log(`[SDC-SWM LHC-Forms Renderer] Loading LHC-Forms ${this.lformsVersion}`);
      await loadLForms(this.lformsVersion);
      if (!window.LForms) {
        throw new Error('The LHC-Forms loader completed without exposing window.LForms.');
      }
      console.log(`[SDC-SWM LHC-Forms Renderer] Loaded LHC-Forms ${this.lformsVersion}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.loadError = `Failed to load LHC-Forms ${this.lformsVersion}: ${message}`;
    }
  }

  private async requireLForms(): Promise<LFormsApi> {
    await this.lformsReady;
    if (this.loadError || !window.LForms) {
      throw new Error(this.loadError || `LHC-Forms ${this.lformsVersion} is not available.`);
    }
    return window.LForms as LFormsApi;
  }

  async handleMessage(event: MessageEvent) {
    if (!event.data || typeof event.data !== 'object') {
      return;
    }

    if (typeof event.data.source === 'string' && event.data.source.startsWith('react-devtools-')) {
      return;
    }

    const message = event.data as SmartWebMessagingRequest;
    if (!message.messageId || !message.messageType) {
      console.warn('[SDC-SWM LHC-Forms Renderer] Invalid message received', message);
      return;
    }

    if (!this.messagingHandle || !this.allowedOrigin) {
      console.error('[SDC-SWM LHC-Forms Renderer] Renderer was not initialized with required URL parameters.');
      return;
    }

    if (event.origin !== this.allowedOrigin || message.messagingHandle !== this.messagingHandle) {
      return;
    }

    const expectedSource = window.opener || (window.parent !== window ? window.parent : null);
    if (!expectedSource || event.source !== expectedSource) {
      console.warn('[SDC-SWM LHC-Forms Renderer] Rejecting message from unexpected window.');
      return;
    }

    this.messageSource = event.source as WindowProxy;

    try {
      let response: object;
      switch (message.messageType) {
        case 'status.handshake':
          response = await this.handleStatusHandshake(message as StatusHandshakeRequest);
          break;
        case 'sdc.configure':
          response = await this.handleSdcConfigure(message as SdcConfigureRequest);
          break;
        case 'sdc.configureContext':
          response = await this.handleSdcConfigureContext(message as SdcConfigureContextRequest);
          break;
        case 'sdc.displayQuestionnaire':
          response = await this.handleSdcDisplayQuestionnaire(message as SdcDisplayQuestionnaireRequest);
          break;
        case 'sdc.displayQuestionnaireResponse':
          response = await this.handleSdcDisplayQuestionnaireResponse(
            message as SdcDisplayQuestionnaireResponseRequest
          );
          break;
        case 'sdc.requestCurrentQuestionnaireResponse':
          response = await this.handleSdcRequestCurrentQuestionnaireResponse(
            message as SdcRequestCurrentQuestionnaireResponseRequest
          );
          break;
        case 'sdc.requestPrepopulate':
          response = await this.handleSdcRequestPrepopulate(message as SdcRequestPrepopulateRequest);
          break;
        case 'sdc.requestExtract':
          response = await this.handleSdcRequestExtract(message as SdcRequestExtractRequest);
          break;
        case 'ui.done':
          response = await this.handleUiDone(message as UiDoneEvent);
          break;
        default:
          response = {
            status: 'error',
            outcome: this.createOperationOutcome('error', `Unknown message type: ${message.messageType}`)
          };
      }
      this.sendResponse(message.messageId, response);
    } catch (error) {
      const messageText = error instanceof Error ? error.message : String(error);
      console.error('[SDC-SWM LHC-Forms Renderer] Error handling message', error);
      this.sendResponse(message.messageId, {
        status: 'error',
        outcome: this.createOperationOutcome('error', messageText)
      });
    }
  }

  async handleStatusHandshake(_message: StatusHandshakeRequest): Promise<StatusHandshakeResponsePayload> {
    this.handshakeComplete = true;
    return {
      application: {
        name: 'NLM LHC-Forms Renderer',
        version: this.lformsVersion,
        publisher: 'National Library of Medicine'
      },
      capabilities: {
        extraction: true,
        prepopulate: true,
        focusChangeNotifications: false
      }
    };
  }

  async handleSdcConfigure(message: SdcConfigureRequest): Promise<SdcConfigureResponsePayload> {
    this.config = { ...this.config, ...message.payload };
    return { status: 'success' };
  }

  async handleSdcConfigureContext(
    message: SdcConfigureContextRequest
  ): Promise<SdcConfigureContextResponsePayload> {
    this.context = message.payload.context || {};
    return { status: 'success' };
  }

  async handleSdcDisplayQuestionnaire(
    message: SdcDisplayQuestionnaireRequest
  ): Promise<SdcDisplayQuestionnaireResponsePayload> {
    if (!message.payload.questionnaire) {
      return {
        status: 'error',
        outcome: this.createOperationOutcome('error', 'No questionnaire provided')
      };
    }

    this.questionnaire = message.payload.questionnaire as Questionnaire;
    this.mergeContext(message.payload.context);

    try {
      if (message.payload.questionnaireResponse) {
        this.questionnaireResponse = message.payload.questionnaireResponse as QuestionnaireResponse;
        await this.renderQuestionnaireResponse(this.questionnaireResponse);
      } else {
        this.questionnaireResponse = null;
        await this.renderQuestionnaire(false);
      }
      this.startWatchingForChanges();
      return { status: 'success' };
    } catch (error) {
      return this.renderingError(error);
    }
  }

  async handleSdcDisplayQuestionnaireResponse(
    message: SdcDisplayQuestionnaireResponseRequest
  ): Promise<SdcDisplayQuestionnaireResponseResponsePayload> {
    if (!message.payload.questionnaireResponse) {
      return {
        status: 'error',
        outcome: this.createOperationOutcome('error', 'No questionnaire response provided')
      };
    }

    this.questionnaireResponse = message.payload.questionnaireResponse as QuestionnaireResponse;
    if (message.payload.questionnaire) {
      this.questionnaire = message.payload.questionnaire as Questionnaire;
    }

    if (!this.questionnaire) {
      return {
        status: 'error',
        outcome: this.createOperationOutcome(
          'error',
          'Questionnaire must be provided with the QuestionnaireResponse'
        )
      };
    }

    try {
      await this.renderQuestionnaireResponse(this.questionnaireResponse);
      this.startWatchingForChanges();
      return { status: 'success' };
    } catch (error) {
      return this.renderingError(error);
    }
  }

  async handleSdcRequestCurrentQuestionnaireResponse(
    _message: SdcRequestCurrentQuestionnaireResponseRequest
  ): Promise<SdcRequestCurrentQuestionnaireResponseResponsePayload> {
    try {
      return {
        questionnaireResponse: await this.getCurrentResponse(),
        outcome: this.createOperationOutcome('information', 'QuestionnaireResponse retrieved successfully')
      };
    } catch (error) {
      return {
        outcome: this.createOperationOutcome('error', this.errorMessage(error))
      };
    }
  }

  async handleSdcRequestPrepopulate(
    _message: SdcRequestPrepopulateRequest
  ): Promise<SdcRequestPrepopulateResponsePayload> {
    if (!this.questionnaire) {
      return {
        status: 'error',
        outcome: this.createOperationOutcome('error', 'No questionnaire available to prepopulate')
      };
    }

    if (!this.config.dataServer) {
      return {
        status: 'error',
        outcome: this.createOperationOutcome('error', 'No data server configured for prepopulation')
      };
    }

    try {
      await this.renderQuestionnaire(true);
      this.questionnaireResponse = await this.getCurrentResponse();
      this.startWatchingForChanges();
      return {
        status: 'success',
        outcome: this.createOperationOutcome('information', 'Questionnaire prepopulated successfully')
      };
    } catch (error) {
      return {
        status: 'error',
        outcome: this.createOperationOutcome('error', `Prepopulation failed: ${this.errorMessage(error)}`)
      };
    }
  }

  async handleSdcRequestExtract(
    message: SdcRequestExtractRequest
  ): Promise<SdcRequestExtractResponsePayload> {
    const result: SdcRequestExtractResponsePayload = {};

    try {
      const extractParameters: fhir4.Parameters = {
        resourceType: 'Parameters',
        parameter: [
          {
            name: 'questionnaire-response',
            resource: message.payload.questionnaireResponse || await this.getCurrentResponse()
          },
          {
            name: 'questionnaire',
            resource: message.payload.questionnaire || this.questionnaire || undefined
          }
        ]
      };

      const response = await fetch(this.extractServiceUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(extractParameters)
      });

      if (!response.ok) {
        result.outcome = this.createOperationOutcome(
          'error',
          `Extraction service returned HTTP ${response.status}`
        );
        return result;
      }

      const extractResponse = await response.json();
      if (extractResponse.resourceType === 'Parameters') {
        const parameters = extractResponse as fhir4.Parameters;
        result.extractedResources = parameters.parameter?.find(p => p.name === 'return')?.resource as
          | fhir4.Bundle
          | undefined;
        result.outcome = parameters.parameter?.find(p => p.name === 'issues')?.resource as
          | fhir4.OperationOutcome
          | undefined;
      } else {
        result.extractedResources = extractResponse as fhir4.Bundle;
      }
    } catch (error) {
      result.outcome = this.createOperationOutcome('error', `Extraction failed: ${this.errorMessage(error)}`);
    }

    return result;
  }

  async handleUiDone(_message: UiDoneEvent): Promise<UiDoneResponsePayload> {
    if (window.confirm('Are you sure you want to close the form? Any unsaved changes may be lost.')) {
      return { status: 'success' };
    }
    return {
      status: 'error',
      statusDetail: { text: 'User cancelled the close operation' }
    };
  }

  private async renderQuestionnaire(prepopulate: boolean): Promise<void> {
    if (!this.questionnaire) {
      throw new Error('No questionnaire is available to render.');
    }

    const lforms = await this.requireLForms();
    this.configureFhirContext(lforms);
    await this.$nextTick();
    await lforms.Util.addFormToPage(this.questionnaire, 'myFormContainer', { prepopulate });
  }

  private async renderQuestionnaireResponse(response: QuestionnaireResponse): Promise<void> {
    if (!this.questionnaire) {
      throw new Error('No questionnaire is available to render.');
    }

    const lforms = await this.requireLForms();
    this.configureFhirContext(lforms);
    const lformsQuestionnaire = lforms.Util.convertFHIRQuestionnaireToLForms(this.questionnaire, 'R4');
    const populatedForm = lforms.Util.mergeFHIRDataIntoLForms(
      'QuestionnaireResponse',
      response,
      lformsQuestionnaire,
      'R4'
    );
    await this.$nextTick();
    await lforms.Util.addFormToPage(populatedForm, 'myFormContainer', { prepopulate: false });
  }

  private configureFhirContext(lforms: LFormsApi) {
    if (!this.config.dataServer) {
      return;
    }

    const fhirContextVars: Record<string, fhir4.Resource> = {};
    this.context.launchContext?.forEach(item => {
      if (item.contentResource) {
        fhirContextVars[item.name] = item.contentResource;
      }
    });

    const fhirContext = FHIR.client({
      serverUrl: this.config.dataServer,
      tokenResponse: {
        patient: this.referenceId(this.context.subject?.reference)
      }
    });
    lforms.Util.setFHIRContext(fhirContext, fhirContextVars);
  }

  private referenceId(reference?: string): string | undefined {
    if (!reference) {
      return undefined;
    }
    const parts = reference.split('/');
    return parts[parts.length - 1];
  }

  private mergeContext(context?: QuestionnaireContext) {
    if (!context) {
      return;
    }

    if (context.subject) this.context.subject = context.subject;
    if (context.author) this.context.author = context.author;
    if (context.encounter) this.context.encounter = context.encounter;

    if (context.launchContext) {
      if (!this.context.launchContext) {
        this.context.launchContext = [];
      }
      context.launchContext.forEach(newItem => {
        const existingIndex = this.context.launchContext!.findIndex(item => item.name === newItem.name);
        if (existingIndex >= 0) {
          this.context.launchContext![existingIndex] = newItem;
        } else {
          this.context.launchContext!.push(newItem);
        }
      });
    }
  }

  private async getCurrentResponse(): Promise<QuestionnaireResponse> {
    const lforms = await this.requireLForms();
    const response = lforms.Util.getFormFHIRData('QuestionnaireResponse', 'R4', 'myFormContainer');
    if (!response.meta) response.meta = {};
    if (!response.meta.tag) response.meta.tag = [];
    if (!response.meta.tag.some(tag => tag.code?.startsWith('lformsVersion'))) {
      response.meta.tag.push({ code: `lformsVersion:${this.lformsVersion}` });
    }
    return response;
  }

  private startWatchingForChanges() {
    this.stopWatchingForChanges();
    let previousResponseJson = '';
    let previousResponse: QuestionnaireResponse | null = null;

    this.changeWatchInterval = setInterval(async () => {
      try {
        const response = await this.getCurrentResponse();
        const currentResponseJson = JSON.stringify(response);
        if (!previousResponseJson) {
          previousResponseJson = currentResponseJson;
          previousResponse = response;
          return;
        }
        if (currentResponseJson !== previousResponseJson) {
          const changedLinkIds = previousResponse
            ? this.calculateChangedLinkIds(previousResponse, response)
            : undefined;
          previousResponseJson = currentResponseJson;
          previousResponse = response;
          this.sendChangedQuestionnaireResponse(response, changedLinkIds);
        }
      } catch (error) {
        console.warn('[SDC-SWM LHC-Forms Renderer] Unable to inspect form changes', error);
      }
    }, 500);
  }

  private stopWatchingForChanges() {
    if (this.changeWatchInterval) {
      clearInterval(this.changeWatchInterval);
      this.changeWatchInterval = null;
    }
  }

  private calculateChangedLinkIds(
    oldResponse: QuestionnaireResponse,
    newResponse: QuestionnaireResponse
  ): string[] {
    const changedLinkIds = new Set<string>();

    const compareItems = (oldItems: fhir4.QuestionnaireResponseItem[] = [], newItems: fhir4.QuestionnaireResponseItem[] = []) => {
      const oldByLinkId = new Map(oldItems.map(item => [item.linkId, item]));
      const newByLinkId = new Map(newItems.map(item => [item.linkId, item]));
      const allLinkIds = new Set([...oldByLinkId.keys(), ...newByLinkId.keys()]);

      allLinkIds.forEach(linkId => {
        const oldItem = oldByLinkId.get(linkId);
        const newItem = newByLinkId.get(linkId);
        if (!oldItem || !newItem || JSON.stringify(oldItem.answer || []) !== JSON.stringify(newItem.answer || [])) {
          changedLinkIds.add(linkId);
        }
        compareItems(oldItem?.item, newItem?.item);
      });
    };

    compareItems(oldResponse.item, newResponse.item);
    return Array.from(changedLinkIds);
  }

  private sendChangedQuestionnaireResponse(
    questionnaireResponse: QuestionnaireResponse,
    changedLinkIds?: string[]
  ) {
    const payload: SdcUiChangedQuestionnaireResponsePayload = {
      questionnaireResponse,
      changedLinkIds
    };
    this.sendMessage('sdc.ui.changedQuestionnaireResponse', payload);
  }

  private sendMessage(messageType: SdcMessageType, payload: object) {
    if (!this.messagingHandle) {
      return;
    }
    const message: SmartWebMessagingRequest = {
      messagingHandle: this.messagingHandle,
      messageId: this.generateMessageId(),
      messageType,
      payload
    };
    this.targetWindow()?.postMessage(message, this.allowedOrigin || '*');
  }

  private sendResponse(responseToMessageId: string, payload: object) {
    const response: SmartWebMessagingResponse = {
      messageId: this.generateMessageId(),
      responseToMessageId,
      payload
    };
    this.targetWindow()?.postMessage(response, this.allowedOrigin || '*');
  }

  private targetWindow(): WindowProxy | null {
    const target = this.messageSource || window.opener || window.parent;
    return target && target !== window ? target : null;
  }

  private generateMessageId(): string {
    return `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private renderingError(error: unknown): {
    status: 'error';
    outcome: OperationOutcome;
  } {
    return {
      status: 'error',
      outcome: this.createOperationOutcome('error', `Failed to render form: ${this.errorMessage(error)}`)
    };
  }

  private errorMessage(error: unknown): string {
    return error instanceof Error ? error.message : String(error);
  }

  private createOperationOutcome(
    severity: 'error' | 'warning' | 'information' | 'fatal',
    message: string
  ): OperationOutcome {
    return {
      resourceType: 'OperationOutcome',
      issue: [{
        severity,
        code: severity === 'error' || severity === 'fatal' ? 'processing' : 'informational',
        diagnostics: message
      }]
    };
  }
}
</script>
