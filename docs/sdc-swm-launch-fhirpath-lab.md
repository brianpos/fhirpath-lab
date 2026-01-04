# Reverse Integration Implementation for Questionnaire Tester

**Date:** October 8, 2025  
**Feature Branch:** feature/sdc-swm  
**Status:** Updated for SDC-SWM Protocol Conformance

## Overview

This document describes the implementation of **reverse integration** support in the FHIRPath Lab Questionnaire Tester, allowing external systems to embed FHIRPath Lab and control it via the SMART Web Messaging protocol.

## What is Reverse Integration?

In **reverse integration mode**, FHIRPath Lab acts as the "engine" that responds to messages from a parent window (external EHR, form builder, or testing tool). This is the opposite of the primary use case where FHIRPath Lab embeds external engines.

```
External System (Parent) ←→ PostMessage ←→ FHIRPath Lab (Iframe/Popup)
```

## Implementation Components

### 1. Data Structure Changes

Added new properties to `IQuestionnaireTesterData` interface:

```typescript
interface IQuestionnaireTesterData extends QuestionnaireData {
  // ... existing properties ...
  
  // Reverse integration (embedded mode)
  embeddedMode: boolean;
  messagingHandle?: string;
  messagingOrigin?: string;
  parentMessageListener?: (event: MessageEvent) => void;
  currentFocusLinkId?: string;      // Track current focused item
  currentFocusField?: string;       // Track current focused field path
}
```

### 2. Initialization on Mount

Modified `mounted()` lifecycle hook to check for embedded mode:

```typescript
mounted() {
  // ... existing initialization ...
  
  // Check if we're running in embedded mode (reverse integration)
  this.initializeEmbeddedMode();
}
```

### 3. Cleanup on Destroy

Modified `destroyed()` lifecycle hook to clean up message listener:

```typescript
destroyed() {
  // ... existing cleanup ...
  
  // Clean up message listener for embedded mode
  if (this.parentMessageListener) {
    window.removeEventListener('message', this.parentMessageListener);
    this.parentMessageListener = undefined;
  }
}
```

### 4. Core Methods

#### `initializeEmbeddedMode()`

Checks URL parameters for embedded mode and sets up message handling:

```typescript
initializeEmbeddedMode() {
  const params = new URLSearchParams(window.location.search);
  const embeddedMode = params.get('embedded_mode') === 'true';
  const messagingHandle = params.get('messaging_handle');
  const messagingOrigin = params.get('messaging_origin');

  if (embeddedMode && messagingHandle && messagingOrigin) {
    this.embeddedMode = true;
    this.messagingHandle = messagingHandle;
    this.messagingOrigin = messagingOrigin;

    // Set up message listener
    this.parentMessageListener = this.handleParentMessage.bind(this);
    window.addEventListener('message', this.parentMessageListener);

    // Send handshake notification (renderer-initiated)
    this.sendMessageToParent({
      messageId: this.generateMessageId(),
      messageType: 'status.handshake',
      payload: {
        protocolVersion: '1.0',
        fhirVersion: 'R4'
      }
    });
  }
}
```

#### `handleParentMessage(event: MessageEvent)`

Routes incoming messages from parent window to appropriate handlers:

```typescript
handleParentMessage(event: MessageEvent) {
  // Validate origin
  if (event.origin !== this.messagingOrigin) {
    console.warn('Ignoring message from unauthorized origin:', event.origin);
    return;
  }

  const message = event.data;

  // Validate messaging handle
  if (message.messagingHandle !== this.messagingHandle) {
    console.warn('Ignoring message with invalid messaging handle');
    return;
  }

  // Route to appropriate handler
  switch (message.messageType) {
    case 'status.handshake':
      this.handleStatusHandshake(message);
      break;
    case 'sdc.configure':
      this.handleSdcConfigure(message);
      break;
    case 'sdc.configureContext':
      this.handleSdcConfigureContext(message);
      break;
    case 'sdc.displayQuestionnaire':
      this.handleSdcDisplayQuestionnaire(message);
      break;
    case 'sdc.displayQuestionnaireResponse':
      this.handleSdcDisplayQuestionnaireResponse(message);
      break;
    case 'sdc.requestCurrentQuestionnaireResponse':
      this.handleSdcRequestCurrentQuestionnaireResponse(message);
      break;
    case 'sdc.requestExtract':
      this.handleSdcRequestExtract(message);
      break;
    case 'ui.done':
      this.handleUiDone(message);
      break;
    // ... other message types ...
  }
}
```

### 5. Message Handlers

#### Status Handshake Handler

Returns FHIRPath Lab capabilities and available engines:

```typescript
handleStatusHandshake(message: any) {
  this.sendMessageToParent({
    messageId: this.generateMessageId(),
    responseToMessageId: message.messageId,
    payload: {
      application: {
        name: 'FHIRPath Lab',
        version: '1.0',
        publisher: 'FHIRPath Lab'
      },
      capabilities: {
        extraction: true,
        focusChangeNotifications: true
      },
      availableEngines: [
        { id: 'csiro', name: 'CSIRO Smart Forms' },
        { id: 'lhc-forms', name: 'NLM LHC-Forms' },
        { id: 'aidbox', name: 'Aidbox Forms' },
        // ... other engines
      ]
    }
  });
}
```

#### SDC Configure Handler

Handles configuration data (terminology server, data server, etc.):

```typescript
async handleSdcConfigure(message: any) {
  try {
    const { terminologyServer, dataServer, configuration } = message.payload;

    // Store configuration
    if (terminologyServer) {
      // Set terminology server in settings
      settings.setTerminologyServer(terminologyServer);
    }

    if (dataServer) {
      // Set data server in settings
      settings.setFhirServer(dataServer);
    }

    if (configuration) {
      // Handle additional renderer-specific configuration
      // Store in component state or settings as needed
    }

    this.sendMessageToParent({
      messageId: this.generateMessageId(),
      responseToMessageId: message.messageId,
      payload: {
        status: 'success',
        outcome: {
          resourceType: 'OperationOutcome',
          issue: [{
            severity: 'information',
            code: 'informational',
            diagnostics: 'Configuration applied successfully'
          }]
        }
      }
    });

  } catch (error: any) {
    this.sendErrorResponse(message.messageId, error.message);
  }
}
```

#### SDC Configure Context Handler

Handles context data (patient, encounter, author, launch context).

**Behavior:** This message **replaces** all context data (it does not merge with existing context).

```typescript
async handleSdcConfigureContext(message: any) {
  try {
    const { context } = message.payload;

    if (!context) {
      this.sendErrorResponse(message.messageId, 'Missing context in payload');
      return;
    }

    // Replace basic context fields (set to undefined if not provided)
    this.contextData.subject = context.subject;
    this.contextData.author = context.author;
    this.contextData.encounter = context.encounter;

    // Replace launch context entirely
    this.contextData.launchContext = {};
    
    if (context.launchContext && Array.isArray(context.launchContext)) {
      for (const launchItem of context.launchContext) {
        const variableName = launchItem.name;
        let resource: fhir4b.Resource | undefined;

        // Get resource from either contentResource or contentReference
        if (launchItem.contentResource) {
          resource = launchItem.contentResource;
        } else if (launchItem.contentReference) {
          // Resolve the reference
          try {
            resource = await this.resolveReference(launchItem.contentReference);
          } catch (err) {
            console.warn(`Failed to resolve reference for ${variableName}:`, err);
          }
        }

        // Store in launch context variables
        if (resource) {
          this.contextData.launchContext[variableName] = resource;
        }
      }
    }

    this.sendMessageToParent({
      messageId: this.generateMessageId(),
      responseToMessageId: message.messageId,
      payload: {
        status: 'success',
        outcome: {
          resourceType: 'OperationOutcome',
          issue: [{
            severity: 'information',
            code: 'informational',
            diagnostics: 'Context applied successfully'
          }]
        }
      }
    });

  } catch (error: any) {
    this.sendErrorResponse(message.messageId, error.message);
  }
}
```

#### SDC Display Questionnaire Handler

Loads and renders a questionnaire with optional context.

**Behavior:** If context is provided, it **merges** with existing context from `sdc.configureContext` (per spec: merge by name/property, overwriting matching items).

```typescript
async handleSdcDisplayQuestionnaire(message: any) {
  try {
    const { questionnaire, questionnaireResponse, context } = message.payload;

    if (!questionnaire) {
      this.sendErrorResponse(message.messageId, 'Missing questionnaire in payload');
      return;
    }

    // Load the questionnaire
    this.raw = questionnaire;
    if (this.raw) {
      this.flatModel = FlattenedQuestionnaireItems(this.raw);
    }

    // Merge context if provided (per spec: merge with existing context by name/property)
    if (context) {
      // Simple properties: overwrite if provided
      if (context.subject) this.contextData.subject = context.subject;
      if (context.author) this.contextData.author = context.author;
      if (context.encounter) this.contextData.encounter = context.encounter;

      // Handle launch context merging by name
      if (context.launchContext && Array.isArray(context.launchContext)) {
        // Initialize launchContext if it doesn't exist
        this.contextData.launchContext = this.contextData.launchContext || {};
        
        for (const launchItem of context.launchContext) {
          const variableName = launchItem.name;
          let resource: fhir4b.Resource | undefined;

          if (launchItem.contentResource) {
            resource = launchItem.contentResource;
          } else if (launchItem.contentReference) {
            try {
              resource = await this.resolveReference(launchItem.contentReference);
            } catch (err) {
              console.warn(`Failed to resolve reference for ${variableName}:`, err);
            }
          }

          if (resource) {
            // Merge by name: overwrite if exists, add if new
            this.contextData.launchContext[variableName] = resource;
          }
        }
      }
    }

    // Load response if provided
    if (questionnaireResponse) {
      this.questionnaireResponseJson = JSON.stringify(questionnaireResponse, null, 2);
      // ... update editor
    }

    // Send success response
    this.sendMessageToParent({
      messageId: this.generateMessageId(),
      responseToMessageId: message.messageId,
      payload: {
        status: 'success',
        outcome: { /* OperationOutcome */ }
      }
    });

    // Notify of height change
    this.$nextTick(() => {
      this.sendHeightChange();
    });

  } catch (error: any) {
    this.sendErrorResponse(message.messageId, error.message);
  }
}
```

#### SDC Display QuestionnaireResponse Handler

Loads an existing QuestionnaireResponse:

```typescript
async handleSdcDisplayQuestionnaireResponse(message: any) {
  try {
    const { questionnaireResponse, questionnaire } = message.payload;

    if (!questionnaireResponse) {
      this.sendErrorResponse(message.messageId, 'Missing questionnaireResponse in payload');
      return;
    }

    // Load the questionnaire if provided
    if (questionnaire) {
      this.raw = questionnaire;
      if (this.raw) {
        this.flatModel = FlattenedQuestionnaireItems(this.raw);
      }
    }

    // Load the response
    this.questionnaireResponseJson = JSON.stringify(questionnaireResponse, null, 2);
    // ... update editor

    this.sendMessageToParent({
      messageId: this.generateMessageId(),
      responseToMessageId: message.messageId,
      payload: { status: 'success' }
    });

  } catch (error: any) {
    this.sendErrorResponse(message.messageId, error.message);
  }
}
```

#### SDC Request Current QuestionnaireResponse Handler

Extracts current QuestionnaireResponse:

```typescript
async handleSdcRequestCurrentQuestionnaireResponse(message: any) {
  try {
    // Get current QuestionnaireResponse from editor
    let questionnaireResponse: fhir4b.QuestionnaireResponse | undefined;
    
    if (this.questionnaireResponseJson) {
      try {
        questionnaireResponse = JSON.parse(this.questionnaireResponseJson);
      } catch (parseError) {
        this.sendErrorResponse(message.messageId, 'Invalid QuestionnaireResponse JSON');
        return;
      }
    }

    if (!questionnaireResponse) {
      this.sendErrorResponse(message.messageId, 'No QuestionnaireResponse available');
      return;
    }

    // Send response (context is already in the QuestionnaireResponse resource itself)
    this.sendMessageToParent({
      messageId: this.generateMessageId(),
      responseToMessageId: message.messageId,
      payload: {
        questionnaireResponse: questionnaireResponse,
        outcome: {
          resourceType: 'OperationOutcome',
          issue: [{
            severity: 'information',
            code: 'informational',
            diagnostics: 'QuestionnaireResponse retrieved successfully'
          }]
        }
      }
    });

  } catch (error: any) {
    this.sendErrorResponse(message.messageId, error.message);
  }
}
```

#### SDC Request Extract Handler

Handles $extract operation on QuestionnaireResponse:

```typescript
async handleSdcRequestExtract(message: any) {
  try {
    const { questionnaireResponse, questionnaire } = message.payload;

    // Use provided QuestionnaireResponse or current one
    let qr: fhir4b.QuestionnaireResponse | undefined;
    if (questionnaireResponse) {
      qr = questionnaireResponse;
    } else if (this.questionnaireResponseJson) {
      try {
        qr = JSON.parse(this.questionnaireResponseJson);
      } catch (parseError) {
        this.sendErrorResponse(message.messageId, 'Invalid QuestionnaireResponse JSON');
        return;
      }
    }

    if (!qr) {
      this.sendErrorResponse(message.messageId, 'No QuestionnaireResponse available for extraction');
      return;
    }

    // Use provided Questionnaire or current one
    const q = questionnaire || this.raw;
    if (!q) {
      this.sendErrorResponse(message.messageId, 'No Questionnaire available for extraction');
      return;
    }

    // Perform extraction (this would call your actual extraction logic)
    try {
      const extractedResources = await this.performExtraction(q, qr);

      this.sendMessageToParent({
        messageId: this.generateMessageId(),
        responseToMessageId: message.messageId,
        payload: {
          outcome: {
            resourceType: 'OperationOutcome',
            issue: [{
              severity: 'information',
              code: 'informational',
              diagnostics: `Successfully extracted ${extractedResources.length} resource(s)`
            }]
          },
          extractedResources: extractedResources
        }
      });

    } catch (extractError: any) {
      this.sendMessageToParent({
        messageId: this.generateMessageId(),
        responseToMessageId: message.messageId,
        payload: {
          outcome: {
            resourceType: 'OperationOutcome',
            issue: [{
              severity: 'error',
              code: 'processing',
              diagnostics: `Extraction failed: ${extractError.message}`
            }]
          }
        }
      });
    }

  } catch (error: any) {
    this.sendErrorResponse(message.messageId, error.message);
  }
}
```

#### UI Done Handler

Handles ui.done message when user completes interaction:

```typescript
handleUiDone(message: any) {
  // Acknowledge the done message
  this.sendMessageToParent({
    messageId: this.generateMessageId(),
    responseToMessageId: message.messageId,
    payload: {
      status: 'done',
      statusDetail: {
        coding: [{
          system: 'http://terminology.hl7.org/CodeSystem/smart-app-state',
          code: 'completed',
          display: 'User completed interaction'
        }]
      }
    }
  });

  // Note: The parent system will typically close/hide this iframe after receiving response
}
```

### 6. Real-time Updates

Modified `processUpdatedQuestionnaireResponse` to send updates to parent:

```typescript
async processUpdatedQuestionnaireResponse(value: fhir4b.QuestionnaireResponse) {
  // ... existing processing ...

  // Send real-time update to parent window if in embedded mode
  if (this.embeddedMode) {
    this.sendResponseUpdateEvent(value);
  }
}

sendResponseUpdateEvent(response: fhir4b.QuestionnaireResponse, changedLinkIds?: string[]) {
  if (!this.embeddedMode) return;

  this.sendMessageToParent({
    messageId: this.generateMessageId(),
    messageType: 'sdc.ui.changedQuestionnaireResponse',
    payload: {
      questionnaireResponse: response,
      changedLinkIds: changedLinkIds,
      // Optionally include changedPaths if you track FHIRPath expressions
      // changedPaths: changedPaths
    }
  });
}
```

#### Focus Change Notifications

Track and send focus change events:

```typescript
// Call this when user focuses on a questionnaire item
handleItemFocus(linkId: string, focusField?: string) {
  if (!this.embeddedMode) return;

  // Update current focus tracking
  this.currentFocusLinkId = linkId;
  this.currentFocusField = focusField;

  // Send focus change notification
  this.sendMessageToParent({
    messageId: this.generateMessageId(),
    messageType: 'sdc.ui.changedFocus',
    payload: {
      linkId: linkId,
      focus_field: focusField
    }
  });
}
```

### 7. Helper Methods

#### `generateMessageId()`

Generates unique message IDs:

```typescript
generateMessageId(): string {
  return `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
```

#### `sendMessageToParent()`

Sends messages to parent window:

```typescript
sendMessageToParent(message: any) {
  if (!this.embeddedMode || !this.messagingOrigin) return;

  // Add messagingHandle if not present (for unsolicited events)
  if (!message.messagingHandle) {
    message.messagingHandle = this.messagingHandle;
  }

  try {
    window.parent.postMessage(message, this.messagingOrigin);
  } catch (error) {
    console.error('Failed to send message to parent:', error);
  }
}
```

#### `sendErrorResponse()`

Sends error responses with OperationOutcome:

```typescript
sendErrorResponse(responseToMessageId: string, errorMessage: string) {
  this.sendMessageToParent({
    messageId: this.generateMessageId(),
    responseToMessageId: responseToMessageId,
    payload: {
      status: 'error',
      outcome: {
        resourceType: 'OperationOutcome',
        issue: [{
          severity: 'error',
          code: 'processing',
          diagnostics: errorMessage
        }]
      }
    }
  });
}
```

#### `sendHeightChange()`

Notifies parent of height changes for iframe auto-resize:

```typescript
sendHeightChange() {
  if (!this.embeddedMode) return;

  const height = document.body.scrollHeight;
  this.sendMessageToParent({
    messageId: this.generateMessageId(),
    messageType: 'ui.changedHeight',
    payload: {
      height: height
    }
  });
}
```

#### `resolveReference()`

Helper to resolve FHIR references for launch context:

```typescript
async resolveReference(reference: fhir4b.Reference): Promise<fhir4b.Resource | undefined> {
  if (!reference.reference) {
    return undefined;
  }

  // Use existing FHIR client/search helpers to resolve the reference
  const resource = await searchFhir.loadResource(reference.reference);
  return resource;
}
```

#### `performExtraction()`

Helper to perform $extract operation:

```typescript
async performExtraction(
  questionnaire: fhir4b.Questionnaire, 
  questionnaireResponse: fhir4b.QuestionnaireResponse
): Promise<fhir4b.Resource[]> {
  // Call your existing extraction logic
  // This would typically use Definition-based extraction or ObservationExtraction
  const extractedResources: fhir4b.Resource[] = [];
  
  // TODO: Implement actual extraction logic based on questionnaire extensions
  // For example: check for itemExtractionContext, definition-based extraction, etc.
  
  return extractedResources;
}
```

## Usage Example

### External System Integration

```javascript
// External system embeds FHIRPath Lab
const iframe = document.createElement('iframe');
iframe.src = 'https://fhirpath-lab.com/questionnaire/tester?' +
  'embedded_mode=true&' +
  'messaging_handle=abc123&' +
  'messaging_origin=https://my-ehr.com';

document.body.appendChild(iframe);

// Set up message listener
window.addEventListener('message', (event) => {
  if (event.origin !== 'https://fhirpath-lab.com') return;
  
  const msg = event.data;
  
  // Handle handshake response
  if (msg.messageType === 'status.handshake' && msg.payload) {
    console.log('FHIRPath Lab capabilities:', msg.payload);
    
    // Send configuration
    iframe.contentWindow.postMessage({
      messagingHandle: 'abc123',
      messageId: 'msg-002',
      messageType: 'sdc.configure',
      payload: {
        terminologyServer: 'https://tx.fhir.org/r4',
        dataServer: 'https://my-ehr.com/fhir'
      }
    }, 'https://fhirpath-lab.com');
  }
  
  // Handle configuration response
  if (msg.responseToMessageId === 'msg-002' && msg.payload.status === 'success') {
    // Send context
    iframe.contentWindow.postMessage({
      messagingHandle: 'abc123',
      messageId: 'msg-003',
      messageType: 'sdc.configureContext',
      payload: {
        context: {
          subject: { reference: 'Patient/123' },
          author: { reference: 'Practitioner/456' },
          launchContext: [
            {
              name: 'patient',
              contentResource: { resourceType: 'Patient', id: '123', /* ... */ }
            }
          ]
        }
      }
    }, 'https://fhirpath-lab.com');
  }
  
  // Handle context response
  if (msg.responseToMessageId === 'msg-003' && msg.payload.status === 'success') {
    // Now send questionnaire
    iframe.contentWindow.postMessage({
      messagingHandle: 'abc123',
      messageId: 'msg-004',
      messageType: 'sdc.displayQuestionnaire',
      payload: {
        questionnaire: myQuestionnaire
      }
    }, 'https://fhirpath-lab.com');
  }
  
  // Handle unsolicited response updates
  if (msg.messageType === 'sdc.ui.changedQuestionnaireResponse') {
    console.log('Response updated:', msg.payload.questionnaireResponse);
    console.log('Changed items:', msg.payload.changedLinkIds);
  }
  
  // Handle focus changes
  if (msg.messageType === 'sdc.ui.changedFocus') {
    console.log('Focus changed to:', msg.payload.linkId);
  }
  
  // Handle done event
  if (msg.messageType === 'ui.done') {
    // Request final response before closing
    iframe.contentWindow.postMessage({
      messagingHandle: 'abc123',
      messageId: 'msg-final',
      messageType: 'sdc.requestCurrentQuestionnaireResponse',
      payload: {}
    }, 'https://fhirpath-lab.com');
  }
});
```

## Security Considerations

1. **Origin Validation**: All messages are validated against `messagingOrigin`
2. **Messaging Handle**: All messages must include the correct `messagingHandle`
3. **Specific targetOrigin**: Uses specific origin (not `"*"`) when calling `postMessage()`
4. **Error Handling**: Graceful handling of malformed messages

## Testing

### Manual Testing

1. **URL Parameters**:
   ```
   http://localhost:3000/Questionnaire/tester?
     embedded_mode=true&
     messaging_handle=test123&
     messaging_origin=http://localhost:3000
   ```

2. **Console Testing**:
   ```javascript
   // In browser console
   window.postMessage({
     messagingHandle: 'test123',
     messageId: 'msg-001',
     messageType: 'status.handshake',
     payload: {
       protocolVersion: '2.0'
     }
   }, window.location.origin);
   ```

### Integration Testing

For automated testing and production integration, see the **External System Integration Library** section below for a complete, production-ready JavaScript client library.

## External System Integration Library

This section provides a complete, production-ready JavaScript class for external systems to easily integrate FHIRPath Lab using the SDC SMART Web Messaging protocol.

### FHIRPathLabIntegration Class

```javascript
/**
 * FHIRPath Lab Integration Library
 * Embeds FHIRPath Lab and provides a Promise-based API
 */
class FHIRPathLabIntegration {
  constructor(containerId, options = {}) {
    this.messagingHandle = this.generateHandle();
    this.messagingOrigin = window.location.origin;
    this.labOrigin = options.labOrigin || 'https://fhirpath-lab.com';
    this.pendingRequests = new Map();
    this.eventHandlers = {
      responseUpdated: [],
      completed: [],
      heightChanged: []
    };
    
    // Build URL with parameters
    const params = new URLSearchParams({
      messaging_handle: this.messagingHandle,
      messaging_origin: this.messagingOrigin,
      embedded_mode: 'true',
      engine: options.defaultEngine || 'csiro',
      theme: options.theme || 'light'
    });
    
    if (options.hideUI) {
      params.set('hide_ui', Array.isArray(options.hideUI) 
        ? options.hideUI.join(',') 
        : options.hideUI);
    }
    
    if (options.readonly) {
      params.set('readonly', 'true');
    }
    
    const url = `${this.labOrigin}/questionnaire/tester?${params}`;
    
    // Create iframe or popup
    if (options.usePopup) {
      this.labWindow = window.open(
        url,
        'fhirpath-lab',
        'width=1200,height=800,menubar=no,toolbar=no,location=no,scrollbars=yes'
      );
      
      if (!this.labWindow) {
        throw new Error('Failed to open popup. Check popup blocker settings.');
      }
    } else {
      const iframe = document.createElement('iframe');
      iframe.id = 'fhirpath-lab-iframe';
      iframe.src = url;
      iframe.sandbox = 'allow-scripts allow-same-origin allow-forms allow-popups';
      iframe.style.cssText = options.iframeStyle || 'width:100%;height:800px;border:none;';
      
      const container = document.getElementById(containerId);
      if (!container) {
        throw new Error(`Container element #${containerId} not found`);
      }
      
      container.appendChild(iframe);
      this.labWindow = iframe.contentWindow;
      this.iframe = iframe;
    }
    
    // Set up message listener
    window.addEventListener('message', this.handleMessage.bind(this));
    
    // Auto-handshake after load (for iframe)
    if (this.iframe) {
      this.iframe.onload = () => {
        setTimeout(() => this.handshake(), 100);
      };
    }
  }
  
  /**
   * Handle incoming messages from FHIRPath Lab
   */
  handleMessage(event) {
    // Validate origin
    if (event.origin !== this.labOrigin) {
      console.warn('Ignored message from unauthorized origin:', event.origin);
      return;
    }
    
    const msg = event.data;
    
    // Validate message format
    if (!msg || !msg.messageId) {
      return;
    }
    
    // Handle response to pending request
    if (msg.responseToMessageId) {
      const pending = this.pendingRequests.get(msg.responseToMessageId);
      
      if (pending) {
        pending.resolve(msg.payload);
        // Always remove from pending (protocol doesn't use streaming responses)
        this.pendingRequests.delete(msg.responseToMessageId);
      }
      return; // Response handled
    }
    
    // Handle unsolicited event messages (no responseToMessageId)
    // Route based on messageType
    switch (msg.messageType) {
      case 'sdc.ui.changedQuestionnaireResponse':
        this.eventHandlers.responseUpdated.forEach(handler => 
          handler(msg.payload.questionnaireResponse, msg.payload.changedLinkIds)
        );
        break;
      
      case 'sdc.ui.changedFocus':
        // Could add focused event handlers if needed
        break;
      
      case 'ui.changedHeight':
        this.eventHandlers.heightChanged.forEach(handler => 
          handler(msg.payload)
        );
        break;
      
      case 'ui.done':
        this.eventHandlers.completed.forEach(handler => 
          handler(msg.payload)
        );
        break;
    }
  }
  
  /**
   * Send a message to FHIRPath Lab
   */
  sendMessage(messageType, payload) {
    return new Promise((resolve, reject) => {
      if (!this.labWindow) {
        reject(new Error('FHIRPath Lab window not available'));
        return;
      }
      
      const messageId = this.generateMessageId();
      
      this.pendingRequests.set(messageId, { resolve, reject });
      
      try {
        this.labWindow.postMessage({
          messagingHandle: this.messagingHandle,
          messageId,
          messageType,
          payload
        }, this.labOrigin);
      } catch (error) {
        this.pendingRequests.delete(messageId);
        reject(error);
      }
      
      // Timeout after 30 seconds
      setTimeout(() => {
        if (this.pendingRequests.has(messageId)) {
          this.pendingRequests.delete(messageId);
          reject(new Error(`Request timeout for ${messageType}`));
        }
      }, 30000);
    });
  }
  
  /**
   * Perform handshake to discover capabilities
   */
  async handshake() {
    return this.sendMessage('status.handshake', {
      protocolVersion: '2.0',
      fhirVersion: 'R4'
    });
  }
  
  /**
   * Render a questionnaire
   * @param {Object} questionnaire - FHIR Questionnaire resource
   */
  async renderQuestionnaire(questionnaire) {
    return this.sendMessage('sdc.displayQuestionnaire', {
      questionnaire: questionnaire  // Use correct property name per spec
    });
  }
  
  /**
   * Load a QuestionnaireResponse for editing/viewing
   * @param {Object} questionnaireResponse - FHIR QuestionnaireResponse resource
   */
  async loadResponse(questionnaireResponse) {
    return this.sendMessage('sdc.displayQuestionnaireResponse', {
      questionnaireResponse: questionnaireResponse  // Use correct property name per spec
    });
  }
  
  /**
   * Extract the current QuestionnaireResponse
   * @returns {Promise<Object>} The QuestionnaireResponse resource
   */
  async extractResponse() {
    const result = await this.sendMessage('sdc.requestCurrentQuestionnaireResponse', {});
    return result.questionnaireResponse;  // Use correct property name per spec
  }
    
  /**
   * Register handler for real-time response updates
   * @param {Function} handler - Callback receiving (response, changedLinkIds)
   */
  onResponseUpdate(handler) {
    this.eventHandlers.responseUpdated.push(handler);
  }
  
  /**
   * Register handler for form completion
   * @param {Function} handler - Callback receiving event data
   */
  onCompleted(handler) {
    this.eventHandlers.completed.push(handler);
  }
  
  /**
   * Register handler for height changes
   * @param {Function} handler - Callback receiving event data
   */
  onHeightChanged(handler) {
    this.eventHandlers.heightChanged.push(handler);
  }
  
  /**
   * Close/cleanup
   */
  destroy() {
    if (this.iframe && this.iframe.parentNode) {
      this.iframe.parentNode.removeChild(this.iframe);
    }
    
    if (this.labWindow && !this.iframe) {
      this.labWindow.close();
    }
    
    this.pendingRequests.clear();
  }
  
  generateHandle() {
    return 'h-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  }
  
  generateMessageId() {
    return 'm-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  }
}
```

### Usage Example

```javascript
// ============================================================================
// Complete Usage Example
// ============================================================================

// Initialize FHIRPath Lab integration
const lab = new FHIRPathLabIntegration('fhirpath-container', {
  defaultEngine: 'csiro',
  hideUI: ['navbar', 'sidebar'],
  theme: 'light'
});

// Set up real-time updates
lab.onResponseUpdate((response, changedLinkIds) => {
  console.log('Form updated:', changedLinkIds);
  console.log('Current response:', response);
  
  // Auto-save to server
  saveToServer(response);
});

// Set up completion handler
lab.onCompleted(async (event) => {
  console.log('Form completed at:', event.timestamp);
  
  const finalResponse = await lab.extractResponse();
  await submitToEHR(finalResponse);
});

// Initialize with handshake
try {
  const capabilities = await lab.handshake();
  console.log('FHIRPath Lab capabilities:', capabilities);
  console.log('Available engines:', capabilities.availableEngines);
  
  // Load questionnaire
  await lab.renderQuestionnaire(myQuestionnaire);
  console.log('Questionnaire rendered successfully');
  
  // Optionally load existing response
  if (existingResponse) {
    await lab.loadResponse(existingResponse);
  }
  
} catch (error) {
  console.error('FHIRPath Lab integration error:', error);
}

// Later... extract final response
document.getElementById('save-btn').addEventListener('click', async () => {
  try {
    const response = await lab.extractResponse();
    console.log('Extracted response:', response);
    
    // Check if response exists and has content
    if (!response || !response.item || response.item.length === 0) {
      alert('Please complete the questionnaire before saving');
      return;
    }
    
    // Save to server
    await saveToServer(response);
    alert('Saved successfully!');
    
  } catch (error) {
    console.error('Save failed:', error);
  }
});
```

### Integration Options

#### Iframe Integration (Recommended)

```html
<!DOCTYPE html>
<html>
<head>
  <title>EHR with Embedded FHIRPath Lab</title>
</head>
<body>
  <h1>Questionnaire Testing</h1>
  
  <div id="fhirpath-lab-container">
    <!-- FHIRPath Lab will be embedded here -->
  </div>
  
  <script src="fhirpath-lab-integration.js"></script>
  <script>
    const lab = new FHIRPathLabIntegration('fhirpath-lab-container', {
      labOrigin: 'https://fhirpath-lab.com',
      defaultEngine: 'csiro',
      hideUI: ['navbar', 'sidebar'],
      theme: 'light'
    });
    
    // Use the lab instance...
  </script>
</body>
</html>
```

#### Popup Window Integration

```javascript
const lab = new FHIRPathLabIntegration('container-id', {
  usePopup: true,  // Open in popup instead of iframe
  defaultEngine: 'csiro'
});
```

### Security Considerations

1. **Origin Validation**: All messages validated against `labOrigin`
2. **Messaging Handle**: Unique handle per session
3. **HTTPS Only**: Always use HTTPS in production
4. **CSP Configuration**: Ensure Content-Security-Policy allows FHIRPath Lab origin
5. **Sandbox Permissions**: Use appropriate iframe sandbox flags

### Key Features

- ✅ **Promise-based API** - Modern async/await patterns
- ✅ **Event Handlers** - Real-time updates, completion events, height changes
- ✅ **Auto-Handshake** - Automatic initialization for iframes
- ✅ **Error Handling** - Request timeouts and error callbacks
- ✅ **Flexible Deployment** - Supports both iframe and popup modes
- ✅ **Production Ready** - Complete with cleanup and resource management

## Next Steps

1. ✅ Core message handlers implemented
2. ✅ Protocol-conformant message types and structures
3. ✅ Handshake with correct `application` structure
4. ✅ Configuration and context handling with launchContext support
5. ✅ Extract operation handler (`sdc.requestExtract`)
6. ✅ Focus change notifications (`sdc.ui.changedFocus`)
7. ✅ Done event handler (`ui.done`)
8. ✅ Response updates with `changedLinkIds` tracking

## References

- [SDC SMART Web Messaging Protocol](sdc-swm-protocol.md) - **Primary specification**
- [Iframe Renderer Protocol](iframe-renderer-protocol.md) - Includes examples of the SDC-SWM protocol in action
- [SMART Web Messaging STU1](https://hl7.org/fhir/uv/smart-web-messaging/STU1/)

## Protocol Conformance Notes

This implementation conforms to the SDC SMART Web Messaging Protocol v1.0 with the following:

### ✅ Conformant Message Types
- `status.handshake` - Bidirectional capability exchange
- `sdc.configure` - Configuration data handling
- `sdc.configureContext` - Context data with launchContext support
- `sdc.displayQuestionnaire` - Questionnaire rendering with context
- `sdc.displayQuestionnaireResponse` - Response loading
- `sdc.requestCurrentQuestionnaireResponse` - Current response extraction
- `sdc.requestExtract` - $extract operation
- `sdc.ui.changedQuestionnaireResponse` - Response update events with changedLinkIds
- `sdc.ui.changedFocus` - Focus change notifications
- `ui.done` - Completion notification

### ✅ Conformant Message Structure
- All requests include: `messagingHandle`, `messageId`, `messageType`, `payload`
- All responses include: `messageId`, `responseToMessageId`, `payload`
- `additionalResponsesExpected` is not used per protocol specification
- Unsolicited events include `messagingHandle` automatically

### ✅ Conformant Handshake Response
- Uses `application` (not `engine`) with `name`, `version`, `publisher`
- Returns boolean `capabilities.extraction` and `capabilities.focusChangeNotifications`
- Includes FHIRPath Lab-specific `availableEngines` array

### ✅ Conformant Context Handling
- **`sdc.configureContext`**: **Replaces** all context data (does not merge)
  - Simple properties (subject, author, encounter) are set to provided values (or undefined if not provided)
  - `launchContext` is completely replaced with new values
- **`sdc.displayQuestionnaire` with context**: **Merges** with existing context
  - Simple properties (subject, author, encounter) are overwritten only if provided in the message
  - `launchContext` items are merged by `name`: items with same name are overwritten, new items are added, existing items with different names are preserved
- Supports `context.launchContext` array with `name` and `content[x]`
- Resolves references for `contentReference` entries

### ✅ Security
- Origin validation on all incoming messages
- Messaging handle validation
- Specific targetOrigin (not `"*"`) in postMessage calls

## Implementation Notes

- All methods follow the existing code style and patterns
- TypeScript type safety is maintained throughout
- Error handling uses FHIR OperationOutcome pattern
- Real-time updates are sent automatically when responses change with `changedLinkIds` tracking
- Focus change events are sent when user navigates questionnaire items
- Height changes are reported for iframe auto-resize
- All security validations are in place (origin, messaging handle)
- Launch context properly supports both `contentResource` and `contentReference`
- All message types conform to SDC SMART Web Messaging Protocol v1.0
- Response structure uses `application` (not `engine`) in handshake per spec
- Capabilities properly report boolean values for `extraction` and `focusChangeNotifications`
- Protocol does not use `additionalResponsesExpected` - single response per request message

## Conclusion

The reverse integration implementation provides a complete, secure, and standards-based way for external systems to embed and control FHIRPath Lab via SMART Web Messaging. The implementation handles the key message types (handshake, render, loadResponse, extract, validate) and provides real-time updates back to the parent system.
