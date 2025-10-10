/**
 * SDC SMART Web Messaging Protocol Type Definitions
 * 
 * TypeScript type definitions for the SDC extension to SMART Web Messaging protocol
 * for Questionnaire rendering and interaction.
 * 
 * Based on SDC-SWM Protocol v1.0
 * Conforms to: HL7 FHIR SDC IG and SMART Web Messaging STU1
 * 
 * @see {@link https://hl7.org/fhir/uv/smart-web-messaging/STU1/smart-web-messaging.html}
 * @see {@link docs/sdc-swm-protocol.md}
 * 
 * @version 1.0
 * @date October 2025
 */

// ============================================================================
// Base SMART Web Messaging Structures
// ============================================================================

/**
 * Envelope structure for all SMART Web Messaging requests
 */
export interface SmartWebMessagingRequest<T = any> {
  /** Unique identifier for the messaging session */
  messagingHandle: string;
  
  /** Unique identifier for this specific message */
  messageId: string;
  
  /** Type of message being sent (e.g., "sdc.displayQuestionnaire") */
  messageType: string;
  
  /** Message-specific payload data */
  payload: T;
}

/**
 * Envelope structure for all SMART Web Messaging responses
 */
export interface SmartWebMessagingResponse<T = any> {
  /** Unique identifier for this response message */
  messageId: string;
  
  /** The messageId of the request this is responding to */
  responseToMessageId: string;
  
  /** 
   * Indicates if additional responses are expected
   * NOTE: Not used in SDC-SWM protocol
   */
  additionalResponsesExpected?: boolean;
  
  /** Response-specific payload data */
  payload: T;
}

/**
 * Unsolicited event messages from renderer
 * 
 * Events are structurally identical to requests and expect acknowledgment responses.
 * This type alias clarifies semantic intent for renderer-initiated messages.
 */
export type SmartWebMessagingEvent<T = any> = SmartWebMessagingRequest<T>;

// ============================================================================
// Common Context Structures
// ============================================================================

/**
 * Context data for Questionnaire rendering
 */
export interface QuestionnaireContext {
  /** Patient/subject reference */
  subject?: fhir4.Reference;
  
  /** Practitioner/author reference */
  author?: fhir4.Reference;
  
  /** Encounter context */
  encounter?: fhir4.Reference;
  
  /** SDC launch context(s) for pre-population */
  launchContext?: LaunchContextItem[];
}

/**
 * Launch context item for SDC pre-population
 */
export interface LaunchContextItem {
  /** Variable name (e.g., "patient", "encounter") */
  name: string;
  
  /** Resource reference (choice: reference OR resource) */
  contentReference?: fhir4.Reference;
  
  /** Inline resource (choice: reference OR resource) */
  contentResource?: fhir4.Resource;
}

/**
 * Application identification information
 */
export interface ApplicationInfo {
  /** Application name */
  name: string;
  
  /** Application version */
  version?: string;
  
  /** Publisher/vendor name */
  publisher?: string;
}

/**
 * Capability flags for SDC operations
 */
export interface SdcCapabilities {
  /** Supports $extract operation */
  extraction?: boolean;
  
  /** Supports focus change notifications */
  focusChangeNotifications?: boolean;
}

/**
 * Available engine information (FHIRPath Lab specific)
 */
export interface EngineInfo {
  /** Engine identifier */
  id: string;
  
  /** Display name */
  name: string;
}

// ============================================================================
// Message Type Definitions
// ============================================================================

/**
 * All SDC-SWM message types
 */
export type SdcMessageType =
  | 'status.handshake'
  | 'sdc.configure'
  | 'sdc.configureContext'
  | 'sdc.displayQuestionnaire'
  | 'sdc.displayQuestionnaireResponse'
  | 'sdc.requestCurrentQuestionnaireResponse'
  | 'sdc.requestExtract'
  | 'sdc.ui.changedQuestionnaireResponse'
  | 'sdc.ui.changedFocus'
  | 'ui.done';

// ============================================================================
// status.handshake
// ============================================================================

/**
 * Handshake request payload
 * Bidirectional: Can be sent by either host or renderer
 */
export interface StatusHandshakeRequestPayload {
  /** Protocol version (e.g., "1.0") */
  protocolVersion: string;
  
  /** FHIR version (e.g., "R4", "R4B", "R5") */
  fhirVersion?: string;
}

/**
 * Handshake response payload
 */
export interface StatusHandshakeResponsePayload {
  /** Application identification */
  application: ApplicationInfo;
  
  /** Supported capabilities */
  capabilities?: SdcCapabilities;
  
  /** Available engines (FHIRPath Lab specific) */
  availableEngines?: EngineInfo[];
}

/**
 * Complete handshake request message
 */
export type StatusHandshakeRequest = SmartWebMessagingRequest<StatusHandshakeRequestPayload>;

/**
 * Complete handshake response message
 */
export type StatusHandshakeResponse = SmartWebMessagingResponse<StatusHandshakeResponsePayload>;

// ============================================================================
// sdc.configure
// ============================================================================

/**
 * Configuration request payload
 * Host → Renderer
 */
export interface SdcConfigureRequestPayload {
  /** Terminology server endpoint URL */
  terminologyServer?: string;
  
  /** FHIR data server endpoint URL */
  dataServer?: string;
  
  /** Additional renderer-specific configuration */
  configuration?: Record<string, any>;
}

/**
 * Configuration response payload
 */
export interface SdcConfigureResponsePayload {
  /** Configuration acceptance status */
  status: 'success' | 'error';
  
  /** Operation outcome with details */
  outcome?: fhir4.OperationOutcome;
}

/**
 * Complete configure request message
 */
export type SdcConfigureRequest = SmartWebMessagingRequest<SdcConfigureRequestPayload>;

/**
 * Complete configure response message
 */
export type SdcConfigureResponse = SmartWebMessagingResponse<SdcConfigureResponsePayload>;

// ============================================================================
// sdc.configureContext
// ============================================================================

/**
 * Configure context request payload
 * Host → Renderer
 * 
 * IMPORTANT: This message REPLACES all context data.
 * Any previously set context values will be overwritten or cleared.
 */
export interface SdcConfigureContextRequestPayload {
  /** Context data container (replaces all existing context) */
  context?: QuestionnaireContext;
}

/**
 * Configure context response payload
 */
export interface SdcConfigureContextResponsePayload {
  /** Context acceptance status */
  status: 'success' | 'error';
  
  /** Operation outcome with details */
  outcome?: fhir4.OperationOutcome;
}

/**
 * Complete configure context request message
 */
export type SdcConfigureContextRequest = SmartWebMessagingRequest<SdcConfigureContextRequestPayload>;

/**
 * Complete configure context response message
 */
export type SdcConfigureContextResponse = SmartWebMessagingResponse<SdcConfigureContextResponsePayload>;

// ============================================================================
// sdc.displayQuestionnaire
// ============================================================================

/**
 * Display questionnaire request payload
 * Host → Renderer
 * 
 * IMPORTANT: If context is provided in this message, it will be MERGED
 * with any context data previously sent via sdc.configureContext:
 * - Simple properties (subject, author, encounter): Overwrite only if provided
 * - launchContext array: Merged by name - items with same name are overwritten,
 *   new items are added, existing items with different names are preserved
 */
export interface SdcDisplayQuestionnaireRequestPayload {
  /** Questionnaire to render */
  questionnaire: fhir4.Questionnaire;
  
  /** Pre-existing response (optional) */
  questionnaireResponse?: fhir4.QuestionnaireResponse;
  
  /** Context data (merged with existing context if provided) */
  context?: QuestionnaireContext;
}

/**
 * Display questionnaire response payload
 */
export interface SdcDisplayQuestionnaireResponsePayload {
  /** Questionnaire rendering status */
  status: 'success' | 'error';
  
  /** Operation outcome with details */
  outcome?: fhir4.OperationOutcome;
}

/**
 * Complete display questionnaire request message
 */
export type SdcDisplayQuestionnaireRequest = SmartWebMessagingRequest<SdcDisplayQuestionnaireRequestPayload>;

/**
 * Complete display questionnaire response message
 */
export type SdcDisplayQuestionnaireResponse = SmartWebMessagingResponse<SdcDisplayQuestionnaireResponsePayload>;

// ============================================================================
// sdc.displayQuestionnaireResponse
// ============================================================================

/**
 * Display questionnaire response request payload
 * Host → Renderer
 * 
 * If there is no questionnaire contained in the response or provided in the message,
 * then the system needs to resolve the Questionnaire from a forms server.
 */
export interface SdcDisplayQuestionnaireResponseRequestPayload {
  /** QuestionnaireResponse to display */
  questionnaireResponse: fhir4.QuestionnaireResponse;
  
  /** Questionnaire (optional - may be resolved from canonical URL) */
  questionnaire?: fhir4.Questionnaire;
}

/**
 * Display questionnaire response response payload
 */
export interface SdcDisplayQuestionnaireResponseResponsePayload {
  /** QuestionnaireResponse rendering status */
  status: 'success' | 'error';
  
  /** Operation outcome with details */
  outcome?: fhir4.OperationOutcome;
}

/**
 * Complete display questionnaire response request message
 */
export type SdcDisplayQuestionnaireResponseRequest = SmartWebMessagingRequest<SdcDisplayQuestionnaireResponseRequestPayload>;

/**
 * Complete display questionnaire response response message
 */
export type SdcDisplayQuestionnaireResponseResponse = SmartWebMessagingResponse<SdcDisplayQuestionnaireResponseResponsePayload>;

// ============================================================================
// sdc.requestCurrentQuestionnaireResponse
// ============================================================================

/**
 * Request current questionnaire response request payload
 * Host → Renderer
 * 
 * Empty payload - requests the current state of the form
 */
export type SdcRequestCurrentQuestionnaireResponseRequestPayload = Record<string, never>;

/**
 * Request current questionnaire response response payload
 */
export interface SdcRequestCurrentQuestionnaireResponseResponsePayload {
  /** 
   * Current form data
   * Required unless an outcome is provided with details as to why not
   */
  questionnaireResponse?: fhir4.QuestionnaireResponse;
  
  /** Operation outcome (e.g., if unable to return response) */
  outcome?: fhir4.OperationOutcome;
}

/**
 * Complete request current questionnaire response request message
 */
export type SdcRequestCurrentQuestionnaireResponseRequest = SmartWebMessagingRequest<SdcRequestCurrentQuestionnaireResponseRequestPayload>;

/**
 * Complete request current questionnaire response response message
 */
export type SdcRequestCurrentQuestionnaireResponseResponse = SmartWebMessagingResponse<SdcRequestCurrentQuestionnaireResponseResponsePayload>;

// ============================================================================
// sdc.requestExtract
// ============================================================================

/**
 * Request extract request payload
 * Host → Renderer
 * 
 * If no QuestionnaireResponse provided, assumes the currently displayed data.
 * If questionnaire provided, use it instead of any already resolved/rendered.
 */
export interface SdcRequestExtractRequestPayload {
  /** Response to extract from (if not provided, uses current) */
  questionnaireResponse?: fhir4.QuestionnaireResponse;
  
  /** Questionnaire for context (optional) */
  questionnaire?: fhir4.Questionnaire;
}

/**
 * Request extract response payload
 */
export interface SdcRequestExtractResponsePayload {
  /** Extraction outcome (always required) */
  outcome: fhir4.OperationOutcome;
  
  /** Array of extracted FHIR resources */
  extractedResources?: fhir4.Resource[];
}

/**
 * Complete request extract request message
 */
export type SdcRequestExtractRequest = SmartWebMessagingRequest<SdcRequestExtractRequestPayload>;

/**
 * Complete request extract response message
 */
export type SdcRequestExtractResponse = SmartWebMessagingResponse<SdcRequestExtractResponsePayload>;

// ============================================================================
// sdc.ui.changedQuestionnaireResponse
// ============================================================================

/**
 * Changed questionnaire response event payload
 * Renderer → Host (unsolicited)
 * 
 * Notifies host that the QuestionnaireResponse has changed.
 * The changed fields MAY be notified via linkIds and/or paths, or not at all.
 */
export interface SdcUiChangedQuestionnaireResponsePayload {
  /** Updated QuestionnaireResponse */
  questionnaireResponse: fhir4.QuestionnaireResponse;
  
  /** Array of changed item linkIds */
  changedLinkIds?: string[];
  
  /** Array of changed item FHIRPath expressions */
  changedPaths?: string[];
}

/**
 * Changed questionnaire response acknowledgment response payload
 */
export interface SdcUiChangedQuestionnaireResponseResponsePayload {
  /** Status of the interaction */
  status: 'success' | 'error';
  
  /** Optional detail about the status */
  statusDetail?: fhir4.CodeableConcept;
}

/**
 * Complete changed questionnaire response event message
 */
export type SdcUiChangedQuestionnaireResponseEvent = SmartWebMessagingEvent<SdcUiChangedQuestionnaireResponsePayload>;

/**
 * Complete changed questionnaire response acknowledgment message
 */
export type SdcUiChangedQuestionnaireResponseResponse = SmartWebMessagingResponse<SdcUiChangedQuestionnaireResponseResponsePayload>;

// ============================================================================
// sdc.ui.changedFocus
// ============================================================================

/**
 * Changed focus event payload
 * Renderer → Host (unsolicited)
 * 
 * Notifies host that the focus has changed to a specific field
 */
export interface SdcUiChangedFocusPayload {
  /** Item linkId that has focus */
  linkId: string;
  
  /** FHIRPath/JSON path to specific field (optional) */
  focus_field?: string;
}

/**
 * Changed focus acknowledgment response payload
 */
export interface SdcUiChangedFocusResponsePayload {
  /** Status of the interaction */
  status: 'success' | 'error';
  
  /** Optional detail about the status */
  statusDetail?: fhir4.CodeableConcept;
}

/**
 * Complete changed focus event message
 */
export type SdcUiChangedFocusEvent = SmartWebMessagingEvent<SdcUiChangedFocusPayload>;

/**
 * Complete changed focus acknowledgment message
 */
export type SdcUiChangedFocusResponse = SmartWebMessagingResponse<SdcUiChangedFocusResponsePayload>;

// ============================================================================
// ui.done
// ============================================================================

/**
 * UI done event payload
 * Renderer → Host (unsolicited)
 * 
 * Standard SMART-WM message indicating user has completed interaction
 * 
 * IMPORTANT: This does NOT automatically save or submit the QuestionnaireResponse.
 * Host should send sdc.requestCurrentQuestionnaireResponse first if final data is needed.
 * Host should typically close/hide the iframe or popup window after responding.
 */
export type UiDonePayload = Record<string, never>;

/**
 * UI done acknowledgment response payload
 */
export interface UiDoneResponsePayload {
  /** Status of the interaction */
  status: 'success' | 'error';
  
  /** Optional detail about the status */
  statusDetail?: fhir4.CodeableConcept;
}

/**
 * Complete UI done event message
 */
export type UiDoneEvent = SmartWebMessagingEvent<UiDonePayload>;

/**
 * Complete UI done acknowledgment message
 */
export type UiDoneResponse = SmartWebMessagingResponse<UiDoneResponsePayload>;

// ============================================================================
// Union Types for Message Routing
// ============================================================================

/**
 * All possible request message payloads
 */
export type SdcRequestPayload =
  | StatusHandshakeRequestPayload
  | SdcConfigureRequestPayload
  | SdcConfigureContextRequestPayload
  | SdcDisplayQuestionnaireRequestPayload
  | SdcDisplayQuestionnaireResponseRequestPayload
  | SdcRequestCurrentQuestionnaireResponseRequestPayload
  | SdcRequestExtractRequestPayload;

/**
 * All possible response message payloads
 */
export type SdcResponsePayload =
  | StatusHandshakeResponsePayload
  | SdcConfigureResponsePayload
  | SdcConfigureContextResponsePayload
  | SdcDisplayQuestionnaireResponsePayload
  | SdcDisplayQuestionnaireResponseResponsePayload
  | SdcRequestCurrentQuestionnaireResponseResponsePayload
  | SdcRequestExtractResponsePayload
  | SdcUiChangedQuestionnaireResponseResponsePayload
  | SdcUiChangedFocusResponsePayload
  | UiDoneResponsePayload;

/**
 * All possible event message payloads
 */
export type SdcEventPayload =
  | SdcUiChangedQuestionnaireResponsePayload
  | SdcUiChangedFocusPayload
  | UiDonePayload;

/**
 * All possible request messages
 */
export type SdcRequest =
  | StatusHandshakeRequest
  | SdcConfigureRequest
  | SdcConfigureContextRequest
  | SdcDisplayQuestionnaireRequest
  | SdcDisplayQuestionnaireResponseRequest
  | SdcRequestCurrentQuestionnaireResponseRequest
  | SdcRequestExtractRequest;

/**
 * All possible response messages
 */
export type SdcResponse =
  | StatusHandshakeResponse
  | SdcConfigureResponse
  | SdcConfigureContextResponse
  | SdcDisplayQuestionnaireResponse
  | SdcDisplayQuestionnaireResponseResponse
  | SdcRequestCurrentQuestionnaireResponseResponse
  | SdcRequestExtractResponse
  | SdcUiChangedQuestionnaireResponseResponse
  | SdcUiChangedFocusResponse
  | UiDoneResponse;

/**
 * All possible event messages
 */
export type SdcEvent =
  | SdcUiChangedQuestionnaireResponseEvent
  | SdcUiChangedFocusEvent
  | UiDoneEvent;

/**
 * Any SDC-SWM message
 */
export type SdcMessage = SdcRequest | SdcResponse | SdcEvent;

// ============================================================================
// Helper Type Guards
// ============================================================================

/**
 * Type guard to check if a message is a request
 */
export function isRequest(message: any): message is SmartWebMessagingRequest {
  return message && 
         typeof message.messagingHandle === 'string' &&
         typeof message.messageId === 'string' &&
         typeof message.messageType === 'string' &&
         typeof message.payload === 'object' &&
         !('responseToMessageId' in message);
}

/**
 * Type guard to check if a message is a response
 */
export function isResponse(message: any): message is SmartWebMessagingResponse {
  return message && 
         typeof message.messageId === 'string' &&
         typeof message.responseToMessageId === 'string' &&
         typeof message.payload === 'object';
}

/**
 * Type guard to check if a message is an unsolicited event
 * 
 * Events are requests initiated by the renderer (not responses to host requests).
 * They are identified by specific message types (sdc.ui.* or ui.*).
 */
export function isEvent(message: any): message is SmartWebMessagingEvent {
  return isRequest(message) &&
         (message.messageType.startsWith('sdc.ui.') || message.messageType.startsWith('ui.'));
}

// ============================================================================
// Message Handler Type Definitions
// ============================================================================

/**
 * Type for message handler functions (Host-side)
 */
export interface SdcHostMessageHandlers {
  /** Handle handshake from renderer */
  handleStatusHandshake?: (message: StatusHandshakeRequest) => Promise<StatusHandshakeResponsePayload>;
  
  /** Handle unsolicited response update from renderer */
  handleChangedQuestionnaireResponse?: (event: SdcUiChangedQuestionnaireResponseEvent) => Promise<SdcUiChangedQuestionnaireResponseResponsePayload>;
  
  /** Handle unsolicited focus change from renderer */
  handleChangedFocus?: (event: SdcUiChangedFocusEvent) => Promise<SdcUiChangedFocusResponsePayload>;
  
  /** Handle UI done event from renderer */
  handleUiDone?: (event: UiDoneEvent) => Promise<UiDoneResponsePayload>;
}

/**
 * Type for message handler functions (Renderer-side)
 */
export interface SdcRendererMessageHandlers {
  /** Handle handshake from host */
  handleStatusHandshake?: (message: StatusHandshakeRequest) => Promise<StatusHandshakeResponsePayload>;
  
  /** Handle configuration from host */
  handleSdcConfigure?: (message: SdcConfigureRequest) => Promise<SdcConfigureResponsePayload>;
  
  /** Handle context configuration from host */
  handleSdcConfigureContext?: (message: SdcConfigureContextRequest) => Promise<SdcConfigureContextResponsePayload>;
  
  /** Handle questionnaire display request from host */
  handleSdcDisplayQuestionnaire?: (message: SdcDisplayQuestionnaireRequest) => Promise<SdcDisplayQuestionnaireResponsePayload>;
  
  /** Handle questionnaire response display request from host */
  handleSdcDisplayQuestionnaireResponse?: (message: SdcDisplayQuestionnaireResponseRequest) => Promise<SdcDisplayQuestionnaireResponseResponsePayload>;
  
  /** Handle request for current questionnaire response from host */
  handleSdcRequestCurrentQuestionnaireResponse?: (message: SdcRequestCurrentQuestionnaireResponseRequest) => Promise<SdcRequestCurrentQuestionnaireResponseResponsePayload>;
  
  /** Handle extract request from host */
  handleSdcRequestExtract?: (message: SdcRequestExtractRequest) => Promise<SdcRequestExtractResponsePayload>;
  
  /** Handle UI done request from host (bidirectional support) */
  handleUiDone?: (event: UiDoneEvent) => Promise<UiDoneResponsePayload>;
}

// ============================================================================
// Utility Types
// ============================================================================

/**
 * Standard status values used in responses
 * All response status fields use this union type
 */
export type ResponseStatus = 'success' | 'error';
