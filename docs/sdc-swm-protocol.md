# SDC SMART Web Messaging - Message Protocol/Definitions

Quick reference for all proposed message payloads for the SDC SMART Web Messaging protocol.

> This proposed functionality will extend the [HL7 SMART Web Messaging standard](https://hl7.org/fhir/uv/smart-web-messaging/STU1/smart-web-messaging.html) with functionality specific to SDC Questionnaire rendering and interaction.

All request messages comply with the SMART Web Request structure, and all response messages comply with the SMART Web Response structure:
| Message | Property | Cardinality | type | Notes |
| ------- | -------- | ----------- | ---- | ----- |
| Request | messagingHandle | 1..1 | string | |
| Request | messageId | 1..1 | string | |
| Request | messageType | 1..1 | string | set of defined message types in this document |
| Request | payload | 1..1 | object | defined per request message type in this document |
| Response | messageId | 1..1 | string | |
| Response | responseToMessageId | 1..1 | string | |
| Response | additionalResponsesExpected | 0..1 | boolean | Currently unused by this protocol. May be used in future versions for streaming operations. |
| Response | payload | 1..1 | object | defined per request message type in this document |

### Message Types Summary
All `messageType`s in this document are prefixed with `sdc.` or `sdc.ui` to avoid collisions with other SMART Web Messaging implementations.

Legend: H = Host (e.g. FHIRPath Lab), R = Renderer (e.g. Forms Engine)

| MessageType | Dir | Description |
| ----------- | --- | ----------- |
| `status.handshake` | H→R, R→H | *(Standard SMART-WM)* Initial handshake to establish communication channel and capabilities *(payload empty object: `{}`)*<br/> *Can be initiated by either party* |
| `sdc.configure` | H→R | Send configuration data to the renderer *(e.g. terminology server, data server, etc.)* |
| `sdc.configureContext` | H→R | Send context data *(patient, encounter, author, etc.)* |
| `sdc.displayQuestionnaire` | H→R | Send a Questionnaire to render *(optional context data MAY be included)* |
| `sdc.displayQuestionnaireResponse` | H→R | Send a QuestionnaireResponse to render *(Questionnaire could be contained, or referenced - may have been pre-loaded using `sdc.displayQuestionnaire`, alternately system needs to resolve the Questionnaire from a forms server)* |
| `sdc.requestCurrentQuestionnaireResponse` | H→R | Request the current QuestionnaireResponse data displayed in the renderer |
| `sdc.requestExtract` | H→R | Request evaluation of $extract logic *(if no QuestionnaireResponse provided, assumes the currently displayed data)* |
| `sdc.ui.changedQuestionnaireResponse` | R→H | Notify host that the QuestionnaireResponse has changed *(unsolicited)* |
| `sdc.ui.changedFocus` | R→H | Notify host that the focus has changed *(unsolicited - linkId/simple path expression)* |
| `ui.done` | R→H | *(Standard SMART-WM)* Notify host that the user has completed interaction with the renderer *(payload empty object: `{}`)* |

All messages will have an appropriate reply message, which is documented in the full protocol specification below.

## Core Message Types

### `status.handshake`
> **Migration Note:** Previously: `questionnaire.handshake`

**Direction:** Bidirectional  
**Purpose:** Discover capabilities and establish protocol version

**Request Payload Properties:**

| Name | Type | Cardinality | Notes |
| ---- | ---- | ----------- | ----- |
| `protocolVersion` | `string` | 1..1 | Protocol version (e.g., "1.0") |
| `fhirVersion` | `string` | 0..1 | FHIR version (e.g., "R4", "R4B", "R5") |

```typescript
interface StatusHandshakeRequest {
  protocolVersion: string;
  fhirVersion?: string;
}
```

**Response Payload Properties:**

| Name | Type | Cardinality | Notes |
| ---- | ---- | ----------- | ----- |
| `application` | `object` | 0..1 | Application details |
| `application.name` | `string` | 1..1 | Application name |
| `application.version` | `string` | 0..1 | Application version |
| `application.publisher` | `string` | 0..1 | Publisher name |
| `capabilities` | `object` | 0..1 | Supported capabilities |
| `capabilities.extraction` | `boolean` | 0..1 | Supports extraction |
| `capabilities.focusChangeNotifications` | `boolean` | 0..1 | Supports focus change notifications |
| `availableEngines` | `Array` | 0..1 | Available engines *(FHIRPath Lab only)* |
| `availableEngines.id` | `string` | 1..1 | Engine identifier |
| `availableEngines.name` | `string` | 1..1 | Display name |

```typescript
interface StatusHandshakeResponse {
  application: {
    name: string;
    version?: string;
    publisher?: string;
  };
  capabilities?: {
    extraction?: boolean;
    focusChangeNotifications?: boolean;
  };
  availableEngines?: Array<{
    id: string;
    name: string;
  }>;
}
```

---

### `sdc.configure`

**Direction:** Host → Renderer  
**Purpose:** Send configuration data to the renderer *(e.g. terminology server, data server, etc.)*

**Request Payload Properties:**

| Name | Type | Cardinality | Notes |
| ---- | ---- | ----------- | ----- |
| `terminologyServer` | `string` | 0..1 | Terminology server endpoint URL |
| `dataServer` | `string` | 0..1 | FHIR data server endpoint URL |
| `configuration` | `object` | 0..1 | Additional renderer-specific configuration |

```typescript
interface SdcConfigureRequest {
  terminologyServer?: string;
  dataServer?: string;
  configuration?: object;
}
```

**Response Payload Properties:**

| Name | Type | Cardinality | Notes |
| ---- | ---- | ----------- | ----- |
| `status` | `string` | 1..1 | Configuration acceptance status, either 'success' or 'error' |
| `outcome` | `r4.OperationOutcome` | 0..1 | Operation outcome with details |

```typescript
interface SdcConfigureResponse {
  status: 'success' | 'error';
  outcome?: r4.OperationOutcome;
}
```

---

### `sdc.configureContext`

**Direction:** Host → Renderer  
**Purpose:** Send context data *(patient, encounter, author, etc.)*

This message **replaces** all context data.
Any previously set context values will be overwritten or cleared.

**Request Payload Properties:**

| Name | Type | Cardinality | Notes |
| ---- | ---- | ----------- | ----- |
| `context` | `object` | 0..1 | Context data container object |
| `context.subject` | `r4.Reference` | 0..1 | Patient/subject reference |
| `context.author` | `r4.Reference` | 0..1 | Practitioner/author reference |
| `context.encounter` | `r4.Reference` | 0..1 | Encounter context |
| `context.launchContext` | `Array` | 0..* | SDC launch context(s) for pre-population |
| `context.launchContext.name` | `string` | 1..1 | Variable name (e.g., "patient") |
| `context.launchContext.content[x]` | `r4.Reference` or `r4.Resource` | 1..1 | Resource reference or inline resource |

```typescript
interface SdcConfigureContextRequest {
  context?: {
    subject?: r4.Reference;
    author?: r4.Reference;
    encounter?: r4.Reference;
    launchContext?: Array<{
      name: string;
      contentReference?: r4.Reference;
      contentResource?: r4.Resource;
    }>;
  };
}
```

**Response Payload Properties:**

| Name | Type | Cardinality | Notes |
| ---- | ---- | ----------- | ----- |
| `status` | `string` | 1..1 | Context acceptance status, either 'success' or 'error' |
| `outcome` | `r4.OperationOutcome` | 0..1 | Operation outcome with details |

```typescript
interface SdcConfigureContextResponse {
  status: 'success' | 'error';
  outcome?: r4.OperationOutcome;
}
```

---

### `sdc.displayQuestionnaire`
> **Migration Note:** Previously: `questionnaire.render`

**Direction:** Host → Renderer  
**Purpose:** Send Questionnaire with context to render

If context is provided in this message, it will be **merged** with any context data that was previously sent via `sdc.configureContext`.
- Simple properties (subject, author, encounter): Overwrite only if provided in this message
- `launchContext` array: Merged by `name` - items with the same `name` are overwritten, new items are added, existing items with different names are preserved

**Payload Properties:**

| Name | Type | Cardinality | Notes |
| ---- | ---- | ----------- | ----- |
| `questionnaire` | `r4.Questionnaire` | 1..1 | Questionnaire to render |
| `questionnaireResponse` | `r4.QuestionnaireResponse` | 0..1 | Pre-existing response |
| `context` | `object` | 0..1 | Context data container object |
| `context.subject` | `r4.Reference` | 0..1 | Patient/subject reference |
| `context.author` | `r4.Reference` | 0..1 | Practitioner/author reference |
| `context.encounter` | `r4.Reference` | 0..1 | Encounter context |
| `context.launchContext` | `Array` | 0..* | SDC launch context(s) for pre-population.<br/>If there is no value, don't include it. |
| `context.launchContext.name` | `string` | 1..1 | Variable name (e.g., "patient") |
| `context.launchContext.content[x]` | `r4.Reference` or `r4.Resource` | 1..1 | Resource reference or inline resource |

```typescript
interface SdcDisplayQuestionnaireRequest {
  questionnaire: r4.Questionnaire;
  questionnaireResponse?: r4.QuestionnaireResponse;
  context?: {
    subject?: r4.Reference;
    author?: r4.Reference;
    encounter?: r4.Reference;
    launchContext?: Array<{
      name: string;
      contentReference?: r4.Reference;
      contentResource?: r4.Resource;
    }>;
  };
}
```

**Response Payload Properties:** 

| Name | Type | Cardinality | Notes |
| ---- | ---- | ----------- | ----- |
| `status` | `string` | 1..1 | Questionnaire rendering status, either 'success' or 'error' |
| `outcome` | `r4.OperationOutcome` | 0..1 | Operation outcome with details |

```typescript
interface SdcDisplayQuestionnaireResponse {
  status: 'success' | 'error';
  outcome?: r4.OperationOutcome;
}
```

---

### `sdc.displayQuestionnaireResponse`
> **Migration Note:** Previously: `questionnaire.loadResponse`

**Direction:** Host → Renderer  
**Purpose:** Load existing QuestionnaireResponse with context

If there is no questionnaire contained in the response, or provided in the message, then the system needs to resolve the Questionnaire from a forms server.

There is no context information as specific properties in this message as most are in the response itself, and any others are there via the use of the `sdc.configureContext` message.

**Payload Properties:**

| Name | Type | Cardinality | Notes |
| ---- | ---- | ----------- | ----- |
| `questionnaireResponse` | `r4.QuestionnaireResponse` | 1..1 | Response to load |
| `questionnaire` | `r4.Questionnaire` | 0..1 | Questionnaire to load |

```typescript
interface SdcDisplayQuestionnaireResponseRequest {
  questionnaireResponse: r4.QuestionnaireResponse;
  questionnaire?: r4.Questionnaire;
}
```

**Response Payload Properties:** 

| Name | Type | Cardinality | Notes |
| ---- | ---- | ----------- | ----- |
| `status` | `string` | 1..1 | QuestionnaireResponse rendering status, either 'success' or 'error' |
| `outcome` | `r4.OperationOutcome` | 0..1 | Operation outcome with details |

```typescript
interface SdcDisplayQuestionnaireResponseResponse {
  status: 'success' | 'error';
  outcome?: r4.OperationOutcome;
}
```

---

### `sdc.requestCurrentQuestionnaireResponse`
> **Migration Note:** Previously: `questionnaire.extract`

**Direction:** Host → Renderer  
**Purpose:** Get current QuestionnaireResponse with context

**Request Payload:** Empty `{}`

**Response Payload Properties:**

| Name | Type | Cardinality | Notes |
| ---- | ---- | ----------- | ----- |
| `questionnaireResponse` | `r4.QuestionnaireResponse` | 0..1 | Current form data - required unless an outcome is provided with the details as to why not. |
| `outcome` | `r4.OperationOutcome` | 0..1 | Extraction outcome |

```typescript
interface SdcRequestCurrentQuestionnaireResponseResponse {
  questionnaireResponse?: r4.QuestionnaireResponse;
  outcome?: r4.OperationOutcome;
}
```

---

### `sdc.requestExtract`

**Direction:** Host → Renderer  
**Purpose:** Request evaluation of $extract logic 

If no QuestionnaireResponse provided, assumes the currently displayed data.

If there is a questionnaire provided, that should be used instead of any others already resolved/rendered.<br/>
*(This is to provide a mechanism for other derived questionnaires to have the additional metadata for testing/running extraction)*

**Request Payload Properties:**

| Name | Type | Cardinality | Notes |
| ---- | ---- | ----------- | ----- |
| `questionnaireResponse` | `r4.QuestionnaireResponse` | 0..1 | Response to extract from *(if not provided, uses current)* |
| `questionnaire` | `r4.Questionnaire` | 0..1 | Questionnaire for context |

```typescript
interface SdcRequestExtractRequest {
  questionnaireResponse?: r4.QuestionnaireResponse;
  questionnaire?: r4.Questionnaire;
}
```

**Response Payload Properties:**

| Name | Type | Cardinality | Notes |
| ---- | ---- | ----------- | ----- |
| `outcome` | `r4.OperationOutcome` | 1..1 | Extraction outcome |
| `extractedResources` | `Array<r4.Resource>` | 0..1 | Array of extracted FHIR resources |

```typescript
interface SdcRequestExtractResponse {
  outcome: r4.OperationOutcome;
  extractedResources?: Array<r4.Resource>;
}
```

---


## Renderer-Initiated Request Messages

These messages are initiated by the renderer to notify the host of events (form changes, focus changes, completion). They follow the same pattern as SMART Web Messaging's `ui.done` message — the renderer sends a request, and the host must respond with an acknowledgment.

### `sdc.ui.changedQuestionnaireResponse`
> **Migration Note:** Previously: `questionnaire.event.responseUpdated`

**Direction:** Renderer → Host  
**Purpose:** Notify host that the QuestionnaireResponse has changed *(unsolicited)*

**Payload Properties:**
Note: The changed fields MAY be notified via linkIds and/or paths, or not at all.

| Name | Type | Cardinality | Notes |
| ---- | ---- | ----------- | ----- |
| `questionnaireResponse` | `r4.QuestionnaireResponse` | 1..1 | Updated response |
| `changedLinkIds` | `string[]` | 0..1 | Array of changed item linkIds |
| `changedPaths` | `string[]` | 0..1 | Array of changed item paths |

```typescript
interface SdcUiChangedQuestionnaireResponsePayload {
  questionnaireResponse: r4.QuestionnaireResponse;
  changedLinkIds?: string[];
  changedPaths?: string[];
}
```

**Response Payload Properties:** 

Same as `ui.done` response. For implementer convenience, the structure is:

| Name | Type | Cardinality | Notes |
| ---- | ---- | ----------- | ----- |
| `status` | `string` | 1..1 | Status of the interaction, either 'success' or 'error' |
| `statusDetail` | `r4.CodeableConcept` | 0..1 | Optional detail about the status |

```typescript
interface SdcUiChangedQuestionnaireResponseResponse {
  status: 'success' | 'error';
  statusDetail?: r4.CodeableConcept;
}
```

---

### `sdc.ui.changedFocus`
> **Migration Note:** Previously: `questionnaire.event.fieldFocused` *(merged/renamed)*

**Direction:** Renderer → Host  
**Purpose:** Notify host that the focus has changed *(unsolicited)*

**Payload Properties:**

| Name | Type | Cardinality | Notes |
| ---- | ---- | ----------- | ----- |
| `linkId` | `string` | 1..1 | Item linkId to focus |
| `focus_field` | `string` | 0..1 | FHIRPath/JSON path to specific field |

```typescript
interface SdcUiChangedFocusPayload {
  linkId: string;
  focus_field?: string;
}
```

**Response Payload Properties:** 

Same as `ui.done` response. For implementer convenience, the structure is:

| Name | Type | Cardinality | Notes |
| ---- | ---- | ----------- | ----- |
| `status` | `string` | 1..1 | Status of the interaction, either 'success' or 'error' |
| `statusDetail` | `r4.CodeableConcept` | 0..1 | Optional detail about the status |

```typescript
interface SdcUiChangedFocusResponse {
  status: 'success' | 'error';
  statusDetail?: r4.CodeableConcept;
}
```

---

### `ui.done`

**Direction:** Renderer → Host  
**Purpose:** *(Standard SMART-WM)* Notify host that the user has completed interaction with the renderer

**Payload Properties:**

Empty object `{}`

**Response Payload Properties:** 

| Name | Type | Cardinality | Notes |
| ---- | ---- | ----------- | ----- |
| `status` | `string` | 1..1 | Status of the interaction, either 'success' or 'error' |
| `statusDetail` | `r4.CodeableConcept` | 0..1 | Optional detail about the status |

```typescript
interface UiDoneResponse {
  status: 'success' | 'error';
  statusDetail?: r4.CodeableConcept;
}
```

**Usage Notes:**
- This message signals that the user has finished working with the form and the renderer can be closed
- The host application should typically close/hide the iframe or popup window upon receiving this message
- This does NOT automatically save or submit the QuestionnaireResponse - use `sdc.requestCurrentQuestionnaireResponse` first if you need to retrieve the final data
- Common triggers: user clicks "Done", "Close", "Cancel", or similar UI action in the renderer

**Typical Flow:**
1. User completes form interaction
2. Renderer → Host: `ui.done`
3. Host optionally sends `sdc.requestCurrentQuestionnaireResponse` to retrieve final data
4. Host → Renderer: Response to `ui.done` with status that it will close/hide the renderer (renderer should not expect any further interaction from here if accepted)
5. Host closes/hides the renderer

---


## Message Flow Examples

### Typical Rendering Flow
1. Host → Renderer: `status.handshake`
2. Renderer → Host: `status.handshake` (response with capabilities)
3. Host → Renderer: `sdc.configure` (with configuration data)
4. Renderer → Host: Response (success/failure)
5. Host → Renderer: `sdc.configureContext` (with patient, encounter, author)
6. Renderer → Host: Response (success/failure)
7. Host → Renderer: `sdc.displayQuestionnaire` (with Questionnaire + context)
8. Renderer → Host: Response (success/failure)
9. Renderer → Host: `sdc.ui.changedQuestionnaireResponse` (as user fills form)
10. Renderer → Host: `sdc.ui.changedFocus` (as user focuses fields while navigating and filling the form)
11. Host → Renderer: `sdc.requestCurrentQuestionnaireResponse` (when host needs current data)
12. Renderer → Host: Response (with QuestionnaireResponse)

### Extract Flow
1. Host → Renderer: `sdc.requestExtract` (request extraction)
2. Renderer → Host: Response (with extracted resources and outcome)

---

## See Also

- [Reverse Integration Implementation Guide](sdc-swm-launch-fhirpath-lab.md) - Includes production-ready JavaScript integration library
- [SMART Web Messaging STU1](https://hl7.org/fhir/uv/smart-web-messaging/STU1/)
