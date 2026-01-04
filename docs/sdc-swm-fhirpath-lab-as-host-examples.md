# FHIRPath Lab Iframe Renderer Protocol Specification

**Version:** 2.0  
**Status:** Draft  
**Updated:** October 2025  
**Based on:** [SMART Web Messaging STU1](https://hl7.org/fhir/uv/smart-web-messaging/STU1/)

> **⚠️ BREAKING CHANGES in v2.0:**
> - All `questionnaire.*` message types renamed to `sdc.*` for SDC-specific namespace
> - `questionnaire.handshake` → `status.handshake` (standard SMART-WM)
> - [Quick Reference: SDC SMART Web Messaging Protocol](sdc-swm-protocol.md)

## Overview

The FHIRPath Lab Iframe Renderer Protocol defines a standardized messaging interface for external forms engines to integrate securely with the FHIRPath Lab platform. This protocol extends [SMART Web Messaging](https://hl7.org/fhir/uv/smart-web-messaging/STU1/) with SDC-specific message types, providing a standards-based approach to forms engine integration.

External engines implement this protocol to provide questionnaire rendering, response collection, and validation services without requiring JavaScript code inclusion in the main FHIRPath Lab application.

**Quick Reference:** For a concise summary of all message types and payloads, see [SDC SMART Web Messaging Protocol](sdc-swm-protocol.md).

**Reverse Integration:** External systems (EHRs, form builders, testing tools) can also embed FHIRPath Lab using the same protocol to leverage its multiple rendering engines. See the [Reverse Integration Implementation Guide](sdc-swm-launch-fhirpath-lab.md) for complete documentation including a production-ready JavaScript integration library.

## Conformance Language

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this specification are to be interpreted as described in [RFC2119](https://tools.ietf.org/html/rfc2119).

## Architecture

### Core Principles

1. **Zero Trust**: No external JavaScript code is loaded into FHIRPath Lab
2. **Standards-Based**: Built on SMART Web Messaging for interoperability
3. **Message-Based Communication**: All interaction occurs via secure PostMessage API
4. **Messaging Handle Authorization**: Uses messaging handles for correlation and security
5. **Origin Verification**: All messages are validated by origin
6. **User Consent**: Explicit user consent required for data sharing
7. **Protocol Versioning**: Forward and backward compatibility support

### Communication Flow

#### Mode 1: FHIRPath Lab Embeds External Engine (Primary Use Case)

```
FHIRPath Lab (Parent) ←→ PostMessage ←→ External Engine (Iframe/Popup)
```

FHIRPath Lab loads an external questionnaire engine in an iframe or popup window to render forms.

#### Mode 2: External System Embeds FHIRPath Lab (Reverse Integration)

```
External System (Parent) ←→ PostMessage ←→ FHIRPath Lab (Iframe/Popup)
```

An external EHR or application can embed FHIRPath Lab to leverage its questionnaire testing and rendering capabilities.

**Note:** HTML5 Web Messaging works in both iframe and popup/new window contexts. Systems can choose the integration mode that best fits their use case.

## Message Format

All messages SHALL follow the SMART Web Messaging structure. For detailed payload specifications, see [SDC SMART Web Messaging Protocol](sdc-swm-protocol.md).

### Request Message Format

```typescript
interface SmartWebMessage {
  messagingHandle: string;    // Authorization handle (from launch context)
  messageId: string;          // Unique ID for this message
  messageType: string;        // Type of message (e.g., "sdc.displayQuestionnaire")
  payload: object;            // Message content as specified by messageType
}
```

### Response Message Format

```typescript
interface SmartWebMessageResponse {
  messageId: string;                    // Unique ID for this response
  responseToMessageId: string;          // messageId from the request
  additionalResponsesExpected?: boolean; // If true, more responses will follow
  payload: object;                       // Response content
}
```

## Engine Integration

### Launch Context

FHIRPath Lab provides engines with a launch context containing:

1. **`messaging_origin`**: The origin FHIRPath Lab expects the engine to use as `targetOrigin` when calling `postMessage()`
2. **`messaging_handle`**: A unique handle for authorizing and correlating messages with this engine session
3. **`engine_config`**: Configuration specific to this engine instance

These are passed via URL parameters when the iframe is created:

```
https://yourengine.com/fhirpath-lab-renderer?
  messaging_origin=https://fhirpath-lab.com&
  messaging_handle=bws8YCbyBtCYi5mWVgUDRqX8xcjiudCo&
  engine_id=aidbox&
  protocol_version=1.0
```

### Origin Validation

#### FHIRPath Lab (Parent) Requirements

FHIRPath Lab SHALL:
1. Know the set of allowed web origins for each registered engine
2. NOT process messages originating from origins outside this set
3. Use the engine's registered origin as the `targetOrigin` parameter when calling `postMessage()`
4. SHOULD NOT use `"*"` for `targetOrigin` for security reasons

#### External Engine Requirements

External engines SHALL:
1. Validate that `event.origin` matches the `messaging_origin` provided in launch context
2. Use the `messaging_origin` as the `targetOrigin` when sending messages to FHIRPath Lab
3. Return early (ignore) messages from unauthorized origins
4. Validate the `messagingHandle` in all incoming messages

## Message Types

**Note:** For complete message type specifications with payload details, see [SDC SMART Web Messaging Protocol](sdc-swm-protocol.md).

This section provides implementation-specific guidance and complete examples for engine developers.

### Establish Connection: `status.handshake`

> **Migration Note:** Previously `questionnaire.handshake` in v1.0

Following SMART Web Messaging's standard `status.handshake` pattern, engines SHALL implement a handshake to establish capabilities.

#### Handshake Request (FHIRPath Lab → Engine)

FHIRPath Lab or the engine MAY initiate a handshake after iframe load.

```json
{
  "messagingHandle": "bws8YCbyBtCYi5mWVgUDRqX8xcjiudCo",
  "messageId": "msg-1664464800000-abc123",
  "messageType": "status.handshake",
  "payload": {
    "protocolVersion": "2.0",
    "fhirVersion": "R4"
  }
}
```

#### Handshake Response (Engine → FHIRPath Lab)

The receiver SHALL respond exactly once with capabilities information.

```json
{
  "messageId": "msg-1664464800001-def456",
  "responseToMessageId": "msg-1664464800000-abc123",
  "payload": {
    "application": {
      "name": "Your Engine Name",
      "version": "2.1.0",
      "publisher": "Your Organization"
    },
    "capabilities": {
      "extraction": true,
      "focusChangeNotifications": true
    }
  }
}
```

> **See [sdc-swm-protocol.md](sdc-swm-protocol.md#statushandshake) for complete payload specifications.**
> 
> **Note:** The spec uses `application` (not `engine`) and defines specific capability flags like `extraction` and `focusChangeNotifications` rather than the legacy `rendering`, `validation`, etc.

### Questionnaire Operations: `sdc.*`

> **Migration Note:** Previously `questionnaire.*` namespace in v1.0. Now uses SDC-specific `sdc.*` prefix.

Following SMART's pattern of grouping related operations, SDC questionnaire-specific operations use the `sdc.*` namespace.

#### Display Questionnaire: `sdc.displayQuestionnaire`

> **Migration Note:** Previously `questionnaire.render` in v1.0

Sends a Questionnaire to the engine for rendering, optionally with an existing QuestionnaireResponse and context data (subject, author, etc.).

> **See [sdc-swm-protocol.md](sdc-swm-protocol.md#sdcdisplayquestionnaire) for complete payload specifications.**

**Request (FHIRPath Lab → Engine):**

```json
{
  "messagingHandle": "bws8YCbyBtCYi5mWVgUDRqX8xcjiudCo",
  "messageId": "msg-1664464800002-ghi789",
  "messageType": "sdc.displayQuestionnaire",
  "payload": {
    "questionnaire": {
      "resourceType": "Questionnaire",
      "id": "example-questionnaire",
      "status": "active"
      // ... full FHIR R4 Questionnaire
    },
    "questionnaireResponse": {
      "resourceType": "QuestionnaireResponse",
      "id": "existing-response",
      "questionnaire": "Questionnaire/example-questionnaire",
      "status": "in-progress"
      // ... full FHIR R4 QuestionnaireResponse (optional)
    },
    "context": {
      "subject": {
        "reference": "Patient/example",
        "display": "Peter James Chalmers"
      },
      "author": {
        "reference": "Practitioner/example",
        "display": "Dr. Adam Careful"
      },
      "encounter": {
        "reference": "Encounter/example"
      },
      "launchContext": [
        {
          "name": "patient",
          "content": {
            "reference": "Patient/example"
          }
        }
      ]
    }
  }
}
```

**Response (Engine → FHIRPath Lab):**

```json
{
  "messageId": "msg-1664464800003-jkl012",
  "responseToMessageId": "msg-1664464800002-ghi789",
  "payload": {
    "status": "success"
  }
}
```

---

#### Display QuestionnaireResponse: `sdc.displayQuestionnaireResponse`

> **Migration Note:** Previously `questionnaire.loadResponse` in v1.0

Provides a QuestionnaireResponse to render in the form (for editing/viewing). This is useful when the Questionnaire was already loaded via `sdc.displayQuestionnaire`.

> **See [sdc-swm-protocol.md](sdc-swm-protocol.md#sdcdisplayquestionnaireresponse) for complete payload specifications.**
> 
> **Note:** The spec includes an optional `questionnaire` parameter (not shown in example below) in case the Questionnaire wasn't pre-loaded.

**Request:**

```json
{
  "messagingHandle": "bws8YCbyBtCYi5mWVgUDRqX8xcjiudCo",
  "messageId": "msg-1664464800004-mno345",
  "messageType": "sdc.displayQuestionnaireResponse",
  "payload": {
    "questionnaireResponse": {
      "resourceType": "QuestionnaireResponse",
      "id": "example-response",
      "questionnaire": "Questionnaire/example-questionnaire",
      "status": "in-progress",
      "subject": {
        "reference": "Patient/example"
      },
      "authored": "2025-10-01T10:00:00Z"
      // ... full FHIR R4 QuestionnaireResponse
    }
  }
}
```

**Response:**

```json
{
  "messageId": "msg-1664464800005-pqr678",
  "responseToMessageId": "msg-1664464800004-mno345",
  "payload": {
    "status": "success"
  }
}
```

---

#### Request Current QuestionnaireResponse: `sdc.requestCurrentQuestionnaireResponse`

> **Migration Note:** Previously `questionnaire.extract` in v1.0 - **Semantic Change!**
> 
> This message now specifically requests the *current form data* as QuestionnaireResponse.
> For SDC $extract operation, use `sdc.requestExtract` instead (new in v2.0).

Requests the current form data as a QuestionnaireResponse.

> **See [sdc-swm-protocol.md](sdc-swm-protocol.md#sdcrequestcurrentquestionnaireresponse) for complete payload specifications.**
> 
> **Note:** The spec says `questionnaireResponse` is **optional** (0..1) in the response—may be absent with `outcome` explaining why (e.g., form not yet initialized, validation errors preventing extraction).

**Request:**

```json
{
  "messagingHandle": "bws8YCbyBtCYi5mWVgUDRqX8xcjiudCo",
  "messageId": "msg-1664464800006-stu901",
  "messageType": "sdc.requestCurrentQuestionnaireResponse",
  "payload": {}
}
```

**Response:**

```json
{
  "messageId": "msg-1664464800007-vwx234",
  "responseToMessageId": "msg-1664464800006-stu901",
  "payload": {
    "questionnaireResponse": {
      "resourceType": "QuestionnaireResponse",
      "id": "response-id",
      "questionnaire": "Questionnaire/example-questionnaire",
      "authored": "2025-10-02T10:30:00Z",
      "status": "in-progress",
      "subject": {
        "reference": "Patient/example"
      },
      "author": {
        "reference": "Practitioner/example"
      }
      // ... complete FHIR R4 QuestionnaireResponse
    }
  }
}
```

---

### UI Interactions: `sdc.ui.*`

> **Migration Note:** Previously `questionnaire.ui.*` in v1.0

Following SMART's `ui.*` pattern for UI control messages.

### Event Messages (Engine → FHIRPath Lab): `sdc.ui.changed*`

> **Migration Note:** Previously `questionnaire.event.*` in v1.0

These are unsolicited messages sent by the engine to notify FHIRPath Lab of events.

#### Questionnaire Response Updated: `sdc.ui.changedQuestionnaireResponse`

> **Migration Note:** Previously `questionnaire.event.responseUpdated` in v1.0

Sent whenever form data changes (real-time updates). This is an **unsolicited message** from the renderer to the host.

> **See [sdc-swm-protocol.md](sdc-swm-protocol.md#sdcuichangedquestionnaireresponse) for complete payload specifications.**
> 
> **Note:** The spec supports both `changedLinkIds` (item linkIds) and `changedPaths` (FHIRPath expressions) to indicate what changed. Use one or both as appropriate.

**Unsolicited Message (Engine → FHIRPath Lab):**

```json
{
  "messagingHandle": "bws8YCbyBtCYi5mWVgUDRqX8xcjiudCo",
  "messageId": "msg-1664464800014-qrs345",
  "messageType": "sdc.ui.changedQuestionnaireResponse",
  "payload": {
    "questionnaireResponse": {
      "resourceType": "QuestionnaireResponse",
      "id": "response-id",
      "questionnaire": "Questionnaire/example-questionnaire",
      "status": "in-progress",
      "subject": {
        "reference": "Patient/example"
      },
      "author": {
        "reference": "Practitioner/example"
      }
      // ... updated FHIR R4 QuestionnaireResponse
    },
    "changedLinkIds": ["patient.name.given", "patient.name.family"]
  }
}
```

**Response (FHIRPath Lab → Engine):**

```json
{
  "messageId": "msg-1664464800015-abc123",
  "responseToMessageId": "msg-1664464800014-qrs345",
  "payload": {
    "status": "done"
  }
}
```

**Note:** For streaming updates (e.g., multiple changes as user types), send multiple messages with `additionalResponsesExpected: true` on all but the final message.

---

#### Field Changed Focus: `sdc.ui.changedFocus`

> **Migration Note:** Previously `questionnaire.event.fieldFocused` in v1.0

Reports when user focuses on a form field. This is an **unsolicited message** from the renderer to the host.

> **See [sdc-swm-protocol.md](sdc-swm-protocol.md#sdcuichangedfocus) for complete payload specifications.**

**Unsolicited Message (Engine → FHIRPath Lab):**

```json
{
  "messagingHandle": "bws8YCbyBtCYi5mWVgUDRqX8xcjiudCo",
  "messageId": "msg-1664464800016-tuv678",
  "messageType": "sdc.ui.changedFocus",
  "payload": {
    "linkId": "patient.name.given",
    "focus_field": "QuestionnaireResponse.item[0].item[0].answer[0].valueString"
  }
}
```

**Response (FHIRPath Lab → Engine):**

```json
{
  "messageId": "msg-1664464800017-def456",
  "responseToMessageId": "msg-1664464800016-tuv678",
  "payload": {
    "status": "done"
  }
}
```

---


#### Height Changed: `ui.changedHeight` (SMART Standard)

> **Migration Note:** Previously `questionnaire.event.heightChanged` in v1.0 - now uses standard SMART message type

Reports when the content height changes (for iframe resizing). This is an **unsolicited message** from the renderer to the host.

> **See [SMART Web Messaging STU1](https://hl7.org/fhir/uv/smart-web-messaging/STU1/) for complete specifications.**

**Unsolicited Message (Engine → FHIRPath Lab):**

```json
{
  "messagingHandle": "bws8YCbyBtCYi5mWVgUDRqX8xcjiudCo",
  "messageId": "msg-1664464800018-zab234",
  "messageType": "ui.changedHeight",
  "payload": {
    "height": 850
  }
}
```

**Response (FHIRPath Lab → Engine):**

```json
{
  "messageId": "msg-1664464800019-ghi789",
  "responseToMessageId": "msg-1664464800018-zab234",
  "payload": {
    "status": "done"
  }
}
```

---

**Payload Properties:**

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `height` | `number` | **Yes** | Recommended iframe height in pixels |
| `contentHeight` | `number` | No | Actual content height |
| `scrollHeight` | `number` | No | Total scrollable height |


## Implementation Requirements

### Mandatory Features

All engines SHALL implement:

1. **Handshake**: Respond to `status.handshake` with capabilities
2. **Questionnaire Rendering**: Handle `sdc.displayQuestionnaire` 
3. **Response Extraction**: Respond to `sdc.requestCurrentQuestionnaireResponse`
4. **Error Reporting**: Use OperationOutcome for failures
5. **Messaging Handle Validation**: Verify all messages contain correct `messagingHandle`
6. **Origin Validation**: Verify messages come from the `messaging_origin` provided in launch context
7. **Target Origin**: Use `messaging_origin` as `targetOrigin` when calling `postMessage()` (not `"*"`)

### Optional Features

Engines MAY implement:

1. **Real-time Updates**: Send `sdc.ui.changedQuestionnaireResponse` on data changes
4. **Focus Tracking**: Send `sdc.ui.changedFocus` events
5. **Dynamic Sizing**: Send `ui.changedHeight` events (standard SMART message)
6. **Response Rendering**: Handle `sdc.displayQuestionnaireResponse`
7. **Configuration**: Handle `sdc.configure` and `sdc.configureContext`
8. **SDC Extract**: Respond to `sdc.requestExtract` (run $extract operation)

### Security Requirements

1. **Origin Validation**: SHALL validate `event.origin` matches `messaging_origin` from launch context
2. **Messaging Handle Integrity**: SHALL verify `messagingHandle` in all incoming messages
3. **Target Origin**: SHALL use the specific `messaging_origin` as `targetOrigin` (not `"*"`)
4. **Input Sanitization**: SHALL sanitize all received data
5. **Error Handling**: SHALL handle malformed messages gracefully
6. **CSP Compliance**: SHALL work within restrictive Content Security Policy

### Response Requirements

Following SMART Web Messaging patterns:

1. The receiver SHALL send exactly one response to each request message (unless using `additionalResponsesExpected`)
2. Response messages SHALL include `responseToMessageId` matching the request's `messageId`
3. For streaming updates, set `additionalResponsesExpected: true` on all but the final response

## Example Implementation

### Basic Engine Template (JavaScript)

```javascript
class FHIRPathLabEngine {
  constructor() {
    const params = new URLSearchParams(location.search);
    this.messagingHandle = params.get('messaging_handle');
    this.messagingOrigin = params.get('messaging_origin');
    this.engineId = params.get('engine_id');
    
    if (!this.messagingHandle || !this.messagingOrigin) {
      console.error('Missing required launch parameters');
      return;
    }
    
    window.addEventListener('message', this.handleMessage.bind(this));
    
    // Initiate handshake
    this.sendHandshake();
  }

  handleMessage(event) {
    // CRITICAL: Validate origin matches messaging_origin from launch
    if (event.origin !== this.messagingOrigin) {
      console.warn('Unauthorized origin:', event.origin);
      return;
    }

    const message = event.data;
    
    // Validate message format (SMART Web Messaging)
    if (!message.messageType || !message.messageId || !message.messagingHandle) {
      this.sendError(null, 'Invalid message format');
      return;
    }

    // Validate messaging handle
    if (message.messagingHandle !== this.messagingHandle) {
      this.sendError(message.messageId, 'Messaging handle mismatch');
      return;
    }

    // Route message
    this.processMessage(message);
  }

  processMessage(message) {
    switch (message.messageType) {
      case 'status.handshake':
        this.respondToHandshake(message.messageId);
        break;
      case 'sdc.displayQuestionnaire':
        this.renderQuestionnaire(message.messageId, message.payload.questionnaire);
        break;
      case 'sdc.requestCurrentQuestionnaireResponse':
        this.extractResponse(message.messageId);
        break;
      default:
        this.sendError(message.messageId, `Unknown message type: ${message.messageType}`);
    }
  }

  sendMessage(messageType, payload, responseToMessageId, additionalResponsesExpected) {
    const message = {
      messageId: this.generateMessageId(),
      messageType,
      payload
    };
    
    if (responseToMessageId) {
      message.responseToMessageId = responseToMessageId;
    }
    
    if (additionalResponsesExpected !== undefined) {
      message.additionalResponsesExpected = additionalResponsesExpected;
    }
    
    // CRITICAL: Use messagingOrigin as targetOrigin (not "*")
    window.parent.postMessage(message, this.messagingOrigin);
  }

  sendHandshake() {
    this.sendMessage('status.handshake', {
      protocolVersion: '2.0',
      fhirVersion: 'R4',
      application: {
        name: 'Your Engine',
        version: '1.0.0',
        publisher: 'Your Org'
      },
      capabilities: {
        extraction: true,
        focusChangeNotifications: true
      }
    });
  }

  respondToHandshake(requestMessageId) {
    this.sendMessage('status.handshake', {
      application: {
        name: 'Your Engine',
        version: '1.0.0',
        publisher: 'Your Org'
      },
      capabilities: {
        extraction: true,
        focusChangeNotifications: true
      }
    }, requestMessageId);
  }

  renderQuestionnaire(requestMessageId, questionnaire) {
    try {
      // Implement questionnaire rendering
      this.currentQuestionnaire = questionnaire;
      this.displayForm(questionnaire);
      
      this.sendMessage('sdc.displayQuestionnaire', {
        status: 'success',
        outcome: {
          resourceType: 'OperationOutcome',
          issue: []
        }
      }, requestMessageId);
    } catch (error) {
      this.sendError(requestMessageId, error.message);
    }
  }

  extractResponse(requestMessageId) {
    try {
      const response = this.getCurrentResponse();
      this.sendMessage('sdc.requestCurrentQuestionnaireResponse', {
        questionnaireResponse: response
      }, requestMessageId);
    } catch (error) {
      this.sendError(requestMessageId, error.message);
    }
  }

  sendError(requestMessageId, diagnostics) {
    this.sendMessage(
      requestMessageId ? 'sdc.displayQuestionnaire' : 'status.handshake',
      {
        outcome: {
          resourceType: 'OperationOutcome',
          issue: [{
            severity: 'error',
            code: 'processing',
            diagnostics: diagnostics
          }]
        }
      },
      requestMessageId
    );
  }

  generateMessageId() {
    return `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // Implement these methods for your engine
  displayForm(questionnaire) { /* ... */ }
  getCurrentResponse() { /* ... */ }
  performValidation() { /* ... */ }
}

// Initialize engine when page loads
new FHIRPathLabEngine();
```

  extractResponse(requestId) {
    // Extract current form data
    const response = this.getCurrentResponse();
    this.sendMessage('engine/response-extracted', response, requestId);
  }

  sendError(message) {
    this.sendMessage('engine/error', {
      code: 'ENGINE_ERROR',
      message: message
    });
  }
}

// Initialize engine when page loads
new FHIRPathLabEngine();
```

## Engine Registration

### Configuration Format

Engines are registered in FHIRPath Lab using this configuration:

```typescript
interface IframeEngineConfig {
  id: string;                    // Unique identifier
  displayName: string;           // Human-readable name
  description: string;           // Description for users
  publisher: string;             // Organization name
  baseUrl: string;              // Base URL for iframe
  iframePath: string;           // Path to renderer page
  allowedOrigins: string[];     // Trusted origins for this engine
  supportedFeatures: {          // Declared capabilities
    rendering: boolean;
    extraction: boolean;
    validation: boolean;
    highlighting: boolean;
    prepopulation: boolean;
  };
  requiresConsent: boolean;     // User consent required
}
```

### Registration Example

```typescript
const engines: IframeEngineConfig[] = [
  {
    id: 'aidbox',
    displayName: 'Aidbox Forms',
    description: 'Advanced SDC-compliant forms renderer with validation',
    publisher: 'Health Samurai',
    baseUrl: 'https://forms.aidbox.app',
    iframePath: '/fhirpath-lab-renderer',
    allowedOrigins: ['https://forms.aidbox.app'],
    supportedFeatures: {
      rendering: true,
      extraction: true,
      validation: true,
      highlighting: true,
      prepopulation: true
    },
    requiresConsent: true
  }
];
```

### Launch Parameter Generation

When creating an iframe, FHIRPath Lab generates launch parameters:

```typescript
function createEngineIframe(config: IframeEngineConfig): HTMLIFrameElement {
  const messagingHandle = generateSecureHandle(); // Cryptographically random
  const messagingOrigin = window.location.origin; // FHIRPath Lab's origin
  
  const url = new URL(config.iframePath, config.baseUrl);
  url.searchParams.set('messaging_handle', messagingHandle);
  url.searchParams.set('messaging_origin', messagingOrigin);
  url.searchParams.set('engine_id', config.id);
  url.searchParams.set('protocol_version', '2.0'); // Updated for v2.0
  
  const iframe = document.createElement('iframe');
  iframe.src = url.toString();
  iframe.sandbox = 'allow-scripts allow-same-origin allow-forms';
  
  // Store handle for validation
  activeEngines.set(messagingHandle, {
    config,
    iframe,
    allowedOrigin: config.allowedOrigins[0] // Primary origin
  });
  
  return iframe;
}
```

## Testing and Compliance

### Protocol Compliance Checklist

- [ ] Validates `event.origin` matches `messaging_origin` from launch
- [ ] Verifies `messagingHandle` in all incoming messages
- [ ] Uses `messaging_origin` as `targetOrigin` (not `"*"`)
- [ ] Responds to `status.handshake`
- [ ] Handles `sdc.displayQuestionnaire`
- [ ] Responds to `sdc.requestCurrentQuestionnaireResponse`
- [ ] Uses FHIR OperationOutcome for error reporting
- [ ] Works within iframe sandbox restrictions
- [ ] Handles malformed messages gracefully
- [ ] Implements declared capabilities accurately
- [ ] Includes `responseToMessageId` in all response messages

### Test Scenarios

1. **Basic Integration**: Handshake, load questionnaire, extract response
2. **Error Handling**: Send malformed messages, verify OperationOutcome responses
3. **Security**: Send messages from unauthorized origins
4. **Messaging Handle Validation**: Send messages with wrong handle
5. **Feature Testing**: Test each declared capability
6. **Performance**: Measure load times and responsiveness
7. **SMART Compliance**: Verify message structure matches SMART Web Messaging spec

## Relationship to SMART Web Messaging and SDC Protocol

This protocol extends [SMART Web Messaging STU1](https://hl7.org/fhir/uv/smart-web-messaging/STU1/) with questionnaire-specific message types defined in [sdc-swm-protocol.md](sdc-swm-protocol.md):

### Alignment with SMART

- **Message Structure**: Uses SMART's `messagingHandle`, `messageId`, `messageType`, `payload` structure
- **Response Pattern**: Uses `responseToMessageId` and `additionalResponsesExpected`
- **Security Model**: Follows SMART's origin validation and handle-based authorization
- **Error Handling**: Uses FHIR OperationOutcome as in SMART
- **Namespacing**: Uses `sdc.*` namespace for SDC operations, `status.*` for handshake, `ui.*` for UI control

### Extensions Beyond SMART

- **SDC Operations**: New `sdc.*` message types for forms-specific operations (see [sdc-swm-protocol.md](sdc-swm-protocol.md))
- **Event Messages**: Unsolicited event notifications for UI coordination (`sdc.ui.changed*`)
- **Launch Context**: Simplified launch (no OAuth) for read-only testing scenarios

### Future Compatibility

As SMART Web Messaging evolves, this protocol will:
- Maintain backward compatibility with message structure
- Consider adoption of new SMART patterns (e.g., authorization scopes if OAuth support added)
- Align with SMART's approach to versioning and capabilities negotiation

## Versioning and Evolution

### Version Compatibility

- **Minor versions** (2.0 → 2.1): Backward compatible, new optional message types or payload fields
- **Major versions** (1.x → 2.0): May introduce breaking changes to message structure

### Protocol Versioning

The protocol version is negotiated during handshake:

```json
{
  "messageType": "status.handshake",
  "payload": {
    "protocolVersion": "2.0",
    "fhirVersion": "R4",
    "supportedVersions": ["2.0"]
  }
}
```

### Migration from v1.0 to v2.0

> **Breaking Changes in v2.0**

1. **Message Type Renames:**
   - `questionnaire.handshake` → `status.handshake`
   - `questionnaire.render` → `sdc.displayQuestionnaire`
   - `questionnaire.loadResponse` → `sdc.displayQuestionnaireResponse`
   - `questionnaire.extract` → `sdc.requestCurrentQuestionnaireResponse`
   - `questionnaire.validate` → `sdc.validate`
   - `questionnaire.ui.*` → `sdc.ui.*`
   - `questionnaire.event.*` → `sdc.ui.changed*` / `ui.changedHeight`

2. **New Messages:**
   - `sdc.configure` - Send configuration data
   - `sdc.configureContext` - Send clinical context separately
   - `sdc.requestExtract` - Run SDC $extract operation (different from requestCurrentQuestionnaireResponse)

3. **Semantic Changes:**
   - Old `questionnaire.extract` returned QuestionnaireResponse
   - New `sdc.requestCurrentQuestionnaireResponse` does the same
   - New `sdc.requestExtract` runs $extract to produce FHIR resources

See [sdc-swm-protocol.md](sdc-swm-protocol.md) for complete payload specifications.

### Future Considerations

- OAuth/SMART authorization for write operations
- Batch operations for multiple questionnaires
- Enhanced debugging and development tools
- Performance optimization messages
- Advanced security features (message signing)
- Support for additional FHIR versions (R4B, R5, R6)
- Alignment with emerging SMART Web Messaging message types

## Support and Resources

### For Engine Developers

- Protocol specification (this document)
- [SDC SMART Web Messaging Protocol](sdc-swm-protocol.md) - Complete message payload specifications
- [SMART Web Messaging STU1](https://hl7.org/fhir/uv/smart-web-messaging/STU1/)
- Reference implementations
- Testing utilities
- Development tools

### For FHIRPath Lab Integration

- TODO: Engine registration process
- TODO: Compliance verification
- TODO: Security review guidelines

## References

- [SDC SMART Web Messaging Protocol](sdc-swm-protocol.md) - Complete payload specifications
- [SMART Web Messaging STU1](https://hl7.org/fhir/uv/smart-web-messaging/STU1)
- [HTML5 Web Messaging](https://html.spec.whatwg.org/multipage/web-messaging.html)
- [FHIR OperationOutcome](https://hl7.org/fhir/R4/operationoutcome.html)
- [FHIR Questionnaire](https://hl7.org/fhir/R4/questionnaire.html)
- [FHIR QuestionnaireResponse](https://hl7.org/fhir/R4/questionnaireresponse.html)
- [RFC2119: Key words for RFCs](https://tools.ietf.org/html/rfc2119)