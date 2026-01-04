# MessageLog Component

A reusable Vue component for displaying SMART Web Messaging protocol messages in a formatted log view.

## Features

- ✅ Color-coded message directions (sent, received, local)
- ✅ Timestamps for each message
- ✅ Message type and summary display
- ✅ Scrollable log with max height
- ✅ Clear log button with Material Design icon
- ✅ Empty state message
- ✅ Vuetify card layout with consistent styling

## Usage

### Basic Usage

```vue
<template>
  <MessageLog 
    :messages="messageLog" 
    title="Message Log"
    @clear="clearMessageLog"
  />
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import MessageLog from "~/components/Questionnaire/MessageLog.vue";
import { MessageLogEntry } from "~/helpers/message-logger";

@Component({
  components: {
    MessageLog,
  },
})
export default class MyComponent extends Vue {
  messageLog: MessageLogEntry[] = [];

  clearMessageLog() {
    this.messageLog = [];
  }

  logMessage(direction: "sent" | "received" | "local", type: string, summary: string, data?: any) {
    const timestamp = new Date().toLocaleTimeString();
    this.messageLog.push({
      direction,
      timestamp,
      type,
      summary,
      data,
    });
  }
}
</script>
```

### Using MessageLogger Helper

```typescript
import Vue from "vue";
import Component from "vue-class-component";
import { MessageLogger } from "~/helpers/message-logger";

@Component
export default class MyComponent extends Vue {
  private logger = new MessageLogger(50); // Keep last 50 messages

  mounted() {
    // Log messages
    this.logger.log("sent", "questionnaire.render", "Sent questionnaire to popup");
    this.logger.log("received", "questionnaire.response", "Received response from popup");
    this.logger.log("local", "validation", "Validated locally");
  }

  get messageLog() {
    return this.logger.getMessages();
  }

  clearLog() {
    this.logger.clear();
  }
}
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `messages` | `MessageLogEntry[]` | Yes | - | Array of message log entries to display |
| `title` | `String` | No | `"Message Log"` | Title displayed in the card header |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `clear` | - | Emitted when the user clicks the "Clear Log" button |

## MessageLogEntry Interface

```typescript
interface MessageLogEntry {
  direction: "sent" | "received" | "local";
  timestamp: string;
  type: string;
  summary: string;
  data?: any;
}
```

### Direction Colors

- **sent** (→ SENT): Blue (#1976d2) - Messages sent to external systems
- **received** (← RECV): Green (#388e3c) - Messages received from external systems  
- **local** (⊙ LOCAL): Orange (#f57c00) - Local events/operations

## Example: Adding to Tester Page

In `pages/Questionnaire/tester.vue`:

```vue
<template>
  <div>
    <!-- Your existing content -->
    
    <!-- Add message log for embedded mode -->
    <MessageLog 
      v-if="embeddedMode"
      :messages="embeddedMessageLog" 
      title="Embedded Mode Messages"
      @clear="embeddedMessageLog = []"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import MessageLog from "~/components/Questionnaire/MessageLog.vue";
import { MessageLogEntry } from "~/helpers/message-logger";

@Component({
  components: {
    MessageLog,
  },
})
export default class QuestionnaireeTester extends Vue {
  embeddedMessageLog: MessageLogEntry[] = [];
  embeddedMode = false;
  messagingOrigin = "*";

  // In your handleParentMessage method:
  handleParentMessage(event: MessageEvent) {
    // ... validation code ...
    const message = event.data;
    
    // Log received message
    this.embeddedMessageLog.push({
      direction: "received",
      timestamp: new Date().toLocaleTimeString(),
      type: message.messageType,
      summary: this.summarizeMessage(message),
      data: message,
    });
    
    // ... rest of handler ...
  }
  
  sendMessageToParent(message: any) {
    // Log sent message
    this.embeddedMessageLog.push({
      direction: "sent",
      timestamp: new Date().toLocaleTimeString(),
      type: message.messageType || "response",
      summary: `Sent ${message.messageType || 'response'}`,
      data: message,
    });
    
    window.parent.postMessage(message, this.messagingOrigin);
  }

  summarizeMessage(message: any): string {
    // Your message summarization logic
    return message.messageType || "Unknown message";
  }
}
</script>
```

## Styling

The component uses **Vuetify 2** components (`v-card`, `v-btn`, `v-icon`) for consistent Material Design styling across the application. The log container uses inline styles for specific formatting:
- Max height: 300px
- Scrollable overflow
- Monospace font (12px)
- Light gray background (#f5f5f5)
- Rounded corners (4px)
- Clear button includes Material Design icon (`mdi-delete`)

## Component Structure

- **Card Layout**: Uses `v-card` with outlined variant and bottom margin
- **Card Title**: Displays the log title in subtitle-1 style
- **Card Content**: Contains the clear button and scrollable log container
- **Clear Button**: Small Vuetify button with left-aligned delete icon, positioned above the log

## Dependencies

- **Vuetify 2**: Required for card components and Material Design icons
- **Vue Class Component**: Component uses TypeScript decorator-based syntax
- **vue-property-decorator**: For `@Prop` and `@Emit` decorators

## File Locations

- Component: `components/Questionnaire/MessageLog.vue`
- Helper utilities: `helpers/message-logger.ts`
- Type definitions: Exported from `helpers/message-logger.ts`
